
baseTitle = 'Approved Payment Request Entry';


var SPR_DOCUMENTNO = 1,
    SPR_DOCUMENTPOSTINGDATE = 2,
    SPR_REFNO = 3,
    SPR_REFDATE = 4,
    SPR_DUEDATE = 5,
    SPR_ITEMGROUPTYPECODE = 6,
    SPR_ITEMGROUPTYPEDESC = 7,
    SPR_ITEMCODE = 8,
    SPR_ITEMDESC = 9,
    SPR_UOM = 10,
    SPR_QTY = 11,
    SPR_AMOUNT = 12,
    SPR_TOTALAMOUNT = 13,
    SPR_REVIEWATTACHMENT = 14,
    SPR_LINEID = 15,
    SPR_REVIEWATTACHMENTTAG = 16,
    SPR_BASEUOMCODE = 17,
    SPR_VATTAXDESC = 18,
    SPR_EWTDESC = 19,
    SPR_VATTAXCODE = 20,
    SPR_EWTCODE = 21;



var nwGridCon_Book;
var nwGridCon_Sheet;

var nwGridCon3_Book;
var nwGridCon3_Sheet;

var _row = 0;
var _col = 0;
var _canvasID;

var _VatCode = "";
var _VatDesc = "";
var _EWTCode = "";
var _EWTDesc = "";
var filter = "";

var nwDocno = "";
function func_Reload() {
    crLnk = GetCurrentURL() + "APApprovedPaymentRequestEntry2_Gateway";
    crLnkGateKey = "APApprovedPaymentRequestEntry2";
    crnwTagSingleBind = true;

    nwDocno = getParameterByName('nwDocno');
    console.log("nwDocno: " + nwDocno);
    nwParameter_Add("nwDocno", nwDocno);

    DisableFields();
    nwPopupForm_Create("nwPopWindow", false);
    nwPopupForm_Create("FormProcess", true);

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    return isContinue;
}

function mainLoad() {
    if (nwDocno != "") {
        $('#noah-webui-Toolbox').visible(false);
        $('#noah-webui-Footer').visible(false);
        nwParameter_Add('nwDocno', nwDocno);
        $('#noah-webui-default-Refresh').click();
    }
}

////////////////////////// Tool Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    func_Toolbox_Clear();
    $("#idvallugLocForm").focus();
    return isContinue;
}

