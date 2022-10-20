var SPR_BSNO_BS = 1,
    SPR_BSDATE_BS = 2,
    SPR_DUEDATE_BS = 3,
    SPR_CLEARED_BS = 4,
    SPR_DETAILS_BS = 5,
    SPR_AMOUNTDUE_BS = 6,
    SPR_PENALTY_BS = 7,
    SPR_TOTALAMTDUE_BS = 8,
    SPR_PAYMENTS_BS = 9,
    SPR_OUTSTANDINGBALANCE_BS = 10;

//Customer's Tab
var SPR_NO_UO = 1,
    SPR_BSNO_UO = 2,
    SPR_BSDATE_UO = 3,
    SPR_DUEDATE_UO = 4,
    SPR_ORNO_UO = 5,
    SPR_MAN_ORNO = 6,
    SPR_ORDATE_UO = 7,
    SPR_TOTALAMNTDUE = 8,
    SPR_PENALTY_CT = 9,
    SPR_ADJUSTMENT_CT = 10,
    SPR_AMTPD_UO = 11,
    SPR_OUTSTANDINGBALANCE_UO = 12;

var SPR_AsOfCol = 1,
    SPR_Amount = 2,
    SPR_Total = 3,
    SPR_SortBy = 4,
    SPR_Tag = 5,
    SPR_RowNo = 6;

var SPR_VndrValueDate = 1,
    SPR_VndrDocno = 2,
    SPR_VndrPCCC = 3,
    SPR_VndrParticulars = 4,
    SPR_VndrModeOfPayment = 5,
    SPR_VndrCheckPaymentDetails = 6,
    SPR_VndrCheckDate = 7,
    SPR_VndrDocumentAmount = 8,
    SPR_VndrRunningBal = 9,
    SPR_VndrGLAccount = 10,
    SPR_VndrRefDocno = 11,
    SPR_VndrTag = 12,
    SPR_VndrRowno = 13;

var
    SPR_CustValueDate = 1,
    SPR_CustDocno = 2,
    SPR_PCCC = 3,
    SPR_CustParticulars = 4,
    SPR_CustModeOfPayment = 5,
    SPR_CustCheckPaymentDetails = 6,
    SPR_CustCheckDate = 7,
    SPR_CustOrLot = 8,
    SPR_CustDocumentAmount = 9,
    SPR_CustRunningBal = 10,
    SPR_CustGLAccount = 11,
    SPR_CustORStatus = 12,
    SPR_CustPRNo = 13,
    SPR_CustRefDocno = 14,
    SPR_CustRowno = 15,
    SPR_CustTag = 16;

//NDB SPR Declaration
var SPR_Charges = 1,
    SPR_Vatex = 2,
    SPR_Vat = 3,
    SPR_Vatin = 4,
    SPR_Cwt = 5,
   SPR_DetailsAmountDue = 6;

var nwGridMainCon_Book;
var nwGridMainCon_Sheet;


function func_Reload() {
    crLnk = "../PMOCustomerLedger/PMOCustomerLedger_Gateway";
    crLnkGateKey = "PMOCustomerLedger";
    var isContinue = true;
    ToolBoxGetData = false;
    DisableFields();
    init_request();
    //nwPopupForm_Create("nwPopupDetails", true);
    return isContinue;
}

var MenuTitle = "Customer Ledger";

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    $('#lugAccountNo').removeClass('adisabled');
    $('#idvallugAccountNo').css('background-color', '#fff');
    EnableFields();
    ClearFields();
    func_Toolbox_Clear();
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", MenuTitle, "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", MenuTitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    let accountNo = $('#idvallugAccountNo').val();
    if (accountNo != "") {
        nwLoading_Start("actbindcollection", crLoadingHTML);
        nwParameter_Add("AccountNo", accountNo);
        isRefreshed = true;
        return isContinue;
    } else {
        MessageBox("Cannot proceed. Account No. is required.", MenuTitle, 'error');
        return false;
    }
    
}

