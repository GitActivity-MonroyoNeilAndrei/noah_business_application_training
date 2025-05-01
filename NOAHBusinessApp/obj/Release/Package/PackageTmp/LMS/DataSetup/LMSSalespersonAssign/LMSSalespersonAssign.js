baseTitle = 'Salesperson Assignment';
var SPR_startIndex = 1,
    SPR_SalesPCode = SPR_startIndex,
    SPR_SalesPName = ++SPR_startIndex,
    SPR_SalesPDtls = ++SPR_startIndex,
    SPR_SalesPDocno = ++SPR_startIndex,
    SPR_isUsedSP = ++SPR_startIndex;

var nwGridCon_Book;
var nwGridCon_Sheet;

var serverlink = "";

var nwdocno = "";
var nwdealer = "";
var nwtrantype = "";
var nwisview = "";

var temp_crnwTR = "";
var templist_Salesperson = "";
var templist_SalespersonDesc = "";
var Errortemplist_Salesperson = "";
var Errortemplist_SalespersonDesc = "";

var currLookUpRows = 0;

var listing = "";
function func_Reload() {
    
    crLnk = GetCurrentURL() + "LMSSalespersonAssign_Gateway";
    crLnkGateKey = "LMSSalespersonAssign";
    crnwTagSingleBind = true;

    DisableFields();

    var isContinue = true;
    init_request();

    nwdocno = getParameterByName("nwDocno");
    nwdealer = getParameterByName("nwDealer");
    nwtrantype = getParameterByName("nwTrantype");
    nwisview = getParameterByName("isView");

    nwParameter_Add("bindnwDocno", nwdocno);
    nwParameter_Add("bindnwDealer", nwdealer);
    nwParameter_Add("bindnwTrantype", nwtrantype);
    nwParameter_Add("bindnwisview", nwisview);

    if (nwtrantype == "DLRINF") {
        $('#lblDealer').text("Dealer");
    }
    else if (nwtrantype == "BRKINF") {
        $('#lblDealer').text("Broker");
    }

    

    ToolBoxGetData = false;

    return isContinue;
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    
    EnableFields();
    ClearFields();
    func_Toolbox_Clear();
    nwdealer = getParameterByName("nwDealer");
    nwtrantype = getParameterByName("nwTrantype");
    nwParameter_Add("bindnwDealer", nwdealer);
    nwParameter_Add("bindnwTrantype", nwtrantype);
    $("#txtCrossRefCode").focus();
    $("#noah-webui-Toolbox").bindingDelete().visible(false);

    cust_GetPara();
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", baseTitle, "", indef, enume);
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

function func_ToolboxProcess(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to process the current record?", baseTitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxImport(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxExport(indef, enume) {
    var isContinue = true;
    nwLoading_Start("xExport",crLoadingHTML); 
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
    nwdocno = getParameterByName("nwDocno");
    nwdealer = getParameterByName("nwDealer");
    nwtrantype = getParameterByName("nwTrantype");

    nwParameter_Add("bindnwDocno", nwdocno);
    nwParameter_Add("bindnwDealer", nwdealer);
    nwParameter_Add("bindnwTrantype", nwtrantype);
    nwParameter_Add("txtApprovalID", $("#txtApprovalID").val());
    nwParameter_Add("idvallugDealer", $("#idvallugDealer").val());
    nwParameter_Add("descvallugDealer", $("#descvallugDealer").val());
    nwParameter_Add("txtDate", $("#txtDate").val());

    try {
        nwParameter_Add_DataSet("nwGridCon");
    } catch (e) { }

}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    EnableFieldsDone();
    nwLoading_Start("xBindDone",crLoadingHTML); 
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("xBindEmpty", crLoadingHTML);
    DisableFieldsEmpty();
	func_ActionDriven("actBindCollectionEmpty", false);
}

//function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
//    currLookUpRows += 1;
//    var code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
//    var desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
//    var col3 = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
//    var col4 = addtoListTableRec.find('tr:eq(' + index + ') td:eq(4)').text();
//    var col5 = addtoListTableRec.find('tr:eq(' + index + ') td:eq(5)').text();
//    crnwTRtemp.find('td:eq(' + SPR_SalesPCode + ') ').text(code);
//    crnwTRtemp.find('td:eq(' + SPR_SalesPName + ') ').text(desc);
//    crnwTRtemp.find('td:eq(' + SPR_SalesPDocno + ') ').text(col3);
//    crnwTRtemp.find('td:eq(' + SPR_SalesPDtls + ') ').find(".btnViewDetails").addClass("btnBlue");
//    crnwTRtemp.find('td:eq(' + SPR_isUsedSP + ') ').text(col4);

