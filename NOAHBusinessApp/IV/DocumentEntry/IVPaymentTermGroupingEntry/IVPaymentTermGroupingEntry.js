var basedTitle = "Payment Term Grouping Entry";

//grid
var SPR_CODE = 1,
            SPR_DESCRIPTION = 2,
            SPR_FINANCETYPE = 3,
            SPR_LTO = 4,
            SPR_UNITCODE = 5,
            SPR_EFFCTVDATEFROM = 6,
            SPR_EFFCTVDATETO = 7,
            SPR_DISCOUNTCODE = 8,
            SPR_DISCOUNTDESC = 9,
            SPR_DISCOUNTRATE = 10,
            SPR_BASISDISCOUNT = 11,
            SPR_APPDISCOUNT = 12,
            SPR_VIEW = 13;


var //Grid details
    SPR_DTL_CODE = 1,
    SPR_DTL_CATEGORYCODE = 2,
    SPR_DTL_CATEGORYDESC = 3,
    SPR_DTL_CONTRACTRATE = 4,
    SPR_DTL_CONTRACTAMOUNT = 5,
    SPR_DTL_DEPOSITMONTHS = 6,
    SPR_DTL_TERMCODE = 7,
    SPR_DTL_TERMDESC = 8,
    SPR_DTL_PERIOD = 9,
    SPR_DTL_DPDISCOUNT = 10,
    SPR_DTL_DPDISCOUNTRATE = 11,
    SPR_DTL_OTHERCHARGESALLOC = 12;


var nwDocno = '';//from approval..

var Paymentcode = ''

var GRID_COLUMN_STARTINDEX = 1,
    SR_SellerRole = GRID_COLUMN_STARTINDEX,
    SR_SellerRoleDesc = ++GRID_COLUMN_STARTINDEX;

var clickedRow = "";
let json = [];
var addChangeView = "";

var TempcrnwTR = "";
var TempValidationValue = "";

var nwGrid_Book;
var nwGrid_Sheet;

var nwGrid1_Book;
var nwGrid1_Sheet;

var lineClickRow;

