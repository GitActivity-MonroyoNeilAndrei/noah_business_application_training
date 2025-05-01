//new spread
var nwGridCon_Book;
var nwGridCon_Sheet;


/// <reference path="PMOInvoiceNonRevEntry.js" />
var isProcess;
var nwDocno = '';
var MenuItemTitle = "Invoice Entry - Non Revenue Related";
var serverDate = new Date();


var StartIndex = 0,
    SPR_OTC_CODE = ++StartIndex,
    SPR_OTC_DESC = ++StartIndex,
    SPR_BASIS_CODE = ++StartIndex,
    SPR_BASIS_DESC = ++StartIndex,
    SPR_VAT_CODE = ++StartIndex,
    SPR_VAT_DESC = ++StartIndex,
    SPR_CWT_CODE = ++StartIndex,
    SPR_CWT_DESC = ++StartIndex,
    SPR_PARTICULARS = ++StartIndex,
    SPR_CONSUMPTION = ++StartIndex,
    SPR_UNITCOST = ++StartIndex,
    SPR_EXCESSTHRESHOLD = ++StartIndex,
    SPR_TOTALAMT = ++StartIndex,
    SPR_VATAMT = ++StartIndex,
    SPR_CWTAMT = ++StartIndex,
    SPR_TOTALBILLAMT = ++StartIndex,
    SPR_LOCATION = ++StartIndex,
    SPR_PC = ++StartIndex,
    SPR_CCCODE = ++StartIndex,
    SPR_CCDESC = ++StartIndex,
    SPR_ITEMGROUP = ++StartIndex,
    SPR_VATRATE = ++StartIndex,
    SPR_CWTRATE = ++StartIndex,
    SPR_PERSQM = ++StartIndex,
    SPR_PERUSE = ++StartIndex,
    SPR_PERCOUNT = ++StartIndex,
    SPR_PERCUBICMETER = ++StartIndex,
    SPR_BASISFROM = ++StartIndex,
    SPR_BASISTO = ++StartIndex,
    SPR_ABOVE = ++StartIndex,
    SPR_OTHID = ++StartIndex;


var globalRow;

var isArrowKeysUp = false;
var isArrowKeysDown = false;
var isVatex = false;




var changingRow;
var changinNum;

var isbuttonclick = false;

var isDontChange = "";

function func_Reload() {
    crLnk = GetCurrentURL() +  "PMOInvoiceNonRevEntry_Gateway";
    crLnkGateKey = "PMOInvoiceNonRevEntry";
    crnwTagSingleBind = true;

    nwDocno = getParameterByName('nwDocno');

    var menuitem = [{ code: "PMOInvoiceNonRevEntry", decs: "Invoice Non Revenue" }, { code: "PMOInvoiceNonRevEntry2", decs: "Invoice Non Revenue 2" }, { code: "PMOInvoiceNonRevEntry3", decs: "Invoice Non Revenue 3" }];
    $("#cbInvoiceType").html("");
    for (var i = 0; i < menuitem.length; i++) {
        var link = GetCurrentURL() + "../" + menuitem[i]["code"];
        var value = getParameterByName("nsc");;
       
        if (link.indexOf("?") >= 0)
            link += "&nsc=" + value;
        else
            link += "?nsc=" + value;

        value = getParameterByName("nsu");;
        link += "&nsu=" + value;

        var data = "<option value='" + menuitem[i]["code"] + "' nvalue='" + link + "'>" + menuitem[i]["decs"] + "</option>";
        $("#cbInvoiceType").append(data);
    }

  

    var isContinue = true;

    ToolBoxGetData = false;
    DisableFields();
    cust_GetPara();
    ClearFields();
    init_request();

    nwPopupForm_Create("nwInvoiceType", true);

    return isContinue;

}

function mainLoad() {

    nwParameter_Add("nwDocno", nwDocno);
    if (nwDocno != '') {
        $('#noah-webui-default-Refresh').click();
        $("#noah-webui-Toolbox").visible(false);
    }
}


/* Tool Box */
function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    ClearFields();
    DisableFields();
    enableValuedate();
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
    //var isContinue = true;

    return false;
    //return isContinue;
}

function func_ToolboxExport(indef, enume) {
    var isContinue = true;
    nwLoading_Start("xExport", crLoadingHTML);
    return isContinue;
}

