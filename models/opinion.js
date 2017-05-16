import mongoose from 'mongoose';

const opinionSchema = mongoose.Schema({
  text: String,
  author: String,
  // comments: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Comment'
  // }]
});

export default mongoose.model('Opinion', opinionSchema);
