import express from 'express';
import passport from 'passport';
import flash from 'connect-flash';
import User from '../models/user';

const router = express.Router();

// ======================
// AUTH ROUTES
// ======================

// Show register form
router.get('/register', (req, res) => {
  res.render('signup');
});

// Sign up logic
router.post('/register', (req, res) => {
  const newUser = new User({ username: req.body.username, fullname: req.body.fullname, email: req.body.email });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      req.flash('error', err.message);
      return res.render('signup');
    }
    passport.authenticate('local')(req, res, () => {
      req.flash('success', 'Welcome to AndelVoice');
      res.redirect('/andelainitiative');
    });
  });
});

// Show login form
router.get('/login', (req, res) => {
  res.render('login');
});

// Add login logic
router.post('/login', passport.authenticate('local', {
  successRedirect: '/andelainitiative',
  failureRedirect: '/login'
}), (req, res) => {
});

// Add logout route
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('error', 'Loged out successful!')
  res.redirect('/login');
});

export default router;
