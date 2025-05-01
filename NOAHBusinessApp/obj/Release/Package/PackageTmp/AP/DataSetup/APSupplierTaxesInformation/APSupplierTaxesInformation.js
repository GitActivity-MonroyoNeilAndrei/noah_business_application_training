var nwSupplierCode = "";
var tradename = "";
var taxtype = "";
var nwIsReport = 0;
var arry = "";
var isView = "";
var nwGridCon_Book;
var nwGridCon_Sheet;

function func_Reload() {

    crLnk = GetCurrentURL() + "APSupplierTaxesInformation_Gateway";
    crLnkGateKey = "APSupplierTaxesInformation";
    crnwTagSingleBind = true;

    nwSupplierCode = getParameterByName('nwSupplierCode');
    nwIsReport = getParameterByName('nwIsReport');
    arry = getParameterByName('arry');
    isView = getParameterByName('isView');

    nwParameter_Add("nwSupplierCode", nwSupplierCode);
    nwParameter_Add("nwIsReport", nwIsReport);
    nwParameter_Add("jsArray", arry);

    $('#txtDateIssued').mask('99/99/9999');
    $('#vat').prop("checked", true);
    $('#txtDateIssued').datepicker();
    $('#txtvat').mask('999-999-999-99999');
    $('#txtnonvat').mask('999-999-999-99999');
    $('#txtTinNo').mask('***-***-***-*****');

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    $('#chkBox').prop('checked', true);

    return isContinue;
    //func_ActionDriven("actCheckReqTinTaxtype", false);
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

        $("#txtpermitno").prop("disabled", false);
        $("#txtdateissued").prop("disabled", false);
        $("#txtissuedby").prop("disabled", false);

        enabledlookup("lugVATtaxcode");
        enabledlookup("lugEWTcode");
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

        $("#txtpermitno").prop("disabled", true);
        $("#txtdateissued").prop("disabled", true);
        $("#txtissuedby").prop("disabled", true);

        enabledlookup("lugVATtaxcode");
        enabledlookup("lugEWTcode");
    }

    else {
        $("#noah-webui-default-New").hide();
        $("#noah-webui-default-Save").hide();
        $('#noah-webui-default-Delete').hide();
        $("#noah-webui-Toolbox-BindingNavigator").show();
        $("#noah-webui-Toolbox-BindingNavigator").enable(true);

        $("#txtTinNo").prop("disabled", true);
        $("#vat").enable(false);
        $("#nonvat").enable(false);
    }
}


////////////////////////// TOol Box
function func_ToolboxADD(indef, enume) {

    var isContinue = true;
    ifnew();
    enabletaxtype();
    validate();
    validate2();
    validate3();
    newclick();
    func_Toolbox_Clear();

    return isContinue;
}

function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", "Vendor Taxes Information", "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", "Vendor Taxes Information", "", indef, enume);
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

    nwParameter_Add("nwSupplierCode", nwSupplierCode);
    nwParameter_Add("nwIsReport", nwIsReport);

    nwParameter_Add("txtIsOptional", $("#txtIsOptional").val());
    nwParameter_Add("idvallugsupplier", $("#idvallugsupplier").val());
    nwParameter_Add("idvallugtaxcode", $("#idvallugtaxcode").val());

    nwParameter_Add("idvallugVATtaxcode", $("#idvallugVATtaxcode").val());

    nwParameter_Add("idvallugEWTcode", $("#idvallugEWTcode").val());

    nwParameter_Add("txtTinNo", $("#txtTinNo").val());

    nwParameter_Add("vat", $("#vat").prop("checked"));
    nwParameter_Add("nonvat", $("#nonvat").prop("checked"));

    nwParameter_Add("jsArray", arry);

}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;

}
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwParameter_Add("txtCode", $("#txtCode").val());

    nwParameter_Add("lugtaxcode", $("#lugtaxcode").val());
    nwParameter_Add("supCode", $("#idvallugsupplier").val());
    nwParameter_Add("vat", $("#vat").val());
    nwParameter_Add("nonvat", $("#nonvat").val());

    nwParameter_Add("lugVATtaxcode", $("#idvallugVATtaxcode").val());

    nwParameter_Add("lugEWTcode", $("#idvallugEWTcode").val());

    EnableFieldsDone();

    nwLoading_Start("xSample", crLoadingHTML);
    func_ActionDriven("actBindCollection", false);

    if ($('#idvallugsupplier').val().length == 0) {
        $('#idvallugsupplier').val(nwSupplierCode)
    }

}

///////////////////////////////////////

