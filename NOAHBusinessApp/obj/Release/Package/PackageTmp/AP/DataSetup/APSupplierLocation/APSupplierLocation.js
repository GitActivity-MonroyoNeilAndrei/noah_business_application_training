var SPR_Index = 1,
    SPR_DateCreated = SPR_Index,
    SPR_TagMail = ++SPR_Index,
    SPR_LocationCode = ++SPR_Index,
    SPR_LocationTypeCode = ++SPR_Index,
    SPR_LocationTypeDesc = ++SPR_Index,
    SPR_FullLocationTag = ++SPR_Index,
    SPR_FullLocationAdd = ++SPR_Index,
    SPR_UnitNo = ++SPR_Index,
    SPR_FloorNo = ++SPR_Index,
    SPR_BldgNo = ++SPR_Index,
    SPR_Establishment = ++SPR_Index,
    SPR_BldgName = ++SPR_Index,
    SPR_Landmark = ++SPR_Index,
    SPR_StreetNo = ++SPR_Index,
    SPR_StreetName = ++SPR_Index,
    SPR_Lot = ++SPR_Index,
    SPR_BLock = ++SPR_Index,
    SPR_Phase = ++SPR_Index,
    SPR_Subdivision = ++SPR_Index,
    SPR_Zone = ++SPR_Index,
    SPR_AreaCode = ++SPR_Index,
    SPR_AreaDesc = ++SPR_Index,
    SPR_BrgyCode = ++SPR_Index,
    SPR_BrgyDesc = ++SPR_Index,
    SPR_AltBrgy = ++SPR_Index,
    SPR_MuniCode = ++SPR_Index,
    SPR_MuniDesc = ++SPR_Index,
    SPR_ProvinceCode = ++SPR_Index,
    SPR_ProvinceDesc = ++SPR_Index,
    SPR_RegionCode = ++SPR_Index,
    SPR_RegionDesc = ++SPR_Index,
    SPR_CountryCode = ++SPR_Index,
    SPR_CountryDesc = ++SPR_Index,
    SPR_IntSubGrpCode = ++SPR_Index,
    SPR_IntSubGrpDesc = ++SPR_Index,
    SPR_IntGrpCode = ++SPR_Index,
    SPR_IntGrpDesc = ++SPR_Index,
    SPR_ZipCode = ++SPR_Index,
    SPR_StatusCode = ++SPR_Index,
    SPR_StatusDesc = ++SPR_Index,
    SPR_Remove = ++SPR_Index;

var municipalitycode = "";
var isnewrow = 0;
var nwSupplierCode = "";
var tradename = "";
var nwParam = 0;
var isView = "";
var nwIsReport = 0;
var menuTitle = "Vendor Location"
var nwGridCon_Book;
var nwGridCon_Sheet;

function func_Reload() {

    crLnk = GetCurrentURL() + "APSupplierLocation_Gateway";
    crLnkGateKey = "APSupplierLocation";
    crnwTagSingleBind = true;

    nwSupplierCode = getParameterByName('nwSupplierCode');
    tradename = getParameterByName('tradename');

    nwIsReport = getParameterByName('nwIsReport');
    nwParameter_Add("nwIsReport", nwIsReport);

    isView = getParameterByName("isView");
    nwParameter_Add("isView", isView);

    //nwParameter_Add("idvallugsupplier", suppliercode);
    //func_ActionDriven("actDisable", false);

    var isContinue = true;
    init_request();
    ToolBoxGetData = true;
    //isLoad();
    DisableFields();
    return isContinue;
}

////////////////////////// TOol Box

function IsnwType() {
    if (nwSupplierCode != "" && nwIsReport == 0) {
        nwLoading_Start('xBind', crLoadingHTML);
        nwParameter_Add('nwSupplierCode', nwSupplierCode);
        $('#noah-webui-default-Refresh').click();
        $("#noah-webui-Toolbox-BindingNavigator").hide();
        $("#noah-webui-default-New").hide();
        $("#noah-webui-default-Inquire").hide();

        $(".history_switch").prop("disabled", false);
        $('#chkBox').prop('checked', true);

    }

    else if (nwSupplierCode != "" && nwIsReport == 1) {
        nwLoading_Start('xBind', crLoadingHTML);
        nwParameter_Add('nwSupplierCode', nwSupplierCode);
        $('#noah-webui-default-Refresh').click();
        $("#noah-webui-Toolbox-BindingNavigator").hide();
        $("#noah-webui-default-New").hide();
        $("#noah-webui-default-Save").enable(false);
        $("#noah-webui-default-Refresh").enable(false);
        $("#noah-webui-default-Export").enable(false);
        $("#noah-webui-default-Inquire").hide();

        $(".history_switch").prop("disabled", false);
        $('#chkBox').prop('checked', true);
    }

    else {
        $("#noah-webui-default-New").hide();
        $("#noah-webui-default-Save").hide();
        $("#noah-webui-Toolbox-BindingNavigator").show();
        $("#noah-webui-Toolbox-BindingNavigator").enable(true);
        $(".history_switch").prop("disabled", false);
        $('#chkBox').prop('checked', true)


    }

    //else if (nwDocno != "" && nwIsReport == "0") {

    //    nwLoading_Start('xLoadingInt', crLoadingHTML);
    //    nwParameter_Add('nwDocno', nwDocno);
    //    $('#noah-webui-default-Refresh').click();
    //    $("#noah-webui-Toolbox").hide();
    //    //nwLoading_Start('xLoadingInt', crLoadingHTML);
    //    //nwParameter_Add('nwIsReport', nwIsReport);
    //    //nwParameter_Add('nwDocno', nwDocno);
    //    //cust_GetPara();
    //    //func_ActionDriven("actLoadJRDtls", false);
    //}
}


function isLoad() {
    if (getParameterByName("nwParam") == '1') {
        $('#nwGridCon').enable(true);
        $(".history_switch").prop("disabled", true);
        $('#chkBox').prop('checked', true);
        //checkgrid();
    }
    else {
        $('#nwGridCon').enable(false);
        $(".history_switch").prop("disabled", false);
        $('#chkBox').prop('checked', true)
    }
}

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    toolboxnew();

    isnewrow = 1;
    func_Toolbox_Clear();
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    nwParameter_Add("suppliercode", $('#idvallugsupplier').val());
    nwParameter_Add('isnewrow', isnewrow);
    nwParameter_Add_Table("nwGridCon");
    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", "Vendor Location", "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    nwParameter_Add("suppliercode", $('#idvallugsupplier').val());
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", "Vendor Location", "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    toolboxrefresh();
    var isContinue = true;
    cust_GetPara();
    isnewrow = 0;
    nwLoading_Start("xRefreshBtn", crLoadingHTML);
    //suppliercode = getParameterByName('suppliercode');
    //checkgrid();

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
    cust_GetPara();
    nwLoading_Start("xExport", crLoadingHTML);
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
    nwParameter_Add('nwSupplierCode', nwSupplierCode);
    nwParameter_Add("nwIsReport", nwIsReport);
    nwParameter_Add('SupplierCode', $('#idvallugsupplier').val());
    nwParameter_Add('SupplierDesc', $('#descvallugsupplier').val());
    nwParameter_Add_DataSet("nwGridCon")
}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwLoading_Start("xBind", crLoadingHTML);
    //$('#noah-webui-Toolbox-BindingNavigator').removeClass('noah-webui-disabled');
    //    RefreshData();
    func_ActionDriven("actBindCollection", true);

    //nwParameter_Add("Tradename", $('#descvallugsupplier').val());
    //if ($('#idvallugsupplier').val().length == 0)
    //{
    //    $('#idvallugsupplier').val(nwSupplierCode);
    //}
    //if (tradename.length>0) {
    //    $('#descvallugsupplier').val(tradename);
    //}

    //isLoad();
    //checkgrid();

}

function func_ToolboxNavigatorBind_Empty() {

    nwLoading_Start("xBindEmpty", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollectionEmpty", false);
}

///////////////////////////////////////

var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    if (idName == 'toolboxInquire') {
    }

    if (idName == 'lugLocationType') {

        var codeVal = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (0) + ")").text();
        var descVal = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (1) + ")").text();

        var row = nwGridCon_Book.ActiveSheet.CellSelected.row - 1;
        nwGridCon_Book.ActiveSheet.SetText(SPR_LocationTypeCode - 1, row, codeVal, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_LocationTypeDesc - 1, row, descVal, true);
    }

    if (idName == 'lugArea') {

        //var code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(0)").text();
        //var desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(1)").text();

        //nwLib.nwTempTable_RowData_Set("nwGridCon", crnwTR.index(), SPR_AreaCode)(code);
        //nwLib.nwTempTable_RowData_Set("nwGridCon", crnwTR.index(), SPR_AreaDesc)(desc);

        var codeVal = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (0) + ")").text();
        var descVal = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (1) + ")").text();

        var row = nwGridCon_Book.ActiveSheet.CellSelected.row - 1;
        nwGridCon_Book.ActiveSheet.SetText(SPR_AreaCode - 1, row, codeVal, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_AreaDesc - 1, row, descVal, true);

    }

    if (idName == 'lugBrgy') {


        var codeVal = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (0) + ")").text();
        var descVal = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (1) + ")").text();
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (2) + ")").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (3) + ")").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (4) + ")").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (5) + ")").text();
        var rgnCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (6) + ")").text();
        var rgnDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (7) + ")").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (8) + ")").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (9) + ")").text();
        var isgCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (10) + ")").text();
        var isgDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (11) + ")").text();
        var igCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (12) + ")").text();
        var igDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (13) + ")").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (14) + ")").text();
       

        var row = nwGridCon_Book.ActiveSheet.CellSelected.row - 1;

        nwGridCon_Book.ActiveSheet.SetText(SPR_BrgyCode - 1, row, codeVal, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_BrgyDesc - 1, row, descVal, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_MuniCode - 1, row, muniCode, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_MuniDesc - 1, row, muniDesc, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_ProvinceCode - 1, row, provCode, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_ProvinceDesc - 1, row, provDesc, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_RegionCode - 1, row, rgnCode, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_RegionDesc - 1, row, rgnDesc, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_CountryCode - 1, row, cntryCode, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_CountryDesc - 1, row, cntryDesc, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_IntSubGrpCode - 1, row, isgCode, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_IntSubGrpDesc - 1, row, isgDesc, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_IntGrpCode - 1, row, igCode, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_IntGrpDesc - 1, row, igDesc, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_ZipCode - 1, row, zipCode, true);
 

        $(`#nwGrid1-nwData tr:eq(${crnwTR.index()}) td:eq(${SPR_AltBrgy})`).enable(false);
        $(`#nwGrid1-nwData tr:eq(${crnwTR.index()}) td:eq(${SPR_AltBrgy})`).css("background-color", "gainsboro");

        enabledzipcode();

    }

    if (idName == 'lugMuni') {
       var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (0) + ")").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (1) + ")").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (2) + ")").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (3) + ")").text();
        var rgnCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (4) + ")").text();
        var rgnDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (5) + ")").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (6) + ")").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (7) + ")").text();
        var isgCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (8) + ")").text();
        var isgDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (9) + ")").text();
        var igCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (10) + ")").text();
        var igDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (11) + ")").text();

        nwGridCon_Book.ActiveSheet.SetText(SPR_MuniCode - 1, row, muniCode, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_MuniDesc - 1, row, muniDesc, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_ProvinceCode - 1, row, provCode, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_ProvinceDesc - 1, row, provDesc, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_RegionCode - 1, row, rgnCode, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_RegionDesc - 1, row, rgnDesc, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_CountryCode - 1, row, cntryCode, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_CountryDesc - 1, row, cntryDesc, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_IntSubGrpCode - 1, row, isgCode, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_IntSubGrpDesc - 1, row, isgDesc, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_IntGrpCode - 1, row, igCode, true);
        nwGridCon_Book.ActiveSheet.SetText(SPR_IntGrpDesc - 1, row, igDesc, true);
    }

    nwParameter_Add("supplierCode", $('#idvallugsupplier').val());
    nwParameter_Add("tradename", $('#descvallugsupplier').val());
}


