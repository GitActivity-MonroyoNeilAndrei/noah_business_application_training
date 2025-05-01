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
    public class HomeDAL : NoahWebLib.DatabaseHandler
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

        public HomeDAL(string ConnectionString, string ConnectionString2, string selectedItem)
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
        
        public string LISTINGQUERY(string pcode, string ptype, string phtw)
        {

            string sql = $"EXEC [PRT].[nsp_Main] @QueryType=23,@Project='{pcode}',@ProjectType='{ ptype }',@PhaseTower='{ phtw}'";
            return sql;

        }
        public DataTable GetNotifAllUnread(string curdate, string recuser)
        {
            curdate = nwSystem.FilterSQL(curdate);
            recuser = nwSystem.FilterSQL(recuser);

            string sql = $@"
                                declare @curdate datetime = '{curdate}'
                                declare @recuser varchar(100) = '{recuser}'
                                set @curdate = iif(@curdate = '1900-01-01 00:00:00.000', dbo.getnoahdate(), @curdate)
                                Select top 10 * from zapi.Mob_Notifications
                                where UserID = @recuser
                                and Recdate < @curdate
                                order by Recdate desc";

            return SFObjects.LoadDataTable(sql, _ConnectionString2); ;
        }
        public string getverse()
        {
            return SFObjects.returnText(@"SELECT TOP 1 '<b><i>'+versetitle+'</i></b><br>'+versebody+'' FROM FPTI_NW.Verse WHERE effectivedate <= CAST(dbo.GetNoahDate() AS DATE) ORDER BY effectivedate desc", _ConnectionString2);
        }

        public System.Data.DataTable Get_SystemNotification(string compID, string reuser)
        {
            string xquery = "";
            if (compID != "nwnone")
            {
                xquery = string.Format(@"Select Distinct a.code,a.noti_template,b.SqlQuery,b.Description,dbo.getNoahDate() Recdate, x.sysuser From [FPTI_NW].[noahweb_CompanyAlertOtherMaintenance] a 
                                        inner join FPTI.CompanyUserAlertMapping x on x.company = a.company  and x.sysuser = '{1}'
                                        inner join [FPTI].[CompanyAlert] b on a.Code = b.Code and x.alert = b.Code                  
                                        where a.Company = '{0}' and a.status_noti = 1  and x.sysuser = '{1}'", compID, reuser);
            }
            else
            {
                xquery = string.Format(@"SELECT * FROM [FPTI].[CompanyAlert] WHERE [Code] != '0' OR [Description]!='0'");
            }
            return SFObjects.LoadDataTable(xquery, _ConnectionString2);
        }
    }
}