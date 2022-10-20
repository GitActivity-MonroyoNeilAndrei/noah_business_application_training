var PageTitle = "";
var nwxDefaultLinkValue = "";
var nwlink_instance = "";

function explorer_hidePane() {
    //button-hideexplorer top: 19px;left: 23px;
    var explorerWidth = 20;
    if ($("#button-hideexplorer").text() == "<<") {
        var xbuttonleft = $("#explorerMenuItemsHeaderButton .etitle").text().length;
        
        var xbuttonTop = 90;
        xbuttonleft = xbuttonleft * 0.232;
        
        xbuttonleft += 1;
        xbuttonTop = xbuttonleft + 5;
       
        
        
        $("#explorerContainer").addClass("explorerContainerMini");
        $("#explorerContainer").css("left", "-100%");
        $("#explorerContainer").css("position", "fixed");
        $("#button-hideexplorer").css("margin-top","10px");
        $("#button-hideexplorer").text(">>");
        $("#explorerMenuItemsHeaderButton .toolBar-menu-icons").css("margin-top", "30px");
        $("#explorerMenuItemsHeaderButton").css("position", "fixed");
        $("#explorerMenuItemsHeaderButton").css("left", "0px");
        $("#explorerMenuItemsHeaderButton").css("height", "100%");
       // $("#explorerMenuItemsHeaderButton").css("margin-top", "-10px");
        $("#explorerMenuItemsHeaderButton .etitle").css("transform", "rotate(90deg)");
        $("#explorerMenuItemsHeaderButton .etitle").css("-ms-transform", "rotate(90deg)"); /* IE 9 */
        $("#explorerMenuItemsHeaderButton .etitle").css("-webkit-transform", "rotate(90deg)"); /* Safari and Chrome */
        $("#explorerMenuItemsHeaderButton .etitle").css("left", "-" + xbuttonleft + "em ");
        $("#explorerMenuItemsHeaderButton .etitle").css("margin-top", xbuttonTop + "em ");
        $("#explorerMenuItemsHeaderButton .etitle").css("white-space", "nowrap");

        $("#FormsContainer").css("left", "23px");
    }
    else {
    
        $("#explorerContainer").removeClass("explorerContainerMini");
        $("#explorerContainer").css("left", "0");
        $("#explorerContainer").css("position", "relative");

        $("#button-hideexplorer").css("margin-top", "");
        $("#button-hideexplorer").text("<<");
        

        $("#explorerMenuItemsHeaderButton .toolBar-menu-icons").css("margin-top", "");
        $("#explorerMenuItemsHeaderButton").css("position", "relative");
        $("#explorerMenuItemsHeaderButton").css("left", "");
        $("#explorerMenuItemsHeaderButton").css("height", "");
       // $("#explorerMenuItemsHeaderButton").css("margin-top", "");
        $("#explorerMenuItemsHeaderButton .etitle").css("transform", "");
        $("#explorerMenuItemsHeaderButton .etitle").css("-ms-transform", ""); /* IE 9 */
        $("#explorerMenuItemsHeaderButton .etitle").css("-webkit-transform", ""); /* Safari and Chrome */
        $("#explorerMenuItemsHeaderButton .etitle").css("left", "");
        $("#explorerMenuItemsHeaderButton .etitle").css("margin-top", "");
        $("#explorerMenuItemsHeaderButton .etitle").css("white-space", "");
        $("#FormsContainer").css("left", "inherit");

        var lastwidths = $("#explorerContainer").css("width");
        lastwidths = lastwidths.replace("px", "");
        lastwidths = lastwidths.replace(" ", "");
        explorerWidth = parseFloat(lastwidth);
    }
    
        var lastwidth = $("#mainContainerContent").css("width");
            lastwidth = lastwidth.replace("px", "");
            lastwidth = lastwidth.replace(" ", "");
        var mainWidth = parseFloat(lastwidth);

        var finalWidthresize = mainWidth - explorerWidth;
        // $("#FormsContainer").css("width", finalWidthresize + "px");

        $(window).resize();

   // $("#FormsContainer").css("left", "px");
}


