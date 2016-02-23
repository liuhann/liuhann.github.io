


function extractSchoice(w) {
	var result = {
		    "id": "",
		    "name": "",
		    "image": "",
		    "type": "single-choice question",
		    "type id": "1102",
		    "creator": "Hugo",
		    "date of birth": "2014-03-01",
		    "description": "",
		    "tags": [
		        "exercise", "test", "single-choice question"
		    ],
		    "estimated duration": "2",
		    "count": "2"
	};
	
	result.content = w.find(".list").map(function() {
		var c = {};
		
		if ($(this).find(".left_side span.pr5").length > 0 ) {
			c.order =  $(this).find(".left_side span.pr5").html();
			$(this).find(".left_side span.pr5").remove();
			c.question = {"text":  $(this).find(".left_side").html()};
		}
		
		if ($(this).find("p.question_tit").length>0) {
			c.order = $(this).find("p.question_tit span").html();
			$(this).find("p.question_tit span").remove();
			c.question = {"text" : $(this).find("p.question_tit").html()}
		}
		
		if ($(this).find(".content_title.letters").length > 0) {
			c.question = {"text": $(this).find(".content_title:not(.letters)").html()};
			c.order = $(this).find(".content_title.letters").html();
		}

		if ($(this).find(".num").length > 0) {
			c.question = {"text": $(this).find(".content_title").html()};
			c.order = $(this).find(".num").html();
		}
		
		if ($(this).find("ul.check_list").length > 0 ) {
			c.answers = [];
			$(this).find("ul.check_list li").each(function() {
				c.answers.push({
                    "text": $(this).find("span:not(.letters)").html(),
                    "flag": ($(this).find("input").val()==1) ? 0 : 1
                });
			});
		}
		
		if ($(this).find("ul.right_side").length > 0 ) {
			c.answers = [];
			$(this).find("ul.right_side li").each(function() {
				if ($(this).find("a.choose").length>0) {
					var ans = {
							"text": $(this).find("span").last().html(),
							"flag": ($(this).find("input").val()==1) ? 0 : 1
					}
					if ($(this).find("img").length>0) {
						ans.image = $(this).find("img").attr("src");
					}
					c.answers.push(ans);
				} else {
					c.question = {text: $(this).html()}
				} 
			});
		}
		return c;
	}).get();
	
	return result;
}


var re = new RegExp("<(\S*?) [^>]*>.*?</\1>|<.*? />", "gi");	
$(function() {
	$("#btn-s-choice").click(function() {
		var html = $("#ta").val();
		
		var w = $(html);

		var ca = [];
		
		w.find(".list").each(function() {
			var c = {
				"order": $(this).find(">p>span").html()
			}
			$(this).remove(">p>span");
			var quest = $(this).find(">p").text();
			quest = quest.substring(quest.indexOf(" ")+1);
			c.question = {
				stem: {
					en: quest
				}
			};
			c.answers = [];
			$(this).find(">ul>li").each(function() {
				var answer = {
					"text": $(this).find(">a").next("span").html()
				}
				c.answers.push(answer);
			});
			
			ca.push(c);
		});
		
		$("#ta").val(JSON.stringify(ca));
	});
	
	
	$("#btn-it-drag").click(function() {
		var html = $("#ta").val();
		
		var w = $(html);
		
		var content = {
				reference: {
					content: []
				},
				targets: {
					content: []
				}
		};
		
		var i = 1;
		w.find(".options a").each(function() {
			var o = {
					id: i,
					content: {
						 "type": "text",
						 "text": $(this).html()
					}
			}
			i++;
			content.reference.content.push(o);
		});

		
		w.find($("#fc1").val()).each(function() {
			var  area = {
                "question": {
                    "list": [
                    ]
                }
            };
			
			$(this).find("p.length").replaceWith("<se/>");
			
			console.log($(this).html());
			
			var splits = $(this).html().split("<se></se>");
			if (splits.length==1) {
				area.question.list.push({
                    "textplain":  $(this).html()
                })
			} else {
				for (var i = 0; i < splits.length; i++) {
					area.question.list.push({
	                    "textplain":  splits[i].trim()
	                });
					if (i==splits.length-1) break;
					area.question.list.push({
	                    "answer":  []
	                });
				}
			}
			content.targets.content.push(area);
		});
		
		console.log(content);
		
		$("#ta").val(JSON.stringify(content));
	});
});

