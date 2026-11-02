const { body, validationResult } = require("express-validator");

exports.productValidation = [

    body("category_id").notEmpty()
        .withMessage("Category is required").bail()
        .isMongoId().withMessage("Invalid Category ID"),

    body("product_name")
        .trim().notEmpty().withMessage("Product name is required")
        .bail().isLength({ min: 3, max: 100 }).withMessage("Product name must be between 3 and 100 characters"),


    body("quantity")
        .notEmpty().withMessage("Quantity is required")
        .bail().isInt({ min: 0 }).withMessage("Quantity must be a positive number"),


    body("mrp").notEmpty().withMessage("MRP is required")
        .bail().isFloat({ min: 0 }).withMessage("MRP must be a valid number"),

    body("discount").notEmpty().isFloat({ min: 0, max: 100 }).withMessage("Discount must be between 0 and 100"),

    body("description").optional().trim(),

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