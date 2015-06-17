(function() {
  'use strict';

angular.module('myDirectives')
  .directive('myLineChart', ['$window', 'Point', 'D3', function($window, Point, D3) {
    return {
      restrict: 'EA',
      scope: {
        sensorIds: '=',
        startDate: '=',
        endDate: '=',
        watch: '='
      },
      link: function(scope, element, attrs) {
        D3.d3().then(function(d3) {
          var renderTimeout;
          var margin = {top: 20, right: 60, bottom: 30, left: 40};

          // Browser onresize event
          window.onresize = function() {
            scope.$apply();
          };

          element.on("mousemove", function(event) {
            if(event.target.nodeName == "svg") {
              var svgXOffset = margin.left + event.target.parentNode.offsetLeft,
              svgYOfferset = margin.top + event.target.parentNode.offsetTop;
              var index = d3.bisect(scope.data.rows.map(function(d) {return d[0]}), scope.x.invert(event.clientX - svgXOffset));
              if(typeof scope.data.rows[index] != "undefined") {
                var currentData = scope.data.rows[index];
                scope.svgLegend.select("text").text(currentData[0].toLocaleTimeString()+" "+currentData[1]);
                scope.svgLegend.select("circle")
                  .attr("class", "")
                  .attr("cx", scope.x(currentData[0]))
                  .attr("cy", scope.y(currentData[1]))
                  .attr("r", 2.5);
              }
            }
          });

          element.on("mouseout", function(event) {
            scope.svgLegend.select("text").text("");
            scope.svgLegend.select("circle").attr("class","hide");
          })

          // Watch for resize event
          scope.$watch(function() {
            return angular.element($window)[0].innerWidth;
          }, function() {
            scope.render(scope.sensorIds, scope.startDate, scope.endDate);
          });

          scope.$watch("watch", function(nv,ov) {
            if (nv!=ov) {
              scope.render(scope.sensorIds, scope.startDate, scope.endDate);
            }
          });

          scope.render = function(sensor_ids, start_date, end_date) {
            var curret_date = new Date();
            if (typeof start_date != "string") {
              start_date = (new Date(curret_date.getTime() - 86400000)).toISOString();
            };
            if (typeof end_date != "string") {
              end_date = curret_date.toISOString();
            };
            var ids = [];
            sensor_ids.forEach(function(s) { ids.push(s["$oid"])});
            scope.data = Point.query({sensors: ids, start_date: start_date, end_date: end_date}, function() {
              // remove all previous items before render
               d3.select(element[0]).selectAll('*').remove();
               var height = 157 - margin.top - margin.bottom;
               scope.svg = d3.select(element[0])
              .append('svg')
                .style('width', '100%')
                .style('height', height)
              .append("g")
                 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
              // If we don't pass any data, return out of the element
              if (!scope.data) return;
              var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S.%L+07:00").parse;  
              var color = d3.scale.category10();    
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
              // setup variables
              var width = d3.select(element[0]).node().offsetWidth - margin.left - margin.right;
              scope.x = d3.time.scale().range([0, width]);
              scope.y = d3.scale.linear().range([height, 0]);
              var xAxis = d3.svg.axis().scale(scope.x).orient("bottom"),
                  yAxis = d3.svg.axis().scale(scope.y).orient("left"),
                  line = d3.svg.line()
                    .x(function(d) { return scope.x(d[0]); })
                    .y(function(d) { return scope.y(d[1]); });
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
                .attr("dy", ".41em")
                .style("text-anchor", "end")
                .text(scope.data.cols[1].label);

              scope.svg.selectAll(".datum")
                .data(scope.categories)
                  .enter()
                    .append("g")
                      .attr("class", "datum")
                    .append("path")
                      .attr('id', function(d) { return d.id; })
                      .attr('class','line')
                      .style("stroke", function(d) { return color(d.id) })
                      .attr('d', function(d) { return line(d.values)});
              
              scope.svgLegend = scope.svg.selectAll(".legend").data(scope.categories)
                .enter().append("g").attr("class", "legend");
              scope.svgLegend.append("text")
                .style("fill", function(d) { return color(d.id) })
                .attr("x", width-50);
              scope.svgLegend.append("circle")
                .attr("fill", function(d) { return color(d.id) })
                .attr("class","hide");
            });
          }
        });
      }};
  }])
})();
