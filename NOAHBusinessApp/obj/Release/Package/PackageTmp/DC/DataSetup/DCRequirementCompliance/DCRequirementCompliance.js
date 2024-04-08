
baseTitle = "Requirements Compliance";

var SPR_COMPILEDHDR = 1,
    SPR_REQUIREDHDR = 2,
    SPR_ALTERNATIVE = 3,
    SPR_DOCUMENTGRP = 4,
    SPR_WORKINSTRUCTIONS = 5,
    SPR_DOCDETAILSCODEHDR = 6,
    SPR_DOCDETAILSHDR = 7,
    SPR_DOCNOHDR = 8,
    SPR_DOCDATEHDR = 9,
    SPR_EXPIRYDATEHDR = 10,
    SPR_URLHDR = 11,
    SPR_ATTACHHDR = 12,
    SPR_VIEWHDR = 13,
    SPR_REMOVEHDR = 14,
    SPR_TAGDOCNOHDR = 15,
    SPR_TAGDOCDATEHDR = 16,
    SPR_TAGEXPIRYDATEHDR = 17,
    SPR_TAGATTACHHDR = 18,
    SPR_TAGURLHDR = 19,
    SPR_FILEPATH = 20,
    SPR_DELETEROW = 21,
    SPR_TAG = 22,
    SPR_GRPNO = 23,
    SPR_DEPT = 24,
    SPR_TYPE = 25,
    SPR_LINEID = 26,
    SPR_FORCONFALL = 27;

let tranNo = "";
let tranType = "";
let ItemG = "";
let isView = "";
let status = "";
let nwApplyTo = "";
let details = "";
let nwDepartment = "";
let nwOrderType = "";
let nwDocDtls = "";
var mbSize = "";

var globalRow;

var nwGrid_Book;
var nwGrid_Sheet;
var currentRow;

function func_Reload() {
    LoadStringsCases();

    crLnk = GetCurrentURL() + "DCRequirementCompliance_Gateway";
    crLnkGateKey = "DCRequirementCompliance";

    DisableFields();
    //tranNo
    tranNo = getParameterByName("TransactionNo");
    nwParameter_Add("TransactionNo", tranNo);

    tranType = getParameterByName("TranType");
    nwParameter_Add("TranType", tranType);

    ItemG = getParameterByName("nwItemG");
    nwParameter_Add("nwItemG", ItemG);

    nwLineID = getParameterByName("nwLineID");
    nwParameter_Add("nwLineID", nwLineID);

    nwRownum = getParameterByName("nwRownum");
    nwParameter_Add("nwRownum", nwRownum);

    isView = getParameterByName("isView");
    nwParameter_Add("isView", isView);

    nwApplyTo = getParameterByName("nwApplyTo");
    nwParameter_Add("nwApplyTo", nwApplyTo);

    details = getParameterByName("nwDetails");
    nwParameter_Add("nwDetails", details);

    nwDepartment = getParameterByName("nwDepartment");
    nwParameter_Add("nwDepartment", nwDepartment);

    nwOrderType = getParameterByName("nwOrderType");
    nwParameter_Add("nwOrderType", nwOrderType);

    nwDocDtls = getParameterByName("nwDocDtls");
    nwParameter_Add("nwDocDtls", nwDocDtls);

    nwPopupForm_Create("docattview", true);
    nwPopupForm_Create("nwUploadCon", false);

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
    return isContinue;
}

function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    nwParameter_Add_Spread(nwGrid_Book);
    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", baseTitle, "", indef, enume);
    isContinue = false;

    return isContinue;
}


function func_ToolboxProcess(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to process the current record?", baseTitle, "", indef, enume);
    isContinue = false;

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
    tranNo = getParameterByName("TransactionNo");
    nwParameter_Add("TransactionNo", tranNo);

    tranType = getParameterByName("TranType");
    nwParameter_Add("TranType", tranType);

    nwApplyTo = getParameterByName("nwApplyTo");
    nwParameter_Add("nwApplyTo", nwApplyTo);

    details = getParameterByName("nwDetails");
    nwParameter_Add("nwDetails", details);

    nwDepartment = getParameterByName("nwDepartment");
    nwParameter_Add("nwDepartment", nwDepartment);

    nwOrderType = getParameterByName("nwOrderType");
    nwParameter_Add("nwOrderType", nwOrderType);

    nwDocDtls = getParameterByName("nwDocDtls");
    nwParameter_Add("nwDocDtls", nwDocDtls);

    //nwLineID = getParameterByName("nwLineID");
    //nwParameter_Add("nwLineID", nwLineID);

    //nwRownum = getParameterByName("nwRownum");
    //nwParameter_Add("nwRownum", nwRownum);

    nwParameter_Add("nwItemG", ItemG);

    nwParameter_Add("idvallugVendor", $("#idvallugVendor").val());
    nwParameter_Add("txtRemarks", $("#txtRemarks").val());
    nwParameter_Add("txtTranDate", $("#txtTranDate").val());
    nwParameter_Add("txtLineID", $("#txtLineID").val());
    nwParameter_Add("txtRownum", $("#txtRownum").val());
    nwParameter_Add("nwtxt_ModDate", $('#nwtxt_ModDate').text());

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

    nwLoading_Start("actBindCollectionEmpty", crLoadingHTML);
    DisableFieldsEmpty();
    func_ActionDriven("actBindCollectionEmpty", false);
}
///////////////////////////////////////


function CreatedGridDone() {
    setTimeout(function () {
        //SPR_ATTACHHDR = 12,
        //SPR_REMOVEHDR = 14,

        //nwGrid_Book.ActiveSheet.SetBackground(SPR_VIEWHDR - 1, Spread_ALLROW, "#1974D1");

        nwGrid_Book.ActiveSheet.RenderStatus = false;
        nwGrid_Book.ActiveSheet.SetText2(SPR_VIEWHDR - 1, Spread_ALLROW, "View");
        nwGrid_Book.ActiveSheet.SetTextAlign(SPR_VIEWHDR - 1, Spread_ALLROW, "CENTER");
        nwGrid_Book.SetThemes(P8Themes.FANCY);
        nwGrid_Book.ActiveSheet.SetObjectType(SPR_VIEWHDR - 1, Spread_ALLCOL, "buttonflat");
        nwGrid_Book.ActiveSheet.RenderStatus = true;
    }, 100);
}

var temp_crnwTR = "";

function EnableFields() {

    $("#lugVendor").enable(true);
    $("#txtTranDate").enable(true);
    $("#txtRemarks").enable(true);
    $("#btnReqCompliance").enable(true);
    $("#nwGridCon").enable(true);
    $("#nwGrid1").enable(true);

}
function DisableFields() {

    $("#lugVendor").enable(false);
    $("#txtTranDate").enable(false);
    $("#txtRemarks").enable(false);
    $("#btnReqCompliance").enable(false);
    $("#noah-webui-Toolbox").bindingImport().enable(false);
}

