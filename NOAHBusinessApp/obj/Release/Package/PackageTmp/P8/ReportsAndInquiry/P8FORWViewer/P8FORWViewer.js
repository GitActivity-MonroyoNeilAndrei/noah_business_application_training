var pageTitle = "FORW";
var _canvasID;
var _row;
var _col;

var _FORWViewer_DataSource;
var _FORWViewer_DataSourceTypeHdr;
var _FORWViewer_DataSourceTypeLin;
var _FORWViewer_DataSourceTypeColumn;
//for lookup temp used in lookup done.
var _FORWViewer_LookupTemp = [];


var _p8forwjsonlist = [
    { code: "p8forwsbevent" },
    { code: "p8forwsbhdr" },
    { code: "p8forwsbcolumn"},
    { code: "p8forwsbfilter"},
    { code: "p8forwsbparam"},
    { code: "p8forwsbsort"},
    { code: "p8forwsbdrill" },
];
var _p8forwjsondata = {};
var _p8forwjsonfrommain = [];


var _jsondatasource = [];
var _jsonlookupcolumnindex = [];


var nwGridCon_databindings_Book;
var nwGridCon_databindings_Sheet;
var nwGridCon_databindings_column_Book;
var nwGridCon_databindings_column_Sheet;


var startindex3 = 0,
      SPR_DB_PARAMETER = ++startindex3,
      SPR_DB_VALUE = ++startindex3,
      SPR_DB_CELLREFERENCE = ++startindex3;

var startindex4 = 0,
     SPR_DBC_SHOW = ++startindex4,
     SPR_DBC_PRIORITYLEVEL = ++startindex4,
     SPR_DBC_COLUMNNAME = ++startindex4,
     SPR_DBC_COLUMNDISPLAY = ++startindex4;



var isView = false;

function func_Reload() {
    

    crLnk = GetCurrentURL() + "P8FORWViewer_Gateway";
    crLnkGateKey = "P8FORWViewer";
    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    $("#txt-P8FORW-code").val(getParameterByName("fid"));
    isView = getParameterByName("v").toString().toLowerCase()== "yes" ? true : false;

    var textTitle = "FORW";
    var classLogo = "logo";
    var classLogoImg = "p8";
    $("#sd-headerbuttons").append('<div class="nwe-btn selected ' + classLogo + '" data-content="customToolbox"><span class="' + classLogoImg + '">' + textTitle + '</span></div>');

    setTimeout(function () {
        $('[data-content="customToolbox"].nwe-btn.' + classLogo).click();
    }, 2000);
    return isContinue;
}

//reload the page
//$(window).on('beforeunload', function (event) {
//        var strData = JSON.stringify(_p8forwjsonfrommain);
//        window.postMessage(strData, window.location.href);
//        setTimeout(function () {
//            window.location.reload();
//        }, 2000);
//});
//window.addEventListener('beforeunload', function (event) {
//    var strData = JSON.stringify(_p8forwjsonfrommain);
//    window.postMessage(strData, window.location.href);
//    setTimeout(function () {
//        window.location.reload();
//    }, 2000);
//});
//used for debug
function ForwViewer_GetDataDebug() {
    var strData = JSON.stringify(_p8forwjsonfrommain)
    console.log(`
    _p8forwjsonfrommain = ${strData}
    try {
        $("#txt-P8FORW-code").val(_p8forwjsonfrommain[0].code)
    } catch (ex) { }
    actforw_mainload();`);
}

$(window).on('message', function (evt) {
    if (evt.originalEvent.origin == window.origin) {
        var strData = evt.originalEvent.data;
        _p8forwjsonfrommain = JSON.parse(strData)
        try {
            $("#txt-P8FORW-code").val(_p8forwjsonfrommain[0].code)
        } catch (ex) { }
        actforw_mainload();
    }
});

