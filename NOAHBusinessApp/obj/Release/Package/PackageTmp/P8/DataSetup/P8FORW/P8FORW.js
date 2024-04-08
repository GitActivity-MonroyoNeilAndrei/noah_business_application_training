var pageTitle = "FORW";
var _canvasID;
var _row;
var _col;
var _jsonnwGridCon_datasourcecolumn = [];

_NOAHSpread_MenuTab.push(
    { id: "mt_file", show: true },
    { id: "mt_home", show: true },
    { id: "mt_formulas", show: true },
    { id: "mt_view", show: true },

)

var _p8forwdefdata = {
    defdatatype : "text",
    defdatatypedesc: "Text",
    defoperation: "equal",
    defoperationdesc: "equal",
}
$(document).ready(function () {
        $(document).find('#pdlgHomeLoad').fadeIn();
});

function func_Reload() {
    //$("#p8icon-ani-box").show();
    //setTimeout(function () {
    //    $(document).find('#pdlgHomeLoad').fadeIn();
    //    setTimeout(function () {
    //        $(document).find('.p8icon-ani-box').fadeOut(1000);
    //    }, 1000);
    //}, 4600);

    crLnk = GetCurrentURL() + "P8FORW_Gateway";
    crLnkGateKey = "P8FORW";
    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    //$("#txt-p8forw-code").val(getParameterByName("fid"));

    //isView = getParameterByName("v").toString().toLowerCase()== "yes" ? true : false;
    nwPopupForm_Create("frm-popup-p8forw-vwdatasource", true);
    nwPopupForm_Create("frm-popup-p8forw-vwdatasource-adddata", true);
    nwPopupForm_Create("frm-popup-p8forw-vwdatasource-ps", true);
    nwPopupForm_Create("frm-popup-p8forw-vwdatasourceps-adddata", true);
    nwPopupForm_Create("frm-popup-p8forw-vwdatasource-psc", true);
    nwPopupForm_Create("frm-popup-p8forw-vwdatasource-r", true);
    

    //nwPopupForm_Create("frm-popup-p8forw-vwdatasource-psl", true);

    var textTitle = "FORW";
    var classLogo = "logo";
    var classLogoImg = "p8";
        $("#sd-headerbuttons").append('<div class="nwe-btn ' + classLogo + '" data-content="customToolbox"><span class="' + classLogoImg + '">' + textTitle + '</span></div>');

    $("#titlehome").text(textTitle);
    _NOAHSpread_EnableTableChecker = true;
    //setTimeout(function () {
    //        $('[data-content="customToolbox"].nwe-btn.' + classLogo).click();
    //}, 2000);
    //setTimeout(function () {
    //    $(document).find('.p8icon-ani-box').fadeOut(600);
    //    $(document).find('#pdlgHomeLoad').fadeIn();
    //}, 5600);

    return isContinue;
}

//standard function
function isNull(id) {
    if (id == '' || id == null || id == undefined || typeof id == 'undefined' || typeof variable == 'object') {
        return true;
    }
    else {
        return false;
    }
}

function actforw_mainload() {
    func_ActionDriven("actforw_mainload", false);
}

function forw_separateAlphabetAndNumber(cellReference) {
    // Find the index where the first numeric character appears
    var index = cellReference.search(/\d/);
    // Separate the alphabet and number based on the index
    var alphabetPart = cellReference.slice(0, index);
    var numberPart = cellReference.slice(index);

    return [alphabetPart, numberPart];
}

function forw_listCellsBetween(cellReference) {
    var cellReference_parts = cellReference.split(":");
    var from = cellReference_parts[0]; // "test"
    var to = cellReference_parts[1]; // "test1"

    var [from_alphabet, from_number] = forw_separateAlphabetAndNumber(from);
    var [to_alphabet, to_number] = forw_separateAlphabetAndNumber(to);
    var cellList = [];
    for (var row = from_number; row <= to_number; row++) {
        for (var col = from_alphabet.charCodeAt(0); col <= to_alphabet.charCodeAt(0); col++) {
            cellList.push(String.fromCharCode(col) + row);
        }
    }
    return cellList;
}
function forw_listCells(cellReference) {
    var cellreference_data = cellReference.split(",");
    var cellList = [];
    for (var i = 0; i < cellreference_data.length; i++) {
        var cell = cellreference_data[i];
        if(cell.includes(":")){
            var celllist_t = forw_listCellsBetween(cell);
            cellList = [...cellList,...celllist_t]
        }else{
            cellList.push(cell);
        }

    }
    return cellList;
}

function p8forw_isValidCellRangeFormat(cellRange) {
    // Define a regular expression pattern to match valid cell range formats
    var pattern = /^[A-Za-z]+\d+(:[A-Za-z]+\d+)?$/;
    // Test if the cell range format matches the pattern
    if (pattern.test(cellRange)) {
        // If the format is valid, check if it needs to be swapped
        var cells = cellRange.split(':');
        if (cells.length === 2) {
            var cell1 = cells[0];
            var cell2 = cells[1];
            // Extract row and column numbers
            var row1 = parseInt(cell1.match(/\d+/)[0]);
            var row2 = parseInt(cell2.match(/\d+/)[0]);
            // If row1 > row2, swap the cells to ensure row1 <= row2
            if (row1 > row2) {
                cellRange = cell2 + ':' + cell1;
            }
        }
        return true;
    }
    return false;
}


function cust_GetPara() {
    nwParameter_Add("txt-p8forw-code", $("#txt-p8forw-code").val());
    nwParameter_Add("isNewRow", isNewRow);

    
}

function codelist(Grid, index, param) {
    var list = "";
    var rows = Grid.ActiveSheet.GetMaxRow();
    for (var i = 0; i <= rows; i++) {
        list += Grid.ActiveSheet.GetText(index - 1, i) + '|';
    }
    nwParameter_Add(param, list);
}


function func_WindowCloseTrigger(verID) {
    var isContinue = true;
    
    if (verID == "frm-popup-p8forw-vwdatasource-ps") {
        var Grid = nwGridCon_datasource_Book.ActiveSheet;
        var row = Grid.GetSelectedIndexes().row;
        var col = Grid.GetSelectedIndexes().col;
        _row = row;
        _col = col;
        nwParameter_Add("DataSourceID", Grid.GetText((SPR_DA_DATASOURCEID - 1), row))
        func_ActionDriven("actcolor_datasourceps", false);
    } else  if (verID == "frm-popup-p8forw-vwdatasource-r") {
        var Grid = nwGridCon_datasource_Book.ActiveSheet;
        var row = Grid.GetSelectedIndexes().row;
        var col = Grid.GetSelectedIndexes().col;
        _row = row;
        _col = col;
        nwParameter_Add("DataSourceID", Grid.GetText((SPR_DA_DATASOURCEID - 1), row))
        func_ActionDriven("actcolor_datasourcer", false);
    } else  if (verID == "frm-popup-p8forw-vwdatasource-psc") {
        var Grid = nwGridCon_datasourcepsh_Book.ActiveSheet;
        var row = Grid.GetSelectedIndexes().row;
        var col = Grid.GetSelectedIndexes().col;
        _row = row;
        _col = col;
        nwParameter_Add("SubType", Grid.GetText((SPR_DAPSH_SUBTYPE - 1), row))
        func_ActionDriven("actcolor_datasourcepsh", false);
    }


    
    //else if (verID == "frm-popup-p8forw-vwdatacondition") {
    //    p8forw_datacondition_close();
    //    isContinue = true;
    //}
    return isContinue;
}


