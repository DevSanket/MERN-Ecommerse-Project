const Category = require('../models/category');

exports.getCategoryById = (req,res,next,id) =>{
    
    Category.findById(id).exec((err,cate) => {
        if(err){
            return res.status(400).json({
                error:"Category not found in DB"
            })
        }

        req.category = cate;
        next();
    })
    
    
};

exports.createCategory = (req,res) => {
    const category = new Category(req.body);
    category.save((err,category) => {
        if(err){
            return res.status(400).json({
                error:"Not able to save category in DB"
            });
        }
        res.json({category});
    })
}

exports.getCategory = (req,res) => {
    return res.json(req.category);
}

exports.getAllCategories = (req,res) => {
    Category.find().exec((err,items) => {
        if(err){
            return res.status(400).json({
                error : "No category was found"
            });
        }
        res.json(items);
    });
};


exports.updateCategory =  (req,res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((err,updatedCategory) => {
        if(err){
            return res.status(400).json({
                error:"Error while update Category"
            })

        }

        res.json(updatedCategory);
    })
}
