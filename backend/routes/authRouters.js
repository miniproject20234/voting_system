const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

// User registration with OTP
router.post('/register', authController.register_post);

router.post('/forgot-password',authController.forgot_password);

router.post('/reset-password/:id/:token',authController.reset_password);

// Login
router.post('/login', authController.login_post);

// Retrieve user details by email
router.get('/user', authController.getUserByEmail);

module.exports = router;