function func_Reload() {

    nwTrustedLinks.push("fli.promptus8.com");

    crLnk = "../IVPaymentTermGroupingEntry/IVPaymentTermGroupingEntry_Gateway";
    crLnkGateKey = "IVPaymentTermGroupingEntry";
    crnwTagSingleBind = true;

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    DisableFields();
    nwPopupForm_Create("nwDCReqCompliance", false);
    nwPopupForm_Create("nwAddPaymentTermDTL", false);
    cust_GetPara();

    nwDocno = getParameterByName('nwDocno');

    //Code = getParameterByName('nwCode');

    //nwPopupForm_Create("process", true);

    if (nwDocno != undefined && nwDocno != '') {
        setTimeout(function () {
            nwParameter_Add("nwDocno", nwDocno);
            $("#noah-webui-Toolbox").bindingRefresh().click();
            $('#noah-webui-Toolbox').visible(false);
        }, 3000);
    }



    return isContinue;
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    ToolBoxAddNew();
    func_Toolbox_Clear();
    var addChangeView = "1";
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", basedTitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", basedTitle, "", indef, enume);
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
    nwParameter_Add("currType", $("#cboType option:selected").index());
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

    nwParameter_Add("idvallugProject", $("#idvallugProject").val());
    nwParameter_Add("idvallugLocation", $("#idvallugLocation").val());
    nwParameter_Add("nwDocno", $("#txtTransactionNo").val());
    nwParameter_Add("txtTransactionNo", $("#txtTransactionNo").val());

    nwDocno = getParameterByName('nwDocno');
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("jsonTbl", JSON.stringify(json));
    try {
        nwParameter_Add_DataSet("nwGridCon");
    } catch (ex) { }
}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwLoading_Start("actBindCollection", crLoadingHTML);
    RefreshData();
    nwParameter_Add("currType", $("#cboType option:selected").index());
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {

    nwLoading_Start("actBindCollectionEmpty", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollectionEmpty", false);
}


///////////////////////////////////////


var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {

    var code = $("#menuCreatorContainer tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (0) + ")").text();
    var desc = $("#menuCreatorContainer tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (1) + ")").text();

   // var currentRow = crnwTR.index();
    var currentRow = nwGrid_Book.ActiveSheet.CellIndexes.Row;
    

    if (idName == 'lugLocation') {
        $("#idvallugLocation").val(code);
        $("#descvallugLocation").val(desc);
        
    }

    if (idName == 'lugProject') {
        $("#idvallugProject").val(code);
        $("#descvallugProject").val(desc);
    }

    if (idName == 'lugFinanceType') {
        //nwLib.nwTempTable_RowData_Set("nwGridCon", currentRow, SPR_FINANCETYPE)(code);
        nwGrid_Book.ActiveSheet.SetText(SPR_FINANCETYPE - 1, currentRow, code);
       // AutoCompiled(currentRow);
    }

    if (idName == 'lugBasisDisccount') {
        //nwLib.nwTempTable_RowData_Set("nwGridCon", currentRow, SPR_FINANCETYPE)(code);
        nwGrid_Book.ActiveSheet.SetText(SPR_BASISDISCOUNT - 1, currentRow, code);
       // AutoCompiled(currentRow);
    }

    if (idName == 'lugAppDiscount') {
        //nwLib.nwTempTable_RowData_Set("nwGridCon", currentRow, SPR_FINANCETYPE)(code);
        nwGrid_Book.ActiveSheet.SetText(SPR_APPDISCOUNT - 1, currentRow, code);
        //AutoCompiled(currentRow);
    }

    if (idName == 'lugUnitCode') {
       // nwLib.nwTempTable_RowData_Set("nwGridCon", currentRow, SPR_UNITCODE)(code);
        nwGrid_Book.ActiveSheet.SetText(SPR_UNITCODE - 1, currentRow, code);

        //AutoCompiled(currentRow);
    }


    if (idName == 'lugDiscountCode') {
        //nwLib.nwTempTable_RowData_Set("nwGridCon", currentRow, SPR_DISCOUNTCODE)(code);
        //nwLib.nwTempTable_RowData_Set("nwGridCon", currentRow, SPR_DISCOUNTDESC)(desc);
        nwGrid_Book.ActiveSheet.SetText(SPR_DISCOUNTCODE - 1, currentRow, code);
        nwGrid_Book.ActiveSheet.SetText(SPR_DISCOUNTDESC - 1, currentRow, desc);

       // AutoCompiled(currentRow);
    }



    if (idName == 'lugCategory') {
        //nwGrid_AddRow("nwGrid1Con", 1);
        //nwLib.nwTempTable_RowData_Set("nwGrid1Con", currentRow, SPR_DTL_CATEGORYCODE)(code);
        //nwLib.nwTempTable_RowData_Set("nwGrid1Con", currentRow, SPR_DTL_CATEGORYDESC)(desc);
        var currentRow = nwGrid1_Book.ActiveSheet.CellIndexes.Row;

        if (currentRow == nwGrid1_Book.ActiveSheet.Data.length - 1) addDTLRow();
        nwGrid1_Book.ActiveSheet.SetText(SPR_DTL_CATEGORYCODE - 1, currentRow, code);
        nwGrid1_Book.ActiveSheet.SetText(SPR_DTL_CATEGORYDESC - 1, currentRow, desc);

       // AutoCompiled(currentRow);

    
    }


    if (idName == 'lugTerm') {
        var currentRow = nwGrid1_Book.ActiveSheet.CellIndexes.Row;
        var period = $("#menuCreatorContainer tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (2) + ")").text();

        //nwLib.nwTempTable_RowData_Set("nwGrid1Con", currentRow, SPR_DTL_TERMCODE)(code);
        //nwLib.nwTempTable_RowData_Set("nwGrid1Con", currentRow, SPR_DTL_TERMDESC)(desc);
        //nwLib.nwTempTable_RowData_Set("nwGrid1Con", currentRow, SPR_DTL_PERIOD)(period);
        nwGrid1_Book.ActiveSheet.SetText(SPR_DTL_TERMCODE - 1, currentRow, code);
        nwGrid1_Book.ActiveSheet.SetText(SPR_DTL_TERMDESC - 1, currentRow, desc);
        nwGrid1_Book.ActiveSheet.SetText(SPR_DTL_PERIOD - 1, currentRow, period);

        //AutoCompiled(currentRow);
    }

    

}


function EnableFields() {
    $("#lugLocation").enable(true);
    $("#idvallugLocation").enable(true);
    $("#descvallugLocation").enable(true);
    $("#LookUplugLocation").enable(true);
    $("#lugProject").enable(true);
    $("#idvallugProject").enable(true);
    $("#descvallugProject").enable(true);
    $("#LookUplugProject").enable(true);


    $("#txtRemarks").enable(true);


    $("#nwGridCon").enable(true);
    $("#nwGrid1Con").enable(true);
    $("#btnSave ").enable(true);
    $(".nwBtnPaymentDTL ").enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);

    $('#nwGrid-nwData').find(`.nwBtnPaymentDTL`).removeClass("btnGreen");
    $('#nwGrid-nwData').find(`.nwBtnPaymentDTL`).addClass("btnGray");
    $("#nwGridCon tr").find("td:eq(13)").enable(false);
    $('#btnReqCompliance').enable(false);

}

