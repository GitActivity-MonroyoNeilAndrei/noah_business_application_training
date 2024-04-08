using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;
using System.Web.Configuration;

namespace DALComponent
{
    public class LayoutDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        #region STANDARD

        public string MenuItemCode = "Main"; // This is default parameter  for version
        public string MenuItemVersion = "9.0.1.12E"; // This is default parameter for version
        public string UpdateVersion(string _MenuItemCode, string _MenuItemVersion)
        {
            if (_MenuItemCode.Trim() != "") MenuItemCode = _MenuItemCode;
            if (_MenuItemVersion.Trim() != "") MenuItemVersion = _MenuItemVersion;
            return UpdateVersion();
        }
        public string UpdateVersion()
        {
            #region donot delete Version Updating
            string StrMessage = SFObjects.returnText(
                string.Format(@"
                              declare @MenuCode as nvarchar(max);
                              declare @Version as nvarchar(max);

                              set @MenuCode= '{0}';
                              set @Version = '{1}';

                              Update [FPTI_NW].[noahweb_menuItems_Info]
                              set version=@Version
                              where [Code]=@MenuCode;
                                ", MenuItemCode, MenuItemVersion)
                , _ConnectionString2);
            return StrMessage;
            #endregion
        }

        #endregion
        private string _ConnectionString;
        private string _ConnectionString2;
        private string _ConnectionStringARK = WebConfigurationManager.AppSettings["NoahWebConnectArk"];
        public string focusRecordPK;
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "ID";                                    //--column for searching
                                

        //#FOR EXPORT
        public string LISTINGFILENAME = "Unit Availability Summary"
            , GETCOMPANY = "Select CompanyName from dbo.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END


        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator

        public LayoutDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }

