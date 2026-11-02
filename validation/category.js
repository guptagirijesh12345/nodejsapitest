const { body, validationResult } = require("express-validator");

exports.categoryValidation = [
    body("cat_name").trim().notEmpty().withMessage("Category name is required")
        .bail().isLength({ min: 3, max: 50 })
        .withMessage("Category name must be between 3 and 50 characters"),

    body("status").notEmpty().withMessage("Status is required").bail().isIn(["1", "2"])
    .withMessage("Status must be either 1 or 2"),
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