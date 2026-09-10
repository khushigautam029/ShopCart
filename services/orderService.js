import sequelize from "../config/database.js";
import {
    Address,
    Cart,
    CartItem,
    Inventory,
    Order,
    OrderItem,
    OrderStatusHistory,
    Product,
    ProductVariant,
} from "../models/index.js";
import AppError from "../utils/AppError.js";
import { STATUS_CODES } from "../utils/setConstants.js";

const generateOrderNumber = () => {
    const timestamp = Date.now();
    const random = Math.floor(
        1000 + Math.random() * 9000
    );
    return `SC-${timestamp}-${random}`;
};
// Allowed order status transitions
const allowedTransitions = {
    PENDING: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["PACKED", "CANCELLED"],
    PACKED: ["SHIPPED", "CANCELLED"],
    SHIPPED: ["OUT_FOR_DELIVERY"],
    OUT_FOR_DELIVERY: ["DELIVERED"],
    DELIVERED: [],
    CANCELLED: [],
};

export const createOrder = async (
    userId,
    addressId,
    paymentMethod
) => {
    const transaction = await sequelize.transaction();
    try {
        const address = await Address.findOne({
            where: {
                id: addressId,
                userId,
            },
            transaction,
        });
        if (!address) {
            throw new AppError(
                "Address not found",
                STATUS_CODES.NOT_FOUND
            );
        }
        const cart = await Cart.findOne({
            where: {
                userId,
            },
            transaction,
        });
        if (!cart) {
            throw new AppError(
                "Cart is empty",
                STATUS_CODES.BAD_REQUEST
            );
        }
        const cartItems = await CartItem.findAll({
            where: {
                cartId: cart.id,
            },
            include: [
                {
                    model: ProductVariant,
                    as: "variant",
                    include: [
                        {
                            model: Product,
                            as: "product",
                        },
                        {
                            model: Inventory,
                            as: "inventory",
                        },
                    ],
                },
            ],
            transaction,
            lock: transaction.LOCK.UPDATE,
        });
        if (cartItems.length === 0) {
            throw new AppError(
                "Cart is empty",
                STATUS_CODES.BAD_REQUEST
            );
        }
        let subtotal = 0;
        const orderItems = [];
        for (const cartItem of cartItems) {
            const variant = cartItem.variant;
            const product = variant?.product;
            const inventory = variant?.inventory;
            // Variant check
            if (
                !variant ||
                variant.status !== "ACTIVE"
            ) {
                throw new AppError(
                    "One or more products in your cart are unavailable",
                    STATUS_CODES.CONFLICT
                );
            }
            // Product check
            if (
                !product ||
                product.status !== "ACTIVE"
            ) {
                throw new AppError(
                    `Product "${product?.name || "Unknown"}" is unavailable`,
                    STATUS_CODES.CONFLICT
                );
            }
            // Inventory check
            const availableStock = inventory
                ? inventory.quantity -
                inventory.reservedQuantity
                : 0;
            if (cartItem.quantity > availableStock) {
                throw new AppError(
                    `Only ${availableStock} item(s) of "${product.name}" are available`,
                    STATUS_CODES.CONFLICT
                );
            }
            // Price
            const unitPrice = Number(
                variant.price ?? product.price
            );
            const itemSubtotal =
                unitPrice * cartItem.quantity;
            subtotal += itemSubtotal;
            // Order item snapshot
            orderItems.push({
                variantId: variant.id,
                productName: product.name,
                sku: variant.sku,
                quantity: cartItem.quantity,
                unitPrice,
                subtotal: itemSubtotal,
            });
        }
        const shippingFee = subtotal >= 999
            ? 0
            : 50;
        const discount = 0;
        const totalAmount =
            subtotal -
            discount +
            shippingFee;
        const order = await Order.create(
            {
                userId,
                addressId,
                orderNumber: generateOrderNumber(),
                subtotal: Number(
                    subtotal.toFixed(2)
                ),
                discount,
                shippingFee,
                totalAmount: Number(
                    totalAmount.toFixed(2)
                ),
                status: "CONFIRMED",
                paymentStatus: "PENDING",
            },
            {
                transaction,
            }
        );
        // Create order items
        for (const item of orderItems) {
            await OrderItem.create(
                {
                    orderId: order.id,
                    variantId: item.variantId,
                    productName: item.productName,
                    sku: item.sku,
                    quantity: item.quantity,
                    unitPrice: Number(
                        item.unitPrice.toFixed(2)
                    ),
                    subtotal: Number(
                        item.subtotal.toFixed(2)
                    ),
                },
                {
                    transaction,
                }
            );
        }
        // Create initial order status history
        await OrderStatusHistory.create(
            {
                orderId: order.id,
                status: "CONFIRMED",
                note: "Order placed successfully",
                changedBy: userId,
            },
            {
                transaction,
            }
        );

        // Reserve inventory
        for (const cartItem of cartItems) {
            const inventory =
                cartItem.variant.inventory;
            inventory.reservedQuantity +=
                cartItem.quantity;

            await inventory.save({
                transaction,
            });
        }

        // Clear cart
        await CartItem.destroy({
            where: {
                cartId: cart.id,
            },
            transaction,
        });

        await transaction.commit();

        return {
            orderId: order.id,
            orderNumber: order.orderNumber,
            subtotal: Number(order.subtotal),
            discount: Number(order.discount),
            shippingFee: Number(order.shippingFee),
            totalAmount: Number(order.totalAmount),
            status: order.status,
            paymentStatus: order.paymentStatus,
            paymentMethod,
        };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Seller updates order status
export const updateOrderStatus = async (
    orderId,
    sellerId,
    newStatus,
    note = null
) => {
    const transaction = await sequelize.transaction();
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
        if (!order.items || order.items.length === 0) {
            throw new AppError(
                "Order has no items",
                STATUS_CODES.BAD_REQUEST
            );
        }
        const sellerOwnsOrder = order.items.every(
            (item) =>
                item.variant?.product?.sellerId ===
                sellerId
        );
        if (!sellerOwnsOrder) {
            throw new AppError(
                "You are not authorized to update this order",
                STATUS_CODES.FORBIDDEN
            );
        }
        const currentStatus = order.status;
        const possibleStatuses = allowedTransitions[currentStatus] || [];
        if (
            !possibleStatuses.includes(newStatus)
        ) {
            throw new AppError(
                `Order cannot be changed from ${currentStatus} to ${newStatus}`,
                STATUS_CODES.CONFLICT
            );
        }
        // Update current order status
        order.status = newStatus;
        await order.save({
            transaction,
        });
        // Add status history
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
