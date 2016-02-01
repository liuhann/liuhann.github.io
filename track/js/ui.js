$(function(){

    var screenWidth = 400;
    $("#iphone").deviceshell({
        width: screenWidth
    }).css("font-size", screenWidth/29);
    $("#iphone").css("left", $(window).width()/2-200);
    $("#iphone").css("top", 50);
    ready();
});

function effect1() {
    var startsec = 0.5;
    var i = 0;
    $(".hexagon").each(function() {
        i ++;
        $(this).addClass("animated");
        $(this).css("-webkit-animation-duration", startsec + i*0.02 + "s");
    });
    $(".hexagon").show().addClass("fadeInDown");
}

function effect2() {
    var startsec = 1.5;
    var i = 0;
    $(".hexagon").each(function() {
        i ++;
        $(this).addClass("animated");
        $(this).css("-webkit-animation-duration", startsec - i*0.02 + "s");
    });
    $(".hexagon").show().addClass("fadeInDown");
}

function effect3() {
    var startsec = 1.5;
    var i = 0;
    $(".hexagon").each(function() {
        i ++;
        $(this).addClass("animated");
        $(this).css("-webkit-animation-duration", startsec - i*0.02 + "s");
    });
    $(".hexagon").show().addClass("bounceInDown");
}


function effect4() {
    var startsec = 1.8;
    var i = 0;
    $(".hexagon").each(function() {
        i ++;
        if (i==1) {
            $(this).bind("webkitAnimationEnd", function() {
                flash();
            });
        }

        $(this).addClass("animated");
        $(this).css("-webkit-animation-duration", startsec - i*0.02 + "s");
    });
    $(".hexagon").show().addClass("zoomInDown");
}

function effect5() {
    var startsec = 1.5;
    var i = 0;
    $(".hexagon").each(function() {
        i ++;
        $(this).addClass("animated");
        $(this).css("-webkit-animation-duration", startsec - i*0.01 + "s");

        var mr = Math.random();
        if (mr<0.2) {
            $(this).show().addClass("zoomOutIn3");
        } else if (mr<0.3) {
            $(this).show().addClass("zoomOutIn15");
        } else if (mr<0.4) {
            $(this).show().addClass("zoomOutIn05");
        } else {
            $(this).show().addClass("zoomOutIn01");
        }
    });
}

function effect6() {
    var startsec = 1.5;
    var i = 0;
    $(".hexagon").each(function() {
        i ++;
        $(this).addClass("animated");
        $(this).css("-webkit-animation-duration", (startsec - i*0.02) + "s");
    });
    $(".hexagon").show().addClass("rotateIn");
}

function flash() {
    $(".light").show().addClass("animated lightFlash").css("-webkit-animation-duration", ".5s")
        .bind("webkitAnimationEnd", function() {
            $(this).remove();
        });
}

function reset() {
    $(".learned").hide().removeClass().addClass("learned hexagon");
    $(".hexagon:not(.learned)").hide().removeClass().addClass("hexagon");

    eval("effect" + (Math.floor(Math.random()*6)+1) + "()");
}


