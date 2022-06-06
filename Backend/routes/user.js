const express = require("express");
const router = express.Router();
const {isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth");
const { getUserById, getUser, updateUser } = require("../controllers/user");

router.param("userId",getUserById);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put('/user/:userId',isSignedIn,isAuthenticated,updateUser);
module.exports = router;

