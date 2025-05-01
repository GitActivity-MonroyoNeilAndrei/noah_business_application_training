/* # Canvas JS Library 1.10.1.81
# Company Owner: Forecasting and Planning Technologies Inc. / Promptus8 Inc.
# Developers : Angelo Carlo A. Gonzales

# Date Created : March 2018
# Date Modified : September 19 2024 / 01:45 PM  - before: 07-09-2024

For  NoahWeb Application and Promptus8 Modules used only. 

Illeggal used are Prohibited
Modification of this Library is Prohibited.
*/

/**/

var p8Spread_JSExport = false;
var p8Spread_CurBook = "";

var iscurCellSelect;

$(function () {
    window.NOAH_SpreadCanvas = { "version": "1.10.1.81" }
    console.log("NOAH_SpreadCanvas: " + window.NOAH_SpreadCanvas.version);
});

createHiDPICanvas = function (c, w, h, ratio) {

    if (!ratio) {
        var canvas = document.getElementById(c);
        var ctx = canvas.getContext("2d");
        var dpr = window.devicePixelRatio || 1,
            bsr = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1;
        ratio = dpr / bsr;
    }


    var can = document.getElementById(c);
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);

    return can;
}
//Create canvas with the device resolution.

function p8Spread_Book(bookid) {
    return P8DataList[bookid][0].sheet.ActiveSheet.Book;
}

var img_CheckboxTrue = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAd5JREFUeNpiYEAGXFOD/wMEEIJXf3rF/9d/vv8HCCBGEAfEgEkwMaABgADCRCDlMFxdX/cfrMVqWQHD0y9vwApYfv/+zXAsagKY8/fvXwaAAAIzth7Y+x9ZKwg/+/7pf3Ze7lWwEWY2VgxX3zwEK3706SWD/MwYhiff3jIICApqwZ2lLSLPMPvSdgZmJmaGh+lLGBT5JcDiYI+AjAKpRnYtyP77t++4AwQQYX+lZ2ZeBTkI3ZEgh4ODRkRMVIuVlRVDI8jhKGF36vlNMJ26s5/BdXUFXCELjJGwvZtBgluQQQHo+t2hHQwYoX82biqDJLcQwzyPYhSrmGDBycnCzrDUpxIuAQpysBUgv07p6Nn5ByoAA29evb4GogECDBxQ4eHhbgJCQv2CwkJazMzMeIMFZOP7t++ufXj3rnDlypW7wJ5QVFXZmVddzoAtOLABoPO0ZvZO3MmwciUj2ACQrbg0/wfCx59eMVQfXsDw7/8/hqmuuQwC7DwMMC+xICu+//EFQ/y2LgZuVg6GRut4Bj1RRXC4H3pyGZxYJjlngzUjAxQDQCnoUGQfOFWl7epnePXtA4OHoinD3vAuBhUBKawuZMEmmKrnCcbEACZYlJw6cgwedwQCkAGkFhaNFAMAF1nguISgVjkAAAAASUVORK5CYII=";
var img_Checkbox = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQ9JREFUeNpiYEAGr/98/w8QQHAOI4wHEECM6FJMDGgAIIAwEUg5DFfX1/3H0ML0+/dvOOfv378MAAEEZmw9sPc/slYQfvb90//svNyrYCPMbKww7GJlZWUQEBTUIugsFhDRUFR2DaQaWQJk//3bd9wBAoiwv9IzM6+CHITuSJDDwd4SERPVAjkIHcAcTtCRVFAAD040AAtyFpBfp3T07PyDFAcg8ObV62sgGiDAwDEeHh7uJiAk1C8oLKTFzMyM10qQje/fvrv24d27wpUrV+4Ch7SiqsrOvOpyBmzBgcN5WjN7J+5kWLmSEexJkK3EaoYlBJiXmBgoBIPEAFCUnDpyjOE3WlThil+QWlg0UgwAJpSaY9Fd6DAAAAAASUVORK5CYII=";
var img_sizeWidth = 16;
var img_sizeHeight = 16;

//https://stackoverflow.com/questions/7925281/js-oop-nested-functions
/*
var Child = function(){
   //constructor
};

Child.prototype.doStuff2 = function(){
  return "dostuff2";
};

var Root = function(obj){
   //constructor
   this.child = obj;
};

Root.prototype.action1 = function(){
   return "doStuff1";
};

//usage
var myRoot = new Root(new Child());
myRoot.action1();
myRoot.child.action2();
*/
var P8Events = [];
var havelistner = false;
var haveLog = true;
var P8 = P8 || {};
var P8DataList = {};
var P8CurrentIDSel = "";
var P8SpreadLastCellChange = { canvasID: "", row: -1, col: -1 };

var Child = function () {
    //constructor
};
Child.prototype.doStuff2 = function () {
    return "dostuff2";
};


P8.Spread = function (canvasID, sheetcount) {

    if (sheetcount == undefined) sheetcount = 1;
    this.Sheet = [];
    for (var i = 0; i < sheetcount; i++) {
        var obj = new P8.SpreadSheet(canvasID);
        obj.SheetName = "Sheet" + (i + 1);
        obj.Book = this;
        this.Sheet[i] = obj;

    }
    this.ActiveSheet = this.Sheet[0];
    this.Buttons = [];

    this.TableHeight = 390;

    this.FormulaField = false;

    this.NavSheet = [];
    this.NavSheetDraw = false;
    this.NavSheetIndex = 0;
    this.NavSheetObject;

    this.curCount = 0;
    this.totCount = 0;



    var temp = {};

    var varx = [];
    varx.push({ canvasID: canvasID, sheet: this });
    P8DataList[canvasID] = varx;


    //this.ActiveSheet.Render();
    //sheet tab

};

P8.Spread.prototype.SetSpreadConfig = function (jsonData) {

    var json = JSON.parse(jsonData);
    for (var i = 0; i < json.length; i++) {
        var item = json[i];
        this.Sheet[i].Data = item.Data;
        this.Sheet[i].ColumnConfig = item.ColumnConfig;
        this.Sheet[i].RowConfig = item.RowConfig;
        try {
            var SheetConfig = item.SheetConfig;
            this.Sheet[i].SheetName = SheetConfig.SheetName;
            this.Sheet[i].backgroundColor = SheetConfig.backgroundColor;
            this.Sheet[i].FreezeCol = SheetConfig.FreezeCol;
            this.Sheet[i].FreezeRow = SheetConfig.FreezeRow;
            this.Sheet[i].FreezeColor = SheetConfig.FreezeColor;
            this.Sheet[i].mergeList = SheetConfig.mergeList;
            try {
                this.Sheet[i].TableList = SheetConfig.TableList;
            } catch (ex) { }
            try {
                if (SheetConfig.CellFomulaList == undefined) {
                    this.Sheet[i].CellFomulaList = [];
                } else {
                    this.Sheet[i].CellFomulaList = SheetConfig.CellFomulaList;
                }
            } catch (ex) { }
        } catch (ex) { }
    }


}

P8.Spread.prototype.GetSpreadConfig = function () {
    var jsonData = [];
    for (var i = 0; i < this.Sheet.length; i++) {
        jsonData.push({
            "sheetindex": i
            , Data: this.Sheet[i].Data
            , ColumnConfig: this.Sheet[i].ColumnConfig
            , RowConfig: this.Sheet[i].RowConfig
            , SheetConfig: {
                SheetName: this.Sheet[i].SheetName,
                backgroundColor: this.Sheet[i].backgroundColor,
                FreezeCol: this.Sheet[i].FreezeCol,
                FreezeRow: this.Sheet[i].FreezeRow,
                FreezeColor: this.Sheet[i].FreezeColor,
                mergeList: this.Sheet[i].mergeList,
                TableList: this.Sheet[i].TableList,
                CellFomulaList: this.Sheet[i].CellFomulaList,
            }
        });
    }
    return JSON.stringify(jsonData);
}


P8.Spread.prototype.SetThemes = function (theme) {
    if (P8Themes.FANCY == theme) {

        var canvasID = this.ActiveSheet.canvasID;

        this.ActiveSheet.Theme = theme;
        this.ActiveSheet.backgroundColor = "#ECECEC";
        this.ActiveSheet.gridlLineColor = "#ECECEC";
        this.ActiveSheet.HeaderBackround = "white";
        this.ActiveSheet.HeaderFontFamily = "Poppins-Regular,Arial,Tahoma";
        this.ActiveSheet.HeaderFontSize = 13;
        this.ActiveSheet.HeaderColor = "#1974D1";
        this.ActiveSheet.VHeaderBackround = "white";
        this.ActiveSheet.VHeaderFontFamily = "Poppins-Regular,Arial,Tahoma";
        this.ActiveSheet.VHeaderFontSize = 13;
        this.ActiveSheet.VHeaderColor = "#000000";
        this.ActiveSheet.HeaderNumText = "#";


        //FPMC aagedit
        //$("#" + canvasID+" .P8Spread_SheetVScroll").css("visibility","hidden");
        //$("#" + canvasID+" .P8Spread_SheetVScroll").css("position","fixed");
        //$("#" + canvasID+" .P8Spread_SheetHScroll").css("visibility","hidden");
        //$("#" + canvasID+" .P8Spread_SheetHScroll").css("position","fixed");

    }
    else {
        //default;
        this.ActiveSheet.Theme = theme;
        this.ActiveSheet.backgroundColor = "#E2E2E2";
        this.ActiveSheet.gridlLineColor = "#E2E2E2";
        this.ActiveSheet.HeaderBackround = "#e4ecf7";
        this.ActiveSheet.HeaderFontFamily = "Arial,Tahoma";
        this.ActiveSheet.HeaderFontSize = 13;
        this.ActiveSheet.HeaderColor = "#212121";
        this.ActiveSheet.VHeaderBackround = "#e4ecf7";
        this.ActiveSheet.VHeaderFontFamily = "Arial,Tahoma";
        this.ActiveSheet.VHeaderFontSize = 13;
        this.ActiveSheet.VHeaderColor = "#212121";
        this.ActiveSheet.HeaderNumText = "";

        //$("#" + canvasID+" .P8Spread_SheetVScroll").show();
        //$("#" + canvasID+" .P8Spread_SheetHScroll").show();

        $("#" + canvasID + " .P8Spread_SheetVScroll").css("visibility", "");
        $("#" + canvasID + " .P8Spread_SheetVScroll").css("position", "");
        $("#" + canvasID + " .P8Spread_SheetHScroll").css("visibility", "");
        $("#" + canvasID + " .P8Spread_SheetHScroll").css("position", "");
    }

    this.ActiveSheet.Refresh();
    return theme;
}


P8.Spread.prototype.GetColumnToLetter = function (columnorig) {
    var column = columnorig + 1;
    var counter = 0;

    var temp, letter = ''; letterFinal = '';
    while (column > 0) {
        temp = (column - 1) % 26;
        letter = String.fromCharCode(temp + 65) + letter;
        column = (column - temp - 1) / 26;
        counter++;
        if (counter >= 100) { break; console.log('overflow...') }
    }
    letterFinal += letter;
    if (columnorig == 0) letterFinal = "A";

    return letterFinal;
}
P8.Spread.prototype.GetLetterToColumn = function (letter) {
    var column = 0, length = letter.length;
    for (var i = 0; i < length; i++) {
        column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
    }
    return column - 1;
}

P8.Spread.prototype.GetActiveSheet = function () {
    var index = this.Sheet.indexOf(this.ActiveSheet);
    return index;
}

P8.Spread.prototype.GetSheets = function () {
    var counter = this.Sheet.length;
    var data = [];
    for (var i = 0; i < counter; i++) {
        data.push(this.Sheet[i].SheetName);
    }

    return data;
}

P8.Spread.prototype.SetActiveSheet = function (index) {
    //this.ActiveSheet.DestroyEvent();
    this.ActiveSheet = this.Sheet[index];
    this.ActiveSheet.currentCells = [];

    var spreadID = this.Sheet[index].canvasID;
    $("#" + spreadID + "_vw").attr("id", spreadID + "_vw_old");

    if (this.ActiveSheet.AutoWrap == true && this.ActiveSheet.AutoWrapRender == false)
        _sfAutoWrap(this.ActiveSheet);

    this.ActiveSheet.havelistner = true;
    this.ActiveSheet.Render();


    $("#" + this.Sheet[index].canvasID + "_vw_old").remove();
    //this.ActiveSheet.RenderNoEvent();

}

P8.SpreadSheet = function (canvasID, data) {
    //constructor
    _sfStartTime();

    this.Sheet = [];

    _sfInitialize(this, canvasID, data);

    // this.Sheet[0] = _sfInitialize(this, canvasID, data);;

    //var obj = new P8.SpreadSheet(canvasID, data);
    //this.Sheet[0] = _sfInitialize(obj, canvasID, data);
    //this.ActiveSheet = this.Sheet[0];


    //data = _sfCreateData(10, 15);
    // obj = new P8.SpreadSheet(canvasID, data);
    //this.Sheet[1] = _sfInitialize(obj, canvasID, data);;

    //_sfActiveSheetValues(this)
    //this.Sheets = obj;
};

function _sfInitialize(obj, canvasID, data) {


    obj.SheetName = "Sheet";

    obj.backgroundColor = "#E2E2E2"; //"red";//
    obj.gridlLineColor = "#E2E2E2";


    //obj.backgroundColor = "green";//"#E2E2E2";
    //obj.gridlLineColor =  "red" ;//"#E2E2E2";

    obj.exportColumn = false;

    obj.imagelist = [];
    obj.mergeList = [];
    obj.exportList = [];
    obj.RenderStatus = true;
    obj.canvasID = canvasID;
    obj.havelistner = false;
    obj.startRow = 1;
    obj.startCol = 1;
    obj.ScrollCounterH = 1;
    obj.ScrollCounterV = 1;
    obj.ScrollActive = false;

    obj.FreezeRow = -1;
    obj.FreezeCol = -1;

    obj.ColumnDataTypeStart = 0;

    //obj.RecordText = "Row no. ";
    obj.RecordText = "aagempty";

    obj.HeadertColumnHeight = 26;
    obj.HeadertGroupHeight = 26;

    obj.FreezeWidth = "1px";
    obj.FreezeColor = "rgba(0,0,0,0.0)";

    obj.HeaderBackround = "#e4ecf7";
    obj.HeaderFontFamily = "Arial,Tahoma";
    obj.HeaderFontSize = 13;
    obj.HeaderColor = "#212121";
    obj.HeaderNumText = "";

    obj.ListViewRowLoaderCount = 1000;


    obj.VHeaderBackround = "#e4ecf7";
    obj.VHeaderFontFamily = "Arial,Tahoma";
    obj.VHeaderFontSize = 13;
    obj.VHeaderColor = "#212121";

    //obj.Theme= P8Themes.DEFAULT;
    obj.Theme = P8Themes.FANCY;

    obj.ColumnHeaderIndex = -1;
    //var tlVBG = "#e4ecf7";
    //var tlVFont = "Arial,Tahoma";
    //var tlVFontSize = 12;
    //var tlVColor = "#212121";

    obj.ShowFormula = false;

    obj.haveLog = haveLog;

    obj.CellIndexes = { Col: -1, Row: -1, Col2: -1, Row2: -1 };
    obj.CellSelHover = false;
    obj.CellSelValue = { col: -1, row: -1 };
    obj.CellClickTime = new Date();

    obj.CellSelected = {};
    obj.currentCells = [];
    obj.DefaultSettings = _sfDefaultSettings();
    obj.ColumnConfig = [];
    obj.RowConfig = [];
    obj.Events = [];
    obj.CellFomulaList = [];

    obj.CellConditionalID = 1;
    obj.CellConditionalList = [];

    obj.CellRowMaxAdd = 4;
    obj.CellRowMax = 18;
    obj.CellColMax = 12;

    obj.ColumnResizable = true;
    obj.IsResizeClick = false;
    obj.IsResizeHover = false;
    obj.IsResizeHoverValue = 0;
    obj.IsResizeHoverSValue = 0;
    obj.IsResizeColumnWidth = 0;
    obj.IsResizeColumnIndex = -1;

    obj.RowResizable = true;
    obj.IsResizeRowHeight = 0;
    obj.IsResizeRowIndex = -1;
    obj.IsResizeRow = false;

    obj.AutoWrap = false;
    obj.AutoWrapRender = false;

    obj.ReportHeader = false;


    obj.Enabled = true;

    if (obj.Data == undefined) {
        obj.DataBind(_sfCreateData(3, 5));
    }


    obj.Format_SelHeadBG = "rgba(0, 117, 255, 0.19)";


    obj.IsDesigner = false;

    //obj.ActiveSheet = obj;

    if (getParameterByName("nkmob") == "y") {
        obj.backgroundColor = "#FFFFFF";
        obj.gridlLineColor = "#FFFFFF";
    }

    return obj;
}





function fnExcelReport() {
    var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange; var j = 0;
    tab = document.getElementById('headerTable'); // id of table


    for (j = 0; j < tab.rows.length; j++) {
        tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
        //tab_text=tab_text+"</tr>";
    }

    tab_text = tab_text + "</table>";
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html", "replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus();
        sa = txtArea1.document.execCommand("SaveAs", true, "Say Thanks to Sumit.xls");
    }
    else                 //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));


    return (sa);
}


function _sfCreateStyle(config) {
    var str;



    return str;
}

//tablesToExcel(['tbl1','tbl2'], ['ProductDay1','ProductDay2'], 'TestBook.xls', 'Excel')"
var tablesToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
        , tmplWorkbookXML = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">'
            + '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author>Promptus8</Author><Created>{created}</Created></DocumentProperties>'
            + '<Styles>'
            + '<Style ss:ID="Currency"><NumberFormat ss:Format="Currency"></NumberFormat></Style>'
            + '<Style ss:ID="Date"><NumberFormat ss:Format="Medium Date"></NumberFormat></Style>'
            //   + '{worksheetsstyle}'
            + '</Styles>'
            + '{worksheets}</Workbook>'
        , tmplWorksheetXML = '<Worksheet ss:Name="{nameWS}"><Table>{rows}</Table></Worksheet>'
        , tmplCellXML = '<Cell{attributeStyleID}{attributeFormula}><Data ss:Type="{nameType}">{data}</Data></Cell>'
        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    return function (tables, wbname, appname) {
        var ctx = "";
        var workbookXML = "";
        var worksheetsXML = "";
        var rowsXML = "";

        //for (var i = 0; i < tables.length; i++) {
        //    if (!tables[i].nodeType) tables[i] = document.getElementById(tables[i]);
        //    for (var j = 0; j < tables[i].rows.length; j++) {
        //        rowsXML += '<Row>'
        //        for (var k = 0; k < tables[i].rows[j].cells.length; k++) {
        //            var dataType = tables[i].rows[j].cells[k].getAttribute("data-type");
        //            var dataStyle = tables[i].rows[j].cells[k].getAttribute("data-style");
        //            var dataValue = tables[i].rows[j].cells[k].getAttribute("data-value");
        //            dataValue = (dataValue) ? dataValue : tables[i].rows[j].cells[k].innerHTML;
        //            var dataFormula = tables[i].rows[j].cells[k].getAttribute("data-formula");


        //            dataFormula = (dataFormula) ? dataFormula : (appname == 'Calc' && dataType == 'DateTime') ? dataValue : null;
        //            ctx = {
        //                attributeStyleID: (dataStyle == 'Currency' || dataStyle == 'Date') ? ' ss:StyleID="' + dataStyle + '"' : ''
        //                   , nameType: (dataType == 'Number' || dataType == 'DateTime' || dataType == 'Boolean' || dataType == 'Error') ? dataType : 'String'
        //                   , data: (dataFormula) ? '' : dataValue
        //                   , attributeFormula: (dataFormula) ? ' ss:Formula="' + dataFormula + '"' : ''
        //            };
        //            rowsXML += format(tmplCellXML, ctx);
        //        }
        //        rowsXML += '</Row>'
        //    }
        //    ctx = { rows: rowsXML, nameWS: wsnames[i] || 'Sheet' + i };
        //    worksheetsXML += format(tmplWorksheetXML, ctx);
        //    rowsXML = "";
        //}
        var _mSpreadBook = tables;

        var _worksheetsstyle = "";
        var stylecount = 1;
        for (var i = 0; i < _mSpreadBook.Sheet.length; i++) {
            var sheetname;
            //wsnames[i]
            sheetname = _mSpreadBook.Sheet[i].SheetName;
            //if (!tables[i].nodeType) tables[i] = document.getElementById(tables[i]);
            var sheet = _mSpreadBook.Sheet[i];
            for (var row = 0; row < sheet.Data.length; row++) {
                rowsXML += '<Row style="background-color:red">'
                for (var col = 0; col < sheet.ColumnConfig.length; col++) {
                    //dataType
                    var dataType = sheet.Data[row].Data[_sfGetCellName(sheet, col)].Config.dataType;
                    var dataStyle = "";//sheet.Data[row].Data[p8_NumberToCell(col + 1)].Config.dataStyle;
                    var dataValue = sheet.Data[row].Data[_sfGetCellName(sheet, col)].value;
                    dataValue = (dataValue) ? dataValue : sheet.GetText(col, row);
                    var dataFormula = sheet.Data[row].Data[_sfGetCellName(sheet, col)].formula;

                    //if (dataFormula != "") dataStyle = "Formula";
                    //temporary remove single qoute
                    dataFormula = dataFormula._sfReplaceAll("'", '');


                    //dataStyle = _sfCreateStyle("s" + (stylecount+1));
                    //if (dataStyle != "") {
                    //    _worksheetsstyle += dataStyle;
                    //    stylecount = stylecount + 1;
                    //}


                    dataFormula = (dataFormula) ? dataFormula : (appname == 'Calc' && dataType == 'DateTime') ? dataValue : null;
                    ctx = {
                        attributeStyleID: (dataStyle == 'Currency' || dataStyle == 'Date' || dataStyle != "") ? ' ss:StyleID="' + dataStyle + '"' : ''
                        , nameType: (dataType == 'Number' || dataType == 'DateTime' || dataType == 'Boolean' || dataType == 'Error') ? dataType : 'String'
                        , data: (dataFormula) ? '' : dataValue
                        , attributeFormula: (dataFormula) ? ' ss:Formula="' + dataFormula + '"' : ''


                    };
                    rowsXML += format(tmplCellXML, ctx);
                }
                rowsXML += '</Row>'
            }

            ctx = { rows: rowsXML, nameWS: sheetname || 'Sheet' + i, worksheetsstyle: _worksheetsstyle };
            worksheetsXML += format(tmplWorksheetXML, ctx);
            rowsXML = "";
        }



        ctx = { created: (new Date()).getTime(), worksheets: worksheetsXML };
        workbookXML = format(tmplWorkbookXML, ctx);

        //console.log(workbookXML);

        //var link = document.createElement("A");
        //link.href = uri + base64(workbookXML);
        //link.download = wbname || 'Workbook.xls';
        //link.target = '_blank';
        //document.body.appendChild(link);
        //link.click();
        //document.body.removeChild(link);


        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
        {
            txtArea1.document.open("txt/html", "replace");
            txtArea1.document.write(workbookXML);
            txtArea1.document.close();
            txtArea1.focus();
            sa = txtArea1.document.execCommand("SaveAs", true, "Say Thanks to Sumit.xls");
        }
        else                 //other browser not tested on IE 11
            sa = window.open('data:application/vnd.ms-excel,filename=' + (wbname || 'Workbook.xls') + ';' + encodeURIComponent(workbookXML));
    }
})();
//P8Sheet.prototype.SetTextActive = function (text) {
//    _sfStartTime();
//    var c = -1;
//    var r = -1;
//    _sfSetText(this, c, r, text);
//}


function _sfActiveSheetValues(obj) {
    return { index: 0, name: "Sheet1" };
}

var ActiveSheet = function () {
    //constructor
};
ActiveSheet.prototype.SetTextActive = function (text) {
    _sfStartTime();
    var c = -1;
    var r = -1;
    _sfSetText(this, c, r, text);
}

function _sfDefaultSettingsColumn() {
    return {
        Attribute: null
        , CheckBox: null
        , Class: null
        , ColumName: ""
        , ColumnTemplate: ""
        , ColumnTemplateEmpty: "aagdefault"
        , ColumnTemplateObject: ""
        , ColumnWidth: "150"
        , Enabled: true
        , FontFamily: ""
        , FontSize: ""
        , FontStyle: ""
        , FontWeight: ""
        , HeaderColumnReq: null
        , MergeRow: null
        , ObjectType: ""
        , Precision: 2
        , Protected: null
        , TextAlign: ""
        , TextColor: ""
        , TextDecoration: null
        , ThousandSeparator: null
        , VerticalAlign: null
        , backgroundColor: null
        , dataType: null
    };
}

function _sfDefaultSettings() {
    return {
        bold: "normal", italic: "normal"
        , underline: "none"
        , fontSize: "12", fontFamily: "Arial"
        , textAlignment: "left"
        , textVertical: "middle"

        , backgroundColor: "inherit"
        , textColor: "black"




        , borderColorTop: "black"
        , borderColorBottom: "black"
        , borderColorLeft: "black"
        , borderColorRight: "black"

        , borderStyleTop: "solid"
        , borderStyleBottom: "solid"
        , borderStyleLeft: "solid"
        , borderStyleRight: "solid"

        , borderWidthTop: "none"
        , borderWidthBottom: "none"
        , borderWidthLeft: "none"
        , borderWidthRight: "none"


        , dataType: ""
        , dataStyle: ""
        , format: ""


        , lookupBackgroundColor: "cyan"

        , prevEvenRow: -1
        , prevEvenCol: -1


    };
}


function _sfCreateConfigData(config, _id, value) {

    var valueX = undefined;
    if (config == undefined) config = [];

    for (var i = 0; i < config.length; i++) {
        var formatID = config[i].id;
        if (formatID == _id) {
            try {
                valueX = "";
                valueX = config[i]["element"].value;
            } catch (err) { }
            break;
        }
    }

    if (valueX != undefined) {
        config[i]["element"].value = value;
    }
    else {
        config.push({ id: _id, element: { value: value } });
    }

    return config;
}

function _sfCreateConfigDataCondition(config, _id, value) {

    var valueX = undefined;
    if (config == undefined) config = [];


    for (var i = 0; i < config.length; i++) {
        var formatID = config[i].id;
        if (formatID == _id) {
            try {
                valueX = "";
                valueX = config[i]["element"].value;
            } catch (err) { }
            break;
        }
    }

    if (valueX != undefined) {
        config[i]["element"].value = value;
    }
    else {
        config.push({ id: _id, element: { value: value } });
    }

    return config;
}



// SetFormat
function _sfSetFormat(obj, icol, irow, format, data, icol2, irow2) {
    if (icol == undefined) icol = obj.CellIndexes.Col;
    if (irow == undefined) irow = obj.CellIndexes.Row;

    if (icol2 < icol) icol2 = obj.CellIndexes.Col2;
    if (irow2 < irow) irow2 = obj.CellIndexes.Row2;

    //if (icol2 == undefined) icol2 = obj.CellIndexes.Col2;
    //if (irow2 == undefined) irow2 = obj.CellIndexes.Row2;

    try {
        if (irow == Spread_ALLROW) {
            _sfCreateConfigDataColumn(obj.ColumnConfig[icol], format, data);

        }
        else if (icol == Spread_ALLCOL) {
            //for (var i = 0; i < obj.ColumnConfig.length; i++) {
            //    _sfCreateConfigData(obj.Data[irow][_sfGetCellName(obj, i)].Config, format, data);
            //}
            _sfCreateConfigDataRow(obj.RowConfig, irow, format, data);

        }
        else {
            if (icol != icol2 || irow != irow2) {
                for (var ic = icol; ic <= icol2; ic++) {
                    for (var ir = irow; ir <= irow2; ir++) {
                        _sfCreateConfigData(obj.Data[ir][_sfGetCellName(obj, ic)].Config, format, data);
                    }
                }
            } else {
                _sfCreateConfigData(obj.Data[irow][_sfGetCellName(obj, icol)].Config, format, data);
            }

        }

        obj.ScrollActive = true;
        obj.RenderNoEvent();
    } catch (err) {
        //_sfLog(err);
    }
}
function _sfSetFormatN(obj, icol, irow, format, data) {
    if (icol == undefined) icol = obj.CellIndexes.Col;
    if (irow == undefined) irow = obj.CellIndexes.Row;

    // function _sfSetFormat(obj, icol, irow, format, data) {
    try {
        if (irow == Spread_ALLROW) {
            _sfCreateConfigDataColumn(obj.ColumnConfig[icol], format, data);
        }
        else if (icol == Spread_ALLCOL) {
            _sfCreateConfigDataRow(obj.RowConfig, irow, format, data);
        }
        else {
            _sfCreateConfigData(obj.Data[irow][_sfGetCellName(obj, icol)].Config, format, data);
        }
    } catch (err) { }


}
function _sfSetFormatDone(obj, icol, irow, format, data) {
    obj.ScrollActive = true;
    obj.RenderNoEvent();
}

//initialize spread
P8.SpreadSheet.prototype.DataBind = function (data) {

    //this.Data = data;
    this.Data = data._data;
    this.ColumnConfig = data._column;
    this.RowConfig = data._row;

    //set column datatype
    for (var i = 0; i < this.ColumnConfig.length; i++) {
        try {
            //objecttype
            if (this.ColumnConfig[i].CheckBox == "true" || this.ColumnConfig[i].CheckBox == "True" || this.ColumnConfig[i].CheckBox == true ||
                this.ColumnConfig[i].ObjectType == "checkbox") {
                var CheckBoxShow = this.ColumnConfig[i].CheckBoxShow == undefined ? true:  this.ColumnConfig[i].CheckBoxShow;
                if(CheckBoxShow == true){
                    this.ColumnConfig[i].ObjectType = "checkbox";
                    try {
                        var istick = true;
                        for (j = 0; j < this.Data.length; j++) {
                            var value = this.Data[j][p8_NumberToCell(i+1)].value;
                            if (value == "1" || value == true || value == "true" || value == "True") {

                            } else {
                                istick = false;
                                break;
                            }
                        }
                        if (this.Data.length <= 0) {
                            istick = false;
                        }
                        if (istick) {
                            this.ColumnConfig[i].CheckBoxValue = true;
                        } else {
                            this.ColumnConfig[i].CheckBoxValue = false;
                        }
                    } catch (ex) { }
                }
            }


            // dataype
            if (this.ColumnConfig[i].ColumnTemplate.indexOf('nwPercentValue') >= 0) {
                this.ColumnConfig[i].dataType = "percentvalue";
            }
            else if (this.ColumnConfig[i].ColumnTemplate.indexOf('nwPercent') >= 0) {
                this.ColumnConfig[i].dataType = "percent";
            }
            else if (this.ColumnConfig[i].ColumnTemplate.indexOf('isNumber numC') >= 0) {
                this.ColumnConfig[i].dataType = "currency";
            }
            else if (this.ColumnConfig[i].ColumnTemplate.indexOf('isNumber') >= 0) {
                this.ColumnConfig[i].dataType = "number";
            }
            else if (this.ColumnConfig[i].ColumnTemplate.indexOf('nwDatePick') >= 0
                || this.ColumnConfig[i].ColumnTemplate.indexOf('nwDatePicker') >= 0) {
                this.ColumnConfig[i].dataType = "date";
            }


        } catch (err) { }
    }

    //.DataTypeCol(3,"number");
}

P8.SpreadSheet.prototype.RowDelete = function (index, rowminus) {
    rowminus = rowminus == undefined ? 1 : rowminus;
    if (index == undefined) { }
    else {
        _sfJsonDelete(this.Data, index, rowminus);
        _sfSpreadDeleteRowAdjustConfig(this, index, rowminus);
        _sfSpreadAdjustMergeList(this, index, (rowminus == undefined ? 1 : rowminus) * -1,0);
        try {
            try {
                var jsonupdatecell = func_RowDelete_Menuitem(index, rowminus, this.canvasID, this.CellIndexes.Row, this.CellIndexes.Col);
            } catch (err) {
                try {
                    var jsonupdatecell = func_RowDelete(index, rowminus, this.canvasID, this.CellIndexes.Row, this.CellIndexes.Col);
                } catch (err) { }
            }
            if (jsonupdatecell.length > 0) {
                this.JSONUpdateCell(rowminus * -1, index, 0, rowminus * -1, jsonupdatecell)
            }
        } catch (ex) { }
        this.UpdateFormula(Spread_ALLCOL, index, 0, rowminus * -1);
        try {
            func_RowDeleteDone(index, rowminus);
        } catch (err) { }
        this.ScrollActive = true;
        this.RenderNoEvent();
    }
    return index;
}
function _sfSpreadDeleteRowAdjustConfig(obj, startindex, rowminus) {
    var len = obj.RowConfig.length;

    for (var i = 0; i < len; i++) {
        if (obj.RowConfig[i].row == startindex) {
            obj.RowConfig.splice(i, rowminus);
            break;
        }
    }
    len = obj.RowConfig.length;
    for (var i = 0; i < len; i++) {
        if (obj.RowConfig[i].row > startindex) {
            obj.RowConfig[i].row = obj.RowConfig[i].row - rowminus;
        }
    }
}

P8.SpreadSheet.prototype.RowAdd = function (atbegin, rowadd) {
    var index = 0;
    rowadd = rowadd == undefined ? 1 : rowadd;
    var Data = this.JSONCopy(this.Data);
    arry = _sfSpreadAddRow(this);
    for (var i = 0; i < rowadd; i++) {
        Data = this.JSONCopy(Data);

        if (atbegin == true) Data.unshift(arry);
        else Data.push(arry);

    }
    this.Data = Data;
    this.ScrollActive = true;
    this.RenderNoEvent();
    return index;
}

P8.SpreadSheet.prototype.RowInsert = function (index, isbottom, norender, hasfreeze,rowadd) {

    if (isbottom == undefined) isbottom = true;
    if (hasfreeze == undefined) hasfreeze = true;
    if (hasfreeze) {
        if ((index < this.FreezeRow && isbottom == false)
            ||
            (index < this.FreezeRow && isbottom == true)
        ) {
            try {
                ToastMessage("Insert Row is Invalid for Freeze Panes");
            } catch (err) {
                console.log("Insert Row is Invalid for Freeze Panes");
            }
            return false;
        }
    }

    var arry = _sfSpreadAddRow(this);
    var row = index;
    if (isbottom) {
        row += 1;
    }

    this.Data.splice(row, 0, arry);
    _sfSpreadInsertRowAdjustConfig(this, row);
    this.UpdateFormula(Spread_ALLCOL, row, 0, 1);
    _sfSpreadAdjustMergeList(this, row, (rowadd == undefined ? 1 : rowadd),0);

    try {
       
        var rowadd = 1;
        try {
            var jsonupdatecell = func_RowInsert_Menuitem(index, isbottom, rowadd, this.canvasID, this.CellIndexes.Row, this.CellIndexes.Col);
        } catch (err) {
            try {
                var jsonupdatecell = func_RowInsert(index, isbottom, rowadd, this.canvasID, this.CellIndexes.Row, this.CellIndexes.Col);
            } catch (err) { }
        }
        if (jsonupdatecell.length > 0) {
            this.JSONUpdateCell(-1, row, 0, 1, jsonupdatecell)
        }
    } catch (ex) { }

    if (norender == undefined) norender = false;

    if (norender == false) {
        this.ScrollActive = true;
        this.RenderNoEvent();
    }
    return index;
}
function _sfSpreadInsertRowAdjustConfig(obj, startindex) {
    var len = obj.RowConfig.length;
    for (var i = 0; i < len; i++) {
        if (obj.RowConfig[i].row >= startindex) {
            obj.RowConfig[i].row = obj.RowConfig[i].row + 1;
        }
    }
}

//Array.prototype.insertArray = function (index, item) {
//    this.splice(index, 0, item);
//};
//P8.SpreadSheet.prototype.RowInsertUp = function (index) {
//    if (index == undefined) index = 0;
//    arry = _sfSpreadAddRow(this);
//    //this.Data.unshift(arry);
//    this.Data.insertArray(index, arry);

//   // this.Data.push(arry);

//    this.ScrollActive = true;
//    this.RenderNoEvent();
//    return index;
//}


function _sfSpreadAddRow(obj) {
    // var obj = mSpreadBook.Sheet[0];
    var arry = {};
    for (var i = 0; i < obj.ColumnConfig.length; i++) {
        var colname = obj.ColumnConfig[i].name;
        arry[colname] = { value: "", formula: "", Config: [] };

    }
    return arry;
}


P8.SpreadSheet.prototype.RowHeight = function (r, data) {
    if (data == undefined) data = this.Data[r].aagrowHeight || (def_Height + 0);
    else {
        this.Data[r].aagrowHeight = data;
        this.ScrollActive = true;
        this.RenderNoEvent();
    }
    return data;
}

P8.SpreadSheet.prototype.CallAutoWrap = function () {
    _sfAutoWrap(this);
    this.ScrollActive = true;
    this.RenderNoEvent();

}
P8.SpreadSheet.prototype.CallAutoWrapRow = function (r) {
    _sfAutoWrapRow(this, r);
    obj = this;
    setTimeout(function () {
        obj.ScrollActive = true;
        obj.RenderNoEvent();
    }, 100);
}


P8.SpreadSheet.prototype.SetColumnWidth = function (c, data) {
    return this.ColumnWidth(c, data);
}


P8.SpreadSheet.prototype.ColumnWidth = function (c, data) {
    if (data == undefined) {
        try {
            data = this.ColumnConfig[c].width;
        } catch (err) {
            data = 120;
        }
    }
    else {
        this.ColumnConfig[c].width = data;
        this.ScrollActive = true;
        this.RenderNoEvent();
    }
    return data;
}

P8.SpreadSheet.prototype.SetColumnToolTip = function (c, data) {
    if (data == undefined) {
        try {
            data = this.ColumnConfig[c].tooltip;
        } catch (err) {
            data = "";
        }
    }
    else {
        this.ColumnConfig[c].tooltip = data;
    }
    return data;
}



P8.SpreadSheet.prototype.ColumnName = function (c, data) {
    if (data == undefined) data = this.ColumnConfig[c].ColumName;
    else {
        this.ColumnConfig[c].ColumName = data;
        //this.ColumnConfig[c].name = data;
        this.ScrollActive = true;
        this.RenderNoEvent();
    }
    return data;
}


//P8.ColumnType = function (canvasID, data) {

//};
//P8.ColumnType.prototype.Checkbox = function () {
//    return "checkbox";
//}
//P8.ColumnType.prototype.CellText = function () {
//    return "celltext";
//}


P8.SpreadSheet.prototype.ColumnObjectType = function (c, data) {
    if (data == undefined) data = this.ColumnConfig[c].ObjectType;
    else {
        if ((this.ColumnConfig[c].ObjectType || "") == "" && this.ColumnConfig[c].CheckBox == true)
            data = "checkbox";

        this.ColumnConfig[c].ObjectType = data;
        this.ScrollActive = true;
        this.RenderNoEvent();
    }
    return data;
}

P8.SpreadSheet.prototype.DataTypeCol = function (c, data) {
    icol = c;
    if (data == undefined) data = data;
    else {
        this.ColumnConfig[c].dataType = data;
    }

    this.RenderNoEvent();
    return data;
}



P8.SpreadSheet.prototype.FreezePane = function (c, r) {

    if (c <= 0) c = 0;
    if (r <= 0) r = 0;

    this.FreezeRow = r;
    this.FreezeCol = c;

    this.ScrollActive = true;
    this.RenderNoEvent();
    return true;
}

P8.SpreadSheet.prototype.SetPrecision = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    if (data == undefined) data = data;
    else {
        _sfSetFormat(this, icol, irow, "Precision", data, icol2, irow2);
    }
    return data;
}


P8.SpreadSheet.prototype.SetDataType = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    if (data == undefined) data = data;
    else {
        _sfSetFormat(this, icol, irow, "dataType", data, icol2, irow2);
    }
    return data;
}

P8.SpreadSheet.prototype.DataType = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    if (data == undefined) data = data;
    else {
        _sfSetFormat(this, icol, irow, "dataType", data, icol2, irow2);
    }
    return data;
}
P8.SpreadSheet.prototype.DataStyle = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    if (data == undefined) data = data;
    else {
        _sfSetFormat(this, icol, irow, "dataStyle", data, icol2, irow2);
    }
    return data;
}


P8.SpreadSheet.prototype.SetSheetName = function (data) {
    this.SheetName = data;
    if (this.RenderStatus == false) return;
    _sfLoadSheetTab(this.Book, this.canvasID);
}




P8.SpreadSheet.prototype.SetTag = function (c, r, tagname, data, icol2, irow2) {
    if (tagname == undefined) {
        console.error("tagname is required");
        return;
    }
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "tag-" + tagname, data, icol2, irow2);
}
P8.SpreadSheet.prototype.GetTag = function (c, r, tagname) {
    if (tagname == undefined) return undefined;
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV;
    try {
        stringV = _sfCheckConfigType(this, r, c, "tag-" + tagname, false);;
    } catch (err) {
    }
    return stringV;
}



P8.SpreadSheet.prototype.SetTextColor = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "textColor", data, icol2, irow2);
}

P8.SpreadSheet.prototype.SetFontSize = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "fontSize", data, icol2, irow2);
}
P8.SpreadSheet.prototype.SetFontFamily = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "fontFamily", data, icol2, irow2);
}

P8.SpreadSheet.prototype.SetBold = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    if (data === true) data = "bold";
    if (data === false) data = "normal";
    _sfSetFormat(this, icol, irow, "bold", data, icol2, irow2);
}
P8.SpreadSheet.prototype.GetBold = function (c, r) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV;
    try {
        stringV = _sfCheckConfigType(this, r, c, "bold", false);;
    } catch (err) {

    }
    if (stringV == "bold") stringV = true;
    else if (stringV == "normal") stringV = false;
    else stringV = false;

    return stringV;
}

P8.SpreadSheet.prototype.SetTextIndent = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "textindent", data, icol2, irow2);
}
P8.SpreadSheet.prototype.GetTextIndent = function (c, r) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV;
    try {
        stringV = _sfCheckConfigType(this, r, c, "textindent", 0);;
    } catch (err) {
    }
    return stringV;
}

P8.SpreadSheet.prototype.GetItalic = function (c, r) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV;
    try {
        stringV = _sfCheckConfigType(this, r, c, "italic", false);;
    } catch (err) {

    }
    if (stringV == "italic") stringV = true;
    else if (stringV == "normal") stringV = false;
    else stringV = false;

    return stringV;
}

P8.SpreadSheet.prototype.GetUnderline = function (c, r) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV;
    try {
        stringV = _sfCheckConfigType(this, r, c, "underline", false);;
    } catch (err) {

    }
    if (stringV == "underline") stringV = true;
    else if (stringV == "normal") stringV = false;
    else stringV = false;

    return stringV;
}

P8.SpreadSheet.prototype.SetItalic = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    if (data === true) data = "italic";
    if (data === false) data = "normal";
    _sfSetFormat(this, icol, irow, "italic", data, icol2, irow2);
}
P8.SpreadSheet.prototype.SetUnderline = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    if (data === true) data = "underline";
    if (data === false) data = "none";
    _sfSetFormat(this, icol, irow, "underline", data, icol2, irow2);
}
P8.SpreadSheet.prototype.SetTextAlign = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "textAlignment", data, icol2, irow2);
}
P8.SpreadSheet.prototype.SetVerticalAlign = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "textVertical", data, icol2, irow2);
}
P8.SpreadSheet.prototype.GetVerticalAlign = function (c, r) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV;
    try {
        stringV = _sfCheckConfigType(this, r, c, "textVertical", false);;
    } catch (err) {

    }
    try { stringV = (stringV + "").replace("!important", ""); } catch (err) { }

    return stringV;
}

P8.SpreadSheet.prototype.SetBackground = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "backgroundColor", data, icol2, irow2);
}
P8.SpreadSheet.prototype.SetBackgroundPercent = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "backgroundColorPercent", data, icol2, irow2);
}
P8.SpreadSheet.prototype.SetBackgroundPercentValue = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "backgroundColorPercentValue", data, icol2, irow2);
}

P8.SpreadSheet.prototype.SetCurrencyCode = function (c, r, data, icol2, irow2) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;

    if (icol2 == undefined) icol2 = this.CellIndexes.Col2;
    if (irow2 == undefined) irow2 = this.CellIndexes.Row2;
    //icol2 = icol2 | c; irow2 = irow2 | r;

    _sfSetFormat(this, c, r, "currencyCode", data, icol2, irow2);
    try {
        var precision = P8Spread_Currency[data.toLowerCase()].precision;
        this.SetPrecision(c, r, precision, icol2, irow2);
    } catch (err) { }
    return data;
}

P8.SpreadSheet.prototype.SetEnable = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "Enabled", data, icol2, irow2);
};

P8.SpreadSheet.prototype.SetMaxLength = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "MaxLength", data, icol2, irow2);
};



P8.SpreadSheet.prototype.SetObjectType = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;

    if (data == undefined || data == "") data = "celltext";

    if (data == "checkboxtext")
        this.SetText2(c, r, this.GetText(c, r));

    _sfSetFormat(this, icol, irow, "ObjectType", data, icol2, irow2);

    //if (type == "checkbox")
    //    _sfSetFormat(this, icol, irow, "Checked", data);
};

P8.SpreadSheet.prototype.SetTemplate = function (c, r, Type, option, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    if (Type == "button") {
        this.SetObjectType(c, r, "button", icol2, irow2);
        this.SetBackground(c, r, (option.BackgroundColor || ""), icol2, irow2);
        this.SetText2(c, r, (option.Text || ""), icol2, irow2);
        this.SetTextColor(c, r, (option.TextColor || ""));

        this.SetTextAlign(c, r, "center");
        this.SetFontSize(c, r, "12");
        this.SetBold(c, r, false);
        this.SetVerticalAlign(c, r, "middle");
    }
    else if (Type == "remarks") {
        this.SetObjectType(c, r, "remarks", icol2, irow2);
        this.SetBackground(c, r, (option.BackgroundColor || ""), icol2, irow2);
        this.SetText2(c, r, (option.Text || "Remarks"), icol2, irow2);
        this.SetTextColor(c, r, (option.TextColor || ""));

        this.SetTextAlign(c, r, "center");
        this.SetFontSize(c, r, "12");
        this.SetBold(c, r, false);
        this.SetVerticalAlign(c, r, "middle");
    }
    else {
        this.SetObjectType(c, r, Type, icol2, irow2);
    }
}


var mergeList = [];
P8.SpreadSheet.prototype.SetMerge = function (c, r, c2, r2, data) {
    var irow = r; icol = c;
    var irow2 = r2; icol2 = c2;

    if (irow == undefined) irow = this.CellIndexes.Row;
    if (irow2 == undefined) irow2 = this.CellIndexes.Row2;

    if (icol == undefined) icol = this.CellIndexes.Col;
    if (icol2 == undefined) icol2 = this.CellIndexes.Col2;

    var data = { col: icol, row: irow, col2: icol2, row2: irow2 };

    var isexists = false;
    for (var i = 0; i < this.mergeList.length; i++) {
        if (this.mergeList[i].col == icol && this.mergeList[i].row == irow) {
            this.mergeList.splice(i, 1);
            //isexists = true;
        }
    }

    if (isexists == false)
        this.mergeList.push(data);


    _sfSetFormat(this, icol, irow, "merge", [data], icol2, irow2);
}



P8.SpreadSheet.prototype.SetBorderColorTop = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "borderColorTop", data, icol2, irow2);
}
P8.SpreadSheet.prototype.SetBorderColorBottom = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "borderColorBottom", data, icol2, irow2);
}
P8.SpreadSheet.prototype.SetBorderColorLeft = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "borderColorLeft", data, icol2, irow2);
}
P8.SpreadSheet.prototype.SetBorderColorRight = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "borderColorRight", data, icol2, irow2);
}



P8.SpreadSheet.prototype.SetBorderStyleTop = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "borderStyleTop", data, icol2, irow2);
}
P8.SpreadSheet.prototype.SetBorderStyleBottom = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "borderStyleBottom", data, icol2, irow2);
}
P8.SpreadSheet.prototype.SetBorderStyleLeft = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "borderStyleLeft", data, icol2, irow2);
}
P8.SpreadSheet.prototype.SetBorderStyleRight = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "borderStyleRight", data, icol2, irow2);
}



P8.SpreadSheet.prototype.SetBorderWidthTop = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "borderWidthTop", data, icol2, irow2);
}
P8.SpreadSheet.prototype.SetBorderWidthBottom = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "borderWidthBottom", data, icol2, irow2);
}
P8.SpreadSheet.prototype.SetBorderWidthLeft = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "borderWidthLeft", data, icol2, irow2);
}
P8.SpreadSheet.prototype.SetBorderWidthRight = function (c, r, data, icol2, irow2) {
    var irow = (r == undefined) ? this.CellIndexes.Row : r; icol = (c == undefined) ? this.CellIndexes.Col : c; icol2 = (icol2 == undefined) ? ((c == undefined) ? this.CellIndexes.Col2 : c) : icol2; irow2 = irow2 == undefined ? ((r == undefined) ? this.CellIndexes.Row2 : r) : irow2;
    _sfSetFormat(this, icol, irow, "borderWidthRight", data, icol2, irow2);
}

P8.SpreadSheet.prototype.SetBorder = function (c, r, data) {
    _sfSetBorder(this, c, r, data, "");
}
P8.SpreadSheet.prototype.SetBorderTop = function (c, r, data) {
    _sfSetBorder(this, c, r, data, "1");
}

P8.SpreadSheet.prototype.SetBorderBottom = function (c, r, data) {
    _sfSetBorder(this, c, r, data, "2");
}

P8.SpreadSheet.prototype.SetBorderRight = function (c, r, data) {
    _sfSetBorder(this, c, r, data, "3");
}
P8.SpreadSheet.prototype.SetBorderLeft = function (c, r, data) {
    _sfSetBorder(this, c, r, data, "4");
}

function _sfSetBorder(obj, c, r, data, tag) {
    var irow = r; icol = c;
    var splitdata = data.split(" ");
    var widthX = "1";
    var styleX = "solid";
    var colorX = "black";
    var arrStyle = ["solid", "dotted", "dashed", "double"];
    for (var i = 0; i < splitdata.length; i++) {
        if (splitdata[i] == undefined) splitdata[i] = "";
        if ((arrStyle.indexOf(splitdata[i]) > -1))
            styleX = splitdata[i];
        else if (!isNaN(splitdata[i].replace("px", "")) || splitdata[i].indexOf("px") > -1) { widthX = splitdata[i].replace("px", ""); }
        else {
            colorX = splitdata[i];
        }
    }

    if (tag == "" || tag == "1") {
        _sfSetFormatN(obj, icol, irow, "borderWidthTop", widthX);
        _sfSetFormatN(obj, icol, irow, "borderStyleTop", styleX);
        _sfSetFormatN(obj, icol, irow, "borderColorTop", colorX);
    }
    if (tag == "" || tag == "2") {
        _sfSetFormatN(obj, icol, irow, "borderWidthBottom", widthX);
        _sfSetFormatN(obj, icol, irow, "borderStyleBottom", styleX);
        _sfSetFormatN(obj, icol, irow, "borderColorBottom", colorX);
    }

    if (tag == "" || tag == "3") {
        _sfSetFormatN(obj, icol, irow, "borderWidthRight", widthX);
        _sfSetFormatN(obj, icol, irow, "borderStyleRight", styleX);
        _sfSetFormatN(obj, icol, irow, "borderColorRight", colorX);
    }


    if (tag == "" || tag == "4") {
        _sfSetFormatN(obj, icol, irow, "borderWidthLeft", widthX);
        _sfSetFormatN(obj, icol, irow, "borderStyleLeft", styleX);
        _sfSetFormatN(obj, icol, irow, "borderColorLeft", colorX);
    }




    _sfSetFormatDone(obj, icol, irow, "", data);
}


P8.SpreadSheet.prototype.SetText2 = function (c, r, text) {
    _sfStartTime();
    if (r == Spread_ALLROW && c >= 0) {
        try {
            this.ColumnConfig[c].Text2 = text;
        } catch (err) { }
    }
    _sfSetText(this, c, r, text, "text2");
};



P8.SpreadSheet.prototype.SetTextActive = function (text) {
    _sfStartTime();
    var c = -1;
    var r = -1;
    _sfSetText(this, c, r, text);
};
P8.SpreadSheet.prototype.SetSelectedIndexes = function (option) {
    try { this.CellIndexes.Col = option.col != undefined ? option.col : this.CellIndexes.Col; } catch (err) { }
    try { this.CellIndexes.Row = option.row != undefined ? option.row : this.CellIndexes.Row; } catch (err) { }
    try { this.CellIndexes.Col2 = option.col2 != undefined ? option.col2 : (option.col != undefined ? option.col : this.CellIndexes.Col2); } catch (err) { }
    try { this.CellIndexes.Row2 = option.row2 != undefined ? option.row2 : (option.row != undefined ? option.row : this.CellIndexes.Row2); } catch (err) { }


    this.ScrollActive = true;
    this.RenderNoEvent();
    return this.GetSelectedIndexes();
};


P8.SpreadSheet.prototype.SetText = function (c, r, text, type, librarybase) {
    _sfStartTime();
    if (text == undefined) text = "";
    text += "";
    if (this.IsDesigner == false && text.trim().indexOf("=") == 0) {
        text = text.replace("=", "");
    }

    //if (this.IsDesigner == true) {
    //    if (this.IsDesigner == true && text.trim().indexOf("=") == 0) {
    //        this.SetDataType(c, r, "currency");
    //    }
    //    if (isNaN(text)) {
    //        this.SetDataType(c, r, "currency");
    //    }
    //}

    _sfSetText(this, c, r, text, type, librarybase);
};

P8.SpreadSheet.prototype.SetFormula = function (c, r, text, type, librarybase) {
    _sfStartTime();
    if (text.trim().indexOf("=") != 0) {
        _sfPromptMessage("Invalid Formula");
    } else {
        _sfSetText(this, c, r, text, type, false, true);
    }
};

//aagedit
P8.SpreadSheet.prototype.AddConditionalFormatting = function (type, range) {

    var col = 2;
    var row = 2;
    var col2 = 4;
    var row2 = 4;
    this.CellConditionalList.push({
        id: this.CellConditionalID
        , type: type
        , range: range
        , col: col
        , row: row
        , col2: col2
        , row2: row2
        , format: [{

        }]
    });

    this.CellConditionalID += 1;
};

P8.SpreadSheet.prototype.SetValue = function (c, r, text) {

    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV = text;
    try {
        this.Data[r][_sfGetCellName(this, c)].value = stringV;
    } catch (err) {

    }
    this.Refresh();
    return stringV;
};

function _sfIsDate(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

function _sfSetText(obj, c, r, text, type, librarybase, isformula) {
    if (c == undefined) c = obj.CellIndexes.Col;
    if (r == undefined) r = obj.CellIndexes.Row;

    _sfStartTime();
    if (librarybase == undefined) librarybase = false;
    if (isformula == undefined) isformula = false;
    var isValueChange = false;

    if (text == "__/__/____") text = "";



    if (c == undefined || c < 0) c = obj.CellIndexes.Col;
    if (r == undefined || r < 0) r = obj.CellIndexes.Row;
    try {
        //this.Data[r][Object.keys(this.Data[r])[c]] = text;
        if (type == "text2") {
            obj.Data[r][_sfGetCellName(obj, c)].text2 = text;
        }
        else {
            if (text.trim().indexOf("=") == 0 && type != "text2") {
                var iserror = _sfSetFormula(obj, c, r, text);
                if (iserror) return;
            }
            else {

                if (obj.Data[r][_sfGetCellName(obj, c)].value != text) {
                    if (librarybase) {
                        var isValid = true;
                        try {
                            isValid = p8Spread_Change_Initial_Menuitem(obj.canvasID, r, c);
                        } catch (err) {
                            try {
                                isValid = p8Spread_Change_Initial(obj.canvasID, r, c);
                            } catch (err) { }
                        }
                        isValid = isValid == undefined ? true: isValid;
                    }
                    isValueChange = true;
                }

                if (obj.GetDataType(c, r) == "percentvalue") {
                    try {
                        text = parseFloat(text) / 100.0;
                        if (isNaN(text) || text == undefined || text == null) {
                            text = "";
                        }
                    }
                    catch (err) { }
                }
                else if (obj.GetDataType(c, r) == "date") {
                    text = text.replace("\n", "");
                    if (!_sfIsDate(text) && text != "") {
                        text = "";
                        _sfPromptMessage("Invalid date");
                    }
                }

                obj.Data[r][_sfGetCellName(obj, c)].value = text;
                obj.Data[r][_sfGetCellName(obj, c)].formula = "";

                //look all formula link
                for (var i = obj.CellFomulaList.length - 1; i >= 0; i--) {
                    if (obj.CellFomulaList[i]["aid"] == c + ":" + r)
                        obj.CellFomulaList.splice(i, 1);
                }
            }
        }





        //var results = [];
        //var searchField = "name";
        //var searchVal = "my Name";
        //for (var i = 0 ; i < obj.list.length ; i++) {
        //    if (obj.list[i][searchField] == searchVal) {
        //        results.push(obj.list[i]);
        //    }
        //}

        /*
        //var canvasSheet = document.getElementById(obj.canvasID + "_vw");
        //var contextSheet = canvasSheet.getContext('2d');
        //contextSheet.filter = 'blur(1px)';
        //contextSheet.fillStyle = "rgba(250,250,250,0.01)";
        //contextSheet.shadowBlur = 15;//  shadow Blur
        //contextSheet.fillRect(0, 0, canvasSheet.width, canvasSheet.height);

        //var option = { y: 0, x: 0, width: canvasSheet.width, height: canvasSheet.height, font: " 15px Arial", fitParent: true, color: "black", x: 0, y: 0, verticalAlign: "middle", textAlign: "center" };
        //CanvasTextWrapper(canvasSheet, "Calculating...", option);
        */

        if (obj.RenderStatus == true)
            _sfAutoWrapRow(obj, r);


        if (isformula == true) {
            var searchVal = c + ":" + r + ":";
            _sfComputeFormulaSub(obj, searchVal);

            if (obj.RenderStatus == true) {
                obj.ScrollActive = true;
                obj.RenderNoEvent();
            }
        } else {
            setTimeout(function () {
                var searchVal = c + ":" + r + ":";
                _sfComputeFormulaSub(obj, searchVal);

                if (obj.RenderStatus == true) {
                    obj.ScrollActive = true;
                    obj.RenderNoEvent();
                }

                if (librarybase == true) {
                    setTimeout(function () {
                        try {
                            if (isValueChange) {
                                P8SpreadLastCellChange.canvasID = obj.canvasID;
                                P8SpreadLastCellChange.col = c;
                                P8SpreadLastCellChange.row = r;
                                // console.log(" p8Spread_Change('" + obj.canvasID + "'," + r + "," + c + ")");
                                try {
                                    p8Spread_ChangeT(obj.canvasID, r, c);
                                } catch (err) { }

                            }
                        } catch (err) { }
                    }, 0);
                }

            }, 10);
        }


    } catch (err) {

    }
}

//compute Formulas 
function _sfComputeFormulaSub(obj, zsearchVal) {
    var arryData = _sfJson(obj.CellFomulaList, "cellID", zsearchVal, true);
    if (arryData.length <= 0)
        return false;

    for (var i = 0; i < arryData.length; i++) {
        // _sfSetFormula(obj, arry[i].acol, arry[i].arow, undefined);
        var c = arryData[i].acol;
        var r = arryData[i].arow;

        var text = "";
        try {
            text = obj.Data[r][_sfGetCellName(obj, c)].formula;
        } catch (err) { }
        var result = "";
        result = _sfEvaluateFormula(obj, c, r, text);

        var resultNaN = result + ""
        if (result == undefined || result == "undefined") { isFailed = true; result = "#ERROR#"; }
        if (_sfIsFunction(result)) { isFailed = true; result = "#ERROR#"; }
        if (resultNaN == "NaN") {
            try {
                if (formula_.includes("/")) { result = "#DIV/0!" }
            } catch (ex) { }
        }
        obj.Data[r][_sfGetCellName(obj, c)].value = result;


        zsearchVal = c + ":" + r + ":";
        _sfComputeFormulaSub(obj, zsearchVal);
        //_sfLog("formulax:" + p8_NumberToCell(c + 1) + r)


        //var xtemp = text.toUpperCase()._sfReplaceAll("=", "")._sfReplaceAll("-", "#aag#")._sfReplaceAll("*", "#aag#")._sfReplaceAll("/", "#aag#")._sfReplaceAll("+", "#aag#");
        ////._sfReplaceAll("(", "#aag#")._sfReplaceAll(")", "#aag#")
        //var xArry = xtemp.split("#aag#");
        //var xArryVal = xtemp.split("#aag#");

        //var tempValue = [];

        //var formula_ = text._sfReplaceAll("=", "")._sfReplaceAll(" ", "").toUpperCase();;
        //for (var i2 = 0; i2 < xArry.length; i2++) {
        //    var cellindex = { row: -1, col: -1 };
        //    try {
        //        xArry[i2] = xArry[i2].trim();
        //        var importantCell = xArry[i2];

        //        var tempimportantCell = importantCell._sfReplaceAll("(", "#aag#")._sfReplaceAll(")", "#aag#");
        //        var tempimportantCellArry = tempimportantCell.split("#aag#");
        //        crFormulaFuncTemp = func_GetFormulaFunc(tempimportantCellArry[0]);
        //        if (crFormulaFuncTemp != "") {
        //            importantCell = tempimportantCellArry[1];
        //            crFormulaFunc = crFormulaFuncTemp;

        //            //continue;
        //            var xval = 0;
        //            // Custom Function    like SUM
        //            if (crFormulaFunc != "") { //&& 1==2
        //                try {
        //                    // get whole value of Custom Function
        //                    xval = func_GetFormulaRangeValue(importantCell, obj, crFormulaFunc);
        //                } catch (err) {
        //                    xval = "";
        //                    //  xval = err;
        //                }
        //                if (xval == undefined || xval == "undefined" || xval == "") xArryVal[i] = "0";
        //                else xArryVal[i] = xval + "";
        //                crFormulaFunc = "";

        //                tempValue.push({ cell: xArry[i2].trim() + "", value: xval, type: "special" });
        //                continue;
        //            }
        //        }
        //        else {
        //            xArry[i2] = xArry[i2].replaceAll("(", "").replaceAll(")", "");
        //        }


        //        cellindex = _sfcellA1ToIndex(xArry[i2].trim(), 0);
        //        var valuex = obj.GetValue(cellindex.col, cellindex.row);
        //        if (valuex == undefined || valuex == "") valuex = 0;



        //        tempValue.push({ cell: xArry[i2].trim() + "", value: valuex, type: "cell" });
        //    } catch (err) { }
        //}

        //tempValue.sort(function (a, b) { return b.cell.length - a.cell.length });
        //for (var i2 = 0; i2 < tempValue.length; i2++) {
        //    formula_ = formula_._sfReplaceAll(tempValue[i2].cell, tempValue[i2].value);
        //}
        //try { result = eval(formula_); } catch (err) { isFailed = true; result = "#VALUE!"; }
        //if (result == undefined || result == "undefined") { isFailed = true; result = "#ERROR#"; }
        //if (_sfIsFunction(result)) { isFailed = true; result = "#ERROR#"; }
        //obj.Data[r][_sfGetCellName(obj, c)].value = result;


        //zsearchVal = c + ":" + r + ":";
        //_sfComputeFormulaSub(obj, zsearchVal);
    }
}

function _sfSetFormulaChange(obj, c, r) {

}
function _sfSetFormulaRemove(obj, c, r) {

    for (var i = obj.CellFomulaList.length - 1; i >= 0; i--) {
        if (obj.CellFomulaList[i].acol == c && obj.CellFomulaList[i].arow == r) {
            obj.CellFomulaList.splice(i, 1);
        }
    }

}

// Formula Setter
function _sfSetFormula(obj, c, r, text) {
    _sfStartTime();
    var isFailed = false;
    try {
        if (text == undefined)
            text = obj.Data[r][_sfGetCellName(obj, c)].formula;
        else {
            _sfSetFormulaRemove(obj, c, r);
            obj.Data[r][_sfGetCellName(obj, c)].formula = text;
        }



        var result = "";
        result = _sfEvaluateFormula(obj, c, r, text);

        var resultNaN = result + ""
        if (result == undefined || result == "undefined") { isFailed = true; result = "#ERROR#"; }
        if (_sfIsFunction(result)) { isFailed = true; result = "#ERROR#"; }
        if (resultNaN == "NaN") {
            if (formula_.includes("/")) { result = "#DIV/0!" }
        }
        obj.Data[r][_sfGetCellName(obj, c)].value = result;

        //var xtemp = text.toUpperCase()._sfReplaceAll("=", "")._sfReplaceAll("^", "#aag#");
        ////xtemp = xtemp._sfReplaceAll("(", "#aag#")._sfReplaceAll(")", "#aag#");
        //xtemp = xtemp._sfReplaceAll("-", "#aag#")._sfReplaceAll("*", "#aag#")._sfReplaceAll("/", "#aag#")._sfReplaceAll("+", "#aag#");

        //var xArry = xtemp.split("#aag#");
        //var xArryVal = xtemp.split("#aag#");

        //var tempValue = [];

        //var formula_ = text._sfReplaceAll("=", "")._sfReplaceAll(" ", "").toUpperCase();;
        //var crFormulaFuncTemp = "";
        //var crFormulaFunc = "";
        //var importantCell = "";
        //var xval = "";


        //for (var i = 0; i < xArry.length; i++) {
        //    var cellindex = { row: -1, col: -1 };
        //    try {
        //        xArry[i] = xArry[i].trim();
        //        importantCell = xArry[i];
        //        xval = "";


        //        var tempimportantCell = importantCell._sfReplaceAll("(", "#aag#")._sfReplaceAll(")", "#aag#");
        //        var tempimportantCellArry = tempimportantCell.split("#aag#");
        //        crFormulaFuncTemp = func_GetFormulaFunc(tempimportantCellArry[0]);
        //        if (crFormulaFuncTemp != "") {
        //            importantCell = tempimportantCellArry[1];
        //            crFormulaFunc = crFormulaFuncTemp;

        //            //continue;

        //            // Custom Function    like SUM
        //            if (crFormulaFunc != "") { //&& 1==2
        //                try {
        //                    // get whole value of Custom Function
        //                    xval = func_GetFormulaRangeValue(importantCell, obj, crFormulaFunc);
        //                } catch (err) {
        //                    xval = "";
        //                    //  xval = err;
        //                }
        //                if (xval == undefined || xval == "undefined" || xval == "") xArryVal[i] = "0";
        //                else xArryVal[i] = xval + "";
        //                crFormulaFunc = "";

        //                tempValue.push({ cell: xArry[i].trim() + "", value: xval, type: "special" });
        //                continue;
        //            }
        //        }
        //        else {
        //            xArry[i] = xArry[i].replaceAll("(", "").replaceAll(")", "");
        //        }





        //        cellindex = _sfcellA1ToIndex(xArry[i].trim(), 0);
        //        var valuex = obj.GetValue(cellindex.col, cellindex.row);
        //        if (valuex == undefined || valuex == "") valuex = 0;

        //        tempValue.push({ cell: xArry[i].trim() + "", value: valuex, type: "cell" });
        //    } catch (err) { }
        //}

        //tempValue.sort(function (a, b) { return b.cell.length - a.cell.length });


        //for (var i = 0; i < tempValue.length; i++) {
        //    formula_ = formula_._sfReplaceAll(tempValue[i].cell, tempValue[i].value);

        //    if (tempValue[i].type == "cell") {
        //        var xindexes = _sfcellA1ToIndex(tempValue[i].cell);
        //        _sfLoadFormulaRef(obj, tempValue[i].cell, xindexes.col, xindexes.row, c, r, text);
        //    }
        //    else {
        //        // continue;
        //        var celvalue = tempValue[i].cell;
        //        var tempimportantCell = celvalue._sfReplaceAll("(", "#aag#")._sfReplaceAll(")", "#aag#");
        //        var tempimportantCellArry = tempimportantCell.split("#aag#");
        //        var cellarray = tempimportantCellArry[1].split(",");
        //        for (var ix = 0; ix < cellarray.length; ix++) {
        //            var cellarray2 = cellarray[ix].split(":");
        //            if (cellarray2.length > 1) {
        //                //range
        //                var xindexes1 = _sfcellA1ToIndex(cellarray2[0]);
        //                var xindexes2 = _sfcellA1ToIndex(cellarray2[1]);

        //                for (var ir = xindexes1.row; ir <= xindexes2.row; ir++) {
        //                    for (var ic = xindexes1.col; ic <= xindexes2.col; ic++) {
        //                        var cellname = GetExcelColumnName(ic + 1) + "" + (ir + 1);
        //                        _sfLoadFormulaRef(obj, cellname, ic, ir, c, r, text);
        //                        //break;
        //                    }
        //                    // break;
        //                }

        //            }
        //            else {
        //                var xindexes = _sfcellA1ToIndex(cellarray2[0]);
        //                _sfLoadFormulaRef(obj, cellarray2[0], xindexes.col, xindexes.row, c, r, text);
        //            }
        //        }
        //    }
        //}



        //formula_ = _sfLoadFormulaPow(formula_); // convert pow


        //try { result = eval(formula_); } catch (err) { isFailed = true; result = "#VALUE!"; }
        //if (result == undefined || result == "undefined") { isFailed = true; result = "#ERROR#"; }
        //if (_sfIsFunction(result)) { isFailed = true; result = "#ERROR#"; }
        //obj.Data[r][_sfGetCellName(obj, c)].value = result;


    } catch (err) {
        isFailed = true;
        _sfLog(err);
    }
    return isFailed;
}

String.prototype.insert = function (what, index) {
    return index > 0
        ? this.replace(new RegExp('.{' + index + '}'), '$&' + what)
        : what + this;
};
function _sfLoadFormulaPow(text) {
    var cur = text.indexOf("^");
    var temptext = "";
    var temptextEnd = "";
    var temptextCombined = text;
    var start = 0;
    var curChar = "";

    var xx = 0;

    while (cur >= 0) {
        temptext = temptextCombined.substr(start, cur);
        temptextEnd = temptextCombined.substr(cur + 1, text.length);
        var curIndex = cur - 1;
        var curlength = 0;
        curChar = temptext.substr(curIndex, 1);
        if (curChar == ")") {
            curlength++;
            var paranNum = 1;
            while (paranNum >= 1 && curIndex >= 0) {
                curlength++;
                curIndex -= 1;
                curChar = temptext.substr(curIndex, 1);
                if (curChar == ")") {
                    paranNum++;
                }
                if (curChar == "(") {
                    paranNum--;
                }
                if (paranNum <= 0) break;


                xx++;
                if (xx >= 100) break;
            }
        }

        var xcurIndex = curIndex;



        curIndex = 0;
        curChar = temptextEnd.substr(curIndex, 1);
        if (curChar == "(") {
            var paranNum = 1;
            while (paranNum >= 1 && curIndex <= temptextEnd.length - 1) {
                curIndex += 1;
                curChar = temptextEnd.substr(curIndex, 1);
                if (curChar == "(") {
                    paranNum++;
                }
                if (curChar == ")") {
                    paranNum--;
                }
                if (paranNum <= 0) break;

                xx++;
                if (xx >= 100) break;
            }
        }

        temptextCombined = temptext + "," + temptextEnd.insert(")", curIndex + 1);
        //temptextCombined = temptextCombined.insert("@@", curIndex);
        temptextCombined = temptextCombined.insert("Math.pow(", xcurIndex) + "";

        //temptext = temptext.substr(curIndex,curlength);

        cur = temptextCombined.indexOf("^");


        xx++;
        if (xx >= 100) break;
    }

    return temptextCombined;
}



function _sfLoadFormulaRef(obj, cell, col, row, c, r, text) {

    var xindex = _sfJsonSearchIndex(obj.CellFomulaList, "id", col + ":" + row + ":" + c + ":" + r, true);

    if (xindex < 0)
        obj.CellFomulaList.push({ id: col + ":" + row + ":" + c + ":" + r, cellID: col + ":" + row + ":", cell: cell, col: col, row: row, acol: c, arow: r, aid: c + ":" + r, formula: text });

}

function _sfJsonDelete(json, rowIndex, rowminus) {
    var results = json;
    try {
        json.splice(rowIndex, rowminus);
    } catch (err) { }
    return results;
}

function _sfJsonSpreadSearchIndex(json, searchField, searchVal, isCaseSensitive) {
    var results = -1;
    if (isCaseSensitive == undefined) isCaseSensitive = true;
    for (var i = 0; i < json.length; i++) {
        if (isCaseSensitive == false) {
            if ((json[i][searchField].value + '').toUpperCase() == searchVal.toUpperCase()) {
                results = i; break;
            }
        } else {
            if (json[i][searchField].value == searchVal || (json[i][searchField].value + '') == searchVal) {
                results = i; break;
            }
        }
    }
    return results;
}

function _sfJsonSearchIndex(json, searchField, searchVal, isCaseSensitive) {
    var results = -1;
    if (isCaseSensitive == undefined) isCaseSensitive = true;
    for (var i = 0; i < json.length; i++) {
        if (isCaseSensitive == false) {
            if ((json[i][searchField] + '').toUpperCase() == searchVal.toUpperCase()) {
                results = i; break;
            }
        } else {
            if (json[i][searchField] == searchVal || (json[i][searchField] + '') == searchVal) {
                results = i; break;
            }
        }
    }
    return results;
}

function _sfJsonSpread(json, searchField, searchVal, isCaseSensitive) {
    var results = [];
    if (isCaseSensitive == undefined) isCaseSensitive = true;
    for (var i = 0; i < json.length; i++) {
        if (isCaseSensitive == false) {
            if ((json[i][searchField].value + '').toUpperCase() == searchVal.toUpperCase()) {
                results.push(json[i]);
            }
        } else {
            if (json[i][searchField].value == searchVal || (json[i][searchField].value + '') == searchVal) {
                results.push(json[i]);
            }
        }
    }
    return results;
}

function _sfJson(json, searchField, searchVal, isCaseSensitive) {
    var results = [];
    if (isCaseSensitive == undefined) isCaseSensitive = true;
    for (var i = 0; i < json.length; i++) {
        if (isCaseSensitive == false) {
            if ((json[i][searchField] + '').toUpperCase() == searchVal.toUpperCase()) {
                results.push(json[i]);
            }
        } else {
            if (json[i][searchField] == searchVal || (json[i][searchField] + '') == searchVal) {
                results.push(json[i]);
            }
        }
    }
    return results;
}


/**
* Convert a cell reference from A1Notation to 0-based indices (for arrays)
* or 1-based indices (for Spreadsheet Service methods).
*
* @param {String}    cellA1   Cell reference to be converted.
* @param {Number}    index    (optional, default 0) Indicate 0 or 1 indexing
*
* @return {object}            {row,col}, both 0-based array indices.
*
* @throws                     Error if invalid parameter
*/
function _sfcellA1ToIndex(cellA1, index) {
    cellA1 = (cellA1 + "").trim();
    // Ensure index is (default) 0 or 1, no other values accepted.
    index = index || 0;
    index = (index == 0) ? 0 : 1;

    try { cellA1 = cellA1.toUpperCase() } catch (ex) { }
    // Match the cell reference pattern
    var match = cellA1.match(/\$?([A-Z]+)\$?(\d+)/);

    if (match) {
        var colStr = match[1];
        var rowStr = match[2];

        // Convert column letters to a numeric value
        var col = 0;
        for (var i = 0; i < colStr.length; i++) {
            col = col * 26 + colStr.charCodeAt(i) - 'A'.charCodeAt(0) + 1;
        }

        // Convert row string to a numeric value
        var row = parseInt(rowStr, 10);

        // Check if row or column is fixed
        var rowFixed = cellA1.indexOf('$') !== -1;
        var colFixed = cellA1.indexOf('$', colStr.length + 1) !== -1;

        // Return the result as an object
        return { row: row - 1, col: col - 1, rowFixed: rowFixed, colFixed: colFixed };
    } else {
        // Invalid cell reference
        return null;
    }
}

/**
* Return a 0-based array index corresponding to a spreadsheet column
* label, as in A1 notation.
*
* @param {String}    colA1    Column label to be converted.
*
* @return {Number}            0-based array index.
* @param {Number}    index    (optional, default 0) Indicate 0 or 1 indexing
*
* @throws                     Error if invalid parameter
*/
function _sfcolA1ToIndex(colA1, index) {
    if (typeof colA1 !== 'string' || colA1.length > 2)
        throw new Error("Expected column label.");

    // Ensure index is (default) 0 or 1, no other values accepted.
    index = index || 0;
    index = (index == 0) ? 0 : 1;

    var A = "A".charCodeAt(0);

    var number = colA1.charCodeAt(colA1.length - 1) - A;
    if (colA1.length == 2) {
        number += 26 * (colA1.charCodeAt(0) - A + 1);
    }
    return number + index;
}
/**
* Return a 0-based array index corresponding to a spreadsheet row
* number, as in A1 notation. Almost pointless, really, but maintains
* symmetry with colA1ToIndex().
*
* @param {Number}    rowA1    Row number to be converted.
* @param {Number}    index    (optional, default 0) Indicate 0 or 1 indexing
*
* @return {Number}            0-based array index.
*/
function _sfrowA1ToIndex(rowA1, index) {
    // Ensure index is (default) 0 or 1, no other values accepted.
    index = index || 0;
    index = (index == 0) ? 0 : 1;

    return rowA1 - 1 + index;
}



function _sfIsFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

String.prototype._sfReplaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

P8.SpreadSheet.prototype.GetCell = function (c, r) {

    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV = [];
    try {
        stringV = this.Data[r][_sfGetCellName(this, c)];
    } catch (err) {

    }
    return stringV;
};

P8.SpreadSheet.prototype.GetText2 = function (c, r) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV = "";
    try {
        stringV = this.Data[r][_sfGetCellName(this, c)].text2;
    } catch (err) {
    }
    try {
        if (stringV == undefined)
            stringV = this.ColumnConfig[c].Text2;
    } catch (err) {
        stringV == undefined;
    }
    return stringV;
};

P8.SpreadSheet.prototype.GetValue = function (c, r) {

    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV = "";
    try {
        stringV = this.Data[r][_sfGetCellName(this, c)].value;
    } catch (err) {

    }
    return stringV;
};


P8.SpreadSheet.prototype.GetValueBoolean = function (c, r) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV = "";
    try {
        stringV = this.Data[r][_sfGetCellName(this, c)].value;
    } catch (err) {

    }
    return _sfGetBooleanValue(stringV);
};
P8.SpreadSheet.prototype.GetValueBolean = function (c, r) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV = "";
    try {
        stringV = this.Data[r][_sfGetCellName(this, c)].value;
    } catch (err) {

    }
    return _sfGetBooleanValue(stringV);
};

P8.SpreadSheet.prototype.GetBoolCustom = function (c, r, truevalue) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;

    if (truevalue == undefined) truevalue = "1";
    var stringV = "";
    try {
        stringV = this.Data[r][_sfGetCellName(this, c)].value;
    } catch (err) {

    }
    var xvalue = _sfGetBooleanValue(stringV);
    var fvalue = xvalue;

    try {
        truevalue = truevalue.toLowerCase();
    } catch (err) { }
    if (truevalue == "1") {
        if (xvalue) fvalue = truevalue;
        else fvalue = "0";
    }
    else if (truevalue == "yes") {
        if (xvalue) fvalue = truevalue;
        else fvalue = "no";
    }
    else if (truevalue == "true") {
        if (xvalue) fvalue = truevalue;
        else fvalue = "true";
    }
    else if (truevalue == "on") {
        if (xvalue) fvalue = truevalue;
        else fvalue = "off";
    }



    return fvalue;
};

P8.SpreadSheet.prototype.GetSelectedIndexes = function () {
    var c = this.CellIndexes.Col;
    var r = this.CellIndexes.Row;
    var c2 = this.CellIndexes.Col2;
    var r2 = this.CellIndexes.Row2;

    var datar = this.FreezeRow - 1;
    var datac = this.FreezeCol - 1;

    if (r > datar) {

    }

    return {
        row: r
        , row2: r2
        , col: c
        , col2: c2
    };
};

P8.SpreadSheet.prototype.GetEnabled = function (c, r) {

    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV;
    try {

        stringV = _sfCheckEnable(this, r, c);
    } catch (err) {

    }
    return stringV;
};

P8.SpreadSheet.prototype.GetMaxLength = function (c, r) {

    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV;
    try {
        stringV = _sfCheckConfigType(this, r, c, "MaxLength", -1);
    } catch (err) {

    }
    //try { stringV = (stringV + "").replace("!important", ""); } catch (err) { }

    return stringV;
};

P8.SpreadSheet.prototype.GetObjectType = function (c, r) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV;
    try {
        stringV = _sfCheckObjectType(this, r, c);
    } catch (err) {

    }
    return stringV;
};

P8.SpreadSheet.prototype.GetDataType = function (c, r) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV;
    try {
        stringV = _sfCheckDataType(this, r, c);
    } catch (err) {

    }
    return stringV;
};

P8.SpreadSheet.prototype.GetPrecision = function (c, r) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV;
    try {
        stringV = _sfCheckConfigType(this, r, c, "Precision", 2);;
    } catch (err) {
        console.warn(err);
    }
    return stringV;
};




P8.SpreadSheet.prototype.GetText = function (c, r) {

    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV = "";

    try {
        stringV = this.Data[r][_sfGetCellName(this, c)].text2;
    } catch (err) {
        stringV == undefined;
    }
    try {
        if (stringV == undefined)
            stringV = this.ColumnConfig[c].Text2;
    } catch (err) {
        stringV == undefined;
    }

    try {
        if (stringV == undefined)
            stringV = this.Data[r][_sfGetCellName(this, c)].text;
    } catch (err) {
        stringV == undefined;
    }
    if (stringV == undefined) {
        stringV = this.Data[r][_sfGetCellName(this, c)].value;
        if (this.GetDataType(c, r) != "") {
            try {
                var option = [];
                option.dataType = (this.GetDataType(c, r)) + "";
                stringV = _sfDataTypeFormater(this, option, stringV, true) + "";
            } catch (err) { }
        }

    }
    if (stringV == undefined)
        stringV = this.Data[r][_sfGetCellName(this, c)];
    if (stringV == undefined || stringV == null)
        stringV = "";

    return stringV;
};
P8.SpreadSheet.prototype.GetFormula = function (c, r) {

    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV = "";
    try {
        // stringV = this.Data[r][Object.keys(this.Data[r])[c]];
        stringV = this.Data[r][_sfGetCellName(this, c)].formula;
    } catch (err) {

    }
    if (stringV == undefined || stringV == "") {
        try {
            stringV = this.Data[r][_sfGetCellName(this, c)].value;
        } catch (err) { }
    }

    if (this.GetDataType(c, r) == "percentvalue") {
        try {
            stringV = parseFloat(stringV) * 100;
        } catch (err) { }
    }
    else if (this.GetDataType(c, r) == "date") {
        try {
            stringV = _sfDateFormat(stringV, true);
        } catch (err) { }
    }

    stringV = (stringV || "") + "";

    return stringV;
};

P8.SpreadSheet.prototype.Developer = function () {
    return "0041006e00670065006c006f0020004300610072006c006f00200041002e00200047006f006e007a0061006c00650073"._x_hexDecode();
};


function _sfScrollChecking(obj) {

    if (obj.startRow >= obj.Data.length - (obj.FreezeRow)) {
        //obj.startRow = obj.FreezeRow + 3;
        //console.log("falied:" + obj.startCol + ":" + obj.startRow);
        return false;
    }

    return true;
}
function _sfScrollUpdatePositionList(obj) {
    //obj.RenderNoEvent();
    console.log("render");
}
function _sfScrollUpdatePosition(obj) {
    var isresponsive = false;
    if ($("body").width() <= 550) isresponsive = true;
    if (isresponsive) {
        _sfScrollUpdatePositionList(obj);
        return;
    }

    // var canvasID = nwGridMainCon_Book.ActiveSheet.canvasID;
    //var obj = P8DataList[canvasID][0].sheet.ActiveSheet;
    var canvasID = obj.canvasID;
    var maxrow = obj.Data.length;
    var columnminus = 7;//aag scroll
    
    if (obj.ColumnConfig.length < columnminus) {
        columnminus = obj.ColumnConfig.length - 1
    }
    //var maxcolumn = obj.ColumnConfig.length - columnminus;
    var maxcolumn = obj.ColumnConfig.length;
    if (maxcolumn <= 1) maxcolumn = 1;

    var currow = obj.startRow - 1;
    var curcol = obj.startCol - 1;

    //if (currow <= 0) { currow = 1; obj.startRow = 1; }
    //if (curcol <= 0) { curcol = 1; obj.startRow = 1; }
    //if (maxcolumn >= curcol) {
    //    return;
    //}

    var varpercV = currow / maxrow;
    
    //var varpercH = curcol / maxcolumn;
    var varpercH = maxcolumn / curcol;

    if (currow + 1 == maxrow) varpercV = 1;
    if (curcol + 1 == maxcolumn) varpercH = 1;

    var scV = $('#' + canvasID).find('.P8Spread_Scroll');
    var height = $(scV).height();
    var barheight = $(scV).find('.P8Spread_ScrollBar.Vr').height();
    var hdiff = height - barheight;
    $(scV).find('.P8Spread_ScrollBar.Vr').css("top", hdiff * varpercV + "px");


    var scH = $('#' + canvasID).find('.P8Spread_ScrollH');
    var width = $(scH).width();
    var barwidth = $(scH).find('.P8Spread_ScrollH_handler').width();
    var wdiff = width - barwidth;
    var wdiff = ((wdiff / maxcolumn) * (curcol));
    $(scH).find('.P8Spread_ScrollH_handler').css("left", wdiff + "px");
    //$(scH).find('.P8Spread_ScrollH_handler').css("left", wdiff * varpercH + "px");

    obj.ScrollActiveStat = false;
}

P8.SpreadSheet.prototype.ScrollRender = function (x, y) {
    _sfStartTime();
    this.ScrollActive = true;
    this.ScrollActiveStat = true;

    if (x != undefined) this.startCol = x;
    if (y != undefined) this.startRow = y;

    //console.log("scrolls:" + this.startCol + ":" + this.startRow);
    //var isvalid = _sfScrollChecking(this);
    //if (!isvalid) {
    //    return false;
    //}

    this.RenderNoEvent();
    _sfScrollUpdatePosition(this);
};
P8.SpreadSheet.prototype.ScrollDown = function (c) {
    this.ScrollActiveStat = true;
    _sfStartTime();
    if (c == undefined) c = this.ScrollCounterV;
    if (this.startRow >= this.Data.length) { this.ScrollActiveStat = false; return };
    //if (this.startRow >= this.Data.length) return;
    this.startRow += c;

    //console.log("scrolls:" + this.startCol + ":" + this.startRow);
    //var isvalid = _sfScrollChecking(this);
    //if (!isvalid) {
    //    return false;
    //}

    this.ScrollActive = true;
    this.RenderNoEvent();
    _sfScrollUpdatePosition(this);
};
P8.SpreadSheet.prototype.ScrollUp = function (c) {
    this.ScrollActiveStat = true;
    _sfStartTime();
    if (c == undefined) c = this.ScrollCounterV;
    if (this.startRow == 1) { this.ScrollActiveStat = false; return };
    //if (this.startRow == 1) return;

    this.startRow -= c;
    if (this.startRow <= 1) this.startRow = 1;
    this.ScrollActive = true;
    this.RenderNoEvent();
    _sfScrollUpdatePosition(this);
};
P8.SpreadSheet.prototype.ScrollRight = function (c) {
    this.ScrollActiveStat = true;
    _sfStartTime();

    if (c == undefined) c = this.ScrollCounterH;
    while (this.ColumnWidth(c - 1) == "0" && this.startCol < this.ColumnConfig.length) {
        c += 1;
    }

    if (this.startCol >= this.ColumnConfig.length) { this.ScrollActiveStat = false; return };
    //if (this.startCol >= this.ColumnConfig.length) return;


    this.startCol += c;
    this.ScrollActive = true;
    this.RenderNoEvent();
    _sfScrollUpdatePosition(this);
};
P8.SpreadSheet.prototype.ScrollLeft = function (c) {
    this.ScrollActiveStat = true;
    _sfStartTime();

    if (c == undefined) c = this.ScrollCounterH;
    var latec = 0; var colx = this.startCol - 1;
    try {
        latec = this.ColumnWidth(colx - 1);
    } catch (err) { }
    while (latec == "0" && this.startCol > 1) {
        this.startCol -= 1;
        colx -= 1;
        try {
            latec = this.ColumnWidth(colx);
        } catch (err) { }
    }
    //if (c <= 0) return;

    if (this.startCol <= 1) { this.ScrollActiveStat = false; return };
    //if (this.startCol <= 1) return;

    //var width =0;
    //do {
    this.startCol -= c;
    //    width = this.ColumnWidth(this.startCol);
    //} while (width==0)


    if (this.startCol <= 1) this.startCol = 1;
    this.ScrollActive = true;
    this.RenderNoEvent();
    _sfScrollUpdatePosition(this);
};
function _sfModifyScrollBar() {

}

var P8RendeVar = [];
var P8RendeVarSub;
function _sfRenderFunction(_this) {
    console.log("test");

    if (_this.Book.ActiveSheet.startCol == _this.Book.ActiveSheet.prevstartCol
        && _this.Book.ActiveSheet.startRow == _this.Book.ActiveSheet.prevstartRow
        && _this.ScrollActiveStat) {

        return;
    }
    if (_this.Book.ActiveSheet.ColumnWidth(_this.Book.ActiveSheet.startCol) == "0"
        && _this.ScrollActive) {
        _this.Book.ActiveSheet.prevstartCol = _this.Book.ActiveSheet.startCol;

    }

    var renderID = nwRandomString(30);
    if (_this.ScrollActive) {
        _this.Book.ActiveSheet.prevstartRow = _this.Book.ActiveSheet.startRow;
        _this.Book.ActiveSheet.prevstartCol = _this.Book.ActiveSheet.startCol;

        try { clearTimeout(P8RendeVar[_this.canvasID]); } catch (err) { console.log("error:" + err); }
        P8RendeVar[_this.canvasID] = setTimeout(function () {
            //_this.havelistner = false;
            //console.log("start:" + renderID + " | col:" + _this.Book.ActiveSheet.startCol + " | row:" + _this.Book.ActiveSheet.startRow);
            canvasCreate(_this.canvasID, _this.Book.ActiveSheet);
            //console.log("End:" + renderID + " | col:" + _this.Book.ActiveSheet.startCol + " | row:" + _this.Book.ActiveSheet.startRow);
            _this.Book.ActiveSheet.ScrollActiveStat = false;
        }, 10);

        // resolve issue on load no click event
        // remove cause  unli loops
        //try { clearTimeout(P8RendeVarSub); } catch (err) { }
        //P8RendeVarSub = setTimeout(function () {
        //    if (P8DataList[_this.canvasID][0].sheet.ActiveSheet.Events.length <= 0) {
        //        P8DataList[_this.canvasID][0].sheet.ActiveSheet.Render();
        //    }
        //}, 0);
    }
    else {
        //canvasCreate(_this.canvasID, _this.Book.ActiveSheet);
        try { clearTimeout(P8RendeVar[_this.canvasID]); } catch (err) { console.log("error:" + err); }
        P8RendeVar[_this.canvasID] = setTimeout(function () {
            canvasCreate(_this.canvasID, _this.Book.ActiveSheet);
        }, 10);
    }
    _this.Book.ActiveSheet.ScrollActiveStat = false;
}

function _sfSpreadCheckObjectRender(canvasID) {
    setTimeout(function () {
        if ($('#' + canvasID + "_vw_tbl").html() == undefined) {
            P8DataList[canvasID][0].sheet.SetActiveSheet(0);
            P8DataList[canvasID][0].sheet.ActiveSheet.Render();

        }
        else {

            if (P8DataList[canvasID][0].sheet.ActiveSheet.Events.length <= 0) {
                P8DataList[canvasID][0].sheet.ActiveSheet.Render();
            }
            else {
                // P8DataList[canvasID][0].sheet.SetActiveSheet(0);
                P8DataList[canvasID][0].sheet.ActiveSheet.RenderNoEvent();
            }
        }
    }, 100);
}


//#Render
P8.SpreadSheet.prototype.Render = function () {

    if (this.RenderStatus == false) return;

    _sfStartTime();
    //console.log(this.canvasID);

    //canvasCreate(this.canvasID, this.Book.ActiveSheet);


    this.havelistner = false;
    _sfRenderFunction(this);
};

P8.SpreadSheet.prototype.RenderNoEvent = function () {
    if (this.RenderStatus == false) return;

    _sfStartTime();
    //console.log(this.canvasID);
    this.havelistner = true;
    //canvasCreate(this.canvasID, this.Book.ActiveSheet);
    _sfRenderFunction(this);

};

P8.SpreadSheet.prototype.Refresh = function () {
    _sfStartTime();
    this.RenderStatus = true;

    this.SetText(0, 0, "");

    //this.havelistner = true;
    //_sfRenderFunction(this);
};


P8.SpreadSheet.prototype.RefreshSpecialConfig = function () {

    _sfRefreshSpecialConfig(this);

    this.RenderNoEvent();
};
function _sfRefreshSpecialConfig(_this) {

    try {
        var ccID = _this.canvasID;
        var nwcolumnhideconfig = $("#" + ccID).attr("nwcolumnhideconfig");
        var nwcolumnhideconfig_list = nwcolumnhideconfig.split("|");
        if (nwcolumnhideconfig_list.length <= 0) return;

        for (var i = 0; i < nwcolumnhideconfig_list.length; i++) {
            try {
                if (nwcolumnhideconfig_list[i] == "") {
                    continue;
                }
                if (nwcolumnhideconfig_list[i] == 0) {
                    _this.ColumnWidth(i, 0);
                }
                else {
                    _this.ColumnWidth(i, parseInt(_this.ColumnConfig[i].ColumnWidth));
                }
            } catch (err) { }
        }
    } catch (err) {
        // console.log(err);
    }
}


P8.SpreadSheet.prototype.Refresh = function () {
    this.RenderNoEvent();
};


//Destroy
function _sfDestroyEvents() {
    _sfLog("Destory Object");
}

P8.Spread.prototype.SetTabSheetVisible = function (value) {
    var objMain = this;
    var canvasID = this.ActiveSheet.canvasID;

    if (value == false) {
        $("#" + canvasID).find(".P8Spread_SheetCon").css("display", "none");
        $("#" + canvasID).find(".scrollerH").attr("colspan", 3);
    }
    else {
        $("#" + canvasID).find(".P8Spread_SheetCon").css("display", "");
        $("#" + canvasID).find(".scrollerH").attr("colspan", 2);
    }
    _sfResizeScrollTab(canvasID);
    //_sfScrollUpdateSizing(canvasID);
}


P8.Spread.prototype.Destroy = function () {
    var objMain = this;
    var canvasID = this.ActiveSheet.canvasID;
    for (var i = 0; i < objMain.Sheet.length; i++) {
        try {
            var sheet = objMain.Sheet[i];
            sheet.Destroy();
        }
        catch (err) {

        }
    }

    $("#" + canvasID).html("");
}


P8.SpreadSheet.prototype.DestroyEvent = function () {

    try {


        var xcanvasID = this.canvasID + "_vw";
        var x = document.getElementById(xcanvasID);
        if (x.removeEventListener) {
            x.removeEventListener("mousewheel", _sfDestroyEvents);
        } else if (x.detachEvent) {
            x.detachEvent("onmousewheel", _sfDestroyEvents);
        }

        if (x.removeEventListener) {
            x.removeEventListener("mousedown", _sfDestroyEvents);
        } else if (x.detachEvent) {
            x.detachEvent("onmousedown", _sfDestroyEvents);
        }
    } catch (err) { }
}
P8.SpreadSheet.prototype.Destroy = function () {
    _sfStartTime();

    try {


        var xcanvasID = this.canvasID + "_vw";
        var x = document.getElementById(xcanvasID);
        if (x.removeEventListener) {
            x.removeEventListener("mousewheel", _sfDestroyEvents);
        } else if (x.detachEvent) {
            x.detachEvent("onmousewheel", _sfDestroyEvents);
        }

        if (x.removeEventListener) {
            x.removeEventListener("mousedown", _sfDestroyEvents);
        } else if (x.detachEvent) {
            x.detachEvent("onmousedown", _sfDestroyEvents);
        }
    } catch (err) { }

    this.havelistner = false;
    this.startRow = 1;
    this.startCol = 1;
    this.ScrollCounterH = 1;
    this.ScrollCounterV = 1;
    this.ScrollActive = false;
    this.currentCells = [];

    this.CellIndexes = { Col: -1, Row: -1, Col2: -1, Row2: -1 };
    this.CellSelected = {};
    this.CellSelValue = { col: -1, row: -1 };

    this.haveLog = "";
    this.DefaultSettings = "";
    this.Events = [];
    this.Data = [];
    this.ColumnConfig = [];
    this.ActiveSheet = "";
    this.havelistner = false;
    //$("#" + this.canvasID).html("");
    this.canvasID = "";
    // this = null;
    delete this;
};


function _sfLog(msg) {
    try {
        //console.log(msg);
        _xLogs(msg);
    } catch (err) { }
}

function _sfMakeid(c) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < c; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
//render config
//bl config
function _sfRenderStyleP8(obj, jsonRow, jsonCol) {
    for (var i = 0; i < jsonCol.length; i++) {

    }


    console.log(obj.canvasID);
    console.log(jsonRow);
    console.log(jsonCol);

    for (var i = 0; i < jsonRow.length; i++) {

        var irow = 0; var ivalue = ""; var ivalue2 = "";
        var icol = 0; var iattr = "";

        irow = jsonRow[i]["RowNumber"];
        icol = jsonRow[i]["ColNumber"];
        iattr = jsonRow[i]["RowAttr"];
        ivalue = jsonRow[i]["RowValue"];
        ivalue2 = jsonRow[i]["RowValue2"];

        var xcolumn = 0;
        var xcolumnStart = 0;
        xcolumn = icol;
        xcolumnStart = xcolumn;

        //full row
        if (icol == "") {
            xcolumnStart = 0;
            //xcolumn = parseInt(jsonCol.length);
            icol = Spread_ALLCOL;
        }

        // full column
        if (irow == "") {
            xRowStart = 0;
            //xRow = parseInt(jsonRow.length - 1);
            irow = Spread_ALLROW;
        }

        icol = parseInt(icol + "");
        irow = parseInt(irow + "");

        ivalue = ivalue.toUpperCase();
        ivalue = ivalue.replaceAll("!IMPORTANT", "");
        ivalue = ivalue.replaceAll(" ", "");
        ivalue = ivalue._sfReplaceAll("\n", "");
        ivalue = ivalue._sfReplaceAll(" ", "");


        if (iattr.toLocaleLowerCase().trim() == "background-color") {
            obj.SetBackground(icol, irow, ivalue);
        }
        else if (iattr.toLocaleLowerCase().trim() == "font-weight") {
            obj.SetBold(icol, irow, ivalue);
        }
        else if (iattr.toLocaleLowerCase().trim() == "font-family") {
            obj.SetFontFamily(icol, irow, ivalue);
        }
        else if (iattr.toLocaleLowerCase().trim() == "font-size") {
            obj.SetFontSize(icol, irow, ivalue.toLocaleLowerCase().replace("px", ""));
        }
        else if (iattr.toLocaleLowerCase().trim() == "font-style") {
            obj.SetItalic(icol, irow, ivalue.toLocaleLowerCase());
        }
        else if (iattr.toLocaleLowerCase().trim() == "text-align") {
            obj.SetTextAlign(icol, irow, ivalue.toLocaleLowerCase());
        }
        else if (iattr.toLocaleLowerCase().trim() == "text-decoration") {
            obj.SetUnderline(icol, irow, ivalue.toLocaleLowerCase());
        }
        else if (iattr.toLocaleLowerCase().trim() == "color") {
            obj.SetTextColor(icol, irow, ivalue.toLocaleLowerCase());
        }
        else if (iattr.toLocaleLowerCase().trim() == "merge") {
            ivalue = parseInt(ivalue + "") - 1;
            ivalue2 = parseInt(ivalue2 + "") - 1;
            obj.SetMerge(icol, irow, icol + ivalue2, irow + ivalue, true);
        }



    }
}



//function _sfRenderStyleP8(obj, jsonRow, jsonCol) {
//    for (var i = 0; i < jsonCol.length; i++) {

//    }
//    for (var i = 0; i < jsonRow.length; i++) {

//        var irow = 0; var ivalue = ""; var ivalue2 = "";
//        var icol = 0; var iattr = "";

//        irow = jsonRow[i]["RowNumber"];
//        icol = jsonRow[i]["ColNumber"];
//        iattr = jsonRow[i]["RowAttr"];
//        ivalue = jsonRow[i]["RowValue"];
//        ivalue2 = jsonRow[i]["RowValue2"];

//        var xcolumn = 0;
//        var xcolumnStart = 0;
//        xcolumn = icol;
//        xcolumnStart = xcolumn;

//        //full row
//        if (icol == "") {
//            xcolumnStart = 0;
//            xcolumn = parseInt(jsonCol.length);
//        }


//        var xRow = 0;
//        var xRowStart = 0;

//        xRow = irow;
//        xRowStart = xRow;

//        // full column
//        if (irow == "") {
//            xRowStart = 0;
//            //xRow = parseInt(jsonRow.length - 1);

//        }
//        ivalue = ivalue.toUpperCase();
//        ivalue = ivalue.replaceAll("!IMPORTANT", "");
//        ivalue = ivalue.replaceAll(" ", "");
//        ivalue = ivalue._sfReplaceAll("\n", "");
//        ivalue = ivalue._sfReplaceAll(" ", "");


//        if (xcolumn >= jsonCol.length - 1) xcolumn = jsonCol.length - 1;
//        for (var ir = xRowStart; ir <= xRow; ir++) {
//            for (var ic = xcolumnStart; ic <= xcolumn; ic++) {
//                if (iattr.toLocaleLowerCase().trim() == "background-color") {
//                    obj.SetBackground(ic, parseInt(ir), ivalue);
//                }
//                else if (iattr.toLocaleLowerCase().trim() == "font-weight") {
//                    obj.SetBold(ic, parseInt(ir), ivalue);
//                }
//                else if (iattr.toLocaleLowerCase().trim() == "text-align") {
//                    obj.SetTextAlign(ic, parseInt(ir), ivalue.toLocaleLowerCase());
//                }
//                else if (iattr.toLocaleLowerCase().trim() == "color") {
//                    obj.SetTextColor(ic, parseInt(ir), ivalue.toLocaleLowerCase());
//                }
//            }
//        }
//    }
//}

function _sfFillJSONtoEmpty(obj, totalcount, sheetno, jsondata, name) {

    if (obj == undefined) return jsondata;

    var xcount = jsondata.length;

    var data = "";
    for (var i = xcount; i < totalcount; i++) {
        jsondata.push({});
        for (var ic = 0; ic < name.length; ic++) {
            var Cell = {};
            jsondata[i][name[ic]["name"]] = {};
            Cell["value"] = data;
            Cell["formula"] = "";
            Cell["Config"] = [];
            jsondata[i][name[ic]["name"]] = Cell;
        }
    }


    return jsondata;
}

//initialize spread
function _sfConvertJSONtoP8(json, name) {


    for (var i = 0; i < name.length; i++) {
        try {
            var x = name[i].Enabled || "";
            value = false;
            x = x.toLowerCase();
            if (_sfGetBooleanValue(x))
                value = true;
            name[i].Enabled = value;
        } catch (err) { }
    }

    for (var i = 0; i < json.length; i++) {
        for (var ic = 0; ic < name.length; ic++) {
            var tempd = {};
            var data = json[i][name[ic]["name"]];

            if (data == undefined) data = "";
            var Cell = {};
            json[i][name[ic]["name"]] = {};
            Cell["value"] = data;
            Cell["formula"] = "";
            Cell["Config"] = [];
            json[i][name[ic]["name"]] = Cell;
        }
    }


    return {
        _data: json,
        _column: name
        , _row: []
    };
}

function _sfCreateData(col, row, text, c) {
    if (text == undefined) text = "";
    col = parseInt(col + "");
    row = parseInt(row + "");
    var _column = [];
    var _row = [];

    var _data = [];
    var xtext = text;


    var iscolumn = false;

    for (var i = 1; i <= row; i++) {
        var tempd = {};
        for (var i2 = 1; i2 <= col; i2++) {
            var Cell = {};
            if (text == "p8random") xtext = _sfMakeid(c);

            Cell["value"] = xtext;
            Cell["formula"] = "";
            Cell["Config"] = [];
            tempd[p8_NumberToCell(i2)] = Cell;

            if (iscolumn == false) {
                _column.push(_sfDefaultSettingsColumn());
                _column[_column.length - 1].width = def_Width;
                _column[_column.length - 1].ColumnWidth = def_Width + "";

                _column[_column.length - 1].name = p8_NumberToCell(i2);
                _column[_column.length - 1].ColumName = p8_NumberToCell(i2);

                _column[_column.length - 1].config = {};
                _column[_column.length - 1].dataType = "text"

                // _column.push({ width: def_Width, name: p8_NumberToCell(i2), config: {}, dataType: "text" });

            }

        }
        iscolumn = true;
        var tempRow = {};
        //tempRow = tempd;
        tempRow = tempd;
        _data.push(tempRow);
    }


    //return _data;

    return {
        _data: _data
        , _column: _column
        , _row: _row
    };
}
function _sfCreateDataNormal(col, row, text) {
    if (text == undefined) text = "";
    col = parseInt(col + "");
    row = parseInt(row + "");

    var _data = [];

    for (var i = 1; i <= row; i++) {
        var tempd = {};
        for (var i2 = 1; i2 <= col; i2++) {
            tempd[p8_NumberToCell(i2)] = text;
        }
        _data.push(tempd);
    }

    return _data;
}
function _sfReplaceByValue(json, row, field, newvalue) {
    json[row][field] = newvalue;
    return json;
}


function _sfExcelExport(SpreadID, FileName) {

    var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange; var j = 0;
    tab = document.getElementById(SpreadID); // id of table

    for (j = 0; j < tab.rows.length; j++) {
        tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
        //tab_text=tab_text+"</tr>";
    }

    tab_text = tab_text + "</table>";
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params


    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html", "replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus();
        sa = txtArea1.document.execCommand("SaveAs", true, FileName + ".xlsx");
    }
    else                 //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

    return (sa);
}


//dragElement(document.getElementById("mydiv"));

function myFunction() {
    _sfLog("remove events");
}


var _sfWindowWidth = $(window).width();
var _sfWindowWidthVar;
$(window).resize(function () {

    //console.log("resize");
    //if (_sfWindowWidth != $(window).width()) {
    clearInterval(_sfWindowWidthVar);
    _sfWindowWidthVar = setTimeout(function () {
        _sfResizeScrollAll();
    }, 1);
    //}

});

function _sfResizeScrollAll() {
    setTimeout(function () {
        for (var i = 0; i < $('.P8Spread').length; i++) {
            var containerID = $('.P8Spread:eq(' + i + ')').attr("id");
            if ($('.P8Spread:eq(' + i + ')').attr("curwidth") == $('.P8Spread:eq(' + i + ')').width() + "")
                continue;
            $('.P8Spread:eq(' + i + ')').attr("curwidth", $('.P8Spread:eq(' + i + ')').width());

            _sfResizeScroll(containerID);
            _sfResizeScrollTab(containerID);
            _sfScrollUpdateSizing(containerID);
        }
    }, 100);
}

function _sfCheckButton(obj) {

    // obj.Buttons;
}

function _sfFormartNumber(num, precision) {
    try {
        num = (num + '').replace(/,/g, "");
        var xer = parseFloat(num);

        xer = (Math.round(xer * 100) / 100).toFixed(precision);  //(Math.ceil(xer * 100) / 100).toFixed(2); //Math.round(num * 100) / 100; //
        return xer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "");
    } catch (err) { alert(err); }
}

function _sfSpreadInputShow(obj, clearText,e) {

    var valueformula = obj.Book.ActiveSheet.GetFormula();
    if (obj.Book.FormulaField == true) {
        $("#" + obj.canvasID + "").find(".formulafield").val(valueformula);
    }
    if (obj.IsDesigner == false && valueformula.trim().indexOf("=") == 0) {
        _sfPromptMessage("This cell has Formula");
        return true;
    }




    $("#" + obj.canvasID + "_vw_inp").val("");
    $("#" + obj.canvasID + "_vw_inp").attr("acol", obj.CellIndexes.Col);
    $("#" + obj.canvasID + "_vw_inp").attr("arow", obj.CellIndexes.Row);
    $("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "1");
    $("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "visible");

    var valuex = obj.Book.ActiveSheet.GetValue();
    if (obj.IsDesigner) {
        valuex = obj.Book.ActiveSheet.GetFormula();
    }

    var xdataType = obj.Book.ActiveSheet.GetDataType(obj.CellIndexes.Col, obj.CellIndexes.Row);
    var xprecision = obj.Book.ActiveSheet.GetPrecision(obj.CellIndexes.Col, obj.CellIndexes.Row);

    if (xdataType == "number"
        || xdataType == "currency"
        || xdataType == "percentvalue"
        || xdataType == "percent") {

        if (!p8Spread_IsNull(valueformula)) {

        } else {
            //if (xdataType == "percent") valuex = valuex * 100;
            if (xdataType == "percentvalue") valuex = valuex * 100;

            valuex = _sfFormartNumber(valuex, xprecision);
        }



        if (valuex == NaN || valuex == "NaN" || valuex == undefined || valuex == "undefined") valuex = "";
    }
    else {
        try {
            $('#' + obj.canvasID + '_vw_inp').unmask();
        } catch (err) { }
        $("#" + obj.canvasID + "_vw_inp").removeClass("isNumber");
        $("#" + obj.canvasID + "_vw_inp").removeClass("numC");
        $("#" + obj.canvasID + "_vw_inp").removeClass("nwPercentValue");
        if (xdataType == "date") {
            $("#" + obj.canvasID + "_vw_selectorCon .P8Spread_Input.hasDatepicker").show();
            setTimeout(function () {
                $("#" + obj.canvasID + "_vw_inp").val(valuex);
            }, 1);
        } else {
            // setTimeout(function () {
            $("#" + obj.canvasID + "_vw_inp").val(valuex);
            //  }, 1);
        }
    }

    // $("#" + obj.canvasID + "_vw_inp").val("");

    if (clearText == true) $("#" + obj.canvasID + "_vw_inp").val("");
    else $("#" + obj.canvasID + "_vw_inp").val(valuex);
    // dataType Input box

}
function _sfSpreadInputHide(obj) {

    $("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "0");
    $("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "hidden");
}

function _sfScrollUpdateSizing(containerID) {
    // setTimeout(function () { 
    var canvasID = containerID;
    var obj = P8DataList[canvasID][0].sheet.ActiveSheet;
    var total = obj.Data.length;
    //total = total - obj.FreezeRow;

    var currentview = obj.CellRowMax;
    var percH = currentview / total;
    var objScrolH = $('#' + canvasID).find('.P8Spread_Scroll');
    var scrollH = $(objScrolH).height();
    if (percH >= 0.95) percH = 0.95;
    var scrollDrag = scrollH * percH;
    if (scrollDrag <= 4) scrollDrag = 4;
    $(objScrolH).find('.P8Spread_ScrollBar.Vr').css('min-height', scrollDrag);
    $(objScrolH).find('.P8Spread_ScrollBar.Vr').css('max-height', scrollDrag);

    var up = $(objScrolH).parents("td").find(".P8Spread_ScrollUp").height();
    var bot = $(objScrolH).parents("td").find(".P8Spread_ScrollBot").height();
    var marginx = 8;
    $(objScrolH).parents("td").find('.P8Spread_Scroll').height($(objScrolH).parents("td").outerHeight() - (up + bot + marginx))



    total = obj.ColumnConfig.length;
    var xtotal = 0;
    for (var i = 0; i < obj.ColumnConfig.length; i++) {
        if (obj.ColumnWidth(i) != "0") xtotal += 1;
    }
    total = xtotal;

    currentview = obj.CellColMax;
    percH = currentview / total;
    objScrolH = $('#' + canvasID).find('.P8Spread_ScrollH');
    scrollH = $(objScrolH).width();
    if (percH >= 0.95) percH = 0.95;

    scrollDrag = scrollH * percH;

    if (scrollDrag <= 4) scrollDrag = 4;
    $(objScrolH).find('.P8Spread_ScrollH_handler').css('min-width', scrollDrag);
    $(objScrolH).find('.P8Spread_ScrollH_handler').css('max-width', scrollDrag);
    $(objScrolH).find('.P8Spread_ScrollH_handler').css('width', scrollDrag);

    var left = $(objScrolH).parents("td").find(".P8Spread_ScrollLeft").width();
    var right = $(objScrolH).parents("td").find(".P8Spread_ScrollRight").width();

    var xwidth = $(objScrolH).parents("td").outerWidth() - (left + right);
    xwidth = xwidth - 30;
    $(objScrolH).parents("td").find('.P8Spread_ScrollH').width(xwidth);
    $(objScrolH).parents("td").find('.P8Spread_ScrollH').css("min-width", xwidth);
    $(objScrolH).parents("td").find('.P8Spread_ScrollH').css("max-width", xwidth);

    //}, 600);

}


function _sfResizeScrollTab(containerID) {
    setTimeout(function () {
        var scheight = 0;
        var aminus = 72 - 13;
        $('#' + containerID).find(".P8Spread_ScrollH").css("min-width", "inherit");
        $('#' + containerID).find(".P8Spread_ScrollH").css("max-width", "inherit");
        $('#' + containerID).find(".P8Spread_ScrollH").css("width", "inherit");
        var scwidth = 0;
        var bminus = 44;
        scwidth = $('#' + containerID).find(".scrollerH").outerWidth() - bminus;
        scwidth -= 32;
        $('#' + containerID).find(".P8Spread_ScrollH").css("min-width", scwidth);
        $('#' + containerID).find(".P8Spread_ScrollH").css("max-width", scwidth);
        $('#' + containerID).find(".P8Spread_ScrollH").css("width", scwidth);

        $('#' + containerID).find(".P8Spread_Scroll").css("min-height", "initial");
        $('#' + containerID).find(".P8Spread_Scroll").css("max-height", "initial");
        $('#' + containerID).find(".P8Spread_Scroll").css("height", "initial");
        $('#' + containerID).find(".P8Spread_ScrollBar.Vr").css("min-height", "initial");
        $('#' + containerID).find(".P8Spread_ScrollBar.Vr").css("max-height", "initial");


        _sfScrollUpdateSizing(containerID);


    }, 550);

    //setTimeout(function () { P8DataList[containerID][0].sheet.ActiveSheet.RenderNoEvent(); }, 10);
}

function _sfResizeScroll(containerID) {

    var scheight = 0;
    var aminus = 90 - 13;
    $('#' + containerID).find(".P8Spread_Scroll").css("min-height", "initial");
    $('#' + containerID).find(".P8Spread_ScrollBar").css("min-height", "initial");

    setTimeout(function () {
        scheight = $('#' + containerID + '_vw_tbl').outerHeight() - aminus;
        $('#' + containerID).find(".P8Spread_Scroll").css("min-height", scheight + 12);

        var tolheight = scheight + 12;
        var totaltableheight = 0;
        var butheight = scheight - 34;
        var obj = P8DataList[containerID][0].sheet.ActiveSheet;
        let maxrow = obj.GetMaxRow();
        //for (var i = 0; i <maxrow  ; i++){
        //    totaltableheight += obj.RowHeight(i);
        //}


        butheight = butheight / (maxrow / 10);
        if (butheight >= scheight)
            butheight = scheight + 0;

        $('#' + containerID).find(".P8Spread_ScrollBar.Vr").css("min-height", butheight);


        $('#' + containerID).find(".P8Spread_Scroll").css("min-height", "initial");
        $('#' + containerID).find(".P8Spread_Scroll").css("max-height", "initial");
        $('#' + containerID).find(".P8Spread_Scroll").css("height", "initial");
        $('#' + containerID).find(".P8Spread_ScrollBar.Vr").css("min-height", "initial");
        $('#' + containerID).find(".P8Spread_ScrollBar.Vr").css("max-height", "initial");


        _sfScrollUpdateSizing(containerID);


        //$('#' + containerID).find(".P8Spread_ScrollBar").css("min-height", scheight);
    }, 10);


    $('#' + containerID).find(".P8Spread_ScrollH").css("min-width", "inherit");
    $('#' + containerID).find(".P8Spread_ScrollH").css("max-width", "inherit");
    $('#' + containerID).find(".P8Spread_ScrollH").css("width", "inherit");



    var conWidth = $('#' + containerID).width();
    var conheight = $('#' + containerID).height();


    setTimeout(function () {
        var scwidth = 0;
        var bminus = 44;
        scwidth = $('#' + containerID).find(".scrollerH").outerWidth() - bminus;
        scwidth -= 12;
        $('#' + containerID).find(".P8Spread_ScrollH").css("min-width", scwidth);
        $('#' + containerID).find(".P8Spread_ScrollH").css("max-width", scwidth);
        $('#' + containerID).find(".P8Spread_ScrollH").css("width", scwidth);
        try {

            setTimeout(function () {
                if (P8DataList[containerID] != undefined)
                    P8DataList[containerID][0].sheet.ActiveSheet.RenderNoEvent();

                _sfScrollUpdateSizing(containerID);
            }, 100);
        } catch (err) { }

        //var myCanvas = createHiDPICanvas(containerID + "_vw", conWidth, conheight, 2);
    }, 10);
}

function _sfnwGridButtons(objBook, rclass) {
    if (rclass == undefined) rclass = "";


    var strAddButton = "";
    try {
        var index = 0;

        var obj = objBook.Buttons[index];


        strAddButton = "<div class=\"nwgridButtons " + rclass + "\" p8style='{0}'>";

        if (!obj._isAddNew) {
            strAddButton += "";
        }
        else {
            strAddButton += "<div class=\"nwgrid_buttonsCon " + rclass + "\"><button class=\"nwgrid_AddNew nwgrid_buttons " + rclass + "\"  >Add Row</button></div>";
        }
        if (obj.dataTableButtons.length >= 1
            || obj.buttonInsert || obj.buttonCopyRow || obj.buttonDelete || obj._isAddNew
            || obj.buttonSearch
            || obj.buttonSearchFind
            || obj.buttonSaveColumn || obj.buttonResetColumn
            || obj.buttonReport
        ) {
            //  tableHeightBut = tableHeightBut - 25;
            strAddButton = String.Format(strAddButton, "height:21px;");
        }
        else {
            //tableHeight += 14; tableHeightBut += 12; // in old for height
            strAddButton = String.Format(strAddButton, "");
            return "";
        }



        //<div class="nwgridButtons" p8style="height:20px;">

        if (obj.buttonInsert) strAddButton += "<div class=\"nwgrid_buttonsCon " + rclass + "\"><span class=\"btnImage\"></span><button class=\"nwgrid_Insert nwgrid_buttons\"  >Insert Row</button></div>";
        if (obj.buttonCopyRow) strAddButton += "<div class=\"nwgrid_buttonsCon " + rclass + "\"><span class=\"btnImage\"></span><button class=\"nwgrid_CopyRow nwgrid_buttons\"    >Copy Row</button></div>";
        if (obj.buttonDelete) strAddButton += "<div class=\"nwgrid_buttonsCon " + rclass + "\"><span class=\"btnImage\"></span><button class=\"nwgrid_Delete nwgrid_buttons\"  >Delete Row</button></div>";


        if (obj.buttonSaveColumn) strAddButton += "<div class=\"nwgrid_buttonsCon " + rclass + "\"><span class=\"btnImage\"></span><button class=\"nwgrid_SaveWidth nwgrid_buttons\"  >Save Column Width</button></div>";
        if (obj.buttonResetColumn) strAddButton += "<div class=\"nwgrid_buttonsCon " + rclass + "\"><span class=\"btnImage\"></span><button class=\"nwgrid_ResetWidth nwgrid_buttons\"  >Reset Column Width</button></div>";

        //aagGridColHide 09-07-2022
        try {
            if (obj.hide_column_but == true) strAddButton += "<div class=\"nwgrid_buttonsCon " + rclass + "\"><span class=\"btnImage\"></span><button class=\"nwgrid_HideColumn nwgrid_buttons\" onclick=\" return false;\" style=\"\">Show/Hide Column</button></div>";
        }
        catch (err) { }


        if (obj.buttonReport) {
            strAddButton += "<div class=\"nwgrid_buttonsCon " + rclass + "\"><span class=\"btnImage\"></span><button class=\"nwgrid_HeaderShowHide nwgrid_buttons\"  buttonstatus='true' buttonindex ='" + obj.buttonReportIndex + "'  txthide='" + obj.buttonReportTextHide.replaceAll("'", "\'") + "' txtshow='" + obj.buttonReportTextShow.replaceAll("'", "\'") + "' >" + obj.buttonReportTextHide + "</button></div>";

            //strAddButton += "<style>";

            //for (var i = 1; i <= buttonReportIndex; i++)
            //{
            //    if (i > 1) strAddButton += ",";
            //    strAddButton += "body  #" + _gridID + ".nwGrid.nwGridHideHeader tr.nwGridFreezeRow:nth-child(" + i.ToString() + ")";
            //}
            //strAddButton += "{ display: none; }</style>";
        }

        if (obj.buttonSearchFind)
            strAddButton += "<div class=\"nwgrid_buttonsCon " + rclass + "\"><span class=\"btnImage\"></span><input class=\"nwgrid_SearchNext\"> <button class=\"nwgrid_SearchFind nwgrid_buttons\"  >Find</button></div>";

        if (obj.buttonExport) strAddButton += "<div class=\"nwgrid_buttonsCon " + rclass + "\" p8style=\"" + (obj.buttonExportHide ? "display:none;" : "") + "\"><span class=\"btnImage\"></span><button class=\"nwgrid_Export nwgrid_buttons\"  >Export</button></div>";


        /// hide for now
        //if (buttonSearch) strAddButton += "<div class=\"nwgrid_buttonsCon\"><span p8style=\"vertical-align: middle;\">Search </span><input class=\"nwgrid_Search\"></div>";


        try {
            for (var index1 = 0; index1 < obj.dataTableButtons.length; index1++){
                var ButtonClass = "";
                try {
                    ButtonClass = obj.dataTableButtons[index1].ButtonClass == undefined ? "" : obj.dataTableButtons[index1].ButtonClass;
                } catch (err) { }
                strAddButton = strAddButton + "<div class=\"nwgrid_buttonsCon " + rclass + "\"><span class=\"btnImage\"></span><button ID=\"" + obj.dataTableButtons[index1].ButtonID + "\" nwID=\"" + obj.dataTableButtons[index1].ButtonID + "\" class=\"nwgrid_buttonCustom nwgrid_buttons " + ButtonClass + "\"  >" + obj.dataTableButtons[index1].ButtonTitle + "</button></div>";
            }
        } catch (err) { }

        //strAddButton += "<style>";
        //strAddButton += "#" + objBook.ActiveSheet.canvasID + " .nwgrid_buttons {margin-top: 0px;display:inline-block;width:inherit; padding-left:4px;padding-right:4px; margin-bottom:1px; padding-bottom:1px; height:18px;border-radius: 3px;border-bottom: 1px #828282 solid; font-size: 11px;}";
        //strAddButton += "#" + objBook.ActiveSheet.canvasID + " .nwgrid_buttonsCon {    display: inline-block;float: left;margin-right: 3px;}";  //margin-bottom: 3px;
        //strAddButton += "</style>";

        strAddButton += "</div>"; // end
    } catch (err) { }

    if (objBook.FormulaField == true) {
        strAddButton += "<div><span p8style='font-style: italic;font-weight: bold;margin: 10px;'>fx</span>"
        strAddButton += "<input class='formulafield " + rclass + "' p8style='min-width: 450px;max-width: 92%;width: 92%;'></div>";
    }

    return strAddButton;
}

function _sfnwGridButtonsNew(objBook) {
    var strAddButton = "";
    return "";
    try {
        var index = 0;
        var obj = objBook.Buttons[index];
        strAddButton = "<div class=\"nwgridButtons\" p8style='{0}'>";
        if (!obj._isAddNew) {
            strAddButton += "";
        }
        else {
            strAddButton += "<div class=\"nwgrid_buttonsCon\"><button class=\"nwgrid_AddNew nwgrid_buttons\"  >Add Row</button></div>";
        }
        if (obj.dataTableButtons.length >= 1
            || obj.buttonInsert || obj.buttonCopyRow || obj.buttonDelete || obj._isAddNew
            || obj.buttonSearch
            || obj.buttonSearchFind
            || obj.buttonSaveColumn || obj.buttonResetColumn
            || obj.buttonReport
        ) {
            //  tableHeightBut = tableHeightBut - 25;
            strAddButton = String.Format(strAddButton, "height:21px;");
        }
        else {
            //tableHeight += 14; tableHeightBut += 12; // in old for height
            strAddButton = String.Format(strAddButton, "");
            return "";
        }
        //<div class="nwgridButtons" p8style="height:20px;">
        if (obj.buttonInsert) strAddButton += "<div class=\"nwgrid_buttonsCon\"><span class=\"btnImage\"></span><button class=\"nwgrid_Insert nwgrid_buttons\"  >Insert Row</button></div>";
        if (obj.buttonCopyRow) strAddButton += "<div class=\"nwgrid_buttonsCon\"><span class=\"btnImage\"></span><button class=\"nwgrid_CopyRow nwgrid_buttons\"    >Copy Row</button></div>";
        if (obj.buttonDelete) strAddButton += "<div class=\"nwgrid_buttonsCon\"><span class=\"btnImage\"></span><button class=\"nwgrid_Delete nwgrid_buttons\"  >Delete Row</button></div>";
        if (obj.buttonSaveColumn) strAddButton += "<div class=\"nwgrid_buttonsCon\"><span class=\"btnImage\"></span><button class=\"nwgrid_SaveWidth nwgrid_buttons\"  >Save Column Width</button></div>";
        if (obj.buttonResetColumn) strAddButton += "<div class=\"nwgrid_buttonsCon\"><span class=\"btnImage\"></span><button class=\"nwgrid_ResetWidth nwgrid_buttons\"  >Reset Column Width</button></div>";


        //aagGridColHide 09-07-2022
        try {
            if (obj.hide_column_but == true) strAddButton += "<div class=\"nwgrid_buttonsCon\"><span class=\"btnImage\"></span><button class=\"nwgrid_HideColumn nwgrid_buttons\" onclick=\" return false;\" style=\"\">Show/Hide Column</button></div>";
        }
        catch (err) { }


        if (obj.buttonReport) {
            strAddButton += "<div class=\"nwgrid_buttonsCon\"><span class=\"btnImage\"></span><button class=\"nwgrid_HeaderShowHide nwgrid_buttons\"  buttonstatus='true' buttonindex ='" + obj.buttonReportIndex + "'  txthide='" + obj.buttonReportTextHide.replaceAll("'", "\'") + "' txtshow='" + obj.buttonReportTextShow.replaceAll("'", "\'") + "' >" + obj.buttonReportTextHide + "</button></div>";
            //strAddButton += "<style>";
            //for (var i = 1; i <= buttonReportIndex; i++)
            //{
            //    if (i > 1) strAddButton += ",";
            //    strAddButton += "body  #" + _gridID + ".nwGrid.nwGridHideHeader tr.nwGridFreezeRow:nth-child(" + i.ToString() + ")";
            //}
            //strAddButton += "{ display: none; }</style>";
        }
        if (obj.buttonSearchFind)
            strAddButton += "<div class=\"nwgrid_buttonsCon\"><span class=\"btnImage\"></span><input class=\"nwgrid_SearchNext\"> <button class=\"nwgrid_SearchFind nwgrid_buttons\"  >Find</button></div>";
        if (obj.buttonExport) strAddButton += "<div class=\"nwgrid_buttonsCon\" p8style=\"" + (obj.buttonExportHide ? "display:none;" : "") + "\"><span class=\"btnImage\"></span><button class=\"nwgrid_Export nwgrid_buttons\"  >Export</button></div>";
        /// hide for now
        //if (buttonSearch) strAddButton += "<div class=\"nwgrid_buttonsCon\"><span p8style=\"vertical-align: middle;\">Search </span><input class=\"nwgrid_Search\"></div>";
        try {
            for (var index1 = 0; index1 < obj.dataTableButtons.length; index1++)
                strAddButton = strAddButton + "<div class=\"nwgrid_buttonsCon\"><span class=\"btnImage\"></span><button ID=\"" + obj.dataTableButtons[index1].ButtonID + "\" nwID=\"" + obj.dataTableButtons[index1].ButtonID + "\" class=\"nwgrid_buttonCustom nwgrid_buttons\"  >" + obj.dataTableButtons[index1].ButtonTitle + "</button></div>";
        } catch (err) { }
        strAddButton += "<style>";
        strAddButton += "#" + objBook.ActiveSheet.canvasID + " .nwgrid_buttons {margin-top: 0px;display:inline-block;width:inherit; padding-left:4px;padding-right:4px; margin-bottom:1px; padding-bottom:1px; height:18px;border-radius: 3px;border-bottom: 1px #828282 solid; font-size: 11px;}";
        strAddButton += "#" + objBook.ActiveSheet.canvasID + " .nwgrid_buttonsCon {    display: inline-block;float: left;margin-right: 3px;}";  //margin-bottom: 3px;
        strAddButton += "</style>";
        strAddButton += "</div>"; // end
    } catch (err) { }
    //if (objBook.FormulaField == true) {
    //    strAddButton += "<div><span p8style='font-style: italic;font-weight: bold;margin: 10px;'>fx</span>"
    //    strAddButton += "<input class='formulafield' p8style='min-width: 450px;max-width: 92%;width: 92%;'></div>";
    //}
    return strAddButton;
}

function _sfnwRandomString(count) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    if (count == undefined) count = 10;
    for (var i = 0; i < count; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function _sfAutoWrap(obj, _canvasID) {
    //if (obj.AutoWrap == false) return;
    obj.RenderStatus = false;

    var spread = obj;
    var rowcount = spread.Data.length;
    var colcount = spread.ColumnConfig.length;


    console.log("Canvas AutoWrap Start:" + obj.canvasID);
    if (rowcount >= 1000) rowcount = 1000;
    for (var i = 0; i < rowcount; i++) {
        _sfAutoWrapRow(spread, i);

        //if (i % 1000 == 0) sleep(2000);
    }
    obj.AutoWrapRender = true;

    obj.RenderStatus = true;
    console.log("Canvas AutoWrap End:" + obj.canvasID);

}

function _sfWrapText(ctx, text, x, y, maxWidth, fontSize, fontFace) {
    var firstY = y;
    var words = text.split(' ');
    var line = '';
    var lineHeight = fontSize * 1.286; // a good approx for 10-18px sizes

    ctx.font = fontSize + " " + fontFace;
    ctx.textBaseline = 'top';

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth) {
            ctx.fillText(line, x, y);
            if (n < words.length - 1) {
                line = words[n] + ' ';
                y += lineHeight;
            }
        }
        else {
            line = testLine;
        }
    }
    //  ctx.fillText(line, x, y);

    return y - 15;
}

function _sfAutoWrapRow(obj, rowindex, _canvasID) {
    var spread = obj;
    setTimeout(function () {
        var currentmax = 0;
        var canvasID = _canvasID || obj.canvasID + "_vw";
        canvasID += "_temp";

        var canvasSheet = document.getElementById(canvasID);
        try {
            var ctx = canvasSheet.getContext('2d');
            //var rowindex = i;
            for (var c = 0; c < spread.ColumnConfig.length; c++) {
                //var c=4;
                var textX = spread.GetText(c, rowindex);
                //console.log(rowindex + " |" + textX + "| " + c + " : " );
                var width = parseInt(spread.ColumnWidth(c));

                if (width <= 1) continue;

                var mergelist = [];
                try {
                    mergelist = spread.Data[rowindex][_sfGetCellName(spread, c)].Config.filter(item => (item["id"] == "merge"))[0].element.value[0];;
                } catch (err) { }
                for (var i = mergelist.col + 1; i <= mergelist.col2; i++) {
                    var widthTemp = parseInt(spread.ColumnWidth(i));
                    width += widthTemp;
                }

                var fontFace = (Font.fontStyle || "") + ' ' + (Font.fontWeight || "") + ' ' + (Font.fontSize || 12) + 'px ' + (Font.fontFamily || "");
                var textheight = wrapTextHeight(ctx, textX, 5, width * 0.9, (FontHeight(ctx, Font.fontSize, Font.fontWeight, Font.fontFamily, Font.fontStyle)));

                textheight -= 5;

                //_sfWrapText(ctx, textX, 0, 0, width * 0.99, Font.fontSize, fontFace);//

                if (textheight <= 5) textheight = def_Height;

                if (textheight >= def_Height) textheight = textheight - def_Height;

                if (textheight >= 250) textheight = 250;

                textheight = def_Height + ((textheight) * 1.0);
                //console.log(rowindex + " |" + textX + "| " + width + " : " + currentmax + " < = " + textheight);
                if (textheight >= currentmax) currentmax = textheight;
            }
            //console.log(rowindex + " "  + " " + width + " : " + currentmax);
            try {
                //spread.RowHeight(i, currentmax);
                spread.Data[rowindex].aagrowHeight = currentmax;
            } catch (err) { }
        } catch (err) { }
    }, 5);
}


var def_Height = 24;
var def_Width = 90;
var xTime;
var P8Spread_elemLeft = 0;
var P8Spread_elemTop = 0;
var P8Spread_currcavas = "";

function canvasCreate(canvasID, obj) {
    var isresponsive = false;
    if ($("body").width() <= 550) isresponsive = true;

    if (isresponsive) {
        if (obj.Theme == P8Themes.FANCY) {
            canvasCreateListHTML(canvasID, obj);
        }
        else {
            canvasCreateList(canvasID, obj);
        }

        return;
    }
    if ($("#" + canvasID + "_vw").hasClass("nklist")) {
        $("#" + canvasID).html("");
    }


    var randomid = nwRandomString(40);
    P8Spread_currcavas = randomid;
    console.log("START:" + randomid);
    if (obj.gridtype == "grid") {
        return canvasGridCreate(canvasID, obj);
    }
    obj.ScrollActive = false;
    obj.ScrollActiveStat = false;

    var isObjectCreated = false;
    if (xTime == undefined) xTime = new Date().getTime();


    var data = obj.Data;
    var canvasIDOrig = canvasID;
    var containerID = canvasID;
    canvasID = canvasID + "_vw";
    var _tmpExtra = 0;

    var scrollhwidth = 400;


    var scheight = 0;
    var aminus = 72;



    if ($("#" + canvasID).index() >= 0) {
        isObjectCreated = true;

        //setTimeout(function () {
        //    if (obj.AutoWrap == true && obj.AutoWrapRender == false)
        //        _sfAutoWrap(obj);
        //}, 10);
    }
    else {
        obj.havelistner = false;
        console.log("CreateG:" + randomid);
        var scrollWidth = 10;
        var scrollHeight = 10;
        var x_html = "";
        _sfLog("Canvas Initialize:" + ":");
        $('#' + containerID).html("");
        $('#' + containerID).addClass("P8Spread");

        $('#' + containerID).attr("intanceid", containerID + "-" + _sfnwRandomString(30));
        $('#' + containerID).css("width", "99%");

        // draw button
        var strbut = _sfnwGridButtons(obj.Book);
        if (strbut != "") {
            x_html += "<table id='" + canvasID + "_tbl0' class='P8Spread_HeaderButtons' p8style='width:100%'>";//main border: solid 1px #7f7f7f;border-spacing: initial;padding-right: 1px;
            //obj.Buttons
            x_html += "<tr>"; //Buttons
            x_html += "<td colspan='2' p8style='padding:0px'>"; //Buttons   //;background-color:#c3c3c3;  

            // x_html += "<div class='nwgridButtons' p8style='height:25px;'></div>";
            x_html += strbut;

            x_html += "</td>"; //Buttons
            x_html += "</tr>"; //Buttons
            x_html += "</table>";//main
        }



        x_html += "<table id='" + canvasID + "_tbl' class='P8Spread_Content' p8style='border: solid 1px #7f7f7f;border-spacing: initial;padding-right: 1px;'>";//main

        x_html += "<tr p8style='padding:0px;height:" + _tmpExtra + "px;display:" + (_tmpExtra <= 0 ? "none" : "table-row") + "' >"; //Top
        x_html += "<td colspan='2' p8style='padding:0px;background-color:#c3c3c3;  '>"; //Canvas
        x_html += "<div id='" + canvasID + "_inpC'><input id='" + canvasID + "_inpx' autofocus type='text' /><button id='" + canvasID + "_inpB'>focus</button></div>";
        x_html += "</td>"; //Canvas
        x_html += "</td></td>"; //spacer
        x_html += "</td></td>";
        x_html += "</tr>"; //Top



        x_html += "<tr p8style='padding:0px;' >"; //Content
        x_html += "<td colspan='2' p8style='padding:0px;vertical-align:top'>"; //Canvas

        x_html += "<div  id='" + canvasID + "_con'><textarea id='" + canvasID + "_inpText' class='P8Spread_TextArea paste' p8style='opacity:0;position:absolute;width0;height:0;z-index:-1;' ></textarea>";
        //x_html += "<div  id='" + canvasID + "_con'><input id='" + canvasID + "_inpText' class='P8Spread_TextArea' p8style='opacity:0;position:absolute;width0;height:0;' />";


        //x_html += "<div id='" + canvasID + "_selectorCon' p8style='width: 0px;height: 0px;overflow:hidden'><textarea id='" + canvasID + "_inp' class='P8Spread_Input' type='text' p8style='height: 22px;border: 2px solid #0079d9;padding-left: 5px;padding-right: 5px;resize:none;'></textarea></div>";
        //selector
        //



        x_html += "<div id='" + canvasID + "_selectorCon' class='p8_selectorCon' p8style='width: 0px;height: 0px;overflow:hidden;'>";
        x_html += "<input id='" + canvasID + "_inp' class='P8Spread_Input' autocomplete='off' type='text' p8style='height: 19px;border: 2px solid #0079d9;marging-left:-2px;resize:none;' />";
        x_html += "<div id='" + canvasID + "_inpDate' class='P8Spread_Input' type='text' p8style='' />";
        x_html += "</div>";

        x_html += "</div>";

        var xconheight = ($('#' + containerID).css("height")) || 0;
        if (xconheight <= 10) xconheight = obj.Book.TableHeight || 300;

        //x_html += "<canvas id='" + canvasID + "' class='nkspread'  p8style='height:" + xconheight + ";cursor:default;width:" + $('#' + containerID).css("width") + ";'></canvas>";
        //x_html += "<canvas id='" + canvasID + "_temp'  p8style='display:none;height:" + xconheight + ";cursor:default;width:" + $('#' + containerID).css("width") + ";'></canvas>";

        
        var scrollerHwidth = 120;

        var haspx = false;
        try {
            haspx = $('#' + containerID).css("width").toString().includes("px");
        } catch (ex) { }
        if (haspx) {
            var xconwidth = $('#' + containerID).width() - 10;
            x_html += "<canvas id='" + canvasID + "' class='nkspread'  p8style='height:" + xconheight + ";cursor:default;width:" + (xconwidth + "px") + ";'></canvas>";
            x_html += "<canvas id='" + canvasID + "_temp'  p8style='display:none;height:" + xconheight + ";cursor:default;width:" + (xconwidth + "px") + ";'></canvas>";
            if (xconwidth < 300) {
                scrollhwidth = xconwidth * 0.6
                scrollerHwidth = xconwidth * 0.4
            }
            else if (xconwidth < 380) {
                scrollhwidth = xconwidth * 0.6
                scrollerHwidth = xconwidth * 0.4
            } else if (xconwidth < 500) {
                scrollhwidth = xconwidth * 0.7
                scrollerHwidth = xconwidth * 0.3
            } else {
                scrollhwidth = 400
            }
            if (scrollerHwidth > 120) {
                scrollerHwidth = 120;
            }
        } else {
            scrollhwidth = 400
            x_html += "<canvas id='" + canvasID + "' class='nkspread'  p8style='height:" + xconheight + ";cursor:default;width:" + $('#' + containerID).css("width") + ";'></canvas>";
            x_html += "<canvas id='" + canvasID + "_temp'  p8style='display:none;height:" + xconheight + ";cursor:default;width:" + $('#' + containerID).css("width") + ";'></canvas>";
        }
    


        x_html += "</td>"; //Canvas



        x_html += "<td  class='P8Spread_SheetVScroll' p8style='padding:0px;min-width:" + scrollWidth + "px;width:" + scrollWidth + "px;max-width:" + scrollWidth + "px;padding-right:1px;vertical-align: top;'>"; //scroller
        x_html += "<div id='" + containerID + "_P8Spread_ScrollUp' class='P8Spread_ScrollUp' p8style='padding: 0px;min-height: 15px;min-width: " + scrollWidth + "px;display: inline-block;background-color: #efefef;background-color: #83b8d3;border: 1px solid #607c8b;box-shadow: inset 0px 0px 5px #e5e5e5;border-radius: 3px;'></div>";
        x_html += "<div  class='P8Spread_Scroll' p8style='padding:0px;min-width:100%;min-height:30px;background: #ececec;border: 1px solid #ececec;'><div id='" + containerID + "_P8Spread_Scroll' class='P8Spread_ScrollBar Vr' p8style='border-radius: 5px;min-height:30px;background: #bcc5ce;border-radius: 3px;background-image: -webkit-linear-gradient(top, #bcc5ce, #bcc5ce);background-image: -moz-linear-gradient(top, #bcc5ce, #bcc5ce);background-image: -ms-linear-gradient(top, #bcc5ce, #bcc5ce);background-image: -webkit-gradient(linear, 0 0, 0 100%, from (#bcc5ce), to(#bcc5ce));background-image: -webkit-linear-gradient(top, #bcc5ce, #bcc5ce);background-image: -o-linear-gradient(top, #bcc5ce, #bcc5ce);background-image: linear-gradient(top, #bcc5ce, #bcc5ce);box-shadow: inset 1px 1px 5px #bcc5ce;border: 1px solid #bcc5ce;'><div id='" + containerID + "_P8Spread_Scroll_handler' p8style='min-width:100%;min-height:100%'></div></div></div>"; //scrollbar
        x_html += "<div id='" + containerID + "_P8Spread_ScrollBot' class='P8Spread_ScrollBot' p8style='padding: 0px;min-height: 15px;min-width: " + scrollWidth + "px;display: inline-block;background-color: #efefef;background-color: #83b8d3;border: 1px solid #607c8b;box-shadow: inset 0px 0px 5px #e5e5e5;border-radius: 3px;'></div>";

        x_html += "</td>"; //scroller
        x_html += "</tr>"; //Content



        x_html += "<tr class='P8Spread_SheetHScroll' p8style='padding:0px;height:20px;' >"; //Bottom
        x_html += "<td id='" + containerID + "_SheetCon' class='P8Spread_SheetCon' p8style='border-top: 1px solid #dddddd !important;max-width:" + (scrollhwidth + 10) + "px;min-width:" + (scrollhwidth + 10) + "px;width:" + (scrollhwidth + 10) + "px;padding:0px;background-color:#dddddd;'>"; //sheet Tab
        x_html += "<canvas id='" + containerID + "_SheetConCanvas'  class='P8Spread_SheetConCanvas' p8style='min-height: 25px;max-height: 25px;max-width:" + scrollhwidth + "px;min-width:" + scrollhwidth + "px;width:" + scrollhwidth + "px; height: 25px;'></canvas>";
        x_html += "</td>"; //
        x_html += "<td class='scrollerH' colspan='2' p8style='padding:0px;background-color:#dddddd;min-width:" + (scrollerHwidth) + "px'>"; //scroll  Horizontal
        //x_html += "<td class='scrollerH' colspan='2' p8style='padding:0px;background-color:#dddddd;min-width:120px'>"; //scroll  Horizontal
        x_html += "<div id='" + containerID + "H_P8Spread_ScrollLeft' class='P8Spread_ScrollLeft' p8style='padding: 0px;min-height: " + scrollHeight + "px;min-width: " + scrollHeight + "px;display: inline-block;background-color: #efefef;background-color: #83b8d3;border: 1px solid #607c8b;box-shadow: inset 0px 0px 5px #e5e5e5;border-radius: 3px;'></div>";
        x_html += "<div  class='P8Spread_ScrollH' p8style='padding:0px;min-width:30px;min-height:" + (scrollHeight - 2) + "px;background: #c7d4e1;display: inline-block;'><div id='" + containerID + "H_P8Spread_Scroll' class='P8Spread_ScrollBar Hr' p8style='padding: 0px;min-height: " + (scrollHeight - 2) + "px;min-width: 30px;border: 1px solid #ececec;box-shadow: inset 0 0 5px #ececec;border-radius: 2px;background-color: #ececec;'><div id='" + containerID + "_P8Spread_ScrollH_handler' class='P8Spread_ScrollH_handler' p8style='border-radius:5px; width: 30px;min-height: " + (scrollHeight - 2) + "px;padding: 0px;position: relative;left: 0px;background: #bcc5ce;border-radius: 3px;background-image: -webkit-linear-gradient(top, #bcc5ce, #bcc5ce);background-image: -moz-linear-gradient(top, #bcc5ce, #bcc5ce);background-image: -ms-linear-gradient(top, #bcc5ce, #bcc5ce);background-image: -webkit-gradient(linear, 0 0, 0 100%, from (#bcc5ce), to(#bcc5ce));background-image: -webkit-linear-gradient(top, #bcc5ce, #bcc5ce);background-image: -o-linear-gradient(top, #bcc5ce, #bcc5ce);background-image: linear-gradient(top, #bcc5ce, #bcc5ce);box-shadow: inset 1px 1px 5px #bcc5ce;border: 1px solid #bcc5ce;'></div></div></div>"; //scrollbar
        x_html += "<div id='" + containerID + "H_P8Spread_ScrollRight' class='P8Spread_ScrollRight' p8style='padding: 0px;min-height: " + scrollHeight + "px;min-width: " + scrollHeight + "px;display: inline-block;background-color: #efefef;background-color: #83b8d3;border: 1px solid #607c8b;box-shadow: inset 0px 0px 5px #e5e5e5;border-radius: 3px;'></div>";
        //border: 1px solid #80808085;
        x_html += "</td>"; //scroll Horizontal
        x_html += "</tr>"; //Bottom


        x_html += "</table>";//main

        x_html += "<div id='" + containerID + "_copy' p8style='display:none;visibility:hidden;'></div>";




        $('#' + containerID).html(x_html);
        $('#' + containerID).addClass("P8Spread");

        $('#' + containerID).attr('isresize', 0);
        $('#' + containerID).attr('isresetsize', 0);


        scheight = $('#' + containerID + '_vw_tbl').outerHeight() - aminus;
        $('#' + containerID).find(".P8Spread_Scroll").css("min-height", scheight);



        $('#' + canvasID + "_inpDate").datepicker({
            canvasID: obj.canvasID,
            altField: '#' + canvasID + "_inp",
            altFormat: "mm/dd/yy"//,
            //onSelect: function (dateText, inst) {
            //    $(this).closest(".P8Spread").attr("id");
            //    $(this).hide();
            //    $(inst.settings.altField).hide();
            //    var canvasID = inst.settings.canvasID;
            //    var acol = $(inst.settings.altField).attr("acol");
            //    var arow = $(inst.settings.altField).attr("arow");
            //    var obj = P8DataList[canvasID][0].sheet.ActiveSheet;
            //    obj.SetText(parseInt(acol), parseInt(arow), dateText, "text", true);
            //}

        });
        $('#' + canvasID + "_inpDate").css("position", "absolute");
        $('#' + canvasID + "_inpDate").hide();
        $("[p8style]").each(function (i) {
            var obj = $(this);
            var nwstyle = obj.attr("p8style");
            if (nwstyle != undefined) {
                var cssstyle = nwstyle.split(";");
                var count = cssstyle.length;
                for (var i2 = 0; i2 < count; i2++) {
                    try {
                        var style = cssstyle[i2].split(":");
                        $(obj).css(style[0], style[1]);
                    } catch (err) { }
                }
                obj.removeAttr("p8style");
            }
        });


        setTimeout(function () { _sfRefreshSpecialConfig(obj) }, 10); // must remove to future to remove double refresh


        var scwidth = 0;
        var bminus = 49;
        scwidth = $('#' + containerID).find(".scrollerH").outerWidth() - bminus;

        //if (scwidth <= 500)
        scwidth -= 12;

        $('#' + containerID).find(".P8Spread_ScrollH").css("min-width", scwidth);
        $('#' + containerID).find(".P8Spread_ScrollH").css("max-width", scwidth);
        $('#' + containerID).find(".P8Spread_ScrollH").css("width", scwidth);


        var cmpScrollUp = document.getElementById(containerID + "_P8Spread_ScrollUp");
        cmpScrollUp.addEventListener('click', function (event) {
            obj.Book.ActiveSheet.ScrollUp();
        }, false);

        var cmpScrollBot = document.getElementById(containerID + "_P8Spread_ScrollBot");
        cmpScrollBot.addEventListener('click', function (event) {
            obj.Book.ActiveSheet.ScrollDown();
        }, false);


        var cmpScrollLeft = document.getElementById(containerID + "H_P8Spread_ScrollLeft");
        cmpScrollLeft.addEventListener('click', function (event) {
            obj.Book.ActiveSheet.ScrollLeft();
        }, false);

        var cmpScrollRight = document.getElementById(containerID + "H_P8Spread_ScrollRight");
        cmpScrollRight.addEventListener('click', function (event) {
            obj.Book.ActiveSheet.ScrollRight();
        }, false);


        var canvasS = document.getElementById(canvasID);

        canvasS.addEventListener('mousewheel', function (event) {
            var scrollCount = 10;
            var rowcount = obj.Data.length;
            var perc = 0.01;


            perc = 2.5 / (rowcount + 0.0);
            if (perc < 0.005) perc = 0.005;
            //console.log("perc:" + perc);


            var ch = $("#" + containerID + "_P8Spread_Scroll").parent().height();
            var scrollxx = 0;



            if (event.wheelDeltaY <= 0)
                scrollxx = parseFloat($("#" + containerID + "_P8Spread_Scroll").css("top")._sfReplaceAll("px", "")) + (ch * perc);
            else
                scrollxx = parseFloat($("#" + containerID + "_P8Spread_Scroll").css("top")._sfReplaceAll("px", "")) - (ch * perc);

            if (scrollxx <= 0) scrollxx = 0;



            var a = parseFloat($("#" + containerID + "_P8Spread_Scroll").css("top").replace("px", ""));
            var b = $("#" + containerID + "_P8Spread_Scroll").parents(".P8Spread_Scroll").height();
            var c = $("#" + containerID + "_P8Spread_Scroll").height();
            if (b - c < a && scrollxx >= a) scrollxx = a;


            $("#" + containerID + "_P8Spread_Scroll").css("top", scrollxx);

            var t = parseInt($("#" + containerID + "_P8Spread_Scroll").css("top")._sfReplaceAll("px", ""));
            var h = $("#" + containerID + "_P8Spread_Scroll").outerHeight();
            var ratio = parseFloat(h) / parseFloat(ch);
            var totaly = (t + h);

            _sfLog(event.wheelDeltaY + " : " + rowcount);




            var scrolly = rowcount * ((100 - (((ch - h) - (t)) / (ch - h) * 100)) / 100);
            scrolly = Math.floor(scrolly) + 1;
            if (scrolly >= rowcount) scrolly = rowcount;
            //if (scrolly < 1) scrolly = 2;
            if (event.deltaY < 0) {  //scrolling up
                if (scrolly >= obj.startRow) {
                    if (scrolly > obj.Data.length) {
                        scrolly = (obj.startRow - 1)
                    }
                }
            }
            else {
                //  if (scrolly <= 1) scrolly = (obj.startRow+1); //scrolling down
                if (scrolly <= obj.startRow) {
                    if (scrolly < obj.Data.length) {
                        scrolly = (obj.startRow + 1)
                    }
                }
            }


            obj.Book.ActiveSheet.ScrollRender(undefined, scrolly);

            try {
                // if (nwBrowser == "Firefox")
                event.preventDefault();
            } catch (err) {

            }

            return true;

            //}, true);
        }, { passive: false });



        //setTimeout(function () {
        //var scheight = 0;
        //var aminus = 72;
        //scheight = $('#' + containerID + '_vw_tbl').outerHeight() - aminus;
        //$('#' + containerID).find(".P8Spread_Scroll").css("min-height", scheight);

        //var scwidth = 0;
        //var bminus = 42;
        //scwidth = $('#' + containerID).find(".scrollerH").outerWidth() - bminus;
        //$('#' + containerID).find(".P8Spread_ScrollH").css("min-width", scwidth);
        //$('#' + containerID).find(".P8Spread_ScrollH").css("max-width", scwidth);
        //$('#' + containerID).find(".P8Spread_ScrollH").css("width", scwidth);


        $("#" + containerID + "_P8Spread_Scroll").draggable({
            axis: "y", containment: "parent"
            , drag: function () {
                //counts[1]++;
                //updateCounterStatus($drag_counter, counts[1]);
                var scrollCount = 10;
                var rowcount = obj.Data.length;
                var t = parseInt($("#" + containerID + "_P8Spread_Scroll").css("top")._sfReplaceAll("px", ""));
                var h = $("#" + containerID + "_P8Spread_Scroll").outerHeight() + 1;
                var ch = $("#" + containerID + "_P8Spread_Scroll").parent().height();
                var ratio = parseFloat(h) / parseFloat(ch);
                var totaly = (t + h);
                var scrolly = rowcount * ((100 - (((ch - h) - (t)) / (ch - h) * 100)) / 100);
                scrolly = Math.floor(scrolly) + 1;
                if (scrolly >= rowcount) scrolly = rowcount;
                if (scrolly <= 0) scrolly = 1;

                //console.log("scrolly:" + scrolly);
                //var xlength = obj.Data.length;
                //if (xlength - 1 < scrolly) {

                //} else {

                //}
                obj.Book.ActiveSheet.ScrollRender(undefined, scrolly);



                //if (xy == 2)
                //    obj.ScrollDown();
                //else if (xy == 1)
                //    obj.ScrollUp();
                //else if (xy == 3)
                //    obj.ScrollLeft();
                //else if (xy == 4)
                //    obj.ScrollRight();

            }
        });



        $("#" + containerID + "_P8Spread_ScrollH_handler").draggable({
            axis: "x", containment: "parent"
            , drag: function (e) {
                //counts[1]++;
                //updateCounterStatus($drag_counter, counts[1]);
                //var scrollCount = 10;
                //var colminus = 7;//aag scroll
                //var rowcount = obj.ColumnConfig.length - colminus;
                //if (rowcount <= 1) rowcount = 1;
                //var t = parseInt($("#" + containerID + "_P8Spread_ScrollH_handler").css("left")._sfReplaceAll("px", ""));
                //var h = $("#" + containerID + "_P8Spread_ScrollH_handler").outerWidth();
                //var ch = $("#" + containerID + "_P8Spread_ScrollH_handler").parent().width();
                //var ratio = parseFloat(h) / parseFloat(ch);
                //var totaly = (t + h);
                //var scrollx = rowcount * ((100 - (((ch - h) - (t)) / (ch - h) * 100)) / 100);
                //scrollx = Math.floor(scrollx) + 1;
                //if (scrollx >= rowcount) scrollx = rowcount;
                //if (scrollx <= 0) scrollx = 1;

                ////console.log(obj.ColumnConfig.length + " " + obj.startCol + " " + scrollx);

                //if ((obj.ColumnConfig.length - colminus) < obj.startCol) {
                //    return false;
                //}

                var maxcolumn = obj.ColumnConfig.length;
                if (maxcolumn <= 1) maxcolumn = 1;
                var scH = $('#' + containerID).find('.P8Spread_ScrollH');
                var width = $(scH).width();
                var barwidth = $(scH).find('.P8Spread_ScrollH_handler').width();
                var wdiff = parseInt($("#" + containerID + "_P8Spread_ScrollH_handler").css("left")._sfReplaceAll("px", ""));

                var scrollx = Math.ceil((wdiff * maxcolumn) / (width - barwidth));
                obj.Book.ActiveSheet.ScrollRender(scrollx, undefined);

            }
        });
        //}, 1);


        //column config
        // _sfLog("Column Config Start:");
        Spread_ColumnConfig = nwCreate2DArray(obj.ColumnConfig.length);
        Spread_Column_backgroundColor = [];
        for (var i = 0; i < obj.ColumnConfig.length; i++) {
            var conid = "backgroundColor";
            Spread_ColumnConfig[i][_sfGetFormatValueColumnChecker(conid)] = obj.ColumnConfig[i][conid];
            Spread_Column_backgroundColor.push(obj.ColumnConfig[i][conid]);
        }
        //_sfLog("Column Config End:");




        canvasS.addEventListener('touchstart', function (evt) { handleTouchStart(evt, obj); return false; }, false);
        canvasS.addEventListener('touchmove', function (evt) { handleTouchMove(evt, obj); return false; }, false);

        //console.log("wrap code");
        setTimeout(function () {
            if (obj.AutoWrap == true && obj.AutoWrapRender == false) _sfAutoWrap(obj);
        }, 10);

        //console.log("containerID:" + containerID);
        _sfScrollUpdateSizing(containerID);
    }



    //repos



    var conWidth = $('#' + containerID).width() - 10;
    //var conWidth = $('#' + containerID).width();
    var conheight = $('#' + containerID).height();

    var myCanvas = createHiDPICanvas(canvasID, conWidth, conheight, 3);

    var canvasSheet = document.getElementById(canvasID);
    var contextSheet = canvasSheet.getContext('2d');
    var contextSheetText = canvasSheet.getContext('2d');

    var canvasSheetCurrentSelected = document.getElementById(canvasID);
    var contextCurrentSelected = canvasSheetCurrentSelected.getContext('2d');
    var contexToolBar = canvasSheetCurrentSelected.getContext('2d');



    var canvasSheetNav = document.getElementById(containerID + "_SheetConCanvas");
    var contextSheetNav = canvasSheetNav.getContext('2d');




    var canvasSheetCon = document.getElementById(containerID);
    var elemLeft = P8Spread_elemLeft;
    var elemTop = P8Spread_elemTop;

    _sfLog("Offset:" + canvasSheet.offsetLeft + ":" + canvasSheet.offsetTop);

    var scolumn = 17;
    var srow = 26;
    var borderMargin = 1;
    var borderMarginScale = 1;
    var current_X = borderMargin;
    var current_Y = borderMargin;
    var current_Width = def_Width;
    var current_Height = def_Height;
    obj.currentCells = [];

    srow = data.length;
    try {
        scolumn = obj.ColumnConfig.length;
    } catch (err) { }
    var t_srow = srow;
    var t_scolumn = scolumn;

    //measure number of row and cols
    var conheightDraw = conheight - (def_Height * 3);
    obj.CellRowMax = 0;
    var rowStart = obj.startRow + obj.FreezeRow;
    var rowindexHe = 1;


    var tlLetterHeight = obj.HeadertColumnHeight;
    var tlGroupHeight = obj.HeadertGroupHeight;
    var sheetStart_y = tlLetterHeight;

    if (obj.HeaderGroup == undefined) obj.HeaderGroup = [];
    if (obj.HeaderGroup.length >= 1) {
        sheetStart_y += tlGroupHeight + borderMargin;

    }

    var sheetStart_y2 = 0;
    if (obj.HideHeader) {
        for (var i = 0; i < obj.HideHeaderIndex; i++) {
            sheetStart_y2 += obj.RowHeight(i) + borderMargin;
        }
        sheetStart_y -= sheetStart_y2;
        conheightDraw += sheetStart_y2
    }

    rowindexHe = 1;
    if (obj.FreezeRow >= rowindexHe)
        ;
    else
        rowindexHe = rowStart;

    // rowindexHe = 1;
    while (conheightDraw >= 0) {

        var heightrow = def_Height + 0;

        //if (obj.FreezeRow >= rowindexHe)
        //    ;
        //else
        //    rowindexHe = rowStart;

        try {
            // if (obj.AutoWrap)
            // heightrow = obj.Data[rowindexHe - 1].aagrowHeight || (def_Height + 0);
            heightrow = obj.Data[rowindexHe - 1].aagrowHeight == undefined ? (def_Height + 0) : obj.Data[rowindexHe - 1].aagrowHeight;
        } catch (err) { }

        rowindexHe += 1;
        conheightDraw -= heightrow + borderMargin;
        // if (conheightDraw >0)
        obj.CellRowMax += 1;
    }

    //if (obj.AutoWrap) obj.CellRowMax -= 1;

    var conWidthDraw = conWidth - (0);
    obj.CellColMax = 1;
    var icounter = obj.startCol - 1;
    icounter += obj.FreezeCol;

    var applyfreezeW = 0;
    //console.log("width SIze");
    while (conWidthDraw >= 0) {
        //console.log("Column:" + randomid);
        var widthcol = def_Width;
        try {
            widthcol = obj.ColumnConfig[icounter].width;
        } catch (err) { }

        if (applyfreezeW < obj.FreezeCol) {
            widthcol = obj.ColumnConfig[applyfreezeW].width;
            applyfreezeW++;
            if ((conWidthDraw - widthcol) <= 0) break;
            //console.log(_sfGetCellName(obj, applyfreezeW) + " " + (conWidthDraw - widthcol) + " " + applyfreezeW);
        }
        else {
            icounter++;
            if ((conWidthDraw - widthcol) <= 0) break;
            //console.log(_sfGetCellName(obj, icounter) + " " + (conWidthDraw - widthcol) + " " + icounter);
        }

        obj.CellColMax += 1;
        conWidthDraw -= widthcol;



        if (icounter >= 1000) break;


        // if (icounter >= 50) { console.log("aa"); break; }
    }


    //for (var i = obj.startRow-1; i < obj.Data.length; i++) {

    //}




    var maxLimitRowAdd = obj.CellRowMaxAdd;
    var maxLimitRow = obj.CellRowMax + maxLimitRowAdd;
    var maxLimitCol = obj.CellColMax;

    //current_Width = parseInt(obj.ColumnConfig[icx - 1].width);

    // compute limit col num

    //if (srow >= maxLimitRow) {
    //    srow = maxLimitRow;
    //}
    //if (scolumn >= maxLimitCol) {
    //    scolumn = maxLimitCol;
    //}

    srow = obj.startRow + maxLimitRow - 1;
    scolumn = obj.startCol + maxLimitCol - 1;



    if (t_srow <= srow) srow = t_srow;
    if (t_scolumn <= scolumn) scolumn = t_scolumn;


    // scolumn = 17;


    // whole spread default
    var tlNumberWidth = 23;

    var tlBgColor = "#c0c7d5";
    tlNumberWidth += ((srow - 2) + "").length * 6;

    var tlHBG = obj.HeaderBackround;
    var tlHFont = obj.HeaderFontFamily;
    var tlHFontSize = obj.HeaderFontSize;
    var tlHColor = obj.HeaderColor;


    var tlVBG = obj.VHeaderBackround;
    var tlVFont = obj.VHeaderFontFamily;
    var tlVFontSize = obj.VHeaderFontSize;
    var tlVColor = obj.VHeaderColor;

    var sheetStart_x = tlNumberWidth + borderMargin;






    var defaultpadding = 2;

    var scale = 1;

    var selectedValue = "rgba(255,255,255,0.0)";

    contextSheet.scale(scale, scale);
    contextSheet.clearRect(0, 0, canvasSheet.width, canvasSheet.height);

    contextSheet.fillStyle = obj.backgroundColor;//'#CECECE';
    contextSheet.fillRect(0, 0, canvasSheet.width, canvasSheet.height);



    var FreezeLineCol = 0;
    var FreezeLineRow = 0;

    var xFreezeRow = obj.FreezeRow + 1;
    var xFreezeCol = obj.FreezeCol + 1;

    if (obj.startRow <= 0) obj.startRow = 1;
    if (obj.startCol <= 0) obj.startCol = 1;

    // obj.FreezeCol
    var ix = -1;
    var ix2 = 1;
    var obj_startRow = obj.startRow;
    var icx = -1;
    var icx2 = 1;
    var obj_startCol = obj.startCol;






    var xcurrent_Width = tlNumberWidth - borderMargin;
    //for (var i = 0; i < obj.ColumnConfig.length; i++) {
    //    maxLimitCol = i + 1;
    //    xcurrent_Width += parseInt(obj.ColumnConfig[i].width);
    //    if (canvasSheet.width <= xcurrent_Width)
    //        break;
    //}
    srow = obj.startRow + maxLimitRow - 1;
    scolumn = obj.startCol + maxLimitCol - 1;


    if (srow >= data.length) srow = data.length;
    if (scolumn >= obj.ColumnConfig.length) scolumn = obj.ColumnConfig.length;


    if (srow - obj_startRow < xFreezeRow) {
        if (xFreezeRow <= 1) obj_startRow = srow - xFreezeRow + 1;
            //ifreeze pane
        else obj_startRow = srow - (xFreezeRow - 1);

    }
    if (scolumn - obj_startCol < xFreezeCol) {
        obj_startCol = scolumn - xFreezeCol + 1;
    }


    //for hide report
    // sheetStart_y -=120;

    //var mergeList = [];//{col2:-1,row2:-1}; //merge teporary list
    mergeList = obj.mergeList;


    //var mergeOnbox = [];

    //try {
    //    mergeOnbox = mergeList.filter(item => (item["row2"] >= (obj_startRow - 1) || item["row"] <= (obj_startRow - 1)) && (item["col2"] >= (obj_startCol - 1) || item["col"] <= (obj_startCol - 1)));
    //    console.log(mergeOnbox);
    //} catch (err) { }


    _sfLog("Tobe Redered c:" + (scolumn - obj.startCol) + " r:" + (srow - obj.startRow));


    var dashedarry = [3, 5];
    var dottedarry = [2, 2];
    var defaultarry = [];
    // Print Cell Records
    current_Y = borderMargin;    // srow = 0;
    current_X = borderMargin;



    //xFreezeRow = obj.FreezeRow + 1;
    ix = -1;
    ix2 = 1;
    // obj_startRow = obj.startRow;




    var firstFreezeCol = 0;
    firstFreezeCol = (xFreezeCol - 1) + (obj_startCol - 1);



    // list of MergeObject from previous
    var jsonFreezeBgList = [];
    var jsonFreezeTextList = [];
    var listOfMergeDraw = [];
    var listOfMergeDrawText = [];


    var curCol = 0; // current column
    var curRow = 0; // current row
    var curXorigin = undefined;
    var curYorigin = undefined;
    var curWidth = undefined;
    var curHeight = undefined;


    //remove extra line if freeze pane == data
    if (obj.Data.length == obj.FreezeRow)
        srow -= 1;


    //for data showing
    //srow += 3;

    if (P8Spread_currcavas != randomid) return false;

    //field render Background border
    for (var i = obj_startRow; i <= srow; i++) {
        //console.log("RowBackground:" + randomid);

        current_X = borderMargin;

        //must check per rowheight
        current_Height = def_Height;

        //xFreezeCol = obj.FreezeCol + 1;
        if (ix2 < xFreezeRow) {
            ix = ix2;

        }
        else {
            ix = i;
            //icx = icx - obj.FreezeCol;
        }
        ix2++;
        icx = -1;
        icx2 = 1;


        try { //get Row height if there is
            //current_Height = obj.Data[ix - 1].aagrowHeight || def_Height;
            current_Height = obj.Data[ix - 1].aagrowHeight == undefined ? def_Height : obj.Data[ix - 1].aagrowHeight;
            //console.log(ix + " " + current_Height);
        } catch (err) { }

        var isFreezeCol = false;



        for (var ic = obj_startCol; ic <= scolumn; ic++) {


            if (ic + 1 >= xFreezeCol && xFreezeCol > scolumn) continue;

            if (icx2 < xFreezeCol) {
                icx = icx2;
            }
            else {

                //draw other data after freeze
                icx = ic;
                //icx = icx - obj.FreezeCol;
            }
            icx2++;


            //altering variables start
            curCol = icx;
            curRow = ix;
            curXorigin = undefined;
            curYorigin = undefined;
            curWidth = undefined;
            curHeight = undefined;
            //altering variables

            try {
                current_Width = def_Width;
                current_Width = parseInt(obj.ColumnConfig[icx - 1].width);
            } catch (err) { }

            //merge block check if under merge
            var isaffected = false;
            for (var it = 0; it < mergeList.length; it++) {
                if ((mergeList[it].col2 >= icx - 1 && mergeList[it].col <= icx - 1)
                    && (mergeList[it].row2 >= ix - 1 && mergeList[it].row <= ix - 1)
                    && !(mergeList[it].col == icx - 1 && mergeList[it].row == ix - 1)
                ) {


                    var idlist = mergeList[it].row + "|" + mergeList[it].col + "|" + mergeList[it].row2 + "|" + mergeList[it].col2;
                    if (listOfMergeDraw.indexOf(idlist) < 0) {
                        listOfMergeDraw.push(idlist);
                        curCol = mergeList[it].col + 1; // alter the current to previous curcol;
                        curRow = mergeList[it].row + 1; // alter the current to previous curRow;

                        curXorigin = sheetStart_x + current_X;
                        curYorigin = sheetStart_y + current_Y;


                        curWidth = 0;
                        curHeight = 0;
                        var merge_ix = _sfGetFormatCell(obj, curCol - 1, curRow - 1, "merge");
                        if (merge_ix != undefined) {
                            var recol2 = merge_ix[0].col2;
                            var rerow2 = merge_ix[0].row2;
                            var xcurrent_Width = def_Width;
                            for (var icc = merge_ix[0].col; icc <= merge_ix[0].col2; icc++) {

                                try {
                                    xcurrent_Width = def_Width;
                                    xcurrent_Width = parseInt(obj.ColumnConfig[icc].width); // + 1
                                } catch (err) { }

                                //if (icc < xFreezeCol) { }
                                //else if (icc >= (xFreezeCol) && icc < firstFreezeCol) {
                                //    continue;
                                //}
                                //else if (icc > recol2)  //- (obj_startCol - 1)
                                //{
                                //    continue;
                                //}
                                if (xcurrent_Width <= 1) {
                                    //console.log("data " + xcurrent_Width);
                                    continue;
                                }
                                curWidth += xcurrent_Width + borderMargin;
                                if (icc < icx - 1) {
                                    curXorigin -= borderMargin + xcurrent_Width;
                                }
                            }

                            var totalheight = def_Height;
                            for (var icc = merge_ix[0].row; icc <= merge_ix[0].row2; icc++) {

                                try { //get Row height if there is
                                    //totalheight = obj.Data[icc].aagrowHeight || def_Height;
                                    totalheight = obj.Data[icc].aagrowHeight == undefined ? def_Height : obj.Data[icc].aagrowHeight;
                                } catch (err) { }

                                curHeight += borderMargin + totalheight;
                                if (icc < ix - 1) {
                                    curYorigin -= borderMargin + totalheight;
                                }
                            }
                            curHeight -= borderMargin;

                        }

                    }
                    else {
                        isaffected = true;
                    }


                    break;
                }
                else if (mergeList[it].row == ix - 1 && mergeList[it].col == icx - 1) {
                    var idlist = mergeList[it].row + "|" + mergeList[it].col + "|" + mergeList[it].row2 + "|" + mergeList[it].col2;
                    listOfMergeDraw.push(idlist);
                }
            }

            //skip for merge part of merge 
            if (isaffected) {


                // console.log("icx:" + icx + " ix:" + ix);
                if (current_Width > 0)
                    current_X += borderMargin + current_Width;
                continue;
            }


            if (current_Width <= 0) continue;



            //merge
            var plusWidth = 0;
            var plusHeight = 0;
            var merge_ix = _sfGetFormatCell(obj, curCol - 1, curRow - 1, "merge");
            if (merge_ix != undefined) {


                var recol2 = merge_ix[0].col2;
                var rerow2 = merge_ix[0].row2;


                var xcurrent_Width = current_Width;
                for (var icc = merge_ix[0].col + 1; icc <= recol2; icc++) {

                    try {
                        xcurrent_Width = def_Width;
                        xcurrent_Width = parseInt(obj.ColumnConfig[icc].width); // + 1
                    } catch (err) { }

                    if (icc < xFreezeCol - 1) { }
                    else if (icc >= (xFreezeCol - 1) && icc < firstFreezeCol) {
                        continue;
                    }
                    else if (icc > recol2)  //- (obj_startCol - 1)
                    {
                        continue;
                    }
                    if (xcurrent_Width <= 1) {
                        //console.log("data " + xcurrent_Width);
                        continue;
                    }



                    plusWidth += xcurrent_Width + borderMargin;

                }

                var totalheight = current_Height;
                plusHeight = 0;
                for (var icc = curRow; icc <= rerow2; icc++) {

                    try { //get Row height if there is
                        //totalheight = obj.Data[icc].aagrowHeight || def_Height;
                        totalheight = obj.Data[icc].aagrowHeight == undefined ? def_Height : obj.Data[icc].aagrowHeight;
                    } catch (err) { }

                    //must check the row height +1
                    plusHeight += borderMargin + totalheight;

                    // totalheight = current_Height;


                }

            }
            //merge end



            var myCell = {
                x: curXorigin || sheetStart_x + current_X,
                y: curYorigin || sheetStart_y + current_Y,
                width: curWidth || current_Width + plusWidth,
                height: curHeight || current_Height + plusHeight,
                borderWidth: borderMargin * borderMarginScale,

                fillStyle: "white",
                strokeStyle: 'black'
                , col: curCol
                , row: curRow
                , type: "cell"
                , borderMargin: borderMargin
                , selectedValue: selectedValue


                , borderColorTop: obj.gridlLineColor
                , borderColorBottom: obj.gridlLineColor
                , borderColorLeft: obj.gridlLineColor
                , borderColorRight: obj.gridlLineColor

                , borderStyleTop: "solid"
                , borderStyleBottom: "solid"
                , borderStyleLeft: "solid"
                , borderStyleRight: "solid"

                , borderWidthTop: "1"
                , borderWidthBottom: "1"
                , borderWidthLeft: "1"
                , borderWidthRight: "1"
            };


            var option = {
                font: " " + tlVFontSize + "px " + tlVFont, x: myCell.x + defaultpadding, y: myCell.y, paddingX: defaultpadding, paddingY: 2 * defaultpadding, width: myCell.width - (defaultpadding * 2), height: myCell.height - (defaultpadding * 2)
                , verticalAlign: "middle"
                , textAlign: "center"
            };
            option = _sfSetFormatText(obj, option, curCol - 1, curRow - 1);



            //aagneed

            //option.font = "bold 15px Verdana";

            var canvas = document.getElementById(canvasID);
            var stringText = "";
            myCell = _sfSetFormatBox(obj, myCell, curCol - 1, curRow - 1);
            myCell.fontsize = fontsize;

            if (curCol < xFreezeCol || curRow < xFreezeRow) {
                jsonFreezeBgList.push(myCell);
            } else {
                _sfCellDrawBox(obj, contextSheetText, contextSheet, myCell);
            }






            current_X += borderMargin + current_Width;
        }

        current_Y += borderMargin + current_Height;
    }




    // xFreezeRow = obj.FreezeRow + 1;
    //xFreezeCol = obj.FreezeCol + 1;
    icx = -1;
    icx2 = 1;
    ix2 = 1;
    listOfMergeDraw = [];

    //obj_startCol = obj.startCol;
    //obj_startRow = obj.startRow;
    current_Y = borderMargin;    // srow = 0;
    current_X = borderMargin;

    //border render 
    //text render
    for (var i = obj_startRow; i <= srow; i++) {
        // dito matagal
        //continue;
        //
        current_X = borderMargin;

        //must check per rowheight
        current_Height = def_Height;

        //xFreezeRow = obj.FreezeRow + 1;
        //xFreezeCol = obj.FreezeCol + 1;
        if (ix2 < xFreezeRow) {
            ix = ix2;

        }
        else {
            ix = i;
            //icx = icx - obj.FreezeCol;
        }
        ix2++;
        icx = -1;
        icx2 = 1;
        //obj_startCol = obj.startCol;

        try { //get Row height if there is
            //current_Height = obj.Data[ix - 1].aagrowHeight || def_Height;
            current_Height = obj.Data[ix - 1].aagrowHeight == undefined ? def_Height : obj.Data[ix - 1].aagrowHeight;
        } catch (err) { }



        for (var ic = obj_startCol; ic <= scolumn; ic++) {
            if (P8Spread_currcavas != randomid) return false;
            if (ic + 1 >= xFreezeCol && xFreezeCol > scolumn) continue;

            //if (xFreezeCol > ic)

            if (icx2 < xFreezeCol) {
                icx = icx2;
            }
            else {
                icx = ic;
                //icx = icx - obj.FreezeCol;
            }
            icx2++;



            try {
                current_Width = def_Width;
                current_Width = parseInt(obj.ColumnConfig[icx - 1].width);
            } catch (err) { }



            //altering variables start
            curCol = icx;
            curRow = ix;
            curXorigin = undefined;
            curYorigin = undefined;
            curWidth = undefined;
            curHeight = undefined;
            //altering variables


            //merge block
            var isaffected = false;
            var mergeConfig = [];
            for (var it = 0; it < mergeList.length; it++) {
                if ((mergeList[it].col2 >= icx - 1 && mergeList[it].col <= icx - 1)
                    && (mergeList[it].row2 >= ix - 1 && mergeList[it].row <= ix - 1)
                    && !(mergeList[it].col == icx - 1 && mergeList[it].row == ix - 1)
                ) {

                    var idlist = mergeList[it].row + "|" + mergeList[it].col + "|" + mergeList[it].row2 + "|" + mergeList[it].col2;
                    if (listOfMergeDraw.indexOf(idlist) < 0) {
                        listOfMergeDraw.push(idlist);
                        curCol = mergeList[it].col + 1; // alter the current to previous curcol;
                        curRow = mergeList[it].row + 1; // alter the current to previous curRow;
                        curXorigin = sheetStart_x + current_X;
                        curYorigin = sheetStart_y + current_Y;


                        curWidth = 0;
                        curHeight = 0;
                        var merge_ix = _sfGetFormatCell(obj, curCol - 1, curRow - 1, "merge");
                        if (merge_ix != undefined) {
                            var recol2 = merge_ix[0].col2;
                            var rerow2 = merge_ix[0].row2;
                            var xcurrent_Width = def_Width;
                            for (var icc = merge_ix[0].col; icc <= merge_ix[0].col2; icc++) {

                                try {
                                    xcurrent_Width = def_Width;
                                    xcurrent_Width = parseInt(obj.ColumnConfig[icc].width); // + 1
                                } catch (err) { }

                                //if (icc < xFreezeCol) { }
                                //else if (icc >= (xFreezeCol) && icc < firstFreezeCol) {
                                //    continue;
                                //}
                                //else if (icc > recol2)  //- (obj_startCol - 1)
                                //{
                                //    continue;
                                //}
                                if (xcurrent_Width <= 1) {
                                    //console.log("data " + xcurrent_Width);
                                    continue;
                                }
                                curWidth += xcurrent_Width + borderMargin;

                                if (icc < icx - 1) {
                                    curXorigin -= borderMargin + xcurrent_Width;
                                }
                            }

                            var totalheight = def_Height;
                            for (var icc = merge_ix[0].row; icc <= merge_ix[0].row2; icc++) {

                                try { //get Row height if there is
                                    //totalheight = obj.Data[icc].aagrowHeight || def_Height;
                                    totalheight = obj.Data[icc].aagrowHeight == undefined ? def_Height : obj.Data[icc].aagrowHeight;
                                } catch (err) { }

                                curHeight += borderMargin + totalheight;
                                if (icc < ix - 1) {
                                    curYorigin -= borderMargin + totalheight;
                                }
                            }
                            curHeight -= borderMargin;
                        }
                    }
                    else {
                        isaffected = true;
                    }


                    break;
                }
                else if (mergeList[it].row == ix - 1 && mergeList[it].col == icx - 1) {
                    var idlist = mergeList[it].row + "|" + mergeList[it].col + "|" + mergeList[it].row2 + "|" + mergeList[it].col2;
                    listOfMergeDraw.push(idlist);
                }
            }
            if (isaffected) {
                if (current_Width > 0)
                    current_X += borderMargin + current_Width;
                continue;
            }
            else {

            }
            //merge


            var plusWidth = 0;
            var plusHeight = 0;
            var merge_ix = _sfGetFormatCell(obj, curCol - 1, curRow - 1, "merge");
            if (merge_ix != undefined) {
                // merge_ix[0].col = ic-1;
                //merge_ix[0].row = i-1;
                //mergeList.push(merge_ix[0]);

                var recol2 = merge_ix[0].col2;
                var rerow2 = merge_ix[0].row2;


                var xcurrent_Width = current_Width;
                for (var icc = merge_ix[0].col + 1; icc <= recol2; icc++) {

                    try {
                        xcurrent_Width = def_Width;
                        xcurrent_Width = parseInt(obj.ColumnConfig[icc].width); // + 1
                    } catch (err) { }

                    if (icc < xFreezeCol - 1) { }
                    else if (icc >= (xFreezeCol - 1) && icc < firstFreezeCol)
                        continue;
                    else if (icc > recol2)  //- (obj_startCol - 1)
                        continue;
                    if (xcurrent_Width <= 0)
                        continue;



                    plusWidth += xcurrent_Width + borderMargin;
                }


                var totalheight = current_Height;
                for (var icc = curRow; icc <= rerow2; icc++) {
                    //totalheight = def_Height;
                    try { //get Row height if there is
                        //totalheight = obj.Data[icc].aagrowHeight || def_Height;
                        totalheight = obj.Data[icc].aagrowHeight == undefined ? def_Height : obj.Data[icc].aagrowHeight;
                    } catch (err) { }

                    //must check the row height +1
                    plusHeight += borderMargin + totalheight;
                }

            }
            //merge end


            if (current_Width <= 0) continue;


            // cell box Config
            var myCell = {
                x: curXorigin || sheetStart_x + current_X,
                y: curYorigin || sheetStart_y + current_Y,
                width: curWidth || current_Width + plusWidth,
                height: (curHeight || current_Height + plusHeight), //+ 3
                borderWidth: borderMargin * borderMarginScale,

                fillStyle: "white",
                strokeStyle: 'black'
                , col: curCol
                , row: curRow
                , type: "cell"
                , borderMargin: borderMargin
                , selectedValue: selectedValue


                , borderColorTop: "black"
                , borderColorBottom: "black"
                , borderColorLeft: "black"
                , borderColorRight: "black"

                , borderStyleTop: "solid"
                , borderStyleBottom: "solid"
                , borderStyleLeft: "solid"
                , borderStyleRight: "solid"

                , borderWidthTop: "1"
                , borderWidthBottom: "1"
                , borderWidthLeft: "1"
                , borderWidthRight: "1"

                , merge: []
            };

            myCell = _sfSetFormatBox(obj, myCell, curCol - 1, curRow - 1, curCol - 1, curRow - 1, "border");


            var option = {
                font: " " + tlVFontSize + "px " + tlVFont, x: myCell.x + defaultpadding, y: myCell.y, paddingX: defaultpadding, paddingY: 2 * defaultpadding, width: myCell.width - (defaultpadding * 2), height: myCell.height - (defaultpadding * 2)
                , verticalAlign: "middle"
                , textAlign: "center"
                , col: curCol - 1, row: curRow - 1
                , currencyCode: myCell.currencyCode
                , backgroundColor: ""
            };
            option = _sfSetFormatText(obj, option, curCol - 1, curRow - 1);

            option.dashedarry = dashedarry;
            option.dottedarry = dottedarry;
            option.curCol = curCol;
            option.curRow = curRow;
            option.curWidth = curCol;
            option.curHeight = curHeight;

            option.img_sizeWidth = img_sizeWidth;
            option.img_sizeHeight = img_sizeHeight;


            if (curCol < xFreezeCol || curRow < xFreezeRow) {
                jsonFreezeTextList.push({ border: myCell, text: option, col: curCol, row: curRow });
            } else {
                _sfCellDrawText(canvasID, obj, contextSheet, myCell, option, selectedValue, borderMargin, contextCurrentSelected);
            }



            // setTimeout(function () { }, 100);


            current_X += borderMargin + current_Width;
        }

        current_Y += borderMargin + current_Height;
    }

    //console.log(jsonFreezeBgList);
    //console.log(jsonFreezeTextList);
    var yTime = new Date().getTime();
    _sfLog("render done [" + P8DataList[obj.canvasID][0].sheet.ActiveSheet.SheetName + "]: ");
    _sfLog("Redered Freeze:" + (scolumn - obj.startCol) + " r:" + (srow - obj.startRow) + ((yTime - xTime) / 1000.0) + " seconds");

    //clear column part
    var HeadertotalHeight = sheetStart_y + borderMargin;
    for (var i = 0; i < xFreezeRow - 1; i++) {
        current_Height = def_Height;
        try {
            //current_Height = obj.Data[i].aagrowHeight || def_Height;
            current_Height = obj.Data[i].aagrowHeight == undefined ? def_Height : obj.Data[i].aagrowHeight;
        } catch (err) { }
        HeadertotalHeight += current_Height + borderMargin;
    }
    contextSheet.fillStyle = obj.backgroundColor;
    contextSheet.fillRect(0, 0, canvasSheet.width, HeadertotalHeight);




    if (P8Spread_currcavas != randomid) return false;

    // print Freeze Objects BG
    var tempColumn = [];
    for (var ifr = 0; ifr < jsonFreezeBgList.length; ifr++) {
        //console.log("FreezeLEFT:" + randomid);

        var myCell = jsonFreezeBgList[ifr];
        if (myCell.col <= xFreezeCol) {
            tempColumn.push(myCell);
        } else {
            _sfCellDrawBox(obj, contextSheetText, contextSheet, myCell);
        }
    }
    // print Text and Border
    var tempColumnBorder = [];
    for (var ifr = 0; ifr < jsonFreezeTextList.length; ifr++) {
        var data = jsonFreezeTextList[ifr];
        if (data.col < xFreezeCol) {
            tempColumnBorder.push(data);
        } else {
            var myCell = data.border;
            var option = data.text;
            _sfCellDrawText(canvasID, obj, contextSheet, myCell, option, selectedValue, borderMargin, contextCurrentSelected);
        }
    }

    //_sfRenderObjects(obj);

    var freezewidth = sheetStart_x;
    for (var i = 0; i < obj.FreezeCol; i++) {
        freezewidth += parseInt(obj.GetColumnWidth(i)) + borderMargin;
    }
    freezewidth += borderMargin;
    contextSheet.fillStyle = obj.backgroundColor;
    contextSheet.fillRect(0, 0, freezewidth, canvasSheet.height);


    if (P8Spread_currcavas != randomid) return false;
    // print Freeze Objects BG top freeze
    for (var ifr = 0; ifr < tempColumn.length; ifr++) {
        //console.log("FreezeTOp:" + randomid);
        var myCell = tempColumn[ifr];
        _sfCellDrawBox(obj, contextSheetText, contextSheet, myCell);
    }
    // print Text and Border top freeze
    for (var ifr = 0; ifr < tempColumnBorder.length; ifr++) {
        //console.log("FreezeText:" + randomid);

        var data = tempColumnBorder[ifr];
        var myCell = data.border;
        var option = data.text;
        _sfCellDrawText(canvasID, obj, contextSheet, myCell, option, selectedValue, borderMargin, contextCurrentSelected);
    }

    for (var ifr = 0; ifr < jsonFreezeTextList.length; ifr++) {
        //console.log("Freezeborder:" + randomid);
        var data = jsonFreezeTextList[ifr];
        if (data.col < xFreezeCol) {
            //tempColumnBorder.push(data);
        } else if (data.col == xFreezeCol) {
            var myCell = data.border;
            var option = data.text;
            _sfCellDrawText(canvasID, obj, contextSheet, myCell, option, selectedValue, borderMargin, contextCurrentSelected);
        }
        else if (data.col > xFreezeCol) {
            var myCell = data.border;
            var option = data.text;
            myCell.borderColorBottom = "transparent";
            myCell.borderColorRight = "transparent";
            myCell.borderColorLeft = "transparent";
            option.tagText = "0";


            //var option = data.text;
            _sfCellDrawText(canvasID, obj, contextSheet, myCell, option, selectedValue, borderMargin, contextCurrentSelected);
        }
    }


    //clear row part
    var HeadertotalWidth = sheetStart_x + borderMargin;
    for (var i = 0; i < xFreezeCol - 1; i++) {
        current_Width = def_Width;
        try {
            current_Width = parseInt(obj.ColumnConfig[i].width) || def_Width;
        } catch (err) { }
        HeadertotalWidth += current_Height + borderMargin;
    }
    //contextSheet.fillStyle = obj.backgroundColor;
    //contextSheet.fillRect(0, 0, HeadertotalWidth, canvasSheet.height);



    // clear extra lines
    contextSheet.beginPath();
    contextSheet.fillStyle = obj.backgroundColor;
    contextSheet.fillRect(0, 0, tlNumberWidth + 1, canvasSheet.height);
    contextSheet.closePath();







    ix2 = 1;
    icx2 = 1;
    // Print Row Number
    current_Y = borderMargin;
    //ix=0;
    for (var i = obj_startRow; i <= srow; i++) {

        //must check per rowheight
        current_Height = def_Height;

       
        if (ix2 < xFreezeRow) {
            ix = ix2;
            //FreezeLineRow = sheetStart_y + current_Y + borderMargin + current_Height;
        }
        else {
            ix = i;
        }
        try { 
            current_Height = obj.Data[ix-1].aagrowHeight == undefined ? def_Height : obj.Data[ix-1].aagrowHeight;
        } catch (err) { }
        


        if (ix2 < xFreezeRow) {
            FreezeLineRow = sheetStart_y + current_Y + borderMargin + current_Height;
        }


        ix2++;



        current_X = borderMargin;
        var myCell = {
            x: 0,
            y: sheetStart_y + current_Y,
            width: tlNumberWidth,
            height: current_Height,
            borderWidth: borderMargin * borderMarginScale,
            fillStyle: tlVBG,
            strokeStyle: 'black'
            , row: ix
            , type: "row"
        };
        contextSheet.fillStyle = myCell.fillStyle;
        contextSheet.lineWidth = myCell.borderWidth;
        contextSheet.strokeStyle = myCell.strokeStyle;
        contextSheet.fillRect(myCell.x, myCell.y, myCell.width, myCell.height);
        obj.currentCells.push(myCell);

        //contextSheetText.font = tlVFontSize + "px " + tlVFont;
        //contextSheetText.fillStyle = "black";
        //contextSheetText.fillText(i + "", myCell.x + defaultpadding, myCell.y + fontsize, myCell.width, myCell.height);

        var option = {
            font: "bold " + tlVFontSize + "px " + tlVFont, x: defaultpadding, y: myCell.y, paddingX: defaultpadding, paddingY: defaultpadding, width: myCell.width, height: myCell.height
            , verticalAlign: "middle"
            , textAlign: "center"
            , color: tlVColor
        };
        var canvas = document.getElementById(canvasID);
        CanvasTextWrapper(canvas, ix, option);





        current_Y += borderMargin + current_Height;


        //gridlLineColor
    }


    // Print Column Header
    current_Y = borderMargin;
    current_X = borderMargin;
    for (var ic = obj_startCol; ic <= scolumn; ic++) {

        if (ic + 1 >= xFreezeCol && xFreezeCol > scolumn) continue;

        if (icx2 < xFreezeCol) {
            icx = icx2;
            try {
                current_Width = def_Width;
                current_Width = parseInt(obj.ColumnConfig[icx - 1].width);
            } catch (err) { }
            FreezeLineCol = sheetStart_x + current_X + borderMargin + current_Width;
        }
        else {
            icx = ic;
            //icx = icx - obj.FreezeCol;
        }
        icx2++;

        try {
            current_Width = def_Width;
            current_Width = parseInt(obj.ColumnConfig[icx - 1].width);
        } catch (err) { }

        if (current_Width <= 0) continue;

        var myCell = {
            x: sheetStart_x + current_X,
            y: borderMargin,
            width: current_Width,
            height: tlGroupHeight - borderMargin,
            borderWidth: borderMargin * borderMarginScale,
            fillStyle: tlHBG,
            strokeStyle: 'black'
            , col: icx
            , colindex: ic - 1
            , type: "col"

        };


        var yAxisValue = 0;
        var tmp_current_Width = 0;
        var fnl_current_Width = 0;
        if (obj.HeaderGroup.length >= 1) {
            var isPart = false;
            var Title = "";
            var CellStart;
            var CellNumber;
            var colindex = ic - 1;
            for (var ih = 0; ih < obj.HeaderGroup.length; ih++) {
                CellStart = obj.HeaderGroup[ih].CellStart;
                CellNumber = obj.HeaderGroup[ih].CellNumber;
                Title = obj.HeaderGroup[ih].Title;
                if (CellStart == colindex) {

                    for (var ihx = CellStart; ihx <= CellStart + (CellNumber - 1); ihx++) {
                        try {
                            tmp_current_Width = def_Width;
                            tmp_current_Width = parseInt(obj.ColumnConfig[ihx].width);
                        } catch (err) { }
                        tmp_current_Width += borderMargin;
                        fnl_current_Width += tmp_current_Width;
                    }
                    fnl_current_Width -= borderMargin;
                    var myCellGroup = {
                        x: sheetStart_x + current_X,
                        y: borderMargin,
                        width: fnl_current_Width,
                        height: tlLetterHeight - borderMargin,
                        borderWidth: borderMargin * borderMarginScale,
                        fillStyle: tlHBG,
                        strokeStyle: 'black'
                        , col: icx
                        , type: "colg"
                    };
                    contextSheet.beginPath();
                    contextSheet.fillStyle = myCellGroup.fillStyle;
                    contextSheet.lineWidth = myCellGroup.borderWidth;
                    contextSheet.strokeStyle = myCellGroup.strokeStyle;
                    contextSheet.fillRect(myCellGroup.x, myCellGroup.y, myCellGroup.width, myCellGroup.height);
                    obj.currentCells.push(myCellGroup);
                    contextSheetText.font = fontsize + "px Arial";
                    contextSheetText.fillStyle = "black";
                    contextSheet.closePath();

                    var option = {
                        font: "bold " + tlHFontSize + "px " + tlHFont, x: myCellGroup.x, y: 0, paddingX: defaultpadding, paddingY: defaultpadding, width: myCellGroup.width, height: myCellGroup.height
                        , verticalAlign: "middle"
                        , textAlign: "center"
                        , color: tlHColor
                    };
                    var canvas = document.getElementById(canvasID);
                    CanvasTextWrapper(canvas, Title, option);

                }
                if (CellStart <= colindex && (CellStart + (CellNumber - 1) >= colindex)) {
                    isPart = true;
                    break;
                }
                CellStart = undefined;
                CellNumber = undefined;


            }

            //nwGridMainCon_Book.ActiveSheet.HeaderGroup[0].CellNumber
            //nwGridMainCon_Book.ActiveSheet.HeaderGroup[0].CellStart
            //nwGridMainCon_Book.ActiveSheet.HeaderGroup[0].Title

            if (isPart == false) {
                myCell.height = (tlLetterHeight - borderMargin) + (tlGroupHeight + borderMargin);
            }
            else {

                yAxisValue = (tlLetterHeight + borderMargin);
                myCell.y = myCell.y + yAxisValue;

            }
        }


        contextSheet.fillStyle = myCell.fillStyle;
        contextSheet.lineWidth = myCell.borderWidth;
        contextSheet.strokeStyle = myCell.strokeStyle;
        contextSheet.fillRect(myCell.x, myCell.y, myCell.width, myCell.height);
        obj.currentCells.push(myCell);
        contextSheetText.font = fontsize + "px Arial";
        contextSheetText.fillStyle = "black";

        // contextSheetText.fillText(ic, myCell.x + defaultpadding, myCell.y + fontsize, myCell.width, myCell.height);
        var option = {
            font: "bold " + tlHFontSize + "px " + tlHFont, x: myCell.x, y: 0 + yAxisValue, paddingX: defaultpadding, paddingY: defaultpadding, width: myCell.width, height: myCell.height
            , verticalAlign: "middle"
            , textAlign: "center"
            , color: tlHColor
        };
        var canvas = document.getElementById(canvasID);

        var extraText = ""; var option2 = {};
        if (obj.ColumnConfig[icx - 1].HeaderColumnReq == "nwFieldreq") {
            extraText = "*";
            option2.color = "red";
        }
        else if (obj.ColumnConfig[icx - 1].HeaderColumnReq == "nwFieldopt") {
            extraText = "*";
            option2.color = "blue";
        }
        else {
            ;
        }

        if (obj.ColumnConfig[icx - 1].ObjectType == "checkbox") {
            var CheckBoxShow = obj.ColumnConfig[icx - 1].CheckBoxShow == undefined ? true: obj.ColumnConfig[icx - 1].CheckBoxShow;

            if(CheckBoxShow){
                var chkheight = 18;
                var chkwidth = 18;
                var chky = option.height / 2 - (chkheight / 2)//option.height - chkheight - 2;
                var chkx = option.x + 5;
                var CheckBoxValue = obj.ColumnConfig[icx - 1].CheckBoxValue || false;
                _sfDrawCheckBox(contextSheet, chkx, chky, chkwidth, chkheight, CheckBoxValue);
                option.x = chkx + chkwidth
                option.width = option.width - chkwidth
            }
            CanvasTextWrapper(canvas, _sfGetCellNameEdit(obj, icx - 1), option, extraText, option2);
        } else {
            CanvasTextWrapper(canvas, _sfGetCellNameEdit(obj, icx - 1), option, extraText, option2);
        }

        current_X += borderMargin + current_Width;
    }
    if (1 == 1) {
        current_Y = borderMargin;
        var fontsize = 12;
        var myCell = {
            x: borderMargin,
            y: borderMargin,
            width: tlNumberWidth - borderMargin,
            height: tlLetterHeight - borderMargin,
            borderWidth: borderMargin * borderMarginScale,
            fillStyle: tlHBG,
            strokeStyle: 'black'
            , row: 0
            , col: 0
            , type: "tot"
        };
        if (obj.HeaderGroup.length >= 1) {
            myCell.height = (tlLetterHeight - borderMargin) + (tlGroupHeight + borderMargin)
        }
        contextSheet.fillStyle = myCell.fillStyle;
        contextSheet.lineWidth = myCell.borderWidth;
        contextSheet.strokeStyle = myCell.strokeStyle;
        contextSheet.fillRect(myCell.x, myCell.y, myCell.width, myCell.height);
        obj.currentCells.push(myCell);
        contextSheetText.font = fontsize + "px Arial";
        contextSheetText.fillStyle = "black";
        contextSheetText.fillText("", myCell.x + defaultpadding, myCell.y + fontsize, myCell.width, myCell.height);


        if (obj.HeaderNumText != "") {
            var option = {
                font: "bold " + tlHFontSize + "px " + tlHFont, x: myCell.x + defaultpadding, y: 0 + yAxisValue, paddingX: defaultpadding, paddingY: defaultpadding, width: myCell.width, height: myCell.height
                , verticalAlign: "middle"
                , textAlign: "center"
                , color: tlHColor
            };
            CanvasTextWrapper(canvas, obj.HeaderNumText, option);
        }

    }


    if (FreezeLineRow >= 1) {
        contextSheet.beginPath();
        contextSheet.lineWidth = obj.FreezeWidth;
        contextSheet.strokeStyle = obj.FreezeColor;
        contextSheet.setLineDash([]);
        contextSheet.moveTo(0, FreezeLineRow);
        contextSheet.lineTo(canvasSheet.width, FreezeLineRow);
        contextSheet.stroke();
        contextSheet.closePath();
    }
    if (FreezeLineCol >= 1) {
        contextSheet.beginPath();
        contextSheet.lineWidth = obj.FreezeWidth;
        contextSheet.strokeStyle = obj.FreezeColor;
        contextSheet.setLineDash([]);
        contextSheet.moveTo(FreezeLineCol, 0);
        contextSheet.lineTo(FreezeLineCol, canvasSheet.height);
        contextSheet.stroke();
        contextSheet.closePath();
    }

    // draw row lines
    if (1 == 2) {
        current_Y = sheetStart_y;
        for (var i = obj_startRow; i <= srow; i++) {
            current_Height = def_Height;
            try {
                //current_Height = obj.Data[i - 1].aagrowHeight || def_Height;
                current_Height = obj.Data[i - 1].aagrowHeight == undefined ? def_Height : obj.Data[i - 1].aagrowHeight;
            } catch (err) { }
            contextSheet.beginPath();
            contextSheet.strokeStyle = obj.gridlLineColor;
            contextSheet.lineWidth = borderMargin / 2;
            contextSheet.moveTo(0, current_Y);
            contextSheet.lineTo(canvasSheet.width, current_Y);
            contextSheet.stroke();
            contextSheet.closePath();
            current_Y += borderMargin + current_Height;
        }

        current_X = sheetStart_x + borderMargin;
        for (var ic = obj_startCol; ic <= scolumn; ic++) {

            current_Width = def_Width;
            try {
                current_Width = obj.ColumnConfig[ic - 1].width || def_Width;
            } catch (err) { }


            contextSheet.beginPath();
            contextSheet.strokeStyle = obj.gridlLineColor;
            contextSheet.lineWidth = borderMargin / 2;
            contextSheet.moveTo(current_X, 0);
            contextSheet.lineTo(current_X, canvasSheet.height);
            contextSheet.stroke();
            contextSheet.closePath();
            current_X += borderMargin + current_Width;

        }
    }

    if (P8Spread_currcavas != randomid) return false;
    console.log("col:" + scolumn + " row:" + srow);



    if (obj.havelistner == false) {
        console.log("ENDListner:" + randomid);
        _sfLog("add event:");

        obj.Events.push({ events: 1 });
        try {

        } catch (err) {
            _sfLog(err);
        }


        canvasSheet.addEventListener('mouseup', function (event) {

            obj.CellSelHover = false;
            if (obj.IsResizeHover == true && obj.IsResizeClick == true && obj.RowResizable == true && obj.IsResizeRow == true) {
                var diff = obj.IsResizeRowHeight;


                if (obj.IsResizeHoverSValue > obj.IsResizeHoverValue)
                    diff = obj.IsResizeHoverValue - obj.IsResizeHoverSValue;
                else
                    diff = obj.IsResizeHoverValue - obj.IsResizeHoverSValue;

                obj.IsResizeHover = true; obj.IsResizeClick = false; obj.IsResizeRow == false;
                var heightnew = obj.IsResizeRowHeight + diff;
                if (heightnew <= 10) heightnew = 10;
                obj.RowHeight(obj.IsResizeRowIndex, heightnew);


                $("#" + obj.canvasID).attr("isresize", 1);


                return;
            }
            else if (obj.IsResizeHover == true && obj.IsResizeClick == true && obj.ColumnResizable == true) {
                var diff = obj.IsResizeColumnWidth;


                if (obj.IsResizeHoverSValue > obj.IsResizeHoverValue)
                    diff = obj.IsResizeHoverValue - obj.IsResizeHoverSValue;
                else
                    diff = obj.IsResizeHoverValue - obj.IsResizeHoverSValue;

                obj.IsResizeHover = true; obj.IsResizeClick = false;
                var widthnew = obj.IsResizeColumnWidth + diff;
                if (widthnew <= 10) widthnew = 10;
                obj.ColumnWidth(obj.IsResizeColumnIndex, widthnew);


                $("#" + obj.canvasID).attr("isresize", 1);


                return;
            }
            //if (obj.IsResizeHover == true && obj.IsResizeClick == true && obj.ColumnResizable == true) {
            //    var diff = obj.IsResizeColumnWidth;


            //    if (obj.IsResizeHoverSValue > obj.IsResizeHoverValue)
            //        diff = obj.IsResizeHoverValue - obj.IsResizeHoverSValue;
            //    else
            //        diff = obj.IsResizeHoverValue - obj.IsResizeHoverSValue;

            //    obj.IsResizeHover = true; obj.IsResizeClick = false;
            //    var widthnew = obj.IsResizeColumnWidth + diff;
            //    if (widthnew <= 10) widthnew = 10;
            //    obj.ColumnWidth(obj.IsResizeColumnIndex, widthnew);


            //    $("#" + obj.canvasID).attr("isresize", 1);


            //    return;
            //}
        });

        function getCursorPosition(canvas, event) {
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            P8Spread_elemLeft = x;
            P8Spread_elemTop = y;
        }

        // cell double click
        canvasSheet.addEventListener('dblclick', SpreadDBClick, false);
        function SpreadDBClick(event, iscustom) {
            P8CurrentIDSel = obj.canvasID;
            p8Spread_CurBook = obj.canvasID;
            try {
                if (obj.CellElement.type != "cell") {
                    return;
                }
            } catch (err) { }

            var isvalid = _sfSelectionActivate(obj);

            if (iscustom == undefined) iscustom = true;
            if (iscustom == true) {
                try {
                    var xdata = p8Spread_DblClickT(obj.canvasID, obj.CellSelected.row - 1, obj.CellSelected.col - 1);
                    if (xdata == false) isvalid = false;
                } catch (err) { }
            }

            var xclass = obj.ColumnConfig[obj.CellSelected.col - 1].Class;
            var classBased = _sfCheckIfClassExist(xclass, "aagnwlookupgrid");
            if (isvalid) {
                if (classBased) {
                    try {
                        var Attribute = obj.ColumnConfig[obj.CellSelected.col - 1].Attribute;
                        var selectedInput = "";
                        if (Attribute != undefined) {
                            selectedInput = Attribute.split("@#aag#@")[1];
                        }
                        if (selectedInput != undefined) {
                            p8Spread_CurBook = obj.canvasID;
                            if (_sfCheckIfClassExist(xclass, "aagAddTolist")) {
                                lookUpCustomize(selectedInput, 2, undefined, true);
                            }
                            else {
                                lookUpCustomize(selectedInput, 1, undefined, true);
                            }
                        }

                    } catch (err) { }
                }
                else {
                    _sfSpreadInputShow(obj);
                }
            }
        }


        //if (isObjectCreated == false)
        // cell click
        // Spread Click
        canvasSheet.addEventListener('mouseup', SpreadMouseUp, false);
        function SpreadMouseUp(event) {
            obj.ScrollActive = false;
            var isValid = true;
            try {
                isValid = p8Spread_MouseUp_Menuitem(obj.canvasID, obj.CellIndexes.Row, obj.CellIndexes.Col);
            } catch (err) {
                try {
                    isValid = p8Spread_MouseUp(obj.canvasID, obj.CellIndexes.Row, obj.CellIndexes.Col);
                } catch (err) { }
            }
        }

        canvasSheet.addEventListener('mousedown', SpreadMouseDown, false);

        function SpreadMouseDown(event) {
            // Check if it's a right-click
            if ('which' in event) {
                // For browsers that support the 'which' property (e.g., Firefox)
                if (event.which === 3) {
                    // Right-click detected
                    return false;
                }
            } else if ('button' in event) {
                // For browsers that support the 'button' property (e.g., Chrome, Safari, IE)
                if (event.button === 2) {
                    // Right-click detected
                    return false;
                }
            }

            P8CurrentIDSel = obj.canvasID;

            obj.ScrollActive = false;


            var oldRow = obj.CellSelected.row - 1;
            var oldCol = obj.CellSelected.col - 1;


            if (is_vw_inpDateHover == true) {
                return true;
            }



            if (obj.IsResizeHover == true) {
                obj.IsResizeClick = true;
                return;
            }

            // event
            var x = 0, y = 0;
            try {
                //x = event.pageX - elemLeft,
                //y = event.pageY - elemTop;
                getCursorPosition(document.getElementById(obj.canvasID + "_vw"), event);
                x = P8Spread_elemLeft;
                y = P8Spread_elemTop;
            } catch (err) { }

            //obj.currentCells.
            var objx = P8DataList[obj.canvasID][0].sheet.ActiveSheet.currentCells;
            objx.forEach(function (element) {
                if (y > element.y && y < element.y + element.height && x > element.x && x < element.x + element.width) {

                    if (element.type == "col") element.fillStyle = "transaparent";
                    if (element.type == "col") {

                        obj.CellIndexes.Col = element.col - 1;
                        obj.CellIndexes.Row = 0;
                        obj.CellIndexes.Col2 = element.col - 1;
                        obj.CellIndexes.Row2 = P8DataList[obj.canvasID][0].sheet.ActiveSheet.Data.length - 1;
                        //obj.CellElement = element;

                        _sfSelectCell(obj, element, canvasIDOrig, canvasID, contextCurrentSelected);
                  
                        //drawRectangleSelected(obj, element, contextCurrentSelected);

                        try {
                            if ((obj.ColumnConfig[obj.CellIndexes.Col].ObjectType == "checkbox"
                                || obj.ColumnConfig[obj.CellIndexes.Col].ObjectType == "checkboxtext"
                            ) && obj.ColumnConfig[obj.CellIndexes.Col].Enabled == true) {
                                var CheckBoxShow = obj.ColumnConfig[obj.CellIndexes.Col].CheckBoxShow == undefined ? true: obj.ColumnConfig[obj.CellIndexes.Col].CheckBoxShow
                                if(CheckBoxShow == true){
                                    var isValid = true;
                                    try {
                                        var value = obj.ColumnConfig[obj.CellIndexes.Col].CheckBoxValue || false;
                                        if (_sfGetCheckboxValue(value)) {
                                            obj.ColumnConfig[obj.CellIndexes.Col].CheckBoxValue = false;
                                        }
                                        else {
                                            obj.ColumnConfig[obj.CellIndexes.Col].CheckBoxValue = true;
                                        }
                                        try {
                                            isValid = p8Spread_Header_Click_Menuitem(obj.canvasID, obj.CellIndexes.Col);
                                        } catch (err) {
                                            try {
                                                isValid = p8Spread_Header_Click(obj.canvasID, obj.CellIndexes.Col);
                                            } catch (err) { }
                                        }
                                    } catch (err) { }
                                    if (isValid) {
                                        //if (obj.ColumnConfig[obj.CellSelected.col - 1].ObjectType == "checkbox") {
                                        //var value = obj.ColumnConfig[obj.CellIndexes.Col].CheckBoxValue || false;
                                        //if (_sfGetCheckboxValue(value)) {
                                        //    obj.ColumnConfig[obj.CellIndexes.Col].CheckBoxValue = false;
                                        //}
                                        //else {
                                        //    obj.ColumnConfig[obj.CellIndexes.Col].CheckBoxValue = true;
                                        //}
                                        var CheckBoxValueRow = (obj.ColumnConfig[obj.CellIndexes.Col].CheckBoxValue) ? "1" : "0";
                                        for (row = 0; row < obj.Data.length; row++) {
                                            obj.Data[row][p8_NumberToCell(obj.CellIndexes.Col + 1)].value = CheckBoxValueRow;
                                        }
                                    } else {
                                        if (_sfGetCheckboxValue(value)) {
                                            obj.ColumnConfig[obj.CellIndexes.Col].CheckBoxValue = true;
                                        }
                                        else {
                                            obj.ColumnConfig[obj.CellIndexes.Col].CheckBoxValue = false;
                                        }
                                    }
                                }
                            }
                        } catch (err) { }
                       

                        return;
                    }
                    else if (element.type == "row") {

                        obj.CellIndexes.Col = 0;
                        obj.CellIndexes.Row = element.row - 1;
                        obj.CellIndexes.Col2 = P8DataList[obj.canvasID][0].sheet.ActiveSheet.ColumnConfig.length - 1;
                        obj.CellIndexes.Row2 = element.row - 1;
                        //obj.CellElement = element;

                        _sfSelectCell(obj, element, canvasIDOrig, canvasID, contextCurrentSelected);

                        
                        //    drawRectangleSelected(obj, element, contextCurrentSelected);

                        return;
                    }


                    obj.CellSelHover = true;
                    obj.CellSelValue = { col: element.col - 1, row: element.row - 1 };

                    obj.CellElement = element;

                    _sfSelectCell(obj, element, canvasIDOrig, canvasID, contextCurrentSelected);


                    var addTop = element.y;
                    var addLeft = element.x;
                    _sfSelectorAdjust(obj.canvasID, addTop, addLeft, element);






                    if ($("#" + obj.canvasID + "_vw_inp").val() != "" && $("#" + obj.canvasID + "_vw_selectorCon").css("opacity") == "1") {

                        var xvalue = $("#" + obj.canvasID + "_vw_inp").val();
                        if (xvalue == '__/__/____') {
                            xvalue = "";
                        }


                        var oldvalue = obj.GetText(parseInt($("#" + obj.canvasID + "_vw_inp").attr("acol")), parseInt($("#" + obj.canvasID + "_vw_inp").attr("arow")));

                        // obj.SetText(parseInt($("#" + obj.canvasID + "_vw_inp").attr("acol")), parseInt($("#" + obj.canvasID + "_vw_inp").attr("arow")), xvalue);
                        $("#" + obj.canvasID + "_vw_inp").attr("acol2", "" + $("#" + obj.canvasID + "_vw_inp").attr("acol"));
                        $("#" + obj.canvasID + "_vw_inp").attr("arow2", "" + $("#" + obj.canvasID + "_vw_inp").attr("arow"));
                        try {
                            if (xvalue != oldvalue) {
                                if (!isNaN(oldRow) && oldRow != undefined && !isNaN(oldCol) && oldRow != undefined) {
                                    obj.SetText(parseInt($("#" + obj.canvasID + "_vw_inp").attr("acol")), parseInt($("#" + obj.canvasID + "_vw_inp").attr("arow")), xvalue, "text", true);
                                    // p8Spread_Change(obj.canvasID, oldRow, oldCol);
                                }
                            }
                            $("#" + obj.canvasID + "_vw_inp").attr("oldvalue", xvalue);
                        } catch (err) { }
                        //aag tobe continue
                    }

                    try {
                        //$("#" + obj.canvasID + "_vw_inp").blur();
                        $("#" + obj.canvasID + "_vw_inp").val("");
                        //setTimeout(function () {
                        if (_sfDetectMobile()) {

                        } else {
                            $("#" + obj.canvasID + "_vw_inp").focus();
                        }
                        // }, 151);

                    } catch (err) { }



                    //$("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "0");
                    //$("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "hidden");
                    _sfSpreadInputHide(obj);

                    //try {
                    //    $("#" + obj.canvasID + "_vw_selector").val("");
                    //    //setTimeout(function () {
                    //    $("#" + obj.canvasID + "_vw_selector").focus();
                    //    // }, 151);
                    //} catch (err) { }

                    //
                    //AAGSAMPLE

                    try {
                        if ((obj.GetObjectType(obj.CellSelected.col - 1, obj.CellSelected.row - 1) == "checkbox"
                            || obj.GetObjectType(obj.CellSelected.col - 1, obj.CellSelected.row - 1) == "checkboxtext"
                        ) && obj.GetEnabled(obj.CellSelected.col - 1, obj.CellSelected.row - 1) == true) {
                            
                            //if (obj.ColumnConfig[obj.CellSelected.col - 1].ObjectType == "checkbox") {
                            var value = obj.GetValue(obj.CellSelected.col - 1, obj.CellSelected.row - 1);
                            if (_sfGetCheckboxValue(value)) {
                                obj.SetText(obj.CellSelected.col - 1, obj.CellSelected.row - 1, "0");
                                obj.ColumnConfig[obj.CellSelected.col - 1].CheckBoxValue = false;
                            }
                            else {
                                obj.SetText(obj.CellSelected.col - 1, obj.CellSelected.row - 1, "1");

                                var CheckBoxShow = obj.ColumnConfig[obj.CellSelected.col - 1].CheckBoxShow == undefined ? true: obj.ColumnConfig[obj.CellSelected.col - 1].CheckBoxShow
                                if(CheckBoxShow == true){
                                    var CheckAll = false;
                                    for (row = 0; row < obj.Data.length; row++) {
                                        var CheckAllRow = obj.Data[row][p8_NumberToCell((obj.CellSelected.col - 1) + 1)].value;
                                        if (_sfGetCheckboxValue(CheckAllRow)) {
                                            CheckAll = true;
                                        } else {
                                            CheckAll = false;
                                            break;
                                        }
                                    }
                                    if (CheckAll) {
                                        obj.ColumnConfig[obj.CellSelected.col - 1].CheckBoxValue = true;
                                    }
                                }
                            }
                            
                        }
                    } catch (err) { }

                    _sfSelectionActivate(obj);

                    try {
                        obj.IsResizeHover = false;
                        //obj.CellSelHover = false;


                        p8Spread_ClickT(obj.canvasID, obj.CellSelected.row - 1, obj.CellSelected.col - 1);
                        p8Spread_FocusT(obj.canvasID, obj.CellSelected.row - 1, obj.CellSelected.col - 1);
                    } catch (err) { }

                    return true;
                }
            });


            _sfSpreadInputHide(obj);
            //$("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "0");
            //$("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "hidden");

        }

        //canvasSheet.addEventListener('click', SpreadClick, false);

        //function SpreadMouseDown(event) {
        //    obj.ScrollActive = false;
        //    obj.CellClickTime = new Date();
        //    //obj.CellSelHover = false;
        //    obj.CellSelHover = true;
        //}
        //function SpreadClick(event) {
        //    P8CurrentIDSel = obj.canvasID;

        //    try{
        //        const diffTime = Math.abs(new Date() - obj.CellClickTime);
        //        if (diffTime >= 200)
        //            return false;
        //    }catch(err){}

        //function SpreadMouseDown(event) {
        //    P8CurrentIDSel = obj.canvasID;

        //    obj.ScrollActive = false;


        //    var oldRow = obj.CellSelected.row - 1;
        //    var oldCol = obj.CellSelected.col - 1;


        //    if (is_vw_inpDateHover == true) {
        //        return true;
        //    }



        //    if (obj.IsResizeHover == true) {
        //        obj.IsResizeClick = true;
        //        return;
        //    }

        //    // event
        //    var x = 0, y = 0;
        //    try {
        //        //x = event.pageX - elemLeft,
        //        //y = event.pageY - elemTop;
        //        getCursorPosition(document.getElementById(obj.canvasID + "_vw"), event);
        //        x = P8Spread_elemLeft;
        //        y = P8Spread_elemTop;
        //    } catch (err) { }

        //    //obj.currentCells.
        //    var objx = P8DataList[obj.canvasID][0].sheet.ActiveSheet.currentCells;
        //    objx.forEach(function (element) {
        //        if (y > element.y && y < element.y + element.height && x > element.x && x < element.x + element.width) {

        //            if (element.type == "col") element.fillStyle = "transaparent";
        //            if (element.type == "col") {

        //                obj.CellIndexes.Col = element.col - 1;
        //                obj.CellIndexes.Row = 0;
        //                obj.CellIndexes.Col2 = element.col - 1;
        //                obj.CellIndexes.Row2 = P8DataList[obj.canvasID][0].sheet.ActiveSheet.Data.length;
        //                //obj.CellElement = element;

        //                _sfSelectCell(obj, element, canvasIDOrig, canvasID, contextCurrentSelected);
        //                drawRectangleSelected(obj, element, contextCurrentSelected);
        //                return;
        //            }
        //            else if (element.type == "row") {

        //                obj.CellIndexes.Col = 0;
        //                obj.CellIndexes.Row = element.row - 1;
        //                obj.CellIndexes.Col2 = P8DataList[obj.canvasID][0].sheet.ActiveSheet.ColumnConfig.length;
        //                obj.CellIndexes.Row2 = element.row - 1;
        //                //obj.CellElement = element;

        //                _sfSelectCell(obj, element, canvasIDOrig, canvasID, contextCurrentSelected);
        //                drawRectangleSelected(obj, element, contextCurrentSelected);
        //                return;
        //            }


        //            obj.CellSelHover = true;
        //            obj.CellSelValue = { col: element.col - 1, row: element.row - 1 };

        //            obj.CellElement = element;

        //            _sfSelectCell(obj, element, canvasIDOrig, canvasID, contextCurrentSelected);


        //            var addTop = element.y;
        //            var addLeft = element.x;
        //            _sfSelectorAdjust(obj.canvasID, addTop, addLeft, element);






        //            if ($("#" + obj.canvasID + "_vw_inp").val() != "" && $("#" + obj.canvasID + "_vw_selectorCon").css("opacity") == "1") {

        //                var xvalue = $("#" + obj.canvasID + "_vw_inp").val();
        //                if (xvalue == '__/__/____') {
        //                    xvalue = "";
        //                }


        //                var oldvalue = obj.GetText(parseInt($("#" + obj.canvasID + "_vw_inp").attr("acol")), parseInt($("#" + obj.canvasID + "_vw_inp").attr("arow")));

        //                // obj.SetText(parseInt($("#" + obj.canvasID + "_vw_inp").attr("acol")), parseInt($("#" + obj.canvasID + "_vw_inp").attr("arow")), xvalue);
        //                $("#" + obj.canvasID + "_vw_inp").attr("acol2", "" + $("#" + obj.canvasID + "_vw_inp").attr("acol"));
        //                $("#" + obj.canvasID + "_vw_inp").attr("arow2", "" + $("#" + obj.canvasID + "_vw_inp").attr("arow"));
        //                try {
        //                    if (xvalue != oldvalue) {
        //                        if (!isNaN(oldRow) && oldRow != undefined && !isNaN(oldCol) && oldRow != undefined) {
        //                            obj.SetText(parseInt($("#" + obj.canvasID + "_vw_inp").attr("acol")), parseInt($("#" + obj.canvasID + "_vw_inp").attr("arow")), xvalue, "text", true);
        //                            // p8Spread_Change(obj.canvasID, oldRow, oldCol);
        //                        }
        //                    }
        //                    $("#" + obj.canvasID + "_vw_inp").attr("oldvalue", xvalue);
        //                } catch (err) { }
        //                //aag tobe continue
        //            }

        //            try {
        //                //$("#" + obj.canvasID + "_vw_inp").blur();
        //                $("#" + obj.canvasID + "_vw_inp").val("");
        //                //setTimeout(function () {
        //                if (_sfDetectMobile()) {

        //                } else {
        //                    $("#" + obj.canvasID + "_vw_inp").focus();
        //                }
        //                // }, 151);

        //            } catch (err) { }



        //            //$("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "0");
        //            //$("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "hidden");
        //            _sfSpreadInputHide(obj);

        //            //try {
        //            //    $("#" + obj.canvasID + "_vw_selector").val("");
        //            //    //setTimeout(function () {
        //            //    $("#" + obj.canvasID + "_vw_selector").focus();
        //            //    // }, 151);
        //            //} catch (err) { }

        //            //
        //            //AAGSAMPLE

        //            try {
        //                if ((obj.GetObjectType(obj.CellSelected.col - 1, obj.CellSelected.row - 1) == "checkbox"
        //                    || obj.GetObjectType(obj.CellSelected.col - 1, obj.CellSelected.row - 1) == "checkboxtext"
        //                ) && obj.GetEnabled(obj.CellSelected.col - 1, obj.CellSelected.row - 1) == true) {

        //                    //if (obj.ColumnConfig[obj.CellSelected.col - 1].ObjectType == "checkbox") {
        //                    var value = obj.GetValue(obj.CellSelected.col - 1, obj.CellSelected.row - 1);
        //                    if (_sfGetCheckboxValue(value)) {
        //                        obj.SetText(obj.CellSelected.col - 1, obj.CellSelected.row - 1, "0");
        //                    }
        //                    else {
        //                        obj.SetText(obj.CellSelected.col - 1, obj.CellSelected.row - 1, "1");
        //                    }
        //                }
        //            } catch (err) { }

        //            _sfSelectionActivate(obj);

        //            try {
        //                obj.IsResizeHover = false;
        //                //obj.CellSelHover = false;


        //                p8Spread_ClickT(obj.canvasID, obj.CellSelected.row - 1, obj.CellSelected.col - 1);
        //                p8Spread_FocusT(obj.canvasID, obj.CellSelected.row - 1, obj.CellSelected.col - 1);
        //            } catch (err) { }

        //            return true;
        //        }
        //    });


        //    _sfSpreadInputHide(obj);
        //    //$("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "0");
        //    //$("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "hidden");

        //}
        if (obj.canvasID != "") {
            $(document).on("keypress", "#" + obj.canvasID + "_vw_selectorCon ", function (e) {
                if (e.which == 13) {
                    _sfSpreadInputHide(obj);
                }
            });
            //$(document).on("change", "#" + obj.canvasID + "_vw_selectorCon ", function () {

            //    var isvalid = false;
            //    //if ($(this).hasClass("nwDatePickP8")) {

            //    //    isvalid = true;
            //    //}

            //    if (obj.canvasID == "" && isvalid == false)
            //        return true;

            //    //return true;



            //    if ($("#" + obj.canvasID + "_vw_inp").attr("acol2") != $("#" + obj.canvasID + "_vw_inp").attr("acol")
            //        && $("#" + obj.canvasID + "_vw_inp").attr("arow2") != $("#" + obj.canvasID + "_vw_inp").attr("arow")
            //    ) {

            //        var xvalue = $("#" + obj.canvasID + "_vw_inp").val();
            //        var oldvalue = obj.GetText(parseInt($("#" + obj.canvasID + "_vw_inp").attr("acol")), parseInt($("#" + obj.canvasID + "_vw_inp").attr("arow")));
            //        var oldRow = parseInt($("#" + obj.canvasID + "_vw_inp").attr("arow"));
            //        var oldCol = parseInt($("#" + obj.canvasID + "_vw_inp").attr("acol"));


            //        if (P8SpreadLastCellChange.row == oldRow && P8SpreadLastCellChange.row == oldCol) {
            //            return; // make return to remove duplicate change
            //        }



            //        try {
            //            if (xvalue != oldvalue) {
            //                if (!isNaN(oldRow) && oldRow != undefined && !isNaN(oldCol) && oldRow != undefined) {
            //                    //p8Spread_Change(obj.canvasID, oldRow, oldCol);
            //                    obj.SetText(oldCol, oldRow, xvalue, "text", true);
            //                }


            //            }

            //        } catch (err) { }

            //        $("#" + obj.canvasID + "_vw_inp").attr("acol2", "");
            //        $("#" + obj.canvasID + "_vw_inp").attr("arow2", "");
            //        $("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "0");
            //        $("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "hidden");
            //        $("#" + obj.canvasID + "_vw_selectorCon .P8Spread_Input.hasDatepicker").hide();
            //    } else {
            //        $("#" + obj.canvasID + "_vw_inp").attr("acol2", "");
            //        $("#" + obj.canvasID + "_vw_inp").attr("arow2", "");
            //        $("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "0");
            //        $("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "hidden");
            //        $("#" + obj.canvasID + "_vw_selectorCon .P8Spread_Input.hasDatepicker").hide();
            //    }
            //});
        }

        canvasSheet.addEventListener('mousemove', function (event) {
            var mousePos = _sfGetMousePos(canvasSheet, event);
            var element_width = "";
            var element_col = "";
            $("body").addClass("p8SpreadHover");
            obj.currentCells.forEach(function (element) {
                if (mousePos.y >= element.y && mousePos.y <= element.y + element.height
                    && mousePos.x >= element.x - 2 && mousePos.x <= element.x + element.width + 2
                    && element.type == "col"
                ) {
                    var tooltip = "";
                    try {
                        tooltip = obj.ColumnConfig[element.colindex].tooltip || "";
                    } catch (err) { }
                    $("#" + obj.canvasID + "").attr("title", tooltip);
                    //  console.log(element.colindexl);
                }
            });
        });


        canvasSheet.addEventListener('mousemove', function (event) {
            P8CurrentIDSel = obj.canvasID;


            var mousePos = _sfGetMousePos(canvasSheet, event);

            //karl 05/26
            if (obj.IsResizeClick == true) {
                if (obj.IsResizeRow == true) {
                    obj.IsResizeHoverValue = mousePos.y;
                } else {
                    obj.IsResizeHoverValue = mousePos.x;
                }
                return;
            }

            var x = 0, y = 0;
            try {
                x = event.pageX - elemLeft,
                    y = event.pageY - elemTop;
            } catch (err) { }


            //_sfLog("column Hover : " + mousePos.x + " : " + mousePos.y);
            var iscursor = false;
            var iscursor_row = false;
            var element_width = "";
            var element_col = "";



            iscurCellSelect = obj.currentCells.forEach(function (element) {
                //if (mousePos.y >= element.y && mousePos.y <= element.y + element.height && mousePos.x >= element.x-1 && mousePos.x <= element.x + 2

                if (obj.CellSelHover == true) {
                    //_sfLog("Cell Hover Index : " + mousePos.y + ">=" + element.y + " && " + mousePos.y + " <= " + element.y + " + " + element.height
                    //    + " x :" + mousePos.x + " >= " + element.x + " && " + mousePos.x + " <= " + element.x + " + " + element.width
                    //    );

                    if (mousePos.y >= element.y && mousePos.y <= element.y + element.height
                        && mousePos.x >= element.x && mousePos.x <= element.x + element.width
                    ) {
                        _sfLog("Cell  Hover : " + p8_NumberToCell(element.col) + element.row);

                    }


                    if (mousePos.y >= element.y && mousePos.y <= element.y + element.height
                        && mousePos.x >= element.x && mousePos.x <= element.x + element.width
                        && element.type == "cell"

                        && (obj.CellIndexes.Col2 != element.col - 1
                            || obj.CellIndexes.Row2 != element.row - 1)
                    ) {
                        /// hover cell


                        obj.CellIndexes.Col2 = element.col - 1;
                        obj.CellIndexes.Row2 = element.row - 1;

                        _sfLog("column  Hover : " + obj.CellIndexes.Col2 + " : " + obj.CellIndexes.Row2);

                        //contextCurrentSelected.clearRect(0, 0, 10000, 10000);
                        obj.RenderNoEvent();
                        // obj.CellSelected
                        //drawRectangleSelected(obj, element, contextCurrentSelected);


                    }
                }

                // for Column width Handle
                if (mousePos.y >= element.y && mousePos.y <= element.y + element.height
                    && mousePos.x >= element.x + element.width - 2 && mousePos.x <= element.x + element.width + 2
                    && element.type == "col"
                ) {


                    _sfLog("Column Hover : " + mousePos.x + " : " + mousePos.y);

                    if (element.width >= 1) {
                        element_width = element.width;
                        element_col = element.col - 1;
                        iscursor = true;
                    }


                }
                //karl 05/24
                // for Row height Handle
                if (mousePos.x >= element.x && mousePos.x <= element.x + element.width
                    && mousePos.y >= element.y + element.height - 2 && mousePos.y <= element.y + element.height + 2
                    && element.type == "row"
                ) {

                    _sfLog("Row Hover : " + mousePos.x + " : " + mousePos.y);

                    if (element.height >= 1) {
                        element_height = element.height;
                        element_row = element.row - 1;
                        iscursor_row = true;
                    }


                }
            });
            //console.log(obj.CellSelHover);

            if (iscursor_row == true) {
                obj.IsResizeRow = true;
                obj.IsResizeHover = true;
                obj.IsResizeHoverSValue = mousePos.y;
                obj.IsResizeRowHeight = element_height;
                obj.IsResizeRowIndex = element_row;
                $("#" + obj.canvasID + "_vw").css('cursor', 'row-resize');
            }
            else if (iscursor == true) {
                obj.IsResizeRow = false;
                obj.IsResizeHover = true;
                obj.IsResizeHoverSValue = mousePos.x;
                obj.IsResizeColumnWidth = element_width;
                obj.IsResizeColumnIndex = element_col;
                $("#" + obj.canvasID + "_vw").css('cursor', 'col-resize');
            }
            else {
                $("#" + obj.canvasID + "_vw").css('cursor', 'default');
                obj.IsResize = false;
                obj.IsResizeHover = false;
                obj.IsResizeRow = false;
            }


        }, false);



        /*
        left = 37
        up = 38
        right = 39
        down = 40
        */
        if (isObjectCreated == false) {
            $(document).on("change", "#" + canvasID + "_inp", function () {
                // setTimeout(function () {

                //obj.Book.ActiveSheet.SetText(0, 0, $(this).val());
                if ($(this).hasClass("nwDatePickP8")) {

                } else {
                    $("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "0");
                    $("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "hidden");
                    $("#" + obj.canvasID + "_vw_selectorCon .P8Spread_Input.hasDatepicker").hide();
                }

                // }, 1);


            });
        }




        var cmpInput = document.getElementById(canvasID + "_inp");
        var p8SpreadKeysControl = ["16", "17", "18", "33", "34", "36", "35", "19", "20", "91", "93", "112", "115", "116", "117", "118", "119", "120", "121", "122", "123", "124"];
        //, "113" F2
        //, "114" F3
        cmpInput.addEventListener('keypress', function (event) {
            // event


        }, false);





        //keypress
        cmpInput.onkeydown = function (e) {
            //  if (P8CurrentIDSel != obj.canvasID) return;
            e = e || window.event;
            var e_keyCode = e.keyCode;

            if ((e_keyCode == '113')
                && $("#" + obj.canvasID + "_vw_selectorCon").css("opacity") == "0"
            ) {
                SpreadDBClick(e);
                return false;
            }
            else if ((e_keyCode == '114')
                && $("#" + obj.canvasID + "_vw_selectorCon").css("opacity") == "0"
            ) {
                SpreadMouseDown(e);
                //lookup 
                return false;
            }
            if (e_keyCode == '13' && $("#" + obj.canvasID + "_vw_selectorCon").css("opacity") == "0") {
                e_keyCode = '40';
            }

            // event
            var isValid = true;


            var xy = 0;
            _sfLog("key down:" + e.keyCode);

            if (e_keyCode == '27') {
                $("#" + obj.canvasID + "_vw_inp").val("");
                $("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "0");
                $("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "hidden");
                $("#" + obj.canvasID + "_vw_selectorCon .P8Spread_Input.hasDatepicker").hide();
                return true;
            }

            if (e_keyCode == '38' || e_keyCode == '40' || e_keyCode == '37' || e_keyCode == '39'
                || e_keyCode == '9' || e_keyCode == '13'
            ) {
                if ($('#' + obj.canvasID + '_vw_selectorCon').css("opacity") == "1") {
                    //, "text",true
                    obj.SetText(undefined, undefined, $("#" + obj.canvasID + "_vw_inp").val(), "text", true);
                    //else obj.SetText(undefined, undefined, $("#" + obj.canvasID + "_vw_inp").val());

                    $("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "0");
                    $("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "hidden");
                    $("#" + obj.canvasID + "_vw_selectorCon .P8Spread_Input.hasDatepicker").hide();

                    try {
                        // p8Spread_Change(obj.canvasID, obj.CellSelected.row - 1, obj.CellSelected.col - 1);
                    } catch (err) { }
                    try {
                        // p8Spread_Focus(obj.canvasID, obj.CellSelected.row - 1, obj.CellSelected.col - 1);
                    } catch (err) { }

                }

            }
            else {

                var keyisavalid = true;

                try {
                    keyisavalid = p8Spread_KeyPress_Menuitem(e, obj.canvasID, obj.CellIndexes.Row, obj.CellIndexes.Col);
                } catch (err) {
                    try {
                        keyisavalid = p8Spread_KeyPress(e, obj.canvasID, obj.CellIndexes.Row, obj.CellIndexes.Col);
                    } catch (err) { }
                }
                if (keyisavalid == false) return keyisavalid;
            }

            if (e_keyCode == '38') {
                // up arrow
                if (obj.CellIndexes.Row - 1 < 0) return;

                if (obj.startRow >= obj.Data.length) {
                    obj.startRow -= obj.FreezeRow;
                }

                //obj.CellIndexes.Row -= 1;
                //obj.CellIndexes.Row2 = obj.CellIndexes.Row;

                var cell = { row: -1, col: -1 };

                var ismerge = _sfCheckIfMerge(obj, obj.CellIndexes.Col, obj.CellIndexes.Row - 1, "row", cell);
                if (ismerge) {
                    while (ismerge) {
                        obj.CellIndexes.Row -= 1;
                        obj.CellIndexes.Row2 = obj.CellIndexes.Row;
                        ismerge = _sfCheckIfMerge(obj, obj.CellIndexes.Col, obj.CellIndexes.Row, "row", cell);
                        obj.startRow -= 1;
                    }
                    obj.CellIndexes.Col = obj.CellIndexes.Col2 = cell.col;
                    obj.CellIndexes.Row += 1;
                    obj.CellIndexes.Row2 = obj.CellIndexes.Row;
                }
                else {
                    obj.CellIndexes.Row -= 1;
                    obj.CellIndexes.Row2 = obj.CellIndexes.Row;
                }

                xy = 1;
            }
            else if (e_keyCode == '40') {
                // down arrow

                //if end of theline
                if (obj.Data.length <= obj.CellIndexes.Row + 1) return;

                if (obj.CellIndexes.Row + 1 == obj.FreezeRow) {
                    if (obj.startRow != 1) obj.startRow = 0;
                    else obj.startRow = 1;
                }

                var cell = { row: -1, col: -1 };
                var ismerge = _sfCheckIfMerge(obj, obj.CellIndexes.Col, obj.CellIndexes.Row, "row", cell);
                if (ismerge) {
                    while (ismerge) {
                        obj.CellIndexes.Row += 1;
                        obj.CellIndexes.Row2 = obj.CellIndexes.Row;
                        ismerge = _sfCheckIfMerge(obj, obj.CellIndexes.Col, obj.CellIndexes.Row, "row", cell);
                    }
                    obj.CellIndexes.Col = obj.CellIndexes.Col2 = cell.col;
                }
                else {
                    obj.CellIndexes.Row += 1;
                    obj.CellIndexes.Row2 = obj.CellIndexes.Row;
                }


                xy = 2;
            }
            else if (e_keyCode == '37' || (e_keyCode == '9' && e.shiftKey)) {
                // left arrow

                var colvalue = obj.CellIndexes.Col;
                var colvalue2 = colvalue;
                var xwidth = 0;
                do {
                    colvalue -= 1;
                    colvalue2 = colvalue;
                    try {
                        xwidth = obj.ColumnConfig[colvalue].width;
                    } catch (err) {
                        xwidth = 0;
                    }
                } while (xwidth == 0 && colvalue <= obj.ColumnConfig.length - 1 && colvalue >= 0)

                if (obj.startCol >= obj.ColumnConfig.length) {
                    obj.startCol -= obj.FreezeCol;
                }

                if (colvalue < 0) return;

                var cell = { row: -1, col: -1 };
                var ismerge = _sfCheckIfMerge(obj, obj.CellIndexes.Col - 1, obj.CellIndexes.Row, "col", cell);
                if (ismerge == true) {
                    colvalue = cell.col;
                    obj.startCol = colvalue;
                    obj.CellIndexes.Row = obj.CellIndexes.Row2 = cell.row;

                }

                if ((xwidth == 0 && colvalue <= obj.ColumnConfig.length - 1)) {

                } else {
                    obj.CellIndexes.Col = colvalue;
                    obj.CellIndexes.Col2 = colvalue2;
                }

                xy = 3;
                if ((e_keyCode == '9' && e.shiftKey))
                    isValid = false;
            }
            else if (e_keyCode == '39' || (e_keyCode == '9')) {
                // right arrow
                if (obj.CellIndexes.Col >= obj.ColumnConfig.length) return;

                var colvalue = obj.CellIndexes.Col;
                var colvalue2 = colvalue;
                var xwidth = 0;
                do {
                    colvalue += 1;
                    colvalue2 = colvalue;
                    colvalue2 = colvalue;
                    try {
                        xwidth = obj.ColumnConfig[colvalue].width;
                    } catch (err) {
                        xwidth = 0;
                    }
                } while (xwidth == 0 && colvalue <= obj.ColumnConfig.length - 1)
                if ((xwidth == 0 && colvalue <= obj.ColumnConfig.length - 1)) {

                }
                else if (colvalue >= obj.ColumnConfig.length) {
                    return;
                }
                else {
                    obj.CellIndexes.Col = colvalue;
                    obj.CellIndexes.Col2 = colvalue2;
                }

                xy = 4;
                if ((e_keyCode == '9'))
                    isValid = false;
            }
            //else if (e_keyCode== '9' && e.shiftKey) {
            //    // Shift + Tab
            //    if (obj.CellIndexes.Col - 1 < 0) return;
            //    obj.CellIndexes.Col -= 1;
            //    obj.CellIndexes.Col2 = obj.CellIndexes.Col;
            //    xy = 4; isValid = false;
            //}
            //else if (e_keyCode== '9') {
            //    // Tab
            //    if (obj.CellIndexes.Col >= obj.ColumnConfig.length - 1) return;

            //    var colvalue = obj.CellIndexes.Col;
            //    var colvalue2 = colvalue;
            //    var xwidth = 0;
            //    do {
            //        colvalue += 1;
            //        colvalue2 = colvalue;
            //        try {
            //            xwidth = obj.ColumnConfig[colvalue].width;
            //        } catch (err) {
            //            xwidth = 0;
            //        }
            //    } while (xwidth == 0 && colvalue <= obj.ColumnConfig.length - 1)
            //    if ((xwidth == 0 && colvalue <= obj.ColumnConfig.length - 1)) {

            //    } else if (colvalue >= obj.ColumnConfig.length) {
            //        return;
            //    } else {
            //        obj.CellIndexes.Col = colvalue;
            //        obj.CellIndexes.Col2 = colvalue2;
            //    }

            //    xy = 4; isValid = false;
            //}


            if (xy >= 1 && xy <= 4) {

                $("#" + obj.canvasID + "_vw_inp").val("");

                obj.CellIndexes.Col2 = obj.CellIndexes.Col;
                obj.CellIndexes.Row2 = obj.CellIndexes.Row;

                var scrollcount = 1;
                var isScrolled = false;

                //check width next scroll
                var conWidthDraw = conWidth - (100);
                var icounter = obj.startCol - 1;
                icounter += obj.FreezeCol;
                icounter -= 1;
                var applyfreezeW = 0;

                //console.log("width checker");
                while (conWidthDraw >= 0) {
                    var widthcol = def_Width;
                    try {
                        widthcol = obj.ColumnConfig[icounter].width;
                    } catch (err) { }

                    if (applyfreezeW < obj.FreezeCol) {
                        widthcol = obj.ColumnConfig[applyfreezeW].width;
                        applyfreezeW++;
                        // if ((conWidthDraw - widthcol) <= 0) break;
                        // console.log(_sfGetCellName(obj, applyfreezeW) + " " + (conWidthDraw - widthcol) + " " + applyfreezeW);
                    }
                    else {
                        icounter++;
                        // if ((conWidthDraw - widthcol) <= 0) break;
                        //console.log(_sfGetCellName(obj, icounter) + " " + (conWidthDraw - widthcol) + " " + icounter);
                    }

                    conWidthDraw -= widthcol;
                    if (conWidthDraw <= 0 && xy == 4 && obj.CellIndexes.Col >= icounter) { isScrolled = true; }
                    if (icounter >= 1000) break;
                    // if (icounter >= 50) { console.log("aa"); break; }
                }




                if (isScrolled) {
                    scrollcount += 1;
                }

                //scrollcount += 3;


                var isconnect = false;

                if (isScrolled == false) {
                    obj.currentCells.forEach(function (element) {

                        if (obj.CellIndexes.Col == element.col - 1 && obj.CellIndexes.Row == element.row - 1) {
                            try {
                                $("#" + obj.canvasID + "_vw_inp").val("");
                            } catch (err) { }

                            _sfSelectCell(obj, element, canvasIDOrig, canvasID, contextCurrentSelected);

                            isconnect = true;
                        }
                        else {

                        }

                    });
                }


                // fixed the scroll down
                var highrow = -1;
                var lowrow = -1;
                obj.currentCells.forEach(function (element) {
                    if (element.row - 1 > highrow) {
                        highrow = element.row - 1;
                    }
                    if (element.row - 1 <= lowrow) {
                        lowrow = element.row - 1;
                    }
                });
                if (obj.CellIndexes.Row >= highrow - (obj.CellRowMaxAdd - 1)) {
                    scrollcount = scrollcount;
                    isconnect = false;
                }



                if (isconnect == false) {

                    if (xy == 2) {
                        obj.ScrollDown(scrollcount);
                    }
                    else if (xy == 1)
                        obj.ScrollUp(scrollcount);
                    else if (xy == 3)
                        obj.ScrollLeft(scrollcount);
                    else if (xy == 4)
                        obj.ScrollRight(scrollcount);
                }
                setTimeout(function () {
                    try {
                        p8Spread_FocusT(obj.canvasID, obj.CellIndexes.Row, obj.CellIndexes.Col);
                    } catch (err) { }

                }, 1);;
            }
            else if (e_keyCode == "46") // delete key   //|| e_keyCode== "8" backspace
            {
                var rowstart = obj.CellIndexes.Row;
                var containerlen = 0;
                obj.RenderStatus = false;
                for (var i = rowstart; i <= obj.CellIndexes.Row2; i++) {
                    for (var ic = obj.CellIndexes.Col; ic <= obj.CellIndexes.Col2; ic++) {
                        obj.RenderStatus = false;
                        if (_sfCheckEnable(obj, i, ic)) {
                            obj.SetText(ic, i, "", "text", true);
                            try {
                                //p8Spread_Change(obj.canvasID, i - 1, ic - 1);
                            } catch (err) { }
                        }



                    }
                }
                setTimeout(function () {

                    obj.RenderStatus = true;
                    obj.ScrollActive = true;
                    obj.RenderNoEvent();
                    // _sfSelectCell(obj, element, canvasIDOrig, canvasID, contextCurrentSelected);
                }, 100);
                return true;
            }
            else {
                if (
                    ((e.ctrlKey || e.altKey || e.shiftKey) && p8SpreadKeysControl.indexOf(e_keyCode + "") >= 0 && $("#" + obj.canvasID + "_vw_selectorCon").css("opacity") != "1")
                    || p8SpreadKeysControl.indexOf(e_keyCode + "") >= 0
                )
                    isValid = false;
                else {
                    var isvalid = _sfSelectionActivate(obj);

                    if (isvalid && e.ctrlKey == false) {
                        _sfSpreadInputShow(obj, true,e);
                        //$("#" + obj.canvasID + "_vw_inp").attr("acol", obj.CellIndexes.Col);
                        //$("#" + obj.canvasID + "_vw_inp").attr("arow", obj.CellIndexes.Row)
                        //$("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "1");
                        //$("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "visible");
                        //aagbenedict
                        //if (obj.GetDataType() == "date") {
                        //    $("#" + obj.canvasID + "_vw_selectorCon .P8Spread_Input.hasDatepicker").show();
                        //}
                    }


                }

                //if (e_keyCode== '67' && e.ctrlKey) //copy
                //{

                //}

                if (e_keyCode == '86' && e.ctrlKey) //paste  //&& $("#" + obj.canvasID + "_vw_selectorCon").css("opacity")=="0"
                {
                    if (document.activeElement.classList.contains('P8Spread_Input')) {
                        $("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "0");
                        $("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "hidden");
                        $("#" + obj.canvasID + "_vw_selectorCon .P8Spread_Input.hasDatepicker").hide();
                        $('#' + obj.canvasID + '_vw_inpText').val("");
                        //ksg, to fixed multiple grid
                        // $('#' + obj.canvasID + '_vw_inpText').focus();
                        setTimeout(function () {
                            //console.log($('#' + obj.canvasID + '_vw_inpText').val());
                            $('#' + obj.canvasID + '_vw_inpText').addClass("paste");
                            _sfPaste(obj);
                        }, 100);
                    }
                    return true;
                }
                //else if(e.ctrlKey) //paste
                //{
                //    $('#' + obj.canvasID + '_vw_inpText').val("");
                //    $('#' + obj.canvasID + '_vw_inpText').focus();
                //    return true;
                //}





            }

            return isValid;
            //return isValid;
        };

        var isCopying = false;
        $(document).keydown(function (e) {
            if (P8CurrentIDSel != obj.canvasID) return;

            var isSpread = false;

            if (e.ctrlKey == false) return true;



            if ((e.keyCode == 67 || e.keyCode == 88) && e.ctrlKey) {

                var isCut = false;
                if (e.keyCode == 88) {
                    console.log("cut");
                    isCut = true;
                } else {
                    console.log("copy");
                }

                try {

                    _sfP8Spread_Copy(obj, e, undefined, isCut);
                    _sfLog("Length to be Copied:" + textToPutOnClipboardHTML.length);
                    _sfCopy(textToPutOnClipboardHTML, obj.canvasID);

                } catch (err) { isCopying = false; }

                return false;
            }
            else if (e.keyCode == 86 && e.ctrlKey) {
                //check if focusing in spread
                if (document.activeElement.classList.contains('P8Spread_Input')) {
                    $('#' + obj.canvasID + '_vw_inpText').val("");
                    //ksg, to fixed multiple grid
                    //$('#' + obj.canvasID + '_vw_inpText').focus();
                    if ($(":focus").hasClass("P8Spread_Input")) {
                        return true;
                    }
                    console.log("paste");
                    $('#' + obj.canvasID + '_vw_inpText').addClass("paste");
                    setTimeout(function () {
                        _sfPaste(obj);
                    }, 10);
                }
                return true;
            }


        });


        obj.havelistner = true;
    }

    _sfRenderObjects(obj);


    var cssHeight = $('#' + containerID + "_vw").css("height") || "";
    cssHeight = cssHeight.replace("px", "");
    if (cssHeight == "" || (cssHeight + "") == "0" || cssHeight == undefined) cssHeight = obj.Book.TableHeight + "px";
    $('#' + containerID + "_vw_con").css("max-height", cssHeight);

    if ($('#' + containerID + "_SheetConCanvas").attr("init") == undefined) _sfLoadSheetTab(obj.Book, containerID);
    var yTime = new Date().getTime();
    _sfLog("render done [" + P8DataList[obj.canvasID][0].sheet.ActiveSheet.SheetName + "]: " + ((yTime - xTime) / 1000.0) + " seconds");
    xTime = undefined;

    setTimeout(function () {
        is_vw_inpDateHover = false;
        //console.log(is_vw_inpDateHover);
    }, 11);

    // $('.P8Spread_Input.hasDatepicker').hide();

    console.log("END:" + randomid);
}




function canvasListUpdate(canvasID, obj, col, row) {
    if (obj.Theme == P8Themes.FANCY) {
        if (p8Spread_IsResponsive()) {



        }
    }
}
function canvasCreateListHTML(canvasID, obj) {
    var randomid = nwRandomString(40);
    P8Spread_currcavas = randomid;
    console.log("START:" + randomid);
    obj.ScrollActive = false;
    obj.ScrollActiveStat = false;
    //var data = obj.Data;
    var canvasIDOrig = canvasID;
    var containerID = canvasID;
    canvasID = canvasID + "_vw";

    if ($("#" + canvasID).hasClass("nkListView")) {
        isObjectCreated = true;

    }
    else {
        obj.havelistner = false;
        var scrollWidth = 10;
        var scrollHeight = 10;
        var x_html = "";
        $('#' + containerID).html("");

        var maxrow = obj.Data.length;
        if (maxrow >= obj.ListViewRowLoaderCount)
            maxrow = obj.ListViewRowLoaderCount;

        var startrow = 0;
        var strbut = _sfnwGridButtons(obj.Book, "nkListViewObjs");

        x_html += strbut;
        x_html += "<div class='nkListView' data-text='No Data!' canvasID='" + containerID + "'>";
        x_html += "</div>";
        $('#' + containerID).html(x_html);
        $('#' + containerID).addClass("P8Spread");

        if (obj.ReportHeader == true) {
            canvasCreateListHTMLHeader(obj, startrow, obj.FreezeRow - 1, containerID);
            startrow = obj.FreezeRow;
        }

        canvasCreateListHTMLDetail(obj, startrow, maxrow, containerID);
    }


}

function canvasCreateListHTMLHeader(obj, startrow, maxrow, containerID) {
    var x_html = "";
    x_html += "<div class='nkListViewRow nkListViewHeader' row='" + irow + "'>";
    for (var irow = startrow; irow < maxrow; irow++) {
        for (var icol = 0; icol < 1; icol++) {

            var xwidth = parseInt(obj.GetColumnWidth(icol) || "0");

            if (xwidth <= 0)
                x_html += "<div class='nkListViewCol nwHide'  col='" + icol + "'>";
            else
                x_html += "<div class='nkListViewCol'  col='" + icol + "'>";


            var enabled = obj.GetEnabled(icol, irow);
            var background = obj.GetBackground(icol, irow);
            var textcolor = obj.GetTextColor(icol, irow);
            var enabled = obj.GetEnabled(icol, irow);

            if (obj.GetObjectType(icol, irow) == "buttonflat") {
                x_html += "<div class='nkListViewValue max buttonflat' enabled='" + enabled + "'>";
                x_html += obj.GetText(icol, irow);
                x_html += "</div>";
            } else {

                //x_html += "<div class='nkListViewTitle'>";
                //x_html += obj.ColumnName(icol);
                //x_html += "</div>";

                var objtype = obj.GetObjectType(icol, irow);
                var datatype = obj.GetDataType(icol, irow);


                x_html += "<div class='nkListViewValue " + (enabled ? "enable" : "") + "' datatype='" + datatype + "' style='background-color:" + background + ";color:" + textcolor + ";' >"; //<textarea "+(enabled ? "" : "disabled='disabled'")+" >
                var valueR = "";
                if (objtype == "checkbox") {
                    var ischeck = obj.GetValueBolean(icol, irow);

                    if (ischeck) ischeck = "checked";
                    else ischeck = "";

                    if (!enabled) enabled = "disabled";
                    else enabled = "";

                    valueR = "<input class='nkListViewValueCheck' " + ischeck + " " + enabled + " type='checkbox' >";
                }
                else {
                    valueR = obj.GetText(icol, irow) + "&nbsp;";
                }


                x_html += valueR;
                x_html += "</div>"; //</textarea>
            }

            x_html += "</div>";
        }
    }
    x_html += "</div>";

    $('#' + containerID).find(".nkListView").append(x_html);
    x_html = "";

}


function canvasCreateListHTMLDetail(obj, startrow, maxrow, containerID) {
    var x_html = "";
    for (var irow = startrow; irow < maxrow; irow++) {
        x_html += "<div class='nkListViewRow' row='" + irow + "'>";
        for (var icol = 0; icol < obj.ColumnConfig.length; icol++) {

            var xwidth = parseInt(obj.GetColumnWidth(icol) || "0");

            if (xwidth <= 0)
                x_html += "<div class='nkListViewCol nwHide'  col='" + icol + "'>";
            else
                x_html += "<div class='nkListViewCol'  col='" + icol + "'>";


            var enabled = obj.GetEnabled(icol, irow);
            var background = obj.GetBackground(icol, irow);
            var textcolor = obj.GetTextColor(icol, irow);
            var enabled = obj.GetEnabled(icol, irow);

            if (background == "white") background = "";
            if (background == "inherit") background = "";
            //parseInt(nwGrid_Book.ActiveSheet.ColumnConfig[20].width) <= 10

            var xclass = obj.ColumnConfig[icol].Class || "";

            if (obj.GetObjectType(icol, irow) == "buttonflat") {
                x_html += "<div class='nkListViewValue max buttonflat' enabled='" + enabled + "'>";
                x_html += obj.GetText(icol, irow);
                x_html += "</div>";
            }
            else {
                x_html += "<div class='nkListViewTitle'>";
                if (obj.ReportHeader == true) {
                    x_html += obj.GetText(icol, obj.FreezeRow - 1);
                }
                else
                    x_html += obj.ColumnName(icol);


                if(obj.ColumnConfig[icol].HeaderColumnReq=="nwFieldreq"){
                    x_html += "<span class='nwRequiredField'>*</span>";
                }else if(obj.ColumnConfig[icol].HeaderColumnReq=="nwFieldopt"){
                    x_html += "<span class='nwOptionalField'>*</span>";
                }
                x_html += "</div>";


                var objtype = obj.GetObjectType(icol, irow);
                var datatype = obj.GetDataType(icol, irow);


                if (xclass.indexOf('aagnwlookupgrid') >= 1 || xclass.indexOf('aagAddTolist ') >= 1) {
                    datatype = "lookup";
                    if (background == "") background = obj.DefaultSettings.lookupBackgroundColor;
                }


                x_html += "<div class='nkListViewValue " + (enabled ? "enable" : "") + "' datatype='" + datatype + "' style='background-color:" + background + ";color:" + textcolor + ";' >"; //<textarea "+(enabled ? "" : "disabled='disabled'")+" >
                var valueR = "";
                if (objtype == "checkbox") {
                    var ischeck = obj.GetValueBolean(icol, irow);

                    if (ischeck) ischeck = "checked";
                    else ischeck = "";

                    if (!enabled) enabled = "disabled";
                    else enabled = "";

                    valueR = "<input class='nkListViewValueCheck' " + ischeck + " " + enabled + " type='checkbox' >";
                }
                else {
                    valueR = obj.GetText(icol, irow) + "&nbsp;";
                }


                x_html += valueR;
                x_html += "</div>"; //</textarea>
            }

            x_html += "</div>";
        }
        x_html += "</div>";

        $('#' + containerID).find(".nkListView").append(x_html);
        var curindex = $('#' + containerID).find(".nkListViewRow").length - 1;

        for (var icol = 0; icol < obj.ColumnConfig.length; icol++) {
            if (obj.GetObjectType(icol, irow) == "buttonflat") {
                var background = obj.GetBackground(icol, irow);
                $('#' + containerID).find(".nkListViewRow:eq(" + curindex + ") .nkListViewValue:eq(" + icol + ")").css("background-color", background);
            }

            var textcolor = obj.GetTextColor(icol, irow);
            if (textcolor != "" && textcolor != 'black')
                $('#' + containerID).find(".nkListViewRow:eq(" + curindex + ") .nkListViewValue:eq(" + icol + ")").css("color", textcolor);
        }

        x_html = "";
    }

}

$(document).on("click", ".nkListViewCol", function () {
    var canvasID = $(this).parents(".nkListView").attr("canvasID");
    var row = parseInt($(this).parents(".nkListViewRow").attr("row") + "" || -1);
    var col = parseInt($(this).attr("col") + "" || -1);//.index();

    P8DataList[canvasID][0].sheet.ActiveSheet.CellIndexes.Row = row;
    P8DataList[canvasID][0].sheet.ActiveSheet.CellIndexes.Row2 = row;
    P8DataList[canvasID][0].sheet.ActiveSheet.CellIndexes.Col = col;
    P8DataList[canvasID][0].sheet.ActiveSheet.CellIndexes.Col2 = col;

    p8Spread_CurBook = canvasID;
    p8Spread_ClickT(canvasID, row, col, this);
    //try{p8Spread_FocusT(canvasID, row, col,this);}catch(err){}
});
$(document).on("dblclick", ".nkListViewCol", function () {
    var canvasID = $(this).parents(".nkListView").attr("canvasID");
    var row = parseInt($(this).parents(".nkListViewRow").attr("row") + "" || -1);
    var col = parseInt($(this).attr("col") + "" || -1);//.index();

    P8DataList[canvasID][0].sheet.ActiveSheet.CellIndexes.Row = row;
    P8DataList[canvasID][0].sheet.ActiveSheet.CellIndexes.Row2 = row;
    P8DataList[canvasID][0].sheet.ActiveSheet.CellIndexes.Col = col;
    P8DataList[canvasID][0].sheet.ActiveSheet.CellIndexes.Col2 = col;

    p8Spread_DblClickT(canvasID, row, col, this);
});
function canvasListSelect() {

}


function canvasCreateList(canvasID, obj) {
    var randomid = nwRandomString(40);
    P8Spread_currcavas = randomid;
    var data = obj.Data;
    var canvasIDOrig = canvasID;
    var containerID = canvasID;
    canvasID = canvasID + "_vw";
    console.log("START:" + randomid);

    if (obj.gridtype == "grid") {
        return canvasGridCreate(canvasID, obj);
    }

    if (obj.startCol <= 0) obj.startCol = 1;

    obj.ScrollActive = false;
    obj.ScrollActiveStat = false;

    var isObjectCreated = false;
    if (xTime == undefined) xTime = new Date().getTime();


    var data = obj.Data;
    var canvasIDOrig = canvasID;
    var containerID = canvasID;
    canvasID = canvasID + "_vw";
    var _tmpExtra = 0;

    var scrollhwidth = 400;


    var scheight = 0;
    var aminus = 72;

    var canvaswidth = $('#' + containerID).width() - 20;
    var conWidth = $('#' + containerID).width();
    var conheight = $('#' + containerID).height();


    if ($("#" + canvasID).hasClass("nkspread")) {
        $('#' + containerID).attr("nwidth", "");
        $('#' + containerID).attr("nheight", "");
        $("#" + containerID).html("");
        var xconWidth = $('#' + containerID).width();
        var xconheight = $('#' + containerID).height();
        $('#' + containerID).attr("nwidth", xconWidth);
        $('#' + containerID).attr("nheight", xconheight);
    }
    else {
        if ($('#' + containerID).attr("nwidth") > 0 && $('#' + containerID).attr("nwidth") != undefined) {
            conWidth = $('#' + containerID).attr("nwidth");
            conheight = $('#' + containerID).attr("nheight");
            if ($('#' + containerID).attr("nheight") <= 0)
                conheight = $('#' + containerID).height();
        }
        else {
            var xconWidth = $('#' + containerID).width();
            var xconheight = $('#' + containerID).height();
            $('#' + containerID).attr("nwidth", xconWidth);
            $('#' + containerID).attr("nheight", xconheight);
        }

    }




    //  conWidth = $('#' + containerID + "_vw").width();
    //  conheight = $('#' + containerID + "_vw").height();



    if ($("#" + canvasID).index() >= 0) {
        isObjectCreated = true;



        //setTimeout(function () {
        //    if (obj.AutoWrap == true && obj.AutoWrapRender == false)
        //        _sfAutoWrap(obj);
        //}, 10);
    }
    else {
        obj.havelistner = false;
        var scrollWidth = 10;
        var scrollHeight = 10;
        var x_html = "";
        $('#' + containerID).html("");
        $('#' + containerID).addClass("P8Spread");

        $('#' + containerID).attr("intanceid", containerID + "-" + _sfnwRandomString(30));
        $('#' + containerID).css("width", "99%");

        // draw button
        var strbut = _sfnwGridButtons(obj.Book);
        if (strbut != "") {
            x_html += "<table id='" + canvasID + "_tbl0' class='P8Spread_HeaderButtons' p8style='width:100%'>";//main border: solid 1px #7f7f7f;border-spacing: initial;padding-right: 1px;
            //obj.Buttons
            x_html += "<tr>"; //Buttons
            x_html += "<td colspan='2' p8style='padding:0px'>"; //Buttons   //;background-color:#c3c3c3;  

            // x_html += "<div class='nwgridButtons' p8style='height:25px;'></div>";
            x_html += strbut;

            x_html += "</td>"; //Buttons
            x_html += "</tr>"; //Buttons
            x_html += "</table>";//main
        }



        x_html += "<table id='" + canvasID + "_tbl' class='P8Spread_Content' p8style='border: solid 1px #7f7f7f;border-spacing: initial;padding-right: 1px;'>";//main

        x_html += "<tr p8style='padding:0px;height:" + _tmpExtra + "px;display:" + (_tmpExtra <= 0 ? "none" : "table-row") + "' >"; //Top
        x_html += "<td colspan='2' p8style='padding:0px;background-color:#c3c3c3;  '>"; //Canvas
        x_html += "<div id='" + canvasID + "_inpC'><input id='" + canvasID + "_inpx' autofocus type='text' /><button id='" + canvasID + "_inpB'>focus</button></div>";
        x_html += "</td>"; //Canvas
        x_html += "</td></td>"; //spacer
        x_html += "</td></td>";
        x_html += "</tr>"; //Top



        x_html += "<tr p8style='padding:0px;' >"; //Content
        x_html += "<td colspan='2' p8style='padding:0px;vertical-align:top'>"; //Canvas

        x_html += "<div  id='" + canvasID + "_con'><textarea id='" + canvasID + "_inpText' class='P8Spread_TextArea paste' p8style='opacity:0;position:absolute;width0;height:0;z-index:-1;' ></textarea>";
        //x_html += "<div  id='" + canvasID + "_con'><input id='" + canvasID + "_inpText' class='P8Spread_TextArea' p8style='opacity:0;position:absolute;width0;height:0;' />";


        //x_html += "<div id='" + canvasID + "_selectorCon' p8style='width: 0px;height: 0px;overflow:hidden'><textarea id='" + canvasID + "_inp' class='P8Spread_Input' type='text' p8style='height: 22px;border: 2px solid #0079d9;padding-left: 5px;padding-right: 5px;resize:none;'></textarea></div>";
        //selector
        //



        x_html += "<div id='" + canvasID + "_selectorCon' class='p8_selectorCon' p8style='width: 0px;height: 0px;overflow:hidden;'>";
        x_html += "<input id='" + canvasID + "_inp' class='P8Spread_Input' autocomplete='off' type='text' p8style='height: 19px;border: 2px solid #0079d9;marging-left:-2px;resize:none;' />";
        x_html += "<div id='" + canvasID + "_inpDate' class='P8Spread_Input' type='text' p8style='' />";
        x_html += "</div>";

        x_html += "</div>";

        var xconheight = ($('#' + containerID).css("height")) || 0;
        if (xconheight <= 10) xconheight = obj.Book.TableHeight || 300;

        x_html += "<canvas id='" + canvasID + "' class='nklist'  p8style='height:" + xconheight + ";cursor:default;width:" + (canvaswidth) + "px;'></canvas>";
        x_html += "<canvas id='" + canvasID + "_temp'  p8style='display:none;height:" + xconheight + ";cursor:default;width:" + (canvaswidth) + "px;'></canvas>";



        x_html += "</td>"; //Canvas


        x_html += "<td p8style='display:none;padding:0px;min-width:" + scrollWidth + "px;width:" + scrollWidth + "px;max-width:" + scrollWidth + "px;padding-right:1px;vertical-align: top;'>"; //scroller
        x_html += "<div id='" + containerID + "_P8Spread_ScrollUp' class='P8Spread_ScrollUp' p8style='padding: 0px;min-height: 15px;min-width: " + scrollWidth + "px;display: inline-block;background-color: #efefef;background-color: #83b8d3;border: 1px solid #607c8b;box-shadow: inset 0px 0px 5px #e5e5e5;border-radius: 3px;'></div>";
        x_html += "<div  class='P8Spread_Scroll' p8style='padding:0px;min-width:100%;min-height:30px;background: #ececec;border: 1px solid #ececec;'><div id='" + containerID + "_P8Spread_Scroll' class='P8Spread_ScrollBar Vr' p8style='border-radius: 5px;min-height:30px;background: #bcc5ce;border-radius: 3px;background-image: -webkit-linear-gradient(top, #bcc5ce, #bcc5ce);background-image: -moz-linear-gradient(top, #bcc5ce, #bcc5ce);background-image: -ms-linear-gradient(top, #bcc5ce, #bcc5ce);background-image: -webkit-gradient(linear, 0 0, 0 100%, from (#bcc5ce), to(#bcc5ce));background-image: -webkit-linear-gradient(top, #bcc5ce, #bcc5ce);background-image: -o-linear-gradient(top, #bcc5ce, #bcc5ce);background-image: linear-gradient(top, #bcc5ce, #bcc5ce);box-shadow: inset 1px 1px 5px #bcc5ce;border: 1px solid #bcc5ce;'><div id='" + containerID + "_P8Spread_Scroll_handler' p8style='min-width:100%;min-height:100%'></div></div></div>"; //scrollbar
        x_html += "<div id='" + containerID + "_P8Spread_ScrollBot' class='P8Spread_ScrollBot' p8style='padding: 0px;min-height: 15px;min-width: " + scrollWidth + "px;display: inline-block;background-color: #efefef;background-color: #83b8d3;border: 1px solid #607c8b;box-shadow: inset 0px 0px 5px #e5e5e5;border-radius: 3px;'></div>";
        x_html += "</td>"; //scroller
        /* //scroller*/

        x_html += "</tr>"; //Content





        x_html += "</table>";//main

        x_html += "<div id='" + containerID + "_copy' p8style='display:none;visibility:hidden;'></div>";




        $('#' + containerID).html(x_html);
        $('#' + containerID).addClass("P8Spread");

        $('#' + containerID).attr('isresize', 0);
        $('#' + containerID).attr('isresetsize', 0);


        scheight = $('#' + containerID + '_vw_tbl').outerHeight() - aminus;
        $('#' + containerID).find(".P8Spread_Scroll").css("min-height", scheight);



        $('#' + canvasID + "_inpDate").datepicker({
            altField: '#' + canvasID + "_inp",
            altFormat: "mm/dd/yy"
        });
        $('#' + canvasID + "_inpDate").css("position", "absolute");
        $("[p8style]").each(function (i) {
            var obj = $(this);
            var nwstyle = obj.attr("p8style");
            if (nwstyle != undefined) {
                var cssstyle = nwstyle.split(";");
                var count = cssstyle.length;
                for (var i2 = 0; i2 < count; i2++) {
                    try {
                        var style = cssstyle[i2].split(":");
                        $(obj).css(style[0], style[1]);
                    } catch (err) { }
                }
                obj.removeAttr("p8style");
            }
        });


        var scwidth = 0;
        var bminus = 49;
        scwidth = $('#' + containerID).find(".scrollerH").outerWidth() - bminus;

        //if (scwidth <= 500)
        scwidth -= 12;

        $('#' + containerID).find(".P8Spread_ScrollH").css("min-width", scwidth);
        $('#' + containerID).find(".P8Spread_ScrollH").css("max-width", scwidth);
        $('#' + containerID).find(".P8Spread_ScrollH").css("width", scwidth);



        $('#' + containerID + "_vw_inpDate").hide();


        //var cmpScrollUp = document.getElementById(containerID + "_P8Spread_ScrollUp");
        //cmpScrollUp.addEventListener('click', function (event) {
        //    obj.Book.ActiveSheet.ScrollUp();
        //}, false);

        //var cmpScrollBot = document.getElementById(containerID + "_P8Spread_ScrollBot");
        //cmpScrollBot.addEventListener('click', function (event) {
        //    obj.Book.ActiveSheet.ScrollDown();
        //}, false);


        //var cmpScrollLeft = document.getElementById(containerID + "H_P8Spread_ScrollLeft");
        //cmpScrollLeft.addEventListener('click', function (event) {
        //    obj.Book.ActiveSheet.ScrollLeft();
        //}, false);

        //var cmpScrollRight = document.getElementById(containerID + "H_P8Spread_ScrollRight");
        //cmpScrollRight.addEventListener('click', function (event) {
        //    obj.Book.ActiveSheet.ScrollRight();
        //}, false);


        var canvasS = document.getElementById(canvasID);

        canvasS.addEventListener('mousewheel', function (event) {
            var scrollCount = 10;
            var rowcount = obj.Data.length * (obj.ColumnConfig.length + 1);
            var perc = 0.01;


            perc = 2.5 / (rowcount + 0.0);
            if (perc < 0.005) perc = 0.005;
            //console.log("perc:" + perc);


            var ch = $("#" + containerID + "_P8Spread_Scroll").parent().height();
            var scrollxx = 0;



            if (event.wheelDeltaY <= 0)
                scrollxx = parseFloat($("#" + containerID + "_P8Spread_Scroll").css("top")._sfReplaceAll("px", "")) + (ch * perc);
            else
                scrollxx = parseFloat($("#" + containerID + "_P8Spread_Scroll").css("top")._sfReplaceAll("px", "")) - (ch * perc);

            if (scrollxx <= 0) scrollxx = 0;



            var a = parseFloat($("#" + containerID + "_P8Spread_Scroll").css("top").replace("px", ""));
            var b = $("#" + containerID + "_P8Spread_Scroll").parents(".P8Spread_Scroll").height();
            var c = $("#" + containerID + "_P8Spread_Scroll").height();
            if (b - c < a && scrollxx >= a) scrollxx = a;


            $("#" + containerID + "_P8Spread_Scroll").css("top", scrollxx);

            var t = parseInt($("#" + containerID + "_P8Spread_Scroll").css("top")._sfReplaceAll("px", ""));
            var h = $("#" + containerID + "_P8Spread_Scroll").outerHeight();
            var ratio = parseFloat(h) / parseFloat(ch);
            var totaly = (t + h);

            // _sfLog(event.wheelDeltaY + " : " + rowcount);
            //console.log(event.wheelDeltaY + " : " + rowcount);



            var scrolly = rowcount * ((100 - (((ch - h) - (t)) / (ch - h) * 100)) / 100);
            scrolly = Math.floor(scrolly) + 1;
            if (scrolly >= rowcount) scrolly = rowcount;
            if (scrolly <= 0) scrolly = 1;

            var dataadd = parseInt(event.wheelDeltaY / 150);
            dataadd = (dataadd * -1);

            var rowadd = 0;
            var coladd = 0;

            // console.log("Data:" + dataadd);
            if (obj.Book.ActiveSheet.startRow + dataadd <= 0) {
                obj.Book.ActiveSheet.startRow = 1;
                dataadd = 0;
                coladd = 0;
            }


            // if (obj.Book.ActiveSheet.startCol + dataadd >= obj.Book.ActiveSheet.ColumnConfig.Length) {
            rowadd = dataadd;
            coladd = 0;
            // }
            // else {
            //  coladd = dataadd;
            // }


            // if (obj.Book.ActiveSheet.startCol >= obj.Book.ActiveSheet.ColumnConfig.length) {

            obj.Book.ActiveSheet.ScrollRender(obj.Book.ActiveSheet.startCol + coladd, obj.Book.ActiveSheet.startRow + rowadd);
            // }
            // else {
            // obj.Book.ActiveSheet.ScrollRender(obj.Book.ActiveSheet.startCol + dataadd , undefined);
            // }


            try {
                // if (nwBrowser == "Firefox")
                event.preventDefault();
            } catch (err) {

            }

            return true;

            //}, true);
        }, { passive: false });



        //$("#" + containerID + "_P8Spread_Scroll").draggable({
        //    axis: "y", containment: "parent"
        //    , drag: function () {
        //        //counts[1]++;
        //        //updateCounterStatus($drag_counter, counts[1]);
        //        var scrollCount = 10;
        //        var rowcount = obj.Data.length;
        //        var t = parseInt($("#" + containerID + "_P8Spread_Scroll").css("top")._sfReplaceAll("px", ""));
        //        var h = $("#" + containerID + "_P8Spread_Scroll").outerHeight() + 1;
        //        var ch = $("#" + containerID + "_P8Spread_Scroll").parent().height();
        //        var ratio = parseFloat(h) / parseFloat(ch);
        //        var totaly = (t + h);
        //        var scrolly = rowcount * ((100 - (((ch - h) - (t)) / (ch - h) * 100)) / 100);
        //        scrolly = Math.floor(scrolly) + 1;
        //        if (scrolly >= rowcount) scrolly = rowcount;
        //        if (scrolly <= 0) scrolly = 1;

        //        //console.log("scrolly:" + scrolly);
        //        //var xlength = obj.Data.length;
        //        //if (xlength - 1 < scrolly) {

        //        //} else {

        //        //}
        //        obj.Book.ActiveSheet.ScrollRender(undefined, scrolly);



        //        //if (xy == 2)
        //        //    obj.ScrollDown();
        //        //else if (xy == 1)
        //        //    obj.ScrollUp();
        //        //else if (xy == 3)
        //        //    obj.ScrollLeft();
        //        //else if (xy == 4)
        //        //    obj.ScrollRight();

        //    }
        //});



        //$("#" + containerID + "_P8Spread_ScrollH_handler").draggable({
        //    axis: "x", containment: "parent"
        //    , drag: function (e) {
        //        //counts[1]++;
        //        //updateCounterStatus($drag_counter, counts[1]);
        //        var scrollCount = 10;
        //        var colminus = 7;//aag scroll
        //        var rowcount = obj.ColumnConfig.length - colminus;
        //        if (rowcount <= 1) rowcount = 1;
        //        var t = parseInt($("#" + containerID + "_P8Spread_ScrollH_handler").css("left")._sfReplaceAll("px", ""));
        //        var h = $("#" + containerID + "_P8Spread_ScrollH_handler").outerWidth();
        //        var ch = $("#" + containerID + "_P8Spread_ScrollH_handler").parent().width();
        //        var ratio = parseFloat(h) / parseFloat(ch);
        //        var totaly = (t + h);
        //        var scrollx = rowcount * ((100 - (((ch - h) - (t)) / (ch - h) * 100)) / 100);
        //        scrollx = Math.floor(scrollx) + 1;
        //        if (scrollx >= rowcount) scrollx = rowcount;
        //        if (scrollx <= 0) scrollx = 1;

        //        //console.log(obj.ColumnConfig.length + " " + obj.startCol + " " + scrollx);

        //        if ((obj.ColumnConfig.length - colminus) < obj.startCol) {
        //            return false;
        //        }


        //        obj.Book.ActiveSheet.ScrollRender(scrollx, undefined);

        //    }
        //});


        //}, 1);


        //column config
        // _sfLog("Column Config Start:");
        Spread_ColumnConfig = nwCreate2DArray(obj.ColumnConfig.length);
        Spread_Column_backgroundColor = [];
        for (var i = 0; i < obj.ColumnConfig.length; i++) {
            var conid = "backgroundColor";
            Spread_ColumnConfig[i][_sfGetFormatValueColumnChecker(conid)] = obj.ColumnConfig[i][conid];
            Spread_Column_backgroundColor.push(obj.ColumnConfig[i][conid]);
        }
        //_sfLog("Column Config End:");




        canvasS.addEventListener('touchstart', function (evt) { handleTouchStart(evt, obj); return false; }, false);
        canvasS.addEventListener('touchmove', function (evt) { handleTouchMove(evt, obj); return false; }, false);

        //console.log("wrap code");
        setTimeout(function () {
            if (obj.AutoWrap == true && obj.AutoWrapRender == false) _sfAutoWrap(obj);
        }, 10);

        //console.log("containerID:" + containerID);
        _sfScrollUpdateSizing(containerID);
    }



    //repos







    var myCanvas = createHiDPICanvas(canvasID, conWidth, conheight, 3);

    var canvasSheet = document.getElementById(canvasID);
    var contextSheet = canvasSheet.getContext('2d');
    var contextSheetText = canvasSheet.getContext('2d');

    var canvasSheetCurrentSelected = document.getElementById(canvasID);
    var contextCurrentSelected = canvasSheetCurrentSelected.getContext('2d');
    var contexToolBar = canvasSheetCurrentSelected.getContext('2d');



    var canvasSheetNav = document.getElementById(containerID + "_SheetConCanvas");
    //var contextSheetNav = canvasSheetNav.getContext('2d');




    var canvasSheetCon = document.getElementById(containerID);
    var elemLeft = P8Spread_elemLeft;
    var elemTop = P8Spread_elemTop;

    _sfLog("Offset:" + canvasSheet.offsetLeft + ":" + canvasSheet.offsetTop);
    var scolumn = 17;
    var srow = 26;
    var borderMargin = 1;
    var borderMarginScale = 1;
    var current_X = borderMargin;
    var current_Y = borderMargin;
    var current_Width = canvaswidth; // change to 100%
    var current_Height = def_Height;
    obj.currentCells = [];


    srow = data.length;
    try {
        scolumn = obj.ColumnConfig.length;
    } catch (err) { }
    var t_srow = srow;
    var t_scolumn = scolumn;


    // whole spread default
    var tlNumberWidth = 23;

    var tlBgColor = "#c0c7d5";
    tlNumberWidth += ((srow - 2) + "").length * 6;

    var tlHBG = "#e4ecf7";
    var tlHFont = "Arial,Tahoma";
    var tlHFontSize = 12;
    var tlHColor = "#212121";

    var tlVBG = "#e4ecf7";
    var tlVFont = "Arial,Tahoma";
    var tlVFontSize = 12;
    var tlVColor = "#212121";

    var sheetStart_x = tlNumberWidth + borderMargin;
    var defaultpadding = 2;

    var scale = 1;

    var selectedValue = "rgba(255,255,255,0.0)";

    contextSheet.scale(scale, scale);
    contextSheet.clearRect(0, 0, canvasSheet.width, canvasSheet.height);

    contextSheet.fillStyle = obj.backgroundColor;//'#CECECE'; 'green'; //
    contextSheet.fillRect(0, 0, canvasSheet.width, canvasSheet.height);



    // obj.FreezeCol
    var ix = -1;
    var ix2 = 1;
    var obj_startRow = obj.startRow;
    var icx = -1;
    var icx2 = 1;
    var obj_startCol = obj.startCol;


    var dashedarry = [3, 5];
    var dottedarry = [2, 2];
    var defaultarry = [];
    // Print Cell Records
    current_Y = borderMargin;    // srow = 0;
    current_X = borderMargin * 2;

    ix = -1;
    ix2 = 1;


    var jsonFreezeBgList = [];
    var jsonFreezeTextList = [];
    var listOfMergeDraw = [];
    var listOfMergeDrawText = [];

    var curCol = 0; // current column
    var curRow = 0; // current row
    var curXorigin = undefined;
    var curYorigin = undefined;
    var curWidth = undefined;
    var curHeight = undefined;

    if (P8Spread_currcavas != randomid) return false;

    var sheetStart_y = 0;
    var sheetStart_x = 0;
    var plusWidth = 0;
    var plusHeight = 0;
    var fontsize = 12;

    var columnWidthSize = canvaswidth * 0.35;

    srow = obj_startRow + 5;
    if (obj_startRow >= obj.Data.length) obj_startRow = obj.Data.length;

    console.log("row:" + obj_startRow);

    for (var i = obj_startRow; i < srow; i++) {
        curRow = i;


        var myCell = {
            x: (curXorigin || sheetStart_x + current_X),
            y: sheetStart_y + current_Y,
            width: (curWidth || current_Width + plusWidth),
            height: current_Height,
            borderWidth: borderMargin * borderMarginScale,
            fillStyle: "white",// tlVBG,
            strokeStyle: 'black'
            , row: curRow
            , type: "row"
        };
        contextSheet.fillStyle = myCell.fillStyle;
        contextSheet.lineWidth = myCell.borderWidth;
        contextSheet.strokeStyle = myCell.strokeStyle;
        contextSheet.fillRect(myCell.x, myCell.y, myCell.width, myCell.height);

        var option = {
            font: "bold " + tlVFontSize + "px " + tlVFont, x: defaultpadding, y: myCell.y, paddingX: defaultpadding, paddingY: defaultpadding, width: myCell.width, height: myCell.height
            , verticalAlign: "middle"
            , textAlign: "center"
            , color: tlVColor
        };
        var canvas = document.getElementById(canvasID);
        if (obj.RecordText != "aagempty") CanvasTextWrapper(canvas, obj.RecordText + curRow, option);


        current_Y += myCell.height + borderMargin;


        for (var ic = obj_startCol; ic <= scolumn; ic++) {
            curCol = ic;

            var myCell = {
                x: (curXorigin || sheetStart_x + current_X) + columnWidthSize,
                y: curYorigin || sheetStart_y + current_Y,
                width: (curWidth || current_Width + plusWidth) - columnWidthSize,
                height: curHeight || current_Height + plusHeight,
                borderWidth: borderMargin * borderMarginScale,

                fillStyle: "white",
                strokeStyle: 'black'
                , col: curCol
                , row: curRow
                , type: "cell"
                , borderMargin: borderMargin
                , selectedValue: selectedValue


                , borderColorTop: obj.gridlLineColor
                , borderColorBottom: obj.gridlLineColor
                , borderColorLeft: obj.gridlLineColor
                , borderColorRight: obj.gridlLineColor

                , borderStyleTop: "solid"
                , borderStyleBottom: "solid"
                , borderStyleLeft: "solid"
                , borderStyleRight: "solid"

                , borderWidthTop: "1"
                , borderWidthBottom: "1"
                , borderWidthLeft: "1"
                , borderWidthRight: "1"
            };

            var option = {
                font: " " + tlVFontSize + "px " + tlVFont, x: myCell.x + defaultpadding, y: myCell.y, paddingX: defaultpadding, paddingY: 2 * defaultpadding, width: myCell.width - (defaultpadding * 2), height: myCell.height - (defaultpadding * 2)
                , verticalAlign: "middle"
                , textAlign: "center"
            };
            option = _sfSetFormatText(obj, option, curCol - 1, curRow - 1);
            option.curCol = curCol;
            option.curRow = curRow;

            var canvas = document.getElementById(canvasID);
            var stringText = "";
            myCell = _sfSetFormatBox(obj, myCell, curCol - 1, curRow - 1);
            myCell.fontsize = fontsize;
            _sfCellDrawBox(obj, contextSheetText, contextSheet, myCell);

            _sfCellDrawText(canvasID, obj, contextSheet, myCell, option, selectedValue, borderMargin, contextCurrentSelected);

            var myCell = {
                x: (curXorigin || sheetStart_x + current_X),
                y: sheetStart_y + current_Y,
                width: columnWidthSize,
                height: current_Height,
                borderWidth: borderMargin * borderMarginScale,
                fillStyle: tlVBG,
                strokeStyle: 'black'
                , row: ix
                , type: "row"
            };
            contextSheet.fillStyle = myCell.fillStyle;
            contextSheet.lineWidth = myCell.borderWidth;
            contextSheet.strokeStyle = myCell.strokeStyle;
            contextSheet.fillRect(myCell.x, myCell.y, myCell.width, myCell.height);

            var option = {
                font: "bold " + tlVFontSize + "px " + tlVFont, x: defaultpadding, y: myCell.y, paddingX: defaultpadding, paddingY: defaultpadding, width: myCell.width, height: myCell.height
                , verticalAlign: "middle"
                , textAlign: "left"
                , color: tlVColor
            };
            var canvas = document.getElementById(canvasID);
            var colname = obj.ColumnName(curCol - 1);
            CanvasTextWrapper(canvas, colname, option);


            current_Y += myCell.height + borderMargin;
        }
        obj_startCol = 1;

    }

    _sfRenderEvent(obj, canvasSheet, randomid, isObjectCreated, canvasID, canvasIDOrig, contextCurrentSelected);

    //if ($('#' + containerID).attr("nwidth") == undefined || $('#' + containerID).attr("nwidth") <= 0) {
    //    var conWidth = $('#' + containerID).width();
    //    var conheight = $('#' + containerID).height();
    //    $('#' + containerID).attr("nwidth", conWidth);
    //   // $('#' + containerID).attr("nheight", conheight);
    //}

}
function _sfRenderEvent(obj, canvasSheet, randomid, isObjectCreated, canvasID, canvasIDOrig, contextCurrentSelected) {
    if (obj.havelistner == false) {
        console.log("ENDListner:" + randomid);
        _sfLog("add event:");

        obj.Events.push({ events: 1 });
        try {

        } catch (err) {
            _sfLog(err);
        }


        canvasSheet.addEventListener('mouseup', function (event) {

            obj.CellSelHover = false;
            if (obj.IsResizeHover == true && obj.IsResizeClick == true && obj.RowResizable == true && obj.IsResizeRow == true) {
                var diff = obj.IsResizeRowHeight;


                if (obj.IsResizeHoverSValue > obj.IsResizeHoverValue)
                    diff = obj.IsResizeHoverValue - obj.IsResizeHoverSValue;
                else
                    diff = obj.IsResizeHoverValue - obj.IsResizeHoverSValue;

                obj.IsResizeHover = true; obj.IsResizeClick = false; obj.IsResizeRow == false;
                var heightnew = obj.IsResizeRowHeight + diff;
                if (heightnew <= 10) heightnew = 10;
                obj.RowHeight(obj.IsResizeRowIndex, heightnew);


                $("#" + obj.canvasID).attr("isresize", 1);


                return;
            }
            if (obj.IsResizeHover == true && obj.IsResizeClick == true && obj.ColumnResizable == true) {
                var diff = obj.IsResizeColumnWidth;


                if (obj.IsResizeHoverSValue > obj.IsResizeHoverValue)
                    diff = obj.IsResizeHoverValue - obj.IsResizeHoverSValue;
                else
                    diff = obj.IsResizeHoverValue - obj.IsResizeHoverSValue;

                obj.IsResizeHover = true; obj.IsResizeClick = false;
                var widthnew = obj.IsResizeColumnWidth + diff;
                if (widthnew <= 10) widthnew = 10;
                obj.ColumnWidth(obj.IsResizeColumnIndex, widthnew);


                $("#" + obj.canvasID).attr("isresize", 1);


                return;
            }
        });

        function getCursorPosition(canvas, event) {
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            P8Spread_elemLeft = x;
            P8Spread_elemTop = y;
        }

        // cell double click
        canvasSheet.addEventListener('dblclick', SpreadDBClick, false);
        function SpreadDBClick(event, iscustom) {
            P8CurrentIDSel = obj.canvasID;

            try {
                if (obj.CellElement.type != "cell") {
                    return;
                }
            } catch (err) { }

            var isvalid = _sfSelectionActivate(obj);

            if (iscustom == undefined) iscustom = true;
            if (iscustom == true) {
                try {
                    var xdata = p8Spread_DblClickT(obj.canvasID, obj.CellSelected.row - 1, obj.CellSelected.col - 1);
                    if (xdata == false) isvalid = false;
                } catch (err) { }
            }

            var xclass = obj.ColumnConfig[obj.CellSelected.col - 1].Class;
            var classBased = _sfCheckIfClassExist(xclass, "aagnwlookupgrid");
            if (isvalid) {
                if (classBased) {
                    try {
                        var Attribute = obj.ColumnConfig[obj.CellSelected.col - 1].Attribute;
                        var selectedInput = "";
                        if (Attribute != undefined) {
                            selectedInput = Attribute.split("@#aag#@")[1];
                        }
                        if (selectedInput != undefined) {
                            p8Spread_CurBook = obj.canvasID;
                            if (_sfCheckIfClassExist(xclass, "aagAddTolist")) {
                                lookUpCustomize(selectedInput, 2, undefined, true);
                            }
                            else {
                                lookUpCustomize(selectedInput, 1, undefined, true);
                            }
                        }

                    } catch (err) { }
                }
                else {
                    _sfSpreadInputShow(obj);
                }
            }
        }


        //if (isObjectCreated == false) 
        // cell click
        // Spread Click
        canvasSheet.addEventListener('mousedown', SpreadMouseDown, false);
        canvasSheet.addEventListener('click', SpreadClick, false);

        function SpreadMouseDown(event) {
            obj.ScrollActive = false;
            obj.CellClickTime = new Date();
            //obj.CellSelHover = false;
            obj.CellSelHover = true;
        }
        function SpreadClick(event) {
            P8CurrentIDSel = obj.canvasID;

            try {
                const diffTime = Math.abs(new Date() - obj.CellClickTime);
                if (diffTime >= 200)
                    return false;
            } catch (err) { }


            obj.ScrollActive = false;
            //obj.CellSelHover = false;

            var oldRow = obj.CellSelected.row - 1;
            var oldCol = obj.CellSelected.col - 1;


            if (is_vw_inpDateHover == true) {
                return true;
            }



            if (obj.IsResizeHover == true) {
                obj.IsResizeClick = true;
                return;
            }

            // event
            var x = 0, y = 0;
            try {
                //x = event.pageX - elemLeft,
                //y = event.pageY - elemTop;
                getCursorPosition(document.getElementById(obj.canvasID + "_vw"), event);
                x = P8Spread_elemLeft;
                y = P8Spread_elemTop;
            } catch (err) { }

            //obj.currentCells.
            var objx = P8DataList[obj.canvasID][0].sheet.ActiveSheet.currentCells;
            objx.forEach(function (element) {
                if (y > element.y && y < element.y + element.height && x > element.x && x < element.x + element.width) {

                    if (element.type == "col") element.fillStyle = "transaparent";
                    if (element.type == "col") {

                        obj.CellIndexes.Col = element.col - 1;
                        obj.CellIndexes.Row = 0;
                        obj.CellIndexes.Col2 = element.col - 1;
                        obj.CellIndexes.Row2 = P8DataList[obj.canvasID][0].sheet.ActiveSheet.Data.length;
                        //obj.CellElement = element;

                        _sfSelectCell(obj, element, canvasIDOrig, canvasID, contextCurrentSelected);
                        drawRectangleSelected(obj, element, contextCurrentSelected);
                        return;
                    }
                    else if (element.type == "row") {

                        obj.CellIndexes.Col = 0;
                        obj.CellIndexes.Row = element.row - 1;
                        obj.CellIndexes.Col2 = P8DataList[obj.canvasID][0].sheet.ActiveSheet.ColumnConfig.length;
                        obj.CellIndexes.Row2 = element.row - 1;
                        //obj.CellElement = element;

                        _sfSelectCell(obj, element, canvasIDOrig, canvasID, contextCurrentSelected);
                        drawRectangleSelected(obj, element, contextCurrentSelected);
                        return;
                    }


                    //obj.CellSelHover = true;
                    obj.CellSelValue = { col: element.col - 1, row: element.row - 1 };

                    obj.CellElement = element;

                    _sfSelectCell(obj, element, canvasIDOrig, canvasID, contextCurrentSelected);


                    var addTop = element.y;
                    var addLeft = element.x;
                    _sfSelectorAdjust(obj.canvasID, addTop, addLeft, element);






                    if ($("#" + obj.canvasID + "_vw_inp").val() != "" && $("#" + obj.canvasID + "_vw_selectorCon").css("opacity") == "1") {

                        var xvalue = $("#" + obj.canvasID + "_vw_inp").val();
                        if (xvalue == '__/__/____') {
                            xvalue = "";
                        }


                        var oldvalue = obj.GetText(parseInt($("#" + obj.canvasID + "_vw_inp").attr("acol")), parseInt($("#" + obj.canvasID + "_vw_inp").attr("arow")));

                        // obj.SetText(parseInt($("#" + obj.canvasID + "_vw_inp").attr("acol")), parseInt($("#" + obj.canvasID + "_vw_inp").attr("arow")), xvalue);
                        $("#" + obj.canvasID + "_vw_inp").attr("acol2", "" + $("#" + obj.canvasID + "_vw_inp").attr("acol"));
                        $("#" + obj.canvasID + "_vw_inp").attr("arow2", "" + $("#" + obj.canvasID + "_vw_inp").attr("arow"));
                        try {
                            if (xvalue != oldvalue) {
                                if (!isNaN(oldRow) && oldRow != undefined && !isNaN(oldCol) && oldRow != undefined) {
                                    obj.SetText(parseInt($("#" + obj.canvasID + "_vw_inp").attr("acol")), parseInt($("#" + obj.canvasID + "_vw_inp").attr("arow")), xvalue, "text", true);
                                    // p8Spread_Change(obj.canvasID, oldRow, oldCol);
                                }
                            }
                            $("#" + obj.canvasID + "_vw_inp").attr("oldvalue", xvalue);
                        } catch (err) { }
                        //aag tobe continue
                    }

                    try {
                        //$("#" + obj.canvasID + "_vw_inp").blur();
                        $("#" + obj.canvasID + "_vw_inp").val("");
                        //setTimeout(function () {
                        if (_sfDetectMobile()) {

                        } else {
                            $("#" + obj.canvasID + "_vw_inp").focus();
                        }
                        // }, 151);

                    } catch (err) { }



                    //$("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "0");
                    //$("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "hidden");
                    _sfSpreadInputHide(obj);

                    //try {
                    //    $("#" + obj.canvasID + "_vw_selector").val("");
                    //    //setTimeout(function () {
                    //    $("#" + obj.canvasID + "_vw_selector").focus();
                    //    // }, 151);
                    //} catch (err) { }

                    //
                    //AAGSAMPLE

                    try {
                        if ((obj.GetObjectType(obj.CellSelected.col - 1, obj.CellSelected.row - 1) == "checkbox"
                            || obj.GetObjectType(obj.CellSelected.col - 1, obj.CellSelected.row - 1) == "checkboxtext"
                        ) && obj.GetEnabled(obj.CellSelected.col - 1, obj.CellSelected.row - 1) == true) {

                            //if (obj.ColumnConfig[obj.CellSelected.col - 1].ObjectType == "checkbox") {
                            var value = obj.GetValue(obj.CellSelected.col - 1, obj.CellSelected.row - 1);
                            if (_sfGetCheckboxValue(value)) {
                                obj.SetText(obj.CellSelected.col - 1, obj.CellSelected.row - 1, "0");
                            }
                            else {
                                obj.SetText(obj.CellSelected.col - 1, obj.CellSelected.row - 1, "1");
                            }
                        }
                    } catch (err) { }

                    _sfSelectionActivate(obj);

                    try {
                        obj.IsResizeHover = false;
                        //obj.CellSelHover = false;


                        p8Spread_ClickT(obj.canvasID, obj.CellSelected.row - 1, obj.CellSelected.col - 1);
                        p8Spread_FocusT(obj.canvasID, obj.CellSelected.row - 1, obj.CellSelected.col - 1);
                    } catch (err) { }

                    return true;
                }
            });


            _sfSpreadInputHide(obj);
            //$("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "0");
            //$("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "hidden");

        }
        if (obj.canvasID != "") {
            $(document).on("keypress", "#" + obj.canvasID + "_vw_selectorCon ", function (e) {
                if (e.which == 13) {
                    _sfSpreadInputHide(obj);
                }
            });
            $(document).on("change", "#" + obj.canvasID + "_vw_selectorCon ", function () {

                var isvalid = false;
                //if ($(this).hasClass("nwDatePickP8")) {

                //    isvalid = true;
                //}

                if (obj.canvasID == "" && isvalid == false)
                    return true;

                //return true;



                if ($("#" + obj.canvasID + "_vw_inp").attr("acol2") != $("#" + obj.canvasID + "_vw_inp").attr("acol")
                    && $("#" + obj.canvasID + "_vw_inp").attr("arow2") != $("#" + obj.canvasID + "_vw_inp").attr("arow")
                ) {

                    var xvalue = $("#" + obj.canvasID + "_vw_inp").val();
                    var oldvalue = obj.GetText(parseInt($("#" + obj.canvasID + "_vw_inp").attr("acol")), parseInt($("#" + obj.canvasID + "_vw_inp").attr("arow")));
                    var oldRow = parseInt($("#" + obj.canvasID + "_vw_inp").attr("arow"));
                    var oldCol = parseInt($("#" + obj.canvasID + "_vw_inp").attr("acol"));


                    if (P8SpreadLastCellChange.row == oldRow && P8SpreadLastCellChange.row == oldCol) {
                        return; // make return to remove duplicate change
                    }



                    try {
                        if (xvalue != oldvalue) {
                            if (!isNaN(oldRow) && oldRow != undefined && !isNaN(oldCol) && oldRow != undefined) {
                                //p8Spread_Change(obj.canvasID, oldRow, oldCol);
                                obj.SetText(oldCol, oldRow, xvalue, "text", true);
                            }


                        }

                    } catch (err) { }

                    $("#" + obj.canvasID + "_vw_inp").attr("acol2", "");
                    $("#" + obj.canvasID + "_vw_inp").attr("arow2", "");
                    $("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "0");
                    $("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "hidden");
                    $("#" + obj.canvasID + "_vw_selectorCon .P8Spread_Input.hasDatepicker").hide();
                } else {
                    $("#" + obj.canvasID + "_vw_inp").attr("acol2", "");
                    $("#" + obj.canvasID + "_vw_inp").attr("arow2", "");
                    $("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "0");
                    $("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "hidden");
                    $("#" + obj.canvasID + "_vw_selectorCon .P8Spread_Input.hasDatepicker").hide();
                }
            });
        }



        canvasSheet.addEventListener('mousemove', function (event) {
            P8CurrentIDSel = obj.canvasID;


            var mousePos = _sfGetMousePos(canvasSheet, event);

            if (obj.IsResizeClick == true) {
                obj.IsResizeHoverValue = mousePos.x;
                return;
            }

            var x = 0, y = 0;
            try {
                x = event.pageX - elemLeft,
                    y = event.pageY - elemTop;
            } catch (err) { }


            //_sfLog("column Hover : " + mousePos.x + " : " + mousePos.y);
            var iscursor = false;
            var element_width = "";
            var element_col = "";



            iscurCellSelect = obj.currentCells.forEach(function (element) {
                //if (mousePos.y >= element.y && mousePos.y <= element.y + element.height && mousePos.x >= element.x-1 && mousePos.x <= element.x + 2

                if (obj.CellSelHover == true) {
                    //_sfLog("Cell Hover Index : " + mousePos.y + ">=" + element.y + " && " + mousePos.y + " <= " + element.y + " + " + element.height
                    //    + " x :" + mousePos.x + " >= " + element.x + " && " + mousePos.x + " <= " + element.x + " + " + element.width
                    //    );

                    if (mousePos.y >= element.y && mousePos.y <= element.y + element.height
                        && mousePos.x >= element.x && mousePos.x <= element.x + element.width
                    ) {
                        _sfLog("Cell  Hover : " + p8_NumberToCell(element.col) + element.row);

                    }


                    if (mousePos.y >= element.y && mousePos.y <= element.y + element.height
                        && mousePos.x >= element.x && mousePos.x <= element.x + element.width
                        && element.type == "cell"

                        && (obj.CellIndexes.Col2 != element.col - 1
                            || obj.CellIndexes.Row2 != element.row - 1)
                    ) {
                        /// hover cell


                        obj.CellIndexes.Col2 = element.col - 1;
                        obj.CellIndexes.Row2 = element.row - 1;

                        _sfLog("column  Hover : " + obj.CellIndexes.Col2 + " : " + obj.CellIndexes.Row2);

                        //contextCurrentSelected.clearRect(0, 0, 10000, 10000);
                        obj.RenderNoEvent();
                        // obj.CellSelected
                        //drawRectangleSelected(obj, element, contextCurrentSelected);


                    }
                }

                if (mousePos.y >= element.y && mousePos.y <= element.y + element.height
                    && mousePos.x >= element.x + element.width - 2 && mousePos.x <= element.x + element.width + 2
                    && element.type == "col"
                ) {
                    _sfLog("column Hover : " + mousePos.x + " : " + mousePos.y);


                    if (element.width >= 1) {
                        element_width = element.width;
                        element_col = element.col - 1;
                        iscursor = true;
                    }


                }
            });
            //console.log(obj.CellSelHover);

            if (iscursor == true) {
                obj.IsResizeHover = true;
                obj.IsResizeHoverSValue = mousePos.x;
                obj.IsResizeColumnWidth = element_width;
                obj.IsResizeColumnIndex = element_col;
                $("#" + obj.canvasID + "_vw").css('cursor', 'col-resize');
            }
            else {
                $("#" + obj.canvasID + "_vw").css('cursor', 'default');
                obj.IsResize = false;
                obj.IsResizeHover = false;
            }


        }, false);



        /*
        left = 37
        up = 38
        right = 39
        down = 40
        */
        if (isObjectCreated == false) {
            $(document).on("change", "#" + canvasID + "_inp", function () {
                // setTimeout(function () {

                //obj.Book.ActiveSheet.SetText(0, 0, $(this).val());
                if ($(this).hasClass("nwDatePickP8")) {

                } else {
                    $("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "0");
                    $("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "hidden");
                    $("#" + obj.canvasID + "_vw_selectorCon .P8Spread_Input.hasDatepicker").hide();
                }

                // }, 1);


            });
        }




        var cmpInput = document.getElementById(canvasID + "_inp");
        var p8SpreadKeysControl = ["16", "17", "18", "33", "34", "36", "35", "19", "20", "91", "93", "112", "115", "116", "117", "118", "119", "120", "121", "122", "123", "124"];
        //, "113" F2
        //, "114" F3
        cmpInput.addEventListener('keypress', function (event) {
            // event


        }, false);





        //keypress
        cmpInput.onkeydown = function (e) {
            //  if (P8CurrentIDSel != obj.canvasID) return;
            e = e || window.event;
            var e_keyCode = e.keyCode;

            if ((e_keyCode == '113')
                && $("#" + obj.canvasID + "_vw_selectorCon").css("opacity") == "0"
            ) {
                SpreadDBClick(e);
                return false;
            }
            else if ((e_keyCode == '114')
                && $("#" + obj.canvasID + "_vw_selectorCon").css("opacity") == "0"
            ) {
                SpreadMouseDown(e);
                //lookup 
                return false;
            }
            if (e_keyCode == '13' && $("#" + obj.canvasID + "_vw_selectorCon").css("opacity") == "0") {
                e_keyCode = '40';
            }

            // event
            var isValid = true;


            var xy = 0;
            _sfLog("key down:" + e.keyCode);

            if (e_keyCode == '27') {
                $("#" + obj.canvasID + "_vw_inp").val("");
                $("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "0");
                $("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "hidden");
                $("#" + obj.canvasID + "_vw_selectorCon .P8Spread_Input.hasDatepicker").hide();
                return true;
            }

            if (e_keyCode == '38' || e_keyCode == '40' || e_keyCode == '37' || e_keyCode == '39'
                || e_keyCode == '9' || e_keyCode == '13'
            ) {
                if ($('#' + obj.canvasID + '_vw_selectorCon').css("opacity") == "1") {
                    //, "text",true
                    obj.SetText(undefined, undefined, $("#" + obj.canvasID + "_vw_inp").val(), "text", true);
                    //else obj.SetText(undefined, undefined, $("#" + obj.canvasID + "_vw_inp").val());

                    $("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "0");
                    $("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "hidden");
                    $("#" + obj.canvasID + "_vw_selectorCon .P8Spread_Input.hasDatepicker").hide();

                    try {
                        // p8Spread_Change(obj.canvasID, obj.CellSelected.row - 1, obj.CellSelected.col - 1);
                    } catch (err) { }
                    try {
                        // p8Spread_Focus(obj.canvasID, obj.CellSelected.row - 1, obj.CellSelected.col - 1);
                    } catch (err) { }

                }

            }
            else {

                var keyisavalid = true;
                try {
                    keyisavalid = p8Spread_KeyPress_Menuitem(e, obj.canvasID, obj.CellIndexes.Row, obj.CellIndexes.Col);
                } catch (err) {
                    try {
                        keyisavalid = p8Spread_KeyPress(e, obj.canvasID, obj.CellIndexes.Row, obj.CellIndexes.Col);
                    } catch (err) { }
                }
                if (keyisavalid == false) return keyisavalid;
            }

            if (e_keyCode == '38') {
                // up arrow
                if (obj.CellIndexes.Row - 1 < 0) return;

                if (obj.startRow >= obj.Data.length) {
                    obj.startRow -= obj.FreezeRow;
                }

                //obj.CellIndexes.Row -= 1;
                //obj.CellIndexes.Row2 = obj.CellIndexes.Row;

                var cell = { row: -1, col: -1 };

                var ismerge = _sfCheckIfMerge(obj, obj.CellIndexes.Col, obj.CellIndexes.Row - 1, "row", cell);
                if (ismerge) {
                    while (ismerge) {
                        obj.CellIndexes.Row -= 1;
                        obj.CellIndexes.Row2 = obj.CellIndexes.Row;
                        ismerge = _sfCheckIfMerge(obj, obj.CellIndexes.Col, obj.CellIndexes.Row, "row", cell);
                        obj.startRow -= 1;
                    }
                    obj.CellIndexes.Col = obj.CellIndexes.Col2 = cell.col;
                    obj.CellIndexes.Row += 1;
                    obj.CellIndexes.Row2 = obj.CellIndexes.Row;
                }
                else {
                    obj.CellIndexes.Row -= 1;
                    obj.CellIndexes.Row2 = obj.CellIndexes.Row;
                }

                xy = 1;
            }
            else if (e_keyCode == '40') {
                // down arrow

                //if end of theline
                if (obj.Data.length <= obj.CellIndexes.Row + 1) return;

                if (obj.CellIndexes.Row + 1 == obj.FreezeRow) {
                    if (obj.startRow != 1) obj.startRow = 0;
                    else obj.startRow = 1;
                }

                var cell = { row: -1, col: -1 };
                var ismerge = _sfCheckIfMerge(obj, obj.CellIndexes.Col, obj.CellIndexes.Row, "row", cell);
                if (ismerge) {
                    while (ismerge) {
                        obj.CellIndexes.Row += 1;
                        obj.CellIndexes.Row2 = obj.CellIndexes.Row;
                        ismerge = _sfCheckIfMerge(obj, obj.CellIndexes.Col, obj.CellIndexes.Row, "row", cell);
                    }
                    obj.CellIndexes.Col = obj.CellIndexes.Col2 = cell.col;
                }
                else {
                    obj.CellIndexes.Row += 1;
                    obj.CellIndexes.Row2 = obj.CellIndexes.Row;
                }


                xy = 2;
            }
            else if (e_keyCode == '37' || (e_keyCode == '9' && e.shiftKey)) {
                // left arrow

                var colvalue = obj.CellIndexes.Col;
                var colvalue2 = colvalue;
                var xwidth = 0;
                do {
                    colvalue -= 1;
                    colvalue2 = colvalue;
                    try {
                        xwidth = obj.ColumnConfig[colvalue].width;
                    } catch (err) {
                        xwidth = 0;
                    }
                } while (xwidth == 0 && colvalue <= obj.ColumnConfig.length - 1 && colvalue >= 0)

                if (obj.startCol >= obj.ColumnConfig.length) {
                    obj.startCol -= obj.FreezeCol;
                }

                if (colvalue < 0) return;

                var cell = { row: -1, col: -1 };
                var ismerge = _sfCheckIfMerge(obj, obj.CellIndexes.Col - 1, obj.CellIndexes.Row, "col", cell);
                if (ismerge == true) {
                    colvalue = cell.col;
                    obj.startCol = colvalue;
                    obj.CellIndexes.Row = obj.CellIndexes.Row2 = cell.row;

                }

                if ((xwidth == 0 && colvalue <= obj.ColumnConfig.length - 1)) {

                } else {
                    obj.CellIndexes.Col = colvalue;
                    obj.CellIndexes.Col2 = colvalue2;
                }

                xy = 3;
                if ((e_keyCode == '9' && e.shiftKey))
                    isValid = false;
            }
            else if (e_keyCode == '39' || (e_keyCode == '9')) {
                // right arrow
                if (obj.CellIndexes.Col >= obj.ColumnConfig.length) return;

                var colvalue = obj.CellIndexes.Col;
                var colvalue2 = colvalue;
                var xwidth = 0;
                do {
                    colvalue += 1;
                    colvalue2 = colvalue;
                    colvalue2 = colvalue;
                    try {
                        xwidth = obj.ColumnConfig[colvalue].width;
                    } catch (err) {
                        xwidth = 0;
                    }
                } while (xwidth == 0 && colvalue <= obj.ColumnConfig.length - 1)
                if ((xwidth == 0 && colvalue <= obj.ColumnConfig.length - 1)) {

                }
                else if (colvalue >= obj.ColumnConfig.length) {
                    return;
                }
                else {
                    obj.CellIndexes.Col = colvalue;
                    obj.CellIndexes.Col2 = colvalue2;
                }

                xy = 4;
                if ((e_keyCode == '9'))
                    isValid = false;
            }
            //else if (e_keyCode== '9' && e.shiftKey) {
            //    // Shift + Tab
            //    if (obj.CellIndexes.Col - 1 < 0) return;
            //    obj.CellIndexes.Col -= 1;
            //    obj.CellIndexes.Col2 = obj.CellIndexes.Col;
            //    xy = 4; isValid = false;
            //}
            //else if (e_keyCode== '9') {
            //    // Tab
            //    if (obj.CellIndexes.Col >= obj.ColumnConfig.length - 1) return;

            //    var colvalue = obj.CellIndexes.Col;
            //    var colvalue2 = colvalue;
            //    var xwidth = 0;
            //    do {
            //        colvalue += 1;
            //        colvalue2 = colvalue;
            //        try {
            //            xwidth = obj.ColumnConfig[colvalue].width;
            //        } catch (err) {
            //            xwidth = 0;
            //        }
            //    } while (xwidth == 0 && colvalue <= obj.ColumnConfig.length - 1)
            //    if ((xwidth == 0 && colvalue <= obj.ColumnConfig.length - 1)) {

            //    } else if (colvalue >= obj.ColumnConfig.length) {
            //        return;
            //    } else {
            //        obj.CellIndexes.Col = colvalue;
            //        obj.CellIndexes.Col2 = colvalue2;
            //    }

            //    xy = 4; isValid = false;
            //}


            if (xy >= 1 && xy <= 4) {

                $("#" + obj.canvasID + "_vw_inp").val("");

                obj.CellIndexes.Col2 = obj.CellIndexes.Col;
                obj.CellIndexes.Row2 = obj.CellIndexes.Row;

                var scrollcount = 1;
                var isScrolled = false;

                //check width next scroll
                var conWidthDraw = conWidth - (100);
                var icounter = obj.startCol - 1;
                icounter += obj.FreezeCol;
                icounter -= 1;
                var applyfreezeW = 0;

                //console.log("width checker");
                while (conWidthDraw >= 0) {
                    var widthcol = def_Width;
                    try {
                        widthcol = obj.ColumnConfig[icounter].width;
                    } catch (err) { }

                    if (applyfreezeW < obj.FreezeCol) {
                        widthcol = obj.ColumnConfig[applyfreezeW].width;
                        applyfreezeW++;
                        // if ((conWidthDraw - widthcol) <= 0) break;
                        // console.log(_sfGetCellName(obj, applyfreezeW) + " " + (conWidthDraw - widthcol) + " " + applyfreezeW);
                    }
                    else {
                        icounter++;
                        // if ((conWidthDraw - widthcol) <= 0) break;
                        //console.log(_sfGetCellName(obj, icounter) + " " + (conWidthDraw - widthcol) + " " + icounter);
                    }

                    conWidthDraw -= widthcol;
                    if (conWidthDraw <= 0 && xy == 4 && obj.CellIndexes.Col >= icounter) { isScrolled = true; }
                    if (icounter >= 1000) break;
                    // if (icounter >= 50) { console.log("aa"); break; }
                }




                if (isScrolled) {
                    scrollcount += 1;
                }

                //scrollcount += 3;


                var isconnect = false;

                if (isScrolled == false) {
                    obj.currentCells.forEach(function (element) {

                        if (obj.CellIndexes.Col == element.col - 1 && obj.CellIndexes.Row == element.row - 1) {
                            try {
                                $("#" + obj.canvasID + "_vw_inp").val("");
                            } catch (err) { }

                            _sfSelectCell(obj, element, canvasIDOrig, canvasID, contextCurrentSelected);

                            isconnect = true;
                        }
                        else {

                        }

                    });
                }


                // fixed the scroll down
                var highrow = -1;
                var lowrow = -1;
                obj.currentCells.forEach(function (element) {
                    if (element.row - 1 > highrow) {
                        highrow = element.row - 1;
                    }
                    if (element.row - 1 <= lowrow) {
                        lowrow = element.row - 1;
                    }
                });
                if (obj.CellIndexes.Row >= highrow - (obj.CellRowMaxAdd - 1)) {
                    scrollcount = scrollcount;
                    isconnect = false;
                }



                if (isconnect == false) {

                    if (xy == 2) {
                        obj.ScrollDown(scrollcount);
                    }
                    else if (xy == 1)
                        obj.ScrollUp(scrollcount);
                    else if (xy == 3)
                        obj.ScrollLeft(scrollcount);
                    else if (xy == 4)
                        obj.ScrollRight(scrollcount);
                }
                setTimeout(function () {
                    try {
                        p8Spread_FocusT(obj.canvasID, obj.CellIndexes.Row, obj.CellIndexes.Col);
                    } catch (err) { }

                }, 1);;
            }
            else if (e_keyCode == "46") // delete key   //|| e_keyCode== "8" backspace
            {
                var rowstart = obj.CellIndexes.Row;
                var containerlen = 0;
                obj.RenderStatus = false;
                for (var i = rowstart; i <= obj.CellIndexes.Row2; i++) {
                    for (var ic = obj.CellIndexes.Col; ic <= obj.CellIndexes.Col2; ic++) {
                        obj.RenderStatus = false;
                        if (_sfCheckEnable(obj, i, ic)) {
                            obj.SetText(ic, i, "", "text", true);
                            try {
                                //p8Spread_Change(obj.canvasID, i - 1, ic - 1);
                            } catch (err) { }
                        }



                    }
                }
                setTimeout(function () {

                    obj.RenderStatus = true;
                    obj.ScrollActive = true;
                    obj.RenderNoEvent();
                    // _sfSelectCell(obj, element, canvasIDOrig, canvasID, contextCurrentSelected);
                }, 100);
                return true;
            }
            else {
                if (
                    ((e.ctrlKey || e.altKey || e.shiftKey) && p8SpreadKeysControl.indexOf(e_keyCode + "") >= 0 && $("#" + obj.canvasID + "_vw_selectorCon").css("opacity") != "1")
                    || p8SpreadKeysControl.indexOf(e_keyCode + "") >= 0
                )
                    isValid = false;
                else {
                    var isvalid = _sfSelectionActivate(obj);

                    if (isvalid && e.ctrlKey == false) {
                        _sfSpreadInputShow(obj, true);
                        //$("#" + obj.canvasID + "_vw_inp").attr("acol", obj.CellIndexes.Col);
                        //$("#" + obj.canvasID + "_vw_inp").attr("arow", obj.CellIndexes.Row)
                        //$("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "1");
                        //$("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "visible");
                        //aagbenedict
                        //if (obj.GetDataType() == "date") {
                        //    $("#" + obj.canvasID + "_vw_selectorCon .P8Spread_Input.hasDatepicker").show();
                        //}
                    }


                }

                //if (e_keyCode== '67' && e.ctrlKey) //copy
                //{

                //}

                if (e_keyCode == '86' && e.ctrlKey) //paste  //&& $("#" + obj.canvasID + "_vw_selectorCon").css("opacity")=="0"
                {
                    if (document.activeElement.classList.contains('P8Spread_Input')) {
                        $("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "0");
                        $("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "hidden");
                        $("#" + obj.canvasID + "_vw_selectorCon .P8Spread_Input.hasDatepicker").hide();
                        $('#' + obj.canvasID + '_vw_inpText').val("");
                        //ksg, to fixed multiple grid
                        //$('#' + obj.canvasID + '_vw_inpText').focus();
                        setTimeout(function () {
                            //console.log($('#' + obj.canvasID + '_vw_inpText').val());
                            $('#' + obj.canvasID + '_vw_inpText').addClass("paste");
                            _sfPaste(obj);
                        }, 100);
                    }
                    return true;
                }
                //else if(e.ctrlKey) //paste
                //{
                //    $('#' + obj.canvasID + '_vw_inpText').val("");
                //    $('#' + obj.canvasID + '_vw_inpText').focus();
                //    return true;
                //}





            }

            return isValid;
            //return isValid;
        };

        var isCopying = false;
        $(document).keydown(function (e) {
            if (P8CurrentIDSel != obj.canvasID) return;

            var isSpread = false;

            if (e.ctrlKey == false) return true;



            //if (e.keyCode == 67 && e.ctrlKey) {
            //    //if ($(":focus").hasClass("P8Spread_Input")) {
            //    //    return true;
            //    //}
            //    console.log("copy");
            //    //if(isIe)
            //    // setTimeout(function () {
            //    //alert("CTRL+c");
            //    //if (isCopying == false) {
            //    //  isCopying = true;
            //    try {
            //        textToPutOnClipboardHTML = "<table p8style=' border-collapse: collapse;'>";
            //        _sfP8Spread_Copy(obj, e);
            //        textToPutOnClipboardHTML += "</table>";
            //        _sfLog("Length to be Copied:" + textToPutOnClipboardHTML.length);
            //        _sfCopy(textToPutOnClipboardHTML, obj.canvasID);

            //        //setTimeout(function () { isCopying = false; }, 1000);
            //    } catch (err) { isCopying = false; }
            //    //}
            //    // }, 10);
            //    //copyToClipboardCrossbrowser("wewe");
            //    return false;
            //}
            if (e.keyCode == 67 && e.ctrlKey) {
                console.log("copy");
                try {
                    _sfP8Spread_Copy(obj, e, undefined, "copy");
                    _sfLog("Length to be Copied:" + textToPutOnClipboardHTML.length);
                    _sfCopy(textToPutOnClipboardHTML, obj.canvasID);

                } catch (err) { isCopying = false; }

                return false;
            }
            else if (e.keyCode == 86 && e.ctrlKey) {
                //check if focusing in spread
                if (document.activeElement.classList.contains('P8Spread_Input')) {
                    $('#' + obj.canvasID + '_vw_inpText').val("");
                    //ksg, to fixed multiple grid
                    //$('#' + obj.canvasID + '_vw_inpText').focus();
                    if ($(":focus").hasClass("P8Spread_Input")) {
                        return true;
                    }
                    console.log("paste");
                    $('#' + obj.canvasID + '_vw_inpText').addClass("paste");
                    setTimeout(function () {
                        _sfPaste(obj);
                    }, 10);
                }
                return true;
            }


        });


        obj.havelistner = true;
    }
}


function _sfRenderObjects(obj) {
    //aagedit
    var count = 0;
    try {
        count = obj.imagelist.length;
    } catch (err) { }

    var xheight = 0; // 25.5; // temp only
    //xheight = (obj.startRow - 1) * 25.5;;

    var xrows = 0;
    //if(obj.FreezeRow < obj.startRow)xrows = obj.startRow-obj.FreezeRow;
    xrows = obj.startRow - 1;
    try {
        //var rowh = obj.Data[i].aagrowHeight || (def_Height + 0);
        var rowh = obj.Data[i].aagrowHeight == undefined ? def_Height : obj.Data[i].aagrowHeight;
    } catch (ex) {
        var rowh = (def_Height + 0)
    }

    var xwidth = 0;
    //var xcols = 0;
    //if(obj.FreezeRow < obj.startRow)xrows = obj.startRow-obj.FreezeRow;
    // xcols = obj.startCol - 1;

    for (var i = obj.FreezeCol; i < obj.startCol; i++) {
        if (i < 0) continue;
        var xfreeze = obj.FreezeCol;
        if (xfreeze >= 1) xfreeze = xfreeze - 1;
        //xfreeze +
        var colw = parseFloat(obj.GetColumnWidth(i));
        xwidth += colw;
    }



    var canvasid = obj.canvasID + '_vw';
    for (var i = 0; i < count; i++) {
        var x = obj.imagelist[i].x;
        var y = obj.imagelist[i].y;
        var width = obj.imagelist[i].width;
        var height = obj.imagelist[i].height;
        var img = obj.imagelist[i].img;

        x -= xwidth;
        y -= xheight;

        var canvas = document.getElementById(canvasid);
        var ctx = canvas.getContext("2d");

        var image = new Image();
        image.onload = function () {
            // ctx.drawImage(image, x, y);

            ctx.drawImage(image, xwidth, xheight
                , width, height
                , x + xwidth, y + xheight
                , width, height
            );

            //ctx.drawImage(image,
            //     70, 20,   // Start at 70/20 pixels from the left and the top of the image (crop),
            //     50, 50,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
            //     0, 0,     // Place the result at 0, 0 in the canvas,
            //     100, 100); // With as width / height: 100 * 100 (scale)
        };
        image.src = img;


    }

}

function canvasGridCreate(canvasID, obj) {
    var containerID = obj.canvasID;


    if (($("#" + containerID).html() || "") != "") {
        return;
    }
    obj.ScrollActive = false;

    var scrollWidth = 15;
    var x_html = "";
    _sfLog("Grid Initialize:" + ":");
    $('#' + containerID).html("");
    $('#' + containerID).attr("intanceid", containerID + "-" + _sfnwRandomString(30));
    $('#' + containerID).addClass("table-width-fixed");
    //$('#' + containerID).addClass("nwGrid");


    // draw button

    var strbut = _sfnwGridButtonsNew(obj.Book);
    x_html += strbut;



    x_html += "<div  class='table-wrapper table-wrapper-np'>";
    x_html += "<table class='table'>";


    x_html += "<colgoup>";
    x_html += "<col>";
    x_html += "</col>";
    for (var i = 0; i < obj.ColumnConfig.length; i++) {
        x_html += "<col p8style='width:" + obj.ColumnConfig[i]['ColumnWidth'] + "px;min-width:" + obj.ColumnConfig[i]['ColumnWidth'] + "px;max-width:" + obj.ColumnConfig[i]['ColumnWidth'] + "px;'>";
        x_html += "</col>";
    }
    x_html += "</colgoup>";

    x_html += "<thead>";
    x_html += "<th data-type='str' scope='col' class='tbl-row-num'>#</th>";
    x_html += "</th>";
    for (var i = 0; i < obj.ColumnConfig.length; i++) {
        x_html += "<th data-type='str' scope='col'>";
        x_html += obj.ColumnConfig[i]['name'];
        x_html += "</th>";
    }
    x_html += "</thead>";


    x_html += "<tbody>";

    for (var irow = 0; irow < obj.Data.length; irow++) {
        x_html += "<tr>";
        var arraydata = [];


        x_html += "<th scope='row' class='tbl-row-num'>" + (irow + 1) + "</th>";
        for (var icol = 0; icol < obj.ColumnConfig.length; icol++) {
            var stringText = "";
            var strTemplate = obj.ColumnConfig[icol]['ColumnTemplate'];
            var colname = obj.ColumnConfig[icol]['name'];
            try {
                stringText = ""; //data[i-1][Object.keys(obj.Data[i-1])[ic-1]];
                stringText = obj.GetValue(icol, irow);//;data[i - 1][Object.keys(obj.Data[i - 1])[ic - 1]];

                try {
                    var stringText2 = obj.GetText2(icol, irow);
                    if ((stringText2 != "" && stringText2 != undefined && stringText2 != NaN))
                        stringText = stringText2;
                } catch (err) {
                }
            } catch (err) { }
            arraydata.push((stringText + ""));

            if (strTemplate.trim() != "") {
                stringText = strTemplate;
            }

            x_html += "<td scope='col' row-th='" + colname + "' class='tb-align-right'>";
            x_html += stringText;
            x_html += "</td>";
        }
        x_html = String.Format(x_html, ...arraydata);

        x_html += "</tr>";
    }
    if (obj.Data.length <= 0) {
        x_html += "<tr><td><div class='norecord'>no record(s)</div></td></tr>";
    }
    x_html += "</tbody>";


    x_html += "</table>";
    x_html += "</div>";


    $('#' + containerID).html(x_html);
    $('#' + containerID).addClass("P8Grid");
    $('#' + containerID).addClass("table-tabs-wrapper");
    $('#' + containerID).addClass("rescale-ready");
    $('#' + containerID).attr('nk-table-style', 1);


    $('#' + containerID).attr('isresize', 0);
    $('#' + containerID).attr('isresetsize', 0);




    //scheight = $('#' + containerID + '_vw_tbl').outerHeight() - aminus;
    //$('#' + containerID).find(".P8Spread_Scroll").css("min-height", scheight);
}

function _sfCellDrawBox(obj, contextSheetText, contextSheet, myCell) {

    var objecttype = obj.GetObjectType(myCell.col - 1, myCell.row - 1);


    contextSheetText.font = myCell.fontsize + "px Arial";
    contextSheetText.fillStyle = "black";
    if (myCell.fillStyle == "inherit" || objecttype == "button" || objecttype == "remarks")
        contextSheet.fillStyle = "white";
    else
        contextSheet.fillStyle = myCell.fillStyle;



    contextSheet.lineWidth = myCell.borderWidth;
    contextSheet.strokeStyle = myCell.strokeStyle;
    contextSheet.fillRect(myCell.x, myCell.y, myCell.width, myCell.height);
    contextSheet.closePath();

    var bgcolorPercValue = myCell.bgcolorPercValue || 0;
    if (bgcolorPercValue > 0) {
        contextSheet.beginPath();
        contextSheet.fillStyle = myCell.bgcolorPerc;
        if (bgcolorPercValue >= 1) bgcolorPercValue = 1.0;
        contextSheet.fillRect(myCell.x, myCell.y, myCell.width * bgcolorPercValue, myCell.height);
        contextSheet.closePath();
    }

    contextSheet.closePath();

    obj.currentCells.push(myCell);
}



function _sfCellDrawText(canvasID, obj, contextSheet, myCell, option, selectedValue, borderMargin, contextCurrentSelected, isSpread) {
    if (isSpread == undefined) isSpread = true;
    var dashedarry = option.dashedarry;
    var dottedarry = option.dottedarry;
    var curCol = option.curCol;
    var curRow = option.curRow;
    var img_sizeWidth = option.img_sizeWidth;
    var img_sizeHeight = option.img_sizeHeight;

    var curWidth = option.curWidth;
    var curHeight = option.curHeight;




    var canvas = document.getElementById(canvasID);
    //contextSheet.globalCompositeOperation = 'source-over';

    //border top
    if (myCell.borderWidthTop != "none") {
        contextSheet.beginPath();
        contextSheet.lineWidth = myCell.borderWidthTop;
        contextSheet.strokeStyle = myCell.borderColorTop;

        var xwidth = myCell.borderWidthTop;
        xwidth = parseFloat(xwidth);
        if (myCell.borderStyleTop == "double") {
            contextSheet.lineWidth = (xwidth * 1) + 3;
        }

        if (myCell.borderStyleTop == "dashed")
            contextSheet.setLineDash(dashedarry);
        else if (myCell.borderStyleTop == "dotted")
            contextSheet.setLineDash(dottedarry);
        else
            contextSheet.setLineDash([]);

        contextSheet.moveTo(myCell.x - 1, myCell.y - 0.5);
        contextSheet.lineTo(myCell.x + myCell.width + 1, myCell.y - 0.5);
        contextSheet.stroke();

        if (myCell.borderStyleTop == "double") {
            contextSheet.globalCompositeOperation = 'destination-out';
            contextSheet.lineWidth = (xwidth * 1);
            contextSheet.stroke();
            contextSheet.globalCompositeOperation = 'source-over';
        }
    }
    // border bottom
    if (myCell.borderWidthBottom != "none") {
        contextSheet.beginPath();
        contextSheet.lineWidth = myCell.borderWidthBottom;
        contextSheet.strokeStyle = myCell.borderColorBottom;
        if (myCell.borderStyleBottom == "dashed")
            contextSheet.setLineDash(dashedarry);
        else if (myCell.borderStyleBottom == "dotted")
            contextSheet.setLineDash(dottedarry);
        else
            contextSheet.setLineDash([]);

        var xwidth = myCell.borderWidthBottom;
        xwidth = parseFloat(xwidth);
        if (myCell.borderStyleBottom == "double") {
            contextSheet.lineWidth = (xwidth * 1) + 3;
        }

        contextSheet.moveTo(myCell.x - 1, myCell.y + myCell.height + 0.5);
        contextSheet.lineTo(myCell.x + myCell.width + 1, myCell.y + myCell.height + 0.5);
        contextSheet.stroke();

        if (myCell.borderStyleBottom == "double") {
            contextSheet.globalCompositeOperation = 'destination-out';
            contextSheet.lineWidth = (xwidth * 1);
            contextSheet.stroke();
            contextSheet.globalCompositeOperation = 'source-over';
        }
    }
    // border Right
    if (myCell.borderWidthRight != "none") {
        contextSheet.beginPath();
        contextSheet.lineWidth = myCell.borderWidthRight;
        contextSheet.strokeStyle = myCell.borderColorRight;

        var xwidth = myCell.borderWidthRight;
        xwidth = parseFloat(xwidth);
        if (myCell.borderStyleRight == "double") {
            contextSheet.lineWidth = (xwidth * 1) + 3;
        }


        if (myCell.borderStyleRight == "dashed")
            contextSheet.setLineDash(dashedarry);
        else if (myCell.borderStyleRight == "dotted")
            contextSheet.setLineDash(dottedarry);
        else
            contextSheet.setLineDash([]);

        contextSheet.moveTo(myCell.x + myCell.width + 0.5, myCell.y - 1);
        contextSheet.lineTo(myCell.x + myCell.width + 0.5, myCell.y + myCell.height);
        contextSheet.stroke();

        if (myCell.borderStyleRight == "double") {
            contextSheet.globalCompositeOperation = 'destination-out';
            contextSheet.lineWidth = (xwidth * 1);
            contextSheet.stroke();
            contextSheet.globalCompositeOperation = 'source-over';
        }
    }
    // border Left
    if (myCell.borderWidthLeft != "none") {
        contextSheet.beginPath();
        contextSheet.lineWidth = myCell.borderWidthLeft;
        contextSheet.strokeStyle = myCell.borderColorLeft;

        var xwidth = myCell.borderWidthLeft;
        xwidth = parseFloat(xwidth);
        if (myCell.borderStyleLeft == "double") {
            contextSheet.lineWidth = (xwidth * 1) + 3;
        }


        if (myCell.borderStyleLeft == "dashed")
            contextSheet.setLineDash(dashedarry);
        else if (myCell.borderStyleLeft == "dotted")
            contextSheet.setLineDash(dottedarry);
        else
            contextSheet.setLineDash([]);

        contextSheet.moveTo(myCell.x - 0.5, myCell.y - 1);
        contextSheet.lineTo(myCell.x - 0.5, myCell.y + myCell.height);
        contextSheet.stroke();

        if (myCell.borderStyleLeft == "double") {
            contextSheet.globalCompositeOperation = 'destination-out';
            contextSheet.lineWidth = (xwidth * 1);
            contextSheet.stroke();
            contextSheet.globalCompositeOperation = 'source-over';
        }
    }



    var stringText = "";
    var stringValue = "";
    if (obj.ShowFormula == true && isSpread == true) {
        stringText = obj.GetFormula(curCol - 1, curRow - 1);
    }
    else {
        try {
            stringText = ""; //data[i-1][Object.keys(obj.Data[i-1])[ic-1]];
            stringText = obj.GetValue(curCol - 1, curRow - 1);//;data[i - 1][Object.keys(obj.Data[i - 1])[ic - 1]];
            stringValue = stringText;
            try {
                var stringText2 = obj.GetText2(curCol - 1, curRow - 1);
                if ((stringText2 != "" && stringText2 != undefined && stringText2 != NaN))
                    stringText = stringText2;
            } catch (err) {

            }

        } catch (err) { }
    }


    ////format
    ////obj.CellSelected.col 
    stringText = _sfDataTypeFormater(obj, option, stringText, false);

    stringText = stringText.replaceAll("nwNewLine", "\n").replaceAll("anwNewXLineX", "\n");

    try {
        if (obj.ColumnConfig[curCol - 1].width < 5) {
            stringText = "";
        }
    } catch (err) { }



    if (option.tagText == "0") stringText = "";

    ////display format
    //if (option.dataType == "number") {
    //    stringText = _sfNumberFormat(stringText, 2, ".", ",");
    //}

    stringText = stringText.replaceAll("&nbsp;", " ");

    //display object
    var cobjecttype = _sfCheckObjectType(obj, curRow - 1, curCol - 1);
    if (cobjecttype == "checkbox" || cobjecttype == "checkboxtext") {

        //var img = new Image();
        var value = obj.GetValue(curCol - 1, curRow - 1);
        value = (value || "");
        var tempoption = JSON.parse(JSON.stringify(option));
        option.x = (option.width - img_sizeWidth) / 2 + option.x;
        option.y = ((option.height - img_sizeHeight) / 2) + option.y;
        option.width = img_sizeWidth;
        option.height = img_sizeHeight;

        if (cobjecttype == "checkboxtext") {
            option.x = tempoption.x + 0;

            tempoption.x += img_sizeWidth + 2;
            tempoption.width -= img_sizeWidth + 2;
            CanvasTextWrapper(canvas, stringText, tempoption);

        }

        // img.src = img_CheckboxTrue; 
        if (_sfGetBooleanValue(value))
            _sfDrawCheckBox(contextSheet, option.x, option.y, option.width, option.height, true);
        else
            _sfDrawCheckBox(contextSheet, option.x, option.y, option.width, option.height, false);
        //img.src = img_Checkbox;

        //try {
        //    contextSheet.drawImage(img, option.x, option.y, option.width, option.height);
        //} catch (err) { console.log("error log:" + err); }
    }
    else if (cobjecttype == "button" || cobjecttype == "remarks") {

        var bgcolorvalue = option.backgroundColor;

        if (cobjecttype == "remarks" && (stringValue + "").trim() != "")
            bgcolorvalue = "green";

        _sfDrawButton(contextSheet, option.x, option.y + 1, option.width, option.height + 2, bgcolorvalue);
        CanvasTextWrapper(canvas, stringText, option);

    }
    else {
        var indent = obj.GetTextIndent(curCol - 1, curRow - 1);
        if (indent > 0) {
            //var align = obj.GetTextAlign(curCol - 1, curRow - 1);
            var totalindent = indent * 5;
            option.x = option.x + totalindent;
            option.width = option.width - totalindent;
        }
        if ((option.currencyCode || "") != "") {
           
            if (p8Spread_IsNull(stringText)) {
                CanvasTextWrapper(canvas, stringText, option);
            } else {
                var currencyCode = option.currencyCode;
                var symbols = P8Spread_Currency[currencyCode].symbols;
                var align = P8Spread_Currency[currencyCode].align;

                if (align == "L") {

                    let copiedoption = Object.assign({}, option);
                    copiedoption.textAlign = "left";
                    CanvasTextWrapper(canvas, symbols, copiedoption);


                    var diffwidth = 0;
                    option.width -= diffwidth;
                    option.x += diffwidth;
                    if (stringText == NaN) stringText = "";
                    CanvasTextWrapper(canvas, stringText, option);

                } else {
                    if (stringText == NaN) stringText = "";
                    CanvasTextWrapper(canvas, stringText + " " + symbols, option);
                }
            }
        }
        else
            CanvasTextWrapper(canvas, stringText, option);
    }



    if (obj.Book.ActiveSheet.CellIndexes.Col + 1 == curCol && obj.Book.ActiveSheet.CellIndexes.Row + 1 == curRow) //&& obj.Book.ActiveSheet.ScrollActive == true
    {
        var myCell = {
            x: myCell.x,// curXorigin || sheetStart_x + current_X,
            y: myCell.y, //curYorigin || sheetStart_y + current_Y,
            width: curWidth,
            height: curHeight,
            stroke: "black",
            borderWidth: borderMargin * 2,
            fillStyle: selectedValue,
            strokeStyle: 'dotted'
            , col: curCol
            , row: curRow
            , type: "cellselected"
            , borderMargin: borderMargin
            , selectedValue: selectedValue
        };


        obj.CellSelected = myCell;

        setTimeout(function () {
            drawRectangleSelected(obj, obj.CellSelected, contextCurrentSelected);
        }, 0);
        obj.ScrollActive = false;
    }
}

function _sfDataTypeFormater(obj, xoption, stringText, getdataonly) {

    if (stringText == undefined) stringText = "";
    stringText += "";

    var finaldataType = xoption.dataType;
    if (getdataonly == undefined) getdataonly = false;

    //console.log("datatype:" + finaldataType);

    if (finaldataType == undefined || finaldataType == "") {
        try {
            var tempstr = obj.ColumnConfig[xoption.col].dataType;
            if (tempstr != undefined) finaldataType = tempstr;
        } catch (err) { }
    }
    var precision = 2;
    var thousandSeparator = ",";

    try {

        precision = obj.GetPrecision(xoption.col, xoption.row);

        if (precision == undefined)
            precision = obj.ColumnConfig[xoption.col].Precision;



        if (precision == undefined || precision == null) precision = 2;
    } catch (err) { }





    //display format
    if (finaldataType == "currency") {
        var _stringText = stringText.replaceAll(" ", "").replaceAll(",", "");
        if (!isNaN(_stringText) && (_stringText + "").trim() != "") {
            _stringText = _sfNumberFormat(_stringText, precision, ".", thousandSeparator);
            if (getdataonly == false && !p8Spread_IsNull(obj.GetCurrencyCode(xoption.col, xoption.row))) xoption.textAlign = "right";
            // if (getdataonly == false) xoption.textAlign = obj.GetTextAlign(xoption.col, xoption.row);
            stringText = _stringText;
        }
    }
    else if (finaldataType == "percent") {
        var _stringText = stringText.replaceAll(" ", "").replaceAll(",", "").replaceAll("%", "");
        if (!isNaN(_stringText) && (_stringText + "").trim() != "") {
            _stringText = _sfNumberFormat(_stringText, precision, ".", thousandSeparator);
            //  if (getdataonly == false) xoption.textAlign = "right";
            if (getdataonly == false) xoption.textAlign = obj.GetTextAlign(xoption.col, xoption.row);
            _stringText += " %";
            stringText = _stringText;
        }
    }
    else if (finaldataType == "percentvalue") {
        if (!isNaN(stringText) && (stringText + "").trim() != "") {
            stringText = stringText * 100.0;
            stringText = _sfNumberFormat(stringText, precision, ".", thousandSeparator);
            //   if (getdataonly == false) xoption.textAlign = "right";
            if (getdataonly == false) xoption.textAlign = obj.GetTextAlign(xoption.col, xoption.row);
            stringText += " %";
        }
    }
    else if (finaldataType == "number") {
        if (!isNaN(stringText) && (stringText + "").trim() != "") {
            // stringText = _sfNumberFormat(stringText, 2, '.', '');
            //  if (getdataonly == false) xoption.textAlign = "right";
            if (getdataonly == false) xoption.textAlign = obj.GetTextAlign(xoption.col, xoption.row);
        }
    }
    else if (finaldataType == "datetime") {
        var d = new Date((stringText + "").trim());
        if (d instanceof Date && !isNaN(d)) {
            var xstringText = _sfDateFormat(stringText, false);
            if (xstringText != undefined) {
                stringText = xstringText;
                //if (getdataonly == false) xoption.textAlign = "right";
            }
        }
    }
    else if (finaldataType == "date") {
        var d = new Date((stringText + "").trim());
        if (d instanceof Date && !isNaN(d)) {
            //if (stringText.length > 12 && obj.GetDataType(xoption.col, xoption.row)) {

            //}
            //else {
            var xstringText = _sfDateFormat(stringText, true);

            if (xstringText != undefined) {
                stringText = xstringText;
                // if (getdataonly == false) xoption.textAlign = "right";
                if (getdataonly == false) xoption.textAlign = obj.GetTextAlign(xoption.col, xoption.row);
            }
            // }

        }
        //stringText = _sfNumberFormat(stringText, 2, ".", ",");
    }

    if (finaldataType == "currency" || finaldataType == "percent" || finaldataType == "percentvalue" || finaldataType == "number") {
        if (parseFloat(stringText) < 0) stringText = "(" + stringText.replace("-", "") + ")";
    }

    return stringText;
}


function _sfNumberFormat(number, decimals, dec_point, thousands_sep) {
    // *     example 1: _sfNumberFormat(1234.56);
    // *     returns 1: '1,235'
    // *     example 2: _sfNumberFormat(1234.56, 2, ',', ' ');
    // *     returns 2: '1 234,56'
    // *     example 3: _sfNumberFormat(1234.5678, 2, '.', '');
    // *     returns 3: '1234.57'
    // *     example 4: _sfNumberFormat(67, 2, ',', '.');
    // *     returns 4: '67,00'
    // *     example 5: _sfNumberFormat(1000);
    // *     returns 5: '1,000'
    // *     example 6: _sfNumberFormat(67.311, 2);
    // *     returns 6: '67.31'
    // *     example 7: _sfNumberFormat(1000.55, 1);
    // *     returns 7: '1,000.6'
    // *     example 8: _sfNumberFormat(67000, 5, ',', '.');
    // *     returns 8: '67.000,00000'
    // *     example 9: _sfNumberFormat(0.9, 0);
    // *     returns 9: '1'
    // *    example 10: _sfNumberFormat('1.20', 2);
    // *    returns 10: '1.20'
    // *    example 11: _sfNumberFormat('1.20', 4);
    // *    returns 11: '1.2000'
    // *    example 12: _sfNumberFormat('1.2000', 3);
    // *    returns 12: '1.200'
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        toFixedFix = function (n, prec) {
            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
            var k = Math.pow(10, prec);
            return Math.round(n * k) / k;
        },
        s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);

}

function _sfDateFormat(value, isdateonly) {

    var today = new Date(value);
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    var dd = today.getDate();
    var hh = today.getHours();
    var min = today.getMinutes();
    var ss = today.getSeconds();

    var ampm = "AM";

    if (isdateonly == undefined) isdateonly = false;


    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    if (hh >= 12) {
        ampm = "PM";
    }
    if (hh > 12) {
        hh = hh - 12;
    }

    if (hh == 0) {
        hh = 12;
    }
    if (hh < 10) {
        hh = '0' + hh;
    }
    if (min < 10) {
        min = '0' + min;
    }
    if (ss < 10) {
        ss = '0' + ss;
    }

    if (isdateonly) {
        today = mm + '/' + dd + '/' + yyyy;
    } else {
        today = mm + '/' + dd + '/' + yyyy + " " + hh + ":" + min + ":" + ss + " " + ampm;
    }


    if ((value + "").toLocaleLowerCase().indexOf("location") >= 0 || today.indexOf("NaN") >= 0 || today.indexOf("undefined") >= 0) {
        today = undefined;
    }

    return today;
}

//_sfCheckObjectType
function _sfCheckObjectType(obj, _row, _col) {
    return _sfCheckConfigType(obj, _row, _col, "ObjectType", "celltext");
}

//_sfCheckDataType
function _sfCheckDataType(obj, _row, _col) {
    return _sfCheckConfigType(obj, _row, _col, "dataType", "text");
}

//_sfCheckConfigType
function _sfCheckConfigType(obj, _row, _col, type, defvalue) {
    var value = defvalue; //"celltext";

    var cell;

    try {
        if (_row != Spread_ALLROW && _col != Spread_ALLCOL) {
            var config = obj.Data[_row][_sfGetCellName(obj, _col)].Config;
            var configCondi;
            try {
                configCondi = obj.Data[_row][_sfGetCellName(obj, _col)].ConfigCondition;
            } catch (err) { }
            cell = _sfGetFormatValue(obj, config, type, true, _col, _row, configCondi);
        }
    } catch (err) {
        return value;
    }


    var column = obj.ColumnConfig[_col][type] || value;
    var row;

    try {
        var config = obj.RowConfig;
        for (var i = 0; i < config.length; i++) {
            if (config[i].row == _row) {
                row = config[i].config[type];
                break;
            }
        }

    } catch (err) { }

    if (cell != undefined) {
        value = cell;
        return value;
    }
    else if (column != undefined) {
        value = column;
        return value;
    } else if (row != undefined) {
        value = row;
        return value;
    }
    //else if (obj.Enabled == false) {
    //    //obj.CellSelected.row - 1, obj.CellSelected.col - 1
    //    value = false;
    //}


    return value;
}




//_sfCheckEnable
function _sfCheckEnable(obj, _row, _col) {
    var isEnabled = true;

    var cell;

    try {
        var config = obj.Data[_row][_sfGetCellName(obj, _col)].Config;
        var configCondi;
        try {
            configCondi = obj.Data[_row][_sfGetCellName(obj, _col)].ConfigCondition;
        } catch (err) { }
        cell = _sfGetFormatValue(obj, config, "Enabled", true, _col, _row, configCondi);
    } catch (err) { return false; }



    var column = obj.ColumnConfig[_col].Enabled;
    var row;

    try {
        var config = obj.RowConfig;
        for (var i = 0; i < config.length; i++) {
            if (config[i].row == _row) {
                row = config[i].config["Enabled"];
                break;
            }
        }

    } catch (err) { }

    if (cell != undefined && typeof cell === "boolean") {
        isEnabled = cell;
        return isEnabled;
    }
    else if (column != undefined && typeof column === "boolean") {
        isEnabled = column;
        return isEnabled;
    } else if (row != undefined && typeof row === "boolean") {
        isEnabled = row;
        return isEnabled;
    }
    else if (obj.Enabled == false) {
        //obj.CellSelected.row - 1, obj.CellSelected.col - 1
        isEnabled = false;
    }


    return isEnabled;
}

function _sfSelectionActivate(obj) {
    var valueformula = obj.Book.ActiveSheet.GetFormula();
    if (obj.Book.FormulaField == true) {
        $("#" + obj.canvasID + "").find(".formulafield").val(valueformula);
    }

    if (!_sfCheckEnable(obj, obj.CellSelected.row - 1, obj.CellSelected.col - 1)) {
        return false;
    }


    if ($('#' + obj.canvasID + '_vw_selectorCon').css("opacity") == "1")
        return false;


    try {
        $('.nwDatePickP8').unmask();
        $('#' + obj.canvasID + '_vw_inpDate').hide();

    } catch (err) { }
    try {
        // $('.nwDatePickP8').datepicker("destroy");
    } catch (err) { }

    $('#' + obj.canvasID + '_vw_inp').attr("class", "P8Spread_Input");

    var acol = obj.CellSelected.col - 1;
    var arow = obj.CellSelected.row - 1;
    var ColumnTemplate = "";

    var maxlength = obj.GetMaxLength(acol, arow);
    if (maxlength != undefined && !isNaN(maxlength)) {
        $('#' + obj.canvasID + '_vw_inp').attr("maxlength", maxlength);
    }
    else {
        $('#' + obj.canvasID + '_vw_inp').attr("maxlength", "-1");
    }


    try {
        ColumnTemplate = obj.ColumnConfig[acol].ColumnTemplate;
    } catch (err) { }

    if (ColumnTemplate == "" && obj.ColumnConfig[acol].dataType == "currency"
    ) ColumnTemplate = "isNumber numC";
    else if (ColumnTemplate == "" && obj.ColumnConfig[acol].dataType == "number"
    ) ColumnTemplate = "isNumber";
    // else if (ColumnTemplate == "" && obj.ColumnConfig[acol].dataType == "percent"
    //  ) ColumnTemplate = "nwPercent";
    // else if (ColumnTemplate == "" && obj.ColumnConfig[acol].dataType == "percentvalue"
    //) ColumnTemplate = "nwPercentValue";

    //Precision

    try {
        var Class = obj.ColumnConfig[acol].Class;
        if(!p8Spread_IsNull(Class)){
            ColumnTemplate += " "+Class;
        }
    } catch (err) { }

    try {
        if (nwJson(obj.Data[arow][p8_NumberToCell(acol +1)].Config, "id", "dataType", false)[0].element.value == "date") {
            if ((ColumnTemplate + "").indexOf("nwDatePick") >= 0) {
            } else {
                ColumnTemplate += " nwDatePick"
            }
        }
    } catch (err) { }

    if ((ColumnTemplate + "").indexOf("nwDatePick") >= 0) {
        $('#' + obj.canvasID + '_vw_inpDate').show();
        $('#' + obj.canvasID + '_vw_inp').attr("class", "P8Spread_Input nwDatePickP8 active");

        if (obj.GetDataType() == "date") {
            $("#" + obj.canvasID + "_vw_selectorCon .P8Spread_Input.hasDatepicker").show();
        }
        //$('.nwDatePickP8').datepicker();

        //$('.nwDatePickP8').datepicker({
        //});
        try { setTimeout(function () { $('.nwDatePickP8').mask("99/99/9999"); }, 1); } catch (err) { }

        $('#ui-datepicker-div').css("margin-top", "15px");
    }
    else {
        //$("#" + obj.canvasID + "_vw_selectorCon").hide();

        try {
            $('#' + obj.canvasID + '_vw_inp').unmask();
        } catch (err) { }

        $('#' + obj.canvasID + '_vw_inpDate').hide();
        $('#' + obj.canvasID + '_vw_inp').attr("class", "P8Spread_Input " + ColumnTemplate);
    }

    return true;
}

function _sfLoadSheetTab(objparent, containerID, varindex, isnav) {

    try { clearTimeout(objparent.NavSheetObject); } catch (err) { }
    objparent.NavSheetObject = setTimeout(function () {
        _sfLoadSheetTabTimer(objparent, containerID, varindex, isnav);
    }, 10);
}



//sheet tab sheettab
function _sfLoadSheetTabTimer(objparent, containerID, varindex, isnav) {
    var sheetTabStartX = 90;
    var sheetTabStartY = 2;


    //objparent.NavSheet = nwJson(objparent.NavSheet, "nav", true);
    objparent.NavSheet = [];


    var c = document.getElementById(containerID + "_SheetConCanvas");

    $('#' + containerID + "_SheetConCanvas").attr("init", "true");


    var conWidth = $('#' + containerID + "_SheetConCanvas").parent().width();
    var conheight = $('#' + containerID + "_SheetConCanvas").parent().height();



    var myCanvas = createHiDPICanvas(containerID + "_SheetConCanvas", conWidth, conheight, 1);




    var sheetText = "Sheet1";
    tlVColor = "Black";
    tlVFontSize = 14;
    var tlVFont = "Arial,Verdana";
    var sheetwidth = 60;
    var sheetwidthAdd = 0;
    var sheetwidthMulti = 7.9;

    var sheetheight = 24;
    var sheetLine = 2;
    var selColor = "#004f77";
    var sheetmargin = 3;
    //var xcurrentCells = [];



    try {


        if (varindex == undefined) varindex = objparent.NavSheetIndex;
        objparent.NavSheetIndex = varindex;


        for (var i = varindex; i < objparent.Sheet.length; i++) {
            var ctx = c.getContext("2d");

            //active
            if (objparent.Sheet[i] == objparent.ActiveSheet) {
                sheetText = objparent.Sheet[i].SheetName;

                sheetwidthAdd = (sheetText.length * sheetwidthMulti) - sheetwidth;
                sheetwidthAdd = sheetwidthAdd <= 0 ? 0 : sheetwidthAdd;
                var count = (sheetText.match(/ /g) || []).length;
                sheetwidthAdd -= count * 2.1;

                ctx.fontsize = tlVFontSize;
                ctx.fontfamily = tlVFont;
                ctx.fontweight = "bold";
                ctx.fontstyle = "normal";
                //sheetwidthAdd = 12;
                sheetwidthAdd = 12;
                sheetwidth = ctx.measureText(sheetText + " AA").width * 1;
                if (varindex == i) sheetwidth *= 1.4;

                ctx.beginPath();
                ctx.fillStyle = "#EEEEEE";
                ctx.fillRect(sheetTabStartX, 0, sheetwidth + sheetwidthAdd, sheetheight);

                ctx.strokeStyle = "Black";
                ctx.fillRect(sheetTabStartX, 0, sheetwidth + sheetwidthAdd, sheetheight);

                var my_gradient = ctx.createLinearGradient(0, 0, 0, sheetheight);
                my_gradient.addColorStop(0, "rgba(255,255,255,0.2)");
                my_gradient.addColorStop(1, "rgba(200,200,200,0.01)");
                ctx.fillStyle = my_gradient;
                ctx.fillRect(sheetTabStartX, 0, sheetwidth + sheetwidthAdd, sheetheight);


                //sheetwidthAdd = 5;



                var option = {
                    font: "bold " + tlVFontSize + "px " + tlVFont, x: sheetTabStartX, y: sheetTabStartY, width: sheetwidth + sheetwidthAdd, height: sheetheight
                    , paddingX: 3, paddingY: 3
                    , verticalAlign: "top"
                    , textAlign: "left"
                    , color: selColor
                    , sheetindex: i, nav: false
                    , spacetrimer: true
                };
                objparent.NavSheet.push(option);
                CanvasTextWrapper(c, sheetText, option);
                //drawText(ctx, {});


                ctx.beginPath();
                ctx.fillStyle = selColor;
                ctx.fillRect(sheetTabStartX, sheetheight - sheetLine, sheetwidth + sheetwidthAdd, sheetLine);


                //auto adjust sheettab
                if ((sheetTabStartX + sheetwidth + sheetwidthAdd + sheetmargin) + 40 >= conWidth && (isnav || false) == false) {
                    //console.log(((sheetTabStartX + sheetwidth + sheetwidthAdd + sheetmargin) + 40) + ":" + conWidth);
                    var xindex = objparent.NavSheetIndex;
                    xindex += 1;
                    if (xindex >= objparent.Sheet.length - 1) xindex = objparent.Sheet.length - 1;
                    _sfLoadSheetTab(objparent, containerID, xindex);

                }

            }
            else {
                sheetText = objparent.Sheet[i].SheetName;


                sheetwidthAdd = (sheetText.length * sheetwidthMulti) - sheetwidth;
                sheetwidthAdd = sheetwidthAdd <= 0 ? 0 : sheetwidthAdd;
                var count = (sheetText.match(/ /g) || []).length;
                sheetwidthAdd -= count * 1.9;



                ctx.fontsize = tlVFontSize;
                ctx.fontfamily = tlVFont;
                ctx.fontweight = "normal";
                ctx.fontstyle = "normal";
                //sheetwidthAdd = 12;
                //sheetwidth = ctx.measureText(sheetText).width * 1;
                sheetwidthAdd = 0;
                sheetwidth = ctx.measureText(sheetText + " A32").width * 1;
                if (varindex == i) sheetwidth *= 1.4;

                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.fillRect(sheetTabStartX, 0, sheetwidth + sheetwidthAdd, sheetheight);

                ctx.strokeStyle = "Black";
                ctx.fillRect(sheetTabStartX, 0, sheetwidth + sheetwidthAdd, sheetheight);


                //sheetwidthAdd = 5;
                //

                var option = {
                    font: " " + tlVFontSize + "px " + tlVFont, x: sheetTabStartX, y: sheetTabStartY, width: sheetwidth + sheetwidthAdd, height: sheetheight
                    , paddingX: 3, paddingY: 3
                    , verticalAlign: "top"
                    , textAlign: "left"
                    , color: tlVColor
                    , sheetindex: i, nav: false
                    , spacetrimer: true
                };
                objparent.NavSheet.push(option);
                CanvasTextWrapper(c, sheetText, option);
                //drawText(ctx, {});

            }



            sheetTabStartX += sheetwidth + sheetwidthAdd + sheetmargin;

        }





        var bold = "Bold"
        sheetTabStartX = 3;
        sheetwidthAdd = 18;
        tlVColor = "#084c6f";
        tlVFontSize = "12";
        sheetheight = 20;

        var option = {
            font: bold + "  " + tlVFontSize + "px " + tlVFont, x: sheetTabStartX, y: sheetTabStartY, width: sheetwidthAdd, height: sheetheight
            , paddingX: 1, paddingY: 3
            , verticalAlign: "middle"
            , textAlign: "left"
            , color: tlVColor
            , sheetindex: 1
            , nav: true

        };
        objparent.NavSheet.push(option);
        CanvasTextWrapper(c, "|◄", option);


        sheetTabStartX += sheetwidthAdd + 2;
        option = {
            font: bold + "  " + tlVFontSize + "px " + tlVFont, x: sheetTabStartX, y: sheetTabStartY, width: sheetwidthAdd, height: sheetheight
            , paddingX: 1, paddingY: 3
            , verticalAlign: "middle"
            , textAlign: "left"
            , color: tlVColor
            , sheetindex: 2, nav: true
        };
        objparent.NavSheet.push(option);
        CanvasTextWrapper(c, "◄", option);


        sheetTabStartX += sheetwidthAdd + 2;
        option = {
            font: bold + "  " + tlVFontSize + "px " + tlVFont, x: sheetTabStartX, y: sheetTabStartY, width: sheetwidthAdd, height: sheetheight
            , paddingX: 1, paddingY: 3
            , verticalAlign: "middle"
            , textAlign: "left"
            , color: tlVColor
            , sheetindex: 3, nav: true
        };
        objparent.NavSheet.push(option);
        CanvasTextWrapper(c, "►", option);


        sheetTabStartX += sheetwidthAdd + 2;
        option = {
            font: bold + "  " + tlVFontSize + "px " + tlVFont, x: sheetTabStartX, y: sheetTabStartY, width: sheetwidthAdd, height: sheetheight
            , paddingX: 1, paddingY: 3
            , verticalAlign: "middle"
            , textAlign: "left"
            , color: tlVColor
            , sheetindex: 4, nav: true
        };
        objparent.NavSheet.push(option);
        CanvasTextWrapper(c, "►|", option);


    } catch (err) { alert(err); }



    //if (objparent.NavSheetDraw == true) {
    //    return;
    //}
    //objparent.NavSheetDraw = true;
    //try {
    //    c.removeEventListener('mousedown', objparent.NavSheetDraw);
    //} catch (err) { }
    //objparent.NavSheetDraw=

    //if (objparent.NavSheetDraw == true) {
    //    return;
    //}

    // objparent.NavSheetDraw = true;

    var p8mousedown = function (event) {
        var mousePos = _sfGetMousePos(c, event);
        objparent.NavSheet.forEach(function (element) {

            if (mousePos.y >= element.y && mousePos.y <= element.y + element.height
                && mousePos.x >= element.x && mousePos.x <= element.x + element.width
            ) {
                var nav = element.nav;
                var sheetindex = element.sheetindex;

                if (nav == true) {
                    var xindex = varindex;
                    if (sheetindex == 1)
                        xindex = 0;
                    else if (sheetindex == 2) {
                        xindex -= 1;
                        if (xindex <= 0) xindex = 0;
                    }
                    else if (sheetindex == 3) {
                        xindex += 1;
                        if (xindex >= objparent.Sheet.length - 1) xindex = objparent.Sheet.length - 1;
                    }
                    else if (sheetindex == 4)
                        xindex = objparent.Sheet.length - 1;


                    objparent.NavSheetIndex = xindex;
                    _sfLoadSheetTab(objparent, containerID, xindex, true);

                } else {

                    $("#" + containerID + "_vw").off("mousedown");
                    objparent.SetActiveSheet(sheetindex);
                    try{
                        var canvasID = containerID;
                        p8Spread_Click_Sheet(canvasID,sheetindex);
                    }catch(ex){}
                    //  _sfLoadSheetTab(objparent, containerID, xindex);
                }
            }
        });

    };
    //);
    c.removeEventListener('mousedown', p8mousedown);
    c.addEventListener('mousedown', p8mousedown);

}



function relMouseCoords(event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while (currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return { x: canvasX, y: canvasY }
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;


function _sfSelectorAdjust(id, addTop, addLeft, elem) {
    var element = document.getElementById(id);
    var rect = element.getBoundingClientRect();
    var bodyRect = document.body.getBoundingClientRect(),
        elemRect = element.getBoundingClientRect(),

        offsetTop = elemRect.top - bodyRect.top;
    offsetTop += addTop;

    var offsetLeft = elemRect.left - bodyRect.left;
    offsetLeft += addLeft;

    var minwidth = elem.width;
    if (minwidth <= 100) minwidth = 100;
    var minheight = elem.height;
    if (minheight <= 15) minheight = 15;

    $('#' + id + '_vw_selectorCon').css("margin-top", addTop).css("margin-left", addLeft).css("position", "absolute");
    $('#' + id + '_vw_inp').css("min-height", minheight).css("min-width", minwidth).css("width", minwidth);
}


var textToPutOnClipboardHTML = "<table p8style='border-collapse: collapse; background-color:transparent;'>";
function _sfP8Spread_Copy(obj, e, istart, isCut) {
    var p8item = isCut ? "cut" : "copy";
    textToPutOnClipboardHTML = `<table p8style=' border-collapse: collapse;'`
    textToPutOnClipboardHTML += `p8item='${p8item}'`
    textToPutOnClipboardHTML += `p8col='${obj.CellIndexes.Col}' p8row='${obj.CellIndexes.Row}'`
    textToPutOnClipboardHTML += `p8col2='${obj.CellIndexes.Col2}' p8row2='${obj.CellIndexes.Row2}'`
    textToPutOnClipboardHTML += `>`;

    //var obj=mSpread;
    if (istart == undefined) istart = 0;
    var textToPutOnClipboard = "";
    var optionText = {}; var optionBox = {};


    var rowstart = obj.CellIndexes.Row + istart;
    var containerlen = 0;
    for (var i = rowstart; i <= obj.CellIndexes.Row2; i++) {
        if (i > rowstart) textToPutOnClipboard += "\r\n";
        textToPutOnClipboardHTML += "<tr>";
        for (var ic = obj.CellIndexes.Col; ic <= obj.CellIndexes.Col2; ic++) {

            optionText = {};
            optionBox = {};
            optionText = _sfSetFormatText(obj, optionText, ic, i);
            optionBox = _sfSetFormatBox(obj, optionBox, ic, i);


            var xvalue = obj.GetText(ic, i);
            if (ic > obj.CellIndexes.Col) textToPutOnClipboard += "\t";
            textToPutOnClipboard += xvalue;

            var optionBox_backgroundColor = "background-color:" + "transparent";
            if (optionBox.backgroundColor != undefined)
                optionBox_backgroundColor = "background-color:" + optionBox.backgroundColor;


            textToPutOnClipboardHTML += "<td style='" + optionBox_backgroundColor + ";";

            textToPutOnClipboardHTML += ";border-top:" + optionBox.borderWidthTop + "px " + optionBox.borderStyleTop + " " + optionBox.borderColorTop + ";";
            textToPutOnClipboardHTML += ";border-Bottom:" + optionBox.borderWidthBottom + "px " + optionBox.borderStyleBottom + " " + optionBox.borderColorBottom + ";";
            textToPutOnClipboardHTML += ";border-Left:" + optionBox.borderWidthLeft + "px " + optionBox.borderStyleLeft + " " + optionBox.borderColorLeft; + ";";
            textToPutOnClipboardHTML += ";border-Right:" + optionBox.borderWidthRight + "px " + optionBox.borderStyleRight + " " + optionBox.borderColorRight + ";";
            ;
            textToPutOnClipboardHTML += ";font-weight:" + optionText.bold + ";";
            textToPutOnClipboardHTML += ";font-style:" + optionText.italic + ";";
            textToPutOnClipboardHTML += ";text-decoration:" + optionText.underline + ";";
            textToPutOnClipboardHTML += ";font-size:" + (optionText.fontSize == "nonepx" ? "18" : (parseInt(optionText.fontSize.replace("px", "")) + 6) + "px") + ";";
            textToPutOnClipboardHTML += ";text-align:" + optionText.textAlignment + ";";
            textToPutOnClipboardHTML += ";vertical-align:" + optionText.textVertical + ";";
            textToPutOnClipboardHTML += ";color:" + optionText.textColor + ";";
            textToPutOnClipboardHTML += ";font-family:" + optionText.fontFamily + ";";

            //textToPutOnClipboardHTML += ";width:" + 600 + "px;";


            textToPutOnClipboardHTML += "'>";
            textToPutOnClipboardHTML += xvalue;
            textToPutOnClipboardHTML += "</td>";
        }
        textToPutOnClipboardHTML += "</tr>";
        containerlen = containerlen + 1;


    }
    if (textToPutOnClipboard.endsWith("\r\n"))
        textToPutOnClipboard = textToPutOnClipboard.substring(0, textToPutOnClipboard.length - ("\r\n".length));


    textToPutOnClipboardHTML += "</table>";

}
function _sfCopy(html, canvasID) {
    var aux = document.createElement("div");
    if (document.getSelection().toString() != "") {

    } else {
        try {
            $("#" + canvasID + "_copyX").remove();
        } catch (err) { }
        aux.id = canvasID + "_copyX";
        $("#" + canvasID + "_vw_selectorCon").prepend(aux);
        $("#" + canvasID + "_vw_selectorCon").css("opacity", "1");
        $("#" + canvasID + "_vw_selectorCon").css("height", "inherit");
        $("#" + canvasID + "_vw_selectorCon").css("width", "inherit");
        aux.setAttribute("contentEditable", true);
        aux.innerHTML = html;//document.getElementById(element_id).innerHTML;
        aux.focus();
        document.execCommand('selectAll', false, null);
    }
    document.execCommand("copy");
    setTimeout(function () { $(aux).remove(); }, 100);
    $("#" + canvasID + "_vw_selectorCon").css("opacity", "0");
    $("#" + canvasID + "_vw_selectorCon").css("height", "0");
    $("#" + canvasID + "_vw_selectorCon").css("width", "0");
    $("#" + obj.canvasID + "_vw_selectorCon .P8Spread_Input.hasDatepicker").hide();
    _sfLog("Copied Successful");

}

var P8Paster = false;
function _sfPaste(obj) {
    $('#' + obj.canvasID + '_vw_inpText').addClass("paste"); //  P8Spread_TextArea 


    if (P8Paster == true) return;
    var data = $('#' + obj.canvasID + '_vw_inpText').val();

    //mSpread_vw_inpText
    if (data == "")
        data = $('#' + obj.canvasID + '_vw_inp').val();

    if (data == "") return;

    $('#' + obj.canvasID + '_vw_inp').val('');
    $('#' + obj.canvasID + '_vw_inpText').val('');

    if (!(data.lastIndexOf("\n") == data.length - 1)) {
        data += "\n";
    }


    console.log(data);
    var rows = data.split("\n");

    //var table = $('<table />');
    var startxorig = obj.Book.ActiveSheet.CellIndexes.Col;
    var startyorig = obj.Book.ActiveSheet.CellIndexes.Row;
    var startx = obj.Book.ActiveSheet.CellIndexes.Col;
    var starty = obj.Book.ActiveSheet.CellIndexes.Row;
    obj.Book.ActiveSheet.RenderStatus = false;
    var xcount = 1;
    P8Paster = true;
    for (var y in rows) {
        if (rows.length == xcount) continue;

        xcount++;

        var cells = rows[y].split("\t");
        //var row = $('<tr />');
        startx = startxorig;
        for (var x in cells) {
            if (obj.Book.ActiveSheet.GetEnabled(startx, starty) == false) continue;

            obj.RenderStatus = false;
            obj.Book.ActiveSheet.RenderStatus = false;

            var maxlength = obj.Book.ActiveSheet.GetMaxLength(startx, starty);
            var strtext = cells[x];
            if (maxlength >= 0) {
                strtext = strtext.substring(0, maxlength);
            }
            obj.Book.ActiveSheet.SetText(startx, starty, strtext, "text", true);
            //row.append('<td>' + cells[x] + '</td>');
            startx++;
        }
        starty++;
        //table.append(row);
    }
    try {
        // p8Spread_Change(obj.canvasID, obj.CellSelected.row - 1, obj.CellSelected.col - 1);
    } catch (err) { }
    obj.Book.ActiveSheet.CellIndexes.Col = startxorig;
    obj.Book.ActiveSheet.CellIndexes.Row = startyorig;

    obj.Book.ActiveSheet.RenderStatus = true;
    obj.Book.ActiveSheet.RenderNoEvent();
    obj.RenderStatus = true;

    setTimeout(function () {
        P8Paster = false;
        $("#" + obj.canvasID + "_vw").focus();
        $("#" + obj.canvasID + "_vw").trigger("click");


    }, 300);

    try {
        var textToPutOnClipboard = $(textToPutOnClipboardHTML);
        var p8item = textToPutOnClipboard.attr("p8item");
        if (p8item == "cut") {
            var p8col = textToPutOnClipboard.attr("p8col");
            var p8col2 = textToPutOnClipboard.attr("p8col2");
            var p8row = textToPutOnClipboard.attr("p8row");
            var p8row2 = textToPutOnClipboard.attr("p8row2");
            for (var i = p8row; i <= p8row2; i++) {
                for (var j = p8col; j <= p8col2; j++) {
                    obj.Book.ActiveSheet.SetText(j, i, "");
                    if (1 != 1) {
                        obj.Book.ActiveSheet.DeleteConfigData(j, i)
                    }
                }
            }
            textToPutOnClipboardHTML = "";
        }
    } catch (err) { }
}

var aaa = 0;
function P8SpreadWheel(event) {
    _sfLog("render done : " + aaa + " seconds");
    aaa += 1;
    return true;
}


function _sfGetMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
function _sfSpreadCheckKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
        // left arrow
    }
    else if (e.keyCode == '39') {
        // right arrow
    }

}


function _sfSelectCell(obj, element, canvasIDOrig, canvasID, contextCurrentSelected) {


    var myCell = {
        x: element.x,
        y: element.y,
        width: element.width,
        height: element.height,
        stroke: "black",
        borderWidth: element.borderMargin * 2,
        fillStyle: element.selectedValue,
        strokeStyle: 'dotted'
        , col: element.col
        , row: element.row
        , col2: element.col
        , row2: element.row
        , type: "cellselected"
    };
    try {
        $(canvasIDOrig).TestX(obj);
    } catch (err) { }


    _sfLog("row:" + element.row + " column:" + element.col + " | " + "row:2" + element.row2 + " column:" + element.col2);

    if (element.type == "col") {
        obj.CellSelected.row = obj.CellIndexes.Row;
        obj.CellSelected.row2 = obj.CellIndexes.Row2;
    }
    else if (element.type == "row") {
        obj.CellSelected.col = obj.CellIndexes.Col;
        obj.CellSelected.col2 = obj.CellIndexes.Col2;
    } else {

        obj.CellIndexes.Col = element.col - 1;
        obj.CellIndexes.Row = element.row - 1;

        obj.CellIndexes.Col2 = element.col - 1;
        obj.CellIndexes.Row2 = element.row - 1;
    }



    var addTop = element.y;
    var addLeft = element.x;
    _sfSelectorAdjust(obj.canvasID, addTop, addLeft, element);



    obj.CellSelected = myCell;
    obj.RenderNoEvent();
    //drawRectangleSelected(obj, obj.CellSelected, contextCurrentSelected);

    // mspreadEvent
    try {
        // obj.CellChange();
    } catch (err) {
        //_sfLog(err);
    }

    setTimeout(function () {
        try {
            //document.getElementById(canvasID + "_inpC").innerHTML = "<input id='" + canvasID + "_inp' autofocus type='text' />";
            //$('#' + canvasID + '_inp').focus();_inpB
            if (_sfDetectMobile()) {

            } else {
                document.getElementById(canvasID + "_inp").focus();
            }
            //document.getElementById(canvasID + "_inpText").focus();
        } catch (err) { }
    }, 10);



}

function _sfCheckIfClassExist(classData, value) {
    if (classData == undefined) classData = "";;
    if (classData.indexOf(value) >= 0) {
        return true;
    }
    return false;
}

var Spread_ColumnConfig = [];
var Spread_Column_backgroundColor = [];

var Spread_ALLCOL = -247;
var Spread_ALLROW = -247;
function _sfSetFormatBox(obj, option, icol, irow, icol2, irow2, type) {
    if (icol == undefined) icol = obj.CellIndexes.Col;
    if (irow == undefined) irow = obj.CellIndexes.Row;

    if (icol2 == undefined) icol2 = obj.CellIndexes.Col2;
    if (irow2 == undefined) irow2 = obj.CellIndexes.Row2;

    var config = [];
    var configCondi = [];
    var tempvalue = undefined;
    var tempvalueX = undefined;
    var temp1 = "";
    var temp2 = "";
    var temp3 = "";
    var temp4 = "";

    var configRow = [];
    var configCol = [];


    if (irow == Spread_ALLCOL) {
        try {
            config = obj.ColumnConfig[icol].Config;

        } catch (err) {

        }
    }
    else {
        try {
            config = obj.Data[irow][_sfGetCellName(obj, icol)].Config;
            configCondi = obj.Data[irow][_sfGetCellName(obj, icol)].ConfigCondition;
        } catch (err) {

        }
    }


    try {
        //lookup
        var classData = obj.ColumnConfig[icol].Class;
        if (_sfCheckIfClassExist(classData, "aagnwlookupgrid")) {
            tempvalue = obj.DefaultSettings.lookupBackgroundColor;
        }
    } catch (err) { }

    if (type == undefined) {
        try {

            var xtempvalue = _sfGetFormatValue(obj, config, "backgroundColor", true, icol, irow, configCondi);
            if (xtempvalue != undefined && xtempvalue != "inherit") {
                tempvalue = xtempvalue;
            }

            if (tempvalue != undefined) { option.fillStyle = tempvalue; option.backgroundColor = tempvalue; }
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }


        try {
            tempvalue = _sfGetFormatValue(obj, config, "backgroundColorPercentValue", true, icol, irow, configCondi);
            if (tempvalue != undefined) option.bgcolorPercValue = tempvalue || 0;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }
        try {
            tempvalue = _sfGetFormatValue(obj, config, "backgroundColorPercent", true, icol, irow, configCondi);
            if (tempvalue != undefined) option.bgcolorPerc = tempvalue || "green";
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }




    }
    else {




        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderColorTop", true, icol, irow, configCondi);
            if (tempvalue != undefined) option.borderColorTop = tempvalue || obj.gridlLineColor;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderColorBottom", true, icol, irow, configCondi);
            if (tempvalue != undefined) option.borderColorBottom = tempvalue || obj.gridlLineColor;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderColorLeft", true, icol, irow, configCondi);
            if (tempvalue != undefined) option.borderColorLeft = tempvalue || obj.gridlLineColor;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderColorRight", true, icol, irow, configCondi);
            if (tempvalue != undefined) option.borderColorRight = tempvalue || obj.gridlLineColor;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderStyleTop", true, icol, irow, configCondi);
            if (tempvalue != undefined) option.borderStyleTop = tempvalue;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderStyleBottom", true, icol, irow, configCondi);
            if (tempvalue != undefined) option.borderStyleBottom = tempvalue;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderStyleLeft", true, icol, irow, configCondi);
            if (tempvalue != undefined) option.borderStyleLeft = tempvalue;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderStyleRight", true, icol, irow, configCondi);
            if (tempvalue != undefined) option.borderStyleRight = tempvalue;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderWidthTop", true, icol, irow, configCondi);
            if (tempvalue != undefined) option.borderWidthTop = tempvalue || 1;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderWidthBottom", true, icol, irow, configCondi);
            if (tempvalue != undefined) option.borderWidthBottom = tempvalue || 1;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderWidthLeft", true, icol, irow, configCondi);
            if (tempvalue != undefined) option.borderWidthLeft = tempvalue || 1;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderWidthRight", true, icol, irow, configCondi);
            if (tempvalue != undefined) option.borderWidthRight = tempvalue || 1;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

    }


    try {
        canvasListUpdate(obj.canvasID, obj, icol, irow);
    } catch (err) { }

    return option;
}

// getconfig
function _sfSetFormatText(obj, option, icol, irow) {
    ;
    //var option ={};
    var config = [];
    var configCondi = [];
    var tempvalue = undefined;
    var tempvalueX = undefined;
    var temp1 = "";
    var temp2 = "";
    var temp3 = "";
    var temp4 = "";

    try {
        config = obj.Data[irow][_sfGetCellName(obj, icol)].Config;
        configCondi = obj.Data[irow][_sfGetCellName(obj, icol)].ConfigCondition;
    } catch (err) {

    }


    // font size,family,bold
    try {
        temp1 = _sfGetFormatValue(obj, config, "bold", true, icol, irow, configCondi);
        temp2 = _sfGetFormatValue(obj, config, "fontSize", true, icol, irow, configCondi) + "px";
        temp3 = _sfGetFormatValue(obj, config, "fontFamily", true, icol, irow, configCondi);
        temp4 = _sfGetFormatValue(obj, config, "italic", true, icol, irow, configCondi);
        tempvalue = temp4 + " " + temp1 + " " + temp2 + " " + temp3;
        if (tempvalue != undefined) {
            option.font = tempvalue;
            option.bold = temp1
            option.fontSize = temp2;
            option.fontFamily = temp3;
            option.italic = temp4;
        }
        tempvalue = undefined; tempvalueX = undefined;
    } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

    // text underline
    try {
        tempvalue = _sfGetFormatValue(obj, config, "underline", true, icol, irow, configCondi);
        if (tempvalue != undefined) option.textDecoration = tempvalue;
        tempvalue = undefined; tempvalueX = undefined;
    } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

    // text align
    try {
        tempvalue = _sfGetFormatValue(obj, config, "textAlignment", true, icol, irow, configCondi);
        if (tempvalue != undefined) { option.textAlign = tempvalue; option.textAlignment = tempvalue; }
        tempvalue = undefined; tempvalueX = undefined;
    } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

    // text vertical align
    try {
        tempvalue = _sfGetFormatValue(obj, config, "textVertical", true, icol, irow, configCondi);
        if (tempvalue != undefined) { option.verticalAlign = tempvalue; option.textVertical = tempvalue; }
        tempvalue = undefined; tempvalueX = undefined;
    } catch (err) { tempvalue = undefined; tempvalueX = undefined; }


    // text color
    try {
        tempvalue = _sfGetFormatValue(obj, config, "textColor", true, icol, irow, configCondi);
        if (tempvalue != undefined) { option.color = tempvalue; option.textColor = tempvalue; }
        tempvalue = undefined; tempvalueX = undefined;
    } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

    // dataType
    try {
        tempvalue = _sfGetFormatValue(obj, config, "dataType", true, icol, irow, configCondi);
        if (tempvalue != undefined) { option.dataType = tempvalue; }
        tempvalue = undefined; tempvalueX = undefined;
    } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

    // dataStyle
    try {
        tempvalue = _sfGetFormatValue(obj, config, "dataStyle", true, icol, irow, configCondi);
        if (tempvalue != undefined) { option.dataStyle = tempvalue; }
        tempvalue = undefined; tempvalueX = undefined;
    } catch (err) { tempvalue = undefined; tempvalueX = undefined; }


    // currencyCode
    try {
        tempvalue = _sfGetFormatValue(obj, config, "currencyCode", true, icol, irow, configCondi);
        if (tempvalue != undefined) { option.currencyCode = tempvalue; }
        tempvalue = undefined; tempvalueX = undefined;
    } catch (err) { tempvalue = undefined; tempvalueX = undefined; }


    try {
        var xtempvalue = _sfGetFormatValue(obj, config, "backgroundColor", true, icol, irow, configCondi);
        if (xtempvalue != undefined && xtempvalue != "inherit") {
            tempvalue = xtempvalue;
        }
        if (tempvalue != undefined) { option.fillStyle = tempvalue; option.backgroundColor = tempvalue; }
        tempvalue = undefined; tempvalueX = undefined;
    } catch (err) { tempvalue = undefined; tempvalueX = undefined; }
    //return {
    //    bold: "normal", italic: "normal"
    //, underline: "normal"
    //, fontSize: "12", fontFamily: "Arial"
    //, textAlignment: "left"
    //, textVertical: "middle"
    //};


    return option;
}

function _sfGetFormatValueColumnChecker(conid) {
    var i = -1;

    if (conid == "backgroundColor") {
        i = 21;
    }

    return i;
}

function _sfGetFormatValue(obj, config, conid, isnull, colselected, rowselected, configCondi) {
    var value = undefined;
    var len = -1;

    try {
        if (configCondi != undefined) {
            len = configCondi.length;
            for (var i = 0; i < len; i++) {
                var conid2 = _sfGetFormatValueRename(conid);
                if (configCondi[i].id == conid || configCondi[i].id == conid2) {
                    try {
                        value = configCondi[i].element.value;
                        break;
                    } catch (err) { value = undefined; }
                }
            }
        }
    } catch (err) {

    }

    if (value == undefined) {
        try {
            len = config.length;
            for (var i = 0; i < len; i++) {
                var conid2 = _sfGetFormatValueRename(conid);
                if (config[i].id == conid || config[i].id == conid2) {
                    try {
                        value = config[i].element.value;
                        break;
                    } catch (err) { value = undefined; }
                }
            }
        } catch (err) {

        }
    }
    //
    // var currencycode = obj.GetCurrencyCode(colselected, rowselected);
    // if (currencycode != "")
    //    value = "right";

    //if (isnull && (value == undefined || (value + "").trim() == "")) {
    //    try {
    //        //aagproblem
    //        var xcol = parseInt(colselected);
    //        if (conid == "backgroundColor")
    //            value = Spread_Column_backgroundColor[parseInt(xcol)];

    //    } catch (err) { value = undefined; }
    //}
    if (isnull && (value == undefined || value == null || (value + "").trim() == "")) {
        try {
            var config = obj.RowConfig;
            for (var i = 0; i < config.length; i++) {
                if (config[i].row == rowselected) {
                    // conid = _sfGetFormatValueRename(conid);
                    value = config[i].config[conid];
                    break;
                }
            }
        } catch (err) { }
    }
    if (isnull && (value == undefined || value == null || (value + "").trim() == "")) {
        try {
            var conid2 = _sfGetFormatValueRename(conid);
            value = obj.ColumnConfig[colselected][conid2];
        } catch (err) { }
    }





    if (isnull && (value == undefined || value == null || (value + "").trim() == "")) {
        try {
            value = obj.DefaultSettings[conid];
            if (value == undefined) {
                var conid2 = _sfGetFormatValueRename(conid);
                conid = conid2;
                value = obj.DefaultSettings[conid2];
            }

            if ((conid == "textAlignment" || conid == "TextAlign") && colselected != undefined) {
                if (rowselected == undefined) rowselected = Spread_ALLROW;
                var datatype = obj.GetDataType(colselected, rowselected);

                if ((datatype == "currency" || datatype == "percentvalue" || datatype == "percent" || datatype == "number"))
                    value = "right";
            }

        } catch (err) { value = ""; }
    }

    try {

        value = value.toLowerCase();
        value = value.replace(" !important", "");
    } catch (err) {

    }

    return value;
}

function _sfGetFormatValueRename(conid) {
    if (conid == "textAlignment") conid = "TextAlign";
    else if (conid == "textVertical") "VerticalAlign";
    else if (conid == "underline") "TextDecoration";
    else if (conid == "italic") "FontStyle";
    else if (conid == "bold") "FontWeight";
    else if (conid == "fontSize") "FontSize";
    else if (conid == "fontFamily") "FontFamily";
    else if (conid == "textColor") "TextColor";

    return conid;
}


function _sfSetFormatCell() {
    this.Data[irow][p8_NumberToCell(icol)].Config;
}


function _sfGetFormatCell(obj, icol, irow, type) {
    try {
        var config = obj.Data[irow][p8_NumberToCell(icol + 1)].Config;

        if (type == undefined)
            return config;

        for (var i = 0; i < config.length; i++) {
            if (config[i].id == type) {
                return config[i].element.value;
            }
        }
    } catch (err) { }
    return undefined;
}


function _sfStartTime() {
    if (xTime == undefined) xTime = new Date().getTime();
}

$.fn.TestX = function (x) {
    // this.css( "color", "green" );

    return x;
};


function drawRectangleSelected(obj, myCell, context) {

    var element_width = 0;
    var element_height = 0;
    var elementF_width = 0;
    var elementF_height = 0;

    //obj.CellIndexes.Col = obj.CellSelValue.col;
    //obj.CellIndexes.Row = obj.CellSelValue.row;

    var xc = obj.CellIndexes.Col;
    var xr = obj.CellIndexes.Row;
    var xc2 = obj.CellIndexes.Col2;
    var xr2 = obj.CellIndexes.Row2;

    if (xc2 < xc) {
        obj.CellIndexes.Col = xc2;
        obj.CellIndexes.Col2 = xc;
        myCell.col = xc2;
    }
    if (xr2 < xr) {
        obj.CellIndexes.Row = xr2;
        obj.CellIndexes.Row2 = xr;
        myCell.row = xr2;
    }



    obj.currentCells.forEach(function (element) {
        if (element.col - 1 >= obj.CellIndexes.Col && element.col - 1 <= obj.CellIndexes.Col2
            &&
            element.type == "col") {  //&& myCell.row == undefined

            context.beginPath();
            context.rect(element.x, element.y, element.width, element.height);
            context.fillStyle = obj.Format_SelHeadBG;//myCell.fillStyle;
            context.setLineDash([]);
            context.fill();
            context.lineWidth = 0;
            context.strokeStyle = "transparent";//;myCell.strokeStyle;
            context.stroke();

            if (myCell.row == undefined) {
                element_width = element.width + element.borderWidth;
                elementF_width += element_width;
            }

        }
        if (element.row - 1 >= obj.CellIndexes.Row && element.row - 1 <= obj.CellIndexes.Row2
            &&
            element.type == "row") {  //&& myCell.col == undefined

            context.beginPath();
            context.rect(element.x, element.y, element.width, element.height);
            context.fillStyle = obj.Format_SelHeadBG;//myCell.fillStyle;
            context.setLineDash([]);
            context.fill();
            context.lineWidth = 0;
            context.strokeStyle = "transparent";//;myCell.strokeStyle;
            context.stroke();

            if (myCell.col == undefined) {
                element_height = element.height + element.borderWidth;
                elementF_height += element_height;
            }

        }


        if (
            element.col - 1 >= obj.CellIndexes.Col && element.col - 1 <= obj.CellIndexes.Col2
            && element.row - 1 >= obj.CellIndexes.Row2 && element.row - 1 <= obj.CellIndexes.Row2
        ) {

            element_width = element.width + element.borderWidth;
            elementF_width += element_width;



        }

        if (
            element.col - 1 >= obj.CellIndexes.Col2 && element.col - 1 <= obj.CellIndexes.Col2
            && element.row - 1 >= obj.CellIndexes.Row && element.row - 1 <= obj.CellIndexes.Row2
        ) {
            element_height = element.height + element.borderWidth;
            elementF_height += element_height;

        }
        if (element.col - 1 == obj.CellIndexes.Col
            && element.row - 1 == obj.CellIndexes.Row
        ) {
            myCell.y = element.y;
            myCell.x = element.x;
        }


    });
    myCell.width = elementF_width;
    myCell.height = elementF_height;


    if (myCell.row == undefined) myCell.row = obj.CellIndexes.Row;
    if (myCell.row2 == undefined) myCell.row2 = obj.CellIndexes.Row2;

    if (myCell.col == undefined) myCell.row = obj.CellIndexes.Col;
    if (myCell.col2 == undefined) myCell.row2 = obj.CellIndexes.Col2;

    if (elementF_width != 0 && elementF_height != 0)
        drawRectangleSelectedDetail(myCell, context);

}
function drawRectangleSelectedDetail(myCell, context) {



    context.beginPath();


    context.rect(myCell.x, myCell.y, myCell.width, myCell.height);


    context.fillStyle = "transparent";//myCell.fillStyle;

    context.fillStyle = "#c7d4e135";
    context.setLineDash([]);
    context.fill();
    context.lineWidth = myCell.borderWidth;
    context.strokeStyle = "#337ab7";// selected cel border //;myCell.strokeStyle;
    context.stroke();
}

function _sfGetCellName(obj, c_index) {
    var data = "";
    try {
        data = obj.ColumnConfig[c_index].name;
    } catch (err) {
        // data = obj.ColumnConfig[c_index].name;
    }
    return data;
}
function _sfGetCellNameEdit(obj, c_index) {
    var data = "";
    try {
        data = obj.ColumnConfig[c_index].ColumName;
        if (data == undefined)
            data = obj.ColumnConfig[c_index].name;
    } catch (err) {
        data = obj.ColumnConfig[c_index].name;
    }
    return data;
}


function p8_NumberToCell(nNum) {
    if (nNum <= 0) nNum = 1;
    if (nNum > 26) {
        return xfunc_numberToLetters(nNum);
    }
    else {
        return xfunc_letter(nNum);
    }
}
function xfunc_numberToLetters(nNum) {
    var result;
    if (nNum <= 26) {
        result = xfunc_letter(nNum);
    } else {
        var modulo = nNum % 26;
        var quotient = Math.floor(nNum / 26);
        if (modulo === 0) {
            result = xfunc_letter(quotient - 1) + xfunc_letter(26);
        } else {
            result = xfunc_letter(quotient) + xfunc_letter(modulo);
        }
    }

    return result;
}
function xfunc_letter(nNum) {
    var a = "A".charCodeAt(0);
    return String.fromCharCode(a + nNum - 1);
}



//// fUNCTIONS
/*
CanvasTextWrapper(canvas, str, {
    font: "bold 40px Arial, sans-serif",
    paddingX: 20,
    paddingY: 20,
    verticalAlign: "middle",
    textAlign: "center",
    justifyLines: true,
});
*/
//var defaults = {
//    font: '18px Arial, sans-serif',
//    sizeToFill: false,
//    maxFontSizeToFill: false,
//    lineHeight: 1,
//    allowNewLine: true,
//    lineBreak: 'auto',
//    textAlign: 'left',
//    verticalAlign: 'top',
//    justifyLines: false,
//    paddingX: 0,
//    paddingY: 0,
//    fitParent: false,
//    strokeText: false,
//    renderHDPI: true,
//    textDecoration: 'none'
//};
//http://namniak.github.io/canvas-text-wrapper/
(function (root) {
    function CanvasTextWrapper(canvas, text, options, text2, options2) {
        'use strict';

        if (text == "")
            return;


        var defaults = {
            font: '18px Arial, sans-serif',
            sizeToFill: false,
            maxFontSizeToFill: false,
            lineHeight: 1,
            allowNewLine: true,
            lineBreak: 'auto',   //word , auto
            textAlign: 'left',   // right , center , left
            verticalAlign: 'top', // top , middle, bottom
            justifyLines: false,
            paddingX: 0,
            paddingY: 0,
            fitParent: false,
            strokeText: false,
            renderHDPI: true,

            textDecoration: 'none'
            , width: -1,
            height: -1
            , x: 0
            , y: 0
            , color: "black"  //defaulted to context
            , limitBound: true
            , spacetrimer: false
        };
        text = text + "";

        //if (text.indexOf("Angelo Carlo Gonzales") >= 0) {
        //    console.log(text);
        //}

        if (options.spacetrimer == undefined)
            options.spacetrimer = defaults.spacetrimer;

        //text = text.replace(/ /g, ' ');
        if (options.spacetrimer == false)
            text = text.replaceAll('  ', ' ~.');

        try {
            text2 = text2 + "";
            if (options2.spacetrimer == undefined)
                options2.spacetrimer = defaults.spacetrimer;
        } catch (err) { }

        try {
            if (options2.spacetrimer == false)
                text2 = text2.replaceAll('  ', ' ~.');
        } catch (err) { }

        var opts2 = {};
        var opts = {};
        //' '  // spacial space
        //' '  // spacial space


        for (var key in defaults) {
            opts[key] = options.hasOwnProperty(key) ? options[key] : defaults[key];
        }

        try {
            for (var key in defaults) {
                opts2[key] = options2.hasOwnProperty(key) ? options2[key] : defaults[key];
            }
        } catch (err) { }

        var context = canvas.getContext('2d');
        context.font = opts.font;
        context.textBaseline = 'bottom';

        var scale = 1;
        var devicePixelRatio = (typeof global !== 'undefined') ? global.devicePixelRatio : root.devicePixelRatio;

        if (opts.renderHDPI && devicePixelRatio > 1 && 1 == 2) {
            var tempCtx = {};

            // store context settings in a temp object before scaling otherwise they will be lost
            for (var key in context) {
                tempCtx[key] = context[key];
            }

            var canvasWidth = canvas.width;
            var canvasHeight = canvas.height;
            scale = devicePixelRatio;

            canvas.width = canvasWidth * scale;
            canvas.height = canvasHeight * scale;
            canvas.style.width = canvasWidth * scale * 0.5 + 'px';
            canvas.style.height = canvasHeight * scale * 0.5 + 'px';

            // restore context settings
            for (var key in tempCtx) {
                try {
                    context[key] = tempCtx[key];
                } catch (e) {

                }
            }

            context.scale(scale, scale);
        }

        var scaledown = 1;
        var EL_WIDTH = (!opts.fitParent ? canvas.width : canvas.parentNode.clientWidth) / scale * scaledown;
        var EL_HEIGHT = (!opts.fitParent ? canvas.height : canvas.parentNode.clientHeight) / scale * scaledown;

        if (opts.width >= 1) {
            EL_WIDTH = (!opts.fitParent ? opts.width : canvas.parentNode.clientWidth) / scale * scaledown;
        }
        if (opts.height >= 1) {
            EL_HEIGHT = (!opts.fitParent ? opts.height : canvas.parentNode.clientHeight) / scale * scaledown;
        }

        //EL_WIDTH = EL_WIDTH - (opts.paddingX * 2);

        var MAX_TXT_WIDTH = EL_WIDTH - (opts.paddingX * 2);
        var MAX_TXT_HEIGHT = EL_HEIGHT - (opts.paddingY * 2);

        var fontSize = opts.font.match(/\d+(px|em|%)/g) ? +opts.font.match(/\d+(px|em|%)/g)[0].match(/\d+/g) : 18;
        var textBlockHeight = 0;
        var lines = [];
        var newLineIndexes = [];
        var textPos = { x: 0, y: 0 };
        var lineHeight = 0;
        var fontParts;
        var multiNewLineDelimiter = '\u200B';



        text = handleMultipleNewline(text);
        setFont(fontSize);
        setLineHeight();
        validate();
        render();

        function handleMultipleNewline(text) {
            do {
                text = text.replace(/\n\n/g, '\n' + multiNewLineDelimiter + '\n');
            } while (text.indexOf('\n\n') > -1);
            return text;
        }

        function setFont(fontSize) {
            if (!fontParts) fontParts = (!opts.sizeToFill) ? opts.font.split(/\b\d+px\b/i) : context.font.split(/\b\d+px\b/i);
            context.font = fontParts[0] + fontSize + 'px' + fontParts[1];
        }

        function setLineHeight() {
            if (!isNaN(opts.lineHeight)) {
                lineHeight = fontSize * opts.lineHeight;
            } else if (opts.lineHeight.toString().indexOf('px') !== -1) {
                lineHeight = parseInt(opts.lineHeight);
            } else if (opts.lineHeight.toString().indexOf('%') !== -1) {
                lineHeight = (parseInt(opts.lineHeight) / 100) * fontSize;
            }
        }

        function render() {
            if (opts.sizeToFill) {
                var wordsCount = text.split(/\s+/).length;//.trim()
                var newFontSize = 0;
                var fontSizeHasLimit = opts.maxFontSizeToFill !== false;

                do {
                    if (fontSizeHasLimit) {
                        if (++newFontSize <= opts.maxFontSizeToFill) {
                            adjustFontSize(newFontSize);
                        } else {
                            break;
                        }
                    } else {
                        adjustFontSize(++newFontSize);
                    }
                } while (textBlockHeight < MAX_TXT_HEIGHT && (lines.join(' ').split(/\s+/).length == wordsCount));

                adjustFontSize(--newFontSize);
            } else {
                wrap();
            }

            if (opts.justifyLines && opts.lineBreak === 'auto') {
                justify();
            }

            //aag add for verticla align with height
            if (opts.height > 0) {
                textBlockHeight = textBlockHeight / 2;
            }
            // 
            setVertAlign();
            setHorizAlign();
            drawText();
        }

        function adjustFontSize(size) {
            setFont(size);
            lineHeight = size;
            wrap();
        }

        function wrap() {
            if (opts.allowNewLine) {
                var newLines = text.split('\n');//.trim()
                for (var i = 0, idx = 0; i < newLines.length - 1; i++) {
                    idx += newLines[i].split(/\s+/).length;//.trim()
                    newLineIndexes.push(idx)
                }
            }

            var words = text.split(/\s+/);//.trim()
            checkLength(words);
            breakText(words);

            textBlockHeight = lines.length * lineHeight;
        }

        function checkLength(words) {
            var testString, tokenLen, sliced, leftover;

            words.forEach(function (word, index) {
                testString = '';
                tokenLen = context.measureText(word).width;

                if (tokenLen > MAX_TXT_WIDTH) {
                    for (var k = 0; (context.measureText(testString + word[k]).width <= MAX_TXT_WIDTH) && (k < word.length); k++) {
                        testString += word[k];
                    }

                    sliced = word.slice(0, k);
                    leftover = word.slice(k);
                    words.splice(index, 1, sliced, leftover);
                }
            });
        }

        function breakText(words) {
            lines = [];
            for (var i = 0, j = 0; i < words.length; j++) {
                lines[j] = '';

                if (opts.lineBreak === 'auto') {
                    if (context.measureText(lines[j] + words[i]).width > MAX_TXT_WIDTH) {
                        break;
                    } else {
                        while ((context.measureText(lines[j] + words[i]).width <= MAX_TXT_WIDTH) && (i < words.length)) {

                            lines[j] += words[i] + ' ';
                            i++;

                            if (opts.allowNewLine) {
                                for (var k = 0; k < newLineIndexes.length; k++) {
                                    if (newLineIndexes[k] === i) {
                                        j++;
                                        lines[j] = '';
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    lines[j] = lines[j];//.trim()
                } else {
                    lines[j] = words[i];
                    i++;
                }
            }
        }



        function justify() {
            var maxLen, longestLineIndex, tokenLen;
            for (var i = 0; i < lines.length; i++) {
                tokenLen = context.measureText(lines[i]).width;

                if (!maxLen || tokenLen > maxLen) {
                    maxLen = tokenLen;
                    longestLineIndex = i;
                }
            }

            // fill lines with extra spaces
            var numWords, spaceLength, numOfSpaces, num, filler;
            var delimiter = '\u200A';//;
            for (i = 0; i < lines.length; i++) {
                if (i === longestLineIndex) continue;

                numWords = lines[i].split(/\s+/).length;//.trim()
                if (numWords <= 1) continue;

                lines[i] = lines[i].split(/\s+/).join(delimiter);//.trim()

                spaceLength = context.measureText(delimiter).width;
                numOfSpaces = (maxLen - context.measureText(lines[i]).width) / spaceLength;
                num = numOfSpaces / (numWords - 1);

                filler = '';
                for (var j = 0; j < num; j++) {
                    filler += delimiter;
                }

                lines[i] = lines[i].split(delimiter).join(filler);

                // lines[i] = lines[i].replaceAll(" #$#", " ");

            }
        }

        function underline(text, x, y) {
            var width = context.measureText(text).width;

            switch (context.textAlign) {
                case 'center':
                    x -= (width / 2);
                    break;
                case 'right':
                    x -= width;
                    break;
            }

            if (opts.color != "")
                context.strokeStyle = opts.color;
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x + width, y);
            context.stroke();


        }

        function drawText() {

            if (opts.color != "")
                context.fillStyle = opts.color;

            var skipLineOnMatch = multiNewLineDelimiter + ' ';
            var laststring = "";
            for (var i = 0; i < lines.length; i++) {

                lines[i] = lines[i].replaceAll(" ~.", "  ");
                laststring = lines[i];

                textPos.y = parseInt(textPos.y) + lineHeight; //- (lines.length * 0.2);

                //exist if sobra
                if ((opts.y + opts.height + lineHeight * 1.7) <= parseInt(textPos.y) + lineHeight) {
                    break;
                }


                if (lines[i] !== skipLineOnMatch) {
                    context.fillText(lines[i], textPos.x, textPos.y);

                    if (opts.strokeText) {
                        context.strokeText(lines[i], textPos.x, textPos.y);
                    }

                    if (opts.textDecoration.toLocaleLowerCase() === 'underline') {
                        underline(lines[i], textPos.x, textPos.y);
                    }
                }
            }


            if (opts2.color != undefined) {
                var x2 = textPos.x + (context.measureText(laststring).width / 2) + 2;
                context.fillStyle = opts2.color || "red";
                context.fillText(text2, x2, textPos.y + 3);
            }
            //context.clearRect(opts.x, opts.y + opts.height, opts.width, 1000);
        }

        function setHorizAlign() {
            context.textAlign = opts.textAlign;

            // aag set for x
            var x_Plus_Pad = opts.paddingX + opts.x;

            if (opts.textAlign == 'center') {
                textPos.x = (EL_WIDTH / 2) + opts.x;
            } else if (opts.textAlign == 'right') {
                textPos.x = EL_WIDTH + opts.x - opts.paddingX;//- x_Plus_Pad;//opts.paddingX;
            } else {
                textPos.x = x_Plus_Pad;//opts.paddingX;
            }
        }

        function setVertAlign() {
            //aag set for y
            var y_Plus_Pad = opts.paddingY + opts.y;


            if (opts.verticalAlign == 'middle') {
                textPos.y = ((EL_HEIGHT - textBlockHeight) / 2) + opts.y - (textBlockHeight * 0.35);
            } else if (opts.verticalAlign == 'bottom') {
                //textPos.y = EL_HEIGHT - textBlockHeight - y_Plus_Pad;// opts.paddingY;
                textPos.y = EL_HEIGHT + opts.y - (textBlockHeight + opts.paddingY);
            } else {
                textPos.y = y_Plus_Pad;//opts.paddingY;
            }


            if (textPos.y <= opts.y && opts.limitBound) textPos.y = y_Plus_Pad;
        }

        function validate() {
            try {
                if (typeof text !== 'string')
                    throw new TypeError('The second parameter must be a String.');

                if (isNaN(fontSize))
                    throw new TypeError('Cannot parse "font".');

                if (isNaN(lineHeight))
                    throw new TypeError('Cannot parse "lineHeight".');

                if (opts.textAlign.toLocaleLowerCase() !== 'left' && opts.textAlign.toLocaleLowerCase() !== 'center' && opts.textAlign.toLocaleLowerCase() !== 'right')
                    throw new TypeError('Property "textAlign" must be set to either "left", "center", or "right".');

                if (opts.verticalAlign.toLocaleLowerCase() !== 'top' && opts.verticalAlign.toLocaleLowerCase() !== 'middle' && opts.verticalAlign.toLocaleLowerCase() !== 'bottom')
                    throw new TypeError('Property "verticalAlign" must be set to either "top", "middle", or "bottom".');

                if (typeof opts.justifyLines !== 'boolean')
                    throw new TypeError('Property "justifyLines" must be a Boolean.');

                if (isNaN(opts.paddingX))
                    throw new TypeError('Property "paddingX" must be a Number.');

                if (isNaN(opts.paddingY))
                    throw new TypeError('Property "paddingY" must be a Number.');

                if (typeof opts.fitParent !== 'boolean')
                    throw new TypeError('Property "fitParent" must be a Boolean.');

                if (opts.lineBreak.toLocaleLowerCase() !== 'auto' && opts.lineBreak.toLocaleLowerCase() !== 'word')
                    throw new TypeError('Property "lineBreak" must be set to either "auto" or "word".');

                if (typeof opts.sizeToFill !== 'boolean')
                    throw new TypeError('Property "sizeToFill" must be a Boolean.');

                if (typeof opts.strokeText !== 'boolean')
                    throw new TypeError('Property "strokeText" must be a Boolean.');

                if (typeof opts.renderHDPI !== 'boolean')
                    throw new TypeError('Property "renderHDPI" must be a Boolean.');

                if (opts.textDecoration.toLocaleLowerCase() !== 'none' && opts.textDecoration.toLocaleLowerCase() !== 'underline')
                    throw new TypeError('Property "textDecoration" must be set to either "none" or "underline".');

            } catch (err) { }
        }
    }

    if ('module' in root && 'exports' in module) {
        module.exports = CanvasTextWrapper;
    } else {
        root.CanvasTextWrapper = CanvasTextWrapper;
    }
})(this);




function drawText(ctx, option) {
    var Font = {
        fontFamily: "Arial"
        , fontSize: 12
        , fontWeight: "Normal"
        , fontStyle: "Normal"
    }
    option.align = option.align || "left"
    option.baseline = option.baseline || "hanging"
    option.rotate = option.rotate || 0;
    option.width = option.width || ctx.FontWidth(option.text, Font);
    option.height = option.height || ctx.FontHeight()
    ctx.Text(option.text
        , option.x
        , option.y
        , option.width
        , option.height
        , option.rotate
        , option.color
        , option.align
        , option.baseline
        , Font);
}
(function (c) {
    if (!c || !c.prototype) return;

    //Font
    c.prototype.FontFormat = function (fontsize, fontweight, fontfamily, fontstyle) {
        fontweight = fontweight || 'normal';
        fontstyle = fontstyle || 'normal';
        this.font = fontstyle + ' ' + fontweight + ' ' + (fontsize | 0) + 'px ' + fontfamily;
    }

    c.prototype.FontWidth = function (text, font) {
        this.save();
        this.FontFormat(font.fontSize, font.fontWeight, font.fontFamily, font.fontStyle);
        return this.measureText(text).width;
        this.restore();
    }

    c.prototype.FontHeight = function (fontsize, fontweight, fontfamily, fontstyle) {
        fontweight = fontweight || 'normal';
        fontstyle = fontstyle || 'normal';
        this.font = fontstyle + ' ' + fontweight + ' ' + (fontsize | 0) + 'pt ' + fontfamily;
        return parseInt(this.font.match(/\d+/), 10);
    }

    //Text Display
    c.prototype.TextDisplay = function (text, x, y, rotate, fill, align, baseline) {
        align = align || "left";
        baseline = baseline || "alphabetic"
        this.save();
        this.fillStyle = fill;
        if (baseline == "alphabetic")
            this.translate(parseInt(x), parseInt(y));
        else if (baseline == "hanging")
            this.translate(parseInt(x + (width / 2)), parseInt(y + (height / 2)));
        this.rotate(toRadians(rotate));
        this.textAlign = align;
        this.textBaseline = baseline;
        this.fillText(text, 0, 0);
        this.restore();
    }

    c.prototype.wrapText = function (text, x, y, rotate, textwidth, fill, stroke, align, baseline, maxWidth, lineHeight, font) {
        this.save();
        var words = text.toString().split(' ');
        var yAdd = parseInt(y);
        var yLine = parseInt(y);
        var line = '';
        this.fillStyle = fill;
        this.strokeStyle = stroke;
        this.textAlign = align;
        this.textBaseline = baseline;
        this.translate(parseInt(x), y);
        this.rotate(rotate * PI / 180);
        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = this.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                this.fillText(line, 0, yAdd - y);
                if (textwidth > 0) this.strokeText(line, 0, yAdd - y);
                this.TextUnderline(line, 0, yLine - y, fill, font, align, baseline);
                line = words[n] + ' ';
                yAdd += lineHeight;
                yLine += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        this.fillText(line, 0, yAdd - y);
        if (textwidth > 0) this.strokeText(line, 0, yAdd - y);
        this.TextUnderline(line, 0, yLine - y, fill, font, align, baseline);
        this.restore();
    }

    c.prototype.wrapTextHeight = function (text, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = this.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        return parseInt(y + lineHeight);
    }

    c.prototype.Text = function (text, x, y, rotate, fill, align, baseline, font) {
        this.save();
        this.FontFormat(font.fontSize, font.fontWeight, font.fontFamily, font.fontStyle);
        this.TextUnderline(text, parseInt(x), parseInt(y), fill, font, align, baseline);
        this.TextDisplay(text, parseInt(x), parseInt(y), rotate, fill, align, baseline);
        this.restore();
    }

    c.prototype.TextWrap = function (text, x, y, rotate, textwidth, fill, stroke, align, baseline, font, maxWidth, lineHeight) {
        this.save();
        this.FontFormat(font.fontSize, font.fontWeight, font.fontFamily, font.fontStyle);
        this.wrapText(text, parseInt(x), parseInt(y), rotate, textwidth, fill, stroke, align, baseline, maxWidth, lineHeight, font);
        this.restore();
    }

    c.prototype.TextUnderline = function (text, x, y, fill, font, align, baseline) {
        var textWidth = this.measureText(text).width;

        var startX = 0;

        if (baseline == "alphabetic") {
            var startY = parseInt(y + (parseInt(font.fontSize) / 15));
        }
        else if (baseline == "middle") {
            var startY = parseInt(y + (parseInt(font.fontSize) / 3));
        }
        else if (baseline == "hanging") {
            var startY = parseInt(y + (parseInt(font.fontSize) / 1.3));
        }

        var endX = 0;
        var endY = startY;
        this.save();
        var underlineHeight = this.FontHeight(font.fontSize, font.fontWeight, font.fontFamily, font.fontStyle) / 15;
        this.restore();

        if (underlineHeight < 1) {
            underlineHeight = 1;
        }

        if (align == "center") {
            startX = parseInt(x - (textWidth / 2));
            endX = parseInt(x + (textWidth / 2));
        } else if (align == "right") {
            startX = parseInt(x - textWidth);
            endX = parseInt(x);
        } else {
            startX = parseInt(x);
            endX = parseInt(x + textWidth);
        }

        if (font.underline == true) this.Line(startX, startY + 1.5, endX, endY + 1.5, underlineHeight, fill);
    }

    //Shadow
    c.prototype.shadowset = function (setx, sety, blur, color) {
        setx = setx || 0;
        sety = sety || 0;
        blur = blur || 0;
        color = color || "#000000";
        this.shadowOffsetX = setx;
        this.shadowOffsetY = sety;
        this.shadowBlur = blur;
        this.shadowColor = color;
    }

    //Line
    c.prototype.Line = function (xa, ya, xb, yb, width, color, Xshadow, Yshadow, blurshadow, colorshadow, dash, cap, join) {
        this.save();
        this.beginPath();
        this.lineWidth = width;
        this.strokeStyle = color;
        this.shadowset(Xshadow, Yshadow, blurshadow, colorshadow);
        dash = dash || [0];
        this.setLineDash(dash);
        this.lineCap = cap;
        this.lineJoin = join;
        this.moveTo(xa, ya);
        this.lineTo(xb, yb);
        if (width > 0) this.stroke();
        this.restore();
    }

    //circle
    c.prototype.circle = function (x, y, r, linewidth, fill, stroke, Xshadow, Yshadow, blurshadow, colorshadow) {
        this.lineWidth = linewidth;
        this.fillStyle = fill;
        this.strokeStyle = stroke;
        this.save();
        this.shadowset(Xshadow, Yshadow, blurshadow, colorshadow);
        this.beginPath();
        this.arc(x, y, r, 0, PI * 2, false);
        this.fill();
        this.restore();
        if (linewidth > 0) this.stroke();
        this.closePath();
    }

    //ellipse
    c.prototype.oval = function (x, y, width, height, rotate, linewidth, fill, stroke, Xshadow, Yshadow, blurshadow, colorshadow) {
        this.lineWidth = linewidth;
        this.fillStyle = fill;
        this.strokeStyle = stroke;
        this.save();
        this.shadowset(Xshadow, Yshadow, blurshadow, colorshadow);
        this.beginPath();
        this.ellipse(x + (width / 2), y + (height / 2), width, height, rotate, 0, PI * 2, false);
        this.fill();
        this.restore();
        if (linewidth > 0) this.stroke();
        this.closePath();
    }

    //rectangle
    c.prototype.rectangle = function (x, y, width, height, linewidth, fill, stroke) {
        this.fillStyle = fill;
        this.strokeStyle = stroke;
        this.save();
        this.beginPath();
        this.rect(x, y, width, height);
        this.closePath();
        this.fill();
        this.restore();
        this.lineWidth = linewidth;
        if (linewidth > 0) this.stroke();
    }
})(CanvasRenderingContext2D);



String.prototype._x_hexEncode = function () {
    var hex, i;

    var result = "";
    for (i = 0; i < this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000" + hex).slice(-4);
    }

    return result
}
String.prototype._x_hexDecode = function () {
    var j;
    var hexes = this.match(/.{1,4}/g) || [];
    var back = "";
    for (j = 0; j < hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}




var Piechart = function (options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    this.x = options.x;
    this.y = options.y;
    this.height = options.height;
    this.width = options.width;

    this.draw = function () {
        var total_value = 0;
        var color_index = 0;
        for (var categ in this.options.data) {
            var val = this.options.data[categ];
            total_value += val;
        }

        var canvasWidth = this.canvas.width;
        var canvasHeight = this.canvas.height;
        var centerx = this.canvas.width / 2;
        var centery = this.canvas.height / 2;

        if (this.width != undefined && this.height != undefined && this.x != undefined && this.y != undefined) {
            canvasWidth = this.width;
            canvasHeight = this.height;
            centerx = this.width / 2 + this.x;
            centery = this.height / 2 + this.y;
        }
        var start_angle = 0;
        for (categ in this.options.data) {
            val = this.options.data[categ];
            var slice_angle = 2 * Math.PI * val / total_value;

            drawPieSlice(
                this.ctx,
                centerx,
                centery,
                Math.min(canvasWidth / 2, canvasHeight / 2),
                start_angle,
                start_angle + slice_angle,
                this.colors[color_index % this.colors.length]
            );

            start_angle += slice_angle;
            color_index++;
        }

    }
}
function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.stroke();
}



function _sfGetConfigDataColumn(config, _id) {
    config[_id] = value;
}
function _sfCreateConfigDataColumn(config, _id, value) {
    if (_id == "textAlignment" || _id == "TextAlign") {
        config["textAlignment"] = value;
        config["TextAlign"] = value;
    }
    else {
        config[_id] = value;
    }
}


function _sfCreateConfigDataRow(config, row, _id, value) {

    var rowindex = -1;
    var notfound = false;
    for (var i = 0; i < config.length; i++) {
        if (config[i].row == row) {
            config[i].config[_id] = value;
            notfound = true; break;
        }
    }

    if (!notfound) {
        config.push({ row: row, config: {} });
        config[config.length - 1].config[_id] = value;
    }

    //config[_id] = value; 

    //nwGridMainCon_Book.ActiveSheet.RowConfig
}




/*

var myCanvas = document.getElementById("myCanvas");
myCanvas.width = 300;
myCanvas.height = 300;

var ctx = myCanvas.getContext("2d");

var mydata = {
    "Classical music": 10,
    "Alternative rock": 14,
    "Pop": 2,
    "Jazz": 12
};
var myCanvas = document.getElementById("mySheet_vw");
var myPiechart = new Piechart(
    {
        canvas:myCanvas,
        data:mydata,
        colors:["#fde23e","#f16e23", "#57d9ff","#937e88"]
        , x:10 , y:10
        ,width:200,height:200
    }
);
myPiechart.draw();
*/

var is_vw_inpDateHover = false;
$(document).on("mouseover", ".P8Spread_Input.hasDatepicker .ui-datepicker", function () {
    setTimeout(function () {
        is_vw_inpDateHover = true;

        //console.log(is_vw_inpDateHover);
    }, 10);
});
//$(document).on("click", `.P8Spread_Input.hasDatepicker [data-handler="selectDay"]`, function () {
//    setTimeout(function () {
//        $(".P8Spread_Input.hasDatepicker").hide();
//    }, 10);
//});
$(document).on("change", ".formulafield", function () {
    var value = $(this).val().trim();
    var canvasID = $(this).parents(".P8Spread").attr("id");
    if (value.indexOf("=") == 0) {
        P8DataList[canvasID][0].sheet.ActiveSheet.SetFormula(undefined, undefined, value);
    } else {
        P8DataList[canvasID][0].sheet.ActiveSheet.SetText(undefined, undefined, value);
    }
});





//$(document).on("focus", ".P8Spread_Input ", function () {

//    if ($(this).hasClass(".nwDatePickP8")) {
//        $(this).datepicker({ altFormat: "mm/dd/yy" });
//    } else {
//        $(this).datepicker("disable");
//    }

//});
//$(document).on("blur", ".P8Spread_Input ", function () {
//    $(this).datepicker("disable");
//});

//$(document).on("mousedown", ".P8Spread_Input.nwDatePickP8 ", function () {
//    var _this = this;
//    var objx = $(_this).parents(".p8_selectorCon");
//    //$(".p8_selectorCon ").show();
//    var e = $.Event('keydown');
//    e.which = 13;
//    e.keyCode = "13";
//    $(objx).find(".P8Spread_Input.nwDatePickP8").trigger(e);
//    $(objx).css("opacity", "0");
//    $(objx).css("overflow", "hidden");

//});





$(document).on("mousedown", ".p8_selectorCon .ui-datepicker-calendar td", function () {

    is_vw_inpDateHover = false;
    var _this = this;
    setTimeout(function () {
        var objx = $(_this).parents(".p8_selectorCon");
        ////$(".p8_selectorCon ").show();
        var e = $.Event('keydown');
        e.which = 13;
        e.keyCode = "13";
        // $(".P8Spread_Input.nwDatePickP8").change();
        $(".P8Spread_Input.nwDatePickP8.active").trigger(e);
        $(".P8Spread_Input.nwDatePickP8.active").parents(".p8_selectorCon").css("opacity", "0");
        $(".P8Spread_Input.nwDatePickP8.active").parents(".p8_selectorCon").css("overflow", "hidden");
        $(".P8Spread_Input.nwDatePickP8.active").removeClass("active");
        //try {
        //    var canvasID = $(_this).closest(".P8Spread").attr("id");
        //    $("#" + canvasID + "_vw_inp").focus()
        //    $("#" + canvasID + "_vw_inp").click();
        //} catch(ex) { }
        //$('.P8Spread_Input').hide();
        // $('.P8Spread_Input').hide();
        // $('.P8Spread_Input.hasDatepicker').hide();
        //console.log(is_vw_inpDateHover);
    }, 150);
    return true;
});

//function func_

$(document).on("click", ".P8Spread .nwgrid_Insert", function () {
    if ($(this).parents(".P8Spread").hasClass("noah-webui-disabled") || $(this).parents(".P8Spread").parent().hasClass("noah-webui-disabled"))
        return false;
    if ((getParameterByName("nwtype") || '') != "")
        return false;
    var varID = $(this).parents(".P8Spread").attr("id");
    var spreadID = varID;

    //RowInsert
    var isContinue = true;
    try {
        var xrow = P8DataList[spreadID][0].sheet.ActiveSheet.GetSelectedIndexes().row;
        var xcol = P8DataList[spreadID][0].sheet.ActiveSheet.GetSelectedIndexes().col;
        isContinue = func_nwGrid_InsertValidation(spreadID, xrow, xcol);

    } catch (err) {
    }
    if (isContinue) {
        var xrow = P8DataList[spreadID][0].sheet.ActiveSheet.GetSelectedIndexes().row;
        var xcol = P8DataList[spreadID][0].sheet.ActiveSheet.GetSelectedIndexes().col;
        P8DataList[spreadID][0].sheet.ActiveSheet.RowInsert(xrow, false);
        try { isContinue = func_nwGrid_InsertDone(spreadID, xrow, xcol); } catch (err) { }
        _sfScrollUpdateSizing(spreadID);
    }
    return false;
});

$(document).on("click", ".P8Spread .nwgrid_CopyRow", function () {
    if ($(this).parents(".P8Spread").hasClass("noah-webui-disabled") || $(this).parents(".P8Spread").parent().hasClass("noah-webui-disabled"))
        return false;
    if ((getParameterByName("nwtype") || '') != "")
        return false;
    var varID = $(this).parents(".P8Spread").attr("id");
    var spreadID = varID;

    //RowInsert
    var isContinue = true;
    try {
        var xrow = P8DataList[spreadID][0].sheet.ActiveSheet.GetSelectedIndexes().row;
        var xcol = P8DataList[spreadID][0].sheet.ActiveSheet.GetSelectedIndexes().col;
        isContinue = func_nwGrid_CopyRowValidation(spreadID, xrow, xcol);
    } catch (err) {
    }
    if (isContinue) {
        var xrow = P8DataList[spreadID][0].sheet.ActiveSheet.GetSelectedIndexes().row;
        var xcol = P8DataList[spreadID][0].sheet.ActiveSheet.GetSelectedIndexes().col;

        var rowcopy = JSON.parse(JSON.stringify(P8DataList[spreadID][0].sheet.ActiveSheet.Data[xrow]));
        P8DataList[spreadID][0].sheet.ActiveSheet.RowInsert(xrow, false);
        P8DataList[spreadID][0].sheet.ActiveSheet.Data[xrow] = rowcopy;


        try { isContinue = func_nwGrid_CopyRowDone(spreadID, xrow, xcol); } catch (err) { }
        _sfScrollUpdateSizing(spreadID);
    }
    return false;
});

$(document).on("click", ".P8Spread .nwgrid_Delete", function () {
    if ($(this).parents(".P8Spread").hasClass("noah-webui-disabled") || $(this).parents(".P8Spread").parent().hasClass("noah-webui-disabled"))
        return false;
    if ((getParameterByName("nwtype") || '') != "")
        return false;
    var varID = $(this).parents(".P8Spread").attr("id");
    var spreadID = varID;

    //RowDelete
    var isContinue = true;
    try {
        var xrow = P8DataList[spreadID][0].sheet.ActiveSheet.GetSelectedIndexes().row;
        var xcol = P8DataList[spreadID][0].sheet.ActiveSheet.GetSelectedIndexes().col;
        isContinue = func_nwGrid_DeleteValidation(spreadID, xrow, xcol);
    } catch (err) {
    }
    if (isContinue) {
        var xrow = P8DataList[spreadID][0].sheet.ActiveSheet.GetSelectedIndexes().row;
        var xcol = P8DataList[spreadID][0].sheet.ActiveSheet.GetSelectedIndexes().col;
        P8DataList[spreadID][0].sheet.ActiveSheet.RowDelete(xrow);
        try { func_nwGrid_DeleteDone(spreadID, xrow, xcol); } catch (err) { }
        _sfScrollUpdateSizing(spreadID);
    }

    return false;
});
$(document).on("click", ".P8Spread .nwgrid_Export", function () {
    if ($(this).parents(".P8Spread").hasClass("noah-webui-disabled") || $(this).parents(".P8Spread").parent().hasClass("noah-webui-disabled"))
        return false;
    if ((getParameterByName("nwtype") || '') != "")
        return false;

    var varID = $(this).parents(".P8Spread").attr("id");
    try {
        func_SpreadExport(varID);
    } catch (err) {
        console.log("Error on Export to Excel");
    }

    //func_nwGrid_Export(this, "excel");
    return false;
});

$(document).on("keypress", ".P8Spread input.nwgrid_SearchNext", function (e) {
    if (e.which == 13) {
        $(this).parents(".P8Spread").find(".nwgrid_SearchFind").click();
    }
});
$(document).on("click", ".P8Spread .nwgrid_SearchFind", function () {
    var SpreadID = $(this).parents(".P8Spread").attr("id");
    var indexes = P8_SpreadGetBook(SpreadID).ActiveSheet.GetSelectedIndexes();
    var frmTitle = "";

    var sobj = P8_SpreadGetBook(SpreadID).ActiveSheet;
    var frow = sobj.FreezeRow - 1;
    var fcol = sobj.GetSelectedIndexes().col;
    var frmTitle = "";

    if (frow < 0) {
        frmTitle = sobj.ColumnName(fcol);
    } else {
        frmTitle = sobj.GetText(fcol, frow);
    }


    if (SpreadID == null || SpreadID == undefined || indexes.col < 0) {
        MessageBox("Please Select Cell", frmTitle, "", "#" + $(this).parents(".P8Spread").attr("id") + " input.nwgrid_SearchNext");
        return false;
    }
    //P8_SpreadGetBook(SpreadID).ActiveSheet.GetSelectedIndexes()

    if ($(this).parents(".P8Spread").find(".nwgrid_SearchNext").val() == "") {
        MessageBox("Please enter Keyword", frmTitle, "", "#" + $(this).parents(".P8Spread").attr("id") + " input.nwgrid_SearchNext");
        return false;
    }

    var strToSearch = $(this).parents(".P8Spread").find(".nwgrid_SearchNext").val();
    var isfind = _sfFindSearch(SpreadID, strToSearch);

    if (isfind == false)
        MessageBox("Cannot find :[" + strToSearch + "]", frmTitle, "error", "#" + $(this).parents(".P8Spread").attr("id") + " input.nwgrid_SearchNext", "Error");


    return false;
    //nwGrid_SetSelectedObjects(crnwTD);
    // $('#nwSearch #nwSearchText').val($(this).parents(".nwGrid").find(".nwgrid_SearchNext").val());
    // toolbox_SearchCheck();
});
function _sfFindSearch(SpreadID, value) {
    var obj = P8_SpreadGetBook(SpreadID).ActiveSheet;
    var indexes = P8_SpreadGetBook(SpreadID).ActiveSheet.GetSelectedIndexes();

    value = value.toUpperCase();
    var skipcount = 1; var isfind = false;
    for (var i = indexes.row + 1; i < obj.Data.length; i++) {
        var currentText = obj.GetText(indexes.col, i);
        currentText = currentText.toUpperCase();
        if (currentText.indexOf(value) >= 0) {
            obj.CellIndexes.Row = i;
            obj.CellIndexes.Row2 = obj.CellIndexes.Row;

            var minusScroll = obj.FreezeRow > 0 ? obj.FreezeRow : 0;

            if (obj.FreezeRow == i && obj.FreezeRow > 0) {
                minusScroll = i - (minusScroll - 1);
            }
            else {
                minusScroll = i - minusScroll;
            }
            if (minusScroll < 0) minusScroll = i;

            obj.ScrollRender(undefined, minusScroll);


            //obj.ScrollDown(skipcount);
            isfind = true;
            break;
        }
        skipcount++;
    }
    if (isfind == false) {
        skipcount = 1;
        for (var i = 0; i <= indexes.row; i++) {
            var currentText = obj.GetText(indexes.col, i);
            currentText = currentText.toUpperCase();
            if (currentText.indexOf(value) >= 0) {
                obj.CellIndexes.Row = i;
                obj.CellIndexes.Row2 = obj.CellIndexes.Row;
                //obj.startRow = obj.FreezeRow-1 <= 0 ? obj.FreezeRow-1:0;
                //obj.ScrollDown(skipcount);
                var minusScroll = obj.FreezeRow > 0 ? obj.FreezeRow : 0;


                if (obj.FreezeRow == i && obj.FreezeRow > 0) {
                    minusScroll = i - (minusScroll - 1);
                }
                else {
                    minusScroll = i - minusScroll;
                }
                if (minusScroll < 0) minusScroll = i;

                obj.ScrollRender(undefined, minusScroll);
                obj.Refresh();
                isfind = true;
                break;
            }
            skipcount++;
        }
    }

    return isfind;
}




//function _SfgetIndexOf(data) {
//    var index = 0;
//    nwGridMainCon_Book.ActiveSheet.Data.find(function (item, i) {
//        if (item.A.value == data) {
//            index = i + 1;
//            return i;
//        }
//    });
//    return index
//}
// 

function P8_SpreadGetBook(SpreadID) {
    try {
        return P8DataList[SpreadID][0].sheet;
    } catch (err) { }
    return null;
}



function _sfGetBooleanValue(value) {
    value = value || "";
    value = value + "";
    value = value.toLowerCase();
    if (value == "true" || value == "1" || value == "on" || value == "yes")
        return true;
    return false;
}
function _sfGetCheckboxValue(value) {
    value = (value || "").toString().toLocaleLowerCase();
    if (value == "1" || value == "true" || value == "on" || value == "yes")
        return true;
    return false;
}

function _sfDrawCheckBox(ctx, x, y, width, height, value) {

    //width = 100; height = 100;
    ctx.beginPath();
    var min = width < height ? width : height;
    min = min * 1.35;
    var tick = min * 0.42;
    var tickLine = min * 0.15;
    var border = 2;




    ctx.fillStyle = '#D4D7Da';
    ctx.fillRect(x, y, width, height);

    //ctx.fillStyle = '#c4c7ca';
    //ctx.fillRect(x, y, width, height);

    if (value == true) {

        ctx.fillStyle = 'white';
        ctx.fillRect(x + border, y + border, width - (border * 2), height - (border * 2));
        ctx.closePath();


        //ctx.beginPath();
        //ctx.moveTo(x + (tick * 1.0), y + tick * 1.2);
        //ctx.lineTo(x + (tick * 1.0) * 1.2, y + tick * 1.4);
        //ctx.lineTo(x + (tick * 1.0) * 1.6, y + tick);
        //ctx.lineWidth = tickLine;
        //ctx.strokeStyle = '#fff';
        //ctx.stroke();

        //draw tick
        x = x - tick;
        y = y - tick;
        ctx.beginPath();
        ctx.moveTo(x + (min * 0.625), y + (min * 0.75));
        ctx.lineTo(x + (min * 0.75), y + (min * 0.875));
        ctx.lineTo(x + (min * 1.0), y + (min * 0.625));
        ctx.lineWidth = tickLine;
        ctx.strokeStyle = 'green';
        ctx.stroke();
        //}

        //200 = 100
        //175 = 87.5
        //150 = 75
        //125 = 62.5
        //100 = 50 

        ////draw tick
        //ctx.beginPath();
        //ctx.moveTo(125, 150);
        //ctx.lineTo(150, 175);
        //ctx.lineTo(200, 125);
        //ctx.lineWidth = 20;
        //ctx.strokeStyle = '#fff';
        //ctx.stroke();
    }
    else {
        ctx.fillStyle = '#e3f4f3';
        ctx.fillRect(x + border, y + border, width - (border * 2), height - (border * 2));
    }

    ctx.closePath();
}
function _sfDrawButton(ctx, x, y, width, height, value) {
    try {
        if (value == "") value = "gray";

        var color1 = "rgba(0,0,0,0.2)";
        var color2 = "rgba(255,255,255,0.2)";
        var colorMain = value;

        var grd = ctx.createLinearGradient(x, y + height, x, y);
        grd.addColorStop(0, color1);
        grd.addColorStop(1, color2);


        ctx.beginPath();
        ctx.fillStyle = colorMain;
        ctx.roundRect(x, y, width, height, width * 0.05);
        ctx.fill();
        ctx.closePath();


        ctx.lineWidth = 1;
        ctx.strokeStyle = value;
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, width * 0.05);
        ctx.stroke();
        ctx.fill();
    } catch (err) { }
}
var dataload = "<div class='nwGridDataBatchLoading'><div class='loadr'><div class='loadrC'><div class='loadCon'><div class='loadrLine'></div></div><div class='loadrText'><br><span class='loadPerc'>10%</span><span class='loadcurrent'>0</span> of <span class='loadtotal'>0</span></div></div></div></div>"
function _sfLoading(canvasID, total, current) {
    // $('#' + canvasID).find('.nwGridDataBatchLoading').remove();
    if ($('#' + canvasID).find('.nwGridDataBatchLoading').html() == undefined)
        $('#' + canvasID).append(dataload);

    var obj = $('#' + canvasID).find('.nwGridDataBatchLoading');
    obj.find('.loadtotal').text(total);
    _sfLoadingUpdate(canvasID, current);
}
var _sfspreadcurrent = 0;
function _sfLoadingUpdateAppend(canvasID, currentAdd) {
    var obj = $('#' + canvasID).find('.nwGridDataBatchLoading');
    //var current = 0;
    //current = parseInt(obj.find('.loadcurrent').text());
    if(currentAdd <= 10000){
        _sfspreadcurrent = 0;
    }
    _sfspreadcurrent += currentAdd;

    //try {
    //    var obook = P8DataList[canvasID][0].sheet.ActiveSheet.Book;
    //    obook.Book.curCount += currentAdd;
    //} catch (err) { }
    //try {
    //    total = P8DataList["nwGridDLCon"][0].sheet.ActiveSheet.GetMaxRow()
    ////    obook.Book.curCount += currentAdd;
    //} catch (err) { }

    _sfLoadingUpdate(canvasID, _sfspreadcurrent);
    //if(total >= _sfspreadcurrent){
    //    try { p8Spread_DataBindDone(canvasID) } catch (exx) { }
    //}
}
function _sfLoadingUpdate(canvasID, current, total) {
    var obj = $('#' + canvasID).find('.nwGridDataBatchLoading');

    //if (obj.html() == undefined) {
    //        $('#' + canvasID).append(dataload);
    //}
    //try{
    //    var obook = P8DataList[canvasID][0].sheet.ActiveSheet.Book;
    //    current = obook.Book.curCount;
    //} catch (err) { }

    if (total != undefined) obj.find('.loadtotal').text(total);
    else total = obj.find('.loadtotal').text();

    if (current >= total) current = total;
    obj.find('.loadcurrent').text(current);
    var perc = (current / parseInt(total) * 100).toFixed(2);

    obj.find('.loadrLine').css("width", perc + "%");
    obj.find('.loadPerc').text(perc + " %");




    if (perc >= 100.0) {
        setTimeout(function () { obj.fadeOut(500) }, 300);
    }

}

function FontFormat(ctx, fontsize, fontweight, fontfamily, fontstyle) {
    fontweight = fontweight || 'normal';
    fontstyle = fontstyle || 'normal';
    ctx.font = fontstyle + ' ' + fontweight + ' ' + (fontsize | 0) + 'px ' + fontfamily;
}

function FontWidth(ctx, text, fontsize, fontweight, fontfamily, fontstyle) {
    //ctx.save();
    FontFormat(ctx, fontsize, fontweight, fontfamily, fontstyle);
    return ctx.measureText(text).width;
    //ctx.restore();
}


function wrapTextHeight(ctx, text, y, maxWidth, lineHeight) {
    var words = (text + "").split(' ');
    var line = '';

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    return parseInt(y /*+ lineHeight*/);
}

function FontHeight(ctx, fontsize, fontweight, fontfamily, fontstyle) {
    fontweight = fontweight || 'normal';
    fontstyle = fontstyle || 'normal';
    this.font = (fontstyle || "") + ' ' + (fontweight || "") + ' ' + (fontsize || 12) + 'px ' + (fontfamily || "");
    return parseInt(ctx.font.match(/\d+/), fontsize);
}

var defset = _sfDefaultSettings();

var Font = {
    fontFamily: defset.fontFamily
    , fontSize: defset.fontSize
    , fontWeight: "norlam"
    , fontStyle: "normal"
};
//var textheight = wrapTextHeight(ctx, text, 0, width, (FontHeight(ctx, Font.fontSize, Font.fontWeight, Font.fontFamily, Font.fontStyle)));



var _sfParser = {
    isNumber: function (value) {
        var fvalue = true;
        try {
            if (isNaN(fvalue)) fvalue = false;
        } catch (err) {
            fvalue = false;
        }
        return fvalue;
    },
    ParseDouble: function (value) {
        var fvalue = 0.0;
        try {
            fvalue = parseFloat(value + "");
        } catch (err) {

        }
        return fvalue;
    },
    ParseDecimal: function (value) {
        var fvalue = 0.0;
        try {
            fvalue = parseFloat(value + "");
        } catch (err) {

        }
        return fvalue;
    },
    ParseShort: function (value) {
        var fvalue = 0;
        try {
            fvalue = parseInt(value + "");
        } catch (err) {

        }
        return fvalue;
    },
    ParseString: function (value) {
        var fvalue = "";
        try {
            fvalue = value == undefined || value == NaN ? "" : (value + "");
        } catch (err) {

        }
        return fvalue;
    },
    ParseBool: function (value) {
        var fvalue = false;
        try {
            value = value + "";
            if (value.toLowerCase() == "true" || value.toLowerCase() == "1" || value.toLowerCase() == "on" || value.toLowerCase() == "yes")
                fvalue = true;
        } catch (err) {

        }
        return fvalue;
    }
};


function _sfCheckIfMerge(obj, col, row, type, cell) {
    var isValid = false;

    if (cell == undefined) cell = { row: -1, col: -1 };

    var len = obj.mergeList.length;
    for (var i = 0; i < len; i++) {
        if (type == "col") {
            if ((obj.mergeList[i].col <= col && obj.mergeList[i].col2 >= col)
                && (obj.mergeList[i].row <= row && obj.mergeList[i].row2 >= row)
                && (obj.mergeList[i].col != obj.mergeList[i].col2)
            ) {
                cell.row = obj.mergeList[i].row;
                cell.col = obj.mergeList[i].col;
                isValid = true; break;
            }
        } else if (type == "row") {
            if ((obj.mergeList[i].col <= col && obj.mergeList[i].col2 >= col)
                && (obj.mergeList[i].row <= row && obj.mergeList[i].row2 >= row)
                && (obj.mergeList[i].row != obj.mergeList[i].row2)
            ) {
                cell.row = obj.mergeList[i].row;
                cell.col = obj.mergeList[i].col;
                isValid = true; break;
            }
        }
        else {
            if ((obj.mergeList[i].col <= col && obj.mergeList[i].col2 >= col)
                && (obj.mergeList[i].row <= row && obj.mergeList[i].row2 >= row)) {
                cell.row = obj.mergeList[i].row;
                cell.col = obj.mergeList[i].col;
                isValid = true; break;
            }
        }

    }


    return isValid;
}


var xDown = null;
var yDown = null;

var delayTime = new Date();


function getTouches(evt) {
    return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt, obj) {
    const firstTouch = getTouches(evt)[0];
    delayTime = new Date();
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};


var varprevSwipex = null;
var varprevSwipey = null;
function handleTouchMove(evt, obj) {
    evt.preventDefault();

    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;


    var b = new Date();
    var xx = b.getTime() - delayTime.getTime();
    if (b.getTime() - delayTime.getTime() >= 1500) {
        delayTime = new Date();
        return false;
    }

    varprevSwipex = xDiff;
    varprevSwipey = yDiff;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
            /* left swipe */
            console.log("swipe left " + xDiff + " @@ " + xx);
            obj.ScrollRight();


        } else {
            /* right swipe */
            console.log("swipe right " + xDiff + " @@ " + xx);
            obj.ScrollLeft();
        }
    } else {
        if (yDiff > 0) {
            /* up swipe */
            console.log("swipe up " + yDiff + " @@ " + xx);
            obj.ScrollDown();
        } else {
            /* down swipe */
            console.log("swipe down " + yDiff + " @@ " + xx);
            obj.ScrollUp();
        }
    }
    /* reset values */
    //xDown = null;
    //yDown = null;
};


function _sfDetectMobile() {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
        return true;
    return false;
}





//Formulalist
var conFormulaFunc = new Array();
conFormulaFunc[0] = "SUM"; // function Name
conFormulaFunc[1] = "COUNTA"; // function Name
conFormulaFunc[2] = "COUNT"; // function Name
conFormulaFunc[3] = "MIN"; // function Name
conFormulaFunc[4] = "MAX"; // function Name
conFormulaFunc[5] = "AVG"; // function Name
conFormulaFunc[6] = "AVERAGE"; // function Name
conFormulaFunc[7] = "COUNTIF"; // function Name
conFormulaFunc[8] = "COUNTIFS"; // function Name
conFormulaFunc[9] = "SUMIF"; // function Name
conFormulaFunc[10] = "SUMIFS"; // function Name
conFormulaFunc[11] = "ROUND";
conFormulaFunc[12] = "DAY";
conFormulaFunc[13] = "MONTH";
conFormulaFunc[14] = "YEAR";
conFormulaFunc[15] = "TEXT";

// Regular expression to match Excel functions
var excelFunctions = /(SUM|SUMIF|SUMIFS|COUNTIF|COUNTIFS|COUNTA|COUNT|MIN|MAX|AVG|AVERAGE|ROUND|DAY|MONTH|YEAR|TEXT)\(/gi;

var functionMap = {
    'SUM': _sfSum,
    'SUMIF': _sfSumIf,
    'SUMIFS': _sfSumIfs,
    'COUNTIF': _sfCountIf,
    'COUNTIFS': _sfCountIfs,
    'COUNTA': _sfCountA,
    'COUNT': _sfCount,
    'MIN': _sfMin,
    'MAX': _sfMax,
    'AVG': _sfAvg,
    'AVERAGE': _sfAvg,
    'ROUND': _sfRound,
    'DAY': _sfDay,
    'MONTH': _sfMonth,
    'YEAR': _sfYear,
    'TEXT': _sfText
};


function func_GetFormulaFunc(crFormulaFunc) {
    crFormulaFunc = crFormulaFunc.toUpperCase();
    for (var i = 0; i < conFormulaFunc.length; i++) {

        if (crFormulaFunc == conFormulaFunc[i]) {
            // console.log(conFormulaFunc+ '\n' +crFormulaFunc+"@"+i+"@"+ conFormulaFunc[i] +"@" + conFormulaFunc.length);
            break;
        }
        if (i == conFormulaFunc.length - 1) crFormulaFunc = "";
    }
    return crFormulaFunc;
}
function func_GetFormulaReplace(ExFormula) {
    for (var i = 0; i < conFormulaFunc.length; i++) {
        ExFormula = ExFormula.replaceAll(conFormulaFunc[i], "");
    }
    return ExFormula;
}



function func_GetFormulaRangeValue(ExFormula, obj, crFormulaFunc) {
    // ExFormula    A1:D2,D3
    var xvalue = 0.0;
    var xvalueTemp = "";
    var xType = "+";

    var ExFormulaArry = ExFormula.split(",");
    var xval = ""; var xvalF = "";
    var xminval = 0; var xmaxval = 0;
    var xcountval = 0; // COUNT
    var xcountvalA = 0;// COUNTA
    var xcountvalIF = 0;// COUNTIF

    var xmax = -1; var ymax = -1;
    var xmin = -1; var ymin = -1;


    var varCondition = "";

    for (var i = 0; i < ExFormulaArry.length; i++) {

        xvalueTemp = ExFormulaArry[i];

        if ((crFormulaFunc.toUpperCase() == "SUMIF"
            || crFormulaFunc.toUpperCase() == "COUNTIF") && i >= 1) {
            break;
        }
        if ((crFormulaFunc.toUpperCase() == "SUMIF"
            || crFormulaFunc.toUpperCase() == "COUNTIF") && i == 0) {
            varCondition = ExFormulaArry[1];;
            if (varCondition.indexOf("\"") == 0) {
                varCondition = varCondition.substring(1);
            }
            if (varCondition.lastIndexOf("\"") == varCondition.length - 1) {
                varCondition = varCondition.substring(0, varCondition.length - 1);
            }
        }

        if (xvalueTemp.indexOf(":") >= 1) {
            var xvalueTempArry = xvalueTemp.split(":");
            var tempstr;
            var cellIndexConverted = cellA1ToIndex(xvalueTempArry[0]);
            var cellIndexConverted2 = cellA1ToIndex(xvalueTempArry[1]);

            ymin = cellIndexConverted.row;
            xmin = cellIndexConverted.col;

            ymax = cellIndexConverted2.row;
            xmax = cellIndexConverted2.col;

            if (ymin > ymax) { tempstr = ymax; ymax = ymin; ymin = tempstr; }
            if (xmin > xmax) { tempstr = xmax; xmax = xmin; xmin = tempstr; }


            //  alert(xmin +"@"+ymin +"@"+xmax +"@"+ymax +"@");


            for (var i2 = ymin; i2 <= ymax; i2++) {
                for (var xcol = xmin; xcol <= xmax; xcol++) {

                    //xval= nwLib.nwTempTable_RowData_Get($(obj).parents(".nwGrid").parent().attr("id"),i2,xcol,"input");
                    //xval = $("#" + $(obj).parents(".nwGrid").parent().attr("id")).find(".tblGridBody  tr:eq(" + i2 + ")  td:eq(" + (xcol + 1) + ") ").find("input").val();
                    xval = obj.GetValue(xcol, i2) + "";


                    func_GetFormulaRangeAddClass(xcol, i2, obj); // register Cell to the Class

                    // alert("Angelo" +"@"+ $(obj).html() +"@"+ $(obj).parents(".nwGrid").parent().attr("id")+ "@" +i2+ "@" +xcol + "@" +xval);

                    if (xvalF != "") xvalF = xvalF + xType;



                    if (xval == undefined || xval == "undefined" || xval == "") xvalF = xvalF + "0";
                    else {
                        try {

                            if (crFormulaFunc.toUpperCase() == "SUMIF") {
                                if ((xval + "").toLowerCase() == (varCondition + "").toLowerCase())
                                    xvalF = xvalF + nwNumber(xval);
                            }
                            else
                                xvalF = xvalF + nwNumber(xval);

                        } catch (err) {
                            xvalF = xvalF + "0";
                        }
                    }


                    try {
                        if (xval != "") xcountvalA = xcountvalA + 1;
                        if ((xval + "").toLowerCase() == (varCondition + "").toLowerCase()) xcountvalIF = xcountvalIF + 1;


                        if (parseFloat(xval)) {
                            xcountval = xcountval + 1;
                        }
                        //    if(xval == "") xval ="0";


                        if (parseFloat(xval) >= xmaxval) xmaxval = parseFloat(xval);
                        if (parseFloat(xval) <= xminval) xminval = parseFloat(xval);
                        else {
                            if (xval != "" && xcountval == 1) xminval = parseFloat(xval);
                        }


                    } catch (err) { }

                }

            }

        }
        else {
            var cellIndexConverted = cellA1ToIndex(ExFormulaArry[i]);
            //xval = nwLib.nwTempTable_RowData_Get($(obj).parents(".nwGrid").parent().attr("id"), cellIndexConverted.row, cellIndexConverted.col, "input");
            xval = obj.GetValue(cellIndexConverted.col, cellIndexConverted.row) + "";

            //    alert("Angelo" +"@"+ $(obj).html() +"@"+ $(obj).parents(".nwGrid").parent().attr("id")+ "@" +cellIndexConverted.row+ "@" +cellIndexConverted.col + "@" +xval);

            func_GetFormulaRangeAddClass(cellIndexConverted.col, cellIndexConverted.row, obj);
            if (xvalF != "") xvalF = xvalF + xType;

            if (xval == undefined || xval == "undefined" || xval == "") xvalF = xvalF + "0";
            else {
                try {
                    xvalF = xvalF + nwNumber(xval);
                } catch (err) {
                    xvalF = xvalF + "0";
                }
            }


            try {
                if (xval != "") xcountvalA = xcountvalA + 1;

                if (parseFloat(xval)) {
                    xcountval = xcountval + 1;
                }
                //   if(xval == "") xval ="0";
                //if(xminval == undefined )xminval =parseFloat(xval) ;

                if (parseFloat(xval) >= xmaxval) xmaxval = parseFloat(xval);
                if (parseFloat(xval) <= xminval) xminval = parseFloat(xval);
                else {
                    if (xval != "" && xcountval == 1) xminval = parseFloat(xval);
                }

            } catch (err) { }

        }



    }

    if (crFormulaFunc.toUpperCase() == "COUNT") xvalF = xcountval + "";
    else if (crFormulaFunc.toUpperCase() == "COUNTA") xvalF = xcountvalA + "";
    else if (crFormulaFunc.toUpperCase() == "COUNTIF") xvalF = xcountvalIF + "";


    else if (crFormulaFunc.toUpperCase() == "MAX") xvalF = xmaxval + "";
    else if (crFormulaFunc.toUpperCase() == "MIN") xvalF = xminval + "";

    else if (crFormulaFunc.toUpperCase() == "AVERAGE") xvalF = "(" + xvalF + ")/" + (xcountval == 0 ? 1 : xcountval);
    else if (crFormulaFunc.toUpperCase() == "AVG") xvalF = "(" + xvalF + ")/" + (xcountval == 0 ? 1 : xcountval);


    // SUM & SUMIF
    xvalF = "(" + xvalF + ")";


    /// EDIT FOrmula


    xvalue = eval(xvalF);



    return xvalue;
}


function nwNumber(x) {
    var xer = parseFloat(x.replace(/,/g, ""));
    var xers = 0;
    if (!isNaN(xer) && xer != "") xers = xer;
    return xers;
}


//function cellA1ToIndex(cellA1, index) {
//    cellA1 = (cellA1 + "").trim();
//    // Ensure index is (default) 0 or 1, no other values accepted.
//    index = index || 0;
//    index = (index == 0) ? 0 : 1;

//    // Use regex match to find column & row references.
//    // Must start with letters, end with numbers.
//    // This regex still allows induhviduals to provide illegal strings like "AB.#%123"
//    var match = cellA1.match(/(^[A-Z]+)|([0-9]+$)/gm);

//    if (match.length != 2) throw new Error("Invalid cell reference");

//    var colA1 = match[0];
//    var rowA1 = match[1];

//    return {
//        row: rowA1ToIndex(rowA1, index),
//        col: colA1ToIndex(colA1, index)
//    };
//}

function cellA1ToIndex(cellA1, index) {

    return _sfcellA1ToIndex(cellA1, index)

}

function func_GetFormulaRangeAddClass(col, row, obj) {
    //var xcell = GetLetterByNumber(col + 1, true) + (row + 1);
    //var xtemp = $(obj).attr("aagFCon");
    //xcell = "aagF" + xcell;
    //$(obj).attr("aagFCon", xtemp + " " + xcell);


}



function GetLetterByNumber(index, isUpper) {
    var strLetter = "";

    strLetter = GetExcelColumnName(index);

    if (!isUpper == true) strLetter = strLetter.toLowerCase();

    return strLetter;
}
function GetExcelColumnName(columnNumber) {
    var dividend = columnNumber;
    var columnName = "";
    var modulo;

    while (dividend > 0) {
        modulo = (dividend - 1) % 26;
        columnName = String.fromCharCode(65 + modulo) + columnName;
        dividend = parseInt((dividend - modulo) / 26);
    }

    return columnName;
}

function _sfPromptMessage(msg) {
    try {
        ToastMessage(msg);
    } catch (err) {
        console.error(msg);
    }
}







$(document).on("click", ".P8Spread .nwgrid_SaveWidth", function () {
    if ($(this).parents(".P8Spread").hasClass("noah-webui-disabled") || $(this).parents(".P8Spread").parent().hasClass("noah-webui-disabled"))
        return false;

    if ((getParameterByName("nwtype") || '') != "")
        return false;


    if (($(this).parents(".P8Spread").attr('isresize') || '') != "1") {
        MessageBox("No changes have been made.", "Save Column Width");
        return false;
    }
    nwLoading_Start("actnwSaveColWidth", crLoadingHTML);


    var canvasID = $(this).parents(".P8Spread").attr("id");
    var spread = P8DataList[canvasID][0].sheet.ActiveSheet;


    var sindex = P8DataList[canvasID][0].sheet.GetActiveSheet();
    var nwsavecolumnID = spread.Book.Buttons[sindex]._ColumnWidthSaveID;


    if (nwsavecolumnID == "aagExportToExcel")
        nwsavecolumnID = crLnkGateKey + "-ExportExcel";


    var gridID = $(this).parents(".P8Spread").attr("id");
    nwParameter_Add("nwMenuID", nwsavecolumnID);
    nwParameter_Add("nwvarColWidth", p8SpreadGetColWith(this));
    var standardCrLnk = crSTDLnk;
    func_ActionDriven("actnwSaveColWidth", false, standardCrLnk);
    $(this).parents(".P8Spread").attr('isresize', 0);
    $(this).parents(".P8Spread").attr('isresetsize', 1);
    return false;
});

$(document).on("click", ".P8Spread .nwgrid_ResetWidth", function () {

    if ($(this).parents(".P8Spread").hasClass("noah-webui-disabled") || $(this).parents(".P8Spread").parent().hasClass("noah-webui-disabled"))
        return false;

    if ((getParameterByName("nwtype") || '') != "")
        return false;

    var gridID = $(this).parents(".P8Spread").attr("id");
    var canvasID = $(this).parents(".P8Spread").attr("id");
    var spread = P8DataList[canvasID][0].sheet.ActiveSheet;
    var hasChange = false;

    for (var i = 0; i < spread.ColumnConfig.length; i++) {
        var ColumnWidth = parseInt(spread.ColumnConfig[i].ColumnWidth);
        var width = parseInt(spread.ColumnConfig[i].width);
        if (ColumnWidth != width) {
            hasChange = true; break;
        }
    }


    if (($(this).parents(".P8Spread").attr('isresize') || '') == "1"
        || ($(this).parents(".P8Spread").attr('isresetsize') || '1') == "1"
    ) {
    }
    else {
        if (hasChange == false) {
            MessageBox("No changes have been made.", "Reset Column Width");
            return false;
        }
    }
    nwLoading_Start("actnwResetColWidth", crLoadingHTML);

    xdelobj = this;
    p8SpreadResetColWith(xdelobj);


    var sindex = P8DataList[canvasID][0].sheet.GetActiveSheet();
    var nwsavecolumnID = spread.Book.Buttons[sindex]._ColumnWidthSaveID;
    if (nwsavecolumnID == "aagExportToExcel")
        nwsavecolumnID = crLnkGateKey + "-ExportExcel";


    nwParameter_Add("nwMenuID", nwsavecolumnID);
    var standardCrLnk = crSTDLnk;

    func_ActionDriven("actnwResetColWidth", false, standardCrLnk);
    $(this).parents(".P8Spread").attr('isresize', 0);
    $(this).parents(".P8Spread").attr('isresetsize', 0);

    return false;
});

$(document).on("click", ".P8Spread .nwgrid_HeaderShowHide", function () {
    if ($(this).parents(".P8Spread").hasClass("noah-webui-disabled") || $(this).parents(".P8Spread").parent().hasClass("noah-webui-disabled"))
        return false;

    var gridID = $(this).parents(".P8Spread").attr("id");
    var buttonstatus = $(this).attr('buttonstatus');
    var buttonindex = parseInt($(this).attr('buttonindex'));

    var canvasID = $(this).parents(".P8Spread").attr("id");
    var spread = P8DataList[canvasID][0].sheet.ActiveSheet;
    var freezecount = spread.FreezeRow;
    var headersize = 0;
    var hideheadersize = 0;

    if (buttonstatus == "true") {
        $("#" + gridID).addClass("nwGridHideHeader");
        $(this).attr('buttonstatus', 'false');
        $(this).text($(this).attr('txtshow'));
        spread.HideHeader = true;
        spread.HideHeaderIndex = buttonindex;
        spread.Refresh();
    }
    else {
        $("#" + gridID).addClass("nwGridHideHeader");
        $(this).attr('buttonstatus', 'true');
        $(this).text($(this).attr('txthide'));
        spread.HideHeader = false;
        spread.HideHeaderIndex = buttonindex;
        spread.Refresh();
    }
    return false;
});




function p8SpreadResetColWith(ver) {
    var canvasID = $(ver).parents(".P8Spread").attr("id");
    var spread = P8DataList[canvasID][0].sheet.ActiveSheet;
    xcount = spread.ColumnConfig.length;
    for (xctr = 0; xctr < xcount; xctr++) {
        var tempwidth = spread.ColumnConfig[xctr].ColumnWidth;
        var xwidth = spread.ColumnConfig[xctr].width;
        if (parseFloat(xwidth) <= 0) continue;

        if (tempwidth == "aagdefault")
            tempwidth = 120;

        spread.ColumnWidth(xctr, parseFloat(tempwidth));
        //spread.ColumnConfig[xctr].ColumnWidth = spread.ColumnConfig[xctr].width;
    }
    spread.Refresh();
}
function p8SpreadGetColWith(ver) {
    var ColWidth = " ";
    var canvasID = $(ver).parents(".P8Spread").attr("id");
    var isGroup = false;
    var xcount = 0;
    var spread = P8DataList[canvasID][0].sheet.ActiveSheet;

    //if ($('#' + gridID + ' .nwgrid_columnheaderGroup').html() != undefined)
    //    isGroup = true;

    //if (isGroup == true) xcount = $('#' + gridID + ' table.tblGridHeader colgroup.colgroup col').length;
    //else xcount = $('#' + gridID + ' table.tblGridHeader colgroup.colgroup col').length;

    //console.log(gridID + " " + xcount + " " + isGroup);


    xcount = spread.ColumnConfig.length;

    for (xctr = 0; xctr < xcount; xctr++) {
        if (isGroup == true)
            ColWidth += spread.ColumnWidth(xctr) + '|';
        else
            ColWidth += spread.ColumnWidth(xctr) + '|';
    }

    return ColWidth.substring(1, ColWidth.length - 1);
}


function _sfAddToList() {
    var sheet = P8_SpreadGetBook(p8Spread_CurBook).ActiveSheet;
    var jsonTable = func_ConvertTableJSON($('#dimTableLookUp'));

    if (jsonTable.length <= 0)
        jsonTable = func_ConvertTableJSON($('#dimTableLookUpCon'));


    var addtoListTableRec = $('#dimTableLookUp');
    if (addtoListTableRec.html() == undefined)
        addtoListTableRec = $('#dimTableLookUpCon tbody');

    var cell = sheet.GetSelectedIndexes();
    var currow = cell.row;
    var curcol = cell.col;
    if (currow < 0) { currow = 0; }
    for (var i = 0; i < jsonTable.length; i++) {
        var crnwTRtemp = [];

        var collength = sheet.GetMaxCol();
        for (var i2 = 0; i2 < collength; i2++) {
            crnwTRtemp.push("");
        }

        if (addtoListTableRec.find(".nwlookupgridcheck:eq(" + i + ")").prop("checked") == false)
            continue;
        //if (version == "v10") {
        //} else {
        //    if (sheet.CellIndexes.Row <= 0)
        //        func_nwGrid_AddRow(nwGridID);
        //}
        crnwTRtemp = nwGrid_AddtoListDone(p8Spread_CurBook, crnwTRtemp, addtoListTableRec, i);

        if (crnwTRtemp == null || crnwTRtemp == undefined){
            continue;
        }

        var rowminus = 0;
        var colblank = false;
        if(i == 0){
            if(!p8Spread_IsNull(sheet.Data[currow][p8_NumberToCell(curcol+1)].value)){
                colblank = false;
            }else{
                colblank = true;
                rowminus = 1;
            }
            //for (var i2 = 0; i2 < collength; i2++) {
            //    if(!p8Spread_IsNull(sheet.Data[currow][p8_NumberToCell(i2+1)].value)){
            //        allblank = false;
            //        break;
            //    }else{
            //        allblank = true;
            //    }
            //}
            //if(!allblank){
            //    rowadd = 1;
            //}
        }else{
            colblank = false;
        }
        if(!colblank){
            sheet.RowInsert(currow, true, true);
        }
        currow -= rowminus;
        currow++;
        for (var i2 = 0; i2 < collength; i2++) {
            sheet.SetText(i2, currow, crnwTRtemp[i2]);
        }

        sheet.CellIndexes.Row += 1;
        sheet.CellIndexes.Row2 += 1;
       


    }
    try {




        nwGrid_AddtoListLoaded(p8Spread_CurBook);
    }
    catch (err) { }
}

function P8_SpreadColumnValueExist(sheet, col, value) {
    var rowlength = sheet.GetMaxRow();
    for (var i = 0; i < rowlength; i++) {
        var tvalue = sheet.GetValue(col, i);
        if (tvalue == value)
            return true;
    }

    return false;
}

P8.SpreadSheet.prototype.GetBackground = function (c, r) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV;
    try {
        stringV = _sfCheckConfigType(this, r, c, "backgroundColor", false);;
    } catch (err) {

    }
    try { stringV = (stringV + "").replace("!important", ""); } catch (err) { }

    return stringV;
}


P8.SpreadSheet.prototype.GetTextAlign = function (c, r) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV;
    try {
        stringV = _sfCheckConfigType(this, r, c, "textAlignment", false);;
    } catch (err) {

    }
    try { stringV = (stringV + "").replace("!important", ""); } catch (err) { }

    return stringV;
}


P8.SpreadSheet.prototype.GetTextColor = function (c, r) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV;
    try {
        stringV = _sfCheckConfigType(this, r, c, "textColor", false);;
    } catch (err) {

    }
    try { stringV = (stringV + "").replace("!important", ""); } catch (err) { }

    return stringV;
}

P8.SpreadSheet.prototype.GetFontFamily = function (c, r) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV;
    try {
        stringV = _sfCheckConfigType(this, r, c, "fontFamily", false);;
    } catch (err) {

    }
    try { stringV = (stringV + "").replace("!important", ""); } catch (err) { }

    return stringV;
}


P8.SpreadSheet.prototype.GetFontSize = function (c, r) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV;
    try {
        stringV = _sfCheckConfigType(this, r, c, "fontSize", false);;
    } catch (err) {

    }
    try { stringV = (stringV + "").replace("!important", ""); } catch (err) { }

    return stringV;
}


P8.SpreadSheet.prototype.GetCurrencyCode = function (c, r) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var stringV = "";
    try {
        stringV = _sfCheckConfigType(this, r, c, "currencyCode", "");;
    } catch (err) {

    }
    try { stringV = (stringV + "").replace("!important", ""); } catch (err) { }

    return stringV;
}

P8.SpreadSheet.prototype.GetBorderStyle = function (c, r) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var BorderStyles = ['borderStyleLeft', 'borderStyleRight', 'borderStyleTop', 'borderStyleBottom']
    var data = [];
    var stringV;
    var strRes = '';
    for (var idx = 0; idx < BorderStyles.length; idx++) {
        try {
            stringV = _sfCheckConfigType(this, r, c, BorderStyles[idx], false);;
        } catch (err) { }
        strRes += (strRes == undefined ? 'none' : stringV.replace("!important", "")) + (idx == BorderStyles.length - 1 ? '' : '|');

    }
    var res = strRes.split('|');
    data.push({ borderStyleLeft: res[0], borderStyleRight: res[1], borderStyleTop: res[2], borderStyleBottom: res[3] })

    return data;
}


P8.SpreadSheet.prototype.GetBorderColor = function (c, r) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var BorderStyles = ['borderColorLeft', 'borderColorRight', 'borderColorTop', 'borderColorBottom']
    var data = [];
    var stringV;
    var strRes = '';
    for (var idx = 0; idx < BorderStyles.length; idx++) {
        try {
            stringV = _sfCheckConfigType(this, r, c, BorderStyles[idx], false);;
        } catch (err) { }
        strRes += (strRes == undefined ? 'white' : stringV.replace("!important", "")) + (idx == BorderStyles.length - 1 ? '' : '|');

    }
    var res = strRes.split('|');
    data.push({ borderColorLeft: res[0], borderColorRight: res[1], borderColorTop: res[2], borderColorBottom: res[3] })

    return data;
}


P8.SpreadSheet.prototype.GetBorderWidth = function (c, r) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    var BorderStyles = ['borderWidthLeft', 'borderWidthRight', 'borderWidthTop', 'borderWidthBottom']
    var data = [];
    var stringV;
    var strRes = '';
    for (var idx = 0; idx < BorderStyles.length; idx++) {
        try {
            stringV = _sfCheckConfigType(this, r, c, BorderStyles[idx], false);;
        } catch (err) { }
        strRes += (strRes == undefined ? 'none' : (stringV + "").replace("!important", "")) + (idx == BorderStyles.length - 1 ? '' : '|');

    }
    var res = strRes.split('|');
    data.push({ borderWidthLeft: res[0], borderWidthRight: res[1], borderWidthTop: res[2], borderWidthBottom: res[3] })

    return data;
}


P8.SpreadSheet.prototype.GetColumnWidth = function (c) {

    return c >= this.ColumnConfig.length ? undefined : this.ColumnConfig[c].width;
}

P8.SpreadSheet.prototype.GetMaxRow = function () {
    return this.Data.length;
}
P8.SpreadSheet.prototype.GetMaxCol = function () {
    return this.ColumnConfig.length;
}



function p8Spread_DblClickT(canvasID, row, col) {
    var objecttype = P8DataList[canvasID][0].sheet.ActiveSheet.GetObjectType(col, row);
    if (objecttype == "remarks"
        || objecttype == "button"
        || objecttype == "checkbox"
    ) {

        return false;
    }
    try {
        P8DataList[canvasID][0].sheet.ActiveSheet.prevEvenRow = row;
        P8DataList[canvasID][0].sheet.ActiveSheet.prevEvenCol = col;

        var xclass = P8DataList[canvasID][0].sheet.ActiveSheet.ColumnConfig[col].Class.trim();
        var lugid = P8DataList[canvasID][0].sheet.ActiveSheet.ColumnConfig[col].Attribute.trim();
        try {
            lugid = lugid.split("@#aag#@")[1];
        } catch (err) { }
        if (xclass == "aagnwlookupgrid" || xclass.indexOf('aagnwlookupgrid') >= 1) {
            lookUpCustomize(lugid, 1);
        }
        else if (xclass.indexOf('aagAddTolist') >= 1) {
            lookUpCustomize(lugid, 2);
        }

    } catch (err) { }

    var isValid = true;
    try {
        isValid = p8Spread_DblClick_Menuitem(canvasID, row, col);
    } catch (err) {
        try {
            isValid = p8Spread_DblClick(canvasID, row, col);
        } catch (err) { }
    }

    return isValid;
}
function p8Spread_ChangeT(canvasID, row, col) {
    var isvalid = true;
    try {
        P8DataList[canvasID][0].sheet.ActiveSheet.prevEvenRow = row;
        P8DataList[canvasID][0].sheet.ActiveSheet.prevEvenCol = col;

        var value = P8DataList[canvasID][0].sheet.ActiveSheet.GetValue(col, row);
        var xclass = P8DataList[canvasID][0].sheet.ActiveSheet.ColumnConfig[col].Class.trim();
        var lugid = P8DataList[canvasID][0].sheet.ActiveSheet.ColumnConfig[col].Attribute.trim();
        try {
            lugid = lugid.split("@#aag#@")[1];
        } catch (err) { }
        if (xclass == "aagnwlookupgrid") {
            try {
                var isvalid = p8Spread_LookupValidation(canvasID, row, col, lugid, value); // if false dont call change
            } catch (err) { }
        }
        //////ooohhhh problem /// di ko muna gagawin sa library actmethod na lang hehe muna mas madali

    } catch (err) { }
    if (isvalid == undefined) isvalid = true;
    if (isvalid) {
        var isValid = true;
        try {
            isValid = p8Spread_Change_Menuitem(canvasID, row, col);
        } catch (err) {
            try {
                isValid = p8Spread_Change(canvasID, row, col);
            } catch (err) { }
        }

        return isValid;
    }
}
function p8Spread_IsResponsive() {
    if ($("body").width() <= 550)
        return true;
    return false;
}
function p8Spread_ClickT(canvasID, row, col, _this) {


    try {
        P8DataList[canvasID][0].sheet.ActiveSheet.prevEvenRow = row;
        P8DataList[canvasID][0].sheet.ActiveSheet.prevEvenCol = col;
    } catch (err) { }

    var objecttype = P8DataList[canvasID][0].sheet.ActiveSheet.GetObjectType(col, row);
 

    var isresponsive = false;
    if ($("body").width() <= 550) isresponsive = true;
    if (isresponsive) {
        if (P8DataList[canvasID][0].sheet.ActiveSheet.Theme == P8Themes.FANCY) {
            var xclass = (P8DataList[canvasID][0].sheet.ActiveSheet.ColumnConfig[col].Class || "").trim();
            if (xclass.indexOf('aagAddTolist') >= 1 || xclass.indexOf('aagnwlookupgrid') >= 1) {
                return;
            }

            $(".nkListViewRow.nkListViewRowSelect").removeClass("nkListViewRowSelect");
            $(_this).parents(".nkListViewRow").addClass("nkListViewRowSelect");

            var isenabled = P8DataList[canvasID][0].sheet.ActiveSheet.GetEnabled(col, row);
            var datatype = P8DataList[canvasID][0].sheet.ActiveSheet.GetDataType(col, row);

            var zcol = $("#p8SpreadListInput").attr("col");
            var zrow = $("#p8SpreadListInput").attr("row");

            if ((!(zcol == col && zrow == row)) && $("#p8SpreadListInput").hasClass("nwDatePicker")) {
                var text = P8DataList[canvasID][0].sheet.ActiveSheet.GetText(zcol, zrow);
                $(".nkListViewRow[row='" + zrow + "']").find(".nkListViewValue[col='" + zcol + "']").text(text);


            }
          

            if (isenabled) {
                //balik
                //if (objecttype == "checkbox") {
                //    P8DataList[canvasID][0].sheet.ActiveSheet.SetText(zcol, zrow);
                //}
                // else 
                if (objecttype == "celltext") {
                    if ($(_this).find(".nkListViewValue").find("#p8SpreadListInput").val() == undefined) {

                        var classType = "";

                        if (datatype == "date") {
                            classType = "nwDatePicker";
                        }
                        else if (datatype == "currency") {
                            classType = "listText isNumber numC";
                        }
                        else if (datatype == "number") {
                            classType = "listText isNumber";
                        }
                        else {
                            classType = "listText";
                        }


                        $(_this).find(".nkListViewValue").html("<input id='p8SpreadListInput' class='" + classType + "' canvasID='" + canvasID + "' col='" + col + "' row='" + row + "' />");
                        var value = P8DataList[canvasID][0].sheet.ActiveSheet.GetText(col, row);
                        $(_this).find(".nkListViewValue").addClass("withinput");

                        var xdataType = P8DataList[canvasID][0].sheet.ActiveSheet.GetDataType(col, row);
                        var xprecision = P8DataList[canvasID][0].sheet.ActiveSheet.GetPrecision(col, row);

                        if (xdataType == "number"
                            || xdataType == "currency"
                            || xdataType == "percentvalue"
                            || xdataType == "percent") {

                            if (xdataType == "percentvalue") value = value * 100;

                            value = _sfFormartNumber(value, xprecision);
                        }


                        //nkListViewRowSelect
                        $("#p8SpreadListInput").focus();
                        $("#p8SpreadListInput").val(value);
                        $("#p8SpreadListInput").select();
                    }
                }
            }
        }
    }

    var isValid = true;
    try {
        isValid = p8Spread_Click_Menuitem(canvasID, row, col);
    } catch (err) {
        try {
            isValid = p8Spread_Click(canvasID, row, col);
        } catch (err) { }
    }
    isValid = isValid == undefined ? true : isValid; 
    if (objecttype == "remarks" && isValid) {
        p8Spread_RemarksShow(canvasID, col, row);
    }

    return isValid;
}


$(document).on("focusout", "#p8SpreadListInput.listText", function () {
    var value = $(this).val();
    var canvasID = $(this).attr("canvasID");
    var col = $(this).attr("col");
    var row = $(this).attr("row");

    P8DataList[canvasID][0].sheet.ActiveSheet.SetText(col, row, value,undefined,true);
    $(this).parent().text(value);
    $(this).parent().removeClass("withinput");

    console.log("focusout");
    return true;
});

$(document).on("change", "#p8SpreadListInput", function () {
    var value = $(this).val();
    var canvasID = $(this).attr("canvasID");
    var col = $(this).attr("col");
    var row = $(this).attr("row");

    P8DataList[canvasID][0].sheet.ActiveSheet.SetText(col, row, value,undefined,true);
    $(this).parent().text(value);
    $(this).parent().removeClass("withinput");

    console.log("change");
    return false;
});


$(document).on("click", ".nkListViewValueCheck", function () {
    var value = $(this).prop("checked") ? "1" : "0";
    var canvasID = $(this).closest(".P8Spread").attr("id");
    var col = $(this).closest(".nkListViewCol").attr("col");
    var row = $(this).closest(".nkListViewRow").attr("row");

    P8DataList[canvasID][0].sheet.ActiveSheet.SetText(col, row, value,undefined);
    console.log("click checkbox");
    return false;
});

function p8Spread_RemarksShow(canvasID, col, row) {
    var text2 = P8DataList[canvasID][0].sheet.ActiveSheet.GetText2(col, row);
    var value = P8DataList[canvasID][0].sheet.ActiveSheet.GetValue(col, row);


    $("#spreadRemarksCon").attr("canvasid", canvasID);
    $("#spreadRemarksCon").attr("col", col);
    $("#spreadRemarksCon").attr("row", row);

    $("#txtSpreadRemarks").val(value);
    setTimeout(function () {
        nwPopupForm_ShowModal("spreadRemarksCon");
        $("#spreadRemarksCon .modal-hdr-title").text(text2);
        $("#nwgRemarksCon .BoxTitle").text(text2);
        $("#txtSpreadRemarks").css("max-height", "initial");
        $("#txtSpreadRemarks").css("height", "85%");
        $("#txtSpreadRemarks").css("width", "100%");
        $("#txtSpreadRemarks").focus();
    }, 100);
}


function p8Spread_FocusT(canvasID, row, col) {
    try {
        P8DataList[canvasID][0].sheet.ActiveSheet.prevEvenRow = row;
        P8DataList[canvasID][0].sheet.ActiveSheet.prevEvenCol = col;
    } catch (err) { }

    var isValid = true;
    try {
        isValid = p8Spread_Focus_Menuitem(canvasID, row, col);
    } catch (err) {
        try {
            isValid = p8Spread_Focus(canvasID, row, col);
        } catch (err) { }
    }

    return isValid;
}


$(function () {
    $("body").append("<div id='spreadRemarksCon'><button id='btnSpreadRemarks'>Save and Exit</button> <span id='chkSpreadRemarksCon'></span>Auto Close upon Enter<br><textarea id='txtSpreadRemarks' maxlength='500'></textarea><div id='cmsSpreadRemarks'></div></div>");
    nwPopupForm_Create("spreadRemarksCon", true);
    setTimeout(function () {
        $("#chkSpreadRemarksCon").html("<input id='chkSpreadRemarks' type='checkbox' />");
    }, 100);
    //<input id='chkSpreadRemarks' type='checkbox' />
});
function p8Spread_SetRemarks() {
    var canvasID = $("#spreadRemarksCon").attr("canvasid");
    var col = $("#spreadRemarksCon").attr("col");
    var row = $("#spreadRemarksCon").attr("row");
    var value = $("#txtSpreadRemarks").val();
    P8DataList[canvasID][0].sheet.ActiveSheet.SetValue(col, row, value);

    nwPopupForm_HideModal("spreadRemarksCon");
    setTimeout(function () {
        $("#" + canvasID + "_vw").click();
        $("#" + canvasID + "_vw").focus();
    }, 100);
}
$(document).on("click", "#btnSpreadRemarks", function () {

    p8Spread_SetRemarks();
    return false;
});


$(document).on("keypress", "#txtSpreadRemarks", function (e) {
    if (e.shiftKey && e.which == 13) return;

    if (e.which == 13 && $('#chkSpreadRemarks').prop("checked") == true) p8Spread_SetRemarks();

});

var P8Spread_Currency = {

    fil_ph: { code: "fil_PH", symbols: "₱", align: "L", description: "Filipino", remarks: "Philippines Peso - Currency", format: '_-[$₱-fil-PH]* #,##0.00_-;-[$₱-fil-PH]* #,##0.00_-;', precision: 2 }
    , en_ph: { code: "en_PH", symbols: "₱", align: "L", description: "English (Philippines)", remarks: "Philippines Peso - Currency", format: '_-[$₱-fil-PH]* #,##0.00_-;-[$₱-fil-PH]* #,##0.00_-', precision: 2 } //, format: '_-[$₱-en-PH]* #,##0.00_-;-[$₱-en-PH]* #,##0.00_-;_-[$₱-en-PH]* " - "??_-;_-@_-' }
    //, en_us: { code: "en_US", symbols: "$", align: "L", description: "English (United States)", remarks: "United States - Currency", format: '_-[$$-en-SG]* #,##0.00_-;-[$$-en-SG]* #,##0.00_-;', precision: 2 }
    //, chf_fr_ch: { code: "CHF_fr_CH", symbols: "CHF", align: "R", description: "CHF French (Switzerland)", remarks: "Switzerland - Currency", format: '_-* #,##0.00 [$CHF-fr-CH]_-;-* #,##0.00 [$CHF-fr-CH]_-;', precision: 2 }
    //, ja_jp: { code: "ja_JP", symbols: "¥", align: "L", description: "Japanese", remarks: "Japan - Currency", format: '_-[$¥-ja-JP]* #,##0.00_-;-[$¥-ja-JP]* #,##0.00_-;', precision: 2 }
    //, x_xbt2: { code: "x_xbt2", symbols: "₿", align: "L", description: "Bitcoin", remarks: "Bitcoin - Crypto Currency", format: '_-[$₿-x-xbt2] * #,##0.000000_-;-[$₿-x-xbt2] * #,##0.000000_-;', precision: 6 }
    , af_za: { code: "af_ZA", symbols: "R", align: "L", description: "Afrikaans", remarks: "South Africa - Currency", format: '_-[$R-af-ZA]* #,##0.00_-;-[$R-af-ZA]* #,##0.00_-;', precision: 2 }
    , sq_al: { code: "sq_AL", symbols: "Lekë", align: "R", description: "Albanian", remarks: "Albania - Currency", format: '_-* #,##0.00 [$Lekë-sq-AL]_-;-* #,##0.00 [$Lekë-sq-AL]_-;', precision: 2 }
    , gsw_fr: { code: "gsw_FR", symbols: "€", align: "R", description: "Alsatian (France)", remarks: "France - Currency", format: '_-* #,##0.00 [$€-gsw-FR]_-;-* #,##0.00 [$€-gsw-FR]_-;', precision: 2 }
    , am_et: { code: "am_ET", symbols: "ብር", align: "L", description: "Amharic", remarks: "Ethiopia - Currency", format: '_-[$ብር-am-ET]* #,##0.00_-;-[$ብር-am-ET]* #,##0.00_-;', precision: 2 }
    , ar_dz: { code: "ar_DZ", symbols: "د.ج.‏", align: "R", description: "Arabic (Algeria)", remarks: "Algeria - Currency", format: '_-* #,##0.00 [$د.ج.‏-ar-DZ]_-;-* #,##0.00 [$د.ج.‏-ar-DZ]_-;', precision: 2 }
    , ar_bh: { code: "ar_BH", symbols: "د.ب.‏", align: "R", description: "Arabic (Bahrain)", remarks: "Bahrain - Currency", format: '_-* #,##0.00 [$د.ب.‏-ar-BH]_-;-* #,##0.00 [$د.ب.‏-ar-BH]_-;', precision: 2 }
    , ar_eg: { code: "ar_EG", symbols: "ج.م.‏", align: "R", description: "Arabic (Egypt)", remarks: "Egypt - Currency", format: '_-* #,##0.00 [$ج.م.‏-ar-EG]_-;-* #,##0.00 [$ج.م.‏-ar-EG]_-;', precision: 2 }
    , fa_ir: { code: "fa_IR", symbols: "ريال‏", align: "R", description: "Arabic (Iran)", remarks: "Iran - Currency", format: '_ * #,##0.00_-[$ريال-fa-IR]_ ;_ * #,##0.00-[$ريال-fa-IR]_ ;', precision: 2 }
    , ar_iq: { code: "ar_IQ", symbols: "د.ع.‏", align: "R", description: "Arabic (Iraq)", remarks: "Iraq - Currency", format: '_-* #,##0.00 [$د.ع.‏-ar-IQ]_-;-* #,##0.00 [$د.ع.‏-ar-IQ]_-;', precision: 2 }
    , ar_jo: { code: "ar_JO", symbols: "د.ا.‏‏", align: "R", description: "Arabic (Jordan)", remarks: "Jordan - Currency", format: '_-* #,##0.00 [$د.ا.‏-ar-JO]_-;-* #,##0.00 [$د.ا.‏-ar-JO]_-;', precision: 2 }
    , ar_kw: { code: "ar_KW", symbols: "د.ك.", align: "R", description: "Arabic (Kuwait)", remarks: "Kuwait - Currency", format: '_-* #,##0.00 [$د.ك.‏-ar-KW]_-;-* #,##0.00 [$د.ك.‏-ar-KW]_-;', precision: 2 }
    , ar_lb: { code: "ar_LB", symbols: "ل.ل.‏", align: "R", description: "Arabic (Lebanon)", remarks: "Lebanon - Currency", format: '_-* #,##0.00 [$ل.ل.‏-ar-LB]_-;-* #,##0.00 [$ل.ل.‏-ar-LB]_-;', precision: 2 }
    , ar_ly: { code: "ar_LY", symbols: "د.ل.", align: "R", description: "Arabic (Libya)", remarks: "Libya - Currency", format: '_-* #,##0.00 [$د.ل.‏-ar-LY]_-;-* #,##0.00 [$د.ل.‏-ar-LY]_-;', precision: 2 }
    , ar_ma: { code: "ar_MA", symbols: "د.م.", align: "R", description: "Arabic (Morocco)", remarks: "Morocco - Currency", format: '_-* #,##0.00 [$د.م.‏-ar-MA]_-;-* #,##0.00 [$د.م.‏-ar-MA]_-;', precision: 2 }
    , ar_om: { code: "ar_OM", symbols: "ر.ع.‏", align: "R", description: "Arabic (Oman)", remarks: "Oman - Currency", format: '_-* #,##0.00 [$ر.ع.‏-ar-OM]_-;-* #,##0.00 [$ر.ع.‏-ar-OM]_-;', precision: 2 }
    , ar_qa: { code: "ar_QA", symbols: "ر.ق.‏", align: "R", description: "Arabic (Qatar)", remarks: "Qatar - Currency", format: '_-* #,##0.00 [$ر.ق.‏-ar-QA]_-;-* #,##0.00 [$ر.ق.‏-ar-QA]_-;', precision: 2 }
    , ar_sa: { code: "ar_SA", symbols: "ر.س.‏", align: "R", description: "Arabic (Saudi Arabia)", remarks: "Saudi Arabia - Currency", format: '_-* #,##0.00 [$ر.س.‏-ar-SA]_-;-* #,##0.00 [$ر.س.‏-ar-SA]_-;', precision: 2 }
    , ar_sy: { code: "ar_SY", symbols: "ل.س.‏‏", align: "R", description: "Arabic (Syria)", remarks: "Syria - Currency", format: '_-* #,##0.00 [$ل.س.‏-ar-SY]_-;-* #,##0.00 [$ل.س.‏-ar-SY]_-;', precision: 2 }
    , ar_tn: { code: "ar_TN", symbols: "د.ت.‏", align: "R", description: "Arabic (Tunisia)", remarks: "Tunisia - Currency", format: '_-* #,##0.00 [$د.ت.‏-ar-TN]_-;-* #,##0.00 [$د.ت.‏-ar-TN]_-;', precision: 2 }
    , ar_ae: { code: "ar_AE", symbols: "د.إ.‏‏", align: "R", description: "Arabic (U.A.E.)", remarks: "U.A.E. - Currency", format: '_-* #,##0.00 [$د.إ.‏-ar-AE]_-;-* #,##0.00 [$د.إ.‏-ar-AE]_-;', precision: 2 }
    , ar_ye: { code: "ar_YE", symbols: "ر.ي.‏", align: "R", description: "Arabic (Yemen)", remarks: "Yemen - Currency", format: '_-* #,##0.00 [$ر.ي.‏-ar-YE]_-;-* #,##0.00 [$ر.ي.‏-ar-YE]_-;', precision: 2 }
    , hy_am: { code: "hy_AM", symbols: "֏", align: "R", description: "Armenian", remarks: "Armenia - Currency", format: '_-* #,##0.00 [$֏-hy-AM]_-;-* #,##0.00 [$֏-hy-AM]_-;', precision: 2 }
    , as_in: { code: "as_IN", symbols: "₹", align: "L", description: "Assamese", remarks: "India - Currency", format: '_ [$₹-as-IN] * #,##0.00_ ;_ [$₹-as-IN] * -#,##0.00_ ;', precision: 2 }
    , az_latn_az: { code: "az_Latn_AZ", symbols: "₼", align: "R", description: "Azerbaijani (Latin)", remarks: "Azerbaijan - Currency", format: '_-* #,##0.00 [$₼-az-Latn-AZ]_-;-* #,##0.00 [$₼-az-Latn-AZ]_-;', precision: 2 }
    , az_cyrl_az: { code: "az_Cyrl_AZ", symbols: "₼", align: "R", description: "Azerbaijani (Cyrillic)", remarks: "Azerbaijan - Currency", format: '_-* #,##0.00 [$₼-az-Cyrl-AZ]_-;-* #,##0.00 [$₼-az-Cyrl-AZ]_-;', precision: 2 }
    , bn_bd: { code: "bn_BD", symbols: "৳", align: "R", description: "Bangla (Bangladesh)", remarks: "Bangladesh - Currency", format: '_-* #,##0.00[$৳-bn-BD]_-;-* #,##0.00[$৳-bn-BD]_-;', precision: 2 }
    , ba_ru: { code: "ba_RU", symbols: "₽", align: "R", description: "Bashkir", remarks: "Russia - Currency", format: '_-* #,##0.00 [$₽-ba-RU]_-;-* #,##0.00 [$₽-ba-RU]_-;', precision: 2 }
    , eu_es: { code: "eu_ES", symbols: "€", align: "R", description: "Basque", remarks: "Spain - Currency", format: '_-* #,##0.00 [$€-eu-ES]_-;-* #,##0.00 [$€-eu-ES]_-;', precision: 2 }
    , be_by: { code: "be_BY", symbols: "Br", align: "R", description: "Belarusian", remarks: "Belarus - Currency", format: '_-* #,##0.00 [$Br-be-BY]_-;-* #,##0.00 [$Br-be-BY]_-;', precision: 2 }
    , bn_in: { code: "bn_IN", symbols: "₹", align: "L", description: "Bengali (India)", remarks: "India - Currency", format: '_ [$₹-bn-IN] * #,##0.00_ ;_ [$₹-bn-IN] * -#,##0.00_ ;', precision: 2 }
    , x_xbt2: { code: "x_xbt2", symbols: "₿", align: "L", description: "Bitcoin (₿ 123)", remarks: "Bitcoin - Crypto Currency", format: '_([$₿-x-xbt2] * #,##0.000000_);_([$₿-x-xbt2] * (#,##0.000000);', precision: 6 }
    , x_xbt1: { code: "x_xbt1", symbols: "₿", align: "R", description: "Bitcoin (123 ₿)", remarks: "Bitcoin - Crypto Currency", format: '_ * #,##0.000000_) [$₿-x-xbt1]_ ;_ * (#,##0.000000) [$₿-x-xbt1]_ ;', precision: 6 }
    , bs_cyrl_ba: { code: "bs_Cyrl_BA", symbols: "КМ", align: "R", description: "Bosnian (Cyrillic)", remarks: "Bosnia - Currency", format: '_-* #,##0.00 [$КМ-bs-Cyrl-BA]_-;-* #,##0.00 [$КМ-bs-Cyrl-BA]_-;', precision: 6 }
    , bs_latn_ba: { code: "bs_Latn_BA", symbols: "KM", align: "R", description: "Bosnian (Latin)", remarks: "Bosnia - Currency", format: '_-* #,##0.00 [$KM-bs-Latn-BA]_-;-* #,##0.00 [$KM-bs-Latn-BA]_-;', precision: 6 }
    , br_fr: { code: "br_FR", symbols: "€", align: "R", description: "Breton", remarks: "France - Currency", format: '_-* #,##0.00 [$€-br-FR]_-;-* #,##0.00 [$€-br-FR]_-;', precision: 2 }
    , bg_bg: { code: "bg_BG", symbols: "лв.", align: "R", description: "Bulgarian", remarks: "Bulgaria - Currency", format: '_-* #,##0.00 [$лв.-bg-BG]_-;-* #,##0.00 [$лв.-bg-BG]_-;', precision: 2 }
    , my_mm: { code: "my_MM", symbols: "K", align: "R", description: "Burmese", remarks: "Myanmar - Currency", format: '_-* #,##0.00 [$K-my-MM]_-;-* #,##0.00 [$K-my-MM]_-;', precision: 2 }
    , ca_es: { code: "ca_ES", symbols: "€", align: "R", description: "Catalan", remarks: "Spain - Currency", format: '_-* #,##0.00 [$€-ca-ES]_-;-* #,##0.00 [$€-ca-ES]_-;', precision: 2 }
    , ku_arab_iq: { code: "ku_Arab_IQ", symbols: "د.ع.‏", align: "L", description: "Cenral Kurdish (Iraq)", remarks: "Iraq - Currency", format: '_ [$د.ع.‏-ku-Arab-IQ]* #,##0.00_ ;_ [$د.ع.‏-ku-Arab-IQ]* -#,##0.00_ ;', precision: 2 }
    , tzm_arab_ma: { code: "tzm_Arab_MA", symbols: "د.م.", align: "L", description: "Central Atlas Tamazight (Arabic, Morocco)", remarks: "Morocco - Currency", format: '_-[$د.م.‏-tzm-Arab-MA] * #,##0.00_-;-[$د.م.‏-tzm-Arab-MA] * #,##0.00_-;', precision: 2 }
    , tzm_latn_dz: { code: "tzm_Latn_DZ", symbols: "DA", align: "R", description: "Central Atlas Tamazight (Latin, Algeria)", remarks: "Algeria - Currency", format: '_-* #,##0.00 [$DA-tzm-Latn-DZ]_-;-* #,##0.00 [$DA-tzm-Latn-DZ]_-;', precision: 2 }
    , tzm_tfng_ma: { code: "tzm_Tfng_MA", symbols: "ⴷⵔ", align: "R", description: "Central Atlas Tamazight (Tifinagh, Morocco)", remarks: "Morocco - Currency", format: '_-* #,##0.00 [$ⴷⵔ-tzm-Tfng-MA]_-;-* #,##0.00 [$ⴷⵔ-tzm-Tfng-MA]_-;', precision: 2 }
    , chr_cher_us: { code: "chr_Cher_US", symbols: "$", align: "L", description: "Cherokee (Cherokee, United States)", remarks: "United States - Currency", format: '_-[$$-chr-Cher-US]* #,##0.00_-;-[$$-chr-Cher-US]* #,##0.00_-;', precision: 2 }
    , zh_cn: { code: "zh_CN", symbols: "¥", align: "L", description: "Chinese (Simplified, Mainland China)", remarks: "China - Currency", format: '_ [$¥-zh-CN]* #,##0.00_ ;_ [$¥-zh-CN]* -#,##0.00_ ;', precision: 2 }
    , zh_sg: { code: "zh_SG", symbols: "$", align: "L", description: "Chinese (Simplified, Singapore)", remarks: "Singapore - Currency", format: '_-[$$-zh-SG]* #,##0.00_-;-[$$-zh-SG]* #,##0.00_-;', precision: 2 }
    , zh_hk: { code: "zh_HK", symbols: "HK$", align: "L", description: "Chinese (Traditional, Hong Kong SAR))", remarks: "Hong Kong - Currency", format: '_([$HK$-zh-HK]* #,##0.00_);_([$HK$-zh-HK]* (#,##0.00);', precision: 2 }
    , zh_tw: { code: "zh_TW", symbols: "NT$", align: "L", description: "Chinese (Traditional, Taiwan)", remarks: "Taiwan - Currency", format: '_-[$NT$-zh-TW]* #,##0.00_-;-[$NT$-zh-TW]* #,##0.00_-;', precision: 2 }
    , co_fr: { code: "co_FR", symbols: "€", align: "R", description: "Corsican", remarks: "France - Currency", format: '_-* #,##0.00 [$€-co-FR]_-;-* #,##0.00 [$€-co-FR]_-;', precision: 2 }
    , hr_ba: { code: "hr_BA", symbols: "KM", align: "R", description: "Croatian (Bosnia and Herzegovina)", remarks: "Bosnia - Currency", format: '_-* #,##0.00 [$KM-hr-BA]_-;-* #,##0.00 [$KM-hr-BA]_-;', precision: 2 }
    , hr_hr: { code: "hr_HR", symbols: "€", align: "R", description: "Croatian (Croatia)", remarks: "Croatia - Currency", format: '_-* #,##0.00 [$€-hr-HR]_-;-* #,##0.00 [$€-hr-HR]_-;', precision: 2 }
    , cs_cz: { code: "cs_CZ", symbols: "Kč", align: "R", description: "Czech", remarks: "Czechia - Currency", format: '_-* #,##0.00 [$Kč-cs-CZ]_-;-* #,##0.00 [$Kč-cs-CZ]_-;', precision: 2 }
    , da_dk: { code: "da_DK", symbols: "kr.", align: "R", description: "Danish", remarks: "Denmark - Currency", format: '_-* #,##0.00 [$kr.-da-DK]_-;-* #,##0.00 [$kr.-da-DK]_-;', precision: 2 }
    , prs_af: { code: "prs_AF", symbols: "؋", align: "L", description: "Dari", remarks: "Afghanistan - Currency", format: '_-[$؋-prs-AF] * #,##0.00_-;-[$؋-prs-AF] * #,##0.00_-;', precision: 2 }
    , dv_mv: { code: "dv_MV", symbols: "ރ.", align: "R", description: "Divehi", remarks: "Maldives - Currency", format: '_-* #,##0.00 [$ރ.-dv-MV]_-;_-* #,##0.00 [$ރ.-dv-MV]-;', precision: 2 }
    , nl_be: { code: "nl_BE", symbols: "€", align: "L", description: "Dutch (Belgium)", remarks: "Belgium - Currency", format: '_ [$€-nl-BE] * #,##0.00_ ;_ [$€-nl-BE] * -#,##0.00_ ;', precision: 2 }
    , nl_nl: { code: "nl_NL", symbols: "€", align: "L", description: "Dutch (Netherlands)", remarks: "Netherlands - Currency", format: '_ [$€-nl-NL] * #,##0.00_ ;_ [$€-nl-NL] * -#,##0.00_ ;', precision: 2 }
    , bin_ng: { code: "bin_NG", symbols: "₦", align: "L", description: "Edo", remarks: "Nigeria  - Currency", format: '_-[$₦-bin-NG] * #,##0.00_-;-[$₦-bin-NG] * #,##0.00_-;', precision: 2 }
    , en_au: { code: "en_AU", symbols: "$", align: "L", description: "English (Australia)", remarks: "Australia - Currency", format: '_-[$$-en-AU]* #,##0.00_-;-[$$-en-AU]* #,##0.00_-;', precision: 2 }
    , en_bz: { code: "en_BZ", symbols: "$", align: "L", description: "English (Belize)", remarks: "Belize - Currency", format: '_-[$$-en-BZ]* #,##0.00_-;-[$$-en-BZ]* #,##0.00_-;', precision: 2 }
    , en_ca: { code: "en_CA", symbols: "$", align: "L", description: "English (Canada)", remarks: "Canada - Currency", format: '_-[$$-en-CA]* #,##0.00_-;-[$$-en-CA]* #,##0.00_-;', precision: 2 }
    , en_029: { code: "en_029", symbols: "EC$", align: "L", description: "English (Caribbean)", remarks: "Caribbean - Currency", format: '_-[$EC$-en-029]* #,##0.00_-;-[$EC$-en-029]* #,##0.00_-;', precision: 2 }
    , en_hk: { code: "en_HK", symbols: "$", align: "L", description: "English (Hong Kong SAR)", remarks: "Hong Kong - Currency", format: '_-[$$-en-HK]* #,##0.00_-;-[$$-en-HK]* #,##0.00_-;', precision: 2 }
    , en_in: { code: "en_IN", symbols: "₹", align: "L", description: "English (India)", remarks: "India - Currency", format: '_ [$₹-en-IN] * #,##0.00_ ;_ [$₹-en-IN] * -#,##0.00_ ;', precision: 2 }
    , en_id: { code: "en_ID", symbols: "Rp", align: "L", description: "English (Indonesia)", remarks: "Indonesia - Currency", format: '_-[$Rp-en-ID]* #,##0.00_-;-[$Rp-en-ID]* #,##0.00_-;', precision: 2 }
    , en_ie: { code: "en_IE", symbols: "€", align: "L", description: "English (Ireland)", remarks: "Ireland - Currency", format: '_-[$€-en-IE]* #,##0.00_-;-[$€-en-IE]* #,##0.00_-;', precision: 2 }
    , en_jm: { code: "en_JM", symbols: "$", align: "L", description: "English (Jamaica)", remarks: "Jamaica - Currency", format: '_-[$$-en-JM]* #,##0.00_-;-[$$-en-JM]* #,##0.00_-;', precision: 2 }
    , en_my: { code: "en_MY", symbols: "RM", align: "L", description: "English (Malaysia)", remarks: "Malaysia - Currency", format: '_-[$RM-en-MY]* #,##0.00_-;-[$RM-en-MY]* #,##0.00_-;', precision: 2 }
    , en_nz: { code: "en_NZ", symbols: "$", align: "L", description: "English (New Zealand)", remarks: "New Zealand - Currency", format: '_-[$$-en-NZ]* #,##0.00_-;-[$$-en-NZ]* #,##0.00_-;', precision: 2 }
    //, en_ph: { code: "en_PH", symbols: "₱", align: "L", description: "English (Philippines)", remarks: "Philippines Peso - Currency", format: '_-[$₱-fil-PH]* #,##0.00_-;-[$₱-fil-PH]* #,##0.00_-', precision: 2 } //, format: '_-[$₱-en-PH]* #,##0.00_-;-[$₱-en-PH]* #,##0.00_-;_-[$₱-en-PH]* " - "??_-;_-@_-' }
    , en_sg: { code: "en_SG", symbols: "$", align: "L", description: "English (Singapore)", remarks: "Singapore - Currency", format: '_-[$$-en-SG]* #,##0.00_-;-[$$-en-SG]* #,##0.00_-;', precision: 2 }
    , en_za: { code: "en_ZA", symbols: "R", align: "L", description: "English (South Africa)", remarks: "South Africa - Currency", format: '_-[$R-en-ZA]* #,##0.00_-;-[$R-en-ZA]* #,##0.00_-;', precision: 2 }
    , en_tt: { code: "en_TT", symbols: "$", align: "L", description: "English (Trinidad and Tobago)", remarks: "Trinidad and Tobago - Currency", format: '_-[$$-en-TT]* #,##0.00_-;-[$$-en-TT]* #,##0.00_-;', precision: 2 }
    , en_gb: { code: "en_GB", symbols: "£", align: "L", description: "English (United Kingdom)", remarks: "United Kingdom - Currency", format: '_-[$£-en-GB]* #,##0.00_-;-[$£-en-GB]* #,##0.00_-;', precision: 2 }
    , en_us: { code: "en_US", symbols: "$", align: "L", description: "English (United States)", remarks: "United States - Currency", format: '_([$$-en-US]* #,##0.00_);_([$$-en-US]* (#,##0.00);', precision: 2 }
    , en_zw: { code: "en_ZW", symbols: "US$", align: "L", description: "English (Zimbabwe)", remarks: "Zimbabwe - Currency", format: '_-[$US$-en-ZW]* #,##0.00_-;-[$US$-en-ZW]* #,##0.00_-;', precision: 2 }
    , et_ee: { code: "et_EE", symbols: "€", align: "R", description: "Estonian", remarks: "Estonia - Currency", format: '_-* #,##0.00 [$€-et-EE]_-;-* #,##0.00 [$€-et-EE]_-;', precision: 2 }
    , x_euro2: { code: "x_euro2", symbols: "€", align: "L", description: "Euro (€ 123)", remarks: "Europe - Currency", format: '_([$€-x-euro2] * #,##0.00_);_([$€-x-euro2] * (#,##0.00);', precision: 2 }
    , x_euro1: { code: "x_euro1", symbols: "€", align: "R", description: "Euro (123 €)", remarks: "Europe - Currency", format: '_ * #,##0.00_) [$€-x-euro1]_ ;_ * (#,##0.00) [$€-x-euro1]_ ;', precision: 2 }
    , fo_fo: { code: "fo_FO", symbols: "kr", align: "R", description: "Faroese", remarks: "Faroe Islands - Currency", format: '_-* #,##0.00 [$kr-fo-FO]_-;-* #,##0.00 [$kr-fo-FO]_-;', precision: 2 }
    //, fil_ph: { code: "fil_PH", symbols: "₱", align: "L", description: "Filipino", remarks: "Philippine Peso - Currency", format: '_-[$₱-fil-PH]* #,##0.00_-;-[$₱-fil-PH]* #,##0.00_-;', precision: 2 }
    , fi_fi: { code: "fi_FI", symbols: "€", align: "R", description: "Finnish", remarks: "Finland - Currency", format: '_-* #,##0.00 [$€-fi-FI]_-;-* #,##0.00 [$€-fi-FI]_-;', precision: 2 }
    , de_at: { code: "de_AT", symbols: "€", align: "L", description: "French (Austria)", remarks: "Austia - Currency", format: '_-[$€-de-AT] * #,##0.00_-;-[$€-de-AT] * #,##0.00_-;', precision: 2 }
    , fr_be: { code: "fr_BE", symbols: "€", align: "R", description: "French (Belgium)", remarks: "Belgium - Currency", format: '_-* #,##0.00 [$€-fr-BE]_-;-* #,##0.00 [$€-fr-BE]_-;', precision: 2 }
    , fr_cm: { code: "fr_CM", symbols: "FCFA", align: "R", description: "French (Cameroon)", remarks: "Cameroon - Currency", format: '_-* #,##0.00 [$FCFA-fr-CM]_-;-* #,##0.00 [$FCFA-fr-CM]_-;', precision: 2 }
    , fr_ca: { code: "fr_CA", symbols: "$", align: "R", description: "French (Canada)", remarks: "Canada - Currency", format: '_ * #,##0.00_) [$$-fr-CA]_ ;_ * (#,##0.00) [$$-fr-CA]_ ;', precision: 2 }
    , fr_029: { code: "fr_029", symbols: "EC$", align: "R", description: "French (Caribbean)", remarks: "Caribbean - Currency", format: '_-* #,##0.00 [$EC$-fr-029]_-;-* #,##0.00 [$EC$-fr-029]_-;', precision: 2 }
    , fr_cd: { code: "fr_CD", symbols: "FC", align: "R", description: "French (Congo (DRC))", remarks: "Congo (DRC) - Currency", format: '_-* #,##0.00 [$FC-fr-CD]_-;-* #,##0.00 [$FC-fr-CD]_-;', precision: 2 }
    , fr_ci: { code: "fr_CI", symbols: "CFA", align: "R", description: "French (Congo (DRC))", remarks: "Congo (DRC) - Currency", format: '_-* #,##0.00 [$CFA-fr-CI]_-;-* #,##0.00 [$CFA-fr-CI]_-;', precision: 2 }
    , fr_fr: { code: "fr_FR", symbols: "€", align: "R", description: "French (France)", remarks: "France - Currency", format: '_-* #,##0.00 [$€-fr-FR]_-;-* #,##0.00 [$€-fr-FR]_-;', precision: 2 }
    , fr_ht: { code: "fr_HT", symbols: "G", align: "R", description: "French (Haiti)", remarks: "Haiti - Currency", format: '_-* #,##0.00 [$G-fr-HT]_-;-* #,##0.00 [$G-fr-HT]_-;', precision: 2 }
    , de_lu: { code: "de_LU", symbols: "€", align: "R", description: "French (Luxembourg)", remarks: "Luxembourg - Currency", format: '_-* #,##0.00 [$€-de-LU]_-;-* #,##0.00 [$€-de-LU]_-;', precision: 2 }
    , fr_ml: { code: "fr_ML", symbols: "CFA", align: "R", description: "French (Mali)", remarks: "Mali - Currency", format: '_-* #,##0.00 [$CFA-fr-ML]_-;-* #,##0.00 [$CFA-fr-ML]_-;', precision: 2 }
    , fr_mc: { code: "fr_MC", symbols: "€", align: "R", description: "French (Monaco)", remarks: "Monaco - Currency", format: '_-* #,##0.00 [$€-fr-MC]_-;-* #,##0.00 [$€-fr-MC]_-;', precision: 2 }
    , fr_ma: { code: "fr_MA", symbols: "DH", align: "R", description: "French (Morocco)", remarks: "Morocco - Currency", format: '_-* #,##0.00 [$DH-fr-MA]_-;-* #,##0.00 [$DH-fr-MA]_-;', precision: 2 }
    , fr_re: { code: "fr_RE", symbols: "€", align: "R", description: "French (Reunion)", remarks: "Reunion - Currency", format: '_-* #,##0.00 [$€-fr-RE]_-;-* #,##0.00 [$€-fr-RE]_-;', precision: 2 }
    , fr_sn: { code: "fr_SN", symbols: "CFA", align: "R", description: "French (Senegal)", remarks: "Senegal - Currency", format: '_-* #,##0.00 [$CFA-fr-SN]_-;-* #,##0.00 [$CFA-fr-SN]_-;', precision: 2 }
    , fr_ch: { code: "fr_CH", symbols: "CHF", align: "R", description: "French (Switzerland)", remarks: "Switzerland - Currency", format: '_-* #,##0.00 [$CHF-fr-CH]_-;-* #,##0.00 [$CHF-fr-CH]_-;', precision: 2 }
    , ff_latn_sn: { code: "ff_Latn_SN", symbols: "CFA", align: "R", description: "Fulah (Latin, Senegal)", remarks: "Senegal - Currency", format: '_-* #,##0.00 [$CFA-ff-Latn-SN]_-;-* #,##0.00 [$CFA-ff-Latn-SN]_-;', precision: 2 }
    , ff_ng: { code: "ff_NG", symbols: "₦", align: "R", description: "Fulah (Nigeria)", remarks: "Nigeria  - Currency", format: '_-* #,##0.00 [$₦-ff-NG]_-;-* #,##0.00 [$₦-ff-NG]_-;', precision: 2 }
    , gl_es: { code: "gl_ES", symbols: "€", align: "R", description: "Galician", remarks: "Spain - Currency", format: '_-* #,##0.00 [$€-gl-ES]_-;-* #,##0.00 [$€-gl-ES]_-;', precision: 2 }
    , ka_ge: { code: "ka_GE", symbols: "₾", align: "R", description: "Georgian", remarks: "Georgia - Currency", format: '_-* #,##0.00 [$₾-ka-GE]_-;-* #,##0.00 [$₾-ka-GE]_-;', precision: 2 }
    , de_de: { code: "de_DE", symbols: "€", align: "R", description: "German (Germany)", remarks: "Germany - Currency", format: '_-* #,##0.00 [$€-de-DE]_-;-* #,##0.00 [$€-de-DE]_-;', precision: 2 }
    , de_li: { code: "de_LI", symbols: "CHF", align: "L", description: "German (Liechtenstein)", remarks: "Liechtenstein - Currency", format: '_-[$CHF-de-LI] * #,##0.00_-;-[$CHF-de-LI] * #,##0.00_-;', precision: 2 }
    , de_lu: { code: "de_LU", symbols: "€", align: "R", description: "German (Luxembourg)", remarks: "Luxembourg - Currency", format: '_-* #,##0.00 [$€-de-LU]_-;-* #,##0.00 [$€-de-LU]_-;', precision: 2 }
    , de_ch: { code: "de_CH", symbols: "CHF", align: "L", description: "German (Switzerland)", remarks: "Switzerland - Currency", format: '_ [$CHF-de-CH] * #,##0.00_ ;_ [$CHF-de-CH] * -#,##0.00_ ;', precision: 2 }
    , el_gr: { code: "el_GR", symbols: "€", align: "R", description: "Greek", remarks: "Greece - Currency", format: '_-* #,##0.00 [$€-el-GR]_-;-* #,##0.00 [$€-el-GR]_-;', precision: 2 }
    , gn_py: { code: "gn_PY", symbols: "₲", align: "R", description: "Guarani", remarks: "Paraguay - Currency", format: '_-* #,##0.00 [$₲-gn-PY]_-;-* #,##0.00 [$₲-gn-PY]_-;', precision: 2 }
    , gu_in: { code: "gu_IN", symbols: "₹", align: "L", description: "Gujarati", remarks: "India - Currency", format: '_ [$₹-gu-IN]* #,##0.00_ ;_ [$₹-gu-IN]* -#,##0.00_ ;', precision: 2 }
    , ha_latn_ng: { code: "ha_Latn_NG", symbols: "₦", align: "L", description: "Hausa", remarks: "Nigeria  - Currency", format: '_-[$₦-ha-Latn-NG] * #,##0.00_-;-[$₦-ha-Latn-NG] * #,##0.00_-;', precision: 2 }
    , haw_us: { code: "haw_US", symbols: "$", align: "L", description: "Hawaiian", remarks: "Hawaii - Currency", format: '_-[$$-haw-US]* #,##0.00_-;-[$$-haw-US]* #,##0.00_-;', precision: 2 }
    , he_il: { code: "he_IL", symbols: "₪", align: "L", description: "Hebrew", remarks: "Israel - Currency", format: '_ [$₪-he-IL] * #,##0.00_ ;_ [$₪-he-IL] * -#,##0.00_ ;', precision: 2 }
    , hi_in: { code: "hi_IN", symbols: "₹", align: "L", description: "Hindi", remarks: "India - Currency", format: '_ [$₹-hi-IN]* #,##0.00_ ;_ [$₹-hi-IN]* -#,##0.00_ ;', precision: 2 }
    , hu_hu: { code: "hu_HU", symbols: "Ft", align: "R", description: "Hungarian", remarks: "Hungary - Currency", format: '_-* #,##0.00 [$Ft-hu-HU]_-;-* #,##0.00 [$Ft-hu-HU]_-;', precision: 2 }
    , ibb_ng: { code: "ibb_NG", symbols: "₦", align: "L", description: "Ibibio (Nigeria)", remarks: "Nigeria  - Currency", format: '_-[$₦-ibb-NG] * #,##0.00_-;-[$₦-ibb-NG] * #,##0.00_-;', precision: 2 }
    , is_is: { code: "is_IS", symbols: "kr", align: "R", description: "Icelandic", remarks: "Iceland - Currency", format: '_-* #,##0.00 [$kr-is-IS]_-;-* #,##0.00 [$kr-is-IS]_-;', precision: 2 }
    , ig_ng: { code: "ig_NG", symbols: "₦", align: "L", description: "Igbo", remarks: "Nigeria  - Currency", format: '_-[$₦-ig-NG]* #,##0.00_-;-[$₦-ig-NG]* #,##0.00_-;', precision: 2 }
    , smn_fi: { code: "smn_FI", symbols: "€", align: "R", description: "Inari Sami (Finland)", remarks: "Finland - Currency", format: '_-* #,##0.00 [$€-smn-FI]_-;-* #,##0.00 [$€-smn-FI]_-;', precision: 2 }
    , iu_latn_ca: { code: "iu_Latn_CA", symbols: "$", align: "L", description: "Inuktitut (Latin)", remarks: "Canada - Currency", format: '_-[$$-iu-Latn-CA]* #,##0.00_-;-[$$-iu-Latn-CA]* #,##0.00_-;', precision: 2 }
    , iu_cans_ca: { code: "iu_Cans_CA", symbols: "$", align: "L", description: "Inuktitut (Syllabics)", remarks: "Canada - Currency", format: '_-[$$-iu-Cans-CA]* #,##0.00_-;-[$$-iu-Cans-CA]* #,##0.00_-;', precision: 2 }
    , ga_ie: { code: "ga_IE", symbols: "€", align: "L", description: "Irish", remarks: "Ireland - Currency", format: '_-[$€-ga-IE]* #,##0.00_-;-[$€-ga-IE]* #,##0.00_-;', precision: 2 }
    , xh_za: { code: "xh_ZA", symbols: "R", align: "L", description: "isiXhosa", remarks: "South Africa - Currency", format: '_-[$R-xh-ZA]* #,##0.00_-;-[$R-xh-ZA]* #,##0.00_-;', precision: 2 }
    , zu_za: { code: "zu_ZA", symbols: "R", align: "L", description: "isiZulu", remarks: "South Africa - Currency", format: '_-[$R-zu-ZA]* #,##0.00_-;-[$R-zu-ZA]* #,##0.00_-;', precision: 2 }
    , it_it: { code: "it_IT", symbols: "€", align: "R", description: "Italian (Italy)", remarks: "Italy - Currency", format: '_-* #,##0.00 [$€-it-IT]_-;-* #,##0.00 [$€-it-IT]_-;', precision: 2 }
    , it_ch: { code: "it_CH", symbols: "CHF", align: "R", description: "Italian (Switzerland)", remarks: "Switzerland - Currency", format: '_ [$CHF-it-CH] * #,##0.00_ ;_ [$CHF-it-CH] * -#,##0.00_ ;', precision: 2 }
    , ja_jp: { code: "ja_JP", symbols: "¥", align: "L", description: "Japanese", remarks: "Japan - Currency", format: '_-[$¥-ja-JP]* #,##0.00_-;-[$¥-ja-JP]* #,##0.00_-;', precision: 2 }
    , jv_java_id: { code: "jv_Java_ID", symbols: "Rp", align: "L", description: "Javanese (Javanese, Indonesia)", remarks: "Indonesia - Currency", format: '_-[$Rp-jv-Java-ID] * #,##0.00_-;-[$Rp-jv-Java-ID] * #,##0.00_-;', precision: 2 }
    , jv_latn_id: { code: "jv_Latn_ID", symbols: "Rp", align: "L", description: "Javanese (Latin, Indonesia)", remarks: "Indonesia - Currency", format: '_-[$Rp-jv-Latn-ID]* #,##0.00_-;-[$Rp-jv-Latn-ID]* #,##0.00_-;', precision: 2 }
    , kl_gl: { code: "kl_GL", symbols: "kr.", align: "L", description: "Kalaallisut", remarks: "Greenland - Currency", format: '_ [$kr.-kl-GL]* #,##0.00_ ;_ [$kr.-kl-GL]* -#,##0.00_ ;', precision: 2 }
    , kn_in: { code: "kn_IN", symbols: "₹", align: "L", description: "Kannada", remarks: "India - Currency", format: '_ [$₹-kn-IN]* #,##0.00_ ;_ [$₹-kn-IN]* -#,##0.00_ ;', precision: 2 }
    , kr_ng: { code: "kr_NG", symbols: "₦", align: "L", description: "Kanuri", remarks: "Nigeria  - Currency", format: '_-[$₦-kr-NG] * #,##0.00_-;-[$₦-kr-NG] * #,##0.00_-;', precision: 2 }
    , ks_deva: { code: "ks_Deva", symbols: "₹", align: "L", description: "Kashmiri", remarks: "India - Currency", format: '_ [$₹-ks-Deva] * #,##0.00_ ;_ [$₹-ks-Deva] * -#,##0.00_ ;', precision: 2 }
    , ks_arab: { code: "ks_Arab", symbols: "₹", align: "L", description: "Kashmiri (Arabic)", remarks: "Arabic - Currency", format: '_-[$₹-ks-Arab] * #,##0.00_-;-[$₹-ks-Arab] * #,##0.00_-;', precision: 2 }
    , kk_kz: { code: "kk_KZ", symbols: "₸", align: "R", description: "Kazakh", remarks: "Kazakhstan - Currency", format: '_-* #,##0.00 [$₸-kk-KZ]_-;-* #,##0.00 [$₸-kk-KZ]_-;', precision: 2 }
    , km_kh: { code: "km_KH", symbols: "៛", align: "R", description: "Khmer", remarks: "Cambodia - Currency", format: '_-* #,##0.00[$-km-KH]_-;-* #,##0.00[$៛-km-KH]_-;', precision: 2 }
    , quc_latn_gt: { code: "quc_Latn_GT", symbols: "Q", align: "L", description: "K'iche", remarks: "Guatemala - Currency", format: '_-[$Q-quc-Latn-GT]* #,##0.00_-;-[$Q-quc-Latn-GT]* #,##0.00_-;', precision: 2 }
    , rw_rw: { code: "rw_RW", symbols: "RF", align: "L", description: "Kinyarwanda", remarks: "Rwanda - Currency", format: '_-[$RF-rw-RW] * #,##0.00_-;-[$RF-rw-RW] * #,##0.00_-;', precision: 2 }
    , sw_ke: { code: "sw_KE", symbols: "Ksh", align: "L", description: "Kiswahili", remarks: "Kenya - Currency", format: '_-[$Ksh-sw-KE] * #,##0.00_-;-[$Ksh-sw-KE] * #,##0.00_-;', precision: 2 }
    , kok_in: { code: "kok_IN", symbols: "₹", align: "L", description: "Konkani", remarks: "India - Currency", format: '_ [$₹-kok-IN] * #,##0.00_ ;_ [$₹-kok-IN] * -#,##0.00_ ;', precision: 2 }
    , ko_kr: { code: "ko_KR", symbols: "₩", align: "L", description: "Korean", remarks: "Korea - Currency", format: '_-[$₩-ko-KR]* #,##0.00_-;-[$₩-ko-KR]* #,##0.00_-;', precision: 2 }
    , ky_kg: { code: "ky_KG", symbols: "сом", align: "R", description: "Kyrgyz", remarks: "Kyrgyzstan - Currency", format: '_-* #,##0.00 [$сом-ky-KG]_-;-* #,##0.00 [$сом-ky-KG]_-;', precision: 2 }
    , lo_la: { code: "lo_LA", symbols: "₭", align: "L", description: "Lao", remarks: "Laos - Currency", format: '_ [$₭-lo-LA]* #,##0.00_ ;_ [$₭-lo-LA]* -#,##0.00_ ;', precision: 2 }
    , la_latn: { code: "la_Latn", symbols: "¤", align: "L", description: "Latin", remarks: "Latin - Currency", format: '_-[$¤-la-Latn] * #,##0.00_-;-[$¤-la-Latn] * #,##0.00_-;', precision: 2 }
    , lv_lv: { code: "lv_LV", symbols: "€", align: "R", description: "Latvian", remarks: "Latvia - Currency", format: '_-* #,##0.00 [$€-lv-LV]_-;-* #,##0.00 [$€-lv-LV]_-;', precision: 2 }
    , lt_lt: { code: "lt_LT", symbols: "€", align: "R", description: "Lithuanian", remarks: "Lithuania - Currency", format: '_-* #,##0.00 [$€-lt-LT]_-;-* #,##0.00 [$€-lt-LT]_-;', precision: 2 }
    , dsb_de: { code: "dsb_DE", symbols: "€", align: "R", description: "Lower Sorbian", remarks: "Germany - Currency", format: '_-* #,##0.00 [$€-dsb-DE]_-;-* #,##0.00 [$€-dsb-DE]_-;', precision: 2 }
    , smj_no: { code: "smj_NO", symbols: "kr", align: "L", description: "Lule Sami (Norway)", remarks: "Norway - Currency", format: '_ [$kr-smj-NO] * #,##0.00_ ;_ [$kr-smj-NO] * -#,##0.00_ ;', precision: 2 }
    , smj_se: { code: "smj_SE", symbols: "kr", align: "R", description: "Lule Sami (Sweden)", remarks: "Sweden - Currency", format: '_-* #,##0.00 [$kr-smj-SE]_-;-* #,##0.00 [$kr-smj-SE]_-;', precision: 2 }
    , lb_lu: { code: "lb_LU", symbols: "€", align: "R", description: "Luxembourgish", remarks: "Luxembourg - Currency", format: '_-* #,##0.00 [$€-lb-LU]_-;-* #,##0.00 [$€-lb-LU]_-;', precision: 2 }
    , mk_mk: { code: "mk_MK", symbols: "ден.", align: "R", description: "Macedonian", remarks: "North Macedonia - Currency", format: '_-* #,##0.00 [$ден.-mk-MK]_-;-* #,##0.00 [$ден.-mk-MK]_-;', precision: 2 }
    , zgh_tfng_ma: { code: "zgh_Tfng_MA", symbols: "MAD", align: "R", description: "MAD Standard Moroccan Tamazight (Tifinagh, Morocco)", remarks: "Morocco - Currency", format: '_-* #,##0.00[$MAD-zgh-Tfng-MA]_-;-* #,##0.00[$MAD-zgh-Tfng-MA]_-;', precision: 2 }
    , mg_mg: { code: "mg_MG", symbols: "Ar", align: "L", description: "Malagasy", remarks: "Madagascar - Currency", format: '_-[$Ar-mg-MG] * #,##0.00_-;-[$Ar-mg-MG] * #,##0.00_-;', precision: 2 }
    , ms_bn: { code: "ms_BN", symbols: "$", align: "L", description: "Malay (Brunei Darussalam)", remarks: "Malay - Currency", format: '_-[$$-ms-BN] * #,##0.00_-;-[$$-ms-BN] * #,##0.00_-;', precision: 2 }
    , ms_my: { code: "ms_MY", symbols: "RM", align: "L", description: "Malay (Malaysia)", remarks: "Malaysia - Currency", format: '_-[$RM-ms-MY]* #,##0.00_-;-[$RM-ms-MY]* #,##0.00_-;', precision: 2 }
    , ml_in: { code: "ml_IN", symbols: "₹", align: "L", description: "MalayMalayalam)", remarks: "India - Currency", format: '_-[$₹-ml-IN]* #,##0.00_-;-[$₹-ml-IN]* #,##0.00_-;', precision: 2 }
    , mt_mt: { code: "mt_MT", symbols: "€", align: "L", description: "Maltese", remarks: "Malta - Currency", format: '_-[$€-mt-MT]* #,##0.00_-;-[$€-mt-MT]* #,##0.00_-;', precision: 2 }
    , mni_in: { code: "mni_IN", symbols: "₹", align: "L", description: "Manipuri", remarks: "India - Currency", format: '_-[$₹-mni-IN] * #,##0.00_-;-[$₹-mni-IN] * #,##0.00_-;', precision: 2 }
    , mi_nz: { code: "mi_NZ", symbols: "$", align: "L", description: "Māori", remarks: "New Zealand - Currency", format: '_-[$$-mi-NZ] * #,##0.00_-;-[$$-mi-NZ] * #,##0.00_-;', precision: 2 }
    , arn_cl: { code: "arn_CL", symbols: "$", align: "L", description: "Mapuche", remarks: "Chile - Currency", format: '_-[$$-arn-CL] * #,##0.00_-;-[$$-arn-CL] * #,##0.00_-;', precision: 2 }
    , mr_in: { code: "mr_IN", symbols: "₹", align: "L", description: "Marathi", remarks: "India - Currency", format: '_ [$₹-mr-IN]* #,##0.00_ ;_ [$₹-mr-IN]* -#,##0.00_ ;', precision: 2 }
    , moh_ca: { code: "moh_CA", symbols: "$", align: "L", description: "Mohawk", remarks: "Canada - Currency", format: '_-[$$-moh-CA]* #,##0.00_-;-[$$-moh-CA]* #,##0.00_-;', precision: 2 }
    , mn_mn: { code: "mn_MN", symbols: "₮", align: "L", description: "Mongolian (Mongolia)", remarks: "Mongolia - Currency", format: '_-[$₮-mn-MN] * #,##0.00_-;-[$₮-mn-MN] * #,##0.00_-;', precision: 2 }
    , mn_mong_cn: { code: "mn_Mong_CN", symbols: "¥", align: "L", description: "Mongolian (Traditional Mongolian, China)", remarks: "China - Currency", format: '_ [$¥-mn-Mong-CN]* #,##0.00_ ;_ [$¥-mn-Mong-CN]* -#,##0.00_ ;', precision: 2 }
    , mn_mong_mn: { code: "mn_Mong_MN", symbols: "₮", align: "L", description: "Mongolian (Traditional Mongolian, Mongolia)", remarks: "Mongolia - Currency", format: '_ [$₮-mn-Mong-MN]* #,##0.00_ ;_ [$₮-mn-Mong-MN]* -#,##0.00_ ;', precision: 2 }
    , zh_mo: { code: "zh_MO", symbols: "MOP", align: "L", description: "MOP Chinese (Traditional, Macao SAR)", remarks: "Macao - Currency", format: '_-[$MOP-zh-MO]* #,##0.00_-;-[$MOP-zh-MO]* #,##0.00_-;', precision: 2 }
    , ne_np: { code: "ne_NP", symbols: "रु", align: "L", description: "Napali", remarks: "Nepal - Currency", format: '_-[$रु-ne-NP] * #,##0.00_-;-[$रु-ne-NP] * #,##0.00_-;', precision: 2 }
    , ne_in: { code: "ne_IN", symbols: "₹", align: "L", description: "Nepali (India)", remarks: "India - Currency", format: '_-[$₹-ne-IN] * #,##0.00_-;-[$₹-ne-IN] * #,##0.00_-;', precision: 2 }
    , nqo_gn: { code: "nqo_GN", symbols: "ߖߕ.", align: "L", description: "N'ko", remarks: "Guinea - Currency", format: '_ [$ߖߕ.‏-nqo-GN] * #,##0.00_ ;_ [$ߖߕ.‏-nqo-GN] * -#,##0.00_ ;', precision: 2 }
    , se_fi: { code: "se_FI", symbols: "€", align: "R", description: "Northern Sami (Finland)", remarks: "Finland - Currency", format: '_-* #,##0.00 [$€-se-FI]_-;-* #,##0.00 [$€-se-FI]_-;', precision: 2 }
    , se_no: { code: "se_NO", symbols: "kr", align: "R", description: "Northern Sami (Norway)", remarks: "Norway - Currency", format: '_-* #,##0.00 [$kr-se-NO]_-;-* #,##0.00 [$kr-se-NO]_-;', precision: 2 }
    , se_no: { code: "se_SE", symbols: "kr", align: "R", description: "Northern Sami (Sweden)", remarks: "Sweden - Currency", format: '_-* #,##0.00 [$kr-se-SE]_-;-* #,##0.00 [$kr-se-SE]_-;', precision: 2 }
    , nb_no: { code: "nb_NO", symbols: "kr", align: "L", description: "Norwegian (Bokmål)", remarks: "Norway - Currency", format: '_-[$kr-nb-NO] * #,##0.00_-;-[$kr-nb-NO] * #,##0.00_-;', precision: 2 }
    , nn_no: { code: "nn_NO", symbols: "kr", align: "R", description: "Norwegian (Nynorsk)", remarks: "Norway - Currency", format: '_-* #,##0.00 [$kr-nn-NO]_-;-* #,##0.00 [$kr-nn-NO]_-;', precision: 2 }
    , oc_fr: { code: "oc_FR", symbols: "€", align: "R", description: "Occitan", remarks: "France - Currency", format: '_-* #,##0.00[$€-oc-FR]_-;-* #,##0.00[$€-oc-FR]_-;', precision: 2 }
    , or_in: { code: "or_IN", symbols: "₹", align: "L", description: "Odia", remarks: "India - Currency", format: '_ [$₹-or-IN] * #,##0.00_ ;_ [$₹-or-IN] * -#,##0.00_ ;', precision: 2 }
    , om_et: { code: "om_ET", symbols: "Br", align: "L", description: "Oromo", remarks: "Ethiopia - Currency", format: '_-[$Br-om-ET]* #,##0.00_-;-[$Br-om-ET]* #,##0.00_-;', precision: 2 }
    , pap_029: { code: "pap_029", symbols: "$", align: "L", description: "Papiamento", remarks: "Netherland Antilles - Currency", format: '_-[$$-pap-029]* #,##0.00_-;-[$$-pap-029]* #,##0.00_-;', precision: 2 }
    , ps_af: { code: "ps_AF", symbols: "؋", align: "R", description: "Pashto", remarks: "Afghanistan - Currency", format: '_-* #,##0.00 [$؋-ps-AF]_-;-* #,##0.00 [$؋-ps-AF]_-;', precision: 2 }
    , pl_pl: { code: "pl_PL", symbols: "zł", align: "R", description: "Polish", remarks: "Poland - Currency", format: '_-* #,##0.00 [$zł-pl-PL]_-;-* #,##0.00 [$zł-pl-PL]_-;', precision: 2 }
    , pt_ao: { code: "pt_AO", symbols: "Kz", align: "R", description: "Portuguese (Angola)", remarks: "Angola - Currency", format: '_-* #,##0.00 [$Kz-pt-AO]_-;-* #,##0.00 [$Kz-pt-AO]_-;', precision: 2 }
    , pt_br: { code: "pt_BR", symbols: "R$", align: "L", description: "Portuguese (Brazil)", remarks: "Brazil - Currency", format: '_-[$R$-pt-BR] * #,##0.00_-;-[$R$-pt-BR] * #,##0.00_-;', precision: 2 }
    , pt_pt: { code: "pt_PT", symbols: "€", align: "R", description: "Portuguese (Portugal)", remarks: "Portugal - Currency", format: '_-* #,##0.00 [$€-pt-PT]_-;-* #,##0.00 [$€-pt-PT]_-;', precision: 2 }
    , pa_in: { code: "pa_IN", symbols: "₹", align: "L", description: "Punjabi (India))", remarks: "India - Currency", format: '_ [$₹-pa-IN] * #,##0.00_ ;_ [$₹-pa-IN] * -#,##0.00_ ;', precision: 2 }
    , pa_arab_pk: { code: "pa_Arab_PK", symbols: "Rs", align: "L", description: "Punjabi (Pakistan)", remarks: "Pakistan - Currency", format: '_-[$Rs-pa-Arab-PK] * #,##0.00_-;-[$Rs-pa-Arab-PK] * #,##0.00_-;', precision: 2 }
    , quz_bo: { code: "quz_BO", symbols: "Bs.", align: "L", description: "Quechua (Bolivia)", remarks: "Bolivia - Currency", format: '_([$Bs.-quz-BO] * #,##0.00_);_([$Bs.-quz-BO] * (#,##0.00);', precision: 2 }
    , quz_ec: { code: "quz_EC", symbols: "$", align: "L", description: "Quechua (Ecuador)", remarks: "Ecuador -Currency", format: '_ [$$-quz-EC] * #,##0.00_ ;_ [$$-quz-EC] * -#,##0.00_ ;', precision: 2 }
    , quz_pe: { code: "quz_PE", symbols: "S/", align: "L", description: "Quechua (Peru)", remarks: "Peru - Currency", format: '_ [$S/-quz-PE] * #,##0.00_ ;_ [$S/-quz-PE] * -#,##0.00_ ;', precision: 2 }
    , ro_ro: { code: "ro_RO", symbols: "lei", align: "R", description: "Romanian", remarks: "Romania  - Currency", format: '_-* #,##0.00 [$lei-ro-RO]_-;-* #,##0.00 [$lei-ro-RO]_-;', precision: 2 }
    , ro_md: { code: "ro_MD", symbols: "L", align: "R", description: "Romanian (Moldova)", remarks: "Moldova - Currency", format: '_-* #,##0.00 [$L-ro-MD]_-;-* #,##0.00 [$L-ro-MD]_-;', precision: 2 }
    , rm_ch: { code: "rm_CH", symbols: "CHF", align: "R", description: "Romansh", remarks: "Switzerland - Currency", format: '_-* #,##0.00 [$CHF-rm-CH]_-;-* #,##0.00 [$CHF-rm-CH]_-;', precision: 2 }
    , ru_ru: { code: "ru_RU", symbols: "₽", align: "R", description: "Russian", remarks: "Russia -  Currency", format: '_-* #,##0.00 [$₽-ru-RU]_-;-* #,##0.00 [$₽-ru-RU]_-;', precision: 2 }
    , ru_md: { code: "ru_MD", symbols: "L", align: "R", description: "Russian (Moldova)", remarks: "Moldova - Currency", format: '_-* #,##0.00 [$L-ru-MD]_-;-* #,##0.00 [$L-ru-MD]_-;', precision: 2 }
    , sah_ru: { code: "sah_RU", symbols: "₽", align: "R", description: "Sakha", remarks: "Sakha - Currency", format: '_-* #,##0.00 [$₽-sah-RU]_-;-* #,##0.00 [$₽-sah-RU]_-;', precision: 2 }
    , sa_in: { code: "sa_IN", symbols: "₹", align: "L", description: "Sanskrit", remarks: "India - Currency", format: '_-[$₹-sa-IN]* #,##0.00_-;-[$₹-sa-IN]* #,##0.00_-;', precision: 2 }
    , gd_gb: { code: "gd_GB", symbols: "£", align: "L", description: "Scottish Gaelic (United Kingdom)", remarks: "United Kingdom - Currency", format: '_-[$£-gd-GB]* #,##0.00_-;-[$£-gd-GB]* #,##0.00_-;', precision: 2 }
    , sr_cyrl_me: { code: "sr_Cyrl_ME", symbols: "€", align: "R", description: "Serbian (Cyrillic, Montenegro)", remarks: "Montenegro - Currency", format: '_-* #,##0.00 [$€-sr-Cyrl-ME]_-;-* #,##0.00 [$€-sr-Cyrl-ME]_-;', precision: 2 }
    , sr_cyrl_ba: { code: "sr_Cyrl_BA", symbols: "КМ", align: "R", description: "Serbian (Cyrillic, Serbia and Herzegovina)", remarks: "Bosnia - Currency", format: '_-* #,##0.00 [$КМ-sr-Cyrl-BA]_-;-* #,##0.00 [$КМ-sr-Cyrl-BA]_-;', precision: 2 }
    , sr_cyrl_cs: { code: "sr_Cyrl_CS", symbols: "дин.", align: "R", description: "Serbian (Cyrillic, Serbia and Montenegro (Former))", remarks: "Serbia - Currency", format: '_-* #,##0.00 [$дин.-sr-Cyrl-CS]_-;-* #,##0.00 [$дин.-sr-Cyrl-CS]_-;', precision: 2 }
    , sr_cyrl_rs: { code: "sr_Cyrl_RS", symbols: "дин.", align: "R", description: "Serbian (Cyrillic, Serbia)", remarks: "Serbia - Currency", format: '_-* #,##0.00 [$дин.-sr-Cyrl-RS]_-;-* #,##0.00 [$дин.-sr-Cyrl-RS]_-;', precision: 2 }
    , sr_latn_ba: { code: "sr_Latn_BA", symbols: "KM", align: "R", description: "Serbian (Latin, Bosnia and Herzegovia)", remarks: "Bosnia - Currency", format: '_-* #,##0.00 [$KM-sr-Latn-BA]_-;-* #,##0.00 [$KM-sr-Latn-BA]_-;', precision: 2 }
    , sr_latn_me: { code: "sr_Latn_ME", symbols: "€", align: "R", description: "Serbian (Latin, Montenegro)", remarks: "Montenegro - Currency", format: '_-* #,##0.00 [$€-sr-Latn-ME]_-;-* #,##0.00 [$€-sr-Latn-ME]_-;', precision: 2 }
    , sr_latn_cs: { code: "sr_Latn_CS", symbols: "din.", align: "R", description: "Serbian (Latin, Serbia and Montenegro (Former))", remarks: "Serbia - Currency", format: '_-* #,##0.00 [$din.-sr-Latn-CS]_-;-* #,##0.00 [$din.-sr-Latn-CS]_-;', precision: 2 }
    , sr_latn_rs: { code: "sr_Latn_RS", symbols: "RSD", align: "R", description: "Serbian (Latin, Serbia)", remarks: "Latin, Serbia - Currency", format: '_-* #,##0.00 [$RSD-sr-Latn-RS]_-;-* #,##0.00 [$RSD-sr-Latn-RS]_-;', precision: 2 }
    , st_za: { code: "st_ZA", symbols: "R", align: "L", description: "Sesotho (South Africa)", remarks: "South Africa - Currency", format: '_-[$R-st-ZA]* #,##0.00_-;-[$R-st-ZA]* #,##0.00_-;', precision: 2 }
    , nso_za: { code: "nso_ZA", symbols: "R", align: "L", description: "Sesotho sa Leboa", remarks: "South Africa - Currency", format: '_-[$R-nso-ZA] * #,##0.00_-;-[$R-nso-ZA] * #,##0.00_-;', precision: 2 }
    , tn_bw: { code: "tn_BW", symbols: "P", align: "L", description: "Setswana (Botswana) ", remarks: "Botswana - Currency", format: '_-[$P-tn-BW]* #,##0.00_-;-[$P-tn-BW]* #,##0.00_-;', precision: 2 }
    , tn_za: { code: "tn_ZA", symbols: "R", align: "L", description: "Setswana (South Africa) ", remarks: "South Africa - Currency", format: '_-[$R-tn-ZA]* #,##0.00_-;-[$R-tn-ZA]* #,##0.00_-;', precision: 2 }
    , tn_za: { code: "tn_ZA", symbols: "R", align: "L", description: "Setswana (South Africa)", remarks: "South Africa - Currency", format: '_-[$R-tn-ZA]* #,##0.00_-;-[$R-tn-ZA]* #,##0.00_-;', precision: 2 }
    , sn_latn_zw: { code: "sn_Latn_ZW", symbols: "$", align: "L", description: "Shona (Latin)", remarks: "Zimbabwe - Currency", format: '_-[$$-sn-Latn-ZW]* #,##0.00_-;-[$$-sn-Latn-ZW]* #,##0.00_-;', precision: 2 }
    , sd_arab_pk: { code: "sd_Arab_PK", symbols: "Rs", align: "L", description: "Sindhi (Arabic)", remarks: "Arabic - Currency", format: '_-[$Rs-sd-Arab-PK] * #,##0.00_-;-[$Rs-sd-Arab-PK] * #,##0.00_-;', precision: 2 }
    , sd_deva_in: { code: "sd_Deva_IN", symbols: "₹", align: "L", description: "Sindhi (Devanagari)", remarks: "India - Currency", format: '_-[$₹-sd-Deva-IN] * #,##0.00_-;-[$₹-sd-Deva-IN] * #,##0.00_-;', precision: 2 }
    , si_lk: { code: "si_LK", symbols: "රු.", align: "L", description: "Sinhala", remarks: "Sri Lanka - Currency", format: '_-[$රු.-si-LK]* #,##0.00_-;-[$රු.-si-LK]* #,##0.00_-;', precision: 2 }
    , sms_fi: { code: "sms_FI", symbols: "€", align: "R", description: "Skolt Sami (Finland)", remarks: "Finland - Currency", format: '_-* #,##0.00 [$€-sms-FI]_-;-* #,##0.00 [$€-sms-FI]_-;', precision: 2 }
    , sk_sk: { code: "sk_SK", symbols: "€", align: "R", description: "Slovak", remarks: "Slovakia - Currency", format: '_-* #,##0.00 [$€-sk-SK]_-;-* #,##0.00 [$€-sk-SK]_-;', precision: 2 }
    , sl_si: { code: "sl_SI", symbols: "€", align: "R", description: "Slovenian", remarks: "Slovenia - Currency", format: '_-* #,##0.00 [$€-sl-SI]_-;-* #,##0.00 [$€-sl-SI]_-;', precision: 2 }
    , so_so: { code: "so_SO", symbols: "S", align: "L", description: "Somali", remarks: "Somalia - Currency", format: '_-[$S-so-SO]* #,##0.00_-;-[$S-so-SO]* #,##0.00_-;', precision: 2 }
    , sma_no: { code: "sma_NO", symbols: "kr", align: "L", description: "Southern Sami (Norway)", remarks: "Norway - Currency", format: '_ [$kr-sma-NO] * #,##0.00_ ;_ [$kr-sma-NO] * -#,##0.00_ ;', precision: 2 }
    , sma_se: { code: "sma_SE", symbols: "kr", align: "R", description: "Southern Sami (Sweden", remarks: "Sweden - Currency", format: '_-* #,##0.00 [$kr-sma-SE]_-;-* #,##0.00 [$kr-sma-SE]_-;', precision: 2 }
    , es_ar: { code: "es_AR", symbols: "$", align: "L", description: "Spanish (Argentina)", remarks: "Argentina - Currency", format: '_-[$$-es-AR] * #,##0.00_-;-[$$-es-AR] * #,##0.00_-;', precision: 2 }
    , es_bo: { code: "es_BO", symbols: "Bs", align: "L", description: "Spanish (Bolivia)", remarks: "Bolivia - Currency", format: '_-[$Bs-es-BO]* #,##0.00_-;-[$Bs-es-BO]* #,##0.00_-;', precision: 2 }
    , es_cl: { code: "es_CL", symbols: "$", align: "L", description: "Spanish (Chile)", remarks: "Chile - Currency", format: '_ [$$-es-CL]* #,##0.00_ ;_ [$$-es-CL]* -#,##0.00_ ;', precision: 2 }
    , es_co: { code: "es_CO", symbols: "$", align: "L", description: "Spanish (Columbia)", remarks: "Columbia - Currency", format: '_-[$$-es-CO] * #,##0.00_-;-[$$-es-CO] * #,##0.00_-;', precision: 2 }
    , es_cr: { code: "es_CR", symbols: "₡", align: "L", description: "Spanish (Costa Rica)", remarks: "Costa Rica - Currency", format: '_-[$₡-es-CR]* #,##0.00_-;-[$₡-es-CR]* #,##0.00_-;', precision: 2 }
    , es_do: { code: "es_DO", symbols: "$", align: "L", description: "Spanish (Dominican Republic)", remarks: "Dominican Republic - Currency", format: '_([$$-es-DO]* #,##0.00_);_([$$-es-DO]* (#,##0.00);', precision: 2 }
    , es_sv: { code: "es_SV", symbols: "$", align: "L", description: "Spanish (El Salvador)", remarks: "El Salvador - Currency", format: '_-[$$-es-SV]* #,##0.00_-;-[$$-es-SV]* #,##0.00_-;', precision: 2 }
    , es_gt: { code: "es_GT", symbols: "Q", align: "L", description: "Spanish (Guatemala)", remarks: "Guatemala - Currency", format: '_-[$Q-es-GT]* #,##0.00_-;-[$Q-es-GT]* #,##0.00_-;', precision: 2 }
    , es_hn: { code: "es_HN", symbols: "L", align: "L", description: "Spanish (Honduras)", remarks: "Honduras - Currency", format: '_-[$L-es-HN]* #,##0.00_-;-[$L-es-HN]* #,##0.00_-;', precision: 2 }
    , es_419: { code: "es_419", symbols: "XDR", align: "L", description: "Spanish (Latin America)", remarks: "Latin America - Currency", format: '_-[$XDR-es-419]* #,##0.00_-;-[$XDR-es-419]* #,##0.00_-;', precision: 2 }
    , es_mx: { code: "es_MX", symbols: "$", align: "L", description: "Spanish (Mexico)", remarks: "Mexico - Currency", format: '_-[$$-es-MX]* #,##0.00_-;-[$$-es-MX]* #,##0.00_-;', precision: 2 }
    , es_ni: { code: "es_NI", symbols: "C$", align: "L", description: "Spanish (Nicaragua)", remarks: "Nicaragua - Currency", format: '_-[$C$-es-NI]* #,##0.00_-;-[$C$-es-NI]* #,##0.00_-;', precision: 2 }
    , es_pa: { code: "es_PA", symbols: "B/.", align: "L", description: "Spanish (Panama)", remarks: "Panama  - Currency", format: '_-[$B/.-es-PA]* #,##0.00_-;-[$B/.-es-PA]* #,##0.00_-;', precision: 2 }
    , es_py: { code: "es_PY", symbols: "₲", align: "L", description: "Spanish (Paraguay)", remarks: "Paraguay - Currency", format: '_ [$₲-es-PY] * #,##0.00_ ;_ [$₲-es-PY] * -#,##0.00_ ;', precision: 2 }
    , es_pe: { code: "es_PE", symbols: "S/", align: "L", description: "Spanish (Peru)", remarks: "Peru - Currency", format: '_-[$S/-es-PE] * #,##0.00_-;-[$S/-es-PE] * #,##0.00_-;', precision: 2 }
    , es_pr: { code: "es_PR", symbols: "$", align: "L", description: "Spanish (Puerto Rico)", remarks: "Puerto Rico - Currency", format: '_-[$$-es-PR]* #,##0.00_-;-[$$-es-PR]* #,##0.00_-;', precision: 2 }
    , es_es: { code: "es_ES", symbols: "€", align: "R", description: "Spanish (Spain)", remarks: "Spain - Currency", format: '_-* #,##0.00 [$€-es-ES]_-;-* #,##0.00 [$€-es-ES]_-;', precision: 2 }
    , es_es_tradnl: { code: "es_ES_tradnl", symbols: "€", align: "R", description: "Spanish (Spain, Traditional Sort)", remarks: "Spain - Currency", format: '_-* #,##0.00 [$€-es-ES_tradnl]_-;-* #,##0.00 [$€-es-ES_tradnl]_-;', precision: 2 }
    , es_us: { code: "es_US", symbols: "$", align: "L", description: "Spanish (United States)", remarks: "United States - Currency", format: '_([$$-es-US]* #,##0.00_);_([$$-es-US]* (#,##0.00);', precision: 2 }
    , es_uy: { code: "es_UY", symbols: "$", align: "L", description: "Spanish (Uruguay)", remarks: "Uruguay - Currency", format: '_-[$$-es-UY] * #,##0.00_-;-[$$-es-UY] * #,##0.00_-;', precision: 2 }
    , es_ve: { code: "es_VE", symbols: "Bs.S", align: "L", description: "Spanish (Venezuela)", remarks: "Venezuela - Currency", format: '_ [$Bs.S-es-VE]* #,##0.00_ ;_ [$Bs.S-es-VE]* -#,##0.00_ ;', precision: 2 }
    , sv_fi: { code: "sv_FI", symbols: "€", align: "R", description: "Swedish (Finland)", remarks: "Finland - Currency", format: '_-* #,##0.00 [$€-sv-FI]_-;-* #,##0.00 [$€-sv-FI]_-;', precision: 2 }
    , sv_se: { code: "sv_SE", symbols: "kr", align: "R", description: "Swedish (Sweden)", remarks: "Sweden - Currency", format: '_-* #,##0.00 [$kr-sv-SE]_-;-* #,##0.00 [$kr-sv-SE]_-;', precision: 2 }
    , gsw_ch: { code: "gsw_CH", symbols: "CHF", align: "R", description: "Swiss German (Switzerland)", remarks: "Switzerland - Currency", format: '_-* #,##0.00 [$CHF-gsw-CH]_-;-* #,##0.00 [$CHF-gsw-CH]_-;', precision: 2 }
    , syr_sy: { code: "syr_SY", symbols: "ܠ.ܣ.‏", align: "R", description: "Syriac", remarks: "Syria - Currency", format: '_-* #,##0.00 [$ܠ.ܣ.‏-syr-SY]_-;-* #,##0.00 [$ܠ.ܣ.‏-syr-SY]_-;', precision: 2 }
    , tg_cyrl_tj: { code: "tg_Cyrl_TJ", symbols: "смн", align: "R", description: "Tajik", remarks: "Tajikistan - Currency", format: '_-* #,##0.00 [$смн-tg-Cyrl-TJ]_-;-* #,##0.00 [$смн-tg-Cyrl-TJ]_-;', precision: 2 }
    , ta_in: { code: "ta_IN", symbols: "₹", align: "L", description: "Tamil (India)", remarks: "India - Currency", format: '_ [$₹-ta-IN] * #,##0.00_ ;_ [$₹-ta-IN] * -#,##0.00_ ;', precision: 2 }
    , ta_lk: { code: "ta_LK", symbols: "Rs.", align: "L", description: "Tamil (Sri Lanka)", remarks: "Sri Lanka - Currency", format: '_-[$Rs.-ta-LK] * #,##0.00_-;-[$Rs.-ta-LK] * #,##0.00_-;', precision: 2 }
    , tt_ru: { code: "tt_RU", symbols: "₽", align: "R", description: "Tatar", remarks: "Russia - Currency", format: '_-* #,##0.00 [$₽-tt-RU]_-;-* #,##0.00 [$₽-tt-RU]_-;', precision: 2 }
    , te_in: { code: "te_IN", symbols: "₹", align: "L", description: "Telugu", remarks: "India - Currency", format: '_-[$₹-te-IN]* #,##0.00_-;-[$₹-te-IN]* #,##0.00_-;', precision: 2 }
    , th_th: { code: "th_TH", symbols: "฿", align: "L", description: "Thai", remarks: "Thailand - Currency", format: '_-[$฿-th-TH]* #,##0.00_-;-[$฿-th-TH]* #,##0.00_-;', precision: 2 }
    , bo_cn: { code: "bo_CN", symbols: "¥", align: "L", description: "Tibetan (China)", remarks: "China - Currency", format: '_ [$¥-bo-CN]* #,##0.00_ ;_ [$¥-bo-CN]* -#,##0.00_ ;', precision: 2 }
    , ti_er: { code: "ti_ER", symbols: "Nfk", align: "L", description: "Tigrinya (Eritrea)", remarks: "Eritrea - Currency", format: '_-[$Nfk-ti-ER]* #,##0.00_-;-[$Nfk-ti-ER]* #,##0.00_-;', precision: 2 }
    , ti_et: { code: "ti_ET", symbols: "Br", align: "L", description: "Tigrinya (Ethiopia)", remarks: "Ethiopia - Currency", format: '_-[$Br-ti-ET]* #,##0.00_-;-[$Br-ti-ET]* #,##0.00_-;', precision: 2 }
    , tr_cy: { code: "tr_CY", symbols: "€", align: "L", description: "Turkish (Cyprus)", remarks: "Cyprus - Currency", format: '_-[$€-tr-CY]* #,##0.00_-;-[$€-tr-CY]* #,##0.00_-;', precision: 2 }
    , tr_tr: { code: "tr_TR", symbols: "₺", align: "L", description: "Turkish (Türkiye)", remarks: "Türkiye - Currency", format: '_-[$₺-tr-TR]* #,##0.00_-;-[$₺-tr-TR]* #,##0.00_-;', precision: 2 }
    , tk_tm: { code: "tk_TM", symbols: "m.", align: "R", description: "Turkmen", remarks: "Turkmenistan - Currency", format: '_-* #,##0.00[$m.-tk-TM]_-;-* #,##0.00[$m.-tk-TM]_-;', precision: 2 }
    , uk_ua: { code: "uk_UA", symbols: "₴", align: "R", description: "Ukrainian", remarks: "Ukraine - Currency", format: '_-* #,##0.00 [$₴-uk-UA]_-;-* #,##0.00 [$₴-uk-UA]_-;', precision: 2 }
    , hsb_de: { code: "hsb_DE", symbols: "€", align: "R", description: "Upper Sorbian", remarks: "Germany - Currency", format: '_-* #,##0.00 [$€-hsb-DE]_-;-* #,##0.00 [$€-hsb-DE]_-;', precision: 2 }
    , ur_in: { code: "ur_IN", symbols: "₹", align: "L", description: "Urdu (India)", remarks: "India - Currency", format: '_-[$₹-ur-IN]* #,##0.00_-;-[$₹-ur-IN]* #,##0.00_-;', precision: 2 }
    , ur_pk: { code: "ur_PK", symbols: "Rs", align: "L", description: "Urdu (Pakistan)", remarks: "Pakistan - Currency", format: '_-[$Rs-ur-PK] * #,##0.00_-;-[$Rs-ur-PK] * #,##0.00_-;', precision: 2 }
    , ug_cn: { code: "ug_CN", symbols: "¥", align: "L", description: "Uyghur (China)", remarks: "China - Currency", format: '_ [$¥-ug-CN]* #,##0.00_ ;_ [$¥-ug-CN]* -#,##0.00_ ;', precision: 2 }
    , uz_cyrl_uz: { code: "uz_Cyrl_UZ", symbols: "сўм", align: "R", description: "Uzbek (Cyrillic)", remarks: "Uzbekistan - Currency", format: '_-* #,##0.00 [$сўм-uz-Cyrl-UZ]_-;-* #,##0.00 [$сўм-uz-Cyrl-UZ]_-;', precision: 2 }
    , uz_latn_uz: { code: "uz_Latn_UZ", symbols: "soʻm", align: "R", description: "Uzbek (Latin)", remarks: "Uzbekistan - Currency", format: '_-* #,##0.00 [$soʻm-uz-Latn-UZ]_-;-* #,##0.00 [$soʻm-uz-Latn-UZ]_-;', precision: 2 }
    , uz_arab_af: { code: "uz_Arab_AF", symbols: "؋", align: "R", description: "Uzbek (Perso-Arabic, Afghanistan)", remarks: "Afghanistan - Currency", format: '_-* #,##0.00 [$؋-uz-Arab-AF]_-;-* #,##0.00 [$؋-uz-Arab-AF]_-;', precision: 2 }
    , ca_es_valencia: { code: "ca_ES_valencia", symbols: "€", align: "R", description: "Valencian", remarks: "Spain - Currency", format: '_-* #,##0.00 [$€-ca-ES-valencia]_-;-* #,##0.00 [$€-ca-ES-valencia]_-;', precision: 2 }
    , ve_za: { code: "ve_ZA", symbols: "R", align: "L", description: "Venda", remarks: "South Africa - Currency", format: '_-[$R-ve-ZA]* #,##0.00_-;-[$R-ve-ZA]* #,##0.00_-;', precision: 2 }
    , vi_vn: { code: "vi_VN", symbols: "₫", align: "R", description: "Vietnamese", remarks: "Vietnam - Currency", format: '_-* #,##0.00 [$₫-vi-VN]_-;-* #,##0.00 [$₫-vi-VN]_-;', precision: 2 }
    , cy_gb: { code: "cy_GB", symbols: "£", align: "L", description: "Welsh", remarks: "United Kingdom - Currency", format: '_-[$£-cy-GB]* #,##0.00_-;-[$£-cy-GB]* #,##0.00_-;', precision: 2 }
    , fy_nl: { code: "fy_NL", symbols: "€", align: "L", description: "Western Frisian", remarks: "Netherlands - Currency", format: '_-[$€-fy-NL] * #,##0.00_-;_-[$€-fy-NL] * #,##0.00-;', precision: 2 }
    , wo_sn: { code: "wo_SN", symbols: "CFA", align: "L", description: "Wolof", remarks: "Senegal - Currency", format: '_-[$CFA-wo-SN] * #,##0.00_-;-[$CFA-wo-SN] * #,##0.00_-;', precision: 2 }
    , ts_za: { code: "ts_ZA", symbols: "R", align: "L", description: "Xitsonga", remarks: "South Africa - Currency", format: '_-[$R-ts-ZA] * #,##0.00_-;-[$R-ts-ZA] * #,##0.00_-;', precision: 2 }
    , ii_cn: { code: "ii_CN", symbols: "¥", align: "L", description: "Yi (China)", remarks: "China - Currency", format: '_ [$¥-ii-CN]* #,##0.00_ ;_ [$¥-ii-CN]* -#,##0.00_ ;', precision: 2 }
    , yi_hebr: { code: "yi_Hebr", symbols: "¤", align: "L", description: "Yiddish", remarks: "Yiddish - Currency", format: '_-[$¤-yi-Hebr] * #,##0.00_-;-[$¤-yi-Hebr] * #,##0.00_-;', precision: 2 }
    , yo_ng: { code: "yo_NG", symbols: "₦", align: "L", description: "Yoruba", remarks: "Nigeria  - Currency", format: '_-[$₦-yo-NG]* #,##0.00_-;-[$₦-yo-NG]* #,##0.00_-;', precision: 2 }
    //
    , adp: { code: "ADP", symbols: "ADP", align: "L", description: "ADP", remarks: "Andorran Pesets", format: '_([$ADP] * #,##0.00_);_([$ADP] * (#,##0.00);', precision: 0 }
    , aed: { code: "AED", symbols: "AED", align: "L", description: "AED", remarks: "UAE Dirhams", format: '_([$AED] * #,##0.00_);_([$AED] * (#,##0.00);', precision: 2 }
    , afa: { code: "AFA", symbols: "AFA", align: "L", description: "AFA", remarks: "Afghanis", format: '_([$AFA] * #,##0.00_);_([$AFA] * (#,##0.00);', precision: 2 }
    , all: { code: "ALL", symbols: "ALL", align: "L", description: "ALL", remarks: "Leks", format: '_([$ALL] * #,##0.00_);_([$ALL] * (#,##0.00);', precision: 2 }
    , amd: { code: "AMD", symbols: "AMD", align: "L", description: "AMD", remarks: "Armenian Drams", format: '_([$AMD] * #,##0.00_);_([$AMD] * (#,##0.00);', precision: 2 }
    , ang: { code: "ANG", symbols: "ANG", align: "L", description: "ANG", remarks: "NE Antillian Guilders", format: '_([$ANG] * #,##0.00_);_([$ANG] * (#,##0.00);', precision: 2 }
    , aoa: { code: "AOA", symbols: "AOA", align: "L", description: "AOA", remarks: "Kwanzas", format: '_([$AOA] * #,##0.00_);_([$AOA] * (#,##0.00);', precision: 2 }
    , aon: { code: "AON", symbols: "AON", align: "L", description: "AON", remarks: "New Kwanzas", format: '_([$AON] * #,##0.00_);_([$AON] * (#,##0.00);', precision: 2 }
    , aor: { code: "AOR", symbols: "AOR", align: "L", description: "AOR", remarks: "Kwanza Reajustados", format: '_([$AOR] * #,##0.00_);_([$AOR] * (#,##0.00);', precision: 2 }
    , ars: { code: "ARS", symbols: "ARS", align: "L", description: "ARS", remarks: "Argentine Pesos", format: '_([$ARS] * #,##0.00_);_([$ARS] * (#,##0.00);', precision: 2 }
    , ats: { code: "ATS", symbols: "ATS", align: "L", description: "ATS", remarks: "Schillings", format: '_([$ATS] * #,##0.00_);_([$ATS] * (#,##0.00);', precision: 2 }
    , aud: { code: "AUD", symbols: "AUD", align: "L", description: "AUD", remarks: "Australian Dollars", format: '_([$AUD] * #,##0.00_);_([$AUD] * (#,##0.00);', precision: 2 }
    , awg: { code: "AWG", symbols: "AWG", align: "L", description: "AWG", remarks: "Aruban Guilders", format: '_([$AWG] * #,##0.00_);_([$AWG] * (#,##0.00);', precision: 2 }
    , azm: { code: "AZM", symbols: "AZM", align: "L", description: "AZM", remarks: "Azerbaijanian Manats", format: '_([$AZM] * #,##0.00_);_([$AZM] * (#,##0.00);', precision: 2 }
    , bam: { code: "BAM", symbols: "BAM", align: "L", description: "BAM", remarks: "Convertable Marks", format: '_([$BAM] * #,##0.00_);_([$BAM] * (#,##0.00);', precision: 2 }
    , bbd: { code: "BBD", symbols: "BBD", align: "L", description: "BBD", remarks: "Barbados Dollars", format: '_([$BBD] * #,##0.00_);_([$BBD] * (#,##0.00);', precision: 2 }
    , bdt: { code: "BDT", symbols: "BDT", align: "L", description: "BDT", remarks: "Takas", format: '_([$BDT] * #,##0.00_);_([$BDT] * (#,##0.00);', precision: 2 }
    , bef: { code: "BEF", symbols: "BEF", align: "L", description: "BEF", remarks: "Belgian Francs", format: '_([$BEF] * #,##0.00_);_([$BEF] * (#,##0.00);', precision: 0 }
    , bgl: { code: "BGL", symbols: "BGL", align: "L", description: "BGL", remarks: "Levs", format: '_([$BGL] * #,##0.00_);_([$BGL] * (#,##0.00);', precision: 2 }
    , bhd: { code: "BHD", symbols: "BHD", align: "L", description: "BHD", remarks: "Bahraini Dinars", format: '_([$BHD] * #,##0.00_);_([$BHD] * (#,##0.00);', precision: 3 }
    , bif: { code: "BIF", symbols: "BIF", align: "L", description: "BIF", remarks: "Burundi Francs", format: '_([$BIF] * #,##0.00_);_([$BIF] * (#,##0.00);', precision: 0 }
    , bmd: { code: "BMD", symbols: "BMD", align: "L", description: "BMD", remarks: "Bermuda Dollars", format: '_([$BMD] * #,##0.00_);_([$BMD] * (#,##0.00);', precision: 2 }
    , bnd: { code: "BND", symbols: "BND", align: "L", description: "BND", remarks: "Brunei Dollars", format: '_([$BND] * #,##0.00_);_([$BND] * (#,##0.00);', precision: 2 }
    , bob: { code: "BOB", symbols: "BOB", align: "L", description: "BOB", remarks: "Bolivianos", format: '_([$BOB] * #,##0.00_);_([$BOB] * (#,##0.00);', precision: 2 }
    , brl: { code: "BRL", symbols: "BRL", align: "L", description: "BRL", remarks: "Brazilian Reals", format: '_([$BRL] * #,##0.00_);_([$BRL] * (#,##0.00);', precision: 2 }
    , bsd: { code: "BSD", symbols: "BSD", align: "L", description: "BSD", remarks: "Bahamian Dollars", format: '_([$BSD] * #,##0.00_);_([$BSD] * (#,##0.00);', precision: 2 }
    , btn: { code: "BTN", symbols: "BTN", align: "L", description: "BTN", remarks: "Ngultrums", format: '_([$BTN] * #,##0.00_);_([$BTN] * (#,##0.00);', precision: 2 }
    , bwp: { code: "BWP", symbols: "BWP", align: "L", description: "BWP", remarks: "Pulas", format: '_([$BWP] * #,##0.00_);_([$BWP] * (#,##0.00);', precision: 2 }
    , byr: { code: "BYR", symbols: "BYR", align: "L", description: "BYR", remarks: "Belarussiann Rubles", format: '_([$BYR] * #,##0.00_);_([$BYR] * (#,##0.00);', precision: 0 }
    , bzd: { code: "BZD", symbols: "BZD", align: "L", description: "BZD", remarks: "Belize Dollars", format: '_([$BZD] * #,##0.00_);_([$BZD] * (#,##0.00);', precision: 2 }
    , cad: { code: "CAD", symbols: "CAD", align: "L", description: "CAD", remarks: "Canadian Dollars", format: '_([$CAD] * #,##0.00_);_([$CAD] * (#,##0.00);', precision: 2 }
    , cdf: { code: "CDF", symbols: "CDF", align: "L", description: "CDF", remarks: "Congolais Francs", format: '_([$CDF] * #,##0.00_);_([$CDF] * (#,##0.00);', precision: 2 }
    , chf: { code: "CHF", symbols: "CHF", align: "L", description: "CHF", remarks: "Swiss Francs", format: '_([$CHF] * #,##0.00_);_([$CHF] * (#,##0.00);', precision: 2 }
    , clp: { code: "CLP", symbols: "CLP", align: "L", description: "CLP", remarks: "Chilean Pesos", format: '_([$CLP] * #,##0.00_);_([$CLP] * (#,##0.00);', precision: 0 }
    , cny: { code: "CNY", symbols: "CNY", align: "L", description: "CNY", remarks: "Yuan Renminbis", format: '_([$CNY] * #,##0.00_);_([$CNY] * (#,##0.00);', precision: 2 }
    , cop: { code: "COP", symbols: "COP", align: "L", description: "COP", remarks: "Columbian Pesos", format: '_([$COP] * #,##0.00_);_([$COP] * (#,##0.00);', precision: 2 }
    , crc: { code: "CRC", symbols: "CRC", align: "L", description: "CRC", remarks: "Costa Rican Colons", format: '_([$CRC] * #,##0.00_);_([$CRC] * (#,##0.00);', precision: 2 }
    , cup: { code: "CUP", symbols: "CUP", align: "L", description: "CUP", remarks: "Cuban Pesos", format: '_([$CUP] * #,##0.00_);_([$CUP] * (#,##0.00);', precision: 2 }
    , cve: { code: "CVE", symbols: "CVE", align: "L", description: "CVE", remarks: "Cape Verde Escudos", format: '_([$CVE] * #,##0.00_);_([$CVE] * (#,##0.00);', precision: 2 }
    , cyp: { code: "CYP", symbols: "CYP", align: "L", description: "CYP", remarks: "Cyprus Pounds", format: '_([$CYP] * #,##0.00_);_([$CYP] * (#,##0.00);', precision: 2 }
    , czk: { code: "CZK", symbols: "CZK", align: "L", description: "CZK", remarks: "Czech Korunas", format: '_([$CZK] * #,##0.00_);_([$CZK] * (#,##0.00);', precision: 2 }
    , dem: { code: "DEM", symbols: "DEM", align: "L", description: "DEM", remarks: "Deutsche Marks", format: '_([$DEM] * #,##0.00_);_([$DEM] * (#,##0.00);', precision: 2 }
    , djf: { code: "DJF", symbols: "DJF", align: "L", description: "DJF", remarks: "Djibouti Francs", format: '_([$DJF] * #,##0.00_);_([$DJF] * (#,##0.00);', precision: 0 }
    , dkk: { code: "DKK", symbols: "DKK", align: "L", description: "DKK", remarks: "Danish Krones", format: '_([$DKK] * #,##0.00_);_([$DKK] * (#,##0.00);', precision: 2 }
    , dop: { code: "DOP", symbols: "DOP", align: "L", description: "DOP", remarks: "Dominican Pesos", format: '_([$DOP] * #,##0.00_);_([$DOP] * (#,##0.00);', precision: 2 }
    , dzd: { code: "DZD", symbols: "DZD", align: "L", description: "DZD", remarks: "Algerian Dinars", format: '_([$DZD] * #,##0.00_);_([$DZD] * (#,##0.00);', precision: 2 }
    , eek: { code: "EEK", symbols: "EEK", align: "L", description: "EEK", remarks: "Kroons", format: '_([$EEK] * #,##0.00_);_([$EEK] * (#,##0.00);', precision: 0 }
    , egp: { code: "EGP", symbols: "EGP", align: "L", description: "EGP", remarks: "Egyptian Pounds", format: '_([$EGP] * #,##0.00_);_([$EGP] * (#,##0.00);', precision: 2 }
    , ern: { code: "ERN", symbols: "ERN", align: "L", description: "ERN", remarks: "Nakfas", format: '_([$ERN] * #,##0.00_);_([$ERN] * (#,##0.00);', precision: 2 }
    , esp: { code: "ESP", symbols: "ESP", align: "L", description: "ESP", remarks: "Spanish Pesetas", format: '_([$ESP] * #,##0.00_);_([$ESP] * (#,##0.00);', precision: 0 }
    , etb: { code: "ETB", symbols: "ETB", align: "L", description: "ETB", remarks: "Ethiopian Birrs", format: '_([$ETB] * #,##0.00_);_([$ETB] * (#,##0.00);', precision: 2 }
    , eur: { code: "EUR", symbols: "EUR", align: "L", description: "EUR", remarks: "Euro", format: '_([$EUR] * #,##0.00_);_([$EUR] * (#,##0.00);', precision: 2 }
    , fim: { code: "FIM", symbols: "FIM", align: "L", description: "FIM", remarks: "Markkas", format: '_([$FIM] * #,##0.00_);_([$FIM] * (#,##0.00);', precision: 2 }
    , fjd: { code: "FJD", symbols: "FJD", align: "L", description: "FJD", remarks: "Fiji Dollars", format: '_([$FJD] * #,##0.00_);_([$FJD] * (#,##0.00);', precision: 2 }
    , fkp: { code: "FKP", symbols: "FKP", align: "L", description: "FKP", remarks: "Falkland Islands Pounds", format: '_([$FKP] * #,##0.00_);_([$FKP] * (#,##0.00);', precision: 2 }
    , frf: { code: "FRF", symbols: "FRF", align: "L", description: "FRF", remarks: "French Francs", format: '_([$FRF] * #,##0.00_);_([$FRF] * (#,##0.00);', precision: 2 }
    , gbp: { code: "GBP", symbols: "GBP", align: "L", description: "GBP", remarks: "Pounds Sterling", format: '_([$GBP] * #,##0.00_);_([$GBP] * (#,##0.00);', precision: 2 }
    , gek: { code: "GEK", symbols: "GEK", align: "L", description: "GEK", remarks: "Georgian Coupons", format: '_([$GEK] * #,##0.00_);_([$GEK] * (#,##0.00);', precision: 2 }
    , ghc: { code: "GHC", symbols: "GHC", align: "L", description: "GHC", remarks: "Cedis", format: '_([$GHC] * #,##0.00_);_([$GHC] * (#,##0.00);', precision: 2 }
    , gip: { code: "GIP", symbols: "GIP", align: "L", description: "GIP", remarks: "Gibraltar Pounds", format: '_([$GIP] * #,##0.00_);_([$GIP] * (#,##0.00);', precision: 2 }
    , gmd: { code: "GMD", symbols: "GMD", align: "L", description: "GMD", remarks: "Dalasis", format: '_([$GMD] * #,##0.00_);_([$GMD] * (#,##0.00);', precision: 2 }
    , gnf: { code: "GNF", symbols: "GNF", align: "L", description: "GNF", remarks: "Guinea Francs", format: '_([$GNF] * #,##0.00_);_([$GNF] * (#,##0.00);', precision: 0 }
    , grd: { code: "GRD", symbols: "GRD", align: "L", description: "GRD", remarks: "Drachmas", format: '_([$GRD] * #,##0.00_);_([$GRD] * (#,##0.00);', precision: 0 }
    , gtq: { code: "GTQ", symbols: "GTQ", align: "L", description: "GTQ", remarks: "Quetzals", format: '_([$GTQ] * #,##0.00_);_([$GTQ] * (#,##0.00);', precision: 2 }
    , gwp: { code: "GWP", symbols: "GWP", align: "L", description: "GWP", remarks: "Guinea-Bissau Pesos", format: '_([$GWP] * #,##0.00_);_([$GWP] * (#,##0.00);', precision: 2 }
    , gyd: { code: "GYD", symbols: "GYD", align: "L", description: "GYD", remarks: "Guyana Dollars", format: '_([$GYD] * #,##0.00_);_([$GYD] * (#,##0.00);', precision: 2 }
    , hkd: { code: "HKD", symbols: "HKD", align: "L", description: "HKD", remarks: "Hong Kong Dollars", format: '_([$HKD] * #,##0.00_);_([$HKD] * (#,##0.00);', precision: 2 }
    , hnl: { code: "HNL", symbols: "HNL", align: "L", description: "HNL", remarks: "Lempiras", format: '_([$HNL] * #,##0.00_);_([$HNL] * (#,##0.00);', precision: 2 }
    , hrk: { code: "HRK", symbols: "HRK", align: "L", description: "HRK", remarks: "Kunas", format: '_([$HRK] * #,##0.00_);_([$HRK] * (#,##0.00);', precision: 2 }
    , htg: { code: "HTG", symbols: "HTG", align: "L", description: "HTG", remarks: "Gourdes", format: '_([$HTG] * #,##0.00_);_([$HTG] * (#,##0.00);', precision: 2 }
    , huf: { code: "HUF", symbols: "HUF", align: "L", description: "HUF", remarks: "Forints", format: '_([$HUF] * #,##0.00_);_([$HUF] * (#,##0.00);', precision: 2 }
    , idr: { code: "IDR", symbols: "IDR", align: "L", description: "IDR", remarks: "Rupiahs", format: '_([$IDR] * #,##0.00_);_([$IDR] * (#,##0.00);', precision: 2 }
    , iep: { code: "IEP", symbols: "IEP", align: "L", description: "IEP", remarks: "Irish Pounds", format: '_([$IEP] * #,##0.00_);_([$IEP] * (#,##0.00);', precision: 2 }
    , ils: { code: "ILS", symbols: "ILS", align: "L", description: "ILS", remarks: "Shekels", format: '_([$ILS] * #,##0.00_);_([$ILS] * (#,##0.00);', precision: 2 }
    , inr: { code: "INR", symbols: "INR", align: "L", description: "INR", remarks: "Indian Rupees", format: '_([$INR] * #,##0.00_);_([$INR] * (#,##0.00);', precision: 2 }
    , iqd: { code: "IQD", symbols: "IQD", align: "L", description: "IQD", remarks: "Iraqi Dinars", format: '_([$IQD] * #,##0.00_);_([$IQD] * (#,##0.00);', precision: 2 }
    , irr: { code: "IRR", symbols: "IRR", align: "L", description: "IRR", remarks: "Iranian Rials", format: '_([$IRR] * #,##0.00_);_([$IRR] * (#,##0.00);', precision: 2 }
    , isk: { code: "ISK", symbols: "ISK", align: "L", description: "ISK", remarks: "Iceland Kronas", format: '_([$ISK] * #,##0.00_);_([$ISK] * (#,##0.00);', precision: 2 }
    , itl: { code: "ITL", symbols: "ITL", align: "L", description: "ITL", remarks: "Italian Liras", format: '_([$ITL] * #,##0.00_);_([$ITL] * (#,##0.00);', precision: 0 }
    , jmd: { code: "JMD", symbols: "JMD", align: "L", description: "JMD", remarks: "Jamaican Dollars", format: '_([$JMD] * #,##0.00_);_([$JMD] * (#,##0.00);', precision: 2 }
    , jod: { code: "JOD", symbols: "JOD", align: "L", description: "JOD", remarks: "Jordanian Dinars", format: '_([$JOD] * #,##0.00_);_([$JOD] * (#,##0.00);', precision: 3 }
    , jpy: { code: "JPY", symbols: "JPY", align: "L", description: "JPY", remarks: "Japanese Yen", format: '_([$JPY] * #,##0.00_);_([$JPY] * (#,##0.00);', precision: 0 }
    , kes: { code: "KES", symbols: "KES", align: "L", description: "KES", remarks: "Kenyan Shillings", format: '_([$KES] * #,##0.00_);_([$KES] * (#,##0.00);', precision: 2 }
    , kgs: { code: "KGS", symbols: "KGS", align: "L", description: "KGS", remarks: "Soms", format: '_([$KGS] * #,##0.00_);_([$KGS] * (#,##0.00);', precision: 2 }
    , khr: { code: "KHR", symbols: "KHR", align: "L", description: "KHR", remarks: "Riels", format: '_([$KHR] * #,##0.00_);_([$KHR] * (#,##0.00);', precision: 2 }
    , kmf: { code: "KMF", symbols: "KMF", align: "L", description: "KMF", remarks: "Comoro Francs", format: '_([$KMF] * #,##0.00_);_([$KMF] * (#,##0.00);', precision: 0 }
    , kpw: { code: "KPW", symbols: "KPW", align: "L", description: "KPW", remarks: "N. Korean Wons", format: '_([$KPW] * #,##0.00_);_([$KPW] * (#,##0.00);', precision: 2 }
    , krw: { code: "KRW", symbols: "KRW", align: "L", description: "KRW", remarks: "Wons", format: '_([$KRW] * #,##0.00_);_([$KRW] * (#,##0.00);', precision: 0 }
    , kwd: { code: "KWD", symbols: "KWD", align: "L", description: "KWD", remarks: "Kuwaiti Dinars", format: '_([$KWD] * #,##0.00_);_([$KWD] * (#,##0.00);', precision: 3 }
    , kyd: { code: "KYD", symbols: "KYD", align: "L", description: "KYD", remarks: "Cayman Is Dollars", format: '_([$KYD] * #,##0.00_);_([$KYD] * (#,##0.00);', precision: 2 }
    , kzt: { code: "KZT", symbols: "KZT", align: "L", description: "KZT", remarks: "Tenges", format: '_([$KZT] * #,##0.00_);_([$KZT] * (#,##0.00);', precision: 2 }
    , lak: { code: "LAK", symbols: "LAK", align: "L", description: "LAK", remarks: "Kips", format: '_([$LAK] * #,##0.00_);_([$LAK] * (#,##0.00);', precision: 2 }
    , lbp: { code: "LBP", symbols: "LBP", align: "L", description: "LBP", remarks: "Lebanese Pounds", format: '_([$LBP] * #,##0.00_);_([$LBP] * (#,##0.00);', precision: 2 }
    , lkr: { code: "LKR", symbols: "LKR", align: "L", description: "LKR", remarks: "Sri Lanka Rupees", format: '_([$LKR] * #,##0.00_);_([$LKR] * (#,##0.00);', precision: 2 }
    , lrd: { code: "LRD", symbols: "LRD", align: "L", description: "LRD", remarks: "Liberian Dollars", format: '_([$LRD] * #,##0.00_);_([$LRD] * (#,##0.00);', precision: 2 }
    , lsl: { code: "LSL", symbols: "LSL", align: "L", description: "LSL", remarks: "Lotis", format: '_([$LSL] * #,##0.00_);_([$LSL] * (#,##0.00);', precision: 2 }
    , ltl: { code: "LTL", symbols: "LTL", align: "L", description: "LTL", remarks: "Lithuanian Litas", format: '_([$LTL] * #,##0.00_);_([$LTL] * (#,##0.00);', precision: 2 }
    , luf: { code: "LUF", symbols: "LUF", align: "L", description: "LUF", remarks: "Luxembourg Francs", format: '_([$LUF] * #,##0.00_);_([$LUF] * (#,##0.00);', precision: 0 }
    , lvl: { code: "LVL", symbols: "LVL", align: "L", description: "LVL", remarks: "Latvian Lats", format: '_([$LVL] * #,##0.00_);_([$LVL] * (#,##0.00);', precision: 2 }
    , lyd: { code: "LYD", symbols: "LYD", align: "L", description: "LYD", remarks: "Libyan Dinars", format: '_([$LYD] * #,##0.00_);_([$LYD] * (#,##0.00);', precision: 3 }
    , mad: { code: "MAD", symbols: "MAD", align: "L", description: "MAD", remarks: "Moroccan Dirhams", format: '_([$MAD] * #,##0.00_);_([$MAD] * (#,##0.00);', precision: 2 }
    , mdl: { code: "MDL", symbols: "MDL", align: "L", description: "MDL", remarks: "Moldovan Leus", format: '_([$MDL] * #,##0.00_);_([$MDL] * (#,##0.00);', precision: 2 }
    , mgf: { code: "MGF", symbols: "MGF", align: "L", description: "MGF", remarks: "Malagasy Francs", format: '_([$MGF] * #,##0.00_);_([$MGF] * (#,##0.00);', precision: 0 }
    , mkd: { code: "MKD", symbols: "MKD", align: "L", description: "MKD", remarks: "Denars", format: '_([$MKD] * #,##0.00_);_([$MKD] * (#,##0.00);', precision: 2 }
    , mmk: { code: "MMK", symbols: "MMK", align: "L", description: "MMK", remarks: "Kyats", format: '_([$MMK] * #,##0.00_);_([$MMK] * (#,##0.00);', precision: 2 }
    , mnt: { code: "MNT", symbols: "MNT", align: "L", description: "MNT", remarks: "Tugrics", format: '_([$MNT] * #,##0.00_);_([$MNT] * (#,##0.00);', precision: 2 }
    , mop: { code: "MOP", symbols: "MOP", align: "L", description: "MOP", remarks: "Patacas", format: '_([$MOP] * #,##0.00_);_([$MOP] * (#,##0.00);', precision: 2 }
    , mro: { code: "MRO", symbols: "MRO", align: "L", description: "MRO", remarks: "Ouguiyas", format: '_([$MRO] * #,##0.00_);_([$MRO] * (#,##0.00);', precision: 2 }
    , mtl: { code: "MTL", symbols: "MTL", align: "L", description: "MTL", remarks: "Maltese Liras", format: '_([$MTL] * #,##0.00_);_([$MTL] * (#,##0.00);', precision: 2 }
    , mur: { code: "MUR", symbols: "MUR", align: "L", description: "MUR", remarks: "Mauritius Rupees", format: '_([$MUR] * #,##0.00_);_([$MUR] * (#,##0.00);', precision: 2 }
    , mvr: { code: "MVR", symbols: "MVR", align: "L", description: "MVR", remarks: "Rufiyaas", format: '_([$MVR] * #,##0.00_);_([$MVR] * (#,##0.00);', precision: 2 }
    , mwk: { code: "MWK", symbols: "MWK", align: "L", description: "MWK", remarks: "Kwachas - Malawi", format: '_([$MWK] * #,##0.00_);_([$MWK] * (#,##0.00);', precision: 2 }
    , mxn: { code: "MXN", symbols: "MXN", align: "L", description: "MXN", remarks: "Mexican Pesos", format: '_([$MXN] * #,##0.00_);_([$MXN] * (#,##0.00);', precision: 2 }
    , myr: { code: "MYR", symbols: "MYR", align: "L", description: "MYR", remarks: "Malaysian Ringgits", format: '_([$MYR] * #,##0.00_);_([$MYR] * (#,##0.00);', precision: 2 }
    , mzm: { code: "MZM", symbols: "MZM", align: "L", description: "MZM", remarks: "Meticals", format: '_([$MZM] * #,##0.00_);_([$MZM] * (#,##0.00);', precision: 2 }
    , nad: { code: "NAD", symbols: "NAD", align: "L", description: "NAD", remarks: "Namibia Dollars", format: '_([$NAD] * #,##0.00_);_([$NAD] * (#,##0.00);', precision: 2 }
    , ngn: { code: "NGN", symbols: "NGN", align: "L", description: "NGN", remarks: "Nairas", format: '_([$NGN] * #,##0.00_);_([$NGN] * (#,##0.00);', precision: 2 }
    , nio: { code: "NIO", symbols: "NIO", align: "L", description: "NIO", remarks: "Cordoba Oros", format: '_([$NIO] * #,##0.00_);_([$NIO] * (#,##0.00);', precision: 2 }
    , nlg: { code: "NLG", symbols: "NLG", align: "L", description: "NLG", remarks: "Netherlands Guilders", format: '_([$NLG] * #,##0.00_);_([$NLG] * (#,##0.00);', precision: 2 }
    , nok: { code: "NOK", symbols: "NOK", align: "L", description: "NOK", remarks: "Norwegian Krones", format: '_([$NOK] * #,##0.00_);_([$NOK] * (#,##0.00);', precision: 2 }
    , npr: { code: "NPR", symbols: "NPR", align: "L", description: "NPR", remarks: "Nepalese Rupees", format: '_([$NPR] * #,##0.00_);_([$NPR] * (#,##0.00);', precision: 2 }
    , nzd: { code: "NZD", symbols: "NZD", align: "L", description: "NZD", remarks: "New Zealand Dollars", format: '_([$NZD] * #,##0.00_);_([$NZD] * (#,##0.00);', precision: 2 }
    , omr: { code: "OMR", symbols: "OMR", align: "L", description: "OMR", remarks: "Rial Omanis", format: '_([$OMR] * #,##0.00_);_([$OMR] * (#,##0.00);', precision: 3 }
    , pab: { code: "PAB", symbols: "PAB", align: "L", description: "PAB", remarks: "Balboas", format: '_([$PAB] * #,##0.00_);_([$PAB] * (#,##0.00);', precision: 2 }
    , pen: { code: "PEN", symbols: "PEN", align: "L", description: "PEN", remarks: "Nuevo Sols", format: '_([$PEN] * #,##0.00_);_([$PEN] * (#,##0.00);', precision: 2 }
    , pes: { code: "PES", symbols: "PES", align: "L", description: "PES", remarks: "Sols", format: '_([$PES] * #,##0.00_);_([$PES] * (#,##0.00);', precision: 2 }
    , pgk: { code: "PGK", symbols: "PGK", align: "L", description: "PGK", remarks: "Kinas", format: '_([$PGK] * #,##0.00_);_([$PGK] * (#,##0.00);', precision: 2 }
    , php: { code: "PHP", symbols: "PHP", align: "L", description: "PHP", remarks: "Philippine Pesos", format: '_([$PHP] * #,##0.00_);_([$PHP] * (#,##0.00);', precision: 2 }
    , pkr: { code: "PKR", symbols: "PKR", align: "L", description: "PKR", remarks: "Pakistan Rupees", format: '_([$PKR] * #,##0.00_);_([$PKR] * (#,##0.00);', precision: 2 }
    , pln: { code: "PLN", symbols: "PLN", align: "L", description: "PLN", remarks: "Zlotys", format: '_([$PLN] * #,##0.00_);_([$PLN] * (#,##0.00);', precision: 2 }
    , psz: { code: "PSZ", symbols: "PSZ", align: "L", description: "PSZ", remarks: "Palestinianzits", format: '_([$PSZ] * #,##0.00_);_([$PSZ] * (#,##0.00);', precision: 2 }
    , pte: { code: "PTE", symbols: "PTE", align: "L", description: "PTE", remarks: "Portuguese Escudos", format: '_([$PTE] * #,##0.00_);_([$PTE] * (#,##0.00);', precision: 1 }
    , pyg: { code: "PYG", symbols: "PYG", align: "L", description: "PYG", remarks: "Guaranis", format: '_([$PYG] * #,##0.00_);_([$PYG] * (#,##0.00);', precision: 0 }
    , rol: { code: "ROL", symbols: "ROL", align: "L", description: "ROL", remarks: "Leus", format: '_([$ROL] * #,##0.00_);_([$ROL] * (#,##0.00);', precision: 2 }
    , rub: { code: "RUB", symbols: "RUB", align: "L", description: "RUB", remarks: "Russian Federation Rubles", format: '_([$RUB] * #,##0.00_);_([$RUB] * (#,##0.00);', precision: 2 }
    , rur: { code: "RUR", symbols: "RUR", align: "L", description: "RUR", remarks: "Russian RURles", format: '_([$RUR] * #,##0.00_);_([$RUR] * (#,##0.00);', precision: 2 }
    , rwf: { code: "RWF", symbols: "RWF", align: "L", description: "RWF", remarks: "Rwanda Francs", format: '_([$RWF] * #,##0.00_);_([$RWF] * (#,##0.00);', precision: 0 }
    , sar: { code: "SAR", symbols: "SAR", align: "L", description: "SAR", remarks: "Saudi Riyals", format: '_([$SAR] * #,##0.00_);_([$SAR] * (#,##0.00);', precision: 2 }
    , sbd: { code: "SBD", symbols: "SBD", align: "L", description: "SBD", remarks: "Solomon Islands Dollars", format: '_([$SBD] * #,##0.00_);_([$SBD] * (#,##0.00);', precision: 2 }
    , scr: { code: "SCR", symbols: "SCR", align: "L", description: "SCR", remarks: "Seycelles Rupees", format: '_([$SCR] * #,##0.00_);_([$SCR] * (#,##0.00);', precision: 2 }
    , sdd: { code: "SDD", symbols: "SDD", align: "L", description: "SDD", remarks: "Dinars", format: '_([$SDD] * #,##0.00_);_([$SDD] * (#,##0.00);', precision: 2 }
    , sdp: { code: "SDP", symbols: "SDP", align: "L", description: "SDP", remarks: "Sudanese Pounds", format: '_([$SDP] * #,##0.00_);_([$SDP] * (#,##0.00);', precision: 2 }
    , sek: { code: "SEK", symbols: "SEK", align: "L", description: "SEK", remarks: "Swedish Kronas", format: '_([$SEK] * #,##0.00_);_([$SEK] * (#,##0.00);', precision: 2 }
    , sgd: { code: "SGD", symbols: "SGD", align: "L", description: "SGD", remarks: "Singapore Dollars", format: '_([$SGD] * #,##0.00_);_([$SGD] * (#,##0.00);', precision: 2 }
    , sit: { code: "SIT", symbols: "SIT", align: "L", description: "SIT", remarks: "Tolars", format: '_([$SIT] * #,##0.00_);_([$SIT] * (#,##0.00);', precision: 0 }
    , skk: { code: "SKK", symbols: "SKK", align: "L", description: "SKK", remarks: "Slovak Korunas", format: '_([$SKK] * #,##0.00_);_([$SKK] * (#,##0.00);', precision: 2 }
    , sll: { code: "SLL", symbols: "SLL", align: "L", description: "SLL", remarks: "Leones", format: '_([$SLL] * #,##0.00_);_([$SLL] * (#,##0.00);', precision: 2 }
    , sosp: { code: "SOS", symbols: "SOS", align: "L", description: "SOS", remarks: "Somali Shillings", format: '_([$SOS] * #,##0.00_);_([$SOS] * (#,##0.00);', precision: 2 }
    , srg: { code: "SRG", symbols: "SRG", align: "L", description: "SRG", remarks: "Surinam Guilders", format: '_([$SRG] * #,##0.00_);_([$SRG] * (#,##0.00);', precision: 2 }
    , std: { code: "STD", symbols: "STD", align: "L", description: "STD", remarks: "Dobras", format: '_([$STD] * #,##0.00_);_([$STD] * (#,##0.00);', precision: 2 }
    , svc: { code: "SVC", symbols: "SVC", align: "L", description: "SVC", remarks: "El Salvador Colons", format: '_([$SVC] * #,##0.00_);_([$SVC] * (#,##0.00);', precision: 2 }
    , syp: { code: "SYP", symbols: "SYP", align: "L", description: "SYP", remarks: "Syrian Pounds", format: '_([$SYP] * #,##0.00_);_([$SYP] * (#,##0.00);', precision: 2 }
    , szl: { code: "SZL", symbols: "SZL", align: "L", description: "SZL", remarks: "Lilangenis", format: '_([$SZL] * #,##0.00_);_([$SZL] * (#,##0.00);', precision: 2 }
    , thb: { code: "THB", symbols: "THB", align: "L", description: "THB", remarks: "Bahts", format: '_([$THB] * #,##0.00_);_([$THB] * (#,##0.00);', precision: 2 }
    , tmm: { code: "TMM", symbols: "TMM", align: "L", description: "TMM", remarks: "Manats", format: '_([$TMM] * #,##0.00_);_([$TMM] * (#,##0.00);', precision: 2 }
    , tnd: { code: "TND", symbols: "TND", align: "L", description: "TND", remarks: "Tunisian Dinars", format: '_([$TND] * #,##0.00_);_([$TND] * (#,##0.00);', precision: 3 }
    , top: { code: "TOP", symbols: "TOP", align: "L", description: "TOP", remarks: "Pa Angas", format: '_([$TOP] * #,##0.00_);_([$TOP] * (#,##0.00);', precision: 2 }
    , trl: { code: "TRL", symbols: "TRL", align: "L", description: "TRL", remarks: "Turkish Liras", format: '_([$TRL] * #,##0.00_);_([$TRL] * (#,##0.00);', precision: 0 }
    , ttd: { code: "TTD", symbols: "TTD", align: "L", description: "TTD", remarks: "Trndad Tobago Dollars", format: '_([$TTD] * #,##0.00_);_([$TTD] * (#,##0.00);', precision: 2 }
    , twd: { code: "TWD", symbols: "TWD", align: "L", description: "TWD", remarks: "New Taiwan Dollars", format: '_([$TWD] * #,##0.00_);_([$TWD] * (#,##0.00);', precision: 2 }
    , tzs: { code: "TZS", symbols: "TZS", align: "L", description: "TZS", remarks: "Tanzanian Shillings", format: '_([$TZS] * #,##0.00_);_([$TZS] * (#,##0.00);', precision: 2 }
    , uah: { code: "UAH", symbols: "UAH", align: "L", description: "UAH", remarks: "Hryvnias", format: '_([$UAH] * #,##0.00_);_([$UAH] * (#,##0.00);', precision: 2 }
    , ugx: { code: "UGX", symbols: "UGX", align: "L", description: "UGX", remarks: "Uganda Shillings", format: '_([$UGX] * #,##0.00_);_([$UGX] * (#,##0.00);', precision: 0 }
    , usd: { code: "USD", symbols: "USD", align: "L", description: "USD", remarks: "US Dollars", format: '_([$USD] * #,##0.00_);_([$USD] * (#,##0.00);', precision: 2 }
    , uzs: { code: "UZS", symbols: "UZS", align: "L", description: "UZS", remarks: "Uzbekistan Sums", format: '_([$UZS] * #,##0.00_);_([$UZS] * (#,##0.00);', precision: 2 }
    , veb: { code: "VEB", symbols: "VEB", align: "L", description: "VEB", remarks: "Bolivars", format: '_([$VEB] * #,##0.00_);_([$VEB] * (#,##0.00);', precision: 2 }
    , vnd: { code: "VND", symbols: "VND", align: "L", description: "VND", remarks: "Dongs", format: '_([$VND] * #,##0.00_);_([$VND] * (#,##0.00);', precision: 2 }
    , vuv: { code: "VUV", symbols: "VUV", align: "L", description: "VUV", remarks: "Vatus", format: '_([$VUV] * #,##0.00_);_([$VUV] * (#,##0.00);', precision: 0 }
    , wst: { code: "WST", symbols: "WST", align: "L", description: "WST", remarks: "Talas", format: '_([$WST] * #,##0.00_);_([$WST] * (#,##0.00);', precision: 2 }
    , xaf: { code: "XAF", symbols: "XAF", align: "L", description: "XAF", remarks: "CFA Franc Beacs", format: '_([$XAF] * #,##0.00_);_([$XAF] * (#,##0.00);', precision: 0 }
    , xcd: { code: "XCD", symbols: "XCD", align: "L", description: "XCD", remarks: "E Caribbean Dollars", format: '_([$XCD] * #,##0.00_);_([$XCD] * (#,##0.00);', precision: 2 }
    , xof: { code: "XOF", symbols: "XOF", align: "L", description: "XOF", remarks: "CFA Franc Bceaos", format: '_([$XOF] * #,##0.00_);_([$XOF] * (#,##0.00);', precision: 0 }
    , xpf: { code: "XPF", symbols: "XPF", align: "L", description: "XPF", remarks: "CFP Francs", format: '_([$XPF] * #,##0.00_);_([$XPF] * (#,##0.00);', precision: 0 }
    , yer: { code: "YER", symbols: "YER", align: "L", description: "YER", remarks: "Yemeni Rials", format: '_([$YER] * #,##0.00_);_([$YER] * (#,##0.00);', precision: 2 }
    , yug: { code: "YUG", symbols: "YUG", align: "L", description: "YUG", remarks: "New Dinars", format: '_([$YUG] * #,##0.00_);_([$YUG] * (#,##0.00);', precision: 2 }
    , yum: { code: "YUM", symbols: "YUM", align: "L", description: "YUM", remarks: "New Dinars", format: '_([$YUM] * #,##0.00_);_([$YUM] * (#,##0.00);', precision: 2 }
    , yun: { code: "YUN", symbols: "YUN", align: "L", description: "YUN", remarks: "Yugoslavian Dinars", format: '_([$YUN] * #,##0.00_);_([$YUN] * (#,##0.00);', precision: 2 }
    , zar: { code: "ZAR", symbols: "ZAR", align: "L", description: "ZAR", remarks: "Rands", format: '_([$ZAR] * #,##0.00_);_([$ZAR] * (#,##0.00);', precision: 2 }
    , zmk: { code: "ZMK", symbols: "ZMK", align: "L", description: "ZMK", remarks: "Kwachas - Zambia", format: '_([$ZMK] * #,##0.00_);_([$ZMK] * (#,##0.00);', precision: 2 }
    , zrz: { code: "ZRZ", symbols: "ZRZ", align: "L", description: "ZRZ", remarks: "Zaires", format: '_([$ZRZ] * #,##0.00_);_([$ZRZ] * (#,##0.00);', precision: 2 }
    , zwd: { code: "ZWD", symbols: "ZWD", align: "L", description: "ZWD", remarks: "Zimbabwe Dollars", format: '_([$ZWD] * #,##0.00_);_([$ZWD] * (#,##0.00);', precision: 2 }


};


$(document).on("mouseover", ".P8Spread", function () {
    $("body").addClass("p8SpreadHover");
}).on("mouseout", ".P8Spread", function () {
    setTimeout(function () {
        $("body").removeClass("p8SpreadHover");
        $(".P8Spread").attr("title", "");
    }, 100);
});;




function p8Spread_IsNull(id) {
    if (id == '' || id == null || id == undefined || typeof id == 'undefined' || typeof variable == 'object') {
        return true;
    }
    else {
        return false;
    }
}

function p8Spread_GetJsonValue(json, object, indexbased) {
    try {
        if (indexbased) {
            var jsonArray = Object.values(json);
            return jsonArray[object];
        } else {
            return json[object];
        }
    } catch (ex) { return ""; }
}


function p8Spread_RowColToCell(col, row, colfixed, rowfixed) {
    var newcell = "";
    try {
        var cellcol = p8_NumberToCell(col + 1)
        newcell = colfixed == true ? "$" : "";
        newcell += cellcol
        newcell += rowfixed == true ? "$" : "";
        newcell += row + 1
    } catch (ex) { }
    return newcell;
}

function p8Spread_CellToRowCol(cellReference) {
    try { cellReference = cellReference.toUpperCase() } catch (ex) { }
    // Match the cell reference pattern
    var match = cellReference.match(/\$?([A-Z]+)\$?(\d+)/);

    if (match) {
        var colStr = match[1];
        var rowStr = match[2];

        // Convert column letters to a numeric value
        var col = 0;
        for (var i = 0; i < colStr.length; i++) {
            col = col * 26 + colStr.charCodeAt(i) - 'A'.charCodeAt(0) + 1;
        }

        // Convert row string to a numeric value
        var row = parseInt(rowStr, 10);

        // Check if row or column is fixed
        var rowFixed = cellReference.indexOf('$') !== -1;
        var colFixed = cellReference.indexOf('$', colStr.length + 1) !== -1;

        // Return the result as an object
        return { row: row - 1, col: col - 1, rowFixed: rowFixed, colFixed: colFixed };
    } else {
        // Invalid cell reference
        return null;
    }
}


P8.SpreadSheet.prototype.JSONUpdateCell = function (col, row, coladd, rowadd, jsonupdatecell) {
    coladd = coladd || 0;
    rowadd = rowadd || 0;
    //var jsonupdatecell = []
    //jsonupdatecell.push({jsonname:"tableevent",cellname:"cell"})
    var len = 0
    try { len = this.Data.length; } catch (ex) { }
    //loop row data
    for (var i = 0; i < len; i++) {
        var item = this.Data[i];
        //loop column data per row data
        var keys = Object.keys(item);
        var len_j = 0
        try { len_j = keys.length; } catch (ex) { }
        for (var j = 0; j < len_j; j++) {
            var key = keys[j];
            var len_k = 0
            //loop json list
            try { len_k = jsonupdatecell.length; } catch (ex) { }
            for (var k = 0; k < len_k; k++) {
                var jsonlist = jsonupdatecell[k]
                var jsonname = p8Spread_GetJsonValue(jsonlist, "jsonname")
                var cellname = p8Spread_GetJsonValue(jsonlist, "cellname")
                var jsondata = p8Spread_GetJsonValue(item[key], jsonname)
                //loop json data
                var len_l = 0
                try { len_l = jsondata.length; } catch (ex) { }
                for (var l = 0; l < len_l; l++) {
                    var data = jsondata[l];
                    var cell = p8Spread_GetJsonValue(data, cellname)
                    if (!p8Spread_IsNull(cell)) {
                        var cellconfig = p8Spread_CellToRowCol(cell);
                        if (rowadd != 0) {
                            //if not fixed
                            if (!cellconfig.rowfixed) {
                                if (cellconfig.row >= row) {
                                    var newcell = p8Spread_RowColToCell((cellconfig.col), (cellconfig.row + rowadd), cellconfig.colfixed, cellconfig.rowfixed)
                                    //update main data to new cell
                                    item[key][jsonname][l][cellname] = newcell
                                }
                            }
                        }
                        if (coladd != 0) {
                            //if not fixed
                            if (!cellconfig.colfixed) {
                                if (cellconfig.col >= col) {
                                    var newcell = p8Spread_RowColToCell((cellconfig.col + coladd), (cellconfig.row), cellconfig.colfixed, cellconfig.rowfixed)
                                    //update main data to new cell
                                    item[key][jsonname][l][cellname] = newcell
                                }
                            }
                        }
                    }
                }
            }
        }
    }

}


P8.SpreadSheet.prototype.GetJSONData = function (c, r, jsonname, withcolrow, c2, r2) {
    var json = [];
    c2 = c2 == undefined ? c : c2;
    r2 = r2 == undefined ? r : r2;
    try {
        var colcell = p8_NumberToCell(parseInt(c) + 1);
        if (c == -247 && r == -247) {
            var len = 0
            try { len = this.Data.length; } catch (ex) { }
            //loop row data
            for (var i = 0; i < len; i++) {
                var item = this.Data[i];
                var keys = Object.keys(item);
                var len_j = 0
                try { len_j = keys.length; } catch (ex) { }
                for (var j = 0; j < len_j; j++) {
                    var key = keys[j];
                    var jsondata = item[key][jsonname];
                    var len_k = 0
                    try { len_k = jsondata.length; } catch (ex) { }
                    for (var k = 0; k < len_k; k++) {
                        var data = jsondata[k]
                        if (!p8Spread_IsNull(data)) {
                            if (withcolrow) {
                                data.col = j;
                                data.row = i;
                            }
                            json.push(data);
                        }
                    }
                }
            }
        } else {
            
            if (jsonname == undefined) {
                for (var row_r = r; row_r <= r2; row_r++) {
                    for (var col_r = c; col_r <= c2; col_r++) {
                        var colcell_r = p8_NumberToCell(parseInt(col_r) + 1);
                        var jsondata = JSON.parse(JSON.stringify(this.Data[row_r][colcell_r]));
                        if (!p8Spread_IsNull(jsondata)) {
                            if (withcolrow) {
                                jsondata.col = col_r;
                                jsondata.colcell = colcell_r;
                                jsondata.row = row_r;
                            }
                            json.push(jsondata);
                        }
                    }
                }
            } else {
                var jsondata = JSON.parse(JSON.stringify(this.Data[r][colcell][jsonname]));
                var len_k = 0
                try { len_k = jsondata.length; } catch (ex) { }
                for (var k = 0; k < len_k; k++) {
                    var data = jsondata[k]
                    if (!p8Spread_IsNull(data)) {
                        if (withcolrow) {
                            data.col = j;
                            data.row = i;
                        }
                        json.push(data);
                    }
                }
            }
        }
    } catch (ex) { }
    return json;
}

P8.SpreadSheet.prototype.SetJSONData = function (c, r, jsonname, data) {
    var colcell = p8_NumberToCell(parseInt(c) + 1);
    this.Data[r][colcell][jsonname] = data;
}

function _sfSpreadAddColumn(obj) {
    // var obj = mSpreadBook.Sheet[0];
    var arry = { value: "", formula: "", Config: [] };
    return arry;
}
function _sfSpreadColumnConfigUpdate(obj) {
    var len = 0;
    try { len = obj.length; } catch (ex) { }
    for (var i = 0; i < len; i++) {
        var ColumName = p8_NumberToCell(i + 1);
        obj[i].ColumName = ColumName
        obj[i].name = ColumName
    }
    return obj;
}

function _sfSpreadInsertColumnAdjustConfig(obj, startindex) {

    obj.ColumnConfig.splice(startindex, 0, _sfDefaultSettingsColumn());
    obj.ColumnConfig[startindex].width = def_Width;
    obj.ColumnConfig[startindex].ColumnWidth = def_Width + "";

    obj.ColumnConfig[startindex].config = {};
    obj.ColumnConfig[startindex].dataType = "text"

    obj.ColumnConfig = _sfSpreadColumnConfigUpdate(obj.ColumnConfig);

}


P8.SpreadSheet.prototype.ColumnAdd = function (atbegin) {
    var index = 0;
    if (atbegin) {
        index = 0;
    } else {
        index = this.GetMaxCol() - 1;
    }
    this.ColumnInsert(index, true, true);

    try {
        var jsonupdatecell = func_ColumnAdd(index);
        if (jsonupdatecell.length > 0) {
            this.JSONUpdateCell(index, -1, 1, 0, jsonupdatecell)
        }
    } catch (ex) { }


    this.ScrollActive = true;
    this.RenderNoEvent();
    return index;
}


P8.SpreadSheet.prototype.ColumnInsert = function (index, isright, norender) {

    if (isright == undefined) isright = true;

    //if ((index < this.FreezeRow && isright == false)
    //    ||
    //    (index < this.FreezeRow && isright == true)
    //    ) {
    //    try {
    //        ToastMessage("Insert Column is Invalid for Freeze Panes");
    //    } catch (err) {
    //        console.log("Insert Column is Invalid for Freeze Panes");
    //    }
    //    return false;
    //}
    var col = index;
    if (isright) {
        col = col + 1;
    }
    var len = 0
    try { len = this.Data.length; } catch (ex) { }
    for (var i = 0; i < len; i++) {
        var item = this.Data[i];
        //var item = this.Data[0];
        var keys = Object.keys(item);
        var itemnew = [];
        var itemstd = [];
        //Insert item to new item
        for (var j = 0; j < keys.length; j++) {
            var key = keys[j];
            if (key.includes("aag")) {
                itemstd.push({ [key]: item[key] });
            } else {
                itemnew.push(item[key]);
            }
        }
        // get default data
        var arry = _sfSpreadAddColumn(this);
        itemnew.splice(col, 0, arry);

        //Update index to alphabet
        var NewData = {}
        Object.keys(itemnew).forEach((key, j) => {
            var newKey = p8_NumberToCell(j + 1);
            NewData[newKey] = itemnew[key];
        });
        //add std
        for (var j = 0; j < itemstd.length; j++) {
            var key = itemstd[j];
            //console.log(key)
            for (var subkey in key) {
                NewData[subkey] = key[subkey];
            }
        }
        this.Data[i] = NewData
    }

    _sfSpreadInsertColumnAdjustConfig(this, col);
    _sfSpreadAdjustMergeList(this, col,0, 1);

    this.UpdateFormula(col, Spread_ALLROW, 1, 0);

    try {
        var coladd = 1;
        try {
            var jsonupdatecell = func_ColumnInsert_Menuitem(index, isright, coladd, this.canvasID, this.CellIndexes.Row, this.CellIndexes.Col);
        } catch (err) {
            try {
                var jsonupdatecell = func_ColumnInsert(index, isright, coladd, this.canvasID, this.CellIndexes.Row, this.CellIndexes.Col);
            } catch (err) { }
        }
        if (jsonupdatecell.length > 0) {
            this.JSONUpdateCell(col, -1, 1, 0, jsonupdatecell)
        }
    } catch (ex) { }


    if (norender == undefined) norender = false;

    if (norender == false) {
        this.ScrollActive = true;
        this.RenderNoEvent();
    }
    return index;
}


function _sfSpreadDeleteColumnAdjustConfig(obj, startindex) {
    obj.ColumnConfig.splice(startindex, 1);
    obj.ColumnConfig = _sfSpreadColumnConfigUpdate(obj.ColumnConfig);
}

P8.SpreadSheet.prototype.ColumnDelete = function (col) {
    //if (index == undefined) index = obj.CellIndexes.Row;

    if (col == undefined) { }
    else {
        var len = 0
        try { len = this.Data.length; } catch (ex) { }
        for (var i = 0; i < len; i++) {
            var item = this.Data[i];
            //var item = this.Data[0];
            var keys = Object.keys(item);
            var itemnew = [];
            var itemstd = [];
            //Insert item to new item
            for (var j = 0; j < keys.length; j++) {
                if (j == col) { continue; }
                var key = keys[j];
                if (key.includes("aag")) {
                    itemstd.push({ [key]: item[key] });
                } else {
                    itemnew.push(item[key]);
                }
            }
            //Update index to alphabet
            var NewData = {}
            Object.keys(itemnew).forEach((key, j) => {
                var newKey = p8_NumberToCell(j + 1);
                NewData[newKey] = itemnew[key];
            });
            //add std
            for (var j = 0; j < itemstd.length; j++) {
                var key = itemstd[j];
                //console.log(key)
                for (var subkey in key) {
                    NewData[subkey] = key[subkey];
                }
            }

            this.Data[i] = NewData
        }

        _sfSpreadDeleteColumnAdjustConfig(this, col);
        _sfSpreadAdjustMergeList(this, col,0, -1);
        this.UpdateFormula(col, Spread_ALLROW, -1, 0);
      
        try {
            var colminus = 1;
            try {
                var jsonupdatecell = func_ColumnDelete_Menuitem(col, colminus, this.canvasID, this.CellIndexes.Row, this.CellIndexes.Col);
            } catch (err) {
                try {
                    var jsonupdatecell = func_ColumnDelete(col, colminus, this.canvasID, this.CellIndexes.Row, this.CellIndexes.Col);
                } catch (err) { }
            }
            if (jsonupdatecell.length > 0) {
                this.JSONUpdateCell(col, -1, -1, 0, jsonupdatecell)
            }
        } catch (ex) { }

        this.ScrollActive = true;
        this.RenderNoEvent();
    }
    return col;
}


P8.SpreadSheet.prototype.ColumnInsertShift = function (col, row, isright, norender) {

    if (isright == undefined) isright = true;

    //if ((col < this.FreezeRow && isright == false)
    //    ||
    //    (col < this.FreezeRow && isright == true)
    //    ) {
    //    try {
    //        ToastMessage("Insert Column is Invalid for Freeze Panes");
    //    } catch (err) {
    //        console.log("Insert Column is Invalid for Freeze Panes");
    //    }
    //    return false;
    //}
    if (isright) {
        col = col + 1;
    }
    var mergeListTemp = []
    try {
        for (var i = this.mergeList.length - 1; i >= 0; i--) {
            var mcol = this.mergeList[i].col;
            var mcol2 = this.mergeList[i].col2;
            var mrow = this.mergeList[i].row;
            var mrow2 = this.mergeList[i].row2;
            if (mcol >= col) {
                if (mrow <= row && mrow2 >= row) {
                    if (mrow == mrow2) {
                        mergeListTemp.push({ col: mcol + 1, row: mrow, col2: mcol2 + 1, row2: mrow2 })
                    }
                    this.SetUnmerge(mcol, mrow)
                }
            }
        }
    } catch (err) { }
    var item = this.Data[row];
    //var item = this.Data[0];
    var keys = Object.keys(item);
    var itemnew = [];
    var itemstd = [];
    //Insert item to new item
    for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        if (key.includes("aag")) {
            itemstd.push({ [key]: item[key] });
        } else {
            itemnew.push(item[key]);
        }
    }
    // get default data
    var arry = _sfSpreadAddColumn(this);
    itemnew.splice(col, 0, arry);
    //Update index to alphabet
    var NewData = {};
    var lenkey = 0
    try { lenkey = itemnew.length; } catch (ex) { }
    var hasDataInLastCell = false;
    Object.keys(itemnew).forEach((key, j) => {
        var newKey = p8_NumberToCell(j + 1);
        var valuekey = itemnew[key];

        //when no data in last column cell, no new column insertion
        if ((j + 1) == lenkey) {
            for (var key in valuekey) {
                if (valuekey.hasOwnProperty(key)) {
                    var val = valuekey[key];
                    if (val != "") {
                        hasDataInLastCell = true;
                    }
                }
            }
            if (hasDataInLastCell) {
                NewData[newKey] = valuekey;
            }
        } else {
            NewData[newKey] = valuekey;
        }
    });
    //add std
    for (var j = 0; j < itemstd.length; j++) {
        var key = itemstd[j];
        //console.log(key)
        for (var subkey in key) {
            NewData[subkey] = key[subkey];
        }
    }
    if (hasDataInLastCell) {
        this.ColumnInsert((lenkey - 2), true, false);
    }
    this.Data[row] = NewData


    //_sfSpreadInsertColumnAdjustConfig(this, index);

    this.UpdateFormula(col, row, 1, 0);

    try {
        for (var i = 0; i < mergeListTemp.length; i++) {
            var mcol = mergeListTemp[i].col;
            var mcol2 = mergeListTemp[i].col2;
            var mrow = mergeListTemp[i].row;
            var mrow2 = mergeListTemp[i].row2;
            this.SetMerge(mcol, mrow, mcol2, mrow2);
        }
    } catch (err) { }

    if (norender == undefined) norender = false;

    if (norender == false) {
        this.ScrollActive = true;
        this.RenderNoEvent();
    }
    return { col: col, row: row };
}


P8.SpreadSheet.prototype.ColumnDeleteShift = function (col, row) {
    //if (index == undefined) index = obj.CellIndexes.Row;

    if (col == undefined) { }
    else {
        //_sfJsonDelete(this.Data, index);
        //_sfSpreadDeleteRowAdjustConfig(this, index);
        var mergeListTemp = []
        try {
            for (var i = this.mergeList.length - 1; i >= 0; i--) {
                var mcol = this.mergeList[i].col;
                var mcol2 = this.mergeList[i].col2;
                var mrow = this.mergeList[i].row;
                var mrow2 = this.mergeList[i].row2;
                if (mcol >= col) {
                    if (mrow <= row && mrow2 >= row) {
                        if (mrow == mrow2) {
                            mergeListTemp.push({ col: mcol - 1, row: mrow, col2: mcol2 - 1, row2: mrow2 })
                        }
                        this.SetUnmerge(mcol, mrow)
                    }
                }
            }
        } catch (err) { }

        var item = this.Data[row];
        //var item = this.Data[0];
        var keys = Object.keys(item);
        var itemnew = [];
        var itemstd = [];
        //Insert item to new item
        for (var j = 0; j < keys.length; j++) {
            if (j == col) { continue; }
            var key = keys[j];
            if (key.includes("aag")) {
                itemstd.push({ [key]: item[key] });
            } else {
                itemnew.push(item[key]);
            }
        }

        var arry = _sfSpreadAddColumn(this);
        itemnew.push(arry);

        //Update index to alphabet
        var NewData = {}
        Object.keys(itemnew).forEach((key, j) => {
            var newKey = p8_NumberToCell(j + 1);
            NewData[newKey] = itemnew[key];
        });
        //add std
        for (var j = 0; j < itemstd.length; j++) {
            var key = itemstd[j];
            //console.log(key)
            for (var subkey in key) {
                NewData[subkey] = key[subkey];
            }
        }

        this.Data[row] = NewData
  
        this.UpdateFormula(col, row, -1, 0);

        try {
            for (var i = 0; i < mergeListTemp.length; i++) {
                var mcol = mergeListTemp[i].col;
                var mcol2 = mergeListTemp[i].col2;
                var mrow = mergeListTemp[i].row;
                var mrow2 = mergeListTemp[i].row2;
                this.SetMerge(mcol, mrow, mcol2, mrow2);
            }
        } catch (err) { }
     
        //_sfSpreadDeleteColumnAdjustConfig(this, col);

        this.ScrollActive = true;
        this.RenderNoEvent();
    }
    return { col: col, row: row };
}


P8.SpreadSheet.prototype.RowInsertShift = function (col, row, isdown, col2, rowadd, norender, forceinsert) {

    if (isdown == undefined) isdown = true;
    if (forceinsert == undefined) forceinsert = false;

    col2 = col2 == undefined ? col : col2;
    rowadd = rowadd == undefined ? 1 : rowadd;
    var row2 = row + rowadd - 1;

    //if (isdown == true) {
    var mergeListTemp = []
    try {
        for (var i = this.mergeList.length - 1; i >= 0; i--) {
            var mcol = this.mergeList[i].col;
            var mcol2 = this.mergeList[i].col2;
            var mrow = this.mergeList[i].row;
            var mrow2 = this.mergeList[i].row2;
            if (mrow >= row) {
                if (mcol <= col && mcol2 >= col) {
                    if (mcol == mcol2 || forceinsert == true) {
                        mergeListTemp.push({ col: mcol, row: mrow + rowadd, col2: mcol2, row2: mrow2 + rowadd })
                    }
                    this.SetUnmerge(mcol, mrow)
                }
            }
        }
    } catch (err) { }
    //}

    var prevData = this.JSONCopy(this.Data);
    var currentData = this.JSONCopy(this.Data);
    var hasInsertAlready = false;
    var len = 0
    try { len = currentData.length; } catch (ex) { }
    //var addrow = row2 - row;
    var prev_i = row;
    var rowwaddcnt = 0;
    for (var i = row; i < currentData.length; i++) {
        currentData = this.JSONCopy(currentData);
        rowwaddcnt += 1;
        //new data 
        if (i >= row && i <= row2) {
        } else {
            prev_i += 1;
        }
        var hasDataInLastCell = false;

        var item = currentData[i];;
        //console.log(objectkey)
        //console.log(itemnew)
        for (var j = col; j <= col2; j++) {
            var objectkey = Object.keys(item)[j];
            var itemnew = item[objectkey]
            if (i == (len - 1)) {
                if (!hasInsertAlready) {
                    if (forceinsert) {
                        hasInsertAlready = true;
                        var rowaddremaining = rowadd//((rowadd + (currentData.length - row))  + 1);
                        prev_i = row;
                        i = row2;
                        if (rowaddremaining > 0) {
                            //this.RowAdd(false, (rowadd - rowwaddcnt));
                            arry = _sfSpreadAddRow(this);
                            for (var rowadd_i = 0; rowadd_i < rowaddremaining; rowadd_i++) {
                                currentData.push(arry);
                            }
                        }
                        //prevData = this.JSONCopy(this.Data);
                    } else {
                        for (var key in itemnew) {
                            if (itemnew.hasOwnProperty(key)) {
                                var val = itemnew[key];
                                if (val != "") {
                                    hasDataInLastCell = true;
                                }
                            }
                        }
                        if (hasDataInLastCell) {
                            hasInsertAlready = true;
                            this.RowAdd(false, 1);
                        }
                    }
                }
            }

            //new data 
            if (i >= row && i <= row2) {
                previtem = _sfSpreadAddColumn(this);
                currentData[i][objectkey] = previtem;
            }
            else {
                var previtem = prevData[prev_i - 1][objectkey];
                currentData[i][objectkey] = previtem;
            }

        }


    }
    this.Data = this.JSONCopy(currentData);

    //}
    if (row == len && !hasDataInLastCell) {
        this.RowAdd(false, 1);
    }
    //_sfSpreadInsertColumnAdjustConfig(this, index);
    for (var j = col; j <= col2; j++) {
        this.UpdateFormula(j, row, 0, rowadd);
    }
    try {
        for (var i = 0; i < mergeListTemp.length; i++) {
            var mcol = mergeListTemp[i].col;
            var mcol2 = mergeListTemp[i].col2;
            var mrow = mergeListTemp[i].row;
            var mrow2 = mergeListTemp[i].row2;
            this.SetMerge(mcol, mrow, mcol2, mrow2);
        }
    } catch (err) { }
    if (norender == undefined) norender = false;

    if (norender == false) {
        this.ScrollActive = true;
        this.RenderNoEvent();
    }
    return { col: col, row: row };
}


P8.SpreadSheet.prototype.RowDeleteShift = function (col, row, norender) {
    //if (index == undefined) index = obj.CellIndexes.Row;

    if (col == undefined) { }
    else {
        var mergeListTemp = []
        try {
            for (var i = this.mergeList.length - 1; i >= 0; i--) {
                var mcol = this.mergeList[i].col;
                var mcol2 = this.mergeList[i].col2;
                var mrow = this.mergeList[i].row;
                var mrow2 = this.mergeList[i].row2;
                if (mrow >= row) {
                    if (mcol <= col && mcol2 >= col) {
                        if (mcol == mcol2) {
                            mergeListTemp.push({ col: mcol, row: mrow - 1, col2: mcol2, row2: mrow2 - 1 })
                        }
                        this.SetUnmerge(mcol, mrow)
                    }
                }
            }
        } catch (err) { }

        var prevobjectkey = "";
        var previtemnew = {};
        var len = 0
        try { len = this.Data.length; } catch (ex) { }
        //var len =5;
        for (var i = len - 1; i >= row; i--) {
            var item = this.Data[i];
            //console.log(objectkey)
            //console.log(itemnew)
            var objectkey = Object.keys(item)[col];
            var itemnew = item[objectkey]
            //new data 
            if (i == (len - 1)) {
                prevobjectkey = objectkey;
                previtemnew = _sfSpreadAddColumn(this);
            }
            item[prevobjectkey] = previtemnew
            prevobjectkey = objectkey;
            previtemnew = itemnew;
        }

        //_sfSpreadInsertColumnAdjustConfig(this, index);
        this.UpdateFormula(col, row, 0, -1);

        try {
            for (var i = 0; i < mergeListTemp.length; i++) {
                var mcol = mergeListTemp[i].col;
                var mcol2 = mergeListTemp[i].col2;
                var mrow = mergeListTemp[i].row;
                var mrow2 = mergeListTemp[i].row2;
                this.SetMerge(mcol, mrow, mcol2, mrow2);
            }
        } catch (err) { }

        if (norender == undefined) norender = false;

        if (norender == false) {
            this.ScrollActive = true;
            this.RenderNoEvent();
        }
    }
    return { col: col, row: row };
}

//P8.SpreadSheet.prototype.RowDeleteShift = function (col, row, isdown, col2, rowminus, norender) {
//    //if (index == undefined) index = obj.CellIndexes.Row;
//    rowminus = rowminus == undefined ? 1 : rowminus;
//    row2 = (row + rowminus + 1);
//    //row = (row2 - rowminus + 1)
//    if (col == undefined) { }
//    else {
//        var prevobjectkey ="";
//        var previtemnew = {};
//        var prevData = this.JSONCopy(this.Data);
//        var currentData = this.JSONCopy(this.Data);
//        var prev_i = row2;
//        var len = 0
//        try { len = currentData.length - 1;}catch(ex){}
//        //try { len = row2;}catch(ex){}
//        //var len =5;
//        for (var i = len; i >= row; i--){
//            //new data 
//            if (i >= row && i <= row2) {
//            } else {
//                prev_i -= 1;
//            }
//            var item = currentData[i];
//            for (var j = col; j <= col2; j++) {
//                var objectkey = Object.keys(item)[j];
//                var itemnew = item[objectkey]
//                //new data 
//                if (i > row && i < row2) {
//                    prevobjectkey = objectkey;
//                    previtem = _sfSpreadAddColumn(this);
//                    currentData[i][objectkey] = previtem;
//                } else {
//                    if (i >= (len - rowminus)) {
//                        prevobjectkey = objectkey;
//                        previtem = _sfSpreadAddColumn(this);
//                        currentData[i][objectkey] = previtem;
//                    } else {
//                        //var previtem = prevData[i+1][objectkey];
//                        //currentData[i][objectkey] = previtem;
//                    }
//                }
//            }
//        }
//        var r_run = row+1;
//        for (var i = (row2 + 1); i < prevData.length; i++) {
//            r_run += 1;
//            var item = currentData[r_run];
//            for (var j = col; j <= col2; j++) {
//                var objectkey = Object.keys(item)[j];
//                var previtem = prevData[i][objectkey];
//                currentData[r_run][objectkey] = previtem;
//               }
//        }

//        this.Data = this.JSONCopy(currentData);
//        //_sfSpreadInsertColumnAdjustConfig(this, index);
//        this.UpdateFormula(col, row, 0, (rowminus*-1));

//        if (norender == undefined) norender = false;

//        if (norender == false) {
//            this.ScrollActive = true;
//            this.RenderNoEvent();
//        }
//    }
//    return {col:col,row:row};
//}

//karl 01/31/2024 end

//karl 02/22/2024 start

// Function to separate the alphabet and number parts of a cell reference
function _sfseparateAlphabetAndNumber(cellReference) {
    // Find the index where the first numeric character appears
    var index = cellReference.search(/\d/);
    // Separate the alphabet and number based on the index
    var alphabetPart = cellReference.slice(0, index);
    var numberPart = cellReference.slice(index);

    return [alphabetPart, numberPart];
}

// Function to convert a column label to a number (e.g., 'A' -> 1, 'Z' -> 26, 'AA' -> 27)
function columnLabelToNumber(label) {
    let result = 0;
    for (let i = 0; i < label.length; i++) {
        result = result * 26 + (label.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
    }
    return result;
}

// Function to convert a number to a column label (e.g., 1 -> 'A', 26 -> 'Z', 27 -> 'AA')
function numberToColumnLabel(number) {
    let result = '';
    while (number > 0) {
        let remainder = (number - 1) % 26;
        result = String.fromCharCode('A'.charCodeAt(0) + remainder) + result;
        number = Math.floor((number - 1) / 26);
    }
    return result;
}

// Function to list all cells between two cell references
function _sflistCellsBetween(cell) {
    var cellrange = cell.split(':');
    var cellfrom = cellrange[0];
    var cellto = cellrange[1] == undefined ? cellrange[0] : cellrange[1];

    var fromArray = _sfseparateAlphabetAndNumber(cellfrom);
    var from_alphabet = fromArray[0];
    var from_number = parseInt(fromArray[1]);

    var toArray = _sfseparateAlphabetAndNumber(cellto);
    var to_alphabet = toArray[0];
    var to_number = parseInt(toArray[1]);

    var from_col = columnLabelToNumber(from_alphabet);
    var to_col = columnLabelToNumber(to_alphabet);

    var cellList = [];
    for (var row = from_number; row <= to_number; row++) {
        for (var col = from_col; col <= to_col; col++) {
            cellList.push(numberToColumnLabel(col) + row);
        }
    }
    return cellList;
}

// Function to list all cells in the given range(s)
function p8Spread_listCells(cell) {
    try { cell = cell.toUpperCase() } catch (ex) { }
    var celllist = cell.split(",");
    var cellFinalList = [];
    for (var i = 0; i < celllist.length; i++) {
        var cell = celllist[i];
        if (cell.includes(":")) {
            var celllist_t = _sflistCellsBetween(cell);
            cellFinalList = [...cellFinalList, ...celllist_t];
        } else {
            cellFinalList.push(cell);
        }
    }
    return cellFinalList;
}


P8.SpreadSheet.prototype.SetSelectedCell = function (cell) {
    try {
        try { cell = cell.toUpperCase() } catch (ex) { }
        //var cell = "B1:B2"
        var celllist = cell.split(',');
        var len = 0
        try { len = celllist.length; } catch (ex) { }
        for (var i = 0; i < len; i++) {
            var cell = celllist[i];
            var cellrange = cell.split(':');
            var cellfrom = cellrange[0];
            var cellto = cellrange[1] == undefined ? cellrange[0] : cellrange[1];

            var col_temp = p8Spread_CellToRowCol(cellfrom).col;
            var row_temp = p8Spread_CellToRowCol(cellfrom).row;
            var col2_temp = p8Spread_CellToRowCol(cellto).col;
            var row2_temp = p8Spread_CellToRowCol(cellto).row;

            var iscolreverse = col_temp > col2_temp;
            var isrowreverse = col_temp == col2_temp && row_temp > row2_temp;
            if (iscolreverse || isrowreverse) {
                var col = col2_temp;
                var row = row2_temp;
                var col2 = col_temp;
                var row2 = row_temp;
            } else {
                var col = col_temp;
                var row = row_temp;
                var col2 = col2_temp;
                var row2 = row2_temp;
            }
            var option = {
                col: col,
                row: row,
                col2: col2,
                row2: row2,
            }
            this.SetSelectedIndexes(option)
        }
        this.ScrollActive = true;
        this.RenderNoEvent();
    } catch (ex) { }
    return this.GetSelectedIndexes();
};

P8.SpreadSheet.prototype.GetSelectedCell = function () {
    var celllist = "";
    try {
        var item = this.GetSelectedIndexes();
        var row = p8Spread_GetJsonValue(item, "row");
        var row2 = p8Spread_GetJsonValue(item, "row2");
        var col = p8Spread_GetJsonValue(item, "col");
        var col2 = p8Spread_GetJsonValue(item, "col2");
        var cell = p8_NumberToCell(col + 1) + (row + 1);
        cell += ":" + p8_NumberToCell(col2 + 1) + (row2 + 1);
        celllist = p8Spread_listCells(cell);
    } catch (ex) { }
    return celllist
}


P8.SpreadSheet.prototype.UpdateFormula = function (col, row, coladd, rowadd, col2add, row2add) {
    col2add = col2add || coladd;
    row2add = row2add || rowadd;
    //if (index == undefined) index = obj.CellIndexes.Row;
    var _this = this.JSONCopy(this.Data);
    var len = 0
    try { len = _this.length; } catch (ex) { }
    for (var i = 0; i < len; i++) {
        var item = _this[i];
        //var item = this.Data[0];
        var keys = Object.keys(item);
        //Loop column (per row)
        for (var j = 0; j < keys.length; j++) {

            var key = keys[j];
            if (key.includes("aag")) {

            } else {
                //get formula
                var formula = item[key].formula;
                if (!p8Spread_IsNull(formula)) {
                    var rowtemp = row;
                    if (row == Spread_ALLROW) { rowtemp = i; }
                    var formulanew = _sfAdjustFormula(col, rowtemp, formula, coladd, rowadd, col, row);
                    //this.SetFormula(col, i, formula);
                    this.Data[i][key].formula = formulanew;
                }
                ////get config
                //var itemconfig = item[key].Config;
                ////loop config to update data
                //for (var k = 0; k < itemconfig.length; k++) {
                //    var id = p8Spread_GetJsonValue(itemconfig[k], "id")
                //    var itemconfigdata = p8Spread_GetJsonValue(itemconfig[k], "element")
                //    var value = p8Spread_GetJsonValue(itemconfigdata, "value")
                //    if (id == "table") {
                //        var colconfig = value[0].col;
                //        var col2config = value[0].col2;
                //        var rowconfig = value[0].row;
                //        var row2config = value[0].row2;

                //        ////cell after
                //        if (coladd != 0) {
                //            if (col <= colconfig) {
                //                this.Data[i][key].Config[k].element.value[0].col = colconfig + coladd;
                //            }
                //            if (col <= col2config) {
                //                this.Data[i][key].Config[k].element.value[0].col2 = col2config + col2add;
                //            }
                //        }
                //        if (rowadd != 0) {
                //            if (row <= rowconfig) {
                //                this.Data[i][key].Config[k].element.value[0].row = value[0].row + rowadd;
                //            }
                //        }
                //        if (col2add != 0) {
                //            if (col <= col2config) {
                //                this.Data[i][key].Config[k].element.value[0].col2 = col2config + col2add;
                //            }
                //        }
                //        if (row2add != 0) {
                //            if (row <= row2config) {
                //                this.Data[i][key].Config[k].element.value[0].row2 = value[0].row2 + row2add;
                //            }
                //        }
                //    }
                //}
            }
        }
    }


    this.ScrollActive = true;
    this.RenderNoEvent();
    return col;
}

P8.SpreadSheet.prototype.DeleteConfigData = function (col, row, data) {
    try {
        var col_a = p8_NumberToCell(col + 1);
        var jsonconfig = this.Data[row][col_a].Config

        for (var i = jsonconfig.length - 1; i >= 0; i--) {
            var item = jsonconfig[i];
            var id = p8Spread_GetJsonValue(item, "id")
            if (id === data || data == undefined) {
                jsonconfig.splice(i, 1);
                if (id == "merge") {
                    try {
                        var itemmerge = this.mergeList;
                        for (var l = itemmerge.length - 1; l >= 0; l--) {
                            var itemm = itemmerge[l];
                            var colm = p8Spread_GetJsonValue(itemm, "col");
                            var rowm = p8Spread_GetJsonValue(itemm, "row");
                            if (colm == col && rowm == row) {
                                itemmerge.splice(l, 1);
                            }
                        }
                    } catch (ex) { }
                } else if (id == "backgroundColor") {
                    this.SetBackground(col, row, this.DefaultSettings.backgroundColor)
                }
            }
        }
    } catch (ex) { }
}

P8.SpreadSheet.prototype.GetConfigData = function (col, row, data) { //,col2,row2
    var jsondata = [];
    try {
        if (col == -247) {
            var jsontemp = []
            var datarow = this.Data[row];
            var objkey = Object.keys(datarow);
            for (var i = 0; i < objkey.length; i++) {
                try {
                    if (!p8Spread_IsNull(data)) {
                        jsontemp = nwJson(datarow[objkey[i]].Config, "id", data, false);
                        jsontemp = jsontemp[0].element.value;
                    } else {
                        jsontemp = datarow[objkey[i]].Config;
                    }
                    if (jsontemp.length > 0) {
                        jsondata.push({ col: i, row: row, data: jsontemp });
                    }
                } catch (ex) { }
            }
        } else if (row == -247) {
            var colcell = p8_NumberToCell(parseInt(col) + 1);
            var jsontemp = []
            var datarow_all = this.Data;
            for (var i = 0; i < datarow_all.length; i++) {
                var datarow = datarow_all[i];
                try {
                    if (!p8Spread_IsNull(data)) {
                        jsontemp = nwJson(datarow[colcell].Config, "id", data, false);
                        jsontemp = jsontemp[0].element.value;
                    } else {
                        jsontemp = datarow[colcell].Config;
                    }
                    if (jsontemp.length > 0) {
                        jsondata.push({ col: col, row: i, data: jsontemp });
                    }
                } catch (ex) { }
            }
        } else {
            var colcell = p8_NumberToCell(parseInt(col) + 1);
            if (!p8Spread_IsNull(data)) {
                jsondata = nwJson(this.Data[row][colcell].Config, "id", data, false);
                jsondata = jsondata[0].element.value;
            } else {
                jsondata = this.Data[row][colcell].Config;
            }
        }
    } catch (ex) { }
    return jsondata;
}
P8.SpreadSheet.prototype.SetConfigData = function (col, row, data, id) {
    var colcell = p8_NumberToCell(parseInt(col) + 1);
    var Data = this.JSONCopy(this.Data);
    if (!p8Spread_IsNull(id)) {
        Data[row][colcell].Config[id] = data;
    } else {
        Data[row][colcell].Config = data;
    }
    this.Data = Data;
}
P8.SpreadSheet.prototype.SetUnmerge = function (col, row, col2, row2) {
    try {
        var item = this.GetSelectedIndexes();
        if (col == undefined) { col = p8Spread_GetJsonValue(item, "col"); }
        if (col2 == undefined) { col2 = p8Spread_GetJsonValue(item, "col2"); }
        if (row == undefined) { row = p8Spread_GetJsonValue(item, "row"); }
        if (row2 == undefined) { row2 = p8Spread_GetJsonValue(item, "row2"); }
        if (col > col2) { col2 = col }
        if (row > row2) { row2 = row }
        var len = 0
        try { len = jsonconfig.length; } catch (ex) { }
        for (var m = row; m <= row2; m++) {

            var col_a = p8_NumberToCell(col + 1);
            var jsonconfig = this.Data[m][col_a].Config
            var len = 0
            try { len = jsonconfig.length; } catch (ex) { }
            for (var i = 0; i < len; i++) {
                var itemconfig = jsonconfig[i]
                var id = p8Spread_GetJsonValue(itemconfig, "id")
                if (id == "merge") {
                    var value = itemconfig.element.value[0];
                    var itemcol = p8Spread_GetJsonValue(value, "col")
                    var itemcol2 = p8Spread_GetJsonValue(value, "col2")
                    var itemrow = p8Spread_GetJsonValue(value, "row")
                    var itemrow2 = p8Spread_GetJsonValue(value, "row2")
                    try {
                        var mergeListTemp = nwJson(this.mergeList, "col", col, false)
                        mergeListTemp = nwJson(mergeListTemp, "row", row, false)
                        if (mergeListTemp[0].col2 > itemcol2) {
                            itemrow2 = mergeListTemp[0].col2;
                        }
                        if (mergeListTemp[0].row2 > itemrow2) {
                            itemrow2 = mergeListTemp[0].row2;
                        } 
                    } catch (ex) { }
                    for (var k = itemrow; k <= itemrow2; k++) {
                        for (var j = itemcol; j <= itemcol2; j++) {
                            this.DeleteConfigData(j, k, "merge");
                            //clear value
                            if (col != j && row != k) {
                                this.SetText(j, k, "");
                            }
                        }
                    }
                }
            }
        }
        //if (itemcol == undefined) {
        //    var colu = col;
        //    var col2u = col2;
        //    var rowu = row;
        //    var row2u = row2;
        //} else {
        //    var colu = col > itemcol ? itemcol : col;
        //    var col2u = col2 > itemcol2 || itemcol2 == undefined ? col2 : itemcol2;
        //    var rowu = row > itemrow2 ? itemrow : row;
        //    var row2u = row2 > itemrow2 ? row2 : itemrow2;
        //}
        //var option = {
        //    col: colu,
        //    col2: col2u,
        //    row: rowu,
        //    row2: row2u,
        //}
        //this.SetSelectedIndexes(option)

        this.ScrollActive = true;
        this.RenderNoEvent();
    } catch (ex) { }
}

P8.SpreadSheet.prototype.SetCrossMerge = function (col, row, col2, row2) {
    try {
        var item = this.GetSelectedIndexes();
        if (col == undefined) { col = p8Spread_GetJsonValue(item, "col"); }
        if (col2 == undefined) { col2 = p8Spread_GetJsonValue(item, "col2"); }
        if (row == undefined) { row = p8Spread_GetJsonValue(item, "row"); }
        if (row2 == undefined) { row2 = p8Spread_GetJsonValue(item, "row2"); }

        for (var i = row; i <= row2; i++) {
            this.SetMerge(col, i, col2, i, true);
        }
        this.ScrollActive = true;
        this.RenderNoEvent();
    } catch (ex) { }
}

P8.SpreadSheet.prototype.AutoSum = function (col, row, data, col2, row2) {
    //data - sum,average,count numbers,max,min
    try {

        var item = this.GetSelectedIndexes();
        if (col == undefined) { col = p8Spread_GetJsonValue(item, "col"); }
        if (col2 == undefined) { col2 = p8Spread_GetJsonValue(item, "col2"); }
        if (row == undefined) { row = p8Spread_GetJsonValue(item, "row"); }
        if (row2 == undefined) { row2 = p8Spread_GetJsonValue(item, "row2"); }

        var total = 0;
        var fromcell = p8_NumberToCell(col + 1) + (row + 1);
        var tocell = p8_NumberToCell(col2 + 1) + (row2 + 1);
        if (fromcell == tocell) {
            tocell = "";
        }
        var valuex = fromcell;
        if (!p8Spread_IsNull(tocell)) {
            valuex += ":" + tocell;
        }

        data = data || "SUM";
        valuex = "=" + data.toUpperCase() + "(" + valuex + ")"
        var coldiff = col2 - col;
        var rowdiff = row2 - row;
        if (coldiff > rowdiff) {
            var colu = col2 + 1;
            var rowu = row2;
        } else {
            var colu = col2;
            var rowu = row2 + 1;
        }
        this.SetFormula(colu, rowu, valuex);

        this.ScrollActive = true;
        this.RenderNoEvent();
    } catch (ex) { }
}
function _sfAdjustFormula(col, row, formula, colAdd, rowAdd, currentCol, currentRow) {
    // Regular expression to match cell references in the formula (e.g., A1, B2)
    var cellReferenceRegex = /[A-Z]+\d+/g;

    // Function to adjust cell references based on colAdd and rowAdd
    function adjustCellReference(currentData) {
        // Extract the column part of the cell reference (e.g., A, B)

        var cellcol = p8Spread_CellToRowCol(currentData).col;
        var cellrow = p8Spread_CellToRowCol(currentData).row;

        if (colAdd != 0) {
            if (cellcol >= col) {
                if (cellrow == currentRow || currentRow == Spread_ALLROW) {
                    cellcol = cellcol + colAdd;
                }
            }
        }
        if (rowAdd != 0) {
            if (cellrow >= row) {
                if (cellcol == currentCol || currentCol == Spread_ALLCOL) {
                    cellrow = cellrow + rowAdd;
                }
            }
        }
        if (cellrow < 0) {
            cellrow = 0;
        }
        if (cellcol < 0) {
            cellcol = 0;
        }

        var newcell = p8Spread_RowColToCell(cellcol, cellrow)
        // Return the adjusted cell reference
        return newcell;
    }

    // Replace cell references in the formula using the adjustCellReference function
    var adjustedFormula = formula.replace(cellReferenceRegex, adjustCellReference);

    return adjustedFormula;
}


//function _sfAdjustFormula(formula, colAdd, rowAdd) {
//    // Regular expression to match cell references in the formula (e.g., A1, B2)
//    var cellReferenceRegex = /[A-Z]+\d+/g;

//    // Function to adjust cell references based on colAdd and rowAdd
//    function adjustCellReference(currentData) {
//        // Extract the column part of the cell reference (e.g., A, B)

//        var cellcol = p8Spread_CellToRowCol(currentData).col;
//        var cellrow = p8Spread_CellToRowCol(currentData).row;

//        if (colAdd != 0) {
//            if (cellcol >= col) {
//                if (cellrow == currentRow || currentRow == Spread_ALLROW) {
//                    cellcol = cellcol + colAdd;
//                }
//            }
//        }
//        if (rowAdd != 0) {
//            if (cellrow >= row) {
//                if (cellcol == currentCol || currentCol == Spread_ALLCOL) {
//                    cellrow = cellrow + rowAdd;
//                }
//            }
//        }
//        if (cellrow < 0) {
//            cellrow = 0;
//        }
//        if (cellcol < 0) {
//            cellcol = 0;
//        }

//        var newcell = p8Spread_RowColToCell(cellcol, cellrow)
//        // Return the adjusted cell reference
//        return newcell;
//    }

//    // Replace cell references in the formula using the adjustCellReference function
//    var adjustedFormula = formula.replace(cellReferenceRegex, adjustCellReference);

//    return adjustedFormula;
//}

P8.SpreadSheet.prototype.JSONCopy = function (json) {
    return JSON.parse(JSON.stringify(json));
}
P8.SpreadSheet.prototype.JSONRemoveDuplicateRows = function (json) {
    // Create a Set to store unique string representations of the objects
    const seen = new Set();

    // Filter out duplicate rows
    return json.filter(obj => {
        const strRepresentation = JSON.stringify(obj);
        // If the string representation is not seen yet, add it to the Set and keep the row
        if (!seen.has(strRepresentation)) {
            seen.add(strRepresentation);
            return true;
        }
        // If the string representation is already seen, discard the row
        return false;
    });
}


function _sfJSONConvertKeysToLowerCase(json) {
    if (Array.isArray(json)) {
        return json.map(_sfJSONConvertKeysToLowerCase); // Recursively convert keys for each element in the array
    } else if (typeof json === 'object' && json !== null) {
        var newObj = {};

        for (var key in json) {
            if (Object.prototype.hasOwnProperty.call(json, key)) {
                var newKey = key.toLowerCase();
                newObj[newKey] = _sfJSONConvertKeysToLowerCase(json[key]);
            }
        }

        return newObj;
    } else {
        return json; // Base case: return non-object values as is
    }
}




P8.SpreadSheet.prototype.GetFormulaList = function (c, r, c2, r2) {
    var json = [];
    c = c == undefined ? this.CellIndexes.col : c;
    r = r == undefined ? this.CellIndexes.row : r;
    c2 = c2 == undefined ? c : c2;
    r2 = r2 == undefined ? r : r2;
    try {
        var colcell = p8_NumberToCell(parseInt(c) + 1);
        if (c == -247 && r == -247) {
            var len = 0
            try { len = this.Data.length; } catch (ex) { }
            //loop row data
            for (var i = 0; i < len; i++) {
                var item = this.Data[i];
                var keys = Object.keys(item);
                var len_j = 0
                try { len_j = keys.length; } catch (ex) { }
                for (var j = 0; j < len_j; j++) {
                    var key = keys[j];
                    var formula = item[key].formula;
                    if (!p8Spread_IsNull(formula)) {
                        var data = [];
                        data.col = j;
                        data.row = i;
                        data.formula = formula;
                        json.push(data);
                    }
                }
            }
        } else {
            for (var row_r = r; row_r <= r2; row_r++) {
                for (var col_r = c; col_r <= c2; col_r++) {
                    var formula = this.Data[row_r][p8_NumberToCell(col_r + 1)].formula;
                    if (!p8Spread_IsNull(formula)) {
                        var data = [];
                        data.col = col_r;
                        data.row = row_r;
                        data.formula = formula;
                        json.push(data);
                    }
                }
            }
        }
    } catch (ex) { }
    return json;
}

P8.SpreadSheet.prototype.RefreshFormula = function (c, r, c2, r2) {
    //c = c == undefined ? this.CellIndexes.col : c;
    //r = r == undefined ? this.CellIndexes.row : r;
    c = c == undefined ? Spread_ALLCOL : c;
    r = r == undefined ? Spread_ALLROW : r;
    c2 = c2 == undefined ? c : c2;
    r2 = r2 == undefined ? r : r2;
    try {
        //compute formula
        this.CellFomulaList = [];
        var json = this.GetFormulaList(c, r, c2, r2)
        for (fi = 0; fi < json.length; fi++) {
            this.SetFormula(json[fi].col, json[fi].row, json[fi].formula)
        }
    } catch (ex) { }

}


// Function to replicate COUNTIF functionality
function _sfCountIf(range, criterion) {
    var count = 0;
    for (var i = 0; i < range.length; i++) {
        if (range[i].toLowerCase() === criterion.toLowerCase()) {
            count++;
        }
    }
    return count;
}

// Function to replicate COUNTA functionality
function _sfCountA(range) {
    var count = 0;
    for (var i = 0; i < range.length; i++) {
        if (range[i] !== undefined && range[i] !== null && range[i] !== '') {
            count++;
        }
    }
    return count;
}

// Function to replicate COUNT functionality
function _sfCount(range) {
    return range.length;
}

// Function to replicate MIN functionality
function _sfMin(range) {
    return Math.min.apply(null, range);
}

// Function to replicate MAX functionality
function _sfMax(range) {
    return Math.max.apply(null, range);
}

// Function to replicate AVG and AVERAGE functionality
function _sfAvg(range) {
    var sum = 0;
    for (var i = 0; i < range.length; i++) {
        sum += _sfGetNum(range[i]);
    }
    return sum / range.length;
}

// Function to replicate SUM functionality
function _sfSum(values) {
    var total = 0;
    try {
        if (values.length == undefined) {
            try {
                if (!isNaN(values)) {
                    total = _sfGetNum(values);
                }
            } catch (ex) { }
        } else {

            for (var i = 0; i < values.length; i++) {
                try {
                    var value = _sfGetNum(values[i]);
                    if (!isNaN(value)) {
                        total += value;
                    }
                } catch (ex) { }
            }
        }
    } catch (ex) { }
    return total;
}


function _sfSumIf(range, criteria, sum_range) {
    var sum = 0;
    for (var i = 0; i < sum_range.length; i++) {
        criteria = criteria + "";
        if (range[i].toLowerCase() === criteria.toLowerCase()) {
            sum += _sfGetNum(sum_range[i]);
        }
    }
    return sum;
}

function _sfSumIfs(sum_range, ...args) {
    //if (args.length % 2 !== 0) {
    //    throw "Arguments must be provided in pairs (criteria_range, criteria).";
    //}

    var sum = 0;

    for (var i = 0; i < sum_range.length; i++) {
        var match = true;

        for (var j = 0; j < args.length; j += 2) {
            var criteria_range = args[j];
            var criteria = args[j + 1] + "";

            //if (criteria_range.length !== sum_range.length) {
            //    throw "Criteria range length must match sum range length.";
            //}
            if (criteria === "<>") {
                if (criteria_range[i] === "") {
                    match = false;
                    break;
                }
            } else {
                if (criteria_range[i].toLowerCase() !== criteria.toLowerCase()) {
                    match = false;
                    break;
                }
            }
        }
        if (match) {
            sum += _sfGetNum(sum_range[i]);
        }
    }

    return sum;
}

function _sfCountIfs(...args) {
    //if (args.length % 2 !== 0) {
    //    throw "Arguments must be provided in pairs (criteria_range, criteria).";
    //}

    // Initialize count
    var count = 0;

    // Get the count range
    var count_range = args[0];

    // Iterate over each value in the count range
    for (var i = 0; i < count_range.length; i++) {
        // Flag to track if all criteria match for the current value
        var match = true;

        // Iterate over each pair of criteria range and criteria
        for (var j = 0; j < args.length; j += 2) {
            var criteria_range = args[j];
            var criteria = args[j + 1] + "";

            // Check if the length of the criteria range matches the count range
            //if (criteria_range.length !== count_range.length) {
            //    throw "Criteria range length must match count range length.";
            //}

            var criteria_range_val = criteria_range[i];
            var criteria_val = criteria;
            if (!isNaN(criteria_range_val)) {
                criteria_range_val = _sfGetNum(criteria_range_val) + "";
            }
            if (!isNaN(criteria_val)) {
                criteria_val = _sfGetNum(criteria_val) + "";
            }
            // Check if the current value in the criteria range matches the criteria
            if (criteria_range_val.toLowerCase() !== criteria_val.toLowerCase()) {
                match = false;
                break; // Exit the loop if criteria not met
            }
        }

        // If all criteria match for the current value, increment count
        if (match) {
            count++;
        }
    }

    return count;
}

function _sfRound(value, decimals) {
    if (isNaN(value) || isNaN(decimals)) {
        throw new Error("Invalid number or decimal places");
    }
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

// Function to replicate DAY functionality
function _sfDay(date) {
    var d = new Date(date);
    if (isNaN(d.getTime())) {
        return "#VALUE!";
    }
    return d.getDate();
}

// Function to replicate YEAR functionality
function _sfYear(date) {
    var d = new Date(date);
    if (isNaN(d.getTime())) {
        return "#VALUE!";
    }
    return d.getFullYear();
}

// Function to replicate MONTH functionality
function _sfMonth(date) {
    var d = new Date(date);
    if (isNaN(d.getTime())) {
        return "#VALUE!";
    }
    return d.getMonth() + 1;
}

// Function to replicate TEXT functionality
function _sfText(value, format) {
    var dateFormats = {
        "d": { options: { day: "numeric" } },
        "dd": { options: { day: "2-digit" } },
        "m": { options: { month: "numeric" } },
        "mm": { options: { month: "2-digit" } },
        "mmm": { options: { month: "short" } },
        "mmmm": { options: { month: "long" } },
        "yy": { options: { year: "2-digit" } },
        "yyyy": { options: { year: "numeric" } },
        "d/m/yyyy": { options: { day: "numeric", month: "numeric", year: "numeric" }, separator: "/" },
        "dd/mm/yyyy": { options: { day: "2-digit", month: "2-digit", year: "numeric" }, separator: "/" },
        "m/d/yyyy": { options: { day: "numeric", month: "numeric", year: "numeric" }, separator: "/" },
        "mm/dd/yyyy": { options: { day: "2-digit", month: "2-digit", year: "numeric" }, separator: "/" },
        "d-m-yyyy": { options: { day: "numeric", month: "numeric", year: "numeric" }, separator: "-" },
        "dd-mm-yyyy": { options: { day: "2-digit", month: "2-digit", year: "numeric" }, separator: "-" },
        "m-d-yyyy": { options: { day: "numeric", month: "numeric", year: "numeric" }, separator: "-" },
        "mm-dd-yyyy": { options: { day: "2-digit", month: "2-digit", year: "numeric" }, separator: "-" },
        "d mmm yyyy": { options: { day: "numeric", month: "short", year: "numeric" }, separator: " " },
        "d mmmm yyyy": { options: { day: "numeric", month: "long", year: "numeric" }, separator: " " },
        "mmmm d, yyyy": { options: { day: "numeric", month: "long", year: "numeric" }, separator: " " },
        "mmm d, yyyy": { options: { day: "numeric", month: "short", year: "numeric" }, separator: " " },
        "yyyy-mm-dd": { options: { year: "numeric", month: "2-digit", day: "2-digit" }, separator: "-" },
        "yyyy/mm/dd": { options: { year: "numeric", month: "2-digit", day: "2-digit" }, separator: "/" },
        "dd mmm yyyy": { options: { day: "2-digit", month: "short", year: "numeric" }, separator: " " },
        "dd mmmm yyyy": { options: { day: "2-digit", month: "long", year: "numeric" }, separator: " " }
    };

    var date = new Date(value);
    if (isNaN(date.getTime())) {
        return "#VALUE!";
    }

    if (dateFormats[format.toLowerCase()]) {
        var options = dateFormats[format.toLowerCase()].options;
        var separator = dateFormats[format.toLowerCase()].separator || "/";

        var formattedDate = date.toLocaleDateString("en-US", options);

        if (separator !== "/") {
            formattedDate = formattedDate.replace(/\//g, separator);
        }

        return formattedDate;
    }
    return "#VALUE!";
}


function _sfGetNum(val) {
    try {
        val = parseFloat((val).replace(/,/g, "")) || 0;
    } catch (ex) { }
    return val;
}

// Function to parse and evaluate the formula


function _sfEvaluateFormula(obj, c, r, formula) {
    var isOperatorsOnly = isValidFormula(formula);
    // Remove leading '=' if present
    for (var i = 0; i < conFormulaFunc.length; i++) {
        var f = conFormulaFunc[i].toUpperCase() + "("; // Convert function to uppercase for case-insensitive comparison
        var searchString = "=" + f.toUpperCase();
        var index = formula.toUpperCase().indexOf(searchString);

        while (index !== -1) {
            // Replace the function in the formula
            formula = formula.substring(0, index) + "=" + f + formula.substring(index + searchString.length);

            // Search for the next occurrence of the function
            index = formula.toUpperCase().indexOf(searchString, index + f.length);
        }
    }

    if (formula.startsWith('=')) {
        formula = formula.slice(1);
    }

    var ranges = [];
    //var regex = /[A-Z]+\d+:[A-Z]+\d+|[A-Z]+\d+/g;
    var regex = /[A-Z]+\d+:[A-Z]+\d+|[A-Z]+\d+|"[^"]+"|\d+/g;
    var matches = formula.match(regex);

    var validCellRanges = [];
    var invalidCellRanges = [];
    if (matches) {
        matches.forEach(function (match) {
            if (_sfIsValidCellRangeFormat(match)) {
                validCellRanges.push(match);
            } else {
                invalidCellRanges.push(match);
            }
        });
        ranges = invalidCellRanges.concat(validCellRanges);
    }


    /*var matches = extractRangesFromFormula(formula);*/
    for (var i = 0; i < ranges.length; i++) {
        try {
            var valuelist = [];
            var iscell = _sfIsValidCellRangeFormat(ranges[i]);
            if (iscell) {
                var celllist = p8Spread_listCells(ranges[i]);
                //_sfLoadFormulaValue(celllist, obj, formula, c, r, function(result) {
                //    console.log('Processing complete. Result:', result);
                //    valuelist.push(...result);  // Spread operator to push all elements
                //    // Do something with valuelist or process further
                //});
                for (var f = 0; f < celllist.length; f++) {
                    var col = cellA1ToIndex(celllist[f]).col;
                    var row = cellA1ToIndex(celllist[f]).row;
                    try {
                        if (row >= obj.Data.length) {
                            break;
                        }
                        //var value = obj.GetValue(col, row);
                        var value = obj.Data[row][p8_NumberToCell(col + 1)].value;
                        _sfLoadFormulaRef(obj, celllist[f], col, row, c, r, formula);
                        valuelist.push(value)
                    } catch (ex) { }
                }
            } else {
                valuelist.push(ranges[i])
            }
            if (iscell && ranges[i].includes(":")) {
                var resultString = valuelist.map(function (item) {
                    return '"' + item + '"';
                    //return isNaN(item) ? '"' + item + '"' : item;
                }).join(", ");
                resultString = "[" + resultString + "]"
            } else {
                //var insideformula = _sfIsRangeUsed(formula, ranges[i]);
                if (iscell) {
                    //if (!insideformula) {
                    //    if (!isNaN(valuelist[0])) {
                    //        resultString = valuelist[0];
                    //    } else {
                    //        resultString = `"` + valuelist[0] + `"`;
                    //    }
                    //} else {
                    //    resultString = `["` + valuelist[0] + `"]`;
                    //}
                    if (!isNaN(valuelist[0])) {
                        resultString = valuelist[0];
                    } else {
                        resultString = `"` + valuelist[0] + `"`;
                    }
                }
                else {
                    //if (isNaN(valuelist[0])) {
                    //    resultString = `[` + valuelist[0] + `]`;
                    //if (!insideformula) {
                    resultString = valuelist[0];
                    //} else {
                    //resultString = `[` + valuelist[0] + `]`;
                }
                //}
                //}
            }
            if(resultString == ""){
                //    var isValid = isFormulaValid(formula, ranges)
                if(isOperatorsOnly){
                    resultString = "0";
                }
                //    //var operation = isMathOperationOnly(formula, resultString);
            }
            // Convert cell references to corresponding values
            formula = formula.replace(ranges[i], resultString);
        } catch (ex) { }
    }

    formula = formula.replace(excelFunctions, function (match) {
        var functionName = match.slice(0, -1); // Remove the opening parenthesis
        functionName = functionName.toUpperCase();
        //return '_' + functionMap[functionName].name + '('; // Call the corresponding JavaScript function
        return functionMap[functionName].name + '('; // Call the corresponding JavaScript function
    });

    // Regular expression to match cell references, string literals, and numbers
    var regex = /("[^"]+"|[A-Z]+\d+|\d+|[+&])/g;
    var matches = formula.match(regex);
    if (matches) {
        if (matches.includes('+') && matches.includes('&')) {
            return "#VALUE!";
        }
        if (matches.includes('&')) {

            var formulatemp = "";
            matches.forEach(function (match) {
                if (match === '&') {
                    formulatemp += "+";
                } else {
                    formulatemp += match;
                }
            });
            formula = formulatemp;
        }
    }
    // Evaluate the modified formula
    return _sfExecFormula(formula);
}
function _sfExecFormula(expr) {
    try {
        return new Function('return ' + expr)();
    } catch (err) { return "#VALUE!"; }
}
//function _sfLoadFormulaValue(celllist, obj, formula, c, r, callback) {
//    var chunkSize = 1000;  // Define the chunk size
//    var index = 0;
//    var valuelist = [];  // Local variable to store the values

//    function LoadFormulaValue() {
//        var end = Math.min(index + chunkSize, celllist.length);

//        for (var f = index; f < end; f++) {
//            var col = cellA1ToIndex(celllist[f]).col;
//            var row = cellA1ToIndex(celllist[f]).row;
//            try {
//                if (row >= obj.Data.length) {
//                    break;
//                }
//                var value = obj.Data[row][p8_NumberToCell(col + 1)].value;
//                _sfLoadFormulaRef(obj, celllist[f], col, row, c, r, formula);
//                valuelist.push(value);
//            } catch (ex) { 
//                console.error('Error processing cell:', celllist[f], ex);
//            }
//        }

//        index += chunkSize;
//        if (index < celllist.length) {
//            // Schedule the next chunk to process
//            setTimeout(LoadFormulaValue, 0);
//        } else {
//            // All chunks processed, call the callback with results
//            callback(valuelist);
//        }
//    }

//    // Start processing
//    LoadFormulaValue();
//}

function isValidFormula(formula) {
    // Remove leading '=' if present
    formula = formula.startsWith('=') ? formula.slice(1) : formula;

    // Regular expression to match valid cell references (e.g., A1, B2, Z99)
    var cellReferenceRegex = /([A-Z]+\d+)/g;

    // Replace valid cell references with a number placeholder (e.g., 1)
    var formulaWithPlaceholders = formula.replace(cellReferenceRegex, '1');

    // Regular expression to validate the formula structure
    // It allows numbers, operators, and correctly matched parentheses
    var validFormulaRegex = /^[\d+\-*/().]+$/;

    // Check if the formula contains only valid characters
    if (!validFormulaRegex.test(formulaWithPlaceholders)) {
        return false;
    }

    // Check if the parentheses are balanced and operators are placed correctly
    var parenthesesStack = [];
    for (var i = 0; i < formulaWithPlaceholders.length; i++) {
        var char = formulaWithPlaceholders[i];
        if (char === '(') {
            parenthesesStack.push(char);
        } else if (char === ')') {
            if (parenthesesStack.length === 0) {
                return false; // Unmatched closing parenthesis
            }
            parenthesesStack.pop();
        }
    }
    if (parenthesesStack.length !== 0) {
        return false; // Unmatched opening parenthesis
    }

    // Regular expression to validate proper placement of numbers and operators
    var operatorPlacementRegex = /^(?:\d+|\d*\.\d+)(?:[+\-*/](?:\d+|\d*\.\d+|\(\d+(?:[+\-*/]\d+)*\)))*$/;

    // Check if the formula has valid placement of numbers and operators
    return operatorPlacementRegex.test(formulaWithPlaceholders);
}



function _sfIsValidCellRangeFormat(cellRange) {
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

P8.SpreadSheet.prototype.SetRowHeight = function (r, h) {
    //c = c == undefined ? this.CellIndexes.col : c;
    //r = r == undefined ? this.CellIndexes.row : r;
    if (r == undefined || h == undefined) {
        return;
    }
    try {
        if (r == Spread_ALLROW) {
            var len = 0
            try { len = this.Data.length; } catch (ex) { }
            //loop row data
            for (var i = 0; i < len; i++) {
                this.Data[r].aagrowHeight = h;
            }
        } else {
            this.Data[r].aagrowHeight = h;
        }
        this.RenderNoEvent();
    } catch (ex) { }

}

P8.SpreadSheet.prototype.GetRowHeight = function (r) {
    try {
        return this.Data[r].aagrowHeight || def_Height;
    } catch (ex) { }
}

P8.SpreadSheet.prototype.SetFocus = function (c, r) {

    if (c == undefined || r == undefined) {
        return;
    }
    try {
        var startCol = c;
        var startRow = r;
        if (this.FreezeCol < startCol && this.FreezeCol >= 0) {
            startCol = c - this.FreezeCol;
        }
        if (this.FreezeRow < startRow && this.FreezeRow >= 0) {
            startRow = r - this.FreezeRow;
        }
        this.startCol = startCol + 1;
        this.startRow = startRow + 1;
        this.CellIndexes.Col = c;
        this.CellIndexes.Col2 = c;
        this.CellIndexes.Row = r;f
        this.CellIndexes.Row2 = r;
        this.RenderNoEvent();
    } catch (ex) { }

}
P8.SpreadSheet.prototype.GetFocus = function () {
    try {
        return {
            row: this.CellIndexes.Row
            , col: this.CellIndexes.Col
        };
    } catch (ex) { }
}


P8.SpreadSheet.prototype.SetExport = function (name, rowexporthide, colexporthide) {
    try {
        try {
            var key = "name"
            var columnkey = name
            var jsondata_delete = this.exportList;
            for (var i = jsondata_delete.length - 1; i >= 0; i--) {
                var item = jsondata_delete[i];

                var id = item[key];
                if (columnkey == id) {
                    jsondata_delete.splice(i, 1);
                }
            }
        } catch (ex) {
        }
        if ((rowexporthide == undefined || rowexporthide == "")
            && (colexporthide == undefined || colexporthide == "")) {

        } else {
            this.exportList.push({
                name: name,
                rowexporthide: rowexporthide,
                colexporthide: colexporthide,
            });
        }
    } catch (ex) { }
}
P8.SpreadSheet.prototype.GetExport = function (name) {
    try {
        if (name == "" || name == undefined) {
            return this.exportList
        } else {
            return nwJson(this.exportList, "name", name, false);
        }
    } catch (ex) { }
}

function _sfSpreadAdjustMergeList(obj, index, rowAdd = 0, colAdd = 0) {
    try {
        for (var i = obj.mergeList.length - 1; i >= 0; i--) {
            var item = this.mergeList[i];
            var updatemerge = false;
            var colorig = item.col;
            var roworig = item.row;
            // Adjust rows
            if (rowAdd !== 0) {
                if (item.row >= index) {
                    item.row += rowAdd;
                    updatemerge = true;
                }
                if (item.row2 >= index) {
                    item.row2 += rowAdd;
                    updatemerge = true;
                }
                if (rowAdd < 0 && item.row > index + rowAdd - 1) {
                    item.row = Math.max(item.row + rowAdd, index);
                    updatemerge = true;
                }
                if (rowAdd < 0 && item.row2 > index + rowAdd - 1) {
                    item.row2 = Math.max(item.row2 + rowAdd, index);
                    updatemerge = true;
                }
            }

            // Adjust columns
            if (colAdd !== 0) {
                if (item.col >= index) {
                    item.col += colAdd;
                    updatemerge = true;
                }
                if (item.col2 >= index) {
                    item.col2 += colAdd;
                    updatemerge = true;
                }
                if (colAdd < 0 && item.col > index + colAdd - 1) {
                    item.col = Math.max(item.col + colAdd, index);
                    updatemerge = true;
                }
                if (colAdd < 0 && item.col2 > index + colAdd - 1) {
                    item.col2 = Math.max(item.col2 + colAdd, index);
                    updatemerge = true;
                }
            }
            if (updatemerge) {
                obj.DeleteConfigData(item.col, item.row, "merge");
                obj.SetMerge(item.col, item.row, item.col2, item.row2);
            }
        }
    } catch (ex) {
    }
}




    class P8ConditionalFormat {
        static Contains = 1;
        static Equal = 1;
        }
    class P8Themes {
        static DEFAULT = 1;
        static FANCY = 2;


        //constructor() {

        //    const privateVariable = 'private value'; // Private variable at the constructor scope
        //    this.publicVariable = 'public value'; // Public property

        //    this.privilegedMethod = function() {
        //        // Public Method with access to the constructor scope variables
        //        console.log(privateVariable);
        //    };
        //}

        //// Prototype methods:
        //publicMethod() {
        //    console.log(this.publicVariable);
        //}

        //// Static properties shared by all instances
        //static staticProperty = 'static value';

        //static staticMethod() {
        //    console.log(this.staticProperty);
        //}
        }

        // We can add properties to the class prototype
        //P8Themes.prototype.additionalMethod = function() {
        //    console.log(this.publicVariable);
        //};
        //myInstance.publicMethod();       // "public value"
        //myInstance.additionalMethod(); // "public value"
        //myInstance.privilegedMethod(); // "private value"
        //P8Themes.staticMethod(); 
