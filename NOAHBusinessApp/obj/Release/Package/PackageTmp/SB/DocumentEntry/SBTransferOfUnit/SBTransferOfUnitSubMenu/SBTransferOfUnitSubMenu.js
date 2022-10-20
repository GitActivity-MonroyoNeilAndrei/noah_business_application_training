
let StartIndex = 0,
    SPR_ProjectCode = StartIndex,
    SPR_ProjectDescription = ++StartIndex,
    SPR_Block = ++StartIndex,
    SPR_Lot = ++StartIndex,
    SPR_Customer = ++StartIndex,
    SPR_HoldingDate = ++StartIndex,
    SPR_HoldingExpiryDate = ++StartIndex,
    SPR_QueueNo = ++StartIndex,
    SPR_Age = ++StartIndex,
    SPR_TransferOfUnit = ++StartIndex;

var nwGridMainCon_Book;
var nwGridMainCon_Sheet;

const modaltitle = "Transfer Of Unit";

function func_Reload() {

    LoadStringsCases();
    crnwTagSingleBind = true;

    crLnk = "SBTransferOfUnit/SBTransferOfUnitSubMenu/SBTransferOfUnitSubMenu_Gateway";
    crLnkGateKey = "SBTransferOfUnitSubMenu";

    $t().onReload();

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    DisableFields();

    //if (getParameterByName("unitC") != "") {
    //    Refresh();
    //}

    //$("#txtRefHoldTrans").val(getParameterByName("unitC"));
    //nwParameter_Add("docstat", getParameterByName("docstat"));

    if (getParameterByName("docstatus") != "")
    {
        $("#docstat").val(getParameterByName("docstatus"));
    }


    return isContinue;
}

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    func_Toolbox_Clear();
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Would you like to save the current record(s)?", modaltitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Would you like to delete the current record(s)?", modaltitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    nwLoading_Start("xLoading", crLoadingHTML);
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
    parent_MessageBoxQuestionToolBox("Would you like to process the current record(s)?", modaltitle, "", indef, enume);
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
//function cust_GetPara() {
//    $t().getAddtoListFilters();
//}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    nwLoading_Start("xLoading", crLoadingHTML);
    cust_GetPara();
    RefreshData();
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("xLoading", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollectionEmpty", false);
}

function getLookupData(idnum, index) {
    var data = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idnum + ")").find("td:eq(" + (index) + ")").text();
    return data;
}

function Lookup_DoneFunction(idName, idNum) {

}

//function func_LookUpInitialize(idName) {
//    if (idName === "Customer" || idName === "CustomerClassification") {
//        $t().getAddtoListFilters();
//    }
//}

function EnableFields() {
    $('#lugLocAccForms').enable(true);
    $('#lugReTranUnit').enable(true);
    $('#lugNewUnit').enable(true);
    $('#lugRefHoldTrans').enable(true);
    $('#txtRemarks').enable(true);

    $('#txtDocNo').enable(false);
    $('#txtDocDate').enable(false);
    $('#txtDocStatus').enable(false);
    $('#txtReasDis').enable(false);
    $('#txtRemDis').enable(false);


}

function DisableFields() {
    $('#lugLocAccForms').enable(false);
    $('#lugReTranUnit').enable(false);
    $('#lugNewUnit').enable(false);
    $('#lugRefHoldTrans').enable(false);
    $('#txtRemarks').enable(false);

    $('#txtDocNo').enable(false);
    $('#txtDocDate').enable(false);
    $('#txtDocStatus').enable(false);
    $('#txtReasDis').enable(false);
    $('#txtRemDis').enable(false);

    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
}

function EnableFieldsDone() {//Binding Done
    $('#lugLocAccForms').enable(true);
    $('#lugReTranUnit').enable(true);
    $('#lugNewUnit').enable(true);
    $('#lugRefHoldTrans').enable(true);
    $('#txtRemarks').enable(true);

    $('#txtDocNo').enable(false);
    $('#txtDocDate').enable(false);
    $('#txtDocStatus').enable(false);
    $('#txtReasDis').enable(false);
    $('#txtRemDis').enable(false);

    $("#noah-webui-Toolbox").bindingNew().visible(true);
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);

}


function DisableFieldsEmpty() {

    $('#lugLocAccForms').enable(false);
    $('#lugReTranUnit').enable(false);
    $('#lugNewUnit').enable(false);
    $('#lugRefHoldTrans').enable(false);
    $('#txtRemarks').enable(false);

    $('#txtDocNo').enable(false);
    $('#txtDocDate').enable(false);
    $('#txtDocStatus').enable(false);
    $('#txtReasDis').enable(false);
    $('#txtRemDis').enable(false);

    $("#noah-webui-Toolbox").bindingNew().visible(true);
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    $("#noah-webui-Toolbox").bindingRefresh().visible(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
}

function RefreshData() {

    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);

    //var TotalRecords = $('div.BN-record span').text();
    //if (TotalRecords === 'of 0')
    //    DisableFieldsEmpty();
    //else
    //    EnableFieldsDone();

}

function ClearFields() {
    $('#lugLocAccForms').val("")
    $('#lugReTranUnit').val("")
    $('#lugNewUnit').val("")
    $('#lugRefHoldTrans').val("")
    $('#txtRemarks').val("")

    $('#txtDocNo').val("")
    $('#txtDocDate').val("")
    $('#txtDocStatus').val("")
    $('#txtReasDis').val("")
    $('#txtRemDis').val("")
}

