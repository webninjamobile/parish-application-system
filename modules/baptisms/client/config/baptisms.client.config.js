(function () {
  'use strict';

  angular
    .module('baptisms')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Baptismal',
      state: 'baptisms.list',
      type: '',
      roles: ['admin']
    });

  }
})();
