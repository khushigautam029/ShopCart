import {
    loginSellerWithPhone,
    loginWithPhone,
    verifyLoginOtp,
    verifySellerLoginOtp,
} from "../services/authService.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

export const login = async (req, res) => {
    try {
        const result = await loginWithPhone(
            req.body.phone
        );

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.OTP_SENT,
            data: result,
        });
    } catch (error) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        });
    }
};


export const verifyOtp = async (req, res) => {
    try {
        const result = await verifyLoginOtp(
            req.body.phone,
            req.body.otp
        );

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.LOGIN_SUCCESSFUL,
            data: result,
        });
    } catch (error) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        });
    }
};


export const sellerLogin = async (req, res) => {
    try {
        const result = await loginSellerWithPhone(
            req.body.phone
        );

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.SELLER_OTP_SENT,
            data: result,
        });
    } catch (error) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        });
    }
};

export const sellerVerifyOtp = async (req, res) => {
    try {
        const result = await verifySellerLoginOtp(
            req.body.phone,
            req.body.otp
        );

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.SELLER_LOGIN_SUCCESSFUL,
            data: result,
        });
    } catch (error) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        });
    }
};