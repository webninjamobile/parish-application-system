'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Confirmation = mongoose.model('Confirmation'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Confirmation
 */
exports.create = function (req, res) {
  var confirmation = new Confirmation(req.body);
  confirmation.user = req.user;

  confirmation.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(confirmation);
    }
  });
};

/**
 * Show the current Confirmation
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var confirmation = req.confirmation ? req.confirmation.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  confirmation.isCurrentUserOwner = req.user && confirmation.user && confirmation.user._id.toString() === req.user._id.toString();

  res.jsonp(confirmation);
};

/**
 * Update a Confirmation
 */
exports.update = function (req, res) {
  var confirmation = req.confirmation;

  confirmation = _.extend(confirmation, req.body);

  confirmation.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(confirmation);
    }
  });
};

/**
 * Delete an Confirmation
 */
exports.delete = function (req, res) {
  var confirmation = req.confirmation;

  confirmation.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(confirmation);
    }
  });
};

/**
 * List of Confirmations
 */
exports.list = function (req, res) {
  Confirmation.find().sort('-created').populate('user', 'displayName').limit(50).exec(function (err, confirmations) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(confirmations);
    }
  });
};

/**
 * List of Confirmations
 */
exports.search = function (req, res) {
  var key = req.body.key || '';

  var regex = { $regex: new RegExp(key, 'i') };

  Confirmation.find({
    $or: [
      { 'child.firstName': regex },
      { 'child.middleName': regex },
      { 'child.lastName': regex }
    ]
  }).sort('-created').populate('user', 'displayName').limit(50).exec(function (err, confirmations) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(confirmations);
    }
  });
};

/**
 * Confirmation middleware
 */
exports.confirmationByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Confirmation is invalid'
    });
  }

  Confirmation.findById(id).populate('user', 'displayName').exec(function (err, confirmation) {
    if (err) {
      return next(err);
    } else if (!confirmation) {
      return res.status(404).send({
        message: 'No Confirmation with that identifier has been found'
      });
    }
    req.confirmation = confirmation;
    next();
  });
};
