/**
 * Created by liuhan on 2016/1/6.
 */

var Accuracy = (function() {

    var pageCount = 12;

    var defaultTableOptions = {
        searching: false,
        ordering:  false,
        bInfo :false,
        bLengthChange : false,
        pageLength: 12,
        bAutoWidth:false
    };

    var homework = null;
    var inclass = null;


    function update(inc) {
        console.log(inc);

        if(typeof(inc)==='string') {
            inc = JSON.parse(inc);
        }
        /**
         * Only 2 conditions we need to update the table and graph:
         * In class tab and In class exercises details
         */
        if (getShownTable()==="table-inclass-ex") {
            updateInClass(inc);
        }
        if (getShownTable()==="table-inclass-ex-detail") {
            for(var i=0; i<inc.exercises.length; i++) {
                if (currentExcercise.id===inc.exercises[i].id) {
                    updateExercise(inc.exercises[i]);
                }
            }
        }
        inclass = inc;
    }

    function init(home, inc) {
        console.log(home, inc);
        if(typeof(inc)==='string') {
            inc = JSON.parse(inc);
        }

        if(typeof(home)==='string') {
            home = JSON.parse(home);
        }

        homework = home;
        inclass = inc;

        if (home===null) {
            showInClass();
        } else {
            showAllHomework();
        }

    }

    function layout() {
        $('#data-table').css("width", $(".container .content").width() * 0.66);
        var w = $(".content").width() * 0.32;
        $(".chart").css("width", $(".content").width() * 0.33);
        DonutChart.init({
            height: w * 0.6,
            width: w,
            innerRadius:  w * 0.12,
            outerRadius: w * 0.2,
            labelRadius:  w  * 0.22
        });
    }

    function getShownTable() {
        return $(".table-container>.dataTables_wrapper:visible").find(">table").attr("id");
    }

    function showTable(data, tableid, headers, clear,  rowCreated, extraEvent) {
        var bPaginate = true;
        if (data.length<8) {
            bPaginate = false;
        }
        $(".table-container>.dataTables_wrapper").hide();
        $('#' + tableid).parent().show();
        $(".table-container>table").css("width", $(".container .content").width() * 0.66);

        if ( $.fn.dataTable.isDataTable( '#' + tableid ) ) {
            if (clear) {
                var table = $('#' + tableid).DataTable();
                table.clear();
                table.rows.add(data);
                table.page('first').draw();
                //$('#' + tableid).DataTable().clear().rows.add(data);
            }
            return;
        }

        var options = {
            searching: false,
            ordering:  false,
            bInfo :false,
            bLengthChange : false,
            pageLength: 12,
            bAutoWidth:false,
            createdRow:  function( row, data, dataIndex ) {
                $(row).css("animation-delay", 50 * dataIndex + "ms"); //css("-webkit-transform-origin-x", "0");
                $(row).addClass("zoomIn animated");
                if (rowCreated) {
                    rowCreated( row, data, dataIndex );
                }
            },
            columns: headers,
            data: data
        };
        $('#' + tableid).DataTable(options);
        $('table').find("tr").addClass("animated zoomIn");
        if (extraEvent) {
            extraEvent();
        }
    }

    function showAllHomework() {
        $(".tab").first().removeClass("unactive left");
        $(".tab").last().addClass("unactive right");

        $(".content").removeClass("on");

        if (homework!=null) {
            var dataSet = extractStudents(homework);  //Prepare data for table
            if (homework.date) {
                $(".content .date").html(new Date(homework.date).Format("yyyy-MM-dd"));
            }
            $(".content>.title").html(homework.title);
            $(".content>.desc").empty();
            $(".content>.title").unbind();

            showTable(dataSet, "table-homeworks",  [
                { title: "Learner Name", width: "33%" },
                { title: "Status" , width: "33%"},
                { title: "Accuracy" , width: "34%"}
            ], false,  function( row, data, dataIndex ) {
                if(data[1].charAt(0)==='0') {
                    $(row).addClass("red");
                }
                $(row).click(function() {
                    showHomeWorkFor(dataIndex);
                });
            });

            drawPie([{
                label : "Completed",
                instances: Math.floor(homework.completed * 100)
            }, {
                label : "Not Finished",
                instances: Math.floor(homework.notfinished * 100)
            }], [{
                label: "Correct",
                instances: Math.floor(homework.correct * 100)
            }, {
                label: "Error",
                instances:  Math.floor(homework.error * 100)
            }
            ]);
        } else {
            $(".content>.title").html('No homework');
            //no home work
            showTable([], "table-homeworks",  [
                { title: "Learner Name", width: "33%" },
                { title: "Status" , width: "33%"},
                { title: "Accuracy" , width: "34%"}
            ], false);

            drawPie([{
                label : "No Data",
                instances: 100
            }], [{
                label: "No Data",
                instances: 100
            }]);
        }

    }

    function showHomeWorkFor(index) {
        var cuser = homework.students[index];

        $(".content").addClass("on");
        $(".return").unbind().click(showAllHomework);

        $(".content>.desc").html(cuser.name + "'s Homework");
        $(".content>.title").click(showAllHomework);

        var dataSet = extractStudentHomework(cuser);

        showTable(dataSet, "table-homeworks-student",  [
            { title: "No.", width: "8%" },
            { title: "Homework" , width: "42%"},
            { title: "Status" , width: "25%"},
            { title: "Accuracy" , width: "25%"}
        ], true);

        updatePie([{
            label : "Completed",
            instances: Math.floor(cuser.committed/cuser.total * 100)
        }, {
            label : "Not Finished",
            instances: 100 - Math.floor(cuser.committed/cuser.total * 100)
        } ], [{
            label: "Correct",
            instances: Math.floor(cuser.accuracy * 100)
        }, {
            label: "Error",
            instances: 100 -  Math.floor(cuser.accuracy * 100)
        }
        ]);
    }

    function showInClass() {
        $(".tab").first().addClass("unactive left");
        $(".tab").last().removeClass("unactive right");

        $(".content").removeClass("on");
        if (inclass===null) return;

        var dataSet = extractExcersices(inclass);  //Prepare data for table

        $(".content>.desc").empty();
        $(".content>.title").unbind();

        $(".content .date").html(new Date().Format("yyyy-MM-dd"));

        $(".content>.title").html(inclass.title);

        $('table').find("tr").addClass("animated zoomIn");

        showTable(dataSet, "table-inclass-ex",   [
            { title: "No.", width: "8%" },
            { title: "Ex. Name" , width: "42%"},
            { title: "Status" , width: "25%"},
            { title: "Accuracy" , width: "25%"}
        ],  true,  function( row, data, dataIndex ) {
            $(row).attr("id", data[4]);
            $(row).click(function() {
                showExcersicesDetail(dataIndex);
            });
        }, function() {

        });
        var pies = generateInclassPie(inclass);
        drawPie(pies[0], pies[1]);
    }

    /**
     * Update in class table and graph chart
     * @param newInClass
     */
    function updateInClass(newInClass) {
        var table = null;

        if ( $.fn.dataTable.isDataTable( '#table-inclass-ex') ) {
            // get data table instance
            table = $('#table-inclass-ex').DataTable();
        }


        //remove played animation
        $('#table-inclass-ex').find("tr.animated").removeClass("animated zoomIn");

        for(var i=0; i<newInClass.exercises.length; i++) {
            var exercise = newInClass.exercises[i];
            var row = table.row("#" + getExerciseId(exercise));
            if (row && row.data()) { //check for row updated
                var data = row.data();

                //when status changed or accuracy changed
                if (data[2]!=(exercise.submitted+"/"+exercise.total) || data[3]!=Math.floor(exercise.accuracy*100)+"%") {
                    row.data(getExerciseData(exercise, i));

                    $("#" + newInClass.exercises[i].id).find('td').eq(2).addClass("flash")
                        .on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                            $(this).removeClass();
                    });

                    $("#" + newInClass.exercises[i].id).find('td').eq(3).addClass("flash")
                        .on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                            $(this).removeClass();
                        });
                }
            } else {
                table.row.add(getExerciseData(exercise, i)).draw();
            }
        }

        var pies = generateInclassPie(newInClass);
        updatePie(pies[0], pies[1]);
    }

    function generateInclassPie(newInClass) {
        var pie1 = [{
            label: "No Data",
            instances: 100
        }];

        if (typeof(newInClass.completed)==="number" && typeof(newInClass.notfinished)==="number") {
            pie1 = [{
                label : "Completed",
                instances: Math.floor(newInClass.completed * 100)
            }, {
                label : "Not Finished",
                instances: Math.floor(newInClass.notfinished * 100)
            }]
        }
        var pie2 = [{
            label: "No Data",
            instances: 100
        }];
        if (typeof(newInClass.correct)==="number" && typeof(newInClass.error)==="number") {
            pie2 = [{
                label : "Correct",
                instances: Math.floor(newInClass.correct * 100)
            }, {
                label : "Error",
                instances: Math.floor(newInClass.error * 100)
            }]
        };

        return [pie1, pie2];
    }

    var currentExcercise = null;

    function showExcersicesDetail(index) {
        var exercise = inclass.exercises[index];

        $(".content").addClass("on");
        $(".return").unbind().click(showInClass);

        currentExcercise = exercise;

        $(".content>.desc").html(exercise.name);
        $(".content>.title").click(showInClass);

        var dataSet = extractExcersiceDetail(exercise);

        showTable(dataSet, "table-inclass-ex-detail",  [
            { title: "Learner name", width: "40%" },
            { title: "Status" , width: "20%"},
            { title: "Time" , width: "20%"},
            { title: "Accuracy" , width: "20%"}
        ], true, function( row, data, dataIndex ) {

            if(data[1]==='-') {
                $(row).addClass('red');
            }
            $(row).attr("id", "ed-" + data[4]);
        });
        drawFinishingAndCorrect(exercise.accuracy, exercise.submitted + "/" + exercise.total);
    }

    function updateExercise(exercise) {
        var table = null;
        if ( $.fn.dataTable.isDataTable( '#table-inclass-ex-detail') ) {
            table = $('#table-inclass-ex-detail').DataTable();
        }

        $('#table-inclass-ex-detail').find("tr.animated").removeClass("animated zoomIn");

        for(var i=0; i<exercise.students.length; i++) {
            var student = exercise.students[i];
            var row = table.row("#ed-" + student.id);

            if (row && row.data()) { //check for row updated
                var data = row.data();
                if (data[1]==="-" && student.status===1) {
                    row.data(getExerciseStudentData(student));
                    $("#ed-" + student.id).addClass("flash")
                        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                            $(this).removeClass("flash red");
                        });
                }
            }
        }
        drawFinishingAndCorrect(exercise.accuracy, exercise.submitted + "/" + exercise.total);
    }

    function extractStudentHomework(user) {
        var result = [];

        for(var i=0; i<user.details.length; i++) {
            var detail = user.details[i];
            result.push([
                (i+1) + ".",
                detail.homework,
                (detail.status===0)?"-":"<img src='img/ok.png'>",
                (detail.status===0)?"-":(Math.floor(detail.accuracy*100) + "%")
            ]);
        }
        return result;
    }

    function extractStudents(homework) {
        var result = [];
        for(var i=0; i<homework.students.length; i++) {
            var student = homework.students[i];
            result.push([
                student.name,
                student.committed + "/" + student.total,
                Math.floor(student.accuracy*100) + "%",
                student.id
            ]);
        }
        return result;
    }

    function extractExcersices(inclass) {
        var result = [];
        for(var i=0; i<inclass.exercises.length; i++) {
            var exercise = inclass.exercises[i];
            result.push(getExerciseData(exercise, i));
        }
        return result;
    }

    function getExerciseData(exercise, i) {
        return [
            (i+1) + ".",
            exercise.name,
            exercise.submitted + "/" + exercise.total,
            (typeof(exercise.accuracy)==="undefined")? "-" : (Math.floor(exercise.accuracy*100) + "%"),
            getExerciseId(exercise)
        ];
    }
    function getExerciseId(exercise) {
        return "ex-" + exercise.timestamp.replace(/[ :.]/g, '');
    }

    function extractExcersiceDetail(exercise) {
        var result = [];
        for(var i=0; i<exercise.students.length; i++) {
            var student = exercise.students[i];
            result.push(getExerciseStudentData(student));
        }
        return result;
    }

    function getExerciseStudentData(student) {
        return [
            student.name,
            (student.status===0)?"-":"<img src='img/ok.png'>",
            timeMill2Doted(student.time),
            Math.floor(student.accuracy * 100) + "%",
            student.id
        ]
    }

    function timeMill2Doted(mill) {
        var sec = mill%60;
        var min = Math.floor(mill/60);
        return Math.floor(mill/60) + "'" + ((sec<10)?("0"+sec):sec)  + "''";
    }

    function drawFinishingAndCorrect(accuracy, status) {

        DonutChart.animateContent([{
            label : "Completed",
            instances: Math.floor(eval(status) * 100)
        }, {
            label : "Not Finished",
            instances: 100 - Math.floor(eval(status) * 100)
        } ], d3.select("#chart1"));

        if (typeof(accuracy)==="undefined") {
            DonutChart.clearContent(d3.select("#chart2"));
            DonutChart.animateContent([{
                label: "No Data",
                instances: 100
            }], d3.select("#chart2"));
        } else {
            if (DonutChart.getSize(d3.select("#chart2"))!=2) {
                DonutChart.clearContent(d3.select("#chart2"));
            }

            DonutChart.animateContent([{
                label: "Correct",
                instances: Math.floor(accuracy * 100)
            }, {
                label: "Error",
                instances: 100 -  Math.floor(accuracy * 100)
            }
            ], d3.select("#chart2"));
        }
    }

    function drawPie(data1, data2) {
        DonutChart.drawContent(data1, d3.select("#chart1"));
        DonutChart.drawContent(data2, d3.select("#chart2"));
    }

    function updatePie(data1, data2) {
        DonutChart.updateContent(data1, d3.select("#chart1"));
        DonutChart.updateContent(data2, d3.select("#chart2"));
        /*if (data2.length===1) {
            DonutChart.drawContent(data2, d3.select("#chart2"));
        } else {
        }*/
    }

    __initScene();

    function __initScene() {
        $(function() {
            var winWidth = $(window).width();
            var clz;
            if (winWidth<1280) {
                clz = "gs1024";
            } else if (winWidth<1920) {
                clz = "gs1280";
            } else {
                clz = "gs1920";
            }
            $('body').removeClass("gs1024 gs1280 gs1920").addClass(clz);
            layout();
        });
    }


    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }


    return  {
        init: init,
        update: update,
        showInClass: showInClass,
        showAllHomework: showAllHomework
    };
}());


$(function() {
    Accuracy.init(homework, inclass);
    //Accuracy.init(getHomeWork(15), inclass1);
});

