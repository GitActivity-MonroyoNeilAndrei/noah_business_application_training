//to check table design
var _NOAHSpread_EnableTableChecker = false;

var _NOAHSpread_TableFormatDefault = []
_NOAHSpread_TableFormatDefault.push({
    ShowColumn: true,
    ShowColumnBanded: true,
    ShowRowBanded: true,
    ColumnFormat: {
        BackgroundColor: "white",
        TextColor: "black",
        TextAlign: "center",
        VerticalAlign: "middle",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "black",
        DefaultValue: "Column{col}",
    },
    DataFormat: {
        BackgroundColor: "white",
        TextColor: "black",
        TextAlign: "center",
        VerticalAlign: "middle",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "black",
        DefaultValue: "Column{col}",
    },
    BandedColumnFormat: {
        BackgroundColor: "white",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "black",
    },
    BandedRowFormat: {
        BackgroundColor: "white",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "black",
    },
})

var _NOAHSpread_TableFormat = []
_NOAHSpread_TableFormat.push({
    code: "tbltemplatelightblack",
    description: "Black, Light 1",
    ShowColumn: true,
    ShowColumnBanded: true,
    ShowRowBanded: true,
    ColumnFormat: {
        BackgroundColor: "black",
        TextColor: "white",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "black",
        DefaultValue: "Column{col}",
    },
    DataFormat: {
        BackgroundColor: "white",
        TextColor: "black",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "black",
        DefaultValue: "Column{col}",
    },
    BandedColumnFormat: {
        BackgroundColor: "white",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "black",
    },
    BandedRowFormat: {
        BackgroundColor: "white",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "black",
    },
})
_NOAHSpread_TableFormat.push({
    code: "tbltemplateblue",
    description: "Blue, Light 2",
    ShowColumn: true,
    ShowColumnBanded: false,
    ShowRowBanded: false,
    ColumnFormat: {
        BackgroundColor: "blue",
        TextColor: "white",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "blue",
        DefaultValue: "Column{col}",
    },
    DataFormat: {
        BackgroundColor: "white",
        TextColor: "black",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "blue",
    },
    BandedColumnFormat: {
        BackgroundColor: "white",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "blue",
    },
    BandedRowFormat: {
        BackgroundColor: "white",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "blue",
    },
})
_NOAHSpread_TableFormat.push({
    code: "tbltemplatelightorange",
    description: "Blue, Light 2",
    ShowColumn: true,
    ShowColumnBanded: false,
    ShowRowBanded: false,
    ColumnFormat: {
        BackgroundColor: "orange",
        TextColor: "white",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "orange",
        DefaultValue: "Column{col}",
    },
    DataFormat: {
        BackgroundColor: "white",
        TextColor: "black",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "orange",
    },
    BandedColumnFormat: {
        BackgroundColor: "white",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "orange",
    },
    BandedRowFormat: {
        BackgroundColor: "white",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "orange",
    },
})
_NOAHSpread_TableFormat.push({
    code: "tbltemplategray",
    description: "Blue, Light 2",
    ShowColumn: true,
    ShowColumnBanded: false,
    ShowRowBanded: false,
    ColumnFormat: {
        BackgroundColor: "gray",
        TextColor: "white",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "gray",
        DefaultValue: "Column{col}",
    },
    DataFormat: {
        BackgroundColor: "white",
        TextColor: "black",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "gray",
    },
    BandedColumnFormat: {
        BackgroundColor: "white",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "gray",
    },
    BandedRowFormat: {
        BackgroundColor: "white",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "gray",
    },
})

_NOAHSpread_TableFormat.push({
    code: "tbltemplategold",
    description: "Blue, Light 2",
    ShowColumn: true,
    ShowColumnBanded: false,
    ShowRowBanded: false,
    ColumnFormat: {
        BackgroundColor: "gold",
        TextColor: "white",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "gold",
        DefaultValue: "Column{col}",
    },
    DataFormat: {
        BackgroundColor: "white",
        TextColor: "black",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "gold",
    },
    BandedColumnFormat: {
        BackgroundColor: "white",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "gold",
    },
    BandedRowFormat: {
        BackgroundColor: "white",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "gold",
    },
})

