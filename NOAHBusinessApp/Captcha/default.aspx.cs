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

using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Linq;
using NoahWebLib;


    public partial class Captcha : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.Clear();
            nwSystem.ResponseHeaderRemove(Response,false);

            Bitmap objBitmap = new Bitmap(178, 60);
            Graphics objGraphics = Graphics.FromImage(objBitmap);
            objGraphics.Clear(Color.White);
            Random objRandom = new Random();
            objGraphics.DrawLine(Pens.Black, objRandom.Next(0, 50), objRandom.Next(10, 30), objRandom.Next(0, 200), objRandom.Next(0, 50));
            objGraphics.DrawRectangle(Pens.Blue, objRandom.Next(0, 20), objRandom.Next(0, 20), objRandom.Next(50, 80), objRandom.Next(0, 20));
            objGraphics.DrawLine(Pens.Blue, objRandom.Next(0, 20), objRandom.Next(10, 50), objRandom.Next(100, 200), objRandom.Next(0, 80));
            Brush objBrush =
                default(Brush);
            //create background style  
            HatchStyle[] aHatchStyles = new HatchStyle[]  
            {  
                HatchStyle.BackwardDiagonal, HatchStyle.Cross, HatchStyle.DashedDownwardDiagonal, HatchStyle.DashedHorizontal, HatchStyle.DashedUpwardDiagonal, HatchStyle.DashedVertical,  
                    HatchStyle.DiagonalBrick, HatchStyle.DiagonalCross, HatchStyle.Divot, HatchStyle.DottedDiamond, HatchStyle.DottedGrid, HatchStyle.ForwardDiagonal, HatchStyle.Horizontal,  
                    HatchStyle.HorizontalBrick, HatchStyle.LargeCheckerBoard, HatchStyle.LargeConfetti, HatchStyle.LargeGrid, HatchStyle.LightDownwardDiagonal, HatchStyle.LightHorizontal  
            };
            //create rectangular area  
            RectangleF oRectangleF = new RectangleF(0, 0, 300, 300);
            objBrush = new HatchBrush(aHatchStyles[objRandom.Next(aHatchStyles.Length - 3)], Color.FromArgb((objRandom.Next(100, 255)), (objRandom.Next(100, 255)), (objRandom.Next(100, 255))), Color.White);
            objGraphics.FillRectangle(objBrush, oRectangleF);
            //Generate the image for captcha  
            string captchaText = string.Format("{0:X}", objRandom.Next(1000000, 9999999));
            string captchaTextOrig = captchaText;
            try
            {
                captchaText = Request.QueryString["cp"].ToString();
                captchaText = captchaText.Replace("AAGxAAG", "+");
                captchaTextOrig = captchaText;
                NoahWebLib.NoahWebDataAccess.AESEncrytDecry aes = new NoahWebLib.NoahWebDataAccess.AESEncrytDecry();
                captchaText = aes.DecryptStringAES(captchaText);
                if(captchaText == "keyError")
                    throw new ArgumentNullException("plainText");
                
            }catch{
                captchaText = "error on\n Captch";
            }

            try
            {
                string code = "";
                code = Request.QueryString["ses"].ToString();
                Session[code + "_cp"] = captchaTextOrig;
            }
            catch
            {

            }

                //add the captcha value in session  
                //Session["CaptchaVerify"] = captchaText.ToLower();

                Font objFont = new Font("Courier New", 15, FontStyle.Bold);
            //Draw the image for captcha  
            Random objRandomx = new Random();
            objGraphics.DrawString(captchaText, objFont, Brushes.Black, objRandomx.Next(10, 35), objRandomx.Next(10, 25));
            objBitmap.Save(Response.OutputStream, ImageFormat.Bmp);  
            
        }
    }



