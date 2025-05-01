var tmpup = [];
var $ServerLink = "";
var nwGridMainCon_Book;
var nwGridMainCon_Sheet;

var _row = "";

var GridPopUpDetails_Book;
var GridPopUpDetails_Sheet;

var SPR_TOTALRATE = 1,
    SPR_SERVICEPROVIDER = 2,
    SPR_PROPERTYREADING = 3,
    SPR_VARIANCE = 4,
    SPR_INCREASEDECREASE = 5;


//const pageTitle = 'Utilities Billing Entry';

let $DateToday = "";
let consbillno = "";

var jsonInvoiceType = [];
var InvoiceType = "";


function func_Reload() {
    crLnk =  GetCurrentURL() + "PMOAdvanceBillingEntry_Gateway";
    crLnkGateKey = "PMOAdvanceBillingEntry";
    crnwTagSingleBind = true;

    nwPopupForm_Create('nwDetails', true);
    nwPopupForm_Create('nwUploadCon', true);
    nwPopupForm_Create('modal-dremarks', true);
    nwPopupForm_Create("modal-remarks", false);
    nwPopupForm_Create("nwInvoiceType", false);

    DisableFields();


    InvoiceType = getParameterByName("nwInvoiceType");
    if (InvoiceType == "ADVBTH") {
        EnableFields();
        func_ActionDriven("actNewData", false);
    }

    var isContinue = true;
    init_request();
    func_checkisView();
    ToolBoxGetData = false;
    return isContinue;
}

var tag1 = "";
var tag2 = "";
var xsessionstamp = "";
var totalCurrentConsumption = 0;
var msgUtilities = "";
var allowable = "";
var nwDocno;


let
SPR_SELECT = 0,
SPR_UNIT = 1,
SPR_CUSTOMER = 2,
SPR_ACCOUNTNO = 3,
SPR_METERNO = 4,
SPR_PREVIOUSREADING = 5,
SPR_CURRENTREADING = 6,
SPR_CURRENTCONSUMPTION = 7,
SPR_PREVIOUSCONSUMPTION = 8,
SPR_PERCENTINCREASE = 9,
SPR_COMMONAREA = 10,
SPR_UTILITYRATE = 11,
SPR_TOTALAMOUNT = 12,
SPR_MULTIPLIER = 13,
SPR_MARKUPRATE = 14,
SPR_CUSTOMBILLING = 15,
SPR_MINIMUMBILLINGAMOUNT = 16,
SPR_TOTALBILLABLEAMOUNT = 17,
SPR_TAG = 18,
SPR_UNITCODE = 19,
SPR_CUSTOMERCODE = 20,
SPR_SEWERRATE = 21,
SPR_SEWERFEES = 22;

var _indef;
var _enume;
function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    
    EnableFields();
    ClearFields();
    func_Toolbox_Clear();
    $fn().onNew();

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
    nwLoading_Start("xLoading", crLoadingHTML);
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
    //nwLoading_Start("xExport", crLoadingHTML);
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

    nwParameter_Add("LocAccountFormCode", $('#idvallugAccountableForms').val());
    nwParameter_Add("PhaseTower", $('#idvallugPhaseTower').val());
    nwParameter_Add("idvallugAccount", $('#idvallugAccount').val());
    nwParameter_Add("Remarks", $('#txtRemarks').val());
    nwParameter_Add("BillingDate", $('#dtpBillingDate').val());
    nwParameter_Add("BillingFrom", $('#cmbBillPeriodFrom').val());
    nwParameter_Add("BillingTo", $('#cmbBillPeriodTo').val());
    nwParameter_Add("TransactionNo", $('#txtTransactionNo').val());

    try {
        nwParameter_Add_Spread(nwGridMainCon_Book);
    } catch (ex) {
    }
}

function setNumReplace(val, decimal) {
    val = (parseFloat(val.toString().replace(/,/g, ""))) || 0;
    val = val.toFixed(decimal).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return val;
}

function func_DisableforViewing() {
    DisableFields();
    $('#nwGridMainCon').enable(false)
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
    if (TotalRecords === 'of 0') {
        DisableFieldsEmpty();
    }
    else {
        EnableFieldsDone();
    }
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

function showDefaultMsgBox() {
    cust_GetPara();
    $('#noah-webui-default-Save').click();
}

function Lookup_DoneFunction(idName, idNum) {
    cust_GetPara();
    var bill = 0;
    if (idName === "lugAccountableForms") {
        nwLoading_Start("actResetGrid", crLoadingHTML);
        loadSegment("loc", $('#idvallugAccountableForms').val(), $('#descvallugAccountableForms').val());
        func_ActionDriven("actResetGrid");

    }

    else if (idName === "lugPhaseTower") {
        nwLoading_Start("actResetGrid", crLoadingHTML);
        $('#idvallugSegment5').val(getLookupData(idNum, 4));
        $('#descvallugSegment5').val(getLookupData(idNum, 5));
        loadSegment("phstwr", $('#idvallugPhaseTower').val(), $('#descvallugPhaseTower').val());
        nwParameter_Add("bill", 1);
        func_ActionDriven("actResetGrid");
    }


} 

function loadSegment(segment,id,desc) {

    for (var x = 2; x <= 5; x++) {

        var costcenter = $('#lblseg' + x).attr('costcenterflg');
        var profitcenter = $('#lblseg' + x).attr('profitcenter');
        var locacc = $('#lblseg' + x).attr('locaccountforms');

        if (segment == 'loc') {
            if (locacc == 'True' || locacc == '1') {
                $('#idvallugSegment' + x).val(id);
                $('#descvallugSegment' + x).val(desc);
            }
        } else if (segment == 'phstwr') {
            if (profitcenter == '1') {
                $('#idvallugSegment' + x).val(id);
                $('#descvallugSegment' + x).val(desc);
            }
        } else if (segment == 'itmgrp') {
            if (profitcenter == '0' && costcenter == '0' && locacc == 'False') {
                $('#idvallugSegment' + x).val(id);
                $('#descvallugSegment' + x).val(desc);
            }
        }

    }
}

function func_LookUpInitialize(idName) {
    var isContinue = true;
    cust_GetPara();
    if (idName === 'ContractNo') {
        nwParameter_Add("locAcctForms", $('#idvallugAccountableForms').val());
    }
    return isContinue;
}

function componentFields(en) {
    $('#lugAccountableForms').enable(en);
    $('#lugAccount').enable(en);
    $('#lugPhaseTower').enable(en);
    $('#cmbBillPeriodTo').enable(en);
    $('#dtpBillingDate').enable(en);
    $('#txtRemarks').enable(en);
}

function EnableFields() {
    componentFields(true);
    $('#nwGridMainCon').enable(true);
    $("div.spantext").remove();
}


function getrbBTValues() {


        $('#cmbBillPeriodFrom').enable(true);
        $('#cmbBillPeriodFrom').val('');
        $('#cmbBillPeriodTo').enable(true);
        $('#cmbBillPeriodTo').val('');
        $('#ubill').text('*');
        func_ActionDriven("actloadBillFrom", false);
   
    disableSelect();

}

function checked() {
    if ($('#txtCommonArea').prop("checked")) {
        $('#chkDistributeCom').prop("checked", $('#txtCommonArea').prop("checked"));
        $('.txtCurrentConsumption').enable(false);
    } else {
        $('.txtCurrentConsumption').enable(true);
    }
    colors();

}

function getrbValues() {
    $('#cmbBillPeriodTo').enable(true);
    $('#ubill').text('');
    func_ActionDriven("actloadBillFrom", false);
    disableSelect();
}

function disableSelect() {
    $('.nwCheckBox1').enable(false);
    $('.nwCheckBox1').prop("checked", false);
}

function DisableFields() {
    componentFields(false);
    $('#lugInvoice').enable(false);
    $('#dtpDateSubmitted').enable(false);
    $('#dtpDatePosted').enable(false);
    $('#txtTransactionNo').enable(false);
    $('#txtStatus').enable(false);
    $('#txtReasonforDisapproval').enable(false);
    $('#txtDisapprovalRemarks').enable(false);
    $('#cmbBillPeriodFrom').enable(false);
    $('#nwGridMainCon').enable(false);
    $('#chkDistributeCom').enable(false);
    $('#rbCustom').enable(false);
    $('#rbExempt').enable(false);
    $('#chkDistributeCom').enable(false);
    $('#lugSegment2').enable(false);
    $('#lugSegment3').enable(false);
    $('#btnDocumentAttachment').enable(false);
    $('#lugSegment4').enable(false);
    $('#lugSegment5').enable(false);
    $('#btnDoneDRemarks').enable(false);
    $('#modaltxtDRemarks').enable(false);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingPrint().enable(false);

}

function EnableFieldsDone() {//Binding Done
    $('#lugInvoice').enable(false);
    $('#lugAccountableForms').enable(false);
    $('#lugPhaseTower').enable(false);
    $('#btnImport').enable(false);


    if ($('#txtTransactionNo').val() == "") {
        DisableFieldsEmpty();

        $('#btnDocumentAttachment').enable(false);
        $('#chkDistributeCom').enable(false);
        $('#nwGridMainCon').enable(false);
        $("#noah-webui-Toolbox").bindingSave().enable(false);

    }
    else {
        $('#btnDocumentAttachment').enable(true);
        $('#chkDistributeCom').enable(true);
        $('#nwGridMainCon').enable(true);

        $("#noah-webui-Toolbox").bindingExport().enable(true);
        $("#noah-webui-Toolbox").bindingInquire().enable(true);
        $("#noah-webui-Toolbox").bindingDelete().enable(true);
        $("#noah-webui-Toolbox").bindingDelete().visible(true);
        $("#noah-webui-Toolbox").bindingSave().enable(true);
        $("#noah-webui-Toolbox").bindingProcess().enable(true);
        $("#noah-webui-Toolbox").bindingExport().enable(true);
    }

    $("#noah-webui-Toolbox").bindingNew().enable(true);

}

function LoadLabelPopup() {
    var Grid = GridPopUpDetails_Book.ActiveSheet;

    Grid.SetText(SPR_TOTALRATE - 1, 0,"Total Bill");
    Grid.SetText(SPR_TOTALRATE - 1, 1, "Total Consumption");
    Grid.SetText(SPR_TOTALRATE - 1, 2, "Utility Rate");
    Grid.SetEnable(SPR_SERVICEPROVIDER - 1, 2, false);
    Grid.SetBackground(SPR_SERVICEPROVIDER - 1, 2, "gainsboro");
    loadUtility();
}


function computeTotalAmount() { //NYF CHECK INDEX

    var current = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION, index));
    var common = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_COMMONAREA, index));
    var utility = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_UTILITYRATE, index));

    var totalAmount = ((current + common) * utility).toFixed(2);

    var markup = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_MARKUPRATE, index));
    var custombill = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CUSTOMBILLING, index));
    var MinBill = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_MINIMUMBILLINGAMOUNT, index));

    var totalBillAmount = 0;
    if (custombill == 0) {
        totalBillAmount = ((markup / 100) + 1) * MinBill;
    } else {
        totalBillAmount = (totalAmount - custombill) * ((markup / 100) + 1);
    }

    nwGridMainCon_Book.ActiveSheet.SetText(SPR_TOTALAMOUNT, index, totalAmount);
    nwGridMainCon_Book.ActiveSheet.SetText(SPR_TOTALBILLABLEAMOUNT, index, totalBillAmount);
}

