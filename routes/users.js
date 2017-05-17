import express from 'express';
import passport from 'passport';
import localStrategy from 'passport-local';
import User from '../dist/user';

const router = express.Router();

const LocalStrategy = localStrategy.Strategy;

// Register
router.get('/register', (req, res) => {
  res.render('signup');
});

// Home
router.get('/', (req, res) => {
  res.render('signup');
});

// Login
router.get('/login', (req, res) => {
  res.render('login');
});

// Register User
router.post('/register', (req, res) => {
  const name = req.body.name,
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
  const newUser = new User({
    name,
    email,
    username,
    password
  });

  User.createUser(newUser, (err, user) => {
    if (err) throw err;
    console.log(user);
  });
  // req.flash('success_msg', 'You are registered and can now login');
  res.redirect('/login');
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.getUserByUsername(username, (err, user) => {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: 'Unknown User' });
      }
      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { message: 'Invalid password' });
      });
    });
  }));


router.post('/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }),
  (req, res) => {
    res.redirect('/');
  });

export default router;
