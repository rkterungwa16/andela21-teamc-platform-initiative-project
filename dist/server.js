'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _connectFlash = require('connect-flash');

var _connectFlash2 = _interopRequireDefault(_connectFlash);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _users = require('../dist/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import index from '../dist/index';

// import localStrategy from 'passport-local';
_mongoose2.default.Promise = global.Promise;
// import expressValidator from 'express -validator';

_mongoose2.default.connect('mongodb://127.0.0.1/userDetails');
var db = _mongoose2.default.connection;

// Init App
var app = (0, _express2.default)();

// Static files
app.use(_express2.default.static(_path2.default.join(process.cwd(), 'public')));

// BodyParser Middleware
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());

// Set View engine

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// express session
app.use((0, _expressSession2.default)({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport Init
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

// express validator
/* app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));*/

// Connect flash
app.use((0, _connectFlash2.default)());

// Global vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// app.use('/', index);
app.use('/', _users2.default);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'));