var SPR_STARTINDEX = 1,
    SPR_ITEMCODE = SPR_STARTINDEX,
    SPR_ITEMDESC = ++SPR_STARTINDEX,
    SPR_ITEMGROUPTYPE = ++SPR_STARTINDEX,
    SPR_PURCHASEREQNO = ++SPR_STARTINDEX,
    SPR_PURCHASEREQRECDATE = ++SPR_STARTINDEX,
    SPR_PURCHASEREQAPPDATE = ++SPR_STARTINDEX,
    SPR_PURCHASEREQSUBDATE = ++SPR_STARTINDEX,
    SPR_BUDGET = ++SPR_STARTINDEX,
    SPR_PROPERTYNAME = ++SPR_STARTINDEX,
    SPR_REQUESTOR = ++SPR_STARTINDEX,
    SPR_REMARKS = ++SPR_STARTINDEX;

var nwGridCon_Book;
var nwGridCon_Sheet;

function func_Reload() {
    
    crLnk = GetCurrentURL() + "POPendingPRRprt_Gateway";
    crLnkGateKey = "POPendingPRRprt";
    //crnwTagSingleBind = true;

    $("#settingstabs").loadAddtoList({ list: ["Property", "Item", "Item Group Type"], icon: true });

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;

    DisableFields();

    return isContinue;
}

////////////////////////// TOol Box
//pageTitle = 'Pending PR Report';

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    cust_GetPara()
    EnableFields();
    ClearFields();
    func_Toolbox_Clear();
    newFunction();
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", pageTitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", pageTitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    nwLoading_Start("xRefreshBtn", crLoadingHTML);
    isRefreshed = true;
    refreshFunction();
    RefreshData();
    return isContinue;
}

