import express from 'express';
import Initiative from '../models/initiative';

const router = express.Router();


router.get('/', (req, res) => {
  res.redirect('/login');
});


// MiddleWares

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Please Login First!');
  res.redirect('/login');
};

const checkOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Initiative.findById(req.query.id, (err, foundInitiative) => {
      if (err) {
        res.redirect('back');
      } else {
        if (foundInitiative.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect('back');
        }
      }
    });
  } else {
    res.redirect('back');
  }
};

// INDEX ROUTE
router.get('/andelainitiative', isLoggedIn, (req, res) => {
  Initiative.find({}, (err, allInitiatives) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { initiatives: allInitiatives });
    }
  });
});

// SHOW ROUTE
router.get('/andelainitiative/:id', isLoggedIn, (req, res) => {
  Initiative.findById(req.params.id).populate('opinions').exec((err, foundInitiative) => {
    if (err) {
      console.log(err);
    } else {
      res.render('show', { initiative: foundInitiative });
    }
  });
});


// New Route
router.get('/andelainitiative/new', isLoggedIn, (req, res) => {
  res.render('new');
});

// Create route

router.post('/andelainitiative', isLoggedIn, (req, res) => {
  const fullname = req.body.fullname;
  const title = req.body.title;
  const image = req.body.image;
  const description = req.body.description;
  const author = {
    id: req.user._id,
    username: req.user.username
  };
  const newInitiative = { fullname, title, image, description, author };
  Initiative.create(newInitiative, (err, newInitiatives) => {
    if (err) {
      res.render('new');
    } else {
      return res.redirect('/andelainitiative');
    }
  });
});

// Show Item route

router.get('/andelainitiative/:id', isLoggedIn, (req, res) => {
  Initiative.findById(req.params.id, (err, foundInitiatives) => {
    if (err) {
      res.redirect('/andelainitiative');
    } else {
      res.render('show', { initiative: foundInitiatives });
    }
  });
});

// Edit route
router.get('/andelainitiative/:id/edit', isLoggedIn, checkOwnership, (req, res) => {
  Initiative.findById(req.query.id, (err, foundInitiative) => {
    res.json({ found: foundInitiative, id: req.query.id });
  });
});


// Update Route
router.put('/andelainitiative/:id', isLoggedIn, checkOwnership, (req, res) => {
  Initiative.findByIdAndUpdate(req.params.id, req.body
  .initiative, (err, updatedInitiative) => {
    if (err) {
      res.redirect('back');
    } else {
      res.redirect('/andelainitiative/' + req.params.id);
    }
  });
});

// Delete Route
router.delete('/andelainitiative/:id', isLoggedIn, checkOwnership, (req, res) => {
  Initiative.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect('/andelainitiative');
    } else {
      res.redirect('/andelainitiative');
    }
  });
});

export default router;

