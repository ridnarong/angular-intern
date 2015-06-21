(function() {
  'use strict';

angular.module('myDirectives')
  .directive('mySensorList', [function() {
      return {
        restrict: 'E',
        controller: 'myDataContainer',
        controllerAs: "data",
        scope: {
        },
        link: function(scope, element, attrs) {
           // myDataContainer.loadDevice();
            
        },
          templateUrl: "assets/ng/views/templates/mySensorList.html"
      };
    }]);
})();
