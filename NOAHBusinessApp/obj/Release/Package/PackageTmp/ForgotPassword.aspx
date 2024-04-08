<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ForgotPassword.aspx.cs" Inherits="NoahWeb.ForgotPassword" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <link rel="shortcut icon" href="custom_materials\materials\system_images\ThemeImage\logo40x40.png">
    <title>Forgot Password</title>
    
    <script src="materials/jslib/fpti.js" ></script>
    <script src="materials/jslib/fptiextra.js"></script>
    <script src="materials/jslib/noahwebAAGlib.js"></script>
    <link href='materials/css/custom-theme/fpti.css' rel='stylesheet'>
    <link href='materials/css/noah_web-ui-ver2.css' rel='stylesheet'>
    <link href='materials/css/ForgotPassword.css' rel='stylesheet'>
    
</head>
<body>
    <form id="form1" runat="server">
    <div id="MainFrame">
            <div class="nwCuz-001">
                Forgot Password
                </div>
           <asp:Panel ID="Panel1" runat="server">
            <div>
          
               
            <div class="nwLabel">Username</div>    
            <asp:TextBox ID="txtUsername" runat="server" ></asp:TextBox>
            </div>
            
            <div>
            <div class="nwLabel">Email Address</div>      
            <asp:TextBox ID="txtEmail" runat="server" ></asp:TextBox>
            </div>
            
            <div>
            <div class="nwLabel">Confirm Email Address</div>  
            <asp:TextBox ID="txtConfirm" runat="server" ></asp:TextBox>
            </div>
            <div>
                <asp:Button ID="btnChange" runat="server" Text="Done" 
                    onclick="btnChange_Click"  />
                <asp:Button ID="btnBack" runat="server" Text="Back" onclick="btnBack_Click" />
            </div>
             </asp:Panel>
            <div>
                <asp:Label ID="lblMsg" runat="server" Text=""></asp:Label>
            </div>
    </div>
    </form>
</body>
</html>
