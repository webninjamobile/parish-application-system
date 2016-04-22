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

var marriageField = function (name) {
  return {
    firstName: simpleField(name + '\'s ' + 'First Name'),
    middleName: simpleField(name + '\'s ' + 'Middle Name'),
    lastName: simpleField(name + '\'s ' + 'Last Name'),
    legalStatus: simpleField(name + '\'s ' + 'Legal Status'),
    birthday: dateField(name + '\'s ' + 'Birthday Date'),
    baptiseday: dateField(name + '\'s ' + 'Baptise Date'),
    birthplace: simpleField(name + '\'s ' + 'Birthplace'),
    baptiseplace: simpleField(name + '\'s ' + 'Baptiseplace'),
    address: simpleField(name + '\'s ' + 'address'),
    father: nameField(name + '\'s ' + 'Father'),
    mother: nameField(name + '\'s ' + 'Mother')
  };
};

/**
 * Marriage Schema
 */
var MarriageSchema = new Schema({
  marriage: {
    bride: marriageField('Bride'),
    groom: marriageField('Groom')
  },
  sponsors: {
    first: nameField('First Sponsor'),
    second: nameField('Second Sponsor')
  },
  minister: nameField('Minister'),
  marriageDate: dateField('Marriage Day'),
  remarks: simpleField('Remarks'),
  bookNumber: simpleField('Book Number'),
  pageNumber: simpleField('Page Number'),
  licenseNumber: simpleField('Book Number'),
  registryNumber: simpleField('Page Number'),
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

console.log(MarriageSchema);

mongoose.model('Marriage', MarriageSchema);