function Forw_InitializeSpread(sheet,addrow) {
    sheet.ActiveSheet.RenderStatus = false;

    var Gridrows = sheet.ActiveSheet.GetMaxRow();
    var Gridcols = sheet.ActiveSheet.GetMaxCol();

    for (var i = Gridrows; i >= 0; i--) {
        sheet.ActiveSheet.RowDelete(i);
    }

    for (var y = 0; y < addrow; y++) {
        sheet.ActiveSheet.RowAdd();
    }
    sheet.ActiveSheet.RenderStatus = true;
    sheet.ActiveSheet.Refresh();
}



function ToolLoad(json_forw) {
    var code = $("#txt-p8forw-code").val();
    
    $.each(json_forw, function (i, item) {
        var json = p8Spread_GetJsonValue(item, "json_spread");
        if (!p8Spread_IsNull(json)) {
            mSpreadBook.SetSpreadConfig(json);
        }
        $("#txt-p8forw-desc").val(p8Spread_GetJsonValue(item, "description"))
    });
    setTimeout(function () {
        mSpreadBook.ActiveSheet.RenderStatus = true;
        mSpreadBook.ActiveSheet.Refresh();
    }, 100);
}

function GetNum(val) {
    try {
        val = parseFloat((val).replace(/,/g, "")) || 0;
    } catch (ex) { }
    return val;
}

function SetNum(val, decimal) {
    val = GetNum(val);
    decimal = decimal || 0;

    val = nwc(toFixed(val.toFixed(decimal))).substring(0, 33);
    if (decimal != 0) {
        val = val.includes(".") ? val : val + "." + val.repeat(decimal);
    }
    return val;
}

function nwc(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
function toFixed(x) {
    if (Math.abs(x) < 1.0) {
        var e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10, e - 1);
            x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
        }
    } else {
        var e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10, e);
            x += (new Array(e + 1)).join('0');
        }
    }
    return x;
}

function nwGrid_AddtoListLoaded(canvasID){
    if(canvasID == "nwGridCon_sbevent"){
        p8forw_sbevent_format();
    }
    if(canvasID == "nwGridCon_sbf"){
        formatsqlselectsyntax_sb();
    }
}
function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {

    //if (nwGridID == "nwGridCon_datasource") {
    //    var col = nwGridCon_datasource_Book.ActiveSheet.CellSelected.col - 1;
    //    var row = nwGridCon_datasource_Book.ActiveSheet.CellSelected.row - 1;

    //    if (col == (SPR_DA_TYPE - 1)) {
    //        var type = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
    //        var typedesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
    //        crnwTRtemp[SPR_DA_TYPE - 1] = type;
    //        crnwTRtemp[SPR_DA_TYPEDESC - 1] = typedesc;
    //    } else if (col == (SPR_DA_SOURCE - 1)) {
    //        // type = nwGridCon_datasource_Book.ActiveSheet.GetValue(SPR_DA_TYPE - 1, row);
    //        var name = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
    //        var type = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
    //        var typedesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
    //        var column = addtoListTableRec.find('tr:eq(' + index + ') td:eq(4)').text();

    //        crnwTRtemp[SPR_DA_SOURCE - 1] = name;
    //        crnwTRtemp[SPR_DA_TYPE - 1] = type;
    //        crnwTRtemp[SPR_DA_TYPEDESC - 1] = typedesc;
    //        crnwTRtemp[SPR_DA_COLUMN - 1] = column;
    //    }
    //} 
    if (nwGridID == "nwGridCon_datasourcer") {
        var col = nwGridCon_datasourcer_Book.ActiveSheet.CellSelected.col - 1;
        var row = nwGridCon_datasourcer_Book.ActiveSheet.CellSelected.row - 1;

        if (col == (SPR_DAR_USERDESC - 1)) {
            var code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
            var desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
            crnwTRtemp[SPR_DAR_USER - 1] = code;
            crnwTRtemp[SPR_DAR_USERDESC - 1] = desc;
        } 
    } else if (nwGridID == "nwGridCon_sbevent") {
        var col = nwGridCon_sbevent_Book.ActiveSheet.CellSelected.col - 1;
        var row = nwGridCon_sbevent_Book.ActiveSheet.CellSelected.row - 1;

        if (col == (SPR_SBE_EVENTDESC - 1)) {
            var code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
            var desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
            crnwTRtemp[SPR_SBE_EVENT - 1] = code;
            crnwTRtemp[SPR_SBE_EVENTDESC - 1] = desc;


        } 
    } else if (nwGridID == "nwGridCon_sbf") {
        var col = nwGridCon_sbf_Book.ActiveSheet.CellSelected.col - 1;
        var row = nwGridCon_sbf_Book.ActiveSheet.CellSelected.row - 1;

        if (col == (SPR_SBF_COLUMNDESC - 1)) {
            var code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
            var desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
            crnwTRtemp[SPR_SBF_COLUMN - 1] = code;
            crnwTRtemp[SPR_SBF_COLUMNDESC - 1] = desc;
            crnwTRtemp[SPR_SBF_OPERATION - 1] = _p8forwdefdata.defoperation;
            crnwTRtemp[SPR_SBF_OPERATIONDESC - 1] = _p8forwdefdata.defoperationdesc;
        } 
    }

    //else if (nwGridID == "nwGridCon_dataconditionevent") {
    //    var col = nwGridCon_dataconditionevent_Book.ActiveSheet.CellSelected.col - 1;
    //    var row = nwGridCon_dataconditionevent_Book.ActiveSheet.CellSelected.row - 1;

    //    if (col == (SPR_DCE_EVENTDESC - 1)) {
    //        var code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
    //        var desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
    //        crnwTRtemp[SPR_DCE_EVENT - 1] = code;
    //        crnwTRtemp[SPR_DCE_EVENTDESC - 1] = desc;
    //    } 
    //}else if (nwGridID == "nwGridCon_tableevent") {
    //    var col = nwGridCon_tableevent_Book.ActiveSheet.CellSelected.col - 1;
    //    var row = nwGridCon_tableevent_Book.ActiveSheet.CellSelected.row - 1;

    //    if (col == (SPR_TE_EVENTDESC - 1)) {
    //        var code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
    //        var desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
    //        crnwTRtemp[SPR_TE_EVENT - 1] = code;
    //        crnwTRtemp[SPR_TE_EVENTDESC - 1] = desc;
    //    } 
    //}

    return crnwTRtemp;
}



function p8forw_checktoolbox(col, row){
    try {
        var forwformula = mSpreadBook.ActiveSheet.GetFORWFormula(col, row);
        $("#p8forw-btndatacondition").p8forwhide()
        $("#p8forw-btnlookup").p8forwhide()
        $("#p8forw-btnaddtolist").p8forwhide()
        $("#p8forw-btntable").p8forwhide()
        $("#p8forw-btndrill").p8forwhide()
        $("#p8forw-btnmakecheckbox").p8forwhide()
        $("#p8forw-btnmakebutton").p8forwhide()
        $("#p8forw-btnaddrefreshbutton").p8forwhide()
        $("#p8forw-btnmakeremarks").p8forwhide()
        $("#p8forw-btnmakedate").p8forwhide()

        $("#p8forw-Properties").p8forwhide()

       
        if (forwformula.includes("=FORW_DataCondition")) {
            $("#p8forw-btndatacondition").p8forwshow()
            $("#p8forw-Properties").p8forwshow()
        } else if (forwformula.includes("=FORW_Lookup")) {
            $("#p8forw-btnlookup").p8forwshow()
            $("#p8forw-Properties").p8forwshow()
        } else if (forwformula.includes("=FORW_AddToList")) {
            $("#p8forw-btnaddtolist").p8forwshow()
            $("#p8forw-Properties").p8forwshow()
        }else if (forwformula.includes("=FORW_Table")) {
            $("#p8forw-btntable").p8forwshow()
            $("#p8forw-Properties").p8forwshow()
        } else if (forwformula.includes("=FORW_Drill")) {
            $("#p8forw-btndrill").p8forwshow()
            $("#p8forw-Properties").p8forwshow()
        }  
        else {
            var TableConfig = mSpreadBook.ActiveSheet.NOAHSpread_GetTableList(col, row);
            var hastable = 0;
            try { hastable = TableConfig.length; } catch (ex) { }
            if (hastable > 0) { 
                $("#p8forw-btntable").p8forwshow()
            }
            $("#p8forw-btndatacondition").p8forwshow()
            $("#p8forw-btnlookup").p8forwshow()
            $("#p8forw-btnaddtolist").p8forwshow()
            $("#p8forw-btndrill").p8forwshow()
            $("#p8forw-btnmakecheckbox").p8forwshow()
            $("#p8forw-btnmakebutton").p8forwshow()
            $("#p8forw-btnaddrefreshbutton").p8forwshow()
            $("#p8forw-btnmakeremarks").p8forwshow()
            $("#p8forw-btnmakedate").p8forwshow()
        }
    }catch(ex){}
}

