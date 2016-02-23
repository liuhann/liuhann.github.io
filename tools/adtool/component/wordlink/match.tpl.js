(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['match'] = template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "        <a href=\"javascript:;\" a=\""
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n            <strong>"
    + alias2((helpers.order_items || (depth0 && depth0.order_items) || alias1).call(depth0,(data && data.index),((stack1 = (depths[1] != null ? depths[1].content : depths[1])) != null ? stack1.leftOrder : stack1),{"name":"order_items","hash":{},"data":data}))
    + "</strong>\n            <span>"
    + alias2(this.lambda(depth0, depth0))
    + "</span>\n        </a>\n";
},"3":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "        <a href=\"javascript:;\" a=\""
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n            <strong>"
    + alias2((helpers.order_items || (depth0 && depth0.order_items) || alias1).call(depth0,(data && data.index),((stack1 = (depths[1] != null ? depths[1].content : depths[1])) != null ? stack1.rightOrder : stack1),{"name":"order_items","hash":{},"data":data}))
    + "</strong>\n            <span>"
    + alias2(this.lambda(depth0, depth0))
    + "</span>\n            <i></i>\n        </a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "\n<div class=\"question_content\">\n    <div class=\"left_side\">\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.content : depth0)) != null ? stack1.left : stack1),{"name":"each","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"right_side\">\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.content : depth0)) != null ? stack1.right : stack1),{"name":"each","hash":{},"fn":this.program(3, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n    <div style=\"clear:both;\"></div>\n</div>\n";
},"useData":true,"useDepths":true});
})();