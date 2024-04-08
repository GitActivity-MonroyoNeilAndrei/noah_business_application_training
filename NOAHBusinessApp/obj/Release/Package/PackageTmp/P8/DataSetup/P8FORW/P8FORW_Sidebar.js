var _p8forw_formatobject = [];





var _p8forw_objectdata = [];
//_p8forw_formatobject.push({
//    objectid: "sbsort", objecttype: "lookup", id: "lugsbcolumnnamec", classlist: "lugclrsb lugsbcolumnnamec", fieldname: "Column Name", hidecode: true
//})

var nwGridCon_sbevent_Book;
var nwGridCon_sbevent_Sheet;

//var nwGridCon_sb_Book;
//var nwGridCon_sb_Sheet;

var nwGridCon_sbf_Book;
var nwGridCon_sbf_Sheet;

var nwGridCon_sbp_Book;
var nwGridCon_sbp_Sheet;

var nwGridCon_sbdrill_Book;
var nwGridCon_sbdrill_Sheet;
//var nwGridCon_sbpfixed_Book;
//var nwGridCon_sbpfixed_Sheet;

var startindex15 = 0,
        SPR_SBE_EVENT = ++startindex15,
        SPR_SBE_EVENTDESC = ++startindex15,
        SPR_SBE_CELLREFERENCE = ++startindex15;

var startindex19 = 0,
                SPR_SBC_COLUMN = ++startindex19,
                SPR_SBC_CELLREFERENCE = ++startindex19;

var startindex14 = 0,
               SPR_SBF_COLUMN = ++startindex14,
               SPR_SBF_COLUMNDESC = ++startindex14,
               SPR_SBF_OPERATION = ++startindex14,
               SPR_SBF_OPERATIONDESC = ++startindex14,
               SPR_SBF_VALUE = ++startindex14,
               SPR_SBF_CELLREFERENCE = ++startindex14;

var startindex17 = 0,
               SPR_SBP_PARAM = ++startindex17,
               SPR_SBP_PARAMDESC = ++startindex17,
               SPR_SBP_VALUE = ++startindex17,
               SPR_SBP_CELLREFERENCE = ++startindex17;

//var startindex21 = 0,
//               SPR_SBPFIXED_PARAM = ++startindex21,
//               SPR_SBPFIXED_PARAMDESC = ++startindex21,
//               SPR_SBPFIXED_VALUE = ++startindex21,
//               SPR_SBPFIXED_CELLREFERENCE = ++startindex21;

var startindex20 = 0,
                SPR_SBS_COLUMN = ++startindex20,
                SPR_SBS_SORT = ++startindex20;

var startindex22 = 0,
    SPR_SBD_CELLSOURCE = ++startindex22,
    SPR_SBD_CELLDESTINATION = ++startindex22;




function ClearFields_sb() {
    $(".txtclrsb").val('');
    $(".lugclrsb input").val('');
    $(".chkclrsb").prop("checked", false);
}

$(document).on("click", "#p8forw-btntable", function () {
    var row = mSpreadBook.ActiveSheet.CellIndexes.Row;
    var col = mSpreadBook.ActiveSheet.CellIndexes.Col;

    var tableindex = mSpreadBook.ActiveSheet.NOAHSpread_GetTableCellIndexes(col, row);
    try {
        col = tableindex.col;
        row = tableindex.row;
    } catch (ex) { }
    //var TableConfig = mSpreadBook.ActiveSheet.NOAHSpread_GetTableList(col, row);
    //var hastable = 0;
    //try { hastable = TableConfig.length; } catch (ex) { }
    //if (hastable > 0) {
    //    var col = TableConfig[0].col;
    //    var row = TableConfig[0].row;
    //}

    p8forw_table_refresh(this, col, row)
    return false;
});
function p8forw_table_refresh(_this, col, row) {
    var title = $(_this).find(".p8forw-title").text()
    $("#p8forw-sidebar .p8forw-sidebar-label").text(title)
    $("#txtsbobjecttype").val("table");
    $(".sbf").hide();
    $(".sbf_table").show();
    p8forw_sb_refresh(col, row);
}
$(document).on("click", "#p8forw-btndatacondition", function () {
    p8forw_datacondition_refresh(this);
    return false;
});

function p8forw_datacondition_refresh(_this) {
    var title = $(_this).find(".p8forw-title").text()
    $("#p8forw-sidebar .p8forw-sidebar-label").text(title)
    $("#txtsbobjecttype").val("datacondition");
    $(".sbf").hide();
    $(".sbf_dc").show();
    p8forw_sb_refresh();
}
$(document).on("click", "#p8forw-btnlookup", function () {
    p8forw_lookup_refresh(this);
    return false;
});
function p8forw_lookup_refresh(_this) {
    var title = $(_this).find(".p8forw-title").text()
    $("#p8forw-sidebar .p8forw-sidebar-label").text(title)
    $("#txtsbobjecttype").val("lookup");
    $(".sbf").hide();
    $(".sbf_lu").show();
    p8forw_sb_refresh();
}

$(document).on("click", "#p8forw-btndrill", function () {
    p8forw_drill_refresh(this);
    return false;
});
function p8forw_drill_refresh(_this) {
    var title = $(_this).find(".p8forw-title").text()
    $("#p8forw-sidebar .p8forw-sidebar-label").text(title)
    $("#txtsbobjecttype").val("drill");
    $(".sbf").hide();
    $(".sbf_dr").show();
    p8forw_sb_refresh();
}

