using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;

namespace DALComponent
{
    public class WFMActivityRqrmntComplianceEntryDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        #region STANDARD

        public string MenuItemCode = "WFMActivityRqrmntComplianceEntry"; // This is default parameter  for version
        public string MenuItemVersion = "10.0.0.6"; // This is default parameter for version
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
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "docno";                                    //--column for searching

        string tableHDR = "SG.wfActivityReqCompEntry";
        string storedProcedure = "SG.nsp_wfActivityReqCompEntry";

        //#FOR EXPORT
        public string LISTINGFILENAME = "Employee E-Signature"
            , GETCOMPANY = "Select CompanyName from dbo.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END

        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator

        public WFMActivityRqrmntComplianceEntryDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }
        public string ConnectionString { get { return _ConnectionString; } }
        public DataTable LoadSchema()
        {
            return SFObjects.LoadDataTable(string.Format("SELECT * FROM {0} WHERE 1<>1", tableHDR), _ConnectionString);
        }

        public string GetData(string docno, string recuser)
        {
            string a = string.Format($@"EXEC {storedProcedure} @docno = '{docno}', @recUser='{recuser}', @QueryType=0");
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/
            return a;
        }
        public string SaveData(DataTable dt, bool IsNewRow)
        {
            try
            {
                string docno = string.Empty;
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();

                DataRow dr = dt.Rows[0];
                docno = dr["docno"].ToString();
                SqlCommand cmd = new SqlCommand();

                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = storedProcedure;
                cmd.Parameters.AddWithValue("@docno", dt.Rows[0]["docno"]);
                cmd.Parameters.AddWithValue("@locForm", dt.Rows[0]["locForm"]);
                cmd.Parameters.AddWithValue("@tranType", dt.Rows[0]["tranType"]);
                cmd.Parameters.AddWithValue("@remarks", dt.Rows[0]["remarks"]);
                cmd.Parameters.AddWithValue("@col1", dt.Rows[0]["col1"]);
                cmd.Parameters.AddWithValue("@col2", dt.Rows[0]["col2"]);
                cmd.Parameters.AddWithValue("@col3", dt.Rows[0]["col3"]);
                cmd.Parameters.AddWithValue("@col4", dt.Rows[0]["col4"]);
                cmd.Parameters.AddWithValue("@col5", dt.Rows[0]["col5"]);
                cmd.Parameters.AddWithValue("@col6", dt.Rows[0]["col6"]);
                cmd.Parameters.AddWithValue("@col7", dt.Rows[0]["col7"]);
                cmd.Parameters.AddWithValue("@col8", dt.Rows[0]["col8"]);
                cmd.Parameters.AddWithValue("@col9", dt.Rows[0]["col9"]);
                cmd.Parameters.AddWithValue("@col10", dt.Rows[0]["col10"]);
                cmd.Parameters.AddWithValue("@col1Desc", dt.Rows[0]["col1Desc"]);
                cmd.Parameters.AddWithValue("@col2Desc", dt.Rows[0]["col2Desc"]);
                cmd.Parameters.AddWithValue("@col3Desc", dt.Rows[0]["col3Desc"]);
                cmd.Parameters.AddWithValue("@col4Desc", dt.Rows[0]["col4Desc"]);
                cmd.Parameters.AddWithValue("@col5Desc", dt.Rows[0]["col5Desc"]);
                cmd.Parameters.AddWithValue("@col6Desc", dt.Rows[0]["col6Desc"]);
                cmd.Parameters.AddWithValue("@col7Desc", dt.Rows[0]["col7Desc"]);
                cmd.Parameters.AddWithValue("@col8Desc", dt.Rows[0]["col8Desc"]);
                cmd.Parameters.AddWithValue("@col9Desc", dt.Rows[0]["col9Desc"]);
                cmd.Parameters.AddWithValue("@col10Desc", dt.Rows[0]["col10Desc"]);
                cmd.Parameters.AddWithValue("@refDocno", dt.Rows[0]["refDocno"]);
                cmd.Parameters.AddWithValue("@maxTag", dt.Rows[0]["maxTag"]);
                cmd.Parameters.AddWithValue("@cc", dt.Rows[0]["cc"]);
                cmd.Parameters.AddWithValue("@pc", dt.Rows[0]["pc"]);
                cmd.Parameters.AddWithValue("@amount", dt.Rows[0]["amount"]);
                cmd.Parameters.AddWithValue("@vendor", dt.Rows[0]["vendor"]);
                cmd.Parameters.AddWithValue("@recUser", dt.Rows[0]["recUser"]);
                cmd.Parameters.AddWithValue("@modUser", dt.Rows[0]["modUser"]);
                cmd.Parameters.AddWithValue("@col11", dt.Rows[0]["col11"]);
                cmd.Parameters.AddWithValue("@col12", dt.Rows[0]["col12"]);
                cmd.Parameters.AddWithValue("@col13", dt.Rows[0]["col13"]);
                cmd.Parameters.AddWithValue("@col14", dt.Rows[0]["col14"]);
                cmd.Parameters.AddWithValue("@col15", dt.Rows[0]["col15"]);
                cmd.Parameters.AddWithValue("@col11Desc", dt.Rows[0]["col11Desc"]);
                cmd.Parameters.AddWithValue("@col12Desc", dt.Rows[0]["col12Desc"]);
                cmd.Parameters.AddWithValue("@col13Desc", dt.Rows[0]["col13Desc"]);
                cmd.Parameters.AddWithValue("@col14Desc", dt.Rows[0]["col14Desc"]);
                cmd.Parameters.AddWithValue("@col15Desc", dt.Rows[0]["col15Desc"]);
                cmd.Parameters.AddWithValue("@refNo", dt.Rows[0]["refNo"]);
                cmd.Parameters.AddWithValue("@col16", dt.Rows[0]["col16"]);
                cmd.Parameters.AddWithValue("@col17", dt.Rows[0]["col17"]);
                cmd.Parameters.AddWithValue("@col18", dt.Rows[0]["col18"]);
                cmd.Parameters.AddWithValue("@col19", dt.Rows[0]["col19"]);
                cmd.Parameters.AddWithValue("@col20", dt.Rows[0]["col20"]);
                cmd.Parameters.AddWithValue("@col16Desc", dt.Rows[0]["col16Desc"]);
                cmd.Parameters.AddWithValue("@col17Desc", dt.Rows[0]["col17Desc"]);
                cmd.Parameters.AddWithValue("@col18Desc", dt.Rows[0]["col18Desc"]);
                cmd.Parameters.AddWithValue("@col19Desc", dt.Rows[0]["col19Desc"]);
                cmd.Parameters.AddWithValue("@col20Desc", dt.Rows[0]["col20Desc"]);
                cmd.Parameters.AddWithValue("@QueryType", IsNewRow ? 1 : 2);
                cmd.ExecuteNonQuery();
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Error [{0}]: \nSystem Cannot Save Data.\nDuplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("Error [{0}]: \nSystem Cannot perform action.\nData currently in use.", sqlEx.Number);
                else
                    result = String.Format("Error [{0}]: {1}", sqlEx.Number, sqlEx.Message);
                return result;
            }
            catch (Exception ex)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                return String.Format("Error: {0}", ex.Message);
            }

            sqlTrn.Commit();
            sqlConn.Close();
            return "Saved successfully";
        }
        public string DeleteData(string Code, string recuser)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = storedProcedure;
            cmd.Parameters.AddWithValue("@Docno", Code);
            cmd.Parameters.AddWithValue("@recUser", recuser);
            cmd.Parameters.AddWithValue("@QueryType", 3);
            return base.ExecProcedure(cmd, _ConnectionString);
        }
        public string LISTINGQUERY()
        {
            return string.Format(@"EXEC {0} @QueryType = 5", storedProcedure);
        }

        public string ProcessData(string docno, string recuser)
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();
                SqlCommand cmd = new SqlCommand();
                cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = storedProcedure;
                cmd.Parameters.AddWithValue("@docno", docno);
                cmd.Parameters.AddWithValue("@recuser", recuser);
                cmd.Parameters.AddWithValue("@QueryType", 5);
                cmd.ExecuteNonQuery();
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 547)
                    result = String.Format("Error [{0}]: \nSystem Cannot perform action.\nData currently in use.", sqlEx.Number);
                else
                    result = String.Format("{0}", sqlEx.Message);
                return result;
            }
            catch (Exception ex)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                return String.Format("Error: {0}\n", ex.Message);
            }
            sqlTrn.Commit();
            sqlConn.Close();
            return "Process completed";

        }

        public int ValidateReqComplianceHDR(string docno, string trantype)
        {
            string strSQL = $"SELECT DC.fn_reqCompVal('{docno}','0','{trantype}','','')";
            return Parser.ParseInt(SFObjects.returnText(strSQL, _ConnectionString));
        }
        public string InqurireQry(string recuser)
        {
            return string.Format($@"EXEC {storedProcedure} @recUser='{recuser}', @QueryType = 4");
        }
        public DataTable GetLinData()
        {
            string sql = String.Format($@"EXEC {storedProcedure} @QueryType = 8");

            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public bool isAllowPC(string trantype)
        {
            string sql = $@"EXEC {storedProcedure} @tranType = '{trantype}', @queryType = 19";
            return Parser.ParseInt(SFObjects.returnText(sql, _ConnectionString)).Equals(1);
        }
        public bool isAllowCC(string trantype)
        {
            string sql = $@"EXEC {storedProcedure} @tranType = '{trantype}', @queryType = 20";
            return Parser.ParseInt(SFObjects.returnText(sql, _ConnectionString)).Equals(1);
        }

        public bool isReqAmnt(string trantype)
        {
            string sql = $@"EXEC {storedProcedure} @tranType = '{trantype}', @queryType = 21";
            return Parser.ParseInt(SFObjects.returnText(sql, _ConnectionString)).Equals(1);
        }

        public DataTable getDefaultLocation(string recuser)
        {
            string sql = String.Format($@"EXEC {storedProcedure} @Recuser = '{recuser}', @QueryType = 13");
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }
        public string getLocation(string trantype, string recuser)
        {
            string sql = String.Format($@"EXEC {storedProcedure} @Recuser = '{recuser}', @TranType = '{trantype}', @QueryType = 14");
            return sql;
        }
        public string getLookup(string activityType, string loc, int fieldTag, string f1, string f2, string f3, string f4, string f5,
                                string f6, string f7, string f8, string f9, string f10, string f11, string f12, string f13, string f14,
                                string f15, string f16, string f17, string f18, string f19, string f20, string recuser)
        {
            string sql = String.Format($@"EXEC {storedProcedure} @activityType='{activityType}', @fieldTag={fieldTag}, @locForm='{loc}', @f1Filter='{f1}', 
                                          @f2Filter='{f2}', @f3Filter='{f3}', @f4Filter='{f4}', @f5Filter='{f5}', @f6Filter='{f6}', @f7Filter='{f7}',
                                          @f8Filter='{f8}', @f9Filter='{f9}', @f10Filter='{f10}', @f11Filter='{f11}', @f12Filter='{f12}',
                                          @f13Filter='{f13}', @f14Filter='{f14}', @f15Filter='{f15}', @f16Filter='{f16}', @f17Filter='{f17}',
                                          @f18Filter='{f18}', @f19Filter='{f19}', @f20Filter='{f20}', @recuser='{recuser}', @QueryType=23");
            return sql;
        }
        public bool chkifHasRequirementCompliance(string docno, int lineID, int rowno)
        {
            string strSQL = $"SELECT DC.fn_ChkIfHasReqCompliance('{docno}','{lineID}','{rowno}')";
            return Parser.ParseBool(SFObjects.returnText(strSQL, _ConnectionString));
        }
        public string getLblProfitCenter()
        {
            string sql = $@"EXEC {storedProcedure} @QueryType = 10";
            return SFObjects.returnText(sql, _ConnectionString);
        }
        public string getLblCostCenter()
        {
            string sql = $@"EXEC {storedProcedure} @QueryType = 11";
            return SFObjects.returnText(sql, _ConnectionString);
        }
        public string getlugTranType(string recuser)
        {
            string sql = $@"EXEC {storedProcedure} @recuser='{recuser}', @QueryType=12";

            return sql;
        }
        public DataTable getDynamicFields(string act,int qry)
        {
            string sql = String.Format($@"EXEC {storedProcedure} @activityType='{act}', @QueryType={qry}");
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }
        public DataTable getLoadedFields(string act, string code, int tag, string recuser,int qry)
        {
            string sql = String.Format($@"EXEC {storedProcedure} @activityType='{act}', @fieldCode='{code}', @fieldTag={tag}, @recuser='{recuser}', @QueryType={qry}");
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }
        public DataTable getLoadedFieldsRefresh(string docno)
        {
            string sql = String.Format($@"EXEC {storedProcedure} @docno='{docno}', @QueryType=25");
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }
        public bool isForRevision(string docno)
        {
            string sql = string.Format($@"EXEC {storedProcedure} @docno='{docno}', @QueryType=20");
            return Parser.ParseBool(SFObjects.returnText(sql, _ConnectionString));
        }
        public bool isDuplicateRefno(string docno, string vendor, string refno, string act)
        {
            string sql = string.Format($@"EXEC {storedProcedure} @docno='{docno}', @vendor='{vendor}', @refNo='{refno}', @tranType='{act}', @QueryType=28");
            return Parser.ParseBool(SFObjects.returnText(sql, _ConnectionString));
        }
        public string getBasePercent(string docno, string trantype)
        {
            string sql = string.Format($@"EXEC {storedProcedure} @docno='{docno}', @tranType='{trantype}', @QueryType=29");
            return SFObjects.returnText(sql, _ConnectionString);
        }
        public string getPercent(string docno, string trantype)
        {
            string sql = string.Format($@"EXEC {storedProcedure} @refDocno='{docno}', @tranType='{trantype}', @QueryType=30");
            return SFObjects.returnText(sql, _ConnectionString);
        }
        public string getPercentRet(string docno, string trantype)
        {
            string sql = string.Format($@"EXEC {storedProcedure} @docno='{docno}', @tranType='{trantype}', @QueryType=31");
            return SFObjects.returnText(sql, _ConnectionString);
        }
        public string isLevel1(string docno)
        {
            string sql = string.Format($@"EXEC {storedProcedure} @docno='{docno}', @QueryType=33");

            return SFObjects.returnText(sql, _ConnectionString);
        }
    }
}