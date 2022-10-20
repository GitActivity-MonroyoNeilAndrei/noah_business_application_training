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




using DataAccessLayers;

namespace Noah_Web.forms_BusinessLayer
{
    public class SAModuleWebBL : nwAction
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

            dao = new SAModuleWebDAL(this.UserDefinedConnectionString, ""); 

            if (_strmet == "get_Initialize") strFinal = get_Initialize() ;
            else if (_strmet == "func_Toolbox") strFinal = func_Toolbox(strtool_Met, strtool_Poz, strParameter, strValue);
            else if (_strmet == "get_LookUp") strFinal = get_LookUp(strtool_Met, strtool_Poz, strParameter, strValue);
            else if (_strmet == "getToolBoxDataRet") strFinal = getToolBoxDataRet(strtemp1, strtemp2, strtemp3, strtemp4, strtemp5);
            else if (_strmet == "getToolBoxDataCreate") strFinal = getToolBoxDataCreate(strtemp1, strtemp2, strtemp3, Convert.ToInt32(strtemp4), Convert.ToInt32(strtemp5));
            else if (_strmet == "getToolBoxData") strFinal = getToolBoxData(strtemp1, strtemp2, strParameter, strValue);
            else if (_strmet == "get_Method") strFinal = get_Method(strtemp1, strtemp2, strParameter, strValue);
            else if (_strmet == "act_Method") strFinal = act_Method(strtool_Met, strParameter, strValue);
            else strFinal = js.makeJSPostScript("alert('error:" + strmet + " not excute');");

