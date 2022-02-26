const express = require('express');
const router = express.Router();
const matchesController = require('../../controllers/matches.controller');

router.get('/', matchesController.getAll);
router.get('/:matchId', matchesController.getById);
router.get('/fixture/:fixture', matchesController.getByFixture);

module.exports = router;