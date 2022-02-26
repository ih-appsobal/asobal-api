require('dotenv').config();
const Club = require('../models/Club.model')
const mongoose = require('mongoose')
const clubs = require('../data/clubs.json')


require('../config/db.config');

mongoose.connection.once('open', () => {
  console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);

  mongoose.connection.db
    .dropDatabase()
      .then(() => `O.o! ${mongoose.connection.db.databaseName} dropped!`)
      .then(() => {
        clubs.forEach(club => {
          new Club({
            ...club
          }).save()
          .then((club) => console.log(`club ${club.name} created`))
      })
  })
  .catch(err => console.error('mongoose', err))
})