function ready() {
    reset();
    $(".hexagon").click(function() {
        //$(".hexagon").unbind();
        var $currentHex = $(this);

        $(".info-list").css("-webkit-animation-duration", ".5s")
            .addClass("animated fadeInUp").show().addClass("new");
        var index  = $(".hexagon").index($currentHex);
        initWeek(weekData);
        initSlide($currentHex, index);
    });

    function initSlide($currentHex, index) {
        setTimeout(function() {
            $(".info-list").removeClass("animated fadeInUp");
        }, 600);
        $(".learned").removeClass().addClass("learned hexagon");
        $(".hexagon:not(.learned)").removeClass().addClass("hexagon");
        var line = $currentHex.parent();
        line.removeClass("odd hline").css("margin-top", "1.6rem")
            .css("margin-left", ".4rem");

        var newDiv = $("<div></div>");
        newDiv.css("width", 10.1*24 + "rem");
        newDiv.css("height", "5.3rem");
        newDiv.append($(".hexagon"));
        line.append(newDiv);
        line.css("height", "5.3rem");
        line.css("width", "26rem");
        line.css("overflow", "hidden");

        line.attr("id", "iscroll");
        //var myScroll = new IScroll('#iscroll');

        $(".hline").css("float", "none");
        newDiv.attr("id", "scrollline");
        newDiv.css("-webkit-transition", "-webkit-transform .3s ease-in");

        $(".hline").remove();
        if (index<46) {
            $("#scrollline").css("-webkit-transform", " translateX(-" + 5*(index-2) + "rem)");
        }

        $(".hexagon").click(function() {
            var index  = $(".hexagon").index(this);
            goToIndex(index);
        });
    }

    function goToIndex(index) {
        if ($(".hexagon.selected").length>0) {
            //make a swipe
            var currentIndex = $(".hexagon").index($(".hexagon.selected"));
            var weekName = $(".hexagon").eq(index).data("week").lessonName.en;

            if (currentIndex == index) {

            } else {
                $(".info-list").addClass("rub");
                var left = $('<div class="info-list new"><ul></ul></div>');
                $(".wrapper").append(left);

                var leaveName = "slideOutLeft";
                var inName = "slideInRight";
                if (index>currentIndex) {
                    leaveName = "slideOutRight";
                    inName = "slideInLeft";
                }

                commandFetchWeekInfo($(".hexagon").eq(index).data("week").lessonId,  function() {
                    $(".info-list.rub").addClass("animated " + leaveName);
                    $(".info-list.new").show().addClass("animated " + inName);

                    setTimeout(function() {
                        $(".info-list.rub").remove();
                        $(".info-list.new").removeClass("animated" + inName);
                    }, 300);
                });
                //current.css("transform","translateY(10rem)");

                /*
                 left.css("-webkit-animation-duration", ".8s");
                 current.addClass("slideOutDown animated rub").removeClass("current");
                 left.addClass("animated slideInUp current");
                 */
                /*
                 else if (currentIndex>index) {
                 var current =  $(".info-list.current");
                 var left = current.clone();
                 left.removeClass("animated fadeInUp");
                 current.addClass("animated zoomOutLeft").removeClass("current").addClass("rub");
                 left.addClass("current");
                 left.css("transform", "translateY(27.5rem)");
                 left.data("weekName", weekName);
                 $(".wrapper").append(left);

                 setTimeout(function() {
                 current.remove();
                 }, 300);

                 setTimeout(function() {
                 left.css("transition" , "transform 0.3s ease-in");
                 left.css("transform", "translateY(0rem)");
                 }, 50);
                 } else {
                 var current =  $(".info-list.current");
                 var right = current.clone();
                 right.removeClass("animated fadeInUp");
                 //current.css("transform", "translateX(-27.5rem) scale(0.7)").removeClass("current").addClass("rub");
                 current.addClass("animated zoomOutRight").removeClass("current").addClass("rub");
                 right.addClass("current");
                 //right.css("transform", "translateX(27.5rem) scale(0.7)");
                 right.css("transform", "translateY(27.5rem)");
                 right.data("weekName", weekName);
                 right.css("transition" , "-webkit-transform 0.3s ease-in");

                 setTimeout(function() {
                 current.remove();
                 }, 300);
                 $(".wrapper").append(right);
                 setTimeout(function() {
                 right.css("transform", "translateY(0rem)");
                 }, 50);
                 }
                 */

            }
        }

        $(".hexagon.selected").removeClass("selected");
        $(".hexagon").eq(index).addClass("selected");

        if (index<46) {
            ////newDiv.css("-webkit-transform", " translateX(-" + 10*(index-2) * $(window).width()/52 + "px)");
            $("#scrollline").css("-webkit-transform", " translateX(-" + 5*(index-2) + "rem)");
        }
    }
}


function initWeek(weekData) {
    console.log("week data got: " + JSON.stringify(weekData));
    if (typeof weekData =="string") {
        weekData = JSON.parse(weekData);
    }
    var weekx = null;
    var weekName = weekData.knowledge_points.name.en;


    //填充信息
    $(".info-list.current ul li").remove();
    $(".info-list.current ul").append("<li>" + weekName + "</li>");
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

    $(".info-list.new>ul").css("height", 3.5*weekData.knowledge_points.subjects.length + "rem");
    //}
}

