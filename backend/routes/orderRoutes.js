import express from "express";
import {
    cancelOrderController,
    changeOrderStatus,
    getMyOrdersController,
    getOrderDetailsController,
    getOrderStatusController,
} from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import {
    updateOrderStatusSchema,
} from "../validations/orderStatusValidation.js";

const router = express.Router();
router.use(protect);

// CUSTOMER ROUTES
// Get all my orders
router.get(
    "/",
    authorizeRoles("CUSTOMER"),
    getMyOrdersController
);

// Get specific order details
router.get(
    "/:orderId",
    authorizeRoles("CUSTOMER"),
    getOrderDetailsController
);

// Get specific order status + history
router.get(
    "/:orderId/status",
    authorizeRoles("CUSTOMER"),
    getOrderStatusController
);

// Cancel order
router.post(
    "/:orderId/cancel",
    authorizeRoles("CUSTOMER"),
    cancelOrderController
);

// SELLER ROUTES
// Seller changes order status
router.patch(
    "/:orderId/status",
    authorizeRoles("SELLER"),
    validate(updateOrderStatusSchema),
    changeOrderStatus
);

export default router;