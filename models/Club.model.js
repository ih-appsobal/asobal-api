const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clubSchema = new Schema({
  logo: {
    type: String,
    required: true
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
  address: {
    type: String,
    required: true
  },
  background: String
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

clubSchema.virtual('players', {
  ref: 'Player',
  localField: 'id',
  foreignField: 'Club',
  justOne: false
});

const club = new mongoose.model('club', clubSchema);

module.exports = club;