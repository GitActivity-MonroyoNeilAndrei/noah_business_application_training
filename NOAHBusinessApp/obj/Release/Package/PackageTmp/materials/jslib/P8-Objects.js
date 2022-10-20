/*
This file are only limited to Promptus8 and Noah Web Application only
under company: Forecasting and Planning Technologies Inc.
Developer: Angelo Carlo A. Gonzales

Date Modification Created : Jan 20 2019   
Date Modified : March 3, 2019 / 05:10 PM  - before: 01-20-2019 
Version: P8-Objects Library 1.0.2    

Illeggal used are Prohibited
Modification of this Library is Prohibited.
*/


/// P8.ImageMap P8_ImageMap P8 ImageMap
var P8 = P8 || {};
var P8_ImageMapList = [];
P8.ImageMap = function (ID, width, image, data) {
    //this.Destroy();

    var isExist = false;
    for (var i = 0; i < P8_ImageMapList.length; i++) {
        if (P8_ImageMapList[i].object.ID == ID) isExist = true;
    }
    if (isExist) return;

    var $iframe = $('#' + ID);
   
    if (width == undefined) width = 800;
    if (image == undefined) image = "";
    if (data == undefined) data = [];

    this.Me = $iframe;
    this.ID = ID;
    this.width = width;
    this.image = image;

    this.obj = $iframe.contents();
    this.Data = data;
    this.pin = [];

    this.zoom = 1;
    this.viewMode = "edit";
    this.selectedCode = "";
    this.selectedID = "";

    //$iframe.ready(function () {
        //$iframe.contents().find("body").html("");
       // $iframe.contents().find("body").html("<script type='text/javascript' src='../../../materials/jslib/jquery-1.9.1.js'></script><script type='text/javascript' src='../../../materials/jslib/jquery-ui-1.10.3.custom.js'></script><script type='text/javascript' src='../../../materials/jslib/jquery-ui-1.10.3.custom.min.js'></script><script type='text/javascript' src='P8ImageMap.js'></script><link href='../../../materials/css/custom-theme/jquery-ui-1.10.3.custom.css' rel='stylesheet'/>");
        $iframe.contents().find("html").attr("xmlns", "http://www.w3.org/1999/xhtml");

        // $iframe.contents().find("body").html("<script language='javascript' >function dragElement(elmnt) { var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0; if (document.getElementById(elmnt.id + 'header')) { document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown; } else { elmnt.onmousedown = dragMouseDown; } function dragMouseDown(e) { e = e || window.event; e.preventDefault(); pos3 = e.clientX; pos4 = e.clientY; document.onmouseup = closeDragElement; document.onmousemove = elementDrag; } function elementDrag(e) { e = e || window.event; e.preventDefault(); pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY; pos3 = e.clientX; pos4 = e.clientY; elmnt.style.top = (elmnt.offsetTop - pos2) + 'px'; elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px'; } function closeDragElement() { document.onmouseup = null; document.onmousemove = null; } }</script>");
        var str = "btn_text";
        $iframe.contents().find("body").append("<button style='display:none;' pxid=\"\" elemID=\"btn_text\" id='btx' onclick='function dragElement() { var elmntID =  document.getElementById(\"btx\").getAttribute(\"elemid\");var elmnt = document.getElementById(elmntID); var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0; if (document.getElementById(elmntID +\"header\")) { document.getElementById(elmntID +\"header\").onmousedown = dragMouseDown; } else { elmnt.onmousedown = dragMouseDown; } function dragMouseDown(e) { if( document.getElementById(\"viewMode\").getAttribute(\"viewMode\") ==\"view\") return;  e = e || window.event; e.preventDefault(); pos3 = e.clientX; pos4 = e.clientY; document.onmouseup = closeDragElement; document.onmousemove = elementDrag; } function elementDrag(e) { e = e || window.event; e.preventDefault(); pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY; pos3 = e.clientX; pos4 = e.clientY; elmnt.style.marginTop  = (elmnt.offsetTop - pos2) + \"px\";document.title=\"drag\"; console.log(elmnt.id +  \" - \" +  elmnt.offsetLeft +\"-\"+ (pos1) + \" @@@ \"  + (elmnt.offsetLeft * 1.01) +\"-\"+ (pos1)) ; elmnt.style.marginLeft = (elmnt.offsetLeft - (pos1)) + \"px\"; window.parent.P8_ImageMap(\"" + ID + "\" , \"drag\",document.getElementById(elmnt.id)) } function closeDragElement() { document.onmouseup = null; document.onmousemove = null;document.title=\"\"; } } dragElement(); return false;'>add</button>");
        //$iframe.contents().find("body").append("<button style='display:none;' pxid=\"\" elemID=\"btn_text\" id='btx' onclick='return false;'>add</button>");

        
        //$iframe.contents().find("head").append("<style></style>");
        $iframe.contents().find("head").append("<style>img#data {position:absolute} #btx{position:fixed; top:0px;} .header{height: 100%;}.pin{left: 0px !important;top: 0px !important; color: #ffffff;text-shadow: 0px 1px 8px #000000;;font-size: 12px;font-family: verdana;resize: both;overflow: hidden;border: 1px solid grey;cursor:pointer;position:absolute;width:100px; height:100px;  background-color:rgba(255,255,255,0.25);} body {overflow: scroll;background-color:black;margin-top:-8px;margin-left:-8px; } * {-webkit-touch-callout: none;-webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none;-ms-user-select: none;user-select: none; }</style>");
        $iframe.contents().find("head").append("<style>.header {text-indent: 11px;}.pin input{position: absolute;left: 0;}.chk{position: absolute;left: 0;}.p8selected{background: #0d90cc40;border-color: #ffbc00;} div#mapCointainer {position: absolute;top: 0px;left: 0px;}.pin{display: table-row;text-align: center;} .header {vertical-align: middle;display: table;width:100%; } div#btnzoom span{background-color: white;padding: 2px;border: 1px solid #caedff;} div#btnzoom span, div#btnzoom button {margin-left: 3px;}div#btnzoom span#zoomtext{display:none} div#btnzoom{position: fixed;top: 10px;right: 10px;}div#btnmenu{position: fixed;top: 10px;left: 10px;}</style>");
        
        $iframe.contents().find("head").append("<style>body{-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}</style>");
        $iframe.contents().find("head").append("<style>.p8hide {color: transparent;border-color: transparent !important;background-image: none !important;background: none } .container input { position: absolute; opacity: 0; cursor: pointer; height: 0; width: 0; } .checkmark { position: absolute; top: 0; left: 0; height: 15px; width: 15px; background-color: #eeeeee76; } .container:hover input ~ .checkmark { background-color: #ccc; } .container input:checked ~ .checkmark { background-color: #0060ac; } .container input:checked ~ .checkmark:after { display: block; } .container .checkmark:after { content: \"\"; position: absolute; display: none; left: 5px; top: 2px; width: 3px; height: 7px; border: solid white; border-width: 0 2px 2px 0; -webkit-transform: rotate(45deg); -ms-transform: rotate(45deg); transform: rotate(45deg); }</style>");

        //$iframe.contents().find("head").append("<style>$ant-gradient-h: linear-gradient(90deg, rgba(255, 255, 255, .6) 50%, rgba(0, 0, 0, .6) 50%);$ant-gradient-v: linear-gradient(180deg, rgba(255, 255, 255, .6) 50%, rgba(0, 0, 0, .6) 50%); .p8selected {animation: marqueeAnimate 12s linear infinite;background-image: $ant-gradient-h, $ant-gradient-v, $ant-gradient-v, $ant-gradient-h;background-position: top, left, right, bottom;background-repeat: repeat-x, repeat-y, repeat-y, repeat-x;background-size: 10px 2px, 2px 10px, 2px 10px, 10px 2px;cursor: move;width: 150px;height: 150px;margin-left: ((150px / 2) * -1);position: absolute;top: 10px;right: 50%;left: 50%;}@keyframes marqueeAnimate {0% {background-position: 0 0, 0 0, 100% 0, 0 100%;}100% {background-position: 100% 0, 0 -100%, 100% 100%, -100% 100%;}}</style>");


        $iframe.contents().find("body").append('<div id="mapCointainer"><img style="-moz-user-select: none;" onerror="this.style.display=\'none\';" id="data" draggable="false" src="' + image + '" /></div>');
        $iframe.contents().find("body").append('<div id="mapCointainerTemplate"></div>');

        $iframe.contents().find("body").find("img").css("width", width);
        $iframe.contents().find("#mapCointainer").css("zoom", 1);

        $iframe.contents().find("body").append('<span id=\"viewMode\" viewMode=\"' + this.viewMode + '\" style=\"display:none;\"></span>');
        

        setTimeout(function () {
            $iframe.contents().find("#mapCointainerTemplate").css("width", $iframe.contents().find("img#data").outerWidth());
            $iframe.contents().find("#mapCointainerTemplate").css("height", $iframe.contents().find("img#data").outerHeight());
        },1000);
        //zoom button
        $iframe.contents().find("body").append("<div id='btnzoom'><span id='zoomtext'>1</span><span id='zoomperc'>100%</span><button id='btnzoomin' onclick='window.parent.P8_ImageMap(\"" + ID + "\" , \"zoomin\",this); return false;'>+</button><button id='btnzoomout' onclick='window.parent.P8_ImageMap(\"" + ID + "\" , \"zoomout\",this);  return false;'>-</button></div>");
        $iframe.contents().find("body").append("<div id='btnmenu'><button id='btnhideshow' onclick='window.parent.P8_ImageMap(\"" + ID + "\" , \"hideshow\",this); return false;'>hide</button></div>");


        makeUnselectable($iframe.contents().find("body").find("img"));
        // $iframe.contents().find("body").append("<script type='text/javascript' >function makedrag(code) { $('#btn_' + code).draggable(); }</script>");
    //});

  
 


    var clicked = false, clickY, clickX;
    $(this.obj).on({
        'mousemove': function (e) {
            //console.log("title:" + this.title);
            if (this.title == "drag" ) return true;
            clicked && updateScrollPos(e, this);
        },
        'mousedown': function (e) {

            clicked = true;
            clickY = e.pageY;
            clickX = e.pageX;
        },
        'mouseup': function () {
            clicked = false;
            $(this).find('html').css('cursor', 'auto');
        }
    });

    $(this.obj).on( 'mouseover', ".pin", function (e) {
            //this.title = "hover";
        clicked = false;
    }).on('mouseout', ".pin", function (e) {
        clicked = false;
        setTimeout(function () {
            
        }, 200);
    });

    var updateScrollPos = function (e, ver) {
        if (clicked == false) return;
        $(ver).find('html').css('cursor', 'crosshair');
        $(ver).scrollTop($(ver).scrollTop() + (clickY - e.pageY));
        $(ver).scrollLeft($(ver).scrollLeft() + (clickX - e.pageX));
    }

    if (!isExist) {
        P8_ImageMapList.push({object:this});
    }
}
P8.ImageMap.prototype.SetViewMode= function (value) {
    $(this.obj).find("span#viewMode").attr("viewMode", value);
    if (value == "view") {
        $(this.obj).find("body").append("<style>.pin{resize:none;}</style>");
    }
    else $(this.obj).find("body").append("<style>.pin{resize:both;}</style>");
};
P8.ImageMap.prototype.SetImage = function (img, width) {
    $(this.obj).find("img#data").attr("src", img);
    if (width == undefined) width = 800;
    $(this.obj).find("img#data").css("width", width);
    $(this.obj).find("img#data").show();

};

