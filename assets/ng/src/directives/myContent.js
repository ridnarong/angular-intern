(function() {
  'use strict';

angular.module('myDirectives')
  .directive('myContent', [function() {
      return {
        restrict: 'E',
        controller: "myDataContainer",
        controllerAs: "data",
        scope: {
        },
        link: function(scope, element, attrs) {
            //scope.$apply();
        },
          templateUrl: "assets/ng/views/templates/myContent.html"
      };
    }]);
})();
