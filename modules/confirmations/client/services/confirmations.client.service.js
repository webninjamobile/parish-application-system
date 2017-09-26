// Confirmations service used to communicate Confirmations REST endpoints
(function () {
  'use strict';

  angular
    .module('confirmations')
    .factory('ConfirmationsService', ConfirmationsService);

  ConfirmationsService.$inject = ['$resource'];

  function ConfirmationsService($resource) {
    return $resource('api/confirmations/:confirmationId', {
      confirmationId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      search: {
        url: '/api/confirmations/search',
        method: 'POST',
        isArray: true
      }
    });
  }
})();
