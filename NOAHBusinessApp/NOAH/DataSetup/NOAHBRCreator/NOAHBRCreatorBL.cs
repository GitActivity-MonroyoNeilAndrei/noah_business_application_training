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


//
//

using DataAccessLayers;
using DALComponent;
using System.Text.RegularExpressions;


namespace Noah_Web.forms_BusinessLayer
{
    public class NOAHBRCreatorBL : nwAction
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
            
            

            dal = new NOAHBRCreatorDAL(based.SecurityAccess.ConnectionString, this.UserDefinedConnectionString,""); 

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
       
        NOAHBRCreatorDAL dal;
        public NOAHBRCreatorBL()
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

            switch (i)
            {
                case eRecordOperation.AddNew:
                    break;
                case eRecordOperation.Save:
                    break;
                case eRecordOperation.Delete:
                    break;
                case eRecordOperation.Process:
                    break;
                case eRecordOperation.Refresh:
                    break;
                case eRecordOperation.Inquire:
                    break;
                case eRecordOperation.Import:
                    break;
                case eRecordOperation.Export:
                    break;
                case eRecordOperation.Print:
                    break;
                case eRecordOperation.Closing:
                    break;
                case eRecordOperation.Search:
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
                   
                break;

            }
            return js.makeJSPostScript("try{"+execute()+"}catch(err){alert(err);}");
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
                    standardBL.PrimaryKey = "Code";
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", sql, based.SecurityAccess.ConnectionString);
                    break;
               
            }

            return strFinal;
        }
        private void Main_Load()
        {
            if(based.isInterface) dal.UpdateVersion();

            DataSet ds =  dal.getComponents();
            ds.Tables[0].TableName = "ObjectList";

            js.ADD("jsonBRCompList=" + nwSystem.GetDataSetToJSON(ds));
            js.ADD("noah_ObjectTools()");
            return;
        }

       
        private void SetBindings()
        {
            //SFObject.SetControlBinding("#inCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Code");
            //SFObject.SetControlBinding("#inDesc", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Description");
            //SFObject.SetControlBinding("#inPassword", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Password");
            //SFObject.SetControlBinding("#inCheck1", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "HasAccessToUtility");
            //SFObject.SetControlBinding("#inCheck2", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "PowerUser");
            //SFObject.SetControlBinding("#inCheck3", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "AccountDisabled");
            //SFObject.SetControlBinding("#inCheck4", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "InitialLogin");
           
            //SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "RecUser");
            //SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "RecDate");
            //SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "ModUser");
            //SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "ModDate");

        }
   




    }
}





