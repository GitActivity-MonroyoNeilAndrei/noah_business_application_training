var SPR_DateCreated = 1,
    SPR_LocationCode = 2,
    SPR_LocationTypeCode = 3,
    SPR_LocationType = 4,
    SPR_LocationName = 5,
    SPR_ContactID = 6,
    SPR_LastName = 7,
    SPR_Suffix = 8,
    SPR_FirstName = 9,
    SPR_MiddleName = 10,
    SPR_Department = 11,
    SPR_Designation = 12,
    SPR_MultipleContact = 13,
    SPR_PhoneNo = 14,
    SPR_PhoneNum = 15,
    SPR_Local = 16,
    SPR_MobileNo = 17,
    SPR_MobileNum = 18,
    SPR_Email = 19,
    SPR_EmailNum = 20,
    SPR_FaxNo = 21,
    SPR_FaxNum = 22,
    SPR_StatusCode = 23,
    SPR_StatusDesc = 24,
    SPR_ChkPhoneMobile = 25,
    SPR_Remove = 26,

    // Phone
    SPR_Phone = 1,
    SPR_LocalNo = 2,
    SPR_Remove_P = 3,

    // Mobile 
    SPR_Mobile = 1,
    SPR_Remove_M = 2,

    // Email
    SPR_EmailAdd = 1,
    SPR_Remove_E = 2,

    // Fax
    SPR_Fax = 1,
    SPR_Remove_F = 2;

var basedTitle = "Vendor Contacts";

var nwGridMainCon_Book;
var nwGridMainCon_Sheet;

var nwGridPhoneCon_Book;
var nwGridPhoneCon_Sheet;

var nwGridMobileCon_Book;
var nwGridMobileCon_Sheet;

var nwGridEmailCon_Book;
var nwGridEmailCon_Sheet;

var nwGridFaxCon_Book;
var nwGridFaxCon_Sheet;

var _row = 0;
var _col = 0;
var _canvasID;

var _GridLU;

var nwSupplierCode = "";
var tradename = "";
var contactdID = "";
var isView = "";
var nwParam = 0;
var nwIsReport = 0;
var isIndividual = 0;

function func_Reload() {

    crLnk = GetCurrentURL() + "APSupplierContacts_Gateway";
    crLnkGateKey = "APSupplierContacts";
    crnwTagSingleBind = true;

    nwFromVendor = getParameterByName('nwParam');
    nwSupplierCode = getParameterByName('nwSupplierCode');
    nwIsReport = getParameterByName('nwIsReport');
    tradename = getParameterByName('tradename');
    isView = getParameterByName('isView');
    $("#nwGridMainCon").enable(false);

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    DisableFields();
    nwParameter_Add("nwFromVendor", nwFromVendor);
    //isLoad();
    nwParameter_Add('nwSupplierCode', nwSupplierCode);
    nwParameter_Add('nwIsReport', nwIsReport);

    if (nwSupplierCode.length > 0) {
        $("#idvallugsupplier").val(nwSupplierCode);
    }

    nwPopupForm_Create("nwPhone", false);
    nwPopupForm_Create("nwMobile", false);
    nwPopupForm_Create("nwEmail", false);
    nwPopupForm_Create("nwFax", false);

    //if (nwSupplierCode.length > 0)
    //{
    //    func_ActionDriven("actGetVendorCodeDesc", false);
    //}


    return isContinue;
}


function IsnwType() {
    if (nwSupplierCode != "" && nwIsReport == 0) {
        nwLoading_Start('xBind', crLoadingHTML);
        nwParameter_Add('nwSupplierCode', nwSupplierCode);
        $('#noah-webui-default-Refresh').click();
        $("#noah-webui-Toolbox-BindingNavigator").hide();
        $("#noah-webui-default-New").hide();
        $("#noah-webui-default-Delete").hide();
        //$("#noah-webui-default-Inquire").hide();
        $("#noah-webui-default-Export").enable(true);
        $(".history_switch").prop("disabled", false);
        $('#chkBox').prop('checked', true);
    }
    else if (nwSupplierCode != "" && nwIsReport == 1) {
        nwLoading_Start('xBind', crLoadingHTML);
        nwParameter_Add('nwSupplierCode', nwSupplierCode);
        $('#noah-webui-default-Refresh').click();
        $("#noah-webui-Toolbox-BindingNavigator").hide();
        $("#noah-webui-default-New").hide();
        $("#noah-webui-default-Delete").hide();
        //$("#noah-webui-default-Inquire").hide();
        $("#noah-webui-default-Save").enable(false);
        $("#noah-webui-default-Refresh").enable(false);
        $("#noah-webui-default-Export").enable(false);
        $(".history_switch").prop("disabled", true);
        $('#chkBox').prop('checked', true);
    }
    else {
        $("#noah-webui-default-New").hide();
        $("#noah-webui-default-Save").hide();
        $("#noah-webui-default-Delete").hide();
        $("#noah-webui-Toolbox-BindingNavigator").show();
        $(".history_switch").prop("disabled", true);
        $('#chkBox').prop('checked', true);
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
        $('#nwGridMainCon').enable(true);
    }
    else {
        $('#nwGridMainCon').enable(false);
    }
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;

    EnableFields();
    ClearFields();
    func_Toolbox_Clear();
    nwParameter_Add("supplierCode", $('#idvallugsupplier').val());
    //RefreshData();
    isnew = "true";
    
    
    nwParameter_Add("isnewrow", isnew);
    $('#nwGridMainCon').enable(true);
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    nwParameter_Add("suppliercode", $('#idvallugsupplier').val());
    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", basedTitle, "", indef, enume);
    isContinue = false;

    return isContinue;
}



function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    nwParameter_Add("suppliercode", $('#idvallugsupplier').val());
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record??", basedTitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    isnew = "false";

    nwParameter_Add("isnewrow", isnew);
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


    if ($('#idvallugsupplier').val() != "") {
        nwSupplierCode = $('#idvallugsupplier').val();
    }

    nwParameter_Add('nwIsReport', nwIsReport);
    nwParameter_Add('nwSupplierCode', nwSupplierCode);
    nwParameter_Add("idvallugsupplier", $('#idvallugsupplier').val());
    nwParameter_Add("idvallugsuplocation", $('#idvallugsuplocation').val());
    nwParameter_Add("txtsuppliertype", $('#txtsuppliertype').val());
    nwParameter_Add("txtcreationdate", $('#txtcreationdate').val());
    nwParameter_Add("txteffectivedate", $('#txteffectivedate').val());
    nwParameter_Add("txtservertime", $('#txtservertime').val());
    nwParameter_Add("txtconid", $('#txtconid').val());
    nwParameter_Add("nwFromVendor", nwFromVendor);

    try { nwParameter_Add_DataSet("nwGridMainCon"); } catch (e) { }
    try { nwParameter_Add_DataSet("nwGridPhoneCon"); } catch (e) { }
    try { nwParameter_Add_DataSet("nwGridMobileCon"); } catch (e) { }
    try { nwParameter_Add_DataSet("nwGridEmailCon"); } catch (e) { }
    try { nwParameter_Add_DataSet("nwGridFaxCon"); } catch (e) { }
}


//function enablegrid(){
//    $("#nwGridMainCon").enable(true);
//}
function disabledgrid() {
    $("#nwGridMainCon").enable(false);
}


function func_ToolboxNavigatorBind(enume) {
    cust_GetPara();
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {

    cust_GetPara();
    nwParameter_Add("suppliercode", $('#idvallugsupplier').val());
    nwParameter_Add("Tradename", $('#descvallugsupplier').val());
    nwLoading_Start("xBind", crLoadingHTML);
    nwParameter_Add("txtCode", $("#txtCode").val());
    func_ActionDriven("actBindCollection", false);
    //checker();

    if ($('#idvallugsupplier').val().length == 0) {
        $('#idvallugsupplier').val(nwSupplierCode);
    }
    if (tradename.length > 0) {
        $('#descvallugsupplier').val(tradename);
    }
    //else {
    //    $('#nwGridMainCon').enable(true);
    //}

    //toolboxrefresh();
}

function disabledall() {
    $("#lugsuppler").addClass('adisabled');
    $("#lugsuplocation").addClass('adisabled');
    $("#txtsuppliertype").prop("disabled", true);
    $("#txtcreationdate").prop("disabled", true);
    $("#txteffectivedate").prop("disabled", true);
    $("#nwGridMainCon").enable(false);
    //$("#noah-webui-Toolbox").bindingDelete().enable(false);
    //$("#noah-webui-Toolbox").bindingSave().enable(false);
}
function enableall() {
    $("#lugsuppler").addClass('adisabled');
    $("#lugsuplocation").addClass('adisabled');
    $("#txtsuppliertype").prop("disabled", true);
    $("#txtcreationdate").prop("disabled", true);
    $("#txteffectivedate").prop("disabled", true);
    //$("#nwGridMainCon").enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    //$("#noah-webui-Toolbox").bindingSave().enable(true);
}

function func_ToolboxNavigatorBind_Empty() {
    cust_GetPara();
    //nwLoading_Start("xBindEmpty", crLoadingHTML);
    //RefreshData();
    //func_ActionDriven("actBindCollectionEmpty", false);
}

function getGridData(idnum, index) {
    var data = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idnum - 1) + ") td:eq(" + index + ") span").text();
    return data;
}

