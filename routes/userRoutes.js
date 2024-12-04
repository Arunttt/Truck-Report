const UserController = require('../controller/UserController');
const express = require('express');
const router = express.Router();

router.post('/userRegister',UserController.register);
router.post('/userLogin',UserController.login);

module.exports = router;