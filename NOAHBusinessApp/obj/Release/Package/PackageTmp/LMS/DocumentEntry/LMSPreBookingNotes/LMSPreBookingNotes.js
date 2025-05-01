var basedTitle = "";
var trantype = 'LODDOC'; //Get Trantype

var nwGridCon_Book;
var nwGridCon_Sheet;

var nwGridCon1_Book;
var nwGridCon1_Sheet;

var _row;
var _col;
var _canvasID;

var jsonPerDates = [];
var jsonPerDatesClosing = [];

var _jsonnwGridCon = [];

var startindex = 0,
    SPR_Completed = ++startindex,
    SPR_Notes = ++startindex,
    SPR_NotesButton = ++startindex,
    SPR_RaisedByCode = ++startindex,
    SPR_RaisedByDesc = ++startindex,
    SPR_DateRaised = ++startindex,
    SPR_ModifiedByCode = ++startindex,
    SPR_ModifiedByDesc = ++startindex,
    SPR_DateModified = ++startindex,
    SPR_CompletedByCode = ++startindex,
    SPR_CompletedByDesc = ++startindex,
    SPR_DateCompleted = ++startindex,
    SPR_RaisedByModified = ++startindex,
    SPR_Rowno = ++startindex,
    SPR_Docno = ++startindex;

var startindex_DD = 0,
                         SPR_DocumentCode_DD = ++startindex_DD,
                         SPR_DocumentDesc_DD = ++startindex_DD,
                         SPR_Disabled_DD = ++startindex_DD;

var nwDocno = "";
var isView = "";
var RDisView = "";

function func_Reload() {
    crLnk = GetCurrentURL() + "LMSPreBookingNotes_Gateway";
    crLnkGateKey = "LMSPreBookingNotes";

    DisableFields();
    //nwPopupForm_Create("ProcessForm", true);
    setTimeout(function () {
        try {
            $('.noresize').resizable('destroy');
        } catch (ex) { }
    }, 100);

    nwPopupForm_Create("docattview", true);
    nwPopupForm_Create("nwDisappDtls", false);

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    return isContinue;
}

function Loaded() {
    nwDocno = getParameterByName('nwDocno');
    isView = getParameterByName('isView');
    RDisView = getParameterByName('RDisView');
    isView = isView.toLowerCase() == "true" ? (RDisView.toLowerCase() == "true" ? true : false) : false;

    if (!isNull(nwDocno)) {
        nwLoading_Start("xLoading1", crLoadingHTML, "xLoading1");
        $(".xLoading1").show();
        if (isView) {
            $("#noah-webui-Toolbox").hide();
        }
        $('#noah-webui-default-Refresh').click();
    }
}

function LoadedDone() {
    if (isView) {
        DisableFields();
        $('#nwGridCon').enable(true);
        //$('#nwGridCon').enable(true);
        //$("#nwGridCon input").enable(false);
        //$("#nwGridCon td").css("background-color", "gainsboro");
        //$('#nwGridCon .nwgrid_Insert').enable(false);
        //$('#nwGridCon .nwgrid_Delete').enable(false);
        //$('#nwGridCon').find("td").enable(false);
        //$('#nwGridCon').find("button").parents("td").enable(true);
        //$('#nwGridCon').find("a").parents("td").enable(true);
        //$('#nwGridCon .nwgrid_SearchNext').enable(true);

        $('#nwGridCon1').enable(true);
        //$("#nwGridCon1 input").enable(false);
        //$("#nwGridCon1 td").css("background-color", "gainsboro");
        //$('#nwGridCon1 .nwgrid_Insert').enable(false);
        //$('#nwGridCon1 .nwgrid_Delete').enable(false);
        //$('#nwGridCon1').find("td").enable(false);
        //$('#nwGridCon1').find("button").parents("td").enable(true);
        //$('#nwGridCon1').find("a").parents("td").enable(true);
        //$('#nwGridCon1 .nwgrid_SearchNext').enable(true);

    }
    clearInterval(refreshIntervalId);
    nwLoading_End('xLoading1');
}

var refreshIntervalId = setInterval(function () {
    if (!isNull(nwDocno)) {
        $(".nwLoading:not(.xLoading1)").hide();
    }
}, 180);

////////////////////////// Tool Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    ClearFields();
    func_Toolbox_Clear();
    DisableFields();
    EnableFields();
    cust_GetPara()

    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    //save before change
    Cuz_SaveGrid();
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", basedTitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", basedTitle, "", indef, enume);
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

//function func_ToolboxProcess(indef, enume) {
//    var isContinue = true;
//    cust_GetPara();
//    nwLoading_Start("xLoading", crLoadingHTML);
//    nwPopupForm_ShowModal("ProcessForm");
//    //parent_MessageBoxQuestionToolBox("Do you want to process the current record?", basedTitle, "", indef, enume);
//    return isContinue;
//}
function func_ToolboxProcess(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    isContinue = false;
    parent_MessageBoxQuestionToolBox("Do you want to process the current record?", basedTitle, "", indef, enume);
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
    cust_GetPara();
    nwLoading_Start(`xLoading`, crLoadingHTML);
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
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("isView", isView);
    nwParameter_Add("txtContractStatus", $('#txtContractStatus').val());
    nwParameter_Add("txtWorkflowStatus", $('#txtWorkflowStatus').val());
    nwParameter_Add("txtStartDateTime", $('#txtStartDateTime').val());
    nwParameter_Add("idvallugOperatingUnit", $('#idvallugOperatingUnit').val());
    nwParameter_Add("txtContractRefNo", $('#txtContractRefNo').val());
    nwParameter_Add("idvallugLoanOriginationNo", $('#idvallugLoanOriginationNo').val());
    nwParameter_Add("idvallugBorrower", $('#idvallugBorrower').val());
    nwParameter_Add("idvallugDealerBroker", $('#idvallugDealerBroker').val());
    nwParameter_Add("idvallugSalesperson", $('#idvallugSalesperson').val());
    nwParameter_Add("idvallugProduct", $('#idvallugProduct').val());
    nwParameter_Add("idvallugAssetType", $('#idvallugAssetType').val());
    nwParameter_Add("txtContractNo", $('#txtContractNo').val());
    nwParameter_Add("txtDocDate", $('#txtDocDate').val());
    nwParameter_Add("txtDateReviewed", $('#txtDateReviewed').val());
    nwParameter_Add("txtActualBookingDate", $('#txtActualBookingDate').val());
    nwParameter_Add("txtDocStatus", $('#txtDocStatus').val());
    nwParameter_Add("jsonnwGridCon", JSON.stringify(_jsonnwGridCon));
    nwParameter_Add_Table("nwGridCon", true);
}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    nwLoading_Start("xLoading", crLoadingHTML);
    RefreshData();
    cust_GetPara();
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("xLoading", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollectionEmpty", false);
}
///////////////////////////////////////
var temp_crnwTR = "";


