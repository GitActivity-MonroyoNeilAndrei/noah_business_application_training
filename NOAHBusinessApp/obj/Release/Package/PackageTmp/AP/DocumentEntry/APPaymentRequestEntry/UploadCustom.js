var vurl = GetCurrentURL() +
    "../APPaymentRequestEntry/Upload";


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
                        //var LoadPath = $("#aagHRec .aagpath").text();
                        //nwLoading_Start('actInsertTemp', crLoadingHTML);
                        //nwParameter_Add("txtloadPath", LoadPath);
                        try {
                            nwParameter_Add("_jsonconfigDL", JSON.stringify(_jsonconfigDL));
                        } catch (ex) { }
                       
                        $('#IDtemp').val(baseSessionID);
                        nwParameter_Add("IDtemp", baseSessionID);
                        //nwParameter_Add("txtBudgetYear", $('#txtBudgetYear').val());
                        nwPopupForm_HideModal(`nwUploadCon`)
                        //func_ActionDriven("actInsertTemp", false);
                        
                        nwLoading_Start("xPRFUploading", crLoadingHTML);
                        cust_GetPara();

                        //var txtloadPath = $("#aagHRec .aagFiledir").text();//$(".aagFiledir").text(); //
                        var txtloadPath = $("#aagHRec .aagpath").text();
                        nwParameter_Add("txtloadPath", txtloadPath);
                        $('#txtFilePath').val(txtloadPath);
                        $('#txtPathTemp').val(txtloadPath);

                        if (upload_type == 'uploadprf') {
                            setTimeout(function () {
                                nwParameter_Add("idvallugVendorPayee", $("#idvallugVendorPayee").val());
                                func_ActionDriven("actPRFUploading", false);
                            }, 1000);
                        }
                        else if (upload_type == 'uploadalloc') {
                            setTimeout(function () {
                                nwParameter_Add("txtLineID_AP", $("#txtLineID_AP").val());
                                nwParameter_Add("txtRefRowno_AP", $("#txtRefRowno_AP").val());
                                nwParameter_Add("idvallugSegment1", $("#idvallugSegment1").val());
                                nwParameter_Add("descvallugSegment1", $("#descvallugSegment1").val());
                                nwParameter_Add("txtTotalAmount", $("#txtTotalAmount").val());
                                nwParameter_Add("txtTotalQty", $("#txtTotalQty").val());
                                nwParameter_Add("idvallugLocAcctForms", $("#idvallugLocAcctForms").val());
                                nwParameter_Add("idvallugOrigCCC", $("#idvallugOrigCCC").val());
                                func_ActionDriven("actAllocUploading", false);
                            }, 1000);
                        }


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
