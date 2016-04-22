(function () {
  'use strict';

  angular.module('core')
    .directive('textbox', textbox);

  textbox.$inject = ['$rootScope', '$timeout', '$interpolate', '$state'];

  function textbox($rootScope, $timeout, $interpolate, $state) {
    var directive = {
      retrict: 'E',
      scope: {
        model: '=data',
        names: '='
      },
      link: function (scope, element, attrs) {
        scope.name = attrs.name;
        scope.dateOptions = {
          formatYear: 'yy',
          showWeeks: false,
          appendToBody: true
        };
      },
      templateUrl: function (elem, attrs) {
        var type = attrs.type || 'textbox';
        return '/modules/core/client/directives/templates/' + type + '.template.html';
      }

    };

    return directive;

  }
}());