function ForwViewer_LoadDrill() {
    //from main load
    try {
        for (var i = 0; i < _p8forwjsonfrommain[0].data.length; i++) {
            var item = _p8forwjsonfrommain[0].data[i];
            var celldestination = p8Spread_GetJsonValue(item, "celldestination");
            var celldestinationvalue = p8Spread_GetJsonValue(item, "celldestinationvalue");
            //var cellsource = p8Spread_GetJsonValue(item, "cellsource");
            var cellindex = p8Spread_CellToRowCol(celldestination)
            mSpreadBook.ActiveSheet.SetValue(cellindex.col, cellindex.row, celldestinationvalue);
        }
        if (_p8forwjsonfrommain[0].data.length > 0) {
            ForwViewer_Refresh();
        }
    } catch (ex) { }

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

P8.SpreadSheet.prototype.GetFORWFormula = function (c, r) {
    var colcell = p8_NumberToCell(c + 1);
    return this.Data[r][colcell].FORWFormula || "";

}
P8.SpreadSheet.prototype.SetFORWFormula = function (c, r, data) {
    var colcell = p8_NumberToCell(c + 1);
    this.Data[r][colcell].FORWFormula = data;
}

$(document).on("click", "#p8forwviewer-btnRefresh", function () {
    ForwViewer_Refresh();
});
function ForwViewer_Refresh() {
    nwLoading_Start("p8forwviewer-btnRefresh", crLoadingHTML);
    p8forw_EventHandler(undefined, undefined, undefined, "ontbrefresh")
    setTimeout(function () {
        nwLoading_End('p8forwviewer-btnRefresh')
    }, 500)
}
$(document).on("click", "#p8forwviewer-btnExport", function () {
    fn_ExportGrid("mSpread");
});

$(document).on("click", "#p8forwviewer-btnClear", function () {
    actforw_mainload();
});

function actforw_mainload() {
    if (!p8Spread_IsNull($("#txt-P8FORW-code").val())) {
        nwLoading_Start("actforw_mainload", crLoadingHTML);
        cust_GetPara();
        func_ActionDriven("actforw_mainload", false);
    }
}


function cust_GetPara() {
    nwParameter_Add("txt-P8FORW-code", $("#txt-P8FORW-code").val());
    nwParameter_Add("isView",isView);
   
    
}

//function func_LookUpInitialize(dimP) {
//    cust_GetPara();
//    var p8dwsource = $("#"+dimP).attr("p8dwsource") ||"";
//    var p8dwcolumn = $("#"+dimP).attr("p8dwcolumn") ||"";
//    if(p8dwsource != ""){
//        var P8FORWViewer_jsondata = P8FORWViewer_get_data_from_json(p8dwsource,p8dwcolumn);
//        nwParameter_Add("P8FORWViewer_jsondata",JSON.stringify(P8FORWViewer_jsondata));
//    }
  

//    if (dimP == "lug-datasource-type") {
//        nwParameter_Add("P8FORWViewer_json_type",JSON.stringify(_forw_json_centralize.type));
//    }
//    else if (dimP == "lug-datasource-source") {

//        ////var datasource = _forw_json_centralize.datasource;
//        //var maxrow = nwGridCon_datasource_Book.ActiveSheet.GetMaxRow();
//        //    var json_source = [];
//        //    // Extract "table" values from each object and store them in the tableNames array
//        //    for (var i = 0; i < maxrow; i++) {
//        //        var source =  nwGridCon_datasource_Book.ActiveSheet.GetValue(SPR_DA_SOURCE - 1 ,i) || "";
//        //        var type =  nwGridCon_datasource_Book.ActiveSheet.GetValue(SPR_DA_TYPE - 1 ,i) || "";
//        //        if(type == ""){continue;}
//        //        json_source.push({source});
//        //    }
//        //    // Create a new JSON object containing only the extracted table names
//        //    nwParameter_Add("P8FORWViewer_json_source",JSON.stringify(json_source));


//        var col = nwGridCon_datasource_Book.ActiveSheet.CellSelected.col - 1;
//        var row = nwGridCon_datasource_Book.ActiveSheet.CellSelected.row - 1;

//        var type = nwGridCon_datasource_Book.ActiveSheet.GetText((SPR_DA_TYPE - 1), row);
//        nwParameter_Add("type", type);
//        codelist(nwGridCon_datasource_Book, SPR_DA_SOURCE, "source");
//    }
    
//    if (dimP == "lug-datacondition-source") {

//        //P8FORWViewer_get_datasource_source();

//        //nwParameter_Add("P8FORWViewer_json_type",JSON.stringify(_forw_json_centralize.type));
//        //_forw_json_centralize.datasource

//    }
//    if (dimP == "lug-datacondition-value") {
//        nwParameter_Add("idvallug-datacondition-source", $("idvallug-datacondition-source").val());
       
//    }
//    else if (dimP == "lug-datacondition-operation") {
//        nwParameter_Add("P8FORWViewer_json_operation",JSON.stringify(_forw_json_centralize.operation));
       
//    }
//    else if (dimP == "lug-P8FORWViewer-lookup"
//        ||dimP == "lug-P8FORWViewer-addtolist") {
//            var filterValues = ['U', 'V']; // Values to filter by

//            var json_source = _forw_json_centralize.datasource
//                .filter(function(item) {
//                  return filterValues.includes(item.type);
//                })
//                .map(function(item) {
//                  return { source: item.source };
//                });
//            nwParameter_Add("P8FORWViewer_json_source",JSON.stringify(json_source));

//    }else if (dimP == "lug-P8FORWViewer-adddatabindings"){

//        var code = $("#txt-P8FORWViewer-code").val();
//        var P8FORWViewer_jsonname = "databindings"

//        var json = nwJson(_forw_json, "code", code, false);
//        var jsondata = json[0][P8FORWViewer_jsonname];
//        jsondata.sort((a, b) => a.sort - b.sort);
//        var jsondata_clone = [];
//        $.each(jsondata, function (i, item) {
//            var json_spread = JSON.parse(item.json_spread)
//            var jsonhdr = json_spread.jsonhdr
//            //var bindingscode = jsonhdr.bindingscode;
//            //var bindingsname = jsonhdr.bindingsname;
//            //var source = jsonhdr.source;
//            jsondata_clone.push({...jsonhdr})
//        });

//        //var json_adddatabindings = jsondata.map(({ code, bindingscode, bindingsname }) => ({ code, bindingscode, bindingsname }));

//        var json_adddatabindings = jsondata_clone.map(({  bindingscode, bindingsname , source }) => ({ 
//            "Bindings Code": bindingscode,
//            "Bindings Name": bindingsname,
//            "Source": source,
//            // Include other properties if needed
//        }));


//        nwParameter_Add("P8FORWViewer_json_adddatabindings",JSON.stringify(json_adddatabindings));
        
//    }else if (dimP == "lug-databindings-source"){
//        P8FORWViewer_get_datasource_source();
//    }
//    else if (dimP == "lug-datacondition-source"){
//        P8FORWViewer_get_datasource_source();
//    }

//}
//function P8FORWViewer_get_datasource_source(){
//    var code = $("#txt-P8FORWViewer-code").val();
//    var P8FORWViewer_jsonname = "datasource"
//    var json = nwJson(_forw_json, "code", code, false);
//    var jsondata = json[0][P8FORWViewer_jsonname][0]["json_spread"];
//    var P8FORWViewer_config = {
//        objkey: "jsonlin",
//    }
//    var P8FORWViewer_columnindex = []
//    //P8FORWViewer_columnindex.push({Code:SPR_DA_SOURCE,Description:SPR_DA_TYPE});
//    P8FORWViewer_columnindex.push({Source:SPR_DA_SOURCE});
//    var P8FORWViewer_datatable = P8FORWViewer_json_to_datatable(jsondata,P8FORWViewer_config,P8FORWViewer_columnindex);

//    nwParameter_Add("P8FORWViewer_datasource_source",JSON.stringify(P8FORWViewer_datatable));


//}

function codelist(Grid, index, param) {
    var list = "";
    var rows = Grid.ActiveSheet.GetMaxRow();
    for (var i = 0; i <= rows; i++) {
        list += Grid.ActiveSheet.GetText(index - 1, i) + '|';
    }
    nwParameter_Add(param, list);
}


function func_WindowCloseTrigger(verID) {
    var isContinue = false;
    
    //if (verID == "frm-popup-P8FORWViewer-vwdatasource") {
    //    P8FORWViewer_datasource_close();
    //    isContinue = true;
    //}
    //else if (verID == "frm-popup-P8FORWViewer-vwdatacondition") {
    //    P8FORWViewer_datacondition_close();
    //    isContinue = true;
    //}else if (verID == "frm-popup-P8FORWViewer-vwdatabindings") {
    //    P8FORWViewer_databindings_close();
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


function convertKeysToLowerCase(obj) {
    if (Array.isArray(obj)) {
        return obj.map(convertKeysToLowerCase); // Recursively convert keys for each element in the array
    } else if (typeof obj === 'object' && obj !== null) {
        const newObj = {};

        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const newKey = key.toLowerCase();
                newObj[newKey] = convertKeysToLowerCase(obj[key]);
            }
        }

        return newObj;
    } else {
        return obj; // Base case: return non-object values as is
    }
}

function LoadDataSource(jsondatasource) {
    _jsondatasource = convertKeysToLowerCase(jsondatasource);
}

function ToolLoad(json_forw) {
    console.log("pumasok 2");
    var code = $("#txt-P8FORWViewer-code").val();

    $.each(json_forw, function (i, item) {
        mSpreadBook.SetSpreadConfig(item.json_spread);
    });
    setTimeout(function () {
        mSpreadBook.ActiveSheet.RenderStatus = true;
        mSpreadBook.ActiveSheet.Refresh();
    }, 100);



    try {
        for (var i = 0; i < _p8forwjsonlist.length; i++) {
            var item = _p8forwjsonlist[i];
            var code = p8Spread_GetJsonValue(item,"code");
            var data = mSpreadBook.ActiveSheet.GetJSONData(Spread_ALLCOL, Spread_ALLROW,code,true);
            _p8forwjsondata[code] = data
        }
    } catch (ex) { }


    try {
        for (var i = 0; i < _p8forwjsondata["p8forwsbhdr"].length; i++) {
            var item = _p8forwjsondata["p8forwsbhdr"][i];
            var col = item.col;
            var row = item.row;
            mSpreadBook.ActiveSheet.SetText2(col, row, "");
        }
    } catch (ex) { }
    try {
        for (var i = 0; i < _p8forwjsondata["p8forwsbdrill"].length; i++) {
            var item = _p8forwjsondata["p8forwsbdrill"][i];
            var col = item.col;
            var row = item.row;
            mSpreadBook.ActiveSheet.SetText2(col, row, "");
        }
    } catch (ex) { }
    try {
    //Table List
    for (var itbl = 0; itbl < mSpreadBook.ActiveSheet.TableList.length; itbl++) {
        var item = mSpreadBook.ActiveSheet.TableList[itbl];
        item.col_save = item.col
        item.col2_save = item.col2
        item.row_save = item.row
        item.row2_save = item.row2
    }
    } catch (ex) { }
    nwLoading_Start("actforw_getdatasource", crLoadingHTML);
    nwParameter_Add("jsonp8forwsbhdr", JSON.stringify(_p8forwjsondata["p8forwsbhdr"]));
    func_ActionDriven("actforw_getdatasource", false);
   // p8forw_EventHandler("mSpread", _row, _col,"onload")
    $(document).find('.p8icon-ani-box').fadeOut(1000);
}

