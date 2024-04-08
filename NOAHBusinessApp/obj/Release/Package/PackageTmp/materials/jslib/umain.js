
var jsonMainData = [];

function nk_GetUInfo()
{
    var umod = "";
    for (var i = 0; i < jsonMainData.UModules.length; i++) {
        umod += "<div cid='" + jsonMainData.UModules[i]["AppID"] + "' cabv='" + jsonMainData.UModules[i]["AppAbv"] + "' class='btn btn-modules'>" + jsonMainData.UModules[i]["AppName"] + "</div>";
   }
    $("#mainModList").html(umod);

    var name = jsonMainData.UInfo[0].Description;
    try{$(".spl-sys-user-c #uInfoName").text(name); }catch(err){}
    try{$("#gtFname").text(name); }catch(err){}
    try { $(".menu-user-info-c #uInfoName").text(name); } catch (err) { }
}

function nk_val(id, val) {
    try {
        $(id).val(val);
    } catch (err) { }
}


function nk_JSON_Sort(_json, prop, asc) {
    if (asc == undefined) asc = true;
    _json.sort(function (a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
    return _json;
}
function nk_JSON_New(_json) {
    return JSON.parse(JSON.stringify(_json));
}
function nk_JSON_Filter(_json, prop, value, isSensitive) {
    if (isSensitive == undefined) isSensitive = false;
    var jsonG = _json.filter(function (entry) {
        if (isSensitive == false)
            return entry[prop].toLocaleUpperCase() === value.toLocaleUpperCase();
        else 
            return entry[prop] === value;
    });
    return jsonG;
}

$(document).on("click", ".btn.btn-modules", function () {
   
    $("#menu-grp-ul").html("");
    var cid = $(this).attr("cid");
    let filterjson = nk_JSON_Filter(jsonMainData.UAccess, "ItemParentApplication", cid);
    filterjson = nk_JSON_New(filterjson);

    var strfinal = nk_MenuItemListGenerate(filterjson);
    $("#menu-grp-ul").html(strfinal);
    fnMenuGroupTreeView();
});
function nk_MenuItemListGenerate(json) {
    var strfinal = "";
    let xjson = nk_JSON_Sort(json, "ItemSort", true);
    if (json.length >= 1) {
        var ItemParentItem = "root";
        strfinal = nk_MenuItemListGenerateSUB(json,ItemParentItem);
    }

    return strfinal;
}

function nk_MenuItemListGenerateSUB(json, ItemParentItem) {
    let strfinal = "";
   
    let xjson = nk_JSON_New(json);
    let filterjson = nk_JSON_Filter(xjson, "ItemParentItem", ItemParentItem);
    filterjson = nk_JSON_Sort(filterjson, "ItemSort", true);

    strfinal += "<div class='menu-grp-ul'>";
    for (var i = 0; i < filterjson.length; i++) {
        var ItemParentItemNew = filterjson[i]["ItemID"];
        strfinal += "<div class='menu-grp-li'>";
      
        if(filterjson[i]["ItemType"].trim()=="0"){
            strfinal += "<div class='menu-grp-lbl'>" + filterjson[i]["ItemName"].trim() + "</div>";
            strfinal += nk_MenuItemListGenerateSUB(json, ItemParentItemNew);
        }
        else {
            //strfinal += " <div class='menu-grp-li'>";
            strfinal += "<div cid='" + filterjson[i]["ItemID"].trim() + "' class='menu-grp-lbl' title='" + filterjson[i]["ItemName"].trim().replaceAll("'", "\'") + "'><a href='" + filterjson[i]["link"] + "'>" + filterjson[i]["ItemName"].trim() + "</a></div>"
            //strfinal += "</div>";
        }
                                
        strfinal += "</div>";
    }
   strfinal += "</div>";
  
    return strfinal;
}