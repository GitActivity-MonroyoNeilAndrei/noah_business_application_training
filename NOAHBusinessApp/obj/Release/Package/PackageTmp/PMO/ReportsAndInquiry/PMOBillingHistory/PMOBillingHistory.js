
let StartIndex = 1,
    SPR_BILLDOCNO = StartIndex,
    SPR_DATE = ++StartIndex,
    SPR_AMOUNT = ++StartIndex,
    SPR_STATUS = ++StartIndex,
    SPR_VIEW = ++StartIndex;
    //SPR_DOWNLOAD = ++StartIndex,
    //SPR_DLVIEW = ++StartIndex;

var nwGridMainCon_Book;
var nwGridMainCon_Sheet;

const modaltitle = "Billing History";

var color = '#008080';

let $DateToday = "";

function func_Reload() {

    LoadStringsCases();
    //crnwTagSingleBind = true;
    crLnk = GetCurrentURL() + "PMOBillingHistory_Gateway";
    //crLnk = "../PMOBillingHistory/PMOBillingHistory_Gateway"; //For Local
    crLnkGateKey = "PMOBillingHistory";

    

  
    //var fullength = "SBCustomerMasterFile";
    //let nwCustno = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_VIEW - 1, row);
    //let nwCustno = 'C-00000000000003';
    //var fullength = "SBCustomerMasterFile?nwCustno=" + nwCustno;

    //nwPopupForm_Create("form-Details", true, fullength);

    nwParameter_Add("nwtku", getParameterByName("nwtku"));
    func_ActionDriven("actFirstLoad", false);

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    //DisableFields();


    
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
    nwParameter_Add("nwtku", getParameterByName("nwtku"));
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
    $("#dateFilterFrom").enable(true);
    $("#dateFilterTo").enable(true);

}

function DisableFields() {
    $("#dateFilterFrom").enable(false);
    $("#dateFilterTo").enable(false);
}

function EnableFieldsDone() {//Binding Done
    $("#dateFilterFrom").enable(true);
    $("#dateFilterTo").enable(true);

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
    let nwCustno = $(this).closest("tr").find('td:eq(' + SPR_VIEW + ')').text();
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

        let isCheck = $(v).find(`td:eq(${SPR_BILLDOCNO}) input`).prop("checked");

        if (isCheck) {
            $(v).find(`td:eq(${SPR_AMOUNT}) input`).prop("disabled", false);
            $(v).find(`td:eq(${SPR_AMOUNT}) input`).closest('td').attr("style", "background: none");
        } else {
            $(v).find(`td:eq(${SPR_AMOUNT}) input`).prop("disabled", true).val("");
            $(v).find(`td:eq(${SPR_AMOUNT}) input`).closest('td').attr("style", "background: gainsboro");
        }
    });
}

$(document).on("change", "#Grid-nwData tbody tr .nwCheckBox1", function () {
    GridOnLoad();
});

$(document).on("change", ".nwCheckBoxTot1", function () {
    GridOnLoad();
});

$(document).on("change", "#statusFilter", function () {
    nwParameter_Add("nwtku", getParameterByName("nwtku"));
    func_ActionDriven("actRefresh", true);
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
    
    nwParameter_Add("dateFilterTo", $('#dateFilterTo').val());
    nwParameter_Add("dateFilterFrom", $('#dateFilterFrom').val());
    nwParameter_Add("statusFilter", $('#statusFilter').selectedIndex());

    try {
        nwParameter_Add_DataSet("conGrid");
    } catch (ex) {
    }

}

//new

function cust_GetParaSpread() {
    nwParameter_Add_Spread(nwGridMainCon_Book);
}

//$(document).ready(function () {
//    var width = $(window).width();
//    let viewColor = 'transparent';
   
//    if (width < 551) {
//        viewColor = 'white';
//    }

//    nwGridMainCon_Book.ActiveSheet.SetTextColor(SPR_VIEW - 1, Spread_ALLROW, viewColor);
//});

function CreatedGridDone() {
    setTimeout(function () {
        nwGridMainCon_Book.ActiveSheet.RenderStatus = false;
        nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_VIEW - 1, Spread_ALLROW, "#1974D1");
        nwGridMainCon_Book.ActiveSheet.SetTextColor(SPR_VIEW - 1, Spread_ALLROW, "white");
        nwGridMainCon_Book.ActiveSheet.SetText2(SPR_VIEW - 1, Spread_ALLROW, "View");
        nwGridMainCon_Book.SetThemes(P8Themes.FANCY);
        nwGridMainCon_Book.ActiveSheet.SetObjectType(SPR_VIEW - 1, Spread_ALLCOL, "buttonflat");
        nwGridMainCon_Book.ActiveSheet.RenderStatus = true;

        nwGridMainCon_Book.ActiveSheet.SetTextAlign(SPR_VIEW - 1, Spread_ALLROW, "CENTER");
    }, 1);
}