function AutoComputePopupGrid() {
    var Grid = GridPopUpDetails_Book.ActiveSheet;
    var MainGrid = nwGridMainCon_Book.ActiveSheet;
    var currentConsumption = MainGrid.GetText(SPR_CURRENTCONSUMPTION - 1, 0).replace(/,/g, '');


    var nf = Intl.NumberFormat();
    var grdTotalBillServiceProv = Grid.GetText(SPR_SERVICEPROVIDER - 1, 0).replace(/,/g, '');
    var grdTotalConsumptionServiceProv = Grid.GetText(SPR_SERVICEPROVIDER - 1, 1).replace(/,/g, '');
    var utilityRatePropertyRead = Grid.GetText(SPR_PROPERTYREADING - 1, 2).replace(/,/g, '');
    var grdTotalBillPropertyRead = grdTotalBillServiceProv;
    var grdTotalConsumptionPropertyRead = Grid.GetText(SPR_PROPERTYREADING - 1, 1).replace(/,/g, '');

    //Service Provider		
    //Utility Rate - System computed: Total Bill divided by Total Consumption						
    var utilityRateServiceProv = isValid((parseFloat(grdTotalBillServiceProv) / parseFloat(grdTotalConsumptionServiceProv))).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    Grid.SetText(SPR_SERVICEPROVIDER - 1, 2, utilityRateServiceProv);

    //Property Reading		
    var grdTotalBillPropertyRead = "";
    //Total Bill - Loaded based on the encoded Total Bill under Service Provider column						
    //If the Basis of Utility Rate is tag as Fixed in Utilities Billing Threshold with same Item Group Type, Phase/Tower and Charges and with latest effective date, this must be locked and system computed: Total Consumption*Utility Rate						
    if ($('#isFixed').val() != 0) { //fixed
        //grdTotalBillPropertyRead = isValid(parseFloat(utilityRatePropertyRead) * parseFloat(grdTotalConsumptionPropertyRead)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        //grdTotalBillPropertyRead2 = isValid(parseFloat(utilityRatePropertyRead) * parseFloat(grdTotalConsumptionPropertyRead));
        grdTotalBillPropertyRead = grdTotalBillServiceProv - utilityRateServiceProv
        Grid.SetText(SPR_PROPERTYREADING - 1, 0, grdTotalBillPropertyRead.toFixed(2));
    }
    else {
        grdTotalBillPropertyRead = grdTotalBillServiceProv;
        Grid.SetText(SPR_PROPERTYREADING - 1, 0, nf.format(grdTotalBillPropertyRead));
        //utilityRatePropertyRead = isValid((parseFloat(grdTotalBillPropertyRead) / parseFloat(grdTotalConsumptionPropertyRead))).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }


    //Total Consumption- Loaded based on the Total Current Consumption column			
    Grid.SetText(SPR_PROPERTYREADING - 1, 1, currentConsumption);

    //Utility Rate - System computed: Total Bill divided by Total Consumption						
    Grid.SetText(SPR_PROPERTYREADING - 1, 2, (grdTotalBillPropertyRead / currentConsumption).toFixed(2));
    var uPropertyRead = grdTotalBillPropertyRead / currentConsumption;


    //VARIANCE
    //Total Consumption- Service Provider less Property Reading. Display in absolute value. If Service Provider is greater than Property Reading, add letter "UF" after the amount otherwise "F".						
    var totalConsumptionVariance = isValid(parseFloat(grdTotalConsumptionServiceProv) - parseFloat(currentConsumption));


    if (parseFloat(grdTotalConsumptionServiceProv) > parseFloat(currentConsumption)) {
        totalConsumptionVariance = totalConsumptionVariance + " UF"
    } else {
        totalConsumptionVariance = totalConsumptionVariance + " F"
    }

    Grid.SetText(SPR_VARIANCE - 1, 1, totalConsumptionVariance);

    //Utility Rate - System computed: Service Provider less Property Reading Utility Rate.						
    var utilityRateVariance = (parseFloat(utilityRateServiceProv) - parseFloat(utilityRatePropertyRead)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    if (utilityRateVariance < 0) {
        utilityRateVariance = utilityRateVariance.replace('-', '');
        utilityRateVariance = "(" + utilityRateVariance + ")";
    }

    Grid.SetText(SPR_VARIANCE - 1, 2, utilityRateVariance);


    //% Increase (Decrease)		
    //Total Consumption- System computed: (Service Provider less Property Reading) divided by Property Reading						
    var incPercConsump = isValid(((parseFloat(grdTotalConsumptionServiceProv) - parseFloat(grdTotalConsumptionPropertyRead)) / parseFloat(grdTotalConsumptionPropertyRead))).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    incPercConsump = incPercConsump + "%";

    var incPercUtilityRate = 0;

    incPercUtilityRate = isValid((((parseFloat(utilityRateServiceProv) - parseFloat(uPropertyRead)) / (parseFloat(uPropertyRead)))) * 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    incPercUtilityRate = incPercUtilityRate + "%";

    Grid.SetText(SPR_INCREASEDECREASE - 1, 1, incPercConsump);
    Grid.SetText(SPR_INCREASEDECREASE - 1, 2, incPercUtilityRate);

}

function ChangeServiceProvder() {
    var Grid = GridPopUpDetails_Book.ActiveSheet;
    var MainGrid = GridPopUpDetails_Book.ActiveSheet;

    // total bill
    var grdTotalBillServiceProv = Grid.GetText(SPR_SERVICEPROVIDER - 1, 0).replace(/,/g, '');
    Grid.SetText(SPR_PROPERTYREADING - 1, 0, nf.format(grdTotalBillServiceProv));
    Grid.SetText(SPR_VARIANCE - 1, 0, "");
    Grid.SetText(SPR_INCREASEDECREASE - 1, 0, "");

    //total consumption
    var grdTotalConsumptionServiceProv = Grid.GetText(SPR_SERVICEPROVIDER - 1, 1).replace(/,/g, '');
    var currentConsumption = MainGrid.Grid.GetText(SPR_CURRENTCONSUMPTION - 1, 0).replace(/,/g, '');
    Grid.SetText(SPR_PROPERTYREADING - 1, 1, nf.format(currentConsumption));

    var cVariance = grdTotalBillServiceProv - currentConsumption;
    if (grdTotalConsumptionServiceProv > currentConsumption){
        cVariance = cVariance + "UF";
    }
    else{
        cVariance = cVariance + "F";
    }

    Grid.SetText(SPR_VARIANCE - 1, 1, nf.format(cVariance));
    Grid.SetText(SPR_INCREASEDECREASE - 1, 1, nf.format((grdTotalBillServiceProv - currentConsumption) / currentConsumption) + "%");

    //utility rate
    var uService = grdTotalBillServiceProv / grdTotalConsumptionServiceProv;
    Grid.SetText(SPR_SERVICEPROVIDER - 1, 2, nf.format(uService));
    Grid.SetText(SPR_PROPERTYREADING - 1, 2, nf.format(uService / currentConsumption));
    Grid.SetText(SPR_INCREASEDECREASE - 1, 2, nf.format((uService - currentConsumption) /currentConsumption) + "%");

}

function AutoComputeLineDetails(index) {

    var grdPrevReading = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_PREVIOUSREADING, index);
    var grdCurrReading = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTREADING, index);
    var grdCurrConsump = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION, index);
    var grdPrevConsump = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_PREVIOUSCONSUMPTION, index);
    var grdPercInc = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_PERCENTINCREASE, index);
    var grdCommArea = isValid(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_COMMONAREA, index));
    var grdUtilityRate = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_UTILITYRATE, index);
    var grdTotalAmount = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_TOTALAMOUNT, index);
    var grdMarkUp = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_MARKUPRATE, index);
    var grdCustomBilling = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CUSTOMBILLING, index);
    var grdMinBill = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_MINIMUMBILLINGAMOUNT, index);
    var grdTotalBill = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_TOTALBILLABLEAMOUNT, index);
    var isCommon = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_TAG, index);


    if ($('#chkDistributeCom').prop("checked") && isCommon == "1") {
        grdCommArea = isValid(parseFloat(grdCurrConsump) * parseFloat(grdUtilityRate)).toFixed(2);
        //$('#gridentry-nwData.tblGridBody tr:eq(' + index + ')').find("td:eq(" + SPR_COMMONAREA + ")").text('');
        grdCustomBilling = nwGridMainCon_Book.ActiveSheet.SetText(SPR_COMMONAREA, index, '');
    }

    var CurreConsumption = (isValid(parseFloat(grdCurrReading) - parseFloat(grdPrevReading))).toFixed(2);
    var perInc = (isValid(((parseFloat(grdCurrConsump) - parseFloat(grdPrevConsump)) / parseFloat(grdPrevConsump))) * 100).toFixed(2);
    var totalAmt = 0;
    if ($('#chkDistributeCom').prop("checked") && isCommon == "1") {
        grdCommArea = isValid(parseFloat(grdCurrConsump) * parseFloat(grdUtilityRate)).toFixed(5);
        totalAmt = isValid(parseFloat(grdCurrConsump) * parseFloat(grdUtilityRate)).toFixed(5);
    } else {
        totalAmt = isValid((parseFloat(grdCurrConsump) * parseFloat(grdUtilityRate)) ).toFixed(5);
    }

    var totalBillAmt = 0;
    if ($('#chkDistributeCom').prop("checked") && isCommon == "1") {
        nwGridMainCon_Book.ActiveSheet.SetText(SPR_TOTALBILLABLEAMOUNT, index, '');
    
    } else {
        
        if (parseFloat(grdMinBill) == 0.00) {
            totalBillAmt = (((parseFloat(totalAmt) - isValid(parseFloat(grdCustomBilling))) * ((isValid(parseFloat(grdMarkUp)) / 100) + 1)) + parseFloat(isValid(grdCommArea))).toFixed(5);
        } else if (parseFloat(grdMinBill) > parseFloat(totalAmt)) {
            totalBillAmt = (((isValid(parseFloat(grdMinBill)) - isValid(parseFloat(grdCustomBilling))) * ((isValid(parseFloat(grdMarkUp)) / 100) + 1)) + parseFloat(isValid(grdCommArea))).toFixed(5);
        } else {
            totalBillAmt = (((parseFloat(totalAmt) - isValid(parseFloat(grdCustomBilling))) * ((isValid(parseFloat(grdMarkUp)) / 100) + 1)) + parseFloat(isValid(grdCommArea))).toFixed(5);
        } 
        nwGridMainCon_Book.ActiveSheet.SetText(SPR_TOTALBILLABLEAMOUNT, index, totalBillAmt.replace(/\d(?=(\d{3})+\.)/g, '$&,'));
        nwGridMainCon_Book.ActiveSheet.SetText(SPR_TOTALAMOUNT, index, totalAmt.replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    }

    nwGridMainCon_Book.ActiveSheet.SetValue(SPR_CURRENTCONSUMPTION, index, CurreConsumption.replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    nwGridMainCon_Book.ActiveSheet.SetText(SPR_PERCENTINCREASE, index, perInc.replace(/\d(?=(\d{3})+\.)/g, '$&,'));

    ComputeSewerFees(index, 0);
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

function SystemComputedGridDetails() {
    var utilityServiceProv = 0;
    var utilityPropertyRead = 0;
    var utilityVariance = 0;
    var utilityPercent = 0;
    var totalConsumpPercent = 0;

    var Grid = GridPopUpDetails_Book.ActiveSheet;

    var totalBILLVAT = Grid.GetText(2, 0);
    var totalConsumption = Grid.GetText(2, 1);
    var totalBillProp = Grid.GetText(3, 0);
    var totalConsumpProp = Grid.GetText(3, 1);

    utilityServiceProv = (totalBILLVAT / totalConsumption).toFixed(2);
    utilityPropertyRead = (totalBILLVAT / totalConsumpProp).toFixed(2);

    if (!isFinite(utilityServiceProv)) {
        utilityServiceProv = 0.00;
    }

    if (!isFinite(utilityPropertyRead)) {
        utilityServiceProv = 0.00;
    }

    utilityVariance = (utilityServiceProv - utilityPropertyRead).toFixed(2);
    utilityPercent = (((utilityServiceProv - utilityPropertyRead) / utilityPropertyRead) * 100).toFixed(2);
    totalConsumpPercent = (((totalConsumption - totalConsumpProp) / totalConsumpProp) * 100).toFixed(2);
    if (!isFinite(utilityVariance)) {
        utilityVariance = 0.00;
    }
    if (!isFinite(totalConsumpPercent)) {
        totalConsumpPercent = 0.00;
    }
    if (!isFinite(utilityPercent)) {
        utilityPercent = 0.00;
    }

    Grid.SetText(3, 0, totalBILLVAT);
    Grid.SetText(2, 2, utilityServiceProv);
    Grid.SetText(3, 2, utilityPropertyRead);
    Grid.SetText(4, 2, utilityVariance);
    Grid.SetText(5, 2, utilityPercent + '%');
    Grid.SetText(5, 1, totalConsumpPercent + '%');

   
}



function getMsgBox() {
    cust_GetPara();
    nwParameter_Add_Table("nwGridMainCon", false);
    nwLoading_Start("xLoading", crLoadingHTML);
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

function loadUtility() {
    var Grid = GridPopUpDetails_Book.ActiveSheet;

    Grid.SetText(SPR_SERVICEPROVIDER - 1, 0, $('#txtTotalBillServiceProvider').val());
    Grid.SetText(SPR_SERVICEPROVIDER - 1, 1, $('#txtTotalConsumptionServiceProvider').val());
    Grid.SetText(SPR_SERVICEPROVIDER - 1, 2, $('#txtUtilityRateServiceProvider').val());
    Grid.SetText(SPR_PROPERTYREADING - 1, 0, $('#txtTotalBillPropertyReading').val());
    Grid.SetText(SPR_PROPERTYREADING - 1, 1, $('#txtTotalConsumptionPropertyReading').val());
    Grid.SetText(SPR_PROPERTYREADING - 1, 2, $('#txtUtilityRatePropertyReading').val());
    Grid.SetText(SPR_VARIANCE - 1, 1, $('#txtTotalConsumptionVariance').val());
    Grid.SetText(SPR_VARIANCE - 1, 2, $('#txtUtilityRateVariance').val());
    Grid.SetText(SPR_INCREASEDECREASE - 1, 1, $('#txtTotalConsumptionPercent').val());
    Grid.SetText(SPR_INCREASEDECREASE - 1, 2, $('#txtUtilityRatePercent').val());
} 

$(document).on('click', '#btnDocumentAttachment', function () {
    var title = "";
    var fullength = "";
    var docno = $('#txtTransactionNo').val();
    var trantype = 'INVOIC';
    var recuser = getParameterByName("nwu");
    title = "Utilities Billing Entry";
    //fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + encodeURI(docno) + "&TranType=" + trantype;
    fullength = GetCurrentURL() + "../DCRequirementCompliance?TransactionNo=" + encodeURI(docno) + "&TranType=" + trantype;




    nwPopupForm_Create("nwPopUpRequireCompliance", true, fullength);
    $('#nwPopUpRequireCompliance .modal-hdr-title').text(title);
    $("#nwPopUpRequireCompliance").css({ "min-width": "98%" });
    $("#nwPopUpRequireCompliance").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopUpRequireCompliance");
    $('.dimbgNWnwPopUpRequireCompliance').removeClass('openn');

    nwLoading_End('xSample');
});

function func_WindowCloseTrigger(verID) {
    var isContinue = true;

    if (verID == 'nwPopUpRequireCompliance') {

        nwParameter_Add("TransactionNo", $('#txtTransactionNo').val());
        nwParameter_Add("isHeader", true);
        func_ActionDriven("actchkIfhasReqComp", false);
    }
    return isContinue;
}


$(document).on("click", '#btnLoadDetails ', function () {
    if ($('#idvallugAccountableForms').val() != '' && $('#idvallugPhaseTower').val() != '' && $('#txtRemarks').val() != '' && $('#dtpBillingDate').val() != '' && $('#cmbBillPeriodFrom').val() != '' && $('#cmbBillPeriodTo').val() != '') {
        cust_GetPara();
        func_ActionDriven("actLoadDetails");

    } else {
        MessageBox("Please complete the required header first.", pageTitle);
    }

});

$(document).on("click", '.nwCheckBoxTot1 ', function () {

    var isBool = $(this).prop("checked");
    $('#nwGridMainCon .tblGridBody ').find("tr").find("td:eq(" + SPR_SELECT + ") input").prop("checked", isBool);
});

function getUtilityRateVRegular() {
    var regUtilityRate = 0;
    var Grid = nwGridMainCon_Book.ActiveSheet;

}

function DistribCommon() {
  if (parseFloat($('#txtUtilityRateServiceProvider').val()) != 0) {
      ww();
  } else {
      MessageBox("Cannot proceed. Utility Rate is required.", "Utility Billing Entry", "error");
      $('#chkDistributeCom').prop("checked", false);
  }
  $('.txtGridUtility').enable(false);
}

$(document).on("click", '#chkDistributeCom', function () {
    nwParameter_Add("DistributeCommon", $('#chkDistributeCom').prop("checked"));

    if ($(this).prop("checked") == true) {
        DistribCommon();
    } else {
        $('.txtCurrentConsumption').enable(true);
        //$('#nwGridMainCon .tblGridBody ').find('tr').find('td:eq(' + SPR_COMMONAREA + ')').text('0.00');
        nwGridMainCon_Book.ActiveSheet.SetText(SPR_COMMONAREA, Spread_ALLROW, '0.00');
        yy();
        tt();
        xx(0);
    }
}); 

$(document).on("change", "#cmbBillPeriodFrom", function (e) {
    nwLoading_Start("actResetGrid", crLoadingHTML);

    func_ActionDriven("actResetGrid");
});

$(document).on("change", "#cmbBillPeriodTo", function (e) {
    nwLoading_Start("actResetGrid", crLoadingHTML);
    func_ActionDriven("actResetGrid");
});


$(document).on("change", "#cmbBillPeriodFrom", function (e) {
    effDate = $("#cmbBillPeriodFrom").val();

    if (effDate == '__/__/____')
        effDate = '';

    if (effDate != "") {
        var serverdate = $('#cmbBillPeriodTo').val();

        if (Date.parse(effDate) > Date.parse(serverdate)) {
            MessageBox("Cannot be continued. Bill Period From Date should be equal to or earlier than Bill Period To.", "Utility Billing Entry", "error");
            $("#cmbBillPeriodFrom").val("");
        } else {

        }
    }

});

$(document).on("change", "#cmbBillPeriodTo", function (e) {
    effDate = $("#cmbBillPeriodTo").val();

    if (effDate == '__/__/____')
        effDate = '';

    if (effDate != "") {
        var serverdate = $('#cmbBillPeriodFrom').val();

        if (Date.parse(effDate) < Date.parse(serverdate)) {
            MessageBox("Cannot be continued. Bill Period From Date should be equal to or later than Bill Period From.", "Utility Billing Entry", "error");
            $("#cmbBillPeriodTo").val("");
        } else {

        }
    }

});


//$(document).on("click", '#rbRegular,#rbCustom,#rbExempt', function () {
//    nwLoading_Start("actResetGrid", crLoadingHTML);
//    getrbBTValues();
//    func_ActionDriven("actResetGrid");

//});

//$(document).on("change", '#rbRegular,#rbCustom,#rbExempt', function () {
//    nwLoading_Start("actResetGrid", crLoadingHTML);
//    getrbBTValues();
//    func_ActionDriven("actResetGrid");

//});



$(document).on("click", '#btnSaveContact', function () {
    cust_GetPara();
    var Grid = GridPopUpDetails_Book.ActiveSheet;

    var tobill = Grid.GetText(2, 0);
    var tocons = Grid.GetText(2, 1);
    nwParameter_Add("tobill", tobill);
    nwParameter_Add("tocons", tocons);
    nwLoading_Start("xLoading", crLoadingHTML);
    nwParameter_Add_Spread(GridPopUpDetails_Book);
    
    func_ActionDriven("actbtnSave");
    
});

function resetUtility() {
    $('#txtTotalBillServiceProvider').val('0.00');
    $('#txtTotalConsumptionServiceProvider').val('0.00');
    $('#txtUtilityRateServiceProvider').val('0.00');
    $('#txtTotalBillPropertyReading').val('0.00');
    $('#txtUtilityRatePropertyReading').val('0.00');
    $('#txtTotalConsumptionVariance').val('');
    $('#txtUtilityRateVariance').val('0.00');
    $('#txtTotalConsumptionPercent').val('0%');
    $('#txtUtilityRatePercent').val('0%');


    $('.txtGridUtility').val('0.00');
    $('#isFixedMain').val('1');
}

function getUtilityData() {
    var Grid = GridPopUpDetails_Book.ActiveSheet;
    var totalbillServiceProvider = Grid.GetText(SPR_SERVICEPROVIDER - 1, 0);
    var totalConsumptionServiceProvider = Grid.GetText(SPR_SERVICEPROVIDER - 1, 1);
    var utilityRateServiceProvider = Grid.GetText(SPR_SERVICEPROVIDER - 1, 2);

    var totalBillPropertyReading = Grid.GetText(SPR_PROPERTYREADING - 1, 0);
    var totalConsumptionPropertyReading = Grid.GetText(SPR_PROPERTYREADING - 1, 1);
    var utilityRatePropertyReading = Grid.GetText(SPR_PROPERTYREADING - 1, 2);

    var totalConsumptionVariance = Grid.GetText(SPR_VARIANCE - 1, 1);
    var utilityRateVariance = Grid.GetText(SPR_VARIANCE - 1, 2);

    var totalConsumptionPercent = Grid.GetText(SPR_INCREASEDECREASE - 1, 1);
    var utilityRatePercent = Grid.GetText(SPR_INCREASEDECREASE - 1, 2);

    var txtTotalUtility = parseFloat(Grid.GetText(SPR_SERVICEPROVIDER - 1, 0).replace(/,/g, ''));

    $('#txtTotalBillServiceProvider').val(totalbillServiceProvider);
    $('#txtTotalConsumptionServiceProvider').val(totalConsumptionServiceProvider);
    $('#txtUtilityRateServiceProvider').val(utilityRateServiceProvider);
    $('#txtTotalBillPropertyReading').val(totalBillPropertyReading);
    $('#txtTotalConsumptionPropertyReading').val(totalConsumptionPropertyReading);
    $('#txtUtilityRatePropertyReading').val(utilityRatePropertyReading);
    $('#txtTotalConsumptionVariance').val(totalConsumptionVariance);
    $('#txtUtilityRateVariance').val(utilityRateVariance);
    $('#txtTotalConsumptionPercent').val(totalConsumptionPercent);
    $('#txtUtilityRatePercent').val(utilityRatePercent);


    
    if ($('#isFixedMain').val() == 0) {
        $('.txtGridUtility').val(nwCurrency(utilityRatePropertyReading));
    } else {
        $('.txtGridUtility').val(nwCurrency(utilityRateServiceProvider));
    }

    var Grid = nwGridMainCon_Book.ActiveSheet;
    

    
}

function getGridData(idnum, index) {
    var data = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idnum + ")").find("td:eq(" + (index) + ")").text();
    return data;
}

function DisableFieldsEmpty() {
    componentFields(false);
    $('#lugSegment4').enable(false);
    $('#txtTransactionNo').enable(false);
    $('#txtStatus').enable(false);
    $('#txtReasonforDisapproval').enable(false);
    $('#txtDisapprovalRemarks').enable(false);
    $('#cmbBillPeriodFrom').enable(false);
    $('#nwGridMainCon').enable(false);
    $('#chkDistributeCom').enable(false);
    $("div.spantext").remove();
    $('#btnDocumentAttachment').enable(false);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
}

function ReloadMonth() {
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth() + 1;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    $('#cmbBillPeriodFrom').html("");
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
        $('#cmbBillPeriodFrom').append("<option value='" + (x + 1) + "'>" + monthNames[y] + "</option>");
    }
    $('#cmbBillPeriodFrom').val(monthNames[month - 1] + " " + year);
}

function getAdjustment() {
 
}

function disableselectdone() {
    $('.nwCheckBox1').enable(false);
   
}

function ClearFields() {
    $('#idvallugSegment2').val('');
    $('#descvallugSegment2').val('');
    $('#idvallugSegment3').val('');
    $('#descvallugSegment3').val('');
    $('#idvallugSegment4').val('');
    $('#descvallugSegment4').val('');
    $('#idvallugSegment5').val('');
    $('#descvallugSegment5').val('');
    $('#idvallugInvoice').val('');
    $('#descvallugInvoice').val('');
    $('#idvallugAccountableForms').val('');
    $('#descvallugAccountableForms').val('');
    $('#idvallugPhaseTower').val('');
    $('#descvallugPhaseTower').val('');

    $('#cmbBillPeriodFrom').val('');
    $('#cmbBillPeriodTo').val('');
    $('#dtpBillingDate').val('');

    $('#txtTransactionNo').val('');
    $('#txtStatus').val('');
    $('#txtRemarks').val('');
    $('#txtReasonforDisapproval').val('');
    $('#txtDisapprovalRemarks').val('');

    $('#txtTotalBillServiceProvider').val('');
    $('#txtTotalBillPropertyReading').val('');
    $('#txtUtilityRatePercent').val('');
    $('#txtTotalConsumptionServiceProvider').val('');
    $('#txtTotalConsumptionPropertyReading').val('');
    $('#txtUtilityRateServiceProvider').val('');
    $('#txtUtilityRatePropertyReading').val('');
    $('#txtTotalConsumptionPercent').val('');

    $('#chkDistributeCom').prop('checked', false);
    $('#chkDistributeCom').prop('checked', false);
    //$('#rbRegular').prop('checked', false);
    //$('#rbCustom').prop('checked', false);
    //$('#rbExempt').prop('checked', false);
}

function nwGrid_AddtoListDoneCustom($id, $this, i) {
    $t().addtoListDone($id, $this, i);
}

function nwgrid_PaginationNavDone(gridID) {
    if (gridID === "gridentry") {
        if ($('.nwgridcrindex').val() != undefined) {
            if(parseInt($('.nwgridcrindex').val()) > 1){
                $('#nwGridMainCon .tblGridBody tr:nth-child(1)').css('font-weight', 'normal');
            }
        }
        button();
      
        setImportedFile();
        yy();
        xx(0);
        zz();
        tt();
        DisableCurrentConsumption();
    } 
}

$(document).on("keyup", '.txtGridUtility', function () {


    AutoComputeLineDetails(_row);
    xx(1);
        tt();


});

//$(document).on("blur", '.txtCurrentConsumption', function () {
//    var nf = Intl.NumberFormat();
//    var data = nwTempTable_RowData_Get('nwGridMainCon', crnwTR.index(), SPR_CURRENTREADING, 'input').replace(/,/g, '');
//    $('#gridentry-nwData.tblGridBody tr:eq(' + crnwTR.index() + ')').find("td:eq(" + SPR_CURRENTCONSUMPTION + ") input").val(nf.format(data));

//});



$(document).on("keyup", '.txtCurrentReading', function () {
    getUtilityRateVRegular();
    AutoComputeLineDetails(_row);
    xx(0);
    tt();
    getAdjustment();
    colors();
});

function p8Spread_Change(canvasID, row, col) {
    if (canvasID == "GridPopUpDetails") {
        if (col == SPR_SERVICEPROVIDER - 1) {
            AutoComputePopupGrid();
        }
    }
    if (canvasID == "nwGridMainCon") {
        if (col == SPR_CURRENTCONSUMPTION - 1) {
            changetxtCurrentConsumption();
        }
    }
    return true;
}


function changetxtCurrentConsumption() {
    resetUtility();
    colors();
    getUtilityRateVRegular();
    AutoComputeLineDetails(_row);
    xx(0)
    tt();
    getAdjustment();
}

$(document).on("click", '#btnExport', function () {

    if (    $('#idvallugAccountableForms').val() !=  '' && 
            $('#idvallugPhaseTower').val() != '' &&
            $('#cmbBillPeriodFrom').val() != '' &&
            $('#cmbBillPeriodTo').val() != '' &&
            $('#dtpBillingDate').val() != '' &&
            $('#idvallugSegment4').val() != '') {
        cust_GetPara();
        nwLoading_Start("xSample", crLoadingHTML);
        func_ActionDriven("actDownloadtemplate", false);

    } else {
        MessageBox("Please complete the required header first.", pageTitle);
    }

    return false;
});

$(document).on("click", '#btnImport', function () {
    $("#fileCon").val("");
    $("#status").find("span").text("");
    $(".progress").find("div.percent").text("0%");
    $(".progress").find("div.bar").css("width", "0%");

    $('#btnDataCheck').enable(false);
    $('#btnValidationList').enable(false);
    nwParameter_Add_Table("nwGridMainCon", false);

    nwPopupForm_ShowModal("nwUploadCon");
});

function colors() {
   
}

function tt() {
    var cnt = 0;

    var totalCurrReading = 0;
    var totalCurrentConsumption = 0;
    var totalPreviousReading = 0;
    var totalPreviousConsumption = 0;
    var totalCurrentReading = 0;
    var totalAmount = 0;
    var totalBillAmt = 0;
    var totalForcesht = 0;
    var totalst = 0;
    var commonArea = 0;
    var nf = Intl.NumberFormat();
    var forceCommon = 0;
    var UtilityProvider = $('#txtUtilityRateServiceProvider').val(); 
    var ConPropertyReading = $('#txtTotalConsumptionPropertyReading').val().replace(/,/g, '');
    var ConServiceProvider = $('#txtTotalConsumptionServiceProvider').val().replace(/,/g, '');
    var totalbillPropertyReading = $('#txtTotalBillPropertyReading').val().replace(/,/g, '');
    var utilityReading = $('#txtUtilityRatePropertyReading').val().replace(/,/g, '');

    let startRow = 0;
    startRow = 1;

    var CurrentReading = 0;
    var CurrentConsumtion = 0;
    for (var row = startRow; row < nwGridMainCon_Book.ActiveSheet.GetMaxRow(); row++) {
        CurrentReading = isValid(parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_PREVIOUSREADING, row)));
        CurrentConsumtion = isValid(parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION, row)));

        if (CurrentReading > 0 || CurrentConsumtion > 0) {

            var tag = nwGridMainCon_Book.ActiveSheet.GetText(SPR_TAG, row)

            if (tag == "1") {
                commonArea += parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION, row)) * parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_UTILITYRATE, row));
            }

            totalCurrReading += parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTREADING, row))
            totalPreviousReading += isValid(parseFloat(nwGridMainCon_Book.ActiveSheet.GetText(SPR_PREVIOUSREADING, row)));
            totalPreviousConsumption += isValid(parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_PREVIOUSCONSUMPTION, row)));
            totalCurrentReading += isValid(parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTREADING, row)));
            totalCurrentConsumption += isValid(parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION, row)));

            if (nwGridMainCon_Book.ActiveSheet.GetMaxRow() != parseFloat(row) + 1) {
                let xtotalAmnt = nwGridMainCon_Book.ActiveSheet.GetText(SPR_TOTALAMOUNT, row);

                totalForcesht += parseFloat(xtotalAmnt);
                totalAmount += parseFloat(xtotalAmnt);
                totalBillAmt += isValid(parseFloat(nwGridMainCon_Book.ActiveSheet.GetText(SPR_TOTALBILLABLEAMOUNT, row)));
            
                if (tag == "0") {
                    forceCommon += parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_COMMONAREA, row));
                }
            }

            else {
                var totalBillAmt1 = 0;
                if ((parseFloat(ConPropertyReading) - parseFloat(ConServiceProvider)) == 0) {
                    if ($('#isFixedMain').val() == 0) {
                        totalst = isValid(parseFloat(totalbillPropertyReading) - parseFloat(totalForcesht));
                    } 
                    else {
                        totalst = parseFloat(totalForcesht);
                    }
                    totalAmount += parseFloat(totalst);
                }

                else {
                    if ($('#isFixedMain').val() == 0) {
                        totalst = isValid((parseFloat(utilityReading) * parseFloat(ConPropertyReading)) - parseFloat(totalForcesht));
                    }
                    else {
                        totalst = isValid((parseFloat(UtilityProvider) * parseFloat(ConPropertyReading)) - parseFloat(totalForcesht));
                    }

                    totalAmount += parseFloat(totalst);
                }
                if ($('#chkDistributeCom').prop("checked")) {
                    forceCommon = parseFloat(commonArea) - parseFloat(forceCommon);
                }

                var grdCurrConsump = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION, row);
                var grdCommArea = nwGridMainCon_Book.ActiveSheet.GetText(SPR_COMMONAREA, row);
                var grdUtilityRate = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_UTILITYRATE, row);
                var grdMinBill = nwGridMainCon_Book.ActiveSheet.GetText(SPR_MINIMUMBILLINGAMOUNT, row);
                var grdCustomBilling = nwGridMainCon_Book.ActiveSheet.GetText(SPR_CUSTOMBILLING, row);
                var grdMarkUp = nwGridMainCon_Book.ActiveSheet.GetText(SPR_MARKUPRATE, row);

                var totalAmt = isValid((parseFloat(grdCurrConsump) * parseFloat(grdUtilityRate))).toFixed(2);
              
                if (nwGridMainCon_Book.ActiveSheet.GetMaxRow() - 1 != 1) {
                    if (parseFloat(grdMinBill) == 0.00) {
                        totalBillAmt1 = parseFloat(totalst);
                    } else if (parseFloat(grdMinBill) > parseFloat(totalst)) {
                        totalBillAmt1 = (((parseFloat(grdMinBill) - parseFloat(grdCustomBilling)) * ((parseFloat(grdMarkUp) / 100) + 1)) + parseFloat(forceCommon)).toFixed(2);
                    } else {
                        totalBillAmt1 = (((parseFloat(totalst) - parseFloat(grdCustomBilling)) * ((parseFloat(grdMarkUp) / 100) + 1)) + parseFloat(forceCommon)).toFixed(2);
                    }

                    totalBillAmt += totalBillAmt1;
                    nwGridMainCon_Book.ActiveSheet.SetText(SPR_TOTALBILLABLEAMOUNT, row, setNumReplace(totalBillAmt1, 5));
                } 
               
            }

            
        }
    } //END OF LOOP

    var maxRow = nwGridMainCon_Book.ActiveSheet.GetMaxRow();
    if (maxRow <= 1) {

        nwGridMainCon_Book.ActiveSheet.SetText(SPR_COMMONAREA, 0, setNumReplace(totalPreviousReading, 2));
        nwGridMainCon_Book.ActiveSheet.SetValue(SPR_COMMONAREA, 0, setNumReplace(totalCurrentReading, 2));
        nwGridMainCon_Book.ActiveSheet.SetValue(SPR_COMMONAREA, 0, setNumReplace(totalCurrentConsumption, 2));
        nwGridMainCon_Book.ActiveSheet.SetText(SPR_COMMONAREA, 0, setNumReplace(totalAmount, 2));
        nwGridMainCon_Book.ActiveSheet.SetText(SPR_COMMONAREA, 0, setNumReplace(totalBillAmt, 2));
        nwGridMainCon_Book.ActiveSheet.SetText(SPR_COMMONAREA, 0, setNumReplace(totalPreviousConsumption, 2));


        if ($('#chkDistributeCom').prop("checked")) {
            nwGridMainCon_Book.ActiveSheet.SetText(SPR_COMMONAREA, 0, setNumReplace(commonArea, 2));
        }
        else {
            nwGridMainCon_Book.ActiveSheet.SetText(SPR_COMMONAREA, 0, '0.00');
        }
        //NYF CHECK nwTempTable_Row_Count 
        nwGridMainCon_Book.ActiveSheet.SetText(SPR_TOTALAMOUNT, 0, setNumReplace(totalst, 5));
        nwGridMainCon_Book.ActiveSheet.SetText(SPR_COMMONAREA, 0, setNumReplace(forceCommon, 2));
    }

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