///////////////////////////////////////

var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    if (idName == 'toolboxInquire') {
        ClearFields();
        func_Toolbox_Clear();
        nwSupplierCode = getParameterByName('nwSupplierCode'); 
        nwParameter_Add('nwSupplierCode', nwSupplierCode);
        func_ToolboxData("#noah-webui-Toolbox-Grid", "toolbox");
        toolboxrefresh();
    }

    if (idName == "lugLocationCode") {
        var locCode = getGridData(idNum, 0);
        var locTypeCode = getGridData(idNum, 1);
        var locTypeDesc = getGridData(idNum, 2);
        var locName = getGridData(idNum, 3);

        _GridLU.SetText((SPR_LocationCode - 1), _row, locCode);
        _GridLU.SetText((SPR_LocationTypeCode - 1), _row, locTypeCode);
        _GridLU.SetText((SPR_LocationType - 1), _row, locTypeDesc);
        _GridLU.SetText((SPR_LocationName - 1), _row, locName);

        nwGrid_AddRow("nwGridMainCon", 1);

    }

    if (idName == "lugNameSuffix") {
        var nameSuffix = getGridData(idNum, 0);

        _GridLU.SetText((SPR_Suffix - 1), _row, nameSuffix);

    }

    if (idName == "lugStatusCode") {

        var code = getGridData(idNum, 0);
        var desc = getGridData(idNum, 1);

        _GridLU.SetText((SPR_StatusCode - 1), _row, code);
        _GridLU.SetText((SPR_StatusDesc - 1), _row, desc);
    }

    //if (idName == "lugsuplocation") {
    //    var loccode = crnwTRtemp.find('td:eq(' + SPR_LOCCODE + ') ').text();
    //    nwParameter_Add("lugsuploccode", loccode);

    //    cust_GetPara();
    //    func_ActionDriven("actsuptype", false);

    //}

    if (idName == "lugcopyfrom") {

        nwParameter_Add("supplierCode", $('#idvallugsupplier').val());
        var account = getGridData(idNum, 0);
        var suppcode = getGridData(idNum, 1);
        var effectivitydate = getGridData(idNum, 2);
        nwParameter_Add("suppcode", suppcode);
        nwParameter_Add("effectivitydate", effectivitydate);
        // nwParameter_Add("Conid", Conid);
        cust_GetPara();
        $("#nwGridMainCon").enable(true);
        func_ActionDriven("copyfrom", false);

    }

    nwParameter_Add("tradename", $('#descvallugsupplier').val());


}

var _currRow = 0;
function nwGrid_Change(nwobj, nwobjrow, nwobjitem) {
    // alert(nwobj.attr('id'));
    //  nwobj.hide();
    var ss = nwobjitem.find('#selecta').val();
    if (nwobj.attr("id") == "nwGridPhone") {
        if (_col == SPR_Phone) {
            _currRow = _row;

            //if ($("#nwGridPhoneCon table tbody tr:eq(" + (_currRow) + ")").find("td:eq(1) input").val() != "") {
            //    $("#nwGridPhoneCon table tbody tr:eq(" + (_currRow) + ")").find("td:eq(2) input").enable(true);
            //    $("#nwGridPhoneCon table tbody tr:eq(" + (_currRow) + ")").find("td:eq(2) input").css("background-color", "white");
            //    $("#nwGridPhoneCon table tbody tr:eq(" + (_currRow) + ")").find("td:eq(2)").css("background-color", "white");
            //}
            //else {
            //    $("#nwGridPhoneCon table tbody tr:eq(" + (_currRow) + ")").find("td:eq(2) input").val('');
            //    $("#nwGridPhoneCon table tbody tr:eq(" + (_currRow) + ")").find("td:eq(2) input").enable(false);
            //    $("#nwGridPhoneCon table tbody tr:eq(" + (_currRow) + ")").find("td:eq(2) input").css("background-color", "gainsboro");
            //    $("#nwGridPhoneCon table tbody tr:eq(" + (_currRow) + ")").find("td:eq(2)").css("background-color", "gainsboro");
            //}
        }
    }
    //  nwobjrow.css('background-color', 'black');
    //  nwobjrow.find('td').css('background-color', 'rgba(0,0,0,0.1)');
    //$(nwobjrow).css('background-color', 'black');
}

function EnableFields() {
    $("#lugsuppler").removeClass('adisabled');
    $("#lugsuplocation").removeClass('adisabled');
    $("#lugsupplier").enable(true);
    $("#txtsuppliertype").prop("disabled", true);
    $("#txtsuppliertype").val("disabled");
    $("#txtcreationdate").prop("disabled", true);
    $("#txteffectivedate").prop("disabled", false);

    $(".history_switch").prop("disabled", true);
    $('#chkBox').prop('checked', true);
    //$("#nwGridMainCon").prop("disabled", false);
}

function DisableFields() {
    $("#lugsuppler").addClass('adisabled');
    $("#lugsuplocation").addClass('adisabled');
    $("#lugsupplier").enable(false);
    $("#txtsuppliertype").prop("disabled", true);
    $("#txtcreationdate").prop("disabled", true);
    $("#txteffectivedate").prop("disabled", true);
    $("#nwGridMainCon").prop("disabled", true);

    $(".history_switch").prop("disabled", false);
    $('#chkBox').prop('checked', true);

    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().visible(false);
}

function EnableFieldsDone() {//Binding Done
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);

    $(".history_switch").prop("disabled", false);
    $('#chkBox').prop('checked', true);

}

function DisableFieldsEmpty() {
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    // $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);

    $(".history_switch").prop("disabled", true);
    $('#chkBox').prop('checked', true);
}

function ClearFields() {
    $('#idvallugsuppler').val("");
    $('#idvallugsuplocation').val("");
    $('#txtsuppliertype').val("");
    $('#txtcreationdate').val("");
    $('#txteffectivedate').val("");
    $('#descvallugsuppler').val("");
    $('#descvallugsuplocation').val("");

    $('#chkBox').prop('checked', true);
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();

    else
        EnableFieldsDone();
}

function limitgridfield() {
    setTimeout(function () {
        $('.lastname').attr('maxlength', 80);
        $('.firstname').attr('maxlength', 80);
        $('.middlename').attr('maxlength', 80);
        $('.phoneno').attr('maxlength', 80);
        $('.local').attr('maxlength', 80);
        $('.mobileno').attr('maxlength', 80);
        $('.designation').attr('maxlength', 80);
        $('.email').attr('maxlength', 80);
        $('.deparment').attr('maxlength', 80);
    }, 150);
}

$(document).on("click", "#Copyfrom", function (e) {
    cust_GetPara();
    lookUpCustomize("lugcopyfrom", 1);
    return false;
});

$(document).on("change", "#txteffectivedate", function (e) {
    var effective = $('#txteffectivedate').val();
    var server = $('#txtservertime').val();

    if (effective < server) {
        MessageBox("Cannot Proceed. Effective Date should be later than the current server date.");
    }

});

function autoRefresh() {
    if (suppliercode != '') {
        linkaction()
    }
    else {
        normalfunctionaction();
    }
}

function disableNew() {
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingNew().visible(false);
}

function enableNew() {
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingNew().visible(true);
}


function func_LookUpInitialize(lookupid) {
    cust_GetPara();
    if (lookupid == "lugsuplocation") {
        //setgridfilter();
        //cust_GetPara();
    }
    else if (lookupid == "lugcopyfrom") {

        //cust_GetPara();

    }
}

function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
    var lcode = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text()
    var lname = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text()
    var ltype = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text()
    var ltypedesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(4)').text()

    var loccode = crnwTRtemp.find('td:eq(' + SPR_LOCCODE + ') ').text();
    var locname = crnwTRtemp.find('td:eq(' + SPR_LOCNAME + ') ').text();
    var loctype = crnwTRtemp.find('td:eq(' + SPR_LOCTYPE + ') ').text();
    var loctypedesc = crnwTRtemp.find('td:eq(' + SPR_LOCTYPEDESC + ') ').text();

    //nwParameter_Add("lugsuplocation", loccode);


    crnwTRtemp.find('td:eq(' + SPR_LOCCODE + ') ').text(lcode)
    crnwTRtemp.find('td:eq(' + SPR_LOCNAME + ') ').text(lname)
    crnwTRtemp.find('td:eq(' + SPR_LOCTYPE + ') ').text(ltype)
    crnwTRtemp.find('td:eq(' + SPR_LOCTYPEDESC + ') ').text(ltypedesc)

    return crnwTRtemp;
}

//$(document).on("change", "#nwGridMainCon", function (e) {
//    var effective = $('#txteffectivedate').val();
//    var server = $('#txtservertime').val();

//    if (effective < server) {
//        MessageBox("Cannot Proceed. Effective Date should be greater than the current server date.");
//    }

//});

function linkaction() {
    // $('#noah-webui-default-Refresh').click();
    $('#idvallugsupplier').val(suppliercode);
    $('#descvallugsupplier').val(tradename);
    nwParameter_Add('idvallugsupplier', $('#idvallugsupplier').val());
    func_ActionDriven("actTradename", false);
    $("#noah-webui-Toolbox").bindingNew().enable(true);
}

