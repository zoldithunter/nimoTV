var data = [];
var title = [];
$(document).ready(function(){
	$.get( 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqBelAOsajmrwks-r2nB3aAbrir6YYRd0Lz-irZIWceYJk17SId_5K-gKReuGlj4ovjYvUZwmRrEcy/pubhtml', function( html ) {
		$(html).find("table").find("tbody tr").each( function(index, item){
            var $tds=$(this).find('td');
            if (index == 0) {
                $("#titleCard").html('<b>THÔNG SỐ CẬP NHẬT ' + $tds[2].outerText + '</b>')
            }
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

	var options = "";
	const id = 'ID Fanpage_';
    for (var i = 0; i < data.length; i++) {
        options += '<option value=' + data[i][id] + '>' + data[i][id] + '</option>';
    }
    $("#idPage").append(options);

    $("#info").hide();

    $("#idPage").keypress(function(e) {
        var key = e.which;
        if(key == 13) {
            $("#submit").click();
            return false;
        }
    })

	$("#submit").click(function() {
        $("#data").empty();
        $("#info").hide();
        if ($("#idPage").val() == "") {
            alert("Không có thông tin");
        } else {
            var filter = {
                    'ID Fanpage_' : $("#idPage").val()
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
                let superVip = "";
                let vip = "";
                let html = "";
                myobj_array.forEach(function(it) {

                    if (it[0].includes('**')) {
                        superVip += '<div class="col-lg-6">';
                        superVip += '<label>';
                        superVip += it[0].substring(0, it[0].length - 2) + ': ';
                        superVip += '</label>';
                        superVip += '<h5>';
                        superVip += it[1];
                        superVip += '</h5>';
                        superVip += '</div>';
                    } else if (it[0].includes('*')) {
                        vip += '<div class="col-lg-6">';
                        vip += '<label>';
                        vip += it[0].substring(0, it[0].length - 1) + ': ';
                        vip += '</label>';
                        vip += '<h5>';
                        vip += it[1];
                        vip += '</h5>';
                        vip += '</div>';
                    } else if (it[0].includes('_')) {
                        // notthing 
                    } else {
                        html += '<div class="col-lg-3">';
                        html += '<label>';
                        html += it[0] + ': ';
                        html += '</label>';
                        html += '<h5>';
                        html += it[1];
                        html += '</h5>';
                        html += '</div>';
                    }
                })
                $("#superVip").html(superVip);
                $("#vip").html(vip);
                $("#data").html(html);
            }
        }
	});
});
