using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;

namespace DALComponent
{
    public class DemoDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        private SqlConnection sqlConn = new SqlConnection();
        private SqlTransaction sqlTrn;

        #region STANDARD

        public string MenuItemCode = "PMOOtherRequest"; // This is default parameter  for version
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

        private string _ConnectionString;
        private string _ConnectionString2;
        public readonly string errorString = "Error",                                                   //--do not change this line
                                primaryKey = "docno",                                                   //--column for searching
                                inquireQry = "",                                                        //--query of inquire button
                                listingQry = "EXEC [RE].[nsp_InventoryCapacityAssign] @QueryType = 6";  //--query of export and print

        private string focusRecordPK = "";

        #region FOR EXPORT
        public string LISTINGFILENAME = "Other Requests",
                      GETCOMPANY = "select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        #endregion

        public string CurrentSelectedItem;                                                               //-- selected item in binding navigator

        public string tableName = "[PMO].[OtherRequests]";
        public string tableNameLIN = "[PMO].[GatePassLIN]";
        public string spName = "[PMO].[nsp_OtherRequests]";
        public string spNameLin = "[PMO].[nsp_GatePassLIN]";

        private string storedProcedureName = "[PMO].[nsp_BasicInformation]";

        public string tableWorkPermit = "[PMO].[WorkPermit]";
        public string SPWorkPermit = "[PMO].[nsp_WorkPermit]";

        public string WRKPMT_WorkerTable = "[PMO].[WorkPermit_WorkersLIN]";
        public string WRKPMT_WorkerSP = "[PMO].[nsp_WorkPermit_WorkersLIN]";
        public string WRKPMT_ToolMatsTable = "[PMO].[WorkPermit_ToolsMatsLIN]";
        public string WRKPMT_ToolMatsSP = "[PMO].[nsp_WorkPermit_ToolsMatsLIN]";

