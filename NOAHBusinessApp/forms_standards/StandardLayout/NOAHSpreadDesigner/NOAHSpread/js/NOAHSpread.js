//    # NEW NOAH WEB UI
//    # Company Owner: Forecasting and Planning Technologies Inc. | NOAH Business Applications | PROMPTUS 8
//    # Developer : Rico P. Buenviaje
//    # Designer : Rico P. Buenviaje
//    # Date Created : December 12, 2022
//    # Date Modified : November 19, 2022 | RPB

var _NSDefaultSettings = {
    BorderWidth: "1px",
    BorderStyle: "solid",
    BorderColor: "black",
    FreezeColor: "#545454",
    CurrencyCode: "fil_PH"
}
var _NSTemplateList = [];
var _NSTemplateListTemp = [];

//(function () {
$(document).ready(function () {
    setTimeout(function () {
        $(document).find('.p8icon-ani-box').fadeOut(1000);
    }, 5600);

    setTimeout(function () {
        try {
            var uname = jsonMainData["UInfo"][0].Description;
            var name = jsonMainData.UInfo[0].Code;

            $("#nwe-profile-name").text(uname);
            $("#nwe-profile-comp").text(name);
            $("#nwe-profile-name").attr("title", uname);
            $("#nwe-profile-comp").attr("title", name);
        } catch (err) {

        }
    }, 1000);
});

