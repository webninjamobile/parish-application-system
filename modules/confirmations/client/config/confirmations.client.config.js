(function () {
  'use strict';

  angular
    .module('confirmations')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Confirmation',
      state: 'confirmations.list',
      type: '',
      roles: ['*']
    });

  }
})();