function explorer_treeItems(ver) {

    var parentID = ver.parentNode.parentNode.id;
    var parentIDsb = ver.parentNode.parentNode.id;
    
    //var xx = jQuery("#" + parentIDsb + " .emi-buttonCollapse").hasClass('emi-open');
    //var xx = $("#" + parentIDsb + " .emi-title:eq(0) .emi-buttonCollapse").text();
    //alert(xx);
    
    var xx = $("#" + parentIDsb + " .emi-title:eq(0) .emi-buttonCollapse").hasClass("armMinusbtn");
    //alert(xx);
   // if (xx != '+') 
    if (xx)
    {
        $("#" + parentID).css('overflow-y', 'hidden');
        $("#" + parentID).css('height', '16px');
        $("#" + parentID).css('overflow-x', 'hidden');
        $("#" + parentID + " .emi-title:eq(0) .emi-buttonCollapse").removeClass('emi-open');
        //$("#" + parentID + " .emi-title:eq(0) .emi-buttonCollapse").text('+');
         $("#" + parentID + " .emi-title:eq(0) .emi-buttonCollapse").addClass('armPlusbtn');
         $("#" + parentID + " .emi-title:eq(0) .emi-buttonCollapse").removeClass('armMinusbtn');
    }
    else {
        $("#" + parentID).css('overflow-y', 'visible');
        $("#" + parentID).css('overflow-x', 'visible');
        $("#" + parentID).css('height', 'inherit');
        $("#" + parentID + " .emi-title:eq(0) .emi-buttonCollapse").addClass('emi-open');
        //$("#" + parentID + " .emi-title:eq(0) .emi-buttonCollapse").text('-');
        $("#" + parentID + " .emi-title:eq(0) .emi-buttonCollapse").addClass('armMinusbtn');
        $("#" + parentID + " .emi-title:eq(0) .emi-buttonCollapse").removeClass('armPlusbtn');
    }
}

function explorer_treeItemsSelect(ver) {
    
    var parentID = ver.parentNode.id; 
    
    var xx = jQuery("#" + parentID + " div.emi-formtitle:eq(0)").hasClass('emi-Selected');
   //if (current_SelectedFormID != ver.parentNode.parentNode.id) {

    //}
    $(".emi-formtitle").css('background-color', ''); // alert(xx);
    $(".emi-formtitle").css('color', '');
    $(".emi-formtitle").removeClass('emi-Selected');
    
    
    if (xx) {
       // $("#" + parentID + " .emi-formtitle:eq(0)").css('background-color', '');
       // $("#" + parentID + " .emi-formtitle:eq(0)").css('color', '');
        //  $("#" + parentID + " .emi-formtitle:eq(0)").removeClass('emi-Selected');
       
    }
    else {
       
    }
    $("#" + parentID + " .emi-formtitle:eq(0)").css('background-color', 'darkblue');
    $("#" + parentID + " .emi-formtitle:eq(0)").css('color', 'white');
    $("#" + parentID + " .emi-formtitle:eq(0)").addClass('emi-Selected');
}


function explorer_ActiveForms_Button(ver) {
    //toolBar-menu-buttonsActive
    $('#activeformsContainer .afc-button').removeClass('toolBar-menu-buttonsActive');
    $(ver).addClass('toolBar-menu-buttonsActive');
    $('#activeformsContainer .parentformList').css('display','none');
    var verID = ver.id;
    if (verID == "activeformsHeaderButton") $('#activeformsList').css('display', '');
    else if (verID == "favformsHeaderButton") $('#favformsList').css('display', '');
    else if (verID == "recformsHeaderButton") $('#recformsList').css('display', '');
}

function explorer_Select_FormsHeader(ver,ver2) {

    var part;
    if (!(ver2 == null)) part = ver2; 
    else part = ver.parentNode.parentNode;
    
    //$("#" + part.id).css("width","");min-width: 100%;
    $("#" + part.id).css("min-width","100%");
    $(".ApplicationForms.affull").css("min-width","100%");
   
    if($(part).hasClass('dialog-Minimizer')==true){
        $(part).css("top",""); $(part).css("left","");
    }
    
    $(part).addClass('nwmaximize');
    $(part).removeClass('dialog-Minimizer');
    
    nwFormsMaxState = true; 

    mainParent_maximize_Form(part.id);
    mainParent_maximize_FormALL();
    explorer_Select_Forms(part);

    $('#nwHeaderTitle').html($("#" + part.id).find(".noah-webui-dialog-title").html()); //
    
}

function explorer_hide_Forms(ver) {
    var part = ver.parentNode.parentNode;
   
    mainParent_Hide_Forms(part.id);
   // explorer_Select_Forms(part);
}


