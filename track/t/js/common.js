
$(function() {
	$(".accordion .question").bindtouch(function() {
		$(this).css("-webkit-transform","translateY(0)");
		$(this).prevAll(".question").css("-webkit-transform","translateY(0)");
		$(this).nextAll(".question").css("-webkit-transform","translateY(200px)");
		$(this).siblings(".selection").css("-webkit-transform","translateY(-" + ($(this).nextAll(".question").length) * $(this).outerHeight() + "px)");
	});
});

$.fn.bindtouch = function(cb, nobubble) {
	attachEvent($(this), cb, nobubble);
};

function attachEvent(src, cb, nobubble) {
	$(src).unbind();
	var isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;
	if (isTouchDevice) {
		$(src).bind("touchstart", function(event) {
			$(this).data("touchon", true);
			$(this).addClass("pressed");
			if (nobubble) {
				event.stopPropagation();
			}
		});
		$(src).bind("touchend", function() {
			$(this).removeClass("pressed");
			if ($(this).data("touchon")) {
				cb.bind(this)();
			}
			$(this).data("touchon", false);
			if (nobubble) {
				event.stopPropagation();
			}
		});
		$(src).bind("touchmove", function() {
			$(this).data("touchon", false);
			$(this).removeClass("pressed");
			if (nobubble) {
				event.stopPropagation();
			}
		});
	} else {
		$(src).bind("mousedown", function() {
			$(this).addClass("pressed");
			$(this).data("touchon", true);
		});
		$(src).bind("mouseup", function() {
			$(this).removeClass("pressed");
			$(this).data("touchon", false);
			cb.bind(this)();
		});
	}
}