function DisableFields() {
    $("#lugLocation").enable(false);
    $("#idvallugLocation").enable(false);
    $("#descvallugLocation").enable(false);
    $("#LookUplugLocation").enable(false);
    $("#lugProject").enable(false);
    $("#idvallugProject").enable(false);
    $("#descvallugProject").enable(false);
    $("#LookUplugProject").enable(false);
    $("#txtRemarks").enable(false);
    $("#dtpTranDate").enable(false);

    $("#txtTransactionNo").enable(false);
    $("#txtStatus").enable(false);
    $("#txtRemarksDissapprove").enable(false);

    $("#txtReasonDissapprove").enable(false);
    $("#txtReasonDissapproveCode").enable(false);
    
    
    $("#nwGridCon").enable(false);
    $("#nwGrid1Con").enable(false);
    $("#btnSave ").enable(false);
    $(".nwBtnPaymentDTL ").enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);


    $('#btnReqCompliance').removeClass('btnOrange');
    $('#btnReqCompliance').addClass('btnGray');
    $('#btnReqCompliance').enable(false);
}

function EnableFieldsDone() {//Binding Done

    $("#txtRemarks").enable(true);

    $("#lugSellerClssfctn").enable(false);
    $("#nwGridCon").enable(true);

    $("#nwGrid1Con").enable(true);
    $("#btnSave ").enable(true);
    $("#nwGridCon tr").find("td:eq(13)").enable(true);

    $(".nwgrid_buttons").enable(false)
    $("#nwGridCon tr").find("td:eq(1)").enable(false)
    $("#nwGridCon tr").find("td:eq(2)").enable(false)
    $("#nwGridCon tr").find("td:eq(6)").enable(false)

    //$("#noah-webui-Toolbox").bindingNew().enable(true);
    //$("#noah-webui-Toolbox").bindingInquire().enable(true);
    //$("#noah-webui-Toolbox").bindingExport().enable(true);
    //$("#noah-webui-Toolbox").bindingDelete().visible(true);
    //$("#noah-webui-Toolbox").bindingDelete().enable(true);
    //$("#noah-webui-Toolbox").bindingSave().enable(true);
    //$("#noah-webui-Toolbox").bindingSave().visible(true);
    //$("#noah-webui-Toolbox").bindingProcess().visible(true);

    $(".btn-tb-action.btn-tb-new").enable(true);
    $(".btn-tb-action.btn-tb-save").enable(true);
    $(".btn-tb-action.btn-tb-delete").enable(true);
    $(".btn-tb-action.btn-tb-inquire").enable(true);
    $(".btn-tb-action.btn-tb-process").enable(true);

    $("#nwGridCon tr").find("td:eq(" + SPR_VIEW + ")").removeClass('btnGray');
    $("#nwGridCon tr").find("td:eq(" + SPR_VIEW + ")").removeClass('btnGreen');
    $("#nwGridCon tr").find("td:eq(" + SPR_VIEW + ")").addClass('btnOrange');


     $('#btnReqCompliance').enable(true);
}

function DisableFieldsEmpty() {
    DisableFields();
    Main_Load();
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();

    json = [];
}

function ClearFields() {
    ClearGrid();
    $("input[type=text]").val('');
    $("#txtRemarks").val('');
}

function ClearFieldsLinupCodeValidation() {

    TempcrnwTR.find("td:eq(" + SPR_CODE + ") input").val('');
    TempcrnwTR.find("td:eq(" + SPR_VIEW + ")").removeClass("btnOrange");
    TempcrnwTR.find("td:eq(" + SPR_VIEW + ")").removeClass("btnGreen");
    TempcrnwTR.find("td:eq(" + SPR_VIEW + ")").addClass("btnGray");
    TempValidationValue = '';
}


