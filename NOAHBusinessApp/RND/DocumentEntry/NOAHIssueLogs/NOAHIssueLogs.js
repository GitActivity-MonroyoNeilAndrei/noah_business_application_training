//NaviationFlag = true;
//var nwaccess = "";
baseTitle = "Support Ticket Monitoring";

let StartIndex = 1,
               SPR_ID = StartIndex,
            SPR_Tag = ++StartIndex,
            SPR_Location = ++StartIndex,
            SPR_Company = ++StartIndex,
            SPR_RefCompany = ++StartIndex,
            SPR_Project = ++StartIndex,
            SPR_ItemNo = ++StartIndex,
            SPR_CurrentDate = ++StartIndex,
            SPR_DateRaised = ++StartIndex,
            SPR_ImplemStage = ++StartIndex,
            SPR_RefFileName = ++StartIndex,
            SPR_TestCase = ++StartIndex,
            SPR_Module = ++StartIndex,
            SPR_Menugroup = ++StartIndex,
            SPR_SubMenuGroup = ++StartIndex,
            SPR_MenuItem = ++StartIndex,
            SPR_Concern = ++StartIndex,
            SPR_Screenshot = ++StartIndex,
            SPR_Client = ++StartIndex,
            SPR_RaisedBy = ++StartIndex,
            SPR_Type = ++StartIndex,
            SPR_SubType = ++StartIndex,
            SPR_PercentAccomp = ++StartIndex,
            SPR_Status = ++StartIndex,
            SPR_ActionItem = ++StartIndex,
            SPR_FPTIRemarks = ++StartIndex,
            SPR_FeedbackDate = ++StartIndex,
            SPR_ProcessBy = ++StartIndex,
            SPR_Assigned = ++StartIndex,
            SPR_Resolution = ++StartIndex,
            SPR_Enhancement = ++StartIndex,
            SPR_NonNegotiableEnhancement = ++StartIndex,
            SPR_RequiredForms = ++StartIndex,
            SPR_StandardVersion = ++StartIndex,
            SPR_EnhancementNotes = ++StartIndex,
            SPR_Mandays = ++StartIndex,
            SPR_MandaysSubmission = ++StartIndex,
            SPR_Trigger = ++StartIndex,
            SPR_Employeetask = ++StartIndex,
            SPR_PriorityLevel = ++StartIndex,
            SPR_StartTime = ++StartIndex,
            SPR_TargetStartDate = ++StartIndex,
            SPR_EndTime = ++StartIndex,
            SPR_TargetEndDate = ++StartIndex,
            SPR_DocStatus = ++StartIndex,
            SPR_CreatedBy = ++StartIndex,
            SPR_DateCreated = ++StartIndex,
            SPR_ModifiedBy = ++StartIndex,
            SPR_ModifiedDate = ++StartIndex;




var mSpreadBook;
var mSpreadSheet;
var indexstartdata = 3;
var bgcolorbuttonOpen = "#F7AD27";
var bgcolorbuttonWithContent = "#006775";
var jsonDescription = "";
var jsonRecuserDesc = "";
var _timeOld = "";

var t_company = "Table";
var t_project = "Table1";
var t_implemstage = "Table2";
var t_module = "Table3";
var t_menugroup = "Table4";
var t_menuitem = "Table5";
var t_type = "Table6";
var t_status = "Table7";
var t_actiontype = "Table8";
var t_processedby = "Table9";
var t_assignedby = "Table10";
var t_task = "Table11";
var t_raisedby = "Table12";
var t_recuser = "Table13";
var t_moduser = "Table14";
var t_prio = "Table15";
var t_location  = "Table16";
var t_submenugroup = "Table17";

var r_recuser = "Table";
function func_Reload()
{
    crLnk = GetCurrentURL() + "FPTIIssueLogs_Gateway";
    crLnkGateKey = "FPTIIssueLogs";

    var textTitle = "Issue Log";
    var classLogo = "logo";
    var classLogoImg = "p8";

    $("#sd-headerbuttons").append('<div class="nwe-btn ' + classLogo + '" data-content="customToolbox"><span class="' + classLogoImg + '">' + textTitle + '</span></div>');


    nwPopupForm_Create("nwgFilterCon", true);
    $('body').append("<div id='nwgRemarksLogCon' style='width:80%;height:80%;'><div id='cmsnwgRemarks'></div></div>");
    nwPopupForm_Create("nwgRemarksLogCon", true);
    $("#nwgRemarksLogCon .modal-box-s").css("min-width", "80%");
    $("#nwgRemarksLogCon .modal-box-s").css("min-height", "80%");



    $("#settingstabs").loadAddtoList({ list: ["Company", "Project", "Module", "Menu Group", "Menu Item"], icon: true });
    $("#settingstabs1").loadAddtoList({ list: ["Implementation Stage", "Type", "Status", "Action Item"], icon: true });
    $("#settingstabs2").loadAddtoList({ list: ["Raised By", "Proccessed By", "Task for Employee"], icon: true });
    crnwTagSingleBind = true;



    /// 
   
    var isContinue = true;
    $("#cmsnwgRemarks").CMS();
    $('#nwgRemarksLogCon').attr("remarksID", "screenshot");
    $("#errrormess").text(message)
    $("#conMessage").show()
    init_request();
    
    
    $("#StartTime").mask('99:99');
    return isContinue;
    


}

function func_ToolboxNavigatorBind_Empty() {

    nwLoading_Start("actBindCollectionEmpty", crLoadingHTML);
    
    RefreshData();
    
    func_ActionDriven("actBindCollectionEmpty", false);
}

function DisableGrid() {

    try{
        for (var i = 0; i < mSpreadBook.ActiveSheet.ColumnConfig.length; i++) {
            mSpreadBook.ActiveSheet.SetBackground(i, Spread_ALLROW, "#EFEFEF");
            mSpreadBook.ActiveSheet.ColumnConfig[i].Enabled = false;

        }
    }
    catch (ex) { }

    
}
function Disablefirstrow() {

    mSpreadBook.ActiveSheet.SetBackground(Spread_ALLCOL, 0, "white");
    mSpreadBook.ActiveSheet.SetEnable(Spread_ALLCOL, 0, false);



    

}


var bgcolorlookup = "#cfffff";
var bgcolorEnable = "#FFFFFF";