P8.ImageMap.prototype.Destroy = function () {
    for (var i = 0; i < P8_ImageMapList.length; i++) {
        if (P8_ImageMapList[i].object.ID == this.ID) {
            nwJsonDelete(P8_ImageMapList, i);
            //json.splice(rowIndex, 1);
            break;
        }
    }
    $(this.Me)[0].contentWindow.location.reload();
    //this = null;
    this.image = "";
    this.Data = [];
    this.pin = [];

    sleep(1000);
    //setTimeout(function () { imageMap = new P8.ImageMap("unitMap", 1000, ""); }, 1000);
};

P8.ImageMap.prototype.PinExists = function (code) {
    var varcode = "btn_" + code;
    varcode = P8_ImageMap_CodeConvert(varcode);

    if (this.obj.find("#" + varcode).html() != undefined) {
        return true;
    }
    return false;
};
P8.ImageMap.prototype.DeletePin = function (code) {

    var varcode = "btn_" + code;
    varcode = P8_ImageMap_CodeConvert(varcode);


var xindex = nwJsonSearchIndex(this.Data, "id", varcode, true);
if (xindex >= 0) {
    nwJsonDelete(this.Data, xindex);
    this.obj.find("#" + varcode).remove();
}
};

P8.ImageMap.prototype.EditPin = function (code, description, tooltip, x, y, w, h, selected) {
    if (code == "" || code == undefined) {
        console.error("P8.ImageMap: code is required");
        return;
    }

    var varcode = "btn_" + code;
    varcode = P8_ImageMap_CodeConvert(varcode);

    if (this.obj.find("#" + varcode).html() == undefined) {
        console.error("P8.ImageMap: pin [" + code + "] is not exist");
        return;
    }



    if (selected == undefined) selected = false;
    if (selected == "1" || (selected + "").toLowerCase() == "true" || (selected + "").toLowerCase() == "on")
        selected = true;

    var varcoderan = varcode;
    //this.obj.find("#mapCointainer").append("<div onclick='window.parent.P8_ImageMap(\"" + this.ID + "\" , \"item_click\",this)' class='pin' code='" + code + "' id='" + varcode + "' title='" + tooltip.replaceAll("'", "\'") + "''><label class='container'><input type='checkbox' " + (selected == true ? "checked" : "") + " class='chbox'  /><span class='checkmark'></span></label><div id='btn_" + code + "header' class='header' onclick='window.parent.P8_ImageMap(\"" + this.ID + "\" , \"item_headerclick\",this)' >" + description + "</div></div>");

    //this.Data.push({
    //    id: varcode,
    //    code: code,
    //    description: description,
    //    tooltip: tooltip,
    //    x: x, y: y, width: w, height: h
    //    , selected: selected
    //});

    var xindex = nwJsonSearchIndex(this.Data, "id", varcode, true);
    if (xindex >= 0) {
        //nwJsonReplaceValue(unitinto, xindex, "code", code);
        nwJsonReplaceValue(this.Data, xindex, "description", description);
        nwJsonReplaceValue(this.Data, xindex, "tooltip", tooltip);
        nwJsonReplaceValue(this.Data, xindex, "x", x);
        nwJsonReplaceValue(this.Data, xindex, "y", y);
        nwJsonReplaceValue(this.Data, xindex, "width", w);
        nwJsonReplaceValue(this.Data, xindex, "height", h);
        nwJsonReplaceValue(this.Data, xindex, "selected", selected);
    }


    try {

        this.obj.find("#" + varcode).css({ marginLeft: x + "px", marginTop: y + "px", width: w + "px", height: h + "px" });
        this.obj.find("#" + varcode).attr("title", tooltip);
        this.obj.find("#" + varcode).find(".header").html(description);
        this.obj.find("#" + varcode).find(".chbox").prop("checked", selected);

        //this.obj.find("#btx").attr("elemID", varcode);
        //this.obj.find("#btx").click();
        // $('#' + this.ID)[0].makedrag("btn_" + code);

        //this.pin.push($("#" + varcode));
    } catch (err) { }


};

