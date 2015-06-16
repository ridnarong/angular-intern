(function() {
  'use strict';

  angular.module('myModels')
    .factory('Device', ['$resource',
<<<<<<< HEAD
      function ($resource){
        return $resource('http://localhost/angular-intern/api/v1/devices.json', {}, {
          query: {method:'GET', isArray:true}
        });
          
          
    }]
            
            );
=======
      function($resource){
        return $resource('/api/v1/devices/:id.json', {}, {
          query: {method:'GET', isArray:true}
        });
    }]);
>>>>>>> 8be8a970d2353b129261642b23d442d6df9af1b8

})();