function p8forw_sb_refresh(col, row) {
    row = row == undefined ? mSpreadBook.ActiveSheet.CellIndexes.Row : row;
    col = col == undefined ? mSpreadBook.ActiveSheet.CellIndexes.Col : col;

    if (isNull(col)) {
        return false;
    }

    ClearFields_sb();

    //$(".p8forw-sidebar").p8forwhide();
    $("#p8forw-sidebar").p8forwshow();
    var cell = p8_NumberToCell(col+1) + (row+1);
    $("#txtsbcolindex").val(col);
    $("#txtsbrowindex").val(row);
    $("#txtsbcell").val(cell);

    //var col = mSpreadBook.ActiveSheet.CellSelected.col;
    //var row = mSpreadBook.ActiveSheet.CellSelected.row;
    var jsonhdr = mSpreadBook.ActiveSheet.GetJSONData(col, row, "p8forwsbhdr");
    nwParameter_Add("jsonhdr", JSON.stringify(jsonhdr));
    nwLoading_Start("act_loadsbhdr", crLoadingHTML);
    func_ActionDriven("act_loadsbhdr", false);


}
function p8forw_loadsbhdrdone() {
    p8forw_enablesqlsyntax()
    p8forw_sb_reloadgrid();
    //func_ActionDriven("act_binddone", false);
}
//function p8forw_sb_binddone() {
//    setTimeout(function () {
//        formatsqlselectsyntax_sb()
//    }, 1000);
//}

function p8forw_enablesqlsyntax() {
    var chksbisoverwrite = $("#chksbisoverwrite").prop("checked");

    if (!chksbisoverwrite) {
        $("#txtsbsqlsyntax").enable(false);
        $("#txtsbsqlcolumn").enable(false);
        $("#txtsbsqlfilter").enable(false);
        $("#txtsbsqlsort").enable(false);
    } else {
        $("#txtsbsqlsyntax").enable(true);
        $("#txtsbsqlcolumn").enable(true);
        $("#txtsbsqlfilter").enable(true);
        $("#txtsbsqlsort").enable(true);
    }
}

function p8forw_sb_reloadgrid() {
    p8forw_sbevent_reloadgrid()
    p8forw_sbc_reloadgrid()
    p8forw_sbf_reloadgrid()
    //p8forw_sbpfixed_reloadgrid()
    p8forw_sbp_reloadgrid()
    p8forw_sbs_reloadgrid()
    p8forw_sbd_reloadgrid()
}
function p8forw_sbevent_reloadgrid() {
    //initialize data
    //$(`#txtDataSourceID`).val('');
    //$("#txtDataSourceHasUpdate").val('');
    //var col = mSpreadBook.ActiveSheet.CellSelected.col;
    //var row = mSpreadBook.ActiveSheet.CellSelected.row;
    var col = $("#txtsbcolindex").val();
    var row = $("#txtsbrowindex").val();
    var sbevent = mSpreadBook.ActiveSheet.GetJSONData(col, row, "p8forwsbevent");
    //nwParameter_Add("txtdataconditiondatasourceid", $(`#txtdataconditiondatasourceid`).val());
    nwParameter_Add("jsonsbevent", JSON.stringify(sbevent));
    nwLoading_Start("actCreateGrid_sbevent", crLoadingHTML);

    func_ActionDriven("actCreateGrid_sbevent", false);
}


function p8forw_sbd_reloadgrid() {
    //initialize data
    //$(`#txtDataSourceID`).val('');
    //$("#txtDataSourceHasUpdate").val('');
    var col = $("#txtsbcolindex").val();
    var row = $("#txtsbrowindex").val();
    var sbdrill = mSpreadBook.ActiveSheet.GetJSONData(col, row, "p8forwsbdrill");
    //nwParameter_Add("txtdataconditiondatasourceid", $(`#txtdataconditiondatasourceid`).val());
    nwParameter_Add("jsonsbdrill", JSON.stringify(sbdrill));
    nwLoading_Start("actCreateGrid_sbdrill", crLoadingHTML);

    func_ActionDriven("actCreateGrid_sbdrill", false);
}

function p8forw_sbf_reloadgrid() {
    //initialize data
    //$(`#txtDataSourceID`).val('');
    //$("#txtDataSourceHasUpdate").val('');
    //var datasourcetype = $("#idvallugsbdatasourcetype").val();
    //if (isNull(datasourcetype)) {
    //    return false;
    //}
    var col = $("#txtsbcolindex").val();
    var row = $("#txtsbrowindex").val();
    var sbf = mSpreadBook.ActiveSheet.GetJSONData(col, row, "p8forwsbfilter");
    nwParameter_Add("idvallugsbdatasourcetype", $("#idvallugsbdatasourcetype").val());
    nwParameter_Add("jsonsbf", JSON.stringify(sbf));
    nwLoading_Start("actCreateGrid_sbf", crLoadingHTML);

    func_ActionDriven("actCreateGrid_sbf", false);
}

//function p8forw_sbpfixed_reloadgrid() {
//    //initialize data
//    //$(`#txtDataSourceID`).val('');
//    //$("#txtDataSourceHasUpdate").val('');
//    //var datasourcetype = $("#idvallugsbdatasourcetype").val();
//    //if (isNull(datasourcetype)) {
//    //    return false;
//    //}
//    nwParameter_Add("idvallugsbdatasourcetype", $("#idvallugsbdatasourcetype").val());
//    nwLoading_Start("actCreateGrid_sbpfixed", crLoadingHTML);
//    func_ActionDriven("actCreateGrid_sbpfixed", false);
//}


