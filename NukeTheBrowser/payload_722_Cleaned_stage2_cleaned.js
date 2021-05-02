function Complete() {
    setTimeout('location.href = "about:blank', 2000);
}

function CheckIP() {
    var req = null;
    try {
        req = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            req = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
            try {
                req = new XMLHttpRequest();
            } catch (e) {}
        }
    }
    if (req == null) return "0";
    req.open("GET", "/fg/show.php?get_ajax=1&r=" + Math.random(), false);
    req.send(null);
    if (req.responseText == "1") {
        return true;
    } else {
        return false;
    }
}
Complete();