function Lookup_DoneFunction(idName, idNum, ifBlankVal) {
    //if (_LookupReturn) {
    //    _LookupReturn = false;
    //    return false;
    //}
    if (idName == 'toolboxInquire') {
    }
    //else if (idName == 'lugCustomer') {
    //    var startindexlookup = -1;
    //    $("#idvallugCustomerSubType").val(getGridData(idNum, ++startindexlookup));
    //    $("#descvallugCustomerSubType").val(getGridData(idNum, ++startindexlookup));
    //    $("#idvallugBrand").val(getGridData(idNum, ++startindexlookup));
    //    $("#descvallugBrand").val(getGridData(idNum, ++startindexlookup));
    //    $("#idvallugBranch").val(getGridData(idNum, ++startindexlookup));
    //    $("#descvallugBranch").val(getGridData(idNum, ++startindexlookup));
    //    $("#idvallugBranchClass").val(getGridData(idNum, ++startindexlookup));
    //    $("#descvallugBranchClass").val(getGridData(idNum, ++startindexlookup));
    //}
    //else if (idName == 'lugDocumentLocation') {
    //    nwParameter_Add("idvallugDocumentLocation", $('#idvallugDocumentLocation').val());

    //    func_ActionDriven("actLoadDocumentLocation", false);
    //    //var startindexlookup = -1;
    //    //$("#idvallugDocumentLocation").val(getGridData(idNum, ++startindexlookup));
    //    //$("#descvallugDocumentLocation").val(getGridData(idNum, ++startindexlookup));
    //    //$("#idvallugDocumentAddress").val(getGridData(idNum, ++startindexlookup));
    //    //$("#descvallugDocumentAddress").val(getGridData(idNum, ++startindexlookup));
    //    //$("#txtBay").val(getGridData(idNum, ++startindexlookup));
    //    //$("#txtRack").val(getGridData(idNum, ++startindexlookup));
    //    //$("#txtLayer").val(getGridData(idNum, ++startindexlookup));
    //    //$("#txtBinbox").val(getGridData(idNum, ++startindexlookup));
        
    //}
    //else if (idName == 'lugRefFilingEntryNo') {

    //    nwParameter_Add("idvallugRefFilingEntryNo", $('#idvallugRefFilingEntryNo').val());

    //    func_ActionDriven("actLoadRefFilingEntryNo", false);
    //}
    //else if (idName == 'lugReason') {
    //    var startindexlookup = -1;
    //    crnwTR.find("td:eq(" + SPR_Reason + ")").text(getGridData(idNum, (++startindexlookup)));
    //    crnwTR.find("td:eq(" + SPR_ReasonDesc + ")").text(getGridData(idNum, (++startindexlookup)));
    //}
}

function getGridData(idnum, index) {
    var data = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idnum - 1) + ") td:eq(" + index + ") span").text();
    return data;
}

function isNull(id) {
    if (id == '' || id == null || id == undefined || typeof id == 'undefined' || typeof variable == 'object') {
        return true;
    }
    else {
        return false;
    }
}

function EnableFields() {
    $('.enbtxtNew').enable(true);
    $('.enbtxtNew').removeClass("noah-webui-disabled");
}

function DisableFields() {
    $('.enbtxtNew').enable(false);
    $('.enbtxtRefresh').enable(false);
    $('#nwGridCon').enable(false);
    $('#nwGridCon1').enable(false);
    //$("#btnReqCompliance").enable(false);
    //$("#btnLoadData").enable(false);
}


function EnableFieldsDone() {  //-- For Binding Done  
    $('.enbtxtRefresh').enable(true);
    $('.enbtxtRefresh').removeClass("noah-webui-disabled");

    //$("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingPrint().enable(true);
}

function DisableFieldsEmpty() {
    DisableFields();
    $('#nwGridCon').enable(false);
    $('#nwGridCon1').enable(false);
    //$("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
	$("#noah-webui-Toolbox").bindingDelete().enable(false);
	$("#noah-webui-Toolbox").bindingProcess().enable(false);
	$("#noah-webui-Toolbox").bindingInquire().enable(false);
	$("#noah-webui-Toolbox").bindingPrint().enable(false);
}

function ClearFields() {
    $('.clrtxt').val('');
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}


function func_LookUpInitialize(dimP) {
    cust_GetPara();
    if (dimP == "lugDocCode") {
        codelist("nwGridCon", SPR_DocumentCode_DD, "codelist"); //changed from nwGridDDCon
       // nwParameter_Add("idvallugLocation", $('#idvallugLocation').val());
    }
    //else if (dimP == "lugItemCode") {
    //    try { nwParameter_Add("ItemGroupType", nwGridCon_Book.ActiveSheet.GetText(SPR_ItemGroupTypeCode - 1, _row)); } catch (ex) { }
    //}
}

function codelist(Grid, row, param) {
    var list = "";
    var rows = nwTempTable_Row_Count(Grid);
    for (var i = 0; i <= rows; i++) {
        list += nwLib.nwTempTable_RowData_Get(Grid, i, row - 1) + '|';
    }
    nwParameter_Add(param, list);
}