function uu() {


    let startRow = 0;
    if (($('.nwgridcrindex').val() == undefined) || parseInt($('.nwgridcrindex').val()) <= 1) {
        startRow = 1;
    }
    var totalCurrentConsumption = 0;
    var totalBillAmt = 0;
    //for (var row = startRow; row < nwTempTable_Row_Count('nwGridMainCon') ; row++) {
    for (var row = startRow; row < nwGridMainCon_Book.ActiveSheet.GetMaxRow() ; row++) {

        //totalCurrentConsumption += parseFloat($(`#nwGridMainCon table tbody tr:eq(${row}) td:eq(${SPR_CURRENTCONSUMPTION}) input`).val().replace(/,/g, ''));
        totalCurrentConsumption += parseFloat(nwGridMainCon_Book.ActiveSheet.GetText(SPR_CURRENTCONSUMPTION, row));
        //totalBillAmt += parseFloat($(`#nwGridMainCon table tbody tr:eq(${row}) td:eq(${SPR_TOTALBILLABLEAMOUNT})`).text().replace(/,/g, ''));
        totalBillAmt += parseFloat(nwGridMainCon_Book.ActiveSheet.GetText(SPR_TOTALBILLABLEAMOUNT, row));

    }
    $('#txtTotalConsumptionPropertyReading').val((totalCurrentConsumption).toFixed(2));
}

