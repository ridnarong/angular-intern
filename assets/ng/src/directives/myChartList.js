(function() {
  'use strict';

angular.module('myDirectives')
  .directive('myChartList', [function() {
      return {
        restrict: 'E',
        scope: {
        },
        link: function(scope, element, attrs) {

        },
        templateUrl: "/ng/views/templates/myChartList.html"
      };
    }]);
})();
