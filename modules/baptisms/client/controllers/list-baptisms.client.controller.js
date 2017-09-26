(function () {
  'use strict';

  angular
    .module('baptisms')
    .controller('BaptismsListController', BaptismsListController);

  BaptismsListController.$inject = ['BaptismsService', '$window'];

  function BaptismsListController(BaptismsService, $window) {
    var vm = this;

    vm.baptisms = BaptismsService.query();
    vm.remove = remove;
    vm.search = search;

    function remove(data) {
      if ($window.confirm('Are you sure you want to delete?')) {
        BaptismsService.remove({ baptismId: data._id }).$promise.then(function () {
          $window.location.href = '/baptisms';
        });
      }
    }

    function search() {
      BaptismsService.search({ key: vm.key }).$promise.then(function (result) {
        vm.baptisms = result;
      });
    }
  }
})();
