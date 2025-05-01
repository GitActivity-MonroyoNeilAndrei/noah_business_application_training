var nwGrid1_Book;
var nwGrid1_Sheet;

var nwGrid2_Book;
var nwGrid2_Sheet;

var nwGrid3_Book;
var nwGrid3_Sheet;

var nwaccess = "";

function func_Reload() {
    crLnk = GetCurrentURL() + "Company_Gateway";
    crLnkGateKey = "Company";
    crnwTagSingleBind = true;

    var isContinue = true;

    DisableFields();
    init_request();

    nwPopupForm_Create("ccc", true);
    return isContinue;
}

function DisableFields() {
    $("#inCode").enable(false);
    $("#inDesc").enable(false);
    $('#settingstabs').enable(false);
    $('#lugCode').enable(false);
    $('#addmodule').enable(false);
    $('#copymodule').enable(false);
    $('#addmoduleweb').enable(false);
    $('#copymoduleweb').enable(false);
    $('#adduser').enable(false);
    $('#copyuser').enable(false);
    $('#nwGrid1').enable(false);
    $('#nwGrid2').enable(false);
    $('#nwGrid3').enable(false);
    $('#nwGrid4').enable(false);

    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);

}

$(document).on("click", "#Button2", function () {
    nwPopupForm_ShowModal("ccc");

    return false;
});

////////////////////////// TOol Box

$(function () {
    nwPanelTab_Create("settingstabs");
});

function func_ToolboxADD(indef, enume) {
    var isContinue = true;

    Clear_Footer();
    ClearFields();
    EnableFields();

    return isContinue;
}

function ClearFields() {
    $("#inCode").val("");
    $("#inDesc").val("");
    $("#inCode").attr("disabled", false);
    $("#inDesc").attr("disabled", false);
    $("#idvallugCode").val("");
    $("#descvallugCode").val("");
    $("#inCode").focus();

    $("#history_switch").enable(false);
    $('#chkBox').prop('checked', true);
}

function EnableFields() {
    $("#inCode").enable(true);
    $("#inDesc").enable(true);
    $('#settingstabs').enable(true);
    $('#lugCode').enable(true);
    $('#addmodule').enable(true);
    $('#copymodule').enable(true);
    $('#addmoduleweb').enable(true);
    $('#copymoduleweb').enable(true);
    $('#adduser').enable(true);
    $('#copyuser').enable(true);
    $('#nwGrid1').enable(true);
    $('#nwGrid2').enable(true);
    $('#nwGrid3').enable(true);
    $('#nwGrid4').enable(true);
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    parent_MessageBoxQuestionToolBox("Would you like to save the current record?", "Company", "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Would you like to delete the current record?", "Company", "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;

    cust_GetPara();
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
    get_parameters_default();
    nwParameter_Add("inCode", $('#inCode').val());
    nwParameter_Add("inDesc", $('#inDesc').val());
    nwParameter_Add("nwaccess", nwaccess);
    nwParameter_Add("idvallugCode", $("#idvallugCode").val());

}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;

}
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    EnablefieldsDone();
    
    nwLoading_Start("actBindCollection", crLoadingHTML);
    func_ActionDriven("actBindCollection", false);

}

function EnablefieldsDone() {
    $('#settingstabs').enable(true);
    $('#lugCode').enable(true);
    $('#inDesc').enable(true);

    $("#inCode").enable(false);
    $("#inDesc").enable(true);
    $('#lugCode').enable(false);
    $('#addmodule').enable(true);
    $('#copymodule').enable(true);
    $('#addmoduleweb').enable(true);
    $('#copymoduleweb').enable(true);
    $('#adduser').enable(true);
    $('#copyuser').enable(true);
    $('#nwGrid1').enable(true);
    $('#nwGrid2').enable(true);
    $('#nwGrid3').enable(true);
    $('#nwGrid4').enable(true);

}


///////////////////////////////////////

