import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
// import expressValidator from 'express -validator';
import flash from 'connect-flash';
import session from 'express-session';
import passport from 'passport';
// import localStrategy from 'passport-local';
import mongoose from 'mongoose';
import users from '../dist/users';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/userDetails');
const db = mongoose.connection;


// Init App
const app = express();

// Set View engine

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files
// app.use(express.static(path.join(__dirname, 'public')));

// express session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport Init
app.use(passport.initialize());
app.use(passport.session());

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
app.use(flash());

// Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/users', users);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'));
