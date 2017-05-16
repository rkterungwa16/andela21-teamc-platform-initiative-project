import mongoose from 'mongoose';

// SCHEMA SETUP
const initiativeSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  opinions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opinion'
  }]
});

const Initiative = mongoose.model('Initiative', initiativeSchema);
export default Initiative;
