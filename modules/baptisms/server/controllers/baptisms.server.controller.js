'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Baptism = mongoose.model('Baptism'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Baptism
 */
exports.create = function (req, res) {
  var baptism = new Baptism(req.body);
  baptism.user = req.user;

  baptism.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(baptism);
    }
  });
};

/**
 * Show the current Baptism
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var baptism = req.baptism ? req.baptism.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  baptism.isCurrentUserOwner = req.user && baptism.user && baptism.user._id.toString() === req.user._id.toString();

  res.jsonp(baptism);
};

/**
 * Update a Baptism
 */
exports.update = function (req, res) {
  var baptism = req.baptism;

  baptism = _.extend(baptism, req.body);

  baptism.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(baptism);
    }
  });
};

/**
 * Delete an Baptism
 */
exports.delete = function (req, res) {
  var baptism = req.baptism;

  baptism.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(baptism);
    }
  });
};

/**
 * List of Baptisms
 */
exports.list = function (req, res) {
  Baptism.find().sort('-created').populate('user', 'displayName').limit(50).exec(function (err, baptisms) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(baptisms);
    }
  });
};

/**
 * List of Baptisms
 */
exports.search = function (req, res) {
  var key = req.body.key || '';

  var regex = { $regex: new RegExp(key, 'i') };

  Baptism.find({
    $or: [
      { 'child.firstName': regex },
      { 'child.middleName': regex },
      { 'child.lastName': regex }
    ]
  }).sort('-created').populate('user', 'displayName').limit(50).exec(function (err, baptisms) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(baptisms);
    }
  });
};

/**
 * Baptism middleware
 */
exports.baptismByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Baptism is invalid'
    });
  }

  Baptism.findById(id).populate('user', 'displayName').exec(function (err, baptism) {
    if (err) {
      return next(err);
    } else if (!baptism) {
      return res.status(404).send({
        message: 'No Baptism with that identifier has been found'
      });
    }
    req.baptism = baptism;
    next();
  });
};
