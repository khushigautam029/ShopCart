import express from "express";
import {
    placeOrder,
} from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import {
    createOrderSchema,
} from "../validations/orderValidation.js";

const router = express.Router();

router.use(protect);
router.use( authorizeRoles("CUSTOMER"));
router.post( "/", validate(createOrderSchema), placeOrder);

export default router;