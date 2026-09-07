import express from "express";
import {
    getCustomerOrderStatusHistory,
} from "../controllers/orderStatusHistoryController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// Customer must be authenticated
router.use(protect);

// Only customers can view order status history
router.use(authorizeRoles("CUSTOMER"));
router.get( "/orders/:orderId", getCustomerOrderStatusHistory);

export default router;