function CreateGridDone() {
    setTimeout(function () {
        $('#nwGridCon1').enable();
        $("#nwGridData .gvHeaderStyle").find("th:eq(" + SPR_Notes + ")").text("");
        $("#nwGridData .gvHeaderStyle").find("th:eq(" + SPR_NotesButton + ")").text("");
        $("#nwGridData .gvHeaderStyle").hide();


            var x = nwLib.nwTempTable_Row_Count("nwGridCon1");
            for (var i = 0; i < x; i++) {
                Cuz_nwGrid_CompletedEnabled(i);
                Cuz_nwGrid_NotesButton(i);
            }
            //for (var i = 0; i < x; i++) {
            //    $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_Notes + ')').enable(false);
            //    //var z = $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_Completed + ')').text() || "";
            //    //if (z != "") {
            //    //    $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_Completed + ')').enable(true);

            //    //    //Filing_nwGrid_Reason(i);
            //    //    //Filing_nwGrid_Remarks(i);
            //    //    //Filing_nwGrid_ViewAttachment(i);

            //    //} else{
            //    //    $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_Completed + ')').enable(false);
            //    //}
            //}
   
            Cuz_nwGrid_CompletedAll();

            if (isView) {

                $('#nwGridCon1').enable(true);
                $("#nwGridCon1 input").enable(false);
                $("#nwGridCon1 td").css("background-color", "gainsboro");
                $('#nwGridCon1 .nwgrid_Insert').enable(false);
                $('#nwGridCon1 .nwgrid_Delete').enable(false);
                $('#nwGridCon1').find("td").enable(false);
                $('#nwGridCon1').find("button").parents("td").enable(true);
                $('#nwGridCon1').find("a").parents("td").enable(true);
                $('#nwGridCon1 .nwgrid_SearchNext').enable(true);

                var Document = $("#idvallugDocument").val();
                if (isNull(Document)) {
                    $('#nwGridCon1').find("button").parents("td").enable(false);
                } 
            }

    }, 100);
}


function CreateGridDDDone() {
    setTimeout(function () {
        var x = nwLib.nwTempTable_Row_Count("nwGridCon"); //changed from nwGridDDCon
        for (var i = 0; i < x; i++) {
            var doccode = $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_DocumentCode_DD + ')').text() || "";
            if (!isNull(doccode)) {
                var disabled = $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_Disabled_DD + ')').text() || "";
                if (disabled == "1") {
                    $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_DocumentCode_DD + ')').enable(false);
                } else {
                    $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_DocumentCode_DD + ')').enable(true);
                }
            }
        }
        //Cuz_nwGrid_CompletedAll();
    }, 100);
}



function checkrequiredfields() {
    var isComplete = true;
    //if ($('#idvallugDocumentLocation').val() == "") { isComplete = false }
    //else if ($('#idvallugRefFilingEntryNo').val() == "") { isComplete = false }
    //if (!isComplete) {
    //    isfocus = true;
    //    MessageBox("Cannot proceed. Please complete the header details.", basedTitle, "error");
    //}
    return isComplete;
  
}

function nwGrid_Click(nwobj, nwobjrow, nwobjitem) {
    var nwobjID = nwobj;
    var nwobjTR = crnwTR.index();
    var nwobjTD = crnwTD.index();

    if (nwobjID == "nwGridDD") {
        if (!checkrequiredfields()) {
            return false;
        }
        if (nwobjTD == SPR_DocumentCode_DD || nwobjTD == SPR_DocumentDesc_DD) {
            var DocumentCode = $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_DocumentCode_DD + ')').text();
            var DocumentDesc = $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_DocumentDesc_DD + ')').text();
           //if (!isNull(DocumentCode)) {
               //save before change
               if (!isView) {
                   Cuz_SaveGrid();
               }
               $("#idvallugDocument").val(DocumentCode)
               $("#descvallugDocument").val(DocumentDesc)
               Cuz_CreateGrid();
            //}
            if (isNull(DocumentCode) || isView) {
                $('#nwGridCon').enable(false);
            }
        }
        if (!isView) {
            Cuz_nwGridDD_EnableDeleteRow(nwobjTR);
        }
    } else if (nwobjID == "nwGrid") {
        if (!checkrequiredfields()) {
            return false;
        }
        if (nwobjTD == SPR_NotesButton) {
            Cuz_nwGrid_NotesButtonEnabled(nwobjTR);
        }
        if (!isView) {
            Cuz_nwGrid_EnableDeleteRow(nwobjTR);
        }
    }


    return true;
}
function Cuz_nwGridDD_EnableDeleteRow(nwobjTR) {
    var disabled = $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_Disabled_DD + ')').text() || "";
    if (disabled == "1") {
        $("#nwGridCon").find(".nwgrid_Delete").enable(false);
    } else {
        $("#nwGridCon").find(".nwgrid_Delete").enable(true);
    }
}
function Cuz_nwGrid_EnableDeleteRow(nwobjTR) {
    var docno = $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_Docno + ')').text() || "";
    var notes = $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_Notes + ')').text() || "";
    if (!isNull(docno) || !isNull(notes)) {
        $("#nwGridCon").find(".nwgrid_Delete").enable(false);
    } else {
        $("#nwGridCon").find(".nwgrid_Delete").enable(true);
    }
}


function nwGrid_Change(nwobj, nwobjrow, nwobjitem) {
    var nwobjID = nwobj.attr('id');
    var nwobjTR = crnwTR.index();
    var nwobjTD = crnwTD.index();

    if (nwobjID == "nwGrid") {
        if (!checkrequiredfields()) {
            return false;
        }
        if (nwobjTD == SPR_Completed) {
            Cuz_nwGrid_Completed(nwobjTR);
            Cuz_nwGrid_CompletedAll(nwobjTR);
        }
    }
    return true;
}


function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {
    var nwobjID = nwobj.attr('id');
    var nwobjTR = crnwTR.index();
    var nwobjTD = crnwTD.index();

    if (nwobjID == "nwGridDD") {
        if (!checkrequiredfields()) {
            return false;
        }
        if (nwobjTD == SPR_DocumentCode_DD) {
            lookUpCustomize("lugDocCode", 2);
        }

    }
}


function GetNum(val) {
    try {
        val = parseFloat((val).replace(/,/g, "")) || 0;
    } catch (ex) { }
    return val;
}


