import {
    cancelOrder,
    getMyOrders,
    getOrderDetails,
    getOrderStatus,
    updateOrderStatus,
} from "../services/orderService.js";

import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/responseHandler.js";

import {
    MESSAGES,
    STATUS_CODES,
} from "../utils/setConstants.js";


// =====================================================
// CUSTOMER - GET MY ORDERS
// =====================================================

export const getMyOrdersController = asyncHandler(
    async (req, res) => {
        const orders = await getMyOrders(
            req.user.id
        );

        return sendSuccess(
            res,
            STATUS_CODES.OK,
            "Orders fetched successfully",
            { data: orders }
        );
    }
);


// =====================================================
// CUSTOMER - GET ORDER DETAILS
// =====================================================

export const getOrderDetailsController =
    asyncHandler(
        async (req, res) => {
            const { orderId } =
                req.params;

            const order =
                await getOrderDetails(
                    req.user.id,
                    Number(orderId)
                );

            return sendSuccess(
                res,
                STATUS_CODES.OK,
                "Order details fetched successfully",
                { data: order }
            );
        }
    );


// =====================================================
// CUSTOMER - GET ORDER STATUS
// =====================================================

export const getOrderStatusController =
    asyncHandler(
        async (req, res) => {
            const { orderId } =
                req.params;

            const result =
                await getOrderStatus(
                    req.user.id,
                    Number(orderId)
                );

            return sendSuccess(
                res,
                STATUS_CODES.OK,
                "Order status fetched successfully",
                {
                    data: result,
                }
            );
        }
    );


// =====================================================
// CUSTOMER - CANCEL ORDER
// =====================================================

export const cancelOrderController =
    asyncHandler(
        async (req, res) => {
            const { orderId } =
                req.params;

            const order =
                await cancelOrder(
                    req.user.id,
                    Number(orderId)
                );

            return sendSuccess(
                res,
                STATUS_CODES.OK,
                "Order cancelled successfully",
                {
                    data: order,
                }
            );
        }
    );


// =====================================================
// SELLER - UPDATE ORDER STATUS
// =====================================================

export const changeOrderStatus =
    asyncHandler(
        async (req, res) => {
            const { orderId } =
                req.params;

            const {
                status,
                note,
            } = req.body;

            const order =
                await updateOrderStatus(
                    Number(orderId),
                    req.user.id,
                    status,
                    note
                );

            return sendSuccess(
                res,
                STATUS_CODES.OK,
                MESSAGES.ORDER_STATUS_UPDATED,
                {
                    data: order,
                }
            );
        }
    );