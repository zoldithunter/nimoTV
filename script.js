$(document).ready(function(){
	$.get( 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSilSZT8gYAGJa0Z7vTlqdMgm0nv7slXARbp5kMht89t6kC1xxsgfUZmnKvLgWqpRzIyB-Z0K8QuNiC/pubhtml', function( html ) {

    // Loop through elements you want to scrape content from
    		$(html).find("table").find("tbody tr").each( function(){

        var text = $(this).text();
			console.log(text);
        // Do something with content

    } )

} );
});
