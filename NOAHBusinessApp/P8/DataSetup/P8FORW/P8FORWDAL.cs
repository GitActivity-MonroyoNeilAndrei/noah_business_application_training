using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;
using System.Linq;
using NoahWebLib.Security;
using System.Threading.Tasks;

namespace DALComponent
{
    public class P8FORWDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        #region STANDARD

        public string MenuItemCode = "P8FORW"; // This is default parameter  for version
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
        private string focusRecordPK;
        private string _ConnectionString;
        private string _ConnectionString2;
        private string _ConnectionStringCoreDB;
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "Code";                                      //--column for searching

        private SqlTransaction sqlTrn;
        private SqlConnection sqlConn = new SqlConnection();

        //#FOR EXPORT
        public string LISTINGFILENAME = "Basic Information", GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END


        public string CurrentSelectedItem;                                             //-- selected item in binding navigator
        private string sp_forw = "[P8].[nsp_FORW]";
        private string sp_datasource = "[P8].[nsp_DataSource]";
        private SqlConnection conn;
        private SqlTransaction tran;

        public P8FORWDAL(string ConnectionString, string ConnectionString2,string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }


        public string GetDBName(string connstring)
        {
            string str = $@"select db_name()";
            return SFObjects.returnText(str, connstring);
        }
        public DateTime getcurrentdatetime()
        {
            string str = $@"select dbo.getnoahdate()";
            return Convert.ToDateTime(SFObjects.returnText(str, _ConnectionStringCoreDB));
        }

