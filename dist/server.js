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

var _users = require('../dist/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import index from '../dist/index';


// Init App

// import expressValidator from 'express -validator';
var app = (0, _express2.default)();

// Static files

// import localStrategy from 'passport-local';
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

// app.use('/', index);
app.use('/', _users2.default);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'));