function explorer_Select_FormsDown(ver) {
    //alert(current_SelectedFormID);
    if ($("#menuaag_nwloader").html() != undefined) return;

    var formIDc; formIDc = ver;
    try {
        formIDc = ver.id;
        if (formIDc == undefined || formIDc == "undefined")
            formIDc = ver;
    } catch (err) { formIDc = ver; }
    //alert(formIDc);
    explorer_Select_Forms_SetSelected(formIDc);
    
    formIDc = formIDc.replace("emi-FormsA-", "emi-");
    formIDc = formIDc.replace("emi-Form-", "emi-");
    formIDc = formIDc.replace("_rec", "");
    formIDc = formIDc.replace("_fav", "");
    
    var formID = formIDc;
    current_SelectedFormID = formIDc;
    //alert(current_SelectedFormID); 
}

function explorer_Select_Forms_SetSelected(crForm) {

    var crFormT = "";
    if (crForm !== null && typeof crForm === 'object') {
        crFormT = $(crForm).attr("id");
    }
    else {
        crFormT = crForm;
    }

    if (crFormT.indexOf("emi-FormsA") <= -1) {
        crFormT = crForm.replace("emi-Form", "emi-FormsA");
    }
    else { 
    
    }
    
    crFormT = general_GetRootID(crFormT);
    $(".emi-activeRow").removeClass("nwSelected");
    $("#recformsList .formList> .nwSelected").removeClass("nwSelected");
    
    try { $("#emi-FormsA-" + crFormT).addClass("nwSelected"); }
    catch (err) {alert(err); }
    try { $("#emi-FormsA-" + crFormT + "_rec").addClass("nwSelected"); }
    catch (err) { }
    try { $("#emi-FormsA-" + crFormT + "_fav").addClass("nwSelected"); }
    catch (err) { }
    
}


$(document).on("keyup","#menuLoadtxt",function(e){
    if(e.which == 13){
        nw_LoadMenuSearch(this);
    }
});
$(document).on('click', '#btnTopFind', function () {
    $(document).find('#menuLoad').removeClass('show');
    nw_LoadMenuSearch($("#menuLoadtxt"));
});
function nw_LoadMenuSearch(_this) {
    crLnk = "Modules_Gateway/noahweb_Gateway.aspx";
    crLnkGateKey = "aagMain";

    var xdata = $(_this).val().split("\\");;
    try {
        //nwParameter_Add("MenuItemKey", xdata[0]);

        var xbaselink = getParameterByName("nwburl")
        if (xbaselink == "") xbaselink = window.location.origin;


        nwParameter_Add("baselink", xbaselink);
        nwParameter_Add("MenuModule", xdata[0]);
        nwParameter_Add("MenuItemKey", xdata[1].split(" ")[0]);


    } catch (err) { }
    func_ActionDriven("actLoadMenu", false);
}




