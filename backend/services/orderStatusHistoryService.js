import {
    Order,
    OrderStatusHistory,
} from "../models/index.js";

export const createOrderStatusHistory = async (
    orderId,
    status,
    changedBy,
    note = null,
    transaction = null
) => {
    return await OrderStatusHistory.create(
        {
            orderId,
            status,
            changedBy,
            note,
        },
        {
            transaction,
        }
    );
};

export const getOrderStatusHistory = async (
    userId,
    orderId
) => {
    const order = await Order.findOne({
        where: {
            id: orderId,
            userId,
        },
    });

    if (!order) {
        throw new Error("Order not found");
    }

    return await OrderStatusHistory.findAll({
        where: {
            orderId: order.id,
        },
        attributes: [
            "id",
            "orderId",
            "status",
            "note",
            "changedBy",
            "created_at",
        ],
        order: [
            ["created_at", "ASC"],
        ],
    });
};