$(function () {
	"use strict";

	var $doc = $(document);

	var initTimer;

	initTimer = setTimeout(initLoad, 0, clearTimeout(initTimer));

	// - - - F un c t i o n s - - - 
    function initLoad() {

        NOAHSpread_CreateDefaultSpread();
        fnBtnHrdToggle();    
        // fnSelectedBtn();
        fnshowStyleCtrl();
        // fnshowCellsCtrl();


       
	}



function fnBtnHrdToggle() {
    $doc.on("click", "#tmpl_blank", function () {
        try { NOAHSpread_CreateDocument() } catch (ex) { }
        $(document).find('#pdlgHomeLoad').fadeOut(600);
    });
    $(document).on('input', '#txtHomeSearch', function () {
        var search = $(this).val().toLowerCase();
        $("#card-parentRecent.card-parent .card.docx").each(function () {

            var value = $(this).find('.title').text().toLowerCase();
            var value1 = $(this).find('.cl_RepID').text().toLowerCase();
            if (value.includes(search)) {
                $(this).css('display', 'inline-block');
            } else if (value1.includes(search)) {
                $(this).css('display', 'inline-block');
            } else {
                $(this).css('display', 'none');
            }
        });
    });
    $doc.on("click", ".card.docx", function () {
        try { NOAHSpread_OpenDocument(this) } catch (ex) { }
        $(document).find('#pdlgHomeLoad').fadeOut(600);
    });
    $doc.on("click", "#logohome", function () {
        $(document).find('#pdlgHomeLoad').fadeOut(600);
    });
    $doc.on("click", "#fhm", function () {
        $(document).find('#pdlgHomeLoad').fadeIn();
    });


    $doc.on("click", ".nwe-content-item", function () {
        if (!$(this).hasClass("show")) {
            //if (!$(this).hasClass("nwe-content-item-noaction")){
                $(".nwe-content-item").removeClass("show")
            //} 
        }
        //const actionDivTarget = $(`#${$(this).attr("data-content")}`)

        //console.log(actionDivTarget)
        //$(".nwe-content").removeClass("show")
        //$(".nwe-content").toggleClass("hide")

        //$(".nwe-btn").removeClass("selected");
        //$(this).addClass("selected");

        //actionDivTarget.removeClass("hide")
        //actionDivTarget.toggleClass("show")
    });
   
    $doc.on("click", ".nwe-btn", function () {
        const actionDivTarget = $(`#${$(this).attr("data-content")}`)

        console.log(actionDivTarget)
        $(".nwe-content").removeClass("show")
        $(".nwe-content").toggleClass("hide")

        $(".nwe-btn").removeClass("selected");
        $(this).addClass("selected");

        actionDivTarget.removeClass("hide")
        actionDivTarget.toggleClass("show")
    });


    //$doc.on("click",".nwe-ed-icon-s.sby", function () {
    //    mSpreadBook.ActiveSheet.RenderStatus = false;
    //    for (var i = 0; i < mSpreadBook.ActiveSheet.ColumnConfig.length; i++) {
    //        mSpreadBook.ActiveSheet.SetColumnWidth(i, 30);
    //    }
    //    mSpreadBook.ActiveSheet.RenderStatus = true;
    //});

    
    $doc.on("change", "#nwe-fonts-style", function () {
        var data = $(this).find("option:selected").val();
        mSpreadBook.ActiveSheet.SetFontFamily(undefined, undefined, data);
        return false;
    });
    $doc.on("change", "#nwe-font-size", function () {
        var data = $(this).find("option:selected").val();
        mSpreadBook.ActiveSheet.SetFontSize(undefined, undefined, data);
        return false;
    });
    $doc.on("click", "#nsbBold", function () {
        mSpreadBook.ActiveSheet.SetBold(undefined, undefined, !mSpreadBook.ActiveSheet.GetBold(undefined, undefined));
    });
    $doc.on("click", "#nsbItalic", function () {
        mSpreadBook.ActiveSheet.SetItalic(undefined, undefined, !mSpreadBook.ActiveSheet.GetItalic(undefined, undefined));
    });
    $doc.on("click", "#nsbUnderline", function () {
        mSpreadBook.ActiveSheet.SetUnderline(undefined, undefined, !mSpreadBook.ActiveSheet.GetUnderline(undefined, undefined));
    });

    $doc.on("click", ".nwe-f-border-btn", function (e) {
        var id = $(this).attr("id");
        var Grid = mSpreadBook.ActiveSheet;
        var item = Grid.GetSelectedIndexes();
        var row = p8Spread_GetJsonValue(item, "row");
        var row2 = p8Spread_GetJsonValue(item, "row2");
        var col = p8Spread_GetJsonValue(item, "col");
        var col2 = p8Spread_GetJsonValue(item, "col2");

        var BorderWidth = _NSDefaultSettings.BorderWidth;
        var BorderStyle = $(`#brsm`).find(`.nwe-f-borderstyle-btn.active`).attr("value") || _NSDefaultSettings.BorderStyle;
        var BorderColor = $("#brc").val() || _NSDefaultSettings.BorderColor;
        var BorderFormat = BorderWidth + " " + BorderColor + " " + BorderStyle;
        //all borders
        if (id == "abr") {
            for (var i = row; i <= row2; i++) {
                for (var j = col; j <= col2; j++) {
                    Grid.SetBorder(j, i, BorderFormat);
                }
            }
        }
            //inner borders
        else if (id == "ibr") {
            for (var i = row; i <= row2; i++) {
                for (var j = col; j <= col2; j++) {
                    if (i == row) {
                        Grid.SetBorderBottom(j, i, BorderFormat);
                    } else if (i == row2) {
                        Grid.SetBorderTop(j, i, BorderFormat);
                    } else {
                        Grid.SetBorderBottom(j, i, BorderFormat);
                        Grid.SetBorderTop(j, i, BorderFormat);
                    }
                    if (j != col2) {
                        Grid.SetBorderRight(j, i, BorderFormat);
                    }
                }
            }
        }
            //horizontal borders
        else if (id == "hbr") {
            for (var i = row; i < row2; i++) {
                for (var j = col; j <= col2; j++) {
                    Grid.SetBorderBottom(j, i, BorderFormat);
                }
            }
        }
            //vertical borders
        else if (id == "vbr") {
            for (var i = row; i <= row2; i++) {
                for (var j = col; j < col2; j++) {
                    Grid.SetBorderRight(j, i, BorderFormat);
                }
            }
        }
            //outer borders
        else if (id == "obr") {
            for (var i = col; i <= col2; i++) {
                Grid.SetBorderTop(i, row, BorderFormat);
                Grid.SetBorderBottom(i, row2, BorderFormat);
            }
            for (var i = row; i <= row2; i++) {
                Grid.SetBorderLeft(col, i, BorderFormat);
                Grid.SetBorderRight(col2, i, BorderFormat);
            }
        }
            //left borders
        else if (id == "lbr") {
            for (var i = row; i <= row2; i++) {
                Grid.SetBorderLeft(col, i, BorderFormat);
            }
        }
            //top borders
        else if (id == "tbr") {
            for (var i = col; i <= col2; i++) {
                Grid.SetBorderTop(i, row, BorderFormat);
            }
        }
            //right borders
        else if (id == "rbr") {
            for (var i = row; i <= row2; i++) {
                Grid.SetBorderRight(col2, i, BorderFormat);
            }
        }
            //bottom borders
        else if (id == "bbr") {
            for (var i = col; i <= col2; i++) {
                Grid.SetBorderBottom(i, row2, BorderFormat);
            }
            //clear borders
        } else if (id == "cbr") {
            for (var i = row; i <= row2; i++) {
                for (var j = col; j <= col2; j++) {
                    Grid.SetBorder(j, i, "transparent");
                }
            }
        }
    });

    $doc.on("click", "#al", function () {
        mSpreadBook.ActiveSheet.SetTextAlign(undefined, undefined, "left");
    });
    $doc.on("click", "#c", function () {
        mSpreadBook.ActiveSheet.SetTextAlign(undefined, undefined, "center");
    });
    $doc.on("click", "#ar", function () {
        mSpreadBook.ActiveSheet.SetTextAlign(undefined, undefined, "right");
    });
    $doc.on("click", "#di", function () {
        var Grid = mSpreadBook.ActiveSheet;
        var item = Grid.GetSelectedIndexes();
        var row = p8Spread_GetJsonValue(item, "row");
        var row2 = p8Spread_GetJsonValue(item, "row2");
        var col = p8Spread_GetJsonValue(item, "col");
        var col2 = p8Spread_GetJsonValue(item, "col2");
        for (var i = row; i <= row2; i++) {
            for (var j = col; j <= col2; j++) {
                var textindent = Grid.GetTextIndent(j, i);
                textindent += 1;
                Grid.SetTextIndent(j, i, textindent);
            }
        }
    });

    $doc.on("click", "#ii", function () {
        var Grid = mSpreadBook.ActiveSheet;
        var item = Grid.GetSelectedIndexes();
        var row = p8Spread_GetJsonValue(item, "row");
        var row2 = p8Spread_GetJsonValue(item, "row2");
        var col = p8Spread_GetJsonValue(item, "col");
        var col2 = p8Spread_GetJsonValue(item, "col2");
        for (var i = row; i <= row2; i++) {
            for (var j = col; j <= col2; j++) {
                var textindent = Grid.GetTextIndent(j, i);
                if (textindent != 0) {
                    textindent -= 1;
                }
                Grid.SetTextIndent(j, i, textindent);
            }
        }
    });
    $doc.on("click", "#ta", function () {
        mSpreadBook.ActiveSheet.SetVerticalAlign(undefined, undefined, "top")
    });
    $doc.on("click", "#ma", function () {
        mSpreadBook.ActiveSheet.SetVerticalAlign(undefined, undefined, "middle")
    });
    $doc.on("click", "#ba", function () {
        mSpreadBook.ActiveSheet.SetVerticalAlign(undefined, undefined, "bottom")
    });
    $doc.on("click", "#ifs", function () {
        var data = $("#nwe-font-size").find("option:selected").val();
        data = parseInt(data) + 1;
        $("#nwe-font-size").val(data);
        mSpreadBook.ActiveSheet.SetFontSize(undefined, undefined, data);
    });
    $doc.on("click", "#dfs", function () {
        var data = $("#nwe-font-size").find("option:selected").val();
        data = parseInt(data) - 1;
        $("#nwe-font-size").val(data);
        mSpreadBook.ActiveSheet.SetFontSize(undefined, undefined, data);
    });
    $doc.on("change", "#nwe-g-style", function () {
        var data = $(this).find("option:selected").val();
        var Grid = mSpreadBook.ActiveSheet;
        var item = Grid.GetSelectedIndexes();
        var row = p8Spread_GetJsonValue(item, "row");
        var row2 = p8Spread_GetJsonValue(item, "row2");
        var col = p8Spread_GetJsonValue(item, "col");
        var col2 = p8Spread_GetJsonValue(item, "col2");

        if (data == "accounting") {
            Grid.SetCurrencyCode(col, row, _NSDefaultSettings.CurrencyCode, col2, row2)
            //Grid.SetPrecision(col, row, 2,  col2, row2);
            Grid.SetDataType(col, row, "currency", col2, row2)
        }
        else  {
            mSpreadBook.ActiveSheet.SetDataType(col, row, data, col2, row2);
        } 
        
        return false;
    });

    //File
    $doc.on("click", "#nsbExport", function () {
        fn_ExportGrid("mSpread");
    });

    //Home
    // Function to copy data when the button is clicked
    $doc.on("click", "#copy,#cut", function (e) {
   
        try {
            var p8item = $(this).attr("data-value");
            var isCut = false;
            if (p8item == "cut") {
                console.log("cut");
                isCut = true;
            } else {
                console.log("copy");
            }
            _sfP8Spread_Copy(mSpreadSheet, e,undefined, isCut);
            _sfLog("Length to be Copied:" + textToPutOnClipboardHTML.length);
            _sfCopy(textToPutOnClipboardHTML, mSpreadSheet.canvasID);
            // Copy the data to the clipboard
            //navigator.clipboard.writeText(textToPutOnClipboardHTML)
            //.then(() => {
            //    console.log('Data copied to clipboard:', data);
            //})
            //.catch(err => {
            //    console.error('Failed to copy data:', err);
            //});
        } catch (err) {  }
    });

    var lastFocusedInput;
    //$('input').on('focus', function () {
    //    lastFocusedInput = this; // Store reference to the last focused input
    //});
    $doc.on("click", "#paste", function (e) {
        navigator.clipboard.readText()
        .then(data => {
            // Set the pasted data in the textarea
            //textarea.value = data;
            console.log('Data pasted from clipboard:', data);
            //if (document.activeElement.classList.contains('P8Spread_Input')) {
                $('#' + mSpreadSheet.canvasID + '_vw_inpText').val(data);
                _sfPaste(mSpreadSheet);
            //}
            //if (lastFocusedInput) {
            //    $(lastFocusedInput).focus();
            //    $(lastFocusedInput).val(data);
            //    lastFocusedInput = false;
            //}
        })
        .catch(err => {
            console.error('Failed to paste data:', err);
        });
       
    });
    
    //Get Format
    $doc.on("click", "#fp", function () {
        var Grid = mSpreadBook.ActiveSheet;
        var item = Grid.GetSelectedIndexes();
        var row = p8Spread_GetJsonValue(item, "row");
        var row2 = p8Spread_GetJsonValue(item, "row2");
        var col = p8Spread_GetJsonValue(item, "col");
        var col2 = p8Spread_GetJsonValue(item, "col2");

        //var DataConfig = Grid.GetConfigData(col, row, col2, row2)
        var jsonData = [];
        var row_r = -1;
        var col_r = -1;
        for (var i = row; i <= row2; i++) {
            row_r += 1;
            col_r = -1;
            for (var j = col; j <= col2; j++) {
                col_r += 1;
                var colcell = p8_NumberToCell(parseInt(j) + 1);
                jsonData.push({
                    row: row_r,
                    col: col_r,
                    data: Grid.GetConfigData(j,i)
                })

            }
        }
        $("#fpData").val(JSON.stringify(jsonData));
        $(this).addClass("active");
    });
 

    $doc.on("click", "#anf", function () {
        $(this).toggleClass("show");
    });
    //currency select
    $doc.on("click", ".anfc", function () {
        var code = $(this).attr("data-value");
        var Grid = mSpreadBook.ActiveSheet;
        var item = Grid.GetSelectedIndexes();
        var row = p8Spread_GetJsonValue(item, "row");
        var row2 = p8Spread_GetJsonValue(item, "row2");
        var col = p8Spread_GetJsonValue(item, "col");
        var col2 = p8Spread_GetJsonValue(item, "col2");

        Grid.SetCurrencyCode(col, row, code, col2, row2)
        //Grid.SetPrecision(col, row, 2, col2, row2);
        Grid.SetDataType(col, row, "currency", col2, row2)
      
    });
    $doc.on("click", "#idc", function () {
        var Grid = mSpreadBook.ActiveSheet;
        var item = Grid.GetSelectedIndexes();
        var row = p8Spread_GetJsonValue(item, "row");
        var row2 = p8Spread_GetJsonValue(item, "row2");
        var col = p8Spread_GetJsonValue(item, "col");
        var col2 = p8Spread_GetJsonValue(item, "col2");

        for (var i = row; i <= row2; i++) {
            for (var j = col; j <= col2; j++) {
                var precision = Grid.GetPrecision(j, i);
                precision += 1;
                Grid.SetPrecision(j, i, precision);
                Grid.SetDataType(j, i, "currency");
            }
        }

       
    });
    $doc.on("click", "#dd", function () {
        var Grid = mSpreadBook.ActiveSheet;
        var item = Grid.GetSelectedIndexes();
        var row = p8Spread_GetJsonValue(item, "row");
        var row2 = p8Spread_GetJsonValue(item, "row2");
        var col = p8Spread_GetJsonValue(item, "col");
        var col2 = p8Spread_GetJsonValue(item, "col2");

        for (var i = row; i <= row2; i++) {
            for (var j = col; j <= col2; j++) {
                var precision = Grid.GetPrecision(j, i);
                if (precision != 0) {
                    precision -= 1;
                }
                Grid.SetPrecision(j, i, precision);
                Grid.SetDataType(j, i, "currency");
            }
        }

        
    });
    $doc.on("click", "#ps", function () {
        try{
            var Grid = mSpreadBook.ActiveSheet;
            var item = Grid.GetSelectedIndexes();
            var row = p8Spread_GetJsonValue(item, "row");
            var row2 = p8Spread_GetJsonValue(item, "row2");
            var col = p8Spread_GetJsonValue(item, "col");
            var col2 = p8Spread_GetJsonValue(item, "col2");

            for (var i = row; i <= row2; i++) {
                for (var j = col; j <= col2; j++) {
                    var val = Grid.GetValue(j, i);
                    var text = Grid.GetText(j, i);
                    if (!text.includes("%")) {
                        val = parseFloat(val);
                        if (!isNaN(val)) {
                            val *= 100
                            Grid.SetValue(j, i, val);
                            Grid.SetDataType(j, i, "percent")
                        }
                    }
                }
            }

            
        }catch(ex){}
    });

    $doc.on("click", "#cm", function () {
        try {
            var Grid = mSpreadBook.ActiveSheet;
            var item = Grid.GetSelectedIndexes();
            var row = p8Spread_GetJsonValue(item, "row");
            var row2 = p8Spread_GetJsonValue(item, "row2");
            var col = p8Spread_GetJsonValue(item, "col");
            var col2 = p8Spread_GetJsonValue(item, "col2");
            var Grid = mSpreadBook.ActiveSheet;
            Grid.SetDataType(col, row, "currency", col2, row2)
          
            //for (var i = row; i <= row2; i++) {
            //    for (var j = col; j <= col2; j++) {
            //        Grid.SetDataType(j, i, "currency")
            //    }
            //}
        }catch(ex){}
    });
    

    $doc.on("click", "#ft", function () {
        $(this).toggleClass("show");
    });

    $doc.on("click", ".nwe-f-table-btn", function () {
       
        var Grid = mSpreadBook.ActiveSheet;
        var itemgrid = Grid.GetSelectedIndexes();
        var row = p8Spread_GetJsonValue(itemgrid, "row");
        var row2 = p8Spread_GetJsonValue(itemgrid, "row2");
        var col = p8Spread_GetJsonValue(itemgrid, "col");
        var col2 = p8Spread_GetJsonValue(itemgrid, "col2");

        var code = $(this).attr("data-value");
       

        var TableConfig = Grid.NOAHSpread_GetTableList(col, row);
        //delete table 
        Grid.NOAHSpread_DeleteTable(col, row);
        var len = 0;
        try { len = TableConfig.length; } catch (ex) { }
        if (len > 0) {
            var itemtblcon = TableConfig[0]
            row = p8Spread_GetJsonValue(itemtblcon, "row");
            row2 = p8Spread_GetJsonValue(itemtblcon, "row2");
            col = p8Spread_GetJsonValue(itemtblcon, "col");
            col2 = p8Spread_GetJsonValue(itemtblcon, "col2");
        }

        var data = {
            code: code, col: col, row: row, col2: col2, row2: row2
           // , col_save: col, row_save: row, col2_save: col2, row2_save: row2
            , showcolumn: true, showcolumnbanded: false, showrowbanded: false
        }
        if (Grid.TableList == undefined) {
            Grid.TableList = [];
        }
       
        Grid.TableList.push(data);
        //add in config data
        //for (var j = row; j <= row2; j++) {
        //    for (var i = col; i <= col2; i++) {
        //        //Grid.SetConfigData(i, j, code, "table")
        //        _sfSetFormat(Grid, col, row, "table", data, col2, row2);
        //    }
        //}
        Grid.NOAHSpread_CreateTable()
       // Grid.NOAHSpread_CreateTable(col, row, data, col2, row2)
        
    });

    
    $doc.on("click", "#nsbInsert", function () {
        $(this).toggleClass("show");

        var Grid = mSpreadBook.ActiveSheet;
        var item = Grid.GetSelectedIndexes();
        var row = p8Spread_GetJsonValue(item, "row");
        var row2 = p8Spread_GetJsonValue(item, "row2");
        var col = p8Spread_GetJsonValue(item, "col");
        var col2 = p8Spread_GetJsonValue(item, "col2");

        var valuereplace = "";
        var row_f = row2 - row + 1;
        valuereplace = row_f + " " + ((row_f <= 1) ? "row" : "rows")

        var name = $("#irowa").attr("data-format");
        name = name.replace(/{col}/g, valuereplace).replace(/{row}/g, valuereplace);
        $("#irowa").text(name);

        var name = $("#irowb").attr("data-format");
        name = name.replace(/{col}/g, valuereplace).replace(/{row}/g, valuereplace);
        $("#irowb").text(name);

        var col_f = col2 -col +1;
        valuereplace = col_f + " " +((col_f <= 1) ? "column": "columns")

        var name = $("#icoll").attr("data-format");
        name = name.replace(/{col}/g, valuereplace).replace(/{row}/g, valuereplace);
        $("#icoll").text(name);

        var name = $("#icolr").attr("data-format");
        name = name.replace(/{col}/g, valuereplace).replace(/{row}/g, valuereplace);
        $("#icolr").text(name);

    });

    $doc.on("click", "#autosum", function () {
        $(this).toggleClass("show");
    });
    $doc.on("click", ".ass", function () {
        var code = $(this).attr("data-value");
        var Grid = mSpreadBook.ActiveSheet;
        Grid.AutoSum(undefined, undefined, code);
        //var item = Grid.GetSelectedIndexes();
        //var row = p8Spread_GetJsonValue(item, "row");
        //var row2 = p8Spread_GetJsonValue(item, "row2");
        //var col = p8Spread_GetJsonValue(item, "col");
        //var col2 = p8Spread_GetJsonValue(item, "col2");
        //Grid.AutoSum(col, row, code,col2, row2);
    });

    $doc.on("click", "#clear", function () {
        $(this).toggleClass("show");
    });
    $doc.on("click", "#clrall", function () {
        var Grid = mSpreadBook.ActiveSheet;
        var item = Grid.GetSelectedIndexes();
        var row = p8Spread_GetJsonValue(item, "row");
        var row2 = p8Spread_GetJsonValue(item, "row2");
        var col = p8Spread_GetJsonValue(item, "col");
        var col2 = p8Spread_GetJsonValue(item, "col2");
        for (var i = row; i <= row2; i++) {
            for (var j = col; j <= col2; j++) {
                Grid.SetText(j, i, "");
                Grid.SetUnmerge(j, i);
                Grid.DeleteConfigData(j, i)
            }
        }
    });
    $doc.on("click", "#clrvalue", function () {
        var Grid = mSpreadBook.ActiveSheet;
        var item = Grid.GetSelectedIndexes();
        var row = p8Spread_GetJsonValue(item, "row");
        var row2 = p8Spread_GetJsonValue(item, "row2");
        var col = p8Spread_GetJsonValue(item, "col");
        var col2 = p8Spread_GetJsonValue(item, "col2");
        for (var i = row; i <= row2; i++) {
            for (var j = col; j <= col2; j++) {
                Grid.SetText(j, i, "");
            }
        }
    });
    $doc.on("click", "#clrformat", function () {
        var Grid = mSpreadBook.ActiveSheet;
        var item = Grid.GetSelectedIndexes();
        var row = p8Spread_GetJsonValue(item, "row");
        var row2 = p8Spread_GetJsonValue(item, "row2");
        var col = p8Spread_GetJsonValue(item, "col");
        var col2 = p8Spread_GetJsonValue(item, "col2");
        for (var i = row; i <= row2; i++) {
            for (var j = col; j <= col2; j++) {
                Grid.SetUnmerge(j, i);
                Grid.DeleteConfigData(j, i)
            }
        }
    });

    $doc.on("click", "#icellasr", function () {
        Home_InsertDeleteCell("insertcellsandshiftright")
    });
    $doc.on("click", "#icellasd", function () {
        Home_InsertDeleteCell("insertcellsandshiftdown")
    });
    $doc.on("click", "#irowa", function () {
        Home_InsertDeleteCell("insertrowabove")
    });
    $doc.on("click", "#irowb", function () {
        Home_InsertDeleteCell("insertrowbelow")
    });
    $doc.on("click", "#icoll", function () {
        Home_InsertDeleteCell("insertcolumnleft")
    });
    $doc.on("click", "#icolr", function () {
        Home_InsertDeleteCell("insertcolumnright")
    });
    $doc.on("click", "#nsbDelete", function () {
        $(this).toggleClass("show");

        var Grid = mSpreadBook.ActiveSheet;
        var item = Grid.GetSelectedIndexes();
        var row = p8Spread_GetJsonValue(item, "row");
        var row2 = p8Spread_GetJsonValue(item, "row2");
        var col = p8Spread_GetJsonValue(item, "col");
        var col2 = p8Spread_GetJsonValue(item, "col2");

        var valuereplace = "";
        var row_f = row +1;
        var row2_f = row2 +1;
        if (row == row2) { valuereplace = "row" } 
        else { valuereplace = "rows " +row_f + " - " +row2_f  }

        var name = $("#deleterows").find(".nwe-st-icontext").attr("data-format");
        name = name.replace(/{col}/g, valuereplace).replace(/{row}/g, valuereplace);
        $("#deleterows").find(".nwe-st-icontext").text(name);

        var col_f = p8_NumberToCell(col +1);
        var col2_f = p8_NumberToCell(col2 +1);
        if (col == col2) {
            valuereplace = "column"
        } else {
            valuereplace = "columns " +col_f + " - " +col2_f
        }

        var name = $("#deletecols").find(".nwe-st-icontext").attr("data-format");
        name = name.replace(/{col}/g, valuereplace).replace(/{row}/g, valuereplace);
        $("#deletecols").find(".nwe-st-icontext").text(name);

    });
    $doc.on("click", "#dlcellasu", function () {
        Home_InsertDeleteCell("deletecellsandshiftup")
    });
    $doc.on("click", "#dlcellasl", function () {
        Home_InsertDeleteCell("deletecellsandshiftleft")
    });
    $doc.on("click", "#deleterows", function () {
        Home_InsertDeleteCell("deleterow")
    });
    $doc.on("click", "#deletecols", function () {
        Home_InsertDeleteCell("deletecolumn")
    });
    $(document).on('mouseenter', '.nwe-f-menu-item.has-subm', function () {
        $(this).find(".subm").show();
    });
    $(document).on('mouseleave', '.nwe-f-menu-item.has-subm', function () {
        $(this).find(".subm").hide();
    });
   
    //$doc.on("click", "#nsbInsert", function () {
    //    mSpreadBook.ActiveSheet.RowInsert();
    //});
    //$doc.on("click", "#nsbDelete", function () {
    //    mSpreadBook.ActiveSheet.RowDelete(mSpreadBook.ActiveSheet.CellIndexes.Row);
    //});

    
    $doc.on("click", "#mrc,#mra,#mre,#umr", function () {
        var data_value = $(this).attr("data-value");
        var Grid = mSpreadBook.ActiveSheet;
        var item = Grid.GetSelectedIndexes();
        var row = p8Spread_GetJsonValue(item, "row");
        var row2 = p8Spread_GetJsonValue(item, "row2");
        var col = p8Spread_GetJsonValue(item, "col");
        var col2 = p8Spread_GetJsonValue(item, "col2");
        //unmerge first before merge again
        Grid.SetUnmerge();
        if (data_value == "nwe-mc"
            || data_value == "nwe-mce"
            ) {

            if (data_value == "nwe-mc") {
                Grid.SetTextAlign(undefined, undefined, "center");
            }
           Grid.SetMerge(undefined, undefined, undefined, undefined, true);
        } else if (data_value == "nwe-mca") {
      
            Grid.SetCrossMerge();
        }
        //else if (data_value == "nwe-umce")
        //{
        //    Grid.SetUnmerge();
        //}
    });

    


    $doc.on("mousedown", ".sp-choose", function () {
        console.log("ccc");
    });
 


    $doc.on("click", ".nwe-sel-icon.exp", function () {
       fn_ExportGrid("mSpread");
    });


    //formulas
    $doc.on("click", "#flAutoSum", function () {
        mSpreadBook.ActiveSheet.AutoSum(undefined, undefined, "SUM");
    });
    $doc.on("click", "#faFormulas", function () {
        $(this).toggleClass("active");
        var formula = mSpreadBook.ActiveSheet.ShowFormula;
        mSpreadBook.ActiveSheet.ShowFormula = !formula;
        mSpreadBook.ActiveSheet.Refresh();
    });
    

    //View
    $doc.on("click", "#nwe-chk-gls", function () {
        var Grid = mSpreadBook.ActiveSheet;
        var val = $(this).prop("checked");
        if (val) {
            Grid.backgroundColor = '#E2E2E2';
        } else {
            Grid.backgroundColor = 'white';
        }
        Grid.Refresh();
    });
    $doc.on("click", "#nwe-chk-fbar", function () {
        $("#nwe-bar").toggleClass("show");
    });
    
    $doc.on("click", "#wdFreezepanes", function () {
        $(this).toggleClass("show");

    });
    $doc.on("click", "#wfcp", function () {
        var Grid = mSpreadBook.ActiveSheet;
        var item = Grid.GetSelectedIndexes();
        var row = p8Spread_GetJsonValue(item, "row");
        var col = p8Spread_GetJsonValue(item, "col");
        Grid.FreezePane(col, row)
    });
    $doc.on("click", "#wfcr", function () {
        var Grid = mSpreadBook.ActiveSheet;
        var item = Grid.GetSelectedIndexes();
        var row = p8Spread_GetJsonValue(item, "row");
        Grid.FreezeRow = row;
        Grid.Refresh();
    });
    $doc.on("click", "#wfcc", function () {
        var Grid = mSpreadBook.ActiveSheet;
        var item = Grid.GetSelectedIndexes();
        var col = p8Spread_GetJsonValue(item, "col");
        Grid.FreezeCol = col;
        Grid.Refresh();
    });
    $doc.on("click", "#wdUnFreezepanes", function () {
        var Grid = mSpreadBook.ActiveSheet;
        Grid.FreezeCol = -1;
        Grid.FreezeRow = -1;
        Grid.Refresh();
    });
    


    $doc.on("click", ".nwe-default-opt", function () {
        $(this).parent().toggleClass("nwe-active");
        console.log("test")

    });

    $doc.on("click", ".nwe-opt-ul .nwe-li", function () {
        var currentSelected = $(this).html();
        var wrapper = $(this).closest(".nwe-select-c");
        wrapper.find(".nwe-default-opt .nwe-li").html(currentSelected);
        wrapper.removeClass("nwe-active");
    });

    $doc.on("click", ".nwe-btn-profile", function () {
        $(this).parent().toggleClass("show");
    });

    $doc.on("click", ".nwe-btn-tgc", function () {
        $(this).parent().parent().parent().toggleClass("show");
    });

    $doc.on("click", ".nwe-f-icon-s.bbrm", function () {
        $(this).toggleClass("show");
    });

    $doc.on("click", ".nwe-f-icon-s.brsm", function () {
        $(this).toggleClass("show");
    });

    $doc.on("click", ".nwe-f-icon-s.brsm .nwe-f-borderstyle-btn", function () {
        $(this).closest(".nwe-f-borderstyle-ch").find(".active").removeClass("active")
        $(this).addClass("active");
    });

    //function NOAHSpread_Initial() {
    //    var Grid = mSpreadBook.ActiveSheet;
    //    var bgcolor = Grid.backgroundColor;
    //    if (bgcolor == '#E2E2E2') {
    //        Grid.backgroundColor = 'white';
    //    } else {
    //        Grid.backgroundColor = '#E2E2E2';
    //    }
    //}
}


    //})($);
});

