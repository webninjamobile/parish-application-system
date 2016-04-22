(function () {
  'use strict';

  angular
    .module('baptisms')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Baptisms',
      state: 'baptisms',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'baptisms', {
      title: 'List Baptisms',
      state: 'baptisms.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'baptisms', {
      title: 'Create Baptism',
      state: 'baptisms.create',
      roles: ['user']
    });
  }
})();