//    if (addtoListTableRec[0].childElementCount == (index + 1) && col4 == 1) {
//        templist_Salesperson = templist_Salesperson + code;
//        templist_SalespersonDesc = templist_SalespersonDesc + desc;
//    }
//    else if (col4 == 1) {
//        templist_Salesperson = code + ', ' + templist_Salesperson;
//        templist_SalespersonDesc = desc + ', ' + templist_SalespersonDesc;
//    }

//    if (addtoListTableRec[0].childElementCount == (index + 1) && col5 == 1) {
//        Errortemplist_Salesperson = Errortemplist_Salesperson + code;
//        Errortemplist_SalespersonDesc = Errortemplist_SalespersonDesc + desc;
//    }
//    else if (col5 == 1) {
//        Errortemplist_Salesperson = code + ', ' + Errortemplist_Salesperson;
//        Errortemplist_SalespersonDesc = desc + ', ' + Errortemplist_SalespersonDesc;
//    }

//    if (addtoListTableRec[0].childElementCount == (index + 1)) {
//        if ((templist_SalespersonDesc.match(/, /g) || []).length == 1 && (templist_SalespersonDesc.split(", ", 2)).length == 1) {
//            templist_Salesperson = templist_Salesperson.replaceAll(", ", "");
//            templist_SalespersonDesc = templist_SalespersonDesc.replaceAll(", ", "");
//        }

//        if ((Errortemplist_SalespersonDesc.match(/, /g) || []).length == 1 && (Errortemplist_SalespersonDesc.split(", ", 2)).length == 1) {
//            Errortemplist_Salesperson = Errortemplist_Salesperson.replaceAll(", ", "");
//            Errortemplist_SalespersonDesc = Errortemplist_SalespersonDesc.replaceAll(", ", "");
//        }

//        if (Errortemplist_SalespersonDesc.length > 0) {
//            MessageBox("Cannot proceed with assignment of Salesperson/s [" + Errortemplist_SalespersonDesc + "] due to current assignment to another Dealer with the same effective date.", baseTitle, 'error');
//            verID = "lugSalesperson";
//        }
//        else if (templist_SalespersonDesc.length > 0){
//            msgBoxContainerQuestion = "chkSLSPRNisUsed";
//            parent_MessageBoxQuestion("Salesperson/s [" + templist_SalespersonDesc + "] is already assigned to another Dealer. Would you like to proceed input of the same Salesperson to this Dealer which will end the effectivity of the Salesperson's current assignment?", baseTitle, "Question");
//        }
//    }

//    return crnwTRtemp;
//}

function setErrorSalesperson() {
    var lineDetails = $("#nwGridCon .tblGridBody");
    var lineDetailsLen = lineDetails.find("tr").length;
    for (var i = 0; i < lineDetailsLen ; i++) {
        var getCodes = lineDetails.find("tr:eq(" + i + ")").find('td:eq(' + SPR_SalesPCode + ')').text();
        if (Errortemplist_Salesperson.includes(getCodes) && getCodes != "") {
            lineDetails.find("tr:eq(" + i + ")").find('td:eq(' + SPR_SalesPCode + ')').text("");
            lineDetails.find("tr:eq(" + i + ")").find('td:eq(' + SPR_SalesPName + ')').text("");
            lineDetails.find("tr:eq(" + i + ")").find('td:eq(' + SPR_SalesPDocno + ')').text("");
            lineDetails.find("tr:eq(" + i + ")").find('td:eq(' + SPR_SalesPDtls + ')').find(".btnViewDetails").removeClass("btnBlue");
            lineDetails.find("tr:eq(" + i + ")").find('td:eq(' + SPR_isUsedSP + ')').text("");
            //nwGrid_RemoveRow("nwGridCon", currRows, (currRows + 1));
        }
    }

    Errortemplist_Salesperson = "";
    Errortemplist_SalespersonDesc = "";
}

