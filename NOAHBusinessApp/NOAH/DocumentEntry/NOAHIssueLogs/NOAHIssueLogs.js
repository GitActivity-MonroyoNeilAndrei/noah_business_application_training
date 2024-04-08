
 
var pageTitle = "Isuse Log";

baseTitle = "Support Ticket Monitoring";

var mSpreadBook;
var mSpreadSheet;

var nwvalidationGridBook;
var nwvalidationGridSheet;
var indexstartdata = 3;
var bgcolorbuttonOpen = "#F7AD27";
var bgcolorbuttonWithContent = "#006775";
var jsonDescription = "";
var jsonRecuserDesc = "";
var _timeOld = "";

var crIndexSpread = -1;

var jsontbl = "";
var jsonfilterHDR = "";
var jsonfilterLIN = "";
var jsonSPRSave = "";
var jsonLookup = "";
var jsondescfunctagging = "";
var jsonSPR = "";
var _SPR = "";

var t_company = "Table";
var t_project = "Table1";
var t_implemstage = "Table2";
var t_module = "Table3";
var t_menugroup = "Table4";
var t_menuitem = "Table5";
var t_type = "Table6";
var t_status = "Table7";
var t_actiontype = "Table8";
var t_processedby = "Table9";
var t_assignedby = "Table10";
var t_task = "Table11";
var t_raisedby = "Table12";
var t_recuser = "Table13";
var t_moduser = "Table14";
var t_prio = "Table15";
var t_location = "Table16";
var t_submenugroup = "Table17";

var r_recuser = "Table"

//window.onload = function (e) {
//    var _SPR = SPR()
//}

function func_Reload() {
    crLnk = GetCurrentURL() + "NOAHIssueLogs_Gateway";
    crLnkGateKey = "NOAHIssueLogs";
    var textTitle = "Issue Logs";
    var classLogo = "logo";
    var classLogoImg = "p8";
    

    $("#sd-headerbuttons").append('<div class="nwe-btn ' + classLogo + '" data-content="customToolbox"><span>' + textTitle + '</span></div>');
    //setTimeout(function () {
    //    $('[data-content="customToolbox"].nwe-btn.' + classLogo).click();
    //}, 1000);
    setTimeout(function () {
        $("#home").addClass("hide");
        $("#home").removeClass("show");
        $("#customToolbox").removeClass("hide");
        $("#customToolbox").addClass("show");
    }, 1000);


    $('#new').enable(true);
    $('#save').enable(false);
    $('#addrow').enable(false);
    $('#copyfrom').enable(false);
    $('#filter').enable(true);
    $('#refresh').enable(true);
    $('#export').enable(false);

    //$("#settingstabs").loadAddtoList({ list: ["Company", "Project", "Module", "Menu Group", "Menu Item"], icon: true });
    //$("#settingstabs1").loadAddtoList({ list: ["Implementation Stage", "Type", "Status", "Action Item"], icon: true });
    //$("#settingstabs2").loadAddtoList({ list: ["Raised By", "Proccessed By", "Task for Employee"], icon: true });
    nwPopupForm_Create('nwValidate');
    nwPopupForm_Create("nwUploadCon");

    func_ActionDriven("actGetSPR", true);
    /// 
    
    
    cuzFIlter();
    var isContinue = true;
    $("#cmsnwgRemarks").CMS();
    $('#nwgRemarksCon').attr("remarksID", "screenshot");
    $("#errrormess").text(message)
    $("#conMessage").show()
    init_request();

    
    $("#StartTime").mask('99:99');


    return isContinue;
}

function func_ToolboxNavigatorBind_Empty() {

    nwLoading_Start("actBindCollectionEmpty", crLoadingHTML);

    RefreshData();

    func_ActionDriven("actBindCollectionEmpty", false);
}

function DisableGrid() {

    try {
        for (var i = 0; i < mSpreadBook.ActiveSheet.ColumnConfig.length; i++) {
            mSpreadBook.ActiveSheet.SetBackground(i, Spread_ALLROW, "#EFEFEF");
            mSpreadBook.ActiveSheet.ColumnConfig[i].Enabled = false;

        }
    }
    catch (ex) { }


}
function Disablefirstrow() {

    mSpreadBook.ActiveSheet.SetBackground(Spread_ALLCOL, 0, "white");
    mSpreadBook.ActiveSheet.SetEnable(Spread_ALLCOL, 0, false);





}


