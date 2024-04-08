using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;

namespace DALComponent
{
    public class DCViewAttachmentDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        #region STANDARD

        public string MenuItemCode = "DCViewAttachment"; // This is default parameter  for version
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
        private string _ConnectionString;
        private string _ConnectionString2;
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "ID",                                       //--column for searching
                                inquireQry = "", //--query of inquire button
                                listingQry = "EXEC [RE].[nsp_InventoryCapacityAssign] @QueryType = 6"; //--query of export and print

        private string focusRecordPK = "";
        //#FOR EXPORT
        public string LISTINGFILENAME = "Mortuary",
                      GETCOMPANY = "select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END

       


        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator

        public DCViewAttachmentDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }
        
        
        public DataTable LoadSchema()
        {
            return SFObjects.LoadDataTable("EXEC [FR].[nsp_monthEndClosing] @QueryType=7", _ConnectionString);
        }

        public DataTable LoadSchemaSrc()
        {
            return SFObjects.LoadDataTable("SELECT * FROM DC.RequirementComplianceH WHERE 1<>1", _ConnectionString);
        }
        public DataTable LoadSchemaSup()
        {
            return SFObjects.LoadDataTable("SELECT * FROM DC.RequirementComplianceL WHERE 1<>1", _ConnectionString);
        }

        public string LISTINGQUERY()
        {
            return string.Format(@"EXEC [CS].[nsp_Mortuary] @QueryType = 5");
        }

        public string GetData()
        {
            string a = string.Format(@"SELECT 1 [ID]");
            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/
            return a;
        }

        public string inquireQuery()
        {
            return string.Format(@"EXEC [CS].[nsp_Mortuary] @QueryType = 4");
        }
        private SqlTransaction sqlTrn;
        private SqlConnection sqlConn = new SqlConnection();

        public string SaveData(DataTable dtSource, DataTable dtSupp, string recuser, bool IsNewRow, bool isSave, string msg)
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();                

                SqlCommand cmd = new SqlCommand();              

                foreach (DataRow dSrc in dtSource.Rows)
                {
                    cmd = new SqlCommand();
                    cmd.Connection = sqlConn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = sqlTrn; // Need to specify for every command
                    cmd.Parameters.Clear();
                    cmd.CommandText = "[DC].[nsp_RequirementComplianceH]";
                    cmd.Parameters.AddWithValue("@docno", dSrc["docno"]);
                    cmd.Parameters.AddWithValue("@valueDate", dSrc["valueDate"]);
                    cmd.Parameters.AddWithValue("@status", dSrc["status"]);
                    cmd.Parameters.AddWithValue("@tranType", dSrc["tranType"]);
                    cmd.Parameters.AddWithValue("@srcforReqCompUpd", dSrc["srcforReqCompUpd"]);
                    cmd.Parameters.AddWithValue("@srcRemarksForUpdating", dSrc["srcRemarksForUpdating"]);
                    cmd.Parameters.AddWithValue("@srcReturnToCode", dSrc["srcReturnToCode"]);
                    cmd.Parameters.AddWithValue("@recuser", dSrc["recuser"]);
                    cmd.Parameters.AddWithValue("@moduser", dSrc["moduser"]);
                    cmd.Parameters.AddWithValue("@isSave", isSave);
                    cmd.Parameters.AddWithValue("@QueryType", 1);
                    cmd.ExecuteNonQuery();
                }

                foreach (DataRow dSp in dtSupp.Rows)
                {
                    cmd = new SqlCommand();
                    cmd.Connection = sqlConn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = sqlTrn; // Need to specify for every command
                    cmd.Parameters.Clear();
                    cmd.CommandText = "[DC].[nsp_RequirementComplianceL]";
                    cmd.Parameters.AddWithValue("@docno", dSp["docno"].ToString());
                    cmd.Parameters.AddWithValue("@lineID", dSp["lineID"].ToString());
                    cmd.Parameters.AddWithValue("@rowno", dSp["rowno"]);
                    cmd.Parameters.AddWithValue("@status", dSp["status"]);
                    cmd.Parameters.AddWithValue("@docDtl", dSp["docDtl"]);
                    cmd.Parameters.AddWithValue("@documentNo", dSp["documentNo"]);
                    cmd.Parameters.AddWithValue("@documentDate", dSp["documentDate"]);
                    cmd.Parameters.AddWithValue("@expiryDate", dSp["expiryDate"]);
                    cmd.Parameters.AddWithValue("@url", dSp["url"]);
                    cmd.Parameters.AddWithValue("@return", dSp["return"]);
                    cmd.Parameters.AddWithValue("@tranType", dSp["tranType"]);
                    cmd.Parameters.AddWithValue("@workIns", dSp["workIns"]);
                    cmd.Parameters.AddWithValue("@remarksForReturn", dSp["remarksForReturn"]);
                    cmd.Parameters.AddWithValue("@returnToCode", dSp["returnToCode"]);
                    cmd.Parameters.AddWithValue("@recuser", dSp["recuser"]);
                    cmd.Parameters.AddWithValue("@lineidSetup", dSp["lineidSetup"]);
                    cmd.Parameters.AddWithValue("@itemGroupType", dSp["itemGroupType"]);
                    cmd.Parameters.AddWithValue("@rcRowno", dSp["rcRowno"]);
                    cmd.Parameters.AddWithValue("@rcRow", dSp["rcRow"]);
                    cmd.Parameters.AddWithValue("@isSave", isSave);
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
                    result = String.Format("System Cannot Save Data.\nDuplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("System Cannot perform action.\nData currently in use.", sqlEx.Number);
                else
                    result = String.Format("{1}", sqlEx.Number, sqlEx.Message);
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
            return msg;
        }
        public string DeleteData(String ID)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[CS].[nsp_Mortuary]";
            cmd.Parameters.AddWithValue("@Code", ID);            
            cmd.Parameters.AddWithValue("@QueryType", 3);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public DataTable getSourceDocData(string docno)
        {
            string sql = string.Format($@"EXEC [DC].[nsp_RequirementComplianceH]  @docno='{docno}', @QueryType=0");

            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public DataTable getSuppDocData(string docno)
        {
            string sql = string.Format($@"EXEC [PRT].[nsp_DCRequirementComplianceL] @docno='{docno}', @QueryType=0");

            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

 

    
     
        public string ServerLink()
        {
            return SFObjects.returnText($"SELECT Value FROM dbo.SystemConfig WHERE Code = 'Server_Link'", _ConnectionString);
        }

  
        public string getRetCodeSource()
        {
            return string.Format(@"EXEC [DC].[nsp_RequirementComplianceH] @QueryType=20");
        }
        public string getRetCodeSupp()
        {
            return string.Format(@"EXEC [DC].[nsp_RequirementComplianceL] @QueryType=20");
        }

        public string getDocuWriterLink()
        {
            return SFObjects.returnText(string.Format(@"SELECT TOP 1 value FROM dbo.SystemConfig WHERE code ='DocuWriter_Link'"), _ConnectionString);
        }


        public bool isValidate(string docno)
        {
            string sql = string.Format($@"SELECT DC.fn_valReviewAttach('{docno}')");
            return Parser.ParseBool(SFObjects.returnText(sql, _ConnectionString));
        }

    }
}