function normalfunctionaction() {
    $('#nwGrid1Con').enable(false);
    $("#noah-webui-Toolbox").bindingInquire().visible(true);
    $("#noah-webui-Toolbox").bindingNew().visible(false);
    $("#noah-webui-Toolbox").bindingSave().visible(false);
    //$("#noah-webui-Toolbox").bindingDelete().visible(false);
}

function toolboxrefresh() {
    if (nwSupplierCode != "" && nwIsReport == 1) {
        $("#noah-webui-Toolbox").bindingExport().enable(false);
        $("#noah-webui-Toolbox").bindingInquire().enable(true);
        $("#noah-webui-Toolbox").bindingSave().enable(false);
        $(".history_switch").prop("disabled", false);

    } else {
        $("#noah-webui-Toolbox").bindingSave().enable(true);
        $("#noah-webui-Toolbox").bindingExport().enable(true);
        $("#noah-webui-Toolbox").bindingInquire().enable(true);
        $(".history_switch").prop("disabled", false);

    }

    //$("#noah-webui-Toolbox").bindingExport().enable(true);
    //$("#noah-webui-Toolbox").bindingInquire().enable(true);
    //$("#noah-webui-Toolbox").bindingNew().enable(true);
    //$("#noah-webui-Toolbox").bindingDelete().enable(true);
}

// Tin - Additional Start


function Check() {
    var Grid = nwGridMainCon_Book.ActiveSheet;
    var cnt = Grid.GetMaxRow();

    for (var row = 0; row <= cnt; row++) {
        var withMultiple = Grid.GetText((SPR_MultipleContact - 1), row);
        var phone = Grid.GetText((SPR_PhoneNum - 1), row);
        var mobile = Grid.GetText((SPR_MobileNum - 1), row);
        var email = Grid.GetText((SPR_EmailNum - 1), row);
        var fax = Grid.GetText((SPR_FaxNum - 1), row);


        if (withMultiple == 1) {
            //$("#nwGridMainCon tbody tr:eq(" + row + ") td:eq(" + SPR_PhoneNo + ") ").addClass("nwGButton");
            Grid.SetText2((SPR_PhoneNo - 1), row, "...");
            //$("#nwGridMainCon tbody tr:eq(" + row + ") td:eq(" + SPR_PhoneNo + ") ").addClass("nwPhone");
            //$("#nwGridMainCon tbody tr:eq(" + row + ") td:eq(" + SPR_MobileNo + ") ").addClass("nwGButton");
            Grid.SetText2((SPR_MobileNo - 1), row, "...");
            //$("#nwGridMainCon tbody tr:eq(" + row + ") td:eq(" + SPR_MobileNo + ") ").addClass("nwMobile");
            //$("#nwGridMainCon tbody tr:eq(" + row + ") td:eq(" + SPR_Email + ") ").addClass("nwGButton");
            Grid.SetText2((SPR_Email - 1), row, "...");
            //$("#nwGridMainCon tbody tr:eq(" + row + ") td:eq(" + SPR_Email + ") ").addClass("nwEmail");
            //$("#nwGridMainCon tbody tr:eq(" + row + ") td:eq(" + SPR_FaxNo + ") ").addClass("nwGButton");
            Grid.SetText2((SPR_FaxNo - 1), row, "...");
            //$("#nwGridMainCon tbody tr:eq(" + row + ") td:eq(" + SPR_FaxNo + ") ").addClass("nwFax");
        }
        else {
            Grid.SetText2((SPR_PhoneNo - 1), row, phone);
            //$("#nwGridMainCon tbody tr:eq(" + row + ") td:eq(" + SPR_PhoneNo + ") ").addClass("nwPhone");
            Grid.SetText2((SPR_MobileNo - 1), row, mobile);
            //$("#nwGridMainCon tbody tr:eq(" + row + ") td:eq(" + SPR_MobileNo + ") ").addClass("nwMobile");
            Grid.SetText2((SPR_Email - 1), row, email);
            //$("#nwGridMainCon tbody tr:eq(" + row + ") td:eq(" + SPR_Email + ") ").addClass("nwEmail");
            Grid.SetText2((SPR_FaxNo - 1), row, fax);
            //$("#nwGridMainCon tbody tr:eq(" + row + ") td:eq(" + SPR_FaxNo + ") ").addClass("nwFax");
        }
    }
}

function isDisabled() {
    var Grid = nwGridMainCon_Book.ActiveSheet;
    var cnt = Grid.GetMaxRow();

    for (var row = 0; row < cnt; row++) {

        var ContactsID = Grid.GetText((SPR_ContactID - 1), row);
        var statCode = Grid.GetText((SPR_StatusCode - 1), row);

        if (ContactsID != "") {
            //if (statCode != "01") {
            //    $('#nwGridMainCon table tbody').find("tr:eq(" + row + ")").find("td:eq(" + SPR_PhoneNo + ")").enable(false);
            //    $('#nwGridMainCon table tbody').find("tr:eq(" + row + ")").find("td:eq(" + SPR_MobileNo + ")").enable(false);
            //    $('#nwGridMainCon table tbody').find("tr:eq(" + row + ")").find("td:eq(" + SPR_Email + ")").enable(false);
            //    $('#nwGridMainCon table tbody').find("tr:eq(" + row + ")").find("td:eq(" + SPR_FaxNo + ")").enable(false);
            //}
            //else {
            //    $('#nwGridMainCon table tbody').find("tr:eq(" + row + ")").find("td:eq(" + SPR_PhoneNo + ")").enable(true);
            //    $('#nwGridMainCon table tbody').find("tr:eq(" + row + ")").find("td:eq(" + SPR_MobileNo + ")").enable(true);
            //    $('#nwGridMainCon table tbody').find("tr:eq(" + row + ")").find("td:eq(" + SPR_Email + ")").enable(true);
            //    $('#nwGridMainCon table tbody').find("tr:eq(" + row + ")").find("td:eq(" + SPR_FaxNo + ")").enable(true);
            //}
        }
    }

    setTimeout(function () {
        $('.nwCheckBoxTot.nwCheckBoxTot13').attr("type", "hidden");
        $(".txtLastName").attr("autocomplete", "nope");
        $(".txtFirstName").attr("autocomplete", "nope");
        $(".txtMiddleName").attr("autocomplete", "nope");
        $(".txtDepartment").attr("autocomplete", "nope");
        $(".txtDesignation").attr("autocomplete", "nope");
    }, 500);
}

$(document).on('keydown', '.txtLastName', function () {
    $(".txtLastName").css('text-transform', 'capitalize');
    $(".txtLastName").attr('maxlength', '80');
});

$(document).on('keydown', '.txtFirstName', function () {
    $(".txtFirstName").css('text-transform', 'capitalize');
    $(".txtFirstName").attr('maxlength', '80');
});

$(document).on('keydown', '.txtMiddleName', function () {
    $(".txtMiddleName").css('text-transform', 'uppercase');
    $(".txtMiddleName").attr('maxlength', '30');
});

$(document).on('keydown', '.txtDepartment', function () {
    $(".txtDepartment").css('text-transform', 'capitalize');
    $(".txtDepartment").attr('maxlength', '80');
});

$(document).on('keydown', '.txtDesignation', function () {
    $(".txtDesignation").css('text-transform', 'capitalize');
    $(".txtDesignation").attr('maxlength', '80');
});

$(document).on('click', '.nwPhone', function () {

    if ($('#nwGridMain tbody').find('tr:eq(' + _row + ')').find('td:eq(' + SPR_LocationCode + ')').text() == "")
        return false;
    if (nwIsReport != "") {
        if ($('#nwGridMain tbody').find('tr:eq(' + _row + ')').find('td:eq(' + SPR_MultipleContact + ') input').prop("checked") == "true")
            return false;
    }

    row = _row;
    contactdID = nwLib.nwTempTable_RowData_Get("nwGridMainCon ", _row, SPR_ContactID - 1);
    cust_GetPara();
    nwParameter_Add("contactdID", contactdID);
    nwParameter_Add("nwIsReport", nwIsReport);
    setTimeout(function () {
        func_ActionDriven("actGeneratePhoneGrid", false);
    }, 500);

    nwPopupForm_ShowModal('nwPhone');

    return false;

});

function disablelocal() {
    var _individual = 0
    // _individual = $('#lblIndividual').text();
    var Grid = nwGridPhoneCon_Book.ActiveSheet;
    var rows = Grid.GetMaxRow();
    for (var i = 0; i < rows; i++) {
        if (i == 0 && _individual == 1) {
            Grid.SetEnable(1, i, false);
        }
        else {
            if (Grid.GetText(0, i) != "") {
                Grid.SetEnable(1, i, true);
            }
            else {
                Grid.SetEnable(1, i, false);
            }
        }
    }
}

$(document).on('focusout', '#nwGridPhoneCon', function () {
    if ($("#nwGridPhoneCon table tbody tr:eq(" + (_currRow - 1) + ")").find("td:eq(1) input").val() != "") {
        $("#nwGridPhoneCon table tbody tr:eq(" + (_currRow - 1) + ")").find("td:eq(2) input").enable(true);
        $("#nwGridPhoneCon table tbody tr:eq(" + (_currRow - 1) + ")").find("td:eq(2) input").css("background-color", "white");
        $("#nwGridPhoneCon table tbody tr:eq(" + (_currRow - 1) + ")").find("td:eq(2)").css("background-color", "white");
    }
    else {
        $("#nwGridPhoneCon table tbody tr:eq(" + (_currRow - 1) + ")").find("td:eq(2) input").val('');
        $("#nwGridPhoneCon table tbody tr:eq(" + (_currRow - 1) + ")").find("td:eq(2) input").enable(false);
        $("#nwGridPhoneCon table tbody tr:eq(" + (_currRow - 1) + ")").find("td:eq(2) input").css("background-color", "gainsboro");
        $("#nwGridPhoneCon table tbody tr:eq(" + (_currRow - 1) + ")").find("td:eq(2)").css("background-color", "gainsboro");
    }
});