function EnableFieldsDone() { //Binding Done

    $("#lugVendor").enable(false);
    $("#txtTranDate").enable(false)
    $("#txtRemarks").enable(true);
    $("#btnReqCompliance").enable(true);
    $("#nwGridCon").enable(true);
    $("#nwGrid1").enable(true);

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
    $("#txtTranDate").enable(false)
    $("#txtRemarks").enable(false);
    $("#nwGridCon").enable(false);
    $("#nwGrid1").enable(false);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
}

function ClearFields() {

    $("#txtTranDate").val("");
    $("#txtTransactionNo").val("");
    $("#idvallugVendor").val("");
    $("#descvallugVendor").val("");
    $("#txtRemarks").val("");

}

//$(document).on("click", ".btnView", function (e) {
//    var SpecItemAttach = $('#attachedfilepath').val();
//    if (SpecItemAttach == '') {
//        MessageBox("No attachment found.", 'Upload'); e
//        return false;
//    }
//});

function RefreshData() {

    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}

/* ###STNDRD FUNC */
function func_LookUpInitialize(id) {
    if (id == "lugDocDtlHdr") {
        //crnwTable = $("#nwGrid2 .tblGridBody tbody");
        var length = nwGrid_Book.ActiveSheet.Data.length;
        var dcList = "";

        for (var i = 0; i < length; i++) {
            if (nwGrid_Book.ActiveSheet.GetValue(SPR_DOCDETAILSCODEHDR - 1, i) != "") {
                dcList += nwGrid_Book.ActiveSheet.GetValue(SPR_DOCDETAILSCODEHDR - 1, i) + "|";
            }
        }
        nwParameter_Add("dcList", dcList);
    }
}

function nwGrid_AddtoListLoaded(tbl) {
    //if (tbl.attr("id") == "nwGrid2-nwData" || tbl.attr("id") == "nwGrid2") {
        //crnwTable = $("#nwGrid2 .tblGridBody");
        //var len = crnwTable.find('tr').length;
    var len = nwGrid_Book.ActiveSheet.GetMaxRow(tbl);

       
        GridValidation();
    //}

}


function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
    //var cnt = nwLib.nwTempTable_Row_Count("nwGrid2");
    var cnt = nwGrid_Book.ActiveSheet.GetMaxRow('nwGrid2');

    //if (crnwTD.index() == SPR_DOCDETAILSCODEHDR) {
    if (nwGrid_Book.ActiveSheet.CellSelected.col - 1 == SPR_DOCDETAILSCODEHDR - 1) {

        var code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
        var desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
        var reqDocno = addtoListTableRec.find('tr:eq(' + index + ') td:eq(5)').text();
        var reqDocdate = addtoListTableRec.find('tr:eq(' + index + ') td:eq(6)').text();
        var reqExpDate = addtoListTableRec.find('tr:eq(' + index + ') td:eq(7)').text();
        var reqURL = addtoListTableRec.find('tr:eq(' + index + ') td:eq(8)').text();
        //var isValid = nwLib.nwTempTable_Column_ValueExist("nwGrid2", 1, code, false, "text", 0);
        
        //if (isValid == false) {
        //crnwTRtemp.find('td:eq(' + SPR_DOCDETAILSCODEHDR + ')').text(code);
        //crnwTRtemp.find('td:eq(' + SPR_DOCDETAILSHDR + ')').text(desc);
        //crnwTRtemp.find('td:eq(' + SPR_TAGDOCNOHDR + ')').text(reqDocno);
        //crnwTRtemp.find('td:eq(' + SPR_TAGDOCDATEHDR + ')').text(reqDocdate);
        //crnwTRtemp.find('td:eq(' + SPR_TAGEXPIRYDATEHDR + ')').text(reqExpDate);
        //crnwTRtemp.find('td:eq(' + SPR_TAGURLHDR + ')').text(reqURL);
        //crnwTRtemp.find('td:eq(' + SPR_WORKINSTRUCTIONS + ') input').val(workIns_);


        crnwTRtemp[SPR_DOCDETAILSCODEHDR - 1] = code;
        crnwTRtemp[SPR_DOCDETAILSHDR - 1] = desc;
        crnwTRtemp[SPR_TAGDOCNOHDR - 1] = reqDocno;
        crnwTRtemp[SPR_TAGDOCDATEHDR - 1] = reqDocdate;
        crnwTRtemp[SPR_TAGEXPIRYDATEHDR - 1] = reqExpDate;
        crnwTRtemp[SPR_TAGURLHDR - 1] = reqURL;
        crnwTRtemp[SPR_WORKINSTRUCTIONS - 1] = workIns_;

        if (cnt == nwGrid_Book.ActiveSheet.CellSelected.row ) {

            //nwGrid_Book.ActiveSheet.RowAdd();
            GridValidation();
        }
        // nwGrid_AddRow("nwGrid2", 1);


        //}
        //else {
        //    crnwTRtemp = null;
        //}        
    }    
    return crnwTRtemp;
}


/* ###GRID FUNC */

function fn_nwgridNext(nwgridID) {
    var isContinue = true;
    return isContinue;
}

function fn_nwgridPrev(nwgridID) {
    var isContinue = true;
    return isContinue;
}

function fn_nwgridFirst(nwgridID) {
    var isContinue = true;
    return isContinue;
}

function fn_nwgridLast(nwgridID) {
    var isContinue = true;
    return isContinue;
}


function nwGrdi_Change(nwGridObj, crTR, crTD) {
    if (nwGridObj.attr("id") == "") {
        if (crnwTD.index() == "") {
        }
    }
}


var verID = ''

$(document).on('change', '#txtTranDate', function () {
    var EffectiveDate = formatDate(new Date($("#txtTranDate").val()));
    var serverdate = formatDate(new Date());

    if (new Date(EffectiveDate) > new Date(serverdate)) {

        MessageBox("Date should be equal to the current server date.", baseTitle, 'error');
        verID = 'Date';
        $("#txtTranDate").val("")
    }

});