$(document).on("click", "#p8forw-btnProperties", function () {
    try {
        var Grid = mSpreadBook.ActiveSheet;
        var item = Grid.GetSelectedIndexes();
        var row = p8Spread_GetJsonValue(item, "row");
        var row2 = p8Spread_GetJsonValue(item, "row2");
        var col = p8Spread_GetJsonValue(item, "col");
        var col2 = p8Spread_GetJsonValue(item, "col2");
        var forwformula = mSpreadBook.ActiveSheet.GetFORWFormula(col, row);
 
        if (forwformula.includes("=FORW_DataCondition")) {
            var _this = $("#p8forw-btndatacondition")
            p8forw_datacondition_refresh(_this)
        } else if (forwformula.includes("=FORW_Lookup")) {
            var _this = $("#p8forw-btnlookup")
            p8forw_lookup_refresh(_this)
        } else if (forwformula.includes("=FORW_AddToList")) {
          
        }else if (forwformula.includes("=FORW_Table")) {
            var _this = $("#p8forw-btntable")
            p8forw_table_refresh(_this)
        } else if (forwformula.includes("=FORW_Drill")) {
            var _this = $("#p8forw-btndrill")
            p8forw_drill_refresh(_this)
        }  else {
            $("#p8forw-btndatacondition").p8forwshow()
            $("#p8forw-btnlookup").p8forwshow()
            $("#p8forw-btnaddtolist").p8forwshow()
            $("#p8forw-btntable").p8forwshow()
            $("#p8forw-btndrill").p8forwshow()
        }
    }catch(ex){}
});


$.fn.p8forwshow = function() {
    return this.each(function() {
        $(this).addClass("show").removeClass("hide");
    });
};

$.fn.p8forwhide = function() {
    return this.each(function() {
        $(this).addClass("hide").removeClass("show");
    });
};

P8.SpreadSheet.prototype.GetCode = function (c, r) {
    var colcell = p8_NumberToCell(c + 1);
    return this.Data[r][colcell].Code;

}
P8.SpreadSheet.prototype.SetCode = function (c, r, data) {
    var colcell = p8_NumberToCell(c + 1);
    this.Data[r][colcell].Code = data;
}

P8.SpreadSheet.prototype.GetFORWFormula = function (c, r) {
    var colcell = p8_NumberToCell(c + 1);
    return this.Data[r][colcell].FORWFormula || "";

}
P8.SpreadSheet.prototype.SetFORWFormula = function (c, r, data) {
    var colcell = p8_NumberToCell(c + 1);
    this.Data[r][colcell].FORWFormula = data;
}


function deepCopy(originalObject) {
    // Serialize the object to JSON
    var jsonString = JSON.stringify(originalObject);

    // Deserialize the JSON back to an object
    var copy = JSON.parse(jsonString);

    return copy;
}

$(document).on("click", "#p8forw-btnmakedate", function () {
    
    //mSpreadBook.ActiveSheet.SetFormula(colindex,rowindex,"date")

    mSpreadBook.ActiveSheet.SetDataType(undefined, undefined, "date", undefined, undefined)

});

$(document).on("click", "#p8forw-btnmakebutton", function () {
    var col = mSpreadBook.ActiveSheet.CellIndexes.Col;
    var row = mSpreadBook.ActiveSheet.CellIndexes.Row;
    var option ={
        BackgroundColor : "",
        Text :"...",
        TextColor : "white"
    }
    p8forw_AddButton(col,row,option)
});

$(document).on("click", "#p8forw-btnaddrefreshbutton", function () {
    var col = mSpreadBook.ActiveSheet.CellIndexes.Col;
    var row = mSpreadBook.ActiveSheet.CellIndexes.Row;
    var option ={
        BackgroundColor : "Green",
        Text :"Refresh",
        TextColor : "white"
    }
    p8forw_AddButton(col,row,option)
});

function p8forw_AddButton(col,row,option){
    var code = nwRandomString(12);
    var formula = "=FORW_MakeButton({0})";
    var formulacode = formula.replace("{0}", code);
    mSpreadBook.ActiveSheet.SetFORWFormula(col, row, formulacode, "", false)
    mSpreadBook.ActiveSheet.SetCode(col, row, code);

    mSpreadBook.ActiveSheet.SetTemplate(col,row,"button",option);
    mSpreadBook.ActiveSheet.SetDataType(col,row,"button");
    //mSpreadBook.ActiveSheet.SetEnable(col,row,true);
}
$(document).on("click", "#p8forw-btnmakeremarks", function () {
    var col = mSpreadBook.ActiveSheet.CellIndexes.Col;
    var row = mSpreadBook.ActiveSheet.CellIndexes.Row;
    var option ={
        BackgroundColor : "",
        Text :"",
        TextColor : ""
    }
    p8forw_AddRemarks(col,row,option)
});

function p8forw_AddRemarks(col,row,option){
    var code = nwRandomString(12);
    var formula = "=FORW_MakeRemarks({0})";
    var formulacode = formula.replace("{0}", code);
    mSpreadBook.ActiveSheet.SetFORWFormula(col, row, formulacode, "", false)
    mSpreadBook.ActiveSheet.SetCode(col, row, code);

    mSpreadBook.ActiveSheet.SetTemplate(col,row,"remarks",option);
    mSpreadBook.ActiveSheet.SetDataType(col,row,"remarks");

}
function p8forw_savedata_cs() {
    try {
        // Get the original canvas element
        var originalCanvas = document.getElementById('mSpread_vw');

        // Create a new canvas element
        var clonedCanvas = document.createElement('canvas');

        // Set the width and height of the cloned canvas
        var newWidth = 11 * 96; // Convert inches to pixels (assuming 96 pixels per inch)
        var newHeight = 8.5 * 96;
        clonedCanvas.width = newWidth;
        clonedCanvas.height = newHeight;

        // Get the 2D rendering context of the cloned canvas
        var context = clonedCanvas.getContext('2d');

        // Define the portion of the original canvas to copy (adjust these values as needed)
        var sourceX = 0; // Start X-coordinate
        var sourceY = 0; // Start Y-coordinate
        var sourceWidth = 2000; // Width to copy (full width of original canvas)
        var sourceHeight = 2000; // Height to copy (full height of original canvas)

        // Draw the specified portion of the original canvas onto the cloned canvas
        context.drawImage(originalCanvas, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, newWidth, newHeight);
        // Convert the cloned canvas to a base64 image
        var imgsc = clonedCanvas.toDataURL();
        return imgsc;
    } catch (ex) { }
}


function p8forw_savedata(code,description){
    if(isNull(code)){
        code = $("#txt-p8forw-code").val(); 
    }
    if(isNull(description)){
        description = $("#txt-p8forw-desc").val(); 
    }
    var imgsc = p8forw_savedata_cs();
    setTimeout(function () {
        cust_GetPara();
        var jsondata_clone = [];
        var json_spread = mSpreadBook.GetSpreadConfig();
        jsondata_clone.push({
            code: code,
            description: description,
            json_spread: json_spread,
            imgsc: imgsc
        });
        cust_GetPara();
        nwParameter_Add("p8forw_json", JSON.stringify(jsondata_clone))
        func_ActionDriven("actsave_p8forw", false);

    }, 10);

}