$(document).on('keyup', '#nwGridPhoneCon', function () {
    if ($("#nwGridPhoneCon table tbody tr:eq(" + _row + ")").find("td:eq(1) input").val() != "") {
        $("#nwGridPhoneCon table tbody tr:eq(" + _row + ")").find("td:eq(2) input").enable(true);
        $("#nwGridPhoneCon table tbody tr:eq(" + _row + ")").find("td:eq(2) input").css("background-color", "white");
        $("#nwGridPhoneCon table tbody tr:eq(" + _row + ")").find("td:eq(2)").css("background-color", "white");
    }
    else {
        $("#nwGridPhoneCon table tbody tr:eq(" + _row + ")").find("td:eq(2) input").val('');
        $("#nwGridPhoneCon table tbody tr:eq(" + _row + ")").find("td:eq(2) input").enable(false);
        $("#nwGridPhoneCon table tbody tr:eq(" + _row + ")").find("td:eq(2) input").css("background-color", "gainsboro");
        $("#nwGridPhoneCon table tbody tr:eq(" + _row + ")").find("td:eq(2)").css("background-color", "gainsboro");
    }
});

$(document).on('change', '#nwGridPhoneCon', function () {
    if ($("#nwGridPhoneCon table tbody tr:eq(" + _row + ")").find("td:eq(1) input").val() != "") {
        $("#nwGridPhoneCon table tbody tr:eq(" + _row + ")").find("td:eq(2) input").enable(true);
        $("#nwGridPhoneCon table tbody tr:eq(" + _row + ")").find("td:eq(2) input").css("background-color", "white");
        $("#nwGridPhoneCon table tbody tr:eq(" + _row + ")").find("td:eq(2)").css("background-color", "white");
    }
    else {
        $("#nwGridPhoneCon table tbody tr:eq(" + _row + ")").find("td:eq(2) input").val('');
        $("#nwGridPhoneCon table tbody tr:eq(" + _row + ")").find("td:eq(2) input").enable(false);
        $("#nwGridPhoneCon table tbody tr:eq(" + _row + ")").find("td:eq(2) input").css("background-color", "gainsboro");
        $("#nwGridPhoneCon table tbody tr:eq(" + _row + ")").find("td:eq(2)").css("background-color", "gainsboro");
    }
});

function window_close(verID) {
    nwParameter_Add("isView", isView);
    if (verID == "nwPhone") {
        cust_GetPara();
        nwParameter_Add("row", _row);
        nwParameter_Add("contactdID", contactdID);
        //nwParameter_Add("VendorId", $('#txtVendorID').val());
        func_ActionDriven("actLoadButtons", false);
        
    }
    else if (verID == "nwMobile") {
        cust_GetPara();
        nwParameter_Add("row", _row);
        nwParameter_Add("contactdID", contactdID);
        //nwParameter_Add("VendorId", $('#txtVendorID').val());
        func_ActionDriven("actLoadButtons", false);

    } else if (verID == "nwEmail") {
        cust_GetPara();
        nwParameter_Add("row", _row);
        nwParameter_Add("contactdID", contactdID);
        //nwParameter_Add("VendorId", $('#txtVendorID').val());
        func_ActionDriven("actLoadButtons", false);

    }
    else if (verID == "nwFax") {
        cust_GetPara();
        nwParameter_Add("row", _row);
        nwParameter_Add("contactdID", contactdID);
        //nwParameter_Add("VendorId", $('#txtVendorID').val());
        func_ActionDriven("actLoadButtons", false);

    }
    nwPopupForm_HideModal(verID);
}

$(document).on('click', '#btnPhoneSave', function () {
    nwLoading_Start("xSavePhone", crLoadingHTML);
    cust_GetPara();
    nwParameter_Add("contactdID", contactdID);
    nwParameter_Add("row", _row);
    nwParameter_Add_Table("nwGridPhoneCon");
    func_ActionDriven("actSavePhone", false);
    return false;

});

$(document).on('click', '.nwMobile', function () {

    if ($('#nwGridMain tbody').find('tr:eq(' + _row + ')').find('td:eq(' + SPR_LocationCode + ')').text() == "")
        return false;
    if (nwIsReport != "") {
        if ($('#nwGridMain tbody').find('tr:eq(' + _row + ')').find('td:eq(' + SPR_MultipleContact + ') input').prop("checked") == "true")
            return false;
    }

    row = _row;
    contactdID = nwLib.nwTempTable_RowData_Get("nwGridMainCon ", _row, SPR_ContactID - 1);
    cust_GetPara();
    nwParameter_Add("contactdID", contactdID);
    nwParameter_Add("nwIsReport", nwIsReport);
    setTimeout(function () {
        func_ActionDriven("actGenerateMobileGrid", false);
    }, 500);

    nwPopupForm_ShowModal('nwMobile');

    return false;

});

$(document).on('click', '#btnMobileSave', function () {
    nwLoading_Start("xSaveMobile", crLoadingHTML);
    cust_GetPara();
    nwParameter_Add("contactdID", contactdID);
    nwParameter_Add("row", _row);
    nwParameter_Add_Table("nwGridMobileCon");
    func_ActionDriven("actSaveMobile", false);
    return false;
});

$(document).on('click', '.nwEmail', function () {

    //cust_GetPara();
    if ($('#nwGridMain tbody').find('tr:eq(' + _row + ')').find('td:eq(' + SPR_LocationCode + ')').text() == "")
        return false;

    row = _row;

    nwPopupForm_ShowModal('nwEmail');

    contactdID = nwLib.nwTempTable_RowData_Get("nwGridMainCon ", _row, SPR_ContactID - 1);
    cust_GetPara();
    currRow = _row;
    nwParameter_Add("contactdID", contactdID);
    nwParameter_Add("row", _row);
    nwParameter_Add("nwIsReport", nwIsReport);
    setTimeout(function () {
        func_ActionDriven("actGenerateEmailGrid", false);
    }, 500);

    return false;

});

$(document).on('click', '#btnEmailSave', function () {
    //cust_GetPara();
    //nwPopupForm_ShowModal('nwPhone');
    nwLoading_Start("xSaveEmail", crLoadingHTML);
    cust_GetPara();
    nwParameter_Add("contactdID", contactdID);
    nwParameter_Add("row", _row);
    nwParameter_Add_Table("nwGridEmailCon");
    func_ActionDriven("actSaveEmail", false);
    return false;
});

$(document).on('click', '.nwFax', function () {
    if ($('#nwGridMain tbody').find('tr:eq(' + _row + ')').find('td:eq(' + SPR_LocationCode + ')').text() == "")
        return false;
    cust_GetPara();

    row = _row;

    nwPopupForm_ShowModal('nwFax');

    contactdID = nwLib.nwTempTable_RowData_Get("nwGridMainCon ", _row, SPR_ContactID - 1);
    nwParameter_Add("contactdID", contactdID);
    nwParameter_Add("row", row);
    nwParameter_Add("nwIsReport", nwIsReport);
    setTimeout(function () {
        func_ActionDriven("actGenerateFaxGrid", false);
    }, 500);

    return false;

});

$(document).on('click', '#btnFaxSave', function () {
    //cust_GetPara();
    //nwPopupForm_ShowModal('nwPhone');
    nwLoading_Start("xSaveFax", crLoadingHTML);
    cust_GetPara();
    nwParameter_Add("contactdID", contactdID);
    nwParameter_Add("row", _row);
    nwParameter_Add_Table("nwGridFaxCon");
    func_ActionDriven("actSaveFax", false);
    return false;
});

// function Disable First Row for Individual
function disableFirstRowInd() {
    var Grid = nwGridMainCon_Book.ActiveSheet;
    var cnt = Grid.GetMaxRow();

    for (var row = 0; row <= cnt; row++) {
        if (row == 0) {
            Grid.SetBackground((SPR_LocationCode - 1), row, "gainsboro");
            Grid.SetBackground((SPR_Suffix - 1), row, "gainsboro");
            Grid.SetEnable((SPR_LastName - 1), row, false);
            Grid.SetBackground((SPR_LastName - 1), row, "gainsboro");
            Grid.SetEnable((SPR_FirstName - 1), row, false);
            Grid.SetBackground((SPR_FirstName - 1), row, "gainsboro");
            Grid.SetEnable((SPR_MiddleName - 1), row, false);
            Grid.SetBackground((SPR_MiddleName - 1), row, "gainsboro");
            Grid.SetBackground((SPR_StatusCode - 1), row, "cyan");
            Grid.SetEnable((SPR_Remove - 1), row, false);
        }
        Grid.SetEnable((SPR_MultipleContact - 1), row, false);
    }
}

