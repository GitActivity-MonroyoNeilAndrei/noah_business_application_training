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

using System.Globalization;

using DALComponent;
using System.Collections.Generic;
using System.IO;

namespace Noah_Web.forms_BusinessLayer
{
    public class SBTransferOfUnitSubMenuBL : nwAction
    {
        #region Variables needed
        //string _strFinal = ""; // container of string result
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
        private string ToolboxOrderData = ""; // toolbox Orderby

        DataTable emptyDT = new DataTable();

        public string Result = "";
        public string Trantype = "VENIPE";
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
            //Addchars();
            dal = new SBTransferOfUnitSubMenuDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
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
        string RecordOperationResult = String.Empty;
        string InfoOperationResult = String.Empty;
        SBTransferOfUnitSubMenuDAL dal;

        //private static int StartIndex = 0,
        //    SPR_Deactivate = StartIndex,
        //    SPR_Details = ++StartIndex,
        //    SPR_RsnForDeactivation = ++StartIndex,
        //    SPR_CustomerCode = ++StartIndex,
        //    SPR_CustomerName = ++StartIndex,
        //    SPR_CustomerClass = ++StartIndex,
        //    SPR_DateCreated = ++StartIndex,
        //    SPR_AgeInDays = ++StartIndex,
        //    SPR_CreatedBy = ++StartIndex;

        private static int StartIndex = 0,
            SPR_ProjectCode = StartIndex,
            SPR_ProjectDescription = ++StartIndex,
            SPR_Block = ++StartIndex,
            SPR_Lot = ++StartIndex,
            SPR_Customer = ++StartIndex,
            SPR_HoldingDate = ++StartIndex,
            SPR_HoldingExpiryDate = ++StartIndex,
            SPR_QueueNo = ++StartIndex,
            SPR_Age = ++StartIndex,
            SPR_TransferOfUnit = ++StartIndex;


        public SBTransferOfUnitSubMenuBL()
        {
        }

        #region Dont Change