function formatDate(date) {
    var monthNames = [
      "1", "2", "3",
      "4", "5", "6", "7",
      "8", "9", "10",
      "11", "12"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return monthNames[monthIndex] + '/' + day + '/' + year;
}



function Lookup_DoneFunction(idName, idNum) {

    var code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (0) + ")").text();
    var desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (1) + ")").text();
    var tempdesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (2) + ")").text();
    var tagDocno = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (2) + ")").text();
    var tagDocdate = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (3) + ")").text();
    var tagEx = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (4) + ")").text();
    var tagURl = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (5) + ")").text();

    var currentRow = crnwTR.index();

    if (idName == 'toolboxInquire') {
        cust_GetPara();
    }

    if (idName == 'lugDocDtlHdr') {
        //nwLib.nwTempTable_RowData_Set("nwGrid2", crnwTR.index(), SPR_DOCDETAILSCODEHDR)(code);
        //nwLib.nwTempTable_RowData_Set("nwGrid2", crnwTR.index(), SPR_DOCDETAILSHDR)(desc);
        //nwLib.nwTempTable_RowData_Set("nwGrid2", crnwTR.index(), SPR_TAGDOCNOHDR)(tagDocno);
        //nwLib.nwTempTable_RowData_Set("nwGrid2", crnwTR.index(), SPR_TAGDOCDATEHDR)(tagDocdate);
        //nwLib.nwTempTable_RowData_Set("nwGrid2", crnwTR.index(), SPR_TAGEXPIRYDATEHDR)(tagEx);
        //nwLib.nwTempTable_RowData_Set("nwGrid2", crnwTR.index(), SPR_TAGURLHDR)(tagURl);

        nwLib.nwTempTable_RowData_Set("nwGrid2", nwGrid_Book.ActiveSheet.CellIndexes.Row, SPR_DOCDETAILSCODEHDR)(code);
        nwLib.nwTempTable_RowData_Set("nwGrid2", nwGrid_Book.ActiveSheet.CellIndexes.Row, SPR_DOCDETAILSHDR)(desc);
        nwLib.nwTempTable_RowData_Set("nwGrid2", nwGrid_Book.ActiveSheet.CellIndexes.Row, SPR_TAGDOCNOHDR)(tagDocno);
        nwLib.nwTempTable_RowData_Set("nwGrid2", nwGrid_Book.ActiveSheet.CellIndexes.Row, SPR_TAGDOCDATEHDR)(tagDocdate);
        nwLib.nwTempTable_RowData_Set("nwGrid2", nwGrid_Book.ActiveSheet.CellIndexes.Row, SPR_TAGEXPIRYDATEHDR)(tagEx);
        nwLib.nwTempTable_RowData_Set("nwGrid2", nwGrid_Book.ActiveSheet.CellIndexes.Row, SPR_TAGURLHDR)(tagURl);
        
        AutoCompiled(currentRow);
    }

}

var workIns_ = '';
//function nwGrdi_DblClick(nwGridObj, crTR, crTD) {
//    var currentRow = crnwTR.index();
//    if (nwGridObj.attr("id") == "nwGrid2") {
//        if (crnwTD.index() == SPR_DOCDETAILSCODEHDR) {
//            lookUpCustomize("lugDocDtlHdr", 2);
//            workIns_ = crnwTR.find("td:eq(" + SPR_WORKINSTRUCTIONS + ") input").val();
//        }
//    }
//}

function IfUsed(used) {

    if (used) {
        $('#nwGridCon').enable(true);
    }
    else {
        $('#nwGridCon').enable(false);
    }

    $("#lugItemGType,#lugLevel1,#lugLevel2").enable(used);
    $("#txtDueDate").enable(used)
    $("#noah-webui-Toolbox").bindingSave().enable(used);

}

//function DisabledLoadedData()
//{
//    var $row = ""
//    $(`#nwGrid2-nwData tr`).each(function (i, n) {
//        $row = $(n);

//        if ($row.find(`td:eq(${SPR_TAG})`).text() !="") {
//            $row.find()
//        }
//    });
//}

//$(document).on("change", ".txtWorkInstructions", function () {
//    let currentRow = crnwTR.index() + 1;
//    crnwTable = $("#nwGrid2 .tblGridBody tbody");
//    var length = crnwTable.find("tr").length;

//    if (currentRow == length) {
//        nwGrid_AddRow("nwGrid2", 1);

//        crnwTable.find("tr:eq(" + length + ")").find("td:eq(" + SPR_REQUIREDHDR + ") input").enable(false);
//        crnwTable.find("tr:eq(" + length + ")").find("td:eq(" + SPR_COMPILEDHDR + ") input").enable(false);
//        crnwTable.find("tr:eq(" + length + ")").find("td:eq(" + SPR_ALTERNATIVE + ") input").enable(false);

//    }

//    if ($("#nwGrid2Con-nwData tbody tr:eq(" + crnwTR.index() + ") td:eq(" + SPR_DOCDETAILSCODEHDR + ")").text() == '') {
//        AutoCompiled(crnwTR.index());
//    }

//});

