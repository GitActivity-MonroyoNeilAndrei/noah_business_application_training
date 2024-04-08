function p8forw_checktoolbox_properties() {
    try {
        var item = mSpreadBook.ActiveSheet.GetSelectedIndexes();
        var col = item.col;
        var row = item.row;
        var forwformula = mSpreadBook.ActiveSheet.GetFORWFormula(col, row);
        //context Menu item
        $(".context-menu-item.Properties").p8forwhide()
        //$(".context-menu-item.insertrowabove").p8forwshow()
        //$(".context-menu-item.insertrowbelow").p8forwshow()
        //$(".context-menu-item.insertcolumnleft").p8forwshow()
        //$(".context-menu-item.insertcolumnright").p8forwshow()
        $(".context-menu-item.insertcells").p8forwshow()
        //$(".context-menu-item.deleterow").p8forwshow()
        //$(".context-menu-item.deletecolumn").p8forwshow()
        $(".context-menu-item.deletecells").p8forwshow()
        $(".context-menu-item.deletetable").p8forwhide()
        $(".context-menu-item.deletetablerow").p8forwhide()
        $(".context-menu-item.deletetablecolumn").p8forwhide()

        if (forwformula.includes("=FORW_DataCondition")
            || forwformula.includes("=FORW_Lookup")
            || forwformula.includes("=FORW_AddToList")
            || forwformula.includes("=FORW_Table")
            || forwformula.includes("=FORW_Drill")
        ) {
            //context Menu item
            $(".context-menu-item.Properties").p8forwshow()
        }

        //all col affected
        var Grid = mSpreadBook.ActiveSheet;
        var TableConfigFinal = [];
        var TableConfigFinal = Grid.NOAHSpread_GetTableList(col, row, "table");
        //var len = 0
        //try { len = TableConfig.length; } catch (ex) { }
        //for (var i = 0; i < len; i++) {
        //    TableConfigFinal.push(TableConfig[i].data[0]);
        //}
        var len = 0;
        try { len = TableConfigFinal.length; } catch (ex) { }
        if (len > 0) {
            //$(".context-menu-item.deletecells").p8forwhide()
            //$(".context-menu-item.insertcells").p8forwhide()
            //if current index within the table
            for (var k = 0; k < len; k++) {
                var itemtblcon = TableConfigFinal[k]
                codeitemtbl = p8Spread_GetJsonValue(itemtblcon, "code");
                rowitemtbl = p8Spread_GetJsonValue(itemtblcon, "row");
                row2itemtbl = p8Spread_GetJsonValue(itemtblcon, "row2");
                colitemtbl = p8Spread_GetJsonValue(itemtblcon, "col");
                col2itemtbl = p8Spread_GetJsonValue(itemtblcon, "col2");
                var withinthetable = false;
                for (var i = rowitemtbl; i <= row2itemtbl; i++) {
                    for (var j = colitemtbl; j <= col2itemtbl; j++) {
                        if (row == i && col == j) {
                            withinthetable = true;
                            break;
                        }
                    }
                    if (withinthetable) {
                        break;
                    }
                }
                if (withinthetable){
                    $(".context-menu-item.deletetable").p8forwshow()
                    //$(".context-menu-item.deletetablerow").p8forwshow()
                    //$(".context-menu-item.deletetablecolumn").p8forwshow()
                }
            }
        }

    } catch (ex) { }
}



