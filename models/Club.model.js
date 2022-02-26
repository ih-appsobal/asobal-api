const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clubSchema = new Schema({
  logo: {
    type: String,
    required: [true, 'El logo es requerido']
  },
  name: {
    type: String,
    required: [true, 'El nombre es requerido']
  },
  rrss: {
    twitter: String,
    instagram: String,
    facebook: String,
    youtube: String
  },
  address: {
    type: String,
    required: [true, 'La dirección es requerida']
  },
  background: {
    type: String,
    default: String
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

clubSchema.virtual('players', {
  ref: 'Player',
  localField: 'id',
  foreignField: 'club',
  justOne: false
});

clubSchema.virtual('matches', {
  ref: 'Matches',
  localField: 'id',
  foreignField: 'club',
  justOne: false
});

const club = new mongoose.model('Club', clubSchema);

module.exports = club;