const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/users.controller');
const { isAuthenticated } = require('../../middlewares/auth.middleware');


// Auth routes
router.post('/login', usersController.authenticate)
router.post('/', usersController.register)
router.get('/me', isAuthenticated, usersController.getInfo)

router.post('/register', usersController.register)
router.patch('/me/club', isAuthenticated, usersController.addClub)

module.exports = router;