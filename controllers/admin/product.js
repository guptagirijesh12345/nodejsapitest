const Product = require("../../models/Product");
const multer = require("multer");
const path = require("path");

// Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/product");
    },
    filename: (req, file, cb) => {

        const originalName = file.originalname.replace(/\s+/g, "-");

        const fileName = Date.now() + "-" + originalName;

        cb(null, fileName);
    }
});

// Filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};

// Upload Middleware
const upload = multer({storage,fileFilter,limits: {
        fileSize: 5 * 1024 * 1024
    }
});

exports.uploadProduct= upload.single("image");

exports.addProduct = async (req, res) => {

    try {
        const user_id = req.user.id;
        const {product_name,mrp,discount,description,category_id,quantity}= req.body;
        const stock  = req.body.quantity;
        const slug = product_name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
        
        const checkSlug = await Product.findOne({slug});
        
        if(checkSlug){
           return res.status(400).json({success: false,message: "product already exists"});
        }

        const productExist = await Product.findOne({user_id,category_id,slug});        
        if (productExist) {
           
            return res.status(400).json({success: false,message: "product already exists"});
        }
        
// Calculate Discount
const discountRs = (Number(mrp) * Number(discount)) / 100;
const price = Number(mrp) - discountRs;

// Save Product
const saveProduct = await Product.create({user_id,category_id,product_name,slug,quantity,
    stock,mrp,discount,price,description,image: req.file ? req.file.filename : null});

   return res.status(201).json({success: true,message: "Product added successfully",data: saveProduct});

    } catch (err) {
        return res.status(500).json({success: false,message: err.message});
    }
};


exports.listProduct = async (req, res) => {
    try {

    const { category_id } = req.query;

        if(category_id){

            const products = await Product.find().sort({ _id: -1 });

            return res.status(200).json({success: true,message: "Product list fetched successfully",
            data: products
        });
        }

        const products = await Product.find({category_id}).sort({ _id: -1 });

        if (products.length === 0) {
            return res.status(404).json({success: false,message: "No products found"
            });
        }

        return res.status(200).json({success: true,message: "Product list fetched successfully",
            data: products
        });

    } catch (err) {
        return res.status(500).json({success: false,message: err.message
        });
    }
};