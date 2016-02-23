/*点击页面任何地方Ul消失*/
var notMeHideEle = null;
$(document).click(function(event) {
    if(notMeHideEle){
        if(event.srcElement!=notMeHideEle&&$(event.srcElement).next()[0]!=notMeHideEle){
            notMeHideEle=null;
        }
    }
    $('.show_list').each(function() {
        if (this != notMeHideEle) {
            $(this).hide();
        }
    });
});

function getAnnotation(myParentContainer) {
    if ($(".annotation").length > 0) {
        return $(".annotation");
    }
    if ($("#annotation").length > 0) {
        return $("#annotation");
    } else {
        myParentContainer = myParentContainer ? myParentContainer : $("body").children().first();
        $(myParentContainer).append('<div id="annotation" class="annotation" style="margin-left:73px;width:250px;"><div class="correct"></div><span>correct</span><div class="error"></div><span>error</span></div>');
        return $("#annotation");
    }
}

var commonAnswers = null;

function dropdown(activityJsonObj, activityNumber, myTemplate, myCssClass) {
    //-----------------生成页面开始------------------------
    function getBlankAnswerArr(answers) {
        var len = answers.length;
        var newAnswers = [];
        for (var i = 0; i < len; i++) {
            newAnswers.push("");
        }
        return newAnswers;
    };

    function handlePlaceHolder(placeHolderText, splitText) {
        return placeHolderText.replace(/#h#/g, "<MySelect/>");
    }

    function preset(activityJsonObj) {
        /*如果是在题目中选择，先要替换*/
        var questionTxt = activityJsonObj.question.text;
        if (questionTxt.indexOf("#h#") >= 0) {
            activityJsonObj.question.text = handlePlaceHolder(questionTxt, "#h#");
        }
        var items = activityJsonObj.items;
        /**如果有通用的下拉选项定义，则将此值赋给全局变量。*/
        if (activityJsonObj.commonAnswers) {
            commonAnswers = activityJsonObj.commonAnswers;
        }
        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            /*如果小题的answer.length==0,那说明几个小题共用commonAnswers.*/
            if (item.answers.length == 0) {
                item.answers = commonAnswers.answers;
            }
            item.orderType = commonAnswers.orderType;
            if (commonAnswers.showInbrife) {
                item.answers = getBlankAnswerArr(item.answers);
            }
        }
        activityJsonObj.activityNumber = activityNumber;
    }

    function initJqueryObj() {
        //预处理
        var template = Handlebars.templates.dropdown;
        if (myTemplate) {
            template = myTemplate;
        }
        var cssClass = "activity_dropdown";
        if (myCssClass) {
            cssClass = myCssClass;
        }
        var activityDiv = $('<div class="' + cssClass + '"></div>');
        var myStr = template(activityJsonObj);
        activityDiv.html(myStr);
        //后处理
        $(activityDiv).find('.listen').toggleClick(function() {
            $(this).find('audio')[0].play();
        }, function() {
            $(this).find('audio')[0].pause();
        });
        //处理place hold
        var selectPlaceHolders = $(activityDiv).find("MySelect");
        if (selectPlaceHolders.length > 0) {
            var mySelects = $(activityDiv).find(".right_side");
            for (var i = 0, len = selectPlaceHolders.length; i < len; i++) {
                $(selectPlaceHolders[i]).replaceWith($(mySelects[i]));
            }
        }
        return activityDiv;
    }
    //-----------------生成页面结束------------------------
    //---------------页面绑定动作开始----------------------
    //默认状态

    function refresh() {
        var $Id = getEleById.bind(this);
        var items = activityJsonObj.items;
        for (var i = 0, len = items.length; i < len; i++) {
            var select_ele = $Id("#dropdown_" + activityJsonObj.activityNumber + "_" + i);
            var aP = $(select_ele).find("p"),
                aUL = $(select_ele).find("ul"),
                aI = $(select_ele).find("i");
            aP.html("").data("selected", -1).css({
                'background-color': '',
                'color': ''
            });
            aP.unbind().click(function(event) {
                $(this).next().toggle();
                notMeHideEle = $(this).next()[0];
            });
            aUL.hide();
            aI.hide();
        }
        getAnnotation().hide();
    }
    //读取状态

    function readFn() {
        var arr = [];
        var items = activityJsonObj.items;
        for (var i = 0, len = items.length; i < len; i++) {
            var answer = -1,
                aP = $("#dropdown_" + activityJsonObj.activityNumber + "_" + i + " p");
            if (aP.html()) {
                answer = aP.data("selected");
            }
            arr.push(answer);
        }
        return JSON.stringify(arr);
    }
    //设置状态

    function setFn(str) {
        var arr = JSON.parse(str);
        var items = activityJsonObj.items;
        for (var i = 0, len = items.length; i < len; i++) {
            var select_id = "#dropdown_" + activityJsonObj.activityNumber + "_" + i;
            var aP = $(select_id + " p");
            if (arr[i] >= 0) {
                var localAnswer = $(select_id + " ul").find("li").eq(arr[i]).html();
                aP.data("selected", arr[i]).html(localAnswer);
            } else {
                aP.data("selected", -1).html("");
            }
        }
    }
    function isRightAnswer(local,anws){
        var anwsType=typeof(anws);
        if(anwsType=='number'){
            return local==anws;
        }else if(anwsType=='string'){
            return local==anws;
        }else{
            for(var i=0;i<anws.length;i++){
                if(local==anws[i])return true;
            }
            return false;
        }
    }
    /*var a=[1,3,5,7]
    console.log(isRightAnswer('5',a))
    var b='ss'
    console.log(isRightAnswer('ss',b))
    var c=5
    console.log(isRightAnswer('5',c))
    */
    //check answer
    function checkAnswer() {
        var items = activityJsonObj.items;
        var hasColor = false;
        for (var i = 0, len = items.length; i < len; i++) {
            var select_id = "#dropdown_" + activityJsonObj.activityNumber + "_" + i;
            var checkRes = isRightAnswer($(select_id + " p").unbind().data('selected'),items[i].answer);
            if (checkRes) {
                if (this.data.showAnswerInColor) {
                    hasColor = true;
                    $(select_id + " p").css({
                        'background-color': 'green',
                        'color': 'white'
                    });
                } else {
                    $(select_id + " i").attr("class", "icon_r").show();
                }
            } else {
                if (this.data.showAnswerInColor) {
                    hasColor = true;
                    $(select_id + " p").css({
                        'background-color': 'red',
                        'color': 'white'
                    });
                } else {
                    $(select_id + " i").attr("class", "icon_e").show();
                }
            }
        }
        if (hasColor) getAnnotation().show();
    }

    function checkFn(result) {
        var ret = 1;
        var arr = JSON.parse(result);
        var items = activityJsonObj.items;
        if (this.data.splitAnswer) {
            result = [];
            for (var i = 0; i < this.data.items.length; i++) {
                var MyAnswer = this.data.items[i].answer;
                var checkRes = isRightAnswer(arr[i],MyAnswer);
                if (checkRes) {
                    result[i] = 1;
                } else {
                    result[i] = 0;
                }
            }
            return result;
        }

        for (var j = 0; j < arr.length; j++) {
            var item = items[j];
            var answer = item.answer;
            if (arr[j] != answer) {
                ret = 0;
                break;
            }
        }
        return ret;
    }

    //show answer

    function showAnswer() {
        var items = activityJsonObj.items;
        for (var i = 0, len = items.length; i < len; i++) {
            var select_id = "#dropdown_" + activityJsonObj.activityNumber + "_" + i;
            var item = items[i];
            var answer = item.answer;
            var firstAnswer=typeof(answer)=='number'?answer:answer[0];
            var rAnswer = $(select_id + " ul").hide().find("li").eq(firstAnswer).html();
            $(select_id + " p").data("selected", firstAnswer).unbind().html(rAnswer);
        }
    }

    function getEleById(id) {
        var ele = $(id);
        if (ele.length == 0) {
            ele = $(this.jqueryObj).find(id);
        }
        return ele;
    }

    function initAction() {
        var $Id = getEleById.bind(this);
        var items = activityJsonObj.items;
        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            var select_ele = $Id("#dropdown_" + activityJsonObj.activityNumber + "_" + i);
            var aUL = $(select_ele).find("ul");
            aUL.children().each(function(i) {
                $(this).unbind().click(function(event) {
                    var parentObj = $(this).parent();
                    parentObj.prev().data("selected", i).html($(this).html());
                    parentObj.hide();
                });
            })
        }
    }
    preset(activityJsonObj);
    var activityDiv = typeof(Handlebars) == "undefined" ? "" : initJqueryObj();
    var activityComponent = {
        container: activityDiv,
        jqueryObj: activityDiv,
        data: activityJsonObj,
        initAction: initAction
    };
    activityComponent.readFn = readFn.bind(activityComponent);
    activityComponent.setFn = setFn.bind(activityComponent);
    activityComponent.checkAnswer = checkAnswer.bind(activityComponent);
    activityComponent.showAnswer = showAnswer.bind(activityComponent);
    activityComponent.refresh = refresh.bind(activityComponent);
    activityComponent.checkFn = checkFn.bind(activityComponent);
    activityComponent.initAction();
    activityComponent.refresh();
    return activityComponent;
}
//# sourceURL=dropdown.js