function GridValidation() {
    var $row;
    var isLoaded;

    //crnwTable = $("#nwGrid2 .tblGridBody");

    //var len = crnwTable.find("tr").length;

    nwGrid_Book.ActiveSheet.RenderStatus = false;

    var len = nwGrid_Book.ActiveSheet.Data.length;
    nwGrid_Book.ActiveSheet.SetEnable(SPR_DOCDETAILSCODEHDR - 1, Spread_ALLROW, true);

    for (var i = 0; i < len ; i++) {
        //isLoaded = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_TAG + ")").text();
        isLoaded = nwGrid_Book.ActiveSheet.GetValue(SPR_TAG-1,i); 

        // From BL to JS
        nwGrid_Book.ActiveSheet.SetEnable(SPR_ALTERNATIVE - 1, i, false);

        //enable fields
        nwGrid_Book.ActiveSheet.SetEnable(SPR_DOCNOHDR - 1, i, true);
        nwGrid_Book.ActiveSheet.SetEnable(SPR_DOCDATEHDR - 1, i, true);
        nwGrid_Book.ActiveSheet.SetEnable(SPR_EXPIRYDATEHDR - 1, i, true);
        nwGrid_Book.ActiveSheet.SetEnable(SPR_URLHDR - 1, i, true);


        if (isLoaded) {
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQUIREDHDR + ") input").enable(false);
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_WORKINSTRUCTIONS + ") input").enable(false);
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_WORKINSTRUCTIONS + ") input").css("background-color", "gainsboro");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_WORKINSTRUCTIONS + ")").css("background-color", "gainsboro");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQUIREDHDR + ") input").enable(false);
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DOCDETAILSCODEHDR + ")").enable(false);
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DOCDETAILSCODEHDR + ")").css('background-color', 'gainsboro');


            nwGrid_Book.ActiveSheet.SetEnable(SPR_REQUIREDHDR - 1, i, false);
            nwGrid_Book.ActiveSheet.SetEnable(SPR_WORKINSTRUCTIONS - 1, i, false);
            nwGrid_Book.ActiveSheet.SetEnable(SPR_REQUIREDHDR - 1, i, false);
            nwGrid_Book.ActiveSheet.SetEnable(SPR_DOCDETAILSCODEHDR - 1, i, false);
            //nwGrid_Book.ActiveSheet.SetBackground(SPR_DOCDETAILSCODEHDR - 1, i,"gainsboro");
            //nwGrid_Book.ActiveSheet.SetBackground(SPR_WORKINSTRUCTIONS - 1, i, "gainsboro");
            //nwGrid_Book.ActiveSheet.SetBackground(SPR_WORKINSTRUCTIONS - 1, i, "gainsboro");


        }
        else {
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQUIREDHDR + ") input").enable(false);
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_COMPILEDHDR + ") input").enable(false);
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ALTERNATIVE + ") input").enable(false);
            nwGrid_Book.ActiveSheet.SetEnable(SPR_REQUIREDHDR - 1, i, false);
            nwGrid_Book.ActiveSheet.SetEnable(SPR_COMPILEDHDR - 1, i, false);
            nwGrid_Book.ActiveSheet.SetEnable(SPR_ALTERNATIVE - 1, i, false);

            nwGrid_Book.ActiveSheet.SetEnable(SPR_WORKINSTRUCTIONS - 1, i, true);
            nwGrid_Book.ActiveSheet.SetEnable(SPR_DOCDETAILSCODEHDR - 1, i, true);

        }
        //let filepath = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_FILEPATH + ")").text();

        let filepath = nwGrid_Book.ActiveSheet.GetValue(SPR_FILEPATH - 1, i);

        if (filepath != "") {
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VIEWHDR + ") a").addClass("green");
            nwGrid_Book.ActiveSheet.SetBackground(SPR_VIEWHDR - 1, i, "green");
            nwGrid_Book.ActiveSheet.SetTextColor(SPR_VIEWHDR - 1, i, "white");

        }
        else {
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VIEWHDR + ") a").removeClass("green");
            nwGrid_Book.ActiveSheet.SetBackground(SPR_VIEWHDR - 1, i, "white");
            nwGrid_Book.ActiveSheet.SetTextColor(SPR_VIEWHDR - 1, i, "black");

        }
    }
    nwGrid_Book.ActiveSheet.SetBackground(SPR_ATTACHHDR - 1, Spread_ALLROW, "#1974D1");
    nwGrid_Book.ActiveSheet.SetTextColor(SPR_ATTACHHDR - 1, Spread_ALLROW, "white");
    nwGrid_Book.ActiveSheet.SetTextAlign(SPR_ATTACHHDR - 1, Spread_ALLROW, "CENTER");
    nwGrid_Book.ActiveSheet.SetObjectType(SPR_ATTACHHDR - 1, Spread_ALLCOL, "buttonflat");
    nwGrid_Book.ActiveSheet.SetText2(SPR_ATTACHHDR - 1, Spread_ALLROW, "Attach");


    nwGrid_Book.ActiveSheet.SetBackground(SPR_VIEWHDR - 1, Spread_ALLROW, "#1974D1");
    nwGrid_Book.ActiveSheet.SetTextColor(SPR_VIEWHDR - 1, Spread_ALLROW, "#EDEDED");
    nwGrid_Book.ActiveSheet.SetTextAlign(SPR_VIEWHDR - 1, Spread_ALLROW, "CENTER");
    nwGrid_Book.ActiveSheet.SetObjectType(SPR_VIEWHDR - 1, Spread_ALLCOL, "buttonflat");
    nwGrid_Book.ActiveSheet.SetText2(SPR_VIEWHDR - 1, Spread_ALLROW, "View");

    nwGrid_Book.ActiveSheet.SetBackground(SPR_REMOVEHDR - 1, Spread_ALLROW, "#1974D1");
    nwGrid_Book.ActiveSheet.SetTextColor(SPR_REMOVEHDR - 1, Spread_ALLROW, "white");
    nwGrid_Book.ActiveSheet.SetTextAlign(SPR_REMOVEHDR - 1, Spread_ALLROW, "CENTER");
    nwGrid_Book.ActiveSheet.SetObjectType(SPR_REMOVEHDR - 1, Spread_ALLCOL, "buttonflat");
    nwGrid_Book.ActiveSheet.SetText2(SPR_REMOVEHDR - 1, Spread_ALLROW, "Remove");

    nwGrid_Book.ActiveSheet.RenderStatus = true;

    //$(`#nwGrid2-nwData tr`).each(function (i, n) {
    //    $row = $(n);

    //    isLoaded = $row.find(`td:eq(${SPR_TAG})`).text();

    //    if (isLoaded) {
    //        $row.find(`td:eq(${SPR_REQUIREDHDR})`).enable(false);
    //        $row.find(`td:eq(${SPR_WORKINSTRUCTIONS})`).enable(false);
    //        $row.find(`td:eq(${SPR_REQUIREDHDR})`).enable(false);

    //        $row.find(`td:eq(${SPR_DOCDETAILSCODEHDR})`).enable(false);
    //        $row.find(`td:eq(${SPR_DOCDETAILSCODEHDR})`).css('background-color', 'gainsboro');
    //    }
    //    else {
    //        $row.find(`td:eq(${SPR_REQUIREDHDR})`).enable(false);
    //        $row.find(`td:eq(${SPR_COMPILEDHDR})`).enable(false);
    //        $row.find(`td:eq(${SPR_ALTERNATIVE})`).enable(false);
    //    }
    //});



    $("#nwGrid2Data .gvHeaderStyle").find("th:eq(" + SPR_ATTACHHDR + ")").text("");
    $("#nwGrid2Data .gvHeaderStyle").find("th:eq(" + SPR_VIEWHDR + ")").text("");
    $("#nwGrid2Data .gvHeaderStyle").find("th:eq(" + SPR_REMOVEHDR + ")").text("");
    $("#nwGrid2Data .gvHeaderStyle").hide();

    $("#btnReloadDtls").addClass("btnBlue");

    AttViewDelete();
}