_NOAHSpread_TableFormat.push({
    code: "tbltemplategreen",
    description: "Blue, Light 2",
    ShowColumn: true,
    ShowColumnBanded: false,
    ShowRowBanded: false,
    ColumnFormat: {
        BackgroundColor: "green",
        TextColor: "white",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "green",
        DefaultValue: "Column{col}",
    },
    DataFormat: {
        BackgroundColor: "white",
        TextColor: "black",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "green",
    },
    BandedColumnFormat: {
        BackgroundColor: "white",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "green",
    },
    BandedRowFormat: {
        BackgroundColor: "white",
        BorderWidth: "1px",
        BorderStyle: "solid",
        BorderColor: "green",
    },
})




// Function to generate SVG markup for a table icon with specified rows and columns
function NOAHSpread_GenerateTableIcon(id, col, row) {
    var marginLeft = -12; // Adjust left margin based on your requirements
    var marginTop = 5; // Adjust top margin based on your requirements
    var cellWidth = 23; // Adjust cell width based on your requirements
    var cellHeight = 16; // Adjust cell height based on your requirements
    var cellSpacing = 0; // Adjust cell spacing based on your requirements
    var strokeWidth = 0; // Stroke width for the lines
    var lineColor = 'none'; // Color for the lines
    var svgContent = '';

    // Loop to generate cells
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {

            var x = marginLeft + j * (cellWidth + cellSpacing); // Include left margin
            var y = marginTop + i * (cellHeight + cellSpacing); // Include top margin
            var cellId = id + '-cell-' + i + '-' + j; // Unique ID for each cell
            var lineId = id + '-line-' + i + '-' + j; // Unique ID for each cell
            var topLineId = id + '-top-line-' + i + '-' + j; // Unique ID for top line
            var bottomLineId = id + '-bottom-line-' + i + '-' + j; // Unique ID for bottom line
            var leftLineId = id + '-left-line-' + i + '-' + j; // Unique ID for left line
            var rightLineId = id + '-right-line-' + i + '-' + j; // Unique ID for right line
            var padding = 5;
            // Add rectangle element for cell with space and no border
            svgContent += '<rect id="' + cellId + '" x="' + x + '" y="' + y + '" width="' + cellWidth + '" height="' + cellHeight + '" fill="white" stroke="none" />';

            // Add horizontal line in the middle of the cell with padding and specified border
            svgContent += '<line id="' + lineId + '" x1="' + (x + padding) + '" y1="' + (y + cellHeight / 2 + cellSpacing / 2) + '" x2="' + (x + cellWidth - padding) + '" y2="' + (y + cellHeight / 2 + cellSpacing / 2) + '" stroke="black" stroke-width="2" />';
            // Add horizontal top line
            svgContent += '<line id="' + topLineId + '" x1="' + x + '" y1="' + y + '" x2="' + (x + cellWidth) + '" y2="' + y + '" stroke="' + lineColor + '" stroke-width="' + strokeWidth + '" />';

            // Add horizontal bottom line
            svgContent += '<line id="' + bottomLineId + '" x1="' + x + '" y1="' + (y + cellHeight) + '" x2="' + (x + cellWidth) + '" y2="' + (y + cellHeight) + '" stroke="' + lineColor + '" />';

            // Add vertical left line
            svgContent += '<line id="' + leftLineId + '" x1="' + x + '" y1="' + y + '" x2="' + x + '" y2="' + (y + cellHeight) + '" stroke="' + lineColor + '" />';

            // Add vertical right line
            svgContent += '<line id="' + rightLineId + '" x1="' + (x + cellWidth) + '" y1="' + y + '" x2="' + (x + cellWidth) + '" y2="' + (y + cellHeight) + '" stroke="' + lineColor + '" />';

        }
    }

    return svgContent;
}

// Example usage: Generate a table icon with 5 rows and 5 columns
//var tableIconSVG = NOAHSpread_GenerateTableIcon(5, 5);
//document.getElementById('table-icon').innerHTML = tableIconSVG;

// Function to change the color of a cell in the table icon
function NOAHSpread_SetBackgroundColor(id, col, row, data) {
    var cellId = id + '-cell-' + row + '-' + col;
    $("#" + cellId).attr("fill", data);
}

// Function to set the text color of a cell
function NOAHSpread_SetTextColor(id, col, row, data) {
    var cellId = id + '-line-' + row + '-' + col;
    $("#" + cellId).attr("stroke", data);

}

