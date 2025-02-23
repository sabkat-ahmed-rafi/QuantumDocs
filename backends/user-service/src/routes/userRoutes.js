const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken')
const router = express.Router();

router.post('/', userController.createUser);
router.get('/search', userController.searchUsers);
router.patch('/addToFavourite', userController.addToFavourite);
router.delete('/removeFavourite', userController.addToFavourite);
router.get('/:uid', verifyToken, userController.getUserById);


module.exports = router;    