function SetNum(val, decimal) {
    val = GetNum(val);
    decimal = decimal || 0;

    val = nwc(toFixed(val.toFixed(decimal))).substring(0, 33);
    if (decimal != 0) {
        val = val.includes(".") ? val : val + "." + val.repeat(decimal);
    }
    return val;
}

function nwc(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
function toFixed(x) {
    if (Math.abs(x) < 1.0) {
        var e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10, e - 1);
            x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
        }
    } else {
        var e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10, e);
            x += (new Array(e + 1)).join('0');
        }
    }
    return x;
}


function func_WindowCloseTrigger(verID) {
    let isContinue = true;

    //if (verID == "nwPopUpRequireCompliance") {
    //    nwLoading_Start("actHasRqrdCompli", crLoadingHTML);
    //    nwParameter_Add("txtContractNo", $('#txtContractNo').val());
    //    func_ActionDriven('actHasRqrdCompli', false);
    //}

    if (verID == "spreadRemarksCon") {
        var x = nwGridCon1_Book.ActiveSheet.GetSelectedIndexes.row;
        nwGridCon1_Book.ActiveSheet.SetText2(SPR_NotesButton - 1, x, "...");
        nwGridCon1_Book.ActiveSheet.SetTextAlign(SPR_NotesButton - 1, x, "center");
        nwGridCon1_Book.ActiveSheet.SetBold(SPR_NotesButton - 1, x, "bold");
        nwGridCon1_Book.ActiveSheet.SetTextColor(SPR_NotesButton - 1, x, "white");
    }


    return isContinue;
}

function func_nwGrid_InsertDone(spreadID, xrow, xcol) {
    let isContinue = true;

    nwGridCon1_Book.ActiveSheet.SetText2(SPR_NotesButton - 1, xrow, "...");
    nwGridCon1_Book.ActiveSheet.SetTextAlign(SPR_NotesButton - 1, xrow, "center");
    nwGridCon1_Book.ActiveSheet.SetBold(SPR_NotesButton - 1, xrow, "bold");
    nwGridCon1_Book.ActiveSheet.SetTextColor(SPR_NotesButton - 1, xrow, "white");
    nwGridCon1_Book.ActiveSheet.SetBackground(SPR_NotesButton - 1, xrow, "blue");

    return isContinue;
}


$(window).resize(function () {
    var width = $(".nwGrid").width();

    if (window.innerWidth <= 600) {
        width -= 30;
    } else {
        width -= 40;
    }
    $(".nwGrid.AutoLayout .tblGridBody tr").css("width", width + "px");
    $(".nwGrid.AutoLayout .tblGridBody tr").css("min-width", width + "px");
    $(".nwGrid.AutoLayout .tblGridBody tr").css("max-width", width + "px");
});




var _isOpen = true;
$(document).on('click', '#btnCollapseAll', function () {
    CollapseAll(_isOpen);
    CheckOpenAll();
    return false;
});



function CollapseAll(isCollapsed) {
    //$('[name="tabs"]').prop('checked', isCollapsed ? false : true);

    if (isCollapsed) {
        $('.nk-accordion .nk-ul .nk-li').removeClass("collapse");
    }
    else {
        $('.nk-accordion .nk-ul .nk-li').addClass("collapse");
    }
}



$(document).on('click', '.classHeader', function () {
    setTimeout(function () {
        CheckOpenAll();
    }, 100);
});
function CheckOpenAll() {
    var isOpen = 0;
    var isClose = 0;

    $('.nk-accordion .nk-ul .nk-li').each(function () {
        var val = $(this).hasClass("collapse");
        if (val) {
            isOpen += 1;
        } else {
            isClose += 1;
        }
    });

    var ExpandAll = false;
    if (isOpen == 0) {
        ExpandAll = false;
    }

    if (isClose == 0) {
        ExpandAll = true;
    }

    if (isOpen == 0 || isClose == 0) {
        $('#btnCollapseAll').html(ExpandAll ? "Collapse All" : "Expand All");
        _isOpen = ExpandAll ? true : false;
    }
}

function Cuz_nwGrid_Completed(nwobjTR) {
    var Completed = $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_Completed + ') input').prop("checked");
    if (Completed) {
        var Recuser = $("#txtCuzRecuser").val();
        var RecuserName = $("#txtCuzRecuserName").val();
        var DateTime = Cuz_DateTimeNow();
        $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_CompletedByCode + ')').text(Recuser);
        $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_CompletedByDesc + ')').text(RecuserName);
        $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_DateCompleted + ')').text(DateTime);
    } else {
        $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_CompletedByCode + ')').text("");
        $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_CompletedByDesc + ')').text("");
        $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_DateCompleted + ')').text("");
    }
}


function Cuz_nwGrid_CompletedAll() {
    var isCheckedAll = true;
    //var TotalDocumentsConfirmed = 0;
    //var hasdata = false;
    $("#nwGridCon .tblGridBody tbody").find("tr").each(function (i, item) {
        //var DocumentCode = $(this).find('td:eq(' + SPR_DocumentCode + ')').text() || "";
        //if (DocumentCode != "") {
           // hasdata = true;
            // console.log($(this))
            var Completed = $(this).find('td:eq(' + SPR_Completed + ') input').prop("checked");
            // console.log(Completed)
            if (!Completed) {
                isCheckedAll = false;
                // return;
            }
            //else {
            //    TotalDocumentsConfirmed += 1;
            //}
        //}
    });
    //if (!hasdata) {
    //    //TotalDocumentsConfirmed = "";
    //    isCheckedAll = false;
    //}
    $("#nwGridCon .tblGridHeader thead tr").find('th:eq(' + SPR_Completed + ') input').prop("checked", isCheckedAll);
    //$("#txtTotalDocumentsConfirmed").val(TotalDocumentsConfirmed);
}


function Cuz_DateTimeNow() {
    var currentDate = new Date();
    currentDate = $('#txtServerDate').val();
    var formattedDate = currentDate.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        //second: '2-digit',
        hour12: true, // For 12-hour format
        formatMatcher: 'basic' // Remove the comma
    }).replace(',', ''); // Replace the comma with an empty string
    return formattedDate;
}