$(document).ready(function () {
    setTimeout(function () {
        var p8forw_canvasSheet = document.getElementById("mSpread_vw");
        var activeContextMenu = null;

        p8forw_canvasSheet.addEventListener('contextmenu', function (event) {
            event.preventDefault();
            // Dynamically generate context menu items using the 'test' function

            // Clear any existing context menu
            hideContextMenu();
            var contextMenuItems = ItemList();
            // Show the context menu with the dynamically generated items
            showContextMenu(event.clientX, event.clientY, contextMenuItems);

            //check properties
            p8forw_checktoolbox_properties()
            return false;
        });

        function showContextMenu(x, y, items) {
            // Create and show your custom context menu here
            var contextMenu = document.createElement('div');
            contextMenu.className = 'custom-context-menu';

            // Prevent right-clicking inside the context menu itself
            contextMenu.addEventListener('contextmenu', function (event) {
                event.preventDefault();
            });

            for (var key in items) {
                if (items.hasOwnProperty(key)) {
                    var menuItem;

                    if (items[key].separator) {
                        // Create a separator line
                        menuItem = document.createElement('div');
                        menuItem.className = 'separator';
                    } else {
                        menuItem = document.createElement('div');
                        menuItem.className = 'context-menu-item ' + key;

                        // Create a container for icon, text, and right arrow
                        var itemContainer = document.createElement('div');
                        itemContainer.className = 'item-container';

                        // Add Icon
                        var icon = document.createElement('div');
                        icon.className = items[key].icon;
                        itemContainer.appendChild(icon);

                        // Add the text for the item
                        var item = mSpreadBook.ActiveSheet.GetSelectedIndexes();
                        var row = p8Spread_GetJsonValue(item,"row");
                        var row2 = p8Spread_GetJsonValue(item,"row2");
                        var col = p8Spread_GetJsonValue(item,"col");
                        var col2 =  p8Spread_GetJsonValue(item,"col2");
                        //insert row above
                        var valuereplace = "";
                        if (key == "insertrowabove" || key == "insertrowbelow"){
                            var row_f = row2 - row + 1;
                            valuereplace = row_f + " " + ((row_f <= 1) ? "row" : "rows")
                        } else if (key == "insertcolumnleft" || key == "insertcolumnright") {
                            var col_f = col2 - col + 1;
                            valuereplace = col_f +" "+ ((col_f <= 1) ?"column":"columns")
                        } else if(key == "deleterow"){
                            var row_f = row + 1;
                            var row2_f = row2 + 1;
                            if(row == row2){
                                valuereplace = "row"
                            }else{
                                valuereplace = "rows "+row_f+" - "+row2_f
                            }
                        } else if(key == "deletecolumn"){
                            var col_f = p8_NumberToCell(col + 1);
                            var col2_f = p8_NumberToCell(col2 + 1);
                            if(col == col2){
                                valuereplace = "column"
                            }else{
                                valuereplace = "columns "+col_f+" - "+col2_f
                            }
                        } 


                        

                        var itemText = document.createElement('div');
                        var name = items[key].name
                        name = name.replace(/@col/g, valuereplace);
                        name = name.replace(/@row/g, valuereplace);
                        itemText.textContent = name;
                        itemContainer.appendChild(itemText);

                        // Check if the item has sub-items
                        if (items[key].items) {
                            menuItem.classList.add('has-submenu');
                            menuItem.addEventListener('mouseenter', function () {
                                this.querySelector('.submenu').style.display = 'block';
                            });

                            // Add mouseleave event listener to hide sub-menu when focusing out of Item
                            menuItem.addEventListener('mouseleave', function () {
                                this.querySelector('.submenu').style.display = 'none';
                            });

                            // Add the right arrow
                            var rightArrow = document.createElement('div');
                            rightArrow.className = 'arrow';
                            itemContainer.appendChild(rightArrow);

                            var subMenu = document.createElement('div');
                            subMenu.className = 'submenu';

                            for (var subKey in items[key].items) {
                                if (items[key].items.hasOwnProperty(subKey)) {
                                    var subMenuItem = document.createElement('div');
                                    subMenuItem.className = 'context-menu-item';
                                    subMenuItem.textContent = items[key].items[subKey].name;
                                    subMenuItem.addEventListener('click', items[key].items[subKey].callback);

                                    subMenu.appendChild(subMenuItem);
                                }
                            }

                            menuItem.appendChild(subMenu);
                        }

                        // Add the container to the menu item
                        menuItem.appendChild(itemContainer);
                        if (items[key].items) {
                        } else {
                            menuItem.addEventListener('click', items[key].callback);
                        }

                    }

                    contextMenu.appendChild(menuItem);
                }
            }

            // Position the context menu
            contextMenu.style.top = y + 'px';
            contextMenu.style.left = x + 'px';

            // Add the context menu to the document
            document.body.appendChild(contextMenu);

            // Set the active context menu
            activeContextMenu = contextMenu;

            // Hide the context menu if clicking outside of it
            document.addEventListener('click', hideContextMenu);
        }

        function hideContextMenu(event) {
            // Check if the click occurred outside the context menu
            var target = "";
            try{target = event.target}catch(ex){}
            if ((activeContextMenu && !activeContextMenu.contains(target))
               || activeContextMenu)  {
                // Remove the active context menu from the document
                activeContextMenu.remove();
                activeContextMenu = null;

                // Remove the click event listener
                document.removeEventListener('click', hideContextMenu);
            }
        }

        function ItemList() {
            var items = {
                'insertrowabove': {
                    name: 'Insert @row above',
                    icon: 'insert-icon-menu',
                    callback: function (i,item) {
                        Home_InsertDeleteCell('insertrowabove')
                    }
                },
                'insertrowbelow': {
                    name: 'Insert @row below',
                    icon: 'insert-icon-menu',
                    callback: function (i, item) {
                        Home_InsertDeleteCell('insertrowbelow')
                    }
                },
                'insertcolumnleft': {
                    name: 'Insert @col left',
                    icon: 'insert-icon-menu',
                    callback: function () {
                        Home_InsertDeleteCell('insertcolumnleft')
                    }
                },
                'insertcolumnright': {
                    name: 'Insert @col right',
                    icon: 'insert-icon-menu',
                    callback: function () {
                        Home_InsertDeleteCell('insertcolumnright')
                    }
                },
                'insertcells': {
                    name: 'Insert cells',
                    icon: 'insert-icon-menu',
                    callback: function () {
                        //alert('Item 2 clicked!');
                    },
                    items: {
                        'insertcellsandshiftright': {
                            name: 'Insert cells and shift right',
                            callback: function () {
                                Home_InsertDeleteCell('insertcellsandshiftright')
                            }
                        },
                        'insertcellsandshiftdown': {
                            name: 'Insert cells and shift down',
                            callback: function () {
                                Home_InsertDeleteCell('insertcellsandshiftdown')
                            }
                        }
                    }
                },
                'separator1': {
                    separator: true
                },
                'deleterow': {
                    name: 'Delete @row',
                    icon: 'delete-icon-menu',
                    callback: function () {
                        Home_InsertDeleteCell('deleterow')
                    }
                },
                'deletecolumn': {
                    name: 'Delete @col',
                    icon: 'delete-icon-menu',
                    callback: function () {
                        Home_InsertDeleteCell('deletecolumn')
                    }
                },
                'deletecells': {
                    name: 'Delete cells',
                    icon: 'delete-icon-menu',
                    callback: function () {
                        //alert('Item 2 clicked!');
                    },
                    items: {
                        'deletecellsandshiftleft': {
                            name: 'Delete cells and shift left',
                            callback: function () {
                                Home_InsertDeleteCell('deletecellsandshiftleft')
                            }
                        },
                        'deletecellsandshiftup': {
                            name: 'Delete cells and shift up',
                            callback: function () {
                                Home_InsertDeleteCell('deletecellsandshiftup')
                            }
                        }
                    }
                },
                'deletetable': {
                    name: 'Delete Table',
                    icon: 'delete-icon-menu',
                    callback: function () {
                        mSpreadBook.ActiveSheet.NOAHSpread_DeleteTable();
                    }
                },
                'deletetablerow': {
                    name: 'Delete Table Row',
                    icon: 'delete-icon-menu',
                    callback: function () {
                        mSpreadBook.ActiveSheet.NOAHSpread_DeleteTableRow();
                    }
                },
                'deletetablecolumn': {
                    name: 'Delete Table Column',
                    icon: 'delete-icon-menu',
                    callback: function () {
                        mSpreadBook.ActiveSheet.NOAHSpread_DeleteTableColumn();
                    }
                },
                'separator2': {
                    separator: true
                },
                'Properties': {
                    name: 'Properties',
                    icon: 'prop-icon-menu',
                    callback: function () {
                        $("#p8forw-btnProperties").click();
                    }
                },

            };

            return items;
        }


    }, 100);
});


