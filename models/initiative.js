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