function setIsUsedSalesperson(isYes) {
    var lineDetails = $("#nwGridCon .tblGridBody");
    var lineDetailsLen = lineDetails.find("tr").length;
    for (var i = 0; i < lineDetailsLen ; i++) {
        var getCode = lineDetails.find("tr:eq(" + i + ")").find('td:eq(' + SPR_SalesPCode + ')').text();
        if (lineDetails.find("tr:eq(" + i + ")").find("td:eq(" + SPR_isUsedSP + ")").text().toLowerCase() == "1" && !isYes && templist_Salesperson.includes(getCode) && getCodes != "") {
            lineDetails.find("tr:eq(" + i + ")").find('td:eq(' + SPR_SalesPCode + ')').text("");
            lineDetails.find("tr:eq(" + i + ")").find('td:eq(' + SPR_SalesPName + ')').text("");
            lineDetails.find("tr:eq(" + i + ")").find('td:eq(' + SPR_SalesPDocno + ')').text("");
            lineDetails.find("tr:eq(" + i + ")").find('td:eq(' + SPR_SalesPDtls + ')').find(".btnViewDetails").removeClass("btnBlue");
            lineDetails.find("tr:eq(" + i + ")").find('td:eq(' + SPR_isUsedSP + ')').text("");
            //nwGrid_RemoveRow("nwGridCon", currRows, (currRows + 1));
        }
    }

    templist_Salesperson = "";
    templist_SalespersonDesc = "";
}

function EnableFields() {
    $("#txtApprovalID").enable(false);
    $("#txtStatus").enable(false);
    $("#lugDealer").enable(false);
    $("#txtDate").enable(true);
    $("#nwGridCon").enable(true);
    $('.nwgrid_SearchNext').enable(true);
    $('.nwgrid_SearchFind').enable(true);
    $('#CopyFrom').enable(true);
    $('#btnAddNewSP').enable(true);

    
}

function DisableFields() {
    $("#txtApprovalID").enable(false);
    $("#txtStatus").enable(false);
    $("#lugDealer").enable(false);
    $("#txtDate").enable(false);
    $("#nwGridCon").enable(false);
    $('.nwgrid_SearchNext').enable(false);
    $('.nwgrid_SearchFind').enable(false);
    $('#CopyFrom').enable(false);
    $('#btnAddNewSP').enable(false);



    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);

    $("#noah-webui-Toolbox").bindingExport().enable(false);

    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
}

function EnableFieldsDone() {//Binding Done
    EnableFields();

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);

    ManuallyTagged();

    if (serverdate <= $("#txtDate").val()) {
        $("#txtDate").enable(true);
        $("#txtDate").prop("disabled", false);
        $("#nwGridCon").enable(true);
        $('#CopyFrom').enable(true);
    }
    else {
        $("#txtDate").enable(false);
        $("#txtDate").prop("disabled", true);
        DisableFields();
        $("#noah-webui-Toolbox").bindingDelete().enable(false);
        $("#noah-webui-Toolbox").bindingSave().enable(false);
    }

    chkIfDisabled();
}

function chkIfDisabled() {
    var effDate = new Date($('#txtDate').val());
    var serDate = new Date(serverdate);
    if (/*$('#txtStatus').val() == "Cancelled" || $('#txtStatus').val() == "For Approval" ||*/ effDate < serDate) {
        DisableFields();
        $("#noah-webui-Toolbox").bindingDelete().enable(false);
        $("#noah-webui-Toolbox").bindingSave().enable(false);
        $("#noah-webui-Toolbox").bindingProcess().enable(false);
    }

    if (nwdocno != "") {
        DisableFields();
        $("#nwGridCon").enable(true);
        $('.nwgrid_SearchNext').enable(true);
        $('.nwgrid_SearchFind').enable(true);
        $('#CopyFrom').enable(false);
        $('.nwgrid_Insert').enable(false);
        $('.nwgrid_Delete').enable(false);
    }
}

function getDocNo() {
    nwdocno = getParameterByName("nwDocno");
    nwisview = getParameterByName("isView");
    nwdealer = getParameterByName("nwDealer");
    nwtrantype = getParameterByName("nwTrantype");

    if (nwdocno != "") {
        $('#noah-webui-Toolbox').visible(false);
        nwParameter_Add("bindnwDocno", nwdocno);
        $('#noah-webui-default-Refresh').click();
    }

    if (nwdealer != "" && nwtrantype != "") {
        nwParameter_Add("bindnwDealer", nwdealer);
        nwParameter_Add("bindnwTrantype", nwtrantype);
        $('#noah-webui-default-Refresh').click();
    }

    if (nwisview != "" && nwisview.toLowerCase() == "true") {
        $('#noah-webui-Toolbox').visible(false);
    }
}
function getInquire() {
    nwdealer = getParameterByName("nwDealer");


    if (nwdealer != "") nwParameter_Add("xinquire", "true");
}

