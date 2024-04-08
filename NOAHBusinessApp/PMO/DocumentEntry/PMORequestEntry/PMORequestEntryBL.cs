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
    public class PMORequestEntryBL : nwAction
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
        string ToolboxOrderData = ""; // toolbox Orderby

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
            dal = new PMORequestEntryDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
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
        PMORequestEntryDAL dal;
        int xtotalrecords = 0;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();
        
        public PMORequestEntryBL()
        {
            //dal = new DataAccessLayer(this.UserDefinedConnectionString,""); 
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

            string recuser = based.SecurityAccess.RecUser.ToUpper();

            string strFinal = "";
            string strSQL = "";
            string mouseDownFunc = "";
            string mouseOverFunc = "";
            string strName = "";
            strConn = this.UserDefinedConnectionString;

            switch (strMethod)
            {
                case "gettoolboxInquire":

                    strSQL = dal.inquireQuery(recuser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnSort("Transaction No.", "ASC");
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
            }

            return strFinal;
        }

        /*Standard RecordOperation*/

        public void RecordOperation(eRecordOperation i, int Position)
        {
            string result = "", tempstr = "";
            string recuser = based.SecurityAccess.RecUser.ToUpper();

            switch (i)
            {
                case eRecordOperation.AddNew:
                    nwToolBox.bindingNavigatorSaveItem.Enable = true;
                    nwToolBox.bindingNavigatorAddNewItem.Enable =
                    nwToolBox.bindingNavigatorPrintItem.Enable =
                    nwToolBox.bindingNavigatorInquireItem.Enable =
                    nwToolBox.bindingNavigatorImportItem.Visible =
                    nwToolBox.bindingNavigatorDeleteItem.Enable =
                    nwToolBox.bindingNavigatorExportItem.Enable = false;

                    js.makeValueText("#txtAccNumber", recuser);
                    js.makeValueText("#txtPropDate", SFObjects.GetServerDateTime(this.UserDefinedConnectionString).ToString("MM/dd/yyyy"));
                    js.ADD("cust_GetPara()");
                    loadFromAccNoCMB();
                    break;

                case eRecordOperation.Save:
                    RecordOperationResult = AreValidEntries();

                    if (RecordOperationResult.Length <= 0)
                    {
                        DataTable dt = LoadSchema();
                        RecordOperationResult = dal.SaveData(dt, isNewRow);
                    }
                    else
                        RecordOperationResult = RecordOperationResult.Insert(0, "");


                    Prompt.Information("Saved Successfully", based.Title);
                    break;

                case eRecordOperation.Delete:
                    RecordOperationResult = dal.DeleteData(WebApp.nwobjectText("txtTranNo"), recuser);
                    break;

                case eRecordOperation.Process:
                    RecordOperationResult = AreValidEntries();
                    if (RecordOperationResult == string.Empty)
                    {
                        //RecordOperationResult = dal.Process(WebApp.nwobjectText("txtTranNo"),WebApp.nwobjectText("cmbTranAct"));
                    }

                    Prompt.Information("Process", based.Title);
                    break;

                case eRecordOperation.Refresh:
                    RefreshData();
                    js.ADD("loc_LookupInquireWithValue('" + string.Empty + "') ");
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
                                                           recuser, LISTINGFILENAME);
                    

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
                    js.Hide("#btnnwExportCSV", 0);
                    js.ADD(frmlist.CreateScript());
                    js.ADD("nwLoading_End('xSample')");
                  

                    break;
                case eRecordOperation.Print:
                    tempstr = "print";
                    break;
                case eRecordOperation.Closing:
                    tempstr = "closing";
                    Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Search:
                    tempstr = "search";
                    break;
            }

            if (RecordOperationResult != String.Empty)
            {
                if (RecordOperationResult.IndexOf("Error") == 0 || RecordOperationResult.Contains("Cannot"))
                {
                    RecordOperationResult = RecordOperationResult.Replace("Error [50000]:", "");
                    Prompt.Error(RecordOperationResult, based.Title);
                }
                else
                {
                    RefreshData();
                    js.ADD("loc_LookupInquireWithValue('" + WebApp.nwobjectText("txtCode") + "') ");
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i);
                    Prompt.Information(RecordOperationResult, based.Title);
                }
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
            return js.makeJSPostScript(strFinal);
        }

        public string act_Method(string strMethod, string strParameter, string strValue)
        {
            string strFinal = "", strSQL = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (strMethod)
            {
                case "actBindCollection":
                    BindCollection();
                    break;

                case "actBindCollectionEmpty":
                    js.ADD("nwLoading_End('xSample')");
                    break;

                case "actGetRequests":
                    cmbGetRequests();
                    break;

                case "actHasRqrdCompli":
                    setRqmtCompProp();
                    js.ADD("nwLoading_End('actHasRqrdCompli')");
                    break;

                case "actLoadDefaults":
                    bool viewing = WebApp.nwobjectBool("fromHist");

                    if (viewing == true)
                    {
                        loadSavedTransaction();
                    }
                    else
                    {
                        loadFromAccNoCMB();
                    }
                    break;

                case "actFromAmt":
                    loadFromAmt();
                    js.ADD("nwLoading_End('actFromAmt', crLoadingHTML);");
                    break;

                case "actGetDataDetails":
                    loadFromReqCMB();
                    break;

                case "actLoadBindings":
                    loadDatawtDocno();
                    break;

                case "actSave":
                    RecordOperationResult = AreValidEntries();

                    //To condition isNewRow
                    string tranType = WebApp.nwobjectText("cmbTranAct");
                    string dDocno = WebApp.nwobjectText("txtTranNo");

                    isNewRow = dDocno == "" ? true : false;

                    if (dDocno.Contains(tranType) || dDocno == "")
                    {
                        if (RecordOperationResult.Length <= 0)
                        {
                            DataTable dt = LoadSchema();
                            RecordOperationResult = dal.SaveData(dt, isNewRow);

                            js.ADD("nwLoading_End('actSave', crLoadingHTML);");
                            if (isNewRow)
                            {
                                js.ADD("disableTranTypeSelection();");
                                Prompt.Information(RecordOperationResult, based.Title);
                            }
                            else
                            {
                                js.ADD("showTransactionNo();");
                            }
                        }
                        else
                        {
                            RecordOperationResult = RecordOperationResult.Insert(0, "");
                        }

                        
                    } else {
                        if (RecordOperationResult.Length <= 0)
                        {
                            DataTable dt = LoadSchema();
                            RecordOperationResult = dal.SaveData(dt, true);
                            //DataTable dt = LoadSchema();
                            //RecordOperationResult = dal.UpdateOldTransaction(dt);
                            js.ADD("nwLoading_End('actSave', crLoadingHTML);");
                            js.ADD("showTransactionNo();");
                        }
                        else
                        {
                            RecordOperationResult = RecordOperationResult.Insert(0, "");
                            Prompt.Information(RecordOperationResult, based.Title);
                        }
                    }
                    
                    GetLoadedData(1);
                    break;

                case "actOnlyProcess":
                    RecordOperationResult = AreValidEntries();

                    if (RecordOperationResult.Length <= 0)
                    {
                        DataTable dt = LoadSchema();
                        RecordOperationResult = dal.SaveData(dt, true);
                    }
                    else
                    {
                        RecordOperationResult = RecordOperationResult.Insert(0, "");
                    }

                    string Ptran = WebApp.nwobjectText("cmbTranAct");
                    Ptran = dal.getDocno(Ptran);

                    DataTable dtPSaveOnly = LoadSchema();
                    dal.Process(Ptran);
                    
                    GetLoadedData(2);
                    js.ADD("nwLoading_End('actOnlyProcess', crLoadingHTML);");
                    js.makeValueText("#txtTranNo", Ptran + "");
                    js.ADD("changeButton();");
                    break;

                case "actProcess":
                    tranType = WebApp.nwobjectText("cmbTranAct");
                    dDocno = WebApp.nwobjectText("txtTranNo");
                    RecordOperationResult = AreValidEntries();

                    if (dDocno.Contains(tranType) || dDocno == "")
                    {
                        if (RecordOperationResult == string.Empty)
                        {
                            string pDocno = WebApp.nwobjectText("txtTranNo");
                            RecordOperationResult = dal.Process(pDocno);

                        }
                        GetLoadedData(2);
                        js.ADD("nwLoading_End('actProcess', crLoadingHTML);");
                        js.ADD("changeButton();");
                    }
                    else
                    {
                        DataTable dt = LoadSchema();
                        RecordOperationResult = dal.SaveData(dt, true);

                        if (RecordOperationResult.Contains("Saved"))
                        {
                            string getDocno = dal.getDocno(tranType);
                            RecordOperationResult = dal.Process(getDocno);

                            GetLoadedData(2);
                            js.ADD("nwLoading_End('actProcess', crLoadingHTML);");
                            js.ADD("changeButton();");
                        }
                        else
                        {
                            Prompt.Information(RecordOperationResult, based.Title);
                        }
                    }
                        //RecordOperationResult = AreValidEntries();
                        
                    
                    break;
                case "actCancelRequest":
                    string recuser = based.SecurityAccess.RecUser.ToUpper();
                    string cancelDocno = WebApp.nwobjectText("txtTranNo");
                    string result = dal.DeleteData(cancelDocno, recuser);
                    js.ADD("nwLoading_End('actCancelRequest', crLoadingHTML);");
                    GetLoadedData(2);
                    js.ADD("cancelDone();");
                    break;

                default:
                    Prompt.Information("act_Method not found: " + strMethod, "Error");
                    break;
            }
            return js.makeJSPostScript(execute());
        }

        private void loadSavedTransaction()
        {
            string docno = WebApp.nwobjectText("fromDocno");
            string docStat = "";

            DataTable dtLoad = dal.GetSavedData(docno);
            if (dtLoad.Rows.Count > 0)
            {
                string TranType = dtLoad.Rows[0]["trantype"].ToString();
                string ReqType = dtLoad.Rows[0]["request"].ToString();

                DataTable dtA = dal.getcmbTran();
                js.makeComboBox("#cmbTranAct", dtA);
                
                DataTable dt = dal.getReqsFromType(TranType);
                js.makeComboBox("#cmbRequest", dt);

                string tmpDate = dtLoad.Rows[0]["proposedDate"].ToString();
                string[] tmpSplit = tmpDate.Split(' ');
                DateTime oDate = DateTime.Parse(tmpSplit[0]);

                string formatDate = oDate.ToString("MM/dd/yyyy");

                js.ADD("$('#cmbTranAct').val('" + TranType + "');");
                js.ADD("$('#cmbRequest').val('" + ReqType + "');");

                js.makeValueText("#txtPropDate", formatDate + "");
                js.makeValueText("#txtBasisDesc", dtLoad.Rows[0]["basisForBill"].ToString() + "");
                js.makeValueText("#txtNoConsumption", dtLoad.Rows[0]["noOfConsump"].ToString() + "");
                js.makeValueText("#txtRemarks", dtLoad.Rows[0]["remarks"].ToString() + "");

                loadChargesRates(ReqType);

                js.makeValueText("#txtAccNumber", dtLoad.Rows[0]["accntNo"].ToString().ToUpper() + "");
                js.makeValueText("#txtLocation", dtLoad.Rows[0]["locForm"] + "");
                js.makeValueText("#txtUnitNo", dtLoad.Rows[0]["unitNo"] + "");
                
                js.makeValueText("#txtPropdateDesc", formatDate + "");

                js.makeValueText("#txtBasisBill", dtLoad.Rows[0]["basisForBill"] + "");
                js.makeValueText("#txtConsumptionNo", dtLoad.Rows[0]["noOfConsump"] + "");
                js.makeValueText("#txtAmount", dtLoad.Rows[0]["amt"] + "");
                js.makeValueText("#txtVATAmount", dtLoad.Rows[0]["vatAmt"] + "");
                js.makeValueText("#txtEWTAmount", dtLoad.Rows[0]["ewtAmt"] + "");
                js.makeValueText("#txtNETAmount", dtLoad.Rows[0]["netAmt"] + "");
                js.makeValueText("#txtTranNo", docno);
                js.makeValueText("#txtTranDate", dtLoad.Rows[0]["docdate"] + "");
                js.makeValueText("#txtDateSub", dtLoad.Rows[0]["dateSubmit"] + "");
                js.makeValueText("#txtDatePosted", dtLoad.Rows[0]["postDate"] + "");
                js.makeValueText("#txtDocStatus", getStatusDesc(dtLoad.Rows[0]["statusCode"].ToString()) + "");
                js.makeValueText("#txtDocStatCode", dtLoad.Rows[0]["statusCode"] + "");
                js.makeValueText("#txtDocRemarks", dtLoad.Rows[0]["remarks"] + "");

                string userCancelled = dtLoad.Rows[0]["isCompleted"] + "";

                if (userCancelled == "0" || userCancelled == "")
                {
                    string statDesc = getStatusDesc(dtLoad.Rows[0]["statusCode"].ToString());
                    js.makeValueText("#txtDocStatus", statDesc + "");
                }
                else
                {
                    if (userCancelled == "1")
                    {
                        js.makeValueText("#txtDocStatus", "Completed");
                    }

                    if (userCancelled == "2")
                    {
                        js.makeValueText("#txtDocStatus", "Cancelled");

                    }
                }

                js.ADD("hideOkButton();");

                docStat = dtLoad.Rows[0]["statusCode"].ToString();
            }
            else
            {
                js.makeValueText("#txtAccNumber", "");
                js.makeValueText("#txtLocation", "");
                js.makeValueText("#txtUnitNo", "");
                js.makeValueText("#txtBasisBill", "");
                js.makeValueText("#txtConsumptionNo", "");
                js.makeValueText("#txtAmount", "");
                js.makeValueText("#txtVATAmount", "");
                js.makeValueText("#txtEWTAmount", "");
                js.makeValueText("#txtNETAmount", "");
                js.makeValueText("#txtTranNo", "");
                js.makeValueText("#txtTranDate", "");
                js.makeValueText("#txtDateSub", "");
                js.makeValueText("#txtDatePosted", "");
                js.makeValueText("#txtDocStatus", "");
                js.makeValueText("#txtDocStatCode", "");
                js.makeValueText("#txtDocRemarks", "");
            }

            
            js.ADD("manageTranButtons('" + docStat + "')");
        }

        private void loadChargesRates(string reqType)
        {
            string recuser = based.SecurityAccess.RecUser;
            js.makeValueText("#txtAccNumber", recuser.ToString().ToUpper());

            DataTable dtLoadX = dal.GetDefLoadedX(reqType);

            if (dtLoadX.Rows.Count > 0)
            {
                js.makeValueText("#txtBasisDesc", dtLoadX.Rows[0]["BasisForBilling"] + "");
                js.makeValueText("#txtBasisBill", dtLoadX.Rows[0]["BasisForBilling"] + "");
                js.makeValueText("#txtSQM", dtLoadX.Rows[0]["RegularRate"] + "");
                js.makeValueText("#txtVAT", dtLoadX.Rows[0]["VAT"] + "");
                js.makeValueText("#txtCWT", dtLoadX.Rows[0]["CWT"] + "");
                js.makeValueText("#txtConsump", dtLoadX.Rows[0]["consumption"] + "");
            }
            else
            {
                js.makeValueText("#txtBasisDesc", "");
                js.makeValueText("#txtBasisBill", "");
                js.makeValueText("#txtSQM", "");
                js.makeValueText("#txtVAT", "");
                js.makeValueText("#txtCWT", "");
                js.makeValueText("#txtConsump", "");
            }
        }

        public String getStatusDesc(string status)
        {
            switch (status)
            {
                case "1":
                    return "Saved as Draft";
                case "2":
                    return "For Approval";
                case "3":
                    return "Ongoing";
                case "6":
                    return "Disapproved";
                case "7":
                    return "Declined";
                default:
                    return "";
            }
        }

        public string getToolBoxData(string tableName, string getMethod, string strParameter, string strValue)
        {
            string strFinal = ""; string sql = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (getMethod)
            {
                case "toolbox":
                    string codevalue = WebApp.nwobjectText("codevalue"); // codevalue will be filter of primary key add these filter
                    string Sdocno = dal.getDocno(WebApp.nwobjectText("cmbTranAct"));
                    nwStandardBL standardBL = new nwStandardBL(WebApp);
                    standardBL.PrimaryKey = "docno";
                 
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(Sdocno), this.UserDefinedConnectionString);
                    break;
            }

            return strFinal;
        }

        //////////////////////// Common
        private void SetBindings()
        {
            //getcmbSaved();

            SFObject.SetControlBinding("#txtLocation", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "locForm");
            SFObject.SetControlBinding("#txtAccNumber", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "accntNo");
            SFObject.SetControlBinding("#txtUnitNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "unitNo");
            SFObject.SetControlBinding("#txtPropDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "proposedDate");
            SFObject.SetControlBinding("#txtBasisBill", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "basisForBill");
            SFObject.SetControlBinding("#txtConsumptionNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "noOfConsump");
            SFObject.SetControlBinding("#txtSQM", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "cost");
            SFObject.SetControlBinding("#txtAmount", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "amt");
            SFObject.SetControlBinding("#txtVATAmount", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "vatAmt");
            SFObject.SetControlBinding("#txtEWTAmount", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "ewtAmt");
            SFObject.SetControlBinding("#txtNETAmount", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "netAmt");
            SFObject.SetControlBinding("#txtTranNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "docno");
            SFObject.SetControlBinding("#txtTranDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "docdate");
            SFObject.SetControlBinding("#txtDateSub", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "dateSubmit");
            SFObject.SetControlBinding("#txtDatePosted", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "postDate");
            SFObject.SetControlBinding("#txtRemarks", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "remarks");
            SFObject.SetControlBinding("#txtDocStatus", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "statusDesc");
            SFObject.SetControlBinding("#txtStatusCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "statusCode");
            SFObject.SetControlBinding("#txtRsnDisapprove", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "rsnDisapprv");
            SFObject.SetControlBinding("#txtRemarksDisapprove", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "disapprvRemarks");
           
            //FOOTER
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "recUser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "recDate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "modUser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "modDate");
        }

        //////////////// end of standard / standard custumize

        private void BindCollection()
        {
            setRqmtCompProp();
            js.ADD("RefreshData();");
            string docno = WebApp.nwobjectText("txtTranNo");
            DataTable dtA = dal.getcmbTran();
            DataTable dtB = dal.getcmbReq();
            js.makeComboBox("#cmbTranAct", dtA);
            js.makeValueText("#cmbTranAct", dal.getTrantypeForBind(docno));
            js.ADD("nwLoading_End('xSample');");
        }

        private string AreValidEntries()
        {
            string errorResult = String.Empty;

            if (WebApp.nwobjectText("cmbTranAct").Length <= 0)
            {
                errorResult += "Cannot be saved. Transaction/Type of Activity is required.\n";
            }

            if (WebApp.nwobjectText("txtLocation").Length <= 0)
            {
                errorResult += "Cannot be saved. Location is required.\n";
            }

            if (WebApp.nwobjectText("cmbRequest").Length <= 0)
            {
                errorResult += "Cannot be saved. Request is required.\n";
            }
            
            return errorResult;
        }
        
        private DataTable LoadSchema()
        {
            string recuser = based.SecurityAccess.RecUser.ToUpper();
            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadSchema();
            #endregion

            DataRow dr = dtHDR.NewRow();
            dr["trantype"] = WebApp.nwobjectText("cmbTranAct");
            dr["accntNo"] = recuser;
            dr["request"] = WebApp.nwobjectText("cmbRequest");
            dr["locForm"] = WebApp.nwobjectText("txtLocation");
            dr["unitNo"] = WebApp.nwobjectText("txtUnitNo");
            dr["proposedDate"] = WebApp.nwobjectDate("txtPropDate").Equals("") ? (object)DBNull.Value : WebApp.nwobjectDate("txtPropDate");
            dr["basisForBill"] = WebApp.nwobjectText("txtBasisBill");
            dr["noOfConsump"] = WebApp.nwobjectText("txtConsumptionNo");
            dr["cost"] = WebApp.nwobjectText("txtSQM");
            dr["amt"] = WebApp.nwobjectText("txtAmount");
            dr["vatAmt"] = WebApp.nwobjectText("txtVATAmount");
            dr["ewtAmt"] = WebApp.nwobjectText("txtEWTAmount");
            dr["netAmt"] = WebApp.nwobjectText("txtNETAmount");
            dr["docno"] = WebApp.nwobjectText("txtTranNo");
            dr["docdate"] = WebApp.nwobjectDate("txtTranDate").Equals("") ? (object)DBNull.Value : WebApp.nwobjectDate("txtTranDate");
            dr["remarks"] = WebApp.nwobjectText("txtRemarks");
            dr["status"] = WebApp.nwobjectInt("txtDocStatCode");

            dr["recuser"] = recuser;
            dr["moduser"] = recuser;
            dtHDR.Rows.Add(dr);

            #region don't change
            dtHDR.AcceptChanges();
            #endregion

            return dtHDR;
        }

        public void Data_Enable()
        {
            nwToolBox.bindingNavigatorAddNewItem.Enable =
            nwToolBox.bindingNavigatorSaveItem.Enable =
            nwToolBox.bindingNavigatorPrintItem.Enable =
            nwToolBox.bindingNavigatorInquireItem.Enable =
            nwToolBox.bindingNavigatorDeleteItem.Enable =
            nwToolBox.bindingNavigatorExportItem.Enable = true;

            nwToolBox.bindingNavigatorImportItem.Visible =
            nwToolBox.bindingNavigatorProcessItem.Visible = false;
        }

        private void Main_Load()
        {
            string recuser = based.SecurityAccess.RecUser.ToUpper();

            if (based.isInterface == true) dal.UpdateVersion();
            
            DataTable dtA = dal.getcmbTran();
            js.makeComboBox("#cmbTranAct", dtA);
            js.makeValueText("#txtAccNumber", recuser);
        }

        private void RefreshData()
        {
            js.ADD("ClearFields();");
            js.ADD("func_Toolbox_Clear();");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\");"); // goto: getToolBoxData

        }

        private void loadDatawtDocno()
        {
            string tranNo = WebApp.nwobjectText("txtDocno");
            dal.GetData(tranNo);
        }

        private void GetLoadedData(int button) {
            DataTable dtLoadX = new DataTable();
            //string docno = WebApp.nwobjectText("txtTranNo");

            string savedTranType = WebApp.nwobjectText("cmbTranAct");
            string getDocno = dal.getDocno(savedTranType);

            dtLoadX = dal.GetLoadedData(getDocno);

            string tmpDate = dtLoadX.Rows[0]["proposedDate"].ToString();
            string[] tmpSplit = tmpDate.Split(' ');
            DateTime oDate = DateTime.Parse(tmpSplit[0]);

            string formatDate = oDate.ToString("MM/dd/yyyy");

            js.makeValueText("#txtAccNumber", dtLoadX.Rows[0]["accntNo"].ToString().ToUpper() + "");
            js.makeValueText("#txtLocation", dtLoadX.Rows[0]["locForm"] + "");
            js.makeValueText("#txtUnitNo", dtLoadX.Rows[0]["unitNo"] + "");

            js.makeValueText("#txtPropdateDesc", formatDate + "");

            js.makeValueText("#txtBasisBill", dtLoadX.Rows[0]["basisForBill"] + "");
            js.makeValueText("#txtConsumptionNo", dtLoadX.Rows[0]["noOfConsump"] + "");
            js.makeValueText("#txtAmount", dtLoadX.Rows[0]["amt"] + "");
            js.makeValueText("#txtVATAmount", dtLoadX.Rows[0]["vatAmt"] + "");
            js.makeValueText("#txtEWTAmount", dtLoadX.Rows[0]["ewtAmt"] + "");
            js.makeValueText("#txtNETAmount", dtLoadX.Rows[0]["netAmt"] + "");
            js.makeValueText("#txtTranNo", getDocno);
            js.makeValueText("#txtTranDate", dtLoadX.Rows[0]["docdate"] + "");
            js.makeValueText("#txtDateSub", dtLoadX.Rows[0]["dateSubmit"] + "");
            js.makeValueText("#txtDatePosted", dtLoadX.Rows[0]["postDate"] + "");
            js.makeValueText("#txtDocStatCode", dtLoadX.Rows[0]["statusCode"] + "");
            js.makeValueText("#txtDocRemarks", dtLoadX.Rows[0]["remarks"] + "");

            string userCancelled = dtLoadX.Rows[0]["isCompleted"] + "";

            if (userCancelled == "0" || userCancelled == "")
            {
                string statDesc = getStatusDesc(dtLoadX.Rows[0]["statusCode"].ToString());
                js.makeValueText("#txtDocStatus", statDesc + "");
            }
            else
            {
                if (userCancelled == "1")
                {
                    js.makeValueText("#txtDocStatus", "Completed");
                }

                if (userCancelled == "2")
                {
                    js.makeValueText("#txtDocStatus", "Cancelled");

                }
            }

            //if (button == 1)
            //{
            //    dtLoadX = dal.GetLoadedData(docno);

            //    js.makeValueText("#txtTranNo", dtLoadX.Rows[0]["docno"] + "");
            //    js.makeValueText("#txtDocStatus", dtLoadX.Rows[0]["statusDesc"] + "");
            //    js.makeValueText("#txtDocStatCode", dtLoadX.Rows[0]["statusCode"] + "");
            //}

            //else if (button == 2)
            //{
            //    dtLoadX = dal.GetLoadedData(docno);

            //    js.makeValueText("#txtTranNo", dtLoadX.Rows[0]["docno"] + "");
            //    js.makeValueText("#txtDocStatus", dtLoadX.Rows[0]["statusDesc"] + "");
            //    js.makeValueText("#txtDocStatCode", dtLoadX.Rows[0]["statusCode"] + "");
            //    js.makeValueText("#txtTranDate", dtLoadX.Rows[0]["docdate"] + "");
            //    js.makeValueText("#txtDateSub", dtLoadX.Rows[0]["dateSubmit"] + "");
            //    js.makeValueText("#txtDatePosted", dtLoadX.Rows[0]["postDate"] + "");
            //}
        }

        private void loadFromAccNoCMB() {
            string recuser = based.SecurityAccess.RecUser;

            js.makeValueText("#txtAccNumber", recuser.ToString().ToUpper());

            DataTable dtLoad = dal.GetDefLoaded(recuser);
            if (dtLoad.Rows.Count > 0)
            {
                js.makeValueText("#txtLocation", dtLoad.Rows[0]["LocForm"] + "");
                js.makeValueText("#txtUnitNo", dtLoad.Rows[0]["UnitCode"] + "");
            }
            else
            {
                js.makeValueText("#txtLocation", "");
                js.makeValueText("#txtUnitNo", "");
            }
        }

        private void cmbGetRequests()
        {
            string TranType = WebApp.nwobjectText("cmbTranSelected");
            DataTable dt = dal.getReqsFromType(TranType);
            js.makeComboBox("#cmbRequest", dt);
            js.ADD("$('#cmbRequest').val('');");
        }

        private void loadFromReqCMB()
        {
            string recuser = based.SecurityAccess.RecUser;
             js.makeValueText("#txtAccNumber", recuser.ToString().ToUpper());

            DataTable dtLoadX = dal.GetDefLoadedX(WebApp.nwobjectText("cmbReq"));

            if (dtLoadX.Rows.Count > 0)
            {
                js.makeValueText("#txtBasisDesc", dtLoadX.Rows[0]["BasisForBilling"] + "");
                js.makeValueText("#txtBasisBill", dtLoadX.Rows[0]["BasisForBilling"] + "");
                js.makeValueText("#txtSQM", dtLoadX.Rows[0]["RegularRate"] + "");
                js.makeValueText("#txtVAT", dtLoadX.Rows[0]["VAT"] + "");
                js.makeValueText("#txtCWT", dtLoadX.Rows[0]["CWT"] + "");
                js.makeValueText("#txtConsump", dtLoadX.Rows[0]["consumption"] + "");

                js.ADD("LoadfromReq()");
                js.ADD("compAMT()");
            }
            else
            {
                js.makeValueText("#txtBasisDesc", "");
                js.makeValueText("#txtBasisBill", "");
                js.makeValueText("#txtSQM", "");
                js.makeValueText("#txtVAT", "");
                js.makeValueText("#txtCWT", "");
                js.makeValueText("#txtConsump", "");
            }

           js.ADD("LoadfromReq()");
        }

        private void loadFromAmt()
        {
            string valAmt = WebApp.nwobjectText("amt");
            string valVat = WebApp.nwobjectText("vat");
            string valCwt = WebApp.nwobjectText("cwt");

            DataTable dtAmt = dal.GetFromAmt(valAmt, valVat, valCwt);
            if (dtAmt.Rows.Count > 0)
            {
                string txtVATAmount = dtAmt.Rows[0]["VATamt"].ToString();
                string txtEWTAmount = dtAmt.Rows[0]["EWTamt"].ToString();
                string txtNETAmount = dtAmt.Rows[0]["NETamt"].ToString();

                js.makeValueText("#txtVATAmount", txtVATAmount + "");
                js.makeValueText("#txtEWTAmount", txtEWTAmount + "");
                js.makeValueText("#txtNETAmount", txtNETAmount + "");
            }
            else
            {
                js.makeValueText("#txtVATAmount", "");
                js.makeValueText("#txtEWTAmount", "");
                js.makeValueText("#txtNETAmount", "");
            }
        }

        private void setRqmtCompProp()
        {
            if (dal.hasSavedRqrdCompli(WebApp.nwobjectText("txtTranNo")) == "True")
            {
                js.ADD("$('#btnReqCompliance').removeClass('btnGray');");
                js.ADD("$('#btnReqCompliance').removeClass('btnOrange');");
                js.ADD("$('#btnReqCompliance').addClass('btnGreen');");
            }
            else
            {
                js.ADD("$('#btnReqCompliance').removeClass('btnGray');");
                js.ADD("$('#btnReqCompliance').removeClass('btnGreen');");
                js.ADD("$('#btnReqCompliance').addClass('btnOrange');");
            }
        }

    }
}