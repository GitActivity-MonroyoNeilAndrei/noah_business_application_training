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
using System.Web.Configuration;
using System.Data.SqlClient;

namespace Noah_Web.forms_BusinessLayer
{
    public class HomeBL : nwAction
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
            dal = new HomeDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
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
        string name = "";
        string RecordOperationResult = String.Empty;
        string InfoOperationResult = String.Empty;
        HomeDAL dal;
        int xtotalrecords = 0;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();
        public string get_Initialize()
        {
            string strFinal = "";
            
            Main_Load();

            execute(ref strFinal);

            return js.makeJSPostScript(strFinal);
        }
        public HomeBL()
        {
            //dal = new DataAccessLayer(this.UserDefinedConnectionString,""); 
        }

        public string act_Method(string strMethod, string strParameter, string strValue)
        {
            string strFinal = "", strSQL = "";
            WebApp = new WebApplib(strParameter, strValue);
            
            switch (strMethod)
            {
                //Logout

                case "actGetNotificationAllList":
                    GetNotificationAllList();
                    break;

                case "actSystemNotification":
                    get_SystemNotification();
                    break;
                   
                default:
                    Prompt.Information("act_Method not found: " + strMethod, "Error");
                    break;
            }
            return js.makeJSPostScript(execute());
        }

        private void Main_Load()
        {
            GetNotificationAllList();
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
            string strFinal = String.Empty; string strRet = String.Empty; string sqlOrig = sql;
            DataTable dt = new DataTable();
            int startColumn = 0; int rownumber = startIndex;

            string strOrder = " ISNULL(Moddate,Recdate) DESC,Recdate DESC";
            if (ToolboxOrderData.Trim() != "") strOrder = ToolboxOrderData;
            if (batchRowcounts >= 1)
            {
                startColumn = 1;
                sql = String.Format(@"Select x.* from(select ROW_NUMBER()  over (order by {3}) as [aagrowNum], b.* from ({0})  b) x where x.aagrowNum>={1} AND  x.aagrowNum <={2} order by x.aagrowNum", sql, startIndex, startIndex + batchRowcounts, strOrder);
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
                strRet = "func_ToolboxDataBat(\'" + tableName + "\', \'" + sqlOrig.Replace("\\", "\\\\") + "\', \'" + strconn.Replace("\\", "\\\\") + "\', \'" + (startIndex + batchRowcounts + 1).ToString() + "\', \'" + (batchRowcounts).ToString() + "\');";
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

        #region standard
        public void RecordOperation(eRecordOperation i, int Position)
        {
            string tempstr = "";

            RecordOperationResult = String.Empty;
            InfoOperationResult = String.Empty;
            switch (i)
            {
                case eRecordOperation.AddNew:

                    break;

                case eRecordOperation.Save:



                    break;

                case eRecordOperation.Delete:

                    break;

                case eRecordOperation.Process:
                    tempstr = "Process";
                    Prompt.Information(tempstr, based.Title);
                    break;

                case eRecordOperation.Refresh:

                    break;
                case eRecordOperation.Inquire:
                    tempstr = "inqure";
                    //Inquire();
                    nwToolBox.bindingNavigatorInquireItem.PrimaryKey = dal.primaryKey;
                    // Prompt.Information(tempstr, based.Title);
                    break;

                case eRecordOperation.Import:
                    tempstr = "import";
                    Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Export:


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
                if (RecordOperationResult.IndexOf("Error") != 0)
                {
                    //dal.focusRecordPK = WebApp.nwobjectText("txtCode");

                    //js.ADD("loc_LookupInquireWithValue('" + dal.focusRecordPK + "') ");
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i);
                    Prompt.Information(RecordOperationResult, based.Title);
                }
                else
                {
                    Prompt.Error(RecordOperationResult, based.Title);
                }
            }
        }

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
                    strSQL = "";//dal.inquireQuery();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);

                    break;

            }

