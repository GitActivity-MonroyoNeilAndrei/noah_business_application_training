var mtitle = "Payment Request Monitoring Report";
var currentYear = "";
var currentDate = "";

var nwGridMainCon_Book;
var nwGridMainCon_Sheet;

var nwGridPRCon_Book;
var nwGridPRCon_Sheet;


var nwGridPVCon_Book;
var nwGridPVCon_Sheet;


var nwGridDMCon_Book;
var nwGridDMCon_Sheet;

var nwGridHistCon_Book;
var nwGridHistCon_Sheet;

//Payment Request Monitoring Report
var startindex = 0,
    SPR_DOCUMENTNO = ++startindex,
    SPR_DATEPOSTED = ++startindex,
    SPR_TYPE = ++startindex,
    SPR_SUBTYPE = ++startindex,
    SPR_LOCATION = ++startindex,
    SPR_ORIGCC = ++startindex,
    SPR_VENDOR = ++startindex,
    SPR_CURRENCY = ++startindex,
    SPR_CHECKPAYEENAME = ++startindex,
    SPR_PARTICULARS = ++startindex,
    SPR_RSNREQ = ++startindex,
    SPR_REFNOSI = ++startindex,
    SPR_REFDATE = ++startindex,
    SPR_DRCOCNO = ++startindex,
    SPR_PAYTERM = ++startindex,
    SPR_COUNTERDATE = ++startindex,
    SPR_DUEDATE = ++startindex,
    SPR_GROSSAMT = ++startindex,
    SPR_EWT = ++startindex,
    SPR_TOTALAMTDUE = ++startindex,
    SPR_DPADV = ++startindex,
    SPR_DMAPP = ++startindex,
    SPR_RETENTION = ++startindex,
    SPR_NETAMT = ++startindex,
    SPR_REQUESTEDBY = ++startindex,
    SPR_DATESUBMITTED = ++startindex,
    SPR_DATECREATED = ++startindex,
    SPR_APPROVALDTLS = ++startindex,
    SPR_APVNO = ++startindex,
    SPR_ONHOLD = ++startindex,
    SPR_HOLDHST = ++startindex,
    SPR_WITHSI = ++startindex,
    SPR_WITHADA = ++startindex,
    SPR_RVWATTACH = ++startindex,
    SPR_DMAMOUNT = ++startindex,
    SPR_DMDETAILS = ++startindex,
    SPR_PVAMOUNT = ++startindex,
    SPR_PVDETAILS = ++startindex,
    SPR_AMTRELEASE = ++startindex,
    SPR_PAYRELDTL = ++startindex,
    SPR_HHTAG = ++startindex,
    SPR_RVWTAG = ++startindex,
    SPR_RATAG = ++startindex,
    SPR_DMTAG = ++startindex,
    SPR_PVTAG = ++startindex,
    SPR_PRTAG = ++startindex;

//nwGridHoldHstCon
var
SPR_HH_REMARKSHOLD = 1,
SPR_HH_HELDBY = 2,
SPR_HH_HELDDATE = 3,
SPR_HH_UNHELDBY = 4,
SPR_HH_UNHELDDATE = 5,
SPR_HH_RMARKS_UNHOLD = 6,
SPR_HH_REQCOMP = 7,
SPR_HH_REQTAG = 8;

//nwGridDMCon
var
    SPR_DM_DOCNO = 1,
    SPR_DM_AMOUNT = 2,
    SPR_DM_DATECREATED = 3,
    SPR_DM_DATESUBMIT = 4,
    SPR_DM_DATEPOSTED = 5,
    SPR_DM_STATUS = 6,
    SPR_DM_CREATEDBY = 7,
    SPR_DM_RVWAPPRV = 8,
    SPR_DM_RADTAG = 9,
    SPR_DM_RVWATTACH = 10,
    SPR_DM_RATAG = 11;

//nwGridPVCon
var
    SPR_PV_DOCNO = 1,
    SPR_PV_MOP = 2,
    SPR_PV_CHECKNO = 3,
    SPR_PV_CHECKDATE = 4,
    SPR_PV_PAYAMT = 5,
    SPR_PV_DATECREATED = 6,
    SPR_PV_DATESUBMIT = 7,
    SPR_PV_DATEPOSTED = 8,
    SPR_PV_STATUS = 9,
    SPR_PV_CREATEDBY = 10,
    SPR_PV_RVWAPPRV_PV = 11,
    SPR_PV_REQCNLNO = 12,
    SPR_PV_REQUESTEDBY = 13,
    SPR_PV_STATUS_REQ = 14,
    SPR_PV_RVWAPPRV_REQ = 15,
    SPR_PV_PVCNLNO = 16,
    SPR_PV_CANCELBY = 17,
    SPR_PV_STATUS_PVCNL = 18,
    SPR_PV_RVWAPPRV_PVCNL = 19,
    SPR_PV_PAYRELNO = 20,
    SPR_PV_STATUS_PR = 21,
    SPR_PV_RVWATTACH = 22,
    SPR_PV_RATAG_PV = 23,
    SPR_PV_RATAG_REQ = 24,
    SPR_PV_RATAG_PYC = 25,
SPR_PV_RATAG_RA = 26;


//nwGridPRCon
var
    SPR_PR_DOCNO = 1,
    SPR_PR_PAYAMOUNT = 2,
    SPR_PR_REFTYPE = 3,
    SPR_PR_REFNO = 4,
    SPR_PR_REFDATE = 5,
    SPR_PR_DATECREATED = 6,
    SPR_PR_DATESUBMIT = 7,
    SPR_PR_DATEPOSTED = 8,
    SPR_PR_STATUS = 9,
    SPR_PR_CREATEDBY = 10,
    SPR_PR_REQCNLNO = 11,
    SPR_PR_REQUESTBY = 12,
    SPR_PR_STATUS_REQ = 13,
    SPR_PR_RVWAPPRV_REQ = 14,
    SPR_PR_PYCNO = 15,
    SPR_PR_CANCELBY = 16,
    SPR_PR_STATUS_PYC = 17,
    SPR_PR_RVWAPPRV_PYC = 18,
    SPR_PR_RVWATTACH_PYC = 19,
    SPR_PR_RATAG_REQ = 20,
    SPR_PR_RATAG_PYC = 21,
SPR_PR_RATAG_RV = 22;

var xsessionstamp = "";
var nwEntryParam = "";
var jsonLinDeleted = [];
var filter = "";

let serverDate = new Date();

function func_Reload() {
    crLnk = crLnk = GetCurrentURL() + "APPaymentReqMonitorRpt_Gateway";
    crLnkGateKey = "APPaymentReqMonitorRpt";

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;

    $("#settingstabs").loadAddtoList({ list: ["Location", "Cost Center", "Vendor/Payee", "Payment Request No.", "Request By", "Sub Type"], icon: true });
    nwPopupForm_Create("nwRemarks", false);
    nwPopupForm_Create("HoldingHst", true);
    nwPopupForm_Create("DMDetails", true);
    nwPopupForm_Create("PVDetails", true);
    nwPopupForm_Create("PayRelDetails", true);

    $('#txtCurrentDate').val('')
    $('#cmbMonth').enable(true);
    $('#cboAnnual').enable(false);
    $('#cmbQuarter').enable(true);
    $('#txtDateFrom').enable(false);
    $('#txtDateTo').enable(false);
    $('#cmbQuarter').enable(false);

    $('#txtCurrentDate').val('')
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    VisibleFields();
    return isContinue;
}


////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    $('#btnVwHistory').enable(false);
    func_Toolbox_Clear();
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", mtitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    nwParameter_Add("txtID", $('#txtID').val());
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", mtitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    nwParameter_Add("txtID", $('#txtID').val());

    isRefreshed = true;
    EnableFieldsDone();
    return isContinue;
}

function func_ToolboxInquire(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxProcess(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    parent_MessageBoxQuestionToolBox("Do you want to process the current record?", mtitle, "", indef, enume);
    isContinue = false;
    //nwLoading_Start("Process", crLoadingHTML);
    return isContinue;
}

function func_ToolboxImport(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxExport(indef, enume) {
    var isContinue = true;
    isContinue = false;
    fn_ExportGrid("nwGridMainCon");
    //fn_ExportGrid("nwGridViewHidden");
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
    nwParameter_Add("filter", filter);
    GetAddtoListFilters();
    getDateFilter();
    //nwParameter_Add("txtDateFrom", $('#txtDateFrom').val());
    //nwParameter_Add("txtDateTo", $('#txtDateTo').val());
    nwParameter_Add("DateGridHeader", getYearGridHeader(2));

    var ccAccess = 0
    if ($("#rdbPerCC").is(":checked")) {
        ccAccess = 1;
    }
    if ($("#rdbAllCC").is(":checked")) {
        ccAccess = 0;
    }

    

    var typeAll = 0;
    var typePO = 0;
    var typeNonPO = 0;

    if ($("#rdbAll").is(":checked")) {
        typeAll = 1;
    }
    else {
        typeAll = 0;
    }
    if ($("#rdbPO").is(":checked")) {
        typePO = 1;
    }
    else {
        typePO = 0;
    }
    if ($("#rdbNonPO").is(":checked")) {
        typeNonPO = 1;
    }
    else {
        typeNonPO = 0;
    }
    getloadfilterexport();
    nwParameter_Add("ccAccess", ccAccess);
    nwParameter_Add("typeAll", typeAll);
    nwParameter_Add("typePO", typePO);
    nwParameter_Add("typeNonPO", typeNonPO);

    
}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwLoading_Start("actBindCollection", crLoadingHTML);
    //nwParameter_Add("txtID", $("#txtID").val());
    func_ActionDriven("actBindCollection", false);
    //RefreshData();

}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("actBindCollectionEmpty", crLoadingHTML);
    //RefreshData();
    nwParameter_Add("txtID", $('#txtID').val());
    func_ActionDriven("actBindCollectionEmpty", false);
}

///////////////////////////////////////
function func_LookUpInitialize(id) {
    if (id == "TransactionNo") {
        GetAddtoListFilters();
    }
    if (id == "UserName") {
        GetAddtoListFilters();
    }
    if (id == "PaymentRequestNo" || id == "RequestBy" || id == "SubType") {
        cust_GetPara();
    }
    return true;
}


var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    if (idName == 'toolboxInquire') {
    }

    if (idName == 'lugRequestType') {
        var Record = $('.nwLoopUpTableCon');
        //let townshipcode = Record.find('tr:eq(' + idNum + ') td:eq(2)').text();
        //let townshipdesc = Record.find('tr:eq(' + idNum + ') td:eq(3)').text();
        //$('#idvallugSellerType').val(townshipcode);
        //$('#descvallugSellerType').val(townshipdesc);
    }
}

function getGridData(idnum, index) {
    var data = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idnum + ")").find("td:eq(" + (index) + ")").text();
    return data;
}

function EnableFields() {
    $('#lugRequestType').enable(true);
    //$('.nwgrid_Delete').prop("disabled", false);
    $("#nwGridCon").enable(true);
    $("#rdbTTWFR").enable(true);
    $("#rdbTTWFR").prop("checked", true);
    $("#rdbLPT").enable(true);
    $("#rdbAllCC").enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);

}

function DisableFields() {
    $("#lugRequestType").addClass('adisabled');
    $("#nwGridCon").enable(false);
    $(".btnLatestAssessments").prop("disabled", true);
    $(".btnViewStages").prop("disabled", true);
    $("#rdbTTWFR").enable(false);
    $("#rdbLPT").enable(false); 
    $("#rdbAllCC").enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
}

function EnableFieldsDone() {//Binding Done

    $("#nwGridCon").enable(true);
    $('#btnVwHistory').enable(true);

}

function DisableFieldsEmpty() {

    $('#lugRequestType').addClass('adisabled');
    $("#nwGridCon").enable(false);
    $("#rdbAllCC").enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);

}