function SPR() {


    var jsonSPRdata = JSON.stringify(jsonSPR);
    var SPRs = JSON.parse(jsonSPRdata);
    var SPRSort = SPRs.sort(function (a, b) {
        return a.Spr - b.Spr;
    });
    
    
    return SPRSort;
}
function SPRInsert() {
    _SPR = SPR()
}

function SPRs() {


    var jsonSPRdataspread = JSON.stringify(jsonSPRSpread);
    var SPRSpread = JSON.parse(jsonSPRdataspread);
    var SPRspreadSort = SPRSpread.sort(function (a, b) {
        return a.Spr - b.Spr;
    });


    return SPRspreadSort;
}




function cuzSPRSave() {
    var jsonSave= JSON.stringify(jsonSPRSave);
    var jsonSaveData = JSON.parse(jsonSave);
    


    return jsonSaveData;
}


function cuz_LookupSPR() {
    var jsonLookupSPR = JSON.stringify(jsonLookup);
    var jsonSPRLookup = JSON.parse(jsonLookupSPR);

    return jsonSPRLookup;
}

function cuzFIlter() {
    var template = "";
    var jsonHDR = JSON.stringify(jsonfilterHDR);
    var jsonHDRFilter = JSON.parse(jsonHDR);
    var count = 1;
    var countjson = 1;
    let tabs = [];
    var settinglin;

    var jsonLIN = JSON.stringify(jsonfilterLIN);
    var jsonLINFilter = JSON.parse(jsonLIN);

    var jsonaddtolist = $.grep(jsonHDRFilter, function (n, i) {
        return n.containertype === 'addtolist';
    });
    var jsonaddtolistLin = $.grep(jsonLINFilter, function (n, i) {
        return n.objecttype === 'addtolist';
    });
    for (var k = 0; k <= jsonHDRFilter.length - 1; k++) {

        template += "<fieldset class='fieldset fullwidth' nk-fieldset-style='6'>";
        template += "<legend>" + jsonHDRFilter[k].title +"</legend>";
        template += "<div class='row'>";
        template += "<div class='col col-12'>";

        for (var l = 0; l <= jsonLINFilter.length - 1; l++) {

            if (jsonHDRFilter[k].containertype == 'regular' && jsonHDRFilter[k].groupid == jsonLINFilter[l].groupid) {
                template += "<div class='col col-6 col-parent padding-x-15'>";
                template += "<div class='row'>";
                template += "<div class='col col-6'>";
                template += "<label class='lbltxt'>"+jsonLINFilter[l].vardescription+"</label>";
                template += "</div>";
                template += "<div class='col col-6'>";
                template += "<input name='' class='txtbox nwDatePicker' id='"+jsonLINFilter[l].varname+"'>";
                template += "</div>";
                template += "</div>";
                template += "</div>";    
            } 
            
        }
        
        if (jsonHDRFilter[k].containertype == 'addtolist') {
            var tabnum = count - 1;
            if (tabnum == 0) {
                tabnum = '';
            }
            
            if (count <= jsonaddtolist.length) {
                template += "<div class='tabs tabs-lbl-bold fullwidth'>";
                template += "<div id='settingstabs" + tabnum + "' class='tabs-content'>";
                template += "</div>";
                template += "</div>";

                count++;
            }
        }

        template += "</div>";
        template += "</div>";
        template += "</fieldset>";
    }
    
    $("#filtersetting").html(template);

    for (var a = 0; a <= jsonaddtolist.length - 1; a++) {
        var SettingTab = countjson - 1;

        if (SettingTab == 0) {
            SettingTab = '';
        }
        

        if (countjson <= SettingTab.length) {
             
            
        }
        
        var addtolisttabs = [];
;        for (var b = 0; b <= jsonaddtolistLin.length - 1; b++) {

            if (jsonaddtolist[a].groupid == jsonaddtolistLin[b].groupid) {
                //tabs = tabs.concat(`"${jsonaddtolistLin[b].vardescription}" ,`)
                tabs = jsonaddtolistLin[b].vardescription;
                settinglin = jsonaddtolistLin[b].groupid;
                
                //3

                if (jsonaddtolist[a].groupid = settinglin) {

                    addtolisttabs.push(tabs);
                }
            }
            //2
           
            
        }
$("#settingstabs" + SettingTab + "").loadAddtoList({ list: addtolisttabs, icon: true });

        //1
        countjson++;
    }
    //
    


}




//function transpose(data) {
//    // Extract column names
//    const columns = Object.keys(data[0]);

