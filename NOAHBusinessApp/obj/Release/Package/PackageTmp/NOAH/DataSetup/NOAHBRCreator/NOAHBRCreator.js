var jsonBRCompList = [];

function func_Reload()
{
    crnwTagSingleBind = true;
    crLnk = GetCurrentURL() + "NOAHBRCreator_Gateway";
    crLnkGateKey = "NOAHBRCreator";
    var isContinue = true;
  
    init_request();
    return isContinue;
}

function cust_GetPara() {

}


function noah_ObjectTools() {
    $("#brcomp").html("");
    var group = "";
    for (var i = 0; i < jsonBRCompList.ObjectList.length; i++) {
        var groupx = jsonBRCompList.ObjectList[i]["group"];
        var code = jsonBRCompList.ObjectList[i]["code"];
        var description = jsonBRCompList.ObjectList[i]["description"];
        var tag = jsonBRCompList.ObjectList[i]["tag"] || "";
        if (group != groupx) {
            var groupname = groupx;
            try { groupname = groupx.split("_")[1]; } catch (err) { }
            $("#brcomp").append("<div id='" + groupx + "' class='app-dgdr-items'><div class='app-dgdr-item-tx'>" + groupname + "</div><div class='app-dgdr-item-components'></div></div>");
            group = groupx;
        }
        $("#" + groupx).find(".app-dgdr-item-components").append("<div class='app-box-list " + tag + "' nid='" + code + "'>" + description + "</div>");
        

    }
    $(".app-form, .app-box-list").disableSelection();

    // RowParent
    $(".container-flex").sortable({
        revert: true,
        placeholder: "ui-state-highlight",
        start: function () {

        },
        drag: function () {

        },
        stop: function (ui) {
            //$(ui).append("aaaa");
        }
    });
    $(".rowparent_t").draggable({
        connectToSortable: ".container-flex",
        helper: "clone",
        revert: "invalid",
        start: function () {

        },
        drag: function () {

        },
        stop: function (ui) {
            var nid = $(this).attr("nid");
            $(".app-form .rowparent_t").replaceWith(noah_ObjectSelect(nid));
            noah_ObjectRenew();
        }
    });
    

}

function noah_ObjectRenew() {
    //// Col Parent 
    $(".row.row-parent").sortable({
        revert: true,
        placeholder: "ui-state-highlight",
        items: ".col.col-parent:not(.ui-state-disabled)",
        cancel: ".ui-state-disabled",
        connectWith: ".row.row-parent",
        start: function () {

        },
        drag: function () {

        },
        stop: function (ui) {
            //$(ui).append("aaaa");
        }
    });
    $(".colparent_t").draggable({
        connectToSortable: ".row.row-parent",
        helper: "clone",
        revert: "invalid",
        start: function () {

        },
        drag: function () {

        },
        stop: function (ui) {
            var nid = $(this).attr("nid");
            $(".app-form .colparent_t").replaceWith(noah_ObjectSelect(nid));
            noah_ObjectRenew();
        }
    });



    //// Basic Row
    $(".row.row-parent .col.col-parent").sortable({
        revert: true,
        placeholder: "ui-state-highlight",
        items: ".row:not(.ui-state-disabled)",
        cancel: ".ui-state-disabled",
        connectWith: ".row.row-parent .col.col-parent",
        start: function () {

        },
        drag: function () {

        },
        stop: function (ui) {
            //$(ui).append("aaaa");
        }
    });
    $(".row_t").draggable({
        connectToSortable: ".row.row-parent .col.col-parent",
        helper: "clone",
        revert: "invalid",
        start: function () {

        },
        drag: function () {

        },
        stop: function (ui) {
            var nid = $(this).attr("nid");
            $(".app-form .row_t").replaceWith(noah_ObjectSelect(nid));
            noah_ObjectRenew();
        }
    });


    $(".textbox_t").draggable({
        connectToSortable: ".row.row-parent .col.col-parent",
        helper: "clone",
        revert: "invalid",
        start: function () {

        },
        drag: function () {

        },
        stop: function (ui) {
            var nid = $(this).attr("nid");
            $(".app-form .textbox_t").replaceWith(noah_ObjectSelect(nid));
            noah_ObjectRenew();
        }
    });

    $(".lookup_t").draggable({
        connectToSortable: ".row.row-parent .col.col-parent",
        helper: "clone",
        revert: "invalid",
        start: function () {

        },
        drag: function () {

        },
        stop: function (ui) {
            var nid = $(this).attr("nid");
            $(".app-form .lookup_t").replaceWith(noah_ObjectSelect(nid));
            noah_ObjectRenew();
        }
    });

    
    
}


function noah_ObjectSelect(code) {
    for (var i = 0; i < jsonBRCompList.ObjectList.length; i++) {
        var xcode = jsonBRCompList.ObjectList[i]["code"];
        if (code == xcode) {
            return jsonBRCompList.ObjectList[i].value;
        }
    }
    return "";
}





