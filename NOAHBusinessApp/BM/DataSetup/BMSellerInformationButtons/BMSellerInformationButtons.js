var nwSellerCode = "",
    nwSellerName = "",
    nwType = "",
    nwTranType = "",
    nwSellerFromCode = "",
    nwSellerFromDesc = "",
    nwtitle = "";
var isView = false;

var SPR_ModeofCommissionReleaseCode = 1,
                            SPR_ModeofCommissionReleaseDesc = 2,
                            SPR_ModeofCommissionReleaseRowno = 3;

var SPR_DDDocumentControlCode = 1,
                            SPR_DDDocumentControlDesc = 2,
                            SPR_DDDocumentTypeCode = 3,
                            SPR_DDDocumentTypeDesc = 4,
                            SPR_DDDocumentSourceCode = 5,
                            SPR_DDDocumentSourceDesc = 6,
                            SPR_DDDocumentNo = 7,
                            SPR_DDDocumentDate = 8,
                            SPR_DDExpiryDate = 9,
                            SPR_DDAttach = 10,
                            SPR_DDView = 11,
                            SPR_DDAttachment = 12,
                            SPR_DDAttachmentPath = 13,
                            SPR_DDRequired = 14,
                            SPR_DDRowno = 15;

var SPR_BABankCode = 1,
                            SPR_BABankName = 2,
                            SPR_BABranch = 3,
                            SPR_BAAccountNo = 4,
                            SPR_BAAccountName = 5,
                            SPR_BAAccountTypeCode = 6,
                            SPR_BAAccountTypeDesc = 7,
                            SPR_BAParticulars = 8,
                            SPR_BARowno = 9,
                            SPR_BACombine = 10;

var SPR_ADProjectCode = 1,
                            SPR_ADProjectName = 2,
                            SPR_ADDeveloperCode = 3,
                            SPR_ADDeveloperName = 4,
                            SPR_ADAccountNo = 5,
                            SPR_ADReservationDate = 6,
                            SPR_ADRowno = 7;

var SPR_SDSeminarTrainingCode = 1,
                            SPR_SDSeminarTrainingDesc = 2,
                            SPR_SDDays = 3,
                            SPR_SDDay = 4,
                            SPR_SDSeminarDate = 5,
                            SPR_SDRemarks = 6,
                            SPR_SDRowno = 7;

var SPR_SRSellerRoleCode = 1,
                            SPR_SRSellerRoleDesc = 2,
                            SPR_SRLevel = 3,
                            SPR_SRSellerCode = 4,
                            SPR_SRSellerName = 5,
                            SPR_SRRowno = 6;

function func_Reload() {

    crLnk = "../BMSellerInformationButtons_Gateway.cshtml";
    crLnkGateKey = "BMSellerInformationButtons";
    var isContinue = true;
    nwType = getParameterByName('nwType');
    nwSellerCode = getParameterByName('nwSellerCode');
    nwSellerName = getParameterByName('nwSellerName');
    nwTranType = getParameterByName('nwTranType');
    nwSellerFromCode = getParameterByName('nwSellerFrom');
    nwSellerFromDesc = getParameterByName('nwSellerFromDesc');
    isView = getParameterByName('isView');
    //nwtitle = getParameterByName('nwtitle');

    if (nwTranType == "MOCR") {
        nwtitle = "Mode of Commission Release";
        hideMenuButton()
    }

    else if (nwTranType == "DOCD") {
        nwtitle = "Document Details";
        hideMenuButton();
        $('#noah-webui-Toolbox-BindingNavigator').visible(false);
    }

    else if (nwTranType == "BAAC") {
        nwtitle = "Bank Account";
        $("#noah-webui-default-Delete").visible(false);
        hideMenuButton();
        $('#noah-webui-Toolbox-BindingNavigator').visible(false);
    }

    else if (nwTranType == "ADAC") {
        nwtitle = "Account Details (As a Customer)";
        hideMenuButton();
        $('#noah-webui-Toolbox-BindingNavigator').visible(false);
    }

    else if (nwTranType == "SETD") {
        nwtitle = "Seminar/Trainings Details"
        hideMenuButton();
        $('#noah-webui-Toolbox-BindingNavigator').visible(false);
    }

    else if (nwTranType == "SELD") {
        nwtitle = "Seller Role Level Details"
    }

    else if (nwTranType == "UPSR") {
        nwtitle = "Update Seller Role";
        hideMenuButton();
        $('#txtEffectiveDate').css('display', 'none');
        $('#lblEffectiveDate').css('display', 'none');
    }

    else if (nwTranType == "VUPH") {
        nwtitle = "View Update History";
        hideMenuButton();
        $('#noah-webui-Toolbox').visible(false);

    }


    cust_GetPara();
    init_request();


    setTimeout(function () {
        $("#noah-webui-Toolbox").bindingRefresh().click();
    }, 500);



    Afterbinding();
    ToolBoxGetData = false;
    nwPopupForm_Create("nwViewHistoryDtl", true);
    nwPopupForm_Create("nwUploadCon");
    nwPopupForm_Create("frmOPImage", true);
    func_ActionDriven("actGenerateGrid", false);



    return isContinue;

}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    ClearFields();
    func_Toolbox_Clear();
    EnableFields();
    $('#txtSellerCode').val(nwSellerCode);
    $('#txtSellerName').val(nwSellerName);
    $('#txtSellerRoleFromCode').val(nwSellerFromCode);
    $('#txtSellerRoleFromDesc').val(nwSellerFromDesc);

    $('#txtEffectiveDate').val($('#txtCurrentDate').val());

    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", nwtitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", nwtitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    nwLoading_Start("xRefreshBtn", crLoadingHTML);
    //RefreshData();
    //EnableFieldsDone();
    isRefreshed = true;
    return isContinue;
}

