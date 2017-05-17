const express = require( 'express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
// APP CONFIG
mongoose.connect('mongodb://localhost/andelainitiative');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// MONGOOSE/MODEL CONFIG
const initiativeSchema = new mongoose.Schema({
  title: String,
  image: { type: String, default: 'http://leadersinheels.com/wp-content/uploads/facebook-default.jpg' },
  body: String,
  created: { type: Date, default: Date.now }
});
const Initiatives = mongoose.model('Initiatives', initiativeSchema);

/*Initiatives.create({
  title: 'MONGO LABS',
  image: '',
  body: 'MY name is mcdavid emereuwa hfd8befrh   dwbfywiwuf '
});*/


// INDEX ROUTES
app.get('/', (req, res) => {
  res.redirect('/andelainitiative');
});
app.get('/andelainitiative', (req, res) => {
  Initiatives.find({}, (err, andelainitiative) => {
    if (err) {
      console.log('ERROR');
    } else {
      return res.render('index', { andelainitiative });
    }
  });
});
// New Route
app.get('/andelainitiative/new', (req, res) => {
  res.render('new');
});

// Create route

app.post('/andelainitiative', (req, res) => {
  Initiatives.create(req.body.andelainitiative, (err, newInitiatives) => {
    if (err) {
      res.render('new');
    } else {
      return res.redirect('/andelainitiative');
    }
  })
})

// Show Item route

app.get('/andelainitiative/:id', (req, res) => {
  Initiatives.findById(req.params.id, (err, foundInitiatives) => {
    if (err) {
      res.redirect('/andelainitiative');
    } else {
      res.render('show', { initiative: foundInitiatives });
    }
  });
});

// Edit route
app.get('/andelainitiative/:id/edit', (req, res) => {
  Initiatives.findById(req.params.id, (err, foundInitiatives) => {
    if (err) {
      res.redirect('/andelainitiatives');
    } else {
      res.render('edit', { initiative: foundInitiatives });
    }
  });
});

// Update Route
app.put('/andelainitiative/:id', (req, res) => {
  
})
app.listen(process.env.PORT || 8080, process.env.IP, () => {
  console.log('server is running');
});