import express from 'express';
import Opinion from '../models/opinion';

const router = express.Router();

// ===============
// VOTES
// ===============

router.get('/andelainitiative/:id/opinions/:opinion_id/upvote', (req, res) => {

  Opinion.findById(req.query.id).populate('votes').exec((err, foundOpinion) => {
    console.log('=================', foundOpinion);
    foundOpinion.upvotes.push(req.user._id);
    foundOpinion.save((err, newOpinion) => {
      console.log('=================', newOpinion);
      res.json(newOpinion);
    });
    // myVote.upvote(username);
  });
  // }
});

export default router;
