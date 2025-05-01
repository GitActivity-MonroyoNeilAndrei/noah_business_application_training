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

var jsonInvoiceType = [];
var InvoiceType = "";


function func_Reload() {
    crLnk =  GetCurrentURL() + "PMOUtilitiesBillingEntry_Gateway";
    crLnkGateKey = "PMOUtilitiesBillingEntry";
    crnwTagSingleBind = true;//data setup, doc entry, data config na may 2 or more data

    nwPopupForm_Create('nwDetails', true);
    nwPopupForm_Create('nwUploadCon', true);
    nwPopupForm_Create('modal-dremarks', true);
    nwPopupForm_Create("modal-remarks", false);
    nwPopupForm_Create("nwInvoiceType", false);

    DisableFields();


    InvoiceType = getParameterByName("nwInvoiceType");
    if (InvoiceType == "INVUTL") {
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


let startindex = 1,
     SPR_SELECT = startindex,
     SPR_UNIT = ++startindex,
     SPR_CUSTOMER = ++startindex,
     SPR_TRANNO = ++startindex,
     SPR_ACCOUNTNO = ++startindex,
     SPR_METERNO = ++startindex,
     SPR_PREVIOUSREADING = ++startindex,
     SPR_CURRENTREADING = ++startindex,
     SPR_CURRENTCONSUMPTION = ++startindex,
     SPR_PREVIOUSCONSUMPTION = ++startindex,
     SPR_PERCENTINCREASE = ++startindex,
     SPR_UTILITYRATE = ++startindex,
     SPR_TOTALAMOUNT = ++startindex,
     SPR_MARKUPRATE = ++startindex,
     SPR_MINIMUMBILLINGAMOUNT = ++startindex,
     SPR_UTNETOFVAT = ++startindex,
     SPR_UTVAT = ++startindex,
     SPR_UTGROSSAMOUNT = ++startindex,
     SPR_UTCWT = ++startindex,
     SPR_UTTOTALBILLABLEAMOUNT = ++startindex,
     SPR_SFNETOFVAT = ++startindex,
     SPR_SFVAT = ++startindex,
     SPR_SFGROSSAMOUNT = ++startindex,
     SPR_SFCWT = ++startindex,
     SPR_SFTOTALBILLABLEAMOUNT = ++startindex,
     //HIDDEN
     SPR_SEWERRATE = ++startindex,
     SPR_CUSTOMERCODE = ++startindex,
     SPR_VAT = ++startindex,
     SPR_CWT = ++startindex,
     SPR_VATRATE = ++startindex,
     SPR_CWTRATE = ++startindex;

var _indef;
var _enume;
function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    
    EnableFields();
    ClearFields();
    func_Toolbox_Clear();

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
    nwParameter_Add("idvallugInvoice", $('#idvallugInvoice').val());
    
    nwParameter_Add("PhaseTower", $('#idvallugPhaseTower').val());
    nwParameter_Add("Project", $('#idvallugProject').val());


    nwParameter_Add("Utility", $('#idvallugUtility').val());
    nwParameter_Add("UtilityDesc", $('#descvallugUtility').val());
    
    nwParameter_Add("BillingFrom", $('#txtBillPeriodFrom').val());
    nwParameter_Add("BillingTo", $('#txtBillPeriodTo').val());
    nwParameter_Add("BillingDate", $('#dtpBillingDate').val());

    nwParameter_Add("TotalUtilityBill", $('#txtTotalUtilityBill').val());
    nwParameter_Add("TotalConsumption", $('#txtTotalConsumption').val());
    nwParameter_Add("TotalBIllableAmount", $('#txtTotalBIllableAmount').val());
    nwParameter_Add("Adjustments", $('#txtAdjustments').val());
    nwParameter_Add("Remarks", $('#txtRemarks').val());
    nwParameter_Add("TransactionNo", $('#txtTransactionNo').val());

    nwParameter_Add("lugCostCenter", $('#idvallugCostCenter').val());

    nwParameter_Add("TotalBillServiceProvider", $('#txtTotalBillServiceProvider').val().replace(/,/g, ""));
    nwParameter_Add("TotalConsumptionServiceProvider", $('#txtTotalConsumptionServiceProvider').val().replace(/,/g, ""));
    nwParameter_Add("UtilityRateServiceProvider", $('#txtUtilityRateServiceProvider').val().replace(/,/g, ""));
    nwParameter_Add("TotalBillPropertyReading", $('#txtTotalBillPropertyReading').val().replace(/,/g, ""));
    nwParameter_Add("TotalConsumptionPropertyReading", $('#txtTotalConsumptionPropertyReading').val().replace(/,/g, ""));
    nwParameter_Add("UtilityRatePropertyReading", $('#txtUtilityRatePropertyReading').val().replace(/,/g, ""));
    nwParameter_Add("TotalConsumptionVariance", $('#txtTotalConsumptionVariance').val().replace(/,/g, ""));
    nwParameter_Add("UtilityRateVariance", $('#txtUtilityRateVariance').val().replace(/,/g, ""));
    nwParameter_Add("TotalConsumptionPercent", $('#txtTotalConsumptionPercent').val().replace(/,/g, ""));
    nwParameter_Add("UtilityRatePercent", $('#txtUtilityRatePercent').val().replace(/,/g, ""));


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
        $('#idvallugProject').val(getLookupData(idNum, 2));
        $('#descvallugProject').val(getLookupData(idNum, 3));
        $('#idvallugSegment5').val(getLookupData(idNum, 4));
        $('#descvallugSegment5').val(getLookupData(idNum, 5));
        loadSegment("phstwr", $('#idvallugPhaseTower').val(), $('#descvallugPhaseTower').val());
        nwParameter_Add("bill", 1);
        func_ActionDriven("actResetGrid");
    }
    else if (idName === "lugUtility") {
        nwLoading_Start("actResetGrid", crLoadingHTML);
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
    $('#lugPhaseTower').enable(en);
    $('#lugUtility').enable(en);

    $('#txtBillPeriodTo').enable(en);
    $('#dtpBillingDate').enable(en);
    $('#txtRemarks').enable(en);
    $('#lugCostCenter').enable(en);
    //$('#lugSegment' + $('#txtEnableSeg').val()).enable(true);
}

function EnableFields() {
    componentFields(true);

    $('#nwGridMainCon').enable(true);
    $("div.spantext").remove();
}


function getrbBTValues() {
        $('#txtTotalUtilityBill').enable(true);
        $('#txtTotalUtilityBill').val('0.00');
        $('#txtTotalBIllableAmount').val('0.00'); 
        $('#txtAdjustments').val('0.00');

        $('#txtBillPeriodFrom').enable(true);
        $('#txtBillPeriodFrom').val('');
        $('#txtBillPeriodTo').enable(true);
        $('#txtBillPeriodTo').val('');
        $('#ubill').text('*');
        func_ActionDriven("actloadBillFrom", false);
    disableSelect();

}



function getrbValues() {
    $('#txtBillPeriodTo').enable(true);
    $('#ubill').text('');
    $('#txtTotalUtilityBill').enable(false);
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

    $('#txtTotalUtilityBill').enable(false);
    $('#txtTotalBIllableAmount').enable(false);
    $('#txtAdjustments').enable(false);
    $('#txtTransactionNo').enable(false);
    $('#txtStatus').enable(false);
    $('#txtReasonforDisapproval').enable(false);
    $('#txtDisapprovalRemarks').enable(false);
    $('#lugProject').enable(false);
    $('#txtBillPeriodFrom').enable(false);
    $('#nwGridMainCon').enable(false);
    $('#btnLoadDetails').enable(false);
    $('#rbCustom').enable(false);
    $('#rbExempt').enable(false);
    $('#btnUtilityRate').enable(false);
    $('#lugSegment2').enable(false);
    $('#lugSegment3').enable(false);
    $('#btnDocumentAttachment').enable(false);
    $('#lugCostCenter').enable(false);
    $('#lugSegment5').enable(false);

    $('#idvallugProject').enable(false);
    $('#descvallugProject').enable(false);
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
    $('#lugUtility').enable(false);
    $('#btnLoadDetails').enable(false);
    $('#btnImport').enable(false);

    if ($('#txtTransactionNo').val() == "") {
        DisableFieldsEmpty();

        $('#btnDocumentAttachment').enable(false);
        $('#btnUtilityRate').enable(false);

        $('#btnUtilityRate').addClass('btn-default-orange');
        $('#btnUtilityRate').removeClass('btn-default-green');
        $('#btnUtilityRate').enable(false);

        $('#nwGridMainCon').enable(false);

        $("#noah-webui-Toolbox").bindingSave().enable(false);

    }
    else {
        $('#btnDocumentAttachment').enable(true);
        $('#btnUtilityRate').enable(true);
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

    var current = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION - 1, index));
    var utility = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_UTILITYRATE  - 1, index));

    var totalAmount = ((current) * utility).toFixed(2);

    var markup = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_MARKUPRATE - 1, index));
    var MinBill = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_MINIMUMBILLINGAMOUNT - 1, index));

    var totalBillAmount = totalBillAmount = (totalAmount) * ((markup / 100) + 1);
   
    nwGridMainCon_Book.ActiveSheet.SetText(SPR_TOTALAMOUNT - 1, index, totalAmount);
    nwGridMainCon_Book.ActiveSheet.SetText(SPR_MINIMUMBILLINGAMOUNT - 1, index, totalBillAmount);
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

    var grdPrevReading = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_PREVIOUSREADING - 1, index); //previous reading
    var grdCurrReading = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTREADING - 1, index); //current reading

    //current consumption
    var CurreConsumption = (isValid(parseFloat(grdCurrReading) - parseFloat(grdPrevReading))).toFixed(2); 
    nwGridMainCon_Book.ActiveSheet.SetValue(SPR_CURRENTCONSUMPTION - 1, index, CurreConsumption.replace(/\d(?=(\d{3})+\.)/g, '$&,'));

    var grdPrevConsump = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_PREVIOUSCONSUMPTION - 1, index); //previous consumption

    //% Increase (Decrease)		
    var increaseDecrease = ((CurreConsumption - grdPrevConsump) / grdPrevConsump).toFixed(2);
    nwGridMainCon_Book.ActiveSheet.SetValue(SPR_PERCENTINCREASE - 1, index, increaseDecrease.replace(/\d(?=(\d{3})+\.)/g, '$&,'));

    var grdUtilityRate = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_UTILITYRATE - 1, index); //utility rate
    var totalAmt = isValid((parseFloat(CurreConsumption) * parseFloat(grdUtilityRate))).toFixed(2); //total amount
    var grdMarkUp = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_MARKUPRATE - 1, index); //mark up rate
    var grdMinBill = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_MINIMUMBILLINGAMOUNT - 1, index); //Minimum billable amount

    var perInc = (isValid(((parseFloat(CurreConsumption) - parseFloat(grdPrevConsump)) / parseFloat(grdPrevConsump))) * 100).toFixed(2);

    var grdCurrConsump = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION - 1, index);

    var grdPercInc = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_PERCENTINCREASE - 1, index);
    var grdTotalAmount = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_TOTALAMOUNT - 1, index);
    var grdTotalBill = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_MINIMUMBILLINGAMOUNT - 1, index);

    var totalBillAmt = 0;
        
    if (parseFloat(grdMinBill) == 0.00) {
        totalBillAmt = (((parseFloat(totalAmt)) * ((isValid(parseFloat(grdMarkUp)) / 100) + 1))).toFixed(5);
    } else if (parseFloat(grdMinBill) > parseFloat(totalAmt)) {
        totalBillAmt = (((isValid(parseFloat(grdMinBill))) * ((isValid(parseFloat(grdMarkUp)) / 100) + 1))).toFixed(5);
    } else {
        totalBillAmt = (((parseFloat(totalAmt)) * ((isValid(parseFloat(grdMarkUp)) / 100) + 1))).toFixed(5);
    }

    nwGridMainCon_Book.ActiveSheet.SetValue(SPR_MINIMUMBILLINGAMOUNT - 1, index, totalBillAmt.replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    nwGridMainCon_Book.ActiveSheet.SetValue(SPR_TOTALAMOUNT - 1, index, totalAmt.replace(/\d(?=(\d{3})+\.)/g, '$&,'));
  
    nwGridMainCon_Book.ActiveSheet.SetValue(SPR_PERCENTINCREASE - 1, index, perInc.replace(/\d(?=(\d{3})+\.)/g, '$&,'));

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
    fullength = GetCurrentURL() + "../DCRequirementCompliance?TransactionNo=" + encodeURI(docno) + "&TranType=" + trantype;

    nwPopupForm_Create("nwPopUpRequireCompliance", true, fullength);
    $('#nwPopUpRequireCompliance .modal-hdr-title').text(title);
    $("#nwPopUpRequireCompliance").css({ "min-width": "98%" });
    $("#nwPopUpRequireCompliance").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopUpRequireCompliance");
    $('.dimbgNWnwPopUpRequireCompliance').removeClass('openn');

    nwLoading_End('xbtnDocumentAttachment');
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

$(document).on('click', '#btnUtilityRate', function () {
    zz();
    nwParameter_Add("PhaseTower", $('#idvallugPhaseTower').val());
    nwParameter_Add("Utility", $('#idvallugUtility').val());
    func_ActionDriven("actGenerateUtilityRate", false);
    nwPopupForm_ShowModal('nwDetails');

});

$(document).on("click", '#btnLoadDetails ', function () {
    var a = $('#idvallugAccountableForms').val();
    var b = $('#idvallugPhaseTower').val();
    var c = $('#idvallugUtility').val();
    var d = $('#txtBillPeriodFrom').val();
    var e = $('#txtBillPeriodTo').val();
    var f = $('#dtpBillingDate').val();
    var g = $('#txtTotalUtilityBill').val();
    if (a == "" && b == "" && c == "" && d == "" && e == "" && f == "" && g == "")
    {
        MessageBox("Cannot proceed. Header fields is required.", "Utility Billing Entry", "error");
    }

    nwLoading_Start("xLoadDetails", crLoadingHTML);
    cust_GetPara();
    $('#btnUtilityRate').enable(false);
    $('#btnExport').enable(true);
    func_ActionDriven("actLoadDetails");

});


function getUtilityRateVRegular() {
    var regUtilityRate = 0;
    var Grid = nwGridMainCon_Book.ActiveSheet;

    regUtilityRate = isValid(parseFloat($('#txtTotalUtilityBill').val().replace(/,/g, '')) / parseFloat($('#txtTotalConsumptionPropertyReading').val().replace(/,/g, '')));
    Grid.SetText(SPR_UTILITYRATE - 1, _row, regUtilityRate.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
}

function DistribCommon() {
  if (parseFloat($('#txtUtilityRateServiceProvider').val()) != 0) {
      ww();
  } else {
      MessageBox("Cannot proceed. Utility Rate is required.", "Utility Billing Entry", "error");
  }
  $('.txtGridUtility').enable(false);
}


$(document).on("change", "#txtBillPeriodFrom", function (e) {
    nwLoading_Start("actResetGrid", crLoadingHTML);

    func_ActionDriven("actResetGrid");
});

$(document).on("change", "#txtBillPeriodTo", function (e) {
    nwLoading_Start("actResetGrid", crLoadingHTML);
    func_ActionDriven("actResetGrid");
});


$(document).on("change", "#txtBillPeriodFrom", function (e) {
    effDate = $("#txtBillPeriodFrom").val();

    if (effDate == '__/__/____')
        effDate = '';

    if (effDate != "") {
        var serverdate = $('#txtBillPeriodTo').val();

        if (Date.parse(effDate) > Date.parse(serverdate)) {
            MessageBox("Cannot be continued. Bill Period From Date should be equal to or earlier than Bill Period To.", "Utility Billing Entry", "error");
            $("#txtBillPeriodFrom").val("");
        } else {

        }
    }

});

$(document).on("change", "#txtBillPeriodTo", function (e) {
    effDate = $("#txtBillPeriodTo").val();

    if (effDate == '__/__/____')
        effDate = '';

    if (effDate != "") {
        var serverdate = $('#txtBillPeriodFrom').val();

        if (Date.parse(effDate) < Date.parse(serverdate)) {
            MessageBox("Cannot be continued. Bill Period From Date should be equal to or later than Bill Period From.", "Utility Billing Entry", "error");
            $("#txtBillPeriodTo").val("");
        } else {

        }
    }

});

$(document).on("keyup", '#txtTotalUtilityBill', function () {
    getUtilityRateVRegular();
    yy();
    tt();
    getAdjustment();
    ComputeSewerFees(0, 1);
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

    $('#txtTotalUtilityBill').val((txtTotalUtility).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));

    var Grid = nwGridMainCon_Book.ActiveSheet;
    

    
}

function getGridData(idnum, index) {
    var data = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idnum + ")").find("td:eq(" + (index) + ")").text();
    return data;
}

function DisableFieldsEmpty() {
    componentFields(false);
    $('#lugCostCenter').enable(false);
    $('#txtTotalUtilityBill').enable(false);
    $('#txtTotalBIllableAmount').enable(false);
    $('#txtAdjustments').enable(false);
    $('#txtTransactionNo').enable(false);
    $('#txtStatus').enable(false);
    $('#txtReasonforDisapproval').enable(false);
    $('#txtDisapprovalRemarks').enable(false);
    $('#lugProject').enable(false);
    $('#txtBillPeriodFrom').enable(false);
    $('#nwGridMainCon').enable(false);
    $('#btnLoadDetails').enable(false);
    $("div.spantext").remove();

    $('#btnUtilityRate').addClass('btn-default-orange');
    $('#btnUtilityRate').removeClass('btn-default-green');
    $('#btnUtilityRate').enable(false);

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
    //var currentTime = new Date();
    //var year = currentTime.getFullYear();
    //var month = currentTime.getMonth() + 1;
    //const monthNames = ["January", "February", "March", "April", "May", "June",
    //                    "July", "August", "September", "October", "November", "December"
    //];
    //$('#cmbBillingPeriod').html("");
    //for (var x = month - 3; x < month; x++) {
    //    var y = x;
    //    year = currentTime.getFullYear();
    //    if (y > 11) {
    //        y = y - 12;
    //        year = year + 1;
    //    } else if (y <= -1) {
    //        y = y + 11;
    //        year = year - 1;
    //    }
    //    $('#cmbBillingPeriod').append("<option value='" + monthNames[y] + " " + year + "'>" + monthNames[y] + ", " + year + "</option>");
    //}
    //$('#cmbBillingPeriod').val(monthNames[month - 1] + " " + year);
  
}

function getAdjustment() {
    var totalUtilityBill = $('#txtTotalUtilityBill').val().replace(/,/g, '');
    var totalBillableAmount = $('#txtTotalBIllableAmount').val().replace(/,/g, '');
    var totalAdjustment = isValid(parseFloat(totalUtilityBill) - parseFloat(totalBillableAmount));
    $('#txtAdjustments').val((totalAdjustment).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
}

function disableselectdone() {
    $('.nwCheckBox1').enable(false);
   
}

function ClearFields() {
    $('#idvallugProject').val('');
    $('#descvallugProject').val('');
    $('#idvallugSegment2').val('');
    $('#descvallugSegment2').val('');
    $('#idvallugSegment3').val('');
    $('#descvallugSegment3').val('');
    $('#idvallugCostCenter').val('');
    $('#descvallugCostCenter').val('');
    $('#idvallugSegment5').val('');
    $('#descvallugSegment5').val('');
    $('#idvallugUtility').val('');
    $('#descvallugUtility').val('');
    $('#idvallugInvoice').val('');
    $('#descvallugInvoice').val('');
    $('#idvallugAccountableForms').val('');
    $('#descvallugAccountableForms').val('');
    $('#idvallugPhaseTower').val('');
    $('#descvallugPhaseTower').val('');
    $('#idvallugProject').val('');
    $('#descvallugProject').val('');

    $('#txtBillPeriodFrom').val('');
    $('#txtBillPeriodTo').val('');
    $('#dtpBillingDate').val('');

    $('#txtTransactionNo').val('');
    $('#txtStatus').val('');
    $('#txtRemarks').val('');
    $('#txtReasonforDisapproval').val('');
    $('#txtDisapprovalRemarks').val('');
    $('#txtTotalUtilityBill').val('');
    $('#txtTotalBIllableAmount').val('');
    $('#txtAdjustments').val('');

    $('#txtTotalBillServiceProvider').val('');
    $('#txtTotalBillPropertyReading').val('');
    $('#txtUtilityRatePercent').val('');
    $('#txtTotalConsumptionServiceProvider').val('');
    $('#txtTotalConsumptionPropertyReading').val('');
    $('#txtUtilityRateServiceProvider').val('');
    $('#txtUtilityRatePropertyReading').val('');
    $('#txtTotalConsumptionPercent').val('');

}

function nwGrid_AddtoListDoneCustom($id, $this, i) {
    $t().addtoListDone($id, $this, i);
}




function p8Spread_Change(canvasID, row, col) {
    if (canvasID == "GridPopUpDetails") {
        if (col == SPR_SERVICEPROVIDER - 1) {
            AutoComputePopupGrid();
        }
    }
    if (canvasID == "nwGridMainCon") {
        if (col == SPR_CURRENTREADING - 1) {
            changeCurrentReading(row);
        }
    }
    return true;
}


function changeCurrentReading(row) {
        resetUtility(); // reset utility rate
        colors();//set color of utility rate
        getUtilityRateVRegular();// set line details utility rate
        AutoComputeLineDetails(row); //line details computation
        xx(0) // compute total billing amount
        tt();
        getAdjustment();
}

$(document).on("click", '#btnExport', function () {

    if (    $('#idvallugAccountableForms').val() !=  '' && 
            $('#idvallugPhaseTower').val() != '' &&
            $('#idvallugUtility').val() != '' &&
            $('#txtBillPeriodFrom').val() != '' &&
            $('#txtBillPeriodTo').val() != '' &&
            $('#dtpBillingDate').val() != '' &&
            $('#idvallugCostCenter').val() != '') {
        cust_GetPara();
        nwLoading_Start("xbtnExport", crLoadingHTML);
        func_ActionDriven("actDownloadtemplate", false);
        $('#btnImport').enable(true);

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
    if (parseFloat($('#txtUtilityRateServiceProvider').val()) == 0) {
        $('#btnUtilityRate').addClass('btn-default-orange');
        $('#btnUtilityRate').removeClass('btn-default-green');
    } else {
        $('#btnUtilityRate').addClass('btn-default-green');
        $('#btnUtilityRate').removeClass('btn-default-orange');
    }
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
    var totalbill = $('#txtTotalUtilityBill').val().replace(/,/g, '');
    var totalbillPropertyReading = $('#txtTotalBillPropertyReading').val().replace(/,/g, '');
    var utilityReading = $('#txtUtilityRatePropertyReading').val().replace(/,/g, '');

    let startRow = 0;
    startRow = 1;

    var CurrentReading = 0;
    var CurrentConsumtion = 0;
    for (var row = startRow; row < nwGridMainCon_Book.ActiveSheet.GetMaxRow(); row++) {
        CurrentReading = isValid(parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_PREVIOUSREADING - 1, row)));
        CurrentConsumtion = isValid(parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION - 1, row)));

        if (CurrentReading > 0 || CurrentConsumtion > 0) {

          

            totalCurrReading += parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTREADING - 1, row))
            totalPreviousReading += isValid(parseFloat(nwGridMainCon_Book.ActiveSheet.GetText(SPR_PREVIOUSREADING - 1, row)));
            totalPreviousConsumption += isValid(parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_PREVIOUSCONSUMPTION - 1, row)));
            totalCurrentReading += isValid(parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTREADING - 1, row)));
            totalCurrentConsumption += isValid(parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION - 1, row)));

            if (nwGridMainCon_Book.ActiveSheet.GetMaxRow() != parseFloat(row) + 1) {
                let xtotalAmnt = nwGridMainCon_Book.ActiveSheet.GetText(SPR_TOTALAMOUNT - 1, row);

                totalForcesht += parseFloat(xtotalAmnt);
                totalAmount += parseFloat(xtotalAmnt);
                totalBillAmt += isValid(parseFloat(nwGridMainCon_Book.ActiveSheet.GetText(SPR_MINIMUMBILLINGAMOUNT - 1, row)));
            
               
            }

            else {
                var totalBillAmt1 = 0;
                if ((parseFloat(ConPropertyReading) - parseFloat(ConServiceProvider)) == 0) {
                    totalst = isValid(parseFloat(totalbill) - parseFloat(totalForcesht));
                    totalAmount += parseFloat(totalst);
                }

                else {
                    
                    totalst = isValid((parseFloat(UtilityProvider) * parseFloat(ConPropertyReading)) - parseFloat(totalForcesht));
                    totalAmount += parseFloat(totalst);
                }
               

                var grdCurrConsump = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION - 1, row);
                var grdUtilityRate = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_UTILITYRATE - 1, row);
                var grdMinBill = nwGridMainCon_Book.ActiveSheet.GetText(SPR_MINIMUMBILLINGAMOUNT - 1, row);
                var grdMarkUp = nwGridMainCon_Book.ActiveSheet.GetText(SPR_MARKUPRATE - 1, row);

                var totalAmt = isValid((parseFloat(grdCurrConsump) * parseFloat(grdUtilityRate))).toFixed(2);
              
                if (nwGridMainCon_Book.ActiveSheet.GetMaxRow() - 1 != 1) {
                    if (parseFloat(grdMinBill) == 0.00) {
                        totalBillAmt1 = parseFloat(totalst);
                    } else if (parseFloat(grdMinBill) > parseFloat(totalst)) {
                        totalBillAmt1 = (((parseFloat(grdMinBill)) * ((parseFloat(grdMarkUp) / 100) + 1)) + parseFloat(forceCommon)).toFixed(2);
                    } else {
                        totalBillAmt1 = (((parseFloat(totalst)) * ((parseFloat(grdMarkUp) / 100) + 1)) + parseFloat(forceCommon)).toFixed(2);
                    }

                    totalBillAmt += totalBillAmt1;
                    nwGridMainCon_Book.ActiveSheet.SetText(SPR_MINIMUMBILLINGAMOUNT - 1, row, setNumReplace(totalBillAmt1, 5));
                } 
               
            }

            
        }
    } //END OF LOOP

    var maxRow = nwGridMainCon_Book.ActiveSheet.GetMaxRow();
    if (maxRow <= 1) {
        $('#txtTotalBIllableAmount').val(setNumReplace(totalBillAmt, 2));
        nwGridMainCon_Book.ActiveSheet.SetText(SPR_TOTALAMOUNT - 1, 0, setNumReplace(totalst, 5));
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
  
    var totalCurrentConsumption = 0;
    var totalBillAmt = 0;
    for (var row = startRow; row < nwGridMainCon_Book.ActiveSheet.GetMaxRow() ; row++) {

        totalCurrentConsumption += parseFloat(nwGridMainCon_Book.ActiveSheet.GetText(SPR_CURRENTCONSUMPTION - 1, row));
        totalBillAmt += parseFloat(nwGridMainCon_Book.ActiveSheet.GetText(SPR_MINIMUMBILLINGAMOUNT - 1, row));

    }
    $('#txtTotalConsumptionPropertyReading').val((totalCurrentConsumption).toFixed(2));
    $('#txtTotalBIllableAmount').val((totalBillAmt).toFixed(2));
}

