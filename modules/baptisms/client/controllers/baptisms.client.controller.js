(function () {
  'use strict';

  // Baptisms controller
  angular
    .module('baptisms')
    .controller('BaptismsController', BaptismsController);

  BaptismsController.$inject = ['$scope', '$state', 'Authentication', 'baptismResolve', '$window'];

  function BaptismsController ($scope, $state, Authentication, baptism, $window) {
    var vm = this;

    vm.authentication = Authentication;
    vm.baptism = baptism;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Baptism
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.baptism.$remove($state.go('baptisms.list'));
      }
    }

    // Save Baptism
    function save(isValid) {
      // TODO: move create/update logic to service
      if (vm.baptism._id) {
        vm.baptism.$update(successCallback, errorCallback);
      } else {
        vm.baptism.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('baptisms.view', {
          baptismId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
