const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = Schema({
    post: {
        type: Schema.Types.ObjectId,
        require: [true, 'El post es obligatorio'],
        ref: 'Post'
    },
    message: {
        type: String,
        require: [true, 'El mensaje es obligatorio'],
    },
    user: {
        type: Schema.Types.ObjectId,
        require: [true, 'El usuario es obligatorio'],
        ref: 'User',
    },
    read: {
        type: Boolean,
        default: false,
    },
}, {
    timestamp: true,
    toJSON: {
        transform: (res, ret) => {
            ret.id = res._id
            delete ret._id
            delete ret.__v
            return ret
          }
    }
}); 

module.exports = mongoose.model('Notification', NotificationSchema);