function ClearFields() {
    //$('#txtID').val('');
    //$('#idvallugRequestType').val('');
    //$('#descvallugRequestType').val('');
    //$('#idvallugSellerType').val('');
    //$('#descvallugSellerType').val('');
    $('#cmbSortBy').val('');
    $('#cmbType').val('');
    $('#txtDateFrom').val('');
    $('#txtDateTo').val('');
    $('#radioMonthly').prop("checked", true);
    $('.spantext').remove();
}
function VisibleFields() {
   
    $("#noah-webui-Toolbox").bindingSave().visible(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    $("#noah-webui-Toolbox").bindingInquire().visible(false);
}


function Refresh() {
    nwLoading_Start("xLoading", crLoadingHTML);

    nwLoading_End('xLoading');
}


$(document).on("click", "#btnDelete", function (e) {
    MessageBoxQuestion("Are you sure you want to delete this record?", mtitle, "");
    return false;
});

function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {
    cust_GetPara();
    var nwobjID = nwobj.attr('id');
    var col = crnwTD.index();

    if (nwobjID == "nwGridCon") {

        //var Code = $('#txtCode').val();
        //var Desc = $('#txtDescription').val();

        //if (Code == null || Code.length <= 0 && Desc == null || Desc.length <= 0) {
        //    MessageBox("Cannot proceed. Header is required.", mtitle, "error", "");

        //    return true;
        //}
        //else {

        //    if (col == SPR_Code) {
        //        lookUpCustomize("lugEmployeeCode", 2);
        //    }

        //}
    }
    else if (nwobjID == "ItemGroupTypeGridCon") {
        if (col == SPR_Code) {
            lookUpCustomize("lugItemGroupType", 2);
        }
    }
}

function func_nwGrid_DeleteValidation() {
    var isContinue = true;

    if (crnwTableCon.attr("id") == "nwGridCon") {
        msgBoxContainerQuestion = "DeleteQ";

        if (nwTempTable_RowData_Get("nwGridCon", crnwTR.index(), SPR_IsUsed - 1) == 2)
            MessageBox('Cannot Delete. Record has already been used.', mtitle);
        else {
            //MessageBoxQuestion("Are you sure you want to delete record?");
            var indexRow = crnwTR.index();

            if (nwTempTable_RowData_Get("nwGridCon", crnwTR.index(), SPR_IsExist - 1) == 1)
                rowDeleted(indexRow);

            func_nwgrid_DeleteRow(crnwTD);
        }

        isContinue = false;
    }

    return isContinue;
}

function msgBoxContainerQuestionF(genID, answer) {
    if (genID == "DeleteQ") {
        if (answer == "Yes") {


        }
    }
}


function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
    var col = crnwTD.index();
    var cnt = nwLib.nwTempTable_Row_Count("nwGridCon");


    if (nwGridID == 'nwGridCon') {
        if (col == SPR_Code) {
            var Code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
            var Desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
            var Desig = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
            var Dept = addtoListTableRec.find('tr:eq(' + index + ') td:eq(4)').text();
            //var Classification = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();


            var isValid = nwLib.nwTempTable_Column_ValueExist("nwGridCon", 1, Code, false, "text", 0);

            if (isValid == false) {
                crnwTRtemp.find('td:eq(' + SPR_Code + ')').text(Code);
                crnwTRtemp.find('td:eq(' + SPR_Desc + ')').text(Desc);
                crnwTRtemp.find('td:eq(' + SPR_Designation + ')').text(Desig);
                crnwTRtemp.find('td:eq(' + SPR_Department + ')').text(Dept);
                //crnwTRtemp.find('td:eq(' + SPR_Classification + ')').text(Classification);

            }
            else {
                crnwTRtemp = null;
            }
        }
    } else if (nwGridID == 'ItemGroupTypeGridCon') {
        if (col == SPR_Code) {
            var Code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
            var Desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
            //var Classification = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();


            var isValid = nwLib.nwTempTable_Column_ValueExist("nwGridCon", 1, Code, false, "text", 0);

            if (isValid == false) {
                crnwTRtemp.find('td:eq(' + SPR_Code + ')').text(Code);
                crnwTRtemp.find('td:eq(' + SPR_Desc + ')').text(Desc);
                //crnwTRtemp.find('td:eq(' + SPR_Classification + ')').text(Classification);

            }
            else {
                crnwTRtemp = null;
            }
        }
    }


    return crnwTRtemp;
}

$(function () {
    $("#settingstabs").tabs();
});


$(document).on('click', '.nwgrid_Insert', function () {

});

$(document).on('click', '.nwgrid_Delete', function () {

});

$(document).on("keydown", '#txtlookupsearch', function (e) {

    if (e.shiftKey && e.keyCode === 53) {
        return false;
    } else if (e.keyCode === 222) {
        return false;
    }
});


function ColorHistButton(row) {

    for (var a = 0; a <= row; a++) {
        var Rem = nwTempTable_RowData_Get("nwGridCon", a, SPR_IsUsed - 1);
        lockGridcols(SPR_Code, SPR_Code, a + 1, a + 1, "nwGridCon", Rem > 0)
    }
}

function lockGridcols(col1, col2, row1, row2, nwGrid, isLock) {
    for (var col = col1; col <= col2; col++) {
        for (row = (row1 - 1) ; row < row2; row++) {
            $('#' + nwGrid + '-nwData tr:eq(' + row + ')').find('td:eq(' + col + ')').enable(!isLock);
        }
    }
}

$(document).on("click", "#btnVwHistory", function (e) {

    nwParameter_Add("txtID", $('#txtID').val());
    nwLoading_Start("actLoadHist", crLoadingHTML);
    func_ActionDriven("actLoadHist", true);

    return false;
});


function rowDeleted(rowIndex) {

    try {
        var Project = nwLib.nwTempTable_RowData_Get("nwGridCon", rowIndex, (SPR_Code - 1));

        if (Project != "") {

            var jCount = nwJsonSearchIndex(jsonLinDeleted, "Project", Project, false);

            while (jCount >= 0) {
                nwJsonDelete(jsonLinDeleted, jCount);
                jCount = nwJsonSearchIndex(jsonLinDeleted, "Project", Project, false);
            }

            jsonLinDeleted.push({
                Project: Project
                , Company: $('#idvallugRequestType').val()
            });
        }
    } catch (err) { }
}


function setgridfilter() {
    filter = "";

    crnwTable = $("#nwGridCon .tblGridBody");
    var itemcount = crnwTable.find("tr").length;
    for (var i = 0; i < itemcount ; i++) {
        var code = crnwTable.find("tr:eq(" + i + ")").find("td:eq(1)").text();
        if (code.length > 0) {
            if (filter == "") {
                filter = "" + code + "";
            }
            else {
                filter += "|" + code + "";
            }
        }
    }

}


$(document).on('click', '.btnItemGrpType', function () {
    temp_crnwTR = crnwTR.index();
    nwParameter_Add("temp_crnwTR", temp_crnwTR);
    var empCode = nwLib.nwTempTable_RowData_Get("nwGridCon", temp_crnwTR, (SPR_Code - 1));
    var empDesc = nwLib.nwTempTable_RowData_Get("nwGridCon", temp_crnwTR, (SPR_Desc - 1));

    if (empCode != '') {
        $('#idvallugEmployee').val(empCode);
        $('#descvallugEmployee').val(empDesc);
        //nwPopupForm_ShowModal("nwItemGroupTypeCon");
        cust_GetPara();
        nwParameter_Add("idvallugEmployee", empCode);
        func_ActionDriven("actItemGroupTypeGridCon", false);
    }
    else {
        MessageBox('Employee is required.', mtitle);
    }

    return false;
})

$(document).on("change", "input[name='datefilter']", function (e) {
    //DisableFields();
    $('#cmbSortBy').enable(true);
    $('#cmbType').enable(true);
    //ClearDateFilter();
    if ($(this).prop("checked")) {
        var id = $(this).attr("id")

        if (id == "radioMonthly") {
            $('#txtCurrentDate').val('')
            $('#cmbMonth').enable(true);
            $('#cboAnnual').enable(false);
            $('#cmbQuarter').enable(true);
            $('#txtDateFrom').enable(false);
            $('#txtDateTo').enable(false);
            $('#cmbQuarter').enable(false);

            $('#txtCurrentDate').val('')

        } else if (id == "radioDate") {
            $('#txtDateFrom').val(currentDate);
            $('#txtDateTo').val(currentDate);
            $('#cmbMonth').enable(false);
            $('#cboAnnual').enable(false);
            $('#cmbQuarter').enable(false);
            $('#txtDateFrom').enable(true);
            $('#txtDateTo').enable(true);
        }
        else if (id == "radioAnnual") {
            if ($('#cboAnnual').val() == "")
                $('#cmbMonth').enable(false);
            $('#cmbQuarter').enable(false);
            $('#cmbMonth').enable(false);

        }
        else if (id == "radioQuarter") {
            $('#cmbMonth').enable(false);
            $('#cboAnnual').enable(false);
        }
        else if (id == "radioAsOf") {
            getDate();
            $('#txtDateFrom').enable(false);
            $('#txtDateTo').enable(false);
        }
        else if (id == "radioForthePeriod") {

        }


    }

    function ClearDateFilter() {
        $("#cmbMonth").val("1");
        $("#cmbQuarter").val("1");

        if ($("#cboAnnual").val() == "")
            $("#cboAnnual").val(currentYear);

        $("#txtDateFrom").val("");
        $("#txtDateTo").val("");
    }

}); $(document).on("change", "input[name='datefilter']", function (e) {
    //DisableFields();
    $('#cmbSortBy').enable(true);
    $('#cmbType').enable(true);
    //ClearDateFilter();
    if ($(this).prop("checked")) {
        var id = $(this).attr("id")

        if (id == "radioMonthly") {

            $('#txtCurrrentTo').enable(false);
            $('#cmbMonth').enable(true);
            $(".nwCustBtn").enable(true);
            $('#radioDate').enable(true);
            $('#txtCurrentDate').val('')

            $("#txtDateFrom").enable(false);
            $('#txtDateTo').enable(false);
            $('#txtDateFrom').val('');
            $('#txtDateTo').val('');

        }
        else if (id == "radioDate") {
            $('#txtDateFrom').enable(true);
            $('#txtDateTo').enable(true);
            $('#txtDateFrom').val(currentDate);
            $('#txtDateTo').val(currentDate);
            $(".nwCustBtn").enable(false);
            $('#radioDate').enable(true);
            $('#txtCurrrentTo').enable(false);
            $('#txtCurrentDate').val('')
        }
        else if (id == "radioAnnual") {
            if ($('#cboAnnual').val() == "")
                $('#txtCurrrentTo').enable(false);
            $('#cboAnnual').val(currentYear);

            $('#cboAnnual').enable(true);
            $(".nwCustBtn").enable(false);
            $('#radioDate').enable(true);
            $('#txtCurrentDate').val('');

            $("#txtDateFrom").enable(false);
            $('#txtDateTo').enable(false);
            $('#txtDateFrom').val('');
            $('#txtDateTo').val('');
        }
        else if (id == "radioQuarter") {
            $('#cmbQuarter').enable(true);
            $('#txtCurrrentTo').enable(true);

            $(".nwCustBtn").enable(false);
            $('#radioDate').enable(true);
            $('#txtCurrrentTo').enable(false);
            $('#txtCurrentDate').val('');

            $("#txtDateFrom").enable(false);
            $('#txtDateTo').enable(false);
            $('#txtDateFrom').val('');
            $('#txtDateTo').val('');
        }
        else if (id == "radioAsOf") {
            $('#cmbQuarter').enable(true);

            $(".nwCustBtn").enable(false);
            $('#radioDate').enable(true);
            $('#cmbSortBy').enable(true);
            $('#txtCurrrentTo').enable(true);
            $('#txtCurrentDate').enable(false);
            $('#cmbQuarter').enable(false);
            $('#cmbType').enable(true);
            getDate();
        }
        else if (id == "radioForthePeriod") {
            $('#cmbQuarter').enable(true);
            clearlookupval();
            $(".nwCustBtn").enable(false);
            $('#radioDate').enable(true);
            $('#cmbQuarter').enable(false);
            $('#txtCurrrentTo').enable(true);
            $('#txtCurrentDate').enable(false);
            $("#radioDate").enable(true);
            //$('#txtCurrentDate').val('')
        }
    }
});


function getDate() {
    var EffectiveDate = new Date($('#txtCurrentDate').val());
    var serverDate = new Date(CurrentDate);
    $('#txtCurrentDate').val(CurrentDate)

    $(this).val(getCurrentDate())

}


function getDate() {
    var EffectiveDate = new Date($('#txtCurrentDate').val());
    var serverDate = new Date(CurrentDate);
    $('#txtCurrentDate').val(CurrentDate)

    $(this).val(getCurrentDate())

}


function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

function getDateFilter() {
    var dateFilterFrom = "";
    var dateFilterTo = "";
    if ($('#radioMonthly').prop("checked")) {
        dateFilterFrom = $('#cboAnnual').val() + "-" + $('#cmbMonth').val() + "-1";
        var month = $('#cmbMonth').val()
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            dateFilterTo = $('#cboAnnual').val() + "-" + $('#cmbMonth').val() + "-31";
        }
        else if (month == 4 || month == 6 || month == 9 || month == 11) {
            dateFilterTo = $('#cboAnnual').val() + "-" + $('#cmbMonth').val() + "-30";
        }
        else if (month == 2) {
            dateFilterTo = $('#cboAnnual').val() + "-" + $('#cmbMonth').val() + "-28";
        }

    }

    if ($('#radioAnnual').prop("checked")) {
        dateFilterFrom = $('#cboAnnual').val() + "-1-1";
        dateFilterTo = $('#cboAnnual').val() + "-12-31";
    }

    if ($('#radioQuarter').prop("checked")) {
        if ($('#cmbQuarter').val() == 1) {
            dateFilterFrom = $('#cboAnnual').val() + "-1-1";
            dateFilterTo = $('#cboAnnual').val() + "-3-31";
        }
        if ($('#cmbQuarter').val() == 2) {
            dateFilterFrom = $('#cboAnnual').val() + "-4-1";
            dateFilterTo = $('#cboAnnual').val() + "-6-30";
        }
        if ($('#cmbQuarter').val() == 3) {
            dateFilterFrom = $('#cboAnnual').val() + "-7-1";
            dateFilterTo = $('#cboAnnual').val() + "-9-30";
        }
        if ($('#cmbQuarter').val() == 4) {
            dateFilterFrom = $('#cboAnnual').val() + "-10-1";
            dateFilterTo = $('#cboAnnual').val() + "-12-31";
        }
    }

    if ($('#radioDate').prop("checked")) {
        dateFilterFrom = $('#txtDateFrom').val();
        dateFilterTo = $('#txtDateTo').val();
    }

    nwParameter_Add("dateFilterFrom", dateFilterFrom);
    nwParameter_Add("dateFilterTo", dateFilterTo);
}

function DateTag() {
    var tagType = "";
    if ($('#radioMonthly').prop("checked")) {
        tagType = "monthly";
    }
    if ($('#radioAnnual').prop("checked")) {
        tagType = "annually";
    }
    if ($('#radioQuarter').prop("checked")) {
        tagType = "quarterly";
    }

    if ($('#radioDate').prop("checked")) {
        tagType = "datecovered";
    }

    nwParameter_Add("tagtype", tagType);
}