function func_ToolboxInquire(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxProcess(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxImport(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxExport(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    let activeTab = $("#settingstabs1").tabs('option', 'active');
    let xCode = $('#idvallugAccountNo').val();
    nwParameter_Add("xCode", xCode);
    if (activeTab == 0) {
        nwParameter_Add("activeTab", "Billing_Statement");
    } else {
        nwParameter_Add("activeTab", "Customer_Ledger");
    }
    return isContinue;
}

//function func_ToolboxExport(indef, enume) {
//    //var isContinue = true;
//    //return isContinue;
//    var isContinue = true;
//    isContinue = false;
//    //fn_ExportGrid("nwGridCustVndrAcctSumm");
//    //return isContinue;
//}

function func_ToolboxPrint(indef, enume) {
    cust_GetPara();
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

$(function () {
    $("#settingstabs1").tabs();
});

///////////////////// Bind tool
function cust_GetPara() {
    nwParameter_Add("cmbLedgerTypeVal", $("#cmbLedgerType").val());
    nwParameter_Add("cmbLedgerTypeTxt", $("#cmbLedgerType").text());
    nwParameter_Add("idvallugName", $("#idvallugName").val());
    nwParameter_Add("txtRegisteredName", $("#txtRegisteredName").val());
    nwParameter_Add("txtTradeName", $("#txtTradeName").val());
    nwParameter_Add("txtAddress", $("#txtAddress").val());
    nwParameter_Add("txtContact", $("#txtContact").val());
    nwParameter_Add("txtVendorAcct", $("#txtVendorAcct").val());
    nwParameter_Add("txtCustomerAcct", $("#txtCustomerAcct").val());
    nwParameter_Add("txtCheckPayeeName", $("#txtCheckPayeeName").val());
    nwParameter_Add("txtDateasof", $("#txtDateasof").val());
    nwParameter_Add("luglocacc", $('#idvalluglocacc').text());

    nwParameter_Add_Table("nwGridUnitOwnerLedger", false);
    nwParameter_Add_Table("nwGridBillingStatement", false);
    GetAddtoListFilters();
}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    nwLoading_Start("actbindcollection", crLoadingHTML);
    cust_GetPara(); 
    RefreshData();
    let accountNo = $('#idvallugAccountNo').val();
    if (accountNo != "") {
        nwParameter_Add("accountNo", accountNo);
        func_ActionDriven("actBindCollection", false);
    }
}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("actbindcollection", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollectionEmpty", false);
}


///////////////////////////////////////

function getLookupData(idnum, index) {
    var data = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idnum - 1) + ") td:eq(" + index + ") span").text();
    return data;
}

var temp_crnwTR = "";

function Lookup_DoneFunction(idName, idNum) {
    //let $t = $(`.tablecontainter .${idName} tbody tr:eq(${idNum})`);
    //let accountNo, customer, fullName, classCode, classDesc, unitOwner, unitDesc, 
    //    fullAddress, tradeName, contactDetails, custTIN, unitCode, inventoryTypeCode, inventoryTypeDesc,
    //    inventoryClassCode, inventoryClassDesc;
    if (idName == 'toolboxInquire') {

    }

    if (idName == "lugAccountNo") {
        //accountNo = $t.find(`td:eq(0)`).text();
        //customer = $t.find(`td:eq(1)`).text();
        //fullName = $t.find(`td:eq(2)`).text();
        //classCode = $t.find(`td:eq(3)`).text();
        //classDesc = $t.find(`td:eq(4)`).text();
        //unitOwner = $t.find(`td:eq(5)`).text();
        //unitDesc = $t.find(`td:eq(6)`).text();
        //fullAddress = $t.find(`td:eq(7)`).text();
        //contactDetails = $t.find(`td:eq(8)`).text();
        //custTIN = $t.find(`td:eq(9)`).text();
        //unitCode = $t.find(`td:eq(10)`).text();
        //inventoryTypeCode = $t.find(`td:eq(11)`).text();
        //inventoryTypeDesc = $t.find(`td:eq(12)`).text();
        //inventoryClassCode = $t.find(`td:eq(13)`).text();
        //inventoryClassDesc = $t.find(`td:eq(14)`).text();
        $('#idvallugAccountNo').val(getLookupData(idNum, 0));
        $('#idvallugCustomer').val(getLookupData(idNum, 1));
        $('#descvallugCustomer').val(getLookupData(idNum, 2));
        $('#idvallugCustomerClass').val(getLookupData(idNum, 3));
        $('#descvallugCustomerClass').val(getLookupData(idNum, 4));
        $('#idvallugUnitOwner').val(getLookupData(idNum, 5));
        $('#descvallugUnitOwner').val(getLookupData(idNum, 6));
        $('#txtAddress').val(getLookupData(idNum, 7));
        $('#txtContactDetails').val(getLookupData(idNum, 8));
        $('#txtTIN').val(getLookupData(idNum, 9));
        $('#txtUnitCode').val(getLookupData(idNum, 10));
        $('#idvallugInventoryType').val(getLookupData(idNum, 11));
        $('#descvallugInventoryType').val(getLookupData(idNum, 12));
        $('#idvallugInventoryClass').val(getLookupData(idNum, 13));
        $('#descvallugInventoryClass').val(getLookupData(idNum, 14));
        $("#noah-webui-Toolbox").bindingRefresh().enable(true);
        $("#noah-webui-Toolbox").bindingExport().enable(false);
        nwLoading_Start("actSetDynamicLevels", crLoadingHTML);
        //nwParameter_Add("AccountNo", accountNo); 
        nwParameter_Add("AccountNo", getLookupData(idNum, 0));
        func_ActionDriven("actSetDynamicLevels", false);


    }

    if (idName == 'lugName') {
        nwLoading_Start("nwLoading", crLoadingHTML);
        var TradeName = getLookupData(idNum, 3);
        var RegisteredName = getLookupData(idNum, 1);

        $("#txtRegisteredName").val(getLookupData(idNum, 1));
        $("#txtTradeName").val(getLookupData(idNum, 3));
        $("#txtAddress").val(getLookupData(idNum, 4));
        $("#txtContact").val(getLookupData(idNum, 5));
        $("#txtVendorAcct").val(getLookupData(idNum, 7));
        $("#txtCustomerAcct").val(getLookupData(idNum, 6));
        $("#txtCheckPayeeName").val(getLookupData(idNum, 9));
        $("#txtTIN").val(getLookupData(idNum, 8));

        if (RegisteredName == "") {
            $("#descvallugName").val(getLookupData(idNum, 3));
        } else {
            $("#descvallugName").val(getLookupData(idNum, 1));
        }

        func_ActionDriven("actClearGrid", false);
    }
}

function EnableFields() {
}

function DisableFields() {
    $('#idvallugAccountNo').enable(false);
    $('#idvallugCustomer').enable(false);
    $('#idvallugCustomerClass').enable(false);
    $('#idvallugUnitOwner').enable(false);
    //$('#idvallugAccountNo').css('background-color', 'gainsboro');
    //$('#idvallugCustomer').css('background-color', 'gainsboro');
    $('#txtContactDetails').enable(false);
    $('#txtTIN').enable(false);
    $('#txtUnitCode').enable(false);

    $('#lugInventoryClass').enable(false);
    $('#lugInventoryType').enable(false);
    $('#luglevel1').enable(false);
    $('#luglevel2').enable(false);
    $('#luglevel3').enable(false);
    $('#luglevel4').enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    
}

function EnableFieldsDone() {//Binding Done
}


function DisableFieldsEmpty() {

}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0') 
        DisableFieldsEmpty();
    else 
        EnableFieldsDone();
    
}

