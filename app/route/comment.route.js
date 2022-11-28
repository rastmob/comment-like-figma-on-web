const express = require('express');
const router = express.Router();
const commentController = require('../controller/comment.controller.js');

router.post('/get', commentController.getComments)
router.post('/add', commentController.createNewComment)


module.exports = router;