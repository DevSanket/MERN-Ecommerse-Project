const express = require('express');
const { signout, signUp, signIn, isSignedIn } = require('../controllers/auth');
const router = express.Router();
const {check} = require('express-validator');
// const User = require('../models/user');

router.post('/auth/signup',[
    check("name","name should be at least 3 Characters").isLength({min:3}),
    check("email","email is required").isEmail(),
    check("password","password should be at least 3 char").isLength({min:3})
],signUp);

router.post('/auth/signin',[
    check("email","email is required").isEmail(),
    check("password","password is required").isLength({min:1})
],signIn)

router.get('/auth/signout',signout);

router.get("/testroute",isSignedIn,(req,res) => {
    return res.send("a protected route");
});

module.exports = router;