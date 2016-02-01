/**
 * Created by Administrator on 2015/7/16.
 */
var jsBridge;
window.onerror = function (err) {
    console.log('window.onerror: ' + err);
}

var courseId = null;
var username = null;
var password = null;

var HYBRID = false;
var ONMOBILE = false;

$.ajaxPrefilter(function( options ) {
    options.crossDomain = true;
});


$(function() {
    if (HYBRID) {
        //initFromServer("d_stu22", "b4f440d0c160ec8a336943d9123655d5", "284EB8CBE99E468EBC1AD99B7C66FB9F");
        //alert(window.WebViewJavascriptBridge);
        if (window.WebViewJavascriptBridge) {
            jsBridge = WebViewJavascriptBridge;
            bridgeReady();
        } else {
            document.addEventListener("WebViewJavascriptBridgeReady", function (event) {
                jsBridge = event.bridge;
                bridgeReady();
            });
        }
    } else {
        initFromServer("hoo_student", "b4f440d0c160ec8a336943d9123655d5", "D18DD0AF7D114DEEAAFE07940BE0E8E7");
    }
});

function initFromServer(u, p, cid) {
    if (ONMOBILE) {
        courseId = cid;
        username = u;
        password = p;
        $.post("http://api.classserver.cn/interfaces/homeschool/growthrecord/showgrowthrecord",
            {
                "username": username,
                "password": password,
                "courseid": courseId
            }, function(data){
                initHoneyCombs(JSON.parse(data));
            });
    } else {
        initHoneyCombs(weeksData);
    }
    /*
    $.post("http://api.classserver.cn/interfaces/homeschool/growthrecord/getgrowthrecord",
        {
            "username": "hoo_student",
            "password": "b4f440d0c160ec8a336943d9123655d5"
        },
        function(data) {
            var result = JSON.parse(data);
            courseId = result.levellist[0].courseId;

            $.post("http://api.classserver.cn/interfaces/homeschool/growthrecord/showgrowthrecord",
                {
                    "username": "hoo_student",
                    "password": "b4f440d0c160ec8a336943d9123655d5",
                    "courseid": courseId
                }, function(data){
                    initHoneyCombs(JSON.parse(data));
                });
        }
    );
    */
}


function bridgeReady() {
    //
    alert("bridge is ready");
    jsBridge.init(function(message) {
       // alert("init bridge msg: " + message);
        console.log('JS got a message', message)
    });
    jsBridge.registerHandler('initHoneycombs', function(data, response) {
        console.log('JS handler testJavascriptHandler was called', data);
        response.respondWith({ 'Javascript Says':'initHoneycombs OK' });
        initHoneyCombs(data);
    });

    jsBridge.registerHandler('initFromServer', function(data, response) {
       // alert("init  " + JSON.stringify(data));
        console.log('JS handler testJavascriptHandler was called', data);
        response.respondWith({ 'Javascript Says':'initHoneycombs OK' });

        var d = JSON.parse(data);
        initFromServer(d.username, d.password, d.courseId);
    });

    jsBridge.registerHandler("initWeek", function(data, response) {
        console.log('JS handler testJavascriptHandler was called', data);
        initWeek(data);
        response.respondWith({'Javascript Says':'initWeek OK' });
    });
}

function commandFetchWeekInfo(lessonId, cb) {
    if (HYBRID) {
       // alert("jsBridge.send " + lessonId);
        jsBridge.send(lessonId);
        /*
        $.post("http://api.classserver.cn/interfaces/homeschool/growthrecord/showgrowthrecorddetails",
            {
                "username": username,
                "password": password,
                "courseid": courseId,
                "lessonid": lessonId
            }, function(data){
                initWeek(JSON.parse(data),lessonId, cb);
            });
        */
    } else {
        initWeek(weekData, lessonId, cb);
    }
    /*
    console.log(" fetch week info for" + lessonId);
    try {
        jsBridge.send("showgrowthrecorddetails?lessonId=" + lessonId);
    } catch(e) {
        //console.log(e);
    }
    initWeek(weekData);
    */
}