        public string func_Toolbox(string strMethod, string poz, string strParameter, string strValue)
        {

            try
            {
                WebApp = new WebApplib(strParameter, strValue);
                int pozt = -1;
                try { pozt = Convert.ToInt32(poz); }
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
                        InitializeValues();
                        break;
                    case "1":
                        RecordOperation(eRecordOperation.Save, pozt);
                        if (String.IsNullOrEmpty(RecordOperationResult) == true) strF = "isNewRow=false;" + strF;
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

        public string get_Method(string strMethod, string strSearchVal, string strParameter, string strValue)
        {
            WebApp = new WebApplib(strParameter, strValue);
            DataTable dtLookupConfig = WebApp.get_LookupConfig();
            nwObject.LookupConfig(dtLookupConfig);

            string strFinal = "";
            string strSQL = "";
            string mouseDownFunc = "";
            string mouseOverFunc = "";
            strConn = this.UserDefinedConnectionString;

            switch (strMethod)
            {
                case "gettoolboxInquire":
                    strSQL = dal.inquireQuery();
                    //nwObject.ColumnSort("Code", "asc");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugLocAccForms":
                    strSQL = dal.lugLocAccForms();
                    //nwObject.ColumnSort("Code", "asc");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugReTranUnit":
                    strSQL = dal.lugReTranUnit();
                    //nwObject.ColumnSort("Code", "asc");
                    strMethod = strMethod.Substring(3);
                    //nwObject.ColumnHide(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL,  strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugRefHoldTrans":
                    strSQL = dal.lugRefHoldTrans();
                    //nwObject.ColumnSort("Code", "asc");
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "gettxtDocNo":
                    strSQL = dal.txtDocNo();
                    //nwObject.ColumnSort("Code", "asc");
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "gettxtDocDate":
                    strSQL = dal.txtDocDate();
                    //nwObject.ColumnSort("Code", "asc");
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugNewUnit":
                    strSQL = dal.lugNewUnit();
                    //nwObject.ColumnSort("Code", "asc");
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;



                    //case "getCustomer":
                    //    strSQL = dal.InquireCustomerList(WebApp.nwobjectText("CustomerClassification"));
                    //    nwObject.ColumnSort("Code", "asc");
                    //    strMethod = strMethod.Substring(3);
                    //    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    //    break;

                    //case "getCustomerClassification":
                    //    strSQL = dal.InquireCustClassList(WebApp.nwobjectText("Customer"));
                    //    strMethod = strMethod.Substring(3);
                    //    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    //    break;
            }

            return strFinal;
        }

        public void RecordOperation(eRecordOperation i, int Position)
        {
            string tempstr = "";

            switch (i)
            {
                case eRecordOperation.AddNew:

                    js.ADD("ClearFields();");
                    js.makeValueText("#txtDocDate", dal.txtDocDate().ToString());

                    //var docstat = WebApp.nwobjectText("docstat");

                    string docstat = "";
                    if (HttpContext.Current != null)
                    {
                        var request = HttpContext.Current.Request;
                        docstat = WebApp.nwobjectText("docstat");
                        js.makeValueText("#txtDocStatus", dal.txtDocStatus(docstat));
                    }



                    //js.makeValueText("#descvallugRefHoldTrans", WebApp.nwobjectText("unitC"));    
                    InitializeValues();

                    break;

                case eRecordOperation.Save:

                    string docno = "";
                    docno = dal.txtDocNo().ToString();
                    docno = WebApp.nwobjectText("idvallugLocAccForms") + "-TRUNT-" + dal.txtDocNo().ToString();

                    js.makeValueText("#txtDocNo", docno);

                    RecordOperationResult = ValidateData();

                    if (RecordOperationResult.Length <= 0)
                    {
                        DataTable dt = new DataTable();

                        dt = LoadSchema();
                        RecordOperationResult = dal.SaveData(dt, isNewRow, Trantype);
                    }

                    tempstr = "Save";
                    Prompt.Information(tempstr, based.Title);

                    //var txt_idvallugLocAccForms = WebApp.nwobjectText("idvallugLocAccForms");

                    break;

                case eRecordOperation.Delete:
                    tempstr = "Delete";
                    Prompt.Information(tempstr, based.Title);
                    break;

                case eRecordOperation.Process:
                    //tempstr = "Process";
                    //Prompt.Information(tempstr, based.Title);
                    ProcessData();
                    break;

                case eRecordOperation.Refresh:

                    RefreshData();
                    //LoadGrid(false, InitializeGrid());
                    //js.ADD("nwLoading_End('xLoading');");
                    break;
                case eRecordOperation.Inquire:



                    tempstr = "inqure";
                    break;

                case eRecordOperation.Import:
                    tempstr = "import";
                    Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Export:

                    string LISTINGFILENAME = "";
                    if (dal.LISTINGFILENAME + " Listing" == "") LISTINGFILENAME = "Sheet 1";
                    else LISTINGFILENAME = dal.LISTINGFILENAME + " Listing";

                    ListingAndPrint frmlist = new ListingAndPrint
                                                           (ListingAndPrint.FormType.Listing, dal.LISTINGSTARTROW, dal.LISTINGQUERY(),
                                                           LISTINGFILENAME, UserDefinedConnectionString, SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString),
                                                           based.SecurityAccess.RecUserName, LISTINGFILENAME);

                    frmlist.m_Spread.PagerPerPage(50);

                    //## FOR EXPORTING ###
                    Random rnd = new Random();
                    string SessionID = DateTime.Now.ToString("yyyyddMMhhmmss") + rnd.Next(0, 9999).ToString().PadRight(4, '0');
                    HttpContext.Current.Session["Config_" + SessionID] = frmlist.m_Spread.ExportConfig();
                    HttpContext.Current.Session["Data_" + SessionID] = frmlist.m_Spread.GetDataSource();
                    HttpContext.Current.Session["Filename_" + SessionID] = LISTINGFILENAME;
                    HttpContext.Current.Session["Header_" + SessionID] = "0";
                    js.ADD("ExportSessionID='" + SessionID + "'");
                    //## END ##

                    js.Show("#nwExportContainerMain", 0);
                    js.ADD(frmlist.CreateScript());


                    break;
                case eRecordOperation.Print:
                    tempstr = "print";
                    // Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Closing:
                    tempstr = "closing";
                    Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Search:
                    tempstr = "search";
                    //Prompt.Information(tempstr, based.Title);
                    break;
            }

            if (RecordOperationResult != String.Empty)
            {
                if (RecordOperationResult.ToLower().IndexOf("success") >= 0)
                {
                    js.ADD("loc_LookupInquireWithValue('" + WebApp.nwobjectText("txtCode") + "') ");
                    RefreshData();
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i);
                    //Prompt.Information(RecordOperationResult, based.Title);  // customize eme 09302017
                }
                else
                {
                    if (RecordOperationResult.IndexOf("Error") != 0)
                        Prompt.Information(RecordOperationResult, based.Title);
                    else
                        Prompt.Error(RecordOperationResult, based.Title);

                }
            }
        }