//function getDateFilter() {
//    var dateFilterFrom = "";
//    var dateFilterTo = "";
//    if ($('#radioMonthly').prop("checked")) {
//        dateFilterFrom = $('#cboAnnual').val() + "-" + $('#cmbMonth').val() + "-1";
//        var month = $('#cmbMonth').val()
//        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
//            dateFilterTo = $('#cboAnnual').val() + "-" + $('#cmbMonth').val() + "-31";
//        }
//        else if (month == 4 || month == 6 || month == 9 || month == 11) {
//            dateFilterTo = $('#cboAnnual').val() + "-" + $('#cmbMonth').val() + "-30";
//        }
//        else if (month == 2) {
//            dateFilterTo = $('#cboAnnual').val() + "-" + $('#cmbMonth').val() + "-28";
//        }
//    }

//    if ($('#radioAnnual').prop("checked")) {
//        dateFilterFrom = $('#cboAnnual').val() + "-1-1";
//        dateFilterTo = $('#cboAnnual').val() + "-12-31";

//    }

//    if ($('#radioQuarter').prop("checked")) {
//        if ($('#cmbQuarter').val() == 1) {
//            dateFilterFrom = $('#cboAnnual').val() + "-1-1";
//            dateFilterTo = $('#cboAnnual').val() + "-3-31";

//        }
//        if ($('#cmbQuarter').val() == 2) {
//            dateFilterFrom = $('#cboAnnual').val() + "-4-1";
//            dateFilterTo = $('#cboAnnual').val() + "-6-30";

//        }
//        if ($('#cmbQuarter').val() == 3) {
//            dateFilterFrom = $('#cboAnnual').val() + "-7-1";
//            dateFilterTo = $('#cboAnnual').val() + "-9-30";
//        }
//        if ($('#cmbQuarter').val() == 4) {
//            dateFilterFrom = $('#cboAnnual').val() + "-10-1";
//            dateFilterTo = $('#cboAnnual').val() + "-12-31";

//        }
//    }

//    if ($('#radioDate').prop("checked")) {
//        dateFilterFrom = $('#txtDateFrom').val();
//        dateFilterTo = $('#txtDateTo').val();
//    }

//    nwParameter_Add("dateFilterFrom", dateFilterFrom);
//    nwParameter_Add("dateFilterTo", dateFilterTo);
////}

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


$(document).on("blur", "#cboAnnual", function () {
    if ($(this).val() == "") {
        $(this).val(currentYear)
    }

    ReloadMonth()
    ReloadQuarter()
});
$(document).on("click", ".btnGetlookup", function () {
    crnwTableCon = null; // if grid is click 

    var xtype = $(this).attr("nwtype");
    var selectedInput = xtype;

    cust_GetPara();
    lookUpCustomize(selectedInput, 2);

});
function ReloadQuarter() {
    $('#cmbQuarter').html("");
    $('#cmbQuarter').append("<option value='1'>1st Quarter, " + $('#cboAnnual').val() + "</option>");
    $('#cmbQuarter').append("<option value='2'>2nd Quarter, " + $('#cboAnnual').val() + "</option>");
    $('#cmbQuarter').append("<option value='3'>3rd Quarter, " + $('#cboAnnual').val() + "</option>");
    $('#cmbQuarter').append("<option value='4'>4th Quarter, " + $('#cboAnnual').val() + "</option>");
}

function ReloadMonth() {
    $('#cmbMonth').html("");
    $('#cmbMonth').append("<option value='1'>January, " + $('#cboAnnual').val() + "</option>");
    $('#cmbMonth').append("<option value='2'>February, " + $('#cboAnnual').val() + "</option>");
    $('#cmbMonth').append("<option value='3'>March, " + $('#cboAnnual').val() + "</option>");
    $('#cmbMonth').append("<option value='4'>April, " + $('#cboAnnual').val() + "</option>");
    $('#cmbMonth').append("<option value='5'>May, " + $('#cboAnnual').val() + "</option>");
    $('#cmbMonth').append("<option value='6'>June, " + $('#cboAnnual').val() + "</option>");
    $('#cmbMonth').append("<option value='7'>July, " + $('#cboAnnual').val() + "</option>");
    $('#cmbMonth').append("<option value='8'>August, " + $('#cboAnnual').val() + "</option>");
    $('#cmbMonth').append("<option value='9'>September, " + $('#cboAnnual').val() + "</option>");
    $('#cmbMonth').append("<option value='10'>October, " + $('#cboAnnual').val() + "</option>");
    $('#cmbMonth').append("<option value='11'>November, " + $('#cboAnnual').val() + "</option>");
    $('#cmbMonth').append("<option value='12'>December, " + $('#cboAnnual').val() + "</option>");
}

function GenerateLookupListDataHTML(xvalue, xdisplay) {
    return '<div class="spantext" nwcode="' + xvalue + '" >' + xdisplay + '<span class="classx">x</span></div>';
};

function nwGrid_AddtoListDoneCustom(verID, addtoListTableRec, index) {

    var xvalue = "";
    var xdisplay = "";

    xvalue = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
    xdisplay = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

    if (verID == "PaymentRequestNo") {
        if ($('div.atlContainer[nwtype="' + verID + '"]').find('div.spantext[nwcode="' + xvalue + '"]').length < 1) {
            $('div.atlContainer[nwtype="' + verID + '"] div.innertext').append(GenerateLookupListDataHTML(xvalue, xvalue));
        }
    } else {
        if ($('div.atlContainer[nwtype="' + verID + '"]').find('div.spantext[nwcode="' + xvalue + '"]').length < 1) {
            $('div.atlContainer[nwtype="' + verID + '"] div.innertext').append(GenerateLookupListDataHTML(xvalue, xdisplay));
        }
    }

}

$(document).on('click',
    'span.classx',
    function () {
        $(this).closest('div.spantext').remove();

    });

$(document).on('click', '#btnTicketDetlWindow', function () {

    var index = crnwTR.index();
    var TicketNo = $('#nwGridCon-nwData tr:eq(' + index + ')').find('td:eq(3)').text();
    var connLink = "ACRMTicketEntry?nwReport=1&nwDocno=" + encodeURI(TicketNo) + "";
    nwPopupForm_Create("nwTicketDetailsWindow", true, connLink);
    nwPopupForm_ShowModal("nwTicketDetailsWindow");

    //return false;
});


function Mainload() {
    $('#txtCurrrentTo').enable(true);
    $('#cmbSortBy').enable(true);
    $('#cmbType').enable(true);
    $('#txtDateFrom').enable(false);
    $('#txtDateTo').enable(false);
    $('#nwGridCon').enable(false);
    $('#noah-webui-default-Process').enable(false);
    $('.nwLeftheader').enable(false);

}

$index = 0;
$(document).on('click', '.btnLatestAssessments', function () {
    $index = crnwTR.index() - 1;
    let assessment = $("#nwGridView-nwData tbody").find('tr:eq(' + $index + ') td:eq(' + SPR_LATESTASSESST + ')').text();
    if (assessment !== "") {
        nwLoading_Start("actGridLatestAssessments", crLoadingHTML);
        var index = crnwTR.index();
        var TicketNo = $('#nwGridViewData tr:eq(' + index + ')').find('td:eq(1)').text();


        nwParameter_Add("TicketNo", TicketNo);

        nwPopupForm_ShowModal("nwAssessment");
        func_ActionDriven("actGridLatestAssessments", false);
    } else
        return false;
});


function formatLatestAssessment() {
    let x = "";
    x = $("#nwGridView-nwData tbody").find('tr:eq(' + $index + ') td:eq(' + SPR_LATESTASSESST + ')')[0].innerHTML

    $("#txtAssessment").text('');
    $("#txtAssessment").append(x);

    $("#txtAssessment").find("div").css({
        "font-family": "Arial",
        "font-size": "15px",
        "padding-bottom": "10px"
    });
    $("#txtAssessment .msg-content").css({
        "background": "gainsboro",
        "padding": "5px",
        "border-radius": "5px"
    });
    $("#txtAssessment .msg-content").find("span:first").css("color", "grey");
}

let $ticketNo = "";
$(document).on('click', '.btnViewStages', function () {
    nwLoading_Start("actGridViewStages", crLoadingHTML);
    var index = crnwTR.index();
    var TicketNo = $('#nwGridViewData tr:eq(' + index + ')').find('td:eq(1)').text(),
        $ticketNo = $('#nwGridViewData tr:eq(' + index + ')').find('td:eq(1)').text();

    nwParameter_Add("TicketNo", TicketNo);
    nwPopupForm_ShowModal("nwStageDetails");

    func_ActionDriven("actGridViewStages", false);

});


$(document).on('click', '#btnViewInstruction', function () {
    nwLoading_Start("actGridViewInstruction", crLoadingHTML);
    var index = crnwTR.index();
    var incharge = $('#nwGridStageDetails-nwData tr:eq(' + index + ')').find('td:eq(2)').text();
    var stage = $('#nwGridStageDetails-nwData tr:eq(' + index + ')').find('td:eq(1)').text();
    var tranNo = $('#nwGridStageDetails-nwData tr:eq(' + index + ')').find('td:eq(5)').text();

    nwParameter_Add("incharge", incharge);
    nwParameter_Add("stage", stage);
    nwParameter_Add("ticketNo", tranNo)
    nwPopupForm_ShowModal("nwTicketPreqCon");

    func_ActionDriven("actGridViewInstruction", false);

});


