const mongoose = require('mongoose');
const countries = require('../constants/countries')
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  image: {
    type: String,
    required: true,
    default: ''
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
  country: {
    type: String,
    enum: countries,
    required: [true, 'El país es requerido']
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: [true, 'El club es requerido']
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

const player = new mongoose.model('Player', playerSchema);

module.exports = player;