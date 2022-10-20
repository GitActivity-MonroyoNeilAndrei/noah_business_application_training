var SPR_COMMRELCODE= 1,
SPR_COMMRELDESC = 2;

var recuser = "";
var seller = "";
var status = "";
var isView = false;

var level1Code = "",
    level2Code = "",
    level3Code = "",
    level4Code = "",
    level5Code = "",
    level6Code = "",
    level7Code = "",
    level8Code = "",
    level9Code = "",
    level10Code = "";

var jsonlevelconfig = [];

function func_Reload() {

    //crnwTagSingleBind = true;
    crLnk = "../BMSellerInformation/BMSellerInformation_Gateway";
    crLnkGateKey = "BMSellerInformation";


    $("#profile-img").css('background-image', "url('../../BM/DataSetup/BMSellerInformation/Images/placeholder.png')");
    $("#profile-img-signature").css('background-image', "url('../../BM/DataSetup/BMSellerInformation/Images/placeholder.png')");

    nwPopupForm_Create("nwCaptureForm");
    nwPopupForm_Create("nwUploadCon");
    //create frame form
    nwPopupForm_Create("nwFrameForm");
    var isContinue = true;
    init_request();

    $('#txtSellerCode').enable(false)
    $('#txtSellername').enable(false)
    $('#txtMI').enable(false)
    $('#txtAge').enable(false)
    

    $('#noah-webui-default-Refresh').visible(true);
    DisableFields();

    getParameterByName("nwCustno");
    if (getParameterByName("nwCustno") != null && getParameterByName("nwCustno").length > 0) {
        $('#noah-webui-Toolbox').visible(false);
        Refresh();

    }


    return isContinue;
}


function Refresh() {
    setTimeout(function () {
        $('#noah-webui-default-Refresh').click();
    }, 500);

}

function ViewingToolbox() {
    $('#noah-webui-Toolbox').visible(true);
    $('#noah-webui-Footer').visible(false);
    $('#noah-webui-default-New').visible(false);
    $('#noah-webui-default-Save').visible(false);
    $('#noah-webui-default-Delete').visible(false);
    $('#noah-webui-default-Process').visible(false);
    $('#noah-webui-default-Refresh').visible(true);
    $('#noah-webui-default-Export').visible(true);
    $('#noah-webui-default-Inquire').visible(false);
    $('#noah-webui-default-Update').visible(false);
    $('#noah-webui-Toolbox-BindingNavigator').visible(false);

    $("#statusdiv").hide();
    isView = true;
    $(".nwRequiredField").text("");
}

////////////////////////// TOol Box
pageTitle = 'Seller Information';

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    cust_GetPara()
    nwParameter_Add_Table("nwGrid1Con");
    EnableFields();
    EnableFieldsIndividual();
    ClearFields();


    $("#rbIndividual").prop("checked",true)
    $("#rbVAT").prop("checked", true)
    $("#txtVATRegTIN").enable(true);

    func_Toolbox_Clear();

    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", pageTitle, "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", pageTitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    // nwLoading_Start("xRefreshBtn", crLoadingHTML);
    
    
    isRefreshed = true;
    return isContinue;
}

function func_ToolboxInquire(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxProcess(indef, enume) {
    var isContinue = true;


    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to process the current record?", pageTitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxImport(indef, enume) {
    var isContinue = true;

    return isContinue;
}

function func_ToolboxExport(indef, enume) {
    var isContinue = true;
    cust_GetPara()
    return isContinue;
}

function func_ToolboxPrint(indef, enume) {
    var isContinue = true;
    //tableToPrint("nwGridCon");
    //parent_MessageBox("Export","Export Sucess","");
    return isContinue;
}

function func_ToolboxClosing(indef, enume) {
    var isContinue = true;
    Update();
    func_ActionDriven("actUpdate", false);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    return isContinue;
}

function func_ToolboxSearch(indef, enume) {
    var isContinue = true;
    isContinue = false;
    return isContinue;
}

///////////////////// Bind tool
function cust_GetPara() {
    //nwParameter_Add("inCode", $('#idvallugDa').val());
    //nwParameter_Add("inTableName", $('#nwTableName').val());
    //nwParameter_Add("nwScreenID", $('#nwScreenID').val());
    nwParameter_Add("txtStatusCode", $('#txtStatusCode').val());
    nwParameter_Add("txtUpdateButton", $('#txtUpdateButton').val());
    nwParameter_Add("idvallugTrantype", $('#idvallugTrantype').val());
    nwParameter_Add("txtEffectiveDate", $('#txtEffectiveDate').val());
    nwParameter_Add("txtID", $('#txtID').val());
    nwParameter_Add("txtLevel2", $('#level2').text());

    var rdbRegular = $('#rbRegular').prop("checked")
    nwParameter_Add("rbRegular", rdbRegular);
    
    nwParameter_Add("SellerCode", $('#txtSellerCode').val());
    nwParameter_Add("txtLevel1", $('#level1').text());
    nwParameter_Add("txtLevel2", $('#level2').text());

    nwParameter_Add("txtRecordStatus", $('#txtRecordStatus').val());
    nwParameter_Add("txtUpdateStatus", $('#txtUpdateStatus').val());
    
    nwParameter_Add("level1Code", level1Code);
    nwParameter_Add("level2Code", level2Code);
    nwParameter_Add("level3Code", level3Code);
    nwParameter_Add("level4Code", level4Code);
    nwParameter_Add("level5Code", level5Code);
    nwParameter_Add("level6Code", level6Code);
    nwParameter_Add("level7Code", level7Code);
    nwParameter_Add("level8Code", level8Code);
    nwParameter_Add("level9Code", level9Code);
    nwParameter_Add("level10Code", level10Code);

    nwParameter_Add("idvallugDefaultVATCode", $("#idvallugDefaultVATCode").val());
    nwParameter_Add("idvallugDefaultCWTTaxCode", $("#idvallugDefaultCWTTaxCode").val());
    nwParameter_Add("idvallugSellerRole", $("#idvallugSellerRole").val());
    nwParameter_Add("level2", $('#level2').text());
    nwParameter_Add("level1", $('#level1').text());

    nwParameter_Add("txtLastName", $('#txtLastName').val());
    nwParameter_Add("txtFirstName", $('#txtFirstName').val());
    nwParameter_Add("txtMiddleName", $('#txtMiddleName').val());
    
    nwParameter_Add("idvallugMktgGrpCode", $('#idvallugMktgGrpCode').val());
    nwParameter_Add("idvallugSellerTypee", $('#idvallugSellerTypee').val()); 
    nwParameter_Add("txtSellername", $('#txtSellername').val());

    nwParameter_Add("level2", $('#level2').text());
    nwParameter_Add("level1", $('#level1').text());

    nwParameter_Add("origin", $('#idvallugLvl3').val());


    nwParameter_Add("jsonlevelconfig", JSON.stringify(jsonlevelconfig));
    nwParameter_Add("status", getParameterByName("status"));

    nwParameter_Add("SaveStatus", $('#txtRecordStatus').val());
    nwParameter_Add("UpdateStatus", $('#txtUpdateStatus').val());

    nwParameter_Add("idvallugSalutation", $('#idvallugSalutation').val());
    
}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwLoading_Start("xRefreshBtn", crLoadingHTML);
    //nwParameter_Add("txtCode", $("#txtCode").val());
    nwParameter_Add("txtID", $("#txtID").val());
    func_ActionDriven("actBindCollection", false);
    //RefreshData();
}

function func_ToolboxNavigatorBind_Empty() {

    //nwLoading_Start("xSample", crLoadingHTML);
    //RefreshData();
    //func_ActionDriven("actBindCollectionEmpty", false);

    nwLoading_Start("xSample", crLoadingHTML);
    RefreshData();
    nwParameter_Add("txtID", $('#txtID').val());
    func_ActionDriven("actBindCollectionEmpty", false);
}


///////////////////////////////////////

