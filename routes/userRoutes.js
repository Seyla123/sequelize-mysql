const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

router.post('/signup', authController.signup);
router.post('/login', authController.login);	
router.post('/forgetPassword', authController.forgetPassword);	
router.post('/resetPassword/:token', authController.resetPassword);

router.route('/').get(authController.protect, userController.getAllUsers);
//router.route('/:id').get(userController.getUser);
router.route('/test').get(userController.tesing);

module.exports = router;