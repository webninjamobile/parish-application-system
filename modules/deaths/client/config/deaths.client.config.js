(function () {
  'use strict';

  angular
    .module('deaths')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Deaths',
      state: 'deaths.list',
      type: '',
      roles: ['*']
    });

  }
})();
