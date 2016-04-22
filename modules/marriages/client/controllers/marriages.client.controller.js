(function () {
  'use strict';

  // Marriages controller
  angular
    .module('marriages')
    .controller('MarriagesController', MarriagesController);

  MarriagesController.$inject = ['$scope', '$state', 'Authentication', 'marriageResolve', '$window'];

  function MarriagesController ($scope, $state, Authentication, marriage, $window) {
    var vm = this;

    vm.authentication = Authentication;
    vm.marriage = marriage;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Marriage
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.marriage.$remove($state.go('marriages.list'));
      }
    }
    // Save Marriage
    function save(isValid) {
      // TODO: move create/update logic to service
      if (vm.marriage._id) {
        vm.marriage.$update(successCallback, errorCallback);
      } else {
        vm.marriage.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('marriages.view', {
          marriageId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