function CustomizedButtonStyle(index) {
    
        nwGridMainCon_Book.ActiveSheet.RenderStatus = false;
        //nwGridMainCon_Book.ActiveSheet.GetValue(SPR_HHTAG + 1, i)
        if (nwGridMainCon_Book.ActiveSheet.GetValue(SPR_HHTAG - 1, index) == "1") {
            // $('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_HOLDHST + 1) + ')').removeClass("btnGray");
            // $('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_HOLDHST + 1) + ')').addClass("btnGreen");
            // $('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_HOLDHST + 1) + ')').enable(true);
            // $("#nwGridView-nwData tbody tr:eq(" + index + ")").find("td:nth-child(" + (SPR_HOLDHST + 1) + ") div:hover").css("color", "#fff");
            nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_HOLDHST - 1, index, "green");
            nwGridMainCon_Book.ActiveSheet.SetTextColor(SPR_HOLDHST - 1, index, "white");
            nwGridMainCon_Book.ActiveSheet.SetBold(SPR_HOLDHST - 1, index, "bold");
        }
        else {
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_HOLDHST + 1) + ')').removeClass("btnGreen");
            // $('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_HOLDHST + 1) + ')').addClass("btnGray");
            // $('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_HOLDHST + 1) + ')').enable(false);
            //$("#nwGridView-nwData tbody tr:eq(" + index + ")").find("td:nth-child(" + (SPR_HOLDHST + 1) + ") div:hover").css("color", "#fff");
            nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_HOLDHST - 1, index, "gray");
            nwGridMainCon_Book.ActiveSheet.SetTextColor(SPR_HOLDHST - 1, index, "white");
            nwGridMainCon_Book.ActiveSheet.SetBold(SPR_HOLDHST - 1, index, "bold");
        }

        if (nwGridMainCon_Book.ActiveSheet.GetValue(SPR_RVWTAG - 1, index) == "1") {
            nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_APPROVALDTLS - 1, index, "green");
            nwGridMainCon_Book.ActiveSheet.SetTextColor(SPR_APPROVALDTLS - 1, index, "white");
            nwGridMainCon_Book.ActiveSheet.SetBold(SPR_APPROVALDTLS - 1, index, "bold");

            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_APPROVALDTLS + 1) + ')').removeClass("btnGray");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_APPROVALDTLS + 1) + ')').addClass("btnGreen");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_APPROVALDTLS + 1) + ')').enable(true);

            //$("#nwGridView-nwData tbody tr:eq(" + index + ")").find("td:nth-child(" + (SPR_APPROVALDTLS + 1) + ") div:hover").css("color", "#fff");
        }
        else {
            nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_APPROVALDTLS - 1, index, "gray");
            nwGridMainCon_Book.ActiveSheet.SetTextColor(SPR_APPROVALDTLS - 1, index, "white");
            nwGridMainCon_Book.ActiveSheet.SetBold(SPR_APPROVALDTLS - 1, index, "bold");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_APPROVALDTLS + 1) + ')').removeClass("btnGreen");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_APPROVALDTLS + 1) + ')').addClass("btnGray");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_APPROVALDTLS + 1) + ')').enable(false);

            //$("#nwGridView-nwData tbody tr:eq(" + index + ")").find("td:nth-child(" + (SPR_APPROVALDTLS + 1) + ") div:hover").css("color", "#fff");
        }

        if (nwGridMainCon_Book.ActiveSheet.GetValue(SPR_RATAG - 1, index) == "1") {

            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_RVWATTACH + 1) + ')').removeClass("btnGray");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_RVWATTACH + 1) + ')').addClass("btnGreen");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_RVWATTACH + 1) + ')').enable(true);

            //$("#nwGridView-nwData tbody tr:eq(" + index + ")").find("td:nth-child(" + (SPR_RVWATTACH + 1) + ") div:hover").css("color", "#fff");
            nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_RVWATTACH - 1, index, "green");
            nwGridMainCon_Book.ActiveSheet.SetTextColor(SPR_RVWATTACH - 1, index, "white");
            nwGridMainCon_Book.ActiveSheet.SetBold(SPR_RVWATTACH - 1, index, "bold");
        }
        else {

            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_RVWATTACH + 1) + ')').removeClass("btnGreen");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_RVWATTACH + 1) + ')').addClass("btnGray");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_RVWATTACH + 1) + ')').enable(false);

            //$("#nwGridView-nwData tbody tr:eq(" + index + ")").find("td:nth-child(" + (SPR_RVWATTACH + 1) + ") div:hover").css("color", "#fff");
            nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_RVWATTACH - 1, index, "gray");
            nwGridMainCon_Book.ActiveSheet.SetTextColor(SPR_RVWATTACH - 1, index, "white");
            nwGridMainCon_Book.ActiveSheet.SetBold(SPR_RVWATTACH - 1, index, "bold");
        }

        if (nwGridMainCon_Book.ActiveSheet.GetValue(SPR_DMTAG - 1, index) == "1") {
            nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_DMDETAILS - 1, index, "green");
            nwGridMainCon_Book.ActiveSheet.SetTextColor(SPR_DMDETAILS - 1, index, "white");
            nwGridMainCon_Book.ActiveSheet.SetBold(SPR_DMDETAILS - 1, index, "bold");

            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_DMDETAILS + 1) + ')').removeClass("btnGray");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_DMDETAILS + 1) + ')').addClass("btnGreen");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_DMDETAILS + 1) + ')').enable(true);


            //$("#nwGridView-nwData tbody tr:eq(" + index + ")").find("td:nth-child(" + (SPR_DMDETAILS + 1) + ") div:hover").css("color", "#fff");
        }
        else {
            nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_DMDETAILS - 1, index, "gray");
            nwGridMainCon_Book.ActiveSheet.SetTextColor(SPR_DMDETAILS - 1, index, "white");
            nwGridMainCon_Book.ActiveSheet.SetBold(SPR_DMDETAILS - 1, index, "bold");

            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_DMDETAILS + 1) + ')').removeClass("btnGreen");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_DMDETAILS + 1) + ')').addClass("btnGray");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_DMDETAILS + 1) + ')').enable(false);

            //$("#nwGridView-nwData tbody tr:eq(" + index + ")").find("td:nth-child(" + (SPR_DMDETAILS + 1) + ") div:hover").css("color", "#fff");
        }

        if (nwGridMainCon_Book.ActiveSheet.GetValue(SPR_PVTAG - 1, index) == "1") {
            nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_PVDETAILS - 1, index, "green");
            nwGridMainCon_Book.ActiveSheet.SetTextColor(SPR_PVDETAILS - 1, index, "white");
            nwGridMainCon_Book.ActiveSheet.SetBold(SPR_PVDETAILS - 1, index, "bold");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_PVDETAILS + 1) + ')').removeClass("btnGray");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_PVDETAILS + 1) + ')').addClass("btnGreen");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_PVDETAILS + 1) + ')').enable(true);


            //$("#nwGridView-nwData tbody tr:eq(" + index + ")").find("td:nth-child(" + (SPR_PVDETAILS + 1) + ") div:hover").css("color", "#fff");
        }
        else {
            nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_PVDETAILS - 1, index, "gray");
            nwGridMainCon_Book.ActiveSheet.SetTextColor(SPR_PVDETAILS - 1, index, "white");
            nwGridMainCon_Book.ActiveSheet.SetBold(SPR_PVDETAILS - 1, index, "bold");

            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_PVDETAILS + 1) + ')').removeClass("btnGreen");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_PVDETAILS + 1) + ')').addClass("btnGray");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_PVDETAILS + 1) + ')').enable(false);

            //$("#nwGridView-nwData tbody tr:eq(" + index + ")").find("td:nth-child(" + (SPR_PVDETAILS + 1) + ") div:hover").css("color", "#fff");
        }

        if (nwGridMainCon_Book.ActiveSheet.GetValue(SPR_PRTAG - 1, index) == "1") {
            nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_PAYRELDTL - 1, index, "green");
            nwGridMainCon_Book.ActiveSheet.SetTextColor(SPR_PAYRELDTL - 1, index, "white");
            nwGridMainCon_Book.ActiveSheet.SetBold(SPR_PAYRELDTL - 1, index, "bold");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_PAYRELDTL + 1) + ')').removeClass("btnGray");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_PAYRELDTL + 1) + ')').addClass("btnGreen");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_PAYRELDTL + 1) + ')').enable(true);

            //$("#nwGridView-nwData tbody tr:eq(" + index + ")").find("td:nth-child(" + (SPR_PAYRELDTL + 1) + ") div:hover").css("color", "#fff");
        }
        else {
            nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_PAYRELDTL - 1, index, "gray");
            nwGridMainCon_Book.ActiveSheet.SetTextColor(SPR_PAYRELDTL - 1, index, "white");
            nwGridMainCon_Book.ActiveSheet.SetBold(SPR_PAYRELDTL - 1, index, "bold");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_PAYRELDTL + 1) + ')').removeClass("btnGreen");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_PAYRELDTL + 1) + ')').addClass("btnGray");
            //$('#nwGridView-nwData tbody tr:eq(' + index + ') td:nth-child(' + (SPR_PAYRELDTL + 1) + ')').enable(false);


            //$("#nwGridView-nwData tbody tr:eq(" + index + ")").find("td:nth-child(" + (SPR_PAYRELDTL + 1) + ") div:hover").css("color", "#fff");
        }

        nwGridMainCon_Book.ActiveSheet.RenderStatus = true;
    //nwGridPRCon_Book.ActiveSheet.RenderStatus = true;
}
function HistGridProp() {
    nwGridHistCon_Book.ActiveSheet.RenderStatus = false;
    let maxRow = nwGridHistCon_Book.ActiveSheet.GetMaxRow();

    for (var index = 0; index < maxRow; index++) {
        var radtag = nwGridHistCon_Book.ActiveSheet.GetValue(SPR_HH_REQTAG - 1, index);
        if (radtag == "1") {
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_DM_RVWAPPRV + ') button').removeClass("btnGray");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_DM_RVWAPPRV + ') button').addClass("btnGreen");
            nwGridHistCon_Book.ActiveSheet.SetBackground(SPR_HH_REQCOMP - 1, index, "green");
            nwGridHistCon_Book.ActiveSheet.SetTextColor(SPR_HH_REQCOMP - 1, index, "white");
            nwGridHistCon_Book.ActiveSheet.SetBold(SPR_HH_REQCOMP - 1, index, "bold");
            nwGridHistCon_Book.ActiveSheet.SetText2(SPR_HH_REQCOMP - 1, index, "...");
            nwGridHistCon_Book.ActiveSheet.SetTextAlign(SPR_HH_REQCOMP - 1, index, "center");
        }
        else {
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_DM_RVWAPPRV + ') button').removeClass("btnGreen");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_DM_RVWAPPRV + ') button').addClass("btnGray");
            nwGridHistCon_Book.ActiveSheet.SetBackground(SPR_HH_REQCOMP - 1, index, "gray");
            nwGridHistCon_Book.ActiveSheet.SetTextColor(SPR_HH_REQCOMP - 1, index, "white");
            nwGridHistCon_Book.ActiveSheet.SetBold(SPR_HH_REQCOMP - 1, index, "bold");
            nwGridHistCon_Book.ActiveSheet.SetText2(SPR_HH_REQCOMP - 1, index, "...");
            nwGridHistCon_Book.ActiveSheet.SetTextAlign(SPR_HH_REQCOMP - 1, index, "center");
        }

    }
    nwGridHistCon_Book.ActiveSheet.RenderStatus = true;
}
function DMGridProp() {
    nwGridDMCon_Book.ActiveSheet.RenderStatus = false;
    let maxRow = nwGridDMCon_Book.ActiveSheet.GetMaxRow();

    for (var index = 0; index < maxRow; index++) {
        var radtag = nwGridDMCon_Book.ActiveSheet.GetValue(SPR_DM_RADTAG - 1, index);
        if (radtag == "1") {
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_DM_RVWAPPRV + ') button').removeClass("btnGray");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_DM_RVWAPPRV + ') button').addClass("btnGreen");
            nwGridDMCon_Book.ActiveSheet.SetBackground(SPR_DM_RVWAPPRV - 1, index, "green");
            nwGridDMCon_Book.ActiveSheet.SetTextColor(SPR_DM_RVWAPPRV - 1, index, "white");
            nwGridDMCon_Book.ActiveSheet.SetBold(SPR_DM_RVWAPPRV - 1, index, "bold");
            nwGridDMCon_Book.ActiveSheet.SetText2(SPR_DM_RVWAPPRV - 1, index, "...");
            nwGridDMCon_Book.ActiveSheet.SetTextAlign(SPR_DM_RVWAPPRV - 1, index, "center");
        }
        else {
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_DM_RVWAPPRV + ') button').removeClass("btnGreen");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_DM_RVWAPPRV + ') button').addClass("btnGray");
            nwGridDMCon_Book.ActiveSheet.SetBackground(SPR_DM_RVWAPPRV - 1, index, "gray");
            nwGridDMCon_Book.ActiveSheet.SetTextColor(SPR_DM_RVWAPPRV - 1, index, "white");
            nwGridDMCon_Book.ActiveSheet.SetBold(SPR_DM_RVWAPPRV - 1, index, "bold");
            nwGridDMCon_Book.ActiveSheet.SetText2(SPR_DM_RVWAPPRV - 1, index, "...");
            nwGridDMCon_Book.ActiveSheet.SetTextAlign(SPR_DM_RVWAPPRV - 1, index, "center");
        }
        
        var ratag = nwGridDMCon_Book.ActiveSheet.GetValue(SPR_DM_RATAG - 1, index);
        if (ratag == "1") {
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_DM_RVWATTACH + ') button').removeClass("btnGray");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_DM_RVWATTACH + ') button').addClass("btnGreen");
            nwGridDMCon_Book.ActiveSheet.SetBackground(SPR_DM_RVWATTACH - 1, index, "green");
            nwGridDMCon_Book.ActiveSheet.SetTextColor(SPR_DM_RVWATTACH - 1, index, "white");
            nwGridDMCon_Book.ActiveSheet.SetBold(SPR_DM_RVWATTACH - 1, index, "bold");
            nwGridDMCon_Book.ActiveSheet.SetText2(SPR_DM_RVWATTACH - 1, index, "...");
            nwGridDMCon_Book.ActiveSheet.SetTextAlign(SPR_DM_RVWATTACH - 1, index, "center");
        }
        else {
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_DM_RVWATTACH + ') button').removeClass("btnGreen");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_DM_RVWATTACH + ') button').addClass("btnGray");
            nwGridDMCon_Book.ActiveSheet.SetBackground(SPR_DM_RVWATTACH - 1, index, "gray");
            nwGridDMCon_Book.ActiveSheet.SetTextColor(SPR_DM_RVWATTACH - 1, index, "white");
            nwGridDMCon_Book.ActiveSheet.SetBold(SPR_DM_RVWATTACH - 1, index, "bold");
            nwGridDMCon_Book.ActiveSheet.SetText2(SPR_DM_RVWATTACH - 1, index, "...");
            nwGridDMCon_Book.ActiveSheet.SetTextAlign(SPR_DM_RVWATTACH - 1, index, "center");
        }

    }
    nwGridDMCon_Book.ActiveSheet.RenderStatus = true;
}

