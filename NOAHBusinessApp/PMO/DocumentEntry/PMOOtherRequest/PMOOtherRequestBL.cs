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
using Newtonsoft.Json;

namespace Noah_Web.forms_BusinessLayer
{
    public class PMOOtherRequestBL : nwAction
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

        /* Gate Pass */
        private static int GPIndex = 0,
        SPR_Quantity = ++GPIndex,
        SPR_UOM = ++GPIndex,
        SPR_Item = ++GPIndex,
        SPR_Remarks = ++GPIndex;

        private static int WorkerIndex = 0,
        SPR_Name = ++WorkerIndex,
        SPR_Company = ++WorkerIndex,
        SPR_Designation = ++WorkerIndex;

        private static int MaterialIndex = 0,
        SPR_MQuantity = ++MaterialIndex,
        SPR_MUom = ++MaterialIndex,
        SPR_MDescription = ++MaterialIndex;

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
            dal = new PMOOtherRequestDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
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
        PMOOtherRequestDAL dal;
        int xtotalrecords = 0;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();
        
        public PMOOtherRequestBL()
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

            string strFinal = "";
            string strSQL = "";
            string mouseDownFunc = "";
            string mouseOverFunc = "";
            string strName = "";
            strConn = this.UserDefinedConnectionString;

            switch (strMethod)
            {
                case "gettoolboxInquire":
                    string recuser = based.SecurityAccess.RecUser;
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

                    string recuser = based.SecurityAccess.RecUser;

                    js.makeValueText("#txtAccNo", recuser.ToString().ToUpper());
                    js.makeValueText("#txtPropDate", SFObjects.GetServerDateTime(this.UserDefinedConnectionString).ToString("MM/dd/yyyy"));
                    js.ADD("cust_GetPara()");
                    loadFromAccNoCMB();
                    break;

                case eRecordOperation.Save:

                    DataSet tempDTAddOns = WebApp.DataSet("nwGridAddOn");
                    DataTable dtAddOns = new DataTable();
                    try
                    {
                        dtAddOns = tempDTAddOns.Tables[0];
                    }
                    catch { }

                    RecordOperationResult = AreValidEntries();

                    if (RecordOperationResult.Length <= 0)
                    {
                        DataTable dt = LoadSchema();
                        DataTable dtLIN = GatePassLIN();
                        RecordOperationResult = dal.SaveData(dt, dtLIN, isNewRow);
                    }
                    else
                        RecordOperationResult = RecordOperationResult.Insert(0, "");


                    Prompt.Information("save", based.Title);
                    break;

                case eRecordOperation.Delete:
                    recuser = based.SecurityAccess.RecUser;
                    RecordOperationResult = dal.DeleteData(WebApp.nwobjectText("txtTranNo"), recuser);
                    break;

                case eRecordOperation.Process:
                    RecordOperationResult = AreValidEntries();
                    if (RecordOperationResult == string.Empty)
                    {
                        RecordOperationResult = dal.Process(WebApp.nwobjectText("txtTranNo"), WebApp.nwobjectText("cmbTranAct"));
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

                    recuser = based.SecurityAccess.RecUser;

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
                    
                case "actHasRqrdCompli":
                    setRqmtCompProp();
                    js.ADD("nwLoading_End('actHasRqrdCompli')");
                    break;

                case "load_defaults":
                    loadFromAccNoCMB();
                    break;

                case "actLoadGatePassGrid":
                    //DataTable dt = LoadSchema();
                    DataTable dtLIN = GatePassLIN();
                    break;

                case "load_fromAmt":
               
                    break;

                case "actGetDataDetails":

                    break;

                case "loadBindings":
                    //loadDatawtDocno();
                    break;

                case "actShowGridGatePass":
                    string Code = WebApp.nwobjectText("txtTranNo");
                    if (Code == "")
                    {
                        GenerateGatePassGrid(false);
                    } else
                    {
                        GenerateGatePassGrid(true);
                    }

                    js.ADD("nwLoading_End('actShowGridGatePass');");
                    break;

                case "actShowGridWorkPermit":
                    string tranNo = WebApp.nwobjectText("txtTranNo");
                    if (tranNo == "")
                    {
                        GenerateWorkPermitGrid(false);
                    }
                    else
                    {
                        GenerateWorkPermitGrid(true);
                    }

                    js.ADD("nwLoading_End('actShowGridWorkPermit');");
                    break;

                case "actShowGridWorkPermit2":
                     tranNo = WebApp.nwobjectText("txtTranNo");
                    if (tranNo == "")
                    {
                        GenerateWorkPermitGrid2(false);
                    }
                    else
                    {
                        GenerateWorkPermitGrid2(true);
                    }

                    js.ADD("nwLoading_End('actShowGridWorkPermit2');");
                    break;

                case "actOnLoading":
                    bool fromHist = WebApp.nwobjectBool("fromHist");
                    string fromDocno = WebApp.nwobjectText("fromDocno");
                    string tranType = WebApp.nwobjectText("tranType");

                    if (fromHist == true)
                    {
                        string tranStatus = dal.GetTranStatus(fromDocno);

                        if (tranType == "WRKPMT")
                        {
                            string userCancelled = dal.GetTranStatus(fromDocno);

                            if (tranStatus == "1")
                            {
                                showWorkPermitDetails(fromDocno);
                            }
                            else
                            {
                                updateSummaryFields(fromDocno);
                                js.ADD("goToSummary();");
                                js.ADD("$('#savedColumn').removeClass('nwHide');");
                                js.ADD("setViewingOnly();");
                            }
                        }
                        else
                        {
                            

                            if (tranStatus == "1")
                            {
                                showTranDetails(fromDocno);
                            }
                            else
                            {
                                updateSummaryFields(fromDocno);
                                js.ADD("goToSummary();");
                                js.ADD("$('#savedColumn').removeClass('nwHide');");
                                js.ADD("setViewingOnly();");
                            } 
                        }
                    }
                    else
                    {
                        string recuser = based.SecurityAccess.RecUser;

                        DataTable dr2 = dal.GetUserName(recuser);

                        string tmpRegName = dr2.Rows[0]["Registered Name"].ToString().ToLower();
                        string TCaseName = System.Threading.Thread.CurrentThread.CurrentCulture.TextInfo.ToTitleCase(tmpRegName);

                        DataTable dtUnit = dal.GetUnitData(recuser);
                        js.makeValueText("#txtWPUnitNo", dtUnit.Rows[0]["UnitCode"] + "");
                        js.makeValueText("#txtUnitFloor", dtUnit.Rows[0]["Flr"] + "");

                        js.makeValueText("#requestedBy", TCaseName + "");
                        js.makeValueText("#txtResidentName", TCaseName + "");

                        js.makeValueText("#txtAccNo", recuser.ToString().ToUpper());
                        //js.makeValueText("#txtPropDate", SFObjects.GetServerDateTime(this.UserDefinedConnectionString).ToString("MM/dd/yyyy"));
                        js.ADD("cust_GetPara()");
                        loadFromAccNoCMB();
                    }
                    break;

                case "saveBtn_func":
                    bool newRecord = WebApp.nwobjectText("txtTranNo") == "" ? true : false;
                    string saveType = WebApp.nwobjectText("cmbTranAct");
                    string actionType = WebApp.nwobjectText("ActionType");
                    string docno = WebApp.nwobjectText("txtTranNo");

                    RecordOperationResult = AreValidEntries();

                    if(docno.Contains(saveType) || docno == "")
                    {
                        if (saveType == "WRKPMT")
                        {
                            if (RecordOperationResult.Length <= 0)
                            {
                                DataTable dtOtherReqs = LoadSchema();
                                DataTable dtWorkPermit = LoadSchemaWorkPermit();
                                DataTable dtWorkers = WorkersLIN();
                                DataTable dtMats = ToolsMatsLIN();
                                RecordOperationResult = dal.SaveWorkPermitData(dtOtherReqs, dtWorkPermit, dtWorkers, dtMats, newRecord);
                            }
                            else
                                RecordOperationResult = RecordOperationResult.Insert(0, "");
                        }
                        else
                        {
                            if (RecordOperationResult.Length <= 0)
                            {
                                DataTable dt = LoadSchema();
                                DataTable dtLINSave = GatePassLIN();
                                RecordOperationResult = dal.SaveData(dt, dtLINSave, newRecord);
                            }
                            else
                                RecordOperationResult = RecordOperationResult.Insert(0, "");
                        }
                    }
                    else
                    {
                        if (saveType == "WRKPMT")
                        {
                            if (RecordOperationResult.Length <= 0)
                            {
                                DataTable dtOtherReqs = LoadSchema();
                                DataTable dtWorkPermit = LoadSchemaWorkPermit();
                                DataTable dtWorkers = WorkersLIN();
                                DataTable dtMats = ToolsMatsLIN();
                                RecordOperationResult = dal.SaveWorkPermitData(dtOtherReqs, dtWorkPermit, dtWorkers, dtMats, true);
                            }
                            else
                                RecordOperationResult = RecordOperationResult.Insert(0, "");
                        }
                        else
                        {
                            if (RecordOperationResult.Length <= 0)
                            {
                                DataTable dt = LoadSchema();
                                DataTable dtLINSave = GatePassLIN();
                                RecordOperationResult = dal.SaveData(dt, dtLINSave, true);
                            }
                            else
                                RecordOperationResult = RecordOperationResult.Insert(0, "");
                        }
                    }
                    

                    if (RecordOperationResult.Contains("saved"))
                    {
                        string[] tmpResult = RecordOperationResult.Split('|');
                        RecordOperationResult = tmpResult[0];

                        if (actionType == "SAVE")
                        {
                            updateSummaryFields(tmpResult[1].ToString());

                            if (newRecord)
                            {
                                js.ADD("disableTranTypeSelection();");
                                Prompt.Information(RecordOperationResult, based.Title);
                            }
                            else
                            {
                                js.ADD("showTransactionNo();");
                            }
                            js.ADD("nwLoading_End('saveBtn_func', crLoadingHTML);");
                        }
                        else
                        {
                            RecordOperationResult = dal.Process(tmpResult[1], saveType);

                            if (RecordOperationResult.Contains("Saved"))
                            {
                                updateSummaryFields(tmpResult[1].ToString());
                                //string[] procResult = RecordOperationResult.Split('|');
                                //RecordOperationResult = procResult[0];

                                //js.makeValueText("#txtTranNo", procResult[1] + "");
                                //js.makeValueText("#txtTranDate", procResult[2] + "");
                                //js.makeValueText("#txtDateSub", procResult[3] + "");
                                //js.makeValueText("#txtDatePosted", procResult[4] + "");
                                //js.makeValueText("#txtDocStatus", procResult[5] + "");
                                //js.makeValueText("#txtDocStatusDesc", getStatusDesc(procResult[5]));
                                js.ADD("nwLoading_End('saveBtn_func', crLoadingHTML);");
                                js.ADD("disableTranTypeSelection();");
                                js.ADD("changeButton();");
                            }
                            else
                            {
                                Prompt.Information(RecordOperationResult, based.Title);
                            }
                        }
                    }
                    else
                    {
                        Prompt.Information(RecordOperationResult, based.Title);
                    }
                    break;

                case "checkWPGrids":
                    CheckWPGrids();
                    break;

                case "checkGatePassGrid":
                    CheckGatePassGrid();
                    break;

                case "actCancelTransaction":
                    CancelTransaction();
                    break;

                default:
                    Prompt.Information("act_Method not found: " + strMethod, "Error");
                    break;
            }
            return js.makeJSPostScript(execute());
        }