var explorer_Select_Forms_Menu="";
function explorer_Select_Forms(ver) {
    if ($("#menuaag_nwloader").html() != undefined) return;
    
 //$("#toolBar-maxi-Buttons").css("display", "block"); 
    if(current_SelectedWindowType > 1){
    $("#toolBar-maxi-Buttons").css("display", "none");
    }else{
    $("#toolBar-maxi-Buttons").css("display", "block");
    }
    
    var formIDc; formIDc = ver;
    try {
        if (ver !== null && typeof ver === 'object') {
            formIDc = $(ver).attr("id");
           
            var title = $(ver).children('.emi-activeRowName').text();
            
            
            if(title == ""){
            title = $(ver).children('.emi-title').children('.emi-formtitle').text();
            title +=" "+$(ver).children('.emi-info').children('.emi-infoVersion').text();
            }else {
              title +=" "+   $(ver).children('.emi-info').children('.emi-infoVersion').text();   
            }
            
            if(title == ""){
            title = $(ver).children('.toolBar-menu-sub-label').text();
            }
            if(title == ""){
            title = $(ver).find('.noah-webui-dialog-title').text()
            }
            if(title == ""){title = formIDc;}
            if(title == formIDc){title = ver.title;}
            
       
            
            
            document.title = PageTitle +' - ' + SetTitleClear(title);
            $('#nwHeaderTitle').text(SetTitleClear(title));
            $('#nwHeaderTitle').attr("title",SetTitleClear(title));
             
        } else {
            formIDc = ver.id;
        }
        if(formIDc == undefined || formIDc =="undefined")
            formIDc = ver; 
         
    } catch (err) { formIDc = ver; }
    
   
    explorer_Select_Forms_SetSelected(formIDc);
    
    //formIDc = formIDc.replace("emi-FormsA-", "emi-");
    formIDc = formIDc.replace("emi-Form-", "emi-");
    //formIDc = formIDc.replace("_rec", "");
    //formIDc = formIDc.replace("_fav", "");
    
    var formID = formIDc;
    
    current_SelectedFormID = formIDc;
    
    if(formIDc == "emi-FormsA-gen_NotiButton_rec" 
    ||  formIDc == "emi-FormsA-gen_NotiButton_fav"
    ) {
        $('#emi-gen_NotiButton').click();
        return;
    }
    
    var formTitle = $("#" + formID + ":eq(0) div.emi-formtitle").text();
    var formIcon = $("#" + formID + ":eq(0) span.emi-infoI").text();
    var formLink = $("#" + formID + ":eq(0) span.emi-infoL").text();
    var formVersion = $("#" + formID + ":eq(0) span.emi-infoVersion").text();
    var formLoc = "";
    var isLocal = false;
    var formConetent = "";
    
    var formInstance ="";
    
    if( $("#" + formID + ":eq(0) div.emi-formInstance") != undefined)formInstance = $("#" + formID + ":eq(0) span.emi-formInstance").text();
    
    try{
    if(formTitle == ""){ formTitle = ver.title;   }
    if(formIcon == ""){ formIcon = ver.icon;  } 
    if(formLink == ""){ formLink = ver.link;  }
    

    
    }catch(err){}
    
    
    try{
	if(formTitle == "") formTitle = $("#" + formID + ":eq(0) .emi-activeRowName").text();
	}catch(err){}
 
    
    $("#main_menuFormNavicator").find(".toolBar-menu-icons.aag").stop()
    .animate({ opacity: 0 }, 'fast', function() {
        $(this)
            .css({ 'background-image': 'url(' + formIcon + ')' })
            .animate({ opacity: 1 });
    });
    
    try {
        formLoc = $("#" + formID + ":eq(0) span.emi-infoLoc").text();
        if (!formLoc.replace(" ", "") == "") isLocal = true;
    }
    catch(err) {
        //alert(err);
    }
    
    //formID = formID.replace("emi-FormsA-", "emi-Form-");
    formID = formID.replace("emi-FormsA-", "emi-");
    formID = formID.replace("emi-", "emi-Form-");
    formID = formID.replace("_rec", "");
    formID = formID.replace("_fav", "");
  
    
    var str = ""; var strTempID = "";var isLoaded = false;
    var formCount = $("#FormsContainer .ApplicationForms").length;

    for (var i = 0; i < formCount; i++) {
        strTempID = $("#FormsContainer" + " .ApplicationForms:eq(" + i + ")").attr("id");

        if (strTempID == formID) { 

        isLoaded = true; break; }
    }
    
    if (isLoaded) {
       
        current_Form_zIndex += 1;
        $("#" + formID).css("z-index", current_Form_zIndex);// alert(current_Form_zIndex);
        if (current_SelectedWindowType == 1) {
            
            $("div.ApplicationForms").addClass("AFHide");
            $("#" + formID).removeClass("AFHide");
            parentMain_SetSubFormsFit();
            //$(".ApplicationFormsBlocker").css("display", "");
            $("#" + formID + " .ApplicationFormsBlocker").css("display", "none");     
        }
        else {return;}
    }
    else {
    crLnk = "Modules_Gateway/noahweb_Gateway.aspx";
    crLnkGateKey = "aagMain";
    
    nwParameter_Add("MenuItemInstance", formInstance);
    nwParameter_Add("MenuItem", formTitle);
    
    func_ActionDriven("actSaveUserActivityLog", false);
    SaveToLogs("0", formTitle, "Open");

    if(getParameterByName("nwdev")== "p8dev" ){
        if(formLink.indexOf('?')>=1) 
                formLink=formLink+"&nwdev=p8dev";
       else  
                formLink=formLink+"?nwdev=p8dev";
    }
    

    var baselinkx = window.location.origin +"/";
    if(getParameterByName("nwburl")!="")
        baselinkx = getParameterByName("nwburl") +"/";
        
    formLink = formLink.replace("#baseinstance",nwlink_instance);
    formLink = formLink.replace("#baseInstance",nwlink_instance);
    formLink = formLink.replace("#baselink",baselinkx);
    formLink = formLink.replace("#baseLink",baselinkx);
    
    
   
    
        if (isLocal) {
            var tempcontent;
            try {
                tempcontent = "<div class=\"gen_LocHolder\"></div>";
            }
            catch (err) {
               // alert(err);
            }
            formConetent = tempcontent;
      
        }
        else

            formConetent = "<iframe class=\"afcontainerIframe\" id=\"" + formID + "_xform\" src=\"" + formLink + "\"></iframe>";

        current_SelectedWindowType = 1;current_Form_zIndex += 1;
        str = "<div id=\"" + formID + "\" class=\"ApplicationForms affull\" style=\"z-index:" + current_Form_zIndex + ";height:" + nwdefault_FormHeight + "px;\">" +
		"<div class=\"ApplicationFormsHeader\" ondblclick=\"mainParentr_maximize_FormsHeader(this)\" onmousedown=\"mainParent_Select_Form(this)\">" +
		"<div class=\"noah-webui-dialog-icon\" style=\"background-image:url(" + formIcon + ")\"></div>" +
		 
         "<div class=\"noah-webui-dialog-close\" title=\"close\" onclick=\"mainParent_Close_Form_Min(this)\">X</div>" +
         "<div class=\"noah-webui-dialog-close nwfrmmaximize\" title=\"maximize\"  onclick=\"explorer_Select_FormsHeader(this)\"></div>" +
         "<div class=\"noah-webui-dialog-close nwhide\" title=\"hide\" onclick=\"explorer_Minimize_FormsHeader(this)\">-</div>" +
		 "<div class=\"noah-webui-dialog-title\">" + formTitle + " <span class=\"nwVersion\">" + formVersion + "</span></div>" +
		 "</div>" +
		 "<div class=\"afcontainer\">" +
        formConetent  +
		"<div class=\"ApplicationFormsBlocker\"></div>"+
		"</div></div>";
        current_Form_History.push(formID);
        //console.log(str);
        $("#FormsContainer").prepend(str);
        $("#" + formID).addClass('nwmaximize');
        $("#" + formID).css('left', '2');
        $("#" + formID).css('top', '2');

        
        
        $("#mainContainer").removeClass("nwHide");
        
        parentMain_SetSubFormsFit();
        explorer_Insert_ActForms(formIDc,ver);
        
        try {
            if (isLocal) {
                $("#" + formID + " .gen_LocHolder").html($("#" + formLoc));
                $("#" + formID).addClass('nwLoc');
            }
        } catch (err) { }
        
        $("#" + formID + " .ApplicationFormsBlocker").css("display", "none");
        $("#" + formID).draggable({ handle: ".ApplicationFormsHeader", scroll: false, delay: 0,
            stop: function(event, ui) {
                $(this).find(".ApplicationFormsBlocker").css("display", "none");
            }
            , start: function(event, ui) {
             $(".ApplicationFormsBlocker").css("display", "block");
            }
        });
        
        $("#" + formID + "").resizable({
            stop: function(event, ui) {
                $(".ApplicationFormsBlocker").css("display", "none");
                var formID = $(this).attr('id');
                if (!jQuery("#" + formID + " div.afcontainer").hasClass('dialogResized')) {
                    $("#" + formID + " div.afcontainer").addClass("dialogResized");
                    
                }
            }
            , start: function(event, ui) {
                if (!jQuery("#mainContainer").hasClass("nwHide"))
                    return false;
                    
                $(".ApplicationFormsBlocker").css("display", "block");
            },
                resize: function(event, ui) {
                var finalHeightresize = parseFloat($(this).outerHeight());
                var finalWidthresize = parseFloat($(this).outerWidth());

                var parID = $(this).attr("id");
                finalHeightresize = finalHeightresize - 24;
                $("#" + parID + " .afcontainer").css("height", finalHeightresize + "px");
                $("#" + parID + " .afcontainer").css("width", finalWidthresize + "px");
            }
        });
          $("#toolBar-maxi-Buttons").css("display", "block");
    }

    try {
        if (!isNext) explorer_Forms_List(formID, formTitle, formLink, formIcon);
        isNext = false;
    }
    catch (err) { }


    try {
        $(window).resize();
    }
    catch (err) { }

}

