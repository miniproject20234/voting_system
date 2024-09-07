const express = require('express');
const router = express.Router();
const authController=require('../controllers/authController');

router.get('/user', authController.getUserByEmail);

router.post('/register',authController.register_post);

router.post('/login',authController.login_post);

// router.post('/google-signup',authController.google_signup);

// router.post('/google-login',authController.google_login);



module.exports = router;