        private void CancelTransaction()
        {
            string docno = WebApp.nwobjectText("txtTranNo");
            string recuser = based.SecurityAccess.RecUser;

            string result = dal.CancelTransaction(docno, recuser);
            updateSummaryFields(docno);

            js.ADD($"CancelDone('{result}');");
        }

        private void updateSummaryFields(string docno)
        {
            DataTable dt = dal.GetRequestData(docno);
            DataTable dtWP = dal.GetWorkPermitData(docno);

            DataTable dtA = dal.getcmbTran();
            js.makeComboBox("#cmbTranAct", dtA);

            string tranType = dt.Rows[0]["trantype"].ToString();
            js.ADD("$('#cmbTranAct').val('" + tranType + "');");

            //Details Left
            js.makeValueText("#txtAccNo", dt.Rows[0]["accntNo"] + "");
            js.makeValueText("#txtLocation", dt.Rows[0]["locForm"] + "");
            js.makeValueText("#txtUnitNo", dt.Rows[0]["unitNo"] + "");

            string tranDesc = dal.GetTranDesc(dt.Rows[0]["trantype"].ToString());
            js.makeValueText("#txtTranType", tranDesc + "");


            if (tranType == "REQGAP") {
                js.makeValueText("#txtPropDate", getFormattedDate(dt.Rows[0]["deliveryDateGP"].ToString()) + "");
            }
            if (tranType == "REQMOI")
            {
                js.makeValueText("#txtPropDate", getFormattedDate(dt.Rows[0]["moveInDateMI"].ToString()) + "");
            }
            if (tranType == "REQMOO")
            {
                js.makeValueText("#txtPropDate", getFormattedDate(dt.Rows[0]["moveOutDateMO"].ToString()) + "");
            }

            if (tranType == "WRKPMT")
            {
                if (dtWP.Rows.Count > 0)
                {
                    js.makeValueText("#txtPropDate", getFormattedDate(dtWP.Rows[0]["schedStartDate"].ToString()) + "");
                }
            }

            //Details Right
            js.makeValueText("#txtTranNo", dt.Rows[0]["docno"] + "");
            js.makeValueText("#txtTranDate", dt.Rows[0]["recDate"] + "");
            js.makeValueText("#txtDateSub", dt.Rows[0]["dateSubmit"] + "");
            js.makeValueText("#txtDatePosted", dt.Rows[0]["postDate"] + "");

            string userCancelled = dt.Rows[0]["isCompleted"] + "";

            if (userCancelled == "0" || userCancelled == "")
            {
                string statDesc = getStatusDesc(dt.Rows[0]["status"].ToString());
                js.makeValueText("#txtDocStatusDesc", statDesc + "");
            }
            else
            {
                if (userCancelled == "1")
                {
                    js.makeValueText("#txtDocStatusDesc", "Completed");
                }

                if (userCancelled == "2")
                {
                    js.makeValueText("#txtDocStatusDesc", "Cancelled");

                }
            }
            
            js.makeValueText("#txtDocStatus", dt.Rows[0]["status"] + "");
        }

