var vurl = GetCurrentURL() +
    "../NOAHIssueLogs/Upload";


function ClearUploadField() {
    $("#fileCon").val("");
    $(".bar").css("width", "0%");
    $(".percent").text("0%");
    $("#status").html("");
}

$(document).on("click", "#btnupload", function () {
    const file = $('#myfile').val();
    var allowedExtensions = /(\.xlsx|\.csv)$/i;

    if (allowedExtensions.exec(file)) {
        //console.log('file match', file);
        return upload();
    } else {
        

        $('.btn-modal-back').trigger('click');
        $('#UploadErrMessage').removeClass('rgf-invi');
        $('#UploadErrMessage').html('Please select excel files only!');
        return false;
    }
});



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

    console.log('type', type);

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



                        if ($btn == "upload") {
                            var filepath = $("#nwUploadCon .noahdriveID").text();

                            if (filepath != "") {
                                cust_GetPara();
                                //nwParameter_Add("path", filepath);
                                nwParameter_Add("path", txtloadPath);
                                nwLoading_Start('actSaveTemplate', crLoadingHTML);
                                func_ActionDriven("actSaveTemplate", false);

                            }
                        } else if ($btn == "uploadScreenshot") {
                            var filepath = $("#nwUploadCon .noahdriveID").text();

                            if (filepath != "") {
                                cust_GetPara();
                                //nwParameter_Add("path", filepath);
                                nwParameter_Add("path", txtloadPath);
                                nwLoading_Start('actSaveTemplateScreenshot', crLoadingHTML);
                                func_ActionDriven("actSaveTemplateScreenshot", false);

                            }
                        }

                        //Close Popup Upload
                        $('#nwUploadCon .btn.btn-modal-back').click();

                        
                    }
                });
            } catch (err) {
            
                console.error(err);
            }
        })();
        return true;
    }
}