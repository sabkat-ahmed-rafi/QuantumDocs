const documentController = require('../controller/documentController');
const verifyToken = require('../middleware/verifyToken');
const express = require('express');
const router = express.Router();


router.post('/', verifyToken, documentController.create);
router.get('/:id', documentController.get);
router.put('/:id', documentController.update);
router.patch('/updateTitle/:id', documentController.updateTitle);

module.exports = router;