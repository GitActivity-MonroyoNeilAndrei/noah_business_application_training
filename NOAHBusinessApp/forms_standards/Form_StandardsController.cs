using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NOAHBusinessApp.forms_standards
{
    public class Form_StandardsController : NoahWebLib.ExportToExcel
    {
        // GET: Form_Standards
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ExportToExcel()
        {
            ExecuteExport();
            return null;
        }
        
    }
}