$( function() {
	readRuleFile("NimoTV_Luong.xlsx");
});


function readRuleFile(filePath) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#body').html("");
            let lines = this.responseText.split('\n');
            [...lines].forEach((ele, i) => {
                alert('tet');
            })
        }
    };
    xmlhttp.open("GET", filePath, true);
    xmlhttp.send();
}
