var componentsRegistry = {};
var currentActivity = {};

function addActivity(typeid) {
	$("#editor").hide();
	
	$.getJSON("component/" + typeid + "/config.json", {
		
	}, function(config) {
		componentsRegistry[typeid] = config;
		/**首先按次序加载组件JS*/
		var jslist =  config.js.slice(0);
		loadJS(jslist, function() {
			/*加载样例的JSON*/
			 $.getJSON("component/" + typeid + "/" + config.sample[0], {}, function(json) {
				$.ajax({
					/*加载样例模板*/
					  url: "component/" + typeid + "/" + config.template,
					  dataType: "text",
					  success:function(template) {
						  currentActivity.type = typeid;
						  currentActivity.data = json;
						  currentActivity.template = template;
						  /*
						  $(".box").data("type", typeid);
						  $(".box").data("data", json);
						  $(".box").data("template",template);
						  */
						  preview();
					  }
				});
			 });
		});
		 if (config.css) {
			 $("#component-css").load("component/" + typeid + "/" + config.css);
		 }
	});
	
	/**加载远程的模板*/
	showMsg("加载共享的模板和样式");
	var url = 'https://api.mongolab.com/api/1/databases/free/collections/templates?apiKey=7cVrH3Yc48-nmlQkrF4PK-NAqy4AJHbS&q={"type":"' + typeid + '"}';
	
	loadShared(url, "#template-list", function(content) {
		currentActivity.template = content;
		preview();
	});
	
	var url = 'https://api.mongolab.com/api/1/databases/free/collections/css?apiKey=7cVrH3Yc48-nmlQkrF4PK-NAqy4AJHbS&q={"type":"' + typeid + '"}';
	loadShared(url, "#css-list", function(content) {
		$("#component-css").text(content);
	});
	
	/*
	$.getJSON(url, {}, function(list) {
		hideMsg();
		$("#template-list option").remove();
		for(var i=0;i<list.length; i++) {
			var op = $("<option>模板 " + i + "</option>");
			op.data("content", list[i].content);
			op.data("oid", list[i]._id.$oid);
			$("#template-list").append(op);
			$("#template-list").change(function() {
				var templateContent = $(this).find("option:selected").data("content");
				currentActivity.template = templateContent;
				preview();
			});
		}
		
		showMsg("加载远程的模板");
		var url = 'https://api.mongolab.com/api/1/databases/free/collections/css?apiKey=7cVrH3Yc48-nmlQkrF4PK-NAqy4AJHbS&q={"type":"' + typeid + '"}';
		$.getJSON(url, {}, function(csslist) {
			hideMsg();
			$("#css-list option").remove();
			for(var i=0;i<csslist.length; i++) {
				var op = $("<option>样式 " + i + "</option>");
				op.data("content", list[i].content);
				op.data("oid", list[i]._id.$oid);
				$("#css-list").append(op);
				$("#css-list").change(function() {
					var templateContent = $(this).find("option:selected").data("content");
					currentActivity.template = templateContent;
					preview();
				});
			}
			
		});
	});
	*/
	
	function loadShared(url, appendTo, change) {
		$(appendTo + " option").remove();
		$.getJSON(url, {}, function(list) {
			hideMsg();
			for(var i=0;i<list.length; i++) {
				var op = $("<option>共享" + i + "</option>");
				op.data("content", list[i].content);
				op.data("oid", list[i]._id.$oid);
				$(appendTo).append(op);
				$(appendTo).change(function() {
					var content = $(this).find("option:selected").data("content");
					change(content);
					currentActivity.template = templateContent;
					preview();
				});
			}
		});
	}
}


//根据模板生成HTML代码
function loadHTMLByData(data, func, templateId) {
    var template = Handlebars.templates[templateId];
    var allHTML="";
    for(var i=0; i<data.content.length; i++) {
        var component = addActivityComponent(data.content[i], func, template);
        allHTML += component.container;
    }
    return allHTML;
}

var editor = null;

