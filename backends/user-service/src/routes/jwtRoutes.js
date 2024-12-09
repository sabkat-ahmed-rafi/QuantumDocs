const express = require('express');
const jwtController = require('../controllers/jwtController')


const router = express.Router();


router.post('/setJwt', jwtController.setJwt);
router.get('/clearJwt', jwtController.clearJwt);

module.exports = router;