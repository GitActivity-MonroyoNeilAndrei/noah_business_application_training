using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;

namespace DALComponent
{
    public class DCRequirementComplianceDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects(); /// should be added
        #region STANDARD

        public string MenuItemCode = "DCRequirementCompliance"; // This is default parameter  for version
        public string MenuItemVersion = "10.0.0.1"; // This is default parameter for version
        public string UpdateVersion(string _MenuItemCode, string _MenuItemVersion)
        {
            if (_MenuItemCode.Trim() != "") MenuItemCode = _MenuItemCode;
            if (_MenuItemVersion.Trim() != "") MenuItemVersion = _MenuItemVersion;
            return UpdateVersion();
        }

        public string UpdateVersion()
        {
            #region do not delete Version Updating
            string StrMessage = SFObjects.returnText(

                string.Format(@"
                              declare @MenuCode as nvarchar(max);
                              declare @Version as nvarchar(max);

                              set @MenuCode= '{0}';
                              set @Version = '{1}';

                              Update [FPTI_NW].[noahweb_menudtLIN.Rows[row]_Info]
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
                                primaryKey = "TransactionNo"; //--query of export and print


        //#FOR EXPORT
        public string LISTINGFILENAME = "Requirement Compliance",
             GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END
        //--default start row
        public string CurrentSelectedItem;

        private string tableNameLin = "DC.RequirementCompliance";
        private string storedProcedure = "[DC].[nsp_RequirementCompliance]";
        
        public DCRequirementComplianceDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;

            this.CurrentSelectedItem = selectedItem;
        }


        public string DocDTLhdr(string dcList)
        {
            return string.Format($@"EXEC {storedProcedure} @docDtlList='{dcList}', @QueryType=5");
        }


        public DataTable GetLinData(string Code,string Trantype, string ItemG, string LineID, string rownum, string details, string docDtls, string dept, string ordertype)
        {
            string sql = String.Format(@"EXEC {0} @DocNo = '" + Code + "' , @Trantype = '" + Trantype + "', @ItemGroupType = '" + ItemG + "',@LineID = '" + LineID + "',@Rowno = '" + rownum + "',@details = '" + details + "', @docDtlList = '" + docDtls + "', @dept='" + dept + "', @orderType='" + ordertype + "', @QueryType = 0", storedProcedure);
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public DataTable _tempGetReqCommHDR(string TranType, string ItemG, string dept, string ordertype)
        {
            string sql = String.Format(@"EXEC {0} @Trantype='{1}' , @ItemGroupType='{2}', @dept='{3}', @orderType='{4}', @QueryType=4", storedProcedure, TranType, ItemG, dept, ordertype);
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public DataTable LoadSchemaLIN()
        {
            return SFObjects.LoadDataTable(string.Format("SELECT * FROM {0} WHERE 1<>1", tableNameLin), _ConnectionString);
        }


        public string SaveData(DataTable dtLIN, bool IsNewRow, int LineID, int Rownum,string details, string recuser, string itemgroup)
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
                cmd.Parameters.AddWithValue("@QueryType", 3);
                cmd.Parameters.AddWithValue("@DocNo", dtLIN.Rows[0]["docno"]);
                cmd.Parameters.AddWithValue("@Trantype", dtLIN.Rows[0]["tranType"]);
                cmd.Parameters.AddWithValue("@LineID", LineID);
                cmd.Parameters.AddWithValue("@details", details);
                cmd.Parameters.AddWithValue("@Rowno", Rownum);
                cmd.ExecuteNonQuery();
                
                int row = 0;
                foreach (DataRow items in dtLIN.Rows)
                {
                    row++;
                    cmd.Parameters.Clear();
                    cmd.CommandText = storedProcedure;
                    cmd.Parameters.AddWithValue("@DocNo", items["docno"].ToString());
                    cmd.Parameters.AddWithValue("@Complied", items["complied"].ToString());
                    cmd.Parameters.AddWithValue("@Required", items["required"].ToString());
                    cmd.Parameters.AddWithValue("@workInstructions", items["workInstructions"].ToString());
                    cmd.Parameters.AddWithValue("@DocDetail", items["docDetail"].ToString());
                    cmd.Parameters.AddWithValue("@DocumentNo", items["documentNo"].ToString()); 

                    if (items["documentDate"].ToString() != string.Empty)
                        cmd.Parameters.AddWithValue("@DocumentDate", items["documentDate"].ToString());
                    if (items["expiryDate"].ToString() != string.Empty)
                        cmd.Parameters.AddWithValue("@ExpiryDate", items["expiryDate"].ToString());

                    cmd.Parameters.AddWithValue("@Url", items["url"].ToString());
                    cmd.Parameters.AddWithValue("@Filebin", items["filebin"].ToString());
                    cmd.Parameters.AddWithValue("@Trantype", items["tranType"].ToString());              
                    cmd.Parameters.AddWithValue("@alternative", items["alternative"].ToString());
                    cmd.Parameters.AddWithValue("@docGrp", items["docGrp"].ToString());
                    cmd.Parameters.AddWithValue("@isSetup", items["isSetup"].ToString());
                    cmd.Parameters.AddWithValue("@lineidSetup", items["lineidSetup"].ToString());
                    cmd.Parameters.AddWithValue("@tagDocno", items["tagDocno"].ToString());
                    cmd.Parameters.AddWithValue("@tagDocdate", items["tagDocdate"].ToString());
                    cmd.Parameters.AddWithValue("@tagExpdate", items["tagExpdate"].ToString());
                    cmd.Parameters.AddWithValue("@tagURL", items["tagURL"].ToString());
                    cmd.Parameters.AddWithValue("@tagAttach", items["tagAttach"].ToString());
                    cmd.Parameters.AddWithValue("@noOfDocsReq", items["noOfDocsReq"].ToString());
                    cmd.Parameters.AddWithValue("@LineID", LineID);
                    cmd.Parameters.AddWithValue("@Rowno", Rownum);
                    cmd.Parameters.AddWithValue("@row", row);
                    cmd.Parameters.AddWithValue("@dept", items["dept"].ToString());
                    cmd.Parameters.AddWithValue("@orderType", items["type"].ToString());
                    cmd.Parameters.AddWithValue("@Applyto", items["applyto"].ToString());
                    cmd.Parameters.AddWithValue("@details", items["Details"].ToString().Length > 0 ? items["Details"].ToString() : (Object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@forConAllLvls", items["forConAllLvls"].ToString());
                    cmd.Parameters.AddWithValue("@recuser", recuser);
                    cmd.Parameters.AddWithValue("@itemGroupType", itemgroup);
                    cmd.Parameters.AddWithValue("@QueryType", 1);
                    cmd.ExecuteNonQuery();
                }
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format(
                        "Error [{0}]: \nSystem Cannot Save Data.\nDuplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("Error [{0}]: \nSystem Cannot perform action.\nData currently in use.",
                        sqlEx.Number);
                else
                    result = String.Format("Error [{0}]: \n{1}", sqlEx.Number, sqlEx.Message);
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
            return "Saved successfully";
        }

        public string Serverlink()
        {
            return SFObjects.returnText(@"SELECT [Value] FROM [dbo].[SystemConfig] where [code]='Server_Link'", _ConnectionString);
        }

        public string IfData(string Trantype,string TranNo, string lineID)
        {
            string sql = string.Empty;
            sql = string.Format(@"SELECT 1 FROM DC.RequirementCompliance WHERE docno = '{0}'
	                              AND tranType = '{1}'
								  AND lineID = '{2}'
								  AND rowno = '{3}'", TranNo, Trantype, lineID, 0);
            return sql;
        }
        public string IfDataLine(string Trantype, string TranNo, string LineID, string Rownum)
        {
            string sql = string.Empty;
            sql = string.Format(@"SELECT 1 FROM DC.RequirementCompliance WHERE docno = '{0}'
	                              AND tranType = '{1}'
								  AND lineID = '{2}'
								  AND rowno = '{3}'", TranNo, Trantype,LineID , Rownum);
            return sql;
        }
        public string hasDataExists(string trantype, string docno, string lineid, string rowno)
        {
            string sql = string.Empty;
            sql = string.Format($@"EXEC {storedProcedure} @QueryType=9, @DocNo='{docno}', @Trantype='{trantype}', @LineID='{lineid}', @Rowno='{rowno}'");
            return sql;
        }
        public string getMBSize()
        {
            return SFObjects.returnText(@"SELECT Value FROM dbo.SystemConfig WHERE Code='FILE_SIZE'", _ConnectionString);
        }

        public bool isAllowDupeDocs()
        {
            string a = SFObjects.returnText(@"SELECT TOP 1 isExclude FROM DC.docControlExclude", _ConnectionString);
            return a == "0" ? true : false;
        }
    }
}