function PVGridProp() {
    nwGridPVCon_Book.ActiveSheet.RenderStatus = false;
    let maxRow = nwGridPVCon_Book.ActiveSheet.GetMaxRow();


    for (var index = 0; index < maxRow; index++) {

        var radtag_pv = nwGridPVCon_Book.ActiveSheet.GetValue(SPR_PV_RATAG_PV - 1, index);
        if (radtag_pv == "1") {
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_PV_RVWAPPRV_PV + ') button').removeClass("btnGray");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_PV_RVWAPPRV_PV + ') button').addClass("btnGreen");
            nwGridPVCon_Book.ActiveSheet.SetBackground(SPR_PV_RVWAPPRV_PV - 1, index, "green");
            nwGridPVCon_Book.ActiveSheet.SetTextColor(SPR_PV_RVWAPPRV_PV - 1, index, "white");
            nwGridPVCon_Book.ActiveSheet.SetBold(SPR_PV_RVWAPPRV_PV - 1, index, "bold");
            nwGridPVCon_Book.ActiveSheet.SetText2(SPR_PV_RVWAPPRV_PV - 1, index, "...");
            nwGridPVCon_Book.ActiveSheet.SetTextAlign(SPR_PV_RVWAPPRV_PV - 1, index, "center");

        }
        else {
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_PV_RVWAPPRV_PV + ') button').removeClass("btnGreen");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_PV_RVWAPPRV_PV + ') button').addClass("btnGray");
            nwGridPVCon_Book.ActiveSheet.SetBackground(SPR_PV_RVWAPPRV_PV - 1, index, "gray");
            nwGridPVCon_Book.ActiveSheet.SetTextColor(SPR_PV_RVWAPPRV_PV - 1, index, "white");
            nwGridPVCon_Book.ActiveSheet.SetBold(SPR_PV_RVWAPPRV_PV - 1, index, "bold");
            nwGridPVCon_Book.ActiveSheet.SetText2(SPR_PV_RVWAPPRV_PV - 1, index, "...");
            nwGridPVCon_Book.ActiveSheet.SetTextAlign(SPR_PV_RVWAPPRV_PV-1, index, "center");

        }

        var radtag_req = nwGridPVCon_Book.ActiveSheet.GetValue(SPR_PV_RATAG_REQ - 1, index); 
        if (radtag_req == "1") {
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_PV_RVWAPPRV_REQ + ') button').removeClass("btnGray");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_PV_RVWAPPRV_REQ + ') button').addClass("btnGreen");
            nwGridPVCon_Book.ActiveSheet.SetBackground(SPR_PV_RVWAPPRV_REQ - 1, index, "green");
            nwGridPVCon_Book.ActiveSheet.SetTextColor(SPR_PV_RVWAPPRV_REQ - 1, index, "white");
            nwGridPVCon_Book.ActiveSheet.SetBold(SPR_PV_RVWAPPRV_REQ - 1, index, "bold");
            nwGridPVCon_Book.ActiveSheet.SetText2(SPR_PV_RVWAPPRV_REQ - 1, index, "...");
            nwGridPVCon_Book.ActiveSheet.SetTextAlign(SPR_PV_RVWAPPRV_REQ - 1, index, "center");
        }
        else {
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_PV_RVWAPPRV_REQ + ') button').removeClass("btnGreen");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_PV_RVWAPPRV_REQ + ') button').addClass("btnGray");
            nwGridPVCon_Book.ActiveSheet.SetBackground(SPR_PV_RVWAPPRV_REQ - 1, index, "gray");
            nwGridPVCon_Book.ActiveSheet.SetTextColor(SPR_PV_RVWAPPRV_REQ - 1, index, "white");
            nwGridPVCon_Book.ActiveSheet.SetBold(SPR_PV_RVWAPPRV_REQ - 1, index, "bold");
            nwGridPVCon_Book.ActiveSheet.SetText2(SPR_PV_RVWAPPRV_REQ - 1, index, "...");
            nwGridPVCon_Book.ActiveSheet.SetTextAlign(SPR_PV_RVWAPPRV_REQ - 1, index, "center");
        }
        var radtag_pyc = nwGridPVCon_Book.ActiveSheet.GetValue(SPR_PV_RATAG_PYC - 1, index);
        if (radtag_pyc == "1") {
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_PV_RVWAPPRV_PVCNL + ') button').removeClass("btnGray");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_PV_RVWAPPRV_PVCNL + ') button').addClass("btnGreen");
            nwGridPVCon_Book.ActiveSheet.SetBackground(SPR_PV_RVWAPPRV_PVCNL - 1, index, "gray");
            nwGridPVCon_Book.ActiveSheet.SetTextColor(SPR_PV_RVWAPPRV_PVCNL - 1, index, "white");
            nwGridPVCon_Book.ActiveSheet.SetBold(SPR_PV_RVWAPPRV_PVCNL - 1, index, "bold");
            nwGridPVCon_Book.ActiveSheet.SetText2(SPR_PV_RVWAPPRV_PVCNL - 1, index, "...");
            nwGridPVCon_Book.ActiveSheet.SetTextAlign(SPR_PV_RVWAPPRV_PVCNL - 1, index, "center");
        }
        else {
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_PV_RVWAPPRV_PVCNL + ') button').removeClass("btnGreen");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_PV_RVWAPPRV_PVCNL + ') button').addClass("btnGray");
            nwGridPVCon_Book.ActiveSheet.SetBackground(SPR_PV_RVWAPPRV_PVCNL - 1, index, "gray");
            nwGridPVCon_Book.ActiveSheet.SetTextColor(SPR_PV_RVWAPPRV_PVCNL - 1, index, "white");
            nwGridPVCon_Book.ActiveSheet.SetBold(SPR_PV_RVWAPPRV_PVCNL - 1, index, "bold");
            nwGridPVCon_Book.ActiveSheet.SetText2(SPR_PV_RVWAPPRV_PVCNL - 1, index, "...");
            nwGridPVCon_Book.ActiveSheet.SetTextAlign(SPR_PV_RVWAPPRV_PVCNL - 1, index, "center");
        }
        
        var RATAG_RA = nwGridPVCon_Book.ActiveSheet.GetValue(SPR_PV_RATAG_RA - 1, index);
        if (RATAG_RA == "1") {
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_PV_RVWAPPRV_PVCNL + ') button').removeClass("btnGray");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_PV_RVWAPPRV_PVCNL + ') button').addClass("btnGreen");
            nwGridPVCon_Book.ActiveSheet.SetBackground(SPR_PV_RVWATTACH - 1, index, "gray");
            nwGridPVCon_Book.ActiveSheet.SetTextColor(SPR_PV_RVWATTACH - 1, index, "white");
            nwGridPVCon_Book.ActiveSheet.SetBold(SPR_PV_RVWATTACH - 1, index, "bold");
            nwGridPVCon_Book.ActiveSheet.SetText2(SPR_PV_RVWATTACH - 1, index, "...");
            nwGridPVCon_Book.ActiveSheet.SetTextAlign(SPR_PV_RVWATTACH - 1, index, "center");
        }
        else {
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_PV_RVWAPPRV_PVCNL + ') button').removeClass("btnGreen");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_PV_RVWAPPRV_PVCNL + ') button').addClass("btnGray");
            nwGridPVCon_Book.ActiveSheet.SetBackground(SPR_PV_RVWATTACH - 1, index, "gray");
            nwGridPVCon_Book.ActiveSheet.SetTextColor(SPR_PV_RVWATTACH - 1, index, "white");
            nwGridPVCon_Book.ActiveSheet.SetBold(SPR_PV_RVWATTACH - 1, index, "bold");
            nwGridPVCon_Book.ActiveSheet.SetText2(SPR_PV_RVWATTACH - 1, index, "...");
            nwGridPVCon_Book.ActiveSheet.SetTextAlign(SPR_PV_RVWATTACH - 1, index, "center");
        }
    }
    nwGridPVCon_Book.ActiveSheet.RenderStatus = true;
}

function PRGridProp() {
    nwGridPRCon_Book.ActiveSheet.RenderStatus = false;
    let maxRow = nwGridPRCon_Book.ActiveSheet.GetMaxRow();

    for (var index = 0; index < maxRow; index++) {



        if (nwGridPRCon_Book.ActiveSheet.GetValue(SPR_PR_RATAG_REQ - 1, index) == "1") {
            nwGridPRCon_Book.ActiveSheet.SetBackground(SPR_PR_RVWAPPRV_REQ - 1, index, "green");
            nwGridPRCon_Book.ActiveSheet.SetTextColor(SPR_PR_RVWAPPRV_REQ - 1, index, "white");
            nwGridPRCon_Book.ActiveSheet.SetBold(SPR_PR_RVWAPPRV_REQ - 1, index, "bold");
            nwGridPRCon_Book.ActiveSheet.SetText2(SPR_PR_RVWAPPRV_REQ - 1, index, "...");
            nwGridPRCon_Book.ActiveSheet.SetTextAlign(SPR_PR_RVWAPPRV_REQ - 1, index, "center");
        }
        else {
            nwGridPRCon_Book.ActiveSheet.SetBackground(SPR_PR_RVWAPPRV_REQ - 1, index, "gray");
            nwGridPRCon_Book.ActiveSheet.SetTextColor(SPR_PR_RVWAPPRV_REQ - 1, index, "white");
            nwGridPRCon_Book.ActiveSheet.SetBold(SPR_PR_RVWAPPRV_REQ - 1, index, "bold");
            nwGridPRCon_Book.ActiveSheet.SetText2(SPR_PR_RVWAPPRV_REQ - 1, index, "...");
            nwGridPRCon_Book.ActiveSheet.SetTextAlign(SPR_PR_RVWAPPRV_REQ - 1, index, "center");
        }

        if (nwGridPRCon_Book.ActiveSheet.GetValue(SPR_PR_RATAG_PYC - 1, index) == "1") {
            nwGridPRCon_Book.ActiveSheet.SetBackground(SPR_PR_RVWAPPRV_PYC - 1, index, "green");
            nwGridPRCon_Book.ActiveSheet.SetTextColor(SPR_PR_RVWAPPRV_PYC - 1, index, "white");
            nwGridPRCon_Book.ActiveSheet.SetBold(SPR_PR_RVWAPPRV_PYC - 1, index, "bold");
            nwGridPRCon_Book.ActiveSheet.SetText2(SPR_PR_RVWAPPRV_PYC - 1, index, "...");
            nwGridPRCon_Book.ActiveSheet.SetTextAlign(SPR_PR_RVWAPPRV_PYC - 1, index, "center");
        }
        else {
            nwGridPRCon_Book.ActiveSheet.SetBackground(SPR_PR_RVWAPPRV_PYC - 1, index, "gray");
            nwGridPRCon_Book.ActiveSheet.SetTextColor(SPR_PR_RVWAPPRV_PYC - 1, index, "white");
            nwGridPRCon_Book.ActiveSheet.SetBold(SPR_PR_RVWAPPRV_PYC - 1, index, "bold");
            nwGridPRCon_Book.ActiveSheet.SetText2(SPR_PR_RVWAPPRV_PYC - 1, index, "...");
            nwGridPRCon_Book.ActiveSheet.SetTextAlign(SPR_PR_RVWAPPRV_PYC - 1, index, "center");
        }
        
        if (nwGridPRCon_Book.ActiveSheet.GetValue(SPR_PR_RATAG_RV - 1, index) == "1") {
            nwGridPRCon_Book.ActiveSheet.SetBackground(SPR_PR_RVWATTACH_PYC - 1, index, "green");
            nwGridPRCon_Book.ActiveSheet.SetTextColor(SPR_PR_RVWATTACH_PYC - 1, index, "white");
            nwGridPRCon_Book.ActiveSheet.SetBold(SPR_PR_RVWATTACH_PYC - 1, index, "bold");
            nwGridPRCon_Book.ActiveSheet.SetText2(SPR_PR_RVWATTACH_PYC - 1, index, "...");
            nwGridPRCon_Book.ActiveSheet.SetTextAlign(SPR_PR_RVWATTACH_PYC - 1, index, "center");
        }
        else {
            nwGridPRCon_Book.ActiveSheet.SetBackground(SPR_PR_RVWATTACH_PYC - 1, index, "gray");
            nwGridPRCon_Book.ActiveSheet.SetTextColor(SPR_PR_RVWATTACH_PYC - 1, index, "white");
            nwGridPRCon_Book.ActiveSheet.SetBold(SPR_PR_RVWATTACH_PYC - 1, index, "bold");
            nwGridPRCon_Book.ActiveSheet.SetText2(SPR_PR_RVWATTACH_PYC - 1, index, "...");
            nwGridPRCon_Book.ActiveSheet.SetTextAlign(SPR_PR_RVWATTACH_PYC - 1, index, "center");

        }
    }
    nwGridPRCon_Book.ActiveSheet.RenderStatus = true;

}

function colorBtn() {
    let maxRow = nwGridMainCon_Book.ActiveSheet.GetMaxRow();
   
       // maxRow = nwGridPVCon_Book.ActiveSheet.GetMaxRow();
       // maxRow = nwGridDMCon_Book.ActiveSheet.GetMaxRow();

    for (let i = 10; i < maxRow; i++) {
        CustomizedButtonStyle(i);
    }
}

function setToCurrentDate() {
    //let month = +DateFormat.format.date(serverDate, 'MM');
    //let year = +DateFormat.format.date(serverDate, 'yyyy');

    //$('#cmbMonth').val(month);
    //$('#cboAnnual').val(year);

    //if (month == 1 || month == 2 || month == 3) {
    //    $('#cmbQuarter').val(1);
    //} else if (month == 4 || month == 5 || month == 6) {
    //    $('#cmbQuarter').val(2);
    //} else if (month == 7 || month == 8 || month == 9) {
    //    $('#cmbQuarter').val(3);
    //} else if (month == 10 || month == 11 || month == 12) {
    //    $('#cmbQuarter').val(4);
    //}

}

$(document).on("change", "#txtDateFrom, #txtDateTo", function () {
    let xFrom = $("#txtDateFrom").val(),
        xTo = $("#txtDateTo").val();

    let errorResult = "";

    if (Date.parse(xFrom) > Date.parse(xTo)) {
        errorResult = "Cannot Continue. Date Covered From should not be later than Date Covered To.";
    }

    if (errorResult !== "") {
        parent_MessageBox(errorResult, mtitle);
        $("#txtDateFrom").val(DateFormat.format.date(serverDate, 'MM/dd/yyyy'))
    }
});


function CustomDisabledDateFilter() {
    if ($("#radioMonthly").prop("checked")) {
        $("#cmbMonth").enable(true);
        $("#cboAnnual").enable(false);
        $("#cmbQuarter").enable(false);
        $("#txtDateFrom").enable(false);
        $("#txtDateTo").enable(false);
    } else if ($("#radioAnnual").prop("checked")) {
        $("#cmbMonth").enable(false);
        $("#cboAnnual").enable(true);
        $("#cmbQuarter").enable(false);
        $("#txtDateFrom").enable(false);
        $("#txtDateTo").enable(false);
    } else if ($("#radioQuarter").prop("checked")) {
        $("#cmbMonth").enable(false);
        $("#cboAnnual").enable(false);
        $("#cmbQuarter").enable(true);
        $("#txtDateFrom").enable(false);
        $("#txtDateTo").enable(false);
    } else if ($("#radioDate").prop("checked")) {
        $("#cmbMonth").enable(false);
        $("#cboAnnual").enable(false);
        $("#cmbQuarter").enable(false);
        $("#txtDateFrom").enable(true);
        $("#txtDateTo").enable(true);
    }
}



function makegreenpropertiesnotempty() {
    var cnt = nwLib.nwTempTable_Row_Count("nwTicketsPreqGridCon");
    for (var row = 0; row <= cnt; row++) {
        if ($('#nwTicketsPreqGridCon .tblGridBody tr:eq(' + row + ') td:eq(' + SPR_FILEPATH + ')').text() != "") {
            $("#nwTicketsPreqGridCon tbody tr:eq(" + row + ") td:eq(" + (SPR_VIEW) + ") a").removeClass("button2 blue small ");
            $("#nwTicketsPreqGridCon tbody tr:eq(" + row + ") td:eq(" + (SPR_VIEW) + ") a").addClass("button2 green small ");
        }

        if ($('#nwTicketsPreqGridCon .tblGridBody tr:eq(' + row + ') td:eq(' + SPR_RemarksDtl + ')').text() != "") {
            $("#nwTicketsPreqGridCon tbody tr:eq(" + row + ") td:eq(" + (SPR_Remarks) + ") a").removeClass("button2 blue small ");
            $("#nwTicketsPreqGridCon tbody tr:eq(" + row + ") td:eq(" + (SPR_Remarks) + ") a").addClass("button2 green small ");
        }

        if ($('#nwTicketsPreqGridCon .tblGridBody tr:eq(' + row + ') td:eq(' + SPR_IsEdit + ')').text() != "1") {
            $("#nwTicketsPreqGridCon tbody tr:eq(" + row + ") td:eq(" + (SPR_Complied) + ")").enable(false);
            $("#nwTicketsPreqGridCon tbody tr:eq(" + row + ") td:eq(" + (SPR_ATTACH) + ") a").enable(false);
            $("#nwTicketsPreqGridCon tbody tr:eq(" + row + ") td:eq(" + (SPR_REMOVE) + ") a").enable(false);
            $("#nwTicketsPreqGridCon tbody tr:eq(" + row + ") td:eq(" + (SPR_Complied) + ")").css('background-color', 'gainsboro');
        }

    }
}


