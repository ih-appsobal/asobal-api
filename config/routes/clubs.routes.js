const express = require('express');
const router = express.Router();
const clubsController = require('../../controllers/clubs.controller');

router.get('/', clubsController.getAll);
router.get('/:clubId', clubsController.getById);

module.exports = router;