var Header1 = 1;
var Header2 = 2;
function EnableGrid() {

            
        mSpreadBook.ActiveSheet.RenderStatus = false;
        Disablefirstrow();
        
        
         mSpreadBook.ActiveSheet.SetDataType(Spread_ALLCOL, Header2, "text");

         mSpreadBook.ActiveSheet.SetText(SPR_Tag - 1, Header2, "Tagging for New, With Changes, and Save");
         mSpreadBook.ActiveSheet.SetText(SPR_Company - 1, Header2, "Company Lookup");
         mSpreadBook.ActiveSheet.SetText(SPR_Project - 1, Header2, "Project Lookup");
         mSpreadBook.ActiveSheet.SetText(SPR_ItemNo - 1, Header2, "Issue No.");
        mSpreadBook.ActiveSheet.SetText(SPR_DateRaised  - 1, Header2, "Date the issue is raised.");
        mSpreadBook.ActiveSheet.SetText(SPR_ImplemStage - 1, Header2, "Implementation Stage the Issue is raised including source of findings.");
        mSpreadBook.ActiveSheet.SetText(SPR_RefFileName - 1,Header2, "If BRTS or BRSS only(Configured as BRTS-Menu-Item-Date-Time)");
        mSpreadBook.ActiveSheet.SetText(SPR_TestCase - 1,Header2, "If BRTS or BRSS only(Indicate the row number of reference file name)");
        mSpreadBook.ActiveSheet.SetText(SPR_Module - 1,Header2, "Module");
        mSpreadBook.ActiveSheet.SetText(SPR_Menugroup - 1,Header2, "Menu Group");
        mSpreadBook.ActiveSheet.SetText(SPR_SubMenuGroup - 1,Header2, "Sub Menu Group");
        mSpreadBook.ActiveSheet.SetText(SPR_MenuItem  - 1,Header2, "Menu Item");
        mSpreadBook.ActiveSheet.SetText(SPR_Concern - 1,Header2, "Detailed Issue Raised");
        mSpreadBook.ActiveSheet.SetText(SPR_Screenshot - 1,Header2, "Screenshot of the issue raised");
        mSpreadBook.ActiveSheet.SetText(SPR_Client - 1,Header2, "Raised by Client?");
        mSpreadBook.ActiveSheet.SetText(SPR_RaisedBy - 1,Header2, "The person who raised the issue/Concern");
        mSpreadBook.ActiveSheet.SetText(SPR_Type - 1,Header2, "Data Error, System Error, User Error, Inquiry");
        mSpreadBook.ActiveSheet.SetText(SPR_SubType - 1, Header2, "Sub Type of the Issue Type");
        mSpreadBook.ActiveSheet.SetText(SPR_Status - 1,Header2, "Not Yet Started, Ongoing, and Done");
        mSpreadBook.ActiveSheet.SetText(SPR_ActionItem - 1,Header2, "For FPTI Validation, For FPTI Addressing, For Client Revalidation, For CLient Setup/ Data Submission, For FPTI Uploading, For Enhancement, For Escalation, On Hold, For Further Discussion");
        mSpreadBook.ActiveSheet.SetText(SPR_FPTIRemarks - 1,Header2, "Initial Remarks from FPTI on the raised Issue");
        mSpreadBook.ActiveSheet.SetText(SPR_FeedbackDate - 1,Header2, "Date of Feedback for the FPTI Remarks");
        mSpreadBook.ActiveSheet.SetText(SPR_ProcessBy - 1,Header2, "Consultant Name");
        mSpreadBook.ActiveSheet.SetText(SPR_Assigned - 1,Header2, "Consultant Name");
        mSpreadBook.ActiveSheet.SetText(SPR_Resolution - 1,Header2, "State the resolution done for the concern/issue raised.");
        mSpreadBook.ActiveSheet.SetText(SPR_Enhancement - 1,Header2, "Yes/No");
        mSpreadBook.ActiveSheet.SetText(SPR_NonNegotiableEnhancement - 1,Header2, "Yes/No");
        mSpreadBook.ActiveSheet.SetText(SPR_RequiredForms - 1,Header2, "Yes/No (Printing)");
        mSpreadBook.ActiveSheet.SetText(SPR_StandardVersion - 1,Header2, "If the enhancement is from the Standard, input the Standard Version");
        mSpreadBook.ActiveSheet.SetText(SPR_EnhancementNotes - 1,Header2, "Additional Notes for the Enhancement");
        mSpreadBook.ActiveSheet.SetText(SPR_Mandays - 1,Header2, "Man Days for the Enhancement");
        mSpreadBook.ActiveSheet.SetText(SPR_MandaysSubmission - 1,Header2, "Actual Submission of Date of Estimated Man Days");
        mSpreadBook.ActiveSheet.SetText(SPR_Trigger - 1,Header2, "Development, Developer Testing, SIT, Deployment, UAT");
        mSpreadBook.ActiveSheet.SetText(SPR_Employeetask - 1, Header2, "Reassigned To");
        mSpreadBook.ActiveSheet.SetText(SPR_TargetStartDate - 1, Header2, "Start Date");
        mSpreadBook.ActiveSheet.SetText(SPR_TargetEndDate - 1,Header2, "End Date");
        mSpreadBook.ActiveSheet.SetText(SPR_CreatedBy - 1,Header2, "Created By");
        mSpreadBook.ActiveSheet.SetText(SPR_DateCreated - 1,Header2, "Created By");
        mSpreadBook.ActiveSheet.SetText(SPR_ModifiedBy - 1,Header2, "Modified By");
        mSpreadBook.ActiveSheet.SetText(SPR_ModifiedDate - 1, Header2, "Modified By");
        mSpreadBook.ActiveSheet.SetText(SPR_PriorityLevel - 1, Header2, "Priority Level Matrix");
        mSpreadBook.ActiveSheet.SetText(SPR_StartTime - 1, Header2, "Start Time");
        mSpreadBook.ActiveSheet.SetText(SPR_EndTime - 1, Header2, "End Time");
        mSpreadBook.ActiveSheet.SetText(SPR_Location - 1, Header2, "Location with Accountable Forms");
        mSpreadBook.ActiveSheet.SetText(SPR_PercentAccomp - 1, Header2, "Percent of Completion");
        mSpreadBook.ActiveSheet.SetText(SPR_RefCompany - 1, Header2, "Reference Company");
        mSpreadBook.ActiveSheet.SetText(SPR_DocStatus - 1, Header2, "Document Status");


        
            mSpreadBook.ActiveSheet.SetBackground(Spread_ALLCOL, 1, "#002060");
            mSpreadBook.ActiveSheet.SetTextColor(Spread_ALLCOL, 1, "white");
            mSpreadBook.ActiveSheet.SetEnable(Spread_ALLCOL, 2, false);
            mSpreadBook.ActiveSheet.SetTextAlign(Spread_ALLCOL, 2, "center");
            mSpreadBook.ActiveSheet.SetItalic(Spread_ALLCOL, 2, "italic");
            mSpreadBook.ActiveSheet.SetBackground(Spread_ALLCOL, 2, "#FCE5CD");

           mSpreadBook.ActiveSheet.RowAdd();

    //for (var i = 0; i < mSpreadBook.ActiveSheet.ColumnConfig.length; i++) {
    //mSpreadBook.ActiveSheet.ColumnConfig[i].Enabled = true;

        mSpreadBook.ActiveSheet.SetBackground(SPR_Location - 1, Spread_ALLROW, bgcolorlookup);
        mSpreadBook.ActiveSheet.SetBackground(SPR_Company - 1, Spread_ALLROW, bgcolorlookup);
        mSpreadBook.ActiveSheet.SetBackground(SPR_Project - 1, Spread_ALLROW, bgcolorlookup);
        mSpreadBook.ActiveSheet.SetBackground(SPR_ImplemStage - 1, Spread_ALLROW, bgcolorlookup);
        mSpreadBook.ActiveSheet.SetBackground(SPR_Module - 1, Spread_ALLROW, bgcolorlookup);
        mSpreadBook.ActiveSheet.SetBackground(SPR_Menugroup - 1, Spread_ALLROW, bgcolorlookup);
        mSpreadBook.ActiveSheet.SetBackground(SPR_SubMenuGroup - 1, Spread_ALLROW, bgcolorlookup);
        mSpreadBook.ActiveSheet.SetBackground(SPR_MenuItem - 1, Spread_ALLROW, bgcolorlookup);
        //mSpreadBook.ActiveSheet.SetBackground(SPR_RaisedBy - 1, Spread_ALLROW, bgcolorlookup); conditional based on client
        mSpreadBook.ActiveSheet.SetBackground(SPR_Type - 1, Spread_ALLROW, bgcolorlookup);
        mSpreadBook.ActiveSheet.SetBackground(SPR_Status - 1, Spread_ALLROW, bgcolorlookup);
        mSpreadBook.ActiveSheet.SetBackground(SPR_ActionItem - 1, Spread_ALLROW, bgcolorlookup);
        mSpreadBook.ActiveSheet.SetBackground(SPR_ProcessBy - 1, Spread_ALLROW, bgcolorlookup);
        mSpreadBook.ActiveSheet.SetBackground(SPR_Assigned - 1, Spread_ALLROW, bgcolorlookup);
        mSpreadBook.ActiveSheet.SetBackground(SPR_Employeetask - 1, Spread_ALLROW, bgcolorlookup);
        mSpreadBook.ActiveSheet.SetBackground(SPR_PriorityLevel - 1, Spread_ALLROW, bgcolorlookup);
        mSpreadBook.ActiveSheet.SetBackground(SPR_RaisedBy - 1, Spread_ALLROW, bgcolorlookup);
        

    //Input Field
        mSpreadBook.ActiveSheet.SetBackground(SPR_DateRaised - 1, Spread_ALLROW, bgcolorEnable);
        mSpreadBook.ActiveSheet.SetBackground(SPR_RefFileName - 1, Spread_ALLROW, bgcolorEnable);
        mSpreadBook.ActiveSheet.SetBackground(SPR_TestCase - 1, Spread_ALLROW, bgcolorEnable);
        mSpreadBook.ActiveSheet.SetBackground(SPR_Concern - 1, Spread_ALLROW, bgcolorEnable);
        mSpreadBook.ActiveSheet.SetBackground(SPR_SubType - 1, Spread_ALLROW, bgcolorEnable);
        mSpreadBook.ActiveSheet.SetBackground(SPR_FPTIRemarks - 1, Spread_ALLROW, bgcolorEnable);
        mSpreadBook.ActiveSheet.SetBackground(SPR_FeedbackDate - 1, Spread_ALLROW, bgcolorEnable);
        mSpreadBook.ActiveSheet.SetBackground(SPR_Resolution - 1, Spread_ALLROW, bgcolorEnable);
        mSpreadBook.ActiveSheet.SetBackground(SPR_StandardVersion - 1, Spread_ALLROW, bgcolorEnable);
        mSpreadBook.ActiveSheet.SetBackground(SPR_EnhancementNotes - 1, Spread_ALLROW, bgcolorEnable);
        mSpreadBook.ActiveSheet.SetBackground(SPR_Mandays - 1, Spread_ALLROW, bgcolorEnable);
        mSpreadBook.ActiveSheet.SetBackground(SPR_MandaysSubmission - 1, Spread_ALLROW, bgcolorEnable);
        mSpreadBook.ActiveSheet.SetBackground(SPR_StartTime - 1, Spread_ALLROW, bgcolorEnable);
        mSpreadBook.ActiveSheet.SetBackground(SPR_TargetStartDate - 1, Spread_ALLROW, bgcolorEnable);
        mSpreadBook.ActiveSheet.SetBackground(SPR_EndTime - 1, Spread_ALLROW, bgcolorEnable);
        mSpreadBook.ActiveSheet.SetBackground(SPR_TargetEndDate - 1, Spread_ALLROW, bgcolorEnable);
       mSpreadBook.ActiveSheet.SetBackground(SPR_RefCompany - 1, Spread_ALLROW, bgcolorEnable);

    //Button
        mSpreadBook.ActiveSheet.SetTextColor(SPR_Screenshot - 1, 0, "white");
        mSpreadBook.ActiveSheet.SetTemplate(SPR_Screenshot - 1, 2, "Loaded", { BackgroundColor: "#FCE5CD", Text: "SC", TextColor: "black" });
        mSpreadBook.ActiveSheet.SetTemplate(SPR_Screenshot - 1, Spread_ALLROW, "button", { BackgroundColor: "#CECECD", Text: "SC", TextColor: "black" });

        //mSpreadBook.ActiveSheet.SetTextColor(SPR_Trigger - 1, 0, "white");
        //mSpreadBook.ActiveSheet.SetTemplate(SPR_Trigger - 1, 2, "Loaded", { BackgroundColor: "#FCE5CD", Text: "Task Accepted, Task Accepted Priority", TextColor: "black" });
        //mSpreadBook.ActiveSheet.SetTemplate(SPR_Trigger - 1, Spread_ALLROW, "button", { BackgroundColor: "#CECECD", Text: "Task Accepted", TextColor: "black" });
    //}
    //Checkbox
        
        mSpreadBook.ActiveSheet.SetTemplate(SPR_Client - 1, 2, "Loaded", { BackgroundColor: "#FCE5CD", Text: "Raised by Client?", TextColor: "black" });
        mSpreadBook.ActiveSheet.SetTemplate(SPR_Client - 1, Spread_ALLROW, "checkbox", "check");
        mSpreadBook.ActiveSheet.SetTemplate(SPR_Enhancement - 1, 2, "Loaded", { BackgroundColor: "#FCE5CD", Text: "Yes/No", TextColor: "black" });
        mSpreadBook.ActiveSheet.SetTemplate(SPR_Enhancement - 1, Spread_ALLROW, "checkbox", "check");
        mSpreadBook.ActiveSheet.SetTemplate(SPR_NonNegotiableEnhancement - 1, 2, "Loaded", { BackgroundColor: "#FCE5CD", Text: "Yes/No", TextColor: "black" });
        mSpreadBook.ActiveSheet.SetTemplate(SPR_NonNegotiableEnhancement - 1, Spread_ALLROW, "checkbox", "check");
        mSpreadBook.ActiveSheet.SetTemplate(SPR_RequiredForms - 1, 2, "Loaded", { BackgroundColor: "#FCE5CD", Text: "Yes/No(Printing)", TextColor: "black" });
        mSpreadBook.ActiveSheet.SetTemplate(SPR_RequiredForms - 1, Spread_ALLROW, "checkbox", "check");
        mSpreadBook.ActiveSheet.SetTemplate(SPR_Trigger - 1, 2, "Loaded", { BackgroundColor: "#FCE5CD", Text: "Development, Developer Testing, SIT, Deployment, UAT", TextColor: "black" });
        mSpreadBook.ActiveSheet.SetTemplate(SPR_Trigger - 1, Spread_ALLROW, "checkbox", "check");
    //Template for Date

        mSpreadBook.ActiveSheet.SetTemplate(SPR_DateRaised - 1, 2, "Loaded", { BackgroundColor: "#FCE5CD", Text: "Date the issue is raised", TextColor: "black" });
        mSpreadBook.ActiveSheet.SetTemplate(SPR_FeedbackDate - 1, 2, "Loaded", { BackgroundColor: "#FCE5CD", Text: "Date of Feedback for FPTI Remarks", TextColor: "black" });
        mSpreadBook.ActiveSheet.FreezeRow = 3
        mSpreadBook.ActiveSheet.RenderStatus = true;

      

}

