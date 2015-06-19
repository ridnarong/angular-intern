(function() {
  'use strict';

  angular.module('myModels')
    .factory('Point', ['$resource',
      function($resource){
        return $resource('http://localhost/angular4/api/v1/q.json', {}, {
          query: {method:'POST'}
        });
    }]);

})();