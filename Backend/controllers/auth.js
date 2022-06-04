const User = require("../models/user");
const {validationResult} = require('express-validator');

const signUp = (req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({error:errors.array()[0].msg});
    }

    const user = new User(req.body);
    user.save((err,user) => { 
        if(err){
            return res.status(400).json({
                err:"Not Able to save User in DB"
            });
        }
        res.json({
            name:user.name,
            email:user.email,
            id:user._id
        });
    })
}

const signout = (req,res) => {
    res.json({
        msg : "sign out works"
    })
}

module.exports = {signout,signUp}