function p8Spread_Click(canvasID, row, col) {

    if (canvasID == "conGrid") {
        if (col == (SPR_VIEW - 1)) {
            let nwCustno = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_BILLDOCNO - 1, row);

            if (nwCustno !== "") {

                $("#txtvalue").val(nwCustno);

                var fullength = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_VIEW - 1, row);
                nwPopupForm_Create("form-Details", true, fullength);

                $('#form-Details .BoxTitle').text("View Details");

                nwPopupForm_ShowModal("form-Details");
      
            }

        }
        //else if (col == (SPR_DOWNLOAD - 1)) {
        //    let nwdl = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_BILLDOCNO - 1, row);

        //    if (nwdl !== "") {
        //        $("#txtDL").val(nwdl);

        //        //downloadFile(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_DOWNLOAD - 1, row), nwGridMainCon_Book.ActiveSheet.GetValue(SPR_DLVIEW - 1, row));


        //        //testing download 1
        //        var link = document.createElement('a');
        //        //link.setAttribute("download", nwGridMainCon_Book.ActiveSheet.GetValue(SPR_BILLDOCNO - 1, row));
        //        link.href = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_DOWNLOAD - 1, row);
        //        link.target = "_blank";
        //        link.setAttribute("download", nwGridMainCon_Book.ActiveSheet.GetValue(SPR_DLVIEW - 1, row));
        //        document.body.appendChild(link);
        //        link.click();
        //        ////link.remove();
                

        //        //var filepath = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_DOWNLOAD - 1, row);
        //        //var filename = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_DLVIEW - 1, row);

        //        //download(filepath, filename);
                
        //        //testing download4
        //        //const filename = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_DLVIEW - 1, row);
        //        //const url = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_DOWNLOAD - 1, row);
        //        //fetch(url)
        //        //.then(res=>blob())
        //        //.then(blob => {
        //        //    const aElement = document.createElement('a');
        //        //              aElement.setAttribute('download', filename);
        //        //              const href = URL.createObjectURL(res);
        //        //              aElement.href = href;
        //        //              // aElement.setAttribute('href', href);
        //        //              aElement.setAttribute('target', '_blank');
        //        //              aElement.click();
        //        //              URL.revokeObjectURL(href);
        //        //})
                
        //    }
        //}
    }
}


//testing download3
//function download(filepath, filename) {
//    var link = document.createElement('a');

//    link.setAttribute('href', filepath);
//    link.setAttribute('download', filename);
//    link.style.display = 'none';
//    document.body.appendChild(link);
//    link.click();
//    link.body.removeChild(link);
//}

//testing download 2
//function downloadFile(url, fileName) {
//    fetch(url, { method: 'GET', mode: 'no-cors' })
//      .then(res => res.blob({ type: 'application/pdf' }))
//      .then(res => {
//          const aElement = document.createElement('a');
//          aElement.setAttribute('download', fileName);
//          const href = URL.createObjectURL(res);
//          aElement.href = href;
//          // aElement.setAttribute('href', href);
//          aElement.setAttribute('target', '_blank');
//          aElement.click();
//          URL.revokeObjectURL(href);
//      });
//};

$(document).on('change', '#dateFilterFrom', function () {
    var effdate = $(this).val();
    var end = $("#dateFilterTo").val();

    var xbool2 = nwDateMaskCheck($(this).val());
    if (Date.parse(effdate) > Date.parse(end)) {
        MessageBox("Cannot proceed. Date From should not be earlier than the Date To.\n", modaltitle, "error");
        $(this).val("");

        return false;
    }
    if (xbool2 == false) {
        $(this).val("");
        $(this).focus();
    }

    nwParameter_Add("nwtku", getParameterByName("nwtku"));
    func_ActionDriven("actRefresh", true);
});

$(document).on('change', '#dateFilterTo', function () {
    var enddate = $(this).val();
    var startdate = $("#dateFilterFrom").val();

    var xbool2 = nwDateMaskCheck($(this).val());

    if (Date.parse(enddate) < Date.parse(startdate)) {
        MessageBox("Cannot proceed. Date To should not be earlier than Date From.\n", modaltitle, "error");
        $(this).val("");
        return false;
    }

    if (startdate == "") {
        MessageBox("Cannot proceed. Start date cannot be empty\n", modaltitle, "error");
        $(this).val("");
        return false;
    }

    if (xbool2 == false) {
        $(this).val("");
        $(this).focus();
    }

    nwParameter_Add("nwtku", getParameterByName("nwtku"));
    func_ActionDriven("actRefresh", true);

});