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
//using System.Xml.Linq;

using NoahWebLib;
using NoahWebLib.Security;
using NoahWebMainLib.NoahWebMainDataAccess;
using NoahWebLib.Standards;

using NoahWebLib.NoahWebFunction;
using NoahWebLib.NoahWebDataAccess;
using NoahWebLib.Security;
using NoahWebLib.NoahWebUI;

namespace NoahWeb
{
    public partial class ChangePassword : System.Web.UI.Page
    {
        WebApplib WebApp = new WebApplib();
        nwSFObjects SFObjects = new nwSFObjects();
        nwEntry based = new nwEntry();
        Promptlib custom_Prompt = new Promptlib();
        JSFunction custom_js = new JSFunction();

        nwObject nwObject = new nwObject();
        DataAccess nwDataAccess = new DataAccess();
        nwAction nwAction = new nwAction();


        NoahWebLib.Security.NOAHEncryptor nwconfig = new NoahWebLib.Security.NOAHEncryptor();
        string ConnectionString = nwSystem.ARKDB_ConnectionString();

        protected void Page_Load(object sender, EventArgs e)
        {
            nwSystem.ResponseHeaderRemove(Response);
            // for security
            NoahWebLib.Standards.nwStandardApp.LoadSecurity(Response);


            nwStandard nwStandard = new NoahWebLib.Standards.nwStandard(Page);
            ConnectionString = nwStandard.ConnectionString(ConnectionString);
            mainDataAccess ma = new mainDataAccess();

            if (ma.GetPasswordDecrptorType(ConnectionString) == "1")
                nwconfig = new NoahWebLib.Security.NOAHEncryptor(false);

            Session["ChangeCurrentUser"] += "";
            //if (!Page.IsPostBack)
            //{
            //    txtOldPass.Focus();

            //}
            //else {
                try
                {
                    string strx = Request.QueryString["t"].ToString();
                strx = nwSystem.FilterSQL(strx);

                string sQL = string.Format(@"SELECT 
                    Recuser ,
                    CASE WHEN DATEDIFF(d,requestDate,dbo.GetNoahDate())>=1 THEN 'Expired Session'
	                    WHEN (SELECT TOP 1 b.[Key] FROM  [FPTI_NW].[ResetPassword] b WHERE b.recuser = a.recuser ORDER BY b.requestDate desc) = a.[key]
	                    THEN 'valid'	
	                    ELSE 
		                    'Invalid/Expired Session'
                    END Remarks
                     FROM [FPTI_NW].[ResetPassword] a
                     WHERE a.[Key] = '{0}'", strx);

                    DataTable dtrec = new DataTable();
                    dtrec = SFObjects.LoadDataTable(sQL, ConnectionString);
                    bool iserror = false;
                    string error = "";
                    string recuser = "";
                    if (dtrec.Rows.Count >= 1)
                    {
                        error = dtrec.Rows[0]["Remarks"].ToString();
                        recuser = dtrec.Rows[0]["Recuser"].ToString();
                        Session["ChangeCurrentUser"] = recuser;
                        if (error != "valid") iserror = true;

                    }
                    else
                    {
                        iserror = true;
                        error = "Invalid Session";
                    }


                    if (iserror)
                    {
                        lblMsg.Text = error;
                    //lblMsg.Attributes.CssStyle["color"] = "red";
                    //lblMsg.Attributes.CssStyle["margin-top"] = "50";
                    //lblMsg.Attributes.CssStyle["display"] = "block";

                    lblMsg.CssClass = "nwCuz-002";
                    Panel1.Visible = false;
                    }
                    else
                    {
                        panelOLDPass.Visible = false;
                        string strpass = SFObjects.returnText(" SELECT [password] FROM [fpti].[user] WHERE code ='" + recuser.Replace("'", "''") + "'", ConnectionString);
                        strpass = nwSystem.StringDecrypt(strpass);
                        txtOldPass.Text = strpass;
                    }

                }
                catch
                {
                    try
                    {
                        if (Session["changecurrentuser"].ToString() == "")
                        {
                            Response.Redirect("default.aspx");
                        }

                    }
                    catch
                    {
                        Response.Redirect("default.aspx");
                    }
            }
            //}
         
        }

        

        protected void btnChange_Click(object sender, EventArgs e)
        {
            string strKey = "";
            try
            {
                strKey = Request.QueryString["t"].ToString();
            }
            catch { }
            Session["ChangeCurrentUser"] += "";
            string RecUser = "";
            string encryptedpass = "";
            string errorResult = "";
            RecUser = Session["ChangeCurrentUser"].ToString();
            RecUser = nwSystem.FilterSQL(RecUser);
            string strSql = "";
            strSql = "Select password from [FPTI].[user] where code='" + RecUser + "'";
            
            strSql = SFObjects.returnText(strSql, ConnectionString);
            
            try
            {
                if (strSql.Trim() == "")
                {
                    lblMsg.Text = "Password doesn't match";
                    //txtOldPass.Focus();
                    return;
                }
                strSql = nwconfig.DecryptString(strSql);

                if (strSql == txtOldPass.Text)
                {

                    if (txtNewPass.Text == "")
                    {
                        lblMsg.Text = "New Password is required";
                    }
                    else if (txtConfirm.Text == "")
                    {
                        txtNewPass.Text = "Confirm Password is required";
                    }
                    else if (txtNewPass.Text == txtConfirm.Text)
                    {
                        bool isSave = true;
                        encryptedpass = nwconfig.EncryptToString(txtNewPass.Text);
                        string pwdhistory = SFObjects.returnText("SELECT [value] FROM [dbo].[SystemConfig] WHERE Code = 'PWDHISTORY'", ConnectionString);
                        if (pwdhistory != "0" && pwdhistory != "")
                        {
                            //DataTable dt = SFObjects.LoadDataTable("SELECT TOP " + pwdhistory + " [Password] FROM  [FPTI].[UserH] WHERE [UserCode] = '" + RecUser + "' ORDER BY Recdate DESC", ConnectionString);
                            DataTable dt = SFObjects.LoadDataTable("SELECT TOP " + pwdhistory + " [Password] FROM FPTI.[User_Hist] WHERE [Code] = '" + RecUser + "' and LastPasswordChanged is not null ORDER BY isnull(Moddate, Recdate) DESC", ConnectionString);

                            if (dt.Rows.Count > 0)
                            {
                                foreach (DataRow dr in dt.Rows)
                                {
                                    if (dr[0].ToString() == encryptedpass)
                                    {
                                        isSave = false;
                                        lblMsg.Text = "Password has been already used.";
                                    }
                                }
                            }

                        }

                        errorResult += validatepasswordcharacters(txtNewPass.Text);

                        string len = string.Empty;
                        if (!string.IsNullOrEmpty(CheckMinimumLength(2, txtNewPass.Text.Length, "Password", ref len)))
                            errorResult += "Password length must be atleast " + len + " characters.\n";

                        if (!errorResult.Equals(string.Empty))
                        {
                            isSave = false;
                            errorResult = "Cannot Save.\n" + errorResult;
                            lblMsg.Text = errorResult;
                        }


                        if (isSave)
                        {


                            string passwordcolx = "";
                            string passwordcolxencrypt = "";
                            try
                            {
                                passwordcolx = txtNewPass.Text;
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

                            string url = nwSystem.GetAppSettings("NOAHLink") + "/Account/ResetPasswordUser/?toks=" + Uri.EscapeUriString(values) + "&s=" + Uri.EscapeUriString(randomstring);
                            try
                            {
                                var client = new HttpUtils.RestClient();
                                client.EndPoint = url;
                                client.Method = HttpVerb.POST;
                                client.PostData = "";// "{\"data\": \"" + values +  "\"}";

                                var json = client.MakeRequest();
                                responseString = json;


                            }
                            catch (Exception err)
                            {

                            }


                            if (responseString.Trim() == "200")
                            {

                                //,AccountDisabled=0

                                strSql = "Update  [FPTI].[user] set password ='" + encryptedpass + "',InitialLogin = 0,LastPasswordChanged=dbo.GetNoahDate() where code='" + RecUser + "'";

                                SFObjects.ExcuteQuery($"delete FPTI_NW.UserAttempt where userid='{RecUser}' and inType = 'ATTEMPTPASS'", ConnectionString);

                                strSql = SFObjects.returnText(strSql, ConnectionString);
                                InsertOnUserH(RecUser, nwconfig.EncryptToString(txtNewPass.Text));
                                InsertOnUserHist(RecUser, nwconfig.EncryptToString(txtNewPass.Text));
                                lblMsg.Text = strSql;
                                string strReq = Request.Url.Query;

                                if (strKey.Trim() != "")
                                {
                                    strSql = "Update [FPTI_NW].[ResetPassword] set IpChange ='" + nwSystem.GetClientIPAddress() + "' , tag =1,changeDate = dbo.GetNoahDate() where Recuser='" + RecUser + "' and [Key] ='" + strKey + "'";
                                    strSql = SFObjects.returnText(strSql, ConnectionString);

                                }


                                mainDataAccess db = new mainDataAccess();
                                string str = generateLoginKey(RecUser);
                                if (strReq != "")
                                {
                                    strReq = strReq + "&" + str;
                                }
                                else
                                {
                                    strReq = "?" + str;
                                }



                                Response.Redirect("default" + strReq); // baka balikan
                            }
                            else
                            {
                                lblMsg.Text = "Error occur(password 2). Kindly Re-login Again";
                            }
                           // RedirectToAction("home", "index");

                            //DataTable dt_interface = db.general_Sql_Select("SELECT * FROM [FPTI_NW].[nw_InterfaceAssignment] WHERE [RecUser]='" + RecUser + "'", ConnectionString);
                            //if (dt_interface.Rows.Count < 1)
                            //    Response.Redirect("Home.aspx" + strReq);
                            //else if (dt_interface.Rows[0][1].ToString() == "1")
                            //    Response.Redirect("Home.aspx" + strReq);
                            //else if (dt_interface.Rows[0][1].ToString() == "2")
                            //    Response.Redirect("Homepage.aspx" + strReq);
                            //else
                            //    Response.Redirect("Home.aspx" + strReq);

                        }
                    }
                    else
                    {
                        lblMsg.Text = "Confirm Password doesn't match";
                    }
                }
                else {

                    lblMsg.Text = "Cannot proceed. Old password entered is incorrect.";

                }

            }
            catch {
                lblMsg.Text = "Error occur. Kindly Re-login Again";
            }
            //txtNewPass.Focus(); 

            //lblMsg


            
        }
        private string generateLoginKey(string struser)
        {
            string key = "";

            try
            {
                key = DateTime.Now.ToString() + "|" + struser + "|" + nwSystem.RandomStrings(20);
                key = nwSystem.StringEncryptAES(key, true);
                key = "lky=" + key;
            }
            catch (Exception err)
            {

            }

            return key;
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
        protected void btnBack_Click(object sender, EventArgs e)
        {
            Response.Redirect("logout.aspx");
        }
       
    }
}