P8.ImageMap.prototype.AddPin = function (code, description, tooltip, x, y, w, h, selected,enable,_class) {
    if (code == "" || code == undefined) {
        console.error("P8.ImageMap: code is required");
        return;
    }

    var varcode = "btn_" + code;
    varcode = P8_ImageMap_CodeConvert(varcode);


    if (this.obj.find("#" + varcode).html() != undefined) {
        console.error("P8.ImageMap: pin [" + code + "] is already exist");
        return;
    }

    if (enable == undefined) enable = "true";
    else enable = enable + "";
    if (_class == undefined) _class = "";



    if (selected == undefined) selected = false;
    if (selected == "1" || (selected + "").toLowerCase() == "true" || (selected + "").toLowerCase() == "on")
        selected = true;

    var varcoderan = varcode;
    this.obj.find("#mapCointainer").append("<div onclick='window.parent.P8_ImageMap(\"" + this.ID + "\" , \"item_click\",this)' class='pin " + _class + "' code='" + code + "' id='" + varcode + "' title='" + tooltip.replaceAll("'", "\'") + "''><label class='container'><input " + (enable == "true" ? "" : "disabled") + " type='checkbox' " + (selected == true ? "checked" : "") + " class='chbox'  /><span class='checkmark'></span></label><div id='btn_" + code + "header' class='header' onclick='window.parent.P8_ImageMap(\"" + this.ID + "\" , \"item_headerclick\",this)' >" + description + "</div></div>");

    this.Data.push({
        id: varcode,
        code: code,
        description: description,
        tooltip: tooltip,
        x: x, y: y, width: w, height: h
        , selected: selected
        , enable: enable
        , _class: _class
    });

    try {
        this.obj.find("#" + varcode).css({ marginLeft: x + "px", marginTop: y + "px", width: w + "px", height: h + "px" });
        this.obj.find("#btx").attr("elemID", varcode);
        this.obj.find("#btx").click();
        // $('#' + this.ID)[0].makedrag("btn_" + code);

        this.pin.push($("#" + varcode));
    } catch (err) { }


};




