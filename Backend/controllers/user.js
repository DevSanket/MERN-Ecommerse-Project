const User = require("../models/User");

exports.getUserById = (req,res,next,id) => {
    User.findById(id).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error:"No user found"
            })
        }

        req.profile = user
        next();
    })
}

exports.getUser = (req,res) => {
    //Todo get back here for password
    return res.json(req.profile);
}