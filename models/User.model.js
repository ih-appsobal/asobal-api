const mongoose = require('mongoose');

const CCAA = require('../constants/ccaa');
const COUNTRIES = require('../constants/countries');

const EMAIL_PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Introduce un correo electrónico'],
    match: [EMAIL_PATTERN, 'Introduce un correo electrónico válido'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Introduce una contraseña'],
    match: [PASSWORD_PATTERN, 'Introduce una contraseña válida'],
  },
  name: {
    type: String,
    required: [true, 'Introduce un nombre']
  },
  country: {
    required: [true, 'Introduce tu país'],
    type: String,
    enum: COUNTRIES
  },
  ccaa: {
    type: String,
    enum: CCAA,
  },
});

userSchema.pre('save', function(next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.hash(user.password, SALT_ROUNDS)
      .then((hash) => {
        user.password = hash
        next()
      })
      .catch(err => next(err))
  } else {
    next()
  }
})

userSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema);

module.exports = User;