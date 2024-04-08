NaviationFlag = true;
var nwaccess = "";

var nwGrid1_Book;
var nwGrid1_Sheet;


//function func_Reload()
//{
//    crnwTagSingleBind = true;
//    crLnk = GetCurrentURL() + "NOAHSpreadDesigner_Gateway";
//    crLnkGateKey = "NOAHSpreadDesigner";




//    var isContinue = true;
   
//    init_request();
//    return isContinue;
//}


function p8Spread_Focus(canvasID, row, col) {
    var isContinue = true;
    console.log("p8Spread_Focus " + canvasID + " " + row + " " + col);

    //Formula Bar
    $("#txtFomulaBar").val(mSpreadBook.ActiveSheet.GetFormula());

    //DataType Format
    var DataType = mSpreadBook.ActiveSheet.GetDataType();
    var CurrencyCode = mSpreadBook.ActiveSheet.GetCurrencyCode();
    if (DataType == "currency" && !p8Spread_IsNull(CurrencyCode)) {
        $("#nwe-g-style").val("accounting");
    } else {
        $("#nwe-g-style").val(DataType);
    }

    $("#mt_tabledesign").show()
   
    try { isContinue = p8Spread_Focus_MenuItem(canvasID, row, col) } catch (ex) { }
    return isContinue;
}

function p8Spread_Click(canvasID, row, col) {
    var isContinue = true;
    console.log("p8Spread_Click " + canvasID + " " + row + " " + col);

    //var Grid = mSpreadBook.ActiveSheet;
    //var item = Grid.GetSelectedIndexes();
    //var row = p8Spread_GetJsonValue(item, "row");
    //var row2 = p8Spread_GetJsonValue(item, "row2");
    //var col = p8Spread_GetJsonValue(item, "col");
    //var col2 = p8Spread_GetJsonValue(item, "col2");
    NOAHSpread_SetSelectBar(col, row)
    NOAHSpread_SetFormat();
    if (_NOAHSpread_EnableTableChecker) {
        var TableConfig = mSpreadBook.ActiveSheet.NOAHSpread_GetTableList(col, row);
        var hastable = 0;
        try { hastable = TableConfig.length; } catch (ex) { }
        if (hastable > 0) {
            $("#mt_tabledesign").removeClass("tbhide");
            $("#chkshowcolumn").prop("checked", TableConfig[0].showcolumn);
            $("#chkshowcolumnbanded").prop("checked", TableConfig[0].showcolumnbanded);
            $("#chkshowrowbanded").prop("checked", TableConfig[0].showrowbanded);
        } else {
            var isselected = $("#mt_tabledesign").hasClass("selected");
            if (isselected) {
                $("#mt_home").click();
            }
            $("#mt_tabledesign").addClass("tbhide")
        }
    }
    try { isContinue = p8Spread_Click_MenuItem(canvasID, row, col) } catch (ex) { }
    return isContinue;
}
function p8Spread_DblClick(canvasID, row, col) {
    var isContinue = true;
    console.log("p8Spread_DblClick " + canvasID + " " + row + " " + col);
    try { isContinue = p8Spread_DblClick_MenuItem(canvasID, row, col) } catch (ex) { }
     return isContinue;
}
     
function p8Spread_Change(canvasID, row, col) {
    var isContinue = true;
    console.log("p8Spread_Change " + canvasID + " " + row + " " + col);

    //NOAHSpread_AutoFormat(mSpreadBook, row, col);
    
    try { isContinue = p8Spread_Change_MenuItem(canvasID, row, col) } catch (ex) { }
    return isContinue;
 }

$(document).on("input", "#txtFomulaBar", function () {
    var value = $("#txtFomulaBar").val();
    mSpreadBook.ActiveSheet.SetText(undefined, undefined, value);
});
//$(document).on("keypress", "#txtFomulaBar", function (e) {
//    if (e.which == 13) {
//        var value = $("#txtFomulaBar").val();
//        mSpreadBook.ActiveSheet.SetText(undefined, undefined, value);
//    }
//});

function NOAHSpread_SetSelectBar(col, row) {
    if (col != -1) {
        var cell = p8_NumberToCell(col + 1) + (row + 1);
        $("#txtSelectBar").val(cell);
    }
}

