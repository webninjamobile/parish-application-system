'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var simpleField = function (name) {
  return {
    type: String,
    default: '',
    required: 'Please fill ' + name,
    trim: true
  };
};

var dateField = function (name) {
  return {
    type: Date,
    default: Date.now,
    required: 'Please fill ' + name
  };
};

var nameField = function (name) {
  return {
    firstName: simpleField(name + '\'s ' + 'First Name'),
    middleName: simpleField(name + '\'s ' + 'Middle Name'),
    lastName: simpleField(name + '\'s ' + 'Last Name')
  };
};

/**
 * Death Schema
 */
var DeathSchema = new Schema({
  name: nameField('Child'),
  address: simpleField('Address'),
  relative: nameField('Address'),
  relativeType: simpleField('Address'),
  age: simpleField('Age'),
  deathday: dateField('Date of Death'),
  burriedday: dateField('Burried Day'),
  minister: nameField('Minister'),
  remarks: simpleField('Remarks'),
  bookNumber: simpleField('Book Number'),
  pageNumber: simpleField('Page Number'),
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Death', DeathSchema);