function disableFirstRow() {
    var Grid = nwGridMainCon_Book.ActiveSheet;
    var cnt = Grid.GetMaxRow();

    for (var row = 0; row <= cnt; row++) {
        if (row == 0) {
            //$("#nwGridMainCon tbody tr:eq(" + row + ") td:eq(" + SPR_LastName + ") input").enable(false);
            //$("#nwGridMainCon tbody tr:eq(" + row + ") td:eq(" + SPR_LastName + ")").css("background-color", "gainsboro");
            //$("#nwGridMainCon tbody tr:eq(" + row + ") td:eq(" + SPR_Suffix + ")").enable(false);
            //$("#nwGridMainCon tbody tr:eq(" + row + ") td:eq(" + SPR_FirstName + ") input").enable(false);
            //$("#nwGridMainCon tbody tr:eq(" + row + ") td:eq(" + SPR_FirstName + ")").css("background-color", "gainsboro");
            //$("#nwGridMainCon tbody tr:eq(" + row + ") td:eq(" + SPR_MiddleName + ") input").enable(false);
            //$("#nwGridMainCon tbody tr:eq(" + row + ") td:eq(" + SPR_MiddleName + ")").css("background-color", "gainsboro");
            Grid.SetBackground((SPR_StatusCode - 1), row, "cyan");  //false
            //$("#nwGridMainCon tbody tr:eq(" + row + ") td:eq(" + SPR_Remove + ")").enable(false);
        }
        Grid.SetEnable((SPR_MultipleContact - 1), row, false);
    }
}

// Disabled upon saving
function disableSave() {
    var Grid = nwGridMainCon_Book.ActiveSheet;
    var cnt = Grid.GetMaxRow();
    var contactsId = "";
    for (var row = 0; row <= cnt; row++) {
        contactsId = Grid.GetText((SPR_ContactID - 1), row);
        if (contactsId != "") {
            Grid.SetBackground((SPR_LocationCode - 1), row, "gainsboro");
        }

        var statCode = Grid.GetText((SPR_StatusCode - 1), row);

        if (statCode != "01" && statCode != "" && row != 0) {
            Grid.SetBackground((SPR_LocationCode - 1), row, "gainsboro");
            Grid.SetEnable((SPR_LocationCode - 1), row, false);
            Grid.SetBackground((SPR_LastName - 1), row, "gainsboro");
            Grid.SetBackground((SPR_Suffix - 1), row, "gainsboro");
            Grid.SetEnable((SPR_FirstName - 1), row, false);
            Grid.SetBackground((SPR_FirstName - 1), row, "gainsboro");
            Grid.SetEnable((SPR_MiddleName - 1), row, false);
            Grid.SetBackground((SPR_MiddleName - 1), row, "gainsboro");
            Grid.SetEnable((SPR_Department - 1), row, false);
            Grid.SetBackground((SPR_Department - 1), row, "gainsboro");
            Grid.SetEnable((SPR_Designation - 1), row, false);
            Grid.SetBackground((SPR_Designation - 1), row, "gainsboro");
            Grid.SetEnable((SPR_MultipleContact - 1), row, false);
            Grid.SetEnable((SPR_PhoneNo - 1), row, false);
            Grid.SetEnable((SPR_MobileNo - 1), row, false);
            Grid.SetEnable((SPR_Email - 1), row, false);
            Grid.SetEnable((SPR_FaxNo - 1), row, false);
            Grid.SetBackground((SPR_StatusCode - 1), row, "cyan");
            Grid.SetEnable((SPR_Remove - 1), row, false);
        }
    }

    if (getParameterByName('nwSupplierCode') == "") {
        $('#nwGridMainCon').enable(false);
    }
}

// Disable Local 
function disableLocalPhone() {
    var Grid = nwGridPhoneCon_Book.ActiveSheet;
    var cnt = Grid.GetMaxRow();
    var contactsId = "";
    for (var row = 0; row <= cnt; row++) {
        if (Grid.GetText(0, row) != "") {
            Grid.GetText(1, row, true);
            Grid.GetText(1, row, "white");
        }
        else {
            Grid.GetText(1, row, false);
            Grid.GetText(1, row, "gainsboro");
        }
    }
}

// Disable first row in Popup if Individual
function disablePopUp(idName) {
    var currentRow = _row;
    setTimeout(function () {
        if (idName == "nwGridPhoneCon") {
            //===== PHONE =====//
            var Grid = nwGridPhoneCon_Book.ActiveSheet;
            var cnt = Grid.GetMaxRow();
            var contactsId = "";
            for (var row = 0; row <= cnt; row++) {
                if (row == 0 && currentRow == 0) {
                    Grid.SetEnable((SPR_Phone - 1), row, false);
                    Grid.SetBackground((SPR_Phone - 1), row, "gainsboro");
                    Grid.SetEnable((SPR_LocalNo - 1), row, false);
                    Grid.SetBackground((SPR_LocalNo - 1), row, "gainsboro");
                    Grid.SetEnable((SPR_Remove_P - 1), row, false);
                } else {
                    if (Grid.GetText(0, row) != "") {
                        Grid.SetEnable((SPR_Phone - 1), row, true);
                        Grid.SetBackground((SPR_Phone - 1), row, "white");
                        Grid.SetEnable((SPR_LocalNo - 1), row, true);
                        Grid.SetBackground((SPR_LocalNo - 1), row, "white");
                        Grid.SetEnable((SPR_Remove_P - 1), row, true);
                    }
                    else {
                        Grid.SetEnable((SPR_Phone - 1), row, true);
                        Grid.SetBackground((SPR_Phone - 1), row, "white");
                        Grid.SetEnable((SPR_LocalNo - 1), row, false);
                        Grid.SetBackground((SPR_LocalNo - 1), row, "gainsboro");
                        Grid.SetEnable((SPR_Remove_P - 1), row, true);
                    }
                }

            }
        } else if (idName == "nwGridMobileCon") {
            //===== MOBILE =====//
            var Grid = nwGridMobileCon_Book.ActiveSheet;
            var cnt = Grid.GetMaxRow();
            var contactsId = "";
            for (var row = 0; row <= cnt; row++) {
                if (row == 0 && currentRow == 0) {
                    Grid.SetEnable((SPR_Mobile - 1), row, false);
                    Grid.SetBackground((SPR_Mobile - 1), row, "gainsboro");
                    Grid.SetEnable((SPR_Remove_M - 1), row, false);
                }
            }
        } else if (idName == "nwGridEmailCon") {
            //===== EMAIL =====//
            var Grid = nwGridEmailCon_Book.ActiveSheet;
            var cnt = Grid.GetMaxRow();
            var contactsId = "";
            for (var row = 0; row <= cnt; row++) {
                if (row == 0 && currentRow == 0) {
                    Grid.SetEnable((SPR_EmailAdd - 1), row, false);
                    Grid.SetBackground((SPR_EmailAdd - 1), row, "gainsboro");
                    Grid.SetEnable((SPR_Remove_E - 1), row, false);
                }

            }
        } else if (idName == "nwGridFaxCon") {
            //===== FAX =====//
            var Grid = nwGridFaxCon_Book.ActiveSheet;
            var cnt = Grid.GetMaxRow();
            var contactsId = "";
            for (var row = 0; row <= cnt; row++) {
                if (row == 0 && currentRow == 0) {
                    Grid.SetEnable((SPR_Fax - 1), row, false);
                    Grid.SetBackground((SPR_Fax - 1), row, "gainsboro");
                    Grid.SetEnable((SPR_Remove_F - 1), row, false);
                }
            }
        }
        //$('#' + idName).enable(false);
    }, 150);
}

function msgBoxContainerQuestionF(genID, answer) {
    if (genID == "nwDelete") {
        if (answer == "Yes") {
            cust_GetPara();
            nwParameter_Add("ContactID", nwGridMainCon_Book.ActiveSheet((SPR_ContactID - 1), _row));
            nwParameter_Add("StatusCode", nwGridMainCon_Book.ActiveSheet((SPR_StatusCode - 1), _row));
            func_ActionDriven("actDeleteLIN", false);
            $(".nwgrid_Delete").click();
        }
    }
    if (genID == "nwRemoveBtnPhone") {
        if (answer == "Yes") {
            $(".nwgrid_Delete").click();
            nwGrid_AddRow('nwGridPhoneCon', 1);
            var rows = nwGridPhoneCon_Book.ActiveSheet.GetMaxRow();
            nwGridPhoneCon_Book.ActiveSheet.SetEnable(0, (rows - 1), true);
            nwGridPhoneCon_Book.ActiveSheet.SetBackground(0, (rows - 1), "white");
            nwGridPhoneCon_Book.ActiveSheet.SetEnable(1, (rows - 1), false);
            nwGridPhoneCon_Book.ActiveSheet.SetEnable(1, (rows - 1), "gainsboro");
            nwGridPhoneCon_Book.ActiveSheet.SetEnable(2, (rows - 1), true);
        }
    }
    if (genID == "nwRemoveBtnMobile") {
        if (answer == "Yes") {
            $(".nwgrid_Delete").click();
            nwGrid_AddRow('nwGridMobileCon', 1);
            var rows = nwGridMobileCon_Book.ActiveSheet.GetMaxRow();
            nwGridMobileCon_Book.ActiveSheet.SetEnable(0, (rows - 1), true);
            nwGridMobileCon_Book.ActiveSheet.SetBackground(0, (rows - 1), "white");
            nwGridMobileCon_Book.ActiveSheet.SetEnable(1, (rows - 1), true);
        }
    }
    if (genID == "nwRemoveBtnEmail") {
        if (answer == "Yes") {
            $(".nwgrid_Delete").click();
            nwGrid_AddRow('nwGridEmailCon', 1);
            var rows = nwGridEmailCon_Book.ActiveSheet.GetMaxRow();
            nwGridEmailCon_Book.ActiveSheet.SetEnable(0, (rows - 1), true);
            nwGridEmailCon_Book.ActiveSheet.SetBackground(0, (rows - 1), "white");
            nwGridEmailCon_Book.ActiveSheet.SetEnable(1, (rows - 1), true);
        }
    }
    if (genID == "nwRemoveBtnFax") {
        if (answer == "Yes") {
            $(".nwgrid_Delete").click();
            nwGrid_AddRow('nwGridFaxCon', 1);
            var rows = nwGridFaxCon_Book.ActiveSheet.GetMaxRow();
            nwGridFaxCon_Book.ActiveSheet.SetEnable(0, (rows - 1), true);
            nwGridFaxCon_Book.ActiveSheet.SetBackground(0, (rows - 1), "white");
            nwGridFaxCon_Book.ActiveSheet.SetEnable(1, (rows - 1), true);
        }
    }
    else if (genID == "closing") {
        if (answer == "Yes") {
            isClose = true;
            parent.mainParent_Close_Form();
        }
    }
}