function initWeek(weekData, lessonId, cb) {
    console.log("week data got: " + JSON.stringify(weekData));
    if (typeof weekData =="string") {
        weekData = JSON.parse(weekData);
    }
    var weekx = null;
    var weekName = weekData.knowledge_points.name.en;

    //缓存周信息  目前用不到
    var allh = $(".hexagon");
    for(var i=0; i<allh.length; i++) {
        var week = allh.eq(i).data("week");
        if (week.lessonName.en==weekName) {
            allh.eq(i).data("weekData", weekData);
            weekx = week;
            break;
        }
    }

    //if ($(".info-list.current").data("weekName")==weekName || !HYBRID) {
        //填充信息
        $(".info-list.current ul li").remove();
        //$(".info-list.current ul").append("<li>" + weekName + "</li>");
        for(var i=0; i<weekData.knowledge_points.subjects.length; i++) {
            var subject = weekData.knowledge_points.subjects[i];
            var li = $('<li class="title-item"><i class="icon"></i><span class="title">词汇</span> <i class="fold"></i></li>');

            var infoUL = $("<ul></ul>").addClass("detail-list");
            for(var k=0;k<subject.contents.length; k++) {
                infoUL.append("<li  class='subitem'>" + subject.contents[k].content + "</li>");
            }
            infoUL.hide();
            infoUL.css("top",  3.5*(i+1) + "rem");
            li.css("top", 3.5*i + "rem");
            li.find(".title").html(subject.name.en);
            li.data("subjectData", subject);

            li.click(function() {
                if ($(this).hasClass("opened")) {
                    var height = $(this).next("ul").css("height");
                    $(this).nextAll("li.title-item").css("-webkit-transform", "translateY(0)");
                    var tt = $(this);
                    setTimeout(function() {
                        $(tt).next("ul.detail-list").hide().css("-webkit-transform", "translateY(0)");
                    }, 500);
                    $(this).removeClass("opened");
                } else
                if ($("li.title-item.opened").length>0) {
                    $("li.title-item.opened").next("ul.detail-list").hide().css("-webkit-transform", "translateY(0)");
                    $("li.title-item.opened").nextAll("li.title-item").css("-webkit-transform", "translateY(0)");
                    $("li.title-item.opened").removeClass("opened");

                    $(this).addClass("opened");
                    $(this).next("ul").show();
                    var height = $(this).next("ul").css("height");
                    $(this).nextAll("li.title-item").css("-webkit-transform", "translateY(" + height + ")");
                } else {
                    $(this).addClass("opened");
                    $(this).next("ul").show();
                    var height = $(this).next("ul").css("height");
                    $(this).nextAll("li.title-item").css("-webkit-transform", "translateY(" + height + ")");
                }
            });
            $(".info-list.new>ul").append(li);
            $(".info-list.new>ul").append(infoUL);
        }

        var ktbx = $('<li class="title-item"><i class="icon"></i><span class="title">课堂表现</span></li>');
        ktbx.click(function() {
            var info  = courseId + "-" + lessonId;
            alert("send to jsbridge : " +  info)
            jsBridge.send(info);
        });
        ktbx.css("top", weekData.knowledge_points.subjects.length*3.5 + "rem");
        $(".info-list.new>ul").append(ktbx);

        var xgzp = $('<li class="title-item"><i class="icon"></i><span class="title">相关照片</span></li>');
        xgzp.css("top", (weekData.knowledge_points.subjects.length+1)*3.5 + "rem");
        xgzp.click(function() {
            var info  = courseId + "-" + lessonId;
            alert("send to jsbridge : " +  info)
            jsBridge.send(info);
        });
        $(".info-list.new>ul").append(xgzp);

        $(".info-list.new>ul").css("height", 3.5*weekData.knowledge_points.subjects.length + "rem");
        cb();
    //}
}

