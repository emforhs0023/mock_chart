$(document).ready(function() {
	var floatPosition = parseInt($("#floatMenu").css('top'));
	$(window).scroll(function() {

		var scrollTop = $(window).scrollTop();
		if (scrollTop > 200) {
			$("#header").addClass("scroll");
			$("#header").css("background-color","rgba( 127, 127, 127, 0.8 )");
			$("#video1").rolVideo(1)
		}else{
			$("#header").removeClass("scroll");
			$("#header").css("background-color","#7f7f7f");
		}

		var newPosition = scrollTop + floatPosition + "px";

		$("#floatMenu").stop().animate({
			"top" : newPosition
		}, 500);
	}).scroll();
})