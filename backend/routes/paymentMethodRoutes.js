import express from "express";

import {
    getAllPaymentMethods,
    getPaymentMethod,
} from "../controllers/paymentMethodController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(protect);

router.use(authorizeRoles("CUSTOMER"));

router.get("/", getAllPaymentMethods);

router.get("/:id", getPaymentMethod);

export default router;