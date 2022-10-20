using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;

namespace DataAccessLayers
{
    public class SAModuleWebDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        private string _ConnectionString;
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "Code",                                       //--column for searching
                                inquireQry = "Select Code, Description from [FG].[UOMMaster]", //--query of inquire button
                                listingName = "Web Modules Listing",                              //--form name of listings
                                toolboxQRY = "Select * from [FPTI_NW].[noahweb_Application_Info]",
                                listingQry = "select Code, Description, Recuser as [Created by], recdate as [Date Created], moduser as [Modified by], moddate as [Date Modified] from [FG].[UOMMaster]"; //--query of export and print
        public readonly int listingStartRow = 6;                                       //--default start row

        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator

        public SAModuleWebDAL(string ConnectionString, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            this.CurrentSelectedItem = selectedItem;
        }

        public string ConnectionString { get { return _ConnectionString; } }

        public DataTable LoadCbo()
        {
            DataTable dt = SFObjects.LoadDataTable("SELECT [Code],[Description] FROM [FPTI].[Module]", _ConnectionString);
            DataRow dr = dt.NewRow();
            dr["Code"] = "CUSTOM";
            dr["Description"] = "CUSTOM";
            dt.Rows.InsertAt(dr,0);

            return dt;
        }

        public DataTable GetSchema()
        {
            return SFObjects.LoadDataTable("select * from [FPTI_NW].[noahweb_Application_Info] where 1 != 1", _ConnectionString);
        }

        public string SaveData(System.Data.DataTable dt, bool isNew)
        {
            List<SqlCommand> cmdList = new List<SqlCommand>();

            SqlCommand cmd = new SqlCommand();
            if (dt.Rows.Count >= 1)
            {
                cmd.Parameters.Clear();
                cmd.CommandText = "[FPTI_NW].[nsp_noahweb_Application_Info]";
                cmd.Parameters.AddWithValue("@code", dt.Rows[0]["code"]);
                cmd.Parameters.AddWithValue("@description", dt.Rows[0]["description"]);
                cmd.Parameters.AddWithValue("@apppath", dt.Rows[0]["apppath"]);
                cmd.Parameters.AddWithValue("@AppLink", dt.Rows[0]["AppLink"]);
                cmd.Parameters.AddWithValue("@AppName", dt.Rows[0]["AppName"]);
                cmd.Parameters.AddWithValue("@icon", dt.Rows[0]["icon"]);
                cmd.Parameters.AddWithValue("@User", dt.Rows[0]["userCreated"]);
                cmd.Parameters.AddWithValue("@QueryType", isNew ? 1 : 2);
                cmdList.Add(cmd);

            }
            return base.ExecProcedure(cmdList, _ConnectionString);
        }

        public string DeleteData(string Code)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nsp_noahweb_Application_Info]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@code", Code);
            cmd.Parameters.AddWithValue("@QueryType", 3);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public DataTable GetALLItems()
        {
            return SFObjects.LoadDataTable("SELECT [code] as [Module Code], [AppName] as [Application Name], [description] as [Module Descrition], [AppLink] as [Application Link], [userCreated] as [RecUser], [datecreated] as [RecDate], [userModified] as [ModUser], [datemodified] as [ModDate] FROM [FPTI_NW].[noahweb_Application_Info]", _ConnectionString);
        }

        public string GetFullname(string xuserid)
        {
            return SFObjects.returnText(string.Format("SELECT [Description] FROM [FPTI].[User] WHERE [Code]='{0}'", xuserid), _ConnectionString);
        }
    }
}