var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {

    var code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(0)").text();
    var desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(1)").text();
    var val3 = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(2)").text();
    var val4 = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(3)").text();

    var isValid;
    var combineId=''
    var doc = ''
    var docsource = ''
    var doctype=''
        
    if (idName == 'toolboxInquire') {

    } else if (idName == 'lugDefaultCWTTaxCode') {
        $('#idvallugDefaultVATTaxCode').val('')
        $('#descvallugDefaultVATTaxCode').val('')
        $('#idvallugDefaultVATTaxCode').val($('#idvallugDefaultCWTTaxCode').val())
        $('#descvallugDefaultVATTaxCode').val($('#descvallugDefaultCWTTaxCode').val())
    }
    else if (idName == 'DocDetails') {
        
        doc = code;
        docsource = getGridDataPerLine(`nwGrid1Con`, ``, SPR_DOCSOURCE, crnwTR.index()) || '';
        doctype = getGridDataPerLine(`nwGrid1Con`, ``, SPR_DOCTYPE, crnwTR.index()) || '';
        combineId = doc + docsource + doctype;

        isValid = nwLib.nwTempTable_Column_ValueExist("nwGrid1Con", SPR_COMBINE, combineId, false, "text", 0);

        if (isValid == false) {
            nwLib.nwTempTable_RowData_Set("nwGrid1Con", crnwTR.index(), SPR_DOCUMENT)(code);
            nwLib.nwTempTable_RowData_Set("nwGrid1Con", crnwTR.index(), SPR_DOCDESC)(desc);
            nwLib.nwTempTable_RowData_Set("nwGrid1Con", crnwTR.index(), SPR_COMBINE)(combineId);
            nwGrid_AddRow('nwGrid1Con', 1)
        }
        else
            MessageBox("Cannot Proceed. Record having the same Transaction Type, Financing Type, and Effective Date already exists.", pageTitle);

    } else if (idName == 'DocSource') {
        
        doc = getGridDataPerLine(`nwGrid1Con`, ``, SPR_DOCUMENT, crnwTR.index()) || '';;
        docsource = code;
        doctype = getGridDataPerLine(`nwGrid1Con`, ``, SPR_DOCTYPE, crnwTR.index()) || '';
        combineId = doc + docsource + doctype;
        isValid = nwLib.nwTempTable_Column_ValueExist("nwGrid1Con", SPR_COMBINE, combineId, false, "text", 0);
        if (isValid == false) {
            nwLib.nwTempTable_RowData_Set("nwGrid1Con", crnwTR.index(), SPR_DOCSOURCE)(code);
            nwLib.nwTempTable_RowData_Set("nwGrid1Con", crnwTR.index(), SPR_DOCSOURCEDESC)(desc);
            nwLib.nwTempTable_RowData_Set("nwGrid1Con", crnwTR.index(), SPR_COMBINE)(combineId);
        }
        else
            MessageBox("Cannot Proceed. Record having the same Transaction Type, Financing Type, and Effective Date already exists.", pageTitle);

    } else if (idName == 'DocType') {

        doc = getGridDataPerLine(`nwGrid1Con`, ``, SPR_DOCUMENT, crnwTR.index()) || '';;
        docsource = getGridDataPerLine(`nwGrid1Con`, ``, SPR_DOCSOURCE, crnwTR.index()) || '';
        doctype = code;
        combineId = doc + docsource + doctype;
        console.log(combineId);
        isValid = nwLib.nwTempTable_Column_ValueExist("nwGrid1Con", SPR_COMBINE, combineId, false, "text", 0);
        if (isValid == false) {
            nwLib.nwTempTable_RowData_Set("nwGrid1Con", crnwTR.index(), SPR_DOCTYPE)(code);
            nwLib.nwTempTable_RowData_Set("nwGrid1Con", crnwTR.index(), SPR_DOCTYPEDESC)(desc);
            nwLib.nwTempTable_RowData_Set("nwGrid1Con", crnwTR.index(), SPR_COMBINE)(combineId);
        }
        else
            MessageBox("Cannot Proceed. Record having the same Transaction Type, Financing Type, and Effective Date already exists.", pageTitle);
    }

    else if (idName == 'lugCopyFrom') {
        nwParameter_Add("txtID", code);
        func_ActionDriven("actCopyFrom", false);
    }

    else if (idName == 'lugSellerType')
    {
        level10Code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(0)").text();
        var level10Desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(1)").text();
        level9Code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(2)").text();
        var level9Desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(3)").text();
        level8Code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(4)").text();
        var level8Desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(5)").text();
        level7Code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(6)").text();
        var level7Desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(7)").text();
        level6Code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(8)").text();
        var level6Desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(9)").text();
        level5Code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(10)").text();
        var level5Desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(11)").text();
        level4Code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(12)").text();
        var level4Desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(13)").text();
        level3Code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(14)").text();
        var level3Desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(15)").text();
        level2Code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(16)").text();
        var level2Desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(17)").text();
        level1Code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(18)").text();
        var level1Desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(19)").text();
        
        nwParameter_Add("level1Code", level1Code);
        nwParameter_Add("level2Code", level2Code);
        nwParameter_Add("level3Code", level3Code);
        nwParameter_Add("level4Code", level4Code);
        nwParameter_Add("level5Code", level5Code);
        nwParameter_Add("level6Code", level6Code);
        nwParameter_Add("level7Code", level7Code);
        nwParameter_Add("level8Code", level8Code);
        nwParameter_Add("level9Code", level9Code);
        nwParameter_Add("level10Code", level10Code);

        if(level10Code != '')
        {
            $('#idvallugSellerType').val(level10Code);
            $('#descvallugSellerType').val(level10Desc);
            $('#txtCode').val(level9Code);
            $('#txtDesc').val(level9Desc);
        }
        else if (level9Code != '')
        {
            $('#idvallugSellerType').val(level9Code);
            $('#descvallugSellerType').val(level9Desc);
            $('#txtCode').val(level8Code);
            $('#txtDesc').val(level8Desc);
        }
        else if (level8Code != '')
        {
            $('#idvallugSellerType').val(level8Code);
            $('#descvallugSellerType').val(level8Desc);
            $('#txtCode').val(level7Code);
            $('#txtDesc').val(level7Desc);
        }
        else if (level7Code != '')
        {
            $('#idvallugSellerType').val(level7Code);
            $('#descvallugSellerType').val(level7Desc);
            $('#txtCode').val(level6Code);
            $('#txtDesc').val(level6Desc);
        }
        else if (level6Code != '')
        {
            $('#idvallugSellerType').val(level6Code);
            $('#descvallugSellerType').val(level6Desc);
            $('#txtCode').val(level5Code);
            $('#txtDesc').val(level5Desc);
        }
        else if (level5Code != '')
        {
            $('#idvallugSellerType').val(level5Code);
            $('#descvallugSellerType').val(level5Desc);
            $('#txtCode').val(level4Code);
            $('#txtDesc').val(level4Desc);
        }
        else if (level4Code != '')
        {
            $('#idvallugSellerType').val(level4Code);
            $('#descvallugSellerType').val(level4Desc);
            $('#txtCode').val(level3Code);
            $('#txtDesc').val(level3Desc);
        }
        else if (level3Code != '')
        {
            $('#idvallugSellerType').val(level3Code);
            $('#descvallugSellerType').val(level3Desc);
            $('#txtCode').val(level2Code);
            $('#txtDesc').val(level2Desc);
        }
        else if (level2Code != '') {
            $('#idvallugSellerType').val(level2Code);
            $('#descvallugSellerType').val(level2Desc);
            $('#txtCode').val(level1Code);
            $('#txtDesc').val(level1Desc);
        }
        else {
            $('#idvallugSellerType').val(level1Code);
            $('#descvallugSellerType').val(level1Desc);
            $('#txtCode').val('');
            $('#txtDesc').val('');
        }
    }

    //else if (idName == 'lugMktgGrpCode') {
    //    var sellertype = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(2)").text();
    //    var sellerTypeDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(3)").text();

    //    $('#idvallugSellerTypee').val(sellertype);
    //    $('#descvallugSellerTypee').val(sellerTypeDesc);
    //}

    else if (idName == 'lugMktgGrpCode') {
        $('#idvallugSellerTypee').val('');
        $('#idvallugSellerTypee').val('');

        $('#idvallugSellerTypee').val(val3);
        $('#descvallugSellerTypee').val(val4);


        if ($('#idvallugMktgGrpCode').val() != "") {
            level1Desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(4)").text();
            level2Desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(5)").text();
            level3Desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(6)").text();
            level4Desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(7)").text();
            level5Desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(8)").text();
            level6Desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(9)").text();
            level7Desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(10)").text();
            level8Desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(11)").text();
            level9Desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(12)").text();
            level10Desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(13)").text();


            config1 = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(14)").text();
            config2 = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(15)").text();
            config3 = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(16)").text();
            config4 = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(17)").text();
            config5 = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(18)").text();
            config6 = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(19)").text();
            config7 = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(20)").text();
            config8 = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(21)").text();
            config9 = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(22)").text();
            config10 = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(23)").text();
        }
        else {
            config1 = config2 = config3 = config4 = config5 = config6 = config7 = config8 = config9 = config10 = "";
            level1Desc = "Level 1";
            level2Desc = "Level 2";
            level3Desc = "Level 3";
            level4Desc = "Level 4";
            level5Desc = "Level 5";
            level6Desc = "Level 6";
            level7Desc = "Level 7";
            level8Desc = "Level 8";
            level9Desc = "Level 9";
            level10Desc = "Level 10";


            $('#idvallugSellerTypee').val('');
            $('#descvallugSellerTypee').val('');

        }

        $('#idvallugLvl1').val('');
        $('#idvallugLvl2').val('');
        $('#idvallugLvl3').val('');
        $('#idvallugLvl4').val('');
        $('#idvallugLvl5').val('');
        $('#idvallugLvl6').val('');
        $('#idvallugLvl7').val('');
        $('#idvallugLvl8').val('');
        $('#idvallugLvl9').val('');
        $('#idvallugLvl10').val('');


        $('#descvallugLvl1').val('');
        $('#descvallugLvl2').val('');
        $('#descvallugLvl3').val('');
        $('#descvallugLvl4').val('');
        $('#descvallugLvl5').val('');
        $('#descvallugLvl6').val('');
        $('#descvallugLvl7').val('');
        $('#descvallugLvl8').val('');
        $('#descvallugLvl9').val('');
        $('#descvallugLvl10').val('');

        $('#idvallugLocSegment').val('');
        $('#descvallugLocSegment').val('');


        jsonlevelconfig.push
        ({
            configlvl: 'level1',
            configval: config1 
        });
        jsonlevelconfig.push
       ({
           configlvl: 'level2',
           configval: config2
       });
        jsonlevelconfig.push
       ({
           configlvl: 'level3',
           configval: config3
       });
        jsonlevelconfig.push
       ({
           configlvl: 'level4',
           configval: config4
       });
        jsonlevelconfig.push
       ({
           configlvl: 'level5',
           configval: config5
       });
        jsonlevelconfig.push
       ({
           configlvl: 'level6',
           configval: config6
       });
        jsonlevelconfig.push
       ({
           configlvl: 'level7',
           configval: config7
       });
        jsonlevelconfig.push
       ({
           configlvl: 'level8',
           configval: config8
       });
        jsonlevelconfig.push
       ({
           configlvl: 'level9',
           configval: config9
       });
        jsonlevelconfig.push
       ({
           configlvl: 'level10',
           configval: config10
       });


        func_setlabelLevel(level1Desc, level2Desc, level3Desc, level4Desc, level5Desc, level6Desc, level7Desc, level8Desc, level9Desc, level10Desc);
        //nwParameter_Add("config1", config1);
        //nwParameter_Add("config2", config2);
        //nwParameter_Add("config3", config3);
        //nwParameter_Add("config4", config4);                                                                       
        //nwParameter_Add("config5", config5);
        //nwParameter_Add("config6", config6);
        //nwParameter_Add("config7", config7);
        //nwParameter_Add("config8", config8);
        //nwParameter_Add("config9", config9);
        //nwParameter_Add("config10", config10);
        //nwParameter_Add("jsonlevelconfig", jsonlevelconfig);
        nwParameter_Add("jsonlevelconfig", JSON.stringify(jsonlevelconfig));



    }
    else if (idName == "lugSalutation") {
        nwParameter_Add("salutation", $('#idvallugSalutation').val());
        func_ActionDriven("actSalutation", false);
    }

    else if (idName == "lugLvl3") {
        if ($('#idvallugLvl3').val() != originofSale) {
            $('#idvallugLocSegment').val('')
            $('#descvallugLocSegment').val('')
        }
    }

}