function func_ToolboxPrint(indef, enume) {
    var isContinue = true;
    //nwLoading_Start("xPrintLoading", crLoadingHTML);
    nwParameter_Add("txtDocno", $(`#txtDocno`).val());

    parent_MessageBoxQuestionToolBox("Would you like to print the document/s?", MenuItemTitle, "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxClosing(indef, enume) {
    var isContinue = true;
    ShowVwMonitoringRpt();
    return isContinue;
}

function func_ToolboxSearch(indef, enume) {
    var isContinue = true;

    var error = ""
    if ($('#idvallugLocForm').val() == "") {
        error += "Cannot proceed. Location with Accountable forms is required. \n"
    }

    if (error != "") {
        MessageBox(error, MenuItemTitle, 'error');
        return false;
    }

    return false;

    //return isContinue;
}

///////////////////// Bind tool
function cust_GetPara() {

    nwParameter_Add("idvallugInvoiceType", $('#idvallugInvoiceType').val());
    nwParameter_Add("idvallugLocForm", $('#idvallugLocForm').val());
    nwParameter_Add("idvallugPhaseTower", $('#idvallugPhaseTower').val());
    nwParameter_Add("idvallugProject", $('#idvallugProject').val());
    nwParameter_Add("idvallugAccountNo", $("#idvallugAccountNo").val());
    nwParameter_Add("idvallugCurrency", $('#idvallugCurrency').val());
    nwParameter_Add("idvallugCustomer", $('#idvallugCustomer').val());
    nwParameter_Add("idvallugCustomerClass", $('#idvallugCustomerClass').val());
    nwParameter_Add("txtUnitCode", $('#txtUnitCode').val());
    nwParameter_Add("txtBillDate", $('#txtBillDate').val());
    nwParameter_Add("txtDocno", $('#txtDocno').val());
    nwParameter_Add("txtValueDate", $('#txtValueDate').val());
    nwParameter_Add("txtServerdate", $('#txtValueDate').val());
    nwParameter_Add("txtDocStatus", $('#txtDocStatus').val());
    nwParameter_Add("nwDocno", nwDocno);


    nwParameter_Add("isAllwBackdateTran", $('#isAllwBackdateTran').val());
    nwParameter_Add("txtValueDate2", $('#txtValueDate2').val());


    try{ nwParameter_Add_Spread(nwGridCon_Book);} catch (ex) { }

}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwLoading_Start("actBindCollection", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {
    RefreshData();
}

function EnableFields() {
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingExport().visible(false);

    $('#lugPhaseTower').enable(true);
    $('#lugLocForm').enable(true);

    $('#lugAccountNo').enable(true);
    $('#txtBillDate').enable(true);
    $('#txtRemarks').enable(true);
    $('#nwGridCon').enable(true);
}

function DisableFields() {
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingPrint().visible(false);

    $('#lugInvoiceType').enable(false);
    $('#lugLocForm').enable(false);
    $('#lugPhaseTower').enable(false);
    $('#lugProject').enable(false);
    $('#lugAccountNo').enable(false);
    $('#lugCustomer').enable(false);
    $('#lugCustomerClass').enable(false);

    $('#txtUnitCode').enable(false);
    $('#txtBillDate').enable(false);
    $('#txtRemarks').enable(false);

    $('#txtDocno').enable(false);
    $('#txtDateSubmitted').enable(false);
    $('#txtDatePosted').enable(false);
    $('#txtDocStatus').enable(false);
    $('#txtReason').enable(false);
    $('#txtDisapprovalRemarks').enable(false);
    
    $('#btnReqCompliance').enable(false);
    $('#nwGridCon').enable(false);

}

function EnableFieldsDone() { //Binding Done
    EnableFields();

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingPrint().enable(true);
    $("#noah-webui-Toolbox").bindingPrint().visible(true);

    $('#btnReqCompliance').enable(true);
    $('#lugLocForm').enable(false);
    $("#nwGridCon").enable(true);

}

function DisableFieldsEmpty() {
    DisableFields();

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingPrint().enable(false);
    $("#noah-webui-Toolbox").bindingPrint().visible(true);
}


function ClearFields() {
    $('#idvallugInvoiceType').val("");
    $("#descvallugInvoiceType").val("");
    $("#idvallugLocForm").val("");
    $('#descvallugLocForm').val('');
    $('#idvallugPhaseTower').val('');
    $('#descvallugPhaseTower').val('');
    $('#idvallugProject').val('');
    $("#descvallugProject").val("");
    $("#idvallugAccountNo").val("");
    $("#idvallugCustomer").val("");
    $("#descvallugCustomer").val("");
    $("#descvallugCostCenter").val("");
    $("#idvallugCustomerClass").val("");
    $("#descvallugCustomerClass").val("");
    $('#txtUnitCode').val("");
    $("#txtBillDate").val("");
    $("#txtValueDate").val("");
    $("#txtDocStatus").val("");
    $("#txtReason").val("");
    $("#txtDisapprovalRemarks").val("");
    $("#txtRemarks").val("");
    $("#txtDocno").val("");
   
    $("#txtDateSubmitted").val("");
    $('#txtDatePosted').val('');
    $('#btnReqCompliance').removeClass('btn-default-green')
    $('#btnReqCompliance').addClass('btn-default-orange');

}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}


function func_LookUpInitialize(lookupid) {
    
    cust_GetPara();


    //Delivery Details lookup grid
    if (lookupid == 'lugSubLocCode') {
        var GridDeliveryID = nwGridConDeliveryID_Book.ActiveSheet;
        var rowDeliveryID = GridDeliveryID.CellSelected.row - 1;

        var lugDelLocCode = GridDeliveryID.GetText(GRD_DD_DELLOCCODE - 1, rowDeliveryID);
        nwParameter_Add("lugDelLocCode", lugDelLocCode);
    }


}

function p8Spread_DblClick(canvasID, row, col) {

    if (nwDocno != '') return;

    var LocForm = $('#idvallugLocForm').val();
    var phasetower = $('#idvallugPhaseTower').val();
    var accountno = $('#idvallugAccountNo').val();
    var billdate = $('#txtBillDate').val();

    var prompt = ''

    if (LocForm == '' ||
         phasetower == '' ||
         accountno == '' ||
         billdate == '' 
       ) {
        prompt = "Cannot proceed. Please complete the header details.";
    }

    //MAIN LINE DETAILS
    if (canvasID == "nwGridCon") {
        var Grid = nwGridCon_Book.ActiveSheet;

        if (prompt != '') {
            if (col == SPR_OTC_DESC - 1 || col == SPR_BASIS_DESC - 1 || col == SPR_VAT_DESC - 1 || col == SPR_CWT_DESC - 1 || col == SPR_CCDESC - 1) {
                MessageBox(prompt, MenuItemTitle, 'error');
                return true;
            }
        }
        else {
            if (col == SPR_OTC_DESC - 1) {
                lookUpCustomize("lugOTC", 1, undefined, true)
            }
            else if (col == SPR_BASIS_DESC - 1) {
                lookUpCustomize("lugBasis", 1, undefined, true)
            }
            else if (col == SPR_VAT_DESC - 1) {
                lookUpCustomize("lugVATCode", 1, undefined, true)
            }
            else if (col == SPR_CWT_DESC - 1) {
                lookUpCustomize("lugCWTCode", 1, undefined, true)
            }
            else if (col == SPR_CCDESC - 1) {
                lookUpCustomize("lugCostCenter", 1, undefined, true)
            }
        }
    }

}


function p8Spread_Change(canvasID, row, col) {
    if (canvasID == "nwGridCon") {
        if (col == SPR_REQ_QTY - 1) {


        }
    }

    return true;
}

var jsonStoreData = [];
var isMainGrid = false;

function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
    var isValid = false;
    var code;

    if (isbuttonclick) {
        isbuttonclick = false;
        return false;
    }
   
    //MAIN GRID
    if (nwGridID == 'nwGridCon') {
        var Grid = nwGridCon_Book.ActiveSheet;
        var cnt = Grid.GetMaxRow();
        var row = Grid.CellSelected.row - 1;

        code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
        isExist = nwLib.nwTempTable_Column_ValueExist(nwGridID, Main.GRD_LINEID, code, false, "text", 0);

        isMainGrid = true;

        if (isExist == false) {

            let itemCode = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
            let itemDesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
            let itemGrpTypeCode = addtoListTableRec.find('tr:eq(' + index + ') td:eq(6)').text();
            let itemGrpTypeDesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(7)').text();
            let uom = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();

            crnwTRtemp[Main.GRD_ITEMCODE - 1] = itemCode;
            crnwTRtemp[Main.GRD_ITEMDESC - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
            crnwTRtemp[Main.GRD_BASED_UOM - 1] = uom;
            crnwTRtemp[Main.GRD_ITEMGRPTYPE_CODE - 1] = itemGrpTypeCode;
            crnwTRtemp[Main.GRD_ITEMGRPTYPE_DESC - 1] = itemGrpTypeDesc;
            crnwTRtemp[Main.GRD_INVENTORIABLE - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(10)').text();
            crnwTRtemp[Main.GRD_NONINVENTORIABLE - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(11)').text();
            crnwTRtemp[Main.GRD_SPECNOTES - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(12)').text();

            $('#idvallugBdgtChk_Item').val(itemCode);
            $('#descvallugBdgtChk_Item').val(itemDesc);
            $('#idvallugBdgtChk_ItemGrpType').val(itemGrpTypeCode);
            $('#descvallugBdgtChk_ItemGrpType').val(itemGrpTypeDesc);
            $('#txtBdgtchk_RowNum').val(row);
            $('#txtBCLItemCode').val(itemCode);
            $('#txtBCLUom').val(uom);

            StoreInJsonItemList(itemCode, itemDesc, itemGrpTypeCode, itemGrpTypeDesc, uom);

            nwParameter_Add("itemCode", itemCode);
            nwParameter_Add("reason", $('#idvallugRsnForRequest').val());
            nwParameter_Add("txtReasonType", $('#txtReasonType').val());
            nwParameter_Add("txtTrantype", $('#txtTrantype').val());

            UponLookUpItemCode();

            
        }
    }

    return crnwTRtemp;
}


var tempLocformCode = "";
var tempLocformDesc = "";


function cust_LookupButton() {
    isbuttonclick = true;
}


function Lookup_DoneFunction(idName, idNum) {
    var DelID = '';
    
    //lookup done header
    if (idName == 'toolboxInquire') {
    }
    else if (idName == "lugPhaseTower") {
        let Code = getLookupData(idNum, 0);
        let Desc = getLookupData(idNum, 1);
        let projCode = getLookupData(idNum, 2);
        let projDesc = getLookupData(idNum, 3);

        $('#idvallugProject').val(projCode);
        $('#descvallugProject').val(projDesc);

    }

    else if (idName == 'lugAccountNo') {
        let accountNo = getLookupData(idNum, 0);
        let customername = getLookupData(idNum, 1);
        let unitcode = getLookupData(idNum, 2);
        let custmerclass = getLookupData(idNum, 3);
        let custmerclasscode = getLookupData(idNum, 4);
        let customercode = getLookupData(idNum, 5);

        $('#idvallugCustomer').val(customercode);
        $('#descvallugCustomer').val(customername);
        $('#idvallugCustomerClass').val(custmerclasscode);
        $('#descvallugCustomerClass').val(custmerclass);
        $('#txtUnitCode').val(unitcode);
    }
   
    //MAIN GRID
    try {
        var Grid = nwGridCon_Book.ActiveSheet;
        var row = Grid.CellSelected.row - 1;
        var col = Grid.CellSelected.col - 1;
    } catch (ex) { }

    if (idName == 'lugOTC') {
        let otccode = getLookupData(idNum, 0);
        let otcdesc = getLookupData(idNum, 1);
        let basiscode = getLookupData(idNum, 2);
        let basisdesc = getLookupData(idNum, 3);
        let vatcode = getLookupData(idNum, 4);
        let cwtcode = getLookupData(idNum, 5);
        let ucost = getLookupData(idNum, 6);
        let basisfrom = getLookupData(idNum, 7);
        let basisto = getLookupData(idNum, 8);
        let areaabove = getLookupData(idNum, 9);
        let inexcess = getLookupData(idNum, 10);
        let vatrate = getLookupData(idNum, 11);
        let cwtrate = getLookupData(idNum, 12);
        let persqm = getLookupData(idNum, 13);
        let peruse = getLookupData(idNum, 14);
        let percount = getLookupData(idNum, 15);
        let percubicmeter = getLookupData(idNum, 16);
        let vatdesc = getLookupData(idNum, 17);
        let cwtdesc = getLookupData(idNum, 18);
        let othid = getLookupData(idNum, 19);
        let loc = getLookupData(idNum, 20);
        let pc = getLookupData(idNum, 21);
        let totalamt = getLookupData(idNum, 22);
        let vatamt = getLookupData(idNum, 23);
        let cwtamt = getLookupData(idNum, 24);
        let billamt = getLookupData(idNum, 25);
        let itemgroup = getLookupData(idNum, 26);

        Grid.SetText(SPR_OTC_CODE - 1, row, otccode);
        Grid.SetText(SPR_OTC_DESC - 1, row, otcdesc);
        Grid.SetText(SPR_BASIS_CODE - 1, row, basiscode);
        Grid.SetText(SPR_BASIS_DESC - 1, row, basisdesc);
        Grid.SetText(SPR_VAT_CODE - 1, row, vatcode);
        Grid.SetText(SPR_VAT_DESC - 1, row, vatdesc);
        Grid.SetText(SPR_CWT_CODE - 1, row, cwtcode);
        Grid.SetText(SPR_CWT_DESC - 1, row, cwtdesc);
        Grid.SetText(SPR_UNITCOST - 1, row, ucost);
        Grid.SetText(SPR_EXCESSTHRESHOLD - 1, row, inexcess);
        Grid.SetText(SPR_VATRATE - 1, row, vatrate);
        Grid.SetText(SPR_CWTRATE - 1, row, cwtrate);
        Grid.SetText(SPR_PERSQM - 1, row, persqm);
        Grid.SetText(SPR_PERUSE - 1, row, peruse);
        Grid.SetText(SPR_PERCOUNT - 1, row, percount);
        Grid.SetText(SPR_PERCUBICMETER - 1, row, percubicmeter);
        Grid.SetText(SPR_BASISFROM - 1, row, basisfrom);
        Grid.SetText(SPR_BASISTO - 1, row, basisto);
        Grid.SetText(SPR_ABOVE - 1, row, areaabove);
        Grid.SetText(SPR_OTHID - 1, row, othid);
        Grid.SetText(SPR_LOCATION - 1, row, loc);
        Grid.SetText(SPR_PC - 1, row, pc);
        Grid.SetText(SPR_TOTALAMT - 1, row, totalamt);
        Grid.SetText(SPR_VATAMT - 1, row, vatamt);
        Grid.SetText(SPR_CWTAMT - 1, row, cwtamt);
        Grid.SetText(SPR_TOTALBILLAMT - 1, row, billamt);
        Grid.SetText(SPR_ITEMGROUP - 1, row, itemgroup);


        if (peruse == '1' || percubicmeter == '1' || percount == '1') {
            Grid.SetBackground(SPR_CONSUMPTION - 1, row, 'white');
            Grid.SetEnable(SPR_CONSUMPTION - 1, row, true);
            
        } else {
            Grid.SetBackground(SPR_CONSUMPTION - 1, row, 'gainsboro');
            Grid.SetEnable(SPR_CONSUMPTION - 1, row, false);
            Grid.SetText(SPR_CONSUMPTION - 1, row, '');
        }

        ComputeAmounts(row);
    }
    else if (idName == 'lugBasis') {
        let code = getLookupData(idNum, 0);
        let desc = getLookupData(idNum, 1);
        let persqm = getLookupData(idNum, 2);
        let peruse = getLookupData(idNum, 3);
        let percount = getLookupData(idNum, 4);
        let percubicmeter = getLookupData(idNum, 5);

        Grid.SetText(SPR_BASIS_CODE - 1, row, code);
        Grid.SetText(SPR_BASIS_DESC - 1, row, desc);
        Grid.SetText(SPR_PERSQM - 1, row, persqm);
        Grid.SetText(SPR_PERUSE - 1, row, peruse);
        Grid.SetText(SPR_PERCOUNT - 1, row, percount);
        Grid.SetText(SPR_PERCUBICMETER - 1, row, percubicmeter);

        if (peruse == '1' || percubicmeter == '1' || percount == '1') {
            Grid.SetBackground(SPR_CONSUMPTION - 1, row, 'white');
            Grid.SetEnable(SPR_CONSUMPTION - 1, row, true);
        } else {
            Grid.SetBackground(SPR_CONSUMPTION - 1, row, 'gainsboro');
            Grid.SetEnable(SPR_CONSUMPTION - 1, row, false);
            Grid.SetText(SPR_CONSUMPTION - 1, row, '');
        }

        ComputeAmounts(row);

    }
    else if (idName == 'lugVATCode') {
        let code = getLookupData(idNum, 0);
        let desc = getLookupData(idNum, 1);
        let rate = getLookupData(idNum, 2);

        Grid.SetText(SPR_VAT_CODE - 1, row, code);
        Grid.SetText(SPR_VAT_DESC - 1, row, desc);
        Grid.SetText(SPR_VATRATE - 1, row, rate);
        ComputeAmounts(row);
    }
    else if (idName == 'lugCWTCode') {
        let code = getLookupData(idNum, 0);
        let desc = getLookupData(idNum, 1);
        let rate = getLookupData(idNum, 2);

        Grid.SetText(SPR_CWT_CODE - 1, row, code);
        Grid.SetText(SPR_CWT_DESC - 1, row, desc);
        Grid.SetText(SPR_CWTRATE - 1, row, rate);
        ComputeAmounts(row);
    }
    else if (idName == 'lugCostCenter') {
        let code = getLookupData(idNum, 0);
        let desc = getLookupData(idNum, 1);

        Grid.SetText(SPR_CCCODE - 1, row, code);
        Grid.SetText(SPR_CCDESC - 1, row, desc);
    }

    //////
}


function getLookupData(idnum, index) {
    var data = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idnum - 1) + ") td:eq(" + (index) + ") span").text();
    return data;
}

function setGridData(nwGrid, type, col, row, val) {
        nwGrid.GetText(col , row, val);
}

function getGridData(nwGrid, type, col, row) {
    var data = '';
    var data = nwGrid.GetText(col , row, val);
    return data;
}

function getNumReplace(val) {
    val = getNum(parseFloat(val.toString().replace(/,/g, "")))
    return val;
}

function setNumReplace(val, decimal) {
    val = getNum(parseFloat(val.toString().replace(/,/g, "")))
    val = val.toFixed(decimal);
    var dtnum = val.split('.', 100);

    var wholenum = dtnum[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var decinum = dtnum[1];

    return wholenum + '.' + decinum;
}

function getNum(val) {
    if (isNaN(val) || val == '') {
        val = 0
    }
    return val;
}

function func_nwGrid_DeleteDone() {
    var id = crnwTableCon.attr('id');

    if (id == "nwGrid") {
    }

}

var tdTemp;
var trTemp;
var temval;

var numValues = 0;
var getvalue = "";

var currentRow = 0;

var currAmnt;
var wholeNum = 16;
var precision = 5;

$(document).on('change', '.idval', function () {
    let id = $(this).attr('id').replace('idval', '');
    ClearLookUp(id);
});


$(document).on('click', '#btnReqCompliance', function () {
    var trantype = 'SOADOC';
    var docno = $('#txtDocno').val();
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


function nwPopUpGridCon() {
    var Grid = nwGridCon_Book.ActiveSheet;
    
    var len = Grid.GetMaxRow();
    for (var row = 0; row <= len; row++) {
        var peruse = Grid.GetValue(SPR_PERUSE - 1, row);
        var percubicmeter = Grid.GetValue(SPR_PERCUBICMETER - 1, row);
        var percount = Grid.GetValue(SPR_PERCOUNT - 1, row);

        if (peruse == '1' || percubicmeter == '1' || percount == '1') {
            Grid.SetBackground(SPR_CONSUMPTION - 1, row, 'white');
            Grid.SetEnable(SPR_CONSUMPTION - 1, row, true);
        } else {
            Grid.SetBackground(SPR_CONSUMPTION - 1, row, 'gainsboro');
            Grid.SetEnable(SPR_CONSUMPTION - 1, row, false);
            Grid.SetText(SPR_CONSUMPTION - 1, row, '');
        }
    }
}



function isAllwBackDatingTran() {

    if ($('#isAllwBackdateTran').val() == "1") {
        $('#isAllowBackDateWrapper').visible(true);
    } else {
        $('#isAllowBackDateWrapper').visible(false);
    }

    let valueDate = $('#txtValueDate2').val();
    let datePosted = $('#txtDatePosted2').val();

    if (valueDate != "" && datePosted != "") {
        $('#isAllowBackDateWrapper').visible(true);
    } else if (Date.parse(valueDate) == Date.parse(datePosted)) {
        $('#isAllowBackDateWrapper').visible(false);
    } else {
        $('#isAllowBackDateWrapper').visible(true);
    }
}


$(document).on('click', '#btnProceed', function () {
    var isContinue = false;
    //UponNew()

    var link = $("#cbInvoiceType").find("option:Selected").attr("nvalue");
    window.location = link;


    //var code = $('#cbInvoiceType').find('option:selected').val();

    //$('#idvallugInvoiceType').val(code);
    //$('#descvallugInvoiceType').val($('#cbInvoiceType').find('option:selected').text());
    //nwParameter_Add("idvallugInvoiceType", $('#idvallugInvoiceType').val());
    //func_ActionDriven("actNewData", false);



    return isContinue;
});

function UponNew() {
    nwLoading_Start("UponNewLoading", crLoadingHTML);
    EnableFields();
    ClearFields();
    func_Toolbox_Clear();
}

function p8Spread_Change(canvasID, row, col) {
    if (canvasID == "nwGridCon") {
        if (col == SPR_CONSUMPTION - 1) {
            ComputeAmounts(row);
        }
    }
}


function ComputeAmounts(row) {
    var unitcost = getNumReplace(nwGridCon_Book.ActiveSheet.GetValue(SPR_UNITCOST - 1, row)) || 0.00;
    var qty = getNumReplace(nwGridCon_Book.ActiveSheet.GetValue(SPR_CONSUMPTION - 1, row)) || 0.00;
    var vatrate = getNumReplace(nwGridCon_Book.ActiveSheet.GetValue(SPR_VATRATE - 1, row)) || 0.00;
    var cwtrate = getNumReplace(nwGridCon_Book.ActiveSheet.GetValue(SPR_CWTRATE - 1, row)) || 0.00;
    var inexcess = getNumReplace(nwGridCon_Book.ActiveSheet.GetValue(SPR_EXCESSTHRESHOLD - 1, row)) || 0.00;
    var basisTo = getNumReplace(nwGridCon_Book.ActiveSheet.GetValue(SPR_BASISTO - 1, row)) || 0.00;
    var peruse = nwGridCon_Book.ActiveSheet.GetValue(SPR_PERUSE - 1, row);
    var percubicmeter = nwGridCon_Book.ActiveSheet.GetValue(SPR_PERCUBICMETER - 1, row);
    var percount = nwGridCon_Book.ActiveSheet.GetValue(SPR_PERCOUNT - 1, row);

    var totalamt = 0.00;
    var vatamt = 0.00;
    var cwtamt = 0.00;
    var billamt = 0.00;

    if (peruse == '1' || percubicmeter == '1' || percount == '1') {
        if (peruse == '1') {
            if (unitcost > basisTo && basisTo > 0) {
                totalamt = unitcost + (qty - basisTo) * inexcess;
            } else {
                totalamt = unitcost;
            }
        } else {
            totalamt = qty * unitcost;
        }
    } else {
        totalamt = unitcost;
    }


    vatamt = totalamt * (vatrate / 100);
    cwtamt = totalamt * (cwtrate / 100);
    billamt = totalamt + (vatamt - cwtamt);

    nwGridCon_Book.ActiveSheet.SetText(SPR_TOTALAMT - 1, row, setNumReplace(totalamt, 2));
    nwGridCon_Book.ActiveSheet.SetText(SPR_VATAMT - 1, row, setNumReplace(vatamt, 2));
    nwGridCon_Book.ActiveSheet.SetText(SPR_CWTAMT - 1, row, setNumReplace(cwtamt, 2));
    nwGridCon_Book.ActiveSheet.SetText(SPR_TOTALBILLAMT - 1, row, setNumReplace(billamt, 2));
}


function func_WindowCloseTrigger(verID) {
    let isContinue = true;
    cust_GetPara();

    //REQUIREMENT COMPLIANCE
    if (verID == 'nwPopUpRequireCompliance') {

        nwParameter_Add("txtDocno", $('#txtDocno').val());
        nwParameter_Add("isHeader", true);
        func_ActionDriven("actchkIfhasReqComp", false);
    }
    return isContinue;
}