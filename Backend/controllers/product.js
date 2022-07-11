const Product = require('../models/product');
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");




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


//creating Product

exports.createProduct = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file) => {
        if(err){
            return res.status(400).json({
                error : "problem with Image"
            })
        }

        //destructure the field
        const {price,name,description,category,stock} = fields;
        if(!name || !description || !price || !category || !stock){
            return res.status(400).json({
                error : "Please include all fields"
            });
        }
        let product = new Product(fields);

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"File Size too big!"
                })
            }

            product.photo.data = fs.readFileSync(file.photo.filepath)
            product.photo.contentType = file.photo.mimetype
        }

        //save to the DB
        product.save((err,product) => {
            if(err){
                res.status(400).json({
                    error:"Saving tshirt in DB failed"
                })
            }
            return res.json(product);
        })

    })
}



exports.getProduct = (req,res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

exports.photo = (req,res,next) => {
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

exports.deleteProduct = (req,res) => {
    let product = req.product;
    product.remove((err,deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error : "Failed to delete Product"
            });
        }

        return  res.json({
            message : "Deleted Product Successfully",
            deletedProduct
        });
    })
}

exports.updateProduct = () => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file) => {
        if(err){
            return res.status(400).json({
                error : "problem with Image"
            })
        }

       //updation code
        let product = req.product;
        product = _.extend(product,fields)
        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"File Size too big!"
                })
            }

            product.photo.data = fs.readFileSync(file.photo.filepath)
            product.photo.contentType = file.photo.mimetype
        }

        //save to the DB
        product.save((err,product) => {
            if(err){
                res.status(400).json({
                    error:"Updation tshirt is failed"
                })
            }
            return res.json(product);
        })

    })
}

//get all product

exports.getAllProducts = (req,res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) :  8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,products) => {
        if(err){
            return res.status(400).json({
                error:"No Products Found"
            });
        }

        return res.json(products);
    })
}


exports.updateStock = (req,res,next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne :{
                filter : {_id:prod._id},
                update:{$inc:{stock:-prod.count,sold: +prod.count}}
            }
        }
    })
    Product.bulkWrite(myOperations,{},(err,products) => {
        if(err){
            return res.status(400).json({
                error:"Bulk Operation fails"
            })
        }
        next();
    })
}

exports.getAllUniqueCategories = (req,res) => {
    Product.distinct("category",{},(err,category) => {
        if(err){
            return res.status(400).json({
                error:"No Category Found"
            });
        }

        res.json(category);
    })


}