var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    if (idName == 'toolboxInquire') {
        if (idName == 'lugtaxcode') {
            nwParameter_Add("Code", $('#idvallug').val());
            func_ActionDriven("gettin", true);
        }
    }

    else if (idName == 'lugVATtaxcode') {
        nwParameter_Add("idvallugVATtaxcode", $('#idvallugVATtaxcode').val());
        nwParameter_Add("idvallugEWTcode", $('#idvallugEWTcode').val());
        func_ActionDriven("actCheckReqTin", true);
    }

    else if (idName == 'lugEWTcode') {
        nwParameter_Add("idvallugVATtaxcode", $('#idvallugVATtaxcode').val());
        nwParameter_Add("idvallugEWTcode", $('#idvallugEWTcode').val());
        func_ActionDriven("actCheckReqTin", true);
    }
}

function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
    return crnwTRtemp;
}

function nwGrdi_Change(nwobj, nwobjrow, nwobjitem) {
    var ss = nwobjitem.find('#selecta').val();
}
function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {
    var ss = nwobjitem.find('#selecta').val();
}

function EnableFields() {

    $('#txtTinNo').prop('disabled', false);
    enabledlookup("lugtaxcode");

    enabledlookup("lugVATtaxcode");
    enabledlookup("lugEWTcode");

    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    disabledlookup("lugsupplier");
    disabledlookup("lugVATtaxcode");
    disabledlookup("lugEWTcode");

    $(".history_switch").prop("disabled", true);
    $('#chkBox').prop('checked', true);
}

function DisableFields() {

    disabledlookup("lugsupplier");
    $("#vat").enable(false);
    $("#nonvat").enable(false);

    $('#txtTinNo').prop('disabled', true);

    disabledlookup("lugtaxcode");
    disabledlookup("lugVATtaxcode");
    disabledlookup("lugEWTcode");

    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);

    $(".history_switch").prop("disabled", true);
    $('#chkBox').prop('checked', true);
}

function EnableFieldsDone() {//Binding Done

    disabledlookup("lugsupplier");
    $("#lugtaxcode").removeClass("adisabled");
    $("#lugVATtaxcode").removeClass("adisabled");
    $("#lugEWTcode").removeClass("adisabled");
    $(".history_switch").prop("disabled", false);
    $('#chkBox').prop('checked', true);
}

function DisableFieldsDone() { // For Refresh
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0') {
        $("#noah-webui-Toolbox").bindingExport().enable(false);
        $("#noah-webui-Toolbox").bindingInquire().enable(false);
    } else {
        $("#noah-webui-Toolbox").bindingExport().enable(true);
        $("#noah-webui-Toolbox").bindingInquire().enable(true);
    }
    $('#chkBox').prop('checked', true);

}

function DisableFieldsEmpty() {
}