//    // Transpose the data
//    const transposedData = columns.map(column => {
//        return {
//            attribute: column,
//            values: data.map(row => row[column])
//        };
//    });

//    return transposedData;
//}




var bgcolorlookup = "#cfffff";
var bgcolorEnable = "#FFFFFF";

var Header1 = 1;
var Header2 = 2;



function cust_GetPara() {
    nwParameter_Add("txtdateto", $("#txtdateto").val());
    nwParameter_Add("txtdatefrom", $("#txtdatefrom").val());
    try {
        nwParameter_Add_DataSet("mSpread");
    } catch (ex) { }
}




$(document).on("click", "#new", function () {

    func_ActionDriven("DataEnable", false);
    nwLoading_Start("actDataEnable", crLoadingHTML);
});

$(document).on("click", "#copyfrom", function () {

    mSpreadBook.ActiveSheet.RenderStatus = false;


    var Tag = $.grep(_SPR, function (n, i) {
        return n.varname === 'Tag';
    });

    var TagColEvent = JSON.parse(Tag[0].ColEvent);


    eval(TagColEvent.vcode);

    var j = mSpreadBook.ActiveSheet.GetMaxRow() - 1;
    //for (i = indexstartdata; i <= j ; i++) {

    ChangeStatusColor(j);

    var idname = '';
    for (i = 0; i <= _SPR.length - 1; i++) {
        _SPR[i].fieldproperties
        var lookup = JSON.parse(_SPR[i].fieldproperties)
          
        mSpreadBook.ActiveSheet.SetText(_SPR[i].Spr, j, mSpreadBook.ActiveSheet.GetValue(_SPR[i].Spr, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))

    }

    

    for (var i = indexstartdata; i < mSpreadBook.ActiveSheet.Data.length; i++) {


         var idname = '';
         for (i = 0; i <= _SPR.length - 1; i++) {
             _SPR[i].fieldproperties
             var lookup = JSON.parse(_SPR[i].fieldproperties)
            if (lookup.objecttype == 'lookup') {
                
                
                for (tablenum = 0; tablenum <= _SPR.length - 1; tablenum++) {
                    if (tablenum == 0) {
                        tablenum = ''
                    }
                    var t_table = "Table" + tablenum;
                    code = mSpreadBook.ActiveSheet.GetValue(_SPR[i].Spr, i);
                    desc = cuz_GetDesription(t_table, code);
                    mSpreadBook.ActiveSheet.SetText2(_SPR[i].Spr, i, desc);
                }
                


                
               

            } else {
                idname = '';
            }

        }




    }













//    //}


    mSpreadBook.ActiveSheet.RowAdd();
    mSpreadBook.ActiveSheet.RenderStatus = true;

   func_ActionDriven("actCopyRow", false);
    nwLoading_Start("actCopyrow", crLoadingHTML);

});

$(document).on("click", "#refresh", function () {

    GetAddtoListFilters();
    cust_GetPara();
    $("#StartTime").mask('99:99');
    //p8Spread_Click();
    //cust_SetTagging();
    func_ActionDriven("Refresh", false);
    nwLoading_Start("actRefresh", crLoadingHTML);
});

var temp_crnwTR = "";
var var1 = "";
var var2 = "";
function Lookup_DoneFunction(idName, idNum) {
    mSpreadBook.ActiveSheet.RenderStatus = false;
    cust_GetPara();

    var Tag = $.grep(_SPR, function (n, i) {
        return n.varname === 'Tag';
    });
    var TagColEvent = JSON.parse(Tag[0].ColEvent);

    eval(TagColEvent.vcode);

    var idname = '';
    for (i = 0; i <= _SPR.length - 1; i++) {
        _SPR[i].fieldproperties
        var lookup = JSON.parse(_SPR[i].fieldproperties)
        var lookuptag = JSON.parse(_SPR[i].ColEvent);
        if (lookup.objecttype == 'lookup') {
            idname = 'lug' + _SPR[i].varname
            if (idName == idname) {

                var var1 = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(0) span").text();
                var var2 = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(1) span").text();


                mSpreadBook.ActiveSheet.SetText(_SPR[i].Spr, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, var1);
                mSpreadBook.ActiveSheet.SetText2(_SPR[i].Spr, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, var2);


                ChangeStatusColor(mSpreadBook.ActiveSheet.GetSelectedIndexes().row);

                var lookuptagvcode = lookuptag.vcode;

                eval(lookuptagvcode);

                
            }


        } else {
            idname = '';
        }

    }



    mSpreadBook.ActiveSheet.RenderStatus = true;
}