        private void showTranDetails(string docno)
        {
            string recuser = based.SecurityAccess.RecUser;
            DataTable dt = dal.GetRequestData(docno);

            DataTable dtA = dal.getcmbTran();
            js.makeComboBox("#cmbTranAct", dtA);

            DataTable dtB = dal.getcmbDeliver();
            js.makeComboBox("#cmbDelivery", dtB);

            DataTable dtC = dal.getUnitType();
            js.makeComboBox("#cmbUnitType", dtC);

            js.ADD("$('#cmbTranAct').val('" + dt.Rows[0]["trantype"].ToString() + "');");

            //Gate Pass
            js.makeValueText("#cmbDelivery", dt.Rows[0]["deliveryGP"] + ""); //COMBO
            js.makeValueText("#txtDeliveryDate", getFormattedDate(dt.Rows[0]["deliveryDateGP"].ToString())+ ""); //Format Date
            js.makeValueText("#txtDeliveryTime", dt.Rows[0]["deliveryTimeGP"] + "");
            js.makeValueText("#txtCarrier", dt.Rows[0]["carrierGP"] + "");

            js.ADD("$('#cmbDelivery').val('" + dt.Rows[0]["deliveryGP"].ToString() + "');");

            //Move In
            js.makeValueText("#txtTenantName", dt.Rows[0]["tenantMI"] + "");
            js.makeValueText("#txtMoveIndate", getFormattedDate(dt.Rows[0]["moveInDateMI"].ToString()) + "");
            //js.makeValueText("#cmbUnitType", dt.Rows[0]["unitTypeMI"] + ""); //COMBO

            js.ADD("$('#cmbUnitType').val('" + dt.Rows[0]["unitTypeMI"].ToString() + "');");

            //Requirements
            js.ADD($"$('#chkAccount').prop('checked', {getBooleanFromDBVal(dt.Rows[0]["payAccMI"].ToString())});");
            js.ADD($"$('#chkCopyOfLease').prop('checked', {getBooleanFromDBVal(dt.Rows[0]["notarCopyMI"].ToString())});");
            js.ADD($"$('#chkResidentInfo').prop('checked', {getBooleanFromDBVal(dt.Rows[0]["residentInfoMI"].ToString())});");
            js.ADD($"$('#chkOrientation').prop('checked', {getBooleanFromDBVal(dt.Rows[0]["houseRulesMI"].ToString())});");
            js.ADD($"$('#chkInformation').prop('checked', {getBooleanFromDBVal(dt.Rows[0]["updatedInfoMI"].ToString())});");
            js.ADD($"$('#chkEnsureFire').prop('checked', {getBooleanFromDBVal(dt.Rows[0]["fireExtinMI"].ToString())});");
            js.ADD($"$('#chkSprinkler').prop('checked', {getBooleanFromDBVal(dt.Rows[0]["sprinklerMI"].ToString())});");
            js.ADD($"$('#chkPhoto').prop('checked', {getBooleanFromDBVal(dt.Rows[0]["tenantIDMI"].ToString())});");
            
            //Tenant Auth Sign
            js.ADD($"$('#chkWorkPer').prop('checked', {getBooleanFromDBVal(dt.Rows[0]["workPermitMI"].ToString())});");
            js.ADD($"$('#chkAmenitiesRoom').prop('checked', {getBooleanFromDBVal(dt.Rows[0]["amenitiesMI"].ToString())});");
            js.ADD($"$('#chkConcernSlip').prop('checked', {getBooleanFromDBVal(dt.Rows[0]["concernSlipMI"].ToString())});");
            js.ADD($"$('#chkGatePass').prop('checked', {getBooleanFromDBVal(dt.Rows[0]["gatePassIncMI"].ToString())});");
            
            //Charge to Tenant
            js.ADD($"$('#chkAssoc').prop('checked', {getBooleanFromDBVal(dt.Rows[0]["assocDuesMI"].ToString())});");
            js.ADD($"$('#chkPark').prop('checked', {getBooleanFromDBVal(dt.Rows[0]["parkingDuesMI"].ToString())});");
            js.ADD($"$('#chkWater').prop('checked', {getBooleanFromDBVal(dt.Rows[0]["waterMI"].ToString())});");
            js.ADD($"$('#chkElec').prop('checked', {getBooleanFromDBVal(dt.Rows[0]["electMI"].ToString())});");
            js.ADD($"$('#chkAmen').prop('checked', {getBooleanFromDBVal(dt.Rows[0]["amenMI"].ToString())});");
            js.ADD($"$('#chkViol').prop('checked', {getBooleanFromDBVal(dt.Rows[0]["violationMI"].ToString())});");

            //Move Out
            js.makeValueText("#txtTenantFullName", dt.Rows[0]["tenantMO"] + "");
            js.makeValueText("#txtMoveOutDate", getFormattedDate(dt.Rows[0]["moveOutDateMO"].ToString()) + ""); //Format Date

            //Summary
            js.makeValueText("#txtAccNo", dt.Rows[0]["accntNo"] + "");
            js.makeValueText("#txtLocation", dt.Rows[0]["locForm"] + "");
            js.makeValueText("#txtUnitNo", dt.Rows[0]["unitNo"] + "");
            js.makeValueText("#txtTranType", dt.Rows[0]["trantype"] + "");
            js.makeValueText("#txtPropDate", getFormattedDate(dt.Rows[0]["docdate"].ToString()) + "");

            //Details Right
            js.makeValueText("#txtTranNo", dt.Rows[0]["docno"] + "");
            js.makeValueText("#txtTranDate", dt.Rows[0]["recDate"] + "");
            js.makeValueText("#txtDateSub", dt.Rows[0]["dateSubmit"] + "");
            js.makeValueText("#txtDatePosted", dt.Rows[0]["postDate"] + "");

            string statDesc = getStatusDesc(dt.Rows[0]["status"].ToString());
            js.makeValueText("#txtDocStatusDesc", statDesc + "");
            js.makeValueText("#txtDocStatus", dt.Rows[0]["status"] + "");

            //GenerateGPfromHist(true, docno);
            js.ADD("viewFromHistDone();");
        }

        private void showWorkPermitDetails(string docno)
        {
            string recuser = based.SecurityAccess.RecUser;
            DataTable dt = dal.GetRequestData(docno);
            DataTable WPTable = dal.GetWorkPermitData(docno);

            DataTable dtA = dal.getcmbTran();
            js.makeComboBox("#cmbTranAct", dtA);

            DataTable dtB = dal.getNatureWork();
            js.makeComboBox("#cmbNatWork", dtB);

            DataTable dtUnit = dal.GetUnitData(recuser);

            js.ADD("$('#cmbTranAct').val('" + dt.Rows[0]["trantype"].ToString() + "');");

            //USER DETAILS
            js.makeValueText("#txtResidentName", WPTable.Rows[0]["residentName"] + "");

            js.makeValueText("#txtWPUnitNo", dtUnit.Rows[0]["UnitCode"] + "");
            js.makeValueText("#txtUnitFloor", dtUnit.Rows[0]["Flr"] + "");

            js.makeValueText("#txtPersonInCharge", WPTable.Rows[0]["personInCharge"] + "");
            js.makeValueText("#txtTelNumber", WPTable.Rows[0]["telNumber"] + "");

            // NATURE OF WORK
            string natWork = WPTable.Rows[0]["natWork"].ToString();
            js.ADD("$('#cmbNatWork').val('" + natWork + "');");
            js.makeValueText("#natOthersDesc", WPTable.Rows[0]["natOthersDesc"] + "");

            if (natWork == "999")
            {
                js.ADD("$('#natOthersDesc').removeClass('nwHide');");
            }

            //WORK SCHED
            js.makeValueText("#schedStartDate", getFormattedDate(WPTable.Rows[0]["schedStartDate"].ToString()) + "");
            js.makeValueText("#schedEndDate", getFormattedDate(WPTable.Rows[0]["schedEndDate"].ToString()) + "");

            js.makeValueText("#schedStartTime", WPTable.Rows[0]["schedStartTime"] + "");
            js.makeValueText("#schedEndTime", WPTable.Rows[0]["schedEndTime"] + "");
            js.makeValueText("#schedWorkDesc", WPTable.Rows[0]["schedWorkDesc"] + "");
            

            //TAC
            js.makeValueText("#requestedBy", WPTable.Rows[0]["requestedBy"] + "");
            js.makeValueText("#endorsedBy", WPTable.Rows[0]["endorsedBy"] + "");
            js.makeValueText("#notedBy", WPTable.Rows[0]["notedBy"] + "");
            js.makeValueText("#approvedBy", WPTable.Rows[0]["approvedBy"] + "");

            //Summary
            js.makeValueText("#txtAccNo", dt.Rows[0]["accntNo"] + "");
            js.makeValueText("#txtLocation", dt.Rows[0]["locForm"] + "");
            js.makeValueText("#txtUnitNo", dt.Rows[0]["unitNo"] + "");
            js.makeValueText("#txtTranType", dt.Rows[0]["trantype"] + "");
            js.makeValueText("#txtPropDate", getFormattedDate(dt.Rows[0]["docdate"].ToString()) + "");

            //Details Right
            js.makeValueText("#txtTranNo", dt.Rows[0]["docno"] + "");
            js.makeValueText("#txtTranDate", dt.Rows[0]["recDate"] + "");
            js.makeValueText("#txtDateSub", dt.Rows[0]["dateSubmit"] + "");
            js.makeValueText("#txtDatePosted", dt.Rows[0]["postDate"] + "");

            string statDesc = getStatusDesc(dt.Rows[0]["status"].ToString());
            js.makeValueText("#txtDocStatusDesc", statDesc + "");
            js.makeValueText("#txtDocStatus", dt.Rows[0]["status"] + "");

            //GenerateGPfromHist(true, docno);
            
            //js.ADD("showWPGrids();");
            js.ADD("viewFromHistDone();");
        }

