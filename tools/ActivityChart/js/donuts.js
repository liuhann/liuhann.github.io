/**
 * Created by liuhan on 2016/1/8.
 * A donut chart copied and rewrote
 */

var DonutChart = (function(){

    var cDim = {
        height: 250,
        width: 250,
        innerRadius: 50,
        outerRadius: 100,
        labelRadius: 120
    };

    var CHART_COLORS = {
        "Not Finished":"#573d7c",
        "Completed": "#ef6050",
        "Correct": "#e8bc27",
        "Error": "#02c897",
        "No Data": "#eeeeee"
    };

    function init (dim) {
        cDim = dim;
    };

    function getSize(svg) {
        canvas = svg.select("g");
        art = svg.select(".donuts");
        labels = svg.select(".labels");

        return art.selectAll("*").size();
    }

    function clearContent(svg) {
        canvas = svg.select("g");
        art = svg.select(".donuts");
        labels = svg.select(".labels");
        art.selectAll("*").remove();
        labels.selectAll("*").remove();
    }

    function animateContent(data, svg) {
        canvas = svg.select("g");
        art = svg.select(".donuts");
        labels = svg.select(".labels");

        if(art.selectAll("*").size()>0) {
            updateContent(data, svg);
        } else {
            drawContent(data, svg);
        }
    }

    function updateContent(data, svg) {
        canvas = svg.select("g");
        art = canvas.select(".donuts");
        labels = canvas.select(".labels");

        var ppaths = art.selectAll("path");
        if (ppaths.length>0 && ppaths[0].length!=data.length) {
            drawContent(data, svg);
            return;
        }

        jhw_pie = d3.layout.pie();
        jhw_pie.value(function (d, i) {
            // Tells the layout function what
            // property of our data object to
            // use as the value.
            return d.instances;
        }).sort(null);

        pied_arc = d3.svg.arc()
            .innerRadius(cDim.innerRadius)
            .outerRadius(cDim.outerRadius);

        art.selectAll(".wedge").data(jhw_pie(data), function(d) { return d.data.label;})
            .attr("d", pied_arc)
            .transition().duration(750).attrTween('d', function(finish) {
                //the change effect
                var i = d3.interpolate(this._current, finish);
                this._current = i(0);
                return function(d) { return pied_arc(i(d)); };
            });
        labels.selectAll(".label")
            .selectAll(".label-text").data(jhw_pie(data), function(d) { return  d.data.label; })
            .attr({
                x: function (d, i) {
                    centroid = pied_arc.centroid(d);
                    midAngle = Math.atan2(centroid[1], centroid[0]);
                    x = Math.cos(midAngle) * cDim.labelRadius;
                    sign = (x > 0) ? 1 : -1
                    labelX = x + (5 * sign)
                    return labelX;
                },
                y: function (d, i) {
                    centroid = pied_arc.centroid(d);
                    midAngle = Math.atan2(centroid[1], centroid[0]);
                    y = Math.sin(midAngle) * cDim.labelRadius;
                    return y;
                },
                'text-anchor': function (d, i) {
                    centroid = pied_arc.centroid(d);
                    midAngle = Math.atan2(centroid[1], centroid[0]);
                    x = Math.cos(midAngle) * cDim.labelRadius;
                    return (x > 0) ? "start" : "end";
                },
                'class': 'label-text'
            })
            .text(function (d) {
                return d.data.label + " " +( (d.data.label==="No Data")? "" : (d.value + '%'));
            });
    }


    function drawContent(data, svg) {
        canvas = svg.select("g");
        // This translate property moves the origin of the group's coordinate
        // space to the center of the SVG element, saving us translating every
        // coordinate individually.
        canvas.attr("transform", "translate(" + (cDim.width / 2) + "," + (cDim.width * 0.3) + ")");

        art = svg.select(".donuts");
        labels = svg.select(".labels");

        art.selectAll("*").remove();
        labels.selectAll("*").remove();

        // Create the pie layout function.
        // This function will add convenience
        // data to our existing data, like
        // the start angle and end angle
        // for each data element.
        jhw_pie = d3.layout.pie();
        jhw_pie.value(function (d, i) {
            // Tells the layout function what
            // property of our data object to
            // use as the value.
            return d.instances;
        }).sort(null);

        // Set the size of our SVG element
        svg.attr({
            height: cDim.height,
            width: cDim.width
        });

        pied_data = jhw_pie(data);

        // The pied_arc function we make here will calculate the path
        // information for each wedge based on the data set. This is
        // used in the "d" attribute.
        pied_arc = d3.svg.arc()
            .innerRadius(cDim.innerRadius)
            .outerRadius(cDim.outerRadius);

        // This is an ordinal scale that returns 10 predefined colors.
        // It is part of d3 core.
        pied_colors = d3.scale.category10();

        // Let's start drawing the arcs.
        enteringArcs = art.selectAll(".wedge").data(pied_data,  function(d) { return d.data.label; }).enter();

        enteringArcs.append("path")
            .attr("class", "wedge")
            .attr("d", pied_arc)
            .style("fill", function (d, i) {
                return CHART_COLORS[d.data.label];
            }).each(function(d) { this._current = d; })
            .transition().duration(750).attrTween('d', function(finish) {
                //the init effect
                var start = {
                    startAngle: 0,
                    endAngle: 0
                };
                var i = d3.interpolate(start, finish);
                return function(d) { return pied_arc(i(d)); };
            });

        enteringLabels = labels.selectAll(".label").data(pied_data, function(d) { return  d.data.label; }).enter();
        labelGroups = enteringLabels.append("g").attr("class", "label");


        // "When am I ever going to use this?" I said in
        // 10th grade trig.
        textLines = labelGroups.append("line").attr({
            x1: function (d, i) {
                return pied_arc.centroid(d)[0];
            },
            y1: function (d, i) {
                return pied_arc.centroid(d)[1];
            },
            x2: function (d, i) {
                centroid = pied_arc.centroid(d);
                midAngle = Math.atan2(centroid[1], centroid[0]);
                x = Math.cos(midAngle) * cDim.labelRadius;
                return x;
            },
            y2: function (d, i) {
                centroid = pied_arc.centroid(d);
                midAngle = Math.atan2(centroid[1], centroid[0]);
                y = Math.sin(midAngle) * cDim.labelRadius;
                return y;
            },
            'class': "label-line"
        });

        textLabels = labelGroups.append("text").attr({
            x: function (d, i) {
                centroid = pied_arc.centroid(d);
                midAngle = Math.atan2(centroid[1], centroid[0]);
                x = Math.cos(midAngle) * cDim.labelRadius;
                sign = (x > 0) ? 1 : -1
                labelX = x + (5 * sign)
                return labelX;
            },
            y: function (d, i) {
                centroid = pied_arc.centroid(d);
                midAngle = Math.atan2(centroid[1], centroid[0]);
                y = Math.sin(midAngle) * cDim.labelRadius;
                return y;
            },
            'text-anchor': function (d, i) {
                centroid = pied_arc.centroid(d);
                midAngle = Math.atan2(centroid[1], centroid[0]);
                x = Math.cos(midAngle) * cDim.labelRadius;
                return (x > 0) ? "start" : "end";
            },
            'class': 'label-text'
        }).text(function (d) {
            return d.data.label + " " +( (d.data.label==="No Data")? "" : (d.value + '%'));
        }).attr("stroke", function(d) {
            return CHART_COLORS[d.data.label];
        });

        alpha = 0.5;
        spacing = 12;

        function relax() {
            again = false;
            textLabels.each(function (d, i) {
                a = this;
                da = d3.select(a);
                y1 = da.attr("y");
                textLabels.each(function (d, j) {
                    b = this;
                    // a & b are the same element and don't collide.
                    if (a == b) return;
                    db = d3.select(b);
                    // a & b are on opposite sides of the chart and
                    // don't collide
                    if (da.attr("text-anchor") != db.attr("text-anchor")) return;
                    // Now let's calculate the distance between
                    // these elements.
                    y2 = db.attr("y");
                    deltaY = y1 - y2;

                    // Our spacing is greater than our specified spacing,
                    // so they don't collide.
                    if (Math.abs(deltaY) > spacing) return;

                    // If the labels collide, we'll push each
                    // of the two labels up and down a little bit.
                    again = true;
                    sign = deltaY > 0 ? 1 : -1;
                    adjust = sign * alpha;
                    da.attr("y",+y1 + adjust);
                    db.attr("y",+y2 - adjust);
                });
            });
            // Adjust our line leaders here
            // so that they follow the labels.
            if(again) {
                labelElements = textLabels[0];
                textLines.attr("y2",function(d,i) {
                    labelForLine = d3.select(labelElements[i]);
                    return labelForLine.attr("y");
                });
                //setTimeout(relax,20)
            }
        }

        relax();
    }

    function tweenPie(finish) {
        var start ;
        if(this._current) {
            start =  this._current;
        } else {
            start = {
                startAngle: 0,
                endAngle: 0
            };
        }
        var i = d3.interpolate(start, finish);
        return function(d) { return pied_arc(i(d)); };
    }


    return {
        init: init,
        getSize: getSize,
        animateContent: animateContent,
        drawContent: drawContent,
        updateContent: updateContent,
        clearContent: clearContent
    }


}());
