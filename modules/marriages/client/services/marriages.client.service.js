// Marriages service used to communicate Marriages REST endpoints
(function () {
  'use strict';

  angular
    .module('marriages')
    .factory('MarriagesService', MarriagesService);

  MarriagesService.$inject = ['$resource'];

  function MarriagesService($resource) {
    return $resource('api/marriages/:marriageId', {
      marriageId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      search: {
        url: '/api/marriages/search',
        method: 'POST',
        isArray: true
      }
    });
  }
})();