        private String getFormattedDate(string docdate)
        {
            string tmpDate = docdate;
            string[] tmpSplit = tmpDate.Split(' ');
            DateTime oDate = DateTime.Parse(tmpSplit[0]);

            string formatDate = oDate.ToString("MM/dd/yyyy");
            return formatDate;
        }

        private int getBooleanFromDBVal(string val)
        {
            if (val == "True")
            {
                return 1;
            } else
            {
                return 0;
            }
        }

        private void CheckGatePassGrid()
        {
            DataSet dsGatePass = WebApp.DataSet("nwGridAddOn");
            DataTable dtGatePass = new DataTable();
            try
            {
                dtGatePass = dsGatePass.Tables[0];
            }
            catch { }

            int gateCtr = 0;
            if (dtGatePass.Rows.Count > 0)
            {
                foreach (DataRow dr_details in dtGatePass.Rows)
                {
                    if (dr_details[SPR_Name - 1].ToString() != string.Empty && dr_details[SPR_Company - 1].ToString() != string.Empty && dr_details[SPR_Designation - 1].ToString() != string.Empty && dr_details[SPR_UOM - 1].ToString() != string.Empty)
                    {
                        gateCtr += 1;
                    }
                }
            }

            bool gridGatePass = gateCtr > 0 ? true : false;

            js.ADD("gatePassGridOk('" + gridGatePass + "')");

        }

