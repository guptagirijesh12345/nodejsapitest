const { body, validationResult } = require("express-validator");

exports.loginValidationMobile = [
    body("country_code")
        .notEmpty()
        .withMessage("Country Code is required"),

    body("mobile_no")
        .notEmpty()
        .withMessage("Mobile No is required")
        .isMobilePhone("any")
        .withMessage("Invalid Mobile Number"),
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

        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: formattedErrors,
        });
    }

    next();
};