function NOAHSpread_SetBorderCell(cellId, data) {
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
    $("#" + cellId).attr("stroke", colorX);
    $("#" + cellId).attr("stroke-width", widthX);
    $("#" + cellId).attr("stroke-dasharray", styleX);

}

// Function to set the top border color of a cell
function NOAHSpread_SetTopBorder(id, col, row, data) {
    var cellId = id + '-top-line-' + row + '-' + col;
    NOAHSpread_SetBorderCell(cellId, data)
}

// Function to set the bottom border color of a cell
function NOAHSpread_SetBottomBorder(id, col, row, data) {
    var cellId = id + '-bottom-line-' + row + '-' + col;
    NOAHSpread_SetBorderCell(cellId, data)
}

// Function to set the left border color of a cell
function NOAHSpread_SetLeftBorder(id, col, row, data) {
    var cellId = id + '-left-line-' + row + '-' + col;
    NOAHSpread_SetBorderCell(cellId, data)
}

// Function to set the right border color of a cell
function NOAHSpread_SetRightBorder(id, col, row, data) {
    var cellId = id + '-right-line-' + row + '-' + col;
    NOAHSpread_SetBorderCell(cellId, data)
}

// Function to set the right border color of a cell
function NOAHSpread_SetBorder(id, col, row, data) {
    NOAHSpread_SetTopBorder(id, col, row, data)
    NOAHSpread_SetBottomBorder(id, col, row, data)
    NOAHSpread_SetLeftBorder(id, col, row, data)
    NOAHSpread_SetRightBorder(id, col, row, data)
}



P8.SpreadSheet.prototype.NOAHSpread_RowInsertShiftTable = function (c, r, c2, r2, rowadd, istemporary, formatonly) {
    try {
        rowadd = rowadd || 0;
        for (var itbl = 0; itbl < this.TableList.length; itbl++) {
            var item = this.TableList[itbl];
            var col = p8Spread_GetJsonValue(item, "col");
            var col2 = p8Spread_GetJsonValue(item, "col2");
            var row = p8Spread_GetJsonValue(item, "row");
            var row2 = p8Spread_GetJsonValue(item, "row2");

            this.NOAHSpread_DeleteTableFormat(col, row);
            if (col <= c && col2 >= c) { // || col2 >= c2
                if (row <= r && row2 >= r) {
                    item.row2 = item.row2 + rowadd;
                    if (istemporary) {
                        item.row_consumed = rowadd;
                    }
                } else if (row >= r) {
                    item.row = item.row + rowadd;
                    item.row2 = item.row2 + rowadd;
                    if (istemporary) {
                        item.row_additional = rowadd;
                    }
                }

            }
        }

        mSpreadBook.ActiveSheet.NOAHSpread_CreateTable(formatonly)
    } catch (ex) { }
}


P8.SpreadSheet.prototype.NOAHSpread_RowInsertTable = function (c, r, rowadd) {
    rowadd = rowadd || 0;
    for (var itbl = 0; itbl < this.TableList.length; itbl++) {
        var item = this.TableList[itbl];
        var col = p8Spread_GetJsonValue(item, "col");
        var col2 = p8Spread_GetJsonValue(item, "col2");
        var row = p8Spread_GetJsonValue(item, "row");
        var row2 = p8Spread_GetJsonValue(item, "row2");

        this.NOAHSpread_DeleteTableFormat(col, row);
        if (row >= r) {
            item.row = item.row + rowadd;
        }
        if (row2 >= r) {
            item.row2 = item.row2 + rowadd;
        }

    }

    mSpreadBook.ActiveSheet.NOAHSpread_CreateTable()
}

P8.SpreadSheet.prototype.NOAHSpread_RowDeleteTable = function (c, r, rowminus) {
    rowminus = rowminus || 0;
    for (var itbl = 0; itbl < this.TableList.length; itbl++) {
        var item = this.TableList[itbl];
        var col = p8Spread_GetJsonValue(item, "col");
        var col2 = p8Spread_GetJsonValue(item, "col2");
        var row = p8Spread_GetJsonValue(item, "row");
        var row2 = p8Spread_GetJsonValue(item, "row2");

        this.NOAHSpread_DeleteTableFormat(col, row);
        if (row >= r) {
            item.row = item.row - rowminus;
        }
        if (row2 >= r) {
            item.row2 = item.row2 - rowminus;
        }

    }

    mSpreadBook.ActiveSheet.NOAHSpread_CreateTable()
}

