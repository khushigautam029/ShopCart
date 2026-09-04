import {
    createOrder,
} from "../services/orderService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { MESSAGES, STATUS_CODES } from "../utils/setConstants.js";

export const placeOrder = asyncHandler(
    async (req, res) => {
        const {
            addressId,
            paymentMethod,
        } = req.body;
        const order = await createOrder(
            req.user.id,
            addressId,
            paymentMethod
        );
        res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: MESSAGES.ORDER_PLACED,
            data: order,
        });
    }
);