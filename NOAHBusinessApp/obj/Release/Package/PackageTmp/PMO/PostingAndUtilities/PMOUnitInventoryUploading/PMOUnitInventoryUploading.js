var nwGridCon_Book;
var nwGridCon_Sheet;

var nwGridConValidation_Book;
var nwGridConValidation_Sheet;

var xsessionstamp = "";

var  SPR_ID = 1,
     SPR_ProjectCode = 2,
     SPR_ProjectName = 3,
     SPR_FullAddress = 4,
     SPR_DateLaunched = 5,
     SPR_GroundBreakingDate = 6,
     SPR_LTSNo = 7,
     SPR_TotalLand = 8,
     SPR_ReservedArea = 9,
     SPR_GrossFloorArea = 10,
     SPR_GrossResidential = 11,
     SPR_ExcludedArea = 12,
     SPR_NetDevelopable = 13,
     SPR_Easement = 14,
     SPR_SpineRoad = 15,
     SPR_NetResidential = 16,
     SPR_OpenSpace = 17,
     SPR_RoadsAlley = 18,
     SPR_SaleableArea = 19,
     SPR_RawLand = 20,
     SPR_EstimatedLand = 21,
     SPR_IncidentalCost = 22,
     SPR_ReservedLand = 23,

     SPR_Remarks_VL = 1,
     SPR_ProjectCode_VL = 2,
     SPR_ProjectName_VL = 3,
     SPR_FullAddress_VL = 4,
     SPR_DateLaunched_VL = 5,
     SPR_GroundBreakingDate_VL = 6,
     SPR_LTSNo_VL = 7,
     SPR_TotalLand_VL = 8,
     SPR_ReservedArea_VL = 9,
     SPR_GrossFloorArea_VL = 10,
     SPR_GrossResidential_VL = 11,
     SPR_ExcludedArea_VL = 12,
     SPR_NetDevelopable_VL = 13,
     SPR_Easement_VL = 14,
     SPR_SpineRoad_VL = 15,
     SPR_NetResidential_VL = 16,
     SPR_OpenSpace_VL = 17,
     SPR_RoadsAlley_VL = 18,
     SPR_Saleable_VL = 19,
     SPR_RawLand_VL = 20,
     SPR_Estimated_VL = 21,
     SPR_IncidentalCost_VL = 22,
     SPR_ReservedLand_VL = 23;

var Title = "Unit Inventory Uploading";

function func_Reload() {
    crLnk = GetCurrentURL() + "PMOUnitInventoryUploading_Gateway";
    crLnkGateKey = "PMOUnitInventoryUploading";
    crnwTagSingleBind = true;

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    DisableFields();
    nwPopupForm_Create("nwUploadCon", false);
    nwPopupForm_Create("frmValidationList", false);
    nwPopupForm_Create("ValidationList-container", false);

    $("#noah-webui-Toolbox").bindingRefresh().visible(false);

    return isContinue;
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {

    var isContinue = true;
    EnableFields();
    ClearFields();
    $('#txtID').val(xsessionstamp + "-" + baseSessionID);
    func_Toolbox_Clear();

    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", Title, "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", Title, "", indef, enume);
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
    nwParameter_Add("ID", $('#txtID').val());
    parent_MessageBoxQuestionToolBox("Do you want to process the current record?", Title, "", indef, enume);
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
    nwParameter_Add("idvallugBranch", $('#idvallugBranch').val());
    nwParameter_Add("idvallugPhase", $('#idvallugPhase').val());
    nwParameter_Add("txtEffectiveDate", $('#txtEffectiveDate').val());
    nwParameter_Add("ID", $('#txtID').val());
    nwParameter_Add_Table("nwGridUnitCodeCon");
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
    RefreshData();
}


///////////////////////////////////////

var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    if (idName == 'toolboxInquire') {
    }
  
}

