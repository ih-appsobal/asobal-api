const express = require('express');
const router = express.Router();
const notificationsController = require('../../controllers/notifications.controller');
const { isAuthenticated } = require('../../middlewares/auth.middleware');

router.post('/new', notificationsController.create);
router.get('/:notificationId', isAuthenticated, notificationsController.userlist);

module.exports = router;