$(document).on("click", "#sve", function () {
    //$(this).closest(".p8forw-databindings-dataset").addClass("forw-remove");
    var description = $("#txt-p8forw-desc").val(); 
    if(isNull(description)){
        var msgBox = new GenLib.MessageBoxInput("sve");
        msgBox.message = "Do you want to save the current data?";
        msgBox.title = "FORW";
        msgBox.buttonOk = function () {

            var value = msgBox.InputValue();
            if (!isNull(value)) {
                $("#txt-p8forw-desc").val(value); 
                p8forw_savedata();
                return true;
            } else {
                msgBox.LabelText("Cannot be saved. Template Name is required.");
                return false;
            }
        };
        msgBox.Show();
    }
    else{
        var msgBox = new GenLib.MessageBoxQuestion("sve");
        msgBox.message = "Do you want to save the current data?";
        msgBox.title = "FORW";
        msgBox.buttonYes = function () {
            p8forw_savedata();
            return true;
        };
        msgBox.buttonNo = function () {
            return false;
        };

        msgBox.Show();
    }
    return false;

});



$(document).on("click", "#svea", function () {
    var msgBox = new GenLib.MessageBoxInput("popsvea");
    msgBox.message = "Do you want to save as the current data?";
    msgBox.title = "FORW";
    msgBox.buttonOk = function () {

        var value = msgBox.InputValue();
        if (!isNull(value)) {
            var code = nwRandomString(12);
            var description = value;
            p8forw_savedata(code,description)
            return true;
        } else {
            msgBox.LabelText("Cannot be saved. Template Name is required.");
            return false;
        }
    };
    msgBox.Show();

    return false;
});

$(document).on("click", ".p8forw-sidebar-close", function () {
    //   $("#p8forw-sidebar").p8forwhide();
    $(this).parents(".p8forw-sidebar").p8forwhide();
});



function p8Spread_Change_MenuItem(canvasID, row, col) {

    _canvasID = canvasID;
    _row = row;
    _col = col;
    if (canvasID == "nwGridCon_datasource") {
        if (!$("#nwGridCon_datasource").enable()) {
            return false;
        }
        var Grid = nwGridCon_datasource_Book.ActiveSheet;
        if (Grid.GetBackground((col), row) == "gainsboro") {
            return false;
        }
        if(col == (SPR_DA_SOURCE - 1)){
            var value = Grid.GetText((SPR_DA_SOURCE - 1), row);
            Grid.SetText((SPR_DA_NAME - 1), row,value);
            Grid.SetText((SPR_DA_ISUPDATENEW - 1), row,"1");
        }else  if(col == (SPR_DA_NAME - 1)){
            Grid.SetText((SPR_DA_ISUPDATENEW - 1), row,"1");
        }   
    } 
    else if (canvasID == "nwGridCon_datasourcepsc") {
        if (!$("#nwGridCon_datasourcepsc").enable()) {
            return false;
        }
        var Grid = nwGridCon_datasourcepsc_Book.ActiveSheet;
        if (Grid.GetBackground((col), row) == "gainsboro") {
            return false;
        }
        if(col == (SPR_DAPSC_COLUMN - 1)){
            var column = Grid.GetText((SPR_DAPSC_COLUMN - 1), row);
            var alias = Grid.GetText((SPR_DAPSC_ALIAS - 1), row);
            if(isNull(alias)){
                Grid.SetText((SPR_DAPSC_ALIAS - 1), row,column);
            }
        }
    }
    else  if (canvasID == "nwGridCon_sbevent") {
        if (!$("#nwGridCon_sbevent").enable()) {
            return false;
        }
        var Grid = nwGridCon_sbevent_Book.ActiveSheet;
        if (Grid.GetBackground((col), row) == "gainsboro") {
            return false;
        }
        if (col == (SPR_SBE_CELLREFERENCE - 1)) {
            var cell = Grid.GetText((SPR_SBE_CELLREFERENCE - 1), row);
            var isValid = p8forw_isValidCellRangeFormat(cell);
            if(!isValid){
                Grid.SetText((SPR_SBE_CELLREFERENCE - 1), row,"");
            }else{
                Grid.SetText((SPR_SBE_CELLREFERENCE - 1), row,cell.toUpperCase());
            }
        }
    }
    
    else  if (canvasID == "nwGridCon_sbf") {
        if (!$("#nwGridCon_sbf").enable()) {
            return false;
        }
        var Grid = nwGridCon_sbf_Book.ActiveSheet;
        if (Grid.GetBackground((col), row) == "gainsboro") {
            return false;
        }
        if (col == (SPR_SBF_VALUE - 1)) {
            Grid.SetText((SPR_SBF_CELLREFERENCE - 1), row,"");
            formatsqlselectsyntax_sb();
        }
        else if (col == (SPR_SBF_CELLREFERENCE - 1)) {
            var cell = Grid.GetText((SPR_SBF_CELLREFERENCE - 1), row);
            var isValid = p8forw_isValidCellRangeFormat(cell);
            if(!isValid){
                Grid.SetText((SPR_SBF_CELLREFERENCE - 1), row,"");
            }else{
                Grid.SetText((SPR_SBF_CELLREFERENCE - 1), row,cell.toUpperCase());
                Grid.SetText((SPR_SBF_VALUE - 1), row,"");
                formatsqlselectsyntax_sb();
            }
        } 
    }
    else if (canvasID == "nwGridCon_sbp") {
        if (!$("#nwGridCon_sbp").enable()) {
            return false;
        }
        var Grid = nwGridCon_sbp_Book.ActiveSheet;
        if (Grid.GetBackground((col), row) == "gainsboro") {
            return false;
        }
        if (col == (SPR_SBP_VALUE - 1)) {
            Grid.SetText((SPR_SBP_CELLREFERENCE - 1), row,"");
            formatsqlselectsyntax_sb();
        } 
        else if (col == (SPR_SBP_CELLREFERENCE - 1)) {
            var cell = Grid.GetText((SPR_SBP_CELLREFERENCE - 1), row);
            var isValid = p8forw_isValidCellRangeFormat(cell);
            if(!isValid){
                Grid.SetText((SPR_SBP_CELLREFERENCE - 1), row,"");
            }else{
                Grid.SetText((SPR_SBP_CELLREFERENCE - 1), row,cell.toUpperCase());
                Grid.SetText((SPR_SBP_VALUE - 1), row,"");
                formatsqlselectsyntax_sb();
            }
        }  
    }
    else  if (canvasID == "nwGridCon_dataconditionwhere") {
        if (!$("#nwGridCon_dataconditionwhere").enable()) {
            return false;
        }
        var Grid = nwGridCon_dataconditionwhere_Book.ActiveSheet;
        if (Grid.GetBackground((col), row) == "gainsboro") {
            return false;
        }
        if (col == (SPR_DC_COLUMN - 1)) {
            var operation = Grid.GetText((SPR_DC_OPERATION - 1), row);
            if (isNull(operation)) {
                Grid.SetText((SPR_DC_OPERATION - 1), row, _p8forwdefdata.defoperation);
                Grid.SetText((SPR_DC_OPERATIONDESC - 1), row, _p8forwdefdata.defoperationdesc);
            }
            formatsqlselectsyntax_datacondition();
        }
        if(col == (SPR_DC_VALUE - 1)){
            //var value = Grid.GetText((SPR_DC_VALUE - 1), row);
            Grid.SetText((SPR_DC_CELLREFERENCE - 1), row,"");
            formatsqlselectsyntax_datacondition();
        }
        if(col == (SPR_DC_CELLREFERENCE - 1)){
            //var cell = Grid.GetText((SPR_DC_CELLREFERENCE - 1), row);
            Grid.SetText((SPR_DC_VALUE - 1), row,"");
            formatsqlselectsyntax_datacondition();
        }
    }else  if (canvasID == "nwGridCon_lookup") {
        if (!$("#nwGridCon_lookup").enable()) {
            return false;
        }
        var Grid = nwGridCon_lookup_Book.ActiveSheet;
        if (Grid.GetBackground((col), row) == "gainsboro") {
            return false;
        }
        if (col == (SPR_LU_COLUMN - 1)) {
            var column = Grid.GetText((SPR_LU_COLUMN - 1), row);
            var name = Grid.GetText((SPR_LU_NAME - 1), row);
            var type = Grid.GetText((SPR_LU_TYPE - 1), row);
            if (isNull(name)) {
                Grid.SetText((SPR_LU_NAME - 1), row, column);
            }
            if (isNull(type)) {
                Grid.SetText((SPR_LU_TYPE - 1), row, _p8forwdefdata.defdatatype);
                Grid.SetText((SPR_LU_TYPEDESC - 1), row, _p8forwdefdata.defdatatypedesc);
            }

            formatsqlselectsyntax_lookup();
        }
        if (col == (SPR_LU_NAME - 1)) {
            formatsqlselectsyntax_lookup();
        }
    } else if (canvasID == "nwGridCon_lookupwhere") {
        if (!$("#nwGridCon_lookupwhere").enable()) {
            return false;
        }
        var Grid = nwGridCon_lookupwhere_Book.ActiveSheet;
        if (Grid.GetBackground((col), row) == "gainsboro") {
            return false;
        }
        if (col == (SPR_LUW_COLUMN - 1)) {
            var operation = Grid.GetText((SPR_LUW_OPERATION - 1), row);
            if (isNull(operation)) {
                Grid.SetText((SPR_LUW_OPERATION - 1), row, _p8forwdefdata.defoperation);
                Grid.SetText((SPR_LUW_OPERATIONDESC - 1), row, _p8forwdefdata.defoperationdesc);
            }
            formatsqlselectsyntax_lookup();
        }
        if (col == (SPR_LUW_VALUE - 1)) {
            //var value = Grid.GetText((SPR_DC_VALUE - 1), row);
            Grid.SetText((SPR_LUW_CELLREFERENCE - 1), row, "");
            formatsqlselectsyntax_lookup();
        }
        if (col == (SPR_LUW_CELLREFERENCE - 1)) {
            //var cell = Grid.GetText((SPR_DC_CELLREFERENCE - 1), row);
            Grid.SetText((SPR_LUW_VALUE - 1), row, "");
            formatsqlselectsyntax_lookup();
        }
    }
    else  if (canvasID == "nwGridCon_table") {
        if (!$("#nwGridCon_table").enable()) {
            return false;
        }
        var Grid = nwGridCon_table_Book.ActiveSheet;
        if (Grid.GetBackground((col), row) == "gainsboro") {
            return false;
        }
        if (col == (SPR_T_COLUMN - 1)) {
            var column = Grid.GetText((SPR_T_COLUMN - 1), row);
            var name = Grid.GetText((SPR_T_NAME - 1), row);
            var type = Grid.GetText((SPR_T_TYPE - 1), row);
            if (isNull(name)) {
                Grid.SetText((SPR_T_NAME - 1), row, column);
            }
            if (isNull(type)) {
                Grid.SetText((SPR_T_TYPE - 1), row, _p8forwdefdata.defdatatype);
                Grid.SetText((SPR_T_TYPEDESC - 1), row, _p8forwdefdata.defdatatypedesc);
            }

            formatsqlselectsyntax_table();
        }
        if (col == (SPR_T_NAME - 1)) {
            formatsqlselectsyntax_table();
        }
    }
    else  if (canvasID == "nwGridCon_tablewhere") {
        if (!$("#nwGridCon_tablewhere").enable()) {
            return false;
        }
        var Grid = nwGridCon_tablewhere_Book.ActiveSheet;
        if (Grid.GetBackground((col), row) == "gainsboro") {
            return false;
        }
        if (col == (SPR_TW_COLUMN - 1)) {
            var operation = Grid.GetText((SPR_TW_OPERATION - 1), row);
            if (isNull(operation)) {
                Grid.SetText((SPR_TW_OPERATION - 1), row, _p8forwdefdata.defoperation);
                Grid.SetText((SPR_TW_OPERATIONDESC - 1), row, _p8forwdefdata.defoperationdesc);
            }
            formatsqlselectsyntax_table();
        }
        if(col == (SPR_TW_VALUE - 1)){
            Grid.SetText((SPR_TW_CELLREFERENCE - 1), row,"");
            formatsqlselectsyntax_table();
        }
        if(col == (SPR_TW_CELLREFERENCE - 1)){
            Grid.SetText((SPR_TW_VALUE - 1), row,"");
            formatsqlselectsyntax_table();
        }
    }
    return true;
}

