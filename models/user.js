/*jshint node:true*/
'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

var userSchema = mongoose.Schema({
    basic: {
        email: 'String',
        password: 'String' //will be hashed
    },
    adminLevel: {type: Number, default: 0}
});

//increasing the genSaltSync param is exp. Takes longer but is more secure.
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.basic.password);
};

userSchema.methods.generateToken = function(secret) {
    var _this = this;
    var token = jwt.encode({
        iss: _this._id,
        exp: Date.now()
    }, secret);
    return token;
};

module.exports = mongoose.model('User', userSchema);
