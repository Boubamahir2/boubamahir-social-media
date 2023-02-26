import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  postType: {
    type: String,
    enum: ['media', 'poll', 'event'],
    default: 'media',
  },

  tempId: {
    type: String,
  },
  content: {
    type: String,
  },

  backgroundPath: {
    type: String,
    default: '',
  },

  background: {
    public_id: String,
    url: String,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },

  caption: {
    type: String,
    maxlength: 500,
  },

  mediaFiles: [
    {
      public_id: String,
      url: String,
      thumbnail: {
        public_id: String,
        url: String,
      },
      mediaType: {
        type: String,
        enum: ['image', 'video', 'gif'],
        default: 'image',
      },
    },
  ],

  pollQuestion: {
    type: String,
    maxlength: 500,
  },

  pollOptions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'PollOption',
    },
  ],

  totalVotes: {
    type: Number,
    default: 0,
  },

  pollEndsAt: {
    type: Date,
  },

  likesCount: {
    type: Number,
    default: 0,
  },

  reactions: {
    like: {
      type: Number,
      default: 0,
    },
    love: {
      type: Number,
      default: 0,
    },
    haha: {
      type: Number,
      default: 0,
    },
    sad: {
      type: Number,
      default: 0,
    },
    angry: {
      type: Number,
      default: 0,
    },
    wow: {
      type: Number,
      default: 0,
    },
  },

  totalReactions: {
    type: Number,
    default: 0,
  },

  sharesCount: {
    type: Number,
    default: 0,
  },

  savesCount: {
    type: Number,
    default: 0,
  },

  postStatus: {
    type: String,
    enum: [
      'active',
      'deleted',
      'reported',
      'archived',
      'unarhived',
      'withheld',
      'blocked',
      'flagged',
      'banned',
      'muted',
      'verified',
      'unverified',
    ],
    default: 'active',
  },

  visibility: {
    type: String,
    enum: ['public', 'private', 'followers', 'mutual', 'close_friends'],
    default: 'public',
  },

  allowComments: {
    type: Boolean,
    default: true,
  },

  allowLikes: {
    type: Boolean,
    default: true,
  },

  allowReposts: {
    type: Boolean,
    default: true,
  },

  allowShare: {
    type: Boolean,
    default: true,
  },

  allowSave: {
    type: Boolean,
    default: true,
  },

  allowDownload: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

postSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// update reaction
postSchema.methods.updateReaction = function (reaction, isAdd) {
   const likeCount = Number(this.reactions.like) || 0;
   const totalCount = Number(this.totalReactions) || 0;
   if (isAdd) {
     this.reactions[reaction] = likeCount + 1;
     this.totalReactions = totalCount + 1;
   } else {
     this.reactions[reaction] = likeCount - 1;
     this.totalReactions = totalCount - 1;
   }
};

postSchema.index({ caption: 'text', pollQuestion: 'text' });

const Post = mongoose.model('Post', postSchema);

export default Post;
