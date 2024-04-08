Title = "Registration";
var vurl = GetCurrentURL() +
    "../PMORegistration/Upload";
var jsonCheckDataIfExists = [];
function func_Reload() {

    crLnk = GetCurrentURL() + "PMORegistration_Gateway";
    crLnkGateKey = "PMORegistration";
    crnwTagSingleBind = true;

    DisableFields();
    var isContinue = true;
    init_request();
  
    nwPopupForm_Create("nwUploadCon");
   // nwPopupForm_Create("nwgProofSelfieCon");
   // nwPopupForm_Create("nwgProofIDCon");

    ToolBoxGetData = false;

    return isContinue;
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    cust_GetPara();
    func_Toolbox_Clear();
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", "Registration", "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", "Registration", "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
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

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();

    EnableFieldsDone();
    nwLoading_Start("xBindDone", crLoadingHTML);
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {

    nwLoading_Start("xBindEmpty", crLoadingHTML);
    DisableFieldsEmpty();
    func_ActionDriven("actBindCollectionEmpty", false);
}

///////////////////////////////////////

var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    if (idName == 'toolboxInquire') {
    }

}


function EnableFields() {

}

function DisableFields() {

}

function EnableFieldsDone() {

}

function DisableFieldsDone() {

}

function DisableFieldsEmpty() {

}

function ClearFields() {

}



$(function () {
    $(window).resize(function () {
        var xwidth = $(window).outerWidth() * 0.98;

        $("#nwGridCon").css("max-width", xwidth + "px");


        $("#nwGridCon").css("width", xwidth + "px");
        $("#nwGridCon").parents(".noah-webui-containerRowItem").css("max-width", xwidth + "px");
        nwGrid_TableAdjust("nwGridCon");
    });

    $(window).resize();

});

function AA() {
    var a = 1;
    a = 1 + 1;
    var xTextOrig = 0;
    MessageBox("Cannot find :[" + xTextOrig + "]");
    nwPopupForm_Show("frm_totals");
}

$(function () {
    $('#txtCode').on('keypress', function (e) {
        if (e.which == 32)
            return false;
    });
});

//First Screen - Register or Enroll
let initAction = 0;
$(document).on("click", "#btnVerify", function (e) {
    const userEmail = $('#txtExistingEmail').val();
    const userPass = $('#txtPassword').val();

    if (userEmail == "" || userPass == "") {
        $('#EnrollErrMessage').removeClass('rgf-invi');
        $('#EnrollErrMessage').html('Please complete all fields!');
        return;
    } else {
        $('#EnrollErrMessage').addClass('rgf-invi');
        nwParameter_Add("userEmail", userEmail);
        nwParameter_Add("txtPassword", userPass);
        func_ActionDriven("actValidateEmail", false);
        nwLoading_Start(`actValidateEmail`, crLoadingHTML);
    }
});

function validateEmailDone(result) {
    nwLoading_End("actValidateEmail");

    console.log(result);

    if (result == "404") {
        $('#EnrollErrMessage').removeClass('rgf-invi');
        $('#EnrollErrMessage').html('Login Email not Found!');
    } else if (result == "405") {
        $('#EnrollErrMessage').removeClass('rgf-invi');
        $('#EnrollErrMessage').html('Invalid User Credentials');
    } else {
        $('#txtRegType').val('REG_EXT');

        const userData = result.split('|');

        $('#txtAccName').val(userData[0]);
        $('#txtAccEmail').val(userData[1]);
        $('#txtAccMobile').val(userData[2]);

        $('#txtAccEmail').attr('disabled', true);
        $('#txtAccMobile').attr('disabled', true)
        $('#btnAccInfo').removeClass('cst-dis');
        $('#btnAccInfo').addClass('darkblue');

        proceedToOTP('.rgf-selection');
    }
}

$(document).on("click", "#btnNewUser", function (e) {
    const userEmail = $('#txtExistingEmail').val();
    $('#txtRegType').val('REG_NEW');

    //code to next tab/screen
});

