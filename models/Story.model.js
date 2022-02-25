const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = Schema({
    image: {
        type: String,
        require: [true, 'La imagen es requerida'],
    },
    user: {
        type: Schema.Types.ObjectId,
        require: [true, 'El usuario es requerido'],
        ref: 'User',
    },
    text: {
        type: String,
        require: [true, 'El texto de la story es requerido'],
    },
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

const story = mongoose.model('Story', storySchema);

module.exports = story;