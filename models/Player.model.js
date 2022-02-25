const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  image: {
    type: String,
    required: true,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  rrss: [{
    twitter: String,
    instagram: String,
    facebook: String,
    youtube: String
  }],
  country: {
    type: String,
    required: true
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true
  }
}, {
  timestamps:true,
  toJSON: {
    transform: (res, ret) => {
      ret.id = res._id
      delete ret._id
      delete ret.__v
      return ret
    }
  }
});

const player = new mongoose.model('player', playerSchema);

module.exports = player;