function p8forw_sbp_reloadgrid() {
    //initialize data
    //$(`#txtDataSourceID`).val('');
    //$("#txtDataSourceHasUpdate").val('');
    //var datasourcetype = $("#idvallugsbdatasourcetype").val();
    //if (isNull(datasourcetype)) {
    //    return false;
    //}
    var col = $("#txtsbcolindex").val();
    var row = $("#txtsbrowindex").val();
    var sbp = mSpreadBook.ActiveSheet.GetJSONData(col, row, "p8forwsbparam");
    nwParameter_Add("idvallugsbdatasourcetype", $("#idvallugsbdatasourcetype").val());
    nwParameter_Add("jsonsbp", JSON.stringify(sbp));
    nwLoading_Start("actCreateGrid_sbp", crLoadingHTML);

    func_ActionDriven("actCreateGrid_sbp", false);
}

function CreateGridDone_sbdrill() {
    var Grid = nwGridCon_sbevent_Book.ActiveSheet;
    var Gridrows = Grid.GetMaxRow();
    var Gridcols = Grid.GetMaxCol();

    for (var y = Gridrows; y < 5; y++) {
        Grid.RowAdd();
    }

    if (Gridrows > 5) {
        Grid.RowAdd();
    }
}
function CreateGridDone_sbevent() {
    var Grid = nwGridCon_sbevent_Book.ActiveSheet;
    var Gridrows = Grid.GetMaxRow();
    var Gridcols = Grid.GetMaxCol();

    for (var y = Gridrows; y < 5; y++) {
        Grid.RowAdd();
    }

    if (Gridrows > 5) {
        Grid.RowAdd();
    }
    p8forw_sbevent_format();
}
function p8forw_sbevent_format() {
    var Grid = nwGridCon_sbevent_Book.ActiveSheet;
    var Gridrows = Grid.GetMaxRow();
    for (var i = 0; i < Gridrows; i++) {
        var event = Grid.GetText((SPR_SBE_EVENT - 1), i);
        if (event == "onload") {
            Grid.SetBackground((SPR_SBE_CELLREFERENCE - 1), i, "gainsboro");
        } else {
            Grid.SetBackground((SPR_SBE_CELLREFERENCE - 1), i, "white");
        }
        if (event == "ontbrefresh") {
            Grid.SetBackground((SPR_SBE_CELLREFERENCE - 1), i, "gainsboro");
        } else {
            Grid.SetBackground((SPR_SBE_CELLREFERENCE - 1), i, "white");
        }
    }
}
//function p8forw_sbevent_event(row) {
//    var Grid = nwGridCon_sbevent_Book.ActiveSheet;
//    var event = Grid.GetText((SPR_SBE_EVENT - 1), row);
//    if (event == "onload") {
//        Grid.SetBackground((SPR_SBE_EVENTDESC - 1), row, "gainsboro");
//    } else {
//        Grid.SetBackground((SPR_SBE_EVENTDESC - 1), row, "white");
//    }
//}


//function CreateGridDone_sb() {
//    var Grid = nwGridCon_sb_Book.ActiveSheet;
//    var Gridrows = Grid.GetMaxRow();
//    var Gridcols = Grid.GetMaxCol();

//    for (var y = Gridrows; y < 5; y++) {
//        Grid.RowAdd();
//    }

//    if (Gridrows > 5) {
//        Grid.RowAdd();
//    }
//    p8forw_sbcolumnbasedqueryenable();
//    //nwGridCon_datacondition_Book.ActiveSheet.SetBold(Spread_ALLCOL, 0, "normal");
//}

function CreateGridDone_sbf() {
    var Grid = nwGridCon_sbf_Book.ActiveSheet;
    var Gridrows = Grid.GetMaxRow();
    var Gridcols = Grid.GetMaxCol();

    for (var y = Gridrows; y < 5; y++) {
        Grid.RowAdd();
    }

    if (Gridrows > 5) {
        Grid.RowAdd();
    }

    var datasourcetype = $("#idvallugsbdatasourcetype").val();
    if (isNull(datasourcetype)) {
        $("#nwGridCon_sbf").enable(false);
    } else {
        $("#nwGridCon_sbf").enable(true);
    }

    //nwGridCon_datacondition_Book.ActiveSheet.SetBold(Spread_ALLCOL, 0, "normal");
    //var Grid = nwGridCon_sbp_Book.ActiveSheet;
    //var rows = Grid.GetMaxRow();
    //var hasparam = false;
    //for (var row = 0; row < rows; row++) {
    //    var param = Grid.GetText((SPR_SBP_PARAM - 1), row);
    //    if (!isNull(param)) {
    //        hasparam = true;
    //    }
    //}
    //if (hasparam) {
    //    $("#nwGridCon_sbp").enable(true)
    //} else {
    //    $("#nwGridCon_sbp").enable(false)
    //}
    //var Grid = nwGridCon_sbp_Book.ActiveSheet;
    //var Gridrows = Grid.GetMaxRow();
    //var Gridcols = Grid.GetMaxCol();

    //for (var y = Gridrows; y < 5; y++) {
    //    Grid.RowAdd();
    //}

    //if (Gridrows > 5) {
    //    Grid.RowAdd();
    //}
    //nwGridCon_datacondition_Book.ActiveSheet.SetBold(Spread_ALLCOL, 0, "normal");
}

