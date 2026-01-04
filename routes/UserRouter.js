const router = require("express").Router();
const verifyEmail = require("../controllers/verifyEmail");
const resetPassword = require("../helper/resetPassword")
const multer = require("multer");
const upload = multer();

const { registerUser, userLogin, forgetPassword } = require("../controllers/authController");

router.post("/register",upload.none(), registerUser);
router.get("/verify-email", verifyEmail);
router.post("/login", userLogin);
router.post("/forgetPassword", forgetPassword);
router.post("/reset-password", resetPassword);



module.exports = router;