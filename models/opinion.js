import mongoose from 'mongoose';

const OpinionSchema = mongoose.Schema({
  text: String,
  created: { type: Date, default: Date.now },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  upvotes: Array,
  downvotes: Array
});

export default mongoose.model('Opinion', OpinionSchema);
