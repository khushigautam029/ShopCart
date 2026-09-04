import asyncHandler from "../utils/asyncHandler.js";

import {
    createOrder,
} from "../services/orderService.js";

import { STATUS_CODES } from "../utils/setConstants.js";


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
            message: "Order placed successfully",
            data: order,
        });
    }
);