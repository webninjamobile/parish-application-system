'use strict';

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/:type/:id/preview').get(core.renderPrintPreview);
  app.route('/:type/:id/print').get(core.renderPrint);

  app.route('/*').get(core.renderIndex);
};
