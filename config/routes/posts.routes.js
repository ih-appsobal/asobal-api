const express = require('express');
const router = express.Router();

const postController = require('../../controllers/posts.controller');

router.post('/new', postController.create);
router.get('/list', postController.list);
router.get('/:postId', postController.onePost);

module.exports = router;