        private void CheckWPGrids()
        {
            DataSet dsWorkers = WebApp.DataSet("nwGridWorkers");
            DataTable dtWorkers = new DataTable();
            try
            {
                dtWorkers = dsWorkers.Tables[0];
            }
            catch { }


            DataSet dsMats = WebApp.DataSet("nwGridMaterials");
            DataTable dtMats = new DataTable();
            try
            {
                dtMats = dsMats.Tables[0];
            }
            catch { }

            int workerCtr = 0, matsCtr = 0;
            if(dtWorkers.Rows.Count > 0)
            {
                foreach (DataRow dr_details in dtWorkers.Rows)
                {
                    if (dr_details[SPR_Name - 1].ToString() != string.Empty && dr_details[SPR_Company - 1].ToString() != string.Empty && dr_details[SPR_Designation - 1].ToString() != string.Empty)
                    {
                        workerCtr += 1;
                    }
                }
            }

            if (dtMats.Rows.Count > 0)
            {
                foreach (DataRow dr_details in dtMats.Rows)
                {
                    if (dr_details[SPR_MQuantity - 1].ToString() != string.Empty && dr_details[SPR_MDescription - 1].ToString() != string.Empty && dr_details[SPR_MUom - 1].ToString() != string.Empty)
                    {
                        matsCtr += 1;
                    }
                }
            }

            bool gridWorkers = workerCtr > 0 ? true : false;
            bool gridMats = matsCtr > 0 ? true : false;

            js.ADD("workPermitOk('" + gridWorkers + "', '" + gridMats + "')");
            
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
                   
                    nwStandardBL standardBL = new nwStandardBL(WebApp);
                    standardBL.PrimaryKey = "docno";
                 
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(codevalue), this.UserDefinedConnectionString);
                    //strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", sql, based.SecurityAccess.ConnectionString);
                    break;
            }

            return strFinal;
        }

        //////////////////////// Common
        private void SetBindings()
        {
            //getcmbSaved();

            SFObject.SetControlBinding("#txtLocation", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "locForm");
            SFObject.SetControlBinding("#txtAccNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "accntNo");
            SFObject.SetControlBinding("#txtUnitNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "unitNo");

            SFObject.SetControlBinding("#txtDeliveryDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "deliveryDateGP");
            SFObject.SetControlBinding("#txtDeliveryTime", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "deliveryTimeGP");
            SFObject.SetControlBinding("#txtCarrier", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "carrierGP");

            SFObject.SetControlBinding("#txtTenantName", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "tenantMI");
            SFObject.SetControlBinding("#txtMoveIndate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "moveInDateMI");
            SFObject.SetControlBinding("#chkAccount", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "payAccMI");
            SFObject.SetControlBinding("#chkCopyOfLease", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "notarCopyMI");
            SFObject.SetControlBinding("#chkResidentInfo", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "residentInfoMI");
            SFObject.SetControlBinding("#chkOrientation", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "houseRulesMI");
            SFObject.SetControlBinding("#chkInformation", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "updatedInfoMI");
            SFObject.SetControlBinding("#chkEnsureFire", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "fireExtinMI");
            SFObject.SetControlBinding("#chkSprinkler", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "sprinklerMI");
            SFObject.SetControlBinding("#chkPhoto", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "tenantIDMI");
            SFObject.SetControlBinding("#chkWorkPer", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "workPermitMI");
            SFObject.SetControlBinding("#chkAmenitiesRoom", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "amenitiesMI");
            SFObject.SetControlBinding("#chkConcernSlip", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "concernSlipMI");
            SFObject.SetControlBinding("#chkGatePass", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "gatePassIncMI");
            SFObject.SetControlBinding("#chkAssoc", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "assocDuesMI");
            SFObject.SetControlBinding("#chkPark", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "parkingDuesMI");
            SFObject.SetControlBinding("#chkWater", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "waterMI");
            SFObject.SetControlBinding("#chkElec", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "electMI");
            SFObject.SetControlBinding("#chkAmen", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "amenMI");
            SFObject.SetControlBinding("#chkViol", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "violationMI");

            SFObject.SetControlBinding("#txtTenantFullName", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "tenantMO");
            SFObject.SetControlBinding("#txtMoveOutDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "moveOutDateMO");

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

            
            js.ADD("RefreshData();");
            string docno = WebApp.nwobjectText("txtTranNo");
            DataTable dtA = dal.getcmbTran();
            js.makeComboBox("#cmbTranAct", dtA);
            js.makeValueText("#cmbTranAct", dal.getTrantypeForBind(docno));

            //if (dal.getTrantypeForBind(docno) == "REQGAP")
            //{
            //    js.ADD(" $('#settingstabsBut-1').click()");
            //} else if (dal.getTrantypeForBind(docno) == "REQMOI")
            //{
            //    js.ADD(" $('#settingstabsBut-2').click()");
            //} else
            //{
            //    js.ADD(" $('#settingstabsBut-3').click()");
            //}

                js.ADD("nwLoading_End('xSample');");

            GenerateGatePassGrid(true);
            setRqmtCompProp();
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

            //if (WebApp.nwobjectText("cmbRequest").Length <= 0)
            //{
            //    errorResult += "Cannot be saved. Request is required.\n";
            //}
            
            return errorResult;
        }
        
        private DataTable LoadSchema()
        {
            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadSchema();
            #endregion

            DataRow dr = dtHDR.NewRow();
            dr["trantype"] = WebApp.nwobjectText("cmbTranAct");
            dr["accntNo"] = WebApp.nwobjectText("txtAccNo");
            dr["locForm"] = WebApp.nwobjectText("txtLocation");
            dr["unitNo"] = WebApp.nwobjectText("txtUnitNo");
            dr["deliveryGP"] = WebApp.nwobjectText("cmbDelivery");
            dr["deliveryDateGP"] = WebApp.nwobjectDate("txtDeliveryDate").Equals("") ? (object)DBNull.Value : WebApp.nwobjectDate("txtDeliveryDate");
            dr["deliveryTimeGP"] = WebApp.nwobjectText("txtDeliveryTime");
            dr["carrierGP"] = WebApp.nwobjectText("txtCarrier");
            dr["tenantMI"] = WebApp.nwobjectText("txtTenantName");
            dr["moveInDateMI"] = WebApp.nwobjectDate("txtMoveIndate").Equals("") ? (object)DBNull.Value : WebApp.nwobjectDate("txtMoveIndate");
            dr["unitTypeMI"] = WebApp.nwobjectText("cmbUnitType");
            dr["payAccMI"] = WebApp.nwobjectText("chkAccount");
            dr["notarCopyMI"] = WebApp.nwobjectText("chkCopyOfLease");
            dr["residentInfoMI"] = WebApp.nwobjectText("chkResidentInfo");
            dr["houseRulesMI"] = WebApp.nwobjectText("chkOrientation");
            dr["updatedInfoMI"] = WebApp.nwobjectText("chkInformation");
            dr["fireExtinMI"] = WebApp.nwobjectText("chkEnsureFire");
            dr["sprinklerMI"] = WebApp.nwobjectText("chkSprinkler");
            dr["tenantIDMI"] = WebApp.nwobjectText("chkPhoto");
            dr["assocDuesMI"] = WebApp.nwobjectText("chkAssoc");
            dr["parkingDuesMI"] = WebApp.nwobjectText("chkPark");
            dr["waterMI"] = WebApp.nwobjectText("chkWater");
            dr["electMI"] = WebApp.nwobjectText("chkElec");
            dr["amenMI"] = WebApp.nwobjectText("chkAmen");
            dr["violationMI"] = WebApp.nwobjectText("chkViol");
            dr["workPermitMI"] = WebApp.nwobjectText("chkWorkPer");
            dr["amenitiesMI"] = WebApp.nwobjectText("chkAmenitiesRoom");
            dr["concernSlipMI"] = WebApp.nwobjectText("chkConcernSlip");
            dr["gatePassIncMI"] = WebApp.nwobjectText("chkGatePass");
            dr["tenantMO"] = WebApp.nwobjectText("txtTenantFullName");
            dr["moveOutDateMO"] = WebApp.nwobjectDate("txtMoveOutDate").Equals("") ? (object)DBNull.Value : WebApp.nwobjectDate("txtMoveOutDate");
            dr["docno"] = WebApp.nwobjectText("txtTranNo");
            dr["docdate"] = WebApp.nwobjectDate("txtTranDate").Equals("") ? (object)DBNull.Value : WebApp.nwobjectDate("txtTranDate");
            dr["remarks"] = WebApp.nwobjectText("txtRemarks");
            dr["status"] = WebApp.nwobjectInt("txtDocStatus");

            string recuser = based.SecurityAccess.RecUser;

            dr["recuser"] = recuser;
            dr["moduser"] = recuser;
            dtHDR.Rows.Add(dr);

            #region don't change
            dtHDR.AcceptChanges();
            #endregion

            return dtHDR;
        }

        private DataTable LoadSchemaWorkPermit()
        {
            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadSchemaWP();
            #endregion

            DataRow dr = dtHDR.NewRow();
            dr["docno"] = WebApp.nwobjectText("txtTranNo");
            dr["residentName"] = WebApp.nwobjectText("txtResidentName");
            dr["unitNo"] = WebApp.nwobjectText("txtWPUnitNo");
            dr["unitFloor"] = WebApp.nwobjectText("txtUnitFloor");
            dr["personInCharge"] = WebApp.nwobjectText("txtPersonInCharge");
            dr["telNumber"] = WebApp.nwobjectText("txtTelNumber");
            //dr["permitDate"] = WebApp.nwobjectText("dpPermitDate");

            dr["natWork"] = WebApp.nwobjectText("natureWork");
            dr["natOthersDesc"] = WebApp.nwobjectText("natOthersDesc");

            dr["schedStartDate"] = WebApp.nwobjectText("schedStartDate");
            dr["schedEndDate"] = WebApp.nwobjectText("schedEndDate");
            dr["schedStartTime"] = WebApp.nwobjectText("schedStartTime");
            dr["schedEndTime"] = WebApp.nwobjectText("schedEndTime");
            dr["schedWorkDesc"] = WebApp.nwobjectText("schedWorkDesc");
            
            dr["requestedBy"] = WebApp.nwobjectText("requestedBy");
            dr["endorsedBy"] = WebApp.nwobjectText("endorsedBy");
            dr["notedBy"] = WebApp.nwobjectText("notedBy");
            dr["approvedBy"] = WebApp.nwobjectText("approvedBy");

            dtHDR.Rows.Add(dr);

            #region don't change
            dtHDR.AcceptChanges();
            #endregion

            return dtHDR;
        }


        private DataTable GatePassLIN()
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.GatePassLIN();
            #endregion

            //DataTable dt = SpreadJSONToDataTable(WebApp.nwobjectText("nwGridAddOnCon"));
            DataSet ds = WebApp.DataSet("nwGridAddOn");
            DataTable dt = new DataTable();
            try
            {
                dt = ds.Tables[0];
            }
            catch { }
            int i = 1;
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow dr_details in dt.Rows)
                {
                    if (dr_details[SPR_Item - 1].ToString() != string.Empty)
                    {
                        DataRow dr = dtLIN.NewRow();
                        dr["Quantity"] = Parser.ParseDouble(dr_details[SPR_Quantity - 1].ToString());
                        dr["UnitOfMeasurement"] = dr_details[SPR_UOM - 1].ToString();
                        dr["Item"] = dr_details[SPR_Item - 1].ToString();
                        dr["Remarks"] = dr_details[SPR_Remarks - 1].ToString();
                        dr["RowNum"] = i;

                        dtLIN.Rows.Add(dr);
                        dtLIN.AcceptChanges();
                        i++;
                    }
                }
            }
            return dtLIN;
        }

        private DataTable WorkersLIN()
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.LoadSchemaWorkers();
            #endregion

            //DataTable dt = SpreadJSONToDataTable(WebApp.nwobjectText("nwGridAddOnCon"));
            DataSet ds = WebApp.DataSet("nwGridWorkers");
            DataTable dt = new DataTable();
            try
            {
                dt = ds.Tables[0];
            }
            catch { }
            int i = 1;
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow dr_details in dt.Rows)
                {
                    if (dr_details[SPR_Name - 1].ToString() != string.Empty)
                    {
                        DataRow dr = dtLIN.NewRow();
                        dr["Name"] = dr_details[SPR_Name - 1].ToString();
                        dr["Company"] = dr_details[SPR_Company - 1].ToString();
                        dr["Designation"] = dr_details[SPR_Designation - 1].ToString();
                        dr["rowNum"] = i;

                        dtLIN.Rows.Add(dr);
                        dtLIN.AcceptChanges();
                        i++;
                    }
                }
            }
            return dtLIN;
        }

        private DataTable ToolsMatsLIN()
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.LoadSchemaToolsMats();
            #endregion

            //DataTable dt = SpreadJSONToDataTable(WebApp.nwobjectText("nwGridAddOnCon"));
            DataSet ds = WebApp.DataSet("nwGridMaterials");
            DataTable dt = new DataTable();
            try
            {
                dt = ds.Tables[0];
            }
            catch { }
            int i = 1;
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow dr_details in dt.Rows)
                {
                    if (dr_details[SPR_MQuantity - 1].ToString() != string.Empty)
                    {
                        DataRow dr = dtLIN.NewRow();
                        dr["Quantity"] = dr_details[SPR_MQuantity - 1].ToString();
                        dr["UnitOfMeasurement"] = dr_details[SPR_MUom - 1].ToString();
                        dr["Description"] = dr_details[SPR_MDescription - 1].ToString();
                        dr["rowNum"] = i;

                        dtLIN.Rows.Add(dr);
                        dtLIN.AcceptChanges();
                        i++;
                    }
                }
            }
            return dtLIN;
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

            string recuser = based.SecurityAccess.RecUser;

            if (based.isInterface == true) dal.UpdateVersion();
            
            DataTable dtA = dal.getcmbTran();
            js.makeComboBox("#cmbTranAct", dtA);
            js.makeValueText("#txtAccNo", recuser.ToString().ToUpper());

            DataTable dtB = dal.getcmbDeliver();
            js.makeComboBox("#cmbDelivery", dtB);

            DataTable dtC = dal.getUnitType();
            js.makeComboBox("#cmbUnitType", dtC);

            DataTable dtD = dal.getNatureWork();
            js.makeComboBox("#cmbNatWork", dtD);
        }

        private void RefreshData()
        {
            js.ADD("ClearFields();");
            js.ADD("func_Toolbox_Clear();");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\");"); // goto: getToolBoxData

        }
        private void loadFromAccNoCMB()
        {
            string recuser = based.SecurityAccess.RecUser;
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

        public void GenerateGatePassGrid(bool isIntialize)
        {
            string Code = WebApp.nwobjectText("txtTranNo");
            CreateGridGatePass(Code, isIntialize);
        }

        public void GenerateGPfromHist(bool isIntialize, string docno)
        {
            CreateGridGatePass(docno, isIntialize);
        }

        public void GenerateWorkPermitGrid(bool isInitialize)
        {
            string Code = WebApp.nwobjectText("txtTranNo");
            string tranType = WebApp.nwobjectText("tranType");

            bool newTranSave = Code.Contains(tranType) ? isInitialize : false;

            CreateGridWorkers(Code, newTranSave);
        }
        public void GenerateWorkPermitGrid2(bool isInitialize)
        {
            string Code = WebApp.nwobjectText("txtTranNo");
            string tranType = WebApp.nwobjectText("tranType");

            bool newTranSave = Code.Contains(tranType) ? isInitialize : false;

            CreateGridMaterials(Code, newTranSave);
        }

        public void CreateGridGatePass(string Code, bool isInitialize)
        {
            string gridID = "nwGridAddOn";
            nwGrid nwGridCon = new nwGrid(gridID);
            DataTable dt = new DataTable();
            nwGridCon.Type = nwGridType.SpreadCanvas;
            //dt = dal.getDetails(WebApp.nwobjectText("txtID"));

            int rowCnt = 4;

            int colCnt = SPR_Remarks;
            nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            nwGridCon.minRow(1);
            nwGridCon.TableHeight(300);
            nwGridCon.RowHeight(20);

            nwGridCon.buttonDelete = true;
            nwGridCon.buttonInsert = true;

            #region Column Title
            nwGridCon.nwobject(SPR_Quantity - 1).ColumnName("Quantity");
            nwGridCon.nwobject(SPR_UOM - 1).ColumnName("Unit of Measurement");
            nwGridCon.nwobject(SPR_Item - 1).ColumnName("Item");
            nwGridCon.nwobject(SPR_Remarks - 1).ColumnName("Remarks");

            #endregion
            nwGridCon.BodyFontFamily = "Century Gothic";
            nwGridCon.HeaderFontFamily = "Century Gothic";

            #region Column Width
            // nwGridCon.nwobject(SPR_Addon_AddonItemCode - 1).Width(0);

            nwGridCon.nwobject(SPR_Quantity - 1).Width(250);
            nwGridCon.nwobject(SPR_UOM - 1).Width(250);
            nwGridCon.nwobject(SPR_Item - 1).Width(175);
            nwGridCon.nwobject(SPR_Remarks - 1).Width(275);
            #endregion

            #region Column Color

            //nwGridCon.nwobject(SPR_Addon_AddonItemCode - 1).BackgroundColor("cyan");
            //nwGridCon.nwobject(SPR_Addon_AddonItemDesc - 1).BackgroundColor("cyan");
            //nwGridCon.nwobject(SPR_Addon_Qty - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Addon_UOMCode - 1).BackgroundColor("gainsboro");

            //nwGridCon.nwobject(SPR_Addon_ItemGroupTypeDesc - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Addon_UOM - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Addon_Qty - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_PricePerUnitUOM - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_PriceVatIn - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_PriceVatEx - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_DiscountRate - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_DiscountAmount - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Addon_NetAddonPriceVatIn - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_NetAddonPriceVatEx - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Addon_CrossRefCode - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_Quantity - 1).TextAlign("Right");
            #endregion

            #region Column Templates


            //nwGridCon.nwobject(SPR_Addon_AddonItemCode - 1).LookUp("lugAddOnItems", true);
            //nwGridCon.nwobject(SPR_Addon_AddonItemCode - 1).Enabled(true);
            nwGridCon.nwobject(SPR_Quantity - 1).Template("<input value='{" + (SPR_Quantity - 1) + "}' class='txt_SPR_Addon_Qty isNumber numC' maxlength='12'/>");
            nwGridCon.nwobject(SPR_Quantity - 1).Enabled(true);
            nwGridCon.nwobject(SPR_Quantity - 1).Template("<input value='{" + (SPR_UOM - 1) + "}' class='txt_SPR_UOM isNumber numC' maxlength='12'/>");
            nwGridCon.nwobject(SPR_UOM - 1).Enabled(true);
            nwGridCon.nwobject(SPR_Item - 1).Template("<input value='{" + (SPR_Item - 1) + "}' class='txt_SPR_Addon_AddonItemDesc' maxlength='80'/>");
            nwGridCon.nwobject(SPR_Item - 1).Enabled(true);
            nwGridCon.nwobject(SPR_Remarks - 1).Template("<input value='{" + (SPR_Remarks - 1) + "}' class='txt_SPR_Addon_Remarks' maxlength='120'/>");
            nwGridCon.nwobject(SPR_Remarks - 1).Enabled(true);

            //nwGridCon.nwobject(SPR_Addon_PricePerUnitUOM - 1).Template("<input value='{" + (SPR_Addon_PricePerUnitUOM - 1) + "}' class='txt_SPR_Addon_PricePerUnitUOM isNumber numC' style='text-align:right;'/>");
            //nwGridCon.nwobject(SPR_Addon_PriceVatIn - 1).Template("<input value='{" + (SPR_Addon_PriceVatIn - 1) + "}' class='txtSPR_Addon_PriceVatIn isNumber numC' style='text-align:right;'/>");
            //nwGridCon.nwobject(SPR_Addon_PriceVatEx - 1).Template("<input value='{" + (SPR_Addon_PriceVatEx - 1) + "}' class='txtSPR_Addon_PriceVatEx isNumber numC' style='text-align:right;'/>");
            //nwGridCon.nwobject(SPR_Addon_NetAddonPriceVatIn - 1).Template("<input value='{" + (SPR_Addon_NetAddonPriceVatIn - 1) + "}' class='txt_SPR_Addon_NetAddonPriceVatIn isNumber numC' style='text-align:right;' maxlength=18  nwdp='2'/>");
            //nwGridCon.nwobject(SPR_Addon_NetAddonPriceVatEx - 1).Template("<input value='{" + (SPR_Addon_NetAddonPriceVatEx - 1) + "}' class='txt_SPR_Addon_NetAddonPriceVatEx isNumber numC' style='text-align:right;' maxlength=18  nwdp='2'/>");
            //nwGridCon.nwobject(SPR_Addon_DiscountRate - 1).Template("<input value='{" + (SPR_Addon_DiscountRate - 1) + "}' class='txt_SPR_Addon_DiscountRate isNumber numC' style='text-align:right;' maxlength=2  nwdp='2'/>");
            //nwGridCon.nwobject(SPR_Addon_DiscountAmount - 1).Template("<input value='{" + (SPR_Addon_DiscountAmount - 1) + "}' class='txt_SPR_Addon_DiscountAmount isNumber numC' style='text-align:right;' nwdp='2' disabled/>");
            //nwGridCon.nwobject(SPR_Addon_PriceVatIn - 1).TextAlign("right");

            #endregion

            #region Column Button
            #endregion

            if (isInitialize)
            {
                dt = dal.GetAddonTab(Code);
                nwGridCon.CreateExcelGrid(dt.Rows.Count, colCnt);
                nwGridCon.dataSource(dt);
                nwGridCon.maxRow(dt.Rows.Count + 1);
            }
            else
            {
                nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            }

            //## THEME FORMAT
            nwGridCon.HeaderBorderColor("#DEDEDE");
            nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            nwGridCon.TableBorderColor("#BBB");
            nwGridCon.BodyBorderColor("#BBB");
            nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGridCon.HeaderTextColor("#131313");



            nwGridCon.varSpreadBook = "nwGridMainCon_Book_AddOns";
            nwGridCon.varSpreadSheet = "nwGridMainCon_Sheet_AddOns";
            js.ADD(nwGridCon.createTable());
            js.ADD("CreatedGridDone()");
        }

        public void CreateGridWorkers(string Code, bool isInitialize)
        {
            string gridID = "nwGridWorkers";
            nwGrid nwGridCon = new nwGrid(gridID);
            DataTable dt = new DataTable();
            nwGridCon.Type = nwGridType.SpreadCanvas;
            //dt = dal.getDetails(WebApp.nwobjectText("txtID"));

            int rowCnt = 3;

            int colCnt = SPR_Designation;
            nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            nwGridCon.minRow(1);
            nwGridCon.TableHeight(300);
            nwGridCon.RowHeight(20);

            nwGridCon.buttonDelete = true;
            nwGridCon.buttonInsert = true;

            #region Column Title
            nwGridCon.nwobject(SPR_Name - 1).ColumnName("Name");
            nwGridCon.nwobject(SPR_Company - 1).ColumnName("Company");
            nwGridCon.nwobject(SPR_Designation - 1).ColumnName("Designation");

            #endregion
            nwGridCon.BodyFontFamily = "Century Gothic";
            nwGridCon.HeaderFontFamily = "Century Gothic";

            #region Column Width
            // nwGridCon.nwobject(SPR_Addon_AddonItemCode - 1).Width(0);


            nwGridCon.nwobject(SPR_Name - 1).Width(175);
            nwGridCon.nwobject(SPR_Company - 1).Width(250);
            nwGridCon.nwobject(SPR_Designation - 1).Width(275);
            #endregion

            #region Column Color

            //nwGridCon.nwobject(SPR_Addon_AddonItemCode - 1).BackgroundColor("cyan");
            //nwGridCon.nwobject(SPR_Addon_AddonItemDesc - 1).BackgroundColor("cyan");
            //nwGridCon.nwobject(SPR_Addon_Qty - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Addon_UOMCode - 1).BackgroundColor("gainsboro");

            //nwGridCon.nwobject(SPR_Addon_ItemGroupTypeDesc - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Addon_UOM - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Addon_Qty - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_PricePerUnitUOM - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_PriceVatIn - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_PriceVatEx - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_DiscountRate - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_DiscountAmount - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Addon_NetAddonPriceVatIn - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_NetAddonPriceVatEx - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Addon_CrossRefCode - 1).BackgroundColor("gainsboro");
            #endregion

            #region Column Templates



            //nwGridCon.nwobject(SPR_Addon_AddonItemCode - 1).LookUp("lugAddOnItems", true);
            //nwGridCon.nwobject(SPR_Addon_AddonItemCode - 1).Enabled(true);
            nwGridCon.nwobject(SPR_Name - 1).Template("<input value='{" + (SPR_Name - 1) + "}' class='txt_SPR_Addon_AddonItemDesc' maxlength='80'/>");
            nwGridCon.nwobject(SPR_Name - 1).Enabled(true);
            nwGridCon.nwobject(SPR_Company - 1).Template("<input value='{" + (SPR_Company - 1) + "}' class='txt_SPR_Addon_Remarks' maxlength='80'/>");
            nwGridCon.nwobject(SPR_Company - 1).Enabled(true);
            nwGridCon.nwobject(SPR_Designation - 1).Template("<input value='{" + (SPR_Designation - 1) + "}' class='txt_SPR_Addon_Remarks' maxlength='80'/>");
            nwGridCon.nwobject(SPR_Designation - 1).Enabled(true);
            //nwGridCon.nwobject(SPR_Addon_PricePerUnitUOM - 1).Template("<input value='{" + (SPR_Addon_PricePerUnitUOM - 1) + "}' class='txt_SPR_Addon_PricePerUnitUOM isNumber numC' style='text-align:right;'/>");
            //nwGridCon.nwobject(SPR_Addon_PriceVatIn - 1).Template("<input value='{" + (SPR_Addon_PriceVatIn - 1) + "}' class='txtSPR_Addon_PriceVatIn isNumber numC' style='text-align:right;'/>");
            //nwGridCon.nwobject(SPR_Addon_PriceVatEx - 1).Template("<input value='{" + (SPR_Addon_PriceVatEx - 1) + "}' class='txtSPR_Addon_PriceVatEx isNumber numC' style='text-align:right;'/>");
            //nwGridCon.nwobject(SPR_Addon_NetAddonPriceVatIn - 1).Template("<input value='{" + (SPR_Addon_NetAddonPriceVatIn - 1) + "}' class='txt_SPR_Addon_NetAddonPriceVatIn isNumber numC' style='text-align:right;' maxlength=18  nwdp='2'/>");
            //nwGridCon.nwobject(SPR_Addon_NetAddonPriceVatEx - 1).Template("<input value='{" + (SPR_Addon_NetAddonPriceVatEx - 1) + "}' class='txt_SPR_Addon_NetAddonPriceVatEx isNumber numC' style='text-align:right;' maxlength=18  nwdp='2'/>");
            //nwGridCon.nwobject(SPR_Addon_DiscountRate - 1).Template("<input value='{" + (SPR_Addon_DiscountRate - 1) + "}' class='txt_SPR_Addon_DiscountRate isNumber numC' style='text-align:right;' maxlength=2  nwdp='2'/>");
            //nwGridCon.nwobject(SPR_Addon_DiscountAmount - 1).Template("<input value='{" + (SPR_Addon_DiscountAmount - 1) + "}' class='txt_SPR_Addon_DiscountAmount isNumber numC' style='text-align:right;' nwdp='2' disabled/>");
            //nwGridCon.nwobject(SPR_Addon_PriceVatIn - 1).TextAlign("right");

            #endregion

            #region Column Button
            #endregion

            if (isInitialize)
            {
                dt = dal.GetWorkersLin(Code);
               // nwGridCon.CreateExcelGrid(dt.Rows.Count, colCnt);
                nwGridCon.dataSource(dt);
                nwGridCon.maxRow(dt.Rows.Count + 1);

                /////LoadQuery(dt, nwGridCon);
            }
            else
            {
                nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            }

            //## THEME FORMAT
            nwGridCon.HeaderBorderColor("#DEDEDE");
            nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            nwGridCon.TableBorderColor("#BBB");
            nwGridCon.BodyBorderColor("#BBB");
            nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGridCon.HeaderTextColor("#131313");



            nwGridCon.varSpreadBook = "nwGridMainCon_Book_Workers";
            nwGridCon.varSpreadSheet = "nwGridMainCon_Sheet_Workers";
            js.ADD(nwGridCon.createTable());
            js.ADD("CreatedGridDone()");
        }

        public void CreateGridMaterials(string Code, bool isInitialize)
        {
            string gridID = "nwGridMaterials";
            nwGrid nwGridCon = new nwGrid(gridID);
            DataTable dt = new DataTable();
            nwGridCon.Type = nwGridType.SpreadCanvas;
            //dt = dal.getDetails(WebApp.nwobjectText("txtID"));

            int rowCnt = 3;

            int colCnt = SPR_MDescription;
            nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            nwGridCon.minRow(1);
            nwGridCon.TableHeight(300);
            nwGridCon.RowHeight(20);

            nwGridCon.buttonDelete = true;
            nwGridCon.buttonInsert = true;

            #region Column Title
            nwGridCon.nwobject(SPR_MQuantity - 1).ColumnName("Quantity");
            nwGridCon.nwobject(SPR_MUom - 1).ColumnName("Unit of Measurement");
            nwGridCon.nwobject(SPR_MDescription - 1).ColumnName("Description");

            #endregion
            nwGridCon.BodyFontFamily = "Century Gothic";
            nwGridCon.HeaderFontFamily = "Century Gothic";

            #region Column Width
            // nwGridCon.nwobject(SPR_Addon_AddonItemCode - 1).Width(0);


            nwGridCon.nwobject(SPR_MQuantity - 1).Width(250);
            nwGridCon.nwobject(SPR_MUom - 1).Width(260);
            nwGridCon.nwobject(SPR_MDescription - 1).Width(250);
            #endregion

            #region Column Color

            //nwGridCon.nwobject(SPR_Addon_AddonItemCode - 1).BackgroundColor("cyan");
            //nwGridCon.nwobject(SPR_Addon_AddonItemDesc - 1).BackgroundColor("cyan");
            //nwGridCon.nwobject(SPR_Addon_Qty - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Addon_UOMCode - 1).BackgroundColor("gainsboro");

            //nwGridCon.nwobject(SPR_Addon_ItemGroupTypeDesc - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Addon_UOM - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Addon_Qty - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_PricePerUnitUOM - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_PriceVatIn - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_PriceVatEx - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_DiscountRate - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_DiscountAmount - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Addon_NetAddonPriceVatIn - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_NetAddonPriceVatEx - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Addon_CrossRefCode - 1).BackgroundColor("gainsboro");
            #endregion

            #region Column Templates



            //nwGridCon.nwobject(SPR_Addon_AddonItemCode - 1).LookUp("lugAddOnItems", true);
            //nwGridCon.nwobject(SPR_Addon_AddonItemCode - 1).Enabled(true);
            nwGridCon.nwobject(SPR_MQuantity - 1).Template("<input value='{" + (SPR_MQuantity - 1) + "}' class='txt_SPR_Addon_Qty isNumber numC' maxlength='12'/>");
            nwGridCon.nwobject(SPR_MQuantity - 1).Enabled(true);
            nwGridCon.nwobject(SPR_MUom - 1).Template("<input value='{" + (SPR_MUom - 1) + "}' class='txt_SPR_MUom' maxlength='12'/>");
            nwGridCon.nwobject(SPR_MUom - 1).Enabled(true);
            nwGridCon.nwobject(SPR_MDescription - 1).Template("<input value='{" + (SPR_MDescription - 1) + "}' class='txt_SPR_Addon_Remarks' maxlength='120'/>");
            nwGridCon.nwobject(SPR_MDescription - 1).Enabled(true);
            //nwGridCon.nwobject(SPR_Addon_PricePerUnitUOM - 1).Template("<input value='{" + (SPR_Addon_PricePerUnitUOM - 1) + "}' class='txt_SPR_Addon_PricePerUnitUOM isNumber numC' style='text-align:right;'/>");
            //nwGridCon.nwobject(SPR_Addon_PriceVatIn - 1).Template("<input value='{" + (SPR_Addon_PriceVatIn - 1) + "}' class='txtSPR_Addon_PriceVatIn isNumber numC' style='text-align:right;'/>");
            //nwGridCon.nwobject(SPR_Addon_PriceVatEx - 1).Template("<input value='{" + (SPR_Addon_PriceVatEx - 1) + "}' class='txtSPR_Addon_PriceVatEx isNumber numC' style='text-align:right;'/>");
            //nwGridCon.nwobject(SPR_Addon_NetAddonPriceVatIn - 1).Template("<input value='{" + (SPR_Addon_NetAddonPriceVatIn - 1) + "}' class='txt_SPR_Addon_NetAddonPriceVatIn isNumber numC' style='text-align:right;' maxlength=18  nwdp='2'/>");
            //nwGridCon.nwobject(SPR_Addon_NetAddonPriceVatEx - 1).Template("<input value='{" + (SPR_Addon_NetAddonPriceVatEx - 1) + "}' class='txt_SPR_Addon_NetAddonPriceVatEx isNumber numC' style='text-align:right;' maxlength=18  nwdp='2'/>");
            //nwGridCon.nwobject(SPR_Addon_DiscountRate - 1).Template("<input value='{" + (SPR_Addon_DiscountRate - 1) + "}' class='txt_SPR_Addon_DiscountRate isNumber numC' style='text-align:right;' maxlength=2  nwdp='2'/>");
            //nwGridCon.nwobject(SPR_Addon_DiscountAmount - 1).Template("<input value='{" + (SPR_Addon_DiscountAmount - 1) + "}' class='txt_SPR_Addon_DiscountAmount isNumber numC' style='text-align:right;' nwdp='2' disabled/>");
            //nwGridCon.nwobject(SPR_Addon_PriceVatIn - 1).TextAlign("right");

            #endregion

            #region Column Button
            #endregion

            if (isInitialize)
            {
                dt = dal.GetMatsLin(Code);
               // nwGridCon.CreateExcelGrid(dt.Rows.Count, colCnt);
                nwGridCon.dataSource(dt);
                nwGridCon.maxRow(dt.Rows.Count + 1);

                /////LoadQuery(dt, nwGridCon);
            }
            else
            {
                nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            }

            //## THEME FORMAT
            nwGridCon.HeaderBorderColor("#DEDEDE");
            nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            nwGridCon.TableBorderColor("#BBB");
            nwGridCon.BodyBorderColor("#BBB");
            nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGridCon.HeaderTextColor("#131313");



            nwGridCon.varSpreadBook = "nwGridMainCon_Book_ToolsMats";
            nwGridCon.varSpreadSheet = "nwGridMainCon_Sheet_ToolsMats";
            js.ADD(nwGridCon.createTable());
            js.ADD("CreatedGridDone()");
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