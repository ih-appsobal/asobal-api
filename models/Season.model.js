const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seasonSchema = Schema({
  interval: {
    type: String,
    require: [true, 'El intervalo es obligatorio']
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

seasonSchema.virtual('matches', {
    ref: 'Match',
    localField: 'id',
    foreignField: 'season',
    justOne: false
});

const season = mongoose.model('Season', seasonSchema);

module.exports = season;