function Cuz_nwGrid_NotesButton(nwobjTR) {
    nwGridCon1_Book.ActiveSheet.SetText2(SPR_NotesButton - 1, xrow, "...");
    nwGridCon1_Book.ActiveSheet.SetTextAlign(SPR_NotesButton - 1, xrow, "center");
    nwGridCon1_Book.ActiveSheet.SetBold(SPR_NotesButton - 1, xrow, "bold");
    nwGridCon1_Book.ActiveSheet.SetTextColor(SPR_NotesButton - 1, xrow, "white");
    nwGridCon1_Book.ActiveSheet.SetBackground(SPR_NotesButton - 1, xrow, "blue");
}

function Cuz_nwGrid_Notes(nwobjTR) {
    //var Notes = $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_NotesButton + ') textarea').val() || "";
    var Notes = nwGridCon1_Book.ActiveSheet.GetText(SPR_NotesButton - 1, nwobjTR);
    //$('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_Notes + ')').text(Notes);
    nwGridCon1_Book.ActiveSheet.SetText(SPR_Notes - 1, nwobjTR, Notes);
}
function Cuz_nwGrid_NotesToNotesButton(nwobjTR) {
    //var Notes = $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_Notes + ')').text() || ""; //old spread
    var Notes = nwGridCon1_Book.ActiveSheet.GetText(SPR_Notes - 1, nwobjTR);
    nwGridCon1_Book.ActiveSheet.SetText(SPR_NotesButton - 1, nwobjTR, Notes);
    //$('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_NotesButton + ') textarea').val(Notes) //old spread
}
function Cuz_nwGrid_CompletedEnabled(nwobjTR) {
    //var Notes = $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_NotesButton + ') textarea').val() || ""; //old spread
    var Notes = nwGridCon1_Book.ActiveSheet.GetText(SPR_NotesButton - 1, nwobjTR);
    var Docno = nwGridCon1_Book.ActiveSheet.GetText(SPR_Docno - 1, nwobjTR);
    //var Docno = $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_Docno + ')').text() || "";



    if (!isNull(Notes) && !isNull(Docno)) {
        //$('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_Completed + ')').enable(false); //old spread
        nwGridCon1_Book.ActiveSheet.SetEnable(SPR_Completed - 1, nwobjTR, false);
    } else if (isNull(Notes)) {
        //$('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_Completed + ')').enable(false); //old spread
        nwGridCon1_Book.ActiveSheet.SetEnable(SPR_Completed - 1, nwobjTR, false);
    } else {
        //$('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_Completed + ')').enable(true); //old spread
        nwGridCon1_Book.ActiveSheet.SetEnable(SPR_Completed - 1, nwobjTR, true);

    }

    //var isComplete =  $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_Completed + ') input').is(':checked');
    var isComplete = nwGridCon1_Book.ActiveSheet.GetText(SPR_Completed - 1, nwobjTR) == "1" ? true : false;
    if (!isNull(Docno) && isComplete) {
        //$('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_Completed + ')').enable(false);
        nwGridCon1_Book.ActiveSheet.SetEnable(SPR_Completed - 1, nwobjTR, false);
        //$('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_NotesButton + ') button').enable(false);
        nwGridCon1_Book.ActiveSheet.SetEnable(SPR_NotesButton - 1, nwobjTR, false);
    }
}

function Cuz_nwGrid_NotesButtonEnabled(nwobjTR) {
    var Notes = $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_NotesButton + ') textarea').val() || "";
    var Docno = $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_Docno + ')').text() || "";
    if ((!isNull(Notes) && !isNull(Docno)) || isView) {
        //$('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_NotesButton + ') textarea').enable(false);
        $("#nwgRemarksCon").find("button,input,textarea").enable(false)
    } else {
        //$('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_NotesButton + ') textarea').enable(true);
        $("#nwgRemarksCon").find("button,input,textarea").enable(true)
    }
}


//function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
//    var cnt = nwLib.nwTempTable_Row_Count(nwGridID);
//    if (nwGridID == "nwGridDD") {
//        var startindexlist = 0;
//        var code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(' + (++startindexlist) + ')').text();
//        var description = addtoListTableRec.find('tr:eq(' + index + ') td:eq(' + (++startindexlist) + ')').text();
//        var isValid = false;
//        if (isValid == false) {

//            crnwTRtemp.find('td:eq(' + SPR_DocumentCode_DD + ')').text(code);
//            crnwTRtemp.find('td:eq(' + SPR_DocumentDesc_DD + ')').text(description);

//            if (cnt == (crnwTR.index() + 1))
//                nwGrid_AddRow(nwGridID, 1);
//        }
//        else {
//            crnwTRtemp = null;
//        }

//    }

//    return crnwTRtemp;

//}

