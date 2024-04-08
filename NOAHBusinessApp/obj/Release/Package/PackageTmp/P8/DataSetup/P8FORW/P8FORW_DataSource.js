var nwGridCon_datasource_Book;
var nwGridCon_datasource_Sheet;

var nwGridCon_datasourcepsh_Book;
var nwGridCon_datasourcepsh_Sheet;
var nwGridCon_datasourcepsl_Book;
var nwGridCon_datasourcepsl_Sheet;

var nwGridCon_datasourcepsc_Book;
var nwGridCon_datasourcepsc_Sheet;



var nwGridCon_datasourcer_Book;
var nwGridCon_datasourcer_Sheet;

var startindex1 = 0,
            SPR_DA_DATASOURCEID = ++startindex1,
            SPR_DA_NAME = ++startindex1,
            SPR_DA_DATASOURCE = ++startindex1,
            SPR_DA_DATASOURCEDESC = ++startindex1,
            SPR_DA_TYPE = ++startindex1,
            SPR_DA_TYPEDESC = ++startindex1,
            SPR_DA_SOURCE = ++startindex1,
            SPR_DA_PARAMETERSETUP = ++startindex1,
            SPR_DA_PARAMETERSETUPHASDATA = ++startindex1,
            SPR_DA_RIGHTS = ++startindex1,
            SPR_DA_RIGHTSHASDATA = ++startindex1;

var startindex5 = 0,
               SPR_DAPSH_SUBTYPE = ++startindex5,
               SPR_DAPSH_NAME = ++startindex5,
               SPR_DAPSH_MAINPARAM = ++startindex5,
               SPR_DAPSH_MAINPARAMVALUE = ++startindex5,
               SPR_DAPSH_COLUMN = ++startindex5,
               SPR_DAPSH_COLUMNHASDATA = ++startindex5;

var startindex12 = 0,
                       SPR_DAPSL_INCLUDE = ++startindex12,
                       SPR_DAPSL_PARAM = ++startindex12,
                       SPR_DAPSL_DESC = ++startindex12,
                       SPR_DAPSL_INITIALVALUE = ++startindex12;

var startindex13 = 0,
               SPR_DAR_USER = ++startindex13,
               SPR_DAR_USERDESC = ++startindex13;

var startindex18 = 0,
                       SPR_DAPSC_INCLUDE = ++startindex18,
                       SPR_DAPSC_COLUMN = ++startindex18,
                       SPR_DAPSC_ALIAS = ++startindex18;

//updated 01/22/2024
$(document).on("click", "#p8forw-vwdatasource", function () {
    //show modal
    nwPopupForm_ShowModal("frm-popup-p8forw-vwdatasource");
    var title = $(this).find(`.nwe-ed-icontext`).text();
    $(`#frm-popup-p8forw-vwdatasource`).find(".modal-hdr .modal-hdr-title").text(title);
    p8forw_datasource_refresh();
    return false;
});
$(document).on("click", "#p8forw-datasource-refresh", function () {
    p8forw_datasource_refresh();
});
function p8forw_datasource_refresh() {
    //initialize data
    nwPopupForm_HideModal("frm-popup-p8forw-vwdatasource-adddata");
    nwLoading_Start("actCreateGrid_datasource", crLoadingHTML);
    func_ActionDriven("actCreateGrid_datasource", false);
}
function CreateGridDone_datasource() {
    var Grid = nwGridCon_datasource_Book.ActiveSheet;
    var rows = Grid.GetMaxRow();
    for (var row = 0; row < rows; row++) {
        
        var DataSourceID = Grid.GetText((SPR_DA_DATASOURCEID - 1), row);
        if (!isNull(DataSourceID)) {
            var hasdata = Grid.GetText((SPR_DA_PARAMETERSETUPHASDATA - 1), row);
            if (hasdata == "1") {
                Grid.SetBackground((SPR_DA_PARAMETERSETUP - 1), row, "green");
            } else {
                Grid.SetBackground((SPR_DA_PARAMETERSETUP - 1), row, "orange");
            }
            var hasdata = Grid.GetText((SPR_DA_RIGHTSHASDATA - 1), row);
            if (hasdata == "1") {
                Grid.SetBackground((SPR_DA_RIGHTS - 1), row, "green");
            } else {
                Grid.SetBackground((SPR_DA_RIGHTS - 1), row, "orange");
            }
        }
    }
}


