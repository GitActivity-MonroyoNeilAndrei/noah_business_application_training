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
                case "actLogout":
                    UserLogout(based.SecurityAccess.RecUser, "acc1");
                    break;
     
                case "actChangeFilter":
                    RefreshProject(false);
                    break;
                //Check Entry and Report Access
                case "actCheckAccess":
                    CheckMenuItemAccess();
                    break;
                //Carousel image
                case "actLoadCarouselImage":
                    try
                    {
                        string type = WebApp.nwobjectText("carouseltype");
                        DataTable picture = new DataTable();
                        if (type == "big")
                             picture = dal.getImage(WebApp.nwobjectText("pcode"), WebApp.nwobjectText("ptype"), WebApp.nwobjectText("phtw"));
                        if (type == "small")
                            picture = dal.getUnitImage(WebApp.nwobjectText("pcode"), WebApp.nwobjectText("ptype"), WebApp.nwobjectText("unitcode"));

                        string pic = picture.Rows[0]["AttachFile"].ToString();
                        js.ADD("GeneratePictureCarousel('" + WebApp.nwobjectText("pcode") + "'," + pic + ",'" + type + "')");
                        //js.ADD("fnCarousel()");
                    }
                    catch(Exception e) { }
                    break;
                //Booking Summary
                case "actGenerateBookingSummary":
                    try
                    {
                        bool isMain = WebApp.nwobjectBool("isMain");
                        string proj = WebApp.nwobjectText("projectfilter");
                        RefreshDashCount(isMain,proj);
                        string bsjson = "", bsjsontotal = "";
                        DataTable dt = new DataTable();
                        DataTable dt2 = new DataTable();

                        //reserved
                        dt = dal.getBookingSummary("005", based.SecurityAccess.RecUser, proj, 0);
                        dt2 = dal.getBookingSummaryTotal("005", based.SecurityAccess.RecUser, proj, 0);
                        bsjson = nwSystem.GetDataTableToJSON(dt);
                        bsjsontotal = nwSystem.GetDataTableToJSON(dt2);
                        js.makeText("#cntReservedtcp", "TCP - " + dt2.Rows[0][1].ToString());
                        js.ADD("GenerateBookingSummaryTable('tblBookSumReserved'," + bsjson + "," + bsjsontotal + ",'005')");

                        //sold
                        dt = dal.getBookingSummary("006", based.SecurityAccess.RecUser, proj, 0);
                        dt2 = dal.getBookingSummaryTotal("006", based.SecurityAccess.RecUser, proj, 0);
                        bsjson = nwSystem.GetDataTableToJSON(dt);
                        bsjsontotal = nwSystem.GetDataTableToJSON(dt2);
                        js.makeText("#cntSoldtcp", "TCP - " + dt2.Rows[0][1].ToString());
                        js.ADD("GenerateBookingSummaryTable('tblBookSumSold'," + bsjson + "," + bsjsontotal + ",'006')");

                        //reopen
                        dt = dal.getBookingSummary("003", based.SecurityAccess.RecUser, proj, 1);
                        dt2 = dal.getBookingSummaryTotal("003", based.SecurityAccess.RecUser, proj, 1);
                        bsjson = nwSystem.GetDataTableToJSON(dt);
                        bsjsontotal = nwSystem.GetDataTableToJSON(dt2);
                        js.makeText("#cntReopenedtcp", "TCP - " + dt2.Rows[0][1].ToString());
                        js.ADD("GenerateBookingSummaryTable('tblBookSumReopened'," + bsjson + "," + bsjsontotal + ",'016')");

                        //on-hold
                        dt = dal.getBookingSummary("008", based.SecurityAccess.RecUser, proj, 0);
                        dt2 = dal.getBookingSummaryTotal("008", based.SecurityAccess.RecUser, proj, 0);
                        bsjson = nwSystem.GetDataTableToJSON(dt);
                        bsjsontotal = nwSystem.GetDataTableToJSON(dt2);
                        js.makeText("#cntHoldtcp", "TCP - " + dt2.Rows[0][1].ToString());
                        js.ADD("GenerateBookingSummaryTable('tblBookSumOnHold'," + bsjson + "," + bsjsontotal + ",'008')");
                    }
                    catch(Exception e) { }
                    break;
                case "actUntCnt":
                    string stat = "", val = "";
                    //Available
                    stat = "003";
                    val = dal.getCountStatusUA(stat, WebApp.nwobjectText("pcode"), WebApp.nwobjectText("ptype"), WebApp.nwobjectText("phtw"), WebApp.nwobjectText("selectedFloor"), WebApp.nwobjectInt("isCoordinate"), 0);
                    js.ADD("$('#cntgreen').text(" + val + ");");
                    //Reopened
                    stat = "003";
                    val = dal.getCountStatusUA(stat, WebApp.nwobjectText("pcode"), WebApp.nwobjectText("ptype"), WebApp.nwobjectText("phtw"), WebApp.nwobjectText("selectedFloor"), WebApp.nwobjectInt("isCoordinate"), 1);
                    js.ADD("$('#cntgreen2').text(" + val + ");");
                    //OnHold
                    stat = "008";
                    val = dal.getCountStatusUA(stat, WebApp.nwobjectText("pcode"), WebApp.nwobjectText("ptype"), WebApp.nwobjectText("phtw"), WebApp.nwobjectText("selectedFloor"), WebApp.nwobjectInt("isCoordinate"), 0);
                    js.ADD("$('#cntblue').text(" + val + ");");
                    //Reserved
                    stat = "005";
                    val = dal.getCountStatusUA(stat, WebApp.nwobjectText("pcode"), WebApp.nwobjectText("ptype"), WebApp.nwobjectText("phtw"), WebApp.nwobjectText("selectedFloor"), WebApp.nwobjectInt("isCoordinate"), 0);
                    js.ADD("$('#cntred').text(" + val + ");");
                    //Sold
                    stat = "006";
                    val = dal.getCountStatusUA(stat, WebApp.nwobjectText("pcode"), WebApp.nwobjectText("ptype"), WebApp.nwobjectText("phtw"), WebApp.nwobjectText("selectedFloor"), WebApp.nwobjectInt("isCoordinate"), 0);
                    js.ADD("$('#cntyellow').text(" + val + ");");
                    break;
                case "actRefreshUnitAvailability":
                    //Holding Period
                    string hp = "";
                    hp = dal.getHoldingPeriod(WebApp.nwobjectText("pcode"),"LOC");
                    js.makeText("#holdingprdl", "Holding period for Local buyers is up to " + hp + " day(s) only.");
                    hp = dal.getHoldingPeriod(WebApp.nwobjectText("pcode"), "INT");
                    js.makeText("#holdingprdi", "Holding period for International buyers is up to " + hp + " day(s) only.");

                    UnitBind();

                    DataTable dtHDR = SFObject.LoadDataTable(dal.lookupFloorHDR(WebApp.nwobjectText("pcode"), WebApp.nwobjectText("phtw"), WebApp.nwobjectText("selectedFloor"), WebApp.nwobjectText("ptype"))
                      , this.UserDefinedConnectionString);
                    DataTable dtLIN = SFObject.LoadDataTable(dal.lookupFloorLin(WebApp.nwobjectText("pcode"), WebApp.nwobjectText("phtw"), WebApp.nwobjectText("selectedFloor"), WebApp.nwobjectText("ptype"))
                    , this.UserDefinedConnectionString);

                    js.ADD("unitinto=[]");
                    string unitinto = "[";

                    for (int i = 0; i < dtHDR.Rows.Count; i++)
                    {
                        if (i >= 1) unitinto += ",";

                        unitinto += "{\"id\":\"" + dtHDR.Rows[i]["code"].ToString() + "\",\"object\":";

                        string objectdata = "[]";
                        DataTable dtLINTemp = new DataTable();
                        try
                        {
                            dtLINTemp = new DataView(dtLIN, "parentcode like '" + dtHDR.Rows[i]["code"].ToString() + "'", "", DataViewRowState.CurrentRows).ToTable();
                            dtLINTemp.Columns.Remove("parentcode");
                        }
                        catch { }


                        string json = Newtonsoft.Json.JsonConvert.SerializeObject(dtLINTemp);
                        if (dtLINTemp.Rows.Count >= 1)
                            objectdata = json;


                        unitinto += objectdata;

                        unitinto += ",\"img\":\"" + dtHDR.Rows[i]["img"].ToString().Replace("\\", "/") + "\",\"width\":" + dtHDR.Rows[i]["width"].ToString() + "}";
                    }

                    unitinto += "]";
                    js.ADD("unitinto=" + unitinto);
                    //js.Enable("#lugProjLoc,#lugProject,#lugPhase", false);
                    //js.Enable("#btnUploadImage,#btnAddUnit", true);

                    js.ADD("Load_Done('lugPhase', null); ");
                    break;
                case "actLoadFloor":
                    DataTable dtX = SFObject.LoadDataTable(dal.lookupFloor(WebApp.nwobjectText("pcode"), WebApp.nwobjectText("phtw"), WebApp.nwobjectText("ptype"))
                       , this.UserDefinedConnectionString);
                    string strHTML = "";
                    string cls="";
                    for (int i = 0; i < dtX.Rows.Count; i++)
                    {
                        //check if has coordinate setup
                        string hassetup = dal.HasFloorSetup(WebApp.nwobjectText("pcode"), WebApp.nwobjectText("ptype"), dtX.Rows[i]["Floor"].ToString(), WebApp.nwobjectText("phtw"));
                        //check if coordinate setup still has available
                        string stillavl = dal.HasAvailableCoordinate(WebApp.nwobjectText("pcode"), WebApp.nwobjectText("ptype"), dtX.Rows[i]["Floor"].ToString(), WebApp.nwobjectText("phtw"));
                        //no coordinate but has available units
                        string hasavl = dal.HasAvailableUnit(WebApp.nwobjectText("pcode"), WebApp.nwobjectText("ptype"), dtX.Rows[i]["Floor"].ToString(), WebApp.nwobjectText("phtw"));
                        string isCoordinate = "";
                        if (hassetup != "0") //has coordinates
                        {
                            isCoordinate = "isCoordinate";
                            if (stillavl != "0")
                                cls = "ribbon-stat";
                            else
                                cls = "";
                        }
                        else if (hasavl != "0") //no unit
                        {
                            cls = "ribbon-stat";
                            isCoordinate = "";
                        }
                        else
                        {
                            cls = "";
                            isCoordinate = "";
                        }

                        int ic = 0;
                        if (isCoordinate != "")
                            ic = 1;
                        else
                            ic = 0;
                        strHTML += "<li><div class='btnlinFloor li-Shortcut btnlink' isCoordinate="+ic+" code='" + dtX.Rows[i]["Floor"].ToString() + "'><p>" + dtX.Rows[i]["FloorDesc"].ToString() + "</p><div class='" + cls + " stat " + isCoordinate + "'></div></div></li>";
                        
                    }
                    js.makeHTML("#listFloor", strHTML);

                    // js.
                    js.ADD("$('.btnlinFloor:eq(0)').click(); ");
                    //js.ADD("$('iframe').css('height', '100%');");
                   // js.ADD("$('.btnlinFloor').css('width','auto');");
                    //js.ADD("nwLoading_End('actLoadFloor')");
                    break;
                case "actLoadFloorDetail":

                    DataTable dtHDR1 = SFObject.LoadDataTable(dal.lookupFloorHDR(WebApp.nwobjectText("pcode"), WebApp.nwobjectText("phtw"), WebApp.nwobjectText("selectedFloor"), WebApp.nwobjectText("ptype"))
                   , this.UserDefinedConnectionString);
                    DataTable dtLIN1 = SFObject.LoadDataTable(dal.lookupFloorLin(WebApp.nwobjectText("pcode"), WebApp.nwobjectText("phtw"), WebApp.nwobjectText("selectedFloor"), WebApp.nwobjectText("ptype"))
                    , this.UserDefinedConnectionString);

                    js.ADD("unitinto=[]");
                    unitinto = "[";

                    for (int i = 0; i < dtHDR1.Rows.Count; i++)
                    {
                        if (i >= 1) unitinto += ",";

                        unitinto += "{\"id\":\"" + dtHDR1.Rows[i]["code"].ToString() + "\",\"object\":";

                        string objectdata = "[]";
                        DataTable dtLINTemp = new DataTable();
                        try
                        {
                            dtLINTemp = new DataView(dtLIN1, "parentcode like '" + dtHDR1.Rows[i]["code"].ToString() + "'", "", DataViewRowState.CurrentRows).ToTable();
                            dtLINTemp.Columns.Remove("parentcode");
                        }
                        catch { }


                        string json = Newtonsoft.Json.JsonConvert.SerializeObject(dtLINTemp);
                        if (dtLINTemp.Rows.Count >= 1)
                            objectdata = json;


                        unitinto += objectdata;

                        unitinto += ",\"img\":\"" + dtHDR1.Rows[i]["img"].ToString().Replace("\\", "/") + "\",\"width\":" + dtHDR1.Rows[i]["width"].ToString() + "}";
                    }

                    unitinto += "]";
                    js.ADD("unitinto=" + unitinto);
                    // js.ADD("SetMap('"+ dtHDR1.Rows[0]["project"].ToString() + "'-'" + dtHDR1.Rows[0]["phase"].ToString() + "'-'"+ dtHDR1.Rows[0]["floorblock"].ToString() + "')");



                    DataTable dtX2 = SFObject.LoadDataTable(dal.lookupUnit(WebApp.nwobjectText("pcode"), WebApp.nwobjectText("phtw"), WebApp.nwobjectText("ptype"))
                     , this.UserDefinedConnectionString);
                    //nwGridUnitList
                    js.JSONfromDataTable("jsonfloor", dtX2);
                    js.ADD("loadUnit()");


                    //js.ADD("nwLoading_End('actLoadFloorDetail')");
                    js.ADD("isclick = false;");
                    break;
                //Unit Details
                case "actLoadUnitDetails":
                    DataTable dtDetails = dal.UnitDetails(WebApp.nwobjectText("unitcode"));
                    string unitdtls = nwSystem.GetDataTableToJSON(dtDetails);
                    string isMultiple = dal.GetPortalConfig("SHOWMULTPRICE");

                    //defaults
                    js.makeText("#unitno", dtDetails.Rows[0]["UnitCode"].ToString());

                    //if has more than 1 set of selling price
                    int cnt = dtDetails.Rows.Count;
                    if (cnt > 1 && isMultiple == "1")
                    {
                        js.ADD("$('#secMultipleSP').show()");
                        js.ADD("$('.SpCnt').html('<input id=curCnt value=1 maxlength=2 maxcnt=" + cnt + " /> of " + cnt + "')");
                        js.ADD("unitdtls = " + unitdtls + "");
                        js.ADD("LoadUnitDetailsMult('1')");
                        js.ADD("$('.SpFirst').enable(false)");
                        js.ADD("$('.SpPrev').enable(false)");
                    }
                    else
                    {
                        js.ADD("$('#secMultipleSP').hide()");
                        js.makeText("#type", dtDetails.Rows[0]["UnitTypeDesc"].ToString());
                        js.makeText("#totarea", dtDetails.Rows[0]["TotalArea"].ToString());
                        js.makeText("#lotarea", dtDetails.Rows[0]["LotArea"].ToString());
                        js.makeText("#unitarea", dtDetails.Rows[0]["UnitArea"].ToString());
                        js.makeText("#clss", dtDetails.Rows[0]["UnitClassDesc"].ToString());
                        js.makeText("#rsrvamt", dtDetails.Rows[0]["MinReservationAmt"].ToString());
                        js.makeText("#amtp", dtDetails.Rows[0]["PHP"].ToString());
                        js.makeText("#amtu", dtDetails.Rows[0]["USD"].ToString());
                        js.makeText("#amte", dtDetails.Rows[0]["EUR"].ToString());

                        js.makeText("#ucode", dtDetails.Rows[0]["Code"].ToString());
                        js.makeText("#typecode", dtDetails.Rows[0]["UnitType"].ToString());
                        js.makeText("#clsscode", dtDetails.Rows[0]["UnitClass"].ToString());
                        js.makeText("#amtphp", dtDetails.Rows[0]["TCP"].ToString());
                        string status = dtDetails.Rows[0]["unitstatus"].ToString();

                        js.ADD("CheckMeasurements();");
                    }
                    
                    //if(status != "003")
                    //{
                    //    js.ADD("$('#btnHold').enable(false);");
                    //    js.ADD("$('#btnReserveNow').enable(false);");
                    //}
                    //else
                    //{
                    //    js.ADD("$('#btnHold').enable(true);");
                    //    js.ADD("$('#btnReserveNow').enable(true);");
                    //}
                    break;
                //Check queue
                case "actCheckQueue":
                    string unitcode = WebApp.nwobjectText("unitcode");
                    string unitstatus = WebApp.nwobjectText("status");
                    string trantype = "";
                    //max queue
                    trantype = WebApp.nwobjectText("trantype");
                    int maxqueue = Parser.ParseInt(dal.getMaxQueue(trantype));

                    //if has reservation
                    int isReserved = Parser.ParseInt(dal.isReserved(unitcode));

                    if(unitstatus == "007")
                    {
                        js.ADD("$('#btnHold').enable(false);");
                        js.ADD("$('#btnReserveNow').enable(false);");
                    }
                    else
                    {
                        if (isReserved == 1 && (unitstatus == "005" || unitstatus == "reserved"))
                        {
                            js.ADD("$('#btnHold').enable(false);");
                            js.ADD("$('#btnReserveNow').enable(false);");
                        }
                        else
                        {
                            int hasSavedHold = Parser.ParseInt(dal.hasHold(unitcode)); // his has saved or processed holding
                            if (hasSavedHold == maxqueue)
                            {
                                js.ADD("$('#btnHold').enable(false);");
                                js.ADD("$('#btnReserveNow').enable(false);");
                            }
                            else
                            {
                                if ((unitstatus == "005" || unitstatus == "reserved"
                                || unitstatus == "006" || unitstatus == "sold"
                                || unitstatus == "008" || unitstatus == "hold") && hasSavedHold <= maxqueue)
                                {
                                    js.ADD("$('#btnHold').enable(false);");
                                    js.ADD("$('#btnReserveNow').enable(false);");
                                }
                                else
                                {
                                    js.ADD("$('#btnHold').enable(true);");
                                    js.ADD("$('#btnReserveNow').enable(true);");
                                }

                            }
                        }
                    }
                    
                    break;
                case "actGenerateUnits":
                    DataTable dtUnitDtls = dal.getNonSetupUnits(WebApp.nwobjectText("pcode"), WebApp.nwobjectText("ptype"), WebApp.nwobjectText("phtw"), WebApp.nwobjectText("selectedFloor"));
                    string unitjson = nwSystem.GetDataTableToJSON(dtUnitDtls);
                    trantype = WebApp.nwobjectText("trantype");
                    maxqueue = Parser.ParseInt(dal.getMaxQueue(trantype));
                    js.ADD("GenerateNonSetupUnits(" + unitjson + "," + maxqueue + ",'" + based.SecurityAccess.RecUser + "')");
                    break;
                case "actGenerateAvlSum":
                    DataTable dtSummary = dal.UnitAvailSummary(WebApp.nwobjectText("pcode"), WebApp.nwobjectText("ptype"), WebApp.nwobjectText("phtw"));
                    string sumjson = nwSystem.GetDataTableToJSON(dtSummary);
                    js.ADD("GenerateAvlSumTable('tblAvlSum'," + sumjson + ",'true')");
                    if(dtSummary.Rows.Count >= 10)
                    {
                        js.ADD("paginate('tblAvlSum')");
                    }
                    break;
                case "actExportToExcel":
                    ExportAvailability(WebApp.nwobjectText("pcode"), WebApp.nwobjectText("ptype"), WebApp.nwobjectText("phtw"));
                    break;
                case "actGetUnitPrice":
                    string ucode = WebApp.nwobjectText("unitcode");
                    string id = WebApp.nwobjectText("id");
                    string price = dal.GetUnitPrice(ucode);
                    string mode = WebApp.nwobjectText("mode");
                    js.ADD("CheckIfHasPriceBulk('" + ucode + "','" + id + "','" + price + "','"+mode+"')");
                    break;
                case "actGenerateCommissions":
                    int commode = WebApp.nwobjectInt("CommMode");
                    string commdate = WebApp.nwobjectText("datesingle");
                    string commfrom = WebApp.nwobjectText("from");
                    string commto = WebApp.nwobjectText("to");
                    string comproj = WebApp.nwobjectText("project");
                    string comcust = WebApp.nwobjectText("customer");
                    DataTable dtCommTotals = dal.getCommissionTotals(based.SecurityAccess.RecUser,commode,commdate,commfrom,commto,comproj,comcust);
                    DataTable dtCommDtls = dal.getCommissionDetails(based.SecurityAccess.RecUser, commode, commdate, commfrom, commto, comproj, comcust);
                    string ctotals = nwSystem.GetDataTableToJSON(dtCommTotals);
                    string cdtls = nwSystem.GetDataTableToJSON(dtCommDtls);
                    js.ADD("GenerateCommissionsTotals(" + ctotals + ")");
                    js.ADD("GenerateCommissionsTable('tblComSum'," + cdtls + "," + ctotals + ")");
                    if (dtCommDtls.Rows.Count >= 10)
                    {
                        js.ADD("paginate('tblComSum')");
                    }
                    break;
                case "actGenerateCommissionCombos":
                    DataTable cproj = dal.getCommissionProject(based.SecurityAccess.RecUser);
                    DataTable ccust = dal.getCommissionCustomer(based.SecurityAccess.RecUser);
                    string cproject = nwSystem.GetDataTableToJSON(cproj);
                    string ccustomer = nwSystem.GetDataTableToJSON(ccust);
                    js.ADD("GenerateCommissionCombos('cmbProjectCOMM'," + cproject + ")");
                    js.ADD("GenerateCommissionCombos('cmbCustomerCOMM'," + ccustomer + ")");
                    break;
                default:
                    Prompt.Information("act_Method not found: " + strMethod, "Error");
                    break;
            }
            return js.makeJSPostScript(execute());
        }

        private void Main_Load()
        {
            Success();
        }

        private void Success()
        {
            if (based.isInterface == true) dal.UpdateVersion();
            string server = nwSystem.GetServerLink(this.UserDefinedConnectionString);


            js.ADD($"$ServerLink='{server}'");
            js.ADD("recuser = '" + based.SecurityAccess.RecUser.ToUpper() + "'");
            js.ADD("maxbulkqueue='"+dal.getMaxQueue("BCHHLD") +"'");

            SetDefaults();
            RefreshProject(true);
            CheckMenuItemAccess();
            CheckPortalConfig();

            js.ADD("$('#cbRetail').click()");


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
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(), this.UserDefinedConnectionString);



                    break;
            }

            return strFinal;
        }
        #endregion
        private void UnitBind()
        {
            string proj = WebApp.nwobjectText("pcode");
            string phase = WebApp.nwobjectText("phtw");
            js.ADD($"imgObj={JsonConvert.SerializeObject(dal.GetHDRImgSrc(proj, phase))}");//added by eme 01/28/2019
            js.ADD($"unitImgObj={JsonConvert.SerializeObject(dal.GetUnitImgSrc(proj, phase))}");//added by eme 01/28/2019
            js.ADD("nwLoading_End('xSample');");
            js.ADD("nwLoading_End('actBindCollection');");
        }

        public void SetDefaults()
        {
   
            //General
            try
            {

                RefreshDashCount(true,"all");

                //Color Scheme
                string color = "";

                //available
                color = dal.getStatusColor("003");
                js.ADD("cavail='" + color + "'");
                js.makeCSS("#boxlegavail", "background-color", color);

                //reopened
                js.ADD("creopened='" + color + "'");
                js.makeCSS("#boxlegreopened", "background-color", color);
                js.makeCSS("#cntReopenedtcp", "color", color);

                //hold
                color = dal.getStatusColor("008");
                js.ADD("conhold='" + color + "'");
                js.makeCSS("#boxlegonhold", "background-color", color);
                js.makeCSS("#cntHoldtcp", "color", color);

                //reserved
                color = dal.getStatusColor("005");
                js.ADD("creserved='" + color + "'");
                js.makeCSS("#boxlegreserved", "background-color", color);
                js.makeCSS("#cntReservedtcp", "color", color);

                //sold
                color = dal.getStatusColor("006");
                js.ADD("csold='" + color + "'");
                js.makeCSS("#boxlegsold", "background-color", color);
                js.makeCSS("#cntSoldtcp", "color", color);

                //reserved progress
                color = dal.getStatusColor("004");
                js.ADD("creservedprogress='" + color + "'");

                //on-hold back office 007
                color = dal.getStatusColor("007");
                js.ADD("conholdbo='" + color + "'");

            }
            catch(Exception e){ }


        }
        //dashboard count
        private void RefreshDashCount(bool isMain,string proj)
        {
            if (proj == "")
                proj = "all";
            //Numbers of Reserved/Booked/On-Hold
            string dtcnt = "";
            //Reserved
            dtcnt = dal.getCountStatus("005", based.SecurityAccess.RecUser, proj, 0);
            js.ADD("$('#cntReservedbs').text('" + dtcnt + "')");
            js.ADD("$('#cntReservedtbl').text('Reserved - " + dtcnt + "')");
            if (isMain)
                js.ADD("$('#cntReserved').text('" + dtcnt + "')");


            //Sold
            dtcnt = dal.getCountStatus("006", based.SecurityAccess.RecUser, proj, 0);
            js.ADD("$('#cntSoldbs').text('" + dtcnt + "')");
            js.ADD("$('#cntSoldtbl').text('Sold/Booked - " + dtcnt + "')");
            if (isMain)
                js.ADD("$('#cntSold').text('" + dtcnt + "')");

            //Reopen
            dtcnt = dal.getCountStatus("003", based.SecurityAccess.RecUser, proj, 1);
            js.ADD("$('#cntReopenedbs').text('" + dtcnt + "')");
            js.ADD("$('#cntReopenedtbl').text('Re-Opened - " + dtcnt + "')");
            if (isMain)
                js.ADD("$('#cntreopened').text('" + dtcnt + "')");

            //Hold
            dtcnt = dal.getCountStatus("008", based.SecurityAccess.RecUser, proj, 0);
            js.ADD("$('#cntHoldbs').text('" + dtcnt + "')");
            js.ADD("$('#cntHoldtbl').text('On-Hold - " + dtcnt + "')");
            if (isMain)
                js.ADD("$('#cntHold').text('" + dtcnt + "')");
        }

        //project
        public void RefreshProject(bool isGenerate)
        {
            try
            {
                string prop = WebApp.nwobjectText("cmbPropertyType");
                string loc = WebApp.nwobjectText("cmbLocation");
                if (prop == "")
                    prop = "all";
                if (loc == "")
                    loc = "all";

                //js.ADD("document.getElementById('cmbPropertyType').innerHTML = '';");
                //js.ADD("document.getElementById('cmbLocation').innerHTML = '';");
                //Property
                DataTable property = dal.getProperty(prop, loc);
                if(isGenerate)
                {
                    for (int i = 1; i <= property.Rows.Count; i++)
                    {
                        string propcode = property.Rows[i - 1][0].ToString();
                        string propdesc = property.Rows[i - 1][1].ToString();
                        js.ADD("AddProperty('" + propcode + "','" + propdesc + "');");
                    }
                }
                
                //Location
                DataTable location = dal.getLocation(prop, loc);
                if(isGenerate)
                {
                    for (int i = 1; i <= location.Rows.Count; i++)
                    {
                        string loccode = location.Rows[i - 1][0].ToString();
                        string locdesc = location.Rows[i - 1][1].ToString();
                        js.ADD("AddLocation('" + loccode + "','" + locdesc + "');");
                    }
                }
                

                //Projects
                string jsonprop = nwSystem.GetDataTableToJSON(property);
                js.ADD("GenerateProperty(" + jsonprop + ")");

                //if no project
                if (property.Rows.Count <= 0)
                {
                    js.ADD("NoDetailsFound()");
                }
                else
                {
                    for (int i = 1; i <= property.Rows.Count; i++)
                    {
                        DataTable project = dal.getProjectDtls(property.Rows[i - 1]["ProjectType"].ToString(), loc);
                        string jsonproj = nwSystem.GetDataTableToJSON(project);
                        js.ADD("GenerateProject(" + jsonproj + ",'"+ isGenerate + "')");

                        //pictures
                        for (int j = 1; j <= project.Rows.Count; j++)
                        {
                            string pic = "";
                            DataTable picture = dal.getImage(project.Rows[j - 1]["Project"].ToString(), property.Rows[i - 1]["ProjectType"].ToString(), project.Rows[j - 1]["PhaseTower"].ToString());
                            try
                            {
                                pic = picture.Rows[0]["AttachFile"].ToString();
                                js.ADD("GeneratePicture('" + project.Rows[j - 1]["Project"].ToString() + property.Rows[i - 1]["ProjectType"].ToString() + project.Rows[j - 1]["PhaseTower"].ToString() + "'," + pic + ")");
                            }
                            catch (Exception e)
                            {
                                pic = "[{'ID':'','Desc':'','Path':''}]";
                                js.ADD("GeneratePicture('" + project.Rows[j - 1]["Project"].ToString() + property.Rows[i - 1]["ProjectType"].ToString() + project.Rows[j - 1]["PhaseTower"].ToString() + "'," + pic + ")");
                            }
                        }
                    }
                }
            }
            catch(Exception e)
            { }
        }
        string picChange(object img)
        {
            string strFinal = "";
            try
            {
                if (img != null)
                {
                    var b64String = Convert.ToBase64String((byte[])img);
                    var dataUrl = "data:image/png;base64," + b64String;
                    strFinal = dataUrl;
                }

            }
            catch (Exception e)
            {
                //strFinal = e.ToString();
            }
            return strFinal;
        }
        
        //Check menu Access
        public void CheckMenuItemAccess()
        {
            DataTable dtItems = dal.GetPortalMenuItems();

            for(int i=0; i<= dtItems.Rows.Count -1; i++)
            {
                string micode = dtItems.Rows[i][0].ToString();
                string access = dal.GetPortalUserAccess(based.SecurityAccess.RecUser, micode);
                switch (micode)
                {
                    case "REMYCUST": //my Customers
                        if (access == "False" || access == "")
                            js.ADD("$('#btnCustomerInfo').hide()");
                        else
                            js.ADD("$('#btnCustomerInfo').show()");
                        break;
                    case "REMYPROSPECT": //My Prospects
                        if (access == "False" || access == "")
                            js.ADD("$('#btnProspectCust').hide()");
                        else
                            js.ADD("$('#btnProspectCust').show()");
                        break;
                    case "SALESCALL": //Holding of Unit
                        if (access == "False" || access == "")
                            js.ADD("$('#btnSalesCall').hide()");
                        else
                            js.ADD("$('#btnSalesCall').show()");
                        break;
                    case "REHOLDING": //Holding of Unit
                        if(access == "False" || access == "")
                        {
                            js.ADD("$('#btnHoldingUnit').hide()");
                            js.ADD("$('#btnHoldingUnit').attr('hasAccess','')");
                        }
                        else
                        {
                            js.ADD("$('#btnHoldingUnit').show()");
                            js.ADD("$('#btnHoldingUnit').attr('hasAccess','yes')");
                        }
                        break;
                    case "RERESERVATION": //Reservation Entry
                        if (access == "False" || access == "")
                        {
                            js.ADD("$('#btnReseration').hide()");
                            js.ADD("$('#btnReseration').attr('hasAccess','')");
                        }
                        else
                        {
                            js.ADD("$('#btnReseration').show()");
                            js.ADD("$('#btnReseration').attr('hasAccess','yes')");
                        }
                        break;
                    case "REEXTENSION": // Holding - Request for Extension
                        if (access == "False" || access == "")
                            js.ADD("$('#btnHoldingExt').hide()");
                        else
                            js.ADD("$('#btnHoldingExt').show()");
                        break;
                    case "REINVAVAILABILITY": //Inventory Availability Summary
                        if (access == "False" || access == "")
                            js.ADD("$('#btnInvAvailability').hide()");
                        else
                            js.ADD("$('#btnInvAvailability').show()");
                        break;
                    case "REBOOKING": //My Booking Summary
                        if (access == "False" || access == "")
                            js.ADD("$('#btnBookingSummary').hide()");
                        else
                            js.ADD("$('#btnBookingSummary').show()");
                        break;
                    case "REMYTRANSACTIONS": //My Transactions Summary
                        if (access == "False" || access == "")
                            js.ADD("$('#btnTransactionSummary').hide()");
                        else
                            js.ADD("$('#btnTransactionSummary').show()");
                        break;
                    case "RECOMMISSION": //My Commissions Summary
                        if (access == "False" || access == "")
                            js.ADD("$('#btnCommissions').hide()");
                        else
                            js.ADD("$('#btnCommissions').show()");
                        break;
                    case "SBCLIENTREGDEACT": //Client Registration Deactivation
                        if (access == "False" || access == "")
                            js.ADD("$('#btnClientReg').hide()");
                        else
                            js.ADD("$('#btnClientReg').show()");
                        break;
                    case "SBCLIENTREGDEACTSUMM": //Client Registration Deactivation Summary
                        if (access == "False" || access == "")
                            js.ADD("$('#btnClientRegSummary').hide()");
                        else
                            js.ADD("$('#btnClientRegSummary').show()");
                        break;
                }
            }
            
        }

        //Check Portal Configuration
        public void CheckPortalConfig()
        {
            DataTable dtConfig = dal.GetPortalConfig();

            for (int i = 0; i < dtConfig.Rows.Count; i++)
            {
                string val = dtConfig.Rows[i]["Value"].ToString();
                string code = dtConfig.Rows[i]["Code"].ToString();

                switch(code)
                {
                    case "SHOWHIDEAVL":
                        if (val == "1")
                            js.ADD("$('#btnGenAvailability').show()");
                        if (val == "0")
                            js.ADD("$('#btnGenAvailability').hide()");
                        break;
                }
            }
        }
        public void ExportAvailability(string pcode,string ptype,string phtw)
        {
            //here
            string LISTINGFILENAME = "";
            if (dal.LISTINGFILENAME + " Listing" == "") LISTINGFILENAME = "Sheet 1";
            else LISTINGFILENAME = dal.LISTINGFILENAME + " Listing";



            string source = string.Empty;
            string refDocNo = string.Empty;
            string nwCustno = string.Empty; //this parameter will be use in the entry for buyers info
            string nwCom = string.Empty; //this parameter will be use in the updating for backend
            string code = WebApp.nwobjectText("code");
            int tagging = 0;

            ListingAndPrint frmlist = new ListingAndPrint
                                                   (ListingAndPrint.FormType.Listing, dal.LISTINGSTARTROW, dal.LISTINGQUERY(pcode,ptype,phtw),
                                                   LISTINGFILENAME, UserDefinedConnectionString, SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString),
                                                   based.SecurityAccess.RecUserName, LISTINGFILENAME);

            //## FOR EXPORTING ###
            Random rnd = new Random();
            string SessionID = DateTime.Now.ToString("yyyyddMMhhmmss") + rnd.Next(0, 9999).ToString().PadRight(4, '0');
            HttpContext.Current.Session["Config_" + SessionID] = frmlist.m_Spread.ExportConfig();
            HttpContext.Current.Session["Data_" + SessionID] = frmlist.m_Spread.GetDataSource();
            HttpContext.Current.Session["Filename_" + SessionID] = LISTINGFILENAME;
            HttpContext.Current.Session["Header_" + SessionID] = "0";
            js.ADD("ExportSessionID='" + SessionID + "'");
            //## END ##

            //js.Show("#nwExportContainerMain", 0);
            js.ADD(frmlist.CreateScript());
            //js.ADD("$('#btnnwExport').click()");
            js.ADD("ExportToExcel(crExportLnk,'')");
        }

        //User Logout
        public void UserLogout(string Code, string UserType)
        {
            HttpContext.Current.Session["noahwebUserID"] = "";
            strConn = WebConfigurationManager.AppSettings["NoahWebConnectArk"];
            SFObjects.ExcuteQuery(string.Format(@"EXEC [FPTI_NW].[nsp_noahweb_UserLogStatus] @RecUser = '{0}', @userAccType = '{1}', @QueryType = 2", Code, UserType), strConn);

            SFObjects.ExcuteQuery(string.Format(@"UPDATE FPTI_NW.noahweb_UserLogStatus SET 
                            sessionID={0}
	                        WHERE userID='{1}'", "NULL", Code), strConn);

            SFObjects.ExcuteQuery(string.Format(@"DECLARE @recuser VARCHAR(100)='{0}'
                    UPDATE  FPTI.ConnectivityH 
                    SET LogOutDate = dbo.GetNoahDate()
                    WHERE LogOutDate IS NULL  AND SysUser = @recuser AND LogDate = 
                    (SELECT MAX(LogDate) FROM  FPTI.ConnectivityH WHERE LogOutDate IS NULL  AND SysUser = @recuser)", Code.Replace("'", "''"))
                       , strConn);


            js.ADD("window.location.href = '../../../Login/default.aspx';");

        }

    }
}