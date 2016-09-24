(function () {
  'use strict';

  // Marriages controller
  angular
    .module('marriages')
    .controller('MarriagesController', MarriagesController);

  MarriagesController.$inject = ['$scope', '$state', 'Authentication', 'marriageResolve', '$window'];

  function MarriagesController($scope, $state, Authentication, marriage, $window) {
    var vm = this;

    vm.authentication = Authentication;
    vm.marriage = marriage;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.age = age;
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
        $state.go('marriages.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    function isLeapYear(year) {
      var d = new Date(year, 1, 28);
      d.setDate(d.getDate() + 1);
      return d.getMonth() === 1;
    }

    function age(dateObj,type) {

      var bday = dateObj.parties[type].birthday;
      var d = new Date(bday);
      var mDate = dateObj.marriageDate;
      var now = new Date(mDate);
      var years = now.getFullYear() - d.getFullYear();
      d.setFullYear(d.getFullYear() + years);
      if (d > now) {
        years--;
        d.setFullYear(d.getFullYear() - 1);
      }
      var days = (now.getTime() - d.getTime()) / (3600 * 24 * 1000);
      return Math.floor(years + days / (isLeapYear(now.getFullYear()) ? 366 : 365));
    }
  }
})();