//$(document).on("click", "#p8forw-datasource-save", function () {
//    //$(this).closest(".p8forw-databindings-dataset").addClass("forw-remove");
//    //SaveGrid_datasourcecolumn();

//    var msgBox = new GenLib.MessageBoxQuestion("sve");
//    msgBox.message = "Do you want to save the current data?";
//    msgBox.title = "Data Source";
//    msgBox.buttonYes = function () {
//        try {
//            nwParameter_Add_DataSet("nwGridCon_datasource");
//        } catch (ex) { }
//        //try {
//        //    nwParameter_Add("jsonnwGridCon_datasourcecolumn", JSON.stringify(_jsonnwGridCon_datasourcecolumn));
//        //} catch (ex) { }
//        nwLoading_Start("actsave_datasource", crLoadingHTML);
//        func_ActionDriven("actsave_datasource", false);
//    };
//    msgBox.buttonNo = function () {
//        return false;
//    };

//    msgBox.Show();
//    return false;
//});

//function CreateGrid_datasourcecolumn() {

//    // Forw_InitializeSpread(nwGridCon_datasourcecolumn_Book, 0);

//    var hasdata = false;

//    var DataSourceID = $("#txtDataSourceID").val();

//    var json = nwJson(_jsonnwGridCon_datasourcecolumn, "datasourceid", DataSourceID, false);
//    var Grid = nwGridCon_datasourcecolumn_Book.ActiveSheet;
//    try {
//        var len = json.length;
//        if (len > 0) {
//            hasdata = true;
//        }
//        var minrow = len < 5 ? 5 : len + 1;
//        Forw_InitializeSpread(nwGridCon_datasourcecolumn_Book, minrow);
//    } catch (ex) { }

//    var maxrowno = 0;
//    $.each(json, function (i, item) {
//        Grid.SetText((SPR_DAC_COLUMN - 1), i, item.column);
//        Grid.SetText((SPR_DAC_NAME - 1), i, item.name);
//        Grid.SetText((SPR_DAC_TYPE - 1), i, item.type);
//        Grid.SetText((SPR_DAC_TYPEDESC - 1), i, item.typedesc);
//        Grid.SetText((SPR_DAC_VALUETYPE - 1), i, item.valuetype);

//    });
//    CreateGridDone_datasourcecolumn();
//}


//function CreateGridDone_datasourcecolumn() {
//    if (isNull($(`#txtDataSourceID`).val())) {
//        $("#nwGridCon_datasourcecolumn").enable(false);
//    } else {
//        $("#nwGridCon_datasourcecolumn").enable(true);
//    }
//}


//function SaveGrid_datasourcecolumn() {
//    if ($("#txtDataSourceHasUpdate").val() == "1") {
//        var datasourceid = $(`#txtDataSourceID`).val();
//        var hasupdate = "1";
//        //delete existing data in json
//        try {
//            var p8forw_key = "datasourceid"
//            var p8forw_columnkey = datasourceid
//            var jsondata_delete = _jsonnwGridCon_datasourcecolumn; //nwJson(_jsonnwGridCon, "docno", docno, false);
//            for (var i = jsondata_delete.length - 1; i >= 0; i--) {
//                var item = jsondata_delete[i];
//                var id = item[p8forw_key];
//                if (p8forw_columnkey === id) {
//                    jsondata_delete.splice(i, 1);
//                }
//            }
//        } catch (ex) { }