P8.SpreadSheet.prototype.NOAHSpread_ColumnInsertTable = function (c, r, coladd) {
    try {
        coladd = coladd || 0;
        for (var itbl = 0; itbl < this.TableList.length; itbl++) {
            var item = this.TableList[itbl];
            var col = p8Spread_GetJsonValue(item, "col");
            var col2 = p8Spread_GetJsonValue(item, "col2");
            var row = p8Spread_GetJsonValue(item, "row");
            var row2 = p8Spread_GetJsonValue(item, "row2");

            this.NOAHSpread_DeleteTableFormat(col, row);
            if (col >= c) {
                item.col = item.col + coladd;
            }
            if (col2 >= c) {
                item.col2 = item.col2 + coladd;
            }

        }

        mSpreadBook.ActiveSheet.NOAHSpread_CreateTable()
    } catch (ex) { }
}

P8.SpreadSheet.prototype.NOAHSpread_ColumnDeleteTable = function (c, r, colminus) {
    try {
        colminus = colminus || 0;
        for (var itbl = 0; itbl < this.TableList.length; itbl++) {
            var item = this.TableList[itbl];
            var col = p8Spread_GetJsonValue(item, "col");
            var col2 = p8Spread_GetJsonValue(item, "col2");
            var row = p8Spread_GetJsonValue(item, "row");
            var row2 = p8Spread_GetJsonValue(item, "row2");

            this.NOAHSpread_DeleteTableFormat(col, row);
            if (col >= c) {
                item.col = item.col - colminus;
            }
            if (col2 >= c) {
                item.col2 = item.col2 - colminus;
            }

        }

        mSpreadBook.ActiveSheet.NOAHSpread_CreateTable()
    } catch (ex) { }
}

P8.SpreadSheet.prototype.NOAHSpread_DeleteTable = function (c, r) {
    try {
        c = c == undefined ? this.CellIndexes.Col : c;
        r = r == undefined ? this.CellIndexes.Row : r;
        for (var itbl = 0; itbl < this.TableList.length; itbl++) {
            var item = this.TableList[itbl];
            var col = p8Spread_GetJsonValue(item, "col");
            var col2 = p8Spread_GetJsonValue(item, "col2");
            var row = p8Spread_GetJsonValue(item, "row");
            var row2 = p8Spread_GetJsonValue(item, "row2");
            if (row <= r && row2 >= r
                && col <= c && col2 >= c) {
                //this.NOAHSpread_DeleteTableFormat(col, row);

                for (var irow = row; irow <= row2; irow++) {
                    for (var icol = col; icol <= col2; icol++) {
                        this.SetBackground(icol, irow, "");
                        this.SetBorder(icol, irow, "");
                    }
                }
                this.TableList.splice(itbl, 1);
            }
        }
    } catch (ex) { }
}
P8.SpreadSheet.prototype.NOAHSpread_DeleteTableFormat = function (c, r) {
    c = c == undefined ? this.CellIndexes.Col : c;
    r = r == undefined ? this.CellIndexes.Row : r;
    try {
        var item = nwJson(mSpreadBook.ActiveSheet.TableList, "row", r, false)
        item = nwJson(item, "col", c, false)[0]
        var col = p8Spread_GetJsonValue(item, "col");
        var col2 = p8Spread_GetJsonValue(item, "col2");
        var row = p8Spread_GetJsonValue(item, "row");
        var row2 = p8Spread_GetJsonValue(item, "row2");

        for (var irow = row; irow <= row2; irow++) {
            for (var icol = col; icol <= col2; icol++) {
                this.SetTextColor(icol, irow, "black");
                this.SetBorder(icol, irow, "");
            }
        }
    } catch (ex) { }
}
P8.SpreadSheet.prototype.NOAHSpread_GetTableList = function (c, r) {

    var data = [];
    try {
        c = c == undefined ? this.CellIndexes.Col : c;
        r = r == undefined ? this.CellIndexes.Row : r;
        for (var itbl = 0; itbl < this.TableList.length; itbl++) {
            var item = this.TableList[itbl];
            var col = p8Spread_GetJsonValue(item, "col");
            var col2 = p8Spread_GetJsonValue(item, "col2");
            var row = p8Spread_GetJsonValue(item, "row");
            var row2 = p8Spread_GetJsonValue(item, "row2");
            if (row <= r && row2 >= r
                && col <= c && col2 >= c) {
                data.push(item)
            }


        }
    } catch (ex) { }
    return data;
}