function ww() {
    let startRow = 0;
    if (($('.nwgridcrindex').val() == undefined) || parseInt($('.nwgridcrindex').val()) <= 1) {
        startRow = 1;
    }
    var totlcons = 0;
    var xcnt = 0;
    var commonArea = 0;
    var isCommon = 0;
    //for (var row = startRow; row < nwTempTable_Row_Count('nwGridMainCon') ; row++) {
    for (var row = startRow; row < nwGridMainCon_Book.ActiveSheet.GetMaxRow() ; row++) {

        //var tag = $(`#nwGridMainCon table tbody tr:eq(${row}) td:eq(${SPR_TAG})`).text()
        var tag = nwGridMainCon_Book.ActiveSheet.GetText(SPR_TAG, row)

        if (tag == "1") {
            //totlcons = parseFloat(totlcons) + (parseFloat($(`#nwGridMainCon table tbody tr:eq(${row}) td:eq(${SPR_CURRENTCONSUMPTION}) input`).val().replace(/,/g, '')) * parseFloat($(`#nwGridMainCon table tbody tr:eq(${row}) td:eq(${SPR_UTILITYRATE}) input`).val().replace(/,/g, '')));
            totlcons = parseFloat(totlcons) + (parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION, row)) * parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_UTILITYRATE, row)));
            isCommon++;
        }
        else {
            xcnt++;
        }
    }

    if (isCommon != 0) {
        $('.txtCurrentConsumption').enable(false);
        commonArea = isValid(parseFloat(totlcons) / parseFloat(xcnt)).toFixed(2);
        comm(commonArea);
        yy();
        tt();
    
    }
    else {
        $('#chkDistributeCom').prop("checked", false);
        MessageBox("Cannot proceed. Meter No. for Common is required.", "Utilities Billing Entry", "error");
    }
}