function Lookup_DoneFunction(idName, idNum) {
    //alert(idName);
    if (idName == 'toolboxInquire') {
        // cust_GetPara();
        //func_ActionDriven("actBindCollection", false);
    }

    else if (idName == 'lug_grid2') {
        crnwTR.find('td:eq(2)').text($('#menuCreatorContainer .tablecontainter tr:eq(1) td:eq(2)').text());
    }

    else if (idName == 'copymodule') {
        cust_GetPara();
        nwParameter_Add("copyCode", $('#menuCreatorContainer .tablecontainter tr:eq("' + idNum + '") td:eq(0)').text());
        nwLoading_Start("actLoadGrid", crLoadingHTML);
        func_ActionDriven("actLoadGrid", false);
    }
    else if (idName == 'copyuser') {
        cust_GetPara();
        nwParameter_Add("CopyCompany", $('#menuCreatorContainer .tablecontainter tr:eq("' + idNum + '") td:eq(0)').text());
        nwLoading_Start("actLoadGrid3", crLoadingHTML);
        func_ActionDriven("actLoadGrid3", false);
    }
    else if (idName == 'copyuserweb') {
        cust_GetPara();
        nwParameter_Add("copymoduleweb", $('#menuCreatorContainer .tablecontainter tr:eq("' + idNum + '") td:eq(0)').text());
        nwLoading_Start("actLoadGrid2", crLoadingHTML);
        func_ActionDriven("actLoadGrid2", false);
    } else if (idName == 'lugCode') {
        // alert($('#dimTableLookUp tr:eq(1) td:eq(2)').text());
        //        
        //        if($('#dimTableLookUp tr:eq(0) td:eq(0)').text() == "-"){
        //             $("#idvallugCode").val("");
        //             $("#descvallugCode").val("");
        //        }
    }
    else if (dimP == "lugCode") {

        if ($('#inCode').val() == "") {
            nwLoading_Start("actpromp", false);
            func_ActionDriven("actpromp", false);
            $("#idvallugCode").val("");
            $("#descvallugCode").val("");
        }
    }


}




function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {


    //alert(addtoListTableRec);
    //alert(addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').html());

    if (nwGridID == "Grid2" || nwGridID == "nwGrid2") {
        crnwTable = $("#Grid2 .tblGridBody");
        var count = crnwTable.find("tr").length;
        if (count <= 0) {
            func_nwGrid_AddRow("nwGrid2");
        }
        var value1 = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
        var value2 = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

        var value3 = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
        var value4 = addtoListTableRec.find('tr:eq(' + index + ') td:eq(4)').text();

        var isValid = nwLib.nwTempTable_Column_ValueExist(nwGridID, 2, value1);

        if (isValid == false) {
            crnwTRtemp.find('td:eq(2)').text(value1); crnwTRtemp.find('td:eq(3)').text(value2);
            crnwTRtemp.find('td:eq(4)').text(value3); crnwTRtemp.find('td:eq(5)').text(value4);
        } else { crnwTRtemp = null; }

        checknull("Grid2");

    }
    else if (nwGridID == "Grid1" || nwGridID == "nwGrid1") {


        var value3 = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
        var value4 = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

        var isValid = nwLib.nwTempTable_Column_ValueExist(nwGridID, 2, value3);
        if (isValid == false) { crnwTRtemp.find('td:eq(3)').text(value4); crnwTRtemp.find('td:eq(2)').text(value3); } else { crnwTRtemp = null; }
        checknull("Grid1");
    }

    else if (nwGridID == "Grid3" || nwGridID == "nwGrid3") {

        var value3 = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
        var value4 = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

        var isValid = nwLib.nwTempTable_Column_ValueExist(nwGridID, 2, value3);
        if (isValid == false) { crnwTRtemp.find('td:eq(3)').text(value4); crnwTRtemp.find('td:eq(2)').text(value3); } else { crnwTRtemp = null; }

        checknull("Grid3");


    }
    return crnwTRtemp;
}