function func_setlabelLevel(level1Desc, level2Desc, level3Desc, level4Desc, level5Desc, level6Desc, level7Desc, level8Desc, level9Desc, level10Desc ) {

    level1Desc = level1Desc.replace("/", "'");
    level2Desc = level2Desc.replace("/", "'");
    level3Desc = level3Desc.replace("/", "'");
    level4Desc = level4Desc.replace("/", "'");
    level5Desc = level5Desc.replace("/", "'");
    level6Desc = level6Desc.replace("/", "'");
    level7Desc = level7Desc.replace("/", "'");
    level8Desc = level8Desc.replace("/", "'");
    level9Desc = level9Desc.replace("/", "'");
    level10Desc = level10Desc.replace("/", "'");


    $('#lbllvl1').html(level1Desc.includes("Level") ? level1Desc : (level1Desc + '<span class="nwRequiredField">*</span>'));
    $('#lbllvl2').html(level2Desc.includes("Level") ? level2Desc : (level2Desc + '<span class="nwRequiredField">*</span>'));
    $('#lbllvl3').html(level3Desc.includes("Level") ? level3Desc : (level3Desc + '<span class="nwRequiredField">*</span>'));
    $('#lbllvl4').html(level4Desc.includes("Level") ? level4Desc : (level4Desc + '<span class="nwRequiredField">*</span>'));
    $('#lbllvl5').html(level5Desc.includes("Level") ? level5Desc : (level5Desc + '<span class="nwRequiredField">*</span>'));
    $('#lbllvl6').html(level6Desc.includes("Level") ? level6Desc : (level6Desc + '<span class="nwRequiredField">*</span>'));
    $('#lbllvl7').html(level7Desc.includes("Level") ? level7Desc : (level7Desc + '<span class="nwRequiredField">*</span>'));
    $('#lbllvl8').html(level8Desc.includes("Level") ? level8Desc : (level8Desc + '<span class="nwRequiredField">*</span>'));
    $('#lbllvl9').html(level9Desc.includes("Level") ? level9Desc : (level9Desc + '<span class="nwRequiredField">*</span>'));
    $('#lbllvl10').html(level10Desc.includes("Level") ? level10Desc : (level10Desc + '<span class="nwRequiredField">*</span>'));


  
        if (level1Desc.includes("Level"))
            $("#lugLvl1").addClass("adisabled");
        else
            $("#lugLvl1").removeClass("adisabled");


        if (level2Desc.includes("Level"))
            $("#lugLvl2").addClass("adisabled");
        else
            $("#lugLvl2").removeClass("adisabled");

        if (level3Desc.includes("Level"))
            $("#lugLvl3").addClass("adisabled");
        else
            $("#lugLvl3").removeClass("adisabled");

        if (level4Desc.includes("Level"))
            $("#lugLvl4").addClass("adisabled");
        else
            $("#lugLvl4").removeClass("adisabled");

        if (level5Desc.includes("Level"))
            $("#lugLvl5").addClass("adisabled");
        else
            $("#lugLvl5").removeClass("adisabled");

        if (level6Desc.includes("Level"))
            $("#lugLvl6").addClass("adisabled");
        else
            $("#lugLvl6").removeClass("adisabled");

        if (level7Desc.includes("Level"))
            $("#lugLvl7").addClass("adisabled");
        else
            $("#lugLvl7").removeClass("adisabled");

        if (level8Desc.includes("Level"))
            $("#lugLvl8").addClass("adisabled");
        else
            $("#lugLvl8").removeClass("adisabled");

        if (level9Desc.includes("Level"))
            $("#lugLvl9").addClass("adisabled");
        else
            $("#lugLvl9").removeClass("adisabled");

        if (level10Desc.includes("Level"))
            $("#lugLvl10").addClass("adisabled");
        else
            $("#lugLvl10").removeClass("adisabled");

  

}



function checkDuplicate()

{
    var count = $('#nwGrid1Con-nwData tr').length;
    for (i = 0; i <= count; i++) {
        doc = $('#nwGrid1Con-nwData tr:eq(' + i + ') td:eq(' + SPR_DOCUMENT + ')').text();
        docsource = $('#nwGrid1Con-nwData tr:eq(' + i + ') td:eq(' + SPR_DOCSOURCE + ')').text();
        doctype = $('#nwGrid1Con-nwData tr:eq(' + i + ') td:eq(' + SPR_DOCTYPE + ')').text();
        combineId = doc + docsource + doctype;
        $('#nwGrid1Con-nwData tr:eq(' + i + ') td:eq(' + SPR_COMBINE + ')').text(combineId);
    }
    
}

function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
    var Code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text()
    var Desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text()

    crnwTRtemp.find('td:eq(' + SPR_EMPLOYEE + ') ').text(Code)
    crnwTRtemp.find('td:eq(' + SPR_EMPLOYEE_CODE + ') ').text(Desc)

    var cnt = nwLib.nwTempTable_Row_Count("nwGrid1Con");

    nwGrid_AddRow("nwGrid1Con", 1);

    return crnwTRtemp;
}


function EnableFields() {
    $(".noah-webui-default-Content_Container").enable(true);
    $("#rbIndividual").enable(true);
    $("#rbCompany").enable(true);

    $('#txtCrossReference').enable(true);
    $('#lugSellergroup').enable(true);
    $('#lugSellerType').enable(true);
    $('#lugSellerRole').enable(true);
    $('#lugSellerStatus').enable(true);
    $('#txtPRCNo').enable(true);
    $('#lugSalutation').enable(true);
    $("#txtLastName").enable(true);
    $("#txtFirstName").enable(true);
    $('#txtMiddleName').enable(true);
    $('#txtMaidenName').enable(true);
    $('#txtMotherMaidenName').enable(true);
    $('#lugNameSuffix').enable(true);
    $('#txtBirthdate').enable(true);
    $('#lugGender').enable(true);
    $('#lugCivilStatus').enable(true);
    $('#lugNationality').removeClass("adisabled");
    $('#txtPlaceofBirth').enable(true);
    $('#txtIndividualTIN').enable(true);
    $('#txtRegisteredName').enable(false);
    $('#rbVAT').enable(true);
    $('#rbnonVAT').enable(true);
    $('#txtVATRegTIN').enable(true);

    $('#lugDefaultVATTaxCode').removeClass("adisabled");
    $('#lugDefaultCWTTaxCode').removeClass("adisabled");
    $('#txtSSSNumber').enable(true);
    $('#txtPagIBIGNumber').enable(true);
    $('#txtPhilHealthNo').enable(true);
    $('#txtMobile').enable(true);
    $('#txtTelephone').enable(true);
    $('#txtEmail').enable(true);
    $('#txtsellerAdd1').enable(true);
    $('#txtSellerAdd2').enable(true);
    $('#txtRecruitDate').enable(true);
    $('#lugRecruitedBy').removeClass("adisabled");
    $('#txtFirstSaleDate').enable(true);
    
    $('#nwGrid1Con').enable(true);

    $('#txtNonVATRegTIN').enable(false);
    $("#noah-webui-default-Update").enable(false);

    //LAM
    $('#lugMktgGrpCode').enable(true);
    $('#lugLocSegment').enable(true);
    $('#lugDefaultVATCode').enable(true);
    $('#lugSellerContractType').enable(true);
    $('#lugSellerCotractStatus').enable(true);
    $('#txtContractDurationFrom').enable(true);
    $('#txtContractDurationTo').enable(true);
}

function DisableFields() {
    $(".noah-webui-default-Content_Container").enable(false);
    $("#rbIndividual").enable(false);
    $("#rbCompany").enable(false);
    //$('#txtCrossReference').enable(false);
    $('#lugSellergroup').addClass("adisabled");
    $('#lugSellerType').addClass("adisabled");
    $('#lugSellerRole').addClass("adisabled");
    $('#lugSellerStatus').addClass("adisabled");
    $('#txtPRCNo').enable(false);
    $('#lugSalutation').addClass("adisabled");
    $("#txtLastName").enable(false);
    $("#txtFirstName").enable(false);
    $('#txtMiddleName').enable(false);
    $('#txtMaidenName').enable(false);
    $('#txtMotherMaidenName').enable(false);
    $('#lugNameSuffix').addClass("adisabled");
    $('#txtBirthdate').enable(false);
    $('#lugGender').addClass("adisabled");
    $('#lugCivilStatus').addClass("adisabled");
    $('#lugNationality').addClass("adisabled");
    $('#txtPlaceofBirth').enable(false);
    $('#txtIndividualTIN').enable(false);
    $('#txtRegisteredName').enable(false);
    $('#rbVAT').enable(false);
    $('#rbnonVAT').enable(false);
    $('#txtVATRegTIN').enable(false);
    $('#txtNonVATRegTIN').enable(false);
    $('#lugDefaultVATTaxCode').addClass("adisabled");
    $('#lugDefaultCWTTaxCode').addClass("adisabled");
    $('#txtSSSNumber').enable(false);
    $('#txtPagIBIGNumber').enable(false);
    $('#txtPhilHealthNo').enable(false);
    $('#txtMobile').enable(false);
    $('#txtTelephone').enable(false);
    $('#txtEmail').enable(false);
    $('#txtsellerAdd1').enable(false);
    $('#txtSellerAdd2').enable(false);
    $('#txtRecruitDate').enable(false);
    $('#lugRecruitedBy').addClass("adisabled");
    $('#txtFirstSaleDate').enable(false);

    $('#txtPassportIDNumber').enable(false);

    $('#nwGrid1Con').enable(false);
    $(".nwSellerCategory").enable(false);
    $("#noah-webui-default-Update").enable(false);

    $('#lblVatregTin').hide();
    $('#lblNonVatregTin').hide();
    $('#lblCorpVat').hide();
}

function EnableFieldsDone() {//Binding Done
   
    $("#txtRecordStatus").val();

    if ($("#txtRecordStatus").val() == "For Approval" || $("#txtRecordStatus").val() == "Approved")
    {
        $(".noah-webui-default-Content_Container").enable(false);
        $("#rbIndividual").enable(false);
        $("#rbCompany").enable(false);
        //$('#txtCrossReference').enable(false);
        $('#lugSellergroup').addClass("adisabled");
        $('#lugSellerType').addClass("adisabled");
        $('#lugSellerRole').addClass("adisabled");
        $('#lugSellerStatus').addClass("adisabled");
        $('#txtPRCNo').enable(false);
        $('#lugSalutation').addClass("adisabled");
        $("#txtLastName").enable(false);
        $("#txtFirstName").enable(false);
        $('#txtMiddleName').enable(false);
        $('#txtMaidenName').enable(false);
        $('#txtMotherMaidenName').enable(false);
        $('#lugNameSuffix').addClass("adisabled");
        $('#txtBirthdate').enable(false);
        $('#lugGender').addClass("adisabled");
        $('#lugCivilStatus').addClass("adisabled");
        $('#lugNationality').addClass("adisabled");
        $('#txtPlaceofBirth').enable(false);
        $('#txtIndividualTIN').enable(false);
        $('#txtRegisteredName').enable(false);
        $('#rbVAT').enable(false);
        $('#rbnonVAT').enable(false);
        $('#txtVATRegTIN').enable(false);
        $('#txtNonVATRegTIN').enable(false);
        $('#txtSSSNumber').prop("disabled", true);
        $('#txtPagIBIGNumber').enable(false);
        $('#txtPhilHealthNo').enable(false);
        $('#txtMobile').enable(false);
        $('#txtTelephone').enable(false);
        $('#txtEmail').enable(false);
        $('#txtsellerAdd1').enable(false);
        $('#txtSellerAdd2').enable(false);
        $('#txtRecruitDate').enable(false);
        $('#lugRecruitedBy').enable(true);
        $('#txtFirstSaleDate').enable(false);
        $('#lugMktgGrpCode').enable(false);
        $('#nwGrid1Con').enable(false);
        $(".nwSellerCategory").enable(false);
        $("#noah-webui-default-Update").enable(false);
        $("#txtContractDurationFrom").enable(true);
        $("#txtContractDurationTo").enable(true);
        $("#txtContractDurationFrom").enable(true);
        $("#txtContractDurationTo").enable(true);
        $("#txtPassportIDNumber").enable(false);
        $('#lugLocSegment').enable(false);
        $('#lugSellerStatus').enable(true);
    }

    $(".noah-webui-default-Content_Container").enable(true);
    //$('#lugTrantype').removeClass('adisabled');
    $('#lugSellerStatus').enable(true);
    $('#lugLocSegment').enable(true);
    //$('#txtEffectiveDate').prop("disabled", false);
    $('#txtCrossReference').enable(true);
    $(".nwSellerCategory").enable(false);
    $('#lugSellergroup').enable(false);
    $('#lugSellerType').enable(false);
    $('#lugSellerRole').enable(false);
    $('#txtPRCNo').enable(true);
    $('#lugMktgGrpCode').enable(true);

    if ($('#rbIndividual').prop("checked")) {
        $('#lugSalutation').addClass("adisabled");
        $("#txtLastName").enable(true);
        $("#txtFirstName").enable(true);
        $('#txtMiddleName').enable(true);
        $('#txtMaidenName').enable(true);
        $('#txtMotherMaidenName').enable(true);
        $('#lugNameSuffix').addClass("adisabled");
        $('#txtBirthdate').enable(false);
        $('#lugGender').addClass("adisabled");
        $('#lugCivilStatus').addClass("adisabled");
        $('#lugNationality').addClass("adisabled");
        $('#txtPlaceofBirth').enable(true);
        $('#txtIndividualTIN').enable(false);
    }
  

    $('#rbVAT').enable(false);
    $('#rbnonVAT').enable(false);
    $('#txtVATRegTIN').enable(false);

    $('#lugDefaultVATCode').enable(true);
    $('#lugDefaultCWTTaxCode').enable(true);
    $('#txtSSSNumber').enable(true);
    $('#txtPagIBIGNumber').enable(true);
    $('#txtPhilHealthNo').enable(true);
    $('#txtMobile').enable(true);
    $('#txtTelephone').enable(true);
    $('#txtEmail').enable(true);
    $('#txtsellerAdd1').enable(true);
    $('#txtSellerAdd2').enable(true);
    $('#txtRecruitDate').enable(true);
    $('#lugRecruitedBy').enable(true);
    $('#txtFirstSaleDate').enable(true);

    $("#txtContractDurationFrom").enable(true);
    $("#txtContractDurationTo").enable(true);
    $('#nwGrid1Con').enable(false);

    $('#txtNonVATRegTIN').enable(false);

    //$('#txtRegisteredName').enable(false);
    if ($("#rbIndividual").prop("checked")) {
        $('#txtRegisteredName').enable(false);
        $("#lblSalutation").show();
        $("#lblLastName").show();
        $("#lblFirstName").show();

        $('#lblBirthdate').show();
        $("#lblGender").show();
        $("#lblCivilStatus").show();
        $('#lblNationality').show();
        $('#lblIndividualTIN').show();

        $('#lblRegisteredName').hide();
        $('#lblVatregTin').hide();
        $('#lblNonVatregTin').hide();
        $('#lblCorpVat').hide();
    } else {
        $('#txtRegisteredName').enable(true);

        $("#lblSalutation").hide();
        $("#lblLastName").hide();
        $("#lblFirstName").hide();

        $('#lblBirthdate').hide();
        $("#lblGender").hide();
        $("#lblCivilStatus").hide();
        $('#lblNationality').hide();
        $('#lblIndividualTIN').hide();

        $('#lblRegisteredName').show();
    }

 
    $("#noah-webui-Toolbox").bindingProcess().enable(true);
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);

    if (seller != ""){
         $("#noah-webui-Toolbox").bindingDelete().visible(false);
    }
    else{
         $("#noah-webui-Toolbox").bindingDelete().visible(true);
    }
   
    $("#noah-webui-default-Update").enable(true);

    cust_GetPara();

}


