const documentController = require('../controller/documentController');
const express = require('express');
const router = express.Router();


router.post('/', documentController.create);
router.get('/:id', documentController.get);
router.put('/:id', documentController.update);
router.patch('/updateTitle/:id', documentController.updateTitle);

module.exports = router;