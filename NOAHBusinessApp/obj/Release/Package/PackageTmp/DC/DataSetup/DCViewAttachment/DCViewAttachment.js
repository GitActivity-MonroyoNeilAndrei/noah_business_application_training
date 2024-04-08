/// <reference path="DCViewAttachment.js" />
var //nwGridSourceCon
    SPR_TRANSACTIONNO = 1,
    SPR_VALUEDATE = 2,
    SPR_VIEWENTRYDTLS = 3,
    SPR_VIEWFORMDETAILS = 4,
    SPR_FORREQCOMPUPD = 5,
    SPR_REMARKSCOMPUPD = 6,
    SPR_RETURNTO = 7,
    SPR_RETURNTONAME = 8,
    SPR_TRANTYPE = 9,
    SPR_ISVIEW = 10,
    SPR_ISALLOWRET = 11,
    SPR_PRINTNAME = 12,
    SPR_PRINTID = 13,
    SPR_MENUITEM = 14,
    SPR_MENULINK = 15,

    //nwGridSuppCon
     SPR_SUP_TRANNO = 1,
     SPR_SUP_RETURN = 2,
     SPR_SUP_COMPLIED = 3,
     SPR_SUP_REQUIRED = 4,
     SPR_SUP_VWATTACH = 5,
     SPR_SUP_ROWNO = 6,
     SPR_SUP_WORKINS = 7,
     SPR_SUP_WORKINSCODE = 8,
     SPR_SUP_WORKINSDESC = 9,
     SPR_SUP_DOCNO = 10,
     SPR_SUP_DOCDATE = 11,
     SPR_SUP_EXPIRYDATE = 12,
     SPR_SUP_URL = 13,
    SPR_SUP_REMARKSDOCRET = 14,
    SPR_SUP_RETURNTOCODE = 15,
    SPR_SUP_RETURNTODESC = 16,
    SPR_SUP_FILEPATH = 17,
    SPR_SUP_LINEID = 18,
    SPR_SUP_TRANTYPE = 19,
    SPR_SUP_ISALLOWRET = 20,
    SPR_SUP_LINEIDSETUP = 21,
    SPR_SUP_IGTCODE = 22,
    SPR_SUP_RCROWNO = 23,
    SPR_SUP_RCROW = 24,
    SPR_SUP_VALUEDATE = 25;

var nwUnitCode = "";
var nwUnitDesc = "";
var nwQty = 1;
var nwItemGroupType = "";
var nwItemGroupTypeDesc = "";
var nwu = "";
var nwID = "";
var locForm;
var nwDocno = '';
var isSave = '';
var isView = false;
var nwCurrDocno = '';
var isValidate = false;

var nwGridMainCon_Book;
var nwGridMainCon_Sheet;
var nwGridMainCon_Book2;
var nwGridMainCon_Sheet2;

function func_Reload() {

    crLnk = GetCurrentURL() + "DCViewAttachment_Gateway";
    crLnkGateKey = "DCViewAttachment";

    
    var isContinue = true;
    init_request();
    //nwPopupForm_Create("nwGridUnitCapacity");
    ToolBoxGetData = false;
    DisableFields();
    DateFormat();    
    nwPopupForm_Create("docattview", true);
    nwDocno = getParameterByName('nwDocno');
    nwCurrDocno = getParameterByName('nwCurrDocno');
    isView = getParameterByName('isView');

    $('.btn-tb-refresh').visible(false);
    $("#noah-webui-Toolbox").visible(false); //disabled as of now

    cust_GetPara();
    return isContinue;
}

function mainLoad() {
    nwParameter_Add("nwDocno", nwDocno);
    if (nwDocno != '') {
        //$('#noah-webui-default-Refresh').click();
        $('.btn-tb-refresh').click();
        $("#noah-webui-Toolbox").visible(false);
        $('#nwGridSourceCon').enable(true);
        $('#nwGridSuppCon').enable(true);
        $('.nav-menu').hide();

        
        //$("#noah-webui-Toolbox").visible(false);
        //$(".noah-webui-default-Content_Container").enable(false);
    }
    if (isView=="true") {
        $("#noah-webui-Toolbox").visible(false);
        $('#nwGridSourceCon').enable(true);
        $('#nwGridSuppCon').enable(true);
        $('.nav-menu').hide();

        

        //$('#nwGridSource .tblGridBody tr td:nth-child(' + (SPR_FORREQCOMPUPD + 1) + ') input').enable(false);
        //$('#nwGridSuppCon .tblGridBody tr td:nth-child(' + (SPR_SUP_RETURN + 1) + ') input').enable(false);
    }
    else {
        $("#noah-webui-Toolbox").visible(true);
        $('#nwGridSourceCon').enable(false);
        $('#nwGridSuppCon').enable(false);
        $('.nav-menu').hide();

        //$('#nwGridSource .tblGridBody tr td:nth-child(' + (SPR_FORREQCOMPUPD + 1) + ') input').enable(true);
        //$('#nwGridSuppCon .tblGridBody tr td:nth-child(' + (SPR_SUP_RETURN + 1) + ') input').enable(true);
    }
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();    
    func_Toolbox_Clear();
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    isSave = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", "Review Attachment(s) Window", "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", "Review Attachment(s) Window", "", indef, enume);
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
    isSave = false;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to process the current record?", "Review Attachment(s) Window", "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxImport(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxExport(indef, enume) {
    var isContinue = true;
    nwLoading_Start("xSample", crLoadingHTML);
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
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("nwCurrDocno", nwCurrDocno);
    nwParameter_Add_Table("nwGridSourceCon");
    nwParameter_Add_Table("nwGridSuppCon");
    nwParameter_Add("isSave", isSave);
}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    nwLoading_Start("xSample", crLoadingHTML);
    cust_GetPara(); 
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("xSample", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollectionEmpty", false);
}

///////////////////////////////////////

var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    var currentRow = crnwTR.index();

    if (idName == 'toolboxInquire') {
    }
    if (idName == 'lugReturnTo') {
        var code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (0) + ")").text();
        var desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (1) + ")").text();
        //crnwTR.find("td:eq(" + SPR_RETURNTO + ")").text(getGridData(idNum, 0));
        //crnwTR.find("td:eq(" + SPR_RETURNTONAME + ")").text(getGridData(idNum, 1));
    }
    if (idName == 'lugReturnToSup') {
        //crnwTR.find("td:eq(" + SPR_SUP_RETURNTOCODE + ")").text(getGridData(idNum, 0));
        //crnwTR.find("td:eq(" + SPR_SUP_RETURNTODESC + ")").text(getGridData(idNum, 1));
    }
}