function DisableFieldsDone() { // For Refresh
	var TotalRecords = $('div.BN-record span').text();
	if (TotalRecords == 'of 0') {
	    DisableFields();
	}
	else {
	    EnableFieldsDone();
	}
}

function DisableFieldsEmpty() {
    DisableFields();
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
}

function ClearFields() {
    $('#txtApprovalID').val("");
    $('#txtStatus').val("");
    $('#idvallugDealer').val("");
    $('#descvallugDealer').val("");
    $('#txtDate').val("");
    func_ActionDriven("actClearGrid", false);
}

function IfUsed(used) {
    $("#txtDate").prop("disabled", used);
    $("#nwGridCon").enable(!used);
    $("#noah-webui-Toolbox").bindingSave().enable(!used);
    $("#noah-webui-Toolbox").bindingDelete().enable(!used);
}


var nwcurRow;
var nwcurCol;

function p8Spread_DblClick(canvasID, row, col) {
    nwcurRow = row;
    nwcurCol = col;

    p8Spread_CurBook = canvasID
    if (canvasID == "nwGridCon") {

        if (col == 0) {
            if (nwdocno != "") {
                return false;
            }
            currLookUpRows = 0;
            //lookUpCustomize("lugSalesperson", 1, "", true);
            //lookUpCustomize("LugBankCode", 1, "", true);


            //p8Spread_CurBook = nwGridCon_Sheet.canvasID;
            lookUpCustomize("lugSalesperson", 2, undefined, true);
        }

        if (col == 2) {            
            if (nwGridCon_Book.ActiveSheet.GetText(SPR_SalesPCode, row) != "") {

                nwLoading_Start('xSPR_SalesPDtls', crLoadingHTML);
                var salesPDocno = nwGridCon_Book.ActiveSheet.GetValue(SPR_SalesPDocno - 1, col);              
                nwPopupForm_Create("nwSPR_SalesPDtls", true, GetCurrentURL() + "../LMSSalespersonInfo?nwDocno=" + salesPDocno + "");                
                $('#nwSPR_SalesPDtls .BoxTitle').text("Details");
                $("#nwSPR_SalesPDtls").css({ "min-width": "98%" });
                $("#nwSPR_SalesPDtls").css({ "min-height": "98%" });
                nwPopupForm_ShowModal("nwSPR_SalesPDtls");
                nwLoading_End('xSPR_SalesPDtls');
            }
            else {
                MessageBox("Cannot proceed. Salesperson Code is required to view details.\n", baseTitle, "error");
            }
        }
    
        
    }
    
    return true;
}


function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {

    var MaxRow = nwGridCon_Book.ActiveSheet.GetMaxRow();    
    if (nwGridID == "nwGridCon") {
        var col = nwGridCon_Book.ActiveSheet.CellSelected.col - 1;
        var row = nwGridCon_Book.ActiveSheet.CellSelected.row - 1;

        if (col == SPR_SalesPCode - 1) {
            var SalesPCode = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
            var SalesPName = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
            var col3 = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
            var col4 = addtoListTableRec.find('tr:eq(' + index + ') td:eq(4)').text();
            var col5 = addtoListTableRec.find('tr:eq(' + index + ') td:eq(5)').text();


            crnwTRtemp[SPR_SalesPCode - 1] = SalesPCode;
            crnwTRtemp[SPR_SalesPName - 1] = SalesPName;
            crnwTRtemp[SPR_SalesPDocno - 1] = col3;

            for (var x = 0; x <= MaxRow + 1; x++) {

                if (nwGridCon_Book.ActiveSheet.GetText(SPR_SalesPCode - 1, x) != "")
                nwGridCon_Book.ActiveSheet.SetBackground(SPR_SalesPDtls - 1, x, "blue")
            }
            crnwTRtemp[SPR_isUsedSP - 1] = col4;


        }
    }
    return crnwTRtemp;		

}


function p8Spread_Click(canvasID, row, col) {
    if (canvasID == "nwGridCon") {
        if (col == (SPR_SalesPDtls - 1)) {
            Clicksales();
        }
    }
    return true;
}