function DisableFieldsEmpty() {
    //DisableFields();
    $(".noah-webui-default-Content_Container").enable(false);
    $('#nwGrid1Con').enable(false);
    $('#txtCrossReference').enable(false);
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-default-Update").enable(false);
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();

    //document.getElementById("txtRecordStatus").style.borderColor = "#ccc"
    //document.getElementById("txtUpdateStatus").style.borderColor = "#ccc"
}




var serverDate = new Date();
$(document).on("focus", ".custom-date-picker", function () {
    var $this = $(this);
    var $val = $this.val() || "";
    $this.mask("destroy");
    $this.mask("99/99/9999");
    $this.removeClass("hasDatepicker");
    $this.datepicker("destroy");
    $this.datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "c-150:c+150",
        minDate: new Date(serverDate),
    });
    $this.val($val);
});

function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {

    var trantype = $('#idvallugTrantype').val();
    //var financetype = $('#idvallugFinancingType').val();
    var effdate = $('#txtEffectiveDate').val();
    cust_GetPara();
    var nwobjID = nwobj.attr('id');
    if (nwobjID == "nwmyGrid") {
        if (crnwTD.index() == SPR_COMMRELCODE) {
            lookUpCustomize("lugCommRel", 2);
        }
    }
}


$(document).on("change", ".txtEffectiveDate", function () {
    var index = $(".txtEffectiveDate").index(this);
    var oopen = $(this).val();
    var dated = getCSD;

    var Date1 = new Date(dated);
    var Date2 = new Date(oopen);

    if (Date2 > Date1) {
        MessageBox("Cannot continue. Date Issued should not be later than the current server date.");
        nwTempTable_RowData_Set('nwGrid1Con', index, SPR_DATEISSUED, 'input')('');
        
    }
});





$(document).on("click", "#btnCopyFrom", function (e) {

    var id = $('#txtID').val();
    if (id != '') return true;

    var tranType = $('#idvallugTrantype').val();
    var EffectivityDate = $('#txtEffectivityDate').val();

    if (tranType == '' || EffectivityDate == '') {
        MessageBox("Cannot Proceed. Please complete the header.", pageTitle);
        return true;
    }
    else {
        lookUpCustomize("lugCopyFrom", 1);
    }
    return false;
});



function getGridDataPerLine(nwGrid, type, col, row) {
    var data;
    if (type == `input`)
        data = $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col}) input`).val();
    else
        data = $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col})`).text();
    return data;
}

var getCSD = "";
$(document).on('change', '#txtEffectivityDateHDR', function () {
    
    var oopen = $(this).val();
    var dated = getCSD;

    var Date1 = new Date(dated);
    var Date2 = new Date(oopen);

    if (Date2 < Date1) {
        MessageBox("Cannot continue. Effective Date should not be ealier than the current server date.");
        $("#txtEffectivityDateHDR").val("");
    }
});

$(document).on("keyup", "#txtTelephone", function () {
    var yourInput = $(this).val();
    re = /[.`~!@#$%^&*()_|\=?;:'",<>\{\}\[\]\\\/a-zA-Z]/gi;
    var isSplChar = re.test(yourInput);
    if (isSplChar) {
        var no_spl_char = yourInput.replace(/[.`~!@#$%^&*()_|\=?;:'",<>\{\}\[\]\\\/a-zA-Z]/gi, '');
        $(this).val(no_spl_char);
    }
});
//$(document).on('change', '#rbIndividual', function () {

//    if ($("#rbIndividual").prop("checked")) {
//        EnableFieldsIndividual();
//        ClearFields();
//    }
//});

//$(document).on('change', '#rbCompany', function () {

//    if ($("#rbCompany").prop("checked")) {
//        EnableFieldsCompany();
//        ClearFields();
//    }
//});

function EnableFieldsIndividual() {
    $('#txtCrossReference').enable(true);
    $('#lugSellergroup').removeClass("adisabled");
    $('#lugSellerType').removeClass("adisabled");
    $('#lugSellerRole').removeClass("adisabled");
    $('#lugSellerStatus').removeClass("adisabled");
    $('#txtPRCNo').enable(true);
    $('#lugSalutation').removeClass("adisabled");
    $("#txtLastName").enable(true);
    $("#txtFirstName").enable(true);
    $('#txtMiddleName').enable(true);
    $('#txtMaidenName').enable(true);
    $('#txtMotherMaidenName').enable(true);
    $('#lugNameSuffix').removeClass("adisabled");
    $('#txtBirthdate').enable(true);
    $('#lugGender').removeClass("adisabled");
    $('#lugCivilStatus').removeClass("adisabled");
    $('#lugNationality').removeClass("adisabled");
    $('#txtPlaceofBirth').enable(true);
    $('#txtIndividualTIN').enable(true);
    $('#txtRegisteredName').enable(false);
    $('#rbVAT').enable(false);
    $('#rbnonVAT').enable(false);
    $('#txtVATRegTIN').enable(false);
    $('#txtNonVATRegTIN').enable(false);
    $('#lugDefaultVATTaxCode').removeClass("adisabled");
    $('#lugDefaultCWTTaxCode').removeClass("adisabled");
    $('#txtSSSNumber').enable(true);
    $('#txtPagIBIGNumber').enable(true);
    $('#txtPhilHealthNo').enable(true);
    $('#txtMobile').enable(true);
    $('#txtTelephone').enable(true);
    $('#txtEmail').enable(true);
    $('#txtsellerAdd1').enable(true);
    $('#txtSellerAdd2').enable(true);
    $('#txtRecruitDate').enable(true);
    $('#lugRecruitedBy').removeClass("adisabled");
    $('#txtFirstSaleDate').enable(true);

    $('#txtPassportIDNumber').enable(true);
    
    $("#lblSalutation").show();
    $("#lblLastName").show();
    $("#lblFirstName").show();

    $('#lblBirthdate').show();
    $("#lblGender").show();
    $("#lblCivilStatus").show();
    $('#lblNationality').show();
    $('#lblIndividualTIN').show();

    $('#lblRegisteredName').hide();
    $('#lblVatregTin').hide();
    $('#lblNonVatregTin').hide();
    $('#lblCorpVat').hide();
    document.getElementById("txtRecordStatus").style.borderColor = "#ccc"
    document.getElementById("txtUpdateStatus").style.borderColor = "#ccc"
}

function EnableFieldsCompany() {
    $('#txtCrossReference').enable(true);
    $('#lugSellergroup').removeClass("adisabled");
    $('#lugSellerType').removeClass("adisabled");
    $('#lugSellerRole').removeClass("adisabled");
    $('#lugSellerStatus').removeClass("adisabled");
    $('#txtPRCNo').enable(true);
    $('#lugSalutation').addClass("adisabled");
    $("#txtLastName").enable(false);
    $("#txtFirstName").enable(false);
    $('#txtMiddleName').enable(false);
    $('#txtMaidenName').enable(false);
    $('#txtMotherMaidenName').enable(false);
    $('#lugNameSuffix').addClass("adisabled");
    $('#txtBirthdate').enable(false);
    $('#lugGender').addClass("adisabled");
    $('#lugCivilStatus').addClass("adisabled");
    $('#lugNationality').addClass("adisabled");
    $('#txtPlaceofBirth').enable(false);
    $('#txtIndividualTIN').enable(false);
    $('#txtRegisteredName').enable(true);
    $('#rbVAT').enable(true);
    $('#rbnonVAT').enable(true);
    //$('#txtVATRegTIN').enable(true);
    //$('#txtNonVATRegTIN').enable(true);
    $('#lugDefaultVATTaxCode').removeClass("adisabled");
    $('#lugDefaultCWTTaxCode').removeClass("adisabled");
    $('#txtSSSNumber').enable(true);
    $('#txtPagIBIGNumber').enable(true);
    $('#txtPhilHealthNo').enable(true);
    $('#txtMobile').enable(true);
    $('#txtTelephone').enable(true);
    $('#txtEmail').enable(true);
    $('#txtsellerAdd1').enable(true);
    $('#txtSellerAdd2').enable(true);
    $('#txtRecruitDate').enable(true);
    $('#lugRecruitedBy').removeClass("adisabled");
    $('#txtFirstSaleDate').enable(true);

    $('#txtPassportIDNumber').enable(false);

    $("#lblSalutation").hide();
    $("#lblLastName").hide();
    $("#lblFirstName").hide();

    $('#lblBirthdate').hide();
    $("#lblGender").hide();
    $("#lblCivilStatus").hide();
    $('#lblNationality').hide();
    $('#lblIndividualTIN').hide();

    $('#lblRegisteredName').show();
    $('#lblCorpVat').show();

    if ($("#rbVAT").prop("checked")){
        $('#txtVATRegTIN').enable(true);
        $('#lblVatregTin').show();
    }

}

