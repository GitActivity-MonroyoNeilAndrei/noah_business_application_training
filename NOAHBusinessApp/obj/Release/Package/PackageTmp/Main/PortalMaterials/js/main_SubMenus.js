$(function() {
    // var itemsDisabled = {};
    $.contextMenu({
        selector: '#activeformsList',
        callback: function(key, options) {
            if (key == "rmenuClose") { mainParent_Close_Form(); }
            else if (key == "rmenuCloseEx") { mainParent_Close_Form_Except(); }
            else if (key == "rmenuCloseALL") { mainParent_Close_Form_All(); }
            else if (key == "rmenuAddFav") { explorer_Favorites_ADD(current_SelectedFormID); }
            else {
                return false;
            }
        },
        items: {
            "rmenuClose": { name: "Close", icon: "windowCloseOne" },
            "rmenuCloseEx": { name: "Close Other Windows", icon: "windowCloseALLexc" },
            "rmenuCloseALL": { name: "Close All", icon: "windowCloseALL" },
            "sep2": "---------",
            "rmenuAddFav": { name: "Add to Favorites", icon: "windowAddFav" },
            "rmenuRemoveFav": { name: "Remove from Favorites", icon: "windowRemoveFav icon-disabled", disabled: function(key, opt) { return !this.data('icon-disabled');} },
            "rmenuRemoveFavAll": { name: "Remove All from Favorites", icon: "windowRemoveFavAll icon-disabled", disabled: function(key, opt) { return !this.data('icon-disabled');} }
        }
    });
});



$(function() {
    $.contextMenu({
        selector: '#favformsList',
        callback: function(key, options) {
        if (key == "rmenuRemoveFav") { explorer_Favorites_Remove(current_SelectedFormID, false); }
        else if (key == "rmenuRemoveFavAll") { explorer_Favorites_Remove(current_SelectedFormID, true); }
        else {
            return false;
         }
        },
        items: {
        "rmenuClose": { name: "Close", icon: "windowCloseOne icon-disabled", disabled: function(key, opt) { return !this.data('icon-disabled');} },
            "rmenuCloseEx": { name: "Close Other Windows", icon: "windowCloseALLexc icon-disabled", disabled: function(key, opt) { return !this.data('icon-disabled');} },
            "rmenuCloseALL": { name: "Close All", icon: "windowCloseALL icon-disabled", disabled: function(key, opt) { return !this.data('icon-disabled');} },
            "sep2": "---------",
            "rmenuAddFav": { name: "Add to Favorites", icon: "windowAddFav icon-disabled", disabled: function(key, opt) { return !this.data('icon-disabled');} },
            "rmenuRemoveFav": { name: "Remove from Favorites", icon: "windowRemoveFav" },
            "rmenuRemoveFavAll": { name: "Remove All from Favorites", icon: "windowRemoveFavAll" }
        }
    });

});


$(function() {
    $.contextMenu({
        selector: '#gen_NotiCollectTrans .gen_NotiItem',
        callback: function(key, options) {
        if (key == "DeleteSelected") { Delete_Notification($(this).attr("id")); }
        else if (key == "DeleteAll") {DeleteAll();}
        else {
            return false;
         }
        },
        items: {
        //    "rmenuClose": { name: "Delete", icon: "windowCloseOne icon-disabled", disabled: function(key, opt) { return !this.data('icon-disabled');} },
//            "rmenuCloseEx": { name: "Close Other Windows", icon: "windowCloseALLexc icon-disabled", disabled: function(key, opt) { return !this.data('icon-disabled');} },
//            "rmenuCloseALL": { name: "Close All", icon: "windowCloseALL icon-disabled", disabled: function(key, opt) { return !this.data('icon-disabled');} },
//            "sep2": "---------",
//            "rmenuAddFav": { name: "Add to Favorite", icon: "windowAddFav icon-disabled", disabled: function(key, opt) { return !this.data('icon-disabled');} },
           "DeleteSelected": { name: "Delete", icon: "windowRemoveFavAll" },
           "DeleteAll": { name: "Delete All", icon: "windowRemoveFav" }
           
        }
    });

});