        public string ConnectionString { get { return _ConnectionString; } }
        public string Serverlink()
        {
            return SFObjects.returnText(@"SELECT [Value] FROM [dbo].[SystemConfig] where [code]='Server_Link'", _ConnectionString);
        }
        public string InquireQry()
        {
            return string.Format(@"EXEC [pir].[nsp_QuizMaster] @QueryType = 3");
        }
        public string LISTINGQUERY(string pcode, string ptype, string phtw)
        {

            string sql = $"EXEC [PRT].[nsp_Main] @QueryType=23,@Project='{pcode}',@ProjectType='{ ptype }',@PhaseTower='{ phtw}'";
            return sql;
            //return string.Format($@"SELECT * FROM [RE].[fn_CustomerBasicInformation_Listing]('{recuser}') ORDER BY [Customer Code]");

        }
        public string GetData()
        {
            string a = string.Format(@"SELECT [Code]
                      ,[Description]
                      ,[Title]
                      ,[CheckTitle]
                      ,[ButtonSubmitTitle]
                      ,[ButtonCancelTitle]
                      ,convert(varchar,[EffectivityDate],101)[EffectivityDate]
                      ,Format([EffectivityDate],'hh:mm tt') [EffectivityTime]
                      ,[Contents][Text]
                      ,[Recuser]
                      ,[Recdate]
                      ,[Moduser]
                      ,[Moddate]
                  FROM [FPTI_NW].[TermsAndConditions]");

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            return a;
        }
        public DataTable GetPortalMenuItems(string portal)
        {
            return SFObjects.LoadDataTable(@"EXEC [PRT].[nsp_Main] @QueryType=21,@PortalType='" + portal + "'", _ConnectionString);
        }
        public string GetPortalUserAccess(string user,string code)
        {
            return SFObjects.returnText(@"EXEC [PRT].[nsp_Main] @QueryType=20,@Recuser='" + user + "',@Code='" + code + "'", _ConnectionString);
        }
        public DataTable GetPortalConfig()
        {
            return SFObjects.LoadDataTable($@"SELECT * FROM [PRT].[PortalMenuConfiguration]", _ConnectionString);
        }
        public string GetPortalConfig(string code)
        {
            return SFObjects.returnText($@"SELECT Value FROM [PRT].[PortalMenuConfiguration] where Code='"+code+"'", _ConnectionString);
        }
        public DataTable getLogo()
        {
            return SFObjects.LoadDataTable(@"SELECT CompanyLogo [CompanyLogo] FROM SG.BIRCASConfig", _ConnectionString);
        }
        public string getBanner()
        {
            return SFObjects.returnText($"select value from PRT.ContentMngr_General where Code='GEN002'", _ConnectionString);
        }
        public string getUserImage(string user)
        {
            return SFObjects.returnText($"SELECT SellerImage FROM RE.SellerInformation where SellerCode='" + user + "'", _ConnectionString);
        }
        public DataTable getProperty(string projtype,string loc)
        {
            return SFObjects.LoadDataTable($@"EXEC [PRT].[nsp_Main] @QueryType=1,@ProjectType='" + projtype + "',@Location='" + loc + "'", _ConnectionString);
        }
        public DataTable getLocation(string projtype,string loc)
        {
            return SFObjects.LoadDataTable($@"EXEC [PRT].[nsp_Main] @QueryType=2,@ProjectType='" + projtype + "',@Location='" + loc + "'", _ConnectionString);
        }
        public DataTable getProjectDtls(string type, string loc)
        {
            return SFObjects.LoadDataTable($@"EXEC [PRT].[nsp_Main] @QueryType=3,@ProjectType='" + type + "',@Location='" + loc + "'", _ConnectionString);
        }
        public DataTable getImage(string project,string type,string phtw)
        {
            return SFObjects.LoadDataTable($@"EXEC [PRT].[nsp_Main] @QueryType=4,@Project='" + project + "',@ProjectType='" + type + "',@PhaseTower='" + phtw + "'", _ConnectionString);
        }
        public DataTable getUnitImage(string project, string type, string unit)
        {
            return SFObjects.LoadDataTable($@"EXEC [PRT].[nsp_Main] @QueryType=13,@Project='" + project + "',@ProjectType='" + type + "',@UnitCode='" + unit + "'", _ConnectionString);
        }
        public DataTable getBookingSummary(string status,string user, string proj,int reopen)
        {
            return SFObjects.LoadDataTable($@"EXEC [PRT].[nsp_Main] @QueryType=9,@Status='" + status + "',@Recuser='" + user + "',@UnitCode='',@Project='" + proj + "',@isReopen=" + reopen + "", _ConnectionString);
        }
        public DataTable getBookingSummaryTotal(string status,string user, string proj,int reopen)
        {
            return SFObjects.LoadDataTable($@"EXEC [PRT].[nsp_Main] @QueryType=10,@Status='" + status + "',@Recuser='" + user + "',@Project='" + proj + "',@isReopen=" + reopen + "", _ConnectionString);
        }
        public string getCountStatus(string status,string user,string project,int reopen)
        {
            return SFObjects.returnText($@"EXEC [PRT].[nsp_Main] @QueryType=5,@Status='" + status + "',@Recuser='" + user + "',@Project='" + project + "',@isReopen=" + reopen + "", _ConnectionString);
        }
        public string getStatusColor(string status)
        {
            return SFObjects.returnText($@"EXEC [PRT].[nsp_Main] @QueryType=8,@Status='" + status + "'", _ConnectionString);
        }
        public string getCountStatusUA(string status,string pcode,string ptype,string phtw,string floor,int iscoordinate,int isReopen)
        {
            return SFObjects.returnText($@"EXEC [PRT].[nsp_Main] @QueryType=6,@Status='" + status + "',@Project='" + pcode + "',@ProjectType='" + ptype + "',@PhaseTower='" + phtw + "',@floorblock='" + floor + "',@isCoordinate=" + iscoordinate + ",@isReopen=" + isReopen + "", _ConnectionString);
        }
        public DataTable UnitDetails(string unit)
        {
            return SFObjects.LoadDataTable($@"EXEC [PRT].[nsp_Main] @QueryType=7,@UnitCode='" + unit + "'", _ConnectionString);
        }
        public DataTable UnitAvailSummary(string pcode, string ptype, string phtw)
        {
            return SFObjects.LoadDataTable($@"EXEC [PRT].[nsp_Main] @QueryType=23,@Project='" + pcode + "',@ProjectType='" + ptype + "',@PhaseTower='" + phtw + "'", _ConnectionString);
        }
        public DataTable getCommissionTotals(string recuser,int commode, string commdate, string commfrom, string commto, string comproj, string comcust)
        {
            return SFObjects.LoadDataTable($@"EXEC [PRT].[nsp_Main] @QueryType=29,@Recuser='" + recuser + "',@CommMode=" + commode + ",@Project='" + comproj + "',@Customer='" + comcust + "',@From='" + commfrom + "',@To='" + commto + "',@DateSingle='" + commdate + "'", _ConnectionString);
        }
        public DataTable getCommissionDetails(string recuser, int commode, string commdate, string commfrom, string commto, string comproj, string comcust)
        {
            return SFObjects.LoadDataTable($@"EXEC [PRT].[nsp_Main] @QueryType=28,@Recuser='" + recuser + "',@CommMode=" + commode + ",@Project='" + comproj + "',@Customer='" + comcust + "',@From='" + commfrom + "',@To='" + commto + "',@DateSingle='" + commdate + "'", _ConnectionString);
        }
        public DataTable getCommissionCustomer(string recuser)
        {
            return SFObjects.LoadDataTable($@"EXEC [PRT].[nsp_Main] @QueryType=31,@Recuser='" + recuser + "'", _ConnectionString);
        }
        public DataTable getCommissionProject(string recuser)
        {
            return SFObjects.LoadDataTable($@"EXEC [PRT].[nsp_Main] @QueryType=32,@Recuser='" + recuser + "'", _ConnectionString);
        }
        public string GetUnitPrice(string unitcode)
        {
            return SFObjects.returnText(@"EXEC [PRT].[nsp_Main] @QueryType=25,@UnitCode='" + unitcode + "'", _ConnectionString);
        }
        public string getHoldingPeriod(string project,string custclass)
        {
            return SFObjects.returnText(@"EXEC [PRT].[nsp_Main] @QueryType=11,@project='"+project+ "',@CustClass='"+custclass+"'", _ConnectionString);
        }
        //for those floors w/out setup
        public DataTable getNonSetupUnits(string project,string projecttype,string phtw,string floorblock)
        {
            return SFObjects.LoadDataTable($@"EXEC [PRT].[nsp_Main] @QueryType=18,@Project='" + project + "',@ProjectType='" + projecttype + "',@PhaseTower='" + phtw + "',@floorblock='" + floorblock + "'", _ConnectionString);
        }
        //UNIT AVAILABILITY
        public string lookupFloorHDR(string project, string phase, string floor, string type)
        {
            return string.Format(@"EXEC [PRT].[nsp_REUnitCoordiantesSetup] @QueryType=6, @project ='{0}' , @phase ='{1}',   @floorblock ='{2}' , @ItmGrpType='{3}'", project, phase, floor, type);
        }
        public string lookupFloorLin(string project, string phase, string floor, string type)
        {
            return string.Format(@"EXEC [PRT].[nsp_REUnitCoordiantesSetup] @QueryType=7, @project ='{0}' , @phase ='{1}', @floorblock ='{2}' , @ItmGrpType='{3}'", project, phase, floor, type);
        }
        public DataTable GetHDRImgSrc(string project, string phase)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[PRT].[nsp_REUnitCoordiantesSetup]";
            cmd.Parameters.AddWithValue("@project", project);
            cmd.Parameters.AddWithValue("@phase", phase);
            cmd.Parameters.AddWithValue("@QueryType", 10);
            return base.ExecGetData(cmd, _ConnectionString);
        }

