var chartEditor = null;
;(function($){
	$(function() {
        chartEditor = ace.edit("chartEditor");
        chartEditor.setOptions({
            maxLines: Infinity
        });
        chartEditor.getSession().setMode("ace/mode/json");
        chartEditor.setTheme("ace/theme/chrome");

        var series =  {
		    "chart": {
		        "type": "column"
		    },
		    "title": {
		        "text": "Number of marriages and divorces in the USA, 1970-2000",
		        "style":{
		          "color": "#333",
		          "fontSize": "30px"
		        }
		    },
		    "subtitle": {
		        "text": ""
		    },
		    "xAxis": {
		        "categories": [
		            "1970",
		            "1980",
		            "1990",
		            "2000"
		        ],
		        "crosshair": true,
		        "labels":{
		          "style": {
		    	   "color": "#333",
		    	    "fontWeight": "normal", 
		                "fontSize":"20" 
		            }
		       }
		    },
		    "yAxis": {
		        "min": 0,
		        "title": {
		            "text": "millions",
		            "style":{
		              "color": "#333",
		              "fontSize": "26px"
		            }
		        },
		        "labels":{
		          "style": {
		    	   "color": "#333",
		    	    "fontWeight": "normal", 
		                "fontSize":"20" 
		            }
		       },
		       "tickPositions": [0,0.5, 1,1.5,2, 2.5,3]
		    },
		    "tooltip": {
		        "headerFormat": "<span style=\"font-size:40px\">{point.key}</span><table>",
		        "pointFormat": "<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td><td style=\"padding:0\"><b>{point.y:.1f} mm</b></td></tr>",
		        "footerFormat": "</table>",
		        "shared": true,
		        "useHTML": true
		    },
		    "plotOptions": {
		        "column": {
		            "pointPadding": 0,
		            "borderWidth": 0
		        }
		    },
		    "series": [
		        {
		            "name": "Marriages",
		            "data": [
		                2.5,
		                2.5,
		                2.3,
		                2
		            ]
		        },
		        {
		            "name": "Divorces",
		            "data": [
		                1,
		                1.4,
		                1.1,
		                1
		            ]
		        }
		    ]
		};
		chartEditor.setValue(JSON.stringify(series, null, 4));
        $.fn.createChart = function (options) {
        	var opts = $.extend({}, $.fn.createChart.defaults.data, options);   

        	return this.highcharts(opts);
        };
        $.fn.createChart.defaults = {
        	data: series
        };
        $(".a_create_chart_1").click(function() {   
            var _json = $.parseJSON(chartEditor.getValue()); 	 
        	 //createChart(_json);
        	 $('#container').createChart(_json);
        	 $(".highcharts-container svg").css("z-index",'-9');
        	 
        	 $(".highcharts-button").css("z-index",'1');
        });      
       
		$('#container').createChart();

		$(".a_create_chart_2").on("click", function () {
			$("#chartEditor").toggle("hide");
		})
    });
})(jQuery);