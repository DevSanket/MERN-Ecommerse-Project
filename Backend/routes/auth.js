const express = require('express');
const { signout, signUp } = require('../controllers/auth');
const router = express.Router();
const {check} = require('express-validator');
// const User = require('../models/user');

router.post('/signup',[
    check("name","name should be at least 3 Characters").isLength({min:3}),
    check("email","email is required").isEmail(),
    check("password","password should be at least 3 char").isLength({min:3})
],signUp)
router.get('/signout',signout);

module.exports = router;