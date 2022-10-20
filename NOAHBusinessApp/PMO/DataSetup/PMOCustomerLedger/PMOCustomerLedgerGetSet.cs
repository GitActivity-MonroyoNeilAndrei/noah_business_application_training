using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public class PMOCustomerLedgerGetSet
{
    private string _LedgerType;
    private string _Name;
    private string _RegisteredName;
    private string _TradeName;
    private string _Address;
    private string _Contact;
    private string _VendorAccount;
    private string _CustomerAccount;
    private string _CheckPayeeName;

    public PMOCustomerLedgerGetSet()
    {
    }

    public string LedgerType
    {
        get { return _LedgerType; }
        set { _LedgerType = value; }
    }

    public string Name
    {
        get { return _Name; }
        set { _Name = value; }
    }

    public string RegisteredName
    {
        get { return _RegisteredName; }
        set { _RegisteredName = value; }
    }

    public string TradeName
    {
        get { return _TradeName; }
        set { _TradeName = value; }
    }

    public string Address
    {
        get { return _Address; }
        set { _Address = value; }
    }

    public string Contact
    {
        get { return _Contact; }
        set { _Contact = value; }
    }

    public string VendorAccount
    {
        get { return _VendorAccount; }
        set { _VendorAccount = value; }
    }

    public string CustomerAccount
    {
        get { return _CustomerAccount; }
        set { _CustomerAccount = value; }
    }

    public string CheckPayeeName
    {
        get { return _CheckPayeeName; }
        set { _CheckPayeeName = value; }
    }
}