function p8Spread_DblClick_MenuItem(canvasID, row, col) {
    var iscontinue = true;
    _canvasID = canvasID;
    _row = row;
    _col = col;

    if (canvasID == "mSpread") {
        //iscontinue = p8forw_viewtoolbox(col, row);
        p8forw_checktoolbox(col, row);
        var forwformula = mSpreadBook.ActiveSheet.GetFORWFormula(col, row);
        if(forwformula.includes("=FORW_DataCondition")){
            p8forw_datacondition_refresh($("#p8forw-btndatacondition"));
            return false;
        }else if(forwformula.includes("=FORW_Lookup")){
            p8forw_lookup_refresh();
            return false;
        } else if (forwformula.includes("=FORW_AddToList")) {
            p8forw_lookup_refresh(1);
            return false;
        }else if(forwformula.includes("=FORW_Table")){
            p8forw_table_refresh($("#p8forw-btntable"));
            return false;
        }
    }else if (canvasID == "nwGridCon_datasource") {
        if (!$("#nwGridCon_datasource").enable()) {
            return false;
        }
        var Grid = nwGridCon_datasource_Book.ActiveSheet;
        if (Grid.GetBackground((col), row) == "gainsboro") {
            return false;
        }
    }    else if(canvasID == "nwGridCon_sbevent"){
        if (!$("#nwGridCon_sbevent").enable()) {
            return false;
        }
        var Grid = nwGridCon_sbevent_Book.ActiveSheet;
        if (Grid.GetBackground((col), row) == "gainsboro") {
            return false;
        }
    }

    return iscontinue;
}
function p8Spread_Click_MenuItem(canvasID, row, col) {
    var iscontinue = true;
    _canvasID = canvasID;
    _row = row;
    _col = col;

    if (canvasID == "mSpread") {
        p8forw_checktoolbox(col, row);
        //iscontinue = p8forw_viewtoolbox(col, row);
    }else if (canvasID == "nwGridCon_datasource") {
        if (!$("#nwGridCon_datasource").enable()) {
            return false;
        }
        var Grid = nwGridCon_datasource_Book.ActiveSheet;
        if (Grid.GetBackground((col), row) == "gainsboro") {
            return false;
        }

        if(col == (SPR_DA_PARAMETERSETUP - 1)){
            p8forw_datasourceps_refresh();
        }
        if(col == (SPR_DA_RIGHTS - 1)){
            p8forw_datasourcer_refresh();
        }
        //var Grid = nwGridCon_datasource_Book.ActiveSheet;
        //Cuz_nwGridCon_datasource_EnableDelete(row);

    }
    else if (canvasID == "nwGridCon_datasourcepsh") {
        if (!$("#nwGridCon_datasourcepsh").enable()) {
            return false;
        }
        var Grid = nwGridCon_datasourcepsh_Book.ActiveSheet;
        if (Grid.GetBackground((col), row) == "gainsboro") {
            return false;
        }

        if(col == (SPR_DAPSH_COLUMN - 1)){
            p8forw_datasourcepsc_refresh();
        }
    }
    else if (canvasID == "nwGridCon_datasourcepsl") {
        if (!$("#nwGridCon_datasourcepsl").enable()) {
            return false;
        }
        var Grid = nwGridCon_datasourcepsl_Book.ActiveSheet;
        if (Grid.GetBackground((col), row) == "gainsboro") {
            return false;
        }
    }
    else if (canvasID == "nwGridCon_datasourcepsc") {
        if (!$("#nwGridCon_datasourcepsc").enable()) {
            return false;
        }
        var Grid = nwGridCon_datasourcepsc_Book.ActiveSheet;
        if (Grid.GetBackground((col), row) == "gainsboro") {
            return false;
        }

    }

    //else if (canvasID == "nwGridCon_datasourcepsh") {
    //    if (!$("#nwGridCon_datasourcepsh").enable()) {
    //        return false;
    //    }
    //    var Grid = nwGridCon_datasourcepsh_Book.ActiveSheet;
    //    if(col == (SPR_DAPSH_DETAILS - 1)){
    //        var id = Grid.GetText((SPR_DAPSH_ID - 1), row);
    //        if(isNull(id)){
    //            id = "temp-"+nwRandomString(12);
    //            Grid.SetText((SPR_DAPSH_ID - 1), row,id);
    //        }
    //        $("#txtdatasourcepsid").val(id);
    //        p8forw_datasourcepsl_reloadgrid();
    //    }
    //    //var Grid = nwGridCon_datasource_Book.ActiveSheet;
    //    //Cuz_nwGridCon_datasource_EnableDelete(row);

    //} 
    else if (canvasID == "nwGridCon_lookup") {
        if (!$("#nwGridCon_lookup").enable()) {
            return false;
        }
        var Grid = nwGridCon_lookup_Book.ActiveSheet;
        if (Grid.GetBackground((col), row) == "gainsboro") {
            return false;
        }
        //if (col == (SPR_LU_TYPE - 1)) {
        //    setTimeout(function () {
        //        formatsqlselectsyntax_lookup();
        //    }, 100);
        //}
    }
    //if (canvasID == "nwGridCon_databindings") {
    //    p8forw_p8Spread_nwGridCon_databindings_Change(row, col);
    //}
    //else if (canvasID == "nwGridCon_databindings_column") {
    //    p8forw_p8Spread_nwGridCon_databindings_column_Change(row, col);
    //}
    return iscontinue;
}
function p8Spread_Focus_MenuItem(canvasID, row, col) {
    var iscontinue = true;
    _canvasID = canvasID;
    _row = row;
    _col = col;

    if (canvasID == "mSpread") {
        //iscontinue = p8forw_viewtoolbox(col, row);
    }else if (canvasID == "nwGridCon_datasource") {
        if (!$("#nwGridCon_datasource").enable()) {
            return false;
        }
        //var Grid = nwGridCon_datasource_Book.ActiveSheet;
        //Cuz_nwGridCon_datasource_EnableDelete(row);

        //save before load
        //SaveGrid_datasourcecolumn();
        //var Grid = nwGridCon_datasource_Book.ActiveSheet;
        //var datasourceid = Grid.GetText((SPR_DA_DATASOURCEID - 1), row);
        //$(`#txtDataSourceID`).val(datasourceid);
        //$("#txtDataSourceHasUpdate").val('');
        //CreateGrid_datasourcecolumn();
    }
    //if (canvasID == "nwGridCon_databindings") {
    //    p8forw_p8Spread_nwGridCon_databindings_Change(row, col);
    //}
    //else if (canvasID == "nwGridCon_databindings_column") {
    //    p8forw_p8Spread_nwGridCon_databindings_column_Change(row, col);
    //}
    return iscontinue;
}



