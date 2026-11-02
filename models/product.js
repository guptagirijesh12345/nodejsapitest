const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    // Admin/Vendor ID
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // Category ID
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        required: true
    },

    // Product Name
    product_name: {
        type: String,
        required: true,
        trim: true
    },

    // Product Slug
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    // Product Image
    image: {
        type: String,
        default: null
    },

    // Quantity
    quantity: {
        type: Number,
        required: true,
        default: 0
    },

    // Stock
    stock: {
        type: Number,
        required: true,
        default: 0
    },

    // Selling Price
    price: {
        type: Number,
        required: true
    },

    // MRP
    mrp: {
        type: Number,
        required: true
    },

    // Discount Percentage
    discount: {
        type: Number,
        default: 0
    },

    // Description
    description: {
        type: String,
        default: null
    },

    // Status (1 = Active, 0 = Inactive)
    status: {
        type: Number,
        enum: [0, 1],
        default: 1
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Products", productSchema);