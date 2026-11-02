import express from "express";
import {
    applyCouponController,
    createCouponController,
    deleteCouponController,
    getAllCouponsController,
    getCouponByIdController,
    updateCouponController,
} from "../controllers/couponController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import {
    applyCouponSchema,
    createCouponSchema,
    updateCouponSchema,
} from "../validations/couponValidation.js";

const router = express.Router();

// AUTHENTICATION
router.use(protect);

// SELLER COUPON MANAGEMENT
// Create coupon
router.post(
    "/",
    authorizeRoles("SELLER"),
    validate(createCouponSchema),
    createCouponController
);

// Get seller's coupons
router.get(
    "/",
    authorizeRoles("SELLER"),
    getAllCouponsController
);

// Get seller's coupon by ID
router.get(
    "/:id",
    authorizeRoles("SELLER"),
    getCouponByIdController
);

// Update seller's coupon
router.put(
    "/:id",
    authorizeRoles("SELLER"),
    validate(updateCouponSchema),
    updateCouponController
);

// Deactivate seller's coupon
router.delete(
    "/:id",
    authorizeRoles("SELLER"),
    deleteCouponController
);

// CUSTOMER - APPLY COUPON
router.post(
    "/apply",
    authorizeRoles("CUSTOMER"),
    validate(applyCouponSchema),
    applyCouponController
);

export default router;