function cuzActionNew() {
     $('#new').enable(true);
    $('#save').enable(true);
    $('#addrow').enable(true);
    $('#copyfrom').enable(false);
    $('#filter').enable(false);
    $('#refresh').enable(true);
    $('#export').enable(false);


    mSpreadBook.ActiveSheet.RowAdd();


}

function func_LookUpInitialize(lookupid) {

    mSpreadBook.ActiveSheet.RenderStatus = false;

    var vlookup = $.grep(cuz_LookupSPR(), function (n, i) {
        return n.lookupinitialize !== null;
    });
    
    for (var i = 0; i <= vlookup.length - 1; i++) {
        var lookupname = vlookup[i].lookup
        if (lookupid == lookupname) {
            eval(vlookup[i].lookupinitialize)
        }
    }




    mSpreadBook.ActiveSheet.RenderStatus = true;

}



function cuz_SaveScreenshot() {

    var ScreenShot = $.grep(_SPR, function (n, i) {
        return n.varname === 'Screenshot';
    });

    $('#nwgRemarksCon').removeClass('show'); $('#nwgRemarksCon').hide();

    mSpreadBook.ActiveSheet.SetValue(ScreenShot[0].Spr, crIndexSpread, 1); mSpreadBook.ActiveSheet.SetBackground(ScreenShot[0].Spr, crIndexSpread, bgcolorbuttonWithContent);

}

function Button_Enable() {
    $('#new').enable(true);
    $('#save').enable(true);
    $('#addrow').enable(true);
    $('#copyfrom').enable(true);
    $('#filter').enable(true);
    $('#refresh').enable(true);
    $('#export').enable(true);
}


function cuz_retdesc() {
    var Grid = mSpreadBook.ActiveSheet;
    mSpreadBook.ActiveSheet.AutoWrap = false;
    Grid.RenderStatus = false;



for (var j = 0; j < _SPR.length - 1; j++) {
  
    


    for (var i = 0; i < jsonDescription.length; i++) {
       
            var Description = _SPR[j]["Description"]
            var value = jsonDescription[i][Description]
            //Grid.SetText2(SPR()[j].Spr, i + 2, value)
            Grid.Data[i + 2][_sfGetCellName(Grid, j)].text2 = value;
            
    }

   

    }

eval(jsondescfunctagging[0].filter);

    

    
    Grid.RenderStatus = true;
    
}


function cuz_dateformatret() {
    var Grid = mSpreadBook.ActiveSheet
    for (var j = 0; j < _SPR.length - 1; j++) {

        var fieldproperty = JSON.parse(_SPR[j].fieldproperties)
        if (fieldproperty.objecttype == 'datepicker') {
            for (var i = indexstartdata; i < mSpreadBook.ActiveSheet.Data.length; i++) {
               
                    //var date = new Date(Grid.GetValue(_SPR[j].SPR, i));
                var raiseddate = mSpreadBook.ActiveSheet.GetValue(_SPR[j].SPR, i).replace(' 12:00:00 AM', '')
                    //var formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short' });
                    //var formattedDate = formatter.format(date);
                //Grid.SetText(_SPR[j].Spr, i, formattedDate);
                    

                mSpreadBook.ActiveSheet.SetText(_SPR[j].SPR, i, raiseddate)
                
            }
        }
    }
    
}


$(document).on('click', '#save', function () {

    eval(cuzSPRSave()[0].funcbeforesaving)
    //var jsondata = [];
    //for (var i = indexstartdata; i < mSpreadBook.ActiveSheet.Data.length; i++) {
    //    if (mSpreadBook.ActiveSheet.GetValue(SPR()[0].Spr, i) == "1" || mSpreadBook.ActiveSheet.GetValue(SPR()[0].Spr, i) == "0") {
    //        mSpreadBook.ActiveSheet.SetValue(SPR()[0].Spr, i, "2");
    //        mSpreadBook.ActiveSheet.SetText2(SPR()[0].Spr, i, "Saved");
    //        mSpreadBook.ActiveSheet.SetBold(SPR()[0].Spr, i, "Bold");
    //        mSpreadBook.ActiveSheet.SetBackground(SPR()[0].Spr, i, "#59E817");

    //        for (var j = 0; j < SPR().length; j++) {
    //            var varname = SPR()[j].varname
    //            var SPRspread = SPR()[j].Spr
    //            for (var k = 0; k=j; k++) {
    //                var com;
    //                if (k == 0) {
    //                    com = '';
    //                } else {

    //                    com = ',';
    //                }
                    
    //                jsonvarname = com + varname;
    //                jsondata.push({
    //                    jsonvarname: mSpreadBook.ActiveSheet.GetValue(SPRspread, i)
    //                });
    //            }
    //        }


    //    }
    //}


    nwParameter_Add("jsondata", JSON.stringify(jsondata));
    func_ActionDriven("GridSave", false);
    nwLoading_Start("GridSave", crLoadingHTML);
});

