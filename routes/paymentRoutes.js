import express from "express";

import {
    getMyPaymentById,
    getMyPayments,
    makePayment,
} from "../controllers/paymentController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";

import {
    createPaymentSchema,
} from "../validations/paymentValidation.js";

const router = express.Router();

router.use(protect);

router.use(authorizeRoles("CUSTOMER"));

// Create payment for an existing order
router.post(
    "/",
    validate(createPaymentSchema),
    makePayment
);

// Get all payments of logged-in customer
router.get(
    "/",
    getMyPayments
);

// Get specific payment
router.get(
    "/:id",
    getMyPaymentById
);

export default router;