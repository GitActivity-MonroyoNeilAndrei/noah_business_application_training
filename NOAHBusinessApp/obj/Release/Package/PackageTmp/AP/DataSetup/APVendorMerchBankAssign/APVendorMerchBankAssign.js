/// <reference path="APVendorMerchBankAssign.js" />
var nwSupplierCode = "";
var nwIsReport;

var tradename = "";
var currentYear = "";
var currentDate = "";
var lookupFilter = "";
var isView = "";
var currTR
var baseTitle = "Vendor Merchant Bank Assignment";
var nwGridCon_Book;
var nwGridCon_Sheet;

var SPR_VENDORCODE = 1,
    SPR_VENDORTRADENAME = 2,
    SPR_VENDORREGNAME = 3,
    SPR_MERCHCODE = 4,
    SPR_MERCHNAME = 5,
    SPR_PRODCODE = 6,
    SPR_PRODNAME = 7,
    SPR_SUBSNO = 8,
    SPR_SUBSNAME = 9,
    SPR_ROWNO = 10;

var _row = 0;
var _col = 0;
var _canvasID;

$(document).on("click", "button", function () {
    return false;
});

function func_Reload() {
    crLnk = GetCurrentURL() + "APVendorMerchBankAssign_Gateway";
    crLnkGateKey = "APVendorMerchBankAssign";
    crnwTagSingleBind = true;
    LoadStringsCases();
    var isContinue = true;
    ToolBoxGetData = false;
    init_request();

    cust_GetPara();
    DisableFields();
    return isContinue;
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    func_Toolbox_Clear();
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", "Vendor Merchant Bank Assignment", "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", "Vendor Merchant Bank Assignment", "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;

    UponRefresh();

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

///////////////////// Bind tool
function cust_GetPara() {

    nwParameter_Add('idvallugBank', $('#idvallugBank').val());
    nwParameter_Add('Recdate', $('#nwtxt_RecDate').text());
    try {
        nwParameter_Add_DataSet("nwGridCon");
    } catch (e) { }
}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwParameter_Add("txtCode", $("#txtCode").val());
    $('#lugsup,#lugpayterms').enable(false);
    $('#txteffdate,#txtnoday').enable(false);
    nwLoading_Start("xSample", crLoadingHTML);
    func_ActionDriven("actBindCollection", false);

}

function func_ToolboxNavigatorBind_Empty() {
    clearfield();
    nwParameter_Add("TotalRecords", $('div.BN-record span').text());
    func_ActionDriven("actBindCollectionEmpty", false);
}

///////////////////////////////////////
var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    cust_GetPara();
    if (idName == 'lugTaxType') {

        var code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(0)").text();
        var desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(1)").text();

        crnwTR.find("td:eq(" + SPR_TAXTYPECODE + ")").text(code);
        crnwTR.find("td:eq(" + SPR_TAXTYPEDESC + ")").text(desc);

        nwGrid_AddRow("nwGridCon", 1);

    }
    if (idName == 'toolboxInquire') {
        //func_ActionDriven("actGenGrid", false);
    }
}

//function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {

//    var cnt = nwLib.nwTempTable_Row_Count(nwGridID);

//    if (nwGridID == 'nwGridCon') {

//        crnwTRtemp.find('td:eq(' + SPR_VENDORCODE + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text());
//        crnwTRtemp.find('td:eq(' + SPR_VENDORTRADENAME + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text());
//        crnwTRtemp.find('td:eq(' + SPR_VENDORREGNAME + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text());

//        //defaultVAT(index);


//        if (cnt == (crnwTR.index() + 1)) {
//            nwGrid_AddRow(nwGridID, 1);
//        }
//    }

