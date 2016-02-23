function singleChoice(container, data, activityNumber) {
	//read
    function checkFn(answer) {
    	var result = 0;
    	
    	var rightAns = [];
        var i = 0;
      	$(this.container).find(".choose").each(function() {
      		if ($(this).find("input[type='radio']").val()=="2") {
      			rightAns.push(i);
      		}
      		i++;
      	});
      	return (JSON.stringify(answer)==JSON.stringify(rightAns))? 1 : 0;
    };
    
    //read
    function readFn() {
        var answer = [];
        var i = 0;
    	$(this.container).find(".choose").each(function() {
    		if ($(this).hasClass("choose_b")) {
    			answer.push(i);
    		} 
    		i++;
    	});
        return answer;
    };
    
    //set
    function setFn(answer) {
    	this.refresh();
    	for(var i=0; i<answer.length; i++) {
    		$(this.container).find(".choose").eq(parseInt(answer[i])).addClass("choose_b");
    	}
    };
    
    //check answer
    function checkAnswer() {
    	$(this.container).find(".choose_b").each(function() {
    		if ($(this).find("input[type='radio']").val()=="2") {
    			$(this).siblings("i").addClass("icon_r");
    		} else {
    			$(this).siblings("i").addClass("icon_e");
    		}
    	});
	
    	$(this.container).find('.choose').unbind();
    };
    //show answer
    function showAnswer() {
        this.refresh();

        $(this.container).find("input[type='radio']").each(function() {
        	if ($(this).val()=="2") {
        		$(this).attr("checked", "checked");
        		$(this).parents("a.choose").addClass("choose_b");
        	}
        });
        $(this.container).find(".choose").unbind();
    };
    
    //refresh
    function refresh() {
    	$(this.container).find("input[type='radio']").removeAttr('checked');
    	$(this.container).find(".choose_b").removeClass("choose_b");
    	
    	$(this.container).find("i.icon_r").removeClass("icon_r");
    	$(this.container).find("i.icon_e").removeClass("icon_e");
        this.choice();
    }

    function choice() {
    	$(this.container).find('.choose').unbind();

    	$(this.container).find(".choose").click(function() {
    		if ($(this).hasClass("choose_b")) {
    			return; 
    		} else {
    			$(this).parents(".list").find(".choose_b").removeClass("choose_b");
    			$(this).parents(".list").find(".choose_b input").removeAttr('checked');
    			
    			$(this).addClass("choose_b");
    			$(this).find("input").attr("checked", "checked");
    		}
    	});
    }

    var activityComponent = {
    	'container': container,
        'data': data,
        'checkFn': checkFn,
        'readFn': readFn,
        'setFn': setFn,
        'checkAnswer': checkAnswer,
        'showAnswer': showAnswer,
        'refresh': refresh,
        'choice': choice
    };
    activityComponent.refresh();
    return activityComponent;
};