function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", baseTitle, "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxProcess(indef, enume) {
    var isContinue = true;
    nwPopupForm_ShowModal("FormProcess");
    $('#FormProcess .modal-hdr-title').text("Process");
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
    nwParameter_Add("idvallugLocForm", $('#idvallugLocForm').val());
    nwParameter_Add("idvallugPayee", $("#idvallugPayee").val());
    nwParameter_Add("txtRemarks", $("#txtRemarks").val());
    nwParameter_Add("txtTransactionNo", $("#txtTransactionNo").val());
    try { nwParameter_Add_DataSet("nwGridCon"); } catch (e) { }
    try { nwParameter_Add_DataSet("nwGridCon3"); } catch (e) { }
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
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {
    DisableFieldsEmpty();
}
///////////////////////////////////////

var temp_crnwTR = "";

function EnableFields() {
    $("#lugLocForm").enable(true);
    $("#lugPayee").enable(true);
    $("#nwGridCon").enable(true);
    $("#txtRemarks").enable(true)

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
}
function DisableFields() {
    $('#lugLocForm').enable(false);
    $('#lugPayee').enable(false);
    $('#lugSubPayee').enable(false);
    $('#lugCurrency').enable(false);
    $("#txtPayeeName").enable(false);
    $("#txtRemarks").enable(false);

    $("#txtTransactionNo").enable(false);
    $("#txtDateSubmitted").enable(false);
    $("#txtDatePosted").enable(false);
    $("#txtDocumentStatus").enable(false);
    $("#lugRsnDisapproval").enable(false);
    $("#txtDisRemarks").enable(false);
    $("#btnReqCompliance").enable(false);

    $("#noah-webui-Toolbox").bindingImport().enable(false);
    $("#noah-webui-Toolbox").bindingNew().enable(false);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingExport().visible(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().visible(true);
}

function EnableFieldsDone() { //Binding Done
    $("#lugLocForm").enable(false);
    $("#lugPayee").enable(false);
    $("#txtRemarks").enable(false);
    $("#nwGridCon").enable(true);
    $("#btnCopyFrom").enable(false);

    $("#btnReqCompliance").enable(true);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(true);
}

function DisableFieldsEmpty() {
    $("#lugVendor").enable(false);
    $("#txtRemarks").enable(false);
    $("#nwGridCon").enable(false);
    $("#nwGrid1").enable(false);
    $("#btnReqCompliance").enable(false);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(true);
}

function ClearFields() {
    $("#idvallugLocForm").val("");
    $("#descvallugLocForm").val("");
    $("#idvallugPayee").val("");
    $("#descvallugPayee").val("");
    $("#idvallugSubPayee").val("");
    $("#descvallugSubPayee").val("");
    $("#idvallugCurrency").val("");
    $("#descvallugCurrency").val("");
    $("#txtPayeeName").val("");
    $("#txtRemarks").val("");

    $("#txtTransactionNo").val("");
    $("#txtDateSubmitted").val("");
    $("#txtDatePosted").val("");
    $("#txtDocumentStatus").val("");
    $("#idvallugRsnDisapproval").val("");
    $("#descvallugRsnDisapproval").val("");
    $("#txtDisRemarks").val("");
}


function RefreshData() {

    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}

/* ###STNDRD FUNC */
function func_LookUpInitialize(id) {

    if (id == 'lugItemGroupTypeCode') {
        var maxRow = nwGridCon_Book.ActiveSheet.GetMaxRow();
        var item = '';
        var itemGroupType = '';
        for (var x = 0; x <= maxRow; x++) {
            item += "|" + nwGridCon_Book.ActiveSheet.GetText((SPR_ITEMCODE - 1), x);
            itemGroupType += "|" + nwGridCon_Book.ActiveSheet.GetText((SPR_ITEMGROUPTYPECODE - 1), x);
        }
        nwParameter_Add("txtItemCode", item);
        nwParameter_Add("itemGroupType", itemGroupType);
    }

    if (id == 'lugItemCode') {
        var maxRow = nwGridCon_Book.ActiveSheet.GetMaxRow();
        var item = '';
        for (var x = 0; x <= maxRow; x++) {
            item += "|" + nwGridCon_Book.ActiveSheet.GetText((SPR_ITEMCODE - 1), x);
        }
        nwParameter_Add("txtItemCode", item);

        _VatCode = nwGridCon_Book.ActiveSheet.GetText((SPR_VATTAXCODE - 1), x);
        _VatDesc = nwGridCon_Book.ActiveSheet.GetText((SPR_VATTAXDESC - 1), x);
        _EWTCode = nwGridCon_Book.ActiveSheet.GetText((SPR_EWTCODE - 1), x);
        _EWTDesc = nwGridCon_Book.ActiveSheet.GetText((SPR_EWTDESC - 1), x);
    }

}


function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {

    var cnt = nwGridCon_Book.ActiveSheet.GetMaxRow();

    if (nwGridID == 'nwGridCon') {
        if (_col == (SPR_ITEMGROUPTYPECODE - 1)) {
            var Grid = nwGridCon_Book.ActiveSheet;
            var collength = Grid.GetMaxCol();
            var col = Grid.GetSelectedIndexes().col;
            var row = Grid.GetSelectedIndexes().row;
            var code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
            var desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
            //if (col == SPR_USERCODE - 1) {
            var data = Grid.GetValue(SPR_ITEMGROUPTYPECODE - 1, _row);
            var hasValue = false;
            if (index == 0 && data == "") {
                for (coli = 0; coli < collength; coli++) {
                    if ((SPR_ITEMGROUPTYPECODE - 1) == coli
                        || (SPR_ITEMGROUPTYPEDESC - 1) == coli) {
                        continue;
                    }
                    var value = Grid.GetValue(coli, _row);
                    if (value != "") {
                        hasValue = true;
                        break;
                    }
                }
            }
            if (hasValue) {
                crnwTRtemp = null;
                Grid.SetText((SPR_ITEMGROUPTYPECODE - 1), _row, addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text());
                Grid.SetText((SPR_ITEMGROUPTYPEDESC - 1), _row, addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text());
            } else {
                crnwTRtemp[SPR_ITEMGROUPTYPECODE - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
                crnwTRtemp[SPR_ITEMGROUPTYPEDESC - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
            }

            defaultVAT(index);

        } else if (_col == (SPR_ITEMCODE - 1)) {
            var Grid = nwGridCon_Book.ActiveSheet;
            var collength = Grid.GetMaxCol();
            var col = Grid.GetSelectedIndexes().col;
            var row = Grid.GetSelectedIndexes().row;
            var code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
            var desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
            console.log("code:" + code + " desc:" + desc)
            //if (col == SPR_USERCODE - 1) {
            var data = Grid.GetValue(SPR_ITEMGROUPTYPECODE - 1, _row);
            var hasValue = false;
            if (index == 0 && data == "") {
                for (coli = 0; coli < collength; coli++) {
                    if ((SPR_ITEMGROUPTYPECODE - 1) == coli
                        || (SPR_ITEMGROUPTYPEDESC - 1) == coli) {
                        continue;
                    }
                    var value = Grid.GetValue(coli, _row);
                    if (value != "") {
                        hasValue = true;
                        break;
                    }
                }
            }
            if (hasValue) {
                crnwTRtemp = null;
                Grid.SetText((SPR_ITEMGROUPTYPECODE - 1), _row, addtoListTableRec.find('tr:eq(' + index + ') td:eq(4)').text());
                Grid.SetText((SPR_ITEMGROUPTYPEDESC - 1), _row, addtoListTableRec.find('tr:eq(' + index + ') td:eq(5)').text());
                Grid.SetText((SPR_ITEMCODE - 1), _row, addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text());
                Grid.SetText((SPR_ITEMDESC - 1), _row, addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text());
                Grid.SetText((SPR_UOM - 1), _row, addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text());

            } else {
                crnwTRtemp[SPR_ITEMGROUPTYPECODE - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(4)').text();
                crnwTRtemp[SPR_ITEMGROUPTYPEDESC - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(5)').text();
                crnwTRtemp[SPR_ITEMCODE - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
                crnwTRtemp[SPR_ITEMDESC - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
                crnwTRtemp[SPR_UOM - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();

            }
        }

        if (cnt == (_row + 1)) {
            nwGrid_AddRow(nwGridID, 1);
        }
    }

    return crnwTRtemp;
}


function Lookup_DoneFunction(idName, idNum) {
    const currentRow = idNum - 1
    var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + currentRow + ")").find("td:eq(" + (0) + ") span").text();
    var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + currentRow + ")").find("td:eq(" + (1) + ") span").text();
    var tempdesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + currentRow + ")").find("td:eq(" + (2) + ") span").text();
    var ratag = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + currentRow + ")").find("td:eq(" + (3) + ") span").text();

    if (idName == 'toolboxInquire') {
        cust_GetPara();
    }

    if (idName == 'lugDocumentNo') {
        nwGridCon_Book.ActiveSheet.SetText((SPR_DOCUMENTNO - 1), _row, code);
        nwGridCon_Book.ActiveSheet.SetText((SPR_DOCUMENTPOSTINGDATE - 1), _row, desc);
        nwGridCon_Book.ActiveSheet.SetText((SPR_REVIEWATTACHMENTTAG - 1), _row, ratag);
        HasDataRemarks();
    }

    if (idName == 'lugPayee') {
        var subtypeCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + currentRow + ")").find("td:eq(" + (2) + ") span").text();
        var subtypeDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + currentRow + ")").find("td:eq(" + (3) + ") span").text();
        var currencyCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + currentRow + ")").find("td:eq(" + (4) + ") span").text();
        var currencyDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + currentRow + ")").find("td:eq(" + (5) + ") span").text();
        var payeeName = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + currentRow + ")").find("td:eq(" + (6) + ") span").text();
        console.log("sub: " + currentRow)
        $('#idvallugSubPayee').val(subtypeCode)
        $('#descvallugSubPayee').val(subtypeDesc)
        $('#idvallugCurrency').val(currencyCode)
        $('#descvallugCurrency').val(currencyDesc)
        $('#txtPayeeName').val(payeeName)
    }

    if (idName == 'lugItemGroupTypeCode') {
        nwGridCon_Book.ActiveSheet.SetText((SPR_ITEMGROUPTYPECODE - 1), _row, code);
        nwGridCon_Book.ActiveSheet.SetText((SPR_ITEMGROUPTYPEDESC - 1), _row, desc);
        var cnt = nwGridCon_Book.ActiveSheet.GetMaxRow();

        cust_GetPara();

        nwGridCon_Book.ActiveSheet.SetText((SPR_ITEMCODE - 1), _row, "");
        nwGridCon_Book.ActiveSheet.SetText((SPR_ITEMDESC - 1), _row, "");

        if (cnt == (_row + 1)) {
            nwGrid_AddRow(nwGridID, 1);
        }

    }

    if (idName == 'lugItemCode') {
        nwGridCon_Book.ActiveSheet.SetText((SPR_ITEMCODE - 1), _row, code);
        nwGridCon_Book.ActiveSheet.SetText((SPR_ITEMDESC - 1), _row, desc);
        cust_GetPara();
    }

    if (idName == 'lugUOM') {

        nwGridCon_Book.ActiveSheet.SetText((SPR_UOM - 1), _row, desc);
        nwGridCon_Book.ActiveSheet.SetText((SPR_BASEUOMCODE - 1), _row, code);
    }

    if (idName == 'lugMDRUOM') {

        nwGridCon_Book.ActiveSheet.SetText((SPR_MDRUOM - 1), _row, desc);
        nwGridCon_Book.ActiveSheet.SetText((SPR_MDRUOMCode - 1), _row, code);
    }

    if (idName == 'lugCurrency') {

        nwGridCon_Book.ActiveSheet.SetText((SPR_CURRENCY - 1), _row, desc);
        nwGridCon_Book.ActiveSheet.SetText((SPR_CURRENCYCode - 1), _row, code);
    }

    if (idName == 'lugVattaxCode') {

        nwGridCon_Book.ActiveSheet.SetText((SPR_VATTAXCODE - 1), _row, code);
        nwGridCon_Book.ActiveSheet.SetText((SPR_VATTAXDESC - 1), _row, desc);
    }

    if (idName == 'lugEWTCode') {

        nwGridCon_Book.ActiveSheet.SetText((SPR_EWTCODE - 1), _row, code);
        nwGridCon_Book.ActiveSheet.SetText((SPR_EWTDESC - 1), _row, desc);
    }

    if (idName == 'lugCopyFrom') {
        nwParameter_Add("idvallugVendor", code);
        func_ActionDriven("actCopyFrom", false);
    }

}


