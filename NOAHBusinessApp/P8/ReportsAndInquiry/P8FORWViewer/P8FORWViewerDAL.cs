using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;
using System.Linq;
using NoahWebLib.Security;
using System.Threading.Tasks;

namespace DALComponent
{
    public class P8FORWViewerDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        #region STANDARD

        public string MenuItemCode = "P8FORWViewer"; // This is default parameter  for version
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
        private string _ConnectionStringNOAH;
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "Code";                                      //--column for searching

        private SqlTransaction sqlTrn;
        private SqlConnection sqlConn = new SqlConnection();

        //#FOR EXPORT
        public string LISTINGFILENAME = "Basic Information", GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END


        public string CurrentSelectedItem;                                             //-- selected item in binding navigator
        private string sp_forwviewer = "[P8].[nsp_FORWViewer]";
        private string sp_forw = "[P8].[nsp_FORW]";
        private SqlConnection conn;
        private SqlTransaction tran;

        public P8FORWViewerDAL(string ConnectionString, string ConnectionString2,string ConnectionStringNOAH,string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            _ConnectionStringNOAH = ConnectionStringNOAH;
            nwSystem.Noah_ConnectionString();
            this.CurrentSelectedItem = selectedItem;
        }

        public DataSet LoadDocumentSet(string code)
        {
            return SFObjects.LoadDataSet($"exec {sp_forwviewer} @code='{code}',@QueryType = 0", _ConnectionString);
        }

        public string sqlsyntaxstring(string sqlsyntax)
        {
            return SFObjects.returnText(sqlsyntax, _ConnectionStringNOAH);
        }
        public DataTable sqlsyntaxtable(string sqlsyntax)
        {
            return SFObjects.LoadDataTable(sqlsyntax, _ConnectionStringNOAH);
        }
        public DataTable LoadDataSource(string datasourceid)
        {
            return SFObjects.LoadDataTable($"exec {sp_forwviewer} @datasourceid='{datasourceid}',@QueryType = 1", _ConnectionString);
        }
        public DataTable getDataGrid_sbpfixed(string subtype)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = sp_forwviewer;
            cmd.Parameters.AddWithValue("@SubType", subtype);
            cmd.Parameters.AddWithValue("@QueryType", 1);
            return base.ExecGetData(cmd, _ConnectionString);
        }

        public DataSet getDataGrid_sb(string subtype)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = sp_forwviewer;
            cmd.Parameters.AddWithValue("@SubType", subtype);
            cmd.Parameters.AddWithValue("@QueryType", 19);
            return base.ExecGetDataSet(cmd, _ConnectionString);
        }
    }

}