function CreateGridDone_sbp() {
    var Grid = nwGridCon_sbp_Book.ActiveSheet;
    var rows = Grid.GetMaxRow();
    var hasparam = false;
    for (var row = 0; row < rows; row++) {
        var param = Grid.GetText((SPR_SBP_PARAM - 1), row);
        if (!isNull(param)) {
            hasparam = true;
        }
    }
    if (hasparam) {
        $("#nwGridCon_sbp").enable(true)
    } else {
        $("#nwGridCon_sbp").enable(false)
    }
    //var Grid = nwGridCon_sbp_Book.ActiveSheet;
    //var Gridrows = Grid.GetMaxRow();
    //var Gridcols = Grid.GetMaxCol();

    //for (var y = Gridrows; y < 5; y++) {
    //    Grid.RowAdd();
    //}

    //if (Gridrows > 5) {
    //    Grid.RowAdd();
    //}
    //nwGridCon_datacondition_Book.ActiveSheet.SetBold(Spread_ALLCOL, 0, "normal");
}
//function CreateGridDone_sbpfixed() {

//}
//$(document).on("change", "#chktablecolumnbasedquery", function () {
//    p8forw_columnbasedqueryenable();
//    formatsqlselectsyntax_table();
//    return false;
//});


//$(document).on("change", "#chksbcolumnbasedquery", function () {
//    p8forw_sbcolumnbasedqueryenable();
//    formatsqlselectsyntax_sb()
//    return false;
//});

//function p8forw_sbcolumnbasedqueryenable() {
//    if ($("#chksbcolumnbasedquery").prop("checked")) {
//        $("#nwGridCon_sb").enable(false)
//    } else {
//        $("#nwGridCon_sb").enable(true)
//    }
//}

$(document).on("change", "#chksbisoverwrite", function () {
    p8forw_enablesqlsyntax();
    formatsqlselectsyntax_sb();
    return false;
});
$(document).on("change", "#chkaggregatesum", function () {
    formatsqlselectsyntax_sb();
    return false;
});




function formatsqlselectsyntax_sb() {
    var chksbisoverwrite = $("#chksbisoverwrite").prop("checked");

    if (!chksbisoverwrite) {
        var source = $("#idvallugsbsource").val() || "";
        if (!isNull(source)) {
            var sourcetype = $("#txtsbType").val() || "";

            //table
            var table = "";
            if (sourcetype == "FN") {
                table = source;
            } else {
                table = source.replaceAll("[", "").replaceAll("]", "");
                try {
                    table = table.split('.');
                    table = '[' + table[0] + '].[' + table.slice(1).join('.') + ']';
                } catch (ex) { }
            }
            //column clause
            try {
            var columnlist = "";
            var _this = $("#sbcolumn");
            var len = 0;
            try { len = _this.find(`.p8forw-row`).length; } catch (ex) { }
            for (var i = 0; i < len; i++) {
                var column = _this.find(`.p8forw-row:eq(${i})`).find(`.p8forw-col:eq(${(SPR_SBC_COLUMN - 1)}) .idval`).val();
                var columndesc = _this.find(`.p8forw-row:eq(${i})`).find(`.p8forw-col:eq(${(SPR_SBC_COLUMN - 1)}) .descval`).val();
                if (!isNull(column)) {
                    columnlist += '[' + column + '][' + columndesc + "], ";
                }          
            }
    
                    try {
                        columnlist = columnlist.substring(0, columnlist.length - 2);
                    } catch (ex) { }
            } catch (ex) { }
            //filter clause
            try {
                var filterlist = "";
                var Grid = nwGridCon_sbf_Book.ActiveSheet;
                var option = {
                    grd_type: "filter",
                    sourcetype: sourcetype,
                    grd_column: SPR_SBF_COLUMN,
                    grd_operation: SPR_SBF_OPERATION,
                    grd_value: SPR_SBF_VALUE,
                    grd_cell: SPR_SBF_CELLREFERENCE,
                }
                filterlist = p8forw_whereclause(Grid, option)
            } catch (ex) { }
            //parameter clause
            var parameterlist = "";
            //var parameterfixedlist = "";
            var parameterparamlist = "";
            //try {
            //    var Grid = nwGridCon_sbpfixed_Book.ActiveSheet;
            //    var option = {
            //        sourcetype: sourcetype,
            //        grd_column: SPR_SBPFIXED_PARAM,
            //        grd_operation: -1,
            //        grd_value: SPR_SBPFIXED_VALUE,
            //        grd_cell: SPR_SBPFIXED_CELLREFERENCE,
            //    }
            //    parameterfixedlist += p8forw_whereclause(Grid, option)
            //} catch (ex) { }
            try {
            var Grid = nwGridCon_sbp_Book.ActiveSheet;
            var option = {
                sourcetype: sourcetype,
                grd_column: SPR_SBP_PARAM,
                grd_operation: -1,
                grd_value: SPR_SBP_VALUE,
                grd_cell: SPR_SBP_CELLREFERENCE,
            }
            parameterparamlist += p8forw_whereclause(Grid, option)
            } catch (ex) { }
            //if (!isNull(parameterfixedlist) && !isNull(parameterparamlist)) {
            //    parameterlist = parameterfixedlist + ", " + parameterparamlist
            //} else if (!isNull(parameterfixedlist)) {
            //    parameterlist = parameterfixedlist
            //}
            //else if (!isNull(parameterparamlist)) {
                parameterlist = parameterparamlist
            //}
            //sort 
            try {
            var sortlist = "";
            var _this = $("#sbsort");
            var len = 0;
            try { len = _this.find(`.p8forw-row`).length; } catch (ex) { }
            for (var i = 0; i < len; i++) {

                var column = _this.find(`.p8forw-row:eq(${i})`).find(`.p8forw-col:eq(${(SPR_SBS_COLUMN - 1)}) .idval`).val();
                var sort = _this.find(`.p8forw-row:eq(${i})`).find(`.p8forw-col:eq(${(SPR_SBS_SORT - 1)}) select`).val();
                if (!isNull(column) && !isNull(sort)) {
                    sortlist += '[' + column + ']';
                    sortlist += " ";
                    sortlist += sort;
                    sortlist += ", ";
                }


            }
                try {
                    sortlist = sortlist.substring(0, sortlist.length - 2);
                } catch (ex) { }
            } catch (ex) { }
            var sqlsyntax = "";
            if (sourcetype == "P") {
               
                sqlsyntax = `exec ${table} ${parameterlist}`
            } else {
                columnlisttemp = columnlist;
                if (isNull(columnlisttemp)) {
                    columnlisttemp = " * ";
                }
                sqlsyntax = `select ${columnlisttemp} from ${table}`;
            }
            $("#txtsbsqlsyntax").val(sqlsyntax);
            $("#txtsbsqlcolumn").val(columnlist);
            $("#txtsbsqlfilter").val(filterlist);
            $("#txtsbsqlsort").val(sortlist);
        } else {
            $("#txtsbsqlsyntax").val("");
        }
    }

}