//function p8forw_itemtrigger(code) {
//    var Grid = mSpreadBook.ActiveSheet;
//    var item = Grid.GetSelectedIndexes();
//    var row = p8Spread_GetJsonValue(item, "row");
//    var row2 = p8Spread_GetJsonValue(item, "row2");
//    var col = p8Spread_GetJsonValue(item, "col");
//    var col2 = p8Spread_GetJsonValue(item, "col2");
//    if (code == "insertrowabove") {
//        var row_f = row2 - row + 1;
//        for (var i = 0; i < row_f; i++) {
//            Grid.RowInsert(row, false, false);
//        }
//    } else if (code == "insertcolumnleft") {
//        var col_f = col2 - col + 1;
//        for (var i = 0; i < col_f; i++) {
//            Grid.ColumnInsert(col, false, false);
//        }
//    } else if (code == "insertcellsandshiftright") {
//        for (var i = row; i <= row2; i++) {
//            for (var j = col; j <= col2; j++) {
//                Grid.ColumnInsertShift(j, i, false, false);
//            }
//        }
//    } else if (code == "insertcellsandshiftdown") {
//        for (var i = row; i <= row2; i++) {
//            for (var j = col; j <= col2; j++) {
//                Grid.RowInsertShift(j, i, false, false);
//            }
//        }
//    } else if (code == "deleterow") {
//        var row_f = row + 1;
//        var row2_f = row2 + 1;
//        for (var i = row2_f; i >= row_f; i--) {
//            Grid.RowDelete(row);
//        }
//    } else if (code == "deletecolumn") {
//        var col_f = col + 1;
//        var col2_f = col2 + 1;
//        for (var i = col2_f; i >= col_f; i--) {
//            Grid.ColumnDelete(col);
//        }
//    } else if (code == "deletecellsandshiftleft") {
//        for (var i = row2; i >= row; i--) {
//            for (var j = col2; j >= col; j--) {
//                Grid.ColumnDeleteShift(j, i, false, false);
//            }
//        }
//    } else if (code == "deletecellsandshiftup") {
//        for (var i = row2; i >= row; i--) {
//            for (var j = col2; j >= col; j--) {
//                Grid.RowDeleteShift(j, i, false, false);
//            }
//        }
//    }


//}

function func_RowInsert_MenuItem(index) {
    return p8forw_jsonupdatecell(index);
}

function func_RowDelete_MenuItem(index) {
    return p8forw_jsonupdatecell(index);
}

function func_ColumnInsert_MenuItem(index) {
    return p8forw_jsonupdatecell(index);
}

function func_ColumnDelete_MenuItem(index) {
    return p8forw_jsonupdatecell(index);
}

function p8forw_jsonupdatecell(index) {
    var jsonupdatecell = []
    jsonupdatecell.push({ jsonname: "p8forwsbcolumn", cellname: "cell" });
    jsonupdatecell.push({ jsonname: "p8forwsbevent", cellname: "cell" });
    jsonupdatecell.push({ jsonname: "p8forwsbfilter", cellname: "cell" });
    jsonupdatecell.push({ jsonname: "p8forwsbparam", cellname: "cell" });

    jsonupdatecell.push({ jsonname: "p8forwsbdrill", cellname: "cellsource" });
    jsonupdatecell.push({ jsonname: "p8forwsbdrill", cellname: "celldestination" });
    return jsonupdatecell;
}