        public string get_Initialize()
        {
            string strFinal = "";

            SetBindings();
            Main_Load();

            execute(ref strFinal);

            return js.makeJSPostScript(strFinal);
        }

        public string act_Method(string strMethod, string strParameter, string strValue)
        {
            WebApp = new WebApplib(strParameter, strValue);
            switch (strMethod)
            {
                case "actBindCollection":
                    BindCollection();
                    break;
                case "actBindCollectionEmpty":
                    js.ADD("nwLoading_End('xLoading')");
                    break;
                default:
                    Prompt.Information("act_Method not found: " + strMethod, "Error");
                    break;
            }
            return js.makeJSPostScript(execute());
        }

        public string getToolBoxData(string tableName, string getMethod, string strParameter, string strValue)
        {
            string strFinal = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (getMethod)
            {
                case "toolbox":
                    nwStandardBL standardBL = new nwStandardBL(WebApp);
                    standardBL.PrimaryKey = "Code";
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(), this.UserDefinedConnectionString);

                    //string docstat = string.Empty;

                    //if (HttpContext.Current != null)
                    //{
                    //    var request = HttpContext.Current.Request;
                    //    docstat = request.QueryString["docstat"];
                    //}

                    //if (docstat != null) // portal entry
                    //{
                    //    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.txtDocStatus(docstat), this.UserDefinedConnectionString);
                    //}
                    //else //portal viewing
                    //    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.txtDocStatus(docstat), this.UserDefinedConnectionString);

                    break;
            }

            return strFinal;
        }

