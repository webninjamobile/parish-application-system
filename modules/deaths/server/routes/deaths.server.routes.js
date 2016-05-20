'use strict';

/**
 * Module dependencies
 */
var deathsPolicy = require('../policies/deaths.server.policy'),
  deaths = require('../controllers/deaths.server.controller');

module.exports = function(app) {
  // Deaths Routes
  app.route('/api/deaths/search').all()
    .post(deaths.search);

  app.route('/api/deaths').all(deathsPolicy.isAllowed)
    .get(deaths.list)
    .post(deaths.create);

  app.route('/api/deaths/:deathId').all(deathsPolicy.isAllowed)
    .get(deaths.read)
    .put(deaths.update)
    .delete(deaths.delete);

  // Finish by binding the Death middleware
  app.param('deathId', deaths.deathByID);
};
