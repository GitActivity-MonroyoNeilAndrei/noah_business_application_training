var nwGridCon_Book;
var nwGridCon_Sheet;

var nwValidationListGridCon_Book;
var nwValidationListGridCon_Sheet;

var xsessionstamp = "";

var Grid_Index = 1,
    SPR_RECUSER = Grid_Index,
    SPR_STATUS = ++Grid_Index,
    SPR_ITEMCODE = ++Grid_Index,
    SPR_ITEMDESC = ++Grid_Index,
    SPR_VENDORCODE = ++Grid_Index,
    SPR_REGNAME = ++Grid_Index,
    SPR_UOM = ++Grid_Index,
    SPR_UNITCOST = ++Grid_Index,
    SPR_EFFDATE = ++Grid_Index,
    SPR_REMARKS = ++Grid_Index,
    SPR_ROWNUM = ++Grid_Index;

var pageTitlse = "Vendor Price Assignment";

var ValidationList = [];
function func_Reload() {
    crLnk = GetCurrentURL() + "APVendorPriceAssignment_Gateway";
    crLnkGateKey = "APVendorPriceAssignment";
    crnwTagSingleBind = true;

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    DisableFields();
    nwPopupForm_Create("nwUploadCon", false);
    nwPopupForm_Create("frmValidationList", false);

    return isContinue;
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    $('#txtID').val(xsessionstamp + "-" + baseSessionID);
    func_Toolbox_Clear();
    ValidationList = [];
    return isContinue;
}

function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", pageTitlse, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", pageTitlse, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    nwLoading_Start("xRefreshBtn", crLoadingHTML);
    isRefreshed = true;
    return isContinue;
}

