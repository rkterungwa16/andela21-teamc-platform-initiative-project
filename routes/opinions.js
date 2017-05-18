import express from 'express';
import Initiative from '../models/initiative';
import Opinion from '../models/opinion';

const router = express.Router();

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
      Opinion.create(req.body.opinion, (err, opinion) => {
        if (err) {
          console.log(err);
        } else {
          initiative.opinions.push(opinion);
          initiative.save((err, newInitiative) => {
            console.log('=================', newInitiative);
          });
          res.redirect(`/andelainitiative/${initiative._id}`);
        }
      });
    }
  });
});

// EDIT OPINION
router.get('/andelainitiative/:id/opinions/:opinion_id/edit', (req, res) => {
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
