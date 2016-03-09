/**
 * Created by 刘涵 on 2016/1/16.
 */


$(function () {

    $("td").each(function() {
       $(this).css("-webkit-animation-duration", 300 + 10*$(this).index() + "ms");
    });

    $("#userHead").click(function() {
       location.href = "index.html?back=1";
    });

    var params = getUrlVars();

    if (params.head) {
        $("#userHead").attr("src", params.head);
    }

    if (params.name) {
        $("#userName").html(params.name);
    }

   var op1 = {
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: ''
        },
        subtitle: {

        },
        xAxis: [{
            categories: ['LISTENING', 'READING', 'WRITING', 'SPEAKING', 'VOCAB', 'GRAMMAR'],
            crosshair: true
        }],
            yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'SCORE',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        max: 7

    }, { // Secondary yAxis
        title: {
            text: 'POSITION',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value} %',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        min: 0,
        max: 100,
        opposite: true
    }],
        tooltip: {
        shared: true
    },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Score',
            type: 'column',
            data: [{
                y: getRandom(5,7,0.5), color:'#00B3BF'
            },{
                y: getRandom(5,7,0.5), color:'#0D6571'
            },{
                y: getRandom(5,7,0.5), color:'#F0BE39'
            },{
                y: getRandom(5,7,0.5), color:'#E57208'
            },{
                y: getRandom(5,7,0.5), color:'#94AFD8'
            },{
                y: getRandom(5,7,0.5), color:'#C2E9C9'
            }],
            tooltip: {
                valueSuffix: ''
            }
        }, {
            name: 'Percent',
            type: 'spline',
            yAxis: 1,
            data: [getRandom(50,100,5),getRandom(50,100,5),getRandom(50,100,5),getRandom(50,100,5),getRandom(50,100,5),getRandom(50,100,5)],
            tooltip: {
                valueSuffix: '%'
            }
        }]
    };

    function getRandom(from, to, step) {

        var length = Math.floor((to-from)/step);

        return from + step * Math.floor(Math.random() * length);
    }

    $('#capbility').highcharts(op1);


    $('#trend').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ['2015-11-15', '2015-10-15', '2015-11-15', '2015-12-15', '..', '..', '..'],
            title: {
                enabled: false
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            itemStyle: {
                width: 90 // or whatever
            },
        },
        yAxis: {

        },
        tooltip: {
            shared: true,
            valueSuffix: ' '
        },
        plotOptions: {
            series: {
                connectNulls: true
            },
            zones: [{
                value: 5.5,
                dashStyle: 'Solid'
            },
                {
                    value: 6.5,
                    dashStyle: 'LongDash'
                } ]
        },


        series: [{
            name: 'LISTENING',
            data: [3, 4, 4.5, 5, null, null, 5.5],
            fillColor: {
                linearGradient: { x1: 0, x2: 1 },
                stops: [
                    [0, 'rgba(176, 58, 104, .6)'],
                    [1, 'rgba(176, 58, 104, 0)']
                ]
            },
            color:"#00B3BF",
            zones: [{
                value: 5,
                dashStyle: 'Solid'
            },
                {
                    value: 5.5,
                    dashStyle: 'LongDash'
                } ]
        }, {
            name: 'READING',
            data: [5, 4, 5.5, 6, null, null, 7],
            fillColor: {
                linearGradient: { x1: 0, x2: 1 },
                stops: [
                    [0, 'rgba(176, 58, 104, .6)'],
                    [1, 'rgba(176, 58, 104, 0)']
                ]
            },
            color: "#0D6571",
            zones: [{
                value: 6,
                dashStyle: 'Solid'
            },
                {
                    value: 7,
                    dashStyle: 'LongDash'
                } ]
        }, {
            name: 'WRITING',
            fillColor: {
                linearGradient: { x1: 0, x2: 1 },
                stops: [
                    [0, 'rgba(176, 58, 104, .6)'],
                    [1, 'rgba(176, 58, 104, 0)']
                ]
            },
            data: [4.5, 5, 5.5, 5.5, null, null, 6.5],
            //fillColor: "rgba(176, 58, 104, .3)",
            zones: [{
                value: 5.5,
                dashStyle: 'Solid'
            },
                {
                    value: 6.5,
                    dashStyle: 'LongDash'
                } ]
        }, {
            name: 'SPEAKING',
            color: "#E57208",
            data: [5, 4.5, 5.5, 6, null, null, 6.5],

            zones: [{
                value: 6,
                dashStyle: 'Solid'
            },
                {
                    value: 6.5,
                    dashStyle: 'LongDash'
                } ],

            fillColor: {
                linearGradient: { x1: 0, x2: 1 },
                stops: [
                    [0, 'rgba(176, 58, 104, .6)'],
                    [1, 'rgba(176, 58, 104, 0)']
                ]
            }
        }]
    });


    function getUrlVars()
    {
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



});
