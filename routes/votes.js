// ===============
// VOTES
// ===============

app.get('/andelainitiative/:id/opinions/:opinion_id/upvote', (req, res) => {

  Opinion.findById(req.query.id).populate('votes').exec((err, foundOpinion) => {
    console.log("=================", foundOpinion);
    foundOpinion.upvotes.push(req.user._id);
    foundOpinion.save((err, newOpinion) => {
      console.log("=================", newOpinion);
      res.json(newOpinion);
        });
    // myVote.upvote(username);
  });
  // }
});