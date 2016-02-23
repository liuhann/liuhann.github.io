function multipleChoice(activityJsonObj, activityNumber, myTemplate, myCssClass) {
	var originalJSON = jQuery.extend(true, {}, activityJsonObj);
	/*------------------------------开始生成HTML-------------------------------*/

	function preset(activity) {
		if (activityNumber) activity.head = activityNumber;
	}

	function initJqueryObj() {
		if (myTemplate) {
			template = myTemplate;
		}
		var div = $(template(originalJSON));
		if (myCssClass) {
			$(div).addClass(myCssClass)
		}
		return div;
	}
	/*------------------------------结束生成HTML-------------------------------*/
	/*------------------------------开始绑定动作-------------------------------*/
	function initAction(){
		$("#mchoice_" + activityNumber).find("a").each(function(i) {
			$(this).parent().data("index",i);
		});
	}
	function getEleById(id) {
		var ele = $(id);
		if (ele.length == 0) ele = activityDiv.find(id);
		return ele;
	}
	/*read*/

	function readFn() {
		var answers = [];
		$("#mchoice_" + activityNumber).find(".selected").each(function() {
			var answer = -1;
			answer = $(this).data("index");
			answers.push(answer);
		});
		return answers;
	};
	/*set*/

	function setFn(answers) {
		var clen=0;
		$("#mchoice_" + activityNumber).find("a").each(function() {
			var $parent=$(this).parent();
			if (answers.indexOf($parent.data("index")) > -1) {
				$parent.addClass("selected").children("a").addClass("choose_b");
				clen++;
			} else {
				$parent.removeClass("selected").children("a").removeClass("choose_b");
			}
		});
		$("#mchoice_" + activityNumber).data("clen",clen);
	}
	/*check*/

	function checkFn(arr) {
		var ret = 1;
		var result = [];
		$("#mchoice_" + activityNumber).find("a").each(function(i) {
			var $parent=$(this).parent();
			if (activityJsonObj.answers.choices[i].flag == "right") {
				result.push($parent.data("index"));
			}
		});
		if (JSON.stringify(arr) != JSON.stringify(result)) {
			return 0;
		} else {
			return 1;
		}
	}

	/*check answer*/

	function checkAnswer() {
		$("#mchoice_" + activityNumber).find("a").each(function(i) {
			var $parent=$(this).parent();
			if (activityJsonObj.answers.choices[i].flag == "right") {
				if($parent.hasClass('selected'))$parent.unbind().children("i").addClass("icon_r");
				else $parent.unbind().children("i").addClass("icon_e");
			} else {
				if($parent.hasClass('selected'))$parent.unbind().children("i").addClass("icon_e");
			}
		});
	}
	/*show answer*/

	function showAnswer() {
		$("#mchoice_" + activityNumber).find("a").each(function(i) {
			var $parent=$(this).parent();
			if (activityJsonObj.answers.choices[i].flag == "right") {
				$parent.unbind().addClass("selected").children("a").addClass("choose_b");
			} else {
				$parent.unbind().removeClass("selected").children("a").removeClass("choose_b");
			}
		});
	}

	/*refresh*/

	function refresh() {
		var $Id = getEleById.bind(this);
		var $items=$Id("#mchoice_" + activityNumber).find("a")
		$items.each(function(i) {
			var $parent=$(this).removeClass("choose_b").attr('style','').siblings("i").removeClass().parent();
			$parent.removeClass("selected").parent().data("clen",0)
			$parent.unbind().click(function() {
				var $me=$(this);
				var clen=$me.parent().data("clen")|0;
				if($me.hasClass("selected")){
					$me.parent().data("clen",clen-1);
					$me.removeClass("selected").children("a").removeClass("choose_b");
					if(activityJsonObj.answers.clen&&clen==activityJsonObj.answers.clen)$items.attr('style','');
				}else{
					if($me.children("a").eq(0).attr('style')=='background-color:#ccc;')return;
					$me.parent().data("clen",clen+1);
					$me.addClass("selected").children("a").addClass("choose_b");
					if(activityJsonObj.answers.clen&&clen==(activityJsonObj.answers.clen-1)){
						$items.each(function(){
							if(!$(this).hasClass('choose_b'))$(this).attr('style','background-color:#ccc;');
						})
					}
				}
			});
		});
	}

	/*------------------------------结束绑定动作-------------------------------*/

	preset(originalJSON);
	var activityDiv = typeof(Handlebars) == "undefined" ? "" : initJqueryObj();
	var activityComponent = {
		'container': activityDiv,
		'data': activityJsonObj,
		'initAction':initAction,
		'readFn': readFn,
		'setFn': setFn,
		'checkAnswer': checkAnswer,
		'showAnswer': showAnswer,
		'refresh': refresh,
		'checkFn': checkFn
	};
	activityComponent.refresh();
	return activityComponent;
}
//# sourceURL=mchoice.js