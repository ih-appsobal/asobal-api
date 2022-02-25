const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = Schema({
    image: {
        type: String,
        require: [true, 'image-required'],
    },
    user: {
        type: Schema.Types.ObjectId,
        require: [true, 'user-required'],
        ref: 'User',
    },
    text: {
        type: String,
        require: [true, 'text-required'],
    },
}); 

module.exports = mongoose.model('Story', StorySchema);