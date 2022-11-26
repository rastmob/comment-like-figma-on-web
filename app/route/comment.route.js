const express = require('express');
const router = express.Router();
const commentController = require('../controller/comment.controller.js');

router.get('/', commentController.printCommentHello)


module.exports = router;