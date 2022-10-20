using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;


namespace DataAccessLayers
{
    public class SAMenuItemDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        private string _ConnectionString;
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "Code",                                       //--column for searching
                                inquireQry = "Select Code, Description from [FG].[UOMMaster]", //--query of inquire button
                                listingName = "FG UOM Listing",                              //--form name of listings
                                listingQry = "select Code, Description, Recuser as [Created by], recdate as [Date Created], moduser as [Modified by], moddate as [Date Modified] from [FG].[UOMMaster]"; //--query of export and print
        public readonly int listingStartRow = 6;                                       //--default start row

        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator
        public string GETCOMPANY = "SELECT Description FROM fpti.Company where code = '{0}'";

        public SAMenuItemDAL(string ConnectionString, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            this.CurrentSelectedItem = selectedItem;
        }

        public string ConnectionString { get { return _ConnectionString; } }

        public DataTable GetSchema()
        {
            return SFObjects.LoadDataTable("select * from FPTI_NW.noahweb_menuItems_Info where 1 != 1", _ConnectionString);
        }

        public DataTable GetSchemaLin()
        {
            return SFObjects.LoadDataTable("select * from  FPTI_NW.noahweb_menuItems_InfoParameters where 1 != 1", _ConnectionString);
        }

        public bool isNewRec(string code)
        {

            string xquery = string.Format(@"select 1 from FPTI_NW.noahweb_menuItems_Info
                                                   where code='{0}'", code);

            if (SFObjects.returnText(xquery, _ConnectionString) == "1")
                return false;
            else
                return true;
        }

        public string SaveData(System.Data.DataTable dt, DataTable dtLin, bool isNew)
        {
            List<SqlCommand> cmdList = new List<SqlCommand>();

            SqlCommand cmd = new SqlCommand();
            string code = "";
            if (dt.Rows.Count >= 1)
                code = dt.Rows[0]["Code"].ToString();

            cmd.Parameters.Clear();
            cmd.CommandText = "[FPTI_NW].[nsp_noahweb_menuItems_Info]";
            cmd.Parameters.AddWithValue("@Code", code);
            cmd.Parameters.AddWithValue("@Description", dt.Rows[0]["Description"]);
            cmd.Parameters.AddWithValue("@link", dt.Rows[0]["link"]);
            cmd.Parameters.AddWithValue("@RecUser", dt.Rows[0]["UserCreated"]);
            cmd.Parameters.AddWithValue("@Datecreated", dt.Rows[0]["Datecreated"]);
            cmd.Parameters.AddWithValue("@Moduser", dt.Rows[0]["Usermodified"]);
            cmd.Parameters.AddWithValue("@Datemodified", dt.Rows[0]["Datemodified"]);
            cmd.Parameters.AddWithValue("@OtherApp", dt.Rows[0]["OtherApplication"]);
            cmd.Parameters.AddWithValue("@ExeVersion", dt.Rows[0]["exeversion"]);
            cmd.Parameters.AddWithValue("@ExeVersionModule", dt.Rows[0]["exeversionmodule"]);
            cmd.Parameters.AddWithValue("@Icon", dt.Rows[0]["icon"]);
            cmd.Parameters.AddWithValue("@QueryType", isNew ? 1 : 2);
            cmdList.Add(cmd);

           string strUpdate=  SFObjects.returnText(string.Format(@" Update [FPTI_NW].[noahweb_menuDriven] set [ItemName]='{1}'
                                        where [ItemType] = '1' and itemID = '{0}' ", code, dt.Rows[0]["Description"]), ConnectionString);


            if (!isNew)
            {
                cmd = new SqlCommand();
                cmd.Parameters.Clear();
                cmd.CommandText = "[FPTI_NW].[nsp_noahweb_menuItems_Info_Lin]";
                cmd.Parameters.AddWithValue("@Code", code);
                cmd.Parameters.AddWithValue("@QueryType", 3);
                cmdList.Add(cmd);
            }

            foreach (DataRow drLin in dtLin.Rows)
            {
                cmd = new SqlCommand();
                cmd.Parameters.Clear();
                cmd.CommandText = "[FPTI_NW].[nsp_noahweb_menuItems_Info_Lin]";
                cmd.Parameters.AddWithValue("@Code", code);
                cmd.Parameters.AddWithValue("@paramter", drLin["parameter"]);
                cmd.Parameters.AddWithValue("@Value", drLin["Value"]);
                cmd.Parameters.AddWithValue("@defaultvalue", drLin["defaultvalue"]);
                cmd.Parameters.AddWithValue("@valuetype", drLin["valuetype"]);
                cmd.Parameters.AddWithValue("@ParameterType", drLin["Parametertype"]);
                cmd.Parameters.AddWithValue("@ParameterFormat", drLin["ParameterFormat"]);
                cmd.Parameters.AddWithValue("@QueryType", 1);
                cmdList.Add(cmd);
            }



            return base.ExecProcedure(cmdList, _ConnectionString);
        }

        public string DeleteData(string Code)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nsp_noahweb_menuItems_Info]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Code", Code);
            cmd.Parameters.AddWithValue("@QueryType", 3);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        //public System.Data.DataTable GetData()
        //{
        //    SqlCommand cmd = new SqlCommand();
        //    cmd.CommandText = "[FG].[nsp_UOMMaster]";
        //    cmd.Parameters.Clear();
        //    cmd.Parameters.AddWithValue("@QueryType", 0);
        //    return base.ExecGetData(cmd, _ConnectionString, true);
        //}

        public System.Data.DataTable combobox()
        {
            return SFObjects.LoadDataTable("Select 'CUSTOM' as code union  select   code  from FPTI.Module", _ConnectionString);
        }

        public System.Data.DataTable GetDataExport()
        {
            //SqlCommand cmd = new SqlCommand();
            //cmd.CommandText = "[FPTI_NW].[nsp_noahweb_menuItems_Info]";
            //cmd.Parameters.Clear();
            //cmd.Parameters.AddWithValue("@QueryType", 0);
            //return base.ExecGetData(cmd, _ConnectionString, true);

            string Export = @"select a.Code,
                               a.Description,
                               a.Link,
	                           a.Version,
	                           b.Description [Created By],
                               FORMAT(a.datecreated, 'MM/dd/yyyy HH:mm:ss tt') [Date Created],
	                           c.Description [Modified By],
                               FORMAT(a.datemodified, 'MM/dd/yyyy HH:mm:ss tt') [Date Modified] 
	                           FROM [FPTI_NW].[noahweb_menuItems_Info] a
	                           LEFT JOIN FPTI.[User] b ON b.Code = a.userCreated
	                           LEFT JOIN FPTI.[User] c ON c.Code = a.userModified
	                           ORDER BY ISNULL(a.datemodified, a.datecreated) DESC";

            return SFObjects.LoadDataTable(Export, _ConnectionString);

        }

        public System.Data.DataTable GetDataCopyFrom(string c)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nsp_noahweb_menuItems_Info_Lin]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Code", c);
            cmd.Parameters.AddWithValue("@QueryType", 4);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }

    }
}
