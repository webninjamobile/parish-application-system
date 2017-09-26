'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Death = mongoose.model('Death'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Death
 */
exports.create = function (req, res) {
  var death = new Death(req.body);
  death.user = req.user;

  death.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(death);
    }
  });
};

/**
 * Show the current Death
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var death = req.death ? req.death.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  death.isCurrentUserOwner = req.user && death.user && death.user._id.toString() === req.user._id.toString();

  res.jsonp(death);
};

/**
 * Update a Death
 */
exports.update = function (req, res) {
  var death = req.death;

  death = _.extend(death, req.body);

  death.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(death);
    }
  });
};

/**
 * Delete an Death
 */
exports.delete = function (req, res) {
  var death = req.death;

  death.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(death);
    }
  });
};

/**
 * List of Deaths
 */
exports.list = function (req, res) {
  Death.find().sort('-created').populate('user', 'displayName').limit(50).exec(function (err, deaths) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(deaths);
    }
  });
};

/**
 * List of Deaths
 */
exports.search = function (req, res) {
  var key = req.body.key || '';

  var regex = { $regex: new RegExp(key, 'i') };

  Death.find({
    $or: [
      { 'name.firstName': regex },
      { 'name.middleName': regex },
      { 'name.lastName': regex }
    ]
  }).sort('-created').populate('user', 'displayName').limit(50).exec(function (err, deaths) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(deaths);
    }
  });
};

/**
 * Death middleware
 */
exports.deathByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Death is invalid'
    });
  }

  Death.findById(id).populate('user', 'displayName').exec(function (err, death) {
    if (err) {
      return next(err);
    } else if (!death) {
      return res.status(404).send({
        message: 'No Death with that identifier has been found'
      });
    }
    req.death = death;
    next();
  });
};
