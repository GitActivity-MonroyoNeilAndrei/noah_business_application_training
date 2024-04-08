using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;

//using NoahWebLib;


namespace DataAccessLayers
{
    public class NOAHBRCreatorDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
       
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "Code",                                       //--column for searching
                                inquireQry = "Select Code, Description from [FG].[UOMMaster]", //--query of inquire button
                                listingName = "FG UOM Listing",                              //--form name of listings
                                listingQry = "select Code, Description, Recuser as [Created by], recdate as [Date Created], moduser as [Modified by], moddate as [Date Modified] from [FG].[UOMMaster]"; //--query of export and print
        public readonly int listingStartRow = 6;                                       //--default start row

        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator

        private string _ConnectionStringNOAH;
        private string _ConnectionStringARK = "";
        #region STANDARD

        public string MenuItemCode = "NWADMIN_ACCOUNT"; // This is default parameter  for version
        public string MenuItemVersion = "9.0.0.1";// This is default parameter for version 
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
                , _ConnectionStringNOAH);
            return StrMessage;
            #endregion
        }

        #endregion

        
        public NOAHBRCreatorDAL(string ConnectionStringNOAH, string ConnectionStringARK, string selectedItem)
        {
            _ConnectionStringNOAH = ConnectionStringNOAH;
            _ConnectionStringARK = ConnectionStringARK;
            this.CurrentSelectedItem = selectedItem;
        }

    


        public DataSet getComponents()
        {
            DataSet ds = new DataSet();
            ds = SFObjects.LoadDataSet(string.Format(@"exec [SCMS].[nsp_BRCreator] @QueryType = 20"), _ConnectionStringARK);


            return ds;
        }


    }
}
