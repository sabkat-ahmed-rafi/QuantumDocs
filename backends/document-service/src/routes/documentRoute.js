const documentController = require('../controller/documentController');
const express = require('express');
const router = express.Router();


router.post('/', documentController.create);
router.patch('/giveAccess', documentController.giveAccess);
router.get('/:id', documentController.get);

module.exports = router;