var ItemID = "";
var Company = "";

function p8Spread_Click(canvasID, row, col) {

    if (canvasID == "mSpread") {

        var filtercolEvents = $.grep(_SPR, function (n, i) {
            return n.ColEvent !== null;
        });
        var filtercolEvent = filtercolEvents.sort(function (a, b) {
            return a.Spr - b.Spr;
        });
 
        for (i = 0; i <= filtercolEvent.length - 1; i++) {

            var coleventjson = JSON.parse(filtercolEvent[i].ColEvent)
           
            if (coleventjson.eventtype == 'click') {
                
                

                if (col == filtercolEvent[i].Spr) {

                    var Event = coleventjson.vcode;

                    eval(Event);

                    
                }


            }

        }



    }
}


function cuzGenerateGrid() {
    mSpreadBook.ActiveSheet.RenderStatus = false;


    

    var jsontable = JSON.stringify(jsontbl);
    var jtable = JSON.parse(jsontable);
    mSpreadBook.ActiveSheet.RowAdd();
    //mSpreadBook.ActiveSheet.RowAdd();
    for (var j = 0; j <= jtable.length - 1; j++) {
        Disablefirstrow();
        mSpreadBook.ActiveSheet.SetColumnWidth(jtable[j].Spr, jtable[j].Width);
        

        mSpreadBook.ActiveSheet.SetBackground(jtable[j].Spr, jtable[j].Width);
        mSpreadBook.ActiveSheet.SetDataType(Spread_ALLCOL, Header2, "text");

        mSpreadBook.ActiveSheet.SetText(jtable[j].Spr, Header2, jtable[j].ColDescription);
        var fieldproperty = JSON.parse(jtable[j].fieldproperties)
        mSpreadBook.ActiveSheet.SetBackground(jtable[j].Spr, Spread_ALLROW, fieldproperty.backgroundcolor);
        mSpreadBook.ActiveSheet.SetTextColor(jtable[j].Spr, Spread_ALLROW, fieldproperty.color);
        mSpreadBook.ActiveSheet.SetEnable(jtable[j].Spr, Spread_ALLROW, fieldproperty.enabled);

        if (fieldproperty.objecttype == 'datepicker') {
            mSpreadBook.ActiveSheet.SetDataType(jtable[j].Spr, Spread_ALLROW, "date");


            



        } else if (fieldproperty.objecttype == 'checkbox') {
            mSpreadBook.ActiveSheet.SetTemplate(jtable[j].Spr, 2, "Loaded", { BackgroundColor: "#FCE5CD", Text: jtable[j].ColDescription, TextColor: "black" });
            mSpreadBook.ActiveSheet.SetTemplate(jtable[j].Spr, Spread_ALLROW, "checkbox", "check");
            
        } else if (fieldproperty.objecttype == 'button') {
            mSpreadBook.ActiveSheet.SetTextColor(jtable[j].Spr, 0, "white");
            mSpreadBook.ActiveSheet.SetTemplate(jtable[j].Spr, 2, "Loaded", { BackgroundColor: "#FCE5CD", Text: jtable[j].ColDescription, TextColor: "black" });
            mSpreadBook.ActiveSheet.SetTemplate(jtable[j].Spr, Spread_ALLROW, "button", { BackgroundColor: "#CECECD", Text: "Screenshot", TextColor: "black" });
        } else if (fieldproperty.objecttype == '') {
            mSpreadBook.ActiveSheet.SetTextColor(jtable[j].Spr, 0, "white");
            mSpreadBook.ActiveSheet.SetTemplate(jtable[j].Spr, 2, "Loaded", { BackgroundColor: "#FCE5CD", Text: jtable[j].ColDescription, TextColor: "black" });
            mSpreadBook.ActiveSheet.SetDataType(jtable[j].Spr, Spread_ALLROW, 'text');
        }
        

        mSpreadBook.ActiveSheet.SetBackground(Spread_ALLCOL, 1, "#002060");
        mSpreadBook.ActiveSheet.SetTextColor(Spread_ALLCOL, 1, "white");
        mSpreadBook.ActiveSheet.SetEnable(Spread_ALLCOL, 2, false);
        mSpreadBook.ActiveSheet.SetTextAlign(Spread_ALLCOL, 2, "center");
        mSpreadBook.ActiveSheet.SetItalic(Spread_ALLCOL, 2, "italic");
        mSpreadBook.ActiveSheet.SetBackground(Spread_ALLCOL, 2, "#FCE5CD");
        
    }

    //var Tag = $.grep(SPR(), function (n, i) {
    //    return n.varname === "Tag";
    //});

    //var Screenshot = $.grep(SPR(), function (n, i) {
    //    return n.varname === "Screenshot";
    //});

    //var PriorityLevel = $.grep(SPR(), function (n, i) {
    //    return n.varname === "PriorityLevel";
    //});

    //var Status = $.grep(SPR(), function (n, i) {
    //    return n.varname === "Status";
    //});

    //for (var i = indexstartdata; i < mSpreadBook.ActiveSheet.Data.length; i++) {
    //    if (mSpreadBook.ActiveSheet.GetValue(Tag[0].Spr, i) == "2") {
    //        mSpreadBook.ActiveSheet.SetText2(Tag[0].Spr, i, "Saved");
    //        mSpreadBook.ActiveSheet.SetBold(Tag[0].Spr, i, "Bold");
    //        mSpreadBook.ActiveSheet.SetBackground(Tag[0].Spr, i, "#95CD41");


    //        if (mSpreadBook.ActiveSheet.GetValue(Screenshot[0].Spr, i) == "1") {
    //            mSpreadBook.ActiveSheet.SetBackground(Screenshot[0].Spr, i, bgcolorbuttonWithContent);
    //        }
    //        else {
    //            mSpreadBook.ActiveSheet.SetBackground(Screenshot[0].Spr, i, bgcolorbuttonOpen);
    //        }
    //    }
        
    //    if (mSpreadBook.ActiveSheet.GetValue(PriorityLevel[0].Spr, i) == 'P3') {
    //        mSpreadBook.ActiveSheet.SetBackground(PriorityLevel[0].Spr, i, "#E74646")
    //        mSpreadBook.ActiveSheet.SetTextAlign(PriorityLevel[0].Spr, i, "center");
    //        mSpreadBook.ActiveSheet.SetTextColor(PriorityLevel[0].Spr, i, "#290001");
    //        mSpreadBook.ActiveSheet.SetBold(PriorityLevel[0].Spr, i, "Bold");
    //    } else if (mSpreadBook.ActiveSheet.GetValue(PriorityLevel[0].Spr, i) == 'P2') {
    //        mSpreadBook.ActiveSheet.SetBackground(PriorityLevel[0].Spr, i, "#F79540")
    //        mSpreadBook.ActiveSheet.SetTextAlign(PriorityLevel[0].Spr, i, "center");
    //        mSpreadBook.ActiveSheet.SetTextColor(PriorityLevel[0].Spr, i, "#290001");
    //        mSpreadBook.ActiveSheet.SetBold(PriorityLevel[0].Spr, i, "Bold");
    //    } else if (mSpreadBook.ActiveSheet.GetValue(PriorityLevel[0].Spr, i) == 'P1') {
    //        mSpreadBook.ActiveSheet.SetBackground(PriorityLevel[0].Spr, i, "#90AACB")
    //        mSpreadBook.ActiveSheet.SetTextAlign(PriorityLevel[0].Spr, i, "center");
    //        mSpreadBook.ActiveSheet.SetTextColor(PriorityLevel[0].Spr, i, "#290001");
    //        mSpreadBook.ActiveSheet.SetBold(PriorityLevel[0].Spr, i, "Bold");
    //    }

    //    if (mSpreadBook.ActiveSheet.GetValue(Status[0].Spr, i) == 2) {
    //        mSpreadBook.ActiveSheet.SetBackground(Status[0].Spr, i, "#ffffbb");
    //    } else if (mSpreadBook.ActiveSheet.GetValue(Status[0].Spr, i) == 1) {
    //        mSpreadBook.ActiveSheet.SetBackground(Status[0].Spr, i, "#a6edb2");
    //    } else if (mSpreadBook.ActiveSheet.GetValue(Status[0].Spr, i) == 3) {
    //        mSpreadBook.ActiveSheet.SetBackground(Status[0].Spr, i, "#ffd4d4")
    //    } else if (mSpreadBook.ActiveSheet.GetValue(Status[0].Spr, i) == 4) {
    //        mSpreadBook.ActiveSheet.SetBackground(Status[0].Spr, i, "#cdcdcd")
    //    }

    //}
    mSpreadBook.ActiveSheet.FreezeRow = 3;
    
    mSpreadBook.ActiveSheet.RenderStatus = true;
    cuz_dateformatret();
}