$(document).on("mousedown",".ApplicationFormsBlocker",function(){
    var varparent = $(this).parents('.ApplicationForms');
    mainParent_Select_Form(varparent.find(".ApplicationFormsHeader"));
});
//function (){

function explorer_Forms_List(formID, formTitle, formLink, formIcon) {
    //if (formLink == "undefiend") return;
    
    formID = general_GetRootID(formID);
    nwParameter_Add("nwcrForm", formID);
    nwParameter_Add("nwcrFormTitle", formTitle);
    nwParameter_Add("nwcrFormLink", formLink);
    nwParameter_Add("nwcrFormIcon", formIcon);
    func_ActionDriven("actFormRecent", false);

}
//}

function explorer_Insert_Forms(formID, formTitle, formLink, formIcon,formCon,formLoc,formVersion) {
   // if (formLink == undefined || formLink == "undefined" || formLink == "") return;
    
    
    var str = "";
    var varVersion=formVersion;
    if(varVersion == undefined) varVersion ="";
    
    var tempformLoc = "";
    var tempformID = "";
    var value = $('#emi-' + formID).children('.emi-title').children('.emi-formtitle').clone().children().remove().end().text();
    if (value != "") {
        formTitle = value;
    }  
    if (formID.indexOf('emi-Form') <= -1) formID = "emi-FormsA-" + formID;
    else formID = formID.replace("emi-Form", "emi-FormsA");
    
    if (formLoc != null && formLoc != "")
        tempformLoc = formLoc;

    if (formCon != "" && formCon != "act") formID = formID + "_" + formCon;


    var style = "";

    if (formIcon == undefined || formIcon == "undefined" || formIcon =="")
       ;
    else style = "style=\"background-image:url(" + formIcon + ")\"";

    str = "<div onmousedown=\"explorer_Select_FormsDown(this)\" onclick=\"explorer_Select_Forms(this)\" id=\"" + formID + "\" class=\"emi-activeRow\"><div class=\"emi-activeIcon\" " + style + " ></div>" +
	      "<div class=\"emi-activeRowName\">" + formTitle + "</div> " +
	      "<div class=\"emi-info\"><span class=\"emi-infoL\">" + formLink + "</span><span class=\"emi-infoI\">" + formIcon + "</span>" +
	     "<span class=\"emi-infoVersion\">" + varVersion + "</span>" +
	      "<span class=\"emi-infoLoc\">" + tempformLoc + "</span>" +
	      "<span class=\"emi-infoAddID\">" + tempformID + "</span>" +
	       
	      "</div>" +
	      " </div>";



    $("#recformsList .formList> .emi-activeRow").removeClass("nwSelected");     
    
    if ("rec" == formCon)
        $("#recformsList .formList").prepend(str);
    else if ("fav" == formCon)
        $("#favformsList .formList").prepend(str);
    else if ("act" == formCon)
        $("#activeformsList .formList").prepend(str);
}



