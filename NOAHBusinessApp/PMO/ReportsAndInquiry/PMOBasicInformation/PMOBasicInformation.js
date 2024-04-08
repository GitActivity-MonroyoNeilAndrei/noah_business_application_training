function func_Reload() {
    crLnk = GetCurrentURL() +  "PMOBasicInformation_Gateway";
    crLnkGateKey = "PMOBasicInformation";

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;

    return isContinue;
}

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    nwParameter_Add("nwtku", getParameterByName("nwtku"));
    func_Toolbox_Clear();
    return isContinue;
}

function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    isContinue = false;
    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    nwLoading_Start("xLoading", crLoadingHTML);
    isRefreshed = true;
    return isContinue;
}

function func_ToolboxInquire(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxProcess(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxImport(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxExport(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    return isContinue;
}

function func_ToolboxPrint(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxClosing(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxSearch(indef, enume) {
    var isContinue = true;
    isContinue = false;
    return isContinue;
}

function cust_GetPara() {
    
}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {

}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("xLoading", crLoadingHTML);
    func_ActionDriven("actBindCollectionEmpty", false);
}

function Lookup_DoneFunction(idName, idNum) {
}

function func_LookUpInitialize(idName) {
    
}

function EnableFields() {
    
}

function DisableFields() {
    $("#txtCustName").enable(false);

    $("#txtMobileNo").enable(false);
    $("#txtEmailAdd").enable(false);
    $("#txtPhoneNo").enable(false);

    $("#txtAccNo").enable(false);
    $("#txtAccStats").enable(false);

    $("#txtBaseUnit").enable(false);
    $("#txtBaseUnitDesc").enable(false);
    $("#txtInventType").enable(false);

    $("#txtAddUnit1").enable(false);
    $("#txtAddUnit1Desc").enable(false);
    $("#txtInventType1").enable(false);
}

function EnableFieldsDone() {
    //Binding Done

}

function DisableFieldsEmpty() {
    
}

function ClearFields() {
    
}

function RefreshData() {
    
}

function generateOTP() {

    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
}

$(document).on("change", "#txtAccNo", function (e) {
    nwParameter_Add("nwtku", getParameterByName("nwtku"));
});


let origNumber;
let origEmail;
let focusOriginNum;
let focusOriginEmail;

$(document).ready(function () {
    $('#editInfoNum').click(function () {
        var isDisabled = $('#txtMobileNo').prop('disabled');

        if (isDisabled == true) {
            var msgBox = new GenLib.MessageBoxQuestion("idEditNum");
            msgBox.message = "Edit your account mobile number?\n(Press 'Enter' key after editing to proceed to OTP Verification)";
            msgBox.title = pageTitle;
            msgBox.buttonYes = function () {
                origNumber = $("#txtMobileNo").val();
                $("#txtMobileNo").enable(true);
                $("#txtMobileNo").focus();
            };
            msgBox.buttonNo = function () {
                return true;
            };

            msgBox.Show();
        }
    });

    $('#txtMobileNo').blur(function () {
        if (focusOriginNum != 1) {
            $('#txtMobileNo').val(origNumber);
        }

        this.setAttribute("disabled", "");
        focusOriginNum = 2;
    });

    $("#txtMobileNo").keyup(function (event) {
        if (event.keyCode === 13) {
            
            if (numberValid() == true) {
                var msgBox = new GenLib.MessageBox("idError");
                msgBox.message = "Invalid Mobile Number!";
                msgBox.title = pageTitle;
                focusOriginNum = 2;
                msgBox.Show();
            } else {
                focusOriginNum = 1;
                $('#txtMobileNo').blur();
                getOTPMethods("16");
            }
            
            //var msgBox = new GenLib.MessageBoxQuestion("idCancelEditNum");
            //msgBox.message = "Change your account mobile number?\n(OTP Verification needed)";
            //msgBox.title = pageTitle;
            //msgBox.buttonYes = function () {
            //    showOTPInputWindow("Mobile number");
            //    return false;
            //};
            //msgBox.buttonNo = function () {
            //    $("#txtMobileNo").focus();
            //    return true;
            //};

            //msgBox.Show();
        }
    });

    $('#editInfoEmail').click(function () {
        var msgBox = new GenLib.MessageBoxQuestion("idEditEmail");
        msgBox.message = "Edit your account Email address?\n(Press 'Enter' key after editing to proceed to OTP Verification)";
        msgBox.title = pageTitle;
        msgBox.buttonYes = function () {
            origEmail = $("#txtEmailAdd").val();
            $("#txtEmailAdd").enable(true);
            $("#txtEmailAdd").focus();this
        };
        msgBox.buttonNo = function () {
            return true;
        };

        msgBox.Show();
    });

    $("#txtEmailAdd").keyup(function (event) {
        if (event.keyCode === 13) {
            if (emailValid() == false) {
                var msgBox = new GenLib.MessageBox("idError");
                msgBox.message = "Invalid Email Address!";
                msgBox.title = pageTitle;
                focusOriginEmail = 2;
                msgBox.Show();
            } else {
                focusOriginEmail = 1;
                $('#txtEmailAdd').blur();
                getOTPMethods("15");
            }
            //var msgBox = new GenLib.MessageBoxQuestion("idCancelEditNum");
            //msgBox.message = "Change your account mobile number?\n(OTP Verification needed)";
            //msgBox.title = pageTitle;
            //msgBox.buttonYes = function () {
            //    showOTPInputWindow("Mobile number");
            //    return false;
            //};
            //msgBox.buttonNo = function () {
            //    $("#txtMobileNo").focus();
            //    return true;
            //};

            //msgBox.Show();
        }
    });

    $("#txtEmailAdd").blur(function (event) {
        if (focusOriginEmail != 1) {
            $('#txtEmailAdd').val(origEmail);
        }
        this.setAttribute("disabled", "");
        focusOriginEmail = 2
    });
});

function numberValid() {
    let newNum = $("#txtMobileNo").val();
    if (newNum.length < 11) {
        return true;
    }
    return false;
}

function emailValid() {
    let newEmail = $("#txtEmailAdd").val();

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newEmail)) {
        return true;
    }
    return false;
}

function getOTPMethods(OTPType) {
    nwParameter_Add("nwtku", getParameterByName("nwtku"));
    nwParameter_Add("OTPMethod", OTPType);

    func_ActionDriven('actGetOTP', false)
    nwLoading_Start('actGetOTP', crLoadingHTML);
}


var msgOTPBox = new GenLib.MessageBoxInput("idOTPInput");

function showOTPInputWindow(infoDetail) {
    nwLoading_End('actGetOTP', crLoadingHTML);

    msgOTPBox.message = "A verification code has been sent to your current " + infoDetail + ".\nPlease enter the OTP code to change your " + infoDetail + ".\nOnce verified, your " + infoDetail + " will be updated.\n(Proceed with caution)";
    msgOTPBox.title = pageTitle;
    msgOTPBox.buttonOk = function () {

        var value = msgOTPBox.InputValue();

        nwParameter_Add("OTPMethod", infoDetail);
        nwParameter_Add("UserOTP", value);
        nwLoading_Start('actValidateOTP', crLoadingHTML);
        func_ActionDriven('actValidateOTP', false)
        return false;
    };
    msgOTPBox.Show();
}

function OTPValidationResult(result, infoDetail) {
    nwLoading_End('actValidateOTP', crLoadingHTML);

    if (result == "OTP_OK") {
        //msgOTPBox.Close();
        saveNewUserInfo(infoDetail)
    } else {
        let invalidResult = result == "OTP_INVALID" ? "Invalid OTP Code." : "OTP Code Expired.";
        msgOTPBox.LabelText(invalidResult);
        setTimeout(() => { msgOTPBox.LabelText(""); }, 3000);
    }
}

function showErrorWindow() {
    nwLoading_End('actGetOTP', crLoadingHTML);

    var msgBox = new GenLib.MessageBox("idOTPInput");
    msgBox.message = "An Error Occured";
    msgBox.title = pageTitle;
    msgBox.Show();
}

function saveNewUserInfo(infoDetail) {
    let saveInfo;
    switch (infoDetail) {
        case "Email Address":
            saveInfo = $("#txtEmailAdd").val();
            break;
        default:
            saveInfo = $("#txtMobileNo").val();
            break;
    }

    nwParameter_Add("infoType", infoDetail);
    nwParameter_Add("nwtku", getParameterByName("nwtku"));
    nwParameter_Add("saveInfo", saveInfo);
    func_ActionDriven('actSaveNewInfo', false)
    nwLoading_Start('actSaveNewInfo', crLoadingHTML);
}

function showUpdatedMsg() {
    nwLoading_End('actSaveNewInfo', crLoadingHTML);

    var msgBox = new GenLib.MessageBox("idInfosaved");
    msgBox.message = "Details updated Successfully!";
    msgBox.title = pageTitle;
    msgBox.Show();
}




//var msg ="Please Enter OTP!";
//var pageTitle="OTP";

//var msgBox = new GenLib.MessageBoxInput("id2");
//msgBox.message = msg;
//msgBox.title = pageTitle;
//msgBox.buttonOk = function () {
        
//    var value =  msgBox.InputValue();
//    if(value == "1234"){
//        //do sucess sucess code here
//        alert("correct");
//        return true;
//    }else {
//        msgBox.LabelText("Invalid OTP!");
//        return false; 
//    }
//};
//msgBox.Show();