function initHoneyCombs(weeks) {
    if (weeks.result_code=="10000") {
        //先过滤掉价值观
        var lessionlist = [];
        for(var i=0; i<weeks.lessonlist.length; i++) {
            if (weeks.lessonlist[i].lessonName.en.indexOf("M-")==0) {
                lessionlist.push(weeks.lessonlist[i]);
            }
        }
        for(var i=0; i<lessionlist.length; i++) {
            var hex = $(".hexagon").eq(i);
            hex.data("week", lessionlist[i]);
            //hex.find("div").html(lessionlist[i].lessonName.en);
            if (lessionlist[i].studyflag=="1") {
                hex.addClass("learned");
            }
        }
        ready();
    }
}


var weekData = {
    "result_code": "10000",
    "knowledge_points": {
        "name": {
            "en": "Week 1",
            "zh": "第一周"
        },
        "subjects": [
            {
                "contents": [
                    {
                        "content": "Elmo",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Big Bird",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Mr.Noodle",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Cookie Monster",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Ernie",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Bert",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Grover",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "friends",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    }
                ],
                "name": {
                    "en": "Optional Vocabulary",
                    "zh": ""
                },
                "subject_id": ""
            },
            {
                "contents": [
                    {
                        "content": "Hi! I'm Elmo.",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Hi! I'm Big Bird.",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Hi! I'm Mr.",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Noodle.",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Hi! Welcome to Sesame Street School.",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Hi! I'm Ernie.",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Hi! I'm Bert.",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Hi! I'm Grover.",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Hi! We're friends.",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    }
                ],
                "name": {
                    "en": "Optional Sentences",
                    "zh": ""
                },
                "subject_id": ""
            },
            {
                "contents": [
                    {
                        "content": "Hello, hello.",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Wave hello.",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Wave hello.",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Hi Elmo.",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Hi Elmo.",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Hello, hello.",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Wave hello.",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Wave hello.",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Hi Elmo.",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "Hi Elmo.",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    }
                ],
                "name": {
                    "en": "Chant",
                    "zh": ""
                },
                "subject_id": ""
            },
            {
                "contents": [
                    {
                        "content": "Sing After Me",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    }
                ],
                "name": {
                    "en": "Song",
                    "zh": ""
                },
                "subject_id": ""
            },
            {
                "contents": [
                    {
                        "content": "K1练习册上学期P1-6",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    }
                ],
                "name": {
                    "en": "Handicraft and Writing",
                    "zh": ""
                },
                "subject_id": ""
            },
            {
                "contents": [
                    {
                        "content": "作业本 K1-1A",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    },
                    {
                        "content": "作业本 K1-1B",
                        "priority": "1",
                        "remark": "",
                        "resources": []
                    }
                ],
                "name": {
                    "en": "Homework",
                    "zh": ""
                },
                "subject_id": ""
            }
        ]
    }
};