function ww() {//common area
    //let startRow = 0;
   
    //var totlcons = 0;
    //var xcnt = 0;
    //var commonArea = 0;
    //var isCommon = 0;
    //for (var row = startRow; row < nwGridMainCon_Book.ActiveSheet.GetMaxRow() ; row++) {
    //    var tag = nwGridMainCon_Book.ActiveSheet.GetText(SPR_TAG, row)

    //    if (tag == "1") {
    //        totlcons = parseFloat(totlcons) + (parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION, row)) * parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_UTILITYRATE, row)));
    //        isCommon++;
    //    }
    //    else {
    //        xcnt++;
    //    }
    //}

    //if (isCommon != 0) {
    //    $('.txtCurrentConsumption').enable(false);
    //    commonArea = isValid(parseFloat(totlcons) / parseFloat(xcnt)).toFixed(2);
    //    comm(commonArea);
    //    yy();
    //    tt();
    
    //}
    //else {
    //    MessageBox("Cannot proceed. Meter No. for Common is required.", "Utilities Billing Entry", "error");
    //}
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
        CurrentReading = isValid(parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_PREVIOUSREADING - 1, row)));
        CurrentConsumtion = isValid(parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION - 1, row)));

        if (CurrentReading > 0 || CurrentConsumtion > 0) {
            var curr = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION - 1, row);
            if (curr == "" || parseFloat(curr) == 0) {
                cnt += 1;
            }

            totalCurrentConsumption += parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION - 1, row));
            totalBillAmt += parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_MINIMUMBILLINGAMOUNT - 1, row));
        }
    }

    $('#txtTotalConsumptionPropertyReading').val((totalCurrentConsumption).toFixed(2));
    $('#txtTotalBIllableAmount').val((totalBillAmt).toFixed(2));

    if (isTag == 0)
    {
        if (cnt > 0) {
            $('#btnUtilityRate').enable(true);

        }
        else {
            $('#btnUtilityRate').enable(true);
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
    //let startRow = 0;
    
    //for (var row = startRow; row < nwGridMainCon_Book.ActiveSheet.GetMaxRow() ; row++) {
    //    var tag = nwGridMainCon_Book.ActiveSheet.GetText(SPR_TAG, row)

    //    if (tag == "0") {
    //        nwGridMainCon_Book.ActiveSheet.SetText(SPR_UTILITYRATE, index, setNumReplace(unit, 2));
    //    }
    //    else {
    //        nwGridMainCon_Book.ActiveSheet.SetText(SPR_UTILITYRATE, index, '');
    //    }
    //}
}

function zz() {
    var totalCurrentConsumption = 0;
    var totalPreviousReading = 0;
    var totalCurrentReading = 0;
    var totalBillAmt = 0;
    var startRow = 1;
    for (var row = startRow; row < nwGridMainCon_Book.ActiveSheet.GetMaxRow() ; row++) {
        totalCurrentConsumption += parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION - 1, row));
        totalPreviousReading += parseFloat(nwGridMainCon_Book.ActiveSheet.GetText(SPR_PREVIOUSREADING - 1, row));
        totalCurrentReading += parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTREADING - 1, row));
        totalBillAmt += isValid(parseFloat(nwGridMainCon_Book.ActiveSheet.GetText(SPR_MINIMUMBILLINGAMOUNT - 1, row)));
    }

    $('#txtTotalConsumptionPropertyReading').val((totalCurrentConsumption).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    $('#txtTotalBIllableAmount').val((totalBillAmt).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    getAdjustment();
    //added
    nwGridMainCon_Book.ActiveSheet.SetValue(SPR_CURRENTREADING - 1, 0, parseFloat(totalCurrentReading).toFixed(2));
    nwGridMainCon_Book.ActiveSheet.SetValue(SPR_CURRENTCONSUMPTION - 1, 0, parseFloat(totalCurrentConsumption).toFixed(2));
}

$(document).on("change", "#fileCon", function () {
    changeFile(this);
});





//NYF
function setImportedFile()
{
    let startRow = 0;

    if (tmpup.length > 0)
    {
        for (var row = startRow; row < nwGridMainCon_Book.ActiveSheet.GetMaxRow() ; row++) {
            let unitCode = nwGridMainCon_Book.ActiveSheet.GetText(SPR_UNIT - 1, row)
            let meterNo = nwGridMainCon_Book.ActiveSheet.GetText(SPR_METERNO - 1, row)

            let xtmp = tmpup.filter(e => e["UnitCode"] == unitCode && e["MeterNo"] == meterNo);
            if (xtmp.length > 0) {
                var prevRead = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_PREVIOUSREADING - 1, row))
                var currRead = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTREADING - 1, row))

                if (prevRead < 1) {
                    nwGridMainCon_Book.ActiveSheet.SetText(SPR_PREVIOUSREADING - 1, row, nwCurrency(xtmp[0]["PreviousReading"]));
                    nwGridMainCon_Book.ActiveSheet.SetText(SPR_CURRENTREADING - 1, row, nwCurrency(xtmp[0]["CurrentReading"]));
                }

                if (currRead < 1) {
                    nwGridMainCon_Book.ActiveSheet.SetText(SPR_CURRENTREADING - 1, row, nwCurrency(xtmp[0]["CurrentReading"]));
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

            let unitCode = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_UNIT - 1, row);
            //ComputeTotalBillableAmountWithMultiplier(row, 0);

            if (unitCode.length > 0) {
                SewerRate = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_SEWERRATE - 1, row)) || 0;
                BillingAmount = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_MINIMUMBILLINGAMOUNT - 1, row)) || 0;
                let currConsump = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION - 1, row)) || 0;
                TotalBillableAmount += BillingAmount;

                SewerAmt = currConsump * SewerRate;

                //nwGridMainCon_Book.ActiveSheet.SetText(SPR_SEWERFEES - 1, row, nwCurrency(SewerAmt));
            }

        }
       

    }
    else {
        let unitCode = nwGridMainCon_Book.ActiveSheet.GetText(SPR_UNIT - 1, xRow)

        if (unitCode.length > 0) {

            SewerRate = parseFloat(nwGridMainCon_Book.ActiveSheet.GetText(SPR_SEWERRATE - 1, xRow)) || 0;
            BillingAmount = parseFloat(nwGridMainCon_Book.ActiveSheet.GetText(SPR_MINIMUMBILLINGAMOUNT - 1, xRow)) || 0;
            let currConsump = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CURRENTCONSUMPTION - 1, xRow)) || 0;
            SewerAmt = currConsump * SewerRate;
            //nwGridMainCon_Book.ActiveSheet.SetText(SPR_SEWERFEES - 1, xRow, nwCurrency(SewerAmt));
        }

        //ComputeTotalBillableAmountWithMultiplier(xRow, 0);
       
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
            let unitCode = nwGridMainCon_Book.ActiveSheet.GetText(SPR_UNIT - 1, row);

            if (unitCode.length > 0) {
                BillingAmount = parseFloat(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_MINIMUMBILLINGAMOUNT - 1, row)) || 0;
                TotalAmount = BillingAmount;

                nwGridMainCon_Book.ActiveSheet.SetValue(SPR_MINIMUMBILLINGAMOUNT - 1, row, setNumReplace(TotalAmount, 5));
            }

        }
    }
    else {
        let unitCode = nwGridMainCon_Book.ActiveSheet.GetText(SPR_UNIT - 1, xRow);

        if (unitCode.length > 0) {
            BillingAmount = parseFloat(nwGridMainCon_Book.ActiveSheet.GetText(SPR_MINIMUMBILLINGAMOUNT - 1, xRow)) || 0;
            TotalAmount = BillingAmount;    
          
            nwGridMainCon_Book.ActiveSheet.GetText(SPR_MINIMUMBILLINGAMOUNT - 1, xRow, setNumReplace(TotalAmount, 5));
        }
    }

}

