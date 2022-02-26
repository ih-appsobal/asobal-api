const express = require('express');
const router = express.Router();
const matchesController = require('../../controllers/matches.controller');

router.get('/', matchesController.getAll);
router.get('/fixture/:fixture', matchesController.getByFixture);
router.get('/:matchId', matchesController.getById);

module.exports = router;