function AutoCompiled(row) {
    var isTag = getGridData(`nwGrid2`, '', SPR_TAG - 1, row);
    var isTagDocno = getGridData(`nwGrid2`, '', SPR_TAGDOCNOHDR - 1, row);
    var isTagDocDate = getGridData(`nwGrid2`, '', SPR_TAGDOCDATEHDR - 1, row);
    var isTagExpDate = getGridData(`nwGrid2`, '', SPR_TAGEXPIRYDATEHDR - 1, row);
    var isTagURL = getGridData(`nwGrid2`, '', SPR_TAGURLHDR - 1, row);
    var isTagAttach = getGridData(`nwGrid2`, '', SPR_TAGATTACHHDR - 1, row);
    var value;
    var isAuto = true;
    var docCode = getGridData(`nwGrid2`, '', SPR_DOCDETAILSCODEHDR - 1, row);
    var workIns = getGridData(`nwGrid2`, 'input', SPR_WORKINSTRUCTIONS - 1, row);

    //if (isTag == "1") {
        if (isTagDocno == "1") {
            value = getGridData(`nwGrid2`, 'input', SPR_DOCNOHDR - 1, row);

            if (value == "") {
                isAuto = false;
            }
        }

        if (isTagDocDate == "1") {
            value = getGridData(`nwGrid2`, 'input', SPR_DOCDATEHDR - 1, row);

            if (value == "") {
                isAuto = false;
            }
        }

        if (isTagExpDate == "1") {
            value = getGridData(`nwGrid2`, 'input', SPR_EXPIRYDATEHDR - 1, row);

            if (value == "") {
                isAuto = false;
            }
        }

        if (isTagURL == "1") {
            value = getGridData(`nwGrid2`, 'input', SPR_URLHDR - 1, row);

            if (value == "") {
                isAuto = false;
            }
        }

        if (isTagAttach == "1") {
            value = getGridData(`nwGrid2`, '', SPR_FILEPATH - 1, row);

            if (value == "") {
                isAuto = false;
            }
        }
        //Auto ticked Compiled Checkbox 
        if (workIns != '' || docCode != '') {
            //$(`#nwGrid2-nwData tr:eq(${row}) td:eq(${SPR_COMPILEDHDR}) input`).prop('checked', isAuto);
            //$(`#nwGrid2-nwData tr:eq(${row}) td:eq(${SPR_COMPILEDHDR}) input`).prop('checked', isAuto);
            nwGrid_Book.ActiveSheet.SetText(SPR_COMPILEDHDR - 1, row, isAuto);
            nwGrid_Book.ActiveSheet.SetText(SPR_COMPILEDHDR - 1, row, isAuto);


        }
         else {
           // $(`#nwGrid2-nwData tr:eq(${row}) td:eq(${SPR_COMPILEDHDR}) input`).prop('checked', false);
            nwGrid_Book.ActiveSheet.SetText(SPR_COMPILEDHDR - 1, row, false);
        }
    //}
      
}



//$(document).on('focus', '.txtDocno, .txtURL, .txtDocdate, .txtExpiryDate', function () {
//    globalRow = crnwTR.index();
//    _currRow = crnwTR.index();
//});

//$(document).on('change', '.txtDocno,.txtURL', function () {
//    AutoCompiled(globalRow);
//});

//$(document).on('focusout', '.txtDocno,.txtURL,.txtDocdate,.txtExpiryDate', function () {    
//    AutoCompiled(globalRow);
//});

//$(document).on('change', '.txtDocDate, .txtExpiryDate', function () {
//    DocdateAndExpDateValidation(_currRow);
//    AutoCompiled(_currRow);
//});




//function ReqCommHDRAutoEnableDisable() {

//    var maxRow = $('#nwGrid2 .tblGridBody tr').length;
//    for (var x = 0; x <= maxRow; x++) {

//        var TagDocno = $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_TAGDOCNOHDR + ')').text();
//        var TagDocDate = $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_TAGDOCDATEHDR + ')').text();
//        var TagTagExpiry = $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_TAGEXPIRYDATEHDR + ')').text();
//        var TagAttach = $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_TAGATTACHHDR + ')').text();
//        var TagLOAD = $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_TAG + ')').text();
//        var FILELOAD = $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_FILEPATH + ')').text();

//        if (TagDocno == "1") {
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_WORKINSTRUCTIONS + ')').enable(true);
//            //$('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_WORKINSTRUCTIONS + ')').css('background-color', 'white');
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_DOCNOHDR + ') input').enable(true);
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_DOCNOHDR + ') input').css('background-color', 'white');
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_DOCNOHDR + ')').css('background-color', 'white');
//        }

//        else {
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_WORKINSTRUCTIONS + ')').enable(false);
//            //$('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_WORKINSTRUCTIONS + ')').css('background-color', 'gainsboro');
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_DOCNOHDR + ') input').enable(false);
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_DOCNOHDR + ') input').css('background-color', 'gainsboro');
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_DOCNOHDR + ')').css('background-color', 'gainsboro');
//        }

//        if (TagDocDate == "1") {
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_WORKINSTRUCTIONS + ')').enable(true);
//            //$('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_WORKINSTRUCTIONS + ')').css('background-color', 'white');
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_DOCDATEHDR + ') input').enable(true);
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_DOCDATEHDR + ') input').css('background-color', 'white');
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_DOCDATEHDR + ')').css('background-color', 'white');
//        }

//        else {
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_WORKINSTRUCTIONS + ')').enable(false);
//            //$('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_WORKINSTRUCTIONS + ')').css('background-color', 'gainsboro');
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_DOCDATEHDR + ') input').enable(false);
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_DOCDATEHDR + ') input').css('background-color', 'gainsboro');
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_DOCDATEHDR + ')').css('background-color', 'gainsboro');
//        }

//        if (TagTagExpiry == "1") {
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_EXPIRYDATEHDR + ') input').enable(true);
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_EXPIRYDATEHDR + ') input').css('background-color', 'white');
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_EXPIRYDATEHDR + ')').css('background-color', 'white');
//        }

//        else {
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_WORKINSTRUCTIONS + ')').enable(false);
//            //$('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_WORKINSTRUCTIONS + ')').css('background-color', 'gainsboro');
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_EXPIRYDATEHDR + ') input').enable(false);
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_EXPIRYDATEHDR + ') input').css('background-color', 'gainsboro');
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_EXPIRYDATEHDR + ')').css('background-color', 'gainsboro');
//        }

//        if (TagLOAD == "1") {

//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_WORKINSTRUCTIONS + ')').enable(false);
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_DOCDETAILSCODEHDR + ')').enable(false);
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_REQUIREDHDR + ')').enable(false);
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_DOCDETAILSCODEHDR + ')').css('background-color', 'gainsboro');
//        }

//        else {
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_WORKINSTRUCTIONS + ')').enable(true);
//            //$('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_WORKINSTRUCTIONS + ')').css('background-color', 'white');
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_DOCDETAILSCODEHDR + ')').enable(true);
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_REQUIREDHDR + ')').enable(true);
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_DOCDETAILSCODEHDR + ')').css('background-color', 'cyan');
//        }

//        if (FILELOAD != "") {
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_VIEWHDR + ') button').css('background-image', 'linear-gradient(#85dbee,#2096c9)');

//        }
//        else {
//            $('#nwGrid2 .tblGridBody  tr:eq(' + x + ')').find('td:eq(' + SPR_VIEWHDR + ') button').css('background-image', 'linear-gradient(#FFFFFF, #C0C0C0)');
//        }
//    }
//}

////Action or Trigger When Closing of Pop-up

