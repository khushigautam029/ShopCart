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

// COUPON MANAGEMENT
router.post(
    "/",
    authorizeRoles("SELLER"),
    validate(createCouponSchema),
    createCouponController
);
router.get(
    "/",
    getAllCouponsController
);
router.get(
    "/:id",
    getCouponByIdController
);
router.put(
    "/:id",
    validate(updateCouponSchema),
    updateCouponController
);
router.delete(
    "/:id",
    deleteCouponController
);
// APPLY COUPON - CUSTOMER
router.post(
    "/apply",
    authorizeRoles("CUSTOMER"),
    validate(applyCouponSchema),
    applyCouponController
);

export default router;