function ClearFields() {
    $('#txtCrossReference').val("");
    $('#idvallugSellergroup').val("");
    $('#descvallugSellergroup').val("");
    $('#idvallugSellerType').val("");
    $('#descvallugSellerType').val("");
    $('#idvallugSellerRole').val("");
    $('#descvallugSellerRole').val("");
    $('#idvallugSellerStatus').val("");
    $('#descvallugSellerStatus').val("");
    $('#txtPRCNo').val("");
    $('#idvallugSalutation').val("");
    $('#descvallugSalutation').val("");
    $("#txtLastName").val("");
    $("#txtFirstName").val("");
    $('#txtMiddleName').val("");
    $('#txtMI').val("");
    $('#txtMaidenName').val("");
    $('#txtMotherMaidenName').val("");
    $('#idvallugNameSuffix').val("");
    $('#descvallugNameSuffix').val("");
    $('#txtBirthdate').val("");
    $('#txtAge').val("");
    $('#idvallugGender').val("");
    $('#descvallugGender').val("");
    $('#idvallugCivilStatus').val("");
    $('#descvallugCivilStatus').val("");
    $('#idvallugNationality').val("");
    $('#descvallugNationality').val("");
    $('#txtPlaceofBirth').val("");
    $('#txtIndividualTIN').val("");
    $('#txtRegisteredName').val("");
    $('#rbVAT').val("");
    $('#rbnonVAT').val("");
    $('#txtVATRegTIN').val("");
    $('#txtNonVATRegTIN').val("");
    $('#idvallugDefaultVATTaxCode').val("");
    $('#descvallugDefaultVATTaxCode').val("");
    $('#idvallugDefaultCWTTaxCode').val("");
    $('#descvallugDefaultCWTTaxCode').val("");
    $('#txtSSSNumber').val("");
    $('#txtPagIBIGNumber').val("");
    $('#txtPhilHealthNo').val("");
    $('#txtMobile').val("");
    $('#txtTelephone').val("");
    $('#txtEmail').val("");
    $('#txtsellerAdd1').val("");
    $('#txtSellerAdd2').val("");
    $('#txtRecruitDate').val("");
    $('#idvallugRecruitedBy').val("");
    $('#descvallugRecruitedBy').val("");
    $('#txtFirstSaleDate').val("");
    //url('images/placeholder.png')
    $("#profile-img").css('background-image', "");
    $("#profile-img-signature").css('background-image', '');
    $('#txtUpdateButton').val("");
    $('#txtStatusCode').val("");
}



//$(document).on("click", "#profile-box #attachIDPicture", function (e) {
//    if ($("#txtSellerCode").val() == '') {
//        MessageBox("Cannot Proceed. Please save the record first.", "Seller Information");
//        e.preventDefault();
//        return true;
//    }
//    else {
//        $("#webcam-form").remove();
//        $($(this).parent(0)).append('<form id="webcam-form" style="display:none"><input type="file" id="webcam" class="webcam-manual" name="webcam" accept="image/*" /></form>');
//        $("#webcam-form:eq(0) input:eq(0)").click();
//        e.preventDefault();
//    }

//});

///LAM


let $btn = "";
$(document).on("click", "#profile-box #attachIDPicture", function (e) {
    $btn = "attachIDPicture";
    if ($("#txtSellerCode").val() == '') {
        MessageBox("Cannot Proceed. Please save the record first.", "Seller Information");
        e.preventDefault();
        return true;
    }
    else {
        //$("#webcam-form").remove();
        //$($(this).parent(0)).append('<form id="webcam-form" style="display:none"><input type="file" id="webcam" class="webcam-manual" name="webcam" accept="image/*" /></form>');
        //$("#webcam-form:eq(0) input:eq(0)").click();
        //e.preventDefault();
        $(".bar").css("width", "0%");
        $(".percent").text("0%");
        $("#status span").text("");

        nwPopupForm_ShowModal("nwUploadCon");
    }
    return false;
});

////***********
//$(document).on("click", "#profile-box #btnCaptureImage", function (e) {
//    e.preventDefault();
//    nwPopupForm_ShowModal("nwCaptureForm");
//});

//$(document).on("click", "#profile-box #btnCaptureImage", function (e) {
//    e.preventDefault();
//});
////***********
//$(document).on("submit", "#webcam-form", function (e) {
//    e.preventDefault();
//    var sellerCode = $("#txtSellerCode").val() || "";
//    var serverPath = $("#txtServerLink").val() || "";
//    var url = "SellerImageUpload.ashx?sellerCode=" + sellerCode + "&recuser=" + encodeURIComponent(recuser) + "&serverPath=" + serverPath + "&uploadTrigger=0";

//    ///create a new FormData object
//    var formData = new FormData(); //var formData = new FormData($('form')[0]);

//    ///get the file and append it to the FormData object
//    formData.append('webcam', $('#webcam')[0].files[0]);

//    $.ajax({
//        url: url, // Url to which the request is send
//        type: "POST",
//        contentType: "application/octet-stream",
//        dataType: "json",
//        timeout: 18000,
//        data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
//        contentType: false,       // The content type used when sending data to the server.
//        cache: false,             // To unable request pages to be cached
//        processData: false,        // To send DOMDocument or non processed data file it is set to false
//        complete: function (status, data)   // A function to be called if request succeeds
//        {
//            console.log(status);
//            var json = $.parseJSON(status.responseText);
//            if (status.status == 200) {
//                parent_MessageBox(DECODE(json.data))
//                cust_GetPara();
//                func_ActionDriven("actBindCollection", false);
//            } else {
//                parent_MessageBox("Cannot upload image.")
//            }
//        }
//    });
//});

//function ENCODE(txt) {
//    return encodeURIComponent(escape(txt));
//}
//function DECODE(txt) {
//    return unescape(decodeURIComponent(txt));
//}

//$(document).on("change", "#webcam.webcam-manual", function () {
//    if (this.files[0].size > 10048576) {
//        parent_MessageBox("Image is too large");
//    } else {
//        $("#webcam-form").submit();
//    }
//});

//function upload() {

//    if ($("input[type = 'file']").val() == "") {
//        $("#status").html("<span style=\"color:red;\">Please select file to upload!</span>");
//        (function () {
//            var bar = $('.bar');
//            var percent = $('.percent');
//            var status = $('#status');
//            $('form').ajaxForm({
//                beforeSend: function () {

//                },
//                uploadProgress: function (event, position, total, percentComplete) {
//                },
//                success: function () {
//                },
//                complete: function (xhr) {
//                }
//            });
//        })();
//    } else {
//        (function () {
//            var bar = $('.bar');
//            var percent = $('.percent');
//            var status = $('#status');

//            try {

//                $('form').ajaxForm({
//                    beforeSend: function () {
//                        status.empty();
//                        var percentVal = '0%';
//                        bar.width(percentVal)
//                        percent.html(percentVal);
//                    },

//                    uploadProgress: function (event, position, total, percentComplete) {
//                        var percentVal = percentComplete + '%';
//                        bar.width(percentVal)
//                        percent.html(percentVal);
//                    },

//                    success: function () {
//                        var percentVal = '100%';
//                        bar.width(percentVal)
//                        percent.html(percentVal);
//                    },

//                    complete: function (xhr) {
//                        nwLoading_Start("xSample", crLoadingHTML);
//                        $('#status').html(xhr.responseText);

//                        //Action or Trigger When Closing of Pop-up
//                        var linkcat = "";
//                        //var tempindex = crnwTR.index();
//                        var filepath = "";
//                        var path = "";
//                        var serverlink = $("#txtserverlink").val();

//                        //For Button Catalogue Attach
//                        filepath = $("#nwUploadCon .aagfilename").text();

//                        path = "\\" + 'BMSellerInformation' + "\\" + filepath;

//                        if (filepath != "") {
//                            linkcat = serverlink + path;

//                            $('#txtPath').val(path);
//                            $('#btnDownload').attr({ "href": linkcat, "title": "\'Download\'", "download": "" });
//                            $('#btnDownload').addClass("btnMaylaman");

//                            //nwParameter_Add("txtPath", path);
//                            //nwParameter_Add("txtCode", $("#txtCode").val());
//                            //func_ActionDriven('actSaveAttachment', false);
//                        }
//                        nwLoading_End("xSample", crLoadingHTML);
//                    }
//                });
//            } catch (err) {
//                alert(err);
//            }
//        })();
//    }
//}


$(document).on("focus", '#txtBirthdate', function (e) {

    $('#txtBirthdate').datepicker();
    $('#txtBirthdate').mask('99/99/9999');


});

$(document).on("focus", '#txtRecruitDate', function (e) {

    $('#txtRecruitDate').datepicker();
    $('#txtRecruitDate').mask('99/99/9999');
});

$(document).on("focus", '#txtFirstSaleDate', function (e) {

    $('#txtFirstSaleDate').datepicker();
    $('#txtFirstSaleDate').mask('99/99/9999');
});

$(document).on("focus", '#txtModeEffective', function (e) {

    $('#txtModeEffective').datepicker();
    $('#txtModeEffective').mask('99/99/9999');
});


$(document).on("focus", '#txtIndividualTIN', function (e) {
    $('#txtIndividualTIN').mask('?999-999-999-9999*');
});

$(document).on("focus", '#txtVATRegTIN', function (e) {
    $('#txtVATRegTIN').mask('?999-999-999-9999*');
});

$(document).on("focus", '#txtNonVATRegTIN', function (e) {
    $('#txtNonVATRegTIN').mask('?999-999-999-9999*');
});





$(document).on("change blur", '#txtVATRegTIN, #txtNonVATRegTIN ', function (e) {
    if ($(this).val() != "") {
        cust_GetPara();
        var custType = $('#rbIndividual').prop("checked");
        nwParameter_Add("custType", custType);
        nwParameter_Add("regTIN", $(this).val())
        func_ActionDriven("actCheckSellerDedup", false);
    }
});

$(document).on("keydown", '#txtBirthdate', function (e) {
    var custType = $('#rbIndividual').prop("checked");
    
    if (($('#txtLastName').val() == '') || ($('#txtFirstName').val() == '')) {
        $('#txtBirthdate').val("");
        return false;
    } else {
        return true;
    }
});