function ClearFields() {
    $('#idvallugAccountNo').val('');
    $('#idvallugCustomer').val('');
    $('#descvallugCustomer').val('');
    $('#idvallugCustomerClass').val('');
    $('#descvallugCustomerClass').val('');
    $('#idvallugUnitOwner').val('');
    $('#descvallugUnitOwner').val('');
    $('#txtAddress').val('');
    $('#txtContactDetails').val('');
    $("#txtTIN").val('');
    $('#txtUnitCode').val('');
    $('#idvallugInventoryType').val('');
    $('#descvallugInventoryType').val('');
    $('#idvallugInventoryClass').val('');
    $('#descvallugInventoryClass').val('');
    $('#level1').html("Level 1");
    $('#idvalluglevel1').val('');
    $('#descvalluglevel1').val('');
    $('#level2').html("Level 2");
    $('#idvalluglevel2').val('');
    $('#descvalluglevel2').val('');
    $('#level3').html("Level 3");
    $('#idvalluglevel3').val('');
    $('#descvalluglevel3').val('');
    $('#level4').html("Level 4");
    $('#idvalluglevel4').val('');
    $('#descvalluglevel4').val('');
    $('#txtAccountStatus').val('');
}


function func_LookUpInitialize(lookupid) {
    cust_GetPara();
    func_ActionDriven("actGetSetHdr");

}