$(document).on("click", ".nwDelete", function () {
    var cntRow = nwTempTable_Row_Count("nwGridMainCon") - 1;

    if (nwIsReport == 1 || $('#nwGridMainCon tbody').find('tr:eq(' + _row + ')').find('td:eq(' + SPR_StatusCode + ')').text() == "01"
        || nwSupplierCode.length <= 0) {
        return false;
    }

    var record = $('#nwGridMainCon .tblGridBody tr:eq(' + _row + ') td:eq(' + SPR_LocationCode + ')').text();

    if (record != "") {

        msgBoxContainerQuestion = "nwDelete";
        parent_MessageBoxQuestion("Do you wish to remove current row?", basedTitle, "");
    }

});

$(document).on("click", ".nwRemoveBtnPhone", function () {
    if (nwIsReport == 1) return;

    var phone = $('#nwGridPhoneCon .tblGridBody tr:eq(' + _row + ') td:eq(' + SPR_Phone + ') input').val();
    var local = $('#nwGridPhoneCon .tblGridBody tr:eq(' + _row + ') td:eq(' + 2 + ') input').val();

    if (phone != "") {
        msgBoxContainerQuestion = "nwRemoveBtnPhone";
        parent_MessageBoxQuestion("Do you wish to remove current row?", basedTitle, "");
    }
    else if (local != "") {
        msgBoxContainerQuestion = "nwRemoveBtnPhone";
        parent_MessageBoxQuestion("Do you wish to remove current row?", basedTitle, "");
    }
    else if (phone == "" && local == "") {
        MessageBox("No details found!", basedTitle, "error");
    }
    else {
        MessageBox("No details found!", basedTitle, "error");
    }

});

$(document).on("click", ".nwRemoveBtnMobile", function () {
    if (nwIsReport == 1) return;

    var mob = $('#nwGridMobileCon .tblGridBody tr:eq(' + _row + ') td:eq(' + SPR_Mobile + ') input').val();

    if (mob != "") {
        msgBoxContainerQuestion = "nwRemoveBtnMobile";
        parent_MessageBoxQuestion("Do you wish to remove current row?", basedTitle, "");
    }
    else {
        MessageBox("No details found!", basedTitle, "error");
    }

});

$(document).on("click", ".nwRemoveBtnEmail", function () {
    if (nwIsReport == 1) return;

    var email = $('#nwGridEmailCon .tblGridBody tr:eq(' + _row + ') td:eq(' + SPR_EmailAdd + ') input').val();

    if (email != "") {
        msgBoxContainerQuestion = "nwRemoveBtnEmail";
        parent_MessageBoxQuestion("Do you wish to remove current row?", basedTitle, "");
    }
    else {
        MessageBox("No details found!", basedTitle, "error");
    }

});

$(document).on("click", ".nwRemoveBtnFax", function () {
    if (nwIsReport == 1) return;

    var fax = $('#nwGridFaxCon .tblGridBody tr:eq(' + _row + ') td:eq(' + SPR_Fax + ') input').val();

    if (fax != "") {
        msgBoxContainerQuestion = "nwRemoveBtnFax";
        parent_MessageBoxQuestion("Do you wish to remove current row?", basedTitle, "");
    }
    else {
        MessageBox("No details found!", basedTitle, "error");
    }

});

// Disable for Report
function disableReport() {
    var Grid = nwGridMainCon_Book.ActiveSheet;
    var cnt = Grid.GetMaxRow();
    var contactsId = "";
    for (var row = 0; row <= cnt; row++) {
        Grid.SetEnable((SPR_MultipleContact - 1), row, false);
        Grid.SetBackground((SPR_LocationCode - 1), row, "gainsboro");
        Grid.SetEnable((SPR_LastName - 1), row, false);
        Grid.SetBackground((SPR_LastName - 1), row, "gainsboro");
        Grid.SetBackground((SPR_Suffix - 1), row, "gainsboro");
        Grid.SetEnable((SPR_FirstName - 1), row, false);
        Grid.SetBackground((SPR_FirstName - 1), row, "gainsboro");
        Grid.SetEnable((SPR_MiddleName - 1), row, false);
        Grid.SetBackground((SPR_MiddleName - 1), row, "gainsboro");
        Grid.SetEnable((SPR_Department - 1), row, false);
        Grid.SetBackground((SPR_Department - 1), row, "gainsboro");
        Grid.SetEnable((SPR_Designation - 1), row, false);
        Grid.SetBackground((SPR_Designation - 1), row, "gainsboro");
        Grid.SetBackground((SPR_StatusCode - 1), row, "gainsboro");
        Grid.SetEnable((SPR_Remove - 1), row, false);
    }
}

// Disable Pop up for viewing
function disablePopUpView() {
    var Grid;
    var cnt;
    // Phone
    try {
        Grid = nwGridPhoneCon_Book.ActiveSheet;
        cnt = Grid.GetMaxRow();
        for (var row = 0; row <= cnt; row++) {
            Grid.SetEnable(0, row, false);
            Grid.SetEnable(0, row, "gainsboro");
            Grid.SetEnable(1, row, false);
            Grid.SetEnable(1, row, "gainsboro");
        }
    } catch (e) {  }
    
    // Mobile
    try {
        Grid = nwGridMobileCon_Book.ActiveSheet;
        cnt = Grid.GetMaxRow();
        for (var row = 0; row <= cnt; row++) {
            Grid.SetEnable(0, row, false);
            Grid.SetEnable(0, row, "gainsboro");
        }
    } catch (e) { }

    // Email
    try {
        Grid = nwGridEmailCon_Book.ActiveSheet;
        cnt = Grid.GetMaxRow();
        for (var row = 0; row <= cnt; row++) {
            Grid.SetEnable(0, row, false);
            Grid.SetEnable(0, row, "gainsboro");
        }
    } catch (e) { }

    // Fax
    try {
        Grid = nwGridFaxCon_Book.ActiveSheet;
        cnt = Grid.GetMaxRow();
        for (var row = 0; row <= cnt; row++) {
            Grid.SetEnable(0, row, false);
            Grid.SetEnable(0, row, "gainsboro");
        }
    } catch (e) { }
}

// Tin - Additional End

$(document).on('click', '.BoxClose', function (e) {
    $('.lookupcolSearch').val("");
});


$(document).keyup(function (e) {
    if (e.key === "Escape") {
        $('.lookupcolSearch').val("");
    }
});

//Validate duplicate entry in Phone, Mobile No, Email, Fax

//====== PHONE & LOCAL ======//
$(document).on('keyup', '#txtLocal', function () {
    var phoneNo = $('#nwGridPhone .tblGridBody tr:eq(' + _row + ') td:eq(' + SPR_Phone + ') input').val();
    var localNo = $('#nwGridPhone .tblGridBody tr:eq(' + _row + ') td:eq(' + SPR_LocalNo + ') input').val();
    var combi = phoneNo + localNo
    var row = $('#nwGridPhone .tblGridBody tr').length;

    for (var i = 0; i <= row; i++) {
        var existPhone = $('#nwGridPhone .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_Phone + ') input').val();
        var existLocal = $('#nwGridPhone .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_LocalNo + ') input').val();
        var combiExist = existPhone + existLocal

        if (existLocal != '') {
            if (i != _row) {
                if (combiExist == combi) {
                    MessageBox("Cannot proceed. Phone No. and Local already exists. \n", basedTitle, "error");
                    $("#nwGridPhoneCon .tblGridBody tr:eq(" + _row + ") td:eq(" + SPR_Phone + ") input").val('');
                    $("#nwGridPhoneCon .tblGridBody tr:eq(" + _row + ") td:eq(" + SPR_LocalNo + ") input").val('');
                    $("#nwGridPhoneCon table tbody tr:eq(" + _row + ")").find("td:eq(" + SPR_LocalNo + ") input").enable(false);
                    $("#nwGridPhoneCon table tbody tr:eq(" + _row + ")").find("td:eq(" + SPR_LocalNo + ") input").css("background-color", "gainsboro");
                    $("#nwGridPhoneCon table tbody tr:eq(" + _row + ")").find("td:eq(" + SPR_LocalNo + ")").css("background-color", "gainsboro");
                    $("#nwGridPhoneCon table tbody tr:eq(" + _row + ")").find("td:eq(" + SPR_Remove_P + ")").enable(false);
                }
            }
        }
    }
});

