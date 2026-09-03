import express from "express";
import {
    login,
    sellerLogin,
    sellerVerifyOtp,
    verifyOtp,
} from "../controllers/authController.js";
import validate from "../middleware/validateMiddleware.js";
import {
    loginLimiter,
    otpLimiter,
} from "../utils/rateLimiter.js";
import {
    loginSchema,
    verifyOtpSchema,
} from "../validations/authValidation.js";

const router = express.Router();
router.post("/login",loginLimiter,validate(loginSchema), login);
router.post("/verify-otp",otpLimiter,validate(verifyOtpSchema), verifyOtp);
router.post( "/seller-login",loginLimiter,validate(loginSchema), sellerLogin);
router.post( "/seller-verify-otp",otpLimiter,validate(verifyOtpSchema), sellerVerifyOtp);

export default router;