var menuItemName = "DCRequirementCompliance";
var link = "";
function func_WindowCloseTrigger(verID) {
    var isContinue = true;
    var errorResult = "";
    var ICode = "";
    //var currentRow = nwGrid_Book.ActiveSheet.CellIndexes.Row;
    //var serverlink = $("#txtserverlink").val();

    //if (verID == "nwUploadCon") {

    //    if (curupload != undefined) {
    //        MessageBox("Uploading still in Progress.");
    //        return false;
    //    }

    //    //For Button Item Specification Attach

    //    if (attachclick == "attachFile") {

    //        var filepath = $("#nwUploadCon .noahdriveID").text();
    //        var path = filepath;

    //        if (filepath != "") {
    //            link = serverlink + path; //uncomment this replace add by EME

    //            //nwLib.nwTempTable_RowData_Set("nwGrid2", crnwTR.index(), SPR_FILEPATH)(path);
    //            nwLib.nwTempTable_RowData_Set("nwGrid2", currentRow, SPR_FILEPATH)(path);
    //            //$('.btnview').text('').prepend('<a>View Attachment</a>');
    //            //$("#nwGrid2-nwData tbody").find("tr:eq(" + crnwTR.index() + ") td:eq(" + SPR_VIEWHDR + ") a").addClass('green');
    //            nwGrid_Book.ActiveSheet.SetBackground(SPR_VIEWHDR - 1, currentRow, 'green')
    //        }

    //    }
    //}

    return isContinue;
}





var curupload = undefined;


var attachclick = "";
//$(document).on("click", '.btnAttach', function (e) {
//    $("#fileCon").val("");
//    $("#status").find("span").text("");
//    $(".progress").find("div.percent").text("0%");
//    $(".progress").find("div.bar").css("width", "0%");
//    nwPopupForm_ShowModal("nwUploadCon");
//    attachclick = "attachFile";

//    globalRow = crnwTR.index();
//});

function nwviewattach(filepath) {
    //inititalize
    $('#docattviewimg').attr('src', "");
    $('#docattviewlink').attr('src', "");
    $('#docattviewimg').removeClass('ratio');
    $("#docattviewpdfobjectlink").remove();
    $('#docattviewpdfobjectlink').attr('data', "");
    $('#docattviewpdfembedlink').attr('src', "");
    $('#aDownload').attr({ "href": "", "title": "\'DOWNLOAD\'", "download": "", "target": "_blank" });
    //start
    if (checkextensionsimg(filepath)) {
        $("#vwImage").removeClass("vwpdf");
        $('#docattviewimg').addClass('ratio');
        $('#docattviewimg').attr('src', filepath);
        nwPopupForm_ShowModal("docattview");
    }
    else if (checkextensionsadl(filepath)) {
        $("#vwImage").removeClass("vwpdf");
        //$('#docattviewlink').attr('src', filepath);
        $('#aDownload').attr({ "href": filepath, "title": "\'DOWNLOAD\'", "download": "", "target": "_blank" });
        $('#aDownload')[0].click();
    }
    else {
        if (filepath.includes(".pdf")) {
            $("#vwImage").addClass("vwpdf");
            $('.wrapper').append("<object id='docattviewpdfobjectlink' data='' type='application/pdf' class='nwCus14'><embed id='docattviewpdfembedlink' src='' type='application/pdf' width='90%' height='90%' /></object>");
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


//$(document).on("click", ".btnView", function () {
//    var serverlink = $("#txtserverlink").val();
//    //if debug
//    //serverlink = serverlink.replace('../', '');
//    //serverlink = 'http://localhost/' + serverlink
//    //
//    var path = crnwTR.find("td:eq(" + SPR_FILEPATH + ")").text();
//    if (path == "") {
//        MessageBox("No attachment found.", "Document Attachment", "error");
//        return false;
//    }
//    filepath = serverlink + path;
//    nwviewattach(filepath);

//});


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
        || path.includes(".docx") || path.includes(".docm") || path.includes(".dotx") || path.includes(".dotm") || path.includes(".docb")) {
        return true;
    }
    return false;
}


//$(document).on("click", ".btnRemove", function () {
//    globalRow = crnwTR.index();

//    var path = crnwTR.find("td:eq(" + SPR_FILEPATH + ")").text();
//    if (path == "") {
//        MessageBox("No attachment found.", "Document Attachment", "error");
//        return false;
//    } else {
//        msgBoxContainerQuestion = "btnRemove";
//        parent_MessageBoxQuestion("Do you want to remove the attachment?", "Document Attachment", "");
//        return true;
//    }
//});


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
    else if (genID == "btnRemove") {
        if (answer == "Yes") {
            var row = nwGrid_Book.ActiveSheet.CellIndexes.Row;
            //crnwTR.find("td:eq(" + SPR_FILEPATH + ")").text('');
            nwGrid_Book.ActiveSheet.SetText(SPR_FILEPATH - 1, row, "");
            //$("#nwGrid2-nwData tbody").find("tr:eq(" + crnwTR.index() + ") td:eq(" + SPR_VIEWHDR + ") a").removeClass("green");
            nwGrid_Book.ActiveSheet.SetBackground(SPR_VIEWHDR - 1, row, 'white');
            nwGrid_Book.ActiveSheet.SetTextColor(SPR_VIEWHDR - 1, row, "black");
            AutoCompiled(globalRow);
        }
    }
    else if (genID == "btnReloadDtls") {
        if (answer == "Yes") {
            nwLoading_Start("xactReloadDtls", crLoadingHTML);
            cust_GetPara();
            func_ActionDriven("actReloadDtls");
        }
    }
}

//$(document).on('change', '.txtExpiryDate', function () {
//    var expDate = $(this).val();
//    var server = $('#txtServerDate').val();

//    //if (Date.parse(expDate) <= Date.parse(server)) {
//    //    MessageBox("Expiry Date should not be earlier or equal to the current server date.", baseTitle, 'error');
//    //    $(this).val("");
//    //}

//    DocdateAndExpDateValidation(crnwTR.index());
//    AutoCompiled(globalRow);

//});

function ChkIfHasAttachment() {
    $(`#nwGrid2-nwData tr`).each(function (i, n) {
        var $row = $(n);

        //if ($row.find(`td:eq(${SPR_FILEPATH})`).text() != "") {
        //    $row.find(`td:eq(${SPR_VIEWHDR}) a`).addClass("green");
        //}
        //else {
        //    $row.find(`td:eq(${SPR_VIEWHDR}) a`).removeClass("green");
        //}

        if (nwGrid_Book.ActiveSheet.GetValue(SPR_FILEPATH - 1, $row) != "") {
            nwGrid_Book.ActiveSheet.SetBackground(SPR_VIEWHDR - 1, $row, 'green')
            nwGrid_Book.ActiveSheet.SetTextColor(SPR_VIEWHDR - 1, $row, "white");
        }
        else {
            nwGrid_Book.ActiveSheet.SetBackground(SPR_VIEWHDR - 1, $row, 'white')
            nwGrid_Book.ActiveSheet.SetTextColor(SPR_VIEWHDR - 1, $row, "black");
        }
        
    });

}

