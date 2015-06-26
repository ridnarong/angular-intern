(function() {
  'use strict';

angular.module('myDirectives')
  .directive('myChart', ['$window', 'Point', 'D3', function($window, Point, D3) {
      return {
        restrict: 'EA',
        scope: {
        },
        link: function(scope, element, attrs) {
          //scope.data = Point.query();
            //console.log(scope.data)
            D3.d3().then(function(d3) {

                var margin = {top: 20, right: 150, bottom: 30, left: 50},
                    width = 960 - margin.left - margin.right,
                    height = 500 - margin.top - margin.bottom;
                var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S.%L+07:00").parse,
                    bisectDate = d3.bisector(function(d) { return d[0]; }).left;
                var color = d3.scale.category10();
                scope.x = d3.time.scale().range([0, width]);
                scope.y = d3.scale.linear().range([height, 0]);

                var xAxis = d3.svg.axis().scale(scope.x).orient("bottom");
                var yAxis = d3.svg.axis().scale(scope.y).orient("left");
                var line = d3.svg.line()
                    .interpolate("basis")
                        .x(function(d) { return scope.x(d[0]); })
                        .y(function(d) { return scope.y(d[1]); });


                scope.svg = d3.select(element[0])
                    .append('svg')
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                scope.data = Point.query(function() {
                    color.domain(scope.data.cols.slice(1).map(function(d) { d.id}));

                    scope.data.rows.forEach(function(d) {
                        d[0] = parseDate(d[0]);
                    });

                    scope.categories = [];
                    scope.data.cols.slice(1).forEach(function(v,i) {
                        scope.categories.push({
                            label: v.label,
                            id: v.id,
                            index: i,
                            values: scope.data.rows.map(function(d) { return [d[0], d[i+1]]})
                        });
                    });

                    scope.x.domain(d3.extent(scope.data.rows, function(d) { return d[0]; }));
                    scope.y.domain([
                        d3.min(scope.categories, function(c) { return d3.min(c.values, function(v) { return v[1]; }); }),
                        d3.max(scope.categories, function(c) { return d3.max(c.values, function(v) { return v[1]; }); })]);

                    scope.svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis);

                    scope.svg.append("g")
                        .attr("class", "y axis")
                        .call(yAxis)
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end")
                        .text("Temperature (F)");

                    scope.city = scope.svg.selectAll(".city")
                        .data(scope.categories)
                        .enter().append("g")
                        .attr("class", "city");

                    // A line animation function (using interpolation)

                    function animateLine() {
                        var l = this.getTotalLength();
                        var i = d3.interpolateString("0," + l, l + "," + l);
                        return function(t) { return i(t); };
                    };

                    scope.city.append("path")
                        .attr("class", "line")
                        .attr("d", function(d) { return line(d.values); })
                        .style("stroke", function(d) { return color(d.id);})
                        .attr("stroke-dasharray", function() { return "0," + this.getTotalLength(); })
                        .transition()
                        .delay(function(d, i) { return i * 1000; }) //delay for each line
                        .duration(1000)
                        .ease("linear")
                        .attrTween("stroke-dasharray", animateLine)
                        .attr("display", 1);



                    //console.log(color(scope.categories[1].id));
                    scope.city.append("text")
                        .datum(function(d) { return {name: d.label, value: d.values[d.values.length - 1]}; })
                        .attr("transform", function(d) { return "translate(" + scope.x(d.value[0]) + "," + scope.y(d.value[1]) + ")"; })
                        .attr("x", 3)
                        .attr("dy", ".35em")
                        .text(function(d) { return d.name; });

                    console.log(scope.categories);
                    console.log(scope.data);
                    var columnNames = d3.keys( scope.data.rows[0] ) //grab the key values from your first data row
                        //these are the same as your column names
                        .slice(1); //remove the first column name (`date`);

                    console.log(columnNames);

                    scope.focus = scope.city.selectAll("g")
                        .data(columnNames)
                        .enter().append("g") //create one <g> for each columnName
                        .attr("class", "focus")
                        .style("display", "none");

                    scope.focus.append("circle") //add a circle to each
                        .attr("r", 4.5)
                        .attr('stroke', function (d,i) {
                            d = scope.categories[i];
                            return color(d.id);
                        });

                    scope.focus.append("text")  //add a text field to each
                        .attr("x", 9)
                        .attr("dy", ".35em");

                    scope.city.append("rect")
                        .attr("class", "overlay")
                        .attr("width", width)
                        .attr("height", height)
                        .on("mouseover", function() { scope.focus.style("display", null); })
                        .on("mouseout", function() { scope.focus.style("display", "none"); })
                        .on("mousemove", mousemove);

                    function mousemove() {

                        var x0 = scope.x.invert(d3.mouse(this)[0]),
                            i = bisectDate(scope.data.rows, x0, 1);
                        var d0 = scope.data.rows[i - 1],
                            d1 = scope.data.rows[i],
                            d = x0 - d0[0] > d1[0] - x0 ? d1 : d0;
                        scope.focus.attr("transform", function(columnName){
                            return "translate(" + scope.x( d[0] ) + "," + scope.y( d[ columnName ] ) + ")";
                        });
                        scope.focus.select("text").text(function(columnName){
                            //because you didn't explictly set any data on the <text>
                            //elements, each one inherits the data from the focus <g>

                            return d[ columnName ];
                        });
                    }


                });



            });
        }
      };
    }]);
})();
