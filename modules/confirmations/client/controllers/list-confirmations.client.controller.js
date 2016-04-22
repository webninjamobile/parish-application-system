(function () {
  'use strict';

  angular
    .module('confirmations')
    .controller('ConfirmationsListController', ConfirmationsListController);

  ConfirmationsListController.$inject = ['ConfirmationsService', '$window'];

  function ConfirmationsListController(ConfirmationsService, $window) {
    var vm = this;

    vm.confirmations = ConfirmationsService.query();
    vm.remove = remove;
    vm.search = search;

    function remove(data) {
      if ($window.confirm('Are you sure you want to delete?')) {
        ConfirmationsService.remove({ confirmationId: data._id }).$promise.then(function () {
          $window.location.href = '/confirmations';
        });
      }
    }

    function search() {
      ConfirmationsService.search({ key: vm.key }).$promise.then(function (result) {
        vm.confirmations = result;
      });
    }
  }
})();
