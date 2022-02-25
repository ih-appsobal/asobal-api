const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = Schema({
    title: {
        type: String,
        require: [true, 'El título es obligatorio'],
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
    },
}); 

module.exports = mongoose.model('Notification', NotificationSchema);