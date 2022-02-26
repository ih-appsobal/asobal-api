const express = require('express');
const router = express.Router();

const postController = require('../../controllers/posts.controller');

router.post('/create', postController.create);
router.get('/', postController.getAll);
router.get('/:postId', postController.getById);

module.exports = router;