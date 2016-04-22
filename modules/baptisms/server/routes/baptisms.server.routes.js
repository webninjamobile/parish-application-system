'use strict';

/**
 * Module dependencies
 */
var baptismsPolicy = require('../policies/baptisms.server.policy'),
  baptisms = require('../controllers/baptisms.server.controller');

module.exports = function(app) {
  // Baptisms Routes
  app.route('/api/baptisms/search').all()
    .post(baptisms.search);

  app.route('/api/baptisms').all(baptismsPolicy.isAllowed)
    .get(baptisms.list)
    .post(baptisms.create);

  app.route('/api/baptisms/:baptismId').all(baptismsPolicy.isAllowed)
    .get(baptisms.read)
    .put(baptisms.update)
    .delete(baptisms.delete);

  // Finish by binding the Baptism middleware
  app.param('baptismId', baptisms.baptismByID);
};
