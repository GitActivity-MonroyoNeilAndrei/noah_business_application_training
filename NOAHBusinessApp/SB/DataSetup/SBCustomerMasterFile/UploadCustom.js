var vurl = "../SBCustomerMasterFile/Upload";
var serverlink = "";

function ClearUploadField() {
    $("#fileCon").val("");
    $(".bar").css("width", "0%");
    $(".percent").text("0%");
    $("#status").html("");
}

$(document).on("click", "#btnupload", function () {
    upload();
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
    if (size > 5194880) {
        MessageBox("Attachment does not follow file size requirements."); $(ver).val("");
    }
    else {
        upload();
    }
}


function upload() {

    if ($("input[type = 'file']").val() == "") {
        $("#status").html("<span style=\"color:red;\">Please select file to upload!</span>");
        (function () {
            var bar = $('.bar');
            var percent = $('.percent');
            var status = $('#status');
            $('#form-upload').ajaxForm({
                url: vurl,
                beforeSend: function () {

                },
                uploadProgress: function (event, position, total, percentComplete) {
                },
                success: function () {
                },
                complete: function (xhr) {
                }
            });
        })();

    } else {
        (function () {
            var bar = $('.bar');
            var percent = $('.percent');
            var status = $('#status');
            var filepath = $("#nwUploadCon .noahdriveID").text();
            
            var path = "";
            serverlink = $('#txtServerLink').val();


 
            try {



                $('form').ajaxForm({
                    url: vurl,


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
                    },

                    success: function () {
                        var percentVal = '100%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                    },

                    complete: function (xhr) {


                        $('#status').html(xhr.responseText);
                        var noahdriveID = $("#status .noahdriveID").text();
                        var txtloadPath = $("#aagHRec .aagFiledir").text();//$(".aagFiledir").text(); //


                        //added by rjjr.
                        if ($btn == "attachIDPicture") {
                            var filepath = $("#nwUploadCon .noahdriveID").text();
                            var path = "";
                            serverlink = $('#txtServerLink').val();

                            //path = "\\" + 'SBCustomerMasterFile' + "\\" + filepath;
                            path = "\\" + filepath;

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
                        console.log(txtloadPath);
                        console.log(noahdriveID);


                    }
                });
            } catch (err) {
                // alert(err);
                console.error(err);
            }
        })();
    }
}



//function func_WindowCloseTrigger(verID) {
//    if (verID == "nwUploadCon") {
//        if ($btn == "attachIDPicture") {
//            var filepath = $("#nwUploadCon .noahdriveID").text();
//            var path = "";
//            serverlink = $('#txtServerLink').val();

//            path = "\\" + 'SBCustomerMasterFile' + "\\" + filepath;

//            if (filepath != "") {
//                linkcat = serverlink + path;
//                cust_GetPara();
//                nwParameter_Add("path", path);
//                func_ActionDriven("actSaveCustomerImage", false);
//                nwLoading_Start('actSaveCustomerImage');
//            }
//        }

//        if ($btn == "attachSignature") {
//            var filepath = $("#nwUploadCon .noahdriveID").text();
//            var path = "";
//            serverlink = $('#txtServerLink').val();

//            path = "\\" + 'SBCustomerMasterFile' + "\\" + filepath;

//            if (filepath != "") {
//                linkcat = serverlink + path;
//                cust_GetPara();
//                nwParameter_Add("path", path);
//                func_ActionDriven("actSaveSignature", false);
//                nwLoading_Start('actSaveSignature');
//            }
//        }
//    }
//    if (verID == "nwPopWindow") {
//        //if ($('#nwPopWindow .BoxTitle').text() == 'Customer Co-Borrower/Co-Buyer') {
//        //    if (isView != 1) {
//        //        console.log(isEdited);
//        //        if (isEdited == true) {
//        //            var err = "";
//        //            var len = cntInvld.length -1;
//        //            for (var x=0; x <= len ; x++){
//        //                err+=  "Cannot proceed. Please select a Reference Spouse or remove data selected in the Married Status Tagging field in row "+ cntInvld[x] +".", "Customer Co-Borrower/Co-Buyer", "";
//        //            }
//        //            MessageBox(err, "Customer Co-Borrower/Co-Buyer");
//        //            return false;
//        //        }
//        //    }
//        //} else {
//        nwPopupForm_HideModal("nwPopWindow");
//        // }
//    }
//    return true;
//}