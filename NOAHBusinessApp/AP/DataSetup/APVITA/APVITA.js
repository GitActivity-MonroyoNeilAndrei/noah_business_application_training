
baseTitle = "Vendor Item Tax Assignment";


var  SPR_ITEMGROUPTYPECODE = 1,
     SPR_ITEMGROUPTYPEDESC = 2,
     SPR_ITEMCODE = 3,
     SPR_ITEMDESC = 4,
     SPR_BASEUOM = 5,
     SPR_VATTAXDESC = 6,
     SPR_EWTDESC = 7,
     SPR_REMARKS = 8,
     SPR_TAGREMARKS = 9,
     SPR_VATTAXCODE = 10,
     SPR_EWTCODE = 11,
     SPR_BASEUOMCODE = 12;


var nwGridCon_Book;
var nwGridCon_Sheet;

var _row = 0;
var _col = 0;
var _canvasID;

var _VatCode = "";
var _VatDesc = "";
var _EWTCode = "";
var _EWTDesc = "";
var filter = "";

function func_Reload() {
    crLnk = GetCurrentURL() + "APVITA_Gateway";
    crLnkGateKey = "APVITA";
    crnwTagSingleBind = true;

    DisableFields();
    nwPopupForm_Create("nwPopWindow", false);

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    return isContinue;
}

////////////////////////// Tool Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    func_Toolbox_Clear();
    $("#idvallugVendor").focus();
    return isContinue;
}

function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", 'Vendor Item Tax Assignment', "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxProcess(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to process the current record?", 'Vendor Item Tax Assignment', "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", 'Vendor Item Tax Assignment', "", indef, enume);
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
    nwParameter_Add("txtID", $("#txtID").val());

    nwParameter_Add("idvallugVendor", $("#idvallugVendor").val());
    nwParameter_Add("txtRemarks", $("#txtRemarks").val());
    try{
        nwParameter_Add_DataSet("nwGridCon");
    } catch(e) {  }
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
    $("#lugVendor").enable(true);
    $("#nwGridCon").enable(true);
    $("#txtRemarks").enable(true);

    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
}
function DisableFields() {
    $("#lugVendor").enable(false);
    $("#txtRemarks").enable(false);

    $("#noah-webui-Toolbox").bindingImport().enable(false);
    $("#noah-webui-Toolbox").bindingNew().enable(false);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().visible(false);
}

function EnableFieldsDone() { //Binding Done
    $("#lugVendor").enable(false);
    $("#txtRemarks").enable(true);
    $("#nwGridCon").enable(true);
    $("#btnCopyFrom").enable(false);

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
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
}