function defaultVAT(index) {
    var sup = $("#idvallugVendor").val();
    var row = index;

    var VAT = nwGridCon_Book.ActiveSheet.GetText((SPR_VATTAXCODE - 1), row);
    var EWT = nwGridCon_Book.ActiveSheet.GetText((SPR_EWTCODE - 1), row);

    if (VAT == "" || EWT == "") {
        nwParameter_Add("row", row);
        nwParameter_Add("idvallugVendor", sup);
        func_ActionDriven("actdefaultVAT", false);
    }
}


function HasDataRemarks() {
    var maxRow = nwGridCon_Book.ActiveSheet.GetMaxRow();

    setTimeout(function () {
        nwGridCon_Book.ActiveSheet.SetText2((SPR_REVIEWATTACHMENT - 1), Spread_ALLROW, "...");
        nwGridCon_Book.ActiveSheet.SetTextColor((SPR_REVIEWATTACHMENT - 1), Spread_ALLROW, "#FFFFFF");
        nwGridCon_Book.ActiveSheet.SetBackground((SPR_REVIEWATTACHMENT - 1), Spread_ALLROW, "gray");

        nwGridCon_Book.ActiveSheet.SetMaxLength((SPR_REFNO - 1), Spread_ALLROW, "30");

        for (var x = 0; x <= maxRow; x++) {
            var RATAG = nwGridCon_Book.ActiveSheet.GetText((SPR_REVIEWATTACHMENTTAG - 1), x);
            if (RATAG == "Green") {
                nwGridCon_Book.ActiveSheet.SetBackground((SPR_REVIEWATTACHMENT - 1), x, "green");
            }
            else {
                nwGridCon_Book.ActiveSheet.SetBackground((SPR_REVIEWATTACHMENT - 1), x, "gray");
            }
        }
    }, 150);
}

