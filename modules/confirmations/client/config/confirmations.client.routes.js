(function () {
  'use strict';

  angular
    .module('confirmations')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('confirmations', {
        abstract: true,
        url: '/confirmations',
        template: '<ui-view/>'
      })
      .state('confirmations.list', {
        url: '',
        templateUrl: 'modules/confirmations/client/views/list-confirmations.client.view.html',
        controller: 'ConfirmationsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Confirmations List'
        }
      })
      .state('confirmations.create', {
        url: '/create',
        templateUrl: 'modules/confirmations/client/views/form-confirmation.client.view.html',
        controller: 'ConfirmationsController',
        controllerAs: 'vm',
        resolve: {
          confirmationResolve: newConfirmation
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Confirmations Create'
        }
      })
      .state('confirmations.edit', {
        url: '/:confirmationId/edit',
        templateUrl: 'modules/confirmations/client/views/form-confirmation.client.view.html',
        controller: 'ConfirmationsController',
        controllerAs: 'vm',
        resolve: {
          confirmationResolve: getConfirmation
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Confirmation {{ confirmationResolve.name }}'
        }
      })
      .state('confirmations.view', {
        url: '/:confirmationId',
        templateUrl: 'modules/confirmations/client/views/view-confirmation.client.view.html',
        controller: 'ConfirmationsController',
        controllerAs: 'vm',
        resolve: {
          confirmationResolve: getConfirmation
        },
        data: {
          pageTitle: 'Confirmation {{ articleResolve.name }}'
        }
      })
      .state('confirmations.print', {
        url: '/:confirmationId/preview',
        templateUrl: 'modules/confirmations/client/views/view-confirmation.client.view.html',
        controller: 'ConfirmationsController',
        controllerAs: 'vm',
        resolve: {
          confirmationResolve: getConfirmation
        },
        data: {
          roles: ['guest'],
          pageTitle: 'Confirmation {{ articleResolve.name }}'
        }
      });
  }

  getConfirmation.$inject = ['$stateParams', 'ConfirmationsService'];

  function getConfirmation($stateParams, ConfirmationsService) {
    return ConfirmationsService.get({
      confirmationId: $stateParams.confirmationId
    }).$promise;
  }

  newConfirmation.$inject = ['ConfirmationsService'];

  function newConfirmation(ConfirmationsService) {
    return new ConfirmationsService();
  }
})();
