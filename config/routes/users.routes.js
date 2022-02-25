const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/users.controller');

// Auth routes
router.post('/login', usersController.authenticate)
router.post('/users', usersController.register)

module.exports = router;