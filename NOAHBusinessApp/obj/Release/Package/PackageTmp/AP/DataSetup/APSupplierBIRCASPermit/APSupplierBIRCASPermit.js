var isnewrow = 0;
var nwSupplierCode = "";
var tradename = "";
var nwIsReport = 0;
var isView = "";

function func_Reload() {
    LoadStringsCases();

    crLnk = GetCurrentURL() + "APSupplierBIRCASPermit_Gateway";
    crLnkGateKey = "APSupplierBIRCASPermit";
    crnwTagSingleBind = true;

    DisableFields();
    var isContinue = true;
    init_request();

    nwSupplierCode = getParameterByName('nwSupplierCode');
    nwIsReport = getParameterByName('nwIsReport');
    isView = getParameterByName('isView');
    nwParameter_Add("nwSupplierCode", nwSupplierCode);
    nwParameter_Add("nwIsReport", nwIsReport);

    return isContinue;
}

var basedTitle = "Vendor BIR CAS Permit";

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    isnewrow = 1;
    var isContinue = true;
    ClearFields();
    toolboxnew();
    $('#noah-webui-Toolbox-BindingNavigator').enable(false);
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    nwParameter_Add("isnewrow", isnewrow);

    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", basedTitle, "", indef, enume);
    isContinue = false;
    $('#noah-webui-Toolbox-BindingNavigator').enable(true);

    return isContinue;

}


function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    $('#noah-webui-Toolbox-BindingNavigator').enable(true);
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", basedTitle, "", indef, enume);
    isContinue = false;


    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    isnewrow = 0;
    var isContinue = true;
    cust_GetPara();
    nwSupplierCode = getParameterByName('nwSupplierCode');
    refreshtoolbox();
    onrefreshenablefields();
    isRefreshed = true;
    nwParameter_Add("idvallugsupplier", nwSupplierCode);

    $('#noah-webui-Toolbox-BindingNavigator').enable(true);
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
    $('#noah-webui-Toolbox-BindingNavigator').enable(true);
}

function func_ToolboxExport(indef, enume) {
    var isContinue = true;
    return isContinue;
    $('#noah-webui-Toolbox-BindingNavigator').enable(true);
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

    nwParameter_Add("nwSupplierCode", nwSupplierCode);
    nwParameter_Add("nwIsReport", nwIsReport);

    nwParameter_Add("txtPermitIssued", $('#txtPermitIssued').val());
    nwParameter_Add("PermitNo", $('#txtpermitno').val());
    nwParameter_Add("DateIssued", $('#txtdateissued').val());
    nwParameter_Add("IssuedBy", $('#txtissuedby').val());
}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;

}
function func_ToolboxNavigatorBind_Done() {


    cust_GetPara();
    EnableFieldsDone();
    nwLoading_Start("xSample", crLoadingHTML);
    func_ActionDriven("actBindCollection", true);
    nwParameter_Add("idvallugsupplier", nwSupplierCode);


    if (nwSupplierCode.length > 0) {

    }
    else {
        $('#txtPermitIssued').prop("disabled", true)
        $('#txtpermitno').prop("disabled", true)
        $('#txtdateissued').prop("disabled", true)
        $('#txtissuedby').prop("disabled", true)
    }

}

function func_ToolboxNavigatorBind_Empty() {

    nwLoading_Start("xSample", crLoadingHTML);
    nwParameter_Add("TotalRecords", $('div.BN-record span').text());
    DisableFieldsEmpty();
    func_ActionDriven("actBindCollectionEmpty", false);

}

///////////////////////////////////////

var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {

    if (idName == 'toolboxInquire') {
    }
    if (idName == 'lugsupplier') {
        nwParameter_Add("nwSupplierCode", $('#idvallugsupplier').val());
        nwParameter_Add("tradename", $('#descvallugsupplier').val());
        func_ActionDriven("checkisbranch", true);

    }
}

function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
    return crnwTRtemp;
}

function nwGrdi_Change(nwobj, nwobjrow, nwobjitem) {
}
function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {
}

function EnableFields() {
}