function EnableFields() {
    $(".history_switch").prop("disabled", true);
    $('#chkBox').prop('checked', true);
    $('#nwGridCon').enable(true);
    
}

function DisableFields() {
    $(".history_switch").prop("disabled", true);
    $('#chkBox').prop('checked', true);
    $('#nwGridCon').enable(false);
}

function EnableFieldsDone() {//Binding Done
    $(".history_switch").prop("disabled", false);
    $('#chkBox').prop('checked', true);
    $('#nwGridCon').enable(true);
    $("#noah-webui-Toolbox").bindingNew().visible(false);

}

function DisableFieldsEmpty() {
    $('#nwGridCon').enable(true);
}

function ClearFields() {
    $('#chkBox').prop('checked', true);
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();

}


var xaddtoList = 0;
function nwGrid_AddtoListDoneCustom(nwGridID, addtoListTableRec, index) {
    //if (nwGridID == "lugEmpDesignation") {
    //    var xcode = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text().trim();
    //    var xdesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text().trim();
    //    $("#tblImportTempTable > tbody").append("<tr><td>" + xcode + "</td><td>" + xdesc + "</td></tr>");
    //    xaddtoList++;
    //}
}

function saveAddtoList() {
    //if (xaddtoList > 0) {
    //    nwParameter_Add_Table("tblImportTempTable");
    //    func_ActionDriven("actSaveImported", false);
    //}
    //else {

    //    MessageBox("Error: No selected list ", "Error", "Error");
    //}
}

function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
    if (nwGridID == "nwGridCon") {
        var col = nwGridCon_Book.ActiveSheet.CellSelected.col - 1;
        var row = nwGridCon_Book.ActiveSheet.CellSelected.row - 1;

        if (col == SPR_LocationTypeCode - 1) {

            var mainCode = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
            var mainDesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

            crnwTRtemp[SPR_LocationTypeCode - 1] = mainCode;
            crnwTRtemp[SPR_LocationTypeDesc - 1] = mainDesc;

        }
    }
    return crnwTRtemp;
}

function nwGrid_AddtoListLoaded(verID) {
    saveAddtoList();
}

function p8Spread_DblClick(canvasID, row, col) {
    p8Spread_CurBook = canvasID
    var SupplierCode = $("#idvallugsupplier").val();

    if (SupplierCode == "" || row == 0) 
        return false;

    if (canvasID == "nwGridCon") {
        if (col == SPR_LocationTypeCode - 1) {
            lookUpCustomize("lugLocationType", 1);
            
        }
        if (col == SPR_AreaCode - 1) {
            var ischecked = nwGridCon_Book.ActiveSheet.GetValue(SPR_FullLocationTag - 1, row);
            if (ischecked == 1) {
                return false;
            }
            lookUpCustomize("lugArea", 1);
        }
        if (col == SPR_BrgyCode - 1) {
            var ischecked = nwGridCon_Book.ActiveSheet.GetValue(SPR_FullLocationTag - 1, row);
            if (ischecked == 1) {
                return false;
            }
            lookUpCustomize("lugBrgy", 1);
        }
        if (col == SPR_MuniCode - 1) {
            var ischecked = nwGridCon_Book.ActiveSheet.GetValue(SPR_FullLocationTag - 1, row);
            if (ischecked == 1) {
                return false;
            }
            lookUpCustomize("lugMuni", 1);
        }
    }
    return true;
}

function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {

    var nwobjID = nwobj.attr('id');
    var nwobjTR = crnwTR.index();

    if (nwobjID == "nwGrid") {
        if (crnwTD.index() == SPR_LocationTypeCode) {
            lookUpCustomize("lugLocationType", 1);
        }

        if (crnwTD.index() == SPR_AreaCode) {

            lookUpCustomize("lugArea", 1);
        }

        if (crnwTD.index() == SPR_BrgyCode) {

            var muni = nwLib.nwTempTable_RowData_Get("nwGridCon ", crnwTR.index(), SPR_MuniCode - 1);
            nwParameter_Add("muni", muni);
            lookUpCustomize("lugBrgy", 1);
        }

        if (crnwTD.index() == SPR_MuniCode) {

            lookUpCustomize("lugMuni", 1);
        }

        if (crnwTD.index() == SPR_StatusCode) {

            lookUpCustomize("lugStatCode", 1);
        }

    }

}

function suppliercodegenerator() {
    crnwTable = $("#nwGridCon .tblGridBody");
    var gridlength = crnwTable.find("tr").length;
    var gridchecker = crnwTR.find("td").length
    //if (SPR_ZONE+1==gridchecker)
    //{
    var counterset = 1;
    var suppliercode = $('#idvallugsupplier').val().substring(0, 12);
    for (var i = 0; i < gridlength + 1; i++) {
        var counter = "";
        var rownum = 1;
        var loctypecode = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_LOCTYPE + ")").text().substring(0, 12);

        if (loctypecode.length > 0) {
            if (i < 10) {
                counter = "00000" + counterset.toString();
            }
            else if (i < 100 && i > 9) {
                counter = "0000" + counterset.toString();
            }
            else if (i < 1000 && i > 99) {
                counter = "000" + counterset.toString();
            }
            else if (i < 10000 && i > 999) {
                counter = "00" + counterset.toString();
            }
            else if (i < 100000 && i > 9999) {
                counter = "0" + counterset.toString();
            }
            else if (i < 1000000 && i > 99999) {
                counter = counterset.toString();
            }
            counterset++;
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SUPPLOCCODE + ")").text(suppliercode + loctypecode + counter);
        }
    }
    //  }

}

function toolboxnew() {
    //$('#idvallugsupplier').val("");
    //$('#descvallugsupplier').val("");
    $('#lugsupplier').removeClass('adisabled');
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingNew().enable(false);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    //checkgrid();
}
function gridRefresh() {
    var rows = nwTempTable_Row_Count("nwGridCon");


    for (var x = 0; x <= rows; x++) {
        if ($("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_FullLocationTag + ") input").is(':checked')) {
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_UnitNo + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_UnitNo + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_FloorNo + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_FloorNo + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgNo + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgNo + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgName + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgName + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetNo + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetNo + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Establishment + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Establishment + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetName + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetName + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Lot + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Lot + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Landmark + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Landmark + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BLock + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BLock + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Phase + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Phase + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Subdivision + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Subdivision + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_AltBrgy + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_AltBrgy + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Zone + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Zone + ") input").val("");

            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_FloorNo + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgNo + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgName + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetNo + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetName + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_AreaCode + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BrgyCode + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_AltBrgy + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Establishment + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Landmark + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Lot + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BLock + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Phase + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Subdivision + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_UnitNo + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Zone + ")").removeClass("enablecolor");

            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_FloorNo + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgNo + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgName + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetNo + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetName + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_AreaCode + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BrgyCode + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_AltBrgy + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Establishment + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Landmark + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Lot + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BLock + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Phase + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Subdivision + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_UnitNo + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Zone + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_FullLocationAdd + ") input").val("");

        } else {
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_UnitNo + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_UnitNo + ")").addClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_UnitNo + ") input").prop("disabled", false);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_FloorNo + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_FloorNo + ")").addClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_FloorNo + ") input").prop("disabled", false);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgNo + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgNo + ")").addClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgNo + ") input").prop("disabled", false);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Establishment + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Establishment + ")").addClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Establishment + ") input").prop("disabled", false);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_AltBrgy + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_AltBrgy + ")").addClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_AltBrgy + ") input").prop("disabled", false);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Landmark + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Landmark + ")").addClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Landmark + ") input").prop("disabled", false);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgName + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgName + ")").addClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgName + ") input").prop("disabled", false);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetNo + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetNo + ")").addClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetNo + ") input").prop("disabled", false);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetName + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetName + ")").addClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetName + ") input").prop("disabled", false);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Lot + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Lot + ")").addClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Lot + ") input").prop("disabled", false);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BLock + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BLock + ")").addClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BLock + ") input").prop("disabled", false);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Phase + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Phase + ")").addClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Phase + ") input").prop("disabled", false);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Subdivision + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Subdivision + ")").addClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Subdivision + ") input").prop("disabled", false);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Zone + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Zone + ")").addClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Zone + ") input").prop("disabled", false);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_FullLocationAdd + ") input").val("");
        }
    }
}