var defaultHTML = "";
$(function() {
	defaultHTML = $(".tool-area").html();
	editor = ace.edit("editor");
	editor.setOptions({
	    maxLines: Infinity
	});
	$(".tool-left a").click(function() {
		$(".tool-left a.checked").removeClass("checked");
		$(this).addClass("checked");
	})
	$("#btn-export-zip").click(function() {
		exportZip(true);
	})
	$("#btn-export-html-zip").click(function() {
		exportZip();
	})
	
	$("#btn-add-mchoice").click(function() {
		addActivity('mchoice');
	});
	
	$("#btn-add-highlight").click(function() {
		addActivity('highlight');
	});
	
	$("#btn-fill-up-blank").click(function() {
		addActivity("fillblank");
	})
	
	$("#btn-word-order").click(function() {
		addActivity("wordorder");
	});
	
	$("#btn-match").click(function() {
		addActivity("wordlink");
	});
	
	$("#btn-drop-down").click(function() {
		addActivity("dropdown");
	});
	
	$("#btn-add-schoice").click(function() {
		addActivity("schoice");
	});
	
	$("#btn-edit-json").click(function() {
		 editJSON();
	});
	
	$("#btn-add-dragndrop").click(function() {
		addActivity('dragndrop');
	});
	
	$("#btn-preview").click(function() {
		saveJSON();
	});
	
	$("#btn-edit-handlebars").click(function() {
		editTemplate();
	});
	
	$("#btn-preview-handlebars").click(function() {
		preview();
	});
	
	$("#btn-upload-handlebars").click(function() {
		templateUpload();
	});
	
	$("#btn-share-css").click(function() {
		cssUpload();
	});
	
	$("#btn-edit-css").click(function() {
		editCss();
	});
	
	$("#btn-delete-template").click(function() {
		deleteTemplate();
	});
	
	$("#input").change(function(d) {
		var list = d.currentTarget.files;
		handleFiles(list);
	});
	
	$("#global-css").change(function() {
		var css = $(this).val();
		$("#common-css").attr("href", css + "/style/common.css");
	});
	
	$(".tool-area").on("dragenter", function(e) {
		if (e.originalEvent.dataTransfer) {
			    e.stopPropagation();
			    e.preventDefault();
			    $(this).css('border', '2px dashed #0B85A1');
		}
	}).on("dragover", function(e) {
		if (e.originalEvent.dataTransfer) {
			 e.stopPropagation();
		     e.preventDefault();
		}
	}).on("drop", function(e) {
		if (e.originalEvent.dataTransfer) {
			$(this).css('border', 'none');
			e.preventDefault();
			var files = e.originalEvent.dataTransfer.files;
			readFile(files[0]);
		}
	});
	
});

/**编辑模板 */
function editTemplate() {
	$("#editor").show();
	editor = ace.edit("editor");
	editor.setOptions({
	    maxLines: Infinity
	});
    editor.getSession().setMode("ace/mode/handlebars");
    editor.setTheme("ace/theme/chrome");
    
    editor.setValue(currentActivity.template);
    $(".box .generated").hide();
}

/**编辑css内容*/
function editCss() {
	$("#editor").show();
	editor = ace.edit("editor");
	editor.setOptions({
	    maxLines: Infinity
	});
    editor.getSession().setMode("ace/mode/css");
    editor.setTheme("ace/theme/chrome");
    editor.setValue($("#component-css").html());
    $(".box").hide();
}

/**
 * 模板预览,预览时需要已设置以下变量
 * 1 题目类型: $(".box").data("type")
 * 2 题目的json：$(".box").data("data")
 * 3 题目的模板: $(".box").data("data")
 */
function preview() {
	if (editor!=null) {
		var editContent = editor.getValue();
		$("#editor").hide();
		
		/** 根据当前编辑器的模式， 判断是json还是模板，然后分别进行保存 */
		var mode = editor.getSession().getMode()['$id'];
		if (mode=="ace/mode/handlebars") {
			currentActivity.template = editContent;
		}
		if (mode=="ace/mode/css") {
			$("#component-css").text(editContent);
		}
		
		if (mode=="ace/mode/json") {
			var clonedData = jQuery.extend(true, {}, JSON.parse(editContent));
			currentActivity.data = clonedData;
		}
		editor.destroy();
		editor = null;
	}
	
	var type = currentActivity.type;
	var jsondata = 	currentActivity.data;
	var template = currentActivity.template;
	render(type, jsondata, template);
}

