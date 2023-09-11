let open = true;
function togglePanel() {
    if (open) {
        document.getElementById("sidebarleft").hidden = true;
        document.getElementById("openpanelbutton").hidden = false;
        document.getElementById("gridCanvas").width = "795";
        document.getElementById("graphCanvas").width = "795";
        open = false;
    } else {
        document.getElementById("sidebarleft").hidden = false;
        document.getElementById("openpanelbutton").hidden = true;
        document.getElementById("gridCanvas").width = "959";
        document.getElementById("graphCanvas").width = "959";
        open = true;
    }
}
