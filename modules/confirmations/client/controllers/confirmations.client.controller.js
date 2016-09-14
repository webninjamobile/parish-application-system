(function () {
  'use strict';

  // Confirmations controller
  angular
    .module('confirmations')
    .controller('ConfirmationsController', ConfirmationsController);

  ConfirmationsController.$inject = ['$scope', '$state', 'Authentication', 'confirmationResolve', '$window'];

  function ConfirmationsController ($scope, $state, Authentication, confirmation, $window) {
    var vm = this;

    vm.authentication = Authentication;
    vm.confirmation = confirmation;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Confirmation
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.confirmation.$remove($state.go('confirmations.list'));
      }
    }

    // Save Confirmation
    function save(isValid) {
      // TODO: move create/update logic to service
      if (vm.confirmation._id) {
        vm.confirmation.$update(successCallback, errorCallback);
      } else {
        vm.confirmation.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('confirmations.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