$(document).on("change blur", '#txtBirthdate', function (e) {
    var custType = $('#rbIndividual').prop("checked");
    
    if (($('#txtLastName').val() == '') || ($('#txtFirstName').val() == '')) {
        $('#txtBirthdate').val("");
        return false;
    } else {
        var Current = getCSD;
        var Birthdateold = $('#txtBirthdate').val();

        if (Date.parse(Current) < Date.parse(Birthdateold)) {

            MessageBox("Cannot continue. Date of Birth should not be later than the current server date.", "Seller Information");
            $('#txtBirthdate').val("");
        }
        else {
            var dob = $('#txtBirthdate').val();
            if (dob != '') {
                dob = new Date(dob);
                var today = new Date();
                var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
                $('#txtAge').val(age);
            }
            nwLoading_Start('actCheckSellerDedup');
            cust_GetPara();
            nwParameter_Add("custType", custType);
            nwParameter_Add("txtBirthdate", $('#txtBirthdate').val())
            func_ActionDriven("actCheckSellerDedup", false);
        }
    }
});

$(document).on("change", '#txtMiddleName', function (e) {

    var str = $('#txtMiddleName').val();
    str = str.trim();
    //var res = str.substring(1, 0)
    var res = str.match(/\b(\w)/g).substring(1, 0);


    $('#txtMI').val(res.join('. ').toUpperCase() + '.');
});

//$(document).on("click", "#btnModeofcommision", function (e) {
//    if ($("#txtSellerCode").val() == '') {
//        MessageBox("Cannot Proceed. Please save the record first.", "Seller Information");
//        e.preventDefault();
//        return true;
//    }
//    else {
//        nwPopupForm_ShowModal("nwModeOfCommisionReleaseDtls");

//        func_ActionDriven("actGenerateDocDetails", false);
//        e.preventDefault();


//    }
//});

//$(document).on("click", "#btnBankAcct", function (e) {
//    if ($("#txtSellerCode").val() == '') {
//        MessageBox("Cannot Proceed. Please save the record first.", "Seller Information");
//        e.preventDefault();
//        return true;
//    }
//    else {
//        nwPopupForm_ShowModal("nwBancAccDtls");

//        func_ActionDriven("actGenerateBankAcc", false);
//        e.preventDefault();
//    }
//});

//$(document).on("click", "#btnSaveModeOfCommisionRelease", function (e) {

//    msgBoxContainerQuestion = "saveDocDetails";
//    parent_MessageBoxQuestion("Do you want to save the current record?", "Seller Information", "");

//    return false;
//});

//$(document).on("click", "#btnsaveBankAcc", function (e) {

//    msgBoxContainerQuestion = "saveBankAcc";
//    parent_MessageBoxQuestion("Do you want to save the current record?", "Seller Information", "");

//    return false;
//});

function msgBoxContainerQuestionF(genID, answer) {

    if (genID == "saveDocDetails") {
        if (answer == "Yes") {


            nwParameter_Add("ROWNO", ROWNO);
            nwParameter_Add_Table('nwGridModeOfCommisionReleaseCon');
            func_ActionDriven("actSaveDocDetails", false);
        }
    }

    if (genID == "saveBankAcc") {
        if (answer == "Yes") {


            nwParameter_Add("ROWNO", ROWNO);
            nwParameter_Add_Table('nwGridMainConBank');
            func_ActionDriven("actSaveBankAcc", false);
        }
    }

    if (genID == "saveConacts") {
        if (answer == "Yes") {


            nwParameter_Add("ROWNO", ROWNO);
            nwParameter_Add_Table('nwGridMainCon3');
            func_ActionDriven("actSaveCotacts", false);
        }
    }
}


$(document).on('keyup', '#txtLastName', function (e) {
    if ($("#rbIndividual").prop("checked")) {
        //$('#txtLastName').val(toTitleCase($('#txtLastName').val()));
        SellerName();
    }
});

$(document).on('keyup', '#txtFirstName', function (e) {
    if ($("#rbIndividual").prop("checked")) {
       // $('#txtFirstName').val(toTitleCase($('#txtFirstName').val()));
        SellerName();
    }
});

$(document).on('keyup', '#txtMiddleName', function (e) {
    if ($("#rbIndividual").prop("checked")) {
        //$('#txtMiddleName').val(toTitleCase($('#txtMiddleName').val()));
        SellerName();
    }
});

$(document).on('keyup', '#txtRegisteredName', function (e) {
    if ($("#rbCompany").prop("checked")) {
        $('#txtSellername').val($('#txtRegisteredName').val());
    }
});

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

//revised by jrr 01/21/2020
function SellerName() {
    var Lastname = $('#txtLastName').val();
    var Firstname = $('#txtFirstName').val();
    var Middlename = $('#txtMiddleName').val();
    var res = "";
    var mid = "";
    if (Middlename != '') {
         res = Middlename.substring(0, 1);
         mid = res + '.';
        $('#txtMI').val(mid);
    }

    if ((Lastname != "") && (Firstname != "")) {
        Lastname = Lastname
    } else if ((Lastname == "")) {
        Middlename = "";
    } else if ((Firstname == "")) {
        Middlename = "";
    } else {
    }
    //var Fullname = Lastname + ' ' + Firstname + ' ' + Middlename
      var Fullname = Firstname + ' ' + mid + ' ' + Lastname


    $('#txtSellername').val(Fullname);

 

}

//function SellerName() {
//    var Lastname = $('#txtLastName').val();
//    var Firstname = $('#txtFirstName').val();
//    var Middlename = $('#txtMiddleName').val();

//    if (Middlename != '') {
//        var res = Middlename.substring(0, 1);
//        $('#txtMI').val(res + '.');
//    }

//    if ((Lastname != "") && (Firstname != "")) {
//        Lastname = Lastname + ','
//    } else if ((Lastname == "")) {
//        Middlename = "";
//    } else if ((Firstname == "")) {
//        Middlename = "";
//    } else {
//    }

//    var Fullname = Lastname + ' ' + Firstname + ' ' + Middlename


//    $('#txtSellername').val(Fullname);



//}



$(document).on('click', '#rbIndividual', function (e) {
    if ($("#rbIndividual").prop("checked")) {
        $('#txtFirstName').val(toTitleCase($('#txtFirstName').val()));
        SellerName();

        EnableFieldsIndividual();
        ClearFields();
    }
});

$(document).on('click', '#rbCompany', function (e) {
    if ($("#rbCompany").prop("checked")) {
        $('#txtSellername').val($('#txtRegisteredName').val());

        EnableFieldsCompany();
        ClearFields();
    }
});


$(document).on('click', '#rbVAT', function (e) {
    if ($("#rbVAT").prop("checked")) {
        $('#txtVATRegTIN').enable(true);
        $('#lblVatregTin').show();
        $('#txtNonVATRegTIN').enable(false);
        $('#lblNonVatregTin').hide();
    }
}); 

$(document).on('click', '#rbnonVAT', function (e) {
    if ($("#rbnonVAT").prop("checked")) {
        $('#txtVATRegTIN').enable(false);
        $('#txtNonVATRegTIN').enable(true);
        $('#lblNonVatregTin').show();
        $('#lblVatregTin').hide();
    }
});

function CompareDate(active) {
    var from = Date.parse($('#txtContractDurationFrom').val());
    var to = Date.parse($('#txtContractDurationTo').val());

    if(from >= to)
    {
        MessageBox("Cannot Proceed. Contract Duration To should be later than Contract Duration From.", "Seller Information");
        if(active == "from")
            $('#txtContractDurationFrom').val('')
        if(active == "to")
            $('#txtContractDurationTo').val('')
    }
}

$(document).on('change', '#txtContractDurationFrom', function (e) {
    CompareDate("from")
});
$(document).on('change', '#txtContractDurationTo', function (e) {
    CompareDate("to")
});




//var title = "Mode of Commission Release";
//var fullength = "";

//fullength = "../BMSellerInformationButtons.aspx?nwdev=p8dev&nwu=" + recuser + "&nwType=1&nwSellerCode=" + SellerCode + "&nwSellerName=" + Sellername + "&nwTranType=MOCR";

//nwPopupForm_ShowModal("nwButtonDtls");
//$('#nwButtonDtls .BoxTitle').text(title);
//$('#frame_viewButtonDtls').attr("src", fullength);
//nwLoading_End('xSample');

$(document).on("click", "#btnModeofcommision", function (e) {
    var SellerCode = $("#txtSellerCode").val();
    if (SellerCode == '') {
        MessageBox("Cannot Proceed. Please save the record first.", "Seller Information");
        e.preventDefault();
        return true;
    }
    else {
        PopupWindow(1);
    }
});
$(document).on("click", "#btnDocDtls", function (e) {
    var SellerCode = $("#txtSellerCode").val();
    if (SellerCode == '') {
        MessageBox("Cannot Proceed. Please save the record first.", "Seller Information");
        e.preventDefault();
        return true;
    }
    else {
        PopupWindow(2);
    }
});
$(document).on("click", "#btnBankAcct", function (e) {
    var SellerCode = $("#txtSellerCode").val();
    if (SellerCode == '') {
        MessageBox("Cannot Proceed. Please save the record first.", "Seller Information");
        e.preventDefault();
        return true;
    }
    else {
        PopupWindow(3);
    }
});
$(document).on("click", "#btnAcctDetails", function (e) {
    var SellerCode = $("#txtSellerCode").val();
    if (SellerCode == '') {
        MessageBox("Cannot Proceed. Please save the record first.", "Seller Information");
        e.preventDefault();
        return true;
    }
    else {
        PopupWindow(4);
    }
});
$(document).on("click", "#btnSeminar", function (e) {
    var SellerCode = $("#txtSellerCode").val();
    if (SellerCode == '') {
        MessageBox("Cannot Proceed. Please save the record first.", "Seller Information");
        e.preventDefault();
        return true;
    }
    else {
        PopupWindow(5);
    }
});
$(document).on("click", "#btnSellerLevel", function (e) {
    var SellerCode = $("#txtSellerCode").val();
    if (SellerCode == '') {
        MessageBox("Cannot Proceed. Please save the record first.", "Seller Information");
        e.preventDefault();
        return true;
    }
    else {
        PopupWindow(6);
    }
});
$(document).on("click", "#btnUpdateSellerRole", function (e) {
    var SellerCode = $("#txtSellerCode").val();
    if (SellerCode == '') {
        MessageBox("Cannot Proceed. Please save the record first.", "Seller Information");
        e.preventDefault();
        return true;
    }
    else {
        PopupWindow(7);
    }
});
$(document).on("click", "#btnViewUpdateHist", function (e) {
    var SellerCode = $("#txtSellerCode").val();
    if (SellerCode == '') {
        MessageBox("Cannot Proceed. Please save the record first.", "Seller Information");
        e.preventDefault();
        return true;
    }
    else {
        PopupWindow(8);
    }
});

