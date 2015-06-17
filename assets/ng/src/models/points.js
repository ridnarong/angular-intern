(function() {
  'use strict';

  angular.module('myModels')
    .factory('Point', ['$resource',
      function($resource){
        return $resource('/api/v1/static/q.json', {}, {
          query: {method:'POST'}
        });
    }]);

})();