function DisableFields() {
    $('#chkBox').prop('checked', true);
    $('#lugsupplier').enable(false)
    $("#txtPermitIssued").enable(false)
    $("#txtpermitno").enable(false)
    $("#txtdateissued").enable(false)
    $("#txtissuedby").enable(false)
}

function EnableFieldsDone() {//Binding Done

}

function DisableFieldsDone() { // For Refresh
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0') {
        $("#lugCompany").enable(false);
        $("#txtPermitIssued").prop("disabled", true);
        $("#txtpermitno").prop("disabled", true);
        $("#txtdateissued").prop("disabled", true);
        $("#txtissuedby").prop("disabled", true);
        $("#txtFrom").prop("disabled", true);
        $("#txtTo").prop("disabled", true);
        $("#txtSystem").prop("disabled", true);
        $("#txtVersion").prop("disabled", true);
    }
}

function DisableFieldsEmpty() {
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
}

function ClearFields() {
    $('#txtPermitIssued').val('');
    $('#txtpermitno').val('');
    $('#txtdateissued').val('');
    $('#txtissuedby').val('');
}

function toolboxnew() {
    $('#lugsupplier').removeClass("adisabled");

    $('#txtPermitIssued').prop("disabled", false);
    $('#txtpermitno').prop("disabled", false);
    $('#txtdateissued').prop("disabled", false);
    $('#txtissuedby').prop("disabled", false);

    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
}

function savevalidation() {
    var errmessage = '';
    if ($('#idvallugsupplier').val().length == 0) {
        errmessage += "Cannot be Save. Supplier is required.</br>";
    }
    if ($('#txtPermitIssued').val().length == 0) {
        errmessage += "Cannot be saved. Permit Issued is required.</br>";
    }
    if ($('#txtpermitno').val().length == 0) {
        errmessage += "Cannot be saved. Permit Number is required.</br>";
    }
    if ($('#txtpermitno').val().length == 0) {
        errmessage += "Cannot be saved. Permit Number is required.</br>";
    }


    return errmessage;
}

function savetoolbox() {

    if (nwSupplierCode != "" && nwIsReport == 0) {
        $('#lugsupplier').addClass("adisabled");

        $('#txtPermitIssued').prop("disabled", false);
        $('#txtpermitno').prop("disabled", false);
        $('#txtdateissued').prop("disabled", false);
        $('#txtissuedby').prop("disabled", false);


        $("#noah-webui-Toolbox").bindingSave().enable(true);
    } else {
        $('#lugsupplier').addClass("adisabled");

        $('#txtPermitIssued').prop("disabled", true);
        $('#txtpermitno').prop("disabled", true);
        $('#txtdateissued').prop("disabled", true);
        $('#txtissuedby').prop("disabled", true);

        $("#noah-webui-Toolbox").bindingSave().enable(false);
    }

}

function clear() {


}

function refreshtoolbox() {

    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    nwParameter_Add("idvallugsupplier", nwSupplierCode);

}

function onrefreshenablefields() {
    $('#txtPermitIssued').prop("disabled", false);
    $('#txtpermitno').prop("disabled", false);
    $('#txtdateissued').prop("disabled", false);
    $('#txtissuedby').prop("disabled", false);

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
        $('#noah-webui-default-Refresh').hide();
        $("#noah-webui-default-Export").hide();
        $("#noah-webui-default-Export").enable(true);

        $("#txtPermitIssued").prop("disabled", false);
        $("#txtpermitno").prop("disabled", false);
        $("#txtdateissued").prop("disabled", false);
        $("#txtissuedby").prop("disabled", false);
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
        $('#noah-webui-default-Refresh').hide();
        $("#noah-webui-default-Refresh").enable(false);
        $("#noah-webui-default-Export").hide();
        $("#noah-webui-default-Export").enable(false);

        $("#txtPermitIssued").prop("disabled", true);
        $("#txtpermitno").prop("disabled", true);
        $("#txtdateissued").prop("disabled", true);
        $("#txtissuedby").prop("disabled", true);
    }

    else {
        $("#noah-webui-default-New").hide();
        $("#noah-webui-default-Save").hide();
        $('#noah-webui-default-Delete').hide();
        $("#noah-webui-Toolbox-BindingNavigator").show();
        $("#noah-webui-Toolbox-BindingNavigator").enable(true);

        $("#txtPermitIssued").prop("disabled", true);
        $("#txtpermitno").prop("disabled", true);
        $("#txtdateissued").prop("disabled", true);
        $("#txtissuedby").prop("disabled", true);
    }
}