function xx(isTag) {

    var entryDate = getCurrentDate();
    var datetoday = new Date(entryDate);
    var cnt = 0;
    var totalCurrentConsumption = 0;
    var totalBillAmt = 0;

    var CurrentReading = 0;
    var CurrentConsumtion = 0;

    var maxRow = nwGridMainCon_Book.ActiveSheet.GetMaxRow();
    let startRow = 0;
    if (maxRow <= 1) {
        startRow = 1;
    }
    for (var row = startRow; row < maxRow ; row++) {
        CurrentReading = isValid(parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_PREVIOUSREADING, row)));
        CurrentConsumtion = isValid(parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION, row)));

        if (CurrentReading > 0 || CurrentConsumtion > 0) {
            var curr = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION, row);
            if (curr == "" || parseFloat(curr) == 0) {
                cnt += 1;
            }

            totalCurrentConsumption += parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION, row));
            totalBillAmt += parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_TOTALBILLABLEAMOUNT, row));
        }
    }

    $('#txtTotalConsumptionPropertyReading').val((totalCurrentConsumption).toFixed(2));

    if (isTag == 0)
    {
        if (cnt > 0) {
            $('#chkDistributeCom').enable(false);

        }
        else {
            $('#chkDistributeCom').enable(true);
        }
    }
    
}

