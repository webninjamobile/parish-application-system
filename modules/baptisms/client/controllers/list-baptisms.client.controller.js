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

    function remove(data) {
      if ($window.confirm('Are you sure you want to delete?')) {
        BaptismsService.remove({baptismId: data._id}).$promise.then(function () {
          $window.location.href = '/baptisms';
        });
      }
    }
  }
})();
