var data = [];
$(document).ready(function(){
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
                    $("#stone").text(tmp.numOfStone);
                    $("#stoneAGC").text(tmp.numOfAGCUp);
                    $("#target").text(tmp.targetSalary);
                    $("#info").show();
                    $("#hoten").text(tmp.hoten);
                    $("#stk").text(tmp.stk);
                    $("#ctk").text(tmp.ctk);
                    $("#nh").text(tmp.nh);
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