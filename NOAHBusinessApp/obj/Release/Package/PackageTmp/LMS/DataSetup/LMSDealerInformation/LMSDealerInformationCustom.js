//const title = "Dealer Information";

//let $DateToday = "";
//let $ServerLink = "";

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
            FullAddressCheckbox2: $("#cbFullAddress2"),
            /* Textboxes and Lookups */

            LocationCode2: $("#txtLocationCode2"),
            LugLocationType2: $("#lugLocationType2"),
            FullAddress2: $("#txtFullAddress2"),
            UnitNo2: $("#txtUnitNo2"),
            FloorNo2: $("#txtFloorNo2"),
            BuildingNo2: $("#txtBldgNo2"),
            EstablishmentName2: $("#txtEstablishment2"),
            BuildingName2: $("#txtBuilding2"),
            Landmark2: $("#txtLandmark2"),
            StreetNo2: $("#txtStreetNo2"),
            StreetName2: $("#txtStreetName2"),
            Lot2: $("#txtLot2"),
            Block2: $("#txtBlock2"),
            Phase2: $("#txtPhase2"),
            Subdivision2: $("#txtSubdivision2"),
            Zone2: $("#txtZone2"),
            LugArea2: $("#lugArea2"),
            LugStandardBarangay2: $("#lugStdBarangay2"),
            AlternativeBarangay2: $("#txtAltBrgy2"),
            LugMunicipality2: $("#lugMunicipality2"),
            LugProvince2: $("#lugProvince2"),
            LugRegion2: $("#lugRegion2"),
            LugCountry2: $("#lugCountry2"),
            //LugInternationalSubGroup2: $("#lugInternationalSubGroup2"),
            //LugInternationalGroup2: $("#lugInternationalGroup2"),
            ZipCode2: $("#txtZip2"),


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
            //PERMA ADD
            StandardBarangayCode2: $("#idvallugStdBarangay2"),
            StandardBarangayDesc2: $("#descvallugStdBarangay2"),
            MunicipalityCode2: $("#idvallugMunicipality2"),
            MunicipalityDesc2: $("#descvallugMunicipality2"),
            ProvinceCode2: $("#idvallugProvince2"),
            ProvinceDesc2: $("#descvallugProvince2"),
            RegionCode2: $("#idvallugRegion2"),
            RegionDesc2: $("#descvallugRegion2"),
            CountryCode2: $("#idvallugCountry2"),
            CountryDesc2: $("#descvallugCountry2"),
            AreaCode2: $("#idvallugArea2"),
            AreaDesc2: $("#descvallugArea2"),
            /* Span Class Required Fields 'Main Location' */
            FullAddressClass: $('.fulladdress'),
            LandmarkClass: $(".landmark"),
            StreetNameClass: $(".streetname"),
            SubdivisionClass: $(".subdivision"),
            StandardBarangayClass: $(".standardbarangay"),
            AlternativeBarangayClass: $(".alternativebarangay"),
            MunicipalityClass: $(".municipality"),
            //PERMA
            FullAddressClass2: $('.fulladdress2'),
            LandmarkClass2: $(".landmark2"),
            StreetNameClass2: $(".streetname2"),
            SubdivisionClass2: $(".subdivision2"),
            StandardBarangayClass2: $(".standardbarangay2"),
            AlternativeBarangayClass2: $(".alternativebarangay2"),
            MunicipalityClass2: $(".municipality2"),
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
            //$fn.xHeaderDetails.TradeName.prop("disabled", true),
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

            //PERMA
            $fn.xHeaderDetails.UnitNo2.prop("disabled", true),
            $fn.xHeaderDetails.FloorNo2.prop("disabled", true),
            $fn.xHeaderDetails.BuildingNo2.prop("disabled", true),
            $fn.xHeaderDetails.EstablishmentName2.prop("disabled", true),
            $fn.xHeaderDetails.BuildingName2.prop("disabled", true),
            $fn.xHeaderDetails.Landmark2.prop("disabled", true),
            $fn.xHeaderDetails.StreetNo2.prop("disabled", true),
            $fn.xHeaderDetails.StreetName2.prop("disabled", true),
            $fn.xHeaderDetails.Lot2.prop("disabled", true),
            $fn.xHeaderDetails.Block2.prop("disabled", true),
            $fn.xHeaderDetails.Phase2.prop("disabled", true),
            $fn.xHeaderDetails.Subdivision2.prop("disabled", true),
            $fn.xHeaderDetails.Zone2.prop("disabled", true),
            $fn.xHeaderDetails.LugArea2.enable(false),
            $fn.xHeaderDetails.LugStandardBarangay2.enable(false),
            $fn.xHeaderDetails.AlternativeBarangay2.prop("disabled", true),
            $fn.xHeaderDetails.LugMunicipality2.enable(false),
            //END

            $fn.xHeaderDetails.PhoneNo.prop("disabled", true),
            $fn.xHeaderDetails.Local.prop("disabled", true),
            $fn.xHeaderDetails.MobileNo.prop("disabled", true),
            $fn.xHeaderDetails.EmailAddress.prop("disabled", true),
            $fn.xHeaderDetails.FaxNo.prop("disabled", true),
            $fn.xHeaderDetails.LugBank.enable(false),
            $fn.xHeaderDetails.BankAccountNo.prop("disabled", true),
            $fn.xHeaderDetails.BankAddress.prop("disabled", true),
            $fn.xHeaderDetails.FullAddressCheckbox.enable(false),
            $fn.xHeaderDetails.FullAddressCheckbox2.enable(false)
        },

        /* Will Enable Fields Upon Refresh */
        xEnableFields: function () {
            //if ($fn.xHeaderDetails.Individual.is(":checked"))
            //    $fn.xHeaderDetails.RegName.prop("disabled", true);
            //else
            //    $fn.xHeaderDetails.RegName.prop("disabled", false);

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
            //PERMA
            $fn.xHeaderDetails.UnitNo2.prop("disabled", false),
            $fn.xHeaderDetails.FloorNo2.prop("disabled", false),
            $fn.xHeaderDetails.BuildingNo2.prop("disabled", false),
            $fn.xHeaderDetails.EstablishmentName2.prop("disabled", false),
            $fn.xHeaderDetails.BuildingName2.prop("disabled", false),
            $fn.xHeaderDetails.Landmark2.prop("disabled", false),
            $fn.xHeaderDetails.StreetNo2.prop("disabled", false),
            $fn.xHeaderDetails.StreetName2.prop("disabled", false),
            $fn.xHeaderDetails.Lot2.prop("disabled", false),
            $fn.xHeaderDetails.Block2.prop("disabled", false),
            $fn.xHeaderDetails.Phase2.prop("disabled", false),
            $fn.xHeaderDetails.Subdivision2.prop("disabled", false),
            $fn.xHeaderDetails.Zone2.prop("disabled", false),
            $fn.xHeaderDetails.LugArea2.enable(true),
            $fn.xHeaderDetails.LugStandardBarangay2.enable(true),
            $fn.xHeaderDetails.AlternativeBarangay2.prop("disabled", false),
            $fn.xHeaderDetails.LugMunicipality2.enable(true),
            //END
            $fn.xHeaderDetails.PhoneNo.prop("disabled", false),
            $fn.xHeaderDetails.Local.prop("disabled", false),
            $fn.xHeaderDetails.MobileNo.prop("disabled", false),
            $fn.xHeaderDetails.EmailAddress.prop("disabled", false),
            $fn.xHeaderDetails.FaxNo.prop("disabled", false),
            $fn.xHeaderDetails.LugBank.enable(true),
            $fn.xHeaderDetails.BankAccountNo.prop("disabled", false),
            $fn.xHeaderDetails.BankAddress.prop("disabled", false),
            $fn.xHeaderDetails.FullAddressCheckbox.enable(true),
            $fn.xHeaderDetails.FullAddressCheckbox2.enable(true)
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
            var isFullAddress2 = $('#chkSamePresentAdd').is(":checked");
            var isPermanentaddChkSame = $('#chkSamePresentAdd').is(":checked");
            
            if (isFullAddress) {
                $fn.xDisableAddressDetails();
            }
            else {
                $fn.xEnableAddressDetails();
            }

            if (isPermanentaddChkSame) {
                $fn.xDisableAddressDetails3();
            }
            else {
                $fn.xEnableAddressDetails3();
            }


            if (isFullAddress2) {
                $fn.xDisableAddressDetails2();
            }
            else {
                $fn.xEnableAddressDetails2();
            }
        },
        //1
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

        //2 PERMANENT

        /* Disable all Address Details */
        xDisableAddressDetails2: function () {
           
            //PERMA
            $fn.xHeaderDetails.FullAddress2.prop("disabled", false);
            $fn.xHeaderDetails.UnitNo2.prop("disabled", true);
            $fn.xHeaderDetails.FloorNo2.prop("disabled", true);
            $fn.xHeaderDetails.BuildingNo2.prop("disabled", true);
            $fn.xHeaderDetails.EstablishmentName2.prop("disabled", true);
            $fn.xHeaderDetails.BuildingName2.prop("disabled", true);
            $fn.xHeaderDetails.Landmark2.prop("disabled", true);
            $fn.xHeaderDetails.StreetNo2.prop("disabled", true);
            $fn.xHeaderDetails.StreetName2.prop("disabled", true);
            $fn.xHeaderDetails.Lot2.prop("disabled", true);
            $fn.xHeaderDetails.Block2.prop("disabled", true);
            $fn.xHeaderDetails.Phase2.prop("disabled", true);
            $fn.xHeaderDetails.Subdivision2.prop("disabled", true);
            $fn.xHeaderDetails.Zone2.prop("disabled", true);
            $fn.xHeaderDetails.LugArea2.enable(false);
            $fn.xHeaderDetails.LugStandardBarangay2.enable(false);
            $fn.xHeaderDetails.AlternativeBarangay2.prop("disabled", true);
            $fn.xHeaderDetails.LugMunicipality2.enable(false);
            $fn.xHeaderDetails.ZipCode2.prop("disabled", true);
            /**************************/
        },


        /* Enable all Address Details */
        xEnableAddressDetails2: function () {
           

            //PERMA
            $fn.xHeaderDetails.FullAddress2.prop("disabled", true);
            $fn.xHeaderDetails.UnitNo2.prop("disabled", false);
            $fn.xHeaderDetails.FloorNo2.prop("disabled", false);
            $fn.xHeaderDetails.BuildingNo2.prop("disabled", false);
            $fn.xHeaderDetails.EstablishmentName2.prop("disabled", false);
            $fn.xHeaderDetails.BuildingName2.prop("disabled", false);
            $fn.xHeaderDetails.Landmark2.prop("disabled", false);
            $fn.xHeaderDetails.StreetNo2.prop("disabled", false);
            $fn.xHeaderDetails.StreetName2.prop("disabled", false);
            $fn.xHeaderDetails.Lot2.prop("disabled", false);
            $fn.xHeaderDetails.Block2.prop("disabled", false);
            $fn.xHeaderDetails.Phase2.prop("disabled", false);
            $fn.xHeaderDetails.Subdivision2.prop("disabled", false);
            $fn.xHeaderDetails.Zone2.prop("disabled", false);
            $fn.xHeaderDetails.LugArea2.enable(true);
            $fn.xHeaderDetails.LugStandardBarangay2.enable(true);
            $fn.xHeaderDetails.AlternativeBarangay2.prop("disabled", false);
            $fn.xHeaderDetails.LugMunicipality2.enable(true);
            $fn.xHeaderDetails.ZipCode2.prop("disabled", false);
            /**************************/
        },
        //3
        /* Disable all Address Details */
        xDisableAddressDetails3: function () {
            
            //PERMA
            $fn.xHeaderDetails.FullAddress2.prop("disabled", false);
            $fn.xHeaderDetails.UnitNo2.prop("disabled", true);
            $fn.xHeaderDetails.FloorNo2.prop("disabled", true);
            $fn.xHeaderDetails.BuildingNo2.prop("disabled", true);
            $fn.xHeaderDetails.EstablishmentName2.prop("disabled", true);
            $fn.xHeaderDetails.BuildingName2.prop("disabled", true);
            $fn.xHeaderDetails.Landmark2.prop("disabled", true);
            $fn.xHeaderDetails.StreetNo2.prop("disabled", true);
            $fn.xHeaderDetails.StreetName2.prop("disabled", true);
            $fn.xHeaderDetails.Lot2.prop("disabled", true);
            $fn.xHeaderDetails.Block2.prop("disabled", true);
            $fn.xHeaderDetails.Phase2.prop("disabled", true);
            $fn.xHeaderDetails.Subdivision2.prop("disabled", true);
            $fn.xHeaderDetails.Zone2.prop("disabled", true);
            $fn.xHeaderDetails.LugArea2.enable(false);
            $fn.xHeaderDetails.LugStandardBarangay2.enable(false);
            $fn.xHeaderDetails.AlternativeBarangay2.prop("disabled", true);
            $fn.xHeaderDetails.LugMunicipality2.enable(false);
            $fn.xHeaderDetails.ZipCode2.prop("disabled", true);
            /**************************/
        },

        /* Enable all Address Details */
        xEnableAddressDetails3: function () {
            

            //PERMA
            $fn.xHeaderDetails.FullAddress2.prop("disabled", true);
            $fn.xHeaderDetails.UnitNo2.prop("disabled", false);
            $fn.xHeaderDetails.FloorNo2.prop("disabled", false);
            $fn.xHeaderDetails.BuildingNo2.prop("disabled", false);
            $fn.xHeaderDetails.EstablishmentName2.prop("disabled", false);
            $fn.xHeaderDetails.BuildingName2.prop("disabled", false);
            $fn.xHeaderDetails.Landmark2.prop("disabled", false);
            $fn.xHeaderDetails.StreetNo2.prop("disabled", false);
            $fn.xHeaderDetails.StreetName2.prop("disabled", false);
            $fn.xHeaderDetails.Lot2.prop("disabled", false);
            $fn.xHeaderDetails.Block2.prop("disabled", false);
            $fn.xHeaderDetails.Phase2.prop("disabled", false);
            $fn.xHeaderDetails.Subdivision2.prop("disabled", false);
            $fn.xHeaderDetails.Zone2.prop("disabled", false);
            $fn.xHeaderDetails.LugArea2.enable(true);
            $fn.xHeaderDetails.LugStandardBarangay2.enable(true);
            $fn.xHeaderDetails.AlternativeBarangay2.prop("disabled", false);
            $fn.xHeaderDetails.LugMunicipality2.enable(true);
            $fn.xHeaderDetails.ZipCode2.prop("disabled", false);
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
            //PERMA
            $fn.xHeaderDetails.StandardBarangayCode2.attr("disabled", "disabled");
            $fn.xHeaderDetails.MunicipalityCode2.attr("disabled", "disabled");
            $fn.xHeaderDetails.ProvinceCode2.attr("disabled", "disabled");
            $fn.xHeaderDetails.RegionCode2.attr("disabled", "disabled");
            $fn.xHeaderDetails.CountryCode2.attr("disabled", "disabled");

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
            //PERMA
            $fn.xHeaderDetails.AreaCode2.removeAttr("disabled");
            $fn.xHeaderDetails.StandardBarangayCode2.removeAttr("disabled");
            $fn.xHeaderDetails.MunicipalityCode2.removeAttr("disabled");

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
                    //PERMA
                    $fn.xHeaderDetails.AreaCode2.removeAttr("disabled");
                    $fn.xHeaderDetails.StandardBarangayCode2.removeAttr("disabled");
                    $fn.xHeaderDetails.MunicipalityCode2.removeAttr("disabled");

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
                  
                    $fn.xHeaderDetails.FullAddressClass.show();
                    $fn.xHeaderDetails.LandmarkClass.hide();
                    $fn.xHeaderDetails.StreetNameClass.hide();
                    $fn.xHeaderDetails.SubdivisionClass.hide();
               

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
            },

            /* For Checkbox in Full Address */
            xCheckBoxFullAddressTrigger2: function () {
                let cbFullAddress2 = $fn.xHeaderDetails.FullAddressCheckbox2.is(":checked");

                if (cbFullAddress2 == true) {
                    $fn.xHeaderDetails.FullAddress2.prop("disabled", false);
                    $fn.xHeaderDetails.UnitNo2.prop("disabled", true);
                    $fn.xHeaderDetails.FloorNo2.prop("disabled", true);
                    $fn.xHeaderDetails.BuildingNo2.prop("disabled", true);
                    $fn.xHeaderDetails.EstablishmentName2.prop("disabled", true);
                    $fn.xHeaderDetails.BuildingName2.prop("disabled", true);
                    $fn.xHeaderDetails.Landmark2.prop("disabled", true);
                    $fn.xHeaderDetails.StreetNo2.prop("disabled", true);
                    $fn.xHeaderDetails.StreetName2.prop("disabled", true);
                    $fn.xHeaderDetails.Lot2.prop("disabled", true);
                    $fn.xHeaderDetails.Block2.prop("disabled", true);
                    $fn.xHeaderDetails.Phase2.prop("disabled", true);
                    $fn.xHeaderDetails.Subdivision2.prop("disabled", true);
                    $fn.xHeaderDetails.Zone2.prop("disabled", true);
                    //$fn.xHeaderDetails.LugArea.enable(false);
                    //$fn.xHeaderDetails.LugStandardBarangay2.enable(false);
                    //$fn.xHeaderDetails.AlternativeBarangay2.prop("disabled", true);
                    //$fn.xHeaderDetails.LugMunicipality2.enable(false);
                    //$fn.xHeaderDetails.ZipCode2.prop("disabled", true);

                    $fn.xHeaderDetails.FullAddressClass2.show();
                    $fn.xHeaderDetails.LandmarkClass2.hide();
                    $fn.xHeaderDetails.StreetNameClass2.hide();
                    $fn.xHeaderDetails.SubdivisionClass2.hide();
                    //$fn.xHeaderDetails.StandardBarangayClass2.hide();
                    //$fn.xHeaderDetails.AlternativeBarangayClass2.hide();
                    $fn.xHeaderDetails.MunicipalityClass2.hide();

                    $fn.xHeaderDetails.UnitNo2.val('');
                    $fn.xHeaderDetails.FloorNo2.val('');
                    $fn.xHeaderDetails.BuildingNo2.val('');
                    $fn.xHeaderDetails.EstablishmentName2.val('');
                    $fn.xHeaderDetails.BuildingName2.val('');
                    $fn.xHeaderDetails.Landmark2.val('');
                    $fn.xHeaderDetails.StreetNo2.val('');
                    $fn.xHeaderDetails.StreetName2.val('');
                    $fn.xHeaderDetails.Lot2.val('');
                    $fn.xHeaderDetails.Block2.val('');
                    $fn.xHeaderDetails.Phase2.val('');
                    $fn.xHeaderDetails.Subdivision2.val('');
                    $fn.xHeaderDetails.Zone2.val('');
                    //$fn.xHeaderDetails.AreaCode.val('');
                    //$fn.xHeaderDetails.AreaDesc.val('');
                    $fn.xHeaderDetails.LugStandardBarangay2.val('');
                    //$fn.xHeaderDetails.StandardBarangayDesc2.val('');
                    $fn.xHeaderDetails.AlternativeBarangay2.val('');
                    $fn.xHeaderDetails.LugMunicipality2.val('');
                    //$fn.xHeaderDetails.MunicipalityDesc2.val('');

                    
                    $fn.xHeaderDetails.LugProvince2.val('');
                    //$fn.xHeaderDetails.ProvinceDesc2.val('');
                    $fn.xHeaderDetails.LugRegion2.val('');
                    //$fn.xHeaderDetails.RegionDesc2.val('');
                    $fn.xHeaderDetails.LugCountry2.val('');
                    //$fn.xHeaderDetails.CountryDesc2.val('');
                    //$fn.xHeaderDetails.InternationalSubGroupCode2.val('');
                    //$fn.xHeaderDetails.InternationalSubGroupDesc2.val('');
                    //$fn.xHeaderDetails.InternationalGroupCode2.val('');
                    //$fn.xHeaderDetails.InternationalGroupDesc2.val('');
                    $fn.xHeaderDetails.StandardBarangayCode2.val('');
                    $fn.xHeaderDetails.StandardBarangayDesc2.val('');
                    $fn.xHeaderDetails.AlternativeBarangay2.val('');
                    $fn.xHeaderDetails.MunicipalityCode2.val('');
                    $fn.xHeaderDetails.MunicipalityDesc2.val('');
                    $fn.xHeaderDetails.ProvinceCode2.val('');
                    $fn.xHeaderDetails.ProvinceDesc2.val('');
                    $fn.xHeaderDetails.RegionCode2.val('');
                    $fn.xHeaderDetails.RegionDesc2.val('');
                    $fn.xHeaderDetails.CountryCode2.val('');
                    $fn.xHeaderDetails.CountryDesc2.val('');


                    $fn.xHeaderDetails.ZipCode2.val('');
                }
                else {
                    $fn.xHeaderDetails.FullAddress2.prop("disabled", true);
                    $fn.xHeaderDetails.UnitNo2.prop("disabled", false);
                    $fn.xHeaderDetails.FloorNo2.prop("disabled", false);
                    $fn.xHeaderDetails.BuildingNo2.prop("disabled", false);
                    $fn.xHeaderDetails.EstablishmentName2.prop("disabled", false);
                    $fn.xHeaderDetails.BuildingName2.prop("disabled", false);
                    $fn.xHeaderDetails.Landmark2.prop("disabled", false);
                    $fn.xHeaderDetails.StreetNo2.prop("disabled", false);
                    $fn.xHeaderDetails.StreetName2.prop("disabled", false);
                    $fn.xHeaderDetails.Lot2.prop("disabled", false);
                    $fn.xHeaderDetails.Block2.prop("disabled", false);
                    $fn.xHeaderDetails.Phase2.prop("disabled", false);
                    $fn.xHeaderDetails.Subdivision2.prop("disabled", false);
                    $fn.xHeaderDetails.Zone2.prop("disabled", false);
                    $fn.xHeaderDetails.LugArea2.enable(true);
                    $fn.xHeaderDetails.LugStandardBarangay2.enable(true);
                    $fn.xHeaderDetails.AlternativeBarangay2.prop("disabled", false);
                    $fn.xHeaderDetails.LugMunicipality2.enable(true);

                    $fn.xHeaderDetails.FullAddressClass2.hide();
                    $fn.xHeaderDetails.LandmarkClass2.show();
                    $fn.xHeaderDetails.StreetNameClass2.show();
                    $fn.xHeaderDetails.SubdivisionClass2.show();
                    $fn.xHeaderDetails.StandardBarangayClass2.show();
                    $fn.xHeaderDetails.AlternativeBarangayClass2.show();
                    $fn.xHeaderDetails.MunicipalityClass2.show();
                }
            }

        },



        /* ON KEYUP EVENTS */
        xOnKeyUpEvents: {

            xFullAddressValue: function () {
                let unitno = $fn.xHeaderDetails.UnitNo.val();
                let flrno = $fn.xHeaderDetails.FloorNo.val();
                let bldgno = $fn.xHeaderDetails.BuildingNo.val();
                let bldg = $fn.xHeaderDetails.BuildingName.val();
                let landmark = $fn.xHeaderDetails.Landmark.val();
                let StreetNo = $fn.xHeaderDetails.StreetNo.val();
                let StreetName = $fn.xHeaderDetails.StreetName.val();
                let Lot = $fn.xHeaderDetails.Lot.val();
                let Block = $fn.xHeaderDetails.Block.val();
                let Phase = $fn.xHeaderDetails.Phase.val();
                let Subdivision = $fn.xHeaderDetails.Subdivision.val();
                let Zone = $fn.xHeaderDetails.Zone.val();
                let Area = $fn.xHeaderDetails.AreaDesc.val();
                let StandardBarangay = $fn.xHeaderDetails.StandardBarangayDesc.val();
                let AlternativeBarangay = $fn.xHeaderDetails.AlternativeBarangay.val();
                let Municipality = $fn.xHeaderDetails.MunicipalityDesc.val();
                let Province = $fn.xHeaderDetails.ProvinceDesc.val();
                let Region = $fn.xHeaderDetails.RegionDesc.val();
                let Couintry = $fn.xHeaderDetails.CountryDesc.val();
                let Zipcode = $fn.xHeaderDetails.ZipCode.val();
                let cbFullAddress = $fn.xHeaderDetails.FullAddressCheckbox.is(":checked");
                let FullAddress = '';

                if (unitno.length > 0)
                    unitno = unitno + ' ';
                if (flrno.length > 0)
                    flrno = flrno + ' ';
                if (bldgno.length > 0)
                    bldgno = bldgno + ' ';
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
                if (Phase.length > 0)
                    Phase = Phase + ' ';
                if (Subdivision.length > 0)
                    Subdivision = Subdivision + ', ';
                if (Zone.length > 0)
                    Zone = Zone + ', ';
                if (Area.length > 0)
                    Area = Area + ', ';
                if (StandardBarangay.length > 0)
                    StandardBarangay = StandardBarangay + ', ';
                if (AlternativeBarangay.length > 0)
                    AlternativeBarangay = AlternativeBarangay + ', ';
                if (Municipality.length > 0)
                    Municipality = Municipality.replace(',', '') + ' ';
                if (Province.length > 0)
                    Province = Province.replace(',', '') + ' ';
                if (Region.length > 0)
                    Region = Region.replace(',', '') + ' ';
                if (Couintry.length > 0)
                    Couintry = Couintry.replace(',', '') + ' ';
                if (Zipcode.length > 0)
                    Zipcode = Zipcode.replace(',', '') + ' ';

                if (cbFullAddress == true) {
                    //$fn.xHeaderDetails.FullAddress.val('');
                }
                else {
                    FullAddress = unitno + flrno + bldgno + bldg + landmark + StreetNo + StreetName + Lot + Block + Phase + Subdivision + Zone + Area + StandardBarangay + AlternativeBarangay + Municipality + Province + Region + Couintry + Zipcode;
                    $fn.xHeaderDetails.FullAddress.val(FullAddress);
                }


            },

            xFullAddressValue2: function () {
                let unitno2 = $fn.xHeaderDetails.UnitNo2.val();
                let flrno2 = $fn.xHeaderDetails.FloorNo2.val();
                let bldgno2 = $fn.xHeaderDetails.BuildingNo2.val();
                let bldg2 = $fn.xHeaderDetails.BuildingName2.val();
                let landmark2 = $fn.xHeaderDetails.Landmark2.val();
                let StreetNo2 = $fn.xHeaderDetails.StreetNo2.val();
                let StreetName2 = $fn.xHeaderDetails.StreetName2.val();
                let Lot2 = $fn.xHeaderDetails.Lot2.val();
                let Block2 = $fn.xHeaderDetails.Block2.val();
                let Phase2 = $fn.xHeaderDetails.Phase2.val();
                let Subdivision2 = $fn.xHeaderDetails.Subdivision2.val();
                let Zone2 = $fn.xHeaderDetails.Zone2.val();
                let Area2 = $fn.xHeaderDetails.AreaDesc2.val();

                


                let StandardBarangay2 = $fn.xHeaderDetails.StandardBarangayDesc2.val();
                let AlternativeBarangay2 = $fn.xHeaderDetails.AlternativeBarangay2.val();
                let Municipality2 = $fn.xHeaderDetails.MunicipalityDesc2.val();
                let Province2 = $fn.xHeaderDetails.ProvinceDesc2.val();
                let Region2 = $fn.xHeaderDetails.RegionDesc2.val();
                let Country2 = $fn.xHeaderDetails.CountryDesc2.val();
                let ZipCode2 = $fn.xHeaderDetails.ZipCode2.val();
                let cbFullAddress2 = $fn.xHeaderDetails.FullAddressCheckbox2.is(":checked");
                let FullAddress2 = '';


                

                if (unitno2.length > 0)
                    unitno2 = unitno2 + ' ';
                if (flrno2.length > 0)
                    flrno2 = flrno2 + ' ';
                if (bldgno2.length > 0)
                    bldgno2 = bldgno2 + ' ';
                if (bldg2.length > 0)
                    bldg2 = bldg2 + ' ';
                if (landmark2.length > 0)
                    landmark2 = landmark2 + ' ';
                if (StreetNo2.length > 0)
                    StreetNo2 = StreetNo2 + ' ';
                if (StreetName2.length > 0)
                    StreetName2 = StreetName2 + ', ';
                if (Lot2.length > 0)
                    Lot2 = Lot2 + ' ';
                if (Block2.length > 0)
                    Block2 = Block2 + ' ';
                if (Phase2.length > 0)
                    Phase2 = Phase2 + ' ';
                if (Subdivision2.length > 0)
                    Subdivision2 = Subdivision2 + ', ';
                if (Zone2.length > 0)
                    Zone2 = Zone2 + ', ';
                if (Area2.length > 0)
                    Area2 = Area2 + ', ';
                if (StandardBarangay2.length > 0)
                    StandardBarangay2 = StandardBarangay2 + ', ';
                if (AlternativeBarangay2.length > 0)
                    AlternativeBarangay2 = AlternativeBarangay2 + ', ';
                if (Municipality2.length > 0)
                    Municipality2 = Municipality2.replace(',', '') + ' ';
                if (Province2.length > 0)
                    Province2 = Province2.replace(',', '') + ' ';
                if (Region2.length > 0)
                    Region2 = Region2.replace(',', '') + ' ';
                if (Country2.length > 0)
                    Country2 = Country2.replace(',', '') + ' ';
                if (ZipCode2.length > 0)
                    ZipCode2 = ZipCode2.replace(',', '') + ' ';

                if (cbFullAddress2 == true) {
                    //$fn.xHeaderDetails.FullAddress.val('');
                }
                else {
                    FullAddress2 = unitno2 + flrno2 + bldgno2 + bldg2 + landmark2 + StreetNo2 + StreetName2 + Lot2 + Block2 + Phase2 + Subdivision2 + Zone2 + Area2 + StandardBarangay2 + AlternativeBarangay2 + Municipality2 + Province2 + Region2 + Country2 + ZipCode2;
                    $fn.xHeaderDetails.FullAddress2.val(FullAddress2);
                }


            }

        }

    }
    return $fn;
}