function ClearFields() {
    $("#txtTranDate").val("");
    $("#txtTransactionNo").val("");
    $("#idvallugVendor").val("");
    $("#descvallugVendor").val("");
    $("#txtRemarks").val("");

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

    if (id == 'lugItemGroupTypeCode')
    {
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

    if (id == 'lugItemCode')
    {
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

        } else {
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
                Grid.SetText((SPR_ITEMGROUPTYPECODE - 1), _row, addtoListTableRec.find('tr:eq(' + index + ') td:eq(4)').text());
                Grid.SetText((SPR_ITEMGROUPTYPEDESC - 1), _row, addtoListTableRec.find('tr:eq(' + index + ') td:eq(5)').text());
                Grid.SetText((SPR_ITEMCODE - 1), _row, addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text());
                Grid.SetText((SPR_ITEMDESC - 1), _row, addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text());
                Grid.SetText((SPR_BASEUOM - 1), _row, addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text());
                Grid.SetText((SPR_VATTAXCODE - 1), _row, _VatCode);
                Grid.SetText((SPR_VATTAXDESC - 1), _row, _VatDesc);
                Grid.SetText((SPR_EWTCODE - 1), _row, _EWTCode);
                Grid.SetText((SPR_EWTDESC - 1), _row, _EWTDesc);
            } else {
                crnwTRtemp[SPR_ITEMGROUPTYPECODE - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(4)').text();
                crnwTRtemp[SPR_ITEMGROUPTYPEDESC - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(5)').text();
                crnwTRtemp[SPR_ITEMCODE - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
                crnwTRtemp[SPR_ITEMDESC - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
                crnwTRtemp[SPR_BASEUOM - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
                crnwTRtemp[SPR_VATTAXCODE - 1] = _VatCode;
                crnwTRtemp[SPR_VATTAXDESC - 1] = _VatDesc;
                crnwTRtemp[SPR_EWTCODE - 1] = _EWTCode;
                crnwTRtemp[SPR_EWTDESC - 1] = _EWTDesc;
            }
        }

            if (cnt == (_row + 1)) {
                nwGrid_AddRow(nwGridID, 1);
            }
     }

    return crnwTRtemp;
}


function Lookup_DoneFunction(idName, idNum) {

    var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + idNum + ")").find("td:eq(" + (0) + ") span").text();
    var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + idNum + ")").find("td:eq(" + (1) + ") span").text();
    var tempdesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + idNum + ")").find("td:eq(" + (2) + ") span").text();
   
    if (idName == 'toolboxInquire') {
        cust_GetPara();
    }

    if (idName == 'lugVendor') {
        $('.nwgbtnRemarks').enable(true);
    }

    if (idName == 'lugItemGroupTypeCode') {
        nwGridCon_Book.ActiveSheet.SetText((SPR_ITEMGROUPTYPECODE - 1), _row, code);
        nwGridCon_Book.ActiveSheet.SetText((SPR_ITEMGROUPTYPEDESC - 1), _row, desc);
        var cnt = nwGridCon_Book.ActiveSheet.GetMaxRow();

        cust_GetPara();
        defaultVAT(_row);

        nwGridCon_Book.ActiveSheet.SetText((SPR_ITEMCODE - 1), _row, "");
        nwGridCon_Book.ActiveSheet.SetText((SPR_ITEMDESC - 1), _row, "");
        nwGridCon_Book.ActiveSheet.SetText((SPR_BASEUOM - 1), _row, "");


       
        if (cnt == (_row + 1)) {
            nwGrid_AddRow(nwGridID, 1);
        }
   
    }



    if (idName == 'lugPackSizeUOM') {

        nwGridCon_Book.ActiveSheet.SetText((SPR_PACKSIZEUOM - 1), _row, desc);
        nwGridCon_Book.ActiveSheet.SetText((SPR_PACKSIZEUOMCode - 1), _row, code);
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

    if (idName == 'lugCopyFrom')
    {
        nwParameter_Add("idvallugVendor", code);
        func_ActionDriven("actCopyFrom", false);
    }


}


function defaultVAT(index)
{
   var sup = $("#idvallugVendor").val();
   var row = index;

   var VAT = nwGridCon_Book.ActiveSheet.GetText((SPR_VATTAXCODE - 1), row);
   var EWT = nwGridCon_Book.ActiveSheet.GetText((SPR_EWTCODE - 1), row);

   if (VAT == "" || EWT == "")
   {
       nwParameter_Add("row", row);
       nwParameter_Add("idvallugVendor", sup);
       func_ActionDriven("actdefaultVAT", false);
   }
}


function HasDataRemarks()
{
    var maxRow = nwGridCon_Book.ActiveSheet.GetMaxRow();
    
    setTimeout(function () {
        nwGridCon_Book.ActiveSheet.SetTemplate((SPR_REMARKS - 1), Spread_ALLROW, "remarks", "");
        nwGridCon_Book.ActiveSheet.SetText2((SPR_REMARKS - 1), Spread_ALLROW, "...");
        nwGridCon_Book.ActiveSheet.SetTextColor((SPR_REMARKS - 1), Spread_ALLROW, "#FFFFFF");
        nwGridCon_Book.ActiveSheet.SetBackground((SPR_REMARKS - 1), Spread_ALLROW, "#1130c7");

        for (var x = 1; x <= maxRow; x++) {
            var Remarks = nwGridCon_Book.ActiveSheet.GetText((SPR_TAGREMARKS - 1), x);

            if (Remarks == "1") {
                nwGridCon_Book.ActiveSheet.SetBackground((SPR_REMARKS - 1), x, "#006060");
            }
            else {
                nwGridCon_Book.ActiveSheet.SetBackground((SPR_REMARKS - 1), x, "#1130c7");
            }
        }
    }, 150);
}


$(document).on("click", "#btnCopyFrom", function (e) {

    if ($('#idvallugVendor').val() == '') {
        MessageBox("Cannot proceed. Please complete the header details.", 'Vendor Item Tax Assignment');
        return true;
    }

    cust_GetPara();
    lookUpCustomize("lugCopyFrom", 1);

    return false;
});



function lookupfilter() {
    filter = ""
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

    var x = $('#idvallugVendor').val();

    if (!($("#" + canvasID).enable())) {
        return false;
    }

    if (x == "") {
        MessageBox("Cannot proceed. Please complete the header details.", 'Vendor Item Tax Assignment');
        return false;
    }

    if (canvasID == "nwGridCon") {
        if (col == (SPR_REMARKS - 1)) {
            setTimeout(function () { $('#spreadRemarksCon .modal-hdr-title').text("Remarks"); }, 150);
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
        if (col == (SPR_ITEMGROUPTYPECODE - 1)) {
            var maxRow = nwGridCon_Book.ActiveSheet.GetMaxRow();
            var item = '';
            for (var x = 0; x <= maxRow; x++) {
                item += "|" + nwGridCon_Book.ActiveSheet.GetText((SPR_ITEMCODE - 1), x);
            }
            nwParameter_Add("txtItemCode", item);
            nwParameter_Add("txtItemGroupTypeCode", nwGridCon_Book.ActiveSheet.GetText((SPR_ITEMGROUPTYPECODE - 1), row));
            lookUpCustomize("lugItemGroupTypeCode", 2, undefined, true);
        }

        if (col == (SPR_ITEMCODE - 1)) {
            var maxRow = nwGridCon_Book.ActiveSheet.GetMaxRow();
            var item = '';
            for (var x = 0; x <= maxRow; x++) {
                item += "|" + nwGridCon_Book.ActiveSheet.GetText((SPR_ITEMCODE - 1), x);
            }
            nwParameter_Add("txtItemCode", item);
            nwParameter_Add("txtItemGroupTypeCode", nwGridCon_Book.ActiveSheet.GetText((SPR_ITEMGROUPTYPECODE - 1), row));
            lookUpCustomize("lugItemCode", 2, undefined, true);

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

