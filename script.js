$(document).ready(function(){

	// use your spreadsheet id here
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