function func_LookUpInitialize(dimP) {

    var isContinue = true;

    setgridfilterModule();
    nwParameter_Add("Modulefilter", Modulefilter);

    nwParameter_Add("inCode", $('#inCode').val());

    $("#menuCreatorContainer").removeClass("nwaddmodule");
    if (dimP == "addmodule") {


        cust_GetPara();
        //  func_LookUpName("Add Module(desktop)");
        $("#menuCreatorContainer").addClass("nwaddmodule");

    } else if (dimP == "lugCode") {

        if ($('#inCode').val() == "" && $('#idvallugCode').val() != "") {
            nwLoading_Start("actpromp", false);
            func_ActionDriven("actpromp", false);
            isContinue = false;
        } else {
            isContinue = true;
        }
    }
    else if (dimP == "addmodule") {
        nwParameter_Add_Table("adduser", false);
    }

    setgridfilter();
    nwParameter_Add("filter", filter);
    nwParameter_Add("Company", $('#inCode').val());


    return isContinue;
}

function nwGrid_AddtoListDoneCustom(nwGridID, addtoListTableRec) {
    if (nwGridID == "addmodule" || 1 == 1) {

    }
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

    if (nwobjID == "Grid1") {
        //alert(crnwTD.index());
        if (crnwTD.index() == 2) {
            //            var selectedInput = "adduser";
            //            lookUpCustomize(selectedInput, 2);
        }
    }

    else if (nwobjID == "Grid2") {
        if (crnwTD.index() == 2) {
            //            var selectedInput = "addmodule";
            //            lookUpCustomize(selectedInput, 2);
        }
    }
}


function checkduplicate(gridID, valuetocheck, columnindex) {
    crnwTable = $("#" + gridID + " .tblGridBody");
    var temp_table = crnwTable;
    var rowcount = temp_table.find("tr").length;
    var xc = 0;
    for (var i = 0; i <= rowcount; i++) {
        var xy = crnwTable.find("tr:eq(" + i + ") td:eq(" + columnindex + ") ").text()
        if (xy == valuetocheck) {
            crnwTRtemp = null;
            break;
        } else {
            xc++;
        }

    }
    return xc;
}


function func_nwGrid_DeleteFinal() {
    if (crnwTable.find("tr").length <= 0)
        func_nwGrid_AddRow(crnwTable.parents(".nwGrid").parent().attr("id"));

}

/////////////

//var something = 999;
//var something_cachedValue = something;



