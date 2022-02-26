require('dotenv').config();

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const createError = require('http-errors');
const logger = require('morgan');
const express = require('express');
const cors = require('cors');

require('./config/db.config')

const app = express();

/* Middlewares */

app.use(express.json());
app.use(logger('dev'));
app.use(cors())

/* Routes */

const routes = require('./config/routes.config');
app.use('/api', routes);

const userRoutes = require('./config/routes/users.routes');
app.use('/api/users', userRoutes);

const clubsRoutes = require('./config/routes/clubs.routes');
app.use('/api/clubs', clubsRoutes);


//notification routes
const notificationRoutes = require('./config/routes/notifications.routes');
app.use('/api/notifications', notificationRoutes);

const matchesRoutes = require('./config/routes/matches.routes');
app.use('/api/matches', matchesRoutes);

const playersRoutes = require('./config/routes/players.routes');
app.use('/api/players', playersRoutes);

const seasonsRoutes = require('./config/routes/seasons.routes');
app.use('/api/seasons', seasonsRoutes);

//posts routes
const postRoutes = require('./config/routes/posts.routes');
app.use('/api/posts', postRoutes);


/* Handle Errors */

app.use((req, res, next) => {
  next(createError(404, 'Route not found'));
});

app.use((error, req, res, next) => {
  if (error instanceof mongoose.Error.ValidationError) error = createError(400, error)
  else if (error instanceof mongoose.Error.CastError) error = createError(404, 'Resource not found')
  else if (error instanceof jwt.JsonWebTokenError) error = createError(401, error)
  else if (error.message.includes('E11000')) error = createError(400, 'Already exists')
  else if (!error.status) error = createError(500, error)

  if (error.status >= 500) {
    console.error(error);
  }

  const data = {}
  data.message = error.message;
  data.errors = error.errors ? 
    Object.keys(error.errors)
      .reduce((errors, key) => ({ ...errors, [key]: error.errors[key].message || error.errors[key] }), {}) :
    undefined;

  res.status(error.status).json(data)
});

const port = Number(process.env.PORT || 3001);

app.listen(port, () => {
  console.log(`Ready! Listen on port ${port}`);
})