        public DemoDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }
        
        public DataTable LoadSchema()
        {
            return SFObjects.LoadDataTable("SELECT * FROM " + tableName + " WHERE 1<>1", _ConnectionString);
        }

        public DataTable LoadSchemaWP()
        {
            return SFObjects.LoadDataTable("SELECT * FROM " + tableWorkPermit + " WHERE 1<>1", _ConnectionString);
        }

        public DataTable LoadSchemaWorkers()
        {
            return SFObjects.LoadDataTable("SELECT * FROM " + WRKPMT_WorkerTable + " WHERE 1<>1", _ConnectionString);
        }

        public DataTable LoadSchemaToolsMats()
        {
            return SFObjects.LoadDataTable("SELECT * FROM " + WRKPMT_ToolMatsTable + " WHERE 1<>1", _ConnectionString);
        }

        public DataTable GatePassLIN() //dataset na rin dapat itoD
        {
            return SFObjects.LoadDataTable("SELECT * FROM " + tableNameLIN + " WHERE 1<>1", _ConnectionString);
        }

        public DataSet GatePassLINset() //dataset na rin dapat itoD
        {
            return SFObjects.LoadDataSet("SELECT * FROM " + tableNameLIN + " WHERE 1<>1", _ConnectionString);
        }

        public string LISTINGQUERY()
        {
            return string.Format($@"EXEC {spName} @QueryType=5");
        }

        public string GetData(string docno)
        {
            //string a = string.Format($@"EXEC {spName} @QueryType=0, @docno={docno}");
            //focusRecordPK = string.Empty;
            //a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/
            //return a;

            string a = string.Format(@"EXEC " + spName + "@docno='" + docno + "', @QueryType = 0");

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            return a;
        }

        public DataTable GetUserName(string curusers)
        {
            string query1 = string.Format(@"EXEC " + storedProcedureName + " @Code = '" + curusers + "', @QueryType = 20");

            return SFObjects.LoadDataTable(query1, _ConnectionString);
        }

        public string inquireQuery(string recuser)
        {
            return string.Format($@"EXEC {spName} @recUser='{recuser}', @QueryType=4");
        }       

        public string SaveData(DataTable dtHDR, DataTable dtGate, bool IsNewRow)
        {
            string Docno;
            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();
                
                DataRow dr = dtHDR.Rows[0];

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = spName;
                cmd.Parameters.AddWithValue("@docno", dr["docno"].ToString());
                cmd.Parameters.AddWithValue("@docdate", dr["docdate"]);
                cmd.Parameters.AddWithValue("@trantype", dr["trantype"]);
                cmd.Parameters.AddWithValue("@locForm", dr["locForm"]);
                cmd.Parameters.AddWithValue("@accntNo", dr["accntNo"]);
                cmd.Parameters.AddWithValue("@unitNo", dr["unitNo"]);

                cmd.Parameters.AddWithValue("@deliveryGP", dr["deliveryGP"]);
                cmd.Parameters.AddWithValue("@deliverydateGP", dr["deliveryDateGP"]);
                cmd.Parameters.AddWithValue("@deliveryTimeGP", dr["deliveryTimeGP"]);
                cmd.Parameters.AddWithValue("@carrierGP", dr["carrierGP"]);
                cmd.Parameters.AddWithValue("@tenantMI", dr["tenantMI"]);
                cmd.Parameters.AddWithValue("@moveInDateMI", dr["moveInDateMI"]);
                cmd.Parameters.AddWithValue("@unitTypeMI", dr["unitTypeMI"]);
                cmd.Parameters.AddWithValue("@payAccMI", dr["payAccMI"]);
                cmd.Parameters.AddWithValue("@notarCopyMI", dr["notarCopyMI"]);
                cmd.Parameters.AddWithValue("@residentInfoMI", dr["residentInfoMI"]);
                cmd.Parameters.AddWithValue("@houseRulesMI", dr["houseRulesMI"]);
                cmd.Parameters.AddWithValue("@updatedInfoMI", dr["updatedInfoMI"]);
                cmd.Parameters.AddWithValue("@fireExtinMI", dr["fireExtinMI"]);
                cmd.Parameters.AddWithValue("@sprinklerMI", dr["sprinklerMI"]);
                cmd.Parameters.AddWithValue("@tenantIDMI", dr["tenantIDMI"]);
                cmd.Parameters.AddWithValue("@assocDuesMI", dr["assocDuesMI"]);
                cmd.Parameters.AddWithValue("@parkingDuesMI", dr["parkingDuesMI"]);
                cmd.Parameters.AddWithValue("@waterMI", dr["waterMI"]);
                cmd.Parameters.AddWithValue("@electMI", dr["electMI"]);
                cmd.Parameters.AddWithValue("@amenMI", dr["amenMI"]);
                cmd.Parameters.AddWithValue("@violationMI", dr["violationMI"]);
                cmd.Parameters.AddWithValue("@workPermitMI", dr["workPermitMI"]);
                cmd.Parameters.AddWithValue("@amenitiesMI", dr["amenitiesMI"]);
                cmd.Parameters.AddWithValue("@concernSlipMI", dr["concernSlipMI"]);
                cmd.Parameters.AddWithValue("@gatePassIncMI", dr["gatePassIncMI"]);
                cmd.Parameters.AddWithValue("@tenantMO", dr["tenantMO"]);
                cmd.Parameters.AddWithValue("@moveOutDateMO", dr["moveOutDateMO"]);



                cmd.Parameters.AddWithValue("@remarks", dr["remarks"]);
                cmd.Parameters.AddWithValue("@Status", dr["Status"]);
                cmd.Parameters.AddWithValue("@recuser", dr["recuser"]);
                cmd.Parameters.AddWithValue("@QueryType", IsNewRow ? 1 : 2);  
                   
                if (IsNewRow)
                {
                    Docno = cmd.ExecuteScalar().ToString();
                }  
                else
                {
                    cmd.ExecuteNonQuery();
                    Docno = dr["docNo"].ToString();
                }

                if (dtGate.Rows.Count > 0)
                {
                    if (!IsNewRow) // CLEAR LIN DATA BEFORE UPDATING
                    {
                        cmd = new SqlCommand();
                        cmd.Connection = sqlConn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Transaction = sqlTrn;
                        cmd.Parameters.Clear();
                        cmd.CommandText = spNameLin;
                        cmd.Parameters.AddWithValue("@docno", Docno);
                        cmd.Parameters.AddWithValue("@QueryType", 3);
                        cmd.ExecuteNonQuery();
                    }

                    foreach (DataRow drLin in dtGate.Rows)
                    {
                        cmd = new SqlCommand();
                        cmd.Connection = sqlConn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Transaction = sqlTrn;
                        cmd.Parameters.Clear();
                        cmd.CommandText = spNameLin;
                        cmd.Parameters.AddWithValue("@docno", Docno);
                        cmd.Parameters.AddWithValue("@Item", drLin["Item"]);
                        cmd.Parameters.AddWithValue("@Quantity", drLin["Quantity"]);
                        cmd.Parameters.AddWithValue("@uom", drLin["UnitOfMeasurement"]);
                        cmd.Parameters.AddWithValue("@RemarksG", drLin["Remarks"]);
                        cmd.Parameters.AddWithValue("@Rowid", drLin["RowNum"]);
                        cmd.Parameters.AddWithValue("@QueryType", 1);
                        cmd.ExecuteNonQuery();
                    }

                }



            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Cannot be saved.\nDuplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("System Cannot perform action.\nData currently in use.", sqlEx.Number);
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

            DataTable tblDetails = UpdateFields(Docno);
            string tranDate = tblDetails.Rows[0]["recDate"].ToString().ToLower();
            string submitDate = tblDetails.Rows[0]["dateSubmit"].ToString().ToLower();
            string postDate = tblDetails.Rows[0]["postDate"].ToString().ToLower();
            string status = tblDetails.Rows[0]["status"].ToString().ToLower();

            string details = Docno + "|" + tranDate + "|" + submitDate + "|" + postDate + "|" + status;
            return "Your entry has been saved." + "|" + details;
        }

        public string SaveWorkPermitData(DataTable dtHDR, DataTable dtWorkPermit, DataTable dtWorkers, DataTable dtToolsMats, bool IsNewRow)
        {
            string Docno;
            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();
                
                DataRow dr = dtHDR.Rows[0];
                DataRow drWP = dtWorkPermit.Rows[0];

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = spName;
                cmd.Parameters.AddWithValue("@docno", dr["docno"].ToString());
                cmd.Parameters.AddWithValue("@docdate", dr["docdate"]);
                cmd.Parameters.AddWithValue("@trantype", dr["trantype"]);
                cmd.Parameters.AddWithValue("@locForm", dr["locForm"]);
                cmd.Parameters.AddWithValue("@accntNo", dr["accntNo"]);
                cmd.Parameters.AddWithValue("@unitNo", dr["unitNo"]);

                cmd.Parameters.AddWithValue("@deliveryGP", dr["deliveryGP"]);
                cmd.Parameters.AddWithValue("@deliverydateGP", dr["deliveryDateGP"]);
                cmd.Parameters.AddWithValue("@deliveryTimeGP", dr["deliveryTimeGP"]);
                cmd.Parameters.AddWithValue("@carrierGP", dr["carrierGP"]);
                cmd.Parameters.AddWithValue("@tenantMI", dr["tenantMI"]);
                cmd.Parameters.AddWithValue("@moveInDateMI", dr["moveInDateMI"]);
                cmd.Parameters.AddWithValue("@unitTypeMI", dr["unitTypeMI"]);
                cmd.Parameters.AddWithValue("@payAccMI", dr["payAccMI"]);
                cmd.Parameters.AddWithValue("@notarCopyMI", dr["notarCopyMI"]);
                cmd.Parameters.AddWithValue("@residentInfoMI", dr["residentInfoMI"]);
                cmd.Parameters.AddWithValue("@houseRulesMI", dr["houseRulesMI"]);
                cmd.Parameters.AddWithValue("@updatedInfoMI", dr["updatedInfoMI"]);
                cmd.Parameters.AddWithValue("@fireExtinMI", dr["fireExtinMI"]);
                cmd.Parameters.AddWithValue("@sprinklerMI", dr["sprinklerMI"]);
                cmd.Parameters.AddWithValue("@tenantIDMI", dr["tenantIDMI"]);
                cmd.Parameters.AddWithValue("@assocDuesMI", dr["assocDuesMI"]);
                cmd.Parameters.AddWithValue("@parkingDuesMI", dr["parkingDuesMI"]);
                cmd.Parameters.AddWithValue("@waterMI", dr["waterMI"]);
                cmd.Parameters.AddWithValue("@electMI", dr["electMI"]);
                cmd.Parameters.AddWithValue("@amenMI", dr["amenMI"]);
                cmd.Parameters.AddWithValue("@violationMI", dr["violationMI"]);
                cmd.Parameters.AddWithValue("@workPermitMI", dr["workPermitMI"]);
                cmd.Parameters.AddWithValue("@amenitiesMI", dr["amenitiesMI"]);
                cmd.Parameters.AddWithValue("@concernSlipMI", dr["concernSlipMI"]);
                cmd.Parameters.AddWithValue("@gatePassIncMI", dr["gatePassIncMI"]);
                cmd.Parameters.AddWithValue("@tenantMO", dr["tenantMO"]);
                cmd.Parameters.AddWithValue("@moveOutDateMO", dr["moveOutDateMO"]);

                cmd.Parameters.AddWithValue("@remarks", dr["remarks"]);
                cmd.Parameters.AddWithValue("@Status", dr["Status"]);
                cmd.Parameters.AddWithValue("@recuser", dr["recuser"]);
                cmd.Parameters.AddWithValue("@QueryType", IsNewRow ? 1 : 2);

                if (IsNewRow)
                {
                    Docno = cmd.ExecuteScalar().ToString();
                }
                else
                {
                    cmd.ExecuteNonQuery();
                    Docno = dr["docNo"].ToString();
                }

                {
                    cmd.Connection = sqlConn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = sqlTrn; // Need to specify for every command
                    cmd.Parameters.Clear();
                    cmd.CommandText = SPWorkPermit;

                    cmd.Parameters.AddWithValue("@docno", Docno);
                    cmd.Parameters.AddWithValue("@residentName", drWP["residentName"].ToString());
                    cmd.Parameters.AddWithValue("@unitNo", drWP["unitNo"]);
                    cmd.Parameters.AddWithValue("@unitFloor", drWP["unitFloor"]);
                    cmd.Parameters.AddWithValue("@personInCharge", drWP["personInCharge"]);
                    cmd.Parameters.AddWithValue("@telNumber", drWP["telNumber"]);
                    //cmd.Parameters.AddWithValue("@permitDate", drWP["permitDate"]);

                    cmd.Parameters.AddWithValue("@natWork", drWP["natWork"]);
                    cmd.Parameters.AddWithValue("@natOthersDesc", drWP["natOthersDesc"]);

                    cmd.Parameters.AddWithValue("@schedStartDate", drWP["schedStartDate"]);
                    cmd.Parameters.AddWithValue("@schedEndDate", drWP["schedEndDate"]);
                    cmd.Parameters.AddWithValue("@schedStartTime", drWP["schedStartTime"]);
                    cmd.Parameters.AddWithValue("@schedEndTime", drWP["schedEndTime"]);
                    cmd.Parameters.AddWithValue("@schedWorkDesc", drWP["schedWorkDesc"]);

                    cmd.Parameters.AddWithValue("@requestedBy", drWP["requestedBy"]);
                    cmd.Parameters.AddWithValue("@endorsedBy", drWP["endorsedBy"]);
                    cmd.Parameters.AddWithValue("@notedBy", drWP["notedBy"]);
                    cmd.Parameters.AddWithValue("@approvedBy", drWP["approvedBy"]);

                    cmd.Parameters.AddWithValue("@QueryType", IsNewRow ? 1 : 2);
                    cmd.ExecuteNonQuery();
                }


                if (dtWorkers.Rows.Count > 0)
                {
                    //Clean LIN Details with the same Docno before inserting updated records
                    if (!IsNewRow)
                    {
                        cmd = new SqlCommand();
                        cmd.Connection = sqlConn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Transaction = sqlTrn;
                        cmd.Parameters.Clear();
                        cmd.CommandText = WRKPMT_WorkerSP;
                        cmd.Parameters.AddWithValue("@docno", Docno);
                        cmd.Parameters.AddWithValue("@QueryType", 3);
                        cmd.ExecuteNonQuery();
                    }
                    

                    foreach (DataRow drLin in dtWorkers.Rows)
                    {
                        cmd = new SqlCommand();
                        cmd.Connection = sqlConn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Transaction = sqlTrn;
                        cmd.Parameters.Clear();
                        cmd.CommandText = WRKPMT_WorkerSP;
                        cmd.Parameters.AddWithValue("@docno", Docno);
                        cmd.Parameters.AddWithValue("@name", drLin["Name"]);
                        cmd.Parameters.AddWithValue("@company", drLin["Company"]);
                        cmd.Parameters.AddWithValue("@designation", drLin["Designation"]);
                        cmd.Parameters.AddWithValue("@rownum", drLin["rowNum"]);
                        cmd.Parameters.AddWithValue("@QueryType", 1);
                        cmd.ExecuteNonQuery();
                    }

                }

                if (dtToolsMats.Rows.Count > 0)
                {
                    
                    if (!IsNewRow)
                    {
                        //Clean LIN Details with the same Docno before inserting updated records
                        cmd = new SqlCommand();
                        cmd.Connection = sqlConn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Transaction = sqlTrn;
                        cmd.Parameters.Clear();
                        cmd.CommandText = WRKPMT_ToolMatsSP;
                        cmd.Parameters.AddWithValue("@docno", Docno);
                        cmd.Parameters.AddWithValue("@QueryType", 3 );
                        cmd.ExecuteNonQuery();
                    }
                    

                    foreach (DataRow drLin in dtToolsMats.Rows)
                    {
                        cmd = new SqlCommand();
                        cmd.Connection = sqlConn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Transaction = sqlTrn;
                        cmd.Parameters.Clear();
                        cmd.CommandText = WRKPMT_ToolMatsSP;
                        cmd.Parameters.AddWithValue("@docno", Docno);
                        cmd.Parameters.AddWithValue("@quantity", drLin["Quantity"]);
                        cmd.Parameters.AddWithValue("@description", drLin["Description"]);
                        cmd.Parameters.AddWithValue("@rownum", drLin["rowNum"]);
                        cmd.Parameters.AddWithValue("@uom", drLin["UnitOfMeasurement"]);
                        cmd.Parameters.AddWithValue("@QueryType", 1);
                        cmd.ExecuteNonQuery();
                    }

                }



            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Cannot be saved.\nDuplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("System Cannot perform action.\nData currently in use.", sqlEx.Number);
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

            DataTable tblDetails = UpdateFields(Docno);
            string tranDate = tblDetails.Rows[0]["recDate"].ToString().ToLower();
            string submitDate = tblDetails.Rows[0]["dateSubmit"].ToString().ToLower();
            string postDate = tblDetails.Rows[0]["postDate"].ToString().ToLower();
            string status = tblDetails.Rows[0]["status"].ToString().ToLower();

            string details = Docno + "|" + tranDate + "|" + submitDate + "|" + postDate + "|" + status;
            return "Your entry has been saved." + "|" + details;
        }

        public DataTable UpdateFields(string docno)
        {
            string query = string.Format(@"EXEC " + SPWorkPermit + " @docno='" + docno + "', @QueryType = 4");
            return SFObjects.LoadDataTable(query, _ConnectionString);
        }

        public DataTable GetRequestData(string docno)
        {
            return SFObjects.LoadDataTable($"EXEC {spName} @docno='{docno}', @QueryType = 200", _ConnectionString);
        }

        public DataTable GetRequestDataLIN(string docno)
        {
            return SFObjects.LoadDataTable($"EXEC {spNameLin} @docno='{docno}', @QueryType = 0", _ConnectionString);
        }

        public String GetTranDesc(string trantype)
        {
            return SFObjects.returnText($"EXEC {spName} @trantype='{trantype}', @QueryType = 201", _ConnectionString);
        }

        public String GetTranStatus(string docno)
        {
            return SFObjects.returnText($"EXEC {spName} @docno='{docno}', @QueryType = 202", _ConnectionString);
        }

        public DataTable GetWorkPermitData(string docno)
        {
            return SFObjects.LoadDataTable($"EXEC {SPWorkPermit} @docno='{docno}', @QueryType = 0", _ConnectionString);
        }

        public DataTable GetWorkPermitWorkersLIN(string docno)
        {
            return SFObjects.LoadDataTable($"EXEC {WRKPMT_WorkerSP} @docno='{docno}', @QueryType = 0", _ConnectionString);
        }

        public DataTable GetWorkPermitMaterialsLIN(string docno)
        {
            return SFObjects.LoadDataTable($"EXEC {WRKPMT_ToolMatsSP} @docno='{docno}', @QueryType = 0", _ConnectionString);
        }

        public String CancelTransaction(string docno, string user)
        {
            string result = "";
            try
            {
                result = SFObjects.returnText($"EXEC {spName} @docno='{docno}', @recuser='{user}', @QueryType = 301", _ConnectionString);
                result = "SAVED";
            } catch (Exception e)
            {
                result = e.ToString();
            }
            return result;
        }

        public string DeleteData(String ID, String User)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = spName;
            cmd.Parameters.AddWithValue("@docno", ID);
            cmd.Parameters.AddWithValue("@recuser", User);
            cmd.Parameters.AddWithValue("@QueryType", 3);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public string Process(string docno, string tranType)
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Connection = sqlConn;
                cmd.Transaction = sqlTrn;
                cmd.CommandText = spName;
                cmd.Parameters.Clear();
                
                cmd.Parameters.AddWithValue("@docno", docno);
                cmd.Parameters.AddWithValue("@trantype", tranType);
                cmd.Parameters.AddWithValue("@QueryType", 7);
                cmd.ExecuteNonQuery();
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Cannot be saved.\nDuplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("System Cannot perform action.\nData currently in use.", sqlEx.Number);
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

            DataTable tblDetails = UpdateFields(docno);
            string tranDate = tblDetails.Rows[0]["recDate"].ToString().ToLower();
            string submitDate = tblDetails.Rows[0]["dateSubmit"].ToString().ToLower();
            string postDate = tblDetails.Rows[0]["postDate"].ToString().ToLower();
            string status = tblDetails.Rows[0]["status"].ToString().ToLower();

            string details = docno + "|" + tranDate + "|" + submitDate + "|" + postDate + "|" + status;
            return "Record Saved Successfully" + "|" + details;

        }

        public DataTable getcmbTran()
        {
            string sql = string.Format($@"EXEC {spName} @QueryType=10");
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public DataTable getcmbDeliver()
        {
            string sql = string.Format($@"EXEC {spName} @QueryType=11");
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public DataTable getUnitType()
        {
            string sql = string.Format($@"EXEC {spName} @QueryType=12");
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public DataTable getNatureWork()
        {
            string sql = string.Format($@"EXEC {SPWorkPermit} @QueryType=5");
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }
        public DataTable GetAddonTab(string docno)
        {
            return SFObjects.LoadDataTable($"EXEC {spNameLin} @QueryType=0, @docno='{docno}'", _ConnectionString);
        }

        public DataTable GetWorkersLin(string docno)
        {
            return SFObjects.LoadDataTable($"EXEC {WRKPMT_WorkerSP} @QueryType=0, @docno='{docno}'", _ConnectionString);
        }

        public DataTable GetMatsLin(string docno)
        {
            return SFObjects.LoadDataTable($"EXEC {WRKPMT_ToolMatsSP} @QueryType=0, @docno='{docno}'", _ConnectionString);
        }
        public DataTable GetDefLoaded(string accnO)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = spName;
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@accntNo", accnO);
            cmd.Parameters.AddWithValue("@QueryType", 13);

            return base.ExecGetData(cmd, _ConnectionString);
        }

        public DataTable GetUnitData(string accnO)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = spName;
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@accntNo", accnO);
            cmd.Parameters.AddWithValue("@QueryType", 210);

            return base.ExecGetData(cmd, _ConnectionString);
        }

        public DataTable GetDefLoadedX(string req)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = spName;
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@request", req);
            cmd.Parameters.AddWithValue("@QueryType", 14);

            return base.ExecGetData(cmd, _ConnectionString);
        }


        public DataTable GetFromAmt(string amt, string vat, string cwt)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = spName;
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@amt", amt);
            cmd.Parameters.AddWithValue("@vatcode", vat);
            cmd.Parameters.AddWithValue("@ewtcode", cwt);
            cmd.Parameters.AddWithValue("@QueryType", 15);

            return base.ExecGetData(cmd, _ConnectionString);
        }

        public string getTrantypeForBind(string docno)
        {
            return SFObjects.returnText($"EXEC PMO.nsp_OtherRequests  @docno='{docno}', @QueryType = 16", _ConnectionString);
        }

        public string getRequestForBind(string docno)
        {
            return SFObjects.returnText($"EXEC PMO.nsp_RequestEntry  @docno='{docno}', @QueryType = 17", _ConnectionString);
        }

        public string hasSavedRqrdCompli(string docno)
        {
            return SFObjects.returnText($@"SELECT [DC].[fn_ChkIfHasReqComplianceAll]('{docno}')", _ConnectionString);
        }

        public string getuser(string token)
        {
            return SFObjects.returnText($"select recuser from fpti_nw.APIAuth where tokenkey = '{token}'", _ConnectionString2);
        }

    }
}