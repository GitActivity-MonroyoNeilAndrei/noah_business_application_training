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
using System.Data.SqlClient;


namespace Noah_Web.forms_BusinessLayer
{
    public class DCRequirementComplianceBL : nwAction
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
        string focusRecordPK = "";
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

        #region SPR

        const int SPR_COMPILEDHDR = 1,
                  SPR_REQUIREDHDR = 2,
                  SPR_ALTERNATIVE = 3,
                  SPR_DOCUMENTGRP = 4,
                  SPR_WORKINSTRUCTIONS = 5,
                  SPR_DOCDETAILSCODEHDR = 6,
                  SPR_DOCDETAILSHDR = 7,
                  SPR_DOCNOHDR = 8,
                  SPR_DOCDATEHDR = 9,
                  SPR_EXPIRYDATEHDR = 10,
                  SPR_URLHDR = 11,
                  SPR_ATTACHHDR = 12,
                  SPR_VIEWHDR = 13,
                  SPR_REMOVEHDR = 14,
                  SPR_TAGDOCNOHDR = 15,
                  SPR_TAGDOCDATEHDR = 16,
                  SPR_TAGEXPIRYDATEHDR = 17,
                  SPR_TAGATTACHHDR = 18,
                  SPR_TAGURLHDR = 19,
                  SPR_FILEPATH = 20,
                  SPR_DELETEROW = 21,
                  SPR_TAG = 22,
                  SPR_GRPNO = 23,
                  SPR_DEPT = 24,
                  SPR_TYPE = 25,
                  SPR_LINEID = 26,
                  SPR_FORCONFALL = 27;

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
            dal = new DCRequirementComplianceDAL(this.UserDefinedConnectionString, this.based.SecurityAccess.ConnectionString, "");
            if (_strmet == "get_Initialize") strFinal = get_Initialize(strParameter, strValue);
            else if (_strmet == "func_Toolbox") strFinal = func_Toolbox(strtool_Met, strtool_Poz, strParameter, strValue);
            else if (_strmet == "get_LookUp") strFinal = get_LookUp(strtool_Met, strtool_Poz, strParameter, strValue);
            else if (_strmet == "getToolBoxData") strFinal = getToolBoxData(strtemp1, strtemp2, strParameter, strValue);
            else if (_strmet == "get_Method") strFinal = get_Method(strtemp1, strtemp2, strParameter, strValue);
            else if (_strmet == "act_Method") strFinal = act_Method(strtool_Met, strParameter, strValue);
            else strFinal = js.makeJSPostScript("alert('error:" + strmet + " not excute');");

