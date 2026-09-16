import {
    applyCoupon,
    createCoupon,
    deleteCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
} from "../services/couponService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/responseHandler.js";
import {
    MESSAGES,
    STATUS_CODES,
} from "../utils/setConstants.js";

// CREATE COUPON
export const createCouponController = asyncHandler(
    async (req, res) => {
        const coupon = await createCoupon(
            req.user.id,
            req.body
        );

        return sendSuccess(
            res,
            STATUS_CODES.CREATED,
            MESSAGES.COUPON_CREATED,
            { data: coupon }
        );
    }
);

// GET ALL COUPONS
export const getAllCouponsController = asyncHandler(
    async (req, res) => {
        const coupons = await getAllCoupons();
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.COUPONS_FETCHED,
            { data: coupons }
        );
    }
);

// GET COUPON BY ID
export const getCouponByIdController = asyncHandler(
    async (req, res) => {
        const coupon = await getCouponById(
            req.params.id
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.COUPON_FETCHED,
            { data: coupon }
        );
    }
);

// UPDATE COUPON
export const updateCouponController = asyncHandler(
    async (req, res) => {
        const coupon = await updateCoupon(
            req.params.id,
            req.body
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.COUPON_UPDATED,
            { data: coupon }
        );
    }
);

// DELETE / DEACTIVATE COUPON
export const deleteCouponController = asyncHandler(
    async (req, res) => {
        const coupon = await deleteCoupon(
            req.params.id
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.COUPON_DELETED,
            { data: coupon }
        );
    }
);

// APPLY COUPON
export const applyCouponController = asyncHandler(
    async (req, res) => {
        const result = await applyCoupon(
            req.user.id,
            req.body.code
        );

        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.COUPON_APPLIED,
            { data: result }
        );
    }
);
