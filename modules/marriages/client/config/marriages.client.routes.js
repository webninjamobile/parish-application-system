(function () {
  'use strict';

  angular
    .module('marriages')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('marriages', {
        abstract: true,
        url: '/marriages',
        template: '<ui-view/>'
      })
      .state('marriages.list', {
        url: '',
        templateUrl: 'modules/marriages/client/views/list-marriages.client.view.html',
        controller: 'MarriagesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Marriages List'
        }
      })
      .state('marriages.create', {
        url: '/create',
        templateUrl: 'modules/marriages/client/views/form-marriage.client.view.html',
        controller: 'MarriagesController',
        controllerAs: 'vm',
        resolve: {
          marriageResolve: newMarriage
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Marriages Create'
        }
      })
      .state('marriages.edit', {
        url: '/:marriageId/edit',
        templateUrl: 'modules/marriages/client/views/form-marriage.client.view.html',
        controller: 'MarriagesController',
        controllerAs: 'vm',
        resolve: {
          marriageResolve: getMarriage
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Marriage {{ marriageResolve.name }}'
        }
      })
      .state('marriages.view', {
        url: '/:marriageId',
        templateUrl: 'modules/marriages/client/views/view-marriage.client.view.html',
        controller: 'MarriagesController',
        controllerAs: 'vm',
        resolve: {
          marriageResolve: getMarriage
        },
        data: {
          pageTitle: 'Marriage {{ articleResolve.name }}'
        }
      })
      .state('marriages.print', {
        url: '/:marriageId/preview',
        templateUrl: 'modules/marriages/client/views/view-marriage.client.view.html',
        controller: 'MarriagesController',
        controllerAs: 'vm',
        resolve: {
          marriageResolve: getMarriage
        },
        data: {
          roles: ['guest'],
          pageTitle: 'Marriage {{ articleResolve.name }}'
        }
      });
  }

  getMarriage.$inject = ['$stateParams', 'MarriagesService'];

  function getMarriage($stateParams, MarriagesService) {
    return MarriagesService.get({
      marriageId: $stateParams.marriageId
    }).$promise;
  }

  newMarriage.$inject = ['MarriagesService'];

  function newMarriage(MarriagesService) {
    return new MarriagesService();
  }
})();