$(document).on("change", ".nwCheckBoxTot6.chkfulladdress", function (e) {
    crnwTable = $("#nwGridCon .tblGridBody");
    if ($(".nwCheckBoxTot6.chkfulladdress").is(':checked')) {
        crnwTable.find('tr').find("td:eq(" + SPR_AreaCode + ")").enable(false);
        crnwTable.find('tr').find("td:eq(" + SPR_BrgyCode + ")").enable(false);
        crnwTable.find('tr').find("td:eq(" + SPR_MuniCode + ")").enable(false);
        crnwTable.find('tr').find('td:eq(' + SPR_FullLocationAdd + ')').removeClass('disabledcolor');
        crnwTable.find('tr').find('td:eq(' + SPR_FullLocationAdd + ')').addClass('enablecolor');
        crnwTable.find('tr').find('td:eq(' + SPR_AreaCode + ')').text('');
        crnwTable.find('tr').find('td:eq(' + SPR_AreaDesc + ')').text('');
        crnwTable.find('tr').find('td:eq(' + SPR_BrgyCode + ')').text('');
        crnwTable.find('tr').find('td:eq(' + SPR_BrgyDesc + ')').text('');
        crnwTable.find('tr').find('td:eq(' + SPR_MuniCode + ')').text('');
        crnwTable.find('tr').find('td:eq(' + SPR_MuniDesc + ')').text('');
        crnwTable.find('tr').find('td:eq(' + SPR_ProvinceCode + ')').text('');
        crnwTable.find('tr').find('td:eq(' + SPR_ProvinceDesc + ')').text('');
        crnwTable.find('tr').find('td:eq(' + SPR_RegionCode + ')').text('');
        crnwTable.find('tr').find('td:eq(' + SPR_RegionDesc + ')').text('');
        crnwTable.find('tr').find('td:eq(' + SPR_CountryCode + ')').text('');
        crnwTable.find('tr').find('td:eq(' + SPR_CountryDesc + ')').text('');
        crnwTable.find('tr').find('td:eq(' + SPR_IntGrpCode + ')').text('');
        crnwTable.find('tr').find('td:eq(' + SPR_IntGrpDesc + ')').text('');
        crnwTable.find('tr').find('td:eq(' + SPR_IntSubGrpCode + ')').text('');
        crnwTable.find('tr').find('td:eq(' + SPR_IntSubGrpDesc + ')').text('');
        crnwTable.find('tr').find('td:eq(' + SPR_ZipCode + ')').text('');
        fullocationchecktable();
    }
    else {
        crnwTable.find("tr").find("td:eq(" + SPR_FULLADDRESS + ") input").val("");
        crnwTable.find('tr').find("td:eq(" + SPR_AreaCode + ")").enable(true);
        crnwTable.find('tr').find("td:eq(" + SPR_BrgyCode + ")").enable(true);
        crnwTable.find('tr').find("td:eq(" + SPR_MuniCode + ")").enable(true);
        crnwTable.find('tr').find('td:eq(' + SPR_FULLADDRESS + ')').removeClass('enablecolor');
        crnwTable.find('tr').find('td:eq(' + SPR_FULLADDRESS + ')').addClass('disabledcolor');
        fulllocationunchecktable();
    }
});

$(document).on("change", ".chkfulladdress input", function (e) {
    if (this.checked) {
        crnwTR.find("td:eq(" + SPR_AreaCode + ")").enable(false);
        crnwTR.find("td:eq(" + SPR_BrgyCode + ")").enable(false);
        crnwTR.find("td:eq(" + SPR_MuniCode + ")").enable(false);
        crnwTR.find('td:eq(' + SPR_FullLocationAdd + ') input').prop('disabled', false);
        crnwTR.find("td:eq(" + SPR_FullLocationAdd + ")").removeClass('disabledcolor');
        crnwTR.find("td:eq(" + SPR_FullLocationAdd + ")").addClass('enablecolor');
        crnwTR.find('td:eq(' + SPR_AreaCode + ')').text('');
        crnwTR.find('td:eq(' + SPR_AreaDesc + ')').text('');
        crnwTR.find('td:eq(' + SPR_BrgyCode + ')').text('');
        crnwTR.find('td:eq(' + SPR_BrgyDesc + ')').text('');
        crnwTR.find('td:eq(' + SPR_MuniCode + ')').text('');
        crnwTR.find('td:eq(' + SPR_MuniDesc + ')').text('');
        crnwTR.find('td:eq(' + SPR_ProvinceCode + ')').text('');
        crnwTR.find('td:eq(' + SPR_ProvinceDesc + ')').text('');
        crnwTR.find('td:eq(' + SPR_RegionCode + ')').text('');
        crnwTR.find('td:eq(' + SPR_RegionDesc + ')').text('');
        crnwTR.find('td:eq(' + SPR_CountryCode + ')').text('');
        crnwTR.find('td:eq(' + SPR_CountryDesc + ')').text('');
        crnwTR.find('td:eq(' + SPR_IntGrpCode + ')').text('');
        crnwTR.find('td:eq(' + SPR_IntGrpDesc + ')').text('');
        crnwTR.find('td:eq(' + SPR_IntSubGrpCode + ')').text('');
        crnwTR.find('td:eq(' + SPR_IntSubGrpDesc + ')').text('');
        crnwTR.find('td:eq(' + SPR_ZipCode + ')').text('');
        fullocationuncheck();

    }
    else {
        crnwTR.find("td:eq(" + SPR_MuniCode + ")").enable(true);
        crnwTR.find("td:eq(" + SPR_AreaCode + ")").enable(true);
        crnwTR.find("td:eq(" + SPR_BrgyCode + ")").enable(true);
        crnwTR.find("td:eq(" + SPR_FullLocationAdd + ") input").val("");
        crnwTR.find('td:eq(' + SPR_FullLocationAdd + ') input').prop('disabled', true);
        crnwTR.find("td:eq(" + SPR_FullLocationAdd + ")").removeClass('enablecolor');
        crnwTR.find("td:eq(" + SPR_FullLocationAdd + ")").addClass('disabledcolor');
        fullocationcheck();
    }
});

function fullAdd() {
    $(document).on("change", ".chkfulladdress input", function (e) {
        if (this.checked) {
            crnwTR.find("td:eq(" + SPR_AreaCode + ")").enable(false);
            crnwTR.find("td:eq(" + SPR_BrgyCode + ")").enable(false);
            crnwTR.find("td:eq(" + SPR_MuniCode + ")").enable(false);
            crnwTR.find('td:eq(' + SPR_FullLocationAdd + ') input').prop('disabled', false);
            crnwTR.find("td:eq(" + SPR_FullLocationAdd + ")").removeClass('disabledcolor');
            crnwTR.find("td:eq(" + SPR_FullLocationAdd + ")").addClass('enablecolor');
            crnwTR.find('td:eq(' + SPR_AreaCode + ')').text('');
            crnwTR.find('td:eq(' + SPR_AreaDesc + ')').text('');
            crnwTR.find('td:eq(' + SPR_BrgyCode + ')').text('');
            crnwTR.find('td:eq(' + SPR_BrgyDesc + ')').text('');
            crnwTR.find('td:eq(' + SPR_MuniCode + ')').text('');
            crnwTR.find('td:eq(' + SPR_MuniDesc + ')').text('');
            crnwTR.find('td:eq(' + SPR_ProvinceCode + ')').text('');
            crnwTR.find('td:eq(' + SPR_ProvinceDesc + ')').text('');
            crnwTR.find('td:eq(' + SPR_RegionCode + ')').text('');
            crnwTR.find('td:eq(' + SPR_RegionDesc + ')').text('');
            crnwTR.find('td:eq(' + SPR_CountryCode + ')').text('');
            crnwTR.find('td:eq(' + SPR_CountryDesc + ')').text('');
            crnwTR.find('td:eq(' + SPR_IntGrpCode + ')').text('');
            crnwTR.find('td:eq(' + SPR_IntGrpDesc + ')').text('');
            crnwTR.find('td:eq(' + SPR_IntSubGrpCode + ')').text('');
            crnwTR.find('td:eq(' + SPR_IntSubGrpDesc + ')').text('');
            crnwTR.find('td:eq(' + SPR_ZipCode + ')').text('');
            fullocationuncheck();

        }
        else {
            crnwTR.find("td:eq(" + SPR_MuniCode + ")").enable(true);
            crnwTR.find("td:eq(" + SPR_AreaCode + ")").enable(true);
            crnwTR.find("td:eq(" + SPR_BrgyCode + ")").enable(true);
            crnwTR.find("td:eq(" + SPR_FullLocationAdd + ") input").val("");
            crnwTR.find('td:eq(' + SPR_FullLocationAdd + ') input').prop('disabled', true);
            crnwTR.find("td:eq(" + SPR_FullLocationAdd + ")").removeClass('enablecolor');
            crnwTR.find("td:eq(" + SPR_FullLocationAdd + ")").addClass('disabledcolor');
            fullocationcheck();
        }
    });
}

$(document).on('blur', '#idvallugsupplier', function (e) {
    suppliercodegenerator();

});

//function fullocationcheck() {
//    crnwTR.find('td:eq(' + SPR_UnitNo + ') input').prop('disabled', true);
//    crnwTR.find('td:eq(' + SPR_UnitNo + ') input').val("");
//    crnwTR.find('td:eq(' + SPR_FloorNo + ') input').prop('disabled', true);
//    crnwTR.find('td:eq(' + SPR_FloorNo + ') input').val("");
//    crnwTR.find('td:eq(' + SPR_BldgNo + ') input').prop('disabled', true);
//    crnwTR.find('td:eq(' + SPR_BldgNo + ') input').val("");
//    crnwTR.find('td:eq(' + SPR_BldgName + ') input').prop('disabled', true);
//    crnwTR.find('td:eq(' + SPR_BldgName + ') input').val("");
//    crnwTR.find('td:eq(' + SPR_StreetNo + ') input').prop('disabled', true);
//    crnwTR.find('td:eq(' + SPR_StreetNo + ') input').val("");
//    crnwTR.find('td:eq(' + SPR_Establishment + ') input').prop('disabled', true);
//    crnwTR.find('td:eq(' + SPR_Establishment + ') input').val("");
//    crnwTR.find('td:eq(' + SPR_StreetName + ') input').prop('disabled', true);
//    crnwTR.find('td:eq(' + SPR_StreetName + ') input').val("");
//    crnwTR.find('td:eq(' + SPR_Lot + ') input').prop('disabled', true);
//    crnwTR.find('td:eq(' + SPR_Lot + ') input').val("");
//    crnwTR.find('td:eq(' + SPR_Landmark + ') input').prop('disabled', true);
//    crnwTR.find('td:eq(' + SPR_Landmark + ') input').val("");
//    crnwTR.find('td:eq(' + SPR_BLock + ') input').prop('disabled', true);
//    crnwTR.find('td:eq(' + SPR_BLock + ') input').val("");
//    crnwTR.find('td:eq(' + SPR_Phase + ') input').prop('disabled', true);
//    crnwTR.find('td:eq(' + SPR_Phase + ') input').val("");
//    crnwTR.find('td:eq(' + SPR_Subdivision + ') input').prop('disabled', true);
//    crnwTR.find('td:eq(' + SPR_Subdivision + ') input').val("");
//    crnwTR.find('td:eq(' + SPR_AltBrgy + ') input').prop('disabled', true);
//    crnwTR.find('td:eq(' + SPR_AltBrgy + ') input').val("");
//    crnwTR.find('td:eq(' + SPR_Zone + ') input').prop('disabled', true);
//    crnwTR.find('td:eq(' + SPR_Zone + ') input').val("");
//    crnwTR.find('td:eq(' + SPR_FloorNo + ')').addClass('disabledcolor');
//    crnwTR.find('td:eq(' + SPR_BldgNo + ')').addClass('disabledcolor');
//    crnwTR.find('td:eq(' + SPR_BldgName + ')').addClass('disabledcolor');
//    crnwTR.find('td:eq(' + SPR_StreetNo + ')').addClass('disabledcolor');
//    crnwTR.find('td:eq(' + SPR_StreetName + ')').addClass('disabledcolor');
//    crnwTR.find('td:eq(' + SPR_AreaCode + ')').addClass('disabledcolor');
//    crnwTR.find('td:eq(' + SPR_BrgyCode + ')').addClass('disabledcolor');
//    crnwTR.find('td:eq(' + SPR_AltBrgy + ')').addClass('disabledcolor');
//    crnwTR.find('td:eq(' + SPR_Establishment + ')').addClass('disabledcolor');
//    crnwTR.find('td:eq(' + SPR_Landmark + ')').addClass('disabledcolor');
//    crnwTR.find('td:eq(' + SPR_Lot + ')').addClass('disabledcolor');
//    crnwTR.find('td:eq(' + SPR_BLock + ')').addClass('disabledcolor');
//    crnwTR.find('td:eq(' + SPR_Phase + ')').addClass('disabledcolor');
//    crnwTR.find('td:eq(' + SPR_Subdivision + ')').addClass('disabledcolor');
//    crnwTR.find('td:eq(' + SPR_UnitNo + ')').addClass('disabledcolor');
//    crnwTR.find('td:eq(' + SPR_Zone + ')').addClass('disabledcolor');
//    crnwTR.find('td:eq(' + SPR_FullLocationAdd + ') input').val("");
//    //checkgrid();
//}

