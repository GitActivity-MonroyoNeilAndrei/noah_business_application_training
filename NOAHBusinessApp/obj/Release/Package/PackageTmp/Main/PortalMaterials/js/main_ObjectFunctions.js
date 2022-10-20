$(document).on("click", "#noah-webui-ChangePassword .nwSave", function() {
        nwParameter_Add("cpPassOld", $("#cpPassOld").val());
        nwParameter_Add("cpPassNew", $("#cpPassNew").val());
        nwParameter_Add("cpPassCon", $("#cpPassCon").val());
        nwParameter_Add("Log_MenuItem", "Change Password");
        nwParameter_Add("Log_Logid", "11");
        nwParameter_Add("Log_Remarks", "Changed Password");
        func_ActionDriven("actMain_Password", false);
});