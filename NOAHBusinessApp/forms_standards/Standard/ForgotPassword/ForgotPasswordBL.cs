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
    public class ForgotPasswordBL : nwAction
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
            dal = new ForgotPasswordDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
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
        ForgotPasswordDAL dal;

        private static int StartIndex = 0,
            SPR_BILLDOCNO = StartIndex,
            SPR_PAYTYPE = ++StartIndex,
            SPR_DATE = ++StartIndex,
            SPR_AMOUNT = ++StartIndex,
            SPR_MOP = ++StartIndex,
            SPR_VIEW = ++StartIndex;
            //SPR_DOWNLOAD = ++StartIndex;

        public ForgotPasswordBL()
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
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;


            
            }

            return strFinal;
        } 

        public void RecordOperation(eRecordOperation i, int Position)
        {
            string tempstr = "";

            switch (i)
            {
                case eRecordOperation.AddNew:
                    //tempstr = "New";
                    //Prompt.Information(tempstr, based.Title);
                    break;

                case eRecordOperation.Save:
                    tempstr = "Save";
                    Prompt.Information(tempstr, based.Title);

                    break;

                case eRecordOperation.Delete:
                    tempstr = "Delete";
                    Prompt.Information(tempstr, based.Title);
                    break;

                case eRecordOperation.Process:
                
                    break;

                case eRecordOperation.Refresh:
                    RefreshData(true);
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
                    RefreshData(true);
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
                case "actUserCode":
                   
                    string user = WebApp.nwobjectText("txtUserCode");
                    DataTable dt =  dal.GetUserCode(user);
                    if (dt.Rows.Count >= 1)
                    {
                        string UserID = user;// dt.Rows[0]["email"].ToString();
                        string tag = "sms";

                        string selectOTPMethod = dal.CheckUser(UserID);
                        string[] OTPMethod = selectOTPMethod.Split(';');
                        if (OTPMethod[0] != "")
                        {
                            tag = "email";
                        }

                        if (OTPMethod[1] != "")
                        {
                            tag = "sms";
                        }

                        string genrateOTP = getMobileOTP((tag == "email" ? 2 : 3));
                        dal.InsertOTP(user, (tag == "email" ? 2 : 3), genrateOTP);

                        string parentAccount = dal.GetParentAccount(UserID);

                        string token = nwSystem.GetGeneralTokenKey(genrateOTP, parentAccount);
                        js.ADD("token='"+ token + "'");
                        js.ADD("userid='" + UserID + "'");
                         if(tag == "email")
                            js.ADD("cuz_CallVerifyEmail()");
                        else if (tag == "sms")
                            js.ADD("cuz_CallVerifySMS()");

                    }
                    else
                    {
                        Prompt.Information("Email/Mobile Number is invalid!","Error");
                    }
                    js.ADD("nwLoading_End('actUserCode')");
                    break;
                case "actOTP":
                    string tokenF = WebApp.nwobjectText("token");
                    string userid = WebApp.nwobjectText("userid");
                    string txtOTP = WebApp.nwobjectText("OTPCode");
                    
                    user = WebApp.nwobjectText("txtUserCode");

                    string strres = dal.ValidateOTP(user, txtOTP,"","");
                    if (strres == "OTP_INVALID")
                    {
                        Prompt.Information("Error: Invalid OTP Code. Please try again.", "Error");
                    }
                    else if (strres == "OTP_EXPIRED")
                    {
                        Prompt.Information("Error: OTP Code Expired. Please request a new one.", "Error");
                    }
                    else
                    {
                        js.ADD("cuz_CallChangePass()");
                    }
                    


                    js.ADD("nwLoading_End('actOTP')");
                    break;
                case "actSubmitChange":

                     string result = ResetPassword();
                    if (result != "")
                    {
                        Prompt.Information(result, "Error");
                    }
                    else
                    {
                        js.ADD("cuz_GoLogin()");
                    }

                    js.ADD("nwLoading_End('actSubmitChange')");
                    break;
                default:
                    Prompt.Information("act_Method not found: " + strMethod, "Error");
                    break;
            }
            return js.makeJSPostScript(execute());
        }
        private const int OTP_EMAIL = 2;
        private const int OTP_SMS = 3;
        private String getMobileOTP(int OTPType)
        {
            var chars = OTPType == OTP_SMS ? "0123456789" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[OTPType == OTP_SMS ? 6 : 8];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            var finalString = new String(stringChars);
            return finalString;
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


                    break;
            }

            return strFinal;
        }

        //////////////////////// Common
        private void SetBindings()
        {
            SFObject.SetControlBinding("#txtCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Code");
            //FOOTER
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recuser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recdate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moduser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moddate");
        }

        private void BindCollection()
        {
            js.ADD("nwLoading_End('xLoading');");
        }


        private void Main_Load()
        {
            if (based.isInterface == true) dal.UpdateVersion();
           
        }


        private void RefreshData(bool isInitialize)
        {
          
        }

   
      
        private void InitializeValues()
        {
            nwToolBox.bindingNavigatorRefreshItem.Enable = true;
        }
       
        NoahWebLib.Security.NOAHEncryptor nwconfig = new NoahWebLib.Security.NOAHEncryptor();
        string ConnectionString = NoahWebLib.nwSystem.ARKDB_ConnectionString();
        public string ResetPassword()
        {
            string lblMsg_Text = "";
            string txtOldPass_Text = "";
            string txtNewPass_Text = "";
            string txtConfirm_Text = "";
            string strKey = "";

            string RecUser = "";
            string encryptedpass = "";
            string errorResult = "";

            string tokenF = WebApp.nwobjectText("token");
            nwSystem.TokenKeyValue tokenkey = nwSystem.GetGeneralTokenKeyValue(tokenF);
            RecUser = tokenkey.user;

            try
            {
                txtNewPass_Text = WebApp.nwobjectTextSQL("txtPassword1");
            }
            catch { }
            try
            {
                txtConfirm_Text = WebApp.nwobjectTextSQL("txtPassword2");
            }
            catch { }


 


            string strSql = "";
            strSql = "Select password from [FPTI].[user] where code='" + RecUser + "'";

            strSql = SFObjects.returnText(strSql, ConnectionString);
            txtOldPass_Text = strSql;

            try
            {
                
                if (strSql == txtOldPass_Text || 1 == 1)
                {

                    if (txtNewPass_Text == "")
                    {
                        lblMsg_Text = "New Password is required";
                    }
                    else if (txtConfirm_Text == "")
                    {
                        txtNewPass_Text = "Confirm Password is required";
                    }
                    else if (txtNewPass_Text == txtConfirm_Text)
                    {
                        bool isSave = true;
                        encryptedpass = nwconfig.EncryptToString(txtNewPass_Text);
                        string pwdhistory = SFObjects.returnText("SELECT [value] FROM [dbo].[SystemConfig] WHERE Code = 'PWDHISTORY'", ConnectionString);
                        if (pwdhistory != "0" && pwdhistory != "")
                        {
                            //DataTable dt = SFObjects.LoadDataTable("SELECT TOP " + pwdhistory + " [Password] FROM  [FPTI].[UserH] WHERE [UserCode] = '" + RecUser + "' ORDER BY Recdate DESC", ConnectionString);
                            System.Data.DataTable dt = SFObjects.LoadDataTable("SELECT TOP " + pwdhistory + " [Password] FROM FPTI.[User_Hist] WHERE [Code] = '" + RecUser + "' and LastPasswordChanged is not null ORDER BY isnull(Moddate, Recdate) DESC", ConnectionString);

                            if (dt.Rows.Count > 0)
                            {
                                foreach (System.Data.DataRow dr in dt.Rows)
                                {
                                    if (dr[0].ToString() == encryptedpass)
                                    {
                                        isSave = false;
                                        lblMsg_Text = "Password has been already used.";
                                    }
                                }
                            }
                        }

                        errorResult += validatepasswordcharacters(txtNewPass_Text);

                        string len = string.Empty;
                        if (!string.IsNullOrEmpty(CheckMinimumLength(2, txtNewPass_Text.Length, "Password", ref len)))
                            errorResult += "Password length must be atleast " + len + " characters.\n";

                        if (!errorResult.Equals(string.Empty))
                        {
                            isSave = false;
                            errorResult = "Cannot Save.\n" + errorResult;
                            lblMsg_Text = errorResult;
                        }


                        if (isSave)
                        {


                            string passwordcolx = "";
                            string passwordcolxencrypt = "";
                            try
                            {
                                passwordcolx = txtNewPass_Text;
                            }
                            catch { }


                            passwordcolxencrypt = encryptedpass;
                            string responseString = "";
                            string randomstring = NoahWebLib.nwSystem.RandomStrings(30);
                            string Username = RecUser;

                       

                            string OldPassword = "";
                            string Password = passwordcolx;

                            strSql = "Select [Password] FROM FPTI.[User] where code = '" + Username + "' ";
                            OldPassword = SFObjects.returnText(strSql, ConnectionString);
                            OldPassword = nwSystem.StringDecrypt(OldPassword);

                            string values = randomstring + "#@#" + Username + "#@#" + OldPassword + "#@#" + Password;
                            values = NoahWebLib.nwSystem.StringEncryptAES(values, true);

                            int istrycount = 0;

                            do
                            {
                                istrycount += 1;
                                string url = nwSystem.GetAppSettings("NOAHLink") + "/Account/ResetPasswordUser/?toks=" + Uri.EscapeUriString(values) + "&s=" + Uri.EscapeUriString(randomstring);
                                try
                                {
                                    var client = new HttpUtils.APIM.RestClient();
                                    client.EndPoint = url;
                                    client.Method = HttpVerb.POST;
                                    client.PostData = "";// "{\"data\": \"" + values +  "\"}";

                                    var json = client.MakeRequest();
                                    responseString = json;
                                }
                                catch (Exception err)
                                {

                                }

                                nwSystem.CreateLogs("URL:" + url + "|resposnse:" + responseString);


                                if (responseString.Trim() == "200")
                                {
                                    istrycount += 1;
                                    string emailUser = Username;
                                    strSql = "Update  [FPTI].[user] set password ='" + encryptedpass + "',InitialLogin = 0,LastPasswordChanged=dbo.GetNoahDate(),AccountDisabled=0 where code='" + emailUser + "'";

                                    SFObjects.ExcuteQuery($"delete FPTI_NW.UserAttempt where userid='{emailUser}' and inType = 'ATTEMPTPASS'", ConnectionString);

                                    strSql = SFObjects.returnText(strSql, ConnectionString);
                                    InsertOnUserH(emailUser, nwconfig.EncryptToString(txtNewPass_Text));
                                    InsertOnUserHist(emailUser, nwconfig.EncryptToString(txtNewPass_Text));
                                    lblMsg_Text = strSql;


                                    if (strKey.Trim() != "")
                                    {
                                        strSql = "Update [FPTI_NW].[ResetPassword] set IpChange ='" + nwSystem.GetClientIPAddress() + "' , tag =1,changeDate = dbo.GetNoahDate() where Recuser='" + emailUser + "' and [Key] ='" + strKey + "'";
                                        strSql = SFObjects.returnText(strSql, ConnectionString);

                                    }
                                    lblMsg_Text = "";

                                    //mainDataAccess db = new mainDataAccess();
                                    //string str = generateLoginKey(RecUser);
                                    //if (strReq != "")
                                    //{
                                    //    strReq = strReq + "&" + str;
                                    //}
                                    //else
                                    //{
                                    //    strReq = "?" + str;
                                    //}
                                    //Response.Redirect("default" + strReq); // baka balikan
                                }
                                else
                                {
                                    if (istrycount <= 1)
                                    {
                                        SFObjects.ExcuteQuery($@"update [dbo].[AspNetUsers]
                                    set UserName = UserName + '_+_' + FORMAT(dbo.GetNoahDate(), 'yyyy-MM-dd-HH-mm-sss')
                                    where UserName = '{Username}'", ConnectionString);
                                    }
                                    else
                                    {
                                        lblMsg_Text = "Error occur. Error in Form Login" + responseString;
                                    }
                                }
                               
                            } while (istrycount < 2);


                        }
                    }
                    else
                    {
                        lblMsg_Text = "Confirm Password doesn't match";
                    }
                }
                else
                {

                    lblMsg_Text = "Cannot proceed. Old password entered is incorrect.";

                }

            }
            catch
            {
                lblMsg_Text = "Error occur. Kindly Re-login Again";
            }

            //Response.Write("{\"status\":" + (lblMsg_Text.Trim() == "" ? "200" : "400") + ",\"message\":\"" + lblMsg_Text + "\"}");
            return lblMsg_Text;
        }
        private string CheckMinimumLength(int Type, int length, string Type2, ref string templength)
        {
            try
            {
                string query = string.Empty;
                if (Type == 1)
                {
                    query = string.Format(@"SELECT [value] FROM [dbo].[SystemConfig] where code ='MINUSERID'");
                }
                else
                {
                    query = string.Format(@"SELECT [value] FROM [dbo].[SystemConfig] where code ='MINUSERPWD'");
                }
                templength = SFObjects.returnText(query, ConnectionString);
                if (string.IsNullOrEmpty(templength) || templength == "0")
                { return ""; }
                else
                {
                    if (length < Int32.Parse(templength))
                    {
                        return string.Format(@"Invalid {0} Length", Type2);
                    }
                    else { return ""; }
                }
            }
            catch
            {
                return "";
            }


        }

        private string validatepasswordcharacters(string xpassword)
        {
            string xret = "";
            try
            {
                NoahWebLib.Security.nwConfiguration nwSecurity = new NoahWebLib.Security.nwConfiguration();
                try
                {
                    xpassword = nwSecurity.nwDecrpytString(xpassword);
                }
                catch { }

                string query = string.Format(@"SELECT [value] FROM [dbo].[SystemConfig] where code ='PWDCONTAIN'");
                string passcontain = SFObjects.returnText(query, ConnectionString);
                //string xpassword = WebApp.nwobjectText("inPassword");
                bool xA = false;
                bool xN = false;
                bool xC = false;
                bool xU = false;
                bool xL = false;
                if (passcontain.Contains('A'))
                {
                    xA = true;
                }
                if (passcontain.Contains('N'))
                {
                    xN = true;
                }
                if (passcontain.Contains('C') || passcontain.Contains('S'))
                {
                    xC = true;
                }
                if (passcontain.Contains('U'))
                {
                    xU = true;
                }
                if (passcontain.Contains('L'))
                {
                    xL = true;
                }

                if (!chkpassword(xpassword, 1) && xA)
                    xret += "Password must contain alphabet characters \n";
                if (!chkpassword(xpassword, 2) && xN)
                    xret += "Password must contain numeric characters \n";
                if (!chkpassword(xpassword, 3) && xC)
                    xret += "Password must contain special characters \n";
                if (!chkpassword(xpassword, 4) && xU)
                    xret += "Password must contain upper case characters \n";
                if (!chkpassword(xpassword, 5) && xL)
                    xret += "Password must contain lower case characters \n";

            }
            catch
            {
                return "";
            }


            return xret;


        }

        private bool chkpassword(string xpasswrd, int type)
        {
            int maxletters = xpasswrd.Length;
            switch (type)
            {
                case 1:
                    for (int i = 0; i < maxletters; i++)
                    {
                        if (char.IsLetter(xpasswrd[i]))
                        {
                            return true;
                        }
                    }
                    break;

                case 2:
                    for (int i = 0; i < maxletters; i++)
                    {
                        if (char.IsNumber(xpasswrd[i]))
                        {
                            return true;
                        }
                    }
                    break;

                case 3:
                    for (int i = 0; i < maxletters; i++)
                    {
                        if (!char.IsLetter(xpasswrd[i]))
                        {
                            if (!char.IsNumber(xpasswrd[i]))
                            {
                                return true;
                            }
                        }
                    }
                    break;
                case 4:  // uppercase
                    for (int i = 0; i < maxletters; i++)
                    {
                        if (char.IsUpper(xpasswrd[i]))
                        {
                            return true;
                        }
                    }
                    break;
                case 5:  // lowwercase
                    for (int i = 0; i < maxletters; i++)
                    {
                        if (char.IsLower(xpasswrd[i]))
                        {
                            return true;
                        }
                    }
                    break;
            }

            return false;
        }


        private void InsertOnUserH(string RecUser, string Password)
        {
            string query = string.Format(@"INSERT INTO [FPTI].[UserH]
                             VALUES ('{0}', '{1}', dbo.getNoahDate())

                             SELECT TOP 3 * INTO #pwdHistory FROM [FPTI].[UserH]
                             WHERE UserCode = '{0}' ORDER BY Recdate DESC

                             DELETE FROM [FPTI].[UserH]
                             WHERE NOT EXISTS (SELECT * FROM #pwdHistory) 

                             DROP TABLE #pwdHistory ", RecUser, Password);
            string xret = SFObjects.returnText(query, ConnectionString);

        }
        private void InsertOnUserHist(string RecUser, string Password)
        {
            string query = string.Format(@"declare @Get_Password varchar(MAX), @Get_LastPasswordChanged datetime
                    declare @Code varchar(max)= '{0}',@Password varchar(max)= '{1}'
		            SELECT TOP 1  @Get_Password = [Password] from FPTI.[User_Hist] where Code = @Code order by isnull(Moddate, Recdate) DESC

		            INSERT INTO FPTI.[User_Hist]
		            ([Code], [Description], [Password], [HasAccessToUtility], [RecUser], [RecDate], [ModUser], [ModDate]
		            ,PowerUser,AccountDisabled,InitialLogin, LastPasswordChanged, [HistoryStatus] ) 

		            select [Code], [Description], [Password], [HasAccessToUtility], [RecUser], [RecDate], [ModUser], [ModDate]
		            ,PowerUser,AccountDisabled,InitialLogin, LastPasswordChanged, 'MODIFIED' from FPTI.[User] where Code = @Code", RecUser, Password);
            string xret = SFObjects.returnText(query, ConnectionString);

        }


    }
}