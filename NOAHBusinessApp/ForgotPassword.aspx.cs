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
using NoahWebLib.Security;
using NoahWebMainLib.NoahWebMainDataAccess;
using NoahWebLib.Standards;

namespace NoahWeb
{
    public partial class ForgotPassword : System.Web.UI.Page
    {
        nwSFObjects SFObjects = new nwSFObjects();
        NoahWebLib.Security.NOAHEncryptor nwconfig = new NoahWebLib.Security.NOAHEncryptor();
        string ConnectionString = ConfigurationSettings.AppSettings["NoahWebConnectARK"].ToString();
        string ConnectionStringNOAH = ConfigurationSettings.AppSettings["NoahWebConnect"].ToString();

        protected void Page_Load(object sender, EventArgs e)
        {
            nwSystem.ResponseHeaderRemove(Response);


            if(nwSystem.GetAppSettings("LoginForgotPassword", "1") == "2")
            {
                Response.Redirect("ForgotPassword?nkpop=y");
            }


            try
            {
                if (Request.QueryString["t"].ToString() != "")
                    Response.Redirect("ChangePassword.aspx?" + Request.QueryString.ToString());
            }
            catch { }
            nwStandard nwStandard = new NoahWebLib.Standards.nwStandard(Page);
            ConnectionString = nwStandard.ConnectionString(ConnectionString);
            mainDataAccess ma = new mainDataAccess();

            if (ma.GetPasswordDecrptorType(ConnectionString) == "1") nwconfig = new NoahWebLib.Security.NOAHEncryptor(false);

            Session["ChangeCurrentUser"] += "";
            //if (!Page.IsPostBack)
            //{
            //    txtUsername.Focus();
            //}

        }