$(document).on("change", "#cmbLedgerType", function (e) {
    nwLoading_Start("nwLoading", crLoadingHTML);
    $("#idvallugName").val('');
    $("#descvallugName").val('');
    $("#txtRegisteredName").val('');
    $("#txtTradeName").val('');
    $("#txtAddress").val('');
    $("#txtContact").val('');
    $("#txtVendorAcct").val('');
    $("#txtCustomerAcct").val('');
    $("#txtCheckPayeeName").val('');
    $("#txtTIN").val('');

    func_ActionDriven("actClearGrid", false);
});


$(function () {
    $("#settingstabs").tabs();
});

function GetAddtoListFilters() {

    var len = $('div.atlContainer').length;
    for (var i = 0; i < len; i++) {
        var xkey = $('div.atlContainer:eq(' + i + ')').attr('nwtype');
        var xvalue = "";
        var lencode = $('.atlContainer:eq(' + i + ')').find('div.spantext').length;
        for (var j = 0; j < lencode; j++) {
            if (xvalue != "") xvalue += "|";
            xvalue += $('.atlContainer:eq(' + i + ') div.spantext:eq(' + j + ')').attr('nwcode');
        }   

        nwParameter_Add(xkey, xvalue);
    }


};

function GenerateLookupListDataHTML(xvalue, xdisplay) {

    return '<div class="spantext nwCuz-029" nwcode="' + xvalue + '">' + xdisplay + '<span class="classx"> x</span></div>';

};

$(document).on("click", ".btnGetlookup", function () {

    crnwTableCon = null; // if grid is click 
    var xtype = $(this).attr("nwtype");
    var selectedInput = xtype;
    GetAddtoListFilters();
    lookUpCustomize(selectedInput, 2);
});


//add to list
function nwGrid_AddtoListDoneCustom(verID, addtoListTableRec, index) {
    var xvalue = "";
    var xdisplay = "";

    if (verID == "luglocacc") {
        xvalue = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
        xdisplay = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

        if ($('div.atlContainer[nwtype="' + verID + '"]').find('div.spantext[nwcode="' + xvalue + '"]').length < 1) {

            $('div.atlContainer[nwtype="' + verID + '"] div.innertext').append(GenerateLookupListDataHTML(xvalue, xdisplay));
        }
    }

    if (verID == "lugPCCC") {
        xvalue = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
        xdisplay = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

        if ($('div.atlContainer[nwtype="' + verID + '"]').find('div.spantext[nwcode="' + xvalue + '"]').length < 1) {

            $('div.atlContainer[nwtype="' + verID + '"] div.innertext').append(GenerateLookupListDataHTML(xvalue, xdisplay));
        }
    }
}

$(document).on('click', 'span.classx', function () {

    $(this).closest('div.spantext').remove();
    $('#lugdocfrom input').val("");
    $('#lugdocto input').val("");
    $('#lugcreatedby input').val("");
    $('#lugstatus input').val("");

});

