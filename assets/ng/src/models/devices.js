(function() {
  'use strict';

  angular.module('myModels')
    .factory('Device', ['$resource',
      function ($resource){
        return $resource('http://localhost:8000/api/v1/devices.json', {}, {
          query: {method:'GET', isArray:true}
        });
          
          
    }]);

})();