        public DataTable getDataGrid_datasource()
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = sp_datasource;
            cmd.Parameters.AddWithValue("@QueryType", 100);
            return base.ExecGetData(cmd, _ConnectionString);
        }
        public DataTable getDataGrid_datasourcepsh(string DataSourceID)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = sp_datasource;
            cmd.Parameters.AddWithValue("@DataSourceID", DataSourceID);
            cmd.Parameters.AddWithValue("@QueryType", 20);
            return base.ExecGetData(cmd, _ConnectionString);
        }
        public DataTable getDataGrid_datasourcer(string DataSourceID)
        {
            string str = "";
            DataTable dt = new DataTable();
            try
            {
                str = $@"SELECT cc.UserID[Code],isnull(u.Description,cc.UserID)[User] from dbo.Rights cc 
                        left join {GetDBName(_ConnectionString2)}.FPTI.[User] u on u.Code = cc.UserID and isnull(u.AccountDisabled,0) = 0
                        where cc.DataSourceID = '{DataSourceID}'";
                dt = SFObjects.LoadDataTable(str, _ConnectionString);
            }
            catch { }
            return dt;
        }

        public DataTable getDataGrid_datasourcepsldefault(string Connectivity,string SourceType, string Source)
        {
            string conn = getConnectivity(Connectivity);
            string str = "";
            DataTable dt = new DataTable();
            //try
            //{
            //    if (SourceType == "P")
            //    {
                    str = $@"SELECT  '0'[include],replace(p.name,'@','')[param],replace(p.name,'@','')[description],''[initialvalue]
		                        FROM sys.objects cc
		                        join sys.schemas sc on sc.schema_id = cc.schema_id
		                        join sys.parameters p ON p.object_id = cc.object_id
		                        WHERE cc.type = '{SourceType}'
		                        and sc.name + '.' + cc.name = replace(replace('{Source}','[',''),']','')
		                        and p.name not in('@QueryType')";
                //}else
                //{
                    //str = $@"SELECT  '0'[include],replace(p.name,'@','')[param],replace(p.name,'@','')[description],''[initialvalue]
		                  //      FROM sys.objects cc
		                  //      join sys.schemas sc on sc.schema_id = cc.schema_id
		                  //      join sys.columns p ON p.object_id = cc.object_id
		                  //      WHERE cc.type = '{SourceType}'
		                  //      and sc.name + '.' + cc.name = replace(replace('{Source}','[',''),']','')";
                //}
                dt = SFObjects.LoadDataTable(str, conn);
            //}
            //catch { }
            return dt;
        }

        public DataTable getDataGrid_datasourcepscdefault(string Connectivity, string SourceType, string Source,string SubType)
        {
            string conn = getConnectivity(Connectivity);
            string str = "";
            DataTable dt = new DataTable();
            if (SourceType == "P")
            {
                string query = $@"SELECT concat('exec '+cc.TableName,' ','@'+hdr.MainParam,'=',
                            case when isnull(hdr.MainParamValue,'') = '' then 'null' else ''''+hdr.MainParamValue+'''' end,isnull(lin.param,''))[sqlquery] 
                            from dbo.DataAccessibility cc
                            join dbo.DataSourceTypeHdr hdr on hdr.DataSourceID = cc.DataSourceID
                            outer apply(SELECT distinct stuff((
                            SELECT concat(',@',lin.Param,'=',case when isnull(lin.InitialValue,'') = '' then 'null' else ''''+lin.InitialValue+'''' end) 
                            from dbo.DataSourceTypeLin lin where (Include = '1' or isnull(InitialValue,'') <> '')
                            and lin.SubType = hdr.SubType
                            FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 0, '') [param]) lin
                            where hdr.SubType = '{SubType}'";
                string spquery = SFObjects.returnText(query, _ConnectionString);
                try
                {
                    if (!string.IsNullOrWhiteSpace(spquery))
                    {
                        DataTable dtdata = SFObjects.LoadDataTable(spquery, conn);
                        if (dtdata != null)
                        {
                            dt.Columns.Add("include", typeof(string));
                            dt.Columns.Add("column", typeof(string));
                            dt.Columns.Add("alias", typeof(string));

                            DataTable dtdataclone = dtdata.Clone();
                            foreach (DataColumn dc in dtdataclone.Columns)
                            {
                                string column = dc.ColumnName;
                                DataRow dr = dt.NewRow();
                                dr["include"] = "0";
                                dr["column"] = column;
                                dr["alias"] = column;
                                dt.Rows.Add(dr);
                            }
                            dt.AcceptChanges();
                        }
                    }
                }
                catch { }
            }
            else
            {
                str = $@"SELECT  '0'[include],replace(p.name,'@','')[column],replace(p.name,'@','')[alias]
                  FROM sys.objects cc
                  join sys.schemas sc on sc.schema_id = cc.schema_id
                  join sys.columns p ON p.object_id = cc.object_id
                  WHERE cc.type = '{SourceType}'
                  and sc.name + '.' + cc.name = replace(replace('{Source}','[',''),']','')";
                dt = SFObjects.LoadDataTable(str, conn);
            }
            return dt;
        }
        public DataTable getDataGrid_datasourcepsc(string SubType)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = sp_datasource;
            cmd.Parameters.AddWithValue("@SubType", SubType);
            cmd.Parameters.AddWithValue("@QueryType", 60);
            return base.ExecGetData(cmd, _ConnectionString);
        }

        public DataTable getDataGrid_datasourcepsl(string SubType)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = sp_datasource;
            cmd.Parameters.AddWithValue("@SubType", SubType);
            cmd.Parameters.AddWithValue("@QueryType", 30);
            return base.ExecGetData(cmd, _ConnectionString);
        }
        public DataTable getDataGrid_datasourcecolumn()
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = sp_datasource;
            cmd.Parameters.AddWithValue("@QueryType", 120);
            return base.ExecGetData(cmd, _ConnectionString);
        }


        //Data Source
        public string getlicensetype()
        {
            string str = $@"exec {sp_datasource} @QueryType=33";
            return SFObjects.returnText(str, _ConnectionString);
        }
        public string getlugdatasourceadddataconnectivity()
        {
            string str = $@"exec {sp_datasource} @QueryType=130";
            return str;
        }
        public string getlugsourcetype()
        {
            string str = $@"exec {sp_datasource} @QueryType=111";
            return str;
        }
        public DataTable getlugSource(string Connectivity,string SourceType)
        {
            string conn = getConnectivity(Connectivity);
            string str = "";
            DataTable dt = new DataTable();
            try
            {
                str = $@"SELECT '['+sc.name+'].['+cc.name+']'[Code],'['+sc.name+'].['+cc.name+']'[Source]
		                            FROM sys.objects cc
		                            join sys.schemas sc on sc.schema_id = cc.schema_id
		                            WHERE cc.type = '{SourceType}'
		                            and cc.name is not null and cc.schema_id is not null";
                dt = SFObjects.LoadDataTable(str, conn);
            }catch { }
            return dt;
        }

        public DataTable getDefParameter(string Connectivity, string SourceType, string Source)
        {
            string conn = getConnectivity(Connectivity);
            string str = "";
            DataTable dt = new DataTable();
            try
            {
                if (SourceType == "P")
                {
                    str = $@"SELECT replace(p.name,'@','')[Code],replace(p.name,'@','')[Parameter]
		                        FROM sys.objects cc
		                        join sys.schemas sc on sc.schema_id = cc.schema_id
		                        join sys.parameters p ON p.object_id = cc.object_id
		                        WHERE cc.type = '{SourceType}'
		                        and sc.name + '.' + cc.name = replace(replace('{Source}','[',''),']','')
                                and replace(p.name,'@','') = 'QueryType'";
                }
                else
                {
                    str = $@"SELECT replace(p.name,'@','')[Code],replace(p.name,'@','')[Parameter]
		                        FROM sys.objects cc
		                        join sys.schemas sc on sc.schema_id = cc.schema_id
		                        join sys.columns p ON p.object_id = cc.object_id
		                        WHERE cc.type = '{SourceType}'
		                        and sc.name + '.' + cc.name = replace(replace('{Source}','[',''),']','')";
                }
                dt = SFObjects.LoadDataTable(str, conn);
            }
            catch { }
            return dt;
        }

        public DataTable getlugParameter(string Connectivity, string SourceType, string Source)
        {
            string conn = getConnectivity(Connectivity);
            string str = "";
            DataTable dt = new DataTable();
            try
            {
                if (SourceType == "P")
                {
                    str = $@"SELECT replace(p.name,'@','')[Code],replace(p.name,'@','')[Parameter]
		                        FROM sys.objects cc
		                        join sys.schemas sc on sc.schema_id = cc.schema_id
		                        join sys.parameters p ON p.object_id = cc.object_id
		                        WHERE cc.type = '{SourceType}'
		                        and sc.name + '.' + cc.name = replace(replace('{Source}','[',''),']','')";
                }else
                {
                    str = $@"SELECT replace(p.name,'@','')[Code],replace(p.name,'@','')[Parameter]
		                        FROM sys.objects cc
		                        join sys.schemas sc on sc.schema_id = cc.schema_id
		                        join sys.columns p ON p.object_id = cc.object_id
		                        WHERE cc.type = '{SourceType}'
		                        and sc.name + '.' + cc.name = replace(replace('{Source}','[',''),']','')";
                }
                dt = SFObjects.LoadDataTable(str, conn);
            }
            catch { }
            return dt;
        }
        public DataTable getluguser(string UserList)
        {
            string str = "";
            DataTable dt = new DataTable();
            try
            {
                str = $@"SELECT u.Code[Code],u.Description[User] 
                        from {GetDBName(_ConnectionString2)}.FPTI.[User] u
                        where isnull(u.AccountDisabled,0) = 0 
						and not exists(select 1 from dbo.fn_Split('|','{UserList}') where splitdata = u.Code)";
                dt = SFObjects.LoadDataTable(str, _ConnectionString);
            }
            catch { }
            return dt;
        }


        public string getdatatype()
        {
            string str = $@"exec {sp_datasource} @QueryType=112";
            return str;
        }
        
        public DataTable LoadSchema_datasource()
        {
            string str = $@"exec {sp_datasource} @QueryType=110";
            return SFObjects.LoadDataTable(str, _ConnectionString);
        }
        public DataTable LoadSchema_datasourceps()
        {
            string str = $@"exec {sp_datasource} @QueryType=19";
            return SFObjects.LoadDataTable(str, _ConnectionString);
        }
        //public DataTable LoadSchema_datasourcecolumn()
        //{
        //    string str = $@"exec {sp_datasource} @QueryType=130";
        //    return SFObjects.LoadDataTable(str, _ConnectionString);
        //}

        //Data Condition


        
        //public string getlugdataconditionvalue(string datasourceid)
        //{
        //    string str = $@"exec {sp_datasource} @datasourceid='{datasourceid}', @QueryType=212";
        //    return str;
        //}

        public string getoperation()
        {
            string str = $@"exec {sp_datasource} @QueryType=231";
            return str;
        }

        
        public DataTable getdatasourcesource(string type,string source)
        {
            //SqlCommand cmd = new SqlCommand();
            //cmd.CommandType = CommandType.StoredProcedure;
            //cmd.Parameters.Clear();
            //cmd.CommandText = sp_datasource;
            //cmd.Parameters.AddWithValue("@type", type);
            //cmd.Parameters.AddWithValue("@source", source);
            //cmd.Parameters.AddWithValue("@QueryType", 13);
            //return base.ExecGetData(cmd, _ConnectionStringCoreDB);
            string sql = $@"exec {sp_datasource} @type='{type}',@source='{source}', @QueryType=13";
            string table_in = SFObjects.returnText(sql, _ConnectionStringCoreDB);

             sql = @"SELECT  '['+sc.name +'].['+ cc.name + ']' [Source],cc.Type,
                         ('[' + STUFF((
                                select 
                                    ',""' + col1.name + '""'
                                FROM sys.objects cc1
                        			join sys.schemas sc1 on sc1.schema_id = cc1.schema_id
                        			join sys.columns col1 on col1.object_id = cc1.object_id	
                        			where sc1.name +'.'+ cc1.name = sc.name +'.'+ cc.name
                                for xml path(''), type
                            ).value('.', 'varchar(max)'), 1, 1, '') + ']')[Columns]
                        from    sys.objects cc
                        			join sys.schemas sc on sc.schema_id = cc.schema_id
                        			--join sys.columns col on col.object_id = cc.object_id	
                        			where sc.name +'.'+ cc.name in( " + table_in + @")
                        ";

            DataTable dtnoahdata = SFObjects.LoadDataTable(sql, _ConnectionString);

            SqlCommand cmd = new SqlCommand();
            cmd.Connection = sqlConn;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Transaction = sqlTrn;
            cmd.Parameters.Clear();
            cmd.CommandText = sp_datasource;
            cmd.Parameters.AddWithValue("@source", source);
            cmd.Parameters.AddWithValue("@type", type);
            cmd.Parameters.AddWithValue("@QueryType", 14);
            // Add TVP parameter
            SqlParameter tvpParam = cmd.Parameters.AddWithValue("@line_details", dtnoahdata);
            tvpParam.SqlDbType = SqlDbType.Structured;
            tvpParam.TypeName = "[P8].[udt_DataAccessibility]";
            return base.ExecGetData(cmd, _ConnectionStringCoreDB);


            //string sql1 = $@"exec {sp_datasource} @type='{type}',@source='{source}', @QueryType=14";

            //return SFObjects.LoadDataTable(sql1, _ConnectionStringCoreDB);
            //      DataTable dtcoredbdata = SFObjects.LoadDataTable(sql1, _ConnectionStringCoreDB);
            //      // Perform the join using LINQ
            //      var query =
            //from row1 in dtnoahdata.AsEnumerable()
            //join row2 in dtcoredbdata.AsEnumerable()
            //on row1.Field<string>("Source") equals row2.Field<string>("Source")
            ////where !string.IsNullOrWhiteSpace(row1.Field<string>("Source")) &&
            ////      !string.IsNullOrWhiteSpace(row2.Field<string>("Source"))
            //select row1.ItemArray.Concat(row2.ItemArray).ToArray();

            //      // Create a new DataTable from the result of the join
            //      DataTable resultTable = new DataTable();

            //      // Add columns to the result DataTable
            //      foreach (DataColumn col in dtnoahdata.Columns)
            //      {
            //          resultTable.Columns.Add(col.ColumnName, col.DataType);
            //      }

            //      foreach (DataColumn col in dtcoredbdata.Columns)
            //      {
            //          if (!resultTable.Columns.Contains(col.ColumnName))
            //          {
            //              resultTable.Columns.Add(col.ColumnName, col.DataType);
            //          }
            //      }

            //      // Fill the result DataTable with the joined data
            //      foreach (object[] values in query)
            //      {
            //          resultTable.Rows.Add(values);
            //      }


            //      return resultTable;
        }
     
        public DataTable getdcvalue(string source)
        {
            string sql = $@"SELECT col.name[Value] FROM sys.objects cc
			join sys.schemas sc on sc.schema_id = cc.schema_id
			join sys.columns col on col.object_id = cc.object_id
			where sc.name +'.'+ cc.name = replace(replace('{source}','[',''),']','')
            ";
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }
        

   
    
        public string save_datasource(System.Data.DataTable dt)
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();
                DataRow dr = dt.Rows[0];
                string DataSourceID = dr["DataSourceID"].ToString();
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn;
                cmd.Parameters.Clear();
                cmd.CommandText = sp_datasource;       
                cmd.Parameters.AddWithValue("@DataSourceID", DataSourceID);
                cmd.Parameters.AddWithValue("@Type", dr["Type"]);
                cmd.Parameters.AddWithValue("@DataSource", dr["DataSource"]);
                cmd.Parameters.AddWithValue("@TableName", dr["TableName"]);
                cmd.Parameters.AddWithValue("@Name", dr["Name"]);
                cmd.Parameters.AddWithValue("@RecUser", dr["DataSourceCreatedBy"]);
                cmd.Parameters.AddWithValue("@QueryType", string.IsNullOrWhiteSpace(DataSourceID) ? 101 : 102);
                cmd.ExecuteNonQuery();
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Cannot be saved. Duplicate records are not allowed.", sqlEx.Number);
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
            return "Process has successfully completed.";
        }

        public string delete_datasource(string DataSourceID,string Recuser)
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn;
                cmd.Parameters.Clear();
                cmd.CommandText = sp_datasource;
                cmd.Parameters.AddWithValue("@DataSourceID", DataSourceID);
                cmd.Parameters.AddWithValue("@RecUser", Recuser);
                cmd.Parameters.AddWithValue("@QueryType", 103);
                cmd.ExecuteNonQuery();
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Cannot be saved. Duplicate records are not allowed.", sqlEx.Number);
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
            return "Process has successfully completed.";
        }


        public string save_datasourceps(System.Data.DataTable dt, System.Data.DataTable dtLin)
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();
                DataRow dr = dt.Rows[0];
                string SubType = dr["SubType"].ToString();
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn;
                cmd.Parameters.Clear();
                cmd.CommandText = sp_datasource;
                cmd.Parameters.AddWithValue("@SubType", SubType);
                cmd.Parameters.AddWithValue("@DataSourceID", dr["DataSourceID"]);
                cmd.Parameters.AddWithValue("@Name", dr["Name"]);
                cmd.Parameters.AddWithValue("@MainParam", dr["MainParam"]);
                cmd.Parameters.AddWithValue("@MainParamValue", dr["MainParamValue"]);
                cmd.Parameters.AddWithValue("@RecUser", dr["RecUser"]);
                cmd.Parameters.AddWithValue("@QueryType", string.IsNullOrWhiteSpace(SubType) ? 21 : 22);
                if (string.IsNullOrWhiteSpace(SubType)) { SubType = cmd.ExecuteScalar().ToString(); }
                else { cmd.ExecuteNonQuery(); }


                int Rowno = 0;
                foreach (DataRow items in dtLin.Rows)
                {
                    Rowno++;
                    cmd = new SqlCommand();
                    cmd.Connection = sqlConn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = sqlTrn;
                    cmd.Parameters.Clear();
                    cmd.CommandText = sp_datasource;
                    cmd.Parameters.AddWithValue("@SubType", SubType);
                    cmd.Parameters.AddWithValue("@Include", items["Include"]);
                    cmd.Parameters.AddWithValue("@Param", items["Param"]);
                    cmd.Parameters.AddWithValue("@description", items["description"]);
                    cmd.Parameters.AddWithValue("@InitialValue", items["InitialValue"]);
                    cmd.Parameters.AddWithValue("@Rowno", Rowno);
                    cmd.Parameters.AddWithValue("@QueryType", 31);
                    cmd.ExecuteNonQuery();
                }
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Cannot be saved. Duplicate records are not allowed.", sqlEx.Number);
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
            return "Process has successfully completed.";
        }

        public string delete_datasourceps(string SubType, string Recuser)
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn;
                cmd.Parameters.Clear();
                cmd.CommandText = sp_datasource;
                cmd.Parameters.AddWithValue("@SubType", SubType);
                cmd.Parameters.AddWithValue("@RecUser", Recuser);
                cmd.Parameters.AddWithValue("@QueryType", 23);
                cmd.ExecuteNonQuery();
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Cannot be saved. Duplicate records are not allowed.", sqlEx.Number);
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
            return "Process has successfully completed.";
        }

        public string save_datasourcer(string DataSourceID, System.Data.DataTable dtLin,string Recuser)
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn;
                cmd.Parameters.Clear();
                cmd.CommandText = sp_datasource;
                cmd.Parameters.AddWithValue("@DataSourceID", DataSourceID);
                cmd.Parameters.AddWithValue("@Recuser", Recuser);
                cmd.Parameters.AddWithValue("@QueryType", 43);
                cmd.ExecuteNonQuery();


                int Rowno = 0;
                foreach (DataRow items in dtLin.Rows)
                {
                    Rowno++;
                    cmd = new SqlCommand();
                    cmd.Connection = sqlConn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = sqlTrn;
                    cmd.Parameters.Clear();
                    cmd.CommandText = sp_datasource;
                    cmd.Parameters.AddWithValue("@DataSourceID", DataSourceID);
                    cmd.Parameters.AddWithValue("@UserID", items["UserID"]);
                    cmd.Parameters.AddWithValue("@Rowno", Rowno);
                    cmd.Parameters.AddWithValue("@QueryType", 41);
                    cmd.ExecuteNonQuery();
                }

            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Cannot be saved. Duplicate records are not allowed.", sqlEx.Number);
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
            return "Process has successfully completed.";
        }


        public string save_datasourcepsc(string SubType, System.Data.DataTable dtLin, string Recuser)
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn;
                cmd.Parameters.Clear();
                cmd.CommandText = sp_datasource;
                cmd.Parameters.AddWithValue("@SubType", SubType);
                cmd.Parameters.AddWithValue("@Recuser", Recuser);
                cmd.Parameters.AddWithValue("@QueryType", 63);
                cmd.ExecuteNonQuery();


                int Rowno = 0;
                foreach (DataRow items in dtLin.Rows)
                {
                    Rowno++;
                    cmd = new SqlCommand();
                    cmd.Connection = sqlConn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = sqlTrn;
                    cmd.Parameters.Clear();
                    cmd.CommandText = sp_datasource;
                    cmd.Parameters.AddWithValue("@SubType", SubType);
                    cmd.Parameters.AddWithValue("@include", items["include"]);
                    cmd.Parameters.AddWithValue("@column", items["column"]);
                    cmd.Parameters.AddWithValue("@alias", items["alias"]);
                    cmd.Parameters.AddWithValue("@Rowno", Rowno);
                    cmd.Parameters.AddWithValue("@QueryType", 61);
                    cmd.ExecuteNonQuery();
                }

            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Cannot be saved. Duplicate records are not allowed.", sqlEx.Number);
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
            return "Process has successfully completed.";
        }

        private string getConnectivity(string Connectivity)
        {
            //remove this
            DataTable dtrecords = new DataTable();
            DataTable dtconfig = new DataTable();
            string connCP = @"connect timeout=360;Data Source={0};Initial Catalog={1};user id={2};password={3}; connection timeout=240; pooling=false";
            string server = "", database = "", user = "", password = "";
            if (!string.IsNullOrWhiteSpace(Connectivity))
            {
                dtconfig = SFObjects.LoadDataTable($@"SELECT top 1 * FROM dbo.gen_Connectivity where ConnectivityID='{Connectivity}'", _ConnectionString);
            }
            else
            {
                dtconfig = SFObjects.LoadDataTable("SELECT top 1 * FROM dbo.gen_Connectivity where DynamicDB = 1", _ConnectionString);
                if (dtconfig.Rows.Count <= 0)
                {
                    dtconfig = SFObjects.LoadDataTable("SELECT top 1 * FROM dbo.gen_Connectivity", _ConnectionString);
                }
            }


            if (dtconfig.Rows.Count > 0)
            {
                try
                {
                    nwConfiguration nwConfig = new nwConfiguration();
                    server = nwConfig.nwDecrpytString(dtconfig.Rows[0]["ConnectivityServer"].ToString());
                    database = nwConfig.nwDecrpytString(dtconfig.Rows[0]["ConnectivityDataBase"].ToString());
                    user = nwConfig.nwDecrpytString(dtconfig.Rows[0]["ConnectivityUsername"].ToString());
                    password = nwConfig.nwDecrpytString(dtconfig.Rows[0]["ConnectivityPassword"].ToString());
                }
                catch
                {
                    try
                    {
                        nwConfiguration nwConfig = new nwConfiguration();
                        server = dtconfig.Rows[0]["ConnectivityServer"].ToString();
                        database = dtconfig.Rows[0]["ConnectivityDataBase"].ToString();
                        user = dtconfig.Rows[0]["ConnectivityUsername"].ToString();
                        password = dtconfig.Rows[0]["ConnectivityPassword"].ToString();
                    }
                    catch
                    {
                        return "error";
                    }
                }
            }
            else
            {
                return "error";
                //connCP = _ConnectionString;
            }
            connCP = string.Format(connCP, server, database, user, password);
            bool hasconnected = IsServerConnected(connCP);
            if (!hasconnected)
            {
                return "error";
            }
            return connCP;
        }
        public bool IsServerConnected(string ConnectionString)
        {

            var task = Task.Run(() => IsServerConnected1(ConnectionString));
            if (task.Wait(TimeSpan.FromSeconds(3)))
                return task.Result;
            else
                return false;

        }
        public bool IsServerConnected1(string ConnectionString)
        {
            using (var l_oConnection = new SqlConnection(ConnectionString))
            {
                try
                {
                    l_oConnection.Open();
                    return true;
                }
                catch
                {
                    return false;
                }
            }
        }
        public bool hasdata_datasourceps(string DataSourceID)
        {
            try
            {
                string str = $@"EXEC {sp_datasource} @DataSourceID='{DataSourceID}',@QueryType=32";
                return Parser.ParseBool(SFObjects.returnText(str, _ConnectionString));
            }
            catch
            {
                return false;
            }
        }
        public bool hasdata_datasourcer(string DataSourceID)
        {
            try
            {
                string str = $@"EXEC {sp_datasource} @DataSourceID='{DataSourceID}',@QueryType=52";
                return Parser.ParseBool(SFObjects.returnText(str, _ConnectionString));
            }
            catch
            {
                return false;
            }
        }
        public bool hasdata_datasourcepsh(string SubType)
        {
            try
            {
                string str = $@"EXEC {sp_datasource} @SubType='{SubType}',@QueryType=72";
                return Parser.ParseBool(SFObjects.returnText(str, _ConnectionString));
            }
            catch
            {
                return false;
            }
        }



        public DataSet LoadDocumentSet(string code)
        {
            return SFObjects.LoadDataSet($"exec {sp_forw} @code='{code}',@QueryType = 0", _ConnectionString);
        }


        public string save_p8forw(System.Data.DataTable dt, string recuser,bool isNew) //int querytype, 
        {
            string result = "Process has successfully completed.";
            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();

                SqlCommand cmd = new SqlCommand();
                cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn;
                cmd.Parameters.Clear();
                cmd.CommandText = sp_forw;
                cmd.Parameters.AddWithValue("@code", dt.Rows[0]["code"]);
                cmd.Parameters.AddWithValue("@description", dt.Rows[0]["description"]);
                cmd.Parameters.AddWithValue("@json_spread", dt.Rows[0]["json_spread"]);
                cmd.Parameters.AddWithValue("@recuser", recuser);
                cmd.Parameters.AddWithValue("@moduser", recuser);
                cmd.Parameters.AddWithValue("@imgsc", dt.Rows[0]["imgsc"]);
                cmd.Parameters.AddWithValue("@querytype", 1);
                if (isNew)
                {
                    result = cmd.ExecuteScalar().ToString();
                }
                else
                {
                    cmd.ExecuteNonQuery();
                }
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                if (sqlEx.Number == 2627)
                    result = String.Format("Cannot be saved. Duplicate records are not allowed.", sqlEx.Number);
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
            return result;
        }

        public string getlugdataconditioneventevent()
        {
            string str = $@"exec {sp_forw} @QueryType=11";
            return str;
        }
        public string getlugsource(string Recuser)
        {
            string str = $@"exec {sp_forw} @Recuser='{Recuser}', @QueryType=12";
            return str;
        }

        public string getlugdatasourcetype(string DataSourceID, string Recuser)
        {
            string str = $@"exec {sp_forw} @Recuser='{Recuser}',@DataSourceID='{DataSourceID}', @QueryType=13";
            return str;
        }
        public string getlugcolumn(string SubType, string Recuser,string columnlist)
        {
            string str = $@"exec {sp_forw} @Recuser='{Recuser}',@SubType='{SubType}',@column='{columnlist}', @QueryType=19";
            return str;
        }
        public string getlugsbfcolumn(string SubType, string Recuser)
        {
            string str = $@"exec {sp_forw} @Recuser='{Recuser}',@SubType='{SubType}', @QueryType=20";
            return str;
        }
        public DataTable getDataGrid_sbhdr(string udt,DataTable dt = null)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = sp_forw;
            cmd.Parameters.AddWithValue("@QueryType", 27);
            // Add TVP parameter
            SqlParameter tvpParam = cmd.Parameters.AddWithValue("@sidebar_hdr", dt);
            tvpParam.SqlDbType = SqlDbType.Structured;
            tvpParam.TypeName = udt;
            return base.ExecGetData(cmd, _ConnectionString);

            //string connectionString = _ConnectionString;
            //string storedProcedureName = sp_forw;

            //using (SqlConnection connection = new SqlConnection(connectionString))
            //{
            //    using (SqlCommand cmd = new SqlCommand(storedProcedureName, connection))
            //    {
            //        cmd.CommandType = CommandType.StoredProcedure;
            //        cmd.Parameters.Clear();
            //        cmd.Parameters.AddWithValue("@QueryType", 27);
            //        // Add TVP parameter
            //        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@sidebar_hdr", dt);
            //        tvpParam.SqlDbType = SqlDbType.Structured;
            //        tvpParam.TypeName = "dbo.udt_sidebar_hdr"; // Name of your user-defined table type

            //        connection.Open();

            //        // Execute the stored procedure and retrieve the result (if any)
            //        using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
            //        {
            //            DataTable resultTable = new DataTable();
            //            adapter.Fill(resultTable);
            //            return resultTable;
            //        }
            //    }
            //}
        }

        public DataTable getDataGrid_sbevent(int querytype, DataTable dt = null)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = sp_forw;
            cmd.Parameters.AddWithValue("@QueryType", querytype);
            // Add TVP parameter
            SqlParameter tvpParam = cmd.Parameters.AddWithValue("@sidebar_event", dt);
            tvpParam.SqlDbType = SqlDbType.Structured;
            tvpParam.TypeName = "[dbo].[udt_sidebar_event]";
            return base.ExecGetData(cmd, _ConnectionString);
        }

        //public DataTable getDataGrid_sbdrill(int querytype, DataTable dt = null)
        //{
        //    SqlCommand cmd = new SqlCommand();
        //    cmd.CommandType = CommandType.StoredProcedure;
        //    cmd.Parameters.Clear();
        //    cmd.CommandText = sp_forw;
        //    cmd.Parameters.AddWithValue("@QueryType", querytype);
        //    // Add TVP parameter
        //    SqlParameter tvpParam = cmd.Parameters.AddWithValue("@sidebar_drill", dt);
        //    tvpParam.SqlDbType = SqlDbType.Structured;
        //    tvpParam.TypeName = "[dbo].[udt_sidebar_drill]";
        //    return base.ExecGetData(cmd, _ConnectionString);
        //}

        public DataTable getDataGrid_sbc(string subtype,int querytype,string udt,DataTable dt =null)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = sp_forw;
            cmd.Parameters.AddWithValue("@SubType", subtype);
            cmd.Parameters.AddWithValue("@QueryType", querytype);
            // Add TVP parameter
            SqlParameter tvpParam = cmd.Parameters.AddWithValue("@sidebar_column", dt);
            tvpParam.SqlDbType = SqlDbType.Structured;
            tvpParam.TypeName = udt;
            return base.ExecGetData(cmd, _ConnectionString);
        }
        public DataTable getDataGrid_sbf(string subtype, int querytype, DataTable dt = null)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = sp_forw;
            cmd.Parameters.AddWithValue("@SubType", subtype);
            cmd.Parameters.AddWithValue("@QueryType", querytype);
            // Add TVP parameter
            SqlParameter tvpParam = cmd.Parameters.AddWithValue("@sidebar_filter", dt);
            tvpParam.SqlDbType = SqlDbType.Structured;
            tvpParam.TypeName = "[dbo].[udt_sidebar_filter]";
            return base.ExecGetData(cmd, _ConnectionString);
        }
        public DataTable getDataGrid_sbp(string subtype, int querytype, DataTable dt = null)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = sp_forw;
            cmd.Parameters.AddWithValue("@SubType", subtype);
            cmd.Parameters.AddWithValue("@QueryType", querytype);
            // Add TVP parameter
            SqlParameter tvpParam = cmd.Parameters.AddWithValue("@sidebar_param", dt);
            tvpParam.SqlDbType = SqlDbType.Structured;
            tvpParam.TypeName = "[dbo].[udt_sidebar_param]";
            return base.ExecGetData(cmd, _ConnectionString);
        }
        public DataTable getDataGrid_sbpfixed(string subtype)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = sp_forw;
            cmd.Parameters.AddWithValue("@SubType", subtype);
            cmd.Parameters.AddWithValue("@QueryType", 28);
            return base.ExecGetData(cmd, _ConnectionString);
        }

        public DataTable getDataGrid_sbs(string subtype, int querytype, DataTable dt = null)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = sp_forw;
            cmd.Parameters.AddWithValue("@SubType", subtype);
            cmd.Parameters.AddWithValue("@QueryType", querytype);
            // Add TVP parameter
            SqlParameter tvpParam = cmd.Parameters.AddWithValue("@sidebar_sort", dt);
            tvpParam.SqlDbType = SqlDbType.Structured;
            tvpParam.TypeName = "[dbo].[udt_sidebar_sort]";
            return base.ExecGetData(cmd, _ConnectionString);
        }
   
        public DataTable getsort()
        {
            string str = $@"exec {sp_forw} @QueryType=21";
            return SFObjects.LoadDataTable(str, _ConnectionString);
        }

        public DataTable GetUDTColumns(string udtName)
        {
            DataTable dtColumns = new DataTable();

            string query = @"
            select c.name [COLUMN_NAME],y.name [DATA_TYPE]
            from sys.table_types t
            inner join sys.columns c on c.object_id = t.type_table_object_id
            inner join sys.types y on y.user_type_id = c.user_type_id
            where t.is_user_defined = 1
              and t.is_table_type = 1
             and schema_name(t.schema_id) + '.' + t.name = replace(replace(@udtName,'[',''),']','')";

            using (SqlConnection connection = new SqlConnection(_ConnectionString))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@udtName", udtName);

                connection.Open();
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    string columnName = reader.GetString(0);
                    string dataType = reader.GetString(1);
                    dtColumns.Columns.Add(columnName, GetTypeFromSqlDataType(dataType));
                }

                reader.Close();
            }

            return dtColumns;
        }

        private Type GetTypeFromSqlDataType(string sqlDataType)
        {
            // Map SQL data types to .NET types
            switch (sqlDataType.ToLower())
            {
                case "bigint":
                    return typeof(long);
                case "binary":
                case "varbinary":
                case "image":
                    return typeof(byte[]);
                case "bit":
                    return typeof(bool);
                case "date":
                case "datetime":
                case "datetime2":
                case "smalldatetime":
                    return typeof(DateTime);
                case "char":
                case "nchar":
                case "nvarchar":
                case "text":
                case "ntext":
                case "varchar":
                    return typeof(string);
                case "decimal":
                case "numeric":
                case "float":
                case "real":
                    return typeof(double); // or typeof(decimal) for exact precision
                case "int":
                case "smallint":
                    return typeof(int);
                // Add more mappings as needed
                default:
                    return typeof(object); // Fallback to object type
            }
        }
        public string getlugsbtemplate()
        {
            string str = $@"exec {sp_forw} @QueryType=28";
            return str;
        }

        public string CreateNEWID(string Recuser,string json_spread)
        {
            string str = string.Format($@"exec {sp_forw} @Recuser='{Recuser}',@json_spread='{json_spread}',@QueryType=1");
            return SFObjects.returnText(str, _ConnectionString);
        }
    }

}