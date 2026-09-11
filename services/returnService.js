import sequelize from "../config/database.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";
import ProductVariant from "../models/ProductVariant.js";
import Return from "../models/Return.js";
import AppError from "../utils/AppError.js";
import { STATUS_CODES } from "../utils/setConstants.js";

// CUSTOMER - CREATE RETURN REQUEST
export const createReturn = async (
    userId,
    orderId,
    orderItemId,
    quantity,
    reason,
    description = null
) => {
    const transaction = await sequelize.transaction();
    try {
        // 1. Check customer's order
        const order = await Order.findOne({
            where: {
                id: orderId,
                userId,
            },
            transaction,
        });
        if (!order) {
            throw new AppError(
                "Order not found",
                STATUS_CODES.NOT_FOUND
            );
        }
        // 2. Return is allowed only after delivery
        if (order.status !== "DELIVERED") {
            throw new AppError(
                "Product can only be returned after the order is delivered",
                STATUS_CODES.CONFLICT
            );
        }
        // 3. Find order item
        const orderItem = await OrderItem.findOne({
            where: {
                id: orderItemId,
                orderId: order.id,
            },
            transaction,
        });
        if (!orderItem) {
            throw new AppError(
                "Order item not found",
                STATUS_CODES.NOT_FOUND
            );
        }

        // 4. Validate quantity
        const requestedQuantity = Number(quantity);
        const orderedQuantity = Number(orderItem.quantity);
        if (
            !Number.isInteger(requestedQuantity) ||
            requestedQuantity <= 0
        ) {
            throw new AppError(
                "Return quantity must be a positive integer",
                STATUS_CODES.BAD_REQUEST
            );
        }

        if (requestedQuantity > orderedQuantity) {
            throw new AppError(
                `Return quantity cannot exceed ordered quantity of ${orderedQuantity}`,
                STATUS_CODES.BAD_REQUEST
            );
        }

        // 5. Check previous return quantity
        const previousReturns = await Return.findAll({
            where: {
                orderItemId: orderItem.id,
                userId,
            },
            transaction,
        });

        const returnedQuantity = previousReturns.reduce(
            (total, returnItem) =>
                total + Number(returnItem.quantity),
            0
        );
        const remainingQuantity =
            orderedQuantity - returnedQuantity;
        if (requestedQuantity > remainingQuantity) {
            throw new AppError(
                `Only ${remainingQuantity} item(s) are available for return`,
                STATUS_CODES.CONFLICT
            );
        }
        // 6. Create return request
        const returnRequest = await Return.create(
            {
                orderId: order.id,
                orderItemId: orderItem.id,
                userId,
                reason,
                description,
                quantity: requestedQuantity,
                status: "REQUESTED",
                requestedAt: new Date(),
            },
            {
                transaction,
            }
        );
        await transaction.commit();
        return returnRequest;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// CUSTOMER - GET MY RETURNS
export const getMyReturns = async (userId) => {
    return await Return.findAll({
        where: {
            userId,
        },
        include: [
            {
                model: Order,
                as: "order",
                attributes: [
                    "id",
                    "orderNumber",
                    "status",
                    "paymentStatus",
                    "totalAmount",
                ],
            },
            {
                model: OrderItem,
                as: "orderItem",
                attributes: [
                    "id",
                    "productName",
                    "sku",
                    "quantity",
                    "unitPrice",
                    "subtotal",
                ],
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

// CUSTOMER - GET RETURN BY ID
export const getReturnById = async (
    userId,
    returnId
) => {
    const returnRequest = await Return.findOne({
        where: {
            id: returnId,
            userId,
        },
        include: [
            {
                model: Order,
                as: "order",
                attributes: [
                    "id",
                    "orderNumber",
                    "status",
                    "paymentStatus",
                    "totalAmount",
                ],
            },
            {
                model: OrderItem,
                as: "orderItem",
                attributes: [
                    "id",
                    "productName",
                    "sku",
                    "quantity",
                    "unitPrice",
                    "subtotal",
                ],
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
    });
    if (!returnRequest) {
        throw new AppError(
            "Return request not found",
            STATUS_CODES.NOT_FOUND
        );
    }
    return returnRequest;
};

// SELLER - APPROVE RETURN
export const approveReturn = async (
    sellerId,
    returnId
) => {
    const transaction = await sequelize.transaction();
    try {
        const returnRequest = await getSellerReturn(
            sellerId,
            returnId,
            transaction
        );
        if (returnRequest.status !== "REQUESTED") {
            throw new AppError(
                `Return cannot be approved when its status is ${returnRequest.status}`,
                STATUS_CODES.CONFLICT
            );
        }
        returnRequest.status = "APPROVED";
        returnRequest.approvedAt = new Date();
        await returnRequest.save({
            transaction,
        });
        await transaction.commit();
        return returnRequest;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// SELLER - REJECT RETURN
export const rejectReturn = async (
    sellerId,
    returnId,
    note = null
) => {
    const transaction = await sequelize.transaction();
    try {
        const returnRequest = await getSellerReturn(
            sellerId,
            returnId,
            transaction
        );

        if (returnRequest.status !== "REQUESTED") {
            throw new AppError(
                `Return cannot be rejected when its status is ${returnRequest.status}`,
                STATUS_CODES.CONFLICT
            );
        }

        returnRequest.status = "REJECTED";

        if (note) {
            returnRequest.description = returnRequest.description
                ? `${returnRequest.description} | Seller: ${note}`
                : `Seller: ${note}`;
        }
        await returnRequest.save({
            transaction,
        });
        await transaction.commit();
        return returnRequest;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// SELLER - MARK RETURN PICKED UP
export const markReturnPickedUp = async (
    sellerId,
    returnId
) => {
    const transaction = await sequelize.transaction();
    try {
        const returnRequest = await getSellerReturn(
            sellerId,
            returnId,
            transaction
        );
        if (returnRequest.status !== "APPROVED") {
            throw new AppError(
                `Return must be APPROVED before pickup. Current status: ${returnRequest.status}`,
                STATUS_CODES.CONFLICT
            );
        }
        returnRequest.status = "PICKED_UP";
        await returnRequest.save({
            transaction,
        });
        await transaction.commit();
        return returnRequest;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// SELLER - MARK RETURN RECEIVED
export const markReturnReceived = async (
    sellerId,
    returnId
) => {
    const transaction = await sequelize.transaction();

    try {
        const returnRequest = await getSellerReturn(
            sellerId,
            returnId,
            transaction
        );

        if (returnRequest.status !== "PICKED_UP") {
            throw new AppError(
                `Return must be PICKED_UP before it can be received. Current status: ${returnRequest.status}`,
                STATUS_CODES.CONFLICT
            );
        }

        returnRequest.status = "RECEIVED";
        returnRequest.receivedAt = new Date();

        await returnRequest.save({
            transaction,
        });

        await transaction.commit();

        return returnRequest;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


// CUSTOMER - CANCEL RETURN
export const cancelReturn = async (
    userId,
    returnId
) => {
    const transaction = await sequelize.transaction();

    try {
        const returnRequest = await Return.findOne({
            where: {
                id: returnId,
                userId,
            },
            transaction,
            lock: transaction.LOCK.UPDATE,
        });

        if (!returnRequest) {
            throw new AppError(
                "Return request not found",
                STATUS_CODES.NOT_FOUND
            );
        }

        if (
            !["REQUESTED", "APPROVED"].includes(
                returnRequest.status
            )
        ) {
            throw new AppError(
                `Return cannot be cancelled when its status is ${returnRequest.status}`,
                STATUS_CODES.CONFLICT
            );
        }

        returnRequest.status = "CANCELLED";

        await returnRequest.save({
            transaction,
        });

        await transaction.commit();

        return returnRequest;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


// =====================================================
// INTERNAL HELPER - GET SELLER RETURN
// =====================================================

const getSellerReturn = async (
    sellerId,
    returnId,
    transaction
) => {
    const returnRequest = await Return.findByPk(
        returnId,
        {
            include: [
                {
                    model: OrderItem,
                    as: "orderItem",
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

    if (!returnRequest) {
        throw new AppError(
            "Return request not found",
            STATUS_CODES.NOT_FOUND
        );
    }

    const product =
        returnRequest.orderItem?.variant?.product;

    if (
        !product ||
        Number(product.sellerId) !== Number(sellerId)
    ) {
        throw new AppError(
            "You are not authorized to manage this return",
            STATUS_CODES.FORBIDDEN
        );
    }

    return returnRequest;
};