function replaceDynamicPattern(inputString, fromPattern, toPattern) {
    var parts = inputString.split(/\s*,\s*/);
    for (var i = 0; i < parts.length; i++) {
        if (parts[i] === fromPattern) {
            parts[i] = (toPattern === "") ? "''" : toPattern.trim();
        }
    }
    var modifiedString = parts.join(', ');
    return modifiedString;
}

function addSingleQuotes(originalString) {
    // Split the original string by commas
    var array = originalString.split(',');

    // Map each element to a new string with single quotes
    var newArray = array.map(function (element) {
        return "'" + element + "'";
    });

    // Join the elements back together with commas
    var resultString = newArray.join(',');

    return resultString;
}



function p8forw_replace(key,data) {
    if (data.includes(key) && key == "@cell") {
        var keylen = key.length;
        var haskey = true;
        try{
            while (haskey) {
                var endIndex = data.indexOf(key);
                var str = data.substring(0, endIndex);
                var indexbetween = reverseString(str).indexOf("@");
                var startIndex = endIndex - indexbetween - 1;
                var cell = data.substring(startIndex + 1, endIndex);
                var strto = cell;
                var celllist = forw_listCells(cell)//celltemp.split(",")
                //var cellData = []//celltemp.split(",")
                for (var i = 0; i < celllist.length; i++) {
                    var cellarr = celllist[i].toUpperCase();
                    var col = p8Spread_CellToRowCol(cellarr).col
                    var row = p8Spread_CellToRowCol(cellarr).row
                    var strtoarr = mSpreadBook.ActiveSheet.GetValue(col, row);
                    strtoarr = addSingleQuotes(strtoarr)
                    //cellData.push({from:cellarr,to:strto});
                    strto = replaceDynamicPattern(strto,cellarr,strtoarr);
                }
                var strfrom = data.substring(startIndex, endIndex + keylen);
                data = data.replaceAll(strfrom, strto);
                //for (var i = 0; i < cellData.length; i++) {
                //    data = data.replaceAll(strfrom, strto);
                //}   

                // Continue searching for the next occurrence
                if (!data.includes(key)) {
                    haskey = false;
                }
            }
        }catch(ex){}
    } else if (data.includes(key) && key == "@hide") {
        var keylen = key.length;
        var haskey = true;
        try {
            while (haskey) {
                var endIndex = data.indexOf(key);
                var str = data.substring(0, endIndex);
                var indexbetween = reverseString(str).indexOf("@");
                var startIndex = endIndex - indexbetween - 1;
                var strto = data.substring(startIndex + 1, endIndex);
                var strfrom = data.substring(startIndex, endIndex + keylen);
                data = data.replaceAll(strfrom, strto);

                // Continue searching for the next occurrence
                if (!data.includes(key)) {
                    haskey = false;
                }
            }
        } catch (ex) { }
    }
    return data;
}


