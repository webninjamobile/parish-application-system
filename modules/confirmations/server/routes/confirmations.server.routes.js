'use strict';

/**
 * Module dependencies
 */
var confirmationsPolicy = require('../policies/confirmations.server.policy'),
  confirmations = require('../controllers/confirmations.server.controller');

module.exports = function(app) {
  // Confirmations Routes
  app.route('/api/confirmations/search').all()
    .post(confirmations.search);

  app.route('/api/confirmations').all(confirmationsPolicy.isAllowed)
    .get(confirmations.list)
    .post(confirmations.create);

  app.route('/api/confirmations/:confirmationId').all(confirmationsPolicy.isAllowed)
    .get(confirmations.read)
    .put(confirmations.update)
    .delete(confirmations.delete);

  // Finish by binding the Confirmation middleware
  app.param('confirmationId', confirmations.confirmationByID);
};