//        var Grid = nwGridCon_datasourcecolumn_Book.ActiveSheet;
//        var rows = Grid.GetMaxRow();
//        for (var i = 0; i < rows; i++) {
//            var column = Grid.GetText((SPR_DAC_COLUMN - 1), i);
//            if (!isNull(column)) {
//                var name = Grid.GetText((SPR_DAC_NAME - 1), i);
//                var type = Grid.GetText((SPR_DAC_TYPE - 1), i);
//                var typedesc = Grid.GetText((SPR_DAC_TYPEDESC - 1), i);
//                var valuetype = Grid.GetText((SPR_DAC_VALUETYPE - 1), i);
//                _jsonnwGridCon_datasourcecolumn.push({
//                    datasourceid: datasourceid,
//                    column: column,
//                    name: name,
//                    type: type,
//                    typedesc: typedesc,
//                    valuetype: valuetype,
//                    hasupdate: hasupdate,
//                });
//            }
//        }
//    }
//}


function ClearFields_AddData() {
    $(".txtclrluad").val('');
    $(".lugclrluad input").val('');
    $(".chkclrluad").prop("checked", false);
}

$(document).on("click", "#DDAddData", function () {
    ClearFields_AddData();
    nwPopupForm_ShowModal("frm-popup-p8forw-vwdatasource-adddata");
    var title = "Data Source";
    $(`#frm-popup-p8forw-vwdatasource-adddata`).find(".modal-hdr .modal-hdr-title").text(title);
    return false;
});

$(document).on("click", "#DDModifiedData", function () {
    var Grid = nwGridCon_datasource_Book.ActiveSheet;
    var row = Grid.GetSelectedIndexes().row;
    var DataSourceID = Grid.GetText((SPR_DA_DATASOURCEID - 1), row)
    if(isNull(DataSourceID)){
        return false;
    }
    ClearFields_AddData();
    nwPopupForm_ShowModal("frm-popup-p8forw-vwdatasource-adddata");
    var title = "Data Source";
    $(`#frm-popup-p8forw-vwdatasource-adddata`).find(".modal-hdr .modal-hdr-title").text(title);
    var Grid = nwGridCon_datasource_Book.ActiveSheet;
    var row = Grid.GetSelectedIndexes().row;
    $("#txtdatasourceadddatadatasourceid").val(DataSourceID);
    $("#txtdatasourceadddataname").val(Grid.GetText((SPR_DA_NAME - 1), row))
    $("#idvallugdatasourceadddataconnectivity").val(Grid.GetText((SPR_DA_DATASOURCE - 1), row))
    $("#descvallugdatasourceadddataconnectivity").val(Grid.GetText((SPR_DA_DATASOURCEDESC - 1), row))
    $("#idvallugdatasourceadddatasourcetype").val(Grid.GetText((SPR_DA_TYPE - 1), row))
    $("#descvallugdatasourceadddatasourcetype").val(Grid.GetText((SPR_DA_TYPEDESC - 1), row))
    $("#idvallugdatasourceadddatasource").val(Grid.GetText((SPR_DA_SOURCE - 1), row))
    $("#descvallugdatasourceadddatasource").val(Grid.GetText((SPR_DA_SOURCE - 1), row))
        
    return false;
});
$(document).on("click", "#DDDeleteData", function () {
    var Grid = nwGridCon_datasource_Book.ActiveSheet;
    var row = Grid.GetSelectedIndexes().row;
    var DataSourceID = Grid.GetText((SPR_DA_DATASOURCEID - 1), row)
    if (isNull(DataSourceID)) {
        return false;
    }
    var msgTitle = "Data Source";
    //var icon = "error";
    var msgBox = new GenLib.MessageBoxQuestion("p8forwbtndatasourcedeletedatasave");
    msgBox.message = "Do you want to delete this record?";
    msgBox.title = msgTitle;
    msgBox.buttonYes = function () {
        var Grid = nwGridCon_datasource_Book.ActiveSheet;
        var row = Grid.GetSelectedIndexes().row;
        nwParameter_Add("DataSourceID", Grid.GetText((SPR_DA_DATASOURCEID - 1), row))
        nwLoading_Start(`actdelete_datasource`, crLoadingHTML);
        func_ActionDriven("actdelete_datasource", false);
        // nwLoading_Start(`p8forw_save`, crLoadingHTML);
        //var messageresult = ValidateDataDataSourceAddData("saved");
        // if (isNull(messageresult)) {
        //messageresult = p8forw_lookup_save_to_json();
        // icon = "info";
        // }

        //setTimeout(function () {
        //    MessageBox(messageresult, msgTitle, icon);
        //    nwLoading_End(`p8forw_save`)
        //}, 100);
    };
    msgBox.buttonNo = function () {
        return false;
    };

    msgBox.Show();
    return false;
});


