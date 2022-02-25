const createError = require('http-errors')
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