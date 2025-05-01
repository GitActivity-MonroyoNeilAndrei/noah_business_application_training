using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;

namespace DALComponent
{
    public class APPayeeTypeDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        #region STANDARD

        public string MenuItemCode = "APPayeeType"; // This is default parameter  for version
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
        private SqlConnection sqlConn = new SqlConnection();
        private SqlTransaction sqlTrn;
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "Code";                                      //--column for searching
                                


        //#FOR EXPORT
        public string LISTINGFILENAME = "Payee Type", GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END

        public string tableName = "[AP].[PAYEETYPE]";
        public string spName = "[AP].[nsp_PAYEETYPE]";

        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator

        public APPayeeTypeDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }


        public DataTable LoadSchema()
        {
            return SFObjects.LoadDataTable("SELECT * FROM " + tableName + " WHERE 1<>1", _ConnectionString);
        }

        public string GetData(string codevalue)
        {
            string a = string.Format(@"EXEC " + spName + " @Code='"+codevalue+"',@Querytype = 0");

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            return a;
        }

        public string SaveData(DataTable dt, bool IsNewRow)
        {
            
            try
            {
                DataRow dr = dt.Rows[0];

                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();
                SqlCommand cmd = new SqlCommand();


                cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.Transaction = sqlTrn;
                cmd.Parameters.Clear();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = spName;
                cmd.Parameters.AddWithValue("@Code", dr["Code"]);
                cmd.Parameters.AddWithValue("@Description", dr["Description"]);
                cmd.Parameters.AddWithValue("@Recuser", dr["RecUser"]);
                cmd.Parameters.AddWithValue("@Moduser", dr["ModUser"]);
                cmd.Parameters.AddWithValue("@QueryType", IsNewRow ? 1 : 2);
                cmd.ExecuteScalar();
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Cannot be saved. Duplicate records are not allowed.");
                else if (sqlEx.Number == 547)
                    result = String.Format("Cannot be saved. Data currently in use.");
                else
                    result = String.Format(sqlEx.Message);
                return result;
            }
            catch (Exception ex)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                return String.Format(ex.Message);
            }

            sqlTrn.Commit();
            sqlConn.Close();
            return "Saved successfully";
        }



        public string DeleteData(String Code)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = spName;
            cmd.Parameters.AddWithValue("@Code", Code);
            cmd.Parameters.AddWithValue("@QueryType", 3);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public string LISTINGQUERY()
        {
            return string.Format(@"EXEC " + spName + " @QueryType = 6");
        }

        public string inquireQuery()
        {
            return string.Format(@"SELECT code[Code],description[Description] FROM AP.PAYEETYPE");
        }

        public string lugTblNameQuery()
        {
            return string.Format(@"Select * From SG.getTableSchema WHERE [Table Schema] LIKE '%AP%' ");
        }

        public string lugRefCode(string tblName, string schema)
        {
            string sql = string.Format(@"EXEC " + spName + "  @TableName = '{0}', @RefSchema = '{1}', @QueryType = 7", tblName, schema);
            return sql;
        }

        public string getRefcodedescfilter(string tableName, string schema, string code)
        {
            string sql = string.Format(@"EXEC " + spName + " @TableName = '{0}', @RefSchema = '{1}',@Code = '{2}', @QueryType = 8", tableName, schema, code);
            return sql;
        }


        public string lugRefDesc(string tblName, string schema)
        {
            string sql = string.Format(@"EXEC " + spName + " @TableName = '{0}', @RefSchema = '{1}' @QueryType = 7", tblName, schema);
            return sql;
        }

        public string lugRefAdd(string tblName, string schema)
        {
            string sql = string.Format(@"EXEC " + spName + " @TableName = '{0}', @RefSchema = '{1}' @QueryType = 7", tblName, schema);
            return sql;
        }

        public string lugRefTin(string tblName, string schema)
        {
            string sql = string.Format(@"EXEC " + spName + " @TableName = '{0}', @RefSchema = '{1}' @QueryType = 7", tblName, schema);
            return sql;
        }


        #region
        public string getLugIntrNtionalGrp()
        {
            return string.Format(@"SELECT Code [International Group Code], Description [International Group Description] FROM SG.InternationalGroup");
        }

        public string getLugIntrNtionalSubGrp()
        {
            return string.Format(@"SELECT Code [International Sub Group Code], Description [International Sub Group Description] FROM SG.InternationalSubGroup");
        }

        #endregion
    }
}