var data = [];
$(document).ready(function(){
    jQuery.noConflict();
	$.get( 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSilSZT8gYAGJa0Z7vTlqdMgm0nv7slXARbp5kMht89t6kC1xxsgfUZmnKvLgWqpRzIyB-Z0K8QuNiC/pubhtml', function( html ) {
		$(html).find("table").find("tbody tr").each( function(index, item){
			if (index < 13) {
				var $tds=$(this).find('td');
				data.push({
					stt:$tds.eq(0).text(),
					hoten:$tds.eq(1).text(),
					name:$tds.eq(2).text(),
					nimoID:$tds.eq(3).text(),
					cmt:$tds.eq(4).text(),
					stk:$tds.eq(5).text(),
					ctk:$tds.eq(6).text(),
					nh:$tds.eq(7).text(),
					numOfStone:$tds.eq(8).text(),
					numOfAGCUp:$tds.eq(9).text(),
					targetSalary:$tds.eq(10).text(),
					sumSalary:$tds.eq(11).text(),
				})
			}
	    })
	});


	$("#submitNimoID").click(function() {
		var tmp = data.find(x => x.nimoID === $("#nimoID").val());
        $("#stone").text(tmp.numOfStone);
        $("#target").text(tmp.targetSalary);

        if ($("#nimoID").val() != "") {

        }
	});

    $("#submitCMT").click(function() {
        var tmp = data.find(x => x.cmt === $("#cmt").val());
        $("#stk").text(tmp.stk);
        $("#ctk").text(tmp.ctk);
        $("#nh").text(tmp.nh);
    });

});