const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = Schema({
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
}); 

module.exports = mongoose.model('Story', StorySchema);