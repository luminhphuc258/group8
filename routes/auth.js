const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.getIndex);

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

// === updated code 
router.post('/signup', authController.postSignup);

router.post('/logout', authController.postLogout);

module.exports = router;
