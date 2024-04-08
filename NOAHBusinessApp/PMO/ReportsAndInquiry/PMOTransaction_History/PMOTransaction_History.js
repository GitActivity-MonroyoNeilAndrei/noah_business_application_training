

let         StartIndex = 1,
            SPR_ReqDocNo = StartIndex,
            SPR_ReqType = ++StartIndex,
            SPR_Request = ++StartIndex,
            SPR_ProposedDt = ++StartIndex,
            SPR_BasisBill = ++StartIndex,
            SPR_NetAmt = ++StartIndex,
            SPR_TranDate = ++StartIndex,
            SPR_Stats = ++StartIndex,
            SPR_View = ++StartIndex;



//if (pop == "True") { }
//else {
//    $('#okay-button').removeClass('nwHide');
//}

function func_Reload() {
    crLnk = GetCurrentURL() + "PMOTransaction_History_Gateway";
    crLnkGateKey = "PMOTransaction_History";

    nwParameter_Add("nwtku", getParameterByName("nwtku"));
    func_ActionDriven("actGetReqs", true);

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
    isContinue = false;
    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
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

function cust_GetPara() {
    nwParameter_Add("cmbTranType", $("#cmbTranType").val());
    nwParameter_Add("cmbRequest", $("#cmbRequest").val());

    let status = $("#cmbStatus").find(":selected").text();

    nwParameter_Add("cmbStat", status + "");
    nwParameter_Add("nwtku", getParameterByName("nwtku"));
}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {

}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("xLoading", crLoadingHTML);
    func_ActionDriven("actBindCollectionEmpty", false);
}

function Lookup_DoneFunction(idName, idNum) {
}

function func_LookUpInitialize(idName) {
    
}

function EnableFields() {
    $("#txtUnitNo").enable(false);
    $("#txtAccNo").enable(false);
}

function DisableFields() {
    $("#txtUnitNo").enable(false);
    $("#txtAccNo").enable(false);
    $(".nwDatePick").attr("Placeholder", "mm/dd/yyyy");
}

function EnableFieldsDone() {
    //Binding Done
    $("#txtUnitNo").enable(false);
    $("#txtAccNo").enable(false);

}

function DisableFieldsEmpty() {
    $("#txtUnitNo").enable(false);
    $("#txtAccNo").enable(false);

}

function ClearFields() {
    
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords === 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}

$(document).on("change", "#dpAccNo", function (e) {
    func_ActionDriven("actGetUnitNo", true);
});

$(document).on("change", "#cmbTranType", function (e) {
    cust_GetPara();
    func_ActionDriven("actGetReqs", true);
});

$(document).on("change", "#cmbRequest", function (e) {
    cust_GetPara();
    func_ActionDriven("actFilterReqs", true);
});

$(document).on("change", "#cmbStatus", function (e) {
    cust_GetPara();
    func_ActionDriven("actFilterReqs", true);
});

function CreatedGridDone() {
    setTimeout(function () {
        nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_View - 1, Spread_ALLROW, "#1974D1");
        nwGridMainCon_Book.ActiveSheet.SetTextColor(SPR_View - 1, Spread_ALLROW, "white");

        nwGridMainCon_Book.ActiveSheet.RenderStatus = false;
        nwGridMainCon_Book.ActiveSheet.SetText2(SPR_View - 1, Spread_ALLROW, "View");
        nwGridMainCon_Book.ActiveSheet.SetTextAlign(SPR_View - 1, Spread_ALLROW, "CENTER");
        nwGridMainCon_Book.SetThemes(P8Themes.FANCY);
        nwGridMainCon_Book.ActiveSheet.SetObjectType(SPR_View - 1, Spread_ALLCOL, "buttonflat");
        nwGridMainCon_Book.ActiveSheet.RenderStatus = true;
    }, 100);
}


function p8Spread_Click(canvasID, row, col) {

    if (canvasID == "TranConGrid") {
        if (col == (SPR_View - 1)) {
            let nwCustno = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_ReqDocNo - 1, row);

            if (nwCustno !== "") {
                let nwReqType = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_ReqType - 1, row);

                if (nwReqType == 'Billable') {
                    let nwStatus = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_Stats - 1, row);

                    if (nwStatus == 'Completed') {
                        nwParameter_Add("nwCustCode", 'BILLINV');
                        nwParameter_Add("nwtku", getParameterByName("nwtku"));
                        nwParameter_Add("nwCustno", nwCustno);
                        func_ActionDriven("actViewForms", true);
                    } else {
                        //redirect to other forms
                        let nwtku = getParameterByName("nwtku");

                        var fullength = GetCurrentURL() + "../PMORequestEntry?docno=" + nwCustno + "&isView=true";

                        nwPopupForm_Create("popupservice", true, fullength);
                        nwPopupForm_ShowModal("popupservice");
                    }

                } else {
                    let nwStatus = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_Stats - 1, row);

                    let nwDocNo = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_ReqDocNo - 1, row);

                    if (nwStatus.toUpperCase() == "FOR APPROVAL" || nwStatus.toUpperCase() == "ONGOING" || nwStatus.toUpperCase() == "COMPLETED") {
                        nwDocNo = nwDocNo.substr(4, 6);

                        nwParameter_Add("nwCustCode", nwDocNo);
                        nwParameter_Add("nwtku", getParameterByName("nwtku"));
                        nwParameter_Add("nwCustno", nwCustno);

                        func_ActionDriven("actViewForms", true);
                    }
                    else
                    {
                        let tran = nwGridMainCon_Book.ActiveSheet.GetValue(SPR_Request - 1, row);
                        let nwtku = getParameterByName("nwtku");

                        var fullength = '';

                        if (tran.toUpperCase() == "WORK PERMIT") {
                            fullength = GetCurrentURL() + "../PMOOtherRequest?docno=" + nwCustno + "&isView=true&tt=WRKPMT";
                        } else {
                            fullength = GetCurrentURL() + "../PMOOtherRequest?docno=" + nwCustno + "&isView=true";
                        }

                        //  window.location.href = fullength;
                        nwPopupForm_Create("popupservice", true, fullength);
                        nwPopupForm_ShowModal("popupservice");
                    }
                    
                }

            }
        }

        
    }
}


//function _xLogs(msg) {
//    console.log(msg);
//}

function p8Spread_Created(canvasID) {
    if (canvasID == "TranConGrid") {
        nwGridMainCon_Book.ActiveSheet.SetColumnToolTip(SPR_ReqDocNo, "Transaction number of Service request also contains the information of the data");
        nwGridMainCon_Book.ActiveSheet.SetColumnToolTip(SPR_ReqType, "Request Type Service request also contains the information of the data");
    }


}