function setAccess(){
    if (nwToolBoxConfig[1] != "1") {
        //$('#btnSave').enable(false);
    }
}


$(document).on("change", "#cboType", function (e) {
    nwParameter_Add("currType", $("#cboType option:selected").index());
    func_ActionDriven("actType");
    $("#cboType").enable(true);
});



$(document).on('keypress', '#txtCode', function () {
    if ($(this).val().length > 5) return false
});

$(document).on('keypress', '#txtDescription', function () {
    if ($(this).val().length > 79) return false
});

function ClearGrid() {
    nwGrid_ClearRange('nwGridCon', 1, 0, $("#nwGridCon th").length - 1, $("#nwGridCon .tblGridBody tr").length);
}



$(document).ready(function () {
    $('#nwGridCon tr').on('click', function () {
        alert($(this).find('td:first').text());


    });
});





$(document).on("keyup", "#nwGridCon ", function (e) {
    console.log("here");
    TempValidationValue = $(e.target).closest('tr').find(".txtLinCode").val();
    TempcrnwTR = crnwTR;

    //if (addChangeView = "1") {
    //    if (TempValidationValue != "") {
    //        crnwTR.find("td:eq(" + SPR_VIEW + ")").removeClass("btnGray");
    //        crnwTR.find("td:eq(" + SPR_VIEW + ")").removeClass("btnGreen");
    //        crnwTR.find("td:eq(" + SPR_VIEW + ")").addClass("btnOrange");
    //    } else {
    //        crnwTR.find("td:eq(" + SPR_VIEW + ")").removeClass("btnOrange");
    //        crnwTR.find("td:eq(" + SPR_VIEW + ")").removeClass("btnGreen");
    //        crnwTR.find("td:eq(" + SPR_VIEW + ")").addClass("btnGray");

    //    }


    //}

    
});



    //$(document).on("click", "#nwGrid input", function (e) {

    //    nwParameter_Add("lineUpCodeInput", TempValidationValue);

    //    func_ActionDriven("validateInput", false);



    //});


function getPaymentCodeCustomFunct() {
    nwGrid1_Book.ActiveSheet.RenderStatus = false;
    //$("#nwGrid1Con tr").find("td:eq(1)").text(Paymentcode);

    nwGrid1_Book.ActiveSheet.SetEnable(SPR_DTL_CONTRACTRATE - 1, Spread_ALLROW, true);
    nwGrid1_Book.ActiveSheet.SetEnable(SPR_DTL_CONTRACTAMOUNT - 1, Spread_ALLROW, true);
    nwGrid1_Book.ActiveSheet.SetEnable(SPR_DTL_DEPOSITMONTHS - 1, Spread_ALLROW, true);
    nwGrid1_Book.ActiveSheet.SetEnable(SPR_DTL_DPDISCOUNT - 1, Spread_ALLROW, true);
    nwGrid1_Book.ActiveSheet.SetEnable(SPR_DTL_DPDISCOUNTRATE - 1, Spread_ALLROW, true);
    nwGrid1_Book.ActiveSheet.SetEnable(SPR_DTL_OTHERCHARGESALLOC - 1, Spread_ALLROW, true);

    var len = nwGrid1_Book.ActiveSheet.Data.length;

    //Since spread_allrow doesnt work in set text
    for (var i = 0; i < len ; i++) {
        nwGrid1_Book.ActiveSheet.SetText(SPR_DTL_CODE - 1, i, Paymentcode);
    }

   nwGrid1_Book.ActiveSheet.RenderStatus = true;

}



function getGridData(idnum, index) {
    var data = $(`#menuCreatorContainer .tablecontainter table tr:eq(${idnum
    })`).find(`td:eq(${index
    })`).text();
    return data;
}



 

  

function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
    var col = crnwTD.index();
    var cnt = nwLib.nwTempTable_Row_Count("nwGrid1Con");

    if (nwGridID == 'nwGrid1Con') {
        if (col == SPR_CODE) {
            var itemgroup = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
            var itemgroupdesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
    
            var isValid = nwLib.nwTempTable_Column_ValueExist("nwGrid1Con", 1, itemgroup, false, "text", 0);

            if (isValid == false) {
                crnwTRtemp.find('td:eq(' + SPR_CODE + ')').text(itemgroup);
                crnwTRtemp.find('td:eq(' + SPR_DESC + ')').text(itemgroupdesc);

            }
            else {
                crnwTRtemp = null;
            }
        }
    }


    return crnwTRtemp;
}






