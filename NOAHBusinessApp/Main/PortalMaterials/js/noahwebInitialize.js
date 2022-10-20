var current_SelectedWindowType = 1; // 1 - full screen , 2 - window , 3 - minimize
var current_SelectedFormID = ""; // ID of Current Selected form

var current_Form_History = new Array(); // ID of Current Selected form
var current_Form_zIndex = 0;

var noahwebDataString = new Array(); ///$("body").serializeArray(); form Objects
var noahwebFunctionList = Create2DArray(120); //[[]]; // Collection of Functions // noahweb_*CodeName*

var nwdefault_FormHeight = 280;
var nwdefault_FormWidth = 280;



var nwFormsMaxState=false;



noahwebFunctionList[0][0] = "noahweb_MenuCreator"; // function name / id
noahwebFunctionList[0][1] = "formsCode/main_menu/noahwebMenuCreator.aspx?nwburl=" + getParameterByName("nwburl");; // link
noahwebFunctionList[1][0] = "noahweb_Initials"; // function name / id
noahwebFunctionList[2][1] = "formsCode/main_Initials/noahwebInitials.aspx"; 


function Create2DArray(rows) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
        arr[i] = [];
    }
    return arr;
}