function explorer_Insert_ActForms(formID,appid) {
    var str = "";
    var value = $('#' + formID).children('.emi-title').children('.emi-formtitle').clone().children().remove().end().text()

     
    var formTitle = $("#" + formID + " div.emi-formtitle").text();
    var formIcon = $("#" + formID + " span.emi-infoI").text();
    var formLink = $("#" + formID + " span.emi-infoL").text();
    var formVersion = $("#" + formID + " span.emi-infoVersion").text();

    if (value != "") {
        formTitle = value;
    }
    
    if(formTitle==""){
        formTitle = $("#" + formID + " div.emi-activeRowName").text();
    }
    
    if(formTitle == ""){ formTitle = appid.title;}
    if(formIcon == ""){formIcon = appid.icon;}
    if (formLink == "") { formLink = appid.link; }

     
    formID = formID.replace("emi-FormsA-","emi-");
    formID = formID.replace("emi-", "emi-FormsA-");
    formID = formID.replace("_fav", "");
    formID = formID.replace("_rec", "");


    var style = "";
    if (formIcon == undefined || formIcon == "undefined" || formIcon == "")
        ;
    else style = "style=\"background-image:url(" + formIcon + ")\"";

    str = "<div onmousedown=\"explorer_Select_FormsDown(this)\" onclick=\"explorer_Select_Forms(this)\" id=\"" + formID + "\" class=\"emi-activeRow\"><div class=\"emi-activeIcon\" " + style + "\"></div>" +
	      "<div class=\"emi-activeRowName\">" + formTitle + "</div> " +
	      "<div class=\"emi-info\"><span class=\"emi-infoL\">" + formLink + "</span><span class=\"emi-infoI\">" + formIcon + "</span><span class=\"emi-infoVersion\">" + formVersion + "</span></div>" +
	      " </div>";

    $("#activeformsList .formList").prepend(str);
    explorer_Select_Forms_SetSelected(formID); 

    
}


