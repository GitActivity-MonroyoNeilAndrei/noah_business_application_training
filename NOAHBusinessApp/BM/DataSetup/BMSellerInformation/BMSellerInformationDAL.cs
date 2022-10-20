using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;

namespace DALComponent
{
    public class BMSellerInformationDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        #region STANDARD

        public string MenuItemCode = "BMSellerInformation"; // This is default parameter  for version
        public string MenuItemVersion = "10.0.0.3"; // This is default parameter for version
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
                                primaryKey = "SellerCode";                                      //--column for searching



        //#FOR EXPORT
        public string LISTINGFILENAME = "Seller Information", GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END


        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator

        public BMSellerInformationDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }


        public DataTable LoadSchema()
        {
            return SFObjects.LoadDataTable("SELECT * FROM RE.SellerInformation WHERE 1 <> 1", _ConnectionString);
        }

        public DataTable getDup(string code)
        {
            return SFObjects.LoadDataTable("SELECT * FROM [RE].[AttyinfactInfoDocDtlsLIN]   WHERE PCode = '"+ code +"'", _ConnectionString);
        }

        public string GetData(string SellerCode)
        {
            //string a = string.Format(@"SELECT * FROM [PRT].[fn_SellerBasicInformation_Listing]() ORDER BY sellerCode");
            string a = string.Format(@"EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 0, @SellerCode = '" + SellerCode + "'");

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            return a;
        }
        
        public DataTable GetDataLin(string code)
        {
            return SFObjects.LoadDataTable($@"EXEC [PRT].[nsp_PartnerShareAssignment] @QueryType = 9, @ID= '{ code }'", _ConnectionString);
        }

        public string getUpdateDisable(string recUser)
        {
            return SFObjects.returnText($@"EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 49, @recUser= '{ recUser }'", _ConnectionString);
        }



        public string SaveData(DataTable dthdr, bool IsNewRow, int UpdateButton, int isProcess)
        {
            List<SqlCommand> cmdList = new List<SqlCommand>();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            int xcounter = 1;

            DataRow drhdr = dthdr.Rows[0];

            cmd = new SqlCommand();
            cmd.Parameters.Clear();
            cmd.CommandText = "[PRT].[nsp_BMSellerInformation]";
            cmd.Parameters.AddWithValue("@SellerCode", drhdr["SellerCode"].ToString());
            cmd.Parameters.AddWithValue("@SellerCategory", drhdr["SellerCategory"].ToString());
            cmd.Parameters.AddWithValue("@SellerCrossRefCode", drhdr["SellerCrossRefCode"]);
            cmd.Parameters.AddWithValue("@SellerName", drhdr["SellerName"]);
            cmd.Parameters.AddWithValue("@SellerGroup", drhdr["SellerGroup"]);
            cmd.Parameters.AddWithValue("@SellerType", drhdr["SellerType"]);
            cmd.Parameters.AddWithValue("@SellerRole", drhdr["SellerRole"]);
            cmd.Parameters.AddWithValue("@SellerStatus", drhdr["SellerStatus"]);
            cmd.Parameters.AddWithValue("@PRCLicenseNo", drhdr["PRCLicenseNo"].ToString());
            cmd.Parameters.AddWithValue("@Salutation", drhdr["Salutation"]);
            cmd.Parameters.AddWithValue("@LastName", drhdr["LastName"]);
            cmd.Parameters.AddWithValue("@FirstName", drhdr["FirstName"]);
            cmd.Parameters.AddWithValue("@MiddleName", drhdr["MiddleName"]);
            cmd.Parameters.AddWithValue("@MiddleInitial", drhdr["MiddleInitial"]);
            cmd.Parameters.AddWithValue("@MaidenName", drhdr["MaidenName"].ToString());
            cmd.Parameters.AddWithValue("@MotherMaidenName", drhdr["MotherMaidenName"]);
            cmd.Parameters.AddWithValue("@NameSuffix", drhdr["NameSuffix"]);
            cmd.Parameters.AddWithValue("@BirthDate", drhdr["BirthDate"]);
            cmd.Parameters.AddWithValue("@Gender", drhdr["Gender"]);
            cmd.Parameters.AddWithValue("@CivilStatus", drhdr["CivilStatus"]);
            cmd.Parameters.AddWithValue("@Nationality", drhdr["Nationality"].ToString());
            cmd.Parameters.AddWithValue("@BirthPlace", drhdr["BirthPlace"]);
            cmd.Parameters.AddWithValue("@TIN", drhdr["TIN"]);
            cmd.Parameters.AddWithValue("@RegisteredName", drhdr["RegisteredName"]);
            cmd.Parameters.AddWithValue("@CorpVATRegType", drhdr["CorpVATRegType"]);
            cmd.Parameters.AddWithValue("@VATRegTIN", drhdr["VATRegTIN"]);
            cmd.Parameters.AddWithValue("@NonVATRegTIN", drhdr["NonVATRegTIN"].ToString());
            cmd.Parameters.AddWithValue("@DefaultVATTaxCode", drhdr["DefaultVATTaxCode"]);
            cmd.Parameters.AddWithValue("@DefaultCWTTaxCode", drhdr["DefaultCWTTaxCode"]);
            cmd.Parameters.AddWithValue("@SSSNumber", drhdr["SSSNumber"]);
            cmd.Parameters.AddWithValue("@PagIBIGNumber", drhdr["PagIBIGNumber"]);
            cmd.Parameters.AddWithValue("@PhilHealthNumber", drhdr["PhilHealthNumber"]);
            cmd.Parameters.AddWithValue("@Mobile", drhdr["Mobile"]);
            cmd.Parameters.AddWithValue("@Telephone", drhdr["Telephone"]);
            cmd.Parameters.AddWithValue("@Email", drhdr["Email"]);
            cmd.Parameters.AddWithValue("@SellerAddress", drhdr["SellerAddress"]);
            cmd.Parameters.AddWithValue("@SellerAddress2", drhdr["SellerAddress2"].ToString());
            cmd.Parameters.AddWithValue("@RecruitmentDate", drhdr["RecruitmentDate"]);
            cmd.Parameters.AddWithValue("@RecruitedBy", drhdr["RecruitedBy"]);
            cmd.Parameters.AddWithValue("@FirstSaleDate", drhdr["FirstSaleDate"]);
            cmd.Parameters.AddWithValue("@Recuser", drhdr["RecUser"]);
            cmd.Parameters.AddWithValue("@Moduser", drhdr["ModUser"]);
            cmd.Parameters.AddWithValue("@UpdateStatus", UpdateButton);

            cmd.Parameters.AddWithValue("@level1", drhdr["Level1"]);
            cmd.Parameters.AddWithValue("@level2", drhdr["Level2"]);
            cmd.Parameters.AddWithValue("@level3", drhdr["Level3"]);
            cmd.Parameters.AddWithValue("@level4", drhdr["Level4"]);
            cmd.Parameters.AddWithValue("@level5", drhdr["Level5"]);
            cmd.Parameters.AddWithValue("@level6", drhdr["Level6"]);
            cmd.Parameters.AddWithValue("@level7", drhdr["Level7"]);
            cmd.Parameters.AddWithValue("@level8", drhdr["Level8"]);
            cmd.Parameters.AddWithValue("@level9", drhdr["Level9"]);
            cmd.Parameters.AddWithValue("@level10", drhdr["Level10"]);

            cmd.Parameters.AddWithValue("@LocationSegment", drhdr["locationSegment"]);
            cmd.Parameters.AddWithValue("@MarketingGroup", drhdr["MarketingGroup"]);
            cmd.Parameters.AddWithValue("@PassportID", drhdr["PassportID"]); 
            cmd.Parameters.AddWithValue("@ContractType", drhdr["ContractType"]);
            cmd.Parameters.AddWithValue("@ContractDurationFrom", drhdr["ContractDurationFrom"]);
            cmd.Parameters.AddWithValue("@ContractDurationTo", drhdr["ContractDurationTo"]);
            cmd.Parameters.AddWithValue("@ContractStatus", drhdr["ContractStatus"]);
            cmd.Parameters.AddWithValue("@SellerClassification", drhdr["SellerClassification"]);

            //cmd.Parameters.AddWithValue("@lastLabel", drhdr["LastLevelLabel"]);
            //cmd.Parameters.AddWithValue("@2ndLastLabel", drhdr["2ndLastLevelLabel"]);
            cmd.Parameters.AddWithValue("@isProcess",isProcess);
            cmd.Parameters.AddWithValue("@QueryType", IsNewRow ? 1: 2);
            cmdList.Add(cmd);

            //foreach (DataRow dr in dtlin.Rows)
            //{
            //    cmd = new SqlCommand();
            //    cmd.Parameters.Clear();
            //    cmd.CommandText = "[PRT].[nsp_SignatoryDetails]"; 
            //    cmd.Parameters.AddWithValue("@ID", drhdr["ID"].ToString());
            //    cmd.Parameters.AddWithValue("@EmployeeCode", dr["EmployeeCode"].ToString());
            //    cmd.Parameters.AddWithValue("@IDNo", dr["IDNo"]);
            //    cmd.Parameters.AddWithValue("@DateIssued", dr["DateIssued"]);
            //    cmd.Parameters.AddWithValue("@PlaceIssued", dr["PlaceIssued"]);
            //    cmd.Parameters.AddWithValue("@QueryType", 4);
            //    cmdList.Add(cmd);
            //    xcounter++;
            //}

            return base.ExecProcedure(cmdList, _ConnectionString);
        }

        public DataTable LoadSchemaLINComRel()
        {
            return SFObjects.LoadDataTable("SELECT * FROM [PRT].[AttyinfactInfoDocDtlsLIN] WHERE 1<>1", _ConnectionString);
        }

        public string DeleteData(string SellerCode)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[PRT].[nsp_BMSellerInformation]";
            cmd.Parameters.AddWithValue("@SellerCode", SellerCode);
            cmd.Parameters.AddWithValue("@QueryType",47);
            return base.ExecProcedure(cmd, _ConnectionString);
        }
        //public string CopyFrom(string id, string finance)
        //{
        //    return $"EXEC [PRT].[nsp_SignatoryDetails] @QueryType = 11, @TranType = '{id}', @Finance = '{finance}'";
        //}

        public string inquireQuery()
        {
            return string.Format( $"EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 4");
        }
        public string LISTINGQUERY(string SellerCode)
        {
            return string.Format(@"EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 6 , @SellerCode = '{0}'", SellerCode);
        }

        public DataTable getDataLin(string PCode)
        {
            string sql = string.Format($@"EXEC [PRT].[nsp_SignatoryDetails] @QueryType = 10 , @PCode = '{PCode}'");
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public DataTable getlevelLabel(string sellerType)
        {
            string sql = string.Format($@"EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 54 , @sellerType = '{sellerType}'");
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public DataTable getConfiglvl(string sellerType)
        {
            string sql = string.Format($@"SELECT LOWER(LEVEL) lvl , VALUE [val] FROM RE.SellerHierarchyConfiguration
                                            UNPIVOT (
                                                value   
                                                FOR LEVEL IN ( level1 , level2 , level3 , level4 , level5, level6 , level7 , level8, level9 , level10)
                                            )
                                            AS pvt
                                            WHERE sellerType ='{sellerType}'");
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public int checkifDataExists(int sellerCategory , string sellerCode, string birthDate , string sellerName , string RegisteredName)
        {
            string sql = string.Format($@"EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 44 , 
                                            @SellerCategory = '{sellerCategory}' , 
                                            @sellerName = '{sellerName}' , 
                                            @RegisteredName = '{RegisteredName}' , 
                                            @BirthDate = '{birthDate}' , 
                                            @SellerCode = '{sellerCode}'");

            return Parser.ParseInt(SFObjects.returnText(sql, _ConnectionString));
        }
        public int checkSellerRole(string sellerCode, string sellerRole)
        {
            string sql = string.Format($@"SELECT top 1 1 FROM RE.SellerInformationUpdate WHERE sellercode = '{sellerCode}' AND SellerRole = '{sellerRole}'
                                        ORDER BY id DESC");

            return Parser.ParseInt(SFObjects.returnText(sql, _ConnectionString));
        }


        public string ServerLink()
        {
            /*return SFObjects.returnText($"SELECT 'http://localhost:39529/BM/DataSetup/SellerInformation/' Value FROM dbo.SystemConfig WHERE Code = 'Server_Link'", _ConnectionString);*/
            return SFObjects.returnText($"SELECT a.Value FROM dbo.SystemConfig a WHERE Code = 'Server_Link'", _ConnectionString);
        }

        public string getExistTIN(string tin)
        {
            return SFObjects.returnText(string.Format(@"EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 34, @TIN = '{0}'", tin),_ConnectionString);
        }

        public string getExistVATTIN(string vatTin)
        {
            return SFObjects.returnText(string.Format(@"EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 35, @VATRegTIN = '{0}'", vatTin), _ConnectionString);
        }

        public string getExistNonVATTIN(string nonVatTin)
        {
            return SFObjects.returnText(string.Format(@"EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 36, @NonVATRegTIN = '{0}'", nonVatTin), _ConnectionString);
        }

        //public DataTable DataRetrival(string ID)
        //{

        //    return SFObjects.LoadDataTable(string.Format($@"EXEC [PRT].[nsp_SignatoryDetails] @QueryType = 7,@ID = '{ID}'"),
        //            _ConnectionString);
        //}


        //LAM
        public string qryLevel(string sellertype, string sellerconfig, string mrktgGrp)
        {
            return $"EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 32 , @SellerType = '{sellertype}' , @SellerConfig = '{sellerconfig}', @MarketingGroup = '{mrktgGrp}'";
        }

        //public string getSellergroup = "EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 3";
        public string getSellergroup = "EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 57";
        public string getSellerTyp = "EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 56";
        //public string getSellerRole = "EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 32";
        public string getSellerStatus = "EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 26";
        public string getSalutation = "EXEC [PRT].[nsp_SellerInformation] @QueryType = 20";
        public string getNameSuffix = "EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 21";
        public string getGender = "EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 22";
        //public string getCivilStatus = "EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 23";
        public string getNationality = "EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 24";
        public string getDefaultVATTaxCode = "EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 27";
        public string getRecruitedBy = "EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 29";
        public string getCommRel = "EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 16";
        //LAM

        public string getCivilStatus(string code)
        {

            return string.Format($@"EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 23, @salutation='{code}'", _ConnectionString);

            //return string.Format($@"EXEC [PRT].[nsp_CustomerMasterFile] @QueryType = 23, @custtagging='{vip}'", _ConnectionString);
        }

        public string qryMarketingGroup()
        {
            return "EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 25";
        }

        public string getSellerRole()
        {
            return $"EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 32";
        }
        public string getLocSegment(string origin)
        {
            return $"EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 39, @level3='{origin}'";
        }
        public string getSellerContractType()
        {
            return $"EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 28";
        }
        public string getSellerContractStat()
        {
            return $"EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 30";
        }

        #region ifIsUsed

        public int ifIsUsed(string Code)
        {
            return Parser.ParseInt(SFObjects.returnText(string.Format(@"EXEC dbo.nsp_IfIsUsed @Schema = 'SG',
                                                        @Table = 'LocationType', 
                                                        @Code = '{0}', 
                                                        @QueryType = 1", Code), _ConnectionString));
        }

        #endregion

        public bool iExist(string ID)
        {
            return Parser.ParseInt(SFObjects.returnText($"SELECT 1 FROM RE.SignatoryDetails WHERE ID = '{ID}'", _ConnectionString)).Equals(1);
        }

        public string getLabel(string level)
        {
            string sql = $"SELECT [PRT].[fn_getLabelSeller]('{level}')";
            return SFObjects.returnText(sql, _ConnectionString);
        }
        public int checkSellerDuplicate(int sellerCategory, string sellerName, string sellerCode , string birthDate, string regTIN, 
                                        string lastname , string firstname, string middlename)
        {
            string sql = $@"EXEC [PRT].[nsp_BMSellerInformation] @QueryType = 55,  @SellerCategory = '{sellerCategory}' , 
                                @sellerCode = '{sellerCode}' , @sellerName = '{sellerName}' , @birthdate = '{birthDate}' , @TIN = '{regTIN}', 
                                @LastName = '{lastname}' , @FirstName = '{firstname}' , @MiddleName = '{middlename}'";
            return Parser.ParseInt(SFObjects.returnText(sql, _ConnectionString));
        }
        public bool checkifEnable(string recuser)
        {
            string sql = $"Exec [PRT].[nsp_BMSellerInformation] @Querytype =31 , @Recuser='{recuser}'";
            return Parser.ParseBool(SFObjects.returnText(sql, _ConnectionString));
        }


        public string SaveComRel(DataTable dt_lin, string moduser)
        {
            List<SqlCommand> cmdlist = new List<SqlCommand>();
            SqlCommand cmd = new SqlCommand();
            DataRow dr = dt_lin.Rows[0];

            int row = 0;
            foreach (DataRow dr_lin in dt_lin.Rows)
            {
                if (string.IsNullOrEmpty(dr_lin[3].ToString()))
                    continue;
                {
                    cmd = new SqlCommand();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Clear();
                    cmd.CommandText = "[PRT].[nsp_AttorneyinfactInfo]";
                    cmd.Parameters.AddWithValue("@ID", dr_lin["ID"]);
                    cmd.Parameters.AddWithValue("@Required", dr_lin["Required"]);
                    cmd.Parameters.AddWithValue("@DocControlCode", dr_lin["DocControlCode"]);
                    cmd.Parameters.AddWithValue("@Docno", dr_lin["Docno"]);
                    cmd.Parameters.AddWithValue("@DocDate", dr_lin["Docdate"]);
                    cmd.Parameters.AddWithValue("@ExpiryDate", dr_lin["ExpiryDate"]);
                    cmd.Parameters.AddWithValue("@Attach", dr_lin["Attach"]);
                    cmd.Parameters.AddWithValue("@View", dr_lin["View"]);
                    cmd.Parameters.AddWithValue("@Rowno", dr_lin["ROWNO"]);
                    cmd.Parameters.AddWithValue("@QueryType", 4);
                    cmdlist.Add(cmd);
                    row++;
                }
            }
            return base.ExecProcedure(cmdlist, _ConnectionString);
        }
        public DataTable LoadDocumentDetails(string txtID, string nwTrantype)
        {
            if (nwTrantype == "DOCD")
            {
                return SFObjects.LoadDataTable(string.Format(@"EXEC [PRT].[nsp_BMSellerDocumentDetail] @SellerCode = '{0}', @QueryType = 9", txtID), _ConnectionString);
            }
            else
            {
                return SFObjects.LoadDataTable(string.Format(@"EXEC [PRT].[nsp_BMAuthorizedRepresentativeDetail] @ID = '{0}', @QueryType = 13", txtID), _ConnectionString);
            }
        }
        public string SellerCode(string SellerCode)
        {
            return SFObjects.returnText(string.Format(@"EXEC [PRT].[nsp_BMSellerInformation] @queryType = 29,  @SellerCode = '{0}'", SellerCode), _ConnectionString);
        }

        //public string ProcessData(string SellerCode , string recuser , int UpdateButton)
        //{
        //    SqlCommand cmd = new SqlCommand();
        //    cmd.CommandType = CommandType.StoredProcedure;
        //    cmd.Parameters.Clear();
        //    cmd.CommandText = "[PRT].[nsp_BMSellerInformation]";
        //    cmd.Parameters.AddWithValue("@SellerCode", SellerCode);
        //    cmd.Parameters.AddWithValue("@recuser", recuser);
        //    cmd.Parameters.AddWithValue("@updateStatus", UpdateButton);
        //    cmd.Parameters.AddWithValue("@QueryType", 5);
        //    return base.ExecProcedure(cmd, _ConnectionString);
        //}

        public string ProcessData(string SellerCode, string sellerName, string password,string SaveStatus, string UpdateStatus)
        {
            SqlCommand cmd = new SqlCommand();
            
            if (SaveStatus == "Saved" && UpdateStatus == "")
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Clear();
                cmd.CommandText = "FPTI.nsp_AddUser";
                cmd.Parameters.AddWithValue("@Code", SellerCode);
                cmd.Parameters.AddWithValue("@passWord", password);
                cmd.Parameters.AddWithValue("@Description", sellerName);
                //cmd.Parameters.AddWithValue("@QueryType", 5);
                return base.ExecProcedure(cmd, _ConnectionString2);
            }
            else if(SaveStatus == "Approved" && UpdateStatus == "Saved")
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Clear();
                cmd.CommandText = "PRT.nsp_SellerInformation";
                cmd.Parameters.AddWithValue("@SellerCode", SellerCode);
                //cmd.Parameters.AddWithValue("@passWord", password);
                //cmd.Parameters.AddWithValue("@Description", sellerName);
                cmd.Parameters.AddWithValue("@QueryType", 51);
                return base.ExecProcedure(cmd, _ConnectionString);
            }
            else
            {
                return null;
            }
        }

        public string GetSellerRoleDetails(string SellerCode)
        {
            return SFObjects.returnText(string.Format(@"SELECT TOP 1 1 FROM PRT.SellerRoleDetailsHDR WHERE SellerCode = '{0}'", SellerCode), _ConnectionString);
        }

        public string GetSellerRoleLevel(string sellerCode)
        {
            return SFObjects.returnText(string.Format(@"SELECT  d.lvl FROM RE.SellerInformation a 
                    JOIN re.BMmrktgGrpSellerRoleAssignHdr c ON c.mrktgGrp = a.MarketingGroup
                    JOIN re.BMmrktgGrpSellerRoleAssignLin d ON d.id = c.ID AND d.sellerRoleCode = a.SellerRole
                    AND a.SellerCode = '{0}'", sellerCode), _ConnectionString);
        }

        public string SellerInfoUpdate(string SellerCode)
        {
            return SFObjects.returnText(string.Format(@"SELECT TOP 1 1 FROM RE.SellerInformationUpdate WHERE SellerCode = '{0}'", SellerCode), _ConnectionString);
        }

        public string SellerInfoUpdateStatus(string SellerCode)
        {
            return SFObjects.returnText(string.Format(@"SELECT UpdateStatus FROM RE.SellerInformation WHERE SellerCode = '{0}'", SellerCode), _ConnectionString);
        }

        public string getLastlevel()
        {
            return SFObjects.returnText(string.Format(@"EXEC [PRT].[nsp_SellerInformation] @QueryType = 43"), _ConnectionString);
        }


        //LAM
        public string saveImage(string sellerCode, string path)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[PRT].[nsp_BMSellerInformation]";
            cmd.Parameters.AddWithValue("@SellerCode", sellerCode);
            cmd.Parameters.AddWithValue("@SellerPicture", path);
            cmd.Parameters.AddWithValue("@QueryType", 34);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public string saveSignature(string sellerCode, string path)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[PRT].[nsp_BMSellerInformation]";
            cmd.Parameters.AddWithValue("@SellerCode", sellerCode);
            cmd.Parameters.AddWithValue("@SellerSignature", path);
            cmd.Parameters.AddWithValue("@QueryType", 36);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public string getSellerImagePath(string sellerCode)
        {
            string sql = $"Exec [PRT].[nsp_BMSellerInformation] @Querytype =33 , @sellerCode='{sellerCode}'";
            return SFObjects.returnText(sql, _ConnectionString);
        }
        public string getSellerSignaturePath(string sellerCode)
        {
            string sql = $"Exec [PRT].[nsp_BMSellerInformation] @Querytype =35 , @sellerCode='{sellerCode}'";
            return SFObjects.returnText(sql, _ConnectionString);
        }

        public string GetSalutationData(string code)
        {
            string a = string.Format(@"Exec [PRT].[nsp_BMSellerInformation] @Querytype =53 , @Salutation='{0}'", code);

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            return a;
        }

    }
}