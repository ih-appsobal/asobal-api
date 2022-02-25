const express = require('express');
const router = express.Router();

// Basic
router.get('/', (req, res, next) => res.json({ response: "ok" }));

module.exports = router;