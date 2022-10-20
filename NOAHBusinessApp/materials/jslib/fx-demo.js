//    # NEW NOAH WEB UI
//    # Company Owner: Forecasting and Planning Technologies Inc. | NOAH Business Applications | PROMPTUS 8
//    # Developer : Rico Buenviaje | RPB
//    # Designer : Rico Buenviaje | RPB
//    # Date Created : June 02, 2021 | RBP
//    # Date Modified : June 02, 2021 | RBP








//TOGGLE OF CHECKBOX COMPONENT

$(document).ready(function () {
    $("input:checkbox").change(function () {
        $(this).closest(".check-group").toggleClass('selected', this.checked);
    });
});