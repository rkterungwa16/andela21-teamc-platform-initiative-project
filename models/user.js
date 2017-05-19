const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  fullname: String,
  isAdmin: { type: Boolean, default: false },
  email: String
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);