$(document).on("change", "#txtSelectBar", function () {
    var value = $(this).val();
    var index =  mSpreadBook.ActiveSheet.SetSelectedCell(value);

    NOAHSpread_SetSelectBar(index.col, index.row)
});


function NOAHSpread_AutoFormat(canvasID, row, col) {
    //var val = canvasID.ActiveSheet.GetValue();
    //val = parseFloat(val);
    //if (!isNaN(val)) {
    //    val *= 100
    //    Grid.SetValue(col, row, val);
    //    Grid.SetDataType(col, row, "percent");
    //}
}

function NOAHSpread_SetFormat() {
    if ($("#fp").hasClass("active")) {
        $("#fp").removeClass("active")
        var Grid = mSpreadBook.ActiveSheet;
        var item = Grid.GetSelectedIndexes();
        var row = p8Spread_GetJsonValue(item, "row");
        var row2 = p8Spread_GetJsonValue(item, "row2");
        var col = p8Spread_GetJsonValue(item, "col");
        var col2 = p8Spread_GetJsonValue(item, "col2");
        var Data = JSON.parse($("#fpData").val());

        var len = 0
        try { len = Data.length; } catch (ex) { }
        for (var i = 0; i < len; i++) {
            var item = Data[i];
            var itemrow = p8Spread_GetJsonValue(item, "row")
            var itemcol = p8Spread_GetJsonValue(item, "col")
            var itemdata = p8Spread_GetJsonValue(item, "data")
            var currcol = itemcol + col
            var currrow = itemrow + row
            Grid.SetConfigData(currcol, currrow, itemdata);
        }
    }
}


function func_RowInsert(index, isbottom) {
    var json;
    try { json = func_RowInsert_MenuItem(index, isbottom) } catch (ex) { }
    return json;
}
function func_RowDelete(index) {
    var json;
    try { json = func_RowDelete_MenuItem(index) } catch (ex) { }
    return json;
}


function func_ColumnInsert(index, isright) {
    var json;
    try { json = func_ColumnInsert_MenuItem(index, isright) } catch (ex) { }
    return json;
}


function func_ColumnDelete(index) {
    var json;
    try { json = func_ColumnDelete_MenuItem(index) } catch (ex) { }
    return json;
}

function NOAHSpread_LoadRecentDone() {
    _NSTemplateList = _sfJSONConvertKeysToLowerCase(_NSTemplateList);
    NOAHSpread_LoadRecent();
}
function NOAHSpread_LoadRecent() {
    try {
        var strTemplate = "";
        for (var i = 0; i < _NSTemplateList.length; i++) {
            var item = _NSTemplateList[i];
            var code = p8Spread_GetJsonValue(item, "code");
            var description = p8Spread_GetJsonValue(item, "description");
            var image = p8Spread_GetJsonValue(item, "image");
            strTemplate += `<div class='card docx' style='display: inline-block;' repID='${code}'><div class='box' style='background-image:url(${image}); background-size: 100%;  background-size: 102% 119%;'><div class='boxblocker'></div></div><div class='cl_RepID'>${code}</div><div class='title'>${description}</div></div>`;
        }
        $("#card-parentRecent").html(strTemplate);
    } catch (ex) { }
}

function NOAHSpread_LoadRecent_Add() {
    try {
        _NSTemplateListTemp = _sfJSONConvertKeysToLowerCase(_NSTemplateListTemp);
        var strTemplate = "";
        for (var i = 0; i < _NSTemplateListTemp.length; i++) {
            var item = _NSTemplateListTemp[i];
            var code = p8Spread_GetJsonValue(item, "code");
            $("#card-parentRecent").find(`[repid="${code}"].card.docx`).remove();
            var description = p8Spread_GetJsonValue(item, "description");
            var image = p8Spread_GetJsonValue(item, "image");
            strTemplate += `<div class='card docx' style='display: inline-block;' repID='${code}'><div class='box' style='background-image:url(${image}); background-size: 100%;  background-size: 102% 119%;'><div class='boxblocker'></div></div><div class='cl_RepID'>${code}</div><div class='title'>${description}</div></div>`;
        }
        $("#card-parentRecent").prepend(strTemplate);
    } catch (ex) { }
    _NSTemplateListTemp = [];
}