function ShowPrintPreview(PDFUrl, DocnoJSON) {
    var docnoList = JSON.parse(DocnoJSON)
    //var arrayDocno = nwCreate2DArray(docnoList.docnorownum.length);
    //var ctr = 0;
    //$.each(docnoList.docnorownum, function (e, item) {
    //    arrayDocno[ctr][0] = item.Docno;
    //    arrayDocno[ctr][1] = item.RowNum;
    //    ctr++;
    //});
    nwLoadPrint(PDFUrl, docnoList);
}

function func_nwPrintPreview_PrintClick() {
    var isContinue = true;
    nwParameter_Add("TransNoList", TransNoList);
    //func_ActionDriven("ValidatePrinting", false);
    nwPrintPreview_Print();
    isContinue = false;
    return isContinue;
}

function func_nwPrintPreview_PrintDone() {

    //nwParameter_Add("TransNoList", TransNoList);
    cust_GetPara();
    nwParameter_Add_Table("nwGridMainCon");
    //func_ActionDriven("InsertReprint", true);
}

function func_nwPrintPreview_DownloadClick() {
    cust_GetPara();
    nwParameter_Add_Table("nwGridMainCon");
    //func_ActionDriven("InsertReprint", true);
}


function msgBoxContainerQuestionF(genID, answer) {

    if (genID == "PromptPrinting") {
        if (answer == "Yes") {
            nwPrintPreview_Print();
        }
    }


}

function defaultonload(code, description) {
    $('div.atlContainer[nwtype="luglocacc"] div.innertext').append(GenerateLookupListDataHTML(code, description));
}


//NDB Functions
function setLevelCodeDesc() {
    let accountNo = $('#idvallugAccountNo').val();
    let lvl1 = $('#descvalluglevel1').attr('nwLevel');
    let lvl2 = $('#descvalluglevel2').attr('nwLevel');
    let lvl3 = $('#descvalluglevel3').attr('nwLevel');
    let lvl4 = $('#descvalluglevel4').attr('nwLevel');

    nwLoading_Start("actsetLevelCodeDesc", crLoadingHTML);
    nwParameter_Add("accountNo", accountNo);
    nwParameter_Add("lvl1", lvl1);
    nwParameter_Add("lvl2", lvl2);
    nwParameter_Add("lvl3", lvl3);
    nwParameter_Add("lvl4", lvl4);
    
    func_ActionDriven("actsetLevelCodeDesc", false);

    
}
function generateNextNum() {
    //table = nwGridCustomerLedgerCon
    var MaxRow = nwTempTable_Row_Count('nwGridCustomerLedgerCon');
    let counter = 1;
    for (var x = 0; x < MaxRow; x++) {
        let date = nwTempTable_RowData_Get('nwGridCustomerLedgerCon', x, (SPR_BSNO_UO- 1), 'input');
        if(date != ""){
            crnwTable.find("tr").find("td:eq(" + SPR_NO_UO + ")").text(counter);
            counter++;
        }
    }
}

function insertRow() {
    $('#nwGridBillingStatementCon table tbody tr:eq(0)').before('<tr class="gvHeaderStyle text-right nwCuz-030"><th class="nwgrid_startbox nwFreezePaneTH ui-resizable text-right nwCuz-032" scope="col" rowspan="1"><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div></th><th class="nwgrid_columnheader  ui-resizable text-right nwCuz-034" scope="col"><div></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div></th><th class="nwgrid_columnheader  ui-resizable text-right nwCuz-035" scope="col"><div></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div></th><th class="nwgrid_columnheader  ui-resizable text-right nwCuz-035" scope="col"><div></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div></th><th class="nwgrid_columnheader  ui-resizable text-right nwCuz-035" scope="col"><div></div><div class="ui-resizable-handle ui-resizable-e nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div></th><th class="nwgrid_columnheader  ui-resizable text-right nwCuz-035" scope="col"><div class="text-left" title="Total"><b>Total</b></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div></th><th class="nwgrid_columnheader  ui-resizable text-right nwCuz-035" scope="col"><div><b id="txtBilledAmount"></b></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div></th><th class="nwgrid_columnheader  ui-resizable text-right nwCuz-035" scope="col"><div> <b id="txtTotalPenalty"></b></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div></th><th class="nwgrid_columnheader  ui-resizable nwCuz-035" scope="col"><div><b id="txtTotalAmountDue"></b></div><div class="ui-resizable-handle ui-resizable-e nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e nwCuz-033"></div></th><th class="nwgrid_columnheader  ui-resizable nwCuz-035" scope="col"><div><b id="txtTotalPayment"></b></div><div class="ui-resizable-handle ui-resizable-e nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e nwCuz-033"></div></th><th class="nwgrid_columnheader  ui-resizable nwCuz-035" scope="col"><div><b id="txtTotalOutstandingBalance"></b></div><div class="ui-resizable-handle ui-resizable-e nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e nwCuz-033"></div></th></tr>');
    if ($('#idvallugAccountNo').val() != "") {
        setTotalValue();
    }
}

