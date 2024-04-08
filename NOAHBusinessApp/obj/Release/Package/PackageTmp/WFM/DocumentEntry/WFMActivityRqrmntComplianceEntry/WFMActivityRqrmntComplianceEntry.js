

baseTitle = "Activity Type Details Entry";

var filter = "";
var currentServerDate = "";
var nwDocno = "";
var isGridClick = false;
var isLevel1 = '';

function func_Reload() {
    nwTrustedLinks.push("fli.promptus8.com");//Kahit saan by CHOLO
    crLnk = GetCurrentURL() + "WFMActivityRqrmntComplianceEntry_Gateway";
    crLnkGateKey = "WFMActivityRqrmntComplianceEntry";

    nwDocno = getParameterByName("nwDocno");
    var isContinue = true;
    DisableFields();
    ToolBoxGetData = false;
    init_request();
    return isContinue;
}

////////////////////////// TOol Box
function mainLoad() {
    nwParameter_Add("nwDocno", nwDocno);
    if (nwDocno != '') {
        $('#noah-webui-default-Refresh').click();
        $("#noah-webui-Toolbox").visible(false);
    }
}

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    func_Toolbox_Clear();
    isGridClick = true;
    $("#noah-webui-Toolbox-BindingNavigator").enable(false);
    $("#idvallugTranType").focus();
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Would you like to save the current record?", baseTitle, "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Would you like to delete the current record?", baseTitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    isGridClick = true;
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
    cust_GetPara();


    parent_MessageBoxQuestionToolBox("Would you like to process the current record?", baseTitle, "", indef, enume);
    isContinue = false;

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
    nwParameter_Add("txtDocno", $('#txtDocno').val());
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("idvallugTranType", $('#idvallugTranType').val());
    nwParameter_Add("idvallugLocForm", $('#idvallugLocForm').val());
    nwParameter_Add("idvallugProfitCenter", $('#idvallugProfitCenter').val());
    nwParameter_Add("idvallugCostCenter", $('#idvallugCostCenter').val());
    nwParameter_Add("idvallugCurrency", $('#idvallugCurrency').val());
    nwParameter_Add("txtAmount", $('#txtAmount').val());
    nwParameter_Add("idvallugRefTranNo", $('#idvallugRefTranNo').val());
    nwParameter_Add("txtDocStatusCode", $('#txtDocStatusCode').val());
    nwParameter_Add("txtRemarks", $('#txtRemarks').val());
    nwParameter_Add("lblField1", $("#lblField1").text());
    nwParameter_Add("lblField2", $("#lblField2").text());
    nwParameter_Add("lblField3", $("#lblField3").text());
    nwParameter_Add("lblField4", $("#lblField4").text());
    nwParameter_Add("lblField5", $("#lblField5").text());
    nwParameter_Add("lblField6", $("#lblField6").text());
    nwParameter_Add("lblField7", $("#lblField7").text());
    nwParameter_Add("lblField8", $("#lblField8").text());
    nwParameter_Add("lblField9", $("#lblField9").text());
    nwParameter_Add("lblField10", $("#lblField10").text());
    nwParameter_Add("lblField11", $("#lblField11").text());
    nwParameter_Add("lblField12", $("#lblField12").text());
    nwParameter_Add("lblField13", $("#lblField13").text());
    nwParameter_Add("lblField14", $("#lblField14").text());
    nwParameter_Add("lblField15", $("#lblField15").text());
    nwParameter_Add("lblField16", $("#lblField16").text());
    nwParameter_Add("lblField17", $("#lblField17").text());
    nwParameter_Add("lblField18", $("#lblField18").text());
    nwParameter_Add("lblField19", $("#lblField19").text());
    nwParameter_Add("lblField20", $("#lblField20").text());
    nwParameter_Add("txtRefDocno", $("#txtRefDocno").text());
    nwParameter_Add("txtmaxTag", $("#txtmaxTag").text());
    nwParameter_Add("txtCC", $("#txtCC").text());
    nwParameter_Add("txtPC", $("#txtPC").text());
    nwParameter_Add("txtAmount", $("#txtAmount").text());
    //nwParameter_Add("txtRefno", $("#txtRefno").text());
    nwParameter_Add("txtVendor", $("#txtVendor").text());
    detReqFields();
    GetParamsName();
    nwParameter_Add("Percentage", $('[name=6]').val());
    nwParameter_Add("ReferenceNo", $('[name=8]').val());
}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwLoading_Start("actbindcollection", crLoadingHTML);
    RefreshData();
    $('#lugEmployee').addClass('adisabled');
    $("#noah-webui-Toolbox-BindingNavigator").enable(true);
    func_ActionDriven("actBindCollection", true);
}


function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("actBindCollectionEmpty", crLoadingHTML);
    DisableFieldsEmpty();
    func_ActionDriven("actBindCollectionEmpty", false);
}

function DisableFieldsEmpty() {
    DisableFields();

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
}
function main_load() {
    $("#noah-webui-Toolbox").bindingRefresh().click();
    $('#txtDocno').val(nwDocno);
    $('#noah-webui-Toolbox').visible(false);
}

///////////////////////////////////////

