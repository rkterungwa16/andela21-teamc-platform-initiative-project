import express from 'express';
import Initiative from '../models/initiative';
import Opinion from '../models/opinion';

const router = express.Router();

// MiddleWares

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Please Login First!');
  res.redirect('/login');
};
                                                                                                                                                          
const checkOpinionOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Opinion.findById(req.params.opinion_id, (err, foundOpinion) => {
      if (err) {
        res.redirect('back');
      } else {
        if (foundOpinion.author.id.equals(req.user._id)) {
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

// =======================
// OPINION ROUTES
// =======================

// NEW OPINION
router.get('/andelainitiative/:id/opinions/new', (req, res) => {
  Initiative.findById(req.params.id, (err, initiative) => {
    if (err) {
      console.log(err);
    } else {
      res.render('opinions/new', { initiative });
    }
  });
});


// CREATE OPINION
router.post('/andelainitiative/:id/opinions', (req, res) => {
  Initiative.findById(req.params.id, (err, initiative) => {
    if (err) {
      res.redirect('/andelainitiative');
    } else {
      Opinion.create({ text: req.body.description }, (err, opinion) => {
        if (err) {
          console.log(err);
        } else {
          opinion.author.id = req.user._id;
          opinion.author.username = req.user.username;
          opinion.save();
          initiative.opinions.push(opinion);
          initiative.save((err, newInitiative) => {
          });
          res.redirect(`/andelainitiative/${ initiative._id }`);
        }
      });
    }
  });
});

// EDIT OPINION
router.get('/andelainitiative/:id/opinions/:opinion_id/edit', checkOpinionOwnership, (req, res) => {
  Opinion.findById(req.params.opinion_id, (err, foundOpinion) => {
    if (err) {
      res.redirect('back');
    } else {
      res.render('opinions/edit', { initiative_id: req.params.id, opinion: foundOpinion });
    }
  });
});

// UPDATE OPINION AFTER EDIT
router.put('/andelainitiative/:id/opinions/:opinion_id', (req, res) => {
  Opinion.findByIdAndUpdate(req.params.opinion_id, req.body.opinion, (err, updatedOpinion) => {
    if (err) {
      res.redirect('back');
    } else {
      res.redirect(`/andelainitiative/${req.params.id}`);
    }
  });
});

// DELETE OPINION
router.delete('/andelainitiative/:id/opinions/:opinion_id', (req, res) => {
  Opinion.findByIdAndRemove(req.params.opinion_id, (err) => {
    if (err) {
      res.redirect('back');
    } else {
      res.redirect(`/andelainitiative/${req.params.id}`);
    }
  });
});

export default router;
