const express = require('express');
const jwtController = require('../controllers/jwtController')


const router = express.Router();


router.post('/jwt', jwtController.setJwt);

module.exports = router;