//    return crnwTRtemp;
//}

	function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {											
		var cnt = nwGridCon_Book.ActiveSheet.GetMaxRow();

		if (nwGridID == 'nwGridCon') {
		    if (_col == (SPR_VENDORCODE - 1)) {
		        var Grid = nwGridCon_Book.ActiveSheet;
		        var collength = Grid.GetMaxCol();
		        var col = Grid.GetSelectedIndexes().col;
		        var row = Grid.GetSelectedIndexes().row;

		        var Code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();								
		        var trade = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
		        var reg = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
		    
		        var data = Grid.GetValue(SPR_VENDORCODE - 1, _row);
		        var hasValue = false;
		        if (index == 0 && data == "") {
		            for (coli = 0; coli < collength; coli++) {
		                if ((SPR_VENDORCODE - 1) == coli
                            || (SPR_VENDORTRADENAME - 1) == coli
                            || (SPR_VENDORREGNAME - 1) == coli) {
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
		            Grid.SetText((SPR_VENDORCODE - 1), _row, addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text());
		            Grid.SetText((SPR_VENDORTRADENAME - 1), _row, addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text());
		            Grid.SetText((SPR_VENDORREGNAME - 1), _row, addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text());
		        } else {
		            crnwTRtemp[SPR_VENDORCODE - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
		            crnwTRtemp[SPR_VENDORTRADENAME - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
		            crnwTRtemp[SPR_VENDORREGNAME - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
		        }

		    } else {
		        var Grid = nwGridCon_Book.ActiveSheet;
		        var collength = Grid.GetMaxCol();
		        var col = Grid.GetSelectedIndexes().col;
		        var row = Grid.GetSelectedIndexes().row;
		        var Code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();								
		        var trade = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
		        var reg = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
		     
		        var data = Grid.GetValue(SPR_VENDORCODE - 1, _row);
		        var hasValue = false;
		        if (index == 0 && data == "") {
		            for (coli = 0; coli < collength; coli++) {
		                if ((SPR_VENDORCODE - 1) == coli
                            || (SPR_VENDORTRADENAME - 1) == coli
                            || (SPR_VENDORREGNAME - 1) == coli) {
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
		            Grid.SetText((SPR_VENDORCODE - 1), _row, addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text());
		            Grid.SetText((SPR_VENDORTRADENAME - 1), _row, addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text());
		            Grid.SetText((SPR_VENDORREGNAME - 1), _row, addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text());
		        } else {
		            crnwTRtemp[SPR_VENDORCODE - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
		            crnwTRtemp[SPR_VENDORTRADENAME - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
		            crnwTRtemp[SPR_VENDORREGNAME - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
		        }
		    }

		    if (cnt == (_row + 1)) {
		        nwGrid_AddRow(nwGridID, 1);
		    }
		}

		return crnwTRtemp;
    }										


//function nwGrid_AddtoListDoneCustom(verID, addtoListTableRec, index) {
//    var value = "<option value='" + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + "'>" + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + " - " + addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text() + "</option>"

//    $('#cmb' + verID).append(value)
//}

function nwGrdi_Change(nwobj, nwobjrow, nwobjitem) {
    var ss = nwobjitem.find('#selecta').val();
}

//function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {

//    var nwobjID = nwobj.attr('id');

//    if (nwobjID == "nwGrid") {
//        if ((crnwTD.index() == SPR_PaytermDesc)) {
//            var rows = nwLib.nwTempTable_Row_Count("nwGridCon");
//            var codeList = "";
//            for (var x = 0; x <= rows; x++) {
//                codeList += nwLib.nwTempTable_RowData_Get("nwGridCon ", x, SPR_PaytermCode - 1) + '|';
//            }

//            cust_GetPara();
//            nwParameter_Add("codeList", codeList);
//            lookUpCustomize("lugpayterms", 1);

//        }
//    }

//}

function EnableFields() {
    $('#lugBank').enable(true)
    $('#nwGridCon').enable(true);
}



function DisableFields() {
    $('#lugBank').enable(false)
    $('#nwGridCon').enable(false);
}

function EnableFieldsDone() {//Binding Done
    $("#lugBank").enable(false);
    $("#idvallugBank").prop('disabled', true);
    $('#nwGridCon').enable(true);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
}

function DisableFieldsDone() { // For Refresh
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0') {
        DisableFields();

        $("#idvallugBank").val('');
        $("#descvallugBank").val('');

        $("#noah-webui-Toolbox").bindingNew().enable(true);
        $("#noah-webui-Toolbox").bindingDelete().visible(true);
        $("#noah-webui-Toolbox").bindingDelete().enable(false);
        $("#noah-webui-Toolbox").bindingExport().enable(false);
        $("#noah-webui-Toolbox").bindingInquire().enable(false);
        $("#noah-webui-Toolbox").bindingSave().enable(false);
    }
    else {
        EnableFieldsDone();
    }
}

function DisableFieldsEmpty() {
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingSave().enable(false);

    $(".history_switch").prop("disabled", true);
    $('#chkBox').prop('checked', true);
}

function ClearFields() {
    $("#lugBank input").val('');
}

function msgBoxContainerQuestionF(genID, answer) {
    if (genID == 1) {
        if (answer == "Yes") {

        }
        else {

        }
    }
    else if (genID == 2) {
        if (answer == "Yes") func_saveContinue();
    }

}




function func_LookUpInitialize(dimP) {
    nwParameter_Add("lookupFilter", lookupFilter);
    cust_GetPara();
}

function clearfield() {
    $("#txtcrdate").val("");
    $("#txteffdate").val("");
    $("#idvallugpayterms").val("");
    $("#descvallugpayterms").val("");
    $("#txtnoday").val("");


}
function UponRefresh() {
    $("#noah-webui-default-Inquire").enable(true);
    $("#noah-webui-default-Export").enable(true);
    $(".history_switch").prop("disabled", false);
    $('#chkBox').prop('checked', true);
}

function autoRefresh() {

    if (nwSupplierCode != "" && nwIsReport == 0) {
        nwLoading_Start('xSample', crLoadingHTML);
        nwParameter_Add('nwSupplierCode', nwSupplierCode);
        $('#noah-webui-default-Refresh').click();
        $("#noah-webui-Toolbox-BindingNavigator").hide();
        $("#noah-webui-default-New").hide();
        $('#noah-webui-default-Delete').hide();
        $("#noah-webui-default-Inquire").hide();
        $("#noah-webui-default-Save").show();
        $("#noah-webui-default-Save").enable(true);
        $('#noah-webui-default-Refresh').show();
        $("#noah-webui-default-Export").show();
        $("#noah-webui-default-Export").enable(true);

        $("#nwGridCon").enable(true);

        $(".history_switch").prop("disabled", false);
        $('#chkBox').prop('checked', true);
    }

    else if (nwSupplierCode != "" && nwIsReport == 1) {
        nwLoading_Start('xSample', crLoadingHTML);
        nwParameter_Add('nwSupplierCode', nwSupplierCode);
        $('#noah-webui-default-Refresh').click();
        $("#noah-webui-Toolbox-BindingNavigator").hide();
        $("#noah-webui-default-New").hide();
        $('#noah-webui-default-Delete').hide();
        $("#noah-webui-default-Inquire").hide();
        $("#noah-webui-default-Save").show();
        $("#noah-webui-default-Save").enable(false);
        $('#noah-webui-default-Refresh').show();
        $("#noah-webui-default-Refresh").enable(false);
        $("#noah-webui-default-Export").show();
        $("#noah-webui-default-Export").enable(false);
        $("#nwGridCon").enable(false);

        $(".history_switch").prop("disabled", false);
        $('#chkBox').prop('checked', true);
    }

    else {
        $("#nwGridCon").enable(false);
        $("#noah-webui-default-New").hide();
        $("#noah-webui-default-Save").hide();
        $('#noah-webui-default-Delete').hide();
        $("#noah-webui-Toolbox-BindingNavigator").show();
        $("#noah-webui-Toolbox-BindingNavigator").enable(true);
        $("#noah-webui-default-Inquire").enable(false);
        $("#noah-webui-default-Export").enable(false);

        $(".history_switch").prop("disabled", true);
        $('#chkBox').prop('checked', true);

    }

}




$(document).on("click", ".nwDelete", function () {
    if (nwIsReport == 1) return;

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day + "/" + d.getFullYear();
    var date = output


    var code = $('#nwGridCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_PaytermCode + ')').text();
    var effDate = $('#nwGridCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_Effective + ') input').val();

    if (code != "" && (Date.parse(effDate) < Date.parse(date))) {
        return;
    }

    if (nwSupplierCode != "") {
        if (code != "" || effDate != "") {
            msgBoxContainerQuestion = "nwDelete";
            parent_MessageBoxQuestion("Do you wish to remove current row?", BasedTitle, "");
        }
        else {
            MessageBox("No details found!", BasedTitle, "error");
        }
    }


});


function msgBoxContainerQuestionF(genID, answer) {

    if (genID == "nwDelete") {
        if (answer == "Yes") {
            $(".nwgrid_Delete").click();
            nwGrid_AddRow('nwGridCon', 1);
        }
    }

    else if (genID == "closing") {
        if (answer == "Yes") {
            isClose = true;
            parent.mainParent_Close_Form();
        }
    }
}

// disable grid for viewing
function disableforView() {
    var rows = nwLib.nwTempTable_Row_Count("nwGridCon");
    for (var x = 0; x <= rows; x++) {
        $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Effective + ") input").enable(false);
        $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Effective + ")").css("background-color", "gainsboro");
    }
}

//$(document).on('click', '.BoxClose', function (e) {
//    $('.lookupcolSearch').val("");
//});


//$(document).keyup(function (e) {
//    if (e.key === "Escape") {
//        $('.lookupcolSearch').val("");
//    }
//});



function p8Spread_DblClick(canvasID, row, col) {
    p8Spread_CurBook = canvasID
    _canvasID = canvasID;
    _row = row;
    _col = col;

    var BankCode = $("#idvallugBank").val();

    if (BankCode == "")
        return false;

    if (canvasID == "nwGridCon") {
        if (col == SPR_VENDORCODE - 1) {
            lookUpCustomize("lugVendor", 2, undefined, true)
        }
    }
    return true;
}

//function p8Spread_DblClick(canvasID, row, col) {
//    p8Spread_CurBook = canvasID
//    if (canvasID == "nwGridCon") {
//        if (col == SPR_VENDORCODE) {
//            lookUpCustomize("lugVendor", 2, "", true);
//        }
//    }
//    return true;
//}

function disableGridFields() {
    var recdate = new Date($("#nwtxt_RecDate").text());
    var serverdate = new Date();
    var recdatep = Date.parse((recdate.getMonth() + 1) + ' ' + recdate.getDate() + ' ' + recdate.getFullYear());
    var serverdatep = Date.parse((serverdate.getMonth() + 1) + ' ' + serverdate.getDate() + ' ' + serverdate.getFullYear());
    var maxRow = $('#nwGridCon .tblGridBody tr').length - 1;

    //if (recdatep < serverdatep) {

    //    $('.nwgrid_Insert').enable(false);
    //    $('.nwgrid_Delete').enable(false);
    //    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    //    $("#noah-webui-Toolbox").bindingSave().enable(false);

    //    for (var x = 0; x <= maxRow; x++) {
    //        for (var y = 1; y <= SPR_SUBSNAME; y++) {
    //            $('#nwGridCon .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + y + ')').enable(false);
    //        }
    //    }
    //}
    //else
    //{
    //    for (var x = 0; x < maxRow; x++)
    //    {
    //            $('#nwGridCon .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_VENDORCODE + ')').enable(false);
    //    }
    //}
}

$(document).on('click', '#nwGridCon', function () {

    var x = $('#idvallugBank').val();

    if (x == "") {
        MessageBox("Cannot proceed. Please complete the header details.", baseTitle, "error");
        return;
    }
});

$(document).on("input", ".txtMerchCode", function (e) {
    var maxLength = 3;
    var $this = $(this);
    setTimeout(function () {
        if ($this.val().length > maxLength) {
            $this.val($this.val().substring(0, maxLength));
        }
    }, 0);
});

$(document).on("input", ".txtMerchDesc", function (e) {
    var maxLength = 80;
    var $this = $(this);
    setTimeout(function () {
        if ($this.val().length > maxLength) {
            $this.val($this.val().substring(0, maxLength));
        }
    }, 0);
});

$(document).on("input", ".txtProdCode", function (e) {
    var maxLength = 4;
    var $this = $(this);
    setTimeout(function () {
        if ($this.val().length > maxLength) {
            $this.val($this.val().substring(0, maxLength));
        }
    }, 0);
});

$(document).on("input", ".txtProdDesc", function (e) {
    var maxLength = 80;
    var $this = $(this);
    setTimeout(function () {
        if ($this.val().length > maxLength) {
            $this.val($this.val().substring(0, maxLength));
        }
    }, 0);
});

$(document).on("input", ".txtSubsNo", function (e) {
    var maxLength = 30;
    var $this = $(this);
    setTimeout(function () {
        if ($this.val().length > maxLength) {
            $this.val($this.val().substring(0, maxLength));
        }
    }, 0);
});

$(document).on("input", ".txtSubsDesc", function (e) {
    var maxLength = 80;
    var $this = $(this);
    setTimeout(function () {
        if ($this.val().length > maxLength) {
            $this.val($this.val().substring(0, maxLength));
        }
    }, 0);
});