function Clicksales() {

    var docno = nwGridCon_Book.ActiveSheet.GetText(SPR_SalesPCode - 1, nwGridCon_Book.ActiveSheet.CellSelected.row - 1)        

    
    if (docno != "")  {
        nwLoading_Start('xbtnViewDetails', crLoadingHTML);
        nwPopupForm_Create("nwbtnViewDetails", true, GetCurrentURL() + "../LMSSalespersonInfo?nwDocno=" + docno + "&isView=true");
        $('#nwbtnViewDetails .BoxTitle').text("Salesperson Information");
        $("#nwbtnViewDetails").css({ "min-width": "98%" });
        $("#nwbtnViewDetails").css({ "min-height": "98%" });
        nwPopupForm_ShowModal("nwbtnViewDetails");
        nwLoading_End('xbtnViewDetails');

    }
    else {
        MessageBox("Cannot proceed. Salesperson Code is required to view details.\n", baseTitle, "error");
    }

    return false;
}



function func_LookUpInitialize(id) {
   
    if (id = "lugSalesperson") {
        //nwGetList(); 
        nwParameter_Add("idvallugDealer", $('#idvallugDealer').val());
    }
    if (id = "lugCopyFrom") {
        nwParameter_Add("txtApprovalID", $('#txtApprovalID').val());
    }
    return true;
}

    function nwGetList() {
        var MaxRow = nwTempTable_Row_Count('nwGrid');
        var Temp = "";
        for (var x = 0; x < MaxRow; x++) {
            var Code = nwTempTable_RowData_Get('nwGrid', x, SPR_SalesPCode);
            if (Code != ''){
                if (Temp != '') {
                    Temp += ",";
                }
            }
            Temp += Code;
        }
        nwParameter_Add("getSalespersonList", Temp);
    }
    
    function Lookup_DoneFunction(idName, idNum) {
        var code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (0) + ")").text();
        var desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (1) + ")").text();
        var col3 = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (2) + ")").text();
    
        if (idName == 'toolboxInquire') {
            cust_GetPara();
        }

        if (idName == 'lugSalesperson') {
            nwLib.nwTempTable_RowData_Set("nwGrid", crnwTR.index(), SPR_SalesPCode)(code);
            nwLib.nwTempTable_RowData_Set("nwGrid", crnwTR.index(), SPR_SalesPName)(desc);
            nwLib.nwTempTable_RowData_Set("nwGrid", crnwTR.index(), SPR_SalesPDocno)(col3);
        }

        if (idName == "lugCopyFrom") {
            nwParameter_Add("copytxtApprovalID", code);
            nwLoading_Start("xCopyDone", crLoadingHTML);
            func_ActionDriven("actCopyFrom", false);
        }
    }

    var verID = ''

    $(document).on('change', '#txtDate', function () {

        var EffectiveDate = $(this).val();

        if (EffectiveDate < serverdate) {

            MessageBox("Cannot be continued. Effective Date should not be earlier than the current server date.", baseTitle, 'error');
       
            verID = 'Date';
        }
    });

    function Message_Ok() {

        if (verID == "Date") {
            $('#txtDate').val(serverdate);
        }
        if (verID == "lugSalesperson") {
            setErrorSalesperson();
        }
        $("#dimMessageBox").hide();
        $("#dimbgNW").removeClass("openn");
    }

    function Message_close() {

        if (verID == "Date") {
            $('#txtDate').val(serverdate);
        }
        if (verID == "lugSalesperson") {
            setErrorSalesperson();
        }
        $("#dimMessageBox").hide();
        $("#dimbgNW").removeClass("openn");
    }

    function ManuallyTagged() {
        //manTag = $("#rbRadio1").prop("checked");
        //sysApp = $("#rbRadio2").prop("checked");
        //var AppRbtn = $("#rbRadio3").prop("checked");
        //if (manTag == true) {
        //    $("#nwGrid").enable(false)
        //    func_ActionDriven("actClearGrid", false);

        //}
        //else if (sysApp == true || AppRbtn == true) {
        //    $("#nwGrid").enable(true)
        //}
    }

    $(document).on("click", "#CopyFrom", function () {
        lookUpCustomize("lugCopyFrom", 1);
    });

    $(document).on("click", ".btnViewDetails", function () {
        var docno = crnwTR.find("td:eq(" + SPR_SalesPCode + ")").text();
        if (crnwTR.find("td:eq(" + SPR_SalesPCode + ")").text() != "") {
            nwLoading_Start('xbtnViewDetails', crLoadingHTML);
            nwPopupForm_Create("nwbtnViewDetails", true, GetCurrentURL() + "../LMSSalespersonInfo?nwDocno=" + docno + "&isView=true");
            $('#nwbtnViewDetails .BoxTitle').text("Salesperson Information");
            $("#nwbtnViewDetails").css({ "min-width": "98%" });
            $("#nwbtnViewDetails").css({ "min-height": "98%" });
            nwPopupForm_ShowModal("nwbtnViewDetails");
            nwLoading_End('xbtnViewDetails');

        }
        else {
            MessageBox("Cannot proceed. Salesperson Code is required to view details.\n", baseTitle, "error");
        }

        return false;
    });

    $(document).on("click", "#btnAddNewSP", function () {
        nwLoading_Start('xbtnAddNewSP', crLoadingHTML);
        nwPopupForm_Create("nwbtnAddNewSP", true, GetCurrentURL() + "../LMSSalespersonInfo");
        $('#nwbtnAddNewSP .modal-hdr-title').text("Salesperson Information");
        $("#nwbtnAddNewSP").css({ "min-width": "98%" });
        $("#nwbtnAddNewSP").css({ "min-height": "98%" });
        nwPopupForm_ShowModal("nwbtnAddNewSP");
        nwLoading_End('xbtnAddNewSP');

        return false;
    });

    //function CreateGridDone() {
    //    var SATable = $("#nwGridCon .tblGridBody");
    //    var SATableLen = SATable.find("tr").length;

    //    for (var i = 0; i < SATableLen ; i++) {
    //        if (SATable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SalesPCode + ")").text().toLowerCase() == "") {
    //            SATable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_SalesPDtls + ')').find(".btnViewDetails").removeClass("btnBlue");
    //        }
    //        else {
    //            SATable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_SalesPDtls + ')').find(".btnViewDetails").addClass("btnBlue");
    //        }

    //        if (nwdocno != "") {
    //            SATable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_SalesPCode + ')').css("background", "gainsboro");
    //        }
    //        else {
    //            SATable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_SalesPCode + ')').css("background", "cyan");
    //        }
    //    }
    //}

 
    function chkRemarks() {
        var x = nwGridCon_Book.ActiveSheet.GetMaxRow();
        for (var i = 0; i < x; i++) {
            var Remarks = nwGridCon_Book.ActiveSheet.GetText((SPR_SalesPCode - 1), x);

            if (Remarks == "1") {
                nwGridCon_Book.ActiveSheet.SetBackground((SPR_SalesPDtls - 1), x, "green");
            }
            else {
                nwGridCon_Book.ActiveSheet.SetBackground((SPR_SalesPDtls - 1), x, "blue");
            }

            nwGridCon_Book.ActiveSheet.SetText2((SPR_SalesPDtls - 1), x, "...");
            nwGridCon_Book.ActiveSheet.SetTextAlign((SPR_SalesPDtls - 1), x, "center");
            nwGridCon_Book.ActiveSheet.SetBold((SPR_SalesPDtls - 1), x, "bold");
            nwGridCon_Book.ActiveSheet.SetTextColor((SPR_SalesPDtls - 1), x, "white");
        }
    }


    function afterProcess() {
        //var status = $('#txtStatus').val();
        //if (status.toLowerCase() == 'approved')
        //{
        
        
        //    $('#nwGridCon,#btnAddNewSP,#txtDate').enable(false);
        //    $("#noah-webui-Toolbox").bindingNew().enable(true);
        //    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
        //    $("#noah-webui-Toolbox").bindingDelete().visible(true);
        //    $("#noah-webui-Toolbox").bindingDelete().enable(false);
        //    $("#noah-webui-Toolbox").bindingInquire().enable(true);
        //    $("#noah-webui-Toolbox").bindingExport().enable(true);
        //    $("#noah-webui-Toolbox").bindingSave().enable(false);
        //    $("#noah-webui-Toolbox").bindingProcess().enable(false);
        //}

    
    }

    function msgBoxContainerQuestionF(genID, answer) {

        if (genID == "chkSLSPRNisUsed") {
            if (answer == "Yes") {
                setIsUsedSalesperson(true);
            }
            else {
                setIsUsedSalesperson(false);
            }
        }

    }