            Result = strFinal;
        }

        public string strConn = "";
        public string TranNo = string.Empty;
        public string Trantype = "";
        public string Stat = string.Empty;
        string RecordOperationResult = String.Empty;
        DCRequirementComplianceDAL dal;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();

        public DCRequirementComplianceBL()
        {

        }

        public string get_Initialize(string strParameter, string strValue)
        {
            WebApp = new WebApplib(strParameter, strValue);
            string strFinal = "";
            CreateReqCommHDR(false);
            // SetBindings();
            Main_Load();
            execute(ref strFinal);
            return js.makeJSPostScript(strFinal);
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
            strConn = this.UserDefinedConnectionString;

            string strFinal = "";
            string strSQL = "";
            string mouseDownFunc = "";
            string mouseOverFunc = "";

            switch (strMethod)
            {

                case "getlugDocDtlHdr":
                    strSQL = dal.DocDTLhdr(WebApp.nwobjectText("dcList"));
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(6);
                    nwObject.ColumnHide(7);
                    nwObject.ColumnHide(8);
                    nwObject.ColumnHide(9);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

            }

            return strFinal;
        }

        private void InitializeValues()
        {

            nwToolBox.bindingNavigatorSaveItem.Enable = true;
            nwToolBox.bindingNavigatorAddNewItem.Enable =
            nwToolBox.bindingNavigatorPrintItem.Enable =
            nwToolBox.bindingNavigatorInquireItem.Enable =
            nwToolBox.bindingNavigatorDeleteItem.Enable =
            nwToolBox.bindingNavigatorDeleteItem.Visible =
            nwToolBox.bindingNavigatorExportItem.Enable =
            nwToolBox.bindingNavigatorProcessItem.Enable = false;
            nwToolBox.bindingNavigatorImportItem.Enable = true;
            var serverdate = SFObject.GetServerDateTime(this.UserDefinedConnectionString);
            js.makeValueText("#txtTranDate", serverdate.ToString("MM/dd/yyyy"));
            js.ADD("$(\"#idvallugVendor\").focus();");
        }

        ///// Standard RecordOperation 
        public void RecordOperation(eRecordOperation i, int Position)
        {
            string tempstr = "";

            RecordOperationResult = String.Empty;

            switch (i)
            {
                case eRecordOperation.AddNew:
                    InitializeValues();
                    break;

                case eRecordOperation.Save:
                    nwToolBox.bindingNavigatorImportItem.Enable = false;
                    nwToolBox.bindingNavigatorImportItem.Visible = true;

                    RecordOperationResult = ValidateData();
                    if (RecordOperationResult.Length <= 0)
                    {
                        DataTable dlin = new DataTable();
                        dlin = LoadSchemaLIN();
                        bool no_data = ValidateEmpty();
                        if (dlin.Rows.Count > 0 && !no_data)
                        {
                            RecordOperationResult = dal.SaveData(dlin, isNewRow, Parser.ParseInt(WebApp.nwobjectText("txtLineID")), Parser.ParseInt(WebApp.nwobjectText("txtRownum")),WebApp.nwobjectText("nwDetails"), based.SecurityAccess.RecUser, WebApp.nwobjectText("nwItemG"));
                            js.ADD("try{parent.DCRequirementCompliance_Save(" + nwSystem.GetDataTableToJSON(dlin) + ")}catch(err){}");
                            //js.ADD("closeIframeFromReqComp();");
                        }                      
                    }
                    break;

                case eRecordOperation.Delete:
                    break;

                case eRecordOperation.Process:
                    break;

                case eRecordOperation.Refresh:
                    nwToolBox.bindingNavigatorImportItem.Enable = false;
                    RefreshData();

                    break;
                case eRecordOperation.Inquire:
                    tempstr = "inqure";
                    break;

                case eRecordOperation.Import:
                    tempstr = "import";
                    Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Export:
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
                if (RecordOperationResult.ToLower().IndexOf("success") >= 0)
                {
                    RefreshData();
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i);
                    Prompt.Information(RecordOperationResult, based.Title);
                }
                else
                {

                    Prompt.Error(RecordOperationResult, based.Title);
                }
            }
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
                    js.ADD("nwLoading_End('actBindCollectionEmpty')");
                    break;

                case "actReloadDtls":
                    CreateReqCommHDR(true);
                    js.ADD("nwLoading_End('xactReloadDtls')");
                    break;

                default:
                    Prompt.Information("act_Method not found: " + strMethod, "Error");
                    break;
            }
            return js.makeJSPostScript(execute());
        }

        public string getToolBoxData(string tableName, string getMethod, string strParameter, string strValue)
        {
            string strFinal = ""; string sql = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (getMethod)
            {
                case "toolbox":
                    nwStandardBL standardBL = new nwStandardBL(WebApp);
                    standardBL.PrimaryKey = "TransactionNo";
                    //strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(WebApp.nwobjectText("tranNo")), this.UserDefinedConnectionString);
                    break;
            }

            return strFinal;
        }



        //////////////////////// Common

        //private void SetBindings()
        //{
        //    SFObject.SetControlBinding("#txtTransactionNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "TransactionNo");
        //    SFObject.SetControlBinding("#txtTranDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "TransactionDate");
        //    SFObject.SetControlBinding("#idvallugVendor", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SupplierCode");
        //    SFObject.SetControlBinding("#descvallugVendor", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RegisteredName");
        //    SFObject.SetControlBinding("#txtRemarks", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Remarks");
        //    SFObject.SetControlBinding(Stat, "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Status");

        //    //FOOTER
        //    SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recuser");
        //    SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recdate");
        //    SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moduser");
        //    SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moddate");
        //}

        //////////////// end of standard / standard custumize

        private void BindCollection()
        {
            // CreateReqCommHDR();
            js.ADD("nwLoading_End('actBindCollection');");
        }

        private string ValidateData()
        {
            string errorResult = String.Empty;

            DataTable _temp = new DataTable();
            _temp = LoadSchemaLIN();

            //if (_temp.Rows.Count <= 0)
            //{
            //    errorResult += "Cannot be saved. At least one line detail is required.\n";
            //}

            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGrid2"));

            DataView view = new DataView(dt);
            DataTable dtGrp = view.ToTable(true, "D", "W"); //Column3=Document Group (SPR_DOCUMENTGRP), Column22=No. of Docs Required (SPR_GRPNO)

            //for (int d = 0; d <= dtGrp.Rows.Count - 1; d++)
            //{
            //    bool isGroup = false;
            //    int noOfGrp = 0;
            //    int noGrp = Parser.ParseInt(dtGrp.Rows[d][1].ToString());
            //    string docGrp = dtGrp.Rows[d][0].ToString();
            //    if (docGrp != string.Empty)
            //    {
            //        foreach (DataRow dRow in dt.Rows)
            //        {
            //            string docGrp_ = dRow[SPR_DOCUMENTGRP - 1].ToString();
            //            if (!string.IsNullOrWhiteSpace(dRow[SPR_WORKINSTRUCTIONS - 1].ToString()) && !string.IsNullOrEmpty(dRow[SPR_TAG - 1].ToString())
            //                && bool.Parse(dRow[SPR_REQUIREDHDR - 1].ToString()))
            //            {
            //                if (docGrp == docGrp_)
            //                {
            //                    isGroup = true;
            //                    if (bool.Parse(dRow[SPR_COMPILEDHDR - 1].ToString()) 
            //                        || (dRow[SPR_DOCNOHDR - 1].ToString() != string.Empty && dRow[SPR_TAGDOCNOHDR - 1].ToString() == "1")
            //                        || (dRow[SPR_DOCDATEHDR - 1].ToString() != string.Empty && dRow[SPR_TAGDOCDATEHDR - 1].ToString() == "1")
            //                        || (dRow[SPR_EXPIRYDATEHDR - 1].ToString() != string.Empty && dRow[SPR_TAGEXPIRYDATEHDR - 1].ToString() == "1")
            //                        || (dRow[SPR_FILEPATH - 1].ToString() != string.Empty && dRow[SPR_TAGATTACHHDR - 1].ToString() == "1")
            //                        || (dRow[SPR_URLHDR - 1].ToString() != string.Empty && dRow[SPR_TAGURLHDR - 1].ToString() == "1"))
            //                    {
            //                        noOfGrp += 1;
            //                    }
            //                }
            //            }
            //        }
            //    }
            //    if (isGroup && (noOfGrp < noGrp))
            //    {
            //        errorResult += $"Cannot be saved. Please provide at least {noGrp} document for {docGrp}.\n";
            //    }
            //}

            int x = 1;
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow dr in dt.Rows)
                {
                    dr[SPR_COMPILEDHDR - 1] = dr[SPR_COMPILEDHDR - 1].ToString() == "" ? "false" : dr[SPR_COMPILEDHDR - 1];
                    if ((bool.Parse(dr[SPR_COMPILEDHDR - 1].ToString()) && string.IsNullOrWhiteSpace(dr[SPR_WORKINSTRUCTIONS - 1].ToString())) || (dr[SPR_WORKINSTRUCTIONS - 1].ToString() == string.Empty && (dr[SPR_TAG - 1].ToString() == string.Empty || dr[SPR_TAG - 1].ToString() == "0")
                         && (dr[SPR_DOCNOHDR - 1].ToString() != string.Empty || dr[SPR_DOCDATEHDR - 1].ToString() != string.Empty || dr[SPR_EXPIRYDATEHDR - 1].ToString() != string.Empty
                         || dr[SPR_FILEPATH - 1].ToString() != string.Empty || dr[SPR_URLHDR - 1].ToString() != string.Empty || dr[SPR_DOCDETAILSCODEHDR - 1].ToString() != string.Empty)))
                        errorResult += $"Cannot be saved. Work Instruction in row {x} is required.\n";

                    if (!string.IsNullOrWhiteSpace(dr[SPR_WORKINSTRUCTIONS - 1].ToString()))
                    {
                        if (!string.IsNullOrEmpty(dr[SPR_TAG - 1].ToString()))
                        {
                            //if (bool.Parse(dr[SPR_REQUIREDHDR - 1].ToString()))
                            //    if (!bool.Parse(dr[SPR_COMPILEDHDR - 1].ToString()))
                            //        errorResult += $"Cannot Save. Complied is required at row [{x}]. \n";
                          
                            if (bool.Parse(dr[SPR_COMPILEDHDR - 1].ToString()) && (dr[SPR_WORKINSTRUCTIONS - 1].ToString() != string.Empty) && (dr[SPR_TAGDOCNOHDR - 1].ToString() == "1") && (dr[SPR_DOCNOHDR - 1].ToString() == string.Empty))
                                errorResult += $"Cannot be saved. Document No. in row {x} is required.\n";

                            if (bool.Parse(dr[SPR_COMPILEDHDR - 1].ToString()) && (dr[SPR_WORKINSTRUCTIONS - 1].ToString() != string.Empty) && (dr[SPR_TAGDOCDATEHDR - 1].ToString() == "1") && (dr[SPR_DOCDATEHDR - 1].ToString() == string.Empty))
                                errorResult += $"Cannot be saved. Document Date in row {x} is required.\n";

                            if (bool.Parse(dr[SPR_COMPILEDHDR - 1].ToString()) && (dr[SPR_WORKINSTRUCTIONS - 1].ToString() != string.Empty) && (dr[SPR_TAGEXPIRYDATEHDR - 1].ToString() == "1") && (dr[SPR_EXPIRYDATEHDR - 1].ToString() == string.Empty))
                                errorResult += $"Cannot be saved. Expiry Date in row {x} is required.\n";

                            if (bool.Parse(dr[SPR_COMPILEDHDR - 1].ToString()) && (dr[SPR_WORKINSTRUCTIONS - 1].ToString() != string.Empty) && (dr[SPR_TAGATTACHHDR - 1].ToString() == "1") && (dr[SPR_FILEPATH - 1].ToString() == string.Empty))
                                errorResult += $"Cannot be saved. Attachment in row {x} is required.\n";

                            if (bool.Parse(dr[SPR_COMPILEDHDR - 1].ToString()) && (dr[SPR_WORKINSTRUCTIONS - 1].ToString() != string.Empty) && (dr[SPR_TAGURLHDR - 1].ToString() == "1") && (dr[SPR_URLHDR - 1].ToString() == string.Empty))
                                errorResult += $"Cannot be saved. URL in row {x} is required.\n";                            
                        }
                    }

                    //if (dr[SPR_WORKINSTRUCTIONS - 1].ToString() == string.Empty && (dr[SPR_TAG - 1].ToString() == string.Empty || dr[SPR_TAG - 1].ToString() == "0")
                    //    && (dr[SPR_DOCNOHDR - 1].ToString() != string.Empty || dr[SPR_DOCDATEHDR - 1].ToString() != string.Empty || dr[SPR_EXPIRYDATEHDR - 1].ToString() != string.Empty
                    //    || dr[SPR_FILEPATH - 1].ToString() != string.Empty || dr[SPR_URLHDR - 1].ToString() != string.Empty || dr[SPR_DOCDETAILSCODEHDR - 1].ToString() != string.Empty))
                    //    errorResult += $"Cannot be saved. Work Instruction in row {x} is required.\n";

                    if (dr[SPR_TAG - 1].ToString() == "0" || dr[SPR_TAG - 1].ToString() == "")
                    {
                        if (dr[SPR_TAGDOCNOHDR - 1].ToString() == "1" && dr[SPR_DOCNOHDR - 1].ToString() == string.Empty)
                        {
                            errorResult += $"Cannot be saved. Document No. in row {x} is required.\n";
                        }
                        if (dr[SPR_TAGDOCDATEHDR - 1].ToString() == "1" && dr[SPR_DOCDATEHDR - 1].ToString() == string.Empty)
                        {
                            errorResult += $"Cannot be saved. Document Date in row {x} is required.\n";
                        }
                        if (dr[SPR_TAGEXPIRYDATEHDR - 1].ToString() == "1" && dr[SPR_EXPIRYDATEHDR - 1].ToString() == string.Empty)
                        {
                            errorResult += $"Cannot be saved. Expiry Date in row {x} is required.\n";
                        }
                        if (dr[SPR_TAGURLHDR - 1].ToString() == "1" && dr[SPR_URLHDR - 1].ToString() == string.Empty)
                        {
                            errorResult += $"Cannot be saved. URL in row {x} is required.\n";
                        }
                    }

                    x++;
                }
            }

            return errorResult;
        }

        private bool ValidateEmpty()
        {
            bool no_data = true;

            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGrid2"));

            int x = 1;
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow dr in dt.Rows)
                {
                    if (!string.IsNullOrWhiteSpace(dr[SPR_WORKINSTRUCTIONS - 1].ToString()))
                    {                                                
                        bool complied = bool.Parse(dr[SPR_COMPILEDHDR - 1].ToString());
                        string workins = dr[SPR_WORKINSTRUCTIONS - 1].ToString();
                        string docno = dr[SPR_DOCNOHDR - 1].ToString();
                        string docdate = dr[SPR_DOCDATEHDR - 1].ToString();
                        string expdate = dr[SPR_EXPIRYDATEHDR - 1].ToString();
                        string url = dr[SPR_URLHDR - 1].ToString();
                        string filepath = dr[SPR_FILEPATH - 1].ToString();

                        if (workins != string.Empty || docno != string.Empty || docdate != string.Empty || expdate != string.Empty || url != string.Empty || filepath != string.Empty)
                        {
                            no_data = false;
                        }                                                       
                    }
                    x++;
                }
            }

            return no_data;
        }

        public static string DoFormat(double myNumber)
        {
            var s = string.Format("{0:0.00}", myNumber);
            return s;
        }

        public void CreateReqCommHDR(bool isReload)
        {
            string gridID = "nwGrid2";
            nwGrid m_spread = new nwGrid(gridID);
            m_spread.Type = nwGridType.SpreadCanvas; //newspread

            //m_spread.RowHeight(5);
            m_spread.CreateExcelGrid(5, SPR_FORCONFALL);
            m_spread.TableHeight(400);
            m_spread.minRow(5);
           

            DataTable dt = new DataTable();
            string sql = string.Empty;
            string sqlline = string.Empty;
            string isExist = string.Empty;
            string TranType = WebApp.nwobjectTextSQL("TranType");
            string TranNo = WebApp.nwobjectTextSQL("TransactionNo");
            string ItemG = WebApp.nwobjectTextSQL("nwItemG");
            string LineID = WebApp.nwobjectTextSQL("nwLineID");
            string Rownum = WebApp.nwobjectTextSQL("nwRownum");
            string details = WebApp.nwobjectTextSQL("nwDetails");
            string dept = WebApp.nwobjectTextSQL("nwDepartment");
            string ordertype = WebApp.nwobjectTextSQL("nwOrderType");
            string docDtls = WebApp.nwobjectTextSQL("nwDocDtls");

            sql = SFObject.returnText(dal.IfData(TranType, TranNo, LineID), UserDefinedConnectionString);
            sqlline = SFObject.returnText(dal.IfDataLine(TranType, TranNo, LineID, Rownum), UserDefinedConnectionString);
                    
            if (isReload)
            {
                if (!string.IsNullOrWhiteSpace(TranType) && ItemG == string.Empty)
                    dt = dal._tempGetReqCommHDR(TranType, ItemG, dept, ordertype);

                else if (!string.IsNullOrWhiteSpace(TranType) && ItemG != string.Empty)
                    dt = dal._tempGetReqCommHDR(TranType, ItemG, dept, ordertype);
            }
            else
            {
                dt = dal.GetLinData(TranNo, TranType, ItemG, LineID, Rownum, details, docDtls, dept, ordertype);

                if (dt.Rows.Count > 0)
                {
                    m_spread.minRow(dt.Rows.Count);
                }
                else
                {
                    if (!string.IsNullOrWhiteSpace(TranType) && ItemG == string.Empty && sql != "1")
                        dt = dal._tempGetReqCommHDR(TranType, ItemG, dept, ordertype);

                    else if (!string.IsNullOrWhiteSpace(TranType) && ItemG != string.Empty && sqlline != "1")
                        dt = dal._tempGetReqCommHDR(TranType, ItemG, dept, ordertype);
                }
            }

            //else if (!string.IsNullOrWhiteSpace(TranType) && sql == "1" && ItemG == string.Empty)
            //    dt = dal.GetLinData(TranNo, TranType, ItemG, LineID, Rownum);

            //else if (!string.IsNullOrWhiteSpace(TranType) && ItemG != string.Empty && sqlline == "1")
            //    dt = dal.GetLinData(TranNo, TranType, ItemG, LineID, Rownum);

            m_spread.dataSource(dt);

            if (dt.Rows.Count > 0)
                m_spread.minRow(dt.Rows.Count);
            else
                m_spread.minRow(1);

            #region Column Name
            m_spread.nwobject(SPR_COMPILEDHDR - 1).ColumnName("Complied");
            m_spread.nwobject(SPR_REQUIREDHDR - 1).ColumnName("Required");
            m_spread.nwobject(SPR_ALTERNATIVE - 1).ColumnName("Alternative");
            m_spread.nwobject(SPR_DOCUMENTGRP - 1).ColumnName("Document Group");
            m_spread.nwobject(SPR_WORKINSTRUCTIONS - 1).ColumnName("Work Instruction");
            m_spread.nwobject(SPR_DOCDETAILSCODEHDR - 1).ColumnName("Document Code");
            m_spread.nwobject(SPR_DOCDETAILSHDR - 1).ColumnName("Document Description");
            m_spread.nwobject(SPR_DOCNOHDR - 1).ColumnName("Document No.");
            m_spread.nwobject(SPR_DOCDATEHDR - 1).ColumnName("Document Date");
            m_spread.nwobject(SPR_EXPIRYDATEHDR - 1).ColumnName("Expiry Date");
            m_spread.nwobject(SPR_URLHDR - 1).ColumnName("URL");
            m_spread.nwobject(SPR_ATTACHHDR - 1).ColumnName("Attach");
            m_spread.nwobject(SPR_VIEWHDR - 1).ColumnName("View");
            m_spread.nwobject(SPR_REMOVEHDR - 1).ColumnName("Remove");
            m_spread.nwobject(SPR_DELETEROW - 1).ColumnName("");
            m_spread.nwobject(SPR_TAGDOCNOHDR - 1).ColumnName("TagDocno");
            m_spread.nwobject(SPR_TAGDOCDATEHDR - 1).ColumnName("TagDocdate");
            m_spread.nwobject(SPR_TAGEXPIRYDATEHDR - 1).ColumnName("TagExpiry");
            m_spread.nwobject(SPR_TAGATTACHHDR - 1).ColumnName("TagAttach");
            m_spread.nwobject(SPR_TAGURLHDR - 1).ColumnName("TagURL");
            m_spread.nwobject(SPR_FILEPATH - 1).ColumnName("File Path");

            #endregion

            #region Input

            m_spread.nwobject(SPR_COMPILEDHDR - 1).CheckBox(false,"",true);
            m_spread.nwobject(SPR_REQUIREDHDR - 1).CheckBox(false, "", true);
            m_spread.nwobject(SPR_ALTERNATIVE - 1).CheckBox(false, "", true);

            //m_spread.nwobject(SPR_COMPILEDHDR - 1).Template("<input type='checkbox' id = 'chkCompiled'></input>");
            //m_spread.nwobject(SPR_REQUIREDHDR - 1).Template("<input type='checkbox' id = 'chkRequired'></input>");

            m_spread.nwobject(SPR_WORKINSTRUCTIONS - 1).Template("<input value='{" + (SPR_WORKINSTRUCTIONS - 1) + "}' class='txtWorkInstructions' maxlength='255' />");
            m_spread.nwobject(SPR_DOCNOHDR - 1).Template("<input type='text' class='txtDocno' maxlength='30' value='{" + (SPR_DOCNOHDR - 1) + "}' autocomplete='nope'></input>");           
            //m_spread.nwobject(SPR_DOCDATEHDR - 1).InputDate("txtDocDate");
            //m_spread.nwobject(SPR_EXPIRYDATEHDR - 1).InputDate("txtExpiryDate");
            m_spread.nwobject(SPR_DOCDATEHDR - 1).Template("<input value='{" + (SPR_DOCDATEHDR - 1) + "}' class='txtDocDate nwDatePick' autocomplete='nope' />");
            m_spread.nwobject(SPR_EXPIRYDATEHDR - 1).Template("<input value='{" + (SPR_EXPIRYDATEHDR - 1) + "}' class='txtExpiryDate nwDatePick' autocomplete='nope' />");
            m_spread.nwobject(SPR_URLHDR - 1).Template("<input type='text' class='txtURL' maxlength='120' value='{" + (SPR_URLHDR - 1) + "}' autocomplete='nope'></input>");
            #endregion

            #region Template
            //m_spread.nwobject(SPR_DELETEROW - 1).Template("<div id ='btnClose' class='nwBtnClose' style='text-align:center;border:3px;cursor:pointer;'><b>x</b></div>");
            m_spread.nwobject(SPR_DELETEROW - 1).Class("nwGButton");
            //m_spread.nwobject(SPR_ATTACHHDR - 1).Template("<a class='btnAttach' style=''></a>");
            //m_spread.nwobject(SPR_VIEWHDR - 1).Template("<a class='btnView' style=''></a>");
            //m_spread.nwobject(SPR_REMOVEHDR - 1).Template("<a class='btnRemove' style=''></a>");

            
             m_spread.nwobject(SPR_DOCDETAILSCODEHDR - 1).LookUp("lugDocDtlHdr",false,true);
            #endregion

            #region Special

            m_spread.nwobject(SPR_WORKINSTRUCTIONS - 1).HeaderFieldRequired(true);
            /* For Look with Input*/
            //m_spread.nwobject(SPR_LOOKUPCODE - 1).LookUp("lugCodeDesc", true);
            /* For Merging Cells*/
            //m_spread.Rows(0,1).Merge(2,2);
            // m_spread.nwobject(SPR_INPUT - 1).FontFamily("bold");

            #endregion

            #region Header Grouping
            m_spread.HeaderGroupADD("Attachments", (SPR_ATTACHHDR - 1), 3);            
            #endregion

            #region Width
            m_spread.nwobject(SPR_COMPILEDHDR - 1).Width(80);
            m_spread.nwobject(SPR_REQUIREDHDR - 1).Width(80);
            m_spread.nwobject(SPR_ALTERNATIVE - 1).Width(80);
            m_spread.nwobject(SPR_DOCUMENTGRP - 1).Width(120);
            m_spread.nwobject(SPR_WORKINSTRUCTIONS - 1).Width(120);
            m_spread.nwobject(SPR_DOCDETAILSCODEHDR - 1).Width(120);
            m_spread.nwobject(SPR_DOCDETAILSHDR - 1).Width(120);
            m_spread.nwobject(SPR_DOCNOHDR - 1).Width(120);
            m_spread.nwobject(SPR_DOCDATEHDR - 1).Width(120);
            m_spread.nwobject(SPR_EXPIRYDATEHDR - 1).Width(120);
            m_spread.nwobject(SPR_URLHDR - 1).Width(300);
            m_spread.nwobject(SPR_ATTACHHDR - 1).Width(33);
            m_spread.nwobject(SPR_VIEWHDR - 1).Width(33);
            m_spread.nwobject(SPR_REMOVEHDR - 1).Width(33);
            m_spread.nwobject(SPR_DELETEROW - 1).Width(0);
            m_spread.nwobject(SPR_TAGDOCNOHDR - 1).Width(0);
            m_spread.nwobject(SPR_TAGDOCDATEHDR - 1).Width(0);
            m_spread.nwobject(SPR_TAGEXPIRYDATEHDR - 1).Width(0);
            m_spread.nwobject(SPR_TAGATTACHHDR - 1).Width(0);
            m_spread.nwobject(SPR_TAGURLHDR - 1).Width(0);
            m_spread.nwobject(SPR_FILEPATH - 1).Width(0);
            m_spread.nwobject(SPR_TAG - 1).Width(0);
            m_spread.nwobject(SPR_GRPNO - 1).Width(0);
            m_spread.nwobject(SPR_DEPT - 1).Width(0);
            m_spread.nwobject(SPR_TYPE - 1).Width(0);
            m_spread.nwobject(SPR_LINEID - 1).Width(0);
            m_spread.nwobject(SPR_FORCONFALL - 1).Width(0);
            #endregion
    
            #region Color

            m_spread.nwobject(SPR_COMPILEDHDR - 1).BackgroundColor("white");
            m_spread.nwobject(SPR_REQUIREDHDR - 1).BackgroundColor("white");
            m_spread.nwobject(SPR_ALTERNATIVE - 1).BackgroundColor("Gainsboro");
            m_spread.nwobject(SPR_DOCUMENTGRP - 1).BackgroundColor("Gainsboro");
            m_spread.nwobject(SPR_REQUIREDHDR - 1).BackgroundColor("white");
            m_spread.nwobject(SPR_DOCDETAILSCODEHDR - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_DOCNOHDR - 1).BackgroundColor("white");
            m_spread.nwobject(SPR_DOCDATEHDR - 1).BackgroundColor("white");
            m_spread.nwobject(SPR_EXPIRYDATEHDR - 1).BackgroundColor("white");
            m_spread.nwobject(SPR_URLHDR - 1).BackgroundColor("white");
            m_spread.nwobject(SPR_ATTACHHDR - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_VIEWHDR - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_REMOVEHDR - 1).BackgroundColor("gainsboro");

            m_spread.nwobject(SPR_DOCDETAILSHDR - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_TAGDOCNOHDR - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_TAGDOCDATEHDR - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_TAGEXPIRYDATEHDR - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_TAGATTACHHDR - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_TAGURLHDR - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_FILEPATH - 1).BackgroundColor("gainsboro");

            #endregion

            #region Class
            m_spread.nwobject(SPR_ATTACHHDR - 1).Class("buttonGrid");
            m_spread.nwobject(SPR_VIEWHDR - 1).Class("buttonGrid");
            m_spread.nwobject(SPR_REMOVEHDR - 1).Class("buttonGrid");
            #endregion

            #region Grid Buttons

            m_spread.buttonInsert = true;
            m_spread.buttonDelete = true;
            if (dal.isAllowDupeDocs()) { m_spread.buttonCopyRow = true; };
            m_spread.buttonSearchFind = false;
            m_spread.buttonResetColumn = true;
            m_spread.buttonSaveColumn = true;
            m_spread.ButtonMenuAdd("btnReloadDtls", "Reload Details");
            m_spread.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);

            #endregion

            //m_spread.SetTheme(nwGridTheme.Default);

            //m_spread.HeaderBorderColor("#DEDEDE");
            //m_spread.rowBackground("#FFFFFF", "#FFFFFF");
            //m_spread.TableBorderColor("#BBB");
            //m_spread.BodyBorderColor("#BBB");
            //m_spread.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            //m_spread.HeaderTextColor("#131313");



            m_spread.varSpreadBook = "nwGrid_Book"; //newspread.
            m_spread.varSpreadSheet = "nwGrid_Sheet"; //newspread

            //js.makeHTML("#nwGrid2", m_spread.createTable());
            js.ADD(m_spread.createTable());


            //js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            //js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",1,0)");
            //js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            //js.ADD("$('.nwCheckBoxTot ').css('display','none')");

            //if (dt.Rows.Count > 0)
            //{
            //    string xquery = string.Empty;
            //    foreach (DataRow row in dt.Rows)
            //    {
            //        if (row[SPR_REQUIREDHDR - 1].ToString() == "1")
            //            xquery += string.Format("$('#nwGrid2-nwData tbody').find('tr:eq(" + dt.Rows.IndexOf(row) + ") td:eq(" + SPR_REQUIREDHDR + ") input').prop('checked', true);");
            //    }

            //    js.ADD(xquery);
            //}



            //js.ADD("ReqCommHDRAutoEnableDisable();");

            //js.ADD("$('.nwgrid_Delete').css('display','none')");

            if (!WebApp.nwobjectBool("isView"))
            {
                //js.ADD("nwGrid_AddRow('nwGrid2',1)");
                js.ADD("nwGrid_Book.ActiveSheet.RowAdd()");
            }

            js.ADD("GridValidation()");
            //   js.ADD("$('#nwGrid2 .tblGridBody tr td:nth-child(' + (SPR_ALTERNATIVE + 1) + ') input').enable(false);");

        }


        private DataTable LoadSchemaLIN()
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.LoadSchemaLIN();
            #endregion

            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGrid2"));

            foreach (DataRow dr_details in dt.Rows)
            {
                DataRow dr = dtLIN.NewRow();
                if ((dr_details[SPR_WORKINSTRUCTIONS - 1].ToString() != string.Empty))
                {
                    dr["docno"] = WebApp.nwobjectText("TransactionNo");
                    dr["complied"] = dr_details[SPR_COMPILEDHDR - 1].ToString();
                    dr["required"] = dr_details[SPR_REQUIREDHDR - 1].ToString() == ""? "false": dr_details[SPR_REQUIREDHDR - 1].ToString();
                    dr["workInstructions"] = dr_details[SPR_WORKINSTRUCTIONS - 1].ToString();
                    dr["docDetail"] = dr_details[SPR_DOCDETAILSCODEHDR - 1].ToString();
                    dr["documentNo"] = dr_details[SPR_DOCNOHDR - 1].ToString();

                    if (dr_details[SPR_DOCDATEHDR - 1].ToString() != "")
                        dr["documentDate"] = dr_details[SPR_DOCDATEHDR - 1].ToString();

                    if (dr_details[SPR_EXPIRYDATEHDR - 1].ToString() != "")
                        dr["expiryDate"] = dr_details[SPR_EXPIRYDATEHDR - 1].ToString();

                    dr["url"] = dr_details[SPR_URLHDR - 1].ToString();
                    dr["filebin"] = dr_details[SPR_FILEPATH - 1].ToString();
                    dr["dept"] = dr_details[SPR_DEPT - 1].ToString();
                    dr["type"] = dr_details[SPR_TYPE - 1].ToString();
                    dr["Details"] = WebApp.nwobjectText("nwDetails");
                    dr["tranType"] = WebApp.nwobjectText("TranType");
                    dr["applyto"] = WebApp.nwobjectText("nwApplyTo");
                    dr["alternative"] = Parser.ParseBool(dr_details[SPR_ALTERNATIVE - 1].ToString());
                    dr["docGrp"] = dr_details[SPR_DOCUMENTGRP - 1].ToString();
                    dr["isSetup"] = Parser.ParseBool(dr_details[SPR_TAG - 1].ToString());
                    dr["lineidSetup"] = Parser.ParseInt(dr_details[SPR_LINEID - 1].ToString());
                    dr["tagDocno"] = Parser.ParseBool(dr_details[SPR_TAGDOCNOHDR - 1].ToString());
                    dr["tagDocdate"] = Parser.ParseBool(dr_details[SPR_TAGDOCDATEHDR - 1].ToString());
                    dr["tagExpdate"] = Parser.ParseBool(dr_details[SPR_TAGEXPIRYDATEHDR - 1].ToString());
                    dr["tagURL"] = Parser.ParseBool(dr_details[SPR_TAGURLHDR - 1].ToString());
                    dr["tagAttach"] = Parser.ParseBool(dr_details[SPR_TAGATTACHHDR - 1].ToString());
                    dr["noOfDocsReq"] = Parser.ParseInt(dr_details[SPR_GRPNO - 1].ToString());
                    dr["forConAllLvls"] = Parser.ParseBool(dr_details[SPR_FORCONFALL - 1].ToString());

                    dtLIN.Rows.Add(dr);
                    dtLIN.AcceptChanges();
                }
            }

            return dtLIN;
        }


        private void Main_Load()
        {
            if (based.isInterface == true) dal.UpdateVersion();
            js.makeValueText("#txtserverlink", dal.Serverlink());
            js.makeValueText("#txtLineID", WebApp.nwobjectText("nwLineID"));
            js.makeValueText("#txtRownum", WebApp.nwobjectText("nwRownum"));

            var serverdate = SFObjects.GetServerDateTime(this.UserDefinedConnectionString);
            js.makeValueText("#txtServerDate", serverdate.ToString("MM/dd/yyyy"));
            //js.ADD("ChkIfHasAttachment()");
            js.ADD("DisableUponView()");
            string mbSize = dal.getMBSize();
            js.ADD(string.Format("mbSize='{0}'", mbSize));
        }

        private void RefreshData()
        {
            js.ADD("ClearFields();");
            js.ADD("func_Toolbox_Clear();");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")"); // goto: getToolBoxData
            //js.ADD("$fn().UponRefreshLoadGrid();");
        }
    }
}