P8.SpreadSheet.prototype.NOAHSpread_GetTableCellIndexes = function (c, r) {

    var data = {};
    try {
        c = c == undefined ? this.CellIndexes.Col : c;
        r = r == undefined ? this.CellIndexes.Row : r;
        for (var itbl = 0; itbl < this.TableList.length; itbl++) {
            var item = this.TableList[itbl];
            var col = p8Spread_GetJsonValue(item, "col");
            var col2 = p8Spread_GetJsonValue(item, "col2");
            var row = p8Spread_GetJsonValue(item, "row");
            var row2 = p8Spread_GetJsonValue(item, "row2");
            if (row <= r && row2 >= r
                && col <= c && col2 >= c) {
                data = { col: col, row: row, col2: col2, row2: row2 }
                break;
            }


        }
    } catch (ex) { }
    return data;
}
P8.SpreadSheet.prototype.NOAHSpread_CreateTable = function (formatonly) {
    try {
        formatonly = formatonly == undefined ? false : true;
        for (var itbl = 0; itbl < this.TableList.length; itbl++) {
            var code = p8Spread_GetJsonValue(this.TableList[itbl], "code");
            var col = p8Spread_GetJsonValue(this.TableList[itbl], "col");
            var col2 = p8Spread_GetJsonValue(this.TableList[itbl], "col2");
            var row = p8Spread_GetJsonValue(this.TableList[itbl], "row");
            var row2 = p8Spread_GetJsonValue(this.TableList[itbl], "row2");
            var ShowColumn = p8Spread_GetJsonValue(this.TableList[itbl], "showcolumn");
            var ShowColumnBanded = p8Spread_GetJsonValue(this.TableList[itbl], "showcolumnbanded");
            var ShowRowBanded = p8Spread_GetJsonValue(this.TableList[itbl], "showrowbanded");

            var item = nwJson(_NOAHSpread_TableFormat, "code", code, false)[0];
            var itemdef = _NOAHSpread_TableFormatDefault[0];

            //var ShowColumn = p8Spread_GetJsonValue(this.TableList[itbl], "ShowColumn") || p8Spread_GetJsonValue(itemdef, "ShowColumn");
            //var ShowColumnBanded = p8Spread_GetJsonValue(this.TableList[itbl], "ShowColumnBanded") || p8Spread_GetJsonValue(itemdef, "ShowColumnBanded");
            //var ShowRowBanded = p8Spread_GetJsonValue(this.TableList[itbl], "ShowRowBanded") || p8Spread_GetJsonValue(itemdef, "ShowRowBanded");

            var col_r = col;
            var col2_r = col2;
            var row_r = row;
            var row2_r = row2;

            if (ShowColumn) {

                var ColumnFormat = p8Spread_GetJsonValue(item, "ColumnFormat");
                var ColumnFormatDef = p8Spread_GetJsonValue(itemdef, "ColumnFormat");
                var BackgroundColor = p8Spread_GetJsonValue(ColumnFormat, "BackgroundColor") || p8Spread_GetJsonValue(ColumnFormatDef, "BackgroundColor")
                var TextColor = p8Spread_GetJsonValue(ColumnFormat, "TextColor") || p8Spread_GetJsonValue(ColumnFormatDef, "TextColor")
                var TextAlign = p8Spread_GetJsonValue(ColumnFormat, "TextAlign") || p8Spread_GetJsonValue(ColumnFormatDef, "TextAlign")
                var VerticalAlign = p8Spread_GetJsonValue(ColumnFormat, "VerticalAlign") || p8Spread_GetJsonValue(ColumnFormatDef, "VerticalAlign")
                var BorderWidth = p8Spread_GetJsonValue(ColumnFormat, "BorderWidth") || p8Spread_GetJsonValue(ColumnFormatDef, "BorderWidth")
                var BorderStyle = p8Spread_GetJsonValue(ColumnFormat, "BorderStyle") || p8Spread_GetJsonValue(ColumnFormatDef, "BorderStyle")
                var BorderColor = p8Spread_GetJsonValue(ColumnFormat, "BorderColor") || p8Spread_GetJsonValue(ColumnFormatDef, "BorderColor")
                var Border = `${BorderWidth} ${BorderStyle} ${BorderColor}`;
                var DefaultValue = p8Spread_GetJsonValue(ColumnFormat, "DefaultValue") || p8Spread_GetJsonValue(ColumnFormatDef, "DefaultValue")

                var irow = row_r;
                var colnum = 0;
                for (var icol = col_r; icol <= col2_r; icol++) {
                    colnum += 1;

                    this.SetBackground(icol, irow, BackgroundColor);
                    this.SetTextColor(icol, irow, TextColor);
                    this.SetTextAlign(icol, irow, TextAlign);
                    this.SetVerticalAlign(icol, irow, VerticalAlign);
                    this.SetBorder(icol, irow, Border);
                    if (formatonly) {
                    } else {
                        this.SetText(icol, irow, DefaultValue.replaceAll("{col}", colnum));
                    }

                }
                //add 1
                row_r += 1;
            }

            //DataFormat
            var DataFormat = p8Spread_GetJsonValue(item, "DataFormat");
            var DataFormatDef = p8Spread_GetJsonValue(itemdef, "ColumnFormat");
            var BackgroundColor = p8Spread_GetJsonValue(DataFormat, "BackgroundColor") || p8Spread_GetJsonValue(DataFormatDef, "BackgroundColor");
            var TextColor = p8Spread_GetJsonValue(DataFormat, "TextColor") || p8Spread_GetJsonValue(DataFormatDef, "TextColor");
            var TextAlign = p8Spread_GetJsonValue(DataFormat, "TextAlign") || p8Spread_GetJsonValue(DataFormatDef, "TextAlign")
            var VerticalAlign = p8Spread_GetJsonValue(DataFormat, "VerticalAlign") || p8Spread_GetJsonValue(DataFormatDef, "VerticalAlign")
            var BorderWidth = p8Spread_GetJsonValue(DataFormat, "BorderWidth") || p8Spread_GetJsonValue(DataFormatDef, "BorderWidth");
            var BorderStyle = p8Spread_GetJsonValue(DataFormat, "BorderStyle") || p8Spread_GetJsonValue(DataFormatDef, "BorderStyle");
            var BorderColor = p8Spread_GetJsonValue(DataFormat, "BorderColor") || p8Spread_GetJsonValue(DataFormatDef, "BorderColor");
            var Border = `${BorderWidth} ${BorderStyle} ${BorderColor}`;



            for (var irow = row_r; irow <= row2_r; irow++) {
                for (var icol = col_r; icol <= col2_r; icol++) {
                    /*  _sfSetFormat(this, icol, irow, "table", code, icol, irow);*/
                    this.SetBackground(icol, irow, BackgroundColor);
                    this.SetTextColor(icol, irow, TextColor);
                    this.SetTextAlign(icol, irow, TextAlign);
                    this.SetVerticalAlign(icol, irow, VerticalAlign);
                    this.SetBorder(icol, irow, "");

                }
              
            }

            //Banded Column Format
            if (ShowColumnBanded) {
                var BandedColumnFormat = p8Spread_GetJsonValue(item, "BandedColumnFormat");
                var BackgroundColor_BandedColumn = p8Spread_GetJsonValue(BandedColumnFormat, "BackgroundColor")
                var BorderWidth_BandedColumn = p8Spread_GetJsonValue(BandedColumnFormat, "BorderWidth")
                var BorderStyle_BandedColumn = p8Spread_GetJsonValue(BandedColumnFormat, "BorderStyle")
                var BorderColor_BandedColumn = p8Spread_GetJsonValue(BandedColumnFormat, "BorderColor")
                var Border_BandedColumn = `${BorderWidth_BandedColumn} ${BorderStyle_BandedColumn} ${BorderColor_BandedColumn}`;
            }
            //Banded Row Format
            if (ShowRowBanded) {
                var BandedRowFormat = p8Spread_GetJsonValue(item, "BandedRowFormat");
                var BackgroundColor_BandedRow = p8Spread_GetJsonValue(BandedRowFormat, "BackgroundColor")
                var BorderWidth_BandedRow = p8Spread_GetJsonValue(BandedRowFormat, "BorderWidth")
                var BorderStyle_BandedRow = p8Spread_GetJsonValue(BandedRowFormat, "BorderStyle")
                var BorderColor_BandedRow = p8Spread_GetJsonValue(BandedRowFormat, "BorderColor")
                var Border_BandedRow = `${BorderWidth_BandedRow} ${BorderStyle_BandedRow} ${BorderColor_BandedRow}`;
            }
            //if light

            for (var i = col_r; i <= col2_r; i++) {
                this.SetBorderTop(i, row_r, Border);
                this.SetBorderBottom(i, row2_r, Border);
                if (ShowColumnBanded) {
                    if (i % 2 === 0) {

                    } else {
                        for (var j = row_r; j <= row2_r; j++) {
                            this.SetBackground(i, j, BackgroundColor_BandedColumn);
                            this.SetBorder(i, j, Border_BandedColumn);
                        }
                    }
                }
            }
            for (var i = row_r; i <= row2_r; i++) {
                this.SetBorderLeft(col_r, i, Border);
                this.SetBorderRight(col2_r, i, Border);
                if (ShowRowBanded) {
                    if (i % 2 === 0) {

                    } else {
                        for (var j = col_r; j <= col2_r; j++) {
                            this.SetBackground(j, i, BackgroundColor_BandedRow);
                            this.SetBorder(j, i, Border_BandedRow);
                        }
                    }
                }
            }

       
            //if (ShowColumnBanded) {
            //    if (icol % 2 === 0) {

            //    } else {
            //        this.SetBackground(icol, irow, BackgroundColor_BandedColumn, col2_r, row2_r);
            //        this.SetBorder(icol, irow, Border_BandedColumn, col2_r, row2_r);
            //    }
            //}
            ////Banded Row Format
            //var BandedRowFormat = p8Spread_GetJsonValue(item, "BandedRowFormat");
            //var BackgroundColor_BandedRow = p8Spread_GetJsonValue(BandedRowFormat, "BackgroundColor")
            //var BorderWidth_BandedRow = p8Spread_GetJsonValue(BandedRowFormat, "BorderWidth")
            //var BorderStyle_BandedRow = p8Spread_GetJsonValue(BandedRowFormat, "BorderStyle")
            //var BorderColor_BandedRow = p8Spread_GetJsonValue(BandedRowFormat, "BorderColor")
            //var Border_BandedRow = `${BorderWidth_BandedRow} ${BorderStyle_BandedRow} ${BorderColor_BandedRow}`;

            //if (ShowRowBanded) {
            //    if (irow % 2 === 0) {

            //    } else {
            //        this.SetBackground(icol, irow, BackgroundColor_BandedRow, col2_r, row2_r);
            //        this.SetBorder(icol, irow, Border_BandedRow, col2_r, row2_r);
            //    }
            //}
        }
    } catch (ex) { }
}