// internal function
var makeUnselectable = function ($target) {
    $target
        .addClass('unselectable') // All these attributes are inheritable
        .attr('unselectable', 'on') // For IE9 - This property is not inherited, needs to be placed onto everything
        .attr('draggable', 'false') // For moz and webkit, although Firefox 16 ignores this when -moz-user-select: none; is set, it's like these properties are mutually exclusive, seems to be a bug.
        .on('dragstart', function () { return false; });  // Needed since Firefox 16 seems to ingore the 'draggable' attribute we just applied above when '-moz-user-select: none' is applied to the CSS 

    $target // Apply non-inheritable properties to the child elements
        .find('*')
        .attr('draggable', 'false')
        .attr('unselectable', 'on');
};

//function dragElement() {
//    var elmntID = document.getElementById("btx").getAttribute("elemid");
//    var elmnt = document.getElementById(elmntID);
//    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//    if (document.getElementById(elmntID + "header"))
//    { document.getElementById(elmntID + "header").onmousedown = dragMouseDown; }
//    else { elmnt.onmousedown = dragMouseDown; }
//    function dragMouseDown(e) {
//        e = e || window.event;
//        e.preventDefault(); pos3 = e.clientX;
//        pos4 = e.clientY;
//        document.onmouseup = closeDragElement;
//        document.onmousemove = elementDrag;
//    } function elementDrag(e)
//    {
//        e = e || window.event; e.preventDefault();
//        pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY;
//        pos3 = e.clientX; pos4 = e.clientY;
//        elmnt.style.marginTop = (elmnt.offsetTop - pos2) + "px";
//        console.log(elmnt.offsetLeft + "-" + (pos1) + " @@@ " + (elmnt.offsetLeft * 1.01) + "-" + (pos1));
//        elmnt.style.marginLeft = (elmnt.offsetLeft - (pos1)) + "px";
//    } function closeDragElement() {
//        document.onmouseup = null;
//        document.onmousemove = null;
//    }
//} dragElement();




