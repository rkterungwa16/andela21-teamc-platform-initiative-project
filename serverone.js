import mongoose from 'mongoose';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongodb from 'mongodb';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from './models/user';
import Initiative from './models/initiative';
// const passport = require('passport');
// const LocalStrategy = require('passport-local');

const app = express();
app.use(express.static(`${process.cwd()}/public`))

// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

const options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } }; 

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://andela-teamc:teamc21@ds143081.mlab.com:43081/andela-dlc', options);
//mongoose.connect('mongodb://localhost:27017/andelvoice')
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
  console.log('Wait for the connection...');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Anywhere I go",
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// ISLOGGEDIN MIDDLEWARE
let isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
};

// ======================
// AUTH ROUTES
// ======================

app.get('/', (req, res) => {
  res.render('login');
})
// Show register form
app.get("/register", (req, res) => {
    res.render("signup");
});

// Sign up logic
app.post("/register", (req, res) => {
  var newUser = new User({username: req.body.username, name: req.body.name, email: req.body.email});
  User.register(newUser, req.body.password, (err, user) => {
    if (err){
      console.log(err);
      return res.render("register")
    }
    passport.authenticate("local")(req, res, () => {
      req.session.user = newUser;
      res.redirect("/andelainitiative");
    });
  });
});

app.get('/andelainitiative', (req, res) => {
  Initiative.find({}, (err, initiatives) => {
    if (err) {
      console.log('ERROR');
    } else {
      return res.render('index', { initiatives });
    }
  });
});

// Login Logic
// Show login form
app.get("/login", (req, res) => {
  res.render("login");
});

// Add login logic
app.post("/login", passport.authenticate("local", {
  successRedirect: "/andelainitiative",
  failureRedirect: "/login"
}), (req, res) => {
});

// Add logout route
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/andelainitiative");
})

app.listen(process.env.PORT || 3000);
console.log('listening')