P8.SpreadSheet.prototype.NOAHSpread_SetShowColumn = function (c, r,data) {
    
    try {
        if (data == false || data == true) {
            c = c == undefined ? this.CellIndexes.Col : c;
            r = r == undefined ? this.CellIndexes.Row : r;
            for (var itbl = 0; itbl < this.TableList.length; itbl++) {
                var item = this.TableList[itbl];
                var col = p8Spread_GetJsonValue(item, "col");
                var col2 = p8Spread_GetJsonValue(item, "col2");
                var row = p8Spread_GetJsonValue(item, "row");
                var row2 = p8Spread_GetJsonValue(item, "row2");
                if (row <= r && row2 >= r
                    && col <= c && col2 >= c) {
                    item.showcolumn = data;
                    break;
                }
            }
        }
    } catch (ex) { }
}

P8.SpreadSheet.prototype.NOAHSpread_GetShowColumn = function (c, r) {
    try {
            c = c == undefined ? this.CellIndexes.Col : c;
            r = r == undefined ? this.CellIndexes.Row : r;
            for (var itbl = 0; itbl < this.TableList.length; itbl++) {
                var item = this.TableList[itbl];
                var col = p8Spread_GetJsonValue(item, "col");
                var col2 = p8Spread_GetJsonValue(item, "col2");
                var row = p8Spread_GetJsonValue(item, "row");
                var row2 = p8Spread_GetJsonValue(item, "row2");
                if (row <= r && row2 >= r
                    && col <= c && col2 >= c) {
                    return item.showcolumn;
                    break;
                }
            }
    } catch (ex) { }
    return false;
}
$(document).on("change", "#chkshowcolumn", function () {

    mSpreadBook.ActiveSheet.NOAHSpread_SetShowColumn(undefined, undefined, $(this).prop("checked"));
    mSpreadBook.ActiveSheet.NOAHSpread_CreateTable(true)
    return false;
});