function reverseString(inputString) {
    return inputString.split('').reverse().join('');
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

function deepCopy(originalObject) {
    // Serialize the object to JSON
    var jsonString = JSON.stringify(originalObject);

    // Deserialize the JSON back to an object
    var copy = JSON.parse(jsonString);

    return copy;
}


function func_LookUpInitialize(dimP) {
    cust_GetPara();
    //Data Condition
    //if (dimP == "lugdataconditionvalue") {
    //    nwParameter_Add("txtdataconditiondatasourceid", $("#txtdataconditiondatasourceid").val());
    //}
    //if (dimP == "lug-datasource-type") {
    //    nwParameter_Add("P8FORWViewer_json_type",JSON.stringify(_forw_json_centralize.type));
    //}

}


//var _jsonconfig = []
//var _jsontable = []

//function p8forw_bindtable(jsonconfig, jsontable) {
    
//    try {
//        _jsonconfig = jsonconfig
//        _jsontable = jsontable
//        return
//        var Grid = mSpreadBook.ActiveSheet;
//        //var jsoncolumn = JSON.parse(strcolumn);
//        //var jsontable = JSON.parse(strtable);
//        //var jsonconfig = JSON.parse(strconfig);
//        var itemconfig = jsonconfig[0];
      
//        var hidecolumnheader = p8Spread_GetJsonValue(itemconfig, "hidecolumnheader");
//        hidecolumnheader = hidecolumnheader ? true : false;
//        //var columnbasedquery = p8Spread_GetJsonValue(itemconfig, "columnbasedquery");
//        //showcolumnheader = false;
//        var columnArray ={} 
//        try{
//            columnArray = Object.keys(jsontable[0]);
//            var lencol = 0;
//            try{lencol = columnArray.length; }catch(ex){}
//        }catch(ex){}
//        var maxcol = Grid.GetMaxCol();
//        if(lencol > maxcol){
//            for(var i=(maxcol-1);i<lencol;i++){
//                Grid.ColAdd();
//            }
//        }

       
//        var col = p8Spread_GetJsonValue(itemconfig, "col");
//        var col2 = col;
//        var row = p8Spread_GetJsonValue(itemconfig, "row");
//        var row2 = row;
//        try { col2 = col + lencol-1; } catch (ex) { }
//        try { row2 = row + jsontable.length-1; } catch (ex) { }
//        var TableConfig = Grid.GetConfigData(col, row, "table");
//        var code = "";
//        var len = 0;
//        try { len = TableConfig.length; } catch (ex) { }
//        if (len > 0) {
//            var itemtblcon = TableConfig[0];
//            code = p8Spread_GetJsonValue(itemtblcon, "code");
//            itemtbl_row = p8Spread_GetJsonValue(itemtblcon, "row");
//            itemtbl_row2 = p8Spread_GetJsonValue(itemtblcon, "row2");
//            itemtbl_col = p8Spread_GetJsonValue(itemtblcon, "col");
//            itemtbl_col2 = p8Spread_GetJsonValue(itemtblcon, "col2");

//            itemtbl_row_save = p8Spread_GetJsonValue(itemtblcon, "row_save");
//            itemtbl_row2_save = p8Spread_GetJsonValue(itemtblcon, "row2_save");
//            itemtbl_col_save = p8Spread_GetJsonValue(itemtblcon, "col_save");
//            itemtbl_col2_save = p8Spread_GetJsonValue(itemtblcon, "col2_save");

//            //for data
//            for (var i = itemtbl_row2; i > itemtbl_row; i--) {
//                for (var j = itemtbl_col2; j >= itemtbl_col; j--) {
//                    //if (j > col2) {
//                    //    Grid.ColumnDeleteShift(j, i)
//                    //}
//                    Grid.SetText(j, i);

//                   // Grid.RowDeleteShift(j, i)
//                }
//            }
//            //var row_f = (itemtbl_row2 - itemtbl_row) * -1;
//            //Grid.UpdateConfigData(col, itemtbl_row2, 0, row_f);
//            //Grid.NOAHSpread_InsertTable(col, row, 0, 0, 0, row_f);


//        }
//        //return;
//        var col_r = col;
//        var row_r = row;

//        if (!hidecolumnheader) {
//            //add row2 because of the column
//            row2 += 1;
//            for(var j=0;j<lencol;j++){
//                var value = columnArray[j];
//                Grid.SetText(col + j, row_r, value)
//            }
//            row_r +=1;
//        }

//        var len = 0;
//        try { len = jsontable.length; } catch (ex) { }
//        var lencol = itemtbl_col2 - itemtbl_col + 1;
//        //len=5
//        for(var i=0;i<len;i++){
//            var currentrow = row_r +i;
//            var columnArray = Object.values(jsontable[i]);
//            //var lencol = itemtbl_col2;
//            if (lencol < 0) {
//                try { lencol = columnArray.length; } catch (ex) { }
//            }

//            for(var j=0;j<lencol;j++){
//                var currentcol = col_r +j;
//                var value = columnArray[j];
//                var currenctvalue = Grid.GetText(currentcol, currentrow); 

//                if (i > (itemtbl_row2_save - itemtbl_row_save - 2)) {
//                    Grid.RowInsertShift(currentcol, currentrow, false, false, true); 
//                }
//                Grid.UpdateConfigData(j, i, 0, 1);
//                Grid.SetText(currentcol, currentrow, value)      
//            }
//        }

//        //for (var i = row; i < row2; i++) {
//        //    for (var j = col; j <= col2; j++) {
//        //        Grid.RowInsertShift(j, i, false, false);
//        //        Grid.UpdateConfigData(j, i, 0, 1);
//        //        //Grid.NOAHSpread_InsertTable(j, i, 0, 1);
//        //    }
//        //}
//        // Grid.UpdateConfigData(col, row, 0, row_f);
//        //Grid.NOAHSpread_InsertTable(col, row, 0, 0, 0, len, false);


//        //delete excess column
//        //for data and column excess
//        //for (var i = row2; i >= itemtbl_row; i--) {
//        //    for (var j = itemtbl_col2; j > col2; j--) {
//        //        Grid.SetText(j, i, "");
//        //        Grid.SetUnmerge(j, i);
//        //        Grid.DeleteConfigData(j, i)
//        //        //Grid.ColumnDeleteShift(j, i)
//        //    }
//        //}

//        //mSpreadBook.ActiveSheet.NOAHSpread_CreateTable(col, row, undefined, itemtbl_col2, row2, true)

//    }catch(ex){console.log("error p8forw_bindtable:"+ex.toString())}
//}


function p8Spread_Change_MenuItem(canvasID, row, col) {
    var iscontinue = true;
    _canvasID = canvasID;
    _row = row;
    _col = col;
    if (canvasID == "mSpread") {
        if (!$("#mSpread").enable()) {
            return false;
        }

        //p8forw_Change(canvasID, row, col);
        iscontinue = p8forw_EventHandler(canvasID, row, col, "onchange")
        var formula = mSpreadBook.ActiveSheet.GetFORWFormula(col, row);
        if (formula.startsWith('=FORW')) {
            iscontinue = false
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
        if (!$("#mSpread").enable()) {
            return false;
        }
        //p8forw_Click(canvasID, row, col);
       iscontinue = p8forw_EventHandler(canvasID, row, col,"onclick")
        var formula = mSpreadBook.ActiveSheet.GetFORWFormula(col, row);
        if (formula.startsWith('=FORW')){
            iscontinue = false
        }
    }
    return iscontinue;
}

function p8Spread_DblClick_MenuItem(canvasID, row, col) {
    var iscontinue = true;
    _canvasID = canvasID;
    _row = row;
    _col = col;

    if (canvasID == "mSpread") {
        if (!$("#mSpread").enable()) {
            return false;
        }
        //var Grid = mSpreadBook.ActiveSheet;
        //var formula = Grid.GetFORWFormula(col, row);
        //if (formula.includes('=FORW_Lookup')
        //    || formula.includes('=FORW_AddToList')) {
        //    try {
        //        var jsondata = [];
        //        jsondata = Grid.GetJSONData(col, row, "lookuphdr");
        //        var sqlsyntaxitem = jsondata[0]
        //        if (jsondata.length > 0) {
        //            var sqlsyntax = p8Spread_GetJsonValue(sqlsyntaxitem, "sqlsyntax")
        //            sqlsyntax = p8forw_replace("@cell", sqlsyntax);
        //            nwParameter_Add("sqlsyntax", sqlsyntax);

        //            lookuplin = Grid.GetJSONData(col, row, "lookuplin");
        //            nwParameter_Add("lookuplin", JSON.stringify(lookuplin));
                   
        //            if (formula.includes('=FORW_AddToList')) {
        //                nwParameter_Add("isAddToList", "1");
        //                lookUpCustomize("luglookupsqlsyntax", 3, "", false)
        //            } else {
        //                nwParameter_Add("isAddToList", "0");
        //                lookUpCustomize("luglookupsqlsyntax", 1, "", true)
        //            }
        //            p8Spread_CurBook = "mSpread"
        //        }
        //    } catch (ex) { }
        //}else{
        iscontinue = p8forw_EventHandler(canvasID, row, col, "ondblclick")
        var formula = mSpreadBook.ActiveSheet.GetFORWFormula(col, row);
        if (formula.startsWith('=FORW')) {
            iscontinue = false
        }
        //}
      
    } 
    return iscontinue;
} 



function Lookup_DoneFunction(idName, idNum, ifBlankVal) {
    if (idName == 'toolboxInquire') {
    }

    if (idName == 'luglookupsqlsyntax') {
        try {
            var Grid = mSpreadBook.ActiveSheet;

            var _FORWViewer_LookupTemp = [];
            var p8forwsbcolumn = nwJson(_p8forwjsondata["p8forwsbcolumn"], "col", Grid.CellIndexes.Col, false);
            p8forwsbcolumn = nwJson(p8forwsbcolumn, "row", Grid.CellIndexes.Row, false);

            var lookuphtml = $("#menuCreatorContainer #nkLookupCon table thead tr.lookUpTRHeader");
            //starts @ 1 because index zero is row number.
            for (var j = 1; j < lookuphtml.find("th").length; j++) {
                var code = lookuphtml.find(`th:eq(${j})`).text();
                var sbcolumn = mSpreadBook.ActiveSheet.JSONCopy(p8forwsbcolumn);
                sbcolumn = nwJson(sbcolumn, "column", code, false);
                for (var k = 0; k < sbcolumn.length; k++) {
                    try {
                    var cell = sbcolumn[k].cell;
                    var col = p8Spread_CellToRowCol(cell).col;
                    var row = p8Spread_CellToRowCol(cell).row;
                    var value = getLookupData(idNum, j - 1);
                        Grid.SetValue(col, row, value);
                    } catch (ex) { }
                }
            }
        } catch (ex) { }
        //cell

        //var hasdefaultcode = true;
        //var hasdefaultdescription = true;

        //var json = Grid.GetJSONData(_col, _row, "lookuphdr");
        //var len = 0;
        //try { len = json.length; } catch (ex) { }
        //if(len > 0){
        //    var item = json[0];
        //    var defcodecell = p8Spread_GetJsonValue(item,"defcodecell");
        //    var defdesccell = p8Spread_GetJsonValue(item,"defdesccell");
        //    if (defcodecell == defdesccell && !isNull(defcodecell)) {
        //        var col = p8Spread_CellToRowCol(defcodecell).col;
        //        var row = p8Spread_CellToRowCol(defcodecell).row;
        //        var value = getLookupData(idNum, 0) + ' - ' + getLookupData(idNum, 1);
        //        Grid.SetText(col, row, value);
        //    }
        //    else{
        //        if (!isNull(defcodecell)) {
        //            var col = p8Spread_CellToRowCol(defcodecell).col;
        //            var row = p8Spread_CellToRowCol(defcodecell).row;
        //            var value = getLookupData(idNum, 0);
        //            Grid.SetText(col, row, value);
        //        }
        //        if (!isNull(defdesccell)) {
        //            var col = p8Spread_CellToRowCol(defdesccell).col;
        //            var row = p8Spread_CellToRowCol(defdesccell).row;
        //            var value = getLookupData(idNum, 1);
        //            Grid.SetText(col, row, value);
        //        }
        //    }
        //}

        //var json = Grid.GetJSONData(_col, _row, "lookuplin");

        //var len = 0;
        //try { len = json.length; } catch (ex) { }
        //for (var i = 0; i < len; i++) {
        //    var item = json[i]
        //    //var column = p8forw_formatcolumn(item.column);
        //    var cell = p8Spread_GetJsonValue(item,"cell");
        //    //var cell = item.cell;
        //    if (!isNull(cell)) {
        //        //var jsonlookupcolumnindex = nwJson(_jsonlookupcolumnindex, "column", column, false)
        //        //var lenindex = 0;
        //        //try { lenindex = jsonlookupcolumnindex.length; } catch (ex) { }
        //        //if (lenindex > 0) {
        //        //var i_index = jsonlookupcolumnindex[0].i;
        //        var index = parseInt(p8Spread_GetJsonValue(item,"rowno")) -1;
        //        var value = getLookupData(idNum, index);
        //        var cellarrlist = cell.split(",");
        //        for (var j = 0; j < cellarrlist.length; j++) {
        //            var cellarr = cellarrlist[j];
        //            var col = p8Spread_CellToRowCol(cellarr).col;
        //            var row = p8Spread_CellToRowCol(cellarr).row;
        //            Grid.SetText(col, row, value);
        //        }
        //        //}
        //    }
        //}


        //p8forw_Change("mSpread", _row, _col);
        p8forw_EventHandler("mSpread", _row, _col,"onchange")
    }
}


function func_AddtoListDoneCustom(verID, jsonTable) {
    if (verID == "luglookupsqlsyntax") {
        var objlentd = 0
        var obj = $("#menuCreatorContainer #nkLookupCon table tbody")
        var objlentr = 0
        try { objlentr = obj.find("tr").length } catch (ex) { }
        try { objlentd = obj.find("tr:eq(0)").find("td").length } catch (ex) { }
        //clear data in variable
        for (var obj_j = 0; obj_j < objlentd; obj_j++) {
            window["column" + obj_j] = "";
        }
        var grd_select = 0;
        for (var obj_i = 0; obj_i < objlentr; obj_i++) {
            var tablerow = obj.find("tr:eq(" + obj_i + ")");
            var select = tablerow.find("td:eq(" + grd_select + ") input").prop("checked");
            if (select) {
                for (var obj_j = 0; obj_j < objlentd; obj_j++) {
                    window["column" + obj_j] += tablerow.find("td:eq(" + obj_j + ") span").text();
                    window["column" + obj_j] += ((obj_i+1) == objlentr) ? "" : ", ";
                }
            }
        }
        if (obj_j > 0) {
            var Grid = mSpreadBook.ActiveSheet;
            Grid.SetText(_col, _row, window["column" + 1]);
            Grid.SetText(_col+1, _row, window["column" + 2]);
        }

        //p8forw_Change("mSpread", _row, _col);
        p8forw_EventHandler("mSpread", _row, _col,"onchange")
    }

}


//function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {

//    if (nwGridID == "mSpread") {
//            var code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
//            var desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
//            //crnwTRtemp[_col] = code;
//            //crnwTRtemp[_col + 1] = desc;
//    }

//    return crnwTRtemp;
//}


function getLookupData(idnum, index) {
    var data = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idnum - 1) + ") td:eq(" + index + ") span").text();
    return data;
}

