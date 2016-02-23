var currentIndex = 99;
function getAnnotation(myParentContainer) {
    if($(".annotation").length >0){
        return $(".annotation");
    }
    if ($("#annotation").length > 0) {
        return $("#annotation");
    } else {
        myParentContainer = myParentContainer ?myParentContainer:$("body").children().first();
        $(myParentContainer).append('<div id="annotation" class="annotation" style="margin-left: 73px;"><div class="correct"></div><span>correct</span><div class="error"></div><span>error</span></div>');
        return $("#annotation");
    }
}

function DragNDrop(data, number, template, css) {
	
	function preset(data) {
		data.number = number;
		
		for(var i=0; i< data.targets.content.length; i++) {
			var content = data.targets.content[i];
			content.answers = [];
			for (var j = 0; j < content.question.list.length; j++) {
				if (content.question.list[j].answer) {
					content.answers = content.answers.concat(content.question.list[j].answer);
				}
			}
		}
	}
	
	function readFn(){
		var result= [];
		var i = 0;
		var number = this.data.number;
		
		for(var i=0; i< this.data.targets.content.length; i++) {
			var drop = $("#dnd_drop_" + number + "_" + i);
			var w = {
				'order': i,
				'answer': []
			}
			if (this.data.targets.content[i].multipleDropArea) {
				drop.find(".subtarget").each(function(){
					if ($(this).find("a.drag").length==1) {
						//var id = parseInt($(this).find("a.drag").attr("id").substring(("dnd_drag_" + number + "_").length));
						w.answer.push(parseInt($(this).find("a.drag").attr("order")));
					} else {
						w.answer.push(-1);
					}
				});
			} else {
				drop.find("a.drag").each(function() {
					//var id = parseInt($(this).attr("id").substring(("dnd_drag_" + number + "_").length));
					w.answer.push(parseInt($(this).attr("order")));
				});
			}
			
			result.push(w);
		}
		return result;
	}
	
    function checkFn(answer) {
    	var result = [];
		var number = this.data.number;
		
		for(var i=0; i<answer.length; i++) {
			var rightans = this.data.targets.content[answer[i].order].answers;
			if (this.data.targets.content[answer[i].order].checkAnswerOrder) {
				result.push(JSON.stringify(answer[i].answer)==JSON.stringify(rightans)?1:0);
			} else if (this.data.targets.content[answer[i].order].singleAnswer) {
				if (answer[i].answer.length==1) {
					result.push((rightans.indexOf(answer[i].answer[0])>-1)?1:0);
				} else {
					result.push(0);
				}
			} else {
				result.push(JSON.stringify(answer[i].answer.sort())==JSON.stringify(rightans.sort())?1:0);
			}
		}
		return result;
    }
    
    //read
	function setFn(result) {
		var instance = this;
		this.refresh();
		var number = this.data.number;
		
		for(var i=0; i<result.length; i++) {
			var drop = $("#dnd_drop_" + number + "_" + i);

			if (this.data.targets.content[i].multipleDropArea) {
				var j = 0;
				drop.find(".subtarget").each(function() {
					if (j<result[i].answer.length && result[i].answer[j]!=-1) {
						instance.appendDrag($(this), result[i].answer[j]);
					}
					j ++;
				});
			} else {
				for(var j=0;j<result[i].answer.length;j++) {
					instance.appendDrag(drop, result[i].answer[j]);
				}
			}
		}
	}

	function checkAnswer(){
		var number = this.data.number;
		var tdata = this.data;
		for(var i=0; i<this.data.targets.content.length; i++) {
			var drop = $("#dnd_drop_" + number + "_" + i);
			if (this.data.targets.content[i].multipleDropArea) {
				var j = 0;
				$(drop).find(".subtarget").each(function() {
					var id = -1;
					if ($(this).find("a.drag").length==1) {
						id = parseInt($(this).find("a.drag").attr("order")); 
						//parseInt($(this).find("a.drag").attr("id").substring(("dnd_drag_" + number + "_").length));
					}
					if (tdata.targets.content[i].checkAnswerOrder) { 
						if (tdata.targets.content[i].answers[j]==id) {
							$(this).addClass("right");
						}  else {
							$(this).addClass("wrong");
						}
					} else {
						if (tdata.targets.content[i].answers.indexOf(id)>-1) {
							$(this).addClass("right");
						}  else {
							$(this).addClass("wrong");
						}
					}
					j ++;
				});
			}  else if (this.data.targets.content[i].separateCheck) { //一个拖拽区有多个答案，不按次序单独判题
				$(drop).find("a.drag").each(function() {
					var id = parseInt($(this).attr("order")); 
					if (tdata.targets.content[i].answers.indexOf(id)==-1) {
						$(this).addClass("wrong");
					} else {
						$(this).addClass("right");
					}
				});
			} else {
				var right = true;
				if (!tdata.targets.content[i].singleAnswer
					&& $(drop).find("a.drag").length!=tdata.targets.content[i].answers.length) {
					right = false;
				} else if (tdata.targets.content[i].singleAnswer && $(drop).find("a.drag").length!=1) {
					right = false;
				} else {
					var currentDrag = 0;
					$(drop).find("a.drag").each(function() {
						if (!right) return;
						var id = parseInt($(this).attr("order")); 
						if (tdata.targets.content[i].answers.indexOf(id)==-1) {
							right = false;
						}
						if (tdata.targets.content[i].checkAnswerOrder) { 
							if (tdata.targets.content[i].answers[currentDrag]!=id) {
								right = false;
							}
						}
						currentDrag++;
					});
					
				}
				if (right) {
					$(drop).addClass("right");
				} else {
					$(drop).addClass("wrong");
				}
			}
		}
		getAnnotation(this.container).show();
		this.deactive();
	}
	
	//show answer
	function showAnswer(){
		this.refresh();
		var instance = this;
		for(var i=0; i<this.data.targets.content.length; i++) {
			
			var drop = $("#dnd_drop_" + this.data.number + "_" + i);
			
			var answer = instance.data.targets.content[i].answers;
			if (this.data.targets.content[i].multipleDropArea) {
				var j = 0;
				drop.find(".subtarget").each(function() {
					instance.appendDrag($(this), answer[j]);
					//$(this).append($("#dnd_drag_" + that.data.number + "_" + answer[j]));
					j ++;
				});
			} else if (this.data.targets.content[i].singleAnswer)  {
				instance.appendDrag(drop, answer[0]);
			} else {
				for (var j = 0; j < answer.length; j++) {
					instance.appendDrag(drop, answer[j]);
					//drop.append($("#dnd_drag_" + that.data.number + "_" + answer[j]));
				}
			}
		}
		this.deactive();
	}
	
	//向目标源增加drag项。 判断为多次拖拽，则自动复制保留原有drag
	function appendDrag(src, order) {
		var target = $("#dnd_drag_" + this.data.number + "_" + order);
		if (data.reference.multiDrop) {
			$(src).append(fakeDrag(target));
		} else {
			$(src).append(target);
		}
	}

	function refresh(){
		this.container.find(".right,.wrong").removeClass("right wrong");
		if (data.reference.multiDrop) {
			this.container.find("a.drag.faked").remove();
		}

		for(var i=0; i<data.reference.content.length; i++) {
			$("#dnd_opt_" + this.data.number).append($("#dnd_drag_" + this.data.number + "_" + data.reference.content[i].id));
		}
		this.container.find(".list i").removeClass();
		getAnnotation(this.container).hide();
		this.active();
	}
	
	function deactive() {
		this.container.find(".drag:not(.faked)").draggable( "disable" );
		this.container.find(".drag.faked").unbind();
	}
	
	function active() {
		this.container.find(".drag:not(.faked)").draggable( "enable" );
	}
	
	function render() {
        preset(data);
        var div;
        if (template && typeof(Handlebars) != "undefined") {
            if (css==null) {
                css = "drag_n_drop";
            }
            var activityDiv = $('<div class="' + css + '"></div>');
            var myStr = template(data);
            activityDiv.html(myStr);
        	div = $(activityDiv);
        } else {
        	div = $("#dnd_" + number);
        }
        $(div).find(".drag").each(function() {
        	var id = parseInt($(this).attr("id").substring(("dnd_drag_" + number + "_").length));
        	$(this).attr("order", id);
        	if (data.reference.multiDrop) {
        		$(this).draggable({ revert: true , revertDuration: 0, stack: '.drag',helper: "clone"});
        	} else {
        		$(this).draggable({ revert: true , revertDuration: 0, stack: '.drag', connectToSortable: ".length"});
        	}
        });
        //$(div).find(".drag")
        
    	for(var i=0; i< data.targets.content.length; i++) {
			var drop = $(div).find("#dnd_drop_" + number + "_" + i);
			
			var dropTarget = drop;
			if (data.targets.content[i].multipleDropArea) {
				dropTarget = drop.find(".subtarget");
			}
			
			dropTarget.droppable({
	        	accept: ".drag",
	            drop: function( event, ui ) {
	            	var t = $(this);
	            	var id = null;
	            	while(id==null) {
	            		id = t.attr("id");
	            		t = t.parent();
	            	}

	            	var seq = id.substring(("dnd_drop_" + number + "_").length);
	            	var answer = getFirstAnswer(data.targets.content[seq].question.list);
	        		if ((answer.length==1 || data.targets.content[seq].singleAnswer) && $(this).children().length >= 1) {
						/*只有一个答案或者明确指定singleAnswer为true 表示只能拖入1个*/
	        			return;
	        		}

					if (ui.draggable.parent().attr("id")===$(this).attr("id")) {
						console.log("equal");
						return;
					}

	        		if (data.targets.content[seq].multipleDropArea && $(this).children().length) {
	        			return;
	        		}
	        		if (data.reference.multiDrop) {
						$(this).find("a.drag").each(function() {
							if ($(this).html()===ui.draggable.html()) {
								$(this).remove();
							}
						});
						$(this).append(fakeDrag(ui.draggable));
	        		} else {
	        			$(this).append(ui.draggable);
	        		}
	            }
	          }).sortable({
				revert: false
			});
		}
    	
        $(div).find("#dnd_opt_" + number).droppable({
        	accept: ".drag",
        	drop: function(event, ui) {
        		$(this).append(ui.draggable);
            	$(this).children().draggable({revert:true, revertDuration: 0}).addClass("drag");
            	$(this).find(".drag").draggable({revert:true, revertDuration: 0});
        	}
        });
        $(div).find(".drag").css("z-index", 99);
        return div;
    }
    var activityComponent = {
		'appendDrag': appendDrag,
		'container': render(),
		'data': data,
        'readFn': readFn,
        'setFn': setFn,
        'refresh': refresh,
        'deactive': deactive,
        'active': active,
        'showAnswer': showAnswer,
        'checkAnswer': checkAnswer,
        'checkFn': checkFn
    };
    activityComponent.refresh();
    return activityComponent;
}

function fakeDrag(src) {
	var fakedDiv = $("<a></a>")
	.html(src.html())
	.attr("order", src.attr("order"))
	.addClass("drag").addClass("faked").click(function() {
		$(this).remove();
	});
	return fakedDiv;
}


function getFirstAnswer(list) {
	for (var m = 0; m < list.length; m++) {
		if (list[m].answer) return list[m].answer;
	}
	return [];
}