function nwgrid_PaginationNavDone(gridID) {
    if (gridID === "Grid") {
        GridOnLoad();
    }
}

//function nwGrid_AddtoListDoneCustom($id, $this, i) {
//    $t().addtoListDone($id, $this, i);
//}

$(document).on('click', '.btnDetails', function () {
    let nwCustno = $(this).closest("tr").find('td:eq(' + SPR_CustomerCode + ')').text();
    let url = "";

    if (nwCustno !== "") {
        nwCustno = `nwCustno=${nwCustno}`;
        url = `../DataSetup/SBCustomerMasterFile/SBCustomerMasterFile.aspx?${nwCustno}`;
        nwPopupForm_Create("form-Details", true, url);
        nwPopupForm_ShowModal("form-Details");
    }
});

function GridOnLoad() {
    $.each($("#Grid-nwData tbody tr"), function (k, v) {

        let isCheck = $(v).find(`td:eq(${SPR_Deactivate}) input`).prop("checked");

        if (isCheck) {
            $(v).find(`td:eq(${SPR_RsnForDeactivation}) input`).prop("disabled", false);
            $(v).find(`td:eq(${SPR_RsnForDeactivation}) input`).closest('td').attr("style", "background: none");
        } else {
            $(v).find(`td:eq(${SPR_RsnForDeactivation}) input`).prop("disabled", true).val("");
            $(v).find(`td:eq(${SPR_RsnForDeactivation}) input`).closest('td').attr("style", "background: gainsboro");
        }
    });
}

$(document).on("change", "#Grid-nwData tbody tr .nwCheckBox1", function () {
    GridOnLoad();
});

$(document).on("change", ".nwCheckBoxTot1", function () {
    GridOnLoad();
});

//-----------------------------------------------------------------------------------------------------------

$(document).on('click', '#lugCustomer_aspx', function (e) {
    var txt = $(this);
    $("idvallugCustomer_aspx").val() = txt;
});

function func_LookUpInitialize(lookupid) {
    cust_GetPara();
}

function cust_GetPara() {
    //nwParameter_Add("Code", $('#idvallugPayeeTyp').val());
    //nwParameter_Add("txtCode", $('#txtCode').val());
    //nwParameter_Add("Customer", $('#idvallugCustomer_aspx').val());

    //try {
    //    nwParameter_Add_DataSet("conGrid");
    //} catch (ex) {
    //}

}

//new

function cust_GetParaSpread() {
    nwParameter_Add_Spread(nwGridMainCon_Book);
}

function CreatedGridDone() {
    //setTimeout(function () {
    //    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_Details - 1, Spread_ALLROW, "blue");
    //    nwGridMainCon_Book.ActiveSheet.SetTextColor(SPR_Details - 1, Spread_ALLROW, "white");

    ////    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_Details - 1, Spread_ALLROW, "blue");
    ////    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_Details - 1, Spread_ALLROW, "blue");
    ////    //var Gridrows = nwGridMainCon_Book.ActiveSheet.GetMaxRow();

    ////    //for (var y = 11; y <= Gridrows; y++) {
    ////    //    var transaction = nwGridMainCon_Book.ActiveSheet.GetText(, y) || "";
    ////    //    if (transaction != "") {

    ////    //        nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_Details - 1, y, "green");

    ////    //        var hasatt = nwGridMainCon_Book.ActiveSheet.GetText(SPR_HASATT - 1, y) || "";
    ////    //        if (hasatt == "1") {
    ////    //            nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_BTNRVWATTACH - 1, y, "green");
    ////    //        } else {
    ////    //            nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_BTNRVWATTACH - 1, y, "gainsboro");
    ////    //        }
    ////    //    } else {
    ////    //        break;
    ////    //    }
    ////    //}
    //}, 100);
}

function p8Spread_Click(canvasID, row, col) {

    if (canvasID == "conGrid") {
        if (col == (SPR_Details - 1)) {
            let nwCustno = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CustomerCode, row);
            let url = "";

            if (nwCustno !== "") {
                nwCustno = `nwCustno=${nwCustno}`;
                url = `../DataSetup/SBCustomerMasterFile/SBCustomerMasterFile.aspx?${nwCustno}`;
                nwPopupForm_Create("form-Details", true, url);
                nwPopupForm_ShowModal("form-Details");
            }

        }
    }
}

//new functions

$(document).on("click", "#btnReqCompliance", function (e) {

    var trantype = 'HLDEXT';
    var docno = $('#txtTransactionNo').val();
    var status = $('#txtStatusCode').val();
    nwDocno = getParameterByName('refDocno');

    if (status == "3" || nwDocno != "") {
        var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=true";

    } else {
        var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=false";
    }

    nwLoading_Start('btnReqCompliance', crLoadingHTML);
    nwPopupForm_Create("nwPopUpReqComp", true, fullength);
    $('#nwPopUpReqComp .BoxTitle').text("Requirements Compliance");
    $("#nwPopUpReqComp").css({ "min-width": "90%" });
    $("#nwPopUpReqComp").css({ "min-height": "90%" });
    nwPopupForm_ShowModal("nwPopUpReqComp");
    nwLoading_End('btnReqCompliance');

});
