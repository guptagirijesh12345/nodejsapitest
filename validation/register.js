const { body, validationResult } = require("express-validator");

exports.registerValidation = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Please enter a valid email address"),

    body("password")
        .notEmpty()
        .withMessage("Password is required"),

    body("mobile_no")
        .notEmpty()
        .withMessage("Mobile No. is required"),

          body("country_code")
        .notEmpty()
        .withMessage("Country Code is required"),

    body("device_type")
        .notEmpty()
        .withMessage("Device type is required")
        .bail()
        .isIn(["android", "ios", "web"])
        .withMessage("Device type must be android, ios or web"),

    body("device_token")
        .trim()
        .notEmpty()
        .withMessage("Device token is required"),

     body("role").notEmpty().withMessage("Status is required").bail().isIn(["1", "2","3"]).withMessage("Status must be either 1 2, or 3"),
];

exports.validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = {};

        errors.array().forEach((error) => {
            if (!formattedErrors[error.path]) {
                formattedErrors[error.path] = error.msg;
            }
        });

        return res.status(422).json({success: false,message: "Validation failed",errors: formattedErrors,});
    }

    next();
};