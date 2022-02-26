const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

module.exports.register = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (user) {
      next(createError(400, { errors: { email: 'Ya existe un usuario con este correo electrónico' } }))
    } else {
      const newUser = await User.create(req.body)
      res.status(201).json(newUser)
    }
  } catch(err) {
    next(err)
  }
}

module.exports.authenticate = (req, res, next) => {
  const { email, password } = req.body

  User.findOne({ email })
    .then(user => {
      if (!user) {
        // Error if no user
        next(createError(404, { errors: { email: 'Email o contraseña incorrectos' }}))
      } else {
        return user.checkPassword(password)
          .then(match => {
            if (!match) {
              //Error if no password
              next(createError(404, { errors: { email: 'Email o contraseña incorrectos' }}))
            } else {
              // JWT generation - only id is passed
              res.json({
                access_token: jwt.sign(
                  { id: user._id },
                  process.env.JWT_SECRET || 'changemeplease:v',
                  {
                    expiresIn: '1d'
                  }
                )
               })
            }
          })
      }
    })

    .catch(err => next(err))
}

module.exports.getInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.currentUser)

    if (user) {
      res.status(200).json(user)
    } else {
      next(createError(404))
    }
  } catch(err) {
    next(err)
  }

}

module.exports.addClub = (req, res, next) => {
  User.findByIdAndUpdate(req.currentUser, { club: req.body.club })
    .then(() => res.status(204))
    .catch(next)
}