        protected void btnChange_Click(object sender, EventArgs e)
        {
            Session["ChangeCurrentUser"] += "";
            string RecUser = "";
            string encryptedpass = "";
            RecUser = txtUsername.Text;

            string strSql = "";


            try
            {

                //strSql = nwconfig.DecryptString(strSql);


                if (txtEmail.Text == "")
                {
                    //lblMsg.Text = "Email is required";
                    lblMsg.Text = "Username/Email Address is invalid.";
                }
                else if (txtConfirm.Text == "")
                {
                    //lblMsg.Text = "Confirm Email is required";
                    lblMsg.Text = "Username/Email Address is invalid.";
                }
                else if (txtEmail.Text != txtConfirm.Text)
                {
                    //lblMsg.Text = "Confirm Email doesn't match";
                    lblMsg.Text = "Username/Email Address is invalid.";
                }
                else if (txtEmail.Text == txtConfirm.Text)
                {
                    strSql = "SELECT [Email] FROM [FPTI_NW].[noahweb_zEmail] WHERE [UserID] = '" + RecUser + "' AND [Status] = 1";
                    strSql = SFObjects.returnText(strSql, ConnectionString);



                    if (strSql.ToLower() == txtEmail.Text.ToLower())
                    {

                        if (txtEmail.Text == txtConfirm.Text)
                        {
                            NoahWebLib.NoahWebFunction.nwFunction nwfunc = new NoahWebLib.NoahWebFunction.nwFunction();
                            NoahWebLib.NoahWebDataAccess.AESEncrytDecry aes = new NoahWebLib.NoahWebDataAccess.AESEncrytDecry();

                            string Password = "";
                            string Key = nwfunc.RandomString(30);
                            Key = aes.EncryptStringAES(Key);
                            Key = Key.Replace("+", "AAGxAAG");


                            string result = "";
                            string query = string.Format(@"INSERT  [FPTI_NW].[ResetPassword]([recuser],[email],[key],[IP])
            VALUES ('{0}','{1}','{2}','{3}')", RecUser.Replace("'", "''"), txtEmail.Text.Replace("'", "''"), Key.Replace("'", "''"), nwSystem.GetClientIPAddress());
                            string xret = SFObjects.returnText(query, ConnectionString);

                            string subject = "Reset Password";
                            string message = GetBodyMessage(Key);

                            DataTable dtRecord = new DataTable();

                            string EmailUser = SFObjects.returnText("SELECT [value] FROM [FPTI_NW].[noahweb_SystemConfigWEB] WHERE code = 'nwEMAIL_ID'", ConnectionString);
                            EmailUser = nwSystem.StringDecrypt(EmailUser);

                            string EmailPass = SFObjects.returnText("SELECT [value] FROM [FPTI_NW].[noahweb_SystemConfigWEB] WHERE code = 'nwEMAIL_PASS'", ConnectionString);
                            EmailPass = nwSystem.StringDecrypt(EmailPass);

                            result = nwfunc.Email_Send(
                                SFObjects.returnText("SELECT  [Smtp] FROM [FPTI_NW].[noahweb_zEmail_SMTP] WHERE  ISNULL(('" + EmailUser + "'),'@gmail.com') LIKE '%' + Suffix", ConnectionString)
                               , EmailUser
                               , EmailPass
                               , EmailUser
                               , txtEmail.Text
                               , ""
                               , EmailUser
                               , subject
                               , message
                               , new DataTable()
                               , Parser.ParseInt(SFObjects.returnText("SELECT [value] FROM [FPTI_NW].[noahweb_SystemConfigWEB] WHERE code = 'nwEMAIL_Port'", ConnectionString))
                               , Parser.ParseBool(SFObjects.returnText("SELECT [value] FROM [FPTI_NW].[noahweb_SystemConfigWEB] WHERE code = 'nwEMAIL_SSL'", ConnectionString))
                               );

                            if (result == "Email Sent")
                            {
                                lblMsg.Text = "Please go to your email to reset your password";
                                lblMsg.CssClass = "nwCuz-002";
                                Panel1.Visible = false;
                            }
                            else
                            {
                                lblMsg.Text = "Error occur. Kindly try again.";
                            }

                        }
                        else
                        {
                            lblMsg.Text = "Confirm Email doesn't match";
                        }
                    }
                    else
                    {

                        //strSql = "SELECT top 1 1 FROM [FPTI_NW].[noahweb_zEmail] WHERE [UserID] = '" + RecUser + "' AND [Status] = 0 and Email = '"+ txtEmail.Text + "'";
                        //strSql = SFObjects.returnText(strSql, ConnectionString);
                        //if (strSql == "1")
                        //{
                        //    lblMsg.Text = "Email Address is inactive."; //modified by JNB 03/05/2019
                        //}
                        //else
                        //{
                            lblMsg.Text = "Username/Email Address is invalid."; //modified by JNB 03/05/2019
                        //}
                    }
                }
                else
                {
                    strSql = "SELECT [Code] FROM [FPTI].[user] WHERE [code] = '" + RecUser + "'";
                    strSql = SFObjects.returnText(strSql, ConnectionString);
                    if (strSql.Trim() == "")
                    {
                        lblMsg.Text = "Username/Email Address is invalid.";
                        //txtUsername.Focus();
                        return;
                    }
                }
            }
            catch (Exception err)
            {
                lblMsg.Text = "Error occur. Kindly try again.";
                //lblMsg.Text = err.ToString();
            }
            //txtEmail.Focus();

            //lblMsg



        }
        private void InsertOnUserH(string RecUser, string Password)
        {

        }
        private string GetBodyMessage(string key)
        {
            string strF = "";
            string xurl = Request.Url.AbsoluteUri + "?t=" + key;
            string AppName = "";
            try {

                AppName = SFObjects.returnText(string.Format(@"SELECT TOP 1 Value FROM dbo.SystemConfig WHERE Code = 'nwAppName'"), ConnectionStringNOAH);

                if (AppName.Trim().Length <= 0)
                    AppName = "NOAH Business Applications";
                
            }
            catch { }

            #region Message
            strF = @"<html xmlns:v='urn:schemas-microsoft-com:vml'
xmlns:o='urn:schemas-microsoft-com:office:office'
xmlns:w='urn:schemas-microsoft-com:office:word'
xmlns:m='http://schemas.microsoft.com/office/2004/12/omml'
xmlns='http://www.w3.org/TR/REC-html40'>

<head>
<meta http-equiv=Content-Type content='text/html; charset=us-ascii'>
<meta name=ProgId content=Word.Document>
<meta name=Generator content='Microsoft Word 12'>
<meta name=Originator content='Microsoft Word 12'>
<link rel=File-List href='sample_files/filelist.xml'>
<link rel=Edit-Time-Data href='sample_files/editdata.mso'>
<!--[if !mso]>
<style>
v\:* {behavior:url(#default#VML);}
o\:* {behavior:url(#default#VML);}
w\:* {behavior:url(#default#VML);}
.shape {behavior:url(#default#VML);}
</style>
<![endif]--><!--[if gte mso 9]><xml>
 <o:DocumentProperties>
  <o:Author>srufo</o:Author>
  <o:Template>Normal</o:Template>
  <o:LastAuthor>Administrator</o:LastAuthor>
  <o:Revision>59</o:Revision>
  <o:TotalTime>19</o:TotalTime>
  <o:Created>2018-07-03T06:54:00Z</o:Created>
  <o:LastSaved>2018-08-09T05:30:00Z</o:LastSaved>
  <o:Pages>1</o:Pages>
  <o:Words>47</o:Words>
  <o:Characters>269</o:Characters>
  <o:Lines>2</o:Lines>
  <o:Paragraphs>1</o:Paragraphs>
  <o:CharactersWithSpaces>315</o:CharactersWithSpaces>
  <o:Version>12.00</o:Version>
 </o:DocumentProperties>
</xml><![endif]-->
<link rel=themeData href='sample_files/themedata.thmx'>
<link rel=colorSchemeMapping href='sample_files/colorschememapping.xml'>
<!--[if gte mso 9]><xml>
 <w:WordDocument>
  <w:Zoom>90</w:Zoom>
  <w:SpellingState>Clean</w:SpellingState>
  <w:GrammarState>Clean</w:GrammarState>
  <w:TrackMoves>false</w:TrackMoves>
  <w:TrackFormatting/>
  <w:ValidateAgainstSchemas/>
  <w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid>
  <w:IgnoreMixedContent>false</w:IgnoreMixedContent>
  <w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText>
  <w:DoNotPromoteQF/>
  <w:LidThemeOther>EN-PH</w:LidThemeOther>
  <w:LidThemeAsian>X-NONE</w:LidThemeAsian>
  <w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript>
  <w:Compatibility>
   <w:BreakWrappedTables/>
   <w:SnapToGridInCell/>
   <w:WrapTextWithPunct/>
   <w:UseAsianBreakRules/>
   <w:DontGrowAutofit/>
   <w:SplitPgBreakAndParaMark/>
   <w:DontVertAlignCellWithSp/>
   <w:DontBreakConstrainedForcedTables/>
   <w:DontVertAlignInTxbx/>
   <w:Word11KerningPairs/>
   <w:CachedColBalance/>
  </w:Compatibility>
  <w:BrowserLevel>MicrosoftInternetExplorer4</w:BrowserLevel>
  <m:mathPr>
   <m:mathFont m:val='Cambria Math'/>
   <m:brkBin m:val='before'/>
   <m:brkBinSub m:val='--'/>
   <m:smallFrac m:val='off'/>
   <m:dispDef/>
   <m:lMargin m:val='0'/>
   <m:rMargin m:val='0'/>
   <m:defJc m:val='centerGroup'/>
   <m:wrapIndent m:val='1440'/>
   <m:intLim m:val='subSup'/>
   <m:naryLim m:val='undOvr'/>
  </m:mathPr></w:WordDocument>
</xml><![endif]--><!--[if gte mso 9]><xml>
 <w:LatentStyles DefLockedState='false' DefUnhideWhenUsed='true'
  DefSemiHidden='true' DefQFormat='false' DefPriority='99'
  LatentStyleCount='267'>
  <w:LsdException Locked='false' Priority='0' SemiHidden='false'
   UnhideWhenUsed='false' QFormat='true' Name='Normal'/>
  <w:LsdException Locked='false' Priority='9' SemiHidden='false'
   UnhideWhenUsed='false' QFormat='true' Name='heading 1'/>
  <w:LsdException Locked='false' Priority='9' QFormat='true' Name='heading 2'/>
  <w:LsdException Locked='false' Priority='9' QFormat='true' Name='heading 3'/>
  <w:LsdException Locked='false' Priority='9' QFormat='true' Name='heading 4'/>
  <w:LsdException Locked='false' Priority='9' QFormat='true' Name='heading 5'/>
  <w:LsdException Locked='false' Priority='9' QFormat='true' Name='heading 6'/>
  <w:LsdException Locked='false' Priority='9' QFormat='true' Name='heading 7'/>
  <w:LsdException Locked='false' Priority='9' QFormat='true' Name='heading 8'/>
  <w:LsdException Locked='false' Priority='9' QFormat='true' Name='heading 9'/>
  <w:LsdException Locked='false' Priority='39' Name='toc 1'/>
  <w:LsdException Locked='false' Priority='39' Name='toc 2'/>
  <w:LsdException Locked='false' Priority='39' Name='toc 3'/>
  <w:LsdException Locked='false' Priority='39' Name='toc 4'/>
  <w:LsdException Locked='false' Priority='39' Name='toc 5'/>
  <w:LsdException Locked='false' Priority='39' Name='toc 6'/>
  <w:LsdException Locked='false' Priority='39' Name='toc 7'/>
  <w:LsdException Locked='false' Priority='39' Name='toc 8'/>
  <w:LsdException Locked='false' Priority='39' Name='toc 9'/>
  <w:LsdException Locked='false' Priority='35' QFormat='true' Name='caption'/>
  <w:LsdException Locked='false' Priority='10' SemiHidden='false'
   UnhideWhenUsed='false' QFormat='true' Name='Title'/>
  <w:LsdException Locked='false' Priority='1' Name='Default Paragraph Font'/>
  <w:LsdException Locked='false' Priority='11' SemiHidden='false'
   UnhideWhenUsed='false' QFormat='true' Name='Subtitle'/>
  <w:LsdException Locked='false' Priority='22' SemiHidden='false'
   UnhideWhenUsed='false' QFormat='true' Name='Strong'/>
  <w:LsdException Locked='false' Priority='20' SemiHidden='false'
   UnhideWhenUsed='false' QFormat='true' Name='Emphasis'/>
  <w:LsdException Locked='false' Priority='59' SemiHidden='false'
   UnhideWhenUsed='false' Name='Table Grid'/>
  <w:LsdException Locked='false' UnhideWhenUsed='false' Name='Placeholder Text'/>
  <w:LsdException Locked='false' Priority='1' SemiHidden='false'
   UnhideWhenUsed='false' QFormat='true' Name='No Spacing'/>
  <w:LsdException Locked='false' Priority='60' SemiHidden='false'
   UnhideWhenUsed='false' Name='Light Shading'/>
  <w:LsdException Locked='false' Priority='61' SemiHidden='false'
   UnhideWhenUsed='false' Name='Light List'/>
  <w:LsdException Locked='false' Priority='62' SemiHidden='false'
   UnhideWhenUsed='false' Name='Light Grid'/>
  <w:LsdException Locked='false' Priority='63' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Shading 1'/>
  <w:LsdException Locked='false' Priority='64' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Shading 2'/>
  <w:LsdException Locked='false' Priority='65' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium List 1'/>
  <w:LsdException Locked='false' Priority='66' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium List 2'/>
  <w:LsdException Locked='false' Priority='67' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Grid 1'/>
  <w:LsdException Locked='false' Priority='68' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Grid 2'/>
  <w:LsdException Locked='false' Priority='69' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Grid 3'/>
  <w:LsdException Locked='false' Priority='70' SemiHidden='false'
   UnhideWhenUsed='false' Name='Dark List'/>
  <w:LsdException Locked='false' Priority='71' SemiHidden='false'
   UnhideWhenUsed='false' Name='Colorful Shading'/>
  <w:LsdException Locked='false' Priority='72' SemiHidden='false'
   UnhideWhenUsed='false' Name='Colorful List'/>
  <w:LsdException Locked='false' Priority='73' SemiHidden='false'
   UnhideWhenUsed='false' Name='Colorful Grid'/>
  <w:LsdException Locked='false' Priority='60' SemiHidden='false'
   UnhideWhenUsed='false' Name='Light Shading Accent 1'/>
  <w:LsdException Locked='false' Priority='61' SemiHidden='false'
   UnhideWhenUsed='false' Name='Light List Accent 1'/>
  <w:LsdException Locked='false' Priority='62' SemiHidden='false'
   UnhideWhenUsed='false' Name='Light Grid Accent 1'/>
  <w:LsdException Locked='false' Priority='63' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Shading 1 Accent 1'/>
  <w:LsdException Locked='false' Priority='64' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Shading 2 Accent 1'/>
  <w:LsdException Locked='false' Priority='65' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium List 1 Accent 1'/>
  <w:LsdException Locked='false' UnhideWhenUsed='false' Name='Revision'/>
  <w:LsdException Locked='false' Priority='34' SemiHidden='false'
   UnhideWhenUsed='false' QFormat='true' Name='List Paragraph'/>
  <w:LsdException Locked='false' Priority='29' SemiHidden='false'
   UnhideWhenUsed='false' QFormat='true' Name='Quote'/>
  <w:LsdException Locked='false' Priority='30' SemiHidden='false'
   UnhideWhenUsed='false' QFormat='true' Name='Intense Quote'/>
  <w:LsdException Locked='false' Priority='66' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium List 2 Accent 1'/>
  <w:LsdException Locked='false' Priority='67' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Grid 1 Accent 1'/>
  <w:LsdException Locked='false' Priority='68' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Grid 2 Accent 1'/>
  <w:LsdException Locked='false' Priority='69' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Grid 3 Accent 1'/>
  <w:LsdException Locked='false' Priority='70' SemiHidden='false'
   UnhideWhenUsed='false' Name='Dark List Accent 1'/>
  <w:LsdException Locked='false' Priority='71' SemiHidden='false'
   UnhideWhenUsed='false' Name='Colorful Shading Accent 1'/>
  <w:LsdException Locked='false' Priority='72' SemiHidden='false'
   UnhideWhenUsed='false' Name='Colorful List Accent 1'/>
  <w:LsdException Locked='false' Priority='73' SemiHidden='false'
   UnhideWhenUsed='false' Name='Colorful Grid Accent 1'/>
  <w:LsdException Locked='false' Priority='60' SemiHidden='false'
   UnhideWhenUsed='false' Name='Light Shading Accent 2'/>
  <w:LsdException Locked='false' Priority='61' SemiHidden='false'
   UnhideWhenUsed='false' Name='Light List Accent 2'/>
  <w:LsdException Locked='false' Priority='62' SemiHidden='false'
   UnhideWhenUsed='false' Name='Light Grid Accent 2'/>
  <w:LsdException Locked='false' Priority='63' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Shading 1 Accent 2'/>
  <w:LsdException Locked='false' Priority='64' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Shading 2 Accent 2'/>
  <w:LsdException Locked='false' Priority='65' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium List 1 Accent 2'/>
  <w:LsdException Locked='false' Priority='66' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium List 2 Accent 2'/>
  <w:LsdException Locked='false' Priority='67' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Grid 1 Accent 2'/>
  <w:LsdException Locked='false' Priority='68' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Grid 2 Accent 2'/>
  <w:LsdException Locked='false' Priority='69' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Grid 3 Accent 2'/>
  <w:LsdException Locked='false' Priority='70' SemiHidden='false'
   UnhideWhenUsed='false' Name='Dark List Accent 2'/>
  <w:LsdException Locked='false' Priority='71' SemiHidden='false'
   UnhideWhenUsed='false' Name='Colorful Shading Accent 2'/>
  <w:LsdException Locked='false' Priority='72' SemiHidden='false'
   UnhideWhenUsed='false' Name='Colorful List Accent 2'/>
  <w:LsdException Locked='false' Priority='73' SemiHidden='false'
   UnhideWhenUsed='false' Name='Colorful Grid Accent 2'/>
  <w:LsdException Locked='false' Priority='60' SemiHidden='false'
   UnhideWhenUsed='false' Name='Light Shading Accent 3'/>
  <w:LsdException Locked='false' Priority='61' SemiHidden='false'
   UnhideWhenUsed='false' Name='Light List Accent 3'/>
  <w:LsdException Locked='false' Priority='62' SemiHidden='false'
   UnhideWhenUsed='false' Name='Light Grid Accent 3'/>
  <w:LsdException Locked='false' Priority='63' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Shading 1 Accent 3'/>
  <w:LsdException Locked='false' Priority='64' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Shading 2 Accent 3'/>
  <w:LsdException Locked='false' Priority='65' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium List 1 Accent 3'/>
  <w:LsdException Locked='false' Priority='66' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium List 2 Accent 3'/>
  <w:LsdException Locked='false' Priority='67' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Grid 1 Accent 3'/>
  <w:LsdException Locked='false' Priority='68' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Grid 2 Accent 3'/>
  <w:LsdException Locked='false' Priority='69' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Grid 3 Accent 3'/>
  <w:LsdException Locked='false' Priority='70' SemiHidden='false'
   UnhideWhenUsed='false' Name='Dark List Accent 3'/>
  <w:LsdException Locked='false' Priority='71' SemiHidden='false'
   UnhideWhenUsed='false' Name='Colorful Shading Accent 3'/>
  <w:LsdException Locked='false' Priority='72' SemiHidden='false'
   UnhideWhenUsed='false' Name='Colorful List Accent 3'/>
  <w:LsdException Locked='false' Priority='73' SemiHidden='false'
   UnhideWhenUsed='false' Name='Colorful Grid Accent 3'/>
  <w:LsdException Locked='false' Priority='60' SemiHidden='false'
   UnhideWhenUsed='false' Name='Light Shading Accent 4'/>
  <w:LsdException Locked='false' Priority='61' SemiHidden='false'
   UnhideWhenUsed='false' Name='Light List Accent 4'/>
  <w:LsdException Locked='false' Priority='62' SemiHidden='false'
   UnhideWhenUsed='false' Name='Light Grid Accent 4'/>
  <w:LsdException Locked='false' Priority='63' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Shading 1 Accent 4'/>
  <w:LsdException Locked='false' Priority='64' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Shading 2 Accent 4'/>
  <w:LsdException Locked='false' Priority='65' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium List 1 Accent 4'/>
  <w:LsdException Locked='false' Priority='66' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium List 2 Accent 4'/>
  <w:LsdException Locked='false' Priority='67' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Grid 1 Accent 4'/>
  <w:LsdException Locked='false' Priority='68' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Grid 2 Accent 4'/>
  <w:LsdException Locked='false' Priority='69' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Grid 3 Accent 4'/>
  <w:LsdException Locked='false' Priority='70' SemiHidden='false'
   UnhideWhenUsed='false' Name='Dark List Accent 4'/>
  <w:LsdException Locked='false' Priority='71' SemiHidden='false'
   UnhideWhenUsed='false' Name='Colorful Shading Accent 4'/>
  <w:LsdException Locked='false' Priority='72' SemiHidden='false'
   UnhideWhenUsed='false' Name='Colorful List Accent 4'/>
  <w:LsdException Locked='false' Priority='73' SemiHidden='false'
   UnhideWhenUsed='false' Name='Colorful Grid Accent 4'/>
  <w:LsdException Locked='false' Priority='60' SemiHidden='false'
   UnhideWhenUsed='false' Name='Light Shading Accent 5'/>
  <w:LsdException Locked='false' Priority='61' SemiHidden='false'
   UnhideWhenUsed='false' Name='Light List Accent 5'/>
  <w:LsdException Locked='false' Priority='62' SemiHidden='false'
   UnhideWhenUsed='false' Name='Light Grid Accent 5'/>
  <w:LsdException Locked='false' Priority='63' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Shading 1 Accent 5'/>
  <w:LsdException Locked='false' Priority='64' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Shading 2 Accent 5'/>
  <w:LsdException Locked='false' Priority='65' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium List 1 Accent 5'/>
  <w:LsdException Locked='false' Priority='66' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium List 2 Accent 5'/>
  <w:LsdException Locked='false' Priority='67' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Grid 1 Accent 5'/>
  <w:LsdException Locked='false' Priority='68' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Grid 2 Accent 5'/>
  <w:LsdException Locked='false' Priority='69' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Grid 3 Accent 5'/>
  <w:LsdException Locked='false' Priority='70' SemiHidden='false'
   UnhideWhenUsed='false' Name='Dark List Accent 5'/>
  <w:LsdException Locked='false' Priority='71' SemiHidden='false'
   UnhideWhenUsed='false' Name='Colorful Shading Accent 5'/>
  <w:LsdException Locked='false' Priority='72' SemiHidden='false'
   UnhideWhenUsed='false' Name='Colorful List Accent 5'/>
  <w:LsdException Locked='false' Priority='73' SemiHidden='false'
   UnhideWhenUsed='false' Name='Colorful Grid Accent 5'/>
  <w:LsdException Locked='false' Priority='60' SemiHidden='false'
   UnhideWhenUsed='false' Name='Light Shading Accent 6'/>
  <w:LsdException Locked='false' Priority='61' SemiHidden='false'
   UnhideWhenUsed='false' Name='Light List Accent 6'/>
  <w:LsdException Locked='false' Priority='62' SemiHidden='false'
   UnhideWhenUsed='false' Name='Light Grid Accent 6'/>
  <w:LsdException Locked='false' Priority='63' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Shading 1 Accent 6'/>
  <w:LsdException Locked='false' Priority='64' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Shading 2 Accent 6'/>
  <w:LsdException Locked='false' Priority='65' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium List 1 Accent 6'/>
  <w:LsdException Locked='false' Priority='66' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium List 2 Accent 6'/>
  <w:LsdException Locked='false' Priority='67' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Grid 1 Accent 6'/>
  <w:LsdException Locked='false' Priority='68' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Grid 2 Accent 6'/>
  <w:LsdException Locked='false' Priority='69' SemiHidden='false'
   UnhideWhenUsed='false' Name='Medium Grid 3 Accent 6'/>
  <w:LsdException Locked='false' Priority='70' SemiHidden='false'
   UnhideWhenUsed='false' Name='Dark List Accent 6'/>
  <w:LsdException Locked='false' Priority='71' SemiHidden='false'
   UnhideWhenUsed='false' Name='Colorful Shading Accent 6'/>
  <w:LsdException Locked='false' Priority='72' SemiHidden='false'
   UnhideWhenUsed='false' Name='Colorful List Accent 6'/>
  <w:LsdException Locked='false' Priority='73' SemiHidden='false'
   UnhideWhenUsed='false' Name='Colorful Grid Accent 6'/>
  <w:LsdException Locked='false' Priority='19' SemiHidden='false'
   UnhideWhenUsed='false' QFormat='true' Name='Subtle Emphasis'/>
  <w:LsdException Locked='false' Priority='21' SemiHidden='false'
   UnhideWhenUsed='false' QFormat='true' Name='Intense Emphasis'/>
  <w:LsdException Locked='false' Priority='31' SemiHidden='false'
   UnhideWhenUsed='false' QFormat='true' Name='Subtle Reference'/>
  <w:LsdException Locked='false' Priority='32' SemiHidden='false'
   UnhideWhenUsed='false' QFormat='true' Name='Intense Reference'/>
  <w:LsdException Locked='false' Priority='33' SemiHidden='false'
   UnhideWhenUsed='false' QFormat='true' Name='Book Title'/>
  <w:LsdException Locked='false' Priority='37' Name='Bibliography'/>
  <w:LsdException Locked='false' Priority='39' QFormat='true' Name='TOC Heading'/>
 </w:LatentStyles>
</xml><![endif]-->
<style>
<!--p
	{margin: inherit;}

 /* Font Definitions */
 @font-face
	{font-family:Helvetica;
	panose-1:2 11 6 4 2 2 2 2 2 4;
	mso-font-charset:0;
	mso-generic-font-family:swiss;
	mso-font-pitch:variable;
	mso-font-signature:-536858881 -1073711037 9 0 511 0;}
@font-face
	{font-family:'Cambria Math';
	panose-1:2 4 5 3 5 4 6 3 2 4;
	mso-font-charset:1;
	mso-generic-font-family:roman;
	mso-font-format:other;
	mso-font-pitch:variable;
	mso-font-signature:0 0 0 0 0 0;}
@font-face
	{font-family:Cambria;
	panose-1:2 4 5 3 5 4 6 3 2 4;
	mso-font-charset:0;
	mso-generic-font-family:roman;
	mso-font-pitch:variable;
	mso-font-signature:-536870145 1073743103 0 0 415 0;}
@font-face
	{font-family:Tahoma;
	panose-1:2 11 6 4 3 5 4 4 2 4;
	mso-font-charset:0;
	mso-generic-font-family:swiss;
	mso-font-pitch:variable;
	mso-font-signature:-520081665 -1073717157 41 0 66047 0;}
 /* Style Definitions */
 p.MsoNormal, li.MsoNormal, div.MsoNormal
	{mso-style-unhide:no;
	mso-style-qformat:yes;
	mso-style-parent:'';
	margin:0cm;
	margin-bottom:.0001pt;
	mso-pagination:widow-orphan;
	font-size:12.0pt;
	font-family:'Times New Roman','serif';
	mso-fareast-font-family:'Times New Roman';
	mso-fareast-theme-font:minor-fareast;}
a:link, span.MsoHyperlink
	{mso-style-priority:99;
	color:#EB0028;
	text-decoration:underline;
	text-underline:single;}
a:visited, span.MsoHyperlinkFollowed
	{mso-style-noshow:yes;
	mso-style-priority:99;
	color:#EB0028;
	text-decoration:underline;
	text-underline:single;}
p
	{mso-style-noshow:yes;
	mso-style-priority:99;
	mso-margin-top-alt:auto;
	margin-right:0cm;
	mso-margin-bottom-alt:auto;
	margin-left:0cm;
	mso-pagination:widow-orphan;
	font-size:12.0pt;
	font-family:'Times New Roman','serif';
	mso-fareast-font-family:'Times New Roman';
	mso-fareast-theme-font:minor-fareast;}
p.MsoAcetate, li.MsoAcetate, div.MsoAcetate
	{mso-style-noshow:yes;
	mso-style-priority:99;
	mso-style-link:'Balloon Text Char';
	margin:0cm;
	margin-bottom:.0001pt;
	mso-pagination:widow-orphan;
	font-size:8.0pt;
	font-family:'Tahoma','sans-serif';
	mso-fareast-font-family:'Times New Roman';
	mso-fareast-theme-font:minor-fareast;}
p.MsoNoSpacing, li.MsoNoSpacing, div.MsoNoSpacing
	{mso-style-noshow:yes;
	mso-style-priority:1;
	mso-style-unhide:no;
	mso-style-qformat:yes;
	mso-margin-top-alt:auto;
	margin-right:0cm;
	mso-margin-bottom-alt:auto;
	margin-left:0cm;
	mso-pagination:widow-orphan;
	font-size:12.0pt;
	font-family:'Times New Roman','serif';
	mso-fareast-font-family:'Times New Roman';
	mso-fareast-theme-font:minor-fareast;}
span.BalloonTextChar
	{mso-style-name:'Balloon Text Char';
	mso-style-noshow:yes;
	mso-style-priority:99;
	mso-style-unhide:no;
	mso-style-locked:yes;
	mso-style-link:'Balloon Text';
	mso-ansi-font-size:8.0pt;
	mso-bidi-font-size:8.0pt;
	font-family:'Tahoma','sans-serif';
	mso-ascii-font-family:Tahoma;
	mso-fareast-font-family:'Times New Roman';
	mso-fareast-theme-font:minor-fareast;
	mso-hansi-font-family:Tahoma;
	mso-bidi-font-family:Tahoma;}
span.SpellE
	{mso-style-name:'';
	mso-spl-e:yes;}
span.GramE
	{mso-style-name:'';
	mso-gram-e:yes;}
.MsoChpDefault
	{mso-style-type:export-only;
	mso-default-props:yes;
	font-size:10.0pt;
	mso-ansi-font-size:10.0pt;
	mso-bidi-font-size:10.0pt;}
@page Section1
	{size:612.0pt 792.0pt;
	margin:72.0pt 72.0pt 72.0pt 72.0pt;
	mso-header-margin:36.0pt;
	mso-footer-margin:36.0pt;
	mso-paper-source:0;}
div.Section1
	{page:Section1;}
-->
</style>
<!--[if gte mso 10]>
<style>
 /* Style Definitions */
 table.MsoNormalTable
	{mso-style-name:'Table Normal';
	mso-tstyle-rowband-size:0;
	mso-tstyle-colband-size:0;
	mso-style-noshow:yes;
	mso-style-priority:99;
	mso-style-qformat:yes;
	mso-style-parent:'';
	mso-padding-alt:0cm 5.4pt 0cm 5.4pt;
	mso-para-margin:0cm;
	mso-para-margin-bottom:.0001pt;
	mso-pagination:widow-orphan;
	font-size:10.0pt;
	font-family:'Times New Roman','serif';}
</style>
<![endif]--><!--[if gte mso 9]><xml>
 <o:shapedefaults v:ext='edit' spidmax='12290'/>
</xml><![endif]--><!--[if gte mso 9]><xml>
 <o:shapelayout v:ext='edit'>
  <o:idmap v:ext='edit' data='1'/>
 </o:shapelayout></xml><![endif]-->
</head>

<body bgcolor='#ECEBEA' lang=EN-PH link='#EB0028' vlink='#EB0028'
style='tab-interval:36.0pt;min-width: 100%;-webkit-text-size-adjust: 100%;
-ms-text-size-adjust: 100%'>

<div class=Section1>

<div>

<div>

<div>

<div>

<div>

<div>

<div>

<div>

<div>

<div>

<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0 width='100%'
 style='width:100.0%;background:#ECEBEA;border-collapse:collapse;mso-yfti-tbllook:
 1184;mso-padding-alt:0cm 0cm 0cm 0cm'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>
  <td valign=top style='padding:0cm 0cm 0cm 0cm'>
  <div align=center>
  <table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0
   style='border-collapse:collapse;mso-yfti-tbllook:1184;mso-padding-alt:0cm 0cm 0cm 0cm'>
   <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>
    <td valign=top style='background:white;padding:27.0pt 31.5pt 15.75pt 31.5pt'>
    <div align=center>
    <table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0
     style='border-collapse:collapse;mso-yfti-tbllook:1184;mso-padding-alt:
     0cm 0cm 0cm 0cm'>
     <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes;
      height:720.0pt'>
      <td width=875 valign=top style='width:525.0pt;padding:0cm 0cm 0cm 0cm;
      height:720.0pt'>
      <table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0
       width='100%' style='width:100.0%;border-collapse:collapse;mso-yfti-tbllook:
       1184;mso-padding-alt:0cm 0cm 0cm 0cm'>
       <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:42.0pt'>
        <td width=875 valign=top style='width:525.0pt;padding:0cm 0cm 0cm 0cm;
        height:42.0pt'>
        <div class=MsoNormal align=center style='text-align:center'><span
        style='font-size:11.5pt;font-family:'Helvetica','sans-serif';
        mso-fareast-font-family:'Times New Roman';color:#222222'>
        <hr size=1 width='100%' noshade style='color:#D9D9D9' align=center>
        </span></div>
        </td>
       </tr>
       <tr style='mso-yfti-irow:1'>
        <td valign=top style='padding:0cm 0cm 0cm 0cm'>
        <table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0
         width='100%' style='width:100.0%;border-collapse:collapse;mso-yfti-tbllook:
         1184;mso-padding-alt:0cm 0cm 0cm 0cm'>
         <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:60.0pt'>
          <td width=875 valign=top style='width:525.0pt;padding:15.0pt 7.5pt 15.0pt 7.5pt;
          height:60.0pt'>
          <p class=MsoNormal><b style='mso-bidi-font-weight:normal'><span
          style='font-size:11.0pt;font-family:'Cambria','serif';mso-ascii-theme-font:
          major-latin;mso-hansi-theme-font:major-latin;mso-bidi-font-family:
          Helvetica;color:black;mso-themecolor:text1'><u1:p>Dear Sir/Madame,<u4:p></u4:p></span></b><span
          style='font-size:11.0pt;font-family:'Cambria','serif';mso-ascii-theme-font:
          major-latin;mso-hansi-theme-font:major-latin'>&nbsp;<o:p></o:p></span></p>
          <p class=MsoNormal><span style='font-size:11.0pt;font-family:'Cambria','serif';
          mso-ascii-theme-font:major-latin;mso-hansi-theme-font:major-latin'><o:p>&nbsp;</o:p></span></p>
          <p class=MsoNormal><span style='font-size:11.0pt;font-family:'Cambria','serif';
          mso-ascii-theme-font:major-latin;mso-hansi-theme-font:major-latin'><o:p>&nbsp;</o:p></span></p>
          <p class=MsoNormal><span style='font-size:11.0pt;font-family:'Cambria','serif';
          mso-ascii-theme-font:major-latin;mso-hansi-theme-font:major-latin;
          mso-bidi-font-family:Helvetica;color:black;mso-themecolor:text1'><u1:p></u1:p></u2:p>You
          may now log-in to the following URL: <span
          style='mso-spacerun:yes'>&nbsp;</span></span><span class=SpellE><span
          class=GramE>
		<a href='#LINK#'>
		<span style='font-size:11.0pt;font-family:'Cambria','serif';
          mso-ascii-theme-font:major-latin;mso-hansi-theme-font:major-latin;
          mso-bidi-font-family:Helvetica;color:#0070C0'>#LINK#</span></a></span></span><span
          class=GramE><span style='font-size:11.0pt;font-family:'Cambria','serif';
          mso-ascii-theme-font:major-latin;mso-hansi-theme-font:major-latin;
          mso-bidi-font-family:Helvetica;color:#0070C0'><span
          style='mso-spacerun:yes'>&nbsp; </span></span><span style='font-size:
          11.0pt;font-family:'Cambria','serif';mso-ascii-theme-font:major-latin;
          mso-hansi-theme-font:major-latin;mso-bidi-font-family:Helvetica;
          color:black;mso-themecolor:text1'>to</span></span><span
          style='font-size:11.0pt;font-family:'Cambria','serif';mso-ascii-theme-font:
          major-latin;mso-hansi-theme-font:major-latin;mso-bidi-font-family:
          Helvetica;color:black;mso-themecolor:text1'> reset your password..<u4:p></u4:p></span><span
          style='font-size:11.0pt;font-family:'Cambria','serif';mso-ascii-theme-font:
          major-latin;mso-hansi-theme-font:major-latin'><o:p></o:p></span></p>
          <p class=MsoNormal><u2:p><span style='font-size:11.0pt;font-family:
          'Cambria','serif';mso-ascii-theme-font:major-latin;mso-hansi-theme-font:
          major-latin'>&nbsp;<o:p></o:p></span></p>
          <p class=MsoNormal><span style='font-size:11.0pt;font-family:'Cambria','serif';
          mso-ascii-theme-font:major-latin;mso-hansi-theme-font:major-latin;
          mso-bidi-font-family:Helvetica;color:black;mso-themecolor:text1'>This
          link will expire within 24 hours. Please reset your password before
          it expires.<o:p></o:p></span></p>
          <p class=MsoNormal><span style='font-size:11.0pt;font-family:'Cambria','serif';
          mso-ascii-theme-font:major-latin;mso-hansi-theme-font:major-latin;
          mso-bidi-font-family:Helvetica;color:black;mso-themecolor:text1'><o:p>&nbsp;</o:p></span></p>
          <p class=MsoNormal><span style='font-size:11.0pt;font-family:'Cambria','serif';
          mso-ascii-theme-font:major-latin;mso-hansi-theme-font:major-latin'>&nbsp;<o:p></o:p></span></p>
          <p class=MsoNormal><span style='font-size:11.0pt;font-family:'Cambria','serif';
          mso-ascii-theme-font:major-latin;mso-hansi-theme-font:major-latin'></u2:p><u2:p><o:p>&nbsp;</o:p></span></p>
          <p class=MsoNormal><span style='font-size:11.0pt;font-family:'Cambria','serif';
          mso-ascii-theme-font:major-latin;mso-hansi-theme-font:major-latin'><o:p>&nbsp;</o:p></span></p>
          <p class=MsoNormal><span style='font-size:11.0pt;font-family:'Cambria','serif';
          mso-ascii-theme-font:major-latin;mso-hansi-theme-font:major-latin'></u2:p><u2:p>&nbsp;<o:p></o:p></span></p>
          <p class=MsoNormal><span style='font-size:11.0pt;font-family:'Cambria','serif';
          mso-ascii-theme-font:major-latin;mso-hansi-theme-font:major-latin;
          mso-bidi-font-family:Helvetica;color:black;mso-themecolor:text1'></u2:p>Regards,<u4:p></u4:p></span><span
          style='font-size:11.0pt;font-family:'Cambria','serif';mso-ascii-theme-font:
          major-latin;mso-hansi-theme-font:major-latin'><o:p></o:p></span></p>
          <p class=MsoNormal><b><span style='font-size:11.0pt;font-family:'Cambria','serif';
          mso-ascii-theme-font:major-latin;mso-hansi-theme-font:major-latin;
          mso-bidi-font-family:Helvetica;color:black;mso-themecolor:text1'>#nwAppName#</span></b>&nbsp;</u2:p></p>
          </td>
         </tr>
         <tr style='mso-yfti-irow:1;mso-yfti-lastrow:yes;height:60.0pt'>
          <td width=875 valign=top style='width:525.0pt;padding:15.0pt 7.5pt 15.0pt 7.5pt;
          height:60.0pt'>
          <p class=MsoNormal><b style='mso-bidi-font-weight:normal'><span
          style='font-size:11.0pt;font-family:'Cambria','serif';mso-ascii-theme-font:
          major-latin;mso-hansi-theme-font:major-latin;mso-bidi-font-family:
          Helvetica;color:black;mso-themecolor:text1'><o:p>&nbsp;</o:p></span></b></p>
          </td>
         </tr>
        </table>
        </td>
       </tr>
       <tr style='mso-yfti-irow:2;mso-yfti-lastrow:yes;height:60.0pt'>
        <td width=600 valign=top style='width:360.0pt;padding:7.5pt 0cm 0cm 0cm;
        height:60.0pt'>
        <p class=MsoNormal><span style='font-family:'Arial','sans-serif';
        color:black;mso-themecolor:text1'><span style='mso-spacerun:yes'>&nbsp;
        </span><span style='mso-spacerun:yes'>&nbsp;</span><u7:p></u7:p></span><u2:p></u2:p><o:p></o:p></p>
        <u1:p></u1:p>
        <p class=MsoNormal align=center style='text-align:center'><b><span
        style='font-size:9.0pt;font-family:'Helvetica','sans-serif';mso-fareast-font-family:
        'Times New Roman';color:#A6A6A6'>This is a system generated message.
        Please do not reply to this email.</span></b></p>
        </td>
       </tr>
       <u7:p></u7:p>
      </table>
      </td>
     </tr>
    </table>
    </div>
    </td>
   </tr>
  </table>
  </div>
  </td>
 </tr>
</table>

<u6:p></u6:p>

<p class=MsoNormal><span lang=EN-US style='mso-fareast-font-family:'Times New Roman';
mso-ansi-language:EN-US'><o:p>&nbsp;</o:p></span></p>

</div>

</div>

</div>

</div>

</div>

</div>

</div>

</div>

</div>

</div>

</div>

</body>

</html>
";
            #endregion
            strF = strF.Replace("#LINK#", xurl);
            strF = strF.Replace("#nwAppName#", AppName);
            
            return strF;
        }

        protected void btnBack_Click(object sender, EventArgs e)
        {
            Response.Redirect("logout.aspx");
        }

    }
}