        //////////////////////// Common
        private void SetBindings()
        {

            SFObject.SetControlBinding("#idvallugLocAccForms", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "locform");
            SFObject.SetControlBinding("#idvallugReTranUnit", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "reasonfortransunit");
            SFObject.SetControlBinding("#idvallugNewUnit", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "newunit");
            SFObject.SetControlBinding("#descvallugRefHoldTrans", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "refholdtrans");
            SFObject.SetControlBinding("#txtRemarks", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "remarks");
            SFObject.SetControlBinding("#txtDocNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "docnodocno");
            SFObject.SetControlBinding("#txtDocStatus", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "docstatus");
            SFObject.SetControlBinding("#txtDocDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "docdate");
            SFObject.SetControlBinding("#txtReasDis", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "reasonfordisapproval");
            SFObject.SetControlBinding("#txtRemDis", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "remarksfordisapproval");

            //FOOTER
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "recuser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "recDate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "moduser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "modDate");
        }

        private void BindCollection()
        {
            js.ADD("nwLoading_End('xLoading');");
        }

        //private string ValidateDataOnProcess(ref DataTable tmpDt, DataTable apprvlDt) //ValidateDataOnProcess(ref tmpDt=blanktable, dt=conGrid)
        //{
        //    string errorresult = String.Empty;
        //    string finalApprover = string.Empty;
        //    int xrow = 0;

        //    tmpDt = LoadSchema(); //load schema is used as reference



        //    foreach (DataRow row in apprvlDt.Rows) // apprvlDt.Rows = rows of conGrid
        //    {
        //        xrow++;

        //        //var valdeact1 = row[SPR_Deactivate].ToString();

        //        //if (row[SPR_Deactivate].ToString() == "1")
        //        //{
        //        //    row[SPR_Deactivate] = "true";
        //        //    var valdeact1a = row[SPR_Deactivate].ToString();
        //        //}
        //        //else
        //        //{
        //        //    row[SPR_Deactivate] = "false";
        //        //    var valdeact1b = row[SPR_Deactivate].ToString();
        //        //}

        //            if (row[SPR_Deactivate].ToString() == "true")
        //        {
                    

        //            DataRow tmpDr = tmpDt.NewRow();

        //            tmpDr["CustomerCode"] = row[SPR_CustomerCode];
        //            tmpDr["Reason"] = row[SPR_RsnForDeactivation];

        //            var valdeact2 = row[SPR_Deactivate].ToString();
                    


        //            if (row[SPR_Deactivate].ToString() == "true")
        //            {
        //                if (string.IsNullOrEmpty(row[SPR_RsnForDeactivation].ToString()))
        //                    errorresult += "Cannot continue. Reason for Deactivation is required at row [" + xrow + "].\n";

        //                tmpDr["Status"] = 3; //process
        //            }
        //            tmpDt.Rows.Add(tmpDr);
        //        }
        //    }

        //    if (tmpDt.Rows.Count <= 0)
        //        errorresult += "Cannot be continued. No document has been selected.";

        //    return errorresult;
        //}

        private DataTable LoadSchema()
        {
            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadSchema();
            #endregion

            string docstat = "";
            if (HttpContext.Current != null)
            {
                var request = HttpContext.Current.Request;
                docstat = WebApp.nwobjectText("docstat");
            }

            //-------------docno-------------

            string docno = "";
            docno = dal.txtDocNo().ToString();
            if (docno == "0000000000")
                docno = WebApp.nwobjectText("idvallugLocAccForms") + "-TRUNT-0000000001";
            else
                docno = WebApp.nwobjectText("idvallugLocAccForms") + "-TRUNT-" + dal.txtDocNo().ToString();

            //-------------------------------

            DataRow dr = dtHDR.NewRow();
            dr["locform"] = WebApp.nwobjectText("idvallugLocAccForms");
            dr["reasonfortransunit"] = WebApp.nwobjectText("idvallugReTranUnit");
            dr["newunit"] = WebApp.nwobjectText("idvallugNewUnit");
            dr["refholdtrans"] = WebApp.nwobjectText("descvallugRefHoldTrans");
            dr["remarks"] = WebApp.nwobjectText("txtRemarks");
            dr["docno"] = docno;
            dr["docstatus"] = WebApp.nwobjectText("docstat");
            dr["docdate"] = WebApp.nwobjectText("txtDocDate");
            dr["reasonfordisapproval"] = WebApp.nwobjectText("txtReasDis");
            dr["remarksfordisapproval"] = WebApp.nwobjectText("txtRemDis");
            dr["recuser"] = based.SecurityAccess.RecUser;
            //dr["recDate"] = null;
            dr["moduser"] = based.SecurityAccess.RecUser;
            //dr["modDate"] = null;
            dtHDR.Rows.Add(dr);

            #region don't change
            dtHDR.AcceptChanges();
            #endregion
            return dtHDR;
        }

        //private DataTable LoadSchemaLIN()
        //{
        //    string customerList = WebApp.nwobjectText("Customer");
        //    string custClassList = WebApp.nwobjectText("CustomerClassification");

        //    #region don't change
        //    DataTable tmpDtLIN = new DataTable();
        //    tmpDtLIN = dal.LoadSchema(customerList, custClassList);
        //    #endregion

        //    DataSet ds = WebApp.DataSet("conGrid");
        //    DataTable dt = ds.Tables[0];

        //    if (tmpDtLIN.Rows.Count > 0)
        //    {
        //        tmpDtLIN.Rows.Clear();
        //        foreach (DataRow dRow in dt.Rows)
        //        {

        //            if (dRow[SPR_Deactivate].ToString() != string.Empty)
        //            {
        //                DataRow dr = tmpDtLIN.NewRow();
        //                dr["Deactivate"] = dRow[SPR_Deactivate].ToString();
        //                if (dRow[SPR_Deactivate].ToString() == "1")
        //                {
        //                    dr["Deactivate"] = "true";
        //                }
        //                else
        //                    dr["Deactivate"] = "false";

        //                dr["View Details"] = dRow[SPR_Details].ToString();
        //                dr["Reason for Deactivation"] = dRow[SPR_RsnForDeactivation].ToString();
        //                dr["Customer Code"] = dRow[SPR_CustomerCode].ToString();
        //                dr["Customer Name"] = dRow[SPR_CustomerName].ToString();
        //                dr["Customer Classification"] = dRow[SPR_CustomerClass].ToString();
        //                dr["Date Created"] = dRow[SPR_DateCreated].ToString();
        //                dr["Age in Days"] = dRow[SPR_AgeInDays].ToString();
        //                dr["Created By"] = dRow[SPR_CreatedBy].ToString();

        //                tmpDtLIN.Rows.Add(dr);
        //            }
        //        }
        //    }
        //    return tmpDtLIN;
        //}

        private void Main_Load()
        {
            if (based.isInterface == true) dal.UpdateVersion();

            //DataTable getValue = dal.IfExist();
            //bool IfExist = (getValue.Rows.Count > 0 ? true : false);
            //nwToolBox.bindingNavigatorAddNewItem.Visible = !IfExist;
            //nwToolBox.bindingNavigatorSaveItem.Visible = !IfExist;

            Data_Enable();

        }

        public void Data_Enable()
        {
            nwToolBox.bindingNavigatorAddNewItem.Enable = true;
            nwToolBox.bindingNavigatorSaveItem.Enable = false;
            nwToolBox.bindingNavigatorPrintItem.Enable = 
            nwToolBox.bindingNavigatorInquireItem.Enable = false;
            nwToolBox.bindingNavigatorDeleteItem.Visible = false;
            nwToolBox.bindingNavigatorDeleteItem.Enable = true;
            nwToolBox.bindingNavigatorExportItem.Enable = false;

            nwToolBox.bindingNavigatorImportItem.Visible = false;
            nwToolBox.bindingNavigatorProcessItem.Visible = true;
            nwToolBox.bindingNavigatorAddNewItem.Visible = true;
        }


        private void RefreshData()
        {
            //js.ADD("ClearFields();");

            

            js.ADD("RefreshData()");
            js.ADD("nwLoading_End('xLoading');");

        }

        private void LoadGrid(bool isInitialize, DataTable dtSource)
        {
            //string gridID = "Grid";
            string gridID = "conGrid";
            nwGrid grid = new nwGrid(gridID);
            DataTable dt = new DataTable();

            grid.Type = nwGridType.SpreadCanvas;

            grid.varSpreadBook = "nwGridMainCon_Book";
            grid.varSpreadSheet = "nwGridMainCon_Sheet";

            grid.dataSource(dtSource);


            //string customerList = WebApp.nwobjectText("Customer");
            //string custClassList = WebApp.nwobjectText("CustomerClassification");
            if (isInitialize)
            {
                InitializeGrid();
            }
            //else
            //{
            //    dt = dal.GetDataLIN(customerList, custClassList);
            //    if (dt.Rows.Count > 0)
            //        nwToolBox.bindingNavigatorProcessItem.Enable = true;
            //    else
            //        nwToolBox.bindingNavigatorProcessItem.Enable = false;
            //}


            // grid buttons
            //grid.minRow(1);
            //grid.RowHeight(25);
            //grid.TableHeight(350);
            //grid.RowNumber(false);

            //pager 
            //grid.PagerPerPage(20);
            //grid.PagerDataEditable(true);

            //CSS for GRID
            grid.HeaderBorderColor("#DEDEDE");
            grid.rowBackground("#FFFFFF", "#FFFFFF");
            grid.TableBorderColor("#BBB");
            grid.BodyBorderColor("#BBB");
            grid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            grid.HeaderTextColor("#131313");
            grid.HoverColor("#CAE1FF", "inherit");
            grid.SelectedRowHover("#DEDEDE");

            //column width
            //grid.nwobject(SPR_Deactivate).Width(70);
            //grid.nwobject(SPR_Details).Width(70);
            //grid.nwobject(SPR_RsnForDeactivation).Width(150);
            //grid.nwobject(SPR_CustomerName).Width(250);
            //grid.nwobject(SPR_DateCreated).Width(200);
            //grid.nwobject(SPR_CreatedBy).Width(200);

            //// align
            grid.nwobject(SPR_Age).TextAlign("right");

            grid.nwobject(SPR_TransferOfUnit).TextAlign("center");
            grid.nwobject(SPR_TransferOfUnit).TextColor("white");
            grid.nwobject(SPR_TransferOfUnit).BackgroundColor("blue");

            //color for rows
            //for (int i = 0; i < dt.Columns.Count; i++)
            //{
            //    if (i > SPR_RsnForDeactivation)
            //        grid.nwobject(i).BackgroundColor("gainsboro");
            //}

            //template 
            //grid.nwobject(SPR_Deactivate).ObjectType("checkbox");
            //grid.nwobject(SPR_RsnForDeactivation).Input();

            //grid.nwobject(SPR_Deactivate).CheckBox(true);
            //grid.nwobject(SPR_Details).ObjectType("button");

            //grid.nwobject(SPR_Details).Template("<button type='button' class='gridbtn btnDetails'></button>");
            //grid.nwobject(SPR_RsnForDeactivation).Template("<input type='text' class='txtReason' maxlength='80' disabled='disabled'/>");


            //required field
            //grid.nwobject(SPR_Deactivate).HeaderFieldRequired(true);
            //grid.nwobject(SPR_RsnForDeactivation).HeaderFieldRequired(true);

            grid.SetTheme(nwGridTheme.Default);

            //Display Grid
            js.ADD(grid.createTable());
            //js.ADD("CreatedGridDone()"); //for view details column

            //js.makeHTML("#" + gridHTML, grid.createTable());
            //js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            //js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            //js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");

            // enable / disable grid
            //if (enable && dt.Rows.Count > 0)
            //    js.ADD("$('#" + gridHTML + "').enable(true)");
            //else
            //    js.ADD("$('#" + gridHTML + "').enable(false)");
            //js.ADD("$('#" + gridID + "').enable(" + isInitialize.ToString().ToLower() + ")");
        }

        private void ProcessData()
        {
            //DataTable dt = LoadSchemaLIN();
            DataTable tmpDt = new DataTable();

            //string customerList = WebApp.nwobjectText("Customer");
            //string custClassList = WebApp.nwobjectText("CustomerClassification");

            //dt = dal.LoadSchema(customerList, custClassList);

            //RecordOperationResult = ValidateDataOnProcess(ref tmpDt, dt); //nag continue

            if (RecordOperationResult.Length <= 0) //nag continue
            {
                if (tmpDt.Rows.Count > 0) //nag continue
                {
                    int numrow = tmpDt.Rows.Count;
                    RecordOperationResult = dal.ProcessData(tmpDt, based.SecurityAccess.RecUser);
                    Console.WriteLine("numrow: " + numrow);
                    if (RecordOperationResult.ToLower().IndexOf("success") >= 0) //nag continue
                    {
                        LoadGrid(false, GetDataLIN());
                        Prompt.Information("Process Completed.", based.Title);
                    }
                    else
                    {
                        if (RecordOperationResult.IndexOf("Error") != 0) //nag continue
                            Prompt.Information(RecordOperationResult, based.Title);
                        else
                            Prompt.Error(RecordOperationResult, based.Title); //nag continue
                    }
                }
            }
            else
                Prompt.Information(RecordOperationResult, based.Title); //di na umabot dito
        }

        //new

        private DataTable InitializeGrid()
        {
            DataTable dt = new DataTable();

            dt.Columns.Add("Project Code");
            dt.Columns.Add("Project Description");
            dt.Columns.Add("Block/Floor");
            dt.Columns.Add("Lot/Unit/Slot No.");
            dt.Columns.Add("Customer");
            dt.Columns.Add("Holding Date");
            dt.Columns.Add("Holding Expiry Date");
            dt.Columns.Add("Queue No.");
            dt.Columns.Add("Age");
            dt.Columns.Add("Transfer Of Unit");

            return dt;
        }

        private void InitializeValues()
        {
            nwToolBox.bindingNavigatorSaveItem.Enable = true;
            nwToolBox.bindingNavigatorAddNewItem.Enable =
            nwToolBox.bindingNavigatorPrintItem.Enable =
            nwToolBox.bindingNavigatorInquireItem.Enable =
            nwToolBox.bindingNavigatorImportItem.Visible =
            nwToolBox.bindingNavigatorDeleteItem.Visible = false;
            nwToolBox.bindingNavigatorExportItem.Enable = false;

            js.ADD("$(\"#lugLocAccForms\").focus();");
            //LoadGrid(true, InitializeGrid());
        }

        private void LoadComboBox()
        {
            js.makeComboBox("#dplugProject", dal.DiKoAlamSilbiNito());
        }

        private DataTable GetDataLIN()
        {
            DataTable dt = new DataTable();

            string projval = WebApp.nwobjectText("dplugProject");
            //string recuser = based.SecurityAccess.RecUser;

            dt = dal.GetDataLIN(projval);

            //if (dt.Rows.Count > 0)
            //    nwToolBox.bindingNavigatorProcessItem.Enable = true;
            //else
            //    nwToolBox.bindingNavigatorProcessItem.Enable = false;

            return dt;
        }

        private string ValidateData()
        {
            string errorResult = String.Empty;

            if (WebApp.nwobjectText("idvallugLocAccForms").Length <= 0)
            {
                errorResult += "Cannot be saved. Location with Accountable Forms is required.\n";
            }

            if (WebApp.nwobjectText("idvallugReTranUnit").Length <= 0)
            {
                errorResult += "Cannot be saved. Reason for Transfer of Unit is required.\n";
            }

            if (WebApp.nwobjectText("idvallugNewUnit").Length <= 0)
            {
                errorResult += "Cannot be saved. New Unit is required.\n";
            }

            //if (WebApp.nwobjectText("descvallugRefHoldTrans").Length <= 0)
            //{
            //    errorResult += "Cannot be saved. Reference Holding Transaction is required.\n";
            //}

            //if (WebApp.nwobjectText("txtRemarks").Length <= 0)
            //{
            //    errorResult += "Cannot be saved. Remarks is required.\n";
            //}

            //if (WebApp.nwobjectText("txtDocNo").Length <= 0)
            //{
            //    errorResult += "Cannot be saved. Document No. is required.\n";
            //}

            //if (WebApp.nwobjectText("txtDocDate").Length <= 0)
            //{
            //    errorResult += "Cannot be saved. Document Date is required.\n";
            //}

            //if (WebApp.nwobjectText("txtDocStatus").Length <= 0)
            //{
            //    errorResult += "Cannot be saved. Document Status is required.\n";
            //}

            //if (WebApp.nwobjectText("txtReasDis").Length <= 0)
            //{
            //    errorResult += "Cannot be saved. Reason for Disapproval is required.\n";
            //}

            //if (WebApp.nwobjectText("txtRemDis").Length <= 0)
            //{
            //    errorResult += "Cannot be saved. Remarks for Disapproval is required.\n";
            //}
            


            return errorResult;
        }

    }
}