function func_ToolboxInquire(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxProcess(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to process the current record?", pageTitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxImport(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxExport(indef, enume) {
    var isContinue = true;
    fn_ExportGrid("nwGridCon");
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
    nwParameter_Add("txtServerDate", $('#txtServerDate').val());

    nwParameter_Add("txtCreateDateFrom", $('#txtCreateDateFrom').val());
    nwParameter_Add("txtCreateDateTo", $('#txtCreateDateTo').val());
    nwParameter_Add("txtSubmitDateFrom", $('#txtSubmitDateFrom').val());
    nwParameter_Add("txtSubmitDateTo", $('#txtSubmitDateTo').val());
    nwParameter_Add("txtApproveDateFrom", $('#txtApproveDateFrom').val());
    nwParameter_Add("txtApproveDateTo", $('#txtApproveDateTo').val());

    $t().getAddtoListFilters();

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
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("actBindCollectionEmpty", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollectionEmpty", false);
}

///////////////////////////////////////

function EnableFields() {
    $('#settingstabs').enable(true);

    $('#txtCreateDateFrom').enable(true);
    $('#txtCreateDateTo').enable(true);
    $('#txtSubmitDateFrom').enable(true);
    $('#txtSubmitDateTo').enable(true);
    $('#txtApproveDateFrom').enable(true);
    $('#txtApproveDateTo').enable(true);



    $('#nwGridCon').enable(true);
}

function DisableFields() {
    $('#settingstabs').enable(true);

    $('#txtCreateDateFrom').enable(true);
    $('#txtCreateDateTo').enable(true);
    $('#txtSubmitDateFrom').enable(true);
    $('#txtSubmitDateTo').enable(true);
    $('#txtApproveDateFrom').enable(true);
    $('#txtApproveDateTo').enable(true);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingImport().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingPrint().enable(false);


    $("#noah-webui-Toolbox").bindingSave().visible(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    $("#noah-webui-Toolbox").bindingInquire().visible(false);
    $("#noah-webui-Toolbox").bindingProcess().visible(false);
    $("#noah-webui-Toolbox").bindingImport().visible(false);
    $("#noah-webui-Toolbox").bindingPrint().visible(false);

    $('#nwGridCon').enable(true);
}

function EnableFieldsDone() {//Binding Done

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingImport().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingPrint().enable(false);
}


function DisableFieldsEmpty() {

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingImport().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingPrint().enable(false);
}

function RefreshData() {
    EnableFields();
    EnableFieldsDone();
}

function ClearFields() {
    $('.clrtxt').val("");
    $('.clrtxt2').val("");
    $('.innertext').text("");
}

function nwGrid_AddtoListDoneCustom($id, $this, i) {
    $t().addtoListDone($id, $this, i);
}

function newFunction() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var maxRow = Grid.GetMaxRow();
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    Grid.RowDelete(10, maxRow)
    Grid.RowAdd(10, 5);
}

function CreateGridDone() {
    var Grid = nwGridCon_Book.ActiveSheet;
    Grid.ActiveSheet.SetTextAlign((SPR_BUDGET - 1), Spread_ALLROW, 'right');
}

function refreshFunction() {
    $("#noah-webui-Toolbox").bindingExport().enable(true);
}

function nwCustFuncDate($this) {
    var id = $this.attr("id");
    var cleanid = $this.attr("id").replace("To", "").replace("From", "");
    var from = ($('#' + cleanid + "From").val());
    var to = ($('#' + cleanid + "To").val());
    var finalval = "";

    if ((new Date(to) < new Date(from) || to == "") && id.includes("To")) {
        finalval = ($this.val() == "" ? from : to);
        $('#' + cleanid + "From").val(finalval);
        $('#' + cleanid + "To").val(finalval);
    }

    else if ((new Date(from) > new Date(to) || from == "") && id.includes("From")) {
        finalval = ($this.val() == "" ? to : from);
        $('#' + cleanid + "From").val(finalval);
        $('#' + cleanid + "To").val(finalval);
    }
}

$(document).on("change", ".nwDatePick", function (e) {
    nwCustFuncDate($(this));
});

function GenerateLookupListDataHTML(xvalue, xdisplay) {
    return '<div class="spantext" nwcode="' + xvalue + '" style="display:inline-block;margin-right: 3px;margin-bottom: 3px;">' + xdisplay + '<span class="classx">x</span></div>';
};

function GetAddtoListFilters() {
    var len = $('div.atlContainer').length;
    for (var i = 0; i < len; i++) {
        var xkey = $('div.atlContainer:eq(' + i + ')').attr('nwtype');
        var xvalue = "";
        var lencode = $('.atlContainer:eq(' + i + ')').find('div.spantext').length;
        for (var j = 0; j < lencode; j++) {
            if (xvalue != "") xvalue += "|";
            xvalue += $('.atlContainer:eq(' + i + ') div.spantext:eq(' + j + ')').attr('nwcode');
        }

        nwParameter_Add(xkey, xvalue);
    }
};


$(document).on("click", ".btnGetlookup", function () {
    crnwTableCon = null; // if grid is click 
    var xtype = $(this).attr("nwtype");
    var selectedInput = xtype;
    GetAddtoListFilters();
    lookUpCustomize(selectedInput, 2);

});


$(document).on("click", ".btnClearList", function () {
    crnwTableCon = null; // if grid is click 
    var xtype = $(this).attr("nwtype");
    $('div.atlContainer[nwtype=' + xtype + ']').find(".innertext").html("");

});

//function nwGrid_AddtoListDoneCustom(nwGridID, addtoListTableRec, index) {

//}

$(document).on('click', 'span.classx', function () {
    $(this).closest('div.spantext').remove();
});

function nwGrid_AddtoListDoneCustom(verID, addtoListTableRec, index) {
    var xChecked = "";
    var xvalue = "";
    var xdisplay = "";
    xChecked = addtoListTableRec.find('tr:eq(' + index + ')').find('input[type="checkbox"]').prop('checked');
    xvalue = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
    xdisplay = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

    if ($('div.atlContainer[nwtype="' + verID + '"]').find('div.spantext[nwcode="' + xvalue + '"]').length < 1) {
        if (xChecked) {

            $('div.atlContainer[nwtype="' + verID + '"] div.innertext').append(GenerateLookupListDataHTML(xvalue, xdisplay));
        }

    }
}