function EnableFields() {
    $("#idvallugBranch").prop("disabled", false);

    $("#lugPhase").removeClass('adisabled');
    $("#idvallugPhase").prop("disabled", false);

    $("#txtEffectiveDate").prop("disabled", false);

    $('#btnDLForm').enable(true);
    $('#btnUploadPriceList').enable(true);
    $('#nwGridUnitDetailsCon').enable(true);
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
    $('#btnDLForm').enable(false);
    $('#btnUploadPriceList').enable(false);
    $('#btnValidationList').enable(false);
    $('#nwGridUnitDetailsCon').enable(false);
    $('#noah-webui-default-Recall').visible(false);
}

function EnableFieldsDone() {//Binding Done

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);

    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
}


function DisableFieldsEmpty() {
    DisableFields();
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingRefresh().visible(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $('#noah-webui-default-Recall').enable(false);
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();

}

function ClearFields() {
}


function UploadFile() {
    msgBoxContainerQuestion = "hasData";
    parent_MessageBoxQuestion("You have exisitng data. Do you want to override it?", Title, "Question");
}


function CheckIfValidationListHasData(HasData)
{
    if (HasData == 1) {
        nwPopupForm_ShowModal('nwValidationList');
        nwParameter_Add("ID",$('#txtID').val());
        func_ActionDriven("actValidationList", false);
    }
    else {
        MessageBox('Uploaded Successfully.');
        nwParameter_Add("ID", $('#txtID').val());
        window_close('nwUploadCon');
        $("#noah-webui-Toolbox").bindingProcess().enable(true);
        $('#noah-webui-default-Recall').enable(true);
    }
}

$(document).on("click", '#btnUploadPriceList', function () {

    $("#fileCon").val("");
    $("#status").find("span").text("");
    $(".progress").find("div.percent").text("0%");
    $(".progress").find("div.bar").css("width", "0%");

    $('#btnDataCheck').enable(false);
    $('#btnValidationList').enable(false);

    nwPopupForm_ShowModal("nwUploadCon");

    return false;
});






$(document).on('click', '#btnValidationList', function () {
    cust_GetPara();
    nwParameter_Add("ID", $('#txtID').val());
    nwLoading_Start("actValidationList", crLoadingHTML);
    func_ActionDriven("actValidationList", false);
    return false;
});


function msgBoxContainerQuestionF(genID, answer) {
    if (genID == "hasData") {
        if (answer == "Yes") {
            clearUploadField();
            nwPopupForm_ShowModal('nwGridUnitDetailsCon');
            var cnt = nwLib.nwTempTable_Row_Count("nwGridUnitDetailsCon");
            nwGrid_ClearRange("nwGridUnitDetailsCon", SPR_UNITTYPECODE, 0, SPR_MINIMUMRESERVATIONAMOUNT, cnt);
        }
    }
}





$(document).on('click', '#noah-webui-default-Recall', function (e) {
    $('#LookUpAddtoList').text('Recall')
    $('#menuCreatorContainerHolder .BoxTitle').text('');

    lookUpCustomize(`lugUnitCode`, 2);

})


function ShowGridHstCon(gridConName) {
    nwGrid_TableAdjust(`${gridConName}`);
    nwGrid_TableFreeze(`${gridConName}`);
    nwGrid_makeResize(`${gridConName}`);
}


$(document).on("click", "#btnDLForm", function () {
    window.location = GetCurrentURL() + "../../../PMO/PostingAndUtilities/PMOUnitInventoryUploading/UnitInventoryUploading.xlsx";
    return false;
});

$(document).on("click", "#btnDataCheck", function () {
    nwLoading_Start("actDataCheck", crLoadingHTML);
    nwParameter_Add("ID", $('#txtID').val());
    func_ActionDriven("actDataCheck", false);
});//


$(document).on("change", "#fileCon", function () {
    changeFile(this);
});


$(document).on("click", "#noah-webui-default-Export-Validation", function () {
    fn_ExportGrid("nwValidationListGridCon");
    return false;
});