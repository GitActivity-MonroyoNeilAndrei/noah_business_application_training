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
    public class PMOTransaction_HistoryDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        #region STANDARD

        public string MenuItemCode = "PMOTransaction_History"; // This is default parameter  for version
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
        public string LISTINGFILENAME = "Transaction History", GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END


        public string CurrentSelectedItem;                                             //-- selected item in binding navigator
        private string storedProcedureName = "[PMO].[nsp_Transaction_Hist]";
        private string tableName = "[PMO].[RequestEntry]";

        public PMOTransaction_HistoryDAL(string ConnectionString, string ConnectionString2, string selectedItem)
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
            return string.Format(@"EXEC " + storedProcedureName + " @Customer = '" + curusers + "', @QueryType = 4");
        }

        public string GetData(string curusers)
        {
            string a = string.Format(@"EXEC " + storedProcedureName + " @Customer = '" + curusers + "', @QueryType = 16");

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            return a;
        }

        public DataTable GetUnitCode(string curusers)
        {
            string query1 = string.Format(@"EXEC " + storedProcedureName + " @Code = '" + curusers + "', @QueryType = 25");

            return SFObjects.LoadDataTable(query1, _ConnectionString);
        }

        public DataTable ComboBox2()
        {
            string query2 = string.Format(@"EXEC " + storedProcedureName + " @QueryType = 21");

            return SFObjects.LoadDataTable(query2, _ConnectionString);
        }

        public DataTable ComboBox3()
        {
            string query3 = string.Format(@"EXEC " + storedProcedureName + " @QueryType = 27");

            return SFObjects.LoadDataTable(query3, _ConnectionString);
        }

        public DataTable getFilteredReqs(int reqType)
        {
            string query3 = string.Format(@"EXEC " + storedProcedureName + " @QueryType = " + reqType);

            return SFObjects.LoadDataTable(query3, _ConnectionString);
        }

        public DataTable getStatusList()
        {
            string query3 = string.Format(@"EXEC " + storedProcedureName + " @QueryType = 30");

            return SFObjects.LoadDataTable(query3, _ConnectionString);
        }

        public DataTable GetDetails(string AccNo)
        {
            string query4 = string.Format(@"EXEC " + storedProcedureName + " @AccNo = '" + AccNo + "', @QueryType = 23");

            return SFObjects.LoadDataTable(query4, _ConnectionString);
        }

        public string getDocwriterCode(string code)
        {
            string sql = String.Format(@"SELECT Value FROM  dbo.DocumentWriterMapping  WHERE Code= '{0}'", code);
            return SFObjects.returnText(sql, _ConnectionString);
        }

        public string DWLink()
        {
            return SFObjects.returnText($"SELECT Value FROM dbo.SystemConfig WHERE Code = 'DocuWriter_Link'", _ConnectionString);
        }

        public string getuser(string token)
        {
            return SFObjects.returnText($"select recuser from fpti_nw.APIAuth where tokenkey = '{token}'", _ConnectionString2);
        }

        public DataTable GetDataLIN(string AccNo, string TranType, string Charges, string dateFrom, string dateTo)
        {
            string query5 = string.Format(@"EXEC " + storedProcedureName + " @QueryType = 26, @AccNo = '" + AccNo + "', @TranType = '" + TranType + "', @Charges = '" + Charges + "', @DateFrom = '" + dateFrom + "', @DateTo = '" + dateTo + "'");

            return SFObjects.LoadDataTable(query5, _ConnectionString);
        }

        public string getReqDesc(string code)
        {
            return SFObjects.returnText($"EXEC " + storedProcedureName + " @Charges = '" + code + "', @QueryType = 29", _ConnectionString);
        }


    }

}