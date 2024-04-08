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
using System.IO;


using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using NPOI.HSSF.UserModel;
//
//

using DataAccessLayers;
using DALComponent;
using System.Text.RegularExpressions;


namespace Noah_Web.forms_BusinessLayer
{
    public class NOAHIssueLogsBL : nwAction
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

        public string Result = "";
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



            dao = new NOAHIssueLogsDAL(based.SecurityAccess.ConnectionString, this.UserDefinedConnectionString, "");

            if (_strmet == "get_Initialize") strFinal = get_Initialize();
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

        


        NOAHIssueLogsDAL dao;
        public NOAHIssueLogsBL()
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
                try
                {

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


            
            DataTable dtLookupSetup = InitializeGrid(6);
            
            if (dtLookupSetup.Rows.Count > 0)
            {
                for (int i = 0; i < dtLookupSetup.Rows.Count; i++)
                {
                    string lookup = dtLookupSetup.Rows[i]["lookup"].ToString();
                    //switch (strMethod)
                    //{
                    string jsonparam = dtLookupSetup.Rows[i]["filter"].ToString();

                    

                   if (strMethod == "get"+lookup)
                    {
                        string lookuptype = "";
                        lookuptype = dtLookupSetup.Rows[i]["lookupType"].ToString();
                        if (lookuptype == "regular")
                        {

                            string filter = lookuppararameter(lookup);

                            strSQL = dao.GetLookupScript(dtLookupSetup.Rows[i]["query"].ToString(), filter);
                            strMethod = strMethod.Substring(3);
                            strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);

                            break;
                        } else if (lookuptype == "addtolist")
                        {
                            strSQL = dao.GetaddtolistScript(dtLookupSetup.Rows[i]["query"].ToString());
                            strMethod = strMethod.Substring(3);
                            strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);

                            break;
                        }
                   }
                }
            } else
            {
                Prompt.Error("Please Setup Lookup Spread for Lookup");
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
            
            switch (strMethod)
            {
                case "actBindCollection":
                    BindCollection();
                    break;
                case "GridSave":
                    RecordOperationResult = string.Empty;
                    //RecordOperationResult = ValidateDataGrid();
                    //DataTable gridTable = IssueLogLIN();

                    if (RecordOperationResult == string.Empty)
                    {
                        DataTable dtlin = new DataTable();

                        dtlin = IssueLogLIN();
                        //dtlin_image 
                        RecordOperationResult = dao.SaveGridData1(dtlin, "NOAHIssueLogs-1", based.SecurityAccess.RecUser, ItemNo);


                        if (RecordOperationResult.Contains("successfully"))
                        {
                            RecordOperationResult = dao.SaveDataInsert();
                        } else
                        {

                        }

                        //autorefresh



                        dataretrieve();


                        //DataSet dtDescRefresh = new DataSet();
                        //dtDescRefresh = dao.GetDataDescription(Company, Project);
                        //js.ADD("jsonDescription=" + Newtonsoft.Json.JsonConvert.SerializeObject(dtDescRefresh));
                        //js.ADD("EnableGrid()");

                        //autoresfresh

                        Prompt.Information("Save Successfully", based.Title);



                    }
                    else
                    {
                        Prompt.Error(RecordOperationResult, based.Title);
                        js.ADD("ChangeStatusColor(mSpreadBook.ActiveSheet.GetSelectedIndexes().row)");

                    }


                  

                    js.ADD("Button_Enable(); ");
                    js.ADD("nwLoading_End('GridSave');");

                    break;

                case "actGetSPR":
                    js.ADD("jsonSPRSpread=" + Newtonsoft.Json.JsonConvert.SerializeObject(InitializeGrid(2)));
                    js.ADD("SPRs()");
                    js.ADD("jsonfilterHDR=" + Newtonsoft.Json.JsonConvert.SerializeObject(InitializeGrid(3)));
                    js.ADD("jsonfilterLIN=" + Newtonsoft.Json.JsonConvert.SerializeObject(InitializeGrid(4)));
                    js.ADD("cuzFIlter()");
                    js.ADD("jsonSPRSave=" + Newtonsoft.Json.JsonConvert.SerializeObject(InitializeGrid(5)));
                    js.ADD("cuzSPRSave()");
                    js.ADD("jsonLookup=" + Newtonsoft.Json.JsonConvert.SerializeObject(InitializeGrid(6)));
                    js.ADD("cuz_LookupSPR()");
                    js.JSONfromDataTable("jsonSPR", InitializeGrid(0));
                    //js.ADD("jsonSPR=" + Newtonsoft.Json.JsonConvert.SerializeObject(InitializeGrid(0)));

                    js.ADD("SPRInsert()");
                    //temp
                    //GenerateGrid(InitializeGrid(1));
                    break;

                case "DataEnable":
                    //GenerateGrid(InitializeGrid());

                    GenerateGrid(InitializeGrid(1));
                    //js.ADD("EnableGrid()");
                    var currentdate = SFObject.GetServerDateTime(this.UserDefinedConnectionString);

                    js.ADD("cuzActionNew();");
                    //GetLocAccntForms();
                    js.ADD("nwLoading_End('actDataEnable');");

                    break;



                case "Refresh":



                    //DataSet dtDescription = new DataSet();


                    //dtDescription = dao.GetDataDescription(Company, Project);
                    //js.ADD("jsonDescription=" + Newtonsoft.Json.JsonConvert.SerializeObject(dtDescription));
                    js.ADD("GetAddtoListFilters()");
                    dataretrieve();



                    js.ADD("Button_Enable();");

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

                case "actSaveTemplateScreenshot":

                    string loadpath = WebApp.nwobjectText("path");
                    loadpath = nwSystem.StringDecrypt(loadpath);
                    string SheetName = "Sheet1";
                    DataTable dtScreenshot = GenerateExcel(SheetName, loadpath);

                    js.ADD("nwLoading_End('actSaveTemplateScreenshot');");

                    break;
                case "actSaveScreenShot":

                    string html = WebApp.nwobjectTextSQL("html");

                    string ItemID = WebApp.nwobjectText("ItemID");

                    string msg = dao.SaveScreenShot(ItemID, html, based.SecurityAccess.RecUser);

                    js.ADD("cuz_SaveScreenshot()");
                    //js.ADD("$('#nwgRemarksCon').removeClass('show');$('#nwgRemarksCon').hide();");
                    ////02202024
                    //js.ADD("mSpreadBook.ActiveSheet.SetValue(SPR_Screenshot-1,crIndexSpread,1); mSpreadBook.ActiveSheet.SetBackground(SPR_Screenshot - 1, crIndexSpread, bgcolorbuttonWithContent); ");
                    js.ADD("nwLoading_End('actSaveScreenShot');");

                    break;
                case "actGetScreenShot":


                     ItemID = WebApp.nwobjectText("ItemID");
                    string content = dao.getScreenShot(ItemID);
                    js.makeHTML("#cmsnwgRemarks .nwCMSContent", content);

                    js.ADD("nwLoading_End('actGetScreenShot');");

                    break;

                case "Recuser":

                    DataTable dtRecDesc = new DataTable();
                    dtRecDesc = dao.GetRecuserDesc(based.SecurityAccess.RecUser);
                    js.ADD("jsonRecuserDesc=" + Newtonsoft.Json.JsonConvert.SerializeObject(dtRecDesc));

                    js.ADD("cust_descrecuser(); ");
                    break;

                case "Moduser":

                    DataTable dtModDesc = new DataTable();
                    dtModDesc = dao.GetRecuserDesc(based.SecurityAccess.RecUser);
                    js.ADD("jsonRecuserDesc=" + Newtonsoft.Json.JsonConvert.SerializeObject(dtModDesc));

                    js.ADD("cust_descmoduser(); ");
                    break;

                case "actSaveTemplate":
                    SaveTempTable();
                    js.ADD("nwLoading_End('actSaveTemplate');");
                    break;
                case "actExport":
                    try
                    {
                        DataTable dtExport = new DataTable();
                        //dtExport = dao.GetExport(Company, Project, Module, MenuGroup, MenuItem, ImplementationStage, Type, Status, ActionItem, RaisedBy, ProccessedBy, TaskforEmployee, txtdateto.ToString("MM/dd/yyyy"), txtdatefrom.ToString("MM/dd/yyyy"));

                        DateTime date_today = SFObjects.GetServerDateTime(this.UserDefinedConnectionString);
                        string LISTINGFILENAME = "HRMS Support Ticketing System";
                        ListingAndPrint frmlist = new ListingAndPrint
                                                                      (ListingAndPrint.FormType.Listing, 0, dtExport,
                                                                     LISTINGFILENAME, UserDefinedConnectionString, "Modified Date:" + date_today.ToString("MM/dd/yyyy hh:mm:ss"),
                                                                      based.SecurityAccess.RecUserName, LISTINGFILENAME);

                        //frmlist.m_Spread.SetText(1, 1, "Intercol asdkas;ldkas");
                        //frmlist.m_Spread.SetText(1, 1, "Intercol asdkas;ldkas");

                        frmlist.SetSpreadType(nwGridType.SpreadCanvas);
                        js.Show("#nwExportContainerMain", 0);

                        //js.ADD("$('#btnnwExport').click()");
                        js.ADD(frmlist.CreateScript());


                        //## FOR EXPORTING ###
                        Random rnd = new Random();
                        DataTable dt1 = frmlist.m_Spread.ExportConfig();
                        DataTable dt2 = frmlist.m_Spread.GetDataSource();
                        frmlist.varSpreadSheet = "nwGridExport_Sheet";
                        frmlist.varSpreadBook = "nwGridExport_Book";
                        string SessionID = DateTime.Now.ToString("yyyyddMMhhmmss") + rnd.Next(0, 9999).ToString().PadRight(4, '0');
                        HttpContext.Current.Session["Config_" + SessionID] = dt1;
                        HttpContext.Current.Session["Data_" + SessionID] = dt2;
                        HttpContext.Current.Session["Filename_" + SessionID] = LISTINGFILENAME;
                        HttpContext.Current.Session["Header_" + SessionID] = "0";
                        js.ADD("ExportSessionID='" + SessionID + "'");

                        js.ADD("nwLoading_End('xSample')");
                        js.ADD("$('#btnnwExport').hide()");
                        js.ADD("$('#btnnwExportCSV').text('Export to Excel')");
                    }
                    catch (Exception err)
                    {
                        Prompt.Information(err.ToString());
                    }
                    js.ADD("nwLoading_End('actExport');");
                    break;
                    

            }


            return js.makeJSPostScript("try{" + execute() + "}catch(err){alert(err);}");
        }

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
            js.ADD("DisableGrid()");
            GenerateGrid(InitializeGrid(1));






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



        private void GenerateValidationGrid(DataTable dtValidation)
        {
           
            string gridID = "nwGridp8Spread";

            nwGrid nwGridCon = new nwGrid(gridID);

            nwGridCon.Type = nwGridType.SpreadCanvas;

            DataTable DynamicTable = dtValidation;
            nwGridCon.CreateExcelGrid(dtValidation.Rows.Count, dtValidation.Columns.Count);
            nwGridCon.dataSource(dtValidation);
            nwGridCon.nwobject(0).ColumnName("Validation");
            nwGridCon.nwobject(0).Width(400);
            nwGridCon.TableHeight(400);
            
            nwGridCon.varSpreadBook = "nwvalidationGridBook";
            nwGridCon.varSpreadSheet = "nwvalidationGridSheet";
            js.ADD(nwGridCon.createTable());
            js.ADD("mSpreadBook.ActiveSheet.RenderStatus = false;");


        }


        private void GenerateGrid(DataTable dtSource)
        {
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


            DataTable DynamicTable = new DataTable();


            DynamicTable = InitializeGrid(0);


            js.ADD("jsontbl=" + Newtonsoft.Json.JsonConvert.SerializeObject(DynamicTable));


            frmlist.m_Spread.minRow(dtSource.Rows.Count + 1);



            frmlist.m_Spread.TableHeight(400);
            frmlist.MenuItemName = based.Title;
            frmlist.varSpreadBook = "mSpreadBook";
            frmlist.varSpreadSheet = "mSpreadSheet";
            js.ADD(frmlist.CreateScript("mSpread", "mSpread"));
            js.ADD("mSpreadBook.ActiveSheet.RenderStatus = false;");



            js.ADD("cuzGenerateGrid();");


        }




        private string DatatableToJson(DataTable dt)
        {
            return JsonConvert.SerializeObject(dt);
        }

        private DataTable JsonToDatatable(string json)
        {
            return JsonConvert.DeserializeObject<DataTable>(json);
        }



        private DataTable InitializeGrid(int num)
        {
            DataSet ds = new DataSet();
            ds = dao.GetTable(based.SecurityAccess.RecUser);
            DataTable dtHDR = new DataTable();
            if (num == 0)
            {
                dtHDR = ds.Tables[0].Copy();
            }
            else if (num == 1)
            {
                dtHDR = ds.Tables[1].Copy();
            }
            else if (num == 2)
            {
                dtHDR = ds.Tables[2].Copy();
            }
            else if (num == 3)
            {
                dtHDR = ds.Tables[3].Copy();
            }
            else if (num == 4)
            {
                dtHDR = ds.Tables[4].Copy();
            }
            else if (num == 5)
            {
                dtHDR = ds.Tables[5].Copy();
            }
            else if (num == 6)
            {
                dtHDR = ds.Tables[6].Copy();
            }
            return dtHDR;

           
        }

        public DataTable ExcelToDataTable_Image(string filePath, string sheetName)
        {
            // Create a DataTable to hold the image data for this sheet
            DataTable dtFinal = new DataTable();
            dtFinal.Columns.Add("RowGroupName", typeof(string));
            dtFinal.Columns.Add("Row1Group", typeof(int));
            dtFinal.Columns.Add("Row2Group", typeof(int));
            dtFinal.Columns.Add("XPosition", typeof(int));
            dtFinal.Columns.Add("YPosition", typeof(int));
            dtFinal.Columns.Add("Width", typeof(int));
            dtFinal.Columns.Add("Height", typeof(int));
            dtFinal.Columns.Add("Col1", typeof(int));
            dtFinal.Columns.Add("Col2", typeof(int));
            dtFinal.Columns.Add("Row1", typeof(int));
            dtFinal.Columns.Add("Row2", typeof(int));
            dtFinal.Columns.Add("ImageData", typeof(byte[]));
            //DataTable dt = dtFinal.Clone();
            try
            {
                // Load the Excel file into a workbook
                XSSFWorkbook workbook;
                using (FileStream fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
                {
                    workbook = new XSSFWorkbook(fileStream);
                }
                // Iterate over each sheet in the workbook
                //foreach (ISheet sheet in workbook)
                //{
                ISheet sheet = workbook.GetSheet(sheetName);
                var patriarch = (XSSFDrawing)sheet.CreateDrawingPatriarch();
                var pictures = patriarch.GetShapes();
                int lastrow = 0;
                int lastrowwithimage = 0;
                bool islastrow = false;
                try
                {
                    lastrow = sheet.LastRowNum;
                    lastrowwithimage = lastrow;
                }
                catch { }
                // Iterate through each row in the sheet
                for (int row = 0; row <= lastrow; row++)
                {
                    string cellValue = "";
                    try
                    {
                        cellValue = sheet.GetRow(row).GetCell(0).ToString();
                    }
                    catch { }
                    if (!string.IsNullOrWhiteSpace(cellValue))
                    {
                        string RowGroupText = cellValue;
                        int nextrowstart = row;
                        //if last row
                        if (nextrowstart >= lastrow)
                        {
                            islastrow = true;
                        }
                        //if not last row
                        if (!islastrow)
                        {
                            nextrowstart += 1;
                        }
                        for (int irow = nextrowstart; irow <= lastrow; irow++)
                        {
                            string icellValue = "";
                            try
                            {
                                icellValue = sheet.GetRow(irow).GetCell(0).ToString();
                            }
                            catch { }
                            if (!string.IsNullOrWhiteSpace(icellValue) || irow == lastrow)
                            {
                                string RowGroupName = cellValue;
                                int Row1Group = row;
                                int Row2Group = irow;
                                //if not last row
                                if (!islastrow)
                                {
                                    Row2Group = irow - 1;
                                }
                                foreach (var picture in pictures)
                                {
                                    if (picture is XSSFPicture)
                                    {
                                        XSSFPicture xssfPicture = (XSSFPicture)picture;

                                        // Get the anchor of the picture
                                        var anchor = xssfPicture.GetPreferredSize();
                                        // Get the column and row numbers of the top-left and bottom-right cells of the picture
                                        int row1 = anchor.Row1;

                                        if ((Row1Group <= row1 && Row2Group >= row1)
                                            || (Row1Group <= row1 && islastrow)
                                            )
                                        {
                                            int col1 = anchor.Col1;
                                            int col2 = anchor.Col2;

                                            int row2 = anchor.Row2;
                                            // Get the top-left cell of the picture
                                            //var topLeftCell = sheet.GetRow(anchor.Row1).GetCell(anchor.Col1);

                                            // Get the coordinates of the top-left corner of the picture
                                            int xPosition = anchor.Dx1;
                                            int yPosition = anchor.Dy1;

                                            // Get the width and height of the picture
                                            int width = anchor.Dx2 - anchor.Dx1;
                                            int height = anchor.Dy2 - anchor.Dy1;



                                            // Get the picture data
                                            byte[] imageData = xssfPicture.PictureData.Data;


                                            int Row2GroupFinal = Row2Group;
                                            ////if last row
                                            if (islastrow)
                                            {
                                                Row2GroupFinal = -247;
                                                if (lastrowwithimage < row2)
                                                {
                                                    lastrowwithimage = row2;
                                                }
                                            }
                                            // Add the image position and data to the DataTable
                                            dtFinal.Rows.Add(RowGroupName, Row1Group, Row2GroupFinal, xPosition, yPosition, width, height, col1, col2, row1, row2, imageData);
                                        }
                                    }
                                }
                                ////if last row
                                if (islastrow)
                                {
                                    //update temp Row2Group
                                    Row2Group = lastrowwithimage;
                                    DataRow[] rowsToUpdate = dtFinal.Select("Row2Group = '-247'");
                                    foreach (DataRow rowupdate in rowsToUpdate)
                                    {
                                        rowupdate["Row2Group"] = lastrowwithimage;
                                    }
                                }
                                //update next row
                                row = Row2Group;
                                break;
                            }
                        }

                    }
                }
            }
            catch (Exception ex)
            {
                //Console.WriteLine($"Error: {ex.Message}");
            }
            return dtFinal;
        }





        private DataTable GenerateExcel(string Sheetname, string loadpath)
        {
            DataTable ImagefromExcel = new DataTable();

            string exceltype = Path.GetExtension(loadpath).Replace(".", "");
            try
            {
                DataSet ds_image = ExcelToDataSet(loadpath, "Sheet");

                foreach (DataTable dt in ds_image.Tables)
                {
                    foreach(DataRow dr in dt.Rows)
                    {
                        byte[] imageExcelData = (byte[])dr["ImageData"];
                        string base64Image = Convert.ToBase64String(imageExcelData);
                        js.ADD("");
                    }
                }
            }
            catch
            {
                RecordOperationResult = "Cannot be upload. Sheetname should be" + Sheetname +".";
                return ImagefromExcel;
            }

            return ImagefromExcel;
        }


        private DataSet ExcelToDataSet(string loadpath, string sheetname)
        {
            DataSet DsSheet = new DataSet();
            try
            {
               

                IWorkbook wb = new XSSFWorkbook(loadpath);
                ISheet ws = wb.GetSheetAt(0);


                XSSFSheet sheet = wb.GetSheetAt(0) as XSSFSheet;

                DataTable ImageTBL = new DataTable(ws.SheetName + "imgDT");

                ImageTBL.Columns.Add("x", typeof(int));
                ImageTBL.Columns.Add("y", typeof(int));
                ImageTBL.Columns.Add("width", typeof(int));
                ImageTBL.Columns.Add("height", typeof(int));
                ImageTBL.Columns.Add("col1", typeof(int));
                ImageTBL.Columns.Add("col2", typeof(int));
                ImageTBL.Columns.Add("row1", typeof(int));
                ImageTBL.Columns.Add("row2", typeof(int));
                ImageTBL.Columns.Add("imagedata", typeof(int));

                var patriarch = (XSSFDrawing)sheet.CreateDrawingPatriarch();

                var pictures = patriarch.GetShapes();
                foreach (var picture in pictures)
                {
                    if (picture is XSSFPicture)
                    {
                        XSSFPicture XSSFPicture = (XSSFPicture)picture;

                        var anchor = XSSFPicture.GetPreferredSize();

                        int x = anchor.Dx1;
                        int y = anchor.Dx2;

                        int width = anchor.Dx2 = anchor.Dx1;
                        int height = anchor.Dy2 - anchor.Dx1;

                        byte[] imagedata = XSSFPicture.PictureData.Data;

                        int col1 = anchor.Col1;
                        int col2 = anchor.Col1;
                        int row1 = anchor.Row1;
                        int row2 = anchor.Row2;

                        ImageTBL.Rows.Add(x, y, width, height, col1, col2, row1, row2, imagedata);
                    }
                }

                DsSheet.Tables.Add(ImageTBL);
            } catch(Exception err)
            {

            }
            return DsSheet;
        }


        string ItemNo = "";


        public DataTable IssueLogLIN()
        {

         
            DataTable dtdesc = dao.IssueLogTable();
            string json = WebApp.nwobjectText("jsondata");
            DataTable dtdata = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
            foreach (DataRow row in dtdata.Rows)
            {
                DataRow dr = dtdesc.NewRow();
                foreach (DataColumn col in dtdesc.Columns)
                {
                    string columnname = col.ColumnName;
                    string value = row[columnname].ToString();
                    if (col.DataType == typeof(DateTime) 
                        || col.DataType == typeof(bool)
                        || col.DataType == typeof(int)
                        || col.DataType == typeof(decimal))
                    {
                        dr[columnname] = string.IsNullOrWhiteSpace(value) ? (object)DBNull.Value : value;
                    }
 
                    else {
                        dr[columnname] = value;
                         }
                    if (columnname == "Tag" && value == "1")
                    {
                        ItemNo += row["ItemNo"].ToString() + "|";
                    }
                }
                dtdesc.Rows.Add(dr);
                dtdesc.AcceptChanges();
            }
            //dtdata?.Select()?.ToList<DataRow>()
            //       .ForEach(r =>
            //       {
            //           string Tag = r["Tag"].ToString();
            //           if(Tag == "1")
            //           {
            //               ItemNo += r["ItemNo"].ToString() + "|";
            //           }
            //       });
            return dtdesc;

        }

        private void RefreshData()
        {

            //js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")"); // goto: getToolBoxData


        }

        private void dataretrieve()
        {
            DataSet ds1 = new DataSet();

            ds1 = dao.cuzGetdataLIN("NOAHIssueLogs-1", based.SecurityAccess.RecUser, addtolistparameter());

            DataTable dtHDRcode1 = new DataTable();
            DataTable dtHDRdesc1 = new DataTable();
            DataTable dtHDRfunc1 = new DataTable();
            dtHDRcode1 = ds1.Tables[0].Copy();
            dtHDRdesc1 = ds1.Tables[1].Copy();
            dtHDRfunc1 = ds1.Tables[2].Copy();
            js.ADD("jsonDescription=" + Newtonsoft.Json.JsonConvert.SerializeObject(dtHDRdesc1));
            js.ADD("jsondescfunctagging=" + Newtonsoft.Json.JsonConvert.SerializeObject(dtHDRfunc1));
            
            GenerateGrid(dtHDRcode1);

            js.ADD("cuz_retdesc();");
            js.ADD(" cuz_dateformatret();");

        }

        private string lookuppararameter(string lookup)
        {
            DataTable filter = dao.getLookUpFilterList("NOAHIssueLogs-1", lookup);
            string filterdata = "";
            string filterdataString = "";
            int rows = 1;
            foreach (DataRow row in filter.Rows)
            {
                filterdata =WebApp.nwobjectText(row["filterParams"].ToString());
                filterdataString += " ,@Param"+rows+"='"+filterdata+"'";
                rows++;
            }

            return filterdataString;
        }



        private string addtolistparameter()
        {
            DataTable filter = dao.getaddtolistFilter("NOAHIssueLogs-1");
            string filterdata = "";
            string filterdataString = "";
            
            foreach (DataRow row in filter.Rows)
            {
                string addtolistparams = row["lookup"].ToString();
                filterdata = WebApp.nwobjectText(row["lookup"].ToString());
                filterdataString += " ,@" + addtolistparams + "='" + filterdata + "'";
                
            }

            return filterdataString;
        }
        private DataTable LoadSchemaUploading(DataTable dt)
        {
            int rowno = 7;

            //DataTable dtTemp = dao.GetTempTableTemplate();

            dt.Columns.Add("recuser", typeof(string)).SetOrdinal(0);
            dt.Columns.Add("rowno", typeof(int)).SetOrdinal(1);//.SetOrdinal(0);            
            //dt.Columns.Add("tag", typeof(int)).SetOrdinal(2);//.SetOrdinal(0);            
            dt.Select().ToList<DataRow>()
             .ForEach(r =>
             {
                 r["rowno"] = rowno++;
                 r["recuser"] = based.SecurityAccess.RecUser;
                 //r["tag"] = 2;
             });

            //DataTable dtdesc = dao.GetTempTableTemplate();

            //foreach (DataRow row in dt.Rows)
            //{
            //    DataRow dr = dtdesc.NewRow();
            //    foreach (DataColumn col in dtdesc.Columns)
            //    {
            //        string columnname = col.ColumnName;
            //        string value = row[columnname].ToString();
            //        if (col.DataType == typeof(DateTime)
            //            || col.DataType == typeof(bool)
            //            || col.DataType == typeof(int)
            //            || col.DataType == typeof(decimal))
            //        {
            //            dr[columnname] = string.IsNullOrWhiteSpace(value) ? (object)DBNull.Value : value;
            //        }

            //        else
            //        {
            //            dr[columnname] = value;
            //        }
            //    }
            //    dr["rowno"] = rowno++;
            //    dr["recuser"] = based.SecurityAccess.RecUser;
            //    dr["tag"] = 2;
            //    dtdesc.Rows.Add(dr);
            //    dtdesc.AcceptChanges();
            //}
            return dt;
        }

        private void SaveTempTable()
        {
            RecordOperationResult = String.Empty;
            DataTable dtLin = new DataTable();
            DataTable dtHdr = new DataTable();
            nwFunction nwfunction = new nwFunction();
            string stringPath = WebApp.nwobjectText("path");
            string err1 = string.Empty, pOperation = string.Empty;

            #region
            string stringSelectDetail = @"SELECT [F1], 
                                                 [F2],
                                                 [F3],
                                                 [F4],
                                                 [F5],
                                                 [F6],
                                                 [F7],
                                                 [F8],
                                                 [F9],
                                                 [F10],
                                                 [F11],
                                                 [F12],
                                                 [F13],
                                                 [F14],
                                                 [F15],
                                                 [F16],
                                                 [F17],
                                                 [F18],
                                                 [F19],
                                                 [F20],
                                                 [F21],
                                                 [F22],
                                                 [F23],
                                                 [F24],
                                                 [F25],
                                                 [F26],
                                                 [F27],
                                                 [F28],
                                                 [F29],
                                                 [F30],
                                                 [F31],
                                                 [F32],
                                                 [F33],
                                                 [F34]
                                           FROM [Sheet1$]";
            #endregion

            int startRow = 8;
            string excelType = Path.GetExtension(stringPath).Replace(".", "");
            DataTable dtExcelData = new DataTable();

            try
            {
                string filepath = dao.ServerLink();
                //dtExcelData = ExcelToDataTable($@"{stringPath}\PRF Direct Uploading.xlsx", "LoadingTemplate", "A1", "X1");


                //dtExcelData = ExcelToDataTable(stringPath, "LoadingTemplate", "A1", "X1");


                //if (based.isInterface == false)
                //{
                //    //meaning dev mode
                //    dtExcelData = ExcelToDataTable($@"D:\ROMAR\ORTIGAS V9 BR\PRF Direct Uploading.xlsx", "LoadingTemplate", "A1", "X1");
                //}

                //Uncomment this two line when deploying
                dtExcelData = nwfunction.GetDataTableFromCsv(stringPath, stringSelectDetail.Replace(".", ""), excelType, false);
                dtExcelData = dtExcelData.Rows.Cast<DataRow>().Where(row => !row.ItemArray.All(field => field is DBNull || string.IsNullOrWhiteSpace(field as string))).CopyToDataTable();

                dtExcelData.Rows.RemoveAt(0);
                dtExcelData.Rows.RemoveAt(0);
                dtExcelData.Rows.RemoveAt(0);
                dtExcelData.Rows.RemoveAt(0);

                dtExcelData = LoadSchemaUploading(dtExcelData);

                if (dtExcelData.Rows.Count <= 0)
                {
                    Prompt.Error("Cannot proceed. No details provided.\n", based.Title);
                    return;
                }

                RecordOperationResult = dao.InsertDataToTemp(dtExcelData, "NOAHIssueLogs-1", based.SecurityAccess.RecUser);

                if (RecordOperationResult.Contains("successfully"))
                {

                    js.ADD("nwPopupForm_HideModal('nwUploadCon');");
                    DataTable dtValidationList = dao.getValidationList(based.SecurityAccess.RecUser);
                    if (dtValidationList.Rows.Count > 0)
                    {
                        //    //RecordOperationResult = "Found Invalid Data. Please check Remarks.";
                        //    //Prompt.Error(RecordOperationResult, "Payment Request Entry");
                        
                        GenerateValidationGrid(dtValidationList);
                        js.ADD("nwPopupForm_ShowModal('nwValidate');");
                        //DataTable dtAll = dal.getValidationListAll(based.SecurityAccess.RecUser, false);
                        //CreateValidationGrid(dtAll);
                        //    nwToolBox.bindingNavigatorProcessItem.Enable = false;
                   }
                    else
                       {

                        //DataTable dtH = LoadSchema();
                        //DateTime serverdate = DateTime.Now;
                        RecordOperationResult = dao.SaveDataUploading(based.SecurityAccess.RecUser);
                        //RecordOperationResult = dal.SaveDataUploading(based.SecurityAccess.RecUser);

                        //RecordOperationResult = "Successfully Uploaded";
                    Prompt.Information(RecordOperationResult, based.Title);

                        dataretrieve();
                        //RefreshData();


                    }
                }
                else if (RecordOperationResult.IndexOf("Error") == 0 || RecordOperationResult.Contains("Cannot"))
                {
                    if (RecordOperationResult.Contains("cannot be converted to type decimal"))
                    {
                        Prompt.Error("Cannot proceed. Numeric fields should not contain parenthesis.", based.Title);
                    }
                    else
                    {
                        Prompt.Error(RecordOperationResult, based.Title);
                    }
                }
                else
                {
                    Prompt.Error(RecordOperationResult, based.Title);
                    js.ADD("nwPopupForm_HideModal('nwUploadCon');");
                }
            }
            catch (Exception err)
            {
                if (err.ToString().Contains("'Sheet1$' is not a valid name."))
                {
                    Prompt.Error("Cannot Load. Invalid File. Sheet name should be [LoadingTemplate].\n", based.Title);
                    js.ADD("ClearUploadField();");
                    return;
                }
                else
                {
                    Prompt.Error("Cannot proceed. Invalid Template selected.\n", based.Title);
                    //Prompt.Information(err.ToString());
                    js.ADD("ClearUploadField();");
                    return;
                }
            }

            //try
            //{
            //    getExcelData(ref dtExcelData, ref err1, stringSelectDetail, stringPath, "Sheet1", startRow);
            //    //dtExcelData = nwfunction.GetDataTableFromCsv(stringPath, stringSelectDetail, excelType, true);
            //    dtLin = LoadSchemaLIN(dtExcelData);

            //    if (RecordOperationResult.Length <= 0)
            //    {
            //        RecordOperationResult = dal.InsertDataToTemp(dtLin, based.SecurityAccess.RecUser);
            //    }
            //    else
            //    {
            //        RecordOperationResult = RecordOperationResult.Insert(0, "");
            //    }

            //    Prompt.Information(RecordOperationResult, based.Title);
            //}
            //catch (Exception err)
            //{
            //    js.ADD("nwLoading_End('uploading')");
            //    if (err.ToString().Contains("'Sheet1$' is not a valid name."))
            //    {
            //        Prompt.Information("Cannot be loaded. Invalid File. Sheet name should be [Sheet1].\n", based.Title);
            //        js.ADD("$('#dimMessageBox').removeClass('msgErrorUpload');");
            //        js.ADD("clearUploadField();");
            //        return;
            //    }
            //    else
            //    {
            //        Prompt.Information("Cannot be loaded. Header is in a wrong format or the data is empty.\n", based.Title);
            //        js.ADD("$('#dimMessageBox').removeClass('msgErrorUpload');");
            //        js.ADD("clearUploadField();");
            //        return;
            //    }
            //}
        }



    }
}