function fullocationcheck() {
    crnwTR.find('td:eq(' + SPR_UnitNo + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_UnitNo + ') input').val("");
    crnwTR.find('td:eq(' + SPR_FloorNo + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_FloorNo + ') input').val("");
    crnwTR.find('td:eq(' + SPR_BldgNo + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_BldgNo + ') input').val("");
    crnwTR.find('td:eq(' + SPR_BldgName + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_BldgName + ') input').val("");
    crnwTR.find('td:eq(' + SPR_StreetNo + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_StreetNo + ') input').val("");
    crnwTR.find('td:eq(' + SPR_Establishment + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_Establishment + ') input').val("");
    crnwTR.find('td:eq(' + SPR_StreetName + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_StreetName + ') input').val("");
    crnwTR.find('td:eq(' + SPR_Lot + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_Lot + ') input').val("");
    crnwTR.find('td:eq(' + SPR_Landmark + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_Landmark + ') input').val("");
    crnwTR.find('td:eq(' + SPR_BLock + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_BLock + ') input').val("");
    crnwTR.find('td:eq(' + SPR_Phase + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_Phase + ') input').val("");
    crnwTR.find('td:eq(' + SPR_Subdivision + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_Subdivision + ') input').val("");
    crnwTR.find('td:eq(' + SPR_AltBrgy + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_AltBrgy + ') input').val("");
    crnwTR.find('td:eq(' + SPR_Zone + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_Zone + ') input').val("");

    crnwTR.find('td:eq(' + SPR_FloorNo + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_BldgNo + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_BldgName + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_StreetNo + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_StreetName + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_AreaCode + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_BrgyCode + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_AltBrgy + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_Establishment + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_Landmark + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_Lot + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_BLock + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_Phase + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_Subdivision + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_UnitNo + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_Zone + ')').removeClass('disabledcolor');

    crnwTR.find('td:eq(' + SPR_FloorNo + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_BldgNo + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_BldgName + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_StreetNo + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_StreetName + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_AreaCode + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_BrgyCode + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_AltBrgy + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_Establishment + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_Landmark + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_Lot + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_BLock + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_Phase + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_Subdivision + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_UnitNo + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_Zone + ')').addClass('enablecolor');

    crnwTR.find('td:eq(' + SPR_FullLocationAdd + ') input').val("");


    //checkgrid();
}

function fullocationuncheck() {
    crnwTR.find('td:eq(' + SPR_UnitNo + ') input').prop('disabled', true);
    crnwTR.find('td:eq(' + SPR_UnitNo + ') input').val("");
    crnwTR.find('td:eq(' + SPR_FloorNo + ') input').prop('disabled', true);
    crnwTR.find('td:eq(' + SPR_FloorNo + ') input').val("");
    crnwTR.find('td:eq(' + SPR_BldgNo + ') input').prop('disabled', true);
    crnwTR.find('td:eq(' + SPR_BldgNo + ') input').val("");
    crnwTR.find('td:eq(' + SPR_BldgName + ') input').prop('disabled', true);
    crnwTR.find('td:eq(' + SPR_BldgName + ') input').val("");
    crnwTR.find('td:eq(' + SPR_StreetNo + ') input').prop('disabled', true);
    crnwTR.find('td:eq(' + SPR_StreetNo + ') input').val("");
    crnwTR.find('td:eq(' + SPR_Establishment + ') input').prop('disabled', true);
    crnwTR.find('td:eq(' + SPR_Establishment + ') input').val("");
    crnwTR.find('td:eq(' + SPR_StreetName + ') input').prop('disabled', true);
    crnwTR.find('td:eq(' + SPR_StreetName + ') input').val("");
    crnwTR.find('td:eq(' + SPR_Lot + ') input').prop('disabled', true);
    crnwTR.find('td:eq(' + SPR_Lot + ') input').val("");
    crnwTR.find('td:eq(' + SPR_Landmark + ') input').prop('disabled', true);
    crnwTR.find('td:eq(' + SPR_Landmark + ') input').val("");
    crnwTR.find('td:eq(' + SPR_BLock + ') input').prop('disabled', true);
    crnwTR.find('td:eq(' + SPR_BLock + ') input').val("");
    crnwTR.find('td:eq(' + SPR_Phase + ') input').prop('disabled', true);
    crnwTR.find('td:eq(' + SPR_Phase + ') input').val("");
    crnwTR.find('td:eq(' + SPR_Subdivision + ') input').prop('disabled', true);
    crnwTR.find('td:eq(' + SPR_Subdivision + ') input').val("");
    crnwTR.find('td:eq(' + SPR_AltBrgy + ') input').prop('disabled', true);
    crnwTR.find('td:eq(' + SPR_AltBrgy + ') input').val("");
    crnwTR.find('td:eq(' + SPR_Zone + ') input').prop('disabled', true);
    crnwTR.find('td:eq(' + SPR_Zone + ') input').val("");

    crnwTR.find('td:eq(' + SPR_FloorNo + ')').removeClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_BldgNo + ')').removeClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_BldgName + ')').removeClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_StreetNo + ')').removeClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_StreetName + ')').removeClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_AreaCode + ')').removeClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_BrgyCode + ')').removeClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_AltBrgy + ')').removeClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_Establishment + ')').removeClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_Landmark + ')').removeClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_Lot + ')').removeClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_BLock + ')').removeClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_Phase + ')').removeClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_Subdivision + ')').removeClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_UnitNo + ')').removeClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_Zone + ')').removeClass('enablecolor');

    crnwTR.find('td:eq(' + SPR_FloorNo + ')').addClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_BldgNo + ')').addClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_BldgName + ')').addClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_StreetNo + ')').addClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_StreetName + ')').addClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_AreaCode + ')').addClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_BrgyCode + ')').addClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_AltBrgy + ')').addClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_Establishment + ')').addClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_Landmark + ')').addClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_Lot + ')').addClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_BLock + ')').addClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_Phase + ')').addClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_Subdivision + ')').addClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_UnitNo + ')').addClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_Zone + ')').addClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_FullLocationAdd + ') input').val("");
    //checkgrid();
}


function fulllocationuncheck() {
    crnwTR.find('td:eq(' + SPR_UnitNo + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_FloorNo + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_BldgNo + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_BldgName + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_StreetNo + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_Landmark + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_StreetName + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_Establishment + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_AltBrgy + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_Lot + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_BLock + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_Phase + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_Subdivision + ') input').prop('disabled', false);
    crnwTR.find('td:eq(' + SPR_Zone + ') input').prop('disabled', false);

    crnwTR.find('td:eq(' + SPR_FloorNo + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_BldgNo + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_BldgName + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_StreetNo + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_StreetName + ')').removeClass('disabledcolor')
    crnwTR.find('td:eq(' + SPR_Establishment + ')').removeClass('disabledcolor')
    crnwTR.find('td:eq(' + SPR_AreaCode + ')').removeClass('disabledcolor')
    crnwTR.find('td:eq(' + SPR_BrgyCode + ')').removeClass('disabledcolor')
    crnwTR.find('td:eq(' + SPR_AltBrgy + ')').removeClass('disabledcolor')
    crnwTR.find('td:eq(' + SPR_Lot + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_Landmark + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_BLock + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_Phase + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_Subdivision + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_UnitNo + ')').removeClass('disabledcolor');
    crnwTR.find('td:eq(' + SPR_Zone + ')').removeClass('disabledcolor');

    crnwTR.find('td:eq(' + SPR_FloorNo + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_BldgNo + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_BldgName + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_StreetNo + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_StreetName + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_AreaCode + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_BrgyCode + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_AltBrgy + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_Establishment + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_Landmark + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_Lot + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_BLock + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_Phase + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_Subdivision + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_UnitNo + ')').addClass('enablecolor');
    crnwTR.find('td:eq(' + SPR_Zone + ')').addClass('enablecolor');

    crnwTR.find('td:eq(' + SPR_FullLocationAdd + ') input').val("");
    //checkgrid();


}

