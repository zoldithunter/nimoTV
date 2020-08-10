$( function() {
	var SPREADSHEET_ID = '2PACX-1vSilSZT8gYAGJa0Z7vTlqdMgm0nv7slXARbp5kMht89t6kC1xxsgfUZmnKvLgWqpRzIyB-Z0K8QuNiC'
	$.googleSheetToJSON(SPREADSHEET_ID)
		.done(function(rows){
			// each row is a row of data from the spreadsheet
			console.log(rows);
		})
		.fail(function(err){
			console.log('error!', err);
		});
	});
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
		alert(this.response);
// 			var reader = new FileReader();
// 			if (reader.readAsBinaryString) {
// 				reader.onload = function (e) {
// 					ProcessExcel(e.target.result);
// 				};
// 				reader.readAsBinaryString(this.responseText);
// 			}
        }
    };
    xmlhttp.open("GET", filePath, true);
    xmlhttp.send();
}

function ProcessExcel(data) {
        //Read the Excel File data.
        var workbook = XLSX.read(data, {
            type: 'binary'
        });
 
        //Fetch the name of First Sheet.
        var firstSheet = workbook.SheetNames[0];
 
        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
 
        //Create a HTML Table element.
        var table = $("<table />");
        table[0].border = "1";
 
        //Add the header row.
        var row = $(table[0].insertRow(-1));
 
       //Add the header cells.
        var headerCell = $("<th />");
        headerCell.html("Id");
        row.append(headerCell);
 
        var headerCell = $("<th />");
        headerCell.html("Name");
        row.append(headerCell);
 
        var headerCell = $("<th />");
        headerCell.html("Country");
        row.append(headerCell);
 
        //Add the data rows from Excel file.
        for (var i = 0; i < excelRows.length; i++) {
            //Add the data row.
            var row = $(table[0].insertRow(-1));
 
            //Add the data cells.
            var cell = $("<td />");
            cell.html(excelRows[i].Id);
            row.append(cell);
 
            cell = $("<td />");
            cell.html(excelRows[i].Name);
            row.append(cell);
 
            cell = $("<td />");
            cell.html(excelRows[i].Country);
            row.append(cell);
        }
 
        var dvExcel = $("#dvExcel");
        dvExcel.html("");
        dvExcel.append(table);
    };
