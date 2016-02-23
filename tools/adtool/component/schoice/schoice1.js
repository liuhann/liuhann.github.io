(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['schoice1'] = template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return this.escapeExpression(((helper = (helper = helpers.order || (depth0 != null ? depth0.order : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"order","hash":{},"data":data}) : helper)));
},"3":function(depth0,helpers,partials,data) {
    var helper;

  return this.escapeExpression(((helper = (helper = helpers.head || (depth0 != null ? depth0.head : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"head","hash":{},"data":data}) : helper)));
},"5":function(depth0,helpers,partials,data) {
    var stack1;

  return "<span class=\"listen\"><audio style=\"display:none\" src=\""
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.question : depth0)) != null ? stack1.sound : stack1), depth0))
    + "\"></audio></span>";
},"7":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression, alias3="function";

  return "<li>\r\n            <span class=\"bold\">"
    + alias2((helpers.order_items || (depth0 && depth0.order_items) || alias1).call(depth0,(data && data.index),(depths[1] != null ? depths[1].order_type : depths[1]),{"name":"order_items","hash":{},"data":data}))
    + "</span>\r\n            <b class=\"choose\">\r\n                <input type=\"radio\" name=\"select_"
    + alias2(this.lambda((depths[1] != null ? depths[1].head : depths[1]), depth0))
    + "\" value=\""
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\"/>\r\n            </b>\r\n            "
    + alias2(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"text","hash":{},"data":data}) : helper)))
    + " \r\n            "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.image : depth0),{"name":"if","hash":{},"fn":this.program(8, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n            <i></i>\r\n        </li>";
},"8":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<img class=\"attached-image\" data-src=\""
    + alias3(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"image","hash":{},"data":data}) : helper)))
    + "\" src=\""
    + alias3(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"image","hash":{},"data":data}) : helper)))
    + "\">";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=this.escapeExpression;

  return "<div class=\"list\">\r\n    <span class=\"list_number\">"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.order : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.program(3, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "</span>\r\n    "
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.question : depth0)) != null ? stack1.sound : stack1),{"name":"if","hash":{},"fn":this.program(5, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n    "
    + alias1(this.lambda(((stack1 = (depth0 != null ? depth0.question : depth0)) != null ? stack1.text : stack1), depth0))
    + "\r\n    <ul class=\"right_side\" id=\"select_"
    + alias1(((helper = (helper = helpers.head || (depth0 != null ? depth0.head : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"head","hash":{},"data":data}) : helper)))
    + "\">\r\n        "
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.answers : depth0),{"name":"each","hash":{},"fn":this.program(7, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n    </ul>\r\n</div>";
},"useData":true,"useDepths":true});
})();