function p8forw_whereclause(Grid, option) {

    var whereclause = "";
    var rows = Grid.GetMaxRow();
    var sourcetype = p8Spread_GetJsonValue(option, "sourcetype");
    var grd_type = p8Spread_GetJsonValue(option, "grd_type");
    var grd_column = p8Spread_GetJsonValue(option, "grd_column");
    var grd_operation = p8Spread_GetJsonValue(option, "grd_operation");
    var grd_value = p8Spread_GetJsonValue(option, "grd_value");
    var grd_cell = p8Spread_GetJsonValue(option, "grd_cell");
    for (var i = 0; i < rows; i++) {
        var column = Grid.GetText((grd_column - 1), i);
        var operation = Grid.GetText((grd_operation - 1), i);
        if (operation == "equal") { operation = "=" }
        if (grd_operation == -1) { operation = "=" }
        var value = Grid.GetText((grd_value - 1), i);
        var cell = Grid.GetText((grd_cell - 1), i);
        if (!isNull(column)
                               && (!isNull(operation))
                               && (!isNull(value) || !isNull(cell))
                       ) {
          
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

            if (sourcetype == "P" && grd_type != "filter") {
                //if (grd_type == "filter") {
                //    column = `[${column}]`;
                //    whereclause += `${column} ${operation} ${data}, `;
                //} else {
                    whereclause += `@${column} ${operation} ${data}, `;
                //}
            }
            else {
                column = `[${column}]`;
                if (!isNull(whereclause)) {
                    whereclause += " and ";
                }
                else {
                    //whereclause += " where ";
                }
                //if (operation == "equal") {
                //    whereclause += `[${column}] = ${data}`;
                //}
                if (operation == "in" || operation == "not in") {
                    whereclause += `${column} ${operation} (${data})`;
                }
                else if (operation == "like" || operation == "not like") {
                    whereclause += `${column} ${operation} '%${data}%'`;
                }
                else {
                    whereclause += `${column} ${operation} ${data}`;
                }
            }
        }
    }
    if (sourcetype == "P") {
        try {
            whereclause = whereclause.substring(0, whereclause.length - 2);
        } catch (ex) { }
    }

    return whereclause;
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



$(document).on("click", "#p8forwbtnsbsave", function () {
    //$(this).closest(".p8forw-databindings-dataset").addClass("forw-remove");
    //SaveGrid_datasourcecolumn();
    var objecttype = $("#txtsbobjecttype").val();

    var msgBox = new GenLib.MessageBoxQuestion("sve");
    msgBox.message = "Do you want to save the current data?";
    msgBox.title = objecttype;
    msgBox.buttonYes = function () {
        nwLoading_Start(`p8forw_save`, crLoadingHTML);
        var messageresult = ValidateDataT("saved");
        if (isNull(messageresult)) {
            messageresult = p8forw_sb_save_to_json();
            var colindex = parseInt($("#txtsbcolindex").val());
            var rowindex = parseInt($("#txtsbrowindex").val());
            p8forw_checktoolbox(colindex, rowindex);
        }

        setTimeout(function () {
            MessageBox(messageresult, objecttype, "info");
            nwLoading_End(`p8forw_save`)
        }, 100);
    };
    msgBox.buttonNo = function () {
        return false;
    };

    msgBox.Show();
    return false;
});

function ValidateDataT(toolbox) {
    var messageerror = "";
    if ($("#txtsbobjecttype").val() == "drill") {
        if (isNull($("#idvallugsbtemplate").val())) {
            messageerror += `Cannot be ${toolbox}. Template is required.\n`
        }
    } else {
        var chksbisoverwrite = $("#chksbisoverwrite").prop("checked");
        if (!chksbisoverwrite) {
            if (isNull($("#idvallugsbsource").val())) {
                messageerror += `Cannot be ${toolbox}. Source is required.\n`
            }
        } else {
            if (isNull($("#txtsbsqlsyntax").val())) {
                messageerror += `Cannot be ${toolbox}. SQL Syntax is required.\n`
            }
        }
    }
    return messageerror;
}

function p8forw_sb_save_to_json() {
    var colindex = parseInt($("#txtsbcolindex").val());
    var rowindex = parseInt($("#txtsbrowindex").val());



    var jsonhdr = []
    jsonhdr.push({
        objecttype: $("#txtsbobjecttype").val(),
        //source: $("#idvallugsbsource").val(),
        //sourcedesc: $("#descvallugsbsource").val(),
        datasourceid: $("#txtsbdatasourceid").val(),
        //type: $("#txtsbType").val(),
        datasourcetype: $("#idvallugsbdatasourcetype").val(),
        //datasourcetypedesc: $("#descvallugsbdatasourcetype").val(),
        hidecolumnheader: $("#chksbhidecolumnheader").prop("checked"),
        overwrite: $("#chksbisoverwrite").prop("checked"),
        sqlsyntax: $("#txtsbsqlsyntax").val(),
        sqlcolumn: $("#txtsbsqlcolumn").val(),
        sqlfilter: $("#txtsbsqlfilter").val(),
        sqlsort: $("#txtsbsqlsort").val(),
        //datacondition
        aggregatesum: $("#chkaggregatesum").prop("checked"),
        //drill
        template: $("#idvallugsbtemplate").val(),

    });

    mSpreadBook.ActiveSheet.SetJSONData(colindex, rowindex, "p8forwsbhdr", jsonhdr);


    var jsonevent = []
    var Grid = nwGridCon_sbevent_Book.ActiveSheet;
    var rows = Grid.GetMaxRow();
    var rowno = 0;
    for (var i = 0; i < rows; i++) {
        var event = Grid.GetText((SPR_SBE_EVENT - 1), i);
        var eventdesc = Grid.GetText((SPR_SBE_EVENTDESC - 1), i);
        var cell = Grid.GetText((SPR_SBE_CELLREFERENCE - 1), i);
        if (!isNull(event)
        ) {
            rowno++;
            jsonevent.push({
                event: event,
                //eventdesc: eventdesc,
                cell: cell,
                rowno: rowno,
            })
        }
    }

    mSpreadBook.ActiveSheet.SetJSONData(colindex, rowindex, "p8forwsbevent", jsonevent, true);

    var jsoncolumn = []
    var _this = $("#sbcolumn");
    var len = 0;
    try { len = _this.find(`.p8forw-row`).length; } catch (ex) { }
    var rowno = 0;
    for (var i = 0; i < len; i++) {
        var column = _this.find(`.p8forw-row:eq(${i})`).find(`.p8forw-col:eq(${(SPR_SBC_COLUMN - 1)}) .idval`).val();
        var cell = _this.find(`.p8forw-row:eq(${i})`).find(`.p8forw-col:eq(${(SPR_SBC_CELLREFERENCE - 1)}) input`).val();

        if (!isNull(column)) {
            rowno++;
            jsoncolumn.push({
                column: column,
                cell: cell,
                rowno: rowno,
            })
        }
    }

    mSpreadBook.ActiveSheet.SetJSONData(colindex, rowindex, "p8forwsbcolumn", jsoncolumn, true);

    var jsonFilter = []
    var Grid = nwGridCon_sbf_Book.ActiveSheet;
    var rows = Grid.GetMaxRow();
    var rowno = 0;
    for (var i = 0; i < rows; i++) {
        var column = Grid.GetText((SPR_SBF_COLUMN - 1), i);
        //var columndesc = Grid.GetText((SPR_SBF_COLUMNDESC - 1), i);
        var operation = Grid.GetText((SPR_SBF_OPERATION - 1), i);
        //var operationdesc = Grid.GetText((SPR_SBF_OPERATIONDESC - 1), i);
        var value = Grid.GetText((SPR_SBF_VALUE - 1), i);
        var cell = Grid.GetText((SPR_SBF_CELLREFERENCE - 1), i);
        if (!isNull(column) || !isNull(operation)
            || !isNull(value) || !isNull(cell)
            )
        {
            rowno++;
            jsonFilter.push({
                column: column,
                //columndesc: columndesc,
                operation: operation,
                //operationdesc: operationdesc,
                value: value,
                cell: cell,
                rowno: rowno,
            })
        }
    }
    mSpreadBook.ActiveSheet.SetJSONData(colindex, rowindex, "p8forwsbfilter", jsonFilter);


    var jsonParam = []
    var Grid = nwGridCon_sbp_Book.ActiveSheet;
    var rows = Grid.GetMaxRow();
    var rowno = 0;
    for (var i = 0; i < rows; i++) {
        var param = Grid.GetText((SPR_SBP_PARAM - 1), i);
        //var paramdesc = Grid.GetText((SPR_SBP_PARAMDESC - 1), i);
        var value = Grid.GetText((SPR_SBP_VALUE - 1), i);
        var cell = Grid.GetText((SPR_SBP_CELLREFERENCE - 1), i);
        if (!isNull(value) || !isNull(cell)) {
            rowno++;
            jsonParam.push({
                param: param,
                //paramdesc: paramdesc,
                value: value,
                cell: cell,
                rowno: rowno,
            })
        }
    }
    mSpreadBook.ActiveSheet.SetJSONData(colindex, rowindex, "p8forwsbparam", jsonParam);


    var jsonsort = []
    var _this = $("#sbsort");
    var len = 0;
    try { len = _this.find(`.p8forw-row`).length; } catch (ex) { }
    var rowno = 0;
    for (var i = 0; i < len; i++) {
        var column = _this.find(`.p8forw-row:eq(${i})`).find(`.p8forw-col:eq(${(SPR_SBS_COLUMN - 1)}) .idval`).val();
        var sort = _this.find(`.p8forw-row:eq(${i})`).find(`.p8forw-col:eq(${(SPR_SBS_SORT - 1)}) select`).val();
        if (!isNull(column)) {
            rowno++;
            jsonsort.push({
                column: column,
                sort: sort,
                rowno: rowno,
            })
        }
    }

    mSpreadBook.ActiveSheet.SetJSONData(colindex, rowindex, "p8forwsbsort", jsonsort, true);

    var jsondrill = []
    var Grid = nwGridCon_sbdrill_Book.ActiveSheet;
    var rows = Grid.GetMaxRow();
    var rowno = 0;
    for (var i = 0; i < rows; i++) {
        var cellsource = Grid.GetText((SPR_SBD_CELLSOURCE - 1), i);
        var celldestination = Grid.GetText((SPR_SBD_CELLDESTINATION - 1), i);
        if (!isNull(cellsource) || !isNull(celldestination)
        ) {
            rowno++;
            jsondrill.push({
                cellsource: cellsource,
                celldestination: celldestination,
                rowno: rowno,
            })
        }
    }

    mSpreadBook.ActiveSheet.SetJSONData(colindex, rowindex, "p8forwsbdrill", jsondrill, true);


    p8forw_cellformat(colindex, rowindex, $("#txtsbobjecttype").val())

    return "Saved successfully.";
}


function p8forw_cellformat(col, row, id) {
    if (id == "datacondition") {
        var formula = "=FORW_DataCondition";
        // var formulacode = //formula.replace("{0}", p8forw_columnkey);
        mSpreadBook.ActiveSheet.SetFORWFormula(col, row, formula, "", false)
        mSpreadBook.ActiveSheet.SetText2(col, row, "DataCondition");
        mSpreadBook.ActiveSheet.SetBackground(col, row, "lightblue");
        //mSpreadBook.ActiveSheet.SetEnable(col, row, true);
    } else if (id == "lookup") {
        var formula = "=FORW_Lookup";
        var value = "Lookup"
        if ($("#txtlookupisaddtolist").val() == "1") {
            formula = "=FORW_AddToList";
            value = "Add To List";
        }
        // var formulacode = //formula.replace("{0}", p8forw_columnkey);
        mSpreadBook.ActiveSheet.SetFORWFormula(col, row, formula, "", false)
        mSpreadBook.ActiveSheet.SetText2(col, row, value);
        mSpreadBook.ActiveSheet.SetBackground(col, row, "lightblue");
        //mSpreadBook.ActiveSheet.SetEnable(col, row, true);

    } else if (id == "table") {
        var formula = "=FORW_Table";
        mSpreadBook.ActiveSheet.SetFORWFormula(col, row, formula, "", false)
        //mSpreadBook.ActiveSheet.SetText2(col, row, "Table");
        //mSpreadBook.ActiveSheet.SetBackground(col, row, "lightblue");
    } else if (id == "drill") {
        var formula = "=FORW_Drill";
        mSpreadBook.ActiveSheet.SetFORWFormula(col, row, formula, "", false)
        mSpreadBook.ActiveSheet.SetText2(col, row, "Drill");
        mSpreadBook.ActiveSheet.SetBackground(col, row, "lightblue");
    }
}


//Accordion Column
function p8forw_sbc_reloadgrid() {
    //initialize data
    //$(`#txtDataSourceID`).val('');
    //$("#txtDataSourceHasUpdate").val('');
    var col = $("#txtsbcolindex").val();
    var row = $("#txtsbrowindex").val();
    var sbc = mSpreadBook.ActiveSheet.GetJSONData(col, row, "p8forwsbcolumn");
    nwParameter_Add("jsonsbc", JSON.stringify(sbc));
    //nwLoading_Start("actCreateGrid_sb", crLoadingHTML);
    nwParameter_Add("idvallugsbdatasourcetype", $("#idvallugsbdatasourcetype").val());
    func_ActionDriven("actCreateGrid_sbc", false);
    
}

function CreateGrid_sbc(JSONstring) {
   
    var _this = $("#sbcolumn");

    //delete existing data in json
    try {
        var p8forw_key = "objectid"
        var p8forw_columnkey = "sbcolumn"
        var jsondata_delete = _p8forw_formatobject; //nwJson(_jsonnwGridCon, "docno", docno, false);
        for (var i = jsondata_delete.length - 1; i >= 0; i--) {
            var item = jsondata_delete[i];
            var id = item[p8forw_key];
            if (p8forw_columnkey === id) {
                jsondata_delete.splice(i, 1);
            }
        }
    } catch (ex) {
    }
    _p8forw_formatobject.push(
    { objectid: "sbcolumn", objecttype: "lookup", id: "lugsbcolumnnamec", classlist: "lugclrsb lugsbcolumnnamec", fieldname: "Column Name", hidecode: true },
    { objectid: "sbcolumn", objecttype: "input", id: "txtsbcell", classlist: "txtclrsb txtsbcell nwUpper", fieldname: "Cell" }
    )
    var objecttype = $("#txtsbobjecttype").val();
    
    //initialize
    _this.find(`.p8forw-row-first`).remove();
    _this.find(`.p8forw-row`).remove();

    p8forw_insertfirstdivider(_this);

    var JSONData = []
    JSONData = JSON.parse(JSONstring);
    try{
        JSONData = _sfJSONConvertKeysToLowerCase(JSONData);
    }catch(ex){}
    //JSONData.push({ column: "Code 1", alias: "Description 1" })
    //JSONData.push({ column: "Code 2", alias: "Description 2" })
    

    var p8forw_formatobject = nwJson(_p8forw_formatobject, "objectid", "sbcolumn", false);
    var len = 0;
    try { len = p8forw_formatobject.length; } catch (ex) { }
    for (var i = 0; i < len; i++) {
        var item = p8forw_formatobject[i];
        if (i == (SPR_SBC_CELLREFERENCE-1)) {
            if (objecttype == "lookup" || objecttype == "addtolist") {
                item.width = ""
            }
            else {
                item.width = "0"
            }
        } 
    }
    var len = 0;
    try { len = JSONData.length; } catch (ex) { }
    for (var i = 0; i < len; i++) {
        var item = JSONData[i];
        var column = p8Spread_GetJsonValue(item, "column");
        var alias = p8Spread_GetJsonValue(item, "alias");
        var cell = p8Spread_GetJsonValue(item, "cell");
        p8forw_insertrow(_this, i, p8forw_formatobject, true);
        _this.find(`.p8forw-row:eq(${i})`).find(`.p8forw-col:eq(${(SPR_SBC_COLUMN - 1)}) .idval`).val(column);
        _this.find(`.p8forw-row:eq(${i})`).find(`.p8forw-col:eq(${(SPR_SBC_COLUMN - 1)}) .descval`).val(alias);
        _this.find(`.p8forw-row:eq(${i})`).find(`.p8forw-col:eq(${(SPR_SBC_CELLREFERENCE - 1)}) input`).val(cell);
    }

    var len = 0;
    try { len = _this.find(`.p8forw-row`).length; } catch (ex) { }
    if (len <= 0) {
        p8forw_insertrow(_this, 0, p8forw_formatobject);
    }

    var objecttype = $("#txtsbobjecttype").val();
    if (objecttype == "datacondition") {
        _this.find(".p8forw-row-first").remove()
        _this.find(".p8forw-divider").remove()
        _this.find(".p8forw-row-close").remove()
    } else {
        p8forw_sortgrid(_this);
    }
}



//Accordion Sort
function p8forw_sbs_reloadgrid() {
    //initialize data
    var col = $("#txtsbcolindex").val();
    var row = $("#txtsbrowindex").val();
    var sbs = mSpreadBook.ActiveSheet.GetJSONData(col, row, "p8forwsbsort");
    nwParameter_Add("jsonsbs", JSON.stringify(sbs));
    nwParameter_Add("idvallugsbdatasourcetype", $("#idvallugsbdatasourcetype").val());
    func_ActionDriven("actCreateGrid_sbs", false);

}



function CreateGrid_sbs(JSONstring) {
    var _this = $("#sbsort");

            //delete existing data in json
            try {
                var p8forw_key = "objectid"
                var p8forw_columnkey = "sbsort"
                var jsondata_delete = _p8forw_formatobject; //nwJson(_jsonnwGridCon, "docno", docno, false);
                for (var i = jsondata_delete.length - 1; i >= 0; i--) {
                    var item = jsondata_delete[i];
                    var id = item[p8forw_key];
                    if (p8forw_columnkey === id) {
                        jsondata_delete.splice(i, 1);
                    }
                }
            } catch (ex) { }
    _p8forw_formatobject.push({
        objectid: "sbsort", objecttype: "lookup", id: "lugsbcolumnnames", classlist: "lugclrsb lugsbcolumnnames", fieldname: "Column Name", hidecode: true
    })
    _p8forw_formatobject.push({
        objectid: "sbsort", objecttype: "combobox", id: "cbxsort", classlist: "cbxclrsb cbxsort", fieldname: "Sort By"
    })


    //initialize
    _this.find(`.p8forw-row-first`).remove();
    _this.find(`.p8forw-row`).remove();
    p8forw_insertfirstdivider(_this);

    var JSONData = []
    JSONData = JSON.parse(JSONstring);
    try {
        JSONData = _sfJSONConvertKeysToLowerCase(JSONData);
    } catch (ex) { }
    //JSONData.push({ column: "Code 1", alias: "Description 1" })
    //JSONData.push({ column: "Code 2", alias: "Description 2" })
    var len = 0;
    try { len = JSONData.length; } catch (ex) { }

    var p8forw_formatobject = nwJson(_p8forw_formatobject, "objectid", "sbsort", false);

    for (var i = 0; i < len; i++) {
        var item = JSONData[i];
        var column = p8Spread_GetJsonValue(item, "column");
        var alias = p8Spread_GetJsonValue(item, "alias");
        var sort = p8Spread_GetJsonValue(item, "sort") || "asc";
        p8forw_insertrow(_this, i, p8forw_formatobject, true);
        _this.find(`.p8forw-row:eq(${i})`).find(`.p8forw-col:eq(${(SPR_SBS_COLUMN - 1)}) .idval`).val(column);
        _this.find(`.p8forw-row:eq(${i})`).find(`.p8forw-col:eq(${(SPR_SBS_COLUMN - 1)}) .descval`).val(alias);
        _this.find(`.p8forw-row:eq(${i})`).find(`.p8forw-col:eq(${(SPR_SBS_SORT - 1)}) select`).val(sort);
        //_this.find(`.p8forw-row:eq(${i})`).find(`.p8forw-col:eq(${(SPR_SBS_SORTDESC - 1)}) .descval`).val(alias);
    }

    var len = 0;
    try { len = _this.find(`.p8forw-row`).length; } catch (ex) { }
    if (len <= 0) {
        p8forw_insertrow(_this, 0, p8forw_formatobject);
    }

    p8forw_sortgrid(_this);
}




$(document).on("change", ".txtsbcell", function () {
    var cell = $(this).val();
    var isValid = p8forw_isValidCellRangeFormat(cell);
    if (!isValid) {
        $(this).val("");
    }
});

function p8forw_row_close_done(){
    formatsqlselectsyntax_sb();
}
function p8forw_row_sort_done() {
    formatsqlselectsyntax_sb();
}


$(document).on("change", ".p8forwgrid", function () {
    var id = $(this).attr("id")
    if (id == "sbcolumn") {
        formatsqlselectsyntax_sb();
    } else if (id == "sbsort") {
        formatsqlselectsyntax_sb();
    }
});