function lookupfilter() {
    filter = "";
    var gridlength = nwGridCon_Book.ActiveSheet.GetMaxRow();
    for (var i = 1; i <= gridlength; i++) {
        var code = nwGridCon_Book.ActiveSheet.GetText(0, i);
        if (code.length > 0) {
            if (filter.length > 0) {
                filter += "," + code.trim();
            }
            else {
                filter += code.trim();
            }
        }
    }
}

function p8Spread_Click(canvasID, row, col) {
    _canvasID = canvasID;
    _row = row;
    _col = col;
    var Grid;

    var locForm = $('#idvallugLocForm').val();
    var payee = $('#idvallugPayee').val();
    var currency = $('#idvallugCurrency').val();
    var remarks = $('#txtRemarks').val();

    if (!($("#" + canvasID).enable())) {
        return false;
    }

    if (canvasID == "nwGridCon") {
        if (locForm == "" || payee == "" || currency == "" || remarks == "") {
            MessageBox("Cannot proceed. Please complete the header details.", baseTitle);
            return false;
        }

        if (col == (SPR_REVIEWATTACHMENT - 1)) {
            var docno = nwGridCon_Book.ActiveSheet.GetText((SPR_DOCUMENTNO - 1), row)

            if (docno.length > 0) {
                var fullength = GetCurrentURL() + "../DCViewAttachment?nwDocno=" + docno + "&isView=true";

                nwLoading_Start('xbtnRvwAttach', crLoadingHTML);
                nwPopupForm_Create("nwPopUpRvwAttach", true, fullength);
                $('#nwPopUpRvwAttach .modal-hdr-title').text("Review Attachment(s)");
                nwPopupForm_ShowModal("nwPopUpRvwAttach");
                nwLoading_End('xbtnRvwAttach');
            }
        }
    }

    return true;
}