function getGridData(idnum, index) {
    var data = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idnum + ")").find("td:eq(" + (index) + ")").text();
    return data;
}

function EnableFields() { //Upon New
    $('#txtCode').prop('disabled', false);
    $('#txtDescription').prop('disabled', false);

    $("#btnCopyFrom").enable(true);
    $("#btnDeleteRow").enable(true);

    $('.nwgrid_Delete').prop("disabled", false);
    $('.nwgrid_Insert').prop("disabled", false);
}

function DisableFields() { //Upon New
    $('#txtCode').prop('disabled', true);
    $('#txtDescription').prop('disabled', true);

    $('.nwgrid_Delete').prop("disabled", true);
    $('.nwgrid_Insert').prop("disabled", true);
}

function EnableFieldsDone() { //Upon Refresh where record > 0   
    $('#txtCode').prop('disabled', true);
    $('#txtDescription').prop('disabled', false);

    $("#btnCopyFrom").enable(false);
    $("#btnDeleteRow").enable(false);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    //$("#noah-webui-Toolbox").bindingDelete().visible(false);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    //$("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
}

function DisableFieldsEmpty() { //Upon Refresh where record < 0
    $('#txtCode').prop('disabled', true);
    $('#txtDescription').prop('disabled', false);

    $("#btnCopyFrom").enable(false);
    $("#btnDeleteRow").enable(false);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    //$("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
}

function ClearFields() {
    $('#txtCode').val("");
    $('#txtDescription').val("");
}
    

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}

function Refresh() {
    setTimeout(function () {
        $('#noah-webui-default-Refresh').click();
    }, 500);
}



function DateFormat() {
    $('#txtEffectivityDate').datepicker();
    $('#txtEffectivityDate').mask('99/99/9999');
}

$(document).on("click", "#btnDelete", function (e) {
    MessageBoxQuestion("Are you sure you want to delete this record?", "Mortuary", "");
    return false;
});

function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {
    var nwobjID = nwobj.attr('id');
    var col = crnwTD.index();
    var currRow = crnwTR.index();

    if (nwobjID == "nwGridSource") {
        if (col == SPR_RETURNTO) {
            if (crnwTR.find("td:eq(" + SPR_FORREQCOMPUPD + ") input").is(":checked")) {
                lookUpCustomize("lugReturnTo", 1);
            }           
        }
    }

    if (nwobjID == "nwGridSupp") {
        if (col == SPR_SUP_RETURNTOCODE) {
            if (crnwTR.find("td:eq(" + SPR_SUP_RETURN + ") input").is(":checked")) {
                lookUpCustomize("lugReturnToSup", 1);
            }
        }
    }

}

function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
    var cnt = nwLib.nwTempTable_Row_Count("nwGridCon");  

    if (crnwTD.index() == SPR_ITEMCODE) {
            
        var itemcode = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
        var itemdesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
        var isValid = nwLib.nwTempTable_Column_ValueExist("nwGridCon", 1, itemcode, false, "text", 0);

            if (isValid == false) {
                crnwTRtemp.find('td:eq(' + SPR_ITEMCODE + ')').text(itemcode);
                crnwTRtemp.find('td:eq(' + SPR_ITEMDESC + ')').text(itemdesc);

                if (cnt == (crnwTR.index() + 1))
                    nwGrid_AddRow("nwGridCon", 1);
            }            
            else {
                crnwTRtemp = null;
            }
        }
    
    return crnwTRtemp;
}


$(document).on('click', '.nwgrid_Insert', function () {
 
});

$(document).on("click", "#btnDeleteRow", function (e) {
    if ($("#nwGridCon .tblGridBody tr").size() > 1 && crnwTR.index() != $("#nwGridCon .tblGridBody tr").size() - 1)
        $('#nwGridCon .nwgrid_Delete').click();
    return false;
});

$(document).on("click", "#btnCopyFrom", function (e) {
    lookUpCustomize("CopyFrom", 1);
});


function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
}

function GetLoc(x) {
    if (x > 1) {
        $("#lugLocAccntForms").enable(true);
    }
    else {
        $("#lugLocAccntForms").enable(true);
    }
}

$(document).on("click", ".btnLstPending", function (e) {
    nwLoading_Start("xbtnLstPending", crLoadingHTML);
    nwPopupForm_ShowModal("ListOfPendingTrans");

    nwParameter_Add("module", crnwTR.find("td:eq(" + SPR_MODULECODE + ")").text());
    nwParameter_Add("location", locForm);
    func_ActionDriven("actLoadPendingTran", false);
});

