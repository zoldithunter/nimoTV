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
                let line = lines[i].split('|');
                let rule = line.splice(0,1);
                let data = line.join("|");
                $('#body').append("<tr><td>Rule" + (i + 1) + ":</td><td><input id = 'rule" + i + "' name='rule' value='" + rule +"'></td><td><input id = 'text" + i +"' name='value' value='"+data+"' ></td></tr>");
            })
        }
    };
    xmlhttp.open("GET", filePath, true);
    xmlhttp.send();
}