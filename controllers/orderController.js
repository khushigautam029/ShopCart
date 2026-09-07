import {
    createOrder,
    updateOrderStatus,
} from "../services/orderService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/responseHandler.js";
import {
    MESSAGES,
    STATUS_CODES,
} from "../utils/setConstants.js";

// Customer places an order
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
        return sendSuccess(
            res,
            STATUS_CODES.CREATED,
            MESSAGES.ORDER_PLACED,
            { data: order }
        );
    }
);

// Seller updates order status
export const changeOrderStatus = asyncHandler(
    async (req, res) => {
        const { orderId } = req.params;
        const {
            status,
            note,
        } = req.body;
        const order = await updateOrderStatus(
            Number(orderId),
            req.user.id,
            status,
            note
        );
        return sendSuccess(
            res,
            STATUS_CODES.OK,
            MESSAGES.ORDER_STATUS_UPDATED,
            { data: order }
        );
    }
);
