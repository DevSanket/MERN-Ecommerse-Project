const express = require('express');
const router = express.Router();
const {isSignedIn,isAdmin,isAuthenticated} = require('../controllers/auth');
const { getCategoryById, createCategory, getCategory, getAllCategories, updateCategory, removeCategory } = require('../controllers/category');
const {getUserById} = require('../controllers/user');

//params
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

//actual routes goes here
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory);

//Read Route
router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllCategories);

//Updated Routes
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory);

// delete Routes 
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,removeCategory);


module.exports = router;