function msgBoxContainerQuestionF(genID, answer) {
    //alert(genID + " = " + answer)
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

function check_duplicate(addtoListTableRec) {
    crnwTable = $("#nwGrid2 .tblGridBody");

    var temp_table = crnwTable;
    var rowcount = temp_table.find("tr").length;
    var isTerminate = false;
    var rowcount2 = addtoListTableRec.find("tr").length;

    for (var i = 0 ; i <= rowcount; i++) {
        for (var i2 = 0; i2 <= rowcount2; i2++) {
            //alert(crnwTable.find("tr:eq(" + i + ") td:eq(2) button").text() + "|||/n" + $('#dimTableLookUp tr:eq(0) td:eq(0)').text());
            //            alert(crnwTable.find("tr:eq(" + i + ") td:eq(2)").text() + "=="+ 
            //               addtoListTableRec.find('tr:eq(' + i2 + ') td:eq(1)').text());

            if (crnwTable.find("tr:eq(" + i + ") td:eq(2) ").text() ==
               addtoListTableRec.find('tr:eq(' + i2 + ') td:eq(1)').text()
               ) {
                isTerminate = true;
                break;
            }

            if (isTerminate) break;
        }
    }
    return isTerminate;
}


$(document).on("click", "button", function () {
    return false;

});

$(document).on("click", "#addmodule", function () {
    if ($('#inCode').val() == "") { nwLoading_Start("actpromp", false); func_ActionDriven("actpromp", false); } else {
        var selectedInput = "addmodule";
        //crnwTR = $("#Grid2 .tblGridBody tr:eq(0)");
        //crnwTD = $("#Grid2 .tblGridBody tr:eq(0) td:eq(2)");
        //crnwTable = $("#Grid2 .tblGridBody");
        //crnwTableCon = $("#Grid2.nwGrid");
        lookUpCustomize(selectedInput, 2,"", true);
    }
});


$(document).on("click", "#btnHistory", function (e) {
    if ($('#chkBox').prop('checked')) {
        nwParameter_Add("code", $('#inCode').val());
    } else {
        nwParameter_Add("code", '');
    }
    nwLoading_Start("actLoadMainHistorical", crLoadingHTML);


    func_ActionDriven("actLoadMainHistorical");
    return false;
});

$(document).on("click", "#addmoduleweb", function () {
    if ($('#inCode').val() == "") { nwLoading_Start("actpromp", false); func_ActionDriven("actpromp", false); } else {
        var selectedInput = "addmoduleweb";
        var xindex = 0;

        try {
            if (crnwTR.parents("#Grid3").attr("id") == "Grid3")
                xindex = crnwTR.index();
            else
                xindex = 0;//($("#Grid3 .tblGridBody tr").length - 1);

        } catch (err) {
            xindex = 0;//($("#Grid3 .tblGridBody tr").length - 1);
        }

        crnwTR = $("#Grid3 .tblGridBody tr:eq(" + xindex + ")");
        crnwTD = $("#Grid3 .tblGridBody tr:eq(" + xindex + ") td:eq(2)");
        crnwTable = $("#Grid3 .tblGridBody");

        setgridfilterModule();
        nwParameter_Add("Modulefilter", Modulefilter);

        crnwTableCon = $("#Grid3.nwGrid");
        lookUpCustomize(selectedInput, 2);
    }


});

$(document).on("click", "#adduser", function () {

    //setgridfilter();
    nwParameter_Add("filter", filter);
    nwParameter_Add("Company", $('#inCode').val());

    if ($('#inCode').val() == "") { nwLoading_Start("actpromp", false); func_ActionDriven("actpromp", false); } else {
        var selectedInput = "adduser";
        crnwTR = $("#Grid1 .tblGridBody tr:eq(0)");
        crnwTD = $("#Grid1 .tblGridBody tr:eq(0) td:eq(2)");
        crnwTable = $("#Grid1 .tblGridBody");
        crnwTableCon = $("#Grid1.nwGrid");
        lookUpCustomize(selectedInput, 2);
    }

});

$(document).on("click", "#copymodule", function () {
    if ($('#inCode').val() == "") { nwLoading_Start("actpromp", false); func_ActionDriven("actpromp", false); } else {
        nwParameter_Add("inCode", $('#inCode').val());
        var selectedInput = "copymodule";
        lookUpCustomize(selectedInput, 1);
    }
});

$(document).on("click", "#copyuser", function () {
    if ($('#inCode').val() == "") { nwLoading_Start("actpromp", false); func_ActionDriven("actpromp", false); } else {
        nwParameter_Add("inCode", $('#inCode').val());
        var selectedInput = "copyuser";
        lookUpCustomize(selectedInput, 1);
    }
});

$(document).on("click", "#copymoduleweb", function () {

    nwParameter_Add("inCode", $('#inCode').val());
    var selectedInput = "copyuserweb";
    lookUpCustomize(selectedInput, 1);
});


$(document).on("change", "#Custom", function () {
    customtxt = $('#Custom option:selected').text();
    cutomvalue = $('#Custom option:selected').val();



    var isValid = nwLib.nwTempTable_Column_ValueExist("#nwGrid3", 2, cutomvalue);
    if (isValid == false) {
        func_nwGrid_AddRow("nwGrid3");
        if (cutomvalue != "" || customtxt != "") {
            crnwTable = $("#Grid3 .tblGridBody");
            var rowcount = crnwTable.find("tr").length;
            if (rowcount == 0) {
            } else { rowcount = rowcount - 1; }
            crnwTable.find('tr:eq(' + rowcount + ') td:eq(2) ').text(cutomvalue);
            crnwTable.find('tr:eq(' + rowcount + ') td:eq(3) ').text(customtxt);
        } else { }
    }
});


function checknull(grid) {

    //var grid = nwGrid1_Book.ActiveSheet;

    //var data;
    //var xrow = Grid.CellSelected.row - 1

    //var xcol = Grid.ActiveSheet.GetMaxCol();
    //for (var i = 0; i <= xrow + 1; i++) {
    //    for (var a = 2; a < xcol; a++) {
    //        data = Grid.GetText(a, i);
    //        if (data.replace(" ", "") == "") {
    //            //crnwTable.find('tr:eq(' + i + ') td:eq(' + a + ')').addClass("nqShow");
    //        } else {

    //        }
    //    }
    //}
};


function Clear_Footer() {
    $('#nwtxt_RecUser').text("");
    $('#nwtxt_RecDate').text("");
    $('#nwtxt_ModUser').text("");
    $('#nwtxt_ModDate').text("");
}




$(document).on("focusout", "#inCode", function () {
    if (/^[a-zA-Z0-9- ]*$/.test($(this).val()) == false) {
        $(this).val("");
    }
});

var filter = "";
function setgridfilter() {
    filter = "";

    crnwTable = $("#nwGrid1 .tblGridBody");
    var itemcount = crnwTable.find("tr").length;
    for (var i = 0; i < itemcount; i++) {
        var code = crnwTable.find("tr:eq(" + i + ")").find("td:eq(2)").text();
        if (code.length > 0) {
            if (filter == "") {
                filter = "" + code + "";
            }
            else {
                filter += "," + code + "";
            }
        }
    }

}



var Modulefilter = "";
function setgridfilterModule() {
    Modulefilter = "";

    crnwTable = $("#nwGrid3 .tblGridBody");
    var itemcount = crnwTable.find("tr").length;
    for (var i = 0; i < itemcount; i++) {
        var code = crnwTable.find("tr:eq(" + i + ")").find("td:eq(2)").text();
        if (code.length > 0) {
            if (Modulefilter == "") {
                Modulefilter = "" + code + "";
            }
            else {
                Modulefilter += "," + code + "";
            }
        }
    }

}


$(document).on("click", "#nkTabs_b_2", function (e) {
    setTimeout(function () {
        nwGrid1_Book.ActiveSheet.Refresh();
        nwGrid1_Book.ActiveSheet.SetText2(0, Spread_ALLCOL, "Delete");
        nwGrid1_Book.ActiveSheet.SetTextAlign(0, Spread_ALLCOL, "Center");
        nwGrid1_Book.ActiveSheet.SetTextColor(0, Spread_ALLCOL, "white");
        nwGrid1_Book.ActiveSheet.SetBold(0, Spread_ALLCOL, true);
    }, 100);
});

function GridStyle() {
    setTimeout(function () {
        nwGrid2_Book.ActiveSheet.Refresh();
        nwGrid2_Book.ActiveSheet.SetText2(0, Spread_ALLCOL, "Delete");
        nwGrid2_Book.ActiveSheet.SetTextAlign(0, Spread_ALLCOL, "Center");
        nwGrid2_Book.ActiveSheet.SetTextColor(0, Spread_ALLCOL, "white");
        nwGrid2_Book.ActiveSheet.SetBold(0, Spread_ALLCOL, true);

        nwGrid3_Book.ActiveSheet.SetText2(0, Spread_ALLCOL, "Delete");
        nwGrid3_Book.ActiveSheet.SetTextAlign(0, Spread_ALLCOL, "Center");
        nwGrid3_Book.ActiveSheet.SetTextColor(0, Spread_ALLCOL, "white");
        nwGrid3_Book.ActiveSheet.SetBold(0, Spread_ALLCOL, true);

    }, 100);
}