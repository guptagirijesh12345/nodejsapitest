const express = require("express");

const router = express.Router();
const adminLoginController = require("../controllers/admin/login");
const adminCatController = require("../controllers/admin/category");
const adminProductController = require("../controllers/admin/product");

const authMiddleware = require("../middleware/auth");



const {categoryValidation,validate} = require("../validation/category");
const {loginValidation,validate: loginValidate} = require("../validation/login");
const {loginValidationMobile,validate: loginMobileNoValidate} = require("../validation/loginMobileNo");
const {registerValidation,validate: registerValidate} = require("../validation/register");
const {verifiedValidation,validate: verifiedValidate} = require("../validation/verifiedOtp");

const {productValidation,validate:productValidate} = require("../validation/product");


router.post("/register", registerValidation, registerValidate,adminLoginController.register);

router.post("/login",loginValidation,loginValidate,adminLoginController.login);

router.post("/verify-otp",verifiedValidation, verifiedValidate,adminLoginController.verifyOtp);


router.post("/loginWithMobileNo",loginValidationMobile,loginMobileNoValidate,adminLoginController.loginWithMobileNo);

router.post("/add-category",authMiddleware, adminCatController.uploadCategory,categoryValidation,validate,adminCatController.addCategory);

router.get("/list-category",authMiddleware,adminCatController.ListCategory);

router.post("/add-product",authMiddleware, adminProductController.uploadProduct,productValidation,productValidate,adminProductController.addProduct);



router.get("/list-product",authMiddleware,adminProductController.listProduct);


module.exports = router;
