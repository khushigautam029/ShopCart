import {
    loginSellerWithPhone,
    loginWithPhone,
    verifyLoginOtp,
    verifySellerLoginOtp,
} from "../services/authService.js";
import { sendError, sendSuccess } from "../utils/responseHandler.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

export const login = async (req, res) => {
    try {
        const result = await loginWithPhone(
            req.body.phone
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.OTP_SENT,
            { data: result }
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.BAD_REQUEST,
            error.message
        );
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const result = await verifyLoginOtp(
            req.body.phone,
            req.body.otp
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.LOGIN_SUCCESSFUL,
            { data: result }
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.BAD_REQUEST,
            error.message
        );
    }
};


export const sellerLogin = async (req, res) => {
    try {
        const result = await loginSellerWithPhone(
            req.body.phone
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.SELLER_OTP_SENT,
            { data: result }
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.BAD_REQUEST,
            error.message
        );
    }
};

export const sellerVerifyOtp = async (req, res) => {
    try {
        const result = await verifySellerLoginOtp(
            req.body.phone,
            req.body.otp
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.SELLER_LOGIN_SUCCESSFUL,
            { data: result }
        );
    } catch (error) {
        return sendError(
            res,
            STATUS_CODES.BAD_REQUEST,
            error.message
        );
    }
};