$(document).on("click", "#p8forwbtndatasourceadddatasave", function () {
    //$(this).closest(".p8forw-databindings-dataset").addClass("forw-remove");
    //SaveGrid_datasourcecolumn();
    var msgTitle = "Data Source";
    //var icon = "error";
    var msgBox = new GenLib.MessageBoxQuestion("p8forwbtndatasourceadddatasave");
    msgBox.message = "Do you want to save the current data?";
    msgBox.title = msgTitle;
    msgBox.buttonYes = function () {
        
        nwParameter_Add("txtdatasourceadddatadatasourceid", $("#txtdatasourceadddatadatasourceid").val())
        nwParameter_Add("idvallugdatasourceadddataconnectivity", $("#idvallugdatasourceadddataconnectivity").val())
        nwParameter_Add("idvallugdatasourceadddatasourcetype", $("#idvallugdatasourceadddatasourcetype").val())
        nwParameter_Add("idvallugdatasourceadddatasource", $("#idvallugdatasourceadddatasource").val())
        nwParameter_Add("txtdatasourceadddataname", $("#txtdatasourceadddataname").val())
        nwLoading_Start(`actsave_datasource`, crLoadingHTML);
        func_ActionDriven("actsave_datasource", false);
       // nwLoading_Start(`p8forw_save`, crLoadingHTML);
        //var messageresult = ValidateDataDataSourceAddData("saved");
       // if (isNull(messageresult)) {
            //messageresult = p8forw_lookup_save_to_json();
           // icon = "info";
       // }

        //setTimeout(function () {
        //    MessageBox(messageresult, msgTitle, icon);
        //    nwLoading_End(`p8forw_save`)
        //}, 100);
    };
    msgBox.buttonNo = function () {
        return false;
    };

    msgBox.Show();
    return false;
});

//PS Start


function ClearFields_PS() {
    $(".txtclrlups").val('');
    $(".lugclrlups input").val('');
    $(".chkclrlups").prop("checked", false);
}

function p8forw_datasourceps_refresh() {
    ClearFields_PS();
    nwPopupForm_HideModal("frm-popup-p8forw-vwdatasourceps-adddata");

    var Grid = nwGridCon_datasource_Book.ActiveSheet;
    var row = Grid.GetSelectedIndexes().row;
    $("#txtdatasourcepsdatasourceid").val(Grid.GetText((SPR_DA_DATASOURCEID - 1), row))
    $("#txtdatasourcepsname").val(Grid.GetText((SPR_DA_NAME - 1), row))
    $("#txtdatasourcepsdatasource").val(Grid.GetText((SPR_DA_DATASOURCE - 1), row))
    $("#txtdatasourcepstype").val(Grid.GetText((SPR_DA_TYPE - 1), row))
    $("#txtdatasourcepssource").val(Grid.GetText((SPR_DA_SOURCE - 1), row))
    nwPopupForm_ShowModal("frm-popup-p8forw-vwdatasource-ps");
    var title = "Data Source Type";
    $(`#frm-popup-p8forw-vwdatasource-ps`).find(".modal-hdr .modal-hdr-title").text(title);
    p8forw_datasourcepsh_reloadgrid();
    
}


function ClearFieldsps_AddData() {
    $(".txtclrlupsad").val('');
    $(".lugclrlupsad input").val('');
    $(".chkclrlupsad").prop("checked", false);
}

