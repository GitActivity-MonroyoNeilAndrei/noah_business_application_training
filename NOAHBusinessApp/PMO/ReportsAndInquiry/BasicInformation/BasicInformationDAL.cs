using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;
using System.Linq;
namespace DALComponent
{
    public class BasicInformationDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        #region STANDARD

        public string MenuItemCode = "BasicInformation"; // This is default parameter  for version
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
        private string focusRecordPK;
        private string _ConnectionString;
        private string _ConnectionString2;
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "Code";                                      //--column for searching



        //#FOR EXPORT
        public string LISTINGFILENAME = "Basic Information", GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END


        public string CurrentSelectedItem;                                             //-- selected item in binding navigator
        private string storedProcedureName = "[PMO].[nsp_BasicInformation]";
        private string tableName = "[PMO].[CustomerInformation]";
        private SqlConnection conn;
        private SqlTransaction tran;

        public BasicInformationDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }

        public string LISTINGQUERY()
        {
            return string.Format(@"EXEC " + storedProcedureName + " @QueryType = 0");
        }

        public DataTable LoadSchema()
        {
            return SFObjects.LoadDataTable("SELECT * FROM " + tableName + " WHERE 1<>1", _ConnectionString);
        }

        public string inquireQuery(string curusers)
        {
            return string.Format(@"EXEC " + storedProcedureName + " @Code = '" + curusers + "', @QueryType = 4");
        }

        public DataTable GetUserName(string curusers)
        {
            string query1 = string.Format(@"EXEC " + storedProcedureName + " @Code = '" + curusers + "', @QueryType = 20");

            return SFObjects.LoadDataTable(query1, _ConnectionString);
        }

        public string GetData()
        {
            string a = string.Format(@"SELECT '' [Code]");

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/
            return a;
        }

        public DataTable GetContact(string curusers)
        {
            string query2 = string.Format(@"EXEC " + storedProcedureName + " @Code = '" + curusers + "', @QueryType = 21");

            return SFObjects.LoadDataTable(query2, _ConnectionString);
        }

        public DataTable ComboBox(string curusers)
        {
            string query3 = string.Format(@"EXEC " + storedProcedureName + " @Code = '" + curusers + "', @QueryType = 22");

            return SFObjects.LoadDataTable(query3, _ConnectionString);
        }

        public DataTable GetDetails(string curusers, string AccNo)
        {
            string query4 = string.Format(@"EXEC " + storedProcedureName + " @Code = '" + curusers + "',  @AccNo = '" + AccNo + "', @QueryType = 23");

            return SFObjects.LoadDataTable(query4, _ConnectionString);
        }

        public DataTable GetDataLIN(string curusers, string AccNo)
        {
            string query5 = string.Format(@"EXEC " + storedProcedureName + " @Code = '" + curusers + "', @AccNo = '" + AccNo + "', @QueryType = 24");

            return SFObjects.LoadDataTable(query5, _ConnectionString);
        }

        
    }

}