            Result = strFinal;
        }

       
        public string strConn = "";
        string RecordOperationResult = string.Empty;
        SAModuleWebDAL dao;
        public SAModuleWebBL()
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
        public string getToolBoxDataRet(string tableName, string sa, string sc, string si, string sb)
        {
            string strFinal = "";
            int startIndex = 1; int batchRowcounts = -1;
            try { startIndex = Convert.ToInt32(si); }
            catch { }
            try { batchRowcounts = Convert.ToInt32(sb); }
            catch { }
            strFinal = getToolBoxDataCreate(tableName, sa, sc, startIndex, batchRowcounts);

            return js.makeJSPostScript(strFinal);
        }
        public string getToolBoxDataCreate(string tableName, string sql, string strconn, int startIndex, int batchRowcounts)
        {
            string strFinal = string.Empty; string strRet = string.Empty; string sqlOrig = sql;
            DataTable dt = new DataTable();
            int startColumn = 0; int rownumber = startIndex;
            if (batchRowcounts >= 1)
            {
                startColumn = 1;
                sql = string.Format(@"Select x.* from(select ROW_NUMBER()  over (order by (select 0)) as [aagrowNum], b.* from ({0})  b) x where x.aagrowNum>={1} AND  x.aagrowNum <={2} order by x.aagrowNum", sql, startIndex, startIndex + batchRowcounts);
            }

            dt = SFObjects.LoadDataTable(sql, strconn);
            int rowCount = dt.Rows.Count;

            for (int i = 0; i < rowCount; i++)
            {
                strFinal += "<tr id=\"" + tableName + "-tr" + rownumber + "\">";
                for (int i2 = startColumn; i2 < dt.Columns.Count; i2++)
                {
                    strFinal += "<td class=\"aag" + dt.Columns[i2].ColumnName.ToString().ToLower() + "\">" + dt.Rows[i][i2].ToString().Replace("'", "\\'") + "</td>";
                }
                strFinal += "</tr>";
                rownumber += 1;
            }
            if (batchRowcounts >= 1 && rowCount >= batchRowcounts)
            {
               strRet = "func_ToolboxDataBat(\'" + tableName + "\', \'" + sqlOrig.Replace("\\", "\\\\").Replace("\'", "\\'") + "\', \'" + strconn.Replace("\\", "\\\\") + "\', \'" + (startIndex + batchRowcounts + 1).ToString() + "\', \'" + (batchRowcounts).ToString() + "\');";
            }
            else
            {
                strRet = "func_ToolboxDataRetst();";
            }

            if (batchRowcounts >= 1 && startIndex > 1) strFinal = js.makeAppend(tableName, strFinal);
            else strFinal = js.makeHTML(tableName, strFinal);

            return strFinal + strRet + "func_toolboxCountTotal();";
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
                    emptyDT = dao.LoadCbo();
                    strFinal = nwObject.make_OptionLookup(strSQL, strConn, emptyDT);
                    strSQL = js.makeHTML("#sel_AppVer", strFinal);
                    strFinal = strSQL;

                    break;
                ////// look up 
                case "getlugCode":
                    // strSQL = string.Format(@"Select [Code],[Description] from FG.UOMMaster where [code] like '%{0}%' or [Description] like '%{0}%'  ", strSearchVal);
                    // strMethod = strMethod.Substring(3);
                    // ////   mouseDownFunc = "func_ActionDriven(\\'actBranchChange\\', true);";
                    // ////mouseDownFunc = "refresh();func_ToolboxADD();func_Check_Lookup(1);func_Clear_Dealer();clearMainTable();func_ActionDriven(\\'actDealerInfo\\', true);";
                    // //mouseDownFunc = "refresh();func_ToolboxADD();func_Check_Lookup(1);clearMainTable();func_ActionDriven(\\'actDealerInfo\\', true);";
                    //strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    ////strFinal += strSQL + " " + strConn;
                    break;

                ///// Inquire
                case "gettoolboxInquire":
                    strSQL = string.Format(@"Select [code],[AppName] from [FPTI_NW].[noahweb_Application_Info] where [code] like '%{0}%' or [AppName] like '%{0}%'  ", strSearchVal);
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
                    nwToolBox.bindingNavigatorSaveItem.Enable = true;
                    nwToolBox.bindingNavigatorAddNewItem.Enable =
                     nwToolBox.bindingNavigatorPrintItem.Enable =
                     nwToolBox.bindingNavigatorInquireItem.Enable =
                     nwToolBox.bindingNavigatorImportItem.Visible =
                     nwToolBox.bindingNavigatorDeleteItem.Enable =
                     nwToolBox.bindingNavigatorDeleteItem.Visible =
                     nwToolBox.bindingNavigatorExportItem.Enable = false;
                    break;
                case eRecordOperation.Save:
                    RecordOperationResult = string.Empty;

                    if (AreValidEntries() == true)
                    {
                        DataTable dtData = new DataTable();
                        dtData = LoadSchema();
                        RecordOperationResult = dao.SaveData(dtData, isNewRow);
                        Prompt.Information(RecordOperationResult, based.Title);
                        if (RecordOperationResult.ToLower().IndexOf(" successfully ") != -1) {
                            RefreshData();
                            js.ADD("cust_GetPara(); $(\"#inCode\").attr(\"disabled\", true);");
                        }
                    }
                    else
                    {
                        RecordOperationResult = "err";
                    }


                    break;
                case eRecordOperation.Delete:
                    if (SFObject.returnText(string.Format(@"SELECT 1 FROM [FPTI_NW].[noahweb_Application_Collection] where appid = '{0}'", WebApp.nwobjectText("inCode")), based.SecurityAccess.ConnectionString) == "")
                    {
                        RecordOperationResult = dao.DeleteData(WebApp.nwobjectText("inCode"));
                        js.ADD("ClearFields();");
                        Prompt.Information(RecordOperationResult, based.Title);
                        RefreshData();

                    }
                    else {
                        Prompt.Information("Cannot delete. Module Currently in-use.", based.Title);
                    }
                    break;

                case eRecordOperation.Process:
                    tempstr = "Process";
                    ////Prompt.Information(based.SecurityAccess.ConnectionString, based.Title);
                    break;

                case eRecordOperation.Refresh:
                    js.ADD("ClearFields();");
                    RefreshData();
                    break;
                case eRecordOperation.Inquire:
                    tempstr = "inqure";
                    ////Prompt.Information(based.SecurityAccess.ConnectionString, based.Title);
                    Inquire();
                    // Prompt.Information(tempstr, based.Title);
                    break;

                case eRecordOperation.Import:
                    tempstr = "import";
                    Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Export:
                    tempstr = "export";
                    CreateExportGrid();
                    js.ADD("tableToExcel(\"nwExportContainer\", \"Report\", \"Report\");");
                    
                    break;
                case eRecordOperation.Print:
                    tempstr = "print";
                    CreateExportGrid();
                    js.ADD("tableToPrint(\"nwExportContainer\")");
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
            strFinal += get_Method("getcbo", "", "", "");
            execute(ref strFinal);
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
                    Data_Enable();
                    BindCollection();
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
                    sql = dao.toolboxQRY;
                    strFinal = getToolBoxDataRet(tableName, sql, based.SecurityAccess.ConnectionString, "1", "50");
                    break;

            }

            return strFinal;
        }

        //////////////////////// Common
        private void SetBindings()
        {
            SFObject.SetControlBinding("#inCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "code");
            SFObject.SetControlBinding("#inDesc", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "description");
            SFObject.SetControlBinding("#inAppName", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AppName");
            SFObject.SetControlBinding("#sel_AppVer", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AppLink");

            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "usercreated");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "datecreated");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "usermodified");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "datemodified");


        }
        private void Inquire()
        {
            nwToolBox.bindingNavigatorInquireItem.PrimaryKey = dao.primaryKey;
            //SFObjects.caseSearch(ref dal.CurrentSelectedItem, dal.inquireQry, dal.ConnectionString);
            //Prompt.Information(dal.primaryKey + " " + dal.CurrentSelectedItem, "");
            //BindingNavigator.BindingSource.Position = BindingNavigator.BindingSource.Find(dao.primaryKey, dao.CurrentSelectedItem);
        }
        //private void Export(ListingAndPrint.FormType type)
        //{
        //    string s = SFObjects.returnText("select UPPER(CompanyName) from SG.BIRCASConfig",this.UserDefinedConnectionString);
        //    new NoahUI.ListingAndPrint(type,
        //        dal.listingStartRow, dal.listingQry, dal.listingName, dal.ConnectionString,
        //        s, SFObjects.returnText(String.Format("select description from fpti.[user] where code = '{0}'", based.SecurityAccess.RecUser), this.UserDefinedConnectionString), dao.listingName).ShowDialog();
        //}

        //////////////// end of standard / standard custumize
        private void BindCollection()
        {
            //DisableDescription(isUsed());
        }

        private bool AreValidEntries()
        {
            string errorResult = String.Empty;

            if (SFObject.returnText(string.Format(@"SELECT 1 FROM [FPTI_NW].[noahweb_Application_Info] where code = '{0}'", WebApp.nwobjectText("inCode")), based.SecurityAccess.ConnectionString) == "1" && isNewRow == true)
                errorResult += "Cannot Save. Already exist.\n";

            if (WebApp.nwobjectText("inCode").Equals(string.Empty))
                errorResult += "Cannot Save. Please provide a valid Code.\n";
            else
            {
                if (WebApp.nwobjectText("inCode").Contains(" "))
                    errorResult += "Cannot Save. Code should not contain spaces.\n";
            }
            if (WebApp.nwobjectText("inDesc").Trim().Equals(string.Empty))
                errorResult += "Cannot Save. Please provide a valid Description.\n";

            if (!errorResult.Equals(string.Empty))
                Prompt.Information(errorResult, based.Title);

            return errorResult.Equals(String.Empty);
        }

        private void RefreshData()
        {
            Data_Enable();
            js.ADD("func_Toolbox_Clear();");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")");
        }

        private bool isUsed()
        {
            return false;
        }

        private void DisableDescription(bool x)
        {
            js.makeProp("#inDesc", "disabled", x);
            nwToolBox.bindingNavigatorSaveItem.Enable = !x && based.SecurityAccess.Save;
        }

        private DataTable LoadSchema()
        {
            #region don't change
            DataTable dtData = new DataTable();
            dtData = dao.GetSchema();
            #endregion

            DataRow drDataToAdd = dtData.NewRow();
            drDataToAdd["code"] = WebApp.nwobjectText("inCode");
            drDataToAdd["description"] = WebApp.nwobjectText("inDesc");
            drDataToAdd["AppName"] = WebApp.nwobjectText("inAppName");
            drDataToAdd["AppLink"] = WebApp.nwobjectText("sel_AppVer") == "CUSTOM" ? "" : WebApp.nwobjectText("sel_AppVer");
            drDataToAdd["icon"] = WebApp.nwobjectText("inIcon");
            drDataToAdd["apppath"] = WebApp.nwobjectText("inAppPath");

            #region don't change
            drDataToAdd["userCreated"] = drDataToAdd["userModified"] = based.SecurityAccess.RecUser;
            drDataToAdd["datecreated"] = drDataToAdd["datemodified"] = DateTime.Now; //will be populated as getdate() in sproc


            dtData.Rows.Add(drDataToAdd);
            dtData.AcceptChanges();
            #endregion

            return dtData;
        }


        public void Data_Enable()
        {
            nwToolBox.bindingNavigatorAddNewItem.Enable =
            nwToolBox.bindingNavigatorDeleteItem.Enable =
            nwToolBox.bindingNavigatorDeleteItem.Visible =
            nwToolBox.bindingNavigatorSaveItem.Enable =
                     nwToolBox.bindingNavigatorPrintItem.Enable =
                     nwToolBox.bindingNavigatorInquireItem.Enable =
                     nwToolBox.bindingNavigatorDeleteItem.Enable =
                     nwToolBox.bindingNavigatorExportItem.Enable = true;
            nwToolBox.bindingNavigatorImportItem.Visible = false;
            nwToolBox.bindingNavigatorProcessItem.Visible = false;
        }

        private void CreateExportGrid()
        {
            nwGrid soh = new nwGrid("Export");
            DataTable dt_soh = new DataTable();

            dt_soh = dao.GetALLItems();

            dt_soh.Columns[0].AllowDBNull = true;

            soh.dataSource(dt_soh);
            soh.minRow(dt_soh.Rows.Count);
            soh.RowHeight(25);
            soh.TableHeight(400);
            soh.HeaderTextColor("#323232");
            soh.backgroundColor("#FFFFFF");
            soh.HeaderBackgroundGradientColor("rgb(245, 243, 243)", "rgb(223, 223, 223)");

            soh.nwobject(0).Template("{0}");
            soh.nwobject(1).Template("{1}");
            soh.nwobject(2).Template("{2}");
            soh.nwobject(3).Template("{3}");
            soh.nwobject(4).Template("{4}");
            soh.nwobject(5).Template("{5}");
            soh.nwobject(6).Template("{6}");
            soh.nwobject(7).Template("{7}");

            js.makeHTML("#nwExportContainer", soh.createTable());
            js.makePrepend("#nwExportContainer", "<div><b>"+ based.SecurityAccess.Company +"</b></div>" +
                                                         "<div>"+ dao.listingName +"</div>" +
                                                         "<div>System User: " + dao.GetFullname(based.SecurityAccess.RecUser) + "</div>" +
                                                         "<div>System Date: " + SFObjects.GetServerDateTime(this.UserDefinedConnectionString).ToString("MM/dd/yyyy hh:mm:ss") + "</div>" +
                                                         "<div> </div>");
        }
    }
}