function p8forw_psfshowfields() {
    var sourcetype = $(`#txtdatasourcepstype`).val();
    $(`.p8forw_psf`).hide();
    if (sourcetype == "V") {
        $(`.p8forw_psf_v`).show();
    } else if (sourcetype == "U") {
        $(`.p8forw_psf_u`).show();
    } else if (sourcetype == "FN") {
        $(`.p8forw_psf_fn`).show();
    } else if (sourcetype == "P") {
        $(`.p8forw_psf_p`).show();
    }
}
$(document).on("click", "#PSHAddData", function () {
    ClearFieldsps_AddData();
    nwPopupForm_ShowModal("frm-popup-p8forw-vwdatasourceps-adddata");
    var title = "Data Source Type";
    $(`#frm-popup-p8forw-vwdatasourceps-adddata`).find(".modal-hdr .modal-hdr-title").text(title);
    p8forw_psfshowfields();
    p8forw_custgetpara_datasourceps();
    nwLoading_Start("actdef_datasourcepsl", crLoadingHTML);
    func_ActionDriven("actdef_datasourcepsl", false);
    p8forw_datasourcepsl_reloadgrid();
    return false;
});

$(document).on("click", "#PSHModifiedData", function () {
    var Grid = nwGridCon_datasourcepsh_Book.ActiveSheet;
    var row = Grid.GetSelectedIndexes().row;
    var SubType = Grid.GetText((SPR_DAPSH_SUBTYPE - 1), row)
    if (isNull(SubType)) {
        return false;
    }

    ClearFieldsps_AddData();
    nwPopupForm_ShowModal("frm-popup-p8forw-vwdatasourceps-adddata");
    var title = "Data Source Type";
    $(`#frm-popup-p8forw-vwdatasourceps-adddata`).find(".modal-hdr .modal-hdr-title").text(title);
    p8forw_psfshowfields();
    $("#txtdatasourcepsadddatasubtype").val(SubType)
    $("#txtdatasourcepsadddataname").val(Grid.GetText((SPR_DAPSH_NAME - 1), row))
    $("#idvallugdatasourceadddatamainparam").val(Grid.GetText((SPR_DAPSH_MAINPARAM - 1), row))
    $("#descvallugdatasourceadddatamainparam").val(Grid.GetText((SPR_DAPSH_MAINPARAM - 1), row))
    $("#txtdatasourcepsadddatamainparamvalue").val(Grid.GetText((SPR_DAPSH_MAINPARAMVALUE - 1), row))
    p8forw_datasourcepsl_reloadgrid();
    return false;
});
$(document).on("click", "#PSHDeleteData", function () {
    var Grid = nwGridCon_datasourcepsh_Book.ActiveSheet;
    var row = Grid.GetSelectedIndexes().row;
    var SubType = Grid.GetText((SPR_DAPSH_SUBTYPE - 1), row)
    if (isNull(SubType)) {
        return false;
    }
    var msgTitle = "Data Source Type";
    //var icon = "error";
    var msgBox = new GenLib.MessageBoxQuestion("p8forwbtndatasourcepsdeletedatasave");
    msgBox.message = "Do you want to delete this record?";
    msgBox.title = msgTitle;
    msgBox.buttonYes = function () {
        var Grid = nwGridCon_datasourcepsh_Book.ActiveSheet;
        var row = Grid.GetSelectedIndexes().row;
        nwParameter_Add("txtdatasourcepsdatasourceid", $("#txtdatasourcepsdatasourceid").val())
        nwParameter_Add("SubType", Grid.GetText((SPR_DAPSH_SUBTYPE - 1), row))
        nwLoading_Start(`actdelete_datasourceps`, crLoadingHTML);
        func_ActionDriven("actdelete_datasourceps", false);
    };
    msgBox.buttonNo = function () {
        return false;
    };

    msgBox.Show();
    return false;
});
function p8forw_custgetpara_datasourcepsh() {
    nwParameter_Add("txtdatasourcepsadddatasubtype", $("#txtdatasourcepsadddatasubtype").val())
    nwParameter_Add("txtdatasourcepsadddataname", $("#txtdatasourcepsadddataname").val())
    nwParameter_Add("idvallugdatasourceadddatamainparam", $("#idvallugdatasourceadddatamainparam").val())
    nwParameter_Add("txtdatasourcepsadddatamainparamvalue", $("#txtdatasourcepsadddatamainparamvalue").val())
    try {
        nwParameter_Add_DataSet("nwGridCon_datasourcepsl");
    } catch (ex) { }
}
$(document).on("click", "#p8forwbtndatasourcepsadddatasave", function () {
    //$(this).closest(".p8forw-databindings-dataset").addClass("forw-remove");
    //SaveGrid_datasourcecolumn();
    var msgTitle = "Data Source Type";
    //var icon = "error";
    var msgBox = new GenLib.MessageBoxQuestion("p8forwbtndatasourcepsadddatasave");
    msgBox.message = "Do you want to save the current data?";
    msgBox.title = msgTitle;
    msgBox.buttonYes = function () {

      
        nwLoading_Start(`actsave_datasourceps`, crLoadingHTML);
        p8forw_custgetpara_datasourceps();
        p8forw_custgetpara_datasourcepsh();
        func_ActionDriven("actsave_datasourceps", false);
        // nwLoading_Start(`p8forw_save`, crLoadingHTML);
        //var messageresult = ValidateDataDataSourceAddData("saved");
        // if (isNull(messageresult)) {
        //messageresult = p8forw_lookup_save_to_json();
        // icon = "info";
        // }

        //setTimeout(function () {
        //    MessageBox(messageresult, msgTitle, icon);
        //    nwLoading_End(`p8forw_save`)
        //}, 100);
    };
    msgBox.buttonNo = function () {
        return false;
    };

    msgBox.Show();
    return false;
});


