

function SignOutSys(){
    try {
       // init();
       // googleLogout();
       // window.location = "logout.aspx";
    } catch (err) {
        return true;
    }
    return false;
}


function init() {
    gapi.load('auth2', function () {
        // Ready. 
        gapi.auth2.init(
        {
            client_id: 'deleted'
        });
    });
}
function googleLogout() {
    alert("googleLogout start");
    //gapi.auth2.getAuthInstance().signOut();
    //OR (both are same)
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    alert("googleLogout done.");
}