$(document).on("click", "#btnSave", function (e) {
    var code = $fn().addTranType.payment_DTL_Code;
    var categoryCode = $fn().addTranType.payment_DTL_categoryCode;
    var contractRate = $fn().addTranType.payment_DTL_contractRate;
    var contractAmount = $fn().addTranType.payment_DTL_contractAmount;
    var termcode = $fn().addTranType.payment_DTL_termCode;

    var prompt = "";

    if (code == "") {
        prompt += "Cannot be saved. Payment term code  is required.\n"
    }
    if (categoryCode == "") {
        prompt += "Cannot be saved. Category Code is required.\n"
    }
    //if (contractRate == "" && contractAmount == "") {
    //    prompt += "Cannot be saved. Either Contract Rate or Contract Amount is required.\n"
    //}
    if (termcode == "") {
        prompt += "Cannot be saved. Term Code Code is required.\n"
    }
    if (prompt != "") {
        MessageBox(prompt, "Payment term Details", "error");
        return;
    }


    msgBoxContainerQuestion = "btnSave";
    parent_MessageBoxQuestion("Would you like to save the current record?", "Seller Role");

    return true;
});




function msgBoxContainerQuestionF(genID, answer) {
    if (genID == "btnSave") {
        if (answer == "Yes") {

            nwLoading_Start(genID, crLoadingHTML);
            cust_GetPara();
            let x = $fn();

            //TempcrnwTR.find("td:eq(" + SPR_VIEW + ")").removeClass("btnOrange");
            //TempcrnwTR.find("td:eq(" + SPR_VIEW + ")").removeClass("btnGray");
            //TempcrnwTR.find("td:eq(" + SPR_VIEW + ")").addClass("btnGreen");

            nwGrid_Book.ActiveSheet.SetObjectType(SPR_VIEW - 1, lineClickRow, "button", "green", "...");

            var lineUpCode = Paymentcode;

            if (json.length > 0) {
                json = json.filter(function (el) { return el.payment_DTL_Code != lineUpCode; })
            }

            //crnwTable = $("#nwGrid1Con .tblGridBody");
            //var itemcount = crnwTable.find("tr").length;

            var itemcount =  nwGrid1_Book.ActiveSheet.Data.length;

            for (var i = 0; i < itemcount ; i++) {

                var code = nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_CODE - 1, i);
                var categoryCode = nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_CATEGORYCODE - 1, i);
                
                if (code != "" && categoryCode != "") {

                    json.push({
                        //payment_DTL_Code: crnwTable.find("tr:eq(" + i + ")").find("td:eq(1)").text(),
                        //payment_DTL_categoryCode: crnwTable.find("tr:eq(" + i + ")").find("td:eq(2)").text(),
                        //payment_DTL_categoryDesc: crnwTable.find("tr:eq(" + i + ")").find("td:eq(3)").text(),
                        //payment_DTL_contractRate: crnwTable.find("tr:eq(" + i + ")").find("td:eq(4) input").val(),
                        //payment_DTL_contractAmount: crnwTable.find("tr:eq(" + i + ")").find("td:eq(5) input").val(),
                        //payment_DTL_depositsMonth: crnwTable.find("tr:eq(" + i + ")").find("td:eq(6) input").val(),
                        //payment_DTL_termCode: crnwTable.find("tr:eq(" + i + ")").find("td:eq(7)").text(),
                        //payment_DTL_termDesc: crnwTable.find("tr:eq(" + i + ")").find("td:eq(8)").text(),
                        //payment_DTL_termPeriod: crnwTable.find("tr:eq(" + i + ")").find("td:eq(9)").text(),
                        //payment_DTL_dpDiscount: crnwTable.find("tr:eq(" + i + ")").find("td:eq(10) input").prop('checked'),
                        //payment_DTL_dpDiscountRate: crnwTable.find("tr:eq(" + i + ")").find("td:eq(11) input").val(),
                        //payment_DTL_otherAlloc: crnwTable.find("tr:eq(" + i + ")").find("td:eq(12) input").prop('checked')
                        payment_DTL_Code: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_CODE - 1, 0),
                        payment_DTL_categoryCode: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_CATEGORYCODE - 1, 0),
                        payment_DTL_categoryDesc: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_CATEGORYDESC - 1, 0),
                        payment_DTL_contractRate: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_CONTRACTRATE - 1, 0),
                        payment_DTL_contractAmount: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_CONTRACTAMOUNT - 1, 0),
                        payment_DTL_depositsMonth: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_DEPOSITMONTHS - 1, 0),
                        payment_DTL_termCode: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_TERMCODE - 1, 0),
                        payment_DTL_termDesc: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_TERMDESC - 1, 0),
                        payment_DTL_termPeriod: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_PERIOD - 1, 0),
                        payment_DTL_dpDiscount: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_DPDISCOUNT - 1, 0),
                        payment_DTL_dpDiscountRate: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_DPDISCOUNTRATE - 1, 0),
                        payment_DTL_otherAlloc: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_OTHERCHARGESALLOC - 1, 0),
                    });
                }
            }

            nwParameter_Add("jsonTbl", JSON.stringify(json));

            nwLoading_End(genID, crLoadingHTML);
            nwPopupForm_HideModal("nwAddPaymentTermDTL");
            //func_ActionDriven('actSaveTranType', false);
        }
    }
}


