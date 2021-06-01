var data = [];
var title = [];
$(document).ready(function(){
	$.get( 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqBelAOsajmrwks-r2nB3aAbrir6YYRd0Lz-irZIWceYJk17SId_5K-gKReuGlj4ovjYvUZwmRrEcy/pubhtml', function( html ) {
		$(html).find("table").find("tbody tr").each( function(index, item){
            var $tds=$(this).find('td');
            if (index == 1) {
                $tds.each(function(idx, it) {
                    title.push($(this).text().trim());
                })
            }
			if (index < 30 && index > 1) {
                var obj = {};
                $tds.each(function (idx, it) {
                    obj[title[idx]] = $(this).text().trim();
                })
                data.push(obj);
			}
	    })
	});
    $("#info").hide();

	$("#submit").click(function() {
        $("#data").empty();
        $("#info").hide();
        if ($("#idPage").val() == "") {
            alert("Không có thông tin");
        } else {
            var filter = {
                    'ID Fanpage' : $("#idPage").val()
            }
            var rs = data.filter(function(item){
                            for (var key in filter) {
                                if (item[key] === undefined || item[key] != filter[key])
                                    return false;
                            }
                            return true;
                        });
            if (rs.length == 0) {
                alert("Thông tin ID Fanpage: " + $("#idPage").val() + " sai");
            } else {
                var myobj_array= $.map(rs[0], function(value, index) {
                    return [[index,value]];
                });
                $("#info").show();
                myobj_array.forEach(function(it) {
                    $("#data").append('<div class="row">');
                    $("#data").append('<div class="col-lg-3">');
                    $("#data").append('<label>');
                    $("#data").append(it[0]);
                    $("#data").append('</label>');
                    $("#data").append('</div>');
                    $("#data").append('<div class="col-lg-9">');
                    $("#data").append('<label>');
                    $("#data").append(it[1]);
                    $("#data").append('</label>');
                    $("#data").append('</div>');
                    $("#data").append('</div>');
                })
                console.log(rs);
                console.log(myobj_array);
            }
        }
	});
});