function DisableCurrentConsumption() {

    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_CURRENTCONSUMPTION - 1, 0, 'gainsboro');
    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_CURRENTCONSUMPTION - 1, 0, 'gainsboro');
    nwGridMainCon_Book.ActiveSheet.SetEnable(SPR_CURRENTCONSUMPTION - 1, 0, false);

    for (var row = 0; row < nwGridMainCon_Book.ActiveSheet.GetMaxRow() ; row++) {
        nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_PREVIOUSCONSUMPTION - 1, row, 'gainsboro');
        nwGridMainCon_Book.ActiveSheet.SetEnable(SPR_PREVIOUSCONSUMPTION - 1, 0, false);

    }


    if (getParameterByName("nwDocno").length > 0) {
        $('#nwGridMainCon').enable(true);
    }

}


function p8Spread_Click(canvasID, row, col) {

}




function isCustom1() {
    ('.txtGridUtility').enable(true);
    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_UTILITYRATE - 1, Spread_ALLROW, 'white');
}

function isExempt1() {

    $('.txtGridUtility').enable(false);
    $('.txtCurrentConsumption').enable(false);
    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_CURRENTCONSUMPTION - 1, Spread_ALLROW, 'gainsboro');
    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_UTILITYRATE - 1, Spread_ALLROW, 'gainsboro');

}