function p8Spread_DblClick(canvasID, row, col) {
    _canvasID = canvasID;
    _row = row;
    _col = col;
    var Grid;

    var currentRow = row;

    if (!($("#" + canvasID).enable())) {
        return false;
    }

    if (canvasID == "nwGridCon") {

        if (col == (SPR_DOCUMENTNO - 1)) {
            var maxRow = nwGridCon_Book.ActiveSheet.GetMaxRow();
            var item = '';
            for (var x = 0; x <= maxRow; x++) {
                item += "|" + nwGridCon_Book.ActiveSheet.GetText((SPR_DOCUMENTNO - 1), x);
            }
            cust_GetPara();
            nwParameter_Add("txtDocumentNo", item);
            lookUpCustomize("lugDocumentNo", 1, undefined, true);
        }

        if (col == (SPR_ITEMGROUPTYPECODE - 1)) {
            var maxRow = nwGridCon_Book.ActiveSheet.GetMaxRow();
            var item = '';
            for (var x = 0; x <= maxRow; x++) {
                item += "|" + nwGridCon_Book.ActiveSheet.GetText((SPR_ITEMCODE - 1), x);
            }
            nwParameter_Add("txtItemCode", item);
            nwParameter_Add("txtItemGroupTypeCode", nwGridCon_Book.ActiveSheet.GetText((SPR_ITEMGROUPTYPECODE - 1), row));
            lookUpCustomize("lugItemGroupTypeCode", 1, undefined, true);
        }

        if (col == (SPR_ITEMCODE - 1)) {
            var maxRow = nwGridCon_Book.ActiveSheet.GetMaxRow();
            var item = '';
            for (var x = 0; x <= maxRow; x++) {
                item += "|" + nwGridCon_Book.ActiveSheet.GetText((SPR_ITEMCODE - 1), x);
            }
            nwParameter_Add("txtItemCode", item);
            nwParameter_Add("txtItemGroupTypeCode", nwGridCon_Book.ActiveSheet.GetText((SPR_ITEMGROUPTYPECODE - 1), row));
            lookUpCustomize("lugItemCode", 1, undefined, true);

        }

        if (col == (SPR_UOM - 1)) {
            lookUpCustomize("lugUOM", 1, undefined, true);
        }


        if (col == (SPR_VATTAXDESC - 1)) {
            nwParameter_Add("txtVattaxCode", nwGridCon_Book.ActiveSheet.GetText((SPR_VATTAXDESC - 1), row));
            lookUpCustomize("lugVattaxCode", 1, undefined, true);
        }

        if (col == (SPR_EWTDESC - 1)) {
            nwParameter_Add("txtEWTCode", nwGridCon_Book.ActiveSheet.GetText((SPR_EWTDESC - 1), row));
            lookUpCustomize("lugEWTCode", 1, undefined, true);
        }
    }

    return true;
}

