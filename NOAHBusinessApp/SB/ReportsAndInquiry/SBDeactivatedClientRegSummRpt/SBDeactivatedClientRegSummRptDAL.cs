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
    public class SBDeactivatedClientRegSummRptDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        #region STANDARD

        public string MenuItemCode = "SBDeactivatedClientRegSummRpt"; // This is default parameter  for version
        public string MenuItemVersion = "10.0.0.1"; // This is default parameter for version
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
        public string LISTINGFILENAME = "Deactivated Client Registration Summary", GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END


        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator
        private SqlConnection conn;
        private SqlTransaction tran;

        public SBDeactivatedClientRegSummRptDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }

        public string inquireQuery()
        {
            return string.Format(@"SELECT ''[Code]");
        }

        public DataTable GetDataLIN(string customerList, string custClassList, string dateFrom, string dateTo)
        {
            string query = string.Format($@"EXEC [PRT].[nsp_SBDeactivatedClientRegSummRpt] @QueryType = 0, 
                                                                                      @CustomerList = '{customerList}',
                                                                                      @CustClassList = '{custClassList}',
                                                                                      @DateFrom = '{dateFrom}',
                                                                                      @DateTo = '{dateTo}'");

            return SFObjects.LoadDataTable(query, _ConnectionString);
        }

        public string InquireCustomer(string custClassList, string dateFrom, string dateTo)
        {
            return string.Format($@"EXEC [PRT].[nsp_SBDeactivatedClientRegSummRpt] @QueryType = 20, @CustClassList='{custClassList}', @DateFrom='{dateFrom}', @DateTo='{dateTo}'");
        }

        public string InquireCustomerClassification(string customerList, string dateFrom, string dateTo)
        {
            return string.Format($@"EXEC [PRT].[nsp_SBDeactivatedClientRegSummRpt] @QueryType = 21, @CustomerList='{customerList}', @DateFrom='{dateFrom}', @DateTo='{dateTo}'");
        }


        public string GetData()
        {
            string a = string.Format(@"SELECT '' [Code]");

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/
            return a;
        }


        public string getNoahDate()
        {
            return SFObjects.returnText(string.Format(@"SELECT FORMAT(dbo.GetNoahDate(), 'MM/dd/yyyy hh:mm:ss tt')"), _ConnectionString);
        }

        public DataTable GetYearList()
        {
            return SFObjects.LoadDataTable(@"SELECT YEAR(GETDATE()) YEAR, YEAR(GETDATE()) YEAR
		                                    UNION
		                                    SELECT DISTINCT YEAR, YEAR FROM GL.PERDATES", _ConnectionString);
        }
    }

}