"use strict";

// import mongoose from 'mongoose';
// import passportLocalMongoose from "passport-local-mongoose";

var mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  name: String
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);

// // User Schema
// const UserSchema = mongoose.Schema({
//   username: {
//     type: String,
//     index: true
//   },
//   password: {
//     type: String
//   },
//   email: {
//     type: String
//   },
//   name: {
//     type: String
//   }
// });

// const User = module.exports = mongoose.model('user', UserSchema);

// module.exports.createUser = (newUser, callback) => {
//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(newUser.password, salt, (err, hash) => {
//       newUser.password = hash;
//       newUser.save(callback);
//     });
//   });
// };

// module.exports.getUserByUsername = (username, callback) => {
//   const query = { username };
//   User.findOne(query, callback);
// };

// module.exports.getUserById = (id, callback) => {
//   User.findById(id, callback);
// };

// module.exports.comparePassword = (candidatePassword, hash, callback) => { 
//   bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
//         // if(err) throw err;
//     callback(null, isMatch);
//   });
// };