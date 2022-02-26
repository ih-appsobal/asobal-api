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
module.exports.getByUserId = async (req, res, next) => {
    try {
        const notification = await Notification.find({ user: req.currentUser});

        res.status(200).json(notification);
    } catch (error) {
        next(error);
    };
};