P8.SpreadSheet.prototype.NOAHSpread_SetShowColumnBanded = function (c, r, data) {

    try {
        if (data == false || data == true) {
            c = c == undefined ? this.CellIndexes.Col : c;
            r = r == undefined ? this.CellIndexes.Row : r;
            for (var itbl = 0; itbl < this.TableList.length; itbl++) {
                var item = this.TableList[itbl];
                var col = p8Spread_GetJsonValue(item, "col");
                var col2 = p8Spread_GetJsonValue(item, "col2");
                var row = p8Spread_GetJsonValue(item, "row");
                var row2 = p8Spread_GetJsonValue(item, "row2");
                if (row <= r && row2 >= r
                    && col <= c && col2 >= c) {
                    item.showcolumnbanded = data;
                    break;
                }
            }
        }
    } catch (ex) { }
}

P8.SpreadSheet.prototype.NOAHSpread_GetShowColumnBanded = function (c, r) {
    try {
        c = c == undefined ? this.CellIndexes.Col : c;
        r = r == undefined ? this.CellIndexes.Row : r;
        for (var itbl = 0; itbl < this.TableList.length; itbl++) {
            var item = this.TableList[itbl];
            var col = p8Spread_GetJsonValue(item, "col");
            var col2 = p8Spread_GetJsonValue(item, "col2");
            var row = p8Spread_GetJsonValue(item, "row");
            var row2 = p8Spread_GetJsonValue(item, "row2");
            if (row <= r && row2 >= r
                && col <= c && col2 >= c) {
                return item.showcolumnbanded;
                break;
            }
        }
    } catch (ex) { }
    return false;
}
$(document).on("change", "#chkshowcolumnbanded", function () {

    mSpreadBook.ActiveSheet.NOAHSpread_SetShowColumnBanded(undefined, undefined, $(this).prop("checked"));
    mSpreadBook.ActiveSheet.NOAHSpread_CreateTable(true)
    return false;
});



