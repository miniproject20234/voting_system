const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const imageController = require('../controllers/imageController');
const { authenticate } = require('passport');

// Registration route
router.post('/register', authController.register_post);

// Login route
router.post('/login', authController.login_post);

// Get user details by email
router.get('/user', authController.getUserByEmail);

// Upload profile image route
router.post('/upload-image', imageController.uploadProfileImage);

// Forgot password route
router.post('/forgot-password', authController.forgot_password);

// Reset password route
router.post('/reset-password/:id/:token', authController.reset_password);

router.post('/verify_password',authController.verify_password);

module.exports = router;