function PopupWindow(ID) {
    var SellerCode = $("#txtSellerCode").val();
    var Sellername = $("#txtSellername").val();
    var SellerFrom = $("#idvallugLvl1").val();
    var SellerFromDesc = $("#descvallugLvl1").val();
    var update = $('#txtUpdateButton').val();
    var mrktgGrp = $('#idvallugMktgGrpCode').val();

    Sellername = Sellername.replace(/ /g, "+");

        var title = "";
        var fullength = "";
        switch (ID) {
            //case 1:
            //    title = "Mode of Commission Release";
            //    fullength = "BMSellerInformationButtons.aspx?nwdev=p8dev&isView=" + encodeURI(isView) + "&nwu=" + encodeURI(recuser) + "&nwType=1&nwSellerCode=" + encodeURI(SellerCode) + "&nwSellerName=" + encodeURI(Sellername) + "&nwTranType=MOCR&nwtitle=" + encodeURI(title);
            //    break;
            //case 2:
            //    title = "Document Details";
            //    fullength = "BMSellerInformationButtons.aspx?nwdev=p8dev&isView=" + encodeURI(isView) + "&nwu=" + encodeURI(recuser) + "&nwType=1&nwSellerCode=" + encodeURI(SellerCode) + "&nwSellerName=" + encodeURI(Sellername) + "&nwTranType=DOCD&nwtitle=" + encodeURI(title);
            //    break;
            //case 3:
            //    title = "Bank Account Details";
            //    fullength = "BMSellerInformationButtons.aspx?nwdev=p8dev&isView=" + encodeURI(isView) + "&nwu=" + encodeURI(recuser) + "&nwType=1&nwSellerCode=" + encodeURI(SellerCode) + "&nwSellerName=" + encodeURI(Sellername) + "&nwTranType=BAAC&nwtitle=" + encodeURI(title);
            //    break;
            //case 4:
            //    title = "Account Details (As a Customer)";
            //    fullength = "BMSellerInformationButtons.aspx?nwdev=p8dev&isView=" + encodeURI(isView) + "&nwu=" + encodeURI(recuser) + "&nwType=1&nwSellerCode=" + encodeURI(SellerCode) + "&nwSellerName=" + encodeURI(Sellername) + "&nwTranType=ADAC&nwtitle=" + encodeURI(title);
            //    break;
            //case 5:
            //    title = "Seminars/Trainings Attended Details";
            //    fullength = "BMSellerInformationButtons.aspx?nwdev=p8dev&isView=" + encodeURI(isView) + "&nwu=" + encodeURI(recuser) + "&nwType=1&nwSellerCode=" + encodeURI(SellerCode) + "&nwSellerName=" + encodeURI(Sellername) + "&nwTranType=SETD&nwtitle=" + encodeURI(title);
            //    break;
            //case 6:
            //    title = "Seller Role/Level Details";
            //    fullength = "BMSellerInformationButtons.aspx?nwdev=p8dev&isView=" + encodeURI(isView) + "&nwu=" + encodeURI(recuser) + "&nwType=1&nwSellerCode=" + encodeURI(SellerCode) + "&nwSellerName=" + encodeURI(Sellername) + "&nwTranType=SELD&nwtitle=" + encodeURI(title);
            //    break;
            //case 7:
            //    title = "Update Seller Role";
            //    fullength = "BMSellerInformationButtons.aspx?nwdev=p8dev&isView=" + encodeURI(isView) + "&nwu=" + encodeURI(recuser) + "&nwType=1&nwSellerCode=" + encodeURI(SellerCode) + "&nwSellerName=" + encodeURI(Sellername) + "&nwTranType=UPSR&nwtitle=" + encodeURI(title);
            //    break;
            //case 8:
            //    title = "View Update History";
            //    fullength = "BMSellerInformationButtons.aspx?nwdev=p8dev&isView=" + encodeURI(isView) + "&nwu=" + encodeURI(recuser) + "&nwType=1&nwSellerCode=" + encodeURI(SellerCode) + "&nwSellerName=" + encodeURI(Sellername) + "&nwTranType=VUPH&nwtitle=" + encodeURI(title);
            //    break;

            //For Debugging
            case 1:
                title = "Mode of Commission Release Details";
                fullength = "BMSellerInformationButtons?nwType=1&isView=" + encodeURI(isView) + "&nwSellerCode=" + encodeURI(SellerCode) + "&nwSellerName=" + encodeURI(Sellername) + "&nwTranType=MOCR&nwtitle=" + encodeURI(title);
                break;
            case 2:
                title = "Document Details";
                fullength = "DCRequirementCompliance/DCRequirementCompliance?nwType=1&isView=" + encodeURI(isView) + "&nwSellerCode=" + encodeURI(SellerCode) + "&nwSellerName=" + encodeURI(Sellername) + "&nwTranType=DOCD&nwtitle=" + encodeURI(title);
                break;
            case 3:
                title = "Bank Account Details";
                fullength = "BMSellerInformationButtons?nwType=1&isView=" + encodeURI(isView) + "&nwSellerCode=" + encodeURI(SellerCode) + "&nwSellerName=" + encodeURI(Sellername) + "&nwTranType=BAAC&nwtitle=" + encodeURI(title);
                break;
            case 4:
                title = "Account Details (As a Customer)";
                fullength = "BMSellerInformationButtons?nwType=1&isView=" + encodeURI(isView) + "&nwSellerCode=" + encodeURI(SellerCode) + "&nwSellerName=" + encodeURI(Sellername) + "&nwTranType=ADAC&nwtitle=" + encodeURI(title);
                break;
            case 5:
                title = "Seminars/Trainings Attended Details";
                fullength = "BMSellerInformationButtons?nwType=1&isView=" + encodeURI(isView) + "&nwSellerCode=" + encodeURI(SellerCode) + "&nwSellerName=" + encodeURI(Sellername) + "&nwTranType=SETD&nwtitle=" + encodeURI(title);
                break;
            case 6:
                title = "Seller Role/Level Details";
                fullength = "BMSellerInformationButtons?nwType=1&isView=" + encodeURI(isView) + "&nwSellerCode=" + encodeURI(SellerCode) + "&nwSellerName=" + encodeURI(Sellername) + "&nwTranType=SELD&nwtitle=" + encodeURI(title);
                break;
            case 7:
                title = "Update Seller Role";
                fullength = "BMSellerInformationButtons?nwType=1&isView=" + encodeURI(isView) + "&nwSellerCode=" + encodeURI(SellerCode) + "&nwSellerName=" + encodeURI(Sellername) + "&nwTranType=UPSR&nwtitle=" + encodeURI(title) + "&nwSellerFrom=" + encodeURI(SellerFrom) + "&nwSellerFromDesc=" + encodeURI(SellerFromDesc);
                break;
            case 8:
                title = "View Update History";
                fullength = "BMSellerInformationButtons?nwType=1&isView=" + encodeURI(isView) + "&nwSellerCode=" + encodeURI(SellerCode) + "&nwSellerName=" + encodeURI(Sellername) + "&nwTranType=VUPH&nwtitle=" + encodeURI(title);
                break;
        }
        //var fullengthfinal = urlencode(fullength);
        //nwPopupForm_Create("nwButtonDtls", true, fullengthfinal);
        //nwPopupForm_Create("nwButtonDtls", true, fullength);
        //nwPopupForm_ShowModal("nwButtonDtls");
        //$('#nwButtonDtls .BoxTitle').text(title);
        //$('#frame_viewButtonDtls').attr("src", fullength);
        //nwLoading_End('xSample');


        nwPopupForm_Create("nwButtonDtls", true, fullength);
        $('#nwButtonDtls .BoxTitle').text(title);
        //$("#nwButtonDtls").css({ "min-width": "98%" });
        //$("#nwButtonDtls").css({ "min-height": "500px" });
        nwPopupForm_ShowModal("nwButtonDtls");
        nwLoading_End('xSample');
}

function Update() {
    $('#lugMktgGrpCode').removeClass("adisabled");
    $('#txtSSSNumber').enable(true);

        $("#lugLvl1").removeClass("adisabled");

        $("#lugLvl2").removeClass("adisabled");

        $("#lugLvl3").removeClass("adisabled");

    if (!$('#lbllvl4').text().includes("*"))
        $("#lugLvl4").addClass("adisabled");
    else
        $("#lugLvl4").removeClass("adisabled");

    if (!$('#lbllvl5').text().includes("*"))
        $("#lugLvl5").addClass("adisabled");
    else
        $("#lugLvl5").removeClass("adisabled");

    if (!$('#lbllvl6').text().includes("*"))
        $("#lugLvl6").addClass("adisabled");
    else
        $("#lugLvl6").removeClass("adisabled");

    if (!$('#lbllvl7').text().includes("*"))
        $("#lugLvl7").addClass("adisabled");
    else
        $("#lugLvl7").removeClass("adisabled");

    if (!$('#lbllvl8').text().includes("*"))
        $("#lugLvl8").addClass("adisabled");
    else
        $("#lugLvl8").removeClass("adisabled");

    if (!$('#lbllvl9').text().includes("*"))
        $("#lugLvl9").addClass("adisabled");
    else
        $("#lugLvl9").removeClass("adisabled");

    if (!$('#lbllvl10').text().includes("*"))
        $("#lugLvl10").addClass("adisabled");
    else
        $("#lugLvl10").removeClass("adisabled");
    

    //here
    $('#txtCrossReference').enable(true);
    $('#lugSellergroup').enable(true);
    $('#lugSellerRole').enable(false);
    $('#lugSellerStatus').enable(true);
    $('#txtPRCNo').enable(true);
    $('#lugDefaultVATCode').enable(true);
    $('#lugDefaultCWTTaxCode').enable(true);
    $('#txtMobile').enable(true);
    $('#txtTelephone').enable(true);
    $('#txtEmail').enable(true);
    $('#txtsellerAdd1').enable(true);
    $('#txtSellerAdd2').enable(true);
    $('#txtRecruitDate').enable(true);
    $('#lugRecruitedBy').enable(true);
    $('#txtFirstSaleDate').enable(true);
    $('#txtPassportIDNumber').enable(true);
    $('#txtContractDurationFrom').enable(true);
    $('#txtContractDurationTo').enable(true);
    $('#lugSellerType').removeClass("adisabled");
    $('#lugLocSegment').removeClass("adisabled");
    $('#lugSellerContractType').removeClass("adisabled");
    $('#lugSellerCotractStatus').removeClass("adisabled");
    
    

    if ($("#rbIndividual").prop("checked")) {
        $('#lugSalutation').removeClass("adisabled");
        $("#txtLastName").enable(true);
        $("#txtFirstName").enable(true);
        $('#txtMiddleName').enable(true);
        $('#txtMaidenName').enable(true);
        $('#txtMotherMaidenName').enable(true);
        $('#lugNameSuffix').removeClass("adisabled");
        $('#txtBirthdate').enable(true);
        $('#lugGender').removeClass("adisabled");
        $('#lugCivilStatus').removeClass("adisabled");
        $('#lugNationality').removeClass("adisabled");
        $('#txtPlaceofBirth').enable(true);
        $('#txtIndividualTIN').enable(true);
        $('#txtPagIBIGNumber').enable(true);
        $('#txtPhilHealthNo').enable(true);
    } else {
        $('#txtRegisteredName').enable(true);
        $('#rbVAT').enable(true);
        $('#rbnonVAT').enable(true);
        $('#txtVATRegTIN').enable(true);
        $('#txtNonVATRegTIN').enable(true);
    }
}


function urlencode(str) {
    str = (str + '')
      .toString();

    // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
    // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
    return encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .
    replace(/\)/g, '%29')
      .replace(/\*/g, '%2A')
      .replace(/%20/g, '+');
}


