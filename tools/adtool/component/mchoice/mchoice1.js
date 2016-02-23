(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['mchoice1'] = template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "		<li class=\"anw\" data-index=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\r\n    		<span class=\"mar\">"
    + alias3((helpers.order_items || (depth0 && depth0.order_items) || alias1).call(depth0,(data && data.index),((stack1 = (depths[1] != null ? depths[1].answers : depths[1])) != null ? stack1.order_type : stack1),{"name":"order_items","hash":{},"data":data}))
    + "</span>\r\n    		<a class=\"choose\">\r\n    			<input type=\"checkbox\" value=\"1\">\r\n    		</a>\r\n    		<span>"
    + alias3(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"text","hash":{},"data":data}) : helper)))
    + "</span>\r\n    		<i></i>\r\n    	</li>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"choose_list\">\r\n	<div class=\"left_side\">\r\n		<span class=\"bold\">"
    + alias3(((helper = (helper = helpers.order || (depth0 != null ? depth0.order : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"order","hash":{},"data":data}) : helper)))
    + "</span>\r\n	</div>\r\n	\r\n	<ul class=\"right_side\" id=\"mchoice_"
    + alias3(((helper = (helper = helpers.head || (depth0 != null ? depth0.head : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"head","hash":{},"data":data}) : helper)))
    + "\">\r\n		<li><span>"
    + alias3(this.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.question : depth0)) != null ? stack1.stem : stack1)) != null ? stack1.en : stack1), depth0))
    + "</span></li>\r\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.answers : depth0)) != null ? stack1.choices : stack1),{"name":"each","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\r\n</div>";
},"useData":true,"useDepths":true});
})();