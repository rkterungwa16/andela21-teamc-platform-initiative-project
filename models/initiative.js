import mongoose from 'mongoose';

// INITIATIVES MONGOOSE/MODEL CONFIG
const InitiativeSchema = new mongoose.Schema({
  author: String,
  title: String,
  image: { type: String, default: 'http://leadersinheels.com/wp-content/uploads/facebook-default.jpg' },
  body: String,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Initiative', InitiativeSchema);