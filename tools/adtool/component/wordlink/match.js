function match(activityJsonObj, activityNumber, myTemplate, myCssClass) {
    /*-------------------开始生成HTML-----------------*/
    function preset(activityJsonObj) {
        activityJsonObj.activityNumber = activityNumber;
    }
    function initJqueryObj() {
        var template = Handlebars.templates.match;
        if (myTemplate && typeof myTemplate=="function") {
            //如果判断是模板函数
            template = myTemplate;
            var cssClass = "match";
            if (myCssClass) {
                cssClass = myCssClass;
            }
            var activityDiv = $('<div class="' + cssClass + '"></div>');
            preset(activityJsonObj);
            var myStr = template(activityJsonObj);
            activityDiv.html(myStr);
            return activityDiv;
        } else {
            if (myTemplate) {
                return $(myTemplate);
            }
        }
    }
    /*初始化并赋值初始顺序和答案*/
    function initAction(){
        var wordlinkDiv=getEleById("#wordlink_"+activityNumber);
        var aLi_r = $(wordlinkDiv).data('lws','').find('.right_side a');
        var aLi_l = $(wordlinkDiv).find('.left_side a');
        aLi_r.each(function(i){
            $(this).attr({'a':i});
            $(aLi_l[i]).attr({'o':activityJsonObj.content.answer[i]});
        });
    }
    function getFirstOrder(anws){
        if(anws.indexOf('|')>0){
            return anws.split('|')[0];
        }else{
            return anws;
        }
    }
    function checkRightOrder(anws,value){
        try{
            if(anws.indexOf('|')>0){
                var realAnws=anws.split('|');
                for(var i=0;i<realAnws.length;i++){
                    if(realAnws[i]==value)return true;
                }
                return false;
            }else{
                return anws==value;
            }
        }catch(e){
            return false;
        }
    }
    /*-------------------结束生成HTML-----------------*/
    /*-------------------开始绑定动作-----------------*/
    function refresh() {
        var $Id = getEleById.bind(this);
        var wordlinkDiv=$Id("#wordlink_"+this.data.activityNumber);
        var aLi_r = $(wordlinkDiv).find('.right_side a').removeClass('bg_blue');
        var aLi_l = $(wordlinkDiv).find('.left_side a').removeClass('bg_blue').removeClass('bg_red');
        $(wordlinkDiv).find('.right_side i').removeClass('icon_e').removeClass('icon_r');
        /*恢复右侧初始排序*/
        aLi_r.each(function(m){
            var $me=$(this);
            var meInitOrder=$me.attr('a');
            if(parseInt(meInitOrder)==m)return;
            var meInitHtml=$me.html();
            for(var i=m+1;i<aLi_r.length;i++){
                var $clItem=$(aLi_r[i]);
                if(parseInt($clItem.attr('a'))==m){
                    var clItemOrder=$clItem.attr('a'),clItemHtml=$clItem.html();
                    $me.attr({'a':clItemOrder}).html(clItemHtml);
                    $clItem.attr({'a':meInitOrder}).html(meInitHtml);
                    break;
                }
            }
        });
        /*为左边添加事件*/
        aLi_l.unbind().click(function(){
            var index = $(this).attr('a');
            if($(this).hasClass("bg_blue")){
                $(this).removeClass('bg_red').removeClass('bg_blue');
                $(aLi_r[index]).removeClass('bg_blue');
                wordlinkDiv.data('lws','');
            }else{
                $(aLi_l[wordlinkDiv.data('lws')]).removeClass('bg_red');
                $(this).removeClass('bg_blue').addClass('bg_red');
                wordlinkDiv.data('lws',index);
            }
        });
        /*为右边添加绑定事件*/
        aLi_r.unbind().each(function(m){
            $(this).click(function(){
                var lws=wordlinkDiv.data('lws');
                if(lws=='')return;
                var $my=$(this),$llItem=$(aLi_l[lws]),$rlItem=$(aLi_r[lws]);
                var meOrder=$my.attr('a'),meHtml=$my.html();
                var rlItemOrder=$rlItem.attr('a'),rlItemHtml=$rlItem.html();
                if($my.attr({'a':rlItemOrder}).html(rlItemHtml).hasClass('bg_blue')){
                    $my.removeClass('bg_blue');
                    $(aLi_l[m]).removeClass('bg_blue');
                }
                $llItem.removeClass('bg_red').addClass('bg_blue');
                $rlItem.addClass('bg_blue').attr({'a':meOrder}).html(meHtml);
                wordlinkDiv.data('lws','');
            })
        });
    };
    function showAnswer() {
        var wordlinkDiv=$("#wordlink_"+this.data.activityNumber);
        var aLi_l = $(wordlinkDiv).find('.left_side a').attr('class','bg_blue');
        var aLi_r = $(wordlinkDiv).find('.right_side a').attr('class','bg_blue');
        aLi_l.each(function(m){
            var $initItem=$(aLi_r[m]);
            var leftOrder=getFirstOrder($(this).attr('o')),rightOrder=$initItem.attr('a');
            if(leftOrder==rightOrder)return;
            for(var i=m;i<aLi_r.length;i++){
                var $clItem=$(aLi_r[i]);
                if($clItem.attr('a')==leftOrder){
                    var initOrder=$initItem.attr('a'),initHtml=$initItem.html();
                    var clItemOrder=$clItem.attr('a'),clItemHtml=$clItem.html();
                    $initItem.attr({'a':clItemOrder}).html(clItemHtml);
                    $clItem.attr({'a':initOrder}).html(initHtml);
                    break;
                }
            }
        });
        aLi_l.off('click');
        aLi_r.off('click');
    };
    function checkAnswer() {
        var wordlinkDiv=$("#wordlink_"+this.data.activityNumber);
        var aLi_l = $(wordlinkDiv).find('.left_side a');
        var aLi_r = $(wordlinkDiv).find('.right_side a');
        var aLi_aws = $(wordlinkDiv).find('.right_side i');
        aLi_l.each(function(m){
            if($(this).hasClass('bg_blue')){
                if(checkRightOrder($(this).attr('o'),$(aLi_r[m]).attr('a'))){
                    aLi_aws[m].className = 'icon_r';
                }else{
                    aLi_aws[m].className = 'icon_e';
                }
            }
        });
        aLi_l.off('click');
        aLi_r.off('click');
    };
    function readFn() {
        var wordlinkDiv=$("#wordlink_"+this.data.activityNumber);
        var aLi_r = $(wordlinkDiv).find('.right_side a');
        var arr = [];
        aLi_r.each(function (index, element) {
            if($(this).hasClass('bg_blue')){
                arr.push($(this).attr('a'));
            } else {
                arr.push("");
            }
        });
        return arr;
    };

    function setFn(arr) {
        var json =arr;
        var wordlinkDiv=$("#wordlink_"+this.data.activityNumber);
        var aLi_r = $(wordlinkDiv).find('.right_side a');
        var aLi_l = $(wordlinkDiv).find('.left_side a');

        for (var i=0;i<json.length;i++) {
            if (json[i] != '') {
                aLi_r[i].className = 'bg_blue';
                aLi_l[i].className = 'bg_blue';
                var $me=$(aLi_r[i]);
                var meOrder=$me.attr('a');
                if (json[i] != meOrder) {
                    for(var m=0;m<aLi_r.length;m++){
                        var $clItem=$(aLi_r[m]);
                        var clItemOrder=$clItem.attr('a');
                        if(clItemOrder==json[i]){
                            var meHtml=$me.html();
                            var clItemHtml=$clItem.html();
                            $me.attr({'a':clItemOrder}).html(clItemHtml);
                            $clItem.attr({'a':meOrder}).html(meHtml);
                            break;
                        }
                    }
                }
            }
        }
    };
    function checkFn(stu_answers){
        var answers = this.data.content.answer;
        var arr=[],result=1;
        for(var i=0;i<answers.length;i++){
            if(checkRightOrder(answers[i],stu_answers[i])){
                arr.push(1);
            }else{
                result=0;
                arr.push(0);
            }
        }
        if(this.data.notSplitAnswer){
            return result
        }else{
            return arr;
        }
    };
    function getEleById(id) {
        var ele = $(id);
        if (ele.length == 0) {
            ele = $(activityDiv).find(id);
        }
        return ele;
    }
    /*-------------------结束绑定动作-----------------*/
    
    preset(activityJsonObj);
    var activityDiv = typeof (Handlebars) == "undefined" ? "" : initJqueryObj();
    initAction();
    var activityComponent = {
    	container: activityDiv,
        jqueryObj: activityDiv,
        data: activityJsonObj,
        initAction: initAction
    };
    activityComponent.readFn=readFn.bind(activityComponent);
    activityComponent.setFn=setFn.bind(activityComponent);
    activityComponent.checkFn=checkFn.bind(activityComponent);
    activityComponent.checkAnswer=checkAnswer.bind(activityComponent);
    activityComponent.showAnswer=showAnswer.bind(activityComponent);
    activityComponent.refresh=refresh.bind(activityComponent);
    activityComponent.refresh();
    return activityComponent;
}
//# sourceURL=match.js