//====== MOBILE ======//
$(document).on('keyup', '#txtMobile', function () {
    var phoneNo = $('#nwGridMobile .tblGridBody tr:eq(' + _row + ') td:eq(' + SPR_Mobile + ') input').val();
    var row = _row - 1

    for (var i = 0; i <= row; i++) {
        var existPhone = $('#nwGridMobile .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_Mobile + ') input').val();

        if (existPhone != '') {
            if (existPhone == phoneNo) {
                MessageBox("Cannot proceed. Mobile No. already exists. \n", basedTitle, "error");
                $("#nwGridMobileCon .tblGridBody tr:eq(" + _row + ") td:eq(" + SPR_Mobile + ") input").val('');
                $("#nwGridMobileCon table tbody tr:eq(" + _row + ")").find("td:eq(" + SPR_Remove_P + ")").enable(false);
            }
        }
    }
});

//====== EMAIL ======//
$(document).on('keyup', '#txtEmail', function () {
    var phoneNo = $('#nwGridEmail .tblGridBody tr:eq(' + _row + ') td:eq(' + SPR_EmailAdd + ') input').val();
    var row = _row - 1

    for (var i = 0; i <= row; i++) {
        var existPhone = $('#nwGridEmail .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_EmailAdd + ') input').val();

        if (existPhone != '') {
            if (existPhone == phoneNo) {
                MessageBox("Cannot proceed. Email Address already exists. \n", basedTitle, "error");
                $("#nwGridEmailCon .tblGridBody tr:eq(" + _row + ") td:eq(" + SPR_EmailAdd + ") input").val('');
                $("#nwGridEmailCon table tbody tr:eq(" + _row + ")").find("td:eq(" + SPR_Remove_P + ")").enable(false);
            }
        }
    }
});

//====== FAX ======//
$(document).on('keyup', '#txtFax', function () {
    var fax = $('#nwGridFax .tblGridBody tr:eq(' + _row + ') td:eq(' + SPR_Fax + ') input').val();
    var row = _row - 1

    for (var i = 0; i <= row; i++) {
        var existFax = $('#nwGridFax .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_Fax + ') input').val();

        if (existFax != '') {
            if (existFax == fax) {
                MessageBox("Cannot proceed. Fax No. already exists. \n", basedTitle, "error");
                $("#nwGridFaxCon .tblGridBody tr:eq(" + _row + ") td:eq(" + SPR_Fax + ") input").val('');
                $("#nwGridFaxCon table tbody tr:eq(" + _row + ")").find("td:eq(" + SPR_Remove_P + ")").enable(false);
            }
        }
    }
});

function func_nwGrid_DeleteValidation() {
    var isContinue = true;

    var dateCreated = nwGridMainCon_Book.ActiveSheet.GetText((SPR_DateCreated - 1), _row);

    if (dateCreated != "") {
        //  MessageBox("Cannot Delete. Data are loaded based on the setup.", baseTitle, 'error');
        isContinue = false;
    }

    return isContinue;
}

function func_nwGrid_InsertValidation() {
    var isContinue = true;

    var dateCreated = nwGridMainCon_Book.ActiveSheet.GetText((SPR_DateCreated - 1), _row);

    if (dateCreated != "") {
        //  MessageBox("Cannot Delete. Data are loaded based on the setup.", baseTitle, 'error');
        isContinue = false;
    }

    return isContinue;
}

function DisableUponView() {
    var isDisabled = isView.toLowerCase() == "true" ? true : false;
    var Grid = nwGridMainCon_Book.ActiveSheet;
    var cnt = Grid.GetMaxRow();

    if (isDisabled && nwIsReport == 1) {
        for (var x = 0; x <= cnt; x++) {
            Grid.SetEnable((SPR_DateCreated - 1), x, false);
            Grid.SetBackground((SPR_LocationCode - 1), x, "gainsboro");
            Grid.SetBackground((SPR_LocationTypeCode - 1), x, "gainsboro");
            Grid.SetBackground((SPR_LocationType - 1), x, "gainsboro");
            Grid.SetBackground((SPR_LocationName - 1), x, "gainsboro");
            Grid.SetEnable((SPR_ContactID - 1), x, false);
            Grid.SetEnable((SPR_LastName - 1), x, false);
            Grid.SetBackground((SPR_Suffix - 1), x, "gainsboro");
            Grid.SetEnable((SPR_FirstName - 1), x, false);
            Grid.SetEnable((SPR_MiddleName - 1), x, false);
            Grid.SetEnable((SPR_Department - 1), x, false);
            Grid.SetEnable((SPR_Designation - 1), x, false);
            Grid.SetEnable((SPR_MultipleContact - 1), x, false);
            Grid.SetEnable((SPR_PhoneNo - 1), x, false);
            Grid.SetEnable((SPR_Local - 1), x, false);
            Grid.SetEnable((SPR_MobileNo - 1), x, false);
            Grid.SetEnable((SPR_Email - 1), x, false);
            Grid.SetEnable((SPR_FaxNo - 1), x, false);
            Grid.SetBackground((SPR_StatusCode - 1), x, "gainsboro");
        }
    }
    else if (!isDisabled) {
        //Disable other buttons
        $('.nwgrid_buttons').enable(true);
        $('#noah-webui-default-Save').enable(true);
        $('#btnPhoneSave').enable(true);
        $('#btnMobileSave').enable(true);
        $('#btnEmailSave').enable(true);
        $('#btnFaxSave').enable(true);
        $('#nwGridPhoneData').enable(true);
        $('#nwGridMobileData').enable(true);
        $('#nwGridEmail').enable(true);
        $('#nwGridFax').enable(true);
    }
}

function CreateGridDone(GridName) {
    var Grid;
    var MaxRow = 0;
    var BackColor = "";
    var BtnBackColor = "";
    setTimeout(function () {
        if (GridName == "nwGridMainCon") {
            Grid = nwGridMainCon_Book.ActiveSheet;
            MaxRow = Grid.GetMaxRow();
            BackColor = $("#nwGridMainCon").enable() ? "Cyan" : "Gainsboro";
            BtnBackColor = $("#nwGridMainCon").enable() ? "#2689d8" : "Gainsboro";
            for (var x = 0; x <= MaxRow; x++) {
                Grid.SetEnable((SPR_LastName - 1), x, $("#nwGridMainCon").enable());
                Grid.SetEnable((SPR_FirstName - 1), x, $("#nwGridMainCon").enable());
                Grid.SetEnable((SPR_MiddleName - 1), x, $("#nwGridMainCon").enable());
                Grid.SetEnable((SPR_Department - 1), x, $("#nwGridMainCon").enable());
                Grid.SetEnable((SPR_Designation - 1), x, $("#nwGridMainCon").enable());
                Grid.SetEnable((SPR_MultipleContact - 1), x, $("#nwGridMainCon").enable());

                Grid.SetBackground((SPR_LocationCode - 1), x, BackColor);
                Grid.SetBackground((SPR_Suffix - 1), x, BackColor);
                Grid.SetBackground((SPR_StatusCode - 1), x, BackColor);

                Grid.SetBackground((SPR_PhoneNo - 1), x, BtnBackColor);
                Grid.SetText2((SPR_PhoneNo - 1), x, "...");
                Grid.SetTextColor((SPR_PhoneNo - 1), x, "#FFFFFF");
                Grid.SetBackground((SPR_MobileNo - 1), x, BtnBackColor);
                Grid.SetText2((SPR_MobileNo - 1), x, "...");
                Grid.SetTextColor((SPR_MobileNo - 1), x, "#FFFFFF");
                Grid.SetBackground((SPR_Email - 1), x, BtnBackColor);
                Grid.SetText2((SPR_Email - 1), x, "...");
                Grid.SetTextColor((SPR_Email - 1), x, "#FFFFFF");
                Grid.SetBackground((SPR_FaxNo - 1), x, BtnBackColor);
                Grid.SetText2((SPR_FaxNo - 1), x, "...");
                Grid.SetTextColor((SPR_FaxNo - 1), x, "#FFFFFF");
                Grid.SetBackground((SPR_Remove - 1), x, BtnBackColor);
                Grid.SetText2((SPR_Remove - 1), x, "...");
                Grid.SetTextColor((SPR_Remove - 1), x, "#FFFFFF");
            }
        }

        if (GridName == "nwGridPhoneCon") {
            Grid = nwGridPhoneCon_Book.ActiveSheet;
            MaxRow = Grid.GetMaxRow();
            BackColor = $("#nwGridPhoneCon").enable() ? "Cyan" : "Gainsboro";
            BtnBackColor = $("#nwGridPhoneCon").enable() ? "#2689d8" : "Gainsboro";
            for (var x = 0; x <= MaxRow; x++) {
                Grid.SetEnable((SPR_Phone - 1), x, $("#nwGridPhoneCon").enable());
                Grid.SetEnable((SPR_LocalNo - 1), x, $("#nwGridPhoneCon").enable());

                Grid.SetBackground((SPR_Remove_P - 1), x, BtnBackColor);
                Grid.SetText2((SPR_Remove_P - 1), x, "...");
                Grid.SetTextColor((SPR_Remove_P - 1), x, "#FFFFFF");
            }
        }

        if (GridName == "nwGridMobileCon") {
            Grid = nwGridMobileCon_Book.ActiveSheet;
            MaxRow = Grid.GetMaxRow();
            BackColor = $("#nwGridMobileCon").enable() ? "Cyan" : "Gainsboro";
            BtnBackColor = $("#nwGridMobileCon").enable() ? "#2689d8" : "Gainsboro";
            for (var x = 0; x <= MaxRow; x++) {
                Grid.SetEnable((SPR_Mobile - 1), x, $("#nwGridMobileCon").enable());

                Grid.SetBackground((SPR_Remove_M - 1), x, BtnBackColor);
                Grid.SetText2((SPR_Remove_M - 1), x, "...");
                Grid.SetTextColor((SPR_Remove_M - 1), x, "#FFFFFF");
            }
        }

        if (GridName == "nwGridEmailCon") {
            Grid = nwGridEmailCon_Book.ActiveSheet;
            MaxRow = Grid.GetMaxRow();
            BackColor = $("#nwGridEmailCon").enable() ? "Cyan" : "Gainsboro";
            BtnBackColor = $("#nwGridEmailCon").enable() ? "#2689d8" : "Gainsboro";
            for (var x = 0; x <= MaxRow; x++) {
                Grid.SetEnable((SPR_Mobile - 1), x, $("#nwGridEmailCon").enable());

                Grid.SetBackground((SPR_Remove_M - 1), x, BtnBackColor);
                Grid.SetText2((SPR_Remove_M - 1), x, "...");
                Grid.SetTextColor((SPR_Remove_M - 1), x, "#FFFFFF");
            }
        }

        if (GridName == "nwGridFaxCon") {
            Grid = nwGridFaxCon_Book.ActiveSheet;
            MaxRow = Grid.GetMaxRow();
            BackColor = $("#nwGridFaxCon").enable() ? "Cyan" : "Gainsboro";
            BtnBackColor = $("#nwGridFaxCon").enable() ? "#2689d8" : "Gainsboro";
            for (var x = 0; x <= MaxRow; x++) {
                Grid.SetEnable((SPR_Fax - 1), x, $("#nwGridFaxCon").enable());

                Grid.SetBackground((SPR_Remove_F - 1), x, BtnBackColor);
                Grid.SetText2((SPR_Remove_F - 1), x, "...");
                Grid.SetTextColor((SPR_Remove_F - 1), x, "#FFFFFF");
            }
        }
    }, 150);
}

