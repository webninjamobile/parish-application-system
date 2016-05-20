// Deaths service used to communicate Deaths REST endpoints
(function () {
  'use strict';

  angular
    .module('deaths')
    .factory('DeathsService', DeathsService);

  DeathsService.$inject = ['$resource'];

  function DeathsService($resource) {
    return $resource('api/deaths/:deathId', {
      deathId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      search: {
        url: '/api/deaths/search',
        method: 'POST',
        isArray: true
      }
    });
  }
})();