// function fnSelectedBtn() {
//     $doc.on("click", ".nwe-btn", function () {
//         $(".nwe-btn").removeClass("selected");
//         $(this).addClass("selected");
//     })
// }

//$(".nwe-hrd-profile").click(function () {
//    $(this).parent().toggleClass("show"); -- old settings showing
//});



$(document).on("click", ".nwe-btn-tgc", function () {
    //console.log("aaa");

    setTimeout(function () {
        NS_SpreadResize();
        mSpreadBook.ActiveSheet.Refresh();
    }, 200);
});
    



function fnshowStyleCtrl() {
    //$(".nwe-st-icontext").click(function() {
    //  const elem = $(this).parent();
    //  elem.toggleClass("active");
    //  $('.active').not(elem).removeClass("active");
    //})
    setTimeout(function () {
        //home
        try {
            var objectkeycurrency = Object.keys(P8Spread_Currency);
            var htmlstringcurrency = "";
            for (var i = 0; i < objectkeycurrency.length; i++) {
                var item = P8Spread_Currency[objectkeycurrency[i]];
                var code = p8Spread_GetJsonValue(item, "code");
                var description = p8Spread_GetJsonValue(item, "description");
                var remarks = p8Spread_GetJsonValue(item, "remarks");
                var hide = p8Spread_GetJsonValue(item, "hide");
                if (hide) { }
                else {
                    htmlstringcurrency += `<div class="nwe-f-menu-item nwe-f-menu-item-s anfc" data-value="${code}" title="${remarks}">
                                                    <div class="item-container">
                                                        <div class="nwe-f-icon-s"></div>
                                                        <div class ="nwe-st-icontext">${description}</div>
                                                    </div>
                                                </div>`
                }
            }
            $("#anf").find(".nwe-f-is-ch").append(htmlstringcurrency);
        } catch (ex) { }
        //view
        var Grid = mSpreadBook.ActiveSheet;
        var bgcolor = Grid.backgroundColor;
        if (bgcolor == '#E2E2E2') {
            $("#nwe-chk-gls").prop("checked", true);
        } else {
            $("#nwe-chk-gls").prop("checked", false);
        }

        $("#nwe-chk-fbar").prop("checked", true);
        $("#nwe-bar").addClass("show");



        //Table Format
        try {

            var htmlstringtable = "";
            for (var i = 0; i < _NOAHSpread_TableFormat.length; i++) {
                htmlstringtable = "";
                var item = _NOAHSpread_TableFormat[i];
                var code = p8Spread_GetJsonValue(item, "code");
                var description = p8Spread_GetJsonValue(item, "description");
                htmlstringtable += `<div class="nwe-f-table-btn" data-value="${code}" title="${description}">
                                                <svg id="${code}" xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 100 100" width="100" height="100"></svg>
                                            </div>`

                $("#ft").find(".nwe-st-ed-container").append(htmlstringtable);

                var col_r = 0;
                var col2_r = 5;
                var row_r = 0;
                var row2_r = 5;
                var tableIconSVG = NOAHSpread_GenerateTableIcon(code, col2_r, row2_r);
                $(`#${code}`).html(tableIconSVG);

                var ShowColumn = p8Spread_GetJsonValue(item, "ShowColumn");
                var ShowColumnBanded = p8Spread_GetJsonValue(item, "ShowColumnBanded");
                var ShowRowBanded = p8Spread_GetJsonValue(item, "ShowRowBanded");
                //column
                if (ShowColumn) {

                    var ColumnFormat = p8Spread_GetJsonValue(item, "ColumnFormat");
                    var BackgroundColor = p8Spread_GetJsonValue(ColumnFormat, "BackgroundColor");
                    var TextColor = p8Spread_GetJsonValue(ColumnFormat, "TextColor");
                    var BorderWidth = p8Spread_GetJsonValue(ColumnFormat, "BorderWidth");
                    var BorderStyle = p8Spread_GetJsonValue(ColumnFormat, "BorderStyle");
                    var BorderColor = p8Spread_GetJsonValue(ColumnFormat, "BorderColor");
                    var Border = `${BorderWidth} ${BorderStyle} ${BorderColor}`;
                    var irow = row_r;
                    for (var icol = col_r; icol <= col2_r; icol++) {
                        NOAHSpread_SetBackgroundColor(code, icol, irow, BackgroundColor);
                        NOAHSpread_SetTextColor(code, icol, irow, TextColor);
                        NOAHSpread_SetBorder(code, icol, irow, Border)
                    }

                    //add row;
                    row_r += 1;
                }


                //DataFormat
                var DataFormat = p8Spread_GetJsonValue(item, "DataFormat");
                var BackgroundColor = p8Spread_GetJsonValue(DataFormat, "BackgroundColor");
                var TextColor = p8Spread_GetJsonValue(DataFormat, "TextColor");
                var BorderWidth = p8Spread_GetJsonValue(DataFormat, "BorderWidth");
                var BorderStyle = p8Spread_GetJsonValue(DataFormat, "BorderStyle");
                var BorderColor = p8Spread_GetJsonValue(DataFormat, "BorderColor");
                var Border = `${BorderWidth} ${BorderStyle} ${BorderColor}`;

                for (var irow = row_r; irow <= row2_r; irow++) {
                        for (var icol = col_r; icol <= col2_r; icol++) {
                            NOAHSpread_SetBackgroundColor(code, icol, irow, BackgroundColor);
                            NOAHSpread_SetTextColor(code, icol, irow, TextColor);
                            NOAHSpread_SetBorder(code, icol, irow, Border)
                        }
                }

                //var _NOAHSpread_TableFormat = []
                //_NOAHSpread_TableFormat.push({
                //    code: "tbltemplatelightblack",
                //    description: "Black, Light 1",
                //    ShowColumn: true,
                //    ShowColumnBanded: true,
                //    ShowRowBanded: true,
                //    ColumnFormat: {
                //        BackgroundColor: "black",
                //        TextColor: "white",
                //        BorderWidth: "1px",
                //        BorderStyle: "solid",
                //        BorderColor: "black",
                //    },
                //    DataFormat: {
                //        BackgroundColor: "white",
                //        TextColor: "white",
                //        BorderWidth: "1px",
                //        BorderStyle: "solid",
                //        BorderColor: "black",
                //    },
                //    BandedColumnFormat: {
                //        BackgroundColor: "white",
                //        BorderWidth: "1px",
                //        BorderStyle: "solid",
                //        BorderColor: "black",
                //    },
                //    BandedRowFormat: {
                //        BackgroundColor: "white",
                //        BorderWidth: "1px",
                //        BorderStyle: "solid",
                //        BorderColor: "black",
                //    },
                //})


            }

        } catch (ex) { }
    }, 100);


}

