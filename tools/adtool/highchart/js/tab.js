;(function($){
	$("#nav li").on("click", function() {
		var $this = $(this);
		var _class = $this.attr("data-tab");
		$this.addClass("active").siblings().removeClass("active");
		$("."+ _class).eq($this.index()).removeClass("hide").siblings("."+_class).addClass("hide");		
	})
})(jQuery);