function p8Spread_Click(canvasID, row, col) {
    _canvasID = canvasID;
    _row = row;
    _col = col;
    var Grid;

    if (!($("#" + canvasID).enable())) {
        return false;
    }

    if (canvasID == "nwGridMainCon") {
        Grid = nwGridMainCon_Book.ActiveSheet;

        if (col == (SPR_PhoneNo - 1)) {
            if (Grid.GetText((SPR_LocationCode - 1), _row) == "")
                return false;
            if (nwIsReport != "") {
                if (Grid.GetText((SPR_MultipleContact - 1), _row) == "1")
                    return false;
            }

            row = _row;
            contactdID = Grid.GetText((SPR_ContactID - 1), _row);
            cust_GetPara();
            nwParameter_Add("contactdID", contactdID);
            nwParameter_Add("nwIsReport", nwIsReport);
            setTimeout(function () {
                func_ActionDriven("actGeneratePhoneGrid", false);
            }, 500);

            nwPopupForm_ShowModal('nwPhone');

            return false;
        }

        if (col == (SPR_MobileNo - 1)) {
            if (Grid.GetText((SPR_LocationCode - 1), _row) == "")
                return false;
            if (nwIsReport != "") {
                if (Grid.GetText((SPR_MultipleContact - 1), _row) == "1")
                    return false;
            }

            row = _row;
            contactdID = Grid.GetText((SPR_ContactID - 1), _row);
            cust_GetPara();
            nwParameter_Add("contactdID", contactdID);
            nwParameter_Add("nwIsReport", nwIsReport);
            setTimeout(function () {
                func_ActionDriven("actGenerateMobileGrid", false);
            }, 500);

            nwPopupForm_ShowModal('nwMobile');

            return false;
        }

        if (col == (SPR_Email - 1)) {
            if (Grid.GetText((SPR_LocationCode - 1), _row) == "")
                return false;

            row = _row;

            nwPopupForm_ShowModal('nwEmail');

            contactdID = Grid.GetText((SPR_ContactID - 1), _row);
            cust_GetPara();
            currRow = _row;
            nwParameter_Add("contactdID", contactdID);
            nwParameter_Add("row", row);
            nwParameter_Add("nwIsReport", nwIsReport);
            setTimeout(function () {
                func_ActionDriven("actGenerateEmailGrid", false);
            }, 500);

            return false;
        }

        if (col == (SPR_FaxNo - 1)) {
            if (Grid.GetText((SPR_LocationCode - 1), _row) == "")
                return false;
            cust_GetPara();

            row = _row;

            nwPopupForm_ShowModal('nwFax');

            contactdID = Grid.GetText((SPR_ContactID - 1), _row);
            nwParameter_Add("contactdID", contactdID);
            nwParameter_Add("row", row);
            nwParameter_Add("nwIsReport", nwIsReport);
            setTimeout(function () {
                func_ActionDriven("actGenerateFaxGrid", false);
            }, 500);

            return false;
        }

        if (col == (SPR_Remove - 1)) {
        }
    }

    return true;
}

function p8Spread_DblClick(canvasID, row, col) {
    _canvasID = canvasID;
    _row = row;
    _col = col;
    var Grid;

    if (!($("#" + canvasID).enable())) {
        return false;
    }

    if (canvasID == "nwGridMainCon") {
        Grid = nwGridMainCon_Book.ActiveSheet;
        _GridLU = Grid;

        limitgridfield();

        if (col == (SPR_LocationCode - 1) && Grid.GetBackground((SPR_LocationCode - 1), row).toLowerCase() == "cyan") {
            if ((_row != 0 && isIndividual == 0) || isIndividual == 1 || isIndividual == 2) {
                cust_GetPara();
                lookUpCustomize("lugLocationCode", 1);
            }

        }
        if (col == (SPR_Suffix - 1) && Grid.GetBackground((SPR_Suffix - 1), row).toLowerCase() == "cyan") {
            if ((_row != 0 && isIndividual == 0) || isIndividual == 1 || isIndividual == 2) {
                cust_GetPara();
                lookUpCustomize("lugNameSuffix", 1);
            }

        }
        if (col == (SPR_StatusCode - 1) && Grid.GetBackground((SPR_StatusCode - 1), row).toLowerCase() == "cyan") {
            cust_GetPara();
            lookUpCustomize("lugStatusCode", 1);

        }
    }

    if (canvasID == "nwGridPhoneCon") {
        Grid = nwGridPhoneCon_Book.ActiveSheet;
        setTimeout(function () {
            $('.txtPhone').attr("autocomplete", "off");
            $('.txtPhone').css("text-align", "left");
            $('.txtPhone').attr("maxlength", "50");
            $('.txtLocal').attr("autocomplete", "off");
            $('.txtLocal').css("text-align", "left");
            $('.txtLocal').attr("maxlength", "50");
        }, 150);
    }

    if (canvasID == "nwGridMobileCon") {
        Grid = nwGridMobileCon_Book.ActiveSheet;
        setTimeout(function () {
            $('.txtMobile').attr("autocomplete", "off");
            $('.txtMobile').css("text-align", "left");
            $('.txtMobile').attr("maxlength", "20");
        }, 150);
    }

    if (canvasID == "nwGridEmailCon") {
        Grid = nwGridEmailCon_Book.ActiveSheet;
        setTimeout(function () {
            $('.txtEmail').attr("autocomplete", "off");
            $('.txtEmail').css("text-align", "left");
            $('.txtEmail').attr("maxlength", "100");
        }, 150);
    }

    if (canvasID == "nwGridFaxCon") {
        Grid = nwGridFaxCon_Book.ActiveSheet;
        setTimeout(function () {
            $('.txtFax').attr("autocomplete", "off");
            $('.txtFax').css("text-align", "left");
            $('.txtFax').attr("maxlength", "100");
        }, 150);
    }

    return true;
}

function p8Spread_Change(canvasID, row, col) {
    _canvasID = canvasID;
    _row = row;
    _col = col;
    var Grid;

    if (!($("#" + canvasID).enable())) {
        return false;
    }

    if (canvasID == "nwGridMainCon") {

    }

    return true;
}

function func_nwGrid_DeleteValidation() {
    var isContinue = true;
    if (_canvasID == "nwGridMainCon") {
        if (nwGridMainCon_Book.ActiveSheet.GetMaxRow() == 1) {
            isContinue = false;
        }
    }
    return isContinue;
}

function func_nwGrid_InsertValidation() {
    var isContinue = true;
    return isContinue;
}

function func_nwGrid_DeleteDone() {
    var isContinue = true;
    CreateGridDone(_canvasID);
    return isContinue;
}

function func_nwGrid_InsertDone() {
    var isContinue = true;
    CreateGridDone(_canvasID);
    return isContinue;
}