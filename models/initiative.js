import mongoose from 'mongoose';

// SCHEMA SETUP
const initiativeSchema = new mongoose.Schema({
  fullname: String,
  title: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  opinions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opinion'
  }]
});

const Initiative = mongoose.model('Initiative', initiativeSchema);
export default Initiative;

/*
const InitiativeSchema = new mongoose.Schema({
  author: String,
  title: String,
  image: { type: String, default: 'http://leadersinheels.com/wp-content/uploads/facebook-default.jpg' },
  body: String,
  created: { type: Date, default: Date.now }
}); */