function yy() {
    let startRow = 1;

    for (var row = startRow; row <= nwGridMainCon_Book.ActiveSheet.GetMaxRow() ; row++) {
        AutoComputeLineDetails(row);
    }
}

function comm(unit) {
    let startRow = 0;
    if (($('.nwgridcrindex').val() == undefined) || parseInt($('.nwgridcrindex').val()) <= 1) {
        startRow = 1;
    }
    //for (var row = startRow; row < nwTempTable_Row_Count('nwGridMainCon') ; row++) {
    for (var row = startRow; row < nwGridMainCon_Book.ActiveSheet.GetMaxRow() ; row++) {

        //var tag = nwTempTable_RowData_Get('nwGridMainCon', row, SPR_TAG);
        var tag = nwGridMainCon_Book.ActiveSheet.GetText(SPR_TAG, row)

        if (tag == "0") {
            //$('#gridentry-nwData.tblGridBody tr:eq(' + row + ')').find("td:eq(" + (SPR_UTILITYRATE - 1) + ")").text(setNumReplace(unit, 2));
            nwGridMainCon_Book.ActiveSheet.SetText(SPR_UTILITYRATE, index, setNumReplace(unit, 2));
        }
        else {
            //$('#gridentry-nwData.tblGridBody tr:eq(' + row + ')').find("td:eq(" + (SPR_UTILITYRATE - 1) + ")").text('');
            nwGridMainCon_Book.ActiveSheet.SetText(SPR_UTILITYRATE, index, '');
        }
    }
}

function zz() {
    var totalCurrentConsumption = 0;
    var totalPreviousReading = 0;
    var totalCurrentReading = 0;
    var totalBillAmt = 0;
    var startRow = 1;
    for (var row = startRow; row < nwGridMainCon_Book.ActiveSheet.GetMaxRow() ; row++) {
        totalCurrentConsumption += parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION, row));
        totalPreviousReading += parseFloat(nwGridMainCon_Book.ActiveSheet.GetText(SPR_PREVIOUSREADING, row));
        totalCurrentReading += parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTREADING, row));
        totalBillAmt += isValid(parseFloat(nwGridMainCon_Book.ActiveSheet.GetText(SPR_TOTALBILLABLEAMOUNT, row)));
    }

    $('#txtTotalConsumptionPropertyReading').val((totalCurrentConsumption).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    getAdjustment();
    //added
    nwGridMainCon_Book.ActiveSheet.SetValue(SPR_CURRENTREADING, 0, parseFloat(totalCurrentReading).toFixed(2));
    nwGridMainCon_Book.ActiveSheet.SetValue(SPR_CURRENTCONSUMPTION, 0, parseFloat(totalCurrentConsumption).toFixed(2));
}

$(document).on("change", "#fileCon", function () {
    changeFile(this);
});


$(document).on("click", "#btnDoneRemarks", function () {
    $fn().onClickEvent.btnRemarksDone();
});

function button() {
    $("#btnExport").css("height", "75%");
}

//NYF
function setImportedFile()
{
    let startRow = 0;

    if (($('.nwgridcrindex').val() == undefined) || parseInt($('.nwgridcrindex').val()) <= 1) {
        startRow = 1;
       
    }
   

    if (tmpup.length > 0)
    {
        //for (var row = startRow; row < nwTempTable_Row_Count('nwGridMainCon') ; row++) {
        for (var row = startRow; row < nwGridMainCon_Book.ActiveSheet.GetMaxRow() ; row++) {

            //let unitCode = $(`#nwGridMainCon table tbody tr:eq(${row}) td:eq(${SPR_UNITCODE})`).text();
            let unitCode = nwGridMainCon_Book.ActiveSheet.GetText(SPR_UNITCODE, row)
            //let meterNo = $(`#nwGridMainCon table tbody tr:eq(${row}) td:eq(${SPR_METERNO})`).text();
            let meterNo = nwGridMainCon_Book.ActiveSheet.GetText(SPR_METERNO, row)

            let xtmp = tmpup.filter(e => e["UnitCode"] == unitCode && e["MeterNo"] == meterNo);
            if (xtmp.length > 0) {
                //if (parseFloat($(`#nwGridMainCon table tbody tr:eq(${row}) td:eq(${SPR_PREVIOUSREADING})`).text().replace(/,/g, '')) < 1)
                var prevRead = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_PREVIOUSREADING, row))
                var currRead = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTREADING, row))

                if (prevRead < 1) {
                    //$('#gridentry-nwData.tblGridBody tr:eq(' + row + ')').find('td:eq(' + SPR_PREVIOUSREADING + ')').text(nwCurrency(xtmp[0]["PreviousReading"]));
                    nwGridMainCon_Book.ActiveSheet.SetText(SPR_PREVIOUSREADING, row, nwCurrency(xtmp[0]["PreviousReading"]));
                    //$('#gridentry-nwData.tblGridBody tr:eq(' + row + ')').find('td:eq(' + SPR_CURRENTREADING + ') input').val(nwCurrency(xtmp[0]["CurrentReading"]));
                    nwGridMainCon_Book.ActiveSheet.SetText(SPR_CURRENTREADING, row, nwCurrency(xtmp[0]["CurrentReading"]));
                }

                if (currRead < 1) {
                    //$('#gridentry-nwData.tblGridBody tr:eq(' + row + ')').find('td:eq(' + SPR_CURRENTREADING + ') input').val(nwCurrency(xtmp[0]["CurrentReading"]));
                    nwGridMainCon_Book.ActiveSheet.SetText(SPR_CURRENTREADING, row, nwCurrency(xtmp[0]["CurrentReading"]));
                }
            }

        }

    }
}

