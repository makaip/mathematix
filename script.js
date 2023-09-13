let open = true;
function togglePanel() {
    if (open) {
        document.getElementById("sidebarleft").hidden = true;
        document.getElementById("openpanelbutton").hidden = false;
        open = false;
    } else {
        document.getElementById("sidebarleft").hidden = false;
        document.getElementById("openpanelbutton").hidden = true;
        open = true;
    }
}