function render(componentType, jsonData, templateText) {
	$(".box").show();
	 var componentDef  = componentsRegistry[componentType];

	 /**获取组件*/
	 var component = eval(componentDef.componentName); 
	 var clonedData = jQuery.extend(true, {}, jsonData);
	 
	 var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
	 var templatePrecompiled = Handlebars.precompile(templateText);
	 
	 eval('templates[\'templatePreview\'] = template(' +  templatePrecompiled + ');\n');
	 
	 $(".question_cont").html("");
	 /**生成HTML时 自动将序号置为1*/
	 activityOrderNumber = 1;
	 activityComponents = [];
	 loadDataByTemplate(clonedData, component, "templatePreview", ".question_cont");
	 
	 $("head link").each(function() {
		if ($(this).attr("href").indexOf("component/")>-1) {
			$(this).remove();
		} 
	 });
	 /*
	 $("head").append("<link rel='stylesheet' type='text/css' href='component/" + componentType + "/" + componentDef.css + "'/>");
	 */
}


function templatePreview() {
	$("#editor").hide();
	var container = $(".box"); 
	var type = currentActivity.type;
	var templateContent = editor.getValue();
	currentActivity.template = templateContent;
	var template = Handlebars.compile(templateContent);
	var precompiled  = Handlebars.precompile(templateContent);
	var html = template(currentActivity.data);
	container.find(".question_cont").html("");
	container.find(".question_cont").append(html);
}

function cssUpload() {
	var cssContent = null;
	if (editor!=null) {
		var mode = editor.getSession().getMode()['$id'];
		if (mode=="ace/mode/css") {
			cssContent = editor.getValue();
		}
	}
	if (cssContent==null) {
		cssContent = $("#component-css").html();
	}
	var type = currentActivity.type;
	showMsg("正在上传样式文件...");
	
	$.ajax( { url: "https://api.mongolab.com/api/1/databases/free/collections/css?apiKey=7cVrH3Yc48-nmlQkrF4PK-NAqy4AJHbS",
		  data: JSON.stringify( { "content" : cssContent,"type": type}),
		  type: "POST",
		  contentType: "application/json",
		  complete: function() {
			  hideMsg();
			  alert("保存成功");
	}});
}

function templateUpload() {
	var templateContent = currentActivity.template;
	var type = currentActivity.type;
	showMsg("正在上传模板...");
	$.ajax( { url: "https://api.mongolab.com/api/1/databases/free/collections/templates?apiKey=7cVrH3Yc48-nmlQkrF4PK-NAqy4AJHbS",
		  data: JSON.stringify( { "content" : templateContent,"type": type}),
		  type: "POST",
		  contentType: "application/json",
		  complete: function() {
			  hideMsg();
			  alert("保存成功");
		  }});
}

function deleteTemplate() {
	if (confirm("确定删除共享的模板?")) {
		showMsg("正在删除模板...");
		var selected = $("#template-list option:selected").data("oid");
		$.ajax( { url: 'https://api.mongolab.com/api/1/databases/free/collections/templates/' + selected + '?apiKey=7cVrH3Yc48-nmlQkrF4PK-NAqy4AJHbS',
			  data: JSON.stringify( [ { "x" : 1 }, { "x" : 2 }, { "x" : 3 } ] ),
			  type: "DELETE",
			  complete: function() {
				  hideMsg();
				  addActivity(currentActivity.type);
			  }} );
	}
}

function editJSON() {
	$("#editor").show();
	$("#btn-preview").show();
	editor = ace.edit("editor");
	editor.setOptions({
	    maxLines: Infinity
	});
    editor.getSession().setMode("ace/mode/json");
    editor.setTheme("ace/theme/chrome");
    editor.setValue(JSON.stringify(currentActivity.data, null, 4));
    $(".box .generated").hide();
}


