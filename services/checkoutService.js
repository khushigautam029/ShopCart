import sequelize from "../config/database.js";

import Address from "../models/Address.js";
import Cart from "../models/Cart.js";
import CartItem from "../models/CartItem.js";
import Inventory from "../models/Inventory.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Payment from "../models/Payment.js";
import PaymentMethod from "../models/PaymentMethod.js";
import Product from "../models/Product.js";
import ProductVariant from "../models/ProductVariant.js";

export const checkout = async (userId, data) => {
    const transaction = await sequelize.transaction();

    try {
        const { addressId, paymentMethodId } = data;
        const address = await Address.findOne({
            where: {
                id: addressId,
                userId,
            },
            transaction,
        });

        if (!address) {
            throw new Error("Address not found");
        }

        const paymentMethod = await PaymentMethod.findOne({
            where: {
                id: paymentMethodId,
                userId,
            },
            transaction,
        });

        if (!paymentMethod) {
            throw new Error("Payment method not found");
        }

        const cart = await Cart.findOne({
            where: {
                userId,
            },
            transaction,
        });

        if (!cart) {
            throw new Error("Cart not found");
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
                            attributes: [
                                "id",
                                "name",
                                "price",
                                "status",
                            ],
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
            throw new Error("Cart is empty");
        }

        let subtotal = 0;

        const orderItemsData = [];

        for (const cartItem of cartItems) {
            const variant = cartItem.variant;

            if (!variant) {
                throw new Error(
                    `Product variant not found for cart item ${cartItem.id}`
                );
            }

            const product = variant.product;

            if (!product) {
                throw new Error(
                    `Product not found for variant ${variant.id}`
                );
            }

            // Product status uses lowercase in your current model
            if (product.status !== "ACTIVE") {
                throw new Error(
                    `Product "${product.name}" is inactive`
                );
            }

            // Variant status uses uppercase
            if (variant.status !== "ACTIVE") {
                throw new Error(
                    `Product variant "${variant.sku}" is inactive`
                );
            }

            if (!variant.price) {
                throw new Error(
                    `Price not available for variant "${variant.sku}"`
                );
            }

            const inventory = variant.inventory;

            if (!inventory) {
                throw new Error(
                    `Inventory not found for variant "${variant.sku}"`
                );
            }

            const availableQuantity =
                inventory.quantity - inventory.reservedQuantity;

            if (availableQuantity < cartItem.quantity) {
                throw new Error(
                    `Insufficient stock for "${product.name}". Available: ${availableQuantity}`
                );
            }

            const unitPrice = Number(variant.price);
            const quantity = Number(cartItem.quantity);

            const itemSubtotal = unitPrice * quantity;

            subtotal += itemSubtotal;

            orderItemsData.push({
                variantId: variant.id,
                productName: product.name,
                sku: variant.sku,
                quantity,
                unitPrice,
                subtotal: itemSubtotal,
            });
        }
        const discount = 0;

        // For now we are keeping shipping free.
        // We can implement shipping rules later.
        const shippingFee = 0;

        const totalAmount =
            subtotal - discount + shippingFee;
        const orderNumber = `ORD-${Date.now()}-${userId}`;

        const order = await Order.create(
            {
                userId,
                addressId,
                orderNumber,
                subtotal,
                discount,
                shippingFee,
                totalAmount,
                status: "PENDING",
                paymentStatus: "PENDING",
            },
            {
                transaction,
            }
        );
        const orderItems = orderItemsData.map((item) => ({
            orderId: order.id,
            ...item,
        }));

        await OrderItem.bulkCreate(orderItems, {
            transaction,
        });

        const payment = await Payment.create(
            {
                orderId: order.id,
                userId,
                paymentMethodId,
                provider: paymentMethod.provider,
                amount: totalAmount,
                currency: "INR",
                status: "PENDING",
            },
            {
                transaction,
            }
        );

        payment.status = "PAID";
        payment.paidAt = new Date();

        await payment.save({
            transaction,
        });

        order.paymentStatus = "PAID";
        order.status = "CONFIRMED";

        await order.save({
            transaction,
        });
        for (const cartItem of cartItems) {
            const inventory = cartItem.variant.inventory;

            inventory.quantity =
                inventory.quantity - cartItem.quantity;

            await inventory.save({
                transaction,
            });
        }
        await CartItem.destroy({
            where: {
                cartId: cart.id,
            },
            transaction,
        });
        await transaction.commit();
        return {
            order,
            orderItems,
            payment,
        };
    } catch (error) {
        await transaction.rollback();

        throw error;
    }
};