function func_ToolboxInquire(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxProcess(indef, enume) {
    var isContinue = true;
    parent_MessageBoxQuestionToolBox("Do you want to process the current record?", pageTitlse, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxImport(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxExport(indef, enume) {
    var isContinue = false;
    var fullsrc = "";
    fullsrc = GetCurrentURL() + "../APVENDORPRICEASSIGNREPORT";
    title = "Vendor Price Assignment Report";

    nwPopupForm_Create("nwPopWindow", true, fullsrc);
    nwPopupForm_ShowModal("nwPopWindow");
    $('#nwPopWindow .modal-hdr-title').text(title);
    $('#nwPopWindow').addClass("nkPopupCon");
    $('#frame_viewDocEntry').attr("src", fullsrc);
    window_Resize("nwPopWindow");
    return isContinue;
}

function func_ToolboxPrint(indef, enume) {
    var isContinue = true;
    //tableToPrint("nwGridCon");
    //parent_MessageBox("Export","Export Sucess","");
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
    nwParameter_Add("inCode", $('#idvallugDa').val());
    nwParameter_Add("inTableName", $('#nwTableName').val());
    nwParameter_Add("nwScreenID", $('#nwScreenID').val());

    try {        nwParameter_Add_DataSet("nwGridCon");    } catch (ex) {    }    try {        nwParameter_Add("nwGridCon_ColumnConfig", JSON.stringify(nwGridCon_Book.ActiveSheet.ColumnConfig));    } catch (ex) {    }
}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara(); nwLoading_Start("xLoadingInt", crLoadingHTML);
    nwParameter_Add("txtCode", $("#txtCode").val());
    RefreshData();
    func_ActionDriven("actBindCollection", false);
}
function func_ToolboxNavigatorBind_Empty() {
    //nwLoading_Start("xSample", crLoadingHTML);
    RefreshData();
    //func_ActionDriven("actBindCollectionEmpty", false);
}

///////////////////////////////////////

var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    if (idName == 'toolboxInquire') {

    }
}

function EnableFields() {
    $('#btnDLForm').enable(true);
    $('#btnDLForm').css('background', 'linear-gradient(rgba(61, 142, 243, 0.89), rgb(35, 10, 154))');
    $('#btnDLForm').css('color', 'white');

    $('#btnUploadPriceList').enable(true);
    $('#btnUploadPriceList').css('background', 'linear-gradient(rgb(251, 180, 122),rgb(255, 101, 2))');
    $('#btnUploadPriceList').css('color', 'white');

    $('#nwGridCon').enable(true);
    $("#noah-webui-default-load-vwBtn").enable(true);
}

function EnableDataCheck()
{
    $('#btnDataCheck').enable(true);
    $('#btnDataCheck').css('background', 'linear-gradient(#04E20B,#08A206)');
    $('#btnDataCheck').css('color', 'white');
}

function EnableValidationList() {
    $('#btnValidationList').enable(true);
    $('#btnValidationList').css('background', 'linear-gradient(rgb(249, 143, 143),rgba(187, 0, 0, 0.95))');
    $('#btnValidationList').css('color', 'white');
}

function DisableFields() {
    $('#btnDataCheck').enable(false);
    $('#btnDataCheck').css('background', '');
    $('#btnDataCheck').css('color', '');

    $('#btnDLForm').enable(false);
    $('#btnDLForm').css('background', '');
    $('#btnDLForm').css('color', '');

    $('#btnValidationList').enable(false);
    $('#btnValidationList').css('background', '');
    $('#btnValidationList').css('color', '');

    $('#btnUploadPriceList').enable(false);
    $('#btnUploadPriceList').css('background', '');
    $('#btnUploadPriceList').css('color', '');

    $('#nwGridCon').enable(false);

    $("#noah-webui-Toolbox").bindingSave().visible(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    $("#noah-webui-Toolbox").bindingInquire().visible(false);
    $("#noah-webui-Toolbox").bindingExport().visible(false);

    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingRefresh().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-default-load-vwBtn").enable(false);
}

function EnableFieldsDone() {//Binding Done
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
}

function DisableFieldsEmpty() {
    DisableFields();
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}

function changeFile(ver, id) {
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

    if (size > 5242880 || (type != 'xlsx' && type != 'xls')) {
        MessageBox("Attachment does not follow file type and size requirements."); $(ver).val("");
    }
}

$(document).on("click", "#btnDLForm", function () {
    window.location = GetCurrentURL() + '../AP/DataSetup/APVendorPriceAssignment/VendorPriceAssignment.xlsx';
    return false;
});

$(document).on("click", "#btnDataCheck", function () {
    cust_GetPara();
    nwLoading_Start("actDataCheck", crLoadingHTML);
    nwParameter_Add("ID", $('#txtID').val());
    func_ActionDriven("actDataCheck", false);
});

$(document).on("click", '#btnUploadPriceList', function () {
    var errormsg = "";
    var Grid = nwGridCon_Book.ActiveSheet;
    var maxLen = Grid.GetMaxRow();
    if (errormsg == "") {
        $("#myfile").val("");
        $("#status").find("span").text("");
        $("#prgbarUpload ").find(".percent").text("0%");
        $("#prgbarUpload .bar").css("width", "0%");
        $('#btnDataCheck').enable(false);
        $('#btnValidationList').enable(false);
        resetMainGrid();
        nwPopupForm_ShowModal("nwUploadCon");
        $("#nwUploadCon").find(".modal-hdr-title").text("Upload");
    } else {
        MessageBox(errormsg, pageTitlse, "error");
        isContinue = false;
    }

    return false;
});

var PromptID = "";

$(document).on('click', '#btnValidationList', function () {
    cust_GetPara();
    nwParameter_Add("ID", $('#txtID').val());
    nwParameter_Add('ValidationList', JSON.stringify(ValidationList));
    nwLoading_Start("actValidationList", crLoadingHTML);
    func_ActionDriven("actValidationList", false);
    return false;
});

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

function getLookupData(idnum, index) {
    var data = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idnum - 1) + ") td:eq(" + index + ") span").text();
    return data;
}

function ShowGridHstCon(gridConName) {
    nwGrid_TableAdjust(`${gridConName}`);
    nwGrid_TableFreeze(`${gridConName}`);
    nwGrid_makeResize(`${gridConName}`);
}

$(document).on("change", "#fileCon", function () {
    changeFile(this);
});

$(document).on("click", "#btnupload", function () {
    upload();
});

function changeStatus() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var maxLen = Grid.GetMaxRow();

    for (var x = 0; x <= maxLen; x++) {
        if (ValidationList.some(col => col.Rownum == (x + 5))) {
            Grid.SetText((SPR_STATUS - 1), x, "Invalid Data");
        }
        else {
            Grid.SetText((SPR_STATUS - 1), x, "Ready for Migration");
        }
    }
}

$(document).on("click", "#noah-webui-default-Export-Validation", function () {
    fn_ExportGrid("nwValidationListGridCon");
    return false;
});

function resetMainGrid() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var maxLen = Grid.GetMaxRow();

    Grid.RowDelete(0, maxLen);
    Grid.RowAdd(0, 5);
}