$(document).on("click", "#btnHistory", function (e) {
    if ($('#chkBox').prop('checked')) {
        nwParameter_Add("company", $('#idvallugEvent').val());
    } else {
        nwParameter_Add("company", '%');
    }
    func_ActionDriven("LoadHistorical");
    return false;
});



    function ExportToExcel() {
        try {
            window.open('ExporttoExcel.aspx', '_self', false);
        } catch (err) {
            window.open('../../../ExportToExcel.aspx', '_self', false);
        }
    }

    function cust_GetPara() {
        nwParameter_Add("infoAccNo", $('#txtAccNo').val());
        nwParameter_Add("infoProp", $('#cmbProperty').val());
        nwParameter_Add("infoCust", $('#txtCustomerCode').val());

        nwParameter_Add("infoName", $('#txtAccName').val());
        nwParameter_Add("infoEmail", $('#txtAccEmail').val());
        nwParameter_Add("infoMobile", $('#txtAccMobile').val());

        nwParameter_Add("infoProofPic", $('#txtIDFullPath').val());
        nwParameter_Add("infoSelfiePic", $('#txtSelfieFullPath').val());

        const RegType = $('#txtRegType').val();
        let newAccount = true;

        if (RegType == 'REG_EXT') {
            newAccount = false;
        }

        nwParameter_Add("UserNewAccount", newAccount);
    }

    let $btn = "";
    $(document).on("click", "#ProofID", function () {
        $btn = "ProofID";
        $('#myfile').val('');
        $(".bar").css("width", "0%");
        $(".percent").text("0%");
        $("#status").html("");
        nwPopupForm_ShowModal("nwUploadCon");
        $('#myfile').attr('accept', 'image/*')
    });

    $(document).on("click", "#ProofSelfie", function () {
        $btn = "ProofSelfie";
        $('#myfile').val('');
        $(".bar").css("width", "0%");
        $(".percent").text("0%");
        $("#status").html("");
        nwPopupForm_ShowModal("nwUploadCon");
        $('#myfile').attr('accept', 'image/*')
    });

    //For Uploading of Attachment
    function changeFile(ver) {
        var file = ver.files[0];
        var name = file.name;
        var size = file.size;
        var type = file.type;
        type = name.slice((Math.max(0, name.lastIndexOf(".")) || Infinity) + 1);
        type = type.toLowerCase();
        $(".bar").css("width", "0%");
        $(".percent").text("0%");
        $("#status").html("");

        //Your validation
        currentName = name;
        if (size > 5242880 || (type != 'png' && type != 'bmp' && type != 'jpg' && type != 'jpeg')) {
            MessageBox("Cannot proceed. Attachment does not follow file type and size requirements.", BasedTitle, "error"); $(ver).val("");
        }
        else {
            onsole.log('val', $('#myfile').val());
            //setTimeout(function () {
            //    $("#btnProofID").click();
            //}, 100);
            //window.alert('changefile', file);
            upload();

        }
    }

    function upload() {
        window.alert('upload');
        if ($("input[type = 'file']").val() == "") {
            $("#status").html("<span style=\"color:red;\">Please select file to upload!</span>");
            (function () {
                var bar = $('.bar');
                var percent = $('.percent');
                var status = $('#status');
                $('form').ajaxForm({
                    beforeSend: function () {

                    },
                    uploadProgress: function (event, position, total, percentComplete) {
                    },
                    success: function () {
                    },
                    complete: function (xhr) {
                        //consol.log('uploaded if');
                    }
                });
            })();
        } else {
            (function () {
                var bar = $('.bar');
                var percent = $('.percent');
                var status = $('#status');

                try {
                    //

                    var UploadFileName = '';
                    var currentdate = new Date();
                    var datetime = ''

                
                    var d = new Date($.now());
                    datetime = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + "_" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

                    UploadFileName = $("input[type = 'file']").val().split(/(\\|\/)/g).pop() + '_' + datetime.replace(/-|:| /g, '');
                    var mydata = { "UploadFileName": UploadFileName };
                    $('form').ajaxForm(
                    {
                        data: mydata,
                        beforeSend: function () {
                            status.empty();
                            var percentVal = '0%';
                            bar.width(percentVal)
                            percent.html(percentVal);
                        },

                        uploadProgress: function (event, position, total, percentComplete) {
                            var percentVal = percentComplete + '%';
                            bar.width(percentVal)
                            percent.html(percentVal);
                            $("#status").text('Uploading...');
                        },

                        success: function () {
                            var percentVal = '100%';
                            bar.width(percentVal)
                            percent.html(percentVal);
                        },

                        complete: function (xhr) {
                            window.alert('uploaded else');
                            $('#status').html(xhr.responseText);
                            if ($btn == "ProofID") {
                                $('#txtIDProof').val(UploadFileName);
                            } else {
                                $('#txtSelfieProof').val(UploadFileName);
                            }


                            //setTimeout(function () {
                            //    window_close('nwUploadCon');
                            //}, 500);

                        }
                    });
                } catch (err) {
                    alert(err);
                }
            })();
        }
    }




    function func_WindowCloseTrigger(verID) {
        //consol.log('func_WindowCloseTrigger', verID);
        var isContinue = true;
        if (verID == "nwUploadCon") {
            if ($btn == "attachIDPicture") {
                var filepath = $("#nwUploadCon .noahdriveID").text();
                var path = "";
                serverlink = $('#txtServerLink').val();

                path = "\\" + 'SBCustomerMasterFile' + "\\" + filepath;

                if (filepath != "") {
                    linkcat = serverlink + path;
                    cust_GetPara();
                    nwParameter_Add("path", path);
                    func_ActionDriven("actSaveCustomerImage", false);
                    nwLoading_Start('actSaveCustomerImage');
                }
            }

            if ($btn == "attachSignature") {
                var filepath = $("#nwUploadCon .noahdriveID").text();
                var path = "";
                serverlink = $('#txtServerLink').val();

                path = "\\" + 'SBCustomerMasterFile' + "\\" + filepath;

                if (filepath != "") {
                    linkcat = serverlink + path;
                    cust_GetPara();
                    nwParameter_Add("path", path);
                    func_ActionDriven("actSaveSignature", false);
                    nwLoading_Start('actSaveSignature');
                }
            }
        }

        return isContinue;
    }

    let proceed = false;
    var activeStepIndex = 0;
    var steps;
    var circles;

    $(document).ready(function () {
        steps = $(".rgf-box .rgf");
        circles = $(".rgf-container .rgf-step .rgf-circle");
    });

    function showStep(index) {
        steps.removeClass("active");
        $(steps[index]).addClass("active");

        circles.removeClass("active");
        $(circles[index]).addClass("active");

        if (index > 0) {
            $(circles[index - 1]).addClass("done");
        }

        activeStepIndex = index;
    }

    function proceedToNextTab() {
        if (activeStepIndex < steps.length - 1) {
            nwLoading_End("actValidatePropInfo");
            $(circles[activeStepIndex]).addClass("done").removeClass("active");
            showStep(activeStepIndex + 1);
        }
    }

    $(document).on("click", ".btnBck", function () {
        if (activeStepIndex > 0) {
            $(circles[activeStepIndex - 1]).removeClass("done").addClass("active");
            showStep(activeStepIndex - 1);
        }
    });

    function validatePropertyInfo() {
        let accNo = $("#txtAccNo").val();
        //if (accNo == "") {
        //    MessageBox("Cannot proceed. Please provide your Account Number.", Title, "error");
        //} else {

        if ($('#btnAccInfo').hasClass('cst-dis')) {
            $('#PropErrMessage').removeClass('rgf-invi');
            $('#PropErrMessage').html('Please complete all fields');
            return;
        } else {
            proceedToNextTab();
            //window.alert('All Clear');
        }
    }

    function validateUserInfo() {
        const regType = $('#txtRegType').val();

        if (regType == "REG_EXT") {
            proceedToNextTab();
        } else {
            let inName = $("#txtAccName").val();
            let inEmail = $("#txtAccEmail").val();
            let inMobile = $("#txtAccMobile").val();

            inEmail = inEmail.toLowerCase();
            inMobile = inMobile.toLowerCase();

            if (inName == "" || inEmail == "" || inMobile == "") {
                showSubtleError("Error: Please complete all fields.");
            } else {
                nwParameter_Add("dataEmail", $("#txtAccEmail").val());
                func_ActionDriven("actValidateUserInfo", false);
                nwLoading_Start("actValidateUserInfo", crLoadingHTML);
            }
        }
    }

    function validateUserDone(result) {
        nwLoading_End("actValidateUserInfo");
        if (result == "0") {
            proceedToNextTab();
        } else {
            showSubtleError("Error: Email Already Registered");
        }
    }

    function validateProofInfo() {
        let idText = $("#txtIDProof").val();
        let selfieText = $("#txtSelfieProof").val();

        if (idText == "" || selfieText == "") {
            MessageBox("Cannot proceed. Please upload both ID and Selfie Proof.", Title, "error");
        } else {
            proceedToNextTab();
        }
    }

    function showSubtleError(message) {
        $(".rgf-error").html(message);
        $(".rgf-error").removeClass("rgf-invi");
        setTimeout(() => {
            $(".rgf-error").addClass("rgf-invi");
            $(".rgf-error").html('ERR');
        }, 3000);
    }

    function showPropertyError(result) {
        nwLoading_End("actValidatePropInfo");
        let errMessage;

        switch (result) {
            case "0":
                errMessage = 'Error: Account number does not exist.';
                break;
            case "2":
                errMessage = 'Error: Account number is awaiting registration approval.';
                break;
            case "3":
                errMessage = 'Error: Account number is already registered.';
                break;
            default:
                errMessage = 'Error: Unkown.';
                break;
        }

        $("#PropErrMessage").html(errMessage);
        $("#PropErrMessage").removeClass("rgf-invi");
        setTimeout(() => {
            $("#PropErrMessage").addClass("rgf-invi");
            $("#PropErrMessage").html('ERR');
        }, 3000);
    }

    function setValidationResult(result) {btnFx
        nwLoading_End("actValidatePropInfo");
        if (result == "1") {
            proceedToNextTab();
        }
    }

    function generateTAC() {
        let tac = $("#txtDPP").val();
        $("#DivTAC").html(tac);
    }

    jQuery(function ($) {
        $('#DivTAC').on('scroll', function () {
            if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                $("#rfg-accept").removeClass("cst-dis");
                $('#rfg-accept').removeAttr("disabled");
            } else {
                $("#rfg-accept").addClass("cst-dis");
                $('#rfg-accept').attr('disabled');
            }
        })
    });

    $(document).ready(function () {

        $(".selection-btn").click(function (e) {
            var currentTarget = $(this);
            var currentSelected = $("#" + currentTarget.data("content"));

            $(".selection-con-wrapper").not(currentSelected).removeClass("show");
            currentSelected.addClass("show");
        });

    })

    $(document).ready(function () {
        $('.fx-container:not(:first)').hide();

        $('.btnFX').click(function () {
            var currentContainer = $(this).closest('.fx-container');
            var nextContainer = currentContainer.next('.fx-container');

            if (nextContainer.length > 0) {
                if (nextContainer.hasClass('otp-container')) {
                    if (!$("#rfg-accept").hasClass('cst-dis')) {
                        resendOTPCode(false);
                    }
                }
                else if (nextContainer.hasClass('msg-container')) {
                    //
                } else {
                    currentContainer.addClass('visited');
                    currentContainer.find('.otp-container').show();
                    currentContainer.find('.msg-container').hide();

                    nextContainer.show();
                    nextContainer.find('.msg-container').show();
                }
                console.log('url', window.location.origin);
            }
        });

        $('#rfg-back-pi').click(function () {
            $('.rgf-selection.fx-container.visited').removeClass('visited');
            $(this).closest('.fx-container').hide();
        });
    });

    function proceedToOTP(container) {
        var currentContainer = $(container).closest('.fx-container');
        var nextContainer = currentContainer.next('.fx-container');

        if (nextContainer.length > 0) {
            currentContainer.addClass('visited');
            currentContainer.find('.otp-container').show();
            currentContainer.find('.msg-container').hide();

            nextContainer.show();
            nextContainer.find('.msg-container').show();
        }
    }


    //---------------------------------------Registration---------------------------------------//

    //Property Information
    $(document).on("blur", "#txtAccNo", function () {
        if ($(this).val() != '') {
            CheckAccountNumber();
        } else {
            $('#cmbProperty').val('');
            $('#cmbProperty').empty();

            $('#txtCustomerCode').val('');
            $('#txtCustomerType').val('');
        }
    });

    function CheckAccountNumber() {
        nwParameter_Add("UserAccountNo", $('#txtAccNo').val());

        func_ActionDriven("actGetAccountProperties", false);
        nwLoading_Start("actGetAccountProperties", crLoadingHTML);
    }

    $(document).on("change", "#cmbProperty", function (e) {
        nwParameter_Add("UserAccountNo", $('#txtAccNo').val());
        nwParameter_Add("UserProperty", $(this).val());

        func_ActionDriven("actGetCustomerType", false);
        nwLoading_Start("actGetCustomerType", crLoadingHTML);
    });

    function checkPropertyFields() {
        if ($('#txtCustomerType').val() != '') {
            $('#btnPropInfo').removeClass('cst-dis');
            $('#btnPropInfo').addClass('darkblue');
        } else {
            $('#btnPropInfo').removeClass('darkblue');
            $('#btnPropInfo').addClass('cst-dis');
        }
    }

    $(document).on("click", "#btnPropInfo", function () {
        if ($(this).hasClass('cst-dis')) {
            $('#PropErrMessage').removeClass('rgf-invi');
            $('#PropErrMessage').html('Please complete all fields');
            return;
        } else {
            nwParameter_Add("UserAccountNo", $('#txtAccNo').val());
            nwParameter_Add("UserProperty", $('#cmbProperty').val());

            func_ActionDriven("actValidatePropertyInfo", false);
            nwLoading_Start("actValidatePropertyInfo", crLoadingHTML);
        }
    });

    function showPropertyError(error) {
        $('#PropErrMessage').removeClass('rgf-invi');
        $('#PropErrMessage').html(error);
    }


    //Account Information
    $(document).on("blur", "#txtAccEmail", function () {
        const emailValid = validateEmailAddress($(this).val());

        if (emailValid == true) {
            $('#UserErrMessage').addClass('rgf-invi');
            $('#UserErrMessage').html('');

            CheckUserInformation();
        } else {
            $('#UserErrMessage').removeClass('rgf-invi');
            $('#UserErrMessage').html('Invalid Email Address!');
            $(this).val('');
            CheckUserInformation();
        }
    });

    function validateEmailAddress(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        }
        return false;
    };

    $(document).on("blur", "#txtAccMobile", function () {
        const MobileNo = $(this).val();

        if (MobileNo.length == 11) {
            CheckUserInformation();
        } else {
            $('#UserErrMessage').removeClass('rgf-invi');
            $('#UserErrMessage').html('Invalid Mobile Number!');
            $(this).val('');
            CheckUserInformation();
        }
    });

    function CheckUserInformation() {
        let errCtr = 0;
        errCtr = $('#txtAccName').val() == '' ? errCtr + 1 : errCtr;
        errCtr = $('#txtAccEmail').val() == '' ? errCtr + 1 : errCtr;
        errCtr = $('#txtAccMobile').val() == '' ? errCtr + 1 : errCtr;

        if (errCtr == 0) {
            $('#btnAccInfo').removeClass('cst-dis');
            $('#btnAccInfo').addClass('darkblue');
        } else {
            $('#btnAccInfo').removeClass('darkblue');
            $('#btnAccInfo').addClass('cst-dis');
        }
    }

    $(document).on("click", "#btnAccInfo", function () {
        if ($(this).hasClass('cst-dis')) {
            $('#UserErrMessage').removeClass('rgf-invi');
            $('#UserErrMessage').html('Please complete all fields');
            return;
        } else {
            const RegType = $('#txtRegType').val();

            if (RegType == 'REG_EXT') {
                proceedToNextTab();
            }
            else
            {
                nwParameter_Add("UserEmail", $('#txtAccEmail').val());
                nwParameter_Add("UserMobile", $('#txtAccMobile').val());

                func_ActionDriven("actValidateEmailMobile", false);
                nwLoading_Start("actValidateEmailMobile", crLoadingHTML);
            }
        }
    });

    function showUserInfoError(error) {
        $('#UserErrMessage').removeClass('rgf-invi');
        $('#UserErrMessage').html(error);
    }

    //File Upload
    function CheckFileUpload() {
        let errCtr = 0;
        errCtr = $('#txtIDProof').val() == '' ? errCtr + 1 : errCtr;
        errCtr = $('#txtSelfieProof').val() == '' ? errCtr + 1 : errCtr;

        $('#UploadErrMessage').addClass('rgf-invi');
        if (errCtr == 0) {
            $('#btnFileUpload').removeClass('cst-dis');
            $('#btnFileUpload').addClass('darkblue');
        } else {
            $('#btnFileUpload').removeClass('darkblue');
            $('#btnFileUpload').addClass('cst-dis');
        }
    }

    $(document).on("click", "#btnFileUpload", function () {
        if ($(this).hasClass('cst-dis')) {
            $('#UploadErrMessage').removeClass('rgf-invi');
            $('#UploadErrMessage').html('Please select ID and Selfie picture.');
            return;
        } else {
            proceedToNextTab();
        }
    });

    //OTP
    $(document).on("click", "#btnSubmitOTP", function () {
        validateOTPCode();
    });

    $(document).on("click", "#lblResendOtp", function () {
        if (!timerRunning) {
            resendOTPCode(true);
        }
    });
    

    function validateOTPCode() {
        let userOTP = $('#txtOTPCode').val();

        if (userOTP == "") {
            MessageBox("Please enter OTP Code.", Title, "error");
        } else {
            nwParameter_Add("userEmail", $('#txtAccEmail').val());
            nwParameter_Add("userOTP", userOTP);

            nwLoading_Start(`actValidateOTP`, crLoadingHTML);
            func_ActionDriven("actValidateOTP", false);
        }
    }

    function validateOTPDone(result) {
        switch (result) {
            case "OTP_OK":
                cust_GetPara();
                nwLoading_Start(`actSaveRegistration`, crLoadingHTML);
                func_ActionDriven("actSaveRegistration", false);
                break;
            case "OTP_INVALID":
                $('#OTPErrMessage').removeClass('rgf-invi');
                $('#OTPErrMessage').html('Invalid OTP Code. Please try again.');
                break;
            case "OTP_EXPIRED":
                $('#OTPErrMessage').removeClass('rgf-invi');
                $('#OTPErrMessage').html('OTP Code Expired. Please request a new one.');
                break;
        }
    }
    

    function resendOTPCode(resend) {
        nwParameter_Add("OptionResend", resend);

        nwParameter_Add("UserEmail", $('#txtAccEmail').val());
        nwParameter_Add("UserMobile", $('#txtAccMobile').val());
        nwParameter_Add("UserProperty", $('#cmbProperty').val());

        //add condition later
        nwParameter_Add("UserNewAccount", true);

        func_ActionDriven("actResendOTPCode", false);
        nwLoading_Start("actResendOTPCode", crLoadingHTML);
    }

    function showOTPError(error) {
        $('#UserErrMessage').removeClass('rgf-invi');
        $('#UserErrMessage').html(error);
    }

    let timerRunning = false;
    function startResendTimer() {
        timerRunning = true;
        const delayInMins = 2;

        var endTime = new Date();
        endTime.setMinutes(endTime.getMinutes() + delayInMins);
        endTime.setSeconds(endTime.getSeconds() + 2); //added for function execution delay (Without this, countdown timer starts at 1:58)

        let myTimer = setInterval(function () {
            var now = new Date().getTime();
            var distance = endTime - now;

            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            var minString = minutes.toString().length == 1 ? '0' + minutes : minutes;
            var secString = seconds.toString().length == 1 ? '0' + seconds : seconds;
            
            $('#lblResendOtp').attr('style', 'color: #AAA !important;');
            $('#lblResendOtp').html('Resend new code after ' + minString + ":" + secString);

            if (distance < 1) {
                $('#lblResendOtp').attr('style', 'color: #1974d1 !important;');
                $('#lblResendOtp').html('Resend new code');
                timerRunning = false;
                clearInterval(myTimer);
            }
        }, 1000);
    }

    