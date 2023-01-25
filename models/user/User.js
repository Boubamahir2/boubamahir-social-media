import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import models from '../index.js';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: [3, 'First name must be at least 3 characters.'],
      maxlength: [20, 'First name must not be more than 20 characters.'],
      required: [true, 'Please enter a first name.'],
    },
    lastName: {
      type: String,
      minlength: [3, 'last name must be at least 3 characters.'],
      maxlength: [20, 'last name must not be more than 20 characters.'],
      required: [true, 'Please enter a last name.'],
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    username: {
      type: String,
      required: [true, 'Please enter an username.'],
      minlength: [3, 'Username must be at least 3 characters.'],
      maxlength: [20, 'Username must not exceeds 20 characters.'],
    },

    nameChangedAt: Date,

    phone: String,

    countryCode: String,

    phoneVerified: {
      type: Boolean,
      default: false,
    },

    phoneChangedAt: Date,
    showLastSeen: Date,

    password: {
      type: String,
      required: [true, 'Please enter a password.'],
      minlength: [6, 'password must be at least 6 characters.'],
      select: false,
    },

    picturePath: {
      type: String,
      default: '',
    },

    passwordChangedAt: Date,

    avatar: {
      public_id: String,
      url: String,
    },

    gender: String,

    dob: String,

    about: String,

    profession: {
      type: String,
      maxlength: 100,
    },

    location: {
      type: String,
    },

    website: {
      type: String,
    },

    postsCount: {
      type: Number,
      default: 0,
    },

    followersCount: {
      type: Number,
      default: 0,
    },

    followingCount: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin', 'moderator'],
      default: 'user',
    },
    accountStatus: {
      type: String,
      enum: [
        'active',
        'inactive',
        'deactivated',
        'suspended',
        'blocked',
        'deleted',
        'banned',
        'reported',
        'pending',
        'withheld',
        'restricted',
      ],
      default: 'active',
    },

    friends: {
      type: Array,
      default: [],
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verifiedAt: Date,

    verificationRequestedAt: Date,

    isValid: {
      type: Boolean,
      default: false,
    },

    isPrivate: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    showOnlineStatus: {
      type: Boolean,
      default: true,
    },

    lastSeen: {
      type: Date,
      default: null,
    },

    accountCreatedIp: String,

    createdAt: {
      type: Date,
      default: Date.now,
    },
    verificationToken: String,
    isVerified: {
      type: Boolean,
      default: false,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },

  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  // console.log(this.modifiedPaths())
  if (!this.isModified('password')) {
    this.updatedAt = Date.now();
    next();
  }
  this.updatedAt = Date.now();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// UserSchema.methods.createJWT = function () {
//   return jwt.sign(
//     { userId: this._id, name: this.username, role: this.role },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: process.env.JWT_LIFETIME,
//     }
//   );
// };
UserSchema.methods.createJWT = async function () {
  const token = jwt.sign(
    { userId: this._id, name: this.username, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );

  const decodedData = jwt.decode(token);
  
  const authToken = await models.AuthToken.create({
    token: token,
    user: this._id,
    expiresAt: decodedData.exp,
  });

  return authToken;
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

UserSchema.index({ username: 'text', firstName: 'text', lastName: 'text' });
const User = mongoose.model('User', UserSchema);
export default User;
