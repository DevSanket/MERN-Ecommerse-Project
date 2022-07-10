const express = require('express');
const router = express.Router();


const {getProductById} = require('../controllers/product');
const {isSignedIn,isAdmin,isAuthenticated} = require('../controllers/auth');
const {getUserById} = require('../controllers/user');
 

router.param("userId",getUserById);
router.param("productId",getProductById);

module.exports = router;