function ClearFields() {
    $("#txtTinNo").val('');
    $("#vat").prop('checked', true);
    $("#nonvat").prop('checked', false);
    $("#idvallugtaxcode").val('');
    $("#descvallugtaxcode").val('');
    $("#idvallugVATtaxcode").val('');
    $("#idvallugEWTcode").val('');

    $('#chkBox').prop('checked', true);
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

$(function () {
    $(window).resize(function () {
        var xwidth = $(window).outerWidth() * 0.98;

        $("#nwGridCon").css("max-width", xwidth + "px");


        $("#nwGridCon").css("width", xwidth + "px");
        $("#nwGridCon").parents(".noah-webui-containerRowItem").css("max-width", xwidth + "px");
        nwGrid_TableAdjust("nwGridCon");
    });

    $(window).resize();

});

function AA() {
    var a = 1;
    a = 1 + 1;
    var xTextOrig = 0;
    MessageBox("Cannot find :[" + xTextOrig + "]");
    nwPopupForm_Show("frm_totals");
}


$(document).on("keyup blur", "#txtCode", function (e) {
    var str = $("#txtCode").val();
    var res = str.replace(/'|%/g, "");
    $("#txtCode").val(res);
});

$(document).on("keypress blur", "#txtCode", function (e) {
    if (e.which == 37 || e.which == 39)
        return false;
});




var x = "";
var tax = "";

function disableRadio() {
    $("#vat").enable(false);
    $("#nonvat").enable(false);
}

function enableRadio() {
    $("#vat").enable(true);
    $("#nonvat").enable(true);
}

function getValueTaxCode() {
    var taxtype = $("#taxtype").val();
    if (suppliercode.length > 0) {
        if (taxtype == "withouttin") {
            disableRadio();
        }
        else {
            enableRadio();
        }
    }
    else {
        disableRadio();
    }
}

var x = "";

$(document).on("click", "#vat", function (e) {
    x = "vat";
});

$(document).on("click", "#nonvat", function (e) {
    x = "nonvat";
});

function disableNew() {
    $("#noah-webui-Toolbox").bindingNew().enable(false);
}

function enableNew() {
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $('#txtTinNo').prop('disabled', false);
    enabledlookup("lugtaxcode");

    enabledlookup("lugVATtaxcode");
    enabledlookup("lugEWTcode");

}

function linkaction() {
    $("#noah-webui-Toolbox").bindingInquire().visible(false);
    $("#noah-webui-Toolbox").bindingRefresh().visible(false);
    $("#noah-webui-Toolbox").bindingExport().visible(false);
    $('#idvallugsupplier').val(suppliercode);
    $('#descvallugsupplier').val(tradename);
    $('#taxtype').val(taxtype);

}

function normalfunctionaction() {
    $('#nwGrid1Con').enable(false);
    $("#noah-webui-Toolbox").bindingInquire().visible(true);
    $("#noah-webui-Toolbox").bindingNew().visible(false);
    $("#vat").enable(false);
    $("#nonvat").enable(false);

}

function disablex() {
    $('#vat').enable(false)
    $('#nonvat').enable(false)
    $('#txtTinNo').prop('disabled', true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
}

function enablex() {

    if (nwIsReport == 1) {

    }
    else {
        $('#vat').enable(true)
        $('#nonvat').enable(true)
        $('#txtTinNo').prop('disabled', false);
        $("#noah-webui-Toolbox").bindingSave().enable(true);
    }

}

function disabledlookup(id) {
    $('#idval' + id).addClass("disabledlookupcss");
    $('#descval' + id).addClass("disabledlookupcss");
    $('#idval' + id).prop("disabled", true);
    $('#LookUp' + id).enable(false);
}

function enabledlookup(id) {
    $('#idval' + id).removeClass("disabledlookupcss");
    $('#descval' + id).removeClass("disabledlookupcss");
    $('#idval' + id).prop("disabled", false);
    $('#LookUp' + id).enable(true);
}

// Disable for viewing
function disableAll() {
    $("#vat").enable(false);
    $("#nonvat").enable(false);
    $("#txtTinNo").enable(false);
    $("#lugtaxcode").addClass("adisabled");

    $("#lugVATtaxcode").enable(false);
    $("#lugEWTcode").enable(false);
}

// Disable upon saving
function disableSave() {
    $("#vat").enable(false);
    $("#nonvat").enable(false);
    $("#txtTinNo").prop("disabled", true);
    $("#lugtaxcode").addClass("adisabled");

    $("#lugVATtaxcode").enable(false);
    $("#lugEWTcode").enable(false);

    $('#noah-webui-default-Save').enable(false);
}


$(document).on('click', '.BoxClose', function (e) {
    $('.lookupcolSearch').val("");
});


$(document).keyup(function (e) {
    if (e.key === "Escape") {
        $('.lookupcolSearch').val("");
    }
});




function GetValue() {
    var Tin = $('#txtTinNo').val();
    var LastFive = Tin.substr(Tin.length - 5);
    arry = [LastFive];
    sessionStorage.setItem("jsArray", JSON.stringify(arry));

    nwParameter_Add("jsArray", arry);
}


function DisableUponView() {
    var isDisabled = isView.toLowerCase() == "true" ? true : false;

    if (isDisabled) {

        $('#lugtaxcode').enable(false);
        $('#lugVATtaxcode').enable(false);
        $('#lugEWTcode').enable(false);
        $('#txtTinNo').prop("disabled", true);

        $("#noah-webui-Toolbox").bindingSave().enable(false);
        $("#vat").enable(false);
        $("#nonvat").enable(false);
    }
    else if (nwIsReport != 1) {
        $('#lugtaxcode').enable(true);
        $('#lugVATtaxcode').enable(true);
        $('#lugEWTcode').enable(true);
        $('#txtTinNo').prop("disabled", false);

        $("#noah-webui-Toolbox").bindingSave().enable(true);
        $("#vat").enable(true);
        $("#nonvat").enable(true);
    }
}

function MakeOptionalTInNo(isOptional) {

    $(`#txtIsOptional1`).val(isOptional);
    $(`.lblTinNo`).html(isOptional == "1" ? "Tax Identification No." : "Tax Identification No.<span class='nwRequiredField tinNo'>*</span>");

    //$(`.tinNo`).removeClass(isOptional == "1" ? "nwRequiredField" : "");
    //$(`.tinNo`).addClass(isOptional == "1" ? "nwOptionalField" : "");
}

function MakeOptionalTInNo1(isOptional) {

    $(`#txtIsOptional`).val(isOptional);

    //$(`.lblTinNo`).html("");
    //$(`.lblTinNo`).html(isOptional == "1" ? "Tax Identification No." : "Tax Identification No.<span class='nwRequiredField tinNo'>*</span>");
}

//function ExportToExcel() {
//    try {
//        window.open('Form_StandardsController.cs', '_self', false);
//    } catch (err) {

//        window.open('../../../Form_StandardsController.cs', '_self', false);
//    }

//}

$(document).on('click', '#btnLookup', function () {
    lookUp(this);
});
