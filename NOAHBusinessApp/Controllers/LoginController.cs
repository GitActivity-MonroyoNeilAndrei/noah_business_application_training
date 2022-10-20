using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
//<AddedNameSpaces>
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using NoahWebLib;
//</AddedNameSpaces>

namespace NoahWeb.Controllers
{
    public class LoginController : NoahWebLib.Main.MainLoginController
    {
        
    }
    public class LogoutController : NoahWebLib.Main.MainLogoutController
    {

    }
}