function fullocationchecktable() {
    crnwTable = $("#nwGridCon .tblGridBody");
    //crnwTable.find('tr').find('td:eq('+SPR_UNITNO+')input').prop('disabled',true);
    //crnwTable.find('tr').find('td:eq(' + SPR_FLOORNO + ')input').prop('disabled', true);
    //crnwTable.find('tr').find('td:eq(' + SPR_BLDGNO + ')input').prop('disabled', true);
    //crnwTable.find('tr').find('td:eq(' + SPR_BLDGNAME + ')input').prop('disabled', true);
    //crnwTable.find('tr').find('td:eq(' + SPR_STNO + ')input').prop('disabled', true);
    //crnwTable.find('tr').find('td:eq(' + SPR_STREET + ')input').prop('disabled', true);
    //crnwTable.find('tr').find('td:eq(' + SPR_LOT + ')input').prop('disabled', true);
    //crnwTable.find('tr').find('td:eq(' + SPR_BLOCK + ')input').prop('disabled', true);
    //crnwTable.find('tr').find('td:eq(' + SPR_PHASE + ')input').prop('disabled', true);
    //crnwTable.find('tr').find('td:eq(' + SPR_SUBDIVISION + ')input').prop('disabled', true);
    //crnwTable.find('tr').find('td:eq(' + SPR_UNITNO + ')input').prop('disabled', true);
    $('.disableonfulladdress').enable(false);
    crnwTable.find('tr').find('td:eq(' + SPR_UnitNo + ') input').val("");
    crnwTable.find('tr').find('td:eq(' + SPR_FloorNo + ') input').val("");
    crnwTable.find('tr').find('td:eq(' + SPR_BldgNo + ') input').val('');
    crnwTable.find('tr').find('td:eq(' + SPR_BldgName + ') input').val('');
    crnwTable.find('tr').find('td:eq(' + SPR_StreetNo + ') input').val('');
    crnwTable.find('tr').find('td:eq(' + SPR_StreetName + ') input').val('');
    crnwTable.find('tr').find('td:eq(' + SPR_Establishment + ') input').val('');
    crnwTable.find('tr').find('td:eq(' + SPR_Landmark + ') input').val('');
    crnwTable.find('tr').find('td:eq(' + SPR_Lot + ') input').val('');
    crnwTable.find('tr').find('td:eq(' + SPR_BLock + ') input').val('');
    crnwTable.find('tr').find('td:eq(' + SPR_Phase + ') input').val('');
    crnwTable.find('tr').find('td:eq(' + SPR_Subdivision + ') input').val('');
    crnwTable.find('tr').find('td:eq(' + SPR_AreaCode + ')').text('');
    crnwTable.find('tr').find('td:eq(' + SPR_AreaDesc + ')').text('');
    crnwTable.find('tr').find('td:eq(' + SPR_BrgyCode + ')').text('');
    crnwTable.find('tr').find('td:eq(' + SPR_BrgyDesc + ')').text('');
    crnwTable.find('tr').find('td:eq(' + SPR_MuniCode + ')').text('');
    crnwTable.find('tr').find('td:eq(' + SPR_MuniDesc + ')').text('');
    crnwTable.find('tr').find('td:eq(' + SPR_ProvinceCode + ')').text('');
    crnwTable.find('tr').find('td:eq(' + SPR_ProvinceDesc + ')').text('');
    crnwTable.find('tr').find('td:eq(' + SPR_RegionCode + ')').text('');
    crnwTable.find('tr').find('td:eq(' + SPR_RegionDesc + ')').text('');
    crnwTable.find('tr').find('td:eq(' + SPR_CountryCode + ')').text('');
    crnwTable.find('tr').find('td:eq(' + SPR_CountryDesc + ')').text('');
    crnwTable.find('tr').find('td:eq(' + SPR_IntGrpCode + ')').text('');
    crnwTable.find('tr').find('td:eq(' + SPR_IntGrpDesc + ')').text('');
    crnwTable.find('tr').find('td:eq(' + SPR_IntSubGrpCode + ')').text('');
    crnwTable.find('tr').find('td:eq(' + SPR_IntSubGrpDesc + ')').text('');
    crnwTable.find('tr').find('td:eq(' + SPR_ZipCode + ')').text('');
    crnwTable.find('tr').find('td:eq(' + SPR_AltBrgy + ') input').val('');
    crnwTable.find('tr').find('td:eq(' + SPR_Zone + ') input').val('');
    crnwTable.find('tr').find('td:eq(' + SPR_UnitNo + ')').addClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_AltBrgy + ')').addClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_FloorNo + ')').addClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_BldgNo + ')').addClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_BldgName + ')').addClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_Landmark + ')').addClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_StreetNo + ')').addClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_StreetName + ')').addClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_Establishment + ')').addClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_Lot + ')').addClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_BLock + ')').addClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_Phase + ')').addClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_Subdivision + ')').addClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_Zone + ')').addClass('disabledcolor');
    //checkgrid();
}
function fulllocationunchecktable() {
    crnwTable = $("#nwGridCon .tblGridBody");
    //crnwTable.find('tr').find('td:eq(' + SPR_UNITNO + ')input').prop('disabled', false);
    //crnwTable.find('tr').find('td:eq(' + SPR_FLOORNO + ')input').prop('disabled', false);
    //crnwTable.find('tr').find('td:eq(' + SPR_BLDGNO + ')input').prop('disabled', false);
    //crnwTable.find('tr').find('td:eq(' + SPR_BLDGNAME + ')input').prop('disabled', false);
    //crnwTable.find('tr').find('td:eq(' + SPR_STNO + ')input').prop('disabled', false);
    //crnwTable.find('tr').find('td:eq(' + SPR_STREET + ')input').prop('disabled', false);
    //crnwTable.find('tr').find('td:eq(' + SPR_LOT + ')input').prop('disabled', false);
    //crnwTable.find('tr').find('td:eq(' + SPR_BLOCK + ')input').prop('disabled', false);
    //crnwTable.find('tr').find('td:eq(' + SPR_PHASE + ')input').prop('disabled', false);
    //crnwTable.find('tr').find('td:eq(' + SPR_SUBDIVISION + ')input').prop('disabled', false);
    //crnwTable.find('tr').find('td:eq(' + SPR_ZONE + ')input').prop('disabled', false);
    $('.disableonfulladdress').enable(true);
    crnwTable.find('tr').find('td:eq(' + SPR_UnitNo + ')').removeClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_FloorNo + ')').removeClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_BldgNo + ')').removeClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_Establishment + ')').removeClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_AltBrgy + ')').removeClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_Landmark + ')').removeClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_BldgName + ')').removeClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_StreetNo + ')').removeClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_StreetName + ')').removeClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_Lot + ')').removeClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_BLock + ')').removeClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_Phase + ')').removeClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_Subdivision + ')').removeClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_Zone + ')').removeClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_Zone + ')').addClass('disabledcolor');
    crnwTable.find('tr').find('td:eq(' + SPR_FullLocationAdd + ') input').val("");
    //checkgrid();
}
function toolboxrefresh() {
    $('#lugsupplier').addClass('adisabled');
    $('#nwGridCon').enable(true);
    //checkgrid();
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
}
function toolboxdelete() {
    $('#lugsupplier').addClass('adisabled');
    $('#nwGridCon').enable(true);
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
}

function autoRefresh() {
    if (suppliercode != '') {
        linkaction();
    }
    else {
        normalfunctionaction();
    }
}

function disableNew() {
    $("#noah-webui-Toolbox").bindingNew().visible(false);
}

function enableNew() {
    $("#noah-webui-Toolbox").bindingNew().visible(true);
}

function linkaction() {
    $("#noah-webui-Toolbox").bindingInquire().visible(false);
    $('#idvallugsupplier').val(suppliercode);
    $('#descvallugsupplier').val(tradename);
    nwParameter_Add('idvallugsupplier', $('#idvallugsupplier').val());
    func_ActionDriven("actTradename", false);

    //  $('#noah-webui-default-Refresh').click();
    // $('#nwGridCon').enable(false);

}



function normalfunctionaction() {
    $('#nwGridCon').enable(false);
    $("#noah-webui-Toolbox").bindingInquire().visible(true);
    $("#noah-webui-Toolbox").bindingNew().visible(false);
    $("#noah-webui-Toolbox").bindingSave().visible(false);
}

// Tin Additional - Start
$(document).on('keyup', '.txtUnitNo', function () {

    $(".txtUnitNo").attr('maxlength', '12');
    $(".txtUnitNo").css('text-transform', 'capitalize');
   
});

$(document).on('keyup', '.txtFloorNo', function () {

    $(".txtFloorNo").attr('maxlength', '12');
    $(".txtFloorNo").css('text-transform', 'capitalize');
    //cuz_OnkeyPressConcatForAddress();
});

$(document).on('keyup', '.txtBldgNo', function () {

    $(".txtBldgNo").attr('maxlength', '12');
    $(".txtBldgNo").css('text-transform', 'capitalize');
    //cuz_OnkeyPressConcatForAddress();
});

$(document).on('keyup', '.txtBldgName', function () {

    $(".txtBldgName").attr('maxlength', '80');
    $(".txtBldgName").css('text-transform', 'capitalize');
    //cuz_OnkeyPressConcatForAddress();
});

$(document).on('keyup', '.txtEstablishment', function () {

    $(".txtEstablishment").attr('maxlength', '80');
    $(".txtEstablishment").css('text-transform', 'capitalize');
    //cuz_OnkeyPressConcatForAddress();
});

$(document).on('keyup', '.txtLandmark', function () {

    $(".txtLandmark").attr('maxlength', '80');
    $(".txtLandmark").css('text-transform', 'capitalize');
    //cuz_OnkeyPressConcatForAddress();
});

$(document).on('keyup', '.txtStreetNo', function () {

    $(".txtStreetNo").attr('maxlength', '12');
    $(".txtStreetNo").css('text-transform', 'capitalize');
    //cuz_OnkeyPressConcatForAddress();
});

$(document).on('keyup', '.txtStreetName', function () {

    $(".txtStreetName").attr('maxlength', '80');
    $(".txtStreetName").css('text-transform', 'capitalize');
    //cuz_OnkeyPressConcatForAddress();
});

$(document).on('keyup', '.txtLot', function () {

    $(".txtLot").attr('maxlength', '25');
    $(".txtLot").css('text-transform', 'capitalize');
    //cuz_OnkeyPressConcatForAddress();
});

$(document).on('keyup', '.txtBlock', function () {

    $(".txtBlock").attr('maxlength', '25');
    $(".txtBlock").css('text-transform', 'capitalize');
    //cuz_OnkeyPressConcatForAddress();
});

$(document).on('keyup', '.txtPhase', function () {

    $(".txtPhase").attr('maxlength', '25');
    $(".txtPhase").css('text-transform', 'capitalize');
    //cuz_OnkeyPressConcatForAddress();
});