function Assigned() {
    mSpreadBook.ActiveSheet.RenderStatus = false;

    //for (var i = indexstartdata; i < mSpreadBook.ActiveSheet.Data.length; i++) {
    mSpreadBook.ActiveSheet.SetEnable(SPR_Assigned - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, false);
    mSpreadBook.ActiveSheet.SetBackground(SPR_Assigned - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, 'gainsboro');
        //mSpreadBook.ActiveSheet.SetBackground(SPR_Assigned - 1, i, 'gainsboro');
    mSpreadBook.ActiveSheet.SetEnable(SPR_Employeetask - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, false);
    mSpreadBook.ActiveSheet.SetBackground(SPR_Employeetask - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, 'gainsboro');
   
    mSpreadBook.ActiveSheet.RenderStatus = true;
}




//function template() {
//    return;
//    for (i = 3; i <= mSpreadBook.ActiveSheet.GetMaxRow() ; i++) {
//        //lookup
//        mSpreadBook.ActiveSheet.SetBackground(SPR_Company - 1, i, "#B9D6F9");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_Project - 1, i, "#B9D6F9");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_ImplemStage - 1, i, "#B9D6F9");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_Module - 1, i, "#B9D6F9");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_Menugroup - 1, i, "#B9D6F9");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_SubMenuGroup - 1, i, "#B9D6F9");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_MenuItem - 1, i, "#B9D6F9");
//        //mSpreadBook.ActiveSheet.SetBackground(SPR_RaisedBy - 1, i, "#B9D6F9"); conditional based on client
//        mSpreadBook.ActiveSheet.SetBackground(SPR_Type - 1, i, "#B9D6F9");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_Status - 1, i, "#B9D6F9");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_ActionItem - 1, i, "#B9D6F9");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_ProcessBy - 1, i, "#B9D6F9");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_Assigned - 1, i, "#B9D6F9");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_Employeetask - 1, i, "#B9D6F9");

//        //Input Field
//        mSpreadBook.ActiveSheet.SetBackground(SPR_DateRaised - 1, i, "#FFFFFF");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_RefFileName - 1, i, "#FFFFFF");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_TestCase - 1, i, "#FFFFFF");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_Concern - 1, i, "#FFFFFF");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_SubType - 1, i, "#FFFFFF");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_FPTIRemarks - 1, i, "#FFFFFF");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_FeedbackDate - 1, i, "#FFFFFF");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_Resolution - 1, i, "#FFFFFF");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_StandardVersion - 1, i, "#FFFFFF");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_EnhancementNotes - 1, i, "#FFFFFF");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_Mandays - 1, i, "#FFFFFF");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_MandaysSubmission - 1, i, "#FFFFFF");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_TargetStartDate - 1, i, "#FFFFFF");
//        mSpreadBook.ActiveSheet.SetBackground(SPR_TargetEndDate - 1, i, "#FFFFFF");

//        //loaded field
//        mSpreadBook.ActiveSheet.SetEnable(SPR_ItemNo - 1, ALLROE, false);
       
//    }

   
//}
//function cust_GetParaSpread() {
//    nwParameter_Add_Spread(mSpreadBook);
    
//}

function statusCol() {
    if (mSpreadBook.ActiveSheet.GetText(SPR_Status - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row) == 'ONGOING') {
        mSpreadBook.ActiveSheet.SetBackground(SPR_Status - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "#ffffbb");
    } else if (mSpreadBook.ActiveSheet.GetText(SPR_Status - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row) == 'DONE') {
        mSpreadBook.ActiveSheet.SetBackground(SPR_Status - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "#a6edb2");
    } else if (mSpreadBook.ActiveSheet.GetText(SPR_Status - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row) == 'NOT YET STARTED') {
        mSpreadBook.ActiveSheet.SetBackground(SPR_Status - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "#ffd4d4")
    } else if (mSpreadBook.ActiveSheet.GetText(SPR_Status - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row) == 'INVALID') {
        mSpreadBook.ActiveSheet.SetBackground(SPR_Status - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "#1D1C1A")
        mSpreadBook.ActiveSheet.SetTextColor(SPR_Status - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "#FFFFFF")
    }
}

function PriorityLvl() {
    //if (mSpreadBook.ActiveSheet.GetValue(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row) == '5') {
    //    mSpreadBook.ActiveSheet.SetBackground(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "#EE4B2B"); //#C23A22
    //    mSpreadBook.ActiveSheet.SetTextAlign(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "center");
    //    mSpreadBook.ActiveSheet.SetTextColor(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "#EDEADE"); //#C23A22 
    //    mSpreadBook.ActiveSheet.SetBold(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "Bold");
    //} else if (mSpreadBook.ActiveSheet.GetValue(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row) == '4') {
    //    mSpreadBook.ActiveSheet.SetBackground(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "#FF7518"); //#FF964F
    //    mSpreadBook.ActiveSheet.SetTextAlign(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "center");
    //    mSpreadBook.ActiveSheet.SetTextColor(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "#EDEADE"); //#C23A22 
    //    mSpreadBook.ActiveSheet.SetBold(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "Bold");
    //} else 
    
if (mSpreadBook.ActiveSheet.GetValue(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row) == '3') { //emergency
    mSpreadBook.ActiveSheet.SetBackground(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "#E74646") //#FDF98D  F62217
        mSpreadBook.ActiveSheet.SetTextAlign(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "center");
        mSpreadBook.ActiveSheet.SetTextColor(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "#290001"); //#C23A22 
        mSpreadBook.ActiveSheet.SetBold(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "Bold");
    } else if (mSpreadBook.ActiveSheet.GetValue(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row) == '2') { //important
        mSpreadBook.ActiveSheet.SetBackground(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "#F79540") //#77DD77 FF8C00
        mSpreadBook.ActiveSheet.SetTextAlign(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "center");
        mSpreadBook.ActiveSheet.SetTextColor(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "#290001"); //#C23A22 
        mSpreadBook.ActiveSheet.SetBold(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "Bold");
    } else if (mSpreadBook.ActiveSheet.GetValue(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row) == '1') { //medium
        mSpreadBook.ActiveSheet.SetBackground(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "#90AACB") //#779ECB 4169E1
        mSpreadBook.ActiveSheet.SetTextAlign(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "center");
        mSpreadBook.ActiveSheet.SetTextColor(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "#290001"); //#C23A22 
        mSpreadBook.ActiveSheet.SetBold(SPR_PriorityLevel - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "Bold");
}
}

function statusColRefresh() {

    for (var i = indexstartdata; i < mSpreadBook.ActiveSheet.Data.length; i++) {
        if (mSpreadBook.ActiveSheet.GetText(SPR_Status - 1, i) == 'ONGOING') {
            mSpreadBook.ActiveSheet.SetBackground(SPR_Status - 1, i, "#ffffbb");
        } else if (mSpreadBook.ActiveSheet.GetText(SPR_Status - 1, i) == 'DONE') {
            mSpreadBook.ActiveSheet.SetBackground(SPR_Status - 1, i, "#a6edb2");
        } else if (mSpreadBook.ActiveSheet.GetText(SPR_Status - 1, i) == 'NOT YET STARTED') {
            mSpreadBook.ActiveSheet.SetBackground(SPR_Status - 1, i, "#ffd4d4")
        } else if (mSpreadBook.ActiveSheet.GetText(SPR_Status - 1, i) == 'INVALID') {
            mSpreadBook.ActiveSheet.SetBackground(SPR_Status - 1, i, "#cdcdcd")
        }
    }
}

function cust_GetPara() {
    nwParameter_Add("txtdateto", $("#txtdateto").val());
    nwParameter_Add("txtdatefrom", $("#txtdatefrom").val());
    try {
        nwParameter_Add_DataSet("mSpread");
    } catch (ex) { }
}




$(document).on("click", "#new", function () {
    
    func_ActionDriven("DataEnable", false);
    nwLoading_Start("actDataEnable", crLoadingHTML);
});

