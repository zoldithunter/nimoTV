var data = [];
$(document).ready(function(){
	$.get( 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSilSZT8gYAGJa0Z7vTlqdMgm0nv7slXARbp5kMht89t6kC1xxsgfUZmnKvLgWqpRzIyB-Z0K8QuNiC/pubhtml', function( html ) {
		$(html).find("table").find("tbody tr").each( function(index, item){
			if (index < 20) {
				var $tds=$(this).find('td');
				data.push({
					stt:$tds.eq(0).text().trim(),
					hoten:$tds.eq(1).text().trim(),
					name:$tds.eq(2).text().trim(),
					nimoID:$tds.eq(3).text().trim(),
					cmt:$tds.eq(4).text().trim(),
					stk:$tds.eq(5).text().trim(),
					ctk:$tds.eq(6).text().trim(),
					nh:$tds.eq(7).text().trim(),
					numOfStone:$tds.eq(8).text().trim(),
					numOfAGCUp:$tds.eq(9).text().trim(),
					targetSalary:$tds.eq(10).text().trim(),
					sumSalary:$tds.eq(11).text().trim(),
				})
			}
	    })
	});
    $("#info").hide();
    $("#infoNimo").hide();

	$("#submitCMT").click(function() {
        $("#info").hide();
        $("#infoNimo").hide();
        if ($("#nimoID").val() == "" && $("#cmt").val() == "") {
            alert("Không có thông tin");
        } else {
            if ($("#nimoID").val() != "" && $("#cmt").val() != "") {
                var filter = {
                    nimoID:$("#nimoID").val(),
                    cmt:$("#cmt").val(),
                }
                var rs = data.filter(function(item){
                            for (var key in filter) {
                                if (item[key] === undefined || item[key] != filter[key])
                                    return false;
                            }
                            return true;
                        });
                if (rs.length == 0) {
                    alert("Thông tin nimoID: " + $("#nimoID").val() + " và cmt: " + $("#cmt").val() + " sai");
                } else {
                    $("#infoNimo").show();
                    $("#stone").text(rs[0].numOfStone);
                    $("#stoneAGC").text(rs[0].numOfAGCUp);
                    $("#target").text(rs[0].targetSalary);
                    $("#info").show();
                    $("#hoten").text(rs[0].hoten);
                    $("#stk").text(rs[0].stk);
                    $("#ctk").text(rs[0].ctk);
                    $("#nh").text(rs[0].nh);
                    $("#salary").text(rs[0].sumSalary);
                }
            } else if ($("#nimoID").val() != "" && $("#cmt").val() == "") {
                var tmp = data.find(x => x.nimoID === $("#nimoID").val());
                if (tmp === undefined) {
                    alert("Không tồn tại niMoID: " + $("#nimoID").val());
                } else {
                    $("#infoNimo").show();
                    $("#stone").text(tmp.numOfStone);
                    $("#stoneAGC").text(tmp.numOfAGCUp);
                    $("#target").text(tmp.targetSalary);
                }
            } else if ($("#nimoID").val() == "" && $("#cmt").val() != "") {
                var tmp = data.find(x => x.cmt === $("#cmt").val());
                if (tmp === undefined) {
                    alert("Không tồn tại CMT: " + $("#cmt").val());
                } else {
                    $("#info").show();
                    $("#hoten").text(tmp.hoten);
                    $("#stk").text(tmp.stk);
                    $("#ctk").text(tmp.ctk);
                    $("#nh").text(tmp.nh);
                }
            }
        }
	});
});
