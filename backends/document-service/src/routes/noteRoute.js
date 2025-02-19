const noteController = require('../controller/noteController');
const express = require('express');
const router = express.Router();


router.post('/', noteController.addNote);
router.get('/:id', noteController.getNotes);
router.delete('/:id', noteController.deleteNote);

module.exports = router;