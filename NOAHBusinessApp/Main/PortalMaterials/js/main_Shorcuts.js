
$(document).on("keypress", "body", function(e) {

    showChar(e);
});
function showChar(e) {
//    alert("wew");
//    alert("Key Pressed: " + String.fromCharCode(e.charCode) + "\n"
//    + "charCode: " + e.charCode + "\n"
//    + "CTRL key pressed: " + e.shiftKey + "\n");
    
    if (e.shiftKey && (e.charCode == 78 || e.charCode == 110))
        explorer_Form_Next();
    else if (e.shiftKey && (e.charCode == 81 || e.charCode == 113))
        mainParent_Close_Form();
        

    return false;
}



$(document).on("unload", "body", function(e) {
  
});

var closeMsg='System unable to perform action \nThe are still active forms running.';
var isAAGPermited = false;

window.onbeforeunload = null;
window.onbeforeunload = function(e) {

    

            var xcount = 0;
            xcount = $("#activeformsList .formList .emi-activeRow").length;

//            if (1 == 1)// company check
//            {
//                //xcount += 1;
//                closeMsg = "Are you sure you want to quit all applications and log out now?";
//            }

            //setTimeout(function() { });
            nwParameter_Add("baseSessionID", baseSessionID);
            func_ActionDriven("actResetSession", false);


         
            if (sessioncheckerX == "1" && !isAAGPermited) {


                e = e || window.event;
                // For IE and Firefox prior to version 4
                if (e) {
                    e.returnValue = closeMsg + "aaaa";
                }
                // For Safari
                return closeMsg;
            }
            if (xcount >= 1 && !isAAGPermited) {
                //parent_MessageBox(closeMsg.replace("\n", "<br\>"), "");
                //return ;
                e = e || window.event;
                // For IE and Firefox prior to version 4
                if (e) {
                    e.returnValue = closeMsg;
                }
                // For Safari
                return closeMsg;
            }



};


