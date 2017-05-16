import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  text: String,
  author: String
});

export default mongoose.model('Comment', commentSchema);
