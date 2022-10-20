
var parentMainCrComp = "";
var parentMainCrMod = "";

function parentMain_func_SelectApp(ver) {

    var appID = ver.id; appID = appID.replace("noahwebApp-", "");
    parentMainCrMod=appID;
    var xtitle = $(ver).find(".toolBar-menu-sub-label").text();
    $("#explorerMenuItemsHeaderButton .etitle").text(xtitle);
    $("ul#emiMain").html("<div id='menuaag_nwloader' style=\"text-align:center;\">Loading..</div>");

   
    
    noahwebDataString = $('body').serializeArray();
    noahwebDataString.push({ name: 'mod', value: '1' });
    noahwebDataString.push({ name: 'AppID', value: appID });
    
     noahwebDataString.push({ name: 'AppUD', value: nwMainUser });

    if (parentMainCrComp != "" && parentMainCrComp != undefined)
        noahwebDataString.push({ name: 'CompID', value: parentMainCrComp }); 
    else if (nwMainComp != "" && nwMainComp != undefined)
        noahwebDataString.push({ name: 'CompID', value: nwMainComp });
    
    noahweb_func_PostManager('noahweb_MenuCreator', noahwebDataString);

   
}