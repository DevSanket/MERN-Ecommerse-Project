const Product = require('../models/product');


exports.getProductById = (req,res,next,id) => {
    //to get a perticular product detail
    Product.findById(id)
    .populate("category")
    .exec((err,product) => {
        if(err){
            return res.status(400).json({
                error : "Product not found"
            });

        }
        req.product = product;
        next();
    })
}

