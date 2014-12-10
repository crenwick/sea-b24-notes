'use strict';

var $ = require('jquery');
var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NDdjYTY1ZGZiNjFlYTk0MWEzZTUzMGEiLCJleHAiOjE0MTc0NTUxOTc2NDd9.HGzqRk_h0QRWVd0mlmsCZbG-eBaX1i-w5sqtTVq68lU';

module.exports = function(note, callback) {
  $.ajax({
    beforeSend: function(request) {
      request.setRequestHeader('jwt', jwt);
    },
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(note),
    contentType: "application/json; charset=utf-8",
    url: '/v1/api/notes',
    success: function(data) {
      callback(data);
    },
    error: function(err) {
      console.log(err);
      callback(false);
    }
  });
};