function p8forw_custgetpara_datasourceps(){
    nwParameter_Add("txtdatasourcepsdatasourceid", $("#txtdatasourcepsdatasourceid").val())
    nwParameter_Add("txtdatasourcepsdatasource", $("#txtdatasourcepsdatasource").val())
    nwParameter_Add("txtdatasourcepstype", $("#txtdatasourcepstype").val())
    nwParameter_Add("txtdatasourcepssource", $("#txtdatasourcepssource").val())
}
function p8forw_datasourcepsh_reloadgrid() {
    p8forw_custgetpara_datasourceps();
    nwLoading_Start("actCreateGrid_datasourcepsh", crLoadingHTML);
    func_ActionDriven("actCreateGrid_datasourcepsh", false);
}

function CreateGridDone_datasourcepsh() {

    var Grid = nwGridCon_datasourcepsh_Book.ActiveSheet;
    var rows = Grid.GetMaxRow();
    for (var row = 0; row < rows; row++) {

        var SubType = Grid.GetText((SPR_DAPSH_SUBTYPE - 1), row);
        if (!isNull(SubType)) {
            var hasdata = Grid.GetText((SPR_DAPSH_COLUMNHASDATA - 1), row);
            if (hasdata == "1") {
                Grid.SetBackground((SPR_DAPSH_COLUMN - 1), row, "green");
            } else {
                Grid.SetBackground((SPR_DAPSH_COLUMN - 1), row, "orange");
            }
        }
    }
}


function p8forw_datasourcepsl_reloadgrid() {
    p8forw_custgetpara_datasourceps();
    p8forw_custgetpara_datasourcepsh();

    nwLoading_Start("actCreateGrid_datasourcepsl", crLoadingHTML);
    func_ActionDriven("actCreateGrid_datasourcepsl", false);
}


//function CreateGrid_datasourcepsl() {

//    // Forw_InitializeSpread(nwGridCon_datasourcecolumn_Book, 0);

//    var hasdata = false;

//    var id = $("#txtdatasourcepsid").val();

//    var json = nwJson(_jsonnwGridCon_datasourcepsl, "id", id, false);
//    var Grid = nwGridCon_datasourcepsl_Book.ActiveSheet;
//    try {
//        var len = json.length;
//        if (len > 0) {
//            hasdata = true;
//        }
//        var minrow = len < 5 ? 5 : len + 1;
//        Forw_InitializeSpread(nwGridCon_datasourcepsl_Book, minrow);
//    } catch (ex) { }