function p8forw_formatcolumn(column) {
    return "[" + column.replaceAll("[", "").replaceAll("]", "") + "]";
}
function p8forw_DataSourceDone() {
    _FORWViewer_DataSource = convertKeysToLowerCase(_FORWViewer_DataSource)
    _FORWViewer_DataSourceTypeHdr = convertKeysToLowerCase(_FORWViewer_DataSourceTypeHdr)
    _FORWViewer_DataSourceTypeLin = convertKeysToLowerCase(_FORWViewer_DataSourceTypeLin)
    _FORWViewer_DataSourceTypeColumn = convertKeysToLowerCase(_FORWViewer_DataSourceTypeColumn)

    var p8forwsbhdr = _p8forwjsondata["p8forwsbhdr"];
    var len = 0
    try { len = p8forwsbhdr.length; } catch (ex) { }
    for (var j = 0; j < len; j++) {
        var itemhdr = p8forwsbhdr[j];
        var itemcol = p8Spread_GetJsonValue(itemhdr, "col");
        var itemrow = p8Spread_GetJsonValue(itemhdr, "row");
        var datasourcetype = p8Spread_GetJsonValue(itemhdr, "datasourcetype");
        var overwrite = p8Spread_GetJsonValue(itemhdr, "overwrite");

        //column
        var sqlcolumn = ``;
        if (overwrite) {
            sqlcolumn = p8Spread_GetJsonValue(itemhdr, "sqlcolumn");
        } else { 
            var DataSourceTypeColumn = nwJson(_FORWViewer_DataSourceTypeColumn, "subtype", datasourcetype, false)
            var p8forwsbcolumn = nwJson(_p8forwjsondata["p8forwsbcolumn"], "col", itemcol, false);
            p8forwsbcolumn = nwJson(p8forwsbcolumn, "row", itemrow, false);
            var lenk = 0
            try { lenk = p8forwsbcolumn.length; } catch (ex) { }
            for (var k = 0; k < lenk; k++) {
                var itemcolumn = p8forwsbcolumn[k];
                var column = p8Spread_GetJsonValue(itemcolumn, "column");
                var DataSourceTypeData = nwJson(DataSourceTypeColumn, "column", column, false);
                var alias = p8Spread_GetJsonValue(DataSourceTypeData[0], "alias") || column;
                sqlcolumn += `[${column}][${alias}], `;
            }
            try {
                sqlcolumn = sqlcolumn.substring(0, sqlcolumn.length - 2);
            } catch (ex) { }
        }
        p8forwsbhdr[j]["sqlcolumn_final"] = sqlcolumn;


        //filter
        var sqlfilter = ``;
        if (overwrite) {
            sqlfilter = p8Spread_GetJsonValue(itemhdr, "sqlfilter");
        } else {
           
            var p8forwsbfilter = nwJson(_p8forwjsondata["p8forwsbfilter"], "col", itemcol, false);
            p8forwsbfilter = nwJson(p8forwsbfilter, "row", itemrow, false);
            var lenk = 0
            try { lenk = p8forwsbfilter.length; } catch (ex) { }
            for (var k = 0; k < lenk; k++) {
                var itemfilter = p8forwsbfilter[k];
                var column = p8Spread_GetJsonValue(itemfilter, "column");
                var operation = p8Spread_GetJsonValue(itemfilter, "operation");
                var value = p8Spread_GetJsonValue(itemfilter, "value");
                var cell = p8Spread_GetJsonValue(itemfilter, "cell");

                if (operation == "equal") { operation = "=" }
                var data = "";
                if (!isNull(cell)) {
                    data = "@" + cell + "@cell"
                } else {
                    data = value;
                }
                data = data.replaceAll("'", "''");
                if (isNull(cell)) {
                    data = addSingleQuotes(data);
                }
                column = `[${column}]`;
                if (!isNull(sqlfilter)) {
                    sqlfilter += " and ";
                }
                if (operation == "in" || operation == "not in") {
                    sqlfilter += `${column} ${operation} (${data})`;
                }
                else if (operation == "like" || operation == "not like") {
                    sqlfilter += `${column} ${operation} '%${data}%'`;
                }
                else {
                    sqlfilter += `${column} ${operation} ${data}`;
                }
            }
        }
        p8forwsbhdr[j]["sqlfilter_final"] = sqlfilter;


        //sort
        var sqlsort = ``;
        if (overwrite) {
            sqlsort = p8Spread_GetJsonValue(itemhdr, "sqlsort");
        } else {
            var p8forwsbsort = nwJson(_p8forwjsondata["p8forwsbsort"], "col", itemcol, false);
            p8forwsbsort = nwJson(p8forwsbsort, "row", itemrow, false);
            var lenk = 0
            try { lenk = p8forwsbsort.length; } catch (ex) { }
            for (var k = 0; k < lenk; k++) {
                var itemsort = p8forwsbsort[k];
                var column = p8Spread_GetJsonValue(itemsort, "column");
                var sort = p8Spread_GetJsonValue(itemsort, "sort");
                sqlsort += `[${column}] [${sort}], `;
            }
            try {
                sqlsort = sqlsort.substring(0, sqlsort.length - 2);
            } catch (ex) { }
        }
        p8forwsbhdr[j]["sqlsort_final"] = sqlsort;


        //sqlsyntax
        var sqlsyntax = ``;
        //param
        var sqlparam = ``;
        var DataSourceTypeHdr = nwJson(_FORWViewer_DataSourceTypeHdr, "subtype", datasourcetype, false)
        //var lenk = 0
        //try { lenk = DataSourceTypeHdr.length; } catch (ex) { }
        //for (var k = 0; k < lenk; k++) {
        try {
            //Data Source Type
            var itemparam = DataSourceTypeHdr[0];
            var mainparam = p8Spread_GetJsonValue(itemparam, "mainparam");
            var mainparamvalue = p8Spread_GetJsonValue(itemparam, "mainparamvalue");
            var datasourceid = p8Spread_GetJsonValue(itemparam, "datasourceid");
            //Data Source
            var itemdatasource = nwJson(_FORWViewer_DataSource, "datasourceid", datasourceid, false)[0];
            var table = p8Spread_GetJsonValue(itemdatasource, "tablename");
            var sourcetype = p8Spread_GetJsonValue(itemdatasource, "type");
            if (overwrite) {

            }
            else { 
                if (sourcetype == "P") {
                    var data = mainparamvalue;
                    var operation = "="
                    data.replaceAll("'", "''");
                    data = addSingleQuotes(data);
                    sqlparam += `@${mainparam} ${operation} ${data}, `;


                    var DataSourceTypeLin = nwJson(_FORWViewer_DataSourceTypeLin, "subtype", datasourcetype, false)
                    var lenk = 0
                    try { lenk = DataSourceTypeLin.length; } catch (ex) { }
                    for (var k = 0; k < lenk; k++) {
                        var itemparam = DataSourceTypeLin[k];
                        var include = p8Spread_GetJsonValue(itemparam, "include");
                        if (include != "1") {
                            var param = p8Spread_GetJsonValue(itemparam, "param");
                            var initialvalue = p8Spread_GetJsonValue(itemparam, "initialvalue");
                            var data = initialvalue;
                            data.replaceAll("'", "''");
                            data = addSingleQuotes(data);
                            sqlparam += `@${param} ${operation} ${data}, `;
                        }
                    }

                    var p8forwsbparam = nwJson(_p8forwjsondata["p8forwsbparam"], "col", itemcol, false);
                    p8forwsbparam = nwJson(p8forwsbparam, "row", itemrow, false);
                    var lenk = 0
                    try { lenk = p8forwsbparam.length; } catch (ex) { }
                    for (var k = 0; k < lenk; k++) {
                        var itemparam = p8forwsbparam[k];
                        var param = p8Spread_GetJsonValue(itemparam, "param");
                        var value = p8Spread_GetJsonValue(itemparam, "value");
                        var cell = p8Spread_GetJsonValue(itemparam, "cell");
                        var operation = "="
                        var data = "";
                        if (!isNull(cell)) {
                            data = "@" + cell + "@cell"
                        } else {
                            data = value;
                        }
                        data = data.replaceAll("'", "''");
                        if (isNull(cell)) {
                            data = addSingleQuotes(data);
                        }
                        sqlparam += `@${param} ${operation} ${data}, `;

                    }
                    try {
                        sqlparam = sqlparam.substring(0, sqlparam.length - 2);
                    } catch (ex) { }

                }
            }
            if (overwrite) {
                sqlsyntax = p8Spread_GetJsonValue(itemhdr, "sqlsyntax");
            } else {

                try {

                    if (sourcetype == "P") {
                        sqlsyntax = `exec ${table} ${sqlparam}`
                    } else {
                        var columnlisttemp = sqlcolumn;
                        if (isNull(columnlisttemp)) {
                            columnlisttemp = " * ";
                        }
                        sqlsyntax = `select ${columnlisttemp} from ${table}`;
                        if (!p8Spread_IsNull(sqlfilter)) {
                            sqlsyntax += `where ` + sqlfilter;
                        }
                    }
                } catch (ex) { }



            }
        } catch (ex) { }
        p8forwsbhdr[j]["sqlsyntax_final"] = sqlsyntax;
    }

    p8forw_EventHandler("mSpread", undefined, undefined, "onload")
    //load drill
    ForwViewer_LoadDrill();
}

