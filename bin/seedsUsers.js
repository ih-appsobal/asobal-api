require('dotenv').config();

const User = require('../models/User.model');
const Notification = require('../models/Notification.model');
const Post = require('../models/Post.model')
const posts = require('../data/posts.json');
const mongoose = require('mongoose');
const profiles = require('../data/users.json');
const notificationsMock = require('../data/notifications.json');

require('../config/db.config');

mongoose.connection.once('open', () => {
    console.info(`***Connected to the database ${mongoose.connection.db.databaseName} ***`);

    mongoose.connection.db
        .dropCollection('users')
        .then(() => {`O.o! ${mongoose.connection.db.databaseName} dropped!`})
        .then(() => {
            profiles.forEach(user => {
                new User({
                    ...user
                }).save()
                .then((user) => {
                    posts.forEach(async post => {
                        await new Post({...post})
                            .save()
                            .then(post => {
                                notificationsMock.forEach(notification => {
                                    new Notification({
                                        ...notification,
                                        url: post._id,
                                        user: user.id,
                                    }).save()
                                    .then((notification) => console.log(notification))
                                })
                            })
                      })

                })
            })
        })
        .catch(err => console.error('mongoose', err));
});