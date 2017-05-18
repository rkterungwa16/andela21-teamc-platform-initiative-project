import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import flash from 'connect-flash';
import User from './models/user';


// ROUTES

import initiativeRoutes from './routes/initiatives';
import opinionRoutes from './routes/opinions';
import authRoutes from './routes/auth';
import voteRoutes from './routes/votes';

const passport = require('passport');
const LocalStrategy = require('passport-local');

const app = express();

mongoose.connect('mongodb://localhost/andela_initiatives');
// mongoose.connect('mongodb://andelainit:andelai@ds143131.mlab.com:43131/andela-initiative')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride('_method'));
app.use(flash());

mongoose.Promise = require('bluebird');

app.set('view engine', 'ejs');


// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: 'Anywhere I go',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});


// ROUTES CONFIG
app.use(initiativeRoutes);
app.use(opinionRoutes);
app.use(voteRoutes);
app.use(authRoutes);


// MiddleWares

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};




app.listen(3002, () => {
  console.log('serving on port 3002');
});