function HasGridData() {
    crnwTable = $("#nwGridSuppCon .tblGridBody");
    var len = crnwTable.find('tr').length;
    var cnt = 0;
    for (var x = 0; x <= len - 1; x++) {
        if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_FILEPATH + ')').text() != "") {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_VWATTACH + ')').removeClass("btnGray");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_VWATTACH + ')').addClass("btnGreen");
        }
        else {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_VWATTACH + ')').removeClass("btnGreen");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_VWATTACH + ')').addClass("btnGray");
        }
        if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_RETURN + ') input').is(":checked")) {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_REMARKSDOCRET + ') input').enable(true);
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_REMARKSDOCRET + ')').css("background-color", "");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_REMARKSDOCRET + ') input').css("background-color", "");
        }
        else {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_REMARKSDOCRET + ')').css("background-color", "gainsboro");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_REMARKSDOCRET + ') input').css("background-color", "gainsboro");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_REMARKSDOCRET + ') input').css("border", "none");
        }
        if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_RETURN + ') input').is(":checked") && crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_ISALLOWRET + ')').text() == "True") {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_RETURNTOCODE + ')').enable(true);
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_RETURNTOCODE + ')').css("background-color", "cyan");
        }
        else {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_RETURNTOCODE + ')').enable(false);
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_RETURNTOCODE + ')').css("background-color", "gainsboro");
        }
        var supDocno = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_TRANNO + ')').text();
        if (supDocno == nwCurrDocno) {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_RETURN + ') input').enable(false);
        }
        else {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_RETURN + ') input').enable(true);
        }
        let valuedate = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_VALUEDATE + ')').text();
        if (valuedate == "") {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_RETURN + ') input').enable(false);
        }

        if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_RETURNTOCODE + ')').text() == "")
        {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_RETURN + ') input').enable(false);
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_REMARKSDOCRET + ') input').enable(false);
        }
    }

    if (isView == "true") {
        $('#nwGridSuppCon .tblGridBody tr td:nth-child(' + (SPR_SUP_RETURN + 1) + ') input').enable(false);
        $('#nwGridSuppCon .tblGridBody tr td:nth-child(' + (SPR_SUP_REMARKSDOCRET + 1) + ') input').enable(false);
        $('#nwGridSuppCon .tblGridBody tr td:nth-child(' + (SPR_SUP_REMARKSDOCRET + 1) + ')').css("background-color", "gainsboro");
        $('#nwGridSuppCon .tblGridBody tr td:nth-child(' + (SPR_SUP_REMARKSDOCRET + 1) + ') input').css("background-color", "gainsboro");
        $('#nwGridSuppCon .tblGridBody tr td:nth-child(' + (SPR_SUP_REMARKSDOCRET + 1) + ') input').css("border", "none");
        $('#nwGridSuppCon .tblGridBody tr td:nth-child(' + (SPR_SUP_RETURNTOCODE + 1) + ')').enable(false);
        $('#nwGridSuppCon .tblGridBody tr td:nth-child(' + (SPR_SUP_RETURNTOCODE + 1) + ')').css("background-color", "gainsboro");
    }
}

function SourceProp() {
    crnwTable = $("#nwGridSourceCon .tblGridBody");
    var len = crnwTable.find('tr').length;
    var cnt = 0;
    for (var x = 0; x <= len - 1; x++) {
        if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_FORREQCOMPUPD + ') input').is(":checked")) {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_REMARKSCOMPUPD + ') input').enable(true);
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_REMARKSCOMPUPD + ')').css("background-color", "");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_REMARKSCOMPUPD + ') input').css("background-color", "");
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_RETURNTO + ')').enable(true);
        }
        else {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_REMARKSCOMPUPD + ')').css("background-color", "gainsboro");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_REMARKSCOMPUPD + ') input').css("background-color", "gainsboro");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_REMARKSCOMPUPD + ') input').css("border", "none");
        }
        if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_ISVIEW + ')').text() == "True") {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VIEWENTRYDTLS + ')').enable(true);
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VIEWFORMDETAILS + ')').enable(true);
        }
        else {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VIEWENTRYDTLS + ')').enable(false);
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VIEWFORMDETAILS + ')').enable(false);
        }
        if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_MENULINK + ')').text() != "") {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VIEWENTRYDTLS + ')').removeClass("btnGray");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VIEWENTRYDTLS + ')').addClass("btnGreen");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_FORREQCOMPUPD + ') input').enable(true);
        }
        else {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VIEWENTRYDTLS + ')').removeClass("btnGreen");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VIEWENTRYDTLS + ')').addClass("btnGray");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_FORREQCOMPUPD + ') input').enable(false);
        }
        if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_PRINTID + ')').text() != "") {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VIEWFORMDETAILS + ')').removeClass("btnGray");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VIEWFORMDETAILS + ')').addClass("btnGreen");
        }
        else {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VIEWFORMDETAILS + ')').removeClass("btnGreen");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VIEWFORMDETAILS + ')').addClass("btnGray");
        }              

        if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_FORREQCOMPUPD + ') input').is(":checked") && crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_ISALLOWRET + ')').text() == "True") {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_RETURNTO + ')').enable(true);
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_RETURNTO + ')').css("background-color", "cyan");
        }
        else {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_RETURNTO + ')').enable(false);
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_RETURNTO + ')').css("background-color", "gainsboro");
        }
        var srcDocno = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_TRANSACTIONNO + ')').text();
        if (srcDocno == nwCurrDocno) {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_FORREQCOMPUPD + ') input').enable(false);
        }
        let dateposted = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VALUEDATE + ')').text();
        if (dateposted == "") {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_FORREQCOMPUPD + ') input').enable(false);
        }
        //else {
        //    crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_FORREQCOMPUPD + ') input').enable(true);
        //}
    }

    if (isView == "true") {
        $('#nwGridSource .tblGridBody tr td:nth-child(' + (SPR_FORREQCOMPUPD + 1) + ') input').enable(false);
        $('#nwGridSource .tblGridBody tr td:nth-child(' + (SPR_FORREQCOMPUPD + 1) + ') input').enable(false);
        $('#nwGridSource .tblGridBody tr td:nth-child(' + (SPR_REMARKSCOMPUPD + 1) + ') input').enable(false);
        $('#nwGridSource .tblGridBody tr td:nth-child(' + (SPR_REMARKSCOMPUPD + 1) + ')').css("background-color", "gainsboro");
        $('#nwGridSource .tblGridBody tr td:nth-child(' + (SPR_REMARKSCOMPUPD + 1) + ') input').css("background-color", "gainsboro");
        $('#nwGridSource .tblGridBody tr td:nth-child(' + (SPR_REMARKSCOMPUPD + 1) + ') input').css("border", "gainsboro");
        $('#nwGridSource .tblGridBody tr td:nth-child(' + (SPR_RETURNTO + 1) + ')').enable(false);
        $('#nwGridSource .tblGridBody tr td:nth-child(' + (SPR_RETURNTO + 1) + ')').css("background-color", "gainsboro");
    }
    //else {       
    //    $('#nwGridSource .tblGridBody tr td:nth-child(' + (SPR_FORREQCOMPUPD + 1) + ') input').enable(true);                      
    //}
}



