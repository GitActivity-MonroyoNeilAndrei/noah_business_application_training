using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;

namespace DALComponent
{
    public class SBPaymentTermOptionsDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects(); /// should be added
        #region STANDARD

        public string MenuItemCode = "SBPaymentTermOptions"; // This is default parameter  for version
        public string MenuItemVersion = "8.0.0.0"; // This is default parameter for version
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
        private SqlConnection sqlConn = new SqlConnection();
        private SqlTransaction sqlTrn;

        private string _ConnectionString;
        private string _ConnectionString2;
        public string focusRecordPK;
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "Code";                                     //--column for searching

        //#FOR EXPORT
        public string LISTINGFILENAME = "Payment Term Options"
            //,LISTINGQUERY = @"SELECT Code, [Description], Recuser as [Created by], recdate as [Date Created], moduser as [Modified by], moddate as [Date Modified] FROM EP.Banks"
            , GETCOMPANY = "select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 6;
        //# END

        public readonly int listingStartRow = 6;                                       //--default start row

        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator

        public SBPaymentTermOptionsDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;

            this.CurrentSelectedItem = selectedItem;
        }

        public string ConnectionString { get { return _ConnectionString; } }



        public DataTable getDataLin(string project, string phaseTower, string unit,
                        string inventoryType, string inventoryClass, string itemstatus, string filter)
        {
            string strSQL = $@"EXEC [PRT].[nsp_SBPaymentTermOptions] @QueryType = 0, @filter='{filter}' , 
                                @project = '{project}' , @phaseTower = '{phaseTower}' , @unit='{unit}' , 
                                @inventoryType = '{inventoryType}' , @inventoryClass = '{inventoryClass}', @itemstatus = '{itemstatus}'
                            ";
            return SFObjects.LoadDataTable(strSQL, _ConnectionString);
        }

        public DataTable getHistory(string trantype, string docno)
        {
            string strSQL = $@"EXEC [PRT].[nsp_SBPaymentTermOptions] @QueryType = 21,@trantype = '{trantype}', @docno = '{docno}'";
            return SFObjects.LoadDataTable(strSQL, _ConnectionString);
        }

        public string GetData()
        {
            string a = string.Format(@"EXEC  [RE].[VATReport] @QueryType = 0");

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            return a;
        }



        public string getLookup()
        {
            return string.Format($@"EXEC [PRT].[nsp_NewPaymentTermOption] @QueryType = 0");
        }

        public DataTable GetYearList()
        {
            return SFObjects.LoadDataTable(@"SELECT YEAR(GETDATE()) YEAR, YEAR(GETDATE()) YEAR
		                                    UNION
		                                    SELECT DISTINCT YEAR, YEAR FROM GL.PERDATES", _ConnectionString);
        }



        public DataTable getStandardTerm()
        {
            return SFObjects.LoadDataTable(@"EXEC [PRT].[nsp_NewPaymentTermOption] @QueryType = 0", _ConnectionString);
        }
        public string DWLink()
        {
            return SFObjects.returnText(string.Format(@"SELECT TOP 1 value FROM dbo.SystemConfig WHERE code ='DocuWriter_Link'"), _ConnectionString);
        }

        public string getDocno()
        {
            return SFObjects.returnText(string.Format(@"SELECT TOP 1 TransactionNumber FROM re.vw_SellingPriceAssign ORDER  BY EffectiveDate DESC"), _ConnectionString);
        }



    }
}