function func_nwGrid_InsertDone(canvasID,row,col) {
    var isContinue = true;
    //if (canvasID == "nwGridCon_datasource"){
    //    //var Grid = nwGridCon_datasource_Book.ActiveSheet;
    //    //Grid.SetText((SPR_DA_DATASOURCEID - 1), row, nwRandomString(12));
    //    //Grid.SetText((SPR_DA_ISUPDATENEW - 1), row,"1");
    //    //Cuz_nwGridCon_datasource_EnableDelete(row);
    //}
    if (canvasID == "nwGridCon_datasourcepsc"){
        p8forw_datasourcepsc_include(col, row);
        //var Grid = nwGridCon_datasource_Book.ActiveSheet;
        //Grid.SetText((SPR_DA_DATASOURCEID - 1), row, nwRandomString(12));
        //Grid.SetText((SPR_DA_ISUPDATENEW - 1), row,"1");
        //Cuz_nwGridCon_datasource_EnableDelete(row);
    }
    return isContinue;
}


function func_nwGrid_DeleteDone(canvasID,row,col) {
    var isContinue = true;
    if (canvasID == "nwGridCon_datasourcecolumn"){
        $("#txtDataSourceHasUpdate").val("1");
        //Grid.SetText((SPR_DA_ISUPDATENEW - 1), row,"1");
        //Cuz_nwGridCon_datasource_EnableDelete(row);
    }
    return isContinue;
}

//function Cuz_nwGridCon_datasource_EnableDelete(row){
//    var Grid = nwGridCon_datasource_Book.ActiveSheet;
//    var value = Grid.GetText((SPR_DA_ISUSED - 1), row);
//    if(value=="1"){
//        $("#nwGridCon_datasource").find(".nwgrid_Delete").enable(false);
//    }else{
//        $("#nwGridCon_datasource").find(".nwgrid_Delete").enable(true);
//    }
//}



function func_LookUpInitialize(dimP) {
    cust_GetPara();
    if (dimP.includes('lugsbcolumnnamec')) {
        try{
            var _this = $("#sbcolumn");
            var len = 0;
            try { len = _this.find(`.p8forw-row`).length; } catch (ex) { }
            var columnlist = "";
            for (var i = 0; i < len; i++) {
                columnlist += _this.find(`.p8forw-row:eq(${i})`).find(`.p8forw-col:eq(${(SPR_SBC_COLUMN - 1)}) .idval`).val() || "";
                columnlist+='|';
            }
            nwParameter_Add("columnlist", columnlist);
        }catch(ex){}
       // codelist(Grid, index, param) 

        //var len = 0;
        //try{ len = $(".lugsbcolumnnamec .idval").length } catch(ex){}
        //for (var i = 0; i <= len; i++) {
        //    list += $(".lugsbcolumnnamec:eq("(0)") .idval") + '|';
        //}
    }
    if (dimP.includes('lugsbcolumnnames')) {
        try{
            var _this = $("#sbsort");
            var len = 0;
            try { len = _this.find(`.p8forw-row`).length; } catch (ex) { }
            var columnlist = "";
            for (var i = 0; i < len; i++) {
                columnlist += _this.find(`.p8forw-row:eq(${i})`).find(`.p8forw-col:eq(${(SPR_SBS_COLUMN - 1)}) .idval`).val() || "";
                columnlist+='|';
            }
            nwParameter_Add("columnlist", columnlist);
        }catch(ex){}
        // codelist(Grid, index, param) 

        //var len = 0;
        //try{ len = $(".lugsbcolumnnamec .idval").length } catch(ex){}
        //for (var i = 0; i <= len; i++) {
        //    list += $(".lugsbcolumnnamec:eq("(0)") .idval") + '|';
        //}
    }
    //Data Condition
    //if (dimP == "lugdataconditionvalue") {
    //    nwParameter_Add("txtdataconditiondatasourceid", $("#txtdataconditiondatasourceid").val());
    //}
    //if (dimP == "lug-datasource-type") {
    //    nwParameter_Add("p8forw_json_type",JSON.stringify(_forw_json_centralize.type));
    //}

}


