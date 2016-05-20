(function () {
  'use strict';

  angular
    .module('deaths')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('deaths', {
        abstract: true,
        url: '/deaths',
        template: '<ui-view/>'
      })
      .state('deaths.list', {
        url: '',
        templateUrl: 'modules/deaths/client/views/list-deaths.client.view.html',
        controller: 'DeathsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Deaths List'
        }
      })
      .state('deaths.create', {
        url: '/create',
        templateUrl: 'modules/deaths/client/views/form-death.client.view.html',
        controller: 'DeathsController',
        controllerAs: 'vm',
        resolve: {
          deathResolve: newDeath
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Deaths Create'
        }
      })
      .state('deaths.edit', {
        url: '/:deathId/edit',
        templateUrl: 'modules/deaths/client/views/form-death.client.view.html',
        controller: 'DeathsController',
        controllerAs: 'vm',
        resolve: {
          deathResolve: getDeath
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Death {{ deathResolve.name }}'
        }
      })
      .state('deaths.view', {
        url: '/:deathId',
        templateUrl: 'modules/deaths/client/views/view-death.client.view.html',
        controller: 'DeathsController',
        controllerAs: 'vm',
        resolve: {
          deathResolve: getDeath
        },
        data: {
          pageTitle: 'Death {{ articleResolve.name }}'
        }
      })
      .state('deaths.print', {
        url: '/:deathId/preview',
        templateUrl: 'modules/deaths/client/views/view-death.client.view.html',
        controller: 'DeathsController',
        controllerAs: 'vm',
        resolve: {
          deathResolve: getDeath
        },
        data: {
          roles: ['guest'],
          pageTitle: 'Death {{ articleResolve.name }}'
        }
      });
  }

  getDeath.$inject = ['$stateParams', 'DeathsService'];

  function getDeath($stateParams, DeathsService) {
    return DeathsService.get({
      deathId: $stateParams.deathId
    }).$promise;
  }

  newDeath.$inject = ['DeathsService'];

  function newDeath(DeathsService) {
    return new DeathsService();
  }
})();
