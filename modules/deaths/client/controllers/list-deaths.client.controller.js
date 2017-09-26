(function () {
  'use strict';

  angular
    .module('deaths')
    .controller('DeathsListController', DeathsListController);

  DeathsListController.$inject = ['DeathsService', '$window'];

  function DeathsListController(DeathsService, $window) {
    var vm = this;

    vm.deaths = DeathsService.query();
    vm.remove = remove;
    vm.search = search;

    function remove(data) {
      if ($window.confirm('Are you sure you want to delete?')) {
        DeathsService.remove({ deathId: data._id }).$promise.then(function () {
          $window.location.href = '/deaths';
        });
      }
    }

    function search() {
      DeathsService.search({ key: vm.key }).$promise.then(function (result) {
        vm.deaths = result;
      });
    }
  }
})();
