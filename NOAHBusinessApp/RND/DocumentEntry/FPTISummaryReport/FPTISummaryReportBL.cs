using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;

using NoahWebLib;
using NoahWebLib.NoahWebFunction;
using NoahWebLib.NoahWebDataAccess;
using NoahWebLib.Security;
using NoahWebLib.NoahWebUI;
using Newtonsoft.Json;

//
//

using DataAccessLayers;
using DALComponent;
using System.Text.RegularExpressions;


namespace Noah_Web.forms_BusinessLayer
{
    public class FPTISummaryReportBL : nwAction
    {
        #region Variables needed
        string _strFinal = ""; // container of string result
        string _strmet = "";
        string _strParameter = "";
        string _strValue = "";
        string _strtool_Met = "";
        string _strtool_Poz = "";
        string _strtemp1 = "";
        string _strtemp2 = "";
        string _strtemp3 = "";
        string _strtemp4 = "";
        string _strtemp5 = "";
        string UserDefinedConnectionString = "";
        bool isNewRow;

        DataTable emptyDT;

        public string Result="";
        nwEntry based = new nwEntry();
        #endregion

        #region Standard Functionality
         WebApplib WebApp = new WebApplib();
         Promptlib custom_Prompt = new Promptlib();
         nwObject nwObject = new nwObject();
         DataAccess nwDataAccess = new DataAccess();
         JSFunction custom_js = new JSFunction();
         nwAction nwAction = new nwAction();
         nwSFObjects SFObjects = new nwSFObjects();
        #endregion

        public void main(ref string strFinal, string strmet,
           string strParameter, string strValue, string strtool_Met,
           string strtool_Poz, string strtemp1, string strtemp2,
           string strtemp3, string strtemp4, string strtemp5, ref nwEntry baseds, string UserDefinedConnection)
        {

            _strmet = strmet;
            _strParameter = strParameter;
            _strValue = strValue;
            _strtool_Met = strtool_Met;
            _strtool_Poz = strtool_Poz;
            _strtemp1 = strtemp1;
            _strtemp2 = strtemp2;
            _strtemp3 = strtemp3;
            _strtemp4 = strtemp4;
            _strtemp5 = strtemp5; 
            based = baseds;
            this.UserDefinedConnectionString = UserDefinedConnection;
            
            

            dao = new FPTISummaryReportDAL(based.SecurityAccess.ConnectionString, this.UserDefinedConnectionString,""); 

            if (_strmet == "get_Initialize") strFinal = get_Initialize() ;
            else if (_strmet == "func_Toolbox") strFinal = func_Toolbox(strtool_Met, strtool_Poz, strParameter, strValue);
            else if (_strmet == "get_LookUp") strFinal = get_LookUp(strtool_Met, strtool_Poz, strParameter, strValue);
        
            else if (_strmet == "getToolBoxData") strFinal = getToolBoxData(strtemp1, strtemp2, strParameter, strValue);
            else if (_strmet == "get_Method") strFinal = get_Method(strtemp1, strtemp2, strParameter, strValue);
            else if (_strmet == "act_Method") strFinal = act_Method(strtool_Met, strParameter, strValue);
            else strFinal = js.makeJSPostScript("alert('error:" + strmet + " not excute');");

            Result = strFinal;
        }

       
        public string strConn = "";
        string RecordOperationResult = string.Empty;

        private static int StartIndex = 0,
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


            //SPR_SourceFindings = ++StartIndex,
            
            
            
            //SPR_ModuleName = ++StartIndex,
        
            //SPR_MenuItemName = ++StartIndex,
            //SPR_Fields = ++StartIndex,
            //SPR_ExpectedResult = ++StartIndex,
            //SPR_Findings = ++StartIndex,
           
            //SPR_ReportedBy = ++StartIndex,
            
            //SPR_Resolution = ++StartIndex,
            //SPR_Dev = ++StartIndex,
            //SPR_DevName = ++StartIndex,
            //SPR_AnalystRemarks = ++StartIndex,
            //SPR_DevRemarks = ++StartIndex,
            //SPR_DateResolve = ++StartIndex;

        
        FPTISummaryReportDAL dao;
        public FPTISummaryReportBL()
        {
             //dal = new DataAccessLayer(this.UserDefinedConnectionString,""); 
        }

        ///////////////////////////////// Required
        #region Dont Change

        public string func_Toolbox(string strMethod, string poz, string strParameter, string strValue)
        {  
            try
            {
                WebApp = new WebApplib(strParameter, strValue);
                int pozt = -1;
                try { pozt = System.Convert.ToInt32(poz); }
                catch { }
                try { 
                   
                    isNewRow = WebApp.nwobjectBool("isNewRow");
                }
                catch { }
                string strF = "";
                #region do not change (calling RecordOperation)
                switch (strMethod)
                {
                    case "0":
                        RecordOperation(eRecordOperation.AddNew, pozt);
                        break;
                    case "1":
                        RecordOperation(eRecordOperation.Save, pozt);
                        if (string.IsNullOrEmpty(RecordOperationResult) == true) strF = "isNewRow=false;" + strF;
                        break;
                    case "2":
                        RecordOperation(eRecordOperation.Delete, pozt);
                        break;
                    case "3":
                        RecordOperation(eRecordOperation.Refresh, pozt);
                        break;
                    case "4":
                        RecordOperation(eRecordOperation.Inquire, pozt);
                        break;
                    case "5":
                        RecordOperation(eRecordOperation.Process, pozt);
                        break;
                    case "6":
                        RecordOperation(eRecordOperation.Import, pozt);
                        break;
                    case "7":
                        RecordOperation(eRecordOperation.Export, pozt);
                        break;
                    case "8":
                        RecordOperation(eRecordOperation.Print, pozt);
                        break;
                    case "9":
                        RecordOperation(eRecordOperation.Closing, pozt);
                        break;
                    case "10":
                        RecordOperation(eRecordOperation.Search, pozt);
                        break;
                }
                #endregion
                //strF += ";" + Prompt.Excute();
                strF += execute();
                return js.makeJSPostScript(strF);

            }
            catch (Exception err)
            {
                return err.ToString();
            }
        }

        
        public string get_LookUp(string strSearch, string poz, string strParameter, string strValue)
        {
            string strFinal = "";
            WebApp = new WebApplib(strParameter, strValue);
            strFinal += get_Method(strSearch, poz, strParameter, strValue);
            if (strFinal.Trim() == "") strFinal = "<tr><td>Error Occur.<td></tr>";
            strFinal = js.makeHTML("#menuCreatorContainer .tablecontainter", strFinal);
            strFinal = js.makeJSPostScript(strFinal);
            return strFinal;
        }
  
        #endregion


