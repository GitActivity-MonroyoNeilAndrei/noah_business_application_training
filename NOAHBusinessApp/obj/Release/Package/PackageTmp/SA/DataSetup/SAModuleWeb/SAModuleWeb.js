
function func_Reload() {

    crLnk = "../SAModuleWeb/SAModuleWeb_Gateway";
    crLnkGateKey = "SAModuleWeb";


    var isContinue = true;
    DisableFields();
    init_request();


    return isContinue;
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
 Clear_Footer();
    $("#inCode").focus();
    //isContinue = false;

    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to save", "", "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to Delete?", "", "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    EnableFields();
    $("#inCode").attr("disabled", true);
    //    parent_MessageBoxQuestionToolBox("Do you want to Refresh", "", "", indef, enume);
    //    isContinue = false;
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
    return isContinue;
}

///////////////////// Bind tool
function cust_GetPara() {
    nwParameter_Add("inCode", $('#inCode').val());
    nwParameter_Add("inDesc", $('#inDesc').val());
    nwParameter_Add("inAppName", $('#inAppName').val());
    nwParameter_Add("sel_AppVer", $('#sel_AppVer').val());
}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    $("#inCode").prop("disabled", true);
    $('#inDesc').focus();
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    func_ActionDriven("actBindCollection", false);
    $("#inDesc").focus();
}






///////////////////////////////////////

function Lookup_DoneFunction(idName, idNum) {
    if (idName == 'toolboxInquire') {
        cust_GetPara();
        func_ActionDriven("actBindCollection", false);
    }

    else if (idName == 'lug_grid1') {
        crnwTR.find('td:eq(2) button').text($('#dimTableLookUp tr:eq(0) td:eq(0)').text());
    }
}



function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
    // alert(addtoListTableRec.html());
    // alert(addtoListTableRec.find('tr:eq(' + index + ') td:eq(0)').html());
    crnwTRtemp.find('td:eq(2) button').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text());
    crnwTRtemp.find('td:eq(3) input').val(addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text());
    return crnwTRtemp;
}


function nwGrdi_Change(nwobj, nwobjrow, nwobjitem) {
    // alert(nwobj.attr('id'));
    //  nwobj.hide();
    var ss = nwobjitem.find('#selecta').val();
    nwobjrow.css('background-color', 'black');
    //  nwobjrow.find('td').css('background-color', 'rgba(0,0,0,0.1)');
    //$(nwobjrow).css('background-color', 'black');
}
function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {
    var ss = nwobjitem.find('#selecta').val();
    /// nwobjrow.css('background-color', 'black');
    // alert(crnwTD.attr('class'));
}


function nwGrid_tdClick(nwobjID) {

    if (nwobjID == "grid1") {
        //alert(crnwTD.index());
        if (crnwTD.index() == 2) {
            var selectedInput = "lug_grid1";
            lookUpCustomize(selectedInput, 1);
        }
    }

    else if (nwobjID == "grid2") {
        if (crnwTD.index() == 2) {
            var selectedInput = "lug_grid2";
            lookUpCustomize(selectedInput, 2);
        }
    }
}




/////////////

//var something = 999;
//var something_cachedValue = something;



function msgBoxContainerQuestionF(genID, answer) {
    if (genID == 1) {
        if (answer == "Yes") {
            func_saveCheck();
        }
        else {
            func_saveContinue();
        }
    }
    else if (genID == 2) {
        if (answer == "Yes") func_saveContinue();
    }

}



function DisableFields(){
    $("#inCode").prop("disabled", true);
    $("#inDesc").prop("disabled", true);
    $("#inAppName").prop("disabled", true);
    $("#sel_AppVer").prop("disabled", true);
}

function EnableFields(){
    $("#inCode").prop("disabled", false);
    $("#inDesc").prop("disabled", false);
    $("#inAppName").prop("disabled", false);
    $("#sel_AppVer").prop("disabled", false);
}

function ClearFields(){
    $("#inCode").val("");
    $("#inDesc").val("");
    $("#inAppName").val("");
    $("#sel_AppVer").val("");
}

 function Clear_Footer(){ 
$('#nwtxt_RecUser').text("");
$('#nwtxt_RecDate').text("");
$('#nwtxt_ModUser').text("");
$('#nwtxt_ModDate').text("");
}