using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;

namespace DALComponent
{
    public class APBIRFormsAuthorizedSignatoryReportDAL : NoahWebLib.DatabaseHandler
    {
        public string docno = string.Empty;
        private SqlTransaction sqlTrn;
        private SqlConnection sqlConn = new SqlConnection();
        private string storedProcedure = "[AP].[nsp_BIRFormsAuthorizedSignatoryReport_Monroyo]";

        nwSFObjects SFObjects = new nwSFObjects();
        #region STANDARD

        public string MenuItemCode = "APBIRFormsAuthorizedSignatoryReport"; // This is default parameter  for version
        public string MenuItemVersion = "10.0.0.0"; // This is default parameter for version
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
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "Docno";                                     //--column for searching

        private string focusRecordPK = "";
        //#FOR EXPORT
        public string LISTINGFILENAME = "BIR Forms Authorized Signatory Report Listing",
                      GETCOMPANY = "select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END


        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator
        public APBIRFormsAuthorizedSignatoryReportDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }

        public DataTable GetReportData(string dateFrom, string dateTo, bool load, string Location, string signatoryList, string designationList, string recuser)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = storedProcedure;
            cmd.Parameters.AddWithValue("@dateFrom", dateFrom);
            cmd.Parameters.AddWithValue("@dateTo", dateTo);
            cmd.Parameters.AddWithValue("@locformList", Location);

            cmd.Parameters.AddWithValue("@sigformList", signatoryList);
            cmd.Parameters.AddWithValue("@desformList", designationList);

            cmd.Parameters.AddWithValue("@Recuser", recuser);

            if (load)
                cmd.Parameters.AddWithValue("@QueryType", 1);
            else
                cmd.Parameters.AddWithValue("@QueryType", 0);

            return base.ExecGetData(cmd, _ConnectionString);
        }

        public DataTable GetYearList()
        {
            return SFObjects.LoadDataTable($"EXEC {storedProcedure} @QueryType = 7", _ConnectionString);
        }

        public DataTable getDefloc(string user)
        {
            return SFObjects.LoadDataTable($"EXEC {storedProcedure} @Recuser = '{user}', @QueryType = 8", _ConnectionString);
        }

        public string GetData(string recuser)
        {
            string a = string.Format($"EXEC [RE].[nsp_TRANSFERACTIVITY] @Recuser = '{recuser}', @QueryType = 0");
            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/
            return a;
        }

        public string INQUIREQUERY(string recuser)
        {
            return $"EXEC [RE].[nsp_TRANSFERACTIVITY] @Recuser='{recuser}', @QueryType = 26";
        }

        public string getAddToList(int queryType, string dateFilterFrom, string dateFilterTo, string Location, string sigformList, string desformList, string user)
        {
            return $"EXEC {storedProcedure} @dateFrom = '{dateFilterFrom}', @dateTo = '{dateFilterTo}', @locformList = '{Location}', @sigformList=''{sigformList}, @desformList='{desformList}', @Recuser = '{user}', @QueryType = {queryType}";
        }

        public string getServerDate()
        {
            return SFObjects.returnText(@"SELECT FORMAT(dbo.GetNoahDate(),'MM/dd/yyyy')", _ConnectionString);
        }

        public string chkRptAccAssgn(string user)
        {
            return SFObjects.returnText($@"EXEC {storedProcedure} @Recuser = '{user}', @QueryType = 16", _ConnectionString);
        }

        public string chkLabelCC()
        {
            return SFObjects.returnText($"SELECT Description FROM SG.SEGMENT WHERE Costcenterflg = 1", _ConnectionString);
        }
    }
}