        public DataTable GetUnitImgSrc(string project, string phase)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[PRT].[nsp_REUnitCoordiantesSetup]";
            cmd.Parameters.AddWithValue("@project", project);
            cmd.Parameters.AddWithValue("@phase", phase);
            cmd.Parameters.AddWithValue("@QueryType", 13);
            return base.ExecGetData(cmd, _ConnectionString);
        }
        public string lookupFloor(string project, string phase, string projtype)
        {
            return string.Format(@"EXEC [PRT].[nsp_REUnitCoordiantesSetup] @QueryType=25, @project ='{0}' , @phase ='{1}', @ItmGrpType ='{2}'", project, phase, projtype);
        }
        public string lookupUnit(string project, string phase, string projtype)
        {
            return string.Format(@"EXEC [PRT].[nsp_REUnitCoordiantesSetup] @QueryType=26, @project ='{0}', @phase ='{1}',@ItmGrpType ='{2}'", project, phase, projtype);
        }
        public DataTable floorDetails(string project, string phase, string floor)
        {
            return SFObjects.LoadDataTable(string.Format(@"EXEC [PRT].[nsp_REUnitCoordiantesSetup] @QueryType=35, @project ='{0}', @phase='{1}', @floorblock='{2}'", project, phase, floor), _ConnectionString);
        }
        public string HasFloorSetup(string project, string ptype, string floor, string phtw)
        {
            return SFObjects.returnText(string.Format(@"EXEC [PRT].[nsp_Main] @QueryType=12, @Project ='{0}', @ProjectType='{1}', @floorblock='{2}', @PhaseTower='{3}'", project, ptype, floor,phtw), _ConnectionString);
        }
        public string HasAvailableCoordinate(string project, string ptype, string floor, string phtw)
        {
            return SFObjects.returnText(string.Format(@"EXEC [PRT].[nsp_Main] @QueryType=22, @Project ='{0}', @ProjectType='{1}', @floorblock='{2}', @PhaseTower='{3}'", project, ptype, floor, phtw), _ConnectionString);
        }
        public string HasAvailableUnit(string project, string ptype, string floor ,string phtw)
        {
            return SFObjects.returnText(string.Format(@"EXEC [PRT].[nsp_Main] @QueryType=19, @Project ='{0}', @ProjectType='{1}', @floorblock='{2}' ,@PhaseTower='{3}'", project, ptype, floor, phtw), _ConnectionString);
        }
        //END


        public string isReserved(string unit)
        {
            return SFObjects.returnText(string.Format(@"EXEC [PRT].[nsp_Main] @QueryType=15, @UnitCode ='{0}'", unit), _ConnectionString);
        }
        public string hasHold(string unit)
        {
            return SFObjects.returnText(string.Format(@"EXEC [PRT].[nsp_Main] @QueryType=16, @UnitCode ='{0}'", unit), _ConnectionString);
        }
        public string getMaxQueue(string trantype)
        {
            return SFObjects.returnText(string.Format(@"EXEC [PRT].[nsp_Main] @QueryType=14, @Trantype ='{0}'", trantype), _ConnectionString);
        }

        //ALL ARKDB
        public string CheckUserIP(string user)
        {
            return SFObjects.returnText(string.Format(@"select userIPLog from FPTI_NW.noahweb_UserLogStatus WHERE userID='{0}'", user), _ConnectionStringARK);
        }
        public string UserDesc(string user)
        {
            return SFObjects.returnText(string.Format(@"select Description from FPTI.[User] WHERE Code='{0}'", user), _ConnectionStringARK);
        }
    }
}