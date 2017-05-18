import express from 'express';
import passport from 'passport';
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
      console.log(err);
      return res.render('signup');
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/andelainitiative');
    });
  });
});

// Login Logic
// Show login form
router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
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
  res.redirect('/login');
});

export default router;
