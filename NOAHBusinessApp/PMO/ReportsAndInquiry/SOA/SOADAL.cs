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
    public class SOADAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        #region STANDARD

        public string MenuItemCode = "SBSalesCallSummary"; // This is default parameter  for version
        public string MenuItemVersion = "8.0.0.3E"; // This is default parameter for version
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
        public string LISTINGFILENAME = "Sales Call Summary", GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END


        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator
        private SqlConnection conn;
        private SqlTransaction tran;

        public SOADAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }

        public string inquireQuery()
        {
            return string.Format(@"SELECT ''[Code]");
        }

        public DataTable GetDataLIN(string curuser, string SalesForceActList, string ProspectCustList, string dateFrom, string dateTo)
        {
            string query = string.Format($@"EXEC [PRT].[nsp_SBSalesCall] @QueryType = 26, @Seller = '{curuser}', @SalesForceActList = '{SalesForceActList}', @ProspectCustList = '{ProspectCustList}', @DateFrom = '{dateFrom}', @DateTo = '{dateTo}'");

            return SFObjects.LoadDataTable(query, _ConnectionString);
        }

        public string InquireSalesForceAct(string curuser, string ProspectCustList, string dateFrom, string dateTo)
        {
            return string.Format($@"EXEC [PRT].[nsp_SBSalesCall] @QueryType = 27, @Seller = '{curuser}', @ProspectCustList='{ProspectCustList}', @DateFrom='{dateFrom}', @DateTo='{dateTo}'");
        }

        public string InquireProspectCust(string curuser, string SalesForceActList, string dateFrom, string dateTo)
        {
            return string.Format($@"EXEC [PRT].[nsp_SBSalesCall] @QueryType = 28, @Seller = '{curuser}', @SalesForceActList='{SalesForceActList}', @DateFrom='{dateFrom}', @DateTo='{dateTo}'");
        }


        public string GetData()
        {
            string a = string.Format(@"SELECT '' [Code]");

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/
            return a;
        }
        public string DWLink()
        {
            return SFObjects.returnText(@"SELECT [Value] FROM [dbo].[SystemConfig] where [code]='DocuWriter_Link'", _ConnectionString);
        }
        public string DWRepID(string trantype)
        {
            return SFObjects.returnText(@"SELECT [Value] FROM dbo.DocumentWriterMapping where [code]='" + trantype + "'", _ConnectionString);
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