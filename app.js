import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import Initiative from './models/initiative';
import Opinion from './models/opinion';
import seedDB from './seeds';

const app = express();

mongoose.connect('mongodb://localhost/andela_initiative_comments');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride('_method'));

mongoose.Promise = require('bluebird');

app.set('view engine', 'ejs');

seedDB();

// Initiative.remove({}, (err, removed)=>{
//   if(err) {
//     console.log(err);
//   }
// });
// Initiative.create(
//   { title: 'Salmon Creek',
//   image: ,
//   description: 'Kielbasa cow bacon doner jowl ham hock tri-tip pork belly meatball. Jowl drumstick kevin prosciutto shank cupim shoulder. Pancetta turkey brisket pork loin alcatra. Jerky sausage '}, (err, opinion) =>{
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(opinion);
//   }
// });

// INDEX ROUTE
app.get('/andelainitiative', (req, res) => {
  Initiative.find({}, (err, allInitiatives) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { initiatives: allInitiatives });
    }
  });
});

// SHOW ROUTE
app.get('/andelainitiative/:id', (req, res) => {
  Initiative.findById(req.params.id).populate('opinions').exec((err, foundInitiative) => {
  // Initiative.findById(req.params.id, (err, foundInitiative) => {
    if (err) {
      console.log(err);
    } else {
      res.render('show', { initiative: foundInitiative });
    }
  });
});


// =======================
// OPINION ROUTES
// =======================

// NEW OPINION
app.get('/andelainitiative/:id/opinions/new', (req, res) => {
  Initiative.findById(req.params.id, (err, initiative) => {
    if (err) {
      console.log(err);
    } else {
      res.render('opinions/new', { initiative });
    }
  });
});


// CREATE OPINION
app.post('/andelainitiative/:id/opinions', (req, res) => {
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
            console.log(newInitiative);
          });
          res.redirect(`/andelainitiative/${initiative._id}`);
        }
      });
    }
  });
});

// EDIT OPINION
app.get('/andelainitiative/:id/opinions/:opinion_id/edit', (req, res) => {
  Opinion.findById(req.params.opinion_id, (err, foundOpinion) => {
    if (err) {
      res.redirect('back');
    } else {
      res.render('opinions/edit', { initiative_id: req.params.id, opinion: foundOpinion });
    }
  });
});

// UPDATE OPINION AFTER EDIT
app.put('/andelainitiative/:id/opinions/:opinion_id', (req, res) => {
  Opinion.findByIdAndUpdate(req.params.opinion_id, req.body.opinion, (err, updatedOpinion) => {
    if (err) {
      res.redirect('back');
    } else {
      res.redirect(`/andelainitiative/${req.params.id}`);
    }
  });
});

// DELETE OPINION
app.delete('/andelainitiative/:id/opinions/:opinion_id', (req, res) => {
  Opinion.findByIdAndRemove(req.params.opinion_id, (err) => {
    if (err) {
      res.redirect('back');
    } else {
      res.redirect(`/andelainitiative/${req.params.id}`);
    }
  });
});




app.listen(3000, () => {
  console.log('serving on port 3000');
});
