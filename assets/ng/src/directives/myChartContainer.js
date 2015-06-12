(function() {
  'use strict';

angular.module('myDirectives')
  .directive('myChartContainer', [function() {
      return {
        restrict: 'E',
        controller: "myChartContainer",
        controllerAs: "chart",
        scope: {

        },
        link: function(scope, element, attrs) {

        },
        templateUrl: "/ng/views/templates/myChartContainer.html"
      };
    }]);
})();