/*AAG*/
var mSpreadBook;
var mSpreadSheet;

//$(function(){

    function NOAHSpread_CreateDefaultSpread() {
        mSpreadBook = new P8.Spread('mSpread', 1);
        mSpreadSheet = mSpreadBook.ActiveSheet;
        //var datax = _sfCreateData(26 * 10, 1000, "");
        var datax = _sfCreateData(10, 30, "");
        mSpreadBook.FormulaField = true;
        mSpreadSheet.IsSetTextFormula = true;

        mSpreadSheet.DataBind(datax);
        mSpreadSheet.IsDesigner = true;
        mSpreadSheet.Render();

        var len = $("#nwe-fonts-style").find("option").length;
        for (var i = 0; i < len; i++) {
            var fontf = $("#nwe-fonts-style").find("option:eq(" + i + ")").val();
            $("#nwe-fonts-style").find("option:eq(" + i + ")").css("font-family", fontf);
        }

        $("#nsbTextBGColor, #nsbTextColor, #brc").spectrum({
            showButtons: true,
            showInput: true,
            allowEmpty: true,
            showAlpha: false,
            showPalette: true,
            preferredFormat: "rgb",
            palette: [
                ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
                ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
                ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
                ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
                ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
                ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
                ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
                ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
            ]
            , hide: function (color) {
                var id = $(this).attr("id");
                var colorvalue = color.toHexString(); // #ff0000
                if (id == "nsbTextBGColor") {
                    mSpreadBook.ActiveSheet.SetBackground(undefined, undefined, colorvalue);
                    $("#" + id).css("background-color", colorvalue);
                }
                else if (id == "nsbTextColor") {
                    mSpreadBook.ActiveSheet.SetTextColor(undefined, undefined, colorvalue);
                    $("#" + id).css("color", colorvalue);
                    $("#" + id).css("border-color", colorvalue);
                }
                else if (id == "brc") {
                    $("#" + id).css("color", colorvalue);
                    $("#" + id).css("border-color", colorvalue);
                    $("#" + id).val(colorvalue)
                }
            }
        });

        //$("#picker").spectrum({
        //    move: function (tinycolor) { },
        //    show: function (tinycolor) { },
        //    hide: function (tinycolor) { },
        //    beforeShow: function (tinycolor) { },
        //});
        setTimeout(function () {
            NS_SpreadResize();
            mSpreadBook.ActiveSheet.FreezeColor = _NSDefaultSettings.FreezeColor;
            mSpreadBook.ActiveSheet.Refresh();
        }, 100);
    }
