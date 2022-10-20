/* # Canvas JS Library 1.10.1.66
# Company Owner: Forecasting and Planning Technologies Inc. / Promptus8 Inc.
# Developers : Angelo Carlo A. Gonzales
Omar B. Credito
# Date Created : March 2018
# Date Modified : August 22 2022 / 05:17 PM  - before: 08-05-2022

For  NoahWeb Application and Promptus8 Modules used only. 

Illeggal used are Prohibited
Modification of this Library is Prohibited.
*/

/**/

var p8Spread_JSExport = false;
var p8Spread_CurBook = "";

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


    obj.HeadertColumnHeight = 26;
    obj.HeadertGroupHeight = 26;

    obj.FreezeWidth = "1px";
    obj.FreezeColor = "rgba(0,0,0,0.0)";


    obj.haveLog = haveLog;

    obj.CellIndexes = { Col: -1, Row: -1, Col2: -1, Row2: -1 };
    obj.CellSelHover = false;
    obj.CellSelValue = { col: -1, row: -1 };

    obj.CellSelected = {};
    obj.currentCells = [];
    obj.DefaultSettings = _sfDefaultSettings();
    obj.ColumnConfig = [];
    obj.RowConfig = [];
    obj.Events = [];
    obj.CellFomulaList = [];

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

    obj.AutoWrap = false;
    obj.AutoWrapRender = false;


    obj.Enabled = true;

    if (obj.Data == undefined) {
        obj.DataBind(_sfCreateData(3, 5));
    }


    obj.Format_SelHeadBG = "rgba(0, 117, 255, 0.19)";

    //obj.ActiveSheet = obj;

    return obj;
}





function fnExcelReport() {
    var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange; var j = 0;
    tab = document.getElementById('headerTable'); // id of table


    for (j = 0 ; j < tab.rows.length ; j++) {
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
            ,CheckBox: null
            ,Class: null
            ,ColumName: ""
            ,ColumnTemplate: ""
            ,ColumnTemplateEmpty: "aagdefault"
            ,ColumnTemplateObject: ""
            ,ColumnWidth: "150"
            ,Enabled: true
            ,FontFamily: ""
            ,FontSize: ""
            ,FontStyle: ""
            ,FontWeight: ""
            ,HeaderColumnReq: null
            ,MergeRow: null
            ,ObjectType: ""
            ,Precision: 2
            ,Protected: null
            ,TextAlign: ""
            ,TextColor: ""
            ,TextDecoration: null
            ,ThousandSeparator: null
            ,VerticalAlign: null
            ,backgroundColor: null
            ,dataType: null
        };
}

