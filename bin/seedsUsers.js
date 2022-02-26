require('dotenv').config();

const User = require('../models/User.model');
const Notification = require('../models/Notification.model');
const mongoose = require('mongoose');
const profiles = require('../data/users.json');
const notificationsMock = require('../data/notifications.json');

require('../config/db.config');

mongoose.connection.once('open', () => {
    console.info(`***Connected to the database ${mongoose.connection.db.databaseName} ***`);

    mongoose.connection.db
        .dropCollection('notifications')
        .then(() =>{
            `O.o! ${mongoose.connection.db.databaseName} dropped!`
            return mongoose.connection.db
            .dropCollection('users')
            })
        .then(() => {
            `O.o! ${mongoose.connection.db.databaseName} dropped!`
            profiles.forEach(user => {
                new User({
                    ...user
                }).save()
                .then((user) => {
                    notificationsMock.forEach(notification => {
                        new Notification({
                            ...notification,
                            user: user.id,
                        }).save()
                        .then((notification) => console.log(notification))
                    })
                })
            })
        })
        .catch(err => console.error('mongoose', err));
});