//View Code Start
$(document).on("click", ".btnview", function () {
    var serverlink = $("#txtserverlink").val();
    //if debug
    //serverlink = serverlink.replaceAll('../', '');
    //serverlink = 'http://localhost/' + serverlink
    //
    var path = crnwTR.find("td:eq(" + SPR_FILEPATH + ")").text();
    if (path == "") {
        MessageBox("No attachment found.", "Document Attachment", "error");
        return false;
    }
    filepath = serverlink + path;
    nwviewattach(filepath);
});

function nwviewattach(filepath) {
    //inititalize
    $('#docattviewimg').attr('src', "");
    $('#docattviewlink').attr('src', "");
    $('#docattviewimg').removeClass('ratio');
    $('#docattviewpdfobjectlink').attr('data', "");
    $('#docattviewpdfembedlink').attr('src', "");
    $('#aDownload').attr({ "href": "", "title": "\'DOWNLOAD\'", "download": "", "target": "_blank" });
    //start
    if (checkextensionsimg(filepath)) {
        $('#docattviewimg').addClass('ratio');
        $('#docattviewimg').attr('src', filepath);
        nwPopupForm_ShowModal("docattview");
    }
    else if (checkextensionsadl(filepath)) {
        //$('#docattviewlink').attr('src', filepath);
        $('#aDownload').attr({ "href": filepath, "title": "\'DOWNLOAD\'", "download": "", "target": "_blank" });
        $('#aDownload')[0].click();
    }
    else {
        if (filepath.includes(".pdf")) {
            $('#docattviewpdfobjectlink').attr('data', filepath + "#toolbar=0");
            $('#docattviewpdfembedlink').attr('src', filepath + "#toolbar=0");
            nwPopupForm_ShowModal("docattview");
        } else {
            //$('#docattviewlink').attr('src', filepath);
            //nwPopupForm_ShowModal("docattview");
            $('#aDownload').attr({ "href": filepath, "title": "\'DOWNLOAD\'", "download": "", "target": "_blank" });
            $('#aDownload')[0].click();
        }
    }

    if (!checkextensionsadl(filepath)) {
        $('#aDownload').attr({ "href": filepath, "title": "\'DOWNLOAD\'", "download": "", "target": "_blank" });
    }
}

function checkextensionsimg(path) {
    path = path.toLowerCase();
    path = path.replace(path.substring(0, path.indexOf('.')), '');
    if (path.includes(".jpg") || path.includes(".jpeg") || path.includes(".png") || path.includes(".gif") || path.includes(".tiff") || path.includes(".psd")
    || path.includes(".eps") || path.includes(".indd") || path.includes(".raw")) {
        return true;
    }
    return false;
}

function checkextensionsadl(path) {
    path = path.toLowerCase();
    path = path.replace(path.substring(0, path.indexOf('.')), '');
    if (path.includes(".xls") || path.includes(".xlsb") || path.includes(".xlsm") || path.includes(".xlsx") || path.includes(".doc")
    || path.includes(".docx") || path.includes(".docm") || path.includes(".dotx") || path.includes(".dotm") || path.includes(".docb")
    || path.includes(".pptx") || path.includes(".pptm") || path.includes(".ppt")) {
        return true;
    }
    return false;
}

$(document).on("click", "#docattviewdownload", function (e) {
    e.preventDefault();  //stop the browser from following
    $('#aDownload')[0].click();
});
//View Code End


$(document).on("click", '#btnatt', function (e) {

    $("#fileCon").val("");
    $("#status").find("span").text("");
    $(".progress").find("div.percent").text("0%");
    $(".progress").find("div.bar").css("width", "0%");
    nwPopupForm_ShowModal("nwUploadCon");
});


$(document).on("click", "#btnattremove", function () {
    var path = crnwTR.find("td:eq(" + SPR_FILEPATH + ")").text();
    if (path == "") {
        MessageBox("No attachment found.", "Document Attachment", "error");
        return false;
    } else {
        msgBoxContainerQuestion = "btnattremove";
        parent_MessageBoxQuestion("Do you wish to remove the attachment?", "Document Attachment", "");
        return true;
    }
});

function RemoveDocAtt() {
    crnwTR.find("td:eq(" + SPR_FILEPATH + ")").text('');
    var tempindex = crnwTR.index();
    $("#nwTicketsPreqGridCon tbody tr:eq(" + tempindex + ") td:eq(" + SPR_VIEW + ")").removeClass("button2 green small");
    $("#nwTicketsPreqGridCon tbody tr:eq(" + tempindex + ") td:eq(" + SPR_VIEW + ")").addClass("button2 blue small");
}

var attachclick = '';
//For Uploading of Attachment
function changeFile(ver) {
    var file = ver.files[0];
    var name = file.name;
    var size = file.size;
    var type = file.type;
    type = name.slice((Math.max(0, name.lastIndexOf(".")) || Infinity) + 1);
    type = type.toLowerCase();
    $(".bar").css("width", "0%");
    $(".percent").text("0%");
    $("#status").html("");

    //Your validation
    currentName = name;
    if (size > 5242880) {
        MessageBox("Attachment does not follow file size requirement.", menuTitle, "error"); $(ver).val("");
    }
    else if (name.includes("%") || name.includes("#")) {
        MessageBox("Cannot upload. File name should not have % or #.", "", "error");
        $(ver).val("");
    }
    else {

        setTimeout(function () {
            $("#btnupload").click();
        }, 100);


        //upload();
    }
}

