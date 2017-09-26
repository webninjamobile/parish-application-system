(function () {
  'use strict';

  // Deaths controller
  angular
    .module('deaths')
    .controller('DeathsController', DeathsController);

  DeathsController.$inject = ['$scope', '$state', 'Authentication', 'deathResolve', '$window'];

  function DeathsController ($scope, $state, Authentication, death, $window) {
    var vm = this;

    vm.authentication = Authentication;
    vm.death = death;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Death
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.death.$remove($state.go('deaths.list'));
      }
    }

    // Save Death
    function save(isValid) {
      // TODO: move create/update logic to service
      if (vm.death._id) {
        vm.death.$update(successCallback, errorCallback);
      } else {
        vm.death.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('deaths.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