function p8Spread_Change(canvasID, row, col) {
    _canvasID = canvasID;
    _row = row;
    _col = col;
    var Grid;

    var currentRow = row;

    if (!($("#" + canvasID).enable())) {
        return false;
    }

    if (canvasID == "nwGridCon") {

        if (col == (SPR_REFDATE - 1) || col == (SPR_DUEDATE - 1)) {
            var refDate = Date.parse(nwGridCon_Book.ActiveSheet.GetText((SPR_REFDATE - 1), row))
            var dueDate = Date.parse(nwGridCon_Book.ActiveSheet.GetText((SPR_DUEDATE - 1), row))
            if (refDate > dueDate) {
                MessageBox("Cannot proceed. Ref Date should not be later than the Due Date.", baseTitle, "error");
                nwGridCon_Book.ActiveSheet.SetText(col, row, "");
            }
        }

        if (col == (SPR_QTY - 1) || col == (SPR_AMOUNT - 1)) {
            var qty = nwGridCon_Book.ActiveSheet.GetText((SPR_QTY - 1), row)
            var amount = nwGridCon_Book.ActiveSheet.GetText((SPR_AMOUNT - 1), row)
            // format amount and qty to number
            qty = parseFloat(qty.replace(/,/g, ''));
            amount = parseFloat(amount.replace(/,/g, ''));
            var total = qty * amount;
            nwGridCon_Book.ActiveSheet.SetText((SPR_TOTALAMOUNT - 1), row, total)
        }
    }

    return true;
}

$(document).on("click", "#btnReqCompliance", function (e) {

    var trantype = "APVNAM";
    var docno = $('#txtTransactionNo').val();
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

$(document).on("click", "#NwProcess", function (e) {
    msgBoxContainerQuestion = "Processdata";
    parent_MessageBoxQuestion("Do you want to process the transaction(s)?", baseTitle, "Question");
    return true;
});

function msgBoxContainerQuestionF(genID, answer) {
    cust_GetPara();
    if (genID == "Processdata") {
        if (answer == "Yes") {
            nwLoading_Start("xactprocess", crLoadingHTML);
            cust_GetPara();
            func_ActionDriven("actprocess", true);
        }
    }
}

function processclose() {
    nwPopupForm_HideModal("FormProcess");
}