// Upload
function upload() {
    //var searchParams = new URLSearchParams(window.location.search)
    //searchParams.set("txtMilestoneCode", $('#txtMilestoneCode').val());
    //var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    //history.pushState(null, '', newRelativePathQuery);

    if ($("input[type = 'file']").val() == "") {
        $("#status").html("<span class=\"nwCuz-014\">Please select file to upload!</span>");
        (function () {
            var bar = $('.bar');
            var percent = $('.percent');
            var status = $('#status');
            $('form').ajaxForm({
                beforeSend: function () {

                },
                uploadProgress: function (event, position, total, percentComplete) {
                },
                success: function () {
                },
                complete: function (xhr) {
                }
            });
        })();
    } else {
        (function () {
            var bar = $('.bar');
            var percent = $('.percent');
            var status = $('#status');

            try {
                //

                var UploadFileName = '';
                var currentdate = new Date();
                var datetime = ''


                var d = new Date($.now());
                datetime = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + "_" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

                UploadFileName = $("input[type = 'file']").val().split(/(\\|\/)/g).pop(); + '_' + datetime.replace(/-|:| /g, '');
                var mydata = { "UploadFileName": UploadFileName };
                $('form').ajaxForm(
                {
                    data: mydata,
                    beforeSend: function () {
                        status.empty();
                        var percentVal = '0%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                    },

                    uploadProgress: function (event, position, total, percentComplete) {
                        var percentVal = percentComplete + '%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                        $("#status").text('Uploading...');
                    },

                    success: function () {
                        var percentVal = '100%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                    },

                    complete: function (xhr) {
                        $('#status').html(xhr.responseText);
                        setTimeout(function () {
                            window_close('nwUploadCon');
                        }, 500);

                    }
                });
            } catch (err) {
                alert(err);
            }
        })();
    }
}



var linkcat = "";
//Action or Trigger When Closing of Pop-up
var xvaluePath = "";
var tempindex;

function uploadcloseDocAtt() {
    tempindex = crnwTR.index();

    var filepath = "";
    var path = "";
    var serverlink = $("#txtserverlink").val();
    //For Button Catalogue Attach
    filepath = $("#nwUploadCon .aagfilename").text();
    path = "\\" + 'ACRMTicketMngmntEntry' + "\\" + filepath;

    if (filepath != "") {
        linkcat = serverlink + path;
        nwLib.nwTempTable_RowData_Set("nwTicketsPreqGridCon", tempindex, SPR_FILEPATH)(path);
        $("#nwTicketsPreqGridCon tbody tr:eq(" + tempindex + ") td:eq(" + (SPR_VIEW) + ") a").removeClass("button2 blue small ");
        $("#nwTicketsPreqGridCon tbody tr:eq(" + tempindex + ") td:eq(" + (SPR_VIEW) + ") a").addClass("button2 green small ");
    }
}

function func_WindowCloseTrigger(verID) {
    var isContinue = true;

    if (verID == "nwUploadCon") {
        uploadcloseDocAtt();
    }

    return isContinue;
}


function RemoveDocAtt() {
    crnwTR.find("td:eq(" + SPR_FILEPATH + ")").text('');
    var tempindex = crnwTR.index();
    $("#nwTicketsPreqGridCon tbody tr:eq(" + tempindex + ") td:eq(" + (SPR_VIEW) + ") a").removeClass("button2 green small ");
    $("#nwTicketsPreqGridCon tbody tr:eq(" + tempindex + ") td:eq(" + (SPR_VIEW) + ") a").addClass("button2 blue small ");
}

var indextmp = 0;
$(document).on("click", "#btnRemarks", function (e) {
    indextmp = crnwTR.index();

    if ($("#nwTicketsPreqGridCon tbody tr:eq(" + indextmp + ") td:eq(" + (SPR_IsEdit) + ")").text() != '1') {
        $('#btnSave').enable(false);
        $('#btnClear').enable(false);
        $('#txtRemarks').enable(false);
    }
    else {
        $('#btnSave').enable(true);
        $('#btnClear').enable(true);
        $('#txtRemarks').enable(true);
    }


    nwPopupForm_ShowModal("nwRemarks");
    $('#txtRemarks').val(replaceAll($("#nwTicketsPreqGridCon tbody tr:eq(" + indextmp + ") td:eq(" + (SPR_RemarksDtl) + ")").text(), "{Environment.NewLine}", "\n"));

});

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

$(document).on("click", "#btnSave", function (e) {
    $("#nwTicketsPreqGridCon tbody tr:eq(" + indextmp + ") td:eq(" + (SPR_RemarksDtl) + ")").text($('#txtRemarks').val());

    if ($("#nwTicketsPreqGridCon tbody tr:eq(" + indextmp + ") td:eq(" + (SPR_RemarksDtl) + ")").text() != '') {
        $("#nwTicketsPreqGridCon tbody tr:eq(" + indextmp + ") td:eq(" + (SPR_Remarks) + ") a").removeClass("button2 blue small ");
        $("#nwTicketsPreqGridCon tbody tr:eq(" + indextmp + ") td:eq(" + (SPR_Remarks) + ") a").addClass("button2 green small ");
    }
    else {
        $("#nwTicketsPreqGridCon tbody tr:eq(" + indextmp + ") td:eq(" + (SPR_Remarks) + ") a").removeClass("button2 green small ");
        $("#nwTicketsPreqGridCon tbody tr:eq(" + indextmp + ") td:eq(" + (SPR_Remarks) + ") a").addClass("button2 blue small ");
    }

    nwPopupForm_HideModal("nwRemarks");
});

$(document).on("click", "#btnClear", function (e) {
    $('#txtRemarks').val('');
    $("#nwTicketsPreqGridCon tbody tr:eq(" + indextmp + ") td:eq(" + (SPR_RemarksDtl) + ")").text('');

    if ($("#nwTicketsPreqGridCon tbody tr:eq(" + indextmp + ") td:eq(" + (SPR_RemarksDtl) + ")").text() == '') {
        $("#nwTicketsPreqGridCon tbody tr:eq(" + indextmp + ") td:eq(" + (SPR_Remarks) + ") a").removeClass("button2 green small ");
        $("#nwTicketsPreqGridCon tbody tr:eq(" + indextmp + ") td:eq(" + (SPR_Remarks) + ") a").addClass("button2 blue small ");
    }
});

$(document).on("click", ".btnViewDetails", function (e) {
    let ifYes = crnwTR.find('td:eq(' + (SPR_EMERGENCY) + ')').text() == "YES" ? true : false;

    if (!ifYes) {
        var nwTranNo = crnwTR.find("td:eq(" + (SPR_TICKETNO) + ")").text();
        var connLink = "ACRMTicketEntry?nwReport=1&tranNo=" + encodeURI(nwTranNo) + "";

        nwPopupForm_Create("nwPopDetails", true, connLink);
        //$("#nwPopDetails").css({ "min-width": "100%" });
        //$("#nwPopDetails").css({ "min-height": "100%" });
        nwPopupForm_ShowModal("nwPopDetails");

        return false;
    }
});

$(document).on('click', '.btnApprvDtls', function () {
    if ($('#nwGridView-nwData tbody tr:eq(' + (crnwTR.index() - 1) + ') td:nth-child(' + (SPR_RVWTAG + 1) + ')').text() == "1") {
        nwLoading_Start('xbtnApprvDtls', crLoadingHTML);
        nwPopupForm_ShowModal("nwRemarks");
        nwParameter_Add("docno", crnwTR.find("td:eq(" + SPR_DOCUMENTNO + ")").text())
        func_ActionDriven("actViewApprovalDetails", false);
    }

});

$(document).on("click", ".btnEntryView", function (e) {
    nwLoading_Start("xbtnDtls", crLoadingHTML);
    var fullength = "";
    var title = "";
    var nwDocno = crnwTR.find("td:eq(" + SPR_DOCUMENTNO + ")").text();
    var tranType = crnwTR.find("td:eq(" + SPR_TRANTYPE + ")").text();
    nwParameter_Add("nwDocno", nwDocno);

    if (nwDocno.length > 0) {
        nwParameter_Add("urlPath", window.location.origin);
        nwParameter_Add("tranType", tranType);

        if (tranType == 'REQCON' || tranType == 'REQREP') {
            title = "Request Entry";
            fullength = "RMRequestEntry?nwDocno=" + encodeURI(nwDocno);
            $('.nwmenuFrame').attr("src", fullength);
        }
        if (tranType == "PURCHS") {
            title = "Purchase Order Entry";
            fullength = "POPurchaseOrderEntry?nwDocno=" + encodeURI(nwDocno);
            $('.nwmenuFrame').attr("src", fullength);
        }
        if (tranType == "PAYREQ" || tranType == "PRFDRT") {
            title = "Payment Request Entry";
            fullength = "APPaymentRqstEntry?nwDocno=" + encodeURI(nwDocno);
            $('.nwmenuFrame').attr("src", fullength);
        }
        if (tranType == "PAYVCH") {
            title = "Payment Voucher Entry";
            fullength = "CMPaymentVoucherEntry?nwDocno=" + encodeURI(nwDocno);
            $('.nwmenuFrame').attr("src", fullength);
        }
        if (tranType == "RCTVEN") {
            title = "Receipt from Vendor Entry";
            fullength = "FIVRcptFromVendorEntry?nwDocno=" + encodeURI(nwDocno);
            $('.nwmenuFrame').attr("src", fullength);
        }

        nwPopupForm_Create("nwPopWindow", true, fullength);
        $('#nwPopWindow .BoxTitle').text(title);

        $("#nwPopWindow").css({ "min-width": "98%" });
        $("#nwPopWindow").css({ "min-height": "98%" });
        nwPopupForm_ShowModal("nwPopWindow");
        $('.dimbgNWnwPopWindow').removeClass('openn');
    }
    nwLoading_End('xbtnDtls');
});

$(document).on('click', '.btnRvwAttach', function () {
    if ($('#nwGridView-nwData tbody tr:eq(' + (crnwTR.index() - 1) + ') td:nth-child(' + (SPR_RATAG + 1) + ')').text() != "1") {
        return false;
    }


    var docno = '';
    var prfno = crnwTR.find("td:eq(" + SPR_DOCUMENTNO + ")").text();
    var apvno = crnwTR.find("td:eq(" + SPR_APVNO + ")").text();

    if (apvno != '') {
        docno = apvno;
    }
    else {
        docno = prfno;
    }

    var fullength = "DCViewAttachment?isView=true&nwDocno=" + docno + "";

    nwLoading_Start('xbtnViewAttach', crLoadingHTML);
    nwPopupForm_Create("nwPopUpViewAttach", true, fullength);
    $('#nwPopUpViewAttach .BoxTitle').text("View Attachment(s)");
    $("#nwPopUpViewAttach").css({ "min-width": "98%" });
    $("#nwPopUpViewAttach").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopUpViewAttach");
    nwLoading_End('xbtnViewAttach');
});

function defaultonload(code, description) {
    $('div.atlContainer[nwtype="Location"] div.innertext').append(GenerateLookupListDataHTML(code, description));
}

$(document).on("click", "#rdbPO", function () {
    $("#atl_SubType.btnClearList").click();
});

$(document).on("click", ".btnHoldHst", function () {
    if ($('#nwGridView-nwData tbody tr:eq(' + (crnwTR.index() - 1) + ') td:nth-child(' + (SPR_HHTAG + 1) + ')').text() == "1") {
        nwLoading_Start('actHoldingHst', crLoadingHTML);
        cust_GetPara();
        nwPopupForm_ShowModal("HoldingHst");
        $("#txtDocno_HH").val(crnwTR.find("td:eq(" + SPR_APVNO + ")").text());
        $("#txtRefno_HH").val(crnwTR.find("td:eq(" + SPR_REFNOSI + ")").text());
        nwParameter_Add("apvno", crnwTR.find("td:eq(" + SPR_APVNO + ")").text());
        func_ActionDriven("actHoldingHst", false);
    }



});

$(document).on("click", ".btnDMdetails", function () {
    if ($('#nwGridView-nwData tbody tr:eq(' + (crnwTR.index() - 1) + ') td:nth-child(' + (SPR_DMTAG + 1) + ')').text() == "1") {
        nwLoading_Start('xbtnDMdetails', crLoadingHTML);
        cust_GetPara();
        nwPopupForm_ShowModal("DMDetails");
        $("#txtPRFNo_DM").val(crnwTR.find("td:eq(" + SPR_DOCUMENTNO + ")").text());
        $("#txtAPVNo_DM").val(crnwTR.find("td:eq(" + SPR_APVNO + ")").text());
        nwParameter_Add("apvno", crnwTR.find("td:eq(" + SPR_APVNO + ")").text());
        func_ActionDriven("actDMDetails", false);

    }

});

$(document).on("click", ".btnPVdetails", function () {
    if ($('#nwGridView-nwData tbody tr:eq(' + (crnwTR.index() - 1) + ') td:nth-child(' + (SPR_PVTAG + 1) + ')').text() == "1") {
        nwLoading_Start('xbtnPVdetails', crLoadingHTML);
        cust_GetPara();
        nwPopupForm_ShowModal("PVDetails");
        $("#txtPRFNo_PV").val(crnwTR.find("td:eq(" + SPR_DOCUMENTNO + ")").text());
        $("#txtAPVNo_PV").val(crnwTR.find("td:eq(" + SPR_APVNO + ")").text());
        nwParameter_Add("apvno", crnwTR.find("td:eq(" + SPR_APVNO + ")").text());
        func_ActionDriven("actPVDetails", false);
    }

});

$(document).on("click", ".btnPayReldetails", function () {
    if ($('#nwGridView-nwData tbody tr:eq(' + (crnwTR.index() - 1) + ') td:nth-child(' + (SPR_PRTAG + 1) + ')').text() == "1") {
        nwLoading_Start('xbtnPayReldetails', crLoadingHTML);
        cust_GetPara();
        nwPopupForm_ShowModal("PayRelDetails");
        $("#txtPRFNo_PR").val(crnwTR.find("td:eq(" + SPR_DOCUMENTNO + ")").text());
        $("#txtAPVNo_PR").val(crnwTR.find("td:eq(" + SPR_APVNO + ")").text());
        nwParameter_Add("apvno", crnwTR.find("td:eq(" + SPR_APVNO + ")").text());
        func_ActionDriven("actPRDetails", false);
    }

});


$(document).on('click', '.btnRvwApprv_DM', function () {
    nwLoading_Start('xbtnApprvDtls', crLoadingHTML);
    nwPopupForm_ShowModal("nwRemarks");
    nwParameter_Add("docno", crnwTR.find("td:eq(" + SPR_DM_DOCNO + ")").text())
    func_ActionDriven("actViewApprovalDetails", false);
});

$(document).on('click', '.btnRvwApprv_PV', function () {
    nwLoading_Start('xbtnApprvDtls', crLoadingHTML);
    nwPopupForm_ShowModal("nwRemarks");
    nwParameter_Add("docno", crnwTR.find("td:eq(" + SPR_PV_DOCNO + ")").text())
    func_ActionDriven("actViewApprovalDetails", false);
});

$(document).on('click', '.btnRvwApprv_REQ', function () {
    nwLoading_Start('xbtnApprvDtls', crLoadingHTML);
    nwPopupForm_ShowModal("nwRemarks");
    nwParameter_Add("docno", crnwTR.find("td:eq(" + SPR_PV_REQCNLNO + ")").text())
    func_ActionDriven("actViewApprovalDetails", false);
});

$(document).on('click', '.btnRvwApprv_PVCNL', function () {
    nwLoading_Start('xbtnApprvDtls', crLoadingHTML);
    nwPopupForm_ShowModal("nwRemarks");
    nwParameter_Add("docno", crnwTR.find("td:eq(" + SPR_PV_PVCNLNO + ")").text())
    func_ActionDriven("actViewApprovalDetails", false);
});

$(document).on('click', '.btnRvwApprv_PR_REQ', function () {
    nwLoading_Start('xbtnApprvDtls', crLoadingHTML);
    nwPopupForm_ShowModal("nwRemarks");
    nwParameter_Add("docno", crnwTR.find("td:eq(" + SPR_PR_REQCNLNO + ")").text())
    func_ActionDriven("actViewApprovalDetails", false);
});

$(document).on('click', '.btnRvwApprv_PR_PYC', function () {
    nwLoading_Start('xbtnApprvDtls', crLoadingHTML);
    nwPopupForm_ShowModal("nwRemarks");
    nwParameter_Add("docno", crnwTR.find("td:eq(" + SPR_PR_PYCNO + ")").text())
    func_ActionDriven("actViewApprovalDetails", false);
});

$(document).on('click', '.btnRvwAttach_PV', function () {
    var pycno = crnwTR.find("td:eq(" + SPR_PV_PVCNLNO + ")").text();
    var reqno = crnwTR.find("td:eq(" + SPR_PV_REQCNLNO + ")").text();
    var pvno = crnwTR.find("td:eq(" + SPR_PV_DOCNO + ")").text();
    var payrelno = crnwTR.find("td:eq(" + SPR_PV_PAYRELNO + ")").text();
    var docno = '';
    if (pycno != '') {
        docno = pycno;
    }
    else if (reqno != '') {
        docno = reqno;
    }
    else if (payrelno != '') {
        docno = payrelno;
    }
    else {
        docno = pvno;
    }

    var fullength = "DCViewAttachment?isView=true&nwDocno=" + docno + "&isView=true";

    nwLoading_Start('xbtnViewAttach', crLoadingHTML);
    nwPopupForm_Create("nwPopUpViewAttach", true, fullength);
    $('#nwPopUpViewAttach .BoxTitle').text("View Attachment(s)");
    $("#nwPopUpViewAttach").css({ "min-width": "98%" });
    $("#nwPopUpViewAttach").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopUpViewAttach");
    nwLoading_End('xbtnViewAttach');
});


$(document).on('click', '.btnRvwAttach_PR', function () {
    var pycno = crnwTR.find("td:eq(" + SPR_PR_PYCNO + ")").text();
    var reqno = crnwTR.find("td:eq(" + SPR_PR_REQCNLNO + ")").text();
    var payrelno = crnwTR.find("td:eq(" + SPR_PR_DOCNO + ")").text();
    var docno = '';
    if (pycno != '') {
        docno = pycno;
    }
    else if (reqno != '') {
        docno = reqno;
    }
    else {
        docno = payrelno;
    }

    var fullength = "DCViewAttachment?isView=true&nwDocno=" + docno + "&isView=true";

    nwLoading_Start('xbtnViewAttach', crLoadingHTML);
    nwPopupForm_Create("nwPopUpViewAttach", true, fullength);
    $('#nwPopUpViewAttach .BoxTitle').text("View Attachment(s)");
    $("#nwPopUpViewAttach").css({ "min-width": "98%" });
    $("#nwPopUpViewAttach").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopUpViewAttach");
    nwLoading_End('xbtnViewAttach');
});


$(document).on('click', '.btnRvwAttach_DM', function () {
    var docno = crnwTR.find("td:eq(" + SPR_DM_DOCNO + ")").text();

    var fullength = "DCViewAttachment?isView=true&nwDocno=" + docno + "&isView=true";

    nwLoading_Start('xbtnViewAttach', crLoadingHTML);
    nwPopupForm_Create("nwPopUpViewAttach", true, fullength);
    $('#nwPopUpViewAttach .BoxTitle').text("View Attachment(s)");
    $("#nwPopUpViewAttach").css({ "min-width": "98%" });
    $("#nwPopUpViewAttach").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopUpViewAttach");
    nwLoading_End('xbtnViewAttach');
});

function getYearGridHeader(type) {
    switch (type) {
        case 1:
            return "As of Date: " + $('.isNumber.hasDatepicker').val();
            break;
        case 2:
            if ($('#radioAnnual').prop("checked")) {
                return "For the Year " + $('#cboAnnual').val();
            }

            if ($('#radioMonthly').prop("checked")) {
                return "For the Month of " + $('#cmbMonth option:selected').text();
            }

            if ($('#radioQuarter').prop("checked")) {
                return "For the " + $('#cmbQuarter option:selected').text()
            }

            if ($('#radioDate').prop("checked")) {
                return "Date Covered: " + $('#txtDateFrom').val() + " - " + $('#txtDateTo').val()
            }
            break;
    }
}

function getloadfilterexport() {
    var count = $('.spantext').length;
    var allloc = "";
    for (var i = 0; i <= count; i++) {
        var loc = $('.atl_Location .spantext:eq(' + i + ')').text().substring(0, $('.spantext:eq(' + i + ')').text().length - 1);

        if (loc.length > 0) {
            allloc += loc + ";";
        }
    }
    allloc = allloc.substring(0, allloc.length - 1)
    if (allloc.length == 0) {
        //nwParameter_Add("LocationFilter", "Multiple Locations");
    } else {
        nwParameter_Add("LocationFilter", allloc);
    }
}



    

function nwgrid_PaginationNavDone() {
    colorBtn();
    PRGridProp();
    PVGridProp();
    DMGridProp();
}

function p8Spread_Click(canvasID, row, col) {
    //console.log("p8Spread_Click " + canvasID + " " + row + " " + col);

    //$('#txtCanvasClick').text(canvasID);
    //$('#txtRowClick').text(row);
    //$('#txtColumnClick').text(col);
    if (canvasID == "nwGridMainCon") {
        nwGridMainCon_Book.ActiveSheet.RenderStatus = false;
        var reportType = 0;
        var docno = '', trantype = '', menuitem = '', menulink = '', printingid = '', printingname = '';
        if (row >= 10) {

            apvno = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_APVNO - 1, row);
            refnosi = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_REFNOSI - 1, row);
            if (col == (SPR_HOLDHST - 1)) {
                if (nwGridMainCon_Book.ActiveSheet.GetValue(SPR_HHTAG - 1, row) == "1") {
                    nwLoading_Start('actHoldingHst', crLoadingHTML);
                    cust_GetPara();
                    nwPopupForm_ShowModal("HoldingHst");
                    $("#txtDocno_HH").val(apvno);
                    $("#txtRefno_HH").val(refnosi);
                    nwParameter_Add("apvno", apvno);
                    func_ActionDriven("actHoldingHst", false);
                }
            }
            if (col == (SPR_RVWATTACH - 1)) {
                if (nwGridMainCon_Book.ActiveSheet.GetValue(SPR_RATAG - 1, row) != "1") {
                    return false;
                }


                var docno = '';
                var prfno = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_DOCUMENTNO - 1, row);
                var apvno = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_APVNO - 1, row);

                if (apvno != '') {
                    docno = apvno;
                }
                else {
                    docno = prfno;
                }

                var fullength = "DCViewAttachment?isView=true&nwDocno=" + docno + "";

                nwLoading_Start('xbtnViewAttach', crLoadingHTML);
                nwPopupForm_Create("nwPopUpViewAttach", true, fullength);
                $('#nwPopUpViewAttach .BoxTitle').text("View Attachment(s)");
                $("#nwPopUpViewAttach").css({ "min-width": "98%" });
                $("#nwPopUpViewAttach").css({ "min-height": "98%" });
                nwPopupForm_ShowModal("nwPopUpViewAttach");
                nwLoading_End('xbtnViewAttach');
            }
            if (col == (SPR_APPROVALDTLS - 1)) {
                if (nwGridMainCon_Book.ActiveSheet.GetValue(SPR_RVWTAG - 1, row) == "1") {
                    nwLoading_Start('xbtnApprvDtls', crLoadingHTML);
                    nwPopupForm_ShowModal("nwRemarks");
                    nwParameter_Add("docno", nwGridMainCon_Book.ActiveSheet.GetValue(SPR_DOCUMENTNO - 1, row))
                    func_ActionDriven("actViewApprovalDetails", false);
                }
            }
            if (col == (SPR_DMDETAILS - 1)) {

                if (nwGridMainCon_Book.ActiveSheet.GetValue(SPR_DMTAG - 1, row) == "1") {
                    nwLoading_Start('xbtnDMdetails', crLoadingHTML);
                    cust_GetPara();
                    nwPopupForm_ShowModal("DMDetails");
                    $("#txtPRFNo_DM").val(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_DOCUMENTNO - 1, row));
                    $("#txtAPVNo_DM").val(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_APVNO - 1, row));
                    nwParameter_Add("apvno", nwGridMainCon_Book.ActiveSheet.GetValue(SPR_APVNO - 1, row));
                    func_ActionDriven("actDMDetails", false);

                }
            }
            if (col == (SPR_PVDETAILS - 1)) {
                if (nwGridMainCon_Book.ActiveSheet.GetValue(SPR_PVTAG - 1, row) == "1") {
                    nwLoading_Start('xbtnPVdetails', crLoadingHTML);
                    cust_GetPara();
                    nwPopupForm_ShowModal("PVDetails");
                    $("#txtPRFNo_PV").val(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_DOCUMENTNO - 1, row));
                    $("#txtAPVNo_PV").val(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_APVNO - 1, row));
                    nwParameter_Add("apvno", nwGridMainCon_Book.ActiveSheet.GetValue(SPR_APVNO - 1, row));
                    func_ActionDriven("actPVDetails", false);
                }
            }
            if (col == (SPR_PAYRELDTL - 1)) {

                if (nwGridMainCon_Book.ActiveSheet.GetValue(SPR_PRTAG - 1, row) == "1") {
                    nwLoading_Start('xbtnPayReldetails', crLoadingHTML);
                    cust_GetPara();
                    nwPopupForm_ShowModal("PayRelDetails");
                    $("#txtPRFNo_PR").val(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_DOCUMENTNO - 1, row));
                    $("#txtAPVNo_PR").val(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_APVNO - 1, row));
                    nwParameter_Add("apvno", nwGridMainCon_Book.ActiveSheet.GetValue(SPR_APVNO - 1, row));
                    func_ActionDriven("actPRDetails", false);
                }

            }

        }

        nwGridMainCon_Book.ActiveSheet.RenderStatus = true;
    }
    if (canvasID == "nwGridHoldHst") {
        nwGridHistCon_Book.ActiveSheet.RenderStatus = false;

        
        if (col == (SPR_HH_REQCOMP - 1)) {
            if (nwGridHistCon_Book.ActiveSheet.GetValue(SPR_HH_REQTAG - 1, row) != "1") {
                return false;
            }

            var docno = nwGridHistCon_Book.ActiveSheet.GetValue(SPR_DM_DOCNO - 1, row);

            var fullength = "DCRecquirementCompliance?isView=true&nwDocno=" + docno + "&isView=true";

            nwLoading_Start('xbtnRecquirementCompliance', crLoadingHTML);
            nwPopupForm_Create("nwPopUpRecquirementCompliance", true, fullength);
            $('#nwPopUpRecquirementCompliance .BoxTitle').text("RecquirementCompliance(s)");
            $("#nwPopUpRecquirementCompliance").css({ "min-width": "98%" });
            $("#nwPopUpRecquirementCompliance").css({ "min-height": "98%" });
            nwPopupForm_ShowModal("nwPopUpRecquirementCompliance");
            nwLoading_End('xbtnRecquirementCompliance');

        }
        nwGridHistCon_Book.ActiveSheet.RenderStatus = true;
    }
    if (canvasID == "nwGridDM") {
        nwGridDMCon_Book.ActiveSheet.RenderStatus = false;

        if (col == (SPR_DM_RVWAPPRV - 1)) {
            if (nwGridDMCon_Book.ActiveSheet.GetValue(SPR_DM_RADTAG - 1, row) == "1") {
                var reqno = nwGridDMCon_Book.ActiveSheet.GetValue(SPR_DM_DOCNO - 1, row);

                var docno = reqno;

                nwLoading_Start('xbtnApprvDtls', crLoadingHTML);
                nwPopupForm_ShowModal("nwRemarks");
                nwParameter_Add("docno", docno)
                func_ActionDriven("actViewApprovalDetails", false);
            }

        }

        if (col == (SPR_DM_RVWATTACH - 1)) {
            if (nwGridDMCon_Book.ActiveSheet.GetValue(SPR_DM_RATAG - 1, row) != "1") {
                return false;
            }

            var docno = nwGridDMCon_Book.ActiveSheet.GetValue(SPR_DM_DOCNO - 1, row);

            var fullength = "DCViewAttachment?isView=true&nwDocno=" + docno + "&isView=true";

            nwLoading_Start('xbtnViewAttach', crLoadingHTML);
            nwPopupForm_Create("nwPopUpViewAttach", true, fullength);
            $('#nwPopUpViewAttach .BoxTitle').text("View Attachment(s)");
            $("#nwPopUpViewAttach").css({ "min-width": "98%" });
            $("#nwPopUpViewAttach").css({ "min-height": "98%" });
            nwPopupForm_ShowModal("nwPopUpViewAttach");
            nwLoading_End('xbtnViewAttach');

        }
        nwGridDMCon_Book.ActiveSheet.RenderStatus = true;
    }

    if (canvasID == "nwGridPV") {
        nwGridPVCon_Book.ActiveSheet.RenderStatus = false;
        if (col == (SPR_PV_RVWAPPRV_PV - 1)) {
            if (nwGridPVCon_Book.ActiveSheet.GetValue(SPR_PV_RATAG_PV - 1, row) == "1") {
            var reqno = nwGridPVCon_Book.ActiveSheet.GetValue(SPR_PV_DOCNO - 1, row);

            var docno = reqno;

            nwLoading_Start('xbtnApprvDtls', crLoadingHTML);
            nwPopupForm_ShowModal("nwRemarks");
            nwParameter_Add("docno", docno)
            func_ActionDriven("actViewApprovalDetails", false);
            }

        }
        if (col == (SPR_PV_RVWAPPRV_REQ - 1)) {
            if (nwGridPVCon_Book.ActiveSheet.GetValue(SPR_PV_RATAG_REQ - 1, row) == "1") {
            var reqno = nwGridPVCon_Book.ActiveSheet.GetValue(SPR_PV_REQCNLNO - 1, row);

            var docno = reqno;

            nwLoading_Start('xbtnApprvDtls', crLoadingHTML);
            nwPopupForm_ShowModal("nwRemarks");
            nwParameter_Add("docno", docno)
            func_ActionDriven("actViewApprovalDetails", false);
            }

        }

        if (col == (SPR_PV_RVWAPPRV_PVCNL - 1)) {
            if (nwGridPVCon_Book.ActiveSheet.GetValue(SPR_PV_RATAG_PYC - 1, row) == "1") {
            var reqno = nwGridPVCon_Book.ActiveSheet.GetValue(SPR_PV_PVCNLNO - 1, row);

            var docno = reqno;


            nwLoading_Start('xbtnApprvDtls', crLoadingHTML);
            nwPopupForm_ShowModal("nwRemarks");
            nwParameter_Add("docno", docno)
            func_ActionDriven("actViewApprovalDetails", false);
            }

        }

        if (col == (SPR_PV_RVWATTACH - 1)) {
            if (nwGridPVCon_Book.ActiveSheet.GetValue(SPR_PV_RATAG_RA - 1, row) != "1") {
                return false;
            }
            var pycno = nwGridPVCon_Book.ActiveSheet.GetValue(SPR_PV_PVCNLNO - 1, row);
            var reqno = nwGridPVCon_Book.ActiveSheet.GetValue(SPR_PV_REQCNLNO - 1, row);
            var pvno = nwGridPVCon_Book.ActiveSheet.GetValue(SPR_PV_DOCNO - 1, row);
            var payrelno = nwGridPVCon_Book.ActiveSheet.GetValue(SPR_PV_PAYRELNO - 1, row);

                var docno = '';
                if (pycno != '') {
                    docno = pycno;
                }
                else if (reqno != '') {
                    docno = reqno;
                }
                else if (payrelno != '') {
                    docno = payrelno;
                }
                else {
                    docno = pvno;
                }

            var fullength = "DCViewAttachment?isView=true&nwDocno=" + docno + "";

            nwLoading_Start('xbtnViewAttach', crLoadingHTML);
            nwPopupForm_Create("nwPopUpViewAttach", true, fullength);
            $('#nwPopUpViewAttach .BoxTitle').text("View Attachment(s)");
            $("#nwPopUpViewAttach").css({ "min-width": "98%" });
            $("#nwPopUpViewAttach").css({ "min-height": "98%" });
            nwPopupForm_ShowModal("nwPopUpViewAttach");
            nwLoading_End('xbtnViewAttach');

        }
        nwGridPVCon_Book.ActiveSheet.RenderStatus = true;
    }

    if (canvasID == "nwGridPR") {
        nwGridPRCon_Book.ActiveSheet.RenderStatus = false;
        if (col == (SPR_PR_RVWAPPRV_REQ - 1)) {
            if (nwGridPRCon_Book.ActiveSheet.GetValue(SPR_PR_RATAG_REQ - 1, row) == "1") {
            var reqno = nwGridPRCon_Book.ActiveSheet.GetValue(SPR_PR_REQCNLNO - 1, row);

            var docno = reqno;

            nwLoading_Start('xbtnApprvDtls', crLoadingHTML);
            nwPopupForm_ShowModal("nwRemarks");
            nwParameter_Add("docno", docno)
            func_ActionDriven("actViewApprovalDetails", false);
            }


        }

        if (col == (SPR_PR_RVWAPPRV_PYC - 1)) {
            if (nwGridPRCon_Book.ActiveSheet.GetValue(SPR_PR_RATAG_PYC - 1, row) == "1") {
            var reqno = nwGridPRCon_Book.ActiveSheet.GetValue(SPR_PR_PYCNO - 1, row);

            var docno = reqno;
            

            nwLoading_Start('xbtnApprvDtls', crLoadingHTML);
            nwPopupForm_ShowModal("nwRemarks");
            nwParameter_Add("docno", docno)
            func_ActionDriven("actViewApprovalDetails", false);
            }

        }

        if (col == (SPR_PR_RVWATTACH_PYC - 1)) {
            if (nwGridPRCon_Book.ActiveSheet.GetValue(SPR_PR_RATAG_RV - 1, row) != "1") {
                return false;
            }

            var pycno = nwGridPRCon_Book.ActiveSheet.GetValue(SPR_PR_PYCNO - 1, row);
            var reqno = nwGridPRCon_Book.ActiveSheet.GetValue(SPR_PR_REQCNLNO - 1, row);
            var payrelno = nwGridPRCon_Book.ActiveSheet.GetValue(SPR_PR_DOCNO - 1, row);

            
            var docno = '';
            if (pycno != '') {
                docno = pycno;
            }
            else if (reqno != '') {
                docno = reqno;
            }
            else {
                docno = payrelno;
            }

            var fullength = "DCViewAttachment?isView=true&nwDocno=" + docno + "";

            nwLoading_Start('xbtnViewAttach', crLoadingHTML);
            nwPopupForm_Create("nwPopUpViewAttach", true, fullength);
            $('#nwPopUpViewAttach .BoxTitle').text("View Attachment(s)");
            $("#nwPopUpViewAttach").css({ "min-width": "98%" });
            $("#nwPopUpViewAttach").css({ "min-height": "98%" });
            nwPopupForm_ShowModal("nwPopUpViewAttach");
            nwLoading_End('xbtnViewAttach');

        }
        nwGridPRCon_Book.ActiveSheet.RenderStatus = true;
    }
    
}