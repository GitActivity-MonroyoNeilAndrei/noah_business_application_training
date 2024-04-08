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
    public class PMORegistrationBL : nwAction
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
        bool isNewRow2;
        string ToolboxOrderData = ""; // toolbox Orderby

        DataTable emptyDT = new DataTable();
        int FirstFlg = 0;

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

        public static string imagePath;
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
            dal = new PMORegistrationDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
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
        PMORegistrationDAL dal;
        int xtotalrecords = 0;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();

        public PMORegistrationBL()
        {
            //dal = new DataAccessLayer(this.UserDefinedConnectionString,""); 
        }

        public string get_Initialize()
        {
            string strFinal = "";

            SetBindings();
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

            string strFinal = "";
            string strSQL = "";
            string mouseDownFunc = "";
            string mouseOverFunc = "";
            string strName = "";
            strConn = this.UserDefinedConnectionString;

            //switch (strMethod)
            //{

            //    case "getlugProperty":
            //        strSQL = dal.getProperty();
            //        strMethod = strMethod.Substring(3);
            //        strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);

            //        break;

            //    case "getlugCustomerType":
            //        strSQL = dal.getCustomertype();
            //        strMethod = strMethod.Substring(3);
            //        strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
            //        break;

            //    case "gettoolboxInquire":
            //        strSQL = dal.inquireQuery(based.SecurityAccess.RecUser);
            //        strMethod = strMethod.Substring(3);
            //        strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
            //        break;

            //}

            return strFinal;
        }

        ///// Standard RecordOperation 

        private void InitializeValues()
        {
            


        }


        public void RecordOperation(eRecordOperation i, int Position)
        {
            string tempstr = "";

            RecordOperationResult = String.Empty;

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

           

                    InitializeValues();

                    /*js.ADD("AA()");*/

                    break;

                case eRecordOperation.Save:
                    //RecordOperationResult = ValidateData();

                    //if (RecordOperationResult.Length <= 0)
                    //{
                    //    DataTable dt = LoadSchema();
                    //    RecordOperationResult = dal.SaveData(dt, isNewRow);
                    //    nwToolBox.bindingNavigatorDeleteItem.Enable = true;

                    //}
                    //nwToolBox.bindingNavigatorDeleteItem.Enable = true;

                    //if (RecordOperationResult.IndexOf("Error") != 0)
                    //{
                    //    string eventCode = WebApp.nwobjectText("txtCode");
                    //    string primarykey = dal.getID(eventCode);
                    //    string primarykey = dal.getID(based.SecurityAccess.RecUser);


                    //    string Code = WebApp.nwobjectText("codevalue");

                    //    js.ADD($"func_nwkInquire('{primarykey}');");
                    //    js.ADD($"func_nwSTDButton('save')");
                    //}

                    //else
                    //    RecordOperationResult = RecordOperationResult.Insert(0, "Error(s) Found:\n");

                    break;

                case eRecordOperation.Delete:
                    RecordOperationResult = dal.DeleteData(WebApp.nwobjectText("txtID"),
                                                           based.SecurityAccess.RecUser);
                    break;

                case eRecordOperation.Process:
                    tempstr = "Process";
                    Prompt.Information(tempstr, based.Title);
                    break;

                case eRecordOperation.Refresh:
                    RefreshData();
                    js.makeProp("#txtCode", "disabled", true);
                    break;
                case eRecordOperation.Inquire:
                    tempstr = "inqure";
                    Inquire();
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
                                                           (ListingAndPrint.FormType.Listing, dal.LISTINGSTARTROW, dal.LISTINGQUERY(based.SecurityAccess.RecUser),
                                                           LISTINGFILENAME, UserDefinedConnectionString, SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString),
                                                           based.SecurityAccess.RecUserName, LISTINGFILENAME);

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
                if (RecordOperationResult.IndexOf("Error") != 0 && RecordOperationResult.IndexOf("Cannot") != 0)
                {
                    js.ADD(" loc_LookupInquireWithValue('" + WebApp.nwobjectText("idvallugEvent") + "'); ");
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
            try
            {
                isNewRow2 = WebApp.nwobjectBool("isNewRow2");
            }
            catch { }
            string strf2 = "";
            string strFinal = "", strSQL = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (strMethod)
            {
                case "actBindCollection":
                    //Data_Enable();
                    BindCollection();
                    js.ADD("nwLoading_End('xBindDone');");
                    break;

                case "actBindCollectionEmpty":
                    js.ADD("nwLoading_End('xBindEmpty')");
                    break;
                case "actGetAccountProperties":
                    GetAccountProperties();
                    break;

                case "actGetCustomerType":
                    GetCustomerType();
                    break;

                case "actValidatePropertyInfo":
                    ValidatePropertyInfo();
                    break;

                case "actValidateEmailMobile":
                    ValidateEmailMobile();
                    break;

                case "actValidateEmail":
                    ValidateUserEmail();
                    break;

                case "actValidateUserInfo":
                    ValidateUserInfo();
                    break;

                case "actResendOTPCode":
                    ResendOTPCode();
                    break;

                case "actValidateOTP":
                    ValidateUserOTP();
                    break;

                case "actSaveRegistration":
                    SaveRegistration();
                    break;

                default:
                    Prompt.Information("act_Method not found: " + strMethod, "Error");
                    break;
            }
            return js.makeJSPostScript(execute());
        }

        public void GetAccountProperties()
        {
            string AccountNo = WebApp.nwobjectText("UserAccountNo");
            string accCode = "";
            foreach (char c in AccountNo)
            {
                if (Char.IsLetter(c))
                {
                    accCode += c;
                }
            }
            DataTable DTProperties = dal.getPropertiesByAccNo(accCode);

            js.ADD("nwLoading_End('actGetAccountProperties');");

            try
            {
                if (DTProperties.Rows.Count == 0)
                {
                    clearPropertyList();
                }
                else
                {
                    clearPropertyList();

                    js.ADD("$('#PropErrMessage').addClass('rgf-invi');");
                    js.ADD("$('#PropErrMessage').html('')");
                    js.makeComboBox("#cmbProperty", DTProperties);
                    js.ADD("$('#cmbProperty').val('');");
                }
            } catch {
                clearPropertyList();
            }
           
        }

        public void clearPropertyList()
        {
            js.ADD("$('#cmbProperty').val('');");
            js.ADD("$('#cmbProperty').empty();");
            
            js.ADD("$('#txtCustomerCode').val('');");
            js.ADD("$('#txtCustomerType').val('');");
            js.ADD("checkPropertyFields();");
        }

        public void GetCustomerType()
        {
            string AccountNo = WebApp.nwobjectText("UserAccountNo");
            string AccountProperty = WebApp.nwobjectText("UserProperty");

            string result = dal.getPropertyInfo(AccountNo, AccountProperty);

            string[] tmpResult = result.Split('|');

            js.ADD("nwLoading_End('actGetCustomerType');");

            if (result == "404")
            {
                js.ADD("$('#txtCustomerCode').val('');");
                js.ADD("$('#txtCustomerType').val('');");
                js.ADD("checkPropertyFields();");

                js.ADD("$('#PropErrMessage').removeClass('rgf-invi');");
                js.ADD("$('#PropErrMessage').html('Property Information not Found!');");
            }
            else
            {
                js.ADD($"$('#txtAccName').val('{tmpResult[0]}');");
                js.ADD($"$('#txtCustomerCode').val('{tmpResult[1]}');");
                js.ADD($"$('#txtCustomerType').val('{tmpResult[2]}');");

                js.ADD("checkPropertyFields();");
            }
        }

        public void ValidateUserEmail()
        {
            string userEmail = WebApp.nwobjectText("userEmail");
            string result = dal.UserLoginCheck(userEmail);
            string finResult = "";

            string pass = WebApp.nwobjectText("txtPassword");

            string oldpass = dal.GetPassword(userEmail);
            string _password = nwSystem.StringDecrypt(oldpass);
            bool error = false;

            if (_password != pass)
            {
                error  = true;
            }
            else
            {
                error = false;
            }


            if (result == "0" || result == "")
            {
                finResult = "404";
            }
            else if(error == true)
            {
                finResult = "405";
            }

            if (result == "1" && error == false)
            {
                DataTable userDetails = dal.GetUserLoadedData(userEmail);

                if (userDetails.Rows.Count > 0)
                {
                    finResult = userDetails.Rows[0]["Description"] + "|" + userEmail + "|" + userDetails.Rows[0]["MobileNum"];
                }
                
                //resultData.UserName = userDetails[0];
                //resultData.Mobile = userDetails[1];
                //resultData.UserResult = result;
            }
           
            js.ADD($"validateEmailDone('{finResult}');");
        }

        private void ValidatePropertyInfo()
        {
            string status = "200";
            string AccountNo = WebApp.nwobjectText("UserAccountNo");
            string AccountProperty = WebApp.nwobjectText("UserProperty");

            string[] result = new string[3];

            result = dal.CheckBackOfficeData(AccountNo, AccountProperty);

            status = result[0];

            js.ADD("nwLoading_End('actValidatePropertyInfo');");
            
            if (status == "1")
            {
                string regStatus = dal.CheckPendingRegistration(AccountNo);
                string regName = dal.getAccName(AccountProperty, AccountNo);

                regStatus = regStatus == "" ? "1" : regStatus;
                status = regStatus;

                if (status == "1")
                {
                    js.ADD($"$('txtAccName').val('{regName}');");

                    string path = "";
                    path = dal.getPath(AccountProperty);
                    js.makeValueText("#txtServerPath", path);
                }
            }

            switch(status)
            {
                case "0":
                    js.ADD("showPropertyError('Account number does not exist.');");
                    break;
                case "1":
                    js.ADD("proceedToNextTab();");
                    break;
                case "2":
                    js.ADD("showPropertyError('Account number is awaiting registration approval.');");
                    break;
                case "3":
                    js.ADD("showPropertyError('Account number is already registered.');");
                    break;
                default:
                    js.ADD("showPropertyError('Unknown error occured.');");
                    break;

            }
        }

        public void ValidateEmailMobile()
        {
            string UserEmail = WebApp.nwobjectText("UserEmail");
            string UserMobile = WebApp.nwobjectText("UserMobile");

            string EmailResult = dal.UserRegCheck(UserEmail);
            string MobRegCheck = dal.MobRegCheck(UserMobile);

            js.ADD("nwLoading_End('actValidateEmailMobile');");

            if (EmailResult != "0")
            {
                string status = "200";
                string result = dal.UserLoginCheck(EmailResult);

                if (result == "0" || result == "")
                {
                    status = "404";
                }

                if (status == "200")
                {
                    js.ADD("showUserInfoError('Your Email address is already registered.');");
                }
                else
                {
                    js.ADD("showUserInfoError('Your Email address is under approval process.');");
                }
            }
            else
            {
                switch (MobRegCheck)
                {
                    case "3":
                        js.ADD("showUserInfoError('Your Mobile number is already registered.');");
                        break;
                    case "2":
                        js.ADD("showUserInfoError('Your Mobile number is under registration approval.');");
                        break;
                    case "1":
                        js.ADD("proceedToNextTab();");
                        break;
                    default:
                        js.ADD("showUserInfoError('Unknown error occured.');");
                        break;
                }
            }
        }

        public void ResendOTPCode()
        {
            string UserEmail = WebApp.nwobjectText("UserEmail");
            string UserMobile = WebApp.nwobjectText("UserMobile");
            string UserProperty = WebApp.nwobjectText("UserProperty");

            bool clickedResend = WebApp.nwobjectBool("OptionResend");

            string OTPCode = getMobileOTP(3);
            string insertOK = dal.ResendRegOTP(UserEmail, UserMobile, UserProperty, OTPCode);
            

            if (insertOK == "")
            {
                if (!clickedResend)
                {
                    js.ADD("nwLoading_End('actResendOTPCode');");
                    js.ADD("proceedToOTP('.rgf-container');");
                }
                else
                {
                    js.ADD("nwLoading_End('actResendOTPCode');");
                    js.ADD("startResendTimer();");//start timer here
                }
            }
            else
            {
                js.ADD("$('#OTPErrMessage').removeClass('rgf-invi');");
                js.ADD("$('#OTPErrMessage').val('Error occurred in processing OTP Code');");
            }
        }

        private String getMobileOTP(int OTPType)
        {
            var chars = OTPType == 3 ? "0123456789" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[OTPType == 3 ? 6 : 8];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            var finalString = new String(stringChars);

            return finalString;
        }

        public void ValidateUserOTP()
        {
            string userOTP = WebApp.nwobjectText("userOTP");
            string userEmail = WebApp.nwobjectText("userEmail");
            string result = dal.ValidateOTP(userEmail, userOTP);
            
            js.ADD("nwLoading_End('actValidateOTP');");
            js.ADD($"validateOTPDone('{result}');");
        }

        public void SaveRegistration()
        {
            string[] result = new string[2];
            bool NewAccount = WebApp.nwobjectBool("UserNewAccount");

            string infoAccountNo, infoProperty, infoCustType, infoName, infoEmail, infoMobile, infoIDPath, infoSelfiePath;
            infoAccountNo = WebApp.nwobjectText("infoAccNo").ToUpper();
            infoProperty = WebApp.nwobjectText("infoProp").ToUpper();
            infoCustType = WebApp.nwobjectText("infoCust").ToUpper();
            infoName = WebApp.nwobjectText("infoName");
            infoEmail = WebApp.nwobjectText("infoEmail").ToLower();
            infoMobile = WebApp.nwobjectText("infoMobile");
            infoIDPath = WebApp.nwobjectText("infoProofPic");
            infoSelfiePath = WebApp.nwobjectText("infoSelfiePic");

            string regToken = dal.getRegToken(infoAccountNo.ToUpper(), true, "86400");

            result = dal.RegisterNew(infoAccountNo, infoName, infoEmail, infoMobile, infoProperty, infoCustType, regToken, NewAccount ? "1" : "0", infoIDPath, infoSelfiePath);

            js.ADD("nwLoading_End('actSaveRegistration');");

            if (result.Length > 0)
            {
                bool sendConfirm = dal.SendRegConfirmation(infoEmail, infoProperty);
                js.ADD($"$('#txtRef').html('{result[1]}');");
                js.ADD("proceedToOTP('.otp-container');");
            }
            else
            {
                js.ADD("showOTPError('Registration failed. Please contact customer support.');");
            }
        }

        public string getToolBoxData(string tableName, string getMethod, string strParameter, string strValue)
        {
            string strFinal = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (getMethod)
            {
                case "toolbox":
                    string Code = WebApp.nwobjectText("codevalue");

                    nwStandardBL standardBL = new nwStandardBL(WebApp);
                    standardBL.PrimaryKey = "TraineeID";
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(based.SecurityAccess.RecUser, Code), this.UserDefinedConnectionString);
                    
                    break;
            }

            return strFinal;
        }

        public void ValidateUserInfo()
        {
            string userEmail = WebApp.nwobjectText("dataEmail");
            string result = dal.UserLoginCheck(userEmail);
            js.ADD($"validateUserDone('{result}');");
        }

        

        private string DatatableToJson(DataTable dt)
        {
            return JsonConvert.SerializeObject(dt);
        }

        //////////////////////// Common
        private void SetBindings()
        {
            SFObject.SetControlBinding("#txtID", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "TraineeID");
            SFObject.SetControlBinding("#txtCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "EventID");
            SFObject.SetControlBinding("#txtDes", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "EventDes");
            SFObject.SetControlBinding("#txtEmail", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Email");
            SFObject.SetControlBinding("#txtLastName", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "lastname");
            SFObject.SetControlBinding("#txtFirstName", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "firstname");
            SFObject.SetControlBinding("#txtMidName", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "middlename");
            SFObject.SetControlBinding("#rdo1", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "female");
            SFObject.SetControlBinding("#rdo2", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "male");
            SFObject.SetControlBinding("#txtAge", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "age");
            SFObject.SetControlBinding("#txtPosition", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Position");
            SFObject.SetControlBinding("#txtCompany", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Company");
            SFObject.SetControlBinding("#idvallugProvince", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Province");
            SFObject.SetControlBinding("#descvallugProvince", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "ProvinceDes");
            SFObject.SetControlBinding("#idvallugRegion", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Region");
            SFObject.SetControlBinding("#descvallugRegion", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RegionDes");
            SFObject.SetControlBinding("#txtAddress", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Address");
            SFObject.SetControlBinding("#chk5", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "ticked");
            SFObject.SetControlBinding("#txtAgreement", "text", "", "#noah-webui-Toolbox-BindingNavigator", "DataPrivacy");
            SFObject.SetControlBinding("#txtConfirmation", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Confirmation");
            //FOOTER
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "recuser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "recdate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "moduser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "moddate");

            
        }



        



        private void Inquire()
        {

        }

        private void BindCollection()
        {

        }


        
        string picChange(object img)
        {
            string strFinal = "";
            try
            {
                if (img != null)
                {
                    var b64String = Convert.ToBase64String((byte[])img);
                    var dataUrl = "data:image/png;base64," + b64String;
                    strFinal = dataUrl;


                }
            }
            catch (Exception e)
            {
                //strFinal = e.ToString();
            }
            return strFinal;
        }

       

        private string ValidateData()
        {
            string errorResult = String.Empty;

            if (WebApp.nwobjectText("infoProp").Length <= 0)
                errorResult += "Cannot be Saved. Property is required.\n";

            if (WebApp.nwobjectText("infoCust").Length <= 0)
                errorResult += "Cannot be Saved. Customer Type is required.\n";

            if (WebApp.nwobjectText("infoAccNo").Length <= 0)
                errorResult += "Cannot be Saved. Account Number is required.\n";

            if (WebApp.nwobjectText("infoName").Length <= 0)
                errorResult += "Cannot be Saved. Name is required.\n";

            if (WebApp.nwobjectText("infoEmail").Length <= 0)
                errorResult += "Cannot be Saved. Email is required.\n";

            if (WebApp.nwobjectText("infoMobile").Length <= 0)
                errorResult += "Cannot be Saved. Mobile No is required.\n";

            //if (WebApp.nwobjectText("ProofID").Length <= 0)
            //    errorResult += "Cannot be Saved. Proof of ID is required.\n";

            //if (WebApp.nwobjectText("ProofSelfie").Length <= 0)
            //    errorResult += "Cannot be Saved. Proof of Selfie is required.\n";

            
            return errorResult;
        }



        private bool isUsed()
        {
            return false;
        }

        private void DisableDescription(bool x)
        {
            // based.
            js.makeProp("#inDesc", "disabled", x);
        }

        private DataTable LoadSchema()
        {
            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadSchema();
            #endregion
            DataRow dr = dtHDR.NewRow();
            //dr["TraineeID"] = WebApp.nwobjectText("txtID");
            dr["PropertyName"] = WebApp.nwobjectText("infoProp");
            dr["CustomerType"] = WebApp.nwobjectText("infoCust");
            dr["AccountNo"] = WebApp.nwobjectText("infoAccNo");
            dr["Name"] = WebApp.nwobjectText("infoName");
            dr["EmailAddress"] = WebApp.nwobjectText("infoEmail"); 
            dr["MobileNo"] = WebApp.nwobjectText("infoMobile");
            
            dtHDR.Rows.Add(dr);

            #region don't change
            dtHDR.AcceptChanges();
            #endregion

            return dtHDR;
        }

        private void SaveData()
        {
            RecordOperationResult = ValidateData();

            if (RecordOperationResult.Length <= 0)
            {
                DataTable dt = LoadSchema();
                RecordOperationResult = dal.SaveData(dt);
            }
            else
            {
                Prompt.Error(RecordOperationResult, based.Title);
            }
            //nwToolBox.bindingNavigatorDeleteItem.Enable = true;

        }


        public void Data_Enable()
        {
            nwToolBox.bindingNavigatorAddNewItem.Enable =
                // nwToolBox.bindingNavigatorSaveItem.Enable =
                nwToolBox.bindingNavigatorPrintItem.Enable =
                nwToolBox.bindingNavigatorInquireItem.Enable =
                nwToolBox.bindingNavigatorDeleteItem.Enable = true;
            nwToolBox.bindingNavigatorExportItem.Enable = false;

            nwToolBox.bindingNavigatorImportItem.Visible =
                nwToolBox.bindingNavigatorProcessItem.Visible = false;
        }

        private void Main_Load()
        {
            #region Disabled standard button
            nwToolBox.bindingNavigatorInquireItem.Enable = true;
            nwToolBox.bindingNavigatorSaveItem.Enable = true;
            nwToolBox.bindingNavigatorDeleteItem.Enable = false;
            #endregion
            js.ADD("$(\"#idvallugProperty\").focus();");

            if (based.isInterface == true) dal.UpdateVersion();
            string TAC = dal.getDataPrivacy();
            //InitializeValues();
            //LoadComboBox();
            js.makeValueText("#txtDPP", TAC);
            js.ADD("generateTAC();");
        }


        private void LoadComboBox()
        {
            DataTable dtProperty = dal.getPropertyList();
            DataTable dtCustType = dal.getCustomerTypes();

            js.makeComboBox("#cmbProperty", dtProperty);
            js.makeComboBox("#cmbCustomer", dtCustType);
            //js.makeHTML("#selField", nwObject.make_OptionLookup("Select 0 , 'Multiply'", this.UserDefinedConnectionString, null));
        }



        private void RefreshData()
        {
            js.ADD("ClearFields();");
            js.ADD("func_Toolbox_Clear();");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")"); // goto: getToolBoxData
            //js.ADD("DisableFieldsDone()");

        }

        public int MaxRecordIndex;



    }
}