function ComputeSewerFees(xRow, isAll) {
    var SewerRate = 0;
    var BillingAmount = 0;
    var SewerAmt = 0;
    var TotalBillableAmount = 0;
    let startRow = 0;
        startRow = 1;

    if (isAll == 1) {
        for (var row = startRow; row < nwGridMainCon_Book.ActiveSheet.GetMaxRow() ; row++) {

            let unitCode = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_UNITCODE, row);
            ComputeTotalBillableAmountWithMultiplier(row, 0);

            if (unitCode.length > 0) {
                SewerRate = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_SEWERRATE, row)) || 0;
                BillingAmount = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_TOTALBILLABLEAMOUNT, row)) || 0;
                let currConsump = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION, row)) || 0;
                TotalBillableAmount += BillingAmount;

                SewerAmt = currConsump * SewerRate;

                nwGridMainCon_Book.ActiveSheet.SetText(SPR_SEWERFEES, row, nwCurrency(SewerAmt));
            }

        }
       

    }
    else {
        let unitCode = nwGridMainCon_Book.ActiveSheet.GetText(SPR_UNITCODE, xRow)

        if (unitCode.length > 0) {

            SewerRate = parseFloat(nwGridMainCon_Book.ActiveSheet.GetText(SPR_SEWERRATE, xRow)) || 0;
            BillingAmount = parseFloat(nwGridMainCon_Book.ActiveSheet.GetText(SPR_TOTALBILLABLEAMOUNT, xRow)) || 0;
            let currConsump = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION, xRow)) || 0;
            SewerAmt = currConsump * SewerRate;
            nwGridMainCon_Book.ActiveSheet.SetText(SPR_SEWERFEES, xRow, nwCurrency(SewerAmt));
        }

        ComputeTotalBillableAmountWithMultiplier(xRow, 0);
       
    }
    
}

function ComputeTotalBillableAmountWithMultiplier(xRow, isAll) {
    var Multipler = 0;
    var BillingAmount = 0;
    var TotalAmount = 0;
    let startRow = 0;
    if (($('.nwgridcrindex').val() == undefined) || parseInt($('.nwgridcrindex').val()) <= 1) {
        startRow = 1;
    }
    if (isAll == 1) {
        for (var row = startRow; row < nwTempTable_Row_Count('nwGridMainCon') ; row++) {
            let unitCode = nwGridMainCon_Book.ActiveSheet.GetText(SPR_UNITCODE, row);

            if (unitCode.length > 0) {
                Multipler = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_MULTIPLIER, row)) || 1;
                BillingAmount = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_TOTALBILLABLEAMOUNT, row)) || 0;

                if (Multipler <= 0)
                    Multipler = 1;

                TotalAmount = BillingAmount * Multipler;

                nwGridMainCon_Book.ActiveSheet.SetValue(SPR_TOTALBILLABLEAMOUNT, row, setNumReplace(TotalAmount, 5));
            }

        }
    }
    else {
        let unitCode = nwGridMainCon_Book.ActiveSheet.GetText(SPR_UNITCODE, xRow);

        if (unitCode.length > 0) {
            Multipler = parseFloat(nwGridMainCon_Book.ActiveSheet.GetText(SPR_MULTIPLIER, xRow)) || 1;
            BillingAmount = parseFloat(nwGridMainCon_Book.ActiveSheet.GetText(SPR_TOTALBILLABLEAMOUNT, xRow)) || 0;

            if (Multipler <= 0)
                Multipler = 1;
            TotalAmount = BillingAmount * Multipler;    
          
            nwGridMainCon_Book.ActiveSheet.GetText(SPR_TOTALBILLABLEAMOUNT, xRow, setNumReplace(TotalAmount, 5));
        }
    }

}

function DisableCurrentConsumption() {

    //$('#gridentry-nwData.tblGridBody tr:eq(' + 0 + ')').find('td:eq(' + SPR_CURRENTCONSUMPTION + ')').css('background-color', 'gainsboro');
    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_CURRENTCONSUMPTION, 0, 'gainsboro');
    //$('#gridentry-nwData.tblGridBody tr:eq(' + 0 + ')').find('td:eq(' + SPR_CURRENTCONSUMPTION + ') input').css('background-color', 'gainsboro');
    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_CURRENTCONSUMPTION, 0, 'gainsboro');
    //$('#gridentry-nwData.tblGridBody tr:eq(' + 0 + ')').find('td:eq(' + SPR_CURRENTCONSUMPTION + ') input').enable(false);
    nwGridMainCon_Book.ActiveSheet.SetEnable(SPR_CURRENTCONSUMPTION, 0, false);

    //for (var row = 0; row < nwTempTable_Row_Count('nwGridMainCon') ; row++) {
    for (var row = 0; row < nwGridMainCon_Book.ActiveSheet.GetMaxRow() ; row++) {
        //$('#gridentry-nwData.tblGridBody tr:eq(' + row + ')').find('td:eq(' + SPR_PREVIOUSCONSUMPTION + ') input').css('background-color', 'gainsboro');
        nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_PREVIOUSCONSUMPTION, row, 'gainsboro');
        //$('#gridentry-nwData.tblGridBody tr:eq(' + row + ')').find('td:eq(' + SPR_PREVIOUSCONSUMPTION + ') input').enable(false);
        nwGridMainCon_Book.ActiveSheet.SetEnable(SPR_PREVIOUSCONSUMPTION, 0, false);

    }


    if (getParameterByName("nwDocno").length > 0) {
        $('#nwGridMainCon').enable(true);
    }

}


function p8Spread_Click(canvasID, row, col) {

}


function showGridButtons() {

    var varLength = $('.nwgridButtons').find('.btnImport');

    if (varLength.length == 0) {

        $('.nwgridButtons').append('<div class="nwgrid_buttonsCon"><span class="btnImage"></span><button id="btnExport" nwid="btnExport" class="nwgrid_buttonCustom nwgrid_buttons" nwdisabled="false">Download Loading Template</button></div>');
        $('.nwgridButtons').append('<div class="nwgrid_buttonsCon"><span class="btnImage"></span><button id="btnImport" nwid="btnImport" class="nwgrid_buttonCustom nwgrid_buttons" nwdisabled="false">Import Uploading File</button></div>');

        //$('.nwgridButtons').append("<div class=\"nwgrid_buttonsCon\"><span class=\"btnImage\"></span><button id=\"btnLoadDetails\" nwid=\"btnLoadDetails\" class=\"nwgrid_buttonCustom nwgrid_buttons\" nwdisabled=\"false\"><i class='fas fa-sync-alt' aria-hidden='true'></i> LOAD DETAILS</button></div>");
        $('.nwgridButtons').append("<div><input id='chkDistributeCom' class='text nwCuz-023' type='checkbox' maxlength='80'/>Distribute Common Area</div>");
    }
}

function isCustom1() {

    ('.txtGridUtility').enable(true);
    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_UTILITYRATE, Spread_ALLROW, 'white');
    //$('#nwGridMainCon .tblGridBody ').find('tr').find('td:eq(${SPR_UTILITYRATE}) input').css('background-color', 'white');
    //nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_UTILITYRATE, Spread_ALLROW, 'white');
}

function isExempt1() {

    $('.txtGridUtility').enable(false);
    $('.txtCurrentConsumption').enable(false);
    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_CURRENTCONSUMPTION, Spread_ALLROW, 'gainsboro');
    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_UTILITYRATE, Spread_ALLROW, 'gainsboro');

    ////$('#nwGridMainCon .tblGridBody ').find('tr').find('td:eq(${SPR_CURRENTCONSUMPTION}) input').css('background-color', 'gainsboro');
    ////$('#nwGridMainCon .tblGridBody ').find('tr').find('td:eq(${SPR_UTILITYRATE}) input').css('background-color', 'gainsboro');
    ////nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_CURRENTCONSUMPTION, Spread_ALLROW, 'gainsboro');
    ////nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_UTILITYRATE, Spread_ALLROW, 'gainsboro');
}

function isNone() {

    $('.txtGridUtility').enable(false);
    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_UTILITYRATE, Spread_ALLROW, 'gainsboro');
}

function formatGrid() {

    nwGridMainCon_Book.ActiveSheet.SetEnable(SPR_UTILITYRATE, 0, false);
    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_UTILITYRATE, 0, 'gainsboro');

    nwGridMainCon_Book.ActiveSheet.SetEnable(SPR_CURRENTCONSUMPTION, 0, false);
    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_CURRENTCONSUMPTION, 0, 'gainsboro');

    nwGridMainCon_Book.ActiveSheet.SetEnable(SPR_SELECT, 0, false);
    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_SELECT, 0, 'gainsboro');

}

