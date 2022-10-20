function general_GetRootID(nwForm) {
    try {
        nwForm = nwForm.replace("emi-Form-", "");
        nwForm = nwForm.replace("emi-FormsA-", "");
        nwForm = nwForm.replace("emi-FormsA", "");
        nwForm = nwForm.replace("emi-", "");
        nwForm = nwForm.replace("_fav", "");
        nwForm = nwForm.replace("_rec", "");
    } catch (err) { }
    return nwForm;
}
