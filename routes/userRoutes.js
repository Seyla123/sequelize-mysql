const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

router.post('/signup', authController.signup);
router.get('/login', authController.login);	

router.route('/').get(userController.getAllUsers);
router.route('/:id').get(userController.getUser);

module.exports = router;