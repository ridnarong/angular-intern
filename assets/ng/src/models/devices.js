(function() {
  'use strict';

  angular.module('myModels')
    .factory('Device', ['$resource',
      function($resource){
        return $resource('/api/v1/devices/:id.json', {}, {
          query: {method:'GET', isArray:true}
        });
    }]);

})();