            return strFinal;
        }

        public string getToolBoxData(string tableName, string getMethod, string strParameter, string strValue)
        {
            string strFinal = ""; string sql = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (getMethod)
            {
                case "toolbox":
                    //strFinal = getToolBoxDataRet(tableName, dal.GetData(), this.UserDefinedConnectionString, "1", "50");

                    nwStandardBL standardBL = new nwStandardBL(WebApp);
                    standardBL.PrimaryKey = "Code";
                    //strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(), this.UserDefinedConnectionString);



                    break;
            }

            return strFinal;
        }
        #endregion

        private void GetNotificationAllList()
        {
            string curdate = WebApp.nwobjectText("curdate");
            DataTable dt = dal.GetNotifAllUnread(curdate, based.SecurityAccess.RecUser);
            js.JSONfromDataTable("jsonNotifAll", dt);
            js.ADD("nw_GetNotificationAllListRender()");
            js.ADD("nwLoading_SpinnerEnd('conNotif');");
            js.makeHTML("#versehome", dal.getverse());
        }

        NOAHEncryptor dec = new NOAHEncryptor();
        void get_SystemNotification()
        {
            //js.ADD("$('#conNotif').html('')");
            js.ADD("$('.nksysnotif').remove()");

            string str = "";
            str = based.SecurityAccess.RecUser;
            if (SFObject.returnText(string.Format(@"Select top 1  1 From FPTI.CompanyUserAlertMapping x
                left join [FPTI_NW].[noahweb_CompanyAlertOtherMaintenance] n on n.Code = x.Alert
                where sysUser = '{0}' and n.status_noti = 1", str), based.SecurityAccess.ConnectionString) == "")
            {

            }
            else
            {
                string companycode = based.SecurityAccess.Company;
                string xcode = SFObject.returnText("Select code from fpti.company where description = '" + based.SecurityAccess.Company.Replace("'", "''") + "'", based.SecurityAccess.ConnectionString);
                if (xcode != "") companycode = xcode;

                 DataTable dtNotification = dal.Get_SystemNotification(companycode, based.SecurityAccess.RecUser);


                //gen_noti_Add("e-aag", xxer, "just now", "" , "Message", "http://www.google.com.ph","");
                //string strFinalH = @"gen_noti_Add('{0}', '{1}', '{2}', '{3}' , '{4}', '{5}','{6}','{7}','{8}','ret');";
                string strFinalH = @"nw_GetNotificationAllAddItem('{0}', '{1}', '{2}',true);";
                string strFinal = "";
                string strtype = "";
                string stradlink = "";

                NoahWebLib.Security.NOAHEncryptor nwsecurity = new NoahWebLib.Security.NOAHEncryptor();
                string strCodeID = "";

                for (int i = 0; i < dtNotification.Rows.Count; i++)
                {
                    string xnotif = "";// dao.RunSystemNotifQuery(dtNotification.Rows[i]["SqlQuery"].ToString(), based.SecurityAccess.RecUser, dao.GetCompanyDatabase(dtNotification.Rows[i]["Company"].ToString()));
                    string noti_sender = dtNotification.Rows[i]["Description"].ToString();

                    try
                    {
                        dtNotification.Rows[i]["SqlQuery"] = Base64Decode(dtNotification.Rows[i]["SqlQuery"].ToString());
                    }
                    catch { }
                    xnotif = MainMessage(based.SecurityAccess.RecUser, dtNotification.Rows[i]["SqlQuery"].ToString(), dtNotification.Rows[i]["Code"].ToString(), dtNotification.Rows[i]["noti_template"].ToString());
                    // string tranid = GetTranID(based.SecurityAccess.RecUser,GetCredentials(dtNotification.Rows[i]["Code"].ToString()));
                    string link = GetLink("", GetUserID(GetCredentials(dtNotification.Rows[i]["Code"].ToString())), dtNotification.Rows[i]["Code"].ToString());
                    if (xnotif == "")
                    {
                        continue;
                    }

                    stradlink = "";
                    strtype = dtNotification.Rows[i][0].ToString();
                    if (strtype == "nwMessageBoard")
                    {
                        try
                        {
                            strCodeID = nwsecurity.EncryptToString(dtNotification.Rows[i][1].ToString());
                        }
                        catch { }
                        strtype = "?nwAPA=" + strCodeID;
                    }
                    else
                        strtype = "";

                    stradlink += strtype;
                    strFinal += "gen_noti_ID ='" + dtNotification.Rows[i]["code"].ToString() + "';";
                    //strFinal += string.Format(strFinalH,
                    //    noti_sender, /* noti sender */
                    //                 //Base64Encode(xnotif.Replace(Environment.NewLine, "<br>")), /* noti Message */
                    //     Base64Encode(xnotif.Replace(Environment.NewLine, "")),
                    //     dtNotification.Rows[i]["RecDate"].ToString(),//get_TimeSpan(0, "sec"), /* noti Time in seconds */
                    //    "",
                    //    "",  /* Descrpition of link*/ //System Notification
                    //    Base64Encode(link),    /* link url*/
                    //    "materials/default_icons/icon_diskette.png",   /*icon*/
                    //    "0",   /*status*/
                    //    "1"
                    //    );

                    strFinal += string.Format(strFinalH,
                         noti_sender, 
                         Base64Encode(xnotif.Replace(Environment.NewLine, "")),
                         dtNotification.Rows[i]["RecDate"].ToString()
                        );


                }

                js.ADD(strFinal);
                js.ADD("nw_GetNotificationSysRefreshDone() ");

                //if (isNotiALL)
                //{
                //js.ADD("$(\"#gen_NotiCon li\").remove();");
                //js.ADD("$(\"#emi-Form-gen_NotiButton\").effect(\"bounce\", {},300);");
                //// js.ADD("$(\"#emi-Form-gen_NotiButton\").effect(\"bounce\", {},300);");
                //// js.ADD(" func_LoadThemes()");

                //}

               // js.ADD("isLoadedALL=false;");
            }
        }

        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        string get_TimeSpan(string timespan, string timetype)
        {
            int xer = 0;
            try
            {
                xer = Convert.ToInt32(timespan);
            }
            catch
            {
                return "invalid timespan.";
            }

            return get_TimeSpan(xer, timetype);
        }
        string get_TimeSpan(int timespan, string timetype)
        {
            TimeSpan t = new TimeSpan();

            switch (timetype.ToLower().Trim())
            {
                case "day":
                case "days":
                case "dy":
                    t = TimeSpan.FromHours(timespan);
                    break;
                case "hrs":
                case "hr":
                case "hour":
                case "hours":
                    t = TimeSpan.FromHours(timespan);
                    break;

                case "min":
                case "minute":
                case "minutes":
                    t = TimeSpan.FromMinutes(timespan);
                    break;

                case "sec":
                case "second":
                case "seconds":
                    t = TimeSpan.FromSeconds(timespan);
                    break;
            }

            string answer = "";

            int valuedayc = Convert.ToInt32(t.Days / 365);

            if (valuedayc >= 1)
            {
                if (valuedayc == 1)
                    answer = string.Format("{0}year ", valuedayc);
                else
                    answer = string.Format("{0}years ", valuedayc);
            }

            if (valuedayc < 1 && Convert.ToInt32(t.Days / 30) >= 1)
            {
                int valueday = t.Days;
                valueday = valueday / 30;
                if (valueday == 1)
                    answer = string.Format("{0}month ", valueday);
                else
                    answer = string.Format("{0}months ", valueday);
            }

            if (t.Days >= 1 && t.Days < 30)
            {
                int valueday = t.Days;
                if (valueday == 1)
                    answer += string.Format("{0}day ", valueday);
                else
                    answer += string.Format("{0}days ", valueday);
            }

            if (t.Hours >= 1 && t.Days < 30)
            {
                int valueday = t.Hours;
                if (valueday == 1)
                    answer += string.Format("{0}hour ", valueday);
                else
                    answer += string.Format("{0}hours ", valueday);
            }
            if (t.Minutes >= 1 && t.Days < 1)
            {
                int valueday = t.Minutes;
                if (valueday == 1)
                    answer += string.Format("{0}min ", valueday);
                else
                    answer += string.Format("{0}mins ", valueday);
            }

            if (t.Seconds >= 1 && t.Days < 1 && t.Hours < 1)
            {
                int valueday = t.Seconds;
                if (valueday == 1)
                    answer += string.Format("{0}sec", valueday);
                else
                    answer += string.Format("{0}secs", valueday);
            }

            if (answer.Trim() != "")
            {
                // answer = "invalid time";
            }

            return answer;
        }
        /// <summary>
        /// notifcation / // / 
        /// </summary>
        /// <param name="userid"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        /// 
        public string MainMessage(string userid, string message, string companyalertid, string notitemp)
        {
            string connection = GetCredentials(companyalertid);
            if (connection == "")
            {

                connection = this.UserDefinedConnectionString;
            }
            string FinalMessage = string.Empty;
            //   string trandid = GetTranID(userid, connection);
            //    string condition = GetScreen(trandid, connection);
            DataTable dt = new DataTable();
            message = message.Replace("$USER$", based.SecurityAccess.RecUser);
            message = message.Replace("$DATE$", SFObjects.GetServerDateTime(connection).ToString());
            //  query = query.Replace("$CODE$", codesort);
            //  query = query.Replace("$DATESCHED$", datesched);

            message = SFObject.returnText(message, connection);
            notitemp = message;

            notitemp = notitemp.Replace("#Greetings#", GetSalutation());
            notitemp = notitemp.Replace("#User#", based.SecurityAccess.RecUser);
            notitemp = notitemp.Replace("#Message#", message);
            notitemp = notitemp.Replace("#Date#", DateTime.Now.ToString());
            notitemp = notitemp.Replace("#@Greetings@#", GetSalutation());
            notitemp = notitemp.Replace("#@User@#", based.SecurityAccess.RecUser);
            notitemp = notitemp.Replace("#@Message@#", message);
            notitemp = notitemp.Replace("#@Date@#", DateTime.Now.ToString());
            notitemp = notitemp.Replace("$NL$", "\n");
            FinalMessage = notitemp;

            ////  if (dt.Rows.Count >= 1)
            //   {
            //     message = "You have " + dt.Rows.Count.ToString() + " screen update/s";
            // }
            return FinalMessage;
        }
        public string GetCredentials(string companyalertcode)
        {
            string sql = "Select * From [FPTI_NW].[nw_CompanyCredentials] where companyalertid = '" + companyalertcode + "'";
            DataTable dt = new DataTable();
            dt = SFObject.LoadDataTable(sql, based.SecurityAccess.ConnectionString);
            string connectionstring = "";
            try
            {
                SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
                builder.ConnectionString = based.SecurityAccess.ConnectionString;
                builder.DataSource = dt.Rows[0]["Server"].ToString();
                builder.InitialCatalog = dt.Rows[0]["DBName"].ToString();
                builder.UserID = dt.Rows[0]["username"].ToString();
                builder.Password = dt.Rows[0]["password"].ToString();
                builder.ConnectTimeout = Int32.Parse(dt.Rows[0]["connectiontimeout"].ToString());
                connectionstring = builder.ConnectionString;
            }
            catch
            {
                sql = "Select company from [FPTI].[CompanyAlert] where code = '" + companyalertcode + "'";
                SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
                builder.ConnectionString = based.SecurityAccess.ConnectionString;
                builder.InitialCatalog = SFObject.returnText("SELECT [RefDatabase] FROM [FPTI].[Company] where code = '" + SFObject.returnText(sql, based.SecurityAccess.ConnectionString) + "'", based.SecurityAccess.ConnectionString);

                connectionstring = builder.ConnectionString;
            }
            return connectionstring;
        }

        private string getClass(int type)
        {
            string xclass = "";
            switch (type)
            {
                case 1:
                    xclass = "p-details";
                    break;
                case 2:
                    xclass = "a-details";
                    break;
                case 3:
                    xclass = "d-control";
                    break;
                case 4:
                    xclass = "notices";
                    break;
                default:
                    xclass = "p-details";
                    break;
            }
            return xclass;
        }


        public string GetSalutation()
        {
            string Salutation = "";
            string Hr, standard = "";
            int hour;
            Hr = DateTime.Now.ToString("hh");
            hour = Int32.Parse(Hr.ToString());
            standard = DateTime.Now.ToString("tt");

            if (standard == "PM")
            {
                if (hour > 5 && hour < 12)
                {
                    Salutation = "Good Evening";
                }
                else
                {
                    Salutation = "Good Afternoon";
                }
            }
            else
            {
                Salutation = "Good Morning";
            }
            return Salutation;
        }
        public string GetUserID(string connection)
        {
            string sql = "";
            string userid = "";
            //if (based.SecurityAccess.Company == "ALI") {
            //    sql = "Select userid From dbo.userMaintenance where username = '" + based.SecurityAccess.RecUser + "'";
            //    userid = SFObject.returnText(sql,connection);
            //}  
            //else {
            userid = based.SecurityAccess.RecUser;
            // }
            return userid;
        }


        public string GetTranID(string userid, string connection)
        {
            string sql = string.Format(@"Select top 1 tranid from  dbo.ztabLin  where Userid = '{0}' order by TranDate desc", userid);
            string tranid = SFObjects.returnText(sql, connection);
            return tranid;
        }

        public string GetLink(string tranid, string userid, string companyalertid)
        {
            string link = string.Format(@"Select value from [FPTI_NW].[noahweb_SystemConfigWEB] where code = 'nwnotification'");
            link = SFObject.returnText(link, based.SecurityAccess.ConnectionString);
            string mainLInk = link + "tranid=" + dec.EncryptToString(userid) + "&nwu=" + dec.EncryptToString(userid) + "&companyalertid=" + dec.EncryptToString(companyalertid);
            return mainLInk;
        }


        public string GetScreen(string tranid, string connection)
        {
            string sql = "";
            DataTable dt = new DataTable();
            DataTable dtscreen = new DataTable();
            string screen = "";
            string message = "";
            sql = string.Format(@"Select DaiD from  dbo.ztabHeader  where tranid = '{0}' order by DateRec desc", tranid);
            dt = SFObject.LoadDataTable(sql, connection);
            string daid = "";
            sql = "";
            foreach (DataRow xrow in dt.Rows)
            {
                daid = xrow["DaiD"].ToString();
                if (sql == "")
                {
                    sql += "where componentTableSource = '" + daid + "'";
                }
                else
                {
                    sql += " or componentTableSource = '" + daid + "'";
                }
            }

            dtscreen = SFObject.LoadDataTable(@"Select distinct Substring(a.componentId, 1, 12)as Screens  From dbo.components a
                    right join  [dbo].[screenPublish] b  on  Substring(a.componentId, 1, 12) = b.componentscreenid  " + sql, connection);
            if (dtscreen.Rows.Count >= 1)
            {
                foreach (DataRow dtrow in dtscreen.Rows)
                {
                    if (screen == "")
                    {
                        screen += "'" + dtrow["Screens"] + "'";
                    }
                    else
                    {
                        screen += ",'" + dtrow["Screens"] + "'";
                    }
                }
            }
            return screen;
        }

    }
}