var xurl = this.location.origin;
var xcurl = "";
function p8forw_EventHandler(canvasID, row, col,event) {
    var iscontinue = true;
    var jsonevent = _p8forwjsondata["p8forwsbevent"];
    var jsonhdr = deepCopy(_p8forwjsondata["p8forwsbhdr"]);
    var jsonitemlist = [];
    var jsonitemlistdrill = [];
    //var jsonp8forwsbhdr = [];
    //var jsonp8forwsbcolumn = [];
    //var _p8forwjsonlist = [
    //{ code: "p8forwsbevent" },
    //{ code: "p8forwsbhdr" },
    //{ code: "p8forwsbcolumn"},
    //{ code: "p8forwsbfilter"},
    //{ code: "p8forwsbparam"},
    //{ code: "p8forwsbsort"},
    //];
        try {
                for (var i = 0; i < jsonevent.length; i++) {
                    try {
                        var item = jsonevent[i];
                        var itemevent = p8Spread_GetJsonValue(item,"event");
                        if (itemevent == event) {
                            var cell = p8Spread_GetJsonValue(item,"cell");
                            var cellcol = -1;
                            try{cellcol = p8Spread_CellToRowCol(cell).col; }catch(ex){}
                            var cellrow = -1; 
                            try{cellrow= p8Spread_CellToRowCol(cell).row; }catch(ex){}
                            if ((cellcol == col && cellrow == row) || event == "onload" || event == "ontbrefresh") {
                                var itemcol = p8Spread_GetJsonValue(item,"col");
                                var itemrow =  p8Spread_GetJsonValue(item,"row");

                                var jsonitemhdr = nwJson(jsonhdr,"col",itemcol,false);
                                jsonitemhdr = nwJson(jsonitemhdr,"row",itemrow,false);
                                var len = 0
                                try { len = jsonitemhdr.length;}catch(ex){}
                                for (var j = 0; j < len; j++) {
                                    var itemhdr = jsonitemhdr[j];
                                    if (itemhdr["objecttype"] == "drill") {
                                        try {
                                            var template = itemhdr["template"];
                                            var jsonitemdrill = nwJson(_p8forwjsondata["p8forwsbdrill"], "col", itemcol, false);
                                            jsonitemdrill = nwJson(jsonitemdrill, "row", itemrow, false);
                                            for (var k = 0; k < jsonitemdrill.length; k++) {
                                                var cellsource = jsonitemdrill[k].cellsource;
                                                var cellindex = p8Spread_CellToRowCol(cellsource)
                                                var celldestinationvalue = mSpreadBook.ActiveSheet.GetValue(cellindex.col,cellindex.row);
                                                jsonitemlistdrill.push({
                                                    template: template,
                                                    celldestination: jsonitemdrill[k].celldestination,
                                                    celldestinationvalue: celldestinationvalue,
                                                    cellsource: jsonitemdrill[k].cellsource,
                                                });
                                            }
                                        } catch (ex) { }
                                    } else {
                                        itemhdr["sqlsyntax_final"] = p8forw_replace("@cell", itemhdr["sqlsyntax_final"]);
                                        itemhdr["sqlcolumn_final"] = p8forw_replace("@cell", itemhdr["sqlcolumn_final"]);
                                        itemhdr["sqlfilter_final"] = p8forw_replace("@cell", itemhdr["sqlfilter_final"]);
                                        itemhdr["sqlsort_final"] = p8forw_replace("@cell", itemhdr["sqlsort_final"]);
                                        jsonitemlist.push(itemhdr);
                                    }
                                }                   
                            }
                        }
                    } catch (ex) { }
                }
            } catch (ex) { }
    try {
        if (event == "ondblclick") {
            //lookup
            var jsonitemhdr = nwJson(jsonhdr, "objecttype", "lookup", false);
            jsonitemhdr = nwJson(jsonitemhdr, "col", col, false);
            jsonitemhdr = nwJson(jsonitemhdr, "row", row, false);
            var len = 0
            try { len = jsonitemhdr.length; } catch (ex) { }
            if (len > 0) {
                var itemhdr = jsonitemhdr[0];
                itemhdr["sqlsyntax_final"] = p8forw_replace("@cell", itemhdr["sqlsyntax_final"]);
                itemhdr["sqlcolumn_final"] = p8forw_replace("@cell", itemhdr["sqlcolumn_final"]);
                itemhdr["sqlfilter_final"] = p8forw_replace("@cell", itemhdr["sqlfilter_final"]);
                itemhdr["sqlsort_final"] = p8forw_replace("@cell", itemhdr["sqlsort_final"]);
                jsonitemlist.push(itemhdr);
            }
        }
    } catch (ex) { }
    if (jsonitemlistdrill.length > 0) {
        //var len = 0
        //try { len = jsonitemlistdrill.length; } catch (ex) { }
        //for (var i = 0; i < len; i++) {
        var item = jsonitemlistdrill[0];
        var code = p8Spread_GetJsonValue(item, "template");
                //var itemcol = p8Spread_GetJsonValue(item, "col");
                //var itemrow = p8Spread_GetJsonValue(item, "row");
                //var jsonData = [];
                //jsonData.push({id: "p8forwsbhdr", data: jsonitemlistnoactmethod})
                //try {
                //    var jsonitemdrill = nwJson(_p8forwjsondata["p8forwsbdrill"], "col", itemcol, false);
                //    jsonitemdrill = nwJson(jsonitemdrill, "row", itemrow, false);
                //    jsonData.push({ id: "p8forwsbdrill", data: jsonitemdrill })
                //} catch (ex) { }
       
        var jsonitemlistmain = [{ code: code, data: jsonitemlistdrill }]
        var strData = JSON.stringify(jsonitemlistmain);
        //mainurl = xurl;
        mainurl = "P8FORWViewer"; //change
        //mainurl += "?fid=" + encodeURIComponent(code);
        mainurl += "?nwdev=" + encodeURIComponent(getParameterByName("nwdev"));
        var popup = window.open(mainurl, '_blank');
        setTimeout(() => {
            popup.postMessage(strData, window.location.href);
        }, 1000);
        iscontinue = false;
        //}
    }

    if (jsonitemlist.length > 0) {
        nwLoading_Start("actExecuteSQL", crLoadingHTML);
                nwParameter_Add("jsonp8forwsbhdr", JSON.stringify(jsonitemlist));
        func_ActionDriven("actExecuteSQL", false);
        iscontinue = false;
    }

    return iscontinue;
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



//var _jsonconfig = []
//var _jsontable = []
function p8forw_bindstring(jsonconfig, jsontable) {
    mSpreadBook.ActiveSheet.RenderStatus = false;
    try {
        var Grid = mSpreadBook.ActiveSheet;
        var itemconfig = jsonconfig[0];
        try {
            var updateitemconfig = nwJson(_p8forwjsondata["p8forwsbhdr"], "row", itemconfig.row, false);
            if (updateitemconfig[0].newrow != undefined) {
                itemconfig.row = updateitemconfig[0].newrow;
            }
        } catch (ex) { }
        var col = p8Spread_GetJsonValue(itemconfig, "col");
        var row = p8Spread_GetJsonValue(itemconfig, "row");
        var value = jsontable[0][Object.keys(jsontable[0])[0]]
        Grid.SetValue(col, row, value)
    } catch (ex) { console.log("error p8forw_bindstring:" + ex.toString()) }
    setTimeout(function () {
        mSpreadBook.ActiveSheet.RenderStatus = true;
        mSpreadBook.ActiveSheet.Refresh();
    }, 50);
    
}


function p8forw_bindlookup(jsonconfig, jsontable) {
    //mSpreadBook.ActiveSheet.RenderStatus = false;
    try {
        _FORWViewer_LookupTemp = jsonconfig;
        nwParameter_Add("isAddToList", "0");
        nwParameter_Add("jsondata", JSON.stringify(jsontable));
        lookUpCustomize("luglookupsqlsyntax", 1, "", true)
    } catch (ex) { console.log("error p8forw_bindstring:" + ex.toString()) }
    //setTimeout(function () {
    //    mSpreadBook.ActiveSheet.RenderStatus = true;
    //    mSpreadBook.ActiveSheet.Refresh();
    //}, 50);

}
function p8forw_bindtable(jsonconfig, jsontable) {
    nwLoading_Start("p8forw_bindtable", crLoadingHTML);
    mSpreadBook.ActiveSheet.RenderStatus = false;
    try {
        //_jsonconfig = jsonconfig
        //_jsontable = jsontable
        //return
        var Grid = mSpreadBook.ActiveSheet;
        var itemconfig = jsonconfig[0];
        try {
            var updateitemconfig = nwJson(_p8forwjsondata["p8forwsbhdr"], "row", itemconfig.row, false);
            if (updateitemconfig[0].newrow != undefined) {
                itemconfig.row = updateitemconfig[0].newrow;
            }
        } catch (ex) { }

        //var hidecolumnheader = p8Spread_GetJsonValue(itemconfig, "hidecolumnheader");
        //hidecolumnheader = hidecolumnheader ? true : false;
        var columnArray = {}
        try {
            columnArray = Object.keys(jsontable[0]);
            var lencol = 0;
            try { lencol = columnArray.length; } catch (ex) { }
        } catch (ex) { }
        var maxcol = Grid.GetMaxCol();
        if (lencol > maxcol) {
            for (var i = (maxcol - 1); i < lencol; i++) {
                Grid.ColAdd();
            }
        }


        var col = p8Spread_GetJsonValue(itemconfig, "col");
        var col2 = col;
        var row = p8Spread_GetJsonValue(itemconfig, "row");
        var row2 = row;
        try { col2 = col + lencol - 1; } catch (ex) { }
        try { row2 = row + jsontable.length - 1; } catch (ex) { }
        var TableConfig = Grid.NOAHSpread_GetTableList(col, row);
        var code = "";
        var len = 0;
        try { len = TableConfig.length; } catch (ex) { }
        if (len > 0) {
            var itemtblcon = TableConfig[0];
            code = p8Spread_GetJsonValue(itemtblcon, "code");
            itemtbl_row = p8Spread_GetJsonValue(itemtblcon, "row");
            itemtbl_row2 = p8Spread_GetJsonValue(itemtblcon, "row2");
            itemtbl_col = p8Spread_GetJsonValue(itemtblcon, "col");
            itemtbl_col2 = p8Spread_GetJsonValue(itemtblcon, "col2");
            showcolumn = p8Spread_GetJsonValue(itemtblcon, "showcolumn");

            itemtbl_row_save = p8Spread_GetJsonValue(itemtblcon, "row_save");
            itemtbl_row2_save = p8Spread_GetJsonValue(itemtblcon, "row2_save");
            itemtbl_col_save = p8Spread_GetJsonValue(itemtblcon, "col_save");
            itemtbl_col2_save = p8Spread_GetJsonValue(itemtblcon, "col2_save");
            

         
            itemtbl_row_consumed =  p8Spread_GetJsonValue(itemtblcon, "row_consumed") || 0;
            itemtbl_row_additional = p8Spread_GetJsonValue(itemtblcon, "row_additional") || 0;

            var test = false;
            //clear data
            var lencol = itemtbl_col2;
            var row_additional = (itemtbl_row_additional);
            for (var i = itemtbl_row2; i > itemtbl_row2_save + row_additional; i--) {
                //var rowupdate = true;
                try {
                    var tablelist = nwJson(mSpreadBook.ActiveSheet.TableList, "col", itemtbl_col, false)
                    for (var tablerow = 0; tablerow < tablelist.length; tablerow++) {
                        var table = tablelist[tablerow]
                        if (itemtbl_row < table.row) {
                            if (lencol < table.col2) {
                                lencol = table.col2;
                            }
                            table.row -= 1;
                            table.row2 -= 1;
                        }
                    }
                } catch (ex) { }
                for (var j = lencol; j >= itemtbl_col; j--) {
                    Grid.RowDeleteShift(j, i, true);
                    test = true;
                }
            }
            //reset table to default
            itemtblcon.row = itemtbl_row_save + row_additional;
            itemtblcon.row2 = itemtbl_row2_save + row_additional;
            itemtblcon.col = itemtbl_col_save;
            itemtblcon.col2 = itemtbl_col2_save;

            itemtbl_row = p8Spread_GetJsonValue(itemtblcon, "row");
            itemtbl_row2 = p8Spread_GetJsonValue(itemtblcon, "row2");
            itemtbl_col = p8Spread_GetJsonValue(itemtblcon, "col");
            itemtbl_col2 = p8Spread_GetJsonValue(itemtblcon, "col2");

            for (var i = itemtbl_row2; i > itemtbl_row; i--) {
                for (var j = itemtbl_col2; j >= itemtbl_col; j--) {
                    Grid.SetText(j, i,"");
                }
            }
            //if (test) {
            //    return
            //}
        }
    
        var col_r = col;
        var row_r = row;

        if (showcolumn) {
            //add row2 because of the column
            row2 += 1;
            for (var j = 0; j < lencol; j++) {
                var value = columnArray[j];
                Grid.SetText(col + j, row_r, value)
            }
            row_r += 1;
        }

        var len = 0;
        try { len = jsontable.length; } catch (ex) { }
        var lencol = itemtbl_col2 - itemtbl_col + 1;
        var rowstartinsert = (itemtbl_row2_save - itemtbl_row_save - 1);

        //len = 17;
        //var hastable = false;
        //len=5
        for (var i = 0; i < len; i++) {
            var currentrow = row_r + i;
            var columnArray = Object.values(jsontable[i]);
            if (i > rowstartinsert) {
             
                try {
                    var tablelist = nwJson(mSpreadBook.ActiveSheet.TableList, "col", col_r, false)
                    for (var tablerow = 0; tablerow < tablelist.length; tablerow++) {
                        var table = tablelist[tablerow]
                        if (currentrow < table.row) {
                            if (lencol < table.col2) {
                                lencol = table.col2;
                            }
                        }
                    }
                   
                } catch (ex) { }
                Grid.RowInsertShift(col_r, currentrow, false, lencol, currentrow, true);
            }
            for (var j = 0; j < lencol; j++) {
                var currentcol = col_r + j;
                var value = columnArray[j];
            Grid.SetText(currentcol, currentrow, value)
            
            }
         
        }
        var addrow2 = (len - (itemtbl_row2_save - itemtbl_row_save));
        if (addrow2 > 0) {
            //Grid.NOAHSpread_UpdateTable(col, row, 0, 0, 0, addrow2,false);
            Grid.NOAHSpread_RowInsertShiftTable(col, row, col2, row2, addrow2, true, true);



            var p8forwsbhdr = _p8forwjsondata["p8forwsbhdr"];
            try { len = p8forwsbhdr.length; } catch (ex) { }
            for (var i = 0; i < len; i++) {
                try {
                    if (p8forwsbhdr[i].col == col) {
                        if (p8forwsbhdr[i].row > row) {
                            p8forwsbhdr[i].newrow = p8forwsbhdr[i].row + addrow2;
                        }
                    }
                } catch (ex) { }
            }
        }
        //delete excess column
        //for data and column excess
        //for (var i = row2; i >= itemtbl_row; i--) {
        //    for (var j = itemtbl_col2; j > col2; j--) {
        //        Grid.SetText(j, i, "");
        //        Grid.SetUnmerge(j, i);
        //        Grid.DeleteConfigData(j, i)
        //        //Grid.ColumnDeleteShift(j, i)
        //    }
        //}

        //mSpreadBook.ActiveSheet.NOAHSpread_CreateTable(col, row, undefined, itemtbl_col2, row2, true)

    } catch (ex) { console.log("error p8forw_bindtable:" + ex.toString()) }
    setTimeout(function () {
        mSpreadBook.ActiveSheet.RenderStatus = true;
        mSpreadBook.ActiveSheet.Refresh();
        nwLoading_End('p8forw_bindtable')
    }, 50);
}


//function func_RowInsert_MenuItem(index) {
//    return p8forw_jsonupdatecell(index);
//}

//function func_RowDelete_MenuItem(index) {
//    return p8forw_jsonupdatecell(index);
//}

//function func_ColumnInsert_MenuItem(index) {
//    return p8forw_jsonupdatecell(index);
//}

//function func_ColumnDelete_MenuItem(index) {
//    return p8forw_jsonupdatecell(index);
//}

//function p8forw_jsonupdatecell(index) {
//    var jsonupdatecell = []
//    jsonupdatecell.push({ jsonname: "p8forwsbcolumn", cellname: "cell" });
//    jsonupdatecell.push({ jsonname: "p8forwsbevent", cellname: "cell" });
//    jsonupdatecell.push({ jsonname: "p8forwsbfilter", cellname: "cell" });
//    jsonupdatecell.push({ jsonname: "p8forwsbparam", cellname: "cell" });

//    jsonupdatecell.push({ jsonname: "p8forwsbdrill", cellname: "cellsource" });
//    jsonupdatecell.push({ jsonname: "p8forwsbdrill", cellname: "celldestination" });
//    return jsonupdatecell;
//}