require('dotenv').config();
const Club = require('../models/Club.model')
const Post = require('../models/Post.model')
const mongoose = require('mongoose')
const clubs = require('../data/clubs.json');
const posts = require('../data/posts.json');
const Match = require('../models/Match.model');
const Season = require('../models/Season.model');


require('../config/db.config');

const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const randomIndex = (arr) => {
  return arr[Math.floor(Math.random()*arr.length)]
}


mongoose.connection.once('open', () => {
  console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);

  mongoose.connection.db
    .dropDatabase()
      //.then(() => `O.o! ${mongoose.connection.db.databaseName} dropped!`)
      .then(() => {
        posts.forEach(async post => {
          await new Post({...post}).save()
        })
      //   clubs.forEach(club => {
      //     new Club({
      //       ...club
      //     }).save()
      //     .then((club) => {
      //       return Club.find()
      //         .then(clubs => {
      //           return new Season({interval: "2021/2022"}).save().then((season) => {
      //             for (i = 0; i < 100; i++) {
      //                 let randomClubIndex = Math.floor(Math.random() * clubs.length)

      //                 new Match({
      //                   fixture: Math.floor(Math.random() * 7 + 1),
      //                   date: randomDate(new Date(), new Date(2022, 5, 5)),
      //                   result: randomIndex(['1', 'X', '2']),
      //                   local: {
      //                     club: clubs[randomClubIndex],
      //                     cards: Array.from({length: Math.random() * 5 + 1}, () => ({
      //                       color: randomIndex(['Amarilla', 'Roja', 'Azul']),
      //                       minute:  Math.floor(Math.random() * 60 + 1)
      //                     })),
      //                     goals: Array.from({length: Math.random() * 15 + 1}, () => Math.floor(Math.random() * 60)),
      //                     fouls: Array.from({length: Math.random() * 15 + 1}, () => Math.floor(Math.random() * 60)),
      //                   },
      //                   foreign: {
      //                     club: clubs[clubs.length - randomClubIndex - 1],
      //                     cards: Array.from({length: Math.random() * 5 + 1}, () => ({
      //                       color: randomIndex(['Amarilla', 'Roja', 'Azul']),
      //                       minute:  Math.floor(Math.random() * 60 + 1)
      //                     })),
      //                     goals: Array.from({length: Math.random() * 15 + 1}, () => Math.floor(Math.random() * 60)),
      //                     fouls: Array.from({length: Math.random() * 15 + 1}, () => Math.floor(Math.random() * 60)),
      //                   },
      //                   minute:  Math.floor(Math.random() * 60 + 1),
      //                   season: season._id
      //                 }).save()
      //                 .then(match => console.log(match.local.cards))
      //             }
      //         })
      //       })
      //     })
      // })
  })
  .catch(err => console.error('mongoose', err))
})

