var data = [];
var title = [];
$(document).ready(function(){
	$.get( 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqBelAOsajmrwks-r2nB3aAbrir6YYRd0Lz-irZIWceYJk17SId_5K-gKReuGlj4ovjYvUZwmRrEcy/pubhtml', function( html ) {
		$(html).find("table").find("tbody tr").each( function(index, item){
            if (index == 1) {
                var $tds=$(this).find('td');
                $tds.each(function(idx, it) {
                    title.push($(this).text().trim());
                })
            }
			if (index < 30 && index > 1) {
				var $tds=$(this).find('td');
				data.push({
					stt:$tds.eq(0).text().trim(),
                    creator:$tds.eq(1).text().trim(),
                    idPage:$tds.eq(2).text().trim(),
                    mg:$tds.eq(3).text().trim(),
                    numOfFollows:$tds.eq(4).text().trim(),
                    liveStream:$tds.eq(5).text().trim(),
                    video:$tds.eq(6).text().trim(),
                    viewTB:$tds.eq(7).text().trim(),
                    ccv:$tds.eq(8).text().trim(),
                    hl:$tds.eq(9).text().trim(),
                    tuongtac:$tds.eq(10).text().trim(),
                    ytb:$tds.eq(11).text().trim(),
                    tiktok:$tds.eq(12).text().trim(),
				})
			}
	    })
	});
    $("#info").hide();

	$("#submitCMT").click(function() {
        $("#data").empty();
        $("#info").hide();
        if ($("#idPage").val() == "") {
            alert("Không có thông tin");
        } else {
            var filter = {
                    idPage:$("#idPage").val()
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

            }
        }





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