function func_ToolboxInquire(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    return isContinue;
}

function func_ToolboxProcess(indef, enume) {
    var isContinue = true;
    parent_MessageBoxQuestionToolBox("Do you want to process the current record?", nwtitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxImport(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxExport(indef, enume) {
    var isContinue = true;
    cust_GetPara();
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

    nwParameter_Add("txtID", $('#txtID').val());
    nwParameter_Add("nwType", nwType);
    nwParameter_Add("nwTranType", nwTranType);
    nwParameter_Add("nwSellerName", nwSellerName);
    nwParameter_Add("nwSellerCode", nwSellerCode);
    nwParameter_Add("txtSellerRoleFromCode", $('#txtSellerRoleFromCode').val());
    nwParameter_Add("idvallugSellerRoleTo", $('#idvallugSellerRoleTo').val());
    nwParameter_Add("nwtitle", nwtitle);

}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    cust_GetPara();
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwLoading_Start("xSample", crLoadingHTML);
    EnableFieldsDone();
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {
    cust_GetPara();
    nwLoading_Start("xSample", crLoadingHTML);
    DisableFieldsEmpty();
    func_ActionDriven("actBindCollectionEmpty", false);


}

function EnableFields() {
    cust_GetPara();
    $("#txtEffectiveDate").enable(true);
    $("#lugSellerRoleTo").enable(true);
    $("#nwGridCon").enable(true);

}

function DisableFields() {
    cust_GetPara();
    $("#txtEffectiveDate").enable(false);
    $("#lugSellerRoleTo").enable(false);
    $("#nwGridCon").enable(false);

}

function EnableFieldsDone() {//Binding Done
    cust_GetPara();
    $("#txtEffectiveDate").enable(false);
    $("#lugSellerRoleTo").enable(true);

    //if (nwTranType == "SETD") {
    //    $("#noah-webui-Toolbox").bindingNew().visible(false);
    //    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    //    $("#noah-webui-Toolbox").bindingSave().enable(true);
    //}

    //if (nwTranType == "BAAC") {
    //    $("#noah-webui-Toolbox").bindingNew().visible(false);
    //    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    //    $("#noah-webui-Toolbox").bindingSave().enable(true);
    //    $("#noah-webui-Toolbox").bindingExport().enable(true);
    //}

    //if (nwTranType == "ADAC")
    //{
    //    $("#noah-webui-Toolbox").bindingNew().enable(false);
    //    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    //    $("#noah-webui-Toolbox").bindingSave().enable(true);
    //    $("#noah-webui-Toolbox").bindingExport().enable(true);
    //}

    //if (nwTranType == "DOCD") {
    //    $("#noah-webui-Toolbox").bindingNew().visible(false);

    //}


    //else
    //{

    if (isView == "true") {
        $("#noah-webui-Toolbox").bindingNew().visible(false);
        $("#noah-webui-Toolbox").bindingSave().visible(false);
        $("#noah-webui-Toolbox").bindingDelete().visible(false);
        $("#noah-webui-Toolbox").bindingInquire().visible(false);
        $("#noah-webui-Toolbox").bindingExport().enable(true);

        $("#nwGridCon").enable(false);

        if (nwTranType == "DOCD") {
            func_nwGrid_ColumnHide("#nwGridCon", 10);//hide attach
        }
    }
    else {
        $("#noah-webui-Toolbox").bindingDelete().visible(true);
        $("#noah-webui-Toolbox").bindingRefresh().visible(true);

        $("#noah-webui-Toolbox").bindingNew().enable(true);
        $("#noah-webui-Toolbox").bindingSave().enable(true);
        $("#noah-webui-Toolbox").bindingInquire().enable(true);
        $("#noah-webui-Toolbox").bindingDelete().enable(true);
        $("#noah-webui-Toolbox").bindingExport().enable(true);

        $("#nwGridCon").enable(true);
    }
    //}

}

function Afterbinding() {
    if (nwTranType == "MOCR") {

        $('#lblEffectiveDate').show();
        $('#txtEffectiveDate').show();

        //currServerDate = $('#txtCurrentDate').val();
        //EffectivetyDate = $('#txtEffectiveDate').val();
        //if (EffectivetyDate != "") {
        //    if (Date.parse(EffectivetyDate) <= Date.parse(currServerDate)) {
        //        $("#txtEffectiveDate").enable(false);
        //        $("#noah-webui-Toolbox").bindingSave().enable(false);
        //        $("#noah-webui-Toolbox").bindingDelete().enable(false);
        //        $("#nwGridCon").enable(false);
        //    } else {
        //        $("#txtEffectiveDate").enable(false);
        //        $("#nwGridCon").enable(true);
        //    }
        //}


        //if ($('#txtID').val() == "") {
        //    $('#noah-webui-default-New').click();
        //}

    }
    else if (nwTranType == "DOCD") {

        //if ($('#txtID').val() == "") {
        //    $('#noah-webui-default-New').click();
        //} else {
        //     $("#noah-webui-Toolbox").bindingNew().enable(false);
        //}
        var cnt = nwLib.nwTempTable_Row_Count("nwGridCon");
        for (var row = 0; row <= cnt; row++) {
            if (($('#nwGridCon .tblGridBody tr:eq(' + row + ') td:eq(' + (SPR_DDDocumentControlCode) + ')').text() != '')
                && ($('#nwGridCon .tblGridBody tr:eq(' + row + ') td:eq(' + (SPR_DDAttachment) + ')').text() == '1')) {
                $("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_DDView + ")").removeClass("nwGButton");
                $("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_DDView + ")").addClass("btnMaylaman");
            }
        }
        SetGridDownloadButtonProperty();
        var TotalRecords = $('div.BN-record span').text();
        //if (TotalRecords == 'of 0') {
        //    $("#noah-webui-Toolbox").bindingSave().enable(false);
        //    $("#noah-webui-Toolbox").bindingExport().enable(false);
        //}
        //else {
        //    $("#noah-webui-Toolbox").bindingSave().enable(true);
        //    $("#noah-webui-Toolbox").bindingExport().enable(true);
        //}



    }
    else if (nwTranType == "BAAC") {

        //$("#noah-webui-Toolbox").bindingDelete().visible(false);

        //if ($('#txtID').val() == "") {
        //    $('#noah-webui-default-New').click();
        //} else {
        //    $("#noah-webui-Toolbox").bindingNew().enable(false);
        // }
    }
    else if (nwTranType == "ADAC") {
        //if ($('#txtID').val() == "") {
        //    $("#noah-webui-Toolbox").bindingNew().enable(true);
        //} else {
        //    $("#noah-webui-Toolbox").bindingNew().enable(false);
        //}

        // $("#noah-webui-Toolbox").bindingDelete().visible(false);

        //if ($('#txtID').val() == "") {
        //    $('#noah-webui-default-New').click();
        //} else {
        //     $("#noah-webui-Toolbox").bindingNew().enable(false);
        // }
    }
    else if (nwTranType == "SETD") {

        //$("#noah-webui-Toolbox").bindingDelete().visible(false);

        //$("#noah-webui-Toolbox").bindingNew().visible(false);
        //$("#noah-webui-Toolbox").bindingDelete().visible(false);
        //$("#noah-webui-Toolbox").bindingExport().visible(false);
    }
    else if (nwTranType == "SELD") {
        // $("#btnViewHistoryDetails").show();
        $('#lblEffectiveDate').show();
        $('#txtEffectiveDate').show();

        //currServerDate = $('#txtCurrentDate').val();
        //EffectivetyDate = $('#txtEffectiveDate').val();
        //if (EffectivetyDate != "") {
        //    if (Date.parse(EffectivetyDate) < Date.parse(currServerDate)) {
        //        $("#txtEffectiveDate").enable(false);
        //        $("#nwGridCon").enable(false);
        //        $("#noah-webui-Toolbox").bindingSave().enable(false);
        //        $("#noah-webui-Toolbox").bindingDelete().enable(false);
        //    } else {
        //        $("#txtEffectiveDate").enable(false);
        //        $("#nwGridCon").enable(true);
        //    }
        //}

        //if ($('#txtID').val() == "") {
        //    $('#noah-webui-default-New').click();
        //} else {
        //     $("#noah-webui-Toolbox").bindingNew().enable(false);
        // }
    }
    else if (nwTranType == "UPSR") {

        // $('#lblEffectiveDate').show();
        // $('#txtEffectiveDate').show();
        $('#lblSellerRoleFrom').show();
        $('#txtSellerRoleFromCode').show();
        $('#txtSellerRoleFromDesc').show();
        $('#lblSellerRoleTo').show();
        $('#lugSellerRoleTo').show();

        //currServerDate = $('#txtCurrentDate').val();
        //EffectivetyDate = $('#txtEffectiveDate').val();
        //if (EffectivetyDate != "") {
        //    if (Date.parse(EffectivetyDate) < Date.parse(currServerDate)) {
        //        $("#txtEffectiveDate").enable(false);
        //        $("#nwGridCon").enable(false);
        //        $("#noah-webui-Toolbox").bindingSave().enable(false);
        //        $("#noah-webui-Toolbox").bindingDelete().enable(false);
        //        $("#lugSellerRoleTo").addClass("adisabled");
        //    } else {
        //        $("#txtEffectiveDate").enable(false);
        //        $("#nwGridCon").enable(true);
        //    }
        //}


        //if ($('#txtID').val() == "") {
        //    $('#noah-webui-default-New').click();
        //} 
    }
    else if (nwTranType == "VUPH") {

        $('#lblseller').hide();
        $('#txtSellerCode').hide();
        $('#txtSellerName').hide();

        //$("#noah-webui-Toolbox").visible(false);
    }
}

function DisableFieldsEmpty() {
    cust_GetPara();
    $("#txtEffectiveDate").enable(false);
    $("#lugSellerRoleTo").enable(false);
    $("#nwGridCon").enable(false);
    if (isView == "false") {
        if (nwTranType == "ADAC") {
            $("#noah-webui-Toolbox").bindingDelete().visible(false);
        } else {
            $("#noah-webui-Toolbox").bindingDelete().visible(true);
        }

        $("#noah-webui-Toolbox").bindingNew().visible(true);
        $("#noah-webui-Toolbox").bindingNew().enable(true);

        $("#noah-webui-Toolbox").bindingDelete().enable(false);
        $("#noah-webui-Toolbox").bindingSave().enable(false);
        $("#noah-webui-Toolbox").bindingDelete().enable(false);
        $("#noah-webui-Toolbox").bindingExport().enable(false);
    }
    $("#noah-webui-Toolbox").bindingRefresh().visible(true);
}

function RefreshData() {
    cust_GetPara();
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0') {
        DisableFieldsEmpty();
    }
    else {
        EnableFieldsDone();
    }

    // Refresh();    
}

function ClearFields() {
    cust_GetPara();
    $('#txtID').val('');
    $('#idvallugSellerRoleTo').val('');
    $('#descvallugSellerRoleTo').val('');
}

function Refresh() {
    cust_GetPara();

    if (nwType != "") {
        //$('#txtSellerCode').val(nwSellerCode);
        //$('#noah-webui-default-Refresh').click();
    }


}

function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {
    var nwobjID = nwobj.attr('id');
    var col = crnwTD.index();
    cust_GetPara();
    if (nwobjID == "nwGrid") {
        if ((col == SPR_ModeofCommissionReleaseCode) && (nwTranType == "MOCR")) {
            lookUpCustomize("lugModeofCommissionReleaseCode", 2);
        }
        else if ((col == SPR_DDDocumentControlCode) && (nwTranType == "DOCD")) {
            lookUpCustomize("lugDDDocumentControlCode", 1);
        }
        else if ((col == SPR_DDDocumentSourceCode) && (nwTranType == "DOCD")) {
            var DocumentControlCode = nwTempTable_RowData_Get("nwGridCon", crnwTR.index(), (SPR_DDDocumentControlCode - 1));
            if (DocumentControlCode == "") {
                MessageBox("Cannot Proceed. Document Control Code is required. \n", nwtitle);
            }
            else {
                lookUpCustomize("lugDDDocumentSourceCode", 1);
            }
        }
        else if ((col == SPR_BABankCode) && (nwTranType == "BAAC")) {
            lookUpCustomize("lugBankCode", 1);
        }
        else if ((col == SPR_BAAccountTypeDesc) && (nwTranType == "BAAC")) {
            lookUpCustomize("lugAccountType", 1);
        }
        else if ((col == SPR_ADProjectCode) && (nwTranType == "ADAC")) {
            lookUpCustomize("lugProjectCode", 1);
        }
        else if ((col == SPR_SDSeminarTrainingDesc) && (nwTranType == "SETD")) {
            lookUpCustomize("lugSeminarTraining", 2);
        }
            //else if ((col == SPR_SRSellerRoleDesc) && (nwTranType == "SELD")) {
            //    lookUpCustomize("lugSellerRole", 2);
            //}
        else if ((col == SPR_SRSellerCode) && (nwTranType == "SELD")) {
            var SellerRoleCode = nwTempTable_RowData_Get("nwGridCon", crnwTR.index(), (SPR_SRSellerRoleCode - 1));
            nwParameter_Add("SellerRoleCode", SellerRoleCode);
            if (SellerRoleCode == "") {
                MessageBox("Cannot Proceed. Seller Role is required. \n", nwtitle);
            }
            else {
                lookUpCustomize("lugSellerCode", 1);
            }
        }
    }

}


function nwGrid_tdClick(nwobjID) {
    cust_GetPara();
    if (nwobjID == "nwGrid") {
    }
}



var EffectivetyDateOld;
$(document).on('click', '#txtEffectiveDate', function (e) {
    EffectivetyDateOld = $('#txtEffectiveDate').val();
});


$(document).on('change', '#txtEffectiveDate', function (e) {
    currServerDate = $('#txtCurrentDate').val();
    EffectivetyDate = $('#txtEffectiveDate').val();

    if (Date.parse(EffectivetyDate) < Date.parse(currServerDate)) {
        MessageBox("Cannot Proceed. Effective date must be later than or equal to current server date.", nwtitle);
        $('#txtEffectiveDate').val(EffectivetyDateOld);
    }

});


function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {


    if (nwGridID == "nwGrid") {
        if (nwTranType == "MOCR") {
            if (crnwTD.index() == SPR_ModeofCommissionReleaseCode) {

                var Code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
                var Desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

                var isValid = nwLib.nwTempTable_Column_ValueExist("nwGridCon", SPR_ModeofCommissionReleaseCode, Code, false, "text", 0);

                if (isValid == false) {
                    crnwTRtemp.find('td:eq(' + SPR_ModeofCommissionReleaseCode + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(' + 1 + ')').text());
                    crnwTRtemp.find('td:eq(' + SPR_ModeofCommissionReleaseDesc + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(' + 2 + ')').text());
                } else
                    crnwTRtemp = null;

                var cnt = nwTempTable_Row_Count("nwGridCon");
                if (cnt == (crnwTR.index() + 1))
                    nwGrid_AddRow("nwGridCon", 1);
            }
        }
        else if (nwTranType == "SETD") {
            var Code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
            var Desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
            var Days = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
            crnwTRtemp.find('td:eq(' + SPR_SDSeminarTrainingCode + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(' + 1 + ')').text());
            crnwTRtemp.find('td:eq(' + SPR_SDSeminarTrainingDesc + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(' + 2 + ')').text());
            crnwTRtemp.find('td:eq(' + SPR_SDDays + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(' + 3 + ')').text());

            var cnt = nwTempTable_Row_Count("nwGridCon");
            if (cnt == (crnwTR.index() + 1))
                nwGrid_AddRow("nwGridCon", 1);
            func_ActionDriven("actAfterAddtolist", false);


        }
        else if (nwTranType == "SELD") {
            var Code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
            var Desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
            var Level = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();

            var isValid = nwLib.nwTempTable_Column_ValueExist("nwGridCon", SPR_SRSellerRoleCode, Code, false, "text", 0);

            if (isValid == false) {
                crnwTRtemp.find('td:eq(' + SPR_SRSellerRoleCode + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(' + 1 + ')').text());
                crnwTRtemp.find('td:eq(' + SPR_SRSellerRoleDesc + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(' + 2 + ')').text());
                crnwTRtemp.find('td:eq(' + SPR_SRLevel + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(' + 3 + ')').text());
            } else
                crnwTRtemp = null;

            var cnt = nwTempTable_Row_Count("nwGridCon");
            if (cnt == (crnwTR.index() + 1))
                nwGrid_AddRow("nwGridCon", 1);
        }

    }

    return crnwTRtemp;


}

var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    cust_GetPara()


    if (idName == 'toolboxInquire') {
    }

    if (idName == 'lugModeofCommissionReleaseCode') {
        var modeofcommissionreleasecode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(0)").text();
        var modeofcommissionreleasedesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(1)").text();

        nwLib.nwTempTable_RowData_Set("nwGridCon", crnwTR.index(), SPR_ModeofCommissionReleaseCode)(modeofcommissionreleasecode);
        nwLib.nwTempTable_RowData_Set("nwGridCon", crnwTR.index(), SPR_ModeofCommissionReleaseDesc)(modeofcommissionreleasedesc);

        nwGrid_AddRow("nwGridCon", 1);

    }

    else if (idName == 'lugDDDocumentControlCode') {
        var documentcontrolcode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(0)").text();
        var documentcontroldesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(1)").text();
        var documenttypecode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(2)").text();
        var documenttypedesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(3)").text();
        var required = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(4)").text();

        nwLib.nwTempTable_RowData_Set("nwGridCon", crnwTR.index(), SPR_DDDocumentControlCode)(documentcontrolcode);
        nwLib.nwTempTable_RowData_Set("nwGridCon", crnwTR.index(), SPR_DDDocumentControlDesc)(documentcontroldesc);
        nwLib.nwTempTable_RowData_Set("nwGridCon", crnwTR.index(), SPR_DDDocumentTypeCode)(documenttypecode);
        nwLib.nwTempTable_RowData_Set("nwGridCon", crnwTR.index(), SPR_DDDocumentTypeDesc)(documenttypedesc);
        nwLib.nwTempTable_RowData_Set("nwGridCon", crnwTR.index(), SPR_DDRequired)(required);

        nwGrid_AddRow("nwGridCon", 1);
    }
    else if (idName == 'lugDDDocumentSourceCode') {
        var documentsourcecode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(0)").text();
        var documentsourcedesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(1)").text();

        nwLib.nwTempTable_RowData_Set("nwGridCon", crnwTR.index(), SPR_DDDocumentSourceCode)(documentsourcecode);
        nwLib.nwTempTable_RowData_Set("nwGridCon", crnwTR.index(), SPR_DDDocumentSourceDesc)(documentsourcedesc);

    }
    else if (idName == 'lugBankCode') {
        var bankcode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(0)").text();
        var bankname = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(1)").text();

        nwLib.nwTempTable_RowData_Set("nwGridCon", crnwTR.index(), SPR_BABankCode)(bankcode);
        nwLib.nwTempTable_RowData_Set("nwGridCon", crnwTR.index(), SPR_BABankName)(bankname);

        nwGrid_AddRow("nwGridCon", 1);
    }
    else if (idName == 'lugAccountType') {
        var accounttypecode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(0)").text();
        var accounttypedesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(1)").text();

        nwLib.nwTempTable_RowData_Set("nwGridCon", crnwTR.index(), SPR_BAAccountTypeCode)(accounttypecode);
        nwLib.nwTempTable_RowData_Set("nwGridCon", crnwTR.index(), SPR_BAAccountTypeDesc)(accounttypedesc);

    }
    else if (idName == 'lugProjectCode') {
        var projectcode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(0)").text();
        var projectname = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(1)").text();
        var developercode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(2)").text();
        var developername = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(3)").text();

        nwLib.nwTempTable_RowData_Set("nwGridCon", crnwTR.index(), SPR_ADProjectCode)(projectcode);
        nwLib.nwTempTable_RowData_Set("nwGridCon", crnwTR.index(), SPR_ADProjectName)(projectname);
        nwLib.nwTempTable_RowData_Set("nwGridCon", crnwTR.index(), SPR_ADDeveloperCode)(developercode);
        nwLib.nwTempTable_RowData_Set("nwGridCon", crnwTR.index(), SPR_ADDeveloperName)(developername);

        nwGrid_AddRow("nwGridCon", 1);
    }
    else if (idName == 'lugSellerCode') {
        var sellercode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(0)").text();
        var sellername = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(1)").text();

        nwLib.nwTempTable_RowData_Set("nwGridCon", crnwTR.index(), SPR_SRSellerCode)(sellercode);
        nwLib.nwTempTable_RowData_Set("nwGridCon", crnwTR.index(), SPR_SRSellerName)(sellername);

    }

}

$(document).on("click", '.nwBtnAttach', function (e) {
    var code = nwLib.nwTempTable_RowData_Get("nwGridCon", crnwTR.index(), SPR_DDDocumentControlCode - 1);

    if (code != "") {

        $("#fileCon").val("");
        $("#status").find("span").text("");
        $(".progress").find("div.percent").text("0%");
        $(".progress").find("div.bar").attr("style", "width:0%");
        nwPopupForm_ShowModal("nwUploadCon");
    }
    else {
        MessageBox("Cannot Proceed. Document Control Code is required. \n", nwtitle);
    }



});


var attachclick = '';
//For Uploading of Attachment
function changeFile(ver) {
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
    //if (size > 5242880) {
    //    MessageBox("Attachment does not follow file size requirements."); $(ver).val("");
    //}
    //else {
    upload();
    //}
}

function upload() {

    if ($("input[type = 'file']").val() == "") {
        $("#status").html("<span style=\"color:red;\">Please select file to upload!</span>");
        (function () {
            var bar = $('.bar');
            var percent = $('.percent');
            var status = $('#status');
            $('form').ajaxForm({
                beforeSend: function () {

                },
                uploadProgress: function (event, position, total, percentComplete) {
                },
                success: function () {
                },
                complete: function (xhr) {
                }
            });
        })();
    } else {
        (function () {
            var bar = $('.bar');
            var percent = $('.percent');
            var status = $('#status');

            try {

                $('form').ajaxForm({
                    beforeSend: function () {
                        status.empty();
                        var percentVal = '0%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                    },

                    uploadProgress: function (event, position, total, percentComplete) {
                        var percentVal = percentComplete + '%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                    },

                    success: function () {
                        var percentVal = '100%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                    },

                    complete: function (xhr) {
                        $('#status').html(xhr.responseText);
                    }
                });
            } catch (err) {
                alert(err);
            }
        })();
    }
}

var linkcat = "";
//Action or Trigger When Closing of Pop-up
var xvaluePath = "";
var tempindex;
function func_WindowCloseTrigger(verID) {
    tempindex = crnwTR.index();
    var isContinue = true;
    var filepath = "";
    var path = "";
    var serverlink = $("#txtserverlink").val();

    if (verID == "nwUploadCon") {
        //For Button Catalogue Attach
        filepath = $("#nwUploadCon .aagfilename").text();
        path = "\\" + 'BMSellerInformationButtons' + "\\" + filepath;

        if (filepath != "") {
            linkcat = serverlink + path;
            $("#nwGridCon tbody tr:eq(" + tempindex + ") td:eq(" + SPR_DDView + ") a").attr({ "href": linkcat, "title": "\'Download\'", "download": "" });
            nwLib.nwTempTable_RowData_Set("nwGridCon", tempindex, SPR_DDAttachmentPath)(path);
            nwLib.nwTempTable_RowData_Set("nwGridCon", tempindex, SPR_DDAttachment)(1);
            $("#nwGridCon tbody tr:eq(" + tempindex + ") td:eq(" + SPR_DDView + ")").removeClass("nwGButton");
            $("#nwGridCon tbody tr:eq(" + tempindex + ") td:eq(" + SPR_DDView + ")").addClass("btnMaylaman");

        } else {
        }
    }
    return isContinue;
}


//$(document).on("click", ".nwBtnDownload", function () {

//    var attach = nwLib.nwTempTable_RowData_Get("nwGridCon", crnwTR.index(), SPR_DDAttachmentPath - 1);
//    var code = nwLib.nwTempTable_RowData_Get("nwGridCon", crnwTR.index(), SPR_DDDocumentControlCode - 1);

//    if (code != "") {

//        if (attach == "") {
//            MessageBox("No attachment found!");
//            return false;
//        }
//        else {
//            //func_WindowCloseTrigger('nwUploadCon');
//        }
//    }

//});

function AfterAddtolist() {
    var cnt = nwLib.nwTempTable_Row_Count("nwGridCon");
    for (var row = 0; row <= cnt; row++) {
        if (($('#nwGridCon .tblGridBody tr:eq(' + row + ') td:eq(' + (SPR_SDSeminarTrainingCode) + ')').text() != '')
            && ($('#nwGridCon .tblGridBody tr:eq(' + row + ') td:eq(' + (SPR_SDDays) + ')').text() != '')) {

            var Days = nwLib.nwTempTable_RowData_Get("nwGridCon", row, SPR_SDDays - 1);
            var Rowno = nwLib.nwTempTable_RowData_Get("nwGridCon", row, SPR_SDRowno - 1);
            nwParameter_Add("txtID", $('#txtID').val());
            nwParameter_Add("Days", Days);
            nwParameter_Add("Row", row);
            nwParameter_Add("Rowno", Rowno);
            func_ActionDriven("actDay", false);
            nwLib.nwTempTable_RowData_Set("nwGridCon", row, SPR_SDDays)("");

        }
    }
}
function func_LookUpInitialize(dimP) {
    cust_GetPara();
}

function GridFormat(GridName) {
    nwGrid_TableAdjust("" + GridName + "");
    nwGrid_TableFreeze("" + GridName + "", 0, 0);
    nwGrid_makeResize("" + GridName + "");
}
$(document).on("click", "#btnViewHistoryDetails", function (e) {
    cust_GetPara();

    nwPopupForm_ShowModal("nwViewHistoryDtl");
    GridFormat("nwGridViewHistoryCon");

    func_ActionDriven("actViewHistoryDtls", false);
    return false;
});


var globalIndex = 0;
$(document).on("click", "#AccountNo", function (e) {
    globalIndex = crnwTR.index();
});

$(document).on("blur", "#AccountNo", function (e) {
    if (nwTranType == "BAAC") {
        var BankCode = $('#nwGridCon .tblGridBody tr:eq(' + globalIndex + ') td:eq(' + SPR_BABankCode + ')').text();

        if (BankCode != "") {
            var tihs = $('#nwGridCon .tblGridBody tr:eq(' + globalIndex + ') td:eq(' + SPR_BAAccountNo + ') input').val();
            var combination = BankCode + tihs;
            $('#nwGridCon .tblGridBody tr:eq(' + globalIndex + ') td:eq(' + SPR_BACombine + ')').text(combination);

            var crnwTable = $("#nwGridCon .tblGridBody tbody");
            var len = crnwTable.length;

            for (var x = 0; x <= len ; x++) {
                if (x != globalIndex) {
                    var currentcombo = $('#nwGridCon .tblGridBody tr:eq(' + x + ') td:eq(' + SPR_BACombine + ')').text();
                    if (currentcombo == combination) {
                        $('#nwGridCon .tblGridBody tr:eq(' + globalIndex + ') td:eq(' + SPR_BACombine + ')').text('');
                        $('#nwGridCon .tblGridBody tr:eq(' + globalIndex + ') td:eq(' + SPR_BAAccountNo + ') input').val('');
                        MessageBox('Cannot Continue. Line details already exists.', 'Bank Account');
                    }
                }
            }
        } else {
            $('#nwGridCon .tblGridBody tr:eq(' + globalIndex + ') td:eq(' + SPR_BACombine + ')').text('');
            $('#nwGridCon .tblGridBody tr:eq(' + globalIndex + ') td:eq(' + SPR_BAAccountNo + ') input').val('');
            MessageBox('Cannot Continue. Bank is required.', 'Bank Account')
        }

    }

});





function hideMenuButton() {

    if (nwTranType == "MOCR" || nwTranType == "UPSR") {
        $("#noah-webui-Toolbox").bindingInquire().enable(false);
    }

    else if (nwTranType == "ADAC" || nwTranType == "DOCD" || nwTranType == "SETD") {
        $("#noah-webui-Toolbox").bindingInquire().visible(false);
        $("#noah-webui-Toolbox").bindingNew().visible(true);
        $("#noah-webui-Toolbox").bindingExport().enable(true);
    }

    else if (nwTranType == "BAAC") {
        $("#noah-webui-Toolbox").bindingInquire().visible(false);
        $("#noah-webui-Toolbox").bindingDelete().visible(false);
        $("#noah-webui-default-Delete").visible(false);
    }

    else {
        $("#noah-webui-Toolbox").bindingNew().visible(false);
        $("#noah-webui-Toolbox").bindingSave().visible(false);
        $("#noah-webui-Toolbox").bindingDelete().visible(false);
        $("#noah-webui-Toolbox").bindingRefresh().visible(false);
        $("#noah-webui-Toolbox").bindingInquire().visible(false);
        $("#noah-webui-Toolbox").bindingExport().visible(false);


        $("#noah-webui-default-Delete").visible(false);
        $("#noah-webui-default-Refresh").visible(false);
        $("#noah-webui-Toolbox-BindingNavigator").visible(false);
        $("#noah-webui-Footer").visible(false);
    }


}

function disableFieldsonLoad() {
    if (nwTranType == "ADAC") {
        $("#noah-webui-Toolbox").bindingNew().enable(false);
    }

}

function SetGridDownloadButtonProperty() {

    crnwTable = $("#nwGridCon .tblGridBody tbody");

    var serverlink = $("#txtserverlink").val();
    var length = crnwTable.find("tr").length;

    var src = '';

    for (var i = 0; i < length; i++) {

        var path = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DDAttachmentPath + ")").text();
        var fileType = path.slice((Math.max(0, path.lastIndexOf(".")) || Infinity) + 1);

        if (path.length > 0) {

            var fullpath = serverlink + path;

            if (fileType != 'png' && fileType != 'bmp' && fileType != 'jpg' && fileType != 'jpeg') {

                $(`#nwGridCon-nwData tr:eq(${i})`).find(`td:eq(${SPR_DDView}) a`).attr({ "href": fullpath, "title": "\'Download\'", "download": "" });

            } else {

                $('.op-img').attr('src', fullpath);
            }

            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DDView + ")").removeClass("nwGButton")
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DDView + ")").removeClass("btnMaylaman")
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DDView + ")").addClass("btnMaylaman")
        }
        else {

            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DDView + ")").removeClass("btnMaylaman")
        }
    }
}

$(document).on('click', '.nwBtnDownload', function () {

    var filename = $("#nwGridCon tbody tr:eq(" + crnwTR.index() + ") td:eq(" + SPR_DDAttachmentPath + ")").text()
    var fileType = filename.slice((Math.max(0, filename.lastIndexOf(".")) || Infinity) + 1);
    var src = '';
    $('.op-img').attr('src', '');

    if (filename == "") {
        MessageBox("No Attachment found", "Document Details");
        src = defaultimage;
    } else {

        var linkcat = "";
        var tempindex = crnwTR.index();
        var path = "";
        var serverlink = $("#txtserverlink").val();

        path = "\\" + filename;

        if (filename != "") {
            linkcat = serverlink + path;
            src = linkcat;
        }

        if (fileType != 'png' && fileType != 'bmp' && fileType != 'jpg' && fileType != 'jpeg') {

            $(`#nwGridCon-nwData tr:eq(${tempindex})`).find(`td:eq(${SPR_DDView}) a`).attr({ "href": linkcat, "title": "\'Download\'", "download": "" });

        } else {

            $('.op-img').attr('src', src);
            nwPopupForm_ShowModal("frmOPImage");
        }
    }
})