function insertRowDetails() {
    $('#nwGridPopupDetails table tbody tr:eq(0)').before('<tr class="gvHeaderStyle nwCuz-031"> <th class="nwgrid_startbox nwFreezePaneTH ui-resizable text-left nwCuz-032" scope="col" rowspan="1"> <div class="ui-resizable-handle ui-resizable-e text-left nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-left nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-left nwCuz-033"></div></th> <th class="nwgrid_columnheader ui-resizable text-left nwCuz-034" scope="col"> <div> <div class="text-left" title="Total"><b>Total</b></div></div><div class="ui-resizable-handle ui-resizable-e text-left nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-left nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-left nwCuz-033"></div></th> <th class="nwgrid_columnheader ui-resizable text-right nwCuz-035" scope="col"> <div class="text-right"><b id="txtTotalVatex"></b></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div></th> <th class="nwgrid_columnheader ui-resizable text-right nwCuz-035" scope="col"> <div class="text-right"><b id="txtTotalVAT"></b></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div></th> <th class="nwgrid_columnheader ui-resizable text-right nwCuz-035" scope="col"> <div class="text-right"><b id="txtTotalVATIN"></b></div><div class="ui-resizable-handle ui-resizable-e nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e text-right nwCuz-033"></div></th> <th class="nwgrid_columnheader ui-resizable nwCuz-035" scope="col"> <div class="text-right"><b id="txtTotalCWT"></b></div><div class="ui-resizable-handle ui-resizable-e nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e nwCuz-033"></div></th> <th class="nwgrid_columnheader ui-resizable nwCuz-035" scope="col"> <div class="text-right"><b id="txtDetailsTotalAmountDue"></b></div><div class="ui-resizable-handle ui-resizable-e nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e nwCuz-033"></div><div class="ui-resizable-handle ui-resizable-e nwCuz-033"></div></th></tr>');
    setTotalDetailsValue();
}

function setTotalDetailsValue() {
    let maxRow = nwTempTable_Row_Count('nwGridPopupDetails');
    var txtTotalVatex = 0;
    var txtTotalVAT = 0;
    var txtTotalVATIN = 0;
    var txtTotalCWT = 0;
    var txtDetailsTotalAmountDue = 0;
    for (var x = 0; x < maxRow; x++) {
        let vatex = nwTempTable_RowData_Get('nwGridPopupDetails', x, (SPR_Vatex - 1)).replaceAll(",", '');
        if (vatex != "") {
            txtTotalVatex += parseFloat(vatex)
        }
        let vat = nwTempTable_RowData_Get('nwGridPopupDetails', x, (SPR_Vat - 1)).replaceAll(",", '');
        if (vat != "") {
            txtTotalVAT += parseFloat(vat)
        }
        let vatin = nwTempTable_RowData_Get('nwGridPopupDetails', x, (SPR_Vatin - 1)).replaceAll(",", '');
        if (vatin != "") {
            txtTotalVATIN += parseFloat(vatin)
        }
        let cwt = nwTempTable_RowData_Get('nwGridPopupDetails', x, (SPR_Cwt - 1)).replaceAll(",", '');
        if (cwt != "") {
            txtTotalCWT += parseFloat(cwt)
        }
        let detailsAmountDue = nwTempTable_RowData_Get('nwGridPopupDetails', x, (SPR_DetailsAmountDue - 1)).replaceAll(",", '');
        if (detailsAmountDue != "") {
            txtDetailsTotalAmountDue += parseFloat(detailsAmountDue)
        }
    }
    $('#txtDetailsTotalAmountDue').text(addThousandSeparator(txtDetailsTotalAmountDue.toFixed(2)));
    $('#txtTotalCWT').text(addThousandSeparator(txtTotalCWT.toFixed(2)));
    $('#txtTotalVATIN').text(addThousandSeparator(txtTotalVATIN.toFixed(2)));
    $('#txtTotalVAT').text(addThousandSeparator(txtTotalVAT.toFixed(2)));
    $('#txtTotalVatex').text(addThousandSeparator(txtTotalVatex.toFixed(2)));
}

