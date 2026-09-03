import express from "express";
import {
    login,
    sellerLogin,
    sellerVerifyOtp,
    verifyOtp,
} from "../controllers/authController.js";
import validate from "../middleware/validateMiddleware.js";
import {
    loginSchema,
    verifyOtpSchema,
} from "../validations/authValidation.js";

const router = express.Router();

router.post("/login",validate(loginSchema), login);
router.post("/verify-otp",validate(verifyOtpSchema), verifyOtp);
router.post( "/seller-login",validate(loginSchema), sellerLogin);
router.post( "/seller-verify-otp",validate(verifyOtpSchema), sellerVerifyOtp);

export default router;