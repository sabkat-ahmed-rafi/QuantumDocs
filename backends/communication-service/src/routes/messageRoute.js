const messageController = require('../controllers/messageController');
const express = require('express');

const router = express.Router();

router.get("/getMessages/:groupId", messageController.getAllMessages);

module.exports = router