//for conversion of old spread to new spread
function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
    var cnt = nwGridCon_Book.ActiveSheet.GetMaxRow();

    if (nwGridID == 'nwGridCon') {
        if (_col == (SPR_DocumentCode_DD - 1)) {
            var Grid = nwGridCon_Book.ActiveSheet;
            var collength = Grid.GetMaxCol();
            var col = Grid.GetSelectedIndexes().col;
            var row = Grid.GetSelectedIndexes().row;
            var code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
            var desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
            var data = Grid.GetValue(SPR_DocumentCode_DD - 1, _row);
            var hasValue = false;
            if (data == "") {
                for (coli = 0; coli < collength; coli++) {
                    if ((SPR_DocumentCode_DD - 1) == coli
                        || (SPR_DocumentDesc_DD - 1) == coli) {
                        continue;
                    }
                    var value = Grid.GetValue(coli, _row);
                    if (value != "") {
                        hasValue = true;
                        break;
                    }
                }
            }
            if (!hasValue) {
                crnwTRtemp = null;
                Grid.SetText((SPR_DocumentCode_DD - 1), _row, addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text());
                Grid.SetText((SPR_DocumentDesc_DD - 1), _row, addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text());
            } else {
                crnwTRtemp[SPR_DocumentCode_DD - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
                crnwTRtemp[SPR_DocumentDesc_DD - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
            }
        }
    }

    return crnwTRtemp;
}


function nwGrid_AddtoListLoaded(nwGridID) {
    //if (nwGridID.attr('id') == "nwGrid") {
    //    var cnt = nwLib.nwTempTable_Row_Count("nwGridCon");
    //    for (var row = 0; row <= cnt; row++) {
    //        ComputationLin(row);
    //    }
    //}
}

function Cuz_CreateGrid() {
    DeleteGridData("nwGridCon")
    //ClearGridData("nwGridCon")
    $("#nwGridCon").enable(true);
    var hasdata = false;

    var contractno = $("#txtContractNo").val();
    var doccode = $("#idvallugDocument").val();

    var json = nwJson(_jsonnwGridCon, "contractno", contractno, false);
    json = nwJson(json, "doccode", doccode, false);
    try {
        var len = json.length;
        if (len > 0) {
            hasdata = true;
            var minrow = len < 5 ? 5 : len + 1;
            nwGrid_AddRow("nwGridCon", minrow);
        }
    } catch (ex) { }
    var maxrowno = 0;
    $.each(json, function (i, item) {
        var completed = item.completed;
        var notes = item.notes;
        var notesbutton = item.notesbutton;
        var raisedby = item.raisedby;
        var raisedbydesc = item.raisedbydesc;
        var raiseddate = item.raiseddate;
        var modifiedby = item.modifiedby;
        var modifiedbydesc = item.modifiedbydesc;
        var modifieddate = item.modifieddate;
        var completedby = item.completedby;
        var completedbydesc = item.completedbydesc;
        var completeddate = item.completeddate;
        var raisedbymodified = item.raisedbymodified;
        var rowno = parseInt(item.rowno) || 0;
        var docno = item.docno;
        $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_Completed + ') input').prop("checked", completed);
        $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_Notes + ')').text(notes);
        $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_NotesButton + ') textarea').val(notesbutton);
        $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_RaisedByCode + ')').text(raisedby);
        $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_RaisedByDesc + ')').text(raisedbydesc);
        $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_DateRaised + ')').text(raiseddate);
        $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_ModifiedByCode + ')').text(modifiedby);
        $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_ModifiedByDesc + ')').text(modifiedbydesc);
        $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_DateModified + ')').text(modifieddate);
        $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_CompletedByCode + ')').text(completedby);
        $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_CompletedByDesc + ')').text(completedbydesc);
        $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_DateCompleted + ')').text(completeddate);
        $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_RaisedByModified + ')').text(raisedbymodified);
        $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_Rowno + ')').text(rowno);
        $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_Docno + ')').text(docno);
        if (maxrowno < rowno) {
            maxrowno = rowno;
        }
    });
    maxrowno += 1;
    $(`#txtMaxRowno`).val(maxrowno);

    if (!hasdata) {
        nwGrid_AddRow("nwGridCon", 5)
    }

    
    CreateGridDone();
}

function DeleteGridData(Grid) {
    var x = nwLib.nwTempTable_Row_Count(Grid);
    for (var i = (x - 1) ; i >= 0; i--) {
        nwTempTable_Row_Delete(Grid, i);
    }

}


function Cuz_SaveGrid() {
    var contractno = $("#txtContractNo").val();
    var doccode = $("#idvallugDocument").val();

    //delete existing data in json
    try {
        var p8forw_key = "contractno"
        var p8forw_columnkey = contractno
        var p8forw_key1 = "doccode"
        var p8forw_columnkey1 = doccode
        var jsondata_delete = _jsonnwGridCon; //nwJson(_jsonnwGridCon, "docno", docno, false);
        for (var i = jsondata_delete.length - 1; i >= 0; i--) {
            var item = jsondata_delete[i];
            var id = item[p8forw_key];
            var id1 = item[p8forw_key1];
            if (p8forw_columnkey === id && p8forw_columnkey1 === id1) {
                jsondata_delete.splice(i, 1);
            }
        }
    } catch (ex) { }
    
    var nwRowno = 0;
    
    $('#nwGridCon .tblGridBody tr').each(function (i) {
        nwRowno++;
        var Notes = $(this).find('td:eq(' + SPR_Notes + ')').text() || "";
        if (!isNull(Notes)) {
            var completed = $(this).find('td:eq(' + SPR_Completed + ') input').prop("checked");
            var notes = $(this).find('td:eq(' + SPR_Notes + ')').text();
            var notesbutton = $(this).find('td:eq(' + SPR_NotesButton + ') textarea').val();
            var raisedby = $(this).find('td:eq(' + SPR_RaisedByCode + ')').text();
            var raisedbydesc = $(this).find('td:eq(' + SPR_RaisedByDesc + ')').text();
            var raiseddate = $(this).find('td:eq(' + SPR_DateRaised + ')').text();
            var modifiedby = $(this).find('td:eq(' + SPR_ModifiedByCode + ')').text();
            var modifiedbydesc = $(this).find('td:eq(' + SPR_ModifiedByDesc + ')').text();
            var modifieddate = $(this).find('td:eq(' + SPR_DateModified + ')').text();
            var completedby = $(this).find('td:eq(' + SPR_CompletedByCode + ')').text();
            var completedbydesc = $(this).find('td:eq(' + SPR_CompletedByDesc + ')').text();
            var completeddate = $(this).find('td:eq(' + SPR_DateCompleted + ')').text();
            var rowno = $(this).find('td:eq(' + SPR_Rowno + ')').text() || nwRowno;
            var docno = $(this).find('td:eq(' + SPR_Docno + ')').text();
            _jsonnwGridCon.push({
                completed: completed,
                notes: notes,
                notesbutton: notesbutton,
                raisedby: raisedby,
                raisedbydesc: raisedbydesc,
                raiseddate: raiseddate,
                modifiedby: modifiedby,
                modifiedbydesc: modifiedbydesc,
                modifieddate: modifieddate,
                completedby: completedby,
                completedbydesc: completedbydesc,
                completeddate: completeddate,
                doccode: doccode,
                contractno: contractno,
                rowno: rowno,
                docno: docno,
            });
        }
    });
    nwRowno = 0;
    //_jsonnwGridCon
}

function ClearGridData(Grid) {
    nwGrid_ClearRange(Grid, 0, 0, nwTempTable_Column_Count(Grid), nwTempTable_Row_Count(Grid));
}