$(document).on("click", "#btnProcess", function (e) {
    msgBoxContainerQuestion = "Processdata";
    parent_MessageBoxQuestion("Do you want to process the record/s?", "Review Attachment(s) Window", "Question");

    return true;
});

function msgBoxContainerQuestionF(genID, answer) {
    if (genID == "Processdata") {
        if (answer == "Yes") {
            isSave = false;
            nwLoading_Start("xbtnProcess", crLoadingHTML);
            nwParameter_Add_Table("nwGridLocCon");
            nwParameter_Add("year", $("#txtYear").val());
            nwParameter_Add("period", $("#idvallugPeriod").val());
            nwParameter_Add("location", locForm);
            func_ActionDriven("actbtnProcess", false);
        }
    }

    if (genID == "Process") {
        if (answer == "Yes") {
            cust_GetPara();
            nwParameter_Add_Table("nwGridLocCon");
            nwParameter_Add("year", $("#txtYear").val());
            nwParameter_Add("period", $("#idvallugPeriod").val());
            nwParameter_Add("location", locForm);
            func_ActionDriven("actProcess", false);
        }
    }
    
}

$(document).on("click", ".btnVwForms", function () {
    nwLoading_Start("xbtnVwForms", crLoadingHTML);

    var menuitemName = "";
    var printingID = "";
    var docno = "";

    menuitemName = crnwTR.find("td:eq(" + SPR_PRINTNAME + ")").text();
    printingID = crnwTR.find("td:eq(" + SPR_PRINTID + ")").text();
    docno = crnwTR.find("td:eq(" + SPR_TRANSACTIONNO + ")").text();

    if (printingID != "") {
        nwParameter_Add("menuitemName", menuitemName);
        nwParameter_Add("printingID", printingID);
        nwParameter_Add("docno", docno);
        func_ActionDriven("actViewForms", false);
    }
});