function $fn() {
    let $fn = {

        addTranType: {
            //payment_DTL_Code:  $("#nwGrid1Con .tblGridBody").find("tr:eq(0)").find("td:eq(1)"),
            //payment_DTL_categoryCode: $("#nwGrid1Con .tblGridBody").find("tr:eq(0)").find("td:eq(2)"),
            //payment_DTL_categoryDesc: $("#nwGrid1Con .tblGridBody").find("tr:eq(0)").find("td:eq(2)"),
            //payment_DTL_contractRate: $("#nwGrid1Con .tblGridBody").find("tr:eq(0)").find("td:eq(4) input"),
            //payment_DTL_contractAmount: $("#nwGrid1Con .tblGridBody").find("tr:eq(0)").find("td:eq(5) input"),
            //payment_DTL_depositsMonth: $("#nwGrid1Con .tblGridBody").find("tr:eq(0)").find("td:eq(6) input"),
            //payment_DTL_termCode: $("#nwGrid1Con .tblGridBody").find("tr:eq(0)").find("td:eq(7)"),
            //payment_DTL_termDesc: $("#nwGrid1Con .tblGridBody").find("tr:eq(0)").find("td:eq(8)"),
            //payment_DTL_termPeriod: $("#nwGrid1Con .tblGridBody").find("tr:eq(0)").find("td:eq(9)"),
            //payment_DTL_dpDiscount: $("#nwGrid1Con .tblGridBody").find("tr:eq(0)").find("td:eq(10) input").prop('checked'),
            //payment_DTL_dpDiscountRate: $("#nwGrid1Con .tblGridBody").find("tr:eq(0)").find("td:eq(11) input"),
            //payment_DTL_otherAlloc: $("#nwGrid1Con .tblGridBody").find("tr:eq(0)").find("td:eq(12) input").prop('checked'),

            payment_DTL_Code:  nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_CODE - 1,0),
            payment_DTL_categoryCode: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_CATEGORYCODE - 1,0),
            payment_DTL_categoryDesc: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_CATEGORYDESC - 1,0),
            payment_DTL_contractRate: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_CONTRACTRATE - 1,0),
            payment_DTL_contractAmount: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_CONTRACTAMOUNT - 1,0),
            payment_DTL_depositsMonth: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_DEPOSITMONTHS - 1,0),
            payment_DTL_termCode: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_TERMCODE - 1,0),
            payment_DTL_termDesc: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_TERMDESC - 1,0),
            payment_DTL_termPeriod: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_PERIOD - 1,0),
            payment_DTL_dpDiscount: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_DPDISCOUNT - 1,0),
            payment_DTL_dpDiscountRate: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_DPDISCOUNTRATE - 1,0),
            payment_DTL_otherAlloc: nwGrid1_Book.ActiveSheet.GetValue(SPR_DTL_OTHERCHARGESALLOC - 1,0),
        }
    }
    return $fn;
}


function HasJsonTempSellerRole(Code) {
    return json.findIndex(i => (i.payment_DTL_Code) == Code)
}

function FilterjsonPaymentTermDTL(Code) {
    return json.filter(i => (i.payment_DTL_Code) != Code)
}



