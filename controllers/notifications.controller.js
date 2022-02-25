const createError = require('http-errors');
const Notification = require('../models/notification.model');

module.exports.create = async (req, res, next) => {
    try {
        const notification = new Notification(req.body);

        await notification.save();

        res.status(200).json(notification);
    } catch (error) {
        next(error)
        console.log(error.message)
    }
};

//filter by user
module.exports.userlist = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}