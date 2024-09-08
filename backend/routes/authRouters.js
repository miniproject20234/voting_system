const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

// User registration with OTP
router.post('/register', authController.register_post);




// Login
router.post('/login', authController.login_post);

// Retrieve user details by email
router.get('/user', authController.getUserByEmail);

module.exports = router;