//View Code Start
$(document).on("click", ".btnVwAttach", function () {
    var serverlink = $("#txtserverlink").val();
    //if debug
    //serverlink = serverlink.replaceAll('../', '');
    //serverlink = 'http://localhost/' + serverlink
    //
    var path = crnwTR.find("td:eq(" + SPR_SUP_FILEPATH + ")").text();
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
//View Code End

var source_Docno = '';
var supp_Docno = '';

function SourceDocsRet() {
    source_Docno = crnwTR.find("td:eq(" + SPR_TRANSACTIONNO + ")").text();
    if (crnwTR.find("td:eq(" + SPR_FORREQCOMPUPD + ") input").is(":checked") && crnwTR.find("td:eq(" + SPR_ISALLOWRET + ")").text() == "True") {
        crnwTR.find("td:eq(" + SPR_REMARKSCOMPUPD + ") input").val("");
        crnwTR.find("td:eq(" + SPR_REMARKSCOMPUPD + ") input").enable(true);
        crnwTR.find("td:eq(" + SPR_REMARKSCOMPUPD + ")").css("background-color", "");
        crnwTR.find("td:eq(" + SPR_REMARKSCOMPUPD + ") input").css("background-color", "");
        crnwTR.find("td:eq(" + SPR_RETURNTO + ")").enable(true);
        crnwTR.find("td:eq(" + SPR_RETURNTO + ")").css("background-color", "cyan");
        DisableSupporting(source_Docno);
    }
    else if (crnwTR.find("td:eq(" + SPR_FORREQCOMPUPD + ") input").is(":checked") && crnwTR.find("td:eq(" + SPR_ISALLOWRET + ")").text() == "False") {
        crnwTR.find("td:eq(" + SPR_REMARKSCOMPUPD + ") input").val("");
        crnwTR.find("td:eq(" + SPR_REMARKSCOMPUPD + ") input").enable(true);
        crnwTR.find("td:eq(" + SPR_REMARKSCOMPUPD + ")").css("background-color", "");
        crnwTR.find("td:eq(" + SPR_REMARKSCOMPUPD + ") input").css("background-color", "");
        crnwTR.find("td:eq(" + SPR_RETURNTO + ")").enable(false);
        crnwTR.find("td:eq(" + SPR_RETURNTO + ")").css("background-color", "gainsboro");
        DisableSupporting(source_Docno);
    }
    else {
        crnwTR.find("td:eq(" + SPR_REMARKSCOMPUPD + ") input").val("");
        crnwTR.find("td:eq(" + SPR_REMARKSCOMPUPD + ") input").enable(false);
        crnwTR.find("td:eq(" + SPR_REMARKSCOMPUPD + ")").css("background-color", "gainsboro");
        crnwTR.find("td:eq(" + SPR_REMARKSCOMPUPD + ") input").css("background-color", "gainsboro");
        crnwTR.find("td:eq(" + SPR_REMARKSCOMPUPD + ") input").css("border", "none");
        crnwTR.find("td:eq(" + SPR_RETURNTO + ")").enable(false);
        crnwTR.find("td:eq(" + SPR_RETURNTO + ")").css("background-color", "gainsboro");
    }
}


$(document).on("change", ".chkReqCompUpd", function (e) {
    if ($(this).is(":checked")) {
        nwLoading_Start("xDocReturn", crLoadingHTML);
        nwParameter_Add("tranNo", crnwTR.find("td:eq(" + SPR_TRANSACTIONNO + ")").text());
        nwParameter_Add("currRow", crnwTR.index());
        nwParameter_Add("details", "source");
        func_ActionDriven("actValidateRvwAttach", false);
    }
    else {
        SourceDocsRet();
    }

    //source_Docno = crnwTR.find("td:eq(" + SPR_TRANSACTIONNO + ")").text();
    //if (crnwTR.find("td:eq(" + SPR_FORREQCOMPUPD + ") input").is(":checked") && crnwTR.find("td:eq(" + SPR_ISALLOWRET + ")").text() == "True") {
    //    crnwTR.find("td:eq(" + SPR_REMARKSCOMPUPD + ") input").val("");
    //    crnwTR.find("td:eq(" + SPR_REMARKSCOMPUPD + ") input").enable(true);
    //    crnwTR.find("td:eq(" + SPR_RETURNTO + ")").enable(true);
    //    DisableSupporting(source_Docno);
    //}
    //else if (crnwTR.find("td:eq(" + SPR_FORREQCOMPUPD + ") input").is(":checked") && crnwTR.find("td:eq(" + SPR_ISALLOWRET + ")").text() == "False") {
    //    crnwTR.find("td:eq(" + SPR_REMARKSCOMPUPD + ") input").val("");
    //    crnwTR.find("td:eq(" + SPR_REMARKSCOMPUPD + ") input").enable(true);
    //    crnwTR.find("td:eq(" + SPR_RETURNTO + ")").enable(false);
    //    DisableSupporting(source_Docno);
    //}
    //else {
    //    crnwTR.find("td:eq(" + SPR_REMARKSCOMPUPD + ") input").val("");
    //    crnwTR.find("td:eq(" + SPR_REMARKSCOMPUPD + ") input").enable(false);
    //    crnwTR.find("td:eq(" + SPR_RETURNTO + ")").enable(false);
    //}
});

function DisableSupporting(docno) {
    crnwTable = $("#nwGridSuppCon .tblGridBody");
    var len = crnwTable.find('tr').length;
    var cnt = 0;

    for (var x = 0; x <= len - 1; x++) {
        supp_Docno = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_TRANNO + ')').text();
        if (supp_Docno == docno) {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_RETURN + ') input').prop("checked", false);
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_REMARKSDOCRET + ') input').val("");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_REMARKSDOCRET + ') input').enable(false);
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_REMARKSDOCRET + ')').css("background-color", "gainsboro");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_REMARKSDOCRET + ') input').css("background-color", "gainsboro");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_REMARKSDOCRET + ') input').css("border", "none");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_RETURNTOCODE + ')').enable(false);
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_SUP_RETURNTOCODE + ')').css("background-color", "gainsboro");
        }
    }
}

