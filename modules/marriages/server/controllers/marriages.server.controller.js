'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Marriage = mongoose.model('Marriage'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Marriage
 */
exports.create = function (req, res) {
  var marriage = new Marriage(req.body);
  marriage.user = req.user;

  marriage.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(marriage);
    }
  });
};

/**
 * Show the current Marriage
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var marriage = req.marriage ? req.marriage.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  marriage.isCurrentUserOwner = req.user && marriage.user && marriage.user._id.toString() === req.user._id.toString();

  res.jsonp(marriage);
};

/**
 * Update a Marriage
 */
exports.update = function (req, res) {
  var marriage = req.marriage;

  marriage = _.extend(marriage, req.body);

  marriage.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(marriage);
    }
  });
};

/**
 * Delete an Marriage
 */
exports.delete = function (req, res) {
  var marriage = req.marriage;

  marriage.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(marriage);
    }
  });
};

/**
 * List of Marriages
 */
exports.list = function (req, res) {
  Marriage.find().sort('-created').populate('user', 'displayName').limit(50).exec(function (err, marriages) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(marriages);
    }
  });
};

/**
 * List of Marriages
 */
exports.search = function (req, res) {
  var key = req.body.key || '';

  var regex = { $regex: new RegExp(key, 'i') };

  Marriage.find({
    $or: [
      { 'parties.groom.firstName': regex },
      { 'parties.groom.middleName': regex },
      { 'parties.groom.lastName': regex }
    ]
  }).sort('-created').populate('user', 'displayName').limit(50).exec(function (err, marriages) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(marriages);
    }
  });
};

/**
 * Marriage middleware
 */
exports.marriageByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Marriage is invalid'
    });
  }

  Marriage.findById(id).populate('user', 'displayName').exec(function (err, marriage) {
    if (err) {
      return next(err);
    } else if (!marriage) {
      return res.status(404).send({
        message: 'No Marriage with that identifier has been found'
      });
    }
    req.marriage = marriage;
    next();
  });
};
