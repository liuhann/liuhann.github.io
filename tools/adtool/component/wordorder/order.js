(function($) {
	$.fn.extend({
		randomize: function() {
			var $this = $(this);
			var elems = $this.children().removeClass("bg_blue bg_red");
			elems.sort(function() {
				return (Math.round(Math.random()) - 0.5)
			});
			elems.detach();
			$this.append(elems);
			return this;
		},
		showAnswer: function() {
			var $this = $(this).sortable({disabled: true});
			var elems = $this.children();
			var temp;
			for (var i = 0; i < elems.length-1; i++) {
				for(var j=i+1;j<elems.length; j++){
					if($(elems[i]).data("order")>$(elems[j]).data("order")){
						temp=elems[i];
						elems[i]=elems[j];
						elems[j]=temp;
					}
				}
			}
			elems.detach();
			$this.append(elems);
		},
		checkAnswer:function(){
			var $this = $(this).sortable({disabled: true});
			var elems = $this.children();
			elems.each(function(i){
				if($(this).data("order")==i)$(this).addClass('bg_blue');
				else $(this).addClass('bg_red');
			});
		},
		readFn:function(){
			var $this = $(this);
			var elems = $this.children();
			var list=[];
	        elems.each(function(i){
	        	var res=$(this).data("order");
	            list.push(res)
	        });
	        return list;
		},
		setFn:function(arr){
			var $this = $(this);
			var elems = $this.children();
			var htmlArr=new Array(elems.length);
			elems.each(function(i){
				htmlArr[$(this).data("order")]=$(this).html();
			})
			for (var i = 0; i < arr.length; i++) {
				elems.eq(i).data("order",arr[i]).html(htmlArr[arr[i]]);
			}
		},
		checkFn:function(){
			var $this = $(this);
			var elems = $this.children();
	        for (var i = 0; i < elems.length; i++) {
	        	if($(elems[i]).data("order")!=i){
	        		break;
	        		return 0;
	        	}
	        };
			return 1;
		}
	});
})(jQuery);

function WordOrder(data, number, template, css) {
	/*-----------------生成页面开始------------------------*/
	function preset() {
		data.head=number;
	}
	function initJqueryObj() {
		var cssClass = "";
		if (css)cssClass = css;
		var activityDiv = $('<div class="' + cssClass + '"></div>');
		var myStr = template(data);
		activityDiv.html(myStr).find("#word_order_"+number).sortable();
		return activityDiv;
	}
	/*-----------------生成页面结束------------------------*/
	/*---------------页面绑定动作开始----------------------*/
	function getEleById(id) {
		var ele = $(id);
		if (ele.length == 0) ele = activityDiv.find(id);
		return ele;
	}
	function initAction(){
		getEleById("#word_order_"+number).sortable();
	}
	function readFn() {
		return $("#word_order_"+number).readFn();
	}

	function setFn(result) {
		$("#word_order_"+number).setFn(result)
	}

	function checkFn(answer) {
		return $("#word_order_"+number).checkFn();
	}

	function checkAnswer() {
		$("#word_order_"+number).checkAnswer();
	}

	//show answer
	function showAnswer() {
		$("#word_order_"+number).showAnswer();
	}
	//refresh
	function refresh() {
		$("#word_order_"+number).randomize().sortable({disabled: false});
	}
	/*---------------页面绑定动作结束----------------------*/

	preset(data);
    var activityDiv = typeof(Handlebars) == "undefined" ? "" : initJqueryObj();
	var activityComponent = {
		'data': data,
		'container': activityDiv,
		'readFn': readFn,
		'setFn': setFn,
		'refresh': refresh,
		'showAnswer': showAnswer,
		'checkAnswer': checkAnswer,
		'checkFn': checkFn,
		'initAction':initAction
	};
	return activityComponent;
}