function SuppDocsRet() {
    supp_Docno = crnwTR.find("td:eq(" + SPR_SUP_TRANNO + ")").text();
    var isAllowRet = crnwTR.find("td:eq(" + SPR_SUP_ISALLOWRET + ")").text();

    if (crnwTR.find("td:eq(" + SPR_SUP_RETURN + ") input").is(":checked") && crnwTR.find("td:eq(" + SPR_SUP_ISALLOWRET + ")").text() == "True") {
        crnwTR.find("td:eq(" + SPR_SUP_REMARKSDOCRET + ") input").val("");
        crnwTR.find("td:eq(" + SPR_SUP_REMARKSDOCRET + ") input").enable(true);
        crnwTR.find("td:eq(" + SPR_SUP_REMARKSDOCRET + ")").css("background-color", "");
        crnwTR.find("td:eq(" + SPR_SUP_REMARKSDOCRET + ") input").css("background-color", "");
        crnwTR.find("td:eq(" + SPR_SUP_RETURNTOCODE + ")").enable(true);
        crnwTR.find("td:eq(" + SPR_SUP_RETURNTOCODE + ")").css("background-color", "cyan");
        DisableSource(supp_Docno);
    }
    else if (crnwTR.find("td:eq(" + SPR_SUP_RETURN + ") input").is(":checked") && crnwTR.find("td:eq(" + SPR_SUP_ISALLOWRET + ")").text() == "False") {
        crnwTR.find("td:eq(" + SPR_SUP_REMARKSDOCRET + ") input").val("");
        crnwTR.find("td:eq(" + SPR_SUP_REMARKSDOCRET + ") input").enable(true);
        crnwTR.find("td:eq(" + SPR_SUP_REMARKSDOCRET + ")").css("background-color", "");
        crnwTR.find("td:eq(" + SPR_SUP_REMARKSDOCRET + ") input").css("background-color", "");
        crnwTR.find("td:eq(" + SPR_SUP_RETURNTOCODE + ")").enable(false);
        crnwTR.find("td:eq(" + SPR_SUP_RETURNTOCODE + ")").css("background-color", "gainsboro");
        DisableSource(supp_Docno);
    }
    else {
        crnwTR.find("td:eq(" + SPR_SUP_REMARKSDOCRET + ") input").val("");
        crnwTR.find("td:eq(" + SPR_SUP_REMARKSDOCRET + ") input").enable(false);
        crnwTR.find("td:eq(" + SPR_SUP_REMARKSDOCRET + ")").css("background-color", "gainsboro");
        crnwTR.find("td:eq(" + SPR_SUP_REMARKSDOCRET + ") input").css("background-color", "gainsboro");
        crnwTR.find("td:eq(" + SPR_SUP_REMARKSDOCRET + ") input").css("border", "none");
        crnwTR.find("td:eq(" + SPR_SUP_RETURNTOCODE + ")").enable(false);
        crnwTR.find("td:eq(" + SPR_SUP_RETURNTOCODE + ")").css("background-color", "gainsboro");
    }
}

$(document).on("change", ".chkReturn", function (e) {
    if ($(this).is(":checked")) {
        nwLoading_Start("xDocReturn", crLoadingHTML);
        nwParameter_Add("tranNo", crnwTR.find("td:eq(" + SPR_SUP_TRANNO + ")").text());
        nwParameter_Add("currRow", crnwTR.index());
        nwParameter_Add("details", "supp");
        func_ActionDriven("actValidateRvwAttach", false);
    }
    else {
        SuppDocsRet();
    }

    //supp_Docno = crnwTR.find("td:eq(" + SPR_SUP_TRANNO + ")").text();
    //if (isValidate == true) {
    //    MessageBox("Cannot proceed. Transaction No. " + supp_Docno + " has pending documents requiring compliance updating.", "Review Attachment(s)", "error");
    //    crnwTR.find("td:eq(" + SPR_SUP_RETURN + ")").prop("checked", false);
    //}
    //else {
       
    //    var isAllowRet = crnwTR.find("td:eq(" + SPR_SUP_ISALLOWRET + ")").text();

    //    if (crnwTR.find("td:eq(" + SPR_SUP_RETURN + ") input").is(":checked") && crnwTR.find("td:eq(" + SPR_SUP_ISALLOWRET + ")").text() == "True") {
    //        crnwTR.find("td:eq(" + SPR_SUP_REMARKSDOCRET + ") input").val("");
    //        crnwTR.find("td:eq(" + SPR_SUP_REMARKSDOCRET + ") input").enable(true);
    //        crnwTR.find("td:eq(" + SPR_SUP_RETURNTOCODE + ")").enable(true);
    //        DisableSource(supp_Docno);
    //    }
    //    else if (crnwTR.find("td:eq(" + SPR_SUP_RETURN + ") input").is(":checked") && crnwTR.find("td:eq(" + SPR_SUP_ISALLOWRET + ")").text() == "False") {
    //        crnwTR.find("td:eq(" + SPR_SUP_REMARKSDOCRET + ") input").val("");
    //        crnwTR.find("td:eq(" + SPR_SUP_REMARKSDOCRET + ") input").enable(true);
    //        crnwTR.find("td:eq(" + SPR_SUP_RETURNTOCODE + ")").enable(false);
    //        DisableSource(supp_Docno);
    //    }
    //    else {
    //        crnwTR.find("td:eq(" + SPR_SUP_REMARKSDOCRET + ") input").val("");
    //        crnwTR.find("td:eq(" + SPR_SUP_REMARKSDOCRET + ") input").enable(false);
    //        crnwTR.find("td:eq(" + SPR_SUP_RETURNTOCODE + ")").enable(false);
    //    }
    //}
});

function DisableSource(docno) {
    crnwTable = $("#nwGridSourceCon .tblGridBody");
    var len = crnwTable.find('tr').length;
    var cnt = 0;

    for (var x = 0; x <= len - 1; x++) {
        source_Docno = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_TRANSACTIONNO + ')').text();
        if (docno == source_Docno) {
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_FORREQCOMPUPD + ') input').prop("checked", false);
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_REMARKSCOMPUPD + ') input').val("");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_REMARKSCOMPUPD + ') input').enable(false);
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_REMARKSCOMPUPD + ')').css("background-color", "gainsboro");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_REMARKSCOMPUPD + ') input').css("background-color", "gainsboro");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_REMARKSCOMPUPD + ') input').css("border", "none");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_RETURNTO + ')').enable(false);
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_RETURNTO + ')').css("background-color", "gainsboro");
        }
    }
}

function SourceDtlsProp() {
    $('#nwGridSourceCon .tblGridBody tr td:nth-child(' + (SPR_RETURNTO + 1) + ')').enable(false);
    $('#nwGridSourceCon .tblGridBody tr td:nth-child(' + (SPR_RETURNTO + 1) + ')').css("background-color", "gainsboro");
}

