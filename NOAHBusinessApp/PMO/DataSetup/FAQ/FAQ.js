const pageTitle = "Frequently Asked Questions";

function func_Reload() {
  crLnk = GetCurrentURL() + "FAQ_Gateway";
  crLnkGateKey = "FAQ";

  var isContinue = true;
  init_request();
  ToolBoxGetData = false;

  return isContinue;
}

function func_ToolboxADD(indef, enume) {
  var isContinue = true;
  EnableFields();
  ClearFields();
  nwParameter_Add("nwtku", getParameterByName("nwtku"));
  func_Toolbox_Clear();
  return isContinue;
}

function func_ToolboxSave(indef, enume) {
  var isContinue = true;
  isContinue = false;
  return isContinue;
}

function func_ToolboxDelete(indef, enume) {
  var isContinue = true;
  isContinue = false;
  return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
  var isContinue = true;
  cust_GetPara();
  nwLoading_Start("xLoading", crLoadingHTML);
  isRefreshed = true;
  return isContinue;
}

function func_ToolboxInquire(indef, enume) {
  var isContinue = true;
  return isContinue;
}

function func_ToolboxProcess(indef, enume) {
  var isContinue = true;
  return isContinue;
}

function func_ToolboxImport(indef, enume) {
  var isContinue = true;
  return isContinue;
}

function func_ToolboxExport(indef, enume) {
  var isContinue = true;
  cust_GetPara();
  return isContinue;
}

function func_ToolboxPrint(indef, enume) {
  var isContinue = true;
  return isContinue;
}

function func_ToolboxClosing(indef, enume) {
  var isContinue = true;
  return isContinue;
}

function func_ToolboxSearch(indef, enume) {
  var isContinue = true;
  isContinue = false;
  return isContinue;
}

function cust_GetPara() {}

function func_ToolboxNavigatorBind(enume) {
  var isContinue = true;
  return isContinue;
}

function func_ToolboxNavigatorBind_Done() {}

function func_ToolboxNavigatorBind_Empty() {
  nwLoading_Start("xLoading", crLoadingHTML);
  func_ActionDriven("actBindCollectionEmpty", false);
}

function Lookup_DoneFunction(idName, idNum) {}

function func_LookUpInitialize(idName) {}

function EnableFields() {}

function DisableFields() {

}

function EnableFieldsDone() {
  //Binding Done
}

function DisableFieldsEmpty() {}

function ClearFields() {}

function RefreshData() {}