function P8_ImageMapGet(ID) {
    for (var i = 0; i < P8_ImageMapList.length; i++) {
        if (P8_ImageMapList[i].object.ID == ID)
            return P8_ImageMapList[i].object;
    }
    return null;
}

P8.ImageMap.prototype.setImage = function (src) {
    this.image = src;
    this.obj.find("#data").attr("src", src);
    this.obj.find("#data").show();
}


P8.ImageMap.prototype.p8Click = function (itemobj) {

    var isContinue = true;
    try {
        isContinue=func_P8ImageMap_PinClick(itemobj);
    } catch (err) { }
    if (isContinue == undefined) isContinue = true;

    if (isContinue) {
        this.obj.find(".p8selected").removeClass("p8selected");
        if ($(itemobj).hasClass("p8selected")) {
            $(itemobj).removeClass("p8selected");

        }
        else $(itemobj).addClass("p8selected");
    }

    // alert($(itemobj).html());
}


// inner iframe function called
function P8_ImageMap(ID, func, itemobj) {
    var _p8img = P8_ImageMapGet(ID);
    if (func.indexOf("_click") > 0) {
        _p8img.p8Click(itemobj);
        try {

          
            
            var vali = $(itemobj).find(".chbox").prop("checked");
            var id = $(itemobj).attr("id");

            _p8img.selectedID = id;
            _p8img.selectedCode = id.replace("btn_","");
            
            var xindex = nwJsonSearchIndex(_p8img.Data, "id", id, true);
            nwJsonReplaceValue(_p8img.Data, xindex, "selected", vali);

        } catch (err) { }
      
    }
    else if (func.indexOf("zoomin") == 0 || func.indexOf("zoomout") == 0) {
        var zoom = _p8img.zoom;
        if (func.indexOf("zoomin"))
            zoom = zoom - 0.1;
        else 
            zoom = zoom + 0.1;

        _p8img.obj.find("#mapCointainer").css("zoom", zoom);
        _p8img.obj.find("#mapCointainer").css("-moz-transform", "scale(" + zoom + ")");
 
        _p8img.obj.find("#zoomtext").text(zoom);
        _p8img.obj.find("#zoomperc").text(parseInt(zoom * 100) + "%");
        _p8img.zoom = zoom;

        for (var i; i < _p8img.Data.length; i++) {
            var xid = _p8img.obj.find("#btx").attr("pxid", obj.Data[i].id);
            _p8img.obj.find("#btx").click();

        }

    }
    else if(func =="item_headerclick")
    {
        if ($(itemobj).parent().find("input.chbox").prop("disabled") == true) {
            return;
        }
        var xval = $(itemobj).parent().find("input.chbox").prop("checked");
        $(itemobj).parent().find("input.chbox").prop("checked", !xval);
    }
    else if (func == "drag") {

        var id = $(itemobj).attr("id");
        var varx = $(itemobj).css("margin-left");
        var vary = $(itemobj).css("margin-top");
        var varwidth = $(itemobj).css("width");
        var varheight = $(itemobj).css("height");
       
        varx = parseInt(varx.replace("px", ""));
        vary = parseInt(vary.replace("px", ""));
        varwidth = parseInt(varwidth.replace("px", ""));
        varheight = parseInt(varheight.replace("px", ""));

        var xindex = nwJsonSearchIndex(_p8img.Data, "id", id, true);
        nwJsonReplaceValue(_p8img.Data, xindex, "x", varx);
        nwJsonReplaceValue(_p8img.Data, xindex, "y", vary);
        nwJsonReplaceValue(_p8img.Data, xindex, "width", varwidth);
        nwJsonReplaceValue(_p8img.Data, xindex, "height", varheight);
    }
    else if (func == "hideshow") {
        var xvalue = $(itemobj).attr("visibility");
        if (xvalue == "hide") {
            xvalue = "show";
            $(itemobj).parents("body").find(".pin").removeClass("p8hide");
            $(itemobj).text("hide");
        }
        else {
            xvalue = "hide";
            $(itemobj).parents("body").find(".pin").addClass("p8hide");
            $(itemobj).text("show");
        }

        
        $(itemobj).attr("visibility", xvalue);
    }
    

}


function P8_ImageMap_CodeConvert(varcode) {
    try {
        varcode = varcode.replaceAll("/", "p8Slash").replaceAll("\\", "p8BackSlash");
    } catch (err) { }
    return varcode;
}

// subfunctions 
function P8_ImageMap_zindex(objID) {

}