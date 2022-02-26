const express = require('express');
const router = express.Router();
const playersController = require('../../controllers/players.controller');

router.get('/', playersController.getAll);
router.get('/:playerId', playersController.getById);

module.exports = router;