
var express = require('express');
var router = express.Router();
const ConnectController = require('../controller/ConnectController')


router.post('/add', ConnectController.addConnect)
router.get('/get', ConnectController.getConnect)

module.exports = router;