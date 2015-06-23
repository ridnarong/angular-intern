(function() {
  'use strict';

angular.module('myDirectives')
  .directive('myChartContainer', [function() {
      return {
        restrict: 'E',
        controller: "myChartContainer",
        controllerAs: "container",
        scope: {

        },
        link: function(scope, element, attrs) {

        },
        templateUrl: "/assets/ng/views/templates/myChartContainer.html"
      };
    }]);
})();