function computeTotal() {

    let startRow = 0;
    if (($('.nwgridcrindex').val() == undefined) || parseInt($('.nwgridcrindex').val()) <= 1) {
        startRow = 1;
    }

    for (var row = startRow; row < nwGridMainCon_Book.ActiveSheet.GetMaxRow() ; row++) {

    }
}

function getLookupData(idnum, index) {
    var data = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idnum - 1) + ") td:eq(" + (index) + ") span").text();
    return data;
}


function $fn() {
    let $fn = {
        header: {
            invCode: $("#idvallugInvoice"),
            invDesc: $("#descvallugInvoice"),
            locCode: $("#idvallugAccountableForms"),
            locDesc: $("#descvallugAccountableForms"),
            phaseTowerCode: $("#idvallugPhaseTower"),
            phaseTowerDesc: $("#descvallugPhaseTower"),
            billingDate: $("#dtpBillingDate"),
            billingFrom: $("#cmbBillPeriodFrom"),
            billingTo: $("#cmbBillPeriodTo"),


            seg2Code: $("#idvallugSegment2"),
            seg2Desc: $("#descvallugSegment2"),
            seg3Code: $("#idvallugSegment3"),
            seg3Desc: $("#descvallugSegment3"),
            seg4Code: $("#idvallugSegment4"),
            seg4Desc: $("#descvallugSegment4"),
            seg5Code: $("#idvallugSegment5"),
            seg5Desc: $("#descvallugSegment5"),

            //modal remarks
            btnPopUp: $("button.btnpopup"),
            btnDocAttach: $("#btnDocumentAttachment"),

            //lookups
            lookups: $(".lookups"),

            //lookupFilter
            lookupFilter: $(".lookupFilter"),

            //dateFilter
            dateFilter: $(".dateFilter"),
            dateFrom: $("#dateFrom"),
            dateTo: $("#dateTo"),
            filterDate: $(".txtFilterDate"),
        },

        line: {
            gridentry: $("#nwGridMainCon"),

            initialize: function () {
                let arr = ["gridentry"];
                $.each(arr, function (i) {
                    $(`#${arr[i]} .nwgrid_PagerCon`).closest("div.nwgridButtons").remove();
                    $(`#${arr[i]} table.tblGridBody tbody tr`).remove();
                    nwGrid_AddRow(arr[i], 5);
                });
            },

            adminFee: $("#nwGridMainCon table tbody tr .txtAdminFee")
        },

        button: {
            //btnLoadDtls: $("#btnLoadDetails"),
            btnExport: $('#btnExport')
        },
        checkbox: {
            chkDistrib: $("#chkDistributeCom")
        },
        onNew: function () {
            $fn.header.consBillDate.loadDatepicker({ value: $fn.today });
            $fn.toggleBtnColor();
            $fn.onChangeEvent.consBillDate();
            $fn.header.rates.loadCurrency({ integerDigits: 5 });
        },

        onReload: function () {
            $fn.header.tabs.loadAddtoList({ list: ["Utility", "Tenant", "Contract No."], icon: true });
            $fn.header.filterDate.loadDatepicker();
            $fn.onClickEvent.btnPopUp();
            $fn.onChangeEvent.rates();
            $fn.onChangeEvent.dateFrom();
            $fn.onChangeEvent.dateTo();
        },

        toggleBtnColor: function () {
            if ($fn.header.remarks.val() !== "") $fn.header.btnRemarks.css("background-image", "linear-gradient(#85dbee, #2096c9)");
            else $fn.header.btnRemarks.removeAttr("style");

            if ($fn.header.dremarks.val() !== "") $fn.header.btnDRemarks.css("background-image", "linear-gradient(#85dbee, #2096c9)");
            else $fn.header.btnDRemarks.removeAttr("style");
        },

        today: moment(new Date($DateToday)).format('MM/DD/YYYY'),

        computation: {
        },

        lookUpDone: {
            locAcctForm: function () {
                $("div.spantext").remove();
                $fn.line.initialize();
            }
        },

        clearFields: function () {
            $("div.dvinput input").val("");
            $("div.dvinput textarea").val("");
            $("div.noah-webui-containerRowItem div.lookups div.conval input").val("");
            $("div.spantext").remove();
            $("div.dateFilter input").val("");
        },

        onChangeEvent: {
            consBillDate: function () {
                $fn.header.consBillDate.change(function () {
                    let consdate = new Date($fn.header.consBillDate.val());
                    let datetoday = new Date($fn.today);

                    if (consdate < datetoday) {
                        MessageBox("Cannot proceed. Consumption Billing Date should not be earlier than the current server date.", pageTitle, 'error');
                        $fn.header.consBillDate.val($fn.today);
                    }
                });
            },

            rates: function () {
                $fn.header.rates.on("keyup blur", function () {
                    $fn.line.initialize();

                });
            },

            adminFee: function () {
            },

            dateFrom: function () {
                $fn.header.dateFrom.change(function () {
                    $fn.header.dateTo.val($(this).val());
                });
            },

            dateTo: function () {
                $fn.header.dateTo.change(function () {
                    if ($(this).val() === "") {
                        $(this).val($fn.header.dateFrom.val());
                        return false;
                    }

                    var dfrom = new Date($fn.header.dateFrom.val());
                    var dto = new Date($(this).val());

                    if (dfrom > dto) {
                        MessageBox("Date To should not be earlier than Date From.", pageTitle, 'error');
                        $(this).val($fn.header.dateFrom.val());
                    }
                });
            }

        },

        onClickEvent: {
            btnPopUp: function () {
                $fn.header.btnPopUp.click(function () {
                    let $id = $(this).attr("id"),
                        value = $("#" + $id).siblings("textarea").val();

                    if ($(this).is("#btnRemarks")) {
                        nwPopupForm_ShowModal("modal-remarks");
                        $($fn.header.modaltxtRemarks.selector).val(value);
                        if (consbillno.length > 0) {
                            $($fn.header.modaltxtRemarks.selector).prop("disabled", true);
                            $($fn.header.btnRemarksDone.selector).prop("disabled", true);
                        }
                    }
                    else if ($(this).is("#btnDisapproval")) {
                        nwPopupForm_ShowModal("modal-dremarks");
                        $($fn.header.modaltxtRemarks.selector).val(value);
                    }

                });
            },

            btnRemarksDone: function () {
                let value = $fn.header.modaltxtRemarks.val();
                $fn.header.remarks.val(value);
                window_close('modal-remarks');
                $fn.toggleBtnColor();
            },

            btnLoadDtls: function () {
                $fn.button.btnLoadDtls.click(function () {
                    nwLoading_Start("xLoading", crLoadingHTML);

                    nwParameter_Add("LocAccountFormCode", $('#idvallugAccountableForms').val());
                    nwParameter_Add("idvallugInvoice", $('#idvallugInvoice').val());

                    nwParameter_Add("tag1", tag1);
                    nwParameter_Add("PhaseTower", $('#idvallugPhaseTower').val());

                    nwParameter_Add("tag2", tag2);

                    if (!$fn.header.isEmpty()) {
                        cust_GetPara();
                        func_ActionDriven("actLoadDetails");

                    } else {
                        nwLoading_End('xLoading');
                        MessageBox("Please complete the required header first.", pageTitle, 'error');
                    }

                });


            },
            btnExport: function () {
                $fn.button.btnExport.click(function () {
                    nwLoading_Start("xLoading", crLoadingHTML);

                    if (!$fn.header.isEmpty()) {
                        cust_GetPara();
                        func_ActionDriven("actDownloadtemplate");

                    } else {
                        nwLoading_End('xLoading');
                        MessageBox("Please complete the required header first.", pageTitle, 'error');
                    }

                });


            },

        },

        customFunc: {
            GridOnLoad: function () {
            }
        }

    };

    return $fn;
}


function nwPopUpGridCon() {
    setTimeout(function () {
        $('#btnLoadDetails').addClass('btn-default btn-default-orange')
    }, 100)
}

function cuz_SaveUtility() {
    getUtilityData(); //get utility rate from pop up
    cuzUtilityRate();//set utility rate
    yy(); // compute total billable amount,total amount, current consumption and percentage, ComputeSewerFees
    zz(); //current reading and current consumption, get adjustment
    tt(); //total amount and total aread
    getAdjustment();
    ComputeSewerFees(0, 1);
    colors(); //utility rate button
    nwPopupForm_HideModal('nwDetails');
}

function cuzUtilityRate() {
    var Grid = nwGridMainCon_Book.ActiveSheet;
    var maxRow = Grid.GetMaxRow();

    for (i = 1; i <= maxRow; i++) {
        nwGridMainCon_Book.ActiveSheet.SetValue(SPR_UTILITYRATE, i, $('#txtUtilityRateServiceProvider').val())
    }

}

function cuz_SetLabelSegment() {
   
}

$(document).on('click', '#btnProceed', function () {
    var isContinue = false;

    var link = $("#cbInvoiceType").find("option:Selected").attr("nvalue");
    window.location = link;
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

$(document).on("change", "#cmbBillPeriodFrom, #cmbBillPeriodTo", function (e) {
    resetGrid();
});

function resetGrid() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var maxLen = Grid.GetMaxRow();

    Grid.RowDelete(0, maxLen);
    Grid.RowAdd(0, 2);
}

