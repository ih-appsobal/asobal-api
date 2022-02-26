const express = require('express');
const router = express.Router();
const notificationsController = require('../../controllers/notifications.controller');
const { isAuthenticated } = require('../../middlewares/auth.middleware');

router.post('/create', notificationsController.create);
router.get('/', isAuthenticated, notificationsController.getByUserId);

module.exports = router;