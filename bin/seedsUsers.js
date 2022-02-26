require('dotenv').config();

const User = require('../models/User.model');
const Notification = require('../models/Notification.model');
const Post = require('../models/Post.model')
const posts = require('../data/posts.json');
const mongoose = require('mongoose');
const profiles = require('../data/users.json');
const stories = require('../data/stories.json');
const notificationsMock = require('../data/notifications.json');
const Match = require('../models/Match.model');
const Story = require('../models/Story.model');

require('../config/db.config');

mongoose.connection.once('open', () => {
    console.info(`***Connected to the database ${mongoose.connection.db.databaseName} ***`);

    mongoose.connection.db
        .dropCollection('users')
        .then(() => {`O.o! ${mongoose.connection.db.databaseName} dropped!`})
        .then(() => {
            User.create(profiles)
                .then(users => {
                    users.forEach(user => {
                        posts.forEach(async post => {
                            await new Post({...post})
                                .save()
                                .then(post => {
                                    notificationsMock.forEach(notification => {
                                        new Notification({
                                            ...notification,
                                            post: post._id,
                                            user: user.id,
                                        }).save()
                                        .then((notification) => {})
                                    })
                                })
                          })
                    })

                    Match.find()
                    .then(matches => {
                        matches.forEach(match => {
                            const pickUser = () => users[Math.floor(Math.random() * users.length)]

                            Story.create(stories.map(story => ({
                                ...story,
                                match: match._id,
                                user: pickUser()
                            })))
                            .then(stories => console.log('stories'))
                            
                        })
                    })
                })
        })
        .catch(err => console.error('mongoose', err));
});