function p8Spread_DblClick(canvasID, row, col) {


    if (canvasID == "mSpread") {

        var idname = '';
        for (i = 0; i <= _SPR.length - 1; i++) {
            _SPR[i].fieldproperties
            var lookup = JSON.parse(_SPR[i].fieldproperties)
            if (lookup.objecttype == 'lookup') {
                idname = 'lug' + _SPR[i].varname
                if (col == _SPR[i].Spr) {
                   
                    lookUpCustomize(idname, 1);
                        return false;
                    }


            } else {
                idname = '';
            }

        }
        cuz_dateformatret();
        
    }

}

function p8Spread_Change(canvasID, row, col) {

    var Tag = $.grep(_SPR, function (n, i) {
            return n.varname === 'Tag';
     });
     var TagColEvent = JSON.parse(Tag[0].ColEvent);
        eval(TagColEvent.vcode);

    if (canvasID == "mSpread") {
        cuz_dateformatret();
 ChangeStatusColor(mSpreadBook.ActiveSheet.GetSelectedIndexes().row);

    }
   
}




function func_RemarksSavings(mbook, content) {

    nwParameter_Add('content', content);
    nwParameter_Add('content', ItemID);

    func_ActionDriven("saveremarks", false);

}
$(document).on("click", "#addrow", function () {

    mSpreadBook.ActiveSheet.RowAdd();
});

