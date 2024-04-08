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
using System.Net;

namespace NoahWeb
{
    public partial class OTP : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Session["noahwebOTPRef"] += "";
            Session["noahwebOTP"] += "";
            Session["noahwebOTPNumber"] += "";
            Session["noahwebOTPUserID"] += "";
            Session["noahwebOTPEmail"] += "";

            string strOTPUSER = Session["noahwebOTPUserID"].ToString();

            string strOTPRef = Session["noahwebOTPRef"].ToString();
            string strOTP = Session["noahwebOTP"].ToString();
            string strOTPNum = Session["noahwebOTPNumber"].ToString();

            string noahwebOTPEmail = Session["noahwebOTPEmail"].ToString();


            // HttpContext.Current.Session["noahwebOTPEmail"] = "true";

            NoahWebLib.nwSFObjects SFObjects = new NoahWebLib.nwSFObjects();


            if (noahwebOTPEmail.ToLower() == "true")
            {
                try
                {
                    strOTPUSER = NoahWebLib.nwSystem.StringDecrypt(strOTPUSER);
                    string email = SFObjects.returnText("SELECT Email FROM FPTI_NW.noahweb_zEmail WHERE UserID = '" + strOTPUSER.Replace("'", "''") + "'", NoahWebLib.nwSystem.ARKDB_ConnectionString());
                    strOTPNum = email;
                }
                catch { }
                Label3.Text = "email";
            }
            else
            {
                Label3.Text = "mobile phone number";

            }


            Label2.Text = strOTPNum;
            Label1.Text = strOTPRef;
            //Label1.Text = strOTPRef + " : " + strOTP;

            if (strOTP == "")
            {
                // Response.Redirect("default.aspx");
            }
            else
            {

            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            Session["noahwebOTPUserID"] += "";
            Session["noahwebOTP"] += "";
            Session["noahwebOTPRef"] += "";
            Session["noahwebOTPNumber"] += "";

            string strOTP = Session["noahwebOTP"].ToString();
            string strOTPRef = Session["noahwebOTPRef"].ToString();
            string strOTPNum = Session["noahwebOTPNumber"].ToString();


            string strOTPUSER = Session["noahwebOTPUserID"].ToString();
            NoahWebLib.nwSFObjects SFObjects = new NoahWebLib.nwSFObjects();
            string otp = TextBox1.Text;
            string suser = User.Identity.Name;



            DataTable dtotp = SFObjects.LoadDataTable($" Select * from[FPTI_NW].[OTP] where  recuser = '{suser}' and OTPCode = '{otp}'  and [usedate] is null", NoahWebLib.nwSystem.ARKDB_ConnectionString());
            if (dtotp.Rows.Count >= 1)
            {
                SFObjects.returnText($"update [FPTI_NW].[OTP] set [usedate] = dbo.GetNoahDate()  where recuser ='{suser}' and [usedate] is null", NoahWebLib.nwSystem.ARKDB_ConnectionString());
                Session["noahwebUserID"] = strOTPUSER;
                Session["noahwebOTP"] = "";
                Session["noahwebOTPRef"] = "";
                Response.Redirect("home");
            }



            if (strOTP == TextBox1.Text)
            {
                Session["noahwebUserID"] = strOTPUSER;
                Session["noahwebOTP"] = "";
                Session["noahwebOTPRef"] = "";
                Response.Redirect("home");

            }
            else
            {
                Label4.Text = "Invalid OTP. Please try again.";
                //Session["noahwebOTPUserID"] = "";
                //Session["noahwebOTP"] = "";
                //Session["noahwebOTPRef"] = "";
                //Response.Redirect("default.aspx");
            }
        }

        protected void Button2_Click(object sender, EventArgs e)
        {
            Response.Redirect("logout");
        }
    }
}
