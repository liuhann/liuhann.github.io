    function getAnnotation(myParentContainer) {
        if($(".annotation").length >0){
            return $(".annotation");
        }
        if ($("#annotation").length > 0) {
            return $("#annotation");
        } else {
            myParentContainer = myParentContainer ?myParentContainer:$("body").children().first();
            $(myParentContainer).append('<div id="annotation" class="annotation" style="margin-left: 73px;"><div class="correct"></div><span>correct</span><div class="error"></div><span>error</span></div>');
            return $("#annotation");
        }
    }

    function getKeyBoard(myParentContainer) {
        if ($("#skb1").length > 0) {
            return $("#skb1");
        } else {
            myParentContainer = myParentContainer ? myParentContainer:$("body").children().first();
            $(myParentContainer).append('<div id="skb1" class="keyBox"></div>');
            return $("#skb1");
        }
    }

    function showInputKeyBoard(event) {
        if (navigator.platform == 'iPad') {
            return; //Safari浏览器 
        } else {
            //弹出键盘
            //_softkeyboard_(aInput[index], window.top.document.getElementById(kbid));
            _softkeyboard_(this[0], getKeyBoard()[0]);
            var keyBoard = getKeyBoard();
            var key_height = keyBoard.outerHeight(true);
            var key_width = keyBoard.outerWidth(true);
            var max_height=$(document).height();
            var max_width=$(document).width()-key_width;
            //判断键盘的位置
            var this_Top = $(this).offset().top;
            var this_Left = $(this).offset().left;
            var padd = 1; //防止键盘离文本框太近
            var key_Top=this_Top- key_height - padd;
            var key_Left=this_Left-key_width/2;
            if (this_Top - $(document).scrollTop() < max_height/ 2) {
                key_Top= this_Top+ $(this).outerHeight() + padd;
            }             
            if (key_Left>max_width) {
               key_Left=max_width;
            } else if(key_Left<0){
                key_Left=0;
            }
            keyBoard.css('top', key_Top + 'px');
            keyBoard.css('left', key_Left+ 'px');
        }
        stopPro(event);
    }

    function fillUpBlank(data, number, template, css) {

        function preset(data) {
            data.activity_id = number;

            function getAnswer(id) {
                var questions = data.questions;
                for (var k = 0; k < questions.length; k++) {
                    if (questions[k].id == id) {
                        return questions[k];
                    }
                }
            }
            var seqs = data.text.split("#");
            var list = [];
            var index = 1;
            for (var k = 0; k < seqs.length; k++) {
                if (seqs[k] == "") continue;
                if (k % 2 == 0) { //表示文本内容
                    list.push({
                        plain: true,
                        text: seqs[k]
                    });
                } else { //选择框
                    if (seqs[k] == "p") {
                        k++;
                        list.push({
                            p: true,
                            text: seqs[k]
                        });
                    } else {
                        var ans = getAnswer(seqs[k]);
                        var aw = jQuery.extend(true, {}, ans);
                        aw.index = index;
                        index++;
                        list.push(aw);
                    }
                }
            }
            data.list = list;
        }

        function getAnswerText(myAnswer) {
            if (typeof myAnswer == 'string') {
                return myAnswer;
            }
            if (myAnswer instanceof Array) {
                return myAnswer[myAnswer.length-1];
            }
            return myAnswer;
        }

        function readFn() {
            var arr = [];
            var seq = 1;
            for (var i = 0; i < this.data.questions.length; i++) {
                var aInput = "#blank_" + this.id + "_" + (i + 1);
                arr.push({
                    "order": seq,
                    "answer": $(aInput).val()
                });
                seq++;
            }
            if (console) {
                console.log(JSON.stringify(arr));
            }
            return arr;
        }

        //set
        function setFn(answer) {
            var arr = answer;
            if (typeof answer == "string") {
                arr = JSON.parse(answer);
            }
            for (var i = 0; i < this.data.questions.length; i++) {
                var aInput = "#blank_" + this.id + "_" + (i + 1);
                $(aInput).val(arr.shift().answer);
            }

        }

        //refresh
        function refresh() {
            for (var i = 0; i < this.data.questions.length; i++) {
                var aInput = "#blank_" + this.id + "_" + (i + 1);
                $(aInput).attr("disabled", false).val("").css("background-color", "").css("color", "");
                //增加一个默认值属性。 当加载或刷新页面时，input使用这个默认值
                if (this.data.questions[i]["default value"]) {
                    $(aInput).val(this.data.questions[i]["default value"]);
                }
            }

            if(this.data.showAnswerStyle=="other")$("#answer_" + this.id + "_" + (i + 1)).empty().remove();
            getAnnotation().hide();
        }

        function answerEqual(val, answer) {
            if (typeof answer == 'string') {
                return val.toLowerCase() == answer.toLowerCase();
            }
            if (answer instanceof Array) {
                var isEqual = true;
                val = val.toLowerCase();
                var isValInAnswer = false;
                for (var i = 0; i < answer.length; i++) {
                    if (val == answer[i].toLowerCase()) {
                        isValInAnswer = true;
                        break;
                    }
                }
                if (!isValInAnswer) isEqual = false;
                return isEqual;
            }
        }

        function showAnswer() {
            for (var i = 0; i < this.data.questions.length; i++) {
                var aInput = "#blank_" + this.id + "_" + (i + 1);
                $(aInput).attr("disabled", true).css("background-color", "").css("color", "");
                var MyAnswer = this.data.questions[i].answer;
                if(this.data.showAnswerStyle=="other"){
                    if($("#answer_" + this.id + "_" + (i + 1)).length == 0){
                        var answerBox=$(aInput).clone();
                        answerBox.attr('id',"answer_" + this.id+ "_" + (i + 1))
                            .val(getAnswerText(MyAnswer))
                            .css({'background-color':'#cfd','color':'#060','border-color':'#393'});
                        answerBox.insertAfter($(aInput));
                    }
                }else{
                    $(aInput).val(getAnswerText(MyAnswer));
                }
            }
        }

        //check answer
        function checkAnswer() {
            for (var i = 0; i < this.data.questions.length; i++) {
                var aInput = "#blank_" + this.id + "_" + (i + 1);
                var MyAnswer = this.data.questions[i].answer;
                if (!answerEqual($(aInput).val(), MyAnswer)) {
                    $(aInput).css({
                        'background-color': 'red',
                        'color': 'white'
                    });
                } else {
                    $(aInput).css({
                        'background-color': 'green',
                        'color': 'white'
                    });
                }
                $(aInput).attr("disabled", true);
            }
            getAnnotation().show();
        }

        function checkFn(answer) {
            var arr = answer;
            var result = 1;
            if(this.data.splitAnswer){
                result=[];
                for (var i = 0; i < this.data.questions.length; i++) {
                    var MyAnswer = this.data.questions[i].answer;
                    if (!answerEqual(arr.shift().answer, MyAnswer)) {
                        result[i] = 0;
                    }else{
                        result[i] = 1;
                    }
                }
                return result;
            }
            for (var i = 0; i < this.data.questions.length; i++) {
                var MyAnswer = this.data.questions[i].answer;
                if (!answerEqual(arr.shift().answer, MyAnswer)) {
                    result = 0;
                }
            }
            return result;
        }

        function bindInputEvent(myJsonData, containerDiv) {
            if (myJsonData && containerDiv) {
                for (var i = 0; i < myJsonData.questions.length; i++) {
                    var aInput = $(containerDiv).find("#blank_" + number + "_" + (i + 1));
                    aInput.on("click", showInputKeyBoard.bind(aInput));

                    //增加一个默认值属性。 当加载或刷新页面时，input使用这个默认值
                    if (myJsonData.questions[i]["default value"]) {
                        $(aInput).val(myJsonData.questions[i]["default value"]);
                    }
                }
            } else {
                for (var i = 0; i < this.data.questions.length; i++) {
                    var aInput = "#blank_" + this.id + "_" + (i + 1);
                    $(aInput).on("click", showInputKeyBoard.bind($(aInput)));
                }
            }
            $(document).click(function () {
                getKeyBoard().hide();
            });

        }
        var originalJSON = jQuery.extend(true, {}, data);

        function render() {
            preset(data);
            var div = $(template(data));
            bindInputEvent(data, div);
            return div;
        }
        var activityDiv = typeof(Handlebars) == "undefined" ? "" : render();
        var activityComponent = {
            'data': originalJSON,
            'id': number,
            'container': activityDiv,
            'readFn': readFn,
            'setFn': setFn,
            'refresh': refresh,
            //'deactive': deactive,
            //'active': active,
            'showAnswer': showAnswer,
            'checkAnswer': checkAnswer,
            'checkFn': checkFn,
            'bindInputEvent': bindInputEvent,
            'initAction':bindInputEvent
        };
        return activityComponent;
    }
//# sourceURL=fills-up.js