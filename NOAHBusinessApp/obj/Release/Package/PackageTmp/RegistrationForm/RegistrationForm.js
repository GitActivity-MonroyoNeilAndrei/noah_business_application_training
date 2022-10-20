
var nwGridMainCon_Book;
var nwGridMainCon_Sheet;


var BasedTitle= "";
$(document).on("click", "button",  function() { 
    return false;
});
 
function func_Reload() {
    LoadStringsCases();
    crLnk = "../RegistrationForm/RegistrationForm_Gateway";
    crLnkGateKey = "RegistrationForm";

    
    var isContinue = true;
    init_request();
   

     
    ToolBoxGetData = false;

    return isContinue;
}


$(document).on("click", "#btnSubmit", function () {

    nwLoading_Start("actSaved", crLoadingHTML);

    nwParameter_Add("txtCompanyName", $("#txtCompanyName").val());
    nwParameter_Add("txtCompanyAddress", $("#txtCompanyAddress").val());
    nwParameter_Add("txtProduct", $("#txtProduct").val());
    nwParameter_Add("txtIndustry", $("#txtIndustry").val());
    nwParameter_Add("txtLastname", $("#txtLastname").val());
    nwParameter_Add("txtFirstname", $("#txtFirstname").val());
    nwParameter_Add("txtMiddlename", $("#txtMiddlename").val());
    nwParameter_Add("txtDesignation", $("#txtDesignation").val());
    nwParameter_Add("txtContactNumber", $("#txtContactNumber").val());
    nwParameter_Add("txtEmail", $("#txtEmail").val());
    nwParameter_Add("txtDemoSchedule", $("#txtDemoSchedule").val());
    nwParameter_Add("txtGiveaway", $("#txtGiveaway").val());
    func_ActionDriven("actSaved", false);

    return false;
});