$(document).on('keyup', '.txtSubdivision', function () {

    $(".txtSubdivision").attr('maxlength', '80');
    $(".txtSubdivision").css('text-transform', 'capitalize');
    //cuz_OnkeyPressConcatForAddress();
});

$(document).on('keyup', '.txtZone', function () {

    $(".txtZone").attr('maxlength', '80');
    $(".txtZone").css('text-transform', 'capitalize');
    //cuz_OnkeyPressConcatForAddress();
});

$(document).on('keyup', '.txtAltBrgy', function () {

    $(".txtAltBrgy").attr('maxlength', '80');
    $(".txtAltBrgy").css('text-transform', 'capitalize');
    //cuz_OnkeyPressConcatForAddress();
});



function cuz_OnkeyPressConcatForAddress() {

    var row = nwGridCon_Book.ActiveSheet.GetSelectedIndexes().row;
    var unitno = nwGridCon_Book.ActiveSheet.GetValue(SPR_UnitNo - 1, row);
    var flrno = nwGridCon_Book.ActiveSheet.GetValue(SPR_FloorNo - 1, row);
    var bldgno = nwGridCon_Book.ActiveSheet.GetValue(SPR_BldgNo - 1, row);
    var bldg = nwGridCon_Book.ActiveSheet.GetValue(SPR_BldgName - 1, row);
    var landmark = nwGridCon_Book.ActiveSheet.GetValue(SPR_Landmark - 1, row);
    var StreetNo = nwGridCon_Book.ActiveSheet.GetValue(SPR_StreetNo - 1, row);
    var StreetName = nwGridCon_Book.ActiveSheet.GetValue(SPR_StreetName - 1, row);
    var Lot = nwGridCon_Book.ActiveSheet.GetValue(SPR_Lot - 1, row);
    var Block = nwGridCon_Book.ActiveSheet.GetValue(SPR_BLock - 1, row);
    var Subdivision = nwGridCon_Book.ActiveSheet.GetValue(SPR_Subdivision - 1, row);
    var StandardBarangay = nwGridCon_Book.ActiveSheet.GetValue(SPR_BrgyDesc - 1, row);
    var AlternativeBarangay = nwGridCon_Book.ActiveSheet.GetValue(SPR_AltBrgy - 1, row);
    var Municipality = nwGridCon_Book.ActiveSheet.GetValue(SPR_MuniDesc - 1, row);
    var Province = nwGridCon_Book.ActiveSheet.GetValue(SPR_ProvinceDesc - 1, row);
    var cbFullAddress = nwGridCon_Book.ActiveSheet.GetValue(SPR_FullLocationTag - 1, row);


    if (unitno.length > 0)
        unitno = unitno + ' ';
    if (flrno.length > 0)
        flrno = flrno + ' ';
    if (bldgno.length > 0)
        bldgno = bldgno + ' ';
    if (bldg.length > 0)
        bldg = bldg + ' ';
    if (landmark.length > 0)
        landmark = landmark + ' ';
    if (StreetNo.length > 0)
        StreetNo = StreetNo + ' ';
    if (StreetName.length > 0)
        StreetName = StreetName + ', ';
    if (Lot.length > 0)
        Lot = Lot + ' ';
    if (Block.length > 0)
        Block = Block + ' ';
    if (Subdivision.length > 0)
        Subdivision = Subdivision + ', ';
    if (StandardBarangay.length > 0)
        StandardBarangay = StandardBarangay + ', ';
    if (AlternativeBarangay.length > 0)
        AlternativeBarangay = AlternativeBarangay + ', ';
    if (Municipality.length > 0)
        Municipality = Municipality.replace(',', '') + ' ';


    if (cbFullAddress == true) {
        //$fn.xHeaderDetails.FullAddress.val('');
    }
    else {
        FullAddress = unitno + flrno + bldgno + bldg + landmark + StreetNo + StreetName + Lot + Block + Subdivision + StandardBarangay + AlternativeBarangay + Municipality + Province;
        //$('#nwGridCon .tblGridBody  tr:eq(' + crnwTR.index() + ')').find('td:eq(' + SPR_FullLocationAdd + ')').text(FullAddress);
        nwGridCon_Book.ActiveSheet.SetText(SPR_FullLocationAdd - 1, row, FullAddress);
    }

}

function p8Spread_Change(canvasID, row, col) {
    if (canvasID == "nwGridCon") {
        if (col == SPR_UnitNo - 1) {
            cuz_OnkeyPressConcatForAddress();
        }

        if (col == SPR_FloorNo - 1) {
            cuz_OnkeyPressConcatForAddress();
        }
        if (col == SPR_BldgNo - 1) {
            cuz_OnkeyPressConcatForAddress();
        }
        if (col == SPR_BldgName - 1) {
            cuz_OnkeyPressConcatForAddress();
        }
        if (col == SPR_Landmark - 1) {
            cuz_OnkeyPressConcatForAddress();
        }
        if (col == SPR_StreetNo - 1) {
            cuz_OnkeyPressConcatForAddress();
        }
        
        if (col == SPR_StreetName - 1) {
            cuz_OnkeyPressConcatForAddress();
        }
        if (col == SPR_Lot - 1) {
            cuz_OnkeyPressConcatForAddress();
        }
        if (col == SPR_BLock - 1) {
            cuz_OnkeyPressConcatForAddress();
        }
        if (col == SPR_Subdivision - 1) {
            cuz_OnkeyPressConcatForAddress();
        }
        if (col == SPR_BrgyDesc - 1) {
            cuz_OnkeyPressConcatForAddress();
        }

        if (col == SPR_AltBrgy - 1) {
            cuz_OnkeyPressConcatForAddress();
        }

        if (col == SPR_MuniDesc - 1) {
            cuz_OnkeyPressConcatForAddress();
        }

        if (col == SPR_ProvinceDesc - 1) {
            cuz_OnkeyPressConcatForAddress();
        }

    }
    return true;
}

$(document).on('paste', '.txtZip', function () {
    if (event.clipboardData.getData('text/plain').match(/^[0-9]\d*$/i)) {
        if (event.clipboardData.getData('text/plain').length > 17) {
        }
        else {
            $("#nwGridCon tblGridBody tr:eq(" + crnwTR.index() + ") td:eq(" + SPR_ZipCode + ") input").val(event.clipboardData.getData('text/plain'));
        }
    }
    return false;
});

$(document).on('drop', '.txtZip', function () {
    return false;
});

$(document).on('dragstart', '.txtZip', function () {
    return false;
});

// Disable Row 1
function disableRow() {
    var row = nwGridCon_Book.ActiveSheet.GetMaxRow();
    var supplierLocationCode = '';

    for (var x = 0; x <= row; x++) {
        supplierLocationCode = nwGridCon_Book.ActiveSheet.GetValue(SPR_LocationTypeCode - 1, x);
        if (supplierLocationCode != "") {
            nwGridCon_Book.ActiveSheet.SetEnable(SPR_LocationTypeCode - 1, x, false);
        }

        if (x == 0) {

            nwGridCon_Book.ActiveSheet.SetEnable(SPR_TagMail - 1, x, true);

            nwGridCon_Book.ActiveSheet.SetEnable(SPR_LocationTypeCode - 1, x, false);
            nwGridCon_Book.ActiveSheet.SetBackground(SPR_LocationTypeCode - 1, x, "gainsboro");

            nwGridCon_Book.ActiveSheet.SetEnable(SPR_FullLocationAdd - 1, x, false);
            nwGridCon_Book.ActiveSheet.SetBackground(SPR_FullLocationAdd - 1, x, "gainsboro");

            nwGridCon_Book.ActiveSheet.SetEnable(SPR_FullLocationTag - 1, x, false);
            nwGridCon_Book.ActiveSheet.SetBackground(SPR_FullLocationTag - 1, x, "gainsboro");

            nwGridCon_Book.ActiveSheet.SetEnable(SPR_UnitNo - 1, x, false);
            nwGridCon_Book.ActiveSheet.SetBackground(SPR_UnitNo - 1, x, "gainsboro");

            nwGridCon_Book.ActiveSheet.SetEnable(SPR_FloorNo - 1, x, false);
            nwGridCon_Book.ActiveSheet.SetBackground(SPR_FloorNo - 1, x, "gainsboro");

            nwGridCon_Book.ActiveSheet.SetEnable(SPR_BldgNo - 1, x, false);
            nwGridCon_Book.ActiveSheet.SetBackground(SPR_BldgNo - 1, x, "gainsboro");

            nwGridCon_Book.ActiveSheet.SetEnable(SPR_BldgName - 1, x, false);
            nwGridCon_Book.ActiveSheet.SetBackground(SPR_BldgName - 1, x, "gainsboro");

            nwGridCon_Book.ActiveSheet.SetEnable(SPR_Establishment - 1, x, false);
            nwGridCon_Book.ActiveSheet.SetBackground(SPR_Establishment - 1, x, "gainsboro");

            nwGridCon_Book.ActiveSheet.SetEnable(SPR_Landmark - 1, x, false);
            nwGridCon_Book.ActiveSheet.SetBackground(SPR_Landmark - 1, x, "gainsboro");

            nwGridCon_Book.ActiveSheet.SetEnable(SPR_StreetNo - 1, x, false);
            nwGridCon_Book.ActiveSheet.SetBackground(SPR_StreetNo - 1, x, "gainsboro");

            nwGridCon_Book.ActiveSheet.SetEnable(SPR_StreetName - 1, x, false);
            nwGridCon_Book.ActiveSheet.SetBackground(SPR_StreetName - 1, x, "gainsboro");

            nwGridCon_Book.ActiveSheet.SetEnable(SPR_Lot - 1, x, false);
            nwGridCon_Book.ActiveSheet.SetBackground(SPR_Lot - 1, x, "gainsboro");

            nwGridCon_Book.ActiveSheet.SetEnable(SPR_BLock - 1, x, false);
            nwGridCon_Book.ActiveSheet.SetBackground(SPR_BLock - 1, x, "gainsboro");

            nwGridCon_Book.ActiveSheet.SetEnable(SPR_Phase - 1, x, false);
            nwGridCon_Book.ActiveSheet.SetBackground(SPR_Phase - 1, x, "gainsboro");

            nwGridCon_Book.ActiveSheet.SetEnable(SPR_Subdivision - 1, x, false);
            nwGridCon_Book.ActiveSheet.SetBackground(SPR_Subdivision - 1, x, "gainsboro");

            nwGridCon_Book.ActiveSheet.SetEnable(SPR_Zone - 1, x, false);
            nwGridCon_Book.ActiveSheet.SetBackground(SPR_Zone - 1, x, "gainsboro");

            nwGridCon_Book.ActiveSheet.SetEnable(SPR_AreaCode - 1, x, false);
            nwGridCon_Book.ActiveSheet.SetBackground(SPR_AreaCode - 1, x, "gainsboro");

            nwGridCon_Book.ActiveSheet.SetEnable(SPR_BrgyCode - 1, x, false);
            nwGridCon_Book.ActiveSheet.SetBackground(SPR_BrgyCode - 1, x, "gainsboro");

            nwGridCon_Book.ActiveSheet.SetEnable(SPR_AltBrgy - 1, x, false);
            nwGridCon_Book.ActiveSheet.SetBackground(SPR_AltBrgy - 1, x, "gainsboro");

            nwGridCon_Book.ActiveSheet.SetEnable(SPR_MuniCode - 1, x, false);
            nwGridCon_Book.ActiveSheet.SetBackground(SPR_MuniCode - 1, x, "gainsboro");
        }
        else {

            nwGridCon_Book.ActiveSheet.SetEnable(SPR_TagMail - 1, x, true);
            nwGridCon_Book.ActiveSheet.SetEnable(SPR_FullLocationAdd - 1, x, false);


        }

    }

}