function linkaction() {

    $("#noah-webui-Toolbox").bindingInquire().visible(false);
    $('#idvallugsupplier').val(nwSupplierCode);
    $('#descvallugsupplier').val(tradename);
    nwParameter_Add('idvallugsupplier', $('#idvallugsupplier').val());
    func_ActionDriven("actTradename", true);
}

function normalfunctionaction() {
    $("#noah-webui-Toolbox").bindingNew().visible(false);
    $("#noah-webui-Toolbox").bindingInquire().visible(true);
    $("#noah-webui-Toolbox").bindingSave().visible(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    return false;
}



function enablex() {
    if (nwSupplierCode != "" && nwIsReport == 0) {
        $('#txtPermitIssued').prop("disabled", false)
        $('#txtpermitno').prop("disabled", false)
        $('#txtdateissued').prop("disabled", false)
        $('#txtissuedby').prop("disabled", false)
        $('#noah-webui-default-Save').enable(true)
        $('#noah-webui-default-Delete').enable(true)
    } else {
        $('#txtPermitIssued').prop("disabled", true)
        $('#txtpermitno').prop("disabled", true)
        $('#txtdateissued').prop("disabled", true)
        $('#txtissuedby').prop("disabled", true)
        $('#noah-webui-default-Save').enable(false)
        $('#noah-webui-default-Delete').enable(false)
    }

}



function disablex() {
    $('#txtPermitIssued').prop("disabled", true)
    $('#txtpermitno').prop("disabled", true)
    $('#txtdateissued').prop("disabled", true)
    $('#txtissuedby').prop("disabled", true)
    $('#noah-webui-default-Save').enable(false)
    $('#noah-webui-default-Delete').enable(false)
}


$(document).on('click', '.BoxClose', function (e) {
    $('.lookupcolSearch').val("");
});


$(document).keyup(function (e) {
    if (e.key === "Escape") {
        $('.lookupcolSearch').val("");
    }
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

$(document).on("change blur", "#txtdateissued", function (e) {
    var serverdate = getCurrentDate();
    var dateToday = new Date(serverdate);

    var dateIssued = $('#txtdateissued').val();
    var dateIssue = new Date(dateIssued);

    if (dateIssue > dateToday) {
        MessageBox("Cannot continue. Effective Date must be earlier or the same as the current server date.", basedTitle, "error");
        $('#txtdateissued').val('');
    }
});

$(document).on("keyup", "txtdateissued", function (e) {
    var serverdate = getCurrentDate();
    var dateToday = new Date(serverdate);

    var dateIssued = $('#txtdateissued').val();
    var dateIssue = new Date(dateIssued);

    if (dateIssue > dateToday) {
        MessageBox("Cannot continue. Effective Date must be earlier or the same as the current server date.", basedTitle, "error");
        $('#txtdateissued').val('');
    }
});

function DisableUponView() {
    var isDisabled = isView.toLowerCase() == "true" ? true : false;

    if (isDisabled) {

        $('#txtPermitIssued').prop("disabled", true);
        $('#txtissuedby').prop("disabled", true);
        $('#txtdateissued').prop("disabled", true);
        $('#txtpermitno').prop("disabled", true);

        $("#noah-webui-Toolbox").bindingSave().enable(false);

    }
}

function ExportToExcel() {
    try {
        window.open('ExporttoExcel.aspx', '_self', false);
    } catch (err) {

        window.open('../../../ExportToExcel.aspx', '_self', false);
    }

}

$(document).on('click', '#btnLookup', function () {
    lookUp(this);
});
