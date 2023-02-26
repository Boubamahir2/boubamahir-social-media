import mongoose from 'mongoose';

const reactSchema = new mongoose.Schema({
  reaction: {
    type: String,
    enum: ['like', 'love', 'haha', 'sad', 'angry', 'wow'],
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const PostReaction = mongoose.model('PostReaction', reactSchema);

export default PostReaction;
