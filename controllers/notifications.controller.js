const Notification = require('../models/Notification.model');

module.exports.create = async (req, res, next) => {
    try {
        const notification = new Notification(req.body);

        await notification.save();

        res.status(201).json(notification);
    } catch (error) {
        next(error);
    }
};

//filter by user
module.exports.getAllByUserId = async (req, res, next) => {
    try {
        const notification = await Notification.find({ user: req.currentUser }).sort({ read: 0 });

        res.status(200).json(notification);
    } catch (error) {
        next(error);
    };
};

module.exports.update = async (req, res, next) => {
    try {
        const notification = await Notification
            .findByIdAndUpdate(req.params.notificationId, { read: true }, { new: true });
        
        res.status(200).json(notification);
    } catch (err) {
        next(err);
    }
}

module.exports.delete = async (req, res, next) => {
    try {
        await Notification.findByIdAndRemove(req.params.notificationId);
        
        res.status(204).json();
    } catch (err) {
        next(err);
    }
}