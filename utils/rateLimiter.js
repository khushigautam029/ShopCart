import rateLimit from "express-rate-limit";
import { MESSAGES } from "./setConstants.js";

// General API limiter
export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        success: false,
        message: MESSAGES.TOO_MANY_REQUESTS,
    },
});

// Login limiter
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        success: false,
        message: MESSAGES.TOO_MANY_LOGIN_ATTEMPTS,
    },
});

// OTP limiter
export const otpLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        success: false,
        message: MESSAGES.TOO_MANY_OTP_REQUESTS,
    },
});