const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
    title: {
        type: String,
        require: [true, 'title-required']
    }, 
    content: {
        type: String,
        require: [true, 'content-required']
    },
    media: {
        type: String,
        require: [true, 'media-required']
    },
    visible: {
        type: Boolean,
        require: [true, 'visible-required']
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

module.exports = mongoose.model('Post', PostSchema);