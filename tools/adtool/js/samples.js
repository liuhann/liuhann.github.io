/**
 * 
 */

var ActivityComponents = {
	"1124": {
		"component": DragNDrop,
		"componentName": "DragNDrop",
		"templates": [
		   		   {
		   			   desc: "普通拖拽题模板",
		   			   func: "dragndrop1",
		   			   js: "dragndrop1.js"
		   		   }           
		 ],
		"json": 
 		{
 		    "id":"jalsdfkjl300lj230jl-2342jl23",
 		    "name":"",
 		    "image":"",
 		    "type":"drop down",
 		    "type id":"1124",
 		    "creator":"Hugo",
 		    "date of birth":"2014-03-01",
 		    "description":"",
 		    "tags":[
 		        "exercise", "test", "drag n drop"
 		    ],
 		    "estimated duration":"2",
 		    "count":"1",
 		    "content":[
 		        {
 		            "order":"1",
 		            "question":{
 		                "stem":{
 		                    "en":"English title",
 		                    "zh":""
 		                },
 		                "content":{
 		                    "type":"text",
 		                    "text":"标题可选内容",
 		                    "image":"",
 		                    "sound":""
 		                }
 		            },
 		            "reference":{
 		                "title":{
 		                    "en":"可以拖拽项整体说明"
 		                },
 		                "content":[
 		                    {
 		                        "id":"1",  
 		                        "name":"I",
 		                        "content":{
 		                            "type":"text",
 		                            "text":"It's??",
 		                            "image":"图片内容",
 		                            "sound":"声音内容"
 		                        }
 		                    }
 		                ]
 		            },
 		            "targets":{
 		                "count":"1",
 		                "content":[
 		                    {
 		                         "question":{
 		                            "title": "1",
 		                            "list": [
 		                                 {
 		                                	 "textplain": "wei"
 		                                 },
 		                                 {
 		                                	 "answer": ["1"] 
 		                                 }
 		                             ],
 		                            "image":"",
 		                            "sound":""
 		                        }
 		                    }
 		                ]
 		            }
 		        }
 		    ]
 		},
 		"js": "Multiple-choice.js"
	},
	"1103" : {
		"component": multipleChoice,
		"componentName": "multipleChoice",
		"templates": [
		   {
			   desc: "普通多选模板",
			   func: "mchoice1",
			   js: "mchoice1.js",
			   css: "mchoice1.css"	   
		   }           
		 ],
		"json":    {
 		    "id":"",
 		    "name":"",
 		    "image":"",
 		    "type":"multiple-choice question",
 		    "type id":"1103",
 		    "creator":"Hugo",
 		    "date of birth":"2014-03-01",
 		    "description":"",
 		    "tags":[
 		        "exercise", "test", "multiple-choice question"
 		    ],
 		    "estimated duration":"1",
 		    "count":"2",
 		    "content":[
 		        {
 		            "order":"1",
 		            "question":{
 		                "stem":{
 		                    "en":"English title",
 		                    "zh":"中文题目内容"
 		                },
 		                "content":{
 		                    "type":"text",
 		                    "text":"mouse",
 		                    "image":"",
 		                    "sound":""
 		                }
 		            },
 		            "answers":{
 		                "text":"",
 		                "choices":[
 		                    {
 		                        "type":"text",
 		                        "text":"Choince1",
 		                        "image":"",
 		                        "sound":"",
 		                        "flag":"true"
 		                    }
 		                ],
 		                "order type":"0"
 		            }
 		        }
 		    ]
 		},
 		"js": "component/Multiple-choice.js"
	}
};
