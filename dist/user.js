'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// User Schema
var UserSchema = _mongoose2.default.Schema({
  username: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  name: {
    type: String
  }
});

var User = module.exports = _mongoose2.default.model('user', UserSchema);

module.exports.createUser = function (newUser, callback) {
  _bcryptjs2.default.genSalt(10, function (err, salt) {
    _bcryptjs2.default.hash(newUser.password, salt, function (err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.getUserByUsername = function (username, callback) {
  var query = { username: username };
  User.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  _bcryptjs2.default.compare(candidatePassword, hash, function (err, isMatch) {
    // if(err) throw err;
    callback(null, isMatch);
  });
};