<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ChangePassword.aspx.cs" Inherits="NoahWeb.ChangePassword" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
<link rel="shortcut icon" href="custom_materials\materials\system_images\ThemeImage\logo40x40.png">
    <title>Change Password</title>
    
    <script src="materials/jslib/fpti.js" ></script>
    <script src="materials/jslib/fptiextra.js"></script>
    <script src="materials/jslib/noahwebAAGlib.js"></script>
    <link href='materials/css/custom-theme/fpti.css' rel='stylesheet'>
 <%--   <link href='materials/css/noah_web-ui-ver2.css' rel='stylesheet'>--%>
    <link href='materials/css/ChangePassword.css' rel='stylesheet'>
</head>
<body>
    <form id="form1" runat="server">
    <div id="MainFrame">
            <div class="nwCuz-001">
                Change Password
                </div>
        <asp:Panel ID="Panel1" runat="server">
        
            <asp:Panel ID="panelOLDPass" runat="server">
              <div class="nwLabel">Old Password</div>    
                <asp:TextBox ID="txtOldPass" runat="server" TextMode="Password"></asp:TextBox>
            </asp:Panel>
            
            
            <div>
            <div class="nwLabel">New Password</div>      
            <asp:TextBox ID="txtNewPass" runat="server" TextMode="Password"></asp:TextBox>
            </div>
            
            <div>
            <div class="nwLabel">Confirm New Password</div>  
            <asp:TextBox ID="txtConfirm" runat="server" TextMode="Password"></asp:TextBox>
            </div>
            <div>
                <asp:Button ID="btnChange" runat="server" Text="Done" 
                    onclick="btnChange_Click"  />
                <asp:Button ID="btnBack" runat="server" Text="Back" onclick="btnBack_Click" 
                      />
            </div>
            </asp:Panel>
            
            <div>
                <asp:Label ID="lblMsg" runat="server" Text=""></asp:Label>
            </div>
    </div>
    </form>
</body>
</html>