function SuppDtlsProp() {
    $('#nwGridSuppCon .tblGridBody tr td:nth-child(' + (SPR_SUP_RETURNTOCODE + 1) + ')').enable(false);
    $('#nwGridSuppCon .tblGridBody tr td:nth-child(' + (SPR_SUP_RETURNTOCODE + 1) + ')').css("background-color", "gainsboro");
}

$(document).on("click", ".btnVwEntry", function (e) {
    nwLoading_Start("xbtnDtls", crLoadingHTML);
    var fullength = "";
    var title = crnwTR.find("td:eq(" + SPR_MENUITEM + ")").text(); //Menu Item Name
    var nwDocno = crnwTR.find("td:eq(" + SPR_TRANSACTIONNO + ")").text();
    var trantype = crnwTR.find("td:eq(" + SPR_TRANTYPE + ")").text();
    nwParameter_Add("nwDocno", nwDocno);

    if (title.length > 0) {
        nwParameter_Add("urlPath", window.location.origin);
        nwParameter_Add("tranType", trantype);

        fullength = crnwTR.find("td:eq(" + SPR_MENULINK + ")").text() + encodeURI(nwDocno); //Link of filepath

        $('.nwmenuFrame').attr("src", fullength);

        nwPopupForm_Create("nwPopWindow", true, fullength);
        $('#nwPopWindow .BoxTitle').text(title);

        $("#nwPopWindow").css({ "min-width": "98%" });
        $("#nwPopWindow").css({ "min-height": "98%" });
        nwPopupForm_ShowModal("nwPopWindow");
        $('.dimbgNWnwPopWindow').removeClass('openn');
    }
    nwLoading_End('xbtnDtls');
});

function closeIframeFromRvw() {
    try {
        if (window.top != window.self) { //check if the menu item is in iframe
            parent.CloseRvwAttach();
        }
    } catch (err) { }
}



$(document).on('click', '#docattviewzoomin', function () {
    ZoomIn();
});

$(document).on('click', '#docattviewzoomout', function () {
    ZoomOut();
});

var zoomAtual = 1;

function ZoomIn() {
    var myPDF = document.getElementById("vwImage");

    if (zoomAtual >= 10) return false;
    else {
        zoomAtual = zoomAtual + 0.5;
        myPDF.style.zoom = zoomAtual;
    }
}

function ZoomOut() {
    var myPDF = document.getElementById("vwImage");

    if (zoomAtual <= 0.5) return false;
    else {
        zoomAtual = zoomAtual - 0.5;
        myPDF.style.zoom = zoomAtual;
    }
}


//open in new tab
function opennewTab(c, tx) {
    var mainurl = "";
    mainurl = "DCViewAttachmentViewer.cshtml"; //change

    mainurl += "?c=" + c + "&tx=" + tx;
    window.open(mainurl, '_blank');
}

var xurl = this.location.origin;
var xcurl = "";
//$(function () {
//    $.contextMenu({
//        selector: '#nwGridSupp-nwData tbody > tr > td.btnVwAttach ',
//        callback: function (key, options) {
//            var serverlink = $("#txtserverlink").val();
//            serverlink = serverlink.replaceAll('../../../../', xurl + "/");

//            var path = crnwTR.find("td:eq(" + SPR_SUP_FILEPATH + ")").text();
//            if (path == "") {
//                MessageBox("No attachment found.", "Document Attachment", "error");
//                return false;
//            }

//            if (key == "ALL") {

//                xcurl = serverlink + path;

//                nwParameter_Add("url", xcurl);

//                nwParameter_Add("title", "Attachment");

//                nwLoading_Start("actViewFiles", crLoadingHTML);
//                func_ActionDriven("actViewFiles", false);

//            }
//            else {
//                return false;
//            }
//        },
//        items: test()
//    });
//});

var x = [];
function test() {

    x = {
        "ALL": { name: "Open in new tab", icon: " " }
    }
    return x;
}

