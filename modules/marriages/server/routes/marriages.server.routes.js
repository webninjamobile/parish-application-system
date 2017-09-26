'use strict';

/**
 * Module dependencies
 */
var marriagesPolicy = require('../policies/marriages.server.policy'),
  marriages = require('../controllers/marriages.server.controller');

module.exports = function(app) {
  // Marriages Routes
  app.route('/api/marriages/search').all()
    .post(marriages.search);

  app.route('/api/marriages').all(marriagesPolicy.isAllowed)
    .get(marriages.list)
    .post(marriages.create);

  app.route('/api/marriages/:marriageId').all(marriagesPolicy.isAllowed)
    .get(marriages.read)
    .put(marriages.update)
    .delete(marriages.delete);

  // Finish by binding the Marriage middleware
  app.param('marriageId', marriages.marriageByID);
};
