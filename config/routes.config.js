const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts.controller');

// Basic
router.get('/', (req, res, next) => res.json({ response: "ok" }));

//posts
router.post('/post', postController.create);
router.get('/posts', postController.list);

module.exports = router;