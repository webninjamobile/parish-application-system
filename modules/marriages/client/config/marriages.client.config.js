(function () {
  'use strict';

  angular
    .module('marriages')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Marriage',
      state: 'marriages.list',
      type: '',
      roles: ['*']
    });

  }
})();