$(document).on('click', '.nwBtnClose', function () {
    $(".nwgrid_Delete").click();
});

function func_nwGrid_DeleteValidation() {
    var isContinue = true;

    activeRow = nwGrid_Book.ActiveSheet.CellIndexes.Row;

    //var tag = $(`#nwGrid2-nwData tr:eq(${crnwTR.index()}) td:eq(${SPR_TAG})`).text();
    var tag = nwGrid_Book.ActiveSheet.GetValue(SPR_TAG - 1, activeRow);

    if (tag != "") {
        MessageBox("Cannot be deleted. Data are loaded based on the setup.", baseTitle, 'error');
        isContinue = false;
    }

    let currentRow = activeRow + 1;
    //crnwTable = $("#nwGrid2 .tblGridBody tbody");
    //var length = crnwTable.find("tr").length;
    var length = nwGrid_Book.ActiveSheet.Data.length;

    if (currentRow == length) {
        isContinue = false;
    }

    return isContinue;
}

function func_nwGrid_InsertDone() {
    var isContinue = true;
    //ReqCommHDRAutoEnableDisable();
    GridValidation();
    return isContinue;
}

function DocdateAndExpDateValidation(row) {
    var docdate = nwGrid_Book.ActiveSheet.GetValue(SPR_DOCDATEHDR - 1, row);
    var expDate = nwGrid_Book.ActiveSheet.GetValue(SPR_EXPIRYDATEHDR - 1, row);
    var curDate = $("#txtServerDate").val();

    

    if (expDate != "" && docdate != "") {
        if (Date.parse(expDate) < Date.parse(docdate)) {
            MessageBox("Cannot proceed. Expiry Date should not be earlier than Document Date.", "Requirements Compliance", 'error');
            nwGrid_Book.ActiveSheet.SetText(SPR_EXPIRYDATEHDR - 1, row, "");
        }
    }

    if (Date.parse(docdate) > Date.parse(curDate)) {
        MessageBox("Cannot proceed. Document Date should not be later than the current server date.", "Requirements Compliance", 'error');
        nwGrid_Book.ActiveSheet.SetText(SPR_DOCDATEHDR - 1, row, "");
    }
    if (Date.parse(expDate) <= Date.parse(curDate)) {
        MessageBox("Cannot proceed. Expiry Date should not be earlier or equal to the current server date.", "Requirements Compliance", 'error');
        nwGrid_Book.ActiveSheet.SetText(SPR_EXPIRYDATEHDR - 1, row, "");

    }
}

function getGridData(nwGrid, type, col, row) {
    var data = '';

    if (type == 'input')
        data = nwGrid_Book.ActiveSheet.GetValue(col, row);
        //data = $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col}) input`).val();
    else
       data = nwGrid_Book.ActiveSheet.GetValue(col, row);
       //data = $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col})`).text();
    
    return data;
}

function setGridData(nwGrid, type, col, row, val) {
    if (type == 'input')
        $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col}) input`).val(val);
    else
        $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col})`).text(val);
}

function DisableUponView() {
    var isDisabled = isView.toLowerCase() == "true" ? true : false;

    if (isDisabled) {

        var $row;
        $(`#nwGrid2-nwData tr`).each(function (i, n) {
            $row = $(n);

            $row.find(`td:eq(${SPR_COMPILEDHDR}) input`).enable(false);
            $row.find(`td:eq(${SPR_REQUIREDHDR}) input`).enable(false);
            $row.find(`td:eq(${SPR_WORKINSTRUCTIONS}) input`).enable(false);
            $row.find(`td:eq(${SPR_WORKINSTRUCTIONS}) input`).addClass("disableInput");
            $row.find(`td:eq(${SPR_WORKINSTRUCTIONS})`).css("background-color", "gainsboro");
            $row.find(`td:eq(${SPR_DOCDETAILSCODEHDR})`).enable(false);
            $row.find(`td:eq(${SPR_DOCDETAILSHDR}) input`).enable(false);
            $row.find(`td:eq(${SPR_DOCNOHDR}) input`).enable(false);
            $row.find(`td:eq(${SPR_DOCNOHDR}) input`).addClass("disableInput");
            $row.find(`td:eq(${SPR_DOCNOHDR})`).addClass("disableColor");
            $row.find(`td:eq(${SPR_DOCDATEHDR}) input`).enable(false);
            $row.find(`td:eq(${SPR_DOCDATEHDR}) input`).addClass("disableInput");
            $row.find(`td:eq(${SPR_DOCDATEHDR})`).addClass("disableColor");
            $row.find(`td:eq(${SPR_EXPIRYDATEHDR}) input`).enable(false);
            $row.find(`td:eq(${SPR_EXPIRYDATEHDR}) input`).addClass("disableInput");
            $row.find(`td:eq(${SPR_EXPIRYDATEHDR})`).addClass("disableColor");
            $row.find(`td:eq(${SPR_URLHDR}) input`).enable(false);
            $row.find(`td:eq(${SPR_URLHDR}) input`).addClass("disableInput");
            $row.find(`td:eq(${SPR_URLHDR})`).addClass("disableColor");
            $row.find(`td:eq(${SPR_ATTACHHDR}) a`).enable(false);
            $row.find(`td:eq(${SPR_REMOVEHDR}) a`).enable(false);
            $row.find(`td:eq(${SPR_DELETEROW}) .nwBtnClose`).enable(false);

        });

        //Disable other buttons
        $('.nwgrid_buttons').enable(false);   
        $('#noah-webui-default-Save').enable(false);
    }

}



function $fn() {
    let $fn = {

        UponRefreshLoadGrid: function () {

            let MaxRow = nwTempTable_Row_Count('nwGrid2') - 1;

            for (var row = 0; row < MaxRow; row++) {
                if (row != MaxRow) {
                    $(`#nwGrid2-nwData tr:eq(${row})`).enable(false);
                }
                else {
                    $(`#nwGrid2-nwData tr:eq(${row})`).enable(true);
                }
            }
        }
    };
    return $fn;
}


$(document).on('click', '#btnReloadDtls', function () {
    msgBoxContainerQuestion = "btnReloadDtls";
    parent_MessageBoxQuestion("This will reset line detail(s). Do you want to continue?", baseTitle, "Question");

    return true;
});

$(document).on('change', '#fileCon', function () {

    changeFile(this);
});



