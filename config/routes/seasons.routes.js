const express = require('express');
const router = express.Router();
const seasonsController = require('../../controllers/seasons.controller');

router.get('/', seasonsController.getAll);
router.get('/main', seasonsController.getMainSeason);
router.get('/:seasonId', seasonsController.getById);

module.exports = router;