function Lookup_DoneFunction(idName, idNum, ifBlankVal) {
    if (idName == 'toolboxInquire') {
    }

    if (idName == 'idvallugdatasourceadddataconnectivity') {
        $("#lugdatasourceadddatasource input").val('');  
    }
    if (idName == 'lugdatasourceadddatasourcetype') {
        $("#lugdatasourceadddatasource input").val('');  
    }
    //if (idName == 'lugdatasourceadddatasource') {
    //         $("#txtdatasourceadddataname").val(getLookupData(idNum, 1));  
    //}

    if (idName == 'lugdatasourcetype') {
        var Grid = nwGridCon_datasource_Book.ActiveSheet;
        Grid.SetText(SPR_DA_TYPE - 1, _row, getLookupData(idNum, 0));
        Grid.SetText(SPR_DA_TYPEDESC - 1, _row, getLookupData(idNum, 1));
        Grid.SetText((SPR_DA_ISUPDATENEW - 1), _row,"1");
    }

    
    //else if (idName == 'lugdatasourcecolumntype') {
    //        var Grid = nwGridCon_datasourcecolumn_Book.ActiveSheet;
    //        Grid.SetText(SPR_DAC_TYPE - 1, _row, getLookupData(idNum, 0));
    //        Grid.SetText(SPR_DAC_TYPEDESC - 1, _row, getLookupData(idNum, 1));
    //        $("#txtDataSourceHasUpdate").val('1');
    //}
    else if (idName == 'lugsbsource') {
        $("#txtsbdatasourceid").val('');  
        $("#txtsbType").val('');  
        $("#lugsbdatasourcetype input").val('');  

        $("#txtsbdatasourceid").val(getLookupData(idNum, 2));  
        $("#txtsbType").val(getLookupData(idNum, 3));  

        p8forw_sbc_reloadgrid();
        p8forw_sbf_reloadgrid();
        p8forw_sbp_reloadgrid();
        p8forw_sbs_reloadgrid();
    }
    else if (idName == 'lugsbdatasourcetype') {
        $("#idvallugsbsource").val(getLookupData(idNum, 2));  
        $("#descvallugsbsource").val(getLookupData(idNum, 3));  
        $("#txtsbdatasourceid").val(getLookupData(idNum, 4));  
        $("#txtsbType").val(getLookupData(idNum, 5));  
        p8forw_sbc_reloadgrid();
        p8forw_sbf_reloadgrid();
        p8forw_sbp_reloadgrid();
        p8forw_sbs_reloadgrid();
    }
    else if (idName.includes('lugsbcolumnnamec')) {
        formatsqlselectsyntax_sb();
    }
    else if (idName.includes('lugsbfoperation')) {
        var Grid = nwGridCon_sbf_Book.ActiveSheet;
        Grid.SetText(SPR_SBF_OPERATION - 1, _row, getLookupData(idNum, 0));
        Grid.SetText(SPR_SBF_OPERATIONDESC - 1, _row, getLookupData(idNum, 1));
        formatsqlselectsyntax_sb();
    }
    else if (idName.includes('lugsbcolumnnames')) {
        formatsqlselectsyntax_sb();
    }

    else if (idName == 'lugdataconditionsource') {
        $("#txtdataconditiondatasourceid").val(getLookupData(idNum, 2));  
        $("#txtdataconditionType").val(getLookupData(idNum, 3));  
        p8forw_dataconditionwhere_reloadgrid();
        formatsqlselectsyntax_datacondition();
    }

    //else if (idName == 'lugdataconditionvalue') {
    //    formatsqlselectsyntax_datacondition();
    //}
    
    else if (idName == 'lugdataconditionwhereoperation') {
        var Grid =  nwGridCon_dataconditionwhere_Book.ActiveSheet;
        Grid.SetText(SPR_DC_OPERATION - 1, _row, getLookupData(idNum, 0));
        Grid.SetText(SPR_DC_OPERATIONDESC - 1, _row, getLookupData(idNum, 1));
        formatsqlselectsyntax_datacondition();
    }
    else if (idName == 'luglookupsource') {
        $("#txtlookupdatasourceid").val(getLookupData(idNum, 2));
        $("#txtlookupType").val(getLookupData(idNum, 3));
        p8forw_lookup_reloadgrid();
        p8forw_lookupwhere_reloadgrid();
        formatsqlselectsyntax_lookup();
    }
    else if (idName == 'luglookuptype') {
        var Grid = nwGridCon_lookup_Book.ActiveSheet;
        Grid.SetText(SPR_LU_TYPE - 1, _row, getLookupData(idNum, 0));
        Grid.SetText(SPR_LU_TYPEDESC - 1, _row, getLookupData(idNum, 1));
        formatsqlselectsyntax_lookup();
        }
    else if (idName == 'luglookupwhereoperation') {
        var Grid = nwGridCon_lookupwhere_Book.ActiveSheet;
        Grid.SetText(SPR_LUW_OPERATION - 1, _row, getLookupData(idNum, 0));
        Grid.SetText(SPR_LUW_OPERATIONDESC - 1, _row, getLookupData(idNum, 1));
        formatsqlselectsyntax_lookup();
    }

    else if (idName == 'lugtablesource') {
        $("#txttabledatasourceid").val(getLookupData(idNum, 2));  
        $("#txttableType").val(getLookupData(idNum, 3));  
        p8forw_tablewhere_reloadgrid();
        formatsqlselectsyntax_table();
    }
    else if (idName == 'lugtablevalue') {
        formatsqlselectsyntax_table();
    }
    
    else if (idName == 'lugtablewhereoperation') {
        var Grid =  nwGridCon_tablewhere_Book.ActiveSheet;
        Grid.SetText(SPR_TW_OPERATION - 1, _row, getLookupData(idNum, 0));
        Grid.SetText(SPR_TW_OPERATIONDESC - 1, _row, getLookupData(idNum, 1));
        formatsqlselectsyntax_table();
    }
}

function getLookupData(idnum, index) {
    var data = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idnum - 1) + ") td:eq(" + index + ") span").text();
    return data;
}




function p8forw_getjsonvalue(json, object) {
    try{
        return json[object];
    } catch (ex) { return "";}
}

function p8forw_formatcolumn(column) {
    return "[" + column.replaceAll("[", "").replaceAll("]", "") + "]";
}