//    var maxrowno = 0;
//    $.each(json, function (i, item) {
//        Grid.SetText((SPR_DAPSL_PARAM - 1), i, item.param);
//        Grid.SetText((SPR_DAPSL_DESC - 1), i, item.description);
//        Grid.SetText((SPR_DAPSL_INITIALVALUE - 1), i, item.initialvalue);
//    });
//    CreateGridDone_datasourcepsl();
//}


function CreateGridDone_datasourcepsl() {
    //if (isNull($(`#txtdatasourcepsid`).val())) {
    //    $("#nwGridCon_datasourcepsl").enable(false);
    //} else {
    //    $("#nwGridCon_datasourcepsl").enable(true);
    //}

    var Grid = nwGridCon_datasourcepsl_Book.ActiveSheet;
    var rows = Grid.GetMaxRow();
    var hasparam = false;
    for (var row = 0; row < rows; row++) {
        var param = Grid.GetText((SPR_DAPSL_PARAM - 1), row);
        if (!isNull(param)) {
            hasparam = true;
        }
    }
    if (hasparam) {
        $("#nwGridCon_datasourcepsl").enable(true)
    } else {
        $("#nwGridCon_datasourcepsl").enable(false)
    }
}


function CreateGridDone_datasourcepsc() {
    //if (isNull($(`#txtdatasourcepsid`).val())) {
    //    $("#nwGridCon_datasourcepsl").enable(false);
    //} else {
    //    $("#nwGridCon_datasourcepsl").enable(true);
    //}
    var sourcetype = $(`#txtdatasourcepstype`).val();
    if (sourcetype == "P" || sourcetype == "FN") {
        var Grid = nwGridCon_datasourcepsc_Book.ActiveSheet;
        var Gridrows = Grid.GetMaxRow();
        var Gridcols = Grid.GetMaxCol();
        for (var y = Gridrows; y < 5; y++) {
            Grid.RowAdd();
        }
        if (Gridrows > 5) {
            Grid.RowAdd();
        }
    }

   
    var Grid = nwGridCon_datasourcepsc_Book.ActiveSheet;
    var rows = Grid.GetMaxRow();
    var hasparam = false;
    for (var row = 0; row < rows; row++) {
        p8forw_datasourcepsc_include(-1, row);
        //Grid.SetText((SPR_DAPSC_INCLUDE - 1), row,"1");
        //var column = Grid.GetText((SPR_DAPSC_COLUMN - 1), row);
        //if (!isNull(column)) {
        //    hasparam = true;
        //}
    }
    //if (hasparam) {
    //    $("#nwGridCon_datasourcepsl").enable(true)
    //} else {
    //    $("#nwGridCon_datasourcepsl").enable(false)
    //}
}

function p8forw_datasourcepsc_include(col, row) {
    var Grid = nwGridCon_datasourcepsc_Book.ActiveSheet;
    var sourcetype = $(`#txtdatasourcepstype`).val();
    if(sourcetype == "P" || sourcetype == "FN"){
        Grid.SetText((SPR_DAPSC_INCLUDE - 1), row, "1");
    }
}




function ClearFields_datasourcepsc() {
    $(".txtclrlupsad").val('');
    $(".lugclrlupsad input").val('');
    $(".chkclrlupsad").prop("checked", false);
}

function p8forw_datasourcepsc_refresh() {
    ClearFields_datasourcepsc();
    nwPopupForm_ShowModal("frm-popup-p8forw-vwdatasource-psc");
    var title = "Column/Field";
    $(`#frm-popup-p8forw-vwdatasource-psc`).find(".modal-hdr .modal-hdr-title").text(title);

    var Grid = nwGridCon_datasourcepsh_Book.ActiveSheet;
    var row = Grid.GetSelectedIndexes().row;
    $("#txtdatasourcepscsubtype").val(Grid.GetText((SPR_DAPSH_SUBTYPE - 1), row))
    p8forw_datasourcepsc_reloadgrid();

}
function p8forw_custgetpara_datasourcepsc() {
    nwParameter_Add("txtdatasourcepscsubtype", $("#txtdatasourcepscsubtype").val())
    try {
        nwParameter_Add_DataSet("nwGridCon_datasourcepsc");
    } catch (ex) { }
}
function p8forw_datasourcepsc_reloadgrid() {
    p8forw_custgetpara_datasourceps();
    p8forw_custgetpara_datasourcepsc();
    nwLoading_Start("actCreateGrid_datasourcepsc", crLoadingHTML);
    func_ActionDriven("actCreateGrid_datasourcepsc", false);
}


