import sequelize from "../config/database.js";
import {
    Address,
    Inventory,
    Order,
    OrderItem,
    OrderStatusHistory,
    Product,
    ProductVariant,
} from "../models/index.js";
import AppError from "../utils/AppError.js";
import { STATUS_CODES } from "../utils/setConstants.js";


// Allowed seller order status transitions
const allowedTransitions = {
    CONFIRMED: ["PACKED"],
    PACKED: ["SHIPPED"],
    SHIPPED: ["OUT_FOR_DELIVERY"],
    OUT_FOR_DELIVERY: ["DELIVERED"],
    DELIVERED: [],
    CANCELLED: [],
};


// =====================================================
// CUSTOMER - GET ALL ORDERS
// =====================================================

export const getMyOrders = async (userId) => {
    return await Order.findAll({
        where: {
            userId,
        },
        include: [
            {
                model: OrderItem,
                as: "items",
                include: [
                    {
                        model: ProductVariant,
                        as: "variant",
                        include: [
                            {
                                model: Product,
                                as: "product",
                                attributes: [
                                    "id",
                                    "name",
                                    "status",
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
        order: [
            ["created_at", "DESC"],
        ],
    });
};


// =====================================================
// CUSTOMER - GET ORDER DETAILS
// =====================================================

export const getOrderDetails = async (
    userId,
    orderId
) => {
    const order = await Order.findOne({
        where: {
            id: orderId,
            userId,
        },
        include: [
            {
                model: Address,
                as: "address",
            },
            {
                model: OrderItem,
                as: "items",
                include: [
                    {
                        model: ProductVariant,
                        as: "variant",
                        include: [
                            {
                                model: Product,
                                as: "product",
                                attributes: [
                                    "id",
                                    "name",
                                    "status",
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                model: OrderStatusHistory,
                as: "statusHistory",
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
            },
        ],
    });

    if (!order) {
        throw new AppError(
            "Order not found",
            STATUS_CODES.NOT_FOUND
        );
    }

    return order;
};


// =====================================================
// CUSTOMER - GET ORDER STATUS
// =====================================================

export const getOrderStatus = async (
    userId,
    orderId
) => {
    const order = await Order.findOne({
        where: {
            id: orderId,
            userId,
        },
        attributes: [
            "id",
            "orderNumber",
            "status",
            "paymentStatus",
            "created_at",
            "updated_at",
        ],
    });

    if (!order) {
        throw new AppError(
            "Order not found",
            STATUS_CODES.NOT_FOUND
        );
    }

    const statusHistory =
        await OrderStatusHistory.findAll({
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

    return {
        order,
        statusHistory,
    };
};


// =====================================================
// CUSTOMER - CANCEL ORDER
// =====================================================

export const cancelOrder = async (
    userId,
    orderId
) => {
    const transaction =
        await sequelize.transaction();

    try {
        const order = await Order.findOne({
            where: {
                id: orderId,
                userId,
            },
            include: [
                {
                    model: OrderItem,
                    as: "items",
                    include: [
                        {
                            model: ProductVariant,
                            as: "variant",
                            include: [
                                {
                                    model: Inventory,
                                    as: "inventory",
                                },
                            ],
                        },
                    ],
                },
            ],
            transaction,
            lock: transaction.LOCK.UPDATE,
        });

        if (!order) {
            throw new AppError(
                "Order not found",
                STATUS_CODES.NOT_FOUND
            );
        }

        // Customer can cancel only before shipping
        const cancellableStatuses = [
            "PENDING",
            "CONFIRMED",
            "PACKED",
        ];

        if (
            !cancellableStatuses.includes(
                order.status
            )
        ) {
            throw new AppError(
                `Order cannot be cancelled when its status is ${order.status}`,
                STATUS_CODES.CONFLICT
            );
        }

        if (
            !order.items ||
            order.items.length === 0
        ) {
            throw new AppError(
                "Order has no items",
                STATUS_CODES.BAD_REQUEST
            );
        }

        // Release reserved inventory
        for (const item of order.items) {
            const inventory =
                item.variant?.inventory;

            if (inventory) {
                const reservedQuantity =
                    Number(
                        inventory.reservedQuantity
                    );

                const orderQuantity =
                    Number(item.quantity);

                inventory.reservedQuantity =
                    Math.max(
                        0,
                        reservedQuantity -
                        orderQuantity
                    );

                await inventory.save({
                    transaction,
                });
            }
        }

        const previousStatus =
            order.status;

        // Update order status
        order.status = "CANCELLED";

        await order.save({
            transaction,
        });

        // Add cancellation to status history
        await OrderStatusHistory.create(
            {
                orderId: order.id,
                status: "CANCELLED",
                note: "Order cancelled by customer",
                changedBy: userId,
            },
            {
                transaction,
            }
        );

        await transaction.commit();

        return {
            orderId: order.id,
            orderNumber: order.orderNumber,
            previousStatus,
            status: order.status,
            paymentStatus:
                order.paymentStatus,
            message:
                "Order cancelled successfully",
        };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


// =====================================================
// SELLER - UPDATE ORDER STATUS
// =====================================================

export const updateOrderStatus = async (
    orderId,
    sellerId,
    newStatus,
    note = null
) => {
    const transaction =
        await sequelize.transaction();

    try {
        const order = await Order.findByPk(
            orderId,
            {
                include: [
                    {
                        model: OrderItem,
                        as: "items",
                        include: [
                            {
                                model: ProductVariant,
                                as: "variant",
                                include: [
                                    {
                                        model: Product,
                                        as: "product",
                                    },
                                ],
                            },
                        ],
                    },
                ],
                transaction,
                lock: transaction.LOCK.UPDATE,
            }
        );

        if (!order) {
            throw new AppError(
                "Order not found",
                STATUS_CODES.NOT_FOUND
            );
        }

        if (
            !order.items ||
            order.items.length === 0
        ) {
            throw new AppError(
                "Order has no items",
                STATUS_CODES.BAD_REQUEST
            );
        }

        // Check seller owns all products
        const sellerOwnsOrder =
            order.items.every(
                (item) =>
                    Number(
                        item.variant?.product
                            ?.sellerId
                    ) === Number(sellerId)
            );

        if (!sellerOwnsOrder) {
            throw new AppError(
                "You are not authorized to update this order",
                STATUS_CODES.FORBIDDEN
            );
        }

        const currentStatus =
            order.status;

        const possibleStatuses =
            allowedTransitions[
                currentStatus
            ] || [];

        if (
            !possibleStatuses.includes(
                newStatus
            )
        ) {
            throw new AppError(
                `Order cannot be changed from ${currentStatus} to ${newStatus}`,
                STATUS_CODES.CONFLICT
            );
        }

        // Update order status
        order.status = newStatus;

        await order.save({
            transaction,
        });

        // Create status history
        await OrderStatusHistory.create(
            {
                orderId: order.id,
                status: newStatus,
                note:
                    note ||
                    `Order status changed to ${newStatus}`,
                changedBy: sellerId,
            },
            {
                transaction,
            }
        );

        await transaction.commit();

        return {
            orderId: order.id,
            orderNumber: order.orderNumber,
            previousStatus: currentStatus,
            status: order.status,
            note:
                note ||
                `Order status changed to ${newStatus}`,
        };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};