var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {

    if (idName == 'toolboxInquire') {
        cust_GetPara();
    }
    else if (idName == "lugTranType") {
        nwLoading_Start("xlugTranType", crLoadingHTML);
        cust_GetPara();
        func_ActionDriven("actDynamicField", false);
    }
    else if (idName == "lugField1") {
        nwLoading_Start("xLoadDynDtls", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("fieldCode", getLookupData(idNum, 0));
        nwParameter_Add("fieldTag", 1);

        if ($("#idvallugField1").attr("name") == "4") {
            $("#txtRefDocno").val(getLookupData(idNum, 0));
            nwParameter_Add("txtRefDocno", $("#txtRefDocno").val());
            nwParameter_Add("wftag", $("#idvallugField1").attr("name"));
        }
        if ($("#idvallugField1").attr("name") == "1") {
            $("#txtPC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField1").attr("name") == "2") {
            $("#txtCC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField1").attr("name") == "5") {
            $("#txtVendor").val(getLookupData(idNum, 0));
        }

        func_ActionDriven("actLoadField", false);
    }
    else if (idName == "lugField2") {
        nwLoading_Start("xLoadDynDtls", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("fieldCode", getLookupData(idNum, 0));
        nwParameter_Add("fieldTag", 2);
        if ($("#idvallugField2").attr("name") == "4") {
            $("#txtRefDocno").val(getLookupData(idNum, 0));
            nwParameter_Add("txtRefDocno", $("#txtRefDocno").val());
            nwParameter_Add("wftag", $("#idvallugField2").attr("name"));
        }
        if ($("#idvallugField2").attr("name") == "1") {
            $("#txtPC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField2").attr("name") == "2") {
            $("#txtCC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField2").attr("name") == "5") {
            $("#txtVendor").val(getLookupData(idNum, 0));
        }
        func_ActionDriven("actLoadField", false);
    }
    else if (idName == "lugField3") {
        nwLoading_Start("xLoadDynDtls", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("fieldCode", getLookupData(idNum, 0));
        nwParameter_Add("fieldTag", 3);
        if ($("#idvallugField3").attr("name") == "4") {
            $("#txtRefDocno").val(getLookupData(idNum, 0));
            nwParameter_Add("txtRefDocno", $("#txtRefDocno").val());
            nwParameter_Add("wftag", $("#idvallugField3").attr("name"));
        }
        if ($("#idvallugField3").attr("name") == "1") {
            $("#txtPC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField3").attr("name") == "2") {
            $("#txtCC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField3").attr("name") == "5") {
            $("#txtVendor").val(getLookupData(idNum, 0));
        }
        func_ActionDriven("actLoadField", false);
    }
    else if (idName == "lugField4") {
        nwLoading_Start("xLoadDynDtls", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("fieldCode", getLookupData(idNum, 0));
        nwParameter_Add("fieldTag", 4);
        if ($("#idvallugField4").attr("name") == "4") {
            $("#txtRefDocno").val(getLookupData(idNum, 0));
            nwParameter_Add("txtRefDocno", $("#txtRefDocno").val());
            nwParameter_Add("wftag", $("#idvallugField4").attr("name"));
        }
        if ($("#idvallugField4").attr("name") == "1") {
            $("#txtPC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField4").attr("name") == "2") {
            $("#txtCC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField4").attr("name") == "5") {
            $("#txtVendor").val(getLookupData(idNum, 0));
        }
        func_ActionDriven("actLoadField", false);
    }
    else if (idName == "lugField5") {
        nwLoading_Start("xLoadDynDtls", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("fieldCode", getLookupData(idNum, 0));
        nwParameter_Add("fieldTag", 5);
        if ($("#idvallugField5").attr("name") == "4") {
            $("#txtRefDocno").val(getLookupData(idNum, 0));
            nwParameter_Add("txtRefDocno", $("#txtRefDocno").val());
            nwParameter_Add("wftag", $("#idvallugField5").attr("name"));
        }
        if ($("#idvallugField5").attr("name") == "1") {
            $("#txtPC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField5").attr("name") == "2") {
            $("#txtCC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField5").attr("name") == "5") {
            $("#txtVendor").val(getLookupData(idNum, 0));
        }
        func_ActionDriven("actLoadField", false);
    }
    else if (idName == "lugField6") {
        nwLoading_Start("xLoadDynDtls", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("fieldCode", getLookupData(idNum, 0));
        nwParameter_Add("fieldTag", 6);
        if ($("#idvallugField6").attr("name") == "4") {
            $("#txtRefDocno").val(getLookupData(idNum, 0));
            nwParameter_Add("txtRefDocno", $("#txtRefDocno").val());
            nwParameter_Add("wftag", $("#idvallugField6").attr("name"));
        }
        if ($("#idvallugField6").attr("name") == "1") {
            $("#txtPC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField6").attr("name") == "2") {
            $("#txtCC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField6").attr("name") == "5") {
            $("#txtVendor").val(getLookupData(idNum, 0));
        }
        func_ActionDriven("actLoadField", false);
    }
    else if (idName == "lugField7") {
        nwLoading_Start("xLoadDynDtls", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("fieldCode", getLookupData(idNum, 0));
        nwParameter_Add("fieldTag", 7);
        if ($("#idvallugField7").attr("name") == "4") {
            $("#txtRefDocno").val(getLookupData(idNum, 0));
            nwParameter_Add("txtRefDocno", $("#txtRefDocno").val());
            nwParameter_Add("wftag", $("#idvallugField7").attr("name"));
        }
        if ($("#idvallugField7").attr("name") == "1") {
            $("#txtPC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField7").attr("name") == "2") {
            $("#txtCC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField7").attr("name") == "5") {
            $("#txtVendor").val(getLookupData(idNum, 0));
        }
        func_ActionDriven("actLoadField", false);
    }
    else if (idName == "lugField8") {
        nwLoading_Start("xLoadDynDtls", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("fieldCode", getLookupData(idNum, 0));
        nwParameter_Add("fieldTag", 8);
        if ($("#idvallugField8").attr("name") == "4") {
            $("#txtRefDocno").val(getLookupData(idNum, 0));
            nwParameter_Add("txtRefDocno", $("#txtRefDocno").val());
            nwParameter_Add("wftag", $("#idvallugField8").attr("name"));
        }
        if ($("#idvallugField8").attr("name") == "1") {
            $("#txtPC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField8").attr("name") == "2") {
            $("#txtCC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField8").attr("name") == "5") {
            $("#txtVendor").val(getLookupData(idNum, 0));
        }
        //if ($("#idvallugField8").attr("name") == "8") {
        //    $("#rdbCol8").prop('checked', true);
        //}
        //if ($("#idvallugField8").attr("name") == "9") {
        //    $("#rdbCol9").prop('checked', true);
        //}

        
        func_ActionDriven("actLoadField", false);
    }
    else if (idName == "lugField9") {
        nwLoading_Start("xLoadDynDtls", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("fieldCode", getLookupData(idNum, 0));
        nwParameter_Add("fieldTag", 9);
        if ($("#idvallugField9").attr("name") == "4") {
            $("#txtRefDocno").val(getLookupData(idNum, 0));
            nwParameter_Add("txtRefDocno", $("#txtRefDocno").val());
            nwParameter_Add("wftag", $("#idvallugField9").attr("name"));
        }
        if ($("#idvallugField9").attr("name") == "1") {
            $("#txtPC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField9").attr("name") == "2") {
            $("#txtCC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField9").attr("name") == "5") {
            $("#txtVendor").val(getLookupData(idNum, 0));
        }
        func_ActionDriven("actLoadField", false);
    }
    else if (idName == "lugField10") {
        nwLoading_Start("xLoadDynDtls", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("fieldCode", getLookupData(idNum, 0));
        nwParameter_Add("fieldTag", 10);
        if ($("#idvallugField10").attr("name") == "4") {
            $("#txtRefDocno").val(getLookupData(idNum, 0));
            nwParameter_Add("txtRefDocno", $("#txtRefDocno").val());
            nwParameter_Add("wftag", $("#idvallugField10").attr("name"));
        }
        if ($("#idvallugField10").attr("name") == "1") {
            $("#txtPC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField10").attr("name") == "2") {
            $("#txtCC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField10").attr("name") == "5") {
            $("#txtVendor").val(getLookupData(idNum, 0));
        }
        func_ActionDriven("actLoadField", false);
    }
    else if (idName == "lugField11") {
        nwLoading_Start("xLoadDynDtls", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("fieldCode", getLookupData(idNum, 0));
        nwParameter_Add("fieldTag", 11);
        if ($("#idvallugField11").attr("name") == "4") {
            $("#txtRefDocno").val(getLookupData(idNum, 0));
            nwParameter_Add("txtRefDocno", $("#txtRefDocno").val());
            nwParameter_Add("wftag", $("#idvallugField11").attr("name"));
        }
        if ($("#idvallugField11").attr("name") == "1") {
            $("#txtPC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField11").attr("name") == "2") {
            $("#txtCC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField11").attr("name") == "5") {
            $("#txtVendor").val(getLookupData(idNum, 0));
        }
        func_ActionDriven("actLoadField", false);
    }
    else if (idName == "lugField12") {
        nwLoading_Start("xLoadDynDtls", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("fieldCode", getLookupData(idNum, 0));
        nwParameter_Add("fieldTag", 12);
        if ($("#idvallugField12").attr("name") == "4") {
            $("#txtRefDocno").val(getLookupData(idNum, 0));
            nwParameter_Add("txtRefDocno", $("#txtRefDocno").val());
            nwParameter_Add("wftag", $("#idvallugField12").attr("name"));
        }
        if ($("#idvallugField12").attr("name") == "1") {
            $("#txtPC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField12").attr("name") == "2") {
            $("#txtCC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField12").attr("name") == "5") {
            $("#txtVendor").val(getLookupData(idNum, 0));
        }
        func_ActionDriven("actLoadField", false);
    }
    else if (idName == "lugField13") {
        nwLoading_Start("xLoadDynDtls", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("fieldCode", getLookupData(idNum, 0));
        nwParameter_Add("fieldTag", 13);
        if ($("#idvallugField13").attr("name") == "4") {
            $("#txtRefDocno").val(getLookupData(idNum, 0));
            nwParameter_Add("txtRefDocno", $("#txtRefDocno").val());
            nwParameter_Add("wftag", $("#idvallugField13").attr("name"));
        }
        if ($("#idvallugField13").attr("name") == "1") {
            $("#txtPC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField13").attr("name") == "2") {
            $("#txtCC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField13").attr("name") == "5") {
            $("#txtVendor").val(getLookupData(idNum, 0));
        }
        func_ActionDriven("actLoadField", false);
    }
    else if (idName == "lugField14") {
        nwLoading_Start("xLoadDynDtls", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("fieldCode", getLookupData(idNum, 0));
        nwParameter_Add("fieldTag", 14);
        if ($("#idvallugField14").attr("name") == "4") {
            $("#txtRefDocno").val(getLookupData(idNum, 0));
            nwParameter_Add("txtRefDocno", $("#txtRefDocno").val());
            nwParameter_Add("wftag", $("#idvallugField14").attr("name"));
        }
        if ($("#idvallugField14").attr("name") == "1") {
            $("#txtPC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField14").attr("name") == "2") {
            $("#txtCC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField14").attr("name") == "5") {
            $("#txtVendor").val(getLookupData(idNum, 0));
        }
        func_ActionDriven("actLoadField", false);
    }
    else if (idName == "lugField15") {
        nwLoading_Start("xLoadDynDtls", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("fieldCode", getLookupData(idNum, 0));
        nwParameter_Add("fieldTag", 15);
        if ($("#idvallugField15").attr("name") == "4") {
            $("#txtRefDocno").val(getLookupData(idNum, 0));
            nwParameter_Add("txtRefDocno", $("#txtRefDocno").val());
            nwParameter_Add("wftag", $("#idvallugField15").attr("name"));
        }
        if ($("#idvallugField15").attr("name") == "1") {
            $("#txtPC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField15").attr("name") == "2") {
            $("#txtCC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField15").attr("name") == "5") {
            $("#txtVendor").val(getLookupData(idNum, 0));
        }
        func_ActionDriven("actLoadField", false);
    }
    else if (idName == "lugField16") {
        nwLoading_Start("xLoadDynDtls", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("fieldCode", getLookupData(idNum, 0));
        nwParameter_Add("fieldTag", 16);
        if ($("#idvallugField16").attr("name") == "4") {
            $("#txtRefDocno").val(getLookupData(idNum, 0));
            nwParameter_Add("txtRefDocno", $("#txtRefDocno").val());
            nwParameter_Add("wftag", $("#idvallugField16").attr("name"));
        }
        if ($("#idvallugField16").attr("name") == "1") {
            $("#txtPC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField16").attr("name") == "2") {
            $("#txtCC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField16").attr("name") == "5") {
            $("#txtVendor").val(getLookupData(idNum, 0));
        }
        func_ActionDriven("actLoadField", false);
    }
    else if (idName == "lugField17") {
        nwLoading_Start("xLoadDynDtls", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("fieldCode", getLookupData(idNum, 0));
        nwParameter_Add("fieldTag", 17);
        if ($("#idvallugField17").attr("name") == "4") {
            $("#txtRefDocno").val(getLookupData(idNum, 0));
            nwParameter_Add("txtRefDocno", $("#txtRefDocno").val());
            nwParameter_Add("wftag", $("#idvallugField17").attr("name"));
        }
        if ($("#idvallugField17").attr("name") == "1") {
            $("#txtPC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField17").attr("name") == "2") {
            $("#txtCC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField17").attr("name") == "5") {
            $("#txtVendor").val(getLookupData(idNum, 0));
        }
        func_ActionDriven("actLoadField", false);
    }
    else if (idName == "lugField18") {
        nwLoading_Start("xLoadDynDtls", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("fieldCode", getLookupData(idNum, 0));
        nwParameter_Add("fieldTag", 18);
        if ($("#idvallugField18").attr("name") == "4") {
            $("#txtRefDocno").val(getLookupData(idNum, 0));
            nwParameter_Add("txtRefDocno", $("#txtRefDocno").val());
            nwParameter_Add("wftag", $("#idvallugField18").attr("name"));
        }
        if ($("#idvallugField18").attr("name") == "1") {
            $("#txtPC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField18").attr("name") == "2") {
            $("#txtCC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField18").attr("name") == "5") {
            $("#txtVendor").val(getLookupData(idNum, 0));
        }
        func_ActionDriven("actLoadField", false);
    }
    else if (idName == "lugField19") {
        nwLoading_Start("xLoadDynDtls", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("fieldCode", getLookupData(idNum, 0));
        nwParameter_Add("fieldTag", 19);
        if ($("#idvallugField19").attr("name") == "4") {
            $("#txtRefDocno").val(getLookupData(idNum, 0));
            nwParameter_Add("txtRefDocno", $("#txtRefDocno").val());
            nwParameter_Add("wftag", $("#idvallugField19").attr("name"));
        }
        if ($("#idvallugField19").attr("name") == "1") {
            $("#txtPC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField19").attr("name") == "2") {
            $("#txtCC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField19").attr("name") == "5") {
            $("#txtVendor").val(getLookupData(idNum, 0));
        }
        func_ActionDriven("actLoadField", false);
    }
    else if (idName == "lugField20") {
        nwLoading_Start("xLoadDynDtls", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("fieldCode", getLookupData(idNum, 0));
        nwParameter_Add("fieldTag", 20);
        if ($("#idvallugField20").attr("name") == "4") {
            $("#txtRefDocno").val(getLookupData(idNum, 0));
            nwParameter_Add("txtRefDocno", $("#txtRefDocno").val());
            nwParameter_Add("wftag", $("#idvallugField20").attr("name"));
        }
        if ($("#idvallugField20").attr("name") == "1") {
            $("#txtPC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField20").attr("name") == "2") {
            $("#txtCC").val(getLookupData(idNum, 0));
        }
        if ($("#idvallugField20").attr("name") == "5") {
            $("#txtVendor").val(getLookupData(idNum, 0));
        }
        func_ActionDriven("actLoadField", false);
    }
}


function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
    var code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text()
    var desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text()

    crnwTRtemp.find('td:eq(' + SPR_LOOKUPCODE + ') ').text(code)
    crnwTRtemp.find('td:eq(' + SPR_LOOKUPDESC + ') ').text(desc)

    return crnwTRtemp;
}

function EnableFields() {
    $('#lugTranType').enable(true);
    $('#lugLocForm').enable(true);
    $('#lugProfitCenter').enable(true);
    $('#lugCostCenter').enable(true);
    $('#lugCurrency').enable(true);
    $('#txtAmount').enable(true);
    $('#txtRefno').enable(true);
    $('#lugRefTranNo').enable(true);
    $('#txtRemarks').enable(true);
}

function DisableFields() {
    $('#lugTranType').enable(false);
    $('#lugLocForm').enable(false);
    $('#lugProfitCenter').enable(false);
    $('#lugCostCenter').enable(false);
    $('#lugCurrency').enable(false);
    $('#txtAmount').enable(false);
    $('#txtRefno').enable(false);
    $('#lugRefTranNo').enable(false);

    $('#btnReviewAttach').enable(false);
    $('#btnReqComp').enable(false);

    $('#txtRemarks').enable(false);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
}

function ClearFields() {
    $('#idvallugTranType').val('');
    $('#descvallugTranType').val('');
    $('#idvallugLocForm').val('');
    $('#descvallugLocForm').val('');
    $('#txtRefDocno').val('');
    $('#txtCC').val('');
    $('#txtPC').val('');
    $('#txtAmount').val('');
    $('#txtRefno').val('');
    $('#txtDocno').val('');
    $('#txtRemarks').val('');
    $('#txtDateSubmitted').val('');
    $('#txtDatePosted').val('');
    $('#txtDocStatus').val('');
    $('#idvallugRsnForDisAproval').val('');
    $('#descvallugRsnForDisAproval').val('');
    $('#txtDisapprvRemarks').val('');
    $(".dynaField").remove();
}






function getGridData(idnum, index) {
    var data = $(`#menuCreatorContainer .tablecontainter table tr:eq(${idnum
    })`).find(`td:eq(${index
    })`).text();
    return data;
}

/* ###STNDRD FUNC */
function func_LookUpInitialize(id) {
    if (id == "lugField1" || id == "lugField2" || id == "lugField3" || id == "lugField4" || id == "lugField5" || id == "lugField6" || id == "lugField7" || id == "lugField8" || id == "lugField9" || id == "lugField10") {
        cust_GetPara();
        GetParams();
    }
    return true;
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

function nwgrid_PaginationNavDone(gridID) {
    //nwGrid_MergeCell('nwGrid1',6,7, "") /* merge cell */
}

function nwGrdi_DblClick(nwGridObj, crTR, crTD) {
    if (nwGridObj.attr("id") == "nwGrid") {
        if (crnwTD.index() == SPR_LOOKUPCODE) {
            lookUpCustomize("lugCodeDesc", 2);
        }
    }
}

function nwGrid_Click(nwGridObj, crTR, crTD) {
    if (nwGridObj.attr("id") == "") {
        if (crnwTD.index() == "") {
            nwParameter_Add("", "");
            lookUpCustomize("", 1);
        }
    }
}

function nwGrdi_Change(nwGridObj, crTR, crTD) {
    if (nwGridObj.attr("id") == "") {
        if (crnwTD.index() == "") {

        }
    }
}

function func_nwGrid_CellChange(pvnwTR, pvnwTD) {
    /*pvnwTR = previous TR after change*/
    /*pvnwTD = previous TD after change*/


}

function func_nwGrid_RowChange(pvnwTR, pvnwTD) {
    /*pvnwTR = previous TR after change*/
    /*pvnwTD = previous TD after change*/

}

function func_nwGrid_Created(nwgridID) {
    //Sample Only
}

function func_nwGrid_InsertValidation() {
    var isContinue = true;
    return isContinue;
}

function func_nwGrid_InsertDone() {
    //exec code
}

function func_nwGrid_DeleteValidation() {
    var isContinue = true;
    return isContinue;
}

function func_nwGrid_DeleteDone() {
    //exec code
}

function func_nwGrid_CopyRowValidation() {
    var isContinue = true;
    return isContinue;
}

function func_nwGrid_CopyRowDone() {
    //exec code
}


// Custom Function

function RefreshData() {
    cust_GetPara();
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}

function EnableFieldsDone() {//Binding Done
    $('#lugTranType').enable(false);
    $('#lugLocForm').enable(false);


    //$('#btnReviewAttach').enable(true);
    $('#btnReqComp').enable(true);
    $('#txtRemarks').enable(true);

    $('#lugProfitCenter').enable(true);
    $('#lugCostCenter').enable(true);
    $('#lugCurrency').enable(true);
    $('#txtAmount').enable(true);
    $('#txtRefno').enable(true);
    $('#txtRemarks').enable(true);
    $('#lugRefTranNo').enable(true);

    if (nwDocno != "") {
        $("#lugField1").enable(false);
        $("#lugField2").enable(false);
        $("#lugField3").enable(false);
        $("#lugField4").enable(false);
        $("#lugField5").enable(false);
        $("#lugField6").enable(false);
        $("#lugField7").enable(false);
        $("#lugField8").enable(false);
        $("#lugField9").enable(false);
        $("#lugField10").enable(false);
        $("#lugField11").enable(false);
        $("#lugField12").enable(false);
        $("#lugField13").enable(false);
        $("#lugField14").enable(false);
        $("#lugField15").enable(false);
        $("#lugField16").enable(false);
        $("#lugField17").enable(false);
        $("#lugField18").enable(false);
        $("#lugField19").enable(false);
        $("#lugField20").enable(false);
        $("#txtField1").enable(false);
        $("#txtField2").enable(false);
        $("#txtField3").enable(false);
        $("#txtField4").enable(false);
        $("#txtField5").enable(false);
        $("#txtField6").enable(false);
        $("#txtField7").enable(false);
        $("#txtField8").enable(false);
        $("#txtField9").enable(false);
        $("#txtField10").enable(false);
        $("#txtField11").enable(false);
        $("#txtField12").enable(false);
        $("#txtField13").enable(false);
        $("#txtField14").enable(false);
        $("#txtField15").enable(false);
        $("#txtField16").enable(false);
        $("#txtField17").enable(false);
        $("#txtField18").enable(false);
        $("#txtField19").enable(false);
        $("#txtField20").enable(false);
        $("#txtRemarks").enable(false);
    }

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

function func_WindowCloseTrigger(verID) {
    var isContinue = true;

    if (verID == "nwPopUpRequireCompliance") {
        nwLoading_Start('actChkDocno', crLoadingHTML);
        let txtDocno = $("#txtDocno").val();
        nwParameter_Add("txtDocno", txtDocno);
        func_ActionDriven("actChkDocno", true);
    }
    return isContinue;
}

function msgBoxContainerQuestionF(msgBoxContainerQuestion, msgBoxContainerAnsweR) {
    if (msgBoxContainerQuestion == "removeAttach") {

    } else if (msgBoxContainerQuestion == "btnBatchProcess") {

    }
}




$(document).on('click', '#btnReqComp', function () {
    var trantype = $('#idvallugTranType').val();
    var docno = $("#txtDocno").val();
    let isView = nwDocno != "" ? true : false;
    let applyTo = "";
    var fullength = GetCurrentURL() + `../DCRequirementCompliance?TransactionNo=${encodeURI(docno)}&TranType=${encodeURI(trantype)}&isView=${encodeURI(isView)}`;
    nwLoading_Start('xbtnReqComp', crLoadingHTML);
    nwPopupForm_Create("nwPopUpRequireCompliance", true, fullength);
    $('#nwPopUpRequireCompliance .BoxTitle').text("Requirements Compliance");
    $("#nwPopUpRequireCompliance").css({ "min-width": "98%" });
    $("#nwPopUpRequireCompliance").css({ "min-height": "90%" });
    nwPopupForm_ShowModal("nwPopUpRequireCompliance");
    nwLoading_End('xbtnReqComp');
});

$(document).on('click', '#btnReviewAttach', function () {
    var trantype = $('#idvallugTranType').val();
    var docno = $("#txtRefDocno").val();
    let isView = nwDocno != "" ? true : false;
    title = "Review Attachment(s) Window";

    let fullength = GetCurrentURL() + "../DCViewAttachment?nwDocno=" + encodeURI(docno) + "&isView=" + isView + "";
    nwLoading_Start('xbtnReviewAttach', crLoadingHTML);
    nwPopupForm_Create("nwPopUpReviewAttachment", true, fullength);
    $('#nwPopUpReviewAttachment .BoxTitle').text(title);
    $("#nwPopUpReviewAttachment").css({ "min-width": "98%" });
    $("#nwPopUpReviewAttachment").css({ "min-height": "90%" });
    nwPopupForm_ShowModal("nwPopUpReviewAttachment");
    nwLoading_End('xbtnReviewAttach');
});


function isView() {
    $('#lugTranType').enable(false);
    $('#lugLocForm').enable(false);
    $('#txtRemarks').enable(false);
    $('#lugProfitCenter').enable(false);
    $('#lugCostCenter').enable(false);
    $('#lugCurrency').enable(false);
    $('#txtAmount').enable(false);
    $('#txtRefno').enable(false);
    $('#lugRefTranNo').enable(false);
}

function detReqFields() {
    if ($("#field1").find(".nwRequiredField").length > 0)
        nwParameter_Add("field1", "1");
    else
        nwParameter_Add("field1", "0");
    if ($("#field2").find(".nwRequiredField").length > 0)
        nwParameter_Add("field2", "1");
    else
        nwParameter_Add("field2", "0");
    if ($("#field3").find(".nwRequiredField").length > 0)
        nwParameter_Add("field3", "1");
    else
        nwParameter_Add("field3", "0");
    if ($("#field4").find(".nwRequiredField").length > 0)
        nwParameter_Add("field4", "1");
    else
        nwParameter_Add("field4", "0");
    if ($("#field5").find(".nwRequiredField").length > 0)
        nwParameter_Add("field5", "1");
    else
        nwParameter_Add("field5", "0");
    if ($("#field6").find(".nwRequiredField").length > 0)
        nwParameter_Add("field6", "1");
    else
        nwParameter_Add("field6", "0");
    if ($("#field7").find(".nwRequiredField").length > 0)
        nwParameter_Add("field7", "1");
    else
        nwParameter_Add("field7", "0");
    if ($("#field8").find(".nwRequiredField").length > 0)
        nwParameter_Add("field8", "1");
    else
        nwParameter_Add("field8", "0");
    if ($("#field9").find(".nwRequiredField").length > 0)
        nwParameter_Add("field9", "1");
    else
        nwParameter_Add("field9", "0");
    if ($("#field10").find(".nwRequiredField").length > 0)
        nwParameter_Add("field10", "1");
    else
        nwParameter_Add("field10", "0");
    if ($("#field11").find(".nwRequiredField").length > 0)
        nwParameter_Add("field11", "1");
    else
        nwParameter_Add("field11", "0");
    if ($("#field12").find(".nwRequiredField").length > 0)
        nwParameter_Add("field12", "1");
    else
        nwParameter_Add("field12", "0");
    if ($("#field13").find(".nwRequiredField").length > 0)
        nwParameter_Add("field13", "1");
    else
        nwParameter_Add("field13", "0");
    if ($("#field14").find(".nwRequiredField").length > 0)
        nwParameter_Add("field14", "1");
    else
        nwParameter_Add("field14", "0");
    if ($("#field15").find(".nwRequiredField").length > 0)
        nwParameter_Add("field15", "1");
    else
        nwParameter_Add("field15", "0");
    if ($("#field16").find(".nwRequiredField").length > 0)
        nwParameter_Add("field16", "1");
    else
        nwParameter_Add("field16", "0");
    if ($("#field17").find(".nwRequiredField").length > 0)
        nwParameter_Add("field17", "1");
    else
        nwParameter_Add("field17", "0");
    if ($("#field18").find(".nwRequiredField").length > 0)
        nwParameter_Add("field18", "1");
    else
        nwParameter_Add("field18", "0");
    if ($("#field19").find(".nwRequiredField").length > 0)
        nwParameter_Add("field19", "1");
    else
        nwParameter_Add("field19", "0");
    if ($("#field20").find(".nwRequiredField").length > 0)
        nwParameter_Add("field20", "1");
    else
        nwParameter_Add("field20", "0");
}

function GetParams() {
    if ($("#idvallugField1").val() != "") {
        nwParameter_Add("field1", $("#idvallugField1").val());
    }
    else {
        nwParameter_Add("field1", $("#txtField1").val());
    }
    if ($("#idvallugField2").val() != "") {
        nwParameter_Add("field2", $("#idvallugField2").val());
    }
    else {
        nwParameter_Add("field2", $("#txtField2").val());
    }
    if ($("#idvallugField3").val() != "") {
        nwParameter_Add("field3", $("#idvallugField3").val());
    }
    else {
        nwParameter_Add("field3", $("#txtField3").val());
    }
    if ($("#idvallugField4").val() != "") {
        nwParameter_Add("field4", $("#idvallugField4").val());
    }
    else {
        nwParameter_Add("field4", $("#txtField4").val());
    }
    if ($("#idvallugField5").val() != "") {
        nwParameter_Add("field5", $("#idvallugField5").val());
    }
    else {
        nwParameter_Add("field5", $("#txtField5").val());
    }
    if ($("#idvallugField6").val() != "") {
        nwParameter_Add("field6", $("#idvallugField6").val());
    }
    else {
        nwParameter_Add("field6", $("#txtField6").val());
    }
    if ($("#idvallugField7").val() != "") {
        nwParameter_Add("field7", $("#idvallugField7").val());
    }
    else {
        nwParameter_Add("field7", $("#txtField7").val());
    }
    if ($("#idvallugField8").val() != "") {
        nwParameter_Add("field8", $("#idvallugField8").val());
    }
    else {
        nwParameter_Add("field8", $("#txtField8").val());
    }
    if ($("#idvallugField9").val() != "") {
        nwParameter_Add("field9", $("#idvallugField9").val());
    }
    else {
        nwParameter_Add("field9", $("#txtField9").val());
    }
    if ($("#idvallugField10").val() != "") {
        nwParameter_Add("field10", $("#idvallugField10").val());
    }
    else {
        nwParameter_Add("field10", $("#txtField10").val());
    }
    if ($("#idvallugField11").val() != "") {
        nwParameter_Add("field11", $("#idvallugField11").val());
    }
    else {
        nwParameter_Add("field11", $("#txtField11").val());
    }
    if ($("#idvallugField12").val() != "") {
        nwParameter_Add("field12", $("#idvallugField12").val());
    }
    else {
        nwParameter_Add("field12", $("#txtField12").val());
    }
    if ($("#idvallugField13").val() != "") {
        nwParameter_Add("field13", $("#idvallugField13").val());
    }
    else {
        nwParameter_Add("field13", $("#txtField13").val());
    }
    if ($("#idvallugField14").val() != "") {
        nwParameter_Add("field14", $("#idvallugField14").val());
    }
    else {
        nwParameter_Add("field14", $("#txtField14").val());
    }
    if ($("#idvallugField15").val() != "") {
        nwParameter_Add("field15", $("#idvallugField15").val());
    }
    else {
        nwParameter_Add("field15", $("#txtField15").val());
    }
    if ($("#idvallugField16").val() != "") {
        nwParameter_Add("field16", $("#idvallugField16").val());
    }
    else {
        nwParameter_Add("field16", $("#txtField16").val());
    }
    if ($("#idvallugField17").val() != "") {
        nwParameter_Add("field17", $("#idvallugField17").val());
    }
    else {
        nwParameter_Add("field17", $("#txtField17").val());
    }
    if ($("#idvallugField18").val() != "") {
        nwParameter_Add("field18", $("#idvallugField18").val());
    }
    else {
        nwParameter_Add("field18", $("#txtField18").val());
    }
    if ($("#idvallugField19").val() != "") {
        nwParameter_Add("field19", $("#idvallugField19").val());
    }
    else {
        nwParameter_Add("field19", $("#txtField19").val());
    }
    if ($("#idvallugField20").val() != "") {
        nwParameter_Add("field20", $("#idvallugField20").val());
    }
    else {
        nwParameter_Add("field20", $("#txtField20").val());
    }
}

function GetParamsName() {
    if ($("#idvallugField1").val() == "" || $("#idvallugField1").val() == undefined) {
        nwParameter_Add("fieldname1", $("#txtField1").attr("name"));
    }
    else {
        nwParameter_Add("fieldname1", $("#lugField1").attr("name"));
    }
    if ($("#idvallugField2").val() == "" || $("#idvallugField2").val() == undefined) {
        nwParameter_Add("fieldname2", $("#txtField2").attr("name"));
    }
    else {
        nwParameter_Add("fieldname2", $("#lugField2").attr("name"));
    }
    if ($("#idvallugField3").val() == "" || $("#idvallugField3").val() == undefined) {
        nwParameter_Add("fieldname3", $("#txtField3").attr("name"));
    }
    else {
        nwParameter_Add("fieldname3", $("#lugField3").attr("name"));
    }
    if ($("#idvallugField4").val() == "" || $("#idvallugField4").val() == undefined) {
        nwParameter_Add("fieldname4", $("#txtField4").attr("name"));
    }
    else {
        nwParameter_Add("fieldname4", $("#lugField4").attr("name"));
    }
    if ($("#idvallugField5").val() == "" || $("#idvallugField5").val() == undefined) {
        nwParameter_Add("fieldname5", $("#txtField5").attr("name"));
    }
    else {
        nwParameter_Add("fieldname5", $("#lugField5").attr("name"));
    }
    if ($("#idvallugField6").val() == "" || $("#idvallugField6").val() == undefined) {
        nwParameter_Add("fieldname6", $("#txtField6").attr("name"));
    }
    else {
        nwParameter_Add("fieldname6", $("#lugField6").attr("name"));
    }
    if ($("#idvallugField7").val() == "" || $("#idvallugField7").val() == undefined) {
        nwParameter_Add("fieldname7", $("#txtField7").attr("name"));
    }
    else {
        nwParameter_Add("fieldname7", $("#lugField7").attr("name"));
    }
    if ($("#idvallugField8").val() == "" || $("#idvallugField8").val() == undefined) {
        nwParameter_Add("fieldname8", $("#txtField8").attr("name"));
    }
    else {
        nwParameter_Add("fieldname8", $("#lugField8").attr("name"));
    }
    if ($("#idvallugField9").val() == "" || $("#idvallugField9").val() == undefined) {
        nwParameter_Add("fieldname9", $("#txtField9").attr("name"));
    }
    else {
        nwParameter_Add("fieldname9", $("#lugField9").attr("name"));
    }
    if ($("#idvallugField10").val() == "" || $("#idvallugField10").val() == undefined) {
        nwParameter_Add("fieldname10", $("#txtField10").attr("name"));
    }
    else {
        nwParameter_Add("fieldname10", $("#lugField10").attr("name"));
    }
    if ($("#idvallugField11").val() == "" || $("#idvallugField11").val() == undefined) {
        nwParameter_Add("fieldname11", $("#txtField11").attr("name"));
    }
    else {
        nwParameter_Add("fieldname11", $("#lugField11").attr("name"));
    }
    if ($("#idvallugField12").val() == "" || $("#idvallugField12").val() == undefined) {
        nwParameter_Add("fieldname12", $("#txtField12").attr("name"));
    }
    else {
        nwParameter_Add("fieldname12", $("#lugField12").attr("name"));
    }
    if ($("#idvallugField13").val() == "" || $("#idvallugField13").val() == undefined) {
        nwParameter_Add("fieldname13", $("#txtField13").attr("name"));
    }
    else {
        nwParameter_Add("fieldname13", $("#lugField13").attr("name"));
    }
    if ($("#idvallugField14").val() == "" || $("#idvallugField14").val() == undefined) {
        nwParameter_Add("fieldname14", $("#txtField14").attr("name"));
    }
    else {
        nwParameter_Add("fieldname14", $("#lugField14").attr("name"));
    }
    if ($("#idvallugField15").val() == "" || $("#idvallugField15").val() == undefined) {
        nwParameter_Add("fieldname15", $("#txtField15").attr("name"));
    }
    else {
        nwParameter_Add("fieldname15", $("#lugField15").attr("name"));
    }
    if ($("#idvallugField16").val() == "" || $("#idvallugField16").val() == undefined) {
        nwParameter_Add("fieldname16", $("#txtField16").attr("name"));
    }
    else {
        nwParameter_Add("fieldname16", $("#lugField16").attr("name"));
    }
    if ($("#idvallugField17").val() == "" || $("#idvallugField17").val() == undefined) {
        nwParameter_Add("fieldname17", $("#txtField17").attr("name"));
    }
    else {
        nwParameter_Add("fieldname17", $("#lugField17").attr("name"));
    }
    if ($("#idvallugField18").val() == "" || $("#idvallugField18").val() == undefined) {
        nwParameter_Add("fieldname18", $("#txtField18").attr("name"));
    }
    else {
        nwParameter_Add("fieldname18", $("#lugField18").attr("name"));
    }
    if ($("#idvallugField19").val() == "" || $("#idvallugField19").val() == undefined) {
        nwParameter_Add("fieldname19", $("#txtField19").attr("name"));
    }
    else {
        nwParameter_Add("fieldname19", $("#lugField19").attr("name"));
    }
    if ($("#idvallugField20").val() == "" || $("#idvallugField20").val() == undefined) {
        nwParameter_Add("fieldname20", $("#txtField20").attr("name"));
    }
    else {
        nwParameter_Add("fieldname20", $("#lugField20").attr("name"));
    }
}

function getNum(val) {
    if (isNaN(val) || val == '') {
        val = 0
    }
    return val;
}

function getNumReplace(val) {
    val = getNum(parseFloat(val.toString().replace(/,/g, "")))
    return val;
}

function setNumReplace(val, decimal) {
    val = getNum(parseFloat(val.toString().replace(/,/g, "")))
    val = val.toFixed(decimal).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return val;
}

$(document).on("change", "[name='6']", function () {
    var contractAmount = getNumReplace($('[name=3]').val());
    var percent = getNumReplace($('[name=6]').val());
    var totalAmt = contractAmount * (percent / 100);
    var baseprcnt = getNumReplace($("#txtBasePercentage").val());

    if (percent > 100) {
        MessageBox("Cannot proceed. Percentage is greater than 100 percent.", baseTitle, "error");
        $('[name=6]').val("");
        return;
    }
    else if (percent > baseprcnt && baseprcnt > 0) {
        MessageBox("Cannot proceed. % of Down Payment should not be greater than the approved % of Down Payment.", baseTitle, "error");
        $('[name=6]').val("");
        return;
    }
    else {
        $('[name=7]').val(setNumReplace(totalAmt, 2));
    }
});


function VwEntryDisableFields() {
    if (nwDocno != "") {
        $("#lugField1").enable(false);
        $("#lugField2").enable(false);
        $("#lugField3").enable(false);
        $("#lugField4").enable(false);
        $("#lugField5").enable(false);
        $("#lugField6").enable(false);
        $("#lugField7").enable(false);
        $("#lugField8").enable(false);
        $("#lugField9").enable(false);
        $("#lugField10").enable(false);
        $("#lugField11").enable(false);
        $("#lugField12").enable(false);
        $("#lugField13").enable(false);
        $("#lugField14").enable(false);
        $("#lugField15").enable(false);
        $("#lugField16").enable(false);
        $("#lugField17").enable(false);
        $("#lugField18").enable(false);
        $("#lugField19").enable(false);
        $("#lugField20").enable(false);
        $("#txtField1").enable(false);
        $("#txtField2").enable(false);
        $("#txtField3").enable(false);
        $("#txtField4").enable(false);
        $("#txtField5").enable(false);
        $("#txtField6").enable(false);
        $("#txtField7").enable(false);
        $("#txtField8").enable(false);
        $("#txtField9").enable(false);
        $("#txtField10").enable(false);
        $("#txtField11").enable(false);
        $("#txtField12").enable(false);
        $("#txtField13").enable(false);
        $("#txtField14").enable(false);
        $("#txtField15").enable(false);
        $("#txtField16").enable(false);
        $("#txtField17").enable(false);
        $("#txtField18").enable(false);
        $("#txtField19").enable(false);
        $("#txtField20").enable(false);
        $("#txtRemarks").enable(false);
    }
}

function GetBasePercentage() {
    var ntpno = $('[name=4]').val();
    nwParameter_Add("ntpno", ntpno);
    nwParameter_Add("idvallugTranType", $('#idvallugTranType').val());
    func_ActionDriven("actGetBasePercentage", false);
}


function ComputeDPAmount() {
    var contractAmount = getNumReplace($('[name=3]').val());
    var percent = getNumReplace($('[name=6]').val());
    var totalAmt = contractAmount * (percent / 100);

    $('[name=7]').val(setNumReplace(totalAmt, 2));
}

function Level1Controls() {
    if (isLevel1 == "1" && nwDocno != "") {
        $("#noah-webui-Toolbox").visible(true);
        $("#noah-webui-Toolbox").bindingDelete().enable(false);
        $("#noah-webui-Toolbox").bindingProcess().enable(false);
        $("#noah-webui-Toolbox").bindingInquire().enable(false);
        $("#noah-webui-Toolbox").bindingNew().enable(false);
        $("#noah-webui-Toolbox").bindingRefresh().enable(false);
        $("#noah-webui-Toolbox").bindingSave().enable(true);
        $("#noah-webui-default-currentRec").enable(false);
        $("#txtRemarks").enable(true);
    }
}


function getLookupData(idnum, index) {
    var data = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idnum - 1) + ") td:eq(" + index + ") span").text();
    return data;
}