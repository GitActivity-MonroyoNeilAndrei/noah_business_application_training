$(function () {
    var url = window.location + '';
    var uri = url.toString();

    if (uri.indexOf("?") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("?"));
        window.history.replaceState({}, document.title, clean_uri);
    }
    document.oncontextmenu = document.body.oncontextmenu = function () { return false; }
});