function explorer_Create_FormsInfo(a,b,c) {
    var str = "";

    str = "<div class=\"emi-info\"><span class=\"emi-infoL\">" + b + "</span>" +
          "<div class=\"emi-formtitle\">" + a + "</div> " +
	      "<span class=\"emi-infoI\">" + c + "</span>" +
	      " </div>";

    return str;
}


function explorer_Select_Forms_Modal(ver) {
    var formIDc; formIDc = ver;
    try {
        formIDc = ver.id;
        if (formIDc == undefined || formIDc == "undefined")
            formIDc = ver;
    } catch (err) { formIDc = ver; }

    var fwidth = 0;
    var fheight = 0;
    var ewidth = 0;
    var mwidth = 0;
    
    var cwidth = 0;
    var cheight = 0;

    var fx = 0;
    var fy = 0;

    mwidth = parseInt($("#mainContainerContent").outerWidth());
    ewidth = parseInt($("#explorerContainer").outerWidth());
    fheight = parseInt($("#mainContainerContent").outerHeight());
    fheight = fheight * 0.9;
    cwidth = parseInt($("#" + formIDc).outerWidth());
    cheight = parseInt($("#" + formIDc).outerHeight());

    fwidth = mwidth ;
    //alert(mwidth + " - " + ewidth + " = " + fwdth);
    fx = (fwidth / 2) - (cwidth / 2) - ewidth;
    fy = (fheight / 2) - (cheight / 2);

    $("#" + formIDc).css('top', fy);
    $("#" + formIDc).css('left', fx);
    
    //fwdth = ()

}

var isNext = false;
function explorer_Form_Next() {
    var nwForm = general_GetRootID(current_SelectedFormID);
    var crIndex = 0; var crIndexNew = 0;
    var xcount = 0;var obj;
    xcount = $("#activeformsList .formList .emi-activeRow").length;
    crIndex = $("#emi-FormsA-" + nwForm).index();
    isNext = true;
  
    crIndexNew = crIndex +1 ;

    if (xcount <= 0) return;

    if (xcount > crIndexNew) {
        obj = $("#activeformsList .formList .emi-activeRow:eq(" + crIndexNew + ")");
        nwForm = $("#activeformsList .formList .emi-activeRow:eq(" + crIndexNew + ")").attr("id");
    }
    else {
        obj = $("#activeformsList .formList .emi-activeRow:eq(" + 0 + ")");
        nwForm = $("#activeformsList .formList .emi-activeRow:eq(" + 0 + ")").attr("id");
    }
    current_SelectedFormID = "emi-" + general_GetRootID(nwForm);

    explorer_Select_Forms(obj);
    
    var tempFormID = "emi-Form-" + general_GetRootID(nwForm);
    if (jQuery("#" + tempFormID).hasClass("nwmaximize")) $("#mainContainer").removeClass("nwHide");
    else $("#mainContainer").addClass("nwHide");

    if ($('.ApplicationForms.affull').length >= 1) {
        $('#mainContainer').removeClass("nwHide");
    }
}


function explorer_Favorites_ADD(nwForm) {

    if (nwForm.indexOf("P8SysNotificationHome247") >= 0) return;

    nwForm = general_GetRootID(nwForm);
    var isValid = true;
    var tempID = "";
    var xcount = $("#favformsList .formList .emi-activeRow").length;
    for (var i = 0; i < xcount; i++) {
        tempID = $("#favformsList .formList .emi-activeRow:eq(" + i + ")").attr("id");
        tempID = general_GetRootID(tempID);
        if (tempID == nwForm) {
            isValid = false; break;
        }
    }

    if (isValid) {
    //alert(nwForm + " " + "actFormFavADD");
        explorer_Forms_Get_Info(nwForm);
        func_ActionDriven("actFormFavADD", false);
    }
}
function explorer_Favorites_Remove(nwForm,isAll) {
    nwForm = general_GetRootID(nwForm);
    var isValid = true;
    if (isValid) {
        explorer_Forms_Get_Info(nwForm);
        nwParameter_Add("nwcrRemoveStat", isAll);
        if (isAll) $("#favformsList .formList .emi-activeRow").remove();
        else $("#emi-FormsA-" + nwForm + "_fav").remove();
        func_ActionDriven("actFormFavRemove", false);
    }
}

