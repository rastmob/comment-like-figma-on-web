const express = require('express');
const router = express.Router();
const indexController = require('../controller/index.controller.js');
router.get('/', indexController.helloMessage)


module.exports = router;