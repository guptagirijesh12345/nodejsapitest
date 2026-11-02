const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

    // User ID (Admin/Vendor)
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // Category Name
    cat_name: {
        type: String,
        required: true,
        trim: true
    },

    // Slug
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    // Category Image
    image: {
        type: String,
        default: null
    },
    // 1 = Active, 0 = Inactive
        status: {
            type: Number,
            enum: [0, 1],
            default: 1
        }
            

}, {
    timestamps: true
});

module.exports = mongoose.model("Categories", categorySchema);