function explorer_Forms_Get_Info(nwForm) {
    clear_parameters();
    nwForm = general_GetRootID(nwForm);
    var formID = "";
    var formTitle = "";
    var formLink = "";
    var formIcon = "";
    var formAddID = "";
    var formVersion= "";
    try {
        formID = nwForm;
        formTitle = $("#emi-FormsA-" + formID + " div.emi-activeRowName").text();
        formIcon = $("#emi-FormsA-" + formID + " span.emi-infoI").text();
        formLink = $("#emi-FormsA-" + formID + " span.emi-infoL").text();
        formAddID = $("#emi-FormsA-" + formID + " span.emi-infoAddID").text();  
        formVersion= $("#emi-FormsA-" + formID + " span.emi-infoVersion").text();  
        
        nwParameter_Add("nwcrForm", formID);
        nwParameter_Add("nwcrFormTitle", formTitle);
        nwParameter_Add("nwcrFormLink", formLink);
        nwParameter_Add("nwcrFormIcon", formIcon);
        nwParameter_Add("nwcrFormAddID", formAddID);
        nwParameter_Add("nwcrFormVersion", formVersion);
        
        
    } catch (err) {
        //alert(err);
    }
}


function explorer_Forms_ArrangeButtom(){
    var xcounter =  $('.dialog-Minimizer').length;
    var xheight = $('#FormsContainer').outerHeight();
    var xwidth = $('#FormsContainer').outerWidth();
    
    var xmargin=1; 
    var ystarter = 0;
    var xstarter = xmargin;
    var frmwidth = 100;
    var frmHeight = 20;
    
    if(xcounter >=1) ystarter =xheight - $('.dialog-Minimizer:eq(0)').outerHeight();
     
    if(xcounter >=1) frmwidth = $('.dialog-Minimizer:eq(0)').outerWidth();
    if(xcounter >=1) frmHeight = $('.dialog-Minimizer:eq(0)').outerHeight(); 
    
    for(var i=xcounter-1; i>=0; i--){
         $('.dialog-Minimizer:eq(' + i +')').css("left",xstarter+"px");
         $('.dialog-Minimizer:eq(' + i +')').css("top",ystarter+"px");
         
         if((frmwidth+xstarter) >= xwidth)
           {  
              xstarter = xmargin;  
             
              ystarter = ystarter - (frmHeight + xmargin);
           }
         else 
                xstarter = xstarter+frmwidth+xmargin;
    }
}


function SetTitle(title){
    title = title.replace("emi-FormsA-", "");
    title = title.replace("emi-Form-", "");
    title = title.replace("_rec", "");
    title = title.replace("_fav", "");
    title = title.replace("aag", "");
    title = title.replace("emi-", "");
    title = title.replace("gen", "");
    title = title.replace("_NotiButton", "Notification Viewer");
return title;
}



function SetTitleClear(title){
    title = title.replace("emi-FormsA-", "");
    title = title.replace("emi-Form-", "");
    title = title.replace("_rec", "");
    title = title.replace("_fav", "");
    title = title.replace("aag", "");
    title = title.replace("emi-", "");
    title = title.replace("_NotiButton", "Notification Viewer");
return title;
}




function MenuLoad(menuitemcode,dx, ParameterAdd) {
    crLnk = "Modules_Gateway/noahweb_Gateway.aspx";
    crLnkGateKey = "aagMain";

    //var xdata = $(this).val().split("\\");;
    try {
        //nwParameter_Add("MenuItemKey", xdata[0]);
        var xbaselink = getParameterByName("nwburl")
        if (xbaselink == "") xbaselink = window.location.origin;

        nwParameter_Add("baselink", xbaselink);
        //nwParameter_Add("MenuModule", xdata[0]);
        //nwParameter_Add("MenuItemKey", xdata[1].split(" ")[0]);
        nwParameter_Add("menuitemcode", menuitemcode);
        nwParameter_Add("strParameterAdd", ParameterAdd || "");
        nwParameter_Add("dx", dx || "");
        

    } catch (err) { }
    func_ActionDriven("actLoadMenu", false);
}


