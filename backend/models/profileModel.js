const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

  platform: {
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true
  },

  totalSolved: Number,
  easy: Number,
  medium: Number,
  hard: Number,

  pic: String
});

const profileModel = mongoose.model('profile',profileSchema);

module.exports = profileModel;