function DisabledAll() {

    $('#lugSellerContractType').enable(false);
    $('#lugSellerCotractStatus').enable(false);
    $('#txtCrossReference').enable(false);
    $(".nwSellerCategory").enable(false);
    $('#lugSellergroup').enable(false);
    $('#lugSellerType').enable(false);
    $('#lugSellerRole').enable(false);
    $('#lugSellerStatus').enable(false);
    $('#txtPRCNo').enable(false);
    $('#lugDefaultVATCode').enable(false);
    $('#lugSellerStatus').enable(false);
    $('#lugMktgGrpCode').enable(false);
    $('#lugLocSegment').enable(false);
    $('#lugSalutation').enable(false);
    $("#txtLastName").enable(false);
    $("#txtFirstName").enable(false);
    $('#txtMiddleName').enable(false);
    $('#txtMaidenName').enable(false);
    $('#txtMotherMaidenName').enable(false);
    $('#lugNameSuffix').enable(false);
    $('#txtBirthdate').enable(false);
    $('#lugGender').enable(false);
    $('#lugCivilStatus').enable(false);
    $('#lugNationality').enable(false);
    $('#txtPlaceofBirth').enable(false);
    $('#txtIndividualTIN').enable(false);

    $('#rbVAT').enable(false);
    $('#rbnonVAT').enable(false);
    $('#txtVATRegTIN').enable(false);
    $('#txtNonVATRegTIN').enable(false);

    $('#lugDefaultVATTaxCode').enable(false);
    $('#lugDefaultCWTTaxCode').enable(false);
    $('#txtSSSNumber').enable(false);
    $('#txtPagIBIGNumber').enable(false);
    $('#txtPhilHealthNo').enable(false);
    $('#txtMobile').enable(false);
    $('#txtTelephone').enable(false);
    $('#txtEmail').enable(false);
    $('#txtsellerAdd1').enable(false);
    $('#txtSellerAdd2').enable(false);
    $('#txtRecruitDate').enable(false);
    $('#lugRecruitedBy').enable(false);
    $('#txtFirstSaleDate').enable(false);

    $('#nwGrid1Con').enable(false);
    $("#lugLvl1").enable(false);
    $("#lugLvl2").enable(false);
    $("#lugLvl3").enable(false);
    $("#lugLvl4").enable(false);
    $("#lugLvl5").enable(false);
    $("#lugLvl6").enable(false);
    $("#lugLvl7").enable(false);
    $("#lugLvl8").enable(false);
    $("#lugLvl9").enable(false);
    $("#lugLvl10").enable(false);

    $('#txtRegisteredName').enable(false);
    $('#txtContractDurationFrom').enable(false);
    $('#txtContractDurationTo').enable(false);
    $('#txtPassportIDNumber').enable(false);

    if (seller != ""){
        $('#btnCaptureImage').enable(false);
        $('#attachIDPicture').enable(false);
        $('#attachSignature').enable(false);
    }
   
}


function setLabelText()
{
    var level1 = $('#Level1').val();
    var level2 = $('#Level2').val();

    $('#level1').html('' + level1 + '<span class="nwRequiredField reqLvl">*</span>');
    $('#level2').html('' + level2 + '<span class="nwRequiredField reqLvl">*</span>');
}

function disablewhenApproved()
{
    if ($('#txtStatus').val() == "Approved")
    {
        $("#noah-webui-Toolbox").bindingProcess().enable(true);
        $("#noah-webui-Toolbox").bindingSave().enable(false);
        $("#noah-webui-Toolbox").bindingDelete().enable(false);
    }
}

$(document).on("click", ".buttoncamera", function (e) {

    // $("#noah-webui-default-Refresh").click();
    return false;


})

//$(document).on("click", "#signature-box #attachSignature", function (e) {
//    e.preventDefault();
//    $("#signature-form").remove();
//    $($(this).parent(0)).append('<form id="signature-form" style="display:none"><input type="file" id="signature" class="signature-manual" name="signature" accept="image/*" /></form>');
//    $("#signature-form:eq(0) input:eq(0)").click();
//});

//LAM
$(document).on("click", "#signature-box #attachSignature", function (e) {
    $btn = "attachSignature";
    if ($("#txtSellerCode").val() == '') {
        MessageBox("Cannot Proceed. Please save the record first.", "Seller Information");
        e.preventDefault();
        return true;
    }
    else {
        //$("#webcam-form").remove();
        //$($(this).parent(0)).append('<form id="webcam-form" style="display:none"><input type="file" id="webcam" class="webcam-manual" name="webcam" accept="image/*" /></form>');
        //$("#webcam-form:eq(0) input:eq(0)").click();
        //e.preventDefault();
        $(".bar").css("width", "0%");
        $(".percent").text("0%");
        $("#status span").text("");

        nwPopupForm_ShowModal("nwUploadCon");
    }
    return false;
});

//$(document).on("submit", "#signature-form", function (e) {
//    e.preventDefault();

//    var emp = $("#txtSellerCode").val() || "";
//    var serverPath = $("#txtServerLink").val() || "";

//    var url = "SellerImageUpload.ashx?sellerCode=" + emp + "&recuser=" + encodeURIComponent(recuser) + "&serverPath=" + serverPath + "&uploadTrigger=1";
//    //var url = "SellerImageUpload.ashx?sellerCode=" + emp + "&recuser=" + encodeURIComponent(recuser) + "&uploadTrigger=1";

//    ///create a new FormData object
//    var formData = new FormData(); //var formData = new FormData($('form')[0]);

//    ///get the file and append it to the FormData object
//    formData.append('signature', $('#signature')[0].files[0]);

//    $.ajax({
//        url: url, // Url to which the request is send
//        type: "POST",
//        contentType: "application/octet-stream",
//        dataType: "json",
//        timeout: 18000,
//        data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
//        contentType: false,       // The content type used when sending data to the server.
//        cache: false,             // To unable request pages to be cached
//        processData: false,       // To send DOMDocument or non processed data file it is set to false
//        complete: function (status, data)   // A function to be called if request succeeds
//        {
//            console.log(status);
//            var json = $.parseJSON(status.responseText); //JEA ADDED DECODE
//            if (status.status == 200) {
//                parent_MessageBox(DECODE(json.data))
//                cust_GetPara();
//                func_ActionDriven("actBindCollection", false);
//            } else {
//                parent_MessageBox("Cannot upload image.")
//            }
//        }
//    });
//});

//$(document).on("change", "#signature.signature-manual", function () {
//    if (this.files[0].size > 1048576) {
//        parent_MessageBox("Image is too large");
//    } else {
//        $("#signature-form").submit();
//    }
//});

var originofSale = '';
function func_LookUpInitialize(id) {

    if (id == "lugLvl1" || id == "lugLvl2" || id == "lugLvl3" || id == "lugLvl4" || id == "lugLvl5" || id == "lugLvl6" || id == "lugLvl7" || id == "lugLvl8" || id == "lugLvl9" || id == "lugLvl10") {
        cust_GetPara();
    }
    nwParameter_Add("origin", $('#idvallugLvl3').val());
    //if (id == "lugTownShip" || id == "lugProject") {
    //    filter_ItemGroup = crnwTR.find('td:eq(' + SPR_ITEMGROUP_TYPECODE + ') ').text();
    //    cust_GetPara();
    //}
    originofSale = $('#idvallugLvl3').val();
    return true;
}


function afterbinding() {

    var level1 = $('#level1').text();
    var level2 = $('#level2').text();

    $('#level1').html('' + level1 + '<span class="nwRequiredField reqLvl">*</span>');
    $('#level2').html('' + level2 + '<span class="nwRequiredField reqLvl">*</span>');
}


//LAM
var testPattern = new RegExp("^(\\+)?(\\d+)$");



$(function () {

    $('#txtEmail').keyup(function () {
        var yourInput = $(this).val();
        re = /[`~!#$%^&*()|+\-=?;:'",<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(yourInput);
        if (isSplChar) {
            var no_spl_char = yourInput.replace(/[`~!#$%^&*()|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
            $(this).val(no_spl_char);
        }
    });

    $('#txtMobile').keyup(function () {
        var yourInput = $(this).val();
        re = /[`~!@#$%^&*()_|\-=?;:'",.<>\{\}\[\]\\\/a-zA-Z]/gi;
        var isSplChar = re.test(yourInput);
        if (isSplChar) {
            var no_spl_char = yourInput.replace(/[`~!@#$%^&*()_|\-=?;:'",.<>\{\}\[\]\\\/a-zA-Z]/gi, '');
            $(this).val(no_spl_char);
        }
        //var charCode = (yourInput.which) ? yourInput.which : yourInput.keyCode
        //if (charCode > 31 && (charCode < 48 || charCode > 57))
        //    return false;

        //return true;

    });

    //$('#txtTelephone').keyup(function () {
    //    var yourInput = $(this).val();
    //    re = /[`~!#$%^&*()@_|+\=?;:'",<>\{\}\[\]\\\/]/gi;
    //    var isSplChar = re.test(yourInput);
    //    if (isSplChar) {
    //        var no_spl_char = yourInput.replace(/[`~!#$%^&*()@_|+\=?;:'",<>\{\}\[\]\\\/]/gi, '');
    //        $(this).val(no_spl_char);
           
    //    }
        
    //});



});



///additional SMR 05292019

var serverlink = "";
function func_WindowCloseTrigger(verID) {
    if (verID == "nwUploadCon") {
        if ($btn == "attachIDPicture") {
            var filepath = $("#nwUploadCon .aagfilename").text();
            var path = "";
            serverlink = $('#txtServerLink').val();

            path = "\\" + 'BMSellerInformation' + "\\" + filepath;

            if (filepath != "") {
                linkcat = serverlink + path;
                cust_GetPara();
                nwParameter_Add("path", path);
                func_ActionDriven("actSaveSellerImage", false);
                nwLoading_Start('actSaveSellerImage');
            }
        }

        if ($btn == "attachSignature") {
            var filepath = $("#nwUploadCon .aagfilename").text();
            var path = "";
            serverlink = $('#txtServerLink').val();

            path = "\\" + 'BMSellerInformation' + "\\" + filepath;

            if (filepath != "") {
                linkcat = serverlink + path;
                cust_GetPara();
                nwParameter_Add("path", path);
                func_ActionDriven("actSaveSignature", false);
                nwLoading_Start('actSaveSignature');
            }
        }
    }
    return true;
}

var sellerImagepath = '';
function func_setSellerImage() {

    if (sellerImagepath == '') {
        $("#profile-img").css('background-image', "url('images/placeholder.png')");
    } else {
        serverlink = $("#txtServerLink").val();
        var fullpath = serverlink + sellerImagepath;
        $("#profile-img").css('background-image', "url('" + fullpath + "')");
    }
}

var sellerSignPath = '';
function func_setSellerSignImage() {

    if (sellerSignPath == '') {
        $("#profile-img-signature").css('background-image', "url('images/placeholder.png')");
    } else {
        serverlink = $("#txtServerLink").val();
        var fullpath = serverlink + sellerSignPath;
        $("#profile-img-signature").css('background-image', "url('" + fullpath + "')");
    }
}




function configlvl(lvl, val) {
    jsonlevelconfig.push
      ({
          configlvl: lvl,
          configval: val
      });

}

$(document).on('click', '.btn-modal-back', function () {
    //$('#RequirementCompliance').hide();
    $(".modal-s").removeClass("_show");
    $(".modal-box-s").removeClass("_slide-m");

});