function exportZip(isTool) {
	
	if ($("#editor:visible").length==1) {
		preview();
	}
	var container = $(".box"); 
	var jsonData = currentActivity.data;
	//var templateIndex = container.data("templateIndex");
	var type = currentActivity.type;
	var componentDef  = componentsRegistry[type];
	var zip = new JSZip();
	copyFile(zip, "js/jquery-1.7.2.min.js");
	copyFile(zip, "js/common.js");

	var html = "<!DOCTYPE html>\n<html>\n<head>\n";
	
	html += '<meta charset="UTF-8">\n';
	html += '<meta http-equiv="X-UA-Compatible" content="IE=edge">\n';
	html += '<meta name="viewport" content="width=device-width, initial-scale=1">\n';
	html += '<link rel="stylesheet" type="text/css" href="' + $("#global-css").val() + '/style/common.css">\n';
	
	/*
	if (componentDef.templates[templateIndex].css) {
	}
	*/
	/** 目前组件自定义的css都放置在 css/style.css */
	html += '<link rel="stylesheet" type="text/css" href="css/style.css">\n';
	
	html += '<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>\n';
	
	/*如果是工具来生成*/
	if(isTool){
		copyFile(zip, "js/handlebars.runtime.min.js");
		html += '<script type="text/javascript" src="js/handlebars.runtime.min.js"></script>\n';
		
		//引入模板方法
		var runTimeScript = '(function() {';
		runTimeScript += 'var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};';
		
		var templatePrecompiled = Handlebars.precompile(currentActivity.template);
		runTimeScript += 'templates["runtimeTemplate"] = template(' + templatePrecompiled + ');\n';
		runTimeScript += '})();';
		
		zip.file("template.js", runTimeScript);
		html += '<script type="text/javascript" src="template.js"></script>\n';
	}
	html += '<script type="text/javascript" src="js/common.js"></script>\n';
	
	//引入组件类
	for(var i=0; i<componentDef.js.length; i++) {
		html += '<script type="text/javascript" src="' + componentDef.js[i] + '"></script>\n';
		copyFile(zip,  componentDef.js[i]);
	} 
	//html += '<script type="text/javascript" src="' + componentDef.run.js + '"></script>\n';

	html += '<script type="text/javascript" src="data.js"></script>\n';
	html += '<script type="text/javascript">\n';
    html +=	'$(document).ready(function() {\n';
    /*如果是工具来生成*/
    if(isTool)html += 'loadDataByTemplate(data, ' +  componentDef.componentName + ', "runtimeTemplate", ".question_cont")';
    /*否则*/
    else html += 'loadActionByData(data, ' +  componentDef.componentName + ')';
    html +=	'});</script>\n';
	html +=	'</head>\n<body>\n';
	html += '<div class="box">\n';
	html += '<div class="headBar">\n';
	html += '<div class="title">\n';
	html += '<span class="title_style">6b</span>\n';
	html += '<span class="title_font">Vocabulary</span>\n';
	html += '</div>\n';
	html += '<div class="headLine"></div>\n';
	html += '<div class="title_right"></div>\n';
	html += '</div>\n';
	html += '<div class="subhead">\n';
	html += '<div>\n';
	html += '<span class="sub_icon"></span>\n';
	html += '<span class="subhead_style">Personal taste<em></em></span>\n';
	html += '</div>\n';
	html += '</div>\n';
	html += '<div class="content">\n';
	html += '<div class="question_title">\n';
	html += '<span class="number">2</span>\n';
	html += '<div>Use a dictionary to help you replace the underlined words below with the adjectives in the box that have a similar meaning. There are two possible answers for each one.</div>\n';
	html += '</div>\n';
	html += '<div class="question_cont">\n';
	/*如果不是工具*/
	if(!isTool)html += $(".question_cont").html();
	html += '</div>';
	html += '</div>';
	html += '</div>';
	html +="</body>\n</html>\n";

	//这里拷贝主题颜色对应的css文件和相关的img
	copyFile(zip,  $("#global-css").val() + "/style/common.css");
	copyFile(zip,  $("#global-css").val() + "/img/head_bg.png");
	copyFile(zip,  $("#global-css").val() + "/img/head_dot.png");
	copyFile(zip,  $("#global-css").val() + "/img/head_line.png");
	copyFile(zip,  $("#global-css").val() + "/img/icon.png");
	copyFile(zip,  $("#global-css").val() + "/img/stripe_w.png");
	copyFile(zip,  $("#global-css").val() + "/img/stripe.png");
	copyFile(zip,  $("#global-css").val() + "/img/select.jpg");

	/*
	if (componentDef.templates[templateIndex].css) {
	}*/
	if (componentDef.imgs) {
		for(var i=0; i<componentDef.imgs.length; i++) {
			copyFile(zip,  "component/" + type + "/" + componentDef.imgs[i]);
		} 
	}
	
	/**
	 * copyFile(zip,  "component/" + type + "/" + componentDef.css);
	 */
	/** 导出css的内容到 css/style.css */
	zip.folder("css").file("style.css", $("#component-css").html());

	zip.file("core.html", html);
	zip.file("data.js", "var data= " + JSON.stringify(jsonData));
	zip.file("data.json", JSON.stringify(jsonData));
	setTimeout(function() {
		var content = zip.generate({type:"blob"});
		saveAs(content, "example.zip");
	}, 500);
}

