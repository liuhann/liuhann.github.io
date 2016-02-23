(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['fillblank1'] = template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "		<span class=\"left_l\">"
    + this.escapeExpression(((helper = (helper = helpers.order || (depth0 != null ? depth0.order : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"order","hash":{},"data":data}) : helper)))
    + "</span>\r\n";
},"3":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.plain : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0, blockParams, depths),"inverse":this.program(6, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"4":function(depth0,helpers,partials,data) {
    var stack1;

  return "					"
    + ((stack1 = this.lambda((depth0 != null ? depth0.text : depth0), depth0)) != null ? stack1 : "")
    + "\r\n";
},"6":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "					<input class=\"tex mb5 fb_blank\" id=\"blank_"
    + alias2(alias1((depths[2] != null ? depths[2].activity_id : depths[2]), depth0))
    + "_"
    + alias2(alias1((depth0 != null ? depth0.index : depth0), depth0))
    + "\" type=\"text\" data-answer=\""
    + alias2(alias1((depth0 != null ? depth0.answer : depth0), depth0))
    + "\">\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper;

  return "\r\n\r\n<ul>\r\n	<li class=\"list clearfix\" data-order=\""
    + this.escapeExpression(((helper = (helper = helpers.order || (depth0 != null ? depth0.order : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"order","hash":{},"data":data}) : helper)))
    + "\">\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.order : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "		<div class=\"right_r\"> \r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "		</div>\r\n	</li>\r\n</ul>";
},"useData":true,"useDepths":true});
})();