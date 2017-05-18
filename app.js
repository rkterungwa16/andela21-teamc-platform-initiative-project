import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import flash from 'connect-flash';
import Initiative from './models/initiative';
import Opinion from './models/opinion';
import User from './models/user';
import Vote from './models/voters';
import seedDB from './seeds';


const passport = require('passport');
const LocalStrategy = require('passport-local');

const app = express();

mongoose.connect('mongodb://localhost/andela_initiative_comments');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride('_method'));
app.use(flash());

mongoose.Promise = require('bluebird');

app.set('view engine', 'ejs');

seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Anywhere I go",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});



// MiddleWares

let isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please Login First!");
  res.redirect("/login")
};


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
app.get('/andelainitiative/:id', isLoggedIn, (req, res) => {
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
            console.log("=================", newInitiative);
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

// ======================
// AUTH ROUTES
// ======================

// Show register form
app.get("/register", (req, res) => {
    res.render("signup");
});

// Sign up logic
app.post("/register", (req, res) => {
  var newUser = new User({username: req.body.username, fullname: req.body.fullname, email: req.body.email});
  User.register(newUser, req.body.password, (err, user) => {
    if (err){
      console.log(err);
      return res.render("signup")
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/andelainitiative");
    });
  });
});

// Login Logic
// Show login form
app.get("/login", (req, res) => {
  res.render("login", {message: req.flash("error")});
});

// Add login logic
app.post("/login", passport.authenticate("local", {
  successRedirect: "/andelainitiative",
  failureRedirect: "/login"
}), (req, res) => {
});

// Add logout route
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/andelainitiative");
})

// ===============
// VOTES
// ===============

app.get('/andelainitiative/:id/opinions/:opinion_id/upvote', (req, res) => {

  if (req.query.idName == 'Uvote') {
    Opinion.findById(req.query.id, (err, foundOpinion) => {
      if (req.user._id in foundOpinion.upvotes && !(req.user._id in foundOpinion.downvotes)) {
        return
      }
      if (req.user._id in foundOpinion.downvotes && !(req.user._id in foundOpinion.upvotes)) {
        const index = foundOpinion.downvotes.indexOf(req.user._id);
        console.log(foundOpinion.downvotes)
        foundOpinion.downvotes.splice(index, 1);
        foundOpinion.upvotes.push(req.user._id);
      }
      if (!(req.user._id in foundOpinion.downvotes) && !(req.user._id in foundOpinion.upvotes)) {
        foundOpinion.upvotes.push(req.user._id);
      }
    foundOpinion.save((err, newOpinion) => {
      console.log('=====>', newOpinion);
      res.json({newOpinion, idName: req.query.idName});
      return
      });
    });
  } else if (req.query.idName == 'Dvote') {
    Opinion.findById(req.query.id, (err, foundOpinion) => {
      if (req.user._id in foundOpinion.downvotes && !(req.user._id in foundOpinion.upvotes)) {
        return
      }
      if (req.user._id in foundOpinion.upvotes && !(req.user._id in foundOpinion.downvotes)) {
        const index = foundOpinion.downvotes.indexOf(req.user._id);
        console.log('+++++++',index)
        foundOpinion.upvotes.splice(index, 1);
        foundOpinion.downvotes.push(req.user._id);
      }
      if (!(req.user._id in foundOpinion.upvotes) && !(req.user._id in foundOpinion.downvotes)) {
        foundOpinion.downvotes.push(req.user._id);
      }
    foundOpinion.save((err, newOpinion) => {
      console.log('====', newOpinion);
      res.json({newOpinion, idName: req.query.idName});
      return
      });
    });
  }
});







app.listen(3000, () => {
  console.log('serving on port 3000');
});