function _sfDefaultSettings() {
    return {
        bold: "normal", italic: "normal"
        , underline: "none"
        , fontSize: "10", fontFamily: "Arial"
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

// SetFormat
function _sfSetFormat(obj, icol, irow, format, data) {
    if (icol == undefined) icol = obj.CellIndexes.Col;
    if (irow == undefined) irow = obj.CellIndexes.Row;
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
            _sfCreateConfigData(obj.Data[irow][_sfGetCellName(obj, icol)].Config, format, data);
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
            if (this.ColumnConfig[i].CheckBox == "true" || this.ColumnConfig[i].CheckBox == "True") {
                this.ColumnConfig[i].ObjectType = "checkbox";
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

P8.SpreadSheet.prototype.RowDelete = function (index) {
    if (index == undefined) { }
    else {
        _sfJsonDelete(this.Data, index);
        _sfSpreadDeleteRowAdjustConfig(this, index);
        this.ScrollActive = true;
        this.RenderNoEvent();
    }
    return index;
}
function _sfSpreadDeleteRowAdjustConfig(obj, startindex) {
    var len = obj.RowConfig.length;

    for (var i = 0; i < len; i++) {
        if (obj.RowConfig[i].row == startindex) {
            obj.RowConfig.splice(i, 1);
            break;
        }
    }
    len = obj.RowConfig.length;
    for (var i = 0; i < len; i++) {
        if (obj.RowConfig[i].row > startindex) {
            obj.RowConfig[i].row = obj.RowConfig[i].row - 1;
        }
    }
}

P8.SpreadSheet.prototype.RowAdd = function (atbegin) {
    var index = 0;

    arry = _sfSpreadAddRow(this);

    if (atbegin == true) this.Data.unshift(arry);
    else this.Data.push(arry);

    this.ScrollActive = true;
    this.RenderNoEvent();
    return index;
}

P8.SpreadSheet.prototype.RowInsert = function (index, isbottom, norender) {

    if (isbottom == undefined) isbottom = true;

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


    var arry = _sfSpreadAddRow(this);

    if (isbottom) {
        this.Data.splice(index + 1, 0, arry);
        _sfSpreadInsertRowAdjustConfig(this, index + 1);
    }
    else {
        this.Data.splice(index, 0, arry);
        _sfSpreadInsertRowAdjustConfig(this, index);
    }



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
        try{
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
    this.FreezeRow = r;
    this.FreezeCol = c;

    this.ScrollActive = true;
    this.RenderNoEvent();
    return true;
}

P8.SpreadSheet.prototype.SetPrecision = function (c, r, data) {
    var irow = r; icol = c;
    if (data == undefined) data = data;
    else {
        _sfSetFormat(this, icol, irow, "Precision", data);
    }
    return data;
}

P8.SpreadSheet.prototype.SetDataType = function (c, r, data) {
    var irow = r; icol = c;
    if (data == undefined) data = data;
    else {
        _sfSetFormat(this, icol, irow, "dataType", data);
    }
    return data;
}

P8.SpreadSheet.prototype.DataType = function (c, r, data) {
    var irow = r; icol = c;
    if (data == undefined) data = data;
    else {
        _sfSetFormat(this, icol, irow, "dataType", data);
    }
    return data;
}
P8.SpreadSheet.prototype.DataStyle = function (c, r, data) {
    var irow = r; icol = c;
    if (data == undefined) data = data;
    else {
        _sfSetFormat(this, icol, irow, "dataStyle", data);
    }
    return data;
}


P8.SpreadSheet.prototype.SetSheetName = function (data) {
    this.SheetName = data;
    if (this.RenderStatus == false) return;
    _sfLoadSheetTab(this.Book, this.canvasID);
}




P8.SpreadSheet.prototype.SetTag = function (c, r, tagname, data) {
    if (tagname == undefined) {
        console.error("tagname is required");
        return;
    }
    var irow = r; icol = c;
    _sfSetFormat(this, icol, irow, "tag-" + tagname, data);
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



P8.SpreadSheet.prototype.SetTextColor = function (c, r, data) {
    var irow = r; icol = c;
    _sfSetFormat(this, icol, irow, "textColor", data);
}

P8.SpreadSheet.prototype.SetFontSize = function (c, r, data) {
    var irow = r; icol = c;
    _sfSetFormat(this, icol, irow, "fontSize", data);
}
P8.SpreadSheet.prototype.SetFontFamily = function (c, r, data) {
    var irow = r; icol = c;
    _sfSetFormat(this, icol, irow, "fontFamily", data);
}

P8.SpreadSheet.prototype.SetBold = function (c, r, data) {
    var irow = r; icol = c;
    if (data === true) data = "bold";
    if (data === false) data = "normal";
    _sfSetFormat(this, icol, irow, "bold", data);
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

P8.SpreadSheet.prototype.SetItalic = function (c, r, data) {
    var irow = r; icol = c;
    if (data === true) data = "italic";
    if (data === false) data = "normal";
    _sfSetFormat(this, icol, irow, "italic", data);
}
P8.SpreadSheet.prototype.SetUnderline = function (c, r, data) {
    var irow = r; icol = c;
    if (data === true) data = "underline";
    if (data === false) data = "none";
    _sfSetFormat(this, icol, irow, "underline", data);
}
P8.SpreadSheet.prototype.SetTextAlign = function (c, r, data) {
    var irow = r; icol = c;
    _sfSetFormat(this, icol, irow, "textAlignment", data);
}
P8.SpreadSheet.prototype.SetVerticalAlign = function (c, r, data) {
    var irow = r; icol = c;
    _sfSetFormat(this, icol, irow, "textVertical", data);
}


P8.SpreadSheet.prototype.SetBackground = function (c, r, data) {
    var irow = r; icol = c;
    _sfSetFormat(this, icol, irow, "backgroundColor", data);
}
P8.SpreadSheet.prototype.SetBackgroundPercent = function (c, r, data) {
    var irow = r; icol = c;
    _sfSetFormat(this, icol, irow, "backgroundColorPercent", data);
}
P8.SpreadSheet.prototype.SetBackgroundPercentValue = function (c, r, data) {
    var irow = r; icol = c;
    _sfSetFormat(this, icol, irow, "backgroundColorPercentValue", data);
}

P8.SpreadSheet.prototype.SetCurrencyCode = function (c, r, data) {
    if (c == undefined) c = this.CellIndexes.Col;
    if (r == undefined) r = this.CellIndexes.Row;
    _sfSetFormat(this, c, r, "currencyCode", data);
    return data;
}

P8.SpreadSheet.prototype.SetEnable = function (c, r, data) {
    var irow = r; icol = c;
    _sfSetFormat(this, icol, irow, "Enabled", data);
};


P8.SpreadSheet.prototype.SetObjectType = function (c, r, data) {
    var irow = r; icol = c;

    if (data == undefined || data == "") data = "celltext";

    if (data == "checkboxtext")
        this.SetText2(c, r, this.GetText(c, r));

    _sfSetFormat(this, icol, irow, "ObjectType", data);

    //if (type == "checkbox")
    //    _sfSetFormat(this, icol, irow, "Checked", data);
};



var mergeList = [];
P8.SpreadSheet.prototype.SetMerge = function (c, r, c2, r2, data) {
    var irow = r; icol = c;
    var irow2 = r2; icol2 = c2;
    var data = { col: icol, row: irow, col2: icol2, row2: irow2 };

    this.mergeList.push(data);


    _sfSetFormat(this, icol, irow, "merge", [data]);
}



P8.SpreadSheet.prototype.SetBorderColorTop = function (c, r, data) {
    var irow = r; icol = c;
    _sfSetFormat(this, icol, irow, "borderColorTop", data);
}
P8.SpreadSheet.prototype.SetBorderColorBottom = function (c, r, data) {
    var irow = r; icol = c;
    _sfSetFormat(this, icol, irow, "borderColorBottom", data);
}
P8.SpreadSheet.prototype.SetBorderColorLeft = function (c, r, data) {
    var irow = r; icol = c;
    _sfSetFormat(this, icol, irow, "borderColorLeft", data);
}
P8.SpreadSheet.prototype.SetBorderColorRight = function (c, r, data) {
    var irow = r; icol = c;
    _sfSetFormat(this, icol, irow, "borderColorRight", data);
}



P8.SpreadSheet.prototype.SetBorderStyleTop = function (c, r, data) {
    var irow = r; icol = c;
    _sfSetFormat(this, icol, irow, "borderStyleTop", data);
}
P8.SpreadSheet.prototype.SetBorderStyleBottom = function (c, r, data) {
    var irow = r; icol = c;
    _sfSetFormat(this, icol, irow, "borderStyleBottom", data);
}
P8.SpreadSheet.prototype.SetBorderStyleLeft = function (c, r, data) {
    var irow = r; icol = c;
    _sfSetFormat(this, icol, irow, "borderStyleLeft", data);
}
P8.SpreadSheet.prototype.SetBorderStyleRight = function (c, r, data) {
    var irow = r; icol = c;
    _sfSetFormat(this, icol, irow, "borderStyleRight", data);
}



P8.SpreadSheet.prototype.SetBorderWidthTop = function (c, r, data) {
    var irow = r; icol = c;
    _sfSetFormat(this, icol, irow, "borderWidthTop", data);
}
P8.SpreadSheet.prototype.SetBorderWidthBottom = function (c, r, data) {
    var irow = r; icol = c;
    _sfSetFormat(this, icol, irow, "borderWidthBottom", data);
}
P8.SpreadSheet.prototype.SetBorderWidthLeft = function (c, r, data) {
    var irow = r; icol = c;
    _sfSetFormat(this, icol, irow, "borderWidthLeft", data);
}
P8.SpreadSheet.prototype.SetBorderWidthRight = function (c, r, data) {
    var irow = r; icol = c;
    _sfSetFormat(this, icol, irow, "borderWidthRight", data);
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
        else if (!isNaN(splitdata[i].replace("px", "")) || splitdata[i].indexOf("px") > -1)
        { widthX = splitdata[i].replace("px", ""); }
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
    if (text.trim().indexOf("=") == 0) {
        text = text.replace("=", "");
    }
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

        //_sfLog("formulax:" + p8_NumberToCell(c + 1) + r)


        var xtemp = text.toUpperCase()._sfReplaceAll("=", "")._sfReplaceAll("-", "#aag#")._sfReplaceAll("*", "#aag#")._sfReplaceAll("/", "#aag#")._sfReplaceAll("+", "#aag#");
        //._sfReplaceAll("(", "#aag#")._sfReplaceAll(")", "#aag#")
        var xArry = xtemp.split("#aag#");
        var xArryVal = xtemp.split("#aag#");

        var tempValue = [];

        var formula_ = text._sfReplaceAll("=", "")._sfReplaceAll(" ", "").toUpperCase();;
        for (var i2 = 0; i2 < xArry.length; i2++) {
            var cellindex = { row: -1, col: -1 };
            try {
                xArry[i2] = xArry[i2].trim();
                var importantCell = xArry[i2];

                var tempimportantCell = importantCell._sfReplaceAll("(", "#aag#")._sfReplaceAll(")", "#aag#");
                var tempimportantCellArry = tempimportantCell.split("#aag#");
                crFormulaFuncTemp = func_GetFormulaFunc(tempimportantCellArry[0]);
                if (crFormulaFuncTemp != "") {
                    importantCell = tempimportantCellArry[1];
                    crFormulaFunc = crFormulaFuncTemp;

                    //continue;
                    var xval = 0;
                    // Custom Function    like SUM
                    if (crFormulaFunc != "") { //&& 1==2
                        try {
                            // get whole value of Custom Function
                            xval = func_GetFormulaRangeValue(importantCell, obj, crFormulaFunc);
                        } catch (err) {
                            xval = "";
                            //  xval = err;
                        }
                        if (xval == undefined || xval == "undefined" || xval == "") xArryVal[i] = "0";
                        else xArryVal[i] = xval + "";
                        crFormulaFunc = "";

                        tempValue.push({ cell: xArry[i2].trim() + "", value: xval, type: "special" });
                        continue;
                    }
                }
                else {
                    xArry[i2] = xArry[i2].replaceAll("(", "").replaceAll(")", "");
                }


                cellindex = _sfcellA1ToIndex(xArry[i2].trim(), 0);
                var valuex = obj.GetValue(cellindex.col, cellindex.row);
                if (valuex == undefined || valuex == "") valuex = 0;



                tempValue.push({ cell: xArry[i2].trim() + "", value: valuex, type: "cell" });
            } catch (err) { }
        }

        tempValue.sort(function (a, b) { return b.cell.length - a.cell.length });
        for (var i2 = 0; i2 < tempValue.length; i2++) {
            formula_ = formula_._sfReplaceAll(tempValue[i2].cell, tempValue[i2].value);
        }
        try { result = eval(formula_); } catch (err) { isFailed = true; result = "#VALUE!"; }
        if (result == undefined || result == "undefined") { isFailed = true; result = "#ERROR#"; }
        if (_sfIsFunction(result)) { isFailed = true; result = "#ERROR#"; }
        obj.Data[r][_sfGetCellName(obj, c)].value = result;


        zsearchVal = c + ":" + r + ":";
        _sfComputeFormulaSub(obj, zsearchVal);
    }
}

function _sfSetFormulaChange(obj, c, r) {

}
function _sfSetFormulaRemove(obj, c, r) {
   
    for (var i = obj.CellFomulaList.length-1; i >=0 ; i--) {
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

        var xtemp = text.toUpperCase()._sfReplaceAll("=", "")._sfReplaceAll("^", "#aag#");
        //xtemp = xtemp._sfReplaceAll("(", "#aag#")._sfReplaceAll(")", "#aag#");
        xtemp = xtemp._sfReplaceAll("-", "#aag#")._sfReplaceAll("*", "#aag#")._sfReplaceAll("/", "#aag#")._sfReplaceAll("+", "#aag#");

        var xArry = xtemp.split("#aag#");
        var xArryVal = xtemp.split("#aag#");

        var tempValue = [];

        var formula_ = text._sfReplaceAll("=", "")._sfReplaceAll(" ", "").toUpperCase();;
        var crFormulaFuncTemp = "";
        var crFormulaFunc = "";
        var importantCell = "";
        var xval = "";


        for (var i = 0; i < xArry.length; i++) {
            var cellindex = { row: -1, col: -1 };
            try {
                xArry[i] = xArry[i].trim();
                importantCell = xArry[i];
                xval = "";


                var tempimportantCell = importantCell._sfReplaceAll("(", "#aag#")._sfReplaceAll(")", "#aag#");
                var tempimportantCellArry = tempimportantCell.split("#aag#");
                crFormulaFuncTemp = func_GetFormulaFunc(tempimportantCellArry[0]);
                if (crFormulaFuncTemp != "") {
                    importantCell = tempimportantCellArry[1];
                    crFormulaFunc = crFormulaFuncTemp;

                    //continue;

                    // Custom Function    like SUM
                    if (crFormulaFunc != "") { //&& 1==2
                        try {
                            // get whole value of Custom Function
                            xval = func_GetFormulaRangeValue(importantCell, obj, crFormulaFunc);
                        } catch (err) {
                            xval = "";
                            //  xval = err;
                        }
                        if (xval == undefined || xval == "undefined" || xval == "") xArryVal[i] = "0";
                        else xArryVal[i] = xval + "";
                        crFormulaFunc = "";

                        tempValue.push({ cell: xArry[i].trim() + "", value: xval, type: "special" });
                        continue;
                    }
                }
                else {
                    xArry[i] = xArry[i].replaceAll("(", "").replaceAll(")", "");
                }





                cellindex = _sfcellA1ToIndex(xArry[i].trim(), 0);
                var valuex = obj.GetValue(cellindex.col, cellindex.row);
                if (valuex == undefined || valuex == "") valuex = 0;

                tempValue.push({ cell: xArry[i].trim() + "", value: valuex, type: "cell" });
            } catch (err) { }
        }

        tempValue.sort(function (a, b) { return b.cell.length - a.cell.length });


        for (var i = 0; i < tempValue.length; i++) {
            formula_ = formula_._sfReplaceAll(tempValue[i].cell, tempValue[i].value);

            if (tempValue[i].type == "cell") {
                var xindexes = _sfcellA1ToIndex(tempValue[i].cell);
                _sfLoadFormulaRef(obj, tempValue[i].cell, xindexes.col, xindexes.row, c, r, text);
            }
            else {
                // continue;
                var celvalue = tempValue[i].cell;
                var tempimportantCell = celvalue._sfReplaceAll("(", "#aag#")._sfReplaceAll(")", "#aag#");
                var tempimportantCellArry = tempimportantCell.split("#aag#");
                var cellarray = tempimportantCellArry[1].split(",");
                for (var ix = 0; ix < cellarray.length; ix++) {
                    var cellarray2 = cellarray[ix].split(":");
                    if (cellarray2.length > 1) {
                        //range
                        var xindexes1 = _sfcellA1ToIndex(cellarray2[0]);
                        var xindexes2 = _sfcellA1ToIndex(cellarray2[1]);

                        for (var ir = xindexes1.row; ir <= xindexes2.row; ir++) {
                            for (var ic = xindexes1.col; ic <= xindexes2.col; ic++) {
                                var cellname = GetExcelColumnName(ic + 1) + "" + (ir + 1);
                                _sfLoadFormulaRef(obj, cellname, ic, ir, c, r, text);
                                //break;
                            }
                            // break;
                        }

                    }
                    else {
                        var xindexes = _sfcellA1ToIndex(cellarray2[0]);
                        _sfLoadFormulaRef(obj, cellarray2[0], xindexes.col, xindexes.row, c, r, text);
                    }
                }
            }
        }



        formula_ = _sfLoadFormulaPow(formula_); // convert pow


        try { result = eval(formula_); } catch (err) { isFailed = true; result = "#VALUE!"; }
        if (result == undefined || result == "undefined") { isFailed = true; result = "#ERROR#"; }
        if (_sfIsFunction(result)) { isFailed = true; result = "#ERROR#"; }
        obj.Data[r][_sfGetCellName(obj, c)].value = result;


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

function _sfJsonDelete(json, rowIndex) {
    var results = json;
    try {
        json.splice(rowIndex, 1);
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
    // Ensure index is (default) 0 or 1, no other values accepted.
    index = index || 0;
    index = (index == 0) ? 0 : 1;

    // Use regex match to find column & row references.
    // Must start with letters, end with numbers.
    // This regex still allows induhviduals to provide illegal strings like "AB.#%123"
    var match = cellA1.match(/(^[A-Z]+)|([0-9]+$)/gm);

    if (match.length != 2) throw new Error("Invalid cell reference");

    var colA1 = match[0];
    var rowA1 = match[1];

    return {
        row: _sfrowA1ToIndex(rowA1, index),
        col: _sfcolA1ToIndex(colA1, index)
    };
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
function _sfScrollUpdatePosition(obj) {
    // var canvasID = nwGridMainCon_Book.ActiveSheet.canvasID;
    //var obj = P8DataList[canvasID][0].sheet.ActiveSheet;
    var canvasID = obj.canvasID;
    var maxrow = obj.Data.length;
    var columnminus = 7;//aag scroll
    var maxcolumn = obj.ColumnConfig.length - columnminus;
    if (maxcolumn <= 1) maxcolumn = 1;

    var currow = obj.startRow - 1;
    var curcol = obj.startCol - 1;

    //if (maxcolumn >= curcol) {
    //    return;
    //}

    var varpercV = currow / maxrow;
    var varpercH = curcol / maxcolumn;

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
    $(scH).find('.P8Spread_ScrollH_handler').css("left", wdiff * varpercH + "px");

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
    if (this.startRow >= this.Data.length) return;
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
    if (this.startRow == 1) return;

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
    while (this.ColumnWidth(c-1) == "0" && this.startCol < this.ColumnConfig.length) {
        c += 1;
    }

    if (this.startCol >= this.ColumnConfig.length) return;


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
    try{
        latec = this.ColumnWidth(colx-1);
    }catch(err){}
    while (latec == "0" && this.startCol > 1) {
        this.startCol -= 1;
        colx -= 1;
        try{
            latec = this.ColumnWidth(colx);
        } catch (err) { }
    }
    //if (c <= 0) return;

    if (this.startCol <= 1) return;

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

var P8RendeVar;
var P8RendeVarSub;
function _sfRenderFunction(_this) {

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

        try { clearTimeout(P8RendeVar); } catch (err) { }
        P8RendeVar = setTimeout(function () {
            //_this.havelistner = false;
            console.log("start:" + renderID + " | col:" + _this.Book.ActiveSheet.startCol + " | row:" + _this.Book.ActiveSheet.startRow);
            canvasCreate(_this.canvasID, _this.Book.ActiveSheet);
            console.log("End:" + renderID + " | col:" + _this.Book.ActiveSheet.startCol + " | row:" + _this.Book.ActiveSheet.startRow);
            _this.Book.ActiveSheet.ScrollActiveStat = false;
        }, 0);

        // resolve issue on load no click event
        try { clearTimeout(P8RendeVarSub); } catch (err) { }
        P8RendeVarSub = setTimeout(function () {
            if (P8DataList[_this.canvasID][0].sheet.ActiveSheet.Events.length <= 0) {
                P8DataList[_this.canvasID][0].sheet.ActiveSheet.Render();
            }
        }, 0);
    }
    else {
        canvasCreate(_this.canvasID, _this.Book.ActiveSheet);
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
    for (var i = 0; i < objMain.Sheet.length ; i++) {
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
                _column[_column.length - 1].ColumnWidth = def_Width+"";

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

    for (j = 0 ; j < tab.rows.length ; j++) {
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

function _sfSpreadInputShow(obj, clearText) {

    var valueformula = obj.Book.ActiveSheet.GetFormula();
    if (obj.Book.FormulaField == true) {
        $("#" + obj.canvasID + "").find(".formulafield").val(valueformula);
    }
    if (valueformula.trim().indexOf("=") == 0) {
        _sfPromptMessage("This cell has Formula");
        return false;
    }




    $("#" + obj.canvasID + "_vw_inp").val("");
    $("#" + obj.canvasID + "_vw_inp").attr("acol", obj.CellIndexes.Col);
    $("#" + obj.canvasID + "_vw_inp").attr("arow", obj.CellIndexes.Row);
    $("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "1");
    $("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "visible");

    var valuex = obj.Book.ActiveSheet.GetValue();
    var xdataType = obj.Book.ActiveSheet.GetDataType(obj.CellIndexes.Col, obj.CellIndexes.Row);
    var xprecision = obj.Book.ActiveSheet.GetPrecision(obj.CellIndexes.Col, obj.CellIndexes.Row);

    if (xdataType == "number"
        || xdataType == "currency"
         || xdataType == "percentvalue"
         || xdataType == "percent") {

        if (xdataType == "percentvalue") valuex * 100;

        valuex = _sfFormartNumber(valuex, xprecision);



        if (valuex == NaN || valuex == "NaN" || valuex == undefined || valuex == "undefined") valuex = "";
    }
    else {
        $('#' + obj.canvasID + '_vw_inp').unmask();
        $("#" + obj.canvasID + "_vw_inp").removeClass("isNumber");
        $("#" + obj.canvasID + "_vw_inp").removeClass("numC");
        $("#" + obj.canvasID + "_vw_inp").removeClass("nwPercentValue");
    }
    if (obj.GetDataType() == "date") {
        $("#" + obj.canvasID + "_vw_selectorCon .P8Spread_Input.hasDatepicker").show();
    }

    $("#" + obj.canvasID + "_vw_inp").val("");

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
    var xtotal =0;
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

function _sfnwGridButtons(objBook) {
    var strAddButton = "";
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

        //strAddButton += "<style>";
        //strAddButton += "#" + objBook.ActiveSheet.canvasID + " .nwgrid_buttons {margin-top: 0px;display:inline-block;width:inherit; padding-left:4px;padding-right:4px; margin-bottom:1px; padding-bottom:1px; height:18px;border-radius: 3px;border-bottom: 1px #828282 solid; font-size: 11px;}";
        //strAddButton += "#" + objBook.ActiveSheet.canvasID + " .nwgrid_buttonsCon {    display: inline-block;float: left;margin-right: 3px;}";  //margin-bottom: 3px;
        //strAddButton += "</style>";

        strAddButton += "</div>"; // end
    } catch (err) { }

    if (objBook.FormulaField == true) {
        strAddButton += "<div><span p8style='font-style: italic;font-weight: bold;margin: 10px;'>fx</span>"
        strAddButton += "<input class='formulafield' p8style='min-width: 450px;max-width: 92%;width: 92%;'></div>";
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
    // obj.RenderStatus = false;

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
    console.log("Canvas AutoWrap End:" + obj.canvasID);
    //obj.RenderStatus = true;
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

function canvasCreate(canvasID, obj) {

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

        x_html += "<div  id='" + canvasID + "_con'><textarea id='" + canvasID + "_inpText' class='P8Spread_TextArea' p8style='opacity:0;position:absolute;width0;height:0;' ></textarea>";
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

        x_html += "<canvas id='" + canvasID + "'  p8style='height:" + xconheight + ";cursor:default;width:" + $('#' + containerID).css("width") + ";'></canvas>";
        x_html += "<canvas id='" + canvasID + "_temp'  p8style='display:none;height:" + xconheight + ";cursor:default;width:" + $('#' + containerID).css("width") + ";'></canvas>";



        x_html += "</td>"; //Canvas
        x_html += "<td p8style='padding:0px;min-width:" + scrollWidth + "px;width:" + scrollWidth + "px;max-width:" + scrollWidth + "px;padding-right:1px;vertical-align: top;'>"; //scroller
        x_html += "<div id='" + containerID + "_P8Spread_ScrollUp' class='P8Spread_ScrollUp' p8style='padding: 0px;min-height: 15px;min-width: " + scrollWidth + "px;display: inline-block;background-color: #efefef;background-color: #83b8d3;border: 1px solid #607c8b;box-shadow: inset 0px 0px 5px #e5e5e5;border-radius: 3px;'></div>";
        x_html += "<div  class='P8Spread_Scroll' p8style='padding:0px;min-width:100%;min-height:30px;background: #ececec;border: 1px solid #ececec;'><div id='" + containerID + "_P8Spread_Scroll' class='P8Spread_ScrollBar Vr' p8style='border-radius: 5px;min-height:30px;background: #bcc5ce;border-radius: 3px;background-image: -webkit-linear-gradient(top, #bcc5ce, #bcc5ce);background-image: -moz-linear-gradient(top, #bcc5ce, #bcc5ce);background-image: -ms-linear-gradient(top, #bcc5ce, #bcc5ce);background-image: -webkit-gradient(linear, 0 0, 0 100%, from (#bcc5ce), to(#bcc5ce));background-image: -webkit-linear-gradient(top, #bcc5ce, #bcc5ce);background-image: -o-linear-gradient(top, #bcc5ce, #bcc5ce);background-image: linear-gradient(top, #bcc5ce, #bcc5ce);box-shadow: inset 1px 1px 5px #bcc5ce;border: 1px solid #bcc5ce;'><div id='" + containerID + "_P8Spread_Scroll_handler' p8style='min-width:100%;min-height:100%'></div></div></div>"; //scrollbar
        x_html += "<div id='" + containerID + "_P8Spread_ScrollBot' class='P8Spread_ScrollBot' p8style='padding: 0px;min-height: 15px;min-width: " + scrollWidth + "px;display: inline-block;background-color: #efefef;background-color: #83b8d3;border: 1px solid #607c8b;box-shadow: inset 0px 0px 5px #e5e5e5;border-radius: 3px;'></div>";


        x_html += "</td>"; //scroller
        x_html += "</tr>"; //Content



        x_html += "<tr p8style='padding:0px;height:20px;' >"; //Bottom
        x_html += "<td id='" + containerID + "_SheetCon' class='P8Spread_SheetCon' p8style='border-top: 1px solid #dddddd !important;max-width:" + (scrollhwidth + 10) + "px;min-width:" + (scrollhwidth + 10) + "px;width:" + (scrollhwidth + 10) + "px;padding:0px;background-color:#dddddd;'>"; //sheet Tab
        x_html += "<canvas id='" + containerID + "_SheetConCanvas'  class='P8Spread_SheetConCanvas' p8style='min-height: 25px;max-height: 25px;max-width:" + scrollhwidth + "px;min-width:" + scrollhwidth + "px;width:" + scrollhwidth + "px; height: 25px;'></canvas>";
        x_html += "</td>"; //

        x_html += "<td class='scrollerH' colspan='2' p8style='padding:0px;background-color:#dddddd;min-width:120px'>"; //scroll  Horizontal
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
            console.log("perc:" + perc);


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
            if (scrolly <= 0) scrolly = 1;


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
                var scrollCount = 10;
                var colminus = 7;//aag scroll
                var rowcount = obj.ColumnConfig.length - colminus;
                if (rowcount <= 1) rowcount = 1;
                var t = parseInt($("#" + containerID + "_P8Spread_ScrollH_handler").css("left")._sfReplaceAll("px", ""));
                var h = $("#" + containerID + "_P8Spread_ScrollH_handler").outerWidth();
                var ch = $("#" + containerID + "_P8Spread_ScrollH_handler").parent().width();
                var ratio = parseFloat(h) / parseFloat(ch);
                var totaly = (t + h);
                var scrollx = rowcount * ((100 - (((ch - h) - (t)) / (ch - h) * 100)) / 100);
                scrollx = Math.floor(scrollx) + 1;
                if (scrollx >= rowcount) scrollx = rowcount;
                if (scrollx <= 0) scrollx = 1;

                //console.log(obj.ColumnConfig.length + " " + obj.startCol + " " + scrollx);

                if ((obj.ColumnConfig.length - colminus) < obj.startCol) {
                    return false;
                }


                obj.Book.ActiveSheet.ScrollRender(scrollx, undefined);

            }
        });
        //}, 1);


        //column config
        _sfLog("Column Config Start:");
        Spread_ColumnConfig = nwCreate2DArray(obj.ColumnConfig.length);
        Spread_Column_backgroundColor = [];
        for (var i = 0 ; i < obj.ColumnConfig.length; i++) {
            var conid = "backgroundColor";
            Spread_ColumnConfig[i][_sfGetFormatValueColumnChecker(conid)] = obj.ColumnConfig[i][conid];
            Spread_Column_backgroundColor.push(obj.ColumnConfig[i][conid]);
        }
        _sfLog("Column Config End:");




        canvasS.addEventListener('touchstart', function (evt) { handleTouchStart(evt, obj); return false; }, false);
        canvasS.addEventListener('touchmove', function (evt) { handleTouchMove(evt, obj); return false; }, false);

        //console.log("wrap code");
        setTimeout(function () {
            if (obj.AutoWrap == true && obj.AutoWrapRender == false) _sfAutoWrap(obj);
        }, 10);

        //console.log("containerID:" + containerID);
        _sfScrollUpdateSizing(containerID);
    }








    var conWidth = $('#' + containerID).width();
    var conheight = $('#' + containerID).height();


    var myCanvas = createHiDPICanvas(canvasID, conWidth, conheight, 2);

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
            heightrow = obj.Data[rowindexHe - 1].aagrowHeight || (def_Height + 0);
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


    //field render Background border
    for (var i = obj_startRow; i <= srow; i++) {

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
            current_Height = obj.Data[ix - 1].aagrowHeight || def_Height;
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
                            for (var icc = merge_ix[0].col ; icc <= merge_ix[0].col2; icc++) {

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
                            for (var icc = merge_ix[0].row ; icc <= merge_ix[0].row2; icc++) {

                                try { //get Row height if there is
                                    totalheight = obj.Data[icc].aagrowHeight || def_Height;
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
                for (var icc = merge_ix[0].col + 1 ; icc <= recol2; icc++) {

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
                for (var icc = curRow ; icc <= rerow2; icc++) {

                    try { //get Row height if there is
                        totalheight = obj.Data[icc].aagrowHeight || def_Height;
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
            current_Height = obj.Data[ix - 1].aagrowHeight || def_Height;
        } catch (err) { }



        for (var ic = obj_startCol; ic <= scolumn; ic++) {

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
                            for (var icc = merge_ix[0].col ; icc <= merge_ix[0].col2; icc++) {

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
                            for (var icc = merge_ix[0].row ; icc <= merge_ix[0].row2; icc++) {

                                try { //get Row height if there is
                                    totalheight = obj.Data[icc].aagrowHeight || def_Height;
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
                for (var icc = merge_ix[0].col + 1 ; icc <= recol2; icc++) {

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
                for (var icc = curRow ; icc <= rerow2; icc++) {
                    //totalheight = def_Height;
                    try { //get Row height if there is
                        totalheight = obj.Data[icc].aagrowHeight || def_Height;
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
    for (var i = 0 ; i < xFreezeRow - 1; i++) {
        current_Height = def_Height;
        try {
            current_Height = obj.Data[i].aagrowHeight || def_Height;
        } catch (err) { }
        HeadertotalHeight += current_Height + borderMargin;
    }
    contextSheet.fillStyle = obj.backgroundColor;
    contextSheet.fillRect(0, 0, canvasSheet.width, HeadertotalHeight);





    // print Freeze Objects BG
    var tempColumn = [];
    for (var ifr = 0; ifr < jsonFreezeBgList.length; ifr++) {
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


    // print Freeze Objects BG top freeze
    for (var ifr = 0; ifr < tempColumn.length; ifr++) {
        var myCell = tempColumn[ifr];
        _sfCellDrawBox(obj, contextSheetText, contextSheet, myCell);
    }
    // print Text and Border top freeze
    for (var ifr = 0; ifr < tempColumnBorder.length; ifr++) {
        var data = tempColumnBorder[ifr];
        var myCell = data.border;
        var option = data.text;
        _sfCellDrawText(canvasID, obj, contextSheet, myCell, option, selectedValue, borderMargin, contextCurrentSelected);
    }

    for (var ifr = 0; ifr < jsonFreezeTextList.length; ifr++) {
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
    for (var i = 0 ; i < xFreezeCol - 1; i++) {
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
    for (var i = obj_startRow ; i <= srow; i++) {

        //must check per rowheight
        current_Height = def_Height;


        if (ix2 < xFreezeRow) {
            ix = ix2;
            FreezeLineRow = sheetStart_y + current_Y + borderMargin + current_Height;
        }
        else {
            ix = i;
            //icx = icx - obj.FreezeCol;
        }
        ix2++;


        try { //get Row height if there is
            current_Height = obj.Data[ix - 1].aagrowHeight || def_Height;
        } catch (err) { }


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
    for (var ic = obj_startCol ; ic <= scolumn ; ic++) {

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

                    for (var ihx = CellStart; ihx <= CellStart + (CellNumber - 1) ; ihx++) {
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
        else {
            ;
        }

        CanvasTextWrapper(canvas, _sfGetCellNameEdit(obj, icx - 1), option, extraText, option2);

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
        for (var i = obj_startRow ; i <= srow; i++) {
            current_Height = def_Height;
            try {
                current_Height = obj.Data[i - 1].aagrowHeight || def_Height;
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
        for (var ic = obj_startCol ; ic <= scolumn ; ic++) {

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





    if (obj.havelistner == false) {
        _sfLog("add event:");

        obj.Events.push({ events: 1 });
        try {

        } catch (err) {
            _sfLog(err);
        }


        canvasSheet.addEventListener('mouseup', function (event) {
            obj.CellSelHover = false;
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
        canvasSheet.addEventListener('mousedown', SpreadMouseDown, false);
        function SpreadMouseDown(event) {
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
                            }
                            else {
                                obj.SetText(obj.CellSelected.col - 1, obj.CellSelected.row - 1, "1");
                            }
                        }
                    } catch (err) { }

                    _sfSelectionActivate(obj);

                    try {
                        obj.IsResizeHover = false;
                        obj.CellSelHover = false;
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

                return true;



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

            obj.currentCells.forEach(function (element) {
                //if (mousePos.y >= element.y && mousePos.y <= element.y + element.height && mousePos.x >= element.x-1 && mousePos.x <= element.x + 2

                if (obj.CellSelHover == true) {

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
                    for (var ic = obj.CellIndexes.Col ; ic <= obj.CellIndexes.Col2; ic++) {
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

                    if (isvalid) {
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
                    $("#" + obj.canvasID + "_vw_selectorCon").css("opacity", "0");
                    $("#" + obj.canvasID + "_vw_selectorCon").css("overflow", "hidden");
                    $("#" + obj.canvasID + "_vw_selectorCon .P8Spread_Input.hasDatepicker").hide();
                    $('#' + obj.canvasID + '_vw_inpText').focus();
                    //  setTimeout(function () {
                    //    _sfPaste(obj);
                    // }, 100);
                    // setTimeout(function () {
                    //     $(obj).click();
                    //}, 100);
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



            if (e.keyCode == 67 && e.ctrlKey) {
                //if ($(":focus").hasClass("P8Spread_Input")) {
                //    return true;
                //}
                console.log("copy");
                //if(isIe)
                // setTimeout(function () {
                //alert("CTRL+c");
                //if (isCopying == false) {
                //  isCopying = true;
                try {
                    textToPutOnClipboardHTML = "<table p8style=' border-collapse: collapse;'>";
                    _sfP8Spread_Copy(obj, e);
                    textToPutOnClipboardHTML += "</table>";
                    _sfLog("Length to be Copied:" + textToPutOnClipboardHTML.length);
                    _sfCopy(textToPutOnClipboardHTML, obj.canvasID);

                    //setTimeout(function () { isCopying = false; }, 1000);
                } catch (err) { isCopying = false; }
                //}
                // }, 10);
                //copyToClipboardCrossbrowser("wewe");
                return false;
            }
            else if (e.keyCode == 86 && e.ctrlKey) {
                if ($(":focus").hasClass("P8Spread_Input")) {
                    return true;
                }
                console.log("paste");

                setTimeout(function () {
                    _sfPaste(obj);
                }, 10);
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

    $('.P8Spread_Input.hasDatepicker').hide();


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
    for (var i = 0; i < xrows; i++) {
        var rowh = obj.Data[i].aagrowHeight || (def_Height + 0);
        xheight += rowh;
    }

    var xwidth = 0;
    //var xcols = 0;
    //if(obj.FreezeRow < obj.startRow)xrows = obj.startRow-obj.FreezeRow;
    // xcols = obj.startCol - 1;

    for (var i = obj.FreezeCol ; i < obj.startCol ; i++) {
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
    contextSheetText.font = myCell.fontsize + "px Arial";
    contextSheetText.fillStyle = "black";
    if (myCell.fillStyle == "inherit")
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



function _sfCellDrawText(canvasID, obj, contextSheet, myCell, option, selectedValue, borderMargin, contextCurrentSelected) {
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

    try {
        stringText = ""; //data[i-1][Object.keys(obj.Data[i-1])[ic-1]];
        stringText = obj.GetValue(curCol - 1, curRow - 1);//;data[i - 1][Object.keys(obj.Data[i - 1])[ic - 1]];

        try {
            var stringText2 = obj.GetText2(curCol - 1, curRow - 1);
            if ((stringText2 != "" && stringText2 != undefined && stringText2 != NaN))
                stringText = stringText2;
        } catch (err) {

        }

    } catch (err) { }

    ////format
    ////obj.CellSelected.col 
    stringText = _sfDataTypeFormater(obj, option, stringText, false);

    stringText = stringText.replaceAll("nwNewLine", "\n").replaceAll("anwNewXLineX", "\n");

    if (obj.ColumnConfig[curCol - 1].width < 5) {
        stringText = "";
    }



    if (option.tagText == "0") stringText = "";

    ////display format
    //if (option.dataType == "number") {
    //    stringText = _sfNumberFormat(stringText, 2, ".", ",");
    //}

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
    else {
        if ((option.currencyCode || "") != "") {
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
            if (getdataonly == false) xoption.textAlign = "right";
            stringText = _stringText;
        }
    }
    else if (finaldataType == "percent") {
        var _stringText = stringText.replaceAll(" ", "").replaceAll(",", "").replaceAll("%", "");
        if (!isNaN(_stringText) && (_stringText + "").trim() != "") {
            _stringText = _sfNumberFormat(_stringText, precision, ".", thousandSeparator);
            if (getdataonly == false) xoption.textAlign = "right";
            _stringText += " %";
            stringText = _stringText;
        }
    }
    else if (finaldataType == "percentvalue") {
        if (!isNaN(stringText) && (stringText + "").trim() != "") {
            stringText = stringText * 100.0;
            stringText = _sfNumberFormat(stringText, precision, ".", thousandSeparator);
            if (getdataonly == false) xoption.textAlign = "right";
            stringText += " %";
        }
    }
    else if (finaldataType == "number") {
        if (!isNaN(stringText) && (stringText + "").trim() != "") {
            // stringText = _sfNumberFormat(stringText, 2, '.', '');
            if (getdataonly == false) xoption.textAlign = "right";
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
                if (getdataonly == false) xoption.textAlign = "right";
            }
            // }

        }
        //stringText = _sfNumberFormat(stringText, 2, ".", ",");
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
            cell = _sfGetFormatValue(obj, config, type, true, _col, _row);
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
        cell = _sfGetFormatValue(obj, config, "Enabled", true, _col, _row);
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

        $('#' + obj.canvasID + '_vw_inp').unmask();
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


var textToPutOnClipboardHTML = "<table p8style=' border-collapse: collapse;'>";
function _sfP8Spread_Copy(obj, e, istart) {
    //var obj=mSpread;
    if (istart == undefined) istart = 0;
    var textToPutOnClipboard = "";
    var optionText = {}; var optionBox = {};


    var rowstart = obj.CellIndexes.Row + istart;
    var containerlen = 0;
    for (var i = rowstart; i <= obj.CellIndexes.Row2; i++) {
        if (i > rowstart) textToPutOnClipboard += "\r\n";
        textToPutOnClipboardHTML += "<tr>";
        for (var ic = obj.CellIndexes.Col ; ic <= obj.CellIndexes.Col2; ic++) {

            optionText = _sfSetFormatText(obj, optionText, ic, i);
            optionBox = _sfSetFormatBox(obj, optionBox, ic, i);


            var xvalue = obj.GetText(ic, i);
            if (ic > obj.CellIndexes.Col) textToPutOnClipboard += "\t";
            textToPutOnClipboard += xvalue;

            textToPutOnClipboardHTML += "<td style='background-color:" + optionBox.backgroundColor + ";";

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


        //var index = i;
        //if (obj.CellIndexes.Row + index + 10 == containerlen) {
        //    setTimeout(function () { _sfP8Spread_Copy(obj, e, index + 1) }, 5);
        //    break;
        //}

    }
    if (textToPutOnClipboard.endsWith("\r\n"))
        textToPutOnClipboard = textToPutOnClipboard.substring(0, textToPutOnClipboard.length - ("\r\n".length));


    //textToPutOnClipboardHTML += "</table>";

    //$("#" + obj.canvasID + "_copy").html(textToPutOnClipboardHTML);
    //_sfCopy(obj.canvasID + "_copy");

    //_sfCopy(textToPutOnClipboardHTML);

}
function _sfCopy(html, canvasID) {
    //var aux = document.createElement("div");
    var aux = document.createElement("div");
    try {
        $("#" + canvasID + "_copyX").remove();
    } catch (err) { }
    aux.id = canvasID + "_copyX";
    //$(aux).insertAfter("#" + canvasID + "_copy");
    $("#" + canvasID + "_vw_selectorCon").prepend(aux);
    $("#" + canvasID + "_vw_selectorCon").css("opacity", "1");
    $("#" + canvasID + "_vw_selectorCon").css("height", "inherit");
    $("#" + canvasID + "_vw_selectorCon").css("width", "inherit");


    //var aux = document.getElementById(canvasID +"_copy");

    aux.setAttribute("contentEditable", true);
    aux.innerHTML = html;//document.getElementById(element_id).innerHTML;
    //aux.setAttribute("onfocus", "document.execCommand('selectAll',false,null)");
    //document.body.appendChild(aux);

    aux.focus();
    document.execCommand('selectAll', false, null);
    document.execCommand("copy");
    //document.body.removeChild(aux);
    setTimeout(function () { $(aux).remove(); }, 100);
    $("#" + canvasID + "_vw_selectorCon").css("opacity", "0");
    $("#" + canvasID + "_vw_selectorCon").css("height", "0");
    $("#" + canvasID + "_vw_selectorCon").css("width", "0");
    $("#" + obj.canvasID + "_vw_selectorCon .P8Spread_Input.hasDatepicker").hide();
    _sfLog("Copied Successful");

}

var P8Paster = false;
function _sfPaste(obj) {

    if (P8Paster == true) return;
    var data = $('#' + obj.canvasID + '_vw_inpText').val();

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
            obj.Book.ActiveSheet.SetText(startx, starty, cells[x], "text", true);
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

    var config = [];
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

            var xtempvalue = _sfGetFormatValue(obj, config, "backgroundColor", true, icol, irow);
            if (xtempvalue != undefined && xtempvalue != "inherit") {
                tempvalue = xtempvalue;
            }

            if (tempvalue != undefined) { option.fillStyle = tempvalue; option.backgroundColor = tempvalue; }
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }


        try {
            tempvalue = _sfGetFormatValue(obj, config, "backgroundColorPercentValue", true, icol, irow);
            if (tempvalue != undefined) option.bgcolorPercValue = tempvalue || 0;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }
        try {
            tempvalue = _sfGetFormatValue(obj, config, "backgroundColorPercent", true, icol, irow);
            if (tempvalue != undefined) option.bgcolorPerc = tempvalue || "green";
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }




    }
    else {




        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderColorTop", true, icol, irow);
            if (tempvalue != undefined) option.borderColorTop = tempvalue || obj.gridlLineColor;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderColorBottom", true, icol, irow);
            if (tempvalue != undefined) option.borderColorBottom = tempvalue || obj.gridlLineColor;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderColorLeft", true, icol, irow);
            if (tempvalue != undefined) option.borderColorLeft = tempvalue || obj.gridlLineColor;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderColorRight", true, icol, irow);
            if (tempvalue != undefined) option.borderColorRight = tempvalue || obj.gridlLineColor;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderStyleTop", true, icol, irow);
            if (tempvalue != undefined) option.borderStyleTop = tempvalue;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderStyleBottom", true, icol, irow);
            if (tempvalue != undefined) option.borderStyleBottom = tempvalue;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderStyleLeft", true, icol, irow);
            if (tempvalue != undefined) option.borderStyleLeft = tempvalue;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderStyleRight", true, icol, irow);
            if (tempvalue != undefined) option.borderStyleRight = tempvalue;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderWidthTop", true, icol, irow);
            if (tempvalue != undefined) option.borderWidthTop = tempvalue || 1;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderWidthBottom", true, icol, irow);
            if (tempvalue != undefined) option.borderWidthBottom = tempvalue || 1;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderWidthLeft", true, icol, irow);
            if (tempvalue != undefined) option.borderWidthLeft = tempvalue || 1;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

        try {
            tempvalue = _sfGetFormatValue(obj, config, "borderWidthRight", true, icol, irow);
            if (tempvalue != undefined) option.borderWidthRight = tempvalue || 1;
            tempvalue = undefined; tempvalueX = undefined;
        } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

    }


    return option;
}

// getconfig
function _sfSetFormatText(obj, option, icol, irow) {
    ;
    //var option ={};
    var config = [];
    var tempvalue = undefined;
    var tempvalueX = undefined;
    var temp1 = "";
    var temp2 = "";
    var temp3 = "";
    var temp4 = "";

    try {
        config = obj.Data[irow][_sfGetCellName(obj, icol)].Config;
    } catch (err) {

    }


    // font size,family,bold
    try {
        temp1 = _sfGetFormatValue(obj, config, "bold", true, icol, irow);
        temp2 = _sfGetFormatValue(obj, config, "fontSize", true, icol, irow) + "px";
        temp3 = _sfGetFormatValue(obj, config, "fontFamily", true, icol, irow);
        temp4 = _sfGetFormatValue(obj, config, "italic", true, icol, irow);
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
        tempvalue = _sfGetFormatValue(obj, config, "underline", true, icol, irow);
        if (tempvalue != undefined) option.textDecoration = tempvalue;
        tempvalue = undefined; tempvalueX = undefined;
    } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

    // text align
    try {
        tempvalue = _sfGetFormatValue(obj, config, "textAlignment", true, icol, irow);
        if (tempvalue != undefined) { option.textAlign = tempvalue; option.textAlignment = tempvalue; }
        tempvalue = undefined; tempvalueX = undefined;
    } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

    // text vertical align
    try {
        tempvalue = _sfGetFormatValue(obj, config, "textVertical", true, icol, irow);
        if (tempvalue != undefined) { option.verticalAlign = tempvalue; option.textVertical = tempvalue; }
        tempvalue = undefined; tempvalueX = undefined;
    } catch (err) { tempvalue = undefined; tempvalueX = undefined; }


    // text color
    try {
        tempvalue = _sfGetFormatValue(obj, config, "textColor", true, icol, irow);
        if (tempvalue != undefined) { option.color = tempvalue; option.textColor = tempvalue; }
        tempvalue = undefined; tempvalueX = undefined;
    } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

    // dataType
    try {
        tempvalue = _sfGetFormatValue(obj, config, "dataType", true, icol, irow);
        if (tempvalue != undefined) { option.dataType = tempvalue; }
        tempvalue = undefined; tempvalueX = undefined;
    } catch (err) { tempvalue = undefined; tempvalueX = undefined; }

    // dataStyle
    try {
        tempvalue = _sfGetFormatValue(obj, config, "dataStyle", true, icol, irow);
        if (tempvalue != undefined) { option.dataStyle = tempvalue; }
        tempvalue = undefined; tempvalueX = undefined;
    } catch (err) { tempvalue = undefined; tempvalueX = undefined; }


    // currencyCode
    try {
        tempvalue = _sfGetFormatValue(obj, config, "currencyCode", true, icol, irow);
        if (tempvalue != undefined) { option.currencyCode = tempvalue; }
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

function _sfGetFormatValue(obj, config, conid, isnull, colselected, rowselected) {
    var value = undefined;
    var len = -1;
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

                if ((datatype == "currency" || datatype == "percentvalue" || datatype == "percent"))
                    value = "right";
            }

        } catch (err) { value = ""; }
    }

    try{
        value = value.toLowerCase();
        value = value.replace(" !important","");
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

            if (myCell.row == undefined ) {
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
                    for (var k = 0; (context.measureText(testString + word[k]).width <= MAX_TXT_WIDTH) && (k < word.length) ; k++) {
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
    config[_id] = value;
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
        isContinue = func_nwGrid_InsertValidation();
    } catch (err) {
    }
    if (isContinue) {
        var xrow = P8DataList[spreadID][0].sheet.ActiveSheet.GetSelectedIndexes().row;
        var xcol = P8DataList[spreadID][0].sheet.ActiveSheet.GetSelectedIndexes().col;
        P8DataList[spreadID][0].sheet.ActiveSheet.RowInsert(xrow, false);
        try { isContinue = func_nwGrid_InsertDone(); } catch (err) { }
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
        isContinue = func_nwGrid_CopyRowValidation();
    } catch (err) {
    }
    if (isContinue) {
        var xrow = P8DataList[spreadID][0].sheet.ActiveSheet.GetSelectedIndexes().row;
        var xcol = P8DataList[spreadID][0].sheet.ActiveSheet.GetSelectedIndexes().col;

        var rowcopy = JSON.parse(JSON.stringify(P8DataList[spreadID][0].sheet.ActiveSheet.Data[xrow]));
        P8DataList[spreadID][0].sheet.ActiveSheet.RowInsert(xrow, false);
        P8DataList[spreadID][0].sheet.ActiveSheet.Data[xrow] = rowcopy;


        try { isContinue = func_nwGrid_CopyRowDone(); } catch (err) { }
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
        isContinue = func_nwGrid_DeleteValidation();
    } catch (err) {
    }
    if (isContinue) {
        var xrow = P8DataList[spreadID][0].sheet.ActiveSheet.GetSelectedIndexes().row;
        var xcol = P8DataList[spreadID][0].sheet.ActiveSheet.GetSelectedIndexes().col;
        P8DataList[spreadID][0].sheet.ActiveSheet.RowDelete(xrow);
        try { func_nwGrid_DeleteDone(); } catch (err) { }
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

    if (SpreadID == null || SpreadID == undefined || indexes.col < 0) {
        MessageBox("Please Select Cell", "", "", "#" + $(this).parents(".P8Spread").attr("id") + " input.nwgrid_SearchNext");
        return false;
    }
    //P8_SpreadGetBook(SpreadID).ActiveSheet.GetSelectedIndexes()

    if ($(this).parents(".P8Spread").find(".nwgrid_SearchNext").val() == "") {
        MessageBox("Please enter Keyword", "", "", "#" + $(this).parents(".P8Spread").attr("id") + " input.nwgrid_SearchNext");
        return false;
    }

    var strToSearch = $(this).parents(".P8Spread").find(".nwgrid_SearchNext").val();
    var isfind = _sfFindSearch(SpreadID, strToSearch);

    if (isfind == false)
        MessageBox("Cannot find :[" + strToSearch + "]", "", "", "#" + $(this).parents(".P8Spread").attr("id") + " input.nwgrid_SearchNext");


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
    value = (value || "").toLocaleLowerCase();
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
var dataload = "<div class='nwGridDataBatchLoading'><div class='loadr'><div class='loadrC'><div class='loadCon'><div class='loadrLine'></div></div><div class='loadrText'><br><span class='loadPerc'>10%</span><span class='loadcurrent'>0</span> of <span class='loadtotal'>0</span></div></div></div></div>"
function _sfLoading(canvasID, total, current) {
    // $('#' + canvasID).find('.nwGridDataBatchLoading').remove();
    if ($('#' + canvasID).find('.nwGridDataBatchLoading').html() == undefined)
        $('#' + canvasID).append(dataload);

    var obj = $('#' + canvasID).find('.nwGridDataBatchLoading');
    obj.find('.loadtotal').text(total);
    _sfLoadingUpdate(canvasID, current);
}

function _sfLoadingUpdateAppend(canvasID, currentAdd) {
    var obj = $('#' + canvasID).find('.nwGridDataBatchLoading');
    var current = 0;
    current = parseInt(obj.find('.loadcurrent').text());
    current += currentAdd;

    //try {
    //    var obook = P8DataList[canvasID][0].sheet.ActiveSheet.Book;
    //    obook.Book.curCount += currentAdd;
    //} catch (err) { }


    _sfLoadingUpdate(canvasID, current);
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
    var xcountval = 0;
    var xcountvalA = 0;

    var xmax = -1; var ymax = -1;
    var xmin = -1; var ymin = -1;

    for (var i = 0; i < ExFormulaArry.length; i++) {
        xvalueTemp = ExFormulaArry[i];
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
    else if (crFormulaFunc.toUpperCase() == "MAX") xvalF = xmaxval + "";
    else if (crFormulaFunc.toUpperCase() == "MIN") xvalF = xminval + "";

    else if (crFormulaFunc.toUpperCase() == "AVERAGE") xvalF = "(" + xvalF + ")/" + (xcountval == 0 ? 1 : xcountval);
    else if (crFormulaFunc.toUpperCase() == "AVG") xvalF = "(" + xvalF + ")/" + (xcountval == 0 ? 1 : xcountval);



    xvalF = "(" + xvalF + ")";


    xvalue = eval(xvalF);


    return xvalue;
}


function nwNumber(x) {
    var xer = parseFloat(x.replace(/,/g, ""));
    var xers = 0;
    if (!isNaN(xer) && xer != "") xers = xer;
    return xers;
}


function cellA1ToIndex(cellA1, index) {
    cellA1 = (cellA1 + "").trim();
    // Ensure index is (default) 0 or 1, no other values accepted.
    index = index || 0;
    index = (index == 0) ? 0 : 1;

    // Use regex match to find column & row references.
    // Must start with letters, end with numbers.
    // This regex still allows induhviduals to provide illegal strings like "AB.#%123"
    var match = cellA1.match(/(^[A-Z]+)|([0-9]+$)/gm);

    if (match.length != 2) throw new Error("Invalid cell reference");

    var colA1 = match[0];
    var rowA1 = match[1];

    return {
        row: rowA1ToIndex(rowA1, index),
        col: colA1ToIndex(colA1, index)
    };
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
        MessageBox("No changes have been made.");
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

    for (var i = 0 ; i < spread.ColumnConfig.length; i++) {
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
            MessageBox("No changes have been made.");
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


    var cell = sheet.GetSelectedIndexes();
    var currow = cell.row;

    var addtoListTableRec = $('#dimTableLookUp');
    if (addtoListTableRec.html() == undefined)
        addtoListTableRec = $('#dimTableLookUpCon tbody');


    for (var i = 0; i < jsonTable.length; i++) {
        var crnwTRtemp = [];

        var collength = sheet.GetMaxCol();
        for (var i2 = 0; i2 < collength; i2++) {
            crnwTRtemp.push("");
        }
     
        if (addtoListTableRec.find(".nwlookupgridcheck:eq(" + i + ")").prop("checked") == false)
            continue;

        crnwTRtemp = nwGrid_AddtoListDone(p8Spread_CurBook, crnwTRtemp, addtoListTableRec, i);

        if (crnwTRtemp == null || crnwTRtemp == undefined)
            continue;


        sheet.RowInsert(currow, false, true);
        for (var i2 = 0; i2 < collength; i2++) {
            sheet.SetText(i2, currow, crnwTRtemp[i2]);
        }
        sheet.CellIndexes.Row += 1;
        sheet.CellIndexes.Row2 += 1;
        currow++;


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
    try {
        P8DataList[canvasID][0].sheet.ActiveSheet.prevEvenRow = row;
        P8DataList[canvasID][0].sheet.ActiveSheet.prevEvenCol = col;

        var xclass = P8DataList[canvasID][0].sheet.ActiveSheet.ColumnConfig[col].Class.trim();
        var lugid = P8DataList[canvasID][0].sheet.ActiveSheet.ColumnConfig[col].Attribute.trim();
        try {
            lugid = lugid.split("@#aag#@")[1];
        } catch (err) { }
        if (xclass == "aagnwlookupgrid") {
            lookUpCustomize(lugid, 1);
        }
    } catch (err) { }

    return p8Spread_DblClick(canvasID, row, col);
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
        return p8Spread_Change(canvasID, row, col);
    }
}
function p8Spread_ClickT(canvasID, row, col) {
    try {
        P8DataList[canvasID][0].sheet.ActiveSheet.prevEvenRow = row;
        P8DataList[canvasID][0].sheet.ActiveSheet.prevEvenCol = col;
    } catch (err) { }

    return p8Spread_Click(canvasID, row, col);
}
function p8Spread_FocusT() {
    try {
        P8DataList[canvasID][0].sheet.ActiveSheet.prevEvenRow = row;
        P8DataList[canvasID][0].sheet.ActiveSheet.prevEvenCol = col;
    } catch (err) { }

    return p8Spread_Focus(canvasID, row, col);
}




var P8Spread_Currency = {
    fil_PH: { code: "fil_PH", symbols: "₱", align: "L", description: "Filipino", remarks: "Philippines Peso - Currency", format: '_-[$₱-fil-PH]* #,##0.00_-;-[$₱-fil-PH]* #,##0.00_-;' }
    , en_PH: { code: "en_PH", symbols: "₱", align: "L", description: "English (Philippines)", remarks: "Philippines Peso - Currency", format: '_-[$₱-fil-PH]* #,##0.00_-;-[$₱-fil-PH]* #,##0.00_-' } //, format: '_-[$₱-en-PH]* #,##0.00_-;-[$₱-en-PH]* #,##0.00_-;_-[$₱-en-PH]* " - "??_-;_-@_-' }
    , en_SG: { code: "en_SG", symbols: "$", align: "L", description: "English (United States)", remarks: "United States - Currency", format: '_-[$$-en-SG]* #,##0.00_-;-[$$-en-SG]* #,##0.00_-;' }
    , CHF_fr_CH: { code: "CHF_fr_CH", symbols: "CHF", align: "R", description: "CHF French (Switzerland)", remarks: "Switzerland - Currency", format: '_-* #,##0.00 [$CHF-fr-CH]_-;-* #,##0.00 [$CHF-fr-CH]_-;' }
};