//function closeIframeFromReqComp() {
//    if (window.top != window.self) { //check if the menu item is in iframe
//        parent.CloseReqComp();
//    }
//}

var currRow;
//$(document).on('focus', '.txtWorkInstructions', function () {
//    currRow = crnwTR.index();
//});

//$(document).on('focusout', '.txtWorkInstructions', function () {
//    var wf = $(this).val();

//    //Add Row
//    if (($(`#nwGrid2-nwData tr`).length == (currRow + 1)) && wf != "") {
//        //func_nwGrid_AddRow(`nwGrid2`, 1);
//        //GridValidation();
//        //crnwTable.find("tr:eq(" + (currRow) + ")").find("td:eq(" + SPR_COMPILEDHDR + ") input").prop("checked", true);

//        nwGrid_Book.ActiveSheet.RowAdd()
//        GridValidation();
//        nwGrid_Book.ActiveSheet.SetText(SPR_COMPILEDHDR - 1, currRow, true)
//    }    
//});


//P8spread Function

function p8Spread_DblClick(canvasID, row, col) {
    console.log("p8Spread_DblClick " + canvasID + " " + row + " " + col);

    $('#txtCanvasDblClick').text(canvasID);
    $('#txtRowDblClick').text(row);
    $('#txtColumnDblClick').text(col);

    if (canvasID == "nwGrid2") {
        if (col == SPR_DOCDETAILSCODEHDR - 1) {
            //lookUpCustomize("lugDocDtlHdr", 2);
            //$("#menuCreatorContainer").addClass('p8spreadlookup');
            workIns_ = nwGrid_Book.ActiveSheet.GetValue(SPR_WORKINSTRUCTIONS - 1, row)
        }
    }

}


function p8Spread_Click(canvasID, row, col) {
    console.log("p8Spread_Click " + canvasID + " " + row + " " + col);

    $('#txtCanvasClick').text(canvasID);
    $('#txtRowClick').text(row);
    $('#txtColumnClick').text(col);

    var serverlink = $("#txtserverlink").val();
    var path = nwGrid_Book.ActiveSheet.GetValue(SPR_FILEPATH - 1, row)


    if (col == SPR_ATTACHHDR - 1) {
        currentRow = nwGrid_Book.ActiveSheet.CellIndexes.Row;
        globalRow = row;
        nwPopupForm_ShowModal("nwUploadCon");

    } else if (col == SPR_VIEWHDR - 1) {


        if (path == "") {
            MessageBox("No attachment found.", "Document Attachment", "error");
            return false;
        }

        filepath = serverlink + path;
        nwviewattach(filepath);

    } else if (col == SPR_REMOVEHDR - 1) {

        globalRow = row;

        if (path == "") {
            MessageBox("No attachment found.", "Document Attachment", "error");
            return false;
        } else {
            msgBoxContainerQuestion = "btnRemove";
            parent_MessageBoxQuestion("Do you want to remove the attachment?", "Document Attachment", "");
            return true;
        }
    }

}
function p8Spread_Change(canvasID, row, col) {
    console.log("p8Spread_Change " + canvasID + " " + row + " " + col);

    $('#txtCanvasChange').text(canvasID);
    $('#txtRowChange').text(row);
    $('#txtColumnChange').text(col);

    var length = nwGrid_Book.ActiveSheet.Data.length;

    if (row+1  == length) {
        nwGrid_Book.ActiveSheet.RowAdd();
        
        nwGrid_Book.ActiveSheet.SetEnable(SPR_REQUIREDHDR - 1, row + 1, false);
        nwGrid_Book.ActiveSheet.SetEnable(SPR_COMPILEDHDR - 1, row + 1, false);
        nwGrid_Book.ActiveSheet.SetEnable(SPR_ALTERNATIVE - 1, row + 1, false);

        var wf = nwGrid_Book.ActiveSheet.GetValue(SPR_WORKINSTRUCTIONS - 1, row);
        var docCode = nwGrid_Book.ActiveSheet.GetValue(SPR_DOCDETAILSCODEHDR - 1, row);;
        var docNo= nwGrid_Book.ActiveSheet.GetValue(SPR_DOCNOHDR - 1, row);;
        var docDate =  nwGrid_Book.ActiveSheet.GetValue( SPR_DOCDATEHDR - 1, row);;
        var expiryDate = nwGrid_Book.ActiveSheet.GetValue(SPR_EXPIRYDATEHDR - 1, row);;
        var url = nwGrid_Book.ActiveSheet.GetValue(SPR_URLHDR - 1, row);;

        if (wf != "" || docCode != "" || docNo != "" || docDate != "" || expiryDate != "" || url != "") {
            GridValidation();
            nwGrid_Book.ActiveSheet.SetText(SPR_COMPILEDHDR - 1,row,true)
        }

    }
    
    if (nwGrid_Book.ActiveSheet.GetValue(SPR_DOCDETAILSCODEHDR - 1, row) != '') {
        AutoCompiled(row);
    }

    if (col == SPR_DOCDATEHDR - 1 || col == SPR_EXPIRYDATEHDR - 1) {
        DocdateAndExpDateValidation(row);
        AutoCompiled(row);
    }
}

function p8Spread_Focus(canvasID, row, col) {
    console.log("p8Spread_Focus " + canvasID + " " + row + " " + col);

    $('#txtCanvasFocus').text(canvasID);
    $('#txtRowFocus').text(row);
    $('#txtColumnFocus').text(col);

    if (col == SPR_DOCNOHDR - 1 || col == SPR_URLHDR - 1 || col == SPR_DOCDATEHDR - 1 || col == SPR_EXPIRYDATEHDR - 1) {
        DocdateAndExpDateValidation(row);
        AutoCompiled(row);
    }

}

function AttViewDelete() {

    nwGrid_Book.ActiveSheet.RenderStatus = false;

    var len = nwGrid_Book.ActiveSheet.Data.length;

    for (var i = 0; i < len ; i++) {
        
        nwGrid_Book.ActiveSheet.SetText(SPR_ATTACHHDR - 1, i, "Attach");
        nwGrid_Book.ActiveSheet.SetText(SPR_VIEWHDR - 1, i, "View");
        nwGrid_Book.ActiveSheet.SetText(SPR_REMOVEHDR - 1, i, "Remove");

        nwGrid_Book.ActiveSheet.SetTextAlign(SPR_ATTACHHDR - 1, i, "Center")
        nwGrid_Book.ActiveSheet.SetTextAlign(SPR_VIEWHDR - 1, i, "Center")
        nwGrid_Book.ActiveSheet.SetTextAlign(SPR_REMOVEHDR - 1, i, "Center")
    }

    nwGrid_Book.ActiveSheet.RenderStatus = true;

}