const { body, validationResult } = require("express-validator");

exports.verifiedValidation = [
    body("mobile_no")
        .notEmpty()
        .withMessage("Mobile no is required"),

    body("otp")
        .notEmpty()
        .withMessage("Otp is required"),

    body("device_type")
        .notEmpty()
        .withMessage("Device type is required")
        .bail()
        .isIn(["android", "ios", "web"])
        .withMessage("Device type must be android, ios or web"),

    body("device_token")
        .notEmpty()
        .withMessage("Device token is required"),
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

        return res.status(422).json({success: false,message: "Validation failed", errors: formattedErrors,
        });
    }

    next();
};