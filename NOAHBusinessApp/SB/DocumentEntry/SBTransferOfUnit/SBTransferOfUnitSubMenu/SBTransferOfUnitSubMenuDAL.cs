using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;

namespace DALComponent
{
    public class SBTransferOfUnitSubMenuDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        #region STANDARD

        public string MenuItemCode = "SBTransferOfUnitSubMenu"; // This is default parameter  for version
        public string MenuItemVersion = "9.0.0.0"; // This is default parameter for version
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
        public string LISTINGFILENAME = "Transfer Of Unit", GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END


        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator
        private string transtypecode = "";
        private SqlConnection conn = new SqlConnection();
        private SqlTransaction tran;


        public SBTransferOfUnitSubMenuDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }

        public string GetData()
        {
            string a = string.Format(@"SELECT * FROM[RE].[SBTransferOfUnitHDR]");

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            return a;
        }

        public DataTable LoadSchema()
        {
            return SFObjects.LoadDataTable("SELECT * FROM [RE].[SBTransferOfUnitHDR] WHERE 1<>1", _ConnectionString);
        }

        public string RowCounter()
        {
            return SFObjects.returnText("SELECT COUNT(*) FROM [RE].[SBTransferOfUnitHDR]", _ConnectionString);
        }

        public string SaveData(DataTable dtHDR, bool IsNewRow, string Trantype)
        {
            try
            {
                conn.ConnectionString = _ConnectionString;
                conn.Open();
                tran = conn.BeginTransaction();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = conn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = tran; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = "[PRT].[nsp_SBTransferOfUnit]";
                cmd.Parameters.AddWithValue("@locform", dtHDR.Rows[0]["locform"].ToString());
                cmd.Parameters.AddWithValue("@reasonfortransunit", dtHDR.Rows[0]["reasonfortransunit"].ToString());
                cmd.Parameters.AddWithValue("@newunit", dtHDR.Rows[0]["newunit"].ToString());
                cmd.Parameters.AddWithValue("@refholdtrans", dtHDR.Rows[0]["refholdtrans"].ToString());
                cmd.Parameters.AddWithValue("@remarks", dtHDR.Rows[0]["remarks"].ToString());
                cmd.Parameters.AddWithValue("@docno", dtHDR.Rows[0]["docno"].ToString());
                cmd.Parameters.AddWithValue("@docstatus", dtHDR.Rows[0]["docstatus"].ToString());
                cmd.Parameters.AddWithValue("@docdate", dtHDR.Rows[0]["docdate"].ToString());
                cmd.Parameters.AddWithValue("@reasonfordisapproval", dtHDR.Rows[0]["reasonfordisapproval"].ToString());
                cmd.Parameters.AddWithValue("@remarksfordisapproval", dtHDR.Rows[0]["remarksfordisapproval"].ToString());
                cmd.Parameters.AddWithValue("@Recuser", dtHDR.Rows[0]["Recuser"].ToString());
                cmd.Parameters.AddWithValue("@Moduser", dtHDR.Rows[0]["Moduser"].ToString());
                cmd.Parameters.AddWithValue("@QueryType", IsNewRow ? 30 : 31);
                cmd.ExecuteNonQuery();
                //Query 1 for INSERT Data
                //Query 2 for UPDATE Data
            }
            catch (SqlException sqlEx)
            {
                tran.Rollback();
                conn.Close();
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
                tran.Rollback();
                conn.Close();
                return String.Format("Error: {0}\n", ex.Message);
            }

            tran.Commit();
            conn.Close();
            return "Process has successfully completed.";
        }

        public string ProcessData(DataTable dt, string user)
        {
            try
            {
                conn = new SqlConnection(_ConnectionString);
                conn.Open();
                tran = conn.BeginTransaction();
                SqlCommand cmd = new SqlCommand();

                //foreach (DataRow row in dt.Rows)
                //{
                //    cmd = new SqlCommand();
                //    cmd.Connection = conn;
                //    cmd.CommandType = CommandType.StoredProcedure;
                //    cmd.Transaction = tran;
                //    cmd.Parameters.Clear();
                //    cmd.CommandText = "[PRT].[nsp_SBTransferOfUnit]";
                //    cmd.Parameters.AddWithValue("@CustomerCode", row["CustomerCode"]);
                //    cmd.Parameters.AddWithValue("@Reason", row["Reason"]);
                //    cmd.Parameters.AddWithValue("@DocStatus", row["Status"]);
                //    cmd.Parameters.AddWithValue("@RecUser", user);
                //    cmd.Parameters.AddWithValue("@ModUser", user);
                //    cmd.Parameters.AddWithValue("@QueryType", 1);
                //    cmd.ExecuteNonQuery();
                //}
            }
            catch (SqlException sqlEx)
            {
                tran.Rollback();
                conn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Error [{0}]: \nSystem Cannot Process Data.\nDuplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("Error [{0}]: \nSystem Cannot perform action.\nData currently in use.", sqlEx.Number);
                else
                    result = String.Format("Error [{0}]: \n{1}", sqlEx.Number, sqlEx.Message);
                return result;
            }
            catch (Exception ex)
            {
                tran.Rollback();
                conn.Close();
                return String.Format("Error: {0}\n", ex.Message);
            }

            tran.Commit();
            conn.Close();

            return "Process has successfully completed.";
        }

        public System.Data.DataTable GetDataLIN(string project)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[PRT].[nsp_SBTransferOfUnit]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@project", project);
            cmd.Parameters.AddWithValue("@QueryType", 0);
            cmd.Parameters.AddWithValue("@tag", 0);

            return base.ExecGetData(cmd, _ConnectionString);

            string query = string.Format($@"EXEC [PRT].[nsp_SBTransferOfUnit] @QueryType = 0, @tag=0, @project = '{project}'");

            return SFObjects.LoadDataTable(query, _ConnectionString);
        }

        public string LISTINGQUERY()
        {
            return string.Format(@"Select '' [Code]");
        }

        public string inquireQuery()
        {
            return string.Format($@"SELECT docno, refholdtrans FROM [RE].[SBTransferOfUnitHDR]");
        }

        //public string InquireCustomerList(string custClassList)
        //{
        //    return string.Format($@"Exec [PRT].[nsp_SBTransferOfUnitSubMenu_ENH] @QueryType = 20, @CustClassList='{custClassList}'");
        //}

        //public string InquireCustClassList(string customerList)
        //{
        //    return string.Format($@"Exec [PRT].[nsp_SBTransferOfUnitSubMenu_ENH] @QueryType = 21, @CustomerList='{customerList}'");
        //}

        public string getNoahDate()
        {
            return SFObjects.returnText("SELECT dbo.GetNoahDate()", _ConnectionString);
        }

        public string lugCustomer_aspx()
        {
            return string.Format($@"Exec [PRT].[nsp_SBTransferOfUnit] @QueryType = 20");
        }

        //public DataTable LoadSchema(string customerList, string custClassList)
        //{
        //    SqlCommand cmd = new SqlCommand();
        //    cmd.CommandText = "[PRT].[nsp_SBTransferOfUnitSubMenu_ENH]";
        //    cmd.Parameters.Clear();
        //    cmd.Parameters.AddWithValue("@CustomerList", customerList);
        //    cmd.Parameters.AddWithValue("@CustClassList", custClassList);
        //    cmd.Parameters.AddWithValue("@QueryType", 0);

        //    return base.ExecGetData(cmd, _ConnectionString);

        //    string query = string.Format($@"EXEC [PRT].[nsp_SBDeactivatedClientRegSummRpt_ENH] @QueryType = 0, 
        //                                                                              @CustomerList = '{customerList}',
        //                                                                              @CustClassList = '{custClassList}'");

        //    return SFObjects.LoadDataTable(query, _ConnectionString);

        //}

        public DataTable DiKoAlamSilbiNito()
        {
            return SFObjects.LoadDataTable(@"EXEC [PRT].[nsp_SBTransferOfUnit] @QueryType = 20", _ConnectionString);
        }

        public string lugLocAccForms()
        {
            return string.Format($@"Exec [PRT].[nsp_SBTransferOfUnit] @QueryType = 21");
        }

        public string lugReTranUnit()
        {
            return string.Format($@"Exec [PRT].[nsp_SBTransferOfUnit] @QueryType = 28");
        }
        public string lugNewUnit()
        {
            return string.Format($@"Exec [PRT].[nsp_SBTransferOfUnit] @QueryType = 25");
        }

        public string lugRefHoldTrans()
        {
            return string.Format($@"SELECT LocForm, TransactionNo FROM re.HoldingUnitEntryHDR");
        }

        public string txtDocDate()
        {
            return SFObjects.returnText(@"SELECT FORMAT(dbo.GetNoahDate() , 'MM/dd/yyyy')", _ConnectionString);
        }

        public string txtDocNo()
        {
            return SFObjects.returnText($@"Exec [PRT].[nsp_SBTransferOfUnit] @QueryType = 27", _ConnectionString);
        }

        public string txtDocStatus(String docstat)
        {
            //string data = string.Format($@"Exec [PRT].[nsp_SBTransferOfUnit] @QueryType = 29, @Status = '{docstat}'");

            //data = data.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            //return data;
            return SFObjects.returnText(@"SELECT Description FROM re.itemstatus where Code = " + docstat, _ConnectionString);
        }

        //public System.Data.DataTable txtDocStatus(string status)
        //{
        //    SqlCommand cmd = new SqlCommand();
        //    cmd.CommandText = "[PRT].[nsp_SBTransferOfUnit]";
        //    cmd.Parameters.Clear();
        //    cmd.Parameters.AddWithValue("@status", status);
        //    cmd.Parameters.AddWithValue("@QueryType", 29);

        //    return base.ExecGetData(cmd, _ConnectionString);

        //    string query = string.Format($@"EXEC [PRT].[nsp_SBTransferOfUnit] @QueryType = 29, @status = '{status}'");

        //    return SFObjects.LoadDataTable(query, _ConnectionString);
        //}

        public DataTable IfExist()
        {
            return SFObjects.LoadDataTable(@"EXEC [PRT].[nsp_SBTransferOfUnit] @QueryType = 24, @tag=1", _ConnectionString);
        }

    }
}