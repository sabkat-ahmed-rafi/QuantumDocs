const documentController = require('../controller/documentController');
const verifyToken = require('../middleware/verifyToken');
const express = require('express');
const router = express.Router();


router.post('/', verifyToken, documentController.create);

module.exports = router;