$(document).on("click", "#copyfrom", function () {

    mSpreadBook.ActiveSheet.RenderStatus = false;

    var j = mSpreadBook.ActiveSheet.GetMaxRow() - 1;
    //for (i = indexstartdata; i <= j ; i++) {

    ChangeStatusColor(j);

    mSpreadBook.ActiveSheet.SetText(SPR_Location - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_Location - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_Company - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_Company - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_RefCompany - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_RefCompany - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_Project - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_Project - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_DateRaised - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_DateRaised - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_ImplemStage - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_ImplemStage - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_RefFileName - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_RefFileName - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_TestCase - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_TestCase - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_Module - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_Module - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_Menugroup - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_Menugroup - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_SubMenuGroup - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_SubMenuGroup - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_MenuItem - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_MenuItem - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_Concern - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_Concern - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_Client - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_Client - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_RaisedBy - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_RaisedBy - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_Type - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_Type - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_SubType - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_SubType - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    //mSpreadBook.ActiveSheet.SetText(SPR_PercentAccomp - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_PercentAccomp - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_Status - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_Status - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_ActionItem - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_ActionItem - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_FPTIRemarks - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_FPTIRemarks - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_FeedbackDate - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_FeedbackDate - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_ProcessBy - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_ProcessBy - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_Assigned - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_Assigned - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_Resolution - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_Resolution - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_Enhancement - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_Enhancement - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_NonNegotiableEnhancement - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_NonNegotiableEnhancement - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_RequiredForms - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_RequiredForms - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_StandardVersion - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_StandardVersion - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_EnhancementNotes - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_EnhancementNotes - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_Mandays - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_Mandays - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_MandaysSubmission - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_MandaysSubmission - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))
    mSpreadBook.ActiveSheet.SetText(SPR_Trigger - 1, j, mSpreadBook.ActiveSheet.GetValue(SPR_Trigger - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row))

    for (var i = indexstartdata; i < mSpreadBook.ActiveSheet.Data.length; i++) {

        // Description
        //// location
        //code = mSpreadBook.ActiveSheet.GetValue(SPR_Location - 1, i);
        //desc = cuz_GetDesription(t_location, code);
        //mSpreadBook.ActiveSheet.SetText2(SPR_Location - 1, i, desc);
        // company
        code = mSpreadBook.ActiveSheet.GetValue(SPR_Company - 1, i);
        desc = cuz_GetDesription(t_company, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_Company - 1, i, desc);
        // project
        code = mSpreadBook.ActiveSheet.GetValue(SPR_Project - 1, i);
        desc = cuz_GetDesription(t_project, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_Project - 1, i, desc);
        //implementation stage
        code = mSpreadBook.ActiveSheet.GetValue(SPR_ImplemStage - 1, i);
        desc = cuz_GetDesription(t_implemstage, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_ImplemStage - 1, i, desc);
        //module
        code = mSpreadBook.ActiveSheet.GetValue(SPR_Module - 1, i);
        desc = cuz_GetDesription(t_module, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_Module - 1, i, desc);
        // menu group
        code = mSpreadBook.ActiveSheet.GetValue(SPR_Menugroup - 1, i);
        desc = cuz_GetDesription(t_menugroup, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_Menugroup - 1, i, desc);

        // menuitem
        code = mSpreadBook.ActiveSheet.GetValue(SPR_MenuItem - 1, i);
        desc = cuz_GetDesription(t_menuitem, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_MenuItem - 1, i, desc);

        // type
        code = mSpreadBook.ActiveSheet.GetValue(SPR_Type - 1, i);
        desc = cuz_GetDesription(t_type, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_Type - 1, i, desc);

        // status
        code = mSpreadBook.ActiveSheet.GetValue(SPR_Status - 1, i);
        desc = cuz_GetDesription(t_status, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_Status - 1, i, desc);

        // actionitem
        code = mSpreadBook.ActiveSheet.GetValue(SPR_ActionItem - 1, i);
        desc = cuz_GetDesription(t_actiontype, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_ActionItem - 1, i, desc);

        // proccessedby
        code = mSpreadBook.ActiveSheet.GetValue(SPR_ProcessBy - 1, i);
        desc = cuz_GetDesription(t_processedby, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_ProcessBy - 1, i, desc);

        // assignedby
        code = mSpreadBook.ActiveSheet.GetValue(SPR_Assigned - 1, i);
        desc = cuz_GetDesription(t_assignedby, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_Assigned - 1, i, desc);

        // task
        code = mSpreadBook.ActiveSheet.GetValue(SPR_Employeetask - 1, i);
        desc = cuz_GetDesription(t_task, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_Employeetask - 1, i, desc);

        // task
        code = mSpreadBook.ActiveSheet.GetValue(SPR_RaisedBy - 1, i);
        desc = cuz_GetDesription(t_raisedby, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_RaisedBy - 1, i, desc);
    
    }








            
        
        
        

    //}
    
   
    mSpreadBook.ActiveSheet.RowAdd();
    mSpreadBook.ActiveSheet.RenderStatus = true;
  
    func_ActionDriven("actCopyRow", false);
    nwLoading_Start("actCopyrow", crLoadingHTML);
    
});

$(document).on("click", "#refresh", function () {
   
    GetAddtoListFilters();
    cust_GetPara();
    $("#StartTime").mask('99:99');
    //p8Spread_Click();
    //cust_SetTagging();
    func_ActionDriven("Refresh", false);
    nwLoading_Start("actRefresh", crLoadingHTML);
});

var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    mSpreadBook.ActiveSheet.RenderStatus = false;
    cust_GetPara();

    if (idName == 'lugCompany') {

        var Company = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(0) span").text();
        var CompanyDesc = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(1) span").text();

        mSpreadBook.ActiveSheet.SetText((SPR_Company - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, Company);
        mSpreadBook.ActiveSheet.SetText2((SPR_Company - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, CompanyDesc);

      
        if (mSpreadBook.ActiveSheet.GetSelectedIndexes().row == (mSpreadBook.ActiveSheet.GetMaxRow() - 1)) {
            //mSpreadBook.ActiveSheet.RowAdd();

            
            //nwLoading_Start("actRecuser", crLoadingHTML);


        }       
        ChangeStatusColor(mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
      //  CompanyItmNo();
    }

    else if (idName == 'lugProject') {
        var Project = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(0) span").text();
        var ProjectDesc = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(1) span").text();

        mSpreadBook.ActiveSheet.SetText((SPR_Project - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, Project);
        mSpreadBook.ActiveSheet.SetText2((SPR_Project - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, ProjectDesc);
        ChangeStatusColor(mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
    }

    else if (idName == 'lugModule') {
        var ModuleCode = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(0) span").text();
        var ModuleName = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(1) span").text();

        mSpreadBook.ActiveSheet.SetText((SPR_Module - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, ModuleCode);
        mSpreadBook.ActiveSheet.SetText2((SPR_Module - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, ModuleName);
        //mSpreadBook.ActiveSheet.SetText((SPR_ModuleName - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, ModuleName);
        ChangeStatusColor(mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
    }

    else if (idName == 'lugMenuGroup') {
        var MenuGroupCode = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(0) span").text();
        var MenuGroupDesc = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(1) span").text();

        mSpreadBook.ActiveSheet.SetText((SPR_Menugroup - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, MenuGroupCode);
        mSpreadBook.ActiveSheet.SetText2((SPR_Menugroup - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, MenuGroupDesc);
        //mSpreadBook.ActiveSheet.SetText((SPR_ModuleName - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, ModuleName);
        ChangeStatusColor(mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
    }

    else if (idName == 'lugMenuItem') {
        var MenuItemCode = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(0) span").text();
        var MenuItemName = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(1) span").text();

        mSpreadBook.ActiveSheet.SetText((SPR_MenuItem - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, MenuItemCode);
        mSpreadBook.ActiveSheet.SetText2((SPR_MenuItem - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, MenuItemName);
        //mSpreadBook.ActiveSheet.SetText((SPR_MenuItemName - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, MenuItemName);
        ChangeStatusColor(mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
    }

    else if (idName == 'lugStatus') {
        var Status = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(0) span").text();
        var Status2 = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(1) span").text();

        mSpreadBook.ActiveSheet.SetText((SPR_Status - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, Status);
        mSpreadBook.ActiveSheet.SetText2((SPR_Status - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, Status2);

        statusCol();

        ChangeStatusColor(mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
    }
    else if (idName == 'lugImplemStage') {
        var ImplemStageCode = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(0) span").text();
        var ImplemStageDesc = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(1) span").text();

        mSpreadBook.ActiveSheet.SetText((SPR_ImplemStage - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, ImplemStageCode);
        mSpreadBook.ActiveSheet.SetText2((SPR_ImplemStage - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, ImplemStageDesc);
        ChangeStatusColor(mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
    }

    else if (idName == 'lugType') {
        var TypeCode = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(0) span").text();
        var TypeDesc = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(1) span").text();

        mSpreadBook.ActiveSheet.SetText((SPR_Type - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, TypeCode);
        mSpreadBook.ActiveSheet.SetText2((SPR_Type - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, TypeDesc);
        ChangeStatusColor(mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
    }

    else if (idName == 'lugActionItem') {
        var ActionItemCode = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(0) span").text();
        var ActionItemDesc = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(1) span").text();

        mSpreadBook.ActiveSheet.SetText((SPR_ActionItem - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, ActionItemCode);
        mSpreadBook.ActiveSheet.SetText2((SPR_ActionItem - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, ActionItemDesc);
        ChangeStatusColor(mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
    }

    else if (idName == 'lugProcessedBy') {
        var ProcessedByCode = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(0) span").text();
        var ProcessedByDesc = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(1) span").text();

        mSpreadBook.ActiveSheet.SetText((SPR_ProcessBy - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, ProcessedByCode);
        mSpreadBook.ActiveSheet.SetText2((SPR_ProcessBy - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, ProcessedByDesc);
        ChangeStatusColor(mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
    }

    else if (idName == 'lugAssigned') {
        var AssignedCode = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(0) span").text();
        var AssignedDesc = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(1) span").text();

        mSpreadBook.ActiveSheet.SetText((SPR_Assigned - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, AssignedCode);
        mSpreadBook.ActiveSheet.SetText2((SPR_Assigned - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, AssignedDesc);
        ChangeStatusColor(mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
    }

    else if (idName == 'lugRaisedby') {

        var RaisedByCode = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(0) span").text();
        var RaisedByDesc = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(1) span").text();

        mSpreadBook.ActiveSheet.SetText((SPR_RaisedBy - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, RaisedByCode);
        mSpreadBook.ActiveSheet.SetText2((SPR_RaisedBy - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, RaisedByDesc);
        ChangeStatusColor(mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
    }
    

    else if (idName == 'lugEmployeeTask') {
        var EmployeeTaskCode = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(0) span").text();
        var EmployeeTaskDesc = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(1) span").text();

        mSpreadBook.ActiveSheet.SetText((SPR_Employeetask - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, EmployeeTaskCode);
        mSpreadBook.ActiveSheet.SetText2((SPR_Employeetask - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, EmployeeTaskDesc);
        ChangeStatusColor(mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
    }

    else if (idName == 'lugSubMenuGroup') {
        var SubmenuGroupCode = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(0) span").text();
        var SubmenuGroupDesc = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(1) span").text();

        mSpreadBook.ActiveSheet.SetText((SPR_SubMenuGroup - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, SubmenuGroupCode);
        mSpreadBook.ActiveSheet.SetText2((SPR_SubMenuGroup - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, SubmenuGroupDesc);
        ChangeStatusColor(mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
    }

    else if (idName == 'lugPriority') {
        var PriorityCode = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(0) span").text();
        var PriorityDesc = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(1) span").text();

        mSpreadBook.ActiveSheet.SetText((SPR_PriorityLevel - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, PriorityCode);
        mSpreadBook.ActiveSheet.SetText2((SPR_PriorityLevel - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, PriorityDesc);
        ChangeStatusColor(mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
        PriorityLvl();
    }

    else if (idName == 'lugLocation') {
        var LocationCode = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(0) span").text();
        var LocationDesc = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(1) span").text();

        mSpreadBook.ActiveSheet.SetText((SPR_Location - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, LocationCode);
        mSpreadBook.ActiveSheet.SetText2((SPR_Location - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, LocationDesc);
        ChangeStatusColor(mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
    }
    
    mSpreadBook.ActiveSheet.RenderStatus = true;
}

function func_LookUpInitialize(lookupid) {
    mSpreadBook.ActiveSheet.RenderStatus = false;
    
    if (lookupid == 'lugProject') {
        //var Company = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(0) span").text();
        var CompanyRes = mSpreadBook.ActiveSheet.GetValue((SPR_Company - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
        nwParameter_Add('txtCompany', CompanyRes);
        //func_ActionDriven("actGenerateItemNo", false);
    }

    if (lookupid == 'lugMenuItem') {
        //var Company = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(0) span").text();
        var MenuGroup = mSpreadBook.ActiveSheet.GetValue((SPR_Menugroup - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
        var ModuleResp = mSpreadBook.ActiveSheet.GetValue((SPR_Module - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
        nwParameter_Add('txtMenuGroup', MenuGroup);
        nwParameter_Add('txtModule2', ModuleResp);
    }
    
    if (lookupid == 'lugMenuGroup') {
        //var Company = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(0) span").text();
        var ModuleDesc = mSpreadBook.ActiveSheet.GetValue((SPR_Module - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
        nwParameter_Add('txtModule', ModuleDesc);
    }
    if (lookupid == 'lugSubMenuGroup') {
        //var Company = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(0) span").text();
        var ModuleDesc1 = mSpreadBook.ActiveSheet.GetValue((SPR_Module - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
        nwParameter_Add('txtModule1', ModuleDesc1);
    }


    mSpreadBook.ActiveSheet.RenderStatus = true;
    
}


function cust_SetTagging() {
    mSpreadBook.ActiveSheet.RenderStatus = false;
    nwLoading_Start("setTagging", crLoadingHTML);
    for (var i = indexstartdata; i < mSpreadBook.ActiveSheet.Data.length; i++) {
       
       
        //SetTagging
        if (mSpreadBook.ActiveSheet.GetValue(SPR_Tag - 1, i) == "2") {
            mSpreadBook.ActiveSheet.SetText2(SPR_Tag - 1, i, "Saved");
            mSpreadBook.ActiveSheet.SetBold(SPR_Tag - 1, i, "Bold");
            mSpreadBook.ActiveSheet.SetBackground(SPR_Tag - 1, i, "#95CD41"); //59E817

            if (mSpreadBook.ActiveSheet.GetValue(SPR_Screenshot - 1, i) == "1") {
                 mSpreadBook.ActiveSheet.SetBackground(SPR_Screenshot - 1, i, bgcolorbuttonWithContent);
            }
            else {
                mSpreadBook.ActiveSheet.SetBackground(SPR_Screenshot - 1, i, bgcolorbuttonOpen);
            }
        }

        if (mSpreadBook.ActiveSheet.GetValue(SPR_Tag - 1, i) == "2") {
            mSpreadBook.ActiveSheet.SetText2(SPR_Tag - 1, i, "Saved");
            mSpreadBook.ActiveSheet.SetBold(SPR_Tag - 1, i, "Bold");
            mSpreadBook.ActiveSheet.SetBackground(SPR_Tag - 1, i, "#95CD41");

            if (mSpreadBook.ActiveSheet.GetValue(SPR_ItemNo - 1, i) != "") {
                mSpreadBook.ActiveSheet.SetEnable(SPR_Assigned - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, true);
                mSpreadBook.ActiveSheet.SetBackground(SPR_Assigned - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, bgcolorlookup);

                mSpreadBook.ActiveSheet.SetEnable(SPR_Employeetask - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, true);
                mSpreadBook.ActiveSheet.SetBackground(SPR_Employeetask - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, bgcolorlookup);
            }
            //}
            //else {
            //    mSpreadBook.ActiveSheet.SetEnable(SPR_Assigned - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, true);
            //    mSpreadBook.ActiveSheet.SetBackground(SPR_Assigned - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, bgcolorlookup);
            //}
        }




        if (mSpreadBook.ActiveSheet.GetValue(SPR_Client - 1, i) == "0" || mSpreadBook.ActiveSheet.GetValue(SPR_Client - 1, i) == "False" && mSpreadBook.ActiveSheet.GetValue(SPR_Tag - 1, i) == "1" || mSpreadBook.ActiveSheet.GetValue(SPR_Client - 1, i) == "New") {
            mSpreadBook.ActiveSheet.SetBackground(SPR_RaisedBy - 1, i, bgcolorlookup);
        } else {
            mSpreadBook.ActiveSheet.SetBackground(SPR_RaisedBy - 1, i, bgcolorEnable);

        }

    

        //mSpreadBook.ActiveSheet.GetValue(SPR_Tag - 1, i) == "1" || mSpreadBook.ActiveSheet.GetValue(SPR_Tag - 1, i) == "0"

        //if (mSpreadBook.ActiveSheet.GetValue(SPR_PriorityLevel - 1, i) == '5') {
        //    mSpreadBook.ActiveSheet.SetBackground(SPR_PriorityLevel - 1, i, "#C23A22");
        //    mSpreadBook.ActiveSheet.SetTextAlign(SPR_PriorityLevel - 1, i, "center");
        //    mSpreadBook.ActiveSheet.SetTextColor(SPR_PriorityLevel - 1, i, "#EDEADE");
        //    mSpreadBook.ActiveSheet.SetBold(SPR_PriorityLevel - 1, i, "Bold");
        //} else if (mSpreadBook.ActiveSheet.GetValue(SPR_PriorityLevel - 1, i) == '4') {
        //    mSpreadBook.ActiveSheet.SetBackground(SPR_PriorityLevel - 1, i, "#FF964F");
        //    mSpreadBook.ActiveSheet.SetTextAlign(SPR_PriorityLevel - 1, i, "center");
        //    mSpreadBook.ActiveSheet.SetTextColor(SPR_PriorityLevel - 1, i, "#EDEADE");
        //    mSpreadBook.ActiveSheet.SetBold(SPR_PriorityLevel - 1, i, "Bold");
        // } else 



        if (mSpreadBook.ActiveSheet.GetValue(SPR_PriorityLevel - 1, i) == '3') { //emergency
            mSpreadBook.ActiveSheet.SetBackground(SPR_PriorityLevel - 1, i, "#E74646") //F62217
            mSpreadBook.ActiveSheet.SetTextAlign(SPR_PriorityLevel - 1, i, "center");
            mSpreadBook.ActiveSheet.SetTextColor(SPR_PriorityLevel - 1, i, "#290001");
            mSpreadBook.ActiveSheet.SetBold(SPR_PriorityLevel - 1, i, "Bold");
        } else if (mSpreadBook.ActiveSheet.GetValue(SPR_PriorityLevel - 1, i) == '2') { //important
            mSpreadBook.ActiveSheet.SetBackground(SPR_PriorityLevel - 1, i, "#F79540") //FF8C00
            mSpreadBook.ActiveSheet.SetTextAlign(SPR_PriorityLevel - 1, i, "center");
            mSpreadBook.ActiveSheet.SetTextColor(SPR_PriorityLevel - 1, i, "#290001");//EDEADE
            mSpreadBook.ActiveSheet.SetBold(SPR_PriorityLevel - 1, i, "Bold");
        } else if (mSpreadBook.ActiveSheet.GetValue(SPR_PriorityLevel - 1, i) == '1') { //medium
            mSpreadBook.ActiveSheet.SetBackground(SPR_PriorityLevel - 1, i, "#90AACB") //4169E1
            mSpreadBook.ActiveSheet.SetTextAlign(SPR_PriorityLevel - 1, i, "center");
            mSpreadBook.ActiveSheet.SetTextColor(SPR_PriorityLevel - 1, i, "#290001");
            mSpreadBook.ActiveSheet.SetBold(SPR_PriorityLevel - 1, i, "Bold");
        }
        // Description
       
        // company
        var code = mSpreadBook.ActiveSheet.GetValue(SPR_Company - 1, i);
        var desc = cuz_GetDesription(t_company, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_Company - 1, i, desc);
        // project
        code = mSpreadBook.ActiveSheet.GetValue(SPR_Project - 1, i);
        desc = cuz_GetDesription(t_project, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_Project - 1, i, desc);
        //implementation stage
        code = mSpreadBook.ActiveSheet.GetValue(SPR_ImplemStage - 1, i);
        desc = cuz_GetDesription(t_implemstage, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_ImplemStage - 1, i, desc);
        //module
        code = mSpreadBook.ActiveSheet.GetValue(SPR_Module - 1, i);
        desc = cuz_GetDesription(t_module, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_Module - 1, i, desc);
        // menu group
        code = mSpreadBook.ActiveSheet.GetValue(SPR_Menugroup - 1, i);
        desc = cuz_GetDesription(t_menugroup, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_Menugroup - 1, i, desc);
       

        // menuitem
        code = mSpreadBook.ActiveSheet.GetValue(SPR_MenuItem - 1, i);
        desc = cuz_GetDesription(t_menuitem, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_MenuItem - 1, i, desc);

        // type
        code = mSpreadBook.ActiveSheet.GetValue(SPR_Type - 1, i);
        desc = cuz_GetDesription(t_type, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_Type - 1, i, desc);

        // status
        code = mSpreadBook.ActiveSheet.GetValue(SPR_Status - 1, i);
        desc = cuz_GetDesription(t_status, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_Status - 1, i, desc);

        // actionitem
        code = mSpreadBook.ActiveSheet.GetValue(SPR_ActionItem - 1, i);
        desc = cuz_GetDesription(t_actiontype, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_ActionItem - 1, i, desc);

        // proccessedby
        code = mSpreadBook.ActiveSheet.GetValue(SPR_ProcessBy - 1, i);
        desc = cuz_GetDesription(t_processedby, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_ProcessBy - 1, i, desc);

        // assignedby
        code = mSpreadBook.ActiveSheet.GetValue(SPR_Assigned - 1, i);
        desc = cuz_GetDesription(t_assignedby, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_Assigned - 1, i, desc);

        // task
        code = mSpreadBook.ActiveSheet.GetValue(SPR_Employeetask - 1, i);
        desc = cuz_GetDesription(t_task, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_Employeetask - 1, i, desc);

        // raised by
        code = mSpreadBook.ActiveSheet.GetValue(SPR_RaisedBy - 1, i);
        desc = cuz_GetDesription(t_raisedby, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_RaisedBy - 1, i, desc);

        // recuser
        code = mSpreadBook.ActiveSheet.GetValue(SPR_CreatedBy - 1, i);
        desc = cuz_GetDesription(t_recuser, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_CreatedBy - 1, i, desc);

        // moduser
        code = mSpreadBook.ActiveSheet.GetValue(SPR_ModifiedBy - 1, i);
        desc = cuz_GetDesription(t_moduser, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_ModifiedBy - 1, i, desc);

        // PRiority
        code = mSpreadBook.ActiveSheet.GetValue(SPR_PriorityLevel - 1, i);
        desc = cuz_GetDesription(t_prio, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_PriorityLevel - 1, i, desc);

        // location
        code = mSpreadBook.ActiveSheet.GetValue(SPR_Location - 1, i);
        desc = cuz_GetDesription(t_location, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_Location - 1, i, desc);
       
        //sub menu group
        code = mSpreadBook.ActiveSheet.GetValue(SPR_SubMenuGroup - 1, i);
        desc = cuz_GetDesription(t_submenugroup, code);
        mSpreadBook.ActiveSheet.SetText2(SPR_SubMenuGroup - 1, i, desc);
    

        //Set color on status
        if (mSpreadBook.ActiveSheet.GetText(SPR_Status - 1, i) == 'ONGOING') {
            mSpreadBook.ActiveSheet.SetBackground(SPR_Status - 1, i, "#ffffbb");
        } else if (mSpreadBook.ActiveSheet.GetText(SPR_Status - 1, i) == 'DONE') {
            mSpreadBook.ActiveSheet.SetBackground(SPR_Status - 1, i, "#a6edb2");
        } else if (mSpreadBook.ActiveSheet.GetText(SPR_Status - 1, i) == 'NOT YET STARTED') {
            mSpreadBook.ActiveSheet.SetBackground(SPR_Status - 1, i, "#ffd4d4")
        } else if (mSpreadBook.ActiveSheet.GetText(SPR_Status - 1, i) == 'INVALID') {
            mSpreadBook.ActiveSheet.SetBackground(SPR_Status - 1, i, "#cdcdcd")
        }

       // console.log(mSpreadBook.ActiveSheet.RenderStatus + " "+ i);
    }

 
    setTimeout(function () {
        NS_SpreadResize();
        mSpreadBook.ActiveSheet.RenderStatus = true;
        mSpreadBook.ActiveSheet.Refresh();
        nwLoading_End("setTagging");
    }, 1000);
    
}

function cust_descrecuser() {

    code = mSpreadBook.ActiveSheet.GetValue(SPR_CreatedBy - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
    desc = cuz_GetUserDesc(code);
        mSpreadBook.ActiveSheet.SetText2(SPR_CreatedBy - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, desc);

}

function cust_descmoduser() {

    code = mSpreadBook.ActiveSheet.GetValue(SPR_ModifiedBy - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
    desc = cuz_GetUserDesc(code);
    mSpreadBook.ActiveSheet.SetText2(SPR_ModifiedBy - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, desc);

}
$(document).on('click', '#save', function () {


   // cust_GetPara();

    var jsondata = [];
    for (var i = indexstartdata; i < mSpreadBook.ActiveSheet.Data.length; i++) {
        if (mSpreadBook.ActiveSheet.GetValue(SPR_Tag - 1, i) == "1" || mSpreadBook.ActiveSheet.GetValue(SPR_Tag - 1, i) == "0") {
            mSpreadBook.ActiveSheet.SetValue(SPR_Tag - 1, i, "2");
            mSpreadBook.ActiveSheet.SetText2(SPR_Tag - 1, i, "Saved");
            mSpreadBook.ActiveSheet.SetBold(SPR_Tag - 1, i, "Bold");
            mSpreadBook.ActiveSheet.SetBackground(SPR_Tag - 1, i, "#59E817");
            jsondata.push({
                
               "Company": mSpreadBook.ActiveSheet.GetValue(SPR_Company - 1, i)
              , "Project": mSpreadBook.ActiveSheet.GetValue(SPR_Project - 1, i)
              , "ItemNo": mSpreadBook.ActiveSheet.GetValue(SPR_ItemNo - 1, i)
              , "DateRaised": mSpreadBook.ActiveSheet.GetValue(SPR_DateRaised - 1, i)
              , "ImplemStage": mSpreadBook.ActiveSheet.GetValue(SPR_ImplemStage - 1, i)
              , "StatusDoc": mSpreadBook.ActiveSheet.GetValue(SPR_RefFileName - 1, i)
              , "TestCase": mSpreadBook.ActiveSheet.GetValue(SPR_TestCase - 1, i)
              , "Module": mSpreadBook.ActiveSheet.GetValue(SPR_Module - 1, i)
              , "Menugroup": mSpreadBook.ActiveSheet.GetValue(SPR_Menugroup - 1, i)
              , "SubMenuGroup": mSpreadBook.ActiveSheet.GetText(SPR_SubMenuGroup - 1, 3)
              , "MenuItem": mSpreadBook.ActiveSheet.GetValue(SPR_MenuItem - 1, i)
              , "Concern": mSpreadBook.ActiveSheet.GetValue(SPR_Concern - 1, i)
              , "Client": mSpreadBook.ActiveSheet.GetValue(SPR_Client - 1, i)
              , "RaisedBy": mSpreadBook.ActiveSheet.GetValue(SPR_RaisedBy - 1, i)
              , "Type": mSpreadBook.ActiveSheet.GetValue(SPR_Type - 1, i)
              , "SubType": mSpreadBook.ActiveSheet.GetValue(SPR_SubType - 1, i)
              , "Status": mSpreadBook.ActiveSheet.GetValue(SPR_Status - 1, i)
              , "ActionItem": mSpreadBook.ActiveSheet.GetValue(SPR_ActionItem - 1, i)

              , "FPTIRemarks": mSpreadBook.ActiveSheet.GetValue(SPR_FPTIRemarks - 1, i)
              , "FeedbackDate": mSpreadBook.ActiveSheet.GetValue(SPR_FeedbackDate - 1, i)
              , "ProcessBy": mSpreadBook.ActiveSheet.GetValue(SPR_ProcessBy - 1, i)
              , "Assigned": mSpreadBook.ActiveSheet.GetValue(SPR_Assigned - 1, i)
              , "Resolution": mSpreadBook.ActiveSheet.GetValue(SPR_Resolution - 1, i)
              , "Enhancement": mSpreadBook.ActiveSheet.GetValue(SPR_Enhancement - 1, i)
              , "NonNegotiableEnhancement": mSpreadBook.ActiveSheet.GetValue(SPR_NonNegotiableEnhancement - 1, i)
              , "RequiredForms": mSpreadBook.ActiveSheet.GetValue(SPR_RequiredForms - 1, i)
              , "StandardVersion": mSpreadBook.ActiveSheet.GetValue(SPR_StandardVersion - 1, i)
              , "EnhancementNotes": mSpreadBook.ActiveSheet.GetValue(SPR_EnhancementNotes - 1, i)
              , "Mandays": mSpreadBook.ActiveSheet.GetValue(SPR_Mandays - 1, i)
              , "MandaysSubmission": mSpreadBook.ActiveSheet.GetValue(SPR_MandaysSubmission - 1, i)
              , "ButtonTriggered": mSpreadBook.ActiveSheet.GetValue(SPR_Trigger - 1, i)
              , "Employeetask": mSpreadBook.ActiveSheet.GetValue(SPR_Employeetask - 1, i)
              , "TargetStartDate": mSpreadBook.ActiveSheet.GetValue(SPR_TargetStartDate - 1, i)
              , "TargetEndDate": mSpreadBook.ActiveSheet.GetValue(SPR_TargetEndDate - 1, i)
              , "Recuser": mSpreadBook.ActiveSheet.GetValue(SPR_CreatedBy - 1, i)
              , "recdate": mSpreadBook.ActiveSheet.GetValue(SPR_DateCreated - 1, i)
                , "modifiedby": mSpreadBook.ActiveSheet.GetValue(SPR_ModifiedBy - 1, i)
              , "ModifiedDate": mSpreadBook.ActiveSheet.GetValue(SPR_ModifiedDate - 1, i)
              , "rowno": (i + 1)
              , "PriorityLevel": mSpreadBook.ActiveSheet.GetValue(SPR_PriorityLevel - 1, i)
              , "StartTime": mSpreadBook.ActiveSheet.GetValue(SPR_StartTime - 1, i)
              , "EndTime": mSpreadBook.ActiveSheet.GetValue(SPR_EndTime - 1, i)
              , "Location": mSpreadBook.ActiveSheet.GetValue(SPR_Location - 1, i)
             , "PercentageofCompletion": mSpreadBook.ActiveSheet.GetValue(SPR_PercentAccomp - 1, i)
             , "RefCompany": mSpreadBook.ActiveSheet.GetValue(SPR_RefCompany - 1, i)
                , "DocStatus": mSpreadBook.ActiveSheet.GetValue(SPR_DocStatus - 1, i)
        });
    
            
        }
    }

    //for (var i = 2; i < mSpreadBook.ActiveSheet.Data.length; i++) {
    //    if (mSpreadBook.ActiveSheet.GetValue(SPR_Tag - 1, i) == "1" || mSpreadBook.ActiveSheet.GetValue(SPR_Tag - 1, i) == "0") {
    //        mSpreadBook.ActiveSheet.SetValue(SPR_Tag - 1, i, "2");
    //        mSpreadBook.ActiveSheet.SetText2(SPR_Tag - 1, i, "Saved");
    //        mSpreadBook.ActiveSheet.SetBackground(1, i, "lightgreen");
    //    }
    //}

  
    nwParameter_Add("jsondata", JSON.stringify(jsondata));
    func_ActionDriven("GridSave", false);
    nwLoading_Start("GridSave", crLoadingHTML);
});

var ItemID = "";
var Company = "";
var crIndexSpread = -1;
function p8Spread_Click(canvasID, row, col) {

    if (canvasID == "mSpread") {
        if (col == (SPR_Screenshot - 1) && row >= indexstartdata) {
            
            ItemID = mSpreadBook.ActiveSheet.GetText((SPR_ItemNo - 1), row);
            if (ItemID != "") {

                if (mSpreadBook.ActiveSheet.GetValue((SPR_Screenshot - 1), row) == "1") {
                    nwParameter_Add('ItemID', ItemID);
                    nwLoading_Start("actGetScreenShot", crLoadingHTML);
                    func_ActionDriven("actGetScreenShot", false);
                }

                crIndexSpread = row;
                $("#nwgRemarksLogCon").addClass("show");
                $("#nwgRemarksLogCon").show();
                nwPopupForm_ShowModal("nwgRemarksLogCon");
                SpreadBookRemarksCur = mSpreadBook;
                SpreadBookRemarksTagging = true;

            }
           
        } else if (col == (SPR_Client - 1)) {
            if (mSpreadBook.ActiveSheet.GetText(SPR_Client - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row) == 0) {
                mSpreadBook.ActiveSheet.SetBackground(SPR_RaisedBy - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, bgcolorlookup);
            } else {
                mSpreadBook.ActiveSheet.SetBackground(SPR_RaisedBy - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, bgcolorEnable);
                
            }
        }
        else if (col == (SPR_Trigger - 1)) {
            if (mSpreadBook.ActiveSheet.GetText(SPR_Trigger - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row) == 1) {
                Company = mSpreadBook.ActiveSheet.GetText((SPR_Company - 1), row);
                //ButtonTriggered = mSpreadBook.ActiveSheet.GetText((SPR_Trigger - 1), row);
                nwParameter_Add('Company', Company);            
               // nwParameter_Add('ButtonTriggered', ButtonTriggered);
                //nwLoading_Start("actTaskEntry", crLoadingHTML);
                ChangeStatusColor(mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
                //func_ActionDriven("actTaskEntry", false);
            }
            else {
                ChangeStatusColor(mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
            }
        }
    }
}


function p8Spread_DblClick(canvasID, row, col) {


    if (canvasID == "mSpread") {
        if (col == SPR_RaisedBy - 1) {
            if (mSpreadBook.ActiveSheet.GetValue(SPR_Client - 1, row) == "0" || mSpreadBook.ActiveSheet.GetValue(SPR_Client - 1, row) == "False") {
                
                lookUpCustomize("lugRaisedby", 1);
                return false;
            }

        }
    }

}

function p8Spread_Change(canvasID, row, col) {

    if (canvasID == "mSpread") {
        
        if (col == SPR_TargetStartDate - 1) {

            var startdate = mSpreadBook.ActiveSheet.GetText(SPR_TargetStartDate - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row)
            var enddate = mSpreadBook.ActiveSheet.GetText(SPR_TargetEndDate - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row)

         
            if (Date.parse(startdate) >= Date.parse(enddate)) {
                MessageBox("Cannot proceed. Target start date should not be later than target end date.\n", baseTitle, "error");
                mSpreadBook.ActiveSheet.SetText(SPR_TargetStartDate - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "")

            }

           
        } else if (col == SPR_DateRaised - 1) {

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;

            var dateraised = mSpreadBook.ActiveSheet.GetText(SPR_DateRaised - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row)
            //var curr = mSpreadBook.ActiveSheet.GetText(SPR_CurrentDate - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row)


        
            if (Date.parse(dateraised) > Date.parse(today)) {
                MessageBox("Cannot proceed. Date Raised should not be later than current server date.\n", baseTitle, "error");
                mSpreadBook.ActiveSheet.SetText(SPR_DateRaised - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "")

            }

            
        } else if (col == SPR_TargetEndDate - 1) {

            var startdate2 = mSpreadBook.ActiveSheet.GetText(SPR_TargetStartDate - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row)
            var enddate2 = mSpreadBook.ActiveSheet.GetText(SPR_TargetEndDate - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row)


            if (Date.parse(startdate2) >= Date.parse(enddate2)) {
                MessageBox("Cannot proceed. Target end date should not be earlier than target start date.\n", baseTitle, "error");
                mSpreadBook.ActiveSheet.SetText(SPR_TargetEndDate - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "")

            }
        }

        else if (col == SPR_StartTime - 1) {

            var valid = StartTime(this);
            if (valid) {
                _timeOld = $(this).val();
            }

        }

        else if (col == SPR_EndTime - 1) {

            var valid = EndTime(this);
            if (valid) {
                _timeOld = $(this).val();
            }

        }
    
       // mSpreadBook.ActiveSheet.SetValue(1, row, "0"); // new 


        //    mSpreadBook.ActiveSheet.SetBackground((SPR_Tag - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "#87CEEB");
        ChangeStatusColor(row);
        StatusCol();
        PriorityLvl();
            
       
       


       
        //mSpreadBook.ActiveSheet.SetValue(1, 4, "2"); // Saved without changes
        //mSpreadBook.ActiveSheet.SetText2(1, 2, "New"); // new 
       
        //mSpreadBook.ActiveSheet.SetText2(1, 4, "Saved"); // Saved without changes

        // mSpreadBook.ActiveSheet.SetTextColor(1, 2, "gray"); // new 
      

        // mSpreadBook.ActiveSheet.SetTextColor(1, 4, "gray"); // Saved without changes

        // mSpreadBook.ActiveSheet.SetBackground(1, 2, "lightblue"); // new 
       
        //mSpreadBook.ActiveSheet.SetBackground(1, 4, "lightgreen"); // Saved without changes
    }
}


//function CreateGridDone() {
//    //if (col == (SPR_Client - 1)) {
//        //if (mSpreadBook.ActiveSheet.GetText(SPR_Client - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row) == 0) {
//        //    mSpreadBook.ActiveSheet.SetBackground(SPR_RaisedBy - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, bgcolorlookup);
//        //} else {
//        //    mSpreadBook.ActiveSheet.SetBackground(SPR_RaisedBy - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, bgcolorEnable);

//        //}

//    if (mSpreadBook.ActiveSheet.GetValue(SPR_Client - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row) == "0" ||
//        mSpreadBook.ActiveSheet.GetValue(SPR_Client - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row) == "False" &&
//        mSpreadBook.ActiveSheet.GetValue(SPR_Tag - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row) == "1" ||
//        mSpreadBook.ActiveSheet.GetValue(SPR_Client - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row) == "New") {
//            mSpreadBook.ActiveSheet.SetBackground(SPR_RaisedBy - 1,mSpreadBook.ActiveSheet.GetSelectedIndexes().row, bgcolorlookup);
//        } else {
//            mSpreadBook.ActiveSheet.SetBackground(SPR_RaisedBy - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, bgcolorEnable);

//        }


//        //p8Spread_Click();
//   // }
//}


function ChangeStatusColor(row) {
    if (mSpreadBook.ActiveSheet.GetValue(SPR_ItemNo - 1, row) != "") {
        mSpreadBook.ActiveSheet.SetValue(1, row, "1"); // Saved - with updates
        mSpreadBook.ActiveSheet.SetText2(1, row, "With changes"); // Saved - with updates
        mSpreadBook.ActiveSheet.SetTextColor(1, row, "#3B3131"); // Saved - with updates
        mSpreadBook.ActiveSheet.SetBold(1, row, "Bold");
        mSpreadBook.ActiveSheet.SetBackground(1, row, "#F3ECB0"); // Saved - with updates F0E68C

        if (mSpreadBook.ActiveSheet.GetValue(SPR_PercentAccomp - 1, row) == "") {
            mSpreadBook.ActiveSheet.SetValue(SPR_PercentAccomp - 1, row, '0.00')
        }


       // func_ActionDriven("actUpdate", false);
        func_ActionDriven("Moduser", false);

    } else {
        mSpreadBook.ActiveSheet.SetValue(1, row, "0");
        mSpreadBook.ActiveSheet.SetText2(1, row, "New");
        mSpreadBook.ActiveSheet.SetBold(1, row, "Bold");
        mSpreadBook.ActiveSheet.SetTextColor(1, row, "#3B3131");
        mSpreadBook.ActiveSheet.SetBackground(1, row, "#F7DB6A");  //E3F9A6
        mSpreadBook.ActiveSheet.SetValue(SPR_PercentAccomp - 1, row, '0.00')
        Assigned();


        func_ActionDriven("Recuser", false);
    }
}

function func_RemarksSavings(mbook,content) {

    nwParameter_Add('content', content);
    nwParameter_Add('content', ItemID);

    func_ActionDriven("saveremarks", false);

}
$(document).on("click", "#addrow", function () {

    mSpreadBook.ActiveSheet.RowAdd();
});

$(document).on("click", "#filter", function () {

    $("#nwgFilterCon").addClass("show");
    $("#nwgFilterCon").show();
    nwPopupForm_ShowModal("nwgFilterCon");
});

$(document).on("click", "#btnnwgRemarksSave", function () {


    var html = $("#cmsnwgRemarks .nwCMSContent").html();
    nwParameter_Add('html', html);
    nwParameter_Add('ItemID', ItemID);
    nwLoading_Start("actSaveScreenShot", crLoadingHTML);
    func_ActionDriven("actSaveScreenShot", false);
});



//$(document).on("click", ".nw-htr-i-btn.close", function () {
//    $(".nw-htr-container").removeClass("show");
//    $(".nw-htr-box").removeClass("fullscreen");
//});


//$(document).on("click", "#btnnwgRemarks", function () {
//    $(".nw-htr-container").removeClass("show");
//    $(".nw-htr-box").removeClass("fullscreen");
//    nwParameter_Add('ScreenshotRemarks', $('.nwCMSContent').html());
//    func_ActionDriven("saveremarks", false);
//});

//filter 
$(function () {
    $("#settingstabs").tabs();
});

$(function () {
    $("#settingstabs1").tabs();
});

$(function () {
    $("#settingstabs2").tabs();
});

////addtolist
//function func_LookUpInitialize(idName) {
//    //if (idName === "Customer" || idName === "CustomerClassification") {
//    //    nwParameter_Add("dateFilterSel", $('input[name=dateFilter]').filter(':checked').attr("filtername"));
//    //    nwParameter_Add("dpMonthly", $("#dpMonthly").val());
//    //    nwParameter_Add("dpAnnually", $("#dpAnnually").val());
//    //    nwParameter_Add("dpQuarterly", $("#dpQuarterly").val());
//    //    nwParameter_Add("txtFrom", $("#txtFrom").val());
//    //    nwParameter_Add("txtTo", $("#txtTo").val());
//    //    GetAddtoListFilters();
//    //}
//}



//// Addtolist codes #4
$(document).on("click", ".btnGetlookup", function () {
    crnwTableCon = null; // if grid is click 
    var xtype = $(this).attr("nwtype");
    var selectedInput = xtype;
    GetAddtoListFilters();
    lookUpCustomize(selectedInput, 2);
    return false;
});

$(document).on("click", ".btnClearList", function () {
    crnwTableCon = null; // if grid is click 
    var xtype = $(this).attr("nwtype");
    $('div.atlContainer[nwtype=' + xtype + ']').find(".innertext").html("");
});
//$(document).on('click', 'span.classx', function () {
//    $(this).closest('div.spantext').remove();
//});

//function getloadfilter() {
//    var count = $('.atl_Project .spantext').length
//    crnwTable = $("#nwGridMainCon .tblGridBody");
//    var allloc = "";
//    for (var i = 0; i <= count; i++) {
//        var loc = $('.atl_Project .spantext:eq(' + i + ')').text().substring(0, $('.spantext:eq(' + i + ')').text().length - 1);

//        if (loc.length > 0) {
//            allloc += loc + ";";
//        }
//    }
//    allloc = allloc.substring(0, allloc.length - 1)
//    if (allloc.length == 0) {
//        allloc = "All Locations";
//    }
//    crnwTable.find("tr:eq(4)").find('td:eq(1) ').text('LOCATION NAME: ' + allloc);
//}

//// Addtolist codes #2
//function GenerateLookupListDataHTML(xvalue, xdisplay) {
//    return '<div class="spantext" nwcode="' + xvalue + '" >' + xdisplay + '<span class="classx">x</span></div>';
//};

function GenerateLookupListDataHTML(xvalue, xdisplay) {
    return '<div class="spantext" nwcode="' + xvalue + '" style="display:inline-block;margin-right: 3px;margin-bottom: 3px;">' + xdisplay + '<span class="classx">x</span></div>';
};

//$(document).on('click', 'span.classx', function () {
//    $(this).closest('div.spantext').remove();
//});

function nwGrid_AddtoListDoneCustom(verID, addtoListTableRec, index) {
    //var value = "<option value='" + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + "'>" + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + "</option>"

    //$('#cmbluglocacc').append(value)
    var xChecked = "";
    var xvalue = "";
    var xdisplay = "";
    xChecked = addtoListTableRec.find('tr:eq(' + index + ')').find('input[type="checkbox"]').prop('checked');
    xvalue = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
    xdisplay = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

    if ($('div.atlContainer[nwtype="' + verID + '"]').find('div.spantext[nwcode="' + xvalue + '"]').length < 1) {
        if (xChecked == true) {

            $('div.atlContainer[nwtype="' + verID + '"] div.innertext').append(GenerateLookupListDataHTML(xvalue, xdisplay));
        }

    }
}

function GetAddtoListFilters() {
    var len = $('div.atlContainer').length;
    for (var i = 0; i < len; i++) {
        var xkey = $('div.atlContainer:eq(' + i + ')').attr('nwtype');
        var xvalue = "";
        var lencode = $('.atlContainer:eq(' + i + ')').find('div.spantext').length;
        for (var j = 0; j < lencode; j++) {
            if (xvalue != "") xvalue += "|";
            xvalue += $('.atlContainer:eq(' + i + ') div.spantext:eq(' + j + ')').attr('nwcode');
        }
        nwParameter_Add(xkey, xvalue);
    }
};


function cuz_GetDesription(t_name,code) {
    var len = jsonDescription[t_name].length;
    for (var i = 0; i < len; i++) {
        if (jsonDescription[t_name][i].code == code)
            return jsonDescription[t_name][i].description;
    }
    return code;
};

//function cuz_GetUserDesc(r_name,code) {
//    var len = jsonRecuserDesc[r_name].length;
//    for (var i = 0; i < len; i++) {
//        if (jsonRecuserDesc[r_name][i].code == code)
//            return jsonRecuserDesc[r_name][i].description;
//    }
//    return code;
//};

function cuz_GetUserDesc(code) {


    if (jsonRecuserDesc[0].code == code)
        return jsonRecuserDesc[0].description;

    return code;
}




function defaultonload(code, description) {

    var j = 3;
    j = mSpreadBook.ActiveSheet.GetMaxRow();
    for (i = 3; i <= j; i++) {
        mSpreadBook.ActiveSheet.SetText((SPR_Location - 1), i, code);
        mSpreadBook.ActiveSheet.SetText2((SPR_Location - 1), i, description)
    }
}

function CompanyItmNo() {
    //var Company = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(0) span").text();
    var Company = mSpreadBook.ActiveSheet.GetValue((SPR_Company - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row);
    nwParameter_Add('Company',Company);
  //  func_ActionDriven("actGenerateItemNo", false);
}


function DateFormatLine() {
    mSpreadBook.ActiveSheet.GetValue(SPR_StartTime - 1, row).datetimepicker('destroy');
    mSpreadBook.ActiveSheet.GetValue(SPR_StartTime - 1, row).removeAttr('id');
    mSpreadBook.ActiveSheet.GetValue(SPR_EndTime - 1, row).datetimepicker('destroy');
    mSpreadBook.ActiveSheet.GetValue(SPR_EndTime - 1, row).removeAttr('id');
    //$('#nwGridCon .tblGridBody tr').find(`td .txtStartTime`).datetimepicker('destroy');
    //$('#nwGridCon .tblGridBody tr').find(`td .txtStartTime`).removeAttr('id');
    //$('#nwGridCon .tblGridBody tr').find(`td .txtEndTime`).datetimepicker('destroy');
    //$('#nwGridCon .tblGridBody tr').find(`td .txtEndTime`).removeAttr('id');

    $(".txtStartTime").datetimepicker({
        timeFormat: 'HH:mm:ss TT',
        DateFormat: 'MM/dd/yyyy',
        timeInput: true
    }).inputmask({
        mask: "m/d/y h:s:s t\\m",
        placeholder: "__/__/____ __:__:__ am",
        alias: "datetime",
        hourFormat: "12",
        leapday: "/02/29",
        separator: "/",
        clearIncomplete: true,
        useCurrent: false,
    });
   
    $(".txtEndTime").datetimepicker({
        timeFormat: 'HH:mm:ss TT',
        DateFormat: 'MM/dd/yyyy',
        timeInput: true
    }).inputmask({
        mask: "m/d/y h:s:s t\\m",
        placeholder: "__/__/____ __:__:__ am",
        alias: "datetime",
        hourFormat: "12",
        leapday: "/02/29",
        separator: "/",
        clearIncomplete: true,
        useCurrent: false,
    });
    

    $(`.txtStartTime`).removeClass("hasDatepicker");
    $(`.txtEndTime`).removeClass("hasDatepicker");

}

function parseTime(s) {
    var part = s.match(/(\d+):(\d+)(?: )?(am|pm)?/i);
    var hh = parseInt(part[1], 10);
    var mm = parseInt(part[2], 10);
    var ap = part[3] ? part[3].toUpperCase() : null;
    if (ap === "AM") {
        if (hh == 12) {
            hh = 0;
        }
    }
    if (ap === "PM") {
        if (hh != 12) {
            hh += 12;
        }
    }
    return { hh: hh, mm: mm };
}


$(document).on("focus", ".txtStartTime , .txtEndTime", function () {
    _timeOld = $(this).val();
});

//$(document).on("change", ".txtStartTime", function (e) {
//    var valid = StartTime(this);
//    if (valid) {
//        _timeOld = $(this).val();
//    }
//});


//$(document).on("change", ".txtEndTime", function (e) {
//    var valid = EndTime(this);
//    if (valid) {
//        _timeOld = $(this).val();
//    }
//});

function StartTime() {
    var starttime = mSpreadBook.ActiveSheet.GetValue(SPR_StartTime - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row)

    //var starttime = $('#nwGridCon .tblGridBody tr:eq(' + 0 + ') td:eq(' + SPR_StartTime + ') input').val();
    var starttimecurr = mSpreadBook.ActiveSheet.GetValue(SPR_StartTime - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row) || "";
   // var starttimecurr = $('#nwGridCon .tblGridBody tr:eq(' + currentrowindex + ') td:eq(' + SPR_StartTime + ') input').val() || "";
    var starttimecurrp = starttimecurr.length > 0 ? Date.parse(`1/${(parseTime(starttimecurr).hh >= 0 && parseTime(starttimecurr).hh < parseTime(starttime).hh && parseTime(starttimecurr).mm <= 59) ? 2 : 1}/1991 ` + starttimecurr) : Date.parse(`1/1/1991 ` + starttimecurr);
    var endtimecurr = mSpreadBook.ActiveSheet.GetValue(SPR_EndTime - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row) || "";
    //var endtimecurr = $('#nwGridCon .tblGridBody tr:eq(' + currentrowindex + ') td:eq(' + SPR_EndTime + ') input').val() || "";
    var endtimecurrp = endtimecurr.length > 0 ? Date.parse(`1/${(parseTime(endtimecurr).hh >= 0 && ((parseTime(endtimecurr).hh < parseTime(starttime).hh && parseTime(endtimecurr).mm <= 59) || (parseTime(endtimecurr).hh == parseTime(starttime).hh && parseTime(endtimecurr).mm <= parseTime(starttime).mm))) ? 2 : 1}/1991 ` + endtimecurr) : Date.parse(`1/1/1991 ` + endtimecurr);

    for (var i = 0; i < mSpreadBook.ActiveSheet.RowConfig.length; i++) {
        mSpreadBook.ActiveSheet.SetBackground(i, Spread_ALLROW, "#EFEFEF");
        mSpreadBook.ActiveSheet.ColumnConfig[i].Enabled = false;
        if (currentrowindex == i) {
                continue;
            }


    //var totalrow = nwLib.nwTempTable_Row_Count("nwGridCon");
    //for (var i = 0; i < totalrow; i++) {
    //    if (currentrowindex == i) {
    //        continue;
    //    }
        //current
        var starttimecurrloop = mSpreadBook.ActiveSheet.GetValue(SPR_StartTime - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row) || "";
        var starttimecurrploop = starttimecurrloop.length > 0 ? Date.parse(`1/${(parseTime(starttimecurrloop).hh >= 0 && parseTime(starttimecurrloop).hh < parseTime(starttime).hh && parseTime(starttimecurrloop).mm <= 59) ? 2 : 1}/1991 ` + starttimecurrloop) : Date.parse(`1/1/1991 ` + starttimecurrloop);

        var endtimecurrloop = mSpreadBook.ActiveSheet.GetValue(SPR_EndTime - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row) || "";
        var endtimecurrploop = endtimecurrloop.length > 0 ? Date.parse(`1/${(parseTime(endtimecurrloop).hh >= 0 && ((parseTime(endtimecurrloop).hh < parseTime(starttime).hh && parseTime(endtimecurrloop).mm <= 59) || (parseTime(endtimecurrloop).hh == parseTime(starttime).hh && parseTime(endtimecurrloop).mm <= parseTime(starttime).mm))) ? 2 : 1}/1991 ` + endtimecurrloop) : Date.parse(`1/1/1991 ` + endtimecurrloop);


    }



    return true;
}

function EndTime() {
    var starttime = $('#nwGridCon .tblGridBody tr:eq(' + 0 + ') td:eq(' + SPR_StartTime + ') input').val();

    var starttimecurr = $('#nwGridCon .tblGridBody tr:eq(' + currentrowindex + ') td:eq(' + SPR_StartTime + ') input').val() || "";
    var starttimecurrp = starttimecurr.length > 0 ? Date.parse(`1/${(parseTime(starttimecurr).hh >= 0 && parseTime(starttimecurr).hh < parseTime(starttime).hh && parseTime(starttimecurr).mm <= 59) ? 2 : 1}/1991 ` + starttimecurr) : Date.parse(`1/1/1991 ` + starttimecurr);
    var endtimecurr = $('#nwGridCon .tblGridBody tr:eq(' + currentrowindex + ') td:eq(' + SPR_EndTime + ') input').val() || "";
    var endtimecurrp = endtimecurr.length > 0 ? Date.parse(`1/${(parseTime(endtimecurr).hh >= 0 && ((parseTime(endtimecurr).hh < parseTime(starttime).hh && parseTime(endtimecurr).mm <= 59) || (parseTime(endtimecurr).hh == parseTime(starttime).hh && parseTime(endtimecurr).mm <= parseTime(starttime).mm))) ? 2 : 1}/1991 ` + endtimecurr) : Date.parse(`1/1/1991 ` + endtimecurr);

    var isNextDay = false;
    if ((starttimecurr.length > 0 && endtimecurr.length) && (endtimecurrp - starttimecurrp) < 0) {
        endtimecurrp = Date.parse(`1/2/1991 ` + endtimecurr);
        isNextDay = true;
    }

    var totalrow = nwLib.nwTempTable_Row_Count("nwGridCon");
    for (var i = 0; i < totalrow; i++) {
        if (currentrowindex == i) {
            continue;
        }
        //current
        var starttimecurrloop = $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_StartTime + ') input').val() || "";
        var starttimecurrploop = starttimecurrloop.length > 0 ? Date.parse(`1/${(parseTime(starttimecurrloop).hh >= 0 && parseTime(starttimecurrloop).hh < parseTime(starttime).hh && parseTime(starttimecurrloop).mm <= 59) ? 2 : 1}/1991 ` + starttimecurrloop) : Date.parse(`1/1/1991 ` + starttimecurrloop);

        var endtimecurrloop = $('#nwGridCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_EndTime + ') input').val() || "";
        var endtimecurrploop = endtimecurrloop.length > 0 ? Date.parse(`1/${(parseTime(endtimecurrloop).hh >= 0 && ((parseTime(endtimecurrloop).hh < parseTime(starttime).hh && parseTime(endtimecurrloop).mm <= 59) || (parseTime(endtimecurrloop).hh == parseTime(starttime).hh && parseTime(endtimecurrloop).mm <= parseTime(starttime).mm))) ? 2 : 1}/1991 ` + endtimecurrloop) : Date.parse(`1/1/1991 ` + endtimecurrloop);

      
    }

    var prevrowindex = currentrowindex - 1;
    var nextrowindex = currentrowindex + 1;
    if (nextrowindex <= totalrow) {
        var starttimenext = $('#nwGridCon .tblGridBody tr:eq(' + nextrowindex + ') td:eq(' + SPR_StartTime + ') input').val() || "";
        var endtimenext = $('#nwGridCon .tblGridBody tr:eq(' + nextrowindex + ') td:eq(' + SPR_EndTime + ') input').val() || "";

        if (endtimecurr.length > 0 && starttimenext.length == 0 && endtimenext.length == 0) {
            $('#nwGridCon .tblGridBody tr:eq(' + nextrowindex + ') td:eq(' + SPR_StartTime + ') input').val(endtimecurr);
        }
    }

    //DurationLine(starttimecurr, endtimecurr, starttimecurrp, endtimecurrp);

    return true;
}