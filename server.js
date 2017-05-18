import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
// import expressValidator from 'express -validator';
import flash from 'connect-flash';
import session from 'express-session';
import passport from 'passport';
// import localStrategy from 'passport-local';
import users from '../dist/users';
// import index from '../dist/index';



// Init App
const app = express();



// Static files
app.use(express.static(path.join(process.cwd(), 'public')));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set View engine

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// express session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport Init
app.use(passport.initialize());
app.use(passport.session());


// app.use('/', index);
app.use('/', users);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'));
