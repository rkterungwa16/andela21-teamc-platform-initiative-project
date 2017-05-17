import mongoose from 'mongoose';

const VoteSchema = mongoose.Schema({
  upvotes: Array,
  downvotes: Array
});

export default mongoose.model('Vote', VoteSchema);