function readFile(file) {
	var reader = new FileReader();
    reader.onload = (function() { return function(e) {
    		/** 此处闭环无实际作用*/
	    	if (e.target.result.indexOf("Individual-choice.js")>-1) {
	    		var html = $(e.target.result);
	    		currentActivity.type = "schoice";
	    		currentActivity.data = extractSchoice($(html).find(".questions_list, .question_cont, .questions .content"));
	    		editJSON();
	    		return;
	    	}
	    	alert("SORRY, HTML无法解析");
    	}})();
    reader.readAsText(file);
}

var blobs = {
	
};

function handleFiles (list) {
	var reader = new FileReader();
	reader.onload = function(){
		var buffer = reader.result;
		var blob = new Blob([buffer], {type: "application/octet-binary"}); 
		var li = $("<li><p></p></li>");
		li.find("p").html(list[0].name);
		$("#attached").append(li);
		blobs[list[0].name] = buffer;
	};
	reader.readAsArrayBuffer(list[0]);
	attachMedias();
}

function attachMedias() {
	$("img.attached-image").each(function() {
		if ($(this).data("src") && $(this).data("src").indexOf("img/")==0) {
			var name = $(this).data("src").substring(4);
			
			console.log("attach for img:   " + name);
			if (blobs[name]) {
				var buffer = blobs[name];
				var blob = new Blob([buffer], {type: "application/octet-binary"}); 
				var url = URL.createObjectURL(blob);
				$(this).attr("src", url);
			}
		}
	});
}

//按次序加载js文件，加载完成后执行cb方法
function loadJS(list, cb) {
	if (list.length==0) {
		cb();
	}
	var jsurl = list.pop();
	$.ajax({
		  url: jsurl,
		  dataType: "script",
		  success:function() {
			  loadJS(list, cb);
		  }
	});
}

//将指定路径的文件按 目录方式添加到zip中
function copyFile(zip, path) {
	var paths = path.split("/");
	var folder = null;
	for(var i=0; i<paths.length-1; i++) {
		if (folder==null) {
			folder = zip.folder(paths[i]);
		} else {
			folder = folder.folder(paths[i]);
		}
	}
	JSZipUtils.getBinaryContent(path, function(err, data) {
		  if(err) {
		    throw err; // or handle err
		  }
		  folder.file(paths[paths.length-1], data);
	});
}

function showMsg(msg) {
	$(".msg").html(msg);
	$(".msg").show();
}

function hideMsg() {
	$(".msg").fadeOut();
}
