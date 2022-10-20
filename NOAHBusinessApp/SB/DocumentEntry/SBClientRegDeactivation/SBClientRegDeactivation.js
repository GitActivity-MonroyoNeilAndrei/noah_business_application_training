
let StartIndex = 1,
    SPR_Deactivate = StartIndex,
    SPR_Details = ++StartIndex,
    SPR_RsnForDeactivation = ++StartIndex,
    SPR_CustomerCode = ++StartIndex,
    SPR_CustomerName = ++StartIndex,
    SPR_CustomerClass = ++StartIndex,
    SPR_DateCreated = ++StartIndex,
    SPR_AgeInDays = ++StartIndex,
    SPR_CreatedBy = ++StartIndex;

var nwGridMainCon_Book;
var nwGridMainCon_Sheet;

const modaltitle = "Client Registration Deactivation";

let $DateToday = "";

function func_Reload() {

    LoadStringsCases();
    //crnwTagSingleBind = true;

    crLnk = "../SBClientRegDeactivation/SBClientRegDeactivation_Gateway";
    crLnkGateKey = "SBClientRegDeactivation";

    //$("#settingstabs").loadAddtoList({ list: ["Customer", "Customer Classification"], icon: true });
    //$t().onReload();

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    DisableFields();

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
    cust_GetPara(); nwLoading_Start("xLoading", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {

    nwLoading_Start("xLoading", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollectionEmpty", false);
}

function Lookup_DoneFunction(idName, idNum) {

}

//function func_LookUpInitialize(idName) {
//    if (idName === "Customer" || idName === "CustomerClassification") {
//        $t().getAddtoListFilters();
//    }
//}

function EnableFields() {
}

function DisableFields() {
}

function EnableFieldsDone() {//Binding Done
}


function DisableFieldsEmpty() {
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords === 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();

}

function ClearFields() {
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
    nwParameter_Add("Customer", $('#idvallugCustomer_aspx').val());

}

//new

function cust_GetParaSpread() {
    nwParameter_Add_Spread(nwGridMainCon_Book);
}

function CreatedGridDone() {
    setTimeout(function () {
        nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_Details - 1, Spread_ALLROW, "blue");
        nwGridMainCon_Book.ActiveSheet.SetTextColor(SPR_Details - 1, Spread_ALLROW, "white");

    //    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_Details - 1, Spread_ALLROW, "blue");
    //    nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_Details - 1, Spread_ALLROW, "blue");
    //    //var Gridrows = nwGridMainCon_Book.ActiveSheet.GetMaxRow();

    //    //for (var y = 11; y <= Gridrows; y++) {
    //    //    var transaction = nwGridMainCon_Book.ActiveSheet.GetText(, y) || "";
    //    //    if (transaction != "") {

    //    //        nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_Details - 1, y, "green");

    //    //        var hasatt = nwGridMainCon_Book.ActiveSheet.GetText(SPR_HASATT - 1, y) || "";
    //    //        if (hasatt == "1") {
    //    //            nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_BTNRVWATTACH - 1, y, "green");
    //    //        } else {
    //    //            nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_BTNRVWATTACH - 1, y, "gainsboro");
    //    //        }
    //    //    } else {
    //    //        break;
    //    //    }
    //    //}
    }, 100);
}

function p8Spread_Click(canvasID, row, col) {

    if (canvasID == "conGrid") {
        if (col == (SPR_Details - 1)) {
            let nwCustno = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_CustomerCode - 1, row);
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