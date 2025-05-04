const express = require('express');
const jwtController = require('../controllers/jwtController')


const router = express.Router();


router.post('/setJwt', jwtController.setJwt);

module.exports = router;