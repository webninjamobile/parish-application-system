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
 * Confirmation Schema
 */
var ConfirmationSchema = new Schema({
  child: nameField('Child'),
  confirmationDate: dateField('Confirmation Day'),
  address: simpleField('Address'),
  parents: {
    mother: nameField('Mother'),
    father: nameField('Father')
  },
  minister: nameField('Minister'),
  sponsors: {
    first: nameField('First Sponsor'),
    second: nameField('Second Sponsor')
  },
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

mongoose.model('Confirmation', ConfirmationSchema);
