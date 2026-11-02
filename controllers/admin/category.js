const Category = require("../../models/categories");
const multer = require("multer");
const path = require("path");

// Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/category");
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

exports.uploadCategory = upload.single("image");

exports.addCategory = async (req, res) => {

    try {

        const user_id = req.user.id;
        const { cat_name, status } = req.body;

        const image = req.file ? req.file.filename : "";

        if (!cat_name) {
            return res.status(400).json({success: false,message: "Category name is required"});
        }

        const slug = cat_name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
        const categoryExist = await Category.findOne({ slug });

        if (categoryExist) {
            return res.status(400).json({success: false,message: "Category already exists"});
        }

        const category = await Category.create({user_id,cat_name,slug,image,status});

        return res.status(201).json({success: true,message: "Category added successfully",data: category});

    } catch (err) {

        return res.status(500).json({success: false,message: err.message});
    }
};

exports.ListCategory = async (req, res) => {
    try {


      const listCategory = await Category.find({ status: 1 }).select("_id cat_name").sort({ _id: -1 });

        if (listCategory.length === 0) {
            return res.status(404).json({success: false,message: "Category not found"});
        }

        return res.status(200).json({success: true,message: "Category list fetched successfully",data: listCategory});

    } catch (err) {
        return res.status(500).json({success: false,message: err.message});
    }
};