        ////////////////////// look ups
        public string get_Method(string strMethod, string strSearchVal, string strParameter, string strValue)
        {
            string strFinal = "";
            string strSQL = "";
            string mouseDownFunc = "";
            string mouseOverFunc = "";
            string strName = "";
            strConn = this.UserDefinedConnectionString;
            WebApp = new WebApplib(strParameter, strValue);

            DataTable dtLookupConfig = WebApp.get_LookupConfig();
            nwObject.LookupConfig(dtLookupConfig);
           
            switch (strMethod)
            {

                ////// combo box
                case "getcbo":
                    //emptyDT = dt;
                    //strFinal = nwObject.make_OptionLookup(strSQL, strConn, emptyDT);
                    //strSQL = js.makeHTML("#cboPaymentType", strFinal);
                    //strFinal = strSQL;

                      break;

                case "getlugStatus":
                    strSQL = dao.getStatus();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugCompany":
                    strSQL = dao.getCompany();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugProject":
                  
                    strSQL = dao.getProject(WebApp.nwobjectText("txtCompany"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugModule":
                    strSQL = dao.getModule();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                    
                case "getlugMenuGroup":
                    strSQL = dao.getMenuGroup(WebApp.nwobjectText("txtModule"));
                    
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugImplemStage":
                    strSQL = dao.getImplemStage();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugType":
                    strSQL = dao.getError();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugActionItem":
                    strSQL = dao.getActionType();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugPriority":
                    strSQL = dao.getPrioLvl();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugSubMenuGroup":
                    strSQL = dao.getSubMenuGroup(WebApp.nwobjectText("txtModule1"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;


                case "getlugMenuItem":
                    strSQL = dao.getMenuItem(WebApp.nwobjectText("txtMenuGroup"), WebApp.nwobjectText("txtModule2"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugProcessedBy":
                    strSQL = dao.getEmployee();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugRaisedby":
                    strSQL = dao.getEmployee();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugAssigned":
                    strSQL = dao.getEmployee();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugEmployeeTask":
                    strSQL = dao.getEmployee();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugLocation":

                    strSQL = dao.getLocation(based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getCompany":
                    strSQL = dao.getCompanyAdd(33);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getProject":
                    strSQL = dao.getCompanyAdd(34);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getModule":
                    strSQL = dao.getCompanyAdd(35);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getMenuGroup":
                    strSQL = dao.getCompanyAdd(36);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getMenuItem":
                    strSQL = dao.getCompanyAdd(37);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getImplementationStage":
                    strSQL = dao.getCompanyAdd(38);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getType":
                    strSQL = dao.getCompanyAdd(39);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getStatus":
                    strSQL = dao.getCompanyAdd(40);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getActionItem":
                    strSQL = dao.getCompanyAdd(41);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getRaisedBy":
                    strSQL = dao.getCompanyAdd(42);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getProccessedBy":
                    strSQL = dao.getCompanyAdd(43);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getTaskforEmployee":
                    strSQL = dao.getCompanyAdd(44);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
               
                case "getUserLookup":

                    string user_code = WebApp.nwobjectText("user_code");

                    strSQL = SFObjects.returnText(string.Format(@"SELECT value FROM dbo.SystemConfig WHERE code = 'AccPowLookUp'"),based.SecurityAccess.ConnectionString);

                   if (WebApp.nwobjectText("nwaccess") == "1")
                   {

                       if (strSQL.Trim() == "")
                           strSQL = string.Format(@"Select [Code],[Description] from [FPTI].[User] where HasAccessToUtility <> '1' AND ([Code] like '%{0}%' or [Description] like '%{0}%') AND [Code] NOT IN (SELECT SplitValue FROM dbo.fn_Split('{1}','|')) ", strSearchVal, user_code);
                   
                   }
                   else {
                       if (strSQL.Trim() == "")
                           strSQL = string.Format(@"Select [Code],[Description] from [FPTI].[User] where ([Code] like '%{0}%' or [Description] like '%{0}%') AND [Code] NOT IN (SELECT SplitValue FROM dbo.fn_Split('{1}','|')) ", strSearchVal, user_code);
                   
                   }
                    strMethod = strMethod.Substring(3);
                   strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   break;


                ///// Inquire
               case "gettoolboxInquire":
                   if (WebApp.nwobjectText("nwaccess") == "1")
                       strSQL = string.Format(@"Select [Code],[Description], IIF(AccountDisabled = 1, 'Yes', 'No') [Account Disabled/Locked], IIF(InitialLogin = 1, 'Yes', 'No') [User Must Change Password at Next Logon] from FPTI.[User] where HasAccessToUtility <> '1'  order by isnull(Moddate,Recdate) DESC,Recdate DESC");
                   else strSQL = string.Format(@"Select [Code],[Description], IIF(AccountDisabled = 1, 'Yes', 'No') [Account Disabled/Locked], IIF(InitialLogin = 1, 'Yes', 'No') [User Must Change Password at Next Logon] from FPTI.[User] order by isnull(Moddate,Recdate) DESC,Recdate DESC");
                   
                    
                 
                   strMethod = strMethod.Substring(3);
                   strConn = based.SecurityAccess.ConnectionString;
                   strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   
                   break;
                  
            }

          return strFinal;
        }

        ///// Standard RecordOperation 

        public void RecordOperation(eRecordOperation i, int Position)
        {
            string result = "";
            string tempstr = "";

            switch (i)
            {
                case eRecordOperation.AddNew:
                    isNewRow = true;
                    nwToolBox.bindingNavigatorSaveItem.Enable = true;
                    nwToolBox.bindingNavigatorAddNewItem.Enable =
                    nwToolBox.bindingNavigatorPrintItem.Enable =
                    nwToolBox.bindingNavigatorImportItem.Visible =
                    nwToolBox.bindingNavigatorDeleteItem.Enable =
                    nwToolBox.bindingNavigatorDeleteItem.Visible =
                    nwToolBox.bindingNavigatorExportItem.Enable = false;
                   
                    //GenerateGrid(false, InitializeGrid());
                    break;
                case eRecordOperation.Save:
                    RecordOperationResult = string.Empty;


                    break;
                case eRecordOperation.Delete:
                    
                    break;

                case eRecordOperation.Process:
                    tempstr = "Process";
                    ////Prompt.Information(based.SecurityAccess.ConnectionString, based.Title);
                    break;

                case eRecordOperation.Refresh:
                    
                    //js.ADD(CreateGrid2());
                    break;
                case eRecordOperation.Inquire:
                    tempstr = "inqure";
                  
                    Inquire();
                    // Prompt.Information(tempstr, based.Title);
                    break;

                case eRecordOperation.Import:
                    tempstr = "import";
                    Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Export:
                    tempstr = "export";
                   

                    break;
                case eRecordOperation.Print:
                    tempstr = "print";
                   
                    js.ADD("tableToPrint(\"nwExportContainer\");");
                    break;
                case eRecordOperation.Closing:
                    tempstr = "closing";
                    Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Search:
                    tempstr = "search";
                    Prompt.Information(tempstr, based.Title);
                    break;
            }


            //return result;
        }


        ////////////////////// For Customize 
        public string get_Initialize()
        {
            string strFinal = ""; 
            SetBindings();
            Main_Load();



            execute(ref strFinal);

            //strFinal += get_Method("getcboPaymentType", "", "", "");
            //strFinal += js.makeValueText("#dtpDocDate", DateTime.Now.ToShortDateString());
            return js.makeJSPostScript(strFinal);
        }
        public string act_Method(string strMethod, string strParameter, string strValue)
        {
            string strFinal = "";
            string strSQL = "";
            WebApp = new WebApplib(strParameter, strValue);
            string Company = WebApp.nwobjectText("Project");
            string Project = WebApp.nwobjectText("Company");
            string Module = WebApp.nwobjectText("Module");
            string MenuGroup = WebApp.nwobjectText("MenuGroup");
            string MenuItem = WebApp.nwobjectText("MenuItem");
            string ImplementationStage = WebApp.nwobjectText("ImplementationStage");
            string Type = WebApp.nwobjectText("Type");
            string Status = WebApp.nwobjectText("Status");
            string ActionItem = WebApp.nwobjectText("ActionItem");
            string RaisedBy = WebApp.nwobjectText("RaisedBy");
            string ProccessedBy = WebApp.nwobjectText("ProccessedBy");
            string TaskforEmployee = WebApp.nwobjectText("TaskforEmployee");
            string ItemID = WebApp.nwobjectTextSQL("ItemID");
            int trigger = WebApp.nwobjectInt("ButtonTriggered");

            DateTime txtdatefrom = Parser.ParseDateTime(WebApp.nwobjectDate("txtdatefrom"), Parser.DateTimeType.Min);
            DateTime txtdateto = Parser.ParseDateTime(WebApp.nwobjectDate("txtdateto"), Parser.DateTimeType.Min);

            switch (strMethod)
            {
                case "actBindCollection":
                    BindCollection();
                    break;
                case "GridSave":
                    RecordOperationResult = string.Empty;
                    RecordOperationResult = ValidateDataGrid();
                    DataTable gridTable = IssueLogLIN();

                    if (RecordOperationResult == string.Empty)
                    {
                        DataTable dtlin = new DataTable();

                        dtlin = IssueLogLIN();

                        RecordOperationResult = dao.SaveGridData(dtlin);

                        //autorefresh
                        
                        DataTable dtautoref = new DataTable();
                        dtautoref = dao.GetDataLIN(Company, Project, Module, MenuGroup, MenuItem, ImplementationStage, Type, Status, ActionItem, RaisedBy, ProccessedBy, TaskforEmployee, txtdateto.ToString("MM/dd/yyyy"), txtdatefrom.ToString("MM/dd/yyyy"));
                        GenerateGrid(dtautoref);

                        DataSet dtDescRefresh = new DataSet();
                        dtDescRefresh = dao.GetDataDescription(Company, Project);
                        js.ADD("jsonDescription=" + Newtonsoft.Json.JsonConvert.SerializeObject(dtDescRefresh));
                        js.ADD("EnableGrid()");
                        js.ADD("cust_SetTagging(); ");
                        //autoresfresh

                        Prompt.Information("Save Successfully", based.Title);

                       
                       
                    }
                    else
                    {
                        Prompt.Error(RecordOperationResult, based.Title);
                        js.ADD("ChangeStatusColor(mSpreadBook.ActiveSheet.GetSelectedIndexes().row)");
                        
                    }


                    foreach (DataRow r in gridTable.Rows)
                    {
                        if (r["Assigned"].ToString() != "" && r["Employeetask"].ToString() == "")
                        {
                            GetGenerateTaskPerAssign();
                        }
                        else if (r["Assigned"].ToString() != "" && r["Employeetask"].ToString() != "")
                        {
                            GetGenerateTaskPerEmployeeTask();
                        }
                        
                    }

                    //foreach (DataRow r in gridTable.Rows)
                    //{
                    //    if (r["Status"].ToString() == "1")
                    //    {
                    //        UpdateTaskEntry();
                    //    }
                    //}

                    js.ADD("nwLoading_End('GridSave');");


                    //DataTable issuelogdt = new DataTable();
                    //issuelogdt = JsonToDatatable(WebApp.nwobjectText("mSpread"));
                    //RecordOperationResult = dao.SaveGridData(issuelogdt);
                    //Prompt.Information(RecordOperationResult, based.Title);
                    break;

                case "DataEnable":
                    GenerateGrid(InitializeGrid());
                    
                    js.ADD("EnableGrid()");
                    var currentdate = SFObject.GetServerDateTime(this.UserDefinedConnectionString);
                    js.ADD("mSpreadBook.ActiveSheet.SetText(SPR_CurrentDate - 1, Spread_ALLROW, " + currentdate.ToString("MM/dd/yyyy") + " ); ");
                    js.ADD("mSpreadBook.ActiveSheet.SetText((SPR_CreatedBy - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row,  " + "'" + based.SecurityAccess.RecUser + "'" + ");");
                    // js.ADD("template()");
                    GetLocAccntForms();
                    js.ADD("nwLoading_End('actDataEnable');");

                    break;



                case "Refresh":

                    //InitializeGrid()
                    DataTable dtInfo = new DataTable();
                    DataSet dtDescription = new DataSet();
                    //string Company = WebApp.nwobjectText("Project");
                    //string Project = WebApp.nwobjectText("Company");
                    //string Module = WebApp.nwobjectText("Module");
                    //string MenuGroup = WebApp.nwobjectText("MenuGroup");
                    //string MenuItem = WebApp.nwobjectText("MenuItem");
                    //string ImplementationStage = WebApp.nwobjectText("ImplementationStage");
                    //string Type = WebApp.nwobjectText("Type");
                    //string Status = WebApp.nwobjectText("Status");
                    //string ActionItem = WebApp.nwobjectText("ActionItem");
                    //string RaisedBy = WebApp.nwobjectText("RaisedBy");
                    //string ProccessedBy = WebApp.nwobjectText("ProccessedBy");
                    //string TaskforEmployee = WebApp.nwobjectText("TaskforEmployee");
                    //DateTime txtdatefrom = Parser.ParseDateTime(WebApp.nwobjectDate("txtdatefrom"), Parser.DateTimeType.Min);
                    //DateTime txtdateto = Parser.ParseDateTime(WebApp.nwobjectDate("txtdateto"), Parser.DateTimeType.Min);

                    //var serverdate = SFObject.GetServerDateTime(this.UserDefinedConnectionString);
                    //js.ADD("mSpreadBook.ActiveSheet.SetText(SPR_CurrentDate - 1, Spread_ALLROW, " + " ' " + serverdate.ToString("MM/dd/yyyy") + " ' " + " ); ");
                    //js.ADD("mSpreadBook.ActiveSheet.SetText(SPR_CreatedBy - 1, mSpreadBook.ActiveSheet.GetSelectedIndexes().row, "+ " ' " + based.SecurityAccess.RecUser + " ' "   + " ); ");

                    dtDescription = dao.GetDataDescription(Company, Project);
                    js.ADD("jsonDescription=" + Newtonsoft.Json.JsonConvert.SerializeObject(dtDescription));
                  

                    dtInfo = dao.GetDataLIN(Company, Project, Module, MenuGroup, MenuItem, ImplementationStage, Type, Status, ActionItem, RaisedBy, ProccessedBy, TaskforEmployee, txtdateto.ToString("MM/dd/yyyy"), txtdatefrom.ToString("MM/dd/yyyy"));
                    GenerateGrid(dtInfo);
                  
                    js.ADD("EnableGrid()");
                    js.ADD("cust_SetTagging(); ");  //statusColRefresh()
                    

                    // js.ADD("GetAddtoListFilters()");


                    js.ADD("nwLoading_End('actRefresh');");

                    break;
                case "actCopyRow":

                    DataSet dtDesc = new DataSet();
                    string Company1 = WebApp.nwobjectText("Project");
                    string Project1 = WebApp.nwobjectText("Company");
                    dtDesc = dao.GetDataDescription(Company1, Project1);
                    js.ADD("jsonDescription=" + Newtonsoft.Json.JsonConvert.SerializeObject(dtDesc));
                    js.ADD("nwLoading_End('actCopyrow');");

                    break;
                case "actSaveScreenShot":

                    string html = WebApp.nwobjectTextSQL("html");
                   

                    string msg = dao.SaveScreenShot(ItemID, html,based.SecurityAccess.RecUser);
                    js.ADD("$('#nwgRemarksCon').removeClass('show');$('#nwgRemarksCon').hide();");
                    js.ADD("mSpreadBook.ActiveSheet.SetValue(SPR_Screenshot-1,crIndexSpread,1); mSpreadBook.ActiveSheet.SetBackground(SPR_Screenshot - 1, crIndexSpread, bgcolorbuttonWithContent); ");
                    js.ADD("nwLoading_End('actSaveScreenShot');");

                    break;
                case "actGetScreenShot":

                   

                    string content = dao.getScreenShot(ItemID);
                    js.makeHTML("#cmsnwgRemarks .nwCMSContent", content);
       
                    js.ADD("nwLoading_End('actGetScreenShot');");

                    break;

                case "Recuser":
                    js.ADD("mSpreadBook.ActiveSheet.SetText((SPR_CreatedBy - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row,  "+"'"+based.SecurityAccess.RecUser+"'"+");");
                    DataTable dtRecDesc = new DataTable();
                    dtRecDesc = dao.GetRecuserDesc(based.SecurityAccess.RecUser);
                    js.ADD("jsonRecuserDesc=" + Newtonsoft.Json.JsonConvert.SerializeObject(dtRecDesc));

                    js.ADD("cust_descrecuser(); ");
                    break;

                case "Moduser":
                    js.ADD("mSpreadBook.ActiveSheet.SetText((SPR_ModifiedBy - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row,  " + "'" + based.SecurityAccess.RecUser + "'" + ");");
                    DataTable dtModDesc = new DataTable();
                    dtModDesc = dao.GetRecuserDesc(based.SecurityAccess.RecUser);
                    js.ADD("jsonRecuserDesc=" + Newtonsoft.Json.JsonConvert.SerializeObject(dtModDesc));

                    js.ADD("cust_descmoduser(); ");
                    break;
                //case "actUpdate":
                //    GetUpdateTaskEntry();
                //    break;

                //case "actGenerateItemNo":
                //    string Company2 = WebApp.nwobjectText("txtCompany");

                //    string dtGenItm = dao.GetItemNo(Company2);
                //    js.ADD("mSpreadBook.ActiveSheet.SetText((SPR_ItemNo - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row,  " + "'" + dtGenItm + "'" + ");");

                //    break;

            }


            return js.makeJSPostScript("try{"+execute()+"}catch(err){alert(err);}");
        }

        //private void Historical(DataTable dtrecords)
        //{

        //    string LISTINGFILENAME = "";
        //    if (LISTINGFILENAME + " History Listing" == "") LISTINGFILENAME = "Sheet 1";
        //    else LISTINGFILENAME = LISTINGFILENAME + " History Listing";

        //    int maxrow = 5 + dtrecords.Rows.Count;

            

        //    int dataindex = 5;

        //    ListingAndPrint frmlist = new ListingAndPrint
        //                                           (ListingAndPrint.FormType.Listing, 5, dtrecords,
        //                                           LISTINGFILENAME, based.SecurityAccess.ConnectionString, based.SecurityAccess.Company,
        //                                           based.SecurityAccess.RecUserName, LISTINGFILENAME);


        //    //loop valdiation
        //    string tempstring1 = "";
        //    string tempstring2 = "";
        //    string toChange = "";

        //    for (int i = 0; i < dtrecords.Rows.Count; i++)
        //    {
        //        frmlist.m_Spread.Rows(i + dataindex).TextColor("black");
        //    }


        //    for (int i = 0; i < dtrecords.Rows.Count; i++)
        //    {
        //        for (int ic = 0; ic < dtrecords.Columns.Count; ic++)
        //        {
        //            if (toChange != dtrecords.Rows[i][0].ToString())
        //            {
        //                tempstring2 = "";
        //                tempstring1 = dtrecords.Rows[i][ic].ToString();
        //                try
        //                {
        //                    tempstring2 = dtrecords.Rows[i + 1][ic].ToString();
        //                }
        //                catch
        //                {
        //                    tempstring1 = tempstring2 = "";
        //                }
        //                try
        //                {
        //                    if (dtrecords.Rows[i][0].ToString() == dtrecords.Rows[i + 1][0].ToString())
        //                    {
        //                        if (tempstring1 != tempstring2)
        //                        {
        //                            frmlist.m_Spread.Rows(i + dataindex, ic).TextColor("red");
        //                        }

        //                    }
        //                }
        //                catch { }

        //            }
        //        }
        //        frmlist.m_Spread.Rows(0, 0).BackgroundColor("Transparent");
        //        toChange = dtrecords.Rows[i][0].ToString();
        //    }


        //    //## FOR EXPORTING ###
        //    Random rnd = new Random();
        //    string SessionID = DateTime.Now.ToString("yyyyddMMhhmmss") + rnd.Next(0, 9999).ToString().PadRight(4, '0');
        //    HttpContext.Current.Session["Config_" + SessionID] = frmlist.m_Spread.ExportConfig();
        //    HttpContext.Current.Session["Data_" + SessionID] = frmlist.m_Spread.GetDataSource();
        //    HttpContext.Current.Session["Filename_" + SessionID] = LISTINGFILENAME;
        //    HttpContext.Current.Session["Header_" + SessionID] = "0";
        //    js.ADD("ExportSessionID='" + SessionID + "'");
        //    //## END ##

        //    js.Show("#nwExportContainerMain", 0);
        //    js.ADD(frmlist.CreateScript());

        //    js.ADD("nwLoading_End('xSample')");


        //}
        public string getToolBoxData(string tableName, string getMethod, string strParameter, string strValue)
        {
            string strFinal = ""; string sql = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (getMethod)
            {
                case "toolbox":

                    string codevalue = WebApp.nwobjectText("codevalue"); // codevalue will be filter of primary key add these filter
                    //sql = string.Format(@"Select top 100 percent  * from FPTI.[User] where code ='{0}' order by isnull(Moddate,Recdate) DESC,Recdate DESC", codevalue);
                    nwStandardBL standardBL = new nwStandardBL(WebApp);
                    standardBL.PrimaryKey = "ItemNo";
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dao.GetData(), based.SecurityAccess.ConnectionString);
                    break;
               
            }

            return strFinal;
        }
        private void Main_Load()
        {
           
            if (based.isInterface == true) dao.UpdateVersion();
            GenerateGrid(InitializeGrid());
            js.ADD("DisableGrid()");
            
            




            return;
        }

        //////////////////////// Common
        private void SetBindings()
        {
            SFObject.SetControlBinding("#inCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Code");
            SFObject.SetControlBinding("#inDesc", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Description");

           
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "RecUser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "RecDate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "ModUser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "ModDate");

        }
        private void Inquire()
        {
            nwToolBox.bindingNavigatorInquireItem.PrimaryKey = dao.primaryKey;
          
        }
  
      

        private DataTable LoadSchema()
        {
            #region don't change
            DataTable dtData = new DataTable();
            dtData = dao.GetSchema();
            #endregion 
            string password = "";
            DataRow drDataToAdd = dtData.NewRow();
          


            #region don't change
            drDataToAdd["recuser"] = drDataToAdd["moduser"] = based.SecurityAccess.RecUser;
            drDataToAdd["recdate"] = DateTime.Now; //will be populated as getdate() in sproc

            drDataToAdd["ModUser"] = based.SecurityAccess.RecUser; ; 
            drDataToAdd["Moddate"] = DateTime.Now; //will be populated as getdate() in sproc
            
            dtData.Rows.Add(drDataToAdd);
            dtData.AcceptChanges();
            #endregion

            return dtData;
        }

        private void BindCollection()
        {
            js.ADD("nwLoading_End('xLoading');");
        }

        //private void TableGrid(bool isInitialize)
        //{
        //    string gridID = "mSpread";
        //    nwGrid grid = new nwGrid(gridID);
        //    DataTable dt = new DataTable();

        //    grid.Type = nwGridType.SpreadCanvas;




        //    if (isInitialize)
        //    {
        //        dt.Columns.Add("Company");
        //        dt.Columns.Add("Project");
        //        dt.Columns.Add("Document Status");
        //        dt.Columns.Add("Item No");
        //        dt.Columns.Add("Status");
        //        dt.Columns.Add("Source of Findings");
        //        dt.Columns.Add("Reference FileName");
        //        dt.Columns.Add("Test Case No./Row No");
        //        dt.Columns.Add("Module");
        //        dt.Columns.Add("Menu Item");
        //        dt.Columns.Add("Fields");
        //        dt.Columns.Add("Expected Result");
        //        dt.Columns.Add("Findings");
        //        dt.Columns.Add("Reported By");
        //        dt.Columns.Add("Date");
        //        dt.Columns.Add("Disposition/Resolution");
        //        dt.Columns.Add("Developer/Analyst");
        //        dt.Columns.Add("Analyst Remarks");
        //        dt.Columns.Add("Developer Remarks");
        //        dt.Columns.Add("Date Resolved");

        //    }
        //    else
        //    {
        //        ///
        //    }


        //    grid.dataSource(dt);


        //    #region GridCSS
        //    grid.rowBackground("#FFFFFF", "FFFFFF");
        //    #endregion

        //    #region Column Width
        //    #endregion

        //    grid.Type = nwGridType.SpreadCanvas;


        //    grid.varSpreadBook = "mSpreadBook";
        //    grid.varSpreadSheet = "mSpreadSheet";
        //    js.ADD(grid.createTable());
        //    //js.ADD("CreatedGridDone()");



        //}



        private void GenerateGrid(DataTable dtSource)
        {

            //nwGrid Grid;
            //bool save = false;
            //DataTable dt = new DataTable();
            //string Json = "";
            //Grid = new nwGrid("mSpread");
            //Json = "jsonIssueLog";



            DataTable dt = new DataTable();
            string gridID = "mSpread";

            nwGrid nwGridCon = new nwGrid(gridID);

           

           

            string LISTINGFILENAME = "";
            if (dao.LISTINGFILENAME + " Listing" == "") LISTINGFILENAME = "Sheet 1";
            else LISTINGFILENAME = dao.LISTINGFILENAME + " Listing";

            DateTime serverdate = SFObjects.GetServerDateTime(this.UserDefinedConnectionString);




            ListingAndPrint frmlist = new ListingAndPrint
                                                   (ListingAndPrint.FormType.Empty, 2, dtSource,
                                                   LISTINGFILENAME, UserDefinedConnectionString, "Modified Date: " + serverdate.ToString("MM/dd/yyyy hh:mm:ss"),
                                                    based.SecurityAccess.RecUser, LISTINGFILENAME);

            


           

            frmlist.SetSpreadType(nwGridType.SpreadCanvas);

            

            #region Width
            frmlist.m_Spread.nwobject(SPR_ID).Width(0);
            frmlist.m_Spread.nwobject(SPR_CurrentDate).Width(0);
            frmlist.m_Spread.nwobject(SPR_Tag).Width(110);
            frmlist.m_Spread.nwobject(SPR_DateRaised).Width(100);
            frmlist.m_Spread.nwobject(SPR_ImplemStage).Width(150);
            frmlist.m_Spread.nwobject(SPR_RefFileName).Width(200);
            frmlist.m_Spread.nwobject(SPR_TestCase).Width(200);
            frmlist.m_Spread.nwobject(SPR_ActionItem).Width(200);
            frmlist.m_Spread.nwobject(SPR_StandardVersion).Width(200);
            //frmlist.m_Spread.nwobject(SPR_Status).Width(0);
            frmlist.m_Spread.nwobject(SPR_DocStatus).Width(0);
            frmlist.m_Spread.nwobject(SPR_Client).Width(70);
            frmlist.m_Spread.nwobject(SPR_Screenshot).Width(65);
            frmlist.m_Spread.nwobject(SPR_PercentAccomp).Width(100);
            frmlist.m_Spread.nwobject(SPR_Enhancement).Width(100);
            frmlist.m_Spread.nwobject(SPR_NonNegotiableEnhancement).Width(100);
            frmlist.m_Spread.nwobject(SPR_RequiredForms).Width(100);
            frmlist.m_Spread.nwobject(SPR_StartTime).Width(150);
            frmlist.m_Spread.nwobject(SPR_TargetStartDate).Width(150);
            frmlist.m_Spread.nwobject(SPR_EndTime).Width(150);
            frmlist.m_Spread.nwobject(SPR_TargetEndDate).Width(150);
            #endregion

            #region freeze
            frmlist.FreezeColumn = 7;

            #endregion



            #region template
          

            frmlist.m_Spread.nwobject(SPR_ID).BackgroundColor("gainsboro");
            frmlist.m_Spread.nwobject(SPR_Tag).BackgroundColor("gainsboro");
            frmlist.m_Spread.nwobject(SPR_Location).LookUp("lugLocation");
            frmlist.m_Spread.nwobject(SPR_Company).LookUp("lugCompany");
            frmlist.m_Spread.nwobject(SPR_RefCompany).Input();
            frmlist.m_Spread.nwobject(SPR_Project).LookUp("lugProject");
         
            frmlist.m_Spread.nwobject(SPR_ItemNo).BackgroundColor("gainsboro");
            
            frmlist.m_Spread.nwobject(SPR_DateRaised).InputDate("DateRaised");
            frmlist.m_Spread.nwobject(SPR_ImplemStage).LookUp("lugImplemStage");
            frmlist.m_Spread.nwobject(SPR_RefFileName).Input();
      
            frmlist.m_Spread.nwobject(SPR_TestCase).Input();
         
            frmlist.m_Spread.nwobject(SPR_Module).LookUp("lugModule");
       
            frmlist.m_Spread.nwobject(SPR_Menugroup).LookUp("lugMenuGroup");
          
            frmlist.m_Spread.nwobject(SPR_SubMenuGroup).LookUp("lugSubMenuGroup");
         
            frmlist.m_Spread.nwobject(SPR_MenuItem).LookUp("lugMenuItem");
    
            frmlist.m_Spread.nwobject(SPR_Concern).Input();
      
            frmlist.m_Spread.nwobject(SPR_Client).Input();
            frmlist.m_Spread.nwobject(SPR_RaisedBy).Input();



            frmlist.m_Spread.nwobject(SPR_Type).LookUp("lugType");
           
            frmlist.m_Spread.nwobject(SPR_SubType).Input();

            //frmlist.m_Spread.nwobject(SPR_SubType).Input();

            frmlist.m_Spread.nwobject(SPR_PercentAccomp).BackgroundColor("gainsboro");

            frmlist.m_Spread.nwobject(SPR_Status).LookUp("lugStatus");
      
            frmlist.m_Spread.nwobject(SPR_ActionItem).LookUp("lugActionItem");
           
            frmlist.m_Spread.nwobject(SPR_FPTIRemarks).Input();
          
            frmlist.m_Spread.nwobject(SPR_FeedbackDate).InputDate("FeedbackDate");
            frmlist.m_Spread.nwobject(SPR_ProcessBy).LookUp("lugProcessedBy");
          
            frmlist.m_Spread.nwobject(SPR_Assigned).LookUp("lugAssigned");
        
            frmlist.m_Spread.nwobject(SPR_Resolution).Input();
            frmlist.m_Spread.nwobject(SPR_PriorityLevel).TextAlign("Left");
            frmlist.m_Spread.nwobject(SPR_Enhancement).Input();
            frmlist.m_Spread.nwobject(SPR_NonNegotiableEnhancement).Input();
            frmlist.m_Spread.nwobject(SPR_RequiredForms).Input();
            frmlist.m_Spread.nwobject(SPR_StandardVersion).Input();
            frmlist.m_Spread.nwobject(SPR_EnhancementNotes).Input();
            frmlist.m_Spread.nwobject(SPR_Mandays).InputCurrency("Mandays", 2,2);
            frmlist.m_Spread.nwobject(SPR_MandaysSubmission).InputDate("Mandays");
            frmlist.m_Spread.nwobject(SPR_Trigger).Input();
            frmlist.m_Spread.nwobject(SPR_Employeetask).LookUp("lugEmployeeTask");
            frmlist.m_Spread.nwobject(SPR_PriorityLevel).LookUp("lugPriority");
            frmlist.m_Spread.nwobject(SPR_StartTime).Input();
            //frmlist.m_Spread.nwobject(SPR_StartTime).Template("<input class='txtStartTime hasTimepicker' type='time' value='{" + (SPR_StartTime - 1) + "}'>");
            frmlist.m_Spread.nwobject(SPR_TargetStartDate).InputDate("TargetStartDate");
            frmlist.m_Spread.nwobject(SPR_EndTime).Input();
            //frmlist.m_Spread.nwobject(SPR_EndTime).Template("<input class='txtEndTime hasTimepicker' type='time' value='{" + (SPR_EndTime - 1) + "}'>");
            frmlist.m_Spread.nwobject(SPR_TargetEndDate).InputDate("TargetEndDate");
           frmlist.m_Spread.nwobject(SPR_DocStatus).BackgroundColor("gainsboro");
            frmlist.m_Spread.nwobject(SPR_CreatedBy).BackgroundColor("gainsboro");
            frmlist.m_Spread.nwobject(SPR_DateCreated).BackgroundColor("gainsboro");
            frmlist.m_Spread.nwobject(SPR_ModifiedBy).BackgroundColor("gainsboro");
            frmlist.m_Spread.nwobject(SPR_ModifiedDate).BackgroundColor("gainsboro");
            //frmlist.m_Spread.nwobject(SPR_DateResolve).Template("<input value='{" + (SPR_DateResolve) + "}'  class='DateResolve nwDatePick'/>");



            #endregion

            #region requiredfields
            frmlist.m_Spread.nwobject(SPR_Location).HeaderFieldRequired(true);
            frmlist.m_Spread.nwobject(SPR_Company).HeaderFieldRequired(true);
            frmlist.m_Spread.nwobject(SPR_Project).HeaderFieldRequired(true);
            frmlist.m_Spread.nwobject(SPR_DateRaised).HeaderFieldRequired(true);
            frmlist.m_Spread.nwobject(SPR_ImplemStage).HeaderFieldRequired(true);
            frmlist.m_Spread.nwobject(SPR_RefFileName).HeaderFieldRequired(true);
            frmlist.m_Spread.nwobject(SPR_TestCase).HeaderFieldRequired(true);
            frmlist.m_Spread.nwobject(SPR_Module).HeaderFieldRequired(true);
            frmlist.m_Spread.nwobject(SPR_Menugroup).HeaderFieldRequired(true);
           // frmlist.m_Spread.nwobject(SPR_SubMenuGroup).HeaderFieldRequired(true);
            frmlist.m_Spread.nwobject(SPR_MenuItem).HeaderFieldRequired(true);
            frmlist.m_Spread.nwobject(SPR_Concern).HeaderFieldRequired(true);
            frmlist.m_Spread.nwobject(SPR_Client).HeaderFieldRequired(true);
            frmlist.m_Spread.nwobject(SPR_RaisedBy).HeaderFieldRequired(true);
            frmlist.m_Spread.nwobject(SPR_Type).HeaderFieldRequired(true);
            frmlist.m_Spread.nwobject(SPR_SubType).HeaderFieldRequired(true);
            frmlist.m_Spread.nwobject(SPR_Status).HeaderFieldRequired(true);
            frmlist.m_Spread.nwobject(SPR_ActionItem).HeaderFieldRequired(true);
            //frmlist.m_Spread.nwobject(SPR_FPTIRemarks).HeaderFieldRequired(true);
           // frmlist.m_Spread.nwobject(SPR_ProcessBy).HeaderFieldRequired(true);
            //frmlist.m_Spread.nwobject(SPR_Assigned).HeaderFieldRequired(true);
            #endregion

            frmlist.m_Spread.TableHeight(400);
            frmlist.MenuItemName = based.Title;
            frmlist.varSpreadBook = "mSpreadBook";
            frmlist.varSpreadSheet = "mSpreadSheet";
            js.ADD(frmlist.CreateScript("mSpread", "mSpread"));
            js.ADD("mSpreadBook.ActiveSheet.RenderStatus = false;");
            //js.ADD("CreateGridDone()");
            //CreateGridDone()
           // js.ADD("DisableGrid(); Disablefirstrow()");

        }

       

        private DataTable InitializeGrid()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("ID");
            dt.Columns.Add("Tagging");
            dt.Columns.Add("Location*");
            dt.Columns.Add("Company/Client*");
            dt.Columns.Add("Reference Company");
            dt.Columns.Add("Project*");
            dt.Columns.Add("Issue No.");
            dt.Columns.Add("Current Date");
            dt.Columns.Add("Date Raised*");
            dt.Columns.Add("Implementation Stage*");
            dt.Columns.Add("Reference File Name*");
            dt.Columns.Add("Test Case / Scenario*");
            dt.Columns.Add("Module*");
            dt.Columns.Add("Menu Group*");
            dt.Columns.Add("Sub Menu Group*");
            dt.Columns.Add("Menu Item*");
            dt.Columns.Add("Concerns*");
            dt.Columns.Add("Screenshots");
            dt.Columns.Add("Client*");
            dt.Columns.Add("Raised By*");
            dt.Columns.Add("Type*");
            dt.Columns.Add("Sub Type*");
            dt.Columns.Add("% Achievement");
            dt.Columns.Add("Overall Status");
            dt.Columns.Add("Action Item*");
            dt.Columns.Add("FPTI Remarks");
            dt.Columns.Add("Date of Feedback");
            dt.Columns.Add("Proccessed By (To be filled up by FPTI)");
            dt.Columns.Add("Assigned To (To be filled up by FPTI)");
            dt.Columns.Add("Resolution");
            dt.Columns.Add("Enhancement");
            dt.Columns.Add("Non-Negotiable Enhancement");
            dt.Columns.Add("Required Forms");
            dt.Columns.Add("Standard Version");
            dt.Columns.Add("Notes to the Enhancement");
            dt.Columns.Add("Man Days (estimated)");
            dt.Columns.Add("Submission Date of Estimated Mandays");
            dt.Columns.Add("Button Triggered Actual");
            dt.Columns.Add("Reassigned To");
            dt.Columns.Add("Priority Level");
            dt.Columns.Add("Target Start Time");
            dt.Columns.Add("Target Start Date");
            dt.Columns.Add("Target End Time");
            dt.Columns.Add("Target End Date");
            dt.Columns.Add("Document Status");
            dt.Columns.Add("Created By");
            dt.Columns.Add("Created Date");
            dt.Columns.Add("Modified By");
            dt.Columns.Add("Modified Date");

            dt.Rows.Add();

            return dt;
        }


        //private DataTable GetDataLIN()
        //{
        //    DataTable dt = new DataTable();

        //    dt = dao.GetDataLIN();

        //    return dt;
        //}

        private string DatatableToJson(DataTable dt)
        {
            return JsonConvert.SerializeObject(dt);
        }

        private DataTable JsonToDatatable(string json)
        {
            return JsonConvert.DeserializeObject<DataTable>(json);
        }




        private DataTable IssueLogLIN()
        {


            //string json = WebApp.nwobjectText("jsondata");
            //DataTable dtdata = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
            //return dtdata;

            string json = WebApp.nwobjectText("jsondata");
            DataTable dtdata = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
            return dtdata;

            //DataSet ds = WebApp.DataSet("mSpread");
            //DataTable dtLin = new DataTable();
            //try
            //{
            //    dtLin = ds.Tables[0];


            //    foreach (DataRow dr_details in dtLin.Rows)
            //    {
            //        DataRow dr = dtLin.NewRow();

            //        dr["ID"] = dr_details[SPR_ID].ToString();
            //        dr["Company"] = dr_details[SPR_Company].ToString();
            //        dr["Project"] = dr_details[SPR_Project].ToString();
            //        dr["StatusDoc"] = dr_details[SPR_StatusDoc].ToString();
            //        dr["Status"] = dr_details[SPR_Status].ToString();
            //        dr["SourceFindings"] = dr_details[SPR_SourceFindings].ToString();
            //        dr["RefFileName"] = dr_details[SPR_RefFileName].ToString();
            //        dr["TestCase"] = dr_details[SPR_TestCase].ToString();
            //        dr["Module"] = dr_details[SPR_Module].ToString();
            //        dr["MenuItem"] = dr_details[SPR_MenuItem].ToString();
            //        dr["Fields"] = dr_details[SPR_Fields].ToString();
            //        dr["ExpectedResult"] = dr_details[SPR_ExpectedResult].ToString();
            //        dr["Findings"] = dr_details[SPR_Findings].ToString();
            //        dr["Screenshot"] = dr_details[SPR_Screenshot].ToString();
            //        dr["ReportedBy"] = dr_details[SPR_ReportedBy].ToString();
            //        dr["Date"] = dr_details[SPR_Date].ToString();
            //        dr["Resolution"] = dr_details[SPR_Resolution].ToString();
            //        dr["Dev"] = dr_details[SPR_Dev].ToString();
            //        dr["AnalystRemarks"] = dr_details[SPR_AnalystRemarks].ToString();
            //        dr["DevRemarks"] = dr_details[SPR_DevRemarks].ToString();
            //        dr["DateResolve"] = dr_details[SPR_DateResolve].ToString();
            //        dtLin.Rows.Add(dr);
            //        //dtLIN.AcceptChanges();


            //    }
            //    dtLin.AcceptChanges();
            //}
            //catch { }
            //#region don't change
            //DataTable dtLIN = new DataTable();
            //dtLIN = dao.LoadSchemaLIN();
            //#endregion
            //DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("mSpread"));



            //foreach (DataRow dr_details in dt.Rows)
            //{
            //    DataRow dr = dtLIN.NewRow();

            //    dr["ID"] = dr_details[SPR_ID].ToString();
            //    dr["Company"] = dr_details[SPR_Company].ToString();
            //    dr["Project"] = dr_details[SPR_Project].ToString();
            //    dr["StatusDoc"] = dr_details[SPR_StatusDoc].ToString();
            //    dr["Status"] = dr_details[SPR_Status].ToString();
            //    dr["SourceFindings"] = dr_details[SPR_SourceFindings].ToString();
            //    dr["RefFileName"] = dr_details[SPR_RefFileName].ToString();
            //    dr["TestCase"] = dr_details[SPR_TestCase].ToString();
            //    dr["Module"] = dr_details[SPR_Module].ToString();
            //    dr["MenuItem"] = dr_details[SPR_MenuItem].ToString();
            //    dr["Fields"] = dr_details[SPR_Fields].ToString();
            //    dr["ExpectedResult"] = dr_details[SPR_ExpectedResult].ToString();
            //    dr["Findings"] = dr_details[SPR_Findings].ToString();
            //    dr["Screenshot"] = dr_details[SPR_Screenshot].ToString();
            //    dr["ReportedBy"] = dr_details[SPR_ReportedBy].ToString();
            //    dr["Date"] = dr_details[SPR_Date].ToString();
            //    dr["Resolution"] = dr_details[SPR_Resolution].ToString();
            //    dr["Dev"] = dr_details[SPR_Dev].ToString();
            //    dr["AnalystRemarks"] = dr_details[SPR_AnalystRemarks].ToString();
            //    dr["DevRemarks"] = dr_details[SPR_DevRemarks].ToString();
            //    dr["DateResolve"] = dr_details[SPR_DateResolve].ToString();
            //    dtLIN.Rows.Add(dr);
            //    dtLIN.AcceptChanges();

            //}

            //return dtLIN;
            //return dtLin;
        }

        private void RefreshData()
        {
           
            //js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")"); // goto: getToolBoxData
         

        }

        private string ValidateDataGrid()
        {
            string errorResult = string.Empty;
            DataTable gridTable = IssueLogLIN();

            foreach (DataRow r in gridTable.Rows)
            {
                if (r["Location"].ToString() == "")
                {
                    errorResult += string.Format($"Cannot Continue. Location is required at row {r["rowno"]}.\n");
                }
                if (r["Company"].ToString() == "")
                {
                    errorResult += string.Format($"Cannot Continue. Company is required at row {r["rowno"]}.\n");
                }
                if (r["Project"].ToString() == "")
                {
                    errorResult += string.Format($"Cannot Continue. Project is required at row {r["rowno"]}.\n");
                }
                if (r["DateRaised"].ToString() == "")
                {
                    errorResult += string.Format($"Cannot Continue. Date Raised is required at row {r["rowno"]}.\n");
                }
                if (r["ImplemStage"].ToString() == "")
                {
                    errorResult += string.Format($"Cannot Continue. Implementation Stage is required at row {r["rowno"]}.\n");

                }
                if (r["StatusDoc"].ToString() == "")
                {
                    errorResult += string.Format($"Cannot Continue. Reference File Name is required at row {r["rowno"]}.\n");

                }
                if (r["TestCase"].ToString() == "")
                {
                    errorResult += string.Format($"Cannot Continue. Test Case/Scenario is required at row {r["rowno"]}.\n");

                }
                if (r["Module"].ToString() == "")
                {
                    errorResult += string.Format($"Cannot Continue. Module is required at row {r["rowno"]}.\n");

                }
                if (r["Menugroup"].ToString() == "")
                {
                    errorResult += string.Format($"Cannot Continue. Menu Group is required at row {r["rowno"]}.\n");

                }
                //if (r["SubMenuGroup"].ToString() == "")
                //{
                //    errorResult += string.Format($"Cannot Continue. Sub Menu Group is required at row {r["rowno"]}.\n");

                //}
                if (r["MenuItem"].ToString() == "")
                {
                    errorResult += string.Format($"Cannot Continue. Menu Item is required at row {r["rowno"]}.\n");

                }
                if (r["Concern"].ToString() == "")
                {
                    errorResult += string.Format($"Cannot Continue. Concern is required at row {r["rowno"]}.\n");

                }
                if (r["Client"].ToString() == "")
                {
                    errorResult += string.Format($"Cannot Continue. Client is required at row {r["rowno"]}.\n");

                }
                if (r["RaisedBy"].ToString() == "")
                {
                    errorResult += string.Format($"Cannot Continue. Raised By is required at row {r["rowno"]}.\n");

                }
                if (r["Type"].ToString() == "")
                {
                    errorResult += string.Format($"Cannot Continue. Type is required at row {r["rowno"]}.\n");

                }
                if (r["SubType"].ToString() == "")
                {
                    errorResult += string.Format($"Cannot Continue. Sub Type is required at row {r["rowno"]}.\n");

                }
                //if (r["Status"].ToString() == "")
                //{
                //    errorResult += string.Format($"Cannot Continue. Overall Status is required at row {r["rowno"]}.\n");
                //}
                if (r["ActionItem"].ToString() == "")
                {
                    errorResult += string.Format($"Cannot Continue. Action Item is required at row {r["rowno"]}.\n");
                }
                if (r["Enhancement"].ToString() == "" && r["StandardVersion"].ToString() == "" && r["StandardVersion"].ToString() == "")
                {
                    errorResult += string.Format($"Cannot Continue. FPTI Remarks is required at row {r["rowno"]}.\n");
                }
                //if (r["ProcessBy"].ToString() == "")
                //{
                //    errorResult += string.Format($"Cannot Continue. Processed By is required at row {r["rowno"]}.\n");

                //}
                //if (r["Assigned"].ToString() == "")
                //{
                //    errorResult += string.Format($"Cannot Continue. Assigned By is required at row {r["rowno"]}.\n");

                //}
            }
            return errorResult;
        }

        private void GetGenerateTaskPerAssign()
        {

            DataTable gridTable = IssueLogLIN();
            foreach (DataRow r in gridTable.Rows)
            {
                if (r["Location"].ToString() != "" && r["ItemNo"].ToString() != "" && r["Assigned"].ToString() != "" && r["Employeetask"].ToString() == "")
                {
                    try
                    {
                        RecordOperationResult = dao.GenerateTaskPerAssigned(r["Location"].ToString(), r["ItemNo"].ToString(), r["Assigned"].ToString(), r["Employeetask"].ToString());
                        if (RecordOperationResult != String.Empty)
                        {
                            if (RecordOperationResult.ToLower().IndexOf("success") >= 0)
                            {
                                Prompt.Information("Generated succesfully.", based.Title);
                            }
                            else
                            {
                                Prompt.Error(RecordOperationResult, based.Title);
                            }
                        }


                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex);
                    }
                }
            }
           

            js.ADD("nwLoading_End('xSample');");
        }

        private void GetGenerateTaskPerEmployeeTask()
        {

            DataTable gridTable = IssueLogLIN();
            foreach (DataRow r in gridTable.Rows)
            {
                if (r["Location"].ToString() != "" && r["ItemNo"].ToString() != "" && r["Assigned"].ToString() != "" && r["Employeetask"].ToString() != "")
                {
                    try
                    {
                        RecordOperationResult = dao.GetGenerateTaskPerEmployeeTask(r["Location"].ToString(), r["ItemNo"].ToString(), r["Assigned"].ToString(), r["Employeetask"].ToString());
                        if (RecordOperationResult != String.Empty)
                        {
                            if (RecordOperationResult.ToLower().IndexOf("success") >= 0)
                            {
                                Prompt.Information("Generated succesfully.", based.Title);
                            }
                            else
                            {
                                Prompt.Error(RecordOperationResult, based.Title);
                            }
                        }


                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex);
                    }
                }
            }


            js.ADD("nwLoading_End('xSample');");
        }

        //private void GetUpdateTaskEntry()
        //{

        //    DataTable gridTable = IssueLogLIN();
        //    foreach (DataRow r in gridTable.Rows)
        //    {
        //        if (r["Location"].ToString() != "" && r["ItemNo"].ToString() != "" && r["Company"].ToString() != "" && r["Assigned"].ToString() != "" || r["Employeetask"].ToString() != "")
        //        {
        //            try
        //            {
        //                RecordOperationResult = dao.UpdateTaskEntry(r["ItemNo"].ToString(), r["Company"].ToString(), r["Assigned"].ToString(), r["Employeetask"].ToString());
        //                if (RecordOperationResult != String.Empty)
        //                {
        //                    if (RecordOperationResult.ToLower().IndexOf("success") >= 0)
        //                    {
        //                        Prompt.Information("Processed succesfully.", based.Title);
        //                    }
        //                    else
        //                    {
        //                        Prompt.Error(RecordOperationResult, based.Title);
        //                    }
        //                }


        //            }
        //            catch (Exception ex)
        //            {
        //                Console.WriteLine(ex);
        //            }
        //        }
        //    }


        //    js.ADD("nwLoading_End('xSample');");
        //}

        


        private void GetLocAccntForms()
        {
            //mSpreadBook.ActiveSheet.SetText(SPR_Location - 1, 3, "FPTI")

            try
            {
                DataTable dt = new DataTable();

                dt = dao.getDefaultLoc(based.SecurityAccess.RecUser);
                if (dt.Rows.Count > 0)
                {

                    js.ADD($"defaultonload('{dt.Rows[0]["Code"].ToString().Replace(@"""", @"\""").Replace(@"'", @"\'").Replace(@"`", @"\`")}','{dt.Rows[0]["Description"].ToString().Replace(@"""", @"\""").Replace(@"'", @"\'").Replace(@"`", @"\`")}')");



                    //js.ADD("mSpreadBook.ActiveSheet.SetText((SPR_CreatedBy - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row,  " + "'" + based.SecurityAccess.RecUser + "'" + ");");
                    //js.ADD("mSpreadBook.ActiveSheet.SetText((SPR_Location - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, " + "'" + dt.Rows[0]["Code"].ToString() + "'" + "); ");
                    //js.ADD("mSpreadBook.ActiveSheet.SetText2((SPR_Location - 1), mSpreadBook.ActiveSheet.GetSelectedIndexes().row, " + "'" + dt.Rows[0]["Description"].ToString() + "'" + "); ");

                    //js.ADD(string.Format(@"
                    //    var j = 3;
                    //j = mSpreadBook.ActiveSheet.GetMaxRow() - j;
                    //for (i = 3; i <= j; i++)
                    //{
                    //    mSpreadBook.ActiveSheet.SetText((SPR_Location - 1), i, '{0}');
                    //    mSpreadBook.ActiveSheet.SetText2((SPR_Location - 1), i, '{1}')
                    // }
                    //", dt.Rows[0]["Code"].ToString().Replace(@"""", @"\""").Replace(@"'", @"\'").Replace(@"`", @"\`"), 
                    //dt.Rows[0]["Description"].ToString().Replace(@"""", @"\""").Replace(@"'", @"\'").Replace(@"`", @"\`")
                    //)
//);
                    //js.makeValueText("#idvallugLocation", dt?.Rows?.Count > 1 ? string.Empty : dt.Rows[0]["Code"].ToString());
                    //js.makeValueText("#descvallugLocation", dt?.Rows?.Count > 1 ? string.Empty : dt.Rows[0]["Description"].ToString());
                }

                //if (dt.Rows.Count > 0)
                //{
                //    js.makeValueText("#txtCode", dt.Rows[0]["Code"].ToString());

                //}
            }
            catch { }
        }
    }
}





