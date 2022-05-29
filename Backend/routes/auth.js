const express = require('express');
const { signout, signUp } = require('../controllers/auth');
const router = express.Router();

router.post('/signup',signUp)
router.get('/signout',signout);

module.exports = router;