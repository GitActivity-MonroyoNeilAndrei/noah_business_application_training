var vurl = GetCurrentURL() +
    "../PMORegistration/Upload";


function ClearUploadField() {
    $("#fileCon").val("");
    $(".bar").css("width", "0%");
    $(".percent").text("0%");
    $("#status").html("");
}

$(document).on("click", "#btnupload", function () {
    const file = $('#myfile').val();
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    if (allowedExtensions.exec(file)) {
        //console.log('file match', file);
        return upload();
    } else {
        //console.log('else', file);
        if ($btn == "ProofID") {
            $('#txtIDFullPath').val('');
        }

        if ($btn == "ProofSelfie") {
            $('#txtSelfieFullPath').val('');
        }

        $('.btn-modal-back').trigger('click');
        $('#UploadErrMessage').removeClass('rgf-invi');
        $('#UploadErrMessage').html('Please select image files only!');
        return false;
    }
});


function isFileImage(file) {
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    return file && acceptedImageTypes.includes(file['type'])
}

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

                        //var filepath = $("#nwUploadCon .noahdriveID").text();
                        //var path = filepath;

                        //var serverlink = $("#txtServerPath").val();
                        if ($btn == "ProofID") {
                            var filepath = $("#nwUploadCon .noahdriveID").text();
                            var path = "";
                            serverlink = $('#txtServerPath').val();

                            //path = "\\" + 'SBCustomerMasterFile' + "\\" + filepath;
                            path = "\\" + filepath;

                            console.log('id path', noahdriveID, txtloadPath, filepath, serverlink);

                            if (filepath != "") {
                                linkcat = serverlink + path;
                                $('#txtIDProof').val(path.substr(path.lastIndexOf("\\") + 1));
                                $('#txtIDFullPath').val(path);
                                CheckFileUpload();
                                //cust_GetPara();
                                
                                //nwParameter_Add("txtAccountNo", $('#txtAccountNo').val());
                                //nwParameter_Add("path", path);
                                //func_ActionDriven("actUploadID", false);
                                //nwLoading_Start('actUploadID');
                            }
                        }
                        if ($btn == "ProofSelfie") {
                            var filepath = $("#nwUploadCon .noahdriveID").text();
                            var path = "";
                            serverlink = $('#txtServerPath').val();

                            //path = "\\" + 'SBCustomerMasterFile' + "\\" + filepath;
                            path = "\\" + filepath;
                            
                            //console.log('self path', path, serverlink);

                            if (filepath != "") {
                                linkcat = serverlink + path;
                                $('#txtSelfieProof').val(path.substr(path.lastIndexOf("\\") + 1));
                                $('#txtSelfieFullPath').val(path);
                                CheckFileUpload();
                                //cust_GetPara();
                                //nwParameter_Add("txtAccountNo", $('#txtAccountNo').val());
                                //nwParameter_Add("path", path);
                                //func_ActionDriven("actUploadSelfie", false);
                                //nwLoading_Start('actUploadSelfie');
                            }
                        }
                        //if (path != "") {
                        //    link = serverlink + path; //uncomment this replace add by EME

                        //    //nwLib.nwTempTable_RowData_Set("nwGrid2", crnwTR.index(), SPR_FILEPATH)(path);
                        //    //nwLib.nwTempTable_RowData_Set("nwGrid2", currentRow, SPR_FILEPATH - 1)(path);
                        //    //nwGrid_Book.ActiveSheet.SetText(SPR_FILEPATH - 1, currentRow, path);
                        //    ////$('.btnview').text('').prepend('<a>View Attachment</a>');
                        //    ////$("#nwGrid2-nwData tbody").find("tr:eq(" + crnwTR.index() + ") td:eq(" + SPR_VIEWHDR + ") a").addClass('green');
                        //    //nwGrid_Book.ActiveSheet.SetBackground(SPR_VIEWHDR - 1, currentRow, 'green');
                        //    //nwGrid_Book.ActiveSheet.SetTextColor(SPR_VIEWHDR - 1, currentRow, "white");

                        //}
                        //Close Popup Upload
                        $('#nwUploadCon .btn.btn-modal-back').click();

                        //console.log(txtloadPath);
                        //console.log(noahdriveID);
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