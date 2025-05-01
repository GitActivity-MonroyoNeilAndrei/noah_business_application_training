
function $fn() {
    let $fn = {

        /* Header Details */
        xHeaderDetails: {

            /* radio button & checkboxes */
            Individual: $("#Individual"),
            Corporate: $("#Corporate"),
            WithoutTIN: $("#WithoutTIN"),
            AllowCurrencySelection: $("#CurrencySelection"),
            LoadOwnersName: $("#chkLoadOwnersName"),
            RadioDesign: $(".radiodesign"),
            Lumpsum: $("#rdbLumpsum"),
            PerTransaction: $("#rdbCheckIndividual"),
            FullAddressCheckbox: $("#cbFullAddress"),

            /* Textboxes and Lookups */
            SupplierCode: $("#txtSuppliercode"),
            LugPayeeSubType: $("#txtSuppliercode"),
            CrossRefCode: $("#txtCrossCode"),
            LugCurrency: $("#lugCurrency"),
            RegName: $("#txtRegName"),
            TradeName: $("#txtTradeName"),
            CheckPayeeName: $("#txtCheckPayeeName"),
            Website: $("#txtWebsite"),
            VendorID: $("#txtVendorID"),
            Status: $("#txtStatus"),
            LugSalutation: $("#lugSalutation"),
            LastName: $("#txtLastName"),
            LugNameSuffix: $("#lugNameSuffix"),
            FirstName: $("#txtFirstName"),
            MiddleInitial: $("#txtMidInitial"),
            NickName: $("#txtNickName"),
            BirthDate: $("#txtDateBirth"),
            Age: $("#txtAge"),
            BirthPlace: $("#txtPlaceBirth"),
            LugGender: $("#lugGender"),
            LugCivilStatus: $("#lugCivilStatus"),
            LugNationality: $("#lugNationality"),
            LugReligion: $("#lugReligion"),
            LocationCode: $("#txtLocationCode"),
            LugLocationType: $("#lugLocationType"),
            FullAddress: $("#txtFullAddress"),
            UnitNo: $("#txtUnitNo"),
            FloorNo: $("#txtFloorNo"),
            BuildingNo: $("#txtBldgNo"),
            EstablishmentName: $("#txtEstablishment"),
            BuildingName: $("#txtBuilding"),
            Landmark: $("#txtLandmark"),
            StreetNo: $("#txtStreetNo"),
            StreetName: $("#txtStreetName"),
            Lot: $("#txtLot"),
            Block: $("#txtBlock"),
            Phase: $("#txtPhase"),
            Subdivision: $("#txtSubdivision"),
            Zone: $("#txtZone"),
            LugArea: $("#lugArea"),
            LugStandardBarangay: $("#lugStdBarangay"),
            AlternativeBarangay: $("#txtAltBrgy"),
            LugMunicipality: $("#lugMunicipality"),
            LugProvince: $("#lugProvince"),
            LugRegion: $("#lugRegion"),
            LugCountry: $("#lugCountry"),
            LugInternationalSubGroup: $("#lugInternationalSubGroup"),
            LugInternationalGroup: $("#lugInternationalGroup"),
            ZipCode: $("#txtZip"),
            PhoneNo: $("#txtPhone"),
            Local: $("#txtLocal"),
            MobileNo: $("#txtMobile"),
            EmailAddress: $("#txtEmailAdd"),
            FaxNo: $("#txtFax"),
            LugBank: $("#lugBank"),
            BankAccountNo: $("#txtBankAccountNo"),
            BankAddress: $("#txtBankAddress"),

            /* Lookup Code & Description TextBoxes */
            PayeeSubTypeCode: $("#idvallugPayeeSubType"),
            PayeeSubTypeDesc: $("#descvallugPayeeSubType"),
            CurrencyCode: $("#idvallugCurrency"),
            CurrencyDesc: $("#descvallugCurrency"),
            SalutationCode: $("#idvallugSalutation"),
            SalutationDesc: $("#descvallugSalutation"),
            NameSuffixCode: $("#idvallugNameSuffix"),
            NameSuffixDesc: $("#descvallugNameSuffix"),
            GenderCode: $("#idvallugGender"),
            GenderDesc: $("#descvallugGender"),
            CivilStatusCode: $("#idvallugCivilStatus"),
            CivilStatusDesc: $("#descvallugCivilStatus"),
            NationalityCode: $("#idvallugNationality"),
            NationalityDesc: $("#descvallugNationality"),
            ReligionCode: $("#idvallugReligion"),
            ReligionDesc: $("#descvallugReligion"),
            LocationTypeCode: $("#idvallugLocationType"),
            LocationTypeDesc: $("#descvallugLocationType"),
            AreaCode: $("#idvallugArea"),
            AreaDesc: $("#descvallugArea"),
            StandardBarangayCode: $("#idvallugStdBarangay"),
            StandardBarangayDesc: $("#descvallugStdBarangay"),
            MunicipalityCode: $("#idvallugMunicipality"),
            MunicipalityDesc: $("#descvallugMunicipality"),
            ProvinceCode: $("#idvallugProvince"),
            ProvinceDesc: $("#descvallugProvince"),
            RegionCode: $("#idvallugRegion"),
            RegionDesc: $("#descvallugRegion"),
            CountryCode: $("#idvallugCountry"),
            CountryDesc: $("#descvallugCountry"),
            InternationalSubGroupCode: $("#idvallugInternationalSubGroup"),
            InternationalSubGroupDesc: $("#descvallugInternationalSubGroup"),
            InternationalGroupCode: $("#idvallugInternationalGroup"),
            InternationalGroupDesc: $("#descvallugInternationalGroup"),
            BankCode: $("#idvallugBank"),
            BankDesc: $("#descvallugBank"),

            /* Span Class Required Fields 'Main Location' */
            FullAddressClass: $('.fulladdress'),
            LandmarkClass: $(".landmark"),
            StreetNameClass: $(".streetname"),
            SubdivisionClass: $(".subdivision"),
            StandardBarangayClass: $(".standardbarangay"),
            AlternativeBarangayClass: $(".alternativebarangay"),
            MunicipalityClass: $(".municipality"),
        },

        /* Format the NickName Field */
        xFormatNickName: function () {
            let value = $('#txtNickName').val();
            let worArr = value.split(' ');
            let tempArr = [];
            worArr.forEach(x => {
                let fStr = x.substring(1, x.length);
                tempArr.push(x.charAt(0).toUpperCase() + fStr.toLowerCase());
            })

            value = tempArr.join(" ");
            $('#txtNickName').val(value);
        },

        /* Format the BirthPlace Field */
        xFormatBirthPlace: function () {
            let value = $('#txtPlaceBirth').val();
            let worArr = value.split(' ');
            let tempArr = [];
            worArr.forEach(x => {
                let fStr = x.substring(1, x.length);
                tempArr.push(x.charAt(0).toUpperCase() + fStr.toLowerCase());
            })

            value = tempArr.join(" ");
            $('#txtPlaceBirth').val(value);
        },

        /* Will Disable Fields Upon Refresh */
        xDisableFields: function () {
            $fn.xHeaderDetails.CrossRefCode.prop("disabled", true),
            $fn.xHeaderDetails.AllowCurrencySelection.prop("disabled", true),
            $fn.xHeaderDetails.RegName.prop("disabled", true),
            $fn.xHeaderDetails.TradeName.prop("disabled", true),
            $fn.xHeaderDetails.LoadOwnersName.prop("disabled", true),
            $fn.xHeaderDetails.CheckPayeeName.prop("disabled", true),            
            $fn.xHeaderDetails.RadioDesign.prop("disabled", true),
            $fn.xHeaderDetails.Website.prop("disabled", true),
            $fn.xHeaderDetails.LugSalutation.enable(false),
            $fn.xHeaderDetails.LastName.prop("disabled", true),
            $fn.xHeaderDetails.LugNameSuffix.enable(false),
            $fn.xHeaderDetails.FirstName.prop("disabled", true),
            $fn.xHeaderDetails.MiddleInitial.prop("disabled", true),
            $fn.xHeaderDetails.NickName.prop("disabled", true),
            $fn.xHeaderDetails.BirthDate.prop("disabled", true),
            $fn.xHeaderDetails.BirthPlace.prop("disabled", true),
            $fn.xHeaderDetails.LugGender.enable(false),
            $fn.xHeaderDetails.LugCivilStatus.enable(false),
            $fn.xHeaderDetails.LugNationality.enable(false),
            $fn.xHeaderDetails.LugReligion.enable(false),
            $fn.xHeaderDetails.UnitNo.prop("disabled", true),
            $fn.xHeaderDetails.FloorNo.prop("disabled", true),
            $fn.xHeaderDetails.BuildingNo.prop("disabled", true),
            $fn.xHeaderDetails.EstablishmentName.prop("disabled", true),
            $fn.xHeaderDetails.BuildingName.prop("disabled", true),
            $fn.xHeaderDetails.Landmark.prop("disabled", true),
            $fn.xHeaderDetails.StreetNo.prop("disabled", true),
            $fn.xHeaderDetails.StreetName.prop("disabled", true),
            $fn.xHeaderDetails.Lot.prop("disabled", true),
            $fn.xHeaderDetails.Block.prop("disabled", true),
            $fn.xHeaderDetails.Phase.prop("disabled", true),
            $fn.xHeaderDetails.Subdivision.prop("disabled", true),
            $fn.xHeaderDetails.Zone.prop("disabled", true),
            $fn.xHeaderDetails.LugArea.enable(false),
            $fn.xHeaderDetails.LugStandardBarangay.enable(false),
            $fn.xHeaderDetails.AlternativeBarangay.prop("disabled", true),
            $fn.xHeaderDetails.LugMunicipality.enable(false),
            $fn.xHeaderDetails.PhoneNo.prop("disabled", true),
            $fn.xHeaderDetails.Local.prop("disabled", true),
            $fn.xHeaderDetails.MobileNo.prop("disabled", true),
            $fn.xHeaderDetails.EmailAddress.prop("disabled", true),
            $fn.xHeaderDetails.FaxNo.prop("disabled", true),
            $fn.xHeaderDetails.LugBank.enable(false),
            $fn.xHeaderDetails.BankAccountNo.prop("disabled", true),
            $fn.xHeaderDetails.BankAddress.prop("disabled", true),
            $fn.xHeaderDetails.FullAddressCheckbox.enable(false)
        },

        /* Will Enable Fields Upon Refresh */
        xEnableFields: function () {
            if ($fn.xHeaderDetails.Individual.is(":checked"))
                $fn.xHeaderDetails.RegName.prop("disabled", true);
            else
                $fn.xHeaderDetails.RegName.prop("disabled", false);

            $fn.xHeaderDetails.CrossRefCode.prop("disabled", false),
            $fn.xHeaderDetails.AllowCurrencySelection.prop("disabled", false),
            $fn.xHeaderDetails.TradeName.prop("disabled", false),
            //$fn.xHeaderDetails.LoadOwnersName.prop("disabled", false),
            $fn.xHeaderDetails.CheckPayeeName.prop("disabled", false),
            $fn.xHeaderDetails.RadioDesign.enable(true),
            $fn.xHeaderDetails.Website.prop("disabled", false),
            $fn.xHeaderDetails.LugSalutation.enable(true),
            $fn.xHeaderDetails.LastName.prop("disabled", false),
            $fn.xHeaderDetails.LugNameSuffix.enable(true),
            $fn.xHeaderDetails.FirstName.prop("disabled", false),
            $fn.xHeaderDetails.MiddleInitial.prop("disabled", false),
            $fn.xHeaderDetails.NickName.prop("disabled", false),
            $fn.xHeaderDetails.BirthDate.prop("disabled", false),
            $fn.xHeaderDetails.BirthPlace.prop("disabled", false),
            $fn.xHeaderDetails.LugGender.enable(true),
            $fn.xHeaderDetails.LugCivilStatus.enable(true),
            $fn.xHeaderDetails.LugNationality.enable(true),
            $fn.xHeaderDetails.LugReligion.enable(true),
            $fn.xHeaderDetails.UnitNo.prop("disabled", false),
            $fn.xHeaderDetails.FloorNo.prop("disabled", false),
            $fn.xHeaderDetails.BuildingNo.prop("disabled", false),
            $fn.xHeaderDetails.EstablishmentName.prop("disabled", false),
            $fn.xHeaderDetails.BuildingName.prop("disabled", false),
            $fn.xHeaderDetails.Landmark.prop("disabled", false),
            $fn.xHeaderDetails.StreetNo.prop("disabled", false),
            $fn.xHeaderDetails.StreetName.prop("disabled", false),
            $fn.xHeaderDetails.Lot.prop("disabled", false),
            $fn.xHeaderDetails.Block.prop("disabled", false),
            $fn.xHeaderDetails.Phase.prop("disabled", false),
            $fn.xHeaderDetails.Subdivision.prop("disabled", false),
            $fn.xHeaderDetails.Zone.prop("disabled", false),
            $fn.xHeaderDetails.LugArea.enable(true),
            $fn.xHeaderDetails.LugStandardBarangay.enable(true),
            $fn.xHeaderDetails.AlternativeBarangay.prop("disabled", false),
            $fn.xHeaderDetails.LugMunicipality.enable(true),
            $fn.xHeaderDetails.PhoneNo.prop("disabled", false),
            $fn.xHeaderDetails.Local.prop("disabled", false),
            $fn.xHeaderDetails.MobileNo.prop("disabled", false),
            $fn.xHeaderDetails.EmailAddress.prop("disabled", false),
            $fn.xHeaderDetails.FaxNo.prop("disabled", false),
            $fn.xHeaderDetails.LugBank.enable(true),
            $fn.xHeaderDetails.BankAccountNo.prop("disabled", false),
            $fn.xHeaderDetails.BankAddress.prop("disabled", false),
            $fn.xHeaderDetails.FullAddressCheckbox.enable(true)
        },

        xIndividualDetails: function () {
            var isCorporate = $('#Corporate').prop("checked");

            if (isCorporate) {
                $fn.xDisableIndividualDetails();
            }
            else {
                $fn.xEnableIndividualDetails();
            }
        },
        /* Disable all Individual Details */
        xDisableIndividualDetails: function () {
            $fn.xHeaderDetails.LugSalutation.enable(false);
            $fn.xHeaderDetails.LastName.attr("disabled", "disabled");
            $fn.xHeaderDetails.LugNameSuffix.enable(false);
            $fn.xHeaderDetails.FirstName.attr("disabled", "disabled");
            $fn.xHeaderDetails.MiddleInitial.attr("disabled", "disabled");
            $fn.xHeaderDetails.NickName.attr("disabled", "disabled");
            $fn.xHeaderDetails.BirthDate.attr("disabled", "disabled");
            $fn.xHeaderDetails.BirthPlace.attr("disabled", "disabled");
            $fn.xHeaderDetails.LugGender.enable(false);
            $fn.xHeaderDetails.LugCivilStatus.enable(false);
            $fn.xHeaderDetails.LugNationality.enable(false);
            $fn.xHeaderDetails.LugReligion.enable(false);
            /**************************/
        },

        /* Enable all Individual Details */
        xEnableIndividualDetails: function () {
            $fn.xHeaderDetails.LugSalutation.enable(true);
            $fn.xHeaderDetails.LastName.removeAttr("disabled");
            $fn.xHeaderDetails.LugNameSuffix.enable(true);
            $fn.xHeaderDetails.FirstName.removeAttr("disabled");
            $fn.xHeaderDetails.MiddleInitial.removeAttr("disabled");
            $fn.xHeaderDetails.NickName.removeAttr("disabled");
            $fn.xHeaderDetails.BirthDate.removeAttr("disabled");
            $fn.xHeaderDetails.BirthPlace.removeAttr("disabled");
            $fn.xHeaderDetails.LugGender.enable(true);
            $fn.xHeaderDetails.LugCivilStatus.enable(true);
            $fn.xHeaderDetails.LugNationality.enable(true);
            $fn.xHeaderDetails.LugReligion.enable(true);
            /**************************/
        },

        xFullAddress: function () {
            var isFullAddress = $('#cbFullAddress').is(":checked");

            if (isFullAddress) {
                $fn.xDisableAddressDetails();
            }
            else {
                $fn.xEnableAddressDetails();
            }
        },
        /* Disable all Address Details */
        xDisableAddressDetails: function () {
            $fn.xHeaderDetails.FullAddress.prop("disabled", false);
            $fn.xHeaderDetails.UnitNo.prop("disabled", true);
            $fn.xHeaderDetails.FloorNo.prop("disabled", true);
            $fn.xHeaderDetails.BuildingNo.prop("disabled", true);
            $fn.xHeaderDetails.EstablishmentName.prop("disabled", true);
            $fn.xHeaderDetails.BuildingName.prop("disabled", true);
            $fn.xHeaderDetails.Landmark.prop("disabled", true);
            $fn.xHeaderDetails.StreetNo.prop("disabled", true);
            $fn.xHeaderDetails.StreetName.prop("disabled", true);
            $fn.xHeaderDetails.Lot.prop("disabled", true);
            $fn.xHeaderDetails.Block.prop("disabled", true);
            $fn.xHeaderDetails.Phase.prop("disabled", true);
            $fn.xHeaderDetails.Subdivision.prop("disabled", true);
            $fn.xHeaderDetails.Zone.prop("disabled", true);
            $fn.xHeaderDetails.LugArea.enable(false);
            $fn.xHeaderDetails.LugStandardBarangay.enable(false);
            $fn.xHeaderDetails.AlternativeBarangay.prop("disabled", true);
            $fn.xHeaderDetails.LugMunicipality.enable(false);
            $fn.xHeaderDetails.ZipCode.prop("disabled", true);
            /**************************/
        },

        /* Enable all Address Details */
        xEnableAddressDetails: function () {
            $fn.xHeaderDetails.FullAddress.prop("disabled", true);
            $fn.xHeaderDetails.UnitNo.prop("disabled", false);
            $fn.xHeaderDetails.FloorNo.prop("disabled", false);
            $fn.xHeaderDetails.BuildingNo.prop("disabled", false);
            $fn.xHeaderDetails.EstablishmentName.prop("disabled", false);
            $fn.xHeaderDetails.BuildingName.prop("disabled", false);
            $fn.xHeaderDetails.Landmark.prop("disabled", false);
            $fn.xHeaderDetails.StreetNo.prop("disabled", false);
            $fn.xHeaderDetails.StreetName.prop("disabled", false);
            $fn.xHeaderDetails.Lot.prop("disabled", false);
            $fn.xHeaderDetails.Block.prop("disabled", false);
            $fn.xHeaderDetails.Phase.prop("disabled", false);
            $fn.xHeaderDetails.Subdivision.prop("disabled", false);
            $fn.xHeaderDetails.Zone.prop("disabled", false);
            $fn.xHeaderDetails.LugArea.enable(true);
            $fn.xHeaderDetails.LugStandardBarangay.enable(true);
            $fn.xHeaderDetails.AlternativeBarangay.prop("disabled", false);
            $fn.xHeaderDetails.LugMunicipality.enable(true);
            $fn.xHeaderDetails.ZipCode.prop("disabled", false);
            /**************************/
        },


        /* Validation for Vendor Status */
        xValidateApprove: function () {
            var xStatus = $('#txtStatus').val();

            if (xStatus == "Approved" || xStatus == "Cancelled" || xStatus == "For Approval") {
                /* Disable the fields */
                $fn.xDisableFields();
                $fn.xHeaderDetails.FullAddress.prop("disabled", true);
            }
                /* Disable the fields */
            else if (xStatus == "Saved" || xStatus.includes("Disapproved")) {
                $fn.xEnableFields();
                $fn.xIndividualDetails();
                $fn.xFullAddress();
            }
        },

        /* Disable all Lookup Codes */
        xDisableAllLookupCode: function () {
            $fn.xHeaderDetails.PayeeSubTypeCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.CurrencyCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.SalutationCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.NameSuffixCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.GenderCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.CivilStatusCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.NationalityCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.ReligionCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.LocationTypeCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.AreaCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.StandardBarangayCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.MunicipalityCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.ProvinceCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.RegionCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.CountryCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.InternationalSubGroupCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.InternationalGroupCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.BankCode.attr("disabled", "disabled");
            /**************************/
        },

        /* Enable all Lookup Codes */
        xEnableAllLookupCode: function () {
            $fn.xHeaderDetails.PayeeSubTypeCode.removeAttr("disabled");
            $fn.xHeaderDetails.CurrencyCode.removeAttr("disabled");
            $fn.xHeaderDetails.SalutationCode.removeAttr("disabled");
            $fn.xHeaderDetails.NameSuffixCode.removeAttr("disabled");
            $fn.xHeaderDetails.GenderCode.removeAttr("disabled");
            $fn.xHeaderDetails.CivilStatusCode.removeAttr("disabled");
            $fn.xHeaderDetails.NationalityCode.removeAttr("disabled");
            $fn.xHeaderDetails.ReligionCode.removeAttr("disabled");
            $fn.xHeaderDetails.AreaCode.removeAttr("disabled");
            $fn.xHeaderDetails.StandardBarangayCode.removeAttr("disabled");
            $fn.xHeaderDetails.MunicipalityCode.removeAttr("disabled");
            $fn.xHeaderDetails.BankCode.removeAttr("disabled");
            /**************************/
        },

        /* ON CLICK EVENTS */
        xOnClickEvents: {

            /* For Tax Registration Type Radio Buttons */
            xRadioButtonTaxRegTrigger: function () {
                let Individual = $fn.xHeaderDetails.Individual.is(":checked");

                if (Individual == true) {
                    $fn.xHeaderDetails.PayeeSubTypeCode.removeAttr("disabled");
                    $fn.xHeaderDetails.CurrencyCode.removeAttr("disabled");
                    $fn.xHeaderDetails.SalutationCode.removeAttr("disabled");
                    $fn.xHeaderDetails.NameSuffixCode.removeAttr("disabled");
                    $fn.xHeaderDetails.GenderCode.removeAttr("disabled");
                    $fn.xHeaderDetails.CivilStatusCode.removeAttr("disabled");
                    $fn.xHeaderDetails.NationalityCode.removeAttr("disabled");
                    $fn.xHeaderDetails.ReligionCode.removeAttr("disabled");
                    $fn.xHeaderDetails.LocationTypeCode.removeAttr("disabled");
                    $fn.xHeaderDetails.AreaCode.removeAttr("disabled");
                    $fn.xHeaderDetails.StandardBarangayCode.removeAttr("disabled");
                    $fn.xHeaderDetails.MunicipalityCode.removeAttr("disabled");
                    $fn.xHeaderDetails.BankCode.removeAttr("disabled");
                    $fn.xHeaderDetails.LocationTypeCode.attr("disabled", "disabled");
                }
                else {
                    $fn.xHeaderDetails.SalutationCode.attr("disabled", "disabled");
                    $fn.xHeaderDetails.NameSuffixCode.attr("disabled", "disabled");
                    $fn.xHeaderDetails.GenderCode.attr("disabled", "disabled");
                    $fn.xHeaderDetails.CivilStatusCode.attr("disabled", "disabled");
                    $fn.xHeaderDetails.NationalityCode.attr("disabled", "disabled");
                    $fn.xHeaderDetails.ReligionCode.attr("disabled", "disabled");
                    $fn.xHeaderDetails.LocationTypeCode.attr("disabled", "disabled");
                }
            },

            /* For Checkbox in Full Address */
            xCheckBoxFullAddressTrigger: function () {
                let cbFullAddress = $fn.xHeaderDetails.FullAddressCheckbox.is(":checked");

                if (cbFullAddress == true) {
                    $fn.xHeaderDetails.FullAddress.prop("disabled", false);
                    $fn.xHeaderDetails.UnitNo.prop("disabled", true);
                    $fn.xHeaderDetails.FloorNo.prop("disabled", true);
                    $fn.xHeaderDetails.BuildingNo.prop("disabled", true);
                    $fn.xHeaderDetails.EstablishmentName.prop("disabled", true);
                    $fn.xHeaderDetails.BuildingName.prop("disabled", true);
                    $fn.xHeaderDetails.Landmark.prop("disabled", true);
                    $fn.xHeaderDetails.StreetNo.prop("disabled", true);
                    $fn.xHeaderDetails.StreetName.prop("disabled", true);
                    $fn.xHeaderDetails.Lot.prop("disabled", true);
                    $fn.xHeaderDetails.Block.prop("disabled", true);
                    $fn.xHeaderDetails.Phase.prop("disabled", true);
                    $fn.xHeaderDetails.Subdivision.prop("disabled", true);
                    $fn.xHeaderDetails.Zone.prop("disabled", true);
                    //$fn.xHeaderDetails.LugArea.enable(false);
                    $fn.xHeaderDetails.LugStandardBarangay.enable(false);
                    $fn.xHeaderDetails.AlternativeBarangay.prop("disabled", true);
                    $fn.xHeaderDetails.LugMunicipality.enable(false);
                    $fn.xHeaderDetails.ZipCode.prop("disabled", true);

                    $fn.xHeaderDetails.FullAddressClass.show();
                    $fn.xHeaderDetails.LandmarkClass.hide();
                    $fn.xHeaderDetails.StreetNameClass.hide();
                    $fn.xHeaderDetails.SubdivisionClass.hide();
                    $fn.xHeaderDetails.StandardBarangayClass.hide();
                    $fn.xHeaderDetails.AlternativeBarangayClass.hide();
                    $fn.xHeaderDetails.MunicipalityClass.hide();

                    $fn.xHeaderDetails.UnitNo.val('');
                    $fn.xHeaderDetails.FloorNo.val('');
                    $fn.xHeaderDetails.BuildingNo.val('');
                    $fn.xHeaderDetails.EstablishmentName.val('');
                    $fn.xHeaderDetails.BuildingName.val('');
                    $fn.xHeaderDetails.Landmark.val('');
                    $fn.xHeaderDetails.StreetNo.val('');
                    $fn.xHeaderDetails.StreetName.val('');
                    $fn.xHeaderDetails.Lot.val('');
                    $fn.xHeaderDetails.Block.val('');
                    $fn.xHeaderDetails.Phase.val('');
                    $fn.xHeaderDetails.Subdivision.val('');
                    $fn.xHeaderDetails.Zone.val('');
                    //$fn.xHeaderDetails.AreaCode.val('');
                    //$fn.xHeaderDetails.AreaDesc.val('');
                    $fn.xHeaderDetails.StandardBarangayCode.val('');
                    $fn.xHeaderDetails.StandardBarangayDesc.val('');
                    $fn.xHeaderDetails.AlternativeBarangay.val('');
                    $fn.xHeaderDetails.MunicipalityCode.val('');
                    $fn.xHeaderDetails.MunicipalityDesc.val('');
                    $fn.xHeaderDetails.ProvinceCode.val('');
                    $fn.xHeaderDetails.ProvinceDesc.val('');
                    $fn.xHeaderDetails.RegionCode.val('');
                    $fn.xHeaderDetails.RegionDesc.val('');
                    $fn.xHeaderDetails.CountryCode.val('');
                    $fn.xHeaderDetails.CountryDesc.val('');
                    $fn.xHeaderDetails.InternationalSubGroupCode.val('');
                    $fn.xHeaderDetails.InternationalSubGroupDesc.val('');
                    $fn.xHeaderDetails.InternationalGroupCode.val('');
                    $fn.xHeaderDetails.InternationalGroupDesc.val('');
                    $fn.xHeaderDetails.ZipCode.val('');
                }
                else {
                    $fn.xHeaderDetails.FullAddress.prop("disabled", true);
                    $fn.xHeaderDetails.UnitNo.prop("disabled", false);
                    $fn.xHeaderDetails.FloorNo.prop("disabled", false);
                    $fn.xHeaderDetails.BuildingNo.prop("disabled", false);
                    $fn.xHeaderDetails.EstablishmentName.prop("disabled", false);
                    $fn.xHeaderDetails.BuildingName.prop("disabled", false);
                    $fn.xHeaderDetails.Landmark.prop("disabled", false);
                    $fn.xHeaderDetails.StreetNo.prop("disabled", false);
                    $fn.xHeaderDetails.StreetName.prop("disabled", false);
                    $fn.xHeaderDetails.Lot.prop("disabled", false);
                    $fn.xHeaderDetails.Block.prop("disabled", false);
                    $fn.xHeaderDetails.Phase.prop("disabled", false);
                    $fn.xHeaderDetails.Subdivision.prop("disabled", false);
                    $fn.xHeaderDetails.Zone.prop("disabled", false);
                    $fn.xHeaderDetails.LugArea.enable(true);
                    $fn.xHeaderDetails.LugStandardBarangay.enable(true);
                    $fn.xHeaderDetails.AlternativeBarangay.prop("disabled", false);
                    $fn.xHeaderDetails.LugMunicipality.enable(true);

                    $fn.xHeaderDetails.FullAddressClass.hide();
                    $fn.xHeaderDetails.LandmarkClass.show();
                    $fn.xHeaderDetails.StreetNameClass.show();
                    $fn.xHeaderDetails.SubdivisionClass.show();
                    $fn.xHeaderDetails.StandardBarangayClass.show();
                    $fn.xHeaderDetails.AlternativeBarangayClass.show();
                    $fn.xHeaderDetails.MunicipalityClass.show();
                }
            }
        },

        /* ON KEYUP EVENTS */
        xOnKeyUpEvents: {

            xFullAddressValue: function () {
                let unitno = $fn.xHeaderDetails.UnitNo.val();
                let flrno = $fn.xHeaderDetails.FloorNo.val();
                let bldgno = $fn.xHeaderDetails.BuildingNo.val();
                let estab = $fn.xHeaderDetails.EstablishmentName.val();
                let bldg = $fn.xHeaderDetails.BuildingName.val();
                let landmark = $fn.xHeaderDetails.Landmark.val();
                let StreetNo = $fn.xHeaderDetails.StreetNo.val();
                let StreetName = $fn.xHeaderDetails.StreetName.val();
                let Lot = $fn.xHeaderDetails.Lot.val();
                let Block = $fn.xHeaderDetails.Block.val();
                let Subdivision = $fn.xHeaderDetails.Subdivision.val();
                let StandardBarangay = $fn.xHeaderDetails.StandardBarangayDesc.val();
                let AlternativeBarangay = $fn.xHeaderDetails.AlternativeBarangay.val();
                let Municipality = $fn.xHeaderDetails.MunicipalityDesc.val();
                let Province = $fn.xHeaderDetails.ProvinceDesc.val();
                let cbFullAddress = $fn.xHeaderDetails.FullAddressCheckbox.is(":checked");
                let FullAddress = '';

                if (unitno.length > 0)
                    unitno = unitno + ' ';
                if (flrno.length > 0)
                    flrno = flrno + ' ';
                if (bldgno.length > 0)
                    bldgno = bldgno + ' ';
                if (estab.length > 0)
                    estab = estab + ' ';
                if (bldg.length > 0)
                    bldg = bldg + ' ';
                if (landmark.length > 0)
                    landmark = landmark + ' ';
                if (StreetNo.length > 0)
                    StreetNo = StreetNo + ' ';
                if (StreetName.length > 0)
                    StreetName = StreetName + ', ';
                if (Lot.length > 0)
                    Lot = Lot + ' ';
                if (Block.length > 0)
                    Block = Block + ' ';
                if (Subdivision.length > 0)
                    Subdivision = Subdivision + ', ';
                if (StandardBarangay.length > 0)
                    StandardBarangay = StandardBarangay + ', ';
                if (AlternativeBarangay.length > 0)
                    AlternativeBarangay = AlternativeBarangay + ', ';
                if (Municipality.length > 0)
                    Municipality = Municipality.replace(',', '') + ' ';

                if (cbFullAddress == true) {
                    //$fn.xHeaderDetails.FullAddress.val('');
                }
                else {
                    FullAddress = unitno + flrno + bldgno + estab + bldg + landmark + StreetNo + StreetName + Lot + Block + Subdivision + StandardBarangay + AlternativeBarangay + Municipality + Province;
                    $fn.xHeaderDetails.FullAddress.val(FullAddress);
                }


            }

        }

    }
    return $fn;
}