//});

var sprresizeF;
$(window).resize(function () {
    clearTimeout(sprresizeF);
    sprresizeF = setTimeout(function () {
        NS_SpreadResize();
        mSpreadBook.ActiveSheet.Refresh();
    }, 100);

    if ($("body").width() <= 550) {
        $("#mSpread").css("width", ($("body").width()-20) + "px");
    }
});

function NS_SpreadResize() {
    var fheight = $("body").height() - ($("#nwe-footer").height() + $("#nwe-hrd").height() + ($("#nwe-bar").height() * 2.7) );

    if ($("body").height()<=50)
        fheight = $("#nwExportContainerMain").height() - ($("#nwe-footer").height() + $("#nwe-hrd").height());

    var sub = 45;
    if ($("#nwe-hrd").height() < 15) sub = 20;
    else {
        sub = sub + 20;
        sub = 0;
    }

    fheight = fheight - sub;
    if (fheight <= 50) fheight = 50;
    $("#mSpread").height(fheight);
}



//$(document).on(".nwe-ed-icon-s.sby", "click", function () {
//    mSpreadBook.ActiveSheet.RenderStatus = false;
//    for (var i = 0; i < mSpreadBook.ActiveSheet.ColumnConfig.length; i++) {
//        mSpreadBook.ActiveSheet.SetColumnWidth(i, 30);
//    }
//    mSpreadBook.ActiveSheet.RenderStatus = true;
//});
//$(document).on(".nwe-f-icon-s-b", "click", function () {
//    mSpreadBook.ActiveSheet.SetBold(undefined, undefined, true);
//});
//$(document).on(".nwe-f-icon-s-i", "click", function () {
//    mSpreadBook.ActiveSheet.SetItalic(undefined, undefined, true);
//});
//$(document).on(".nwe-f-icon-s-u", "click", function () {
//    mSpreadBook.ActiveSheet.SetUnderline(undefined, undefined, true);
//});


