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
 * Baptism Schema
 */
var BaptismSchema = new Schema({
  child: nameField('Child'),
  birthday: dateField('Birthday'),
  baptiseday: dateField('Baptism Day'),
  address: simpleField('Address'),
  placeOfBirth: simpleField('Place of Baptism'),
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
  legitimate: {
    type: Boolean,
    default: true
  },
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

mongoose.model('Baptism', BaptismSchema);