$(document).on("click", "#filter", function () {

    $("#nwgFilterCon").addClass("show");
    $("#nwgFilterCon").show();
    nwPopupForm_ShowModal("nwgFilterCon");
});

$(document).on("click", "#btnnwgRemarksSave", function () {


    var html = $("#cmsnwgRemarks .nwCMSContent").html();
    nwParameter_Add('html', html);
    nwParameter_Add('ItemID', ItemID);
    nwLoading_Start("actSaveScreenShot", crLoadingHTML);
    func_ActionDriven("actSaveScreenShot", false);
});



//$(document).on("click", ".nw-htr-i-btn.close", function () {
//    $(".nw-htr-container").removeClass("show");
//    $(".nw-htr-box").removeClass("fullscreen");
//});


//$(document).on("click", "#btnnwgRemarks", function () {
//    $(".nw-htr-container").removeClass("show");
//    $(".nw-htr-box").removeClass("fullscreen");
//    nwParameter_Add('ScreenshotRemarks', $('.nwCMSContent').html());
//    func_ActionDriven("saveremarks", false);
//});

//filter 
$(function () {
    $("#settingstabs").tabs();
});

$(function () {
    $("#settingstabs1").tabs();
});

$(function () {
    $("#settingstabs2").tabs();
});




//// Addtolist codes #4
$(document).on("click", ".btnGetlookup", function () {
    crnwTableCon = null; // if grid is click 
    var xtype = $(this).attr("nwtype");
    var selectedInput = xtype;
    GetAddtoListFilters();
    lookUpCustomize(selectedInput, 2);
    return false;
});

$(document).on("click", ".btnClearList", function () {
    crnwTableCon = null; // if grid is click 
    var xtype = $(this).attr("nwtype");
    $('div.atlContainer[nwtype=' + xtype + ']').find(".innertext").html("");
});
//$(document).on('click', 'span.classx', function () {
//    $(this).closest('div.spantext').remove();
//});

//function getloadfilter() {
//    var count = $('.atl_Project .spantext').length
//    crnwTable = $("#nwGridMainCon .tblGridBody");
//    var allloc = "";
//    for (var i = 0; i <= count; i++) {
//        var loc = $('.atl_Project .spantext:eq(' + i + ')').text().substring(0, $('.spantext:eq(' + i + ')').text().length - 1);

//        if (loc.length > 0) {
//            allloc += loc + ";";
//        }
//    }
//    allloc = allloc.substring(0, allloc.length - 1)
//    if (allloc.length == 0) {
//        allloc = "All Locations";
//    }
//    crnwTable.find("tr:eq(4)").find('td:eq(1) ').text('LOCATION NAME: ' + allloc);
//}

