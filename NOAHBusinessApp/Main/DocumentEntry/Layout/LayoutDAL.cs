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


        public DataTable GetNotifUnread(string curdate,string recuser)
        {
            curdate=nwSystem.FilterSQL(curdate);
            recuser = nwSystem.FilterSQL(recuser);

            string sql =$@"
                                declare @curdate datetime = '{curdate}'
                                declare @recuser varchar(100) = '{recuser}'
                                set @curdate = iif(@curdate = '1900-01-01 00:00:00.000', dbo.getnoahdate(), @curdate)
                                Select * from zapi.Mob_Notifications
                                where UserID = @recuser
                                and Recdate < @curdate
                                and [read] = 0
                                order by Recdate desc";

            return SFObjects.LoadDataTable(sql,_ConnectionString2); ;
        }
        public string ValidateOTP(string _account, string OTPCode)
        {
            return SFObjects.returnText($"exec [zAPI].[nsp_Mob_Accounts] @AccountNo='{_account}', @OTPCode='{OTPCode}', @QueryType = 69", _ConnectionString2);
        }

        public bool InsertOTP(string _user, string _OTPType, string _OTPCode)
        {
            string query1 = string.Format(@"EXEC [zAPI].[nsp_Mob_Accounts]   @AccountNo = '" + _user + "', @QueryType = 70");
            DataTable userInfo = SFObjects.LoadDataTable(query1, _ConnectionString2);

            string userEmail = userInfo.Rows[0]["Email"] + "";
            //string userMobile = userInfo.Rows[0]["Mobile Number"] + "";

            int result = 0;
            bool userExists = true;
            string query = SFObjects.returnText($"exec [zAPI].[nsp_Mob_Accounts] @AccountNo='{_user}', @Email='{userEmail}', @OTPType='{_OTPType}', @OTPCode='{_OTPCode}', @QueryType = 71", _ConnectionString2);
            try
            {
                result = Int32.Parse(query);
            }
            catch (Exception ex)
            { }
            userExists = result > 0 ? true : false;
            return userExists;
        }

        public string updateContact(string _user, string _detail, string _info)
        {
            try
            {
                int queryType = _detail == "Email Address" ? 19 : 18;
                string detailType = _detail == "Email Address" ? "@Email" : "@MobileNo";
                string query = String.Format($"exec [zAPI].[nsp_Mob_Accounts] @AccountNo='{_user}', {detailType}='{_info}', @QueryType = 72 ");
                return SFObjects.returnText(query, _ConnectionString2);
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        public string currentpassword(string accno)
        {
            return SFObjects.returnText($@"Select password from fpti.[user] where code = '{accno}'", _ConnectionString2);
        }

        public string currentemail(string recuser)
        {
            return SFObjects.returnText($@"Select Email from fpti_nw.noahweb_zEmail where userID = '{recuser}'", _ConnectionString2);
        }
        public DataTable GetCompany(string recuser)
        {

            DataTable dtGetCompany = SFObjects.LoadDataTable(string.Format(@"select a.Company ,b.Description 
                                From FPTI.CompanyUserMapping a 
                                inner join FPTI.Company b on a.Company = b.Code
                                where (SysUser = '{0}' or SysUser like '{0}@%') "
                                , recuser), _ConnectionString2);

            dtGetCompany.Columns.Add("CompanyCode");
            for (int i = 0; i < dtGetCompany.Rows.Count; i++)
            {

                string code = dtGetCompany.Rows[i]["Company"].ToString();
                code = nwSystem.GetGeneralTokenKey(code, recuser);
                dtGetCompany.Rows[i]["CompanyCode"] = code;

            }

            return dtGetCompany;
        }

    }
}