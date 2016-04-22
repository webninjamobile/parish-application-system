(function () {
  'use strict';

  angular
    .module('marriages')
    .controller('MarriagesListController', MarriagesListController);

  MarriagesListController.$inject = ['MarriagesService', '$window'];

  function MarriagesListController(MarriagesService, $window) {
    var vm = this;

    vm.marriages = MarriagesService.query();
    vm.remove = remove;
    vm.search = search;

    function remove(data) {
      if ($window.confirm('Are you sure you want to delete?')) {
        MarriagesService.remove({ marriageId: data._id }).$promise.then(function () {
          $window.location.href = '/marriages';
        });
      }
    }

    function search() {
      MarriagesService.search({ key: vm.key }).$promise.then(function (result) {
        vm.marriages = result;
      });
    }
  }
})();