$(document).on("keydown", "#nwgRemarksCon", function (e) {
    var code = e.which;
    if (code == "13") {
        if ($("#chknwgRemarks").is(':checked')) {
            setTimeout(function () {
            var isContinue = true;
            isContinue = Cuz_RemarksValidation();
            if (isContinue) {
                    Cuz_RemarksDone();
            } else {
                Cuz_nwGrid_NotesToNotesButton(crnwTR.index());
                Cuz_nwGrid_NotesButton(crnwTR.index());
            }
            }, 100);
            return isContinue;
        }
    }
});

$(document).on("click", '#btnnwgRemarks', function (e) {
    var isContinue = true;
    isContinue = Cuz_RemarksValidation();
    if (isContinue) {
        Cuz_RemarksDone();
    } else {
        Cuz_nwGrid_NotesToNotesButton(crnwTR.index());
        Cuz_nwGrid_NotesButton(crnwTR.index());
    }
    return true;
});
function Cuz_RemarksValidation() {
    var nwobjTR = crnwTR.index();
    var isContinue = true;
    var CurrentNotes = $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_NotesButton + ') textarea').val();
    $('#nwGridCon .tblGridBody tr').each(function (i) {
        var Notes = $(this).find('td:eq(' + SPR_Notes + ')').text() || "";
        if (!isNull(Notes)) {
            if (Notes == CurrentNotes && i != nwobjTR) {
                isContinue = false;
                return false; 
            }
        }
    });
    if (!isContinue) {
        $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_NotesButton + ') textarea').val("");
        MessageBox("Cannot proceed. Notes already exists.", basedTitle, "error");
    } else if (isNull(CurrentNotes)) {
        MessageBox("Cannot proceed. Notes is required.", basedTitle, "error");
        isContinue = false;
    }
    return isContinue;
}
function Cuz_RemarksDone() {
    var nwobjTR = nwGridCon1_Book.ActiveSheet.GetSelectedIndexes().row
    //var Notes = $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_NotesButton + ') textarea').val() || "";
    //if (isNull(Notes)) {
    //    $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_Rowno + ')').text("");
    //    $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_Completed + ') input').prop("checked",false);
    //    Cuz_nwGrid_Completed(nwobjTR);
    //} else {
      
    //}

    Cuz_nwGrid_Rowno(nwobjTR);
    //Cuz_nwGrid_NotesButton(nwobjTR);
    //Cuz_nwGrid_Notes(nwobjTR);
    Cuz_nwGrid_CompletedEnabled(nwobjTR);
    Cuz_nwGrid_RaisedAndModifiedBy(nwobjTR);

}
function Cuz_nwGrid_Rowno(nwobjTR) {
    //var Rowno = $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_Rowno + ')').text() || "";
    var Rowno = nwGridCon1_Book.ActiveSheet.GetText(SPR_Rowno - 1, nwobjTR);
    if (isNull(Rowno)) {
        Rowno = GetMaxRowno();
        nwGridCon1_Book.ActiveSheet.SetText(SPR_Rowno - 1, nwobjTR, Rowno);
        UpdateMaxRowno();
    }
}

function GetMaxRowno() {
    return $(`#txtMaxRowno`).val();
}
function UpdateMaxRowno() {
    var maxrowno = parseInt($(`#txtMaxRowno`).val());
    maxrowno += 1;
    $(`#txtMaxRowno`).val(maxrowno);
}

function Cuz_nwGrid_RaisedAndModifiedBy(nwobjTR) {
    //var Notes = $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_NotesButton + ') textarea').val() || "";
    //var Modified = $('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_RaisedByModified + ')').text();
    var Recuser = $("#txtCuzRecuser").val();
    var RecuserName = $("#txtCuzRecuserName").val();
    var ServerDate = $("#txtServerDate").val().split(' ')[0];;
    var Notes = nwGridCon1_Book.ActiveSheet.GetText(SPR_NotesButton - 1, nwobjTR);
    var Modified = nwGridCon1_Book.ActiveSheet.GetText(SPR_RaisedByModified - 1, nwobjTR);

    if (isNull(Notes)) {
        Recuser = "";
        RecuserName = "";
        ServerDate = "";
    }
    if (Modified == "1") {
        //$('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_ModifiedByCode + ')').text(Recuser);
        //$('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_ModifiedByDesc + ')').text(RecuserName);
        //$('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_DateModified + ')').text(ServerDate);
        nwGridCon1_Book.ActiveSheet.SetText(SPR_ModifiedByCode - 1, nwobjTR, Recuser);
        nwGridCon1_Book.ActiveSheet.SetText(SPR_ModifiedByDes - 1, nwobjTR, RecuserName);
        nwGridCon1_Book.ActiveSheet.SetText(SPR_DateModified - 1, nwobjTR, ServerDate);
    } else {
        //$('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_RaisedByCode + ')').text(Recuser);
        //$('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_RaisedByDesc + ')').text(RecuserName);
        //$('#nwGridCon .tblGridBody tr:eq(' + nwobjTR + ') td:eq(' + SPR_DateRaised + ')').text(ServerDate);
        nwGridCon1_Book.ActiveSheet.SetText(SPR_RaisedByCode - 1, nwobjTR, Recuser);
        nwGridCon1_Book.ActiveSheet.SetText(SPR_RaisedByDesc - 1, nwobjTR, RecuserName);
        nwGridCon1_Book.ActiveSheet.SetText(SPR_DateRaised - 1, nwobjTR, ServerDate);
    }

}



var currentcolindex;
var currentrowindex;
var _CurrentGrid = "";

$(document).on("click", "#nwGridCon", function (e) {
    try {
        currentcolindex = crnwTD.index();
        currentrowindex = crnwTR.index();
        _CurrentGrid = "nwGridCon";
    } catch (ex) { }
});
$(document).on("click", "#nwGridCon", function (e) {
    try {
        currentcolindex = crnwTD.index();
        currentrowindex = crnwTR.index();
        _CurrentGrid = "nwGridCon";
    } catch (ex) { }
});

function checkArrowKeys(e) {
    var arrs = ['left', 'up', 'right', 'down'],
    key = window.event ? event.keyCode : e.keyCode;
    if (key && key > 36 && key < 41) return true;
}

