﻿var vurl = GetCurrentURL() +
    "../APVendorPriceAssignment/Upload";


function ClearUploadField() {
    $("#fileCon").val("");
    $(".bar").css("width", "0%");
    $(".percent").text("0%");
    $("#status").html("");
}

$(document).on("click", "#btnupload", function () {
    return upload();
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
        return false;
    } else {
        (function () {
            var bar = $('.bar');
            var percent = $('.percent');
            var status = $('#status');

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
                        var filepath = $("#nwUploadCon .noahdriveID").text();
                        var path = filepath;
                        var xpath = $('.aagFiledir').text();
                        var serverlink = $("#txtserverlink").val();

                        nwParameter_Add("session", xsessionstamp + "-" + baseSessionID);
                        //nwParameter_Add("txtDescription", xpath);
                        nwParameter_Add("FilePath", xpath);
                        nwParameter_Add("ID", $('#txtID').val());
                        nwLoading_Start("actInsertTemp", crLoadingHTML);
                        //Close Popup Upload
                        func_ActionDriven("actInsertTemp", false);
                        $('#nwUploadCon .btn.btn-modal-back').click();
                    }
                });
            } catch (err) {
                // alert(err);
                console.error(err);
            }
        })();
        return true;
    }
}