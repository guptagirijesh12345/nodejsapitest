const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    // 1 = Admin, 2 = User, 3 = Vendor
    role: {
        type: Number,
        enum: [1, 2, 3],
        default: 2
    },

    // android = Android, ios = iOS
    device_type: {
        type: String,
        enum: ["android", "ios",'web'],
        default: "android"
    },

    device_token: {
        type: String,
        default: null
    },
      mobile_no: {
        type: String,
        default: null
    },
      country_code: {
        type: String,
        default: null
      },

    otp: {
        type: String,
        default: null
    },

    otp_expire: {
        type: String,
        default: null
    },
      country_code: {
        type: String,
        default: null
    }
    

}, {
    timestamps: true
});

module.exports = mongoose.model("users", userSchema);