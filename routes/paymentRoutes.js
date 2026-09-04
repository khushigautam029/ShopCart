import express from "express";
import {
    getMyPaymentById,
    getMyPayments,
} from "../controllers/paymentController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(authorizeRoles("CUSTOMER"));
router.get("/", getMyPayments);
router.get("/:id", getMyPaymentById);

export default router;