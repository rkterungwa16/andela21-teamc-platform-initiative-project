'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _user = require('../dist/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var LocalStrategy = _passportLocal2.default.Strategy;

// Register
router.get('/register', function (req, res) {
  res.render('signup');
});

// Home
router.get('/', function (req, res) {
  res.render('signup');
});

// Login
router.get('/login', function (req, res) {
  res.render('login');
});

// Register User
router.post('/register', function (req, res) {
  var name = req.body.name,
      username = req.body.username,
      email = req.body.email,
      password = req.body.password,
      password2 = req.body.password2;

  // Validation
  /* req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is invalid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Password do not match').equals(req.body.password);
  const errors = req.validationErrors();
  if (errors) {
    res.render('register', { errors
    });
  } else {*/
  // req.checkBody('password2', 'Password do not match').equals(req.body.password);
  /* const errors = req.validationErrors();
  if (errors) {
    console.log('Error Occurred');
  }*/
  var newUser = new _user2.default({
    name: name,
    email: email,
    username: username,
    password: password
  });

  _user2.default.createUser(newUser, function (err, user) {
    if (err) throw err;
    console.log(user);
  });
  // req.flash('success_msg', 'You are registered and can now login');
  res.redirect('/login');
});

_passport2.default.serializeUser(function (user, done) {
  done(null, user.id);
});

_passport2.default.deserializeUser(function (id, done) {
  _user2.default.getUserById(id, function (err, user) {
    done(err, user);
  });
});

_passport2.default.use(new LocalStrategy(function (username, password, done) {
  _user2.default.getUserByUsername(username, function (err, user) {
    if (err) throw err;
    if (!user) {
      return done(null, false, { message: 'Unknown User' });
    }
    _user2.default.comparePassword(password, user.password, function (err, isMatch) {
      if (err) throw err;
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, { message: 'Invalid password' });
    });
  });
}));

router.post('/login', _passport2.default.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }), function (req, res) {
  res.redirect('/');
});

exports.default = router;