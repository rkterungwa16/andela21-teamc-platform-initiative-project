import express from 'express';

const router = express.Router();

// Register
<<<<<<< HEAD
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
=======
router.get('/dashboard', (req, res) => {
  res.render('dashboard');
>>>>>>> 71b00b7c6e22785e867d4017ee815096137a7caa
});




export default router;