// Disable all row
function disableMainGrid() {
    var rows = nwGridCon_Book.ActiveSheet.GetMaxRow();

    for (var x = 0; x <= rows; x++) {
        nwGridCon_Book.ActiveSheet.SetEnable(SPR_TagMail - 1, x, false);
        nwGridCon_Book.ActiveSheet.SetBackground(SPR_TagMail - 1, x, "gainsboro");

        nwGridCon_Book.ActiveSheet.SetEnable(SPR_LocationTypeCode - 1, x, false);
        nwGridCon_Book.ActiveSheet.SetBackground(SPR_LocationTypeCode - 1, x, "gainsboro");

        nwGridCon_Book.ActiveSheet.SetEnable(SPR_FullLocationAdd - 1, x, false);
        nwGridCon_Book.ActiveSheet.SetBackground(SPR_FullLocationAdd - 1, x, "gainsboro");

        nwGridCon_Book.ActiveSheet.SetEnable(SPR_FullLocationTag - 1, x, false);
        nwGridCon_Book.ActiveSheet.SetBackground(SPR_FullLocationTag - 1, x, "gainsboro");

        nwGridCon_Book.ActiveSheet.SetEnable(SPR_UnitNo - 1, x, false);
        nwGridCon_Book.ActiveSheet.SetBackground(SPR_UnitNo - 1, x, "gainsboro");

        nwGridCon_Book.ActiveSheet.SetEnable(SPR_FloorNo - 1, x, false);
        nwGridCon_Book.ActiveSheet.SetBackground(SPR_FloorNo - 1, x, "gainsboro");

        nwGridCon_Book.ActiveSheet.SetEnable(SPR_BldgNo - 1, x, false);
        nwGridCon_Book.ActiveSheet.SetBackground(SPR_BldgNo - 1, x, "gainsboro");

        nwGridCon_Book.ActiveSheet.SetEnable(SPR_BldgName - 1, x, false);
        nwGridCon_Book.ActiveSheet.SetBackground(SPR_BldgName - 1, x, "gainsboro");

        nwGridCon_Book.ActiveSheet.SetEnable(SPR_Establishment - 1, x, false);
        nwGridCon_Book.ActiveSheet.SetBackground(SPR_Establishment - 1, x, "gainsboro");

        nwGridCon_Book.ActiveSheet.SetEnable(SPR_Landmark - 1, x, false);
        nwGridCon_Book.ActiveSheet.SetBackground(SPR_Landmark - 1, x, "gainsboro");

        nwGridCon_Book.ActiveSheet.SetEnable(SPR_StreetNo - 1, x, false);
        nwGridCon_Book.ActiveSheet.SetBackground(SPR_StreetNo - 1, x, "gainsboro");

        nwGridCon_Book.ActiveSheet.SetEnable(SPR_StreetName - 1, x, false);
        nwGridCon_Book.ActiveSheet.SetBackground(SPR_StreetName - 1, x, "gainsboro");

        nwGridCon_Book.ActiveSheet.SetEnable(SPR_Lot - 1, x, false);
        nwGridCon_Book.ActiveSheet.SetBackground(SPR_Lot - 1, x, "gainsboro");

        nwGridCon_Book.ActiveSheet.SetEnable(SPR_BLock - 1, x, false);
        nwGridCon_Book.ActiveSheet.SetBackground(SPR_BLock - 1, x, "gainsboro");

        nwGridCon_Book.ActiveSheet.SetEnable(SPR_Phase - 1, x, false);
        nwGridCon_Book.ActiveSheet.SetBackground(SPR_Phase - 1, x, "gainsboro");

        nwGridCon_Book.ActiveSheet.SetEnable(SPR_Subdivision - 1, x, false);
        nwGridCon_Book.ActiveSheet.SetBackground(SPR_Subdivision - 1, x, "gainsboro");

        nwGridCon_Book.ActiveSheet.SetEnable(SPR_Zone - 1, x, false);
        nwGridCon_Book.ActiveSheet.SetBackground(SPR_Zone - 1, x, "gainsboro");

        nwGridCon_Book.ActiveSheet.SetEnable(SPR_AreaCode - 1, x, false);
        nwGridCon_Book.ActiveSheet.SetBackground(SPR_AreaCode - 1, x, "gainsboro");

        nwGridCon_Book.ActiveSheet.SetEnable(SPR_BrgyCode - 1, x, false);
        nwGridCon_Book.ActiveSheet.SetBackground(SPR_BrgyCode - 1, x, "gainsboro");

        nwGridCon_Book.ActiveSheet.SetEnable(SPR_AltBrgy - 1, x, false);
        nwGridCon_Book.ActiveSheet.SetBackground(SPR_AltBrgy - 1, x, "gainsboro");

        nwGridCon_Book.ActiveSheet.SetEnable(SPR_MuniCode - 1, x, false);
        nwGridCon_Book.ActiveSheet.SetBackground(SPR_MuniCode - 1, x, "gainsboro");
    }
}

function enabledzipcode() {
    var alternate = nwLib.nwTempTable_RowData_Get("nwGridCon ", crnwTR.index(), SPR_AltBrgy - 1, "input");
    var brgy = nwLib.nwTempTable_RowData_Get("nwGridCon ", crnwTR.index(), SPR_BrgyCode - 1);


    if (alternate != "" && brgy != "") {
        $("#nwGridCon .tblGridBody tr:eq(" + crnwTR.index() + ") td:eq(" + SPR_ZipCode + ") input").enable(false);
        $("#nwGridCon .tblGridBody tr:eq(" + crnwTR.index() + ")").find("td:eq(" + SPR_ZipCode + ")").css("background", "gainsboro");
    } else if (alternate != "" && brgy == "") {
        $("#nwGridCon .tblGridBody tr:eq(" + crnwTR.index() + ") td:eq(" + SPR_ZipCode + ") input").enable(true);
        $("#nwGridCon .tblGridBody tr:eq(" + crnwTR.index() + ")").find("td:eq(" + SPR_ZipCode + ")").css("background", "white");
    } else if (alternate == "" && brgy != "") {
        $("#nwGridCon .tblGridBody tr:eq(" + crnwTR.index() + ") td:eq(" + SPR_ZipCode + ") input").enable(false);
        $("#nwGridCon .tblGridBody tr:eq(" + crnwTR.index() + ")").find("td:eq(" + SPR_ZipCode + ")").css("background", "gainsboro");
    } else if (alternate == "" && brgy == "") {
        $("#nwGridCon .tblGridBody tr:eq(" + crnwTR.index() + ") td:eq(" + SPR_ZipCode + ") input").enable(false);
        $("#nwGridCon .tblGridBody tr:eq(" + crnwTR.index() + ")").find("td:eq(" + SPR_ZipCode + ")").css("background", "gainsboro");
    }
}

$(document).on('blur', '.txtAltBrgy', function () {
    var altbrgy = $("#nwGridCon .tblGridBody tr:eq(" + crnwTR.index() + ") td:eq(" + SPR_AltBrgy + ") input").val();
    if (altbrgy != "") {
        $("#nwGridCon .tblGridBody tr:eq(" + crnwTR.index() + ") td:eq(" + SPR_BrgyCode + ")").text("");
        $("#nwGridCon .tblGridBody tr:eq(" + crnwTR.index() + ") td:eq(" + SPR_BrgyDesc + ")").text("");
    }

    enabledzipcode();
});

// Disable ZipCode
function disableZipCode() {
    var rows = nwTempTable_Row_Count("nwGridCon");

    var alternate = "";
    var brgy = "";


    for (var x = 1; x <= rows; x++) {
        alternate = nwLib.nwTempTable_RowData_Get("nwGridCon ", x, SPR_AltBrgy - 1, "input");
        brgy = nwLib.nwTempTable_RowData_Get("nwGridCon ", x, SPR_BrgyCode - 1);
        var statCode = $('#nwGridCon .tblGridBody').find("tr:eq(" + x + ")").find("td:eq(" + SPR_StatusCode + ")").text();

        if (nwSupplierCode != "" && nwIsReport != 1) {
            if (statCode == "01") {
                if (alternate != "" && brgy != "") {
                    $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_ZipCode + ") input").enable(false);
                    $("#nwGridCon .tblGridBody tr:eq(" + x + ")").find("td:eq(" + SPR_ZipCode + ")").css("background", "gainsboro");
                } else if (alternate == "" && brgy == "") {
                    $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_ZipCode + ") input").val("");
                    $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_ZipCode + ") input").enable(false);
                    $("#nwGridCon .tblGridBody tr:eq(" + x + ")").find("td:eq(" + SPR_ZipCode + ")").css("background", "gainsboro");
                } else if (alternate != "" && brgy == "") {
                    $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_ZipCode + ") input").enable(true);
                    $("#nwGridCon .tblGridBody tr:eq(" + x + ")").find("td:eq(" + SPR_ZipCode + ")").css("background", "white");
                } else if (alternate == "" && brgy != "") {
                    $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_ZipCode + ") input").enable(false);
                    $("#nwGridCon .tblGridBody tr:eq(" + x + ")").find("td:eq(" + SPR_ZipCode + ")").css("background", "gainsboro");
                }
            } else {
                $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_ZipCode + ") input").enable(false);
                $("#nwGridCon .tblGridBody tr:eq(" + x + ")").find("td:eq(" + SPR_ZipCode + ")").css("background", "gainsboro")
            }
        } else {
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_ZipCode + ") input").enable(false);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ")").find("td:eq(" + SPR_ZipCode + ")").css("background", "gainsboro")
        }
    }
}

