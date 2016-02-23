/**
 * Created by liuhan on 2015/10/26.
 */
/*
var users = [
    {
        head: "img/default.png",
        name: "MARK,Allen",
        id: "hanmei",
        off: 0,
        offdate: 140000000
    }
];

 var groups = [
 {
 "GroupName": "group2",
 "StudentsListItemColl": [
 // type of user
 {
 "StudentName": "raj_miller"
 }
 ]
 }
 ]

*/

//Card.init(users);  初始化
//Card.update(users);  更新头像
//Card.group([]);
//Card.ungroup();
//Card.online(userid)
//Card.offline(userid);


var Card = (function(c,g) {
    var cardTemplate =
        '<div class="card user">'
            + '<div class="head back"><img></div>'
            + '<div class="head grey"><img></div>'
            + '<div class="name"></div>'
            + '<div class="offclass">请假'
            + '</div>'
        + '</div>';

    var groupCardTemplate =
        '<div class="card user">'
        + '<div class="head"><img></div>'
        + '<div class="name"></div>'
        + '</div>';

    var groupTemplate =
        '<div class="group">'
            + '<div class="cardlist"></div>'
            + '<div class="title"></div>'
        +'</div>';

    var cusers = null;

    function init(users) {
        if(typeof(users)==='string') {
            users = JSON.parse(users);
        }
        cusers = users;
        $(c).empty();

        for(var i=0;i<users.length; i++) {
            Card.add(users[i]);
        }
        cardAnimateOut();
    }

    function update(users) {
        if(typeof(users)==='string') {
            users = JSON.parse(users);
        }
        cusers = users;
        for(var i=0; i<users.length; i++) {
            /**修改更新逻辑： 当某个学生卡并未在页面画出时， 增加这个学生， 否则仅更新头像*/
            if ($("#usercard-" + users[i].id).length===0) {
                Card.add(users[i]);
            } else {
                $("#usercard-" + users[i].id).find(".head img").attr("src", users[i].head);
            }
        }
        cardAnimateOut();
    }

    function add(user, i) {
        var cloned = $(cardTemplate);
        cloned.data("user", user);
        cloned.find(".head img").attr("src", user.head).click(function() {
            localStorage.setItem("users", JSON.stringify(cusers));

            var onlines = [];
            $(".card-scene .card.user.online").each(function() {
                onlines.push($(this).attr("id").substring("usercard-".length));
            });
            localStorage.setItem("onlines", JSON.stringify(onlines));

            var data = $(this).parents(".user").data("user");
            location.href = "chart.html?name=" + user.name + "&head="+ user.head;
        });
        cloned.attr("id" , "usercard-" + user.id);

        if (user.name) {
            cloned.find(".name").html(user.name);
        }

        cloned.find(".name").click(function() {
            userOnline($(this).parents(".card").data("user").id);
        });

        if (user.off===1) {
            cloned.find(".offclass").show();
        } else {
            cloned.find(".offclass").hide();
        }
        cloned.css("-webkit-transform", "scale(0)");
        $(c).append(cloned);
    }

    function cardAnimateOut() {
        var l = $(".card.user").length;
        $(".card-scene").addClass("p"+l);
        setTimeout(function() {
            var i = 0;
            var sep;
            if(l<9) {
                sep = 3
            } else if (l<=12) {
                sep = 4
            } else if (l<=20) {
                sep = 5;
            } else {
                sep = 6;
            }
            $(".card").each(function() {
                var card = $(this);
                $(this).css("-webkit-transition-delay", 100+50*(i%sep) + "ms")
                    .css("-webkit-transform", "scale(1)");
                i++;
            });
        }, 100);
    }

    function __initScene() {
        $(function() {
            var winWidth = $(window).width();
            var clz;
            if (winWidth<1280) {
                clz = "s1024";
            } else if (winWidth<1920) {
                clz = "s1280";
            } else {
                clz = "s1920";
            }
            $(".card-scene").removeClass().addClass("card-scene").addClass(clz);
            $(".group-scene").removeClass().addClass("group-scene").addClass(clz);


            var params = getUrlVars();
            if (params && params.back) {
                Card.init(localStorage.getItem("users"));
                var onlines = JSON.parse(localStorage.getItem("onlines"));
                console.log(onlines);
                for(var i=0;i<onlines.length; i++) {
                    Card.online(onlines[i]);
                }
            }
        });
    }

    function userOnline(i) {
        var ucard = $("#usercard-" + i);
        if (ucard.hasClass("online")) return;

        ucard.addClass("online");
        ucard.find(".head.back").removeClass("back");
        ucard.find(".head.grey").addClass("back");

        ucard.addClass("zoomShow");
        setTimeout(function() {
            ucard.removeClass("zoomShow")
        }, 2000);
    }

    function userOffline(i) {
        var ucard = $("#usercard-" + i);
        ucard.removeClass("online");
        ucard.find(".head:not(.back)").addClass("back");
        ucard.find(".head.grey").removeClass("back");
    }


    function getUserById(id) {
        for(var i=0; i<cusers.length; i++) {
            if(cusers[i].id===id) {
                return cusers[i];
            }
        }
    }

    function group(groupInfo) {
        if(typeof(groupInfo)==='string') {
            groupInfo = JSON.parse(groupInfo);
        }
        $(g).empty();
        var groupCount = 0;
        var fo = [];
        for(var i=0;i<groupInfo.length; i++) {
            /**we may have empty groups*/
            if (groupInfo[i].StudentsListItemColl.length==0) continue;
            fo.push(groupInfo[i]);
        }
        groupInfo = fo;

        $(".group-scene").removeClass("gn1 gn2 gn3 gn4 gn6 gn6 gn7 gn8 gn9 gn10");
        $(".group-scene").addClass("gn" + groupInfo.length);

        for(var i=0;i<groupInfo.length; i++) {
            if (groupInfo[i].StudentsListItemColl.length==0) continue;
            var groupi = $(groupTemplate);

            groupi.attr("id", "group-" + (i+1));
            groupi.addClass("group" + (i+1));
            $(g).append(groupi);

            var users = [];
            var names = [];

            for(var j=0; j<groupInfo[i].StudentsListItemColl.length; j++) {
                var user = getUserById(groupInfo[i].StudentsListItemColl[j].StudentName);

                var cloned = $(groupCardTemplate);
                cloned.addClass("online");
                cloned.find(".head img").attr("src", user.head);
                if (user.name) {
                    cloned.find(".name").html(user.name);
                }
                $(groupi).find(".cardlist").append(cloned);
            }

            groupi.data("users", users);
            //groupi.find(".name").html(names.join(","));
            groupi.find(".title").html(groupInfo[i].GroupName);

            $(g).append(groupi);

        }
        _groupAnimateIn();
    }

    var groupTimeoutId = null;
    var ungroupTimeoutId = null;
    //mozAnimationEnd oAnimationEnd oanimationend animationend
    function ungroup() {

        $(g).addClass("slideUp");
        $(c).show().addClass("zoomFadeUp");

        clearTimeout(groupTimeoutId);
        ungroupTimeoutId = setTimeout(function() {
            $(g).hide().removeClass("slideUp");
            $(c).show().removeClass("zoomFadeUp");
        }, 500);

    }

    function _groupAnimateIn() {
        $(g).show().addClass("slideDown");
        $(c).addClass("zoomFadeDown");

        groupTimeoutId = clearTimeout(ungroupTimeoutId);
        setTimeout(function() {
            $(g).show().removeClass("slideDown");
            $(c).hide().removeClass("zoomFadeDown");
        }, 500);
    }

    function getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    __initScene();
    return {
        init: init,
        update: update,
        add: add,
        online:userOnline,
        offline: userOffline,
        group: group,
        ungroup: ungroup
    }
}(".card-scene", ".group-scene"));

//module.exports = Card;
$(function() {
    //htmlready();
    Card.init(usersh);
   //Card.group(genGroup(4));
});