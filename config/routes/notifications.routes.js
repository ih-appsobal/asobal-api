const express = require('express');
const router = express.Router();
const notificationsController = require('../../controllers/notifications.controller');

router.post('/new', notificationsController.create);

module.exports = router;