function changeColorViewLin() {

    var currRowCalProp = $('#nwGrid-nwData tr').length;
    var $thisCalProp = $('#nwGrid-nwData');
    var isCheckedLabelClaim = '';

    for (var x = 0; x < currRowCalProp ; x++) {
        isCheckedLabelClaim = $thisCalProp.find(`tr:eq(${x})`).find(".txtLineUpCode").val();

        if (isCheckedLabelClaim != '') {
            $thisCalProp.find(`tr:eq(${x})`).find("td:eq(" + SPR_VIEW + ")").removeClass("btnGray");
            $thisCalProp.find(`tr:eq(${x})`).find("td:eq(" + SPR_VIEW + ")").addClass("btnGreen");
        }
    }
    // $('#nwGrid-nwData').find(`tr:eq(0)`).find("td:eq(2)").removeClass("btnGray");

}


$(document).on("click", "#btnReqCompliance", function (e) {

    var trantype = 'PAYTRM';
    var docno = $('#txtTransactionNo').val();
    var status = $('#txtStatusHidden').val();
    nwDocno = getParameterByName('nwDocno');

    if (status == "3" || nwDocno != "") {
        var fullength = "../../DCRequirementCompliance?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=true";
    } else {
        var fullength = "../../DCRequirementCompliance?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=false";
    }


    nwLoading_Start('btnReqCompliance', crLoadingHTML);
    nwPopupForm_Create("nwPopUpReqComp", true, fullength);
    $('#nwPopUpReqComp .BoxTitle').text("Requirements Compliance");
    $("#nwPopUpReqComp").css({ "min-width": "98%" });
    $("#nwPopUpReqComp").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopUpReqComp");

    nwLoading_End('btnReqCompliance');


});


function func_WindowCloseTrigger(verID) {
    var isContinue = true;
    var errorResult = "";
    var ICode = "";
    var currentRow = -1;
    var serverlink = "ss" //$("#txtserverlink").val();
    cust_GetPara();

    if (verID == "nwPopUpReqComp") {
        nwParameter_Add("txtTransactionNo", $('#txtTransactionNo').val());
        nwLoading_Start("actHasRqrdCompli", crLoadingHTML);
        func_ActionDriven('actHasRqrdCompli', false);
    }

    return isContinue;
}

   


function p8Spread_DblClick(canvasID, row, col) {
    console.log("p8Spread_DblClick " + canvasID + " " + row + " " + col);

    $('#txtCanvasDblClick').text(canvasID);
    $('#txtRowDblClick').text(row);
    $('#txtColumnDblClick').text(col);

    if (canvasID == "nwGridCon") {
        if (col == SPR_FINANCETYPE - 1) {
            lookUpCustomize("lugFinanceType", 1);
        }
        if (col == SPR_UNITCODE - 1) {
            lookUpCustomize("lugUnitCode", 1);
        }
        if (col == SPR_DISCOUNTCODE - 1) {
            lookUpCustomize("lugDiscountCode", 1);
        }
        if (col == SPR_BASISDISCOUNT - 1) {
            lookUpCustomize("lugBasisDisccount", 1);
        }
        if (col == SPR_APPDISCOUNT - 1) {
            lookUpCustomize("lugAppDiscount", 1);
        }
    }

    if (canvasID == "nwGrid1Con") {
        if (col == SPR_DTL_CATEGORYCODE - 1) {
            lookUpCustomize("lugCategory", 1);
        }
        if (col == SPR_DTL_TERMCODE - 1) {
            var financingType = nwGrid_Book.ActiveSheet.GetValue(SPR_FINANCETYPE - 1, lineClickRow);
            nwParameter_Add("financingType", financingType);
            lookUpCustomize("lugTerm", 1);
        }
    }

}
function p8Spread_Click(canvasID, row, col) {
    console.log("p8Spread_Click " + canvasID + " " + row + " " + col);

    $('#txtCanvasClick').text(canvasID);
    $('#txtRowClick').text(row);
    $('#txtColumnClick').text(col);

    if (col == SPR_VIEW - 1) {
        //e.preventDefault();

        nwParameter_Add("validatePaymentCode", TempValidationValue);
        //func_ActionDriven("validateInput", false);

        //Paymentcode = $(e.target).closest('tr').find(".txtLinCode").val();
        Paymentcode = nwGrid_Book.ActiveSheet.GetValue(SPR_CODE - 1, row);

        lineClickRow = row;

        if (Paymentcode != "") {
            nwPopupForm_ShowModal("nwAddPaymentTermDTL");

            nwLoading_Start("actbtnAddTranType", crLoadingHTML);

            //var lineUpCodeVal = crnwTR.find("td:eq(" + SPR_CODE + ") input").val();
            
            nwParameter_Add("hasJson", HasJsonTempSellerRole(Paymentcode) >= 0 ? true : false);
            nwParameter_Add("jsonPaymentTermDTL", JSON.stringify(json.filter(i =>(i.Paymentcode) == Paymentcode)));

            nwParameter_Add("txtTransactionNo", $("#txtTransactionNo").val());

            //clickedRow = $(e.target).closest('tr').find(".txtLinCode").val();

            nwParameter_Add("hasSQLData", Paymentcode);

            nwParameter_Add("jsonPaymentTermDTL", JSON.stringify(json));

            func_ActionDriven("actbtnAddTranType", false);

            TempcrnwTR = crnwTR;

            return false;
        } else {
            parent_MessageBox("Complete Payment Term Code First.");
        }
    }
}
function p8Spread_Change(canvasID, row, col) {
    console.log("p8Spread_Change " + canvasID + " " + row + " " + col);

    $('#txtCanvasChange').text(canvasID);
    $('#txtRowChange').text(row);
    $('#txtColumnChange').text(col);

    if (canvasID == "nwGridCon") {
        if (col == SPR_DTL_CODE - 1) {
            if (row == nwGrid_Book.ActiveSheet.Data.length - 1) nwGrid_Book.ActiveSheet.RowAdd();
        }
    }
}