//// Addtolist codes #2
function GenerateLookupListDataHTML(xvalue, xdisplay) {
    return '<div class="spantext" nwcode="' + xvalue + '" >' + xdisplay + '<span class="classx">x</span></div>';
};

function GenerateLookupListDataHTML(xvalue, xdisplay) {
    return '<div class="spantext" nwcode="' + xvalue + '" style="display:inline-block;margin-right: 3px;margin-bottom: 3px;">' + xdisplay + '<span class="classx">x</span></div>';
};

//$(document).on('click', 'span.classx', function () {
//    $(this).closest('div.spantext').remove();
//});

function nwGrid_AddtoListDoneCustom(verID, addtoListTableRec, index) {
    //var value = "<option value='" + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + "'>" + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + "</option>"

    //$('#cmbluglocacc').append(value)
    var xChecked = "";
    var xvalue = "";
    var xdisplay = "";
    xChecked = addtoListTableRec.find('tr:eq(' + index + ')').find('input[type="checkbox"]').prop('checked');
    xvalue = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
    xdisplay = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

    if ($('div.atlContainer[nwtype="' + verID + '"]').find('div.spantext[nwcode="' + xvalue + '"]').length < 1) {
        if (xChecked == true) {

            $('div.atlContainer[nwtype="' + verID + '"] div.innertext').append(GenerateLookupListDataHTML(xvalue, xdisplay));
        }

    }
}

function GetAddtoListFilters() {
    var len = $('div.atlContainer').length;
    for (var i = 0; i < len; i++) {
        var xkey = $('div.atlContainer:eq(' + i + ')').attr('nwtype');
        var xvalue = "";
        var lencode = $('.atlContainer:eq(' + i + ')').find('div.spantext').length;
        for (var j = 0; j < lencode; j++) {
            if (xvalue != "") xvalue += "|";
            xvalue += $('.atlContainer:eq(' + i + ') div.spantext:eq(' + j + ')').attr('nwcode');
        }
        nwParameter_Add(xkey, xvalue);
    }
};


function cuz_GetDesription(t_name, code) {
    var len = jsonDescription[t_name].length;
    for (var i = 0; i < len; i++) {
        if (jsonDescription[t_name][i].code == code)
            return jsonDescription[t_name][i].description;
    }
    return code;
};

//function cuz_GetUserDesc(r_name,code) {
//    var len = jsonRecuserDesc[r_name].length;
//    for (var i = 0; i < len; i++) {
//        if (jsonRecuserDesc[r_name][i].code == code)
//            return jsonRecuserDesc[r_name][i].description;
//    }
//    return code;
//};

function cuz_GetUserDesc(code) {


    if (jsonRecuserDesc[0].code == code)
        return jsonRecuserDesc[0].description;

    return code;
}



function parseTime(s) {
    var part = s.match(/(\d+):(\d+)(?: )?(am|pm)?/i);
    var hh = parseInt(part[1], 10);
    var mm = parseInt(part[2], 10);
    var ap = part[3] ? part[3].toUpperCase() : null;
    if (ap === "AM") {
        if (hh == 12) {
            hh = 0;
        }
    }
    if (ap === "PM") {
        if (hh != 12) {
            hh += 12;
        }
    }
    return { hh: hh, mm: mm };
}


$(document).on("focus", ".txtStartTime , .txtEndTime", function () {
    _timeOld = $(this).val();
});



$(document).on('click', '#export', function () {
    GetAddtoListFilters();
    cust_GetPara();
    func_ActionDriven("actExport", false);
    nwLoading_Start("actExport", crLoadingHTML);
});



$(document).on("click", "#download", function () {
    window.location = '/RND/DocumentEntry/NOAHIssueLogs/IssueLog.xlsx';

    return false;
});


let $btn = "";
$(document).on("click", '#upload', function () {
    $btn = "upload";
    $("#fileCon").val("");
    $("#status").find("span").text("");
   $(".progress").find("div.percent").text("0%");
    $(".progress").find("div.bar").css("width", "0%");

    nwPopupForm_ShowModal("nwUploadCon");
    //func_ActionDriven("actRefreshSID", false);
    //return false;
});


$(document).on("click", '#uploadScreenshot', function () {
    $btn = "uploadScreenshot";
    $("#fileCon").val("");
    $("#status").find("span").text("");
    $(".progress").find("div.percent").text("0%");
    $(".progress").find("div.bar").css("width", "0%");

    nwPopupForm_ShowModal("nwUploadCon");
    //func_ActionDriven("actRefreshSID", false);
    //return false;
});