$(document).on("click", "#p8forwbtndatasourcepscsave", function () {
    //$(this).closest(".p8forw-databindings-dataset").addClass("forw-remove");
    //SaveGrid_datasourcecolumn();
    var msgTitle = "Column";
    //var icon = "error";
    var msgBox = new GenLib.MessageBoxQuestion("p8forwbtndatasourcepscsave");
    msgBox.message = "Do you want to save the current data?";
    msgBox.title = msgTitle;
    msgBox.buttonYes = function () {

        p8forw_custgetpara_datasourceps();
        p8forw_custgetpara_datasourcepsc();
        nwLoading_Start(`actsave_datasourcepsc`, crLoadingHTML);
        func_ActionDriven("actsave_datasourcepsc", false);
    };
    msgBox.buttonNo = function () {
        return false;
    };

    msgBox.Show();
    return false;
});

function ClearFields_datasourcer() {
    $(".txtclrlur").val('');
    $(".lugclrlur input").val('');
    $(".chkclrlur").prop("checked", false);
}

function p8forw_datasourcer_refresh() {
    ClearFields_datasourcer();

    var Grid = nwGridCon_datasource_Book.ActiveSheet;
    var row = Grid.GetSelectedIndexes().row;
    $("#txtdatasourcerdatasourceid").val(Grid.GetText((SPR_DA_DATASOURCEID - 1), row))
    $("#txtdatasourcername").val(Grid.GetText((SPR_DA_NAME - 1), row))
    nwPopupForm_ShowModal("frm-popup-p8forw-vwdatasource-r");
    var title = "Rights";
    $(`#frm-popup-p8forw-vwdatasource-r`).find(".modal-hdr .modal-hdr-title").text(title);
    p8forw_datasourcer_reloadgrid();

}

function p8forw_custgetpara_datasourcer() {
    nwParameter_Add("txtdatasourcerdatasourceid", $("#txtdatasourcerdatasourceid").val());
    try {
        nwParameter_Add_DataSet("nwGridCon_datasourcer");
    } catch (ex) { }
}
function p8forw_datasourcer_reloadgrid() {
    p8forw_custgetpara_datasourcer();
    nwLoading_Start("actCreateGrid_datasourcer", crLoadingHTML);
    func_ActionDriven("actCreateGrid_datasourcer", false);
}

function CreateGridDone_datasourcer() {
    var Grid = nwGridCon_datasourcer_Book.ActiveSheet;
    var Gridrows = Grid.GetMaxRow();
    var Gridcols = Grid.GetMaxCol();

    for (var y = Gridrows; y < 5; y++) {
        Grid.RowAdd();
    }

    if (Gridrows > 5) {
        Grid.RowAdd();
    }

  
}



$(document).on("click", "#p8forwbtndatasourcersave", function () {
    //$(this).closest(".p8forw-databindings-dataset").addClass("forw-remove");
    //SaveGrid_datasourcecolumn();
    var msgTitle = "Rights";
    //var icon = "error";
    var msgBox = new GenLib.MessageBoxQuestion("p8forwbtndatasourcersave");
    msgBox.message = "Do you want to save the current data?";
    msgBox.title = msgTitle;
    msgBox.buttonYes = function () {

        p8forw_custgetpara_datasourcer();
        nwLoading_Start(`actsave_datasourcer`, crLoadingHTML);
        func_ActionDriven("actsave_datasourcer", false);
    };
    msgBox.buttonNo = function () {
        return false;
    };

    msgBox.Show();
    return false;
});