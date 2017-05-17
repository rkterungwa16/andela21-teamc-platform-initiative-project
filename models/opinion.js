import mongoose from 'mongoose';

const OpinionSchema = mongoose.Schema({
  text: String,
  author: String,
  upvotes: Array,
  downvotes: Array
  // votes: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Vote'
  // }]
});

export default mongoose.model('Opinion', OpinionSchema);
