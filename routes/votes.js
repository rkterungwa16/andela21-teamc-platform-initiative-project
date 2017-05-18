import express from 'express';
import Opinion from '../models/opinion';
import voting from '../API/src/vote';

const router = express.Router();


// ===============
// VOTES
// ===============

router.get('/andelainitiative/:id/opinions/:opinion_id/upvote', (req, res) => {
  if (req.query.idName == 'Uvote') {
    Opinion.findById(req.query.id, (err, foundOpinion) => {
      const myVote = new voting(foundOpinion.upvotes, foundOpinion.downvotes);
      const userId = req.user._id;
      myVote.upvote(userId);

      foundOpinion.save((err, newOpinion) => {
        res.json({ newOpinion, idName: req.query.idName });
      });
    });
  } else if (req.query.idName == 'Dvote') {
    Opinion.findById(req.query.id, (err, foundOpinion) => {
      const myVote = new voting(foundOpinion.downvotes, foundOpinion.upvotes);
      const userId = req.user._id;
      myVote.upvote(userId);
      foundOpinion.save((err, newOpinion) => {
        res.json({ newOpinion, idName: req.query.idName });
      });
    });
  }
});

export default router;
