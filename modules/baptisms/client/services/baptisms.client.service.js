// Baptisms service used to communicate Baptisms REST endpoints
(function () {
  'use strict';

  angular
    .module('baptisms')
    .factory('BaptismsService', BaptismsService);

  BaptismsService.$inject = ['$resource'];

  function BaptismsService($resource) {
    return $resource('api/baptisms/:baptismId', {
      baptismId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      search: {
        url: '/api/baptisms/search',
        method: 'POST',
        isArray: true
      }
    });
  }
})();