$(document).on("click", ".nwRemoveBtn", function () {

    var locType = $('#nwGridCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_LocationTypeCode + ')').text();
    var Rows = nwTempTable_Row_Count("nwGridCon");
    var currRow = crnwTR.index() + 1;

    if (nwSupplierCode != "") {
        if (Rows != currRow && nwIsReport != 1 && crnwTR.index() > 0 && $('#nwGrid1 tbody').find('tr:eq(' + crnwTR.index() + ' )').find('td:eq(' + SPR_StatusCode + ')').text() != '01') {
            msgBoxContainerQuestion = "nwRemoveBtn";
            parent_MessageBoxQuestion("Do you wish to remove current row?", menuTitle, "");
        }
    }
});

// MessageBox Question
function msgBoxContainerQuestionF(genID, answer) {

    if (genID == "nwRemoveBtn") {
        if (answer == "Yes") {
            //crnwTR.find("td:eq(" + (SPR_Path) + ") ").text("");
            //crnwTR.find("td:eq(" + SPR_Attach + ")").removeClass("btnWithValue");
            //crnwTR.find("td:eq(" + SPR_Attach + ")").addClass("nwGButton");
            //$("#txtLocCode").val($("#txtLocCode").val() + "," + crnwTR.find("td:eq(" + SPR_Location + ") ").text());
            var len = $('#nwGridCon tbody tr').length;
            if (len < 2) {

            }
            else {
                //nwParameter_Add("txtCustomerCode", $("#txtCustomerCode").val());
                cust_GetPara();
                nwParameter_Add("locationCode", $('#nwGridCon tbody').find('tr:eq(' + crnwTR.index() + ')').find('td:eq(' + SPR_LocationCode + ')').text());
                nwParameter_Add("StatusCode", $('#nwGridCon tbody').find('tr:eq(' + crnwTR.index() + ')').find('td:eq(' + SPR_StatusCode + ')').text());
                func_ActionDriven("actDeleteLIN", false);
                //$(".nwgrid_Delete").click();
            }

        }
    }

    else if (genID == "closing") {
        if (answer == "Yes") {
            isClose = true;
            parent.mainParent_Close_Form();
        }
    }
}

// Tin Additonal - End


$(document).on('click', '.BoxClose', function (e) {
    $('.lookupcolSearch').val("");
});


$(document).keyup(function (e) {
    if (e.key === "Escape") {
        $('.lookupcolSearch').val("");
    }
});


function func_nwGrid_DeleteValidation() {
    var isContinue = true;

    var dateCreated = $(`#nwGrid1-nwData tr:eq(${crnwTR.index()}) td:eq(${SPR_DateCreated})`).text();
    crnwTable = $("#nwGridCon .tblGridBody");
    var gridlength = crnwTable.find("tr").length;

    if (dateCreated != "") {
        //  MessageBox("Cannot Delete. Data are loaded based on the setup.", baseTitle, 'error');
        isContinue = false;
    }
    else if (parseInt(gridlength) == parseInt(crnwTR.index() + 1)) {
        isContinue = false;
    }

    return isContinue;
}



function DisableUponView() {
    var isDisabled = isView.toLowerCase() == "true" ? true : false;

    if (isDisabled && nwIsReport == 1) {

        $('#nwGridCon').enable(false);
        //Disable other buttons
        //$('.nwgrid_buttons').enable(false);
        $('#noah-webui-default-Save').enable(false);
    }

}

$(document).on('click', '#nwGrid1 tr', function (e) {
    var dateCreated = $(`#nwGrid1-nwData tr:eq(${crnwTR.index()}) td:eq(${SPR_DateCreated})`).text();
    crnwTable = $("#nwGridCon .tblGridBody");
    var gridlength = crnwTable.find("tr").length;

    if (dateCreated != "") {
        $('.nwgrid_Insert').enable(false);
        $('.nwgrid_Delete').enable(false);
    }
    else if (dateCreated == "" && (parseInt(gridlength) != parseInt(crnwTR.index()))) {
        $('.nwgrid_Insert').enable(true);
        $('.nwgrid_Delete').enable(true);
    }
});

$(document).on('click', '.chkTagMail', function (e) {
    var tagMail = $(`#nwGrid1-nwData tr:eq(${crnwTR.index()}) td:eq(${SPR_TagMail})`).prop("checked");
    crnwTable = $("#nwGridCon .tblGridBody");
    var rows = nwTempTable_Row_Count("nwGridCon");
    var current = crnwTR.index();

    for (var x = 0; x <= rows; x++) {
        if (current != x)
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_TagMail + ") input").prop("checked", false);
    }
});


function p8Spread_Click(canvasID, row, col) {
    if (canvasID == "nwGridCon") {
        if (col == SPR_FullLocationTag - 1) {
            var rows = nwGridCon_Book.ActiveSheet.GetMaxRow();
            var ischecked = nwGridCon_Book.ActiveSheet.GetValue(SPR_FullLocationTag - 1, row);

            if (row == 0)
                return false;

                if (ischecked == 1) {
                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_UnitNo - 1, row, false);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_UnitNo - 1, row, "gainsboro");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_UnitNo - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_FloorNo - 1, row, false);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_FloorNo - 1, row, "gainsboro");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_FloorNo - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_BldgNo - 1, row, false);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_BldgNo - 1, row, "gainsboro");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_BldgNo - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_BldgName - 1, row, false);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_BldgName - 1, row, "gainsboro");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_BldgName - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_StreetNo - 1, row, false);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_StreetNo - 1, row, "gainsboro");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_StreetNo - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_Establishment - 1, row, false);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_Establishment - 1, row, "gainsboro");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_Establishment - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_StreetName - 1, row, false);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_StreetName - 1, row, "gainsboro");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_StreetName - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_Lot - 1, row, false);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_Lot - 1, row, "gainsboro");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_Lot - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_Landmark - 1, row, false);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_Landmark - 1, row, "gainsboro");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_Landmark - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_BLock - 1, row, false);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_BLock - 1, row, "gainsboro");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_BLock - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_Phase - 1, row, false);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_Phase - 1, row, "gainsboro");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_Phase - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_Subdivision - 1, row, false);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_Subdivision - 1, row, "gainsboro");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_Subdivision - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_AltBrgy - 1, row, false);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_AltBrgy - 1, row, "gainsboro");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_AltBrgy - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_Zone - 1, row, false);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_Zone - 1, row, "gainsboro");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_Zone - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_FullLocationAdd - 1, row, true);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_FullLocationAdd - 1, row, "white");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_FullLocationAdd - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_AreaCode - 1, row, "gainsboro");
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_BrgyCode - 1, row, "gainsboro");
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_MuniCode - 1, row, "gainsboro");
                }
            else  {
                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_UnitNo - 1, row, true);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_UnitNo - 1, row, "white");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_UnitNo - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_FloorNo - 1, row, true);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_FloorNo - 1, row, "white");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_FloorNo - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_BldgNo - 1, row, true);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_BldgNo - 1, row, "white");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_BldgNo - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_BldgName - 1, row, true);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_BldgName - 1, row, "white");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_BldgName - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_StreetNo - 1, row, true);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_StreetNo - 1, row, "white");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_StreetNo - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_Establishment - 1, row, true);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_Establishment - 1, row, "white");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_Establishment - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_StreetName - 1, row, true);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_StreetName - 1, row, "white");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_StreetName - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_Lot - 1, row, true);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_Lot - 1, row, "white");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_Lot - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_Landmark - 1, row, true);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_Landmark - 1, row, "white");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_Landmark - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_BLock - 1, row, true);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_BLock - 1, row, "white");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_BLock - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_Phase - 1, row, true);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_Phase - 1, row, "white");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_Phase - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_Subdivision - 1, row, true);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_Subdivision - 1, row, "white");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_Subdivision - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_AltBrgy - 1, row, true);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_AltBrgy - 1, row, "white");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_AltBrgy - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_Zone - 1, row, true);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_Zone - 1, row, "white");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_Zone - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetEnable(SPR_FullLocationAdd - 1, row, false);
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_FullLocationAdd - 1, row, "gainsboro");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_FullLocationAdd - 1, row, "");

                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_AreaCode - 1, row, "cyan");
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_BrgyCode - 1, row, "cyan");
                    nwGridCon_Book.ActiveSheet.SetBackground(SPR_MuniCode - 1, row, "cyan");
                }
        }
    }
    return true;
}

$(document).on('click', '.chkfulladdress', function (e) {
    var tagMail = $(`#nwGrid1-nwData tr:eq(${crnwTR.index()}) td:eq(${SPR_TagMail})`).prop("checked");

    crnwTable = $("#nwGridCon .tblGridBody");
    var rows = nwTempTable_Row_Count("nwGridCon");
    var current = crnwTR.index();

    for (var x = 0; x <= rows; x++) {
        if ($(".nwCheckBoxTot6.chkfulladdress").is(':checked')) {
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_UnitNo + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_UnitNo + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_FloorNo + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_FloorNo + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgNo + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgNo + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgName + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgName + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetNo + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetNo + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Establishment + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Establishment + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetName + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetName + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Lot + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Lot + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Landmark + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Landmark + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BLock + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BLock + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Phase + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Phase + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Subdivision + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Subdivision + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_AltBrgy + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_AltBrgy + ") input").val("");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Zone + ") input").prop("disabled", true);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Zone + ") input").val("");

            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_FloorNo + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgNo + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgName + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetNo + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetName + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_AreaCode + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BrgyCode + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_AltBrgy + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Establishment + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Landmark + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Lot + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BLock + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Phase + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Subdivision + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_UnitNo + ")").removeClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Zone + ")").removeClass("enablecolor");

            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_FloorNo + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgNo + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgName + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetNo + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetName + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_AreaCode + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BrgyCode + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_AltBrgy + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Establishment + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Landmark + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Lot + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BLock + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Phase + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Subdivision + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_UnitNo + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Zone + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_FullLocationAdd + ") input").val("");

        } else {
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_UnitNo + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_UnitNo + ")").addClass("enablecolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_UnitNo + ") input").prop("disabled", false);

            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_FloorNo + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgNo + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Establishment + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_AltBrgy + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Landmark + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BldgName + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetNo + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_StreetName + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Lot + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_BLock + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Phase + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Subdivision + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Zone + ")").removeClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_Zone + ")").addClass("disabledcolor");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + SPR_FullLocationAdd + ") input").val("");
        }
    }
});