function setTotalValue() {
    let maxRow = nwTempTable_Row_Count('nwGridCustomerLedgerCon');
    var totalAmount = 0;
    var totalPenalty = 0;
    var totalAmountDue1 = 0;
    var totalPayment = 0;
    var totalBilledAmnt = 0;
    for (var x = 1; x < maxRow + 1; x++) {
        let billedAmnt = nwTempTable_RowData_Get('nwGridBillingStatementCon', x, (SPR_AMOUNTDUE_BS - 1));
        if (billedAmnt != "") {
            totalBilledAmnt += parseFloat(billedAmnt.replaceAll(',', ''));
        }
         

        let amount = nwTempTable_RowData_Get('nwGridBillingStatementCon', x, (SPR_OUTSTANDINGBALANCE_BS - 1));
        if (amount != "") {
            totalAmount += parseFloat(amount.replaceAll(',', ''));
        }
        let penalty = nwTempTable_RowData_Get('nwGridBillingStatementCon', x, (SPR_PENALTY_BS - 1));
        if(penalty != ""){
            totalPenalty += parseFloat(penalty.replaceAll(',', ''));
        }
        let totalAmountDue = nwTempTable_RowData_Get('nwGridBillingStatementCon', x, (SPR_TOTALAMTDUE_BS - 1));
        if (totalAmountDue != "") {
            totalAmountDue1 += parseFloat(totalAmountDue.replaceAll(',', ''));
        }
        let payment = nwTempTable_RowData_Get('nwGridBillingStatementCon', x, (SPR_PAYMENTS_BS - 1));
        if (payment != "") {
            totalPayment += parseFloat(payment.replaceAll(',', ''));
        }
    }
    totalPayment = totalPayment.toFixed(2);
    totalAmountDue1 = totalAmountDue1.toFixed(2);
    $('#txtTotalPayment').text(addThousandSeparator(totalPayment));
    $('#txtTotalAmountDue').text(addThousandSeparator(totalAmountDue1));
    $('#txtTotalPenalty').text(addThousandSeparator(totalPenalty.toFixed(2)));
    $('#txtBilledAmount').text(addThousandSeparator(totalBilledAmnt.toFixed(2)));
    $('#txtTotalOutstandingBalance').text(addThousandSeparator(totalAmount.toFixed(2)));
    //calcOutstandingBal();
}
//1940364.00
//addThousandSeparator('1940364.00')
function addThousandSeparator(string) {
    return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calcOutstandingBal() {
    let maxRow = nwTempTable_Row_Count('nwGridBillingStatementCon');
     var tmpOutStandingBal = parseFloat($('#txtTotalOutstandingBalance').text().replaceAll(',', ''));
    for (var x = 0; x < maxRow; x++) {
        let payment = nwTempTable_RowData_Get('nwGridBillingStatementCon', x, (SPR_PAYMENTS_BS - 1)).replaceAll(',', '');
        if(payment != ""){
            if (tmpOutStandingBal >= parseFloat(payment)) {
                tmpOutStandingBal -= parseFloat(payment);
            } else {
                tmpOutStandingBal = 0.00;
            }
            $(`#nwGridBillingStatementCon table tbody tr:eq(${x}) th:eq(${SPR_OUTSTANDINGBALANCE_BS}) #txtTotalOutstandingBalance`).html(addThousandSeparator(tmpOutStandingBal.toFixed(2)));
        }
    }
   
}

function calcOutstandingBal2() {
    let totalAmntDue = parseFloat($('#txtTotalAmountDue').text().replaceAll(",", ''));
    let maxRow = nwTempTable_Row_Count('nwGridCustomerLedgerCon');
    for (var x = 0; x < maxRow; x++) {
        let payment = nwTempTable_RowData_Get('nwGridCustomerLedgerCon', x, (SPR_AMTPD_UO - 1)).replaceAll(",",'');
        if (payment != "") {
 
            if (totalAmntDue >= parseFloat(payment)) {
                totalAmntDue -= parseFloat(payment);
            } else {
                totalAmntDue = 0.00;
            }
            $(`#nwGridBillingStatementCon table tbody tr:eq(${x}) th:eq(${SPR_OUTSTANDINGBALANCE_BS}) #txtTotalOutstandingBalance`).html(addThousandSeparator(totalAmntDue.toFixed(2)));
        }
    }
    //$(`#nwGridBillingStatementCon table tbody tr:eq(0) th:eq(${SPR_OUTSTANDINGBALANCE_BS}) #txtTotalOutstandingBalance`).html(addThousandSeparator(totalAmntDue.toFixed(2)))
}
function generateNextNum() {
    //table = nwGridCustomerLedgerCon
    var MaxRow = nwTempTable_Row_Count('nwGridCustomerLedgerCon');
    let counter = 1;
    for (var x = 0; x < MaxRow; x++) {
        let billNo = nwTempTable_RowData_Get('nwGridCustomerLedgerCon', x, (SPR_BSNO_UO - 1));
        if (billNo != "") {
            nwTempTable_RowData_Set('nwGridCustomerLedgerCon', x, SPR_NO_UO)('<b>' + counter + '</b>');
            counter++;
        }
    }
    $('td[data-label="No."]').css('text-align', 'center');
    //calcOutstandingBal2();
}

//$(document).on('click', '.billingstmntDetails', function () {
//    let billingStmntNum = crnwTR.find(`td:eq(${SPR_BSNO_BS})`).text();
//    let accountNo = $('#idvallugAccountNo').val();
//    if (billingStmntNum != "") {
//        nwLoading_Start("actGenerateGridTotalAmountDueDetails", crLoadingHTML);
//        nwPopupForm_ShowModal('nwPopupDetails');
//        nwParameter_Add("billingStmntNum", billingStmntNum);
//        nwParameter_Add("accountNo", accountNo);
//        func_ActionDriven("actGenerateGridTotalAmountDueDetails", false);
      
//    }
//});

function cust_GetParaSpread() {
    nwParameter_Add_Spread(nwGridMainCon_Book);
    nwParameter_Add_Spread(nwGridMainCon_Book1);
}

function CreatedGridDone() {
    setTimeout(function () {
        nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_DETAILS_BS - 1, Spread_ALLROW, "blue");
        nwGridMainCon_Book.ActiveSheet.SetTextColor(SPR_DETAILS_BS - 1, Spread_ALLROW, "white");
    }, 100);
}

function p8Spread_Click(canvasID, row, col) {

    if (canvasID == "nwGridBillingStatementCon") {
        if (col == (SPR_DETAILS_BS - 1)) {
            let thisID = $("#" + canvasID);
            let billingStmntNum = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_BSNO_BS - 1, row);
            let accountNo = $('#idvallugAccountNo').val();

            if (billingStmntNum != "") {
                nwLoading_Start("actGenerateGridTotalAmountDueDetails", crLoadingHTML);
                //nwPopupForm_ShowModal('nwPopupDetails');
                nwParameter_Add("billingStmntNum", billingStmntNum);
                nwParameter_Add("accountNo", accountNo);
                func_ActionDriven("actGenerateGridTotalAmountDueDetails", false);
                $(document).find("#number1_popup").addClass("show");
            }
        }
    }
}