function getGridData(nwGrid, type, col, row) {
    var data = '';

    if (type == 'input')
        data = nwGridMainCon_Book.ActiveSheet.GetValue(col, row);
    else
        data = nwGridMainCon_Book.ActiveSheet.GetValue(col, row);

    return data;
}
function p8Spread_Click(canvasID, row, col) {
    console.log("p8Spread_Click " + canvasID + " " + row + " " + col);
    $('#txtCanvasClick').text(canvasID);
    $('#txtRowClick').text(row);
    $('#txtColumnClick').text(col);


    if (canvasID == "nwGridSource") {
        if (col == SPR_RETURNTO - 1) {
            //lookUpCustomize("lugReturnTo", 2);
            //$("#menuCreatorContainer").addClass('p8spreadlookup');
            //workIns_ = nwGrid_Book.ActiveSheet.GetValue(SPR_WORKINSTRUCTIONS - 1, row)
        } else if (col == SPR_VIEWENTRYDTLS - 1) {
            //docno = nwGrid_Book.ActiveSheet.GetValue(SPR_TRANSACTIONNO - 1, row);
            nwLoading_Start("xbtnDtls", crLoadingHTML);
            var fullength = "";
            //var title = crnwTR.find("td:eq(" + SPR_MENUITEM + ")").text(); //Menu Item Name
            //var nwDocno = crnwTR.find("td:eq(" + SPR_TRANSACTIONNO + ")").text();
            //var trantype = crnwTR.find("td:eq(" + SPR_TRANTYPE + ")").text();
            var title = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_MENUITEM - 1, row);  //Menu Item Name
            var nwDocno = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_TRANSACTIONNO - 1, row); 
            var trantype = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_TRANTYPE - 1, row); 
            nwParameter_Add("nwDocno", nwDocno);

            if (title.length > 0) {
                nwParameter_Add("urlPath", window.location.origin);
                nwParameter_Add("tranType", trantype);

                //fullength = crnwTR.find("td:eq(" + SPR_MENULINK + ")").text() + encodeURI(nwDocno); //Link of filepath
                let link = GetCurrentURL() + nwGridMainCon_Book.ActiveSheet.GetValue(SPR_MENULINK - 1, row) + encodeURI(nwDocno);

                $('.nwmenuFrame').attr("src", link);

                nwPopupForm_Create("nwPopWindow", true, link);
                $('#nwPopWindow .BoxTitle').text(title);

                //$("#nwPopWindow").css({ "min-width": "98%" });
                //$("#nwPopWindow").css({ "min-height": "98%" });
                nwPopupForm_ShowModal("nwPopWindow");
                //$('.dimbgNWnwPopWindow').removeClass('openn');
            }
            nwLoading_End('xbtnDtls');

        }
        else if (col == SPR_VIEWFORMDETAILS - 1) {
 

            nwLoading_Start("xbtnVwForms", crLoadingHTML);

            var menuitemName = "";
            var printingID = "";
            var docno = "";

            menuitemName = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_PRINTNAME - 1, row); 
            printingID = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_PRINTID - 1, row);
            docno = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_TRANSACTIONNO - 1, row);
   

            if (printingID != "") {
                nwParameter_Add("menuitemName", menuitemName);
                nwParameter_Add("printingID", printingID);
                nwParameter_Add("docno", docno);
                func_ActionDriven("actViewForms", false);
            }
        }
        

        
    }
    if (canvasID == 'nwGridSupp') {
        if (col == SPR_SUP_RETURNTOCODE - 1) {
            //docno = nwGrid_Book.ActiveSheet.GetValue(SPR_SUP_TRANNO - 1, row);

            //lookUpCustomize("lugReturnToSup", 2);

        }
        else if (col == SPR_SUP_VWATTACH - 1) {
            var serverlink = $("#txtserverlink").val();
            //if debug
            //serverlink = serverlink.replaceAll('../', '');
            //serverlink = 'http://localhost/' + serverlink
            //

            var path = nwGridMainCon_Book2.ActiveSheet.GetValue(SPR_SUP_FILEPATH - 1, row);
            if (path == "") {
                MessageBox("No attachment found.", "Document Attachment", "error");
                return false;
            }
            filepath = serverlink + path;
            nwviewattach(filepath);


            //nwPopupForm_Create("nwUploadCon", false);
            //nwPopupForm_ShowModal("nwUploadCon");
            //docno = nwGrid_Book.ActiveSheet.GetValue(SPR_SUP_TRANNO - 1, row);

            //$("#menuCreatorContainer").addClass('p8spreadlookup');
            //workIns_ = nwGrid_Book.ActiveSheet.GetValue(SPR_WORKINSTRUCTIONS - 1, row)
        }
        
    }
}
function AutoCompiled(row) {
    var isTag = getGridData(`nwGridSuppCon`, '', SPR_SUP_COMPLIED - 1, row);

    if (isTag == "1") {
        value = getGridData(`nwGridSuppCon`, 'input', SPR_SUP_COMPLIED - 1, row);

        if (value == "") {
            isAuto = false;
        }
    }

    if (value != '' ) {
        //$(`#nwGrid2-nwData tr:eq(${row}) td:eq(${SPR_COMPILEDHDR}) input`).prop('checked', isAuto);
        //$(`#nwGrid2-nwData tr:eq(${row}) td:eq(${SPR_COMPILEDHDR}) input`).prop('checked', isAuto);
        nwGridMainCon_Book.ActiveSheet.SetText(SPR_SUP_COMPLIED - 1, row, isAuto);
        nwGridMainCon_Book.ActiveSheet.SetText(SPR_SUP_COMPLIED - 1, row, isAuto);


    }
    else {
        // $(`#nwGrid2-nwData tr:eq(${row}) td:eq(${SPR_COMPILEDHDR}) input`).prop('checked', false);
        nwGridMainCon_Book.ActiveSheet.SetText(SPR_SUP_COMPLIED - 1, row, false);
    }
}


function p8Spread_Change(canvasID, row, col) {
    console.log("p8Spread_Change " + canvasID + " " + row + " " + col);

    $('#txtCanvasChange').text(canvasID);
    $('#txtRowChange').text(row);
    $('#txtColumnChange').text(col);

    var length = nwGridMainCon_Book2.ActiveSheet.Data.length;

    if (row + 1 == length) {
        nwGridMainCon_Book2.ActiveSheet.RowAdd();

        nwGridMainCon_Book2.ActiveSheet.SetEnable(SPR_SUP_COMPLIED - 1, row + 1, false);
        nwGridMainCon_Book2.ActiveSheet.SetEnable(SPR_SUP_REQUIRED - 1, row + 1, false);
        if (nwGridMainCon_Book2.ActiveSheet.GetValue(SPR_SUP_COMPLIED - 1, row) != '') {
            AutoCompiled(row);
        }

        //nwGridMainCon_Book2;
        //nwGridMainCon_Sheet2
        //SPR_SUP_REQUIRED

    }
}


function DisableUponView() {
    var isDisabled = isView.toLowerCase() == "true" ? true : false;
    var $row;
            if (isDisabled) {

                $(`#nwGridSupp tr`).each(function (i, n) {
                  $row = $(n);
                  $row.find(`td:eq(${SPR_SUP_COMPLIED}) input`).enable(false);
                  $row.find(`td:eq(${SPR_SUP_REQUIRED}) input`).enable(false);

              });

        }

}
   