(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['fillblank3'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.escapeExpression;

  return "	<div class=\"question_title\">\r\n		<span class=\"number\">"
    + alias1(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"count","hash":{},"data":data}) : helper)))
    + "</span>\r\n		<p >"
    + alias1(this.lambda(((stack1 = (depth0 != null ? depth0.title : depth0)) != null ? stack1.en : stack1), depth0))
    + "</p>\r\n	</div>\r\n";
},"3":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper;

  return "			<p class=\"mb15 ti_pl20 fb\" data-order=\""
    + this.escapeExpression(((helper = (helper = helpers.order || (depth0 != null ? depth0.order : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"order","hash":{},"data":data}) : helper)))
    + "\">\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":this.program(4, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "			</p>\r\n";
},"4":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.plain : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0, blockParams, depths),"inverse":this.program(7, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"5":function(depth0,helpers,partials,data) {
    return "						"
    + this.escapeExpression(this.lambda((depth0 != null ? depth0.text : depth0), depth0))
    + "\r\n";
},"7":function(depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=this.lambda, alias2=this.escapeExpression;

  return "						<input class=\"tex purple_input mb5 fright fb_blank\" id=\"blank_"
    + alias2(alias1((depths[2] != null ? depths[2].activity_id : depths[2]), depth0))
    + "_"
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" type=\"text\"  data-answer=\""
    + alias2(alias1((depth0 != null ? depth0.answer : depth0), depth0))
    + "\">\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.title : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n<div class=\"pos_r fb_wrap\">\r\n		<p class=\"mb15 ti_pl20 fb\" data-order=\"1\">\r\n			90%\r\n			<b class=\"fright\">10%</b>\r\n		</p>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.content : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true,"useDepths":true});
})();