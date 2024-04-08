<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="OTP.aspx.cs" Inherits="NoahWeb.OTP" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
 <meta name="theme-color" content="#184688" />
<meta name="viewport" content="width=device-width,maximum-scale=1.0,initial-scale=1.0,minimum-scale=1.0,user-scalable=yes">

 <title>OTP - One Time Password</title>
 <link rel="shortcut icon" href="custom_materials\materials\system_images\ThemeImage\logo40x40.png">

 <script src="materials/jslib/fpti.js" ></script>
<script src="materials/jslib/fptiextra.js"></script>
<script src="materials/jslib/noahwebAAGlib.js"></script>
<style>
    div#container {
    width: 500px;
    margin: auto;
    margin-top: 5%;
        font-family: tahoma;
    }
    .logo {
    /*background-color: gray;*/
    width: 80%;
    height: 200px;
    margin: auto;
    margin-bottom: 15px;
        background-image: url(custom_materials/materials/system_images/logo.png);
    background-size: 100%;
    background-position: center;
    background-repeat:no-repeat;
    }
    .label {
    font-weight: bold;
    background-color: #83a7c7;
    padding: 5px;
    margin-bottom: 20px;
    }
    span#Label1 {
    text-decoration: underline;
    color: darkblue;
    }   
    .labelMessage {
    margin-bottom: 25px;
    }
    input#TextBox1 {
    margin-bottom: 15px;
    }
    input#Button1, input#Button2 {
    margin-bottom: 25px;
    width: 150px;
    padding: 5px;
    border-radius: 5px;
    background-color: orange;
    border: 1px solid #ffa80a;
    color: white;
    font-size: 14px;
    margin-right: 15px;
    box-shadow: 1px 5px 10px #6b6b6b7d;
    }
    input#Button1 {
    background-color: #207ac1;
    border: 1px solid #76a9d2;
    }
    .note {
    font-size: 12px;
    color: darkgray;
    }
    span#Label2 {
    font-weight: bold;
    font-size: 15px;
    }

    @media only screen and (max-width: 800px) {
        body #container  {
    	    width: 100%;
        }	
    }   

  .noah-webui-Window {
    display: none;
}
 
    
</style>
</head>
<body>
    <form id="form1" runat="server">
    <div id="container">
     <div class="logo"></div>
     <div class="label">One-Time Password (OTP)</div>
     <div class="labelMessage">
     As part of our security measure, a One-Time Password (OTP) has been delivered to your registered <asp:Label ID="Label3" runat="server" Text="Label"></asp:Label> (<asp:Label ID="Label2" runat="server" Text="XXXXXXX4093"></asp:Label>). 
     Ref#:<asp:Label ID="Label1" runat="server" Text="8121341"></asp:Label>
     </div>
     <div>
     Enter your OTP <asp:TextBox ID="TextBox1" autocomplete="off" runat="server" Width="300px"></asp:TextBox>
     </div>
     <div>
         <br>
         <asp:Label ID="Label4" runat="server" Text="" ForeColor="Red"></asp:Label>
         <br>
    </div>
     <div>
        <asp:Button ID="Button1" runat="server" Text="Submit" onclick="Button1_Click" />
        <asp:Button ID="Button2" runat="server" Text="Cancel" 
        onclick="Button2_Click" />
     </div>
     <div class="note">
      Your One-Time Password (OTP) shall expire within 5 minutes. If you did not receive your OTP, or has expired, you will be redirected to the Home page.					
     </div>
     
    </div>
    </form>
 </body>   
    
		
						
						

   
</html>
