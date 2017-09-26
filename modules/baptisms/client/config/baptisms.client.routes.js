(function () {
  'use strict';

  angular
    .module('baptisms')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('baptisms', {
        abstract: true,
        url: '/baptisms',
        template: '<ui-view/>'
      })
      .state('baptisms.list', {
        url: '',
        templateUrl: 'modules/baptisms/client/views/list-baptisms.client.view.html',
        controller: 'BaptismsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Baptisms List'
        }
      })
      .state('baptisms.create', {
        url: '/create',
        templateUrl: 'modules/baptisms/client/views/form-baptism.client.view.html',
        controller: 'BaptismsController',
        controllerAs: 'vm',
        resolve: {
          baptismResolve: newBaptism
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Baptisms Create'
        }
      })
      .state('baptisms.edit', {
        url: '/:baptismId/edit',
        templateUrl: 'modules/baptisms/client/views/form-baptism.client.view.html',
        controller: 'BaptismsController',
        controllerAs: 'vm',
        resolve: {
          baptismResolve: getBaptism
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Baptism {{ baptismResolve.name }}'
        }
      })
      .state('baptisms.view', {
        url: '/:baptismId',
        templateUrl: 'modules/baptisms/client/views/view-baptism.client.view.html',
        controller: 'BaptismsController',
        controllerAs: 'vm',
        resolve: {
          baptismResolve: getBaptism
        },
        data: {
          pageTitle: 'Baptism {{ articleResolve.name }}'
        }
      })
      .state('baptisms.print', {
        url: '/:baptismId/preview',
        templateUrl: 'modules/baptisms/client/views/view-baptism.client.view.html',
        controller: 'BaptismsController',
        controllerAs: 'vm',
        resolve: {
          baptismResolve: getBaptism
        },
        data: {
          roles: ['guest'],
          pageTitle: 'Baptism {{ articleResolve.name }}'
        }
      });
  }

  getBaptism.$inject = ['$stateParams', 'BaptismsService'];

  function getBaptism($stateParams, BaptismsService) {
    return BaptismsService.get({
      baptismId: $stateParams.baptismId
    }).$promise;
  }

  newBaptism.$inject = ['BaptismsService'];

  function newBaptism(BaptismsService) {
    return new BaptismsService();
  }
})();
