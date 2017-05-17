'use strict';

var _user = require('./models/user');

var _user2 = _interopRequireDefault(_user);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passport = require('passport');
var LocalStrategy = require('passport-local');

var app = (0, _express2.default)();

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect('mongodb://crowdsource:terunkom1986@ds143221.mlab.com:43221/crowdsource');

app.set('views', _path2.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Anywhere I go",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(_user2.default.authenticate()));
passport.serializeUser(_user2.default.serializeUser());
passport.deserializeUser(_user2.default.deserializeUser());

// BodyParser Middleware
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// ISLOGGEDIN MIDDLEWARE
var isLoggedIn = function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

// ======================
// AUTH ROUTES
// ======================

// Show register form
app.get("/register", function (req, res) {
  res.render("signup");
});

// Sign up logic
app.post("/register", function (req, res) {
  var newUser = new _user2.default({ username: req.body.username, name: req.body.name, email: req.body.email });
  _user2.default.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function () {
      res.redirect("/andelainitiative");
    });
  });
});

// Login Logic
// Show login form
app.get("/login", function (req, res) {
  res.render("login");
});

// Add login logic
app.post("/login", passport.authenticate("local", {
  successRedirect: "/andelainitiative",
  failureRedirect: "/login"
}), function (req, res) {});

// Add logout route
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/andelainitiative");
});

app.listen(3000);
console.log('listening');