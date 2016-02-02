
function HoneyComber(container, config_div) {
    var CURRENTDATA = [];

    var defaultHexImage = "img/h1.png";

    function setDefaultHexImg(img) {
        defaultHexImage = img;
    }

    function getData() {
        return CURRENTDATA;
    }

    function setData(data) {
        CURRENTDATA = data;
    }

    function openNPlay() {
        sessionStorage.setItem("me", JSON.stringify(CURRENTDATA));
        window.open("./player.html");
    }

    function play() {
        var div = $("<div class='scene'></div>");
        div.css("position","absolute");
        div.css("overflow", "hidden");
        var id = container + "-honeyplayer";
        $(container).append(div);
        $(div).attr("id",  id);
        $(div).css("height", $(container).height());
        $(div).css("width", $(container).height()*16/9);

        $(div).css("top", 0);
        $(div).css("left", $(container).width()/2-$(div).width()/2);
        container = "#" + id;
        showHex(true);
    }

    function clearHex() {
        CURRENTDATA = [];
        d3.select(container).selectAll("div.hex").remove();
    }

    function showHex(play) {
        d3.select(container).selectAll("div.hex").remove();
        var FULL_WIDTH = $(container).width();
        var FULL_HEIGHT = $(container).height();

        var div = d3.select(container).selectAll("div.hex")
            .data(CURRENTDATA, function(d) {
                return JSON.stringify(d)
            })
            .enter().append("div").classed("hex ", true);
        div.attr("class", function(d) {
            return d.entrance + " animated hex";
        });

        div.style("-webkit-animation-delay", function(d) {
            return d.enterdelay + "s";
        });

        div.attr("id", function(d) {
            return "hex-" + d.key;
        });


        if (!play) {
            div.on("click", function(data) {
                editHex(data);
            });
        }

        div.append("p").classed("title", true).style("font-size", function(d){
            return FULL_WIDTH  * parseFloat(d.width)/100 * d.titlefont + "px";
        }).text(function(d) {
            return d.title;
        });

        div.append("p").classed("desc", true).style("font-size", function(d) {
            return FULL_WIDTH  * parseFloat(d.width)/100  * d.descfont + "px";
        }).text(function(d) {
            return d.desc;
        });

        div.style("left", function(d) {
            return d.left;
        }).style("top", function(d) {
            return d.top;
        }).style("width", function(d) {
            return d.width;
        }).style("height", function(d) {
            return d.height;
        }).style("background-image",function(d) {
            return "url('" + d.img + "')";
        }).style("background-size", "cover");
    }

    /**
     * Hex Grid Size and Spacing
     * height = size * 2
     * vert = height * 3/4
     * width = sqrt(3)/2 * height
     * horiz = width
     * @param container
     * @param height
     */
    function generateGrid(linecount, centered, dis) {

        clearHex();

        d3.select(container).selectAll("svg").remove();
        var hexseq = 1;
        var vert = $(container).height()/(linecount+0.5)-dis;
        var height = vert * 4 /3;
        var width   = Math.sqrt(3)/2 * height;

        //首先，计算按平均分布所有六边形的位置。
        var lines = [];
        if (linecount%2===0) {
            lines.push([$(container).width()/2,($(container).height()/2-height+dis), hexseq++]);
        } else {
            if (centered) {
                lines.push([($(container).width()-width)/2,($(container).height()-height)/2, hexseq++]);
            } else {
                lines.push([$(container).width()/2,($(container).height()-height)/2, hexseq++]);
            }
        }

        lines = expandx(lines, width + dis, Math.floor($(container).width()/(2*width)));
        lines = expandy(lines, vert, width, dis, Math.floor(linecount/2)+1);

        //描述的是多边形的6个点，形成一个蜂巢六边形
        var lineary = [width/2, 0, width, height/4,width, height*3/4, width/2,height,0,height*3/4,0,height/4];

        //绘制蜂巢背景
        d3.select(container).append("svg")
            .attr("width",$(container).width()).attr("height", $(container).height())
            .selectAll("g").data(lines).enter().append("g")
            .attr("transform", function(d) {
                return 'translate(' + d[0] + ', ' + d[1] + ')';
            })
            .append("polygon").attr("points", lineary.join(","))
            .attr("transform", function(d) {
                return 'scale(.3)';
            })
            .attr("stroke-width", "1")
            .attr("fill", "hsl(60, 10%, 95%)")
            .attr("stroke", "hsl(0, 0%, 70%)")
            .on("click", function(data) {
                var hex = {
                    key: data[2],
                    left: 100*data[0]/$(container).width() + "%",
                    top: 100*data[1]/$(container).height() + "%",
                    width: 100*width/$(container).width() + "%",
                    height: 100*height/$(container).height() + "%",
                    title: "",
                    desc: "",
                    img: defaultHexImage,
                    titlefont: 0.1,
                    descfont: 0.06,
                    enterdelay: 0
                };
                CURRENTDATA.push(hex);
                showHex();
                editHex(hex);
            }) /** 之后增加一个动画特效*/
            .transition()
            .duration(function(d, i) {
                return d[0];
            })
            .attr("transform", "scale(1)");

        function expandx(sar, distance, length) {
            var dest = [];
            for(var i=1; i<=length; i++) {
                dest.push([sar[0][0] - distance*i, sar[0][1], hexseq++]);
                dest.push([sar[sar.length-1][0] + distance*i, sar[sar.length-1][1],hexseq++]);
            }
            return dest.concat(sar);
        }

        function expandy(sar, vert, width, dist, length) {
            var dest = [];
            for(var i=1; i<=length; i++) {
                for(var k=0; k<sar.length; k++) {
                    dest.push([sar[k][0] - (i%2)*((width+dist)/2), sar[k][1] - (vert+dist)*i, sar[k][2] + "-" + i]);
                    dest.push([sar[k][0] - (i%2)*((width+dist)/2), sar[k][1] + (vert+dist)*i, sar[k][2] + "-p" + i]);
                }
            }
            return dest.concat(sar);
        }
    }

    function update(list, data) {
        for(var i=0; i<list.length; i++) {
            if (list[i].key===data.key) {
                list[i] = data;
                break;
            }
        }
    }

    /*edit related*/
    var currentHex = null;
    $(document).ready(function () {
        $('.js--triggerAnimation').click(function (e) {
            e.preventDefault();
            var anim = $('.js--animations').val();
            testAnim(anim);
        });

        $('.js--animations').change(function () {
            var anim = $(this).val();
            testAnim(anim);
        });

        $("input.blur").on("blur", function() {
            saveEdit();
        });

        /**初始化六边形的背景列表*/
        var ddData = [];
        for (var i = 1; i < 15; i++) {
            ddData.push({
                text: "HEX" + i,
                value: i,
                imageSrc: "img/h" + i + ".png"
            });
        }

        /**美化下拉框*/
        $("#hexselect").ddslick({
            data: ddData,
            width: 300,
            selectText: "选择六边形样式",
            imagePosition: "right",
            onSelected: function (sd) {
                var hex = $(".hexconfig").data("hex");
                hex.img = sd.selectedData.imageSrc;
                setDefaultHexImg(hex.img);
                showHex();
            }
        });
    });

    function testAnim(x) {
        console.log(currentHex.key + "  " + x);
        if (currentHex) {
            $("#hex-" + currentHex.key).attr("class", "hex").addClass(x + ' animated ').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).attr("class", "hex");
            });
        }
        saveEdit();
    };

    function editHex(hex) {
        console.log(hex);
        $(".hex.focused").removeClass("focused");
        $("#hex-" + hex.key).addClass("focused");
        currentHex = hex;
        $(config_div).data("hex", hex);
        $(config_div).find(".title").val(hex.title);
        $(config_div).find(".titlefont").val(Math.floor(hex.titlefont * 100));
        $(config_div).find(".desc").val(hex.desc);
        $(config_div).find(".descfont").val(Math.floor(hex.descfont * 100));
        $(config_div).find(".js--animations").val(hex.entrance);
        $(config_div).find(".enter_delay").val(hex.enterdelay);

    }

    function saveEdit() {
        var data = $(".hexconfig").data("hex");
        data.title = $(config_div).find(".title").val();
        data.titlefont = parseInt($(config_div).find(".titlefont").val())/100;
        data.desc = $(config_div).find(".desc").val();
        data.descfont = parseInt($(config_div).find(".descfont").val())/100;
        data.entrance = $(config_div).find(".js--animations").val();
        data.enterdelay = $(config_div).find(".enter_delay").val();
        //update(CURRENTDATA, data);
        showHex();
    }

    function deleteEdit() {
        var data = $(".hexconfig").data("hex");
        CURRENTDATA = _.without(CURRENTDATA, data);
        showHex();
    }

    return {
        layedIn: generateGrid,
        showHex: showHex,
        saveEdit:saveEdit,
        deleteEdit: deleteEdit,
        setData: setData,
        play: play,
        preview: openNPlay,
        getData: getData
    }
}