$(document).on("click", ".p8forw-row-divider", function () {
    var p8forwgrid = $(this).closest(".p8forwgrid");
    var p8forwgrid_id = p8forwgrid.attr("id");
    var index = $(this).closest(".p8forw-row").index("#" + p8forwgrid_id + " .p8forw-row");
    var p8forw_formatobject = nwJson(_p8forw_formatobject, "objectid", p8forwgrid_id, false);
    
    p8forw_insertrow(p8forwgrid, index, p8forw_formatobject);
    p8forw_sortgrid(p8forwgrid);
});
$(document).on("click", ".p8forw-row-close", function () {
    var p8forwgrid = $(this).closest(".p8forwgrid");
    var p8forwgrid_id = p8forwgrid.attr("id");
    $(this).closest(".p8forw-row").remove();
    var len = 0;
    try { len = p8forwgrid.find(`.p8forw-row`).length; } catch (ex) { }
    if (len <= 0) {
        var p8forw_formatobject = nwJson(_p8forw_formatobject, "objectid", p8forwgrid_id, false);
        p8forw_insertrow(p8forwgrid, 0, p8forw_formatobject);
    }
    try{
        p8forw_row_close_done(p8forwgrid);
    }catch(ex){}
});

    
function p8forw_insertrow(htmlobject,index,p8forw_formatobject,insertbelow) {
    var objectid = htmlobject.attr("id");
    var str = `<div class="row rx p8forw-row"><div class="row-header"><span class="icon-close p8forw-row-close">x</span></div>`
    var len = 0;
    try{len = p8forw_formatobject.length;}catch(ex){}
    for (var i = 0; i < len; i++) {
      
        var item = p8forw_formatobject[i];
        var objecttype = p8Spread_GetJsonValue(item, "objecttype");
        var id = p8Spread_GetJsonValue(item, "id");
        var classlist = p8Spread_GetJsonValue(item, "classlist");
        var fieldname = p8Spread_GetJsonValue(item, "fieldname");
        var hidecode = p8Spread_GetJsonValue(item, "hidecode");
        var width = p8Spread_GetJsonValue(item, "width");
        var nwHide = width == "0" ? "nwHide":"";
        str +=  `<div class="row p8forw-col ${nwHide}">`;

        if(objecttype == "lookup"){
            str += p8forw_lookupobject(id,classlist,fieldname,hidecode)
        } else if (objecttype == "combobox") {
            var p8forw_objectdata = nwJson(_p8forw_objectdata, "objectid", objectid, false);
            p8forw_objectdata = nwJson(p8forw_objectdata, "id", id, false);
            var jsonstring = p8Spread_GetJsonValue(p8forw_objectdata[0], "jsonstring");
            str += p8forw_comboboxobject(id, classlist, fieldname, jsonstring)
        }else if(objecttype == "input"){
            str += p8forw_inputobject(id,classlist,fieldname)
        }
        str +=  `</div>`
    }
    str += p8forw_dividerobject();

    var len = 0;
    try{len = htmlobject.find(`.p8forw-row`).length;}catch(ex){}
    if (len <= 0) {
        htmlobject.append(str);
    } else {
        if (insertbelow) {
            index -= 1;
        }
        if (index < 0) {
            htmlobject.find(`.p8forw-row:eq(${0})`).before(str);
        } else {
            htmlobject.find(`.p8forw-row:eq(${index})`).after(str);
        }
    }
    //return str;
}

function p8forw_insertfirstdivider(htmlobject) {
    var str = `<div class="row rx p8forw-row-first bordernone">`
    str += p8forw_dividerobject();
    str += `</div>`
    htmlobject.append(str);
}
function p8forw_dividerobject() {
    var str = `<div class ="p8forw-divider p8forw-row-divider"><span class ="icon-plus">+</span></div></div>`
    return str;
}
function p8forw_lookupobject(id,classlist,fieldname,hidecode) {
    var rnd = nwRandomString(5);
    var nwHide = hidecode == true ? "nwHide":"";
    var str = `<div class="col col-5"><label class="lbltxt">${fieldname}</label></div>
               <div class="col col-7">
                   <div id="${id + rnd}" class ="col col-12 lookups ${classlist}">
                       <div class="col col-5 conval ${nwHide}">
                           <input type="text" name="" class="txtbox txtcode idval nwCuz001" autocomplete="off" disabled>
                       </div>
                       <div class="col col-12 conval">
                           <input type="text" name="" class ="txtbox txtdesc txtlookup descval" autocomplete="off" disabled>
                           <div class="btn btn-sm-default btn-sm-default-lookup LookUp"></div>
                       </div>
                   </div>
               </div>`
    return str;
}
function p8forw_inputobject(id,classlist,fieldname) {
    var rnd = nwRandomString(5);
    var str = `<div class="col col-5"><label class="lbltxt">${fieldname}</label></div>
               <div class="col col-7">
                           <input id="${id + rnd}" type="text" class="txtbox txtcode ${classlist}" autocomplete="off">
               </div>`
    return str;
}


function p8forw_combobox(objectid, id, i, jsonstring) {

    //delete existing data
    try {
        var jsondata_delete = _p8forw_objectdata;
        $.each(jsondata_delete, function (i, item) {
            var objectide = item["objectid"];
            var ide = item["id"];
            if (objectide == objectid && ide == id) {
                jsondata_delete.splice(i, 1);
            }
        });
    } catch (ex) { }

    _p8forw_objectdata.push({
        objectid: objectid,
        id: id,
        i: i,
        jsonstring :jsonstring
    });

}
function p8forw_comboboxobject(id, classlist, fieldname, jsonstring) {
    var str = "";
    try{
        var json = JSON.parse(jsonstring);
        var rnd = nwRandomString(5);
        str = `<div class="col col-5"><label class="lbltxt">${fieldname}</label></div>
               <div class="col col-7">
                   <div id="${id + rnd}" class ="col col-12 ${classlist}">
                           <select type="text" name="" class ="txtbox txtcode idval">`
        for (i = 0; i < json.length; i++) {
            var item = json[i];
            var objectkey = Object.keys(item);
            var code = item[objectkey[0]];
            var desc = item[objectkey[1]];
            if (desc == undefined) {
                desc = item[objectkey[0]];
            }
            code = code || "";
            desc = desc || "";
            str += `<option value="${code}">${desc}</option>`
        }
        str+=  `</select></div></div>`
    }catch(ex){}
    return str;
}
function p8forw_sortgrid(_this) {
    try {
        _this.sortable("destroy");
    } catch (ex) { }
    try {
        _this.sortable({
            axis: "y",
            cursor: "move",
            items: ".p8forw-row",
            forcePlaceholderSize: true,
            update: function(event, ui) {
                console.log("p8forw: Sorting done!");
                try{
                    p8forw_row_sort_done(ui);
                }catch(ex){}
            }
        });
    } catch (ex) { }
}

//function convertKeysToLowerCase(obj) {
//    if (Array.isArray(obj)) {
//        return obj.map(convertKeysToLowerCase); // Recursively convert keys for each element in the array
//    } else if (typeof obj === 'object' && obj !== null) {
//        const newObj = {};

//        for (var key in obj) {
//            if (Object.prototype.hasOwnProperty.call(obj, key)) {
//                const newKey = key.toLowerCase();
//                newObj[newKey] = convertKeysToLowerCase(obj[key]);
//            }
//        }

//        return newObj;
//    } else {
//        return obj; // Base case: return non-object values as is
//    }
//}


//open in new tab
var xurl = this.location.origin;
var xcurl = "";

$(document).on("click", "#p8forw-btnPreview", function () {

    var code = $("#txt-p8forw-code").val();
    var jsonitemlistmain = [{ code: code }]
    var strData = JSON.stringify(jsonitemlistmain);
    //mainurl = xurl;
    mainurl = "P8FORWViewer"; //change
    //mainurl += "?fid=" +encodeURIComponent(code);
    mainurl += "?nwdev=" + encodeURIComponent(getParameterByName("nwdev"));
    var popup =  window.open(mainurl, '_blank');
    setTimeout(() => {
        popup.postMessage(strData, window.location.origin);
    }, 1000);
    //xcurl = serverlink + path;

    //nwParameter_Add("url", xcurl);

    //nwParameter_Add("title", "Attachment");

    //nwLoading_Start("actViewFiles", crLoadingHTML);
    //func_ActionDriven("actViewFiles", false);
});


function NOAHSpread_CreateDocument() { 
    $("#txt-p8forw-code").val("");
    $("#txt-p8forw-desc").val("");
    NOAHSpread_CreateDefaultSpread();
    isNewRow = true;
    setTimeout(function () { 
        p8forw_savedata();
    },10);
}
function NOAHSpread_OpenDocument(_this) {
    var repid = $(_this).attr("repid");
    $("#txt-p8forw-code").val(repid);
    nwLoading_Start("actp8forw_loadtemplate", crLoadingHTML);
    cust_GetPara();
    func_ActionDriven("actp8forw_loadtemplate", false);
}