P8.SpreadSheet.prototype.NOAHSpread_SetShowRowBanded = function (c, r, data) {

    try {
        if (data == false || data == true) {
            c = c == undefined ? this.CellIndexes.Col : c;
            r = r == undefined ? this.CellIndexes.Row : r;
            for (var itbl = 0; itbl < this.TableList.length; itbl++) {
                var item = this.TableList[itbl];
                var col = p8Spread_GetJsonValue(item, "col");
                var col2 = p8Spread_GetJsonValue(item, "col2");
                var row = p8Spread_GetJsonValue(item, "row");
                var row2 = p8Spread_GetJsonValue(item, "row2");
                if (row <= r && row2 >= r
                    && col <= c && col2 >= c) {
                    item.showrowbanded = data;
                    break;
                }
            }
        }
    } catch (ex) { }
}

P8.SpreadSheet.prototype.NOAHSpread_GetShowRowBanded = function (c, r) {
    try {
        c = c == undefined ? this.CellIndexes.Col : c;
        r = r == undefined ? this.CellIndexes.Row : r;
        for (var itbl = 0; itbl < this.TableList.length; itbl++) {
            var item = this.TableList[itbl];
            var col = p8Spread_GetJsonValue(item, "col");
            var col2 = p8Spread_GetJsonValue(item, "col2");
            var row = p8Spread_GetJsonValue(item, "row");
            var row2 = p8Spread_GetJsonValue(item, "row2");
            if (row <= r && row2 >= r
                && col <= c && col2 >= c) {
                return item.showcolumnbanded;
                break;
            }
        }
    } catch (ex) { }
    return false;
}
$(document).on("change", "#chkshowrowbanded", function () {

    mSpreadBook.ActiveSheet.NOAHSpread_SetShowRowBanded(undefined, undefined, $(this).prop("checked"));
    mSpreadBook.ActiveSheet.NOAHSpread_CreateTable(true)
    return false;
});
