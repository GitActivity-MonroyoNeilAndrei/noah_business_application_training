using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;

namespace DALComponent
{
    public class BMSellerInformationButtonsDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        #region STANDARD

        public string MenuItemCode = "BMSellerInformationButtons"; // This is default parameter  for version
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

        public string ID = string.Empty;
        private string focusRecordPK;
        private string _ConnectionString;
        private string _ConnectionString2;
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "ID";                                      //--column for searching

        //#FOR EXPORT
        public string LISTINGFILENAME = "nwtitle",
                      GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END


        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator

        public BMSellerInformationButtonsDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }


        public DataTable LoadSchema(DataTable dtHDR, string nwTranType)
        {

            if (nwTranType == "MOCR")
            {
                dtHDR = SFObjects.LoadDataTable("SELECT * FROM RE.SellerModeofCommissionReleaseHDR WHERE 1 <> 1", _ConnectionString);
            }
            else if (nwTranType == "DOCD")
            {
                dtHDR = SFObjects.LoadDataTable("SELECT * FROM RE.SellerDocumentDetailsHDR WHERE 1 <> 1", _ConnectionString);
            }
            else if (nwTranType == "BAAC")
            {
                dtHDR = SFObjects.LoadDataTable("SELECT * FROM RE.SellerBankAccountDetailsHDR WHERE 1 <> 1", _ConnectionString);
            }
            else if (nwTranType == "ADAC")
            {
                dtHDR = SFObjects.LoadDataTable("SELECT * FROM RE.SellerAccountAsCustomerDetailsHDR WHERE 1 <> 1", _ConnectionString);
            }
            else if (nwTranType == "SETD")
            {
                dtHDR = SFObjects.LoadDataTable("SELECT * FROM RE.SellerSeminarTrainingsDetailsHDR WHERE 1 <> 1", _ConnectionString);
            }
            else if (nwTranType == "SELD")
            {
                dtHDR = SFObjects.LoadDataTable("SELECT * FROM RE.SellerRoleDetailsHDR WHERE 1 <> 1", _ConnectionString);
            }
            else if (nwTranType == "UPSR")
            {
                dtHDR = SFObjects.LoadDataTable("SELECT * FROM RE.SellerUpdateRole WHERE 1 <> 1", _ConnectionString);
            }
            return dtHDR;
        }

        public DataTable LoadSchemaLIN(DataTable dtLIN, string nwTranType)
        {
            if (nwTranType == "MOCR")
            {
                dtLIN = SFObjects.LoadDataTable("SELECT * FROM RE.SellerModeofCommissionReleaseLIN WHERE 1 <> 1", _ConnectionString);
            }
            else if (nwTranType == "DOCD")
            {
                dtLIN = SFObjects.LoadDataTable("SELECT * FROM RE.SellerDocumentDetailsLIN WHERE 1 <> 1", _ConnectionString);
            }
            else if (nwTranType == "BAAC")
            {
                dtLIN = SFObjects.LoadDataTable("SELECT * FROM RE.SellerBankAccountDetailsLIN WHERE 1 <> 1", _ConnectionString);
            }
            else if (nwTranType == "ADAC")
            {
                dtLIN = SFObjects.LoadDataTable("SELECT * FROM RE.SellerAccountAsCustomerDetailsLIN WHERE 1 <> 1", _ConnectionString);
            }
            else if (nwTranType == "SETD")
            {
                dtLIN = SFObjects.LoadDataTable("SELECT * FROM RE.SellerSeminarTrainingsDetailsLIN WHERE 1 <> 1", _ConnectionString);
            }
            else if (nwTranType == "SELD")
            {
                dtLIN = SFObjects.LoadDataTable("SELECT * FROM RE.SellerRoleDetailsLIN WHERE 1 <> 1", _ConnectionString);
            }
            return dtLIN;
        }

        public string GetData(string SellerCode, string SellerName, string nwTranType)
        {
            string a = string.Format(@"EXEC [RE].[nsp_SellerInformation] @SellerCode = '{0}', @SellerName = '{1}',@nwTranType = '{2}', @QueryType = 22 ", SellerCode, SellerName, nwTranType);
            //string a = string.Format(@"SELECT ID,SellerCode,SellerName,FORMAT(EffectiveDate,'MM/dd/yyyy')[EffectiveDate] FROM BM.SellerModeofCommissionReleaseHDR", BSNo);
            return a;
        }

        public string LISTINGQUERY(string nwSellerCode, string nwTranType)
        {
            string sql = string.Format(@"EXEC [PRT].[nsp_BMSellerInformation] @SellerCode = '{0}',@nwTranType = '{1}', @QueryType = 58", nwSellerCode, nwTranType);
            return sql;
        }

        #region Lookup      
        public string getlugCode(string CodeDesc, string Code, string nwTranType, string sellerCode)
        {
            string sql = string.Format(@"EXEC [RE].[nsp_SellerInformation] @QueryType = 21, @CodeDesc = '{0}', @Code = '{1}', @nwTranType = '{2}', @SellerCode = '{3}'", CodeDesc, Code, nwTranType, sellerCode);
            return sql;
        }

        public string inquireQuery(string tranType, string seller)
        {
            return string.Format(@"EXEC [RE].[nsp_SellerInformation] @QueryType = 33 , @nwTranType = '{0}', @SellerCode = '{1}'", tranType, seller);
        }

        public string getday(string txtID, int RowNo)
        {
            return SFObjects.returnText(string.Format(@"EXEC [RE].[nsp_SellerInformation] @queryType = 25,  @ID = '{0}', @RowNo = '{1}'", txtID, RowNo), _ConnectionString);
        }
        #endregion

        public DataTable getLineDetails(string txtID, string nwTranType)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[RE].[nsp_SellerInformation]";
            cmd.Parameters.AddWithValue("@ID", txtID);
            cmd.Parameters.AddWithValue("@nwTranType", nwTranType);
            cmd.Parameters.AddWithValue("@QueryType", 19);
            return base.ExecGetData(cmd, _ConnectionString);
        }

        public DataTable getLineLoadedSELD(string sellerCode)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[RE].[nsp_SellerInformation]";
            cmd.Parameters.AddWithValue("@SellerCode", sellerCode);
            //cmd.Parameters.AddWithValue("@nwTranType", nwTranType);
            cmd.Parameters.AddWithValue("@QueryType", 39);
            return base.ExecGetData(cmd, _ConnectionString);
        }

        public string SaveData(DataTable dtHdr, DataTable dtLin, string nwTranType, bool IsNewRow)
        {
            List<SqlCommand> cmdList = new List<SqlCommand>();

            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[RE].[nsp_SellerInformation]";
            cmd.Parameters.AddWithValue("@ID", dtHdr.Rows[0]["ID"]);
            cmd.Parameters.AddWithValue("@SellerCode", dtHdr.Rows[0]["SellerCode"]);
            cmd.Parameters.AddWithValue("@SellerName", dtHdr.Rows[0]["SellerName"]);
            if ((nwTranType == "MOCR") || (nwTranType == "UPSR") || (nwTranType == "SELD"))
            {
                cmd.Parameters.AddWithValue("@EffectiveDate", dtHdr.Rows[0]["EffectiveDate"]);
            }
            if (nwTranType == "UPSR")
            {
                cmd.Parameters.AddWithValue("@SellerRoleTo", dtHdr.Rows[0]["SellerRoleTo"]);
                cmd.Parameters.AddWithValue("@sellerRoleFrom", dtHdr.Rows[0]["sellerRoleFrom"]);
            }

            cmd.Parameters.AddWithValue("@Recuser", dtHdr.Rows[0]["Recuser"]);
            cmd.Parameters.AddWithValue("@ModUser", dtHdr.Rows[0]["Moduser"]);
            cmd.Parameters.AddWithValue("@nwTranType", nwTranType);
            cmd.Parameters.AddWithValue("@QueryType", 17);
            cmdList.Add(cmd);

            int rownum = 0;
            foreach (DataRow items in dtLin.Rows)
            {
                rownum++;
                cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Clear();
                cmd.CommandText = "[RE].[nsp_SellerInformation]";
                cmd.Parameters.AddWithValue("@ID", dtHdr.Rows[0]["ID"]);
                cmd.Parameters.AddWithValue("@SellerCode", dtHdr.Rows[0]["SellerCode"]);
                cmd.Parameters.AddWithValue("@SellerName", dtHdr.Rows[0]["SellerName"]);
                if (nwTranType == "MOCR")
                {
                    cmd.Parameters.AddWithValue("@EffectiveDate", dtHdr.Rows[0]["EffectiveDate"]);
                    cmd.Parameters.AddWithValue("@ModeofCommissionReleaseCode", items["ModeofCommissionReleaseCode"]);
                }
                else if (nwTranType == "DOCD")
                {
                    cmd.Parameters.AddWithValue("@DocumentControlCode", items["DocumentControlCode"]);
                    cmd.Parameters.AddWithValue("@DocumentSourceCode", items["DocumentSourceCode"]);
                    cmd.Parameters.AddWithValue("@DocumentNo", items["DocumentNo"]);
                    cmd.Parameters.AddWithValue("@DocumentDate", items["DocumentDate"]);
                    cmd.Parameters.AddWithValue("@ExpiryDate", items["ExpiryDate"]);
                    cmd.Parameters.AddWithValue("@Attachment", items["Attachment"]);
                    cmd.Parameters.AddWithValue("@AttacthmentPath", items["AttachmentPath"]);
                }
                else if (nwTranType == "BAAC")
                {
                    cmd.Parameters.AddWithValue("@BankCode", items["BankCode"]);
                    cmd.Parameters.AddWithValue("@Branch", items["Branch"]);
                    cmd.Parameters.AddWithValue("@AccountNo", items["AccountNo"]);
                    cmd.Parameters.AddWithValue("@AccountName", items["AccountName"]);
                    cmd.Parameters.AddWithValue("@AccountType", items["AccountType"]);
                    cmd.Parameters.AddWithValue("@Particulars", items["Particulars"]);
                }
                else if (nwTranType == "ADAC")
                {
                    cmd.Parameters.AddWithValue("@ProjectCode", items["ProjectCode"]);
                    cmd.Parameters.AddWithValue("@AccountNo", items["AccountNo"]);
                    cmd.Parameters.AddWithValue("@ReservationDate", items["ReservationDate"]);
                }
                else if (nwTranType == "SETD")
                {
                    cmd.Parameters.AddWithValue("@SeminarTrainings", items["SeminarTraining"]);
                    cmd.Parameters.AddWithValue("@Day", items["Day"]);
                    cmd.Parameters.AddWithValue("@SeminarDate", items["SeminarDate"]);
                    cmd.Parameters.AddWithValue("@Remarks", items["Remarks"]);
                }
                else if (nwTranType == "SELD")
                {
                    cmd.Parameters.AddWithValue("@SellerRole", items["SellerRole"]);
                    cmd.Parameters.AddWithValue("@SellerCodeSR", items["SellerCode"]);
                    cmd.Parameters.AddWithValue("@EffectiveDate", dtHdr.Rows[0]["EffectiveDate"]);
                    cmd.Parameters.AddWithValue("@Recuser", dtHdr.Rows[0]["Recuser"]);
                }

                cmd.Parameters.AddWithValue("@Rowno", rownum);
                cmd.Parameters.AddWithValue("@nwTranType", nwTranType);
                cmd.Parameters.AddWithValue("@QueryType", 18);
                cmdList.Add(cmd);

            }
            return base.ExecProcedure(cmdList, _ConnectionString);

        }

        public string DeleteData(string txtID, string nwTranType)
        {
            List<SqlCommand> cmdlist = new List<SqlCommand>();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[RE].[nsp_SellerInformation]";
            cmd.Parameters.AddWithValue("@ID", txtID);
            cmd.Parameters.AddWithValue("@nwTranType", nwTranType);
            cmd.Parameters.AddWithValue("@queryType", 23);
            cmdlist.Add(cmd);

            return base.ExecProcedure(cmdlist, _ConnectionString);
        }

        public DataTable disableNewExist(string trantype, string sellerCode)
        {
            return SFObjects.LoadDataTable(string.Format(@"EXEC [RE].[nsp_SellerInformation] @QueryType = 40, 
                                                                                            @nwTranType = '{0}', 
                                                                                            @SellerCode = '{1}'", trantype, sellerCode), _ConnectionString);

        }

        public string serverLink()
        {
            return SFObjects.returnText(string.Format(@"EXEC [RE].[nsp_SellerInformation] @QueryType = 41"), _ConnectionString);
        }

        public string serverpath()
        {
            return SFObjects.returnText(string.Format(@"EXEC [RE].[nsp_SellerInformation] @QueryType = 45"), _ConnectionString);
        }

        public string getUniqe(string nwTrantype, string docCode, string sourceCode, string ID)
        {
            return SFObjects.returnText(string.Format(@"EXEC [RE].[nsp_SellerInformation] @QueryType = 42 ,
                                                                                          @nwTranType = '{0}' ,
                                                                                          @DocumentControlCode = '{1}' ,
                                                                                          @DocumentSourceCode = '{2}', 
                                                                                          @ID = '{3}'", nwTrantype, docCode, sourceCode, ID), _ConnectionString);
        }

    }
}