function isNone() {

    $('.txtGridUtility').enable(false);
    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_UTILITYRATE - 1, Spread_ALLROW, 'gainsboro');
}

function formatGrid() {

    nwGridMainCon_Book.ActiveSheet.SetEnable(SPR_UTILITYRATE - 1, 0, false);
    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_UTILITYRATE - 1, 0, 'gainsboro');

    nwGridMainCon_Book.ActiveSheet.SetEnable(SPR_CURRENTCONSUMPTION - 1, 0, false);
    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_CURRENTCONSUMPTION - 1, 0, 'gainsboro');

    nwGridMainCon_Book.ActiveSheet.SetEnable(SPR_SELECT - 1, 0, false);
    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_SELECT - 1, 0, 'gainsboro');

}

function computeTotal() {

}

function getLookupData(idnum, index) {
    var data = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idnum - 1) + ") td:eq(" + (index) + ") span").text();
    return data;
}




function nwPopUpGridCon() {
    setTimeout(function () {
        $('#btnLoadDetails').addClass('btn-default btn-default-orange');

        if ($('#txtTransactionNo').val() == "") {
            $('#btnLoadDetails').enable(true);
            $('#btnExport').enable(false);
            $('#btnImport').enable(false);
        }
        else {
            $('#btnLoadDetails').enable(false);
            $('#btnImport').enable(true);
            $('#btnExport').enable(true);
        }
        
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
        nwGridMainCon_Book.ActiveSheet.SetValue(SPR_UTILITYRATE - 1, i, $('#txtUtilityRateServiceProvider').val())
    }

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

function cuz_ImportDone() {
    //setImportedFile();
    formatGrid(); // disable current concumption, uitlity rate and select
    //disableselectdone();
    xx(0);
    //zz();
    //tt();
    DisableCurrentConsumption();
}