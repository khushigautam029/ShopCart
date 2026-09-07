import express from "express";
import {
    changeOrderStatus,
    placeOrder,
} from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import {
    updateOrderStatusSchema,
} from "../validations/orderStatusValidation.js";
import {
    createOrderSchema,
} from "../validations/orderValidation.js";

const router = express.Router();

router.use(protect);

// Customer places order
router.post(
    "/",
    authorizeRoles("CUSTOMER"),
    validate(createOrderSchema),
    placeOrder
);

// Seller changes order status
router.patch(
    "/:orderId/status",
    authorizeRoles("SELLER"),
    validate(updateOrderStatusSchema),
    changeOrderStatus
);

export default router;
