const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const imageController = require('../controllers/authController.js');

// User registration with OTP
router.post('/register', authController.register_post);

// Login
router.post('/login', authController.login_post);

// Retrieve user details by email
router.get('/user', authController.getUserByEmail);

// Update user details
router.post("/update-profile/:id", authController.update_profile);

// Upload user profile image
router.post("/upload-profile-image", imageController.uploadProfileImage);

// Forgot password
router.post('/forgot-password', authController.forgot_password);

// Reset password
router.post('/reset-password/:id/:token', authController.reset_password);

module.exports = router;