$(document).on("click", ".sp-choose", function () {
    console.log("ccc");
});


//Shorcuts
function p8Spread_KeyPress(e)
{
    e = e || window.event;
    var e_keyCode = e.keyCode;
    var isvalid = true;

    if (e_keyCode == '66' && e.ctrlKey) //ctrl+B = bold
    {
        $("#nsbBold").click();
        isvalid = false;
    }
    else if (e_keyCode == '73' && e.ctrlKey) //ctrl+I = italic
    {
        $("#nsbItalic").click();
        isvalid = false;
    }
    else if (e_keyCode == '85' && e.ctrlKey) //ctrl+U = Underline
    {
        $("#nsbUnderline").click();
        isvalid = false;
    }
    console.log(e_keyCode);

    return isvalid;
}



function Home_InsertDeleteCell(code) {
    var Grid = mSpreadBook.ActiveSheet;
    Grid.RenderStatus = false;
    var item = Grid.GetSelectedIndexes();
    var row = p8Spread_GetJsonValue(item, "row");
    var row2 = p8Spread_GetJsonValue(item, "row2");
    var col = p8Spread_GetJsonValue(item, "col");
    var col2 = p8Spread_GetJsonValue(item, "col2");

    if (code == "insertrowabove" || code == "insertrowbelow") {
        var isbottom = false;
        if (code == "insertrowbelow") { isbottom = true; }
        var row_f = row2 - row + 1;
        for (var i = 0; i < row_f; i++) {
            Grid.RowInsert(row,isbottom, false,false);
        }
        //Grid.UpdateFormula(Spread_ALLCOL, row + row_f - 1, 0, row_f);
        //if (isbottom) {
        Grid.NOAHSpread_RowInsertTable(col, row, row_f)
        //} else {
        //    Grid.NOAHSpread_InsertRowTable(col, row, 0, 0)
        //}

    } else if (code == "insertcolumnleft" || code == "insertcolumnright") {
        var isright = false;
        if (code == "insertcolumnright") { isright = true; }
        var col_f = col2 - col + 1;
        for (var i = 0; i < col_f; i++) {
            Grid.ColumnInsert(col, isright, false);
        }
        //Grid.UpdateFormula(col, Spread_ALLROW, col_f, 0);

        Grid.NOAHSpread_ColumnInsertTable(col, row, col_f)
        //if (isright) {
        //    Grid.NOAHSpread_InsertTable(col + col_f - 1, undefined, 0, 0)
        //} else {
        //    Grid.NOAHSpread_InsertTable(col + col_f, undefined, 0, 0)
        //}
       

    } else if (code == "insertcellsandshiftright") {
        for (var i = row; i <= row2; i++) {
            for (var j = col; j <= col2; j++) {
                Grid.ColumnInsertShift(j, i, false, false);
            }
        }
        //var col_f = (col2 - col + 1);
        //Grid.UpdateFormula(col, row, col_f, 0);
        //Grid.NOAHSpread_InsertTable(col, row, col_f, 0);
    } else if (code == "insertcellsandshiftdown") {
        for (var i = row; i <= row2; i++) {
            for (var j = col; j <= col2; j++) {
                Grid.RowInsertShift(j, i);
                //Grid.UpdateFormula(j, i, 0, 1);
                //Grid.NOAHSpread_InsertTable(j, i, 0, 1);
            }
        }
        //var row_f = (row2 - row + 1);
       // Grid.UpdateFormula(col, row, 0, row_f);
       //Grid.NOAHSpread_InsertTable(col, row,0,0, 0, row_f);

    } else if (code == "deleterow") {
        var row_f = row + 1;
        var row2_f = row2 + 1;
        for (var i = row2_f; i >= row_f; i--) {
            Grid.RowDelete(row);
        }

        //Grid.UpdateFormula(Spread_ALLCOL, row, 0, (row_f - row2_f - 1));

        Grid.NOAHSpread_RowDeleteTable(col, row, (row2_f - row_f  + 1))
        //Grid.NOAHSpread_InsertTable(undefined, row, 0, 0)

    } else if (code == "deletecolumn") {
        var col_f = col + 1;
        var col2_f = col2 + 1;
        for (var i = col2_f; i >= col_f; i--) {
            Grid.ColumnDelete(col);
        }

        //Grid.UpdateFormula(col, Spread_ALLROW, (col_f - col2_f - 1), 0);

        Grid.NOAHSpread_ColumnDeleteTable(col, row, (col2_f - col_f + 1))
        //Grid.NOAHSpread_InsertTable(col, undefined, -1, 0)

    } else if (code == "deletecellsandshiftleft") {
        for (var i = row2; i >= row; i--) {
            for (var j = col2; j >= col; j--) {
                Grid.ColumnDeleteShift(j, i, false, false);
            }
        }
        Grid.NOAHSpread_InsertTable(undefined, undefined,0, 0)
    } else if (code == "deletecellsandshiftup") {
        for (var i = row2; i >= row; i--) {
            for (var j = col2; j >= col; j--) {
                Grid.RowDeleteShift(j, i, false, false);
            }
        }
        //var row_f = (row2 - row) * -1;
        //Grid.UpdateFormula(col, row, 0, row_f);
        //Grid.NOAHSpread_InsertTable(col, row, 0, 0, 0, row_f);

        //Grid.NOAHSpread_InsertTable(undefined, undefined, 0, 0)
    }
    Grid.RenderStatus = true;
    Grid.Refresh();

}

$(document).on("click", "#lg", function () {
    var msg = "Do you want to logout to the system?";
    var pageTitle = "Logout";

    var msgBox = new GenLib.MessageBoxQuestion("msglogout");
    msgBox.message = msg;
    msgBox.title = pageTitle;
    msgBox.buttonYes = function () {
        window.location = 'logout';
    };
    msgBox.buttonNo = function () {

    };
    msgBox.Show();

    return false;
});
