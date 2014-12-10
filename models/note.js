/*jshint node:true*/
'use strict';

var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
    noteTitle: String,
    noteBody: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);
