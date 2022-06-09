const express = require('express');
const router = express.Router();
const {isSignedIn,isAdmin,isAuthenticated} = require('../controllers/auth');
const { getCategoryById, createCategory, getCategory, getAllCategories, updateCategory } = require('../controllers/category');
const {getUserById} = require('../controllers/user');

//params
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

//actual routes goes here
router.post("/category",isSignedIn,isAuthenticated,isAdmin,createCategory);

//Read Route
router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllCategories);

//Updated Routes
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory);

exports.module = router;