$(document).on("keydown", "body", function (e) {
    if (checkArrowKeys(e)) {
        var varobj = $(this).find(crnwTable).find("td.nwgridSelected");
        if ($(varobj).hasClass("nwgridSelected")) {
            var indexTDdiv = 0;
            var indexTRdiv = 0;
            if (crnwTD.index() < currentcolindex) { indexTDdiv = 1 }
            else if (crnwTD.index() > currentcolindex) { indexTDdiv = -1 }
            if (crnwTR.index() < currentrowindex) { indexTRdiv = 1 }
            else if (crnwTR.index() > currentrowindex) { indexTRdiv = -1 }

            key = window.event ? event.keyCode : e.keyCode;
            if (key == 38) {
                indexTRdiv = 0;
            } else if (key == 40) {
                indexTRdiv = 0;
            }

            currentcolindex = crnwTD.index() + indexTDdiv;
            currentrowindex = crnwTR.index() + indexTRdiv;

            if (_CurrentGrid == "nwGridCon") {
                Cuz_nwGridDD_EnableDeleteRow(currentrowindex);
            }
            if (_CurrentGrid == "nwGridCon1") {
                Cuz_nwGrid_EnableDeleteRow(currentrowindex);
            }
        }
    }
});

$(document).on("change", "#nwGridCon .nwCheckBoxTot1.chkCompleted", function (e) {

    var x = nwLib.nwTempTable_Row_Count("nwGridCon");
    for (var i = 0; i < x; i++) {
        Cuz_nwGrid_Completed(i);
    }

});

function func_nwGrid_InsertDone() {
    var GridID = crnwTableCon.attr("id");
    if (GridID == "nwGrid") {
        var nwobjTR = crnwTR.index() - 1;
        Cuz_nwGrid_NotesButton(nwobjTR);
    }
}

$(document).on("click", ".nwgbtnRemarks", function () {
    var isEnable = false;
    isEnable = $(this).enable();

    return isEnable;
});

//for conversion of old spread to new spread
function p8Spread_DblClick(canvasID, row, col) {
    if ($("#" + canvasID).hasClass("noah-webui-disabled")) { return false; }
    var isContinue = true;

    if (canvasID == "nwGridCon") {
        if (col == SPR_DocumentCode_DD - 1) {
            lookUpCustomize("lugDocCode", 2, "", true); //get_method
        }
    }
    return true;
}



$(document).on("click", "#btnSpreadRemarks", function () {

    var row = _row

    var hasdata = $('#txtSpreadRemarks').val();
    nwGridCon1_Book.ActiveSheet.SetValue(SPR_Notes - 1, row, hasdata)
    Cuz_RemarksDone();
});
//var actualbox = GetNum(nwGridCon1_Book.ActiveSheet.GetValue(SPR_ActualBox - 1, _row));

function p8Spread_Header_Click(canvasID, col) {
    var isContinue = true;
    if ($("#" + canvasID).hasClass("noah-webui-disabled")) { return false; }
    var iscontinue = true;
    _canvasID = canvasID;
    _col = col;

    return iscontinue;

}

function p8Spread_onClick(canvasID, row, col) {
    var isContinue = true;
    if ($("#" + canvasID).hasClass("noah-webui-disabled")) { return false; }
    var iscontinue = true;
    _canvasID = canvasID;
    _col = col;

    return iscontinue;

}

function p8Spread_Click(canvasID, row, col) {
    var isContinue = true;
    if ($("#" + canvasID).hasClass("noah-webui-disabled")) { return false; }
    var iscontinue = true;
    _canvasID = canvasID;
    _col = col;

    if (col == SPR_Completed - 1) {
        var Recuser = $("#txtCuzRecuser").val();
        var RecuserName = $("#txtCuzRecuserName").val();
        var DateTime = Cuz_DateTimeNow();

        nwGridCon1_Book.ActiveSheet.SetText(SPR_CompletedByCode - 1, row, Recuser);
        nwGridCon1_Book.ActiveSheet.SetText(SPR_CompletedByDesc - 1, row, RecuserName);
        nwGridCon1_Book.ActiveSheet.SetText(SPR_DateCompleted - 1, row, DateTime);

        
        var ischecked = nwGridCon1_Book.ActiveSheet.GetText(SPR_Completed - 1, row) == "1" ? true : false;
        if (!ischecked) {
        nwGridCon1_Book.ActiveSheet.SetText(SPR_CompletedByCode - 1, row, '');
        nwGridCon1_Book.ActiveSheet.SetText(SPR_CompletedByDesc - 1, row, '');
        nwGridCon1_Book.ActiveSheet.SetText(SPR_DateCompleted - 1, row, '');
        }

    }
    return iscontinue;

}

function p8Spread_Change(canvasID, row, col) {
    var isContinue = true;
    if ($("#" + canvasID).hasClass("noah-webui-disabled")) { return false; }
    var iscontinue = true;
    _canvasID = canvasID;
    _col = col;

    //if (col == SPR_Notes - 1) {
    //    Cuz_RemarksDone();
    //}

    return iscontinue;

}

function hasdataremarks() {

    var MaxRow = nwGridCon1_Book.ActiveSheet.GetMaxRow();

    for (x = 0; x <= MaxRow; x++) {

        var Remarks = nwGridCon1_Book.ActiveSheet.GetText(SPR_NotesButton - 1, x);

        if (Remarks == "1") {
            nwGridCon1_Book.ActiveSheet.SetBackground(SPR_NotesButton - 1, x, "green");
        }
        else {
            nwGridCon1_Book.ActiveSheet.SetBackground(SPR_NotesButton - 1, x, "blue");
        }

        nwGridCon1_Book.ActiveSheet.SetText2(SPR_NotesButton - 1, x, "...");
        nwGridCon1_Book.ActiveSheet.SetTextAlign(SPR_NotesButton - 1, x, "center");
        nwGridCon1_Book.ActiveSheet.SetBold(SPR_NotesButton - 1, x, "bold");
        nwGridCon1_Book.ActiveSheet.SetTextColor(SPR_NotesButton - 1, x, "white");


    }
}