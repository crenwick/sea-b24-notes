/*jshint node:true*/
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var beerSchema = new Schema({
  name:  String,
  brewery: String,
  liked:   Boolean,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Beer', beerSchema);
