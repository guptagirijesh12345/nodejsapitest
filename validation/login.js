const { body, validationResult } = require("express-validator");

exports.loginValidation = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Please enter a valid email address"),

    body("password")
        .notEmpty()
        .withMessage("Password is required"),
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