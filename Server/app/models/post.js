import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  feedId: {
    type: String,
    required: false
  },
  author: {
    type: String,
    required: true,
    default: 'Anonymous'
  },
  authorId: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  upVote: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: String
  }],
  viewedBy: [{
    type: String
  }],
  viewCount: {
    type: Number,
    default: 0
  },
  commentCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  timestamp: {
    type: String,
    default: () => new Date().toISOString()
  },
  lastLikedAt: {
    type: String
  },
  lastViewedAt: {
    type: String
  }
}, {
  timestamps: true
});

// Indexes for better performance
postSchema.index({ createdAt: -1 });
postSchema.index({ author: 1 });
postSchema.index({ authorId: 1 });
postSchema.index({ likedBy: 1 });

const PostModel = mongoose.model('Post', postSchema);
export default PostModel;