var weeksData = {
    "result_code": "10000",
    "lessonlist": [
        {
            "lessonId": "4EF7C5769DA247969C37C80CEC741F23",
            "lessonName": {
                "en": "M-01-Welcome to Sesame Street English School",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "117956F27E9F4FB09A548FC7781F0A17",
            "lessonName": {
                "en": "V-01-Getting Ready For School",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "9D08F0C2E1E949F480E04DCC5053DDCB",
            "lessonName": {
                "en": "M-02-School",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "C2E8EF1027844E1F9BDB5EE813E306FC",
            "lessonName": {
                "en": "V-02-Getting Ready For School",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "41386E599DB948B996C32D24B7472AF6",
            "lessonName": {
                "en": "M-03-Eyes",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "62382D21BC564513809638530466DA20",
            "lessonName": {
                "en": "V-03-Making New Friends",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "F5B9A23319B9430EB7328EF1EA5CC114",
            "lessonName": {
                "en": "M-04-Ears",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "B8159E8E693440F68AE5D9DA51B65791",
            "lessonName": {
                "en": "V-04-Making New Friends",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "138C92FD794646598306A948DA0269CC",
            "lessonName": {
                "en": "M-05-Noses",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "E44A2111F7BA436FBEF04918A398D94C",
            "lessonName": {
                "en": "V-05-Learning New Things",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "4AEC564878DB4DD0AC2584FD2C35C058",
            "lessonName": {
                "en": "M-06-Review",
                "zh": "复习课"
            },
            "studyflag": "0"
        },
        {
            "lessonId": "4FD2A7CCF4C343E2B65592A960E951D3",
            "lessonName": {
                "en": "V-06-Open Class: Drama Performance",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "80684C37EE0749369DB4922AF02101D9",
            "lessonName": {
                "en": "M-07-Mouth",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "88D48D6B7D764CFAA3897E463707B493",
            "lessonName": {
                "en": "V-07-Happy, Healthy Smiles",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "125FDDA767A84B7BB3B4339AFBA9092A",
            "lessonName": {
                "en": "M-08-Hands",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "CEE0B333F51D4C8F8A42690A9091DA66",
            "lessonName": {
                "en": "V-08-Happy, Healthy Smiles",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "ED6A5179A2714785965CFAA3F557E3D8",
            "lessonName": {
                "en": "M-09-Feet",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "0DE7BFDBD50748E4A7BFBEEB9433452F",
            "lessonName": {
                "en": "V-09-Team Teeth",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "5A8E5D8998714EECBDDB2B2CA78C68B1",
            "lessonName": {
                "en": "M-10-Teeth",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "84E174175EE040108CB52CA4F3296C38",
            "lessonName": {
                "en": "V-10-Team Teeth",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "1848671418DC422F976354F90CC52423",
            "lessonName": {
                "en": "M-11-Hair",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "A0EA36D550854CBEB50DB081EFA9EB68",
            "lessonName": {
                "en": "V-11-Keep Your Teeth Healthy",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "BA57B7467DF84D068B4A0F330F99D983",
            "lessonName": {
                "en": "M-12-Review",
                "zh": "复习课"
            },
            "studyflag": "0"
        },
        {
            "lessonId": "85CB553D0F2240B590507A0276D18713",
            "lessonName": {
                "en": "V-12-Open Class: Drama Performance",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "1477C11D8BE84F3F9F2BA0E66EBC9266",
            "lessonName": {
                "en": "M-13-Bananas",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "935F24E2B43249878B7C093BB1B83947",
            "lessonName": {
                "en": "V-13-Where Does Food Come from?",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "526AE93A62B643DB952439E766871EDA",
            "lessonName": {
                "en": "M-14-Food",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "62766699502E4EE0A9422BA9CF70F8F9",
            "lessonName": {
                "en": "V-14-Where Does Food Come from?",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "5CB382E150E84040BF3D50CA57A2F44D",
            "lessonName": {
                "en": "M-15-Water",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "CAACF4204AB942E999D80A8094952972",
            "lessonName": {
                "en": "V-15-Sometime VS. Anytime Food",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "C59066A6876C4564A2960635D5C66AAF",
            "lessonName": {
                "en": "M-16-Birds",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "8B6460C6DF5D4E5295678608389B4E19",
            "lessonName": {
                "en": "V-16-Sometime VS. Anytime Food",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "8E4A1666567E40EF9B9DAD2AA6210ED2",
            "lessonName": {
                "en": "M-17-Fishes",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "47E48A5BF81D4C81ADC01B0D64A1688A",
            "lessonName": {
                "en": "V-17-The Most Important Meal",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "642006BE605B4EF683728D66EB53EE0D",
            "lessonName": {
                "en": "M-18-Review",
                "zh": "复习课"
            },
            "studyflag": "0"
        },
        {
            "lessonId": "88F08C207C5A4B9D8BC2E5263B1D3BA4",
            "lessonName": {
                "en": "V-18-Open Class: Drama Performance",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "E7BDBCEA9C134F8F9C363CBE22CCC470",
            "lessonName": {
                "en": "M-19-Cats",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "008D5367C72549AAA5D39EEF9B43930D",
            "lessonName": {
                "en": "V-19-My Pet",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "AADDDA46D516454581B268795FE72FA7",
            "lessonName": {
                "en": "M-20-Dogs",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "6F0EC3C59C0241869347ABA7AAFD6EED",
            "lessonName": {
                "en": "V-20-My Pet",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "D9C3D075CA3949D8B484563080A61FF8",
            "lessonName": {
                "en": "M-21-Pets",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "F65556C23C574202A7166BF2B6ABF241",
            "lessonName": {
                "en": "V-22-Taking Care of My Pet",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "D54AB18E8BAA4CFABE8DE9AA16DF37BB",
            "lessonName": {
                "en": "M-22-Horses",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "DCA73D1160DE4FC3BFE62B8FA9B63AEF",
            "lessonName": {
                "en": "V-22-Taking Care of My Pet",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "BE337F7802F3440E83C3174FAF39D118",
            "lessonName": {
                "en": "M-23-Penguins",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "4B4B98C426AD4115BE6C2043F8516732",
            "lessonName": {
                "en": "V-23-Knowing My Pet's Feelings",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "82C2C2A823D147018C3656B2A5B12915",
            "lessonName": {
                "en": "M-24-Review",
                "zh": "复习课"
            },
            "studyflag": "0"
        },
        {
            "lessonId": "45AB8D1616A341ED9274EFADB45B21BE",
            "lessonName": {
                "en": "V-24-Open Class: Drama Performance",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "BBBC0F6AF0B44751A26DCFEC95D41879",
            "lessonName": {
                "en": "M-25-Frogs",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "926B22057EB949358D183FDF6CA2DE91",
            "lessonName": {
                "en": "V-25-Wild Friends",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "322179BC2B714B1E974280E0BF486FDD",
            "lessonName": {
                "en": "M-26-Bugs",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "970832906530452F8DDC9838FC861731",
            "lessonName": {
                "en": "V-26-Wild Friends",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "37ECD8C761804842B86C5C868A9E5094",
            "lessonName": {
                "en": "M-27-Dinosaurs",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "4E079FF3D3A042C2A2D6161FE03B44A8",
            "lessonName": {
                "en": "V-27-Visiting My Wild Friends",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "07F0AE5DE8CD4B76AEE20EA38D878A0F",
            "lessonName": {
                "en": "M-28-Wild Animals",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "59E3D9B182DF4B1DA2BE5CC70D51E4E0",
            "lessonName": {
                "en": "V-28-Visiting My Wild Friends",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "10369ED8FA9345B5A2655D10CBA7D2BE",
            "lessonName": {
                "en": "M-29-Balls",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "1AA60AFEAC6044CB8A5707E64E3D2535",
            "lessonName": {
                "en": "V-29-Amazing Friends",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "3A390EBF1BAC4F4280D1F1855DACC03A",
            "lessonName": {
                "en": "M-30-Review",
                "zh": "复习课"
            },
            "studyflag": "0"
        },
        {
            "lessonId": "D2EA32AAC3E04A5A84697D05196C0B81",
            "lessonName": {
                "en": "V-30-Open Class: Drama Performance",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "0D93732A6E814907B308580031BB3721",
            "lessonName": {
                "en": "M-31-Jumping",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "05AC5DD10E7A46789EC90B96644BA09A",
            "lessonName": {
                "en": "V-31-Exercise is Good for You",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "ED461E3891AD45FC9C666E134E00B867",
            "lessonName": {
                "en": "M-32-Bicycle",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "4DC7A381FF7941EE95AF9C49863D8669",
            "lessonName": {
                "en": "V-32-Exercise is Good for You",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "1445BF4E156C44AB80D9575F4C5D7809",
            "lessonName": {
                "en": "M-33-Exercise",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "5CED8209160E4A2AA9BBECCBE09CA285",
            "lessonName": {
                "en": "V-33-Exercise is a Lot of Fun",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "125459FCBFD34AC5AB44E3D262406FBC",
            "lessonName": {
                "en": "M-34-Hats",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "1812A974F2B34E6881C60F824FFDB338",
            "lessonName": {
                "en": "V-34-Exercise is a Lot of Fun",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "947373D7655B4BB794DA19AF6F081376",
            "lessonName": {
                "en": "M-35-Jackets",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "DA6996D3CAC7489793AC632C592C5FB3",
            "lessonName": {
                "en": "V-35-Exercise Everyday",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "FA2F8C738E844C7598C22BF5E041D8AB",
            "lessonName": {
                "en": "M-36-Review",
                "zh": "复习课"
            },
            "studyflag": "0"
        },
        {
            "lessonId": "4EA0A694851D48CDADBBE342186CBA76",
            "lessonName": {
                "en": "V-36-Drama Performance",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "D4641A3EA08241A7B0634F3D14B7A2EE",
            "lessonName": {
                "en": "M-37-Shoes",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "26522742E5F649728F87086E365FA2EF",
            "lessonName": {
                "en": "V-37-Weather Forecast",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "06754E1ECE93430FB90E65ADFB4DAA2A",
            "lessonName": {
                "en": "M-38-Sky",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "E7860121C4974091AF2E77A32CBE7673",
            "lessonName": {
                "en": "V-38-Weather Forecast",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "FB7491ADA35B4340A07D37F216FDBF0C",
            "lessonName": {
                "en": "M-39-Weather",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "8FBFB3DF4032437EA85E369B9B176191",
            "lessonName": {
                "en": "V-39-Tree Fashion Report",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "802E0512F0224CAAB3AF6BB581DE6318",
            "lessonName": {
                "en": "M-40-Flowers, Plants, Trees",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "80D9DD673D94410681FCAF480CE8D783",
            "lessonName": {
                "en": "V-40-Tree Fashion Report",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "68421BDF9DDB467CA84023D685AD6E9C",
            "lessonName": {
                "en": "M-41-Drums",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "E7BE6BAD8F7342D09B41B221D6C18933",
            "lessonName": {
                "en": "V-41-How Do You Feel",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "70B4752300CB4F4798CEA8DD6ECD0A08",
            "lessonName": {
                "en": "M-42-Review",
                "zh": "复习课"
            },
            "studyflag": "0"
        },
        {
            "lessonId": "F98CB3430BF948BE91065B80BD5BB15E",
            "lessonName": {
                "en": "V-42-Drama Performance",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "123CEEDAC13F4B5E9597631616CB434E",
            "lessonName": {
                "en": "M-43-Violins",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "3EA873B209434F4E91650EC3635940B6",
            "lessonName": {
                "en": "V-43-I Love Playing Musical Instruments",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "11E45E3BA8BA41028F9DE1EA6EA556DF",
            "lessonName": {
                "en": "M-44-Bells",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "22927C008AF947089519341C2E4962CB",
            "lessonName": {
                "en": "V-44-I Love Playing Musical Instruments",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "F7A0188BEA92493D9DE402BA1E05D0FA",
            "lessonName": {
                "en": "M-45-Dancing",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "6FA0CCF5A5F54B79AA2E0DF0F708B0EA",
            "lessonName": {
                "en": "V-45-I Love Dancing",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "2E82E5576648406A9F3E8556EDB3109A",
            "lessonName": {
                "en": "M-46-Singing",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "CFC346631ECB40B98BFA6B0E25776D68",
            "lessonName": {
                "en": "V-46-I Love Dancing",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "C676E839F78649A98CF233DBB13617F7",
            "lessonName": {
                "en": "M-47-Music",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "4B2CE4CD454A4FB4ACEAB9F5264DAAC0",
            "lessonName": {
                "en": "V-47-I Love Singing",
                "zh": ""
            },
            "studyflag": "0"
        },
        {
            "lessonId": "9F621699FAF9485DB97E9910931E568C",
            "lessonName": {
                "en": "M-48-Review",
                "zh": "复习课"
            },
            "studyflag": "0"
        },
        {
            "lessonId": "5A3FDAA09E5747229C53868B1A802D25",
            "lessonName": {
                "en": "V-48-Drama Performance",
                "zh": ""
            },
            "studyflag": "0"
        }
    ]
}