function p8Spread_Focus(canvasID, row, col) {
    console.log("p8Spread_Focus " + canvasID + " " + row + " " + col);

    $('#txtCanvasFocus').text(canvasID);
    $('#txtRowFocus').text(row);
    $('#txtColumnFocus').text(col);
}

function enableLineGrid() {
    nwGrid_Book.ActiveSheet.SetEnable(SPR_CODE - 1, Spread_ALLROW, true);
    nwGrid_Book.ActiveSheet.SetEnable(SPR_DESCRIPTION - 1, Spread_ALLROW, true);
    nwGrid_Book.ActiveSheet.SetEnable(SPR_EFFCTVDATEFROM - 1, Spread_ALLROW, true);
    nwGrid_Book.ActiveSheet.SetEnable(SPR_EFFCTVDATETO - 1, Spread_ALLROW, true);
    nwGrid_Book.ActiveSheet.SetEnable(SPR_DISCOUNTRATE - 1, Spread_ALLROW, true);
}


function Main_Load() {
    //Disable Button upon main load
    $(".btn-tb-action.btn-tb-new").enable(true);
    $(".btn-tb-action.btn-tb-refresh").enable(true);
    $(".btn-tb-action.btn-tb-save").enable(false);
    $(".btn-tb-action.btn-tb-delete").enable(false);
    $(".btn-tb-action.btn-tb-inquire").enable(true);
    //$(".btn-tb-action.btn-tb-refresh").visible(false);
    $(".btn-tb-action.btn-tb-process").enable(false);
}

function ToolBoxAddNew() {
    $(".btn-tb-action.btn-tb-new").enable(false);
    $(".btn-tb-action.btn-tb-save").enable(true);
    $(".btn-tb-action.btn-tb-delete").enable(false);
    //$(".btn-tb-action.btn-tb-refresh").enable(true);
    $(".btn-tb-action.btn-tb-inquire").enable(true);
    $(".btn-tb-action.btn-tb-process").enable(false);
}

function GridButton() {
    GridButtonTxt();
    nwGrid_Book.ActiveSheet.SetObjectType(SPR_VIEW - 1, Spread_ALLROW, "button", "gray", "...");
    //nwGrid_Book.ActiveSheet.SetBackground(SPR_VIEW - 1, Spread_ALLROW, "yellow")
}

//Set button text align center since spread_ALLRow doesnt work
function GridButtonTxt() {

    nwGrid_Book.ActiveSheet.RenderStatus = false;

    var len = nwGrid_Book.ActiveSheet.Data.length;

    for (var i = 0; i < len ; i++) {
        nwGrid_Book.ActiveSheet.SetTextAlign(SPR_VIEW - 1, i, "center");
    }

    nwGrid_Book.ActiveSheet.RenderStatus = true;
}

$(document).on("click", ".nwgrid_Insert.nwgrid_buttons", function () {
    GridButtonTxt();
});

function addDTLRow() {
    nwGrid1_Book.ActiveSheet.RowAdd();
    getPaymentCodeCustomFunct();
}