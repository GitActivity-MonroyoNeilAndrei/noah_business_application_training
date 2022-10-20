using NoahWebLib;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace DALComponent
{
    public class SBCustomerMasterFileDAL : DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects(); /// should be added
        #region STANDARD

        public string MenuItemCode = "SBCustomerMasterFile"; // This is default parameter  for version
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
        public string focusRecordPK;
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "CustomerCode"; //--query of export and print

        public string spName = "[PRT].[nsp_SBCustomerMasterFile]";


        //#FOR EXPORT
        public string LISTINGFILENAME = "Customer Information",
             //LISTINGQUERY = @"SELECT Code, [Description], Recuser as [Created by], recdate as [Date Created], moduser as [Modified by], moddate as [Date Modified] FROM EP.Brand"
             GETCOMPANY = "SELECT CompanyName FROM SG.BIRCASConfig where companycode = '{0}'";
        public int LISTINGSTARTROW = 5;
        //# END
        //--default start row

        public string CurrentSelectedItem;                                               //-- selected item in binding navigator

        //public string inquireQuery = "EXEC [PRT].[nsp_SBCustomerMasterFile] @QueryType = 6, @recuser='{1}'", RecUser;
        public string inquireQuery(string RecUser)
        {
            return string.Format($@"EXEC [PRT].[nsp_SBCustomerMasterFile] @QueryType = 6, @recuser='{RecUser}'", _ConnectionString);
        }

        public SBCustomerMasterFileDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;

            CurrentSelectedItem = selectedItem;
        }

        public string DatabaseName()
        {
            return SFObjects.returnText("SELECT DB_NAME()", _ConnectionString2);

        }

        public DateTime GetServerDateTime()
        {
            var date = SFObjects.GetServerDateTime(_ConnectionString);
            date = Convert.ToDateTime(date.ToShortDateString());
            return date;
        }

        public string LISTINGQUERY(string recuser)
        {
           
            string sql = $"EXEC [PRT].[nsp_SBCustomerMasterFile] @QueryType = 29, @recuser='{recuser}'";
            return sql;
            //return string.Format($@"SELECT * FROM [RE].[fn_CustomerBasicInformation_Listing]('{recuser}') ORDER BY [Customer Code]");

        }


        public string SystemUserExport(string RecUser)
        {
            return SFObjects.returnText(string.Format(@" SELECT Description FROM {0}.FPTI.[User] WHERE Code = '{1}'", DatabaseName(), RecUser), _ConnectionString);
        }

        public string ConnectionString { get { return _ConnectionString; } }

        public string GetTableName(string xda)
        {
            return SFObjects.returnText(String.Format(@"SELECT TOP 1  name AS 'Table' FROM sys.tables WHERE NAME = '{0}' ", xda), _ConnectionString2);
        }

        public string GetTableName2(string xda, string con)
        {
            return SFObjects.returnText(String.Format(@"SELECT TOP 1  name AS 'Table'
        FROM sys.tables WHERE NAME = '{0}' ", xda), con);
        }
        public DataTable GetDesiredProperty(string code)
        {
            return SFObjects.LoadDataTable(string.Format("EXEC [PRT].[nsp_SBCustomerMasterFile] @CustomerCode='" + code + "',@QueryType=53"), _ConnectionString);
        }
        public DataSet LoadSchema()
        {
            return SFObjects.LoadDataSet(string.Format("EXEC [PRT].[nsp_SBCustomerMasterFile] @QueryType=11"), _ConnectionString);
        }
        public string getNoahDate()
        {
            return SFObjects.returnText("SELECT dbo.GetNoahDate()", _ConnectionString);
        }
        public DataSet LoadComboValues()
        {
            return SFObjects.LoadDataSet(string.Format("EXEC [PRT].[nsp_SBCustomerMasterFile] @QueryType=8"), _ConnectionString);
        }
        public DataTable GetComboValueSpecial(int qt,string code,string ft,string cust)
        {
            return SFObjects.LoadDataTable(string.Format("EXEC [PRT].[nsp_SBCustomerMasterFile] @Code='" + code + "',@FilterType='"+ft+"',@QueryType=" + qt + ",@CustomerCode='" + cust + "'"), _ConnectionString);
        }
        public DataTable GetCoownerDetails(string code)
        {
            return SFObjects.LoadDataTable(string.Format("EXEC [PRT].[nsp_SBCustomerMasterFile] @CustomerCode='" + code + "',@QueryType=14"), _ConnectionString);
        }

        public string SaveData(DataSet ds, bool isNew)//, string code) //added parameter code JEA 1-17-2017
        {
            SqlCommand cmd = new SqlCommand();
            DataTable dt = new DataTable();
            string res = "";


            for (int i = 0; i < ds.Tables.Count; i++)
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Clear();
                cmd.CommandText = "[PRT].[nsp_SBCustomerMasterFile]";
                dt = ds.Tables[i];
                switch (i)
                {
                    case 0://main
                        foreach(DataRow dr in dt.Rows)
                        {
                            cmd.Parameters.AddWithValue("@CustomerTypeInd", dr["CustomerTypeInd"]);
                            cmd.Parameters.AddWithValue("@CustomerTypeComp", dr["CustomerTypeComp"]);
                            //cmd.Parameters.AddWithValue("@BranchID", getBranchID);
                            cmd.Parameters.AddWithValue("@CustomerCode", dr["CustomerCode"]);
                            cmd.Parameters.AddWithValue("@CustomerCodeCrossReference", dr["CustomerCodeCrossReference"]);
                            cmd.Parameters.AddWithValue("@PreferredPaymentOption", dr["PreferredPaymentOption"]);
                            cmd.Parameters.AddWithValue("@VIP", dr["VIP"]);
                            cmd.Parameters.AddWithValue("@isNewInquiry", dr["isNewInquiry"]);
                            cmd.Parameters.AddWithValue("@isNewReservation", dr["isNewReservation"]);
                            cmd.Parameters.AddWithValue("@isTransfer", dr["isTransfer"]);
                            cmd.Parameters.AddWithValue("@Salutation", dr["Salutation"]);
                            cmd.Parameters.AddWithValue("@LastName", dr["LastName"]);
                            cmd.Parameters.AddWithValue("@FirstName", dr["FirstName"]);
                            cmd.Parameters.AddWithValue("@MiddleName", dr["MiddleName"]);
                            cmd.Parameters.AddWithValue("@MI", dr["MI"]);
                            cmd.Parameters.AddWithValue("@MothersMaidenName", dr["MothersMaidenName"]);
                            cmd.Parameters.AddWithValue("@nameSuffix", dr["nameSuffix"]);
                            cmd.Parameters.AddWithValue("@Birthday", dr["Birthday"]);
                            cmd.Parameters.AddWithValue("@Nationality", dr["Nationality"]);
                            cmd.Parameters.AddWithValue("@PlaceofBirth", dr["PlaceofBirth"]);
                            cmd.Parameters.AddWithValue("@Gender", dr["Gender"]);
                            cmd.Parameters.AddWithValue("@CivilStatus", dr["CivilStatus"]);
                            cmd.Parameters.AddWithValue("@Occupation", dr["Occupation"]);
                            cmd.Parameters.AddWithValue("@TIN", dr["TIN"]);
                            cmd.Parameters.AddWithValue("@RegisteredName", dr["RegisteredName"]);
                            cmd.Parameters.AddWithValue("@TradeName", dr["TradeName"]);
                            cmd.Parameters.AddWithValue("@CorpVatRegTypeVAT", dr["CorpVatRegTypeVAT"]);
                            cmd.Parameters.AddWithValue("@CorpVatRegTypeNONVAT", dr["CorpVatRegTypeNONVAT"]);
                            cmd.Parameters.AddWithValue("@VatREGTin", dr["VatREGTin"]);
                            cmd.Parameters.AddWithValue("@NonVatRegTin", dr["NonVatRegTin"]);
                            cmd.Parameters.AddWithValue("@RecordStatus", dr["RecordStatus"]);
                            cmd.Parameters.AddWithValue("@recuser", dr["recuser"]);
                            cmd.Parameters.AddWithValue("@ID", dr["id"]);
                            cmd.Parameters.AddWithValue("@VIPType", dr["VIPType"]);
                            cmd.Parameters.AddWithValue("@SourceofIncome", dr["SourceofIncome"]);
                            cmd.Parameters.AddWithValue("@PaymentOption", dr["PaymentOption"]);
                            cmd.Parameters.AddWithValue("@EmpSubType", dr["empSubType"]);
                            cmd.Parameters.AddWithValue("@CustomerClassification", dr["custclassification"]);
                            cmd.Parameters.AddWithValue("@moduser", dr["moduser"]);
                            cmd.Parameters.AddWithValue("@QueryType", isNew ? 1 : 2);
                        }
                        break;
                    case 1://contacts hdr
                        foreach (DataRow dr in dt.Rows)
                        {
                            cmd.Parameters.AddWithValue("@CustomerCode", dr["customerCode"]);
                            cmd.Parameters.AddWithValue("@Status", dr["status"]);
                            cmd.Parameters.AddWithValue("@recuser", dr["recuser"]);
                            cmd.Parameters.AddWithValue("@isUpdate", isNew ? 0 : 1);
                            cmd.Parameters.AddWithValue("@QueryType", 32);
                        }
                        break;
                    case 2://contacts lin
                        foreach (DataRow dr in dt.Rows)
                        {
                            cmd.Parameters.AddWithValue("@CustomerCode", dr["customerCode"]);
                            cmd.Parameters.AddWithValue("@LandlineNo", dr["LandlineNo"]);
                            cmd.Parameters.AddWithValue("@LocalNo", dr["LocalNo"]);
                            cmd.Parameters.AddWithValue("@MobileNo", dr["MobileNo"]);
                            cmd.Parameters.AddWithValue("@EmailAdd", dr["EmailAdd"]);
                            cmd.Parameters.AddWithValue("@EffectiveDate", dr["EffectiveDate"]);
                            cmd.Parameters.AddWithValue("@isUpdate", isNew ? 0 : 1);
                            cmd.Parameters.AddWithValue("@QueryType", 33);
                        }
                        break;
                    case 3://address hdr
                        foreach (DataRow dr in dt.Rows)
                        {
                            cmd.Parameters.AddWithValue("@CustomerCode", dr["customerCode"]);
                            cmd.Parameters.AddWithValue("@Status", dr["status"]);
                            cmd.Parameters.AddWithValue("@recuser", dr["recuser"]);
                            cmd.Parameters.AddWithValue("@isUpdate", isNew ? 0 : 1);
                            cmd.Parameters.AddWithValue("@QueryType", 34);
                        }
                        break;
                    case 4://address lin
                        foreach (DataRow dr in dt.Rows)
                        {
                            cmd.Parameters.AddWithValue("@CustomerCode", dr["customerCode"]);
                            cmd.Parameters.AddWithValue("@TagMail", dr["TagMail"]);
                            cmd.Parameters.AddWithValue("@TagAddress", dr["TagAddress"]);
                            cmd.Parameters.AddWithValue("@EffectiveDate", dr["EffectiveDate"]);
                            cmd.Parameters.AddWithValue("@LocationTypeCode", dr["LocationTypeCode"]);
                            cmd.Parameters.AddWithValue("@HomeOwnershipCode", dr["HomeOwnershipCode"]);
                            cmd.Parameters.AddWithValue("@FullLocation", dr["FullLocation"]);
                            cmd.Parameters.AddWithValue("@FullLocationAddress", dr["FullLocationAddress"]);
                            cmd.Parameters.AddWithValue("@ReqBrgy", dr["ReqBrgy"]);
                            cmd.Parameters.AddWithValue("@Barangay", dr["Barangay"]);
                            cmd.Parameters.AddWithValue("@Municipality", dr["Municipality"]);
                            cmd.Parameters.AddWithValue("@Province", dr["Province"]);
                            cmd.Parameters.AddWithValue("@Region", dr["Region"]);
                            cmd.Parameters.AddWithValue("@Country", dr["Country"]);
                            cmd.Parameters.AddWithValue("@ZIPCode", dr["ZIPCode"]);
                            cmd.Parameters.AddWithValue("@rownum", dr["rownum"]);
                            cmd.Parameters.AddWithValue("@City", dr["City"]);
                            cmd.Parameters.AddWithValue("@NatureOfBusiness", dr["NatureOfBusiness"]);
                            cmd.Parameters.AddWithValue("@BusinessType", dr["BusinessType"]);
                            cmd.Parameters.AddWithValue("@isUpdate", isNew ? 0 : 1);
                            cmd.Parameters.AddWithValue("@QueryType", 35);
                        }
                        break;
                    case 5://spouse
                        foreach (DataRow dr in dt.Rows)
                        {
                            cmd.Parameters.AddWithValue("@CustomerCode", dr["customerCode"]);
                            cmd.Parameters.AddWithValue("@status", dr["status"]);
                            cmd.Parameters.AddWithValue("@LastName", dr["LastName"]);
                            cmd.Parameters.AddWithValue("@FirstName", dr["FirstName"]);
                            cmd.Parameters.AddWithValue("@MiddleName", dr["MiddleName"]);
                            cmd.Parameters.AddWithValue("@MaidenName", dr["MaidenName"]);
                            cmd.Parameters.AddWithValue("@Occupation", dr["Occupation"]);
                            cmd.Parameters.AddWithValue("@Company", dr["Company"]);
                            cmd.Parameters.AddWithValue("@Birthday", dr["BirthDate"]);
                            cmd.Parameters.AddWithValue("@Nationality", dr["Nationality"]);
                            cmd.Parameters.AddWithValue("@Gender", dr["Gender"]);
                            cmd.Parameters.AddWithValue("@DateOfMarriage", dr["DateOfMarriage"]);
                            cmd.Parameters.AddWithValue("@recuser", dr["recuser"]);
                            cmd.Parameters.AddWithValue("@Salutation", dr["Salutation"]);
                            cmd.Parameters.AddWithValue("@NameSuffix", dr["NameSuffix"]);
                            cmd.Parameters.AddWithValue("@TIN", dr["TIN"]);
                            cmd.Parameters.AddWithValue("@isUpdate", isNew ? 0 : 1);
                            cmd.Parameters.AddWithValue("@QueryType", 36);
                        }
                        break;
                    case 6://employer hdr
                        foreach (DataRow dr in dt.Rows)
                        {
                            cmd.Parameters.AddWithValue("@CustomerCode", dr["customerCode"]);
                            cmd.Parameters.AddWithValue("@Status", dr["status"]);
                            cmd.Parameters.AddWithValue("@recuser", dr["recuser"]);
                            cmd.Parameters.AddWithValue("@isUpdate", isNew ? 0 : 1);
                            cmd.Parameters.AddWithValue("@QueryType", 37);
                        }
                        break;
                    case 7://employer lin
                        foreach (DataRow dr in dt.Rows)
                        {
                            cmd.Parameters.AddWithValue("@CustomerCode", dr["customerCode"]);
                            cmd.Parameters.AddWithValue("@employer", dr["employer"]);
                            cmd.Parameters.AddWithValue("@businessadd", dr["businessadd"]);
                            cmd.Parameters.AddWithValue("@businesscont", dr["businesscont"]);
                            cmd.Parameters.AddWithValue("@empstatuscode", dr["empstatuscode"]);
                            cmd.Parameters.AddWithValue("@effectiveDate", dr["effectiveDate"]);
                            cmd.Parameters.AddWithValue("@rownum", dr["rownum"]);
                            cmd.Parameters.AddWithValue("@EmploymentSubType", dr["EmploymentSubType"]);
                            cmd.Parameters.AddWithValue("@MonthlyPersonalInc", dr["MonthlyPersonalIncRange"]);
                            cmd.Parameters.AddWithValue("@MonthlyHouseholdInc", dr["MonthlyHouseholdIncRange"]);
                            cmd.Parameters.AddWithValue("@Profession", dr["Profession"]);
                            cmd.Parameters.AddWithValue("@NatureOfBusiness", dr["NatureOfBusiness"]);
                            cmd.Parameters.AddWithValue("@Position", dr["Position_ENH"]);
                            cmd.Parameters.AddWithValue("@isUpdate", isNew ? 0 : 1);
                            cmd.Parameters.AddWithValue("@QueryType", 38);
                        }
                        break;
                    case 8://coowner hdr
                        foreach (DataRow dr in dt.Rows)
                        {
                            cmd.Parameters.AddWithValue("@CustomerCode", dr["Customer"]);
                            cmd.Parameters.AddWithValue("@recuser", dr["recuser"]);
                            cmd.Parameters.AddWithValue("@isUpdate", isNew ? 0 : 1);
                            cmd.Parameters.AddWithValue("@QueryType", 39);
                        }
                        break;
                    case 9://coowner lin
                        foreach (DataRow dr in dt.Rows)
                        {
                            cmd.Parameters.AddWithValue("@CustomerCode", dr["Customer"]);
                            cmd.Parameters.AddWithValue("@RelationshiptotheCustomer", dr["RelationshiptotheCustomer"]);
                            cmd.Parameters.AddWithValue("@LastName", dr["LName"]);
                            cmd.Parameters.AddWithValue("@FirstName", dr["FName"]);
                            cmd.Parameters.AddWithValue("@MiddleName", dr["MName"]);
                            cmd.Parameters.AddWithValue("@TIN", dr["TIN"]);
                            cmd.Parameters.AddWithValue("@Gender", dr["Gender"]);
                            cmd.Parameters.AddWithValue("@Nationality", dr["Nationality"]);
                            cmd.Parameters.AddWithValue("@Birthday", dr["DateofBirth"]);
                            cmd.Parameters.AddWithValue("@Age", dr["Age"]);
                            cmd.Parameters.AddWithValue("@PlaceofBirth", dr["PlaceofBirth"]);
                            cmd.Parameters.AddWithValue("@PresentAddress", dr["PresentAddress"]);
                            cmd.Parameters.AddWithValue("@ProvincialAddress", dr["ProvincialAddress"]);
                            cmd.Parameters.AddWithValue("@OfficeName", dr["OfficeName"]);
                            cmd.Parameters.AddWithValue("@OfficeAddress", dr["OfficeAddress"]);
                            cmd.Parameters.AddWithValue("@OfficeTelNo", dr["OfficeTelNo"]);
                            cmd.Parameters.AddWithValue("@rownum", dr["Rowno"]);
                            cmd.Parameters.AddWithValue("@civilStatus", dr["civilStatus"]);
                            cmd.Parameters.AddWithValue("@myname", dr["myname"]);
                            cmd.Parameters.AddWithValue("@spouses", dr["spouses"]);
                            cmd.Parameters.AddWithValue("@namesuffix", dr["namesuffix"]);
                            cmd.Parameters.AddWithValue("@Position", dr["Position_ENH"]);
                            cmd.Parameters.AddWithValue("@isUpdate", isNew ? 0 : 1);
                            cmd.Parameters.AddWithValue("@QueryType", 40);
                        }
                        break;
                    case 10://coowner contacts
                        foreach (DataRow dr in dt.Rows)
                        {
                            cmd.Parameters.AddWithValue("@CustomerCode", dr["Customer"]);
                            cmd.Parameters.AddWithValue("@LandlineNo", dr["Landline"]);
                            cmd.Parameters.AddWithValue("@LocalNo", dr["LocalNo"]);
                            cmd.Parameters.AddWithValue("@MobileNo", dr["MobileNo"]);
                            cmd.Parameters.AddWithValue("@EmailAdd", dr["Email"]);
                            cmd.Parameters.AddWithValue("@rownum", dr["Rowno"]);
                            cmd.Parameters.AddWithValue("@RefRownoLIN", dr["RefRownoLIN"]);
                            cmd.Parameters.AddWithValue("@RowID", dr["RowID"]);
                            cmd.Parameters.AddWithValue("@HomeOwnershipCode", dr["HomeOwnership_ENH"]);
                            cmd.Parameters.AddWithValue("@isUpdate", isNew ? 0 : 1);
                            cmd.Parameters.AddWithValue("@QueryType", 41);
                        }
                        break;
                    case 11://coowner spouse
                        foreach (DataRow dr in dt.Rows)
                        {
                            cmd.Parameters.AddWithValue("@CustomerCode", dr["customerCode"]);
                            cmd.Parameters.AddWithValue("@LastName", dr["lastName"]);
                            cmd.Parameters.AddWithValue("@FirstName", dr["firstName"]);
                            cmd.Parameters.AddWithValue("@MiddleName", dr["middleName"]);
                            cmd.Parameters.AddWithValue("@mi", dr["mi"]);
                            cmd.Parameters.AddWithValue("@Salutation", dr["salutationCode"]);
                            cmd.Parameters.AddWithValue("@Gender", dr["genderCode"]);
                            cmd.Parameters.AddWithValue("@Birthday", dr["dateofBirth"]);
                            cmd.Parameters.AddWithValue("@tin", dr["tin"]);
                            cmd.Parameters.AddWithValue("@dateOfMarriage", dr["dateOfMarriage"]);
                            cmd.Parameters.AddWithValue("@Nationality", dr["nationalityCode"]);
                            cmd.Parameters.AddWithValue("@Occupation", dr["occupationCode"]);
                            cmd.Parameters.AddWithValue("@spouseID", dr["spouseID"]);
                            cmd.Parameters.AddWithValue("@isUpdate", isNew ? 0 : 1);
                            cmd.Parameters.AddWithValue("@QueryType", 42);
                        }
                        break;
                    case 12://attorney hdr
                        foreach (DataRow dr in dt.Rows)
                        {
                            cmd.Parameters.AddWithValue("@CustomerCode", dr["Customer"]);
                            cmd.Parameters.AddWithValue("@recuser", dr["recuser"]);
                            cmd.Parameters.AddWithValue("@isUpdate", isNew ? 0 : 1);
                            cmd.Parameters.AddWithValue("@QueryType", 43);
                        }
                        break;
                    case 13://attorney lin
                        foreach (DataRow dr in dt.Rows)
                        {
                            cmd.Parameters.AddWithValue("@CustomerCode", dr["ID"]);
                            cmd.Parameters.AddWithValue("@EffectiveDateFrm", dr["EffectiveDateFrm"]);
                            cmd.Parameters.AddWithValue("@EffectiveDateTo", dr["EffectiveDateTo"]);
                            cmd.Parameters.AddWithValue("@LastName", dr["LastName"]);
                            cmd.Parameters.AddWithValue("@FirstName", dr["FirstName"]);
                            cmd.Parameters.AddWithValue("@MiddleName", dr["MiddleName"]);
                            cmd.Parameters.AddWithValue("@TIN", dr["TIN"]);
                            cmd.Parameters.AddWithValue("@Birthday", dr["DateofBirth"]);
                            cmd.Parameters.AddWithValue("@Age", dr["Age"]);
                            cmd.Parameters.AddWithValue("@Gender", dr["Gender"]);
                            cmd.Parameters.AddWithValue("@Nationality", dr["Nationality"]);
                            cmd.Parameters.AddWithValue("@RelationshiptotheCustomer", dr["RelationtotheCust"]);
                            cmd.Parameters.AddWithValue("@ContactDetails", dr["ContactDetails"]);
                            cmd.Parameters.AddWithValue("@HomeAddress", dr["HomeAddress"]);
                            cmd.Parameters.AddWithValue("@BusinessAddress", dr["BusinessAddress"]);
                            cmd.Parameters.AddWithValue("@rownum", dr["ROWNO"]);
                            cmd.Parameters.AddWithValue("@CivilStatus", dr["CivilStatus_ENH"]);
                            cmd.Parameters.AddWithValue("@isUpdate", isNew ? 0 : 1);
                            cmd.Parameters.AddWithValue("@QueryType", 44);
                        }
                        break;
                    case 14://attorney contacts
                        foreach (DataRow dr in dt.Rows)
                        {
                            cmd.Parameters.AddWithValue("@CustomerCode", dr["ID"]);
                            cmd.Parameters.AddWithValue("@LandlineNo", dr["LandlineNo"]);
                            cmd.Parameters.AddWithValue("@LocalNo", dr["LocalNo"]);
                            cmd.Parameters.AddWithValue("@MobileNo", dr["MobileNo"]);
                            cmd.Parameters.AddWithValue("@EmailAdd", dr["EmailAddress"]);
                            cmd.Parameters.AddWithValue("@rownum", dr["ROWNO"]);
                            cmd.Parameters.AddWithValue("@isUpdate", isNew ? 0 : 1);
                            cmd.Parameters.AddWithValue("@QueryType", 45);
                        }
                        break;
                    case 15://preference hdr
                        foreach (DataRow dr in dt.Rows)
                        {
                            cmd.Parameters.AddWithValue("@CustomerCode", dr["customerCode"]);
                            cmd.Parameters.AddWithValue("@Status", dr["status"]);
                            cmd.Parameters.AddWithValue("@recuser", dr["recuser"]);
                            cmd.Parameters.AddWithValue("@isUpdate", isNew ? 0 : 1);
                            cmd.Parameters.AddWithValue("@QueryType", 56);
                        }
                        break;
                    case 16://preference lin
                        foreach (DataRow dr in dt.Rows)
                        {
                            cmd.Parameters.AddWithValue("@CustomerCode", dr["customerCode"]);
                            cmd.Parameters.AddWithValue("@ReasonForBuying", dr["ReasonForBuying"]);
                            cmd.Parameters.AddWithValue("@ReasonForBuyingOthers", dr["ReasonForBuyingOthers"]);
                            cmd.Parameters.AddWithValue("@DesiredProperty", dr["DesiredProperty"]);
                            cmd.Parameters.AddWithValue("@DesiredPropertyOthers", dr["DesiredPropertyOthers"]);
                            cmd.Parameters.AddWithValue("@SourceOfAwareness", dr["SourceOfAwareness"]);
                            cmd.Parameters.AddWithValue("@SourceOfAwarenessOthers", dr["SourceOfAwarenessOthers"]);
                            cmd.Parameters.AddWithValue("@PriceRange", dr["PriceRange"]);
                            cmd.Parameters.AddWithValue("@isRecommended", dr["isRecommended"]);
                            cmd.Parameters.AddWithValue("@Name", dr["Name"]);
                            cmd.Parameters.AddWithValue("@MobileNo", dr["MobileNo"]);
                            cmd.Parameters.AddWithValue("@EmailAdd", dr["Email"]);
                            cmd.Parameters.AddWithValue("@isUpdate", isNew ? 0 : 1);
                            cmd.Parameters.AddWithValue("@QueryType", 57);
                        }
                        break;
                }
                //cmd.ExecuteNonQuery();
                res = base.ExecProcedure(cmd, _ConnectionString);
            }

            return res;
        }

        public string DeleteData(string Code)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[PRT].[nsp_SBCustomerMasterFile]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@CustomerCode", Code);
            cmd.Parameters.AddWithValue("@QueryType", 3);
            return base.ExecProcedure(cmd, _ConnectionString);
        }
        public string DeleteDesiredProperty(string custcode)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[PRT].[nsp_SBCustomerMasterFile]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@CustomerCode", custcode);
            cmd.Parameters.AddWithValue("@QueryType", 54);
            return base.ExecProcedure(cmd, _ConnectionString);
        }
        public string InsertDesiredProperty(string Code, string custcode, int isdelete)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[PRT].[nsp_SBCustomerMasterFile]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Code", Code);
            cmd.Parameters.AddWithValue("@CustomerCode", custcode);
            cmd.Parameters.AddWithValue("@isDelete", isdelete);
            cmd.Parameters.AddWithValue("@QueryType", 55);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public string ProcessData(string code )//, string password, string customername)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[PRT].[nsp_SBCustomerMasterFile]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@CustomerCode", code);
            //cmd.Parameters.AddWithValue("@password", password);
            //cmd.Parameters.AddWithValue("@registeredName", customername);
            cmd.Parameters.AddWithValue("@QueryType", 4);
            return base.ExecProcedure(cmd, _ConnectionString);
        }




        public DataTable GetDatatable(string xquery, string xconn)
        {
            return SFObjects.LoadDataTable(xquery, xconn);
        }


        public string getBranchID = string.Format("SELECT Code,Description FROM SG.LOCATIONACCOUNTABLEFORMS");
        // public string getVIPType = string.Format("SELECT Code,Description FROM RE.VIPType ORDER BY code ASC");
        public string GetSalutation = string.Format("SELECT Code,Description FROM SG.Salutation");
        public string getNationality = string.Format("SELECT Code,Description FROM SG.Nationality");
        public string getGender = string.Format("SELECT Code, Description FROM SG.Gender");
        // public string getCivilStatus = string.Format("SELECT Code, Description FROM SG.CIVILSTATUS");
        public string getNameSuffix = string.Format("SELECT Code, Description FROM SG.NameSuffix");
        public string getSourceOfIncome = string.Format("SELECT Code, Description FROM RE.SourceofIncome");
        public string getPaymentOption = string.Format("SELECT Code, Description FROM RE.PreferredPaymentOption");


        public DataTable cmbCountryOther()
        {
            return SFObjects.LoadDataTable($@"EXEC [PRT].[nsp_SBCustomerMasterFile] @QueryType = 20", _ConnectionString);
        }
        public string getCivilStatus(string code)
        {

            return string.Format($@"EXEC [PRT].[nsp_SBCustomerMasterFile] @QueryType = 11, @salutation='{code}'", _ConnectionString);

            //return string.Format($@"EXEC [PRT].[nsp_SBCustomerMasterFile] @QueryType = 23, @custtagging='{vip}'", _ConnectionString);
        }
        public string getCustClass()
        {

            return string.Format($@"EXEC [PRT].[nsp_SBCustomerMasterFile] @QueryType = 30", _ConnectionString);

            //return string.Format($@"EXEC [PRT].[nsp_SBCustomerMasterFile] @QueryType = 23, @custtagging='{vip}'", _ConnectionString);
        }
        public string getVIPType(string custTag)
        {
            return string.Format($@"SELECT Code,Description FROM RE.VIPType ORDER BY code ASC", _ConnectionString);
        }

        public int getStatus(string Code)
        {
            string sql = string.Format($@"SELECT RecordStatus FROM RE.CustomerMasterFile WHERE CustomerCode = '{Code}'");
            return Parser.ParseInt(SFObjects.returnText(sql, _ConnectionString));
        }



        public string getVIP(string Code)
        {
            return string.Format($@"SELECT VIP FROM RE.CustomerMasterFile WHERE CustomerCode = '{Code}'");
        }


        public string getOthers(string Code)
        {
            return string.Format($@"SELECT Remarks FROM RE.SaleSource WHERE code = '{Code}'");
        }
        public string getstatus(string Code)
        {
            string sql = string.Format(@"SELECT a.CivilStatus FROM re.CustomerMasterFile a 
                           LEFT JOIN re.cust_SpouseInformation b ON a.CustomerCode = b.CustomerCode WHERE a.CustomerCode = '{0}' AND a.CivilStatus = '02' AND (a.LastName != '' OR a.FirstName != '')", Code);
            string a = SFObjects.returnText(sql, _ConnectionString);
            return a;
        }


        public bool getspousee(string code)
        {

            string a = SFObjects.returnText(string.Format(@"SELECT COUNT(CustomerCode) FROM [RE].[cust_SpouseInformation] WHERE CustomerCode = '{0}'", code), _ConnectionString);
            int checker = int.Parse(a);
            if (checker > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool checkCompany(string Company) //LAM
        {
            return Parser.ParseInt(SFObjects.returnText(string.Format($@"exec [PRT].[nsp_SBCustomerMasterFile] @Querytype = 21, @Company = '{Company}'"), _ConnectionString)).Equals(1);
        }

        public DataTable CheckCustomer(string lastname, string firstname, string bday) //LAM
        {
            return SFObjects.LoadDataTable(string.Format($@"exec [PRT].[nsp_SBCustomerMasterFile] @Querytype = 22, @LastName = '{lastname}', @FirstName = '{firstname}', @Birthday = '{bday}'"), _ConnectionString);
        }

        public DataTable getDesc()
        {
            string sql = string.Format(@"
                                  SELECT ''[Code],'' [Description] UNION all
                                    SELECT Code,Description FROM RE.SaleSource");
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public DataTable getDesc1()
        {
            string sql = string.Format(@"SELECT ''[Code],'' [Description] UNION all
                    SELECT Code,Description FROM RE.SourceofPayment");
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }


        public DataTable getDesc2()
        {
            string sql = string.Format(@"SELECT ''[Code],'' [Description] UNION all
                    SELECT Code,Description FROM RE.PreferredPaymentOption");
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public DataTable getDesc3()
        {
            string sql = string.Format(@"SELECT ''[Code],'' [Description] UNION all
                    SELECT Code,Description FROM RE.VIPType");
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public string GetData(string recuser,string nwCustno)
        {
            string a = string.Format($"exec [PRT].[nsp_SBCustomerMasterFile] @Querytype = 0, @recuser = '{recuser}', @CustomerCode = '{nwCustno}'");

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            return a;
        }

        public string GetDataCust(string nwCustno)
        {
            string a = string.Format($"SELECT * FROM [RE].[fn_CustomerMasterFile_getData]('{nwCustno}')");

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            return a;
        }

        public string GetFileServerPath()
        {

            string sql = @"SELECT Value + '\' FROM dbo.SystemConfig WHERE Code = 'FILE_SERVER'";

            return SFObjects.returnText(sql, _ConnectionString);

        }
        public string GetFileServerURL()
        {
            string sql = "SELECT Value + '/Printing/' FROM dbo.SystemConfig WHERE Code = 'Server_Link'";

            return SFObjects.returnText(sql, _ConnectionString);
        }

        public string getDesc5()
        {
            string sql = string.Format(@"SELECT Code,Description FROM [SG].[Occupation] ORDER BY Description ASC");
            return sql;
            //return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public string getEsubType()
        {
            string sql = string.Format(@"SELECT Code, Description FROM SG.EmploymentSubType");
            return sql;
        }

        public string getCustTagging()
        {
            string sql = string.Format(@"SELECT Code, Description , vvip FROM RE.SBcustTagging");
            return sql;
        }


        public int getCustomerAddress(string Code)
        {
            return Parser.ParseInt(SFObjects.returnText(string.Format($@"SELECT DISTINCT 1 FROM RE.cust_CustomerAddressHDR WHERE customerCode ='{Code}' and status IN (SELECT Code FROM SG.LegendStatus WHERE posted = 1)"), _ConnectionString));
        }

        public int getCustomerContact(string Code)
        {
            return Parser.ParseInt(SFObjects.returnText(string.Format($@"SELECT DISTINCT 1 FROM RE.cust_ContactInformationHDR WHERE customerCode ='{Code}' and  status IN (SELECT Code FROM SG.LegendStatus WHERE posted = 1)"), _ConnectionString));
        }



        public int GetEmploymentInfo(string Code)
        {
            return Parser.ParseInt(SFObjects.returnText(string.Format($@"SELECT DISTINCT 1 FROM RE.cust_EmploymentInformationHDR WHERE customerCode ='{Code}' and  status IN (SELECT Code FROM SG.LegendStatus WHERE posted = 1)"), _ConnectionString));
        }

        public int getSpouseData(string Code)
        {
            return Parser.ParseInt(SFObjects.returnText(string.Format($@"EXEC RE.nsp_cust_SpouseInformation @QueryType = 6 , @CustomerCode = '{Code}'"), _ConnectionString));
        }
        public int getAttorneyInFact(string Code)
        {
            return Parser.ParseInt(SFObjects.returnText(string.Format($@"SELECT top 1 1  FROM re.AttorneyinfactInfoLIN where ID = '{Code}'"), _ConnectionString));
        }


        public int getUpdateType(string Code)
        {
            return Parser.ParseInt(SFObjects.returnText(string.Format($@"EXEC [PRT].[nsp_SBCustomerMasterFile] @QueryType = 7 , @recuser = '{Code}'"), _ConnectionString));
        }

        public int ifExisting(string refCode,string tin,string bday)
        {
            return Parser.ParseInt(SFObjects.returnText(string.Format(@"SELECT 1 FROM re.CustomerMasterFile WHERE CustomerCodeCrossReference  = '{0}' AND TIN='{1}' AND Birthday='{2}' AND RecordStatus IN  (SELECT code FROM SG.LegendStatus WHERE posted =1)", refCode, tin, bday), _ConnectionString));
        }

        public string chkID(string regname, string bday)
        {
            return SFObjects.returnText(string.Format($@"EXEC [PRT].[nsp_SBCustomerMasterFile] @QueryType = 19 , @RegisteredName = '{regname}', @Birthday = '{bday}'"), _ConnectionString);
        }

        //LAM

        //LAM
        public string saveImage(string CustomerCode, string path)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[PRT].[nsp_SBCustomerMasterFile]";
            cmd.Parameters.AddWithValue("@CustomerCode", CustomerCode);
            cmd.Parameters.AddWithValue("@imageFilePath", path);
            cmd.Parameters.AddWithValue("@QueryType", 24);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public string saveSignature(string CustomerCode, string path)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[PRT].[nsp_SBCustomerMasterFile]";
            cmd.Parameters.AddWithValue("@CustomerCode", CustomerCode);
            cmd.Parameters.AddWithValue("@signatureFilepath", path);
            cmd.Parameters.AddWithValue("@QueryType", 26);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public string getCustomerImagePath(string CustomerCode)
        {
            string sql = $"Exec [PRT].[nsp_SBCustomerMasterFile] @Querytype =25 , @CustomerCode='{CustomerCode}'";
            return SFObjects.returnText(sql, _ConnectionString);
        }
        public string getCustomerSignaturePath(string CustomerCode)
        {
            string sql = $"Exec [PRT].[nsp_SBCustomerMasterFile] @Querytype =27 , @CustomerCode='{CustomerCode}'";
            return SFObjects.returnText(sql, _ConnectionString);
        }

        public string validateTIN(string CustomerCode, string TIN)
        {
            string sql = $"Exec [PRT].[nsp_SBCustomerMasterFile] @Querytype =31 , @CustomerCode='{CustomerCode}', @TIN = '{TIN}'";
            return SFObjects.returnText(sql, _ConnectionString);
        }
        //public string validateTINSpouse(string TIN)
        //{
        //    string sql = $"Exec [PRT].[nsp_SBCustomerMasterFile] @Querytype =31 , @CustomerCode='{CustomerCode}', @TIN = '{TIN}'";
        //    return SFObjects.returnText(sql, _ConnectionString);
        //}

        public string validateAcctCorp(string TIN)
        {
            string sql = $"SELECT CustomerCode FROM RE.CustomerMasterFile WHERE TIN = '{TIN}' OR VatREGTin='{TIN}' OR NonVatRegTin='{TIN}' AND RecordStatus IN (SELECT code FROM SG.LegendStatus WHERE posted = 1 or forEntry = 1)";
            return SFObjects.returnText(sql, _ConnectionString);
        }

        public string ValidateVATReg(string CustomerCode, string TIN, int qtype)
        {
            string sql = $"Exec [PRT].[nsp_SBCustomerMasterFile] @Querytype ={qtype} , @CustomerCode='{CustomerCode}', @VatREGTin = '{TIN}'";
            return SFObjects.returnText(sql, _ConnectionString);
        }
        public string ServerLink()
        {
            return SFObjects.returnText($"SELECT a.Value FROM dbo.SystemConfig a WHERE Code = 'Server_Link'", _ConnectionString);
        }

        public string getUpdateAccess(string RecUser)
        {
            return SFObjects.returnText(string.Format(@"SELECT EmployeeCode FROM RE.UpdateDetailsUserAccessAssignLIN
            WHERE EmployeeCode='{0}' AND 
            ID = (SELECT ID FROM RE.UpdateDetailsUserAccessAssignHDR WHERE UpdateType='Customer')", RecUser), _ConnectionString);
        }

        public string GetSalutationData(string code)
        {
            string a = string.Format(@"Exec [PRT].[nsp_SBCustomerMasterFile] @Querytype =28 , @Salutation='{0}'", code);

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            return a;
        }
        public string Serverlink()
        {
            return SFObjects.returnText(@"SELECT [Value] FROM [dbo].[SystemConfig] where [code]='Server_Link'", _ConnectionString);
        }


        public string lugDesiredProperty(string code)
        {
            string sql = "EXEC " + spName + " @QueryType =53 ,@CustomerCode= '" + code + "'";
            return string.Format(sql, _ConnectionString);
        }



        public string hasSavedRqrdCompli(string docno)
        {

            return SFObjects.returnText($@"SELECT [DC].[fn_ChkIfHasReqComplianceAll]('{docno}')", _ConnectionString);
        }





    }




    public static class Patterns
    {
        public static string date = @"\d{2}[\//]\d{2}[\//]\d{4}";
        public static string sss = @"\d{2}[\-]\d{7}[\-]\d{1}";
        public static string tin = @"\d{3}[\-]\d{3}[\-]\d{3}[\-]\d{4}";
        public static string umid = @"CRN[\-]\d{4}[\-]\d{7}[\-]\d{1}";
        public static string pagibig = @"\d{4}[\-]\d{4}[\-]\d{4}";
        public static string philhealth = @"\d{2}[\-]\d{9}[\-]\d{1}";
    }

}